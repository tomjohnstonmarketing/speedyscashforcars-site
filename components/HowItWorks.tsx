const steps = [
  { n: "1", title: "Tell us about your car", body: "Year, make, model, condition, and zip. Takes under two minutes." },
  { n: "2", title: "Accept your cash offer", body: "We come back with a firm offer — usually within minutes. Zero pressure." },
  { n: "3", title: "Free pickup, paid on the spot", body: "Our driver tows it free, hands you cash or check, and you're done." },
];

export default function HowItWorks({ heading = "How Speedy's works" }: { heading?: string }) {
  return (
    <section className="bg-ink-900/[0.02]">
      <div className="container-x py-16">
        <p className="eyebrow mb-2">How it works</p>
        <h2 className="font-display text-3xl md:text-4xl">{heading}</h2>
        <ol className="mt-8 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-ink-300">
              <div className="mb-3 grid h-10 w-10 place-items-center rounded-full bg-brand-500 text-lg font-bold text-white">
                {s.n}
              </div>
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-ink-500">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
