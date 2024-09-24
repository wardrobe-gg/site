import axios from "axios";

export default async function completeSignup(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed.' });
    }

    const { msaccess, pbid } = req.body;

    console.log(msaccess, pbid);

    try {
        // Xbox Live Authentication
        const xboxLiveRequest = await axios.post('https://user.auth.xboxlive.com/user/authenticate', {
            "Properties": {
                "AuthMethod": "RPS",
                "SiteName": "user.auth.xboxlive.com",
                "RpsTicket": `d=${msaccess}`
            },
            "RelyingParty": "http://auth.xboxlive.com",
            "TokenType": "JWT"
        }, {
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        });

        console.log(xboxLiveRequest);

        const xbltoken = xboxLiveRequest.data.Token;
        const xbluserhash = xboxLiveRequest.data.DisplayClaims.xui.uhs;

        // XSTS Authorization
        const xstsRequest = await axios.post('https://xsts.auth.xboxlive.com/xsts/authorize', {
            "Properties": {
                "SandboxId": "RETAIL",
                "UserTokens": [
                    xbltoken
                ]
            },
            "RelyingParty": "rp://api.minecraftservices.com/",
            "TokenType": "JWT"
        }, {
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        });

        console.log(xstsRequest);

        const xstsToken = xstsRequest.data.Token;

        // Minecraft Token Request
        const minecraftTokenRequest = await axios.post('https://api.minecraftservices.com/authentication/login_with_xbox', {
            "identityToken": `XBL3.0 x=${xbluserhash};${xstsToken}`
        }, {
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        });

        console.log(minecraftTokenRequest);

        const minecraftToken = minecraftTokenRequest.data.access_token;

        // Get Minecraft Profile
        const minecraftAccount = await axios.get('https://api.minecraftservices.com/minecraft/profile', {
            headers: {
                Authorization: `Bearer ${minecraftToken}`,
                Accept: 'application/json'
            }
        });

        console.log(minecraftAccount);

        return res.status(200).send('Woo');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred during the signup process.' });
    }
}