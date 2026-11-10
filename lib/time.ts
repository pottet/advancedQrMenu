import type { TimeBand } from "@/data/menu";

export const TIME_BAND_INFO: Record<
  TimeBand,
  { label: string; icon: string; greeting: string; range: string }
> = {
  sabah: {
    label: "Sabah",
    icon: "🌅",
    greeting: "Günaydın! Kahvaltı Menüsü",
    range: "06:00–11:00",
  },
  ogle: {
    label: "Öğle",
    icon: "☀️",
    greeting: "Öğle Menüsü",
    range: "11:00–17:00",
  },
  gunbatimi: {
    label: "Gün Batımı",
    icon: "🌇",
    greeting: "Gün Batımı Menüsü",
    range: "17:00–20:00",
  },
  gece: {
    label: "Gece",
    icon: "🌙",
    greeting: "Gece Menüsü",
    range: "20:00–06:00",
  },
};

export const TIME_BAND_ORDER: TimeBand[] = ["sabah", "ogle", "gunbatimi", "gece"];

/** Verilen saate göre hangi zaman dilimindeyiz (varsayılan: şu an). */
export function getCurrentTimeBand(date: Date = new Date()): TimeBand {
  const h = date.getHours();
  if (h >= 6 && h < 11) return "sabah";
  if (h >= 11 && h < 17) return "ogle";
  if (h >= 17 && h < 20) return "gunbatimi";
  return "gece";
}
