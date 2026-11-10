# Lezzet — AR Destekli QR Menü

Restoranlar için dijital QR menü. Müşteri masadaki QR kodu okutur, menüyü telefonunda gezer;
yemeğe dokununca fiyat, içindekiler ve görsel açılır. **AR rozetli** yemeklerde
**“Masamda Gör”** butonu, yemeğin 3D modelini artırılmış gerçeklikle gerçek boyutunda
masanın üzerinde gösterir.

## Teknolojiler

- **Next.js 16** (App Router, TypeScript, Tailwind CSS v4)
- **[`<model-viewer>`](https://modelviewer.dev)** — 3D önizleme + AR
  - Android: Scene Viewer / WebXR
  - iOS: AR Quick Look (USDZ, GLB'den otomatik üretilir — ayrı dosya gerekmez)
- **qrcode.react** — masa QR kodları

## Çalıştırma

```bash
npm run dev
```

> Not: Bu bilgisayarda Node.js PATH'te değil. Önce şunu çalıştırın (veya `~/.zshrc`'ye ekleyin):
>
> ```bash
> export PATH="$HOME/.local/node/node-v22.17.0-darwin-x64/bin:$PATH"
> ```

Ardından tarayıcıda `http://localhost:3000` açın.

- **Telefonda denemek için:** bilgisayar ve telefon aynı Wi-Fi'dayken `http://<bilgisayar-ip>:3000`
  adresini telefonda açın (`npm run dev` çıktısında "Network" adresi yazar).
- **AR'ın tam çalışması için** sitenin HTTPS ile yayınlanması gerekir (aşağıya bakın).
  iOS Quick Look yerel ağda da çalışır; Android Scene Viewer, modele internetten
  erişilebilen bir adres ister.

## Sayfalar

| Adres | İçerik |
| --- | --- |
| `/` | Ana ekran — Menü, Kararsızlar Çarkı, Bütçe Önerici, Yemeği Tahmin Et |
| `/menu` | Menü — zaman dilimine göre filtrelenen kategoriler ve yemek kartları |
| `/yemek/<slug>` | Yemek detayı — fiyat, içindekiler, 3D/AR görünüm, acı ölçer, malzeme hikayeleri |
| `/cark` | Kararsızlar Çarkı — rastgele yemek önerir |
| `/oneri` | Bütçe Önerici — kişi sayısı + bütçeye göre sipariş kombinasyonu önerir |
| `/oyun` | Yemeği Tahmin Et — bulanık fotoğraftan çoktan seçmeli mini oyun |
| `/qr` | Masalara asılacak QR kodu (yazdırılabilir) |

## Menüyü düzenleme

Tüm menü tek dosyada: [`data/menu.ts`](data/menu.ts)

```ts
{
  slug: "kruvasan",              // adres: /yemek/kruvasan
  name: "Tereyağlı Kruvasan",
  description: "…",
  price: 140,                    // ₺
  ingredients: ["Un", "Tereyağı"],
  image: "/images/kruvasan.jpg", // public/images/ altına koyun
  model: "/models/croissant.glb",// opsiyonel — varsa AR butonu çıkar
  badges: ["Vejetaryen"],        // opsiyonel
  spiceLevel: 2,                 // opsiyonel, 1-3 — acı ısı çubuğu ve "gerçekten acı" efekti
  sfx: "sizzle",                 // opsiyonel — ızgara/kızartma ürünlerinde "cızırtısını duy" butonu
  timeTags: ["ogle", "gunbatimi"], // zorunlu — bu yemeğin hangi zaman diliminde menüde göründüğü
}
```

`timeTags` seçenekleri: `"sabah"` (06–11), `"ogle"` (11–17), `"gunbatimi"` (17–20), `"gece"` (20–06).
Bir yemek birden fazla dilime ait olabilir; hiçbir yemeği içermeyen bir kategori o dilimde
otomatik olarak gizlenir.

Restoran adı ve sloganı da aynı dosyadaki `restaurant` nesnesinde.

### Malzeme hikaye kartları

`/yemek/<slug>` sayfasında bir malzemeye dokunulunca açılan "nereden geliyor" kartlarının
verisi [`data/ingredients.ts`](data/ingredients.ts) dosyasında. Şu an içindeki köken/mevsim
bilgileri **örnek/demo içerik** — yayına almadan önce kendi gerçek tedarikçilerinizin
bilgileriyle güncelleyin. Sözlükte olmayan bir malzeme adı otomatik olarak sade bir etiket
olarak kalır (kart açılmaz).

### Bütçe Önerici nasıl çalışıyor

`/oneri` sayfası, girilen kişi sayısı ve bütçeye göre menüden üç kombinasyon üretir
(Ekonomik / Dengeli / Şölen). Mantık [`lib/combo.ts`](lib/combo.ts) içinde; başlangıç,
ana yemek, tatlı ve içecek kategorilerinden kişi başına makul oranlarla seçim yapar ve
bütçeye göre "uygun" / "aşıyor" etiketler. Kahvaltı & Fırın kategorisi grup siparişi
mantığına uymadığı için bu hesaba dahil edilmiyor.

## Kendi yemeklerinizin 3D modelini eklemek

1. Yemeği telefonla tarayın: **Polycam**, **Luma AI** veya **RealityScan**
   (yemeğin etrafında dönerek 30–60 fotoğraf; sabit ışık, mat zemin en iyi sonucu verir).
2. **GLB** formatında dışa aktarın.
3. Dosya büyükse küçültün (hedef: 2–5 MB):
   ```bash
   npx @gltf-transform/cli optimize girdi.glb cikti.glb --compress draco --texture-compress auto --texture-size 1024
   ```
   > ⚠️ `--compress draco` ve `--texture-compress auto` bayraklarını atlamayın: komutun
   > varsayılanı (meshopt + WebP) `model-viewer` tarafından ek ayar olmadan açılamaz ve
   > model sayfada görünmez.
4. Dosyayı `public/models/` altına koyun, `data/menu.ts` içindeki `model` alanına yolunu yazın.

iOS için USDZ üretmenize gerek yok; `model-viewer` GLB'den anında üretir.

## Yayınlama (Vercel)

```bash
npm i -g vercel && vercel
```

Yayınlanan `https://…` adresini telefonla açıp AR'ı test edin, ardından `/qr` sayfasından
masa kartlarını yazdırın. (Statik barındırma yeterlidir; sunucu/veritabanı gerekmez.)

## Demo içerik lisansları

- 3D modeller ve render görselleri: [Poly Haven](https://polyhaven.com) — **CC0** (ticari kullanım serbest)
- Diğer yemek fotoğrafları: [TheMealDB](https://www.themealdb.com) — yalnızca demo amaçlı;
  yayına almadan önce kendi fotoğraflarınızla değiştirin.
# advancedQrMenu
