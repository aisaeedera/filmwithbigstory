# Media Production Silo — Search & Intent Research

**Scope:** `/media-production` hub plus three dedicated service pages.
**Locales:** `en` (root) and `ar` (`/ar/...`), following the existing `src/lib/i18n.ts` pattern.
**Date:** 2026-08-01

## 0. Evidence rules used to write this document

This document contains **no search-volume figures, no ranking estimates, no
competitor traffic data and no CTR claims**. No keyword tool was available in
this build environment, so none is cited. Everything below is either:

1. **Non-speculative intent reasoning** — what a query phrase must mean for a
   buyer to type it, derived from the query grammar itself; or
2. **Existing site evidence** — content that already ships in this repository
   and can be verified by reading the referenced file.

Where an assertion would need external data to be true, it is omitted rather
than estimated.

### Existing site evidence referenced

| Evidence | Where it lives in this repo |
| --- | --- |
| Seven production service offerings, each with process, deliverables and FAQs | `src/data/services.ts` (`services[]`) |
| Documented pre-production process (discovery, treatment, locked script, storyboard, call sheet, shoot, post) | `src/data/how-we-work.ts` |
| Existing service detail routes under `/services/*` | `src/app/[locale]/services/**` |
| Industry categories served, explicitly **not** named client accounts | `src/data/clients.ts` (header comment states the no-logo / no-testimonial policy) |
| `/work` entries are **concept frameworks**, not shipped client case studies | `src/data/work.ts` (header comment) |
| UAE coverage: Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Al Ain | `src/lib/site.ts`, `src/data/locations.ts` |
| Bilingual EN/AR with RTL | `src/lib/i18n.ts`, `src/app/globals.css` |

**Direct consequence for this silo:** because `src/data/work.ts` labels its own
entries as concept frameworks and `src/data/clients.ts` forbids logos and
testimonials, **no page in this silo carries a testimonial, a client logo, an
award, a named client, or a performance statistic.** The trust section links to
pages a reader can open and judge instead.

---

## 1. Silo shape and the `/services` decision

`/services` is retired as a URL and returns a permanent redirect (308) to
`/media-production` in both locales. The redirect is declared in
`next.config.ts`, which Next.js evaluates before middleware, so it fires for the
clean English path and for `/ar/services`.

The redirect `source` matches the exact path only. Every existing child route
(`/services/tvc-production-dubai`, `/services/weddings`, `/services/[slug]`,
and the rest) is untouched and keeps returning 200. The hub's capability index
links to all of them, so no child page is orphaned by the move.

```
/media-production                              (hub, H1 "Media Production")
├── /media-production/company-media-revamp
├── /media-production/new-product-launch
└── /media-production/new-company-launch
/services  → 308 → /media-production           (both locales)
/services/*                                    (unchanged, still 200)
```

---

## 2. Hub — `/media-production`

**Primary UAE/Dubai intent.** Commercial investigation, top of the silo. The
phrase "media production" is a *category* phrase, not a deliverable phrase: a
buyer typing it has a business situation and does not yet know whether the
answer is a film, a photo set, a social cut or all three. The Dubai/UAE
qualifier signals they need a supplier that can shoot on the ground, handle
local locations and work bilingually. The page therefore has to route by
*situation* first and by *deliverable* second.

* **Title (37 chars):** `Media Production in Dubai | Big Story`
* **Meta description (152 chars):** `Big Story is a Dubai media production team. Strategy, script, shoot and post for company media revamps, product launches and new company launches.`
* **H1 (exact):** `Media Production`

**FAQ set (5).** Answerable from existing site evidence or from process facts
already published in `src/data/how-we-work.ts`.

1. What does media production include?
2. Do you work outside Dubai?
3. How long does a production take?
4. Can one production cover film, photo and social?
5. How do I get a price?

**Internal-link plan.**

* Out to the three silo children (primary editorial index, above the fold on mobile after the hero).
* Out to every existing `/services/*` offering via the capability index (this is the link equity path that `/services` used to carry).
* Out to `/how-we-work` from the process section.
* Out to `/work`, `/about/saeed`, `/service-areas`, `/clients` from the "what you can check" section.
* In from `Nav`, `Footer`, `/` home page, `/service-areas`, `/locations/[slug]`, `UaeTravelSection`, and every `/services/*` breadcrumb.

**Schema plan.**

* `Service` — `serviceType: "Media Production"`, `provider` referencing `#organization`, `areaServed` as the six existing UAE cities.
* `BreadcrumbList` — Home → Media Production.
* `FAQPage` — emitted, because the five questions above are rendered on the page in a `<details>` list. Question and answer text in the schema are the exact rendered strings.

---

## 3. `/media-production/company-media-revamp`

**Primary UAE/Dubai intent.** Problem-aware, replacement intent. The searcher
already has media; the query is triggered by embarrassment or drift, not by a
blank slate: outdated footage, a rebrand, inconsistent photography across
channels, assets shot by three different suppliers. The buying question is
"can someone bring all of this back into one look without a ground-up rebuild",
so the page must lead with an audit-and-consolidate framing rather than a
"new film" framing.

* **Title (41 chars):** `Company Media Revamp in Dubai | Big Story`
* **Meta description (140 chars):** `Bring outdated company video and photography back into one consistent look. Dubai and UAE production, from asset audit to final delivery.`
* **H1 (exact):** `Company Media Revamp`

**FAQ set (4).**

1. What is a company media revamp?
2. Do you have to reshoot everything?
3. How long does a revamp take?
4. What do we get at the end?

**Internal-link plan.** Up to `/media-production`. Across to
`/media-production/new-product-launch` and `/media-production/new-company-launch`.
Out to `/services/corporate-video-production-uae`, `/services/photography-revamp`
and `/how-we-work`.

**Schema plan.** `Service` + `BreadcrumbList` (Home → Media Production →
Company Media Revamp) + `FAQPage` matching the four rendered questions.

---

## 4. `/media-production/new-product-launch`

**Primary UAE/Dubai intent.** Deadline-driven commercial intent. A product
launch has a fixed date, which changes what the buyer is actually shopping for:
not the cheapest film but the supplier who can commit to a schedule and produce
several asset formats from one shoot. The page must answer "will this be ready"
and "does one shoot cover the whole campaign" before it answers "what will it
look like".

* **Title (48 chars):** `Product Launch Video Production Dubai | Big Story`
* **Meta description (139 chars):** `Film, photo and social assets for a UAE product launch, planned as one campaign and produced from one shoot. Dubai based, concept to delivery.`
* **H1 (exact):** `New Product Launch Media Production`

**FAQ set (4).**

1. Can one shoot cover the film, the photos and the social cuts?
2. How far ahead of launch day should we start?
3. Can you work to a fixed launch date?
4. Do you produce the vertical and paid-ad versions too?

**Internal-link plan.** Up to `/media-production`. Across to the other two
children. Out to `/services/tvc-production-dubai`, `/services/product-films`
(via the capability index label) and `/how-we-work`.

**Schema plan.** `Service` + `BreadcrumbList` (Home → Media Production → New
Product Launch) + `FAQPage` matching the four rendered questions.

---

## 5. `/media-production/new-company-launch`

**Primary UAE/Dubai intent.** Founder / early-stage intent, and the widest
scope of the three. Someone launching a company in the UAE needs a *set* of
assets at once (brand film, founder story, service explainer, social, stills)
because every channel goes live in the same week. The competing option in the
buyer's head is "hire a freelancer per asset", so the page must argue
consistency and single-schedule production rather than per-asset price.

* **Title (45 chars):** `New Company Launch Media in Dubai | Big Story`
* **Meta description (145 chars):** `Launch a new UAE company with one consistent media set: brand film, founder story, service and social assets, planned and produced together.`
* **H1 (exact):** `New Company Launch Media Production`

**FAQ set (4).**

1. We are pre-launch and have no brand assets. Where do we start?
2. What is usually in a launch media set?
3. Can you produce in Arabic and English?
4. How soon before launch should we book?

**Internal-link plan.** Up to `/media-production`. Across to the other two
children. Out to `/services/brand-films`, `/services/corporate-video-production-uae`,
`/website-services` (a new company usually needs the site at the same time) and
`/how-we-work`.

**Schema plan.** `Service` + `BreadcrumbList` (Home → Media Production → New
Company Launch) + `FAQPage` matching the four rendered questions.

---

## 6. Schema rules applied across the silo

* Exactly one `<h1>` per page. All other headings are `h2`/`h3`.
* `FAQPage` is emitted **only** where the page renders the same questions, and
  the schema strings are generated from the same source objects as the rendered
  markup (`src/data/media-production.ts`), so the two cannot drift.
* `BreadcrumbList` `item` URLs are absolute and locale-correct, built through
  the existing `breadcrumbSchema()` helper in `src/components/JsonLd.tsx`.
* No `Offer`, `PriceSpecification`, `AggregateRating` or `Review` node is
  emitted anywhere in this silo. `offerCatalogSchema()` exists in the codebase
  but is deliberately **not** imported here, because it requires numeric prices.
* Canonical, hreflang (`en-AE` / `ar-AE` / `x-default`), OpenGraph and Twitter
  metadata come from the shared `pageMeta()` helper in `src/lib/meta.ts`.

## 7. What this document deliberately does not claim

* No search volumes, difficulty scores, SERP positions or traffic forecasts.
* No competitor names or competitor page analysis.
* No conversion-rate or lead-volume projections.
* No claim that any of these pages will rank.
