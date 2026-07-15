import type { Metadata } from "next";
import Link from "next/link";
import { type Locale, localizedPath, t } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { services } from "@/data/services";
import { servicesIndex as si, ui } from "@/data/copy";
import { Section, Eyebrow, Button } from "@/components/primitives";
import Reveal from "@/components/Reveal";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import Breadcrumbs from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbSchema, faqSchema, serviceSchema, articleSchema } from "@/components/JsonLd";
import { SITE, waLink } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return pageMeta({
    locale,
    title: isAr
      ? "سياسة مراجعة الصور | 3 خيارات قائمة + رصيد إعادة تصوير 30% | بيك ستوري"
      : "Photography Revision Policy | 3 List Options + 30% Reshoot Credit | Big Story",
    description: isAr
      ? "سياسة مراجعة الصور في بيك ستوري — الخيار C الهجين: 3 جولات قائمة على الاختيار + رصيد إعادة تصوير 30%. خيارات A و B متاحة أيضاً. بيانات 2026 وأمثلة."
      : "Big Story's photography revision policy — Option C hybrid: 3 list-based rounds + 30% reshoot credit. Options A and B also available. 2026 data and examples.",
    path: "/services/photography-revamp",
  });
}

const COPY = {
  eyebrow: { en: "Photography Revision Policy", ar: "سياسة مراجعة الصور" },
  h1: {
    en: "Photography Revision Policy — three options, hybrid default, transparent pricing",
    ar: "سياسة مراجعة الصور في بيك ستوري — ثلاثة خيارات، الخيار C هجين افتراضي، تسعير شفاف",
  },
  lead: {
    en: "Big Story's photography revision policy is built around three options: Option A (full reshoot, you pay for the day), Option B (open-ended revisions, you pay our hourly editor rate until happy), and Option C — the default — a hybrid of three list-based rounds plus a 30% reshoot credit if we missed something we should have caught. This page is the original 2026 reference for the policy: when each option applies, what counts as 'we missed it' vs 'you changed your mind', and how the reshoot credit is calculated and applied.",
    ar: "سياسة مراجعة الصور في بيك ستوري مبنية على ثلاثة خيارات: الخيار A (إعادة تصوير كاملة، تدفع يوم العمل)، الخيار B (مراجعات مفتوحة، تدفع سعر محررنا بالساعة حتى الرضا)، والخيار C — الافتراضي — هجين من ثلاث جولات قائمة على الاختيار بالإضافة لرصيد إعادة تصوير 30٪ إذا فاتنا شيء كان يجب أن نلتقطه. هذه الصفحة هي مرجع 2026 الأصلي للسياسة: متى ينطبق كل خيار، ما الذي يُحسب «فاتنا» مقابل «غيّرت رأيك»، وكيف يُحسب رصيد إعادة التصوير ويُطبق.",
  },
  statsHeading: { en: "Photography revisions by the numbers — 2026", ar: "مراجعات الصور بالأرقام — 2026" },
  statsBody: {
    en: "From Big Story's 2025–2026 photography delivery logs — how often Option C gets invoked, the average number of revision rounds per booking, and the reshoot credit redemption rate. All figures sourced from our own post-production ledger.",
    ar: "من سجلات تسليم الصور لدى بيك ستوري 2025–2026 — كم مرة يُستخدم الخيار C، متوسط عدد جولات المراجعة لكل حجز، ونسبة استرداد رصيد إعادة التصوير. كل الأرقام من سجل ما بعد الإنتاج لدينا.",
  },
  stat1: { en: "3 rounds", ar: "3 جولات" },
  stat1Label: { en: "List-based revisions included in every Option C photography booking", ar: "مراجعات قائمة على الاختيار مشمولة في كل حجز صور بالخيار C" },
  stat2: { en: "30%", ar: "30٪" },
  stat2Label: { en: "Reshoot credit applied when Big Story missed a shot we should have caught", ar: "رصيد إعادة تصوير يُطبق عندما تفوت بيك ستوري لقطة كان يجب التقاطها" },
  stat3: { en: "12%", ar: "12٪" },
  stat3Label: { en: "Photography bookings in 2025 that triggered any form of revision (down from 28% in 2023)", ar: "حجوزات الصور في 2025 التي تطلبت أي نوع من المراجعة (انخفاضاً من 28٪ في 2023)" },
  stat4: { en: "48 hrs", ar: "48 ساعة" },
  stat4Label: { en: "Standard turnaround per revision round (faster for clips, longer for full re-edit)", ar: "مدة التسليم القياسية لكل جولة مراجعة (أسرع للمقاطع، أطول لإعادة المونتاج الكاملة)" },
};

const faqItems = {
  en: [
    {
      q: "What are the three revision options?",
      a: "Option A — Full Reshoot. You pay for the shoot day again (same crew, same kit, same locations). Best when the original shoot missed the brief at a structural level (wrong venue, wrong talent, wrong concept). Option B — Open-Ended Revisions. We re-edit the existing footage at our hourly editor rate (AED 350/hr, 1-hour minimum) until you are happy. Best when the brief was right but the cut doesn't land. Option C — Hybrid (default). Three list-based rounds included in the booking fee, plus a 30% reshoot credit if Big Story missed something we should have caught. Best for most jobs — keeps the cost predictable and the timeline tight.",
    },
    {
      q: "What counts as 'we missed it' vs 'you changed your mind'?",
      a: "We missed it: a key person not in any photo (best man, mother of the bride, the cake, the rings, the first dance). A scene that was on the shot list but no photo exists. A technical defect (out of focus, motion blur, exposure clipped) on a hero shot. You changed your mind: you want a different edit style. You want a different colour grade. You decide you want black-and-white instead of colour. You want extra retouching on faces. The distinction matters because Option C covers 'we missed it' via the 30% credit; 'you changed your mind' is on you at the editor hourly rate.",
    },
    {
      q: "How does the 30% reshoot credit work?",
      a: "If we agree a shot was missed on our side, you receive a 30% credit on the original shoot fee, redeemable against a partial reshoot day. Example: you booked a full-day wedding at AED 6,000. We missed the cake-cutting photo. The reshoot credit is AED 1,800 (30% of 6,000). We come back for a half-day reshoot (typically AED 3,000–4,000 for a half-day), you pay the difference, we deliver the missing shots. The credit must be redeemed within 6 months of the original shoot date and applies only to a single reshoot booking.",
    },
    {
      q: "What does a 'list-based round' look like?",
      a: "You send us a numbered list of changes — 'shot 247 is out of focus, please re-edit from shot 252 onwards', 'shot 312 has a lamp post growing out of his head, can you crop tighter', 'shot 89 needs skin retouching on the bride's face'. Our editor works through the list top to bottom and sends back a new delivery within 48 hours. Most rounds contain 5–15 individual changes. The list keeps revisions focused and fast — open-ended feedback ('the whole album feels off') is Option B territory.",
    },
    {
      q: "Can I switch from Option C to Option B mid-project?",
      a: "Yes. After the three list-based rounds, you can switch to Option B (open-ended edits at AED 350/hr) for any further changes. The three rounds from Option C are already used — they don't roll over or get refunded. Switching is usually a sign that the brief and the deliverable are misaligned, and we'll do a 30-minute call with you at no charge to realign before continuing.",
    },
    {
      q: "What about retouching — is skin retouching included?",
      a: "Standard retouching (exposure, white balance, crop, basic colour grade) is included in every booking. Premium retouching (skin smoothing, body shaping, object removal from backgrounds, teeth whitening, hair retouching) is an add-on at AED 80 per image, billed per image. We quote the retouching count up front once you've seen the first delivery and flagged which images need premium work.",
    },
    {
      q: "Does the policy apply to all photography services?",
      a: "Yes — weddings, events, brand shoots, products, real estate. The 30% reshoot credit and the three rounds apply across all services. One exception: high-volume product shoots (50+ SKUs in a single booking) where the brief is the SKU list itself — in that case Option A or B is the default because the 'missed it' definition doesn't apply (you told us what to shoot, we shot it).",
    },
  ],
  ar: [
    {
      q: "ما هي خيارات المراجعة الثلاثة؟",
      a: "الخيار A — إعادة تصوير كاملة. تدفع يوم التصوير مرة أخرى (نفس الطاقم، نفس العدة، نفس المواقع). الأفضل عندما فات التصوير الأصلي الإيجاز على مستوى هيكلي (موقع خاطئ، موهبة خاطئة، مفهوم خاطئ). الخيار B — مراجعات مفتوحة. نعيد مونتاج اللقطات الموجودة بسعر محررنا بالساعة (350 درهم/ساعة، الحد الأدنى ساعة) حتى رضاك. الأفضل عندما كان الإيجاز صحيحاً لكن المونتاج لم يصل. الخيار C — هجين (افتراضي). ثلاث جولات قائمة على الاختيار مشمولة في رسوم الحجز، بالإضافة لرصيد إعادة تصوير 30٪ إذا فات بيك ستوري شيء كان يجب التقاطه. الأفضل لمعظم الأعمال — يحافظ على التكلفة متوقعة والجدول الزمني محكماً.",
    },
    {
      q: "ما الذي يُحسب «فاتنا» مقابل «غيّرت رأيك»؟",
      a: "فاتنا: شخص رئيسي غير موجود في أي صورة (صديق العريس، أم العروس، الكيكة، الخواتم، الرقصة الأولى). مشهد كان في قائمة اللقطات لكن لا توجد صورة له. عيب تقني (خارج التركيز، ضبابية حركة، تعرض مقصوص) على لقطة رئيسية. غيّرت رأيك: تريد أسلوب مونتاج مختلف. تريد تدرج ألوان مختلف. قررت تريد أبيض وأسود بدلاً من ألوان. تريد تنقيح إضافي على الوجوه. التمييز مهم لأن الخيار C يغطي «فاتنا» عبر رصيد 30٪؛ «غيّرت رأيك» على حسابك بسعر المحرر بالساعة.",
    },
    {
      q: "كيف يعمل رصيد إعادة التصوير 30٪؟",
      a: "إذا اتفقنا أن لقطة فُقدت من جانبنا، تحصل على رصيد 30٪ من رسوم التصوير الأصلية، يُسترد مقابل يوم إعادة تصوير جزئي. مثال: حجزت يوم زفاف كامل بـ 6,000 درهم. فاتتنا صورة قطع الكيك. رصيد إعادة التصوير 1,800 درهم (30٪ من 6,000). نعود لإعادة تصوير نصف يوم (عادة 3,000–4,000 درهم لنصف يوم)، تدفع الفرق، نسلم اللقطات المفقودة. يجب استرداد الرصيد خلال 6 أشهر من تاريخ التصوير الأصلي وينطبق فقط على حجز إعادة تصوير واحد.",
    },
    {
      q: "كيف تبدو «جولة قائمة على الاختيار»؟",
      a: "ترسل لنا قائمة مرقمة بالتغييرات — «اللقطة 247 خارج التركيز، يرجى إعادة المونتاج من اللقطة 252»، «اللقطة 312 بها عمود إنارة يخرج من رأسه، هل يمكن اقتصاص أضيق»، «اللقطة 89 تحتاج تنقيح بشرة على وجه العروس». محررنا يعمل في القائمة من الأعلى للأسفل ويرسل تسليم جديد خلال 48 ساعة. معظم الجولات تحتوي 5–15 تغييراً فردياً. القائمة تحافظ على المراجعات مركزة وسريعة — الملاحظات المفتوحة («الألبوم كامل لا يبدو صحيحاً») هي منطقة الخيار B.",
    },
    {
      q: "هل يمكنني التبديل من الخيار C إلى الخيار B في منتصف المشروع؟",
      a: "نعم. بعد الجولات القائمة الثلاث، يمكنك التبديل إلى الخيار B (مراجعات مفتوحة بـ 350 درهم/ساعة) لأي تغييرات إضافية. الجولات الثلاث من الخيار C مستخدمة بالفعل — لا تنتقل أو تُسترد. التبديل عادة علامة على أن الإيجاز والمخرج غير متطابقين، وسنجري مكالمة 30 دقيقة معك مجاناً لإعادة التوافق قبل المتابعة.",
    },
    {
      q: "ماذا عن التنقيح — هل تنقيح البشرة مشمول؟",
      a: "التنقيح القياسي (تعرض، توازن أبيض، اقتصاص، تدرج ألوان أساسي) مشمول في كل حجز. التنقيح المتميز (تنعيم بشرة، تنحيف جسم، إزالة أشياء من خلفيات، تبييض أسنان، تنقيح شعر) إضافة بـ 80 درهم للصورة، تُحسب لكل صورة. نُقتبس عدد صور التنقيح مقدماً بمجرد أن تشاهد التسليم الأول وتحدد أي صور تحتاج عملاً متميزاً.",
    },
    {
      q: "هل تنطبق السياسة على جميع خدمات التصوير الفوتوغرافي؟",
      a: "نعم — الزفاف، الفعاليات، تصوير العلامات، المنتجات، العقارات. رصيد إعادة التصوير 30٪ والجولات الثلاث تنطبق عبر جميع الخدمات. استثناء واحد: تصوير المنتجات عالي الحجم (50+ منتج في حجز واحد) حيث الإيجاز هو قائمة المنتجات نفسها — في تلك الحالة الخيار A أو B هو الافتراضي لأن تعريف «فاتنا» لا ينطبق (أخبرتنا بما نُصوره، صورناه).",
    },
  ],
};

const relatedServices = services.filter((s) =>
  ["weddings", "cinematic-wedding", "product-videos", "brand-films"].includes(s.slug)
);

export default async function PhotographyRevampPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const path = "/services/photography-revamp";
  const url = `${SITE.domain}${localizedPath(locale, path)}`;
  const isAr = locale === "ar";

  const itemFaqs = isAr ? faqItems.ar : faqItems.en;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(locale, [
            { name: t(ui.breadcrumb.home, locale), path: "/" },
            { name: t(ui.nav.services, locale), path: "/services" },
            { name: t(COPY.h1, locale), path },
          ]),
          articleSchema({
            locale,
            headline: t(COPY.h1, locale),
            description: t(COPY.lead, locale),
            path,
            image: `${SITE.domain}/opengraph-image`,
            datePublished: "2026-07-15",
            authorName: "Big Story Editorial",
          }),
          serviceSchema({
            locale,
            name: isAr ? "سياسة مراجعة الصور" : "Photography Revision Policy",
            description: isAr
              ? "سياسة مراجعة الصور في بيك ستوري — الخيار C الهجين الافتراضي، 3 جولات قائمة، رصيد إعادة تصوير 30٪."
              : "Big Story photography revision policy — Option C hybrid default, 3 list rounds, 30% reshoot credit.",
            path,
            areaServed: ["Dubai", "Abu Dhabi", "Sharjah"],
          }),
          faqSchema(itemFaqs),
        ]}
      />

      <Section>
        <Breadcrumbs
          locale={locale}
          items={[
            { name: t(ui.breadcrumb.home, locale), path: "/" },
            { name: t(ui.nav.services, locale), path: "/services" },
            { name: t(COPY.h1, locale) },
          ]}
        />
        <Reveal>
          <Eyebrow>{t(COPY.eyebrow, locale)}</Eyebrow>
          <h1 className="mt-6 max-w-5xl text-[clamp(2.4rem,5.5vw,4rem)] leading-[1.05]">{t(COPY.h1, locale)}</h1>
          <p className="bs-lead mt-8 !max-w-3xl">{t(COPY.lead, locale)}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a href={waLink(isAr ? "مهتم بسياسة مراجعة الصور في بيك ستوري." : "Interested in Big Story's photography revision policy.")} target="_blank" rel="noopener noreferrer" className="bs-btn bs-btn-gold">
              {t(ui.nav.startYourProject, locale)}
            </a>
            <Button href={localizedPath(locale, "/services/weddings")} variant="ghost">
              {isAr ? "صفحة الزفاف الرئيسية" : "Weddings page"}
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* ORIGINAL DATA */}
      <Section alt>
        <Reveal>
          <Eyebrow>{t(COPY.statsHeading, locale)}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">{t(COPY.statsHeading, locale)}</h2>
          <p className="bs-lead mt-6 !max-w-3xl">{t(COPY.statsBody, locale)}</p>
        </Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-[color:var(--color-line)] sm:grid-cols-2 lg:grid-cols-4">
          <div className="bs-card !rounded-none flex flex-col justify-between bg-white p-8">
            <p className="bs-num">{t(COPY.stat1, locale)}</p>
            <p className="mt-4 text-sm text-[color:var(--color-muted)]">{t(COPY.stat1Label, locale)}</p>
          </div>
          <div className="bs-card !rounded-none flex flex-col justify-between bg-white p-8">
            <p className="bs-num">{t(COPY.stat2, locale)}</p>
            <p className="mt-4 text-sm text-[color:var(--color-muted)]">{t(COPY.stat2Label, locale)}</p>
          </div>
          <div className="bs-card !rounded-none flex flex-col justify-between bg-white p-8">
            <p className="bs-num">{t(COPY.stat3, locale)}</p>
            <p className="mt-4 text-sm text-[color:var(--color-muted)]">{t(COPY.stat3Label, locale)}</p>
          </div>
          <div className="bs-card !rounded-none flex flex-col justify-between bg-white p-8">
            <p className="bs-num">{t(COPY.stat4, locale)}</p>
            <p className="mt-4 text-sm text-[color:var(--color-muted)]">{t(COPY.stat4Label, locale)}</p>
          </div>
        </div>
      </Section>

      {/* THREE OPTIONS COMPARED */}
      <Section>
        <Reveal>
          <Eyebrow>{isAr ? "الخيارات الثلاثة" : "The three options"}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr ? "A: إعادة كاملة · B: مفتوح · C: هجين (افتراضي)" : "A: Full reshoot · B: Open-ended · C: Hybrid (default)"}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              tag: isAr ? "الخيار A · إعادة تصوير كاملة" : "Option A · Full reshoot",
              title: isAr ? "نعيد التصوير من الصفر" : "We re-shoot from scratch",
              blurb: isAr
                ? "تدفع يوم العمل مرة أخرى (نفس الطاقم، نفس العدة). الأفضل عندما فات التصوير الإيجاز على مستوى هيكلي — موقع خاطئ، موهبة خاطئة، مفهوم خاطئ."
                : "You pay the shoot day again (same crew, same kit). Best when the original shoot missed the brief at a structural level — wrong venue, wrong talent, wrong concept. No internal editor fees.",
            },
            {
              tag: isAr ? "الخيار B · مراجعات مفتوحة" : "Option B · Open-ended revisions",
              title: isAr ? "محرر بالساعة حتى الرضا" : "Hourly editor until happy",
              blurb: isAr
                ? "إعادة مونتاج اللقطات الموجودة بساعة 350 درهم، الحد الأدنى ساعة. الأفضل عندما كان الإيجاز صحيحاً لكن المونتاج لم يصل. لا يوجد سقف للمراجعات."
                : "Re-edit existing footage at AED 350/hr, 1-hour minimum. Best when the brief was right but the cut didn't land. No cap on revisions — pay until satisfied.",
            },
            {
              tag: isAr ? "الخيار C · هجين (افتراضي)" : "Option C · Hybrid (default)",
              title: isAr ? "3 جولات + رصيد 30٪" : "3 rounds + 30% reshoot credit",
              blurb: isAr
                ? "ثلاث جولات قائمة على الاختيار مشمولة + رصيد إعادة تصوير 30٪ إذا فاتنا لقطة كنا يجب أن نلتقطها. الأفضل لمعظم الحجوزات — تكلفة متوقعة ووقت محدد."
                : "Three list-based rounds included + 30% reshoot credit if we missed a shot we should have caught. Best for most bookings — predictable cost, tight timeline. The default in every contract.",
            },
          ].map((c, i) => (
            <Reveal as="div" key={i} delay={i * 60} className="bs-card bs-card-hover">
              <span className="bs-eyebrow !text-[color:var(--color-muted)] before:!bg-[color:var(--color-muted)]">{c.tag}</span>
              <h3 className="mt-4 text-xl">{c.title}</h3>
              <p className="mt-3 text-sm text-[color:var(--color-muted)]">{c.blurb}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* WHEN EACH OPTION APPLIES */}
      <Section alt>
        <div className="grid gap-12 md:grid-cols-2 md:items-start">
          <Reveal>
            <Eyebrow>{isAr ? "متى ينطبق كل خيار" : "When each option applies"}</Eyebrow>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
              {isAr
                ? "الخط الفاصل بين «فاتنا» و«غيّرت رأيك»"
                : "The line between 'we missed it' and 'you changed your mind'"}
            </h2>
          </Reveal>
          <Reveal delay={80} className="bs-prose">
            {isAr ? (
              <>
                <p>
                  <strong>فاتنا (يستحق رصيد 30٪):</strong> شخص رئيسي غير موجود في أي صورة. مشهد على قائمة اللقطات لكن لا توجد صورة له. عيب تقني (خارج التركيز، ضبابية، تعرض مقصوص) على لقطة رئيسية. خطأ في التكوين حيث الموضوع الرئيسي غير مرئي.
                </p>
                <p>
                  <strong>غيّرت رأيك (مشمول في جولات C أو بساعة B):</strong> تريد أسلوب مونتاج مختلف. تريد تدرج ألوان مختلف. تريد أبيض وأسود بدلاً من ألوان. تريد تنقيح بشرة إضافي. تريد اقتصاص أو تأطير مختلف لأسباب جمالية. تريد لمسة نهائية مختلفة.
                </p>
                <p>
                  القاعدة العملية: إذا كانت اللقطة موجودة في التسليم لكنها لا تبدو كما تريد، فهي مراجعة. إذا كانت اللقطة غير موجودة في التسليم وكانت يجب أن تكون موجودة، فهي «فاتنا». الفرق مهم لتحديد ما إذا كان رصيد إعادة التصوير 30٪ ينطبق.
                </p>
              </>
            ) : (
              <>
                <p>
                  <strong>We missed it (eligible for 30% credit):</strong> a key person not in any photo. a scene that was on the shot list but no photo exists. a technical defect (out of focus, motion blur, exposure clipped) on a hero shot. a composition error where the main subject is not visible.
                </p>
                <p>
                  <strong>You changed your mind (covered by Option C rounds or Option B hourly):</strong> you want a different edit style. you want a different colour grade. you want black-and-white instead of colour. you want extra skin retouching. you want a different crop or framing for aesthetic reasons. you want a different final look.
                </p>
                <p>
                  The practical rule: if the shot exists in the delivery but doesn't look how you wanted, it's a revision. If the shot doesn't exist in the delivery and should have, that's "we missed it." The distinction matters for whether the 30% reshoot credit applies.
                </p>
              </>
            )}
          </Reveal>
        </div>
      </Section>

      {/* REVISION WORKFLOW */}
      <Section>
        <Reveal>
          <Eyebrow>{isAr ? "سير عمل المراجعة" : "The revision workflow"}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr ? "من الجولة الأولى إلى التسليم النهائي" : "From first round to final delivery"}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              n: "01",
              h: isAr ? "التسليم الأول" : "First delivery",
              b: isAr
                ? "نرسل رابط المعرض الإلكتروني خلال 48–72 ساعة من التصوير. معرض صديق للجوال مع جميع الصور المعدلة (400–800 للزفاف، 50–150 للعلامة، 30–80 للمنتجات)."
                : "We send the proofing gallery link within 48–72 hours of the shoot. Mobile-friendly gallery with all edited images (400–800 for weddings, 50–150 for brand, 30–80 for products).",
            },
            {
              n: "02",
              h: isAr ? "الجولة 1: القائمة الأولى" : "Round 1: First list",
              b: isAr
                ? "ترسل قائمة مرقمة بالتغييرات خلال 7 أيام. محررنا يعمل خلال 48 ساعة. متوسط 5–15 تغيير فردي لكل جولة."
                : "You send a numbered list of changes within 7 days. Our editor works through it within 48 hours. Average 5–15 individual changes per round.",
            },
            {
              n: "03",
              h: isAr ? "الجولة 2 و 3" : "Round 2 and 3",
              b: isAr
                ? "نفس سير العمل — قائمة جديدة، 48 ساعة، تسليم جديد. إذا كنت راضياً بعد الجولة 2، الجولة 3 تبقى متاحة عند الحاجة."
                : "Same workflow — new list, 48 hours, new delivery. If you're happy after Round 2, Round 3 stays available if needed (no need to use all three).",
            },
            {
              n: "04",
              h: isAr ? "تسليم الأرشيف النهائي" : "Final archive delivery",
              b: isAr
                ? "بعد الجولة الأخيرة، نرسل أرشيف كامل: صور عالية الدقة (JPG، 300dpi)، نسخة ويب محسّنة (RGB، 72dpi)، وألبوم مطبوع إذا تم حجزه."
                : "After the final round, we send a complete archive: high-resolution images (JPG, 300dpi), web-optimised versions (RGB, 72dpi), and the printed album if booked.",
            },
            {
              n: "05",
              h: isAr ? "رصيد إعادة التصوير (إذا انطبق)" : "Reshoot credit (if applicable)",
              b: isAr
                ? "إذا حددنا أن لقطة فُقدت من جانبنا، تحصل على رصيد 30٪ يُسترد خلال 6 أشهر مقابل يوم إعادة تصوير جزئي."
                : "If we agree a shot was missed on our side, you receive a 30% credit redeemable within 6 months against a partial reshoot day.",
            },
            {
              n: "06",
              h: isAr ? "تنقيح متميز (اختياري)" : "Premium retouching (optional)",
              b: isAr
                ? "تنقيح البشرة، تنحيف الجسم، إزالة أشياء من خلفيات، تبييض أسنان — 80 درهم لكل صورة. نُقتبس العدد مقدماً بعد الجولة الأولى."
                : "Skin retouching, body shaping, object removal, teeth whitening — AED 80 per image. We quote the count up front after Round 1.",
            },
          ].map((card, i) => (
            <Reveal key={i} delay={i * 60} className="bs-card">
              <p className="bs-eyebrow">{card.n}</p>
              <h3 className="mt-4 text-xl">{card.h}</h3>
              <p className="mt-3 text-sm text-[color:var(--color-muted)]">{card.b}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section alt>
        <Reveal>
          <Eyebrow>{t(si.detail.faqs, locale)}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr ? "أسئلة متكررة عن سياسة المراجعة" : "FAQ — Photography Revision Policy"}
          </h2>
        </Reveal>
        <div className="mt-10">
          <Faq items={itemFaqs} />
        </div>
      </Section>

      {/* RELATED SERVICES */}
      <Section>
        <Reveal>
          <Eyebrow>{t(ui.breadcrumb.home, locale)}</Eyebrow>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {relatedServices.map((s, i) => (
            <Reveal as="div" key={s.slug} delay={i * 70}>
              <Link href={localizedPath(locale, `/services/${s.slug}`)} className="bs-card bs-card-hover block h-full">
                <span className="bs-eyebrow !text-[color:var(--color-muted)] before:!bg-[color:var(--color-muted)]">{t(s.eyebrow, locale)}</span>
                <h3 className="mt-4 text-lg">{t(s.name, locale)}</h3>
                <p className="mt-3 text-sm text-[color:var(--color-muted)]">{t(s.description, locale)}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        locale={locale}
        heading={isAr ? "لديك أسئلة عن سياسة المراجعة؟" : "Questions about the revision policy?"}
        waContext={isAr ? "بخصوص سياسة مراجعة الصور في بيك ستوري." : "Re: photography revision policy at Big Story."}
      />
    </>
  );
}
