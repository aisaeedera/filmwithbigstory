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
      ? "مصور فيديو زفاف دبي | 3 دقائق AED 3,500 | تشويق نفس اليوم"
      : "Wedding Videographer Dubai | Cinematic Wedding Film from AED 3,500",
    description: isAr
      ? "مصور فيديو زفاف دبي — ريل 3 دقائق 3,500 درهم، ريل 8 دقائق 6,000 درهم، فيلم سينمائي 8–12 دقيقة من 18,500 درهم. Sony FX3 وRED Komodo X، تشويق نفس اليوم متاح."
      : "Wedding videographer Dubai — 3-min reel AED 3,500, 8-min reel AED 6,000, cinematic 8–12 min film from AED 18,500. Sony FX3 and RED Komodo X, same-day teaser available.",
    path: "/services/wedding-videography-dubai",
  });
}

const COPY = {
  eyebrow: { en: "Wedding Videography in Dubai", ar: "تصوير فيديو الزفاف في دبي" },
  h1: {
    en: "Wedding Videographer Dubai — what it costs, what's included, and how to book one",
    ar: "مصور فيديو الزفاف في دبي — التكاليف، ما يتضمنه، وكيف تحجز",
  },
  lead: {
    en: "Looking for a wedding videographer in Dubai? Big Story films weddings across Dubai, Abu Dhabi and Sharjah — from a 3-minute highlight reel at AED 3,500 up to a cinema-grade 8–12 minute film at AED 18,500–35,000 with RED Komodo X. Sony FX3 cameras as standard, licensed DJI Inspire 3 drone, licensed Sennheiser wireless audio, and a same-day teaser delivered by 10pm on the wedding night (Premium tier). 2 months pre-production planning, 1–2 shoot days, 3–6 weeks post. Every wedding film is edited in DaVinci Resolve Studio and colour-graded on the same pipeline we use for TVCs and brand films.",
    ar: "تبحث عن مصور فيديو زفاف في دبي؟ بيك ستوري تصوّر حفلات الزفاف في دبي وأبوظبي والشارقة — من ريل ملخص 3 دقائق بـ 3,500 درهم إلى فيلم سينمائي 8–12 دقيقة بـ 18,500–35,000 درهم على RED Komodo X. كاميرات Sony FX3 قياسية، درون DJI Inspire 3 مرخص، صوت لاسلكي Sennheiser مرخص، وتشويق نفس اليوم يُسلّم قبل 10 مساءً ليلة الزفاف (الباقة المتميزة). شهران تخطيط ما قبل الإنتاج، 1–2 يوم تصوير، 3–6 أسابيع ما بعد الإنتاج. كل فيلم زفاف يُحرَّر في DaVinci Resolve Studio ويلوَّن على نفس خط الأنابيب الذي نستخدمه للإعلانات والأفلام التعريفية.",
  },
  statsHeading: { en: "Wedding videography in Dubai — by the numbers", ar: "تصوير فيديو الزفاف في دبي — بالأرقام" },
  statsBody: {
    en: "Data from Big Story's 2025–2026 Dubai wedding video bookings: average spend, drone add-on rate, and same-day teaser bookings. Every figure below is sourced from our post-production ledger and dated.",
    ar: "بيانات من حجوزات فيديو زفاف دبي لدى بيك ستوري 2025–2026: متوسط الإنفاق، معدل إضافة الدرون، وحجوزات تشويق نفس اليوم. كل رقم أدناه من سجل ما بعد الإنتاج لدينا ومؤرشف.",
  },
  stat1: { en: "AED 3,500 → 35,000", ar: "3,500 ← 35,000 درهم" },
  stat1Label: { en: "Three tiers: highlight reel (AED 3,500), cinematic reel (AED 6,000), full cinematic film (AED 18,500–35,000)", ar: "ثلاث باقات: ريل ملخص (3,500 درهم)، ريل سينمائي (6,000 درهم)، فيلم سينمائي كامل (18,500–35,000 درهم)" },
  stat2: { en: "180+", ar: "180+" },
  stat2Label: { en: "Dubai weddings filmed by Big Story in 2025–2026, ranging from 60-guest villa weddings to 400-guest resort celebrations", ar: "حفل زفاف في دبي صورتها بيك ستوري في 2025–2026، من حفلات فيلات 60 ضيفاً إلى احتفالات منتجعات 400 ضيف" },
  stat3: { en: "4 hrs", ar: "4 ساعات" },
  stat3Label: { en: "Same-day teaser turn-around on the Premium tier — delivered by 10pm on the wedding night, 4 hours after the ceremony ends", ar: "مدة تسليم تشويق نفس اليوم في الباقة المتميزة — يُسلّم قبل 10 مساءً ليلة الزفاف، 4 ساعات بعد نهاية الحفل" },
  stat4: { en: "62%", ar: "62٪" },
  stat4Label: { en: "Of 2025 Dubai wedding bookings added the licensed drone (DJI Inspire 3) as an add-on", ar: "من حجوزات زفاف دبي في 2025 أضافت الدرون المرخص (DJI Inspire 3) كإضافة" },
};

const faqItems = {
  en: [
    {
      q: "How much does a wedding videographer cost in Dubai?",
      a: "A wedding videographer in Dubai costs AED 3,500 for a 3-minute highlight reel, AED 6,000 for an 8-minute cinematic reel, and AED 18,500–35,000 for a full cinematic wedding film (RED Komodo X A-cam + dedicated film director + same-day teaser). The wedding videography price in Dubai depends on the camera package, crew size and post-production turnaround. Most Dubai wedding videographers fall in the AED 8,000–15,000 range for a standard highlight reel; Big Story's entry tier starts at AED 3,500 because we run a lean single-videographer model on the highlight-reel packages and scale up to a full cinema crew on the cinematic wedding package.",
    },
    {
      q: "What does a wedding videographer in Dubai actually deliver?",
      a: "Every Big Story Dubai wedding videography booking delivers a highlight reel (3 or 8 minutes, depending on tier), a 20–40 minute ceremony cut with the full vows and speeches, and the raw footage archive. The cinematic wedding packages (AED 18,500–35,000) deliver an 8–12 minute colour-graded cinema-grade film plus a same-day teaser delivered by 10pm on the wedding night. All deliverables are MP4 masters (4K H.264) with a 1080p social cut included. Music is licensed through Musicbed and Artlist — no copyright strikes on YouTube or Instagram.",
    },
    {
      q: "How do I find the best wedding videographer in Dubai?",
      a: "Look for three things: (1) a cinema-grade camera (Sony FX3 minimum, RED Komodo X for the cinematic tier) — not a DSLR or phone; (2) a sample reel from a real Dubai wedding at your venue type (hotel ballroom, desert resort, beach villa); (3) a clear deliverable list with turnaround times. Ask to see the unedited ceremony cut from one of their bookings — that's where wedding videography separates from videography in general. Big Story delivers all three: Sony FX3 + RED Komodo X cinema gear, sample reels for every venue type we've shot, and uncut ceremony cuts available on request.",
    },
    {
      q: "Do you offer same-day edits / teasers for Dubai weddings?",
      a: "Yes — the same-day teaser add-on is AED 4,500 on the highlight-reel packages, and is included in the Premium Cinematic Wedding package (AED 35,000). The teaser is 30–90 seconds, cut from the ceremony and reception, delivered by 10pm on the wedding night (about 4 hours after the ceremony ends). Two editors work in parallel: one on the teaser that evening, one on the full highlight reel during the standard 3–4 week post-production cycle. The teaser is screened at the after-party or shared on WhatsApp with overseas guests who couldn't attend.",
    },
    {
      q: "Can you film our Dubai wedding if it's outdoors or at a desert resort?",
      a: "Yes — Big Story films outdoor Dubai weddings at desert resorts (Al Maha, Bab Al Shams, Hatta Fort), beach venues (Nikki Beach, Drift, Barasti), private villas on Palm Jumeirah and Emirates Hills, and yacht weddings. Outdoor shoots need a licensed drone operator (DJI Inspire 3, included as a AED 1,500 add-on) and weather contingencies — sandstorms in summer, fog in winter. We carry weather covers for cameras and have a backup indoor plan for every outdoor shoot. Desert resort weddings typically add a 2nd AC (+AED 1,200) for the harsh light conditions.",
    },
    {
      q: "Are drone shots included in the wedding videography package?",
      a: "Drone is an optional add-on at AED 1,500 for the highlight-reel packages, and is included in both Cinematic Wedding tiers. The drone add-on covers up to 30 minutes of flight time, our licensed drone operator (DCAA-certified), and the NMC permit application. Drone is integrated into the highlight reel (1–3 aerial shots of the venue, beach, desert) and the ceremony cut if requested. Most Dubai wedding venues permit drone flights; a few hotels near DXB airport (Burj Al Arab area, Downtown Dubai) require advance NMC permits which we handle as part of the booking.",
    },
    {
      q: "How long until we get the final wedding video?",
      a: "Standard turnaround is 3 weeks for the 3-min highlight reel package, 4 weeks for the 8-min cinematic reel, 4 weeks for Cinematic Wedding Basic, and 6 weeks for Cinematic Wedding Premium. The same-day teaser is delivered by 10pm on the wedding night (Premium tier only) or by the next morning (Basic tier add-on). Rush delivery (2-week post on the 3-min reel) is available at +AED 1,200. Two rounds of revisions are included on every package — list-based, similar to a photography revision policy.",
    },
    {
      q: "What's the difference between Wedding Videography and Cinematic Wedding?",
      a: "Wedding Videography is video-only coverage with a Sony FX3 lead videographer — designed for the highlight reel and ceremony cut at AED 3,500–6,000. Cinematic Wedding is Big Story's premium package: RED Komodo X A-cam + 2× FX3 B-cams + dedicated film director + 5 ACs + licensed drone + 8–12 minute cinema-grade colour-graded film + same-day teaser + DaVinci Resolve pipeline, from AED 18,500 (Basic) to AED 35,000 (Premium two-day). Pick Wedding Videography when the brief is 'show us the day'; pick Cinematic Wedding when the brief is 'make us feel something — a film that holds up on a cinema screen.' Both are filmed by Big Story's Dubai crew — just at different scales.",
    },
    {
      q: "Do you film multi-day weddings (Henna + Wedding) in Dubai?",
      a: "Yes — the Premium Cinematic Wedding package (AED 35,000) covers Henna night + Wedding day + post-wedding brunch as a 2-day shoot with the same crew continuity. Multi-cultural weddings (Indian, Pakistani, Lebanese, Egyptian) often need 2 days of coverage and a split crew (female cinematographer + AC for the women's side). Big Story films 40–60 multi-day weddings per year in Dubai — most of them through luxury wedding planners (Cherniak Events, Eventchic, The Qode, Eyesome, Jannat, Hafla) on the Partner Program.",
    },
    {
      q: "How do we book a wedding videographer in Dubai — and how far in advance?",
      a: "Big Story Dubai wedding videography bookings open 6–12 months in advance for peak wedding season (October–April). To book: send a WhatsApp or email with your wedding date, venue, guest count and which tier you're considering. We'll send a proposal within 24 hours and hold the date with a 30% deposit. Most Dubai weddings book 4–6 months ahead; last-minute bookings (<8 weeks) are possible but the Premium Cinematic Wedding tier is often already booked out. Multi-cultural weddings with 2-day coverage typically book 8–10 months ahead.",
    },
  ],
  ar: [
    {
      q: "كم تكلفة مصور فيديو الزفاف في دبي؟",
      a: "تكلفة مصور فيديو الزفاف في دبي 3,500 درهم لريل ملخص 3 دقائق، 6,000 درهم لريل سينمائي 8 دقائق، و18,500–35,000 درهم لفيلم زفاف سينمائي كامل (RED Komodo X كاميرا رئيسية + مخرج فيلم مخصص + تشويق نفس اليوم). يعتمد سعر تصوير فيديو الزفاف في دبي على حزمة الكاميرا وحجم الطاقم ومدة ما بعد الإنتاج. معظم مصوري فيديو الزفاف في دبي يتراوح سعرهم بين 8,000–15,000 درهم لريل ملخص قياسي؛ بيك ستوري تبدأ من 3,500 درهم لأننا ندير نموذج مصور واحد مختصر على باقات ريل الملخص ونوسع إلى طاقم سينمائي كامل على باقة الزفاف السينمائي.",
    },
    {
      q: "ماذا يسلم مصور فيديو الزفاف في دبي فعلياً؟",
      a: "كل حجز فيديو زفاف في بيك ستوري دبي يسلم ريل ملخص (3 أو 8 دقائق حسب الباقة)، قصة حفل 20–40 دقيقة بالنذور والخطب الكاملة، وأرشيف اللقطات الخام. باقات الزفاف السينمائي (18,500–35,000 درهم) تسلم فيلم سينمائي 8–12 دقيقة بتدرج ألوان سينمائي إضافة إلى تشويق نفس اليوم يُسلّم قبل 10 مساءً ليلة الزفاف. كل المخرجات ملفات MP4 رئيسية (4K H.264) مع نسخة سوشيال 1080p مشمولة. الموسيقى مرخصة عبر Musicbed وArtlist — لا إنذارات حقوق نشر على YouTube أو إنستغرام.",
    },
    {
      q: "كيف أجد أفضل مصور فيديو زفاف في دبي؟",
      a: "ابحث عن ثلاثة أشياء: (1) كاميرا سينمائية (Sony FX3 كحد أدنى، RED Komodo X للباقة السينمائية) — ليست DSLR أو هاتف؛ (2) ريل عينة من حفل زفاف حقيقي في دبي من نوع موقعك (قاعة فندق، منتجع صحراوي، فيلا شاطئية)؛ (3) قائمة مخرجات واضحة مع مدد التسليم. اطلب رؤية قصة الحفل غير المقطوعة من أحد حجوزاتهم — هنا يتفوق تصوير فيديو الزفاف على التصوير الفيديوي العام. بيك ستوري تقدم الثلاثة: معدات سينمائية Sony FX3 + RED Komodo X، ريلز عينة لكل نوع موقع صورناه، وقصص حفل غير مقطوعة متاحة عند الطلب.",
    },
    {
      q: "هل تقدمون مونتاج/تشويق نفس اليوم لحفلات دبي؟",
      a: "نعم — إضافة تشويق نفس اليوم 4,500 درهم على باقات ريل الملخص، ومشمولة في باقة الزفاف السينمائي المتميزة (35,000 درهم). التشويق 30–90 ثانية، مقصوص من الحفل والاستقبال، يُسلّم قبل 10 مساءً ليلة الزفاف (حوالي 4 ساعات بعد نهاية الحفل). يعمل محرران بالتوازي: واحد على التشويق تلك الأمسية، وواحد على ريل الملخص الكامل خلال دورة ما بعد الإنتاج القياسية البالغة 3–4 أسابيع. يُعرض التشويق في الحفلة اللاحقة أو يُشارك على واتساب مع الضيوف في الخارج الذين لم يستطيعوا الحضور.",
    },
    {
      q: "هل يمكنكم تصوير حفل زفاف دبي في الهواء الطلق أو في منتجع صحراوي؟",
      a: "نعم — بيك ستوري تصور حفلات الزفاف الخارجية في دبي في المنتجعات الصحراوية (المها، باب الشمس، حصاة فورت)، والمواقع الشاطئية (نيكي بيتش، دريفت، برستي)، والفيلات الخاصة في نخلة جميرا وإميرتس هيلز، وحفلات اليخوت. التصوير الخارجي يحتاج مشغل درون مرخص (DJI Inspire 3، مشمول كإضافة 1,500 درهم) واحتياطيات الطقس — عواصف رملية في الصيف، ضباب في الشتاء. نحمل أغطية طقس للكاميرات ولدينا خطة داخلية بديلة لكل تصوير خارجي. حفلات المنتجعات الصحراوية عادةً تضيف مساعد ثانٍ (+1,200 درهم) لظروف الإضاءة القاسية.",
    },
    {
      q: "هل اللقطات الجوية مشمولة في باقة فيديو الزفاف؟",
      a: "الدرون إضافة اختيارية بـ 1,500 درهم على باقات ريل الملخص، ومشمول في باقتي الزفاف السينمائي. إضافة الدرون تغطي حتى 30 دقيقة طيران، مشغل الدرون المرخص لدينا (معتمد من DCAA)، وتقديم طلب تصريح NMC. يُدمج الدرون في ريل الملخص (1–3 لقطات جوية للموقع، الشاطئ، الصحراء) وقصة الحفل إذا طُلب. معظم مواقع الزفاف في دبي تسمح بطيران الدرون؛ بعض الفنادق القريبة من مطار دبي (منطقة برج العرب، وسط مدينة دبي) تتطلب تصاريح NMC مسبقة نتولاها كجزء من الحجز.",
    },
    {
      q: "كم يستغرق الحصول على الفيديو النهائي؟",
      a: "مدة التسليم القياسية 3 أسابيع لباقة ريل الـ 3 دقائق، 4 أسابيع لريل الـ 8 دقائق، 4 أسابيع لأساسي الزفاف السينمائي، و6 أسابيع لمتميز الزفاف السينمائي. تشويق نفس اليوم يُسلّم قبل 10 مساءً ليلة الزفاف (الباقة المتميزة فقط) أو صباح اليوم التالي (إضافة الباقة الأساسية). التسليم العاجل (أسبوعين على ريل الـ 3 دقائق) متاح بـ +1,200 درهم. جولتا مراجعة مشمولتان في كل باقة — قائمة على الاختيار، مشابهة لسياسة مراجعة التصوير الفوتوغرافي.",
    },
    {
      q: "ما الفرق بين فيديو الزفاف والزفاف السينمائي؟",
      a: "فيديو الزفاف تغطية فيديو فقط مع مصور Sony FX3 رئيسي — مصمم لريل الملخص وقصة الحفل بـ 3,500–6,000 درهم. الزفاف السينمائي باقة بيك ستوري المتميزة: RED Komodo X كاميرا رئيسية + 2× FX3 ثانوية + مخرج فيلم مخصص + 5 مساعدين + درون مرخص + فيلم سينمائي 8–12 دقيقة بتدرج ألوان سينمائي + تشويق نفس اليوم + خط أنابيب DaVinci Resolve، من 18,500 درهم (الأساسية) إلى 35,000 درهم (المتميزة يومين). اختر فيديو الزفاف عندما يكون الإيجاز «أرنا اليوم»؛ اختر الزفاف السينمائي عندما يكون الإيجاز «اجعلنا نشعر بشيء — فيلم يصمد على شاشة سينما». كلاهما يُصور من قبل طاقم بيك ستوري في دبي — على مستويات مختلفة فقط.",
    },
    {
      q: "هل تصورون حفلات الزفاف متعددة الأيام (حناء + زفاف) في دبي؟",
      a: "نعم — باقة الزفاف السينمائي المتميزة (35,000 درهم) تغطي ليلة الحناء + يوم الزفاف + brunch ما بعد الزفاف كتصوير يومين مع استمرارية نفس الطاقم. حفلات الزفاف متعددة الثقافات (هندية، باكستانية، لبنانية، مصرية) غالباً تحتاج يومين تغطية وطاقم مقسم (مصور سينمائي أنثى + مساعدة للجانب النسائي). بيك ستوري تصور 40–60 حفل زفاف متعدد الأيام سنوياً في دبي — معظمها عبر منظمي الزفاف الراقيين (Cherniak Events, Eventchic, The Qode, Eyesome, Jannat, Hafla) في برنامج الشركاء.",
    },
    {
      q: "كيف نحجز مصور فيديو زفاف في دبي — وكم مسبقاً؟",
      a: "حجوزات فيديو زفاف بيك ستوري في دبي تفتح 6–12 شهراً مسبقاً لموسم الزفاف الذروة (أكتوبر–أبريل). للحجز: أرسل واتساب أو بريد إلكتروني بتاريخ حفل زفافك والموقع وعدد الضيوف وأي باقة تفكر فيها. سنرسل عرضاً خلال 24 ساعة ونحجز التاريخ بدفعة مقدمة 30%. معظم حفلات زفاف دبي تُحجز قبل 4–6 أشهر؛ الحجوزات اللحظية (<8 أسابيع) ممكنة لكن الباقة المتميزة للزفاف السينمائي غالباً محجوزة بالفعل. حفلات الزفاف متعددة الثقافات بتغطية يومين عادةً تُحجز قبل 8–10 أشهر.",
    },
  ],
};

const relatedServices = services.filter((s) =>
  ["cinematic-wedding", "weddings", "wedding-photography", "wedding-photo-video", "wedding-same-day-teaser", "live-streaming"].includes(s.slug)
);

export default async function WeddingVideographyDubaiPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const path = "/services/wedding-videography-dubai";
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
            name: isAr ? "مصور فيديو زفاف دبي" : "Wedding Videographer Dubai",
            description: isAr
              ? "خدمة مصور فيديو الزفاف في دبي من بيك ستوري — ريل 3 دقائق 3,500 درهم، ريل 8 دقائق 6,000 درهم، زفاف سينمائي 18,500–35,000 درهم."
              : "Wedding videography service in Dubai from Big Story — 3-min reel AED 3,500, 8-min reel AED 6,000, cinematic wedding AED 18,500–35,000. Sony FX3 + RED Komodo X.",
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
            <a href={waLink(isAr ? "مهتم بمصور فيديو زفاف في دبي." : "Interested in a wedding videographer in Dubai.")} target="_blank" rel="noopener noreferrer" className="bs-btn bs-btn-gold">
              {t(ui.nav.startYourProject, locale)}
            </a>
            <Button href={localizedPath(locale, "/services/cinematic-wedding")} variant="ghost">
              {isAr ? "باقة الزفاف السينمائي" : "Cinematic Wedding package"}
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* STATS — Dubai wedding videography by the numbers */}
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

      {/* WEDDING VIDEOGRAPHER DUBAI — THREE TIERS */}
      <Section>
        <div className="grid gap-12 md:grid-cols-2 md:items-start">
          <Reveal>
            <Eyebrow>{isAr ? "ثلاث باقات" : "Three wedding videography tiers"}</Eyebrow>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
              {isAr
                ? "من ريل 3 دقائق إلى فيلم سينمائي 8–12 دقيقة"
                : "From a 3-minute highlight reel to a cinema-grade 8–12 minute film"}
            </h2>
          </Reveal>
          <Reveal delay={80} className="bs-prose">
            {isAr ? (
              <>
                <p>
                  خدمة مصور فيديو الزفاف في دبي من بيك ستوري مقسمة إلى ثلاث باقات متميزة، كل واحدة تخدم إيجازاً مختلفاً. <strong>Highlight Reel</strong> (3,500–6,000 درهم) لريل 3 أو 8 دقائق مصور على Sony FX3 — مناسب عندما يكون الإيجاز «أرونا اليوم». <strong>Cinematic Wedding</strong> (18,500–35,000 درهم) لفيلم سينمائي 8–12 دقيقة على RED Komodo X — مناسب عندما يكون الإيجاز «اجعلونا نشعر بشيء، كأن يوم زفافنا فيلم قصير».
                </p>
                <p>
                  الباقات الثلاث تشترك في نفس خط أنابيب DaVinci Resolve Studio للتدرج الألوان، ونفس فريق تحرير دبي، ونفس معايير ترخيص الموسيقى. الفرق في حجم الطاقم (مصور واحد مقابل طاقم سينمائي 11 شخص)، والمعدات (FX3 مقابل RED Komodo X)، وسرعة التسليم (3–4 أسابيع مقابل 6 أسابيع). ابدأ بباقة Highlight Reel إذا كانت هذه أول تجربة فيديو زفاف لكم؛ انتقل إلى Cinematic إذا كنتم تخططون لحفل زفاف فاخر وتريدون فيلماً يشاهد على شاشة كبيرة.
                </p>
              </>
            ) : (
              <>
                <p>
                  Big Story's wedding videography in Dubai is structured around three tiers, each serving a different brief. <strong>Highlight Reel</strong> (AED 3,500–6,000) for a 3 or 8-minute reel on Sony FX3 — right when the brief is "show us the day." <strong>Cinematic Wedding</strong> (AED 18,500–35,000) for an 8–12 minute cinema-grade film on RED Komodo X — right when the brief is "make us feel something, like our wedding day as a short film."
                </p>
                <p>
                  All three tiers share the same DaVinci Resolve Studio colour grading pipeline, the same Dubai editing team, and the same music licensing standards (Musicbed + Artlist, cleared for streaming and cinema screening). The difference is crew size (single videographer vs 11-person cinema crew), gear (FX3 vs RED Komodo X A-cam), and turnaround (3–4 weeks vs 6 weeks). Start with the Highlight Reel tier if this is your first wedding video; move to Cinematic if you're planning a luxury wedding and want a film that holds up on a cinema screen.
                </p>
              </>
            )}
          </Reveal>
        </div>
      </Section>

      {/* THE THREE TIERS COMPARED */}
      <Section alt>
        <Reveal>
          <Eyebrow>{isAr ? "مقارنة الباقات الثلاث" : "The three tiers compared"}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr ? "اختر الباقة المناسبة ليوم زفافكم في دبي" : "Pick the tier that fits your Dubai wedding day"}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {[
            {
              tag: isAr ? "باقة 1 · Highlight Reel" : "Tier 1 · Highlight Reel",
              title: isAr ? "ريل 3 دقائق — AED 3,500" : "3-min reel — AED 3,500",
              lines: isAr
                ? ["Sony FX3 سينمائية (4K Super 35)", "مصور رئيسي + مساعد واحد", "ريل ملخص 3 دقائق + قصة حفل 20–40 دقيقة", "تشويق نفس اليوم اختياري (+4,500)", "تسليم 3 أسابيع"]
                : ["Sony FX3 cinema-grade (4K Super 35)", "Lead videographer + 1 assistant", "3-min highlight reel + 20–40 min ceremony cut", "Same-day teaser optional (+AED 4,500)", "3-week post-production turnaround"],
            },
            {
              tag: isAr ? "باقة 2 · Cinematic Reel" : "Tier 2 · Cinematic Reel",
              title: isAr ? "ريل 8 دقائق — AED 6,000" : "8-min reel — AED 6,000",
              lines: isAr
                ? ["Sony FX3 سينمائية + كاميرا B-cam", "2 مصورين + 2 مساعدين", "ريل سينمائي 8 دقائق + قصة حفل كاملة", "مشاهد أطول، إيقاع أبطأ، المزيد من لقطات B-roll", "تسليم 4 أسابيع"]
                : ["Sony FX3 cinema-grade + B-cam (A7S III)", "2 cinematographers + 2 ACs", "8-min cinematic reel + full ceremony cut", "Longer scenes, slower pace, more b-roll", "4-week post-production turnaround"],
            },
            {
              tag: isAr ? "باقة 3 · Cinematic Wedding" : "Tier 3 · Cinematic Wedding",
              title: isAr ? "فيلم سينمائي 8–12 دقيقة — AED 18,500→35,000" : "8–12 min cinema film — AED 18,500→35,000",
              lines: isAr
                ? ["RED Komodo X كاميرا رئيسية + 2× FX3", "طاقم سينمائي 5–11 شخص، مخرج مخصص", "فيلم سينمائي 8–12 دقيقة بتدرج ألوان DaVinci", "تشويق نفس اليوم قبل 10 مساءً (المتميزة)", "يومان تغطية (حناء + زفاف) في المتميزة"]
                : ["RED Komodo X A-cam + 2× FX3 B-cams", "5–11 person cinema crew, dedicated director", "8–12 min cinema-grade film, DaVinci colour grade", "Same-day teaser by 10pm (Premium)", "2-day coverage (Henna + Wedding) on Premium"],
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

      {/* WHAT'S INCLUDED IN WEDDING VIDEOGRAPHY DUBAI */}
      <Section>
        <Reveal>
          <Eyebrow>{isAr ? "ما يتضمنه تصوير فيديو الزفاف في دبي" : "What's included in Dubai wedding videography"}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr ? "ستة عناصر تفرّق مصور الفيديو المحترف" : "Six things that separate a pro wedding videographer"}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              h: isAr ? "كاميرا سينمائية Sony FX3" : "Sony FX3 cinema camera as standard",
              b: isAr
                ? "كاميرا Sony FX3 سينمائية 4K Super 35، 10-bit 4:2:2، ISO أساسي مزدوج لتصوير الاستقبال في الإضاءة المنخفضة. ليست DSLR أو هاتف — صورة سينمائية حقاً."
                : "Sony FX3 cinema-grade 4K Super 35, 10-bit 4:2:2, dual base ISO for low-light reception work. Not a DSLR or a phone — genuinely cinematic image.",
            },
            {
              h: isAr ? "صوت احترافي مرخص" : "Wireless audio with licensed mics",
              b: isAr
                ? "ميكروفونات لاسلكية Sennheiser G4 على العريس والعروس والولي. النذور والخطب تُلتقط بنقاء — لا رياح، لا ضوضاء خلفية، لا خسارة في الكلمات المهمة."
                : "Sennheiser G4 wireless lavaliers on the groom, bride and officiant. Vows and speeches captured clean — no wind, no background noise, no lost words.",
            },
            {
              h: isAr ? "درون DJI Inspire 3 مرخص" : "Licensed DJI Inspire 3 drone",
              b: isAr
                ? "إضافة 1,500 درهم لـ 30 دقيقة طيران + مشغل مرخص من DCAA + تصريح NMC. لقطات جوية للموقع والشاطئ أو الصحراء — مدمجة في الريل (1–3 لقطات)."
                : "AED 1,500 add-on for 30 min flight + DCAA-licensed operator + NMC permit. Aerials of the venue, beach or desert — integrated into the reel (1–3 shots).",
            },
            {
              h: isAr ? "تدرج ألوان DaVinci Resolve" : "DaVinci Resolve colour grade",
              b: isAr
                ? "كل فيلم زفاف يُلوَّن في DaVinci Resolve Studio — نفس خط أنابيب التدرج الذي نستخدمه في الإعلانات التلفزيونية وأفلام العلامات. نتيجة تبدو سينمائية لا هاوية."
                : "Every wedding film is graded in DaVinci Resolve Studio — the same colour pipeline we use for TVCs and brand films. Result looks cinematic, not amateur.",
            },
            {
              h: isAr ? "ترخيص موسيقى البث" : "Music licensing cleared for streaming",
              b: isAr
                ? "ترخيص موسيقى Musicbed وArtlist للبث على YouTube وإنستغرام والعرض السينمائي. لا إنذارات حقوق نشر على فيلمنا. أغاني عائلية مخصصة يمكن ترخيصها أيضاً."
                : "Musicbed and Artlist licensing cleared for streaming on YouTube, Instagram, and cinema screening. No copyright strikes on your film. Custom family songs can also be licensed.",
            },
            {
              h: isAr ? "قصة حفل + تشويق اختياري" : "Ceremony cut + optional same-day teaser",
              b: isAr
                ? "كل حجز يشمل قصة حفل 20–40 دقيقة بالنذور والخطب الكاملة (ملف منفصل). تشويق نفس اليوم اختياري بـ 4,500 درهم — يُسلّم قبل 10 مساءً ليلة الزفاف."
                : "Every booking includes a 20–40 min ceremony cut with full vows and speeches (separate file). Same-day teaser optional at AED 4,500 — delivered by 10pm on the wedding night.",
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

      {/* DUBAI WEDDING VENUES WE FILM */}
      <Section alt>
        <Reveal>
          <Eyebrow>{isAr ? "مواقع الزفاف في دبي" : "Dubai wedding venues we film"}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr ? "حفلات زفاف صورناها في دبي وأبوظبي والشارقة" : "Weddings we've filmed across Dubai, Abu Dhabi and Sharjah"}
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {[
            {
              tag: isAr ? "Palm Jumeirah · فلل خاصة" : "Palm Jumeirah · Private Villas",
              title: isAr ? "حفلات 80–250 ضيف في فلل Frond وSignature Villas" : "80–250 guest weddings at Frond villas and Signature Villas",
              blurb: isAr
                ? "الفيلات الخاصة في نخلة جميرا تحبّذ Highlight Reel أو Cinematic Reel — يوم واحد، طاقم صغير، حميمية. AED 6,000–18,500. نقدم مساعدة في تصاريح الدرون مع Atlantis وFairmont."
                : "Private villas on Palm Jumeirah are a Highlight Reel or Cinematic Reel fit — single day, small crew, intimate. AED 6,000–18,500. We handle drone permits with Atlantis and Fairmont.",
            },
            {
              tag: isAr ? "منتجعات صحراوية" : "Desert Resorts",
              title: isAr ? "المها، باب الشمس، حصاة فورت" : "Al Maha, Bab Al Shams, Hatta Fort",
              blurb: isAr
                ? "حفلات الزفاف الصحراوية تحتاج طاقماً أكبر (+مساعد ثانٍ للإضاءة القاسية) وشاحنة دفع رباعي للمعدات. AED 8,500–35,000. شملت الحفلات الأخيرة ليلة الحناء + يوم الزفاف + brunch ما بعد الزفاف."
                : "Desert resort weddings need a larger crew (+2nd AC for harsh light) and a 4x4 for gear transport. AED 8,500–35,000. Recent bookings covered Henna night + Wedding day + post-wedding brunch.",
            },
            {
              tag: isAr ? "فنادق 5 نجوم" : "5-Star Hotels",
              title: isAr ? "أتلانتس، Burj Al Arab، One&Only Royal Mirage" : "Atlantis, Burj Al Arab, One&Only Royal Mirage",
              blurb: isAr
                ? "فنادق 5 نجوم في دبي لها قواعد صارمة للطاقم والمعدات (تصاريح مسبق، حمولات محددة، مناطق تغطية ممنوعة). AED 8,000–35,000. ننسبق مباشرة مع قسم المناسبات للفندق قبل 4–6 أسابيع."
                : "Dubai 5-star hotels have strict crew and gear rules (advance permits, specific load-in routes, restricted coverage zones). AED 8,000–35,000. We coordinate directly with the hotel's events team 4–6 weeks ahead.",
            },
            {
              tag: isAr ? "يخوت وشواطئ" : "Yachts & Beach Venues",
              title: isAr ? "نيكي بيتش، دريفت، برستي، يخوت دبي Marina" : "Nikki Beach, Drift, Barasti, Dubai Marina yachts",
              blurb: isAr
                ? "حفلات اليخوت والشواطئ تحبّذ Cinematic Reel أو Cinematic Wedding — الإضاءة الذهبية في Gulf وقت الغروب تصنع فيلماً سينمائياً طبيعياً. AED 6,000–18,500. درون بحري عند الطلب."
                : "Yacht and beach weddings favor Cinematic Reel or Cinematic Wedding — the golden Gulf light at sunset makes a naturally cinematic film. AED 6,000–18,500. Marine drone on request.",
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

      {/* BLOG TEASER — UAE Wedding Videography Pricing 2026 */}
      <Section>
        <div className="bs-card bs-card-hover flex flex-col items-start justify-between gap-6 p-10 md:flex-row md:items-center">
          <div>
            <Eyebrow>{isAr ? "دليل 2026" : "2026 pricing guide"}</Eyebrow>
            <h2 className="mt-3 text-2xl">
              {isAr
                ? "تسعير فيديو الزفاف في الإمارات 2026 — مقارنة تفصيلية"
                : "UAE Wedding Videography Pricing 2026 — detailed comparison"}
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-[color:var(--color-muted)]">
              {isAr
                ? "دليل التسعير الكامل لمصوري فيديو الزفاف في الإمارات 2026 — ثلاث باقات، رسوم إضافية، ترخيص موسيقى، وتكاليف خفية يجب أن تعرفها. يُنشر قريباً."
                : "The full 2026 pricing guide for wedding videographers in the UAE — three packages, add-on costs, music licensing fees, and the hidden costs to know about. Coming soon."}
            </p>
          </div>
          <Button href={localizedPath(locale, "/services/wedding-videography")} variant="ghost">
            {isAr ? "ريل 3/8 دقائق" : "3/8-min reels"}
          </Button>
        </div>
      </Section>

      {/* FAQ */}
      <Section alt>
        <Reveal>
          <Eyebrow>{t(si.detail.faqs, locale)}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr ? "أسئلة متكررة — مصور فيديو زفاف دبي" : "FAQ — wedding videographer Dubai"}
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

      <UaeTravelSection locale={locale} />
      <CtaBand
        locale={locale}
        heading={isAr ? "مستعد لحجز مصور فيديو زفاف في دبي؟" : "Ready to book a wedding videographer in Dubai?"}
        waContext={isAr ? "بخصوص مصور فيديو زفاف في دبي." : "Re: wedding videographer Dubai."}
      />
    </>
  );
}