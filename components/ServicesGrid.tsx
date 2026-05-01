import { SITE } from "@/lib/site";

export default function ServicesGrid({ heading = "We buy every kind of vehicle" }: { heading?: string }) {
  return (
    <section className="container-x my-20">
      <p className="eyebrow mb-2">Services</p>
      <h2 className="font-display text-3xl md:text-4xl">{heading}</h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SITE.services.map((s) => (
          <div key={s} className="rounded-xl border border-ink-300 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="mb-2 h-8 w-8 rounded-md bg-brand-100" />
            <h3 className="text-lg font-semibold">{s}</h3>
            <p className="mt-1 text-sm text-ink-500">
              Instant quotes for {s.toLowerCase()}. Free towing, cash on pickup, any condition.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
