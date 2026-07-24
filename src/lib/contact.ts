// Shared, pure contact-brief logic — no React, no server-only APIs.
// Single source of truth for the wizard chip options and for the server-side
// validation in `submitBrief`. Imported by the client wizard, the server action,
// and the node:test suite. Keep this file framework-free.

import type { Locale } from "@/lib/i18n";
import type { L } from "@/lib/i18n";

/* ------------------------------------------------------------------ */
/* Categorical option sets (labels unchanged from the legacy form)     */
/* ------------------------------------------------------------------ */

export const SERVICES: Record<Locale, readonly string[]> = {
  en: ["TVC & commercial", "Brand film", "Corporate video", "Product video", "Social content", "Event coverage", "Documentary", "Not sure yet"],
  ar: ["إعلان تلفزيوني", "فيلم تعريفي", "فيديو شركة", "فيديو منتج", "محتوى سوشيال", "تغطية فعالية", "فيلم وثائقي", "غير متأكد بعد"],
};

export const BUDGETS: Record<Locale, readonly string[]> = {
  en: ["Under AED 5,000", "AED 5,000 – 15,000", "AED 15,000 – 50,000", "AED 50,000 – 100,000", "AED 100,000+", "TBA / Not sure yet"],
  ar: ["أقل من 5,000 درهم", "5,000 – 15,000 درهم", "15,000 – 50,000 درهم", "50,000 – 100,000 درهم", "100,000 درهم فأكثر", "غير محدد بعد"],
};

export const TIMELINES: Record<Locale, readonly string[]> = {
  en: ["ASAP (under 1 week)", "1 – 2 weeks", "2 – 4 weeks", "1 – 2 months", "2 – 3 months", "3 – 6 months", "6 months+", "TBA / Flexible"],
  ar: ["في أسرع وقت (أقل من أسبوع)", "1 – 2 أسبوع", "2 – 4 أسابيع", "1 – 2 شهر", "2 – 3 أشهر", "3 – 6 أشهر", "6 أشهر فأكثر", "مرن / غير محدد"],
};

export const SOURCES: Record<Locale, readonly string[]> = {
  en: ["Google", "Instagram", "Facebook", "YouTube", "TikTok", "LinkedIn", "Referral", "Word of mouth", "Other"],
  ar: ["جوجل", "إنستغرام", "فيسبوك", "يوتيوب", "تيك توك", "لينكدإن", "توصية", "كلام متناقل", "أخرى"],
};

export type CategoryKey = "service" | "budget" | "timeline" | "source";

const CATEGORY_OPTIONS: Record<CategoryKey, Record<Locale, readonly string[]>> = {
  service: SERVICES,
  budget: BUDGETS,
  timeline: TIMELINES,
  source: SOURCES,
};

// Accept either the EN or the AR label for a category (users may switch locale
// or a translated FormData value may arrive).
const CATEGORY_ALLOWLIST: Record<CategoryKey, ReadonlySet<string>> = {
  service: new Set([...SERVICES.en, ...SERVICES.ar]),
  budget: new Set([...BUDGETS.en, ...BUDGETS.ar]),
  timeline: new Set([...TIMELINES.en, ...TIMELINES.ar]),
  source: new Set([...SOURCES.en, ...SOURCES.ar]),
};

export function isAllowedValue(category: CategoryKey, value: string): boolean {
  return CATEGORY_ALLOWLIST[category].has(value);
}

export function optionsFor(category: CategoryKey, locale: Locale): readonly string[] {
  return CATEGORY_OPTIONS[category][locale];
}

/* ------------------------------------------------------------------ */
/* Field limits                                                        */
/* ------------------------------------------------------------------ */

export const MAX = {
  name: 120,
  company: 120,
  message: 2000,
} as const;

/* ------------------------------------------------------------------ */
/* Email — keep the existing RFC-ish regex                             */
/* ------------------------------------------------------------------ */

export const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value);
}

/* ------------------------------------------------------------------ */
/* UAE mobile phone normalisation → E.164 (+9715XXXXXXXX)              */
/* ------------------------------------------------------------------ */

// Accepts: "+971 5X XXX XXXX", "9715X…", "009715X…", "05X XXX XXXX",
// "5X XXX XXXX". Returns E.164 "+9715XXXXXXXX" or null if not a valid
// UAE mobile number.
export function normalizeUaePhone(raw: string): string | null {
  if (!raw) return null;
  let s = raw.replace(/[\s\-().‎‏]/g, "");
  if (s.startsWith("00")) s = "+" + s.slice(2);
  const digits = s.startsWith("+") ? s.slice(1) : s;
  if (!/^\d+$/.test(digits)) return null;

  // 9715XXXXXXXX (country code + mobile) → 12 digits
  if (/^9715\d{8}$/.test(digits)) return "+" + digits;
  // 05XXXXXXXX (local trunk) → 10 digits
  if (/^05\d{8}$/.test(digits)) return "+971" + digits.slice(1);
  // 5XXXXXXXX (national significant number) → 9 digits
  if (/^5\d{8}$/.test(digits)) return "+971" + digits;
  return null;
}

/* ------------------------------------------------------------------ */
/* Brief validation — shared shape used by client + server             */
/* ------------------------------------------------------------------ */

export type BriefFieldError = "name" | "phone" | "email" | "service" | "budget" | "timeline";

export type BriefInput = {
  name?: string;
  phone?: string;
  email?: string;
  service?: string;
  budget?: string;
  timeline?: string;
  message?: string;
  company?: string;
  source?: string;
};

// Localised validation messages (must be provided by the caller so this file
// stays free of the copy layer). Callers pass a resolver keyed by error type.
export type ValidationMessages = {
  name: string;
  email: string;
  phone: string;
  required: string;
};

export type ValidationResult = {
  fieldErrors: Partial<Record<BriefFieldError, string>>;
  normalizedPhone?: string;
};

// Pure validation of the three step-3 contact fields plus the categorical
// selections. Returns per-field errors and (when valid) the normalised phone.
export function validateBrief(data: BriefInput, msg: ValidationMessages): ValidationResult {
  const fieldErrors: Partial<Record<BriefFieldError, string>> = {};

  const name = (data.name ?? "").trim();
  if (!name || name.length > MAX.name) {
    fieldErrors.name = msg.name;
  }

  const email = (data.email ?? "").trim();
  if (!email || !isValidEmail(email)) {
    fieldErrors.email = msg.email;
  }

  const phone = (data.phone ?? "").trim();
  const normalizedPhone = normalizeUaePhone(phone);
  if (!phone || !normalizedPhone) {
    fieldErrors.phone = msg.phone;
  }

  for (const cat of ["service", "budget", "timeline"] as const) {
    const v = (data[cat] ?? "").trim();
    if (!v || !isAllowedValue(cat, v)) {
      fieldErrors[cat] = msg.required;
    }
  }

  return { fieldErrors, normalizedPhone: normalizedPhone ?? undefined };
}

export function hasErrors(result: ValidationResult): boolean {
  return Object.keys(result.fieldErrors).length > 0;
}

// Re-export the bilingual value type for convenience in consumers.
export type { L };
