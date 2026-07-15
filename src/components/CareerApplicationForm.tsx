"use client";

import { useState } from "react";
import { CAREER_POSITIONS } from "@/lib/careers/positions";
import { SITE } from "@/lib/site";
import type { Locale } from "@/lib/i18n";

const copy = {
  en: {
    name: "Full name",
    email: "Email address",
    phone: "Phone / WhatsApp",
    role: "Position interested in",
    note: "Brief note",
    notePlaceholder: "Tell us about your experience, availability and UAE base.",
    submit: "Join the talent network",
    submitting: "Saving your profile…",
    success: "Profile received. We will contact you when a suitable project opens.",
    error: "We could not save your profile. Please try again.",
  },
  ar: {
    name: "الاسم الكامل",
    email: "البريد الإلكتروني",
    phone: "الهاتف / واتساب",
    role: "الوظيفة المطلوبة",
    note: "نبذة قصيرة",
    notePlaceholder: "عرّفنا بخبرتك وتوفرك ومكان إقامتك في الإمارات.",
    submit: "انضم إلى شبكة المواهب",
    submitting: "جارٍ حفظ ملفك…",
    success: "استلمنا ملفك. سنتواصل معك عند توفر مشروع مناسب.",
    error: "تعذر حفظ ملفك. حاول مرة أخرى.",
  },
} as const;

const positionArabic: Record<(typeof CAREER_POSITIONS)[number], string> = {
  "DOP / Cinematographer": "مدير تصوير / سينماتوغرافر",
  "1st AC": "مساعد كاميرا أول",
  "Wedding Videographer": "مصور فيديو أعراس",
  "Wedding Photographer": "مصور أعراس",
  "Drone Operator": "مشغل درون مرخص",
  "Production Assistant": "مساعد إنتاج",
  "Arabic Liaison": "منسق عربي للمناسبات",
  "Editor / Colorist": "مونتير / مصحح ألوان",
  "Motion Designer": "مصمم موشن",
  "Social Media Manager": "مدير وسائل التواصل",
};

/**
 * Option C: fire-and-forget POST to a Google Form via a hidden iframe.
 *
 * Google Forms accepts `application/x-www-form-urlencoded` POSTs directly to its
 * `formResponse` endpoint. We can't use fetch() (CORS), and a top-level redirect
 * would break our success state — so we synthesise a real <form> whose target
 * is a hidden iframe named `gforms-hidden-iframe`. The browser does the POST
 * cross-origin, the iframe receives Google's confirmation page, and our local
 * state is untouched.
 *
 * Failures are intentionally swallowed: local storage (the source of truth) has
 * already accepted the application by the time this runs, and we don't want a
 * flaky Google Form to break the user-facing success state.
 *
 * Field IDs (`entry.XXXXXXXXXX`) live in `SITE.careersFormFields` — see
 * lessons/CAREERS_GOOGLE_FORM_SETUP.md for how to discover them.
 */
function postToGoogleForm(payload: Record<string, string>) {
  if (typeof document === "undefined") return;
  const iframeName = "gforms-hidden-iframe";
  // Ensure a target iframe exists (one per page, reused across submissions).
  let iframe = document.querySelector<HTMLIFrameElement>(`iframe[name="${iframeName}"]`);
  if (!iframe) {
    iframe = document.createElement("iframe");
    iframe.name = iframeName;
    iframe.setAttribute("aria-hidden", "true");
    iframe.tabIndex = -1;
    iframe.style.position = "absolute";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    iframe.style.opacity = "0";
    iframe.style.pointerEvents = "none";
    document.body.appendChild(iframe);
  }

  const form = document.createElement("form");
  form.method = "POST";
  form.action = SITE.careersFormAction;
  form.target = iframeName;
  form.style.display = "none";

  for (const [localKey, value] of Object.entries(payload)) {
    const entryId = SITE.careersFormFields[localKey as keyof typeof SITE.careersFormFields];
    if (!entryId) continue;
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = entryId;
    input.value = value;
    form.appendChild(input);
  }

  document.body.appendChild(form);
  try {
    form.submit();
  } catch {
    // Network / offline — silently ignored; local storage is the source of truth.
  }
  // Detach after the browser has had a moment to dispatch the POST.
  setTimeout(() => form.remove(), 0);
}

export default function CareerApplicationForm({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries()) as Record<string, string>;
    try {
      const response = await fetch("/api/careers/apply", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...payload, locale }),
      });
      if (!response.ok) throw new Error("application-failed");
      event.currentTarget.reset();
      // Fire-and-forget: forward to Google Form via hidden iframe (Option C).
      // Local storage is already the source of truth, so we don't await this.
      postToGoogleForm({ ...payload, locale });
      setState("success");
    } catch {
      setState("error");
    }
  }

  return (
    <form onSubmit={submit} className="bs-card space-y-5" aria-label={c.submit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="career-name" className="mb-2 block text-sm text-[color:var(--color-muted)]">{c.name}</label>
          <input id="career-name" name="name" required autoComplete="name" maxLength={120} className="w-full rounded-lg border bg-transparent px-4 py-3" />
        </div>
        <div>
          <label htmlFor="career-email" className="mb-2 block text-sm text-[color:var(--color-muted)]">{c.email}</label>
          <input id="career-email" name="email" required type="email" autoComplete="email" maxLength={254} className="w-full rounded-lg border bg-transparent px-4 py-3" />
        </div>
        <div>
          <label htmlFor="career-phone" className="mb-2 block text-sm text-[color:var(--color-muted)]">{c.phone}</label>
          <input id="career-phone" name="phone" required type="tel" autoComplete="tel" maxLength={40} className="w-full rounded-lg border bg-transparent px-4 py-3" />
        </div>
        <div>
          <label htmlFor="career-role" className="mb-2 block text-sm text-[color:var(--color-muted)]">{c.role}</label>
          <select id="career-role" name="role" required defaultValue="" className="w-full rounded-lg border bg-[color:var(--color-elevated)] px-4 py-3">
            <option value="" disabled>{c.role}</option>
            {CAREER_POSITIONS.map((position) => <option key={position} value={position}>{locale === "ar" ? positionArabic[position] : position}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="career-note" className="mb-2 block text-sm text-[color:var(--color-muted)]">{c.note}</label>
        <textarea id="career-note" name="note" rows={5} maxLength={2000} placeholder={c.notePlaceholder} className="w-full rounded-lg border bg-transparent px-4 py-3" />
      </div>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="career-company">Company</label>
        <input id="career-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <button type="submit" disabled={state === "loading"} className="bs-btn bs-btn-gold disabled:cursor-wait disabled:opacity-60">
        {state === "loading" ? c.submitting : c.submit}
      </button>
      <div aria-live="polite">
        {state === "success" ? <p className="text-sm text-emerald-300">{c.success}</p> : null}
        {state === "error" ? <p role="alert" className="text-sm text-red-300">{c.error}</p> : null}
      </div>
    </form>
  );
}