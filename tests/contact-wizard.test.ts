import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import {
  SERVICES,
  BUDGETS,
  TIMELINES,
  SOURCES,
  MAX,
  EMAIL_RE,
  isValidEmail,
  isAllowedValue,
  optionsFor,
  normalizeUaePhone,
  validateBrief,
  hasErrors,
} from "../src/lib/contact.ts";
import { waBriefLinkFromState, waBriefLink, SITE } from "../src/lib/site.ts";
import { contact } from "../src/data/copy.ts";

const MSG = { name: "name", email: "email", phone: "phone", required: "required" };

/* ---- Option sets ---- */

test("service/budget/timeline/source have the exact spec counts in both locales", () => {
  assert.equal(SERVICES.en.length, 8);
  assert.equal(SERVICES.ar.length, 8);
  assert.equal(BUDGETS.en.length, 6);
  assert.equal(BUDGETS.ar.length, 6);
  assert.equal(TIMELINES.en.length, 8);
  assert.equal(TIMELINES.ar.length, 8);
  assert.equal(SOURCES.en.length, 9);
  assert.equal(SOURCES.ar.length, 9);
});

test("no budget option mentions the forbidden 250K tier", () => {
  for (const locale of ["en", "ar"] as const) {
    for (const b of BUDGETS[locale]) {
      assert.ok(!b.includes("250"), `budget "${b}" must not reference 250K`);
    }
  }
});

test("allowlist accepts both EN and AR labels and rejects junk", () => {
  assert.ok(isAllowedValue("service", SERVICES.en[0]));
  assert.ok(isAllowedValue("service", SERVICES.ar[0]));
  assert.ok(isAllowedValue("budget", BUDGETS.ar[2]));
  assert.ok(isAllowedValue("timeline", TIMELINES.en[3]));
  assert.ok(isAllowedValue("source", SOURCES.ar[1]));
  assert.ok(!isAllowedValue("service", "definitely not a service"));
  assert.ok(!isAllowedValue("budget", "AED 999,999"));
});

test("optionsFor returns the locale-specific list", () => {
  assert.deepEqual(optionsFor("service", "en"), SERVICES.en);
  assert.deepEqual(optionsFor("source", "ar"), SOURCES.ar);
});

/* ---- Email ---- */

test("email validation matches the RFC-ish regex", () => {
  assert.ok(isValidEmail("a@b.co"));
  assert.ok(isValidEmail("saeed@filmwithbigstory.com"));
  assert.ok(!isValidEmail("nope"));
  assert.ok(!isValidEmail("a@b"));
  assert.ok(!isValidEmail("a b@c.com"));
  assert.equal(EMAIL_RE.test("x@y.z"), true);
});

/* ---- Phone normalisation ---- */

test("UAE phone forms normalise to E.164 +9715XXXXXXXX", () => {
  const expected = "+971528418108";
  assert.equal(normalizeUaePhone("+971 52 841 8108"), expected);
  assert.equal(normalizeUaePhone("971528418108"), expected);
  assert.equal(normalizeUaePhone("00971528418108"), expected);
  assert.equal(normalizeUaePhone("0528418108"), expected);
  assert.equal(normalizeUaePhone("528418108"), expected);
  assert.equal(normalizeUaePhone("052-841-8108"), expected);
});

test("invalid phone numbers are rejected", () => {
  assert.equal(normalizeUaePhone(""), null);
  assert.equal(normalizeUaePhone("12345"), null);
  assert.equal(normalizeUaePhone("+1 202 555 0123"), null); // not UAE
  assert.equal(normalizeUaePhone("0428418108"), null); // landline prefix, not mobile 5
  assert.equal(normalizeUaePhone("abcdefg"), null);
});

/* ---- validateBrief ---- */

test("validateBrief passes a complete valid brief", () => {
  const r = validateBrief(
    {
      name: "Saeed",
      phone: "0528418108",
      email: "saeed@filmwithbigstory.com",
      service: SERVICES.en[0],
      budget: BUDGETS.en[1],
      timeline: TIMELINES.en[2],
    },
    MSG
  );
  assert.equal(hasErrors(r), false);
  assert.equal(r.normalizedPhone, "+971528418108");
});

test("validateBrief flags each missing/invalid field", () => {
  const r = validateBrief({ name: "", phone: "123", email: "bad", service: "x", budget: "", timeline: "" }, MSG);
  assert.equal(r.fieldErrors.name, "name");
  assert.equal(r.fieldErrors.email, "email");
  assert.equal(r.fieldErrors.phone, "phone");
  assert.equal(r.fieldErrors.service, "required");
  assert.equal(r.fieldErrors.budget, "required");
  assert.equal(r.fieldErrors.timeline, "required");
});

test("correcting an invalid field re-validates to no error (deterministic clear)", () => {
  const base = { name: "Saeed", phone: "0528418108", service: SERVICES.en[0], budget: BUDGETS.en[0], timeline: TIMELINES.en[0] };
  // First pass: bad email produces an email error.
  const bad = validateBrief({ ...base, email: "bad" }, MSG);
  assert.equal(bad.fieldErrors.email, "email");
  // Second pass on the corrected value: a full re-validation yields no email error,
  // so a step-3 error map that is REPLACED (not merged) leaves nothing stale.
  const good = validateBrief({ ...base, email: "qa@example.com" }, MSG);
  assert.equal(good.fieldErrors.email, undefined);
  assert.equal(hasErrors(good), false);
  assert.equal(isValidEmail("qa@example.com"), true);
});

test("validateBrief rejects over-length name", () => {
  const r = validateBrief(
    { name: "a".repeat(MAX.name + 1), phone: "0528418108", email: "a@b.co", service: SERVICES.en[0], budget: BUDGETS.en[0], timeline: TIMELINES.en[0] },
    MSG
  );
  assert.equal(r.fieldErrors.name, "name");
});

/* ---- Field limits ---- */

test("field limits match the spec (name/company 120, message 2000)", () => {
  assert.equal(MAX.name, 120);
  assert.equal(MAX.company, 120);
  assert.equal(MAX.message, 2000);
});

/* ---- WhatsApp state-aware deep link ---- */

test("waBriefLinkFromState falls back to the static template when empty", () => {
  assert.equal(waBriefLinkFromState(), waBriefLink);
  assert.equal(waBriefLinkFromState({}), waBriefLink);
});

test("waBriefLinkFromState injects the selected chips and targets the WA number", () => {
  const link = waBriefLinkFromState({ service: "Brand film", budget: "AED 100,000+", timeline: "1 – 2 weeks" });
  assert.ok(link.startsWith(`https://wa.me/${SITE.whatsapp}?text=`));
  const text = decodeURIComponent(link.split("text=")[1]);
  assert.ok(text.includes("Project type: Brand film"));
  assert.ok(text.includes("Budget: AED 100,000+"));
  assert.ok(text.includes("Timeline: 1 – 2 weeks"));
});

/* ---- Bilingual copy completeness ---- */

test("every wizard + validation string has non-empty EN and AR", () => {
  const groups = [contact.wizard, contact.validation] as Record<string, Record<string, string>>[];
  for (const group of groups) {
    for (const [key, value] of Object.entries(group)) {
      assert.ok(value.en && value.en.trim().length > 0, `missing EN for ${key}`);
      assert.ok(value.ar && value.ar.trim().length > 0, `missing AR for ${key}`);
    }
  }
});

test("no wizard/validation AR string leaks Latin letters except allowed tokens", () => {
  // AR copy may legitimately contain the placeholder slots {n}/{total}/{privacyPolicy}
  // and the phone example "+971 5X XXX XXXX"; strip those before checking.
  const allowGroups = [contact.wizard, contact.validation] as Record<string, Record<string, string>>[];
  for (const group of allowGroups) {
    for (const [key, value] of Object.entries(group)) {
      const stripped = value.ar
        .replace(/\{[a-zA-Z]+\}/g, "")
        .replace(/\+?971 5X XXX XXXX/g, "");
      assert.ok(!/[a-zA-Z]/.test(stripped), `AR copy for ${key} leaks Latin: "${value.ar}"`);
    }
  }
});

test("Arabic step label uses interpolation slots", () => {
  assert.ok(contact.wizard.stepLabel.ar.includes("{n}"));
  assert.ok(contact.wizard.stepLabel.ar.includes("{total}"));
  assert.ok(contact.wizard.stepLabel.en.includes("{n}"));
});

/* ---- Honeypot CSS: no RTL horizontal overflow (P0 regression) ---- */

function honeypotRule(): string {
  const cssPath = fileURLToPath(new URL("../src/app/globals.css", import.meta.url));
  const css = readFileSync(cssPath, "utf8");
  const start = css.indexOf(".bs-honeypot");
  assert.ok(start >= 0, ".bs-honeypot rule not found in globals.css");
  const open = css.indexOf("{", start);
  const close = css.indexOf("}", open);
  assert.ok(open >= 0 && close > open, ".bs-honeypot rule is malformed");
  return css.slice(open + 1, close);
}

test("honeypot CSS never uses off-canvas -9999px (would expand RTL scroll width)", () => {
  const rule = honeypotRule();
  assert.ok(!rule.includes("-9999px"), "honeypot must not use -9999px offset");
  assert.ok(!/inset-inline-start:\s*-/.test(rule), "honeypot must not use a negative inline-start offset");
});

test("honeypot CSS uses clip-based visually-hidden pattern", () => {
  const rule = honeypotRule();
  assert.ok(/clip-path:\s*inset\(50%\)/.test(rule), "honeypot must use clip-path: inset(50%)");
  assert.ok(/clip:\s*rect\(0 0 0 0\)/.test(rule), "honeypot must use clip: rect(0 0 0 0)");
  assert.ok(/overflow:\s*hidden/.test(rule), "honeypot must set overflow: hidden");
  assert.ok(/width:\s*1px/.test(rule) && /height:\s*1px/.test(rule), "honeypot must be 1px×1px");
});
