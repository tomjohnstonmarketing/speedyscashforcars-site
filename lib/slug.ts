export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function citySlug(city: string, state: string): string {
  return `${slugify(city)}-${state.toLowerCase()}`;
}

export function parseCitySlug(slug: string): { city: string; state: string } | null {
  const m = slug.match(/^(.*)-([a-z]{2})$/);
  if (!m) return null;
  const city = m[1].replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const state = m[2].toUpperCase();
  return { city, state };
}
