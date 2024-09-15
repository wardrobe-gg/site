import Image from "next/image";
import localFont from "next/font/local";
import LandingHeader from "@/components/landing/header";
import SparklesText from "@/components/magicui/sparkles-text";
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";
import TextReveal from "@/components/magicui/text-reveal";
import crypto from "crypto";
import { longString } from "@/lib/longstring";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export default function Home() {
  return (
    <div>
      <LandingHeader />
      <div className="w-full h-[60vh] grid grid-cols-4 items-center gap-4 p-[4rem]">
        <div className="col-span-2">
          <h1 className="z-0 text-5xl font-extrabold text-zinc-100">
            The #1 source for your
            <SparklesText
              text={"minecraft style"}
              sparklesCount={10}
              className={"text-5xl font-black z-0"}
              colors={{
                first: "#EC4176",
                second: "#A13670",
              }}
            />
          </h1>
        </div>
      </div>
      <VelocityScroll
        text="spice up your life"
        default_velocity={2}
        className="text-4xl font-black text-zinc-800 hover:text-zinc-200 duration-500 transition-colors font-mc"
      />

      <div className="w-full bg-[url('/assets/steps/transition-F-Z950.png')] h-[9rem] mt-[3rem]"></div>

      <div className="bg-custom-lpink min-h-[4rem] relative">
        hjfhkjfhx
      </div>
      <div>
        
      </div>
    </div>
  );
}