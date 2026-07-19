import type { L } from "@/lib/i18n";

/* Shared UI + navigation + footer strings */
export const ui = {
  nav: {
    work: { en: "Work", ar: "الأعمال" },
    services: { en: "Services", ar: "الخدمات" },
    serviceAreas: { en: "Service Areas", ar: "مناطق الخدمة" },
    about: { en: "About", ar: "من نحن" },
    contact: { en: "Contact", ar: "تواصل" },
    faqs: { en: "FAQs", ar: "الأسئلة الشائعة" },
    pricing: { en: "Pricing", ar: "الأسعار" },
    careers: { en: "Careers", ar: "الوظائف" },
    clients: { en: "Clients", ar: "العملاء" },
    startProject: { en: "Start a project", ar: "ابدأ مشروعاً" },
    startYourProject: { en: "Start your project", ar: "ابدأ مشروعك" },
    seeOurWork: { en: "See our work", ar: "شاهد أعمالنا" },
    allServices: { en: "All services", ar: "كل الخدمات" },
    exploreAreas: { en: "Explore service areas", ar: "استكشف مناطق الخدمة" },
    menu: { en: "Menu", ar: "القائمة" },
    close: { en: "Close", ar: "إغلاق" },
    langSwitch: { en: "العربية", ar: "English" },
    skip: { en: "Skip to content", ar: "تخطَّ إلى المحتوى" },
  },
  speedPromise: {
    en: "We reply within one business day. No obligation, no hard sell.",
    ar: "نرد خلال يوم عمل واحد. دون التزام ودون بيع مباشر.",
  },
  notClearYet: {
    en: "Not clear yet? Talk to us. We'll help shape the idea, make it practical, and show you the next step.",
    ar: "لست متأكداً بعد؟ تحدّث إلينا. سنساعدك في صياغة الفكرة ونجعلها عملية ونريك الخطوة التالية.",
  },
  brandTagline: {
    en: "Dubai-based film & video production across the UAE — brand films, commercials and content worth watching.",
    ar: "إنتاج أفلام وفيديو مقره دبي عبر الإمارات — أفلام تعريفية وإعلانات ومحتوى يستحق المشاهدة.",
  },
  footer: {
    explore: { en: "Explore", ar: "استكشف" },
    getInTouch: { en: "Get in touch", ar: "تواصل معنا" },
    equipmentRental: { en: "Equipment rental", ar: "تأجير المعدات" },
    network: { en: "Big Story network", ar: "شبكة بيك ستوري" },
    redRentals: { en: "RED Camera Rentals", ar: "تأجير كاميرات RED" },
    rights: { en: "© Big Story · Dubai, UAE", ar: "© بيك ستوري · دبي، الإمارات" },
    tag: { en: "Film & Video Production", ar: "إنتاج الأفلام والفيديو" },
    privacy: { en: "Privacy Policy", ar: "سياسة الخصوصية" },
    terms: { en: "Terms & Conditions", ar: "الشروط والأحكام" },
  },
  breadcrumb: {
    home: { en: "Home", ar: "الرئيسية" },
    serviceAreas: { en: "Service Areas", ar: "مناطق الخدمة" },
  },
  ctaWhatsApp: { en: "Start your brief on WhatsApp", ar: "ابدأ ملخصك على واتساب" },
  emailUs: { en: "Email us", ar: "راسلنا" },
  callUs: { en: "Call us", ar: "اتصل بنا" },
} as const;

/* ---- HOME ---- */
export const home = {
  meta: {
    title: { en: "Film & Video Production in Dubai | Big Story", ar: "إنتاج الأفلام والفيديو في دبي | بيك ستوري" },
    description: {
      en: "Dubai film and video production studio creating commercials, brand films, corporate videos, social content and campaign-ready assets from concept to final cut.",
      ar: "استوديو إنتاج أفلام وفيديو في دبي يصنع الإعلانات والأفلام التعريفية وفيديوهات الشركات ومحتوى السوشيال وأصولاً جاهزة للحملات من الفكرة إلى النسخة النهائية.",
    },
  },
  hero: {
    eyebrow: { en: "Film & Video Production · Dubai", ar: "إنتاج الأفلام والفيديو · دبي" },
    artag: "قصص تستحق المشاهدة",
    lead: {
      en: "A Dubai film studio taking your idea from first concept to final cut — strategy, story, shoot and post, all under one team.",
      ar: "استوديو أفلام في دبي يأخذ فكرتك من أول تصور إلى النسخة النهائية — استراتيجية وقصة وتصوير ومونتاج، كل ذلك ضمن فريق واحد.",
    },
    h1: { en: "Brands deserve stories worth watching.", ar: "العلامات تستحق قصصاً تستحق المشاهدة." },
  },
  showreel: {
    eyebrow: { en: "Our work", ar: "أعمالنا" },
    title: { en: "Featured films.", ar: "أعمال مختارة." },
    lead: {
      en: "Every great film starts with a story — not a budget. We turn client ideas into cinema-grade films through meticulous scriptwriting, storyboarding and production craft.",
      ar: "كل فيلم عظيم يبدأ بقصة — لا بميزانية. نحوّل أفكار العملاء إلى أفلام بمستوى سينمائي عبر كتابة نصوص دقيقة وقصص مصورة وحرفية إنتاج.",
    },
    // Static editorial placeholders — image gallery for featured case-study films.
    cards: [
      { title: { en: "The Dental Practice", ar: "عيادة الأسنان" }, tagline: { en: "A 60-second brand film", ar: "فيلم تعريفي بمدة 60 ثانية" } },
      { title: { en: "A Home That Knows", ar: "منزل يعرفك" }, tagline: { en: "A 60-second brand film", ar: "فيلم تعريفي بمدة 60 ثانية" } },
      { title: { en: "The Connected Worker", ar: "العامل المتصل" }, tagline: { en: "A 60-second brand film", ar: "فيلم تعريفي بمدة 60 ثانية" } },
    ] as { title: L; tagline: L }[],
  },
  whatWeDo: {
    eyebrow: { en: "What we do", ar: "ما نقوم به" },
    h2: { en: "From concept to final cut.", ar: "من الفكرة إلى النسخة النهائية." },
    cards: [
      { title: { en: "TVCs & Brand Films", ar: "الإعلانات والأفلام التعريفية" }, body: { en: "Cinematic commercials and brand stories made to be watched to the end.", ar: "إعلانات وقصص علامات سينمائية تُصنع لتُشاهَد حتى النهاية." } },
      { title: { en: "Corporate & Product", ar: "الشركات والمنتجات" }, body: { en: "Company profiles, product films and launches that explain and sell.", ar: "أفلام تعريفية للشركات وأفلام منتجات وإطلاقات تشرح وتبيع." } },
      { title: { en: "Social Content", ar: "محتوى السوشيال" }, body: { en: "Short-form social content built for the feed.", ar: "محتوى سوشيال قصير مصمم للخلاصة." } },
    ] as { title: L; body: L }[],
  },
  whereWeWork: {
    eyebrow: { en: "Where we work", ar: "أين نعمل" },
    h2: { en: "Filming across the UAE.", ar: "نصوّر عبر الإمارات." },
    lead: {
      en: "Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah and Al Ain — local crews, local permits, and the look each emirate is known for.",
      ar: "دبي وأبوظبي والشارقة وعجمان ورأس الخيمة والعين — طواقم محلية وتصاريح محلية والمظهر الذي تشتهر به كل إمارة.",
    },
  },
  marquee: {
    en: ["TVCs", "Brand Films", "Corporate Video", "Product Films", "Social Content", "Event Coverage", "Documentary", "Campaign Assets"],
    ar: ["إعلانات تلفزيونية", "أفلام تعريفية", "فيديو الشركات", "أفلام المنتجات", "محتوى السوشيال", "تغطية الفعاليات", "أفلام وثائقية", "أصول الحملات"],
  },
  howWeWork: {
    eyebrow: { en: "How we work", ar: "كيف نعمل" },
    h2: { en: "From idea to finished film.", ar: "من الفكرة إلى الفيلم المكتمل." },
    steps: [
      { n: "01", title: { en: "Discover the story", ar: "اكتشف القصة" }, body: { en: "We understand the brand, audience, offer and message before a word is written.", ar: "نفهم العلامة والجمهور والعرض والرسالة قبل كتابة كلمة." } },
      { n: "02", title: { en: "Plan the production", ar: "خطّط للإنتاج" }, body: { en: "Script, mood board, storyboard, shot list, schedule and crew plan — nothing left to chance.", ar: "نص ولوحة مزاج وقصة مصورة وقائمة لقطات وجدول وخطة طاقم — لا شيء متروك للصدفة." } },
      { n: "03", title: { en: "Shoot with intention", ar: "صوّر بقصد" }, body: { en: "Cinematic lighting, camera movement, sound and direction on a controlled set.", ar: "إضاءة سينمائية وحركة كاميرا وصوت وإخراج على موقع محكوم." } },
      { n: "04", title: { en: "Deliver for every platform", ar: "سلّم لكل منصة" }, body: { en: "Hero film, social cut-downs, ads and website assets — campaign-ready exports.", ar: "فيلم رئيسي ونسخ سوشيال وإعلانات وأصول موقع — نسخ جاهزة للحملات." } },
    ],
  },
  whyUs: {
    eyebrow: { en: "Why Big Story", ar: "لماذا بيك ستوري" },
    h2: { en: "Why brands choose us.", ar: "لماذا تختارنا العلامات." },
    cards: [
      { title: { en: "Cinema-grade, no agency bloat", ar: "بمستوى سينمائي دون ترهل الوكالات" }, body: { en: "A focused team built around the actual film — not unnecessary layers and mark-ups.", ar: "فريق مركّز مبني حول الفيلم نفسه — لا طبقات إضافية وهوامش ربح." } },
      { title: { en: "Preproduction-first", ar: "ما قبل الإنتاج أولاً" }, body: { en: "We plan the message, visuals, shots and delivery before the camera ever rolls.", ar: "نخطط للرسالة والمرئيات واللقطات والتسليم قبل أن تدور الكاميرا." } },
      { title: { en: "Built for business outcomes", ar: "مبني لنتائج الأعمال" }, body: { en: "Every film is made to sell, explain, build trust or carry a campaign.", ar: "كل فيلم يُصنع ليبيع أو يشرح أو يبني الثقة أو يحمل حملة." } },
      { title: { en: "Dubai-based, UAE-ready", ar: "مقرنا دبي وجاهزون للإمارات" }, body: { en: "Local crew, locations, permits and Arabic/English production support.", ar: "طاقم ومواقع وتصاريح محلية ودعم إنتاج بالعربية والإنجليزية." } },
    ],
  },
  industries: {
    eyebrow: { en: "Industries we serve", ar: "القطاعات التي نخدمها" },
    h2: { en: "Made for your sector.", ar: "مصنوع لقطاعك." },
    items: [
      { en: "Real estate & property", ar: "العقارات والممتلكات" },
      { en: "Clinics & healthcare", ar: "العيادات والرعاية الصحية" },
      { en: "Restaurants & hospitality", ar: "المطاعم والضيافة" },
      { en: "Corporate & government", ar: "الشركات والحكومة" },
      { en: "Product launches", ar: "إطلاق المنتجات" },
      { en: "CSR & brand storytelling", ar: "المسؤولية المجتمعية ورواية العلامة" },
      { en: "Events & campaigns", ar: "الفعاليات والحملات" },
    ] as L[],
  },
  selectedWork: {
    eyebrow: { en: "Selected work", ar: "أعمال مختارة" },
    h2: { en: "Stories we can shape.", ar: "قصص يمكننا صياغتها." },
  },
  clients: {
    eyebrow: { en: "Trusted across the UAE", ar: "موثوقون عبر الإمارات" },
    note: { en: "Client credits are added as projects publish. Ask us for relevant recent work under NDA.", ar: "تُضاف أسماء العملاء مع نشر المشاريع. اسألنا عن أعمال حديثة ذات صلة بموجب اتفاقية سرية." },
  },
  finalCta: {
    h2: { en: "Let's make something worth watching.", ar: "لنصنع شيئاً يستحق المشاهدة." },
  },
} as const;

/* ---- WORK INDEX ---- */
export const work = {
  meta: {
    title: { en: "Concepts & Case Studies | Dubai Film Production — Big Story", ar: "المفاهيم ودراسات الحالة | إنتاج الأفلام في دبي — بيك ستوري" },
    description: {
      en: "Explore Big Story's film concepts and case-study approaches for healthcare, real estate, product, technology and brand storytelling projects in Dubai.",
      ar: "استكشف مفاهيم بيك ستوري الفيلمية ونهج دراسات الحالة لمشاريع الرعاية الصحية والعقارات والمنتجات والتقنية ورواية العلامات في دبي.",
    },
  },
  eyebrow: { en: "Concepts & Case Studies", ar: "المفاهيم ودراسات الحالة" },
  h1: { en: "Stories we can shape.", ar: "قصص يمكننا صياغتها." },
  lead: {
    en: "A look at how we approach films for different industries — from the first concept to the shot list and storyboard, through to the final campaign structure. Completed client films are added as they wrap.",
    ar: "نظرة على كيفية تعاملنا مع الأفلام لقطاعات مختلفة — من أول فكرة إلى قائمة اللقطات والقصة المصورة، وصولاً إلى بنية الحملة النهائية. تُضاف أفلام العملاء المكتملة عند انتهائها.",
  },
  filters: {
    all: { en: "All", ar: "الكل" },
    "brand-film": { en: "Brand Film", ar: "فيلم تعريفي" },
    corporate: { en: "Corporate", ar: "شركات" },
    social: { en: "Social", ar: "سوشيال" },
    event: { en: "Event", ar: "فعاليات" },
    documentary: { en: "Documentary", ar: "وثائقي" },
    product: { en: "Product", ar: "منتجات" },
  } as Record<string, L>,
  finalH2: { en: "Have a story to tell?", ar: "لديك قصة ترويها؟" },
  detail: {
    brief: { en: "The brief", ar: "الإيجاز" },
    approach: { en: "Our approach", ar: "نهجنا" },
    deliverables: { en: "Deliverables", ar: "المخرجات" },
    results: { en: "The outcome", ar: "النتيجة" },
    next: { en: "Next case study", ar: "دراسة الحالة التالية" },
  },
} as const;

/* ---- SERVICES INDEX ---- */
export const servicesIndex = {
  meta: {
    title: { en: "Film Production Services in Dubai | Big Story", ar: "خدمات إنتاج الأفلام في دبي | بيك ستوري" },
    description: {
      en: "End-to-end film production services in Dubai — concept development, preproduction, cinematography, editing, colour, sound and campaign-ready exports.",
      ar: "خدمات إنتاج أفلام متكاملة في دبي — تطوير المفاهيم وما قبل الإنتاج والتصوير السينمائي والمونتاج والألوان والصوت والنسخ الجاهزة للحملات.",
    },
  },
  eyebrow: { en: "What we do", ar: "ما نقوم به" },
  h1: { en: "Production, handled end to end.", ar: "الإنتاج، مُدار من البداية للنهاية." },
  lead: {
    en: "From the first idea to the final export, we run every stage in-house — so your story stays consistent and you deal with one team, not five.",
    ar: "من أول فكرة إلى النسخة النهائية، ندير كل مرحلة داخلياً — لتبقى قصتك متسقة وتتعامل مع فريق واحد لا خمسة.",
  },
  stages: [
    { n: "01", title: { en: "Concept & Preproduction", ar: "الفكرة وما قبل الإنتاج" }, body: { en: "Where the film is really made. We shape the idea, write the script, and plan every frame before a camera switches on.", ar: "حيث يُصنع الفيلم فعلاً. نبلور الفكرة ونكتب النص ونخطط لكل إطار قبل تشغيل الكاميرا." } },
    { n: "02", title: { en: "Production", ar: "الإنتاج" }, body: { en: "On set, on schedule. Direction, cinematography, lighting and sound on professional cinema gear.", ar: "على الموقع وفي الموعد. إخراج وتصوير سينمائي وإضاءة وصوت بمعدات سينمائية احترافية." } },
    { n: "03", title: { en: "Post-Production", ar: "ما بعد الإنتاج" }, body: { en: "The final polish. Editing, colour, sound design and motion graphics that turn footage into a finished story.", ar: "الصقل النهائي. مونتاج وألوان وتصميم صوت ورسوم متحركة تحوّل اللقطات إلى قصة مكتملة." } },
  ],
  whyItPays: {
    eyebrow: { en: "Why it pays", ar: "لماذا يستحق" },
    h2: { en: "Video isn't a cost. It's an asset.", ar: "الفيديو ليس تكلفة. إنه أصل." },
    lead: {
      en: "A great film keeps working long after the shoot — selling, building trust, and saving you from explaining the same thing a hundred times.",
      ar: "الفيلم الجيد يستمر بالعمل بعد التصوير بوقت طويل — يبيع ويبني الثقة ويوفر عليك شرح الشيء نفسه مئة مرة.",
    },
    cards: [
      { title: { en: "Sells for you", ar: "يبيع نيابة عنك" }, body: { en: "A clear brand or product film does the convincing on your site, in pitches and across every ad — around the clock.", ar: "فيلم علامة أو منتج واضح يقوم بالإقناع على موقعك وفي العروض وعبر كل إعلان — على مدار الساعة." } },
      { title: { en: "Builds trust", ar: "يبني الثقة" }, body: { en: "People believe what they can see. Real faces, real process, real purpose earn credibility faster than words.", ar: "يصدّق الناس ما يرونه. الوجوه الحقيقية والعملية الحقيقية والغاية الحقيقية تكسب المصداقية أسرع من الكلمات." } },
      { title: { en: "Reusable everywhere", ar: "قابل لإعادة الاستخدام في كل مكان" }, body: { en: "One shoot becomes a hero film, social cut-downs, ads and reels — months of content from a single investment.", ar: "تصوير واحد يصبح فيلماً رئيسياً ونسخ سوشيال وإعلانات وريلز — أشهر من المحتوى من استثمار واحد." } },
      { title: { en: "Tells your why", ar: "يروي سبب وجودك" }, body: { en: "For purpose-led brands and CSR stories, film turns values into something people feel and remember.", ar: "للعلامات ذات الغاية وقصص المسؤولية المجتمعية، يحوّل الفيلم القيم إلى شيء يشعر به الناس ويتذكرونه." } },
    ],
  },
  produce: {
    eyebrow: { en: "What we produce", ar: "ما ننتجه" },
    h2: { en: "Films for every objective.", ar: "أفلام لكل هدف." },
    // 8 cards — the 7 services + two vertical framings from CONTENT_MAP §3
    extra: [
      { title: { en: "Real estate films", ar: "أفلام العقارات" }, body: { en: "Property and development films that sell the space.", ar: "أفلام عقارات ومشاريع تبيع المساحة." } },
      { title: { en: "Clinic & dental videos", ar: "فيديوهات العيادات والأسنان" }, body: { en: "Trust-first films that calm and convert new patients.", ar: "أفلام تضع الثقة أولاً تطمئن المرضى الجدد وتحوّلهم." } },
    ],
  },
  deliverables: {
    eyebrow: { en: "Typical deliverables", ar: "المخرجات المعتادة" },
    h2: { en: "What you receive.", ar: "ما تحصل عليه." },
    items: [
      { en: "60–90 second hero film", ar: "فيلم رئيسي بمدة 60–90 ثانية" },
      { en: "15–30 second ad cut-downs", ar: "نسخ إعلانية بمدة 15–30 ثانية" },
      { en: "Vertical reels & stories", ar: "ريلز عمودية وستوري" },
      { en: "Website banner video", ar: "فيديو بانر للموقع" },
      { en: "Key visuals & thumbnails", ar: "صور رئيسية ومصغرات" },
      { en: "Captions & subtitles", ar: "تعليقات وترجمات" },
      { en: "Campaign-ready exports", ar: "نسخ جاهزة للحملات" },
    ] as L[],
  },
  finalH2: { en: "Let's talk about your project.", ar: "لنتحدث عن مشروعك." },
  detail: {
    process: { en: "How we work", ar: "كيف نعمل" },
    deliverables: { en: "What you receive", ar: "ما تحصل عليه" },
    faqs: { en: "Frequently asked", ar: "أسئلة شائعة" },
    relatedWork: { en: "Recent work", ar: "أعمال حديثة" },
    availableIn: { en: "Available across the UAE", ar: "متاح عبر الإمارات" },
  },
} as const;

/* ---- ABOUT ---- */
export const about = {
  meta: {
    title: { en: "About Big Story | Dubai Film & Video Production", ar: "عن بيك ستوري | إنتاج الأفلام والفيديو في دبي" },
    description: {
      en: "Big Story is a boutique Dubai film production studio built around cinematic production, careful preproduction and focused storytelling for brands.",
      ar: "بيك ستوري استوديو إنتاج أفلام بوتيكي في دبي مبني حول الإنتاج السينمائي والتحضير الدقيق ورواية القصص المركّزة للعلامات.",
    },
  },
  eyebrow: { en: "Who we are", ar: "من نحن" },
  h1: { en: "A boutique studio with a big-story obsession.", ar: "استوديو بوتيكي بهوس القصة الكبيرة." },
  lead: {
    en: "Big Story is a Dubai-based film and video production team. We help brands say something worth remembering — and we keep the whole journey under one roof, from the first scribbled idea to the final graded frame.",
    ar: "بيك ستوري فريق إنتاج أفلام وفيديو مقره دبي. نساعد العلامات على قول شيء يستحق التذكر — ونبقي الرحلة كاملة تحت سقف واحد، من أول فكرة مخربشة إلى الإطار النهائي المصحح الألوان.",
  },
  cards: [
    { title: { en: "One team, start to finish", ar: "فريق واحد من البداية للنهاية" }, body: { en: "Concept, shoot and edit handled by the same people, so nothing gets lost in handoffs.", ar: "الفكرة والتصوير والمونتاج يديرها الأشخاص أنفسهم، فلا يضيع شيء في التسليمات." } },
    { title: { en: "Plan obsessively", ar: "نخطط بهوس" }, body: { en: "Mood boards, storyboards and shot lists mean we arrive on set knowing exactly what we're making.", ar: "لوحات المزاج والقصص المصورة وقوائم اللقطات تعني أننا نصل الموقع ونحن نعرف بالضبط ما نصنعه." } },
    { title: { en: "Make it earn its keep", ar: "نجعله يستحق تكلفته" }, body: { en: "Every film is built to do a job — sell, explain, or move people — not just look pretty.", ar: "كل فيلم مبني ليؤدي عملاً — يبيع أو يشرح أو يحرّك الناس — لا مجرد المظهر الجميل." } },
  ],
  para: {
    en: "We're not a big agency, and that's the point. You work directly with the people actually making your film — fewer layers, clearer decisions, and a result that looks far bigger than the team behind it.",
    ar: "لسنا وكالة كبيرة، وهذا هو المقصود. تعمل مباشرة مع الأشخاص الذين يصنعون فيلمك فعلاً — طبقات أقل وقرارات أوضح ونتيجة تبدو أكبر بكثير من الفريق وراءها.",
  },
  nda: {
    en: "Discretion comes as standard. We'll sign your NDA before we talk specifics, and treat your brief, footage and plans as confidential from the first message.",
    ar: "السرية معيار أساسي. نوقّع اتفاقية عدم الإفصاح قبل مناقشة التفاصيل، ونتعامل مع ملخصك ولقطاتك وخططك كمعلومات سرية من أول رسالة.",
  },
  craft: {
    eyebrow: { en: "Our craft", ar: "حرفتنا" },
    h2: { en: "Built around cinematic production, not content volume.", ar: "مبني حول الإنتاج السينمائي لا كمية المحتوى." },
    lead: {
      en: "Big Story combines cinema cameras, controlled lighting, production planning and post-production craft to help brands create films that feel intentional — not rushed, generic or disposable. A preproduction-first workflow and a lean, focused team mean every frame is deliberate.",
      ar: "تجمع بيك ستوري بين كاميرات السينما والإضاءة المحكومة وتخطيط الإنتاج وحرفية ما بعد الإنتاج لمساعدة العلامات على صنع أفلام تبدو مقصودة — لا متسرعة أو عامة أو قابلة للاستهلاك. سير عمل يتصدره ما قبل الإنتاج وفريق صغير مركّز يعنيان أن كل إطار متعمَّد.",
    },
  },
  finalH2: { en: "Let's tell your story.", ar: "لنروِ قصتك." },
} as const;

/* ---- CONTACT ---- */
export const contact = {
  meta: {
    title: { en: "Contact Big Story | Start a Production in Dubai", ar: "تواصل مع بيك ستوري | ابدأ إنتاجاً في دبي" },
    description: {
      en: "Start a film, TVC, brand video or social content project with Big Story, a Dubai-based video production studio.",
      ar: "ابدأ مشروع فيلم أو إعلان أو فيديو علامة أو محتوى سوشيال مع بيك ستوري، استوديو إنتاج فيديو مقره دبي.",
    },
  },
  eyebrow: { en: "Get in touch", ar: "تواصل معنا" },
  h1: { en: "Let's make something worth watching.", ar: "لنصنع شيئاً يستحق المشاهدة." },
  lead: {
    en: "Tell us about your project — a brand film, a TVC, a product launch — and we'll come back to you within one business day. No obligation, no hard sell.",
    ar: "أخبرنا عن مشروعك — فيلم تعريفي أو إعلان تلفزيوني أو إطلاق منتج — وسنعود إليك خلال يوم عمل واحد. دون التزام ودون بيع مباشر.",
  },
  cards: {
    email: { tag: { en: "Email", ar: "البريد" }, body: { en: "The best place to start — send us a brief and we'll reply within a business day.", ar: "أفضل مكان للبدء — أرسل لنا ملخصاً وسنرد خلال يوم عمل." } },
    whatsapp: { tag: { en: "WhatsApp", ar: "واتساب" }, body: { en: "Prefer to chat? Message us directly and we'll get straight back to you.", ar: "تفضل الدردشة؟ راسلنا مباشرة وسنعود إليك فوراً." } },
    studio: { tag: { en: "Studio", ar: "الاستوديو" }, value: { en: "Dubai, UAE", ar: "دبي، الإمارات" }, body: { en: "Full-service film and video production, based in Dubai.", ar: "إنتاج أفلام وفيديو متكامل الخدمات، مقره دبي." } },
  },
  brief: {
    eyebrow: { en: "Tell us about your project", ar: "أخبرنا عن مشروعك" },
    h2: { en: "Send us a quick brief.", ar: "أرسل لنا ملخصاً سريعاً." },
    lead: {
      en: "No obligation, no hard sell — we reply within one business day. Tap below and a short brief opens in WhatsApp, already typed out. Just fill in the blanks and send. Or use the form and we'll email you back.",
      ar: "دون التزام ودون بيع مباشر — نرد خلال يوم عمل واحد. اضغط أدناه وسيفتح ملخص قصير في واتساب مكتوب مسبقاً. املأ الفراغات وأرسل. أو استخدم النموذج وسنراسلك عبر البريد.",
    },
  },
  // 3-step brief wizard — bilingual copy per adaptation spec §4.3.
  wizard: {
    // Progress
    progressLabel: { en: "Brief progress", ar: "تقدّم الملخص" },
    stepLabel: { en: "Step {n} of {total}", ar: "الخطوة {n} من {total}" },
    // Step questions / legends
    q1: { en: "What do you need?", ar: "ماذا تحتاج؟" },
    q2budget: { en: "What's the scale?", ar: "ما حجم المشروع؟" },
    q2timeline: { en: "When?", ar: "متى؟" },
    q3: { en: "Where do we send the reply?", ar: "إلى أين نرسل الرد؟" },
    // Field labels
    name: { en: "Name", ar: "الاسم" },
    phone: { en: "Phone", ar: "رقم الهاتف" },
    email: { en: "Email", ar: "البريد الإلكتروني" },
    message: { en: "Message", ar: "الرسالة" },
    company: { en: "Company", ar: "اسم الشركة" },
    source: { en: "How did you hear about us?", ar: "كيف سمعت عنا؟" },
    optional: { en: "optional", ar: "اختياري" },
    // Navigation
    next: { en: "Next", ar: "التالي" },
    back: { en: "Back", ar: "رجوع" },
    send: { en: "Send my brief", ar: "أرسل ملخصي" },
    sending: { en: "Sending…", ar: "جارٍ الإرسال…" },
    addDetails: { en: "Add details (optional)", ar: "أضف تفاصيل (اختياري)" },
    messageHint: {
      en: "Tell us anything else about the project (optional)",
      ar: "أخبرنا أي شيء آخر عن المشروع (اختياري)",
    },
    // Success
    successHead: { en: "Brief received", ar: "تم استلام ملخصك" },
    successBody: {
      en: "We reply within one business day. For a faster response, message us on WhatsApp.",
      ar: "نرد خلال يوم عمل واحد. للاستجابة الأسرع، راسلنا على واتساب.",
    },
    successWhatsApp: { en: "Message us on WhatsApp", ar: "راسلنا على واتساب" },
    sendAnother: { en: "Send another brief", ar: "أرسل ملخصاً آخر" },
    // Privacy — {privacyPolicy} is the linked text below
    privacy: {
      en: "We use your details to reply to this inquiry only. See our {privacyPolicy}.",
      ar: "نستخدم تفاصيلك للرد على هذا الاستفسار فقط. اطّلع على {privacyPolicy}.",
    },
    privacyPolicy: { en: "Privacy Policy", ar: "سياسة الخصوصية" },
  },
  // Validation + error copy
  validation: {
    // Error summary heading (role=alert)
    summary: { en: "Please fix the following:", ar: "يرجى تصحيح ما يلي:" },
    name: { en: "Please enter your name.", ar: "يرجى إدخال اسمك." },
    email: { en: "Please enter a valid email address.", ar: "يرجى إدخال بريد إلكتروني صحيح." },
    phone: {
      en: "Please enter a valid UAE phone number (e.g. +971 5X XXX XXXX).",
      ar: "يرجى إدخال رقم هاتف إماراتي صحيح (مثال: ‎+971 5X XXX XXXX).",
    },
    required: { en: "Please make a selection.", ar: "يرجى الاختيار." },
    // Network / server failure (§9.4)
    send: {
      en: "Something went wrong sending your brief. Please try again, or WhatsApp us directly.",
      ar: "حدث خطأ أثناء إرسال ملخصك. يرجى المحاولة مرة أخرى، أو راسلنا مباشرة على واتساب.",
    },
    whatsappBailout: { en: "WhatsApp us directly", ar: "راسلنا مباشرة على واتساب" },
    // Turnstile load failure
    turnstile: {
      en: "Security check couldn't load. Please refresh, or WhatsApp us directly.",
      ar: "تعذّر تحميل فحص الأمان. يرجى تحديث الصفحة، أو راسلنا مباشرة على واتساب.",
    },
  },
  finalH2: { en: "Let's make something worth watching.", ar: "لنصنع شيئاً يستحق المشاهدة." },
} as const;

/* ---- SERVICE AREAS ---- */
export const serviceAreas = {
  meta: {
    title: { en: "Service Areas | Film & Video Production Across the UAE — Big Story", ar: "مناطق الخدمة | إنتاج الأفلام والفيديو عبر الإمارات — بيك ستوري" },
    description: {
      en: "Big Story produces film and video across the UAE. Browse production services by city — Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah and Al Ain.",
      ar: "تنتج بيك ستوري الأفلام والفيديو عبر الإمارات. تصفح خدمات الإنتاج حسب المدينة — دبي وأبوظبي والشارقة وعجمان ورأس الخيمة والعين.",
    },
  },
  eyebrow: { en: "Service Areas", ar: "مناطق الخدمة" },
  h1: { en: "Film & video production across the UAE", ar: "إنتاج الأفلام والفيديو عبر الإمارات" },
  lead: {
    en: "Big Story works on location across the Emirates — from Dubai studios to Abu Dhabi boardrooms and Ras Al Khaimah mountains. Choose a city to see the production services we offer there.",
    ar: "تعمل بيك ستوري في المواقع عبر الإمارات — من استوديوهات دبي إلى قاعات أبوظبي وجبال رأس الخيمة. اختر مدينة لترى خدمات الإنتاج التي نقدمها هناك.",
  },
  finalH2: { en: "Tell us where you're filming", ar: "أخبرنا أين تصوّر" },
  finalLead: {
    en: "Wherever you are in the UAE, we'll bring the crew, kit and craft. Start a project and we'll reply fast.",
    ar: "أينما كنت في الإمارات، سنجلب الطاقم والمعدات والحرفة. ابدأ مشروعاً وسنرد بسرعة.",
  },
} as const;

/* ---- LOCATION PAGE (template strings) ---- */
export const location = {
  onGround: { en: "On the ground", ar: "على أرض الواقع" },
  produceHere: { en: "What we can produce here", ar: "ما يمكننا إنتاجه هنا" },
  produceCards: [
    { title: { en: "Hero film", ar: "فيلم رئيسي" }, body: { en: "A polished main edit for your website, sales deck or campaign.", ar: "مونتاج رئيسي مصقول لموقعك أو عرض مبيعاتك أو حملتك." } },
    { title: { en: "Social cut-downs", ar: "نسخ سوشيال" }, body: { en: "Vertical and short-form versions for Instagram, TikTok, YouTube Shorts and ads.", ar: "نسخ عمودية وقصيرة لإنستغرام وتيك توك ويوتيوب شورتس والإعلانات." } },
    { title: { en: "Campaign assets", ar: "أصول الحملة" }, body: { en: "Thumbnails, captions, subtitles and platform-ready exports.", ar: "مصغرات وتعليقات وترجمات ونسخ جاهزة للمنصات." } },
  ] as { title: L; body: L }[],
  frequentlyAsked: { en: "Frequently asked", ar: "أسئلة شائعة" },
  related: { en: "Related production pages", ar: "صفحات إنتاج ذات صلة" },
  relatedCards: [
    { title: { en: "Film production services", ar: "خدمات إنتاج الأفلام" }, body: { en: "See the full range of what we produce, from concept to final cut.", ar: "شاهد المدى الكامل لما ننتجه، من الفكرة إلى النسخة النهائية." }, href: "/services" },
    { title: { en: "Our approach & concepts", ar: "نهجنا ومفاهيمنا" }, body: { en: "How we shape a story before the camera rolls.", ar: "كيف نصوغ قصة قبل أن تدور الكاميرا." }, href: "/work" },
    { title: { en: "Start a project", ar: "ابدأ مشروعاً" }, body: { en: "Tell us about your film and get a fast, friendly reply.", ar: "أخبرنا عن فيلمك واحصل على رد سريع وودود." }, href: "/contact" },
  ],
  otherServicesHere: { en: "Other services in", ar: "خدمات أخرى في" },
  finalH2: { en: "Let's make something worth watching.", ar: "لنصنع شيئاً يستحق المشاهدة." },
} as const;

/* ---- FAQS ---- */
export const faqs = {
  meta: {
    title: { en: "FAQ | Film & Video Production in Dubai — Big Story", ar: "الأسئلة الشائعة | إنتاج الأفلام والفيديو في دبي — بيك ستوري" },
    description: {
      en: "Answers to common questions about working with Big Story, a Dubai film and video production studio — process, timelines, budgets, deliverables and crew.",
      ar: "إجابات على الأسئلة الشائعة حول العمل مع بيك ستوري، استوديو إنتاج أفلام وفيديو في دبي — العملية والجداول والميزانيات والمخرجات والطاقم.",
    },
  },
  eyebrow: { en: "Frequently asked", ar: "الأسئلة الشائعة" },
  h1: { en: "Film production questions, answered.", ar: "أسئلة إنتاج الأفلام، مُجابة." },
  lead: {
    en: "Straight answers on how Big Story works — our process, pricing, timelines and what you actually receive. If your question isn't here, ask us on the contact page and we'll reply within one business day.",
    ar: "إجابات مباشرة حول كيفية عمل بيك ستوري — عمليتنا والتسعير والجداول وما تحصل عليه فعلاً. إن لم يكن سؤالك هنا، اسألنا في صفحة التواصل وسنرد خلال يوم عمل واحد.",
  },
  items: [
    { q: { en: "What kind of video production does Big Story do?", ar: "ما نوع إنتاج الفيديو الذي تقوم به بيك ستوري؟" }, a: { en: "We produce commercials and TVCs, brand films, corporate videos and social content for brands in Dubai and across the UAE — from concept and preproduction through to the final cut.", ar: "ننتج الإعلانات والإعلانات التلفزيونية والأفلام التعريفية وفيديوهات الشركات ومحتوى السوشيال للعلامات في دبي وعبر الإمارات — من الفكرة وما قبل الإنتاج حتى النسخة النهائية." } },
    { q: { en: "Where is Big Story based and which areas do you cover?", ar: "أين مقر بيك ستوري وما المناطق التي تغطونها؟" }, a: { en: "We're based in Dubai and produce across the UAE, including Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah and Al Ain.", ar: "مقرنا دبي وننتج عبر الإمارات، بما في ذلك أبوظبي والشارقة وعجمان ورأس الخيمة والعين." } },
    { q: { en: "How much does a film or video project cost?", ar: "كم تكلفة مشروع فيلم أو فيديو؟" }, a: { en: "Every project is scoped to its brief — the crew, locations, shoot days and post all shape the budget. Share what you're planning and we'll come back with a clear, itemised quote.", ar: "كل مشروع يُحدد حسب إيجازه — الطاقم والمواقع وأيام التصوير والمونتاج كلها تشكّل الميزانية. شارك ما تخطط له وسنعود بعرض واضح ومفصّل." } },
    { q: { en: "How long does a production take?", ar: "كم يستغرق الإنتاج؟" }, a: { en: "It depends on scope. A focused social shoot can move quickly; a full brand film with concept development, casting and post runs longer. We map the timeline with you before we start.", ar: "يعتمد على النطاق. تصوير سوشيال مركّز يمكن أن يتحرك بسرعة؛ فيلم تعريفي كامل مع تطوير الفكرة والاختيار والمونتاج يستغرق أطول. نرسم الجدول معك قبل أن نبدأ." } },
    { q: { en: "Do you produce Arabic and English versions?", ar: "هل تنتجون نسخاً بالعربية والإنجليزية؟" }, a: { en: "Yes — Arabic and English scripting, voiceover and subtitles are part of our production, so one shoot serves both audiences and government-grade Arabic-first work.", ar: "نعم — كتابة النصوص والتعليق الصوتي والترجمة بالعربية والإنجليزية جزء من إنتاجنا، بحيث يخدم تصوير واحد الجمهورين والأعمال الحكومية العربية أولاً." } },
    { q: { en: "How do we start a project?", ar: "كيف نبدأ مشروعاً؟" }, a: { en: "Message us on WhatsApp or email hi@filmwithbigstory.com with a short brief. We'll set up a call, understand the goal, and decide together whether we're the right fit.", ar: "راسلنا على واتساب أو أرسل بريداً إلى hi@filmwithbigstory.com مع ملخص قصير. سنرتب مكالمة ونفهم الهدف ونقرر معاً إن كنا الأنسب." } },
  ] as { q: L; a: L }[],
  finalH2: { en: "Let's tell your story.", ar: "لنروِ قصتك." },
} as const;

/* ---- LEGAL ---- */
export const legal = {
  privacy: {
    meta: {
      title: { en: "Privacy Policy | Big Story", ar: "سياسة الخصوصية | بيك ستوري" },
      description: { en: "How Big Story collects, uses and protects your information under UAE data-protection law.", ar: "كيف تجمع بيك ستوري معلوماتك وتستخدمها وتحميها بموجب قانون حماية البيانات في الإمارات." },
    },
    h1: { en: "Privacy Policy", ar: "سياسة الخصوصية" },
  },
  terms: {
    meta: {
      title: { en: "Terms & Conditions | Big Story", ar: "الشروط والأحكام | بيك ستوري" },
      description: { en: "The terms that govern the use of the Big Story website and our production services.", ar: "الشروط التي تحكم استخدام موقع بيك ستوري وخدمات الإنتاج لدينا." },
    },
    h1: { en: "Terms & Conditions", ar: "الشروط والأحكام" },
  },
  updated: { en: "Last updated: July 2026", ar: "آخر تحديث: يوليو 2026" },
} as const;
