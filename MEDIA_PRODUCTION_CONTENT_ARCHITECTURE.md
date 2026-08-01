# Media Production Silo — Content Architecture, Design & Integration Plan

**Companion to:** `MEDIA_PRODUCTION_RESEARCH.md`
**Status:** approval-ready. Every string below ships from `src/data/media-production.ts`.
**Date:** 2026-08-01

---

## 1. Verification source constraints (read this first)

These constraints govern every other section of this document.

1. **No invented entities.** No client name, logo, testimonial, award, quote,
   headcount, year-founded, project count or credit appears anywhere in this
   silo. `src/data/clients.ts` documents the standing no-logo / no-testimonial
   policy and this silo follows it.
2. **No performance claims.** No conversion lift, no view counts, no "trusted
   by N brands", no before/after metrics. `src/data/work.ts` states in its own
   header that its entries are concept frameworks rather than shipped client
   work, so nothing in `/work` can be presented as a result.
3. **No prices, ever, on the rendered page.** See §7.
4. **Outcomes are stated as intent, not guarantee.** Copy uses "built to",
   "designed so that", "the point of this is". It never uses "will increase",
   "guaranteed", "proven to".
5. **Timelines are conditional.** Ranges are described as typical and
   scope-dependent, matching the existing rule in `src/data/how-we-work.ts`.
6. **Trust block links, it does not assert.** The "What you can check" section
   contains only links to pages that already exist in this repository
   (`/how-we-work`, `/work`, `/about/saeed`, `/service-areas`, `/clients`) with
   neutral descriptions of what the reader will find there.
7. **No em-dash character in visitor-facing copy.** Enforced by an automated
   test over `src/data/media-production.ts` and the two route files.

---

## 2. Page-by-page copy outline

### 2.1 Hub — `/media-production`

| Block | Purpose | Content |
| --- | --- | --- |
| Hero | Orient and split traffic | Eyebrow `Media Production · Dubai`, H1 `Media Production`, lead paragraph, two **differentiated** CTAs |
| Situation index | The three silo children as an editorial numbered index, not cards-with-icons | 01 Company media revamp, 02 New product launch, 03 New company launch |
| Capability index | Preserves the link equity the retired `/services` hub used to carry | Every entry in `services[]` from `src/data/services.ts`, rendered as ruled index rows linking to `/services/{slug}` |
| Process | Six stages, sourced from the published `/how-we-work` process | Discovery, treatment, locked script, storyboard and call sheet, shoot, post and delivery |
| Scope and packages | The price gate surface | Non-price placeholder, see §7 |
| What you can check | Trust without assertion | Four links to existing pages |
| FAQ | Five questions, mirrored into `FAQPage` | See research doc §2 |
| Inquiry | The multi-step form, anchored at `#project-inquiry` | See §6 |
| Final CTA | One closing action, distinct from the hero CTAs | Anchors to the form or opens WhatsApp |

**Hero CTA differentiation.** The two hero CTAs are deliberately different in
kind, not two buttons for the same action:

* **Primary (solid gold):** `Start a project brief` → in-page anchor to
  `#project-inquiry`. This is a commitment action.
* **Secondary (ghost):** `See how we work` → `/how-we-work`. This is a
  reassurance action for a reader who is not ready.

The final CTA at the foot of the page is a third, distinct action
(`Talk it through on WhatsApp`) so no CTA is duplicated on the page.

### 2.2 Service pages — the shared skeleton

Each of the three children renders the same ordered blocks, populated from its
own entry in `src/data/media-production.ts`:

1. **Breadcrumbs** Home → Media Production → this page.
2. **Hero** eyebrow, single H1, lead, one primary CTA (anchor to the on-page
   inquiry form) and one secondary CTA (up to the hub).
3. **The problem** a plain description of the situation that brings someone to
   this page. No fear-selling, no invented statistic.
4. **What this is built to do** the intended outcome, stated as intent. Three
   short statements. Each is phrased so it remains true regardless of result.
5. **How the production runs** four to five ordered stages specific to this
   engagement, rendered as a numbered editorial list.
6. **Scope and deliverables** the price-gated placeholder block (§7).
7. **FAQ** four questions, mirrored into `FAQPage`.
8. **Related** the other two silo pages plus the relevant existing
   `/services/*` pages.
9. **Distinctive CTA** each page closes with its own heading and its own
   WhatsApp context string, so the three pages do not end identically.

---

## 3. Design direction

**Art direction: editorial cinema, set on paper.** The site already owns a dark
cinematic palette (`--color-bg #08080a`, `--color-gold #c9a227`, Fraunces
display, IBM Plex Mono eyebrows). This silo pushes that further toward a
*printed call sheet* feel rather than a SaaS landing page.

* **No gradients.** Depth comes from the existing `--color-bg` / `--color-bg-alt`
  / `--color-elevated` step and from hairline rules in `--color-line`.
* **No decorative icon set.** Meaning is carried by mono numerals (`01`, `02`,
  `03`), hairline rules, and generous type scale contrast.
* **No stock people, no external imagery.** `public/` contains no photography in
  this repository, and this build introduces none rather than importing
  unverified stock. Every visual element is typography, rule or spacing.
* **The index row** is the signature component: a full-bleed ruled row with a
  mono index number, a display-face title, a muted one-line description and a
  gold arrow that slides on hover. It reads like a contents page in a film
  treatment and it is what the situation index and the capability index both use.
* **The slate block** is the secondary component: a bordered block with a mono
  uppercase label sitting on the border, used for the scope placeholder and the
  "what you can check" links. It references a camera slate without drawing one.
* **Alt text.** No `<img>` or `next/image` element is introduced by this silo,
  so there is no alt text to write. All decorative glyphs (arrows, rules, the
  `+` in the FAQ disclosure) carry `aria-hidden="true"` and are never the sole
  carrier of meaning. If real photography is added later, alt text becomes a
  required field on the asset entry in `src/data/media-production.ts`.

---

## 4. Mobile behavior (375px first)

* Single column throughout. The two-column editorial splits collapse to stacked
  blocks at `md`.
* H1 uses `clamp(2.5rem, 6vw, 4.5rem)`, matching the existing hub pages, so the
  hub H1 never wraps to more than two lines at 375px.
* Index rows drop the inline arrow into the row and keep a 44px minimum target.
* Hero CTAs stack full width below 380px and sit side by side above it, using
  the existing `.bs-wizard-footer` breakpoint convention.
* **Sticky mobile CTA** (`.bs-mp-sticky`): a single bar pinned to the bottom of
  the viewport below `md`, containing one action only (`Start a project brief`,
  anchoring to `#project-inquiry`). It is rendered by a server component with no
  JavaScript, respects `env(safe-area-inset-bottom)`, and is hidden with
  `display: none` when the viewport is `md` or wider so it never duplicates the
  desktop CTAs. It is not a second copy of the hero CTA in tone: the hero CTA is
  the page's primary action and the sticky bar is the same action made
  persistently reachable, which is why no third action is added to it.
* The FAQ uses native `<details>`, so it is operable and readable with no
  JavaScript at all.

---

## 5. Motion plan

| Element | Motion | Trigger |
| --- | --- | --- |
| Section blocks | 28px rise + fade, 600ms, `--ease-out` | Existing `Reveal` component, IntersectionObserver |
| Index rows | Gold arrow translates 4px on the inline axis, 250ms | Hover / focus |
| Cards and slates | 4px lift + gold-tinted border, 300ms | Hover / focus |
| FAQ marker | `+` rotates 45° to an `×`, 300ms | `details[open]` |

**Reduced motion.** `globals.css` already zeroes animation and transition
durations under `prefers-reduced-motion: reduce`, and separately forces
`.bs-reveal` to `opacity: 1; transform: none`. New CSS in this silo adds only
`transition` properties, which that existing rule already neutralises, so no new
media query is required. Verified by rendering with the reduced-motion emulation
flag set.

**No-JS / SSR.** `Reveal` renders visible by default and only arms itself once
JavaScript has mounted, so with JavaScript disabled every section is fully
visible. The sticky CTA, the FAQ and all links are server-rendered. The only
JavaScript-dependent element in the silo is the inquiry form, and it degrades to
a labelled, keyboard-operable form whose submit path is described in §6.

---

## 6. Lead routing and the inquiry form

### 6.1 What ships

`src/components/MediaInquiryForm.tsx` is a three-step client component with
progressive disclosure, modelled on the proven `ContactWizard`:

* **Step 1** Project type (four options, one of which is `Not sure yet`).
  Choosing a type **progressively discloses** a second fieldset asking where the
  reader is in their process. Nothing is revealed before a choice is made.
* **Step 2** Timeline. Non-monetary only.
* **Step 3** Name, phone, email, optional notes, and an optional
  `<details>` disclosure for company name.

Accessibility: every control has a real `<label>` or `<legend>`; the chip groups
are native radio inputs visually restyled, so arrow-key selection works; errors
render inline with `aria-invalid` and `aria-describedby` plus a `role="alert"`
error summary with in-page links to the offending field; focus moves to the step
heading on step change and to the error summary on failed submit; the progress
indicator is a real `role="progressbar"` with `aria-valuetext`.

### 6.2 Where the lead actually goes (no invention)

The form posts to a new server action, `submitMediaInquiry`, which reuses the
**exact delivery rails the existing contact form already uses**, extracted into a
shared `deliverLead()` helper in `src/app/actions.ts`:

| Rail | Environment variable | Behaviour |
| --- | --- | --- |
| Transactional email | `RESEND_API_KEY` (+ optional `LEAD_INBOX`) | POST to `https://api.resend.com/emails` |
| Generic webhook | `LEAD_WEBHOOK_URL` (+ optional `LEAD_WEBHOOK_TOKEN`) | POST JSON |
| CRM webhook | `CRM_WEBHOOK_URL` (+ optional `CRM_WEBHOOK_TOKEN`) | POST JSON |

**Honest failure handling, carried over unchanged from `submitBrief`:**

* If **no** rail is configured, the action returns an error. It does **not**
  render a success state. A lead is never silently dropped and success is never
  claimed for a delivery that did not happen.
* If configured rails all fail, the action returns the same error.
* On any error the user is shown a WhatsApp bailout link pre-filled with what
  they already entered, so the lead has a human path out.
* Cloudflare Turnstile is enforced when `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and
  `TURNSTILE_SECRET_KEY` are both set, and fails closed if exactly one is set.
  No key values appear in this repository.

**This document does not claim any of the above rails is currently configured in
production.** Configuration is an environment concern and is not verifiable from
the repository.

### 6.3 Context captured

Every submission carries the requested project type, the reader's stated stage,
timeline, and a `pageContext` string identifying which of the four silo pages the
form was submitted from, so routing can tell a hub inquiry from a product-launch
inquiry.

---

## 7. Price feature flag

**Nothing in this silo renders a currency symbol, a price, a rate, a package fee,
a VAT statement or a price comparison.** Proposed figures supplied during
planning are not publishable and are not in this codebase.

The gate lives in `src/data/media-production.ts`:

```ts
/** MASTER PRICE GATE. Must stay `false` until a rate card is verified and
 *  approved for publication. Nothing price-shaped renders while it is false. */
export const MEDIA_RATE_CARD_ENABLED = false;

/** Verified, approved rate-card rows. Intentionally EMPTY.
 *  Do not populate without written approval. */
export const mediaRateCard: MediaRateCardRow[] = [];
```

Rendering rule, applied identically on all four pages:

* `MEDIA_RATE_CARD_ENABLED === false` → the scope block renders the approved
  non-price placeholder: **"Package details are confirmed during planning."**
  plus a plain description of *what the scope conversation covers* (crew shape,
  shoot days, deliverable formats, delivery dates). None of those are quantified.
* `MEDIA_RATE_CARD_ENABLED === true` **and** `mediaRateCard.length > 0` → the
  same block renders the approved rows. This path is written but unreachable in
  this build.

Additional guards:

* `offerCatalogSchema()` and `priceSpecification` are never imported into this
  silo, so no price can leak through JSON-LD.
* The inquiry form has **no budget question**, unlike the site-wide contact
  wizard, precisely so no currency range is rendered on these pages.
* `tests/media-production.test.ts` fails the build if the flag flips, if the
  rate card is non-empty, or if any currency symbol, `AED`, `VAT` or price-shaped
  numeric pattern appears in the silo's source files.

---

## 8. Analytics plan

### 8.1 What is implemented

`src/lib/analytics.ts` exports `trackEvent(name, params)`. It is a **passive
adapter**: it looks for `window.gtag` and `window.clarity` at call time and
forwards to whichever is present. It **injects no script tag, contains no
measurement ID, no project ID and no API key**, and is a no-op on the server or
when neither global exists. Adding a phantom tracker would have been the wrong
call, so none is added.

### 8.2 GA4 conversion event names emitted by this silo

| Event name | Fired when | Parameters |
| --- | --- | --- |
| `media_inquiry_start` | Reader advances past step 1 of the inquiry form | `project_type`, `page_context` |
| `media_inquiry_step` | Reader advances to step 2 or 3 | `step`, `page_context` |
| `media_inquiry_submit` | Submit is attempted with a valid step 3 | `project_type`, `timeline`, `page_context` |
| `media_inquiry_success` | The server action confirms a delivered lead | `project_type`, `page_context` |
| `media_inquiry_error` | The server action returns a delivery failure | `page_context` |
| `media_cta_click` | Any hero, sticky or final CTA is used | `cta_id`, `page_context` |

`media_inquiry_success` is the one to mark as a GA4 **conversion**; it fires only
on a confirmed delivery, so it cannot over-count.

### 8.3 Enabling GA4 (deployment step, not done here)

1. Obtain the GA4 measurement ID from the property owner.
2. Set it as `NEXT_PUBLIC_GA_MEASUREMENT_ID` in the Vercel project.
3. Add the `gtag.js` loader to `src/app/[locale]/layout.tsx` with
   `next/script` `strategy="afterInteractive"`, rendered **only** when that
   variable is set, mirroring how `Turnstile` is gated in `ContactWizard.tsx`.
4. In GA4 Admin → Events, mark `media_inquiry_success` as a key event.
5. No code in `src/lib/analytics.ts` changes; it starts forwarding automatically
   once `window.gtag` exists.

### 8.4 Enabling Microsoft Clarity (deployment step, not done here)

1. Obtain the Clarity project ID from the property owner.
2. Set it as `NEXT_PUBLIC_CLARITY_PROJECT_ID` in the Vercel project.
3. Add the Clarity loader snippet to `src/app/[locale]/layout.tsx`, again with
   `next/script` `strategy="afterInteractive"` and rendered only when that
   variable is set.
4. `trackEvent` already calls `window.clarity("event", name)` when the global is
   present, so the six events above become Clarity smart-event filters with no
   further code change.
5. Recommended Clarity setup once live: a funnel on the inquiry form, and a
   rage-click/dead-click filter scoped to `/media-production*`.

**Not fabricated:** no measurement ID, project ID, container ID or API key
appears anywhere in this repository or in this document.

### 8.5 Preserved

`@vercel/analytics` and `@vercel/speed-insights` remain mounted in
`src/app/[locale]/layout.tsx` and are untouched by this work.

---

## 9. Approval checklist

- [ ] Copy in `src/data/media-production.ts` approved, EN and AR.
- [ ] Confirm no page in this silo needs a testimonial or client name before launch.
- [ ] Decide whether a rate card is ever to be published; if yes, supply verified
      rows and flip `MEDIA_RATE_CARD_ENABLED` in a separate, reviewable commit.
- [ ] Supply the GA4 measurement ID and the Clarity project ID as environment
      variables (§8.3, §8.4).
- [ ] Confirm at least one lead delivery rail is configured in the Vercel
      environment before this silo is promoted to production (§6.2).
