/**
 * Real estate video production in Dubai: the dedicated service page.
 *
 * Content source: service_pages_research_brief.md, Section 1 (REAL ESTATE FILMS,
 * lines 26–207). Every factual claim traces back to that brief.
 *
 * Hard rules carried into every string here:
 *  - No fabricated portfolio. Big Story has no real-estate shoots in the
 *    portfolio yet. No invented clients, projects, addresses, view counts,
 *    "X properties filmed" claims, testimonials or case studies. The 3–4x and
 *    403% figures stay attributed to their cited sources (Fotography.ae,
 *    Mintandco.ae); they are market data, not Big Story claims about itself.
 *  - No fake photos. Where a visual would go, the page uses a labelled
 *    placeholder block, never an <img> pointing at stock or invented stills.
 *  - Never mention AI, machine learning or internal tooling anywhere in public
 *    copy. This dev-comment is the only place the abbreviation may appear, and
 *    only as this instruction to avoid it.
 *  - Timeline language is always conditional and tied to scope (5–10 working
 *    days for a single property; 2–4 weeks for larger developer films). Never a
 *    flat guarantee.
 *  - No rental positioning. This page is about film production, not camera
 *    rental. Do not reference red.filmwithbigstory.com.
 *
 * Mirrors the bilingual `L` pattern used across copy.ts / how-we-work.ts.
 */

export const realEstateFilms = {
  meta: {
    title: {
      en: "Real Estate Video Production Dubai | Property Films",
      ar: "إنتاج فيديو عقاري في دبي | أفلام العقارات",
    },
    description: {
      en: "Cinematic property films, drone aerials, and social cuts for Dubai developers, agents, and Airbnb hosts. Formatted for Property Finder, Bayut, and Reels.",
      ar: "أفلام عقارية سينمائية ولقطات جوية بالدرون ومقاطع للسوشيال لمطوّري دبي ووكلائها ومضيفي إير بي إن بي. مُعدّة لبروبرتي فايندر وبيوت وريلز.",
    },
  },
  breadcrumb: { en: "Real estate films", ar: "أفلام العقارات" },
  hero: {
    eyebrow: { en: "Real estate video production in Dubai", ar: "إنتاج الفيديو العقاري في دبي" },
    h1: {
      en: "Real estate video production in Dubai",
      ar: "إنتاج الفيديو العقاري في دبي",
    },
    lead: {
      en: "A buyer decides in the first three seconds of a listing whether to keep scrolling or to book a viewing. We make Dubai property films built to win that decision: the exterior at the right hour, a clean walk through the space, and an aerial that shows how the property sits in its neighbourhood.",
      ar: "يقرّر المشتري خلال الثواني الثلاث الأولى من الإعلان إن كان سيواصل التمرير أم يحجز معاينة. نصنع أفلاماً عقارية في دبي مبنية لكسب هذا القرار: واجهة خارجية في الساعة المناسبة، وجولة نظيفة داخل المكان، ولقطة جوية تُظهر موقع العقار داخل حيّه.",
    },
    promise: {
      en: "We do not have a Dubai property reel to show you yet. What we do have is a defined way of working, delivery that meets the portal specs, and a drone and permit process that keeps your listing on the right side of the rules.",
      ar: "لا نملك بعد ريلاً عقارياً من دبي لنعرضه عليك. ما نملكه هو طريقة عمل محدّدة، وتسليم يطابق مواصفات المنصّات، وعملية درون وتصاريح تُبقي إعلانك على الجانب الصحيح من القانون.",
    },
  },
  sections: [
    {
      id: "what-we-produce",
      n: "01",
      eyebrow: { en: "What we produce", ar: "ما ننتجه" },
      h2: {
        en: "One shoot, the full set of property films.",
        ar: "تصوير واحد، مجموعة أفلام العقار كاملة.",
      },
      lead: {
        en: "Most listings need more than a single video. A developer launching off-plan, an agent listing a Palm Jumeirah villa, and a host filling an Airbnb calendar are answering different questions. We plan the shoot so one production day covers the ones you need.",
        ar: "معظم الإعلانات تحتاج أكثر من فيديو واحد. المطوّر الذي يطلق مشروعاً على الخارطة، والوكيل الذي يعرض فيلا في نخلة جميرا، والمضيف الذي يملأ تقويم إير بي إن بي، كلٌّ يجيب عن سؤال مختلف. نخطّط للتصوير كي يغطّي يوم إنتاج واحد ما تحتاجه منها.",
      },
      body: {
        en: "The cinematic walkthrough moves a viewer through the space the way they would actually see it, entrance first, then the rooms that sell the home. Drone aerials place the property in Dubai: the tower it sits in, the water it looks over, the community around it. Off-plan developer films carry a project that does not physically exist yet, built from the space, light and lifestyle you are selling. Lifestyle and Airbnb films show the experience of staying, not just the floor plan. Social cuts take the same footage down to a 60-second story and a vertical Reel.",
        ar: "الجولة السينمائية تنقل المشاهد عبر المكان كما سيراه فعلاً: المدخل أولاً، ثم الغرف التي تبيع المنزل. اللقطات الجوية بالدرون تضع العقار داخل دبي: البرج الذي يقع فيه، والماء الذي يطلّ عليه، والحيّ المحيط به. أفلام المطوّرين على الخارطة تقدّم مشروعاً لم يوجد بعد فعلياً، مبنية من المساحة والضوء ونمط الحياة الذي تبيعه. أفلام نمط الحياة وإير بي إن بي تُظهر تجربة الإقامة، لا مخطّط الأرضية فقط. مقاطع السوشيال تأخذ اللقطات نفسها إلى قصة من ستين ثانية وريل عمودي.",
      },
      list: [
        { en: "Cinematic property walkthrough", ar: "جولة عقارية سينمائية" },
        { en: "Drone aerials of the property and its neighbourhood", ar: "لقطات جوية بالدرون للعقار وحيّه" },
        { en: "Off-plan developer launch films", ar: "أفلام إطلاق للمطوّرين على الخارطة" },
        { en: "Lifestyle and short-stay films", ar: "أفلام نمط الحياة والإقامة القصيرة" },
        { en: "Social cuts: 60-second story and 9:16 Reel", ar: "مقاطع سوشيال: قصة ستين ثانية وريل بنسبة 9:16" },
      ],
    },
    {
      id: "process",
      n: "02",
      eyebrow: { en: "Our process", ar: "طريقة عملنا" },
      h2: {
        en: "We agree the shot list before the shoot day.",
        ar: "نتفق على قائمة اللقطات قبل يوم التصوير.",
      },
      lead: {
        en: "We work from an industry-standard six-shot drone framework, adapted for Dubai properties, plus a short list of interior fundamentals. We did not invent these shots. We use them because they are the ones buyers already read, and because agreeing them on paper first means the shoot day has no guesswork in it.",
        ar: "نعمل وفق إطار درون من ست لقطات، معتمَد في المجال ومكيَّف لعقارات دبي، إضافةً إلى قائمة قصيرة من أساسيات التصوير الداخلي. لم نبتكر هذه اللقطات. نستخدمها لأنها ما يقرأه المشترون أصلاً، ولأن الاتفاق عليها على الورق أولاً يعني ألّا تخمين في يوم التصوير.",
      },
      body: {
        en: "The aerial sequence covers the front of the building, the approach and curb, the rear, any outdoor space, a top-down that reads the plot and its boundaries, and a wider neighbourhood shot with room left for text or map pins. Inside, three shots do most of the work: a straight push into a room, a curved push that opens up the space, and a detail shot that lingers on the finish. We shoot for the edit, which means fewer clips with a clear job each, not a hard drive full of footage nobody can cut. Exteriors are timed to golden hour where the location allows. The grade is finished in DaVinci Resolve, and every file is exported to the spec of the portal it is going on.",
        ar: "يغطّي التسلسل الجوي واجهة المبنى، والمدخل والرصيف، والخلف، وأيّ مساحة خارجية، ولقطة علوية تقرأ قطعة الأرض وحدودها، ولقطة أوسع للحيّ تترك مجالاً للنص أو دبابيس الخريطة. في الداخل، ثلاث لقطات تؤدّي معظم العمل: دفعة مستقيمة إلى الغرفة، ودفعة منحنية تفتح المساحة، ولقطة تفصيلية تتمهّل عند التشطيب. نصوّر من أجل المونتاج، أي لقطات أقل لكلٍّ منها مهمة واضحة، لا قرصاً ممتلئاً بلقطات لا يستطيع أحد قصّها. تُوقَّت الواجهات الخارجية للساعة الذهبية حيث يسمح الموقع. يُنجَز تدرّج الألوان في دافينشي ريزولف، ويُصدَّر كل ملف بمواصفات المنصّة التي سيُنشَر عليها.",
      },
      list: [
        { en: "Front of building, at gutter-line height", ar: "واجهة المبنى، على ارتفاع خطّ السقف" },
        { en: "Approach and curb, kept clean of cars and bins", ar: "المدخل والرصيف، خاليين من السيارات والحاويات" },
        { en: "Rear and any outdoor space", ar: "الخلف وأيّ مساحة خارجية" },
        { en: "Top-down for plot size and boundaries", ar: "لقطة علوية لحجم الأرض وحدودها" },
        { en: "Neighbourhood context, space left for text", ar: "سياق الحيّ، مع ترك مساحة للنص" },
        { en: "Interior push, curve and detail shots", ar: "لقطات داخلية: دفع ومنحنى وتفصيل" },
      ],
    },
    {
      id: "formats",
      n: "03",
      eyebrow: { en: "Formats and delivery", ar: "الصيغ والتسليم" },
      h2: {
        en: "Every file cut to the spec it has to pass.",
        ar: "كل ملف مقصوص بالمواصفة التي عليه اجتيازها.",
      },
      lead: {
        en: "A film that will not upload to Bayut is not finished, however good it looks. We deliver masters that meet the resolution, duration and file requirements for Property Finder, Bayut and Dubizzle, plus the web and social versions the same campaign needs.",
        ar: "الفيلم الذي لا يُرفَع إلى بيوت غير مكتمل، مهما بدا جيداً. نسلّم نسخاً رئيسية تلبّي متطلّبات الدقّة والمدة والملفات لبروبرتي فايندر وبيوت ودوبيزل، إضافةً إلى نسخ الويب والسوشيال التي تحتاجها الحملة نفسها.",
      },
      body: {
        en: "You receive the portal master for the listing platforms, a web-optimised H.264 for your own site, a 60-second cut for LinkedIn and Instagram, and a 9:16 Reel for phones. These come out of one shoot and one edit, not four separate jobs. English captions are on by default, and we can add Arabic, Hindi, Russian or Mandarin subtitles for buyers who read in another language.",
        ar: "تحصل على النسخة الرئيسية للمنصّات، ونسخة ويب محسّنة بصيغة H.264 لموقعك، ومقطع من ستين ثانية للينكدإن وإنستغرام، وريل بنسبة 9:16 للهواتف. تخرج هذه من تصوير واحد ومونتاج واحد، لا من أربع مهام منفصلة. الترجمة الإنجليزية مفعّلة افتراضياً، ويمكننا إضافة ترجمات بالعربية أو الهندية أو الروسية أو الصينية للمشترين الذين يقرؤون بلغة أخرى.",
      },
      list: [
        { en: "Property Finder, Bayut and Dubizzle masters", ar: "نسخ رئيسية لبروبرتي فايندر وبيوت ودوبيزل" },
        { en: "Web-optimised H.264 for your own site", ar: "نسخة ويب محسّنة بصيغة H.264 لموقعك" },
        { en: "60-second LinkedIn and Instagram cut", ar: "مقطع ستين ثانية للينكدإن وإنستغرام" },
        { en: "9:16 vertical Reel", ar: "ريل عمودي بنسبة 9:16" },
        { en: "English captions default, other languages on request", ar: "ترجمة إنجليزية افتراضاً، ولغات أخرى عند الطلب" },
      ],
    },
  ],
  marketData: {
    eyebrow: { en: "Why video, not just photos", ar: "لماذا الفيديو، لا الصور وحدها" },
    h2: {
      en: "The market has already answered this.",
      ar: "السوق أجاب عن هذا سلفاً.",
    },
    lead: {
      en: "We will not quote you a number about our own results, because we do not have a Dubai property portfolio to draw one from yet. What we can show you is what the market reports about video listings in general. These are cited figures, not Big Story claims about itself.",
      ar: "لن نعطيك رقماً عن نتائجنا الخاصة، لأننا لا نملك بعد سجلّ أعمال عقارية في دبي نستخرجه منه. ما نستطيع عرضه هو ما يُبلّغ عنه السوق حول إعلانات الفيديو عموماً. هذه أرقام موثّقة بمصادرها، لا ادعاءات من بيك ستوري عن نفسها.",
    },
    stats: [
      {
        value: { en: "3 to 4x", ar: "3 إلى 4 أضعاف" },
        label: {
          en: "more enquiries for listings with video on Property Finder and Bayut, compared with photo-only listings at the same price point.",
          ar: "استفسارات أكثر للإعلانات التي تحتوي فيديو على بروبرتي فايندر وبيوت، مقارنةً بالإعلانات المصوّرة فوتوغرافياً فقط عند السعر نفسه.",
        },
        source: { en: "Source: Fotography.ae", ar: "المصدر: Fotography.ae" },
      },
      {
        value: { en: "Up to 403%", ar: "حتى 403٪" },
        label: {
          en: "more inquiries reported for listings marketed with video.",
          ar: "استفسارات أكثر للإعلانات التي تُسوَّق بالفيديو.",
        },
        source: { en: "Source: Mintandco.ae", ar: "المصدر: Mintandco.ae" },
      },
      {
        value: { en: "73%", ar: "73٪" },
        label: {
          en: "of sellers say they prefer agents who market their property with video.",
          ar: "من البائعين يقولون إنهم يفضّلون الوكلاء الذين يسوّقون عقارهم بالفيديو.",
        },
        source: { en: "Source: Mintandco.ae", ar: "المصدر: Mintandco.ae" },
      },
    ],
    note: {
      en: "Figures describe the video-listing market, not Big Story's own record.",
      ar: "تصف الأرقام سوق إعلانات الفيديو، لا سجلّ بيك ستوري الخاص.",
    },
  },
  drone: {
    eyebrow: { en: "Licensed drone work", ar: "عمل الدرون المرخّص" },
    h2: {
      en: "What a licensed drone operator actually means in Dubai.",
      ar: "ما يعنيه فعلاً مشغّل درون مرخّص في دبي.",
    },
    lead: {
      en: "Plenty of listings fly a drone without asking who is allowed to. In Dubai, commercial aerial filming needs a valid DCAA UAS Operator Authorization, and the airspace has to be checked before anyone takes off.",
      ar: "كثير من الإعلانات تُطيّر دروناً دون السؤال عمّن يُسمح له بذلك. في دبي، يحتاج التصوير الجوي التجاري إلى تصريح مشغّل أنظمة جوية غير مأهولة ساري المفعول من هيئة دبي للطيران المدني، ويجب فحص المجال الجوي قبل إقلاع أيّ أحد.",
    },
    body: {
      en: "The framework is DCAR-UAS Issue 03 (reference DCAA/DCAR/2025/00007). Its Basic Category covers standard photography and filming; its Advanced Category covers more complex operations and requires a safety management system. Big Story operates only under a valid DCAA authorization or subcontracts to a DCAA-authorized operator. We check the airspace, obtain the permits before the flight, and tell you plainly when a location cannot be flown legally. A refusal is cheaper than a fine.",
      ar: "الإطار هو DCAR-UAS الإصدار الثالث (المرجع DCAA/DCAR/2025/00007). فئته الأساسية تغطّي التصوير الفوتوغرافي والفيديو المعتاد؛ وفئته المتقدّمة تغطّي العمليات الأعقد وتتطلّب نظام إدارة سلامة. تعمل بيك ستوري فقط بموجب تصريح ساري من الهيئة أو تتعاقد من الباطن مع مشغّل مرخّص منها. نفحص المجال الجوي، ونحصل على التصاريح قبل الطيران، ونخبرك بوضوح حين يتعذّر تصوير موقع قانونياً. الرفض أرخص من الغرامة.",
    },
    points: [
      {
        label: { en: "Authorization", ar: "التصريح" },
        body: {
          en: "A valid DCAA UAS Operator Authorization, held by us or by the operator we subcontract.",
          ar: "تصريح مشغّل أنظمة جوية غير مأهولة ساري من الهيئة، بحوزتنا أو بحوزة المشغّل الذي نتعاقد معه.",
        },
      },
      {
        label: { en: "Airspace check", ar: "فحص المجال الجوي" },
        body: {
          en: "Airspace confirmed and permits obtained before the flight, not on the day.",
          ar: "تأكيد المجال الجوي والحصول على التصاريح قبل الطيران، لا في يومه.",
        },
      },
      {
        label: { en: "Honest refusal", ar: "رفض صريح" },
        body: {
          en: "If your location cannot be flown legally, we say so and plan the film without the aerial.",
          ar: "إن تعذّر تصوير موقعك جوياً بشكل قانوني، نقولها ونخطّط الفيلم دون اللقطة الجوية.",
        },
      },
    ],
  },
  compliance: {
    eyebrow: { en: "RERA Trakheesi compliance", ar: "الامتثال لترخيص تراخيص من مؤسسة التنظيم العقاري" },
    h2: {
      en: "The advertising rules most crews will not mention.",
      ar: "قواعد الإعلان التي لن يذكرها معظم الطواقم.",
    },
    lead: {
      en: "Every property advertised in Dubai needs its own Trakheesi permit before any marketing goes out, online, on social, in print or on a billboard. The permit number has to be visible on the images, captions and video, and a Madmoun QR code has to appear on visual ads, linking to verified Dubai Land Department data.",
      ar: "كل عقار يُعلَن عنه في دبي يحتاج تصريح تراخيص خاصاً به قبل نشر أيّ تسويق، إلكترونياً أو على السوشيال أو في المطبوعات أو على لوحة إعلانية. يجب أن يكون رقم التصريح ظاهراً على الصور والتعليقات والفيديو، ويجب أن يظهر رمز مضمون بصيغة QR على الإعلانات المرئية، موصولاً ببيانات موثّقة من دائرة الأراضي والأملاك.",
    },
    body: {
      en: "No property can be advertised without a signed Form A between owner and broker. From February 2026, a UAE Media Council Advertiser Permit is required as well for anyone publishing real estate promotional content, and there is no exemption for Instagram, TikTok, YouTube or WhatsApp. Fines start at AED 50,000 per offence. We deliver films with Trakheesi-ready metadata and a permit-display checklist. The permit itself is the advertiser's legal responsibility. We will tell you what to display and where, but we do not apply for permits on your behalf.",
      ar: "لا يمكن الإعلان عن أيّ عقار دون نموذج (أ) موقّع بين المالك والوسيط. اعتباراً من فبراير 2026، يُطلَب أيضاً تصريح معلن من مجلس الإمارات للإعلام لكل من ينشر محتوى ترويجياً عقارياً، ولا استثناء لإنستغرام أو تيك توك أو يوتيوب أو واتساب. تبدأ الغرامات من 50,000 درهم لكل مخالفة. نسلّم الأفلام ببيانات وصفية جاهزة لتراخيص وقائمة تحقّق لعرض التصريح. التصريح نفسه مسؤولية المعلن القانونية. سنخبرك بما يجب عرضه وأين، لكننا لا نتقدّم بطلب التصاريح نيابةً عنك.",
    },
    points: [
      {
        label: { en: "Trakheesi permit number", ar: "رقم تصريح تراخيص" },
        body: {
          en: "Displayed on images, captions and the video itself.",
          ar: "معروض على الصور والتعليقات والفيديو نفسه.",
        },
      },
      {
        label: { en: "Form A", ar: "نموذج (أ)" },
        body: {
          en: "A signed marketing agreement between owner and broker before any advertising.",
          ar: "اتفاقية تسويق موقّعة بين المالك والوسيط قبل أيّ إعلان.",
        },
      },
      {
        label: { en: "Madmoun QR code", ar: "رمز مضمون" },
        body: {
          en: "On visual ads, linking to verified Dubai Land Department data.",
          ar: "على الإعلانات المرئية، موصولاً ببيانات موثّقة من دائرة الأراضي والأملاك.",
        },
      },
      {
        label: { en: "Media Council permit", ar: "تصريح مجلس الإعلام" },
        body: {
          en: "A UAE Media Council Advertiser Permit, required from February 2026.",
          ar: "تصريح معلن من مجلس الإمارات للإعلام، مطلوب اعتباراً من فبراير 2026.",
        },
      },
    ],
    ownership: {
      en: "We handle the film and the metadata. You hold the permit. We keep those two things clearly separate so nobody assumes the other side has it covered.",
      ar: "نتولّى الفيلم والبيانات الوصفية. أنت تحمل التصريح. نُبقي هذين الأمرين منفصلين بوضوح كي لا يفترض أحد أن الطرف الآخر قد تكفّل بهما.",
    },
  },
  timeline: {
    eyebrow: { en: "Timeline", ar: "الجدول الزمني" },
    h2: { en: "How long it takes, tied to scope.", ar: "كم يستغرق الأمر، مرتبطاً بالنطاق." },
    lead: {
      en: "We do not promise a flat number of days before we know the job. A single apartment and a multi-building developer launch are not the same piece of work. Here is the honest range.",
      ar: "لا نعِد بعدد أيام ثابت قبل أن نعرف العمل. شقة واحدة وإطلاق مطوّر بعدّة مبانٍ ليسا العمل نفسه. وهذا هو النطاق الصادق.",
    },
    items: [
      {
        label: { en: "Single property", ar: "عقار واحد" },
        body: {
          en: "Five to ten working days from shoot to delivery, depending on the number of cuts and languages.",
          ar: "من خمسة إلى عشرة أيام عمل من التصوير إلى التسليم، حسب عدد المقاطع واللغات.",
        },
      },
      {
        label: { en: "Developer films", ar: "أفلام المطوّرين" },
        body: {
          en: "Two to four weeks for larger developer films, where there is more to shoot and more to build in post.",
          ar: "من أسبوعين إلى أربعة أسابيع للأفلام الأكبر للمطوّرين، حيث يكون التصوير أكثر وما بعد الإنتاج أطول.",
        },
      },
      {
        label: { en: "Set by the scope", ar: "يحدّده النطاق" },
        body: {
          en: "The final schedule comes out of a short scoping call. Scope decides it, not a fixed promise.",
          ar: "يخرج الجدول النهائي من مكالمة تحديد نطاق قصيرة. النطاق هو ما يحدّده، لا وعد ثابت.",
        },
      },
    ],
  },
  pricingApproach: {
    eyebrow: { en: "How we quote", ar: "كيف نسعّر" },
    h2: {
      en: "One planned day, not three separate shoots.",
      ar: "يوم واحد مخطّط له، لا ثلاثة تصويرات منفصلة.",
    },
    lead: {
      en: "The saving is in the planning. A well-run shoot day produces the portal master, the social cut and the Reel from the same footage, so you are not paying for three visits to the same property.",
      ar: "التوفير في التخطيط. يوم تصوير مُدار جيداً يُنتج النسخة الرئيسية للمنصّة ومقطع السوشيال والريل من اللقطات نفسها، فلا تدفع مقابل ثلاث زيارات للعقار ذاته.",
    },
    body: {
      en: "We quote after a short scoping call, once we know the property, the number of deliverables and whether the shoot needs a licensed drone. We would rather give you an accurate figure than a headline price that changes the moment we see the job.",
      ar: "نسعّر بعد مكالمة تحديد نطاق قصيرة، حين نعرف العقار وعدد المخرجات وما إذا كان التصوير يحتاج دروناً مرخّصاً. نفضّل أن نعطيك رقماً دقيقاً بدل سعر لافت يتغيّر لحظة رؤيتنا العمل.",
    },
  },
  faq: {
    eyebrow: { en: "FAQ", ar: "أسئلة متكررة" },
    h2: { en: "Real estate video, answered plainly.", ar: "الفيديو العقاري، بإجابات صريحة." },
    items: [
      {
        q: {
          en: "How long does a real estate video shoot take in Dubai?",
          ar: "كم يستغرق تصوير فيديو عقاري في دبي؟",
        },
        a: {
          en: "Two to three hours for an apartment, four to six hours for a villa. We work through the property in order: entrance, living areas, kitchen, bedrooms, bathrooms, then the balcony or terrace, checking each against the shot list we agreed before the day.",
          ar: "من ساعتين إلى ثلاث للشقة، ومن أربع إلى ست ساعات للفيلا. نتنقّل في العقار بترتيب: المدخل، ثم مناطق الجلوس، فالمطبخ، فغرف النوم، فالحمّامات، ثم الشرفة أو التراس، ونراجع كلّاً منها مقابل قائمة اللقطات المتّفق عليها قبل اليوم.",
        },
      },
      {
        q: {
          en: "Can you fly a drone over my property?",
          ar: "هل يمكنكم تطيير درون فوق عقاري؟",
        },
        a: {
          en: "Only with a valid DCAA UAS Operator Authorization and within permitted airspace. We check the airspace and obtain the permits before any flight, and we will tell you honestly if your location cannot be flown legally.",
          ar: "فقط بتصريح مشغّل أنظمة جوية غير مأهولة ساري من هيئة دبي للطيران المدني، وضمن مجال جوي مسموح. نفحص المجال الجوي ونحصل على التصاريح قبل أيّ طيران، وسنخبرك بصدق إن تعذّر تصوير موقعك جوياً بشكل قانوني.",
        },
      },
      {
        q: {
          en: "Do your videos meet Property Finder and Bayut specifications?",
          ar: "هل تلبّي فيديوهاتكم مواصفات بروبرتي فايندر وبيوت؟",
        },
        a: {
          en: "Yes. We deliver the resolution, duration and file formats that Property Finder, Bayut and Dubizzle require, so the file uploads without the listing platform rejecting it.",
          ar: "نعم. نسلّم الدقّة والمدة وصيغ الملفات التي يتطلّبها بروبرتي فايندر وبيوت ودوبيزل، فيُرفَع الملف دون أن ترفضه المنصّة.",
        },
      },
      {
        q: {
          en: "Can you produce Instagram Reels and TikTok from the same shoot?",
          ar: "هل يمكنكم إنتاج ريلز إنستغرام وتيك توك من التصوير نفسه؟",
        },
        a: {
          en: "Yes. One production day gives you the full walkthrough, a 60-second social cut and a 9:16 Reel. There is no separate shoot for the vertical versions.",
          ar: "نعم. يوم إنتاج واحد يمنحك الجولة الكاملة ومقطعاً اجتماعياً من ستين ثانية وريلاً بنسبة 9:16. لا تصوير منفصل للنسخ العمودية.",
        },
      },
      {
        q: {
          en: "Do you handle the RERA Trakheesi permit?",
          ar: "هل تتولّون تصريح تراخيص من مؤسسة التنظيم العقاري؟",
        },
        a: {
          en: "No. The Trakheesi permit is the advertiser's legal responsibility, meaning the broker or developer. We deliver the film with the correct metadata and a checklist for displaying the permit, but we do not apply for permits on your behalf.",
          ar: "لا. تصريح تراخيص مسؤولية المعلن القانونية، أي الوسيط أو المطوّر. نسلّم الفيلم بالبيانات الوصفية الصحيحة وقائمة تحقّق لعرض التصريح، لكننا لا نتقدّم بطلب التصاريح نيابةً عنك.",
        },
      },
      {
        q: {
          en: "Will my video work for international buyers?",
          ar: "هل سيصلح فيديوي للمشترين الدوليين؟",
        },
        a: {
          en: "Yes. We deliver with English captions by default and can add Arabic, Hindi, Russian or Mandarin subtitles on request, so a buyer reading in another language still follows the film.",
          ar: "نعم. نسلّم بترجمة إنجليزية افتراضاً، ويمكننا إضافة ترجمات بالعربية أو الهندية أو الروسية أو الصينية عند الطلب، كي يتابع الفيلمَ مشترٍ يقرأ بلغة أخرى.",
        },
      },
    ],
  },
  noAsset: {
    eyebrow: { en: "Where we stand right now", ar: "أين نقف الآن" },
    h2: {
      en: "We are building our Dubai property portfolio.",
      ar: "نحن نبني سجلّ أعمالنا العقاري في دبي.",
    },
    lead: {
      en: "We would rather say this plainly than fake a reel. Big Story has no Dubai property shoots to show yet. What you can judge us on today is the process above, the delivery specs, and the drone and permit workflow, all of which are true the day this page goes live.",
      ar: "نفضّل قول هذا بصراحة على تزييف ريل. لا تملك بيك ستوري بعد تصويرات عقارية في دبي لتعرضها. ما يمكنك الحكم علينا به اليوم هو العملية أعلاه، ومواصفات التسليم، وسير عمل الدرون والتصاريح، وكلّها صحيحة يوم نشر هذه الصفحة.",
    },
    placeholder: {
      title: { en: "Your property here", ar: "عقارك هنا" },
      note: {
        en: "Illustrative placeholder, not a Big Story project. This is where your walkthrough, aerial and social cut will sit once we have filmed them.",
        ar: "عنصر توضيحي، وليس مشروعاً لبيك ستوري. هنا ستوضع جولتك ولقطتك الجوية ومقطعك الاجتماعي بمجرد أن نصوّرها.",
      },
    },
    offer: {
      en: "The first projects we take on in 2026 get our full attention and a defined preferential rate, set on the scoping call and held for that project. If you have a property to film, talk to Saeed.",
      ar: "المشاريع الأولى التي نقبلها في 2026 تحظى بكامل اهتمامنا وبسعر تفضيلي محدّد، يُتّفق عليه في مكالمة تحديد النطاق ويُثبَّت لذلك المشروع. إن كان لديك عقار لتصويره، تحدّث إلى سعيد.",
    },
  },
  internalLink: {
    label: { en: "Before the shoot", ar: "قبل التصوير" },
    body: {
      en: "The same pre-production discipline sits behind every film we make, property or otherwise. Our how-we-work page walks through it step by step.",
      ar: "الانضباط نفسه في ما قبل الإنتاج يقف خلف كل فيلم نصنعه، عقارياً كان أو غيره. صفحة كيف نعمل تشرحه خطوة بخطوة.",
    },
    cta: { en: "See how we work", ar: "اطّلع على طريقة عملنا" },
  },
  labels: {
    covers: { en: "What it covers", ar: "ما يشمله" },
    source: { en: "Source", ar: "المصدر" },
  },
  cta: {
    heading: {
      en: "Have a property to film? Bring us the address.",
      ar: "لديك عقار لتصويره؟ أحضر لنا العنوان.",
    },
  },
} as const;
