"use client";

import { useState } from "react";
import { formatPrice } from "@/data/menu";
import { suggestCombos, type Combo } from "@/lib/combo";

export default function BudgetSuggester() {
  const [people, setPeople] = useState(2);
  const [budget, setBudget] = useState(800);
  const [combos, setCombos] = useState<Combo[] | null>(null);

  const generate = () => {
    setCombos(suggestCombos(Math.max(1, people), Math.max(0, budget)));
  };

  return (
    <div className="w-full">
      <div className="rounded-3xl border border-line bg-card p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Kişi Sayısı</span>
            <div className="mt-2 flex items-center gap-3">
              <button
                onClick={() => setPeople((p) => Math.max(1, p - 1))}
                className="h-10 w-10 rounded-full border border-line text-lg text-cream transition-colors hover:border-gold hover:text-gold-soft"
                aria-label="Kişi sayısını azalt"
              >
                −
              </button>
              <span className="w-8 text-center font-display text-2xl font-semibold text-cream">
                {people}
              </span>
              <button
                onClick={() => setPeople((p) => Math.min(20, p + 1))}
                className="h-10 w-10 rounded-full border border-line text-lg text-cream transition-colors hover:border-gold hover:text-gold-soft"
                aria-label="Kişi sayısını artır"
              >
                +
              </button>
            </div>
          </label>

          <label className="block">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Toplam Bütçe (₺)</span>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              step={50}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value) || 0)}
              className="mt-2 w-full rounded-xl border border-line bg-coal px-4 py-2.5 text-lg font-semibold text-cream outline-none focus:border-gold"
            />
          </label>
        </div>

        <button
          onClick={generate}
          className="mt-5 w-full rounded-full bg-gold px-6 py-3 text-sm font-bold text-coal transition-transform active:scale-95 sm:w-auto"
        >
          Bize Ne Önerirsin? 🍽️
        </button>
      </div>

      {combos && (
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {combos.map((combo) => {
            const fits = combo.total <= budget;
            const diff = Math.abs(budget - combo.total);
            return (
              <div
                key={combo.title}
                className={`flex flex-col rounded-3xl border p-5 ${
                  fits ? "border-gold/50 bg-card" : "border-line bg-card/60"
                }`}
              >
                <h3 className="font-display text-xl font-semibold text-cream">{combo.title}</h3>
                <p className="mt-1 text-xs text-cream-dim">{combo.blurb}</p>

                <ul className="mt-4 flex-1 space-y-1.5 text-sm text-cream-dim">
                  {combo.items.map((it) => (
                    <li key={it.dish.slug} className="flex justify-between gap-2">
                      <span>
                        {it.qty}× {it.dish.name}
                      </span>
                      <span className="shrink-0 text-cream">{formatPrice(it.dish.price * it.qty)}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 border-t border-line pt-3">
                  <p className="font-display text-xl font-semibold text-gold">
                    {formatPrice(combo.total)}
                  </p>
                  <p className={`mt-1 text-xs font-medium ${fits ? "text-emerald-400" : "text-red-400"}`}>
                    {fits
                      ? `✅ Bütçene uygun · ${formatPrice(diff)} kalır`
                      : `⚠️ Bütçeni ${formatPrice(diff)} aşıyor`}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
