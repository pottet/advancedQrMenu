export type IngredientInfo = {
  origin: string;
  seasonal: boolean;
  season?: string;
  story: string;
};

/**
 * Malzeme hikaye kartları için örnek/demo içerik.
 * Gerçek bir restoranda bu veriler kendi tedarikçilerinizin ve mevsim
 * takviminizin gerçek bilgileriyle değiştirilmelidir.
 */
export const ingredientStories: Record<string, IngredientInfo> = {
  "Kırmızı mercimek": {
    origin: "Konya ovası",
    seasonal: false,
    story: "Konya'nın verimli ovalarında yetişir, hasadı Temmuz ayında yapılıp güneşte kurutulur. Kurutulmuş baklagil olduğu için yıl boyu aynı kalitede bulunur.",
  },
  Soğan: {
    origin: "Amasya",
    seasonal: false,
    story: "Amasya'nın soğanıyla ünlü topraklarından gelir. Ağustosta hasat edilip kurutulduktan sonra yıl boyu depolarda tazeliğini korur.",
  },
  Havuç: {
    origin: "Beypazarı, Ankara",
    seasonal: true,
    season: "Ekim–Şubat",
    story: "Türkiye'nin havuç başkenti sayılan Beypazarı'ndan gelir. En tatlı halini ilk soğuklarla birlikte, Ekim'den itibaren alır.",
  },
  Tereyağı: {
    origin: "Kars yaylaları",
    seasonal: false,
    story: "Kars'ın yüksek yaylalarında otlayan ineklerin sütünden, geleneksel yöntemle günlük üretilir. Yaz otlak döneminde (Mayıs–Eylül) rengi daha sarıdır.",
  },
  "Pul biber": {
    origin: "Urfa",
    seasonal: true,
    season: "Ağustos–Eylül hasat",
    story: "Şanlıurfa'nın güneşinde yetişip yine güneşte kurutulan biberlerden elde edilir. Hasat Ağustos sonunda yapılır, bir yıllık ihtiyaç bu dönemde işlenir.",
  },
  Limon: {
    origin: "Mersin",
    seasonal: true,
    season: "Kasım–Mart",
    story: "Akdeniz'in turunçgil bahçelerinden gelir. En sulu ve aromatik halini kış aylarında, Kasım'dan Mart'a kadar sürer.",
  },
  Domates: {
    origin: "Antalya",
    seasonal: true,
    season: "Haziran–Eylül (tarla)",
    story: "Antalya'nın seralarından yıl boyu gelse de, gerçek tarla domatesinin en lezzetli dönemi yaz aylarıdır — bu tabakta o dönemi hedefliyoruz.",
  },
  Salatalık: {
    origin: "Antalya",
    seasonal: true,
    season: "Yaz ayları",
    story: "Akdeniz seralarından tedarik edilir; en çıtır ve sulu hali yaz aylarında, güneşin bol olduğu dönemde elde edilir.",
  },
  "Sivri biber": {
    origin: "Ege bölgesi",
    seasonal: true,
    season: "Haziran–Ekim",
    story: "Ege'nin küçük aile bahçelerinden toplanır. Yaz ortasından sonbahara kadar tazeliğini korur, ardından yerini kurutulmuş çeşitlere bırakır.",
  },
  "Kuru soğan": {
    origin: "Amasya",
    seasonal: false,
    story: "Yaz sonunda hasat edilip özenle kurutulan soğanlardır; bu sayede yıl boyunca aynı keskinlik ve tatlılıkta kullanılabilir.",
  },
  "Beyaz peynir": {
    origin: "Trakya mandıraları",
    seasonal: false,
    story: "Trakya'daki küçük aile mandıralarında geleneksel yöntemle üretilir. İlkbahar otlarıyla beslenen hayvanların sütü en yağlı peyniri verir.",
  },
  Zeytinyağı: {
    origin: "Ayvalık, Edremit",
    seasonal: true,
    season: "Kasım–Aralık hasat",
    story: "Ege kıyısının zeytinliklerinden, yılın en soğuk aylarında (Kasım–Aralık) hasat edilip aynı gün soğuk sıkım yöntemiyle işlenir.",
  },
  "Nar ekşisi": {
    origin: "Antalya, Fethiye",
    seasonal: true,
    season: "Ekim–Aralık hasat",
    story: "Sonbaharda hasat edilen narların suyu sabırla kaynatılıp koyulaştırılır. Bir kavanoz nar ekşisi için haftalarca süren bir emek var.",
  },
  Un: {
    origin: "Trakya buğday ovaları",
    seasonal: false,
    story: "Trakya'nın geniş buğday tarlalarından, Temmuz hasadı sonrası öğütülür. Değirmenden fırınımıza kadar kısa bir yolculuk yapar.",
  },
  Süt: {
    origin: "Kars, Ardahan yaylaları",
    seasonal: false,
    story: "Doğu Anadolu'nun yüksek ve temiz yaylalarında otlayan ineklerden, her sabah taze olarak temin edilir.",
  },
  Maya: {
    origin: "Kendi fırınımız",
    seasonal: false,
    story: "Yıllardır beslediğimiz kendi ekşi mayamızdan üretilir; her gün biraz ondan alıp yeniden beslediğimiz canlı bir kültür.",
  },
  Şeker: {
    origin: "Eskişehir şeker fabrikaları",
    seasonal: false,
    story: "İç Anadolu'nun pancar tarlalarından, sonbahar hasadının ardından işlenerek gelir.",
  },
  "Deniz tuzu": {
    origin: "Çamaltı Tuzlası, İzmir",
    seasonal: true,
    season: "Yaz güneşinde buharlaşma",
    story: "İzmir'in tarihi tuzlasında, deniz suyu yaz güneşinde doğal olarak buharlaştırılarak elde edilir.",
  },
  Avokado: {
    origin: "Antalya, Alanya bahçeleri",
    seasonal: true,
    season: "Kasım–Mart",
    story: "Türkiye'nin güneyinde son yıllarda yetiştirilmeye başlanan bahçelerden geliyor; en olgun halini kış aylarında alıyor.",
  },
  Yumurta: {
    origin: "Bolu, gezen tavuk çiftlikleri",
    seasonal: false,
    story: "Açık alanda gezen tavuklardan, günlük olarak toplanır. Koyu turuncu sarısı, doğal beslenmenin bir işareti.",
  },
  "Ekşi maya ekmeği": {
    origin: "Kendi fırınımız",
    seasonal: false,
    story: "Kendi mayamızla her sabah yoğrulup uzun mayalanma süresiyle pişirilir; katkı maddesi kullanılmaz.",
  },
  "Kiraz domates": {
    origin: "Antalya seraları",
    seasonal: true,
    season: "Yaz ayları",
    story: "En tatlı halini yaz güneşinde alır; salkım halinde, olgunlaştığı dalından toplanarak gönderilir.",
  },
  "Mikro filiz": {
    origin: "Kendi topraksız tarım ünitemiz",
    seasonal: false,
    story: "Mutfağımıza yakın bir alanda, topraksız tarım yöntemiyle günlük olarak yetiştirilir ve aynı gün hasat edilip servis edilir.",
  },
  "Tavuk but": {
    origin: "Bolu, Düzce çiftlikleri",
    seasonal: false,
    story: "Serbest gezinme alanı olan çiftliklerden, antibiyotiksiz beslenmiş tavuklardan temin edilir.",
  },
  Yoğurt: {
    origin: "Kars, Silivri mandırası",
    seasonal: false,
    story: "Geleneksel yöntemle, tam yağlı sütten mayalanır; kıvamı için hiçbir katkı maddesi kullanılmaz.",
  },
  "Kırmızı biber": {
    origin: "Kahramanmaraş",
    seasonal: true,
    season: "Ağustos–Eylül hasat",
    story: "Maraş'ın verimli ovalarında yetişir, hasat sonrası güneşte kurutularak bütün yıl için hazırlanır.",
  },
  Bulgur: {
    origin: "Gaziantep, Kilis değirmenleri",
    seasonal: false,
    story: "Buğdayın haşlanıp kurutulduktan sonra kırılmasıyla elde edilir; Güneydoğu'nun asırlık değirmen geleneğinden gelir.",
  },
  Haydari: {
    origin: "Kendi mutfağımız",
    seasonal: false,
    story: "Süzme yoğurt, taze sarımsak ve nane ile her gün kendi mutfağımızda hazırlanır.",
  },
  Baharatlar: {
    origin: "Gaziantep baharatçıları",
    seasonal: false,
    story: "Güneydoğu'nun köklü baharat pazarlarından temin edilen ham baharatlar, şefimizin kendi tarifiyle harmanlanır.",
  },
  Patlıcan: {
    origin: "Ege bölgesi bahçeleri",
    seasonal: true,
    season: "Temmuz–Ekim",
    story: "Ege'nin bereketli topraklarında yetişir; en az tohumlu ve etli halini yaz ortasından sonbahara kadar korur.",
  },
  "Dana kıyma": {
    origin: "Trakya, Balıkesir besileri",
    seasonal: false,
    story: "Otlak beslemesi yapılan çiftliklerden gelen dana etinden, günlük olarak kendi kasabımızda çekilir.",
  },
  "Beşamel sos": {
    origin: "Kendi mutfağımız",
    seasonal: false,
    story: "Tereyağı, un ve süt ile klasik yöntemle her gün taze hazırlanır; hazır karışım kullanılmaz.",
  },
  "Kaşar peyniri": {
    origin: "Kars",
    seasonal: false,
    story: "Kars'ın geleneksel kaşar üretim atölyelerinde aylarca olgunlaştırılır, bu da o karakteristik lezzeti verir.",
  },
  "Brioche ekmek": {
    origin: "Kendi fırınımız",
    seasonal: false,
    story: "Bol tereyağlı ve yumurtalı hamurundan, her sabah taze olarak kendi fırınımızda pişirilir.",
  },
  Cheddar: {
    origin: "İzmir süt çiftlikleri",
    seasonal: false,
    story: "Yerli süt çiftliklerinden temin edilen sütle, İngiliz usulü olgunlaştırma yöntemiyle üretilir.",
  },
  "Karamelize soğan": {
    origin: "Amasya soğanından",
    seasonal: false,
    story: "Amasya soğanının kendi şekeri açığa çıkana kadar, kendi mutfağımızda saatlerce yavaş ateşte pişirilir.",
  },
  "Özel sos": {
    origin: "Şefimizin tarifi",
    seasonal: false,
    story: "Yıllar içinde geliştirilen, dışarıya açıklanmayan bir tarifle her gün taze olarak hazırlanır.",
  },
  Patates: {
    origin: "Niğde, Nevşehir",
    seasonal: true,
    season: "Eylül–Ekim hasat",
    story: "İç Anadolu'nun yüksek platolarında yetişir; sonbaharda hasat edilip serin depolarda kışa hazırlanır.",
  },
  "Izgara Tavuk": {
    origin: "Bolu, Düzce çiftlikleri",
    seasonal: false,
    story: "Serbest dolaşan tavuklardan, servis gününün sabahında marine edilerek hazırlanır.",
  },
  "Lavaş ekmek": {
    origin: "Kendi fırınımız",
    seasonal: false,
    story: "İnce açılıp taş fırında pişirilir; her siparişte taze olması için küçük partiler halinde üretilir.",
  },
  "Izgara sebzeler": {
    origin: "Yerel üreticiler",
    seasonal: true,
    season: "Yıl boyu, mevsimine göre değişir",
    story: "O haftanın en taze sebzesi neyse (yazın patlıcan-kabak, kışın mantar-kabak) menüye o girer; sabit bir tarif yerine mevsimi takip ederiz.",
  },
  "El yapımı makarna": {
    origin: "Kendi mutfağımız",
    seasonal: false,
    story: "Un ve yumurta ile her gün elle yoğrulup açılır; kuru pakette bekletilmez, aynı gün pişirilir.",
  },
  Ceviz: {
    origin: "Erzincan, Adıyaman bahçeleri",
    seasonal: true,
    season: "Eylül–Ekim hasat",
    story: "Anadolu'nun köklü ceviz ağaçlarından sonbaharda hasat edilir, kabuğundan yeni çıkmış hali en aromatik olanıdır.",
  },
  Tarçın: {
    origin: "Seylan (ithal)",
    seasonal: false,
    story: "Gerçek Seylan tarçını ince kabuklarından elde edilir; tatlı ve hafif baharatlı notası için özenle seçilir.",
  },
  "Krem peynir": {
    origin: "Trakya süt çiftlikleri",
    seasonal: false,
    story: "Taze kremadan üretilir, kremamsı kıvamını korumak için kısa süre içinde mutfağımıza ulaştırılır.",
  },
  "Belçika çikolatası": {
    origin: "Belçika (ithal kuvertür)",
    seasonal: false,
    story: "Yüksek kakao oranlı gerçek kuvertür çikolatadır; pastane atölyemizde bize özel eritilip şekillendirilir.",
  },
  "Taze çilek": {
    origin: "Bursa, İzmir bahçeleri",
    seasonal: true,
    season: "Nisan–Haziran",
    story: "En tatlı ve kokulu halini ilkbaharda, Nisan'dan Haziran'a kadar olan kısa hasat döneminde alır.",
  },
  Kakao: {
    origin: "İthal, harman kendi tarifimiz",
    seasonal: false,
    story: "Yüksek kaliteli kakao tozları özenle seçilip pastane şefimizin tarifiyle harmanlanır.",
  },
  Krema: {
    origin: "Trakya süt çiftlikleri",
    seasonal: false,
    story: "Tam yağlı sütün üzerinden alınan kaymaktan elde edilir, pastalarımıza o kadife dokuyu verir.",
  },
  Pandispanya: {
    origin: "Kendi pastane atölyemiz",
    seasonal: false,
    story: "Yumurta, un ve şekerden, her gün taze olarak kendi atölyemizde pişirilir; dondurulmuş ürün kullanılmaz.",
  },
  "Rize çayı": {
    origin: "Rize, Çayeli bahçeleri",
    seasonal: true,
    season: "Mayıs–Ekim (yaş çay toplama)",
    story: "Karadeniz'in yeşil yamaçlarında elle toplanan yaş çay yapraklarından üretilir; hasat sezonu Mayıs'tan Ekim'e kadar sürer.",
  },
  "Lokum ikramı": {
    origin: "Afyon",
    seasonal: false,
    story: "Geleneksel tarifle, nişasta ve şekerin sabırla pişirilmesiyle yapılır; yüzyıllık bir Anadolu tatlısıdır.",
  },
  "Taze nar": {
    origin: "Antalya, Fethiye bahçeleri",
    seasonal: true,
    season: "Ekim–Aralık",
    story: "Sonbaharda olgunlaşan narlar, en sulu ve ekşi-tatlı dengesine ulaştığı Ekim–Aralık arasında toplanır.",
  },
};
