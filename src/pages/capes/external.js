import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SkinViewer } from "skinview3d";
import { pb } from "@/lib/pb";
import { Button } from "@/components/ui/button";

export default function EquipExternalCape() {
    const router = useRouter();
    const {id} = router.query;

    const [capeURL, setCapeURL] = useState('')
    const [cape, setCape] = useState({});

    useEffect(() => {
        const getCapeInfo = async () => {
            try {
                const cape = await pb.collection('uploaded_capes').getOne(id, {expand: 'author'});

                let capeConstructor = `https://db.wardrobe.gg/api/files/uploaded_capes/${cape.id}/${cape.cape_file}`

                setCapeURL(capeConstructor);
                setCape(cape);
            }
            catch (e) {
                alert("Uh oh. They haven't uploaded the cape properly. Shout at them!")
                console.error(e);
            }
        }

        if (id) {
            getCapeInfo()
        }
    }, [id]);

    useEffect(() => {
        if (capeURL !== '') {
            let skinViewer = new SkinViewer({
                canvas: document.getElementById("skin_container"),
                width: 300,
                height: 400,
                skin: "/assets/skinBackground/blackSkin.png",
            });

            skinViewer.loadCape(capeURL)
            skinViewer.playerObject.rotateY(210 * (Math.PI / 180))
            skinViewer.zoom = 0.7


        }
    }, [capeURL]);

    return (
        <div className="bg-gradient-to-b from-black to-custom-bpink w-screen h-screen flex justify-center items-center overflow-hidden">
            <div className="w-2/6 h-2/3 bg-black/40 rounded-lg border">
                <div className="w-full flex justify-center">
                    <canvas id="skin_container"></canvas>
                </div>
                <div className="w-full flex flex-col justify-center">
                <p className="text-5xl font-mc text-center">{cape.name}</p>
                <span className="text-xl text-center">by {cape?.expand?.author?.name}</span>
                </div>



                <div className="h-[15rem] w-full flex gap-4 items-center justify-center">
                    <Button variant="outline">Don&apos;t equip</Button>
                    <Button>Equip {cape.name}</Button>
                </div>
            </div>
        </div>
    )
}