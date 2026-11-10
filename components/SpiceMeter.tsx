"use client";

import { useState } from "react";
import { playSpicyHeat, vibrate } from "@/lib/sound";

const LEVEL_LABEL = ["Acısız", "Hafif Acılı", "Acılı", "Çok Acılı"];

export default function SpiceMeter({ level }: { level: 1 | 2 | 3 }) {
  const [hit, setHit] = useState(false);

  const trigger = () => {
    playSpicyHeat();
    vibrate(level === 3 ? [40, 60, 90] : level === 2 ? [50, 40] : [30]);
    setHit(true);
    window.setTimeout(() => setHit(false), 900);
  };

  return (
    <button
      onClick={trigger}
      aria-label={`${LEVEL_LABEL[level]} — dokunup hissedin`}
      className={`group inline-flex items-center gap-2 rounded-full border px-3 py-1.5 transition-all active:scale-95 ${
        hit ? "scale-105 border-red-500/70 bg-red-950/40" : "border-line bg-card"
      }`}
    >
      <span className="flex items-center gap-0.5" aria-hidden>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`text-sm transition-all duration-300 ${
              i < level
                ? hit
                  ? "scale-125 opacity-100 drop-shadow-[0_0_6px_rgba(239,68,68,0.9)]"
                  : "opacity-100"
                : "opacity-20 grayscale"
            }`}
            style={{ transitionDelay: hit ? `${i * 70}ms` : "0ms" }}
          >
            🌶️
          </span>
        ))}
      </span>
      <span className="text-[11px] font-medium text-cream-dim">
        {hit ? "Bu gerçekten acı! 🔥" : LEVEL_LABEL[level]}
      </span>
    </button>
  );
}
