# UX Specification: Country-Code Selector + Mobile Number Validation

**Project:** Film with Big Story — Wedding Quotation Funnel
**Component:** WeddingQuotationWizard, Step 3 (Verify to view your quotation)
**Date:** 2026-08-25
**Status:** SPECIFICATION ONLY — do not implement

---

## 1. Current State

Step 3 of the wizard collects:
- Name (text input)
- Mobile (plain `<input type="tel">`, no country code, no validation)
- OTP flow (simulated — code "000000")

The mobile field has `dir="ltr"` and `autoComplete="tel"` but no formatting, no country prefix, and no per-country validation. The error message in `copy.ts` is hardcoded to UAE format: `"Please enter a valid UAE phone number (e.g. +971 5X XXX XXXX)."`.

---

## 2. Design Goal

Replace the single mobile input with a **compound field**: country-code dropdown + national number input. Both elements sit on the same screen as one logical question ("Mobile") to preserve the one-question-per-screen flow. The field must validate length and format per selected country code and show clear bilingual error messages.

---

## 3. Wireframe Description

### 3.1 Layout (LTR — English)

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  Step 3 of 5                                            │
│  ●●●○○                                                  │
│                                                         │
│  Verify to view your quotation                          │
│                                                         │
│  You can browse and configure without an account.       │
│  We ask for your name and a verified mobile number      │
│  only before showing your quotation summary.            │
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │ Name                                             │    │
│  │ ┌───────────────────────────────────────────┐    │    │
│  │ │ Saeed                                     │    │    │
│  │ └───────────────────────────────────────────┘    │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │ Mobile                                           │    │
│  │ ┌─────────┬─────────────────────────────────┐    │    │
│  │ │ 🇦🇪 +971 ▼│ 5X XXX XXXX                    │    │    │
│  │ └─────────┴─────────────────────────────────┘    │    │
│  │  ↑ country code     ↑ national number            │    │
│  │    dropdown            input                      │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  [ Send simulated code ]                                │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 3.2 Layout (RTL — Arabic)

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  الخطوة ٣ من ٥                                         │
│  ●●●○○                                                  │
│                                                         │
│  تحقق لعرض عرض الأسعار                                  │
│                                                         │
│  ...                                                    │
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │ الهاتف المحمول                                   │    │
│  │ ┌─────────────────────────────────┬─────────┐    │    │
│  │ │                    ٥X XXX XXXX │ ▼ +971 🇦🇪│    │    │
│  │ └─────────────────────────────────┴─────────┘    │    │
│  │  ↑ national number              ↑ country code   │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  [ أرسل رمزاً تجريبياً ]                                │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Key RTL note:** In RTL mode, the country dropdown moves to the RIGHT side and the national number input extends LEFT. The `dir="ltr"` attribute stays on the number input so digits always render left-to-right regardless of locale.

### 3.3 Compound Field Anatomy

The "Mobile" label wraps a single logical field composed of two visual elements:

| Element | Width | Behaviour |
|---------|-------|-----------|
| Country code button | Fixed ~90px (flag + code + chevron) | Opens a dropdown popover on click/tap |
| National number input | Flex-grow, fills remaining width | `type="tel"`, `inputMode="numeric"`, `dir="ltr"` |

Both elements share one `bs-input` border container (rounded corners on outer edges, no border between them). The country button has a subtle right-border separator.

---

## 4. Country Code Dropdown

### 4.1 Default Selection

| Condition | Default |
|-----------|---------|
| Browser locale or IP resolves to UAE | 🇦🇪 +971 |
| Browser locale resolves to other GCC (SA, BH, OM, QA, KW) | Corresponding country code |
| All other / unknown | 🇦🇪 +971 (UAE — primary market) |

**Detection method:** Use `navigator.language` on client side. Do NOT use IP geolocation (adds latency, privacy concerns, and an API dependency for a non-critical default). The user can change it in one tap.

### 4.2 Country List

Show ALL countries, sorted alphabetically by English name (LTR) or Arabic name (RTL). Each row displays:

```
[Flag emoji]  [Country name]  [+code]
```

**Priority rows at top (pinned):**
1. 🇦🇪 United Arab Emirates +971
2. 🇸🇦 Saudi Arabia +966
3. 🇧🇭 Bahrain +973
4. 🇴🇲 Oman +968
5. 🇶🇦 Qatar +974
6. 🇰🇼 Kuwait +965

Then a thin separator line, then the full alphabetical list.

### 4.3 Dropdown Interaction

| Action | Behaviour |
|--------|-----------|
| Click/tap country button | Opens dropdown popover (absolute positioned, max-height ~280px, scrollable) |
| Type while dropdown open | Filters country list by name or code (type-ahead search) |
| Select a country | Closes dropdown, updates flag + code, clears national number input, re-focuses number input |
| Click outside | Closes dropdown, no change |
| Escape key | Closes dropdown, returns focus to country button |

### 4.4 Mobile (Small Screen) Behaviour

On viewports < 640px:
- Dropdown becomes a full-width bottom sheet or inline expansion (not a tiny floating popover)
- Country rows are taller (48px min touch target)
- Search input appears at top of dropdown

---

## 5. National Number Input

### 5.1 Attributes

| Attribute | Value |
|-----------|-------|
| `type` | `tel` |
| `inputMode` | `numeric` |
| `dir` | `ltr` (always — digits must render left-to-right) |
| `autoComplete` | `tel-national` |
| `placeholder` | Dynamic per country (see 5.2) |
| `maxLength` | Dynamic per country (see 5.3) |

### 5.2 Placeholder Text (per country)

| Country | Placeholder |
|---------|-------------|
| UAE (+971) | `5X XXX XXXX` |
| Saudi (+966) | `5X XXX XXXX` |
| Bahrain (+973) | `XXXX XXXX` |
| Oman (+968) | `XXXX XXXX` |
| Qatar (+974) | `XXXX XXXX` |
| Kuwait (+965) | `XXXX XXXX` |
| UK (+44) | `7XXX XXX XXX` |
| US/CA (+1) | `(XXX) XXX-XXXX` |
| All others | `XXX XXX XXXX` (generic) |

### 5.3 Validation Rules Per Country

| Country | Code | National digits | Regex pattern | Notes |
|---------|------|-----------------|---------------|-------|
| UAE | +971 | 9 digits | `^[2-9]\d{8}$` | Starts with 2-9 (mobile starts 5x) |
| Saudi Arabia | +966 | 9 digits | `^[1-9]\d{8}$` | Mobile starts with 5 |
| Bahrain | +973 | 8 digits | `^[1-9]\d{7}$` | |
| Oman | +968 | 8 digits | `[2-9]\d{7}` | |
| Qatar | +974 | 8 digits | `[2-8]\d{7}` | |
| Kuwait | +965 | 8 digits | `[2-9]\d{7}` | |
| UK | +44 | 10 digits | `^[1-9]\d{9}$` | |
| US/Canada | +1 | 10 digits | `^[2-9]\d{9}$` | |
| Other | — | 7-15 digits | `^\d{7,15}$` | ITU-T E.164 max |

**Stripping behaviour:** Before validation, strip all spaces, dashes, parentheses, and leading zeros from the national number. Validate the cleaned digits only.

### 5.4 Auto-formatting (Visual Only)

As the user types, insert spaces for readability:
- UAE/SA: `5X XXX XXXX` (groups of 3)
- BH/OM/QA/KW: `XXXX XXXX` (groups of 4)
- US: `(XXX) XXX-XXXX`
- Others: no auto-format, just accept digits

Formatting is cosmetic — the stored value is digits-only (no spaces).

---

## 6. Error States

### 6.1 Validation Timing

| Trigger | Behaviour |
|---------|-----------|
| User types in number field | NO validation yet (don't show errors while typing) |
| User blurs the number field (onBlur) | Validate if field is non-empty |
| User clicks "Send code" button | Validate; block submission if invalid |
| User changes country after entering number | Re-validate immediately with new country rules |

### 6.2 Error Messages

All error messages are bilingual (EN/AR). They appear BELOW the compound field container, not between the dropdown and input.

| Error | English | Arabic |
|-------|---------|--------|
| Empty field on submit | "Please enter your mobile number." | "يرجى إدخال رقم هاتفك المحمول." |
| Too few digits | "This number is too short for {country}. It should be {N} digits." | "هذا الرقم قصير جداً لـ {country}. يجب أن يكون {N} أرقام." |
| Too many digits | "This number is too long for {country}. It should be {N} digits." | "هذا الرقم طويل جداً لـ {country}. يجب أن يكون {N} أرقام." |
| Invalid format (e.g. UAE starts with 0) | "This does not look like a valid {country} mobile number." | "لا يبدو هذا كرقم هاتف محمول صحيح في {country}." |
| Generic (other countries) | "Please enter a valid mobile number for {country}." | "يرجى إدخال رقم هاتف محمول صحيح لـ {country}." |

Where `{country}` = the selected country's English or Arabic name.

### 6.3 Error Visual Treatment

- Error text: `text-[color:var(--color-error)]` (or red), 14px, below the compound field
- The compound field border turns red: `border-[color:var(--color-error)]`
- An `aria-describedby` links the input to the error message for screen readers
- `aria-invalid="true"` is set on the input when invalid
- Error clears as soon as the user starts correcting (on focus or on input change)

### 6.4 OTP Step Error

If the OTP verification fails (currently simulated), show:
- EN: "Incorrect code. Please try again."
- AR: "الرمز غير صحيح. يرجى المحاولة مرة أخرى."

This is unchanged from current behaviour.

---

## 7. Interaction Notes

### 7.1 Keyboard Navigation

| Key | Behaviour |
|-----|-----------|
| Tab | Moves from name input → country button → number input → send code button |
| Enter/Return on country button | Opens dropdown |
| Arrow Up/Down in dropdown | Moves highlight through country list |
| Enter in dropdown | Selects highlighted country, closes dropdown |
| Escape in dropdown | Closes dropdown without selection |
| Type digits in number input | Normal input behaviour |

### 7.2 Screen Reader Announcements

- Country button: "United Arab Emirates, +971. Change country code." (aria-label)
- Dropdown open: "Country code list, {N} countries. Type to filter." (aria-live region)
- Country selected: Brief announcement "Selected: {country name}, +{code}" via aria-live
- Error shown: Announced via `role="alert"` on the error container

### 7.3 Stored Data Shape

The phone number is stored and submitted as:

```typescript
{
  phoneCountryCode: string;  // e.g. "+971"
  phoneNational: string;     // e.g. "501234567" (digits only, no spaces)
  phoneE164: string;         // e.g. "+971501234567" (full international, computed)
}
```

The `phoneE164` value is computed client-side by concatenating `phoneCountryCode + phoneNational`. This is the value sent to the backend/OTP system.

### 7.4 Data Migration

The current `phone` state field in the wizard is a single string. This spec replaces it with the three fields above. The `WeddingIntakeData` interface does NOT include phone (phone is collected in the wizard, not the intake form), so no intake form changes are needed.

### 7.5 No External Dependencies

This spec does NOT require:
- A phone validation library (libphonenumber, etc.) — use the simple regex table above
- IP geolocation API — use `navigator.language` for default
- A real OTP service — the simulated "000000" flow remains unchanged

The country list data (name, code, flag, digit count, regex) should be defined in a local `data/country-codes.ts` file, not fetched from an API.

---

## 8. Component Structure (Suggested, Not Prescriptive)

```
WeddingQuotationWizard.tsx
  └── Step 3 section
       ├── Name input (unchanged)
       ├── MobileCompoundInput (NEW component)
       │    ├── CountryCodeDropdown
       │    │    ├── Trigger button (flag + code + chevron)
       │    │    └── Popover/Sheet
       │    │         ├── Search input (type-ahead filter)
       │    │         └── Country list (scrollable)
       │    └── NationalNumberInput
       ├── Error message container (shared for compound field)
       ├── Send code button (unchanged)
       └── OTP section (unchanged)
```

### 8.1 New Files

| File | Purpose |
|------|---------|
| `src/data/country-codes.ts` | Country list with codes, flags, digit counts, regex patterns, bilingual names |
| `src/components/wedding-quotation/MobileCompoundInput.tsx` | The compound country-code + number component |

### 8.2 Modified Files

| File | Change |
|------|--------|
| `src/components/wedding-quotation/WeddingQuotationWizard.tsx` | Replace plain phone `<input>` with `<MobileCompoundInput>`, update state shape from `phone: string` to `phoneCountryCode + phoneNational + phoneE164`, update `verifyOtp()` to use `phoneE164` |
| `src/data/copy.ts` | Replace single `validation.phone` message with the set of per-error-type messages from section 6.2 |

---

## 9. Acceptance Criteria

- [ ] Country code dropdown defaults to UAE (+971) for en/ar locales
- [ ] Dropdown shows pinned GCC countries at top, then full alphabetical list
- [ ] Dropdown is filterable by typing country name or code
- [ ] National number input shows country-specific placeholder
- [ ] National number input strips non-digit characters before validation
- [ ] Validation runs on blur and on form submit (not while typing)
- [ ] Error messages are bilingual and reference the selected country by name
- [ ] Error states use existing design system colours (error red, border treatment)
- [ ] Compound field works correctly in both LTR and RTL layouts
- [ ] Tab order: name → country button → number input → send code
- [ ] Screen reader announces country selection and errors
- [ ] Phone data stored as E.164 format for backend consumption
- [ ] No external API dependencies (no libphonenumber, no geolocation)
- [ ] Existing OTP flow (simulated "000000") continues to work unchanged
- [ ] Mobile viewport: dropdown is usable with thumb (min 48px touch targets)

---

## 10. Out of Scope

- Real SMS OTP integration (remains simulated)
- Phone number input in the WeddingIntakeForm (4-step intake) — phone stays in wizard step 3 only
- International formatting beyond the GCC + major English-speaking countries
- Carrier detection or number portability checks
- WhatsApp link generation from the phone number (potential future enhancement)
