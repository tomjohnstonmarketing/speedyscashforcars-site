import Link from "next/link";
import Hero from "@/components/Hero";
import ServicesGrid from "@/components/ServicesGrid";
import HowItWorks from "@/components/HowItWorks";
import TrustBar from "@/components/TrustBar";
import QuoteCTA from "@/components/QuoteCTA";
import ContactFormEmbed from "@/components/ContactFormEmbed";
import JsonLd from "@/components/JsonLd";
import { SITE } from "@/lib/site";
import { loadLocationsData } from "@/lib/zoho";

export const revalidate = 3600;

export default async function Home() {
  const { locations } = await loadLocationsData();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    priceRange: "$$",
    areaServed: "United States",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: locations.reduce((s, l) => s + (l.reviewCount ?? 0), 0) || 954,
    },
  };

  return (
    <main>
      <JsonLd data={jsonLd} />
      <Hero />
      <TrustBar />
      <HowItWorks />
      <ServicesGrid />

      <section className="container-x my-20">
        <p className="eyebrow mb-2">Locations</p>
        <h2 className="font-display text-3xl md:text-4xl">
          Speedy's yards across the U.S.
        </h2>
        <p className="mt-2 max-w-2xl text-ink-500">
          Don't see your city? We service thousands of cities nationwide via our nearest yard — free towing included.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((l) => (
            <Link key={l.slug} href={`/locations/${l.slug}`} className="group rounded-xl border border-ink-300 bg-white p-5 shadow-sm transition hover:shadow-md no-underline">
              <div className="text-sm text-brand-600">{l.state}</div>
              <div className="mt-1 font-display text-xl text-ink-900 group-hover:text-brand-600">{l.city}</div>
              <div className="mt-2 text-sm text-ink-500">{l.address}</div>
              <div className="mt-1 text-sm text-ink-500">{l.phone}</div>
              {l.hours && <div className="mt-2 text-xs text-ink-500">{l.hours}</div>}
            </Link>
          ))}
        </div>
        <div className="mt-6">
          <Link href="/locations" className="font-semibold text-brand-600 no-underline">View all locations →</Link>
        </div>
      </section>

      <QuoteCTA />

      <section className="container-x my-20">
        <p className="eyebrow mb-2">Why Speedy's</p>
        <h2 className="font-display text-3xl md:text-4xl">No lowballs. No tow fees. No surprises.</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {SITE.usps.map((u) => (
            <div key={u} className="rounded-xl border border-ink-300 bg-white p-5">
              <div className="mb-2 h-6 w-6 rounded-full bg-brand-500" />
              <h3 className="text-lg font-semibold">{u}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ink-900/[0.02]">
        <div className="container-x py-16">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <p className="eyebrow mb-2">Get your offer</p>
              <h2 className="font-display text-3xl md:text-4xl">Two minutes to a real cash offer.</h2>
              <p className="mt-3 max-w-md text-ink-500">
                Enter your vehicle details and we'll get back with a firm, same-day offer. Prefer to talk to a human?
                Call <a className="font-semibold text-brand-600 no-underline" href={`tel:${SITE.phone.replace(/[^\d+]/g, "")}`}>{SITE.phone}</a>.
              </p>
            </div>
            <div>
              <ContactFormEmbed />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
