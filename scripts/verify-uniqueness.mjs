#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";

function xmur3(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return function () {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return h >>> 0;
  };
}
function sfc32(a, b, c, d) {
  return function () {
    a |= 0; b |= 0; c |= 0; d |= 0;
    const t = (((a + b) | 0) + d) | 0;
    d = (d + 1) | 0;
    a = b ^ (b >>> 9);
    b = (c + (c << 3)) | 0;
    c = (c << 21) | (c >>> 11);
    c = (c + t) | 0;
    return (t >>> 0) / 4294967296;
  };
}
function seededRandom(seed) {
  const s = xmur3(seed);
  const rand = sfc32(s(), s(), s(), s());
  const pick = (arr) => arr[Math.floor(rand() * arr.length)];
  const shuffle = (arr) => {
    const c = arr.slice();
    for (let i = c.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [c[i], c[j]] = [c[j], c[i]];
    }
    return c;
  };
  return { pick, shuffle };
}

const TITLES = [
  "Cash for Cars in {CITY}, {STATE}",
  "{CITY} {STATE} Cash For Cars",
  "Sell Your Car in {CITY}, {STATE}",
  "We Buy Cars in {CITY}, {STATE}",
  "Cash For Junk Cars {CITY}, {STATE}",
];
const fill = (t, ctx) => t.replace(/\{([A-Z_]+)\}/g, (_, k) => ctx[k] ?? `{${k}}`);

function fp(city, state) {
  const rng = seededRandom(`${city}-${state}`.toLowerCase());
  return {
    title: fill(rng.pick(TITLES), { CITY: city, STATE: state }),
    order: rng.shuffle(["a", "b", "c", "d", "e"]).join(","),
  };
}

const ROOT = path.resolve(new URL("..", import.meta.url).pathname);
const cities = JSON.parse(await fs.readFile(path.join(ROOT, "data/cities.json"), "utf8"));
const fingerprints = cities.map((c) => ({ slug: c.slug, ...fp(c.city, c.state) }));

console.log(`Total cities: ${cities.length}`);
console.log(`Distinct titles: ${new Set(fingerprints.map((f) => f.title)).size}`);
console.log(`Distinct orderings: ${new Set(fingerprints.map((f) => f.order)).size}`);
