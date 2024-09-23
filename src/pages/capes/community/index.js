import { useEffect, useState, useRef, useCallback } from "react";
import { randomBytes } from "crypto";
import { pb } from "@/lib/pb";
import axios from "axios";
import { SkinViewer } from "skinview3d";
import Link from "next/link";
import { VerifiedIcon } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import LandingHeader from "@/components/landing/header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import debounce from "lodash/debounce";
import { Switch } from "@/components/ui/switch";
import { Toggle } from "@/components/ui/toggle";
import Image from "next/image"
import { NewHeader } from "@/components/main/header";

export default function BrowseCapes() {
    const [filter, setFilter] = useState([]);
    const [username, setUsername] = useState('');
    const [prevUsername, setPrevUsername] = useState('');
    const [capes, setCapes] = useState([]);
    const [capeImages, setCapeImages] = useState({});
    const skinViewerRef = useRef(null);

    // Fetch the username from the database
    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const userRecord = await pb.collection('userdata').getFirstListItem(`user~'${pb.authStore.model.id}'`);
                setUsername(userRecord.mc_username || 'Notch');
            } catch (error) {
                setUsername('Notch');
            }
        };

        fetchUsername();
    }, []);

    // Fetch capes based on the filter
    useEffect(() => {
        const getCapes = async () => {
            try {
                const result = await pb.collection('uploaded_capes').getList(0, 45, {
                    filter: `tags~'${filter.join("' OR tags~'")}'`,
                    expand: 'author, tags',
                    sort: '-applications',
                    requestKey: randomBytes(10).toString('hex')
                });
                setCapes(result.items);
            } catch (error) {
                console.error("Error fetching capes:", error);
            }
        };

        getCapes();
    }, [filter]);

    // Initialize SkinViewer
    useEffect(() => {
        if (!skinViewerRef.current) {
            skinViewerRef.current = new SkinViewer({
                width: 200,
                height: 300,
                renderPaused: true,
            });
            skinViewerRef.current.playerObject.rotateY(210 * (Math.PI / 180));
        }

        return () => {
            if (skinViewerRef.current) {
                skinViewerRef.current.dispose();
                skinViewerRef.current = null;
            }
        };
    }, []);

    // Generate images with debouncing
    const generateImages = useCallback(async (forceUpdate = false) => {
        const skinViewer = skinViewerRef.current;
        const usernameToUse = username.trim() || 'Notch';
        try {
            if (forceUpdate || usernameToUse !== prevUsername) {
                const minotarSkinResponse = await axios.get(`https://minotar.net/skin/${usernameToUse}`, { responseType: 'blob' });
                const skinDataToUse = URL.createObjectURL(minotarSkinResponse.data);
    
                await skinViewer.loadSkin(skinDataToUse);
    
                if (forceUpdate) {
                    setCapeImages({}); // Clear previous cape images if username changes or forced update
                }
    
                setPrevUsername(usernameToUse);
            }
    
            const newImages = { ...capeImages }; // Preserve existing capes
    
            for (const cape of capes) {
                if (!newImages[cape.id] || forceUpdate) {
                    // Set loading state for the current cape
                    setCapeImages(prevImages => ({ ...prevImages, [cape.id]: { loading: true } }));
    
                    const capeURL = `https://db.wardrobe.gg/api/files/uploaded_capes/${cape.id}/${cape.cape_file}`;
                    await skinViewer.loadCape(capeURL);
                    skinViewer.render();
    
                    // Save the generated image
                    let capeImage = skinViewer.canvas.toDataURL()
                    
                    await skinViewer.loadCape(capeURL, {backEquipment: "elytra"});

                    skinViewer.render();
                    let elytraImage = skinViewer.canvas.toDataURL();



                    
                    // Update state with the loaded image and remove loading state
                    setCapeImages(prevImages => ({
                        ...prevImages,
                        [cape.id]: { image: capeImage, elytra: elytraImage, loading: false }
                    }));
                }
            }
        } catch (error) {
            console.error("Error generating images:", error);
        }
    }, [username, capes, capeImages, prevUsername]);

    const debouncedGenerateImages = useCallback(debounce(generateImages, 500), [generateImages]);

    useEffect(() => {
        if (capes.length > 0 && ((username !== prevUsername || hasTagsChanged()))) {
            debouncedGenerateImages(true); // Force update when username or tags change
        }

        return () => {
            debouncedGenerateImages.cancel();
        };
    }, [capes, username, debouncedGenerateImages, prevUsername]);

    useEffect(() => {

    })

    // Check if any tag has changed
    const hasTagsChanged = () => {
        return capes.some(cape => !capeImages[cape.id]);
    };

    const toggleOfficial = useCallback(() => {
        setFilter(prev => 
            prev.includes('4avkinm8p2qorvg')
                ? prev.filter(item => item !== '4avkinm8p2qorvg')
                : [...prev, '4avkinm8p2qorvg']
        );
    }, []);

    return (
        <>
            <NewHeader />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 items-start">
                <div className="col-span-1 md:col-span-2 lg:col-span-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pt-8">
                    <div className="col-span-5">
                        <h1 className="text-4xl font-mc">Capes</h1>
                        <span>View our cape collection, all equippable for completely free.</span>
                    </div>

                    <div className="col-span-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {capes.map(item => (
                            <CapeItem key={item.id} item={item} image={capeImages[item.id]?.image} elytra={capeImages[item.id]?.elytra} />
                        ))}
                    </div>
                </div>

                <div className="flex items-center space-x-2 h-[70vh] col-span-1 row-span-full">
                    <div className="flex flex-col items-center justify-start gap-4 bg-gradient-to-b from-zinc-900 to-zinc-800 border-2 border-custom-lpink rounded-r-xl w-full h-full p-2 py-6">
                        <div className="space-y-2 flex flex-col">
                            <Label htmlFor="username">Username</Label>
                            <Input value={username} id="username" onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <hr className="bg-custom-violet/30 w-full"/>
                    </div>
                </div>
            </div>
        </>
    );
}

const CapeItem = React.memo(({ item, image, elytra, loading }) => {
    const [useElytra, setUseElytra] = useState(false);

    return (
        <Link href={`/capes/${item.id}`} className="group h-fit col-span-1">
            <div className="bg-zinc-900 border-2 rounded-lg overflow-hidden transition-all duration-100 hover:border-custom-brass/90">
                <div className="h-[30vh] bg-[url('/assets/skinBackground/image.webp')] bg-cover overflow-hidden flex items-center justify-center">
                    {loading ? (
                        <LoadingSpinner />
                    ) : (
                        <img className="h-full group-hover:scale-150 transition-all duration-200" src={useElytra ? elytra : image} />
                    )}
                </div>
                <div className="bg-gradient-to-t from-zinc-800 to-zinc-900 h-1/6 p-3 flex flex-col gap-1">
                    <span className="text-xl font-bold flex gap-2 items-center whitespace-nowrap overflow-hidden truncate text-ellipsis">
                        {item.name} 
                        {item.tags.includes('4avkinm8p2qorvg') && <OfficialIcon />}
                    </span>
                    <div className="w-full flex justify-between items-center">
                        <Link className="relative z-50 w-fit" href={`/author/${item.author}`}>by {item?.expand?.author?.name ?? 'Unknown'}</Link>
                        <Toggle onClick={(e) => {e.preventDefault(); setUseElytra(!useElytra)}} value={useElytra} 
                        className={`${useElytra ? 'bg-zinc-100/10' : 'bg-transparent'} aspect-square p-0`}>
                            <Image src={'/assets/mc/elytra.webp'} width="32" height="32" />
                        </Toggle>
                    </div>
                </div>
            </div>
        </Link>
    )
});

CapeItem.displayName = 'CapeItem';

function LoadingSpinner() {
    return (
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-400"></div>
    );
}

function OfficialIcon() {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <VerifiedIcon className="size-4" />
            </TooltipTrigger>
            <TooltipContent>
                <p>Official Cape</p>
            </TooltipContent>
        </Tooltip>
    );
}

function TagDisplay({disabled, text, onClick}) {
    return (
        <div
            onClick={onClick}
            className={`select-none h-fit w-fit py-1 px-4 rounded-full cursor-pointer border-[1px] ${disabled ? 'bg-zinc-900 text-zinc-500 border-zinc-400' : 'bg-zinc-800 text-zinc-100 border-zinc-100'}`}
        >
            {text}
        </div>
    );
}