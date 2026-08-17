# Groom Wedding Page, Evidence-Safe Claims and Scope Remediation, Source Only

Kanban: t_0cac4210 (bigstory-web), 2026-08-17
Route: /[locale]/services/groom-wedding-services (EN + AR)
Engine: GLM 5.3 direct implementation (Master decision 2026-08-17, Claude Code route dropped)
Repo state: filmwithbigstory/react-site @ main 6498a47, working tree change, NOT committed, NOT deployed

## Diff summary

File: src/app/[locale]/services/groom-wedding-services/page.tsx
1 file changed, 194 insertions(+), 260 deletions(-), 493 lines final.
Full diff: .qa-groom/groom_remediation.diff

## Claim matrix, Compliance C01-C20 vs remediated source

| ID | Compliance status | Action taken in source |
|----|-------------------|------------------------|
| C01 real client wedding | PROHIBITED | No client-wedding implication anywhere; page speaks of scoping a future project, no past-event claims |
| C02 2025-2026 bookings / ledger | HOLD | Entire "by the numbers" stats section deleted (statsHeading, statsBody, stat1-4 with ledger/2025-2026 sourcing) |
| C03 100% male crew / every booking / always | HOLD | All absolute quantifiers removed. Crew gender remains as factual scope statement: "The crew for this service is male... written into the scope you approve" with no quantifier |
| C04 crane on every shoot | HOLD | Crane claims removed from lead, stats, differentiators, FAQ answers. Crane now appears only inside Enhanced scope bullet: "Crane or jib with a dedicated operator, added only after venue, safety, payload, insurance and event-date confirmation" + honest FAQ "We do not promise it by default" |
| C05 most-booked tier | HOLD | "Most-booked" badge and tier language deleted with the four-tier table |
| C06 market missing / underserved / most crews skip | HOLD | H1 rewritten (dropped "the male-only coverage the UAE market was missing"), "Built for the Arabic-first market" differentiator rewritten without market-gap claims, all "most crews/studios/videographers" comparisons removed |
| C07 performance outcome guarantees | HOLD | "Everyone in focus", "clean/guaranteed sound", "filtration necessarily produces look" removed; filtration described as generic technique chosen at scoping, no outcome guarantee |
| C08 four tiers + AED prices | HOLD | Four-tier price table (8,000/16,000/26,000+/9,500) fully replaced by exactly one Recommended Scope + one Enhanced Scope, both unpriced, with written-quote pricing basis |
| C09 booking windows / 7-day date hold | HOLD | "6-9 months ahead / 2-3 months notice / hold the date for 7 days" FAQ deleted; replaced with "No commitment is made... until the written scope and quote are accepted" |
| C10 female coverage / coming soon | PROHIBITED | All "female coverage coming soon / تغطية نسائية قريباً" removed from lead, differentiator 1, FAQ; female-lane mentions deleted entirely |
| C11 Aqd / Katb Kitab | PROHIBITED | Katb Kitab FAQ deleted (EN + AR); no contract-signing content remains |
| C12 drone add-on | PROHIBITED | Drone add-on (+AED 1,500) removed with add-on menu; zero drone mentions in visible copy |
| C13 Al-Ayyala / harbiya specialty | PROHIBITED | Al-Ayyala stat card, specialty differentiator, module-3 performance coverage and 2 FAQs removed; performance filming referenced only generically as part of the male hall day ("the performances") |
| C14 VIP / dignitary protocol | PROHIBITED | "VIP protocol for elders and dignitaries" stat, differentiator and module copy removed; replaced with non-capability framing: discreet coordination around elders and guests agreed with the planner |
| C15-C16 publication/property permission implications | PROHIBITED | Not applicable to source copy; no demo assets or permission claims present |
| C17 music cleared | HOLD | No music claims in page copy |
| C18 demo proves readiness | PROHIBITED | No demo reference, no readiness extrapolation |
| C19 staged demo label | PROHIBITED without label | No demo asset placed at all, because Compliance placement gates P01-P13 are open. The label requirement applies only when a demo is used. Task rule honored: demo included only if Compliance permits; it does not |
| C20 metadata/JSON-LD claims | PROHIBITED | articleSchema description and serviceSchema description rewritten to match remediated visible copy (crane/filtration/VIP/Al-Ayyala mentions stripped from both) |

## Scope architecture (Production sign-off section 8 alignment)

Exactly two scopes rendered, both unpriced:
1. Recommended Scope (badge "Recommended"): groom prep + wedding-day male hall, one event day up to 10 hours, DOP + active second camera operator + sound recordist + gaffer/support, dedicated sound (boom/mixer/safety track/room tone), highlight 3-5 min + key-event film 15-20 min where programme supports + 15s vertical, colour/sound/2 revision rounds, tripod/approved support, private delivery.
2. Enhanced Scope: everything in Recommended + crane/jib with dedicated operator only after venue/safety/payload/insurance/event-date confirmation + one additional camera role where plan requires + longer 5-7 min highlight + additional vertical cut + three revision rounds.

No third tier, no a-la-carte menu, no prices, change-order note, photography-not-included note, written-quote pricing basis. Matches the Production first-lane matrix row-by-row.

## Mechanical verification

- Compliance scanner (parent t_6da51a43 reproducible scan_groom_claims.py): Stage 1 PASS with 0 category line hits (pre-remediation: 141 hits, FAIL). Stage 2 demo markers 0/9 present = correct, no demo asset is placed (placement not authorized).
  Post-remediation scan JSON: .qa-groom/claim_scan_post_remediation.json
- npm test: 50/51 pass. Single failure "silo CSS introduces no gradient" (media-production.test.ts:595) is pre-existing on clean HEAD 6498a47, verified by git stash + re-run (fails identically without my change).
- npx tsc --noEmit: 0 source errors (one stale .next/dev generated-type complaint predates this change, regenerated by build).
- npm run build: Compiled successfully, 303/303 static pages generated, /en/services/groom-wedding-services and /ar/services/groom-wedding-services prerendered.
- Em-dash scan: 0 occurrences (—), 0 stray en-dash (–).
- No deploy: no git push, no vercel, working tree change only.

## Arabic-first cultural clarity preserved

- Bilingual EN/AR parity across all new copy (H1, lead, coverage blocks, differentiators, scopes, FAQs, schema).
- Arabic retained as first-class: Arabic-proficient sound recordist + Arabic production guide in crew plan, Arabic/English call sheets and delivery, بروتوكول التصوير المحترم حول كبار السن framing.
- Blocked cultural lanes (الأيالة/الحربية specialty, تغطية نسائية, كتب الكتاب) removed, not merely translated-out.

## Handoff

Independent visual QA child t_51f1442f (bigstory-qa) should verify against this remediation report plus the diff. Suggested local check: npm run build && npm start, then open /en/services/groom-wedding-services and /ar/services/groom-wedding-services (RTL), console clean, both scope cards render, zero blocked-lane leakage.

Commercial/deploy approval remains with Strategy/Producer. No deployment performed or authorized by this change.
