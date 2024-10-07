import { NewHeader } from "@/components/main/header";
import StoreNavigation from "@/components/store/subNav";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import Pocketbase from 'pocketbase';
import Image from "next/image";
import {randomBytes} from 'crypto';
import Link from "next/link";

export default function CapePage() {
    // Official cape page.
    const pb = new Pocketbase('https://db.wardrobe.gg');
    const [capes, setCapes] = useState([]);
    const [filters, setFilters] = useState([]);
    const [potentialFilters, setPotentialFilters] = useState([]);

    useEffect(() => {
        const getStuff = async () => {
            let potentialFilters = await pb.collection('tags').getFullList({
                filter: "appliesToCollection='uploaded_capes'"
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
        const getCapes = async () => {
            let getTheDarnCapes = await pb.collection('uploaded_capes').getList(0, 25, {
                filter: `tags!~'4avkinm8p2qorvg'`,
                expand: 'author',
                requestKey: randomBytes(4).toString('hex')
            })

            let items = getTheDarnCapes.items;

            let i = 0
            for (let cape of items) {
                let url = `https://db.wardrobe.gg/api/files/uploaded_capes/${cape.id}/${cape.render}`
                console.log(url);

                items[i].url = url;
                i++;
            }

            setCapes(getTheDarnCapes.items)
        }

        getCapes();
    }, [filters]);

    const switchFilter = (filterId) => {
        if (!filters.includes(filterId)) {
            setFilters([filterId])
        }
        else {
            setFilters([])
        }
    }

    return (
        <div className="w-screen h-screen m-auto overflow-hidden">
            <NewHeader />
            <StoreNavigation />
            <></>

            <div className="w-full h-[81.8vh] flex gap-12 pt-[3rem]">
                
                <div className="p-8 w-full grid grid-cols-5 gap-8 h-[79vh] overflow-y-scroll">
                        {capes.map((cape, index) => (
                            <Link href={`/store/cape/${cape.id}`}>
                                <div className="flex flex-col gap-2 cursor-pointer">
                                    <div key={index} className="bg-gradient-to-t from-zinc-800 via-zinc-900 to-zinc-950 hover:from-custom-bpink aspect-square border-2 border-[#41414A] hover:border-custom-bpink cursor-pointer shadow-[0_0_100px_5px_rgba(255,255,255,0.1)] transform-all duration-150">
                                        <img src={cape.url} alt={cape.name} />
                                    </div>
                                    <div className="flex justify-between px-1 font-mc">
                                        <p>{cape.name}</p>
                                        <p className="text-[#8D9096] max-w-[8rem] overflow-clip whitespace-nowrap overflow-ellipsis">by {cape.expand.author.name}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                </div>
            </div>
        </div>
    )
}