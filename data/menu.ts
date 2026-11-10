export type TimeBand = "sabah" | "ogle" | "gunbatimi" | "gece";

export type Dish = {
  slug: string;
  name: string;
  description: string;
  price: number;
  ingredients: string[];
  image: string;
  /** public/models altındaki GLB dosyası — varsa "Masamda Gör" (AR) aktif olur */
  model?: string;
  badges?: string[];
  /** 0 = acısız; 1-3 = biber ısı çubuğunda dolu gösterilecek seviye */
  spiceLevel?: 0 | 1 | 2 | 3;
  /** Dokununca çalacak sentezlenmiş efekt — ızgara/kızartma ürünlerinde iştah açıcı bir detay */
  sfx?: "sizzle";
  /** Bu yemeğin öne çıktığı günün saatleri; menü o dilime göre filtrelenir */
  timeTags: TimeBand[];
};

export type Category = {
  id: string;
  name: string;
  icon: string;
  dishes: Dish[];
};

export const restaurant = {
  name: "Qui-Napolitan",
  tagline: "Restoran & Fine Dinning",
  note: "Fiyatlarımıza KDV dahildir.",
};

export const categories: Category[] = [
  {
    id: "baslangiclar",
    name: "Başlangıçlar",
    icon: "🥗",
    dishes: [
      {
        slug: "mercimek-corbasi",
        name: "Mercimek Çorbası",
        description:
          "Geleneksel kırmızı mercimek çorbası; tereyağlı pul biber sosu ile tamamlanır, yanında limon ve kıtır ekmek ile servis edilir.",
        price: 120,
        ingredients: ["Kırmızı mercimek", "Soğan", "Havuç", "Tereyağı", "Pul biber", "Limon"],
        image: "/images/mercimek-corbasi.jpg",
        badges: ["Vejetaryen"],
        spiceLevel: 1,
        timeTags: ["ogle", "gunbatimi", "gece"],
      },
      {
        slug: "coban-salata",
        name: "Çoban Salata",
        description:
          "Doğranmış domates, salatalık, sivri biber ve kuru soğan; maydanoz, beyaz peynir, zeytinyağı ve nar ekşisi ile.",
        price: 180,
        ingredients: ["Domates", "Salatalık", "Sivri biber", "Kuru soğan", "Beyaz peynir", "Zeytinyağı", "Nar ekşisi"],
        image: "/images/coban-salata.jpg",
        badges: ["Vejetaryen", "Glutensiz"],
        timeTags: ["sabah", "ogle", "gunbatimi"],
      },
    ],
  },
  {
    id: "kahvalti-firin",
    name: "Kahvaltı & Fırın",
    icon: "🥐",
    dishes: [
      {
        slug: "kruvasan",
        name: "Tereyağlı Kruvasan",
        description:
          "72 saat dinlendirilmiş hamurdan, bol tereyağlı ve çıtır katmanlı kruvasan. Ev yapımı reçel ve tereyağı ile servis edilir.",
        price: 140,
        ingredients: ["Un", "Tereyağı", "Süt", "Maya", "Şeker", "Deniz tuzu"],
        image: "/images/kruvasan.jpg",
        model: "/models/croissant.glb",
        badges: ["Vejetaryen"],
        timeTags: ["sabah", "ogle"],
      },
      {
        slug: "avokado-tabagi",
        name: "Avokado Kahvaltı Tabağı",
        description:
          "Olgun avokado, poşe yumurta, ekşi maya ekmeği, kiraz domates ve mikro filizler; soğuk sıkım zeytinyağı ile.",
        price: 260,
        ingredients: ["Avokado", "Yumurta", "Ekşi maya ekmeği", "Kiraz domates", "Mikro filiz", "Zeytinyağı"],
        image: "/images/avokado-tabagi.jpg",
        model: "/models/food_avocado_01.glb",
        badges: ["Vejetaryen"],
        timeTags: ["sabah", "ogle"],
      },
    ],
  },
  {
    id: "ana-yemekler",
    name: "Ana Yemekler",
    icon: "🍢",
    dishes: [
      {
        slug: "tavuk-sis",
        name: "Tavuk Şiş",
        description:
          "Yoğurt ve baharatlarla marine edilmiş tavuk şiş; közlenmiş biber, bulgur pilavı ve haydari eşliğinde.",
        price: 320,
        ingredients: ["Tavuk but", "Yoğurt", "Kırmızı biber", "Bulgur", "Haydari", "Baharatlar"],
        image: "/images/tavuk-sis.jpg",
        spiceLevel: 1,
        sfx: "sizzle",
        timeTags: ["ogle", "gunbatimi", "gece"],
      },
      {
        slug: "musakka",
        name: "Fırın Musakka",
        description:
          "Közlenmiş patlıcan, mevsim sebzeleri ve dana kıyma; beşamel sos ve kaşar ile fırınlanır.",
        price: 300,
        ingredients: ["Patlıcan", "Dana kıyma", "Domates", "Beşamel sos", "Kaşar peyniri"],
        image: "/images/musakka.jpg",
        sfx: "sizzle",
        timeTags: ["ogle", "gunbatimi"],
      },
      {
        slug: "kofte-burger",
        name: "Köfte Burger",
        description:
          "El yapımı dana köfte, brioche ekmek, karamelize soğan, eritilmiş cheddar ve özel sos; çıtır patates ile.",
        price: 340,
        ingredients: ["Dana kıyma", "Brioche ekmek", "Cheddar", "Karamelize soğan", "Özel sos", "Patates"],
        image: "/images/kofte-burger.jpg",
        badges: ["Acılı seçenek"],
        spiceLevel: 2,
        sfx: "sizzle",
        timeTags: ["ogle", "gunbatimi", "gece"],
      },
      {
        slug: "izgara-tavuk",
        name: "Izgara Tavuk",
        description:
          "El yapımı ızgara tavuk, brioche ekmek, karamelize soğan, eritilmiş cheddar ve özel sos; çıtır patates ile.",
        price: 340,
        ingredients: ["Izgara Tavuk", "Lavaş ekmek", "Izgara sebzeler", "El yapımı makarna", "Özel sos"],
        image: "/images/izgaraTavuk.jpeg",
        model: "/models/izgaratavuk_opt.glb",
        badges: ["Acılı seçenek"],
        spiceLevel: 2,
        timeTags: ["ogle", "gunbatimi", "gece"],
      },
    ],
  },
  {
    id: "tatlilar",
    name: "Tatlılar",
    icon: "🍰",
    dishes: [
      {
        slug: "havuclu-kek",
        name: "Cevizli Havuçlu Kek",
        description:
          "Tarçınlı ve cevizli havuçlu kek; krem peynir kreması ve karamelize ceviz ile. Günlük, ev yapımı.",
        price: 180,
        ingredients: ["Havuç", "Ceviz", "Tarçın", "Krem peynir", "Un", "Yumurta"],
        image: "/images/havuclu-kek.jpg",
        model: "/models/carrot_cake.glb",
        badges: ["Vejetaryen"],
        timeTags: ["sabah", "ogle", "gunbatimi"],
      },
      {
        slug: "cikolatali-pasta",
        name: "Çilekli Çikolatalı Pasta",
        description:
          "Belçika çikolatalı mus, kakaolu pandispanya ve taze çilek katmanları; parlak çikolata glazürü ile.",
        price: 220,
        ingredients: ["Belçika çikolatası", "Taze çilek", "Kakao", "Krema", "Pandispanya"],
        image: "/images/cikolatali-pasta.jpg",
        model: "/models/strawberry_chocolate_cake.glb",
        badges: ["Vejetaryen"],
        timeTags: ["ogle", "gunbatimi", "gece"],
      },
    ],
  },
  {
    id: "icecekler",
    name: "İçecekler",
    icon: "🫖",
    dishes: [
      {
        slug: "cay-servisi",
        name: "Demleme Çay Servisi",
        description:
          "Rize çayı, porselen demlik takımında; iki kişilik servis, yanında lokum ikramı ile.",
        price: 90,
        ingredients: ["Rize çayı", "Lokum ikramı"],
        image: "/images/cay-servisi.jpg",
        model: "/models/tea_set_01.glb",
        badges: ["Vegan"],
        timeTags: ["sabah", "ogle", "gunbatimi", "gece"],
      },
      {
        slug: "nar-suyu",
        name: "Taze Sıkım Nar Suyu",
        description:
          "Sipariş üzerine taze sıkılan mevsim narı; şeker ilavesiz, buz ile servis edilir.",
        price: 110,
        ingredients: ["Taze nar"],
        image: "/images/nar-suyu.jpg",
        model: "/models/food_pomegranate_01.glb",
        badges: ["Vegan", "Glutensiz"],
        timeTags: ["sabah", "ogle", "gunbatimi"],
      },
    ],
  },
];

export const allDishes: Dish[] = categories.flatMap((c) => c.dishes);

export function getDish(slug: string): Dish | undefined {
  return allDishes.find((d) => d.slug === slug);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(price);
}
