"use client";

/**
 * Küçük ses efektleri — dışarıdan dosya yüklemek yerine Web Audio API ile
 * anlık sentezleniyor. Böylece ek asset indirmeden, her tarayıcıda çalışıyor.
 */

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  if (!ctx) ctx = new Ctor();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

/** Kısa, yükselen bir "ısı" tonu — acı biber rozetine dokununca çalar. */
export function playSpicyHeat() {
  const ac = getCtx();
  if (!ac) return;
  const now = ac.currentTime;

  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(180, now);
  osc.frequency.exponentialRampToValueAtTime(720, now + 0.28);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.18, now + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);

  osc.connect(gain).connect(ac.destination);
  osc.start(now);
  osc.stop(now + 0.34);
}

/** Beyaz gürültüden süzülmüş kısa bir "cızırtı" — ızgara/kızartma ürünlerinde. */
export function playSizzle() {
  const ac = getCtx();
  if (!ac) return;
  const now = ac.currentTime;
  const duration = 0.9;

  const bufferSize = Math.floor(ac.sampleRate * duration);
  const buffer = ac.createBuffer(1, bufferSize, ac.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  }

  const noise = ac.createBufferSource();
  noise.buffer = buffer;

  const bandpass = ac.createBiquadFilter();
  bandpass.type = "bandpass";
  bandpass.frequency.setValueAtTime(2600, now);
  bandpass.frequency.exponentialRampToValueAtTime(4200, now + duration);
  bandpass.Q.value = 0.7;

  const gain = ac.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.35, now + 0.06);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  noise.connect(bandpass).connect(gain).connect(ac.destination);
  noise.start(now);
  noise.stop(now + duration);
}

/** Kısa bir "doğru/yanlış" bildirim tonu — mini oyunda kullanılır. */
export function playFeedback(correct: boolean) {
  const ac = getCtx();
  if (!ac) return;
  const now = ac.currentTime;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = "sine";
  if (correct) {
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.setValueAtTime(780, now + 0.1);
  } else {
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.25);
  }
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.2, now + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
  osc.connect(gain).connect(ac.destination);
  osc.start(now);
  osc.stop(now + 0.32);
}

/** Destekleniyorsa kısa bir titreşim tetikler (iOS Safari desteklemez, sorun değil). */
export function vibrate(pattern: number | number[]) {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    try {
      navigator.vibrate(pattern);
    } catch {
      // sessizce yok say
    }
  }
}
