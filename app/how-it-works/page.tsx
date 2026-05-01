import type { Metadata } from "next";
import HowItWorks from "@/components/HowItWorks";
import QuoteCTA from "@/components/QuoteCTA";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "How It Works",
  description: `The ${SITE.name} process: get an offer, accept, get paid. Free towing, no surprises.`,
  alternates: { canonical: `${SITE.url}/how-it-works` },
};

export default function HowItWorksPage() {
  return (
    <main>
      <section className="bg-ink-900 py-16 text-white">
        <div className="container-x">
          <p className="eyebrow mb-2 text-brand-500">How it works</p>
          <h1 className="font-display text-4xl md:text-5xl">From quote to cash in under a day.</h1>
          <p className="mt-3 max-w-2xl text-ink-300">
            Three steps. No middlemen. No surprises. Here's exactly what selling a car to {SITE.name} looks like.
          </p>
        </div>
      </section>
      <HowItWorks heading="Three steps, no surprises" />
      <section className="container-x my-16">
        <h2 className="font-display text-2xl">What you'll need</h2>
        <ul className="mt-4 grid gap-3 text-ink-700 sm:grid-cols-2">
          <li>• Vehicle year, make, model, trim</li>
          <li>• General condition + mileage</li>
          <li>• Zip code for pickup</li>
          <li>• Title in your name (if you have it)</li>
          <li>• Photo ID at pickup</li>
          <li>• Your phone number</li>
        </ul>
      </section>
      <QuoteCTA />
    </main>
  );
}
