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
import { Button } from "../ui/button";
import Link from "next/link";

export default function LandingHeader() {
    return (
        <div className="flex flex-col max-w-screen overflow-hidden sticky top-0 z-[1000] pb-[2rem]">
            <div className="h-[80px] bg-custom-bpink flex items-center justify-between py-[4rem] px-[2rem]">
                <div className="flex gap-2 items-center">
                    <img src={'/assets/logo/longnobg.png'} className="h-16 w-full"/>
                </div>

                <div className="flex gap-2">
                    <Link href={'/capes/catalog/browse'}><Button>Cloak Catalog</Button></Link>
                    <Link href={'/capes/community/browse'}><Button>Community Capes</Button></Link>
                </div>
            </div>
        </div>
    )
}