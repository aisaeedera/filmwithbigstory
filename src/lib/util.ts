import type { Locale } from "@/lib/i18n";

/** Replace {city} (and any other) tokens in a localized string. */
export function fill(s: string, vars: Record<string, string>): string {
  return s.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? `{${k}}`);
}

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

const N = new Intl.NumberFormat("en");
export function fmt(n: number, locale: Locale): string {
  return locale === "ar" ? new Intl.NumberFormat("ar-AE").format(n) : N.format(n);
}
