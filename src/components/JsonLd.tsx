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
    sameAs: [SITE.redDomain],
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

export function offerCatalogSchema(opts: {
  locale: Locale;
  name: string;
  path: string;
  categories: { name: string; offers: { name: string; price: number; from?: boolean }[] }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: opts.name,
    url: `${SITE.domain}${localizedPath(opts.locale, opts.path)}`,
    provider: { "@id": `${SITE.domain}/#organization` },
    itemListElement: opts.categories.map((cat) => ({
      "@type": "OfferCatalog",
      name: cat.name,
      itemListElement: cat.offers.map((o) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: o.name, provider: { "@id": `${SITE.domain}/#organization` } },
        priceSpecification: {
          "@type": "PriceSpecification",
          price: o.price,
          priceCurrency: "AED",
          ...(o.from ? { valueAddedTaxIncluded: false } : {}),
        },
        priceCurrency: "AED",
        availability: "https://schema.org/InStock",
      })),
    })),
  };
}

export function articleSchema(opts: {
  locale: Locale;
  headline: string;
  description: string;
  path: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
}) {
  const url = `${SITE.domain}${localizedPath(opts.locale, opts.path)}`;
  const trimmed = opts.description.length > 197 ? `${opts.description.slice(0, 195)}…` : opts.description;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: trimmed,
    inLanguage: opts.locale === "ar" ? "ar-AE" : "en-AE",
    mainEntityOfPage: url,
    url,
    image: opts.image ?? `${SITE.domain}/opengraph-image`,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    author: {
      "@type": "Organization",
      name: opts.authorName ?? SITE.name,
      url: SITE.domain,
    },
    publisher: { "@id": `${SITE.domain}/#organization` },
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

/* ----- E-E-A-T: Author / Person schema for Saeed Salim ----- */
export function personSchema(opts: { path?: string } = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE.domain}/about/saeed#person`,
    name: "Saeed Salim",
    givenName: "Saeed",
    familyName: "Salim",
    jobTitle: "Founder & Director of Photography",
    worksFor: { "@id": `${SITE.domain}/#organization` },
    url: `${SITE.domain}${opts.path ?? "/about/saeed"}`,
    sameAs: [],
    knowsAbout: [
      "Cinematography",
      "Film production",
      "Dubai film industry",
      "Brand films",
      "RED Komodo",
      "Cinema cameras",
      "UAE film permits",
      "Video production cost",
    ],
    alumniOf: [
      { "@type": "Organization", name: "Dubai Film and TV Commission (DFTC) registered production house" },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
  };
}

/* ----- E-E-A-T: Author profile for Article schema ----- */
export function authorReference() {
  return { "@id": `${SITE.domain}/about/saeed#person` };
}

/* ----- AI Citation: Dataset schema (for original data studies) ----- */
export function datasetSchema(opts: {
  locale: Locale;
  name: string;
  description: string;
  path: string;
  keywords?: string[];
  measurementTechnique?: string;
  temporalCoverage?: string;
  spatialCoverage?: string;
  variableMeasured?: string[];
  creator?: string;
}) {
  const url = `${SITE.domain}${localizedPath(opts.locale, opts.path)}`;
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${url}#dataset`,
    name: opts.name,
    description: opts.description,
    url,
    inLanguage: opts.locale === "ar" ? "ar-AE" : "en-AE",
    keywords: opts.keywords ?? [],
    creator: { "@id": `${SITE.domain}/#organization` },
    publisher: { "@id": `${SITE.domain}/#organization` },
    spatialCoverage: opts.spatialCoverage ?? "Dubai, United Arab Emirates",
    temporalCoverage: opts.temporalCoverage ?? "2023-01/2026-06",
    measurementTechnique: opts.measurementTechnique,
    variableMeasured: opts.variableMeasured ?? [],
    isAccessibleForFree: true,
    license: "https://creativecommons.org/licenses/by/4.0/",
  };
}

/* ----- AI Citation: Speakable schema (for FAQ / how-to pages) ----- */
export function speakableSchema(xpaths: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "SpeakableSpecification",
    xpath: xpaths,
  };
}
