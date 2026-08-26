# Wedding Quotation Funnel — Copy, Pricing & Service Audit Change-Log
**Date:** August 25, 2026
**Scope:** filmwithbigstory.com/wedding-quotation
**Source files audited:**
- `src/components/wedding-quotation/WeddingQuotationWizard.tsx`
- `src/components/wedding-quotation/WeddingIntakeForm.tsx`
- `src/data/wedding-quotation-pricing.json`
- `src/app/[locale]/wedding-quotation/page.tsx`

---

## Change 1: Replace "Verify mobile to view price" wording

### 1A — Package card price gate (Wizard Step 1)

**Screen:** Step 1 of 5 — "Choose your wedding package"
**Location:** `WeddingQuotationWizard.tsx` line 110, `gatedPrice()` function
**Current text (EN):** `Verify mobile to view price`
**Current text (AR):** `تحقق من الهاتف لعرض السعر`
**Where it renders:** Each of the 3 package cards (Silver, Gold, Platinum) shows this instead of the AED price until OTP is verified.

**Proposed replacement (EN):** `Verify to unlock pricing`
**Proposed replacement (AR):** `تحقق لفتح الأسعار`

**Rationale:** "Verify mobile" implies only a phone check, but the flow collects name + mobile + OTP. "Unlock pricing" is clearer about what happens and matches the gated-experience framing. Avoids implying a real SMS is sent (it's a simulated OTP in the prototype).

### 1B — Customization step detailed prices (Wizard Step 2)

**Screen:** Step 2 of 5 — "Customize your package"
**Location:** `WeddingQuotationWizard.tsx` line 169
**Current text (EN):** `Verify mobile to view detailed prices`
**Current text (AR):** `تحقق من الهاتف لعرض الأسعار التفصيلية`
**Where it renders:** Below the "Extra coverage hours" legend, replacing the per-hour price.

**Proposed replacement (EN):** `Verify to unlock pricing`
**Proposed replacement (AR):** `تحقق لفتح الأسعار`

**Rationale:** Same as 1A. Consistent wording across both screens.

---

## Change 2: Add additional-edited-photo pricing line to each package tier

### Current state

Each package scope line shows a photo count (Silver: 50, Gold: 100, Platinum: 150) but there is **no pricing line for additional edited photos** beyond the included amount. The pricing JSON (`wedding-quotation-pricing.json`) has no `additional_edited_photo` addon entry.

### Required additions

**2A — Pricing JSON:** Add a new addon entry to `wedding-quotation-pricing.json`:
```json
"additional_edited_photo": {
  "label_en": "Additional edited photo (per photo)",
  "label_ar": "صورة معدلة إضافية (لكل صورة)",
  "price_aed": <TBD — confirm with Saeed>
}
```

**2B — Package scope lines:** Add a line to each package's `scopeEn`/`scopeAr` arrays:

| Package | Current scope line | Proposed addition |
|---------|-------------------|-------------------|
| Silver  | `50 edited photographs` | `Additional edited photos available at AED <TBD> each` |
| Gold    | `100 edited photographs` | `Additional edited photos available at AED <TBD> each` |
| Platinum| `150 edited photographs` | `Additional edited photos available at AED <TBD> each` |

**2C — Wizard Step 2 (Customize):** Add a new fieldset or card under "Production add-ons" for purchasing additional edited photos, with a quantity selector (e.g., increments of 10).

**2D — Wizard Step 4 (Summary):** Add line-item display for additional photos if selected.

**Decision needed:** Per-photo price (AED). Saeed to confirm.

---

## Change 3: Flag all package-internal references to UAE male weddings

### 3A — Page metadata (SEO)

**Location:** `src/app/[locale]/wedding-quotation/page.tsx` lines 16, 38
**Current text:**
- Meta description: `"Build a UAE male-wedding scope for Big Story review."`
- JSON-LD service description: `"A UAE male-wedding scope for Big Story review."`

**Recommendation:** **Remove "male" qualifier from metadata.** The quotation funnel now supports multiple celebration types (groom wedding, bride wedding, katb kitab, engagement). The metadata should reflect the general offering.

**Proposed replacement:**
- Meta description: `"Build your wedding scope for Big Story to review."`
- JSON-LD: `"A wedding scope for Big Story review."`

### 3B — Wizard Step 1 lane cards

**Location:** `WeddingQuotationWizard.tsx` lines 157-161
**Current text:**
```
Card 1: "UAE male wedding" / "زفاف رجالي في الإمارات" — "Active lane" / "المسار النشط"
Card 2: "Female wedding — Coming Soon" / "زفاف نسائي — قريباً"
Card 3: "Aqd Al Qiran — Coming Soon" / "عقد القران — قريباً"
```

**Recommendation:** **Keep these cards but reword Card 1.** The lane cards communicate future roadmap. However, "UAE male wedding" as the active lane label is confusing when the intake form already asks "What are you celebrating?" and offers groom/bride/katb-kitab options.

**Proposed replacement for Card 1:**
- EN: `Groom wedding — Active`
- AR: `زفاف العريس — نشط`

**Rationale:** Aligns with the celebration type label "Groom wedding" already used in intake Step 4. Removes the geographic qualifier "UAE" from the lane card (the funnel already restricts venue search to GCC countries via Google Maps component restrictions).

### 3C — Celebration type "Groom wedding" keywords

**Location:** `WeddingIntakeForm.tsx` lines 35-36
**Current keywords (EN):** `"Male crew · Groom preparation · Bisht & kandura · Male hall coverage · Multi-camera · Highlight film"`
**Current keywords (AR):** `"طاقم رجالي · تحضير العريس · بشت وكندورة · تغطية قاعة الرجال · كاميرات متعددة · فيلم ملخص"`

**Recommendation:** **Keep as-is.** These keywords accurately describe the groom-wedding service offering and are appropriate for the celebration type selector. They are factual service descriptors, not marketing claims.

### 3D — Package scope lines (implicit male-wedding framing)

**Location:** `WeddingQuotationWizard.tsx` lines 39-86
**Observation:** All package scope lines are written generically (crew counts, photo counts, video deliverables). They do not explicitly reference "male wedding" or "groom." This is correct — no changes needed.

### Summary of UAE male-wedding references

| Location | Current | Action |
|----------|---------|--------|
| Page meta description | "UAE male-wedding scope" | Remove "male" |
| JSON-LD service description | "UAE male-wedding scope" | Remove "male" |
| Lane card 1 | "UAE male wedding — Active lane" | Reword to "Groom wedding — Active" |
| Groom celebration keywords | "Male crew · Groom preparation..." | Keep (accurate descriptors) |
| Package scope lines | Generic (no male reference) | No change needed |

---

## Change 4: Assess every guest-programme screen — keep or remove

### Current guest-programme screens

**Location:** `WeddingQuotationWizard.tsx` lines 220-228 (Wizard Step 2)
**Fieldset:** "Optional guest programme screens" / "شاشات برنامج الضيوف الاختيارية"

| Screen option | Type | Price state | Recommendation |
|---------------|------|-------------|----------------|
| 55-inch TV | Select dropdown | "Price Confirmation Required" | **REMOVE** — too small for a wedding hall; unlikely to be selected |
| 65-inch TV | Select dropdown | "Price Confirmation Required" | **KEEP** — reasonable mid-size option |
| 75-inch TV | Select dropdown | "Price Confirmation Required" | **KEEP** — popular wedding size |
| 85-inch TV | Select dropdown | "Price Confirmation Required" | **KEEP** — premium option |
| Modular LED wall | Select dropdown | "Price Confirmation Required" | **KEEP** — premium option, distinct from the priced LED wall add-ons below |

### Rationale

- **55-inch TV:** Too small for most wedding venues. Removing it reduces decision fatigue. If a client specifically needs a small screen, the 65-inch covers that range.
- **65/75/85-inch TVs:** Standard wedding venue sizes. Keep all three.
- **Modular LED wall:** This is a supplier-dependent option (different from the priced LED wall upgrades 2m×2.5m and 2.5m×3m which are released add-ons). Keep as a "Price Confirmation Required" option.

### UX note

The current implementation uses a single `<select>` dropdown, meaning only ONE guest screen can be selected. If the client needs multiple screens (e.g., two 75-inch TVs), they cannot specify quantity. Consider changing to a quantity selector per size, or adding a "How many?" follow-up question (preserving one-question-per-screen behaviour).

---

## Change 5: Remove the extra-hours add-on entry

### Current state

**Location:** `WeddingQuotationWizard.tsx` lines 167-176 (Wizard Step 2)
**Fieldset:** "Extra coverage hours" / "ساعات تغطية إضافية"
**UI:** `<select>` dropdown with options 0, 1, 2, 3
**Pricing:** Tier-dependent per hour (basic: AED 750, silver: AED 750, gold: AED 900, platinum: AED 1,100)
**State field:** `addons.extraHours` (number 0-3)

### What to remove

1. **Fieldset block** (lines 167-176): The entire "Extra coverage hours" `<fieldset>` including the legend, description text, and `<select>` dropdown.

2. **State field** (line 11): Remove `extraHours: number` from `AddonState` interface.

3. **Default state** (line 23): Remove `extraHours: 0` from `defaultAddons`.

4. **Addon total calculation** (lines 116-117): Remove the `extraHours` pricing line:
   ```typescript
   const tierPricing = pricing.addons.extra_hour.tier_pricing;
   total += addons.extraHours * (tierPricing[tier] || 750);
   ```

5. **Summary display** (lines 272): Remove the extra-hours line-item from the quotation summary.

6. **Pricing JSON** (lines 58-66): Remove the `extra_hour` addon entry from `wedding-quotation-pricing.json`.

### Impact

- The `AddonState` interface loses one field.
- The `addonTotal` calculation loses one term.
- The summary step loses one conditional line-item.
- No other screens are affected (extra hours only appears in Wizard Step 2 and Step 4 summary).

---

## Change 6: Remove duplicate YouTube+Instagram simulcast coming-soon item

### Current state

**Location:** `WeddingQuotationWizard.tsx` line 250 (Wizard Step 2, bottom)
**Current code:**
```tsx
<div className="mt-5 grid gap-3 sm:grid-cols-2">
  <button disabled type="button" className="bs-card text-start opacity-60">
    Instagram Live — Coming Soon
  </button>
  <button disabled type="button" className="bs-card text-start opacity-60">
    YouTube + Instagram simulcast — Coming Soon
  </button>
</div>
```

### The duplication problem

The "Included in every package" common text (line 89) already states:
> "YouTube livestreaming, basic QR photo sharing, two display-only QR screens..."

And the package selection heading (line 143) repeats:
> "All packages include 8 hours of coverage, crane/operator, Director/ATEM, PA, YouTube livestream, QR sharing, cloud delivery, and all original files."

So **YouTube livestreaming is already included** in every package. The "YouTube + Instagram simulcast — Coming Soon" button is a **different feature** (simultaneous broadcast to both platforms), but its naming creates confusion with the already-included YouTube livestream.

### What to remove

**Remove the "YouTube + Instagram simulcast — Coming Soon" button only.** Keep the "Instagram Live — Coming Soon" button.

### Resulting code

```tsx
<div className="mt-5">
  <button disabled type="button" className="bs-card text-start opacity-60 w-fit">
    Instagram Live — Coming Soon
  </button>
</div>
```

### Rationale

- **Instagram Live** is a distinct future feature (live streaming to Instagram). Keep as Coming Soon.
- **YouTube + Instagram simulcast** is confusing because YouTube livestream is already included. When simulcast becomes available, it should be presented as an upgrade to the existing YouTube livestream, not as a separate Coming Soon item. Remove now; re-add properly when the feature is ready.

---

## Summary of all changes

| # | Change | Screen | Type | Effort |
|---|--------|--------|------|--------|
| 1A | Replace "Verify mobile to view price" | Wizard Step 1 | Copy | Low |
| 1B | Replace "Verify mobile to view detailed prices" | Wizard Step 2 | Copy | Low |
| 2A | Add additional-edited-photo addon to pricing JSON | Data file | Pricing | Low |
| 2B | Add photo pricing line to package scope | Wizard Step 1 | Copy | Low |
| 2C | Add photo quantity selector | Wizard Step 2 | Feature | Medium |
| 2D | Add photo line-item to summary | Wizard Step 4 | Feature | Low |
| 3A | Remove "male" from page metadata | Page head | Copy | Low |
| 3B | Reword lane card 1 to "Groom wedding — Active" | Wizard Step 1 | Copy | Low |
| 3C | Keep groom celebration keywords | Intake Step 4 | No change | — |
| 3D | Keep package scope lines | Wizard Step 1 | No change | — |
| 4 | Remove 55-inch TV from guest screens | Wizard Step 2 | Remove | Low |
| 5 | Remove extra-hours add-on entirely | Wizard Step 2 + data | Remove | Medium |
| 6 | Remove YouTube+Instagram simulcast button | Wizard Step 2 | Remove | Low |

### Decisions needed from Saeed

1. **Additional edited photo price (AED per photo)** — required for Change 2
2. **Confirm 55-inch TV removal** — Change 4 recommendation
3. **Confirm extra-hours removal** — Change 5 (is this being moved to a different flow, or dropped entirely?)
4. **Guest screen quantity selector** — should clients be able to order multiple screens of the same size?

---

*This document is a change-log only. No code changes were made.*
