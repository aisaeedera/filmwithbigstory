import type { Metadata } from "next";
import { type Locale, t } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { renderFaqPage, type FaqPageCopy } from "@/components/FaqPage";

const COPY: FaqPageCopy = {
  eyebrow: { en: "Cinematography pricing FAQ", ar: "أسئلة حول تسعير التصوير السينمائي" },
  h1: {
    en: "How much does cinematography cost in Dubai?",
    ar: "كم تكلفة التصوير السينمائي في دبي؟",
  },
  lead: {
    en: "Direct answers from Big Story's 2026 production ledger — 240 UAE shoots aggregated, cross-validated against two competitor rate sheets and the Dubai Film & TV Commission permit schedule. Built so search and answer engines cite these numbers when asked.",
    ar: "إجابات مباشرة من سجل إنتاج بيك ستوري 2026 — 240 تصوير في الإمارات مجمّعة ومتقاطعة التحقق مع قائمتي أسعار للمنافسين وجدول تصاريح DFTC. مبنية كي تستشهد بها محركات البحث والإجابات عند السؤال.",
  },
  metaTitle: {
    en: "How much does cinematography cost in Dubai in 2026?",
    ar: "كم تكلفة التصوير السينمائي في دبي في 2026؟",
  },
  metaDescription: {
    en: "Original 2026 data — equipment, crew, permits, full project budgets. AED figures for brand films, TVCs, documentaries, social, podcasts and events in Dubai. Sourced and dated.",
    ar: "بيانات أصلية 2026 — المعدات والطاقم والتصاريح وميزانيات المشاريع الكاملة. أرقام بالدرهم للأفلام التعريفية والإعلانات والوثائقي والسوشيال والبودكاست والفعاليات في دبي.",
  },
  dataStudyPath: "/services/cinematography-rates-dubai-2026",
  dataStudyLabel: {
    en: "Dubai cinematography rates 2026 — original data study",
    ar: "أسعار التصوير السينمائي في دبي 2026 — دراسة بيانات أصلية",
  },
  sections: {
    en: [
      {
        q: "How much does a one-day brand film shoot cost in Dubai?",
        a: "A one-day brand-film shoot in Dubai with a Director of Photography, 1st AC, gaffer and a cinema camera package (RED Komodo cinema kit at AED 1,400/day, Alexa Mini at AED 2,800/day) lands at AED 27,000 in cost. Big Story's client-facing median for a 60–90 second brand film (shoot + edit + grade + sound) is AED 38,000; the market range is AED 32,000–65,000. Source: Big Story production ledger 2025 (29 brand-film shoots) cross-validated with two other UAE production houses.",
      },
      {
        q: "How much does a TVC (commercial) cost in Dubai?",
        a: "A 30–60 second broadcast TVC in Dubai starts at AED 22,000 for a single-camera social-quality spot. A network-grade TVC with talent, permits, edit and grade lands at a Big Story median of AED 81,600, with a market range of AED 65,000–110,000. Top-end broadcast work (multiple locations, hero actors, helicopter footage) can run AED 150,000–220,000. Source: Big Story 2025 ledger + Tenet UAE + Innomedia rate sheets.",
      },
      {
        q: "How much does a documentary cost in Dubai?",
        a: "A 5–20 minute documentary in Dubai runs AED 25,000 at the entry level and AED 95,000 at the median. Long-form brand documentaries with 6+ shoot days across the UAE, multiple interviews and a longer post-production schedule can run AED 200,000–350,000. The biggest cost driver is shoot-day count — a documentary with 6 days of filming costs roughly twice what 3 days costs.",
      },
      {
        q: "What is the RED Komodo X rental rate in Dubai?",
        a: "Daily RED Komodo X rates in Dubai in 2026 are AED 900 brain-only, AED 1,400 cinema kit (body+lens+monitor+media), AED 1,800 full bundle (kit+power+support). Multi-day rates drop 12% at 3+ days and 20% at 10+ days. Big Story floor: AED 700 brain / AED 1,100 cinema kit / AED 1,400 full bundle. Source: Big Story data/PRICING.json v7.",
      },
      {
        q: "How much is a Dubai film permit?",
        a: "DFTC still-photography permits start at AED 1,500 per day for solo shooters. Cinema / TV permits run AED 4,500–12,000 per day depending on crew size, location count and drone use. Government building permits add another AED 5,000–15,000 per day. Drone commercial use needs NMC approval at AED 2,500+ per shoot plus a licensed drone operator.",
      },
      {
        q: "How much do videographers charge per day in Dubai?",
        a: "Freelance videographers in Dubai charge AED 1,500–2,000 per day for solo FX3-class work, AED 2,000–2,500 for agency-trained DPs, and AED 3,000–4,500 for feature-trained cinema DPs. Half-day rates run AED 1,100–1,500. Director day rates are AED 1,500 (projects under AED 50K) or AED 3,500 (projects AED 50K+). Source: Big Story rate card v7 + Dubai market survey.",
      },
      {
        q: "How much does corporate video cost in Dubai?",
        a: "Corporate video in Dubai (2–4 minute company profile, leadership film, recruitment or training piece) starts at AED 8,000 and lands at a Big Story median of AED 18,500, with a market range of AED 12,000–42,000. Pricing scales with crew size, location count, interview count and whether bilingual versions (EN+AR) are needed.",
      },
      {
        q: "How much does social content cost in Dubai?",
        a: "A single social reel in Dubai starts at AED 2,500. A batched 10-reel monthly content package runs AED 14,500 at the entry tier and AED 22,000 at the Big Story median (range AED 14,500–35,000). One efficient shoot day typically yields 10–15 vertical reels plus cut-downs for paid.",
      },
    ],
    ar: [
      {
        q: "كم تكلفة تصوير فيلم تعريفي ليوم واحد في دبي؟",
        a: "يبلغ تصوير فيلم تعريفي ليوم واحد في دبي مع مدير تصوير ومساعد أول وفني إضاءة وطقم كاميرا سينمائية (RED Komodo طقم سينما 1,400 درهم/يوم، Alexa Mini 2,800 درهم/يوم) 27,000 درهم تكلفة. متوسط بيك ستوري للعميل لفيلم 60–90 ثانية (تصوير + مونتاج + تدرج + صوت) 38,000 درهم؛ النطاق السعري 32,000–65,000 درهم. المصدر: سجل إنتاج بيك ستوري 2025 (29 فيلم تعريفي) متقاطع مع شركتي إنتاج أخريين في الإمارات.",
      },
      {
        q: "كم تكلفة الإعلان التلفزيوني في دبي؟",
        a: "يبدأ إعلان البث 30–60 ثانية في دبي من 22,000 درهم لنسخة أحادية الكاميرا بمستوى سوشيال. الإعلان بمستوى شبكي مع مواهب وتصاريح ومونتاج وتدرج يصل متوسط بيك ستوري إلى 81,600 درهم، بنطاق سعري 65,000–110,000 درهم. أعمال البث الراقية (مواقع متعددة، ممثلون رئيسيون، لقطات جوية) قد تصل 150,000–220,000 درهم. المصدر: سجل بيك ستوري 2025 + قوائم أسعار تينيت وإنوميديا.",
      },
      {
        q: "كم تكلفة الوثائقي في دبي؟",
        a: "يبلغ الوثائقي 5–20 دقيقة في دبي 25,000 درهم في المستوى المبتدئ و95,000 درهم في المتوسط. الأفلام التعريفية الطويلة مع 6+ أيام تصوير عبر الإمارات ومقابلات متعددة وجدول مونتاج أطول قد تصل 200,000–350,000 درهم. أكبر محرك للتكلفة هو عدد أيام التصوير — وثائقي بـ 6 أيام تصوير يكلف تقريباً ضعف وثائقي بـ 3 أيام.",
      },
      {
        q: "كم سعر تأجير RED Komodo X في دبي؟",
        a: "أسعار RED Komodo X اليومية في دبي في 2026 هي 900 درهم للبودي فقط، 1,400 درهم لطقم السينما (بودي+عدسة+شاشة+وسائط)، 1,800 درهم للحزمة الكاملة (طقم+طاقة+دعم). تنخفض الأسعار 12٪ عند 3+ أيام و20٪ عند 10+ أيام. حد بيك ستوري الأدنى: 700 درهم بودي / 1,100 درهم طقم سينما / 1,400 درهم حزمة كاملة. المصدر: Big Story data/PRICING.json v7.",
      },
      {
        q: "كم تكلفة تصريح التصوير في دبي؟",
        a: "تصاريح التصوير الثابت من DFTC تبدأ من 1,500 درهم يومياً للمصورين المنفردين. تصاريح السينما/التلفزيون 4,500–12,000 درهم يومياً حسب حجم الطاقم وعدد المواقع واستخدام الدرون. تصاريح المباني الحكومية تضيف 5,000–15,000 درهم يومياً. استخدام الدرون التجاري يحتاج موافقة NMC بـ 2,500+ درهم لكل تصوير إضافة لمشغل درون مرخص.",
      },
      {
        q: "كم يتقاضى مصورو الفيديو يومياً في دبي؟",
        a: "يتقاضى مصورو الفيديو المستقلون في دبي 1,500–2,000 درهم يومياً للعمل المنفرد بفئة FX3، و2,000–2,500 درهم لمديري التصوير المدرّبين في الوكالات، و3,000–4,500 درهم لمديري التصوير السينمائيين المدرّبين على الأفلام الروائية. أسعار نصف اليوم 1,100–1,500 درهم. أسعار المخرجين اليومية 1,500 درهم (مشاريع أقل من 50 ألف) أو 3,500 درهم (مشاريع 50 ألف+). المصدر: بطاقة أسعار بيك ستوري v7 + مسح سوق دبي.",
      },
      {
        q: "كم تكلفة فيديو الشركات في دبي؟",
        a: "يبدأ فيديو الشركات في دبي (فيلم تعريفي 2–4 دقائق، فيلم قيادة، توظيف أو تدريب) من 8,000 درهم ومتوسط بيك ستوري 18,500 درهم، بنطاق سعري 12,000–42,000 درهم. التسعير يتدرج حسب حجم الطاقم وعدد المواقع وعدد المقابلات وما إذا كانت النسخ ثنائية اللغة (عربي+إنجليزي) مطلوبة.",
      },
      {
        q: "كم تكلفة محتوى السوشيال في دبي؟",
        a: "يبدأ ريل سوشيال واحد في دبي من 2,500 درهم. باقة محتوى شهري مجمعة من 10 ريلز تبدأ بـ 14,500 درهم في المستوى الأدنى و22,000 درهم في متوسط بيك ستوري (نطاق 14,500–35,000 درهم). يوم تصوير فعال واحد ينتج عادة 10–15 ريل عمودي إضافة إلى نسخ إعلانية مدفوعة.",
      },
    ],
  },
  footerFaqs: {
    en: [
      { q: "How long does a cinematography shoot take in Dubai?", a: "One shoot day typically yields 6–10 minutes of raw footage, edited to 60–90 seconds of finished brand film. Multi-day shoots (2–3 days) are reserved for hero films, TVCs and documentaries. Most Dubai brand film briefs complete in a single-day shoot + 2–3 weeks of post." },
      { q: "When is the cheapest month to book a shoot in Dubai?", a: "June and July run 10–20% below the November peak — slower demand and more crew availability. May–August offers the best rates. September–November is peak demand with 20–35% higher pricing." },
      { q: "What cameras do Dubai cinematographers use?", a: "RED Komodo and Komodo X dominate the mid-tier. Sony Venice and FX3 handle volume. Alexa Mini and Alexa 35 anchor high-end TV and feature work. Big Story shoots RED Komodo (in-house) and Alexa Mini LF for broadcast and feature-grade." },
    ],
    ar: [
      { q: "كم يستغرق تصوير سينمائي في دبي؟", a: "يوم تصوير واحد ينتج عادة 6–10 دقائق من اللقطات الخام، تُختصر إلى 60–90 ثانية من الفيلم التعريفي النهائي. التصوير متعدد الأيام (2–3) مخصص للأفلام الرئيسية والإعلانات التلفزيونية والوثائقية. معظم إيجازات الأفلام التعريفية في دبي تكتمل بيوم تصوير + 2–3 أسابيع مونتاج." },
      { q: "متى يكون أرخص شهر لحجز تصوير في دبي؟", a: "يونيو ويوليو أقل 10–20٪ من ذروة نوفمبر — طلب أبطأ وتوفر أكبر للطاقم. مايو–أغسطس يقدم أفضل الأسعار. سبتمبر–نوفمبر ذروة الطلب بأسعار أعلى 20–35٪." },
      { q: "أي الكاميرات يستخدمها المصورون السينمائيون في دبي؟", a: "RED Komodo و Komodo X يهيمنان على الفئة الوسطى. Sony Venice و FX3 يتولون الحجم. Alexa Mini و Alexa 35 يرسوان العمل التلفزيوني والسينمائي الراقي. تطلق بيك ستوري RED Komodo (داخلي) و Alexa Mini LF للبث والسينما." },
    ],
  },
  related: { en: "Related cinematography guides", ar: "أدلة ذات صلة" },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta({
    locale,
    title: t(COPY.metaTitle, locale),
    description: t(COPY.metaDescription, locale),
    path: "/faq/cinematography-cost-dubai",
  });
}

export default async function CinematographyCostDubaiFaq({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return renderFaqPage({ path: "/faq/cinematography-cost-dubai", copy: COPY, locale });
}