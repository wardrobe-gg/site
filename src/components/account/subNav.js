import { ChevronDown, LogOutIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export default function AccountNavigation() {
    const router = useRouter();
    const [signedIn, setSignedIn] = useState(false);
    const [accountInfo, setAccountInfo] = useState([]);
    const [activeAccount, setActiveAccount] = useState({});

    useEffect(() => {


        const updateInformation = () => {
            try {
                let accountInfo = JSON.parse(localStorage.getItem('accountsInfo'));
                let activeAccount = JSON.parse(localStorage.getItem('activeAccount'));
                
                setAccountInfo(accountInfo.filter(account => account.username !== activeAccount.username));
                setActiveAccount(activeAccount);
                setSignedIn(true)
            }
            catch (e) {
                setSignedIn(false);
            }
                
        };

        // Update information initially
        updateInformation()

        // Set up an interval to check for localStorage changes
        const interval = setInterval(() => {
            updateInformation();
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const makeActiveAccount = (accountId) => {
        // Find the new active account based on the accountId
        const newActiveAccount = accountInfo.find(account => account.id === accountId);
        localStorage.setItem('activeAccount', JSON.stringify(newActiveAccount));
    };

    return (
        <div className="flex justify-between px-[4rem] py-[0rem] -mt-[1rem]">
            <div className="flex gap-8 w-full">
                <h2 className="font-mc text-4xl">Account</h2>

                <div className="flex font-basically">
                    <SubNavItem requiredLink={'/account'} name={'Home'} />
                    <SubNavItem requiredLink={'/account/cape'} name={'Your Cape'} />
                    <SubNavItem requiredLink={'/account/cosmetics'} name={'Your Cosmetics'} />
                    <SubNavItem requiredLink={`/logout?rName=Account&r=${encodeURIComponent(router.pathname)}`} name={'Logout'} />
                </div>
            </div>
            <div className="w-full flex items-center justify-end font-basically text-zinc-500 font-medium whitespace-nowrap">
                {signedIn === true ?
                    <p className="flex gap-2">Logged in as 
                    
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild><span className="text-white underline flex">{activeAccount.username} <ChevronDown /></span></DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>{activeAccount.username}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {accountInfo.map((account, index) => (
                                <DropdownMenuItem key={index} onClick={() => makeActiveAccount(account.id)}>
                                    {account.username}
                                </DropdownMenuItem>
                            ))}
                            <Link href={'/login?c=true'} target="_blank"><DropdownMenuItem><PlusIcon className="size-4 mr-2"/> Add account</DropdownMenuItem></Link>
                            <DropdownMenuSeparator />
                            <Link href={'/logout'} target="_blank"><DropdownMenuItem><LogOutIcon className="size-4 mr-2"/> Logout</DropdownMenuItem></Link>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </p>
                :
                <p>to continue, <Link href={'/login?c=true'} target="_blank" className="underline text-white">Log in</Link></p>
                }
                
            </div>
        </div>
    )
}

function SubNavItem({requiredLink, name}) {
    const router = useRouter();

    return (
        requiredLink === router.pathname ?
        (
            <Link href={requiredLink}>
                <div className="h-full border border-zinc-200 text-zinc-200 flex justify-center items-center px-[1rem] text-xl font-bold">
                    {name}
                </div>
            </Link>
        )
        :
        (
            <Link href={requiredLink}>
                <div className="h-full border border-zinc-700 text-zinc-400 flex justify-center items-center px-[1rem] text-xl font-medium">
                    {name}
                </div>
            </Link>
        )
    )
}