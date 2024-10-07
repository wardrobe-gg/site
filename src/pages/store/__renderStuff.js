import Pocketbase from 'pocketbase';
import { useEffect, useState } from 'react';
import { SkinViewer } from 'skinview3d';

export default function Render() {
    const [renderedImages, setRenderedImages] = useState([]);

    useEffect(() => {
        const doRender = async () => {
            const pb = new Pocketbase('https://db.wardrobe.gg');

            // Fetch capes that haven't been rendered yet
            const capesToRender = await pb.collection('uploaded_capes').getFullList();

            // Create a SkinViewer instance for rendering
            const skinViewer = new SkinViewer({
                width: 1080,
                height: 1080,
                renderPaused: true
            });

            skinViewer.playerObject.rotateY(150 * (Math.PI / 180));
            skinViewer.zoom = 1.5;
            skinViewer.camera.translateX(-1.5)

            let renderedImages = [];

            // Utility function to convert DataURL to Blob
            const dataURLtoBlob = (dataUrl) => {
                const arr = dataUrl.split(',');
                const mime = arr[0].match(/:(.*?);/)[1];
                const bstr = atob(arr[1]);
                let n = bstr.length;
                const u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new Blob([u8arr], { type: mime });
            };

            for (const cape of capesToRender) {
                const capeURL = `https://db.wardrobe.gg/api/files/uploaded_capes/${cape.id}/${cape.cape_file}`;
                console.log(capeURL);

                // Load the cape
                await skinViewer.loadCape(capeURL, { backEquipment: 'cape' });

                // Render the scene
                skinViewer.render();

                // Convert canvas to Data URL and then to Blob
                const imageDataURL = skinViewer.canvas.toDataURL();
                const imageBlob = dataURLtoBlob(imageDataURL);

                // Create a FormData object to prepare for file upload
                const formData = new FormData();
                formData.append('render', imageBlob, `rendered_${cape.id}.png`);

                // Upload the rendered image back to PocketBase
                const uploadResponse = await pb.collection('uploaded_capes').update(cape.id, formData);

                // Assuming the PocketBase upload response contains the file URL
                const imageUrl = `https://db.wardrobe.gg/api/files/uploaded_capes/${cape.id}/${uploadResponse.file}`;

                // Store the image URL
                renderedImages.push(imageUrl);
            }

            // Update state after rendering and uploading all images
            setRenderedImages(renderedImages);
        };

        doRender();
    }, []);

    return (
        <>
            {renderedImages.map((imageUrl, index) => (
                <img src={imageUrl} key={index} alt={`Rendered cape ${index}`} />
            ))}
        </>
    );
}