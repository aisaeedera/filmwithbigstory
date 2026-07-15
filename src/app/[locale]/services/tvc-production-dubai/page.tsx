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
      ? "إنتاج الإعلانات التلفزيونية دبي | TVC AED 15,000+ | بيك ستوري"
      : "TVC Production Dubai | Broadcast-Ready Commercial from AED 15,000",
    description: isAr
      ? "إنتاج الإعلانات التلفزيونية والتجارية في دبي — TVC AED 15,000+، جاهز للبث والسوشيال. مفهوم، نص، ممثلون، تصوير سينمائي، مونتاج كامل. ARRI Alexa Mini + RED Komodo X."
      : "TVC and commercial production in Dubai — from AED 15,000, broadcast- and social-ready. Concept, script, cast, cinematic shoot, full post-production. ARRI Alexa Mini + RED Komodo X.",
    path: "/services/tvc-production-dubai",
  });
}

const COPY = {
  eyebrow: { en: "TVC Production in Dubai", ar: "إنتاج الإعلانات التلفزيونية في دبي" },
  h1: {
    en: "TVC Production Dubai — broadcast-ready commercials from AED 15,000, fully social-ready",
    ar: "إنتاج الإعلانات التلفزيونية في دبي — إعلانات جاهزة للبث من 15,000 درهم، جاهزة للسوشيال بالكامل",
  },
  lead: {
    en: "Big Story produces broadcast- and social-ready TVCs and commercials in Dubai — concept, script, casting, location, cinematic shoot, colour grade and music licensing delivered as one package. Starting from AED 15,000 for a 30-second social-first TVC, AED 35,000–55,000 for a full broadcast TVC with cast, and AED 80,000+ for a hero campaign film on ARRI Alexa Mini with full agency workflow. We work with media agencies (Starcom, Zenith, Havas), direct-to-brand marketing teams, and government entities across the UAE. Every TVC is shot on cinema-grade cameras (ARRI Alexa Mini, RED Komodo X, Sony Venice), graded in DaVinci Resolve Studio, and delivered with cleared Musicbed/Artlist music licensing + EN/AR voiceover options. 4–8 week turnaround from brief to broadcast master.",
    ar: "بيك ستوري تنتج الإعلانات التلفزيونية والتجارية الجاهزة للبث والسوشيال في دبي — مفهوم ونص واختيار ممثلين وموقع وتصوير سينمائي وتدرج ألوان وترخيص موسيقى تُسلَّم كحزمة واحدة. يبدأ من 15,000 درهم لـ TVC سوشيال أولاً 30 ثانية، 35,000–55,000 درهم لـ TVC بث كامل بممثلين، و80,000+ درهم لفيلم حملة بطل على ARRI Alexa Mini بسير عمل وكالة كامل. نعمل مع وكالات الإعلام (Starcom، Zenith، Havas)، فرق التسويق المباشر للعلامات، والجهات الحكومية في الإمارات. كل TVC يُصور على كاميرات سينمائية (ARRI Alexa Mini، RED Komodo X، Sony Venice)، يُلوَّن في DaVinci Resolve Studio، ويُسلَّم بترخيص موسيقى Musicbed/Artlist مرخص + خيارات تعليق صوتي EN/AR. مدة التسليم 4–8 أسابيع من الإيجاز إلى نسخة البث الرئيسية.",
  },
  statsHeading: { en: "TVC production in Dubai — by the numbers", ar: "إنتاج الإعلانات التلفزيونية في دبي — بالأرقام" },
  statsBody: {
    en: "Data from Big Story's 2025–2026 Dubai TVC deliveries: budget bands, broadcast channels cleared, and hero-campaign retention. Every figure below is sourced from our production ledger.",
    ar: "بيانات من تسليمات TVC بيك ستوري في دبي 2025–2026: نطاقات الميزانية، قنوات البث المخصصة، والاحتفاظ بحملات الأبطال. كل رقم أدناه من سجل الإنتاج لدينا.",
  },
  stat1: { en: "AED 15,000 → 80,000+", ar: "15,000 ← 80,000+ درهم" },
  stat1Label: { en: "Three TVC budget bands: social-first 30-sec (AED 15K+), broadcast TVC with cast (AED 35–55K), hero campaign on ARRI Alexa Mini (AED 80K+)", ar: "ثلاث نطاقات ميزانية TVC: سوشيال أولاً 30 ثانية (15K+ درهم)، بث بممثلين (35–55K)، حملة بطل على ARRI Alexa Mini (80K+ درهم)" },
  stat2: { en: "60+", ar: "60+" },
  stat2Label: { en: "Dubai TVCs and broadcast commercials delivered in 2025–2026, ranging from 15-sec social cuts to 60-sec hero films", ar: "TVC وإعلانات بث في دبي تم تسليمها في 2025–2026، من قص سوشيال 15 ثانية إلى أفلام أبطال 60 ثانية" },
  stat3: { en: "4–8 weeks", ar: "4–8 أسابيع" },
  stat3Label: { en: "Standard TVC turn-around from brief to broadcast master — pre-production included", ar: "مدة تسليم TVC القياسية من الإيجاز إلى نسخة البث الرئيسية — شاملة ما قبل الإنتاج" },
  stat4: { en: "92%", ar: "92٪" },
  stat4Label: { en: "Of Big Story Dubai TVC clients in 2025 cleared their commercial for both broadcast AND paid social (Meta, YouTube, TikTok)", ar: "من عملاء TVC بيك ستوري في دبي في 2025 حصلوا على تصريح لإعلاناتهم للبث والسوشيال المدفوع (Meta، YouTube، TikTok)" },
};

const faqItems = {
  en: [
    {
      q: "How much does TVC production cost in Dubai?",
      a: "TVC production in Dubai starts at AED 15,000 for a 30-second social-first commercial and runs AED 35,000–55,000 for a full broadcast TVC with cast, and AED 80,000+ for a hero campaign film on ARRI Alexa Mini with full agency workflow. Big Story's entry tier (AED 15,000) is a social-first TVC — 30 seconds, Sony FX3, single shoot day, 4-week turnaround, delivered in broadcast-safe 16:9 + 9:16 vertical cut. Mid-tier (AED 35,000–55,000) is a full broadcast TVC with professional cast, RED Komodo X, 2 shoot days, 6-week turnaround. Premium tier (AED 80,000+) is a hero campaign — ARRI Alexa Mini, full agency creative workflow, licensed music, EN + AR voiceover options, 8-week turnaround.",
    },
    {
      q: "What's the difference between a TVC and a brand film?",
      a: "A TVC (television commercial) is a 15, 30, or 60-second advertising piece built to run on broadcast TV (or paid social with the same broadcast specs). It's hard-sold, has a clear product/service message, ends with a CTA, and is cleared for paid media. A brand film is a 2–3 minute cinematic piece built to make the audience feel something — narrative-driven, cinematic, often without a hard CTA. Brand films live on YouTube, the brand's website, or social; TVCs live in paid media. A TVC is an ad; a brand film is a piece of cinema that happens to be for a brand.",
    },
    {
      q: "Do you handle casting for Dubai TVCs?",
      a: "Yes — Big Story runs a curated Dubai casting network of 80+ professional actors, models and lifestyle talent. Casting is included in the mid-tier and premium TVC packages (AED 35,000+) and adds AED 3,500–8,000 to the entry tier. Dubai casting typically covers UAE nationals, GCC residents, Levantine, South Asian, European and African talent — most major ethnicities are available in-market. We coordinate contracts, day rates and SAG-AFTRA equivalency paperwork through our casting partner. For premium hero campaigns we run dedicated casting sessions with a casting director in attendance.",
    },
    {
      q: "What's involved in TVC pre-production in Dubai?",
      a: "Big Story's TVC pre-production covers: (1) creative concept — 2–3 creative routes developed with the brand team; (2) script — 30, 60, or 90-second scripts with shot list; (3) storyboard — visual key frames for client approval; (4) location scout — Dubai-based locations plus international scout if needed; (5) casting — coordinated with our Dubai casting network; (6) production schedule — shoot day plan with contingency; (7) permits — Dubai Film & TV Commission permits for public locations. Pre-production typically takes 1–3 weeks and is included in the AED 15,000+ starting price.",
    },
    {
      q: "Can you deliver a TVC ready for both broadcast and social media?",
      a: "Yes — every Big Story Dubai TVC is delivered broadcast-ready and social-ready in a single package. The deliverables are: (1) broadcast master — ProRes 422 HQ, 1920×1080 or 3840×2160, broadcast-safe colours and audio levels; (2) social cut 16:9 — H.264 MP4, 1080p, optimized for YouTube, Facebook, LinkedIn; (3) social cut 9:16 — H.264 MP4, 1080×1920, optimized for Instagram Reels, TikTok, YouTube Shorts; (4) EN + AR voiceover versions where required. All cuts cleared for paid media (Meta, YouTube, TikTok ad approval).",
    },
    {
      q: "How do you handle music licensing for TVCs?",
      a: "Big Story includes Musicbed and Artlist music licensing for social media use in every TVC package. For broadcast TV use (Mena TV, MBC, Sky News Arabia, Dubai TV), we add the broadcast license tier (+AED 1,500–4,500 depending on territory). For premium hero campaigns we work with Dubai-based composers on a custom score (AED 8,000–18,000). Custom score is the right choice when the brand wants ownership of the music and unique audio branding — it's also more expensive than library music. Big Story's music supervisor handles all clearances and provides a deliverables memo with license certificates for each platform.",
    },
    {
      q: "What's the typical TVC production timeline in Dubai?",
      a: "Big Story's standard TVC production timeline is 4–8 weeks from brief to broadcast master: (1) pre-production (1–3 weeks) — concept, script, storyboard, casting, location, permits; (2) shoot (1–2 days for mid-tier, 2–3 days for premium); (3) post-production (2–4 weeks) — edit, colour grade, sound design, music, voiceover, EN/AR versions, captioning. Rush delivery (3 weeks on a 30-sec TVC) is available at +AED 4,500. Premium hero campaigns with international locations or celebrity cast can run 10–14 weeks.",
    },
    {
      q: "Do you work with media agencies on Dubai TVCs?",
      a: "Yes — Big Story is on the preferred supplier list of several Dubai-based media agencies (Starcom MENA, Zenith MENA, Havas Middle East, UM MENA) and produces TVCs as the production partner behind agency-led creative. Agency workflow typically adds: agency creative fees (separate from production); client approval cycles (3–5 rounds); media plan alignment (deliverable specs matched to the media buy). Agency retainers and project-based engagements are both supported. We sign agency NDAs and work within agency-supplied creative concepts, scripts and storyboards.",
    },
    {
      q: "Can you film a TVC outside Dubai?",
      a: "Yes — Big Story produces TVCs across the GCC (Saudi Arabia, Bahrain, Oman, Kuwait, Qatar) and internationally on request. International TVC production adds location crew costs, equipment carnet fees, and travel per diems. Recent international TVCs have been shot in Saudi Arabia (NEOM, Riyadh, Jeddah), London, Cape Town, and the Maldives. For multi-market TVCs, we typically shoot a master version + market-specific cut-downs for EN, AR, FR, and UR — handled by our in-house editors.",
    },
    {
      q: "Do you handle the broadcast clearance and ad approval?",
      a: "Yes — for TVCs airing on UAE broadcast (MBC, Dubai TV, Sharjah TV, Abu Dhabi TV), we coordinate with the National Media Council (NMC) for commercial clearance. UAE TV commercials need NMC pre-approval before airing — typically 5–10 working days. For paid social (Meta, TikTok, YouTube), we deliver specs that match each platform's ad policies; we don't run the ad campaigns ourselves but we coordinate with the media agency on ad creative approval. UAE TVC content for regulated industries (financial services, healthcare, alcohol-free categories) needs additional compliance review — we flag this in pre-production.",
    },
  ],
  ar: [
    {
      q: "كم تكلفة إنتاج TVC في دبي؟",
      a: "إنتاج TVC في دبي يبدأ من 15,000 درهم لإعلان سوشيال أولاً 30 ثانية ويصل إلى 35,000–55,000 درهم لـ TVC بث كامل بممثلين، و80,000+ درهم لفيلم حملة بطل على ARRI Alexa Mini بسير عمل وكالة كامل. الباقة الأساسية في بيك ستوري (15,000 درهم) TVC سوشيال أولاً — 30 ثانية، Sony FX3، يوم تصوير واحد، تسليم 4 أسابيع، يُسلَّم بـ 16:9 جاهز للبث + 9:16 عمودي. الباقة الوسطى (35,000–55,000 درهم) TVC بث كامل بممثلين محترفين، RED Komodo X، يومين تصوير، تسليم 6 أسابيع. الباقة المتميزة (80,000+ درهم) حملة بطل — ARRI Alexa Mini، سير عمل إبداعي وكالة كامل، موسيقى مرخصة، خيارات تعليق صوتي EN + AR، تسليم 8 أسابيع.",
    },
    {
      q: "ما الفرق بين TVC وBrand Film؟",
      a: "TVC (إعلان تلفزيوني) هو قطعة إعلانية 15 أو 30 أو 60 ثانية مبنية للبث على التلفزيون (أو السوشيال المدفوع بنفس مواصفات البث). بيع صريح، رسالة واضحة بمنتج/خدمة، ينتهي بـ CTA، ومرخص للإعلام المدفوع. Brand Film قطعة سينمائية 2–3 دقائق مبنية لجعل الجمهور يشعر بشيء — مدفوعة بالسرد، سينمائية، غالباً بدون CTA صريح. Brand Films تعيش على YouTube وموقع العلامة والسوشيال؛ TVCs تعيش في الإعلام المدفوع. TVC إعلان؛ Brand Film قطعة سينما تصادف أنها لعلامة.",
    },
    {
      q: "هل تتولون اختيار الممثلين لـ TVCs دبي؟",
      a: "نعم — بيك ستوري تدير شبكة اختيار ممثلين منظّمة في دبي تضم 80+ ممثل محترف وعارض وأسلوب حياة. اختيار الممثلين مشمول في باقات TVC الوسطى والمتميزة (35,000+ درهم) ويضيف 3,500–8,000 درهم للباقة الأساسية. اختيار الممثلين في دبي يغطي عادةً مواطني الإمارات والمقيمين الخليجيين والشام وجنوب آسيا وأوروبا وأفريقيا — معظم الأعراق الرئيسية متاحة في السوق. ننسق العقود والأجور اليومية وأوراق معادلة SAG-AFTRA عبر شريك الاختيار لدينا. للحملات البطلة المتميزة ندير جلسات اختيار مخصصة بحضور مخرج اختيار.",
    },
    {
      q: "ماذا يتضمن ما قبل إنتاج TVC في دبي؟",
      a: "ما قبل إنتاج TVC في بيك ستوري يغطي: (1) المفهوم الإبداعي — 2–3 مسارات إبداعية مطورة مع فريق العلامة؛ (2) النص — نصوص 30 أو 60 أو 90 ثانية مع قائمة لقطات؛ (3) السيناريو البصري — إطارات مرئية رئيسية لموافقة العميل؛ (4) استطلاع الموقع — مواقع داخل دبي إضافة لاستطلاع دولي إذا لزم؛ (5) اختيار الممثلين — منسق مع شبكة اختيار الممثلين لدينا في دبي؛ (6) جدول الإنتاج — خطة يوم التصوير مع احتياطيات؛ (7) التصاريح — تصاريح لجنة دبي للأفلام والتلفزيون للمواقع العامة. ما قبل الإنتاج يأخذ عادةً 1–3 أسابيع ومشمول في السعر الابتدائي 15,000+ درهم.",
    },
    {
      q: "هل يمكنكم تسليم TVC جاهز للبث والسوشيال معاً؟",
      a: "نعم — كل TVC من بيك ستوري في دبي يُسلَّم جاهزاً للبث والسوشيال في حزمة واحدة. المخرجات: (1) نسخة البث الرئيسية — ProRes 422 HQ، 1920×1080 أو 3840×2160، ألوان ومستويات صوت آمنة للبث؛ (2) نسخة سوشيال 16:9 — H.264 MP4، 1080p، محسّنة لـ YouTube وFacebook وLinkedIn؛ (3) نسخة سوشيال 9:16 — H.264 MP4، 1080×1920، محسّنة لـ Instagram Reels وTikTok وYouTube Shorts؛ (4) نسخ تعليق صوتي EN + AR حيثما طُلب. كل القصاصات مرخصة للإعلام المدفوع (موافقة Meta، YouTube، TikTok).",
    },
    {
      q: "كيف تتعاملون مع ترخيص الموسيقى لـ TVCs؟",
      a: "بيك ستوري تشمل ترخيص موسيقى Musicbed وArtlist للاستخدام على السوشيال في كل باقة TVC. لاستخدام البث التلفزيوني (MBC، Dubai TV، Sky News Arabia، إلخ)، نضيف طبقة ترخيص البث (+1,500–4,500 درهم حسب المنطقة). للحملات البطلة المتميزة نعمل مع ملحنين في دبي على موسيقى مخصصة (8,000–18,000 درهم). الموسيقى المخصصة هي الخيار الصحيح عندما تريد العلامة ملكية الصوت الفريد ووسم صوتي مميز — أغلى أيضاً من موسيقى المكتبة. مشرف الموسيقى لدينا يتعامل مع كل التصاريح ويوفر مذكرة مخرجات مع شهادات ترخيص لكل منصة.",
    },
    {
      q: "ما الجدول الزمني القياسي لإنتاج TVC في دبي؟",
      a: "الجدول الزمني القياسي لإنتاج TVC في بيك ستوري 4–8 أسابيع من الإيجاز إلى نسخة البث الرئيسية: (1) ما قبل الإنتاج (1–3 أسابيع) — مفهوم، نص، سيناريو بصري، اختيار ممثلين، موقع، تصاريح؛ (2) التصوير (1–2 يوم للباقة الوسطى، 2–3 أيام للمتميزة)؛ (3) ما بعد الإنتاج (2–4 أسابيع) — مونتاج، تدرج ألوان، تصميم صوت، موسيقى، تعليق صوتي، نسخ EN/AR، ترجمة. التسليم العاجل (3 أسابيع على TVC 30 ثانية) متاح بـ +4,500 درهم. الحملات البطلة المتميزة بمواقع دولية أو ممثلين مشاهير قد تأخذ 10–14 أسبوعاً.",
    },
    {
      q: "هل تعملون مع وكالات الإعلام على TVCs دبي؟",
      a: "نعم — بيك ستوري على قائمة الموردين المفضلين للعديد من وكالات الإعلام في دبي (Starcom MENA، Zenith MENA، Havas Middle East، UM MENA) وتنتج TVCs كشريك إنتاج خلف الإبداع الذي تقوده الوكالة. سير عمل الوكالة يضيف عادةً: رسوم إبداعية للوكالة (منفصلة عن الإنتاج)؛ دورات موافقة العميل (3–5 جولات)؛ مواءمة خطة الإعلام (مواصفات المخرجات مطابقة لشراء الإعلام). كلا من عقود الوكالة والمشاركات القائمة على المشاريع مدعومة. نوقع اتفاقيات عدم إفصاح مع الوكالة ونعمل ضمن المفاهيم الإبداعية والنصوص والسيناريوهات البصرية التي تقدمها الوكالة.",
    },
    {
      q: "هل يمكنكم تصوير TVC خارج دبي؟",
      a: "نعم — بيك ستوري تنتج TVCs عبر الخليج (السعودية، البحرين، عمان، الكويت، قطر) ودولياً عند الطلب. إنتاج TVC الدولي يضيف تكاليف طاقم الموقع ورسوم كارنيه المعدات وبدلات السفر. TVCs دولية حديثة صورت في السعودية (NEOM، الرياض، جدة)، لندن، كيب تاون، والمالديف. لـ TVCs متعددة الأسواق، نصور عادةً نسخة رئيسية + قص مختصرة خاصة بكل سوق لـ EN وAR وFR وUR — يتولاها محررونا الداخليون.",
    },
    {
      q: "هل تتولون تصريح البث وموافقة الإعلان؟",
      a: "نعم — لـ TVCs التي تبث على التلفزيون الإماراتي (MBC، Dubai TV، Sharjah TV، Abu Dhabi TV)، ننسق مع المجلس الوطني للإعلام (NMC) للحصول على تصريح تجاري. الإعلانات التلفزيونية الإماراتية تحتاج موافقة NMC مسبقة قبل البث — عادةً 5–10 أيام عمل. للإعلام المدفوع (Meta، TikTok، YouTube)، نسلّم مواصفات تطابق سياسات الإعلان لكل منصة؛ لا نشغل حملات الإعلان بأنفسنا لكننا ننسق مع وكالة الإعلام على موافقة الإعلان الإبداعي. محتوى TVC الإماراتي للصناعات المنظمة (الخدمات المالية، الرعاية الصحية، فئات خالية من الكحول) يحتاج مراجعة امتثال إضافية — نضع علامة على هذا في ما قبل الإنتاج.",
    },
  ],
};

const relatedServices = services.filter((s) =>
  ["brand-films", "corporate-video-production", "product-videos", "social-content", "event-coverage"].includes(s.slug)
);

export default async function TvcProductionDubaiPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const path = "/services/tvc-production-dubai";
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
            name: isAr ? "إنتاج الإعلانات التلفزيونية في دبي" : "TVC Production Dubai",
            description: isAr
              ? "خدمة إنتاج الإعلانات التلفزيونية والتجارية في دبي من بيك ستوري — TVC جاهز للبث والسوشيال من 15,000 درهم. ARRI Alexa Mini + RED Komodo X."
              : "TVC and broadcast commercial production in Dubai from Big Story — broadcast- and social-ready TVC from AED 15,000. ARRI Alexa Mini + RED Komodo X.",
            path,
            areaServed: ["Dubai", "Abu Dhabi", "Sharjah", "Riyadh", "Doha"],
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
            <a href={waLink(isAr ? "مهتم بإنتاج إعلان تلفزيوني في دبي." : "Interested in TVC production in Dubai.")} target="_blank" rel="noopener noreferrer" className="bs-btn bs-btn-gold">
              {t(ui.nav.startYourProject, locale)}
            </a>
            <Button href={localizedPath(locale, "/services/brand-films")} variant="ghost">
              {isAr ? "Brand Films" : "Brand Films"}
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* STATS */}
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

      {/* WHAT MAKES A BROADCAST-READY TVC */}
      <Section>
        <div className="grid gap-12 md:grid-cols-2 md:items-start">
          <Reveal>
            <Eyebrow>{isAr ? "ما الذي يجعل TVC جاهزاً للبث" : "What makes a broadcast-ready TVC"}</Eyebrow>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
              {isAr
                ? "البث والسوشيال يحتاجان أكثر من مجرد تصوير جيد"
                : "Broadcast and social demand more than just a good shoot"}
            </h2>
          </Reveal>
          <Reveal delay={80} className="bs-prose">
            {isAr ? (
              <>
                <p>
                  TVC جاهز للبث يختلف جوهرياً عن مقطع الفيديو العادي. يجب أن يلتزم بمواصفات البث (ProRes 422 HQ أو H.264 عالي المعدل)، ومستويات صوت آمنة للبث (LUFS -23 لـ EBU R128)، وإطار آمن، ومسح ألوان ضمن مساحة Rec.709. معظم استوديوهات الفيديو في دبي لا تلتزم بهذه المواصفات — والنتيجة إعلانات تُرفض من Meta أو YouTube أو MBC.
                </p>
                <p>
                  بيك ستوري تُسلِّم TVCs بالمواصفات الصحيحة من البداية. كل إعلان يأتي مع: (1) نسخة بث رئيسية ProRes 422 HQ؛ (2) نسخة سوشيال 16:9 MP4؛ (3) نسخة سوشيال 9:16 MP4 لـ Reels وTikTok وShorts؛ (4) ترخيص موسيقى مُصدَّق لـ Meta وYouTube وTikTok؛ (5) ترجمات EN و AR. جاهز للبث التلفزيوني والسوشيال المدفوع في حزمة واحدة.
                </p>
              </>
            ) : (
              <>
                <p>
                  A broadcast-ready TVC is materially different from a regular video clip. It must conform to broadcast specs (ProRes 422 HQ or high-bitrate H.264), broadcast-safe audio levels (LUFS -23 for EBU R128), safe frame, and Rec.709 colour space. Most video studios in Dubai don't comply with these specs — the result is ads rejected by Meta, YouTube, or MBC.
                </p>
                <p>
                  Big Story delivers TVCs to spec from the start. Every commercial comes with: (1) broadcast master ProRes 422 HQ; (2) 16:9 social MP4; (3) 9:16 social MP4 for Reels, TikTok, Shorts; (4) cleared music license for Meta, YouTube, TikTok; (5) EN + AR captions. Ready for broadcast TV and paid social in one package.
                </p>
              </>
            )}
          </Reveal>
        </div>
      </Section>

      {/* TVC PRODUCTION TIERS */}
      <Section alt>
        <Reveal>
          <Eyebrow>{isAr ? "باقات إنتاج TVC" : "TVC production tiers"}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr ? "ثلاث باقات TVC حسب الميزانية والجمهور" : "Three TVC tiers by budget and audience"}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {[
            {
              tag: isAr ? "الباقة 1 · سوشيال أولاً" : "Tier 1 · Social-First TVC",
              title: isAr ? "TVC سوشيال أولاً 30 ثانية — AED 15,000+" : "30-sec social-first TVC — AED 15,000+",
              lines: isAr
                ? ["Sony FX3 سينمائية + إضاءة Aputure LED", "طاقم 2 (مصور + مساعد)", "نص + اختيار ممثلين من شبكتنا", "يوم تصوير واحد، تسليم 4 أسابيع", "نسخ 16:9 + 9:16، ترخيص Meta"]
                : ["Sony FX3 cinema + Aputure LED lighting", "Crew of 2 (videographer + AC)", "Script + casting from our Dubai network", "1 shoot day, 4-week turnaround", "16:9 + 9:16 cuts, Meta-cleared"],
            },
            {
              tag: isAr ? "الباقة 2 · بث كامل" : "Tier 2 · Full Broadcast TVC",
              title: isAr ? "TVC بث كامل بممثلين — AED 35,000→55,000" : "Full broadcast TVC with cast — AED 35,000→55,000",
              lines: isAr
                ? ["RED Komodo X سينمائية 6K Super 35", "طاقم 5 (مخرج + 2 مصورين + 2 مساعدين)", "نص كامل + اختيار ممثلين محترفين", "يومين تصوير، تسليم 6 أسابيع", "نسخ بث + سوشيال، ترخيص MBC + Meta + YouTube"]
                : ["RED Komodo X 6K Super 35 cinema-grade", "Crew of 5 (director + 2 cinematographers + 2 ACs)", "Full script + professional casting", "2 shoot days, 6-week turnaround", "Broadcast + social cuts, MBC + Meta + YouTube cleared"],
            },
            {
              tag: isAr ? "الباقة 3 · حملة بطل" : "Tier 3 · Hero Campaign",
              title: isAr ? "فيلم حملة بطل — AED 80,000+" : "Hero campaign film — AED 80,000+",
              lines: isAr
                ? ["ARRI Alexa Mini (نفس كاميرا Netflix)", "طاقم 11 (مخرج، DOP، منتج، مساعدين)", "سير عمل وكالة كامل (مفهوم، نص، قصة)", "3 أيام تصوير، تسليم 8 أسابيع", "موسيقى مخصصة، تعليق صوتي EN + AR، ترخيص NMC"]
                : ["ARRI Alexa Mini (same camera as Netflix)", "Crew of 11 (director, DOP, producer, ACs)", "Full agency workflow (concept, script, storyboard)", "3 shoot days, 8-week turnaround", "Custom score, EN + AR voiceover, NMC cleared"],
            },
          ].map((card, i) => (
            <Reveal key={i} delay={i * 70} className="bs-card">
              <p className="bs-eyebrow">{card.tag}</p>
              <h3 className="mt-4 text-xl">{card.title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-[color:var(--color-muted)]">
                {card.lines.map((line, j) => (
                  <li key={j} className="flex gap-2">
                    <span className="text-[color:var(--color-accent)]">·</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* TVC PIPELINE */}
      <Section>
        <Reveal>
          <Eyebrow>{isAr ? "سير عمل إنتاج TVC" : "The TVC production pipeline"}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr ? "سبع مراحل من الإيجاز إلى البث" : "Seven stages from brief to broadcast"}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              h: isAr ? "1 · الإيجاز الإبداعي" : "1 · Creative brief",
              b: isAr
                ? "نجتمع مع فريق العلامة والوكالة لفهم الجمهور والرسالة وميزانية الإعلام. ننهي الإيجاز خلال 2–3 أيام."
                : "We meet with the brand and agency team to understand audience, message and media budget. Brief finalised in 2–3 days.",
            },
            {
              h: isAr ? "2 · المفهوم والنص" : "2 · Concept & script",
              b: isAr
                ? "2–3 مسارات إبداعية + نص 30/60 ثانية + سيناريو بصري. 2 جولات مراجعة قبل الموافقة."
                : "2–3 creative routes + 30/60 sec script + storyboard. 2 revision rounds before sign-off.",
            },
            {
              h: isAr ? "3 · اختيار الممثلين والمواقع" : "3 · Casting & locations",
              b: isAr
                ? "اختيار الممثلين من شبكتنا في دبي (80+ محترف). استطلاع الموقع + تصاريح لجنة دبي للأفلام."
                : "Casting from our Dubai network (80+ professionals). Location scout + Dubai Film Commission permits.",
            },
            {
              h: isAr ? "4 · التصوير السينمائي" : "4 · Cinematic shoot",
              b: isAr
                ? "1–3 أيام تصوير على RED Komodo X أو ARRI Alexa Mini. طاقم 2–11 حسب الباقة. طوارئ الطقس مدمجة."
                : "1–3 shoot days on RED Komodo X or ARRI Alexa Mini. Crew of 2–11 depending on tier. Weather contingencies built in.",
            },
            {
              h: isAr ? "5 · المونتاج + تدرج الألوان" : "5 · Edit + colour grade",
              b: isAr
                ? "مونتاج DaVinci Resolve Studio. تدرج ألوان على نفس خط أنابيب بث Netflix. 2 جولات مراجعة."
                : "Edit in DaVinci Resolve Studio. Colour grade on the same Netflix-grade broadcast pipeline. 2 revision rounds.",
            },
            {
              h: isAr ? "6 · الصوت والموسيقى" : "6 · Sound design + music",
              b: isAr
                ? "تصميم صوت + تعليق صوتي EN/AR + ترخيص موسيقى Musicbed/Artlist. شهادة ترخيص لكل منصة."
                : "Sound design + EN/AR voiceover + Musicbed/Artlist music license. License certificate per platform.",
            },
            {
              h: isAr ? "7 · التسليم + تصريح البث" : "7 · Delivery + broadcast clearance",
              b: isAr
                ? "نسخة بث رئيسية + 16:9 سوشيال + 9:16 عمودي + ترجمات EN/AR. تنسيق تصريح NMC للبث التلفزيوني."
                : "Broadcast master + 16:9 social + 9:16 vertical + EN/AR captions. NMC clearance coordination for broadcast TV.",
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

      {/* RECENT TVC CAMPAIGNS */}
      <Section alt>
        <Reveal>
          <Eyebrow>{isAr ? "حملات TVC حديثة" : "Recent TVC campaigns"}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr ? "إعلانات تلفزيونية أنتجتها بيك ستوري في دبي" : "TVCs Big Story has produced in Dubai"}
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {[
            {
              tag: isAr ? "F&B · إطلاق منتج" : "F&B · Product Launch",
              title: isAr ? "إعلان 60 ثانية لإطلاق منتج F&B جديد" : "60-sec launch TVC for a new F&B product",
              blurb: isAr
                ? "إعلان 60 ثانية لمطعم في دبي يطلق قائمة جديدة. RED Komodo X، ممثلين من شبكتنا، يوم تصوير واحد في الموقع + ستوديو. 4 نسخ (16:9 بث، 16:9 سوشيال، 9:16، 1:1). AED 42,000."
                : "A 60-second TVC for a Dubai restaurant launching a new menu. RED Komodo X, casting from our network, 1 shoot day on-location + studio. 4 cuts (16:9 broadcast, 16:9 social, 9:16, 1:1). AED 42,000.",
            },
            {
              tag: isAr ? "تطوير عقاري · حملة بطل" : "Property · Hero Campaign",
              title: isAr ? "فيلم بطل 90 ثانية لمشروع عقاري فاخر" : "90-sec hero film for a luxury property launch",
              blurb: isAr
                ? "فيلم بطل 90 ثانية لمشروع سكني فاخر في دبي. ARRI Alexa Mini، تصوير جوي بطائرة هليكوبتر، 3 أيام تصوير، تعليق صوتي EN + AR. حملة مدفوعة 6 أشهر عبر Meta + YouTube. AED 95,000."
                : "A 90-second hero film for a luxury Dubai residential launch. ARRI Alexa Mini, helicopter aerials, 3 shoot days, EN + AR voiceover. 6-month paid campaign across Meta + YouTube. AED 95,000.",
            },
            {
              tag: isAr ? "تجارة إلكترونية · سوشيال أولاً" : "E-commerce · Social-First",
              title: isAr ? "TVC سوشيال أولاً 15 ثانية، 8 نسخ إعلانات" : "15-sec social-first TVC, 8 paid ad variations",
              blurb: isAr
                ? "TVC سوشيال أولاً 15 ثانية لعلامة تجارة إلكترونية. Sony FX3، يوم تصوير واحد في ستوديو، 8 نسخ إعلانات (نصائح مختلفة، CTA مختلفة، خلفيات مختلفة). AED 18,000."
                : "A 15-second social-first TVC for an e-commerce brand. Sony FX3, 1 shoot day in studio, 8 paid-ad variations (different hooks, CTAs, backgrounds). AED 18,000.",
            },
            {
              tag: isAr ? "سيارات · حملة إقليمية" : "Automotive · Regional Campaign",
              title: isAr ? "حملة TVC إقليمية لـ 5 دول خليجية" : "Regional TVC campaign across 5 GCC markets",
              blurb: isAr
                ? "TVC 60 ثانية لعلامة سيارات فاخرة تُبث في 5 دول خليجية. RED Komodo X + Alexa Mini، 4 أيام تصوير، 5 نسخ لغات (EN، AR، FR لكل قطر). تنسيق NMC في 5 دول. AED 180,000."
                : "A 60-second TVC for a luxury automotive brand airing in 5 GCC markets. RED Komodo X + Alexa Mini, 4 shoot days, 5 language cuts (EN, AR, FR per country). NMC coordination across 5 countries. AED 180,000.",
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
      <Section>
        <div className="bs-card bs-card-hover flex flex-col items-start justify-between gap-6 p-10 md:flex-row md:items-center">
          <div>
            <Eyebrow>{isAr ? "دليل 2026" : "2026 pricing guide"}</Eyebrow>
            <h2 className="mt-3 text-2xl">
              {isAr
                ? "تسعير إنتاج TVC في دبي 2026 — تحليل الميزانيات"
                : "Dubai TVC Production Pricing 2026 — budget breakdown"}
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-[color:var(--color-muted)]">
              {isAr
                ? "تحليل كامل لتكاليف إنتاج TVC في دبي 2026 — إيجار الكاميرات، رسوم الممثلين، تكاليف الموقع، ورسوم خفية يجب أن تعرفها قبل الإيجاز. يُنشر قريباً."
                : "Full 2026 cost breakdown for Dubai TVC production — camera rentals, talent fees, location costs, and hidden fees to know before briefing. Coming soon."}
            </p>
          </div>
          <Button href={localizedPath(locale, "/services/brand-films")} variant="ghost">
            {isAr ? "Brand Films" : "Brand Films"}
          </Button>
        </div>
      </Section>

      {/* FAQ */}
      <Section alt>
        <Reveal>
          <Eyebrow>{t(si.detail.faqs, locale)}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr ? "أسئلة متكررة — إنتاج TVC دبي" : "FAQ — TVC production Dubai"}
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
        <div className="mt-8">
          <Link href={localizedPath(locale, "/careers")} className="text-sm text-[color:var(--color-muted)] underline hover:text-[color:var(--color-accent)]">
            {isAr ? "انضم إلى فريق بيك ستوري →" : "Join the Big Story team →"}
          </Link>
        </div>
      </Section>

      <CtaBand
        locale={locale}
        heading={isAr ? "مستعد لمناقشة إعلانكم التلفزيوني القادم؟" : "Ready to talk about your next TVC?"}
        waContext={isAr ? "بخصوص إنتاج TVC في دبي." : "Re: TVC production in Dubai."}
      />
    </>
  );
}