import AccountNavigation from "@/components/account/subNav";
import { NewHeader } from "@/components/main/header";
import { TextMorph } from "@/components/mp/text-morph";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { SkinViewer, IdleAnimation } from "skinview3d";
import { useRouter } from "next/router";
import { clearCart } from "@/components/main/cartUtils";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
let messages = [
    [
        "Welcome back, {username}", 
        "Lookin' fresh, {username}",
        "Great to have you again, {username}", 
        "Looking sharp, {username}", 
        "Good to see you, {username}", 
        "You're awesome, {username}", 
        "Let's do this, {username}", 
        "Always a pleasure, {username}", 
        "Welcome, {username}", 
        "Look who's here, it's {username}", 
        "We love having you, {username}", 
        "Right on time, {username}", 
        "You're back, let's style, {username}", 
        "Looking ready for action, {username}",
        "Hello again, {username}", 
        "Good to have you back, {username}", 
        "Feeling good today, {username}", 
        "Here we go again, {username}", 
        "Ready to rock, {username}", 
        "Lookin' Swish, {username}"
    ],
    [
        "{username}'s Library"
    ],
    [
        "{username}'s Cosmetics"
    ],
    [
        "Settings"
    ]
];

function selectRandomMessage(page) {
    let array = messages[page];
    return array[Math.floor(Math.random() * array.length)];
}

export default function AccountPage() {
    const router = useRouter();
    //const {pState} = router.query;
    const [capeURL, setCapeURL] = useState('undefined');
    const [activeAccount, setActiveAccount] = useState({});
    const [allCapes, setAllCapes] = useState([]);
    const [currentWelcomeText, setCurrentWelcomeText] = useState('Welcome back,');
    const [currentAccountPage, setCurrentAccountPage] = useState(0);
    const [thankYouDialog, setThankYouDialog] = useState(false);


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
            
            const searchParams = new URLSearchParams(window.location.search);
            const pState = searchParams.get('pState');
            const pc = searchParams.get('pc');
            
            if (pState?.includes('cAPh')) {
                setCurrentAccountPage(parseInt(pState.slice(4)));
            }
            
            if (pc === 'false') {
                setThankYouDialog(true);
                searchParams.delete('pc');  // Remove pc after processing
            }
    
            // Update the URL without refreshing the page
            const newUrl = `${window.location.pathname}?${searchParams}`;
            router.replace(newUrl, undefined, { shallow: true })        
        }
    }, []);

    useEffect(() => {
        setCurrentWelcomeText(selectRandomMessage(currentAccountPage))
    }, [currentAccountPage]);

    return (
        <>
            <NewHeader />
            <AccountNavigation currentAccountPage={currentAccountPage} setCurrentAccountPage={setCurrentAccountPage} />
            <Dialog open={thankYouDialog} onOpenChange={setThankYouDialog}>
                <DialogContent className="w-1/2 h-1/2 flex justify-center items-center">
                    <div>
                        <p className="font-mc text-5xl">Thank you!</p>
                    </div>
                </DialogContent>
            </Dialog>
            <div className="flex flex-col items-center w-screen h-[70vh] p-[4rem]">
                <h3 className="font-mc flex items-center gap-3">
                    <TextMorph className="text-2xl">
                        {currentWelcomeText.replace('{username}', activeAccount.username)}
                    </TextMorph>
                </h3>
                <motion.div>
                    <SkinContainer capeURL={capeURL} />
                </motion.div>
            </div>
        </>
    )
}

function CosmeticItem({
    text,
    currentAccountPage,
    setCurrentAccountPage
}) {
    return(
        <motion.div className="h-[5rem] flex cursor-pointer items-center gap-4" onClick={() => setCurrentAccountPage(1)} >
            <motion.div
            animate={{
                x: currentAccountPage === 0 ? 0 : -600
            }}
            className="h-[5rem] w-[5rem] aspect-square p-2 border-2 bg-gradient-to-b from-zinc-900 to-zinc-700">
                <Image src={'/assets/accountPage/blankCosmetic.png'} width={371} height={151}/>
            </motion.div>
            <motion.span className="font-mc whitespace-nowrap">{text}</motion.span>
        </motion.div>
    )
}

function Home({ setCurrentAccountPage }) {
    return (
        <div>
            <button onClick={() => {setCurrentAccountPage(1)}}>Cosmetics</button>
        </div>
    )
}

function CosmeticPage({ setCurrentAccountPage }) {
    return (
        <div>
            <button onClick={() => {setCurrentAccountPage(0)}}>Back</button>
        </div>
    )
}

/* export function SkinContainer({ name, cape, currentAccountPage }) {
    const [elytra, setElytra] = useState(false);

    useEffect(() => {
        let skinViewer = new SkinViewer({
            canvas: document.getElementById('skin_container'),
            width: currentAccountPage === 0 ? 400 : 200,
            height:  currentAccountPage === 0 ? 600 : 400,
            enableControls: false
        });

        skinViewer.animation = new IdleAnimation();

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
        skinViewer.zoom = 1;
        skinViewer.camera.translateY(15);
        skinViewer.camera.rotateX(-22.5 * (Math.PI / 180));
        skinViewer.camera.translateX(-1.5);
    }, [name, elytra, cape]);

    return (
        <motion.canvas
            id={'skin_container'}
            className="h-screen absolute left-1/2 transform -translate-x-[48%] -translate-y-3 top-[15%] z-100 scale-[95%]"
            animate={{
                scaleZ: currentAccountPage === 0 ? '100%' : '90%'
            }}
        ></motion.canvas>
    );
} */






async function SkinContainer({capeURL}) {
    useEffect(() => {
        const doStuff = async () => {
            const canvas = document.getElementById('skin_container');
            if (canvas) {
                const renderer = new MantleRenderer({
                    live: true,
                    platformUtils: new ClientPlatformUtils(),
                    canvas,
                    ambientLight: {
                        intensity: 0.5
                    },
                    player: {
                        onSkinLoad: () => console.log("SKIN LOADED!"),
                        castShadow: true,
                        receiveShadow: false,
                        cloak: {
                            url: capeURL,
                            angle: 8 * (Math.PI / 180),
                            frames: 4
                        }
                    },
                    antialias: true,
                    fxaa: true,
                    ssaa: false,
                    alpha: true,
                    controls: true,
                    shadows: true
                });
                renderer.setSize(1200, 800);
                renderer.addEventListener("prerender", () => {
                    const time = renderer.getRenderTime();
                    
                    const leftArm = player.getBodyPart("armLeft");
                    leftArm.pivot.rotation.set(Math.sin(time / 1000) / 10, 0, (Math.sin(time / 1000) / 2 + 0.5) / -15);
        
                    const rightArm = player.getBodyPart("armRight");
                    rightArm.pivot.rotation.set(Math.sin(time / 1000) / -10, 0, (Math.sin(time / 1000) / 2 + 0.5) / 15);
        
                    const head = player.getBodyPart("head");
                    head.pivot.rotation.set(Math.sin(time / 2500) / 15, Math.sin(time / 2000) / 10, 0);
                });
                const player = renderer.getPlayer(true);
                const cloak = player.getCloak(true);
                
    
                const hatBlockModel = {
                    "credit": "Made with Blockbench",
                    "texture_size": [32, 32],
                    "textures": {
                        "0": "puffer_deflated_a28IwZcC8V"
                    },
                    "elements": [
                        {
                            "name": "head",
                            "from": [-1.5, 4, -3.5],
                            "to": [1.5, 6, -0.5],
                            "rotation": {"angle": 0, "axis": "y", "origin": [0, -26, 0]},
                            "faces": {
                                "north": {"uv": [1.5, 15, 3, 16], "texture": "#0"},
                                "east": {"uv": [0, 15, 1.5, 16], "texture": "#0"},
                                "south": {"uv": [4.5, 15, 6, 16], "texture": "#0"},
                                "west": {"uv": [3, 15, 4.5, 16], "texture": "#0"},
                                "up": {"uv": [3, 15, 1.5, 13.5], "texture": "#0"},
                                "down": {"uv": [4.5, 13.5, 3, 15], "texture": "#0"}
                            }
                        },
                        {
                            "name": "head",
                            "from": [-1.5, 5, -0.5],
                            "to": [1.5, 5, 2.5],
                            "rotation": {"angle": 0, "axis": "y", "origin": [0, -27, 0]},
                            "faces": {
                                "north": {"uv": [0, 1.5, 1.5, 1.5], "texture": "#0"},
                                "east": {"uv": [-1.5, 1.5, 0, 1.5], "texture": "#0"},
                                "south": {"uv": [3, 1.5, 4.5, 1.5], "texture": "#0"},
                                "west": {"uv": [1.5, 1.5, 3, 1.5], "texture": "#0"},
                                "up": {"uv": [1.5, 1.5, 0, 0], "texture": "#0"},
                                "down": {"uv": [3, 0, 1.5, 1.5], "texture": "#0"}
                            }
                        },
                        {
                            "name": "head",
                            "from": [1.5, 5, -3.49],
                            "to": [2.5, 5, -1.49],
                            "rotation": {"angle": 0, "axis": "y", "origin": [0, -27, 0]},
                            "faces": {
                                "north": {"uv": [13.5, 1, 14, 1], "texture": "#0"},
                                "east": {"uv": [12.5, 1, 13.5, 1], "texture": "#0"},
                                "south": {"uv": [15, 1, 15.5, 1], "texture": "#0"},
                                "west": {"uv": [14, 1, 15, 1], "texture": "#0"},
                                "up": {"uv": [14, 1, 13.5, 0], "texture": "#0"},
                                "down": {"uv": [14.5, 0, 14, 1], "texture": "#0"}
                            }
                        },
                        {
                            "name": "head",
                            "from": [-2.5, 5, -3.49],
                            "to": [-1.5, 5, -1.49],
                            "rotation": {"angle": 0, "axis": "y", "origin": [0, -27, 0]},
                            "faces": {
                                "north": {"uv": [13.5, 1, 14, 1], "texture": "#0"},
                                "east": {"uv": [12.5, 1, 13.5, 1], "texture": "#0"},
                                "south": {"uv": [15, 1, 15.5, 1], "texture": "#0"},
                                "west": {"uv": [14, 1, 15, 1], "texture": "#0"},
                                "up": {"uv": [14, 1, 13.5, 0], "texture": "#0"},
                                "down": {"uv": [14.5, 0, 14, 1], "texture": "#0"}
                            }
                        },
                        {
                            "name": "head",
                            "from": [-1.5, 6, -3.5],
                            "to": [-0.5, 7, -2.5],
                            "rotation": {"angle": 0, "axis": "y", "origin": [0, -25, 0]},
                            "faces": {
                                "north": {"uv": [14.5, 3.5, 15, 4], "texture": "#0"},
                                "east": {"uv": [14, 3.5, 14.5, 4], "texture": "#0"},
                                "south": {"uv": [15.5, 3.5, 16, 4], "texture": "#0"},
                                "west": {"uv": [15, 3.5, 15.5, 4], "texture": "#0"},
                                "up": {"uv": [15, 3.5, 14.5, 3], "texture": "#0"},
                                "down": {"uv": [15.5, 3, 15, 3.5], "texture": "#0"}
                            }
                        },
                        {
                            "name": "head",
                            "from": [0.5, 6, -3.5],
                            "to": [1.5, 7, -2.5],
                            "rotation": {"angle": 0, "axis": "y", "origin": [0, -25, 0]},
                            "faces": {
                                "north": {"uv": [12.5, 3.5, 13, 4], "texture": "#0"},
                                "east": {"uv": [12, 3.5, 12.5, 4], "texture": "#0"},
                                "south": {"uv": [13.5, 3.5, 14, 4], "texture": "#0"},
                                "west": {"uv": [13, 3.5, 13.5, 4], "texture": "#0"},
                                "up": {"uv": [13, 3.5, 12.5, 3], "texture": "#0"},
                                "down": {"uv": [13.5, 3, 13, 3.5], "texture": "#0"}
                            }
                        }
                    ],
                    "groups": [
                        {
                            "name": "head",
                            "origin": [8, 56, 8],
                            "color": 0,
                            "children": [0, 1, 2, 3, 4, 5]
                        },
                        {
                            "name": "body",
                            "origin": [8, 24, 8],
                            "color": 0,
                            "children": []
                        },
                        {
                            "name": "leftArm",
                            "origin": [3, 22, 8],
                            "color": 0,
                            "children": []
                        },
                        {
                            "name": "rightArm",
                            "origin": [13, 22, 8],
                            "color": 0,
                            "children": []
                        },
                        {
                            "name": "leftLeg",
                            "origin": [6.05, 12, 8],
                            "color": 0,
                            "children": []
                        },
                        {
                            "name": "rightLeg",
                            "origin": [9.95, 12, 8],
                            "color": 0,
                            "children": []
                        }
                    ]
                };
    
                const textureURL = 'https://db.wardrobe.gg/api/files/qm2k7p1vte3l9v2/u4mdbbmh40nxuv3/puffer_deflated_a28IwZcC8V.png'
                const hatMantleModel = parseJavaBlockModel(hatBlockModel, {attachTo: 'head', textureUrl: textureURL});


                await player.addAccessory(hatMantleModel, renderer.platformUtils, "pufferfish", {
                    frames: 1,
                    srgb: true,
                  });


                const wingsModel = (await axios.get('https://db.wardrobe.gg/api/files/qm2k7p1vte3l9v2/yyargnh4tk5ym9f/cloak_butterfly_wing_converted_gru6SCdRYJ.json')).data;
                const wingsTexture = 'https://db.wardrobe.gg/api/files/qm2k7p1vte3l9v2/yyargnh4tk5ym9f/cloak_butterfly_wing_jQHNtjqO28.png'

                
                const wingsMantleModel = parseJavaBlockModel(wingsModel, {attachTo: 'body', textureUrl: wingsTexture});



                await player.addAccessory(wingsMantleModel, renderer.platformUtils, "wings", {
                    frames: 1,
                    srgb: true,
                  });
                  
    
                // Set texture and configure animation
                cloak.setTexture('https://db.wardrobe.gg/api/files/t61yanmmzyeybng/t956o068uvc664s/test_animation_zY0i3OJOl0.png', 10);
                const animationMcMeta = (await axios.get('https://db.wardrobe.gg/api/files/t61yanmmzyeybng/t956o068uvc664s/test_animation_ueeDZmQpl4.png.mcmeta')).data
                let currentFrame = 0;

                console.log(animationMcMeta.animation)
    
                // Cycle frames every 4 seconds
                const frameCycler = setInterval(() => {
                    cloak.setFrame(currentFrame);
                    currentFrame = (currentFrame + 1) % 10;  // Reset frame after 10
                }, animationMcMeta.animation.frametime * 50);
    
                // Clean up on unmount
                return () => {
                    clearInterval(frameCycler);  // Clear interval
                    renderer.destroy();  // Destroy renderer
                };
            }
        }
        doStuff();
    }, []);
    return (
        <div>
            <canvas id="skin_container" className="w-fit h-fit"></canvas>
        </div>        
    )
}