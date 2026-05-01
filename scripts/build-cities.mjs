#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? "1"];
  }),
);

const LIMIT = parseInt(args.limit ?? "2000", 10);
const ROOT = path.resolve(new URL("..", import.meta.url).pathname);
const INPUT = path.resolve(ROOT, args.input ?? "data/uscities.csv");
const OUTPUT = path.resolve(ROOT, args.output ?? "data/cities.json");
const INCLUDE_NEAR = args["include-small-near-yards"] === "1";
const RADIUS_MILES = parseInt(process.env.SERVICE_AREA_RADIUS_MILES ?? "75", 10);

function parseCSV(text) {
  const rows = [];
  let cur = "", row = [], q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') { cur += '"'; i++; }
      else if (c === '"') q = false;
      else cur += c;
    } else {
      if (c === '"') q = true;
      else if (c === ",") { row.push(cur); cur = ""; }
      else if (c === "\n") { row.push(cur); cur = ""; rows.push(row); row = []; }
      else if (c !== "\r") cur += c;
    }
  }
  if (cur || row.length) { row.push(cur); rows.push(row); }
  const headers = rows[0];
  return rows.slice(1).filter((r) => r.length > 1)
    .map((r) => Object.fromEntries(headers.map((h, i) => [h, r[i] ?? ""])));
}

function distanceMiles(aLat, aLng, bLat, bLng) {
  const R = 3958.7613, toRad = (x) => (x * Math.PI) / 180;
  const dLat = toRad(bLat - aLat), dLng = toRad(bLng - aLng);
  const s1 = Math.sin(dLat / 2), s2 = Math.sin(dLng / 2);
  const a = s1 * s1 + Math.cos(toRad(aLat)) * Math.cos(toRad(bLat)) * s2 * s2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(a)));
}

function slugify(s) {
  return s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

const raw = await fs.readFile(INPUT, "utf8").catch(() => null);
if (!raw) {
  console.error(`Could not read ${INPUT}.`);
  console.error("Download SimpleMaps' US Cities CSV from https://simplemaps.com/data/us-cities and place at data/uscities.csv");
  process.exit(1);
}
const rows = parseCSV(raw);
console.log(`Read ${rows.length} city rows from ${INPUT}`);

const all = rows
  .map((r) => ({
    city: r.city_ascii || r.city,
    state: (r.state_id || "").toUpperCase(),
    county: r.county_name || undefined,
    lat: parseFloat(r.lat),
    lng: parseFloat(r.lng),
    population: parseInt(r.population || "0", 10),
  }))
  .filter((c) => c.city && c.state && Number.isFinite(c.lat) && Number.isFinite(c.lng));

const seen = new Set();
const cleaned = [];
for (const c of all) {
  const key = `${c.city}|${c.state}`;
  if (seen.has(key)) continue;
  seen.add(key);
  cleaned.push(c);
}

cleaned.sort((a, b) => (b.population || 0) - (a.population || 0));
let top = cleaned.slice(0, LIMIT);

if (INCLUDE_NEAR) {
  const locPath = path.join(ROOT, "data", "locations.json");
  try {
    const { locations } = JSON.parse(await fs.readFile(locPath, "utf8"));
    const topKeys = new Set(top.map((c) => `${c.city}|${c.state}`));
    const yards = locations.filter((l) => Number.isFinite(l.lat) && Number.isFinite(l.lng));
    for (const c of cleaned) {
      if (topKeys.has(`${c.city}|${c.state}`)) continue;
      for (const y of yards) {
        if (distanceMiles(c.lat, c.lng, y.lat, y.lng) <= RADIUS_MILES) {
          top.push(c);
          topKeys.add(`${c.city}|${c.state}`);
          break;
        }
      }
    }
    console.log(`After including near-yard additions: ${top.length} cities`);
  } catch {
    console.warn("Could not read data/locations.json; skipping near-yard inclusion.");
  }
}

const out = top.map((c) => ({
  city: c.city,
  state: c.state,
  slug: `${slugify(c.city)}-${c.state.toLowerCase()}`,
  population: c.population,
  county: c.county,
  lat: c.lat,
  lng: c.lng,
}));

await fs.writeFile(OUTPUT, JSON.stringify(out, null, 2));
console.log(`Wrote ${out.length} cities to ${OUTPUT}`);
