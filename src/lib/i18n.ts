export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(x: string): x is Locale {
  return (locales as readonly string[]).includes(x);
}

export function dir(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

export function htmlLang(locale: Locale): string {
  return locale === "ar" ? "ar-AE" : "en-AE";
}

// Build a locale-aware href. English lives at the root; Arabic under /ar.
export function localizedPath(locale: Locale, path: string): string {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  if (locale === "ar") return `/ar${clean}` || "/ar";
  return clean || "/";
}

// hreflang alternates for a given clean path (no locale prefix)
export function alternates(path: string) {
  return {
    "en-AE": `${localizedPath("en", path)}`,
    "ar-AE": `${localizedPath("ar", path)}`,
    "x-default": `${localizedPath("en", path)}`,
  };
}

// Bilingual value helper
export type L<T = string> = Record<Locale, T>;
export function t<T>(value: L<T>, locale: Locale): T {
  return value[locale];
}
