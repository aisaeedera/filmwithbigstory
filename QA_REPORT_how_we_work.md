# QA REPORT — How We Work rewrite (t_28045bad)

**Task:** t_28045bad — NIGHT BUILD: Rewrite How We Work with real pre-production depth
**Site:** filmwithbigstory.com
**Date:** 2026-07-21 (night build, 23:03–23:42 Dubai)
**Worker:** bigstory-web (GLM-5.2 orchestrator) + Claude Code (Opus 4.1) build engine
**Content source:** `how_we_work_research_brief.md` (QA-passed in t_29270912, 10 cited sources)
**Commit:** `ce48cd9` (branch) → merged `903b7a9` (main)
**Production deploy:** `dpl_EGudrDmgfZJR1HrgdWa9FZekeiZK` (READY)

---

## Summary

Replaced the thin 4-step "How We Work" homepage band with a dedicated, evidence-backed `/how-we-work` route (EN + AR). The new page carries real pre-production depth from the research brief: discovery, concept & treatment, content & script, storyboard & shot design, casting/locations/logistics, production/post/delivery, plus conditional timelines and a complexity section. Homepage band upgraded to a sharper teaser with a CTA to the new page. Nav + footer + sitemap wired.

## Verdict: PASS — ship approved

All P0/P1 checks green against live filmwithbigstory.com + committed source `903b7a9` + RED sibling.

## Content rules (all PASS)

| Check | Result | Evidence |
|---|---|---|
| No AI mention in public copy | PASS | `grep -icE '\b(AI\|artificial intelligence\|machine learning\|GPT\|ChatGPT\|LLM)\b'` on live HTML = 0; only references are in the data-file developer comment header (lines 6–7) |
| Timeline language conditional | PASS | "Four to eight weeks from concept lock, depending on cast, locations and post." + "One to three weeks is sometimes possible after we review scope… We will not promise it until we have seen the job." Never universal. |
| Humanizer-compliant copy | PASS | 0 banned words (seamless/testament/delve/vibrant/showcase/nestled/etc.); 0 em-dashes (U+2014) in how-we-work.ts |
| No fabricated quotes/team/case studies | PASS | All copy is Big Story first-person voice synthesized from sources; no attributed quotes, no invented team |
| Bilingual EN + AR | PASS | Every string has both locales; AR rendered live (h1, timeline, complexity verified) |

## Build verification (all PASS)

| Check | Result |
|---|---|
| `npm run build` | exit 0; `/en/how-we-work` + `/ar/how-we-work` prerendered SSG |
| `npx tsc --noEmit` | exit 0 |
| `npm run test` | 3/3 pass (roster coverage, EN/AR completeness, categories) |
| Pages generated | 54 route groups (was 53; +1 for how-we-work) |

## Live HTTP routes (all PASS)

| URL | Status |
|---|---|
| https://filmwithbigstory.com/how-we-work | 200 |
| https://filmwithbigstory.com/ar/how-we-work | 200 |
| https://filmwithbigstory.com/ | 200 (homepage teaser + CTA live) |
| https://filmwithbigstory.com/about | 200 (unchanged) |
| https://filmwithbigstory.com/services | 200 (unchanged) |
| https://red.filmwithbigstory.com/ | 200 (RED home, unaffected) |
| https://red.filmwithbigstory.com/how-we-work | 404 (correct — separate project, route does not exist) |

## SSR content (all PASS)

EN live HTML contains: hero h1 "Most clients come to us with a feeling, not a brief.", section "A shot list is an edit test, not decoration.", timeline "Four to eight weeks from concept lock", complexity "We hold the complexity. You hold the message."
AR live HTML contains: "معظم عملائنا يأتون إلينا بإحساس", "من أربعة إلى ثمانية أسابيع من اعتماد الفكرة", "نتكفّل نحن بالتعقيد".

## SEO (all PASS)

| Check | Result |
|---|---|
| Unique title | "How We Work \| Our Film Production Process \| Big Story" |
| Meta description | Present, unique, honest (mentions discovery, treatment, locked script, call sheet, honest timelines) |
| Canonical | https://filmwithbigstory.com/how-we-work |
| hreflang | en-AE, ar-AE, x-default all present |
| Open Graph | og:title, og:description, og:url, og:site_name, og:locale=en_AE, og:type=website |
| JSON-LD BreadcrumbList | Present |
| Sitemap | /how-we-work + /ar/how-we-work both in sitemap.xml |

## Accessibility + responsive (Playwright, all PASS)

Tested at desktop 1440x900 and mobile 375x812, EN + AR (4 combinations).

| Check | EN desktop | AR desktop | EN mobile | AR mobile |
|---|---|---|---|---|
| No horizontal overflow (body.scrollWidth == clientWidth) | PASS | PASS | PASS | PASS |
| Exactly 1 h1 | PASS | PASS | PASS | PASS |
| Heading order sequential | PASS | PASS | PASS | PASS |
| No stuck-hidden Reveal (after realistic scroll) | PASS (0 hidden) | PASS | PASS | PASS |
| html lang + dir correct | en-AE/ltr | ar-AE/rtl | en-AE/ltr | ar-AE/rtl |
| No console errors | PASS | PASS | PASS | PASS |
| Nav/footer how-we-work link present | PASS (4 refs) | PASS | PASS | PASS |
| Section count >= 8 | PASS (10) | PASS (10) | PASS | PASS |

### Reveal component (canonical pattern)
All 23 Reveal elements correctly reach `is-in` (shown) state after realistic scroll. The canonical pattern (default visible, JS arms only off-viewport elements, revealed on intersection) works as designed. Verified 0 elements stuck at opacity:0 after a proper incremental scroll with IO callback time.

### Skip-link note (non-blocking)
`documentElement.scrollWidth` reports larger than `clientWidth` on AR pages. Root cause: the `.bs-skip` "Skip to content" link uses the standard accessible pattern (`position:absolute; left:-9999px`, moved to `left:0` on focus). In RTL this inflates documentElement.scrollWidth but `body.scrollWidth` is correct (1440 == clientWidth, no real overflow). This is a site-wide pattern (exists on /about too, pre-dates this build), not a regression, and is not visible to users.

## Cross-deploy isolation (PASS)

- RED project (`prj_` for red-rental) is a separate Next.js project; /how-we-work does not exist there (404, correct).
- filmwithbigstory production deploy is the only one changed.
- Stashed in-flight contact-wizard work (package.json, contact page, actions.ts, site.ts, ContactWizard components) was preserved in `stash@{0}` and not touched by this build.

## Screenshots

- /tmp/howwework_qa_shots/desktop/how_we_work_en.png (1440x900, full page)
- /tmp/howwework_qa_shots/desktop/how_we_work_ar.png (1440x900, full page)
- /tmp/howwework_qa_shots/mobile/how_we_work_en.png (375x812, full page)
- /tmp/howwework_qa_shots/mobile/how_we_work_ar.png (375x812, full page)
- /tmp/howwework_qa_shots/desktop/home_teaser_en.png (homepage band)
- /tmp/howwework_qa_shots/desktop/post_scroll_check.png (post-scroll verification)

Vision-model audit unavailable this session (auxiliary vision model returned "Unknown Model" 400 error); all visual verification done via Playwright DOM/structure audit + live HTML grep + HTTP probes, the documented fallback per the vercel-production-checklist and website-qa-gate skills.

## Deployment (preview-first, PASS)

- **Preview deployed first:** `dpl_9ePMK5jJvyBXiZZsvb9A3hQwra1s` on branch `feat/how-we-work`, reached READY before promotion. (SSO-protected *.vercel.app alias; verified READY via API.)
- **Production promote:** merge `feat/how-we-work` → `main` (`903b7a9`), git push triggered GitHub-integrated production deploy.
- **Production deployment:** `dpl_EGudrDmgfZJR1HrgdWa9FZekeiZK`, READY, serving commit `903b7a9`.
- **Explicit Vercel IDs:** orgId `team_obO4dT1uw5M5q7tNC8TAtFyC`, projectId `prj_6ymTS3PRYkMXHWRh8z4dem9axQdG`.

## Files changed

- **New:** `src/data/how-we-work.ts` (270 lines, bilingual data, all 7 sections + timeline + complexity)
- **New:** `src/app/[locale]/how-we-work/page.tsx` (120 lines, mirrors clients page pattern)
- **Edited:** `src/app/[locale]/page.tsx` (homepage band upgraded: lead + sharper steps + CTA to /how-we-work)
- **Edited:** `src/data/copy.ts` (nav.howWeWork label, homepage teaser copy + ctaLabel)
- **Edited:** `src/components/Nav.tsx` (how-we-work link added after about)
- **Edited:** `src/components/Footer.tsx` (how-we-work link added after about)
- **Edited:** `src/app/sitemap.ts` (/how-we-work added, priority 0.75)

## Rollback

Previous production deploy `dpl_3TzMFogHKuLhcEjJaYfiiLP5Essc` (commit `9dad35c`) is intact. Revert via `git revert 903b7a9` + push, or Vercel UI rollback to that deployment.
