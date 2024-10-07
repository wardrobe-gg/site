import { NewHeader } from "@/components/main/header";
import StoreNavigation from "@/components/store/subNav";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/router";

export default function CapePage() {
    const router = useRouter()
    const {cape} = router.query;

    return (
        <div className="w-screen h-screen m-auto overflow-hidden">
            <NewHeader />
            <></>

            <div className="w-full h-[84vh] flex gap-12 pt-[3rem]">
                <div className="w-[453px] h-2/3 border-r-4 border-t-4 border-b-4 flex justify-center p-12 pl-16">
                </div>
            </div>
        </div>
    )
}