export type Location = {
  slug: string;
  city: string;
  state: string;
  address: string;
  zip: string;
  phone: string;
  email?: string;
  hours?: string;
  lat?: number;
  lng?: number;
  services?: string[];
  mapEmbedUrl?: string;
  establishedYear?: number;
  reviewRating?: number;
  reviewCount?: number;
};

export type City = {
  city: string;
  state: string;
  slug: string;
  population?: number;
  county?: string;
  lat?: number;
  lng?: number;
  nearestLocationSlug?: string;
  nearestLocationMiles?: number;
};

export type LocationsData = {
  locations: Location[];
  generatedAt: string;
  source: "zoho" | "fallback";
};
