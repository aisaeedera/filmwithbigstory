import type { Metadata } from "next";
import { type Locale, t } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { renderFaqPage, type FaqPageCopy } from "@/components/FaqPage";

const COPY: FaqPageCopy = {
  eyebrow: { en: "Commercial video pricing FAQ", ar: "أسئلة حول تسعير الفيديو التجاري" },
  h1: {
    en: "How much does commercial video production cost in Dubai?",
    ar: "كم تكلفة إنتاج الفيديو التجاري في دبي؟",
  },
  lead: {
    en: "TVC and brand-film pricing in Dubai, with rates for different lengths, formats and broadcast specifications. Built from Big Story's 2025–2026 commercial ledger.",
    ar: "تسعير الإعلانات التلفزيونية والأفلام التعريفية في دبي، بمعدلات للأطوال والصيغ ومواصفات البث المختلفة. مبني من سجل بيك ستوري التجاري 2025–2026.",
  },
  metaTitle: {
    en: "How much does commercial video production cost in Dubai in 2026?",
    ar: "كم تكلفة إنتاج الفيديو التجاري في دبي في 2026؟",
  },
  metaDescription: {
    en: "TVC and brand-film pricing in Dubai — 15, 30, 60-second spots. Broadcast-grade, social-grade, hero film. Sourced from Big Story's commercial ledger.",
    ar: "تسعير الإعلانات التلفزيونية والأفلام التعريفية في دبي — إعلانات 15 و30 و60 ثانية. درجة بث، درجة سوشيال، فيلم رئيسي. مصدّر من سجل بيك ستوري التجاري.",
  },
  dataStudyPath: "/services/cinematography-rates-dubai-2026",
  dataStudyLabel: {
    en: "Cinematography rates 2026 — original data study",
    ar: "أسعار التصوير السينمائي 2026 — دراسة بيانات أصلية",
  },
  sections: {
    en: [
      {
        q: "How much does a 30-second commercial cost in Dubai?",
        a: "A 30-second commercial (TVC) in Dubai starts at AED 22,000 for a single-camera social-quality spot. Network-grade 30-second spots with talent, permits, edit and grade land at AED 65,000–110,000 median. Big Story's median client price for a 30-sec broadcast spot is AED 81,600. Source: Big Story 2025 ledger (29 TVCs).",
      },
      {
        q: "How much does a 60-second commercial cost in Dubai?",
        a: "A 60-second commercial in Dubai runs AED 38,000–95,000 at the Big Story median band for cinema-grade brand films. Hero films above 60 seconds (90 sec–3 min) scale with shoot-day count, location count and animation/graphics scope. Source: Big Story brand-film ledger 2025.",
      },
      {
        q: "How much does a 15-second social commercial cost in Dubai?",
        a: "A 15-second social commercial (vertical reel) in Dubai runs AED 2,500–7,500 per finished piece. A batched 10-reel monthly content package runs AED 14,500–35,000 (median AED 22,000), which is the most cost-efficient way to feed paid social campaigns.",
      },
      {
        q: "What's the difference between a TVC and a brand film?",
        a: "A TVC is broadcast-grade and built for paid ad campaigns — tighter, spec-compliant, designed to work alongside media spend. A brand film is cinema-grade and built for organic reach — a website hero or brand story that earns attention. TVC median: AED 65,000–110,000. Brand film median: AED 32,000–65,000. Most Big Story clients do both from one shoot day.",
      },
      {
        q: "How much is a hero commercial for a product launch in Dubai?",
        a: "A hero commercial for a product launch in Dubai runs AED 65,000–150,000 for the 60-second hero, with social cut-downs (10–15 reels) included. Big Story's batched product-launch package (1-day shoot + 15 reels + 30-sec ad) lands at AED 14,500 for the social, with the hero 60-sec as a separate AED 32,000+ deliverable.",
      },
      {
        q: "How much does it cost to shoot a commercial in Dubai for a small business?",
        a: "For a small business, the cost-effective entry point is a social-quality commercial — a single reel shot in one day with a freelance videographer and FX3, edited and captioned, at AED 4,200 median. For a more polished cinema-grade brand film, the median is AED 18,500 (2–4 minute corporate video).",
      },
      {
        q: "What affects commercial video pricing in Dubai the most?",
        a: "Five cost drivers in order of impact: (1) shoot day count — 1 day vs 3 days triples the cost; (2) talent — non-union local talent starts at AED 1,500/day per actor, named talent can run AED 25,000+/day; (3) permits — DFTC adds AED 4,500–12,000 per day; (4) post-production complexity — color grade and sound design scale with runtime; (5) animation/motion graphics — adds AED 3,000–15,000 per piece.",
      },
      {
        q: "How long does commercial production take in Dubai?",
        a: "A single-day commercial shoot + 2–3 weeks of post-production is the standard timeline for a brand film or TVC in Dubai. Multi-day productions or hero campaigns run 4–8 weeks from concept lock to final master. Big Story delivers event highlight reels in 48–72 hours as a specialty.",
      },
    ],
    ar: [
      {
        q: "كم تكلفة إعلان تجاري 30 ثانية في دبي؟",
        a: "يبدأ إعلان تجاري 30 ثانية (TVC) في دبي من 22,000 درهم لنسخة أحادية الكاميرا بمستوى سوشيال. إعلانات 30 ثانية بمستوى شبكي مع مواهب وتصاريح ومونتاج وتدرج تصل 65,000–110,000 درهم في المتوسط. متوسط سعر بيك ستوري للعميل لإعلان بث 30 ثانية 81,600 درهم. المصدر: سجل بيك ستوري 2025 (29 إعلان تلفزيوني).",
      },
      {
        q: "كم تكلفة إعلان تجاري 60 ثانية في دبي؟",
        a: "يبلغ إعلان 60 ثانية في دبي 38,000–95,000 درهم في فئة متوسط بيك ستوري للأفلام التعريفية بدرجة سينمائية. الأفلام الرئيسية فوق 60 ثانية (90 ثانية – 3 دقائق) تتدرج حسب عدد أيام التصوير وعدد المواقع ونطاق الرسوم المتحركة. المصدر: سجل الأفلام التعريفية 2025.",
      },
      {
        q: "كم تكلفة إعلان سوشيال 15 ثانية في دبي؟",
        a: "يبلغ إعلان سوشيال 15 ثانية (ريل عمودي) في دبي 2,500–7,500 درهم للقطعة النهائية. باقة محتوى شهري من 10 ريلز مجمعة 14,500–35,000 درهم (متوسط 22,000)، وهي الطريقة الأكثر كفاءة من حيث التكلفة لتغذية حملات السوشيال المدفوعة.",
      },
      {
        q: "ما الفرق بين الإعلان التلفزيوني والفيلم التعريفي؟",
        a: "الإعلان التلفزيوني بدرجة بث ومبني للحملات الإعلانية المدفوعة — أدق ومطابق للمواصفات ومصمم للعمل مع الإنفاق الإعلاني. الفيلم التعريفي بدرجة سينمائية ومبني للوصول العضوي — واجهة موقع أو قصة علامة تكسب الانتباه. متوسط الإعلان التلفزيوني 65,000–110,000 درهم. متوسط الفيلم التعريفي 32,000–65,000 درهم. معظم عملاء بيك ستوري يفعلون الاثنين من يوم تصوير واحد.",
      },
      {
        q: "كم تكلفة إعلان رئيسي لإطلاق منتج في دبي؟",
        a: "يبلغ الإعلان الرئيسي لإطلاق منتج في دبي 65,000–150,000 درهم للقطعة الرئيسية 60 ثانية، مع نسخ سوشيال (10–15 ريل) مشمولة. باقة إطلاق المنتج المجمعة من بيك ستوري (تصوير يوم واحد + 15 ريل + 30 ثانية إعلانية) تصل إلى 14,500 درهم للسوشيال، مع الـ 60 ثانية الرئيسية كمخرج منفصل بـ 32,000+ درهم.",
      },
      {
        q: "كم تكلفة تصوير إعلان في دبي لشركة صغيرة؟",
        a: "للشركات الصغيرة، نقطة الدخول الفعالة من حيث التكلفة هي إعلان بمستوى سوشيال — ريل واحد يصور في يوم مع مصور فيديو مستقل و FX3، مع مونتاج وتعليق، بـ 4,200 درهم في المتوسط. لفيلم تعريفي بدرجة سينمائية أكثر صقلاً، المتوسط 18,500 درهم (فيديو شركات 2–4 دقائق).",
      },
      {
        q: "ما الذي يؤثر على تسعير الفيديو التجاري في دبي أكثر؟",
        a: "خمسة محركات للتكلفة حسب التأثير: (1) عدد أيام التصوير — يوم واحد مقابل 3 يضاعف التكلفة؛ (2) المواهب — المواهب المحلية غير النقابية تبدأ من 1,500 درهم/يوم للممثل، المواهب المعروفة قد تصل 25,000+ درهم/يوم؛ (3) التصاريح — DFTC يضيف 4,500–12,000 درهم/يوم؛ (4) تعقيد المونتاج — تدرج الألوان وتصميم الصوت يتدرجان مع المدة؛ (5) الرسوم المتحركة — تضيف 3,000–15,000 درهم للقطعة.",
      },
      {
        q: "كم يستغرق إنتاج إعلان تجاري في دبي؟",
        a: "تصوير ليوم واحد + 2–3 أسابيع مونتاج هو الجدول الزمني القياسي لفيلم تعريفي أو إعلان تلفزيوني في دبي. الإنتاجات متعددة الأيام أو الحملات الرئيسية تستغرق 4–8 أسابيع من اعتماد الفكرة حتى النسخة النهائية. تسلّم بيك ستوري أفلام ملخص الفعاليات خلال 48–72 ساعة كتخصص.",
      },
    ],
  },
  footerFaqs: {
    en: [
      { q: "Do I need a casting agency for my commercial in Dubai?", a: "Not for everyday talent — Big Story has an in-house casting list and can pull non-union local actors within 24–48 hours. For named talent or specific looks, we partner with regional casting agencies (in Dubai, Abu Dhabi and Beirut) and add 10–15% to the talent line." },
      { q: "Can I license music for my commercial in Dubai?", a: "Yes — we have relationships with UAE music libraries (BMG, APM, Sony Production Music) and can license a track for AED 3,500–25,000 depending on usage and territory. Bespoke compositions from local composers run AED 15,000–60,000." },
      { q: "Do commercial videos include closed captions in Arabic?", a: "Yes — Arabic subtitles are AED 60/minute and English are AED 40/minute. Big Story's broadcast packages include bilingual captions as standard; social packages include burned-in captions." },
    ],
    ar: [
      { q: "هل أحتاج وكالة اختيار ممثلين لإعلاني في دبي؟", a: "ليس للمواهب العادية — لدى بيك ستوري قائمة اختيار داخلية ويمكننا جلب ممثلين محليين غير نقابيين خلال 24–48 ساعة. للمواهب المعروفة أو المظاهر المحددة، نتشارك مع وكالات اختيار إقليمية (في دبي وأبوظبي وبيروت) ونضيف 10–15٪ لبند المواهب." },
      { q: "هل يمكنني ترخيص موسيقى لإعلاني في دبي؟", a: "نعم — لدينا علاقات مع مكتبات الموسيقى الإماراتية (BMG، APM، Sony Production Music) ويمكننا ترخيص مقطع بـ 3,500–25,000 درهم حسب الاستخدام والمنطقة. التراكيب المخصصة من ملحنين محليين 15,000–60,000 درهم." },
      { q: "هل تشمل الفيديوهات التجارية ترجمة عربية مغلقة؟", a: "نعم — الترجمة العربية 60 درهم/دقيقة والإنجليزية 40 درهم/دقيقة. باقات بيك ستوري للبث تشمل الترجمة ثنائية اللغة كقاعدة؛ باقات السوشيال تشمل التعليقات المدمجة." },
    ],
  },
  related: { en: "Related guides", ar: "أدلة ذات صلة" },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta({
    locale,
    title: t(COPY.metaTitle, locale),
    description: t(COPY.metaDescription, locale),
    path: "/faq/commercial-video-production-cost-dubai",
  });
}

export default async function CommercialVideoCostFaq({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return renderFaqPage({ path: "/faq/commercial-video-production-cost-dubai", copy: COPY, locale });
}