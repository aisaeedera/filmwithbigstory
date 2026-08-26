# Wedding Quotation Funnel — Versioned Revision Brief v1.0

**Project:** Film with Big Story — Wedding Quotation Funnel
**Brief version:** 1.0
**Date:** 2026-08-25
**Prepared by:** Big Story Digital Services Manager
**Status:** ⏸ AWAITING SAEED APPROVAL — No implementation proceeds until this brief is approved.

---

## Purpose

This brief consolidates all research, audit, and specification outputs produced for the wedding quotation funnel revision into a single, traceable document. Every proposed change is numbered, includes before/after wording where applicable, and references its source task. This is the sole approval gate — implementation begins only after Saeed signs off on this document.

---

## Source tasks consolidated

| # | Task | Output | Source file |
|---|------|--------|-------------|
| 1 | Funnel audit: copy, pricing & service items | 6 audit items + 4 decisions needed | `wedding-quotation-audit-changelog.md` |
| 2 | Media Production Manager: service naming & positioning | Package naming, extra-hours, guest screens, livestream, female/Aqd recommendations | Task t_5fa18be4 handoff |
| 3 | SEO terminology research | UAE/GCC keyword data, recommended labels, keyword map | `docs/internal/wedding-quotation-research/SEO_TERMINOLOGY_RESEARCH_MEMO_v1.0_2026-08-25.md` |
| 4 | Mobile-number UX specification | Country-code selector + validation spec | `docs/ux-spec-country-code-mobile-validation.md` |

---

## Section A: Copy & Pricing Changes (from funnel audit)

### A1. Replace "Verify mobile to view price" wording

**A1a — Package card price gate (Wizard Step 1)**

| | Current | Proposed |
|---|---|---|
| EN | `Verify mobile to view price` | `Verify to unlock pricing` |
| AR | `تحقق من الهاتف لعرض السعر` | `تحقق لفتح الأسعار` |
| Location | `WeddingQuotationWizard.tsx` line 110, `gatedPrice()` | Same |

**A1b — Customization step detailed prices (Wizard Step 2)**

| | Current | Proposed |
|---|---|---|
| EN | `Verify mobile to view detailed prices` | `Verify to unlock pricing` |
| AR | `تحقق من الهاتف لعرض الأسعار التفصيلية` | `تحقق لفتح الأسعار` |
| Location | `WeddingQuotationWizard.tsx` line 169 | Same |

**Rationale:** "Verify mobile" implies only a phone check, but the flow collects name + mobile + OTP. "Unlock pricing" is clearer and avoids implying a real SMS is sent (simulated OTP in prototype).

---

### A2. Additional edited photos — pricing line additions

**Current state:** Each package shows a photo count (Silver: 50, Gold: 100, Platinum: 150) but no pricing for additional edited photos. The pricing JSON has no `additional_edited_photo` addon.

**Proposed changes:**

| Sub-change | Description | Effort |
|---|---|---|
| A2a | Add `additional_edited_photo` addon to `wedding-quotation-pricing.json` | Low |
| A2b | Add pricing line to each package's `scopeEn`/`scopeAr`: "Additional edited photos available at AED <TBD> each" | Low |
| A2c | Add quantity selector (increments of 10) in Wizard Step 2 under "Production add-ons" | Medium |
| A2d | Add line-item display in Wizard Step 4 summary | Low |

**⚠ Decision needed:** Per-photo price (AED). Saeed to confirm.

**Production Manager note:** Present package-specific additional-edited-photo blocks only after a dedicated rate-card SKU is approved. Do not infer a price from existing package totals. The rate card must approve: block quantity per package, incremental editor cost per image, retouching level, culling/QA/export labour, cloud/storage/delivery allowance, rush premium if offered, margin/rounding treatment, max extra images and delivery-time change, and final sell price per package/block SKU.

---

### A3. Remove "male" qualifier from metadata and lane cards

| Location | Current | Proposed | Action |
|---|---|---|---|
| Page meta description | `"Build a UAE male-wedding scope for Big Story review."` | `"Build your wedding scope for Big Story to review."` | Edit |
| JSON-LD service description | `"A UAE male-wedding scope for Big Story review."` | `"A wedding scope for Big Story review."` | Edit |
| Lane card 1 (Wizard Step 1) | `"UAE male wedding" / "زفاف رجالي في الإمارات"` | `"Groom wedding — Active" / "زفاف العريس — نشط"` | Edit |
| Groom celebration keywords (Intake Step 4) | `"Male crew · Groom preparation · Bisht & kandura..."` | *(keep as-is — accurate descriptors)* | No change |
| Package scope lines (Wizard Step 1) | Generic (no male reference) | *(no change needed)* | No change |

**Rationale:** The funnel now supports multiple celebration types (groom, bride, katb kitab, engagement). Metadata should reflect the general offering. Lane card wording aligns with the celebration type label already used in intake Step 4.

---

### A4. Remove 55-inch TV from guest programme screens

| Screen option | Current | Proposed |
|---|---|---|
| 55-inch TV | Available (select dropdown, "Price Confirmation Required") | **REMOVE** |
| 65-inch TV | Available | Keep |
| 75-inch TV | Available | Keep |
| 85-inch TV | Available | Keep |
| Modular LED wall | Available | Keep |

**Rationale:** 55-inch is too small for most wedding venues. Removing it reduces decision fatigue.

**Production Manager note:** Retain exactly two economical QR-discovery displays as an operational inclusion, clearly labelled as QR access points — not live programme screens. Offer modular LED walls only as separately approved display upgrades. Do not accidentally remove the two QR displays when deleting programme-screen copy.

**⚠ Decision needed:** Confirm 55-inch TV removal.

---

### A5. Remove extra-hours add-on entirely

**Current state:** "Extra coverage hours" fieldset in Wizard Step 2 with `<select>` dropdown (0-3 hours). Tier-dependent pricing: basic AED 750, silver AED 750, gold AED 900, platinum AED 1,100.

**What to remove:**

| # | Item | Location |
|---|---|---|
| 1 | Fieldset block (legend, description, select) | `WeddingQuotationWizard.tsx` lines 167-176 |
| 2 | `extraHours: number` from `AddonState` interface | Line 11 |
| 3 | `extraHours: 0` from `defaultAddons` | Line 23 |
| 4 | Extra-hours pricing calculation in `addonTotal` | Lines 116-117 |
| 5 | Extra-hours line-item in summary | Line 272 |
| 6 | `extra_hour` addon entry from pricing JSON | `wedding-quotation-pricing.json` lines 58-66 |

**Production Manager recommendation:** Remove extra hours from self-service selection. Handle coverage extensions during quotation review. Customer-facing wording: "Need longer coverage? Tell us the expected finish time; we will confirm crew, crane and post-production overtime in the reviewed quotation."

**⚠ Decision needed:** Confirm extra-hours removal. Is this being moved to quotation review flow, or dropped entirely?

---

### A6. Remove YouTube+Instagram simulcast coming-soon button

| Item | Current | Proposed |
|---|---|---|
| "YouTube + Instagram simulcast — Coming Soon" button | Present (disabled, Wizard Step 2 line 250) | **REMOVE** |
| "Instagram Live — Coming Soon" button | Present (disabled) | **Keep** |

**Rationale:** YouTube livestreaming is already included in every package. The simulcast button creates naming confusion. When simulcast becomes available, present it as an upgrade to the existing YouTube livestream.

**Production Manager note:** Two Instagram accounts require two devices. Do not promise Instagram, dual-account streaming or a YouTube/Instagram simulcast as generally released until testing, costing and QA approve it. Current customer-facing wording for livestream:
- YouTube Live — Available, 1080p, operated by Big Story's live team; included where shown. Visibility requires explicit client authorization and VIP/privacy checks.
- Instagram Live — Pilot availability by request only. Current path requires one approved, logged-in device per account.

---

## Section B: Service Naming & Positioning (from Media Production Manager)

### B1. Gold package subtitle

| | Current | Proposed |
|---|---|---|
| Subtitle | *(generic or missing)* | **"Gold — Cinematic Wedding Story"** |

**Alternatives considered:** "Gold — Multi-Camera Wedding Film", "Gold — Wedding Story & Social Edit"

**Rationale:** Matches the Gold scope without implying full-day or unlimited coverage; the package is limited to eight hours.

---

### B2. Female wedding and Aqd Al Qiran — enquiry-only status

| Service | Status | Customer wording |
|---|---|---|
| Female Wedding | Custom planning enquiry only; no instant price, deposit or confirmed booking | "Female Wedding Production — Private, female-team planning. Share your date and requirements; availability is confirmed only after the required vetted female crew and privacy workflow are assigned." |
| Aqd Al Qiran | Custom planning enquiry only; no instant price, deposit or confirmed booking | "Aqd Al Qiran Production — Tailored ceremony coverage with privacy-led planning. Submit your event details for team and scope confirmation." |

**Risk notes:**
- Female wedding: "Enquiry open" must not be interpreted as crew availability or a booking commitment while female photographer and editing capacity remain open.
- Aqd Al Qiran: Do not promise women-side continuity until every required female role and privacy control is confirmed.

---

### B3. Guest programme screens — QR displays vs. programme TVs

| Item | Recommendation |
|---|---|
| Programme screens/TVs | **Remove** from quotation |
| Two QR-discovery displays | **Retain** as operational inclusion, clearly labelled as QR access points — not live programme screens |
| Modular LED walls | Offer only as separately approved display upgrades |

---

### B4. Extra hours — review-based handling

**Decision:** Remove from self-service selection. Handle during quotation review.

**Customer-facing wording:** "Need longer coverage? Tell us the expected finish time; we will confirm crew, crane and post-production overtime in the reviewed quotation."

**Authority note:** Hide/retire the existing AED 750, AED 900 and AED 1,100 customer-selectable overtime figures unless Production re-approves them for this flow.

---

### B5. Additional edited photos — rate card dependency

**Decision:** Present package-specific additional-edited-photo blocks only after a dedicated rate-card SKU is approved. Do not infer a price from existing package totals.

**Figures requiring rate-card authority:**
1. Additional-photo block quantity for each package
2. Incremental editor cost per image or block
3. Retouching level and included correction scope
4. Culling, QA and export labour allowance
5. Cloud/storage/delivery allowance
6. Rush or same-day premium, if offered
7. Package-specific margin and rounding treatment
8. Maximum number of extra images and resulting delivery-time change
9. Final customer sell price for every package/block SKU

---

## Section C: SEO Terminology & Keywords (from SEO research)

### C1. Recommended customer-facing labels

| Context | English | Arabic |
|---|---|---|
| Quotation lane title | **Katb Kitab / Aqd Al Qiran** | **تصوير كتب الكتاب وعقد القران** |
| Quotation lane subtitle | Photography, videography and live coverage for the ceremony | تغطية تصوير فوتوغرافي وفيديو وبث مباشر للمناسبة |
| Future service page H1 (if approved) | Katb Kitab and Aqd Al Qiran Photography & Videography in Dubai | تصوير كتب الكتاب وعقد القران في دبي |

### C2. Primary SEO keyword cluster

| Keyword | UAE search volume | Role |
|---|---|---|
| `wedding photographer dubai` | 210 | Primary acquisition |
| `wedding photography dubai` | 110 | Primary acquisition |
| `كتب الكتاب` | 140 | Primary Arabic ceremony term |
| `كتب كتاب` | 90 | Secondary Arabic ceremony term |
| `wedding videographer dubai` | 50 | Primary acquisition |
| `wedding videography dubai` | 50 | Primary acquisition |
| `katb kitab` | 30 | Primary English ceremony term |

### C3. Secondary keyword cluster (FAQ/body copy)

| Keyword | UAE search volume | Role |
|---|---|---|
| `nikah` / `nikkah` | 480 each | Supporting synonym only (mixed intent) |
| `nikah ceremony` / `nikkah ceremony` | 210 each | FAQ/body synonym |
| `nikah dubai` | 70 | Secondary location phrase |
| `عقد نكاح` | 40 | Arabic FAQ/body synonym |
| `best wedding photographers in dubai` | 20 | Long-tail |
| `female wedding photographer dubai` | 10 | High paid competition (93) |

### C4. SEO implementation guardrails

1. Do not create an `Aqd Al Qiran`-only SEO page — keep variants together to avoid thin content and keyword cannibalization.
2. Keep `invitation`, `digital invitation`, `RSVP` terms on the existing invitations page (`/services/katb-kitab-invitations`). Keep `photography`, `videography`, `coverage`, `crew`, `live stream`, and package terms in the wedding quotation/service cluster.
3. If a standalone coverage page is approved later, use a distinct route such as `/services/katb-kitab-photography-videography-dubai`.
4. Include `Nikah / Nikkah` only as supporting copy or FAQ synonym — broad queries have mixed legal, religious, venue, dress, and service intent.
5. Pair ceremony terms with the larger service cluster: `wedding photographer Dubai`, `wedding photography Dubai`, `wedding videographer Dubai`, `wedding videography Dubai`.

---

## Section D: Mobile Number UX (from UX specification)

### D1. Replace plain mobile input with compound country-code + national number field

**Current state:** Single `<input type="tel">` with no country code, no validation. Error message hardcoded to UAE format.

**Proposed:** Compound field — country-code dropdown + national number input on the same screen (preserves one-question-per-screen flow).

### D2. Country code dropdown

| Feature | Specification |
|---|---|
| Default | UAE (+971) for en/ar locales; other GCC if browser locale matches |
| Detection | `navigator.language` (no IP geolocation) |
| Pinned rows | UAE, Saudi Arabia, Bahrain, Oman, Qatar, Kuwait — then alphabetical |
| Filtering | Type-ahead search by country name or code |
| Mobile | Full-width bottom sheet or inline expansion on viewports < 640px |

### D3. Validation rules

| Country | Code | Digits | Regex |
|---|---|---|---|
| UAE | +971 | 9 | `^[2-9]\d{8}$` |
| Saudi Arabia | +966 | 9 | `^[1-9]\d{8}$` |
| Bahrain | +973 | 8 | `^[1-9]\d{7}$` |
| Oman | +968 | 8 | `[2-9]\d{7}` |
| Qatar | +974 | 8 | `[2-8]\d{7}` |
| Kuwait | +965 | 8 | `[2-9]\d{7}` |
| UK | +44 | 10 | `^[1-9]\d{9}$` |
| US/Canada | +1 | 10 | `^[2-9]\d{9}$` |
| Other | — | 7-15 | `^\d{7,15}$` |

**Validation timing:** On blur and on submit (not while typing). Error messages are bilingual, reference selected country by name.

### D4. Stored data shape

```typescript
{
  phoneCountryCode: string;  // e.g. "+971"
  phoneNational: string;     // e.g. "501234567" (digits only)
  phoneE164: string;         // e.g. "+971501234567" (computed)
}
```

### D5. New files required

| File | Purpose |
|---|---|
| `src/data/country-codes.ts` | Country list with codes, flags, digit counts, regex, bilingual names |
| `src/components/wedding-quotation/MobileCompoundInput.tsx` | Compound component |

### D6. Modified files

| File | Change |
|---|---|
| `WeddingQuotationWizard.tsx` | Replace plain phone input with `<MobileCompoundInput>`, update state shape |
| `src/data/copy.ts` | Replace single validation message with per-error-type bilingual messages |

### D7. No external dependencies

- No libphonenumber or phone validation library
- No IP geolocation API
- No real OTP service (simulated "000000" flow unchanged)
- Country list data defined locally in `data/country-codes.ts`

---

## Section E: Decisions Required from Saeed

| # | Decision | Affects | Options |
|---|---|---|---|
| D1 | Additional edited photo price (AED per photo) | Changes A2a–A2d | Provide AED figure, or defer until rate card is approved |
| D2 | Confirm 55-inch TV removal | Change A4 | Remove / Keep |
| D3 | Confirm extra-hours removal | Change A5 | Remove entirely / Move to quotation review flow / Keep as-is |
| D4 | Guest screen quantity selector | Change A4 UX note | Single select (current) / Quantity selector per size / "How many?" follow-up |
| D5 | Gold package subtitle wording | Change B1 | "Cinematic Wedding Story" / "Multi-Camera Wedding Film" / "Wedding Story & Social Edit" / Other |
| D6 | Approve SEO terminology labels | Section C1 | Approve as proposed / Modify |

---

## Section F: Implementation Sequence (post-approval)

| Phase | Changes | Effort | Dependencies |
|---|---|---|---|
| 1 — Copy-only | A1a, A1b, A3 (metadata + lane card) | Low | None |
| 2 — Removals | A4 (55-inch TV), A5 (extra hours), A6 (simulcast button) | Low–Medium | D2, D3 confirmed |
| 3 — Mobile UX | D1–D7 (compound phone input) | Medium | None |
| 4 — Pricing & features | A2a–A2d (additional photos), B1 (Gold subtitle) | Medium | D1 (price), D5 (subtitle) confirmed |
| 5 — SEO labels | C1–C4 (terminology, keyword map) | Low | D6 approved |

---

## Approval

**No implementation proceeds until Saeed approves this brief.**

- [ ] **Approved** — Saeed has reviewed and approved all sections
- [ ] **Approved with modifications** — See comments below
- [ ] **Rejected** — See comments below

**Saeed's signature/date:** ___________________________

**Comments:**

---

*This document is version 1.0. Any changes after approval require a new version number.*
