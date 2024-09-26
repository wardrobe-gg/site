import { Button } from "@/components/ui/button"
import { faMicrosoft } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { useRouter } from "next/router"
import axios from "axios"
import Pocketbase from "pocketbase";
import { useEffect, useState } from "react"
import { Loader2, Loader2Icon } from "lucide-react"


export default function Login() {
    const router = useRouter();
    const [isClicked, setIsClicked] = useState(false);
    const [accountCreated, setAccountCreated] = useState(false);

    const [accountWaiting, setAccountWaiting] = useState({});
    const [loadingText, setLoadingText] = useState('Logging In...')

    const handleLogin = async () => {
        try {
            const pb = new Pocketbase("https://db.wardrobe.gg");
            const authMethods = await pb.collection('fauxUsers').listAuthMethods();
    

            const codeChallenge = authMethods.authProviders[0].codeChallenge
            const codeChallengeMethod = authMethods.authProviders[0].codeChallengeMethod
            const codeVerifier = authMethods.authProviders[0].codeVerifier
    
            // Save codeVerifier in localStorage for use during token exchange
            localStorage.setItem('code_verifier', codeVerifier);
            localStorage.setItem('provider', JSON.stringify(authMethods.authProviders[0]));
    
            let scope = "XboxLive.signin XboxLive.offline_access User.Read";
            let authURL = (authMethods.authProviders[0].authUrl).replace('&scope=User.Read', `&scope=${encodeURIComponent(scope)}`) + encodeURIComponent('https://wardrobe.gg/oauth2-redirect');
    
            window.open(authURL, '_blank');

            const requestSignupWaitState = await axios.post('/api/auth/signupWaitState', {
                state: authMethods.authProviders[0].state,
                codeChallenge: codeChallenge
            })

            console.log(requestSignupWaitState.data)

            setIsClicked(true);

            await pb.collection('signupWaiting').subscribe(requestSignupWaitState.data.id, function (e) {
                if (e.action === 'update') {
                    if (e.record.relatedAccount) {
                        setAccountCreated(true);
                        setAccountWaiting(e.record);
                        pb.collection('signupWaiting').unsubscribe(requestSignupWaitState.data.id);
                    }
                }
            })

        } catch (error) {
            console.error('Error during signup:', error);
        }
    };

    useEffect(() => {
        async function login() {
            let provider = JSON.parse(localStorage.getItem('provider'));

            const requestSAT = await axios.post('/api/auth/requestSATfromSignup', {
                codeChallenge: provider.codeChallenge,
                waitingId: accountWaiting.id,
                relatedAccountId: accountWaiting.relatedAccount,
                state: provider.state
            })
            
            const requestSession = await axios.post('/api/auth/requestSession', {
                signedSAT: requestSAT.data.signedSAT
            })

            if (requestSession.status === 200) {
                localStorage.removeItem('provider');
                localStorage.removeItem('code_verifier');
                localStorage.setItem('accountsInfo', JSON.stringify(requestSession.data.accounts))
                router.push('/')
            }
            else {
                alert('An error occured.')
            }
        }
        if (accountCreated === true){
            login();
        }
    }, [accountCreated])

    return (
        <main className="grid grid-cols-12">
            <div className="bg-custom-brass hidden lg:block lg:col-span-2"></div>
            <div className="col-span-6 lg:col-span-4 h-screen bg-[url('/assets/waves/loginDark.png')] bg-cover"></div>
            <div className="col-span-6 bg-zinc-100 dark:bg-zinc-950 h-screen flex flex-col gap-8 justify-center items-center">
                <div className="grid gap-2 text-center">
                    <h1 className={`text-3xl font-bold text-zinc-950 dark:text-zinc-100`}>
                        Login
                    </h1>
                    <p className="text-zinc-700 dark:text-zinc-400">
                        Sign in with your microsoft account below to get started.
                    </p>
                </div>
                <div className="grid gap-4 w-1/2">
                    <Button type="submit" className="w-full" onClick={handleLogin} disabled={isClicked}>
                        {isClicked ? 
                        <>
                            <Loader2 className="mr-2 animate-spin" /> {loadingText}
                        </> : <>
                            <FontAwesomeIcon icon={faMicrosoft} className="mr-2" />
                            Continue with Microsoft
                        </>}
                    </Button>
                </div>
                <div className="text-center text-sm dark:text-zinc-300">
                    Don&apos;t have an account yet?{" "}
                    <Link href="/signup" className="underline">
                        Signup
                    </Link>
                </div>
            </div>
        </main>
    );
}