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
      ? "تصوير العريس وأفراح الرجال في دبي | بيك ستوري، طاقم رجالي بالكامل"
      : "Groom Wedding Photography & Videography Dubai | All-Male Crew | Big Story",
    description: isAr
      ? "تصوير العريس وأفراح الرجال في الإمارات، طاقم رجالي بالكامل، تحضير العريس، صور البورتريه، جلسات الصحاب، تغطية الأعياد الرجالية، وغيرها من خدمات تصوير الأفراح الرجالية في دبي."
      : "Groom and male-only wedding coverage in Dubai and the UAE. All-male crew for gender-segregated weddings, groom preparation, groomsmen and Al-Ayyala, male hall coverage. Cinema filtration, crane included.",
    path: "/services/groom-wedding-services",
  });
}

const COPY = {
  eyebrow: { en: "Groom & Male Wedding Coverage", ar: "تصوير العريس والأفراح الرجالية" },
  h1: {
    en: "Groom Wedding Services in Dubai, the male-only coverage the UAE market was missing",
    ar: "خدمات تصوير العريس في دبي، تغطية الأفراح الرجالية التي كان سوق الإمارات يفتقدها",
  },
  lead: {
    en: "Big Story shoots groom preparation, groom portraits, groomsmen and family groups, male-only pre-wedding sessions, and full wedding-day male hall coverage across Dubai, Abu Dhabi and the wider UAE. Every booking is crewed by an all-male team, because many UAE weddings are gender-segregated and female crew cannot film male-only events. Cinema filtration (Black Mist, Pro-Mist), a crane on every shoot, and VIP protocol for elders and dignitaries are standard. Male weddings only. Female coverage is coming soon.",
    ar: "تصوّر بيك ستوري تحضير العريس، صور البورتريه، جلسات الصحاب والعائلة، الجلسات ما قبل الزفاف للرجال فقط، وتغطية قاعة الرجال في يوم الزفاف عبر دبي وأبوظبي وبقية الإمارات. كل حجز يؤديه طاقم رجالي بالكامل، لأن كثيراً من حفلات الزفاف في الإمارات منفصلة بين الجنسين ولا يمكن لطاقم نسائي تصوير فعاليات رجالية فقط. ترشيح سينمائي (Black Mist، Pro-Mist)، رافع (كرين) في كل تصوير، وبروتوكول VIP لكبار السن والشخصيات المهمة هي معيار. أعمال زفاف رجالية فقط. تغطية نسائية قريباً.",
  },
  statsHeading: { en: "Groom wedding coverage in the UAE, by the numbers", ar: "تغطية زفاف العريس في الإمارات، بالأرقام" },
  statsBody: {
    en: "Data from Big Story's 2025, 2026 male-only wedding bookings across Dubai, Abu Dhabi, Sharjah and the Northern Emirates. The male wedding niche is underserved in UAE search and almost no studio fields a dedicated all-male crew. Every figure below is sourced from our production ledger.",
    ar: "بيانات من حجوزات الزفاف الرجالي فقط لدى بيك ستوري في 2025 و2026 عبر دبي وأبوظبي والشارقة والإمارات الشمالية. زاوية زفاف العريس غير مخدومة في البحث الإماراتي وتقريباً لا يوجد استوديو لديه طاقم رجالي مخصص بالكامل. كل رقم أدناه من سجل الإنتاج لدينا.",
  },
  stat1: { en: "100% male crew", ar: "طاقم رجالي 100٪" },
  stat1Label: { en: "Every groom and male-hall booking is crewed only by men, essential for gender-segregated weddings", ar: "كل حجز لعريس أو قاعة رجال يؤديه طاقم رجالي فقط، أساسي للأعراس المنفصلة بين الجنسين" },
  stat2: { en: "5 modules", ar: "5 وحدات" },
  stat2Label: { en: "Groom prep, portraits, groomsmen and family, male pre-wedding shoot, wedding-day male hall coverage", ar: "تحضير العريس، بورتريه، الصحاب والعائلة، تصوير ما قبل الزفاف للرجال، تغطية قاعة الرجال يوم الزفاف" },
  stat3: { en: "Crane + filtration", ar: "كرين + ترشيح" },
  stat3Label: { en: "Crane included on every groom shoot, Black Mist and Pro-Mist cinema filtration for a film look", ar: "كرين مشمول في كل تصوير عريس، ترشيح سينمائي Black Mist وPro-Mist لمظهر فيلم" },
  stat4: { en: "Al-Ayyala specialty", ar: "تخصص الأعياد والأيالة" },
  stat4Label: { en: "Specialty coverage of Al-Ayyala and harbiya traditional male dance performances, the cultural moment of the wedding", ar: "تغطية مخصصة لرقصة الأيالة والحربية التقليدية للرجال، لحظة الزفاف الثقافية" },
};

// The five service modules. Keep these in the order mp-producer scoped.
const modules = {
  en: [
    {
      n: "01",
      title: "Groom Preparation",
      body: "The hours before the groom walks in. Bisht being draped over the kandura, ghutra and agal being set, mukhalat being applied, the barber finishing the line-up, the brothers and father helping with the cloak. Shot close and cinematic in the majlis or hotel suite, with natural window light and controlled fill so the fabric, the gold thread and the perfume bottle all read on camera. This is the calm before the celebration and it is where the groom's film actually begins.",
      tags: ["bisht", "kandura", "mukhalat", "ghutra", "agal", "grooming", "barber"],
    },
    {
      n: "02",
      title: "Groom Portrait Session",
      body: "A dedicated groom portrait session, usually golden hour, usually solo. We shoot on cinema cameras with Black Mist and Pro-Mist filtration to soften highlights and lift the shadow rolloff, the same filtration used on narrative film sets. The look is a groom who reads as the hero of his own day, not a guest being photographed. Bisht, kandura and watch details are framed the way a menswear campaign would frame them. The output is a set of stills and a short portrait reel built for the groom's own family and social.",
      tags: ["golden hour", "Black Mist", "Pro-Mist", "portrait reel", "menswear framing"],
    },
    {
      n: "03",
      title: "Groomsmen and Family Groups",
      body: "The groomsmen, the brothers, the father, the uncles, the grandfather. Group portraits done properly, with everyone in frame, everyone in focus, the ghutra sitting right. This is also where Al-Ayyala happens, the traditional male dance performance with sticks, drums and synchronised movement, and it is the cultural moment of a UAE wedding. We cover it with multiple cameras, a crane for the wide, and tight safe angles for the close detail. Harbiya, the other major male performance form, is covered the same way.",
      tags: ["groomsmen", "father", "brothers", "Al-Ayyala", "harbiya", "family groups", "crane"],
    },
    {
      n: "04",
      title: "Male-Only Pre-Wedding Shoot",
      body: "A pre-wedding shoot for the groom, solo or with the groomsmen, before the wedding weekend. Three location flavours: desert (dunes, golden light, the kandura against sand), urban (Downtown Dubai, DIFC, the architectural backdrops that read as modern UAE), and heritage (Al Fahidi, restored forts, the old Dubai aesthetic). Shot cinematic with filtration, delivered as a short reel and a set of stills. This is the content the groom posts in the days running up to the wedding.",
      tags: ["desert", "urban", "heritage", "pre-wedding", "reel", "Downtown Dubai", "DIFC", "Al Fahidi"],
    },
    {
      n: "05",
      title: "Wedding Day Male Hall Coverage",
      body: "Full coverage of the male hall on the wedding day. The entrance, the Marhaba receiving line, the seating of elders and dignitaries, the food service, the performances, the celebration. Multi-camera, crane for the wide, and discrete close cameras for reaction and detail. VIP protocol is standard, we know how to film around elders and officials without being in the way. This is the backbone of a male wedding film and it is where the full day is captured.",
      tags: ["entrance", "Marhaba", "VIP protocol", "elders", "dignitaries", "male hall", "multi-camera"],
    },
  ],
  ar: [
    {
      n: "01",
      title: "تحضير العريس",
      body: "الساعات التي تسبق دخول العريس. وضع البشت فوق الكندورة، ضبط الغترة والعقال، وضع المخلط، انتهاء الحلاق من التسريحة، مساعدة الإخوة والأب في ارتداء العباءة. تصوير قريب وسينمائي في المجلس أو جناح الفندق، بإضاءة النافذة الطبيعية وملء محكوم بحيث تظهر القماشة والخيط الذهبي وقارورة العطر بوضوح على الكاميرا. هذه هي الهدوء قبل الاحتفال وهي حيث يبدأ فيلم العريس فعلاً.",
      tags: ["بشت", "كندورة", "مخلط", "غترة", "عقال", "حلاقة", "حلاق"],
    },
    {
      n: "02",
      title: "جلسة بورتريه العريس",
      body: "جلسة بورتريه مخصصة للعريس، عادة في الساعة الذهبية، وعادة منفرداً. نُصوّر بكاميرات سينمائية مع ترشيح Black Mist وPro-Mist لتنعيم الإضاءات العالية ورفع تدرج الظلال، نفس الترشيح المستخدم في مواقع الأفلام السردية. النتيجة عريس يبدو بطلاً في يومه، لا ضيفاً يُصوَّر. البشت والكندورة وتفاصيل الساعة تأطَّر كما تؤطرها حملات أزياء الرجال. المخرج مجموعة صور ومقطع بورتريه قصير مخصص لعائلة العريس ووسائل التواصل.",
      tags: ["الساعة الذهبية", "Black Mist", "Pro-Mist", "مقطع بورتريه", "تأطير أزياء الرجال"],
    },
    {
      n: "03",
      title: "الصحاب والعائلة",
      body: "الصحاب، الإخوة، الأب، الأعمام، الجد. صور جماعية تُؤدى بإتقان، الجميع في الإطار، الجميع في التركيز، الغترة جالسة بشكل صحيح. هنا أيضاً تحدث الأيالة، الرقصة التقليدية للرجال بالعصي والطبول والحركة المنسقة، وهي اللحظة الثقافية لزفاف إماراتي. نغطيها بعدة كاميرات، رافع (كرين) للزاوية الواسعة، وزوايا قريبة آمنة للتفاصيل. الحربية، شكل الأداء الرجالي الرئيسي الآخر، تُغطى بالطريقة نفسها.",
      tags: ["الصحاب", "الأب", "الإخوة", "الأيالة", "الحربية", "مجموعات العائلة", "كرين"],
    },
    {
      n: "04",
      title: "تصوير ما قبل الزفاف للرجال",
      body: "تصوير ما قبل الزفاف للعريس، منفرداً أو مع الصحاب، قبل عطلة الزفاف. ثلاثة نكهات مواقع: صحراء (كثبان، ضوء ذهبي، الكندورة أمام الرمل)، حضري (داون تاون دبي، مركز دبي المالي، الخلفيات المعمارية التي تقرأ كإمارات حديثة)، وتراث (الفهيدي، الحصون المرممة، جمال دبي القديم). يُصوَّر سينمائياً مع ترشيح، ويُسلَّم كمقطع قصير ومجموعة صور. هذا هو المحتوى الذي ينشره العريس في الأيام التي تسبق الزفاف.",
      tags: ["صحراء", "حضري", "تراث", "ما قبل الزفاف", "مقطع", "داون تاون دبي", "مركز دبي المالي", "الفهيدي"],
    },
    {
      n: "05",
      title: "تغطية قاعة الرجال يوم الزفاف",
      body: "تغطية كاملة لقاعة الرجال في يوم الزفاف. الدخول، صف المرحب، جلوس كبار السن والشخصيات المهمة، تقديم الطعام، العروض، الاحتفال. عدة كاميرات، كرين للزاوية الواسعة، وكاميرات قريبة منفصلة لرد الفعل والتفاصيل. بروتوكول VIP معياري، نعرف كيف نصور حول كبار السن والمسؤولين دون أن نكون في الطريق. هذا هو العمود الفقري لفيلم زفاف رجالي وهنا تُلتقط اليوم كاملاً.",
      tags: ["الدخول", "المرحب", "بروتوكول VIP", "كبار السن", "الشخصيات المهمة", "قاعة الرجال", "عدة كاميرات"],
    },
  ],
};

// Differentiators. Six cards, mirror the weddings "six elements" pattern.
const differentiators = {
  en: [
    {
      h: "All-male crew, always",
      b: "Every groom and male-hall booking is crewed only by men. This is essential for gender-segregated weddings where female crew cannot enter the male hall or majlis. We never send a mixed crew to a male-only event and we never substitute. If your wedding has a separate female hall, that is a different shoot and a different crew, and female coverage is coming soon.",
    },
    {
      h: "Cinema filtration as standard",
      b: "We shoot the groom with Black Mist and Pro-Mist cinema filtration, the same diffusion filters used on narrative film and high-end commercial sets. The filter softens harsh highlights on the bisht's gold thread, lifts the shadow rolloff on the kandura, and gives the image a film texture instead of a video look. Most wedding videographers do not carry this filtration because it is a cinema technique, not a wedding one.",
    },
    {
      h: "Crane included on every shoot",
      b: "A crane is included on every groom shoot, not sold as an add-on. For Al-Ayyala and harbiya performances the crane gives the wide overhead that makes the formation read, and for the male hall it gives the establishing shot that shows the scale of the celebration. Carrying, rigging and operating a crane on a wedding day is a real cost and a real skill, which is why most crews skip it.",
    },
    {
      h: "Al-Ayyala specialty coverage",
      b: "Al-Ayyala is the cultural moment of a UAE male wedding and we cover it as a specialty, not an afterthought. Multiple cameras, crane wide, safe close angles, and coverage of the drummers and the stick work. We know the rhythm of the performance, when the formation peaks, and where to stand without breaking the line. Harbiya is covered the same way.",
    },
    {
      h: "VIP protocol for elders and dignitaries",
      b: "UAE male weddings seat elders, sheikhs and government officials, and the filming has to respect that. We film with long lenses from a distance during the Marhaba and seating, never approach the head table uninvited, and coordinate with the wedding planner on which guests cannot be on camera. Discretion is part of the service, not an extra.",
    },
    {
      h: "Built for the Arabic-first market",
      b: "This page exists because the male wedding niche is underserved in UAE search. Most studios market only to the bride and treat the groom as a secondary subject. We treat the groom as the subject. Groom preparation video, groomsmen photography, and male wedding video in the UAE are real search categories with almost no dedicated providers, and we built this service to fill that gap.",
    },
  ],
  ar: [
    {
      h: "طاقم رجالي بالكامل، دائماً",
      b: "كل حجز لعريس أو قاعة رجال يؤديه طاقم رجالي فقط. هذا أساسي للأعراس المنفصلة بين الجنسين حيث لا يمكن لطاقم نسائي دخول قاعة الرجال أو المجلس. لا نرسل أبداً طاقماً مختلطاً لحدث رجالي فقط ولا نستبدل. إذا كان لزفافك قاعة نسائية منفصلة، فهذا تصوير مختلف وطاقم مختلف، وتغطية نسائية قريباً.",
    },
    {
      h: "ترشيح سينمائي كمعيار",
      b: "نُصوّر العريس بترشيح سينمائي Black Mist وPro-Mist، نفس الفلاتر المنتشرة المستخدمة في مواقع الأفلام السردية والإعلانات الراقية. الفلتر ينعّم الإضاءات العالية القاسية على خيط البشت الذهبي، يرفع تدرج الظلال على الكندورة، ويمنح الصورة ملمس فيلم بدلاً من مظهر فيديو. معظم مصوري فيديو الزفاف لا يحملون هذا الترشيح لأنه تقنية سينمائية، لا تقنية زفاف.",
    },
    {
      h: "كرين مشمول في كل تصوير",
      b: "الكرين مشمول في كل تصوير عريس، لا يُباع كإضافة. لعروض الأيالة والحربية يعطي الكرين الزاوية الواسعة العلوية التي تجعل التشكيل يقرأ، ولقاعة الرجال يعطي اللقطة التأسيسية التي تظهر حجم الاحتفال. حمل وتركيب وتشغيل الكرين في يوم الزفاف تكلفة حقيقية ومهارة حقيقية، ولهذا يتجاهله معظم الطواقم.",
    },
    {
      h: "تغطية مخصصة للأيالة",
      b: "الأيالة هي اللحظة الثقافية لزفاف رجالي إماراتي ونغطيها كتخصص، لا كأمر ثانوي. عدة كاميرات، زاوية كرين واسعة، زوايا قريبة آمنة، وتغطية للاطبال والعصي. نعرف إيقاع الأداء، متى يبلغ التشكيل ذروته، وأين نقف دون كسر الصف. الحربية تُغطى بالطريقة نفسها.",
    },
    {
      h: "بروتوكول VIP لكبار السن والشخصيات المهمة",
      b: "الأفراح الرجالية في الإمارات تجلس كبار السن والشيوخ والمسؤولين، والتصوير يجب أن يحترم ذلك. نُصوّر بعدسات طويلة من مسافة خلال المرحب والجلوس، لا نقترب من الطاولة الرئيسية دون دعوة، ونتناسق مع منظم الزفاف حول من لا يمكن أن يظهر على الكاميرا. التقدير جزء من الخدمة، لا إضافة.",
    },
    {
      h: "مبني للسوق العربي أولاً",
      b: "هذه الصفحة موجودة لأن زاوية زفاف العريس غير مخدومة في البحث الإماراتي. معظم الاستوديوهات تسوّق للعروس فقط وتعامل العريس كموضوع ثانوي. نحن نعامل العريس كموضوع. فيديو تحضير العريس، تصوير الصحاب، وفيديو الأفراح الرجالية في الإمارات فئات بحث حقيقية لا يكاد يوجد لها مزودون مخصصون، وبنينا هذه الخدمة لملء هذه الفجوة.",
    },
  ],
};

// Pricing reuses the existing wedding tiers. Do not create new prices here.
const pricingReference = {
  en: {
    eyebrow: "Pricing, reuses the wedding tiers",
    h2: "Groom coverage uses the same four tiers as our wedding packages",
    lead: "We did not build a separate price list for groom coverage because the crew, the kit, the hours and the deliverables are the same as the main wedding packages. Pick the tier that matches the scale of your day, then we scope which of the five modules you need. The full tier breakdown, what is in each video and photo package, and the add-on menu are on the main weddings page.",
    headers: ["Tier", "From", "Best for a groom booking"],
    rows: [
      { tier: "Tier 1, Solo Cinema", from: "AED 8,000", bestFor: "Groom preparation + portrait session, single majlis or hotel suite, half day" },
      { tier: "Tier 2, Wedding Day", from: "AED 16,000", bestFor: "Full wedding-day male hall coverage, multi-camera, crane, Al-Ayyala. The most-booked tier for a male wedding", featured: true },
      { tier: "Tier 3, Premium Production", from: "AED 26,000+", bestFor: "Two-day coverage, prep + wedding day, full cinema crew, multi-location, printed album credit" },
      { tier: "Tier 4, Photo-only", from: "AED 9,500", bestFor: "Groom and groomsmen stills only, no video crew on site, lay-flat album included" },
    ],
    note: "Add-ons bolt on to any tier: same-day teaser +AED 4,500, drone +AED 1,500, extra photographer +AED 2,500, extra videographer +AED 3,500, printed album +AED 3,500. Full breakdown on the main weddings page.",
  },
  ar: {
    eyebrow: "الأسعار، تعيد استخدام باقات الزفاف",
    h2: "تغطية العريس تستخدم نفس الباقات الأربع لحزم الزفاف",
    lead: "لم نبنِ قائمة أسعار منفصلة لتغطية العريس لأن الطاقم والمعدات والساعات والمخرجات هي نفسها لباقات الزفاف الرئيسية. اختر الباقة التي تناسب حجم يومك، ثم نحدد أي الوحدات الخمس تحتاجها. تفصيل الباقات الكامل، ما في كل حزمة فيديو وصور، وقائمة الإضافات في الصفحة الرئيسية للزفاف.",
    headers: ["الباقة", "من", "الأنسب لحجز العريس"],
    rows: [
      { tier: "الباقة 1، سينما فردية", from: "8,000 درهم", bestFor: "تحضير العريس + جلسة بورتريه، مجلس واحد أو جناح فندق، نصف يوم" },
      { tier: "الباقة 2، يوم الزفاف", from: "16,000 درهم", bestFor: "تغطية قاعة الرجال الكاملة يوم الزفاف، عدة كاميرات، كرين، الأيالة. الباقة الأكثر حجزاً لزفاف رجالي", featured: true },
      { tier: "الباقة 3، الإنتاج المتميز", from: "26,000+ درهم", bestFor: "تغطية يومين، تحضير + يوم الزفاف، طاقم سينمائي كامل، عدة مواقع، رصيد ألبوم مطبوع" },
      { tier: "الباقة 4، صور فقط", from: "9,500 درهم", bestFor: "صور العريس والصحاب فقط، بلا طاقم فيديو، ألبوم lay-flat مشمول" },
    ],
    note: "الإضافات تُلحق بأي باقة: تشويق نفس اليوم +4,500 درهم، درون +1,500 درهم، مصور إضافي +2,500 درهم، مصور فيديو إضافي +3,500 درهم، ألبوم مطبوع +3,500 درهم. التفصيل الكامل في صفحة الزفاف الرئيسية.",
  },
};

const faqItems = {
  en: [
    {
      q: "Why do I need an all-male crew for my wedding?",
      a: "Many UAE weddings are gender-segregated, with a separate male hall or majlis where female crew are not permitted to film. A mixed crew simply cannot cover the male side of the event. Big Story fields a dedicated all-male team for every groom and male-hall booking, so the groom preparation, the groomsmen, Al-Ayyala, and the full male hall celebration are all captured by men, with no compromise on access or coverage.",
    },
    {
      q: "What is Al-Ayyala and why does it need specialty coverage?",
      a: "Al-Ayyala is the traditional UAE male dance performance, with two rows of men facing each other, sticks and swords, drummers, and synchronised movement. It is the cultural centrepiece of a male wedding and the moment families most want filmed. It needs multiple cameras, a crane for the wide overhead, and safe close angles, because the formation moves, the light is often mixed, and a single static camera will miss it. We also cover harbiya, the other major male performance form, the same way.",
    },
    {
      q: "What is Black Mist and Pro-Mist filtration and why does it matter for groom coverage?",
      a: "Black Mist and Pro-Mist are cinema diffusion filters placed in front of the lens. They soften harsh highlights, lift shadow detail, and give the image a film texture rather than a video look. On a groom, this matters because the gold thread on the bisht and the white of the kandura are both very hard for a camera to hold without blowing out. Filtration keeps the detail in the fabric. Most wedding videographers do not carry these filters because they are a cinema technique, not a wedding one.",
    },
    {
      q: "Is the crane really included, or is it an add-on?",
      a: "The crane is included on every groom shoot, not sold as an add-on. For Al-Ayyala and harbiya the crane gives the wide overhead that shows the full formation, and for the male hall it gives the establishing shot that shows the scale of the celebration. Rigging and operating a crane on a wedding day is a real cost and skill, which is why most crews skip it or charge extra. We include it because without it the key moments of a male wedding do not read.",
    },
    {
      q: "Do you cover the henna night?",
      a: "We do not list the henna night as a standalone service. We cover all male events across the wedding weekend, so if there is a male component to the henna night or any other pre-wedding gathering, it is scoped as part of the weekend coverage rather than booked separately. Tell us the full run of events and we build the coverage around them.",
    },
    {
      q: "Can you cover the Katb Kitab, the marriage contract signing?",
      a: "The Katb Kitab, the marriage contract signing, has separate audio needs, with the officiant, the witnesses and often a live recitation, so we do not bundle it into the standard groom package. We cross-link it to the main services page, where the audio and ceremony capture requirements are scoped properly. If your Katb Kitab is part of the male hall program on the wedding day, we cover it as part of that day, but a standalone Katb Kitab booking is handled through the services page.",
    },
    {
      q: "Do you film female weddings?",
      a: "Male weddings only, for now. Female coverage is coming soon. Because UAE weddings are often gender-segregated, covering the female side requires a dedicated all-female crew, which is a separate team and a separate service. If your wedding has both a male and a female hall, the male side is covered by this service and the female side will be covered by the female crew when it launches.",
    },
    {
      q: "What should the groom wear and prepare for the prep and portrait sessions?",
      a: "For the preparation session, have the bisht, kandura, ghutra, agal, mukhalat and any accessories ready in the majlis or suite before we arrive, and schedule the barber to finish about 30 minutes before we start shooting. For the portrait session, golden hour is best, and we recommend two kandura options, the bisht for the hero shots, and the watch and any personal items you want in frame. We send a short prep checklist on booking.",
    },
    {
      q: "How far in advance should I book groom coverage?",
      a: "Saturday peak-season weddings from October to April book 6 to 9 months ahead. Off-peak and Friday weddings are usually available with 2 to 3 months notice. A groom preparation and portrait session only can sometimes be booked with 4 to 6 weeks notice. Once your date is confirmed, send a WhatsApp with the venue, the headcount and which modules you need, and we hold the date for 7 days while we scope the package.",
    },
  ],
  ar: [
    {
      q: "لماذا أحتاج طاقماً رجالياً بالكامل لزفافي؟",
      a: "كثير من حفلات الزفاف في الإمارات منفصلة بين الجنسين، بقاعة رجال أو مجلس منفصل لا يُسمح للطاقم النسائي بالتصوير فيه. الطاقم المختلط ببساطة لا يستطيع تغطية الجانب الرجالي للفعالية. توفر بيك ستوري طاقماً رجالياً مخصصاً بالكامل لكل حجز عريس أو قاعة رجال، بحيث يلتقط تحضير العريس والصحاب والأيالة والاحتفال الكامل في قاعة الرجال رجالاً، دون أي تنازل عن الوصول أو التغطية.",
    },
    {
      q: "ما هي الأيالة ولماذا تحتاج تغطية مخصصة؟",
      a: "الأيالة هي الرقصة التقليدية للرجال في الإمارات، صفّان من الرجال متقابلان، عصي وسيوف، اطبال، وحركة منسقة. هي المحور الثقافي لزفاف رجالي واللحظة التي تريد العائلات تصويرها أكثر. تحتاج عدة كاميرات، كرين للزاوية الواسعة العلوية، وزوايا قريبة آمنة، لأن التشكيل يتحرك والإضاءة غالباً مختلطة، وكاميرا ثابتة واحدة ستفوتها. نغطي أيضاً الحربية، شكل الأداء الرجالي الرئيسي الآخر، بالطريقة نفسها.",
    },
    {
      q: "ما هو ترشيح Black Mist وPro-Mist ولماذا يهم لتغطية العريس؟",
      a: "Black Mist وPro-Mist فلاتر انتشار سينمائية توضع أمام العدسة. تنعّم الإضاءات القاسية، ترفع تفاصيل الظلال، وتمنح الصورة ملمس فيلم بدلاً من مظهر فيديو. بالنسبة للعريس، يهم هذا لأن الخيط الذهبي على البشت وأبيض الكندورة كلاهما صعب جداً على الكاميرا أن تحتفظ به دون انفجار. الترشيح يحتفظ بالتفاصيل في القماش. معظم مصوري فيديو الزفاف لا يحملون هذه الفلاتر لأنها تقنية سينمائية، لا تقنية زفاف.",
    },
    {
      q: "هل الكرين مشمول فعلاً، أم أنه إضافة؟",
      a: "الكرين مشمول في كل تصوير عريس، لا يُباع كإضافة. للأيالة والحربية يعطي الكرين الزاوية الواسعة العلوية التي تُظهر التشكيل كاملاً، ولقاعة الرجال يعطي اللقطة التأسيسية التي تُظهر حجم الاحتفال. تركيب وتشغيل الكرين في يوم الزفاف تكلفة ومهارة حقيقية، ولهذا يتجاهله معظم الطواقم أو يفرض رسوماً إضافية. نحن نشمله لأن بدونه لا تُقرأ اللحظات الرئيسية لزفاف رجالي.",
    },
    {
      q: "هل تغطون ليلة الحناء؟",
      a: "لا ندرج ليلة الحناء كخدمة منفردة. نغطي جميع الفعاليات الرجالية عبر عطلة الزفاف، فإذا كان هناك مكوّن رجالي لليلة الحناء أو أي تجمع آخر قبل الزفاف، يُحدد نطاقه ضمن تغطية العطلة بدلاً من حجزه منفصلاً. أخبرونا بالسلسلة الكاملة للفعاليات ونبني التغطية حولها.",
    },
      {
      q: "هل يمكنكم تغطية كتب الكتاب، توقيع عقد الزواج؟",
      a: "كتب الكتاب، توقيع عقد الزواج، له متطلبات صوت منفصلة، مع المأذون والشهود وغالباً تلاوة مباشرة، لذلك لا ندمجه في باقة العريس القياسية. نربطه بصفحة الخدمات الرئيسية، حيث تُحدد متطلبات الصوت والتقاط الحفل بشكل صحيح. إذا كان كتب الكتاب جزءاً من برنامج قاعة الرجال في يوم الزفاف، نغطيه ضمن ذلك اليوم، لكن حجز كتب الكتاب المنفرد يُدار عبر صفحة الخدمات.",
    },
    {
      q: "هل تصوّرون حفلات الزفاف النسائية؟",
      a: "أعمال زفاف رجالية فقط، حالياً. تغطية نسائية قريباً. لأن حفلات الزفاف في الإمارات غالباً منفصلة بين الجنسين، فإن تغطية الجانب النسائي تتطلب طاقماً نسائياً مخصصاً بالكامل، وهو فريق منفصل وخدمة منفصلة. إذا كان لزفافك قاعة رجالية وقاعة نسائية، فإن الجانب الرجالي تغطيه هذه الخدمة والجانب النسائي سيغطيه الطاقم النسائي عند إطلاقه.",
    },
    {
      q: "ماذا يجب أن يرتدي العريس ويحضّر لجلسات التحضير والبورتريه؟",
      a: "لجلسة التحضير، جهّز البشت والكندورة والغترة والعقال والمخلط وأي إكسسوارات في المجلس أو الجناح قبل وصولنا، واجدول الحلاق لينتهي قبل بدء التصوير بـ30 دقيقة تقريباً. لجلسة البورتريه، الساعة الذهبية أفضل، وننصح بخيارين للكندورة، البشت للقطات البطل، والساعة وأي أشياء شخصية تريدها في الإطار. نرسل قائمة تحضير قصيرة عند الحجز.",
    },
    {
      q: "كم مقدماً يجب أن أحجز تغطية العريس؟",
      a: "حفلات الزفاف في موسم الذروة من أكتوبر إلى أبريل يوم السبت تُحجز قبل 6 إلى 9 أشهر. خارج الذروة وحفلات الجمعة تتوفر عادة بإشعار 2 إلى 3 أشهر. جلسة تحضير وبورتريه للعريس فقط يمكن أحياناً الحجز بإشعار 4 إلى 6 أسابيع. بمجرد تأكيد التاريخ، أرسل واتساب بالموقع وعدد الضيوف والوحدات التي تحتاجها، ونحجز التاريخ 7 أيام ريثما نحدد نطاق الباقة.",
    },
  ],
};

const relatedServices = services.filter((s) =>
  ["cinematic-wedding", "event-coverage", "documentary", "tvc-production"].includes(s.slug)
);

export default async function GroomWeddingServicesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const path = "/services/groom-wedding-services";
  const url = `${SITE.domain}${localizedPath(locale, path)}`;
  const isAr = locale === "ar";

  const itemFaqs = isAr ? faqItems.ar : faqItems.en;
  const moduleList = isAr ? modules.ar : modules.en;
  const differentiatorList = isAr ? differentiators.ar : differentiators.en;
  const pricingBlock = isAr ? pricingReference.ar : pricingReference.en;

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
            datePublished: "2026-07-27",
            authorName: "Big Story Editorial",
          }),
          serviceSchema({
            locale,
            name: isAr ? "تصوير العريس والأفراح الرجالية في دبي" : "Groom Wedding Photography & Videography in Dubai",
            description: isAr
              ? "خدمات تصوير العريس والأفراح الرجالية في دبي والإمارات، طاقم رجالي بالكامل، تحضير العريس، بورتريه، الصحاب والعائلة، تصوير ما قبل الزفاف للرجال، تغطية قاعة الرجال يوم الزفاف."
              : "Groom and male-only wedding coverage in Dubai and the UAE. All-male crew, groom preparation, portraits, groomsmen and Al-Ayyala, male hall coverage. Cinema filtration, crane included.",
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
            <a href={waLink(isAr ? "مهتم بتغطية العريس والأفراح الرجالية." : "Interested in groom wedding services.")} target="_blank" rel="noopener noreferrer" className="bs-btn bs-btn-gold">
              {t(ui.nav.startYourProject, locale)}
            </a>
            <Button href={localizedPath(locale, "/services/weddings")} variant="ghost">
              {isAr ? "صفحة الزفاف الرئيسية" : "Main weddings page"}
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* ORIGINAL DATA, by the numbers */}
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

      {/* FIVE SERVICE MODULES */}
      <Section>
        <Reveal>
          <Eyebrow>{isAr ? "خمس وحدات خدمة" : "Five service modules"}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr ? "ما نغطيه، من تحضير العريس إلى قاعة الرجال" : "What we cover, from groom prep to the male hall"}
          </h2>
          <p className="bs-lead mt-6 !max-w-3xl">
            {isAr
              ? "خمس وحدات منفصلة. يمكن حجز واحدة أو دمجها عبر عطلة الزفاف. كل وحدة لها طاقم رجالي بالكامل، ترشيح سينمائي، وكرين."
              : "Five standalone modules. Book one, or combine them across the wedding weekend. Every module is crewed by an all-male team, with cinema filtration and a crane."}
          </p>
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {moduleList.map((m, i) => (
            <Reveal key={i} delay={i * 60} className="bs-card">
              <p className="bs-eyebrow">{m.n}</p>
              <h3 className="mt-4 text-xl">{m.title}</h3>
              <p className="mt-3 text-sm text-[color:var(--color-muted)]">{m.body}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {m.tags.map((tag, ti) => (
                  <span key={ti} className="inline-block rounded-full bg-[color:var(--color-bg-alt)] px-3 py-1 text-[11px] uppercase tracking-wide text-[color:var(--color-muted)]">
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
          {/* CTA card to fill the 6th slot in the 3-col grid */}
          <Reveal delay={moduleList.length * 60} className="bs-card bs-card-hover flex flex-col justify-between">
            <div>
              <p className="bs-eyebrow !text-[color:var(--color-gold)] before:!bg-[color:var(--color-gold)]">
                {isAr ? "احجز تغطيتك" : "Book your coverage"}
              </p>
              <h3 className="mt-4 text-xl">
                {isAr ? "هل تزف قريباً؟" : "Getting married soon?"}
              </h3>
              <p className="mt-3 text-sm text-[color:var(--color-muted)]">
                {isAr
                  ? "أرسل التاريخ والموقع وعدد الضيوف، ونحدد الوحدات التي تحتاجها ونحجز التاريخ لـ7 أيام."
                  : "Send the date, venue and headcount, we scope the modules you need and hold the date for 7 days."}
              </p>
            </div>
            <a
              href={waLink(isAr ? "مهتم بتغطية العريس والأفراح الرجالية." : "Interested in groom wedding services.")}
              target="_blank"
              rel="noopener noreferrer"
              className="bs-btn bs-btn-gold mt-6 self-start"
            >
              {isAr ? "ابدأ على واتساب" : "Start on WhatsApp"}
            </a>
          </Reveal>
        </div>
      </Section>

      {/* KEY DIFFERENTIATORS */}
      <Section alt>
        <Reveal>
          <Eyebrow>{isAr ? "لماذا بيك ستوري لتغطية العريس" : "Why Big Story for groom coverage"}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr ? "ستة فروقات مبنية للسوق الإماراتي" : "Six differences built for the UAE market"}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {differentiatorList.map((d, i) => (
            <Reveal key={i} delay={i * 60} className="bs-card">
              <p className="bs-eyebrow">0{i + 1}</p>
              <h3 className="mt-4 text-xl">{d.h}</h3>
              <p className="mt-3 text-sm text-[color:var(--color-muted)]">{d.b}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* PRICING REFERENCE, reuses wedding tiers */}
      <Section id="pricing">
        <Reveal>
          <Eyebrow>{pricingBlock.eyebrow}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">{pricingBlock.h2}</h2>
          <p className="bs-lead mt-6 !max-w-3xl">{pricingBlock.lead}</p>
        </Reveal>
        <div className="mt-12 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[color:var(--color-line)]">
                {pricingBlock.headers.map((h, i) => (
                  <th
                    key={i}
                    className={
                      "py-4 pr-6 text-left text-sm font-medium " +
                      (i === 1
                        ? "text-[color:var(--color-accent)]"
                        : "text-[color:var(--color-muted)]")
                    }
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pricingBlock.rows.map((row, i) => (
                <tr
                  key={i}
                  className={
                    "border-b border-[color:var(--color-line)] align-top " +
                    (row.featured ? "bg-[color:var(--color-bg-alt)]/40" : "")
                  }
                >
                  <td className="py-5 pr-6 text-sm font-medium">
                    {row.tier}
                    {row.featured && (
                      <span className="ml-2 inline-block rounded-full bg-[color:var(--color-accent)]/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-[color:var(--color-accent)]">
                        {isAr ? "الأكثر حجزاً" : "Most-booked"}
                      </span>
                    )}
                  </td>
                  <td className="py-5 pr-6 text-sm font-semibold text-[color:var(--color-accent)] whitespace-nowrap">
                    {row.from}
                  </td>
                  <td className="py-5 pr-6 text-xs text-[color:var(--color-muted)]">{row.bestFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-8 text-xs text-[color:var(--color-muted)]">{pricingBlock.note}</p>
        <div className="mt-8">
          <Button href={localizedPath(locale, "/services/weddings")} variant="ghost">
            {isAr ? "تفصيل الباقات الكامل" : "Full package breakdown"}
          </Button>
        </div>
      </Section>

      {/* FAQ */}
      <Section alt>
        <Reveal>
          <Eyebrow>{t(si.detail.faqs, locale)}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr ? "أسئلة متكررة، تصوير العريس والأفراح الرجالية" : "FAQ, groom and male wedding coverage"}
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

      <UaeTravelSection locale={locale} />
      <CtaBand
        locale={locale}
        heading={isAr ? "مستعد لتغطية عريسك؟" : "Ready to cover your groom?"}
        waContext={isAr ? "بخصوص تصوير العريس والأفراح الرجالية." : "Re: groom wedding services."}
      />
    </>
  );
}
