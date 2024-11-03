import { ChevronDown, ChevronUp, PlusIcon } from "lucide-react";
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

export default function StoreNavigation() {
    const [signedIn, setSignedIn] = useState(false);
    const router = useRouter();
    const pathname = router.pathname;
    const [accountInfo, setAccountInfo] = useState([]);
    const [activeAccount, setActiveAccount] = useState({});
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

    const handleScroll = () => {
        const position = window.scrollY;
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const makeActiveAccount = (accountId) => {
        // Find the new active account based on the accountId
        const newActiveAccount = accountInfo.find(account => account.id === accountId);
        localStorage.setItem('activeAccount', JSON.stringify(newActiveAccount));
    };

    return (
        <div className="relative flex justify-between px-[4rem] py-[0rem] -mt-[1rem] z-0">
            <div className={`relative z-0 flex w-full ${pathname !== '/store/community' ? 'pl-[3rem] gap-8':'gap-[5rem]'}`}>
                <h2 className={`font-mc text-4xl fixed left-[4rem] transition-all duration-200 ${pathname === '/store/community' ? 'hidden' : ''} ${scrollPosition >= 100 ? 'translate-x-[6rem] translate-y-[.5rem]' : ''}`}>Store</h2>
                <h2 className={`select-none font-mc ${pathname !== '/store/community' ? 'text-transparent' : ''} text-4xl`} aria-hidden="true">Store</h2>
                <div className={`flex font-basically transition-all duration-200 ${pathname !== '/store/community' && scrollPosition >= 100 ? 'translate-x-[4rem]' : ''}`}>
                    <SubNavItem requiredLink={'/store/capes'} name={'Capes'} />
                    <SubNavItem requiredLink={'/store/community'} name={'User Creations'} />
                    <SubNavItem requiredLink={'/store/upload'} name={'Upload'} />
                </div>
            </div>
            <div className="w-full flex items-center justify-end font-basically text-zinc-500 font-medium whitespace-nowrap">
                {signedIn === true ?
                    <p className="flex gap-2">Logged in as 
                    
                    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                        <DropdownMenuTrigger asChild><span className="text-white underline flex">{activeAccount.username} <ChevronDown className={`transition-all duration-200 ${isDropdownOpen === true ? 'rotate-180' : ''}`} /></span></DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>{activeAccount.username}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {accountInfo.map((account, index) => (
                                <DropdownMenuItem key={index} onClick={() => makeActiveAccount(account.id)}>
                                    {account.username}
                                </DropdownMenuItem>
                            ))}
                            <Link href={'/login?c=true'} target="_blank"><DropdownMenuItem><PlusIcon className="size-4 mr-2"/> Add account</DropdownMenuItem></Link>
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
                <div className="h-full border-2 border-zinc-200 text-zinc-200 flex justify-center items-center px-[1rem] text-xl font-bold">
                    {name}
                </div>
            </Link>
        )
        :
        (
            <Link href={requiredLink}>
                <div className="h-full border-2 border-zinc-700 text-zinc-400 flex justify-center items-center px-[1rem] text-xl font-medium">
                    {name}
                </div>
            </Link>
        )
    )
}