import React, { useEffect, useRef } from "react";
import createGlobe from "cobe";

const FeaturesSectionDemo = () => {
  return (
    <div className="relative z-20 py-10 max-w-7xl mx-auto flex flex-col justify-center items-center">
      <div className="px-4 md:px-8">
        <h2 className="bg-clip-text text-white text-center bg-gradient-to-b from-blue-400 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
          Plan Out Your Fun
        </h2>
        <p className="max-w-xl mx-auto text-sm md:text-lg text-white font-semibold dark:text-neutral-400 text-center">
          UNI opens you a world of endless possibilities of activities and things to do, without breaking the bank!
        </p>
      </div>
     
      
      
      <div className="mt-12 rounded-md dark:border-neutral-800 w-full flex justify-center items-center">
        <Globe className="md:-right-10 -bottom-50 md:-bottom-72" />
        
      </div>
    </div>
  );
};

export const Globe = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: [
        // longitude latitude
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.006], size: 0.1 },
      ],
      onRender: (state) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = phi;
        phi += 0.01;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "auto", maxWidth: "600px", aspectRatio: 1 }}
      className={className}
    />
  );
};

export default FeaturesSectionDemo;