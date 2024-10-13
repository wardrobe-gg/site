import Pocketbase from 'pocketbase';
import Cookies from 'cookies';
import { checkUserSession } from '@/lib/checkSession';

export default async function setActiveCloakSlot(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).send('Method not allowed. Please use POST.');
    }

    const { slotID, activeAccount } = req.body;

    // Input validation: check if slotID and activeAccount are provided
    if (!slotID || !activeAccount) {
        return res.status(400).json({ message: 'Invalid request. slotID and activeAccount are required.' });
    }

    // Use the 'cookies' package to retrieve the session cookie
    const cookies = new Cookies(req, res);
    const sessionCookie = cookies.get('session');

    try {
        // Ensure user session is valid
        await checkUserSession(activeAccount, sessionCookie);
    } catch (e) {
        console.error(e);
        return res.status(403).json({ message: 'Invalid or expired session.' });
    }

    // Initialize Pocketbase client
    const pb = new Pocketbase(process.env.PB_URL);

    try {
        // Authenticate as admin
        await pb.admins.authWithPassword(process.env.PB_ADMIN_EMAIL, process.env.PB_ADMIN_PASS);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Admin authentication failed. Please check the server credentials.' });
    }

    try {
        // Check if the slot exists
        const slot = await pb.collection('cape_slot').getOne(slotID);
        if (!slot) {
            return res.status(404).json({ message: 'Cape slot not found.' });
        }

        // Optional: Verify that the slot belongs to the active account (add your logic here)
        if (slot.user !== activeAccount) {
            return res.status(403).json({ message: 'You are not authorized to change this slot.' });
        }

        // Update the user's active slot
        await pb.collection('users').update(activeAccount, { cape: slotID });

        return res.status(200).json({ message: 'Cape slot updated successfully.' });
    } catch (error) {
        // Error handling based on the type of error
        if (error.message.includes('404')) {
            return res.status(404).json({ message: 'Slot not found or user not authorized.' });
        }
        console.error(error);
        return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
}