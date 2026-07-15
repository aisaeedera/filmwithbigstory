import type { Locale } from "@/lib/i18n";
import { localizedPath, t } from "@/lib/i18n";
import { Section, Eyebrow, Button } from "@/components/primitives";

/**
 * Shared "We work all across the UAE" section.
 * Replaces city duplication across service pages with one UAE-wide block.
 * - Title: "We work all across the UAE"
 * - 1-line paragraph + list of 7 emirates + key cities
 * - CTA: See our services
 * - Renders bilingual via locale prop
 * - Plain grid list, no emojis, no marketing tone
 */
type EmiratesBlock = { emirate: string; cities: string };

const EMIRATES: EmiratesBlock[] = [
  {
    emirate: "Dubai",
    cities: "Downtown · Dubai Marina · Palm Jumeirah · Business Bay · DIFC · JLT · Dubai Media City",
  },
  {
    emirate: "Abu Dhabi",
    cities: "Yas Island · Saadiyat · ADGM · Corniche · Al Reem Island · twofour54",
  },
  {
    emirate: "Sharjah",
    cities: "Al Majaz · Al Qasba · Heritage Area · Kalba · Khorfakkan",
  },
  {
    emirate: "Ajman",
    cities: "Corniche · Al Jurf · Ajman Free Zone",
  },
  {
    emirate: "Umm Al Quwain",
    cities: "UAQ Free Trade Zone · coastal areas",
  },
  {
    emirate: "Ras Al Khaimah",
    cities: "Jebel Jais · Al Hamra · RAK City",
  },
  {
    emirate: "Fujairah",
    cities: "Fujairah City coast · Hajar mountains",
  },
  {
    emirate: "Al Ain (Abu Dhabi)",
    cities: "Al Ain Oasis · Jebel Hafeet · heritage forts",
  },
];

const COPY = {
  eyebrow: { en: "Coverage", ar: "نطاق العمل" },
  h2: { en: "We work all across the UAE", ar: "نعمل في جميع أنحاء الإمارات" },
  lead: {
    en: "We bring our crew and kit to any location across the UAE — Dubai-based, travel-ready.",
    ar: "نحضر طاقمنا ومعداتنا إلى أي موقع في الإمارات — مقرنا دبي ومستعدون للسفر.",
  },
  cta: { en: "See our services", ar: "استعرض خدماتنا" },
};

export default function UaeTravelSection({ locale }: { locale: Locale }) {
  const isAr = locale === "ar";
  return (
    <Section alt>
      <div className="mx-auto max-w-3xl">
        <Eyebrow>{t(COPY.eyebrow, locale)}</Eyebrow>
        <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">{t(COPY.h2, locale)}</h2>
        <p className="bs-lead mt-6">{t(COPY.lead, locale)}</p>
      </div>
      <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-[color:var(--color-line)] sm:grid-cols-2">
        {EMIRATES.map((row) => (
          <div
            key={row.emirate}
            className="bs-card !rounded-none flex flex-col gap-2 bg-white p-6"
          >
            <p className="text-base font-medium text-[color:var(--color-ink)]">
              {isAr ? toArEmirate(row.emirate) : row.emirate}
            </p>
            <p className="text-sm leading-relaxed text-[color:var(--color-muted)]">
              {isAr ? toArCities(row.cities) : row.cities}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <Button href={localizedPath(locale, "/services")} variant="ghost">
          {t(COPY.cta, locale)}
        </Button>
      </div>
    </Section>
  );
}

/* ---------- minimal AR translations for the static list ---------- */
function toArEmirate(en: string): string {
  const map: Record<string, string> = {
    Dubai: "دبي",
    "Abu Dhabi": "أبوظبي",
    Sharjah: "الشارقة",
    Ajman: "عجمان",
    "Umm Al Quwain": "أم القيوين",
    "Ras Al Khaimah": "رأس الخيمة",
    Fujairah: "الفجيرة",
    "Al Ain (Abu Dhabi)": "العين (أبوظبي)",
  };
  return map[en] ?? en;
}

function toArCities(en: string): string {
  // Per-city mapping. Falls back to English when no Arabic term is loaded.
  const dict: Record<string, string> = {
    "Downtown": "داون تاون",
    "Dubai Marina": "دبي مارينا",
    "Palm Jumeirah": "نخلة جميرا",
    "Business Bay": "الخليج التجاري",
    "DIFC": "مركز دبي المالي العالمي",
    "JLT": "أبراج بحيرات جميرا",
    "Dubai Media City": "مدينة دبي للإعلام",
    "Yas Island": "جزيرة ياس",
    "Saadiyat": "السعديات",
    "ADGM": "سوق أبوظبي العالمي",
    "Corniche": "الكورنيش",
    "Al Reem Island": "جزيرة الريم",
    "twofour54": "توفور54",
    "Al Majaz": "المجاز",
    "Al Qasba": "القصباء",
    "Heritage Area": "المنطقة التراثية",
    "Kalba": "كلباء",
    "Khorfakkan": "خورفكان",
    "Al Jurf": "الجرف",
    "Ajman Free Zone": "المنطقة الحرة بعجمان",
    "UAQ Free Trade Zone": "المنطقة الحرة بأم القيوين",
    "coastal areas": "المناطق الساحلية",
    "Jebel Jais": "جبل جيس",
    "Al Hamra": "الحمرا",
    "RAK City": "مدينة رأس الخيمة",
    "Fujairah City coast": "ساحل مدينة الفجيرة",
    "Hajar mountains": "جبال حجر",
    "Al Ain Oasis": "واحة العين",
    "Jebel Hafeet": "جبل حفيت",
    "heritage forts": "الحصون التراثية",
  };
  // Split on " · " and translate each piece.
  return en
    .split(" · ")
    .map((piece) => dict[piece.trim()] ?? piece.trim())
    .join(" · ");
}