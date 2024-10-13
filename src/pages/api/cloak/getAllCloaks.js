import Pocketbase from 'pocketbase';
export default async function getCloak(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).send('405 - Method not allowed')
    }

    const {userID} = req.query;


    const pb = new Pocketbase(process.env.PB_URL);
    await pb.admins.authWithPassword(process.env.PB_ADMIN_EMAIL, process.env.PB_ADMIN_PASS);

    try {
        const capeSlotRecords = await pb.collection('cape_slot').getFullList({filter: `user='${userID}'`, expand: 'cape'});
        const userRecord = await pb.collection('users').getOne(userID);

        let capeRenderURLs = [];

        for (const capeRecord of capeSlotRecords) {
            let expandedCape = capeRecord.expand.cape;
            capeRenderURLs.push({
                id: expandedCape.id,
                name: expandedCape.name,
                slotID: capeRecord.id,
                active: userRecord.cape === capeRecord.id,
                render: `https://db.wardrobe.gg/api/files/uploaded_capes/${expandedCape.id}/${expandedCape.render}`,
                capeURL: `https://db.wardrobe.gg/api/files/uploaded_capes/${expandedCape.id}/${expandedCape.cape_file}`
            })
        }

        return res.status(200).json({message: 'Success!', capes: capeRenderURLs})

    }
    catch (e) {
        console.error(e);
        return res.status(404).send('User not found.');
    }

}