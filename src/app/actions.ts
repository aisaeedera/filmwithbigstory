"use server";

import { SITE } from "@/lib/site";

export type FormState = {
  ok: boolean;
  error?: string;
  message?: string;
};

const REQUIRED = ["name", "email", "service", "budget", "timeline", "source", "message"] as const;

export async function submitBrief(_prev: FormState, formData: FormData): Promise<FormState> {
  // Honeypot — bots fill hidden fields
  if (formData.get("company_url")) {
    return { ok: true, message: "Thanks — we'll be in touch within one business day." };
  }

  const data: Record<string, string> = {};
  for (const [k, v] of formData.entries()) {
    if (typeof v === "string") data[k] = v.trim();
  }

  for (const field of REQUIRED) {
    if (!data[field]) {
      return { ok: false, error: `Please complete all required fields.` };
    }
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  const summary = [
    `New brief from ${data.name}`,
    `Email: ${data.email}`,
    data.phone ? `Phone: ${data.phone}` : null,
    data.company ? `Company: ${data.company}` : null,
    `Service: ${data.service}`,
    `Budget: ${data.budget}`,
    `Timeline: ${data.timeline}`,
    `Source: ${data.source}`,
    "",
    data.message,
  ]
    .filter(Boolean)
    .join("\n");

  // Wire transactional email when the key is present (Resend).
  // TODO(client): set RESEND_API_KEY + LEAD_INBOX in Vercel env — see CLIENT_HANDOFF.md
  const key = process.env.RESEND_API_KEY;
  const inbox = process.env.LEAD_INBOX || SITE.email;
  if (key) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: "Big Story Website <brief@filmwithbigstory.com>",
          to: [inbox],
          reply_to: data.email,
          subject: `New project brief — ${data.name} (${data.service})`,
          text: summary,
        }),
      });
      if (!res.ok) throw new Error(`Resend ${res.status}`);
    } catch {
      return {
        ok: false,
        error: "Something went wrong sending your brief. Please WhatsApp or email us directly.",
      };
    }
  } else {
    // No email provider configured yet — record server-side so nothing is lost.
    console.info("[brief] lead received (email provider not configured):\n" + summary);
  }

  return { ok: true, message: "Thanks — your brief is in. We'll reply within one business day." };
}
