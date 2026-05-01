import { SITE } from "@/lib/site";

export default function TrustBar() {
  return (
    <section className="border-y border-ink-300/50 bg-white">
      <div className="container-x grid gap-6 py-10 md:grid-cols-4">
        <Stat big="5 min" small="Average quote time" />
        <Stat big="Same day" small="Pickup in most service areas" />
        <Stat big="$0" small="Tow fees, ever" />
        <Stat big={(new Date().getFullYear() - SITE.foundingYear) + "+ yrs"} small="Buying cars across the U.S." />
      </div>
    </section>
  );
}

function Stat({ big, small }: { big: string; small: string }) {
  return (
    <div>
      <div className="font-display text-3xl text-ink-900">{big}</div>
      <div className="text-sm text-ink-500">{small}</div>
    </div>
  );
}
