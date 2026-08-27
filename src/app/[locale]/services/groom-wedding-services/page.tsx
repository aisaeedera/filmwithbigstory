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

/*
 * Groom wedding services page, remediated 2026-08-17 (kanban t_0cac4210).
 * Claims and scope controls applied, source only, no deploy:
 * - Strategy audit WEDDING_WORKSTREAM_AUDIT_2026-07-31.md section 5.11
 * - Production sign-off section 8 first-lane matrix (one Recommended + one
 *   Enhanced scope, both unpriced, no a-la-carte menu)
 * - Compliance claim matrix C01-C20 (COMPLIANCE_QA_MALE_WEDDING_READINESS_
 *   MICRO_DEMO_RELEASE_CLAIMS_GATE_2026-07-31.md)
 * Removed per those controls: historical-stats claims, absolute crew
 * quantifiers, market-gap and competitor-practice comparisons,
 * crane-by-default promises, availability windows and date holds, and all
 * closed-lane content (aerial, women's lane, contract-signing ceremony,
 * traditional-performance specialty, dignitary protocol). No capability-demo
 * asset is referenced because Compliance placement gates remain closed.
 */

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return pageMeta({
    locale,
    title: isAr
      ? "خدمات تصوير العريس والأفراح الرجالية في دبي | طاقم رجالي | بيك ستوري"
      : "Groom Wedding Services Dubai & UAE | Male Crew | Big Story",
    description: isAr
      ? "تصوير العريس والأفراح الرجالية في دبي والإمارات. تحضير العريس وتغطية قاعة الرجال بطاقم رجالي، نطاق موصى به ونطاق موسّع، والتسعير لكل فعالية بعد دراسة يومكم."
      : "Groom and male-only wedding coverage in Dubai and the UAE. Groom preparation and wedding-day male hall coverage by a male crew, one Recommended and one Enhanced scope, quoted per event.",
    path: "/services/groom-wedding-services",
  });
}

const COPY = {
  eyebrow: { en: "Groom & Male Wedding Coverage", ar: "تصوير العريس والأفراح الرجالية" },
  h1: {
    en: "Groom wedding services in Dubai and the UAE, a male crew for male-only celebrations",
    ar: "خدمات تصوير العريس في دبي والإمارات، طاقم رجالي للأعراس والفعاليات الرجالية",
  },
  lead: {
    en: "Big Story covers groom preparation and wedding-day male hall coverage across Dubai, Abu Dhabi and the wider UAE. Groom preparation is included in every wedding package — Silver, Gold, and Platinum — not sold separately. The crew for this service is male, which matters for celebrations where the male hall is filmed by men. Each project is scoped in writing before anything is locked.",
    ar: "تغطي بيك ستوري تحضير العريس وتغطية قاعة الرجال في يوم الزفاف عبر دبي وأبوظبي وبقية الإمارات. تحضير العريس مشمول في كل باقة زفاف — فضية وذهبية وبلاتينية — لا يُباع منفصلاً. طاقم هذه الخدمة رجالي، وهذا مهم في الاحتفالات التي تُصوَّر فيها قاعة الرجال بطاقم رجالي. يُحدَّد نطاق كل مشروع كتابياً قبل تثبيت أي شيء.",
  },
};

// What the coverage includes. Aligned to the Production first-lane boundary:
// groom preparation + wedding-day male hall coverage on one event day.
const coverage = {
  en: [
    {
      n: "01",
      title: "Groom Preparation",
      body: "The hours before the groom walks in. The bisht being draped over the kandura, the ghutra and agal being set, mukhalat being applied, the barber finishing the line-up, the brothers and father helping with the cloak. Filmed close and cinematic in the majlis or hotel suite, working with natural window light and controlled fill so the fabric, the gold thread and the perfume bottle are framed with care. This is the calm before the celebration, and it is where the groom's film begins.",
      tags: ["bisht", "kandura", "mukhalat", "ghutra", "agal", "majlis", "barber"],
    },
    {
      n: "02",
      title: "Wedding-Day Male Hall Coverage",
      body: "Full coverage of the male hall on the wedding day. The entrance, the Marhaba receiving line, the seating of elders, the food service, the performances, the celebration. Filmed with a multi-camera crew working to a camera plan agreed in advance, with filming that stays discreet and respectful around elders and guests, coordinated with your planner. This is the backbone of a male wedding film, and it is where the full day is captured.",
      tags: ["entrance", "Marhaba", "elders", "male hall", "multi-camera", "discreet"],
    },
    {
      n: "03",
      title: "The Film You Take Home",
      body: "One 3 to 5 minute highlight film, one 15 to 20 minute key-event film where your programme supports it, and one 15-second vertical cut for social. Colour, sound and two revision rounds are included. The Enhanced scope adds a longer 5 to 7 minute highlight and an additional vertical cut, with revision rounds agreed at scoping. Delivery is private, for the family, and any public use is a separate written choice you make.",
      tags: ["highlight film", "key-event film", "vertical cut", "colour", "sound", "private delivery"],
    },
  ],
  ar: [
    {
      n: "01",
      title: "تحضير العريس",
      body: "الساعات التي تسبق دخول العريس. وضع البشت فوق الكندورة، ضبط الغترة والعقال، وضع المخلط، انتهاء الحلاق من التسريحة، مساعدة الإخوة والأب في ارتداء العباءة. تصوير قريب وسينمائي في المجلس أو جناح الفندق، بالإضاءة الطبيعية من النافذة وملء محكوم، بحيث تُؤطَّر القماشة والخيط الذهبي وقارورة العطر بعناية. هذه هي الهدوء الذي يسبق الاحتفال، ومن هنا يبدأ فيلم العريس.",
      tags: ["بشت", "كندورة", "مخلط", "غترة", "عقال", "مجلس", "حلاق"],
    },
    {
      n: "02",
      title: "تغطية قاعة الرجال يوم الزفاف",
      body: "تغطية كاملة لقاعة الرجال في يوم الزفاف. الدخول، صف المرحب، جلوس كبار السن، تقديم الطعام، العروض، الاحتفال. تُصوَّر بطاقم متعدد الكاميرات يعمل وفق خطة كاميرات متفق عليها مسبقاً، بتصوير متحفظ ومحترم حول كبار السن والضيوف، وبالتنسيق مع منظم الزفاف. هذا هو العمود الفقري لفيلم زفاف رجالي، وهنا يُلتقط اليوم كاملاً.",
      tags: ["الدخول", "المرحب", "كبار السن", "قاعة الرجال", "عدة كاميرات", "متحفظ"],
    },
    {
      n: "03",
      title: "الفيلم الذي تستلمه",
      body: "فيلم مختارات من 3 إلى 5 دقائق، وفيلم للفعاليات الرئيسية من 15 إلى 20 دقيقة إذا كان برنامجكم يدعم ذلك، ومقطع عمودي مدته 15 ثانية لوسائل التواصل. تدريج الألوان والصوت وجولتا التعديل مشمولة في النطاق. النطاق الموسّع يضيف فيلم مختارات أطول من 5 إلى 7 دقائق ومقطعاً عمودياً إضافياً، مع الاتفاق على جولات التعديل عند تحديد النطاق. التسليم خاص للعائلة، وأي استخدام عام خيار كتابي منفصل تتخذونه بأنفسكم.",
      tags: ["فيلم المختارات", "فيلم الفعاليات", "مقطع عمودي", "ألوان", "صوت", "تسليم خاص"],
    },
  ],
};

// Differentiators. Evidence-safe set: no absolute quantifiers, no competitor
// or market-practice comparisons, no blocked-lane capability claims.
const differentiators = {
  en: [
    {
      h: "A male crew for male-only settings",
      b: "Many UAE celebrations are gender-segregated, with a male hall or majlis where the filming team must be men. Groom coverage at Big Story is built around that requirement: the crew plan for this service is male, and it is written into the scope you approve before the day.",
    },
    {
      h: "Cinema tools, chosen per project",
      b: "Coverage draws on our Sony FX3 and Sony FX6 autofocus system cameras, and filtration from our owned set is used when the creative calls for it, selected with the director of photography at scoping rather than promised as a default on each camera. The look follows your day, not a template.",
    },
    {
      h: "Arabic-first delivery",
      b: "Coordination, call sheets and delivery in Arabic and English, with an Arabic-proficient sound recordist and an Arabic production guide in the crew plan. The groom's family receives a film in the language the celebration was filmed in.",
    },
    {
      h: "Discretion around elders and guests",
      b: "Filming at a UAE male wedding works around elders, guests and the hosting family. Camera positions are agreed with your planner ahead of the day, the crew stays out of the receiving line, and guests who should not appear on camera are coordinated in advance.",
    },
    {
      h: "Storyboarded key moments",
      b: "We plan your film's story before the day, not after. At scoping we map the key moments — the entrance, the vows, the first dance — so every camera knows what to capture and your film has a narrative arc, not just a sequence of clips.",
    },
  ],
  ar: [
    {
      h: "طاقم رجالي للفعاليات الرجالية",
      b: "كثير من احتفالات الإمارات منفصلة بين الجنسين، بقاعة رجال أو مجلس يجب أن يكون فريق التصوير فيه من الرجال. تغطية العريس لدى بيك ستوري مبنية حول هذا الشرط: خطة الطاقم لهذه الخدمة رجالية، وهي مكتوبة في النطاق الذي تعتمدونه قبل يوم الزفاف.",
    },
    {
      h: "أدوات سينمائية تُختار لكل مشروع",
      b: "تستند التغطية إلى كاميرات Sony FX3 و Sony FX6 بنظام التركيز التلقائي، ويُستخدم الترشيح من مجموعتنا المملوكة عندما يتطلبه الإبداع، باختيار مشترك مع مدير التصوير عند تحديد النطاق، لا كوعد افتراضي على كل كاميرا. المظهر يتبع يومكم، لا قالباً جاهزاً.",
    },
    {
      h: "تسليم عربي أولاً",
      b: "التنسيق وجداول العمل والتسليم بالعربية والإنجليزية، مع مسجل صوت ناطق بالعربية ومرشد إنتاج عربي في خطة الطاقم. عائلة العريس تستلم فيلماً باللغة التي صُوِّر بها الاحتفال.",
    },
    {
      h: "تحفظ حول كبار السن والضيوف",
      b: "التصوير في زفاف رجالي إماراتي يراعي كبار السن والضيوف والعائلة المضيفة. تُتفق مواضع الكاميرات مع منظم الزفاف قبل اليوم، ويبقى الطاقم خارج صف الاستقبال، ويُنسَّق مسبقاً أمر الضيوف الذين لا يجب أن تظهر صورهم.",
    },
    {
      h: "لحظات مخططة بستوري بورد",
      b: "نخطط قصة فيلمكم قبل اليوم، لا بعده. عند التخطيط نرسم اللحظات الرئيسية — الدخول، القسم، الرقصة الأولى — بحيث تعرف كل كاميرا ما يجب التقاطه ويكون لفيلمكم بنية سردية، لا مجرد تسلسل من المقاطع.",
    },
  ],
};

// Packages replace the retired scope architecture.
// Groom preparation is included in every wedding package — not sold separately.
const packages = {
  en: {
    eyebrow: "Wedding packages",
    h2: "Groom preparation is included in every package",
    lead: "Groom preparation and male hall coverage are part of the main Silver, Gold, and Platinum wedding packages — not a separate service. Every package includes 8 hours of coverage, crane/jib, and dedicated sound recording. Starting prices shown below; final pricing is confirmed after we scope your day.",
    silver: {
      name: "Silver",
      tagline: "Essential record",
      price: "Starting from AED 26,500",
      bullets: [
        "8 hours · 1 videographer (Sony FX3) · 1 photographer",
        "Crane/jib coverage included",
        "50 edited photographs + all RAW photos and originals",
        "3–5 min highlight film + ceremony edit",
        "Groom preparation + male hall coverage",
        "21-day delivery · 1 revision round",
      ],
    },
    gold: {
      name: "Gold",
      tagline: "Cinematic Wedding Story",
      price: "Starting from AED 31,500",
      bullets: [
        "8 hours · 2 videographers (Sony FX3 + Sony FX6 crane cam) · 1 photographer",
        "Crane/jib coverage included",
        "100 edited photographs + all RAW photos and originals",
        "5–8 min highlight + 15–20 min key-event film + 1 social cut",
        "Groom preparation + male hall coverage",
        "14-day delivery · 2 revision rounds",
      ],
    },
    platinum: {
      name: "Platinum",
      tagline: "Expanded coverage",
      price: "Starting from AED 36,500",
      bullets: [
        "8 hours · 2 videographers (Sony FX3 + Sony FX6 crane cam) · 2 photographers",
        "Crane/jib coverage included",
        "150 edited photographs + all RAW photos and originals",
        "Highlight + extended film + 3 social cuts",
        "Groom preparation + male hall coverage",
        "7-day delivery · 3 revision rounds",
      ],
    },
    cta: "Get a quotation",
    notes: "All packages include groom preparation and male hall coverage on one event day. Overtime, added locations, and public use are written change orders agreed before work starts.",
  },
  ar: {
    eyebrow: "باقات الزفاف",
    h2: "تحضير العريس مشمول في كل باقة",
    lead: "تحضير العريس وتغطية قاعة الرجال جزء من باقات الزفاف الرئيسية — فضية وذهبية وبلاتينية — لا خدمة منفصلة. كل باقة تشمل ٨ ساعات تغطية، رافعة/جيب، وتسجيل صوت مخصص. الأسعار البداية أدناه؛ يُؤكد التسعير النهائي بعد دراسة يومكم.",
    silver: {
      name: "فضية",
      tagline: "توثيق أساسي",
      price: "يبدأ من 26,500 درهم",
      bullets: [
        "٨ ساعات · مصور فيديو واحد (Sony FX3) · مصور فوتوغرافي واحد",
        "تغطية رافعة/جيب مشمولة",
        "٥٠ صورة معدلة + جميع صور RAW والأصول",
        "فيلم مختارات ٣–٥ دقائق + مونتاج الحفل",
        "تحضير العريس + تغطية قاعة الرجال",
        "تسليم خلال ٢١ يوم · جولة تعديل واحدة",
      ],
    },
    gold: {
      name: "ذهبية",
      tagline: "قصة زفاف سينمائية",
      price: "يبدأ من 31,500 درهم",
      bullets: [
        "٨ ساعات · مصورا فيديو (Sony FX3 + Sony FX6 كاميرا الرافعة) · مصور فوتوغرافي واحد",
        "تغطية رافعة/جيب مشمولة",
        "١٠٠ صورة معدلة + جميع صور RAW والأصول",
        "فيلم مختارات ٥–٨ دقائق + فيلم فعاليات رئيسية ١٥–٢٠ دقيقة + مقطع اجتماعي واحد",
        "تحضير العريس + تغطية قاعة الرجال",
        "تسليم خلال ١٤ يوم · جولتا تعديل",
      ],
    },
    platinum: {
      name: "بلاتينية",
      tagline: "تغطية موسعة",
      price: "يبدأ من 36,500 درهم",
      bullets: [
        "٨ ساعات · مصورا فيديو (Sony FX3 + Sony FX6 كاميرا الرافعة) · مصورا فوتوغرافيا",
        "تغطية رافعة/جيب مشمولة",
        "١٥٠ صورة معدلة + جميع صور RAW والأصول",
        "فيلم مختارات + فيلم موسع + ٣ مقاطع اجتماعية",
        "تحضير العريس + تغطية قاعة الرجال",
        "تسليم خلال ٧ أيام · ٣ جولات تعديل",
      ],
    },
    cta: "احصل على عرض سعر",
    notes: "جميع الباقات تشمل تحضير العريس وتغطية قاعة الرجال في يوم فعالية واحد. العمل الإضافي والمواقع الإضافية والاستخدام العام هي أوامر تغيير كتابية يُتفق عليها قبل بدء العمل.",
  },
};

const faqItems = {
  en: [
    {
      q: "Why a male crew for groom coverage?",
      a: "Many UAE weddings are gender-segregated, with a male hall or majlis where the filming team must be men. Groom coverage at Big Story is built around that requirement. The crew plan for this service is male, from the director of photography to sound, so preparation, family moments and the male hall celebration are filmed by a team your guests are comfortable with.",
    },
    {
      q: "What is the difference between the Recommended and Enhanced scope?",
      a: "Both scopes cover groom preparation and wedding-day male hall coverage on one event day of up to 10 hours, with the same deliverables set: a 3 to 5 minute highlight film, a 15 to 20 minute key-event film where your programme supports it, and a 15-second vertical cut. The Enhanced scope adds a crane or jib with a dedicated operator after venue, safety, payload, insurance and event-date checks, one additional camera role where the approved plan requires it, a longer 5 to 7 minute highlight, an additional vertical cut, and a third revision round.",
    },
    {
      q: "Is a crane included?",
      a: "Yes — crane/jib coverage with a dedicated operator is included in every wedding package: Silver, Gold, and Platinum. We confirm venue safety, payload and insurance checks before the day.",
    },
    {
      q: "What is cinema filtration and when do you use it?",
      a: "Cinema filtration is how we make your film feel like a memory, not a recording. Soft diffusion takes the harsh edge off bright lights and gives skin and fabric a warm, film-like quality. It is the difference between watching a video and reliving a moment. The look follows your day, not a template — chosen with your director at scoping to match the mood of your celebration.",
    },
    {
      q: "What do we receive?",
      a: "One 3 to 5 minute highlight film, one 15 to 20 minute key-event film where your programme supports it, and one 15-second vertical cut, with colour, sound and two revision rounds included. The Enhanced scope adds a longer 5 to 7 minute highlight and an additional vertical cut. Delivery is private, for the family; any public use is a separate written choice.",
    },
    {
      q: "What should the groom prepare?",
      a: "For the preparation session, have the bisht, kandura, ghutra, agal, mukhalat and any accessories ready in the majlis or suite before we start, and schedule the barber to finish shortly before filming begins. For portraits during the day, two kandura options work well, the bisht for the hero shots, and the watch and any personal items you want in frame. When we scope your day we share a short prep checklist.",
    },
    {
      q: "How do we start?",
      a: "Send a WhatsApp message with the date, venue and headcount. We scope the day with you, confirm what the coverage includes, and quote in writing. No commitment is made, and no crew or equipment is reserved, until the written scope and quote are accepted.",
    },
  ],
  ar: [
    {
      q: "لماذا طاقم رجالي لتغطية العريس؟",
      a: "كثير من حفلات الزفاف في الإمارات منفصلة بين الجنسين، بقاعة رجال أو مجلس يجب أن يكون فريق التصوير فيه من الرجال. تغطية العريس لدى بيك ستوري مبنية حول هذا الشرط. خطة الطاقم لهذه الخدمة رجالية، من مدير التصوير إلى الصوت، بحيث تُصوَّر لحظات التحضير والعائلة واحتفال قاعة الرجال بطاقم مرتاح له ضيوفكم.",
    },
    {
      q: "ما الفرق بين النطاق الموصى به والنطاق الموسّع؟",
      a: "كلا النطاقين يغطي تحضير العريس وتغطية قاعة الرجال في يوم فعالية واحد بحد أقصى 10 ساعات، بنفس حزمة المخرجات: فيلم مختارات من 3 إلى 5 دقائق، وفيلم فعاليات رئيسية من 15 إلى 20 دقيقة إذا كان برنامجكم يدعم ذلك، ومقطع عمودي مدته 15 ثانية. النطاق الموسّع يضيف رافع كاميرا (كرين أو جيب) مع مشغل مخصص بعد فحوص الموقع والسلامة والحمولة والتأمين وتاريخ الفعالية، ودور كاميرا إضافياً حيث تتطلبه الخطة المعتمدة، وفيلم مختارات أطول من 5 إلى 7 دقائق، ومقطعاً عمودياً إضافياً، وجولة تعديل ثالثة.",
    },
    {
      q: "هل الكرين مشمول؟",
      a: "نعم — تغطية الرافعة/الجيب مع مشغل مخصص مشمولة في كل باقة زفاف: فضية وذهبية وبلاتينية. نؤكد سلامة الموقع والحمولة والتأمين قبل اليوم.",
    },
    {
      q: "ما هو الترشيح السينمائي ومتى تستخدمونه؟",
      a: "الترشيح السينمائي هو كيف نجعل فيلمك يُشبه ذكرى، لا تسجيلاً. الانتشار الناعم يخفف الحدّة من الأضواء القاسية ويمنح البشرة والقماش جودة دافئة تشبه الفيلم. هو الفرق بين مشاهدة فيديو وإعادة لحظة. المظهر يتبع يومكم، لا قالباً — يُختار مع مخرجكم عند التخطيط ليناسب مزاج احتفالكم.",
    },
    {
      q: "ماذا نستلم؟",
      a: "فيلم مختارات من 3 إلى 5 دقائق، وفيلم فعاليات رئيسية من 15 إلى 20 دقيقة إذا كان برنامجكم يدعم ذلك، ومقطع عمودي مدته 15 ثانية، مع تدريج الألوان والصوت وجولتي تعديل مشمولة. النطاق الموسّع يضيف فيلم مختارات أطول من 5 إلى 7 دقائق ومقطعاً عمودياً إضافياً. التسليم خاص للعائلة؛ وأي استخدام عام خيار كتابي منفصل.",
    },
    {
      q: "ماذا يجب أن يحضّر العريس؟",
      a: "لجلسة التحضير، جهّزوا البشت والكندورة والغترة والعقال والمخلط وأي إكسسوارات في المجلس أو الجناح قبل البدء، وحدّدوا موعد الحلاق لينتهي قبل بدء التصوير بقليل. للبورتريه خلال اليوم، يناسب خياران للكندورة، البشت للقطات الرئيسية، والساعة وأي أشياء شخصية تريدونها في الإطار. عند تحديد نطاق يومكم نشارك قائمة تحضير قصيرة.",
    },
    {
      q: "كيف نبدأ؟",
      a: "أرسلوا رسالة واتساب بالتاريخ والموقع وعدد الضيوف. نحدد نطاق اليوم معكم، ونؤكد ما تتضمنه التغطية، ونقدّم عرضاً كتابياً. لا يُثبَّت أي شيء، ولا يُلتزم بأي طاقم أو معدات، قبل قبول النطاق والعرض الكتابيين.",
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
  const coverageList = isAr ? coverage.ar : coverage.en;
  const differentiatorList = isAr ? differentiators.ar : differentiators.en;
  const scopeBlock = isAr ? packages.ar : packages.en;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(locale, [
            { name: t(ui.breadcrumb.home, locale), path: "/" },
            { name: t(ui.nav.weddings, locale), path: "/weddings" },
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
              ? "خدمات تصوير العريس والأفراح الرجالية في دبي والإمارات. تحضير العريس مشمول في كل باقة زفاف — فضية وذهبية وبلاتينية."
              : "Groom and male-only wedding coverage in Dubai and the UAE. Groom preparation is included in every wedding package — Silver, Gold, and Platinum.",
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
            { name: t(ui.nav.weddings, locale), path: "/weddings" },
            { name: t(COPY.h1, locale) },
          ]}
        />
        <Reveal>
          <Eyebrow>{t(COPY.eyebrow, locale)}</Eyebrow>
          <h1 className="mt-6 max-w-5xl text-[clamp(2.4rem,5.5vw,4rem)] leading-[1.05]">{t(COPY.h1, locale)}</h1>
          <p className="bs-lead mt-8 !max-w-3xl">{t(COPY.lead, locale)}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button href={localizedPath(locale, "/wedding-quotation")}>
              {isAr ? "أنشئ عرض زفاف رجالي" : "Build a male-wedding quotation"}
            </Button>
            <a href={waLink(isAr ? "مهتم بتغطية العريس والأفراح الرجالية." : "Interested in groom wedding services.")} target="_blank" rel="noopener noreferrer" className="bs-btn bs-btn-gold">
              {t(ui.nav.startYourProject, locale)}
            </a>
            <Button href={localizedPath(locale, "/services/weddings")} variant="ghost">
              {isAr ? "صفحة الزفاف الرئيسية" : "Main weddings page"}
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* WHAT THE COVERAGE INCLUDES */}
      <Section>
        <Reveal>
          <Eyebrow>{isAr ? "ما تتضمنه التغطية" : "What the coverage includes"}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr ? "ما نغطيه، من تحضير العريس إلى قاعة الرجال" : "What we cover, from groom prep to the male hall"}
          </h2>
          <p className="bs-lead mt-6 !max-w-3xl">
            {isAr
              ? "تحضير العريس وتغطية قاعة الرجال في يوم الزفاف، بنطاق يُحدَّد لكل مشروع ويُتفق عليه كتابياً. هذه الكتل الثلاث تشكّل التغطية."
              : "Groom preparation and wedding-day male hall coverage, scoped per project and agreed in writing. These three blocks make up the coverage."}
          </p>
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {coverageList.map((m, i) => (
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
          {/* CTA card to fill the grid */}
          <Reveal delay={coverageList.length * 60} className="bs-card bs-card-hover flex flex-col justify-between">
            <div>
              <p className="bs-eyebrow !text-[color:var(--color-gold)] before:!bg-[color:var(--color-gold)]">
                {isAr ? "ابدأ تغطيتك" : "Start your coverage"}
              </p>
              <h3 className="mt-4 text-xl">
                {isAr ? "هل زفافك على الأبواب؟" : "Getting married soon?"}
              </h3>
              <p className="mt-3 text-sm text-[color:var(--color-muted)]">
                {isAr
                  ? "أرسل التاريخ والموقع وعدد الضيوف، ونحدد معكم نطاق التغطية الذي يناسب يومكم."
                  : "Send the date, venue and headcount, and we scope the coverage your day needs."}
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
            {isAr ? "خمس فروقات مبنية للسوق الإماراتي" : "Five differences built for the UAE market"}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {differentiatorList.map((d, i) => (
            <Reveal key={i} delay={i * 60} className="bs-card">
              <p className="bs-eyebrow">0{i + 1}</p>
              <h3 className="mt-4 text-xl">{d.h}</h3>
              <p className="mt-3 text-sm text-[color:var(--color-muted)]">{d.b}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* PACKAGES — groom preparation included in every package */}
      <Section id="packages">
        <Reveal>
          <Eyebrow>{scopeBlock.eyebrow}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">{scopeBlock.h2}</h2>
          <p className="bs-lead mt-6 !max-w-3xl">{scopeBlock.lead}</p>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {[
            { key: "silver" as const, highlight: false },
            { key: "gold" as const, highlight: true },
            { key: "platinum" as const, highlight: false },
          ].map((pkg, i) => {
            const data = scopeBlock[pkg.key];
            return (
              <Reveal key={pkg.key} delay={i * 70} className={`bs-card flex flex-col ${pkg.highlight ? "ring-2 ring-[color:var(--color-gold)]" : ""}`}>
                <p className="bs-eyebrow">{data.name}</p>
                <h3 className="mt-3 text-xl">{data.tagline}</h3>
                <p className="mt-4 text-lg font-semibold text-[color:var(--color-gold)]">{data.price}</p>
                <p className="mt-1 text-sm text-[color:var(--color-muted)]">
                  {isAr
                    ? `أو ${pkg.key === "silver" ? "6,625" : pkg.key === "gold" ? "7,875" : "9,125"} درهم / شهر لمدة ٤ أشهر`
                    : `or ${pkg.key === "silver" ? "AED 6,625" : pkg.key === "gold" ? "AED 7,875" : "AED 9,125"} / month for 4 months`}
                </p>
                <ul className="mt-6 space-y-3 flex-1">
                  {data.bullets.map((b: string, bi: number) => (
                    <li key={bi} className="flex gap-3 text-sm text-[color:var(--color-muted)]">
                      <span aria-hidden className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--color-accent)]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Button href={localizedPath(locale, "/wedding-quotation")} variant={pkg.highlight ? "gold" : "ghost"}>
                    {scopeBlock.cta}
                  </Button>
                </div>
              </Reveal>
            );
          })}
        </div>
        <p className="mt-8 text-xs text-[color:var(--color-muted)]">{scopeBlock.notes}</p>

        {/* Payment options */}
        <div className="mt-10">
          <h3 className="text-lg font-semibold">{isAr ? "خيارات الدفع" : "Payment options"}</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {/* Tabby */}
            <div className="bs-card">
              <div className="flex items-center gap-2">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#00C8B4"/><path d="M7 8h10v2H7V8zm0 3h7v2H7v-2zm0 3h10v2H7v-2z" fill="white"/></svg>
                <span className="font-semibold">Tabby</span>
              </div>
              <p className="mt-2 text-sm text-[color:var(--color-muted)]">{isAr ? "ادفع على ٤ دفعات بدون فوائد" : "Pay in 4 interest-free installments"}</p>
              <p className="mt-1 text-xs text-[color:var(--color-muted)]">{isAr ? "يبدأ من ٦,٦٢٥ درهم / شهر" : "Starting from AED 6,625 / month"}</p>
            </div>
            {/* Cash */}
            <div className="bs-card">
              <div className="flex items-center gap-2">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none"><rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/></svg>
                <span className="font-semibold">{isAr ? "نقداً" : "Cash"}</span>
              </div>
              <p className="mt-2 text-sm text-[color:var(--color-muted)]">{isAr ? "الدفع نقداً في يوم الفعالية · بدون رسوم" : "Pay cash on event day · No fees"}</p>
            </div>
            {/* Bank Transfer */}
            <div className="bs-card">
              <div className="flex items-center gap-2">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span className="font-semibold">{isAr ? "تحويل بنكي" : "Bank Transfer"}</span>
              </div>
              <p className="mt-2 text-xs"><span className="text-[color:var(--color-muted)]">{isAr ? "المستلم:" : "Beneficiary:"}</span> Big Story Film Production</p>
              <p className="text-xs"><span className="text-[color:var(--color-muted)]">IBAN:</span> AE090400000033353002001</p>
              <p className="text-xs"><span className="text-[color:var(--color-muted)]">{isAr ? "البنك:" : "Bank:"}</span> RAK Bank</p>
            </div>
          </div>
        </div>
      </Section>

      {/* LED WALL OPTIONS */}
      <Section alt>
        <Reveal>
          <Eyebrow>{isAr ? "جدران LED" : "LED walls"}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr ? "عزّزوا احتفالكم بجدار LED" : "Enhance your celebration with an LED wall"}
          </h2>
          <p className="bs-lead mt-6 !max-w-3xl">
            {isAr
              ? "جدار LED يحوّل قاعة احتفالكم إلى تجربة بصرية مذهلة. الضيوف يرون كل لحظة بوضوح، ويُضفي أجواءً سينمائية، ويخلق خلفيات مذهلة للتصوير والفيديو."
              : "An LED wall transforms your celebration hall into a visual experience. Guests see every moment clearly, it adds cinematic atmosphere, and creates stunning backdrops for photography and video."}
          </p>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {/* Standard LED Wall */}
          <Reveal className="bs-card">
            <p className="bs-eyebrow">{isAr ? "الأفضل قيمة" : "Best value"}</p>
            <h3 className="mt-3 text-xl">{isAr ? "جدار LED قياسي (3×3.5م)" : "Standard LED Wall (3×3.5m)"}</h3>
            <p className="mt-3 text-sm text-[color:var(--color-muted)]">
              {isAr
                ? "مثالي لمعظم حفلات الزفاف. يشمل الرافعة والمعالج والكابلات والفني والتركيب والفك."
                : "Ideal for most weddings. Includes riser, processor, cables, technician, installation and dismantling."}
            </p>
            <p className="mt-4 text-lg font-semibold text-[color:var(--color-gold)]">{isAr ? "6,125 درهم/يوم" : "AED 6,125/day"}</p>
          </Reveal>

          {/* Large LED Wall */}
          <Reveal className="bs-card ring-2 ring-[color:var(--color-gold)]" delay={70}>
            <p className="bs-eyebrow">{isAr ? "مميز" : "Premium"}</p>
            <h3 className="mt-3 text-xl">{isAr ? "جدار LED كبير (4×7م)" : "Large LED Wall (4×7m)"}</h3>
            <p className="mt-3 text-sm text-[color:var(--color-muted)]">
              {isAr
                ? "للمواقع الكبيرة. يشمل الطاقم الفني والتركيب والتشغيل."
                : "For larger venues. Includes technical crew, installation and operation."}
            </p>
            <p className="mt-4 text-lg font-semibold text-[color:var(--color-gold)]">{isAr ? "14,350 درهم/يوم" : "AED 14,350/day"}</p>
          </Reveal>

          {/* Custom LED Wall */}
          <Reveal className="bs-card" delay={140}>
            <p className="bs-eyebrow">{isAr ? "مخصص" : "Custom"}</p>
            <h3 className="mt-3 text-xl">{isAr ? "جدار LED مخصص" : "Custom LED Wall"}</h3>
            <p className="mt-3 text-sm text-[color:var(--color-muted)]">
              {isAr
                ? "لمتطلبات محددة. أحجام مخصصة متاحة. نقدم عرض سعر لكل مشروع."
                : "For specific requirements. Custom sizes available. We quote per project."}
            </p>
            <p className="mt-4 text-lg font-semibold text-[color:var(--color-gold)]">{isAr ? "تواصل معنا للسعر" : "Contact for pricing"}</p>
            <div className="mt-4">
              <a href={waLink(isAr ? "مهتم بجدار LED لحفل زفاف." : "Interested in an LED wall for a wedding.")} target="_blank" rel="noopener noreferrer" className="bs-btn bs-btn-ghost">
                {isAr ? "تواصل معنا" : "Contact us"}
              </a>
            </div>
          </Reveal>
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
