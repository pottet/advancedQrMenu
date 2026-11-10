"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  src: string;
  poster: string;
  alt: string;
};

/**
 * Etkileşimli 3D önizleme + AR.
 * - Android: Scene Viewer / WebXR
 * - iOS: Quick Look (USDZ, GLB'den anında üretilir)
 * model-viewer üç boyutlu motoru (three.js) içerdiği için sadece
 * bu sayfada, tarayıcıda dinamik olarak yüklenir.
 */
export default function ARViewer({ src, poster, alt }: Props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    import("@google/model-viewer").then(() => {
      if (mounted) setReady(true);
    });
    return () => {
      mounted = false;
    };
  }, []);

  if (!ready) {
    return (
      <div className="relative h-full w-full">
        <Image src={poster} alt={alt} fill sizes="100vw" className="object-cover opacity-60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="rounded-full bg-coal/80 px-4 py-2 text-sm text-cream-dim">
            3D model yükleniyor…
          </span>
        </div>
      </div>
    );
  }

  return (
    <model-viewer
      src={src}
      poster={poster}
      alt={alt}
      ar
      ar-modes="webxr scene-viewer quick-look"
      ar-scale="auto"
      ar-placement="floor"
      camera-controls
      auto-rotate
      rotation-per-second="25deg"
      interaction-prompt="auto"
      touch-action="pan-y"
      shadow-intensity="1"
      exposure="1.1"
      loading="eager"
    >
      <button
        slot="ar-button"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-coal shadow-lg shadow-black/40 transition-transform active:scale-95"
      >
        📱 Masamda Gör
      </button>
    </model-viewer>
  );
}
