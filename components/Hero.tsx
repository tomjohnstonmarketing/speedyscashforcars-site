import Link from "next/link";
import { SITE } from "@/lib/site";

export default function Hero({
  title,
  subtitle,
  ctaHref = "#quote",
}: {
  title?: string;
  subtitle?: string;
  ctaHref?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-ink-900 via-ink-900 to-ink-700 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(45,122,62,0.3),transparent_50%)]" aria-hidden />
      <div className="container-x relative grid gap-10 py-20 md:grid-cols-2 md:items-center md:py-28">
        <div>
          <p className="eyebrow text-brand-500 mb-3">{SITE.shortTagline}</p>
          <h1 className="font-display text-4xl leading-[1.05] md:text-6xl">
            {title ?? <>Get Paid Cash<br />For Your Car — Today.</>}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-7 text-ink-300">
            {subtitle ?? SITE.tagline}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={ctaHref} className="btn-primary">Get My Instant Offer</Link>
            <a href={`tel:${SITE.phone.replace(/[^\d+]/g, "")}`} className="btn-ghost">
              Call {SITE.phone}
            </a>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-3 text-sm text-ink-300 sm:max-w-md">
            {SITE.usps.slice(0, 4).map((u) => (
              <li key={u} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                <span>{u}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl bg-white p-6 text-ink-900 shadow-2xl md:p-8">
          <div className="flex items-center gap-2">
            <span className="rounded bg-brand-100 px-2 py-0.5 text-xs font-bold uppercase text-brand-700">Free quote</span>
            <span className="text-xs text-ink-500">Takes under 2 minutes</span>
          </div>
          <h3 className="mt-2 font-display text-2xl">Tell us about your car</h3>
          <p className="mt-1 text-sm text-ink-500">
            Get a real cash offer in minutes. No obligation, no hassle.
          </p>
          <div id="quote" className="mt-5">
            <QuotePreview />
          </div>
        </div>
      </div>
    </section>
  );
}

function QuotePreview() {
  return (
    <div className="rounded-xl border border-ink-300 bg-ink-900/[0.02] p-5">
      <p className="text-sm text-ink-700">
        Press <strong>Get My Offer</strong> anywhere on the site to open the full quote form, or call{" "}
        <a className="font-semibold text-brand-600 no-underline" href={`tel:${SITE.phone.replace(/[^\d+]/g, "")}`}>{SITE.phone}</a>.
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-ink-500">
        <div className="rounded bg-white p-2 ring-1 ring-ink-300">Year / Make / Model</div>
        <div className="rounded bg-white p-2 ring-1 ring-ink-300">Condition</div>
        <div className="rounded bg-white p-2 ring-1 ring-ink-300">Zip code</div>
        <div className="rounded bg-white p-2 ring-1 ring-ink-300">Phone</div>
      </div>
    </div>
  );
}
