"use client";

import { useState } from "react";
import { playSizzle } from "@/lib/sound";

export default function SfxButton() {
  const [playing, setPlaying] = useState(false);

  const play = () => {
    playSizzle();
    setPlaying(true);
    window.setTimeout(() => setPlaying(false), 900);
  };

  return (
    <button
      onClick={play}
      className={`absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-coal/85 px-3 py-2 text-xs font-semibold text-gold-soft backdrop-blur transition-transform active:scale-95 ${
        playing ? "scale-105" : ""
      }`}
    >
      <span aria-hidden className={playing ? "animate-pulse" : ""}>
        🔊
      </span>
      Cızırtısını Duy
    </button>
  );
}
