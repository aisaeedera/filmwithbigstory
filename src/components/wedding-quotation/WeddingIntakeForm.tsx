"use client";

/**
 * Wedding intake form — four-step, one question per screen.
 * Collects event details before the quotation wizard.
 * Passes data to WeddingQuotationWizard on completion.
 */

import { useState, useCallback, useRef, useEffect } from "react";
import type { Locale } from "@/lib/i18n";

export interface WeddingIntakeData {
  eventDate: string;
  venue: string;
  venuePlaceId?: string;
  quotingFor: string;
  celebrationType: string;
  katbSetting?: string;
}

const QUOTING_FOR = [
  { en: "I am the groom", ar: "أنا العريس", icon: "🤵" },
  { en: "I am the bride", ar: "أنا العروس", icon: "👰" },
  { en: "Family of the groom", ar: "عائلة العريس", icon: "👨‍👩‍👦" },
  { en: "Family of the bride", ar: "عائلة العروس", icon: "👨‍👩‍👧" },
  { en: "Wedding planner", ar: "منظم أفراح", icon: "📋" },
  { en: "Other", ar: "أخرى", icon: "💬" },
];

const CELEBRATION_TYPES = [
  {
    en: "Groom wedding",
    ar: "عريس",
    keywords: {
      en: "Male crew · Groom preparation · Bisht & kandura · Male hall coverage · Multi-camera · Highlight film",
      ar: "طاقم رجالي · تحضير العريس · بشت وكندورة · تغطية قاعة الرجال · كاميرات متعددة · فيلم ملخص",
    },
    value: "groom-wedding",
  },
  {
    en: "Bride wedding",
    ar: "عروس",
    keywords: {
      en: "Tailored planning — Request specialist crew availability · Female crew · Bride preparation · Dress & makeup · Female hall coverage",
      ar: "تخطيط مخصص — اطلب التحقق من توفر الطاقم المتخصص · طاقم نسائي · تحضير العروس · فستان ومكياج · تغطية قاعة النساء",
    },
    value: "bride-wedding",
  },
  {
    en: "Katb Kitab / Aqd Al Qiran",
    ar: "كتب الكتاب / عقد القران",
    keywords: {
      en: "Tailored planning — Request specialist crew availability · Islamic marriage contract · Male/female/both-section coverage",
      ar: "تخطيط مخصص — اطلب التحقق من توفر الطاقم المتخصص · عقد القران · تغطية قسم الرجال/النساء/كلاهما",
    },
    value: "katb-kitab",
    hasSubOptions: true,
  },
  {
    en: "Engagement ceremony",
    ar: "خطوبة",
    keywords: {
      en: "Tailored planning — Request specialist crew availability · Ring exchange · Celebration coverage",
      ar: "تخطيط مخصص — اطلب التحقق من توفر الطاقم المتخصص · تبادل الخواتم · تغطية الاحتفال",
    },
    value: "engagement",
  },
  {
    en: "Other",
    ar: "أخرى",
    keywords: {
      en: "Tailored planning — Request specialist crew availability · Henna night · Milka · Custom celebration",
      ar: "تخطيط مخصص — اطلب التحقق من توفر الطاقم المتخصص · ليلة الحناء · ملكة · احتفال مخصص",
    },
    value: "other",
  },
];

const KATB_SETTINGS = [
  { en: "Male section only", ar: "قسم الرجال فقط", value: "male" },
  { en: "Female section only", ar: "قسم النساء فقط", value: "female" },
  { en: "Both sections", ar: "كلا القسمين", value: "both" },
];

function label(en: string, ar: string, locale: Locale): string {
  return locale === "ar" ? ar : en;
}

/** Log venue search to our API for building the venue database */
async function logVenueSearch(venue: string, placeId: string, celebrationType: string) {
  try {
    await fetch("/api/venue-search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        venue,
        placeId,
        celebrationType,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch {
    // Silent fail
  }
}

/** Load Google Maps script and return a promise */
function loadGoogleMapsScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return reject(new Error("No window"));
    if (window.google?.maps?.places) return resolve();

    const existing = document.getElementById("google-maps-script") as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Script load failed")));
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) return reject(new Error("No API key"));

    const script = document.createElement("script");
    script.id = "google-maps-script";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.addEventListener("load", () => resolve());
    script.addEventListener("error", () => reject(new Error("Script load failed")));
    document.head.appendChild(script);
  });
}

function VenueAutocomplete({
  locale,
  value,
  onSelect,
}: {
  locale: Locale;
  value: string;
  onSelect: (venue: string, placeId: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const onSelectRef = useRef(onSelect);
  const initRef = useRef(false);

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  useEffect(() => {
    if (!inputRef.current || initRef.current) return;

    let cancelled = false;

    async function init() {
      try {
        await loadGoogleMapsScript();
        if (cancelled || !inputRef.current || !window.google?.maps?.places) return;

        const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
          types: ["establishment"],
          fields: ["name", "place_id", "formatted_address", "address_components"],
          componentRestrictions: { country: ["ae", "sa", "om", "bh", "qa", "kw"] },
        });

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          if (place.name) {
            const display = place.formatted_address
              ? `${place.name}, ${place.formatted_address}`
              : place.name;
            onSelectRef.current(display, place.place_id || "");
          }
        });

        initRef.current = true;
      } catch (err) {
        console.error("Google Maps autocomplete init failed:", err);
      }
    }

    init();

    return () => {
      cancelled = true;
    };
  }, []); // Run once on mount

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        defaultValue={value}
        placeholder={label("Search venue name...", "ابحث عن اسم المكان...", locale)}
        className="bs-input w-full"
        autoComplete="off"
      />
    </div>
  );
}

export default function WeddingIntakeForm({
  locale,
  onComplete,
}: {
  locale: Locale;
  onComplete: (data: WeddingIntakeData) => void;
}) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<WeddingIntakeData>({
    eventDate: "",
    venue: "",
    quotingFor: "",
    celebrationType: "",
    katbSetting: undefined,
  });

  function update(field: keyof WeddingIntakeData, value: string) {
    setData((prev) => ({ ...prev, [field]: value }));
  }

  const handleVenueSelect = useCallback((venue: string, placeId: string) => {
    setData((prev) => ({ ...prev, venue, venuePlaceId: placeId }));
    logVenueSearch(venue, placeId, "unknown");
  }, []);

  function next() {
    if (step === 4 && data.celebrationType === "katb-kitab" && !data.katbSetting) return;
    if (step < 4) setStep(step + 1);
    else onComplete(data);
  }

  function back() {
    if (step > 1) setStep(step - 1);
  }

  const canContinue =
    step === 1 ? Boolean(data.quotingFor) :
    step === 2 ? Boolean(data.eventDate) :
    step === 3 ? Boolean(data.venue) :
    step === 4 ? Boolean(data.celebrationType) && (data.celebrationType !== "katb-kitab" || Boolean(data.katbSetting)) :
    false;

  return (
    <div className="mx-auto max-w-2xl">
      <p className="bs-eyebrow">{label(`Step ${step} of 4`, `الخطوة ${step} من ٤`, locale)}</p>

      {/* Step 1: Who are you quoting for? */}
      {step === 1 && (
        <section className="mt-6">
          <h2 className="text-[clamp(1.7rem,3vw,2.5rem)]">
            {label("Who are you quoting for?", "من أجل من عرض الأسعار؟", locale)}
          </h2>
          <p className="mt-4 text-[color:var(--color-muted)]">
            {label(
              "This helps us personalise your experience. We will address you accordingly.",
              "هذا يساعدنا على تخصيص تجربتك. سنتعامل معك وفقاً لذلك.",
              locale
            )}
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {QUOTING_FOR.map((type) => {
              const val = label(type.en, type.ar, locale);
              return (
                <button
                  key={type.en}
                  type="button"
                  onClick={() => update("quotingFor", type.en)}
                  className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition ${
                    data.quotingFor === type.en
                      ? "border-[color:var(--color-gold)] bg-[color:var(--color-gold)]/5"
                      : "border-[color:var(--color-line)] hover:border-[color:var(--color-muted)]"
                  }`}
                >
                  <span className="text-2xl">{type.icon}</span>
                  <span className="text-sm font-medium">{val}</span>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Step 2: Event date */}
      {step === 2 && (
        <section className="mt-6">
          <h2 className="text-[clamp(1.7rem,3vw,2.5rem)]">
            {label("When is the event?", "متى الحفل؟", locale)}
          </h2>
          <p className="mt-4 text-[color:var(--color-muted)]">
            {label(
              "If you do not have a fixed date yet, give us the month or season.",
              "إذا لم يكن لديك تاريخ ثابت بعد، أخبرنا بالشهر أو الموسم.",
              locale
            )}
          </p>
          <input
            type="date"
            value={data.eventDate}
            onChange={(e) => update("eventDate", e.target.value)}
            className="mt-6 bs-input"
            min={new Date().toISOString().split("T")[0]}
          />
        </section>
      )}

      {/* Step 3: Venue with Google Maps Autocomplete */}
      {step === 3 && (
        <section className="mt-6">
          <h2 className="text-[clamp(1.7rem,3vw,2.5rem)]">
            {label("Where is the event?", "أين الحفل؟", locale)}
          </h2>
          <p className="mt-4 text-[color:var(--color-muted)]">
            {label(
              "Search for a venue or type the name and area.",
              "ابحث عن المكان أو اكتب الاسم والمنطقة.",
              locale
            )}
          </p>
          <div className="mt-6">
            <VenueAutocomplete locale={locale} value={data.venue} onSelect={handleVenueSelect} />
            <p className="mt-2 text-xs text-[color:var(--color-muted)]">
              {label("Start typing to search venues in the UAE", "ابدأ الكتابة للبحث عن المواقع في الإمارات", locale)}
            </p>
          </div>
        </section>
      )}

      {/* Step 4: Celebration type */}
      {step === 4 && (
        <section className="mt-6">
          <h2 className="text-[clamp(1.7rem,3vw,2.5rem)]">
            {label("What are you celebrating?", "ماذا تحتفل؟", locale)}
          </h2>
          <p className="mt-4 text-[color:var(--color-muted)]">
            {label(
              "Pick the closest match. You can adjust later.",
              "اختر الأقرب. يمكنك التعديل لاحقاً.",
              locale
            )}
          </p>
          <div className="mt-6 grid gap-3">
            {CELEBRATION_TYPES.map((type) => {
              const title = label(type.en, type.ar, locale);
              const keywords = label(type.keywords.en, type.keywords.ar, locale);
              return (
                <div key={type.value}>
                  <button
                    type="button"
                    onClick={() => {
                      update("celebrationType", type.value);
                      if (type.value !== "katb-kitab") {
                        setData((prev) => ({ ...prev, katbSetting: undefined }));
                      }
                    }}
                    className={`w-full rounded-xl border px-5 py-4 text-left transition ${
                      data.celebrationType === type.value
                        ? "border-[color:var(--color-gold)] bg-[color:var(--color-gold)]/5"
                        : "border-[color:var(--color-line)] hover:border-[color:var(--color-muted)]"
                    }`}
                  >
                    <span className="text-sm font-medium">{title}</span>
                    <p className="mt-1 text-xs text-[color:var(--color-muted)]">{keywords}</p>
                  </button>

                  {type.hasSubOptions && data.celebrationType === "katb-kitab" && (
                    <div className="mt-3 ml-4 flex flex-wrap gap-2">
                      {KATB_SETTINGS.map((setting) => (
                        <button
                          key={setting.value}
                          type="button"
                          onClick={() => update("katbSetting", setting.value)}
                          className={`rounded-lg border px-4 py-2 text-xs font-medium transition ${
                            data.katbSetting === setting.value
                              ? "border-[color:var(--color-gold)] bg-[color:var(--color-gold)]/10 text-[color:var(--color-gold)]"
                              : "border-[color:var(--color-line)] text-[color:var(--color-muted)] hover:border-[color:var(--color-muted)]"
                          }`}
                        >
                          {label(setting.en, setting.ar, locale)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Navigation */}
      <div className="mt-10 flex flex-wrap gap-4">
        <button type="button" className="bs-btn bs-btn-ghost" onClick={back} disabled={step === 1}>
          {label("Back", "رجوع", locale)}
        </button>
        <button type="button" className="bs-btn bs-btn-gold" onClick={next} disabled={!canContinue}>
          {step < 4
            ? label("Continue", "متابعة", locale)
            : label("Build my quotation", "أنشئ عرض الأسعار", locale)}
        </button>
      </div>
    </div>
  );
}
