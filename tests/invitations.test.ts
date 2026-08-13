import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import {
  invitationDemos,
  invitationDemoSlugs,
  invitationCategories,
  demosForService,
  demosForCategory,
} from "../src/data/invitation-designs.ts";
import {
  invitationPages,
  invitationServiceSlugs,
  invitationChildSlugs,
  invitationRedirects,
  getInvitationPage,
  HUB_SLUG,
} from "../src/data/invitations.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const isHex = (s: string) => /^#[0-9a-fA-F]{6}$/.test(s);

/* ----------------------------- Demo seed ----------------------------- */

test("exactly 64 demo records with unique ids and slugs", () => {
  assert.equal(invitationDemos.length, 64);
  assert.equal(new Set(invitationDemos.map((d) => d.id)).size, 64);
  assert.equal(new Set(invitationDemoSlugs).size, 64);
});

test("every demo card is visibly labelled نموذج and is noindex at launch", () => {
  for (const d of invitationDemos) {
    assert.ok(d.demoLabelAr.includes("نموذج"), `${d.id} demoLabelAr missing نموذج`);
    assert.ok(d.demoLabelEn.toLowerCase().includes("demo"), `${d.id} demoLabelEn missing demo`);
    assert.equal(d.indexable, false, `${d.id} must be noindex at launch`);
    assert.ok(d.altAr.trim().length > 10 && d.altEn.trim().length > 10, `${d.id} weak alt text`);
    assert.ok(d.uniqueDesignNotesAr.trim().length > 0 && d.uniqueDesignNotesEn.trim().length > 0);
  }
});

test("demo distribution matches the approved matrix (8×8, 32/16/16)", () => {
  assert.equal(invitationCategories.length, 8);
  for (const cat of invitationCategories) {
    assert.equal(demosForCategory(cat.slug).length, 8, `${cat.slug} should have 8 demos`);
  }
  const byFormat = (f: string) => invitationDemos.filter((d) => d.format === f).length;
  assert.equal(byFormat("static"), 32);
  assert.equal(byFormat("carousel"), 16);
  assert.equal(byFormat("animated"), 16);
});

test("every demo has a 4-colour hex palette and valid related links", () => {
  const ids = new Set(invitationDemos.map((d) => d.id));
  for (const d of invitationDemos) {
    assert.equal(d.palette.length, 4, `${d.id} palette length`);
    for (const c of d.palette) assert.ok(isHex(c), `${d.id} non-hex colour ${c}`);
    assert.equal(d.relatedDemoIds.length, 3, `${d.id} should have 3 related`);
    for (const rid of d.relatedDemoIds) {
      assert.ok(ids.has(rid), `${d.id} related ${rid} missing`);
      assert.notEqual(rid, d.id, `${d.id} related to itself`);
    }
  }
});

test("every demo servicePath points at a real invitation service page", () => {
  const serviceSet = new Set(invitationServiceSlugs.map((s) => `/services/${s}`));
  for (const d of invitationDemos) {
    assert.ok(serviceSet.has(d.servicePath), `${d.id} servicePath ${d.servicePath} not a cluster page`);
  }
});

/* --------------------------- Service pages --------------------------- */

test("cluster has a hub plus 15 children, all slugs unique", () => {
  assert.equal(invitationChildSlugs.length, 15);
  assert.equal(invitationServiceSlugs.length, 16);
  assert.equal(invitationServiceSlugs[0], HUB_SLUG);
  assert.equal(new Set(invitationServiceSlugs).size, 16);
});

test("every child page carries complete bilingual content", () => {
  for (const p of invitationPages) {
    for (const [k, v] of Object.entries({ title: p.meta.title, desc: p.meta.description, h1: p.hero.h1, lead: p.hero.lead, intro: p.intro })) {
      assert.ok(v.en.trim().length > 0, `${p.slug} ${k}.en empty`);
      assert.ok(v.ar.trim().length > 0, `${p.slug} ${k}.ar empty`);
    }
    assert.ok(p.faqs.length >= 3, `${p.slug} needs >=3 FAQs`);
    for (const f of p.faqs) {
      assert.ok(f.q.en && f.q.ar && f.a.en && f.a.ar, `${p.slug} incomplete FAQ`);
    }
    for (const scope of [p.scopes.recommended, p.scopes.enhanced]) {
      assert.ok(scope.name.en && scope.name.ar, `${p.slug} scope name`);
      assert.ok(scope.includes.length >= 3, `${p.slug} scope needs inclusions`);
    }
    assert.ok(p.provides.items.length >= 3, `${p.slug} provides items`);
    assert.ok(p.sections.length >= 1, `${p.slug} needs a body section`);
  }
});

test("internal-link matrix: each page relates to >=2 real sibling pages, never itself or the hub", () => {
  for (const p of invitationPages) {
    assert.ok(p.related.length >= 2, `${p.slug} needs >=2 related pages`);
    for (const r of p.related) {
      assert.ok(getInvitationPage(r), `${p.slug} related ${r} does not exist`);
      assert.notEqual(r, p.slug, `${p.slug} relates to itself`);
      assert.notEqual(r, HUB_SLUG, `${p.slug} lists hub as related (hub link is persistent, not a sibling)`);
    }
  }
});

test("exactly the five wedding-ceremony pages show wedding-coverage links", () => {
  const expected = [
    "digital-wedding-invitations",
    "katb-kitab-invitations",
    "malka-engagement-invitations",
    "wedding-save-the-date",
    "wedding-announcements",
  ].sort();
  const got = invitationPages.filter((p) => p.weddingLinks).map((p) => p.slug).sort();
  assert.deepEqual(got, expected);
});

test("pages with demos map to a real category of 8; baby-shower is honest with no demos", () => {
  for (const p of invitationPages) {
    if (p.hasDemos) {
      assert.ok(p.categorySlug, `${p.slug} hasDemos but no categorySlug`);
      assert.equal(demosForService(p.slug).length, 8, `${p.slug} should own 8 demos`);
    }
  }
  const baby = getInvitationPage("baby-shower-invitations");
  assert.ok(baby);
  assert.equal(baby.hasDemos, false, "baby shower must not borrow seed demos");
  assert.ok(baby.demoNote && baby.demoNote.en && baby.demoNote.ar, "baby shower needs an honest demo note");
  assert.equal(demosForService("baby-shower-invitations").length, 0);
});

/* ----------------------------- Redirects ---------------------------- */

test("redirect aliases target real canonical pages and are not live slugs themselves", () => {
  const livePaths = new Set(invitationServiceSlugs.map((s) => `/services/${s}`));
  for (const r of invitationRedirects) {
    assert.ok(livePaths.has(r.to), `redirect target ${r.to} is not a real page`);
    assert.ok(!livePaths.has(r.from), `redirect source ${r.from} collides with a live page`);
  }
});

/* ---------------------- Sitemap / robots wiring --------------------- */

test("sitemap includes the service cluster + gallery but excludes noindex demo pages", () => {
  const sitemap = readFileSync(join(root, "src/app/sitemap.ts"), "utf8");
  assert.match(sitemap, /invitationServiceSlugs/, "sitemap must enumerate the cluster service pages");
  assert.match(sitemap, /\/invitation-designs/, "sitemap must include the gallery");
  assert.doesNotMatch(sitemap, /invitationDemoSlugs/, "noindex demo detail pages must not be in the sitemap");
});

test("shared renderer structurally enforces hub + gallery links on every page", () => {
  const renderer = readFileSync(join(root, "src/components/invitations/InvitationServicePage.tsx"), "utf8");
  assert.match(renderer, /InvitationHubLinks/, "renderer must render the hub+gallery module");
  assert.match(renderer, /RelatedInvitations/, "renderer must render related invitation services");
});
