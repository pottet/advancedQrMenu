"use client";

import { useEffect, useState } from "react";
import { ingredientStories, type IngredientInfo } from "@/data/ingredients";
import { playFeedback } from "@/lib/sound";

const BEST_STREAK_KEY = "qr-menu-best-streak-ingredient";

type Round = {
  ingredientName: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildOriginRound(entries: [string, IngredientInfo][]): Round {
  const [name, info] = entries[Math.floor(Math.random() * entries.length)];
  const correct = info.origin;

  const distractors: string[] = [];
  for (const [, other] of shuffle(entries)) {
    if (distractors.length >= 3) break;
    if (other.origin !== correct && !distractors.includes(other.origin)) {
      distractors.push(other.origin);
    }
  }

  const options = shuffle([correct, ...distractors]);
  return {
    ingredientName: name,
    question: `${name} nereden geliyor?`,
    options,
    correctIndex: options.indexOf(correct),
    explanation: info.story,
  };
}

function buildSeasonalRound(entries: [string, IngredientInfo][]): Round {
  const [name, info] = entries[Math.floor(Math.random() * entries.length)];
  const options = ["Mevsimlik", "Yıl boyu bulunur"];
  const correctIndex = info.seasonal ? 0 : 1;
  return {
    ingredientName: name,
    question: `${name} mevsimlik bir malzeme mi?`,
    options,
    correctIndex,
    explanation: info.seasonal ? `${info.season} döneminde en taze halini alır. ${info.story}` : info.story,
  };
}

function newRound(excludeName?: string): Round {
  const entries = Object.entries(ingredientStories).filter(([name]) => name !== excludeName);
  return Math.random() < 0.55 ? buildOriginRound(entries) : buildSeasonalRound(entries);
}

export default function IngredientQuiz() {
  const [round, setRound] = useState<Round | null>(null);
  const [picked, setPicked] = useState<number | null>(null);
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
  const isCorrect = picked === round.correctIndex;

  const pick = (index: number) => {
    if (answered) return;
    setPicked(index);
    const correct = index === round.correctIndex;
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
    setRound(newRound(round.ingredientName));
    setPicked(null);
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center justify-center gap-4 text-center text-sm text-cream-dim">
        <span>
          Doğru: <span className="font-semibold text-cream">{score.correct}</span> / {score.total}
        </span>
        <span>
          Seri: <span className="font-semibold text-gold-soft">{streak}</span>
        </span>
        <span>
          En İyi Seri: <span className="font-semibold text-gold-soft">{best}</span>
        </span>
      </div>

      <div className="mx-auto mt-6 max-w-md rounded-3xl border border-line bg-card p-6 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-gold">{round.ingredientName}</p>
        <h2 className="mt-2 font-display text-xl font-semibold text-cream">{round.question}</h2>
      </div>

      <div className="mx-auto mt-5 grid max-w-md grid-cols-1 gap-2.5 sm:grid-cols-2">
        {round.options.map((opt, i) => {
          const isPicked = picked === i;
          const revealCorrect = answered && i === round.correctIndex;
          return (
            <button
              key={opt}
              onClick={() => pick(i)}
              disabled={answered}
              className={`rounded-2xl border px-4 py-3 text-sm font-medium transition-colors ${
                revealCorrect
                  ? "border-emerald-500 bg-emerald-950/40 text-emerald-300"
                  : isPicked
                    ? "border-red-500 bg-red-950/40 text-red-300"
                    : "border-line bg-card text-cream hover:border-gold hover:text-gold-soft"
              } ${answered ? "cursor-default" : ""}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="mx-auto mt-5 max-w-md text-center">
          <p
            className={`font-display text-lg font-semibold ${isCorrect ? "text-emerald-400" : "text-red-400"}`}
          >
            {isCorrect ? "Doğru bildin! 🎉" : "Yanlış — ama öğrenmek de bir kazanç"}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-cream-dim">💡 {round.explanation}</p>
          <button
            onClick={nextRound}
            className="mt-4 rounded-full bg-gold px-6 py-2.5 text-sm font-bold text-coal transition-transform active:scale-95"
          >
            Sonraki Soru →
          </button>
        </div>
      )}
    </div>
  );
}
