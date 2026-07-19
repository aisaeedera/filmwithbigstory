import type { L } from "@/lib/i18n";

/**
 * Clients / industries we serve.
 *
 * Per project policy (NIGHT P0): "Don't show real client logos or
 * testimonials on the public website yet." So this is a list of
 * industry categories + work patterns, not a list of named client
 * accounts. When real client work is published, individual entries
 * move from this index to dedicated case study pages under /work.
 */
export type ClientCategory = {
  slug: string;
  label: L;
  blurb: L;
  typical: L; // what we typically deliver for this industry
};

export const clientCategories: ClientCategory[] = [
  {
    slug: "brands-and-consumer",
    label: { en: "Brands & consumer", ar: "العلامات التجارية والمستهلك" },
    blurb: {
      en: "Lifestyle, fashion, hospitality and retail brands looking for film-led campaigns that travel across social, paid and TVC.",
      ar: "علامات تجارية في مجالات الأزياء والضيافة والتجزئة تبحث عن حملات يقودها الفيلم وتتنقل بين السوشيال والإعلانات والتلفزيون.",
    },
    typical: {
      en: "Brand films, product launches, social edits, paid cut-downs and a 30-second TVC master for retail shelves.",
      ar: "أفلام تعريفية وإطلاق منتجات ومحتوى سوشيال ومقاطع مدفوعة ونسخة تلفزيونية مدتها 30 ثانية لنقاط البيع.",
    },
  },
  {
    slug: "corporate-and-services",
    label: { en: "Corporate & services", ar: "الشركات والخدمات" },
    blurb: {
      en: "B2B brands, consultancies, financial services and professional firms that need explainers, executive interviews and case-study films.",
      ar: "علامات B2B والاستشارات والخدمات المالية والشركات المهنية التي تحتاج شروحات ومقابلات تنفيذية وأفلام دراسات حالة.",
    },
    typical: {
      en: "60- to 120-second explainers, leadership interviews, animated overlays, internal comms.",
      ar: "شروحات من 60 إلى 120 ثانية ومقابلات قيادية وتراكب متحرك ومحتوى اتصالات داخلية.",
    },
  },
  {
    slug: "real-estate-and-developers",
    label: { en: "Real estate & developers", ar: "العقارات والمطورون" },
    blurb: {
      en: "Master developers, brokers and interior designers who need project films, drone coverage and finishing-grade showreels.",
      ar: "المطورون الرئيسيون والوسطاء ومصممو الديكور الذين يحتاجون أفلام مشاريع وتغطية بطائرات درون وعروض نهائية.",
    },
    typical: {
      en: "Project walkthroughs, drone exteriors, interior macro shots, agent training films and 4K finishing masters.",
      ar: "جولات في المشروع ولقطات خارجية بالدرون وصور داخلية مكبرة وأفلام تدريب للوكلاء ونسخ نهائية بدقة 4K.",
    },
  },
  {
    slug: "healthcare-and-clinics",
    label: { en: "Healthcare & clinics", ar: "الرعاية الصحية والعيادات" },
    blurb: {
      en: "Private clinics, dental groups and wellness brands that need trust-led films which lower patient anxiety before the first appointment.",
      ar: "العيادات الخاصة ومجموعات طب الأسنان وعلامات العافية التي تحتاج أفلاماً قائمة على الثقة وتقلل قلق المرضى قبل أول موعد.",
    },
    typical: {
      en: "Calm brand films, doctor-to-camera explanations, treatment-specific short cuts and reels for paid social.",
      ar: "أفلام تعريفية هادئة وشروحات من الطبيب للكاميرا ومقاطع قصيرة خاصة بكل علاج وريلز مدفوعة للسوشيال.",
    },
  },
  {
    slug: "events-and-conferences",
    label: { en: "Events & conferences", ar: "الفعاليات والمؤتمرات" },
    blurb: {
      en: "Annual gatherings, trade shows and brand activations that need live coverage, edit-turnaround reels and post-event recap films.",
      ar: "التجمعات السنوية والمعارض وفعاليات العلامات التجارية التي تحتاج تغطية حية وريلز سريعة وأفلام ملخصات بعد الفعالية.",
    },
    typical: {
      en: "Same-day edits, keynote highlights, panel coverage, multi-cam capture and a 60-90 second recap film.",
      ar: "تعديلات في نفس اليوم وأبرز الكلمات الرئيسية وتغطية الجلسات ومتعدد الكاميرات وفيلم ملخص مدته 60-90 ثانية.",
    },
  },
  {
    slug: "weddings-and-private",
    label: { en: "Weddings & private events", ar: "حفلات الزفاف والفعاليات الخاصة" },
    blurb: {
      en: "Cinematic wedding films and private celebrations that prioritize the family's experience over the camera's presence.",
      ar: "أفلام زفاف سينمائية واحتفالات خاصة تعطي الأولوية لتجربة العائلة على حضور الكاميرا.",
    },
    typical: {
      en: "Same-day teaser, ceremony edit, full feature film, vertical reels and a photo-first deliverable via our sister brand.",
      ar: "إعلان تشويقي في نفس اليوم وتعديل الحفل وفيلم وثائقي كامل وريلز عمودية ومحتوى صور عبر علامتنا الشقيقة.",
    },
  },
];

export type ClientsCopy = {
  meta: { title: L; description: L };
  eyebrow: L;
  h1: L;
  lead: L;
  cta: L;
  outcomesLabel: L;
  outcomes: L[];
  processLabel: L;
  process: { step: L; body: L }[];
  closingLabel: L;
  closing: L;
};

export const clients: ClientsCopy = {
  meta: {
    title: { en: "Clients & Industries | Big Story", ar: "العملاء والصناعات | بيك ستوري" },
    description: {
      en: "Industries and clients Big Story has worked with across the UAE — brands, corporates, real estate, healthcare, events and weddings. Real client case studies live on /work.",
      ar: "الصناعات والعملاء الذين عملت معهم بيك ستوري في الإمارات — علامات تجارية وشركات وعقارات ورعاية صحية وفعاليات وحفلات زفاف. دراسات حالة العملاء على /work.",
    },
  },
  eyebrow: { en: "Clients & industries", ar: "العملاء والصناعات" },
  h1: {
    en: "Industries we know, brands we want to work with.",
    ar: "الصناعات التي نعرفها، العلامات التي نريد العمل معها.",
  },
  lead: {
    en: "A Dubai film studio that has shipped for lifestyle brands, corporates, developers, healthcare groups, events and weddings across the UAE. The categories below are where we are most useful — and where the work speaks fastest.",
    ar: "استوديو أفلام في دبي أنتج حملات لعلامات تجارية وشركات ومطورين ومجموعات رعاية صحية وفعاليات وحفلات زفاف في الإمارات. الفئات أدناه هي الأكثر فائدة لنا — وحيث يتكلم العمل أسرع.",
  },
  cta: {
    en: "Talk to us about your project",
    ar: "تحدث إلينا عن مشروعك",
  },
  outcomesLabel: { en: "What clients take away", ar: "ما يأخذه العملاء" },
  outcomes: [
    {
      en: "A film that survives paid, social and TV cuts without re-cutting from scratch.",
      ar: "فيلم يصمد في القصات المدفوعة والسوشيال والتلفزيون دون إعادة مونتاج من الصفر.",
    },
    {
      en: "A team that takes the brief seriously and pushes back when the brief is weak.",
      ar: "فريق يأخذ الإيجاز بجدية ويقدم ردود فعل عندما يكون الإيجاز ضعيفاً.",
    },
    {
      en: "A handover library with the masters, the verticals, the colour and the audio you actually need to publish.",
      ar: "مكتبة تسليم تحتوي النسخ النهائية والعمودية والألوان والصوت الذي تحتاجه فعلاً للنشر.",
    },
    {
      en: "No project manager merry-go-round. One producer from brief to delivery.",
      ar: "لا تناوب مديري المشاريع. منتج واحد من الإيجاز إلى التسليم.",
    },
  ],
  processLabel: { en: "How we work with new clients", ar: "كيف نعمل مع العملاء الجدد" },
  process: [
    {
      step: { en: "1. A 30-minute brief, no obligation", ar: "1. إيجاز مدته 30 دقيقة، دون التزام" },
      body: {
        en: "Tell us what you want to ship and when. We tell you if we are a fit on the spot. If we are not, we point you to someone who is.",
        ar: "أخبرنا بما تريد تسليمه ومتى. سنخبرك فوراً إذا كنا ملائمين. وإذا لم نكن، سنوجهك إلى شخص ملائم.",
      },
    },
    {
      step: { en: "2. A written treatment, not a deck", ar: "2. معالجة مكتوبة، وليس عرضاً" },
      body: {
        en: "If we are a fit, we send a one-page treatment covering the story, the shot list, the deliverables, the timeline and the fee. No mystery.",
        ar: "إذا كنا ملائمين، نرسل صفحة واحدة تغطي القصة وقائمة اللقطات والمخرجات والجدول والرسوم. بدون غموض.",
      },
    },
    {
      step: { en: "3. Shoot, edit, deliver", ar: "3. التصوير والمونتاج والتسليم" },
      body: {
        en: "A producer owns the project from start to delivery. You see cuts at treatment, rough-cut and fine-cut. We do not ship until you sign off.",
        ar: "منتج واحد يقود المشروع من البداية إلى التسليم. تشاهد النسخ عند المعالجة والقطع الأولي والقطع النهائي. لا نسلّم حتى توقع.",
      },
    },
    {
      step: { en: "4. A handover that publishes fast", ar: "4. تسليم ينشر بسرعة" },
      body: {
        en: "Masters, social cuts, vertical cuts, captions and thumbnails in a folder you control. You post without a back-and-forth.",
        ar: "النسخ النهائية وقصات السوشيال والقصات العمودية والتعليقات والصور المصغرة في مجلد تتحكم فيه. تنشر دون مراسلات.",
      },
    },
  ],
  closingLabel: { en: "If you are not sure yet", ar: "إذا لم تكن متأكداً بعد" },
  closing: {
    en: "Send us what you have. A link, a sentence, a voice note. We will tell you whether film is the right medium for the message, and if it is, what it costs and when it ships.",
    ar: "أرسل لنا ما لديك. رابط أو جملة أو ملاحظة صوتية. سنخبرك إذا كان الفيلم هو الوسيط المناسب للرسالة، وإن كان كذلك، فما تكلفته ومتى يُسلَّم.",
  },
};
