"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/i18n";
import type { WeddingIntakeData } from "./WeddingIntakeForm";
import pricing from "@/data/wedding-quotation-pricing.json";

type PackageId = "silver" | "gold" | "platinum";

interface PhotoBundleState {
  photo_edit_25: boolean;
  photo_edit_50: boolean;
  photo_edit_100: boolean;
}

interface AddonState {
  photoBundle: PhotoBundleState;
  additionalPhotographer: boolean;
  additionalVideographer: boolean;
  additionalVideographerLivestream: boolean;
  sameDayTeaser: boolean;
  onsitePhotoEditor: boolean;
  onsiteVideoEditor: boolean;
  ledWallSmall: boolean;
  ledWallLarge: boolean;
}

const defaultAddons: AddonState = {
  photoBundle: { photo_edit_25: false, photo_edit_50: false, photo_edit_100: false },
  additionalPhotographer: false,
  additionalVideographer: false,
  additionalVideographerLivestream: false,
  sameDayTeaser: false,
  onsitePhotoEditor: false,
  onsiteVideoEditor: false,
  ledWallSmall: false,
  ledWallLarge: false,
};

const packages: Record<PackageId, { en: string; ar: string; priceAed: number; scopeEn: string[]; scopeAr: string[]; deliveryEn: string; deliveryAr: string }> = {
  silver: {
    en: "Silver — Essential record", ar: "فضية — توثيق أساسي",
    priceAed: pricing.packages.silver.price_aed,
    scopeEn: [
      "8 hours · 1 videographer · 1 photographer",
      "Crane/jib coverage included",
      "50 edited photographs",
      "Highlight + ceremony edit",
    ],
    scopeAr: [
      "٨ ساعات · مصور فيديو واحد · مصور فوتوغرافي واحد",
      "تغطية رافعة/جيب مشمولة",
      "٥٠ صورة معدلة",
      "فيلم مختارات + مونتاج الحفل",
    ],
    deliveryEn: "21-day delivery target · 1 revision round", deliveryAr: "هدف تسليم ٢١ يوماً · جولة تعديل واحدة",
  },
  gold: {
    en: "Gold — Cinematic Wedding Story", ar: "ذهبية — قصة زفاف سينمائية",
    priceAed: pricing.packages.gold.price_aed,
    scopeEn: [
      "8 hours · 2 videographers · 1 photographer",
      "Crane/jib coverage included",
      "100 edited photographs",
      "Highlight + key-event film + 1 social cut",
    ],
    scopeAr: [
      "٨ ساعات · مصورا فيديو · مصور فوتوغرافي واحد",
      "تغطية رافعة/جيب مشمولة",
      "١٠٠ صورة معدلة",
      "فيلم مختارات + فيلم فعاليات رئيسية + مقطع اجتماعي واحد",
    ],
    deliveryEn: "14-day delivery target · 2 revision rounds", deliveryAr: "هدف تسليم ١٤ يوماً · جولتا تعديل",
  },
  platinum: {
    en: "Platinum — Expanded coverage", ar: "بلاتينية — تغطية موسعة",
    priceAed: pricing.packages.platinum.price_aed,
    scopeEn: [
      "8 hours · 2 videographers · 2 photographers",
      "Crane/jib coverage included",
      "150 edited photographs",
      "Highlight + extended film + 3 social cuts",
    ],
    scopeAr: [
      "٨ ساعات · مصورا فيديو · مصورا فوتوغرافيا",
      "تغطية رافعة/جيب مشمولة",
      "١٥٠ صورة معدلة",
      "فيلم مختارات + فيلم موسع + ٣ مقاطع اجتماعية",
    ],
    deliveryEn: "7-day target subject to verified release · 3 revision rounds", deliveryAr: "هدف ٧ أيام رهن الإطلاق المتحقق · ٣ جولات تعديل",
  },
};

const commonEn = "Included in every package: 8 hours, Crane/jib coverage with a supplier-provided operator, Director/ATEM switcher, PA system, YouTube livestream at the released 1080p workflow, basic QR photo sharing, two display-only QR screens: one inside the hall and one near the exit, cloud delivery, all original camera files, and 60-day client access.";
const commonAr = "تشمل كل باقة: ٨ ساعات، تغطية رافعة/جيب مع مشغل من المورد، مخرج/مبدل ATEM، نظام PA، بث يوتيوب مباشر بدقة 1080p المعتمدة، مشاركة صور QR الأساسية، شاشتا QR للعرض فقط: واحدة داخل القاعة وأخرى قرب المخرج، تسليم سحابي، جميع ملفات الكاميرا الأصلية، ووصول العميل لمدة ٦٠ يوماً.";

// Country codes for phone validation — GCC pinned first
const COUNTRY_CODES = [
  { code: "+971", country: "AE", nameEn: "UAE", nameAr: "الإمارات", pattern: /^[0-9]{9}$/ },
  { code: "+966", country: "SA", nameEn: "Saudi Arabia", nameAr: "السعودية", pattern: /^[0-9]{9}$/ },
  { code: "+973", country: "BH", nameEn: "Bahrain", nameAr: "البحرين", pattern: /^[0-9]{8}$/ },
  { code: "+974", country: "QA", nameEn: "Qatar", nameAr: "قطر", pattern: /^[0-9]{8}$/ },
  { code: "+965", country: "KW", nameEn: "Kuwait", nameAr: "الكويت", pattern: /^[0-9]{8}$/ },
  { code: "+968", country: "OM", nameEn: "Oman", nameAr: "عُمان", pattern: /^[0-9]{8}$/ },
  { code: "+962", country: "JO", nameEn: "Jordan", nameAr: "الأردن", pattern: /^[0-9]{9}$/ },
  { code: "+961", country: "LB", nameEn: "Lebanon", nameAr: "لبنان", pattern: /^[0-9]{7,8}$/ },
  { code: "+20", country: "EG", nameEn: "Egypt", nameAr: "مصر", pattern: /^[0-9]{10}$/ },
  { code: "+91", country: "IN", nameEn: "India", nameAr: "الهند", pattern: /^[0-9]{10}$/ },
  { code: "+44", country: "GB", nameEn: "UK", nameAr: "المملكة المتحدة", pattern: /^[0-9]{10}$/ },
  { code: "+1", country: "US", nameEn: "US", nameAr: "أمريكا", pattern: /^[0-9]{10}$/ },
];

function normalizeE164(code: string, national: string): string {
  const digits = national.replace(/[^0-9]/g, "");
  return `${code}${digits}`;
}

function validatePhone(code: string, national: string): { valid: boolean; errorEn: string; errorAr: string } {
  const digits = national.replace(/[^0-9]/g, "");
  if (digits.length === 0) return { valid: false, errorEn: "Enter your mobile number", errorAr: "أدخل رقم هاتفك المحمول" };
  const country = COUNTRY_CODES.find((c) => c.code === code);
  if (country && country.pattern) {
    if (!country.pattern.test(digits)) return { valid: false, errorEn: `Enter a valid ${country.nameEn} mobile number`, errorAr: `أدخل رقم هاتف محمول صالح من ${country.nameAr}` };
  } else {
    // E.164 fallback: 7–15 digits
    if (digits.length < 7 || digits.length > 15) return { valid: false, errorEn: "Enter a valid mobile number (7–15 digits)", errorAr: "أدخل رقم هاتف محمول صالح (٧–١٥ رقم)" };
  }
  return { valid: true, errorEn: "", errorAr: "" };
}

function formatAed(amount: number): string {
  return `AED ${amount.toLocaleString("en-AE")}`;
}

export default function WeddingQuotationWizard({ locale, intakeData }: { locale: Locale; intakeData?: WeddingIntakeData }) {
  const isAr = locale === "ar";
  const [step, setStep] = useState(1);
  const [tier, setTier] = useState<PackageId | null>(null);
  const [addons, setAddons] = useState<AddonState>(defaultAddons);
  const [name, setName] = useState("");
  const [phoneCountryCode, setPhoneCountryCode] = useState("+971");
  const [phoneNational, setPhoneNational] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const selected = tier ? packages[tier] : null;
  const label = (en: string, ar: string) => isAr ? ar : en;
  const gatedPrice = (amount: number) => phoneVerified ? formatAed(amount) : label("Enter your mobile number to view pricing", "أدخل رقم هاتفك المحمول لعرض الأسعار");

  // Check if this is a groom wedding — only groom gets instant package pricing
  const isGroomWedding = intakeData?.celebrationType === "groom-wedding";

  const canContinue = step === 1 ? Boolean(tier) : step === 2 ? true : step === 3 ? phoneVerified : true;

  const addonTotal = useMemo(() => {
    if (!tier) return 0;
    let total = 0;
    // Photo bundles
    if (addons.photoBundle.photo_edit_25) total += pricing.addons.photo_edit_25.price_aed;
    if (addons.photoBundle.photo_edit_50) total += pricing.addons.photo_edit_50.price_aed;
    if (addons.photoBundle.photo_edit_100) total += pricing.addons.photo_edit_100.price_aed;
    // Crew add-ons
    if (addons.additionalPhotographer) total += pricing.addons.additional_photographer.price_aed;
    if (addons.additionalVideographer) total += pricing.addons.additional_videographer.price_aed;
    if (addons.additionalVideographerLivestream) total += pricing.addons.additional_videographer_livestream.price_aed;
    // Production add-ons
    if (addons.sameDayTeaser) total += pricing.addons.same_day_teaser.price_aed;
    if (addons.onsitePhotoEditor) total += pricing.addons.onsite_photo_editor.price_aed;
    if (addons.onsiteVideoEditor) total += pricing.addons.onsite_video_editor.price_aed;
    // LED walls
    if (addons.ledWallSmall) total += pricing.addons.led_wall_small.price_aed;
    if (addons.ledWallLarge) total += pricing.addons.led_wall_large.price_aed;
    return total;
  }, [tier, addons]);

  const grandTotal = (selected?.priceAed || 0) + addonTotal;

  function next() { if (canContinue) setStep((value) => Math.min(5, value + 1)); }
  function back() { setStep((value) => Math.max(1, value - 1)); }

  function verifyPhone() {
    const result = validatePhone(phoneCountryCode, phoneNational);
    if (result.valid) {
      setPhoneVerified(true);
      setPhoneError("");
    } else {
      setPhoneError(isAr ? result.errorAr : result.errorEn);
    }
  }

  // Non-groom events: show tailored planning CTA
  if (!isGroomWedding) {
    return (
      <div className="mx-auto max-w-2xl" aria-live="polite">
        <section className="mt-6">
          <h2 className="text-[clamp(1.7rem,3vw,2.5rem)]">
            {label("Tailored planning — Request specialist crew availability", "تخطيط مخصص — اطلب التحقق من توفر الطاقم المتخصص")}
          </h2>
          <p className="mt-4 text-[color:var(--color-muted)]">
            {label(
              "This event type requires specialist crew and privacy arrangements that are confirmed per project. Big Story will scope your day, confirm crew availability, and quote in writing before anything is locked.",
              "يتطلب نوع الحدث هذا طاقماً متخصصاً وترتيبات خصوصية تُؤكد لكل مشروع. ستُحدد بيك ستوري نطاق يومكم، وتؤكد توفر الطاقم، وتقدّم عرضاً كتابياً قبل تثبيت أي شيء."
            )}
          </p>
          <div className="mt-8 bs-card">
            <h3 className="text-lg font-semibold">
              {label("What happens next", "ماذا يحدث بعد ذلك")}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-[color:var(--color-muted)]">
              <li className="flex gap-3">
                <span aria-hidden className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--color-accent)]" />
                <span>{label("Tell us your date, venue and what you need covered", "أخبرنا بتاريخك وموقعك وما تريد تغطيته")}</span>
              </li>
              <li className="flex gap-3">
                <span aria-hidden className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--color-accent)]" />
                <span>{label("We confirm specialist crew availability for your event type", "نؤكد توفر الطاقم المتخصص لنوع فعاليتك")}</span>
              </li>
              <li className="flex gap-3">
                <span aria-hidden className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--color-accent)]" />
                <span>{label("You receive a written scope and quotation", "تتلقى نطاقاً كتابياً وعرض أسعار")}</span>
              </li>
            </ul>
          </div>
          <p className="mt-6 text-sm text-[color:var(--color-muted)]">
            {label(
              "Need longer coverage? Add it to your review request and Big Story will confirm crew availability and the revised quotation.",
              "تحتاج إلى تغطية أطول؟ أضفها إلى طلب المراجعة وستؤكد بيك ستوري توفر الطاقم وعرض السعر المعدل."
            )}
          </p>
        </section>
      </div>
    );
  }

  return <div className="mx-auto max-w-6xl" aria-live="polite">
    <div className="mb-8 border-b border-[color:var(--color-line)] pb-5">
      <p className="bs-eyebrow">{label(`Step ${step} of 5`, `الخطوة ${step} من ٥`)}</p>
      <ol className="mt-3 flex gap-2" aria-hidden="true">{Array.from({ length: 5 }, (_, index) => <li key={index} className={`h-2 w-10 rounded ${index < step ? "bg-[color:var(--color-gold)]" : "bg-[color:var(--color-line)]"}`} />)}</ol>
    </div>

    {step === 1 && <section aria-labelledby="package-heading">
      <h2 id="package-heading" className="text-[clamp(1.7rem,3vw,2.5rem)]">{label("Choose your wedding package", "اختر باقة الزفاف")}</h2>
      <p className="mt-4 text-[color:var(--color-muted)]">{label("All packages include 8 hours of coverage, crane/operator, Director/ATEM, PA, YouTube livestream at 1080p, QR sharing, cloud delivery, and all original files.", "تشمل جميع الباقات ٨ ساعات تغطية، رافعة/مشغل، مخرج/ATEM، نظام PA، بث يوتيوب مباشر بدقة 1080p، مشاركة QR، تسليم سحابي، وجميع الملفات الأصلية.")}</p>
      <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3" role="radiogroup" aria-label={label("Wedding package", "باقة الزفاف")}>
        {(Object.keys(packages) as PackageId[]).map((id) => <label key={id} className={`bs-card cursor-pointer ${tier === id ? "ring-1 ring-[color:var(--color-gold)]" : ""}`}>
          <input className="sr-only" type="radio" name="package" value={id} checked={tier === id} onChange={() => setTier(id)} />
          <p className="bs-eyebrow">{id === "gold" ? label("Recommended", "الموصى بها") : label("Available", "متاحة")}</p>
          <h3 className="mt-3 text-xl">{label(packages[id].en, packages[id].ar)}</h3>
          <p className="mt-2 text-2xl font-bold text-[color:var(--color-gold)]">{gatedPrice(packages[id].priceAed)}</p>
          <ul className="mt-5 space-y-2 text-sm text-[color:var(--color-muted)]">{(isAr ? packages[id].scopeAr : packages[id].scopeEn).map((item) => <li key={item}>{item}</li>)}</ul>
          <p className="mt-5 text-sm">{label(packages[id].deliveryEn, packages[id].deliveryAr)}</p>
          {tier === id && <p className="mt-4 text-sm font-semibold text-[color:var(--color-gold)]">{label("Selected", "محددة")}</p>}
        </label>)}
      </div>
      <h3 className="mt-8 text-lg">{label("Included in every package", "مشمول في كل باقة")}</h3>
      <p className="mt-3 text-[color:var(--color-muted)]">{label(commonEn, commonAr)}</p>
    </section>}

    {step === 2 && <section aria-labelledby="customize-heading">
      <h2 id="customize-heading" className="text-[clamp(1.7rem,3vw,2.5rem)]">{label("Customize your package", "خصص باقتك")}</h2>

      <fieldset className="mt-6">
        <legend className="bs-legend">{label("Additional edited photos", "صور معدلة إضافية")}</legend>
        <p className="mt-1 text-sm text-[color:var(--color-muted)]">{label("Add a bundle of professionally edited photos to your package.", "أضف حزمة من الصور المعدلة احترافياً إلى باقتك.")}</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {(["photo_edit_25", "photo_edit_50", "photo_edit_100"] as const).map((key) => {
            const addon = pricing.addons[key];
            return (
              <label key={key} className="bs-card cursor-pointer">
                <input type="checkbox" checked={addons.photoBundle[key]} onChange={(e) => setAddons({ ...addons, photoBundle: { ...addons.photoBundle, [key]: e.target.checked } })} />
                <span className="ms-2">{label(addon.label_en, addon.label_ar)}</span>
                <p className="mt-1 text-sm font-semibold text-[color:var(--color-gold)]">{gatedPrice(addon.price_aed)}</p>
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="mt-7">
        <legend className="bs-legend">{label("Additional crew", "طاقم إضافي")}</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <label className="bs-card cursor-pointer">
            <input type="checkbox" checked={addons.additionalPhotographer} onChange={(e) => setAddons({ ...addons, additionalPhotographer: e.target.checked })} />
            <span className="ms-2">{label("Additional photographer", "مصور فوتوغرافي إضافي")}</span>
            <p className="mt-1 text-sm font-semibold text-[color:var(--color-gold)]">{gatedPrice(pricing.addons.additional_photographer.price_aed)}</p>
          </label>
          <label className="bs-card cursor-pointer">
            <input type="checkbox" checked={addons.additionalVideographer} onChange={(e) => setAddons({ ...addons, additionalVideographer: e.target.checked })} />
            <span className="ms-2">{label("Additional videographer", "مصور فيديو إضافي")}</span>
            <p className="mt-1 text-sm font-semibold text-[color:var(--color-gold)]">{gatedPrice(pricing.addons.additional_videographer.price_aed)}</p>
          </label>
          <label className="bs-card cursor-pointer">
            <input type="checkbox" checked={addons.additionalVideographerLivestream} onChange={(e) => setAddons({ ...addons, additionalVideographerLivestream: e.target.checked })} />
            <span className="ms-2">{label("Videographer + livestream", "مصور فيديو + بث مباشر")}</span>
            <p className="mt-1 text-sm font-semibold text-[color:var(--color-gold)]">{gatedPrice(pricing.addons.additional_videographer_livestream.price_aed)}</p>
          </label>
        </div>
      </fieldset>

      <fieldset className="mt-7">
        <legend className="bs-legend">{label("Production add-ons", "إضافات إنتاجية")}</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <label className="bs-card cursor-pointer">
            <input type="checkbox" checked={addons.sameDayTeaser} onChange={(e) => setAddons({ ...addons, sameDayTeaser: e.target.checked })} />
            <span className="ms-2">{label("Same-day teaser", "إعلان تشويقي في نفس اليوم")}</span>
            <p className="mt-1 text-sm font-semibold text-[color:var(--color-gold)]">{gatedPrice(pricing.addons.same_day_teaser.price_aed)}</p>
          </label>
          <label className="bs-card cursor-pointer">
            <input type="checkbox" checked={addons.onsitePhotoEditor} onChange={(e) => setAddons({ ...addons, onsitePhotoEditor: e.target.checked })} />
            <span className="ms-2">{label("On-site photo editor", "محرر صور في الموقع")}</span>
            <p className="mt-1 text-sm font-semibold text-[color:var(--color-gold)]">{gatedPrice(pricing.addons.onsite_photo_editor.price_aed)}</p>
          </label>
          <label className="bs-card cursor-pointer">
            <input type="checkbox" checked={addons.onsiteVideoEditor} onChange={(e) => setAddons({ ...addons, onsiteVideoEditor: e.target.checked })} />
            <span className="ms-2">{label("On-site video editor", "محرر فيديو في الموقع")}</span>
            <p className="mt-1 text-sm font-semibold text-[color:var(--color-gold)]">{gatedPrice(pricing.addons.onsite_video_editor.price_aed)}</p>
          </label>
        </div>
      </fieldset>

      <fieldset className="mt-7">
        <legend className="bs-legend">{label("Released LED wall upgrades", "ترقيات جدار LED المعتمدة")}</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <label className="bs-card cursor-pointer">
            <input type="checkbox" checked={addons.ledWallSmall} onChange={(e) => setAddons({ ...addons, ledWallSmall: e.target.checked })} />
            <span className="ms-2">{label("LED wall 2m × 2.5m", "جدار LED ٢م × ٢٫٥م")}</span>
            <p className="mt-1 text-sm font-semibold text-[color:var(--color-gold)]">{gatedPrice(pricing.addons.led_wall_small.price_aed)}</p>
          </label>
          <label className="bs-card cursor-pointer">
            <input type="checkbox" checked={addons.ledWallLarge} onChange={(e) => setAddons({ ...addons, ledWallLarge: e.target.checked })} />
            <span className="ms-2">{label("LED wall 2.5m × 3m", "جدار LED ٢٫٥م × ٣م")}</span>
            <p className="mt-1 text-sm font-semibold text-[color:var(--color-gold)]">{gatedPrice(pricing.addons.led_wall_large.price_aed)}</p>
          </label>
        </div>
      </fieldset>

      <div className="mt-7 bs-card" role="status">
        <strong>{label("Included, not configurable", "مشمول وغير قابل للتغيير")}</strong>
        <p className="mt-2 text-sm text-[color:var(--color-muted)]">{label("Basic QR sharing and exactly two display-only QR screens: one inside the hall and one near the exit.", "مشاركة QR الأساسية وشاشتا QR للعرض فقط بالضبط: واحدة داخل القاعة وأخرى قرب المخرج.")}</p>
      </div>

      <div className="mt-5 bs-card">
        <p className="text-sm text-[color:var(--color-muted)]">{label("YouTube Live included at the released 1080p workflow, subject to client authorization and VIP/privacy checks.", "بث يوتيوب مباشر مشمول بدقة 1080p المعتمدة، رهن ترخيص العميل وفحص الخصوصية.")}</p>
      </div>

      <p className="mt-5 text-sm text-[color:var(--color-muted)]">{label("Need longer coverage? Add it to your review request and Big Story will confirm crew availability and the revised quotation.", "تحتاج إلى تغطية أطول؟ أضفها إلى طلب المراجعة وستؤكد بيك ستوري توفر الطاقم وعرض السعر المعدل.")}</p>
    </section>}

    {step === 3 && <section aria-labelledby="phone-heading" className="max-w-2xl">
      <h2 id="phone-heading" className="text-[clamp(1.7rem,3vw,2.5rem)]">{label("Enter your mobile number to view pricing", "أدخل رقم هاتفك المحمول لعرض الأسعار")}</h2>
      <p className="mt-4 text-[color:var(--color-muted)]">{label("You can browse and configure without an account. We ask for your name and a valid mobile number before showing your quotation summary. This is format validation only — it does not confirm phone ownership, availability, price approval, payment or booking.", "يمكنك التصفح والتخصيص دون حساب. نطلب اسمك ورقم هاتف محمول صالح فقط قبل عرض ملخص عرض الأسعار. هذا التحقق من التنسيق فقط — لا يؤكد ملكية الهاتف أو التوفر أو اعتماد السعر أو الدفع أو الحجز.")}</p>
      <div className="mt-6 grid gap-4">
        <label className="bs-label">
          {label("Name", "الاسم")}
          <input className="bs-input mt-2" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <div>
          <label className="bs-label">{label("Mobile", "الهاتف المحمول")}</label>
          <div className="mt-2 flex gap-2" dir="ltr">
            <select
              className="bs-input w-32"
              value={phoneCountryCode}
              onChange={(e) => { setPhoneCountryCode(e.target.value); setPhoneVerified(false); setPhoneError(""); }}
              aria-label={label("Country code", "رمز الدولة")}
            >
              {COUNTRY_CODES.map((c) => (
                <option key={c.code} value={c.code}>{c.code} {isAr ? c.nameAr : c.nameEn}</option>
              ))}
            </select>
            <input
              className="bs-input flex-1"
              dir="ltr"
              autoComplete="tel-national"
              inputMode="tel"
              value={phoneNational}
              onChange={(e) => { setPhoneNational(e.target.value); setPhoneVerified(false); setPhoneError(""); }}
              placeholder={label("Mobile number", "رقم الهاتف المحمول")}
            />
          </div>
          {phoneError && <p className="mt-2 text-sm text-[color:var(--color-error)]" role="alert">{phoneError}</p>}
        </div>
        {!phoneVerified ? (
          <button className="bs-btn bs-btn-gold w-fit" type="button" onClick={verifyPhone}>
            {label("Continue", "متابعة")}
          </button>
        ) : (
          <p className="text-sm text-[color:var(--color-success)]">{label("Number accepted — showing pricing.", "تم قبول الرقم — عرض الأسعار.")}</p>
        )}
      </div>
    </section>}

    {step === 4 && <section aria-labelledby="review-heading">
      <h2 id="review-heading" className="text-[clamp(1.7rem,3vw,2.5rem)]">{label("Your quotation summary", "ملخص عرض الأسعار")}</h2>
      <div className="mt-6 bs-card">
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-[color:var(--color-muted)]">{label("Package", "الباقة")}</dt>
            <dd className="mt-1 font-semibold">{selected ? label(selected.en, selected.ar) : "—"}</dd>
          </div>
          <div>
            <dt className="text-sm text-[color:var(--color-muted)]">{label("Package price", "سعر الباقة")}</dt>
            <dd className="mt-1 text-2xl font-bold text-[color:var(--color-gold)]">{selected ? formatAed(selected.priceAed) : "—"}</dd>
          </div>
        </dl>

        {addonTotal > 0 && <>
          <h3 className="mt-6 text-sm font-semibold text-[color:var(--color-muted)]">{label("Add-ons selected", "الإضافات المحددة")}</h3>
          <ul className="mt-2 space-y-1 text-sm">
            {addons.photoBundle.photo_edit_25 && <li className="flex justify-between"><span>{label(pricing.addons.photo_edit_25.label_en, pricing.addons.photo_edit_25.label_ar)}</span><span>{formatAed(pricing.addons.photo_edit_25.price_aed)}</span></li>}
            {addons.photoBundle.photo_edit_50 && <li className="flex justify-between"><span>{label(pricing.addons.photo_edit_50.label_en, pricing.addons.photo_edit_50.label_ar)}</span><span>{formatAed(pricing.addons.photo_edit_50.price_aed)}</span></li>}
            {addons.photoBundle.photo_edit_100 && <li className="flex justify-between"><span>{label(pricing.addons.photo_edit_100.label_en, pricing.addons.photo_edit_100.label_ar)}</span><span>{formatAed(pricing.addons.photo_edit_100.price_aed)}</span></li>}
            {addons.additionalPhotographer && <li className="flex justify-between"><span>{label("Additional photographer", "مصور فوتوغرافي إضافي")}</span><span>{formatAed(pricing.addons.additional_photographer.price_aed)}</span></li>}
            {addons.additionalVideographer && <li className="flex justify-between"><span>{label("Additional videographer", "مصور فيديو إضافي")}</span><span>{formatAed(pricing.addons.additional_videographer.price_aed)}</span></li>}
            {addons.additionalVideographerLivestream && <li className="flex justify-between"><span>{label("Videographer + livestream", "مصور فيديو + بث مباشر")}</span><span>{formatAed(pricing.addons.additional_videographer_livestream.price_aed)}</span></li>}
            {addons.sameDayTeaser && <li className="flex justify-between"><span>{label("Same-day teaser", "إعلان تشويقي في نفس اليوم")}</span><span>{formatAed(pricing.addons.same_day_teaser.price_aed)}</span></li>}
            {addons.onsitePhotoEditor && <li className="flex justify-between"><span>{label("On-site photo editor", "محرر صور في الموقع")}</span><span>{formatAed(pricing.addons.onsite_photo_editor.price_aed)}</span></li>}
            {addons.onsiteVideoEditor && <li className="flex justify-between"><span>{label("On-site video editor", "محرر فيديو في الموقع")}</span><span>{formatAed(pricing.addons.onsite_video_editor.price_aed)}</span></li>}
            {addons.ledWallSmall && <li className="flex justify-between"><span>{label("LED wall 2m × 2.5m", "جدار LED ٢م × ٢٫٥م")}</span><span>{formatAed(pricing.addons.led_wall_small.price_aed)}</span></li>}
            {addons.ledWallLarge && <li className="flex justify-between"><span>{label("LED wall 2.5m × 3m", "جدار LED ٢٫٥م × ٣م")}</span><span>{formatAed(pricing.addons.led_wall_large.price_aed)}</span></li>}
          </ul>
        </>}

        <div className="mt-6 border-t border-[color:var(--color-line)] pt-4">
          <dl className="flex justify-between">
            <dt className="text-lg font-semibold">{label("Total", "الإجمالي")}</dt>
            <dd className="text-2xl font-bold text-[color:var(--color-gold)]">{formatAed(grandTotal)}</dd>
          </dl>
        </div>

        <p className="mt-6 text-sm text-[color:var(--color-muted)]">{label("All packages include original camera RAW photos, unedited high-resolution JPEGs, original camera video files, and edited work. Client cloud access is 60 days from delivery notification. The YouTube livestream/archive remains until an authorized client requests removal.", "تشمل جميع الباقات ملفات صور RAW الأصلية وملفات JPEG عالية الدقة غير المعدلة وملفات فيديو الكاميرا الأصلية والعمل المعدل. يستمر الوصول السحابي للعميل ٦٠ يوماً من إشعار التسليم. يبقى بث/أرشيف يوتيوب حتى يطلب عميل مخول حذفه.")}</p>
      </div>
    </section>}

    {step === 5 && (
      <section aria-labelledby="submit-heading">
        <h2 id="submit-heading" className="text-[clamp(1.7rem,3vw,2.5rem)]">
          {label("Review before payment or booking", "المراجعة قبل الدفع أو الحجز")}
        </h2>
        {submitted ? (
          <div className="mt-6 bs-card" role="status">
            <h3 className="text-xl">{label("Submitted for Big Story review", "تم الإرسال للمراجعة لدى بيك ستوري")}</h3>
            <p className="mt-3 text-[color:var(--color-muted)]">
              {label(
                "This is not an availability, price, payment or booking confirmation. Big Story must verify venue feasibility, suppliers, crew, and editor capacity.",
                "هذا ليس تأكيداً للتوفر أو السعر أو الدفع أو الحجز. يجب على بيك ستوري التحقق من قابلية الموقع والموردين والطاقم وقدرة المحررين."
              )}
            </p>
          </div>
        ) : (
          <>
            <p className="mt-4 text-[color:var(--color-muted)]">
              {label(
                "Submit this configuration for Big Story review. There is no payment, booking, date hold or availability promise in this flow.",
                "أرسل هذا التكوين لمراجعة بيك ستوري. لا يوجد دفع أو حجز أو حجز تاريخ أو وعد بالتوفر في هذا المسار."
              )}
            </p>
            <button type="button" className="bs-btn bs-btn-gold mt-6" onClick={() => setSubmitted(true)}>
              {label("Submit for Big Story review", "أرسل للمراجعة لدى بيك ستوري")}
            </button>
          </>
        )}
      </section>
    )}

    {!submitted && <div className="mt-10 flex flex-wrap gap-4"><button type="button" className="bs-btn bs-btn-ghost" onClick={back} disabled={step === 1}>{label("Back", "رجوع")}</button>{step < 5 && <button type="button" className="bs-btn bs-btn-gold" onClick={next} disabled={!canContinue}>{label("Continue", "متابعة")}</button>}</div>}
  </div>;
}
