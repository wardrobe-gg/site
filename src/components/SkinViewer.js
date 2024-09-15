import React, { useEffect, useRef } from 'react';
import { SkinViewer } from 'skinview3d';

const SV = ({ skinUrl, capeUrl, width, height }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const viewer = new skinview3d.SkinView3D(containerRef.current, {
        skin: skinUrl,
        cape: capeUrl,
        width: width,
        height: height,
      });

      viewer.setSkin(skinUrl);
      viewer.setCape(capeUrl);

      // Enable auto-rotation
      viewer.autoRotate = true;

      // Add walking animation
      viewer.animation = new skinview3d.WalkingAnimation();

      return () => {
        // Cleanup the viewer when the component is unmounted
        viewer.dispose();
      };
    }
  }, [skinUrl, capeUrl, width, height]);

  return (
    <div
      ref={containerRef}
      style={{ width: `${width}px`, height: `${height}px` }}
    />
  );
};

export default SV;