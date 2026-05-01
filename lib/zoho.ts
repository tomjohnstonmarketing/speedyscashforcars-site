/**
 * Despite the filename, this module now fetches locations from Airtable.
 * Kept as `lib/zoho.ts` to avoid breaking imports across the app.
 *
 * Required env vars:
 *   AIRTABLE_TOKEN     — Personal Access Token (read scope, restricted to base)
 *   AIRTABLE_BASE_ID   — e.g. appXXXXXXXXXXXXXX
 *   AIRTABLE_TABLE_ID  — e.g. tblXXXXXXXXXXXXXX (the Locations table)
 *
 * Optional:
 *   AIRTABLE_VIEW_ID   — pin to a specific Airtable view if you want
 */
import type { Location, LocationsData } from "./types";
import { citySlug } from "./slug";

type AirtableRecord = {
  id: string;
  fields: Record<string, unknown>;
};

type AirtableListResponse = {
  records?: AirtableRecord[];
  offset?: string;
};

function airtableRecordToLocation(record: AirtableRecord): Location | null {
  const f = record.fields ?? {};
  const city = (f["City"] as string) || "";
  const state = ((f["State"] as string) || "").toUpperCase().slice(0, 2);
  if (!city || !state) return null;

  const phone = (f["Phone"] as string) || "";
  const email = (f["Email"] as string) || undefined;
  const street = (f["Street"] as string) || "";
  const zip = (f["Zip"] as string) || "";
  const hours = (f["Hours"] as string) || undefined;
  const mapEmbedUrl = (f["Map Embed URL"] as string) || undefined;

  const lat = typeof f["Latitude"] === "number" ? (f["Latitude"] as number) : undefined;
  const lng = typeof f["Longitude"] === "number" ? (f["Longitude"] as number) : undefined;
  const establishedYear = typeof f["Established Year"] === "number" ? (f["Established Year"] as number) : undefined;
  const reviewRating = typeof f["Rating"] === "number" ? (f["Rating"] as number) : undefined;
  const reviewCount = typeof f["Review Count"] === "number" ? (f["Review Count"] as number) : undefined;

  const services = Array.isArray(f["Services"]) ? (f["Services"] as string[]) : undefined;

  return {
    slug: citySlug(city, state),
    city,
    state,
    address: street,
    zip,
    phone,
    email,
    hours,
    lat,
    lng,
    services: services && services.length ? services : undefined,
    mapEmbedUrl,
    establishedYear,
    reviewRating,
    reviewCount,
  };
}

/**
 * Fetch all Active locations from the configured Airtable base.
 * Handles pagination automatically (Airtable returns up to 100 records per page).
 */
export async function fetchZohoLocations(): Promise<Location[]> {
  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableId = process.env.AIRTABLE_TABLE_ID;

  if (!token || !baseId || !tableId) {
    throw new Error(
      "Missing Airtable env vars. Set AIRTABLE_TOKEN, AIRTABLE_BASE_ID, AIRTABLE_TABLE_ID.",
    );
  }

  const base = `https://api.airtable.com/v0/${baseId}/${tableId}`;
  const params = new URLSearchParams({
    filterByFormula: "{Active}=TRUE()",
    pageSize: "100",
  });
  if (process.env.AIRTABLE_VIEW_ID) {
    params.set("view", process.env.AIRTABLE_VIEW_ID);
  }

  const all: Location[] = [];
  let offset: string | undefined;

  // Hard cap on pages so a misconfigured filter can't loop forever.
  for (let page = 0; page < 50; page++) {
    const url = offset
      ? `${base}?${params.toString()}&offset=${encodeURIComponent(offset)}`
      : `${base}?${params.toString()}`;

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`Airtable fetch failed (${res.status}): ${body}`);
    }

    const data = (await res.json()) as AirtableListResponse;
    for (const r of data.records ?? []) {
      const loc = airtableRecordToLocation(r);
      if (loc) all.push(loc);
    }
    offset = data.offset;
    if (!offset) break;
  }

  // Dedupe by slug; keep first occurrence
  const seen = new Set<string>();
  const deduped: Location[] = [];
  for (const loc of all) {
    if (!seen.has(loc.slug)) {
      seen.add(loc.slug);
      deduped.push(loc);
    }
  }
  return deduped;
}

/** Load the compiled locations JSON (used at build time by pages/sitemap). */
export async function loadLocationsData(): Promise<LocationsData> {
  const data = (await import("@/data/locations.json")).default as LocationsData;
  return data;
}
