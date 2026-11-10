import Link from "next/link";
import QuiBadge from "@/components/QuiBadge";
import { restaurant } from "@/data/menu";

export default function LandingPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 py-14 text-center">
      <p className="text-xs uppercase tracking-[0.35em] text-gold">{restaurant.tagline}</p>
      <h1 className="mt-3 font-display text-6xl font-semibold text-cream sm:text-7xl">
        {restaurant.name}
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-cream-dim">
        Hoş geldiniz! Menümüzü keşfedin; dilerseniz yemekleri 3D inceleyin,{" "}
        <span className="text-gold-soft">Masamda Gör</span> ile masanızda görüntüleyin.
      </p>

      <div className="mt-10 grid w-full gap-4 sm:grid-cols-2">
        <Link
          href="/menu"
          className="group flex flex-col items-center gap-3 rounded-3xl border border-line bg-card p-8 transition-colors hover:border-gold/60 hover:bg-card-hover"
        >
          <span className="text-5xl transition-transform duration-300 group-hover:scale-110" aria-hidden>
            📖
          </span>
          <span className="font-display text-2xl font-semibold text-cream">Menü</span>
          <span className="text-sm text-cream-dim">
            Tüm lezzetlerimizi kategorilere göre keşfedin
          </span>
          <span className="mt-1 rounded-full bg-gold px-5 py-2 text-sm font-bold text-coal">
            Menüye Git →
          </span>
        </Link>

        <Link
          href="/cark"
          className="group flex flex-col items-center gap-3 rounded-3xl border border-line bg-card p-8 transition-colors hover:border-gold/60 hover:bg-card-hover"
        >
          <span
            className="text-5xl transition-transform duration-500 group-hover:rotate-180"
            aria-hidden
          >
            🎡
          </span>
          <span className="font-display text-2xl font-semibold text-cream">Kararsızlar Çarkı</span>
          <span className="text-sm text-cream-dim">
            Ne yiyeceğinize karar veremediniz mi? Bırakın şans seçsin!
          </span>
          <span className="mt-1 rounded-full border border-gold px-5 py-2 text-sm font-bold text-gold-soft">
            Çarkı Çevir →
          </span>
        </Link>
      </div>

      <div className="mt-4 grid w-full gap-3 sm:grid-cols-2">
        <Link
          href="/oneri"
          className="group flex items-center gap-3 rounded-2xl border border-line bg-card px-5 py-4 text-left transition-colors hover:border-gold/60 hover:bg-card-hover"
        >
          <span className="text-2xl" aria-hidden>
            🧮
          </span>
          <span>
            <span className="block text-sm font-semibold text-cream">Bütçe Önerici</span>
            <span className="block text-xs text-cream-dim">Kişi ve bütçenize göre kombinasyon önerelim</span>
          </span>
        </Link>

        <Link
          href="/oyun"
          className="group flex items-center gap-3 rounded-2xl border border-line bg-card px-5 py-4 text-left transition-colors hover:border-gold/60 hover:bg-card-hover"
        >
          <span className="text-2xl" aria-hidden>
            🎮
          </span>
          <span>
            <span className="block text-sm font-semibold text-cream">Yemeği Tahmin Et</span>
            <span className="block text-xs text-cream-dim">Beklerken oynayın, bulanık fotoğrafı çözün</span>
          </span>
        </Link>
      </div>

      <p className="mt-10 text-xs text-cream-dim">{restaurant.note}</p>

      <QuiBadge />
    </main>
  );
}
