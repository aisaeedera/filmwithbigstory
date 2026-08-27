"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/i18n";
import type { WeddingIntakeData } from "./WeddingIntakeForm";
import pricing from "@/data/wedding-quotation-pricing.json";
import { SITE } from "@/lib/site";
import PaymentOptions from "@/components/PaymentOptions";

type ServiceKey = keyof typeof pricing.services;
type PackageId = keyof typeof pricing.services.male.packages;

const malePackages: Record<PackageId, { en: string; ar: string }> = {
  silver: { en: "Silver — Essential record", ar: "فضية — توثيق أساسي" },
  gold: { en: "Gold — Cinematic Wedding Story", ar: "ذهبية — قصة زفاف سينمائية" },
  platinum: { en: "Platinum — Expanded coverage", ar: "بلاتينية — تغطية موسعة" },
};

function serviceFor(intake?: WeddingIntakeData): ServiceKey {
  if (intake?.celebrationType === "bride-wedding") return "female";
  if (intake?.celebrationType === "katb-kitab") return (`katb_${intake.katbSetting || "male"}` as ServiceKey);
  return "male";
}

export default function WeddingQuotationWizard({ locale, intakeData }: { locale: Locale; intakeData?: WeddingIntakeData }) {
  const isAr = locale === "ar";
  const serviceKey = serviceFor(intakeData);
  const service = pricing.services[serviceKey];
  const [tier, setTier] = useState<PackageId | null>(null);
  const [name, setName] = useState("");
  const label = (en: string, ar: string) => isAr ? ar : en;
  const hasReleasedTotals = service.fixed_totals_released;
  const total = tier && hasReleasedTotals ? pricing.services.male.packages[tier] : null;
  const serviceName = service.name_en;
  const whatsapp = useMemo(() => `Hi Big Story, I would like a reviewed quotation. Service: ${serviceName}. ${tier ? `Package preference: ${malePackages[tier].en}. ` : ""}Name: ${name || "not provided"}. Please confirm availability, privacy/crew requirements, and final scope before payment or date confirmation.`, [serviceName, tier, name]);

  return <div className="mx-auto max-w-5xl" aria-live="polite">
    <p className="bs-eyebrow">{label("Reviewed quotation request", "طلب عرض سعر للمراجعة")}</p>
    <h2 className="mt-4 text-[clamp(1.7rem,3vw,2.5rem)]">{isAr ? serviceName : serviceName}</h2>
    <p className="mt-4 text-[color:var(--color-muted)]">{label("This is a preference request, not a booking or payment. Big Story confirms availability, crew, privacy and final scope in writing.", "هذا طلب تفضيل وليس حجزاً أو دفعاً. تؤكد بيك ستوري التوفر والطاقم والخصوصية والنطاق النهائي كتابياً.")}</p>

    {hasReleasedTotals ? <section className="mt-8" aria-labelledby="package-heading">
      <h3 id="package-heading" className="text-xl">{label("Male wedding package preference", "تفضيل باقة زفاف الرجال")}</h3>
      <p className="mt-2 text-sm text-[color:var(--color-muted)]">{label("Provisional approved presentation; pricing authority reconciliation remains on hold.", "عرض سعري مبدئي معتمد؛ مطابقة مرجعية التسعير لا تزال معلقة.")}</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-3">{(Object.keys(malePackages) as PackageId[]).map((id) => <label key={id} className="bs-card cursor-pointer"><input className="sr-only" type="radio" name="package" checked={tier === id} onChange={() => setTier(id)} /><h4 className="text-lg">{label(malePackages[id].en, malePackages[id].ar)}</h4><p className="mt-2 text-xl font-bold text-[color:var(--color-gold)]">AED {pricing.services.male.packages[id].toLocaleString("en-AE")}</p><p className="mt-3 text-sm text-[color:var(--color-muted)]">{label("Crane/jib included. Separate videographer and photographer roles.", "تغطية الرافعة/الجيب مشمولة. أدوار منفصلة لمصور الفيديو والمصور الفوتوغرافي.")}</p></label>)}</div>
    </section> : <section className="mt-8 bs-card"><h3 className="text-xl">{label("Reviewed starting point", "نقطة بداية خاضعة للمراجعة")}</h3><p className="mt-3 text-[color:var(--color-muted)]">{label("This lane has no released fixed total. Big Story will issue a final reviewed quotation after availability, crew, privacy and operational gates are confirmed.", "لا يوجد إجمالي ثابت منشور لهذه الخدمة. تصدر بيك ستوري عرضاً نهائياً بعد تأكيد التوفر والطاقم والخصوصية والمتطلبات التشغيلية.")}</p></section>}

    <section className="mt-8"><h3 className="text-xl">{label("Included for this service", "المشمول لهذه الخدمة")}</h3><ul className="mt-4 space-y-2">{service.inclusions.map((item) => <li key={item} className="flex gap-2 text-sm text-[color:var(--color-muted)]"><span aria-hidden>•</span>{item}</li>)}</ul>{"available_add_ons" in service && <><h4 className="mt-6 font-semibold">{label("Conditional options", "خيارات مشروطة")}</h4><p className="mt-2 text-sm text-[color:var(--color-muted)]">{service.available_add_ons?.join(" · ")}</p></>}</section>
    <section className="mt-8 bs-card"><h3 className="text-lg">{label("Your name (only placed in the WhatsApp message)", "اسمك (يوضع فقط في رسالة واتساب)")}</h3><input className="bs-input mt-3 w-full" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} placeholder={label("Your name", "اسمك")} /></section>
    {total && <p className="mt-6 text-2xl font-bold text-[color:var(--color-gold)]">{label("Package preference: ", "تفضيل الباقة: ")}AED {total.toLocaleString("en-AE")}</p>}
    <PaymentOptions locale={locale} />
    <a href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(whatsapp)}`} target="_blank" rel="noopener noreferrer" className="bs-btn bs-btn-gold mt-8 inline-flex">{label("Request Big Story review on WhatsApp", "اطلب مراجعة بيك ستوري عبر واتساب")}</a>
  </div>;
}