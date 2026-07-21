/**
 * "How We Work" — the dedicated pre-production page.
 *
 * Content source: how_we_work_research_brief.md (10 cited sources).
 * Hard rules carried into every string here:
 *  - Never mention AI, machine learning or internal tooling. Internal
 *    AI-assisted thinking is described publicly as research, strategic
 *    thinking, concept development and copy/content expertise.
 *  - Timeline language is always conditional (4–8 weeks common after
 *    concept lock; a faster 1–3 week path only after a scope review).
 *  - No fabricated case studies, quotes, team or client work.
 *
 * Mirrors the bilingual `L` pattern used across copy.ts / clients.ts.
 */

export const howWeWork = {
  meta: {
    title: {
      en: "How We Work | Our Film Production Process | Big Story",
      ar: "كيف نعمل | عملية إنتاج الأفلام لدينا | بيك ستوري",
    },
    description: {
      en: "How Big Story moves a film from an unclear brief to a finished master: discovery, a written treatment, a locked script, storyboards, a call sheet, then the shoot and post. Honest timelines and one point of contact.",
      ar: "كيف تنقل بيك ستوري الفيلم من إيجاز غير واضح إلى نسخة نهائية: الاكتشاف، ومعالجة مكتوبة، ونص نهائي، وقصص مصورة، وورقة نداء، ثم التصوير وما بعد الإنتاج. جداول صادقة ونقطة تواصل واحدة.",
    },
  },
  breadcrumb: { en: "How we work", ar: "كيف نعمل" },
  hero: {
    eyebrow: { en: "How we work", ar: "كيف نعمل" },
    h1: {
      en: "Most clients come to us with a feeling, not a brief.",
      ar: "معظم عملائنا يأتون إلينا بإحساس، لا بإيجاز.",
    },
    lead: {
      en: "A feeling is a good place to start. It is a hard thing to film. This page shows how we turn that first instinct into a plan precise enough that, by shoot day, the client, the crew and the cast are all looking at the same film.",
      ar: "الإحساس بداية جيدة، لكنه صعب التصوير. تشرح هذه الصفحة كيف نحوّل ذلك الحدس الأول إلى خطة دقيقة بما يكفي ليكون العميل والطاقم والممثلون، بحلول يوم التصوير، ينظرون جميعاً إلى الفيلم نفسه.",
    },
    promise: {
      en: "The work you see on set is the calm part. Most of it happens before, on paper, where a mistake costs an eraser instead of a shoot day.",
      ar: "ما تراه على الموقع هو الجزء الهادئ. معظم العمل يحدث قبله، على الورق، حيث يكلّف الخطأ ممحاة بدل يوم تصوير.",
    },
  },
  sections: [
    {
      id: "discovery",
      n: "01",
      eyebrow: { en: "Discovery", ar: "الاكتشاف" },
      h2: {
        en: "We find the problem before we pitch the film.",
        ar: "نجد المشكلة قبل أن نقترح الفيلم.",
      },
      lead: {
        en: "A brief usually arrives as a solution in disguise. “We need a two-minute brand film” is already an answer. Our first job is to find the question it was meant to answer.",
        ar: "غالباً ما يصل الإيجاز على هيئة حلٍّ متنكّر. عبارة «نحتاج فيلماً تعريفياً من دقيقتين» هي إجابة مسبقة. ومهمتنا الأولى أن نجد السؤال الذي وُضعت تلك الإجابة له.",
      },
      body: {
        en: "So the first conversation is mostly us asking. Who is this film for, and what do they believe right now? Whose sign-off does it need that is not in the room? What would make the person holding the budget call it a success? None of this is delay. This is the stage where a weak project gets caught, while it is still cheap to fix.",
        ar: "لذلك تكون المحادثة الأولى منّا نحن نسأل أكثر مما نعرض. لمن هذا الفيلم، وبماذا يؤمن جمهوره الآن؟ من صاحب القرار الغائب عن الاجتماع؟ وما الذي يجعل صاحب الميزانية يعدّه نجاحاً؟ لا شيء من هذا تعطيل. هذه هي المرحلة التي يُكتشف فيها المشروع الضعيف بينما إصلاحه لا يزال رخيصاً.",
      },
      artifacts: [
        { en: "A kickoff call", ar: "مكالمة انطلاق" },
        { en: "Audience and stakeholder notes", ar: "ملاحظات عن الجمهور وأصحاب القرار" },
      ],
      output: {
        en: "A one-sentence problem statement both sides sign off on.",
        ar: "جملة واحدة تحدّد المشكلة، يوافق عليها الطرفان.",
      },
    },
    {
      id: "concept",
      n: "02",
      eyebrow: { en: "Concept & creative direction", ar: "الفكرة والتوجيه الإبداعي" },
      h2: {
        en: "One idea, written down so it can be argued with.",
        ar: "فكرة واحدة، مكتوبة كي يمكن مناقشتها.",
      },
      lead: {
        en: "The problem statement points to a single idea. We write that idea into a treatment: a short document the client can read, picture and push back on before any money is spent on a camera.",
        ar: "تشير جملة المشكلة إلى فكرة واحدة. نكتب تلك الفكرة في معالجة: وثيقة قصيرة يقرأها العميل ويتخيّلها ويعترض عليها قبل إنفاق درهم على الكاميرا.",
      },
      body: {
        en: "The treatment carries the story, the tone, a point of view on casting and pace, and reference images chosen for mood rather than to be copied. We research the brand and its category first, so the idea sits on something real. This is the first moment everyone reads the same film off the same page. If it is going to be wrong, we want it wrong here, in a paragraph.",
        ar: "تحمل المعالجة القصة والنبرة ووجهة نظر في الاختيار والإيقاع، وصوراً مرجعية اختيرت للأجواء لا للنسخ. نبحث في العلامة وقطاعها أولاً كي تستند الفكرة إلى شيء حقيقي. هنا يقرأ الجميع الفيلم نفسه من الصفحة نفسها لأول مرة. وإن كان في الفكرة خطأ، فنريده خطأً هنا، في فقرة.",
      },
      artifacts: [
        { en: "A written treatment", ar: "معالجة مكتوبة" },
        { en: "A tone and reference board", ar: "لوحة مرجعية للنبرة" },
      ],
      output: {
        en: "An approved treatment, the first version of the film everyone can see.",
        ar: "معالجة معتمدة، أول نسخة من الفيلم يراها الجميع.",
      },
    },
    {
      id: "script",
      n: "03",
      eyebrow: { en: "Content & script", ar: "المحتوى والنص" },
      h2: {
        en: "The words come before the frames.",
        ar: "الكلمات تأتي قبل اللقطات.",
      },
      lead: {
        en: "Now the concept becomes language: voiceover, dialogue, on-screen text, interview questions, whatever the format asks for. We read the first draft as a story. Only after it holds as a story do we read it again as a shooting blueprint.",
        ar: "الآن تتحوّل الفكرة إلى لغة: تعليق صوتي وحوار ونصوص على الشاشة وأسئلة مقابلات، وما يطلبه الشكل. نقرأ المسودّة الأولى بوصفها قصة. وبعد أن تصمد كقصة فقط، نعيد قراءتها بوصفها مخططاً للتصوير.",
      },
      body: {
        en: "Copy is written against the belief we are trying to move, not against a feature list. We draft, we cut, we read it aloud. A script that reads well on the page and falls apart in the mouth is not finished. We lock it before we board a single frame, because every later decision, the shot list, the schedule, the budget, is built on top of these words.",
        ar: "يُكتب النص في مواجهة الاعتقاد الذي نريد تغييره، لا في مواجهة قائمة مزايا. نكتب ونحذف ونقرأ بصوت عالٍ. النص الذي يقرأ جيداً على الورق وينهار على اللسان لم يكتمل بعد. نعتمده نهائياً قبل رسم أي لقطة، لأن كل قرار لاحق، من قائمة اللقطات إلى الجدول إلى الميزانية، يُبنى فوق هذه الكلمات.",
      },
      artifacts: [
        { en: "Script drafts", ar: "مسودّات النص" },
        { en: "A locked script", ar: "نص نهائي مُعتمد" },
      ],
      output: {
        en: "A locked script the client signs off before storyboarding starts.",
        ar: "نص نهائي يعتمده العميل قبل بدء القصة المصورة.",
      },
    },
    {
      id: "storyboard",
      n: "04",
      eyebrow: { en: "Storyboard & shot design", ar: "القصة المصورة وتصميم اللقطات" },
      h2: {
        en: "A shot list is an edit test, not decoration.",
        ar: "قائمة اللقطات اختبار للمونتاج، لا زينة.",
      },
      lead: {
        en: "We turn the locked script into a sequence of shots and ask the hard question early: does this cut together? A frame can look good on its own and still refuse to sit next to the one before it.",
        ar: "نحوّل النص النهائي إلى سلسلة لقطات، ونطرح السؤال الصعب مبكراً: هل تتماسك في المونتاج؟ قد تبدو اللقطة جيدة وحدها وترفض مع ذلك أن تجاور ما قبلها.",
      },
      body: {
        en: "Each scene gets an outcome written next to it, one line on what the viewer should feel or understand by the end of it. The storyboard or shot list scales to the job; a moving product hero and a sit-down interview do not need the same paper. Where the light has to be controlled, we draw a lighting plan. Then we build a gear list, split across camera, grip and lighting. Finding out a sequence does not work on paper costs nothing. Finding out on set costs the day.",
        ar: "لكل مشهد نتيجة مكتوبة بجانبه، سطر واحد عمّا ينبغي أن يشعر به المشاهد أو يفهمه في نهايته. تتناسب القصة المصورة أو قائمة اللقطات مع حجم العمل؛ فلقطة منتج متحرّكة ومقابلة جالسة لا تحتاجان الورق نفسه. وحيث يجب التحكّم في الضوء، نرسم خطة إضاءة. ثم نضع قائمة معدات موزّعة على الكاميرا والحمل والإضاءة. اكتشاف أن مشهداً لا ينجح على الورق لا يكلّف شيئاً. اكتشافه على الموقع يكلّف اليوم كله.",
      },
      artifacts: [
        { en: "A storyboard or shot list", ar: "قصة مصورة أو قائمة لقطات" },
        { en: "An outcome note per scene", ar: "ملاحظة نتيجة لكل مشهد" },
        { en: "A lighting plan", ar: "خطة إضاءة" },
        { en: "A gear list", ar: "قائمة معدات" },
      ],
      output: {
        en: "A visual plan the crew can build from, approved in writing.",
        ar: "خطة بصرية يبني عليها الطاقم، معتمدة كتابةً.",
      },
    },
    {
      id: "logistics",
      n: "05",
      eyebrow: { en: "Casting, locations & logistics", ar: "الاختيار والمواقع واللوجستيات" },
      h2: {
        en: "The unglamorous ninety percent.",
        ar: "التسعون بالمئة غير البرّاقة.",
      },
      lead: {
        en: "This is the part nobody sees and everything rests on. Casting for faces and performances that carry the idea. Scouting locations, then a technical scout with the department heads who have to work there.",
        ar: "هذا الجزء لا يراه أحد ويقوم عليه كل شيء. اختيار وجوه وأداء يحملان الفكرة. معاينة المواقع، ثم معاينة تقنية مع رؤساء الأقسام الذين سيعملون فيها.",
      },
      body: {
        en: "The schedule respects what is real: cast and crew availability, the hour the light is right, how long a rental can stay on the truck. We handle permits and location agreements, confirm the crew and brief them on the one thing the film is about, and run camera tests where they earn their place. By the last day of prep there is a call sheet, a schedule everyone has agreed to, signed paperwork and gear that has already been switched on once. The shoot should hold no surprises except the ones the director asked for.",
        ar: "يحترم الجدول ما هو واقعي: توافر الطاقم والممثلين، والساعة التي يكون فيها الضوء مناسباً، والمدة التي يمكن أن تبقى فيها المعدات المستأجرة. نتولّى التصاريح واتفاقيات المواقع، ونؤكّد الطاقم ونطلعه على الشيء الوحيد الذي يدور حوله الفيلم، ونجري اختبارات كاميرا حيث تستحق. وبحلول آخر يوم تحضير يكون هناك ورقة نداء وجدول اتفق عليه الجميع وأوراق موقّعة ومعدات شُغّلت مرة من قبل. يجب ألا يحمل التصوير مفاجآت سوى ما طلبه المخرج.",
      },
      artifacts: [
        { en: "A call sheet", ar: "ورقة نداء (call sheet)" },
        { en: "A locked schedule", ar: "جدول تصوير نهائي" },
        { en: "Location agreements and permits", ar: "اتفاقيات المواقع والتصاريح" },
        { en: "Tested gear", ar: "معدات مُختبرة" },
      ],
      output: {
        en: "A shoot day planned down to the hour, with the paperwork already signed.",
        ar: "يوم تصوير مخطط له بالساعة، بأوراق موقّعة مسبقاً.",
      },
    },
    {
      id: "production",
      n: "06",
      eyebrow: { en: "Production, post & delivery", ar: "التصوير وما بعد الإنتاج والتسليم" },
      h2: {
        en: "On set it looks easy, because of everything above.",
        ar: "على الموقع يبدو الأمر سهلاً، بفضل كل ما سبق.",
      },
      lead: {
        en: "On the day, each person guards one thing. The director protects the performance and the rhythm. The cinematographer protects the image. The first assistant director protects the clock. The script supervisor protects continuity, so the edit has what it needs.",
        ar: "في يوم التصوير يحرس كل شخص شيئاً واحداً. المخرج يحمي الأداء والإيقاع. ومدير التصوير يحمي الصورة. والمساعد الأول يحمي الوقت. ومشرف السيناريو يحمي الاستمرارية كي يجد المونتاج ما يحتاجه.",
      },
      body: {
        en: "In post we send versions, not drafts. Version one already has the colour and the graphics in it, so you judge the film you are actually getting, not a grey placeholder. We hold a single live review with everyone who has a say in the same room or the same call, because ten conflicting comments by email is how a good cut dies. Then we close in one revision round whenever the job allows. You get final masters in every format the campaign needs, backed up, with the paperwork in order.",
        ar: "في ما بعد الإنتاج نرسل نسخاً، لا مسودّات. النسخة الأولى فيها الألوان والغرافيك أصلاً، كي تحكم على الفيلم الذي ستحصل عليه فعلاً لا على قالب رمادي. نعقد مراجعة حية واحدة يجتمع فيها كل صاحب رأي في الغرفة نفسها أو المكالمة نفسها، لأن عشر ملاحظات متناقضة عبر البريد هي ما يقتل المونتاج الجيد. ثم نُغلق في جولة تعديل واحدة كلما سمح العمل بذلك. تحصل على نسخ نهائية بكل صيغة تحتاجها الحملة، منسوخة احتياطياً، وبأوراق مرتّبة.",
      },
      artifacts: [
        { en: "A colour-and-graphics version one", ar: "نسخة أولى بالألوان والغرافيك" },
        { en: "One live review", ar: "مراجعة حية واحدة" },
        { en: "Final masters and backups", ar: "نسخ نهائية ونسخ احتياطية" },
      ],
      output: {
        en: "Final masters in every format the campaign needs, delivered with backups.",
        ar: "نسخ نهائية بكل صيغة تحتاجها الحملة، مسلّمة مع نسخ احتياطية.",
      },
    },
  ],
  timeline: {
    eyebrow: { en: "Timelines", ar: "الجداول الزمنية" },
    h2: { en: "How long it takes, honestly.", ar: "كم يستغرق الأمر، بصدق." },
    lead: {
      en: "We do not quote a flat timeline before we have seen the job. Scope decides it: the cast, the number of locations, and how much the film asks of post. Here is the honest range.",
      ar: "لا نعطي جدولاً ثابتاً قبل أن نرى العمل. النطاق هو ما يحدّده: الطاقم، وعدد المواقع، وما يطلبه الفيلم من مرحلة ما بعد الإنتاج. وهذا هو النطاق الصادق.",
    },
    items: [
      {
        label: { en: "Common range", ar: "النطاق المعتاد" },
        body: {
          en: "Four to eight weeks from concept lock, depending on cast, locations and post.",
          ar: "من أربعة إلى ثمانية أسابيع من اعتماد الفكرة، حسب الطاقم والمواقع وما بعد الإنتاج.",
        },
      },
      {
        label: { en: "A faster path", ar: "مسار أسرع" },
        body: {
          en: "One to three weeks is sometimes possible after we review scope, availability and post. We will not promise it until we have seen the job.",
          ar: "أسبوع إلى ثلاثة أسابيع ممكنة أحياناً بعد مراجعة النطاق والتوافر وما بعد الإنتاج. لن نعِد بذلك قبل أن نرى العمل.",
        },
      },
      {
        label: { en: "Before the clock starts", ar: "قبل أن يبدأ العدّاد" },
        body: {
          en: "Discovery and concept usually take one to two weeks of their own before the production clock starts.",
          ar: "عادةً يأخذ الاكتشاف والفكرة أسبوعاً إلى أسبوعين قبل أن يبدأ عدّاد الإنتاج.",
        },
      },
    ],
  },
  complexity: {
    eyebrow: { en: "Working with us", ar: "العمل معنا" },
    h2: {
      en: "We hold the complexity. You hold the message.",
      ar: "نتكفّل نحن بالتعقيد. وأنت تتكفّل بالرسالة.",
    },
    lead: {
      en: "You should not have to project-manage a film crew. Your job is the message and the people it is meant to reach. The middle, the technical machinery of getting there, is ours.",
      ar: "لا ينبغي أن تدير أنت طاقم تصوير. مهمتك هي الرسالة والناس الذين وُجدت من أجلهم. أما الوسط، أي الآلية التقنية للوصول إلى هناك، فهو مهمتنا.",
    },
    points: [
      {
        en: "One point of contact from the first call to final delivery, so you are never re-explaining the project to a new face.",
        ar: "نقطة تواصل واحدة من أول مكالمة حتى التسليم النهائي، فلا تعيد شرح المشروع لوجه جديد.",
      },
      {
        en: "The same process every time, so what you sign up for is what actually happens.",
        ar: "العملية نفسها في كل مرة، فما توافق عليه هو ما يحدث فعلاً.",
      },
      {
        en: "Timelines we will stand behind: four to eight weeks common after concept lock, a faster path only after we have reviewed scope.",
        ar: "جداول نقف خلفها: أربعة إلى ثمانية أسابيع شائعة بعد اعتماد الفكرة، ومسار أسرع فقط بعد مراجعة النطاق.",
      },
      {
        en: "A creative director who guards the idea you approved, from the pitch through the grade, so the final film still looks like the one you said yes to.",
        ar: "مدير إبداعي يحمي الفكرة التي اعتمدتها، من العرض حتى تصحيح الألوان، ليبقى الفيلم النهائي شبيهاً بالذي وافقت عليه.",
      },
    ],
  },
  labels: {
    artifacts: { en: "What you get", ar: "ما تحصل عليه" },
    output: { en: "Output", ar: "المُخرَج" },
  },
  cta: {
    heading: {
      en: "Bring us the feeling. We will build the plan.",
      ar: "أحضر لنا الإحساس، ونحن نبني الخطة.",
    },
  },
} as const;
