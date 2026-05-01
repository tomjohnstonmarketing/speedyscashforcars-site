import Link from "next/link";
import { SITE } from "@/lib/site";

export default function QuoteCTA({
  city,
  compact = false,
}: {
  city?: string;
  compact?: boolean;
}) {
  const phoneDigits = SITE.phone.replace(/[^\d+]/g, "");
  if (compact) {
    return (
      <div className="flex flex-wrap items-center gap-3 rounded-xl bg-brand-50 p-4 ring-1 ring-brand-100">
        <span className="font-semibold text-ink-900">
          Ready to sell{city ? ` in ${city}` : ""}?
        </span>
        <Link href="#quote" className="btn-primary">Get My Offer</Link>
        <a href={`tel:${phoneDigits}`} className="btn-ghost">Call {SITE.phone}</a>
      </div>
    );
  }
  return (
    <section className="container-x my-16 rounded-2xl bg-brand-500 px-6 py-12 text-center text-white shadow-xl md:px-12">
      <p className="eyebrow mb-2 text-white/90">Free • Fast • No obligation</p>
      <h2 className="font-display text-3xl md:text-4xl">
        Get cash for your car{city ? ` in ${city}` : ""} today.
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-white/90">
        Call us, or grab an instant offer online. Most sellers are paid and picked up the same day.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="#quote" className="btn-secondary">Get My Instant Offer</Link>
        <a href={`tel:${phoneDigits}`} className="btn-ghost">{SITE.phone}</a>
      </div>
    </section>
  );
}
