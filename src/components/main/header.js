import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import { useEffect, useState } from "react";
import Cart from "./Cart";

export default function MainHeader() {
    return (
        <div className="h-[10vh] w-full bg-black flex justify-between items-end border-b sticky top-0 lg:mb-[4rem] px-4 lg:px-[8rem]">
            <div className="flex gap-8 h-full w-full items-center">
                <Link href={'/'}>Home</Link>
                <Link href={'/'}>Store</Link>
                <Link href={'/'}>Compatibility</Link>
                <Link href={'/'}>FAQ</Link>
            </div>
            <Image src={'/assets/logo/longnobg.png'} width="1102" height="404" className="h-full w-fit translate-y-[35%]" />
            <div className="flex gap-4 h-full w-full items-center justify-end">
                <Button className="px-[3rem] h-3/5 rounded-none text-xl bg-custom-bpink font-mc text-white hover:bg-custom-bpink/90">
                    DOWNLOAD
                </Button>
            </div>
        </div>
    );
}

export function NewHeader() {
    const [information, setInformation] = useState({});

    useEffect(() => {
        const updateInformation = () => {
            let information = {
                isLoggedIn: (localStorage.getItem('activeAccount')) ? true : false,
                activeAccountUsername: JSON.parse(localStorage.getItem('activeAccount'))?.username
            }
            setInformation(information)
        };

        // Update information initially
        updateInformation()

        // Set up an interval to check for localStorage changes
        const interval = setInterval(() => {
            updateInformation();
        }, 100);

        return () => clearInterval(interval);
    }, []);


    return (
        <div className="h-[10vh] w-full bg-black flex justify-between items-end border-b sticky top-0 lg:mb-[4rem] px-4 lg:px-[8rem] z-[100]">
            <div className="flex gap-8 h-full w-full items-center">
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Link href="/" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    Home
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/store/capes" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    Store
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/compatibility" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    Compatibility
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/faq" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    FAQ
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            <Image src={'/assets/logo/longnobg.png'} width="1102" height="404" className="h-full w-fit scale-[50%]" />
            <div className="flex gap-4 h-full w-full items-center justify-end">
                <Button className="px-[5rem] h-[3.2rem] rounded-none text-xl bg-custom-bpink font-mc text-white hover:bg-custom-bpink/90">
                    DOWNLOAD
                </Button>
                <Link href={information?.activeAccountUsername ? '/account' : '/login'} className="border-[3.5px] border-[#41414A]">
                    {!information?.activeAccountUsername ? <Image src={'/assets/characters/blankFace.png'} width="63" height="63" className="h-[3rem] w-[3rem] aspect-square" />
                    : <Image src={`https://minotar.net/helm/${information.activeAccountUsername}/63.png`} width="63" height="63" className="h-[2.7rem] w-[2.7rem] aspect-square" />}
                </Link>
                <Cart />
            </div>
        </div>
    );
}