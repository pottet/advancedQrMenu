"use client";

import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";

/**
 * Masaüstünde gösterilen "telefonunda aç" QR kodu.
 * AR yalnızca mobil cihazlarda çalıştığı için bilgisayardan bakan
 * kullanıcıyı aynı sayfanın mobil sürümüne yönlendirir.
 */
export default function ShareQR({ label }: { label: string }) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  if (!url) return null;

  return (
    <aside className="mt-8 hidden items-center gap-4 rounded-2xl border border-line bg-card p-4 lg:flex">
      <div className="rounded-xl bg-white p-2">
        <QRCodeSVG value={url} size={96} />
      </div>
      <div>
        <p className="font-semibold text-cream">{label}</p>
        <p className="mt-1 text-sm text-cream-dim">
          Kamerayla kodu okutun; <span className="text-gold-soft">Masamda Gör</span> butonu
          telefonunuzda görünecektir.
        </p>
      </div>
    </aside>
  );
}
