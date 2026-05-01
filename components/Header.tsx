import Link from "next/link";
import { SITE } from "@/lib/site";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-ink-300/60 bg-white/90 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 no-underline">
          <img src="/logo.svg" alt={SITE.name} className="h-12 w-auto" />
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link className="text-sm font-medium text-ink-700 hover:text-brand-600 no-underline" href="/locations">Locations</Link>
          <Link className="text-sm font-medium text-ink-700 hover:text-brand-600 no-underline" href="/how-it-works">How It Works</Link>
          <Link className="text-sm font-medium text-ink-700 hover:text-brand-600 no-underline" href="/about">About</Link>
        </nav>
        <div className="flex items-center gap-2">
          <a href={`tel:${SITE.phone.replace(/[^\d+]/g, "")}`} className="hidden text-sm font-semibold text-ink-900 sm:inline no-underline">{SITE.phone}</a>
          <Link href="/#quote" className="btn-primary text-sm">Get My Offer</Link>
        </div>
      </div>
    </header>
  );
}
