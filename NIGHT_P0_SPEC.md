# NIGHT P0 — filmwithbigstory.com positioning cleanup (task t_b5d22994)

This is a SURGICAL cleanup. Change ONLY what each rule below specifies.
Do NOT redesign, reformat, restructure, or "improve" anything else.
Do NOT invent new copy, prices, services, or claims.
Preserve all bilingual (EN/AR) pairs. Every English change has an Arabic equivalent that matches in meaning.
Keep TypeScript / TSX valid and buildable (Next.js 16, React 19, Tailwind v4).

Repo root (your working dir): /Users/aiagentmacbookprom1max/BIGSTORY/website/clients/filmwithbigstory/react-site

## RULE 1 — Hide Instagram, LinkedIn, TikTok links/icons GLOBALLY (do not delete accounts/credentials)

In `src/components/Footer.tsx`:
- DELETE the social-links block (lines ~32-36): the `<div className="mt-6 flex flex-wrap gap-4 text-sm">` containing the three `<a>` tags for Instagram, LinkedIn, TikTok.
- Do NOT touch SITE.social in site.ts — keep the credentials/data intact (they're just no longer linked).
- Do NOT remove the brand tagline `<p>` above it.

In `src/components/JsonLd.tsx`:
- In `organizationSchema()` (around lines 41-46), REMOVE instagram, linkedin, tiktok from the `sameAs` array. Keep `SITE.redDomain` in sameAs. Result: `sameAs: [SITE.redDomain]`.
- In `localBusinessSchema()` (around line 72), REMOVE the social entries: change `sameAs: [SITE.social.instagram, SITE.social.linkedin, SITE.social.tiktok]` to `sameAs: [SITE.redDomain]`.
- In `personSchema()` (around lines 208-211), the `sameAs` has two linkedin URLs (personal profile of Saeed). REMOVE both linkedin entries so `sameAs: []` (empty array) — these are the founder's linkedin links, also hidden under this rule. (Keep the rest of personSchema intact.)

In `src/app/llms-full.txt/route.ts`:
- Line ~53: REMOVE the line that pushes `Instagram: ... · LinkedIn: ...`. Delete that whole `out.push(...)` statement. Keep the RED Camera Rentals related-property line above it.

In `src/app/[locale]/about/saeed/page.tsx`:
- There is an Instagram link card (around lines 190-193): `<Link href={SITE.social.instagram} ...><p>Instagram</p>...</Link>`. DELETE that entire `<Link>` element (the Instagram contact card). Keep the email Link above it. (This is a founder page; hiding the Instagram card globally.)

## RULE 2 — Remove "Big Story Network" section + every IJK Labs / FibraHub / Sahab Development reference

In `src/components/Footer.tsx`:
- The third column has a "Big Story network" heading (`ui.footer.network`) and a `<ul>` with RED Camera Rentals, IJK Labs, FibraHub, Sahab Development links (around lines 71-89).
- REMOVE the entire "Big Story network" sub-block: the `<h2>` heading (lines ~71-73) AND the `<ul>` list under it (lines ~74-89) which contains RED rentals, IJK Labs, FibraHub, Sahab.
  - This removes the whole "network" section including IJK/FibraHub/Sahab.
- Keep the "Get in touch" heading + its `<ul>` (email, WhatsApp, phone) above it — that stays.

In `src/lib/site.ts`:
- REMOVE the `partners` object (lines ~36-39: `partners: { ijkLabs: ..., fibraHub: ... }`) since it's now unused. Delete those lines including the `partners: { ... },` block.
- Keep everything else in SITE (social stays — just unused).

In `src/data/copy.ts`:
- The footer copy has `network: { en: "Big Story network", ar: "شبكة بيك ستوري" }` (around line 36). Since the footer no longer renders it, you can either remove the key or leave it. LEAVE IT (harmless unused key; removing risks nothing but leaving is safer). Do not change it.

## RULE 3 — Strengthen the CTA for unclear clients (keep "We reply within one business day. No obligation, no hard sell.")

In `src/data/copy.ts`, the `ui.speedPromise` object (lines ~24-27):
- KEEP the existing text exactly:
  en: "We reply within one business day. No obligation, no hard sell."
  ar: "نرد خلال يوم عمل واحد. دون التزام ودون بيع مباشر."
- ADD a new key right after `speedPromise` inside the `ui` object, named `notClearYet`:
  en: "Not clear yet? Talk to us. We'll help shape the idea, make it practical, and show you the next step."
  ar: "لست متأكداً بعد؟ تحدّث إلينا. سنساعدك في صياغة الفكرة ونجعلها عملية ونريك الخطوة التالية."
  (This Arabic is a faithful natural translation. Improve grammar naturally while preserving meaning.)

In `src/components/CtaBand.tsx`:
- Right after the `<p>` that renders `{t(ui.speedPromise, locale)}` (line ~34), ADD a second `<p>` that renders the new reassurance line, styled subtly:
  `<p className="mt-3 text-sm text-[color:var(--color-muted)]">{t(ui.notClearYet, locale)}</p>`
  (Place it as a sibling right after the speedPromise paragraph, inside the same Reveal.)

## RULE 4 — Remove "The people making your film" / team-member showcase EVERYWHERE (do NOT add fake team)

In `src/data/copy.ts`, the `about.team` object (lines ~287-291):
- DELETE the entire `team: { eyebrow, h2, note }` object. Remove those lines.
- Also the `about.eyebrow`/`about.craft` etc. stay.

In `src/app/[locale]/about/page.tsx`:
- DELETE the entire TEAM `<Section>` (the comment `{/* TEAM — Saeed Salim + crew */}` through its closing `</Section>`, roughly lines 56-93). This removes Saeed's card, the "Founder & DP" eyebrow, the Saeed Salim name, the 3 placeholder crew cards, and the "Full profile →" link. REMOVE THE WHOLE SECTION including its comment.
- Do NOT replace it with anything. The about page should just flow from the craft Section straight to the final CtaBand.
- Do NOT remove the `CtaBand` at the bottom.
- If `localizedPath` or other imports become unused after removing the Saeed link, leave the imports as-is (unused import is harmless and avoids breaking). Actually — check: `localizedPath` is imported and used only in the team link. If removing the section makes `localizedPath` unused, that's fine, lint may warn but build passes. Leave imports.

## RULE 5 — Change "Saudi-style weddings" → "Emirati weddings"

In `src/app/[locale]/careers/page.tsx`, line ~15:
- Change `type: "Saudi-style weddings"` to `type: "Emirati weddings"`.
- Do NOT change anything else on that line or page. (The Arabic summaryAr already says "أعراس الإمارات" which is correct; leave it.)

## RULE 6 — Pricing page: remove RED KOMODO-X rental as the lead/first offering; move Videography & Crew to the FINAL section; rental enquiries guide only to https://red.filmwithbigstory.com

In `src/data/pricing.ts`, reorder the `pricing` array (the exported categories). The PricingTool renders categories in array order. Current order is:
1. red_komodo_x
2. big_story_services (Film & Video Production)
3. photography
4. videography
5. podcast
6. brand_system_packages
7. content_creation
8. analytics_cro
9. copywriter
10. google_tools_setup
11. gmb_solutions
12. social_media_management
13. seo_retainer
14. solution_packages

NEW order required (move red_komodo_x to LAST; move videography to near-last, i.e. the final section):
1. big_story_services
2. photography
3. podcast
4. brand_system_packages
5. content_creation
6. analytics_cro
7. copywriter
8. google_tools_setup
9. gmb_solutions
10. social_media_management
11. seo_retainer
12. solution_packages
13. videography
14. red_komodo_x   <-- now the FINAL section (last offering, not the lead)

So: `big_story_services` is now the FIRST/lead category. `videography` is second-to-last. `red_komodo_x` is LAST.
This is a pure reorder of the array elements — do NOT change any content inside the category objects during the move.

Then, in the `red_komodo_x` category blurb (now last), make the rental-guidance explicit. Change its `blurb.en` to:
"6K cinema camera packages rented by the day, with our own crew available. For rental bookings, see red.filmwithbigstory.com — rates drop for multi-day and long-term bookings."
And `blurb.ar` to:
"باقات كاميرا سينمائية بدقة 6K للإيجار اليومي، مع طاقمنا الخاص عند الطلب. للحجوزات راجع red.filmwithbigstory.com — تنخفض الأسعار للحجوزات متعددة الأيام وطويلة الأمد."
(Keep the rest of the red_komodo_x category — modules, notes — unchanged.)

## RULE 7 — Remove every client-visible "AI" / "AI-led" / "AI powered" claim that reveals Big Story's internal AI use. Do NOT publicly claim work is AI-led.

This applies to rendered copy and metadata only (not code comments). Be precise — replace with truthful phrases (search visibility / strategic development / automation / "our process"). Keep EN+AR paired.

In `src/data/pricing.ts`:

a) Category `analytics_cro` blurb (line ~716): remove "CRO analyst + AI tooling delivers the work — no human 'SEO specialist' or 'CRO specialist' is retained." Replace the sentence so it reads:
   en: "Measure what your site and content actually do, then improve it. Set-ups are one-off; retainers and heatmaps are monthly."
   ar: "قِس ما يفعله موقعك ومحتواك فعلاً، ثم حسّنه. الإعدادات لمرة واحدة؛ الاشتراكات وخرائط الحرارة شهرية."
   (Dropped the AI tooling / no-human-specialist claim.)

b) Module `heatmap_monthly` desc (line ~737): remove "AI-assisted analysis." sentence fragment. New en ends after "...suggestions email." and ar ends after "...بريد اقتراحات." (drop "تحليل بمساعدة الذكاء الاصطناعي.").

c) Module `cro_retainer` desc (line ~787): remove "AI tooling + analyst." Replace tail with "...monthly experiment report, suggestions email." / ar "...تقرير تجارب شهري، بريد اقتراحات." (drop "أدوات ذكاء اصطناعي + محلّل.")

d) Category `copywriter` blurb (line ~797): remove "AI-assisted drafting, human-reviewed." New en: "Words that sell — in English and Arabic. Pages, blog posts and captions priced individually so you only pay for what you need." / ar: "كلمات تبيع — بالإنجليزية والعربية. صفحات ومقالات ونصوص بسعر فردي لتدفع فقط مقابل ما تحتاجه."

e) Modules blog_en, blog_ar, blog_en_4_pack_monthly, blog_ar_4_pack_monthly (lines ~848, 858, 868, 878): remove "AI-assisted" from descriptions. 
   - blog_en en: "An SEO-aware English blog article — fast turnaround at a lower cost. ~800-1,200 words." / ar: "مقال مدونة إنجليزي مهيأ لمحركات البحث — تسليم سريع بتكلفة أقل. 800-1,200 كلمة."
   - blog_ar en: "An SEO-aware native Arabic blog article — fast turnaround at a lower cost." / ar: "مقال مدونة عربي أصلي مهيأ لمحركات البحث — تسليم سريع بتكلفة أقل."
   - blog_en_4_pack_monthly en: "Four English blog posts a month — steady content for SEO at one efficient rate." / ar: "أربعة مقالات مدونة إنجليزية شهرياً — محتوى متواصل لتحسين محركات البحث بسعر واحد فعّال."
   - blog_ar_4_pack_monthly en: "Four native Arabic blog posts a month — steady Arabic content for SEO at one efficient rate." / ar: "أربعة مقالات مدونة عربية أصلية شهرياً — محتوى عربي متواصل لتحسين محركات البحث بسعر واحد فعّال."

f) Module `gmb_monthly_retainer` desc (line ~1066): remove "AI-assisted drafting + human review." / "صياغة بمساعدة الذكاء الاصطناعي + مراجعة بشرية." Tail becomes "...monthly analytics report." / "...تقرير تحليلات شهري."

g) Category `social_media_management` blurb (line ~1076): remove "AI-assisted drafting, human-approved." / "صياغة بمساعدة الذكاء الاصطناعي، موافقة بشرية." New en: "Monthly social media management — scheduling, community engagement, monthly analytics. Content creation (videos, photos, graphics) is billed separately as the content creation packages." / ar: "إدارة وسائل تواصل اجتماعي شهرية — جدولة، تفاعل مجتمعي، تحليلات شهرية. إنشاء المحتوى (فيديوهات، صور، تصاميم) يُفوتر منفصلاً كجزء من باقات صناعة المحتوى."

h) Category `seo_retainer` (id "seo_retainer") — this is the big one:
   - Category `name` (line ~1115): change `en: "SEO Monthly Retainer (AI-led)"` → `en: "SEO Monthly Retainer"`. ar: change `ar: "اشتراك SEO شهري (بقيادة الذكاء الاصطناعي)"` → `ar: "اشتراك SEO شهري"`.
   - Category `blurb` (line ~1117): remove all AI-led claims. New en: "A lean SEO retainer — specialist tooling plus 4–12 hours/month of analyst review to drive rankings. Content production is billed separately as blog posts." / ar: "اشتراك سيو مُقتصد — أدوات متخصصة بالإضافة إلى 4-12 ساعة/شهرياً من مراجعة المحلّل لتحسين التصنيفات. إنتاج المحتوى يُفوتر منفصلاً كمقالات مدونة."
   - Module `ai_seo_starter` (line ~1124): name en `"AI SEO starter"` → `"SEO starter"`; ar `"سيو AI الأساسي"` → `"SEO الأساسي"`. desc en: remove "AI SEO tool subscriptions + ", start "4h analyst review/month: ..." → en: "4h analyst review/month: ranking report (top 10 keywords), 1-page opportunity doc, search-console insights, 30-min review call. Content production not included." ar: "4 ساعات مراجعة محلّل/شهرياً: تقرير التصنيفات (أعلى 10 كلمات)، وثيقة فرص صفحة واحدة، رؤى Search Console، مكالمة مراجعة 30 دقيقة. إنتاج المحتوى غير مشمول."
   - Module `ai_seo_growth` (line ~1134): name en `"AI SEO growth"` → `"SEO growth"`; ar `"سيو AI نمو"` → `"SEO نمو"`. desc en: "8h analyst review/month: ranking report, competitor gap analysis, on-page audit (5 pages/month), 2-page opportunity doc, monthly strategy call." / ar: "8 ساعات مراجعة محلّل/شهرياً: تقرير التصنيفات، تحليل فجوات المنافسين، تدقيق على الصفحة (5 صفحات/شهر)، وثيقة فرص صفحتين، مكالمة استراتيجية شهرية."
   - Module `ai_seo_premium` (line ~1144): name en `"AI SEO premium (with 4 blog posts)"` → `"SEO premium (with 4 blog posts)"`; ar `"سيو AI متميز (مع 4 مقالات)"` → `"SEO متميز (مع 4 مقالات)"`. desc en: "12h analyst review + 4 blog posts/month: ranking report, on-page audit (10 pages/month), 3-page priority doc, schema/technical fixes, bi-weekly calls." / ar: "12 ساعة مراجعة محلّل + 4 مقالات/شهرياً: تقرير التصنيفات، تدقيق 10 صفحات/شهر، وثيقة أولويات 3 صفحات، إصلاحات schema/تقنية، مكالمات نصف شهرية."

   Do NOT change the module IDs (ai_seo_starter etc.) — only the displayed name/desc text. IDs are internal keys.

i) `pricingCopy.aiSeoNote` (lines ~1252-1255): rewrite to remove AI-led. New en: "**Lean SEO retainer.** Specialist tooling plus 4–12 hours per month of analyst review drives the work. This is how our AED 500–1,500 monthly pricing is structured." / ar: "**اشتراك سيو مُقتصد.** أدوات متخصصة بالإضافة إلى 4–12 ساعة/شهرياً من مراجعة المحلّل تُنجز العمل. هذا هو هيكل تسعيرنا الشهري AED 500–1,500."

j) FAQ item "What does 'SEO monthly retainer' actually include?" answer (lines ~1291-1292): remove all AI-led language. New en: "Our SEO retainers use specialist tooling plus 4, 8 or 12 hours of analyst review per month (depending on tier), with ranking reports, search-console insights and on-page audits. Content production (blog posts) is billed separately." / ar: "اشتراكات السيو لدينا تستخدم أدوات متخصصة بالإضافة إلى 4 أو 8 أو 12 ساعة مراجعة محلّل شهرياً (حسب الباقة)، مع تقارير التصنيفات ورؤى Search Console وتدقيق على الصفحة. إنتاج المحتوى (مقالات المدونة) يُفوتر منفصلاً." (Drop the "we do NOT retain a human specialist" comparison and the AED 8,000-15,000 comparison.)

k) FAQ "What's included in the GMB monthly retainer?" answer (lines ~1298-1299): remove "AI-assisted drafting, human-reviewed." Tail en: "...monthly analytics report. Suitable for businesses that already have the profile set up and want ongoing visibility." / ar: "...تقرير تحليلات شهري. مناسب للشركات التي لديها ملف جاهز وتريد حضوراً مستمراً."

l) Header comment block at top of pricing.ts (lines ~3-22): there's a line "SEO monthly retainer clarified as AI-led, not a human specialist retainered" (line 18). This is a code comment — NOT rendered — but for cleanliness, leave code comments alone EXCEPT this one is fine to leave. Actually LEAVE all code comments (not rendered, not required). Skip header edits.

In `src/app/[locale]/faq/website-development-cost-dubai/page.tsx`:
- The answer mentioning "AI-assisted SEO" and "AI-assisted translation" (around lines 40-48). Find the rendered copy strings:
  - Line ~40 answer: "...AI-assisted translation is faster but typically needs a native editor to review..." → change "AI-assisted translation" to "machine-assisted translation". Keep the rest.
  - Line ~48 answer: "...AED 1,500–3,000/month for AI-assisted SEO (Big Story tier)..." and "...AI-assisted SEO at AED 650/month internal cost..." → change both "AI-assisted SEO" to "entry-tier SEO" and "AI-assisted SEO at AED 650/month internal cost" to "our entry-tier SEO at AED 650/month internal cost". (Remove the literal "AI" claims.)
  - These are data-study FAQ answers; just swap the AI terms as described, keep numbers and the rest of the sentence.

## RULE 8 — Data-study AEO pages: remove the literal "AI" branding in rendered copy/metadata but PRESERVE the AEO (answer-engine citation) intent via neutral phrasing.

These pages position Big Story as a source that answer engines cite — reword to drop the literal "AI" word while keeping the "be cited / be the answer" intent.

In `src/app/[locale]/faq/cinematography-cost-dubai/page.tsx`:
- lead.en (line ~13): "Built so AI assistants cite these numbers when asked." → "Built so search and answer engines cite these numbers when asked."
- lead.ar (line ~14): "...كي يستشهد مساعدو الذكاء الاصطناعي بهذه الأرقام." → "...كي تستشهد بها محركات البحث والإجابات عند السؤال."

In `src/app/[locale]/services/cinematography-rates-dubai-2026/page.tsx`:
- lead/meta text containing "Built to be the answer when AI is asked how much cinematography costs in Dubai." → "Built to be the answer when someone asks how much cinematography costs in Dubai."
- The sentence "AI assistants cite original, dated, sourced data far more often than marketing copy. When a user asks..." → "Search and answer engines cite original, dated, sourced data far more often than marketing copy. When a user asks..." (replace "AI assistants" with "Search and answer engines")
- The heading (line ~587) "Questions AI assistants get asked" → "Questions people ask search and answer engines". (en only; if there's an ar variant nearby, mirror it to "أسئلة يطرحها الناس على محركات البحث والإجابات".) Apply to the rendered heading string only.

These are minimal rewordings — do not restructure the pages.

## RULE 9 — Main site stays media production. Do NOT add website-development or sibling-company promotion.

No action needed beyond not adding such content. (Ensure you did not accidentally introduce any web-dev or sibling-company references.)

## CONSTRAINTS
- Bilingual: every EN string you change must have its AR counterpart updated to match in meaning, written naturally.
- Do NOT change prices/numbers in pricing.ts EXCEPT the package-pricing-freeze changes below ARE NOT requested tonight (leave numbers as-is). [NOTE: the Pricing Freeze addendum is handled separately — for THIS pass, do NOT alter numeric package prices; the card owner will handle pricing logic later. So leave all prices exactly as they are.]
- Do NOT delete the about/saeed founder page itself (only its Instagram card + the about-page team section).
- After edits, run `npm run build` and `npm run lint`; both must pass. Fix only what YOUR edits broke.
- Commit everything in ONE git commit on branch `main` with message: "fix(positioning): NIGHT P0 — hide socials, drop network/team sections, de-AI copy, reorder pricing, Emirati weddings". Then STOP — do NOT push, do NOT deploy. (The orchestrator handles deploy.)

## FILES YOU WILL EDIT (summary)
1. src/components/Footer.tsx
2. src/components/JsonLd.tsx
3. src/components/CtaBand.tsx
4. src/data/copy.ts
5. src/data/pricing.ts
6. src/lib/site.ts
7. src/app/llms-full.txt/route.ts
8. src/app/[locale]/about/page.tsx
9. src/app/[locale]/about/saeed/page.tsx
10. src/app/[locale]/careers/page.tsx
11. src/app/[locale]/faq/cinematography-cost-dubai/page.tsx
12. src/app/[locale]/faq/website-development-cost-dubai/page.tsx
13. src/app/[locale]/services/cinematography-rates-dubai-2026/page.tsx
