import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { localizedPath, type Locale } from "@/lib/i18n";

export function pageMeta(opts: {
  locale: Locale;
  title: string;
  description: string;
  /** clean path without locale prefix, e.g. "/about" */
  path: string;
  noindex?: boolean;
}): Metadata {
  const { locale, title, description, path, noindex } = opts;
  const canonical = localizedPath(locale, path);
  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        "en-AE": localizedPath("en", path),
        "ar-AE": localizedPath("ar", path),
        "x-default": localizedPath("en", path),
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE.domain}${canonical}`,
      siteName: SITE.name,
      locale: locale === "ar" ? "ar_AE" : "en_AE",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}
