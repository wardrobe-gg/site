import Pocketbase from "pocketbase";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export default async function requestSession(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed.' });
    }

    const { signedSAT } = req.body;

    if (!signedSAT) {
        return res.status(400).json({ message: 'signedSAT is required.' });
    }

    try {
        // Verify the JWT
        const decoded = jwt.verify(signedSAT, process.env.MASTER_ENCRYPTION_KEY);

        // Extract the IV and encrypted SAT
        const [ivHex, encryptedSAT] = decoded.SAT.split(':');
        const iv = Buffer.from(ivHex, 'hex'); // Convert the IV back to buffer

        // AES-256 Decrypt the SAT
        const encryptionKey = Buffer.from(process.env.MASTER_ENCRYPTION_KEY, 'hex');
        const decipher = crypto.createDecipheriv('aes-256-cbc', encryptionKey, iv);

        let decryptedSAT = decipher.update(encryptedSAT, 'hex', 'utf8');
        decryptedSAT += decipher.final('utf8');

        // Check if the SAT exists in the database
        const pb = new Pocketbase(process.env.PB_URL);
        await pb.admins.authWithPassword(process.env.PB_ADMIN_EMAIL, process.env.PB_ADMIN_PASS);

        const satRecord = await pb.collection('SATs').getFirstListItem(`SAT="${decryptedSAT}"`, {expand: 'user'});

        if (!satRecord) {
            return res.status(404).json({ message: 'SAT not found in the database.' });
        }

        // Validate the IDH against the stored ID hash
        const isIDHValid = await bcrypt.compare(satRecord.id, decoded.IDH);
        if (!isIDHValid) {
            return res.status(403).json({ message: 'Invalid IDH.' });
        }

        await pb.collection('SATs').delete(satRecord.id);

        // Generate a session data
        const sessionData = crypto.randomBytes(256).toString('hex');

        // AES-256 Encrypt the session data
        const sessionIV = crypto.randomBytes(16); // Generate a new IV for session encryption
        const sessionCipher = crypto.createCipheriv('aes-256-cbc', encryptionKey, sessionIV);

        let encryptedSessionData = sessionCipher.update(sessionData, 'utf8', 'hex');
        encryptedSessionData += sessionCipher.final('hex');

        const cookies = cookie.parse(req.headers.cookie || '');
        const currentSession = cookies.session;

        // Verify and decode the current session token (if it exists)
        let unsignedSession = null;
        if (currentSession) {
            try {
                unsignedSession = jwt.verify(currentSession, process.env.MASTER_ENCRYPTION_KEY);
            } catch (error) {
                console.error('Failed to verify current session:', error.message);
            }
        }

        // Initialize sessions array from unsignedSession.sessions, handle case where it's undefined
        let sessions = Array.isArray(unsignedSession?.sessions) ? [...unsignedSession.sessions] : [];

        // Filter out any existing sessions for the same user
        sessions = sessions.filter(session => session.user !== satRecord.user);

        // Get current sessions for the user from the database
        const getCurrentSessions = await pb.collection('sessions').getFullList({
            filter: `user='${satRecord.user}'`
        });

        // Delete current sessions from the database
        for (const tempsession of getCurrentSessions) {
            await pb.collection('sessions').delete(tempsession.id);
        }

        // Store the encrypted session and IV in the database
        const sessionRecord = await pb.collection('sessions').create({
            session: `${sessionIV.toString('hex')}:${encryptedSessionData}`, // Combine IV and encrypted session for later decryption
            user: satRecord.user // Associate session with the user
        });

        if (!satRecord.user) {
            return res.status(403).json({message: 'SAT INVALID'});
        }
        // Push the new session into the sessions array
        sessions.push({
            sessionID: sessionRecord.id, // Store the session ID
            hashedSession: await bcrypt.hash(encryptedSessionData, 12), // Hash the encrypted session
            user: satRecord.user
        });

        let currentSignedInUsers = sessions.map(tempsession => tempsession.user);
        let mcAccounts = []
        for (const id of currentSignedInUsers) {
            const account = await pb.collection('users').getFullList({
                filter: `id='${id}'`
            });
            mcAccounts.push(account[0]);
        }

        console.log(mcAccounts)

        let returnedAccounts = mcAccounts.map(account => ({
            user: account.id,
            username: account.username,
            uuid: account.uuid
        }));

        // Generate a signed JWT with the session ID
        const signedJWT = jwt.sign({
            sessions, // Include the updated sessions array in the JWT payload
        }, process.env.MASTER_ENCRYPTION_KEY); // Use the same key for signing

        // Set HTTP-only cookie for the session
        res.setHeader('Set-Cookie', `session=${signedJWT}; HttpOnly; Path=/; SameSite=Strict; Max-Age=${30 * 24 * 60 * 60}`);

        // Successfully verified SAT and created a session
        return res.status(200).json({ message: 'Session Created. User logged in.', accounts: returnedAccounts, activeAccount: {
            user: satRecord.expand.user.id,
            username: satRecord.expand.user.username,
            uuid: satRecord.expand.user.uuid
        }});

    } catch (error) {
        console.error('Error in verifySAT:', error.message);

        // Handle different error scenarios
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(403).json({ message: 'Invalid signedSAT.' });
        }

        return res.status(500).json({ message: 'Internal server error.', error: error.message });
    }
}