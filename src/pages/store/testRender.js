import { useEffect } from "react";
import MantleRenderer, { ClientPlatformUtils, parseJavaBlockModel } from "mantle-renderer";
import axios from "axios";
export default function TestPage() {
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
                            url: "https://db.wardrobe.gg/api/files/t61yanmmzyeybng/llr0zxfojykw79s/leather_drip_HIn0JEtVL8.png",
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
    );
}