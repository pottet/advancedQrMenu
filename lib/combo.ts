import { categories, type Dish } from "@/data/menu";

export type ComboItem = { dish: Dish; qty: number };
export type Combo = {
  title: string;
  blurb: string;
  items: ComboItem[];
  total: number;
};

function byCategory(id: string): Dish[] {
  return categories.find((c) => c.id === id)?.dishes ?? [];
}

const STARTERS = byCategory("baslangiclar");
const MAINS = byCategory("ana-yemekler");
const DESSERTS = byCategory("tatlilar");
const DRINKS = byCategory("icecekler");

function cheapestFirst(dishes: Dish[]): Dish[] {
  return [...dishes].sort((a, b) => a.price - b.price);
}

/** n adet seçerken tek yemeğe saplanmadan listede döngüsel ilerleyip çeşitlilik katar. */
function pickCycle(dishes: Dish[], n: number, startIndex = 0): ComboItem[] {
  if (dishes.length === 0 || n <= 0) return [];
  const counts = new Map<Dish, number>();
  for (let i = 0; i < n; i++) {
    const dish = dishes[(startIndex + i) % dishes.length];
    counts.set(dish, (counts.get(dish) ?? 0) + 1);
  }
  return [...counts.entries()].map(([dish, qty]) => ({ dish, qty }));
}

function sumTotal(items: ComboItem[]): number {
  return items.reduce((sum, it) => sum + it.dish.price * it.qty, 0);
}

function buildTier(
  people: number,
  opts: { mainsSource: Dish[]; starterEvery: number; dessertEvery: number; drinkPerPerson: boolean },
): ComboItem[] {
  const items: ComboItem[] = [];
  items.push(...pickCycle(opts.mainsSource, people));
  if (opts.starterEvery > 0) {
    items.push(...pickCycle(cheapestFirst(STARTERS), Math.ceil(people / opts.starterEvery)));
  }
  if (opts.dessertEvery > 0) {
    items.push(...pickCycle(cheapestFirst(DESSERTS), Math.ceil(people / opts.dessertEvery), 1));
  }
  if (opts.drinkPerPerson) {
    items.push(...pickCycle(cheapestFirst(DRINKS), people));
  }
  return items;
}

/** Kişi sayısı ve toplam bütçeye göre 3 farklı sipariş kombinasyonu önerir. */
export function suggestCombos(people: number, budget: number): Combo[] {
  const mainsCheap = cheapestFirst(MAINS);

  const tiers: Combo[] = [
    {
      title: "Ekonomik",
      blurb: "Sade ve doyurucu — ana yemek + içecek",
      items: buildTier(people, {
        mainsSource: mainsCheap,
        starterEvery: 0,
        dessertEvery: 0,
        drinkPerPerson: true,
      }),
      total: 0,
    },
    {
      title: "Dengeli",
      blurb: "Paylaşımlı başlangıç, herkese ana yemek ve içecek",
      items: buildTier(people, {
        mainsSource: MAINS,
        starterEvery: 2,
        dessertEvery: 0,
        drinkPerPerson: true,
      }),
      total: 0,
    },
    {
      title: "Şölen",
      blurb: "Başlangıçtan tatlıya, sofra eksiksiz kurulu",
      items: buildTier(people, {
        mainsSource: MAINS,
        starterEvery: 1,
        dessertEvery: 2,
        drinkPerPerson: true,
      }),
      total: 0,
    },
  ];

  for (const tier of tiers) tier.total = sumTotal(tier.items);
  return tiers.sort((a, b) => a.total - b.total);
}
