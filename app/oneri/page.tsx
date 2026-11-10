import type { Metadata } from "next";
import Link from "next/link";
import BudgetSuggester from "@/components/BudgetSuggester";
import { restaurant } from "@/data/menu";

export const metadata: Metadata = {
  title: `Bütçe Önerici | ${restaurant.name}`,
  description: "Kişi sayınızı ve bütçenizi girin, size uygun yemek kombinasyonlarını önerelim.",
};

export default function OneriPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 pb-16">
      <div className="sticky top-0 z-20 -mx-4 border-b border-line bg-coal/95 px-4 py-3 backdrop-blur">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-cream-dim transition-colors hover:text-gold-soft"
        >
          <span aria-hidden>←</span> Ana ekrana dön
        </Link>
      </div>

      <header className="pt-8 pb-6 text-center">
        <h1 className="font-display text-4xl font-semibold text-cream">🧮 Bütçe Önerici</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-cream-dim">
          Kaç kişisiniz ve bütçeniz ne kadar? Söyleyin, menümüzden size en uygun kombinasyonları
          önerelim — karar yorgunluğu yaşamayın.
        </p>
      </header>

      <BudgetSuggester />
    </main>
  );
}
