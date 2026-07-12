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
  /** location intro — {city} token replaced at render */
  locIntro: L;
  /** location "on the ground" service angle — {city} token */
  groundAngle: L;
  /** 2 location FAQs — {city} token allowed */
  locFaqs: FAQ[];
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
      en: "Big Story produces campaign-ready TVCs in {city} — from concept and storyboard through to the final graded master. We handle casting, locations, cinema-grade camera and lighting, and post, so your commercial lands on TV, YouTube and social with the same polish.",
      ar: "تنتج بيك ستوري إعلانات تلفزيونية جاهزة للحملات في {city} — من الفكرة والقصة المصورة حتى النسخة النهائية المصححة الألوان. نتولى اختيار الممثلين والمواقع والكاميرا والإضاءة بمستوى سينمائي والمونتاج، ليصل إعلانك إلى التلفزيون ويوتيوب والسوشيال بالجودة نفسها.",
    },
    groundAngle: {
      en: "For a TVC that means scouting the right set, securing the permits and blocking the light so the shoot day runs without surprises.",
      ar: "بالنسبة للإعلان التلفزيوني يعني ذلك اختيار الموقع المناسب وتأمين التصاريح وضبط الإضاءة حتى يمر يوم التصوير دون مفاجآت.",
    },
    locFaqs: [
      { q: { en: "How long does a TVC take to produce in {city}?", ar: "كم يستغرق إنتاج إعلان تلفزيوني في {city}؟" }, a: { en: "Most commercials run four to eight weeks from concept lock to final master, depending on cast, locations and the post schedule.", ar: "تستغرق معظم الإعلانات من أربعة إلى ثمانية أسابيع من اعتماد الفكرة حتى النسخة النهائية، حسب الممثلين والمواقع وجدول المونتاج." } },
      { q: { en: "Do you handle filming permits in {city}?", ar: "هل تتولون تصاريح التصوير في {city}؟" }, a: { en: "Yes — arranging the location permits and approvals your shoot needs is part of our preproduction.", ar: "نعم — ترتيب تصاريح المواقع والموافقات التي يحتاجها تصويرك جزء من مرحلة ما قبل الإنتاج لدينا." } },
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
      en: "Big Story makes story-led brand films in {city} — founder journeys, purpose pieces and campaign films that make audiences feel why a brand exists. We plan the narrative, shoot cinematically and craft an edit that carries emotion.",
      ar: "تصنع بيك ستوري أفلاماً تعريفية تروي قصة في {city} — رحلات المؤسسين وأفلام الغاية وأفلام الحملات التي تجعل الجمهور يشعر بسبب وجود العلامة. نخطط للسرد ونصور سينمائياً ونصوغ مونتاجاً يحمل العاطفة.",
    },
    groundAngle: {
      en: "For a brand film that means finding real locations and moments across the emirate that make the story feel true and rooted.",
      ar: "بالنسبة للفيلم التعريفي يعني ذلك إيجاد مواقع ولحظات حقيقية عبر الإمارة تجعل القصة تبدو صادقة وراسخة.",
    },
    locFaqs: [
      { q: { en: "How long is a typical brand film?", ar: "ما مدة الفيلم التعريفي المعتاد؟" }, a: { en: "Most hero brand films run 90 seconds to three minutes, with shorter cut-downs delivered for social and paid campaigns.", ar: "تتراوح معظم الأفلام التعريفية الرئيسية بين 90 ثانية وثلاث دقائق، مع نسخ أقصر للسوشيال والحملات المدفوعة." } },
      { q: { en: "Can you film across {city} and beyond?", ar: "هل يمكنكم التصوير في {city} وخارجها؟" }, a: { en: "Yes — we film on location across {city} and the wider UAE, arranging crew, kit and permits wherever the story leads.", ar: "نعم — نصور في المواقع عبر {city} والإمارات، ونرتب الطاقم والمعدات والتصاريح أينما تقود القصة." } },
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
      en: "Big Story produces corporate video in {city} — company profiles, leadership films, recruitment and training. We keep crews lean and schedules tight so filming fits around your business, and deliver clear, polished films in Arabic and English.",
      ar: "تنتج بيك ستوري فيديو الشركات في {city} — أفلام تعريفية وأفلام قيادة وتوظيف وتدريب. نبقي الطواقم صغيرة والجداول محكمة ليتناسب التصوير مع أعمالكم، ونسلّم أفلاماً واضحة ومصقولة بالعربية والإنجليزية.",
    },
    groundAngle: {
      en: "For corporate video that means filming inside offices, sites and boardrooms across the emirate with minimal disruption to your team.",
      ar: "بالنسبة لفيديو الشركات يعني ذلك التصوير داخل المكاتب والمواقع وقاعات الاجتماعات عبر الإمارة بأقل تعطيل لفريقكم.",
    },
    locFaqs: [
      { q: { en: "Can you film across multiple {city} sites in one day?", ar: "هل يمكنكم التصوير في عدة مواقع بـ {city} في يوم واحد؟" }, a: { en: "Yes — we plan a route and schedule that captures several locations efficiently, keeping crew time and cost controlled.", ar: "نعم — نخطط لمسار وجدول يلتقط عدة مواقع بكفاءة، مع ضبط وقت الطاقم والتكلفة." } },
      { q: { en: "Do you deliver bilingual versions?", ar: "هل تسلّمون نسخاً ثنائية اللغة؟" }, a: { en: "We provide Arabic and English edits, subtitles and voiceover from a single shoot in {city}.", ar: "نوفر نسخاً بالعربية والإنجليزية وترجمات وتعليقاً صوتياً من تصوير واحد في {city}." } },
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
      en: "Big Story shoots product films in {city} — launches, demos, e-commerce and lifestyle. We combine macro tabletop detail with in-use lifestyle in a controlled setup, then grade and cut for web, retail and paid campaigns.",
      ar: "تصور بيك ستوري أفلام المنتجات في {city} — إطلاقات وعروض توضيحية وتجارة إلكترونية وأسلوب حياة. نجمع تفاصيل الماكرو على الطاولة مع أسلوب الحياة أثناء الاستخدام في إعداد محكوم، ثم نصحح الألوان ونقص للويب والتجزئة والحملات المدفوعة.",
    },
    groundAngle: {
      en: "For product work that means a controlled studio space or a real retail and lifestyle location across the emirate to match your brand world.",
      ar: "بالنسبة لأعمال المنتجات يعني ذلك مساحة استوديو محكومة أو موقع بيع وأسلوب حياة حقيقي عبر الإمارة يطابق عالم علامتكم.",
    },
    locFaqs: [
      { q: { en: "Do you have a studio in {city}?", ar: "هل لديكم استوديو في {city}؟" }, a: { en: "We shoot in controlled studio spaces and on location across {city}, choosing whichever setup best fits the product and budget.", ar: "نصور في مساحات استوديو محكومة وفي مواقع عبر {city}، ونختار الإعداد الأنسب للمنتج والميزانية." } },
      { q: { en: "How fast can product films be turned around in {city}?", ar: "ما سرعة تسليم أفلام المنتجات في {city}؟" }, a: { en: "A focused product shoot can be edited within one to two weeks, with faster turnarounds for social cut-downs.", ar: "يمكن مونتاج تصوير منتج مركّز خلال أسبوع إلى أسبوعين، مع تسليم أسرع لنسخ السوشيال." } },
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
      en: "Big Story creates social ad content in {city} — vertical reels, cut-downs and short-form for TikTok, Instagram and YouTube Shorts. We batch a month of scroll-stopping content in a single shoot, edited and captioned for each platform.",
      ar: "تصنع بيك ستوري محتوى إعلانات السوشيال في {city} — ريلز عمودية ونسخ قصيرة لتيك توك وإنستغرام ويوتيوب شورتس. نصور شهراً من المحتوى الموقف للتمرير في تصوير واحد، بمونتاج وتعليقات لكل منصة.",
    },
    groundAngle: {
      en: "For social content that means shooting fast and light in recognisable {city} settings that feel native to the feed.",
      ar: "بالنسبة لمحتوى السوشيال يعني ذلك التصوير بسرعة وخفة في أماكن معروفة بـ {city} تبدو أصيلة على الخلاصة.",
    },
    locFaqs: [
      { q: { en: "Can you shoot a month of content in {city} in one day?", ar: "هل يمكنكم تصوير شهر من المحتوى في {city} في يوم واحد؟" }, a: { en: "Yes — a single batched shoot day in {city} typically produces 10–15 finished vertical pieces ready to schedule.", ar: "نعم — يوم تصوير مجمّع واحد في {city} ينتج عادة 10–15 قطعة عمودية نهائية جاهزة للجدولة." } },
      { q: { en: "Do you offer recurring monthly packages?", ar: "هل تقدمون باقات شهرية متكررة؟" }, a: { en: "We run monthly content retainers for {city} brands that need a steady stream of cinematic social content.", ar: "ندير باقات محتوى شهرية لعلامات {city} التي تحتاج تدفقاً ثابتاً من محتوى سوشيال سينمائي." } },
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
      en: "Big Story covers events in {city} — conferences, launches, galas and MICE — with multi-camera crews and highlight reels delivered in 48–72 hours. We brief before the day, capture every key moment and can teaser-cut on the night.",
      ar: "تغطي بيك ستوري الفعاليات في {city} — مؤتمرات وإطلاقات وحفلات و MICE — بطواقم كاميرات متعددة وأفلام ملخصات تُسلّم خلال 48–72 ساعة. نأخذ الإحاطة قبل اليوم ونلتقط كل لحظة مهمة ويمكننا إعداد نسخة تشويقية في الليلة نفسها.",
    },
    groundAngle: {
      en: "For event coverage that means knowing the venues, the load-in rules and the light across the emirate so nothing is missed on the day.",
      ar: "بالنسبة لتغطية الفعاليات يعني ذلك معرفة القاعات وقواعد الدخول والإضاءة عبر الإمارة حتى لا يفوتنا شيء في اليوم.",
    },
    locFaqs: [
      { q: { en: "How quickly do you deliver reels after a {city} event?", ar: "ما سرعة تسليم الملخصات بعد فعالية في {city}؟" }, a: { en: "Highlight reels are delivered within 48–72 hours, with an optional same-night social teaser while your {city} event is live.", ar: "تُسلّم أفلام الملخصات خلال 48–72 ساعة، مع نسخة تشويقية اختيارية في نفس الليلة أثناء فعاليتكم في {city}." } },
      { q: { en: "Can you provide a multi-camera crew in {city}?", ar: "هل يمكنكم توفير طاقم بكاميرات متعددة في {city}؟" }, a: { en: "Yes — we scale multi-camera crews to any {city} venue, from a single keynote to a multi-stage conference.", ar: "نعم — نوسّع طواقم الكاميرات المتعددة لأي قاعة في {city}، من كلمة واحدة إلى مؤتمر متعدد المنصات." } },
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
      en: "Big Story produces documentaries in {city} — founder stories, CSR films and long-form brand journalism that earn trust by showing something real, told with cinematic craft and an honest edit.",
      ar: "تنتج بيك ستوري أفلاماً وثائقية في {city} — قصص المؤسسين وأفلام المسؤولية المجتمعية والصحافة الوثائقية التي تكسب الثقة بإظهار شيء حقيقي، تُروى بحرفية سينمائية ومونتاج صادق.",
    },
    groundAngle: {
      en: "For documentary that means filming on location across the emirate, following real people and process with the patience the form needs.",
      ar: "بالنسبة للفيلم الوثائقي يعني ذلك التصوير في المواقع عبر الإمارة، متابعة أشخاص حقيقيين وعملية حقيقية بالصبر الذي يتطلبه هذا النوع.",
    },
    locFaqs: [
      { q: { en: "What makes a good brand documentary?", ar: "ما الذي يصنع فيلماً وثائقياً جيداً للعلامة؟" }, a: { en: "A real story honestly told — access, characters and a point of view, not a polished sales pitch.", ar: "قصة حقيقية تُروى بصدق — وصول وشخصيات ووجهة نظر، لا عرض مبيعات مصقول." } },
      { q: { en: "How long does a documentary take in {city}?", ar: "كم يستغرق الفيلم الوثائقي في {city}؟" }, a: { en: "Long-form work runs longer than an ad — typically several weeks to months depending on access and scope.", ar: "العمل الطويل يستغرق أكثر من الإعلان — عادة عدة أسابيع إلى أشهر حسب الوصول والنطاق." } },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export const serviceSlugs = services.map((s) => s.slug);
