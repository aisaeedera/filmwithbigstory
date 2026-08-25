# Wedding quotation experience — implementation-ready design contract v1.0

Status: internal implementation/QA design; no production deployment, pricing release, booking, payment, supplier contact, or real PII collection authorized.

## Route contract

| Existing route | Required action | Copy (EN / AR) | Target |
|---|---|---|---|
| `/services/weddings` | Add the primary gold hero CTA before the existing Cinematic Wedding ghost CTA. | `Build your wedding quotation` / `أنشئ عرض زفافك` | `localizedPath(locale, "/wedding-quotation")` |
| `/services/groom-wedding-services` | Replace its generic WhatsApp primary at the hero with the quotation CTA; retain WhatsApp as the adjacent secondary support action. | `Build a male-wedding quotation` / `أنشئ عرض زفاف رجالي` | `localizedPath(locale, "/wedding-quotation")` |
| `/wedding-quotation` | Add a locale route under `src/app/[locale]/wedding-quotation/page.tsx` and render an interactive client component. English is canonical `/wedding-quotation`; Arabic is `/ar/wedding-quotation`. | `Wedding quotation` / `عرض الزفاف` | first-party route |

The route must use the existing `Locale`, `localizedPath`, `Section`, `Eyebrow`, `Button`, `Reveal`, dark/gold tokens, skip link, and RTL layout. It must not add another typeface or a new visual system.

## Information architecture and screen order

1. **Lane selection** — active `UAE male weddings`; visually available but disabled cards: `Female weddings — Coming Soon` and `Aqd Al Qiran — Coming Soon`. Disabled cards have `disabled`, explanatory text, and no click destination.
2. **Package comparison** — Silver, Gold, Platinum. No price or price range appears in the package cards. Gold receives a `Recommended starting point` / `النقطة الموصى بها` badge but remains an ordinary selectable option.
3. **Customization** — extra coverage hours; guest programme screens by 55/65/75/85-inch size + quantity; released add-ons only. `Modular LED wall — Price Confirmation Required`; Instagram Live and YouTube+Instagram simulcast are disabled Coming Soon. The two base QR displays must be non-removable `Included` items rather than selectable upgrades.
4. **OTP price gate** — name and mobile; disclosure appears immediately before the Send code action. OTP UI is a design contract only: use no real OTP provider, no outbound SMS, and no real PII in the internal prototype.
5. **Controlled quote review** — line-item prices/totals only if an approved client-safe pricing export declares every selected rule releasable. Any unavailable/stale/unknown price produces `Price Confirmation Required`, excludes that item from the confirmed total, and disables payment/booking.
6. **Review-before-payment state** — primary: `Submit for Big Story review` / `أرسل للمراجعة لدى بيك ستوري`; visible next-step panel describes availability, venue, supplier, crew, editor and price confirmation review. No payment link, date hold, booking confirmation, or availability promise exists here.

## Package scope cards (exact copy placement)

Each card has: tier label, one-line positioning heading, scope list, delivery/revision line, and select button. The common-inclusions sentence sits immediately beneath the three-card grid, not duplicated into all cards.

### Common inclusion sentence

EN: `Included in every package: professional photography, crane/jib coverage with a supplier-provided operator, YouTube livestreaming, basic QR photo sharing, two display-only QR screens, cloud delivery, original camera files, and required crew communications.`

AR: `تشمل كل باقة: التصوير الفوتوغرافي، تغطية رافعة/جيب مع مشغّل يوفّره المورد، بث يوتيوب، مشاركة صور QR الأساسية، شاشتي QR للعرض فقط، التسليم السحابي، ملفات الكاميرا الأصلية واتصالات الطاقم اللازمة.`

### Tier copy

| Tier | Heading | Scope list | Delivery line |
|---|---|---|---|
| Silver | `Essential record` / `توثيق أساسي` | 1 videographer + 1 photographer; 3–5 minute highlight; continuous multicamera edit of the agreed formal programme; 50 edited photographs | `21-day delivery target · 1 consolidated revision round` / `هدف تسليم 21 يوماً · جولة تعديل موحدة واحدة` |
| Gold | `Complete wedding day` / `يوم زفاف متكامل` | 2 videographers + 1 photographer; 5–8 minute highlight; 15–20 minute key-event film; 1 social cut; 100 edited photographs | `14-day delivery target · 2 consolidated revision rounds` / `هدف تسليم 14 يوماً · جولتا تعديل موحدتان` |
| Platinum | `Expanded coverage` / `تغطية موسعة` | 2 videographers + 2 photographers; 8–12 minute highlight; 20–30 minute extended film; 3 social cuts; 150 edited photographs | `7-day target subject to verified release · 3 consolidated revision rounds` / `هدف 7 أيام رهن الإطلاق المتحقق · 3 جولات تعديل موحدة` |

All package comparison copy includes the eight-hour baseline. Silver’s formal-programme description must state it is not all eight hours continuously edited and does not imply a religious marriage-contract ceremony.

## Component map

| Component | Responsibility | Required accessibility behavior |
|---|---|---|
| `QuotationEntryCta` | Shared route CTA for the wedding hub and groom page. | Link with visible text; gold primary; 44px minimum hit target. |
| `QuotationShell` | Route heading, Back action, step progress, persistent mobile action area. | `main` landmark; current step announced by text (`Step 2 of 5`) not color alone. |
| `WeddingLaneCards` | Active and disabled wedding lanes. | Native disabled buttons for unavailable lanes; `aria-describedby` points to why unavailable. |
| `PackageComparison` / `PackageCard` | Scope-first Silver/Gold/Platinum comparison. | Radio group + labels; selected state is text/border/fill, not color only. |
| `CommonInclusions` | Non-removable baseline. | Semantic list; “Included in every package” heading. |
| `CustomizationPanel` | Released add-ons, screen selection, controlled selection values. | Fieldsets/legends, labelled quantity steppers, error copy connected with `aria-describedby`. |
| `PriceStatusBanner` | Distinguishes verified total, pending gate, and Price Confirmation Required. | `role=status` for normal updates; `role=alert` only when a selection invalidates confirmation. |
| `OtpGate` | Name/mobile gate and consent/disclosure. | `autocomplete=name`, `autocomplete=tel`; one-time-code uses `autocomplete=one-time-code`; rate-limit/error text exposed. |
| `QuoteReview` | Client-safe summary and locked terms. | `dl` or list semantics; Edit links return to the corresponding step; no price in DOM before OTP success. |
| `ReviewBeforePayment` | Submission confirmation and status. | `aria-live=polite`; no payment/booking CTA while review pending. |
| `StickyQuotationAction` | Mobile-only next action after initial CTA leaves viewport. | Does not duplicate active hero CTA; reserves footer clearance; 44px min target. |

## State contract

| State | Visual treatment | Behavioral constraint |
|---|---|---|
| Default selectable | Elevated dark card, 1px line border, gold on hover/focus. | Selecting announces tier/option and updates the review preview. |
| Selected | Gold outline + restrained dark-gold fill + `Selected` text. | Must remain keyboard-operable through native radio/checkbox control. |
| Included baseline | Read-only row with `Included` label. | Cannot be removed; no quantity control. |
| Coming Soon | 45% opacity is insufficient alone; pair with disabled control, `Coming Soon` label and short unavailable reason. | Cannot mutate the configuration or create commitment. |
| Price Confirmation Required | Error-colored rule + literal label. | Exclude the item from confirmed total; prevent payment/booking. |
| Awaiting OTP | Gold notice and “Verify to view detailed pricing” copy. | No detailed rate, line item or total in rendered markup. |
| OTP invalid/rate-limited | Existing `--color-error` text/border with clear reason. | Never expose whether a mobile number belongs to a person. |
| Review pending | Success-status panel with configuration reference. | Explicitly say it is not availability, price, payment or booking confirmation. |
| Future payment | Not designed as an actionable current state. | Only appears after a separate approved quotation and release gate. |

## Locked copy

### Price-gate disclosure

EN: `You can browse and configure without an account. We ask for your name and a verified mobile number only before showing controlled line-item prices and totals. OTP verification does not confirm availability, price approval, payment or booking.`

AR: `يمكنك التصفح وتخصيص العرض دون حساب. نطلب اسمك ورقم هاتف محمول تم التحقق منه فقط قبل عرض أسعار البنود والإجماليات المحكومة. التحقق برمز لمرة واحدة لا يؤكد التوفر أو اعتماد السعر أو الدفع أو الحجز.`

### Price Confirmation Required

EN: `Price Confirmation Required — this selection is supplier- or venue-dependent. It is not included in a confirmed total and cannot proceed to payment or booking until Big Story approves it.`

AR: `يتطلب تأكيد السعر — يعتمد هذا الاختيار على المورد أو الموقع. لا يدخل في إجمالي مؤكد ولا يمكن أن ينتقل إلى الدفع أو الحجز حتى تعتمد بيك ستوري ذلك.`

### Delivery and retention

EN: `Your client-accessible cloud delivery remains available for 60 days from the delivery notification. Please download edited work, photo originals, unedited JPEGs and original camera video files before the stated expiry date. The YouTube livestream/archive remains on YouTube unless an authorized client requests removal; its retention is separate from the 60-day cloud access period.`

AR: `يبقى التسليم السحابي المتاح للعميل لمدة 60 يوماً من إشعار التسليم. يرجى تنزيل الأعمال المعدلة وملفات الصور الأصلية وملفات JPEG غير المعدلة وملفات فيديو الكاميرا الأصلية قبل تاريخ الانتهاء المحدد. يبقى بث/أرشيف يوتيوب على يوتيوب ما لم يطلب عميل مخوّل حذفه؛ ويختلف احتفاظه عن مدة الوصول السحابي البالغة 60 يوماً.`

### Pre-payment commercial terms

EN: `After Big Story approves the quotation, 100% upfront payment is required to lock the date. Cancellation more than 7 days before the event: 50% charge and 50% refund. Cancellation within 7 days: 100% charge and no refund. Reduce scope before offering a discount. Requests beyond included revision rounds or approved scope require a priced change order.`

AR: `بعد اعتماد بيك ستوري للعرض، يلزم دفع 100% مقدماً لتثبيت التاريخ. الإلغاء قبل أكثر من 7 أيام من الفعالية: رسوم 50% واسترداد 50%. الإلغاء خلال 7 أيام: رسوم 100% ولا استرداد. خفّض النطاق قبل تقديم خصم. الطلبات خارج جولات التعديل المشمولة أو النطاق المعتمد تتطلب أمر تغيير مسعّراً.`

## Responsive contract

- **360–767px:** package cards stack; price/status summary becomes an in-flow card; sticky next action appears only after the primary in-flow action is no longer visible; 16px body min; buttons/controls at least 44px; no horizontal scroll in EN or RTL Arabic.
- **768–1023px:** package cards are a two-column grid with the recommended Gold card first in visual order only if DOM/keyboard order remains Silver, Gold, Platinum; customization and summary stack.
- **1024px+:** three package cards; customization in a two-column grid with summary sticky only within its section; max shell 1240px.
- **Arabic:** `dir="rtl"`, logical CSS properties only, Arabic display/body fonts already supplied by the app, translated labels, and mirrored directional arrow only. Numerals/phone input retain reliable LTR entry behavior using `dir="ltr"` at the input level.

## Motion plan

Use the existing `Reveal` rhythm for non-critical section entry only. Selected package/add-on changes use a 200ms border/background transition. Status banners appear without large movement and are announced. All motion respects the existing reduced-motion global rule; no auto-advancing carousels, counters, or decorative icon animation.

## Asset needs

No external image is required to implement this conversion-first internal flow. If a later art-directed hero is approved, use only a documented-rights, privacy-cleared male-wedding environment/camera-detail photograph with EN/AR alt text; do not use identifiable guest/family imagery without written clearance. No supplier logos, logos-as-proof, stock people, pricing graphics, QR codes, or AI-generated people are required.

## QA acceptance criteria for bigstory-web

1. Route renders at `/wedding-quotation` and `/ar/wedding-quotation`; existing wedding hub and groom route CTAs resolve correctly in both locales.
2. Page has `noindex,nofollow` until a separate production release; it must not be deployed under this card.
3. Package scope matches the approved brief exactly; no legacy AED price, price range, cost, margin, supplier note or unapproved delivery promise survives in this route.
4. Male weddings are the only active lane. Female weddings, Aqd Al Qiran, Instagram Live and simulcast are visibly disabled and cannot mutate submission data.
5. Two QR displays are automatically included and not configurable. Guest screens use 55/65/75/85 TV selection plus modular LED wall Price Confirmation Required.
6. Detailed price DOM/API payload stays unavailable until successful OTP verification; no real OTP/provider/PII is enabled in the internal prototype.
7. Every unsupported/stale selection produces an explicit Price Confirmation Required state, does not fabricate a total, and blocks payment/booking.
8. Review state has no payment/booking control and says Big Story must verify availability, venue, suppliers, crew, editor capacity and price confirmation.
9. Delivery wording distinguishes 60-day client cloud access from YouTube retention; all original photo/video delivery wording is present.
10. Accessibility: keyboard-only step changes, visible focus, native labels/fieldsets, no color-only state, no heading skips, Arabic RTL verification, 200% zoom no horizontal scroll, Axe clean for P0 violations.
11. Visual inspection at 360x800, 768x1024 and 1440x900 in EN and Arabic. Capture the package, OTP, Price Confirmation Required and review-before-payment states.
12. `npm run lint`, `npm run test`, and `npm run build` pass after implementation; run no production deployment.

## Design evidence

Open `WEDDING_QUOTATION_DESIGN_MOCKUP.html` locally with one of these view parameters: `?view=cta`, `?view=flow`, `?view=otp`, `?view=review`, or `?view=ar`. It is a visual static evidence artifact and contains no live form submission, prices, OTP, payment, or booking behavior.
