import { Button } from "@/components/ui/button"
import { faMicrosoft } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { useRouter } from "next/router"
import axios from "axios"
import Pocketbase from "pocketbase";

export default function Login() {
    const router = useRouter();
    const handleSignup = async () => {
        try {
            const pb = new Pocketbase("https://db.wardrobe.gg");
            
            // Fetch Microsoft OAuth2 token from PocketBase
            const authData = await pb.collection('users').authWithOAuth2({ provider: 'microsoft' });
            const msaccess = authData.meta.accessToken;
            const pbid = authData.record.id;


            console.log(authData);

            
            // Step 1: Xbox Live Authentication
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

            const xbltoken = xboxLiveRequest.data.Token;
            const xbluserhash = xboxLiveRequest.data.DisplayClaims.xui.uhs;

            // Step 2: XSTS Authorization
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

            const xstsToken = xstsRequest.data.Token;

            // Step 3: Send xbluserhash and xstsToken to server to continue
            const response = await axios.post('/api/auth/completeSignup', {
                xbluserhash,
                xstsToken,
                pbid
            });

            console.log(response.data);
        } catch (error) {
            console.error('Error during signup:', error);
        }
    };

    return (
        <main className="grid grid-cols-12">
            <div className="bg-custom-brass hidden lg:block lg:col-span-2"></div>
            <div className="col-span-6 lg:col-span-4 h-screen bg-[url('/assets/waves/loginDark.png')] bg-cover"></div>
            <div className="col-span-6 bg-zinc-100 dark:bg-zinc-950 h-screen flex flex-col gap-8 justify-center items-center">
                <div className="grid gap-2 text-center">
                    <h1 className={`text-3xl font-bold text-zinc-950 dark:text-zinc-100`}>
                        Signup
                    </h1>
                    <p className="text-zinc-700 dark:text-zinc-400">
                        To begin, sign in with Microsoft and we&apos;ll handle the rest.
                    </p>
                </div>
                <div className="grid gap-4 w-1/2">
                    <Button type="submit" className="w-full" onClick={handleSignup}>
                        <FontAwesomeIcon icon={faMicrosoft} className="mr-2" />
                        Continue with Microsoft
                    </Button>
                </div>
                <div className="text-center text-sm dark:text-zinc-300">
                    Already have an account?{" "}
                    <Link href="/auth/signup" className="underline">
                        Login
                    </Link>
                </div>
            </div>
        </main>
    );
}