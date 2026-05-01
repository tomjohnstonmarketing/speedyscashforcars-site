import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { loadLocationsData } from "@/lib/zoho";
import { SITE } from "@/lib/site";
import QuoteCTA from "@/components/QuoteCTA";
import ContactFormEmbed from "@/components/ContactFormEmbed";
import JsonLd from "@/components/JsonLd";
import { buildCityContent } from "@/lib/content";

export const revalidate = 3600;

export async function generateStaticParams() {
  const { locations } = await loadLocationsData();
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata(
  { params }: { params: { slug: string } },
): Promise<Metadata> {
  const { locations } = await loadLocationsData();
  const loc = locations.find((l) => l.slug === params.slug);
  if (!loc) return {};
  const title = `Cash For Cars in ${loc.city}, ${loc.state} — ${SITE.name}`;
  const description = `${SITE.name} buys cars in ${loc.city}, ${loc.state}. Free towing, same-day pickup, cash on the spot. Call ${loc.phone} or get an instant online offer.`;
  return {
    title,
    description,
    alternates: { canonical: `${SITE.url}/locations/${loc.slug}` },
    openGraph: { title, description, type: "website" },
  };
}

export default async function LocationPage({ params }: { params: { slug: string } }) {
  const { locations } = await loadLocationsData();
  const loc = locations.find((l) => l.slug === params.slug);
  if (!loc) notFound();

  const copy = buildCityContent({
    city: loc.city,
    state: loc.state,
    nearestYardCity: loc.city,
    nearestYardState: loc.state,
    nearestYardMiles: 0,
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    name: `${SITE.name} — ${loc.city}, ${loc.state}`,
    url: `${SITE.url}/locations/${loc.slug}`,
    telephone: loc.phone,
    email: loc.email ?? SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: loc.address,
      addressLocality: loc.city,
      addressRegion: loc.state,
      postalCode: loc.zip,
      addressCountry: "US",
    },
    geo: loc.lat && loc.lng ? { "@type": "GeoCoordinates", latitude: loc.lat, longitude: loc.lng } : undefined,
    openingHours: loc.hours,
    priceRange: "$$",
    aggregateRating: loc.reviewRating && loc.reviewCount ? {
      "@type": "AggregateRating",
      ratingValue: loc.reviewRating,
      reviewCount: loc.reviewCount,
    } : undefined,
  };

  const phoneDigits = loc.phone.replace(/[^\d+]/g, "");

  return (
    <main>
      <JsonLd data={jsonLd} />

      <section className="bg-gradient-to-br from-ink-900 to-ink-700 py-16 text-white">
        <div className="container-x grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="eyebrow mb-2 text-brand-500">{loc.city}, {loc.state}</p>
            <h1 className="font-display text-4xl md:text-5xl">
              {SITE.name} in {loc.city}
            </h1>
            <p className="mt-3 max-w-xl text-ink-300">
              Running, wrecked, or junk — we'll buy your car in {loc.city}, {loc.state} for cash today. Free tow, same-day pickup, no fees.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={`tel:${phoneDigits}`} className="btn-primary">Call {loc.phone}</a>
              <Link href="#quote" className="btn-ghost">Get Instant Offer</Link>
            </div>
          </div>
          <div className="rounded-2xl bg-white/5 p-6 backdrop-blur">
            <h2 className="font-display text-xl">Yard details</h2>
            <dl className="mt-4 grid grid-cols-1 gap-3 text-sm">
              <Detail label="Address">{loc.address}, {loc.city}, {loc.state} {loc.zip}</Detail>
              <Detail label="Phone"><a className="hover:text-brand-500 no-underline" href={`tel:${phoneDigits}`}>{loc.phone}</a></Detail>
              {loc.email && <Detail label="Email"><a className="hover:text-brand-500 no-underline" href={`mailto:${loc.email}`}>{loc.email}</a></Detail>}
              {loc.hours && <Detail label="Hours">{loc.hours}</Detail>}
              {loc.establishedYear && <Detail label="Serving since">{loc.establishedYear}</Detail>}
              {loc.reviewRating && (
                <Detail label="Rating">
                  {loc.reviewRating.toFixed(1)}★ {loc.reviewCount ? `(${loc.reviewCount} reviews)` : ""}
                </Detail>
              )}
            </dl>
          </div>
        </div>
      </section>

      <section className="container-x my-12 grid gap-10 md:grid-cols-[2fr,1fr]">
        <div>
          <p className="text-lg leading-8 text-ink-700">{copy.intro}</p>
          <h2 className="mt-10 font-display text-2xl">How it works at our {loc.city} yard</h2>
          <p className="mt-3 leading-7 text-ink-700">{copy.process}</p>
          <h2 className="mt-10 font-display text-2xl">We buy vehicles in any condition</h2>
          <p className="mt-3 leading-7 text-ink-700">{copy.condition}</p>
          {loc.services && loc.services.length > 0 && (
            <>
              <h3 className="mt-8 font-semibold text-ink-900">Specialties at this yard</h3>
              <ul className="mt-2 flex flex-wrap gap-2">
                {loc.services.map((s) => (
                  <li key={s} className="rounded-full bg-brand-50 px-3 py-1 text-sm text-brand-700">{s}</li>
                ))}
              </ul>
            </>
          )}
          <h2 className="mt-10 font-display text-2xl">Why {loc.city} sellers choose Speedy's</h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {copy.whyUs.map((b) => (
              <li key={b.title} className="rounded-xl border border-ink-300 bg-white p-4">
                <div className="font-semibold">{b.title}</div>
                <div className="mt-1 text-sm text-ink-500">{b.body}</div>
              </li>
            ))}
          </ul>
          <h2 className="mt-10 font-display text-2xl">Frequently asked in {loc.city}</h2>
          <div className="mt-4 divide-y divide-ink-300 rounded-xl border border-ink-300 bg-white">
            {copy.faqs.map((f) => (
              <details key={f.q} className="p-5">
                <summary className="cursor-pointer font-semibold text-ink-900">{f.q}</summary>
                <p className="mt-2 text-sm leading-6 text-ink-500">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
        <aside className="space-y-6">
          <ContactFormEmbed />
          <QuoteCTA city={loc.city} compact />
          <div className="rounded-xl bg-ink-900 p-5 text-white">
            <div className="text-sm text-ink-300">Call the {loc.city} yard</div>
            <a href={`tel:${phoneDigits}`} className="mt-1 block text-2xl font-display text-white no-underline">{loc.phone}</a>
          </div>
        </aside>
      </section>
    </main>
  );
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[7rem,1fr] items-baseline gap-2">
      <dt className="text-xs uppercase tracking-wide text-ink-300">{label}</dt>
      <dd className="text-white">{children}</dd>
    </div>
  );
}
