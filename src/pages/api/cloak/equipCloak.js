import Cookies from "cookies";
import { checkUserSession } from "@/lib/checkSession";
import Pocketbase from 'pocketbase';

export default async function equipCloak(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).send('Method not allowed. Please use POST.');
    }

    const { cloakId, activeAccount } = req.body;

    // Use the 'cookies' package to retrieve the session cookie
    const cookies = new Cookies(req, res);
    const sessionCookie = cookies.get('session');

    try {
        await checkUserSession(activeAccount, sessionCookie);
    } catch (e) {
        return res.status(403).json({ message: 'Invalid session.' });
    }

    // Session is valid. Proceeding

    const pb = new Pocketbase(process.env.PB_URL);
    await pb.admins.authWithPassword(process.env.PB_ADMIN_EMAIL, process.env.PB_ADMIN_PASS);

    const user = await pb.collection('users').getOne(activeAccount);
    if (user.cape === cloakId) {
        return res.status(201).json({ message: 'Cloak already equipped.' });
    }

    try {
        const cloak = await pb.collection('uploaded_capes').getOne(cloakId);
        await pb.collection('uploaded_capes').update(cloakId, {
            applications: cloak.applications + 1
        });
    } catch (e) {
        console.error(e);
        return res.status(404).json({ message: 'Cloak not found.' });
    }

    try {
        // Fetch the user's cape slots
        const userSlots = await pb.collection('cape_slot').getFullList({
            filter: `user='${user.id}'`
        });

        // Check if the user already has this cloak equipped in any slot
        const existingSlot = userSlots.find(slot => slot.cape === cloakId);

        if (!existingSlot) {
            const newSlot = await pb.collection('cape_slot').create({
                user: user.id,
                cape: cloakId
            });

            await pb.collection('users').update(user.id, {
                cape: newSlot.id
            })

            return res.status(200).json({message: 'Cloak slot created & equipped.'})
        } else {
            // If the cloak is already equipped in a slot
            await pb.collection('users').update(user.id, {
                cape: existingSlot.id
            })

            return res.status(200).json({ message: 'Cloak slot equipped.' });
        }

        // Optionally update the user model with the equipped cape
        await pb.collection('users').update(user.id, { cape: cloakId });

        return res.status(200).json({ message: 'Cloak equipped successfully.' });

    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'An error occurred while equipping the cloak.' });
    }
}