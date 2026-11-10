import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ARViewer from "@/components/ARViewer";
import IngredientChip from "@/components/IngredientChip";
import SfxButton from "@/components/SfxButton";
import ShareQR from "@/components/ShareQR";
import SpiceMeter from "@/components/SpiceMeter";
import { allDishes, formatPrice, getDish, restaurant } from "@/data/menu";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allDishes.map((dish) => ({ slug: dish.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const dish = getDish(slug);
  if (!dish) return {};
  return {
    title: `${dish.name} | ${restaurant.name}`,
    description: dish.description,
  };
}

export default async function DishPage({ params }: PageProps) {
  const { slug } = await params;
  const dish = getDish(slug);
  if (!dish) notFound();

  return (
    <main className="mx-auto w-full max-w-3xl px-4 pb-16">
      <div className="sticky top-0 z-20 -mx-4 border-b border-line bg-coal/95 px-4 py-3 backdrop-blur">
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 text-sm font-medium text-cream-dim transition-colors hover:text-gold-soft"
        >
          <span aria-hidden>←</span> Menüye dön
        </Link>
      </div>

      <div className="relative mt-6 aspect-square overflow-hidden rounded-3xl border border-line bg-card sm:aspect-[4/3]">
        {dish.model ? (
          <ARViewer src={dish.model} poster={dish.image} alt={`${dish.name} — 3D model`} />
        ) : (
          <>
            <Image
              src={dish.image}
              alt={dish.name}
              fill
              sizes="(min-width: 768px) 768px, 100vw"
              priority
              className="object-cover"
            />
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-coal/85 px-4 py-2 text-xs text-cream-dim backdrop-blur">
              Bu yemeğin 3D modeli hazırlanıyor
            </span>
            {dish.sfx === "sizzle" && <SfxButton />}
          </>
        )}
      </div>

      {dish.model && (
        <p className="mt-3 text-center text-xs text-cream-dim">
          Modeli parmağınızla döndürebilirsiniz ·{" "}
          <span className="text-gold-soft">📱 Masamda Gör</span> ile gerçek boyutunda masanıza koyun
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold text-cream sm:text-4xl">{dish.name}</h1>
          {(dish.badges && dish.badges.length > 0) || dish.spiceLevel ? (
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              {dish.badges?.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-line bg-card px-2.5 py-0.5 text-[11px] font-medium text-cream-dim"
                >
                  {badge}
                </span>
              ))}
              {!!dish.spiceLevel && <SpiceMeter level={dish.spiceLevel} />}
            </div>
          ) : null}
        </div>
        <p className="rounded-2xl border border-gold/40 bg-card px-4 py-2 font-display text-2xl font-semibold text-gold">
          {formatPrice(dish.price)}
        </p>
      </div>

      <p className="mt-4 leading-relaxed text-cream-dim">{dish.description}</p>

      <section className="mt-6">
        <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-gold">İçindekiler</h2>
        <p className="mt-1 text-xs text-cream-dim">Nereden geldiğini görmek için bir malzemeye dokunun</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {dish.ingredients.map((item) => (
            <li key={item}>
              <IngredientChip name={item} />
            </li>
          ))}
        </ul>
      </section>

      {dish.model && <ShareQR label="AR deneyimi için bu sayfayı telefonunuzda açın" />}
    </main>
  );
}
