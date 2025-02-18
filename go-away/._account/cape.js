import AccountNavigation from "@/components/account/subNav";
import { NewHeader } from "@/components/main/header";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { SkinViewer, WalkingAnimation, PlayerAnimation, IdleAnimation, RunningAnimation } from "skinview3d";
import { CircleSlash } from "lucide-react";

export default function AccountPage() {
    const [capeURL, setCapeURL] = useState('undefined');
    const [activeAccount, setActiveAccount] = useState({});
    const [allCapes, setAllCapes] = useState([]);

    useEffect(() => {
        const getInfo = async () => {
            try {
                const activeAccount = typeof window !== "undefined" && localStorage.getItem('activeAccount');
                if (activeAccount) {
                    const parsedAccount = JSON.parse(activeAccount);
                    setActiveAccount(parsedAccount);

                    const response = await axios.get('/api/cloak/getCloak', {
                        params: { userID: parsedAccount.user }
                    });

                    if (response.data && response.data.url) {
                        setCapeURL(response.data.url);
                    }

                    const getAllCloaks = await axios.get('/api/cloak/getAllCloaks', {
                        params: { userID: parsedAccount.user }
                    });

                    setAllCapes(getAllCloaks.data.capes);
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

    const changeSlot = async (id, url) => {
        // Update the `allCapes` state, setting only the clicked cape to active
        const updatedCapes = allCapes.map(cape =>
            cape.slotID === id ? { ...cape, active: true } : { ...cape, active: false }
        );
        setAllCapes(updatedCapes);
        setCapeURL(url)

        console.log(id);

        const setActiveCloak = await axios.post('/api/cloak/setActiveCloak', {
            activeAccount: activeAccount.user,
            slotID: id
        })
        console.log(setActiveCloak)
    };

    return (
        <>
            <NewHeader />
            <AccountNavigation />
            <div className="w-screen grid grid-cols-12 gap-[4rem] p-[4rem] h-[80vh]">
                <div className="col-span-4 row-span-full border-4 rounded-none overflow-hidden">
                    {activeAccount && <SkinContainer name={activeAccount.username} cape={capeURL} className="w-full" />}
                </div>
                <div className="w-full flex flex-col col-span-8 py-4">
                    <span className="text-3xl font-mc ">Your Library</span>
                    <span className="font-basically">Here, you can view all of the cloaks that you&apos;ve previously equipped. Click on one to change back!.</span>
                    <div className="grid grid-cols-4 gap-8 py-[2rem] max-h-[65vh] overflow-y-scroll mt-[10px]">
                        {capeURL !== 'undefined' && <div className={`flex flex-col items-center gap-2 ${capeURL && 'cursor-pointer'}`} onClick={() => changeSlot('none', '')}>
                            <div className={`w-full ${!capeURL ? 'border-4 border-custom-bpink shadow-cipink' : 'border-zinc-800 shadow-ciwhite'} transition-all duration-200 border min-h-[20vh] p-1 flex flex-col justify-center items-center aspect-square`}>
                                <CircleSlash size={25}/>
                            </div>
                            <span className="text-xl text-left w-full font-mc">None</span>
                        </div>}
                        {allCapes.length > 0 && allCapes.map((cape, index) => (
                            <div key={index} className={`flex flex-col items-center gap-2 ${cape.active === false && 'cursor-pointer'}`} onClick={() => changeSlot(cape.slotID, cape.capeURL)}>
                                <div className={`w-full ${cape.active === true ? 'border-4 border-custom-bpink shadow-cipink' : 'border-zinc-800 shadow-ciwhite'} transition-all duration-200 border min-h-[20vh] p-1 flex flex-col justify-center items-center aspect-square`}>
                                    <Image src={cape.render} width={1080} height={1080} className="scale-125" />
                                </div>
                                <span className="text-xl text-left w-full font-mc whitespace-nowrap overflow-hidden overflow-ellipsis">{cape.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

function SkinContainer({ name, cape }) {
    const [elytra, setElytra] = useState(false);

    useEffect(() => {
        const skinViewer = new SkinViewer({
            canvas: document.getElementById('skin_container'),
            width: 600,
            height: 675,
            enableControls: true
        });

        skinViewer.animation= new IdleAnimation();

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