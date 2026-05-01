import type { Metadata } from "next";
import QuoteCTA from "@/components/QuoteCTA";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${SITE.name} — a nationwide cash-for-cars buyer known for fair offers, free towing, and same-day pickups.`,
  alternates: { canonical: `${SITE.url}/about` },
};

export default function AboutPage() {
  return (
    <main>
      <section className="bg-ink-900 py-16 text-white">
        <div className="container-x">
          <p className="eyebrow mb-2 text-brand-500">About</p>
          <h1 className="font-display text-4xl md:text-5xl">We pay cash. We tow free. We keep our word.</h1>
          <p className="mt-3 max-w-2xl text-ink-300">
            Since {SITE.foundingYear}, {SITE.name} has been buying vehicles from drivers across the U.S. — running or not, title or no title, junk or clean.
          </p>
        </div>
      </section>
      <section className="container-x my-12 grid gap-10 md:grid-cols-2">
        <div className="prose max-w-none text-ink-700">
          <p className="leading-7">
            Speedy's Cash For Cars was founded on a simple premise: selling a used or junk car should be straightforward. No lowball offers that drop at pickup. No surprise tow fees. No ghosting.
          </p>
          <p className="mt-4 leading-7">
            We operate yards across the country, with a local driver network that services every major metro and thousands of smaller communities in between. When you accept an offer from Speedy's, a real human shows up — often the same day — hands you cash or a check, and handles the paperwork.
          </p>
          <p className="mt-4 leading-7">
            We're licensed and insured in every state we operate in, and our online reviews speak for themselves. If you've got a car you want gone, we've got a fair offer and a flatbed ready.
          </p>
        </div>
        <div className="rounded-2xl bg-ink-900/[0.02] p-6">
          <h2 className="font-display text-2xl">Our promise</h2>
          <ul className="mt-4 space-y-2 text-ink-700">
            {SITE.usps.map((u) => (
              <li key={u} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-500" />
                <span>{u}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <QuoteCTA />
    </main>
  );
}
