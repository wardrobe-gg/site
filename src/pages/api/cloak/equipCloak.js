import Cookies from "cookies";
import {checkUserSession} from "@/lib/checkSession";
import Pocketbase from 'pocketbase';

export default async function equipCloak(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).send('Method not allowed. Please use POST.');
    }

    const {cloakId, activeAccount} = req.body;

    // Use the 'cookies' package to retrieve the session cookie
    const cookies = new Cookies(req, res);
    const sessionCookie = cookies.get('session');

    try {
        await checkUserSession(activeAccount, sessionCookie);
    }
    catch (e) {
        return res.status(403).json({message: 'Invalid session.'});
    }

    // Session is valid. Yay!

    const pb = new Pocketbase(process.env.PB_URL);
    await pb.admins.authWithPassword(process.env.PB_ADMIN_EMAIL, process.env.PB_ADMIN_PASS);

    const user = await pb.collection('users').getOne(activeAccount);
    if (user.cape === cloakId) {
        return res.status(201).json({message: 'Cloak already equipped.'});
    }

    try {
        const cloak = await pb.collection('uploaded_capes').getOne(cloakId);
        await pb.collection('uploaded_capes').update(cloakId, {
            applications: cloak.applications + 1
        })
        if (cloak.id !== cloakId) {
            throw new Error('What the hell?')
        }
    }
    catch (e) {
        console.error(e);
        return res.status(404).json({message: 'Cloak not found.'})
    }


    try {
        await pb.collection('users').update(activeAccount, {
            cape: cloakId
        })

        return res.status(200).json({message: 'Cloak equipped.'})
    }
    catch (e) {
        return res.status(500).json({message: 'An error occured. :('})
    }
}