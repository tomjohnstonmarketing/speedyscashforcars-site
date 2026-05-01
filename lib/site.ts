export const SITE = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? "Speedy's Cash For Cars",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://speedyscashforcars.com",
  phone: process.env.NEXT_PUBLIC_PHONE ?? "+1 (888) 712-7237",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "quote@speedyscashforcars.com",
  tagline: "Top dollar for cars in any condition — paid on the spot, picked up for free.",
  shortTagline: "Fast cash. Free towing. Any condition.",
  description:
    "Speedy's Cash For Cars buys running, non-running, junk, wrecked, and unwanted vehicles for top dollar. Free same-day towing, instant cash offers, and friendly local buyers across the U.S.",
  foundingYear: 2008,
  usps: [
    "Free same-day towing",
    "Cash or check paid on the spot",
    "Licensed & insured buyers",
    "Any make, any model, any condition",
    "No title? We can still help in most states",
  ],
  services: [
    "Junk Cars",
    "Used Cars",
    "Wrecked Cars",
    "Non-Running Cars",
    "Trucks & SUVs",
    "Vans",
    "Motorcycles",
    "Fleet Vehicles",
  ],
  contactFormEmbed:
    '<div style="padding:2rem;text-align:center;color:#6b7280;border:2px dashed #cbd5e1;border-radius:0.75rem;">TODO: Paste the Speedy\'s quote-request form embed code into lib/site.ts ("contactFormEmbed" field) — iframe/script from Jotform, HubSpot, Zoho Forms, etc.</div>',
};

export type SiteConfig = typeof SITE;
