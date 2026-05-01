import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { loadLocationsData } from "@/lib/zoho";
import { loadCities } from "@/lib/cities";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [{ locations }, cities] = await Promise.all([
    loadLocationsData(),
    loadCities(),
  ]);
  const now = new Date().toISOString();

  const entries: MetadataRoute.Sitemap = [
    { url: `${SITE.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE.url}/locations`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE.url}/cash-for-cars`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE.url}/how-it-works`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE.url}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  for (const l of locations) {
    entries.push({
      url: `${SITE.url}/locations/${l.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    });
  }
  for (const c of cities) {
    entries.push({
      url: `${SITE.url}/cash-for-cars/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }
  return entries;
}
