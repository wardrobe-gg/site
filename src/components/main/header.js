
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

  
export default function MainHeader() {
    return (
        <div className="h-[10vh] w-full bg-black flex justify-between items-end border-b sticky top-0 lg:mb-[4rem] px-4 lg:px-[8rem]">
            <div className="flex gap-8 h-full w-full items-center">
                <Link href={'/'}>Home</Link>
                <Link href={'/'}>Store</Link>
                <Link href={'/'}>Compatiability</Link>
                <Link href={'/'}>FAQ</Link>
            </div>
            <Image src={'/assets/logo/longnobg.png'} width="1102" height="404" className="h-full w-fit translate-y-[35%]" />
            <div className="flex gap-4 h-full w-full items-center justify-end">
                <Button className="px-[3rem] h-3/5 rounded-none text-xl bg-custom-bpink font-mc text-white hover:bg-custom-bpink/90">
                    DOWNLOAD
                </Button>
            </div>
        </div>
    )
}


export function NewHeader() {
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
                            <NavigationMenuTrigger>Capes</NavigationMenuTrigger>
                            <NavigationMenuContent className="p-4 flex gap-4">
                                <NavigationMenuLink>
                                    <Link href={'/capes/catalog'}>
                                        <div className="w-[10rem] h-full bg-gradient-to-b from-custom-bping-d to-custom-bpink p-6 rounded-sm flex flex-col gap-4 justify-center items-center">
                                            <Image src={'/assets/characters/cloakicon.png'} width="500" height="500" className="h-[6rem] w-[12rem] object-contain"/>
                                            <p className="whitespace-nowrap text-lg font-mc text-center">Official</p>
                                        </div>
                                    </Link>
                                </NavigationMenuLink>
                                <div className="w-[10rem] h-full flex flex-col gap-4">
                                    <NavigationMenuLink>
                                        <Link href={'/capes/community'}>
                                            <div className="w-full py-4 bg-zinc-900 rounded-sm text-center">
                                                Community
                                            </div>
                                        </Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink>
                                        <Link href={'/'}>
                                            <div className="w-full py-4 bg-zinc-900 rounded-sm text-center">
                                                Custom
                                            </div>
                                        </Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link href={'/lookup'}>
                                            <div className="w-full py-4 bg-zinc-900 rounded-sm text-center">
                                                User Lookup
                                            </div>
                                        </Link>
                                    </NavigationMenuLink>
                                </div>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Cosmetics</NavigationMenuTrigger>
                            <NavigationMenuContent className="p-4 flex gap-4">
                                <div className="w-[10rem] h-full flex flex-col gap-4">
                                    <NavigationMenuLink>
                                        <Link href={'/capes/community'}>
                                            <div className="w-full py-4 bg-zinc-900 rounded-sm text-center">
                                                Community
                                            </div>
                                        </Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink>
                                        <Link href={'/'}>
                                            <div className="w-full py-4 bg-zinc-900 rounded-sm text-center">
                                                Create your Own
                                            </div>
                                        </Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link href={'/lookup'}>
                                            <div className="w-full py-4 bg-zinc-900 rounded-sm text-center">
                                                User Lookup
                                            </div>
                                        </Link>
                                    </NavigationMenuLink>
                                </div>
                                <NavigationMenuLink>
                                    <Link href={'/capes/catalog'}>
                                        <div className="w-[10rem] h-full bg-gradient-to-b from-custom-bping-d to-custom-bpink p-6 rounded-sm flex flex-col gap-4 justify-center items-center">
                                            <Image src={'/assets/characters/cloakicon.png'} width="500" height="500" className="h-[6rem] w-[12rem] object-contain"/>
                                            <p className="whitespace-nowrap text-lg font-mc text-center">Official</p>
                                        </div>
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/compatibility" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Compatiability
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
            <Image src={'/assets/logo/longnobg.png'} width="1102" height="404" className="h-full w-fit translate-y-[35%] scale-[100%]" />
            <div className="flex gap-4 h-full w-full items-center justify-end">
                <Button className="px-[5rem] h-3/5 rounded-none text-xl bg-custom-bpink font-mc text-white hover:bg-custom-bpink/90">
                    DOWNLOAD
                </Button>
            </div>
        </div>
    )
}