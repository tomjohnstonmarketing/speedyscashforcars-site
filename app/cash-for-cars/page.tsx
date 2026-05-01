import Link from "next/link";
import type { Metadata } from "next";
import { loadCities } from "@/lib/cities";
import { SITE } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Cash For Cars — Service Areas Across the U.S.",
  description: `Every U.S. city ${SITE.name} services. Find your city for an instant local cash offer and free towing.`,
  alternates: { canonical: `${SITE.url}/cash-for-cars` },
};

export default async function ServiceAreasIndex() {
  const cities = await loadCities();
  const byState = cities.reduce<Record<string, typeof cities>>((acc, c) => {
    (acc[c.state] ??= []).push(c);
    return acc;
  }, {});
  const states = Object.keys(byState).sort();

  return (
    <main>
      <section className="bg-ink-900 py-16 text-white">
        <div className="container-x">
          <p className="eyebrow mb-2 text-brand-500">Service areas</p>
          <h1 className="font-display text-4xl md:text-5xl">Cash For Cars — every U.S. city we service</h1>
          <p className="mt-3 max-w-2xl text-ink-300">
            {cities.length.toLocaleString()} cities and growing. Click your city for a local offer, local content, and free towing from our nearest yard.
          </p>
        </div>
      </section>

      <section className="container-x my-10">
        {states.map((st) => (
          <div key={st} className="mb-8">
            <h2 className="mb-3 font-display text-xl text-ink-900">{st}</h2>
            <ul className="flex flex-wrap gap-2">
              {byState[st]
                .sort((a, b) => (b.population ?? 0) - (a.population ?? 0))
                .map((c) => (
                  <li key={c.slug}>
                    <Link href={`/cash-for-cars/${c.slug}`} className="rounded-full bg-brand-50 px-3 py-1 text-sm text-brand-700 no-underline hover:bg-brand-100">
                      {c.city}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </section>
    </main>
  );
}
