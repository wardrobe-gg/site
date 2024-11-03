import { NewHeader } from "@/components/main/header";
import StoreNavigation from "@/components/store/subNav";
import { Input } from "@/components/ui/input";
import { act, useEffect, useState } from "react";
import Pocketbase from 'pocketbase';
import Image from "next/image";
import {randomBytes} from 'crypto';
import Link from "next/link";
import { addToCart } from "@/components/main/cartUtils";
import axios from "axios";

export default function CapePage() {
    // Official cape page.
    const pb = new Pocketbase('https://db.wardrobe.gg');
    const [cosmetics, setCosmetics] = useState([]);
    const [filters, setFilters] = useState([]);
    const [potentialFilters, setPotentialFilters] = useState([]);
    const [userCosmetics, setUserCosmetics] = useState([]);

    useEffect(() => {
        const getStuff = async () => {
            let potentialFilters = await pb.collection('tags').getFullList({
                filter: "appliesToCollection='cosmetics'"
            }, {requestKey: randomBytes(4).toString('hex')});

            let i = 0;
            for (let filter of potentialFilters) {
                potentialFilters[i].url = `https://db.wardrobe.gg/api/files/tags/${filter.id}/${filter.icon}`
                i++;
            }

            console.log(potentialFilters);
            setPotentialFilters(potentialFilters)
        }
        if (typeof window !== undefined) {
            getStuff();
        }
    }, []);

    useEffect(() => {
        const getCosmetics = async () => {
            const activeAccount = JSON.parse(localStorage.getItem('activeAccount'))?.user;
            const ownedCosmetics = await axios.get('/api/cosmetic/getOwnedCosmetics', {
                params: { user: activeAccount }
            });
    
            setUserCosmetics(ownedCosmetics.data.cosmetics);
            
            // Fetch all cosmetics without filtering by ownership
            let getTheDarnCosmetics = await pb.collection('cosmetics').getList(0, 25, {
                filter: `hidden=false && tags~'${filters}'`,
                requestKey: randomBytes(4).toString('hex')
            });

            // Set `owned` to true for items in `ownedCosmetics.data.cosmetics`
            const cosmetics = getTheDarnCosmetics.items.map((item) => {
                if (ownedCosmetics.data.cosmetics.includes(item.id)) {
                    item.owned = true;
                }
                return item;
            });

            console.log(cosmetics);
            setCosmetics(cosmetics);
        }
    
        getCosmetics();
    }, [filters]);

    const switchFilter = (filterId) => {
        if (!filters.includes(filterId)) {
            setFilters([filterId])
        }
        else {
            setFilters([])
        }
    }

    const handleClick = (cosmetic) => {
        if (cosmetic.owned !== true) {
            addToCart(cosmetic)
        }
    }

    return (
        <div className="w-screen h-screen m-auto overflow-hidden">
            <NewHeader />
            <StoreNavigation />
            <></>

            <div className="w-full h-[81.8vh] flex gap-12 pt-[3rem]">
                <div className="w-[453px] h-full border-r-2 border-t-2 flex flex-col items-center p-12">
                    <div className="flex flex-col gap-8">
                        <Input className="rounded-none font-basically text-xl" placeholder="Search"/>
                        <div className="flex flex-col gap-4">
                            {potentialFilters.map((filter, index) => (
                                <div key={index} className="flex gap-4 cursor-pointer" onClick={() => switchFilter(filter.id)}>
                                    <Image src={filter.url} width="33" height="33" 
                                    className={`h-[33px] w-[33px] object-contain ${filters.includes(filter.id) && 'brightness-200'}`}
                                    />
                                    <p className={
                                        filters.includes(filter.id) ?
                                        "text-xl font-basically text-white font-bold select-none"
                                        :
                                        "text-xl font-basically text-zinc-300 select-none"
                                    }>{filter.display}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                
                <div className="p-8 w-full grid grid-cols-4 gap-8 h-full overflow-y-scroll">
                    {cosmetics.map((cosmetic, index) => (
                        <div href={`/store/cosmetic/${cosmetic.id}`} key={index} onClick={() => handleClick(cosmetic)}>
                            <div className="flex flex-col gap-2 cursor-pointer">
                                <div key={index} className="bg-gradient-to-t from-zinc-800 via-zinc-900 to-zinc-950 hover:from-custom-bpink aspect-square border-2 border-[#41414A] hover:border-custom-bpink cursor-pointer shadow-ciwhite hover:shadow-cipink transform-all duration-150">
                                    
                                </div>
                                <div className="flex justify-between px-1 font-mc">
                                    <p>{cosmetic.name}</p>
                                    <p className="text-[#8D9096]">{cosmetic.owned === true ? 'Owned' : `$${(cosmetic.cost / 100).toFixed(2)}`}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}