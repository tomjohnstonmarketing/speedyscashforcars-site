#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";

const url = process.env.ZOHO_LOCATIONS_CSV_URL;
if (!url) {
  console.error("ZOHO_LOCATIONS_CSV_URL is not set.");
  process.exit(1);
}

const PROJECT_ROOT = path.resolve(new URL("..", import.meta.url).pathname);

function parseCSV(text) {
  const rows = [];
  let cur = "", row = [], inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"' && text[i + 1] === '"') { cur += '"'; i++; }
      else if (c === '"') inQuotes = false;
      else cur += c;
    } else {
      if (c === '"') inQuotes = true;
      else if (c === ",") { row.push(cur); cur = ""; }
      else if (c === "\n") { row.push(cur); cur = ""; rows.push(row); row = []; }
      else if (c !== "\r") cur += c;
    }
  }
  if (cur || row.length) { row.push(cur); rows.push(row); }
  if (!rows.length) return [];
  const headers = rows[0].map((h) => h.trim());
  return rows.slice(1)
    .filter((r) => r.some((c) => c && c.trim()))
    .map((r) => Object.fromEntries(headers.map((h, i) => [h, (r[i] ?? "").trim()])));
}

function slugify(s) {
  return s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function pick(row, keys) {
  const lower = Object.fromEntries(Object.entries(row).map(([k, v]) => [k.toLowerCase().trim(), v]));
  for (const k of keys) if (lower[k.toLowerCase()]?.length) return lower[k.toLowerCase()];
  return "";
}

function normalize(row) {
  const city = pick(row, ["City", "City Name"]);
  const state = pick(row, ["State", "ST"]).toUpperCase().slice(0, 2);
  if (!city || !state) return null;
  const lat = parseFloat(pick(row, ["Latitude", "Lat"]));
  const lng = parseFloat(pick(row, ["Longitude", "Lng", "Long"]));
  const rating = parseFloat(pick(row, ["Rating", "Review Rating", "Stars"]));
  const reviewCount = parseInt(pick(row, ["Reviews", "Review Count"]), 10);
  const estYear = parseInt(pick(row, ["Established", "Founded", "Year"]), 10);
  return {
    slug: `${slugify(city)}-${state.toLowerCase()}`,
    city, state,
    address: pick(row, ["Street", "Street Address", "Address", "Address1"]),
    zip: pick(row, ["Zip", "Zip Code", "Postal Code", "Postcode"]),
    phone: pick(row, ["Phone", "Phone Number", "Tel", "Telephone"]),
    email: pick(row, ["Email", "E-mail"]) || undefined,
    hours: pick(row, ["Hours", "Business Hours", "Open Hours"]) || undefined,
    lat: Number.isFinite(lat) ? lat : undefined,
    lng: Number.isFinite(lng) ? lng : undefined,
    services: (() => {
      const arr = pick(row, ["Services", "Specialties"]).split(/[,;|]/).map((x) => x.trim()).filter(Boolean);
      return arr.length ? arr : undefined;
    })(),
    mapEmbedUrl: pick(row, ["Map Embed", "Map URL", "Google Maps"]) || undefined,
    establishedYear: Number.isFinite(estYear) ? estYear : undefined,
    reviewRating: Number.isFinite(rating) ? rating : undefined,
    reviewCount: Number.isFinite(reviewCount) ? reviewCount : undefined,
  };
}

const res = await fetch(url);
if (!res.ok) {
  console.error(`Zoho fetch failed: ${res.status} ${res.statusText}`);
  process.exit(1);
}
const csv = await res.text();
const rows = parseCSV(csv);
const locations = rows.map(normalize).filter(Boolean);
const seen = new Set();
const deduped = [];
for (const l of locations) { if (!seen.has(l.slug)) { seen.add(l.slug); deduped.push(l); } }

const payload = {
  source: "zoho",
  generatedAt: new Date().toISOString(),
  locations: deduped,
};

const outPath = path.join(PROJECT_ROOT, "data", "locations.json");
await fs.writeFile(outPath, JSON.stringify(payload, null, 2));
console.log(`Wrote ${deduped.length} locations to ${outPath}`);
