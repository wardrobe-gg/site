import Pocketbase from "pocketbase";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import Cookies from 'cookies';

export default async function checkSession(req, res) {
    try {
        const { userID } = req.query; // Get the user ID from the request parameters

        if (!userID) {
            return res.status(400).json({ message: 'User ID is required.' });
        }

        // Use the 'cookies' package to retrieve the session cookie
        const cookies = new Cookies(req, res);
        const sessionCookie = cookies.get('session');

        if (!sessionCookie) {
            console.log('No session found in the request');
            return res.status(401).json({ message: 'No session found.' });
        }

        // Verify the JWT session token
        let decodedSession;
        try {
            decodedSession = jwt.verify(sessionCookie, process.env.MASTER_ENCRYPTION_KEY);
        } catch (error) {
            console.log('JWT verification failed:', error.message);
            return res.status(403).json({ message: 'Invalid session token.' });
        }

        const sessions = decodedSession.sessions;

        if (!sessions || sessions.length === 0) {
            console.log('No active sessions in the decoded JWT');
            return res.status(403).json({ message: 'No active sessions found.' });
        }

        // Filter sessions to find one for the specified user
        const userSession = sessions.find(session => session.user === userID);

        if (!userSession) {
            console.log('No session found for the specified user');
            return res.status(403).json({ message: 'No session found for this user.' });
        }

        // Fetch the session data from the database
        const pb = new Pocketbase(process.env.PB_URL);
        await pb.admins.authWithPassword(process.env.PB_ADMIN_EMAIL, process.env.PB_ADMIN_PASS);

        const sessionRecord = await pb.collection('sessions').getOne(userSession.sessionID);

        if (!sessionRecord) {
            console.log('Session not found in the database');
            return res.status(404).json({ message: 'Session not found.' });
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
            return res.status(403).json({ message: 'Session validation failed.' });
        }

        // If session is valid, return the user data
        const userRecord = await pb.collection('users').getOne(userID);

        if (!userRecord) {
            console.log('User not found in the database');
            return res.status(404).json({ message: 'User not found.' });
        }

        return res.status(200).json({
            message: 'Session is valid.',
            user: {
                id: userRecord.id,
                username: userRecord.username,
                uuid: userRecord.uuid
            }
        });
    } catch (error) {
        console.error('Error checking session:', error.message);
        return res.status(500).json({ message: 'Internal server error.', error: error.message });
    }
}