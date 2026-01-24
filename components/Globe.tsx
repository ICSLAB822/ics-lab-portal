import React, { useEffect, useRef } from 'react';
import createGlobe from 'cobe';

interface GlobeProps {
  isDark: boolean;
}

const Globe: React.FC<GlobeProps> = ({ isDark }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;
    
    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600,
      height: 600,
      phi: 0,
      theta: 0,
      dark: isDark ? 1 : 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: isDark ? [0.1, 0.1, 0.3] : [0.9, 0.9, 0.95],
      markerColor: [0.1, 0.5, 1], // Blue markers
      glowColor: isDark ? [0.1, 0.2, 0.6] : [0.8, 0.8, 0.8],
      markers: [
        // Simulated visitor heatmap data
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.0060], size: 0.03 },
        { location: [51.5074, -0.1278], size: 0.03 },
        { location: [35.6762, 139.6503], size: 0.03 },
        { location: [39.9042, 116.4074], size: 0.05 }, // Beijing
        { location: [31.2304, 121.4737], size: 0.05 }, // Shanghai
        { location: [22.3193, 114.1694], size: 0.03 }, // HK
        { location: [1.3521, 103.8198], size: 0.03 },
        { location: [-33.8688, 151.2093], size: 0.03 },
        { location: [48.8566, 2.3522], size: 0.03 },
        { location: [52.5200, 13.4050], size: 0.03 },
      ],
      onRender: (state) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = phi;
        phi += 0.005;
      },
    });

    return () => {
      globe.destroy();
    };
  }, [isDark]);

  return (
    <div className="relative w-full max-w-[300px] aspect-square mx-auto opacity-80 hover:opacity-100 transition-opacity">
        <canvas
            ref={canvasRef}
            style={{ width: '100%', height: '100%', contain: 'layout paint size' }}
        />
        <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-slate-400 font-mono">
            Active Visitors
        </div>
    </div>
  );
};

export default Globe;