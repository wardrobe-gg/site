import { NewHeader } from "@/components/main/header";
import StoreNavigation from "@/components/store/subNav";
import { Input } from "@/components/ui/input";
import { useEffect, useState, useRef } from "react";
import Pocketbase from 'pocketbase';
import Image from "next/image";
import { randomBytes } from 'crypto';
import { SkinViewer, WalkingAnimation, FlyingAnimation } from "skinview3d";
import Link from "next/link";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import { CheckIcon, Loader2 } from "lucide-react";

export default function CapePage() {
    const pb = new Pocketbase('https://db.wardrobe.gg');
    const [capes, setCapes] = useState([]);
    const [filters, setFilters] = useState(['4avkinm8p2qorvg']);
    const [potentialFilters, setPotentialFilters] = useState([]);
    const [information, setInformation] = useState({});

    const [search, setSearch] = useState('');

    useEffect(() => {
        const getStuff = async () => {
            let potentialFilters = await pb.collection('tags').getFullList({
                filter: "appliesToCollection='uploaded_capes'",
            }, { requestKey: randomBytes(4).toString('hex') });

            let i = 0;
            for (let filter of potentialFilters) {
                potentialFilters[i].url = `https://db.wardrobe.gg/api/files/tags/${filter.id}/${filter.icon}`;
                i++;
            }

            console.log(potentialFilters);
            setPotentialFilters(potentialFilters);
        };

        if (typeof window !== undefined) {
            getStuff();
        }
    }, []);

    useEffect(() => {
        const getCapes = async () => {
            let getTheDarnCapes = await pb.collection('uploaded_capes').getList(0, 25, {
                filter: `tags~'${filters[0]}'${filters[1] !== undefined ? ` && tags~'${filters[1]}'` : ''}${search !== '' ? `&& name~'${search}'` : ''}`,
                requestKey: randomBytes(4).toString('hex'),
                expand: 'author'
            });

            let items = getTheDarnCapes.items;

            let i = 0;
            for (let cape of items) {
                let url = `https://db.wardrobe.gg/api/files/uploaded_capes/${cape.id}/${cape.render}`;
                items[i].url = url;
                i++;
            }

            setCapes(items);
        };

        getCapes();
    }, [filters, search]);

    const switchFilter = (filterId) => {
        if (!filters.includes(filterId)) {
            setFilters(['4avkinm8p2qorvg', filterId]);
        } else {
            setFilters(['4avkinm8p2qorvg']);
        }
    };


    useEffect(() => {
        const updateInformation = () => {
            let information = {
                isLoggedIn: (localStorage.getItem('activeAccount')) ? true : false,
                activeAccountUsername: JSON.parse(localStorage.getItem('activeAccount'))?.username
            }
            setInformation(information)
        };

        // Update information initially
        updateInformation()

        // Set up an interval to check for localStorage changes
        const interval = setInterval(() => {
            updateInformation();
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-screen h-screen m-auto overflow-hidden">
            <NewHeader />
            <StoreNavigation />
            <div className="w-full h-[81.8vh] flex gap-12 pt-[3rem]">
                <div className="w-[453px] h-full border-r-2 border-t-2 flex flex-col items-center p-12">
                    <div className="flex flex-col gap-8">
                        <Input className="rounded-none font-basically text-xl" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                        <div className="flex flex-col gap-4">
                            {potentialFilters.map((filter, index) => (
                                <div
                                    key={index}
                                    className="flex gap-4 cursor-pointer"
                                    onClick={() => switchFilter(filter.id)}
                                >
                                    <Image
                                        src={filter.url}
                                        width="33"
                                        height="33"
                                        className={`h-[33px] w-[33px] object-contain ${filters.includes(filter.id) && 'brightness-200'}`}
                                    />
                                    <p
                                        className={
                                            filters.includes(filter.id)
                                                ? "text-xl font-basically text-white font-bold select-none"
                                                : "text-xl font-basically text-zinc-300 select-none"
                                        }
                                    >
                                        {filter.display}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="p-8 w-full grid grid-cols-4 gap-8 h-full overflow-y-scroll">
                    {capes.map((cape, index) => (
                        <CapeItem cape={cape} key={index} information={information} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function CapeItem({ cape, information }) {
    const [isEquipping, setIsEquipping] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [fauxApplications, setFauxApplications] = useState(-1);

    const equipCloak = async () => {
        if (information.activeAccountUsername) {
            setIsEquipping(1);
            try {
                const updateCloak = await axios.post('/api/cloak/equipCloak', {
                    cloakId: cape.id,
                    activeAccount: JSON.parse(localStorage.getItem('activeAccount'))?.user
                });
    
                if (updateCloak.status === 200) {
                    setFauxApplications(cape.applications + 1);
                    setIsEquipping(2);
                    setTimeout(() => {
                        setIsOpen(false)
                        setTimeout(() => {setIsEquipping(0)}, 150);
                    }, 1750);
                    
                }
                if (updateCloak.status === 200) {
                    setFauxApplications(cape.applications + 1);
                    setIsEquipping(2);
                    setTimeout(() => {
                        setIsOpen(false)
                        setTimeout(() => {setIsEquipping(0)}, 150);
                    }, 1750);
                    
                }
                else if (updateCloak.status === 201) {
                    setIsEquipping(4);
                    setTimeout(() => {
                        setIsOpen(false)
                        setTimeout(() => {setIsEquipping(0)}, 150);
                    }, 1750);
                }
            }
            catch (e) {
                setIsEquipping(3);
            }
        }
        else {
            alert('Stop trying to break things :/');
        }
    }


    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <div>
                    <div className="flex flex-col gap-2 cursor-pointer">
                        <div className="bg-gradient-to-t from-zinc-800 via-zinc-900 to-zinc-950 hover:from-custom-bpink aspect-square border-2 border-[#41414A] hover:border-custom-bpink cursor-pointer shadow-[0_0_100px_5px_rgba(255,255,255,0.1)] transform-all duration-150">
                            <img
                                src={cape.url}
                                alt={cape.name}
                                className="scale-[130%] translate-x-1.5 translate-y-2"
                            />
                        </div>
                        <div className="flex justify-between px-1 font-mc">
                            <p className="whitespace-nowrap overflow-hidden overflow-ellipsis">{cape.name}</p>
                        </div>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className="flex justify-center items-center w-5/12 h-1/2 px-[5rem] gap-[4rem] bg-zinc-950">
                <div className="w-1/3 flex flex-col items-center">
                    <SkinContainer name={information.activeAccountUsername} cape={`https://db.wardrobe.gg/api/files/uploaded_capes/${cape.id}/${cape.cape_file}`} />
                </div>
                <div className="w-2/3 flex flex-col justify-between items-start h-full pb-[4rem]">
                    <div className="flex flex-col justify-evenly h-full">
                        <div className="flex flex-col gap-4">
                            <div className="gap-2">
                                <p className="text-3xl font-basically font-semibold">{cape.name}</p>
                                <p className="text-xl font-basically text-zinc-400">by {cape.expand.author.name}</p>
                            </div>
                            <p>This item adds a custom cape and elytra to the back of your Minecraft character, visible to all other players using wardrobe.gg with Optifine.</p>
                        </div>
                        <div className="w-full">
                            {!information?.activeAccountUsername ?
                            <Link href={'/login?c=true'} target="_blank"><Button className="w-full rounded-none text-lg bg-zinc-800 hover:bg-zinc-800/80 text-white font-mc">Login to equip</Button></Link>
                            :
                            (isEquipping === 0
                                ? <Button className="w-full rounded-none text-lg bg-custom-bpink hover:bg-custom-bpink/80 text-white font-mc" onClick={equipCloak}>Equip</Button>
                            :( isEquipping === 1
                                ? <Button className="w-full rounded-none text-lg bg-custom-bpink/80 hover:bg-custom-bpink/60 text-white font-mc">Equipping...</Button>
                            : isEquipping === 2
                                ? <Button className="w-full rounded-none text-lg bg-custom-bpink hover:bg-custom-bpink/80 text-white font-mc" onClick={() => setIsOpen(false)}><CheckIcon className="size-4 mr-2" />Equipped!</Button>
                            : isEquipping === 3 
                                ? <Button className="w-full rounded-none text-lg bg-custom-bpink/80 hover:bg-custom-bpink/60 text-white font-mc" onClick={() => setIsOpen(false)}>An error occured.</Button>
                                : <Button className="w-full rounded-none text-lg bg-custom-bpink hover:bg-custom-bpink/80 text-white font-mc" onClick={() => setIsOpen(false)}><CheckIcon className="size-4 mr-2" />Already Equipped</Button>
                            ))}
                        </div>
                    </div>
                    
                    <span className="font-mc text-zinc-500">Equipped {fauxApplications === -1 ? cape.applications : fauxApplications} {fauxApplications !== -1 && (fauxApplications === 1 ? 'time' : 'times')} {fauxApplications === -1 && (cape.applications === 1 ? 'time' : 'times')}</span>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export function SkinContainer({ name, cape }) {
    const [elytra, setElytra] = useState(false);

    useEffect(() => {

        let skinViewer = new SkinViewer({
            canvas: document.getElementById('skin_container'),
            width: 275,
            height: 400,
            enableControls: true
        });

        if (name === undefined) {
            skinViewer.loadSkin('/assets/skinBackground/Skin.png')
        }
        else {
            skinViewer.loadSkin(`https://minotar.net/skin/${name}`);
        }
        if (elytra === true) {
            skinViewer.loadCape(cape, {backEquipment: 'elytra'})
        }
        else {
            skinViewer.loadCape(cape);
        }


        skinViewer.playerObject.rotateY(150 * (Math.PI / 180));
        skinViewer.playerObject.rotateX(3 * (Math.PI / 180));
        skinViewer.zoom = 0.8;
        skinViewer.camera.translateY(15)
        skinViewer.camera.rotateX(-22.5 * (Math.PI / 180))
        skinViewer.camera.translateX(-1.5)
    }, [name, elytra, cape]);

    return (
        <div>
            <div className="rounded-r-2xl w-full flex flex-col justify-start items-center h-full">
                <canvas id="skin_container" className={`bg-center bg-cover`}></canvas>
                <div className="w-full flex justify-center items-center gap-2 -mt-[2rem]">
                    <Button size="icon" className="bg-transparent hover:bg-zinc-900 rounded-none" onClick={() => setElytra(false)}>
                        <Image src={'/assets/icons/cape.png'} width={128} height={112} className={`h-[25px] w-[25px] object-contain transition-all duration-200 ${!elytra ? 'brightness-200' : 'hover:brightness-125'}`}/>
                    </Button>
                    <Button size="icon" className="bg-transparent hover:bg-zinc-900 rounded-none" onClick={() => setElytra(true)}>
                        <Image src={'/assets/icons/elytra.png'} width={128} height={112} className={`h-[25px] w-[25px] object-contain transition-all duration-200 ${elytra ? 'brightness-200' : 'hover:brightness-125'}`}/>
                    </Button>
                </div>
            </div>
        </div>
    );
}