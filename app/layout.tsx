import type { Metadata, Viewport } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import { restaurant } from "@/data/menu";

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
});

const display = Playfair_Display({
  variable: "--font-disp",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: `${restaurant.name} | AR Menü`,
  description:
    "Dijital QR menü — yemekleri 3D inceleyin, 'Masamda Gör' ile artırılmış gerçeklikte masanızda görüntüleyin.",
};

export const viewport: Viewport = {
  themeColor: "#16110d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${body.variable} ${display.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
