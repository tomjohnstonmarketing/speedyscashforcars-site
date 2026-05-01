import type { Location, LocationsData } from "./types";
import { citySlug } from "./slug";

export function parseCSV(text: string): Record<string, string>[] {
  const rows: string[][] = [];
  let cur = "";
  let row: string[] = [];
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"' && text[i + 1] === '"') { cur += '"'; i++; }
      else if (c === '"') { inQuotes = false; }
      else { cur += c; }
    } else {
      if (c === '"') { inQuotes = true; }
      else if (c === ",") { row.push(cur); cur = ""; }
      else if (c === "\n") { row.push(cur); cur = ""; rows.push(row); row = []; }
      else if (c === "\r") { /* skip */ }
      else { cur += c; }
    }
  }
  if (cur.length > 0 || row.length > 0) { row.push(cur); rows.push(row); }
  if (rows.length === 0) return [];
  const headers = rows[0].map((h) => h.trim());
  return rows.slice(1)
    .filter((r) => r.some((cell) => cell && cell.trim().length > 0))
    .map((r) => {
      const obj: Record<string, string> = {};
      headers.forEach((h, idx) => { obj[h] = (r[idx] ?? "").trim(); });
      return obj;
    });
}

function pick(row: Record<string, string>, keys: string[]): string {
  const lower: Record<string, string> = {};
  Object.entries(row).forEach(([k, v]) => { lower[k.toLowerCase().trim()] = v; });
  for (const k of keys) {
    const v = lower[k.toLowerCase()];
    if (v && v.length > 0) return v;
  }
  return "";
}

export function normalizeRow(row: Record<string, string>): Location | null {
  const city = pick(row, ["City", "City Name"]);
  const state = pick(row, ["State", "ST"]).toUpperCase().slice(0, 2);
  if (!city || !state) return null;
  const address = pick(row, ["Street", "Street Address", "Address", "Address1"]);
  const zip = pick(row, ["Zip", "Zip Code", "Postal Code", "Postcode"]);
  const phone = pick(row, ["Phone", "Phone Number", "Tel", "Telephone"]);
  const email = pick(row, ["Email", "E-mail"]);
  const hours = pick(row, ["Hours", "Business Hours", "Open Hours"]);
  const lat = parseFloat(pick(row, ["Latitude", "Lat"]));
  const lng = parseFloat(pick(row, ["Longitude", "Lng", "Long"]));
  const services = pick(row, ["Services", "Specialties"])
    .split(/[,;|]/).map((s) => s.trim()).filter(Boolean);
  const mapEmbedUrl = pick(row, ["Map Embed", "Map URL", "Google Maps"]);
  const establishedYear = parseInt(pick(row, ["Established", "Founded", "Year"]), 10);
  const reviewRating = parseFloat(pick(row, ["Rating", "Review Rating", "Stars"]));
  const reviewCount = parseInt(pick(row, ["Reviews", "Review Count"]), 10);

  return {
    slug: citySlug(city, state),
    city,
    state,
    address,
    zip,
    phone,
    email: email || undefined,
    hours: hours || undefined,
    lat: isFinite(lat) ? lat : undefined,
    lng: isFinite(lng) ? lng : undefined,
    services: services.length ? services : undefined,
    mapEmbedUrl: mapEmbedUrl || undefined,
    establishedYear: isFinite(establishedYear) ? establishedYear : undefined,
    reviewRating: isFinite(reviewRating) ? reviewRating : undefined,
    reviewCount: isFinite(reviewCount) ? reviewCount : undefined,
  };
}

export async function fetchZohoLocations(url: string): Promise<Location[]> {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Zoho fetch failed (${res.status}): ${res.statusText}`);
  const text = await res.text();
  const rows = parseCSV(text);
  const locations = rows.map(normalizeRow).filter((x): x is Location => !!x);
  const seen = new Set<string>();
  const deduped: Location[] = [];
  for (const loc of locations) {
    if (!seen.has(loc.slug)) { seen.add(loc.slug); deduped.push(loc); }
  }
  return deduped;
}

export async function loadLocationsData(): Promise<LocationsData> {
  const data = (await import("@/data/locations.json")).default as LocationsData;
  return data;
}
