import type { L } from "@/lib/i18n";

export type FAQ = { q: L; a: L };
export type ProcessStep = { n: string; title: L; body: L };

export type Service = {
  slug: string;
  order: number;
  /** Short label for nav / cards */
  short: L;
  /** Full service name used in service page H1 */
  name: L;
  /** Name used in location H1: "{locName} in {City}" */
  locName: L;
  /** One-line card description */
  description: L;
  /** service page eyebrow */
  eyebrow: L;
  /** service page lead paragraph */
  lead: L;
  process: ProcessStep[];
  deliverables: L[];
  faqs: FAQ[];
  /** location intro — UAE-wide intro — no city tokens used anywhere on service pages */
  locIntro: L;
  /** location "on the ground" service angle — UAE-wide */
  groundAngle: L;
  /** 2 location FAQs — UAE-wide FAQs — no city tokens */
  locFaqs: FAQ[];
};

/* ------------------------------------------------------------------ *
 * EDUCATIONAL GUIDES — comparison / decision pages under /services/*  *
 * These are NOT service offerings. They are intentionally kept in a   *
 * separate `guides` array so they do NOT generate location pages,     *
 * service-index cards or Service schema. The [slug] route branches on *
 * getGuide() and renders an Article layout with FAQPage schema.       *
 * ------------------------------------------------------------------ */

/** A comparison table. `rows[i][0]` is the row label; the rest align to `columns`. */
export type GuideTable = { caption?: L; columns: L[]; rows: L[][] };

/** Ordered content blocks rendered top-to-bottom in the guide layout. */
export type GuideBlock =
  | { kind: "text"; heading: L; body: L }
  | { kind: "bullets"; heading: L; body?: L; items: L[] }
  | { kind: "table"; heading: L; intro?: L; table: GuideTable }
  | { kind: "decision"; heading: L; intro?: L; items: { when: L; then: L }[] };

export type Guide = {
  slug: string;
  /** eyebrow above H1 */
  eyebrow: L;
  /** <title> + og:title (without the " | Big Story" suffix) */
  metaTitle: L;
  metaDescription: L;
  /** page H1 */
  h1: L;
  /** lead paragraph under H1 */
  lead: L;
  blocks: GuideBlock[];
  faqs: FAQ[];
  /** slugs of real services to cross-link at the foot of the guide */
  related: string[];
  /** CTA band heading */
  ctaHeading: L;
};

export const services: Service[] = [
  {
    slug: "tvc-production",
    order: 1,
    short: { en: "TVC Production", ar: "إنتاج الإعلانات التلفزيونية" },
    name: { en: "TVC & Commercial Production", ar: "إنتاج الإعلانات التلفزيونية" },
    locName: { en: "TVC Production", ar: "إنتاج الإعلانات التلفزيونية" },
    description: {
      en: "Campaign-ready spots for TV, YouTube and social — concept to broadcast master.",
      ar: "إعلانات جاهزة للحملات على التلفزيون ويوتيوب والسوشيال — من الفكرة إلى النسخة النهائية للبث.",
    },
    eyebrow: { en: "TVCs & Commercials", ar: "الإعلانات التلفزيونية" },
    lead: {
      en: "Campaign-ready TVC production — concept, storyboard, shoot, post, master and broadcast plus social exports. Cinema-grade commercials made to be watched to the end.",
      ar: "إنتاج إعلانات تلفزيونية جاهزة للحملات — الفكرة، القصة المصورة، التصوير، المونتاج، النسخة النهائية للبث إضافة إلى نسخ السوشيال. إعلانات بمستوى سينمائي تُشاهَد حتى نهايتها.",
    },
    process: [
      { n: "01", title: { en: "Concept & script", ar: "الفكرة والنص" }, body: { en: "We shape the campaign idea, write the script and lock the creative before anything is booked.", ar: "نبلور فكرة الحملة ونكتب النص ونعتمد الاتجاه الإبداعي قبل حجز أي شيء." } },
      { n: "02", title: { en: "Storyboard & plan", ar: "القصة المصورة والتخطيط" }, body: { en: "Storyboard, shot list, casting, locations and schedule — every frame planned in advance.", ar: "قصة مصورة، قائمة لقطات، اختيار الممثلين، المواقع والجدول — كل لقطة مخطط لها مسبقاً." } },
      { n: "03", title: { en: "Shoot", ar: "التصوير" }, body: { en: "Cinema cameras, controlled lighting, direction and sound on a professional set.", ar: "كاميرات سينمائية وإضاءة محكومة وإخراج وصوت على موقع تصوير احترافي." } },
      { n: "04", title: { en: "Post & masters", ar: "المونتاج والنسخ النهائية" }, body: { en: "Edit, colour, sound design, then broadcast master plus every social cut-down.", ar: "المونتاج، تصحيح الألوان، تصميم الصوت، ثم النسخة النهائية للبث مع كل نسخ السوشيال." } },
    ],
    deliverables: [
      { en: "30 / 20 / 15 second broadcast masters", ar: "نسخ بث بمدة 30 و20 و15 ثانية" },
      { en: "60–90 second hero film", ar: "فيلم رئيسي بمدة 60–90 ثانية" },
      { en: "Vertical reels & story cut-downs", ar: "ريلز عمودية ونسخ ستوري" },
      { en: "Key visuals, thumbnails & captions", ar: "صور رئيسية ومصغرات وتعليقات" },
      { en: "Campaign-ready exports for every platform", ar: "نسخ جاهزة للحملات لكل منصة" },
    ],
    faqs: [
      { q: { en: "How long does a TVC take to produce?", ar: "كم يستغرق إنتاج الإعلان التلفزيوني؟" }, a: { en: "Most commercials run four to eight weeks from concept lock to final master, depending on cast, locations and the post schedule.", ar: "تستغرق معظم الإعلانات من أربعة إلى ثمانية أسابيع من اعتماد الفكرة حتى النسخة النهائية، حسب الممثلين والمواقع وجدول المونتاج." } },
      { q: { en: "Can one shoot cover TV and social?", ar: "هل يغطي تصوير واحد التلفزيون والسوشيال؟" }, a: { en: "Yes. We plan the shoot so a single production yields a broadcast master, vertical reels and paid-ad cut-downs — no second shoot needed.", ar: "نعم. نخطط للتصوير بحيث ينتج إنتاج واحد نسخة بث وريلز عمودية ونسخاً للإعلانات المدفوعة دون الحاجة لتصوير ثانٍ." } },
      { q: { en: "Do you handle casting and talent?", ar: "هل تتولون اختيار الممثلين والمواهب؟" }, a: { en: "We manage casting, talent contracts, wardrobe and usage rights as part of preproduction.", ar: "ندير اختيار الممثلين وعقود المواهب والأزياء وحقوق الاستخدام ضمن مرحلة ما قبل الإنتاج." } },
    ],
    locIntro: {
      en: "Big Story produces campaign-ready TVCs in the UAE — from concept and storyboard through to the final graded master. We handle casting, locations, cinema-grade camera and lighting, and post, so your commercial lands on TV, YouTube and social with the same polish.",
      ar: "تنتج بيك ستوري إعلانات تلفزيونية جاهزة للحملات في الإمارات — من الفكرة والقصة المصورة حتى النسخة النهائية المصححة الألوان. نتولى اختيار الممثلين والمواقع والكاميرا والإضاءة بمستوى سينمائي والمونتاج، ليصل إعلانك إلى التلفزيون ويوتيوب والسوشيال بالجودة نفسها.",
    },
    groundAngle: {
      en: "For a TVC that means scouting the right set, securing the permits and blocking the light so the shoot day runs without surprises.",
      ar: "بالنسبة للإعلان التلفزيوني يعني ذلك اختيار الموقع المناسب وتأمين التصاريح وضبط الإضاءة حتى يمر يوم التصوير دون مفاجآت.",
    },
    locFaqs: [
      { q: { en: "How long does a TVC take to produce in the UAE?", ar: "كم يستغرق إنتاج إعلان تلفزيوني في الإمارات؟" }, a: { en: "Most commercials run four to eight weeks from concept lock to final master, depending on cast, locations and the post schedule.", ar: "تستغرق معظم الإعلانات من أربعة إلى ثمانية أسابيع من اعتماد الفكرة حتى النسخة النهائية، حسب الممثلين والمواقع وجدول المونتاج." } },
      { q: { en: "Do you handle filming permits in the UAE?", ar: "هل تتولون تصاريح التصوير في الإمارات؟" }, a: { en: "Yes — arranging the location permits and approvals your shoot needs is part of our preproduction.", ar: "نعم — ترتيب تصاريح المواقع والموافقات التي يحتاجها تصويرك جزء من مرحلة ما قبل الإنتاج لدينا." } },
    ],
  },
  {
    slug: "brand-films",
    order: 2,
    short: { en: "Brand Films", ar: "الأفلام التعريفية للعلامات" },
    name: { en: "Brand Film Production", ar: "إنتاج الأفلام التعريفية للعلامات" },
    locName: { en: "Brand Film Production", ar: "إنتاج الأفلام التعريفية" },
    description: {
      en: "Story-led films that capture why your brand exists — purpose, founder and campaign.",
      ar: "أفلام تروي قصة تلتقط سبب وجود علامتك — الغاية وقصة المؤسس والحملة.",
    },
    eyebrow: { en: "Brand Films", ar: "الأفلام التعريفية" },
    lead: {
      en: "Story-led brand films — purpose, founder story and brand-led campaigns. Cinematic pieces that make people feel why your brand exists, not just what it sells.",
      ar: "أفلام تعريفية تروي قصة — الغاية وقصة المؤسس والحملات القائمة على العلامة. أعمال سينمائية تجعل الناس يشعرون بسبب وجود علامتك، لا بما تبيعه فقط.",
    },
    process: [
      { n: "01", title: { en: "Discover the story", ar: "اكتشاف القصة" }, body: { en: "We interview founders and teams to find the truth worth telling.", ar: "نجري مقابلات مع المؤسسين والفرق لنجد الحقيقة التي تستحق أن تُروى." } },
      { n: "02", title: { en: "Shape the narrative", ar: "صياغة السرد" }, body: { en: "Script, tone and structure that carry a message without a hard sell.", ar: "نص ونبرة وبنية تحمل رسالة دون بيع مباشر." } },
      { n: "03", title: { en: "Shoot cinematically", ar: "تصوير سينمائي" }, body: { en: "Controlled light, real locations and honest performances on cinema gear.", ar: "إضاءة محكومة ومواقع حقيقية وأداء صادق بمعدات سينمائية." } },
      { n: "04", title: { en: "Craft the edit", ar: "صياغة المونتاج" }, body: { en: "Edit, grade, music and sound design that give the film emotional weight.", ar: "مونتاج وتدرج ألوان وموسيقى وتصميم صوت تمنح الفيلم ثقلاً عاطفياً." } },
    ],
    deliverables: [
      { en: "2–3 minute hero brand film", ar: "فيلم تعريفي رئيسي بمدة 2–3 دقائق" },
      { en: "60 second campaign cut", ar: "نسخة حملة بمدة 60 ثانية" },
      { en: "Vertical reels & social teasers", ar: "ريلز عمودية وإعلانات تشويقية للسوشيال" },
      { en: "Website hero loop", ar: "مقطع رئيسي للموقع" },
      { en: "Stills & key visuals from the shoot", ar: "صور ثابتة وصور رئيسية من التصوير" },
    ],
    faqs: [
      { q: { en: "What's the difference between a brand film and a corporate video?", ar: "ما الفرق بين الفيلم التعريفي وفيديو الشركة؟" }, a: { en: "A brand film sells a feeling and a why; a corporate video explains a what. Brand films lead with story and emotion, corporate videos lead with clarity and information.", ar: "الفيلم التعريفي يبيع شعوراً وسبباً؛ فيديو الشركة يشرح ماذا. الأفلام التعريفية تتصدرها القصة والعاطفة، وفيديوهات الشركات تتصدرها الوضوح والمعلومة." } },
      { q: { en: "Do we need actors?", ar: "هل نحتاج ممثلين؟" }, a: { en: "Not always. Many of the strongest brand films use real founders, staff and customers — we cast only when the story calls for it.", ar: "ليس دائماً. كثير من أقوى الأفلام التعريفية تستخدم مؤسسين وموظفين وعملاء حقيقيين — نلجأ للاختيار فقط حين تتطلب القصة ذلك." } },
      { q: { en: "How do you keep it from feeling like an ad?", ar: "كيف تحافظون على ألا يبدو كإعلان؟" }, a: { en: "We lead with a real narrative and let the brand sit inside it. The result earns attention instead of demanding it.", ar: "نتصدر بسرد حقيقي ونترك العلامة داخله. النتيجة تكسب الانتباه بدل أن تطلبه." } },
    ],
    locIntro: {
      en: "Big Story makes story-led brand films in the UAE — founder journeys, purpose pieces and campaign films that make audiences feel why a brand exists. We plan the narrative, shoot cinematically and craft an edit that carries emotion.",
      ar: "تصنع بيك ستوري أفلاماً تعريفية تروي قصة في الإمارات — رحلات المؤسسين وأفلام الغاية وأفلام الحملات التي تجعل الجمهور يشعر بسبب وجود العلامة. نخطط للسرد ونصور سينمائياً ونصوغ مونتاجاً يحمل العاطفة.",
    },
    groundAngle: {
      en: "For a brand film that means finding real locations and moments across the emirate that make the story feel true and rooted.",
      ar: "بالنسبة للفيلم التعريفي يعني ذلك إيجاد مواقع ولحظات حقيقية عبر الإمارة تجعل القصة تبدو صادقة وراسخة.",
    },
    locFaqs: [
      { q: { en: "How long is a typical brand film?", ar: "ما مدة الفيلم التعريفي المعتاد؟" }, a: { en: "Most hero brand films run 90 seconds to three minutes, with shorter cut-downs delivered for social and paid campaigns.", ar: "تتراوح معظم الأفلام التعريفية الرئيسية بين 90 ثانية وثلاث دقائق، مع نسخ أقصر للسوشيال والحملات المدفوعة." } },
      { q: { en: "Can you film across the UAE and beyond?", ar: "هل يمكنكم التصوير في الإمارات وخارجها؟" }, a: { en: "Yes — we film on location across the UAE, arranging crew, kit and permits wherever the story leads.", ar: "نعم — نصور في المواقع عبر the UAE والإمارات، ونرتب الطاقم والمعدات والتصاريح أينما تقود القصة." } },
    ],
  },
  {
    slug: "corporate-video-production",
    order: 3,
    short: { en: "Corporate Video", ar: "فيديو الشركات" },
    name: { en: "Corporate Video Production", ar: "إنتاج فيديو الشركات" },
    locName: { en: "Corporate Video Production", ar: "إنتاج فيديو الشركات" },
    description: {
      en: "Company profiles, leadership, recruitment, internal comms and training films.",
      ar: "أفلام تعريفية للشركات والقيادة والتوظيف والاتصال الداخلي والتدريب.",
    },
    eyebrow: { en: "Corporate Video", ar: "فيديو الشركات" },
    lead: {
      en: "Company profiles, leadership films, recruitment, internal comms and training — clear, polished and watchable. Corporate video that explains and builds trust without feeling like a slideshow.",
      ar: "أفلام تعريفية للشركات وأفلام القيادة والتوظيف والاتصال الداخلي والتدريب — واضحة ومصقولة وممتعة للمشاهدة. فيديو شركات يشرح ويبني الثقة دون أن يبدو كعرض شرائح.",
    },
    process: [
      { n: "01", title: { en: "Understand the goal", ar: "فهم الهدف" }, body: { en: "Recruitment, sales, training or investor — we define who watches and what changes.", ar: "توظيف أو مبيعات أو تدريب أو مستثمرين — نحدد من يشاهد وما الذي يتغير." } },
      { n: "02", title: { en: "Script & structure", ar: "النص والبنية" }, body: { en: "A clear message map and interview questions so the story stays on point.", ar: "خريطة رسالة واضحة وأسئلة مقابلات لتبقى القصة في صلب الموضوع." } },
      { n: "03", title: { en: "Shoot on site", ar: "التصوير في الموقع" }, body: { en: "Interviews, b-roll and workplace footage captured with minimal disruption.", ar: "مقابلات ولقطات مساعدة وتصوير في مكان العمل بأقل قدر من التعطيل." } },
      { n: "04", title: { en: "Edit for clarity", ar: "مونتاج للوضوح" }, body: { en: "Tight edit, motion graphics and subtitles that keep every viewer with you.", ar: "مونتاج محكم ورسوم متحركة وترجمات تبقي كل مشاهد معك." } },
    ],
    deliverables: [
      { en: "2–4 minute company profile", ar: "فيلم تعريفي للشركة بمدة 2–4 دقائق" },
      { en: "Leadership & culture films", ar: "أفلام القيادة وثقافة العمل" },
      { en: "Recruitment & training modules", ar: "وحدات التوظيف والتدريب" },
      { en: "Subtitled & captioned versions", ar: "نسخ مترجمة ومزودة بتعليقات" },
      { en: "Social and internal-portal cut-downs", ar: "نسخ للسوشيال والبوابات الداخلية" },
    ],
    faqs: [
      { q: { en: "Can you film in our office without disrupting work?", ar: "هل يمكنكم التصوير في مكتبنا دون تعطيل العمل؟" }, a: { en: "Yes. We work in compact crews and schedule around your day so filming stays low-impact and professional.", ar: "نعم. نعمل بطواقم صغيرة ونجدول حول يوم عملكم ليبقى التصوير هادئ الأثر واحترافياً." } },
      { q: { en: "Do you provide Arabic and English versions?", ar: "هل توفرون نسختين بالعربية والإنجليزية؟" }, a: { en: "We deliver bilingual edits, subtitles and voiceover so one shoot serves both audiences.", ar: "نسلّم نسخاً ثنائية اللغة وترجمات وتعليقاً صوتياً بحيث يخدم تصوير واحد الجمهورين." } },
      { q: { en: "Can you handle interviews with senior leadership?", ar: "هل يمكنكم إدارة مقابلات مع كبار القيادة؟" }, a: { en: "We prepare questions in advance, direct gently on the day and keep the schedule tight to respect executive time.", ar: "نجهز الأسئلة مسبقاً ونوجه بلطف يوم التصوير ونحافظ على جدول محكم احتراماً لوقت التنفيذيين." } },
    ],
    locIntro: {
      en: "Big Story produces corporate video in the UAE — company profiles, leadership films, recruitment and training. We keep crews lean and schedules tight so filming fits around your business, and deliver clear, polished films in Arabic and English.",
      ar: "تنتج بيك ستوري فيديو الشركات في الإمارات — أفلام تعريفية وأفلام قيادة وتوظيف وتدريب. نبقي الطواقم صغيرة والجداول محكمة ليتناسب التصوير مع أعمالكم، ونسلّم أفلاماً واضحة ومصقولة بالعربية والإنجليزية.",
    },
    groundAngle: {
      en: "For corporate video that means filming inside offices, sites and boardrooms across the emirate with minimal disruption to your team.",
      ar: "بالنسبة لفيديو الشركات يعني ذلك التصوير داخل المكاتب والمواقع وقاعات الاجتماعات عبر الإمارة بأقل تعطيل لفريقكم.",
    },
    locFaqs: [
      { q: { en: "Can you film across multiple the UAE sites in one day?", ar: "هل يمكنكم التصوير في عدة مواقع بـ the UAE في يوم واحد؟" }, a: { en: "Yes — we plan a route and schedule that captures several locations efficiently, keeping crew time and cost controlled.", ar: "نعم — نخطط لمسار وجدول يلتقط عدة مواقع بكفاءة، مع ضبط وقت الطاقم والتكلفة." } },
      { q: { en: "Do you deliver bilingual versions?", ar: "هل تسلّمون نسخاً ثنائية اللغة؟" }, a: { en: "We provide Arabic and English edits, subtitles and voiceover from a single shoot in the UAE.", ar: "نوفر نسخاً بالعربية والإنجليزية وترجمات وتعليقاً صوتياً من تصوير واحد في الإمارات." } },
    ],
  },
  {
    slug: "product-videos",
    order: 4,
    short: { en: "Product Videos", ar: "فيديوهات المنتجات" },
    name: { en: "Product Video Production", ar: "إنتاج فيديوهات المنتجات" },
    locName: { en: "Product Video Production", ar: "إنتاج فيديوهات المنتجات" },
    description: {
      en: "Launches, demos, e-commerce and lifestyle films that make products desirable.",
      ar: "أفلام إطلاق وعروض توضيحية وتجارة إلكترونية وأسلوب حياة تجعل المنتجات مرغوبة.",
    },
    eyebrow: { en: "Product Films", ar: "أفلام المنتجات" },
    lead: {
      en: "Launches, demos, e-commerce and lifestyle product films. We make complex products feel simple and desirable — tight concept, clean production, tabletop and lifestyle in one shoot.",
      ar: "أفلام إطلاق وعروض توضيحية وتجارة إلكترونية وأسلوب حياة للمنتجات. نجعل المنتجات المعقدة تبدو بسيطة ومرغوبة — فكرة محكمة وإنتاج نظيف، تصوير طاولة وأسلوب حياة في جلسة واحدة.",
    },
    process: [
      { n: "01", title: { en: "Understand the product", ar: "فهم المنتج" }, body: { en: "The feature that matters, the buyer, and the single message to land.", ar: "الميزة المهمة والمشتري والرسالة الوحيدة التي يجب توصيلها." } },
      { n: "02", title: { en: "Design the look", ar: "تصميم المظهر" }, body: { en: "Set design, motion and lighting references locked before the shoot.", ar: "تصميم الموقع والحركة ومراجع الإضاءة معتمدة قبل التصوير." } },
      { n: "03", title: { en: "Shoot detail & lifestyle", ar: "تصوير التفاصيل وأسلوب الحياة" }, body: { en: "Macro tabletop, motion-control and in-use lifestyle in a controlled studio.", ar: "تصوير ماكرو للطاولة وتحكم بالحركة وأسلوب حياة أثناء الاستخدام في استوديو محكوم." } },
      { n: "04", title: { en: "Edit & motion", ar: "مونتاج وحركة" }, body: { en: "Edit, colour and motion graphics for web, retail and paid ads.", ar: "مونتاج وألوان ورسوم متحركة للويب والبيع بالتجزئة والإعلانات المدفوعة." } },
    ],
    deliverables: [
      { en: "Hero product film", ar: "فيلم رئيسي للمنتج" },
      { en: "15–30 second ad cut-downs", ar: "نسخ إعلانية بمدة 15–30 ثانية" },
      { en: "Vertical reels for feed and stories", ar: "ريلز عمودية للخلاصة والستوري" },
      { en: "E-commerce & product-page loops", ar: "مقاطع للتجارة الإلكترونية وصفحات المنتج" },
      { en: "Product stills & key visuals", ar: "صور المنتج والصور الرئيسية" },
    ],
    faqs: [
      { q: { en: "Can you shoot both studio and lifestyle in one booking?", ar: "هل يمكنكم تصوير الاستوديو وأسلوب الحياة في حجز واحد؟" }, a: { en: "Yes. We plan the day so tabletop detail and in-use lifestyle come from a single, efficient shoot.", ar: "نعم. نخطط لليوم بحيث تأتي تفاصيل الطاولة وأسلوب الحياة أثناء الاستخدام من تصوير واحد فعال." } },
      { q: { en: "Do you provide the set and props?", ar: "هل توفرون الموقع والإكسسوارات؟" }, a: { en: "We handle set design, surfaces, props and styling as part of production, matched to your brand.", ar: "نتولى تصميم الموقع والأسطح والإكسسوارات والتنسيق ضمن الإنتاج، بما يتناسب مع علامتكم." } },
      { q: { en: "Can you match our packaging and brand colours?", ar: "هل يمكنكم مطابقة تغليفنا وألوان علامتنا؟" }, a: { en: "Colour, lighting and grade are all tuned to your packaging and brand palette in post.", ar: "نضبط الألوان والإضاءة والتدرج لتطابق تغليفكم ولوحة ألوان علامتكم في مرحلة المونتاج." } },
    ],
    locIntro: {
      en: "Big Story shoots product films in the UAE — launches, demos, e-commerce and lifestyle. We combine macro tabletop detail with in-use lifestyle in a controlled setup, then grade and cut for web, retail and paid campaigns.",
      ar: "تصور بيك ستوري أفلام المنتجات في الإمارات — إطلاقات وعروض توضيحية وتجارة إلكترونية وأسلوب حياة. نجمع تفاصيل الماكرو على الطاولة مع أسلوب الحياة أثناء الاستخدام في إعداد محكوم، ثم نصحح الألوان ونقص للويب والتجزئة والحملات المدفوعة.",
    },
    groundAngle: {
      en: "For product work that means a controlled studio space or a real retail and lifestyle location across the emirate to match your brand world.",
      ar: "بالنسبة لأعمال المنتجات يعني ذلك مساحة استوديو محكومة أو موقع بيع وأسلوب حياة حقيقي عبر الإمارة يطابق عالم علامتكم.",
    },
    locFaqs: [
      { q: { en: "Do you have a studio in the UAE?", ar: "هل لديكم استوديو في الإمارات؟" }, a: { en: "We shoot in controlled studio spaces and on location across the UAE, choosing whichever setup best fits the product and budget.", ar: "نصور في مساحات استوديو محكومة وفي مواقع عبر the UAE، ونختار الإعداد الأنسب للمنتج والميزانية." } },
      { q: { en: "How fast can product films be turned around in the UAE?", ar: "ما سرعة تسليم أفلام المنتجات في الإمارات؟" }, a: { en: "A focused product shoot can be edited within one to two weeks, with faster turnarounds for social cut-downs.", ar: "يمكن مونتاج تصوير منتج مركّز خلال أسبوع إلى أسبوعين، مع تسليم أسرع لنسخ السوشيال." } },
    ],
  },
  {
    slug: "social-content",
    order: 5,
    short: { en: "Social Content", ar: "محتوى السوشيال" },
    name: { en: "Social Ad Content", ar: "محتوى إعلانات السوشيال" },
    locName: { en: "Social Content Production", ar: "إنتاج محتوى السوشيال" },
    description: {
      en: "Vertical reels, cut-downs and short-form built for the feed — TikTok, Reels, Shorts.",
      ar: "ريلز عمودية ونسخ قصيرة مصممة للخلاصة — تيك توك وريلز وشورتس.",
    },
    eyebrow: { en: "Social Ad Content", ar: "محتوى إعلانات السوشيال" },
    lead: {
      en: "Vertical reels, cut-downs and short-form built for the feed — TikTok, Instagram and YouTube Shorts. One shoot, a month of scroll-stopping content, optimised for how people actually watch.",
      ar: "ريلز عمودية ونسخ قصيرة مصممة للخلاصة — تيك توك وإنستغرام ويوتيوب شورتس. تصوير واحد وشهر من المحتوى الذي يوقف التمرير، محسّن لطريقة مشاهدة الناس الفعلية.",
    },
    process: [
      { n: "01", title: { en: "Content plan", ar: "خطة المحتوى" }, body: { en: "Hooks, formats and a shot plan built for vertical from the start.", ar: "خطافات وصيغ وخطة لقطات مبنية للعمودي منذ البداية." } },
      { n: "02", title: { en: "Batch shoot", ar: "تصوير دفعة" }, body: { en: "We capture a month of content in a single efficient production day.", ar: "نلتقط شهراً من المحتوى في يوم إنتاج واحد فعال." } },
      { n: "03", title: { en: "Edit for the feed", ar: "مونتاج للخلاصة" }, body: { en: "Fast cuts, captions, motion and sound tuned per platform.", ar: "قطع سريعة وتعليقات وحركة وصوت مضبوطة لكل منصة." } },
      { n: "04", title: { en: "Deliver in a set", ar: "تسليم كمجموعة" }, body: { en: "10–15 ready-to-post reels, sized and captioned for each channel.", ar: "10–15 ريل جاهزة للنشر، بمقاسات وتعليقات لكل قناة." } },
    ],
    deliverables: [
      { en: "10–15 vertical reels per shoot", ar: "10–15 ريل عمودي لكل تصوير" },
      { en: "15–30 second paid-ad cut-downs", ar: "نسخ إعلانات مدفوعة بمدة 15–30 ثانية" },
      { en: "Stories & platform-native formats", ar: "ستوري وصيغ أصلية لكل منصة" },
      { en: "Burned-in captions & subtitles", ar: "تعليقات وترجمات مدمجة" },
      { en: "Monthly content-package option", ar: "خيار باقة محتوى شهرية" },
    ],
    faqs: [
      { q: { en: "How many reels do we get from one shoot?", ar: "كم ريل نحصل عليه من تصوير واحد؟" }, a: { en: "A single production day typically yields 10–15 finished vertical pieces, plus paid-ad cut-downs from the same footage.", ar: "ينتج يوم إنتاج واحد عادة 10–15 قطعة عمودية نهائية، إضافة إلى نسخ إعلانات مدفوعة من اللقطات نفسها." } },
      { q: { en: "Do you offer monthly retainers?", ar: "هل تقدمون باقات شهرية؟" }, a: { en: "Yes — recurring monthly content packages keep your channels fed with a consistent, cinematic look.", ar: "نعم — باقات محتوى شهرية متكررة تبقي قنواتكم ممتلئة بمظهر سينمائي متسق." } },
      { q: { en: "Can you shoot in a way that suits both organic and paid?", ar: "هل يمكنكم التصوير بما يناسب العضوي والمدفوع؟" }, a: { en: "We plan hooks and cut-downs so the same content works for organic feed and performance ad campaigns.", ar: "نخطط للخطافات والنسخ بحيث يعمل المحتوى نفسه للخلاصة العضوية وحملات الأداء المدفوعة." } },
    ],
    locIntro: {
      en: "Big Story creates social ad content in the UAE — vertical reels, cut-downs and short-form for TikTok, Instagram and YouTube Shorts. We batch a month of scroll-stopping content in a single shoot, edited and captioned for each platform.",
      ar: "تصنع بيك ستوري محتوى إعلانات السوشيال في الإمارات — ريلز عمودية ونسخ قصيرة لتيك توك وإنستغرام ويوتيوب شورتس. نصور شهراً من المحتوى الموقف للتمرير في تصوير واحد، بمونتاج وتعليقات لكل منصة.",
    },
    groundAngle: {
      en: "For social content that means shooting fast and light in recognisable the UAE settings that feel native to the feed.",
      ar: "بالنسبة لمحتوى السوشيال يعني ذلك التصوير بسرعة وخفة في أماكن معروفة بـ the UAE تبدو أصيلة على الخلاصة.",
    },
    locFaqs: [
      { q: { en: "Can you shoot a month of content in the UAE in one day?", ar: "هل يمكنكم تصوير شهر من المحتوى في الإمارات في يوم واحد؟" }, a: { en: "Yes — a single batched shoot day in the UAE typically produces 10–15 finished vertical pieces ready to schedule.", ar: "نعم — يوم تصوير مجمّع واحد في الإمارات ينتج عادة 10–15 قطعة عمودية نهائية جاهزة للجدولة." } },
      { q: { en: "Do you offer recurring monthly packages?", ar: "هل تقدمون باقات شهرية متكررة؟" }, a: { en: "We run monthly content retainers for the UAE brands that need a steady stream of cinematic social content.", ar: "ندير باقات محتوى شهرية لعلامات the UAE التي تحتاج تدفقاً ثابتاً من محتوى سوشيال سينمائي." } },
    ],
  },
  {
    slug: "event-coverage",
    order: 6,
    short: { en: "Event Coverage", ar: "تغطية الفعاليات" },
    name: { en: "Event Coverage & Highlight Films", ar: "تغطية الفعاليات وأفلام الملخصات" },
    locName: { en: "Event Coverage", ar: "تغطية الفعاليات" },
    description: {
      en: "Conferences, launches, galas and MICE — multi-camera, livestream, 48–72h reels.",
      ar: "مؤتمرات وإطلاقات وحفلات و MICE — كاميرات متعددة وبث مباشر وملخصات خلال 48–72 ساعة.",
    },
    eyebrow: { en: "Event Coverage", ar: "تغطية الفعاليات" },
    lead: {
      en: "Conferences, launches, galas, MICE and livestream — multi-camera coverage with highlight reels delivered in 48–72 hours. A crew that shows up in blacks, on time, and never needs babysitting.",
      ar: "مؤتمرات وإطلاقات وحفلات و MICE وبث مباشر — تغطية بكاميرات متعددة مع أفلام ملخصات تُسلّم خلال 48–72 ساعة. طاقم يحضر بالزي الأسود في الوقت المحدد ولا يحتاج متابعة.",
    },
    process: [
      { n: "01", title: { en: "Pre-event brief", ar: "إحاطة ما قبل الفعالية" }, body: { en: "Run sheet, key moments, VIPs and deliverables agreed in advance.", ar: "جدول التشغيل واللحظات الرئيسية وكبار الضيوف والمخرجات متفق عليها مسبقاً." } },
      { n: "02", title: { en: "Multi-camera capture", ar: "التقاط بكاميرات متعددة" }, body: { en: "Stage, audience, detail and interviews covered by a coordinated crew.", ar: "المسرح والجمهور والتفاصيل والمقابلات يغطيها طاقم منسّق." } },
      { n: "03", title: { en: "Same-day selects", ar: "مقاطع مختارة في اليوم نفسه" }, body: { en: "Optional teaser cut on the night for social while the event is live.", ar: "نسخة تشويقية اختيارية في الليلة نفسها للسوشيال أثناء الفعالية." } },
      { n: "04", title: { en: "Fast highlight edit", ar: "مونتاج ملخص سريع" }, body: { en: "Highlight reel and after-movie delivered within 48–72 hours.", ar: "فيلم ملخص وفيلم لاحق يُسلّمان خلال 48–72 ساعة." } },
    ],
    deliverables: [
      { en: "60–120 second highlight reel", ar: "فيلم ملخص بمدة 60–120 ثانية" },
      { en: "Full-length after-movie", ar: "فيلم لاحق كامل" },
      { en: "Same-night social teaser (optional)", ar: "إعلان تشويقي للسوشيال في نفس الليلة (اختياري)" },
      { en: "Multi-camera keynote recording", ar: "تسجيل الكلمة الرئيسية بكاميرات متعددة" },
      { en: "Vertical reels & speaker cut-downs", ar: "ريلز عمودية ونسخ للمتحدثين" },
    ],
    faqs: [
      { q: { en: "How fast can you deliver a highlight reel?", ar: "ما سرعة تسليم فيلم الملخص؟" }, a: { en: "Standard turnaround is 48–72 hours; we also offer a same-night social teaser cut while the event is still live.", ar: "التسليم القياسي خلال 48–72 ساعة؛ كما نوفر نسخة تشويقية في نفس الليلة أثناء الفعالية." } },
      { q: { en: "Do you cover multi-day conferences?", ar: "هل تغطون المؤتمرات متعددة الأيام؟" }, a: { en: "Yes — we scale the crew and camera count to the programme, from a single keynote to a multi-stage, multi-day event.", ar: "نعم — نوسّع الطاقم وعدد الكاميرات حسب البرنامج، من كلمة واحدة إلى فعالية متعددة المنصات والأيام." } },
      { q: { en: "Can you livestream the event?", ar: "هل يمكنكم بث الفعالية مباشرة؟" }, a: { en: "We provide live-switched multi-camera streaming to your platforms alongside the recorded highlight package.", ar: "نوفر بثاً مباشراً بكاميرات متعددة إلى منصاتكم إلى جانب باقة الملخص المسجلة." } },
    ],
    locIntro: {
      en: "Big Story covers events in the UAE — conferences, launches, galas and MICE — with multi-camera crews and highlight reels delivered in 48–72 hours. We brief before the day, capture every key moment and can teaser-cut on the night.",
      ar: "تغطي بيك ستوري الفعاليات في الإمارات — مؤتمرات وإطلاقات وحفلات و MICE — بطواقم كاميرات متعددة وأفلام ملخصات تُسلّم خلال 48–72 ساعة. نأخذ الإحاطة قبل اليوم ونلتقط كل لحظة مهمة ويمكننا إعداد نسخة تشويقية في الليلة نفسها.",
    },
    groundAngle: {
      en: "For event coverage that means knowing the venues, the load-in rules and the light across the emirate so nothing is missed on the day.",
      ar: "بالنسبة لتغطية الفعاليات يعني ذلك معرفة القاعات وقواعد الدخول والإضاءة عبر الإمارة حتى لا يفوتنا شيء في اليوم.",
    },
    locFaqs: [
      { q: { en: "How quickly do you deliver reels after a the UAE event?", ar: "ما سرعة تسليم الملخصات بعد فعالية في الإمارات؟" }, a: { en: "Highlight reels are delivered within 48–72 hours, with an optional same-night social teaser while your the UAE event is live.", ar: "تُسلّم أفلام الملخصات خلال 48–72 ساعة، مع نسخة تشويقية اختيارية في نفس الليلة أثناء فعاليتكم في الإمارات." } },
      { q: { en: "Can you provide a multi-camera crew in the UAE?", ar: "هل يمكنكم توفير طاقم بكاميرات متعددة في الإمارات؟" }, a: { en: "Yes — we scale multi-camera crews to any the UAE venue, from a single keynote to a multi-stage conference.", ar: "نعم — نوسّع طواقم الكاميرات المتعددة لأي قاعة في الإمارات، من كلمة واحدة إلى مؤتمر متعدد المنصات." } },
    ],
  },
  {
    slug: "brochure-design",
    order: 8,
    short: { en: "Brochure Design", ar: "تصميم البروشورات" },
    name: { en: "Brochure Design & Print Collateral", ar: "تصميم البروشورات والمطبوعات" },
    locName: { en: "Brochure Design", ar: "تصميم البروشورات" },
    description: {
      en: "Print + digital brochures, pitch decks and brand collateral designed to convert.",
      ar: "بروشورات مطبوعة ورقمية وعروض تقديمية ومواد علامة تجارية مصممة للتحويل.",
    },
    eyebrow: { en: "Brochures & Print", ar: "البروشورات والطباعة" },
    lead: {
      en: "Brochure design and print collateral that turns a folder full of copy into a focused, well-designed sales tool — tri-fold A4, bi-fold corporate, digital flipbook or 10–15 page pitch deck. Layout, typography, photography integration and copy direction handled end to end. We hand off print-ready files, digital PDFs and source files in InDesign or Figma.",
      ar: "تصميم البروشورات والمطبوعات التي تحوّل مجلداً مليئاً بالنصوص إلى أداة مبيعات مركزة ومصممة بشكل جيد — ثلاثي الطي A4، ثنائي الطي للشركات، كتاب رقمي تفاعلي أو عرض تقديمي من 10–15 صفحة. معالجة التخطيط والطباعة ودمج الصور وتوجيه النص من البداية إلى النهاية. نسلّم ملفات جاهزة للطباعة وPDFs رقمية وملفات مصدرية بـ InDesign أو Figma.",
    },
    process: [
      { n: "01", title: { en: "Brief & content discovery", ar: "الإحاطة واكتشاف المحتوى" }, body: { en: "30-minute call to extract the right story, structure and call-to-action from your existing material.", ar: "مكالمة مدتها 30 دقيقة لاستخراج القصة الصحيحة والهيكل والدعوة لاتخاذ إجراء من موادك الحالية." } },
      { n: "02", title: { en: "Layout & copy direction", ar: "التخطيط وتوجيه النص" }, body: { en: "We lay out the structure, tighten the copy and lock the visual direction in two days.", ar: "نرتب الهيكل ونحكم النص ونعتمد الاتجاه البصري خلال يومين." } },
      { n: "03", title: { en: "Design + photography integration", ar: "التصميم ودمج التصوير" }, body: { en: "Visual design, photography integration, illustrations and infographics fully integrated.", ar: "تصميم بصري ودمج التصوير والرسوم التوضيحية والرسوم البيانية مدمجة بالكامل." } },
      { n: "04", title: { en: "Print + digital delivery", ar: "التسليم للطباعة والرقمي" }, body: { en: "Print-ready PDF (CMYK, 300dpi, bleed), digital PDF (RGB, email-ready) and source files.", ar: "PDF جاهز للطباعة (CMYK، 300dpi، تجاوز) وPDF رقمي (RGB، جاهز للبريد الإلكتروني) وملفات مصدرية." } },
    ],
    deliverables: [
      { en: "Print-ready PDF (CMYK, 300dpi, bleed)", ar: "PDF جاهز للطباعة (CMYK، 300dpi، تجاوز)" },
      { en: "Digital PDF (RGB, optimized for email)", ar: "PDF رقمي (RGB، محسّن للبريد الإلكتروني)" },
      { en: "Source files (InDesign or Figma)", ar: "ملفات مصدرية (InDesign أو Figma)" },
      { en: "Web version (optional, embedded on client site)", ar: "نسخة ويب (اختيارية، مدمجة في موقع العميل)" },
      { en: "Social cutdowns (square + 9:16)", ar: "نسخ للسوشيال (مربع + 9:16)" },
    ],
    faqs: [
      { q: { en: "What sizes do you offer?", ar: "ما الأحجام التي تقدمونها؟" }, a: { en: "Tri-fold A4, bi-fold A5/Letter, square 210×210mm pitch deck, or custom dimensions. We work to your print shop's specifications.", ar: "ثلاثي الطي A4، ثنائي الطي A5/Letter، عرض تقديمي مربع 210×210مم، أو أبعاد مخصصة. نعمل وفق مواصفات مطبعة العميل." } },
      { q: { en: "Do you write the copy?", ar: "هل تكتبون النص؟" }, a: { en: "We do copy editing and direction; full copywriting is available as an add-on with our content team. You provide the source material and we structure + polish it.", ar: "نقدم التحرير والتوجيه للنص؛ الكتابة الكاملة متاحة كإضافة مع فريق المحتوى. تقدمون المواد المصدرية ونحن نهيكلها ونحسّنها." } },
      { q: { en: "Can you integrate photos from our shoot?", ar: "هل يمكنكم دمج صور من تصويرنا؟" }, a: { en: "Yes — we pull from your existing Big Story photo archive or shoot fresh content. The brochure becomes a one-stop sales tool combining design + production.", ar: "نعم — نسحب من أرشيف صور بيغ ستوري الحالي أو نصوّر محتوى جديداً. تصبح البروشورة أداة مبيعات شاملة تجمع التصميم والإنتاج." } },
      { q: { en: "How fast is turnaround?", ar: "ما سرعة التسليم؟" }, a: { en: "Standard 5–7 working days from brief to print-ready. Express 48-hour turnaround available for urgent pitches.", ar: "5–7 أيام عمل من الإحاطة إلى الجاهز للطباعة. تسليم سريع خلال 48 ساعة متاح للعروض العاجلة." } },
      { q: { en: "Do you handle printing too?", ar: "هل تتولون الطباعة أيضاً؟" }, a: { en: "We handle design, layout and file delivery. Printing can be arranged via our partner network in Al Quoz at cost — typically AED 3–8 per copy for short runs.", ar: "نتولى التصميم والتخطيط وتسليم الملفات. يمكن ترتيب الطباعة عبر شبكة شركائنا في القوز بتكلفة — عادة 3–8 دراهم للنسخة في الكميات القليلة." } },
    ],
    locIntro: {
      en: "Big Story designs brochures in the UAE — tri-fold A4, bi-fold corporate, digital flipbook and pitch decks. We integrate your shoot photography into print-ready collateral, delivered in 5–7 days.",
      ar: "تصمم بيغ ستوري البروشورات في الإمارات — ثلاثي الطي A4، ثنائي الطي للشركات، كتب رقمية تفاعلية وعروض تقديمية. ندمج تصويركم في مواد جاهزة للطباعة، تُسلّم خلال 5–7 أيام.",
    },
    groundAngle: {
      en: "For brochure design that means fast-turnaround studios in the UAE, print partners in Al Quoz who can ship 100–10,000 copies within a week, and access to the same photographers and illustrators who shot your campaign.",
      ar: "بالنسبة لتصميم البروشورات يعني ذلك استوديوهات سريعة التسليم في الإمارات، شركاء طباعة في القوز يمكنهم شحن 100–10,000 نسخة خلال أسبوع، والوصول إلى نفس المصورين والرسامين الذين صوّروا حملتكم.",
    },
    locFaqs: [
      { q: { en: "How fast can you deliver brochures in the UAE?", ar: "ما سرعة تسليم البروشورات في الإمارات؟" }, a: { en: "Standard 5–7 working days from brief to print-ready. We work with the UAE-based print partners who can ship within 48 hours for urgent pitches.", ar: "5–7 أيام عمل من الإحاطة إلى الجاهز للطباعة. نعمل مع شركاء طباعة في الإمارات يمكنهم الشحن خلال 48 ساعة للعروض العاجلة." } },
      { q: { en: "Can brochures integrate with our the UAE photography?", ar: "هل يمكن دمج البروشورات مع تصويرنا في الإمارات؟" }, a: { en: "Yes — Big Story shoots in the UAE and the same archive feeds into your brochure design. No mismatched visuals between your film and your printed materials.", ar: "نعم — بيغ ستوري يصوّر في الإمارات ونفس الأرشيف يغذي تصميم البروشورات. لا توجد صور غير متطابقة بين فيلمكم ومطبوعاتكم." } },
    ],
  },
  {
    slug: "documentary",
    order: 7,
    short: { en: "Documentary", ar: "الأفلام الوثائقية" },
    name: { en: "Documentary Production", ar: "إنتاج الأفلام الوثائقية" },
    locName: { en: "Documentary Production", ar: "إنتاج الأفلام الوثائقية" },
    description: {
      en: "Founder stories, CSR films and long-form brand journalism, honestly made.",
      ar: "قصص المؤسسين وأفلام المسؤولية المجتمعية والصحافة الوثائقية للعلامات، مصنوعة بصدق.",
    },
    eyebrow: { en: "Documentary", ar: "الأفلام الوثائقية" },
    lead: {
      en: "Founder stories, CSR films and long-form brand journalism. Documentary that earns trust by showing something real — access, characters and a point of view, told with cinematic craft and an honest edit.",
      ar: "قصص المؤسسين وأفلام المسؤولية المجتمعية والصحافة الوثائقية للعلامات. أفلام وثائقية تكسب الثقة بإظهار شيء حقيقي — وصول وشخصيات ووجهة نظر، تُروى بحرفية سينمائية ومونتاج صادق.",
    },
    process: [
      { n: "01", title: { en: "Research & access", ar: "البحث والوصول" }, body: { en: "We find the real story and the people who can tell it honestly.", ar: "نجد القصة الحقيقية والأشخاص القادرين على روايتها بصدق." } },
      { n: "02", title: { en: "Direct with patience", ar: "إخراج بصبر" }, body: { en: "Observational filming that follows real people and real process.", ar: "تصوير رصدي يتابع أشخاصاً حقيقيين وعملية حقيقية." } },
      { n: "03", title: { en: "Interview & capture", ar: "المقابلة والالتقاط" }, body: { en: "Cinematic interviews, vérité footage and archive gathered over time.", ar: "مقابلات سينمائية ولقطات واقعية ومواد أرشيفية تُجمع بمرور الوقت." } },
      { n: "04", title: { en: "Shape the edit", ar: "صياغة المونتاج" }, body: { en: "A story-first edit with grade, music and sound that carries emotion.", ar: "مونتاج يتصدره السرد مع تدرج وموسيقى وصوت يحمل العاطفة." } },
    ],
    deliverables: [
      { en: "Long-form documentary (5–20 min)", ar: "فيلم وثائقي طويل (5–20 دقيقة)" },
      { en: "Short film & festival cut", ar: "فيلم قصير ونسخة مهرجانات" },
      { en: "Social teaser & trailer", ar: "إعلان تشويقي ومقطع دعائي للسوشيال" },
      { en: "Interview & vérité archive", ar: "أرشيف مقابلات ولقطات واقعية" },
      { en: "Subtitled Arabic & English versions", ar: "نسخ مترجمة بالعربية والإنجليزية" },
    ],
    faqs: [
      { q: { en: "What makes a good brand documentary?", ar: "ما الذي يصنع فيلماً وثائقياً جيداً للعلامة؟" }, a: { en: "A real story honestly told — access, characters and a point of view, not a polished sales pitch.", ar: "قصة حقيقية تُروى بصدق — وصول وشخصيات ووجهة نظر، لا عرض مبيعات مصقول." } },
      { q: { en: "How long does a documentary take?", ar: "كم يستغرق الفيلم الوثائقي؟" }, a: { en: "Long-form work runs longer than an ad — typically several weeks to months depending on access and scope.", ar: "العمل الطويل يستغرق أكثر من الإعلان — عادة عدة أسابيع إلى أشهر حسب الوصول والنطاق." } },
      { q: { en: "Can you produce Arabic-first documentaries?", ar: "هل يمكنكم إنتاج أفلام وثائقية بالعربية أولاً؟" }, a: { en: "Yes — Arabic script, interviews, voiceover and subtitles are all part of our production for government and local-brand work.", ar: "نعم — النص العربي والمقابلات والتعليق الصوتي والترجمات جزء من إنتاجنا لأعمال الجهات الحكومية والعلامات المحلية." } },
    ],
    locIntro: {
      en: "Big Story produces documentaries in the UAE — founder stories, CSR films and long-form brand journalism that earn trust by showing something real, told with cinematic craft and an honest edit.",
      ar: "تنتج بيك ستوري أفلاماً وثائقية في الإمارات — قصص المؤسسين وأفلام المسؤولية المجتمعية والصحافة الوثائقية التي تكسب الثقة بإظهار شيء حقيقي، تُروى بحرفية سينمائية ومونتاج صادق.",
    },
    groundAngle: {
      en: "For documentary that means filming on location across the emirate, following real people and process with the patience the form needs.",
      ar: "بالنسبة للفيلم الوثائقي يعني ذلك التصوير في المواقع عبر الإمارة، متابعة أشخاص حقيقيين وعملية حقيقية بالصبر الذي يتطلبه هذا النوع.",
    },
    locFaqs: [
      { q: { en: "What makes a good brand documentary?", ar: "ما الذي يصنع فيلماً وثائقياً جيداً للعلامة؟" }, a: { en: "A real story honestly told — access, characters and a point of view, not a polished sales pitch.", ar: "قصة حقيقية تُروى بصدق — وصول وشخصيات ووجهة نظر، لا عرض مبيعات مصقول." } },
      { q: { en: "How long does a documentary take in the UAE?", ar: "كم يستغرق الفيلم الوثائقي في الإمارات؟" }, a: { en: "Long-form work runs longer than an ad — typically several weeks to months depending on access and scope.", ar: "العمل الطويل يستغرق أكثر من الإعلان — عادة عدة أسابيع إلى أشهر حسب الوصول والنطاق." } },
    ],
  },

  ];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export const serviceSlugs = services.map((s) => s.slug);

/* ================================================================== *
 *  EDUCATIONAL GUIDES                                                 *
 * ================================================================== */

export const guides: Guide[] = [
  {
    slug: "video-production-guide",
    eyebrow: { en: "Video formats explained", ar: "شرح صيغ الفيديو" },
    metaTitle: {
      en: "Which Video Format Do You Need? TVC vs Brand Film vs Social Cut vs Documentary",
      ar: "أي صيغة فيديو تحتاج؟ الإعلان التلفزيوني مقابل الفيلم التعريفي مقابل نسخة السوشيال مقابل الوثائقي",
    },
    metaDescription: {
      en: "A plain-English guide to the four main video formats — what each is best for, how long it runs, its quality grade and real cost in AED — so you buy the right one, not the most expensive one.",
      ar: "دليل واضح للصيغ الأربع الرئيسية للفيديو — لأي غرض تصلح كل واحدة، ومدتها، ودرجة جودتها، وتكلفتها الحقيقية بالدرهم — لتشتري الصيغة المناسبة لا الأغلى.",
    },
    h1: { en: "Which video format do you actually need?", ar: "أي صيغة فيديو تحتاجها فعلاً؟" },
    lead: {
      en: "TVC, brand film, social cut, documentary — they sound interchangeable, but each is built for a different job, budget and quality grade. Here is how to tell them apart and choose the one that fits your goal.",
      ar: "الإعلان التلفزيوني، الفيلم التعريفي، نسخة السوشيال، الفيلم الوثائقي — تبدو متشابهة، لكن كل واحدة مصممة لغرض وميزانية ودرجة جودة مختلفة. إليك كيف تميّز بينها وتختار ما يناسب هدفك.",
    },
    blocks: [
      {
        kind: "text",
        heading: { en: "Q: Which video format is right for my brief — TVC, brand film, social cut or documentary?", ar: "س: أي صيغة فيديو تناسب إيجازي — إعلان تلفزيوني، فيلم تعريفي، نسخة سوشيال، أم وثائقي؟" },
        body: {
          en: "A: Most briefs go wrong because they name a format before they name a goal. \"We need a TVC\" often really means \"we need people to remember us.\" Decide the job first — sell a product, tell a founder story, feed the social calendar, build long-term trust — and the right format usually picks itself. The four formats below cover almost every brief a UAE brand brings us.",
          ar: "ج: معظم الإيجازات تخطئ لأنها تحدد الصيغة قبل أن تحدد الهدف. عبارة «نحتاج إعلاناً تلفزيونياً» تعني غالباً «نريد أن يتذكرنا الناس». حدّد الغرض أولاً — بيع منتج، رواية قصة مؤسس، تغذية تقويم السوشيال، بناء ثقة طويلة الأمد — وغالباً ما تختار الصيغة نفسها. الصيغ الأربع أدناه تغطي تقريباً كل إيجاز تقدمه علامة إماراتية.",
        },
      },
      {
        kind: "table",
        heading: { en: "Q: How do the four formats compare side by side?", ar: "س: كيف تقارن الصيغ الأربع جنباً إلى جنب؟" },
        table: {
          columns: [
            { en: "TVC", ar: "إعلان تلفزيوني" },
            { en: "Brand Film", ar: "فيلم تعريفي" },
            { en: "Social Cut", ar: "نسخة سوشيال" },
            { en: "Documentary", ar: "وثائقي" },
          ],
          rows: [
            [
              { en: "Best for", ar: "الأنسب لـ" },
              { en: "Paid ad campaigns, TV & YouTube pre-roll, agency briefs", ar: "الحملات المدفوعة وإعلانات التلفزيون ويوتيوب وإيجازات الوكالات" },
              { en: "Website hero, brand story, premium showcase", ar: "واجهة الموقع وقصة العلامة والعرض المميز" },
              { en: "Instagram, TikTok & YouTube Shorts", ar: "إنستغرام وتيك توك ويوتيوب شورتس" },
              { en: "CSR, founder stories, long-form brand journalism", ar: "المسؤولية المجتمعية وقصص المؤسسين والصحافة الوثائقية" },
            ],
            [
              { en: "Typical length", ar: "المدة المعتادة" },
              { en: "30–60 sec", ar: "30–60 ثانية" },
              { en: "60–90 sec", ar: "60–90 ثانية" },
              { en: "15–30 sec", ar: "15–30 ثانية" },
              { en: "5–20 min", ar: "5–20 دقيقة" },
            ],
            [
              { en: "Quality grade", ar: "درجة الجودة" },
              { en: "Broadcast grade (highest)", ar: "درجة البث (الأعلى)" },
              { en: "Cinema grade", ar: "درجة سينمائية" },
              { en: "High, feed-first", ar: "عالية، للخلاصة أولاً" },
              { en: "Cinema grade, long-form", ar: "سينمائية، طويلة" },
            ],
            [
              { en: "Cost (AED)", ar: "التكلفة (درهم)" },
              { en: "from 22,000", ar: "من 22,000" },
              { en: "from 12,000", ar: "من 12,000" },
              { en: "from 3,500", ar: "من 3,500" },
              { en: "from 50,000", ar: "من 50,000" },
            ],
            [
              { en: "Real example", ar: "مثال واقعي" },
              { en: "A 40-sec spot running across MBC and Meta", ar: "إعلان 40 ثانية يُعرض على MBC وميتا" },
              { en: "A 75-sec founder film on a clinic homepage", ar: "فيلم مؤسس 75 ثانية على واجهة موقع عيادة" },
              { en: "A 20-sec reel cut from a product launch", ar: "ريل 20 ثانية مقتطع من إطلاق منتج" },
              { en: "A 12-min CSR film following a real project", ar: "فيلم مسؤولية مجتمعية 12 دقيقة يتابع مشروعاً حقيقياً" },
            ],
          ],
        },
      },
      {
        kind: "text",
        heading: { en: "What \"quality grade\" actually means", ar: "ما معنى «درجة الجودة» فعلاً" },
        body: {
          en: "Broadcast grade (a TVC) means the film is built to a strict technical spec so it can pass network quality control and stand up next to a paid media budget — the tightest edit, the cleanest sound, the most controlled colour. Cinema grade (a brand film or documentary) is just as beautiful but built for organic reach rather than network delivery, so the craft goes into feeling and story instead of ad-spec compliance. Feed-first (a social cut) is optimised for a phone held vertically and a viewer deciding in half a second whether to keep watching. None is \"better\" — they are tuned for different rooms.",
          ar: "درجة البث (الإعلان التلفزيوني) تعني أن الفيلم مبني وفق مواصفات تقنية صارمة ليجتاز رقابة جودة الشبكات ويصمد إلى جانب ميزانية إعلانية مدفوعة — أدق مونتاج وأنقى صوت وأكثر الألوان انضباطاً. الدرجة السينمائية (الفيلم التعريفي أو الوثائقي) لا تقل جمالاً لكنها مبنية للوصول العضوي لا لتسليم الشبكات، فتذهب الحرفة إلى الإحساس والقصة بدل مطابقة مواصفات الإعلان. صيغة الخلاصة أولاً (نسخة السوشيال) محسّنة لهاتف ممسوك عمودياً ومشاهد يقرر خلال نصف ثانية إن كان سيكمل. لا واحدة «أفضل» — كلٌّ مضبوطة لغرفة مختلفة.",
        },
      },
      {
        kind: "decision",
        heading: { en: "If your budget is X, buy Y", ar: "إذا كانت ميزانيتك X، اشترِ Y" },
        intro: {
          en: "A rough map from budget to format. Real quotes are scoped to the brief, but this is the shape of it.",
          ar: "خريطة تقريبية من الميزانية إلى الصيغة. العروض الحقيقية تُحدد حسب الإيجاز، لكن هذا شكلها العام.",
        },
        items: [
          {
            when: { en: "Under AED 5,000 and you just need feed content", ar: "أقل من 5,000 درهم وتحتاج محتوى للخلاصة فقط" },
            then: { en: "A social cut (from AED 3,500) — one shoot yields several vertical reels.", ar: "نسخة سوشيال (من 3,500 درهم) — تصوير واحد يعطي عدة ريلز عمودية." },
          },
          {
            when: { en: "Around AED 12,000 for a website hero or brand story", ar: "نحو 12,000 درهم لواجهة موقع أو قصة علامة" },
            then: { en: "A brand film (from AED 12,000) — cinema-grade, 60–90 seconds.", ar: "فيلم تعريفي (من 12,000 درهم) — درجة سينمائية، 60–90 ثانية." },
          },
          {
            when: { en: "AED 22,000+ and you're spending on paid media", ar: "22,000 درهم فأكثر وتنفق على إعلانات مدفوعة" },
            then: { en: "A TVC (from AED 22,000) — broadcast-grade, so it passes network QC and earns its ad spend.", ar: "إعلان تلفزيوني (من 22,000 درهم) — درجة بث، يجتاز رقابة الجودة ويستحق ميزانيته الإعلانية." },
          },
          {
            when: { en: "AED 50,000+ and the goal is trust, not a hard sell", ar: "50,000 درهم فأكثر والهدف الثقة لا البيع المباشر" },
            then: { en: "A documentary (from AED 50,000) — long-form and character-led.", ar: "فيلم وثائقي (من 50,000 درهم) — طويل ويقوده الأشخاص." },
          },
        ],
      },
      {
        kind: "bullets",
        heading: { en: "One shoot, many formats", ar: "تصوير واحد، صيغ متعددة" },
        body: {
          en: "You rarely buy just one. A single well-planned production day can be cut into several deliverables, which is where the real value is:",
          ar: "نادراً ما تشتري صيغة واحدة. يوم إنتاج واحد مخطط جيداً يمكن تقطيعه إلى عدة مخرجات، وهنا تكمن القيمة الحقيقية:",
        },
        items: [
          { en: "A hero film (brand or TVC) as the centrepiece", ar: "فيلم رئيسي (تعريفي أو تلفزيوني) كقطعة محورية" },
          { en: "15–30 second cut-downs for paid ads", ar: "نسخ 15–30 ثانية للإعلانات المدفوعة" },
          { en: "Vertical social cuts for Reels, TikTok and Shorts", ar: "نسخ عمودية للريلز وتيك توك وشورتس" },
          { en: "Stills and key visuals pulled from the same footage", ar: "صور ثابتة وصور رئيسية من اللقطات نفسها" },
        ],
      },
    ],
    faqs: [
      {
        q: { en: "What's the difference between a TVC and a brand film?", ar: "ما الفرق بين الإعلان التلفزيوني والفيلم التعريفي؟" },
        a: {
          en: "A TVC is broadcast-grade and built for paid ad campaigns — tighter, spec-compliant and designed to work alongside media spend. A brand film is cinema-grade and built for organic reach — a website hero or brand story that earns attention rather than buying it.",
          ar: "الإعلان التلفزيوني بدرجة بث ومبني للحملات المدفوعة — أدق وأكثر مطابقة للمواصفات ومصمم للعمل مع الإنفاق الإعلاني. الفيلم التعريفي بدرجة سينمائية ومبني للوصول العضوي — واجهة موقع أو قصة علامة تكسب الانتباه بدل شرائه.",
        },
      },
      {
        q: { en: "Can I start with a social cut and upgrade later?", ar: "هل أبدأ بنسخة سوشيال وأطوّر لاحقاً؟" },
        a: {
          en: "Yes. Many clients begin with social cuts to test their message, then invest in a brand film or TVC once they know what resonates. A well-planned shoot can even produce both at once.",
          ar: "نعم. كثير من العملاء يبدؤون بنسخ سوشيال لاختبار رسالتهم، ثم يستثمرون في فيلم تعريفي أو إعلان تلفزيوني بعد معرفة ما يلقى صدى. بل يمكن لتصوير مخطط جيداً أن ينتج الاثنين معاً.",
        },
      },
    ],
    related: ["tvc-production", "brand-films", "social-content", "documentary"],
    ctaHeading: { en: "Not sure which format fits? Let's talk it through.", ar: "لست متأكداً أي صيغة تناسبك؟ لنتحدث." },
  },

  {
    slug: "photography-vs-video",
    eyebrow: { en: "Photo vs video", ar: "الصور مقابل الفيديو" },
    metaTitle: { en: "Photography vs Videography: When to Use Each", ar: "التصوير الفوتوغرافي مقابل الفيديو: متى تستخدم كلاً منهما" },
    metaDescription: {
      en: "Most brands need both photography and video — but in different amounts, for different jobs. A use-case guide to spending your budget where it counts, plus when a combined shoot saves money.",
      ar: "معظم العلامات تحتاج التصوير والفيديو معاً — لكن بكميات مختلفة ولأغراض مختلفة. دليل حسب الاستخدام لإنفاق ميزانيتك حيث تُحدث فرقاً، ومتى يوفّر التصوير المشترك المال.",
    },
    h1: { en: "Photography vs videography: when to use each", ar: "التصوير الفوتوغرافي مقابل الفيديو: متى تستخدم كلاً منهما" },
    lead: {
      en: "Most brands need both — but in different amounts, for different jobs. Here is a use-case-by-use-case guide to putting your budget where it counts, and when booking a photo and video shoot together saves you money.",
      ar: "معظم العلامات تحتاج الاثنين — لكن بكميات مختلفة ولأغراض مختلفة. إليك دليلاً حسب كل حالة استخدام لتضع ميزانيتك حيث تُحدث فرقاً، ومتى يوفّر لك حجز تصوير فوتوغرافي وفيديو معاً المال.",
    },
    blocks: [
      {
        kind: "text",
        heading: { en: "They do different jobs", ar: "لكلٍّ منهما وظيفة مختلفة" },
        body: {
          en: "Photography freezes a single, perfect moment — a product, a face, a space — that you can reuse for years across print, web and social. Video shows motion, sound and story unfolding over time, which is what carries a homepage, an ad or a reel. The mistake is treating them as substitutes. They are complements: the question is never \"which one\" but \"how much of each.\"",
          ar: "التصوير الفوتوغرافي يجمّد لحظة واحدة مثالية — منتج، وجه، مساحة — يمكنك إعادة استخدامها سنوات عبر الطباعة والويب والسوشيال. الفيديو يُظهر الحركة والصوت والقصة وهي تتكشف عبر الزمن، وهذا ما يحمل واجهة الموقع أو الإعلان أو الريل. الخطأ هو معاملتهما كبديلين. هما مكمّلان: السؤال ليس «أيهما» بل «كم من كلٍّ منهما».",
        },
      },
      {
        kind: "table",
        heading: { en: "Side by side", ar: "جنباً إلى جنب" },
        table: {
          columns: [
            { en: "Photography", ar: "التصوير الفوتوغرافي" },
            { en: "Videography", ar: "الفيديو" },
          ],
          rows: [
            [
              { en: "Captures", ar: "يلتقط" },
              { en: "A single, perfect moment", ar: "لحظة واحدة مثالية" },
              { en: "Motion, sound and story over time", ar: "الحركة والصوت والقصة عبر الزمن" },
            ],
            [
              { en: "Best for", ar: "الأنسب لـ" },
              { en: "Product shots, team portraits, print, social posts", ar: "صور المنتجات وصور الفريق والطباعة ومنشورات السوشيال" },
              { en: "Web hero, ads, social reels, brand story", ar: "واجهة الموقع والإعلانات وريلز السوشيال وقصة العلامة" },
            ],
            [
              { en: "Post-production", ar: "ما بعد الإنتاج" },
              { en: "Colour + retouch", ar: "تصحيح الألوان والتنقيح" },
              { en: "Edit + colour + sound + music", ar: "مونتاج وألوان وصوت وموسيقى" },
            ],
            [
              { en: "Output", ar: "المخرجات" },
              { en: "JPG / PNG, print-ready", ar: "JPG / PNG، جاهزة للطباعة" },
              { en: "MP4 / MOV, web & social", ar: "MP4 / MOV، للويب والسوشيال" },
            ],
            [
              { en: "Cost (AED)", ar: "التكلفة (درهم)" },
              { en: "Half-day from 2,500; full-day from 7,000", ar: "نصف يوم من 2,500؛ يوم كامل من 7,000" },
              { en: "Social cut from 3,500; brand film from 12,000", ar: "نسخة سوشيال من 3,500؛ فيلم تعريفي من 12,000" },
            ],
          ],
        },
      },
      {
        kind: "decision",
        heading: { en: "Pick by use case", ar: "اختر حسب الاستخدام" },
        items: [
          {
            when: { en: "Website hero section", ar: "قسم واجهة الموقع" },
            then: { en: "Video — a brand film or hero loop earns attention on a homepage.", ar: "فيديو — فيلم تعريفي أو مقطع رئيسي يكسب الانتباه على الصفحة الرئيسية." },
          },
          {
            when: { en: "Social feed (organic)", ar: "خلاصة السوشيال (عضوي)" },
            then: { en: "Both — stills for grid posts, vertical video for reels. A batch shoot covers a month.", ar: "الاثنان — صور للمنشورات وفيديو عمودي للريلز. تصوير مجمّع يغطي شهراً." },
          },
          {
            when: { en: "Print — brochures, signage, packaging", ar: "الطباعة — البروشورات واللافتات والتغليف" },
            then: { en: "Photography — high-resolution stills reproduce cleanly at print sizes.", ar: "تصوير فوتوغرافي — الصور عالية الدقة تُطبع بنقاء بالأحجام الكبيرة." },
          },
          {
            when: { en: "Paid ads", ar: "الإعلانات المدفوعة" },
            then: { en: "Video first — motion converts — with stills as supporting creative.", ar: "الفيديو أولاً — الحركة تحوّل — مع صور كعناصر داعمة." },
          },
          {
            when: { en: "E-commerce / product pages", ar: "التجارة الإلكترونية / صفحات المنتجات" },
            then: { en: "Photography (from AED 500/item), plus an optional 60-sec product video for hero SKUs.", ar: "تصوير فوتوغرافي (من 500 درهم للقطعة)، مع فيديو منتج 60 ثانية اختياري للمنتجات الرئيسية." },
          },
        ],
      },
      {
        kind: "text",
        heading: { en: "When to bundle", ar: "متى تجمع بينهما" },
        body: {
          en: "Booking photo and video on the same day shares the crew, the location and the setup, so you pay for that groundwork once instead of twice. A typical bundle is a half-day photo shoot (from AED 2,500) alongside a hero brand film (from AED 12,000) off a single call sheet — the stills feed your product pages and print while the film carries your homepage and ads. If your brand is being built from scratch, plan both together from the first brief.",
          ar: "حجز التصوير والفيديو في اليوم نفسه يشارك الطاقم والموقع والإعداد، فتدفع مقابل هذا التأسيس مرة واحدة بدل مرتين. الباقة المعتادة هي تصوير فوتوغرافي نصف يوم (من 2,500 درهم) مع فيلم تعريفي رئيسي (من 12,000 درهم) من جدول تصوير واحد — تغذي الصور صفحات منتجاتك وطباعتك بينما يحمل الفيلم صفحتك الرئيسية وإعلاناتك. إن كنت تبني علامتك من الصفر، خطط للاثنين معاً من أول إيجاز.",
        },
      },
      {
        kind: "bullets",
        heading: { en: "Rules of thumb", ar: "قواعد عامة" },
        items: [
          { en: "If it moves or speaks, it wants video.", ar: "إن كان يتحرك أو يتكلم، فهو يريد فيديو." },
          { en: "If it needs to print sharp, it wants photography.", ar: "إن كان يحتاج طباعة حادة، فهو يريد تصويراً فوتوغرافياً." },
          { en: "For social, you need both — refreshed often.", ar: "للسوشيال تحتاج الاثنين — مع تحديث متكرر." },
          { en: "Shoot them together to halve the setup cost.", ar: "صوّرهما معاً لتخفض تكلفة الإعداد إلى النصف." },
        ],
      },
    ],
    faqs: [
      {
        q: { en: "Do I really need both photography and video?", ar: "هل أحتاج التصوير والفيديو معاً فعلاً؟" },
        a: {
          en: "Usually yes, but rarely in equal measure. Video carries your hero moments — homepage, ads, reels — while photography fills the everyday gaps: product pages, print, team portraits and the social grid. We help you split the budget so neither is over-bought.",
          ar: "غالباً نعم، لكن نادراً بالتساوي. الفيديو يحمل لحظاتك الرئيسية — الصفحة الرئيسية والإعلانات والريلز — بينما التصوير الفوتوغرافي يملأ الفجوات اليومية: صفحات المنتجات والطباعة وصور الفريق ومنشورات السوشيال. نساعدك على تقسيم الميزانية بحيث لا يُشترى أحدهما أكثر من اللازم.",
        },
      },
      {
        q: { en: "Is it cheaper to shoot photo and video together?", ar: "هل التصوير الفوتوغرافي والفيديو معاً أرخص؟" },
        a: {
          en: "Yes. A combined shoot shares the location, lighting and crew call, so you only pay for that setup once. Many clients bundle a half-day photo shoot with a brand-film day and save on both.",
          ar: "نعم. التصوير المشترك يشارك الموقع والإضاءة واستدعاء الطاقم، فتدفع مقابل الإعداد مرة واحدة. كثير من العملاء يجمعون تصويراً فوتوغرافياً نصف يوم مع يوم فيلم تعريفي ويوفرون في الاثنين.",
        },
      },
    ],
    related: ["product-videos", "brand-films", "social-content"],
    ctaHeading: { en: "Plan your photo and video budget with us.", ar: "خطط لميزانية الصور والفيديو معنا." },
  },

  {
    slug: "brochure-design-2026",
    eyebrow: { en: "Print in a digital world", ar: "الطباعة في عالم رقمي" },
    metaTitle: { en: "Why Brochures Still Matter in 2026", ar: "لماذا لا تزال البروشورات مهمة في 2026" },
    metaDescription: {
      en: "In an all-digital pitch, a well-designed brochure is the thing a client keeps. Where print still wins, how print vs digital vs combined compare, and what a brochure costs and takes to deliver in Dubai.",
      ar: "في عرض رقمي بالكامل، البروشور المصمم جيداً هو ما يحتفظ به العميل. أين تتفوق الطباعة، وكيف تتقارن المطبوعة والرقمية والمدمجة، وكم تكلفة البروشور ومدة تسليمه في دبي.",
    },
    h1: { en: "Why brochures still matter in 2026", ar: "لماذا لا تزال البروشورات مهمة في 2026" },
    lead: {
      en: "In an all-digital pitch, a well-designed brochure is the one thing a prospect actually keeps. Here is where print still wins, how print, digital and combined formats compare, and what a brochure costs and takes to deliver in Dubai.",
      ar: "في عرض رقمي بالكامل، البروشور المصمم جيداً هو الشيء الوحيد الذي يحتفظ به العميل المحتمل فعلاً. إليك أين تتفوق الطباعة، وكيف تتقارن الصيغ المطبوعة والرقمية والمدمجة، وكم تكلفة البروشور ومدة تسليمه في دبي.",
    },
    blocks: [
      {
        kind: "text",
        heading: { en: "The brochure isn't dead — it changed jobs", ar: "البروشور لم يمت — بل تغيّرت وظيفته" },
        body: {
          en: "The mass-mailed leaflet is gone, and good riddance. What replaced it is sharper: a focused, well-designed sales tool that does one job in the room where a decision gets made. A brochure is no longer how you reach people — that's your website and your ads — it is what you hand them once you have their attention. In a market like the UAE, where deals still close face to face and at events, that physical object earns its place.",
          ar: "المنشور المُرسل بالجملة انتهى، وهذا جيد. ما حلّ محله أكثر حدّة: أداة مبيعات مركزة ومصممة جيداً تؤدي وظيفة واحدة في الغرفة التي يُتخذ فيها القرار. البروشور لم يعد وسيلتك للوصول إلى الناس — هذا دور موقعك وإعلاناتك — بل هو ما تسلّمه لهم بعد أن تكسب انتباههم. في سوق كالإمارات، حيث لا تزال الصفقات تُغلق وجهاً لوجه وفي الفعاليات، يستحق هذا الشيء المادي مكانه.",
        },
      },
      {
        kind: "bullets",
        heading: { en: "Four times a brochure still wins", ar: "أربع حالات لا يزال البروشور يفوز فيها" },
        items: [
          { en: "Sales meetings — a physical handout the prospect keeps on their desk after the call.", ar: "اجتماعات المبيعات — نسخة مطبوعة يحتفظ بها العميل على مكتبه بعد اللقاء." },
          { en: "Conferences & trade shows — a giveaway that outlives the badge scan.", ar: "المؤتمرات والمعارض — مادة توزيع تدوم أطول من مسح البطاقة." },
          { en: "Investor decks — polished collateral that signals you take the raise seriously.", ar: "عروض المستثمرين — مواد مصقولة تُظهر أنك تأخذ جولة التمويل بجدية." },
          { en: "Print-on-demand — short runs for a specific event, printed in Al Quoz within a week.", ar: "الطباعة عند الطلب — كميات قليلة لفعالية محددة، تُطبع في القوز خلال أسبوع." },
        ],
      },
      {
        kind: "table",
        heading: { en: "Print vs digital vs combined", ar: "المطبوعة مقابل الرقمية مقابل المدمجة" },
        table: {
          columns: [
            { en: "Print", ar: "مطبوعة" },
            { en: "Digital", ar: "رقمية" },
            { en: "Combined", ar: "مدمجة" },
          ],
          rows: [
            [
              { en: "Best for", ar: "الأنسب لـ" },
              { en: "Meetings, events, leave-behinds", ar: "الاجتماعات والفعاليات والمواد المتروكة" },
              { en: "Email, WhatsApp, website", ar: "البريد وواتساب والموقع" },
              { en: "Most brands — one design, both uses", ar: "معظم العلامات — تصميم واحد، استخدامان" },
            ],
            [
              { en: "File", ar: "الملف" },
              { en: "CMYK, 300dpi, bleed, print-ready", ar: "CMYK، 300dpi، تجاوز، جاهز للطباعة" },
              { en: "RGB, compressed, email-ready", ar: "RGB، مضغوط، جاهز للبريد" },
              { en: "Both, from one source file", ar: "الاثنان، من ملف مصدري واحد" },
            ],
            [
              { en: "Price (AED)", ar: "السعر (درهم)" },
              { en: "from 1,500", ar: "من 1,500" },
              { en: "from 800", ar: "من 800" },
              { en: "from 2,000", ar: "من 2,000" },
            ],
            [
              { en: "Turnaround", ar: "مدة التسليم" },
              { en: "5–7 working days", ar: "5–7 أيام عمل" },
              { en: "5–7 working days", ar: "5–7 أيام عمل" },
              { en: "5–7 days (48h express available)", ar: "5–7 أيام (تسليم سريع 48 ساعة متاح)" },
            ],
          ],
        },
      },
      {
        kind: "text",
        heading: { en: "What it costs and how fast", ar: "كم تكلّف وكم تستغرق" },
        body: {
          en: "Pricing is modular. A print-ready design starts at AED 1,500, a digital (email-optimised) PDF at AED 800, and a combined print + digital package — the standard brochure deliverable — from AED 2,000. Standard turnaround is 5–7 working days from brief to print-ready files, with a 48-hour express option for urgent pitches. Printing itself can be arranged through our partner network in Al Quoz at cost — typically AED 3–8 per copy for short runs — and because Big Story also shoots, the photography inside your brochure can come from the same archive as your film, so nothing looks mismatched.",
          ar: "التسعير معياري. يبدأ التصميم الجاهز للطباعة من 1,500 درهم، والملف الرقمي (المحسّن للبريد) من 800 درهم، والباقة المدمجة مطبوعة + رقمية — وهي البروشور القياسي — من 2,000 درهم. التسليم القياسي 5–7 أيام عمل من الإيجاز إلى الملفات الجاهزة للطباعة، مع خيار سريع خلال 48 ساعة للعروض العاجلة. يمكن ترتيب الطباعة نفسها عبر شبكة شركائنا في القوز بالتكلفة — عادة 3–8 دراهم للنسخة في الكميات القليلة — ولأن بيك ستوري تصوّر أيضاً، يمكن أن تأتي صور بروشورك من الأرشيف نفسه الذي جاء منه فيلمك، فلا يبدو شيء غير متطابق.",
        },
      },
      {
        kind: "bullets",
        heading: { en: "How UAE brands actually use it", ar: "كيف تستخدمه العلامات الإماراتية فعلاً" },
        items: [
          { en: "Real estate — a per-project brochure buyers take home from the sales gallery.", ar: "العقارات — بروشور لكل مشروع يأخذه المشترون من صالة المبيعات." },
          { en: "Dental & clinics — a waiting-room info pack that answers questions before the consult.", ar: "الأسنان والعيادات — حزمة معلومات لغرفة الانتظار تجيب عن الأسئلة قبل الاستشارة." },
          { en: "Agencies — a credentials deck that turns a folder of case studies into one considered document.", ar: "الوكالات — عرض اعتمادات يحوّل مجلد دراسات الحالة إلى وثيقة واحدة مدروسة." },
        ],
      },
    ],
    faqs: [
      {
        q: { en: "Isn't everything digital now — why print at all?", ar: "أليس كل شيء رقمياً الآن — فلماذا الطباعة أصلاً؟" },
        a: {
          en: "Digital is where discovery happens; print is where decisions get reinforced. A brochure is the physical object a prospect keeps after the meeting, the giveaway at a conference, the leave-behind an investor re-reads. It works alongside your website, not instead of it.",
          ar: "الرقمي هو حيث يحدث الاكتشاف؛ والطباعة هي حيث تترسّخ القرارات. البروشور هو الشيء المادي الذي يحتفظ به العميل بعد الاجتماع، ومادة التوزيع في المؤتمر، والمادة المتروكة التي يعيد المستثمر قراءتها. يعمل إلى جانب موقعك لا بدلاً منه.",
        },
      },
      {
        q: { en: "How much does a brochure cost and how long does it take?", ar: "كم تكلفة البروشور وكم يستغرق؟" },
        a: {
          en: "Print-ready design starts at AED 1,500, digital at AED 800, and a combined print + digital package from AED 2,000. Standard turnaround is 5–7 working days, with 48-hour express available for urgent pitches. Printing can be arranged through our Al Quoz partners at cost.",
          ar: "يبدأ التصميم الجاهز للطباعة من 1,500 درهم، والرقمي من 800 درهم، والباقة المدمجة مطبوعة + رقمية من 2,000 درهم. التسليم القياسي 5–7 أيام عمل، مع خيار سريع خلال 48 ساعة للعروض العاجلة. يمكن ترتيب الطباعة عبر شركائنا في القوز بالتكلفة.",
        },
      },
    ],
    related: ["brochure-design"],
    ctaHeading: { en: "Need a brochure that closes? Let's design it.", ar: "تحتاج بروشوراً يُغلق الصفقة؟ لنصممه." },
  },

  {
    slug: "podcast-for-business",
    eyebrow: { en: "Should you podcast?", ar: "هل يناسبك البودكاست؟" },
    metaTitle: { en: "Podcast for Business: When It Makes Sense", ar: "البودكاست للأعمال: متى يكون منطقياً" },
    metaDescription: {
      en: "A podcast is a commitment, not a quick win. A straight decision framework for B2B teams — who it fits, what it costs in Dubai, what the best shows do differently, and the packages to launch with.",
      ar: "البودكاست التزام لا مكسب سريع. إطار قرار مباشر لفرق B2B — لمن يناسب، وكم يكلّف في دبي، وما الذي تفعله أفضل البرامج بشكل مختلف، وبأي باقات تنطلق.",
    },
    h1: { en: "Podcast for business: when it actually makes sense", ar: "البودكاست للأعمال: متى يكون منطقياً فعلاً" },
    lead: {
      en: "A podcast is a serious commitment, not a quick win. Here is a straight decision framework for B2B teams — who it fits, what it costs in Dubai, what the best shows do differently, and the packages we would recommend to launch.",
      ar: "البودكاست التزام جادّ لا مكسب سريع. إليك إطار قرار مباشر لفرق B2B — لمن يناسب، وكم يكلّف في دبي، وما الذي تفعله أفضل البرامج بشكل مختلف، والباقات التي نوصي بالانطلاق بها.",
    },
    blocks: [
      {
        kind: "text",
        heading: { en: "The honest version", ar: "النسخة الصريحة" },
        body: {
          en: "Podcasts reward consistency and a tight niche, not budget. Across every production teardown we studied, the same pattern holds: the shows that fail quit in months three to six — right before an audience starts to compound. As Pat Flynn puts it, \"the riches are in the niches.\" Before you spend a dirham, decide whether you can commit to a season and speak to a narrow, specific audience. If the answer is no, the money is better spent elsewhere.",
          ar: "البودكاست يكافئ الاستمرارية والتخصص الدقيق، لا الميزانية. في كل تحليل إنتاج درسناه، يتكرر النمط نفسه: البرامج التي تفشل تتوقف في الشهر الثالث إلى السادس — قبل أن يبدأ الجمهور بالتراكم مباشرة. كما يقول بات فلين: «الثروات في التخصصات». قبل أن تنفق درهماً، قرّر إن كنت تستطيع الالتزام بموسم كامل ومخاطبة جمهور ضيّق ومحدد. إن كان الجواب لا، فالمال يُنفق في مكان أفضل.",
        },
      },
      {
        kind: "table",
        heading: { en: "Decision matrix", ar: "مصفوفة القرار" },
        table: {
          columns: [
            { en: "Good fit", ar: "مناسب" },
            { en: "Weak fit", ar: "غير مناسب" },
          ],
          rows: [
            [
              { en: "Company size", ar: "حجم الشركة" },
              { en: "Has a subject expert who can show up weekly", ar: "لديها خبير موضوع يمكنه الحضور أسبوعياً" },
              { en: "No one who can commit airtime", ar: "لا أحد يمكنه الالتزام بوقت التسجيل" },
            ],
            [
              { en: "Audience", ar: "الجمهور" },
              { en: "Sells to decision-makers who listen on the commute", ar: "تبيع لصنّاع قرار يستمعون أثناء التنقل" },
              { en: "Targets Gen-Z who prefer short video", ar: "تستهدف جيل Z الذي يفضّل الفيديو القصير" },
            ],
            [
              { en: "Goal", ar: "الهدف" },
              { en: "Thought leadership, trust, long-form depth", ar: "الريادة الفكرية والثقة والعمق الطويل" },
              { en: "Fast direct-response sales", ar: "مبيعات استجابة مباشرة سريعة" },
            ],
            [
              { en: "Budget", ar: "الميزانية" },
              { en: "Can sustain 8–12 episodes minimum", ar: "تستطيع تحمّل 8–12 حلقة كحد أدنى" },
              { en: "Needs results in one or two posts", ar: "تحتاج نتائج في منشور أو اثنين" },
            ],
          ],
        },
      },
      {
        kind: "bullets",
        heading: { en: "The 5-question \"should we podcast?\" test", ar: "اختبار «هل نطلق بودكاست؟» بخمسة أسئلة" },
        body: {
          en: "If you answer yes to at least four of these five, a podcast is worth launching:",
          ar: "إن أجبت بنعم على أربعة على الأقل من هذه الخمسة، فالبودكاست يستحق الإطلاق:",
        },
        items: [
          { en: "Can you name your niche in one sentence? Broad \"leadership\" shows get buried.", ar: "هل تستطيع تحديد تخصصك في جملة واحدة؟ برامج «القيادة» العامة تُدفن." },
          { en: "Do you have a host who'll commit to 8–12 episodes? Consistency beats production value.", ar: "هل لديك مقدّم يلتزم بـ 8–12 حلقة؟ الاستمرارية تتفوق على جودة الإنتاج." },
          { en: "Do your buyers actually listen to podcasts? Decision-makers often do; Gen-Z prefers short video.", ar: "هل يستمع مشتروك للبودكاست فعلاً؟ صنّاع القرار غالباً نعم؛ جيل Z يفضّل الفيديو القصير." },
          { en: "Can you record broadcast-quality audio? Poor audio is the #1 reason listeners drop off.", ar: "هل تستطيع تسجيل صوت بجودة البث؟ الصوت الرديء هو السبب الأول لانصراف المستمعين." },
          { en: "Will you promote each episode? \"Build it and they'll come\" is the fastest way to 200 downloads.", ar: "هل ستروّج لكل حلقة؟ «اصنعه وسيأتون» أسرع طريق إلى 200 تنزيل فقط." },
        ],
      },
      {
        kind: "table",
        heading: { en: "What it costs in Dubai", ar: "كم يكلّف في دبي" },
        intro: {
          en: "A snapshot of the local and global market so you can benchmark any quote.",
          ar: "لمحة عن السوق المحلي والعالمي لتقيس أي عرض عليها.",
        },
        table: {
          columns: [{ en: "Typical rate", ar: "السعر المعتاد" }],
          rows: [
            [
              { en: "Poddster (Dubai)", ar: "بودستر (دبي)" },
              { en: "AED 400–1,570 / session", ar: "400–1,570 درهم / جلسة" },
            ],
            [
              { en: "Gulf Podcast Studios", ar: "غلف بودكاست ستوديوز" },
              { en: "AED 450/hr recording · 900/hr with edit", ar: "450 درهم/ساعة تسجيل · 900/ساعة مع مونتاج" },
            ],
            [
              { en: "Dubai market average", ar: "متوسط سوق دبي" },
              { en: "AED 250–1,000 / hr", ar: "250–1,000 درهم / ساعة" },
            ],
            [
              { en: "B2B agencies (global)", ar: "وكالات B2B (عالمياً)" },
              { en: "$1,500–5,000 / episode or $3,000–25,000 / month", ar: "1,500–5,000 دولار / حلقة أو 3,000–25,000 دولار / شهر" },
            ],
          ],
        },
      },
      {
        kind: "bullets",
        heading: { en: "Three lessons from shows that work", ar: "ثلاثة دروس من برامج ناجحة" },
        items: [
          { en: "Riverside: record uncompressed audio and run a documented, repeatable workflow — quality and consistency, not a one-off scramble each week.", ar: "ريفرسايد: سجّل صوتاً غير مضغوط واعتمد سير عمل موثّقاً وقابلاً للتكرار — الجودة والاستمرارية، لا ارتجالاً أسبوعياً." },
          { en: "Pat Flynn: niche down hard. His student's hyper-specific show (radio scanners) built a raving fan base in six months where a broad show would have stalled.", ar: "بات فلين: تخصّص بعمق. برنامج طالبه شديد التحديد (أجهزة مسح الراديو) بنى قاعدة معجبين متحمّسة في ستة أشهر حيث كان برنامج عام سيتعثّر." },
          { en: "Impact Talk (Dubai): a local B2B model — records in a Business Bay studio, video-first, publishes on YouTube with English + Arabic subtitles, and books guests remote-first. A blueprint for a UAE thought-leadership show.", ar: "إمباكت توك (دبي): نموذج B2B محلي — يسجّل في استوديو بالخليج التجاري، الفيديو أولاً، ويُنشر على يوتيوب بترجمة إنجليزية وعربية، ويحجز الضيوف عن بُعد أولاً. مخطط لبرنامج ريادة فكرية إماراتي." },
        ],
      },
      {
        kind: "table",
        heading: { en: "Recommended launch packages", ar: "باقات الإطلاق الموصى بها" },
        table: {
          columns: [
            { en: "Price (AED)", ar: "السعر (درهم)" },
            { en: "What's included", ar: "ما يتضمنه" },
          ],
          rows: [
            [
              { en: "Launch (1 episode)", ar: "الإطلاق (حلقة واحدة)" },
              { en: "1,200", ar: "1,200" },
              { en: "1hr recording, full edit (audio + video), 3 social clips, 1-page analytics, EN show notes", ar: "ساعة تسجيل، مونتاج كامل (صوت + فيديو)، 3 مقاطع سوشيال، تقرير تحليلات صفحة واحدة، ملاحظات حلقة بالإنجليزية" },
            ],
            [
              { en: "Season (8 episodes)", ar: "الموسم (8 حلقات)" },
              { en: "8,000", ar: "8,000" },
              { en: "Everything in Launch ×8, dedicated producer + editor, monthly strategy call", ar: "كل ما في الإطلاق ×8، منتج ومونتير مخصّصان، مكالمة استراتيجية شهرية" },
            ],
            [
              { en: "Signature (12 episodes)", ar: "المميّزة (12 حلقة)" },
              { en: "13,500", ar: "13,500" },
              { en: "Everything in Season, B-roll shoot day, EN + AR show notes, quarterly review", ar: "كل ما في الموسم، يوم تصوير لقطات مساعدة، ملاحظات حلقة بالإنجليزية والعربية، مراجعة ربع سنوية" },
            ],
          ],
        },
      },
    ],
    faqs: [
      {
        q: { en: "How much does a business podcast cost in Dubai?", ar: "كم تكلفة بودكاست الأعمال في دبي؟" },
        a: {
          en: "Studio recording in Dubai runs roughly AED 250–1,000 per hour, and AED 450–900 per hour with editing. Full-service B2B production globally runs $1,500–5,000 per episode. Big Story's launch episode is AED 1,200 all-in — recording, edit, three social clips and analytics — landing at the mid-tier Dubai rate with faster turnaround.",
          ar: "تسجيل الاستوديو في دبي يتراوح تقريباً بين 250–1,000 درهم للساعة، و450–900 درهم للساعة مع المونتاج. الإنتاج الكامل لـ B2B عالمياً يتراوح بين 1,500–5,000 دولار للحلقة. حلقة الإطلاق من بيك ستوري بـ 1,200 درهم شاملة — تسجيل ومونتاج وثلاثة مقاطع سوشيال وتحليلات — بسعر الفئة المتوسطة في دبي وتسليم أسرع.",
        },
      },
      {
        q: { en: "How many episodes should we commit to before judging it?", ar: "كم حلقة نلتزم بها قبل الحكم عليه؟" },
        a: {
          en: "At least 8–12. Most podcasts that fail quit in months three to six — right before audiences compound. If you can't commit to a season, the money is better spent elsewhere, which is why our Season and Signature packages lock in 8 and 12 episodes.",
          ar: "على الأقل 8–12. معظم البودكاستات التي تفشل تتوقف في الشهر الثالث إلى السادس — قبل أن يتراكم الجمهور مباشرة. إن لم تستطع الالتزام بموسم، فالمال يُنفق في مكان أفضل، ولهذا تلتزم باقتا الموسم والمميّزة بـ 8 و12 حلقة.",
        },
      },
    ],
    related: ["corporate-video-production", "social-content"],
    ctaHeading: { en: "Thinking about a podcast? Let's pressure-test the idea.", ar: "تفكر في بودكاست؟ لنختبر الفكرة معاً." },
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export const guideSlugs = guides.map((g) => g.slug);
