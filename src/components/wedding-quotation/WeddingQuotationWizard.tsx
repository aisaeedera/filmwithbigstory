"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/i18n";
import pricing from "@/data/wedding-quotation-pricing.json";

type PackageId = "silver" | "gold" | "platinum";

interface AddonState {
  extraHours: number;
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
  extraHours: 0,
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
    en: "Gold — Complete wedding day", ar: "ذهبية — يوم زفاف متكامل",
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

const commonEn = "Included in every package: 8 hours, Crane/jib coverage with a supplier-provided operator, Director/ATEM switcher, PA system, YouTube livestreaming, basic QR photo sharing, two display-only QR screens: one inside the hall and one near the exit, cloud delivery, all original camera files, and 60-day client access.";
const commonAr = "تشمل كل باقة: ٨ ساعات، تغطية رافعة/جيب مع مشغل من المورد، مخرج/مبدل ATEM، نظام PA، بث يوتيوب مباشر، مشاركة صور QR الأساسية، شاشتا QR للعرض فقط: واحدة داخل القاعة وأخرى قرب المخرج، تسليم سحابي، جميع ملفات الكاميرا الأصلية، ووصول العميل لمدة ٦٠ يوماً.";

function formatAed(amount: number): string {
  return `AED ${amount.toLocaleString("en-AE")}`;
}

export default function WeddingQuotationWizard({ locale }: { locale: Locale }) {
  const isAr = locale === "ar";
  const [step, setStep] = useState(1);
  const [tier, setTier] = useState<PackageId | null>(null);
  const [addons, setAddons] = useState<AddonState>(defaultAddons);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);
  const [guestScreen, setGuestScreen] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const selected = tier ? packages[tier] : null;
  const label = (en: string, ar: string) => isAr ? ar : en;
  const gatedPrice = (amount: number) => verified ? formatAed(amount) : label("Verify mobile to view price", "تحقق من الهاتف لعرض السعر");
  const canContinue = step === 1 ? Boolean(tier) : step === 2 ? true : step === 3 ? verified : true;

  const addonTotal = useMemo(() => {
    if (!tier) return 0;
    let total = 0;
    const tierPricing = pricing.addons.extra_hour.tier_pricing;
    total += addons.extraHours * (tierPricing[tier] || 750);
    if (addons.additionalPhotographer) total += pricing.addons.additional_photographer.price_aed;
    if (addons.additionalVideographer) total += pricing.addons.additional_videographer.price_aed;
    if (addons.additionalVideographerLivestream) total += pricing.addons.additional_videographer_livestream.price_aed;
    if (addons.sameDayTeaser) total += pricing.addons.same_day_teaser.price_aed;
    if (addons.onsitePhotoEditor) total += pricing.addons.onsite_photo_editor.price_aed;
    if (addons.onsiteVideoEditor) total += pricing.addons.onsite_video_editor.price_aed;
    if (addons.ledWallSmall) total += pricing.addons.led_wall_small.price_aed;
    if (addons.ledWallLarge) total += pricing.addons.led_wall_large.price_aed;
    return total;
  }, [tier, addons]);

  const grandTotal = (selected?.priceAed || 0) + addonTotal;

  function next() { if (canContinue) setStep((value) => Math.min(5, value + 1)); }
  function back() { setStep((value) => Math.max(1, value - 1)); }
  function verifyOtp() { if (name.trim().length >= 2 && phone.trim().length >= 7 && otp === "000000") setVerified(true); }

  return <div className="mx-auto max-w-6xl" aria-live="polite">
    <div className="mb-8 border-b border-[color:var(--color-line)] pb-5">
      <p className="bs-eyebrow">{label(`Step ${step} of 5`, `الخطوة ${step} من ٥`)}</p>
      <ol className="mt-3 flex gap-2" aria-hidden="true">{Array.from({ length: 5 }, (_, index) => <li key={index} className={`h-2 w-10 rounded ${index < step ? "bg-[color:var(--color-gold)]" : "bg-[color:var(--color-line)]"}`} />)}</ol>
    </div>

    {step === 1 && <section aria-labelledby="package-heading">
      <h2 id="package-heading" className="text-[clamp(1.7rem,3vw,2.5rem)]">{label("Choose your wedding package", "اختر باقة الزفاف")}</h2>
      <p className="mt-4 text-[color:var(--color-muted)]">{label("All packages include 8 hours of coverage, crane/operator, Director/ATEM, PA, YouTube livestream, QR sharing, cloud delivery, and all original files.", "تشمل جميع الباقات ٨ ساعات تغطية، رافعة/مشغل، مخرج/ATEM، نظام PA، بث يوتيوب مباشر، مشاركة QR، تسليم سحابي، وجميع الملفات الأصلية.")}</p>
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
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <button type="button" disabled className="bs-card text-start opacity-60"><strong>{label("UAE male wedding", "زفاف رجالي في الإمارات")}</strong><p className="mt-2 text-sm">{label("Active lane", "المسار النشط")}</p></button>
        <button type="button" disabled className="bs-card text-start opacity-60">{label("Female wedding — Coming Soon", "زفاف نسائي — قريباً")}</button>
        <button type="button" disabled className="bs-card text-start opacity-60">{label("Aqd Al Qiran — Coming Soon", "عقد القران — قريباً")}</button>
      </div>
    </section>}

    {step === 2 && <section aria-labelledby="customize-heading">
      <h2 id="customize-heading" className="text-[clamp(1.7rem,3vw,2.5rem)]">{label("Customize your package", "خصص باقتك")}</h2>

      <fieldset className="mt-6">
        <legend className="bs-legend">{label("Extra coverage hours", "ساعات تغطية إضافية")}</legend>
        <p className="mt-1 text-sm text-[color:var(--color-muted)]">{verified ? label(`${formatAed(tier ? pricing.addons.extra_hour.tier_pricing[tier] : 750)} per extra hour`, `${formatAed(tier ? pricing.addons.extra_hour.tier_pricing[tier] : 750)} لكل ساعة إضافية`) : label("Verify mobile to view detailed prices", "تحقق من الهاتف لعرض الأسعار التفصيلية")}</p>
        <select className="bs-input mt-3 max-w-xs" value={addons.extraHours} onChange={(e) => setAddons({ ...addons, extraHours: Number(e.target.value) })}>
          <option value={0}>{label("No extra hours", "لا ساعات إضافية")}</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
        </select>
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
        <legend className="bs-legend">{label("Optional guest programme screens", "شاشات برنامج الضيوف الاختيارية")}</legend>
        <p className="mt-1 text-sm text-[color:var(--color-muted)]">{label("Choose a size for Big Story review. Supplier-dependent screen options require price confirmation.", "اختر حجماً لمراجعة بيك ستوري. خيارات الشاشات المعتمدة على المورد تتطلب تأكيد السعر.")}</p>
        <select className="bs-input mt-3 max-w-xs" value={guestScreen} onChange={(event) => setGuestScreen(event.target.value)}>
          <option value="">{label("No guest screens", "لا شاشات للضيوف")}</option>
          <option value="55-inch TV">55-inch TV</option><option value="65-inch TV">65-inch TV</option><option value="75-inch TV">75-inch TV</option><option value="85-inch TV">85-inch TV</option><option value="Modular LED wall">{label("Modular LED wall", "جدار LED معياري")}</option>
        </select>
        {guestScreen && <p className="mt-3 text-sm font-semibold text-[color:var(--color-gold)]">{label("Price Confirmation Required", "تأكيد السعر مطلوب")}</p>}
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
      <div className="mt-5 grid gap-3 sm:grid-cols-2"><button disabled type="button" className="bs-card text-start opacity-60">Instagram Live — Coming Soon</button><button disabled type="button" className="bs-card text-start opacity-60">YouTube + Instagram simulcast — Coming Soon</button></div>
    </section>}

    {step === 3 && <section aria-labelledby="otp-heading" className="max-w-2xl"><h2 id="otp-heading" className="text-[clamp(1.7rem,3vw,2.5rem)]">{label("Verify to view your quotation", "تحقق لعرض عرض الأسعار")}</h2><p className="mt-4 text-[color:var(--color-muted)]">{label("You can browse and configure without an account. We ask for your name and a verified mobile number only before showing your quotation summary. OTP verification does not confirm availability, price approval, payment or booking.", "يمكنك التصفح والتخصيص دون حساب. نطلب اسمك ورقم هاتف محمول تم التحقق منه فقط قبل عرض ملخص عرض الأسعار. التحقق برمز لمرة واحدة لا يؤكد التوفر أو اعتماد السعر أو الدفع أو الحجز.")}</p><div className="mt-6 grid gap-4"><label className="bs-label">{label("Name", "الاسم")}<input className="bs-input mt-2" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} /></label><label className="bs-label">{label("Mobile", "الهاتف المحمول")}<input className="bs-input mt-2" dir="ltr" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} /></label>{!otpSent ? <button className="bs-btn bs-btn-gold w-fit" type="button" onClick={() => setOtpSent(true)}>{label("Send simulated code", "أرسل رمزاً تجريبياً")}</button> : <><p className="text-sm text-[color:var(--color-muted)]">{label("No real SMS is sent. Use 000000 for this internal prototype.", "لا يتم إرسال رسالة SMS حقيقية. استخدم 000000 لهذا النموذج الداخلي.")}</p><label className="bs-label">OTP<input className="bs-input mt-2" dir="ltr" autoComplete="one-time-code" inputMode="numeric" value={otp} onChange={(e) => setOtp(e.target.value)} /></label><button className="bs-btn bs-btn-gold w-fit" type="button" onClick={verifyOtp}>{label("Verify code", "تحقق من الرمز")}</button></>}{verified && <p className="text-sm text-[color:var(--color-success)]">{label("Mobile verified for this browser session.", "تم التحقق من الهاتف لهذه الجلسة في المتصفح.")}</p>}</div></section>}

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
            {addons.extraHours > 0 && <li className="flex justify-between"><span>{label(`${addons.extraHours} extra hour${addons.extraHours > 1 ? "s" : ""}`, `${addons.extraHours} ساعة إضافية`)}</span><span>{formatAed(addons.extraHours * (pricing.addons.extra_hour.tier_pricing[tier!]))}</span></li>}
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

        {guestScreen && <div className="mt-6 border-s-2 border-[color:var(--color-gold)] ps-4 text-sm">
          <p className="font-semibold">{label("Guest screen requested", "شاشة ضيوف مطلوبة")}: {guestScreen}</p>
          <p className="mt-1 text-[color:var(--color-muted)]">{label("Price Confirmation Required: this supplier-dependent option is excluded from the verified subtotal until Big Story reviews it.", "تأكيد السعر مطلوب: هذا الخيار المعتمد على المورد مستثنى من الإجمالي المتحقق حتى تراجعه بيك ستوري.")}</p>
        </div>}

        <div className="mt-6 border-t border-[color:var(--color-line)] pt-4">
          <dl className="flex justify-between">
            <dt className="text-lg font-semibold">{label(guestScreen ? "Verified subtotal" : "Total", guestScreen ? "الإجمالي المتحقق" : "الإجمالي")}</dt>
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
