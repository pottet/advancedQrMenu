"use client";

import { useState } from "react";
import GuessGame from "@/components/GuessGame";
import IngredientQuiz from "@/components/IngredientQuiz";

type Mode = "foto" | "malzeme";

export default function GameHub() {
  const [mode, setMode] = useState<Mode>("foto");

  return (
    <div>
      <div className="mx-auto mb-8 flex max-w-sm gap-1 rounded-full border border-line bg-card p-1">
        <button
          onClick={() => setMode("foto")}
          className={`flex-1 rounded-full px-3 py-2 text-xs font-semibold transition-colors sm:text-sm ${
            mode === "foto" ? "bg-gold text-coal" : "text-cream-dim hover:text-gold-soft"
          }`}
        >
          🖼️ Yemeği Tahmin Et
        </button>
        <button
          onClick={() => setMode("malzeme")}
          className={`flex-1 rounded-full px-3 py-2 text-xs font-semibold transition-colors sm:text-sm ${
            mode === "malzeme" ? "bg-gold text-coal" : "text-cream-dim hover:text-gold-soft"
          }`}
        >
          🌍 Malzeme Bilgisi
        </button>
      </div>

      {mode === "foto" ? <GuessGame /> : <IngredientQuiz />}
    </div>
  );
}
