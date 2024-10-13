import Cookies from "cookies";
import { checkUserSession } from "@/lib/checkSession";
import Pocketbase from 'pocketbase';

export default async function addToLibrary(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed. Please use POST.' });
    }

    const { cloakId, activeAccount } = req.body;

    // Validate input
    if (!cloakId || !activeAccount) {
        return res.status(400).json({ error: 'Cloak ID and active account are required.' });
    }

    const cookies = new Cookies(req, res);
    const sessionCookie = cookies.get('session');

    // Check session validity
    try {
        await checkUserSession(activeAccount, sessionCookie);
    } catch (e) {
        console.error(e);
        return res.status(403).json({ error: 'Invalid or expired session.' });
    }

    const pb = new Pocketbase(process.env.PB_URL);
    try {
        // Authenticate with PocketBase
        await pb.admins.authWithPassword(process.env.PB_ADMIN_EMAIL, process.env.PB_ADMIN_PASS);
    } catch (e) {
        console.error('Admin authentication failed:', e);
        return res.status(500).json({ error: 'Internal server error. Admin authentication failed.' });
    }

    // Fetch the cloak
    let cloak;
    try {
        cloak = await pb.collection('uploaded_capes').getOne(cloakId);
    } catch (e) {
        console.error('Error fetching cloak:', e);
        return res.status(404).json({ error: 'Cloak not found.' });
    }

    // Fetch the user
    let user;
    try {
        user = await pb.collection('users').getOne(activeAccount);
    } catch (e) {
        console.error('Error fetching user:', e);
        return res.status(404).json({ error: 'User not found.' });
    }

    // Fetch the user's existing cape slots
    let userSlots;
    try {
        userSlots = await pb.collection('cape_slot').getFullList({
            filter: `user='${user.id}'`
        });
    } catch (e) {
        console.error('Error fetching user cape slots:', e);
        return res.status(500).json({ error: 'Failed to retrieve user cape slots.' });
    }

    // Check if the cloak is already in the user's library
    const existingSlot = userSlots.find(slot => slot.cape === cloakId);
    if (existingSlot) {
        await pb.collection('cape_slot').delete(existingSlot.id);

        return res.status(200).json({ message: 'Cloak removed from library.' });
    }

    // Add the cloak to the user's library (cape_slot collection)
    try {
        await pb.collection('cape_slot').create({
            user: user.id,
            cape: cloakId
        });
    } catch (e) {
        console.error('Error adding cloak to library:', e);
        return res.status(500).json({ error: 'Failed to add cloak to library.' });
    }

    return res.status(200).json({ message: 'Cloak successfully added to library.' });
}