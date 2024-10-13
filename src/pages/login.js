import { Button } from "@/components/ui/button"
import { faMicrosoft } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { useRouter } from "next/router"
import axios from "axios"
import Pocketbase from "pocketbase";
import { useEffect, useState } from "react"
import { Loader2, Loader2Icon } from "lucide-react"
import { toast } from "sonner"
import { NewHeader } from "@/components/main/header"


export default function Login() {
    const router = useRouter();
    const {c} = router.query;
    const [environment, setEnvironment] = useState('');
    const [redirect, setRedirect] = useState('');
    const [isClicked, setIsClicked] = useState(false);
    const [accountCreated, setAccountCreated] = useState(false);

    const [accountWaiting, setAccountWaiting] = useState({});
    const [loadingText, setLoadingText] = useState('Logging In...')

    useEffect(() => {
        const getEnvironment = async () => {
            const envResponse = await axios.get('/api/getEnvironment');
            setEnvironment(envResponse.data.environment);
            setRedirect(envResponse.data.oauthRedirect)
        }

        getEnvironment();
    }, []);

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
            let authURL = (authMethods.authProviders[0].authUrl).replace('&scope=User.Read', `&scope=${encodeURIComponent(scope)}`) + encodeURIComponent(redirect);
    
            window.open(authURL, '_blank');

            const requestSignupWaitState = await axios.post('/api/auth/signupWaitState', {
                state: authMethods.authProviders[0].state,
                codeChallenge: codeChallenge
            })

            console.log(requestSignupWaitState.data)

            setIsClicked(true);

            await pb.collection('signupWaiting').subscribe(requestSignupWaitState.data.id, function (e) {
                if (e.action === 'update') {
                    if (e.record.errored) {
                        setIsClicked(false);
                        toast.error(e.record.error);
                        pb.collection('signupWaiting').unsubscribe(requestSignupWaitState.data.id);
                    }
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
                localStorage.setItem('activeAccount', JSON.stringify(requestSession.data.activeAccount));
                localStorage.setItem('accountsInfo', JSON.stringify(requestSession.data.accounts))

                if (c === 'true') {
                    window.close();
                }
                else {
                    router.push('/account');
                }
            }
            else {
                alert('An error occured.')
            }
        }
        if (accountCreated === true && typeof window !== undefined){
            login();
        }
    }, [accountCreated])

    return (
        <main className="w-screen h-screen overflow-hidden">
            <NewHeader />
            <div className="w-screen h-[80vh] bg-oblack -mt-[4rem] flex justify-center items-center">

                <div className="bg-[url('/assets/logo/background.png')] opacity-35 fixed h-screen w-screen z-[0]">
                </div>

                <div className="bg-oblack relative z-10 w-4/6 h-3/6 border-2 border-[#41414A] flex flex-col justify-evenly items-center p-[1rem]">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-4xl font-basically tracking-wide font-medium text-center">Log in</h1>
                        <span className="text-2xl font-basically text-zinc-400 font-light">Sign in with your microsoft account below</span>

                        <Button type="submit" className="w-full font-basically" onClick={handleLogin} disabled={isClicked}>
                        {isClicked ? 
                        <>
                            <Loader2 className="mr-2 animate-spin" /> {loadingText}
                        </> : <>
                            <FontAwesomeIcon icon={faMicrosoft} className="mr-2" />
                            Continue with Microsoft
                        </>}
                    </Button>
                    </div>
                    <h1 className="text-2xl">Login</h1>
                </div>
            </div>

        </main>
    );
}