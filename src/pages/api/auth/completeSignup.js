import axios from "axios";

export default async function completeSignup(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed.' });
    }

    const { xbluserhash, xstsToken, pbid } = req.body;

    try {
        // Step 4: Minecraft Token Request
        const minecraftTokenRequest = await axios.post('https://api.minecraftservices.com/authentication/login_with_xbox', {
            "identityToken": `XBL3.0 x=${xbluserhash};${xstsToken}`
        }, {
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        });

        const minecraftToken = minecraftTokenRequest.data.access_token;

        // Step 5: Get Minecraft Profile
        const minecraftAccount = await axios.get('https://api.minecraftservices.com/minecraft/profile', {
            headers: {
                Authorization: `Bearer ${minecraftToken}`,
                Accept: 'application/json'
            }
        });

        console.log(minecraftAccount);

        return res.status(200).json({ message: 'Signup complete', minecraftAccount: minecraftAccount.data });
    } catch (error) {
        console.error('Error completing signup:', error);
        return res.status(500).json({ message: 'An error occurred during the signup process.' });
    }
}