import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { localizedPath } from "@/lib/i18n";
import { serviceSlugs, guideSlugs } from "@/data/services";
import { locationSlugs } from "@/data/locations";
import { caseStudySlugs } from "@/data/work";

const LASTMOD = "2026-07-14";

type Entry = { path: string; priority: number; changefreq: MetadataRoute.Sitemap[number]["changeFrequency"] };

const staticPaths: Entry[] = [
  { path: "/", priority: 1.0, changefreq: "weekly" },
  { path: "/services", priority: 0.9, changefreq: "monthly" },
  { path: "/pricing", priority: 0.85, changefreq: "monthly" },
  { path: "/work", priority: 0.8, changefreq: "weekly" },
  { path: "/about", priority: 0.7, changefreq: "monthly" },
  { path: "/contact", priority: 0.9, changefreq: "monthly" },
  { path: "/service-areas", priority: 0.8, changefreq: "monthly" },
  { path: "/faqs", priority: 0.6, changefreq: "monthly" },
  { path: "/careers", priority: 0.5, changefreq: "monthly" },
  { path: "/privacy-policy", priority: 0.2, changefreq: "yearly" },
  { path: "/terms-conditions", priority: 0.2, changefreq: "yearly" },
  { path: "/photo-finder/amal-wedding-2026", priority: 0.2, changefreq: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: Entry[] = [
    ...staticPaths,
    ...serviceSlugs.map((s) => ({ path: `/services/${s}`, priority: 0.85, changefreq: "monthly" as const })),
    ...guideSlugs.map((s) => ({ path: `/services/${s}`, priority: 0.7, changefreq: "monthly" as const })),
    // Dedicated high-volume SEO pages (cinematography dubai = 22K vol)
    { path: "/services/cinematography-dubai", priority: 0.9, changefreq: "monthly" as const },
    // Standalone service pages (fixed 2026-07-15 — content used to be the cinematography-dubai placeholder)
    { path: "/services/weddings", priority: 0.9, changefreq: "monthly" as const },
    { path: "/services/live-streaming", priority: 0.85, changefreq: "monthly" as const },
    { path: "/services/video-production", priority: 0.85, changefreq: "monthly" as const },
    { path: "/services/photography-revamp", priority: 0.7, changefreq: "monthly" as const },
    // Wedding sub-pages (new 2026-07-15)
    { path: "/services/wedding-photography", priority: 0.85, changefreq: "monthly" as const },
    { path: "/services/wedding-videography", priority: 0.85, changefreq: "monthly" as const },
    { path: "/services/wedding-videography-dubai", priority: 0.9, changefreq: "monthly" as const },
    { path: "/services/wedding-photo-video", priority: 0.85, changefreq: "monthly" as const },
    { path: "/services/wedding-same-day-teaser", priority: 0.8, changefreq: "monthly" as const },
    { path: "/services/wedding-live-streaming", priority: 0.8, changefreq: "monthly" as const },
    { path: "/services/wedding-album-design", priority: 0.75, changefreq: "monthly" as const },
    { path: "/services/wedding-engagement-session", priority: 0.75, changefreq: "monthly" as const },
    // Dedicated SEO service pages (2026-07-15) — high-value search wedges
    { path: "/services/corporate-video-production-uae", priority: 0.9, changefreq: "monthly" as const },
    { path: "/services/tvc-production-dubai", priority: 0.9, changefreq: "monthly" as const },
    ...caseStudySlugs.map((s) => ({ path: `/work/${s}`, priority: 0.7, changefreq: "monthly" as const })),
    ...locationSlugs.map((s) => ({ path: `/locations/${s}`, priority: 0.75, changefreq: "monthly" as const })),
  ];

  return entries.map((e) => ({
    url: `${SITE.domain}${localizedPath("en", e.path)}`,
    lastModified: LASTMOD,
    changeFrequency: e.changefreq,
    priority: e.priority,
    alternates: {
      languages: {
        "en-AE": `${SITE.domain}${localizedPath("en", e.path)}`,
        "ar-AE": `${SITE.domain}${localizedPath("ar", e.path)}`,
      },
    },
  }));
}
