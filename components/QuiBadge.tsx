/**
 * "Qui" — ileride akıllı bir asistana dönüşecek yer tutucu rozet.
 * Şimdilik tamamen görsel: hiçbir tıklama işlevi yok.
 */

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
      <path d="M18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
      <path d="m16.894 20.567-.394 1.183-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
    </svg>
  );
}

export default function QuiBadge() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2 sm:bottom-6 sm:right-6">
      <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card/90 px-3 py-1 text-xs font-medium text-cream-dim shadow-lg backdrop-blur">
        <SparkleIcon className="h-3.5 w-3.5 text-gold-soft" />
        <span className="font-semibold text-gold-soft">Qui</span>
      </span>

      <div className="relative h-14 w-14">
        <span className="absolute inset-0 rounded-full bg-gold/40 animate-ping" aria-hidden />
        <div className="qui-float relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gold-soft to-gold shadow-xl shadow-black/40">
          <SparkleIcon className="h-7 w-7 text-coal" />
        </div>
        <span
          className="absolute -right-0.5 -top-0.5 h-3 w-3 animate-pulse rounded-full border-2 border-coal bg-emerald-400"
          aria-hidden
        />
      </div>
    </div>
  );
}
