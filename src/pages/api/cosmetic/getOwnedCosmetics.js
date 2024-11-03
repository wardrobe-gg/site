import Pocketbase from 'pocketbase';
export default async function getOwnedCosmetics(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({message: 'Method not allowed.'})
    }

    const {user} = req.query;

    const pb = new Pocketbase(process.env.PB_URL);
    await pb.admins.authWithPassword(process.env.PB_ADMIN_EMAIL, process.env.PB_ADMIN_PASS);

    const cosmetics = await pb.collection('cosmetic_slots').getFullList({
        filter: `user='${user}'`
    })

    let ids = [];

    for (let cosmetic of cosmetics) {
        ids.push(cosmetic.cosmetic);
    }

    return res.status(200).json({
        message: 'Success',
        cosmetics: ids
    })
}