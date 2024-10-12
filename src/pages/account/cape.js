import AccountNavigation from "@/components/account/subNav";
import { NewHeader } from "@/components/main/header";
import { act, useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FlyingAnimation, SkinViewer, WalkingAnimation } from "skinview3d";

export default function AccountPage() {
    const [capeURL, setCapeURL] = useState('');
    const [activeAccount, setActiveAccount] = useState('');

    useEffect(() => {
        const getInfo = async () => {
            try {
                const activeAccount = typeof window !== "undefined" && localStorage.getItem('activeAccount');
                if (activeAccount) {
                    const parsedAccount = JSON.parse(activeAccount);
                    setActiveAccount(parsedAccount.username);
                    const response = await axios.get('/api/cloak/getCloak', {
                        params: { userID: parsedAccount.user }
                    });

                    console.log(response.data.url)
                    if (response.data && response.data.url) {
                        setCapeURL(response.data.url);
                    } else {
                        console.error("Cape URL not found in response");
                    }
                } else {
                    console.error("No active account found in localStorage");
                }
            } catch (error) {
                console.error("Error fetching the cape:", error);
            }
        };

        if (typeof window !== "undefined") {
            getInfo();
        }
    }, []);

    return (
        <>
            <NewHeader />
            <AccountNavigation />
            {capeURL && activeAccount && <SkinContainer name={activeAccount} cape={capeURL} />}
        </>
    );
}

function SkinContainer({ name, cape }) {
    const [elytra, setElytra] = useState(false);

    useEffect(() => {
        const skinViewer = new SkinViewer({
            canvas: document.getElementById('skin_container'),
            width: 600,
            height: 400,
            enableControls: true
        });

        if (!name) {
            skinViewer.loadSkin('/assets/skinBackground/Skin.png');
        } else {
            skinViewer.loadSkin(`https://minotar.net/skin/${name}`);
        }

        if (elytra) {
            skinViewer.loadCape(cape, { backEquipment: 'elytra' });
        } else {
            skinViewer.loadCape(cape);
        }

        skinViewer.playerObject.rotateY(150 * (Math.PI / 180));
        skinViewer.playerObject.rotateX(3 * (Math.PI / 180));
        skinViewer.zoom = 0.8;
        skinViewer.camera.translateY(15);
        skinViewer.camera.rotateX(-22.5 * (Math.PI / 180));
        skinViewer.camera.translateX(-1.5);

        // Cleanup when component unmounts
        return () => {
            skinViewer.dispose();
        };
    }, [name, elytra, cape]);

    return (
        <div>
            <div className="rounded-r-2xl w-full flex flex-col justify-start items-center h-full">
                <canvas id="skin_container" className="bg-center bg-cover"></canvas>
                <div className="w-full flex justify-center items-center gap-2 -mt-[2rem]">
                    <Button size="icon" className="bg-transparent hover:bg-zinc-900 rounded-none" onClick={() => setElytra(false)}>
                        <Image src={'/assets/icons/cape.png'} width={128} height={112} className={`h-[25px] w-[25px] object-contain transition-all duration-200 ${!elytra ? 'brightness-200' : 'hover:brightness-125'}`} />
                    </Button>
                    <Button size="icon" className="bg-transparent hover:bg-zinc-900 rounded-none" onClick={() => setElytra(true)}>
                        <Image src={'/assets/icons/elytra.png'} width={128} height={112} className={`h-[25px] w-[25px] object-contain transition-all duration-200 ${elytra ? 'brightness-200' : 'hover:brightness-125'}`} />
                    </Button>
                </div>
            </div>
        </div>
    );
}