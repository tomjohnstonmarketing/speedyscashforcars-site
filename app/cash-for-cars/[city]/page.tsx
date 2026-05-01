import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { loadCities, attachNearestYards } from "@/lib/cities";
import { loadLocationsData } from "@/lib/zoho";
import { buildCityContent } from "@/lib/content";
import { SITE } from "@/lib/site";
import QuoteCTA from "@/components/QuoteCTA";
import ContactFormEmbed from "@/components/ContactFormEmbed";
import JsonLd from "@/components/JsonLd";

export const revalidate = 3600;

export async function generateStaticParams() {
  const cities = await loadCities();
  return cities.map((c) => ({ city: c.slug }));
}

async function getCityContext(slug: string) {
  const [cities, { locations }] = await Promise.all([
    loadCities(),
    loadLocationsData(),
  ]);
  const withNearest = attachNearestYards(cities, locations);
  const city = withNearest.find((c) => c.slug === slug);
  if (!city) return null;
  const nearest = city.nearestLocationSlug
    ? locations.find((l) => l.slug === city.nearestLocationSlug)
    : undefined;
  const nearbyCities = withNearest
    .filter((c) => c.slug !== city.slug && c.state === city.state)
    .slice(0, 8);
  return { city, nearest, nearbyCities, locations };
}

export async function generateMetadata(
  { params }: { params: { city: string } },
): Promise<Metadata> {
  const ctx = await getCityContext(params.city);
  if (!ctx) return {};
  const copy = buildCityContent({
    city: ctx.city.city,
    state: ctx.city.state,
    nearestYardCity: ctx.nearest?.city,
    nearestYardState: ctx.nearest?.state,
    nearestYardMiles: ctx.city.nearestLocationMiles,
  });
  return {
    title: copy.title,
    description: copy.metaDescription,
    alternates: { canonical: `${SITE.url}/cash-for-cars/${ctx.city.slug}` },
    openGraph: {
      title: copy.title,
      description: copy.metaDescription,
      type: "website",
      url: `${SITE.url}/cash-for-cars/${ctx.city.slug}`,
    },
  };
}

export default async function CityPage({ params }: { params: { city: string } }) {
  const ctx = await getCityContext(params.city);
  if (!ctx) notFound();
  const { city, nearest, nearbyCities } = ctx;

  const copy = buildCityContent({
    city: city.city,
    state: city.state,
    nearestYardCity: nearest?.city,
    nearestYardState: nearest?.state,
    nearestYardMiles: city.nearestLocationMiles,
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Cash for Cars",
    provider: {
      "@type": "AutoDealer",
      name: SITE.name,
      url: SITE.url,
      telephone: SITE.phone,
    },
    areaServed: {
      "@type": "City",
      name: city.city,
      containedInPlace: { "@type": "State", name: city.state },
    },
    description: copy.metaDescription,
    url: `${SITE.url}/cash-for-cars/${city.slug}`,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Service Areas", item: `${SITE.url}/cash-for-cars` },
      { "@type": "ListItem", position: 3, name: `${city.city}, ${city.state}`, item: `${SITE.url}/cash-for-cars/${city.slug}` },
    ],
  };

  return (
    <main>
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumb} />

      <section className="bg-gradient-to-br from-ink-900 to-ink-700 py-16 text-white">
        <div className="container-x">
          <nav className="mb-3 text-xs text-ink-300">
            <Link href="/" className="hover:text-white no-underline">Home</Link>
            <span className="mx-2">›</span>
            <Link href="/cash-for-cars" className="hover:text-white no-underline">Service Areas</Link>
            <span className="mx-2">›</span>
            <span className="text-white">{city.city}, {city.state}</span>
          </nav>
          <p className="eyebrow mb-2 text-brand-500">{city.city}, {city.state}</p>
          <h1 className="max-w-3xl font-display text-4xl leading-[1.1] md:text-5xl">{copy.h1}</h1>
          <p className="mt-4 max-w-2xl text-ink-300">{copy.intro.split(". ").slice(0, 2).join(". ")}.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={`tel:${SITE.phone.replace(/[^\d+]/g, "")}`} className="btn-primary">Call {SITE.phone}</a>
            <Link href="#quote" className="btn-ghost">Get Instant Offer</Link>
          </div>
        </div>
      </section>

      <section className="container-x my-12 grid gap-10 md:grid-cols-[2fr,1fr]">
        <article className="prose-body space-y-8 text-ink-700">
          <p className="text-lg leading-8">{copy.intro}</p>

          {copy.sectionOrder.map((key) => {
            switch (key) {
              case "process":
                return (
                  <Block key={key} h={`Selling your car in ${city.city}: the process`}>
                    <p>{copy.process}</p>
                  </Block>
                );
              case "condition":
                return (
                  <Block key={key} h={`Any condition, any make — ${city.city}`}>
                    <p>{copy.condition}</p>
                  </Block>
                );
              case "localAngle":
                return (
                  <Block key={key} h={nearest ? `Servicing ${city.city} from our ${nearest.city} yard` : `Serving ${city.city}, ${city.state}`}>
                    <p>{copy.localAngle}</p>
                    {nearest && (
                      <p className="mt-3 text-sm">
                        Nearest yard: <Link href={`/locations/${nearest.slug}`} className="font-semibold text-brand-600 no-underline">{nearest.city}, {nearest.state}</Link>
                        {" "}— <a href={`tel:${nearest.phone.replace(/[^\d+]/g, "")}`} className="text-brand-600 no-underline">{nearest.phone}</a>
                      </p>
                    )}
                  </Block>
                );
              case "whyUs":
                return (
                  <Block key={key} h={`Why ${city.city} sellers trust Speedy's`}>
                    <ul className="grid gap-4 sm:grid-cols-2">
                      {copy.whyUs.map((b) => (
                        <li key={b.title} className="rounded-xl border border-ink-300 bg-white p-4">
                          <div className="font-semibold text-ink-900">{b.title}</div>
                          <div className="mt-1 text-sm text-ink-500">{b.body}</div>
                        </li>
                      ))}
                    </ul>
                  </Block>
                );
              case "faqs":
                return (
                  <Block key={key} h={`Cash for cars in ${city.city}: questions we hear`}>
                    <div className="divide-y divide-ink-300 rounded-xl border border-ink-300 bg-white">
                      {copy.faqs.map((f) => (
                        <details key={f.q} className="p-5">
                          <summary className="cursor-pointer font-semibold text-ink-900">{f.q}</summary>
                          <p className="mt-2 text-sm leading-6 text-ink-500">{f.a}</p>
                        </details>
                      ))}
                    </div>
                  </Block>
                );
              case "cta":
                return (
                  <Block key={key} h={`Get your ${city.city} offer today`}>
                    <p>{copy.cta}</p>
                  </Block>
                );
            }
          })}

          {nearbyCities.length > 0 && (
            <Block h={`We also buy cars nearby in ${city.state}`}>
              <ul className="flex flex-wrap gap-2">
                {nearbyCities.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/cash-for-cars/${c.slug}`} className="rounded-full bg-brand-50 px-3 py-1 text-sm text-brand-700 no-underline hover:bg-brand-100">
                      {c.city}, {c.state}
                    </Link>
                  </li>
                ))}
              </ul>
            </Block>
          )}
        </article>

        <aside className="space-y-6">
          <ContactFormEmbed />
          <QuoteCTA city={city.city} compact />
          {nearest && (
            <div className="rounded-xl bg-ink-900 p-5 text-white">
              <div className="text-sm text-ink-300">Your {city.city} pickups run out of</div>
              <Link href={`/locations/${nearest.slug}`} className="mt-1 block font-display text-xl text-white no-underline">{nearest.city}, {nearest.state}</Link>
              <a href={`tel:${nearest.phone.replace(/[^\d+]/g, "")}`} className="mt-1 block text-sm text-brand-500 no-underline">{nearest.phone}</a>
            </div>
          )}
        </aside>
      </section>
    </main>
  );
}

function Block({ h, children }: { h: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-3 font-display text-2xl text-ink-900">{h}</h2>
      <div className="space-y-3 leading-7">{children}</div>
    </section>
  );
}
