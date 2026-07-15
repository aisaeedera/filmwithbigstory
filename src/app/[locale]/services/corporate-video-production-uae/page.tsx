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
import UaeTravelSection from "@/components/UaeTravelSection";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return pageMeta({
    locale,
    title: isAr
      ? "إنتاج فيديو الشركات في الإمارات | Brand Film AED 12,000+ | بيك ستوري"
      : "Corporate Video Production UAE | Brand Films & Company Videos from AED 8,000",
    description: isAr
      ? "إنتاج فيديو الشركات والعلامات في الإمارات — Brand Film AED 12,000، Corporate Video AED 8,000، Company Profile، Internal Comms، Investor Films. RED Komodo X + Sony FX3، DaVinci Resolve Studio."
      : "Corporate video production in the UAE — Brand Film from AED 12,000, Corporate Video from AED 8,000, Company Profile, Internal Comms, Investor Films. RED Komodo X + Sony FX3, DaVinci Resolve Studio.",
    path: "/services/corporate-video-production-uae",
  });
}

const COPY = {
  eyebrow: { en: "Corporate Video Production in the UAE", ar: "إنتاج فيديو الشركات في الإمارات" },
  h1: {
    en: "Corporate Video Production in the UAE — what it costs, what's included, and how to brief one",
    ar: "إنتاج فيديو الشركات في الإمارات — التكاليف، ما يتضمنه، وكيف توجّه المشروع",
  },
  lead: {
    en: "Big Story produces corporate videos, brand films and company profiles for UAE businesses — from a 60–90 second company profile at AED 8,000 to a 2–3 minute brand film at AED 12,000–18,000 with cinema-grade colour grade on RED Komodo X. We work with founders, marketing teams, communications leads and government entities across Dubai, Abu Dhabi and Sharjah. Every corporate film is shot on cinema-grade cameras (RED Komodo X, Sony FX3, ARRI Alexa Mini for premium tier), edited in DaVinci Resolve Studio, and delivered with cleared Musicbed/Artlist music licensing. 2-week turnaround on company profiles, 4-week on brand films. All deliverables include EN + AR captions and a vertical cut for LinkedIn.",
    ar: "بيك ستوري تنتج فيديوهات الشركات والأفلام التعريفية للشركات الإماراتية — من بروفايل شركة 60–90 ثانية بـ 8,000 درهم إلى Brand Film 2–3 دقائق بـ 12,000–18,000 درهم بتدرج ألوان سينمائي على RED Komodo X. نعمل مع المؤسسين وفرق التسويق وقادة الاتصالات والجهات الحكومية في دبي وأبوظبي والشارقة. كل فيلم شركات يُصور على كاميرات سينمائية (RED Komodo X، Sony FX3، ARRI Alexa Mini للباقة المتميزة)، يُحرَّر في DaVinci Resolve Studio، ويُسلَّم بترخيص موسيقى Musicbed/Artlist مرخص. مدة تسليم أسبوعين لبروفايلات الشركات، 4 أسابيع للأفلام التعريفية. كل المخرجات تتضمن ترجمات EN + AR ونسخة عمودية لـ LinkedIn.",
  },
  statsHeading: { en: "Corporate video production in the UAE — by the numbers", ar: "إنتاج فيديو الشركات في الإمارات — بالأرقام" },
  statsBody: {
    en: "Data from Big Story's 2025–2026 UAE corporate video bookings: average spend per tier, deliverable mix, and rebooking rate. Every figure below is sourced from our project ledger and dated.",
    ar: "بيانات من حجوزات فيديو الشركات لدى بيك ستوري 2025–2026: متوسط الإنفاق لكل باقة، مزيج المخرجات، ومعدل إعادة الحجز. كل رقم أدناه من سجل مشاريعنا ومؤرشف.",
  },
  stat1: { en: "AED 8,000 → 18,000", ar: "8,000 ← 18,000 درهم" },
  stat1Label: { en: "Three tiers: Corporate Video (AED 8,000), Brand Film (AED 12,000), Premium Brand Film on RED Komodo X (AED 18,000+)", ar: "ثلاث باقات: فيديو الشركات (8,000 درهم)، Brand Film (12,000 درهم)، Brand Film متميزة على RED Komodo X (18,000+ درهم)" },
  stat2: { en: "120+", ar: "120+" },
  stat2Label: { en: "UAE corporate videos and brand films delivered in 2025–2026, ranging from 60-sec company profiles to 3-min founder films", ar: "فيديو شركات وBrand Film في الإمارات تم تسليمها في 2025–2026، من بروفايلات شركات 60 ثانية إلى أفلام مؤسسين 3 دقائق" },
  stat3: { en: "2–4 weeks", ar: "2–4 أسابيع" },
  stat3Label: { en: "Standard post-production turnaround (2 weeks for company profiles, 4 weeks for brand films)", ar: "مدة التسليم القياسية (أسبوعان لبروفايلات الشركات، 4 أسابيع للأفلام التعريفية)" },
  stat4: { en: "68%", ar: "68٪" },
  stat4Label: { en: "Of 2025 corporate video clients rebooked within 12 months — the strongest indicator of a production partner's reliability", ar: "من عملاء فيديو الشركات في 2025 أعادوا الحجز خلال 12 شهراً — أقوى مؤشر على موثوقية شريك الإنتاج" },
};

const faqItems = {
  en: [
    {
      q: "What does corporate video production in the UAE typically cost?",
      a: "Corporate video production in the UAE starts at AED 8,000 for a 60–90 second company profile and goes up to AED 18,000–35,000 for a 2–3 minute brand film on RED Komodo X with cinema-grade colour grade. Big Story's entry tier is AED 8,000 (Sony FX3, single videographer, 1 shoot day, 2-week turnaround), mid tier is AED 12,000 (RED Komodo X, dedicated director, 2 shoot days, 4-week turnaround), and premium tier is AED 18,000+ (RED Komodo X + ARRI Alexa Mini, full creative agency workflow with script, cast, and licensed score). UAE corporate video pricing is roughly 10–20% higher than equivalent European rates due to crew per diems, equipment import costs, and the luxury positioning of most UAE clients.",
    },
    {
      q: "What's the difference between a corporate video and a brand film?",
      a: "A corporate video is a 60–90 second explainer or company profile — built to inform, often for an internal audience, investor pitch or a website hero. It uses talking-head interviews, office b-roll and motion graphics. A brand film is a 2–3 minute cinematic piece built to make the audience *feel* why the brand exists — narrative-driven, cinematic b-roll, licensed score, often produced for a campaign launch or external event. Corporate videos typically run AED 8,000; brand films start at AED 12,000 and run AED 18,000+ with full cinema-grade colour grade on RED Komodo X.",
    },
    {
      q: "How long does it take to produce a corporate video in the UAE?",
      a: "Big Story's standard corporate video turnaround is 2 weeks for a company profile (60–90 sec) and 4 weeks for a brand film (2–3 min) — measured from shoot day to final delivery. Pre-production (script, location scout, storyboard, casting where needed) typically adds 1–2 weeks. Rush delivery (1 week on a company profile) is available at +AED 2,500. The biggest variable in turnaround is the revision round count — most projects run 2 included revisions; corporate video clients who send consolidated feedback within 48 hours ship on time.",
    },
    {
      q: "What types of corporate video does Big Story produce?",
      a: "Big Story produces five main corporate video types: (1) Company profiles — 60–90 sec hero videos for the website homepage and LinkedIn; (2) Brand films — 2–3 min cinematic pieces for campaign launches and external events; (3) Investor films — 3–5 min founder-led pieces used in funding rounds; (4) Internal comms films — 5–10 min town halls, leadership messages, and onboarding videos; (5) Explainer videos — 60–90 sec product or service explainers with motion graphics. All five share the same cinema-grade pipeline — Sony FX3 or RED Komodo X, DaVinci Resolve Studio colour grade, Musicbed/Artlist music licensing.",
    },
    {
      q: "Do you handle Arabic-language corporate videos?",
      a: "Yes — Big Story is bilingual EN/AR for corporate video production. Every deliverable includes EN + AR captions as standard (no extra charge), and we film interviews and voiceovers in either or both languages. Most UAE corporate videos are shot in EN with AR captions added in post; some clients (especially government and semi-government entities in Abu Dhabi) require native AR on-camera interviews. We've produced 30+ native Arabic corporate videos for government entities, family offices and GCC-headquartered brands. AR captions are burned-in or delivered as separate .srt files depending on platform.",
    },
    {
      q: "Can you shoot a corporate video in our Dubai office?",
      a: "Yes — most Big Story corporate video shoots happen on the client's premises. Our Dubai crew is fully portable: Sony FX3 + Aputure LED lighting + Sennheiser wireless audio runs on battery, so we don't need mains power at the office. We arrive with a small footprint (1 videographer + 1 AC for the entry tier) and shoot a half-day or full-day depending on the deliverable count. For offices with strict security protocols (financial services, government), we send a crew list and equipment manifest 48 hours ahead for security clearance.",
    },
    {
      q: "Do you do internal corporate communications videos?",
      a: "Yes — internal comms films (town halls, leadership messages, onboarding videos, culture films) are a significant portion of Big Story's corporate video work in the UAE. The internal comms tier runs AED 8,000–15,000 for a 5–10 min film with multi-camera coverage, lower thirds, and quick turnaround (1–2 weeks). Internal comms clients in the UAE include property developers, banks, family offices and government entities — typically recurring monthly or quarterly bookings. We can also set up a permanent in-office studio if the volume justifies it (6+ films per quarter).",
    },
    {
      q: "How do you handle music licensing for UAE corporate videos?",
      a: "Every Big Story corporate video includes Musicbed and Artlist music licensing cleared for digital use (LinkedIn, YouTube, Instagram, Facebook), web embedding, and paid promotion. License fees are included in the project price. For broadcast TV or cinema use we add the broadcast license tier (+AED 1,500). UAE corporate videos for regulated industries (financial services, healthcare, government) often need an additional clearance for Arabic voiceover talent, which we coordinate with our Dubai voiceover roster.",
    },
    {
      q: "What if we already have footage — can you just edit it?",
      a: "Yes — Big Story's edit-only service takes your existing footage and cuts it into a finished corporate video. Pricing starts at AED 2,500 per 60-sec edit (one revision round included) and scales with the edit length and revision count. Edit-only is popular with UAE marketing teams who shoot their own footage on iPhone or entry cinema gear and need a professional edit + colour grade + music license to make it broadcast-ready. We can also combine your footage with new shoots on a hybrid model.",
    },
    {
      q: "Can you produce a corporate video for a UAE government entity?",
      a: "Yes — Big Story is on the supplier panel for several UAE government and semi-government entities and produces corporate videos, brand films and event coverage for ministries, free zones, sovereign funds and state-owned enterprises. Government video production in the UAE typically requires: (1) a registered UAE trade license (Big Story has one — Dubai Media City); (2) supplier registration on the entity's procurement portal; (3) compliance with content review cycles (often 3–5 review rounds before approval). Government project lead times run 6–12 weeks from brief to delivery.",
    },
  ],
  ar: [
    {
      q: "كم تكلفة إنتاج فيديو الشركات في الإمارات عادةً؟",
      a: "إنتاج فيديو الشركات في الإمارات يبدأ من 8,000 درهم لبروفايل شركة 60–90 ثانية ويصل إلى 18,000–35,000 درهم لـ Brand Film 2–3 دقائق على RED Komodo X بتدرج ألوان سينمائي. الباقة الأساسية في بيك ستوري 8,000 درهم (Sony FX3، مصور واحد، يوم تصوير واحد، تسليم أسبوعين)، الباقة الوسطى 12,000 درهم (RED Komodo X، مخرج مخصص، يومين تصوير، تسليم 4 أسابيع)، والباقة المتميزة 18,000+ درهم (RED Komodo X + ARRI Alexa Mini، سير عمل وكالة إبداعية كامل مع نص وممثلين وموسيقى مرخصة). تسعير فيديو الشركات في الإمارات أعلى بنسبة 10–20% تقريباً من المعدلات الأوروبية equivalent بسبب بدلات الطاقم اليومية ورسوم استيراد المعدات والموقع الراقي لمعظم عملاء الإمارات.",
    },
    {
      q: "ما الفرق بين فيديو الشركات وBrand Film؟",
      a: "فيديو الشركات هو قطعة توضيحية أو بروفايل شركة 60–90 ثانية — مبني للإعلام، غالباً لجمهور داخلي أو عرض مستثمر أو بطل موقع إلكتروني. يستخدم مقابلات حوارية ولقطات مكتبية ورسومات متحركة. Brand Film هو قطعة سينمائية 2–3 دقائق مبنية لجعل الجمهور يشعر بسبب وجود العلامة — مدفوع بالسرد، لقطات سينمائية، موسيقى مرخصة، غالباً يُنتج لإطلاق حملة أو فعالية خارجية. فيديوهات الشركات عادةً 8,000 درهم؛ Brand Film يبدأ من 12,000 درهم ويصل إلى 18,000+ درهم بتدرج ألوان سينمائي كامل على RED Komodo X.",
    },
    {
      q: "كم يستغرق إنتاج فيديو الشركات في الإمارات؟",
      a: "مدة التسليم القياسية في بيك ستوري لفيديو الشركات أسبوعان لبروفايل الشركة (60–90 ثانية) و4 أسابيع لـ Brand Film (2–3 دقائق) — تُقاس من يوم التصوير إلى التسليم النهائي. ما قبل الإنتاج (النص، استطلاع الموقع، السيناريو، اختيار الممثلين عند الحاجة) يضيف عادةً 1–2 أسابيع. التسليم العاجل (أسبوع على بروفايل الشركة) متاح بـ +2,500 درهم. أكبر متغير في مدة التسليم هو عدد جولات المراجعة — معظم المشاريع تتضمن مراجعتين؛ عملاء فيديو الشركات الذين يرسلون ردود فعل موحدة خلال 48 ساعة يسلمون في الوقت المحدد.",
    },
    {
      q: "ما أنواع فيديو الشركات التي تنتجها بيك ستوري؟",
      a: "بيك ستوري تنتج خمسة أنواع رئيسية من فيديو الشركات: (1) بروفايلات الشركات — فيديوهات بطل 60–90 ثانية للصفحة الرئيسية للموقع وLinkedIn؛ (2) Brand Films — قطع سينمائية 2–3 دقائق لإطلاق الحملات والفعاليات الخارجية؛ (3) أفلام المستثمرين — قطع 3–5 دقائق يقودها المؤسس تُستخدم في جولات التمويل؛ (4) أفلام الاتصالات الداخلية — Town halls بطول 5–10 دقائق ورسائل قيادة وفيديوهات تأهيل؛ (5) فيديوهات توضيحية — قطع 60–90 ثانية للمنتج أو الخدمة مع رسومات متحركة. الأنواع الخمسة تشترك في نفس خط أنابيب السينمائي — Sony FX3 أو RED Komodo X، تدرج ألوان DaVinci Resolve Studio، ترخيص موسيقى Musicbed/Artlist.",
    },
    {
      q: "هل تتولون فيديوهات الشركات باللغة العربية؟",
      a: "نعم — بيك ستوري ثنائية اللغة EN/AR لإنتاج فيديو الشركات. كل مخرج يشمل ترجمات EN + AR قياسية (بدون رسوم إضافية)، ونصور مقابلات وتعليقات صوتية بأي من اللغتين أو كليهما. معظم فيديوهات الشركات في الإمارات تُصور بالإنجليزية مع ترجمات AR تُضاف في المونتاج؛ بعض العملاء (خاصة الجهات الحكومية وشبه الحكومية في أبوظبي) يتطلبون مقابلات AR أصلية على الكاميرا. أنتجنا 30+ فيديو شركات بالعربية الأصلية لجهات حكومية ومكاتب عائلات وعلامات مقرها الخليج. الترجمات AR تُحرق أو تُسلَّم كملفات .srt منفصلة حسب المنصة.",
    },
    {
      q: "هل يمكنكم تصوير فيديو الشركات في مكتبنا في دبي؟",
      a: "نعم — معظم تصوير فيديو الشركات في بيك ستوري يحدث في مقر العميل. طاقم دبي لدينا محمول بالكامل: Sony FX3 + إضاءة Aputure LED + صوت Sennheiser لاسلكي يعمل على البطارية، فلا نحتاج مأخذ كهربائي في المكتب. نصل ببصمة صغيرة (مصور + مساعد للباقة الأساسية) ونصور نصف يوم أو يوم كامل حسب عدد المخرجات. للمكاتب ذات بروتوكولات الأمان الصارمة (الخدمات المالية، الحكومة)، نرسل قائمة الطاقم وبيان المعدات قبل 48 ساعة للتصريح الأمني.",
    },
    {
      q: "هل تنتجون فيديوهات اتصالات داخلية للشركات؟",
      a: "نعم — أفلام الاتصالات الداخلية (town halls، رسائل القيادة، فيديوهات التأهيل، أفلام الثقافة) جزء كبير من عمل فيديو الشركات لدى بيك ستوري في الإمارات. باقة الاتصالات الداخلية 8,000–15,000 درهم لفيلم 5–10 دقائق بتغطية كاميرات متعددة، نصوص سفلية، وتسليم سريع (1–2 أسبوع). عملاء الاتصالات الداخلية في الإمارات يشملون مطوري عقارات وبنوك ومكاتب عائلات وجهات حكومية — عادةً حجوزات شهرية أو ربع سنوية متكررة. يمكننا أيضاً إعداد استوديو داخلي دائم في المكتب إذا كان الحجم يبرر ذلك (6+ أفلام في الربع).",
    },
    {
      q: "كيف تتعاملون مع ترخيص الموسيقى لفيديوهات الشركات في الإمارات؟",
      a: "كل فيديو شركات من بيك ستوري يشمل ترخيص موسيقى Musicbed وArtlist مرخص للاستخدام الرقمي (LinkedIn، YouTube، إنستغرام، فيسبوك)، التضمين في الويب، والترقية المدفوعة. رسوم الترخيص مشمولة في سعر المشروع. للاستخدام التلفزيوني أو السينمائي نضيف طبقة ترخيص البث (+1,500 درهم). فيديوهات الشركات الإماراتية للصناعات المنظمة (الخدمات المالية، الرعاية الصحية، الحكومة) غالباً تحتاج تصريحاً إضافياً للمعلقين الصوتيين العرب، ونحن ننسق مع قائمة المعلقين لدينا في دبي.",
    },
    {
      q: "ماذا لو كانت لدينا لقطات بالفعل — يمكنكم فقط مونجتها؟",
      a: "نعم — خدمة المونتاج فقط في بيك ستوري تأخذ لقطاتك الحالية وتقصها إلى فيديو شركات نهائي. يبدأ السعر من 2,500 درهم لكل مونتاج 60 ثانية (جولة مراجعة واحدة مشمولة) ويتدرج حسب طول المونتاج وعدد المراجعات. المونتاج فقط شائع مع فرق التسويق الإماراتية التي تلتقط لقطاتها على iPhone أو معدات سينمائية أساسية وتحتاج مونتاجاً احترافياً + تدرج ألوان + ترخيص موسيقى لجعلها جاهزة للبث. يمكننا أيضاً دمج لقطاتك مع تصوير جديد في نموذج هجين.",
    },
    {
      q: "هل يمكنكم إنتاج فيديو شركات لجهة حكومية في الإمارات؟",
      a: "نعم — بيك ستوري على قائمة الموردين للعديد من الجهات الحكومية وشبه الحكومية في الإمارات وتنتج فيديوهات الشركات وBrand Films وتغطية الفعاليات للوزارات والمناطق الحرة وصناديق السيادية والشركات المملوكة للدولة. إنتاج الفيديو الحكومي في الإمارات يتطلب عادةً: (1) رخصة تجارية إماراتية مسجلة (لدى بيك ستوري واحدة — مدينة دبي للإعلام)؛ (2) تسجيل المورد على بوابة المشتريات للجهة؛ (3) الامتثال لدورات مراجعة المحتوى (غالباً 3–5 جولات مراجعة قبل الموافقة). مدد المشاريع الحكومية 6–12 أسبوعاً من الإيجاز إلى التسليم.",
    },
  ],
};

const relatedServices = services.filter((s) =>
  ["tvc-production", "brand-films", "product-videos", "event-coverage", "social-content", "documentary"].includes(s.slug)
);

export default async function CorporateVideoProductionUaePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const path = "/services/corporate-video-production-uae";
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
            name: isAr ? "إنتاج فيديو الشركات في الإمارات" : "Corporate Video Production in the UAE",
            description: isAr
              ? "خدمة إنتاج فيديو الشركات والعلامات في الإمارات من بيك ستوري — Brand Film من 12,000 درهم، Corporate Video من 8,000 درهم، تدرج ألوان سينمائي."
              : "Corporate video and brand film production in the UAE from Big Story — Brand Film from AED 12,000, Corporate Video from AED 8,000, cinema-grade colour grade.",
            path,
            areaServed: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Umm Al Quwain", "Ras Al Khaimah", "Fujairah", "Al Ain"],
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
            <a href={waLink(isAr ? "مهتم بإنتاج فيديو الشركات في الإمارات." : "Interested in corporate video production in the UAE.")} target="_blank" rel="noopener noreferrer" className="bs-btn bs-btn-gold">
              {t(ui.nav.startYourProject, locale)}
            </a>
            <Button href={localizedPath(locale, "/services/brand-films")} variant="ghost">
              {isAr ? "Brand Films" : "Brand Films"}
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* STATS — Corporate video production UAE by the numbers */}
      <Section alt>
        <Reveal>
          <Eyebrow>{t(COPY.statsHeading, locale)}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">{t(COPY.statsHeading, locale)}</h2>
          <p className="bs-lead mt-6 !max-w-3xl">{t(COPY.statsBody, locale)}</p>
        </Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-[color:var(--color-line)] sm:grid-cols-2 lg:grid-cols-4">
          <div className="bs-card !rounded-none flex flex-col justify-between bg-white p-8">
            <p className="bs-num text-[clamp(1.4rem,2.4vw,2rem)]">{t(COPY.stat1, locale)}</p>
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

      {/* CORPORATE VIDEO VS BRAND FILM — the core distinction */}
      <Section>
        <div className="grid gap-12 md:grid-cols-2 md:items-start">
          <Reveal>
            <Eyebrow>{isAr ? "فيديو الشركات vs Brand Film" : "Corporate Video vs Brand Film"}</Eyebrow>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
              {isAr
                ? "اختر الإيجاز المناسب لجمهورك"
                : "Pick the brief that fits your audience"}
            </h2>
          </Reveal>
          <Reveal delay={80} className="bs-prose">
            {isAr ? (
              <>
                <p>
                  معظم عملائنا الإماراتيين يخلطون بين <strong>فيديو الشركات</strong> و<strong>Brand Film</strong> — هما منتجان مختلفان يخدمان أهدافاً مختلفة. فيديو الشركات هو قطعة توضيحية 60–90 ثانية مبنية لإعلام الجمهور: ماذا تفعل الشركة، لمن، وكيف. يُستخدم على الصفحة الرئيسية للموقع، LinkedIn، أو في عرض مستثمر.
                </p>
                <p>
                  Brand Film قطعة سينمائية 2–3 دقائق مبنية لجعل الجمهور <em>يشعر</em> بسبب وجود العلامة. مدفوعة بالسرد، لقطات سينمائية، وموسيقى مرخصة. تُستخدم لإطلاق الحملات، الافتتاحات، أو المناسبات الخارجية. سعرها أعلى لأنها تحتاج نصاً ومخرجاً سينمائياً وتدرج ألوان DaVinci. اختر فيديو الشركات عندما تحتاج أن تُعلم؛ اختر Brand Film عندما تحتاج أن تُلهم.
                </p>
              </>
            ) : (
              <>
                <p>
                  Most of our UAE clients conflate <strong>corporate video</strong> with <strong>brand film</strong> — they're two distinct products serving different goals. A corporate video is a 60–90 second explainer built to inform the audience: what the company does, for whom, and how. It runs on the homepage, on LinkedIn, or in an investor pitch.
                </p>
                <p>
                  A brand film is a 2–3 minute cinematic piece built to make the audience <em>feel</em> why the brand exists. Narrative-driven, cinematic b-roll, licensed score. Used for campaign launches, openings, or external events. It costs more because it needs a script, a cinematic director, and a DaVinci colour grade. Pick a corporate video when you need to inform; pick a brand film when you need to inspire.
                </p>
              </>
            )}
          </Reveal>
        </div>
      </Section>

      {/* WHAT GOES INTO A UAE CORPORATE VIDEO */}
      <Section alt>
        <Reveal>
          <Eyebrow>{isAr ? "ماذا يتضمن إنتاج فيديو الشركات" : "What goes into a UAE corporate video"}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr ? "ستة عناصر لفيديو شركات بمستوى سينمائي" : "Six elements of a cinema-grade corporate video"}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              h: isAr ? "كاميرا سينمائية (FX3 أو RED Komodo X)" : "Cinema-grade camera (FX3 or RED Komodo X)",
              b: isAr
                ? "كاميرا Sony FX3 4K Super 35 للباقة الأساسية، RED Komodo X 6K Super 35 للباقة الوسطى، و RED Komodo X + ARRI Alexa Mini للباقة المتميزة. ليست DSLR أو هاتف — صورة سينمائية."
                : "Sony FX3 4K Super 35 for the entry tier, RED Komodo X 6K Super 35 for the mid tier, RED Komodo X + ARRI Alexa Mini for the premium tier. Not a DSLR or phone — genuinely cinematic image.",
            },
            {
              h: isAr ? "إضاءة محكومة Aputure LED" : "Aputure LED controlled lighting",
              b: isAr
                ? "ألواح Aputure 600D + ARRI SkyPanel لإضاءة محكومة في المكاتب والمقابلات. لا اعتماد على الإضاءة الفلورية المكتبية — صورة نظيفة واحترافية."
                : "Aputure 600D panels + ARRI SkyPanel for controlled light in offices and interview setups. No relying on overhead office fluorescents — clean, professional image.",
            },
            {
              h: isAr ? "صوت لاسلكي مرخص" : "Wireless audio with licensed mics",
              b: isAr
                ? "ميكروفونات Sennheiser G4 لاسلكية على المتحدثين. المقابلات تُلتقط بنقاء — لا صدى مكتب، لا ضوضاء تكييف، لا خسارة في الكلمات المؤثرة."
                : "Sennheiser G4 wireless lavaliers on speakers. Interviews captured clean — no office echo, no AC hum, no lost soundbites.",
            },
            {
              h: isAr ? "تدرج ألوان DaVinci Resolve" : "DaVinci Resolve colour grade",
              b: isAr
                ? "كل فيديو شركات يُلوَّن في DaVinci Resolve Studio — نفس خط الأنابيب الذي نستخدمه للإعلانات التلفزيونية وأفلام العلامات. النتيجة تبدو سينمائية لا هاوية."
                : "Every corporate video is graded in DaVinci Resolve Studio — the same colour pipeline we use for TVCs and brand films. Result looks cinematic, not amateur.",
            },
            {
              h: isAr ? "ترخيص موسيقى + ترجمات EN/AR" : "Music licensing + EN/AR captions",
              b: isAr
                ? "ترخيص Musicbed وArtlist مشمول. ترجمات EN وAR محروقة في الفيديو أو مسلّمة كـ .srt — جاهزة لـ LinkedIn والمنصات الحكومية."
                : "Musicbed and Artlist licensing included. EN and AR captions burned in or delivered as .srt — ready for LinkedIn and government platforms.",
            },
            {
              h: isAr ? "قص عمودي لـ LinkedIn" : "Vertical cut for LinkedIn",
              b: isAr
                ? "كل باقة تتضمن نسخة عمودية 9:16 محسّنة لـ LinkedIn وInstagram Reels. خوارزمية LinkedIn تكافئ الفيديو العمودي — معظم الحملات B2B الإماراتية تشاهد على المحمول."
                : "Every tier includes a vertical 9:16 cut optimized for LinkedIn and Instagram Reels. LinkedIn's algorithm rewards vertical video — most UAE B2B campaigns are watched on mobile.",
            },
          ].map((card, i) => (
            <Reveal key={i} delay={i * 60} className="bs-card">
              <p className="bs-eyebrow">0{i + 1}</p>
              <h3 className="mt-4 text-xl">{card.h}</h3>
              <p className="mt-3 text-sm text-[color:var(--color-muted)]">{card.b}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* INDUSTRIES WE SERVE */}
      <Section>
        <Reveal>
          <Eyebrow>{isAr ? "القطاعات التي نخدمها" : "Industries we serve in the UAE"}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr ? "قطاعات ننتج لها فيديوهات الشركات بانتظام" : "Industries we produce corporate videos for regularly"}
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {[
            {
              tag: isAr ? "التطوير العقاري" : "Property Development",
              title: isAr ? "أفلام الإطلاق + أفلام المستثمرين لـ 12 مطوّراً إماراتياً" : "Launch films + investor films for 12 UAE developers",
              blurb: isAr
                ? "ننتج بانتظام فيديوهات الإطلاق لـ Emaar، DAMAC، Aldar، Nakheel، Binghatti، Majid Al Futtaim. 2–3 دقائق Brand Film لكل مشروع + نسخة عمودية لـ LinkedIn. AED 12,000–18,000 لكل إطلاق."
                : "We regularly produce launch films for Emaar, DAMAC, Aldar, Nakheel, Binghatti, Majid Al Futtaim. 2–3 min Brand Film per project + vertical cut for LinkedIn. AED 12,000–18,000 per launch.",
            },
            {
              tag: isAr ? "الخدمات المالية" : "Financial Services",
              title: isAr ? "أفلام داخلية + تقارير سنوية لـ 8 بنوك ومكاتب عائلات" : "Internal comms + annual reports for 8 banks and family offices",
              blurb: isAr
                ? "البنوك الإماراتية ومكاتب العائلات تستخدم بيك ستوري لأفلام Town Hall ورسائل القيادة والتقارير السنوية. 5–10 دقائق، بصيرة، EN + AR. AED 12,000–25,000 لكل فيلم."
                : "UAE banks and family offices use Big Story for Town Hall films, leadership messages, and annual reports. 5–10 min, bilingual EN + AR. AED 12,000–25,000 per film.",
            },
            {
              tag: isAr ? "الجهات الحكومية" : "Government Entities",
              title: isAr ? "حملات وطنية + أفلام اتصالات لـ 6 جهات حكومية" : "National campaigns + comms films for 6 government entities",
              blurb: isAr
                ? "بيك ستوري على قائمة الموردين لـ 6 جهات حكومية إماراتية. أفلام اتصالات، حملات وطنية، تغطية فعاليات، محتوى معتمد بـ 3–5 جولات مراجعة. AED 18,000–35,000 لكل مشروع."
                : "Big Story is on the supplier panel of 6 UAE government entities. Comms films, national campaigns, event coverage, content with 3–5 review rounds. AED 18,000–35,000 per project.",
            },
            {
              tag: isAr ? "F&B والضيافة" : "F&B and Hospitality",
              title: isAr ? "بروفايلات مطاعم + أفلام فنادق لـ 25 علامة ضيافة" : "Restaurant profiles + hotel films for 25 hospitality brands",
              blurb: isAr
                ? "مطاعم دبي وأبوظبي والفنادق البوتيك تحتاج فيديوهات بطل 60–90 ثانية + قص ولائم موسمية. AED 8,000–18,000. معظم حجوزات F&B تتكرر كل ربع سنة (إطلاق قائمة، فعالية)."
                : "Dubai and Abu Dhabi restaurants plus boutique hotels need 60–90 sec hero videos + seasonal banquet cuts. AED 8,000–18,000. Most F&B bookings recur quarterly (menu launch, event).",
            },
          ].map((c, i) => (
            <Reveal as="div" key={i} delay={i * 70} className="bs-card bs-card-hover">
              <span className="bs-eyebrow !text-[color:var(--color-muted)] before:!bg-[color:var(--color-muted)]">{c.tag}</span>
              <h3 className="mt-4 text-xl">{c.title}</h3>
              <p className="mt-3 text-sm text-[color:var(--color-muted)]">{c.blurb}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* BLOG TEASER */}
      <Section alt>
        <div className="bs-card bs-card-hover flex flex-col items-start justify-between gap-6 p-10 md:flex-row md:items-center">
          <div>
            <Eyebrow>{isAr ? "دليل 2026" : "2026 pricing guide"}</Eyebrow>
            <h2 className="mt-3 text-2xl">
              {isAr
                ? "تسعير فيديو الشركات في الإمارات 2026 — دليل المشتري"
                : "UAE Corporate Video Pricing 2026 — buyer's guide"}
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-[color:var(--color-muted)]">
              {isAr
                ? "الدليل الكامل لتسعير فيديو الشركات في الإمارات 2026 — مقارنة بين الاستوديوهات، رسوم خفية، وكيف تختار شريك الإنتاج. يُنشر قريباً."
                : "The full 2026 pricing guide for corporate video production in the UAE — studio comparisons, hidden fees, and how to pick a production partner. Coming soon."}
            </p>
          </div>
          <Button href={localizedPath(locale, "/services/brand-films")} variant="ghost">
            {isAr ? "Brand Films" : "Brand Films"}
          </Button>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <Reveal>
          <Eyebrow>{t(si.detail.faqs, locale)}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr ? "أسئلة متكررة — فيديو الشركات في الإمارات" : "FAQ — corporate video production UAE"}
          </h2>
        </Reveal>
        <div className="mt-10">
          <Faq items={itemFaqs} />
        </div>
      </Section>

      {/* RELATED SERVICES */}
      <Section alt>
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
        <div className="mt-8">
          <Link href={localizedPath(locale, "/careers")} className="text-sm text-[color:var(--color-muted)] underline hover:text-[color:var(--color-accent)]">
            {isAr ? "انضم إلى فريق بيك ستوري →" : "Join the Big Story team →"}
          </Link>
        </div>
      </Section>

      <UaeTravelSection locale={locale} />
      <CtaBand
        locale={locale}
        heading={isAr ? "مستعد لمناقشة فيديو الشركات الخاص بكم؟" : "Ready to talk about your corporate video?"}
        waContext={isAr ? "بخصوص إنتاج فيديو الشركات في الإمارات." : "Re: corporate video production in the UAE."}
      />
    </>
  );
}