import axios from 'axios';
import Pocketbase from 'pocketbase';
import bcrypt from 'bcrypt';

export default async function SignupWaitState(req, res) {
    // Check for POST method
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    // Extract state and codeChallenge from the request body
    const { state, codeChallenge } = req.body;

    // Validate required fields
    if (!state || !codeChallenge) {
        return res.status(400).json({ message: 'Missing required fields: state and codeChallenge' });
    }

    try {
        // Initialize PocketBase client
        const pb = new Pocketbase(process.env.PB_URL);

        // Authenticate PocketBase admin
        await pb.admins.authWithPassword(process.env.PB_ADMIN_EMAIL, process.env.PB_ADMIN_PASS);

        // Hash the codeChallenge
        const hashedChallenge = await bcrypt.hash(codeChallenge, 12);

        // Create a new record in the signupWaiting collection
        const insert = await pb.collection('signupWaiting').create({
            state: state,
            codeChallengeHash: hashedChallenge
        });

        // Return success response
        return res.status(200).json({
            message: 'Success',
            id: insert.id
        });

    } catch (error) {
        // Log error for debugging purposes
        console.error('Error in SignupWaitState:', error);

        // Handle different types of errors
        if (error.response) {
            return res.status(error.response.status).json({ message: error.response.data });
        }

        // Return a generic error response
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}