"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { allDishes, categories, formatPrice, type Dish } from "@/data/menu";

const SPIN_MS = 4200;
const SLICE_FILLS = ["#241c14", "#33281b", "#2a2118", "#3d3121"];

const dishIcon = (dish: Dish) =>
  categories.find((c) => c.dishes.some((d) => d.slug === dish.slug))?.icon ?? "🍽️";

const shortName = (name: string) => (name.length > 13 ? `${name.slice(0, 12)}…` : name);

// Çark okunaklı kalsın diye menüdeki son 2 kalemi göstermiyor (menüyü etkilemez)
const wheelDishes = allDishes.slice(0, -2);

/** i. dilimin pasta dilimi yolu; açılar saat yönünde, 0° üstte */
function slicePath(i: number, n: number, c = 150, r = 146) {
  const rad = (deg: number) => ((deg - 90) * Math.PI) / 180;
  const a0 = rad((i * 360) / n);
  const a1 = rad(((i + 1) * 360) / n);
  return `M ${c} ${c} L ${c + r * Math.cos(a0)} ${c + r * Math.sin(a0)} A ${r} ${r} 0 0 1 ${
    c + r * Math.cos(a1)
  } ${c + r * Math.sin(a1)} Z`;
}

export default function SpinWheel() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<Dish | null>(null);

  const n = wheelDishes.length;
  const slice = 360 / n;

  const spin = () => {
    if (spinning) return;
    setResult(null);
    setSpinning(true);

    const winner = Math.floor(Math.random() * n);
    // dilim sınırına denk gelmesin diye ibre dilimin ortasına yakın bir yere bırakılır
    const jitter = (Math.random() - 0.5) * slice * 0.6;
    // her zaman ileri doğru en az 5 tam tur attıktan sonra kazanan dilim ibrenin altına gelir
    const target =
      Math.ceil(rotation / 360) * 360 + 5 * 360 + (360 - (winner + 0.5) * slice) + jitter;

    setRotation(target);
    window.setTimeout(() => {
      setSpinning(false);
      setResult(wheelDishes[winner]);
    }, SPIN_MS + 100);
  };

  return (
    <div className="flex w-full flex-col items-center">
      <div className="relative w-full max-w-[340px]">
        {/* ibre */}
        <div
          aria-hidden
          className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1 text-3xl text-gold drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
        >
          ▼
        </div>

        <svg
          viewBox="0 0 300 300"
          role="img"
          aria-label="Yemek çarkı"
          className="w-full"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning
              ? `transform ${SPIN_MS}ms cubic-bezier(0.12, 0.6, 0.08, 1)`
              : "none",
          }}
        >
          <circle cx="150" cy="150" r="149" fill="#0e0b08" />
          {wheelDishes.map((dish, i) => (
            <g key={dish.slug}>
              <path
                d={slicePath(i, n)}
                fill={SLICE_FILLS[i % SLICE_FILLS.length]}
                stroke="#4a3a26"
                strokeWidth="1"
              />
              <g transform={`rotate(${(i + 0.5) * slice} 150 150)`}>
                <text
                  x="150"
                  y="26"
                  textAnchor="middle"
                  fontSize="9"
                  fill="#e9cd92"
                  fontWeight="600"
                >
                  {shortName(dish.name)}
                </text>
                <text x="150" y="46" textAnchor="middle" fontSize="15">
                  {dishIcon(dish)}
                </text>
              </g>
            </g>
          ))}
          <circle cx="150" cy="150" r="30" fill="#16110d" stroke="#d4a24e" strokeWidth="2" />
          <text x="150" y="158" textAnchor="middle" fontSize="22">
            🍽️
          </text>
        </svg>
      </div>

      <button
        onClick={spin}
        disabled={spinning}
        className="mt-8 rounded-full bg-gold px-10 py-4 text-lg font-bold text-coal shadow-lg shadow-black/40 transition-transform active:scale-95 disabled:opacity-60"
      >
        {spinning ? "Çark dönüyor…" : "Kararsız Kaldım 🎲"}
      </button>

      <div aria-live="polite" className="w-full">
        {result && (
          <div className="mx-auto mt-8 w-full max-w-md overflow-hidden rounded-3xl border border-gold/50 bg-card">
            <div className="relative aspect-[16/9]">
              <Image
                src={result.image}
                alt={result.name}
                fill
                sizes="(min-width: 640px) 448px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-5 text-center">
              <p className="text-xs uppercase tracking-[0.25em] text-gold">Anlaşılan Bugün Menüde..</p>
              <h2 className="mt-1 font-display text-2xl font-semibold text-cream">{result.name}</h2>
              <p className="mt-1 font-display text-xl font-semibold text-gold">
                {formatPrice(result.price)}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-cream-dim">{result.description}</p>
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                <Link
                  href={`/yemek/${result.slug}`}
                  className="rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-coal transition-transform active:scale-95"
                >
                  {result.model ? "İncele & Masamda Gör →" : "Detayına Bak →"}
                </Link>
                <button
                  onClick={spin}
                  className="rounded-full border border-line px-5 py-2.5 text-sm font-bold text-cream-dim transition-colors hover:border-gold hover:text-gold-soft"
                >
                  Tekrar Çevir
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
