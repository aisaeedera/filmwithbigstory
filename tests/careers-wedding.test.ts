// Verifies the Wedding Production Careers section on /careers is wired to the
// two approved Google Forms (male/general + female-only) and stays separate
// from the general freelance roster form.
import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { SITE } from "../src/lib/site.ts";

const MALE_FORM =
  "https://docs.google.com/forms/d/e/1FAIpQLSeUyLFHd24LJ47yFFmVOFOSCRmxPGIoXsdsUbm2snGwvarzxQ/viewform";
const FEMALE_FORM =
  "https://docs.google.com/forms/d/e/1FAIpQLSevpxaQcihkpUKctfmNtcJd7pC1tYacl-sfRrGYON0bZIO_NQ/viewform";

test("site.ts exposes both wedding form URLs exactly as approved", () => {
  assert.equal(
    SITE.careersFormWeddingMale,
    MALE_FORM,
    "male/general wedding form URL drifted from approved link",
  );
  assert.equal(
    SITE.careersFormWeddingFemale,
    FEMALE_FORM,
    "female-only wedding form URL drifted from approved link",
  );
});

test("wedding form URLs are distinct from the general roster form", () => {
  assert.notEqual(SITE.careersFormWeddingMale, SITE.careersForm);
  assert.notEqual(SITE.careersFormWeddingFemale, SITE.careersForm);
  assert.notEqual(SITE.careersFormWeddingMale, SITE.careersFormWeddingFemale);
});

test("careers page renders both wedding CTAs and the separation copy", () => {
  // Resolve source file relative to this test, regardless of CWD.
  const here = fileURLToPath(import.meta.url);
  const pagePath = here
    .replace(/\/tests\/careers-wedding\.test\.ts$/, "/src/app/[locale]/careers/page.tsx");
  const src = readFileSync(pagePath, "utf8");

  // The two approved Google Form URLs flow into the page through SITE. Verify
  // each source-side reference is present (the literal URL resolves at render
  // time from src/lib/site.ts, which the first test has already pinned).
  assert.ok(
    src.includes("SITE.careersFormWeddingMale"),
    "careers page is missing the SITE reference to the male/general wedding form",
  );
  assert.ok(
    src.includes("SITE.careersFormWeddingFemale"),
    "careers page is missing the SITE reference to the female-only wedding form",
  );

  // Visual / structural separation from the general roster section.
  assert.ok(
    src.includes('id="apply-wedding"'),
    "wedding section is missing its own anchor id",
  );
  assert.ok(
    /Wedding Production Crew[\s\S]*Male \/ General Wedding Crew[\s\S]*Female-Only Wedding Crew/.test(src),
    "wedding section is missing one of the two cards",
  );

  // Roster-not-employment honesty.
  assert.ok(
    /Applying is not a confirmed booking/i.test(src),
    "wedding section copy must state that applying is not a confirmed booking",
  );

  // Accessibility: both cards have descriptive aria-labels. The full aria-label
  // string is split across a ternary in the source, so match the unique label
  // text itself, which appears verbatim on both language branches.
  assert.ok(
    /Open the male \/ general wedding crew application form/.test(src),
    "male wedding CTA is missing an accessible aria-label",
  );
  assert.ok(
    /Open the female-only wedding crew application form/.test(src),
    "female wedding CTA is missing an accessible aria-label",
  );
  assert.ok(
    /افتح نموذج طاقم أعراس الرجال/.test(src),
    "Arabic aria-label for the male wedding CTA is missing",
  );
  assert.ok(
    /افتح نموذج طاقم أعراس نسائي فقط/.test(src),
    "Arabic aria-label for the female wedding CTA is missing",
  );
});

test("careers page exposes both wedding CTAs in the Arabic locale copy", () => {
  // The Arabic copy path shares the same file, but confirms bilingual parity.
  const here = fileURLToPath(import.meta.url);
  const pagePath = here
    .replace(/\/tests\/careers-wedding\.test\.ts$/, "/src/app/[locale]/careers/page.tsx");
  const src = readFileSync(pagePath, "utf8");

  assert.ok(
    src.includes("طاقم الأعراس للرجال / العام"),
    "Arabic card title (male/general) missing",
  );
  assert.ok(
    src.includes("طاقم الأعراس النسائي فقط"),
    "Arabic card title (female-only) missing",
  );
  assert.ok(
    src.includes("قدّم كطاقم أعراس عام"),
    "Arabic CTA label for male/general card missing",
  );
  assert.ok(
    src.includes("قدّم كطاقم أعراس نسائي فقط"),
    "Arabic CTA label for female-only card missing",
  );
});
