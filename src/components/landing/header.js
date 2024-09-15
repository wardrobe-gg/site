import { TvIcon } from "lucide-react";
import Image from "next/image";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"

export default function LandingHeader() {
    return (
        <div className="flex flex-col max-w-screen overflow-hidden sticky top-0 z-[1000]">
            <div className="h-[80px] bg-custom-bpink flex items-center justify-between py-[4rem] px-[2rem]">
                <div className="flex gap-2 items-center">
                    <img src={'/assets/logo/longnobg.png'} className="h-16 w-full"/>
                </div>

                <div>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                            <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <NavigationMenuLink>Link</NavigationMenuLink>
                            </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </div>
        </div>
    )
}