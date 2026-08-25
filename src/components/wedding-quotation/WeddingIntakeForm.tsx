"use client";

/**
 * Wedding intake form — four-step, one question per screen.
 * Collects event details before the quotation wizard.
 * Passes data to WeddingQuotationWizard on completion.
 */

import { useState } from "react";
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

      {/* Step 3: Venue with Google Maps */}
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
            <input
              type="text"
              value={data.venue}
              onChange={(e) => update("venue", e.target.value)}
              placeholder={label("Search venue or type name...", "ابحث عن المكان أو اكتب الاسم...", locale)}
              className="bs-input w-full"
            />
            <p className="mt-2 text-xs text-[color:var(--color-muted)]">
              {label(
                "e.g. Atlantis The Palm, Madinat Jumeirah, Ritz-Carlton DIFC",
                "مثال: أتلانتس النخلة، مدينة جميرا، ريتز كارلتون مركز دبي المالي",
                locale
              )}
            </p>
            {/* Google Maps integration placeholder — will be connected later */}
            <div className="mt-4 rounded-xl border border-dashed border-[color:var(--color-line)] p-6 text-center text-sm text-[color:var(--color-muted)]">
              {label(
                "Venue search with map coming soon",
                "البحث عن المواقع مع الخريطة قريباً",
                locale
              )}
            </div>
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
