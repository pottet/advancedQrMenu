import type { Metadata } from "next";
import Link from "next/link";
import TimeBandMenu from "@/components/TimeBandMenu";
import { categories, restaurant } from "@/data/menu";

export const metadata: Metadata = {
  title: `Menü | ${restaurant.name}`,
};

export default function MenuPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 pb-16">
      <header className="pt-10 pb-6 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-gold">{restaurant.tagline}</p>
        <h1 className="mt-2 font-display text-5xl font-semibold text-cream">{restaurant.name}</h1>
        <p className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 text-sm text-cream-dim">
          <span aria-hidden>✨</span>
          <span>
            <span className="font-semibold text-gold-soft">AR</span> rozetli yemeklere dokunun,{" "}
            <span className="font-semibold text-gold-soft">Masamda Gör</span> ile masanızda inceleyin
          </span>
        </p>
      </header>

      <div className="mb-6 flex justify-end">
        <Link
          href="/"
          aria-label="Ana ekrana dön"
          className="shrink-0 rounded-full border border-line bg-card px-4 py-2 text-sm font-medium text-cream transition-colors hover:border-gold hover:text-gold-soft"
        >
          🏠 Ana ekran
        </Link>
      </div>

      <TimeBandMenu categories={categories} />

      <footer className="mt-16 border-t border-line pt-6 text-center text-xs leading-relaxed text-cream-dim">
        <p>{restaurant.note}</p>
        <p className="mt-1">
          3D önizleme için yemeğe dokunun, ardından <span className="text-gold-soft">Masamda Gör</span>{" "}
          butonuyla kameranızı açın.
        </p>
      </footer>
    </main>
  );
}
