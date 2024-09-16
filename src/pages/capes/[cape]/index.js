import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import { FlyingAnimation, SkinViewer, WalkingAnimation, RunningAnimation, IdleAnimation } from 'skinview3d';
import { randomBytes } from "crypto";
import { pb } from "@/lib/pb";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Toggle } from "@/components/ui/toggle";
import Image from "next/image";

export default function ViewCapePage() {
    const router = useRouter();
    const { cape } = router.query;

    const [capeURL, setCapeURL] = useState('');
    const [username, setUsername] = useState('');
    const [debouncedUsername, setDebouncedUsername] = useState('');

    const [useElytra, setUseElytra] = useState(false);

    useEffect(() => {
        const getCapeURL = async () => {
            try {
                const getCapeInfo = await pb.collection('uploaded_capes').getOne(cape, { requestKey: randomBytes(32).toString('hex') });

                const urlBuilder = `https://db.wardrobe.gg/api/files/uploaded_capes/${getCapeInfo.id}/${getCapeInfo.cape_file}`;

                const getCape = await axios.get(urlBuilder, { responseType: 'blob' });

                const capeBlob = getCape.data;
                const capeObjectURL = URL.createObjectURL(capeBlob);

                setCapeURL(capeObjectURL);
            } catch (error) {
                console.error("Failed to fetch cape:", error);
            }
        };

        if (cape) getCapeURL();
    }, [cape]);

    // Debouncing logic for the username input
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedUsername(username);
        }, 500); // Adjust delay as needed (500ms in this example)

        return () => {
            clearTimeout(handler);
        };
    }, [username]);

    return (
        <>
            {capeURL.length > 0 ? (
                <div>
                    <SkinContainer name={debouncedUsername} cape={capeURL} elytra={useElytra} />
                    <Input value={username} onChange={(e) => setUsername(e.target.value)} />

                    <Toggle onClick={(e) => {e.preventDefault(); setUseElytra(!useElytra)}} value={useElytra} 
                        className={`${useElytra ? 'bg-zinc-100/10' : 'bg-transparent'} aspect-square p-0`}>
                            <Image src={'/assets/mc/elytra.webp'} width="32" height="32" />
                    </Toggle>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </>
    );
}

function SkinContainer({ name, cape, elytra }) {
    const [skinViewState, setSkinViewState] = useState(null);
    const [isAutoRotate, setIsAutorotate] = useState(false);

    useEffect(() => {

        let skinViewer = new SkinViewer({
            canvas: document.getElementById('skin_container'),
            width: 1000,
            height: 400,
            enableControls: true
        });

        let u = name;
        if (u.length < 3) {
            u = 'MHF_Steve'
        }
        console.log(elytra)
        if (elytra === true) {
            skinViewer.loadCape(cape, {backEquipment: 'elytra'})
            skinViewer.animation = new FlyingAnimation();
        }
        else {
            skinViewer.loadCape(cape);
            skinViewer.animation = new WalkingAnimation();
        }

        skinViewer.loadSkin(`https://minotar.net/skin/${u}`);

        skinViewer.playerObject.rotateY(210 * (Math.PI / 180));
        skinViewer.zoom = 0.6;

        setSkinViewState(skinViewer);
    }, [name, elytra]);

    const toggleAutoRotate = () => {
        let skv = skinViewState;
        skv.autoRotate = !skinViewState.autoRotate;

        setIsAutorotate(!isAutoRotate);
        setSkinViewState(skv);
    };

    return (
        <div>
            <div className="rounded-r-2xl border-2 w-fit h-fit overflow-hidden">
                <canvas id="skin_container" className={`bg-[url('/assets/skinBackground/image.webp')] bg-center bg-cover`}></canvas>
            </div>

            {skinViewState && (
                <div className="flex items-center space-x-2">
                    <Switch id="autoRotate" checked={skinViewState.autoRotate} onClick={toggleAutoRotate} />
                    <Label htmlFor="autoRotate">Auto Rotate</Label>
                </div>
            )}
        </div>
    );
}