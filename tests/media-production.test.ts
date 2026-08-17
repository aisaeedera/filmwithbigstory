/**
 * Media Production silo — routing, content, schema and PRICE GATE tests.
 *
 * Follows the existing repo testing style (node:test + source-file assertions,
 * see tests/careers-wedding.test.ts), so it runs with no browser and no build.
 */
import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import {
  MEDIA_RATE_CARD_ENABLED,
  mediaRateCard,
  rateCardIsPublishable,
  mediaHub,
  mediaServices,
  mediaServiceSlugs,
  mediaForm,
  mediaUi,
  MEDIA_BASE,
  getMediaService,
  withoutEmDash,
} from "../src/data/media-production.ts";
import {
  MEDIA_PROJECT_TYPES,
  MEDIA_TIMELINES,
  MEDIA_STAGES,
  isAllowedMediaValue,
  mediaOptionsFor,
  validateMediaInquiry,
  hasMediaErrors,
} from "../src/lib/contact.ts";
import { waMediaLinkFromState } from "../src/lib/site.ts";
import { switchLocalePath } from "../src/lib/i18n.ts";
import { services } from "../src/data/services.ts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel: string) => readFileSync(join(ROOT, rel), "utf8");

const HUB_PAGE = "src/app/[locale]/media-production/page.tsx";
const SERVICE_PAGE = "src/app/[locale]/media-production/[slug]/page.tsx";
const DATA = "src/data/media-production.ts";
const FORM = "src/components/MediaInquiryForm.tsx";
const UI = "src/components/MediaProductionUi.tsx";

const SILO_SOURCES = [HUB_PAGE, SERVICE_PAGE, DATA, FORM, UI];

test("language switch replaces either locale prefix without nesting", () => {
  assert.equal(switchLocalePath("ar", "/en/services/groom-wedding-services"), "/ar/services/groom-wedding-services");
  assert.equal(switchLocalePath("ar", "/services/groom-wedding-services"), "/ar/services/groom-wedding-services");
  assert.equal(switchLocalePath("en", "/ar/services/groom-wedding-services"), "/services/groom-wedding-services");
  assert.equal(switchLocalePath("en", "/ar"), "/");
});

test("language switches use native anchors so locale changes trigger a clean document navigation", () => {
  const nav = read("src/components/Nav.tsx");
  assert.equal(nav.match(/<a href=\{switchHref\}/g)?.length, 2);
  assert.ok(!nav.includes("<Link href={switchHref}"));
});

test("Vercel observability scripts render only on Vercel, not in local production QA", () => {
  const layout = read("src/app/[locale]/layout.tsx");
  assert.ok(layout.includes("process.env.VERCEL"));
  assert.ok(layout.includes("<Analytics />"));
  assert.ok(layout.includes("<SpeedInsights />"));
});

/**
 * Strip comments. The price gate and the truthfulness rules are documented in
 * prose that legitimately uses the very words those rules ban, so only code and
 * rendered content is checked.
 */
const stripComments = (src: string) =>
  src
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "");

const REQUIRED_SLUGS = ["company-media-revamp", "new-product-launch", "new-company-launch"];

/* ================================================================== */
/* PRICE GATE — the strictest rules in this suite                      */
/* ================================================================== */

test("price gate is closed: flag false and rate card empty", () => {
  assert.equal(MEDIA_RATE_CARD_ENABLED, false, "MEDIA_RATE_CARD_ENABLED must stay false until a rate card is approved");
  assert.equal(mediaRateCard.length, 0, "mediaRateCard must stay empty until verified rows are approved");
  assert.equal(rateCardIsPublishable(), false);
});

test("no currency or VAT language anywhere in the silo source", () => {
  // The rule is that no figure is rendered. Discussing scope, or answering
  // "how do I get a price", is allowed; showing a currency or a rate is not.
  const banned: [RegExp, string][] = [
    [/\bAED\b/, "AED currency code"],
    [/\bUSD\b|\bEUR\b/, "a foreign currency code"],
    // `$` alone is JS template-literal syntax; a currency use is `$` next to a figure.
    [/[€£¥]|\$\s?\d/, "currency symbol"],
    [/درهم|دولار/, "Arabic currency word"],
    [/\bVAT\b|\bvalue added tax\b/i, "VAT claim"],
    [/ضريبة/, "Arabic 'tax'"],
    [/\bper (day|hour|episode|minute)\b/i, "a rate unit"],
    [/\bstarting (from|at)\b/i, "a price anchor"],
    [/\bcheaper than\b|\bless than .{0,12}\bcharge/i, "a price comparison"],
  ];

  for (const rel of SILO_SOURCES) {
    const stripped = stripComments(read(rel));
    for (const [re, label] of banned) {
      assert.ok(!re.test(stripped), `${rel} must not contain ${label}`);
    }
  }
});

test("no price word ever appears next to a number", () => {
  const blob = JSON.stringify([mediaHub, mediaServices, mediaUi, mediaForm]);
  const adjacency = /(price|pricing|cost|fee|rate|budget|سعر|تكلفة)[^.!?]{0,24}\d|\d[^.!?]{0,24}(price|pricing|cost|fee|rate|budget|سعر|تكلفة)/i;
  assert.ok(!adjacency.test(blob), "a price word appears near a figure in the silo copy");
});

test("no price-shaped numeric literal in the silo content source", () => {
  const src = stripComments(read(DATA));
  // e.g. "5,000" / "1200" / "12.500" appearing in copy.
  assert.ok(!/\d[\d,.]{2,}/.test(src), "media-production.ts must not contain a price-shaped number");
});

test("silo never imports the price-bearing schema helper", () => {
  for (const rel of SILO_SOURCES) {
    const src = read(rel);
    assert.ok(!src.includes("offerCatalogSchema"), `${rel} must not import offerCatalogSchema`);
    assert.ok(!src.includes("priceSpecification"), `${rel} must not emit priceSpecification`);
    assert.ok(!src.includes("AggregateRating"), `${rel} must not emit AggregateRating`);
  }
});

test("the inquiry form has no budget question", () => {
  const src = stripComments(read(FORM));
  assert.ok(!/BUDGETS/.test(src), "media inquiry form must not import the AED budget option set");
  assert.ok(!/budget/i.test(src), "media inquiry form must not render a budget field");
  assert.ok(!/budget/i.test(JSON.stringify(MEDIA_TIMELINES)), "media timelines must not mention budget");
  assert.ok(!/budget/i.test(JSON.stringify(MEDIA_PROJECT_TYPES)));
  assert.ok(!/budget/i.test(JSON.stringify(MEDIA_STAGES)));
});

test("the approved non-price placeholder is the exact agreed string", () => {
  assert.equal(mediaUi.scopePlaceholder.en, "Package details are confirmed during planning.");
  assert.ok(mediaUi.scopePlaceholder.ar.length > 0);
});

test("the scope gate is the only render surface for rate-card rows", () => {
  const ui = read(UI);
  assert.ok(ui.includes("rateCardIsPublishable()"), "ScopeGate must consult the price gate");
  for (const rel of [HUB_PAGE, SERVICE_PAGE]) {
    assert.ok(!read(rel).includes("mediaRateCard"), `${rel} must not read the rate card directly`);
  }
});

/* ================================================================== */
/* ROUTING                                                             */
/* ================================================================== */

test("/services permanently redirects to /media-production in both locales", () => {
  const cfg = read("next.config.ts");
  assert.ok(
    /\{\s*source:\s*"\/services",\s*destination:\s*"\/media-production",\s*permanent:\s*true\s*\}/.test(cfg),
    "next.config.ts is missing the permanent /services -> /media-production redirect",
  );
  assert.ok(
    /\{\s*source:\s*"\/ar\/services",\s*destination:\s*"\/ar\/media-production",\s*permanent:\s*true\s*\}/.test(cfg),
    "next.config.ts is missing the Arabic /ar/services redirect",
  );
});

test("the redirect matches the exact path only, so service children stay live", () => {
  const cfg = read("next.config.ts");
  assert.ok(!/source:\s*"\/services\/:path\*"/.test(cfg), "a wildcard would break every existing /services/* page");
  assert.ok(!/source:\s*"\/services\/"/.test(cfg));
});

test("the old /services hub page file is gone so it cannot shadow the redirect", () => {
  assert.throws(() => read("src/app/[locale]/services/page.tsx"));
});

test("existing /services/* child routes are untouched", () => {
  // Spot-check a representative sample of the pre-existing child routes.
  for (const rel of [
    "src/app/[locale]/services/[slug]/page.tsx",
    "src/app/[locale]/services/tvc-production-dubai/page.tsx",
    "src/app/[locale]/services/weddings/page.tsx",
    "src/app/[locale]/services/cinematography-dubai/page.tsx",
  ]) {
    assert.ok(read(rel).length > 0, `${rel} must still exist`);
  }
});

test("no internal link still points at the retired /services hub", () => {
  for (const rel of [
    "src/components/Nav.tsx",
    "src/components/Footer.tsx",
    "src/components/UaeTravelSection.tsx",
    "src/app/[locale]/page.tsx",
    "src/app/sitemap.ts",
  ]) {
    assert.ok(!/"\/services"/.test(read(rel)), `${rel} still links to the retired /services hub`);
  }
});

test("all four silo routes are in the sitemap and /services is not", () => {
  const sm = read("src/app/sitemap.ts");
  for (const path of [MEDIA_BASE, ...REQUIRED_SLUGS.map((s) => `${MEDIA_BASE}/${s}`)]) {
    assert.ok(sm.includes(`path: "${path}"`), `sitemap is missing ${path}`);
  }
  assert.ok(!/path: "\/services"/.test(sm), "sitemap must not list the redirecting /services URL");
});

/* ================================================================== */
/* PAGE STRUCTURE + SEO                                                */
/* ================================================================== */

test("the hub H1 is exactly 'Media Production'", () => {
  assert.equal(mediaHub.hero.h1.en, "Media Production");
  assert.ok(mediaHub.hero.h1.ar.length > 0, "the Arabic H1 must not be empty");
});

test("every page renders exactly one h1", () => {
  for (const rel of [HUB_PAGE, SERVICE_PAGE]) {
    const src = read(rel);
    assert.equal((src.match(/<h1/g) ?? []).length, 1, `${rel} must render exactly one <h1>`);
  }
});

test("the three required service slugs exist, in order", () => {
  assert.deepEqual(mediaServiceSlugs, REQUIRED_SLUGS);
  for (const slug of REQUIRED_SLUGS) {
    assert.ok(getMediaService(slug), `missing media service ${slug}`);
  }
});

test("titles are under 60 characters and descriptions under 160", () => {
  const metas = [mediaHub.meta, ...mediaServices.map((s) => s.meta)];
  for (const m of metas) {
    assert.ok(m.title.en.length < 60, `title too long (${m.title.en.length}): ${m.title.en}`);
    assert.ok(m.description.en.length < 160, `description too long (${m.description.en.length}): ${m.description.en}`);
    assert.ok(m.description.ar.length < 160, `AR description too long: ${m.description.ar}`);
  }
});

test("canonical, hreflang, OG and Twitter metadata come from the shared helper", () => {
  for (const rel of [HUB_PAGE, SERVICE_PAGE]) {
    const src = read(rel);
    assert.ok(src.includes("pageMeta("), `${rel} must build metadata via pageMeta()`);
  }
  const meta = read("src/lib/meta.ts");
  assert.ok(meta.includes("canonical"));
  assert.ok(meta.includes("openGraph"));
  assert.ok(meta.includes("twitter"));
  assert.ok(meta.includes("x-default"));
});

test("every page emits Service and BreadcrumbList schema", () => {
  for (const rel of [HUB_PAGE, SERVICE_PAGE]) {
    const src = read(rel);
    assert.ok(src.includes("serviceSchema("), `${rel} is missing Service schema`);
    assert.ok(src.includes("breadcrumbSchema("), `${rel} is missing BreadcrumbList schema`);
  }
});

test("FAQPage schema is generated from the same items that render", () => {
  for (const rel of [HUB_PAGE, SERVICE_PAGE]) {
    const src = read(rel);
    assert.ok(src.includes("faqSchema(faqItems)"), `${rel} must feed faqSchema the rendered items`);
    assert.ok(src.includes("<Faq items={faqItems} />"), `${rel} must render the same faqItems`);
  }
});

test("hub has 5 FAQs and each service page has 4", () => {
  assert.equal(mediaHub.faq.items.length, 5);
  for (const s of mediaServices) {
    assert.equal(s.faq.items.length, 4, `${s.slug} must have 4 FAQs`);
  }
});

test("every service page has problem, outcome, process, scope, FAQ, related and CTA", () => {
  for (const s of mediaServices) {
    assert.ok(s.problem.signals.length >= 3, `${s.slug} problem block is thin`);
    assert.equal(s.outcome.items.length, 3, `${s.slug} must state three intended outcomes`);
    assert.ok(s.process.stages.length >= 4, `${s.slug} needs at least four process stages`);
    assert.ok(s.scope.covers.length >= 4, `${s.slug} scope block is thin`);
    assert.ok(s.related.length >= 2, `${s.slug} needs related service links`);
    assert.ok(s.cta.h2.en.length > 0 && s.cta.whatsapp.en.length > 0);
  }
});

test("each service page closes with a distinct CTA heading and WhatsApp context", () => {
  const headings = new Set(mediaServices.map((s) => s.cta.h2.en));
  const contexts = new Set(mediaServices.map((s) => s.waContext.en));
  assert.equal(headings.size, mediaServices.length, "service pages must not share a closing CTA heading");
  assert.equal(contexts.size, mediaServices.length, "service pages must not share a WhatsApp context");
});

test("hero CTAs are differentiated: one commits, one reassures", () => {
  const src = read(HUB_PAGE);
  assert.ok(src.includes('href={INQUIRY_ANCHOR} variant="gold"'), "primary hero CTA must be the commitment action");
  assert.ok(src.includes('localizedPath(locale, "/how-we-work")'), "secondary hero CTA must link to how we work");
  // The closing CTA is a third, distinct action.
  assert.notEqual(mediaHub.hero.ctaPrimary.en, mediaHub.cta.whatsapp.en);
  assert.notEqual(mediaHub.hero.ctaSecondary.en, mediaHub.cta.whatsapp.en);
});

test("the capability index still links every existing service, so none is orphaned", () => {
  const src = read(HUB_PAGE);
  assert.ok(src.includes("services.map("), "hub must render the full existing service list");
  assert.ok(src.includes('href={`/services/${s.slug}`}'), "hub must link to each existing /services/* page");
});

/* ================================================================== */
/* TRUTHFULNESS                                                        */
/* ================================================================== */

test("no em-dash character in any visitor-facing string", () => {
  // The rendered strings themselves, not the section-divider comments.
  const blob = JSON.stringify([mediaHub, mediaServices, mediaUi, mediaForm]);
  assert.ok(!blob.includes("—"), "a media production copy string contains an em-dash");
  for (const rel of [...SILO_SOURCES]) {
    const src = stripComments(read(rel))
      // The normaliser's own pattern necessarily contains the character it strips.
      .replace(/value\.replace\(\/[^\n]*\/g, ": "\)/, "");
    assert.ok(!src.includes("—"), `${rel} contains an em-dash outside a comment`);
  }
});

test("withoutEmDash turns the dash into a colon and leaves clean copy alone", () => {
  assert.equal(
    withoutEmDash("Campaign-ready spots for TV, YouTube and social — concept to broadcast master."),
    "Campaign-ready spots for TV, YouTube and social: concept to broadcast master.",
  );
  // Idempotent, and a no-op on copy that never had one.
  const clean = "Bring outdated company video and photography back into one consistent look.";
  assert.equal(withoutEmDash(clean), clean);
  assert.equal(withoutEmDash(withoutEmDash("a — b")), "a: b");
});

test("legacy blurbs rendered by the capability index are stripped of em-dashes", () => {
  // The hub re-renders the shared service blurbs, several of which were
  // authored with em-dashes. They must be normalised at the render boundary.
  const withEmDash = services.filter((s) => s.description.en.includes("—") || s.description.ar.includes("—"));
  assert.ok(withEmDash.length > 0, "fixture check: the legacy data should still contain em-dashes");
  for (const s of withEmDash) {
    assert.ok(!withoutEmDash(s.description.en).includes("—"), `${s.slug} EN blurb still has an em-dash`);
    assert.ok(!withoutEmDash(s.description.ar).includes("—"), `${s.slug} AR blurb still has an em-dash`);
  }
  // …and the index row must actually apply it, in both slots.
  const ui = read(UI);
  assert.ok(ui.includes("{withoutEmDash(title)}"), "IndexRow must normalise the title");
  assert.ok(ui.includes("{withoutEmDash(description)}"), "IndexRow must normalise the description");
  // The shared service data itself stays untouched: /services/* still renders it verbatim.
  assert.ok(
    read("src/data/services.ts").includes("—"),
    "the shared service data must not have been rewritten by this silo",
  );
});

test("no guarantee or performance language in the copy", () => {
  const blob = JSON.stringify([mediaHub, mediaServices, mediaUi, mediaForm]);
  const banned = [
    /\bguarantee/i,
    /\bproven\b/i,
    /\bwill increase\b/i,
    /\bbest in\b/i,
    /\baward[- ]winning\b/i,
    /\b\d+% /,
    /\btrusted by\b/i,
    /\bmillions? of\b/i,
    /\bclients? say\b/i,
    /\bour clients\b/i,
  ];
  for (const re of banned) {
    assert.ok(!re.test(blob), `copy contains banned claim pattern ${re}`);
  }
});

test("the only mention of testimonials is the statement that we publish none", () => {
  const strings: string[] = [];
  (function walk(node: unknown) {
    if (typeof node === "string") strings.push(node);
    else if (node && typeof node === "object") Object.values(node).forEach(walk);
  })([mediaHub, mediaServices, mediaUi, mediaForm]);

  for (const s of strings) {
    if (/testimonial/i.test(s)) {
      assert.match(s, /do not publish/i, `testimonials may only be mentioned to say we publish none: "${s}"`);
    }
  }
});

test("the trust block links only to pages that exist in this repository", () => {
  const existing: Record<string, string> = {
    "/how-we-work": "src/app/[locale]/how-we-work/page.tsx",
    "/work": "src/app/[locale]/work/page.tsx",
    "/clients": "src/app/[locale]/clients/page.tsx",
    "/service-areas": "src/app/[locale]/service-areas/page.tsx",
  };
  for (const link of mediaHub.verify.links) {
    const file = existing[link.path];
    assert.ok(file, `trust link ${link.path} is not in the allowed set of existing pages`);
    assert.ok(read(file).length > 0, `${link.path} must resolve to a real page file`);
  }
});

test("related links point at routes that exist", () => {
  const known = new Set([
    "/services/corporate-video-production-uae",
    "/services/photography-revamp",
    "/services/tvc-production-dubai",
    "/services/video-production",
    "/services/brand-films",
    "/website-services",
  ]);
  for (const s of mediaServices) {
    for (const r of s.related) {
      assert.ok(known.has(r.path), `${s.slug} links to an unverified route: ${r.path}`);
    }
  }
});

test("every visitor-facing string has non-empty EN and AR", () => {
  function walk(node: unknown, path: string) {
    if (node && typeof node === "object") {
      const obj = node as Record<string, unknown>;
      if (typeof obj.en === "string" || typeof obj.ar === "string") {
        assert.ok(typeof obj.en === "string" && obj.en.trim().length > 0, `${path}.en is empty`);
        assert.ok(typeof obj.ar === "string" && obj.ar.trim().length > 0, `${path}.ar is empty`);
        return;
      }
      for (const [k, v] of Object.entries(obj)) walk(v, `${path}.${k}`);
    }
  }
  walk(mediaHub, "mediaHub");
  walk(mediaServices, "mediaServices");
  walk(mediaUi, "mediaUi");
  walk(mediaForm, "mediaForm");
});

/* ================================================================== */
/* INQUIRY FORM                                                        */
/* ================================================================== */

test("media option sets are bilingual and equal length", () => {
  for (const set of [MEDIA_PROJECT_TYPES, MEDIA_TIMELINES, MEDIA_STAGES]) {
    assert.equal(set.en.length, set.ar.length);
    assert.ok(set.en.length >= 4);
  }
});

test("media allowlist accepts EN and AR labels and rejects junk", () => {
  assert.ok(isAllowedMediaValue("projectType", MEDIA_PROJECT_TYPES.en[0]));
  assert.ok(isAllowedMediaValue("projectType", MEDIA_PROJECT_TYPES.ar[0]));
  assert.ok(isAllowedMediaValue("mediaTimeline", MEDIA_TIMELINES.en[1]));
  assert.ok(isAllowedMediaValue("stage", MEDIA_STAGES.ar[2]));
  assert.ok(!isAllowedMediaValue("projectType", "definitely not a project type"));
  assert.deepEqual(mediaOptionsFor("projectType", "ar"), MEDIA_PROJECT_TYPES.ar);
});

test("validateMediaInquiry passes a complete valid inquiry", () => {
  const res = validateMediaInquiry(
    {
      name: "Sara",
      email: "sara@example.com",
      phone: "050 123 4567",
      projectType: MEDIA_PROJECT_TYPES.en[1],
      mediaTimeline: MEDIA_TIMELINES.en[0],
      stage: MEDIA_STAGES.en[2],
    },
    { name: "name", email: "email", phone: "phone", required: "required" },
  );
  assert.equal(hasMediaErrors(res), false);
  assert.equal(res.normalizedPhone, "+971501234567");
  assert.equal(res.sanitizedStage, MEDIA_STAGES.en[2]);
});

test("validateMediaInquiry flags each missing or invalid field", () => {
  const res = validateMediaInquiry(
    { name: "", email: "nope", phone: "12345", projectType: "junk", mediaTimeline: "" },
    { name: "name", email: "email", phone: "phone", required: "required" },
  );
  assert.equal(res.fieldErrors.name, "name");
  assert.equal(res.fieldErrors.email, "email");
  assert.equal(res.fieldErrors.phone, "phone");
  assert.equal(res.fieldErrors.projectType, "required");
  assert.equal(res.fieldErrors.mediaTimeline, "required");
});

test("stage is optional but an unknown stage value is dropped, not trusted", () => {
  const base = {
    name: "Sara",
    email: "sara@example.com",
    phone: "0501234567",
    projectType: MEDIA_PROJECT_TYPES.en[0],
    mediaTimeline: MEDIA_TIMELINES.en[0],
  };
  const noStage = validateMediaInquiry(base, { name: "n", email: "e", phone: "p", required: "r" });
  assert.equal(hasMediaErrors(noStage), false);
  assert.equal(noStage.sanitizedStage, undefined);

  const badStage = validateMediaInquiry({ ...base, stage: "<script>" }, { name: "n", email: "e", phone: "p", required: "r" });
  assert.equal(hasMediaErrors(badStage), false);
  assert.equal(badStage.sanitizedStage, undefined);
});

test("the form reuses the proven delivery rails and never fakes success", () => {
  const actions = read("src/app/actions.ts");
  assert.ok(actions.includes("submitMediaInquiry"), "the media inquiry server action is missing");
  assert.ok(actions.includes("deliverLead("), "the media action must reuse the shared delivery helper");
  // No new provider endpoint was invented.
  const urls = actions.match(/https:\/\/[^\s"']+/g) ?? [];
  const allowed = new Set(["https://api.resend.com/emails", "https://challenges.cloudflare.com/turnstile/v0/siteverify"]);
  for (const u of urls) assert.ok(allowed.has(u), `unexpected outbound URL in actions.ts: ${u}`);
  // "no rail configured" must return an error, not a success.
  assert.ok(/no delivery rail configured[\s\S]{0,400}return "no-rail"/.test(actions));
  assert.ok(actions.includes('if (outcome !== "delivered") {'), "a failed delivery must not report success");
});

test("the WhatsApp bailout carries no budget line", () => {
  const href = waMediaLinkFromState({
    projectType: MEDIA_PROJECT_TYPES.en[0],
    timeline: MEDIA_TIMELINES.en[0],
  });
  const text = decodeURIComponent(href.split("text=")[1]);
  assert.ok(!/budget/i.test(text), "the media WhatsApp handoff must not ask for a budget");
  assert.ok(!/AED|\$/.test(text));
  assert.ok(href.startsWith("https://wa.me/971528418108"));
  assert.ok(text.includes(MEDIA_PROJECT_TYPES.en[0]));
});

test("the form is accessible: labels, error summary, progressbar, focus management", () => {
  const src = read(FORM);
  assert.ok(src.includes('role="progressbar"') && src.includes("aria-valuetext"), "progress must be a real progressbar");
  assert.ok(src.includes('role="alert"'), "errors must be announced");
  assert.ok(src.includes("aria-invalid"), "invalid fields must be marked");
  assert.ok(src.includes("aria-describedby"), "errors must be associated with their field");
  assert.ok(src.includes("<legend"), "chip groups must use a legend");
  assert.ok(src.includes("htmlFor="), "every text field must have a label");
  assert.ok(src.includes("summaryRef.current?.focus()"), "focus must move to the error summary on failed submit");
  assert.ok(src.includes("stepHeadingRef.current?.focus()"), "focus must move to the heading on step change");
  assert.ok(src.includes('type="radio"'), "chips must be native radios so arrow keys work");
});

test("the form progressively discloses the stage question", () => {
  const src = read(FORM);
  assert.ok(/projectType \? \(/.test(src), "the stage question must only appear after a project type is chosen");
});

test("captured context includes project type, stage, timeline and the source page", () => {
  const actions = read("src/app/actions.ts");
  for (const key of ["projectType", "stage", "timeline", "pageContext"]) {
    assert.ok(actions.includes(key), `the media action must capture ${key}`);
  }
  assert.ok(read(FORM).includes('name="pageContext"'), "the form must submit its page context");
});

/* ================================================================== */
/* ANALYTICS                                                           */
/* ================================================================== */

test("analytics adapter loads no tracker and hardcodes no ID", () => {
  const src = read("src/lib/analytics.ts");
  assert.ok(!/G-[A-Z0-9]{6,}/.test(src), "no GA4 measurement ID may be hardcoded");
  assert.ok(!/GTM-[A-Z0-9]+/.test(src), "no GTM container ID may be hardcoded");
  assert.ok(!/googletagmanager|clarity\.ms/.test(src), "the adapter must not inject a tracker script");
  assert.ok(src.includes('typeof window === "undefined"'), "must be a no-op on the server");
});

test("the documented GA4 conversion events are the ones the code can emit", () => {
  const src = read("src/lib/analytics.ts");
  const documented = [
    "media_inquiry_start",
    "media_inquiry_step",
    "media_inquiry_submit",
    "media_inquiry_success",
    "media_inquiry_error",
    "media_cta_click",
  ];
  for (const name of documented) {
    assert.ok(src.includes(`"${name}"`), `analytics.ts is missing the documented event ${name}`);
    assert.ok(
      read("MEDIA_PRODUCTION_CONTENT_ARCHITECTURE.md").includes(name),
      `${name} must be documented in the architecture doc`,
    );
  }
});

/* ================================================================== */
/* LOCALES / RTL                                                       */
/* ================================================================== */

test("both locales are statically generated for the service pages", () => {
  const src = read(SERVICE_PAGE);
  assert.ok(src.includes("locales.flatMap("), "generateStaticParams must cover every locale");
  assert.ok(src.includes("mediaServiceSlugs.map("));
});

test("silo CSS uses logical properties so RTL needs no overrides", () => {
  const css = read("src/app/globals.css");
  const block = css.slice(css.indexOf("MEDIA PRODUCTION SILO"), css.indexOf("/* Skip link */"));
  // Drop the block's own header comment, then any remaining inline comments.
  const silo = stripComments(block.slice(block.indexOf("*/") + 2));
  assert.ok(silo.length > 0, "silo CSS block not found");
  for (const physical of ["margin-left:", "margin-right:", "padding-left:", "padding-right:", "left:", "right:"]) {
    assert.ok(!silo.includes(physical), `silo CSS uses the physical property ${physical}`);
  }
  assert.ok(silo.includes("inset-inline"), "silo CSS should position with logical inset properties");
});

test("silo CSS introduces no gradient", () => {
  const css = read("src/app/globals.css");
  const block = css.slice(css.indexOf("MEDIA PRODUCTION SILO"), css.indexOf("/* Skip link */"));
  const silo = stripComments(block.slice(block.indexOf("*/") + 2));
  assert.ok(!/gradient/.test(silo), "the silo art direction must not use gradients");
});

test("the sticky mobile CTA is server rendered, single action, and hidden on desktop", () => {
  const ui = read(UI);
  assert.ok(!ui.includes('"use client"'), "the silo UI components must stay server components");
  const css = read("src/app/globals.css");
  assert.ok(/\.bs-mp-sticky \{[\s\S]*?position: fixed/.test(css));
  assert.ok(/@media \(min-width: 768px\) \{\s*\.bs-mp-sticky \{\s*display: none;/.test(css), "sticky CTA must be hidden at md and up");
  assert.ok(css.includes("safe-area-inset-bottom"), "sticky CTA must respect the safe area");
  for (const rel of [HUB_PAGE, SERVICE_PAGE]) {
    const src = read(rel);
    assert.equal((src.match(/<StickyMobileCta/g) ?? []).length, 1, `${rel} must render exactly one sticky CTA`);
  }
});

test("SSR stays visible with no JavaScript", () => {
  const reveal = read("src/components/Reveal.tsx");
  assert.ok(reveal.includes("armed"), "Reveal must render visible until JS arms it");
  const css = read("src/app/globals.css");
  assert.ok(/\.bs-reveal \{\s*opacity: 1;/.test(css), "reveal must default to visible for no-JS and SSR");
  for (const rel of [HUB_PAGE, SERVICE_PAGE]) {
    assert.ok(read(rel).includes("<noscript>"), `${rel} must offer a no-JS contact path`);
  }
});
