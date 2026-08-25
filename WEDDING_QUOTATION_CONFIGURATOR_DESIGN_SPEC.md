# Wedding Quotation Configurator — UI/UX Design Spec v1.0

Date: 2026-08-24
Status: DESIGN DELIVERABLE — no code, ready for frontend implementation
Author: bigstory-digital-services-manager
Source: WEDDING_QUOTATION_CONFIGURATOR_SPEC.md (implementation spec v1.0)
Target: filmwithbigstory.com React site

---

## 1. Design System Foundation

### 1.1 Visual Language Alignment

The configurator inherits the existing Big Story cinematic dark + gold design system:

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg` | `#08080a` | Page background |
| `--color-bg-alt` | `#0b0b0c` | Alternating section background |
| `--color-elevated` | `#111114` | Card surfaces, modals |
| `--color-ink` | `#fafaf7` | Primary text |
| `--color-muted` | `#8a8a85` | Secondary text, labels |
| `--color-gold` | `#c9a227` | Accents, CTAs, active states |
| `--color-gold-soft` | `#8a7019` | Subtle gold accents |
| `--color-line` | `#1f1f22` | Borders, dividers |
| `--color-success` | `#2e7d5b` | Verified states, confirmations |
| `--color-error` | `#d96662` | Error states |

### 1.2 Typography

| Element | Font | Size | Weight |
|---------|------|------|--------|
| Step heading | `--font-display` (Fraunces) | `clamp(1.35rem, 3vw, 1.7rem)` | 600 |
| Section title | `--font-display` | `clamp(2rem, 4.5vw, 3.25rem)` | 600 |
| Eyebrow | `--font-mono` (Plex Mono) | `0.72rem` | 400, uppercase, 0.22em tracking |
| Body text | `--font-body` (Montserrat) | `1rem` | 400 |
| Lead paragraph | `--font-body` | `clamp(1.15rem, 2.2vw, 1.45rem)` | 400 |
| Price display | `--font-mono` | `clamp(1.4rem, 2.4vw, 2rem)` | 400 |
| RTL headings | `--font-arabic-display` (Aref) | same scale | 600 |
| RTL body | `--font-arabic` (Tajawal) | same scale | 400, line-height 1.9 |

### 1.3 Component Primitives (Reuse)

| Component | Source | Usage in Configurator |
|-----------|--------|----------------------|
| `Section` | `primitives.tsx` | Page sections with `alt` toggle |
| `Eyebrow` | `primitives.tsx` | Section labels |
| `Button` | `primitives.tsx` | CTAs (gold/ghost variants) |
| `SectionHead` | `primitives.tsx` | Section title + lead |
| `Reveal` | `Reveal.tsx` | Scroll-triggered fade-in |
| `Breadcrumbs` | `Breadcrumbs.tsx` | Navigation breadcrumbs |
| `CtaBand` | `CtaBand.tsx` | Bottom page CTA |
| `Faq` | `Faq.tsx` | FAQ accordion |

### 1.4 Existing Patterns to Extend

| Pattern | Source | Adaptation |
|---------|--------|------------|
| Multi-step wizard | `ContactWizard.tsx` | 7-step configurator wizard |
| Chip radio group | `ContactWizard.tsx` (ChipGroup) | Lane selection, package selection |
| Progress dots | `ContactWizard.tsx` (StepProgress) | 7-dot progress indicator |
| Card grid | Wedding hub "Pick your coverage" | Package tier cards |
| Stat grid | Wedding hub stats section | QR display preview cards |
| Pricing modal | `PricingTool.tsx` (Modal) | Price reveal overlay |

---

## 2. Page-Level Layout

### 2.1 Route Structure

```
/en/services/wedding-quotation    (LTR)
/ar/services/wedding-quotation    (RTL)
```

Standalone page file at `src/app/[locale]/services/wedding-quotation/page.tsx` — NOT using the dynamic `[slug]` route.

### 2.2 Page Shell

```
┌─────────────────────────────────────────────────────────────┐
│ <JsonLd /> — serviceSchema, breadcrumbSchema, faqSchema     │
├─────────────────────────────────────────────────────────────┤
│ <Section>                                                   │
│   <Breadcrumbs /> — Home > Media Production > Wedding Quote │
│   <Reveal>                                                  │
│     <Eyebrow>Wedding Quotation</Eyebrow>                    │
│     <h1>Build Your Wedding Package</h1>                     │
│     <p class="bs-lead">Configure your coverage...</p>       │
│   </Reveal>                                                 │
│ </Section>                                                  │
├─────────────────────────────────────────────────────────────┤
│ <Section alt>                                               │
│   <WeddingQuotationWizard /> — Client component             │
│ </Section>                                                  │
├─────────────────────────────────────────────────────────────┤
│ <Section>                                                   │
│   <Faq /> — Wedding quotation FAQs                          │
│ </Section>                                                  │
├─────────────────────────────────────────────────────────────────┤
│ <CtaBand /> — "Ready to discuss?" WhatsApp + Contact CTAs   │
└─────────────────────────────────────────────────────────────┘
```

### 2.3 Breadcrumbs

```
Home > Media Production > Wedding Quotation
(ar: الرئيسية > إنتاج الوسائط > عرض أسعار الزفاف)
```

### 2.4 SEO / Schema

- `serviceSchema` for wedding quotation configurator
- `breadcrumbSchema` for navigation
- `faqSchema` for wedding quotation FAQs
- `noindex` on the configurator page (conversion tool, not content)

---

## 3. Wizard Orchestrator — WeddingQuotationWizard

### 3.1 State Management

```typescript
type WizardState = {
  // Step 1
  lane: 'male' | 'female' | 'aqd' | null;
  // Step 2
  eventDate: string;        // ISO date
  venue: string;
  city: string;
  headcount: number | null;
  // Step 3
  package: 'silver' | 'gold' | 'platinum' | null;
  // Step 4
  extraHours: number;
  addOns: string[];         // add-on IDs
  guestScreens: { size: string; qty: number }[];
  // Step 5
  otpVerified: boolean;
  clientName: string;
  clientMobile: string;
  // Step 6
  reviewConfirmed: boolean;
  // Step 7
  submitted: boolean;
};
```

**Recommendation:** React `useReducer` with a typed action union. No external state library needed — the wizard is self-contained.

### 3.2 Step Navigation

```
Step 1 (Lane) → Step 2 (Event) → Step 3 (Package) → Step 4 (Customize)
    ↓                                                        ↓
    └────────────────────────────────────────────────────────┘
                                                           ↓
Step 7 (Submit) ← Step 6 (Review) ← Step 5 (OTP Gate) ←──┘
```

- Forward: "Continue" button (gold, `bs-btn-gold`)
- Backward: "Back" link (ghost text link, not a button)
- Step indicator: 7-dot progress bar (reuse `bs-step-dots` pattern)
- Step label: "Step N of 7" in mono eyebrow style

### 3.3 Progress Indicator

```
┌─────────────────────────────────────────────┐
│ STEP 3 OF 7                                 │
│ ● ● ● ○ ○ ○ ○                               │
└─────────────────────────────────────────────┘
```

- Filled dots: `var(--color-gold)`
- Empty dots: `var(--color-line)`
- Label: `--font-mono`, `0.78rem`, uppercase, `0.14em` tracking, gold
- RTL: `--font-arabic`, no tracking

### 3.4 Mobile Layout

- Full-width single column
- Step content scrolls within viewport
- Sticky footer with Continue/Back buttons
- Progress indicator fixed at top of wizard area
- Cards stack vertically (1 column on mobile, 2-3 on desktop)

---

## 4. Step 1 — Lane Selection (StepLaneSelect)

### 4.1 Layout

```
┌─────────────────────────────────────────────────────────────┐
│ STEP 1 OF 7                                                 │
│ ● ○ ○ ○ ○ ○ ○                                               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Choose Your Wedding Type                                    │
│                                                             │
│ Select the type of celebration you're planning.             │
│ The configurator will adapt to your selection.              │
│                                                             │
│ ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│ │   🎩        │  │   👰        │  │   💍        │          │
│ │             │  │  COMING     │  │  COMING     │          │
│ │   Male      │  │  SOON       │  │  SOON       │          │
│ │   Wedding   │  │             │  │             │          │
│ │             │  │  Female     │  │  Aqd Al     │          │
│ │  ✓ Active   │  │  Wedding    │  │  Qiran      │          │
│ │             │  │             │  │             │          │
│ └─────────────┘  └─────────────┘  └─────────────┘          │
│                                                             │
│ ┌─────────────────────────────────────────────────────┐     │
│ │ ℹ️  Male wedding coverage includes groom preparation │     │
│ │    and male hall coverage with an all-male crew.     │     │
│ └─────────────────────────────────────────────────────┘     │
│                                                             │
│                              [ Continue → ]                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 Lane Cards

**Active Card (Male Wedding):**
- Background: `var(--color-elevated)` with `1px solid var(--color-line)` border
- Border-radius: `14px`
- Padding: `clamp(1.5rem, 2.5vw, 2rem)`
- Hover: `translateY(-4px)`, border shifts to `color-mix(in srgb, var(--color-gold) 45%, var(--color-line))`
- Selected: border becomes `var(--color-gold)`, subtle gold glow (`box-shadow: 0 0 0 1px var(--color-gold)`)
- Icon: Stylized groom silhouette or kandura icon (gold on dark)
- Title: "Male Wedding" in `--font-display`, `1.25rem`
- Subtitle: "Groom preparation + male hall coverage" in `--font-body`, `0.875rem`, `--color-muted`
- Badge: "Active" in small gold pill

**Coming Soon Cards (Female, Aqd):**
- Background: `var(--color-elevated)` with reduced opacity (`0.5`)
- Border: `1px solid var(--color-line)`, no hover effect
- Cursor: `not-allowed`
- No price, no selection capability
- Badge: "Coming Soon" pill in `--color-muted` background
- Tooltip on hover: "This lane is not yet available. Contact us for details."
- Icon: Same style as active but greyed out

### 4.3 Interaction States

| State | Visual |
|-------|--------|
| Default | Elevated bg, line border, muted text |
| Hover (active only) | Lift + gold border tint |
| Selected | Gold border, gold checkmark overlay |
| Disabled (Coming Soon) | 50% opacity, no hover, "Coming Soon" badge |

### 4.4 Copy Placeholders

| Element | EN | AR |
|---------|----|----|
| Eyebrow | "Wedding Type" | "نوع الزفاف" |
| Heading | "Choose Your Wedding Type" | "اختر نوع الزفاف" |
| Lead | "Select the type of celebration you're planning. The configurator will adapt to your selection." | "اختر نوع الاحتفال الذي تخطط له. سيتكيف مُنشئ الأسعار مع اختيارك." |
| Male title | "Male Wedding" | "زفاف رجالي" |
| Male subtitle | "Groom preparation + male hall coverage" | "تحضير العريس + تغطية قاعة الرجال" |
| Female title | "Female Wedding" | "زفاف نسائي" |
| Aqd title | "Aqd Al Qiran" | "عقد القران" |
| Info box | "Male wedding coverage includes groom preparation and male hall coverage with an all-male crew." | "تغطية الزفاف الرجالي تشمل تحضير العريس وتغطية قاعة الرجال بطاقم رجالي بالكامل." |

---

## 5. Step 2 — Event Details (StepEventDetails)

### 5.1 Layout

```
┌─────────────────────────────────────────────────────────────┐
│ STEP 2 OF 7                                                 │
│ ● ● ○ ○ ○ ○ ○                                               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Event Details                                               │
│                                                             │
│ Tell us about your wedding day.                             │
│                                                             │
│ ┌─────────────────────────────────────────────────────┐     │
│ │ Wedding Date *                                      │     │
│ │ ┌─────────────────────────────────────────────────┐ │     │
│ │ │ 📅  Select date...                              │ │     │
│ │ └─────────────────────────────────────────────────┘ │     │
│ └─────────────────────────────────────────────────────┘     │
│                                                             │
│ ┌─────────────────────────────────────────────────────┐     │
│ │ Venue Name *                                        │     │
│ │ ┌─────────────────────────────────────────────────┐ │     │
│ │ │ e.g., Atlantis The Palm                         │ │     │
│ │ └─────────────────────────────────────────────────┘ │     │
│ └─────────────────────────────────────────────────────┘     │
│                                                             │
│ ┌─────────────────────────────────────────────────────┐     │
│ │ City *                                              │     │
│ │ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐      │     │
│ │ │ Dubai│ │Abu   │ │Shar- │ │ Ajman│ │ Other│      │     │
│ │ │      │ │Dhabi │ │jah   │ │      │ │      │      │     │
│ │ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘      │     │
│ └─────────────────────────────────────────────────────┘     │
│                                                             │
│ ┌─────────────────────────────────────────────────────┐     │
│ │ Expected Guest Count                                │     │
│ │ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐      │     │
│ │ │<100  │ │100-  │ │200-  │ │300-  │ │400+  │      │     │
│ │ │      │ │200   │ │300   │ │400   │ │      │      │     │
│ │ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘      │     │
│ └─────────────────────────────────────────────────────┘     │
│                                                             │
│                          [ Back ]  [ Continue → ]           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 5.2 Form Fields

**Date Picker:**
- Native `<input type="date">` styled with BS form tokens
- Min date: today + 14 days (minimum lead time)
- Max date: today + 18 months
- Calendar icon prefix
- Validation: required, future date

**Venue Name:**
- Text input, max 120 chars
- Placeholder: "e.g., Atlantis The Palm"
- Autocomplete: optional (could suggest known Dubai venues)
- Validation: required, min 2 chars

**City (Chip Group):**
- Reuse `ChipGroup` pattern from ContactWizard
- Options: Dubai, Abu Dhabi, Sharjah, Ajman, Umm Al Quwain, Ras Al Khaimah, Fujairah, Al Ain, Other
- Single select, required
- Grid: 3 columns on mobile, 5 on desktop

**Guest Count (Chip Group):**
- Options: Under 100, 100–200, 200–300, 300–400, 400+
- Single select, optional
- Grid: 3 columns on mobile, 5 on desktop

### 5.3 Form Styling

Reuse existing form tokens from `globals.css`:

```css
.bs-field { /* field wrapper */ }
.bs-label { /* field label */ }
.bs-input { /* text input */ }
.bs-fieldset { /* chip group wrapper */ }
.bs-legend { /* chip group legend */ }
.bs-chip-row { /* chip container */ }
.bs-chip { /* individual chip */ }
.bs-chip-input { /* hidden radio */ }
.bs-field-error { /* error message */ }
```

### 5.4 Copy Placeholders

| Element | EN | AR |
|---------|----|----|
| Eyebrow | "Event Details" | "تفاصيل الفعالية" |
| Heading | "Tell Us About Your Wedding Day" | "أخبرنا عن يوم زفافك" |
| Lead | "This helps us plan the right coverage for your celebration." | "هذا يساعدنا في تخطيط التغطية المناسبة لاحتفالك." |
| Date label | "Wedding Date *" | "تاريخ الزفاف *" |
| Venue label | "Venue Name *" | "اسم المكان *" |
| City label | "City *" | "المدينة *" |
| Guests label | "Expected Guest Count" | "عدد الضيوف المتوقع" |

---

## 6. Step 3 — Package Selection (StepPackageSelect)

### 6.1 Layout

```
┌─────────────────────────────────────────────────────────────┐
│ STEP 3 OF 7                                                 │
│ ● ● ● ○ ○ ○ ○                                               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Choose Your Package                                         │
│                                                             │
│ Each package includes 8 hours of coverage, professional     │
│ photography, crane with operator, YouTube livestream,       │
│ QR sharing with 2 displays, and cloud delivery.             │
│                                                             │
│ ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│ │   SILVER    │  │    GOLD     │  │  PLATINUM   │          │
│ │             │  │  ★ Popular  │  │             │          │
│ │ 1 Videographer│ │ 2 Videographers│ │ 2 Videographers│     │
│ │ 1 Photographer│ │ 1 Photographer│ │ 2 Photographers│     │
│ │             │  │             │  │             │          │
│ │ Highlight:  │  │ Highlight:  │  │ Highlight:  │          │
│ │ 3–5 min     │  │ 5–8 min     │  │ 8–12 min    │          │
│ │             │  │             │  │             │          │
│ │ Key-event:  │  │ Key-event:  │  │ Key-event:  │          │
│ │ Formal prog.│  │ 15–20 min   │  │ 20–30 min   │          │
│ │             │  │             │  │             │          │
│ │ Social cuts:│  │ Social cuts:│  │ Social cuts:│          │
│ │ —           │  │ 1           │  │ 3           │          │
│ │             │  │             │  │             │          │
│ │ Photos:     │  │ Photos:     │  │ Photos:     │          │
│ │ 50 edited   │  │ 100 edited  │  │ 150 edited  │          │
│ │ + all RAW   │  │ + all RAW   │  │ + all RAW   │          │
│ │             │  │             │  │             │          │
│ │ Delivery:   │  │ Delivery:   │  │ Delivery:   │          │
│ │ 21 days     │  │ 14 days     │  │ 7 days*     │          │
│ │             │  │             │  │             │          │
│ │ Revisions:  │  │ Revisions:  │  │ Revisions:  │          │
│ │ 1 round     │  │ 2 rounds    │  │ 3 rounds    │          │
│ │             │  │             │  │             │          │
│ │ [ Select ]  │  │ [ Select ]  │  │ [ Select ]  │          │
│ └─────────────┘  └─────────────┘  └─────────────┘          │
│                                                             │
│ * Platinum 7-day delivery subject to editor capacity.       │
│                                                             │
│ ┌─────────────────────────────────────────────────────┐     │
│ │ ✓ Included in every package:                        │     │
│ │ • 8 hours coverage  • Professional photography      │     │
│ │ • Crane + operator  • YouTube livestream (1080p)    │     │
│ │ • 2 QR displays     • Cloud delivery (60 days)      │     │
│ │ • Camera originals  • Hollyland crew comms          │     │
│ └─────────────────────────────────────────────────────┘     │
│                                                             │
│                          [ Back ]  [ Continue → ]           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 6.2 Package Cards

**Card Structure (per tier):**

```
┌─────────────────────────────┐
│ SILVER                      │  ← Eyebrow style, tier name
│                             │
│ 1 Videographer              │  ← Crew line
│ 1 Photographer              │
│                             │
│ ─────────────────────────── │  ← Divider (var(--color-line))
│                             │
│ Highlight Film   3–5 min    │  ← Deliverable rows
│ Key-Event Film   Formal     │
│ Social Cuts      —          │
│ Edited Photos    50         │
│ Photo RAW        ✓          │
│ Video Originals  ✓          │
│ Cloud Access     60 days    │
│ YouTube          Until removal │
│ Delivery         21 days    │
│ Revisions        1 round    │
│                             │
│ ─────────────────────────── │
│                             │
│ [ Select Silver ]           │  ← CTA button
└─────────────────────────────┘
```

**Card Styling:**

| Element | Style |
|---------|-------|
| Container | `bs-card` base, `14px` border-radius |
| Default state | `var(--color-elevated)` bg, `var(--color-line)` border |
| Hover | `translateY(-4px)`, gold border tint |
| Selected | Gold border, gold checkmark badge, subtle gold glow |
| Featured (Gold) | Gold top accent bar (3px), "★ Popular" badge |
| Tier name | `--font-mono`, `0.72rem`, uppercase, gold |
| Crew lines | `--font-body`, `0.94rem`, `--color-ink` |
| Deliverable labels | `--font-body`, `0.85rem`, `--color-muted` |
| Deliverable values | `--font-body`, `0.85rem`, `--color-ink` |
| Check marks | `var(--color-gold)` |
| Dashes (unavailable) | `var(--color-muted)` |
| CTA button | `bs-btn bs-btn-gold` (selected), `bs-btn bs-btn-ghost` (unselected) |

**Responsive Behavior:**

| Breakpoint | Layout |
|------------|--------|
| Mobile (<640px) | Single column, cards stack vertically |
| Tablet (640–1024px) | 2 columns (Silver + Gold), Platinum below |
| Desktop (>1024px) | 3 columns side by side |

### 6.3 Mandatory Inclusions Callout

Below the package cards, a highlighted box showing what's included in EVERY package:

- Background: `var(--color-bg-alt)` with subtle gold left border
- Icon: checkmark circle in gold
- Grid of inclusion items (2 columns on mobile, 3 on desktop)
- Each item: gold bullet + label text

### 6.4 Copy Placeholders

| Element | EN | AR |
|---------|----|----|
| Eyebrow | "Select Package" | "اختر الباقة" |
| Heading | "Choose Your Package" | "اختر باقتك" |
| Lead | "Each package includes 8 hours of coverage, professional photography, crane with operator, YouTube livestream, QR sharing with 2 displays, and cloud delivery." | "كل باقة تشمل 8 ساعات تغطية، تصوير احترافي، كرين مع مشغل، بث يوتيوب مباشر، مشاركة QR مع شاشتين، وتسليم سحابي." |
| Silver | "Silver" | "فضي" |
| Gold | "Gold" | "ذهبي" |
| Platinum | "Platinum" | "بلاتيني" |
| Popular badge | "★ Popular" | "★ الأكثر طلباً" |
| Select CTA | "Select {tier}" | "اختر {tier}" |
| Footnote | "* Platinum 7-day delivery subject to editor capacity confirmation." | "* تسليم البلاتيني خلال 7 أيام رهناً بتأكيد سعة المحرر." |

---

## 7. Step 4 — Customize (StepCustomize)

### 7.1 Layout

```
┌─────────────────────────────────────────────────────────────┐
│ STEP 4 OF 7                                                 │
│ ● ● ● ● ○ ○ ○                                               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Customize Your Package                                      │
│                                                             │
│ Add extra coverage, screens, or services to your {tier}.    │
│                                                             │
│ ── Extra Coverage Hours ──────────────────────────────────  │
│                                                             │
│ Add more hours beyond the included 8.                       │
│                                                             │
│ Current: 8 hours included                                   │
│ Add: [ 0 ] [ +1h ] [ +2h ] [ +3h ] [ +4h ]                │
│                                                             │
│ ── Guest Screens ─────────────────────────────────────────  │
│                                                             │
│ Large screens for guest photo display at the venue.         │
│                                                             │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                        │
│ │ 55"  │ │ 65"  │ │ 75"  │ │ 85"  │                        │
│ │      │ │      │ │      │ │      │                        │
│ └──────┘ └──────┘ └──────┘ └──────┘                        │
│                                                             │
│ Quantity: [ 0 ] [ 1 ] [ 2 ]                                │
│                                                             │
│ ── Add-On Services ──────────────────────────────────────  │
│                                                             │
│ ┌─────────────────┐ ┌─────────────────┐                    │
│ │ Same-Day Teaser │ │ On-Site Photo   │                    │
│ │                 │ │ Editor          │                    │
│ │ Add-on only     │ │                 │                    │
│ │ [ + Add ]       │ │ [ + Add ]       │                    │
│ └─────────────────┘ └─────────────────┘                    │
│                                                             │
│ ┌─────────────────┐ ┌─────────────────┐                    │
│ │ On-Site Video   │ │ Extra           │                    │
│ │ Editor          │ │ Photographer    │                    │
│ │                 │ │                 │                    │
│ │ [ + Add ]       │ │ [ + Add ]       │                    │
│ └─────────────────┘ └─────────────────┘                    │
│                                                             │
│ ┌─────────────────┐ ┌─────────────────┐                    │
│ │ Extra           │ │ LED Wall        │                    │
│ │ Videographer    │ │                 │                    │
│ │                 │ │ Custom Quote    │                    │
│ │ [ + Add ]       │ │ [ Request ]     │                    │
│ └─────────────────┘ └─────────────────┘                    │
│                                                             │
│ ── Coming Soon ───────────────────────────────────────────  │
│                                                             │
│ ┌─────────────────┐ ┌─────────────────┐                    │
│ │ Instagram Live  │ │ YouTube + IG    │                    │
│ │                 │ │ Simulcast       │                    │
│ │ COMING SOON     │ │ COMING SOON     │                    │
│ │ (disabled)      │ │ (disabled)      │                    │
│ └─────────────────┘ └─────────────────┘                    │
│                                                             │
│                          [ Back ]  [ Continue → ]           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 7.2 Extra Hours Section

**Design:**
- Section heading: "Extra Coverage Hours" in `--font-display`
- Description: "Add more hours beyond the included 8."
- Current state: "Current: 8 hours included" in `--color-muted`
- Selector: Chip group with options [0, +1h, +2h, +3h, +4h]
- Reuse `ChipGroup` pattern
- Price: Hidden until OTP verification (show "Price available after verification")

### 7.3 Guest Screens Section

**Design:**
- Section heading: "Guest Screens"
- Description: "Large screens for guest photo display at the venue."
- Screen size selector: Chip group [55", 65", 75", 85"]
- Quantity selector: Chip group [0, 1, 2]
- Each size shows as a card with icon
- Price: Hidden until OTP verification

### 7.4 Add-On Services Grid

**Card Design:**
- Grid: 2 columns on mobile, 3 on desktop
- Each card: `bs-card` base styling
- Content: Service name, brief description, price state, action button
- States:
  - **Available:** Full opacity, "+ Add" button (ghost style)
  - **Added:** Gold border, "✓ Added" button (gold style), remove option
  - **Custom Quote:** "Request Quote" button instead of price
  - **Coming Soon:** 50% opacity, "Coming Soon" badge, disabled

**Add-On Cards:**

| Add-On | Status | Button Text |
|--------|--------|-------------|
| Same-Day Teaser | Released | "+ Add" |
| On-Site Photo Editor | Released | "+ Add" |
| On-Site Video Editor | Released | "+ Add" |
| Extra Photographer | Released | "+ Add" |
| Extra Videographer | Released | "+ Add" |
| LED Wall | Custom Quote | "Request Quote" |
| Instagram Live | Coming Soon | Disabled |
| YouTube + IG Simulcast | Coming Soon | Disabled |

### 7.5 Coming Soon Section

- Separated by a divider with "Coming Soon" eyebrow
- Cards at 50% opacity with `ComingSoonBadge`
- No prices, no selection, no hover effects
- Tooltip: "This feature is not yet available."

### 7.6 Copy Placeholders

| Element | EN | AR |
|---------|----|----|
| Eyebrow | "Customize" | "تخصيص" |
| Heading | "Customize Your Package" | "خصص باقتك" |
| Lead | "Add extra coverage, screens, or services to your {tier}." | "أضف ساعات تغطية إضافية أو شاشات أو خدمات إلى باقتك {tier}." |
| Extra hours heading | "Extra Coverage Hours" | "ساعات تغطية إضافية" |
| Guest screens heading | "Guest Screens" | "شاشات الضيوف" |
| Add-ons heading | "Add-On Services" | "خدمات إضافية" |
| Coming Soon heading | "Coming Soon" | "قريباً" |

---

## 8. Step 5 — OTP Gate (StepOtpGate)

### 8.1 Layout

```
┌─────────────────────────────────────────────────────────────┐
│ STEP 5 OF 7                                                 │
│ ● ● ● ● ● ○ ○                                               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Verify Your Identity                                        │
│                                                             │
│ To view your personalized quotation with detailed pricing,  │
│ please verify your mobile number.                           │
│                                                             │
│ ┌─────────────────────────────────────────────────────┐     │
│ │ 🔒 Your information is secure and used only for     │     │
│ │    your quotation. We do not share your data.       │     │
│ └─────────────────────────────────────────────────────┘     │
│                                                             │
│ ┌─────────────────────────────────────────────────────┐     │
│ │ Full Name *                                         │     │
│ │ ┌─────────────────────────────────────────────────┐ │     │
│ │ │ Enter your full name                            │ │     │
│ │ └─────────────────────────────────────────────────┘ │     │
│ └─────────────────────────────────────────────────────┘     │
│                                                             │
│ ┌─────────────────────────────────────────────────────┐     │
│ │ Mobile Number *                                     │     │
│ │ ┌─────┬───────────────────────────────────────────┐ │     │
│ │ │ +971│ 5X XXX XXXX                               │ │     │
│ │ └─────┴───────────────────────────────────────────┘ │     │
│ └─────────────────────────────────────────────────────┘     │
│                                                             │
│ [ Send Verification Code ]                                  │
│                                                             │
│ ┌─────────────────────────────────────────────────────┐     │
│ │ Enter the 6-digit code sent to +971 5X XXX XXXX    │     │
│ │                                                     │     │
│ │ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐              │     │
│ │ │   │ │   │ │   │ │   │ │   │ │   │              │     │
│ │ └───┘ └───┘ └───┘ └───┘ └───┘ └───┘              │     │
│ │                                                     │     │
│ │ Resend code in 00:45                               │     │
│ │                                                     │     │
│ │ [ Verify Code ]                                     │     │
│ └─────────────────────────────────────────────────────┘     │
│                                                             │
│ ┌─────────────────────────────────────────────────────┐     │
│ │ ✓ Verified                                          │     │
│ │ Your identity has been verified. You can now view   │     │
│ │ your complete quotation.                            │     │
│ └─────────────────────────────────────────────────────┘     │
│                                                             │
│                          [ Back ]  [ Continue → ]           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 8.2 OTP Flow States

**State 1: Initial (Name + Phone)**
- Name field: text input, required, min 2 chars
- Phone field: prefix "+971" (locked) + 9-digit input
- "Send Verification Code" button: `bs-btn-gold`
- Privacy notice box: subtle border, lock icon

**State 2: Code Sent**
- 6-digit OTP input (individual boxes, auto-advance)
- Timer: "Resend code in MM:SS" countdown
- "Resend code" link (active after timer expires)
- "Verify Code" button: `bs-btn-gold`
- Rate limit notice: "Maximum 3 attempts per 10 minutes"

**State 3: Verified**
- Success box: green border, checkmark icon
- "✓ Verified" heading
- Confirmation message
- Continue button becomes active

**State 4: Error**
- Error box: red border, warning icon
- "Invalid code. Please try again."
- Remaining attempts shown

### 8.3 OTP Input Design

```
┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐
│ 4 │ │ 7 │ │ 2 │ │   │ │   │ │   │
└───┘ └───┘ └───┘ └───┘ └───┘ └───┘
```

- Each box: `48px × 56px`, `8px` border-radius
- Font: `--font-mono`, `1.5rem`, centered
- Default: `var(--color-line)` border
- Focused: `var(--color-gold)` border
- Filled: `var(--color-ink)` text, `var(--color-line)` border
- Error: `var(--color-error)` border
- Auto-advance on digit entry
- Backspace moves to previous box
- Paste support for 6-digit codes

### 8.4 Privacy Notice

- Background: `var(--color-bg-alt)` with subtle border
- Icon: Lock emoji or shield icon
- Text: "Your information is secure and used only for your quotation. We do not share your data."
- Font: `0.85rem`, `--color-muted`

### 8.5 Copy Placeholders

| Element | EN | AR |
|---------|----|----|
| Eyebrow | "Verification" | "التحقق" |
| Heading | "Verify Your Identity" | "تحقق من هويتك" |
| Lead | "To view your personalized quotation with detailed pricing, please verify your mobile number." | "لعرض عرض أسعارك الشخصي مع الأسعار التفصيلية، يرجى التحقق من رقم جوالك." |
| Privacy | "Your information is secure and used only for your quotation. We do not share your data." | "معلوماتك آمنة وتُستخدم فقط لعرض أسعارك. نحن لا نشارك بياناتك." |
| Name label | "Full Name *" | "الاسم الكامل *" |
| Phone label | "Mobile Number *" | "رقم الجوال *" |
| Send button | "Send Verification Code" | "إرسال رمز التحقق" |
| Code prompt | "Enter the 6-digit code sent to {phone}" | "أدخل الرمز المكون من 6 أرقام المرسل إلى {phone}" |
| Resend | "Resend code in {time}" | "إعادة إرسال الرمز خلال {time}" |
| Verify button | "Verify Code" | "التحقق من الرمز" |
| Success | "✓ Verified — Your identity has been verified. You can now view your complete quotation." | "✓ تم التحقق — تم التحقق من هويتك. يمكنك الآن عرض عرض أسعارك الكامل." |
| Error | "Invalid code. Please try again." | "رمز غير صحيح. يرجى المحاولة مرة أخرى." |

---

## 9. Step 6 — Review (StepReview)

### 9.1 Layout

```
┌─────────────────────────────────────────────────────────────┐
│ STEP 6 OF 7                                                 │
│ ● ● ● ● ● ● ○                                               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Review Your Quotation                                       │
│                                                             │
│ Please review your complete wedding package before          │
│ submitting. You can go back to make changes.                │
│                                                             │
│ ── Your Selection ────────────────────────────────────────  │
│                                                             │
│ Lane:        Male Wedding                                   │
│ Date:        15 March 2027                                  │
│ Venue:       Atlantis The Palm, Dubai                       │
│ Guests:      200–300                                        │
│                                                             │
│ ── Package: Gold ─────────────────────────────────────────  │
│                                                             │
│ Crew                                                       │
│   2 Videographers                                           │
│   1 Photographer                                            │
│                                                             │
│ Coverage                                                   │
│   8 hours + 2 extra hours = 10 hours total                  │
│                                                             │
│ Deliverables                                               │
│   Highlight Film: 5–8 min                                   │
│   Key-Event Film: 15–20 min                                 │
│   Social Cuts: 1                                            │
│   Edited Photos: 100 + all originals                        │
│                                                             │
│ Included Services                                          │
│   ✓ Professional photography                                │
│   ✓ Crane + operator                                        │
│   ✓ YouTube livestream (1080p)                              │
│   ✓ 2 QR displays (1 hall, 1 exit)                          │
│   ✓ Cloud delivery (60 days)                                │
│   ✓ Camera originals (photo + video)                        │
│   ✓ Hollyland crew communications                           │
│                                                             │
│ Terms                                                      │
│   Cloud access: 60 days from delivery                       │
│   YouTube: Until authorized removal                         │
│   Delivery: 14 days                                         │
│   Revision rounds: 2                                        │
│                                                             │
│ ── Add-Ons ──────────────────────────────────────────────  │
│                                                             │
│   + Same-Day Teaser                                         │
│   + 2× Guest Screens (65")                                  │
│   + Extra Photographer                                      │
│                                                             │
│ ── Pricing ──────────────────────────────────────────────  │
│                                                             │
│   Package (Gold)                          AED XX,XXX        │
│   + 2 extra hours                         AED X,XXX         │
│   + Same-Day Teaser                       AED X,XXX         │
│   + 2× Guest Screens (65")                AED X,XXX         │
│   + Extra Photographer                    AED X,XXX         │
│   ─────────────────────────────────────────────────         │
│   Total                                   AED XX,XXX        │
│                                                             │
│   * LED Wall: Price Confirmation Required (not included)    │
│                                                             │
│ ── QR Code Previews ─────────────────────────────────────  │
│                                                             │
│   ┌─────────────┐    ┌─────────────┐                       │
│   │  QR CODE    │    │  QR CODE    │                       │
│   │  Hall       │    │  Exit       │                       │
│   │  Display    │    │  Display    │                       │
│   └─────────────┘    └─────────────┘                       │
│                                                             │
│   Guests scan the QR code to access and download            │
│   event photos via the Big Story Photo Finder.              │
│                                                             │
│ ┌─────────────────────────────────────────────────────┐     │
│ │ ☐ I have reviewed my quotation and confirm the      │     │
│ │   details are correct. I understand this is a       │     │
│ │   request for quotation, not a confirmed booking.   │     │
│ └─────────────────────────────────────────────────────┘     │
│                                                             │
│                          [ Back ]  [ Submit Quotation ]     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 9.2 Summary Table Design

**Structure:**
- Two-column layout: label (left) + value (right)
- Section dividers with eyebrow-style headers
- Muted labels, ink-colored values
- Price lines: mono font, right-aligned
- Total line: bold, gold, with top border

**Pricing Display Rules:**
- Before OTP: NOT SHOWN (this step is only reachable after OTP)
- After OTP: Show line-item prices, subtotals, total
- "Price Confirmation Required" items: shown but NOT included in total
- No fabricated ranges or placeholder numbers

### 9.3 QR Display Preview

**Design:**
- Two side-by-side cards showing QR code previews
- Each card: `bs-card` styling, centered QR image
- Label below each: "Hall Display" / "Exit Display"
- Description: "Guests scan the QR code to access and download event photos via the Big Story Photo Finder."
- QR codes are placeholder/mockups at this stage (actual QR generated at build time)

### 9.4 Confirmation Checkbox

- Custom styled checkbox (gold checkmark on dark)
- Label: "I have reviewed my quotation and confirm the details are correct. I understand this is a request for quotation, not a confirmed booking."
- Required before submission
- Font: `0.9rem`, `--color-muted`

### 9.5 Copy Placeholders

| Element | EN | AR |
|---------|----|----|
| Eyebrow | "Review" | "مراجعة" |
| Heading | "Review Your Quotation" | "راجع عرض أسعارك" |
| Lead | "Please review your complete wedding package before submitting. You can go back to make changes." | "يرجى مراجعة باقة الزفاف الكاملة قبل الإرسال. يمكنك العودة لإجراء التغييرات." |
| Selection section | "Your Selection" | "اختيارك" |
| Package section | "Package: {tier}" | "الباقة: {tier}" |
| Crew section | "Crew" | "الطاقم" |
| Coverage section | "Coverage" | "التغطية" |
| Deliverables section | "Deliverables" | "المخرجات" |
| Included section | "Included Services" | "الخدمات المشمولة" |
| Terms section | "Terms" | "الشروط" |
| Add-ons section | "Add-Ons" | "الإضافات" |
| Pricing section | "Pricing" | "التسعير" |
| QR section | "QR Code Previews" | "معاينة رموز QR" |
| Confirmation | "I have reviewed my quotation and confirm the details are correct. I understand this is a request for quotation, not a confirmed booking." | "لقد راجعت عرض أسعاري وأؤكد أن التفاصيل صحيحة. أفهم أن هذا طلب عرض أسعار وليس حجزاً مؤكداً." |
| Submit button | "Submit Quotation" | "إرسال عرض الأسعار" |

---

## 10. Step 7 — Submit (StepSubmit)

### 10.1 Layout

```
┌─────────────────────────────────────────────────────────────┐
│ STEP 7 OF 7                                                 │
│ ● ● ● ● ● ● ●                                               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ ✓ Quotation Submitted                                       │
│                                                             │
│ Thank you, {name}! Your wedding quotation request has       │
│ been submitted to Big Story.                                │
│                                                             │
│ ┌─────────────────────────────────────────────────────┐     │
│ │ What happens next:                                  │     │
│ │                                                     │     │
│ │ 1. Our team reviews your configuration              │     │
│ │ 2. We verify date and venue availability            │     │
│ │ 3. We confirm pricing for any custom-quote items    │     │
│ │ 4. You receive a confirmed quotation via WhatsApp   │     │
│ │                                                     │     │
│ │ Expected response: Within 24 hours                  │     │
│ └─────────────────────────────────────────────────────┘     │
│                                                             │
│ Reference: #WQ-20270315-XXXX                                │
│                                                             │
│ ┌─────────────────┐  ┌─────────────────┐                    │
│ │ 💬 WhatsApp     │  │ 📧 Email        │                    │
│ │ Contact Us      │  │ Contact Us      │                    │
│ └─────────────────┘  └─────────────────┘                    │
│                                                             │
│ [ ← Back to Weddings ]                                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 10.2 Success State

- Green checkmark icon (large, centered)
- Heading: "✓ Quotation Submitted" in `--font-display`
- Personalized message with client name
- Reference number: `#WQ-YYYYMMDD-XXXX` format
- "What happens next" numbered list in elevated card
- Expected response time: "Within 24 hours"
- CTAs: WhatsApp (green button) + Email (ghost button)
- Back link: "← Back to Weddings" linking to `/services/weddings`

### 10.3 Copy Placeholders

| Element | EN | AR |
|---------|----|----|
| Heading | "✓ Quotation Submitted" | "✓ تم إرسال عرض الأسعار" |
| Message | "Thank you, {name}! Your wedding quotation request has been submitted to Big Story." | "شكراً لك، {name}! تم إرسال طلب عرض أسعار الزفاف إلى بيك ستوري." |
| Next steps heading | "What happens next" | "ما الخطوات التالية" |
| Step 1 | "Our team reviews your configuration" | "فريقنا يراجع إعداداتك" |
| Step 2 | "We verify date and venue availability" | "نتحقق من توفر التاريخ والمكان" |
| Step 3 | "We confirm pricing for any custom-quote items" | "نؤكد أسعار أي عناصر تتطلب تسعيراً مخصصاً" |
| Step 4 | "You receive a confirmed quotation via WhatsApp" | "تتلقى عرض أسعار مؤكد عبر واتساب" |
| Response time | "Expected response: Within 24 hours" | "الرد المتوقع: خلال 24 ساعة" |
| WhatsApp CTA | "💬 Contact Us on WhatsApp" | "💬 تواصل معنا عبر واتساب" |
| Email CTA | "📧 Contact Us by Email" | "📧 تواصل معنا عبر البريد" |
| Back link | "← Back to Weddings" | "← العودة إلى الزفاف" |

---

## 11. Coming Soon Badge (ComingSoonBadge)

### 11.1 Design

```
┌─────────────────┐
│ COMING SOON     │
└─────────────────┘
```

- Background: `var(--color-line)` with 50% opacity
- Text: `--font-mono`, `0.65rem`, uppercase, `0.15em` tracking
- Color: `var(--color-muted)`
- Border-radius: `999px` (pill)
- Padding: `0.25rem 0.75rem`
- Position: Top-right corner of parent card

### 11.2 Usage

- Lane cards (Female, Aqd)
- Add-on cards (Instagram Live, YouTube + IG Simulcast)
- Any future feature that is not yet released

### 11.3 Disabled State

When a Coming Soon badge is present:
- Parent card: `opacity: 0.5`
- No hover effects
- No click/selection capability
- `cursor: not-allowed`
- No price displayed
- Tooltip on hover: "This feature is not yet available."

---

## 12. Responsive Design

### 12.1 Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | < 640px | Single column, stacked cards |
| Tablet | 640–1024px | 2-column grids |
| Desktop | > 1024px | 3-column grids, side-by-side layouts |

### 12.2 Mobile-Specific Adaptations

**Wizard Container:**
- Full-width, no horizontal padding beyond `bs-shell`
- Step content scrolls naturally
- Sticky footer with Continue/Back buttons (fixed at bottom)
- Progress indicator: compact, above content

**Cards:**
- Stack vertically (1 column)
- Full-width, no side margins
- Reduced padding: `1.25rem` instead of `clamp(1.5rem, 2.5vw, 2rem)`

**Forms:**
- Full-width inputs
- Chip groups: 2-3 columns instead of 5
- Date picker: native mobile date picker

**OTP Input:**
- Smaller boxes: `40px × 48px` instead of `48px × 56px`
- Still 6 boxes in a row (fits on most mobile screens)

**Review Summary:**
- Single column, label above value
- Prices right-aligned but in full-width rows

### 12.3 RTL Support

All layouts must work in RTL (`dir="rtl"`) for Arabic:
- Text alignment: right
- Progress dots: right to left
- Card grids: right to left
- Form labels: right-aligned
- Chip groups: right to left
- Back/Continue buttons: swapped positions (Continue on left, Back on right)
- Breadcrumbs: right to left

---

## 13. Interaction Patterns

### 13.1 Step Transitions

- Forward: Content slides out left, new content slides in from right
- Backward: Content slides out right, new content slides in from left
- Duration: `0.3s` with `var(--ease-out)` easing
- RTL: Reversed direction
- Reduced motion: Instant swap (no animation)

### 13.2 Card Selection

- Click/tap: Immediate visual feedback
- Selected state: Gold border + checkmark appears
- Deselect: Click again to deselect
- Single select: Only one package can be selected
- Multi-select: Multiple add-ons can be selected

### 13.3 Price Reveal (After OTP)

- Animated reveal: Prices fade in from 0 opacity
- Duration: `0.5s` with staggered delay per line item
- "Price available after verification" text fades out as prices fade in

### 13.4 Form Validation

- Real-time validation on blur
- Error messages appear below fields
- Error styling: `var(--color-error)` border + text
- Success: `var(--color-success)` border
- Submit blocked until all required fields pass

### 13.5 Loading States

- "Send Verification Code" button: Loading spinner, disabled
- "Verify Code" button: Loading spinner, disabled
- "Submit Quotation" button: Loading spinner, disabled
- Step transitions: Brief loading indicator if async operations

---

## 14. Accessibility

### 14.1 Keyboard Navigation

- All interactive elements focusable via Tab
- Focus visible: `2px solid var(--color-gold)` with `3px` offset
- Enter/Space activates buttons and chips
- Escape closes modals
- Arrow keys navigate within chip groups

### 14.2 Screen Readers

- Progress indicator: `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- Step labels: `aria-label` describing current step
- Form fields: Proper `<label>` associations
- Error messages: `role="alert"` with `aria-describedby`
- Success states: `aria-live="polite"` announcements
- Coming Soon: `aria-disabled="true"` with tooltip description

### 14.3 Color Contrast

All text meets WCAG AA (4.5:1 for normal text, 3:1 for large text):
- `--color-ink` on `--color-bg`: 15.4:1 ✓
- `--color-gold` on `--color-bg`: 7.2:1 ✓
- `--color-muted` on `--color-bg`: 4.6:1 ✓
- `--color-error` on `--color-bg`: 5.7:1 ✓

### 14.4 Motion

- All animations respect `prefers-reduced-motion: reduce`
- When reduced motion is preferred: instant transitions, no animations
- No auto-playing animations that can't be paused

---

## 15. Analytics Events (PostHog)

### 15.1 Tracked Events

| Event | Trigger | Properties |
|-------|---------|------------|
| `wq_step_complete` | Step completed | `step_number`, `lane`, `package` |
| `wq_lane_select` | Lane selected | `lane` (male/female/aqd) |
| `wq_package_select` | Package selected | `package` (silver/gold/platinum) |
| `wq_addon_toggle` | Add-on added/removed | `addon_id`, `action` (add/remove) |
| `wq_coming_soon_click` | Coming Soon item clicked | `item_id` |
| `wq_otp_sent` | OTP code sent | — |
| `wq_otp_verified` | OTP verified | — |
| `wq_otp_failed` | OTP verification failed | `attempts_remaining` |
| `wq_submit` | Quotation submitted | `lane`, `package`, `addon_count` |
| `wq_abandon` | Wizard abandoned | `last_step`, `lane`, `package` |

### 15.2 Privacy Rules

- Do NOT track: client name, phone number, OTP values
- Do NOT track: specific prices or totals
- DO track: package selections, add-on interest, step completion rates
- DO track: Coming Soon click-through rates (demand signal)

---

## 16. File Structure

```
src/app/[locale]/services/wedding-quotation/
  page.tsx                    — Server component: metadata, JSON-LD, layout shell
  loading.tsx                 — Loading state

src/components/wedding-quotation/
  WeddingQuotationWizard.tsx  — Client component: multi-step wizard orchestrator
  StepLaneSelect.tsx          — Step 1: Lane selection
  StepEventDetails.tsx        — Step 2: Event details form
  StepPackageSelect.tsx       — Step 3: Package tier cards
  StepCustomize.tsx           — Step 4: Add-ons and customization
  StepOtpGate.tsx             — Step 5: OTP verification
  StepReview.tsx              — Step 6: Quotation review
  StepSubmit.tsx              — Step 7: Submission confirmation
  PackageCard.tsx             — Reusable tier card component
  ComingSoonBadge.tsx         — Disabled state badge
  QrDisplayPreview.tsx        — QR code display preview
  OtpInput.tsx                — 6-digit OTP input component
  PriceReveal.tsx             — Animated price reveal
  QuotationSummary.tsx        — Final review summary table

src/data/wedding-quotation/
  packages.ts                 — Package definitions (from QA-approved export)
  addons.ts                   — Add-on definitions
  guest-screens.ts            — Screen size definitions
  lanes.ts                    — Lane definitions
  terms.ts                    — Terms and conditions
```

---

## 17. Implementation Notes

### 17.1 State Management

Use React `useReducer` with typed actions. No external state library needed.

```typescript
type Action =
  | { type: 'SET_LANE'; lane: WizardState['lane'] }
  | { type: 'SET_EVENT'; field: keyof EventDetails; value: string | number }
  | { type: 'SET_PACKAGE'; package: WizardState['package'] }
  | { type: 'TOGGLE_ADDON'; addonId: string }
  | { type: 'SET_EXTRA_HOURS'; hours: number }
  | { type: 'SET_GUEST_SCREEN'; size: string; qty: number }
  | { type: 'SET_OTP_DATA'; name: string; mobile: string }
  | { type: 'VERIFY_OTP' }
  | { type: 'CONFIRM_REVIEW' }
  | { type: 'SUBMIT' }
  | { type: 'GO_TO_STEP'; step: number }
  | { type: 'RESET' };
```

### 17.2 Form Handling

- Use Next.js server actions for OTP verification and submission
- Client-side validation before server calls
- Server-side validation as backup
- Idempotent submission (prevent double-submit)

### 17.3 Pricing Data

- Import from `src/data/wedding-quotation/*.ts` at build time
- NEVER fetch pricing at runtime
- NEVER hand-type prices
- Use typed constants with source metadata

### 17.4 i18n

- All copy in `{ en: "...", ar: "..." }` format
- Use `t()` function for all user-facing text
- RTL support via existing `[locale]` layout
- Date formatting per locale

---

## 18. Acceptance Criteria

This design spec is complete when:

- [x] All 7 wizard steps designed with layout, copy, and interaction states
- [x] Component architecture defined (14 components)
- [x] Responsive behavior specified (mobile/tablet/desktop)
- [x] RTL support designed for all layouts
- [x] Accessibility requirements documented
- [x] Analytics events defined
- [x] File structure planned
- [x] State management approach specified
- [x] Integration with existing design system documented
- [x] Coming Soon states designed
- [x] OTP flow designed with all states
- [x] Price reveal animation specified
- [x] QR display preview designed
- [x] Review-and-confirm step designed
- [x] Submission flow designed

**Next steps (downstream tasks):**
- t_f5789cf0: Implement wedding quotation configurator in React site (assignee: bigstory-web)
- t_4dfe6e6b: Integrate approved wedding quotation configurator into filmwithbigstory.com (assignee: business-manager)

---

*End of UI/UX Design Spec v1.0*
