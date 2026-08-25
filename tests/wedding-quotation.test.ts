import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel: string) => readFileSync(join(ROOT, rel), "utf8");

const PAGE = "src/app/[locale]/wedding-quotation/page.tsx";
const WIZARD = "src/components/wedding-quotation/WeddingQuotationWizard.tsx";
const PRICING = "src/data/wedding-quotation-pricing.json";

test("quotation route is bilingual, noindexed, and renders the protected wizard", () => {
  const page = read(PAGE);
  assert.ok(page.includes("noindex: true"));
  assert.ok(page.includes("follow: false"));
  assert.ok(page.includes("WeddingQuotationWizard"));
  assert.ok(page.includes('path: "/wedding-quotation"'));
});

test("wedding and groom pages link to the quotation funnel in both locales", () => {
  for (const page of ["src/app/[locale]/services/weddings/page.tsx", "src/app/[locale]/services/groom-wedding-services/page.tsx"]) {
    assert.ok(read(page).includes('localizedPath(locale, "/wedding-quotation")'), `${page} must link to the quotation funnel`);
  }
});

test("quotation flow reads the approved client-safe export and gates detailed prices behind OTP", () => {
  const pricing = JSON.parse(read(PRICING));
  assert.equal(pricing.schema_id, "bigstory.media.wedding.pricing_export.v1");
  assert.equal(pricing.client_price_released, true);
  assert.equal(pricing.release_status, "LIVE");
  const wizard = read(WIZARD);
  assert.ok(wizard.includes('import pricing from "@/data/wedding-quotation-pricing.json"'));
  assert.ok(wizard.includes("Price Confirmation Required"));
  assert.ok(wizard.includes("verified ? formatAed"), "pricing must remain hidden before OTP verification");
  assert.ok(!wizard.includes("priceAed: 16000"), "the wizard must not maintain an independent price list");
});

test("quotation flow protects PII and blocks booking/payment", () => {
  const wizard = read(WIZARD);
  for (const required of [
    'autoComplete="name"',
    'autoComplete="tel"',
    "one-time-code",
    "No real SMS is sent",
    "Submit for Big Story review",
    "payment or booking",
    "const [name, setName]",
    "const [phone, setPhone]",
  ]) {
    assert.ok(wizard.includes(required), `missing protected-flow control: ${required}`);
  }
  assert.ok(!wizard.includes("trackEvent("), "quotation PII must never be forwarded to analytics");
});

test("quotation flow has the required available, included, and disabled controls", () => {
  const wizard = read(WIZARD);
  for (const required of [
    "UAE male wedding",
    "Female wedding",
    "Aqd Al Qiran",
    "Coming Soon",
    "Crane/jib coverage with a supplier-provided operator",
    "two display-only QR screens: one inside the hall and one near the exit",
    "50 edited photographs",
    "100 edited photographs",
    "150 edited photographs",
    "60 days",
    "authorized client requests removal",
    "55-inch TV",
    "85-inch TV",
    "Modular LED wall",
  ]) {
    assert.ok(wizard.includes(required), `missing requirement: ${required}`);
  }
  assert.ok(!wizard.includes('id === "basic"'), "the non-crane Basic package must not be selectable");
  assert.match(wizard, /disabled[^>]*>\s*Coming Soon|Coming Soon[\s\S]{0,250}disabled/);
});
