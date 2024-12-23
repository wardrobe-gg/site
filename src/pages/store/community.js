import { NewHeader } from "@/components/main/header";
import StoreNavigation from "@/components/store/subNav";
import { Input } from "@/components/ui/input";
import { useEffect, useState, useRef } from "react";
import Pocketbase from 'pocketbase';
import Image from "next/image";
import {randomBytes} from 'crypto';
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
import { CheckIcon } from "lucide-react";
import { Loader2 } from "lucide-react";
import { SkinViewer, WalkingAnimation, FlyingAnimation, IdleAnimation } from "skinview3d";
import InfiniteScroll from "react-infinite-scroll-component";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"



export default function CapePage() {
    const pb = new Pocketbase('https://db.wardrobe.gg');
    const [capes, setCapes] = useState([]);
    const [filters, setFilters] = useState(['4avkinm8p2qorvg']);
    const [potentialFilters, setPotentialFilters] = useState([]);
    const [information, setInformation] = useState({});
    const [search, setSearch] = useState('');
    const [hasMore, setHasMore] = useState(true); // Track if more items are available
    const [currentPage, setCurrentPage] = useState(1); // Track the current page
    const searchTimeout = useRef(null); // For debounce
    const isLoading = capes.length === 0;
    const [totalPages, setTotalPages] = useState(0);

    const handleSearch = (e) => {
        const { value } = e.target;
        clearTimeout(searchTimeout.current);
        searchTimeout.current = setTimeout(() => {
            setSearch(value);
            setCurrentPage(1); // Reset to page 1 when searching
            setCapes([]); // Reset capes
        }, 500); // 500ms debounce delay
    };

    const getCapes = async (page) => {
        const limit = 16;
        let response = await pb.collection('uploaded_capes').getList(page, limit, {
            filter: `tags!~'4avkinm8p2qorvg'`,
            requestKey: randomBytes(4).toString('hex'),
            expand: 'author'
        });
        setTotalPages(response.totalPages)

        let items = response.items.map(cape => ({
            ...cape,
            url: `https://db.wardrobe.gg/api/files/uploaded_capes/${cape.id}/${cape.render}`,
            inLibrary: false,
            active: false
        }));

        const activeAccount = JSON.parse(localStorage.getItem('activeAccount'))?.user;
        if (activeAccount) {
            const userCapeLibrary = await axios.get('/api/cloak/getAllCloaks', {
                params: { userID: activeAccount }
            });
            const libraryCapes = userCapeLibrary.data.capes;
            items = items.map(item => {
                const libraryCape = libraryCapes.find(libraryCape => libraryCape.id === item.id);
                return { 
                    ...item, 
                    inLibrary: !!libraryCape, 
                    active: libraryCape?.active || false 
                };
            });
        }

        setCapes(items);
        setHasMore(response.items.length === limit);
    };

    useEffect(() => {
        getCapes(currentPage);
    }, [filters, search, currentPage]);

    const handlePageChange = (page) => {
        if (page === 0) {
            setCurrentPage(1);
        }
        else if (page > totalPages) {
            setCurrentPage(totalPages);
        }
        else {
            setCapes([]);
            setCurrentPage(page);
        }
    };

    const switchFilter = (filterId) => {
        if (!filters.includes(filterId)) {
            setFilters(['4avkinm8p2qorvg', filterId]);
        } else {
            setFilters(['4avkinm8p2qorvg']);
        }
    };

    useEffect(() => {
        getCapes(1);
        const updateInformation = () => {
            setInformation({
                isLoggedIn: !!localStorage.getItem('activeAccount'),
                activeAccountUsername: JSON.parse(localStorage.getItem('activeAccount'))?.username
            });
        };

        const interval = setInterval(updateInformation, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-screen h-screen m-auto overflow-hidden">
            <NewHeader />
            <StoreNavigation />
            <></>

            <div className="p-8 w-full grid grid-cols-5 gap-8 h-[78vh] mt-12 overflow-y-scroll no-scrollbar">
                
                {capes.map((cape, index) => (
                    <CapeItem cape={cape} key={index} information={information} />
                ))}

                <div className="col-span-full">
                        {isLoading ? 
                            <div className="w-full flex  justify-center gap-4 items-center font-mc text-xl"><Loader2 className="animate-spin" /> Loading</div>
                        :
                        <>
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink isActive={currentPage === 1} onClick={()=> handlePageChange(1)}>1</PaginationLink>
                                    </PaginationItem>
                                    {totalPages > 1 && <PaginationItem>
                                        <PaginationLink isActive={currentPage === 2} onClick={()=> handlePageChange(2)}>2</PaginationLink>
                                    </PaginationItem>}
                                    {totalPages > 2 && <PaginationItem>
                                        <PaginationLink isActive={currentPage === 3} onClick={()=> handlePageChange(3)}>3</PaginationLink>
                                    </PaginationItem>}
                                    {totalPages > 3 && 
                                    <>
                                    {totalPages > 4 && <PaginationItem>
                                        <PaginationEllipsis/>
                                    </PaginationItem>}
                                    <PaginationItem>
                                        <PaginationLink isActive={currentPage === totalPages} onClick={() => handlePageChange(totalPages)}>{totalPages}</PaginationLink>
                                    </PaginationItem></>}
                                    <PaginationItem>
                                        <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </>}
                    </div>
            </div>
        </div>
    )
}

function CapeItem({ cape, information }) {
    const [isEquipping, setIsEquipping] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [isAddedToLibrary, setIsAddedToLibrary] = useState(cape?.inLibrary === true ? true : false);

    useEffect(() => {
        setIsAddedToLibrary(cape.inLibrary); // Ensure local state reflects prop changes
    }, [cape.inLibrary]);

    useEffect(() => {
        if (cape.active === true) {
            setIsEquipping(4);
        }
    }, [cape.active])

    const equipCloak = async () => {
        if (information.activeAccountUsername) {
            setIsEquipping(1);
            try {
                const updateCloak = await axios.post('/api/cloak/equipCloak', {
                    cloakId: cape.id,
                    activeAccount: JSON.parse(localStorage.getItem('activeAccount'))?.user
                });
    
                if (updateCloak.status === 200) {
                    setIsEquipping(2);
                    setTimeout(() => {
                        setIsOpen(false)
                        setTimeout(() => {setIsEquipping(4)}, 150);
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
    const addToLibrary = async () => {
        try {
            setIsAddedToLibrary(!isAddedToLibrary);
            await axios.post('/api/cloak/addToLibrary', {
                cloakId: cape.id,
                activeAccount: JSON.parse(localStorage.getItem('activeAccount'))?.user
            })
        }
        catch (e) {
            console.error(e);
            setIsAddedToLibrary(false);
            toast.error('An error occured.')
        }
    }


    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <div>
                    <div className="flex flex-col gap-2 cursor-pointer">
                        <div className="bg-gradient-to-t from-zinc-800 via-zinc-900 to-zinc-950 hover:from-custom-bpink aspect-square border-2 border-[#41414A] hover:border-custom-bpink cursor-pointer shadow-ciwhite hover:shadow-cipink transform-all duration-150 overflow-hidden">
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
            <DialogContent className="flex justify-center items-center w-1/2 h-1/2 pr-[4rem] gap-[4rem] bg-oblack">
                <div className="w-1/3 flex flex-col items-center h-full">
                    <SkinContainer name={information.activeAccountUsername} cape={`https://db.wardrobe.gg/api/files/uploaded_capes/${cape.id}/${cape.cape_file}`} />
                </div>
                <div className="w-2/3 flex flex-col justify-evenly items-start h-full pt-[3rem] pb-[1.25rem]">
                    <div className="flex flex-col justify-between h-full">
                        <div className="flex flex-col gap-4">
                            <div className="gap-2">
                                <p className="text-3xl font-mc font-semibold">{cape.name}</p>
                                <p className="text-lg font-basically text-zinc-400">by {cape?.expand?.author?.name ? cape.expand.author.name : 'Unknown'}</p>
                            </div>
                            <p>This item adds a custom cape and elytra to the back of your Minecraft character, visible to all other players using wardrobe.gg with Optifine.</p>
                        </div>
                        <div className="w-full flex gap-4">
                            <button className={`aspect-square h-full border-2 border-[#8D9096] flex justify-center items-center ${isAddedToLibrary === true && 'bg-white border-white'}`} onClick={addToLibrary}>
                                <Image src={isAddedToLibrary === true ? '/assets/icons/library-selected.png' : '/assets/icons/library-unselected.png'} height={34} width={34} className={`h-1/2 w-1/3 ${isAddedToLibrary === true && 'brightness-0'}`}/>
                            </button>
                            {!information?.activeAccountUsername && cape.active === false ?
                            <Link href={'/login?c=true'} target="_blank"><Button className="w-full rounded-none text-lg bg-zinc-800 hover:bg-zinc-800/80 text-white font-mc">Login to equip</Button></Link>
                            :
                            (isEquipping === 0
                                ? <Button className="w-full rounded-none text-lg bg-custom-bpink hover:bg-custom-bpink/80 text-white font-mc" onClick={equipCloak}>Equip</Button>
                            :( isEquipping === 1
                                ? <Button className="w-full rounded-none text-lg bg-custom-bpink/80 hover:bg-custom-bpink/60 text-white font-mc">Equipping...</Button>
                            : isEquipping === 2
                                ? <Button className="w-full rounded-none text-lg bg-custom-bpink hover:bg-custom-bpink/80 text-white font-mc" onClick={() => setIsOpen(false)}>Equipped</Button>
                            : isEquipping === 3 
                                ? <Button className="w-full rounded-none text-lg bg-custom-bpink/80 hover:bg-custom-bpink/60 text-white font-mc" onClick={() => setIsOpen(false)}>An error occured.</Button>
                                : <Button className="w-full rounded-none text-lg bg-custom-bpink/80 hover:bg-custom-bpink/60 text-white font-mc" onClick={() => setIsOpen(false)}>Equipped</Button>
                            ))}
                        </div>
                    </div>
                    
                </div>
            </DialogContent>
        </Dialog>
    );
}

function SkinContainer({ name, cape }) {
    const [elytra, setElytra] = useState(false);

    useEffect(() => {

        let skinViewer = new SkinViewer({
            canvas: document.getElementById('skin_container'),
            width: 275,
            height: 400,
            enableControls: false
        });

        skinViewer.animation = new IdleAnimation();

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
    }, [name, elytra]);

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