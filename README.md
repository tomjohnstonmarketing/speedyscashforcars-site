# Speedy's Cash For Cars — Next.js Site

Local-SEO focused cash-for-cars site with:

- Homepage, About, How It Works pages
- Location pages auto-generated from a Zoho spreadsheet
- 150+ service-area city pages with seeded-random unique content
- Admin refresh button (`/admin`) that pulls latest Zoho data and revalidates pages
- SEO: dynamic sitemap.xml, robots.txt, JSON-LD, per-page metadata

## Quick start (local)

```bash
npm install
cp .env.example .env.local
# edit .env.local with your real values
npm run dev
```

Open http://localhost:3000.

## Configure before going live

| Where | What |
|---|---|
| `lib/site.ts` | Phone, email, founding year, contact form embed code |
| Vercel env vars | `ZOHO_LOCATIONS_CSV_URL`, `ADMIN_REFRESH_SECRET`, `NEXT_PUBLIC_*` |
| `tailwind.config.ts` | `colors.brand.*` brand color |
| `data/cities.json` | Run `scripts/build-cities.mjs` for full 2000-city version |

## Zoho workflow

1. In Zoho Sheet: File → Publish → Publish to web → CSV. Copy URL.
2. Paste into `ZOHO_LOCATIONS_CSV_URL` in Vercel env vars.
3. At `/admin`, paste your `ADMIN_REFRESH_SECRET`, click Refresh. Pages update live.

The CSV parser accepts these column header variations:
- City: `City`, `City Name`
- State: `State`, `ST`
- Address: `Street`, `Street Address`, `Address`
- Zip: `Zip`, `Zip Code`, `Postal Code`
- Phone: `Phone`, `Phone Number`, `Tel`
- Email: `Email`, `E-mail`
- Hours: `Hours`, `Business Hours`, `Open Hours`
- Latitude/Longitude: `Lat`/`Latitude`, `Lng`/`Longitude`
- Optional: `Services`, `Map Embed`, `Established`, `Rating`, `Reviews`

## Deploying on Vercel

1. Push to GitHub.
2. Import repo on Vercel. Framework: Next.js.
3. Add env vars: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_PHONE`, `NEXT_PUBLIC_EMAIL`, `ZOHO_LOCATIONS_CSV_URL`, `ADMIN_REFRESH_SECRET`.
4. Deploy.

## Project structure

```
app/                     Next.js App Router pages
  page.tsx               Homepage
  layout.tsx             Root layout
  sitemap.ts, robots.ts
  about/, how-it-works/, admin/
  api/refresh/route.ts   Zoho refresh endpoint
  locations/[slug]/      Per-yard pages
  cash-for-cars/[city]/  Service-area city pages
components/              Shared React components
lib/                     Site config, Zoho parser, content generator
data/                    locations.json, cities.json
scripts/                 sync-zoho.mjs, build-cities.mjs
```
