
import Image from "next/image";

export default function LandingHeader() {
    return (
        <div className="h-[10vh] w-full bg-oblack flex justify-center items-end border-b sticky top-0 lg:mb-[4rem] scale-[80%]">
            <Image src={'/assets/logo/longnobg.png'} width="1102" height="404" className="h-full w-fit translate-y-[35%]" />
        </div>
    )
}