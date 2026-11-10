import type { Metadata } from "next";
import Link from "next/link";
import SpinWheel from "@/components/SpinWheel";
import { restaurant } from "@/data/menu";

export const metadata: Metadata = {
  title: `Kararsızlar Çarkı | ${restaurant.name}`,
  description: "Ne yiyeceğinize karar veremediyseniz çarkı çevirin, menüden sizin yerinize seçsin.",
};

export default function CarkPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 pb-16">
      <div className="sticky top-0 z-20 -mx-4 border-b border-line bg-coal/95 px-4 py-3 backdrop-blur">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-cream-dim transition-colors hover:text-gold-soft"
        >
          <span aria-hidden>←</span> Ana ekrana dön
        </Link>
      </div>

      <header className="pt-8 pb-6 text-center">
        <h1 className="font-display text-4xl font-semibold text-cream">🎡 Kararsızlar Çarkı</h1>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-cream-dim">
          Ne yiyeceğinize karar veremediniz mi? Butona basın, çark sizin yerinize seçsin.
        </p>
      </header>

      <SpinWheel />
    </main>
  );
}
