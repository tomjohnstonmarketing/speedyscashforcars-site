import Link from "next/link";
import { SITE } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-ink-300/60 bg-ink-900 text-ink-300">
      <div className="container-x grid gap-10 py-12 md:grid-cols-4">
        <div>
          <div className="mb-2">
            <img src="/logo-dark.svg" alt={SITE.name} className="h-14 w-auto" />
          </div>
          <p className="text-sm leading-6">{SITE.tagline}</p>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold text-white">Get In Touch</h3>
          <ul className="space-y-2 text-sm">
            <li><a className="hover:text-white no-underline" href={`tel:${SITE.phone.replace(/[^\d+]/g, "")}`}>{SITE.phone}</a></li>
            <li><a className="hover:text-white no-underline" href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            <li><Link className="hover:text-white no-underline" href="/#quote">Get an instant offer</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold text-white">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><Link className="hover:text-white no-underline" href="/about">About Us</Link></li>
            <li><Link className="hover:text-white no-underline" href="/how-it-works">How It Works</Link></li>
            <li><Link className="hover:text-white no-underline" href="/locations">All Locations</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold text-white">Popular Service Areas</h3>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            <li><Link className="hover:text-white no-underline" href="/cash-for-cars/dallas-tx">Dallas, TX</Link></li>
            <li><Link className="hover:text-white no-underline" href="/cash-for-cars/phoenix-az">Phoenix, AZ</Link></li>
            <li><Link className="hover:text-white no-underline" href="/cash-for-cars/atlanta-ga">Atlanta, GA</Link></li>
            <li><Link className="hover:text-white no-underline" href="/cash-for-cars/houston-tx">Houston, TX</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-700/50 py-4 text-center text-xs">
        © {year} {SITE.name}. All rights reserved.
      </div>
    </footer>
  );
}
