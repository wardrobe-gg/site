import Pocketbase from "pocketbase";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export async function checkUserSession(userID, jwtToken) {
    try {
        if (!userID || !jwtToken) {
            throw new Error('User ID and JWT are required.');
        }

        // Verify the JWT session token
        let decodedSession;
        try {
            decodedSession = jwt.verify(jwtToken, process.env.MASTER_ENCRYPTION_KEY);
        } catch (error) {
            console.log('JWT verification failed:', error.message);
            throw new Error('Invalid session token.');
        }

        const sessions = decodedSession.sessions;

        if (!sessions || sessions.length === 0) {
            console.log('No active sessions in the decoded JWT');
            throw new Error('No active sessions found.');
        }

        // Filter sessions to find one for the specified user
        const userSession = sessions.find(session => session.user === userID);

        if (!userSession) {
            console.log('No session found for the specified user');
            throw new Error('No session found for this user.');
        }

        // Fetch the session data from the database
        const pb = new Pocketbase(process.env.PB_URL);
        await pb.admins.authWithPassword(process.env.PB_ADMIN_EMAIL, process.env.PB_ADMIN_PASS);

        const sessionRecord = await pb.collection('sessions').getOne(userSession.sessionID);

        if (!sessionRecord) {
            console.log('Session not found in the database');
            throw new Error('Session not found.');
        }

        // Extract the IV and encrypted session data from the database
        const [sessionIVHex, encryptedSessionData] = sessionRecord.session.split(':');
        const sessionIV = Buffer.from(sessionIVHex, 'hex');

        // Decrypt the session data using AES-256
        const encryptionKey = Buffer.from(process.env.MASTER_ENCRYPTION_KEY, 'hex');
        const decipher = crypto.createDecipheriv('aes-256-cbc', encryptionKey, sessionIV);

        let decryptedSessionData = decipher.update(encryptedSessionData, 'hex', 'utf8');
        decryptedSessionData += decipher.final('utf8');

        // Validate the session data by comparing the hashed session from JWT with the decrypted session data
        const isValidSession = await bcrypt.compare(decryptedSessionData, userSession.hashedSession);

        if (!isValidSession) {
            console.log('Session validation failed during bcrypt comparison');
            throw new Error('Session validation failed.');
        }

        // If session is valid, fetch and return the user data
        const userRecord = await pb.collection('users').getOne(userID);

        if (!userRecord) {
            console.log('User not found in the database');
            throw new Error('User not found.');
        }

        return {
            message: 'Session is valid.',
            user: {
                id: userRecord.id,
                username: userRecord.username,
                uuid: userRecord.uuid
            }
        };
    } catch (error) {
        console.error('Error checking user session:', error.message);
        throw new Error('Internal server error.');
    }
}