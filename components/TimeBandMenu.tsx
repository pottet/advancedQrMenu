"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Category, TimeBand } from "@/data/menu";
import { formatPrice } from "@/data/menu";
import { TIME_BAND_INFO, TIME_BAND_ORDER, getCurrentTimeBand } from "@/lib/time";

export default function TimeBandMenu({ categories }: { categories: Category[] }) {
  // Sunucu ve ilk istemci render'ı aynı sabit değerle eşleşsin diye "ogle" ile
  // başlar; gerçek saat useEffect içinde okunup hemen ardından güncellenir.
  const [band, setBand] = useState<TimeBand>("ogle");
  const [autoBand, setAutoBand] = useState<TimeBand>("ogle");

  useEffect(() => {
    const current = getCurrentTimeBand();
    setBand(current);
    setAutoBand(current);
  }, []);

  const info = TIME_BAND_INFO[band];
  const filtered = categories
    .map((cat) => ({ ...cat, dishes: cat.dishes.filter((d) => d.timeTags.includes(band)) }))
    .filter((cat) => cat.dishes.length > 0);

  return (
    <div>
      <div className="rounded-2xl border border-gold/30 bg-card p-4">
        <p className="flex items-center gap-2 font-display text-lg font-semibold text-cream">
          <span aria-hidden>{info.icon}</span>
          {info.greeting}
          <span className="text-xs font-sans font-normal text-cream-dim">({info.range})</span>
        </p>
        <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto">
          {TIME_BAND_ORDER.map((b) => (
            <button
              key={b}
              onClick={() => setBand(b)}
              className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                b === band
                  ? "border-gold bg-gold text-coal"
                  : "border-line bg-coal/40 text-cream-dim hover:border-gold hover:text-gold-soft"
              }`}
            >
              {TIME_BAND_INFO[b].icon} {TIME_BAND_INFO[b].label}
              {b === autoBand && b !== band ? " · şu an" : ""}
            </button>
          ))}
        </div>
        {band !== autoBand && (
          <button
            onClick={() => setBand(autoBand)}
            className="mt-3 text-xs font-medium text-gold-soft underline decoration-dotted underline-offset-2"
          >
            Şu anki menüye dön ({TIME_BAND_INFO[autoBand].label})
          </button>
        )}
      </div>

      <nav
        aria-label="Kategoriler"
        className="no-scrollbar sticky top-0 z-20 -mx-4 mt-6 flex gap-2 overflow-x-auto border-b border-line bg-coal/95 px-4 py-3 backdrop-blur"
      >
        {filtered.map((cat) => (
          <a
            key={cat.id}
            href={`#${cat.id}`}
            className="shrink-0 rounded-full border border-line bg-card px-4 py-2 text-sm font-medium text-cream transition-colors hover:border-gold hover:text-gold-soft"
          >
            <span className="mr-1.5" aria-hidden>
              {cat.icon}
            </span>
            {cat.name}
          </a>
        ))}
      </nav>

      {filtered.map((cat) => (
        <section key={cat.id} id={cat.id} className="scroll-mt-20 pt-10">
          <div className="flex items-baseline gap-3">
            <h2 className="font-display text-3xl font-semibold text-cream">
              <span className="mr-2" aria-hidden>
                {cat.icon}
              </span>
              {cat.name}
            </h2>
            <span className="h-px flex-1 bg-line" aria-hidden />
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {cat.dishes.map((dish) => (
              <Link
                key={dish.slug}
                href={`/yemek/${dish.slug}`}
                className="group overflow-hidden rounded-2xl border border-line bg-card transition-colors hover:border-gold/60 hover:bg-card-hover"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {dish.model && (
                    <span className="absolute right-2 top-2 rounded-full bg-coal/85 px-2.5 py-1 text-[11px] font-bold tracking-wide text-gold-soft backdrop-blur">
                      AR · 3D
                    </span>
                  )}
                  {!!dish.spiceLevel && (
                    <span className="absolute left-2 top-2 rounded-full bg-coal/85 px-2 py-1 text-[11px] backdrop-blur" aria-hidden>
                      {"🌶️".repeat(dish.spiceLevel)}
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-semibold leading-snug text-cream sm:text-base">
                    {dish.name}
                  </h3>
                  <p className="mt-1 hidden text-xs leading-relaxed text-cream-dim sm:line-clamp-2">
                    {dish.description}
                  </p>
                  <p className="mt-2 font-display text-lg font-semibold text-gold">
                    {formatPrice(dish.price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
