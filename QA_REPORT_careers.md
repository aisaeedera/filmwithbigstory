# QA REPORT — Careers Page Simplification (Single Google Form)

**Task:** t_3ef74b38 — NIGHT BUILD: Simplify careers page to one freelancer Google Form
**Date:** 2026-07-17 (night window, Dubai 23:03–23:30)
**Commit:** `6e2f41559c421e89389c68a20a5a7c5abba06681`
**Production deployment:** `dpl_HVXdzFTv3E29Xq5WuSCsKfy9VWyc` (READY / PROMOTED)
**Rollback target:** `dpl_6B8sma2hq4xiqYbgRKkavtrpXNKh` (commit 62b9a77), tag `rollback-pre-careers-redesign-20260717`

## Verdict: PASS — all P0/P1 checks green. Ship approved.

---

## Scope of change
The careers page now routes ALL applications through the **single verified freelancer Google Form**. The duplicate inline React form (CareerApplicationForm → `/api/careers/apply` → local `applicants.json` + a broken hidden-iframe POST with never-replaced placeholder `entry.XXXX` field IDs) was removed entirely.

### Files changed (10)
| File | Action |
|---|---|
| `src/app/[locale]/careers/page.tsx` | Rewritten — roster from data, how-to-join 4-step section, single Google-Form CTA, removed fake JobPosting schema, stat 5→26 |
| `src/lib/careers/roster.ts` | NEW — 26 roles, 7 categories, EN+AR summaries, Emirati tone |
| `src/lib/careers/positions.ts` | Synced comment (source of truth for 26 roles) |
| `src/lib/site.ts` | Removed unused `careersFormAction` + placeholder `careersFormFields`; kept `careersForm` |
| `src/components/CareerApplicationForm.tsx` | DELETED (the duplicate inline form) |
| `src/app/api/careers/apply/route.ts` | DELETED (+ empty parent dirs) |
| `src/lib/careers/storage.ts` | DELETED (local applicants.json persistence) |
| `src/data/copy.ts` | Removed dead `careers` export block (0 importers) |
| `tests/careers.test.ts` | Replaced local-storage test with roster-coverage test |
| `CAREERS_REDESIGN_BRIEF.md` | Spec doc (committed) |

---

## P0 checks (blockers) — ALL PASS

### 1. Build & types
- `npx tsc --noEmit` → **exit 0**
- `npm run build` → **exit 0**; 109/109 static pages; `/en/careers` + `/ar/careers` generated; `/api/careers` route correctly absent

### 2. Tests
- `npm run test:careers` → **3/3 pass** (roster↔CAREER_POSITIONS exact match, EN+AR completeness, category coverage)

### 3. Single application path (the core requirement)
Live production DOM audit (both viewports, both locales):
- **Google Form is the sole CTA.** `Apply to the roster` / `قدّم إلى السجل` link → `https://docs.google.com/forms/d/e/1FAIpQLSdvtBTHSBilw_ghQcgI7y0sACAbcsZhrmu7MlyVzPmWUr2Ueg/viewform`
- `target="_blank"`, `rel="noopener"` ✓
- Discernible CTA text (not "click here") ✓
- className `bs-btn bs-btn-gold` (primary button) ✓

### 4. Duplicate form fully removed (grep evidence)
`grep -rn "CareerApplicationForm|/api/careers/apply|careersFormAction|careersFormFields|career-pool|applicants.json" src` → **0 hits**
Live HTML negative checks (EN + AR):
- "Join the talent network" old submit → **0**
- "Position interested in" old select → **0**
- `name="company"` honeypot field → **0**
- `/api/careers/apply` reference → **0**
- placeholder `entry.XXXX` IDs → **0**

### 5. POST `/api/careers/apply` returns non-200
Live: returns **401** (route removed — Next.js middleware gate on unknown POST). Old broken path is dead.

### 6. Console errors
Playwright capture (4 page-loads: EN/AR × desktop/mobile) → **0 console errors, 0 page errors**

### 7. Routes health (no collateral damage)
12/12 key routes HTTP 200: `/`, `/ar`, `/careers`, `/ar/careers`, `/contact`, `/pricing`, `/about`, `/work`, `/services`, `/faqs`, `/privacy-policy`, `/terms-conditions`

### 8. Cross-deploy isolation (RED domain uncontaminated)
- `red.filmwithbigstory.com/` → 200, still its own RED Komodo rental site
- `red.filmwithbigstory.com/careers` → **404** (correct — separate project, no careers page)
- 0 references to new roster/CTA on RED domain ✓

---

## P1 checks — ALL PASS

### Roster completeness (26 HR-approved roles)
`roleArticleCount = 26` (Playwright DOM count). All HR-expanded roles confirmed on live HTML: Actor, Voice-over Artist, Director (+ AD), Producer (+ PM, PA), DP/Cinematographer, Camera Operator, 1st/2nd AC, **Gaffer**, Grip, Sound Recordist, Boom Operator, Drone Operator, Photographer, Video Editor, Colorist, Motion/VFX, Art Dept, Set Dresser, Stylist, HMUA, Location, Casting, Other. Matches the verified live Google Form Primary Role dropdown exactly.

### "How to join the roster" section
4-step numbered grid (EN + AR): Choose roles → Add portfolio/reel/CV → Share availability/rates → We contact you when there's a fit. `stepCount` confirmed. Ends with honest disclaimer: "The roster is open now. Joining does not imply permanent employment — we contact suitable freelancers project by project."

### No fake vacancies / no permanent-employment implication
- Removed fake `JobPosting` JSON-LD schema (was posting 5 fake vacancies with validThrough dates) → **0 JobPosting** in live HTML
- Hero stat changed "5 priority roles" → "26 disciplines open now"
- Banned wording scan clean: 0 "Saudi", 0 AI-isms, 0 "vacancy/hiring/N people/permanent(full-time guarantee)"
- The only "permanent" matches are the explicit **disclaimers** saying it is NOT permanent — correct.

### Responsive (mobile-first)
Playwright at 375×667 and 1440×900:
- `horizontalOverflow = 0` on BOTH (no mobile horizontal scroll — critical)
- CTA visible at both viewports
- Roster grid stacks cleanly (mobile: single column; desktop: 2-col)
- Heading hierarchy sequential: 1×h1 → 4×h2 → 11×h3 → 26×h4

### Accessibility (structural)
- `lang="en-AE"` / RTL `ar` on Arabic ✓
- Skip-to-content link present ("Skip to content") ✓
- CTA button near-black text on gold = high contrast ✓
- Every role is an `<h4>` with a paragraph summary (semantic) ✓
- Form inputs removed → no orphaned labels (old form gone) ✓

### SEO / schema
- Per-page title + meta desc updated ("Freelance Talent Roster | Big Story Dubai", EN+AR)
- Breadcrumb + FAQ JSON-LD retained (FAQ correctly says "not permanent jobs")
- `/sitemap.xml` still lists `/careers` (priority 0.5) ✓
- `/robots.txt` intact ✓
- `#apply` anchor preserved (deep links + old JobPosting URL no longer 404 the section)

### Deployment safety (Vercel multi-site)
- Explicit target IDs verified via API: project `prj_6ymTS3PRYkMXHWRh8z4dem9axQdG`, org `team_obO4dT1uw5M5q7tNC8TAtFyC`
- Preview-first: deployed preview (`dpl_DtcXr9M3iXSDuB1hSmk8EnxhGQnS`) → verified 200 → then promoted prod
- Production aliased to `filmwithbigstory.com` ✓
- Rollback tag `rollback-pre-careers-redesign-20260717` pushed (→ 62b9a77); prior prod deployment intact as rollback candidate

---

## Screenshots (evidence)
- `/tmp/careers_qa_shots/desktop/careers_en_desktop.png` (1440×5506)
- `/tmp/careers_qa_shots/desktop/careers_ar_desktop.png` (AR, RTL)
- `/tmp/careers_qa_shots/mobile/careers_en_mobile.png` (375×7445)
- `/tmp/careers_qa_shots/mobile/careers_ar_mobile.png` (AR, RTL)
- Baseline (before): `/tmp/nightp0_shots` (from parent task)

## Notes / known constraints
- The Google Form requires Google sign-in (file-upload question — hard Google Forms platform constraint, documented by parent tasks t_9def491b + t_c0362c44). This is expected; the page now explains it honestly: "The form asks you to sign in with a Google account because it includes a file upload — that is expected."
- Vision analysis unavailable this session (GLM-5V model 429) — verification done via Playwright DOM/structure audit, live HTML grep, HTTP probes, and accessibility-tree snapshots (same fallback approach as parent QA task t_377eeab2).
- Project/client contact kept separate (no project form on this page — freelancer roster only). Footer project WhatsApp/email unchanged.

## Sign-off
All P0 blockers pass. All P1 serious checks pass with evidence. Ready for preview/share + production (already promoted).
