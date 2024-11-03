import axios from 'axios';
import qs from 'qs';
import Pocketbase from 'pocketbase';

export default async function completeSignup(req, res) {
    // Check for POST method
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed.' });
    }

    // Destructure body parameters and validate
    const { code, code_verifier, state } = req.body;
    if (!code || !code_verifier || !state) {
        return res.status(400).json({ message: 'Missing required fields: code, code_verifier, and state are required.' });
    }

    const pb = new Pocketbase(process.env.PB_URL);

    try {
        await pb.admins.authWithPassword(process.env.PB_ADMIN_EMAIL, process.env.PB_ADMIN_PASS);

        let redirect_uri = process.env.OAUTHREDIRECT;

        // Exchange authorization code for access token
        const tokenResponse = await axios.post('https://login.microsoftonline.com/consumers/oauth2/v2.0/token',
            qs.stringify({
                client_id: '799d1b84-214f-4159-a1aa-366e3299adec',
                client_secret: process.env.azure_secret,
                scope: 'XboxLive.signin XboxLive.offline_access openid email profile',
                code: code,
                grant_type: 'authorization_code',
                redirect_uri: redirect_uri,
                code_verifier: code_verifier
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        const accessToken = tokenResponse.data.access_token;
        const refreshToken = tokenResponse.data.refresh_token;

        // Exchange access token for Microsoft Graph access
        const tokenResponseForGraph = await axios.post('https://login.microsoftonline.com/consumers/oauth2/v2.0/token',
            qs.stringify({
                client_id: '799d1b84-214f-4159-a1aa-366e3299adec',
                client_secret: process.env.azure_secret,
                scope: 'User.Read',
                grant_type: 'refresh_token',
                refresh_token: refreshToken
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        const accessTokenForGraph = tokenResponseForGraph.data.access_token;

        // Fetch Microsoft user info
        const getMe = await axios.get('https://graph.microsoft.com/v1.0/me', {
            headers: {
                Authorization: `Bearer ${accessTokenForGraph}`
            }
        });

        console.log(getMe.data);

        // Check if user exists in the PocketBase collection
        const existingUser = await pb.collection('users').getFullList({
            filter: `msid='${getMe.data.id}'`
        });

        if (existingUser.length > 0) {
            // User exists, link account to waiting state
            await linkAccountToWaiting(pb, state, existingUser[0].id);
        } else {
            // User doesn't exist, create a new account
            const XboxLiveReq = await axios.post('https://user.auth.xboxlive.com/user/authenticate', {
                Properties: {
                    AuthMethod: "RPS",
                    SiteName: "user.auth.xboxlive.com",
                    RpsTicket: `d=${accessToken}`
                },
                RelyingParty: "http://auth.xboxlive.com",
                TokenType: "JWT"
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            const XBLToken = XboxLiveReq.data.Token;
            const XBLUserHash = XboxLiveReq.data.DisplayClaims.xui[0].uhs;

            // Get XSTS Token
            const MinecraftXSTS = await axios.post('https://xsts.auth.xboxlive.com/xsts/authorize', {
                Properties: {
                    SandboxId: "RETAIL",
                    UserTokens: [XBLToken]
                },
                RelyingParty: "rp://api.minecraftservices.com/",
                TokenType: "JWT"
            });

            const MCXSTSToken = MinecraftXSTS.data.Token;

            // Get Minecraft JWT Access
            const MCAccessReq = await axios.post('https://api.minecraftservices.com/authentication/login_with_xbox', {
                identityToken: `XBL3.0 x=${XBLUserHash};${MCXSTSToken}`
            });

            const MCAccessToken = MCAccessReq.data.access_token;

            // Fetch Minecraft profile
            const MCUserAccount = await axios.get('https://api.minecraftservices.com/minecraft/profile', {
                headers: {
                    Authorization: `Bearer ${MCAccessToken}`
                }
            });

            const MCUsername = MCUserAccount.data.name;
            const MCUUID = MCUserAccount.data.id;

            console.log(MCUsername, MCUUID);

            // Create a new user in PocketBase
            const accountCreation = await pb.collection('users').create({
                username: MCUsername,
                uuid: MCUUID,
                email: getMe.data.mail,
                msid: getMe.data.id,
                maxCapes: 2
            });

            await linkAccountToWaiting(pb, state, accountCreation.id);
        }

        // Respond with success
        res.status(200).json({
            message: 'Signup completed successfully!'
        });

    } catch (e) {
        // Log error for debugging purposes
        console.error('Error in completeSignup:', e.response?.data || e.message);

        let error = '';
        if (e?.response?.data?.XErr === 2148916233) {
            error = 'This microsoft account does not own minecraft.'
        }
        else {
            error = 'Unknown error.'
        }

        if (e?.response?.data?.XErr) {
            try {
                const waitingState = await pb.collection('signupWaiting').getFullList({
                    filter: `state='${state}'`
                });
                await pb.collection('signupWaiting').update(waitingState[0].id, {
                    errored: true,
                    error: error
                })

                setTimeout(async () => {
                    await pb.collection('signupWaiting').delete(waitingState[0].id)
                }, 250)
            }
            catch (e) {
                console.error(e);
                console.log('Error with pocketbase ^')
            }
        }
        

        // Return appropriate error response
        if (e.response) {
            return res.status(e.response.status).json({ message: e.response.data.error || 'An error occurred during signup.' });
        }

        return res.status(500).json({ message: 'Internal server error', error: e.message });
    }
}

async function linkAccountToWaiting(pb, state, accountId) {
    const waitingState = await pb.collection('signupWaiting').getFullList({
        filter: `state='${state}'`
    });

    await pb.collection('signupWaiting').update(waitingState[0].id, {
        relatedAccount: accountId
    });
}