import type { L } from "@/lib/i18n";

export type CaseStudy = {
  slug: string;
  category: L; // filter tag: brand-film | corporate | social | event | documentary | product
  categoryLabel: L;
  client: L;
  title: L;
  summary: L;
  brief: L;
  approach: L;
  deliverables: L[];
  results: L;
  /** TODO(client): real shoot still — see CLIENT_HANDOFF.md */
  image?: string;
};

// Launch-phase case studies are concept frameworks (real client films added as they wrap),
// mirroring the current /work placeholders in CONTENT_MAP.md §2.
export const caseStudies: CaseStudy[] = [
  {
    slug: "dental-clinic-brand-film",
    category: { en: "brand-film", ar: "brand-film" },
    categoryLabel: { en: "Healthcare · Brand Film", ar: "الرعاية الصحية · فيلم تعريفي" },
    client: { en: "Dental & Clinic Brand Film", ar: "فيلم تعريفي لعيادة أسنان" },
    title: { en: "Calming new patients before they ever call", ar: "طمأنة المرضى الجدد قبل أن يتصلوا" },
    summary: {
      en: "A warm, trust-first film built to ease first-time patients — concept, tone and shot list mapped end to end.",
      ar: "فيلم دافئ يضع الثقة أولاً لطمأنة المرضى لأول مرة — الفكرة والنبرة وقائمة اللقطات مرسومة من البداية للنهاية.",
    },
    brief: {
      en: "Private clinics live or die on trust. The brief: make a nervous first-time patient feel safe enough to book, using the clinic's real team and real space rather than stock imagery.",
      ar: "العيادات الخاصة تعيش وتموت على الثقة. الإيجاز: اجعل المريض المتوتر لأول مرة يشعر بالأمان الكافي للحجز، باستخدام فريق العيادة ومساحتها الحقيقيين بدل الصور الجاهزة.",
    },
    approach: {
      en: "We lead with the patient's point of view — the door, the welcome, the calm — then let the dentist speak plainly to camera. Warm grade, soft sound design and a slow, reassuring pace do the emotional work.",
      ar: "نتصدر بوجهة نظر المريض — الباب، الترحيب، الهدوء — ثم نترك الطبيب يتحدث ببساطة أمام الكاميرا. التدرج الدافئ وتصميم الصوت الناعم والإيقاع البطيء المطمئن يؤدون العمل العاطفي.",
    },
    deliverables: [
      { en: "90-second hero clinic film", ar: "فيلم عيادة رئيسي بمدة 90 ثانية" },
      { en: "Treatment-specific short cuts", ar: "نسخ قصيرة خاصة بكل علاج" },
      { en: "Vertical reels for Instagram", ar: "ريلز عمودية لإنستغرام" },
    ],
    results: {
      en: "A film built to lift booking-intent by replacing anxiety with familiarity before the first appointment.",
      ar: "فيلم مصمم لرفع نية الحجز باستبدال القلق بالألفة قبل أول موعد.",
    },
  },
  {
    slug: "property-showcase",
    category: { en: "corporate", ar: "corporate" },
    categoryLabel: { en: "Real Estate · Storyboard-led", ar: "العقارات · قائم على القصة المصورة" },
    client: { en: "Property Showcase", ar: "عرض عقاري" },
    title: { en: "Making a space feel like a place people want to live", ar: "جعل المساحة تبدو مكاناً يرغب الناس بالعيش فيه" },
    summary: {
      en: "A storyboard-led approach to property film — planned shot by shot before the shoot so every frame sells the lifestyle.",
      ar: "نهج قائم على القصة المصورة لفيلم العقار — مخطط لقطة بلقطة قبل التصوير ليبيع كل إطار نمط الحياة.",
    },
    brief: {
      en: "Property films too often become a dull walkthrough. The brief: sell the feeling of living there, not the floor plan.",
      ar: "أفلام العقارات كثيراً ما تصبح جولة مملة. الإيجاز: بِع شعور العيش هناك، لا مخطط الطابق.",
    },
    approach: {
      en: "We storyboard a day in the life — light through the windows at dawn, the kitchen at breakfast, the view at golden hour. Motion and grade give the space warmth and aspiration.",
      ar: "نرسم قصة مصورة ليوم في الحياة — الضوء عبر النوافذ عند الفجر، المطبخ عند الإفطار، المنظر في الساعة الذهبية. الحركة والتدرج يمنحان المساحة الدفء والطموح.",
    },
    deliverables: [
      { en: "Hero property film", ar: "فيلم عقاري رئيسي" },
      { en: "Vertical walkthrough reels", ar: "ريلز جولة عمودية" },
      { en: "Key visuals for listings", ar: "صور رئيسية للإعلانات" },
    ],
    results: {
      en: "A repeatable, storyboard-first format that makes each development feel distinct and desirable.",
      ar: "صيغة متكررة تتصدرها القصة المصورة تجعل كل مشروع يبدو مميزاً ومرغوباً.",
    },
  },
  {
    slug: "product-smart-solutions-spot",
    category: { en: "product", ar: "product" },
    categoryLabel: { en: "Product & Tech · Production Approach", ar: "المنتجات والتقنية · نهج الإنتاج" },
    client: { en: "Product / Smart Solutions Spot", ar: "إعلان منتج / حلول ذكية" },
    title: { en: "Making a complex product feel simple and worth buying", ar: "جعل منتج معقد يبدو بسيطاً ويستحق الشراء" },
    summary: {
      en: "A tight concept, a clear message and a clean production plan that turns technical features into a reason to buy.",
      ar: "فكرة محكمة ورسالة واضحة وخطة إنتاج نظيفة تحوّل الميزات التقنية إلى سبب للشراء.",
    },
    brief: {
      en: "Smart-tech products are easy to over-explain. The brief: land one clear benefit, fast, without a spec sheet.",
      ar: "منتجات التقنية الذكية يسهل الإفراط في شرحها. الإيجاز: وصّل فائدة واحدة واضحة بسرعة دون ورقة مواصفات.",
    },
    approach: {
      en: "We open on the problem, reveal the product as the answer, and use motion-control macro plus clean UI motion to make the technology feel effortless. One message, one memorable frame.",
      ar: "نفتتح على المشكلة، ونكشف المنتج كالحل، ونستخدم الماكرو بالتحكم في الحركة إضافة إلى حركة واجهة نظيفة لتبدو التقنية سهلة. رسالة واحدة، إطار واحد لا يُنسى.",
    },
    deliverables: [
      { en: "30-second hero spot", ar: "إعلان رئيسي بمدة 30 ثانية" },
      { en: "15-second paid-ad cut-downs", ar: "نسخ إعلانات مدفوعة بمدة 15 ثانية" },
      { en: "Vertical demo reels", ar: "ريلز عرض عمودية" },
    ],
    results: {
      en: "A production approach that keeps complex products clear enough to convert on a cold feed.",
      ar: "نهج إنتاج يبقي المنتجات المعقدة واضحة بما يكفي للتحويل على خلاصة باردة.",
    },
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export const caseStudySlugs = caseStudies.map((c) => c.slug);

// Two representative case studies per service, for service-detail pages.
export function caseStudiesForService(): CaseStudy[] {
  return caseStudies.slice(0, 2);
}
