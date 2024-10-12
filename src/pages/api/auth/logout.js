import Cookies from "cookies";
import Pocketbase from "pocketbase";
import jwt from 'jsonwebtoken';

export default async function Logout(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({message: 'Method not allowed.'})
    }

    const cookies = new Cookies(req, res); // Initialize cookies object
    const currentSession = cookies.get('session'); // Retrieve the 'session' cookie
    const { userID } = req.body; // Get the user ID from the query parameters

    if (!currentSession) {
        console.error('No session cookie found.');
        return res.status(200).json({ message: 'No session found.' });
    }

    if (!userID) {
        console.error('User ID is required but not provided in the request.');
        return res.status(400).json({ message: 'User ID is required.' });
    }

    try {
        // Initialize Pocketbase
        const pb = new Pocketbase(process.env.PB_URL);
        await pb.admins.authWithPassword(process.env.PB_ADMIN_EMAIL, process.env.PB_ADMIN_PASS);
        console.log('Authenticated to Pocketbase successfully.');

        // Decode the current session JWT
        let decodedSession;
        try {
            decodedSession = jwt.verify(currentSession, process.env.MASTER_ENCRYPTION_KEY);
            console.log('JWT session decoded successfully:', decodedSession);
        } catch (error) {
            console.error('Error verifying the JWT session:', error.message);
            return res.status(403).json({ message: 'Invalid session token.' });
        }

        // Find the session for the specified user
        const userSessions = decodedSession.sessions;
        const userSessionIndex = userSessions.findIndex(session => session.user === userID);

        if (userSessionIndex === -1) {
            console.error(`No session found for user with ID: ${userID}`);
            return res.status(403).json({ message: 'No session found for this user.' });
        }

        // Remove the session from the list
        const [userSession] = userSessions.splice(userSessionIndex, 1);
        console.log(`Session for user ${userID} removed:`, userSession);

        // Remove the session record from the database
        try {
            await pb.collection('sessions').delete(userSession.sessionID);
            console.log(`Session record with ID ${userSession.sessionID} deleted from Pocketbase.`);
        } catch (dbError) {
            console.error('Error deleting session from Pocketbase:', dbError.message);
            return res.status(500).json({ message: 'Failed to delete session from database.', error: dbError.message });
        }

        // Re-sign the JWT with the updated sessions array
        let updatedJWT;
        try {
            updatedJWT = jwt.sign(
                { sessions: userSessions },
                process.env.MASTER_ENCRYPTION_KEY
            );
            console.log('JWT successfully re-signed with updated sessions.');
        } catch (jwtError) {
            console.error('Error re-signing the JWT:', jwtError.message);
            return res.status(500).json({ message: 'Failed to update session JWT.', error: jwtError.message });
        }

        // Re-set the session cookie with the updated JWT
        try {
            cookies.set('session', updatedJWT, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Ensure secure flag in production
                sameSite: 'strict', // Optional: Use same-site attribute for security
                maxAge: 7 * 24 * 60 * 60 * 1000, // Optional: Set cookie expiration for 7 days
            });
            console.log('Session cookie successfully updated.');
        } catch (cookieError) {
            console.error('Error setting the session cookie:', cookieError.message);
            return res.status(500).json({ message: 'Failed to set session cookie.', error: cookieError.message });
        }

        return res.status(200).json({ message: 'Session removed and JWT updated.' });
    } catch (error) {
        console.error('General error during logout:', error.message);
        return res.status(500).json({ message: 'Internal server error.', error: error.message });
    }
}