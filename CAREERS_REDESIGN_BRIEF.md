# Careers Page Redesign Brief — Simplify to ONE Google Form

## Project
filmwithbigstory.com (Next.js 16, React 19, Tailwind v4). Working dir: the repo root (where this file lives).

## Goal
Simplify the careers page so the **verified freelancer Google Form is the ONLY application path**. Remove the duplicate inline React application form. Add a clear "How to join the roster" section. Expand to all 26 HR-approved roles. Use Emirati/UAE wording. Do NOT reintroduce a team showcase or feature applicants.

## Canonical Google Form (the ONLY application path)
- Public URL (use this for all "Apply" links): `https://docs.google.com/forms/d/e/1FAIpQLSdvtBTHSBilw_ghQcgI7y0sACAbcsZhrmu7MlyVzPmWUr2Ueg/viewform`
- This form REQUIRES Google sign-in (it has a file-upload question — a hard Google platform constraint). That is expected and fine. Visitors sign in with any Google account to fill it.
- The form is owned by hi@filmwithbigstory.com (Saeed Al Falasi). It already has 26-item structure: Primary Role dropdown (26 roles), Languages Spoken, portfolio/reel/CV file upload, availability/rates, consent-to-be-contacted.
- This URL already lives in `src/lib/site.ts` as `SITE.careersForm`.

## What to CHANGE

### 1. Remove the duplicate inline application form + its backend
The inline `CareerApplicationForm` component POSTs to `/api/careers/apply` which writes a local `applicants.json`, AND fire-and-forget-POSTs to the Google Form via hidden iframe with PLACEHOLDER field IDs (`entry.1111111111` etc. that were never replaced). This is a duplicate, broken path. Remove it so the Google Form is the single source of truth.

- `src/app/[locale]/careers/page.tsx`: remove the `<CareerApplicationForm />` usage and its import. Replace the `#apply` section with a clean **"How to join the roster"** CTA section that links to `SITE.careersForm` (open in a new tab: `target="_blank" rel="noopener"`). Keep the `id="apply"` anchor on the section so existing deep links (`/careers#apply`) and the JobPosting schema `url` still resolve.
- Delete `src/components/CareerApplicationForm.tsx`.
- Delete `src/app/api/careers/apply/route.ts` (and its now-empty parent `api/careers/` and `api/careers/apply` dirs if empty).
- Delete `src/lib/careers/storage.ts` (the `applicants.json` persistence — no longer needed; the Google Sheet behind the form is the source of truth).
- Keep `src/lib/careers/positions.ts` (the 26-role list) — it is the source of truth for the roster grid. Keep `src/lib/site.ts` `careersForm` URL; you may remove the now-unused `careersFormAction` and `careersFormFields` placeholder fields since the hidden-iframe POST is gone (they were never real — all placeholder IDs).

### 2. Expand the roster to all 26 HR-approved roles
The page currently hardcodes a `positions` array of 10 roles inside `page.tsx`. Replace this with a render driven by the canonical 26-role list in `src/lib/careers/positions.ts` (`CAREER_POSITIONS`). Build a richer roster data structure (in `positions.ts` or a new `src/lib/careers/roster.ts`) that pairs each of the 26 roles with:
- English title (use the exact string from CAREER_POSITIONS)
- Arabic title (reuse the existing `positionArabic` map values from the deleted CareerApplicationForm — copy them into the roster data)
- A short Emirati/UAE-flavoured English summary (1 line each)
- A short Arabic summary (1 line each)
- A category grouping for the grid (e.g. "On-screen & Direction", "Camera & Lighting", "Sound", "Art & Styling", "Post-production", "Production & Logistics") — pick sensible groupings.

The 26 roles (exact strings) from `CAREER_POSITIONS`:
1. Actor / On-screen Talent
2. Voice-over Artist
3. Director
4. Assistant Director (1st/2nd AD)
5. Producer
6. Production Manager
7. Production Assistant / Runner
8. DP / Cinematographer
9. Camera Operator
10. 1st / 2nd AC (Focus Puller / Camera Assistant)
11. Gaffer / Lighting Technician
12. Grip
13. Sound Recordist
14. Boom Operator
15. Drone Operator
16. Photographer
17. Video Editor
18. Colorist
19. Motion Graphics / VFX Artist
20. Art Department / Production Designer
21. Set Dresser / Props
22. Stylist / Wardrobe
23. Hair & Makeup (HMUA)
24. Location Manager / Scout
25. Casting Director
26. Other media-production role (specify in notes)

These include the HR-approved expanded roles: actors, voice-over artists, directors AND gaffers (plus many more). All present in the live Google Form's Primary Role dropdown — verified by an independent QA pass.

### 3. Add a "How to join the roster" section
Replace the old inline-form section with a clear, numbered 4-step explainer (English + Arabic) that mirrors the actual Google Form flow. Wording (EN):
1. Choose your roles — pick the discipline(s) where you are strongest.
2. Add your portfolio, reel or CV — upload links or files in the form.
3. Share your availability and rates — tell us your UAE base and when you can work.
4. We contact you when there's a fit — Big Story reaches out to suitable people for upcoming productions.

Arabic equivalents (RTL), Emirati/UAE tone. Each step pairs a number, a short title, and one-line description.

The section ends with a prominent **primary CTA button** "Apply to the roster" (EN) / "قدّم إلى السجل" (AR) linking to `SITE.careersForm`, `target="_blank" rel="noopener"`. Below it, a small honest line: "The roster is open now. Joining does not imply permanent employment — we contact suitable freelancers project by project." (EN + AR).

### 4. Mark the roster open WITHOUT implying permanent employment
- The hero "priority roles open now" stat: update to reflect the roster is open across all 26 disciplines (e.g. "26 disciplines open" or "Roster open · 26 roles"). Remove the old "5 priority roles" framing that implied specific vacancies.
- Remove/replace any language that implies permanent employment, guaranteed jobs, or specific headcount ("3–5 people", "hiring", "vacancies", "jobs"). Use "freelance roster", "project-based", "talent network", "we contact suitable people".
- The JobPosting JSON-LD schema currently posts 5 fake JobPostings with `validThrough` dates — that implies concrete vacancies. Either (a) remove the JobPosting schema entirely, OR (b) keep at most a single generic schema. RECOMMENDED: remove the per-role JobPosting schema (it implies fake vacancies and can hurt SEO trust). Keep the breadcrumb + FAQ schema. The FAQ already correctly says "Are these permanent jobs?" → no. Keep that FAQ but expand it lightly if needed.

### 5. Wording rules (critical — these are content law)
- Emirati/UAE wording. No "Saudi", no generic Gulf vagueness. Reference "UAE", "Dubai, Abu Dhabi and the Northern Emirates", "Emirati weddings" where relevant.
- De-AI'd, human voice (the parent P0 task already de-AI'd the rest of the site — match that register: confident, specific, no hype, no "cutting-edge/leverage/seamless/unleash").
- Arabic must be proper MSA with UAE flavour, correctly RTL. The page already has `isAr`/locale handling — keep using it.
- Keep project/client contact SEPARATE: do NOT add a "contact us about a project" form on this page. This page is freelancer-roster only. The footer (with project WhatsApp/email) stays as-is in the layout.
- Do NOT reintroduce a team showcase. Do NOT feature individual applicants or testimonials.

## What NOT to change (stay minimal, isolate the blast radius)
- Do NOT touch the global Footer, Navbar, layout, theme, fonts, or any other page.
- Do NOT touch pricing data (there is a pricing freeze addendum — RED package prices must stay 900/1400/1800). You are only editing the careers page + removing its now-dead inline form backend.
- Do NOT touch the RED rental sibling project (red.filmwithbigstory.com) — different Vercel project, must stay uncontaminated.
- Do NOT change `src/app/sitemap.ts` /careers entry (keep priority 0.5).
- Keep the `/careers` route and `/ar/careers` route working in both locales.
- Keep accessibility: the CTA link must have discernible text, focus-visible, alt/aria where needed, keyboard reachable, semantic headings in order.

## Files you will touch (expected)
- EDIT `src/app/[locale]/careers/page.tsx` (main rewrite — roster from data, how-to-join section, CTA, schema cleanup, stat update)
- EDIT or CREATE `src/lib/careers/roster.ts` (26-role roster data EN+AR summaries + categories) — OR expand `positions.ts`. Keep `CAREER_POSITIONS` export intact (tests may reference it).
- DELETE `src/components/CareerApplicationForm.tsx`
- DELETE `src/app/api/careers/apply/route.ts` (+ empty parent dirs)
- DELETE `src/lib/careers/storage.ts`
- EDIT `src/lib/site.ts` (remove unused `careersFormAction` + `careersFormFields` placeholder block; KEEP `careersForm`)
- EDIT `tests/careers.test.ts` — it currently imports from `storage.ts` which you are deleting. Remove/replace this test file so `npm run test` still passes (the test exercised the now-removed local-storage path; with the Google Form as sole path there is no local persistence to test, so delete the test file and remove it from the `test` script in package.json, OR replace with a lightweight test that the 26 roster roles match `CAREER_POSITIONS`). RECOMMENDED: replace with a test asserting roster coverage, and keep the `test:careers` script pointing at it.
- Remove the now-unused dead `careers` export block in `src/data/copy.ts` (lines ~393-410) IF nothing imports it (verify with grep first — it had 0 importers at brief time). Only remove if truly unused.

## Verification you must run before finishing
1. `npx tsc --noEmit` — must exit 0 (no type errors anywhere, including the deleted-import cleanup).
2. `npm run build` — must exit 0, all static pages generate. Confirm `/careers` and `/ar/careers` are in the output.
3. `npm run test:careers` (or `npm test`) — must pass.
4. `grep -rn "CareerApplicationForm\|/api/careers/apply\|careersFormAction\|careersFormFields\|career-pool\|applicants.json" src` — should return ZERO hits (all duplicate-form references gone).
5. Confirm `SITE.careersForm` is still referenced by the careers page CTA.
6. Git: stage ONLY the files in this repo (filmwithbigstory/react-site), commit with a clear message, and report the commit SHA. Do NOT push yet (the orchestrator will push + deploy). Actually — DO `git add -A && git commit && git push origin main` since you have the remote. Report the push result.

## Design notes
- Dark premium theme already exists (Tailwind v4 + CSS vars: `--color-gold`, `--color-line`, `--color-muted`, `--color-elevated`). Use the existing primitive components (`Section`, `Eyebrow`, `Reveal`, `Breadcrumbs`) already imported in the page. Match the existing visual rhythm (the roster list, the stat block with gold accent border).
- The "How to join" 4 steps: render as a clean numbered grid (2x2 on desktop, stacked on mobile) using the same border/divider language as the existing roster list.
- CTA button: use the existing `bs-btn bs-btn-gold` classes.
- Mobile-first: test the layout at 375px width mentally — the roster grid and steps must stack cleanly.

## Summary of the single decision
ONE form (the Google Form), reached via an "Apply to the roster" button. No inline form. No local applicants.json. No fake JobPosting vacancies. 26 roles. How-to-join steps. Emirati wording. Honest open-roster framing.
