import Pocketbase from 'pocketbase';
export default async function getCloak(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).send('405 - Method not allowed')
    }

    const {userID} = req.query;


    const pb = new Pocketbase(process.env.PB_URL);
    await pb.admins.authWithPassword(process.env.PB_ADMIN_EMAIL, process.env.PB_ADMIN_PASS);

    try {
        const userRecord = await pb.collection('users').getOne(userID, {expand: 'cape, cape.cape'});

        if (userRecord?.expand?.cape?.expand?.cape) {
            let expandedCape = userRecord.expand.cape.expand.cape
            return res.status(200).json({capeID: expandedCape.id, url: `https://db.wardrobe.gg/api/files/uploaded_capes/${expandedCape.id}/${expandedCape.cape_file}`})
        }
        else {
            return res.status(404).send('User does not have a wardrobe.gg cape.')
        }

    }
    catch (e) {
        return res.status(404).send('User not found.');
    }
}