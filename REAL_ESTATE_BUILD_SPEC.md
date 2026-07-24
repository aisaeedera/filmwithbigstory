# BUILD SPEC: Dubai Real-Estate Film Service Page

## What you are building

A dedicated, SEO-focused service page at the route `/real-estate-video-production-dubai`
on filmwithbigstory.com, bilingual (English + Arabic), that presents Big Story's
real-estate film production service honestly. It is modeled structurally on the
existing QA-passed `/how-we-work` page — NOT on the service pages under `/services/`
(some of those contain fabricated portfolio numbers you must not imitate).

## Evidence source (READ THIS FIRST)

The research brief is at:
`/Users/aiagentmacbookprom1max/BIGSTORY/website/service_pages_research_brief.md`

Use ONLY Section 1 (REAL ESTATE FILMS, lines 26–207). Do NOT use Section 2
(clinic/dental) or Section 3 (smart home) — those are separate future pages.

## HARD CONSTRAINTS (violating any one fails the build)

1. NO fabricated portfolio. Big Story has zero real-estate shoots in the portfolio
   right now. You must not invent project names, client names, property addresses,
   view counts, "X+ properties filmed" claims, testimonials, or case studies.
   Numbers like "3–4x more enquiries" and "403%" MUST stay attributed to their
   cited source (Fotography.ae, Mintandco) — they are market data, not Big Story
   claims about itself.

2. NO fake photos. Do not add <img> tags pointing at stock images or invented
   property stills. The page is text + layout only. Where a visual would go, use
   a clearly labelled placeholder block with text like "Your property here" /
   "illustrative — not a Big Story project". Treat placeholders as honest design
   elements, not real imagery.

3. NO AI mention. The words "AI", "artificial intelligence", "machine learning",
   "automated", or any internal-tooling reference must NOT appear anywhere in the
   public-facing copy (not in EN, not in AR, not in meta tags). This is a hard
   site-wide rule.

4. NO rental positioning. This page is about FILM PRODUCTION service, not about
   renting camera gear. Do not link to or mention red.filmwithbigstory.com. The
   RED rental site is a separate business.

5. Timeline language must be conditional, never a flat promise. Use the exact
   framing from the brief: "5–10 working days from shoot to delivery for a single
   property; larger developer films 2–4 weeks." Always tie it to scope. Never say
   "guaranteed X days".

6. Humanizer / anti-AI-slop voice. The Big Story voice is declarative, specific,
   and willing to name what it does not yet have. BANNED words/phrases (EN): delve,
   leverage, elevate, seamless, robust, cutting-edge, game-changer, revolutionize,
   "at the end of the day", "in today's world", "unleash", "empower", "navigate",
   "unlock", "partner with us to", "let's dive in", "it's not just X, it's Y".
   NO em-dashes (—) in the copy; use commas, periods, or colons instead. NO
   rule-of-three lists used decoratively. NO rhetorical questions answered
   immediately. Vary sentence length. Have a point of view.

7. Everything bilingual. Every visible string has both `en` and `ar` forms. The
   Arabic must be real, natural MSA (Modern Standard Arabic) suitable for a UAE
   audience — not machine-translated slop. Mirror the `L` pattern:
   `{ en: "...", ar: "..." }`.

## ROUTE + FILES TO CREATE

### File 1 (NEW): `src/data/real-estate-films.ts`

A bilingual data file modeled exactly on `src/data/how-we-work.ts` (270 lines,
read it first to match the shape). Export a `realEstateFilms` const. Structure:

```
export const realEstateFilms = {
  meta: {
    title: { en, ar },        // ≤60 chars
    description: { en, ar },  // ≤155 chars
  },
  breadcrumb: { en, ar },
  hero: { eyebrow, h1, lead, promise },   // each { en, ar }
  sections: [ ... ],          // the 6-shot drone framework, process, formats, etc.
  marketData: { ... },        // the cited 3–4x / 403% stats with attribution
  drone: { ... },             // DCAA-compliant explanation
  compliance: { ... },        // RERA Trakheesi
  timeline: { eyebrow, h2, lead, items: [...] },
  pricingApproach: { ... },
  faq: { eyebrow, h2, items: [{ q: {en,ar}, a: {en,ar} }, ...] },
  noAsset: { ... },           // the honest "building our Dubai portfolio" stance
  cta: { heading },
} as const;
```

Put a header comment at the top (like how-we-work.ts has) documenting the content
source and the hard rules. The dev-comment header is the ONLY place "AI" may
appear, and only as an instruction to avoid it.

### File 2 (NEW): `src/app/[locale]/real-estate-video-production-dubai/page.tsx`

The page component, modeled on `src/app/[locale]/how-we-work/page.tsx` (120 lines,
read it first). Must include:
- `generateMetadata` using `pageMeta({ path: "/real-estate-video-production-dubai", ... })`
- Breadcrumbs (Home > Real estate films)
- Hero section
- The `sections` rendered with the same Section/Eyebrow/Reveal/bs-card pattern
- Market data section (the cited stats)
- Drone + compliance sections (DCAA, RERA)
- Timeline section
- FAQ section rendered with the `<Faq>` component (see how tvc page imports it:
  `import Faq from "@/components/Faq"`) AND `faqSchema(...)` in a `<JsonLd>` block
- `serviceSchema(...)` in a `<JsonLd>` block
- `breadcrumbSchema(...)` in a `<JsonLd>` block
- `<CtaBand>` at the bottom with `waContext="real-estate-films"`
- A truthful internal link to `/how-we-work` (rendered as a Next `<Link>` using
  `localizedPath(locale, "/how-we-work")`)

### File 3 (EDIT): `src/app/sitemap.ts`

Add two entries to the `staticPaths` array (one is enough since alternates are
generated for both locales automatically, but add the entry):
```
{ path: "/real-estate-video-production-dubai", priority: 0.9, changefreq: "monthly" as const },
```
Place it near the other top-level entries (after `/how-we-work`). Do not touch
any other sitemap logic.

## CONTENT — map brief Section 1 into the data file

Use these exact facts from the brief (all in Section 1 of service_pages_research_brief.md):

- Title (≤60): "Real Estate Video Production Dubai | Property Films"
- H1: "Real estate video production in Dubai"
- Meta (≤155): "Cinematic property films, drone aerials, and social cuts for Dubai developers, agents, and Airbnb hosts. Formatted for Property Finder, Bayut, and Reels."

### Sections to build (from brief 1D, adapted to honest voice):

1. Hero — the first-frame promise: a Dubai property film that earns the click.
2. What we produce — cinematic walkthroughs, drone aerials, off-plan developer
   films, lifestyle/Airbnb films, social cuts. Describe each in plain language.
3. Why video outperforms photos (MARKET DATA section) — use the two cited stats:
   - "Listings with video on Property Finder and Bayut average 3–4x more
     enquiries than photo-only listings at the same price point." (Fotography.ae)
   - "Listings with video receive up to 403% more inquiries; 73% of sellers
     prefer agents who market via video." (Mintandco.ae)
   These are attributed market facts, NOT Big Story self-claims. Frame them as
   "what the market shows", with the source named in the copy or a small
   "(source: ...)" note.
4. Our process / the shot framework — adapt the 6-shot drone checklist (Scott
   Prokop) and the 3 interior fundamental shots into Big Story's voice. Name it
   as "an industry-standard 6-shot drone framework adapted for Dubai properties".
   Include: shoot for the edit, golden-hour exteriors, color grade in DaVinci
   Resolve, portal-spec delivery. Do NOT claim we invented these.
5. Formats & delivery — Property Finder / Bayut / Dubizzle masters, web H.264,
   60s LinkedIn/Instagram cut, 9:16 Reel. One shoot day produces all of these.
6. DCAA-compliant drone (DRONE section) — explain what "licensed drone operator"
   means in Dubai: a valid DCAA UAS Operator Authorization, checked airspace,
   permits obtained before flight, and honest refusal if a location cannot be
   flown legally. Cite DCAR-UAS Issue 03 (DCAA/DCAR/2025/00007). State plainly
   that Big Story operates only under a valid DCAA authorization or subcontracts
   to a DCAA-authorized operator.
7. RERA Trakheesi compliance (COMPLIANCE section) — Trakheesi permit number must
   be on the film; Form A required; Madmoun QR code on visual ads; from Feb 2026
   a UAE Media Council Advertiser Permit is also required; fines start AED 50,000.
   Be explicit: "We deliver films with Trakheesi-ready metadata and a
   permit-display checklist. The permit itself is the advertiser's legal
   responsibility — we will tell you what to display and where, but we do not
   apply for permits on your behalf."
8. Timeline — 5–10 working days from shoot to delivery for a single property;
   2–4 weeks for larger developer films. Conditional on scope, not a flat promise.
9. Pricing approach — one well-planned shoot day produces the portal master +
   social cut + Reel (not three separate shoots). No specific AED numbers unless
   you can ground them — use "we quote after a brief scoping call" instead.
10. FAQ (6 questions, from brief 1E) — render as the FAQ section + faqSchema.
11. The honest no-asset stance (NO-ASSET / trust section) — adapted from brief 1I:
    lead with process, use labelled placeholders, quote market data, name
    regulatory reality, and invite the first project. Something like: "We are
    building our Dubai property portfolio. The first projects in 2026 get our
    full attention and a defined preferential rate. Contact Saeed." (Keep the
    offer honest and time-bounded; do not fabricate specific discount numbers
    unless grounded.)

### The 6 FAQ questions (brief 1E), each answered honestly:
- How long does a real-estate video shoot take in Dubai? (2–3 hrs apartment,
  4–6 hrs villa)
- Can you fly a drone over my property? (only with DCAA auth + permitted
  airspace; honest refusal if not legal)
- Do your videos meet Property Finder and Bayut specifications? (yes)
- Can you produce Instagram Reels and TikTok from the same shoot? (yes, one day)
- Do you handle the RERA Trakheesi permit? (no — advertiser's responsibility;
  we provide metadata + checklist)
- Will my video work for international buyers? (yes; EN captions default, other
  languages on request)

## VERIFICATION YOU MUST RUN BEFORE FINISHING

After writing the files, run these from the project root
(`/Users/aiagentmacbookprom1max/BIGSTORY/website/clients/filmwithbigstory/react-site`):

1. `npx tsc --noEmit` — must exit 0 (typecheck the new data file + page)
2. `npm run build` — must exit 0 and must show the new routes prerendered:
   `/en/real-estate-video-production-dubai` and `/ar/real-estate-video-production-dubai`
3. Grep your own new files for banned content:
   - `grep -ri "ai\|artificial intelligence\|machine learning" src/data/real-estate-films.ts src/app/\[locale\]/real-estate-video-production-dubai/page.tsx`
     (only allowed in the dev-comment header line of the data file)
   - `grep -r "—" src/data/real-estate-films.ts` — em-dashes must be 0 in copy
   - `grep -ri "delve\|leverage\|seamless\|robust\|cutting-edge\|empower\|unlock\|game-changer" src/data/real-estate-films.ts` — must be 0
4. Confirm NO `<img>` tags in the page (no fake photos).
5. Confirm every `{ en: ... }` has a sibling `ar:` (bilingual parity).

Do NOT commit, do NOT push, do NOT deploy. Leave the working tree with the new
files for the orchestrator to verify and ship. Report exactly which files you
created/edited and the verification command outputs.
