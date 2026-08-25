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
    en: "Big Story covers groom preparation and wedding-day male hall coverage across Dubai, Abu Dhabi and the wider UAE. The crew for this service is male, which matters for celebrations where the male hall is filmed by men. Each project is scoped in writing before anything is locked: one event day, one agreed coverage plan, and a clear list of deliverables.",
    ar: "تغطي بيك ستوري تحضير العريس وتغطية قاعة الرجال في يوم الزفاف عبر دبي وأبوظبي وبقية الإمارات. طاقم هذه الخدمة رجالي، وهذا مهم في الاحتفالات التي تُصوَّر فيها قاعة الرجال بطاقم رجالي. يُحدَّد نطاق كل مشروع كتابياً قبل تثبيت أي شيء: يوم فعالية واحد، خطة تغطية متفق عليها، وقائمة مخرجات واضحة.",
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
      b: "Coverage draws on our owned RED cinema kit, and filtration from our owned set is used when the creative calls for it, selected with the director of photography at scoping rather than promised as a default on each camera. The look follows your day, not a template.",
    },
    {
      h: "Arabic-first delivery",
      b: "Coordination, call sheets and delivery in Arabic and English, with an Arabic-proficient sound recordist and an Arabic production guide in the crew plan. The groom's family receives a film in the language the celebration was filmed in.",
    },
    {
      h: "Discretion around elders and guests",
      b: "Filming at a UAE male wedding works around elders, guests and the hosting family. Camera positions are agreed with your planner ahead of the day, the crew stays out of the receiving line, and guests who should not appear on camera are coordinated in advance.",
    },
  ],
  ar: [
    {
      h: "طاقم رجالي للفعاليات الرجالية",
      b: "كثير من احتفالات الإمارات منفصلة بين الجنسين، بقاعة رجال أو مجلس يجب أن يكون فريق التصوير فيه من الرجال. تغطية العريس لدى بيك ستوري مبنية حول هذا الشرط: خطة الطاقم لهذه الخدمة رجالية، وهي مكتوبة في النطاق الذي تعتمدونه قبل يوم الزفاف.",
    },
    {
      h: "أدوات سينمائية تُختار لكل مشروع",
      b: "تستند التغطية إلى حزمة كاميرات RED السينمائية المملوكة لدينا، ويُستخدم الترشيح من مجموعتنا المملوكة عندما يتطلبه الإبداع، باختيار مشترك مع مدير التصوير عند تحديد النطاق، لا كوعد افتراضي على كل كاميرا. المظهر يتبع يومكم، لا قالباً جاهزاً.",
    },
    {
      h: "تسليم عربي أولاً",
      b: "التنسيق وجداول العمل والتسليم بالعربية والإنجليزية، مع مسجل صوت ناطق بالعربية ومرشد إنتاج عربي في خطة الطاقم. عائلة العريس تستلم فيلماً باللغة التي صُوِّر بها الاحتفال.",
    },
    {
      h: "تحفظ حول كبار السن والضيوف",
      b: "التصوير في زفاف رجالي إماراتي يراعي كبار السن والضيوف والعائلة المضيفة. تُتفق مواضع الكاميرات مع منظم الزفاف قبل اليوم، ويبقى الطاقم خارج صف الاستقبال، ويُنسَّق مسبقاً أمر الضيوف الذين لا يجب أن تظهر صورهم.",
    },
  ],
};

// Scope architecture replaces the retired price table.
// Source: Production first-lane matrix (one Recommended + one Enhanced,
// both unpriced). No public prices, no optional-extras menu, no third scope.
const scopes = {
  en: {
    eyebrow: "Scopes, not packages",
    h2: "One Recommended scope, one Enhanced scope",
    lead: "Groom coverage is organised around exactly two scopes. Both cover groom preparation and wedding-day male hall coverage on one event day of up to 10 hours. The Enhanced scope adds bigger-scale camera moves and an extended film, confirmed only after venue and safety checks. The price is quoted per event after we scope your day; there is no fixed public price list, and nothing is locked before the scope is agreed in writing.",
    recommendedName: "Recommended Scope",
    recommendedBadge: "Recommended",
    recommendedBullets: [
      "Groom preparation plus wedding-day male hall coverage, one event day of up to 10 hours",
      "Director of photography, active second camera operator and sound recordist, with gaffer and support roles in the crew plan",
      "Dedicated sound recording with boom, mixer, safety track and room tone, not camera mics alone",
      "One 3 to 5 minute highlight film, one 15 to 20 minute key-event film where your programme supports it, one 15-second vertical cut",
      "Colour, sound and two revision rounds included",
      "Movement on tripod and approved support matched to the camera",
      "Private family delivery; any public use is a separate written choice",
    ],
    enhancedName: "Enhanced Scope",
    enhancedBullets: [
      "Everything in the Recommended scope, plus larger-scale coverage",
      "Crane or jib with a dedicated operator, added only after venue, safety, payload, insurance and event-date confirmation",
      "One additional camera role where the approved camera plan requires it",
      "A longer 5 to 7 minute highlight film and an additional vertical cut",
      "Three revision rounds, agreed at scoping",
    ],
    notes: "Overtime beyond 10 hours, added locations, added deliverables and public use are written change orders agreed before work starts. Stills photography is not part of these scopes; if you need it, we scope it separately.",
    basis: "Price basis: costed per event after scoping and quoted in writing. No price is published or locked before the written scope is agreed.",
  },
  ar: {
    eyebrow: "نطاقان محددان، لا باقات",
    h2: "نطاق موصى به واحد ونطاق موسّع واحد",
    lead: "تُنظَّم تغطية العريس حول نطاقين اثنين فقط. كلاهما يغطي تحضير العريس وتغطية قاعة الرجال في يوم الزفاف، يوم فعالية واحد بحد أقصى 10 ساعات. النطاق الموسّع يضيف حركات كاميرا أكبر وفلماً أطول، ولا يُعتمد إلا بعد فحص الموقع والسلامة. يُحدَّد السعر لكل فعالية بعد دراسة يومكم؛ لا توجد قائمة أسعار عامة، ولا يُثبَّت أي شيء قبل الاتفاق على النطاق كتابياً.",
    recommendedName: "النطاق الموصى به",
    recommendedBadge: "موصى به",
    recommendedBullets: [
      "تحضير العريس مع تغطية قاعة الرجال في يوم الزفاف، يوم فعالية واحد بحد أقصى 10 ساعات",
      "مدير تصوير ومشغل كاميرا ثانٍ نشط ومسجل صوت، مع كهربائي وأدوار مساندة في خطة الطاقم",
      "تسجيل صوت مخصص بالميكروفون الذاتي والخلاط ومسار أمان وتسجيل صوت القاعة، لا ميكروفونات الكاميرا وحدها",
      "فيلم مختارات من 3 إلى 5 دقائق، وفيلم فعاليات رئيسية من 15 إلى 20 دقيقة إذا كان برنامجكم يدعم ذلك، ومقطع عمودي مدته 15 ثانية",
      "تدريج الألوان والصوت وجولتا تعديل مشمولة",
      "الحركة على حامل ثلاثي ودعامة معتمدة تناسب الكاميرا",
      "تسليم خاص للعائلة؛ وأي استخدام عام خيار كتابي منفصل",
    ],
    enhancedName: "النطاق الموسّع",
    enhancedBullets: [
      "كل ما في النطاق الموصى به، مع تغطية أوسع نطاقاً",
      "رافع كاميرا (كرين أو جيب) مع مشغل مخصص، لا يُضاف إلا بعد تأكيد الموقع والسلامة والحمولة والتأمين وتاريخ الفعالية",
      "دور كاميرا إضافي واحد حيث تتطلبه خطة الكاميرات المعتمدة",
      "فيلم مختارات أطول من 5 إلى 7 دقائق ومقطع عمودي إضافي",
      "ثلاث جولات تعديل، يُتفق عليها عند تحديد النطاق",
    ],
    notes: "العمل الإضافي بعد 10 ساعات، والمواقع الإضافية، والمخرجات الإضافية، والاستخدام العام، كلها أوامر تغيير كتابية يُتفق عليها قبل بدء العمل. التصوير الفوتوغرافي ليس جزءاً من هذين النطاقين؛ إذا احتجتموه نحدد نطاقه بشكل منفصل.",
    basis: "أساس التسعير: يُحسب لكل فعالية بعد تحديد النطاق ويُقدَّم عرضاً كتابياً. لا يُنشر أي سعر ولا يُثبَّت أي شيء قبل الاتفاق على النطاق الكتابي.",
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
      a: "The Recommended scope uses tripod and approved camera support. A crane or jib with a dedicated operator belongs to the Enhanced scope, and it is confirmed only after venue, safety, payload, insurance and event-date checks. We do not promise it by default, because a crane on a wedding day has to be safe for your guests first.",
    },
    {
      q: "What is cinema filtration and when do you use it?",
      a: "Cinema diffusion filters sit in front of the lens and take the edge off bright reflections while lifting shadow detail, so the image reads with a film texture rather than a video look. On a groom this helps when the gold thread on the bisht and the white of the kandura are hard for a camera to hold. Filtration from our owned set is chosen with the director of photography at scoping, when your creative calls for it, rather than fitted to each camera as a default.",
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
      a: "النطاق الموصى به يستخدم حاملاً ثلاثياً ودعامة كاميرا معتمدة. رافع الكاميرا مع مشغل مخصص يكون ضمن النطاق الموسّع، ولا يُعتمد إلا بعد تأكيد الموقع والسلامة والحمولة والتأمين وتاريخ الفعالية. لا نعده افتراضياً، لأن رافع الكاميرا في يوم زفاف يجب أن يكون آمناً لضيوفكم أولاً.",
    },
    {
      q: "ما هو الترشيح السينمائي ومتى تستخدمونه؟",
      a: "فلاتر الانتشار السينمائية توضع أمام العدسة، تخفف حدّة الانعكاسات القاسية وترفع تفاصيل المناطق الداكنة، فتعطي الصورة ملمس الفيلم السينمائي بدلاً من مظهر الفيديو. بالنسبة للعريس يساعد هذا عندما يكون الخيط الذهبي على البشت وأبيض الكندورة صعبين على الكاميرا. يُختار الترشيح من مجموعتنا المملوكة مع مدير التصوير عند تحديد النطاق، عندما يتطلبه الإبداع، لا كتطبيق افتراضي على كل كاميرا.",
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
  const scopeBlock = isAr ? scopes.ar : scopes.en;

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
              ? "خدمات تصوير العريس والأفراح الرجالية في دبي والإمارات. تحضير العريس وتغطية قاعة الرجال بطاقم رجالي، نطاق موصى به ونطاق موسّع، والتسعير لكل فعالية بعد تحديد النطاق."
              : "Groom and male-only wedding coverage in Dubai and the UAE. Groom preparation and wedding-day male hall coverage by a male crew, one Recommended and one Enhanced scope, quoted per event after scoping.",
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
            {isAr ? "أربعة فروقات مبنية للسوق الإماراتي" : "Four differences built for the UAE market"}
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

      {/* SCOPE ARCHITECTURE, one Recommended + one Enhanced, unpriced */}
      <Section id="scopes">
        <Reveal>
          <Eyebrow>{scopeBlock.eyebrow}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">{scopeBlock.h2}</h2>
          <p className="bs-lead mt-6 !max-w-3xl">{scopeBlock.lead}</p>
        </Reveal>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <Reveal className="bs-card flex flex-col bg-[color:var(--color-bg-alt)]/40">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-xl">{scopeBlock.recommendedName}</h3>
                <span className="inline-block rounded-full bg-[color:var(--color-accent)]/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-[color:var(--color-accent)]">
                  {scopeBlock.recommendedBadge}
                </span>
              </div>
              <ul className="mt-6 space-y-3">
                {scopeBlock.recommendedBullets.map((b, i) => (
                  <li key={i} className="flex gap-3 text-sm text-[color:var(--color-muted)]">
                    <span aria-hidden className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--color-accent)]" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={80} className="bs-card flex flex-col">
            <div>
              <h3 className="text-xl">{scopeBlock.enhancedName}</h3>
              <ul className="mt-6 space-y-3">
                {scopeBlock.enhancedBullets.map((b, i) => (
                  <li key={i} className="flex gap-3 text-sm text-[color:var(--color-muted)]">
                    <span aria-hidden className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--color-accent)]" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
        <p className="mt-8 text-xs text-[color:var(--color-muted)]">{scopeBlock.notes}</p>
        <p className="mt-3 text-xs text-[color:var(--color-muted)]">{scopeBlock.basis}</p>
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
