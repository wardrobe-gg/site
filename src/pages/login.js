import { Button } from "@/components/ui/button"
import { faMicrosoft } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { useRouter } from "next/router"
import {useState} from "react"
import { pb } from "@/lib/pb"


export default function Login() {
    const router = useRouter()
    const [availableAuth, setAvailableAuth] = useState([]);


    const handleLogin = async () => {
        const authData = await pb.collection('users').authWithOAuth2({provider: 'microsoft'});

        console.log(authData);
    }

    return (
        <main className="grid grid-cols-12">
            <div className="bg-custom-brass hidden lg:block lg:col-span-2">

            </div>
            <div className="col-span-6 lg:col-span-4 h-screen bg-[url('/assets/waves/loginDark.png')] bg-cover">

            </div>
            <div className="col-span-6 bg-zinc-100 dark:bg-zinc-950 h-screen flex flex-col gap-8 justify-center items-center">
                <div className="grid gap-2 text-center">
                    <h1 className={`text-3xl font-bold text-zinc-950 dark:text-zinc-100`}>
                        Login
                    </h1>
                    <p className="text-zinc-700 dark:text-zinc-400">
                    To login to your account, sign in with Microsoft
                    </p>
                </div>
                <div className="grid gap-4 w-1/2">
                    <Button type="submit" className="w-full" onClick={handleLogin}>
                        <FontAwesomeIcon icon={faMicrosoft} className="mr-2 "/>
                        Continue with Microsoft
                    </Button>
                </div>
                <div className="text-center text-sm dark:text-zinc-300">
                    Don&apos;t have an account?{" "}
                    <Link href="/auth/signup" className="underline">
                    Sign up
                    </Link>
                </div>
            </div>
        </main>
    )
}