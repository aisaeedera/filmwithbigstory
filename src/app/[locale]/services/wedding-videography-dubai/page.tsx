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
      ? "مصور فيديو زفاف دبي | من 5,500 درهم | تشويق نفس اليوم + بث مباشر"
      : "Wedding Videography Dubai | From AED 5,500 | Same-Day Teaser + Live Streaming",
    description: isAr
      ? "مصور فيديو زفاف دبي — RED Komodo X + FX3، تشويق نفس اليوم 24 ساعة، بث مباشر 4K، طاقم ذكور فقط، تجربة في المجالس الحكومية الإماراتية. من 5,500 درهم."
      : "Wedding videographer Dubai — RED Komodo X + FX3, 24h same-day teaser, 4K live streaming, male-only crew, tested in UAE government majlis. From AED 5,500.",
    path: "/services/wedding-videography-dubai",
  });
}

const COPY = {
  eyebrow: {
    en: "Wedding Videography Dubai",
    ar: "تصوير فيديو الزفاف في دبي",
  },
  h1: {
    en: "Wedding videography Dubai",
    ar: "تصوير فيديو الزفاف في دبي",
  },
  sub: {
    en: "Cinematic · Government-majlis-tested · Male-only operators",
    ar: "سينمائي · مجرّب في المجالس الحكومية · طاقم ذكور فقط",
  },
  lead: {
    en: "Wedding films shot on cinema cameras, cut in narrative style, with operators trained to read Al-Ayyala and the male-only traditions of government majlis. Live streaming, same-day teaser, drone and crane available.",
    ar: "أفلام زفاف تُصوَّر بكاميرات سينمائية وتُحرَّر بأسلوب سردي، مع طاقم مُدرَّب على قراءة العيالة وتقاليد الذكور في المجالس الحكومية. بث مباشر، تشويق نفس اليوم، درون وكرين متوفرة.",
  },
};

const tiers = {
  en: [
    {
      tag: "Tier 1 · Small / Civil",
      price: "AED 5,500",
      title: "Small wedding or civil ceremony — single shooter, 4h",
      cameras: "RED Komodo X + FX3",
      crew: "1st AC certified · single shooter",
      editing: "Cinematic \"no embarrassing cut\" editing · 1st AC on cuts",
      deliverables: [
        "1–2 min highlight reel",
        "Full ceremony edit",
        "Single-event coverage up to 4 hours",
        "Male-only operator (Saeed rule)",
        "Matte box + cinema filters (not standard)",
        "Bilingual EN/AR",
        "Live streaming available as add-on",
      ],
      teaser: "Same-day teaser (24h turnaround) — optional, +AED 1,200",
      note: "Best fit: civil nikah, small villa wedding, single-majlis event.",
    },
    {
      tag: "Tier 2 · Wedding Day",
      price: "AED 12,500",
      title: "Full wedding day — RED A-cam + FX3 B-cam + crane",
      cameras: "RED Komodo X (A-cam) + FX3 (B-cam) — no A7S III",
      crew: "1st AC + DOP certified · crane operator + crane kit",
      editing: "Cinematic \"no embarrassing cut\" editing · documentary b-roll layer",
      deliverables: [
        "3-min cinematic highlight",
        "Full ceremony edit",
        "Photo stills (edited)",
        "Up to 8 hours coverage",
        "Male-only operator",
        "Same-day teaser (24h turnaround) included",
        "Live streaming — 4h feed + custom overlay",
        "Drone shot (weather permitting)",
        "Matte box + cinema filters (not standard)",
        "Bilingual EN/AR",
        "AED pricing in dirhams",
      ],
      teaser: "Same-day teaser included",
      note: "Best fit: full-day wedding at one venue (majlis, hotel, villa).",
      featured: true,
    },
    {
      tag: "Tier 3 · Premium Production",
      price: "AED 22,000+",
      title: "Multi-location premium — RED + FX6 + full cinema crew",
      cameras: "RED Komodo X + FX6 (cinema-grade B-cam)",
      crew: "DOP + 1st AC + 2nd AC + crane op + grip",
      editing: "5-min cinematic highlight · DaVinci Resolve Studio grade",
      deliverables: [
        "Up to 12 hours coverage",
        "Same-day teaser (24h turnaround)",
        "5-min cinematic highlight",
        "Full ceremony edit",
        "Drone (weather permitting)",
        "4K cinema-grade edits",
        "Live streaming included",
        "Multi-location",
        "1st AC certification across the team",
        "Matte box + cinema filters (not standard)",
        "Bilingual EN/AR",
        "AED pricing in dirhams",
      ],
      teaser: "Same-day teaser included",
      note: "Best fit: 2-day coverage, henna + wedding, multi-venue, government-majlis + hotel.",
    },
  ],
  ar: [
    {
      tag: "الباقة 1 · صغيرة / مدنية",
      price: "5,500 درهم",
      title: "زفاف صغير أو حفل مدني — مصور واحد، 4 ساعات",
      cameras: "RED Komodo X + FX3",
      crew: "مساعد أول معتمد · مصور واحد",
      editing: "مونتاج سينمائي \"بلا قصات محرجة\" · المساعد الأول على القص",
      deliverables: [
        "ريل ملخص 1–2 دقيقة",
        "تحرير الحفل الكامل",
        "تغطية حدث واحد حتى 4 ساعات",
        "طاقم ذكور فقط (قاعدة سعيد)",
        "Matte box وفلاتر سينمائية (ليست قياسية)",
        "ثنائي اللغة EN/AR",
        "البث المباشر متاح كإضافة",
      ],
      teaser: "تشويق نفس اليوم (تسليم 24 ساعة) — اختياري، +1,200 درهم",
      note: "الأنسب: نكاح مدني، زفاف فيلا صغير، حدث في مجلس واحد.",
    },
    {
      tag: "الباقة 2 · يوم الزفاف",
      price: "12,500 درهم",
      title: "يوم زفاف كامل — RED كاميرا رئيسية + FX3 ثانوية + كرين",
      cameras: "RED Komodo X (A-cam) + FX3 (B-cam) — بدون A7S III",
      crew: "مساعد أول + DOP معتمد · مشغل كرين + طقم كرين",
      editing: "مونتاج سينمائي \"بلا قصات محرجة\" · طبقة B-roll وثائقية",
      deliverables: [
        "ريل سينمائي 3 دقائق",
        "تحرير الحفل الكامل",
        "صور ثابتة (محررة)",
        "تغطية حتى 8 ساعات",
        "طاقم ذكور فقط",
        "تشويق نفس اليوم (تسليم 24 ساعة) مشمول",
        "بث مباشر — 4 ساعات + أوفرلاي مخصص",
        "لقطة درون (حسب الطقس)",
        "Matte box وفلاتر سينمائية (ليست قياسية)",
        "ثنائي اللغة EN/AR",
        "تسعير بالدرهم",
      ],
      teaser: "تشويق نفس اليوم مشمول",
      note: "الأنسب: زفاف يوم كامل في موقع واحد (مجلس، فندق، فيلا).",
      featured: true,
    },
    {
      tag: "الباقة 3 · الإنتاج المتميز",
      price: "22,000+ درهم",
      title: "إنتاج متميز متعدد المواقع — RED + FX6 + طاقم سينمائي كامل",
      cameras: "RED Komodo X + FX6 (كاميرا ثانوية سينمائية)",
      crew: "DOP + مساعد أول + مساعد ثانٍ + مشغل كرين + جريب",
      editing: "ريل سينمائي 5 دقائق · تدرج ألوان DaVinci Resolve Studio",
      deliverables: [
        "تغطية حتى 12 ساعة",
        "تشويق نفس اليوم (تسليم 24 ساعة)",
        "ريل سينمائي 5 دقائق",
        "تحرير الحفل الكامل",
        "درون (حسب الطقس)",
        "مخرجات سينمائية 4K",
        "بث مباشر مشمول",
        "متعدد المواقع",
        "شهادة المساعد الأول عبر الفريق",
        "Matte box وفلاتر سينمائية (ليست قياسية)",
        "ثنائي اللغة EN/AR",
        "تسعير بالدرهم",
      ],
      teaser: "تشويق نفس اليوم مشمول",
      note: "الأنسب: تغطية يومين، حناء + زفاف، عدة مواقع، مجلس حكومي + فندق.",
    },
  ],
};

// Extras that go with any tier — add-on cards (photographer + extra videographer).
// Pricing per PRICING.json v10 + Saeed 2026-07-16 sign-off.
const extrasAddons = {
  en: {
    eyebrow: "Extras that go with any tier",
    h2: "Build your own package — add a photographer or a second videographer",
    lead: "Every tier ships with the cinema camera, the 1st AC, and the male-only crew. If you want full stills coverage on top of video, or a second videographer for multi-cam sync, add them below — they bolt onto any tier without re-quoting the whole package.",
    cards: [
      {
        label: "+ADD-ON",
        title: "Extra Photographer",
        price: "+AED 2,500",
        description:
          "Their own camera + lenses. Full wedding stills coverage on top of the video team — 200 edited photos delivered in 7 days.",
        bullets: [
          "Dedicated stills operator (not pulled from the video team)",
          "Owns kit: Sony A7R V (45MP) or comparable, 24–70 + 70–200 glass",
          "200 edited photos, online gallery, 7-day turnaround",
          "Same male-only rule — same crew on site, same venue walkthrough",
          "Works alongside the 1st AC — no double-cover, no blocking conflicts",
        ],
        rationale:
          "Pairs with Tier 1 or Tier 2 to give you a full photo + video package without booking a separate photo crew. Costs less than the standalone wedding-photography day rate (AED 6,000) because they share the venue, the lighting setup, and the run-of-show with the video team.",
      },
      {
        label: "+ADD-ON",
        title: "Extra Videographer",
        price: "+AED 3,500",
        description:
          "Additional FX3 operator for true multi-cam. Multi-cam editing included, drone op coordinated — your cinematic edit gets a second angle on every key moment.",
        bullets: [
          "FX3 operator (separate body, separate angle)",
          "Multi-cam editing in post — cuts to the second angle live, not B-roll filler",
          "Drone operator coordinated if drone add-on is also booked",
          "Sync via Hollyland wireless — no drift, no clap markers needed",
          "Same male-only rule, same 1st AC discipline",
        ],
        rationale:
          "Pairs with Tier 1 if you want true multi-cam cinema on a budget, or with Tier 2 if you want a third angle on the crane + the floor. Brings the cinematic-edit look of Tier 3 down to Tier 1 pricing when combined.",
      },
    ],
    footnote:
      "Add-ons are itemised separately on the quote so you see exactly what is bolted on. Both add-ons ship with the same male-only crew rule and 1st AC certification as the base tier.",
  },
  ar: {
    eyebrow: "إضافات تناسب أي باقة",
    h2: "ابنِ باقتك — أضف مصوراً فوتوغرافياً أو مصور فيديو ثانياً",
    lead: "كل باقة تأتي مع الكاميرا السينمائية والمساعد الأول المعتمد وطاقم الذكور فقط. إذا أردت تغطية صور كاملة فوق الفيديو، أو مصور فيديو ثاني لتزامن متعدد الكاميرات، أضفهم أدناه — يُلحقون بأي باقة دون إعادة تسعير الباقة كاملة.",
    cards: [
      {
        label: "+إضافة",
        title: "مصور فوتوغرافي إضافي",
        price: "+2,500 درهم",
        description:
          "كاميرته الخاصة وعدساته. تغطية صور زفاف كاملة فوق فريق الفيديو — 200 صورة معدلة تُسلَّم خلال 7 أيام.",
        bullets: [
          "مشغل صور ثابتة مخصص (لا يُسحب من فريق الفيديو)",
          "يملك العدة: Sony A7R V (45MP) أو ما يعادله، عدسات 24–70 + 70–200",
          "200 صورة معدلة، معرض إلكتروني، تسليم خلال 7 أيام",
          "نفس قاعدة الذكور فقط — نفس الطاقم في الموقع، نفس استطلاع الموقع",
          "يعمل جنباً إلى جنب مع المساعد الأول — بلا تغطية مزدوجة، بلا تعارض حجب",
        ],
        rationale:
          "يُلحق بالباقتين 1 أو 2 ليمنحك باقة صور + فيديو كاملة دون حجز طاقم تصوير منفصل. يكلّف أقل من سعر يوم تصوير الزفاف المستقل (6,000 درهم) لأنهم يتشاركون الموقع والإعداد والجدول مع فريق الفيديو.",
      },
      {
        label: "+إضافة",
        title: "مصور فيديو إضافي",
        price: "+3,500 درهم",
        description:
          "مشغل FX3 إضافي لتعدد كاميرات حقيقي. مونتاج متعدد الكاميرات مشمول، مشغل درون منسَّق — مونتاجك السينمائي يحصل على زاوية ثانية في كل لحظة رئيسية.",
        bullets: [
          "مشغل FX3 (جسم منفصل، زاوية منفصلة)",
          "مونتاج متعدد الكاميرات في المونتاج — قص للزاوية الثانية مباشر، ليس حشو B-roll",
          "مشغل درون منسَّق إذا كانت إضافة الدرون محجوزة أيضاً",
          "تزامن عبر Hollyland لاسلكي — بلا انحراف، بلا حاجة لعلامات تزامن",
          "نفس قاعدة الذكور فقط، نفس انضباط المساعد الأول",
        ],
        rationale:
          "يُلحق بالباقة 1 إذا أردت سينما متعدد الكاميرات حقيقي بميزانية محدودة، أو بالباقة 2 إذا أردت زاوية ثالثة على الكرين والأرضية. ينقل مظهر المونتاج السينمائي للباقة 3 إلى تسعير الباقة 1 عند الجمع.",
      },
    ],
    footnote:
      "الإضافات مفصّلة بشكل منفصل في العرض لتعرف بالضبط ما أُلحق. كلتا الإضافتين تأتيان مع نفس قاعدة طاقم الذكور فقط وشهادة المساعد الأول كما في الباقة الأساسية.",
  },
};

// UAE government majlis venues — FREE for UAE nationals, gov-provided.
// Sources: Dubai Media Office, CDA, Focus Hi Dubai, Khaleej Times, Curly Tales, Dubai Municipality.
// Sorted by reach + familiarity.
const majlisVenues = {
  en: [
    { name: "Umm Suqeim Majlis", note: "Free, gov-provided · all-male wedding appropriate" },
    { name: "Nad Al Sheba Majlis", note: "Free, gov-provided" },
    { name: "Al Awir Majlis", note: "Free, gov-provided" },
    { name: "Al Rashidiya Majlis", note: "Free, all-male appropriate" },
    { name: "Al Khawaneej Majlis", note: "Free, gov-provided" },
    { name: "Al Warqa Majlis", note: "Free, gov-provided" },
    { name: "Al Twar Wedding Hall", note: "CDA venue" },
    { name: "Al Aweer Wedding Hall", note: "Dubai Weddings Programme · capacity 500" },
    { name: "Al Fahidi Majlis", note: "Heritage neighborhood setting" },
    { name: "Al Lisaili Majlis", note: "Desert setting" },
    { name: "Hatta Majlis", note: "Mountains · Hatta Fort area" },
    { name: "Al Mizhar Majlis", note: "Free, gov-provided" },
    { name: "Al Bahar Majlis", note: "Free, gov-provided" },
    { name: "Jumeirah 3 Majlis", note: "Free, gov-provided" },
    { name: "Mina Jumeirah 1 Majlis", note: "Free, gov-provided" },
    { name: "Mina Umm Suqeim 1 Majlis", note: "Free, gov-provided" },
    { name: "Mina Umm Suqeim 2 Majlis", note: "Free, gov-provided" },
    { name: "Mina Al Hamriyah Majlis", note: "Free, gov-provided" },
    { name: "Al Barsha South I Majlis", note: "Under construction (Q4 2025)" },
    { name: "Mushrif Park outdoor hall", note: "Dh23M venue, outdoor events" },
  ],
  ar: [
    { name: "مجلس أم سقيم", note: "مجاني، حكومي · مناسب لزفاف الذكور" },
    { name: "مجلس ند الشبا", note: "مجاني، حكومي" },
    { name: "مجلس العوير", note: "مجاني، حكومي" },
    { name: "مجلس الراشدية", note: "مجاني، مناسب للذكور" },
    { name: "مجلس الخوانيج", note: "مجاني، حكومي" },
    { name: "مجلس الورقاء", note: "مجاني، حكومي" },
    { name: "قاعة زفاف الطوار", note: "موقع هيئة المجتمع" },
    { name: "قاعة زفاف العوير", note: "برنامج زفاف دبي · سعة 500" },
    { name: "مجلس الفهيدي", note: "حي تراثي" },
    { name: "مجلس الليسيلي", note: "بيئة صحراوية" },
    { name: "مجلس حصاة", note: "الجبال · منطقة حصاة فورت" },
    { name: "مجلس المزهر", note: "مجاني، حكومي" },
    { name: "مجلس البحر", note: "مجاني، حكومي" },
    { name: "مجلس جميرا 3", note: "مجاني، حكومي" },
    { name: "ميناء جميرا 1 مجلس", note: "مجاني، حكومي" },
    { name: "ميناء أم سقيم 1 مجلس", note: "مجاني، حكومي" },
    { name: "ميناء أم سقيم 2 مجلس", note: "مجاني، حكومي" },
    { name: "ميناء الحمرية مجلس", note: "مجاني، حكومي" },
    { name: "مجلس البرشاء جنوب 1", note: "قيد الإنشاء (الربع الرابع 2025)" },
    { name: "قاعة المشرف بارك الخارجية", note: "قاعة 23 مليون درهم، فعاليات خارجية" },
  ],
};

const differentiator = {
  en: {
    rows: [
      { standard: "Multi-cam with no cinema feel", bigStory: "RED cinema camera + FX3 + matte box + cinema filters" },
      { standard: "\"Document feel\" edits, generic cuts", bigStory: "Cinematic editorial cuts, narrative pacing, no embarrassing-cuts discipline" },
      { standard: "Generic music, no licensing", bigStory: "Musicbed + Artlist cleared for streaming, sound-anchored narrative" },
      { standard: "Same-day edits aren't offered (or break the cut)", bigStory: "Same-day teaser built in — 24h turnaround, parallel edit team" },
      { standard: "Drone if weather", bigStory: "Drone + crane + matte box combined — multi-tool coverage" },
      { standard: "Can't handle Bedouin traditions — operators film everything", bigStory: "1st AC trained on Al-Ayyala — knows when the sticks pass or drop, pauses the shoot" },
      { standard: "Operator not constrained to male-only", bigStory: "Male-only operator roster — required for government-majlis bookings" },
      { standard: "Live stream = phone propped on a tripod", bigStory: "Multi-cam switched feed (RED + FX3 → switcher), 4K output, pro audio mix, bilingual overlay" },
    ],
  },
  ar: {
    rows: [
      { standard: "كاميرات متعددة بلا إحساس سينمائي", bigStory: "RED سينمائية + FX3 + Matte box + فلاتر سينمائية" },
      { standard: "مونتاج \"أسلوب وثائقي\"، قصات عامة", bigStory: "قصات تحريرية سينمائية، إيقاع سردي، انضباط بلا قصات محرجة" },
      { standard: "موسيقى عامة، بدون ترخيص", bigStory: "Musicbed + Artlist مرخّصة للبث، سرد مُرتكز على الصوت" },
      { standard: "تشويق نفس اليوم غير متاح (أو يفسد القص)", bigStory: "تشويق نفس اليوم مدمج — تسليم 24 ساعة، فريق تحرير متوازي" },
      { standard: "درون إذا سمح الطقس", bigStory: "درون + كرين + Matte box مجتمعة — تغطية متعددة الأدوات" },
      { standard: "لا يتقنون التقاليد البدوية — المصورون يصورون كل شيء", bigStory: "المساعد الأول مُدرَّب على العيالة — يعرف متى تُمرَّر العصي أو تُسقَط ويوقف التصوير" },
      { standard: "المصور غير مقيد بالذكور فقط", bigStory: "قائمة مصورين ذكور فقط — مطلوب لحجوزات المجالس الحكومية" },
      { standard: "البث = هاتف على حامل", bigStory: "تبديل متعدد الكاميرات (RED + FX3 → سويتشَر)، مخرجات 4K، مزج صوت احترافي، أوفرلاي ثنائي اللغة" },
    ],
  },
};

const livestreamComparison = {
  en: {
    typical: {
      label: "Typical wedding livestream",
      points: [
        "Phone propped on a chair",
        "Single-camera, no switching",
        "Vertical or shaky handheld",
        "Low bitrate, audio from phone mic",
        "No overlay, no captions",
        "Drops when reception hall Wi-Fi drops",
      ],
    },
    bigStory: {
      label: "Big Story live broadcast",
      points: [
        "Multi-cam switched feed — RED Komodo X + FX3 → ATEM switcher",
        "4K output, broadcast-grade",
        "Wireless Sennheiser lavalier mix — vows and speeches clean",
        "Custom overlay — bilingual EN/AR captions, names, date",
        "Audio cleanup and mastering in post",
        "4h of broadcast-grade footage delivered as MP4 archive",
        "Stream targets: YouTube Live, custom RTMP URL, or private embed",
      ],
    },
  },
  ar: {
    typical: {
      label: "البث المباشر المعتاد لحفلات الزفاف",
      points: [
        "هاتف على كرسي",
        "كاميرا واحدة، بلا تبديل",
        "عمودي أو مهتز يدوياً",
        "بت منخفض، صوت من ميكروفون الهاتف",
        "بلا أوفرلاي، بلا ترجمة",
        "يسقط عندما يسقط واي فاي قاعة الاستقبال",
      ],
    },
    bigStory: {
      label: "بث بيك ستوري الاحترافي",
      points: [
        "تبديل متعدد الكاميرات — RED Komodo X + FX3 → سويتشَر ATEM",
        "مخرجات 4K بجودة البث",
        "مزج ميكروفونات Sennheiser لاسلكية — نذور وخطب بنقاء",
        "أوفرلاي مخصص — ترجمة ثنائية EN/AR، أسماء، تاريخ",
        "تنظيف الصوت والإتقان في المونتاج",
        "4 ساعات من لقطات بجودة البث تُسلَّم كأرشيف MP4",
        "أهداف البث: YouTube Live، RTMP مخصص، أو تضمين خاص",
      ],
    },
  },
};

const faqItems = {
  en: [
    {
      q: "How much does a wedding videographer cost in Dubai?",
      a: "Big Story's wedding videography in Dubai starts at AED 5,500 (Tier 1 — single shooter, 4 hours, RED Komodo X + FX3), AED 12,500 (Tier 2 — full day, 8 hours, RED A-cam + FX3 B-cam + crane + same-day teaser + live streaming), and AED 22,000+ (Tier 3 — premium production, RED + FX6, full cinema crew, multi-location, 12 hours). Most Dubai wedding videographers fall in the AED 8,000–15,000 range; Big Story's Tier 1 starts higher than AED 3,500 because we don't run a stripped-down single-operator model — every wedding we film goes out with a 1st AC and a RED cinema camera.",
    },
    {
      q: "Can live streaming be added to any tier?",
      a: "Yes. Live streaming is included in Tier 2 and Tier 3. On Tier 1 it's an add-on at AED 1,500–3,500 depending on duration (up to 4 hours) and overlay complexity (bilingual captions, name cards, custom graphics). We stream to YouTube Live, a custom RTMP URL you provide, or a private embed on your own site.",
    },
    {
      q: "Where do you live stream the wedding to?",
      a: "Three options: (1) YouTube Live — unlisted or public; (2) custom RTMP URL — if you have a CDN, internal stream, or are embedding on a wedding website; (3) private embed — we host the page and share a password. All three come with the multi-cam switched feed, custom overlay, and broadcast archive.",
    },
    {
      q: "Do you support Al-Ayyala and UAE male dance traditions?",
      a: "Yes — and this is the part that matters. Our 1st AC is trained on Al-Ayyala. When the sticks pass, when they drop, when the rows close — we know to pause the shoot so the dance keeps its rhythm. Most wedding videographers film through the dance and break the cut; we don't. Male-only operator is a Saeed rule we keep across every booking — required for government majlis, kept everywhere else.",
    },
    {
      q: "Do you film weddings at government majlis in Dubai?",
      a: "Yes — Big Story films at all 13 free Dubai Municipality social majlis (Umm Suqeim, Nad Al Sheba, Al Awir, Al Rashidiya, Al Khawaneej, Al Warqa, Al Mizhar, Al Bahar, Al Fahidi, Al Lisaili, Hatta, Jumeirah 3, Mina Jumeirah 1, Mina Umm Suqeim 1, Mina Umm Suqeim 2, Mina Al Hamriyah) plus Al Twar Wedding Hall (CDA), Al Aweer Wedding Hall (Dubai Weddings Programme), Al Barsha Wedding Hall (CDA), and Mushrif Park outdoor events hall. All of these venues are free for UAE nationals — government-provided, intended for weddings. We bring a male-only crew, matte box + cinema filters, and operate under the same single-majlis discipline we'd use at a private villa.",
    },
    {
      q: "What does a wedding videographer in Dubai actually deliver?",
      a: "Every Big Story Dubai wedding booking delivers a cinematic highlight reel (1–2 min Tier 1, 3 min Tier 2, 5 min Tier 3), a full ceremony edit with vows and speeches, and the raw footage archive. Tier 2 and Tier 3 include a same-day teaser delivered within 24 hours of the ceremony. Tier 2 and Tier 3 include live streaming (multi-cam switched feed, 4K output, bilingual overlay, broadcast archive). All deliverables are MP4 masters (4K H.264) with a 1080p social cut included. Music is licensed through Musicbed and Artlist — no copyright strikes on YouTube or Instagram.",
    },
    {
      q: "How do I find the best wedding videographer in Dubai?",
      a: "Look for three things: (1) a cinema-grade camera (Sony FX3 minimum, RED Komodo X for the cinematic tier) — not a DSLR or phone; (2) a sample reel from a real Dubai wedding at your venue type (hotel ballroom, desert resort, beach villa, government majlis); (3) a clear deliverable list with turnaround times. Ask to see the unedited ceremony cut from one of their bookings — that's where wedding videography separates from videography in general. Big Story delivers all three.",
    },
    {
      q: "Do you offer same-day edits / teasers for Dubai weddings?",
      a: "Yes — the same-day teaser is optional on Tier 1 (+AED 1,200, 24-hour turnaround) and included in Tier 2 and Tier 3. The teaser is 30–90 seconds, cut from the ceremony and reception, delivered within 24 hours of the ceremony. Two editors work in parallel: one on the teaser, one on the full highlight reel during the standard 3–4 week post-production cycle. The teaser is screened at the after-party or shared on WhatsApp with overseas guests who couldn't attend.",
    },
    {
      q: "How long until we get the final wedding video?",
      a: "Standard turnaround is 3 weeks for Tier 1, 4 weeks for Tier 2, 5 weeks for Tier 3. The same-day teaser is delivered within 24 hours. Rush delivery (2-week post on Tier 1) is available at +AED 1,200. Two rounds of revisions are included on every package.",
    },
    {
      q: "How do we book a wedding videographer in Dubai — and how far in advance?",
      a: "Big Story Dubai wedding videography bookings open 6–12 months in advance for peak wedding season (October–April). To book: send a WhatsApp or email with your wedding date, venue, guest count and which tier you're considering. We'll send a proposal within 24 hours and hold the date with a 30% deposit. Most Dubai weddings book 4–6 months ahead; last-minute bookings (<8 weeks) are possible but the Premium tier is often already booked out.",
    },
  ],
  ar: [
    {
      q: "كم تكلفة مصور فيديو الزفاف في دبي؟",
      a: "تبدأ أسعار بيك ستوري لتصوير فيديو الزفاف في دبي من 5,500 درهم (الباقة 1 — مصور واحد، 4 ساعات، RED Komodo X + FX3)، 12,500 درهم (الباقة 2 — يوم كامل، 8 ساعات، RED كاميرا رئيسية + FX3 ثانوية + كرين + تشويق نفس اليوم + بث مباشر)، و22,000+ درهم (الباقة 3 — إنتاج متميز، RED + FX6، طاقم سينمائي كامل، عدة مواقع، 12 ساعة). معظم مصوري فيديو الزفاف في دبي يتراوحون بين 8,000–15,000 درهم؛ بيك ستوري تبدأ من 5,500 درهم لأننا لا ندير نموذج مصور واحد مختصر — كل زفاف نصوره يخرج مع مساعد أول معتمد وكاميرا RED سينمائية.",
    },
    {
      q: "هل يمكن إضافة البث المباشر لأي باقة؟",
      a: "نعم. البث المباشر مشمول في الباقتين 2 و3. على الباقة 1 هو إضافة بـ 1,500–3,500 درهم حسب المدة (حتى 4 ساعات) وتعقيد الأوفرلاي (ترجمة ثنائية، بطاقات أسماء، رسوم مخصصة). نبث على YouTube Live، أو RTMP مخصص تقدمه أنت، أو تضمين خاص على موقعك.",
    },
    {
      q: "أين تبثون حفل الزفاف؟",
      a: "ثلاثة خيارات: (1) YouTube Live — غير مدرج أو عام؛ (2) RTMP مخصص — إذا كان لديك CDN أو بث داخلي أو تضمين على موقع زفاف؛ (3) تضمين خاص — نستضيف الصفحة ونشارك كلمة سر. جميعها تأتي مع تبديل متعدد الكاميرات، أوفرلاي مخصص، وأرشيف بث.",
    },
    {
      q: "هل تدعمون العيالة وتقاليد الرقص الذكوري الإماراتي؟",
      a: "نعم — وهذا الجزء المهم. مساعدنا الأول معتمد على العيالة. عندما تُمرَّر العصي، عندما تُسقَط، عندما تنغلق الصفوف — نعرف أن نوقف التصوير حتى يحافظ الرقص على إيقاعه. معظم مصوري فيديو الزفاف يصورون خلال الرقص ويكسرون القص؛ نحن لا نفعل ذلك. طاقم الذكور فقط قاعدة من سعيد نطبقها على كل حجز — مطلوبة للمجالس الحكومية، ومطبقة في كل مكان آخر.",
    },
    {
      q: "هل تصورون حفلات الزفاف في المجالس الحكومية في دبي؟",
      a: "نعم — بيك ستوري تصور في جميع المجالس الاجتماعية الـ 13 المجانية التابعة لبلدية دبي (أم سقيم، ند الشبا، العوير، الراشدية، الخوانيج، الورقاء، المزهر، البحر، الفهيدي، الليسيلي، حصاة، جميرا 3، ميناء جميرا 1، ميناء أم سقيم 1، ميناء أم سقيم 2، ميناء الحمرية) إضافة إلى قاعة زفاف الطوار (هيئة المجتمع)، وقاعة زفاف العوير (برنامج زفاف دبي)، وقاعة زفاف البرشاء (هيئة المجتمع)، وقاعة المشرف بارك الخارجية. جميع هذه المواقع مجانية للإماراتيين — مقدمة من الحكومة، مخصصة للزفاف. نوفر طاقم ذكور فقط، Matte box + فلاتر سينمائية، ونعمل بنفس انضباط المجلس الواحد الذي نستخدمه في فيلا خاصة.",
    },
    {
      q: "ماذا يسلم مصور فيديو الزفاف في دبي فعلياً؟",
      a: "كل حجز زفاف في بيك ستوري دبي يسلم ريل ملخص سينمائي (1–2 دقيقة الباقة 1، 3 دقائق الباقة 2، 5 دقائق الباقة 3)، قصة حفل كاملة بالنذور والخطب، وأرشيف اللقطات الخام. الباقتان 2 و3 تشتملان على تشويق نفس اليوم يُسلَّم خلال 24 ساعة من الحفل. الباقتان 2 و3 تشتملان على بث مباشر (تبديل متعدد الكاميرات، مخرجات 4K، أوفرلاي ثنائي اللغة، أرشيف بث). كل المخرجات ملفات MP4 رئيسية (4K H.264) مع نسخة سوشيال 1080p مشمولة. الموسيقى مرخصة عبر Musicbed وArtlist — لا إنذارات حقوق على YouTube أو إنستغرام.",
    },
    {
      q: "كيف أجد أفضل مصور فيديو زفاف في دبي؟",
      a: "ابحث عن ثلاثة أشياء: (1) كاميرا سينمائية (Sony FX3 كحد أدنى، RED Komodo X للباقة السينمائية) — ليست DSLR أو هاتف؛ (2) ريل عينة من حفل زفاف حقيقي في دبي من نوع موقعك (قاعة فندق، منتجع صحراوي، فيلا شاطئية، مجلس حكومي)؛ (3) قائمة مخرجات واضحة مع مدد التسليم. اطلب رؤية قصة الحفل غير المقطوعة من أحد حجوزاتهم — هنا يتفوق تصوير فيديو الزفاف على التصوير الفيديوي العام. بيك ستوري تقدم الثلاثة.",
    },
    {
      q: "هل تقدمون مونتاج/تشويق نفس اليوم لحفلات دبي؟",
      a: "نعم — تشويق نفس اليوم اختياري على الباقة 1 (+1,200 درهم، تسليم خلال 24 ساعة) ومشمول في الباقتين 2 و3. التشويق 30–90 ثانية، مقصوص من الحفل والاستقبال، يُسلَّم خلال 24 ساعة من الحفل. يعمل محرران بالتوازي: واحد على التشويق، وواحد على ريل الملخص خلال دورة ما بعد الإنتاج القياسية البالغة 3–4 أسابيع. يُعرض التشويق في الحفلة اللاحقة أو يُشارك على واتساب مع الضيوف في الخارج.",
    },
    {
      q: "كم يستغرق الحصول على الفيديو النهائي؟",
      a: "مدة التسليم القياسية 3 أسابيع للباقة 1، 4 أسابيع للباقة 2، 5 أسابيع للباقة 3. تشويق نفس اليوم يُسلَّم خلال 24 ساعة. التسليم العاجل (أسبوعين على الباقة 1) متاح بـ +1,200 درهم. جولتا مراجعة مشمولتان في كل باقة.",
    },
    {
      q: "كيف نحجز مصور فيديو زفاف في دبي — وكم مسبقاً؟",
      a: "حجوزات فيديو زفاف بيك ستوري في دبي تفتح 6–12 شهراً مسبقاً لموسم الزفاف الذروة (أكتوبر–أبريل). للحجز: أرسل واتساب أو بريد بتاريخ حفل زفافك والموقع وعدد الضيوف وأي باقة تفكر فيها. سنرسل عرضاً خلال 24 ساعة ونحجز التاريخ بدفعة مقدمة 30%. معظم حفلات زفاف دبي تُحجز قبل 4–6 أشهر؛ الحجوزات اللحظية (<8 أسابيع) ممكنة لكن الباقة المتميزة غالباً محجوزة بالفعل.",
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
  const tiersList = isAr ? tiers.ar : tiers.en;
  const extrasAddonsBlock = isAr ? extrasAddons.ar : extrasAddons.en;
  const majlisList = isAr ? majlisVenues.ar : majlisVenues.en;
  const diffRows = isAr ? differentiator.ar.rows : differentiator.en.rows;
  const streamCompare = isAr ? livestreamComparison.ar : livestreamComparison.en;

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
            dateModified: "2026-07-16",
            authorName: "Big Story Editorial",
          }),
          serviceSchema({
            locale,
            name: isAr ? "مصور فيديو زفاف دبي" : "Wedding Videographer Dubai",
            description: isAr
              ? "خدمة مصور فيديو الزفاف في دبي من بيك ستوري — RED Komodo X + FX3، تشويق نفس اليوم، بث مباشر، طاقم ذكور فقط. من 5,500 درهم."
              : "Wedding videography service in Dubai from Big Story — RED Komodo X + FX3, same-day teaser, live streaming, male-only crew. From AED 5,500.",
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
          <h1 className="mt-6 max-w-4xl text-[clamp(2.4rem,5.5vw,4rem)] leading-[1.05]">{t(COPY.h1, locale)}</h1>
          <p className="bs-lead mt-3 !max-w-3xl text-[color:var(--color-muted)]">{t(COPY.sub, locale)}</p>
          <p className="bs-lead mt-6 !max-w-3xl">{t(COPY.lead, locale)}</p>
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

      {/* PRICING TIERS — Small / Wedding Day / Premium */}
      <Section alt id="pricing">
        <Reveal>
          <Eyebrow>{isAr ? "الباقات الثلاث" : "The three tiers"}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr ? "من ريل 1–2 دقيقة إلى إنتاج سينمائي 5 دقائق" : "From a 1–2 min reel to a 5-min cinematic production"}
          </h2>
          <p className="bs-lead mt-6 !max-w-3xl">
            {isAr
              ? "كل باقة تشمل طاقم ذكور فقط، انضباط \"بلا قصات محرجة\" (5–8 ثوانٍ ثم إعادة توجيه)، Matte box + فلاتر سينمائية، ثنائي اللغة EN/AR، وتسعير بالدرهم."
              : "Every tier includes single-male crew, \"no embarrassing cut\" discipline (5–8 sec hold then redirect), matte box + cinema filters, bilingual EN/AR, and AED pricing in dirhams."}
          </p>
        </Reveal>
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {tiersList.map((card, i) => (
            <Reveal
              key={i}
              delay={i * 70}
              className={
                "bs-card flex flex-col" +
                ((card as { featured?: boolean }).featured ? " ring-2 ring-[color:var(--color-accent)]" : "")
              }
            >
              <p className="bs-eyebrow">{card.tag}</p>
              <p className="bs-num mt-4 text-3xl">{card.price}</p>
              <h3 className="mt-2 text-lg">{card.title}</h3>

              <div className="mt-6 space-y-3">
                <div>
                  <p className="text-xs uppercase tracking-wide text-[color:var(--color-muted)]">
                    {isAr ? "كاميرات" : "Cameras"}
                  </p>
                  <p className="mt-1 text-sm">{card.cameras}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-[color:var(--color-muted)]">
                    {isAr ? "طاقم" : "Crew"}
                  </p>
                  <p className="mt-1 text-sm">{card.crew}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-[color:var(--color-muted)]">
                    {isAr ? "مونتاج" : "Editing"}
                  </p>
                  <p className="mt-1 text-sm">{card.editing}</p>
                </div>
              </div>

              <p className="mt-6 text-xs uppercase tracking-wide text-[color:var(--color-muted)]">
                {isAr ? "المخرجات" : "Deliverables"}
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                {card.deliverables.map((line, j) => (
                  <li key={j} className="flex gap-2">
                    <span className="text-[color:var(--color-accent)]">·</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-sm font-medium">{card.teaser}</p>
              <p className="mt-4 text-xs text-[color:var(--color-muted)]">{card.note}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* LIVE STREAMING SECTION */}
      <Section id="live-streaming">
        <Reveal>
          <Eyebrow>{isAr ? "البث المباشر" : "Live streaming"}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr ? "بث مباشر بجودة البث — وليس هاتف على حامل" : "Broadcast-grade live streaming — not a phone on a tripod"}
          </h2>
          <p className="bs-lead mt-6 !max-w-3xl">
            {isAr
              ? "البث المباشر مشمول في الباقتين 2 و3. تبديل متعدد الكاميرات (RED + FX3 → سويتشَر)، مخرجات 4K، أوفرلاي ثنائي اللغة، وأرشيف 4 ساعات بجودة البث."
              : "Live streaming is included in Tier 2 and Tier 3. Multi-cam switched feed (RED + FX3 → switcher), 4K output, bilingual overlay, and a 4-hour broadcast-grade archive."}
          </p>
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <Reveal className="bs-card">
            <p className="bs-eyebrow">{streamCompare.typical.label}</p>
            <ul className="mt-6 space-y-3 text-sm text-[color:var(--color-muted)]">
              {streamCompare.typical.points.map((p, j) => (
                <li key={j} className="flex gap-2">
                  <span>✕</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={80} className="bs-card ring-2 ring-[color:var(--color-accent)]">
            <p className="bs-eyebrow !text-[color:var(--color-accent)]">{streamCompare.bigStory.label}</p>
            <ul className="mt-6 space-y-3 text-sm">
              {streamCompare.bigStory.points.map((p, j) => (
                <li key={j} className="flex gap-2">
                  <span className="text-[color:var(--color-accent)]">✓</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* PHOTO COMPARISON — LIVE STREAMING QUALITY */}
      <Section alt>
        <Reveal>
          <Eyebrow>{isAr ? "مقارنة بصرية" : "Photo comparison"}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr ? "كيف يبدو بث الزفاف العادي مقابل بث بيك ستوري" : "What a typical wedding livestream looks like vs a Big Story broadcast"}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Reveal className="bs-card">
            <div className="aspect-video w-full rounded-lg bg-gradient-to-br from-[color:var(--color-line)] to-[color:var(--color-bg-alt)] flex items-center justify-center">
              <div className="text-center p-6">
                <p className="text-xs uppercase tracking-wide text-[color:var(--color-muted)]">
                  {isAr ? "إطار نموذجي" : "Typical livestream frame"}
                </p>
                <p className="mt-3 text-2xl font-light">
                  {isAr ? "هاتف عمودي، مهتز، بت منخفض" : "Vertical phone · shaky · low bitrate"}
                </p>
                <p className="mt-2 text-xs text-[color:var(--color-muted)]">
                  720p · ~1.5 Mbps · no overlay
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-[color:var(--color-muted)]">
              {isAr
                ? "ما يحصل عليه الضيوف في الخارج عادةً: فيديو عمودي من هاتف مسنود على حامل، صوت غير واضح، بلا ترجمة، يسقط عندما يضعف الواي فاي."
                : "What overseas guests usually get: a vertical phone propped on a chair, unclear audio, no captions, drops when venue Wi-Fi drops."}
            </p>
          </Reveal>
          <Reveal delay={80} className="bs-card ring-2 ring-[color:var(--color-accent)]">
            <div className="aspect-video w-full rounded-lg bg-black flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1a1a1a] to-black" />
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs">
                <span className="text-[color:var(--color-accent)] font-medium tracking-wider">● LIVE</span>
                <span className="text-white/70">2,847 viewers</span>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white text-sm font-medium">Ahmed & Mariam · Dubai · 16 July 2026</p>
                <p className="text-white/60 text-xs mt-1">4K · 25 Mbps · bilingual EN/AR overlay</p>
              </div>
              <div className="text-center">
                <p className="text-xs uppercase tracking-wide text-white/60">
                  {isAr ? "إطار بث بيك ستوري" : "Big Story broadcast frame"}
                </p>
                <p className="mt-3 text-2xl font-light text-white">
                  {isAr ? "سينمائي 16:9، أوفرلاي، بث مستقر" : "Cinema 16:9 · overlay · stable"}
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm">
              {isAr
                ? "ما يحصل عليه الضيوف مع بيك ستوري: تبديل متعدد الكاميرات RED + FX3، أوفرلاي ثنائي اللغة، صوت Sennheiser نقي، بث مستقر، وأرشيف MP4 بجودة البث."
                : "What guests get with Big Story: multi-cam switched feed RED + FX3, bilingual overlay, clean Sennheiser audio, stable stream, broadcast-grade MP4 archive."}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* HOW WE'RE DIFFERENT */}
      <Section id="how-were-different">
        <Reveal>
          <Eyebrow>{isAr ? "كيف نختلف" : "How we're different"}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr ? "بيك ستوري مقابل مصوري الزفاف التقليديين" : "Big Story vs standard wedding videographers"}
          </h2>
        </Reveal>
        <div className="mt-12 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[color:var(--color-line)]">
                <th className="py-4 pr-6 text-left text-sm font-medium text-[color:var(--color-muted)]">
                  {isAr ? "القياسي" : "Standard"}
                </th>
                <th className="py-4 pl-6 text-left text-sm font-medium text-[color:var(--color-accent)]">
                  {isAr ? "بيك ستوري" : "Big Story"}
                </th>
              </tr>
            </thead>
            <tbody>
              {diffRows.map((row, i) => (
                <tr key={i} className="border-b border-[color:var(--color-line)]">
                  <td className="py-4 pr-6 text-sm text-[color:var(--color-muted)]">
                    <span className="mr-2 text-[color:var(--color-muted)]">✕</span>
                    {row.standard}
                  </td>
                  <td className="py-4 pl-6 text-sm">
                    <span className="mr-2 text-[color:var(--color-accent)]">✓</span>
                    {row.bigStory}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* EXTRAS THAT GO WITH ANY TIER — photographer + extra videographer add-ons */}
      <Section alt id="add-ons">
        <Reveal>
          <Eyebrow>{extrasAddonsBlock.eyebrow}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">{extrasAddonsBlock.h2}</h2>
          <p className="bs-lead mt-6 !max-w-3xl">{extrasAddonsBlock.lead}</p>
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {extrasAddonsBlock.cards.map((card, i) => (
            <Reveal
              key={i}
              delay={i * 80}
              className="bs-card flex flex-col ring-2 ring-[color:var(--color-accent)]/40"
            >
              <span className="bs-eyebrow !text-[color:var(--color-accent)] before:!bg-[color:var(--color-accent)]">
                {card.label}
              </span>
              <h3 className="mt-4 text-2xl">{card.title}</h3>
              <p className="bs-num mt-4 text-3xl text-[color:var(--color-accent)]">{card.price}</p>
              <p className="mt-4 text-sm">{card.description}</p>
              <ul className="mt-6 space-y-2 text-sm">
                {card.bullets.map((b, j) => (
                  <li key={j} className="flex gap-2">
                    <span className="text-[color:var(--color-accent)]">✓</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-[color:var(--color-muted)] border-t border-[color:var(--color-line)] pt-4">
                {card.rationale}
              </p>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-xs text-[color:var(--color-muted)]">
          {extrasAddonsBlock.footnote}
        </p>
      </Section>

      {/* GOVERNMENT MAJLIS VENUES */}
      <Section alt id="majlis-venues">
        <Reveal>
          <Eyebrow>{isAr ? "المجالس الحكومية الإماراتية" : "UAE government majlis venues"}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr
              ? "20 مجلساً حكومياً مجانياً + قاعات زفاف حكومية نصوّر فيها"
              : "20 free government majlis + government wedding halls we film at"}
          </h2>
          <p className="bs-lead mt-6 !max-w-3xl">
            {isAr
              ? "مجاناً للإماراتيين، مقدمة من الحكومة، مخصصة للزفاف. مصادر: بلدية دبي، هيئة المجتمع، Focus Hi Dubai، Dubai Media Office. طاقم ذكور فقط في كل حجز مجلس حكومي."
              : "Free for UAE nationals, government-provided, intended for weddings. Sources: Dubai Municipality, CDA, Focus Hi Dubai, Dubai Media Office. Male-only crew on every government-majlis booking."}
          </p>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {majlisList.map((v, i) => (
            <Reveal key={i} delay={i * 40} className="bs-card !p-5">
              <h3 className="text-sm font-medium">{v.name}</h3>
              <p className="mt-1 text-xs text-[color:var(--color-muted)]">{v.note}</p>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-xs text-[color:var(--color-muted)]">
          {isAr
            ? "مصادر: بلدية دبي · هيئة المجتمع (CDA) · Dubai Media Office · Focus Hi Dubai · Curly Tales · Khaleej Times"
            : "Sources: Dubai Municipality · Community Development Authority (CDA) · Dubai Media Office · Focus Hi Dubai · Curly Tales · Khaleej Times"}
        </p>
      </Section>

      {/* FAQ */}
      <Section id="faq">
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