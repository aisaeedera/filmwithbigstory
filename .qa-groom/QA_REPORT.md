# Groom Wedding Services Independent QA

Date: 2026-08-17
Route: `/services/groom-wedding-services` (English canonical root) and `/ar/services/groom-wedding-services`
Scope: independent EN/AR visual, HTTP/DOM, claims, scope, link, build and release-candidate QA
Deployment at this report revision: pending approved Vercel production release

## Verdict

PASS. The groom page renders successfully in both locales, the remediated content passes the required claims and blocked-lane checks, and the language-switch defect is fixed. Playwright verified a hydrated EN → AR → EN round trip with correct canonical URLs, no page exceptions, and no nested locale prefix. Full-page 1440px screenshots pass visual inspection in both LTR and RTL after reveal animations were triggered.

## Evidence

- English request `/en/services/groom-wedding-services` follows the intentional 308 canonical redirect to `/services/groom-wedding-services`, then returns HTTP 200. Source: `src/proxy.ts:14-18` documents the English root canonical.
- English DOM: `lang=en-AE`, `dir=ltr`, one `h1`, zero images, zero broken images, zero internal scaffolding tokens, zero banned claim/tier hits.
- Arabic DOM: `lang=ar-AE`, `dir=rtl`, one `h1`, zero images, zero broken images, zero internal scaffolding tokens, zero banned claim/tier hits.
- Arabic route `/ar/services/groom-wedding-services` returns HTTP 200.
- Scope source has exactly one Recommended scope and one Enhanced scope in `src/app/[locale]/services/groom-wedding-services/page.tsx:148-200`; no public AED prices remain.
- Parent compliance output `.qa-groom/claim_scan_post_remediation.json` records Stage 1 PASS with 0 category-line hits. Stage 2 correctly has no demo markers because no demo asset is placed.
- Language switch fixed: `switchLocalePath()` now strips either `/en` or `/ar` before applying the target locale, and both desktop/mobile switches use native anchors for a clean cross-locale document navigation. Playwright confirmed `/services/groom-wedding-services` → `/ar/services/groom-wedding-services` → `/services/groom-wedding-services`, all HTTP 200.
- All other same-origin links extracted from both rendered pages returned accepted HTTP statuses in the local server check.

## Required-zero checks

| Check | Result | Evidence |
|---|---|---|
| Broken images | PASS, 0 found | `.qa-groom/qa_http_output.json`, both locales had 0 images and 0 broken images |
| Console errors | PASS, 0 found | Playwright recorded `consoleErrors: []` and `pageErrors: []` after EN → AR → EN hydrated navigation under local `next start`. Vercel observability scripts are now rendered only when `process.env.VERCEL` is present. |
| Internal scaffolding | PASS, 0 hits | HTTP DOM scan |
| Unsupported claims | PASS, 0 banned hits | HTTP DOM scan plus compliance JSON |
| Stale tiers/prices | PASS | Source grep and claim matrix; one Recommended plus one Enhanced, unpriced |
| Blocked drone/female/Aqd add-ons | PASS | Source grep and claim matrix |
| Exactly one Recommended | PASS structurally | Scope object has one recommended card; repeated FAQ prose makes raw text count unsuitable |
| Optional one Enhanced | PASS structurally | Scope object has one enhanced card |
| EN/AR rendering and direction | PASS server-rendered | `lang` and `dir` verified in both HTML responses |
| Internal links | PASS | Hydrated language switch round-trip and all other same-origin links return accepted statuses. |

## Build and test validation

- `npm run build`: PASS. Next.js compiled and generated 303/303 pages, including both groom routes.
- `npm test`: media-production suite 53 passed, 1 failed. The failure is the existing unrelated `silo CSS introduces no gradient` assertion in `tests/media-production.test.ts`, independently verified on clean HEAD and not caused by the groom page, language-switch or local-observability changes. All other project suites pass.
- `npm run lint`: FAILS because the configured script invokes removed Next.js 16 command behavior: `next lint` interprets `lint` as a project directory. This is a project script/tooling issue, not a groom page source error.
- `git diff --check`: PASS.
- Local server: `npm start -- -p 3101` started successfully. No deployment, push, or Vercel action performed.

## Website Services manager release gate rerun

- Approved-source digests: PASS. The groom page, Nav, i18n helper, locale layout and media-production test file exactly match the five SHA-256 anchors in approved brief v1.1.
- Diff scope: PASS. Only the five approved source/test files plus `.qa-groom/` evidence are included; `git diff --check` passes.
- `npm run build`: PASS, 303/303 static pages generated.
- `npx tsc --noEmit`: PASS after moving the stale ignored `.next/dev` cache out of the checkout. The production build's TypeScript phase also passes.
- `npm test`: all suites pass except the single known `silo CSS introduces no gradient` assertion. The same assertion independently fails on clean starting HEAD `6498a47`; it is not introduced by this candidate.
- `npm run lint`: unavailable because the repository script still calls removed Next.js 16 `next lint` behavior and resolves `lint` as a directory. This pre-existing tooling defect is not a groom-page source failure.
- Fresh local browser rerun: PASS at 1440px and 390px for EN and AR, EN → AR → EN round trip, no console/page errors, no horizontal overflow, no broken same-origin links and correct `ltr`/`rtl` direction.
- Fresh screenshot inspection: PASS. No clipping, overlap, fixed public prices or release-blocking visual defect was found in the four screenshots.
- Vercel linkage preflight: PASS. Local project ID `prj_6ymTS3PRYkMXHWRh8z4dem9axQdG` resolves to `big-story/filmwithbigstory`, and Vercel domain inspection maps both `filmwithbigstory.com` and `www.filmwithbigstory.com` to that project.
- Rollback target: `6498a47a5e97041d89f98ec673e1060c9229aae0`.

Manager verdict: **PASS — exact candidate is approved for the explicitly authorized Vercel production deployment.**

## Post-fix verification

- TDD regression tests cover `/en`, `/ar`, root-English and locale-root normalization, and enforce native anchors for both desktop and mobile language switches.
- Playwright artifact: `.qa-groom/language_switch_playwright.json`.
- Visual evidence: `.qa-groom/screenshots/groom-en-1440.png`, `groom-ar-1440.png`, `groom-en-mobile-390.png` and `groom-ar-mobile-390.png`.
- Desktop screenshots: PASS — complete reveal-scrolled pages, no clipping/overlap, no public prices, clear Recommended/Enhanced scope structure; Arabic uses correct RTL flow and legible typography.
- Mobile screenshots: PASS at 390px — cards stack cleanly, navigation collapses correctly, no clipping/overlap, and both DOMs report `clientWidth: 390` / `scrollWidth: 390` (zero horizontal overflow).
- At the time this evidence was captured, no commit, push, deployment or public release had yet been performed.

Commercial and Strategy ownership remain outside this QA verdict. Production deployment authority is separately and explicitly granted by approved brief v1.1 after this manager PASS.
