import assert from "node:assert/strict";
import test from "node:test";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel: string) => readFileSync(join(ROOT, rel), "utf8");

const WIZARD = "src/components/wedding-quotation/WeddingQuotationWizard.tsx";
const PRICING = "src/data/wedding-quotation-pricing.json";
const PAYMENT = "src/components/PaymentOptions.tsx";
const LEGACY_HUB = "src/app/[locale]/services/weddings/page.tsx";
const SESSION_API = "src/app/api/wedding-session/route.ts";
const FEMALE_PAGE = "src/app/[locale]/services/female-wedding/page.tsx";
const KATB_PAGE = "src/app/[locale]/services/katb-kitab-aqd-al-qiran/page.tsx";

test("P0 pricing exposes controlled service lanes and only male package totals", () => {
  const pricing = JSON.parse(read(PRICING));
  assert.equal(pricing.release_status, "CONTROLLED");
  assert.equal(pricing.services.male.price_release_state, "PROVISIONAL_APPROVED_PRESENTATION");
  for (const lane of ["female", "katb_male", "katb_female", "katb_both"]) {
    assert.equal(pricing.services[lane].price_release_state, "REVIEWED_STARTING_POINT");
    assert.equal(pricing.services[lane].fixed_totals_released, false);
  }
  assert.deepEqual(Object.keys(pricing.addons), ["led_wall_status"]);
});

test("P0 wizard does not persist session PII and labels review-only payments", () => {
  const wizard = read(WIZARD);
  assert.ok(!wizard.includes("/api/wedding-session"));
  assert.ok(!wizard.includes("logSession("));
  assert.ok(wizard.includes("not a booking or payment"));
  assert.ok(read(PRICING).includes("Production Assistant"));
});

test("P0 payment options keep Tabby unavailable and defer payment until quotation approval", () => {
  const payment = read(PAYMENT);
  assert.ok(payment.includes("planned — unavailable"));
  assert.ok(!payment.includes("interest-free"));
  assert.ok(payment.includes("100% after Big Story approves the quotation and before date confirmation"));
  assert.ok(!payment.includes("IBAN:"));
});

test("P0 old wedding hub redirects to canonical /weddings", () => {
  const legacyHub = read(LEGACY_HUB);
  assert.ok(legacyHub.includes('redirect(localizedPath(locale, "/weddings"))'));
  for (const stale of ["RED Komodo", "60+ weddings", "AED 2,500", "planner commission"]) {
    assert.ok(!legacyHub.includes(stale));
  }
});

test("P0 session endpoint is disabled without filesystem persistence", () => {
  assert.ok(existsSync(join(ROOT, SESSION_API)));
  const route = read(SESSION_API);
  assert.ok(route.includes("status: 410"));
  assert.ok(!route.includes("writeFile"));
  assert.ok(!route.includes("request.json"));
});

test("P0 female lane has no social, QR, livestream, display, or payment-installment leakage", () => {
  const page = read(FEMALE_PAGE).toLowerCase();
  for (const forbidden of ["social cut", "qr", "livestream", "display screens", "interest-free", "pay cash on event day", "/ month for 4 months", "fx6 crane"]) {
    assert.ok(!page.includes(forbidden), `forbidden female content: ${forbidden}`);
  }
  assert.ok(page.includes("female licensed pic"));
  assert.ok(page.includes("private family delivery"));
});

test("P0 Katb lane separates male features from women-side privacy and pending encoder workflow", () => {
  const page = read(KATB_PAGE);
  assert.ok(page.includes("male side only"));
  assert.ok(page.includes("female videographer"));
  assert.ok(page.includes("female photographer"));
  assert.ok(page.includes("female Arabic-proficient sound recordist"));
  assert.ok(page.includes("activation-pending"));
  assert.ok(!page.includes("dedicated operator"));
});
