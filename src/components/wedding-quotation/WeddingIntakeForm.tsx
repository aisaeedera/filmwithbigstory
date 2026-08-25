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
  { en: "Groom preparation + male hall", ar: "تحضير العريس + قاعة الرجال" },
  { en: "Full wedding (both halls)", ar: "زفاف كامل (كلا القاعتين)" },
  { en: "Katb Kitab ceremony", ar: "حفل عقد القران" },
  { en: "Engagement ceremony", ar: "حفل خطوبة" },
  { en: "Other", ar: "أخرى" },
];

function label(en: string, ar: string, locale: Locale): string {
  return locale === "ar" ? ar : en;
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
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) return;

    // Load Google Maps script
    const existingScript = document.getElementById("google-maps-script");
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "google-maps-script";
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      script.onload = () => initAutocomplete();
    } else {
      initAutocomplete();
    }

    function initAutocomplete() {
      if (!inputRef.current || !window.google?.maps?.places) return;

      const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
        types: ["establishment"],
        fields: ["name", "place_id", "formatted_address"],
        componentRestrictions: { country: ["ae", "sa", "om", "bh", "qa", "kw"] },
      });

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place.name) {
          const display = place.formatted_address
            ? `${place.name}, ${place.formatted_address}`
            : place.name;
          onSelect(display, place.place_id || "");
        }
      });

      autocompleteRef.current = autocomplete;
    }

    return () => {
      // Cleanup listener if needed
    };
  }, [onSelect]);

  return (
    <input
      ref={inputRef}
      type="text"
      defaultValue={value}
      placeholder={label(
        "Search venue name...",
        "ابحث عن اسم المكان...",
        locale
      )}
      className="bs-input w-full"
    />
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
  });

  function update(field: keyof WeddingIntakeData, value: string) {
    setData((prev) => ({ ...prev, [field]: value }));
  }

  const handleVenueSelect = useCallback((venue: string, placeId: string) => {
    setData((prev) => ({ ...prev, venue, venuePlaceId: placeId }));
  }, []);

  function next() {
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
    step === 4 ? Boolean(data.celebrationType) :
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
            <VenueAutocomplete
              locale={locale}
              value={data.venue}
              onSelect={handleVenueSelect}
            />
            <p className="mt-2 text-xs text-[color:var(--color-muted)]">
              {label(
                "Start typing to search venues in the UAE",
                "ابدأ الكتابة للبحث عن المواقع في الإمارات",
                locale
              )}
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
          <div className="mt-6 flex flex-wrap gap-3">
            {CELEBRATION_TYPES.map((type) => {
              const val = label(type.en, type.ar, locale);
              return (
                <button
                  key={type.en}
                  type="button"
                  onClick={() => update("celebrationType", type.en)}
                  className={`bs-chip ${data.celebrationType === type.en ? "bs-chip-active" : ""}`}
                >
                  {val}
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Navigation */}
      <div className="mt-10 flex flex-wrap gap-4">
        <button
          type="button"
          className="bs-btn bs-btn-ghost"
          onClick={back}
          disabled={step === 1}
        >
          {label("Back", "رجوع", locale)}
        </button>
        <button
          type="button"
          className="bs-btn bs-btn-gold"
          onClick={next}
          disabled={!canContinue}
        >
          {step < 4
            ? label("Continue", "متابعة", locale)
            : label("Build my quotation", "أنشئ عرض الأسعار", locale)}
        </button>
      </div>
    </div>
  );
}
