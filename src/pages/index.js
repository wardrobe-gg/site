import LandingHeader from "@/components/landing/header";
import { faDiscord, faInstagram, faTiktok, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ComingSOon() {
    return (
        <>
            <Head>
            {/* General Meta Tags */}
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
                <meta name="theme-color" content="#FF3475" />

                {/* SEO Meta Tags */}
                <meta name="title" content="Wardrobe.gg - Coming Soon"/>
                <meta name="description" content="Wardrobe.gg is a Minecraft cosmetic service offering free cloaks and premium cosmetics. Stay tuned for our official launch!"/>
                <meta name="keywords" content="Minecraft, cloaks, cosmetics, Minecraft skins, Minecraft capes, free Minecraft cloaks, paid Minecraft cosmetics, Wardrobe.gg"/>
                <meta name="robots" content="index, follow"/>

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website"/>
                <meta property="og:url" content="https://wardrobe.gg/"/>
                <meta property="og:title" content="Wardrobe.gg - Coming Soon"/>
                <meta property="og:description" content="Wardrobe.gg isn't just another minecraft cosmetic service; our cloaks are completely free."/>
                <meta property="og:image" content="https://wardrobe.gg/assets/coming-soon.jpg"/>

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://wardrobe.gg/" />
                <meta property="twitter:title" content="Wardrobe.gg - Coming Soon" />
                <meta property="twitter:description" content="Minecraft cloaks: free, forever. Coming soon." />
                <meta property="twitter:image" content="https://wardrobe.gg/assets/coming-soon.jpg" />

                <title>Wardrobe.gg - Minecraft Cosmetics | Coming Soon</title>
            </Head>
            <div className="w-screen overflow-hidden">
                <LandingHeader />
                <div className="h-[55vh] flex z-[10]">
                    <div className="w-full relative flex flex-col justify-center overflow-x-visible overflow-y-hidden"> {/* Set relative position to contain absolutely positioned child */}
                        <div className="mt-auto h-[30%] w-full">
                        </div>
                        <div className="mt-auto bg-gradient-to-t from-custom-bpink to-black h-[70%] w-full lg:w-[68%] z-0">
                        </div>
                        <div className="absolute top-0 left-0 z-10 w-full lg:w-[69%] h-full flex justify-end items-end gap-[4rem]">
                            <Image src={'/assets/logo/butchered-di-logo.png'} width="589" height="589" className="hidden xl:block translate-x-[49.75%] h-[55vh] w-[55vh] select-none" alt={''} draggable="false" loading="eager"  />
                            <Image src={'/assets/characters/character1.png'} width="298" height="512" className="h-[80%] absolute w-fit aspect-[298/512] -bottom-[1.92vh] translate-x-[-4vw] lg:translate-x-[3.5vw]" alt={''} loading="eager" />
                            <Image src={'/assets/characters/character2.png'} width="298" height="512" className="h-[80%] hidden absolute lg:block w-fit aspect-[298/512] lg:-translate-x-[12vw] origin-center rotate-[200deg] -scale-x-100 mr-[5rem]" loading="eager" alt={''} />

                        </div>
                        <div className="absolute top-0 left-0 z-[0] w-full h-full flex justify-start items-end pl-[8vw] translate-y-[-2%]">
                            <Image src={'/assets/logo/uncut.png'} width="589" height="589" className="h-fit w-fit select-none -translate-x-[2vw] translate-y-[4rem]" draggable="false" alt={''} loading="eager"  />
                            <Image src={'/assets/logo/cut-btm.png'} width="589" height="589" className="h-fit w-fit scale-[200%] -ml-[1rem] select-none hidden xl:block" draggable="false" loading="eager" alt={''}  />
                            <Image src={'/assets/characters/character2.png'} width="298" height="512" className="h-[80%] absolute w-fit aspect-[298/512] lg:translate-x-[8vw] lg:hidden" loading="eager" alt={''} />

                        </div>
                    </div>
                    <div className="w-[55%] bg-black hidden lg:block">

                        <div className="hidden md:hidden xl:flex absolute top-[30vh] pr-[5rem] right-0 z-0 h-[60vh] justify-end items-center">
                            <p className="font-basically lg:text-3xl transform rotate-90 w-fit origin-bottom-right text-zinc-400">
                                Stand out in every dimension
                            </p>
                        </div>
                        <div className="absolute top-0 left-0 z-0 w-full h-full flex justify-end items-end">
                            <Image src={'/assets/logo/lcut-btm-side.png'} width="866" height="619" className="select-none" draggable="false" />
                        </div>
                    </div>
                </div>

                <div className="w-full flex flex-col justify-start items-start lg:items-end p-8 lg:p-4 lg:pr-[3rem] relative z-10">
                        <h1 className="font-mc text-4xl lg:text-5xl text-left lg:text-right lg:w-[52%] xl:w-[40%]">Customise like never before</h1>
                        <span className="font-basically text-xl lg:text-2xl lg:max-w-[60%] xl:max-w-[40%] text-left lg:text-right">
                            We&apos;re so glad that you&apos;re excited for the future of <span className="underline">wardrobe.gg</span>, but you&apos;ve come too early.
                        </span>
                        <div className="w-full lg:w-1/2 flex lg:justify-end gap-[6vw] lg:gap-[3rem] pt-[1.5rem] pr-[1rem] items-center">
                            <Link href={'https://x.com/wardrobegg'} target="_blank"><FontAwesomeIcon icon={faXTwitter} className="text-[2.15rem]" /></Link>
                            <Link href={'https://tiktok.com/@wardrobe.gg'} target="_blank"><FontAwesomeIcon icon={faTiktok} className="text-[2.15rem]" /></Link>
                            <Link href={'https://instagram.com/wardrobe.gg'} target="_blank"><FontAwesomeIcon icon={faInstagram} className="text-[2.25rem]" /></Link>
                            <Link href={'https://discord.gg/XB5Hk3EnDU'} target="_blank" className="-mr-4">
                                <Button>
                                    <FontAwesomeIcon icon={faDiscord} className="w-4 h-4 mr-2"/> Join us on Discord
                                </Button>
                            </Link>
                        </div>
                </div>

                <div className="absolute bottom-0 right-0 z-0 lg:hidden overflow-hidden">
                    <Image src={'/assets/logo/lcut-btm-side.png'} width="866" height="619" className="translate-x-[20%] translate-y-[20%]" loading="eager" alt={''} />
                </div>
            </div>
        </>
    );
}