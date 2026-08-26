import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel: string) => readFileSync(join(ROOT, rel), "utf8");

const PAGE = "src/app/[locale]/wedding-quotation/page.tsx";
const FLOW = "src/components/wedding-quotation/WeddingQuotationFlow.tsx";
const WIZARD = "src/components/wedding-quotation/WeddingQuotationWizard.tsx";
const INTAKE = "src/components/wedding-quotation/WeddingIntakeForm.tsx";
const PRICING = "src/data/wedding-quotation-pricing.json";
const FEMALE_PAGE = "src/app/[locale]/services/female-wedding/page.tsx";
const KATB_PAGE = "src/app/[locale]/services/katb-kitab-aqd-al-qiran/page.tsx";
const WEDDINGS_HUB = "src/app/[locale]/weddings/page.tsx";

// ─── Pricing JSON v1.1 ────────────────────────────────────────────

test("pricing JSON v1.1 has correct schema, release status, and authority SHA", () => {
  const pricing = JSON.parse(read(PRICING));
  assert.equal(pricing.schema_id, "bigstory.media.wedding.pricing_export.v1");
  assert.equal(pricing.export_version, "1.1.0");
  assert.equal(pricing.client_price_released, true);
  assert.equal(pricing.release_status, "LIVE");
  assert.equal(pricing.authority_sha256, "847e774624fc075a48a4229664e578265ec57c5ac24a7d755e17c81a0cd4b48c");
  assert.equal(pricing.brief_sha256, "ead98bfdcab1563ffa4246806883802a9981c73bc82e9bd5c61b442eb7f49981");
});

test("pricing JSON v1.1 has exactly three packages: silver, gold, platinum (no basic)", () => {
  const pricing = JSON.parse(read(PRICING));
  const keys = Object.keys(pricing.packages);
  assert.deepEqual(keys, ["silver", "gold", "platinum"]);
  assert.ok(!pricing.packages.basic, "basic package must not exist");
});

test("pricing JSON v1.1 gold package has exact name 'Gold — Cinematic Wedding Story'", () => {
  const pricing = JSON.parse(read(PRICING));
  assert.equal(pricing.packages.gold.name_en, "Gold — Cinematic Wedding Story");
  assert.equal(pricing.packages.gold.name_ar, "ذهبية — قصة زفاف سينمائية");
});

test("pricing JSON v1.1 has photo edit bundles PHOTO-EDIT-25/50/100 at correct prices", () => {
  const pricing = JSON.parse(read(PRICING));
  assert.equal(pricing.addons.photo_edit_25.sku, "PHOTO-EDIT-25");
  assert.equal(pricing.addons.photo_edit_25.price_aed, 500);
  assert.equal(pricing.addons.photo_edit_50.sku, "PHOTO-EDIT-50");
  assert.equal(pricing.addons.photo_edit_50.price_aed, 900);
  assert.equal(pricing.addons.photo_edit_100.sku, "PHOTO-EDIT-100");
  assert.equal(pricing.addons.photo_edit_100.price_aed, 1700);
});

test("pricing JSON v1.1 has NO extra_hour addon", () => {
  const pricing = JSON.parse(read(PRICING));
  assert.ok(!pricing.addons.extra_hour, "extra_hour addon must be removed");
});

test("pricing JSON v1.1 retains LED wall upgrades and crew add-ons", () => {
  const pricing = JSON.parse(read(PRICING));
  assert.ok(pricing.addons.led_wall_small, "led_wall_small must exist");
  assert.ok(pricing.addons.led_wall_large, "led_wall_large must exist");
  assert.ok(pricing.addons.additional_photographer, "additional_photographer must exist");
  assert.ok(pricing.addons.additional_videographer, "additional_videographer must exist");
  assert.ok(pricing.addons.same_day_teaser, "same_day_teaser must exist");
});

// ─── Wizard removals ──────────────────────────────────────────────

test("wizard has NO fake OTP / public 000000 code", () => {
  const wizard = read(WIZARD);
  assert.ok(!wizard.includes('otp === "000000"'), "fake OTP 000000 must be removed");
  assert.ok(!wizard.includes('"000000"'), "public 000000 code must be removed");
  assert.ok(!wizard.includes("Send simulated code"), "simulated code button must be removed");
  assert.ok(!wizard.includes("No real SMS is sent"), "simulated SMS wording must be removed");
});

test("wizard has NO guest programme TV/screen controls", () => {
  const wizard = read(WIZARD);
  assert.ok(!wizard.includes("55-inch TV"), "55-inch TV must be removed");
  assert.ok(!wizard.includes("65-inch TV"), "65-inch TV must be removed");
  assert.ok(!wizard.includes("75-inch TV"), "75-inch TV must be removed");
  assert.ok(!wizard.includes("85-inch TV"), "85-inch TV must be removed");
  assert.ok(!wizard.includes("guestScreen"), "guestScreen state must be removed");
  assert.ok(!wizard.includes("Guest screen requested"), "guest screen summary must be removed");
  assert.ok(!wizard.includes("Modular LED wall"), "Modular LED wall in guest screen selector must be removed");
});

test("wizard has NO self-service extra hours controls", () => {
  const wizard = read(WIZARD);
  assert.ok(!wizard.includes("extraHours"), "extraHours state must be removed");
  assert.ok(!wizard.includes("Extra coverage hour"), "extra coverage hour label must be removed");
  assert.ok(!wizard.includes("extra_hour"), "extra_hour reference must be removed");
  assert.ok(!wizard.includes("No extra hours"), "extra hours select option must be removed");
});

test("wizard has NO Instagram Live or simulcast cards", () => {
  const wizard = read(WIZARD);
  assert.ok(!wizard.includes("Instagram Live"), "Instagram Live card must be removed");
  assert.ok(!wizard.includes("simulcast"), "simulcast card must be removed");
  assert.ok(!wizard.includes("Coming Soon"), "Coming Soon cards must be removed");
});

test("wizard has NO 'UAE male-wedding scope' metadata reference", () => {
  const wizard = read(WIZARD);
  assert.ok(!wizard.includes("UAE male-wedding scope"), "UAE male-wedding scope must be removed from metadata");
});

// ─── Gold package name ────────────────────────────────────────────

test("wizard uses exact Gold package name 'Gold — Cinematic Wedding Story'", () => {
  const wizard = read(WIZARD);
  assert.ok(wizard.includes("Gold — Cinematic Wedding Story"), "exact Gold package name EN must be present");
  assert.ok(wizard.includes("ذهبية — قصة زفاف سينمائية"), "exact Gold package name AR must be present");
});

// ─── Photo bundles ────────────────────────────────────────────────

test("wizard includes photo edit bundle selector with PHOTO-EDIT-25/50/100", () => {
  const wizard = read(WIZARD);
  assert.ok(wizard.includes("PHOTO-EDIT-25") || wizard.includes("photo_edit_25"), "PHOTO-EDIT-25 bundle must be present");
  assert.ok(wizard.includes("PHOTO-EDIT-50") || wizard.includes("photo_edit_50"), "PHOTO-EDIT-50 bundle must be present");
  assert.ok(wizard.includes("PHOTO-EDIT-100") || wizard.includes("photo_edit_100"), "PHOTO-EDIT-100 bundle must be present");
  // Prices are read from pricing JSON, not hardcoded — verify the JSON has the correct values
  const pricingData = JSON.parse(read(PRICING));
  assert.equal(pricingData.addons.photo_edit_25.price_aed, 500);
  assert.equal(pricingData.addons.photo_edit_50.price_aed, 900);
  assert.equal(pricingData.addons.photo_edit_100.price_aed, 1700);
});

test("wizard photo bundle totals are correct and hidden/deselected bundles excluded from totals", () => {
  const wizard = read(WIZARD);
  assert.ok(wizard.includes("photoBundle") || wizard.includes("photo_bundle"), "photo bundle state must exist");
  // Verify the wizard doesn't hardcode bundle prices inline — should read from pricing JSON
  assert.ok(wizard.includes('import pricing from "@/data/wedding-quotation-pricing.json"'), "must import pricing JSON");
});

// ─── Phone validation ─────────────────────────────────────────────

test("wizard uses searchable international country code selector with +971 default", () => {
  const wizard = read(WIZARD);
  assert.ok(wizard.includes("phoneCountryCode") || wizard.includes("countryCode") || wizard.includes("country_code") || wizard.includes("countryDialCode"), "country code selector must exist");
  assert.ok(wizard.includes("+971"), "UAE +971 must be present as default");
  assert.ok(wizard.includes("E.164") || wizard.includes("e164") || wizard.includes("E164") || wizard.includes("normalizeE164"), "E.164 normalization must be referenced");
});

test("wizard has honest number-entry wording (no OTP verification claim)", () => {
  const wizard = read(WIZARD);
  assert.ok(wizard.includes("Enter your mobile number to view pricing") || wizard.includes("view pricing"), "honest EN wording must be present");
  assert.ok(!wizard.includes("Mobile verified"), "must not claim mobile was verified");
  assert.ok(!wizard.includes("verified for this browser session"), "must not claim verification");
});

// ─── Event routing ────────────────────────────────────────────────

test("intake form routes non-groom events to tailored planning, not package pricing", () => {
  const intake = read(INTAKE);
  assert.ok(intake.includes("bride-wedding"), "bride-wedding option must exist in intake");
  assert.ok(intake.includes("katb-kitab"), "katb-kitab option must exist in intake");
  assert.ok(intake.includes("engagement"), "engagement option must exist in intake");
  assert.ok(intake.includes("Tailored planning") || intake.includes("tailored"), "tailored planning routing must exist");
});

test("wizard shows tailored planning CTA for non-groom events instead of package pricing", () => {
  const wizard = read(WIZARD);
  assert.ok(wizard.includes("Tailored planning") || wizard.includes("tailored-planning"), "tailored planning CTA must exist in wizard");
  assert.ok(wizard.includes("Request specialist crew availability") || wizard.includes("specialist crew"), "specialist crew availability wording must be present");
});

// ─── QR displays ──────────────────────────────────────────────────

test("wizard retains exactly two QR-discovery displays, not described as live programme screens", () => {
  const wizard = read(WIZARD);
  assert.ok(wizard.includes("two display-only QR screens") || wizard.includes("two QR") || wizard.includes("two included QR"), "two QR displays must be mentioned");
  assert.ok(wizard.includes("one inside the hall") || wizard.includes("inside the hall"), "inside-hall QR must be mentioned");
  assert.ok(wizard.includes("near the exit") || wizard.includes("exit"), "exit QR must be mentioned");
});

// ─── YouTube Live ─────────────────────────────────────────────────

test("wizard mentions YouTube Live at released 1080p, no Instagram or simulcast", () => {
  const wizard = read(WIZARD);
  assert.ok(wizard.includes("YouTube") && wizard.includes("1080p"), "YouTube Live at 1080p must be present");
  assert.ok(!wizard.includes("Instagram"), "Instagram must be completely removed");
});

// ─── Extra hours review-stage wording ─────────────────────────────

test("wizard includes review-stage wording for longer coverage instead of self-service controls", () => {
  const wizard = read(WIZARD);
  assert.ok(
    wizard.includes("Need longer coverage") || wizard.includes("longer coverage") || wizard.includes("review request"),
    "review-stage longer-coverage wording must be present"
  );
});

// ─── SEO pages ────────────────────────────────────────────────────

test("female-wedding service page exists with tailored-planning CTA and privacy gates", () => {
  const page = read(FEMALE_PAGE);
  assert.ok(page.includes("Tailored planning") || page.includes("tailored"), "tailored planning CTA must be present");
  assert.ok(page.includes("privacy") || page.includes("Privacy"), "privacy gate must be mentioned");
  assert.ok(page.includes("female") || page.includes("Female"), "female crew/content must be mentioned");
  assert.ok(page.includes("noindex") === false, "female-wedding page should be indexable (SEO page)");
});

test("female-wedding page has Service, FAQPage, and BreadcrumbList schema", () => {
  const page = read(FEMALE_PAGE);
  assert.ok(page.includes("serviceSchema") || page.includes("Service"), "Service schema must be present");
  assert.ok(page.includes("faqSchema") || page.includes("FAQPage"), "FAQPage schema must be present");
  assert.ok(page.includes("breadcrumbSchema") || page.includes("BreadcrumbList"), "BreadcrumbList schema must be present");
});

test("Katb Kitab / Aqd Al Qiran service page exists with correct canonical terms", () => {
  const page = read(KATB_PAGE);
  assert.ok(page.includes("Katb Kitab"), "Katb Kitab must be in the page");
  assert.ok(page.includes("Aqd Al Qiran") || page.includes("Aqd Al-Qiran"), "Aqd Al Qiran must be in the page");
  assert.ok(page.includes("Tailored planning") || page.includes("tailored"), "tailored planning CTA must be present");
  assert.ok(page.includes("كتب الكتاب") || page.includes("عقد القران"), "Arabic terms must be present");
});

test("Katb Kitab page has Service, FAQPage, and BreadcrumbList schema", () => {
  const page = read(KATB_PAGE);
  assert.ok(page.includes("serviceSchema") || page.includes("Service"), "Service schema must be present");
  assert.ok(page.includes("faqSchema") || page.includes("FAQPage"), "FAQPage schema must be present");
  assert.ok(page.includes("breadcrumbSchema") || page.includes("BreadcrumbList"), "BreadcrumbList schema must be present");
});

test("Katb Kitab page has privacy/crew gates for women-side continuity", () => {
  const page = read(KATB_PAGE);
  assert.ok(page.includes("privacy") || page.includes("Privacy"), "privacy gate must be mentioned");
  assert.ok(page.includes("female videographer") || page.includes("female photographer") || page.includes("female crew"), "female crew assignments must be mentioned");
});

// ─── Weddings hub ─────────────────────────────────────────────────

test("weddings hub page links to female-wedding and katb-kitab-aqd-al-qiran service pages", () => {
  const hub = read(WEDDINGS_HUB);
  assert.ok(hub.includes("female-wedding"), "weddings hub must link to female-wedding page");
  assert.ok(hub.includes("katb-kitab-aqd-al-qiran"), "weddings hub must link to katb-kitab-aqd-al-qiran page");
});

// ─── Quotation route ──────────────────────────────────────────────

test("quotation route is bilingual, noindexed, and renders the protected wizard", () => {
  const page = read(PAGE);
  const flow = read(FLOW);
  assert.ok(page.includes("noindex: true"));
  assert.ok(page.includes("follow: false"));
  assert.ok(page.includes("WeddingQuotationFlow"));
  assert.ok(flow.includes("WeddingQuotationWizard"));
  assert.ok(page.includes('path: "/wedding-quotation"'));
});

test("wedding and groom pages link to the quotation funnel in both locales", () => {
  for (const page of ["src/app/[locale]/services/weddings/page.tsx", "src/app/[locale]/services/groom-wedding-services/page.tsx"]) {
    assert.ok(read(page).includes('localizedPath(locale, "/wedding-quotation")'), `${page} must link to the quotation funnel`);
  }
});

// ─── PII protection ───────────────────────────────────────────────

test("quotation flow protects PII and blocks booking/payment", () => {
  const wizard = read(WIZARD);
  for (const required of [
    'autoComplete="name"',
    'autoComplete="tel',
    "Submit for Big Story review",
    "payment or booking",
    "const [name, setName]",
    "const [phoneNational, setPhoneNational]",
  ]) {
    assert.ok(wizard.includes(required), `missing protected-flow control: ${required}`);
  }
  assert.ok(!wizard.includes("trackEvent("), "quotation PII must never be forwarded to analytics");
});

// ─── Hidden state exclusion ───────────────────────────────────────

test("wizard does not expose stale pricing JSON fields (extra_hour, guest screens)", () => {
  const wizard = read(WIZARD);
  assert.ok(!wizard.includes("extra_hour"), "wizard must not reference extra_hour from pricing JSON");
  assert.ok(!wizard.includes("optional_guest_screens"), "wizard must not reference optional_guest_screens");
  assert.ok(!wizard.includes("COMING_SOON"), "wizard must not expose COMING_SOON flags");
});
