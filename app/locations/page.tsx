import Link from "next/link";
import type { Metadata } from "next";
import { loadLocationsData } from "@/lib/zoho";
import { SITE } from "@/lib/site";
import QuoteCTA from "@/components/QuoteCTA";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "All Locations",
  description: `Every ${SITE.name} location across the U.S. Find your nearest cash-for-cars yard, hours, and phone number.`,
  alternates: { canonical: `${SITE.url}/locations` },
};

export default async function LocationsIndex() {
  const { locations } = await loadLocationsData();
  const byState = locations.reduce<Record<string, typeof locations>>((acc, l) => {
    (acc[l.state] ??= []).push(l);
    return acc;
  }, {});
  const states = Object.keys(byState).sort();

  return (
    <main>
      <section className="bg-ink-900 py-16 text-white">
        <div className="container-x">
          <p className="eyebrow mb-2 text-brand-500">Find a yard</p>
          <h1 className="font-display text-4xl md:text-5xl">All {SITE.name} locations</h1>
          <p className="mt-3 max-w-2xl text-ink-300">
            Speedy's physical yards across the U.S. Free towing from any city within our service area — find your closest yard below or{" "}
            <Link href="/#quote" className="text-brand-500 no-underline">get an instant offer</Link>.
          </p>
        </div>
      </section>

      <section className="container-x my-12">
        {states.map((st) => (
          <div key={st} className="mb-12">
            <h2 className="mb-4 font-display text-2xl text-ink-900">{st}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {byState[st].map((l) => (
                <Link key={l.slug} href={`/locations/${l.slug}`} className="group rounded-xl border border-ink-300 bg-white p-5 shadow-sm transition hover:shadow-md no-underline">
                  <div className="font-display text-xl text-ink-900 group-hover:text-brand-600">{l.city}</div>
                  <div className="mt-1 text-sm text-ink-500">{l.address}</div>
                  <div className="mt-1 text-sm text-ink-500">{l.zip}</div>
                  <div className="mt-2 text-sm font-semibold text-brand-600">{l.phone}</div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      <QuoteCTA />
    </main>
  );
}
