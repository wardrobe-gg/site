import LandingHeader from "@/components/landing/header";
import Image from "next/image";

export default function ComingSOon() {
    return (
        <>
            <div className="w-screen overflow-hidden">
                <LandingHeader />
                <div className="h-[60vh] flex z-[10]">
                    <div className="w-full lg:w-[45%] relative flex flex-col justify-center"> {/* Set relative position to contain absolutely positioned child */}
                        <div className="mt-auto h-[30%] w-full">
                        </div>
                        <div className="mt-auto bg-gradient-to-t from-custom-bpink to-black h-[70%] w-full z-0">
                        </div>
                        <div className="absolute top-0 left-0 z-10 w-full h-full flex justify-end items-end">
                            <Image src={'/assets/logo/di-logo.png'} width="589" height="589" className="hidden lg:block translate-x-[50%] h-[55vh] w-[55vh] select-none" draggable="false" />
                            <Image src={'/assets/characters/character1.png'} width="298" height="512" className="h-[80%] absolute w-fit aspect-[298/512] -bottom-[1.92vh] translate-x-[-4vw] lg:translate-x-[4vw]" loading="eager" />

                        </div>
                        <div className="absolute top-0 left-0 z-[2000] w-full h-full flex justify-start items-end translate-y-[-2%]">
                            <Image src={'/assets/logo/cut-side.png'} width="589" height="589" className="h-fit w-fit scale-[140%] select-none" draggable="false" />
                            <Image src={'/assets/logo/cut-btm.png'} width="589" height="589" className="h-fit w-fit -ml-[2rem] scale-[140%] select-none" draggable="false" />
                            <Image src={'/assets/characters/character2.png'} width="298" height="512" className="h-[80%] absolute w-fit aspect-[298/512] lg:translate-x-[8vw]" loading="eager" />

                        </div>
                    </div>
                    <div className="w-[55%] bg-black hidden lg:block">
                        <div className="absolute top-0 left-0 z-0 w-full h-full flex justify-end items-end">
                            <Image src={'/assets/logo/lcut-btm-side.png'} width="866" height="619" className="select-none" draggable="false" />
                        </div>
                    </div>
                </div>

                <div className="w-full flex flex-col justify-start items-start lg:items-end p-12 lg:p-4 relative z-10">
                        <h1 className="font-mc text-4xl lg:text-6xl text-left lg:text-right">Coming Soon</h1>
                        <span className="font-basically text-xl lg:text-3xl lg:max-w-[60%] text-left lg:text-right">
                            We&apos;re so glad that you&apos;re excited for the future of <span className="underline">wardrobe.gg</span>, but you&apos;ve come too early.
                        </span>
                </div>

                <div className="absolute bottom-0 right-0 z-0 lg:hidden overflow-hidden">
                    <Image src={'/assets/logo/lcut-btm-side.png'} width="866" height="619" className="translate-x-[20%] translate-y-[20%]"/>
                </div>
            </div>
        </>
    );
}