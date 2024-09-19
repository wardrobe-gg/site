import { Button } from "@/components/ui/button";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function ComingSoon() {
    return (
        <>
            <Head>
                <title>Coming Soon - Wardrobe</title>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" type="image/png" href="/assets/logo/logonobg.png" />
            </Head>
            <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-b from-custom-bpink to-custom-lpink overflow-hidden">
                <div className="flex flex-col items-center h-[70vh] gap-[12rem]">
                    <Image 
                        src={'/assets/logo/longnobg.png'} 
                        width="1101" 
                        height="403"
                        className="w-[80vw] md:w-[50vw] lg:w-[20vw]"
                        alt="Wardrobe Logo"
                    />
                    <div className="h-[20vh] flex flex-col gap-4 items-center justify-start px-[4rem]">
                        <h1 className="text-6xl font-extrabold text-center font-blackentina-i italic">Coming Soon</h1>

                        <span className="text-xl text-center font-semibold">
                            We&apos;re so glad that you&apos;re excited for the future of wardrobe.gg, but you&apos;ve come too early.
                        </span>

                        <Link href={'https://discord.gg/XB5Hk3EnDU'} target="_blank">
                            <Button>
                                <FontAwesomeIcon icon={faDiscord} className="mr-2 size-4" /> Join us on Discord
                            </Button>
                        </Link>
                    </div>

                    <Image 
                        src={'/assets/comingSoon/buffoonspoon.png'} 
                        height="1000" 
                        width="2000" 
                        className="w-fit self-end drop-shadow-2xl animate-bounce"
                        alt="Buffoon Spoon Image"
                    />
                    <Image 
                        src={'/assets/comingSoon/shrimple.png'} 
                        height="1000" 
                        width="2000" 
                        className="w-[15vw] absolute self-start rotate-[10deg] drop-shadow-4xl"
                        alt="Shrimple Image"
                    />
                </div>
            </div>
        </>
    );
}