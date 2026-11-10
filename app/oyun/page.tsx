import type { Metadata } from "next";
import Link from "next/link";
import GameHub from "@/components/GameHub";
import { restaurant } from "@/data/menu";

export const metadata: Metadata = {
  title: `Oyunlar | ${restaurant.name}`,
  description:
    "Beklerken oynayın: bulanık fotoğraftan yemeği tahmin edin ya da malzemelerin nereden geldiğini bilin.",
};

export default function OyunPage() {
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
        <h1 className="font-display text-4xl font-semibold text-cream">🎮 Bekleme Oyunları</h1>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-cream-dim">
          Siparişiniz gelirken vakit geçirin — iki oyundan birini seçin.
        </p>
      </header>

      <GameHub />
    </main>
  );
}
