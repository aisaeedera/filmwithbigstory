import { services, type Service } from "@/data/services";
import { cities, type City } from "@/data/cities";

export type LocationPage = {
  slug: string; // {service}-{city}
  service: Service;
  city: City;
};

export const locationPages: LocationPage[] = services.flatMap((service) =>
  cities.map((city) => ({
    slug: `${service.slug}-${city.slug}`,
    service,
    city,
  }))
);

// Parse `{service.slug}-{city.slug}` where both may contain hyphens.
export function getLocation(slug: string): LocationPage | undefined {
  return locationPages.find((l) => l.slug === slug);
}

export const locationSlugs = locationPages.map((l) => l.slug);
