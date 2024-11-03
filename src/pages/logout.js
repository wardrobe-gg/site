import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { NewHeader } from "@/components/main/header";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Logout() {
    const router = useRouter();
    const [accountsInfo, setAccountsInfo] = useState([]);
    const [activeAccount, setActiveAccount] = useState(null);
    const [loading, setLoading] = useState(true);

    const {r, rName, pState} = router.query;

    useEffect(() => {
        // Load accounts from localStorage when component mounts
        const storedAccountsInfo = JSON.parse(localStorage.getItem('accountsInfo'));
        const storedActiveAccount = JSON.parse(localStorage.getItem('activeAccount'));

        setAccountsInfo(storedAccountsInfo|| []);
        setActiveAccount(storedActiveAccount);
        setLoading(false);
    }, []);

    const handleLogout = async (userID) => {
        try {
            // Call the API to log out the selected account on the server
            await axios.post('/api/auth/logout', { userID });

            // Remove the affected account from accountsInfo
            const updatedAccountsInfo = accountsInfo.filter(account => account.user !== userID);
            setAccountsInfo(updatedAccountsInfo);

            // Update localStorage if there are still accounts left
            if (updatedAccountsInfo.length > 0) {
                localStorage.setItem('accountsInfo', JSON.stringify(updatedAccountsInfo));
                // Optionally, set the first remaining account as active
                localStorage.setItem('activeAccount', JSON.stringify(updatedAccountsInfo[0]));
            } else {
                localStorage.removeItem('accountsInfo');
                localStorage.removeItem('activeAccount');
            }
        } catch (error) {
            console.error('Logout error:', error);
            // Remove the affected account from accountsInfo
            const updatedAccountsInfo = accountsInfo.filter(account => account.user !== userID);
            setAccountsInfo(updatedAccountsInfo);

            // Update localStorage if there are still accounts left
            if (updatedAccountsInfo.length > 0) {
                localStorage.setItem('accountsInfo', JSON.stringify(updatedAccountsInfo));
                // Optionally, set the first remaining account as active
                localStorage.setItem('activeAccount', JSON.stringify(updatedAccountsInfo[0]));
            } else {
                localStorage.removeItem('accountsInfo');
                localStorage.removeItem('activeAccount');
            }
            // Handle error appropriately (e.g., show a message)
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Optionally, show a loading state
    }

    return (
        <div>
            <NewHeader />


            <div className="w-screen h-[80vh] bg-oblack -mt-[4rem] flex justify-center items-center">

                <div className="bg-[url('/assets/logo/background.png')] opacity-35 fixed h-screen w-screen z-[0]">
                </div>

                <div className="bg-oblack relative z-10 w-4/6 h-3/6 border-2 border-[#41414A] flex flex-col justify-evenly items-center p-[1rem]">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-4xl font-basically tracking-wide font-medium text-center">Logout</h1>
                    </div>
                    {accountsInfo.length > 0 ?
                        <>
                            <div className="w-[60%] border rounded-lg flex flex-col overflow-hidden">
                                {accountsInfo.map((account, index) => (
                                    <div className="border-b w-full flex justify-between items-center pr-[1.5rem]" key={index}>
                                        <div className="flex gap-4 h-3/4 items-center">
                                            <Image src={`https://minotar.net/helm/${account.username}`} width="100" height="100" className="h-3/4 object-contain rounded-lg"/>

                                            <span className="font-basically text-xl font-semibold">{account.username}</span>
                                        </div>

                                        <Button onClick={() => handleLogout(account.user)}>Logout</Button>
                                    </div>
                                ))}


                            </div>
                            {r && rName && 
                            <Link className="flex font-bold" href={`${r}${pState ? `?pState=${pState}` : ''}`}>
                                <ArrowLeft className="size-6 mr-4"/> Back to {rName}
                            </Link>}
                        </>
                    :
                    <span className="text-center font-semibold font-basically text-lg">No accounts found. <Link href={'/login'} className="font-normal underline">Login?</Link></span>
                    }

                </div>
            </div>
        </div>
    );
}