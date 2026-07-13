import { SITE } from "@/lib/site";
import type { Locale } from "@/lib/i18n";
import { localizedPath } from "@/lib/i18n";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function JsonLd({ data }: { data: Record<string, any> | Record<string, any>[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD is trusted, server-generated content
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.domain}/#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.domain,
    logo: `${SITE.domain}/icon.svg`,
    image: `${SITE.domain}/opengraph-image`,
    email: SITE.email,
    telephone: SITE.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    areaServed: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Al Ain", "United Arab Emirates"],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE.phoneRaw,
      contactType: "sales",
      areaServed: "AE",
      availableLanguage: ["en", "ar"],
    },
    sameAs: [
      SITE.social.instagram,
      SITE.social.linkedin,
      SITE.social.tiktok,
      SITE.redDomain,
    ],
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": `${SITE.domain}/#localbusiness`,
    name: SITE.name,
    url: SITE.domain,
    image: `${SITE.domain}/opengraph-image`,
    telephone: SITE.phone,
    email: SITE.email,
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    areaServed: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Al Ain"],
    sameAs: [SITE.social.instagram, SITE.social.linkedin, SITE.social.tiktok],
  };
}

export function websiteSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.domain}/#website`,
    url: SITE.domain,
    name: SITE.name,
    inLanguage: locale === "ar" ? "ar-AE" : "en-AE",
    publisher: { "@id": `${SITE.domain}/#organization` },
  };
}

export function breadcrumbSchema(locale: Locale, items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE.domain}${localizedPath(locale, it.path)}`,
    })),
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

export function serviceSchema(opts: {
  locale: Locale;
  name: string;
  description: string;
  path: string;
  areaServed: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: opts.name,
    name: opts.name,
    description: opts.description,
    url: `${SITE.domain}${localizedPath(opts.locale, opts.path)}`,
    provider: { "@id": `${SITE.domain}/#organization` },
    areaServed: opts.areaServed.map((a) => ({ "@type": "City", name: a })),
    availableLanguage: ["en", "ar"],
  };
}
