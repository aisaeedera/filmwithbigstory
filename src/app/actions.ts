"use server";

import { SITE } from "@/lib/site";
import { isLocale, type Locale } from "@/lib/i18n";
import { contact } from "@/data/copy";
import { MAX, validateBrief, type BriefFieldError } from "@/lib/contact";

export type FieldErrors = Partial<Record<BriefFieldError, string>>;

export type FormState = {
  ok: boolean;
  error?: string;
  message?: string;
  fieldErrors?: FieldErrors;
  // Categorical selections echoed back so the success card's WhatsApp button
  // can pre-fill what was just submitted. Never contains name/phone/email.
  selection?: { service?: string; budget?: string; timeline?: string };
};

function pick<T>(value: Record<Locale, T>, locale: Locale): T {
  return value[locale];
}

function localeFrom(formData: FormData): Locale {
  const raw = formData.get("locale");
  return typeof raw === "string" && isLocale(raw) ? raw : "en";
}

// Attempt a durable delivery rail. Resolves to true only on a confirmed 2xx.
async function postJson(url: string, body: unknown, token?: string): Promise<boolean> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function verifyTurnstile(token: string, secret: string, ip?: string): Promise<boolean> {
  try {
    const form = new URLSearchParams();
    form.set("secret", secret);
    form.set("response", token);
    if (ip) form.set("remoteip", ip);
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: form,
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

export async function submitBrief(_prev: FormState, formData: FormData): Promise<FormState> {
  const locale = localeFrom(formData);
  const v = contact.validation;

  // Honeypot — bots fill hidden fields. Return the same success shape as a real
  // submission so a bot can't fingerprint the trap; drop the lead silently and
  // log a non-PII marker for rate-limit tuning.
  if (formData.get("company_url")) {
    console.warn("[brief] honeypot tripped — dropped (spam)");
    return { ok: true, message: pick(contact.wizard.successBody, locale) };
  }

  const data: Record<string, string> = {};
  for (const [k, v2] of formData.entries()) {
    if (typeof v2 === "string") data[k] = v2.trim();
  }

  // Anti-spam: Cloudflare Turnstile. Only enforced when configured. If exactly
  // one of the two keys is present, fail closed (misconfiguration must not open
  // a hole). If neither is set, skip (degrade safely — no broken widget).
  const tsSite = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const tsSecret = process.env.TURNSTILE_SECRET_KEY;
  if (tsSite && tsSecret) {
    const token = data["cf-turnstile-response"];
    const ok = token ? await verifyTurnstile(token, tsSecret) : false;
    if (!ok) return { ok: false, error: pick(v.send, locale) };
  } else if (tsSite || tsSecret) {
    console.error("[brief] Turnstile misconfigured — only one key set; failing closed");
    return { ok: false, error: pick(v.send, locale) };
  }

  // Per-field validation (mirrors the client; never trust the client).
  const { fieldErrors, normalizedPhone } = validateBrief(data, {
    name: pick(v.name, locale),
    email: pick(v.email, locale),
    phone: pick(v.phone, locale),
    required: pick(v.required, locale),
  });

  // Length guards on the free-text fields (bots/oversized payloads).
  if ((data.company && data.company.length > MAX.company) || (data.message && data.message.length > MAX.message)) {
    return { ok: false, error: pick(v.send, locale) };
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors, selection: { service: data.service, budget: data.budget, timeline: data.timeline } };
  }

  const phone = normalizedPhone ?? data.phone;
  const summary = [
    `New brief from ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${phone}`,
    data.company ? `Company: ${data.company}` : null,
    `Service: ${data.service}`,
    `Budget: ${data.budget}`,
    `Timeline: ${data.timeline}`,
    data.source ? `Source: ${data.source}` : null,
    "",
    data.message || "(no message)",
  ]
    .filter(Boolean)
    .join("\n");

  // ── Durable delivery rails ────────────────────────────────────────────────
  // A real lead is only reported as "sent" when at least one durable rail
  // confirms delivery. The old console.info fallback silently swallowed leads —
  // that is data loss and is removed. Env-configured only; no invented URLs.
  const resendKey = process.env.RESEND_API_KEY;
  const inbox = process.env.LEAD_INBOX || SITE.email;
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  const crmUrl = process.env.CRM_WEBHOOK_URL;

  const attempts: Promise<boolean>[] = [];

  if (resendKey) {
    attempts.push(
      (async () => {
        try {
          const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
            body: JSON.stringify({
              from: "Big Story Website <brief@filmwithbigstory.com>",
              to: [inbox],
              reply_to: data.email,
              subject: `New project brief — ${data.name} (${data.service})`,
              text: summary,
            }),
          });
          return res.ok;
        } catch {
          return false;
        }
      })()
    );
  }

  const leadPayload = {
    name: data.name,
    email: data.email,
    phone,
    company: data.company || undefined,
    service: data.service,
    budget: data.budget,
    timeline: data.timeline,
    source: data.source || undefined,
    message: data.message ? data.message.slice(0, 200) : undefined,
    locale,
  };

  if (webhookUrl) attempts.push(postJson(webhookUrl, leadPayload, process.env.LEAD_WEBHOOK_TOKEN));
  if (crmUrl) attempts.push(postJson(crmUrl, leadPayload, process.env.CRM_WEBHOOK_TOKEN));

  const selection = { service: data.service, budget: data.budget, timeline: data.timeline };

  if (attempts.length === 0) {
    // No delivery configured at all — do NOT fake success (would lose the lead).
    console.error("[brief] no delivery rail configured (RESEND_API_KEY / LEAD_WEBHOOK_URL / CRM_WEBHOOK_URL all unset) — lead not deliverable");
    return { ok: false, error: pick(v.send, locale), selection };
  }

  const results = await Promise.all(attempts);
  const delivered = results.some(Boolean);

  if (!delivered) {
    console.error("[brief] all configured delivery rails failed");
    return { ok: false, error: pick(v.send, locale), selection };
  }

  if (results.some((r) => !r)) {
    // Partial failure — lead is safe (at least one rail succeeded) but flag it.
    console.warn("[brief] partial delivery — one or more rails failed");
  }

  return { ok: true, message: pick(contact.wizard.successBody, locale), selection };
}
