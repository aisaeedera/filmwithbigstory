"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitBrief, type FormState } from "@/app/actions";
import type { Locale } from "@/lib/i18n";

const copy = {
  name: { en: "Name", ar: "الاسم" },
  phone: { en: "Phone number", ar: "رقم الهاتف" },
  email: { en: "Email", ar: "البريد الإلكتروني" },
  company: { en: "Company name", ar: "اسم الشركة" },
  service: { en: "What do you need?", ar: "ماذا تحتاج؟" },
  budget: { en: "Budget range", ar: "نطاق الميزانية" },
  timeline: { en: "Project timeline", ar: "الجدول الزمني" },
  source: { en: "Where did you hear about us?", ar: "كيف سمعت عنا؟" },
  message: { en: "Message", ar: "الرسالة" },
  submit: { en: "Send my brief", ar: "أرسل ملخصي" },
  sending: { en: "Sending…", ar: "جارٍ الإرسال…" },
  optional: { en: "optional", ar: "اختياري" },
  choose: { en: "Select an option", ar: "اختر خياراً" },
} as const;

const services = {
  en: ["TVC & commercial", "Brand film", "Corporate video", "Product video", "Social content", "Event coverage", "Documentary", "Not sure yet"],
  ar: ["إعلان تلفزيوني", "فيلم تعريفي", "فيديو شركة", "فيديو منتج", "محتوى سوشيال", "تغطية فعالية", "فيلم وثائقي", "غير متأكد بعد"],
};
const budgets = {
  en: ["Under AED 5,000", "AED 5,000 – 15,000", "AED 15,000 – 50,000", "AED 50,000 – 100,000", "AED 100,000+", "TBA / Not sure yet"],
  ar: ["أقل من 5,000 درهم", "5,000 – 15,000 درهم", "15,000 – 50,000 درهم", "50,000 – 100,000 درهم", "100,000 درهم فأكثر", "غير محدد بعد"],
};
const timelines = {
  en: ["ASAP (under 1 week)", "1 – 2 weeks", "2 – 4 weeks", "1 – 2 months", "2 – 3 months", "3 – 6 months", "6 months+", "TBA / Flexible"],
  ar: ["في أسرع وقت (أقل من أسبوع)", "1 – 2 أسبوع", "2 – 4 أسابيع", "1 – 2 شهر", "2 – 3 أشهر", "3 – 6 أشهر", "6 أشهر فأكثر", "مرن / غير محدد"],
};
const sources = {
  en: ["Google", "Instagram", "Facebook", "YouTube", "TikTok", "LinkedIn", "Referral", "Word of mouth", "Other"],
  ar: ["جوجل", "إنستغرام", "فيسبوك", "يوتيوب", "تيك توك", "لينكدإن", "توصية", "كلام متناقل", "أخرى"],
};

const initial: FormState = { ok: false };

function Submit({ locale }: { locale: Locale }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="bs-btn bs-btn-gold w-full sm:w-auto" disabled={pending}>
      {pending ? copy.sending[locale] : copy.submit[locale]}
    </button>
  );
}

function Field({
  label,
  optional,
  children,
}: {
  label: string;
  optional?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-sm text-[color:var(--color-ink)]">
        {label}
        {optional && <span className="text-xs text-[color:var(--color-muted)]">({optional})</span>}
      </span>
      {children}
    </label>
  );
}

const inputCls =
  "w-full rounded-lg border border-[color:var(--color-line)] bg-[color:var(--color-bg)] px-4 py-3 text-[color:var(--color-ink)] outline-none transition focus:border-[color:var(--color-gold)]";

export default function ContactForm({ locale }: { locale: Locale }) {
  const [state, action] = useActionState(submitBrief, initial);

  if (state.ok) {
    return (
      <div
        role="status"
        className="rounded-xl border border-[color:var(--color-success)]/40 bg-[color:var(--color-elevated)] p-8"
      >
        <p className="font-[family-name:var(--font-display)] text-xl text-[color:var(--color-ink)]">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="grid gap-5" noValidate>
      {/* honeypot */}
      <input type="text" name="company_url" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={`${copy.name[locale]} *`}>
          <input name="name" required autoComplete="name" className={inputCls} />
        </Field>
        <Field label={copy.phone[locale]} optional={copy.optional[locale]}>
          <input name="phone" type="tel" autoComplete="tel" className={inputCls} />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={`${copy.email[locale]} *`}>
          <input name="email" type="email" required autoComplete="email" className={inputCls} />
        </Field>
        <Field label={copy.company[locale]} optional={copy.optional[locale]}>
          <input name="company" autoComplete="organization" className={inputCls} />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={`${copy.service[locale]} *`}>
          <select name="service" required defaultValue="" className={inputCls}>
            <option value="" disabled>{copy.choose[locale]}</option>
            {services[locale].map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </Field>
        <Field label={`${copy.budget[locale]} *`}>
          <select name="budget" required defaultValue="" className={inputCls}>
            <option value="" disabled>{copy.choose[locale]}</option>
            {budgets[locale].map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={`${copy.timeline[locale]} *`}>
          <select name="timeline" required defaultValue="" className={inputCls}>
            <option value="" disabled>{copy.choose[locale]}</option>
            {timelines[locale].map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </Field>
        <Field label={`${copy.source[locale]} *`}>
          <select name="source" required defaultValue="" className={inputCls}>
            <option value="" disabled>{copy.choose[locale]}</option>
            {sources[locale].map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </Field>
      </div>

      <Field label={`${copy.message[locale]} *`}>
        <textarea name="message" required rows={5} className={inputCls} />
      </Field>

      {state.error && (
        <p role="alert" className="text-sm text-[color:var(--color-error)]">
          {state.error}
        </p>
      )}

      <div>
        <Submit locale={locale} />
      </div>
    </form>
  );
}
