import { pb } from "@/lib/pb";
import crypto from "crypto";
import axios from "axios";

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).send('Method not allowed');
    }

    // Get the list of capes with null hash
    const cloaks = await pb.collection('uploaded_capes').getFullList({
        filter: 'hash = null'
    });

    // Process each cloak
    for (const cloak of cloaks) {
        try {
            const cloakURL = `https://db.wardrobe.gg/api/files/uploaded_capes/${cloak.id}/${cloak.cape_file}`;
            
            // Download the image
            const response = await axios.get(cloakURL, { responseType: 'arraybuffer' });
            const imageBuffer = Buffer.from(response.data);
            
            // Calculate the SHA-512 hash
            const hash = crypto.createHash('sha512').update(imageBuffer).digest('hex');
            
            // Update the record with the hash
            await pb.collection('uploaded_capes').update(cloak.id, {
                hash: hash
            });

        } catch (error) {
            console.error(`Error processing cloak ${cloak.id}: `, error);
        }
    }

    return res.status(200).send('Done');
}