# Procurime Buyer Panel

Nabusoft case study kapsamında hazırladığım frontend prototipi. Alıcı (buyer) tarafının temel ekranlarını gösteriyor; gerçek bir backend bağlantısı yok.

## Çalıştırma

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) adresine git. Otomatik login sayfasına yönlendirir.

Production build:

```bash
npm run build
npm start
```

## Giriş bilgileri

Geçerli bir e-posta adresi ve en az 3 karakter şifre ile giriş yapılır.

| | |
|---|---|
| Örnek e-posta | `demo@procurime.com` |
| Örnek şifre | `demo123` |

Giriş kontrolü `lib/auth.js` içinde, localStorage ile tutuluyor.

## Demo'da neye bakmalı?

Teklif karşılaştırmanın dolu olduğu RFQ: **RFQ-2025-0047**

1. Giriş yap
2. Sol menüden **RFQ'lar** → `RFQ-2025-0047` satırına tıkla
3. **Teklifler** sekmesi — 3 tedarikçi karşılaştırması burada
4. İstersen **AI Asistan** linkinden mock chat'i dene (cevaplar `lib/mockAi.js`'den gelir, kelime kelime akar)

RFQ oluşturma formu (`/rfqs/new`) çalışır ama gönderince listeye yazılmaz; başarı mesajı modal ile gösterilir (mock).

## Sayfalar

- `/login` — giriş
- `/dashboard` — özet metrikler, son aktiviteler
- `/rfqs` — liste, arama ve filtre
- `/rfqs/new` — 4 adımlı RFQ formu
- `/rfqs/[id]` — detay, kalemler, teklif karşılaştırma
- `/rfqs/[id]/ai` — AI sohbet (mock streaming)
- `/suppliers` — tedarikçi listesi (bonus ekran)

## Mock veri

Tüm statik veri `lib/mockData.js` dosyasında. AI cevapları ayrı: `lib/mockAi.js`.

Kalem ve teklif detayı `rfq-001`, `rfq-002` ve `rfq-004` için dolu. `rfq-003` taslak olduğu için teklif içermez.

## Teknoloji

Next.js 14 (App Router), React 18, Tailwind CSS, plain JavaScript.

## Renkler

Buyer paneli turkuaz (`buyer`), tedarikçi vurguları turuncu (`supplier`), Procurime logosu mor (`admin`). Tanımlar `tailwind.config.js` içinde.

## Deploy

Proje Vercel'e bağlı (`nasibs-projects-59ac3a1e/procurime-prototype`). Production deploy:

```bash
npx vercel@latest deploy --prod
```

Alternatif: [vercel.com](https://vercel.com) üzerinden repo'yu import et. Framework: Next.js, build: `npm run build`.

GitHub'a push:

```bash
git remote add origin https://github.com/KULLANICI_ADIN/procurime-prototype.git
git push -u origin master
```

**Canlı demo:** Deploy tamamlandıktan sonra Vercel'in verdiği `*.vercel.app` linkini buraya yaz.
