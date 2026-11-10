"use client";

import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import { restaurant } from "@/data/menu";

/**
 * Masalara yerleştirilecek QR kodunu üretir ve yazdırır.
 * Menü nereye yayınlandıysa (ör. Vercel adresi) o adresi kodlar.
 */
export default function QRPage() {
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.origin);
  }, []);

  const isLocal = url.includes("localhost") || url.includes("127.0.0.1");

  return (
    <main className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center px-4 py-10 text-center">
      <div className="no-print self-start">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-cream-dim transition-colors hover:text-gold-soft"
        >
          <span aria-hidden>←</span> Ana ekrana dön
        </Link>
      </div>

      <h1 className="mt-6 font-display text-4xl font-semibold">{restaurant.name}</h1>
      <p className="mt-1 text-sm uppercase tracking-[0.3em] text-gold print:text-black">
        Dijital AR Menü
      </p>

      {url && (
        <div className="mt-8 rounded-3xl bg-white p-6 shadow-lg">
          <QRCodeSVG value={url} size={260} marginSize={1} />
        </div>
      )}

      <p className="mt-6 text-lg font-semibold">Menü için kodu okutun</p>
      <p className="mt-1 text-sm text-cream-dim print:text-black">
        Yemekleri 3D inceleyin, “Masamda Gör” ile masanızda görüntüleyin.
      </p>

      {isLocal && (
        <p className="no-print mt-6 max-w-sm rounded-xl border border-gold/40 bg-card px-4 py-3 text-xs leading-relaxed text-cream-dim">
          ⚠️ Şu an yerel adres kodlanıyor ({url}). Masalara asmadan önce menüyü internete yayınlayın
          (ör. Vercel) ve bu sayfayı yayınlanan adresten açıp yazdırın.
        </p>
      )}

      <button
        onClick={() => window.print()}
        className="no-print mt-8 rounded-full bg-gold px-8 py-3 font-bold text-coal transition-transform active:scale-95"
      >
        🖨️ Yazdır
      </button>
    </main>
  );
}
