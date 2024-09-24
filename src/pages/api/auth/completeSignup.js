import axios from "axios";
import { live, xbl } from '@xboxreplay/xboxlive-auth';

export default async function completeSignup(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed.' });
    }

    const { msaccess, msrefresh, pbid } = req.body;

    console.log(msaccess)

    try {

        console.log(1);

        const userTokenResponse = await xbl.exchangeRpsTicketForUserToken(
            msaccess,
            'd' // Required for custom Azure applications
        );
        try {

        console.log(2);
        const XSTSTokenResponse = await xbl.exchangeTokenForXSTSToken(
            userTokenResponse.Token
        );

        console.log(XSTSTokenResponse)
        }
        catch (e) {
            console.error(e);
            return res.status(500).send(':(')
        }
    }
    catch (e) {
        console.error(e);
        return res.status(500).send(':(')
    }


}