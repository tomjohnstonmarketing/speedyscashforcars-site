import type { City } from "./types";
import { distanceMiles } from "./geo";
import type { Location } from "./types";

export async function loadCities(): Promise<City[]> {
  const data = (await import("@/data/cities.json")).default as City[];
  return data;
}

export function attachNearestYards(cities: City[], locations: Location[]): City[] {
  const yards = locations.filter((l) => l.lat != null && l.lng != null);
  if (!yards.length) return cities;
  return cities.map((c) => {
    if (c.lat == null || c.lng == null) return c;
    let bestSlug = yards[0].slug;
    let bestMiles = distanceMiles(c.lat, c.lng, yards[0].lat!, yards[0].lng!);
    for (let i = 1; i < yards.length; i++) {
      const d = distanceMiles(c.lat, c.lng, yards[i].lat!, yards[i].lng!);
      if (d < bestMiles) { bestMiles = d; bestSlug = yards[i].slug; }
    }
    return { ...c, nearestLocationSlug: bestSlug, nearestLocationMiles: bestMiles };
  });
}

export function mergedCityUniverse(
  cities: City[],
  locations: Location[],
  radiusMiles = Number(process.env.SERVICE_AREA_RADIUS_MILES ?? 75),
): City[] {
  const withNearest = attachNearestYards(cities, locations);
  return withNearest.filter((c) =>
    !c.nearestLocationMiles || c.nearestLocationMiles <= Math.max(radiusMiles * 6, 500)
  ).reduce<City[]>((acc, c) => {
    if (!acc.find((x) => x.slug === c.slug)) acc.push(c);
    return acc;
  }, []);
}
