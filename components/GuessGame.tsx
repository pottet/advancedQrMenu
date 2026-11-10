"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { allDishes, type Dish } from "@/data/menu";
import { playFeedback } from "@/lib/sound";

const START_BLUR = 22;
const BLUR_STEP = 7;
const MIN_BLUR = 1;
const BEST_STREAK_KEY = "qr-menu-best-streak";

type Round = { answer: Dish; options: Dish[] };

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function newRound(excludeSlug?: string): Round {
  const pool = allDishes.filter((d) => d.slug !== excludeSlug);
  const answer = pool[Math.floor(Math.random() * pool.length)];
  const distractors = shuffle(allDishes.filter((d) => d.slug !== answer.slug)).slice(0, 3);
  return { answer, options: shuffle([answer, ...distractors]) };
}

export default function GuessGame() {
  const [round, setRound] = useState<Round | null>(null);
  const [blur, setBlur] = useState(START_BLUR);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);

  useEffect(() => {
    setRound(newRound());
    try {
      const stored = Number(localStorage.getItem(BEST_STREAK_KEY) ?? 0);
      if (!Number.isNaN(stored)) setBest(stored);
    } catch {
      // localStorage kapalıysa sessizce devam
    }
  }, []);

  if (!round) {
    return <p className="text-center text-sm text-cream-dim">Yükleniyor…</p>;
  }

  const answered = picked !== null;
  const isCorrect = picked === round.answer.slug;

  const pick = (slug: string) => {
    if (answered) return;
    setPicked(slug);
    const correct = slug === round.answer.slug;
    playFeedback(correct);
    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    setStreak((prevStreak) => {
      const next = correct ? prevStreak + 1 : 0;
      if (next > best) {
        setBest(next);
        try {
          localStorage.setItem(BEST_STREAK_KEY, String(next));
        } catch {
          // yok say
        }
      }
      return next;
    });
  };

  const nextRound = () => {
    setRound(newRound(round.answer.slug));
    setBlur(START_BLUR);
    setPicked(null);
  };

  const reduceBlur = () => setBlur((b) => Math.max(MIN_BLUR, b - BLUR_STEP));

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center justify-center gap-4 text-center text-sm text-cream-dim">
        <span>
          Doğru: <span className="font-semibold text-cream">{score.correct}</span> /{" "}
          {score.total}
        </span>
        <span>
          Seri: <span className="font-semibold text-gold-soft">{streak}</span>
        </span>
        <span>
          En İyi Seri: <span className="font-semibold text-gold-soft">{best}</span>
        </span>
      </div>

      <div className="relative mx-auto mt-5 aspect-square w-full max-w-xs overflow-hidden rounded-3xl border border-line bg-card sm:aspect-[4/3]">
        <Image
          key={round.answer.slug}
          src={round.answer.image}
          alt="Bu hangi yemek?"
          fill
          sizes="384px"
          className="object-cover transition-[filter] duration-500"
          style={{ filter: answered ? "none" : `blur(${blur}px)` }}
        />
      </div>

      {!answered && blur > MIN_BLUR && (
        <div className="mt-3 flex justify-center">
          <button
            onClick={reduceBlur}
            className="rounded-full border border-line px-4 py-2 text-xs font-semibold text-cream-dim transition-colors hover:border-gold hover:text-gold-soft"
          >
            🔍 İpucu — Netleştir
          </button>
        </div>
      )}

      <div className="mx-auto mt-5 grid max-w-md grid-cols-1 gap-2.5 sm:grid-cols-2">
        {round.options.map((opt) => {
          const isPicked = picked === opt.slug;
          const revealCorrect = answered && opt.slug === round.answer.slug;
          return (
            <button
              key={opt.slug}
              onClick={() => pick(opt.slug)}
              disabled={answered}
              className={`rounded-2xl border px-4 py-3 text-sm font-medium transition-colors ${
                revealCorrect
                  ? "border-emerald-500 bg-emerald-950/40 text-emerald-300"
                  : isPicked
                    ? "border-red-500 bg-red-950/40 text-red-300"
                    : "border-line bg-card text-cream hover:border-gold hover:text-gold-soft"
              } ${answered ? "cursor-default" : ""}`}
            >
              {opt.name}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="mt-5 text-center">
          <p
            className={`font-display text-lg font-semibold ${isCorrect ? "text-emerald-400" : "text-red-400"}`}
          >
            {isCorrect ? "Doğru bildin! 🎉" : `Yanlış — doğru cevap: ${round.answer.name}`}
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-3">
            <button
              onClick={nextRound}
              className="rounded-full bg-gold px-6 py-2.5 text-sm font-bold text-coal transition-transform active:scale-95"
            >
              Sonraki Yemek →
            </button>
            <Link
              href={`/yemek/${round.answer.slug}`}
              className="rounded-full border border-line px-6 py-2.5 text-sm font-bold text-cream-dim transition-colors hover:border-gold hover:text-gold-soft"
            >
              Yemeğe Bak
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
