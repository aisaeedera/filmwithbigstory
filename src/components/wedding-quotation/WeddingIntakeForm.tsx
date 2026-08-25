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
  guestCount: string;
  celebrationType: string;
}

const CELEBRATION_TYPES = [
  { en: "Groom preparation + male hall", ar: "تحضير العريس + قاعة الرجال" },
  { en: "Full wedding (both halls)", ar: "زفاف كامل (كلا القاعتين)" },
  { en: "Katb Kitab ceremony", ar: "حفل عقد القران" },
  { en: "Engagement ceremony", ar: "حفل خطوبة" },
  { en: "Other", ar: "أخرى" },
];

const GUEST_RANGES = [
  { en: "Under 50", ar: "أقل من 50" },
  { en: "50–100", ar: "50–100" },
  { en: "100–200", ar: "100–200" },
  { en: "200–300", ar: "200–300" },
  { en: "300–500", ar: "300–500" },
  { en: "500+", ar: "500+" },
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
    guestCount: "",
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
    step === 1 ? Boolean(data.eventDate) :
    step === 2 ? Boolean(data.venue) :
    step === 3 ? Boolean(data.guestCount) :
    step === 4 ? Boolean(data.celebrationType) :
    false;

  return (
    <div className="mx-auto max-w-2xl">
      <p className="bs-eyebrow">{label(`Step ${step} of 4`, `الخطوة ${step} من ٤`, locale)}</p>

      {/* Step 1: Event date */}
      {step === 1 && (
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

      {/* Step 2: Venue */}
      {step === 2 && (
        <section className="mt-6">
          <h2 className="text-[clamp(1.7rem,3vw,2.5rem)]">
            {label("Where is the event?", "أين الحفل؟", locale)}
          </h2>
          <p className="mt-4 text-[color:var(--color-muted)]">
            {label(
              "Hotel name, hall name, or area. If not decided, write the area or city.",
              "اسم الفندق أو القاعة أو المنطقة. إذا لم يُقرر، اكتب المنطقة أو المدينة.",
              locale
            )}
          </p>
          <input
            type="text"
            value={data.venue}
            onChange={(e) => update("venue", e.target.value)}
            placeholder={label("e.g. Atlantis The Palm, Dubai", "مثال: أتلانتس النخلة، دبي", locale)}
            className="mt-6 bs-input w-full"
          />
        </section>
      )}

      {/* Step 3: Guest count */}
      {step === 3 && (
        <section className="mt-6">
          <h2 className="text-[clamp(1.7rem,3vw,2.5rem)]">
            {label("How many guests?", "كم عدد الضيوف؟", locale)}
          </h2>
          <p className="mt-4 text-[color:var(--color-muted)]">
            {label(
              "An estimate is fine. This helps us plan crew and equipment.",
              "التقدير كافٍ. هذا يساعدنا في تخطيط الطاقم والمعدات.",
              locale
            )}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {GUEST_RANGES.map((range) => {
              const val = label(range.en, range.ar, locale);
              return (
                <button
                  key={range.en}
                  type="button"
                  onClick={() => update("guestCount", range.en)}
                  className={`bs-chip ${data.guestCount === range.en ? "bs-chip-active" : ""}`}
                >
                  {val}
                </button>
              );
            })}
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
