"use client";

import { useState } from "react";
import { ingredientStories } from "@/data/ingredients";

export default function IngredientChip({ name }: { name: string }) {
  const [open, setOpen] = useState(false);
  const info = ingredientStories[name];

  if (!info) {
    return (
      <span className="rounded-full border border-line bg-card px-3 py-1.5 text-sm text-cream">
        {name}
      </span>
    );
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1 rounded-full border border-line bg-card px-3 py-1.5 text-sm text-cream transition-colors hover:border-gold hover:text-gold-soft"
      >
        {name}
        <span aria-hidden className="text-[10px] text-gold-soft">
          ⓘ
        </span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${name} hakkında`}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 backdrop-blur-sm sm:items-center"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-3xl border border-gold/40 bg-card p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-xl font-semibold text-cream">{name}</h3>
              <button
                onClick={() => setOpen(false)}
                aria-label="Kapat"
                className="shrink-0 rounded-full border border-line px-2 py-1 text-xs text-cream-dim transition-colors hover:border-gold hover:text-gold-soft"
              >
                ✕
              </button>
            </div>

            <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gold">
              📍 {info.origin}
            </p>
            <p className="mt-1.5 text-xs text-cream-dim">
              {info.seasonal ? `🗓️ Mevsimlik — ${info.season}` : "🗓️ Yıl boyu bulunur"}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-cream-dim">{info.story}</p>
          </div>
        </div>
      )}
    </>
  );
}
