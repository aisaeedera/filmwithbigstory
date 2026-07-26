/**
 * Website-services sub-pages: dedicated SEO landing pages for each capability
 * Big Story's web division delivers. Each entry powers a route at
 * /website-services/<slug> (EN) and /ar/website-services/<slug> (AR).
 *
 * Content rules (canonical for all Big Story web copy):
 *  - No em-dash anywhere. Use commas, periods, parentheses, or rewrites.
 *  - No fabricated portfolio, clients, view counts, testimonials or case studies.
 *    Big Story's web division is young; claims stay honest and process-led.
 *  - Never mention AI, machine learning, or internal tooling in public copy.
 *  - Dubai / UAE keyword targeting, FAQ + Service schema on every page.
 *  - Bilingual EN + AR mirrors on every string.
 */

import type { L } from "@/lib/i18n";

export type WebServiceSection = {
  id: string;
  n: string;
  eyebrow: L;
  h2: L;
  lead: L;
  body: L;
  list: L[];
};

export type WebService = {
  slug: string;
  meta: { title: L; description: L };
  breadcrumb: L;
  hero: {
    eyebrow: L;
    h1: L;
    lead: L;
    promise: L;
  };
  sections: WebServiceSection[];
  deliverables: { eyebrow: L; h2: L; items: L[] };
  approach: { eyebrow: L; h2: L; lead: L; body: L };
  outcomes: { eyebrow: L; h2: L; lead: L; items: { label: L; body: L }[] };
  faq: { eyebrow: L; h2: L; items: { q: L; a: L }[] };
  cta: { heading: L };
};

export const webServices: WebService[] = [
  {
    slug: "industry-research",
    meta: { title: { en: "Website Strategy and Industry Research in Dubai | Big Story", ar: "استراتيجية المواقع وأبحاث الصناعة في دبي | بيك ستوري" }, description: { en: "Strategy-led website research for Dubai businesses. We map your competitors, your buyers, and your local market before a single pixel is drawn.", ar: "أبحاث استراتيجية للمواقع مخصصة لشركات دبي. نرسم خريطة منافسيك وعملائك وسوقك المحلي قبل رسم أي بكسل." } },
    breadcrumb: { en: "Industry research", ar: "أبحاث الصناعة" },
    hero: {
      eyebrow: { en: "Strategy and specialized industry research", ar: "الاستراتيجية وأبحاث الصناعة المتخصصة" },
      h1: { en: "Website strategy and industry research for Dubai businesses", ar: "استراتيجية المواقع وأبحاث الصناعة لشركات دبي" },
      lead: { en: "Before we design anything, we study your business the way an analyst would. We map who you compete with on Google, who actually buys from you, and what the Dubai market for your service looks like. The website we build afterwards is shaped by that research, not by guesswork.", ar: "قبل أن نصمم أي شيء، ندرس عملك كما يفعل المحلل. نرسم خريطة لمن تنافسهم على جوجل، ولمن يشتري منك فعلاً، ولشكل سوق دبي لخدمتك. الموقع الذي نبنيه بعد ذلك يتشكّل من هذا البحث، لا من التخمين." },
      promise: { en: "This is the foundation under every homepage concept we design. If you skip it, you get a pretty site. If you do it, you get a site that earns its place in search and in the buyer's mind.", ar: "هذا هو الأساس تحت كل مفهوم صفحة رئيسية نصممه. إذا تخطّيته، تحصل على موقع جميل. وإذا فعلته، تحصل على موقع يستحقّ مكانه في البحث وفي ذهن المشتري." },
    },
    sections: [
    {
      id: "what-we-study", n: "01",
      eyebrow: { en: "What we study", ar: "ما ندرسه" },
      h2: { en: "Three pictures of your market, taken before the design starts.", ar: "ثلاث صور لسوقك، تُلتقط قبل بدء التصميم." },
      lead: { en: "Most Dubai website projects start with a mood board. Ours start with a spreadsheet. We build three pictures of where your business actually sits, and only then do we touch design.", ar: "معظم مشاريع مواقع دبي تبدأ بلوحة إلهام. مشاريعنا تبدأ بجدول بيانات. نبني ثلاث صور لمكان عملك الحقيقي، وعندها فقط نبدأ بالتصميم." },
      body: { en: "The first picture is your competitive landscape on Google. We look at who ranks for the searches your future customers type, what their pages say, and where the gaps are that a smaller, sharper site can win. Dubai is crowded, but the front page of Google is rarely as locked as it looks. Most local competitors publish thin, generic pages. A focused site that says something specific can climb past them.", ar: "الصورة الأولى هي مشهدك التنافسي على جوجل. ننظر إلى من يتصدّر عمليات البحث التي يكتبها عملاؤك المستقبليون، وما تقوله صفحاتهم، وأين تكمن الفجوات التي يمكن لموقع أصغر وأكثر تركيزاً أن يكسبها. دبي مزدحمة، لكن الصفحة الأولى من جوجل نادراً ما تكون محصّنة كما تبدو. معظم المنافسين المحليين ينشرون صفحات رقيقة وعامة. يمكن لموقع مركّز يقول شيئاً محدداً أن يتسلّق فوقهم." },
      list: [
        { en: "Competitor ranking audit for your top Dubai service keywords", ar: "تدقيق ترتيب المنافسين لأهم كلمات خدمتك في دبي" },
        { en: "Content gap analysis, where competitors are weak and vague", ar: "تحليل فجوات المحتوى، حيث يكون المنافسون ضعفاء وغامضين" },
        { en: "Search intent mapping for each keyword cluster", ar: "رسم خريطة نية البحث لكل مجموعة كلمات مفتاحية" },
      ],
    },
    {
      id: "who-buys", n: "02",
      eyebrow: { en: "Who buys from you", ar: "من يشتري منك" },
      h2: { en: "We build a buyer profile from evidence, not personas invented in a meeting.", ar: "نبني ملف المشتري من الأدلة، لا من شخصيات مختلقة في اجتماع." },
      lead: { en: "A buyer persona that someone invented in a workshop is usually wrong. A buyer profile built from what people search, what they ask, and how they behave is usually useful. We build the second kind.", ar: "ملف المشتري الذي يختلقه شخص ما في ورشة عمل يكون عادةً خاطئاً. ملف المشتري المبني على ما يبحث عنه الناس وما يطرحونه وكيف يتصرفون يكون عادةً مفيداً. نحن نبني النوع الثاني." },
      body: { en: "We look at the questions your buyers ask before they ever contact a supplier. For a dental clinic in Dubai, that might be cost, insurance, and how soon an appointment is available. For a real estate advisor, it might be off-plan versus ready, payment plans, and developer reputation. For a smart home installer, it might be integration with existing systems and after-sales support. Every industry has its own set of real questions, and your website should answer the ones your buyers actually ask, in the order they ask them.", ar: "ننظر إلى الأسئلة التي يطرحها عملاؤك قبل أن يتواصلوا مع أي مورّد. بالنسبة لعيادة أسنان في دبي، قد تكون التكلفة والتأمين وقرب موعد الموعد المتاح. بالنسبة لمستشار عقاري، قد تكون خارج المخطط مقابل جاهز، وخطط السداد، وسمعة المطوّر. بالنسبة لمثبّت منزل ذكي، قد تكون التوافق مع الأنظمة الحالية والدعم بعد البيع. لكل صناعة مجموعة أسئلتها الحقيقية، ويجب أن يجيب موقعك على الأسئلة التي يطرحها عملاؤك فعلاً، وبالترتيب الذي يطرحونها به." },
      list: [
        { en: "Question research from search, reviews, and calls", ar: "بحث الأسئلة من عمليات البحث والمراجعات والمكالمات" },
        { en: "Objection mapping, what stops a buyer from contacting you", ar: "رسم خريطة الاعتراضات، ما يمنع المشتري من التواصل معك" },
        { en: "Decision stage mapping, what each page needs to say", ar: "رسم خريطة مراحل القرار، ما يجب أن تقوله كل صفحة" },
      ],
    },
    {
      id: "local-market", n: "03",
      eyebrow: { en: "The Dubai factor", ar: "عامل دبي" },
      h2: { en: "Dubai search is local search, and local search has its own rules.", ar: "البحث في دبي هو بحث محلي، والبحث المحلي له قواعده الخاصة." },
      lead: { en: "A surprising amount of Dubai web traffic is local. People search for a dentist near their office, a photographer in their neighbourhood, a clinic close to the metro. If your site ignores this, it leaves money on the table for competitors who do not.", ar: "جزء مفاجئ من حركة دبي على الويب محلي. يبحث الناس عن طبيب أسنان قرب مكتبهم، ومصور في حيّهم، وعيادة قرب المترو. إذا تجاهل موقعك ذلك، يترك المال على الطاولة للمنافسين الذين لا يتجاهلونه." },
      body: { en: "We look at how Dubai, Abu Dhabi, Sharjah, and the wider UAE search differently, and where your customers concentrate. We check your Google Business Profile standing, your map presence, and how local intent searches connect to your website. The research findings feed directly into the site structure, the service area pages, and the local schema markup, so the finished site speaks the language Dubai buyers actually search in.", ar: "ننظر إلى كيف يختلف البحث بين دبي وأبو ظبي والشارقة وبقية الإمارات، وأين يتركّز عملاؤك. نتحقق من وضع ملفك التجاري على جوجل، ووجودك على الخريطة، وكيف تتصل عمليات البحث ذات النية المحلية بموقعك. تغذّي نتائج البحث هيكل الموقع مباشرة، وصفحات مناطق الخدمة، وترميز schema المحلي، بحيث يتحدّث الموقع النهائي باللغة التي يبحث بها مشترو دبي فعلاً." },
      list: [
        { en: "Neighbourhood and emirate-level search demand", ar: "الطلب على البحث على مستوى الحيّ والإمارة" },
        { en: "Google Business Profile and map presence audit", ar: "تدقيق ملف جوجل التجاري والوجود على الخريطة" },
        { en: "Local schema and service area page planning", ar: "تخطيط schema المحلي وصفحات مناطق الخدمة" },
      ],
    },
    {
      id: "what-changes", n: "04",
      eyebrow: { en: "What changes when research leads", ar: "ما الذي يتغيّر عندما يقود البحث" },
      h2: { en: "A site built on research reads differently from one that is not.", ar: "الموقع المبني على البحث يُقرأ بشكل مختلف عن غيره." },
      lead: { en: "You can usually tell within ten seconds whether a website was built on research or on a template. The researched site answers the question in your head. The templated site answers a question nobody asked.", ar: "يمكن عادةً معرفة ذلك خلال عشر ثوانٍ، ما إذا كان الموقع مبنياً على بحث أم على قالب. الموقع المدروس يجيب عن السؤال في رأسك. الموقع القالبي يجيب عن سؤال لم يطرحه أحد." },
      body: { en: "A researched homepage opens with the promise the buyer is actually looking for. It anticipates the price question instead of hiding from it. It shows proof where proof is expected and personality where personality helps. It ends with a clear, low-friction next step. Every one of those choices comes from knowing the market, and knowing the market is what this service is for. When the homepage concept lands in front of you, you will feel the difference, because the words on it will be the words your customers use.", ar: "تفتتح الصفحة الرئيسية المدروسة بالوعد الذي يبحث عنه المشتري فعلاً. تستبق سؤال السعر بدلاً من الاختباء منه. تُظهر الدليل حيث يُتوقّع الدليل، والشخصية حيث تساعد الشخصية. وتنتهي بخطوة تالية واضحة ومنخفضة الاحتكاك. كل واحد من هذه الخيارات يأتي من معرفة السوق، ومعرفة السوق هي غرض هذه الخدمة. عندما يصل مفهوم الصفحة الرئيسية أمامك، ستشعر بالفرق، لأن الكلمات عليه ستكون الكلمات التي يستخدمها عملاؤك." },
      list: [
        { en: "Homepage opens with the buyer's real promise", ar: "تفتتح الصفحة الرئيسية بوعد المشتري الحقيقي" },
        { en: "Price and process shown early to build trust", ar: "السعر والعملية يُظهران مبكراً لبناء الثقة" },
        { en: "A single clear next step instead of competing buttons", ar: "خطوة تالية واحدة واضحة بدلاً من أزرار متزاحمة" },
      ],
    },
    {
      id: "what-it-prevents", n: "05",
      eyebrow: { en: "What research prevents", ar: "ما يمنعه البحث" },
      h2: { en: "The most expensive website mistake is building the wrong site confidently.", ar: "أغلى خطأ موقع هو بناء الموقع الخطأ بثقة." },
      lead: { en: "Research does not just improve the site you build. It stops you from building a site your market does not want, which is the most common and most expensive failure in web design.", ar: "البحث لا يحسّن الموقع الذي تبنيه فحسب. إنه يوقفك عن بناء موقع لا يريده سوقك، وهو الفشل الأكثر شيوعاً والأكثر كلفة في تصميم المواقع." },
      body: { en: "Every week, somewhere in Dubai, a business pays for a beautiful website that answers a question nobody is asking. It launches, it looks impressive, and it generates nothing, because it was built on assumptions instead of evidence. The design was flawless and the strategy was wrong. Research is what prevents this. When we know what your buyers actually search, what they actually worry about, and what they actually need to hear before they contact you, the site we build has a job to do and the means to do it. Without research, a website is a gamble. With it, a website is a decision made on purpose. That single difference is worth more than any feature, any animation, any clever headline, because it is the difference between a site that earns its keep and a site that sits there.", ar: "كل أسبوع، في مكان ما في دبي، تدفع شركة مقابل موقع جميل يجيب عن سؤال لا يطرحه أحد. يُطلَق، يبدو مبهِراً، ولا يُولّد شيئاً، لأنه بُني على افتراضات لا أدلة. كان التصميم بلا عيب وكانت الاستراتيجية خاطئة. البحث هو ما يمنع هذا. عندما نعرف ما يبحث عنه عملاؤك فعلاً، وما يقلقهم فعلاً، وما يحتاجون سماعه فعلاً قبل أن يتواصلوا معك، يكون للموقع الذي نبنيه مهمة يؤدّيها ووسائل لأدائها. دون بحث، يكون الموقع مقامرة. به، يكون الموقع قراراً متّخذاً عن قصد. هذا الفرق وحده يساوي أكثر من أي ميزة، أي حركة، أي عنوان ذكي، لأنه الفرق بين موقع يكسب قيمته وموقع يجلس هناك." },
      list: [
        { en: "Stops you building a site nobody wants", ar: "يوقفك عن بناء موقع لا يريده أحد" },
        { en: "Turns a gamble into a deliberate decision", ar: "يحوّل المقامرة إلى قرار متعمّد" },
        { en: "Worth more than any single feature", ar: "يساوي أكثر من أي ميزة واحدة" },
      ],
    },
    {
      id: "how-it-shows", n: "06",
      eyebrow: { en: "How it shows up", ar: "كيف يظهر" },
      h2: { en: "You will feel the research in the finished site, even if you never read the report.", ar: "ستشعر بالبحث في الموقع النهائي، حتى لو لم تقرأ التقرير أبداً." },
      lead: { en: "The sign that research was done is not a document. It is that the homepage says the right things in the right order, and your buyers respond.", ar: "علامة أن البحث أُجري ليست مستنداً. إنها أن الصفحة الرئيسية تقول الأشياء الصحيحة بالترتيب الصحيح، ويستجيب عملاؤك." },
      body: { en: "Some clients want to see the research report. Others just want the site to work. For the second group, the proof that research happened is in how the site reads. The hero says what the buyer came to hear. The structure answers objections before they form. The contact action sits where a ready buyer expects it. None of this is accidental. It all traces back to knowing the market, which traces back to the research. When you review the three homepage directions, the reason they feel right, or the reason one clearly fits and the others do not, is the research underneath them. You may never open the findings brief, and that is fine. The brief did its job by shaping the site, which is doing its job for you.", ar: "بعض العملاء يريدون رؤية تقرير البحث. آخرون يريدون فقط أن يعمل الموقع. للمجموعة الثانية، الدليل أن البحث حدث في كيفية قراءة الموقع. الـhero يقول ما جاء المشتري ليسمعه. الهيكل يجيب عن الاعتراضات قبل أن تتشكّل. إجراء التواصل يجلس حيث يتوقّعه المشتري الجاهز. لا شيء من هذا صدفة. كلّه يعود إلى معرفة السوق، الذي يعود إلى البحث. عندما تراجع اتجاهات الصفحة الرئيسية الثلاثة، سبب شعورها بالصواب، أو سبب ملاءمة واحد بوضوح وعدم البقية، هو البحث تحتهم. قد لا تفتح موجز النتائج أبداً، وهذا جيد. الموجز أدّى مهمته بتشكيل الموقع، الذي يؤدّي مهمته لك." },
      list: [
        { en: "Right words in the right order, not by accident", ar: "كلمات صحيحة بالترتيب الصحيح، لا بالصدفة" },
        { en: "Objections answered before they form", ar: "اعتراضات تُجاب قبل أن تتشكّل" },
        { en: "The fit you feel traces to the research", ar: "الملاءمة التي تشعر بها تعود للبحث" },
      ],
    },
    {
      id: "common-mistakes", n: "07",
      eyebrow: { en: "Common mistakes", ar: "أخطاء شائعة" },
      h2: { en: "The research mistakes that sink Dubai websites before they launch.", ar: "أخطاء البحث التي تُغرق مواقع دبي قبل إطلاقها." },
      lead: { en: "Most website failures are decided in the research phase, not the design phase. Here is what goes wrong.", ar: "معظم إخفاقات المواقع تُقرَّر في مرحلة البحث، لا مرحلة التصميم. هنا ما يسوء." },
      body: { en: "The first mistake is skipping research entirely and building from a template, which produces a site that looks fine and converts poorly. The second is doing research but ignoring what it says, because someone on the team preferred a different idea. The third is researching the wrong audience, the competitor set a business wishes it had rather than the one it actually serves. The fourth is over-researching to the point of paralysis, where the build never starts because the analysis is never finished. We aim for the middle: enough research to ground the decisions, delivered fast enough that the site actually gets built. Research is a tool, not a destination, and a good research phase ends with a site, not with a report that sits unread.", ar: "الخطأ الأول تخطّي البحث كلياً والبناء من قالب، ما يُنتج موقعاً يبدو جيداً ويتحوّل بضعف. الثاني إجراء البحث لكن تجاهل ما يقوله، لأن أحدهم في الفريق فضّل فكرة مختلفة. الثالث البحث عن الجمهور الخطأ، مجموعة المنافسين التي تتمنّى العمل امتلاكها بدلاً من التي يخدمها فعلاً. الرابع الإفراط في البحث لدرجة الشلل، حيث لا يبدأ البناء أبداً لأن التحليل لا ينتهي أبداً. نهدف للوسط: بحث كافٍ لتأسيس القرارات، يُسلَّم بسرعة كافية ليُبنى الموقع فعلاً. البحث أداة، لا وجهة، ومرحلة بحث جيدة تنتهي بموقع، لا بتقرير يجلس غير مقروء." },
      list: [
        { en: "Skipping research and trusting a template", ar: "تخطّي البحث والثقة بقالب" },
        { en: "Researching the audience you wish you had", ar: "البحث عن الجمهور الذي تتمنّى امتلاكه" },
        { en: "Over-researching until the build stalls", ar: "الإفراط في البحث حتى يتعثّر البناء" },
      ],
    },
    ],
    deliverables: {
      eyebrow: { en: "What you get", ar: "ما تحصل عليه" }, h2: { en: "The research deliverables", ar: "مخرجات البحث" },
      items: [
        { en: "Competitor and keyword landscape report for your Dubai market", ar: "تقرير مشهد المنافسين والكلمات المفتاحية لسوقك في دبي" },
        { en: "Buyer question and objection map", ar: "خريطة أسئلة واعتراضات المشتري" },
        { en: "Local and emirate-level search demand breakdown", ar: "تفصيل الطلب على البحث المحلي وعلى مستوى الإمارة" },
        { en: "Site structure recommendation grounded in the findings", ar: "توصية هيكل الموقع المستندة إلى النتائج" },
        { en: "A short brief that carries the research into the homepage concept", ar: "موجز قصير ينقل البحث إلى مفهوم الصفحة الرئيسية" },
      ],
    },
    approach: {
      eyebrow: { en: "How we approach it", ar: "كيف نتعامل معه" }, h2: { en: "Research first, design second, always.", ar: "البحث أولاً، والتصميم ثانياً، دائماً." },
      lead: { en: "We never design a homepage before the research is done. The research is what tells us what the homepage needs to say, in what order, and to whom.", ar: "لا نصمم صفحة رئيسية أبداً قبل إتمام البحث. البحث هو ما يخبرنا بما يجب أن تقوله الصفحة الرئيسية، وبأي ترتيب، ولمن." },
      body: { en: "When you approve a free homepage concept, this research is the first thing that happens. By the time you see three homepage directions, each one is already grounded in what your market actually looks like, not in a template. That is the difference between a site that looks good and a site that performs.", ar: "لا نصمم صفحة رئيسية أبداً قبل إتمام البحث. البحث هو ما يخبرنا بما يجب أن تقوله الصفحة الرئيسية، وبأي ترتيب، ولمن. عندما توافق على مفهوم مجاني للصفحة الرئيسية، يكون هذا البحث أول ما يحدث. بحلول وقت رؤيتك لثلاثة اتجاهات، يكون كل واحد منها مستنداً بالفعل إلى شكل سوقك الفعلي، لا إلى قالب. هذا هو الفرق بين موقع يبدو جيداً وموقع يؤدّي." },
    },
    outcomes: {
      eyebrow: { en: "Why it matters", ar: "لماذا يهمّ" }, h2: { en: "What good research changes", ar: "ما يغيّره البحث الجيد" },
      lead: { en: "Sites built on research answer the questions buyers ask, rank for the terms buyers type, and guide people toward contact instead of away from it.", ar: "المواقع المبنية على البحث تجيب عن أسئلة يطرحها المشترون، وتتصدّر لمصطلحات يكتبها المشترون، وتوجّه الناس نحو التواصل بدلاً من إبعادهم عنه." },
      items: [
        { label: { en: "Clearer messaging", ar: "رسائل أوضح" }, body: { en: "Your homepage says the right thing first because we know what the right thing is.", ar: "تقول صفحتك الرئيسية الشيء الصحيح أولاً لأننا نعرف ما هو الشيء الصحيح." } },
        { label: { en: "Better targeting", ar: "استهداف أفضل" }, body: { en: "Every page serves a real search and a real buyer stage, not a guess.", ar: "تخدم كل صفحة بحثاً حقيقياً ومرحلة مشتري حقيقية، لا تخميناً." } },
        { label: { en: "Stronger structure", ar: "هيكل أقوى" }, body: { en: "The site is organised around how Dubai buyers actually decide.", ar: "الموقع منظّم حول كيفية قرار مشتري دبي فعلياً." } },
      ],
    },
    faq: {
      eyebrow: { en: "Common questions", ar: "أسئلة شائعة" }, h2: { en: "Industry research questions", ar: "أسئلة أبحاث الصناعة" },
      items: [
        { q: { en: "Is the research included in the free homepage concept?", ar: "هل البحث مشمول في مفهوم الصفحة الرئيسية المجاني؟" }, a: { en: "Yes. When you approve a concept, the research is the first step before any design. You see the findings in how the homepage reads.", ar: "نعم. عندما توافق على مفهوم، يكون البحث الخطوة الأولى قبل أي تصميم. ترى النتائج في طريقة قراءة الصفحة الرئيسية." } },
        { q: { en: "Do I get the research as a document?", ar: "هل أحصل على البحث كمستند؟" }, a: { en: "You get a concise findings brief. It is written to guide the build, not to sit unread in a folder.", ar: "تحصل على موجز نتائج موجز. كُتب ليوجّه البناء، لا ليجلس غير مقروء في مجلد." } },
        { q: { en: "What if my industry is niche?", ar: "ماذا لو كانت صناعتي متخصصة؟" }, a: { en: "Niche industries benefit most. Generic research misses them, which is exactly why a focused site can win.", ar: "الصناعات المتخصصة تستفيد أكثر. البحث العام يفوتها، وهذا بالضبط سبب قدرة موقع مركّز على الفوز." } },
        { q: { en: "Do you research competitors outside the UAE?", ar: "هل تبحثون في منافسين خارج الإمارات؟" }, a: { en: "If global competitors matter to your buyers, we include them. Otherwise we focus on the UAE market you actually serve.", ar: "إن كان المنافسون العالميون يهمّون عملاءك، نضمّهم. وإلا نركّز على سوق الإمارات الذي تخدمه فعلاً." } },
        { q: { en: "How long does the research take?", ar: "كم يستغرق البحث؟" }, a: { en: "It runs as part of the concept phase, typically a few working days before the three homepage directions are ready.", ar: "يجري كجزء من مرحلة المفهوم، عادةً أيام عمل قليلة قبل جهوزية الاتجاهات الثلاثة للصفحة الرئيسية." } },
        { q: { en: "Can I use the research without buying the site?", ar: "هل يمكنني استخدام البحث دون شراء الموقع؟" }, a: { en: "The homepage concept, research included, is free. You walk away with it if you choose not to proceed.", ar: "مفهوم الصفحة الرئيسية، بما فيه البحث، مجاني. تنصرف به إن اخترت عدم المتابعة." } },
      ],
    },
    cta: { heading: { en: "Want a homepage grounded in real research? Start the concept.", ar: "تريد صفحة رئيسية مستندة إلى بحث حقيقي؟ ابدأ المفهوم." } },
  },
  {
    slug: "homepage-concept",
    meta: { title: { en: "Free Homepage Concept Design in Dubai | Big Story", ar: "تصميم مفهوم الصفحة الرئيسية المجاني في دبي | بيك ستوري" }, description: { en: "Approve a free homepage concept for your Dubai business. We design three directions in code, you review the live preview, and you buy only if you are happy.", ar: "وافق على مفهوم مجاني للصفحة الرئيسية لعملك في دبي. نصمم ثلاثة اتجاهات في الكود، تراجع المعاينة المباشرة، وتشتري فقط إذا كنت راضياً." } },
    breadcrumb: { en: "Homepage concept", ar: "مفهوم الصفحة الرئيسية" },
    hero: {
      eyebrow: { en: "Homepage concept design", ar: "تصميم مفهوم الصفحة الرئيسية" },
      h1: { en: "A free homepage concept for your Dubai business", ar: "مفهوم مجاني للصفحة الرئيسية لعملك في دبي" },
      lead: { en: "You should not have to pay to find out what your new homepage could look like. Give us written permission and we design three homepage directions directly in code. You review a live preview, pick the one you want, and only then decide whether to buy the full site. No upfront payment, no obligation.", ar: "لا ينبغي أن تدفع لتعرف كيف قد تبدو صفحتك الرئيسية الجديدة. امنحنا إذناً كتابياً ونصمم ثلاثة اتجاهات للصفحة الرئيسية مباشرة في الكود. تراجع معاينة مباشرة، تختار ما تريد، وعندها فقط تقرر ما إذا كنت ستشتري الموقع الكامل. دون دفع مسبق، ودون التزام." },
      promise: { en: "This is how we earn your trust. We do the work first, you see it live, and the decision is yours.", ar: "هكذا نكسب ثقتك. ننجز العمل أولاً، تراه مباشرة، والقرار لك." },
    },
    sections: [
    {
      id: "what-a-concept-is", n: "01",
      eyebrow: { en: "What a concept is", ar: "ما هو المفهوم" },
      h2: { en: "A concept is a real homepage, built in code, not a flat picture.", ar: "المفهوم هو صفحة رئيسية حقيقية، مبنية في الكود، لا صورة مسطحة." },
      lead: { en: "A concept is not a mockup in a design tool. It is a real, working homepage, built in the same technology your finished site will use, hosted on a live preview link you can open on your phone.", ar: "المفهوم ليس نموذجاً في أداة تصميم. إنه صفحة رئيسية حقيقية عاملة، مبنية بنفس التقنية التي سيستخدمها موقعك النهائي، مستضافة على رابط معاينة مباشر يمكنك فتحه على هاتفك." },
      body: { en: "We design three directions so you can compare them side by side. Each one takes a different position: one might lead with trust and proof, another with a bold offer, a third with a clean, quiet confidence. You see all three live, you click through them, and you tell us which feels right. From there, the full site is built around the direction you chose. Because the concept is already real code, nothing is lost between the preview and the finished product.", ar: "نصمم ثلاثة اتجاهات لتتمكن من مقارنتها جنباً إلى جنب. يتّخذ كل واحد موقفاً مختلفاً: قد يقود أحدها بالثقة والدليل، وآخر بعرض جريء، وثالث بثقة هادئة ونظيفة. ترى الثلاثة مباشرة، تتنقّل بينها، وتخبرنا أيها يشعر بالصواب. من هناك، يُبنى الموقع الكامل حول الاتجاه الذي اخترته. ولأن المفهوم كود حقيقي بالفعل، لا يُفقد شيء بين المعاينة والمنتج النهائي." },
      list: [
        { en: "Three distinct homepage directions, each a real working page", ar: "ثلاثة اتجاهات متميزة للصفحة الرئيسية، كل واحدة صفحة عاملة حقيقية" },
        { en: "Live preview link, viewable on desktop and mobile", ar: "رابط معاينة مباشر، قابل للعرض على سطح المكتب والجوال" },
        { en: "Built in the same stack as your finished site", ar: "مبني بنفس الحزمة التقنية لموقعك النهائي" },
      ],
    },
    {
      id: "why-three", n: "02",
      eyebrow: { en: "Why three", ar: "لماذا ثلاثة" },
      h2: { en: "Three directions force honest comparison, one option forces a yes-or-no.", ar: "ثلاثة اتجاهات تفرض مقارنة صادقة، وخيار واحد يفرض نعم أو لا." },
      lead: { en: "A single concept puts you in an awkward position: accept it or reject the whole engagement. Three concepts give you a real choice and give us real signal about what you value.", ar: "المفهوم الوحيد يضعك في موقف محرج: اقبله أو ارفض الارتباط كله. ثلاثة مفاهيم تمنحك خياراً حقيقياً وتمنحنا إشارة حقيقية عمّا تقدّره." },
      body: { en: "When you see three directions, your reaction tells us something useful. You might love the bold one but worry it is too aggressive for your audience. You might find the quiet one beautiful but doubt it will convert. That conversation is the point. It sharpens the brief for the full build. A single concept cannot do that, because there is nothing to compare it against. Three is the smallest number that creates a real conversation, and it is the largest that stays affordable for us to give away for free.", ar: "عندما ترى ثلاثة اتجاهات، تخبرنا ردود فعلك بشيء مفيد. قد تحب الجريء لكن تقلق أنه عدواني أكثر من اللازم لجمهورك. قد تجد الهادئ جميلاً لكن تشكّ في قدرته على التحويل. تلك المحادثة هي الغرض. تصقل الموجز للبناء الكامل. لا يمكن للمفهوم الوحيد فعل ذلك، لأنه لا يوجد ما يُقارن به. ثلاثة هو أصغر رقم يخلق محادثة حقيقية، وهو الأكبر الذي يبقى في متناولنا لتقديمه مجاناً." },
      list: [
        { en: "Compare tone, hierarchy, and offer positioning", ar: "قارن النبرة والتسلسل وتموضع العرض" },
        { en: "See what your instinct trusts and what it doubts", ar: "اعرف ما يثق به حدسك وما يشكّ فيه" },
        { en: "Sharpen the brief before the full build", ar: "اصقل الموجز قبل البناء الكامل" },
      ],
    },
    {
      id: "how-to-approve", n: "03",
      eyebrow: { en: "How to approve", ar: "كيف توافق" },
      h2: { en: "Approval is written permission. It is not a purchase.", ar: "الموافقة هي إذن كتابي. ليست شراءً." },
      lead: { en: "Approving a concept means giving us written permission to design. It commits you to nothing. There is no payment at this stage, and there is no obligation to proceed.", ar: "الموافقة على مفهوم تعني منحنا إذناً كتابياً للتصميم. لا تلتزم بشيء. لا يوجد دفع في هذه المرحلة، ولا التزام بالمتابعة." },
      body: { en: "You approve over WhatsApp or email, in writing. We start the research, we design the three directions, and we send you a live preview link, usually within a few working days. You review it on your own time. If you want to proceed, we scope the full site and agree a price. If you do not, you walk away with no cost and no hard feelings. We built this model because trust in web design is low in Dubai, and the only honest way to fix that is to do the work first and let the work speak.", ar: "توافق عبر واتساب أو البريد الإلكتروني، كتابياً. نبدأ البحث، ونصمم الاتجاهات الثلاثة، ونرسل لك رابط معاينة مباشر، عادةً خلال أيام عمل قليلة. تراجعه في وقتك. إن أردت المتابعة، نحدّد نطاق الموقع الكامل ونتفق على السعر. إن لم تفعل، تنصرف دون تكلفة ودون ضغينة. بنينا هذا النموذج لأن الثقة في تصميم المواقع منخفضة في دبي، والطريقة الوحيدة الصادقة لإصلاح ذلك هي إنجاز العمل أولاً وترك العمل يتحدّث." },
      list: [
        { en: "Written approval via WhatsApp or email", ar: "موافقة كتابية عبر واتساب أو البريد الإلكتروني" },
        { en: "No payment and no obligation at concept stage", ar: "لا دفع ولا التزام في مرحلة المفهوم" },
        { en: "Live preview delivered in a few working days", ar: "معاينة مباشرة تُسلَّم خلال أيام عمل قليلة" },
      ],
    },
    {
      id: "after-approval", n: "04",
      eyebrow: { en: "After you choose", ar: "بعد أن تختار" },
      h2: { en: "Once you pick a direction, the full site follows naturally.", ar: "بمجرد أن تختار اتجاهاً، يتبع الموقع الكامل بشكل طبيعي." },
      lead: { en: "The concept you choose becomes the design system for the rest of the site. Colours, type, spacing, and tone are set. Every other page inherits them, so the finished site feels like one thing, not a collection.", ar: "يصبح المفهوم الذي تختاره نظام التصميم لبقية الموقع. تُضبط الألوان والخطوط والمسافات والنبرة. ترثها كل صفحة أخرى، بحيث يبدو الموقع النهائي شيئاً واحداً، لا مجموعة." },
      body: { en: "From your chosen direction we develop the remaining pages, write the copy, wire in the forms and tracking, run quality checks, and deploy to your domain. You stay involved at every step with feedback rounds, so nothing is a surprise at launch. The concept was never a throwaway. It was the first real page of your real website.", ar: "من اتجاهك المختار نطوّر الصفحات المتبقية، ونكتب النصوص، ونوصّل النماذج والتتبّع، وندير فحوصات الجودة، وننشر على نطاقك. تبقى متورّطاً في كل خطوة مع جولات ملاحظات، فلا يكون شيء مفاجأة عند الإطلاق. لم يكن المفهوم يوماً شيئاً يُرمى. كان أول صفحة حقيقية من موقعك الحقيقي." },
      list: [
        { en: "Chosen direction sets the design system", ar: "الاتجاه المختار يضبط نظام التصميم" },
        { en: "Remaining pages built with your feedback", ar: "الصفحات المتبقية تُبنى بملاحظاتك" },
        { en: "QA and launch on your domain", ar: "ضمان الجودة والإطلاق على نطاقك" },
      ],
    },
    {
      id: "why-we-work-this-way", n: "05",
      eyebrow: { en: "Why we work this way", ar: "لماذا نعمل هكذا" },
      h2: { en: "We give the concept away because trust in Dubai web design has to be earned, not demanded.", ar: "نُعطي المفهوم مجاناً لأن الثقة في تصميم مواقع دبي يجب أن تُكسَب، لا أن تُطلَب." },
      lead: { en: "The free concept is not a sales trick. It is the only honest answer to a market where promises are cheap and results are not.", ar: "المفهوم المجاني ليس خدعة بيع. إنه الإجابة الصادقة الوحيدة لسوق تكون فيه الوعود رخيصة والنتائج ليست كذلك." },
      body: { en: "Dubai businesses get pitched websites constantly, usually with slides and promises and a request for payment before any real work appears. We rejected that model because it puts all the risk on you and none on us. So we flipped it. We do the work first. We show you a real, live homepage, built in real code, before we ever talk about money. If it is good, you will want the rest of the site, and the conversation about price becomes easy because the value is already visible. If it is not good enough, we would rather know now than after you have paid. This is slower for us and safer for you, and we have decided that is the right trade. The concept is free because your trust is not something we are entitled to charge for.", ar: "تُعرَض مواقع دبي على شركات دبي باستمرار، عادةً بشرائح ووعود وطلب دفع قبل ظهور أي عمل حقيقي. رفضنا هذا النموذج لأنه يضع كل المخاطرة عليك ولا شيء علينا. فقلبناه. ننجز العمل أولاً. نُريك صفحة رئيسية حقيقية مباشرة، مبنية في كود حقيقي، قبل أن نتحدث عن المال أبداً. إن كانت جيدة، سترد بقية الموقع، وتصبح المحادثة عن السعر سهلة لأن القيمة مرئية بالفعل. إن لم تكن جيدة بما يكفي، نُفضّل أن نعرف الآن بدلاً من بعد أن تدفع. هذا أبطأ لنا وأكثر أماناً لك، وقد قررنا أنها المقايضة الصحيحة. المفهوم مجاني لأن ثقتك ليست شيئاً يحقّ لنا أن نأخذ عليه أجراً." },
      list: [
        { en: "Risk moved from you to us", ar: "المخاطرة انتقلت منك إلينا" },
        { en: "Work first, money second", ar: "العمل أولاً، المال ثانياً" },
        { en: "Trust earned, not charged for", ar: "ثقة مكسوبة، لا مأخوذ عليها أجر" },
      ],
    },
    {
      id: "what-it-reveals", n: "06",
      eyebrow: { en: "What the concept reveals", ar: "ما يكشفه المفهوم" },
      h2: { en: "Three directions do not just show options. They reveal what you actually value.", ar: "الاتجاهات الثلاثة لا تُظهر خيارات فحسب. إنها تكشف ما تقدّره فعلاً." },
      lead: { en: "The direction you choose tells us something about your brand that a brief alone could not. That insight shapes the whole build.", ar: "الاتجاه الذي تختاره يخبرنا بشيء عن علامتك لم يستطع موجز وحده. تلك الرؤية تشكّل البناء كله." },
      body: { en: "When you see three homepage directions, your reaction is data. You might lean toward the bold one because you want to stand out, or toward the calm one because trust is everything in your industry. You might reject a direction for a reason you can finally articulate, which is itself useful, because it tells us what to avoid across the whole site. The concept phase is not just about picking a look. It is a structured conversation that surfaces what your brand really stands for, in your own words, prompted by real options rather than abstract questions. By the time you choose, we understand your business more clearly than any questionnaire could have told us, and the full site is built from that clearer understanding.", ar: "عندما ترى اتجاهات الصفحة الرئيسية الثلاثة، رد فعلك بيانات. قد تميل للجريء لأنك تريد البروز، أو للهادئ لأن الثقة كل شيء في صناعتك. قد ترفض اتجاهاً لسبب تستطيع أخيراً التعبير عنه، وهو مفيد بحد ذاته، لأنه يخبرنا بما نتجنّبه عبر الموقع كله. مرحلة المفهوم ليست فقط عن اختيار مظهر. إنها محادثة مهيكلة تُظهر ما تقف له علامتك فعلاً، بكلماتك الخاصة، مدفوعة بخيارات حقيقية بدلاً من أسئلة مجردة. بحلول وقت اختيارك، نفهم عملك بوضوح أكثر مما كان أي استبيان سيخبرنا، ويُبنى الموقع الكامل من ذلك الفهم الأوضح." },
      list: [
        { en: "Your choice reveals what you value", ar: "اختيارك يكشف ما تقدّره" },
        { en: "Rejections tell us what to avoid", ar: "الرفض يخبرنا بما نتجنّبه" },
        { en: "A clearer brief than any questionnaire", ar: "موجز أوضح من أي استبيان" },
      ],
    },
    {
      id: "common-mistakes", n: "07",
      eyebrow: { en: "Common mistakes", ar: "أخطاء شائعة" },
      h2: { en: "Why most homepage concepts fail, and how ours avoids it.", ar: "لماذا تفشل معظم مفاهيم الصفحة الرئيسية، وكيف يتجنّبها مفهومنا." },
      lead: { en: "A concept can go wrong in a few predictable ways. We have built our process to avoid each one.", ar: "يمكن أن يسوء المفهوم بطرق قليلة يمكن التنبؤ بها. بنينا عمليتنا لتجنّب كل واحدة." },
      body: { en: "The first failure is a concept that is really just a picture, a flat mockup that looks nothing like the real site once it is built. We avoid this by designing in real code. The second is a concept built on guesswork about your business, so it looks right but says the wrong things. We avoid this with research first. The third is a single concept that forces a yes-or-no decision, which is stressful and uninformative. We avoid this with three directions. The fourth is a concept that looks impressive but is built on a slow, bloated foundation that will hurt the site for years. We avoid this by building on a fast modern stack from the first line. Each of these failures is common in the market, and each is avoidable, which is why our concept process is shaped the way it is.", ar: "الفشل الأول مفهوم هو حقاً مجرد صورة، نموذج مسطوح لا يشبه الموقع الحقيقي بمجرد بنائه. نتجنّب هذا بالتصميم في كود حقيقي. الثاني مفهوم مبني على تخمين عن عملك، فيبدو صحيحاً لكنه يقول أشياء خاطئة. نتجنّب هذا بالبحث أولاً. الثالث مفهوم واحد يجبر قرار نعم أو لا، وهو مرهق وغير مفيد. نتجنّب هذا بثلاثة اتجاهات. الرابع مفهوم يبدو مبهِراً لكنه مبني على أساس بطيء منتفخ سيؤذي الموقع لسنوات. نتجنّب هذا بالبناء على حزمة حديثة سريعة من أول سطر. كل واحد من هذه الإخفاقات شائع في السوق، وكل قابل للتجنّب، لهذا شُكِّلت عملية مفهومنا كما هي." },
      list: [
        { en: "Flat mockups instead of real code", ar: "نماذج مسطحة بدلاً من كود حقيقي" },
        { en: "Guesswork instead of research", ar: "تخمين بدلاً من بحث" },
        { en: "Slow foundations under a pretty surface", ar: "أساسات بطيئة تحت سطح جميل" },
      ],
    },
    ],
    deliverables: {
      eyebrow: { en: "What you get", ar: "ما تحصل عليه" }, h2: { en: "The concept deliverables", ar: "مخرجات المفهوم" },
      items: [
        { en: "Three homepage directions, each built in real code", ar: "ثلاثة اتجاهات للصفحة الرئيسية، كل واحد مبني في كود حقيقي" },
        { en: "A live preview link you can open on any device", ar: "رابط معاينة مباشر يمكنك فتحه على أي جهاز" },
        { en: "Mobile and desktop views for every direction", ar: "عرض الجوال وسطح المكتب لكل اتجاه" },
        { en: "A short note explaining the thinking behind each", ar: "ملاحظة قصيرة تشرح التفكير وراء كل واحد" },
        { en: "Zero cost and zero obligation", ar: "تكلفة صفر والتزام صفر" },
      ],
    },
    approach: {
      eyebrow: { en: "How we approach it", ar: "كيف نتعامل معه" }, h2: { en: "We design in code because code is honest.", ar: "نصمم في الكود لأن الكود صادق." },
      lead: { en: "Designing in code means what you see is what you get. There is no translation loss between a mockup and the build.", ar: "التصميم في الكود يعني أن ما تراه هو ما تحصل عليه. لا يوجد فقدان ترجمة بين النموذج والبناء." },
      body: { en: "Many agencies design in a graphics tool and then hand the picture to a developer, who rebuilds it in code. Things shift in that handover. Spacing changes, fonts behave differently, mobile breaks. We skip that step. We design directly in the real technology, so the concept you approve is the concept that ships. Nothing is lost, nothing is approximated, and there are no surprises at delivery.", ar: "تصمّم وكالات كثيرة في أداة رسوم ثم تسلّم الصورة لمطوّر يعيد بناءها في الكود. تتحرك الأشياء في تلك الحلقة الوسيطة. تتغيّر المسافات، وتتصرف الخطوط بشكل مختلف، وينكسر الجوال. نتجنّب تلك الخطوة. نصمّم مباشرة في التقنية الحقيقية، فالمفهوم الذي توافق عليه هو المفهوم الذي يُنشر. لا يُفقد شيء، ولا يُقرَّب أي شيء، ولا توجد مفاجآت عند التسليم." },
    },
    outcomes: {
      eyebrow: { en: "Why it matters", ar: "لماذا يهمّ" }, h2: { en: "What a real concept changes", ar: "ما يغيّره المفهوم الحقيقي" },
      lead: { en: "A live concept removes the biggest risk in web design, which is paying for something you have not seen.", ar: "يزيل المفهوم المباشر أكبر مخاطرة في تصميم المواقع، وهي الدفع مقابل شيء لم تره." },
      items: [
        { label: { en: "Lower risk", ar: "مخاطرة أقل" }, body: { en: "You decide with the work in front of you, not a promise.", ar: "تقرّر والعمل أمامك، لا وعداً." } },
        { label: { en: "Faster start", ar: "بداية أسرع" }, body: { en: "The concept is already real code, so the build starts ahead.", ar: "المفهوم كود حقيقي بالفعل، فيبدأ البناء متقدماً." } },
        { label: { en: "Real comparison", ar: "مقارنة حقيقية" }, body: { en: "Three live options beat one flat mockup every time.", ar: "ثلاثة خيارات مباشرة تتفوّق على نموذج مسطوح واحد دائماً." } },
      ],
    },
    faq: {
      eyebrow: { en: "Common questions", ar: "أسئلة شائعة" }, h2: { en: "Homepage concept questions", ar: "أسئلة مفهوم الصفحة الرئيسية" },
      items: [
        { q: { en: "Is the concept really free?", ar: "هل المفهوم مجاني فعلاً؟" }, a: { en: "Yes. There is no payment at concept stage. You pay only for the full site if you choose to proceed.", ar: "نعم. لا يوجد دفع في مرحلة المفهوم. تدفع فقط مقابل الموقع الكامل إن اخترت المتابعة." } },
        { q: { en: "What does approval mean?", ar: "ماذا تعني الموافقة؟" }, a: { en: "Written permission to design. It is not a purchase commitment and binds you to nothing.", ar: "إذن كتابي للتصميم. ليس التزاماً بالشراء ولا يلزمك بشيء." } },
        { q: { en: "What if I do not like any direction?", ar: "ماذا لو لم يعجبني أي اتجاه؟" }, a: { en: "You walk away at no cost. We would rather lose the job than pressure you.", ar: "تنصرف دون تكلفة. نفضّل خسارة الوظيفة على الضغط عليك." } },
        { q: { en: "How many revisions do I get on the concept?", ar: "كم عدد التعديلات التي أحصل عليها في المفهوم؟" }, a: { en: "The concept is three directions to choose from. Once you pick one, refinements happen during the full build.", ar: "المفهوم هو ثلاثة اتجاهات للاختيار منها. بمجرد اختيارك واحد، تحدث التحسينات خلال البناء الكامل." } },
        { q: { en: "Can I keep the concept if I do not buy?", ar: "هل أستطيع الاحتفاظ بالمفهوم إن لم أشترِ؟" }, a: { en: "The concept is yours. Most clients who love it proceed; those who do not keep what was shared.", ar: "المفهوم ملكك. معظم العملاء الذين يحبّونه يتابعون؛ الذين لا يفعلون يحتفظون بما شُرك معهم." } },
        { q: { en: "How long until I see the live preview?", ar: "كم من الوقت حتى أرى المعاينة المباشرة؟" }, a: { en: "Usually a few working days after approval, depending on the research depth your industry needs.", ar: "عادةً أيام عمل قليلة بعد الموافقة، حسب عمق البحث الذي تحتاجه صناعتك." } },
      ],
    },
    cta: { heading: { en: "Ready to see your homepage? Approve a free concept.", ar: "مستعد لرؤية صفحتك الرئيسية؟ وافق على مفهوم مجاني." } },
  },
  {
    slug: "website-development",
    meta: { title: { en: "Website Development in Dubai | Next.js Developers | Big Story", ar: "تطوير المواقع في دبي | مطوّرو Next.js | بيك ستوري" }, description: { en: "Full custom website development for Dubai businesses. Next.js, React, and Tailwind, built fast, built mobile-first, deployed on Vercel to your domain.", ar: "تطوير مواقع مخصّصة كاملة لشركات دبي. Next.js وReact وTailwind، مبنية بسرعة، للجوال أولاً، منشورة على Vercel على نطاقك." } },
    breadcrumb: { en: "Website development", ar: "تطوير المواقع" },
    hero: {
      eyebrow: { en: "Full website development", ar: "تطوير المواقع الكامل" },
      h1: { en: "Custom website development for Dubai businesses", ar: "تطوير مواقع مخصّص لشركات دبي" },
      lead: { en: "We build fast, modern websites in Next.js and React, styled with Tailwind, deployed on Vercel. Every site is custom, mobile-first, bilingual-ready, and built to load quickly on the phones your customers actually use across Dubai and the UAE. We do not ship templates with your logo dropped in, and we do not hand the site to someone who will disappear. You own the code, you control the domain, and the site is built to stay fast, secure, and editable for years.", ar: "نبني مواقع سريعة وحديثة بـNext.js وReact، مصمّمة بـTailwind، منشورة على Vercel. كل موقع مخصّص، للجوال أولاً، جاهز للثنائية اللغوية، ومبني ليُحمَّل بسرعة على الهواتف التي يستخدمها عملاؤك فعلاً عبر دبي والإمارات. لا نُسلّم قوالب بإسقاط شعارك فيها، ولا نسلم الموقع لشخص سيختفي. أنت تملك الكود، وتتحكم بالنطاق، والموقع مبني ليبقى سريعاً وآمناً وقابلاً للتحديث لسنوات." },
      promise: { en: "We do not use heavy templates or page builders that slow a site down. We write the code, and we write it to perform.", ar: "لا نستخدم قوالب ثقيلة أو منشئي صفحات يبطّئون الموقع. نكتب الكود، ونكتبه ليؤدّي." },
    },
    sections: [
    {
      id: "the-stack", n: "01",
      eyebrow: { en: "The technology", ar: "التقنية" },
      h2: { en: "A modern stack chosen for speed, not for fashion.", ar: "حزمة تقنية حديثة اختيرت للسرعة، لا للموضة." },
      lead: { en: "We build in Next.js because it ships fast pages, in React because it is reliable and widely supported, and in Tailwind because it keeps the design system tight. The stack is not exotic. It is the same stack that powers some of the most visited sites on the web.", ar: "نبني بـNext.js لأنه يسلّم صفحات سريعة، وبـReact لأنه موثوق ومدعوم على نطاق واسع، وبـTailwind لأنه يبقي نظام التصميم متماسكاً. الحزمة ليست غريبة. إنها الحزمة ذاتها التي تشغّل بعض أكثر المواقع زيارة على الويب." },
      body: { en: "Speed matters in Dubai. Mobile data is good, but attention is short, and a slow site loses the visitor before the first image loads. Our stack renders pages on the server and ships minimal JavaScript, so the first paint is fast even on an older phone on a weaker signal. The technology choices are boring on purpose, because boring technology is reliable technology, and reliable technology is what keeps your site online and quick for years.", ar: "السرعة مهمّة في دبي. بيانات الجوال جيّدة، لكن الانتباه قصير، والموقع البطيء يفقد الزائر قبل تحميل أول صورة. حزمتنا تعرض الصفحات على الخادم وتسلّم أقل قدر من JavaScript، فالرسم الأول سريع حتى على هاتف أقدم بإشارة أضعف. اختيارات التقنية مملّة عن قصد، لأن التقنية المملّة تقنية موثوقة، والتقنية الموثوقة هي ما يبقي موقعك متاحاً وسريعاً لسنوات." },
      list: [
        { en: "Next.js for server rendering and fast first paint", ar: "Next.js لعرض الخادم ورسم أول سريع" },
        { en: "React for a reliable, well-supported component model", ar: "React لنموذج مكوّنات موثوق ومدعوم جيداً" },
        { en: "Tailwind for a tight, consistent design system", ar: "Tailwind لنظام تصميم متماسك ومتّسق" },
      ],
    },
    {
      id: "custom-not-template", n: "02",
      eyebrow: { en: "Custom, not templated", ar: "مخصّص، لا قالب" },
      h2: { en: "Your site is written for you. It is not a theme with your logo dropped in.", ar: "موقعك مكتوب لك. ليس قالباً يُسقط فيه شعارك." },
      lead: { en: "Templated sites all look slightly the same, and they carry the baggage of every feature the template author imagined. A custom site carries only what you need, which makes it faster and clearer.", ar: "المواقع القالبية تبدو كلها متشابهة قليلاً، وتحمل عبء كل ميزة تخيّلها كاتب القالب. الموقع المخصّص يحمل فقط ما تحتاجه، ما يجعله أسرع وأوضح." },
      body: { en: "When we build your site, every page is structured around your services and your buyers. There is no unused carousel, no demo section to delete, no plugin conflict waiting to happen. The code is yours, the design is yours, and when you want to add something later, we add exactly that, not a workaround. This is the difference between owning a website and renting one. Owned sites age better, because they were built with only you in mind.", ar: "عندما نبني موقعك، تُهيكَل كل صفحة حول خدماتك وعملائك. لا توجدcarousel غير مستخدمة، ولا قسم تجريبي يُحذف، ولا تعارض إضافات ينتظر الحدوث. الكود ملكك، والتصميم ملكك، وعندما تريد إضافة شيء لاحقاً، نضيف بالضبط ذلك، لا حلاً بديلاً. هذا الفرق بين امتلاك موقع واستئجار واحد. المواقع المملوكة تشيخ بشكل أفضل، لأنها بُنيت وأنت في الذهن فقط." },
      list: [
        { en: "Pages structured around your services and buyers", ar: "صفحات مهيكلة حول خدماتك وعملائك" },
        { en: "No demo content or unused sections to strip out", ar: "لا محتوى تجريبي أو أقسام غير مستخدمة لإزالتها" },
        { en: "Code you own, ready to extend later", ar: "كود تملكه، جاهز للتوسيع لاحقاً" },
      ],
    },
    {
      id: "bilingual-and-mobile", n: "03",
      eyebrow: { en: "Bilingual and mobile", ar: "ثنائي اللغة والجوال" },
      h2: { en: "Arabic and English, built in from the first line of code.", ar: "العربية والإنجليزية، مدمجة من أول سطر كود." },
      lead: { en: "Dubai serves two languages. Your site should serve both properly, with real Arabic right-to-left layout, not a machine translation bolted on at the end.", ar: "دبي تخدم لغتين. يجب أن يخدم موقعك كلتيهما بشكل صحيح، بتنسيق عربي حقيقي من اليمين إلى اليسار، لا ترجمة آلية تُضاف في النهاية." },
      body: { en: "Every site we build is structured for bilingual delivery from the start. Arabic gets a proper right-to-left layout, mirrored navigation, and Arabic-first typography that does not look like an afterthought. Mobile is not a smaller version of the desktop site, it is the primary experience, because most of your Dubai visitors will arrive on a phone. We design and test on real devices at the small sizes that matter, not just on a wide monitor.", ar: "كل موقع نبنيه مهيّأ للتسليم ثنائي اللغة من البداية. تحصل العربية على تنسيق حقيقي من اليمين إلى اليسار، وتنقّل معكوس، وطباعة عربية أولاً لا تبدو فكرة لاحقة. الجوال ليس نسخة أصغر من موقع سطح المكتب، إنه التجربة الأساسية، لأن معظم زوّار دبي سيصلون على هاتف. نصمّم ونختبر على أجهزة حقيقية بالأحجام الصغيرة المهمة، لا فقط على شاشة عريضة." },
      list: [
        { en: "Native Arabic right-to-left layout", ar: "تنسيق عربي أصلي من اليمين إلى اليسار" },
        { en: "Mobile-first design, tested on real devices", ar: "تصميم للجوال أولاً، مُختبَر على أجهزة حقيقية" },
        { en: "Proper hreflang and locale routing for search", ar: "hreflang وتوجيه لغة مناسب للبحث" },
      ],
    },
    {
      id: "deployment", n: "04",
      eyebrow: { en: "Hosting and deployment", ar: "الاستضافة والنشر" },
      h2: { en: "Deployed on Vercel, on your domain, with uptime that just works.", ar: "منشور على Vercel، على نطاقك، بوقت تشغيل يعمل فحسب." },
      lead: { en: "We deploy on Vercel because it is fast, reliable, and built by the same team that builds Next.js. Your site lives on your own domain, under your control.", ar: "ننشر على Vercel لأنه سريع وموثوق ومبني من الفريق نفسه الذي يبني Next.js. يعيش موقعك على نطاقك الخاص، تحت سيطرتك." },
      body: { en: "When we launch, your site goes live on a global content delivery network that puts it close to visitors in Dubai, Abu Dhabi, and everywhere else. We point your domain, set up your SSL certificate, and configure the redirects and sitemap so search engines find the new site cleanly. After launch, the hosting is stable enough that you will rarely think about it, which is exactly the goal.", ar: "عند الإطلاق، ينطلق موقعك على شبكة توصيل محتوى عالمية تضعه قرب الزوّار في دبي وأبو ظبي وكل مكان آخر. نوجّه نطاقك، ونضبط شهادة SSL الخاصة بك، ونتهيّئ عمليات إعادة التوجيه وsitemap بحيث تجد محركات البحث الموقع الجديد بنظافة. بعد الإطلاق، الاستضافة مستقرة بما يكفي بحيث نادراً ما تفكّر فيها، وهذا بالضبط الهدف." },
      list: [
        { en: "Global CDN with edge nodes close to the UAE", ar: "CDN عالمي بعُقد طرفية قرب الإمارات" },
        { en: "Your domain, your SSL, your control", ar: "نطاقك، SSL الخاص بك، سيطرتك" },
        { en: "Clean redirects and sitemap for search engines", ar: "إعادة توجيه نظيفة وsitemap لمحركات البحث" },
      ],
    },
    {
      id: "what-makes-it-last", n: "05",
      eyebrow: { en: "What makes a site last", ar: "ما يجعل الموقع يدوم" },
      h2: { en: "A site built well ages slowly. A site built cheaply ages fast.", ar: "الموقع المبني جيداً يشيخ ببطء. الموقع المبني برخيص يشيخ بسرعة." },
      lead: { en: "The cheapest website is often the most expensive, because you rebuild it sooner. We build to last, which costs less over time.", ar: "أرخص موقع غالباً هو الأغلى، لأنك تعيد بناءه أبكر. نبني ليدوم، ما يكلّف أقل مع الوقت." },
      body: { en: "A website has a working life. A well-built site on a modern stack stays fast, secure, and easy to update for years, because the foundations are solid and the technology is maintained. A cheap site, built on a creaky template or an abandoned framework, starts to decay almost immediately. Plugins break. Security holes open. Speed drops. Within a year or two, the cheap site needs a rebuild, and the rebuild costs more than building well once would have. We build sites that last because we would rather you spend your budget once and then spend small amounts on improvements, rather than spending large amounts over and over on replacements. The maths is simple, even if it is not always the maths people want to hear at the start.", ar: "للموقع عمر عملي. الموقع المبني جيداً على حزمة حديثة يبقى سريعاً وآمناً وسهل التحديث لسنوات، لأن الأساسات متينة والتقنية مصانة. الموقع الرخيص، المبني على قالب مُترنّح أو إطار مهجور، يبدأ بالتدهوّر فوراً تقريباً. الإضافات تنكسر. ثغرات الأمان تنفتح. السرعة تنخفض. خلال سنة أو سنتين، يحتاج الموقع الرخيص إعادة بناء، وإعادة البناء تكلّف أكثر مما كان بناؤه جيداً مرة واحدة سيكلّف. نبني مواقع تدوم لأننا نُفضّل أن تنفق ميزانيتك مرة ثم تبلغ مبالغ صغيرة على التحسينات، بدلاً من إنفاق مبالغ كبيرة مراراً على البدائل. الحساب بسيط، حتى لو لم يكن دائماً الحساب الذي يريد الناس سماعه في البداية." },
      list: [
        { en: "Modern stack stays maintained for years", ar: "حزمة حديثة تبقى مصانة لسنوات" },
        { en: "Cheap sites decay and need rebuilding", ar: "المواقع الرخيصة تتدهور وتحتاج إعادة بناء" },
        { en: "Build once, improve incrementally", ar: "ابنِ مرة، وحسّن تدريجياً" },
      ],
    },
    {
      id: "accessibility", n: "06",
      eyebrow: { en: "Accessibility and quality", ar: "إمكانية الوصول والجودة" },
      h2: { en: "A site that excludes visitors is a site that excludes customers.", ar: "الموقع الذي يستثني الزوّار موقع يستثني العملاء." },
      lead: { en: "Accessibility is not a box to tick. It is part of building well, and it widens the audience your site can serve.", ar: "إمكانية الوصول ليست خانة تُؤشَّر. إنها جزء من البناء الجيد، وتوسّع الجمهور الذي يستطيع موقعك خدمته." },
      body: { en: "We build to accessibility standards because it is right and because it is good business. Alt text on images, semantic HTML, sufficient colour contrast, keyboard navigation, and readable type are not optional extras. They are how a site serves every visitor, including the ones using screen readers, the ones on small screens in bright sun, and the ones who simply prefer larger text. A site that ignores accessibility quietly turns away a slice of its audience, and in a diverse market like Dubai, that slice is larger than people assume. Accessibility also overlaps heavily with SEO and with mobile usability, because the practices that make a site usable for everyone are often the same practices that make it rank and load well. Building accessibly is building well, full stop.", ar: "نبني وفق معايير إمكانية الوصول لأنه صحيح ولأنه عمل جيد. النص البديل على الصور، HTML الدلالي، تباين الألوان الكافي، تنقّل لوحة المفاتيح، والنوع المقروء ليست إضافيات اختيارية. إنها كيف يخدم الموقع كل زائر، بما فيهم من يستخدم قارئات الشاشة، ومن على شاشات صغيرة في شمس ساطعة، ومن يفضّل ببساطة نصاً أكبر. الموقع الذي يتجاهل إمكانية الوصول يستبعد بهدوء شريحة من جمهوره، وفي سوق متنوّع كدبي، تلك الشريحة أكبر مما يفترض الناس. إمكانية الوصول تتداخل بكثافة أيضاً مع السيو وقابلية استخدام الجوال، لأن الممارسات التي تجعل الموقع قابلاً للاستخدام للجميع غالباً الممارسات نفسها التي تجعله يتصدّر ويُحمَّل جيداً. البناء بإمكانية وصول هو البناء الجيد، نقطة." },
      list: [
        { en: "Alt text, semantic HTML, strong contrast", ar: "نص بديل، HTML دلالي، تباين قوي" },
        { en: "Serves screen readers and small screens", ar: "يخدم قارئات الشاشة والشاشات الصغيرة" },
        { en: "Overlaps with SEO and mobile usability", ar: "يتداخل مع السيو وقابلية استخدام الجوال" },
      ],
    },
    {
      id: "common-mistakes", n: "07",
      eyebrow: { en: "Common mistakes", ar: "أخطاء شائعة" },
      h2: { en: "The development choices that cost Dubai businesses for years.", ar: "الاختيارات التطويرية التي تكلّف شركات دبي لسنوات." },
      lead: { en: "A few early technical decisions echo for the whole life of a site. Here are the ones that go wrong most often.", ar: "بعض القرارات التقنية المبكرة تتردّد طوال حياة الموقع. هنا التي تسوء أكثر غالباً." },
      body: { en: "The first costly choice is building on an outdated or abandoned platform, which leaves the site unsupported and insecure within a couple of years. The second is handing the build to someone who disappears, leaving behind code nobody else can maintain. The third is over-relying on heavy plugins and page builders that look easy at first but slow the site and break under updates. The fourth is ignoring mobile and accessibility during the build, then trying to patch them on later, which never works as well as building them in. We make the opposite choices at each step: a maintained modern stack, code that is clean and documented, lean dependencies, and mobile and accessibility built in from the start. These choices cost a little more up front and save a great deal over the years that follow.", ar: "الاختيار المكلف الأول البناء على منصة قديمة أو مهجورة، ما يترك الموقع غير مدعوم وغير آمن خلال سنتين. الثاني تسليم البناء لشخص يختفي، تاركاً كوداً لا يستطيع غيره صيانته. الثالث الإفراط في الاعتماد على إضافات ثقيلة ومنشئي صفحات يبدون سهلين أولاً لكنهم يبطّئون الموقع وينكسرون تحت التحديثات. الرابع تجاهل الجوال وإمكانية الوصول أثناء البناء، ثم محاولة ترقيعهم لاحقاً، ما لا يعمل أبداً كما ينبغي. نتخذ الخيارات المعاكسة في كل خطوة: حزمة حديثة مصانة، كود نظيف وموثّق، تبعيات رشيقة، وجوّال وإمكانية وصول مدمجان من البداية. هذه الخيارات تكلّف أكثر قليلاً مقدماً وتوفّر الكثير عبر السنوات التالية." },
      list: [
        { en: "Outdated or abandoned platforms", ar: "منصات قديمة أو مهجورة" },
        { en: "Heavy builders that slow and break", ar: "منشئون أثقال يبطّئون وينكسرون" },
        { en: "Mobile and accessibility patched on late", ar: "جوّال وإمكانية وصول يُرقَّعان متأخراً" },
      ],
    },
    ],
    deliverables: {
      eyebrow: { en: "What you get", ar: "ما تحصل عليه" }, h2: { en: "The development deliverables", ar: "مخرجات التطوير" },
      items: [
        { en: "A custom Next.js website built around your services", ar: "موقع Next.js مخصّص مبني حول خدماتك" },
        { en: "Bilingual English and Arabic with proper RTL", ar: "ثنائي اللغة الإنجليزية والعربية بـRTL صحيح" },
        { en: "Mobile-first responsive design tested on real devices", ar: "تصميم متجاوب للجوال أولاً مُختبَر على أجهزة حقيقية" },
        { en: "Deployed on Vercel, live on your domain", ar: "منشور على Vercel، مباشر على نطاقك" },
        { en: "On-page SEO, sitemap, robots, and schema markup", ar: "سيو على الصفحة، sitemap، robots، وترميز schema" },
        { en: "Contact forms and WhatsApp integration", ar: "نماذج اتصال وتكامل واتساب" },
      ],
    },
    approach: {
      eyebrow: { en: "How we approach it", ar: "كيف نتعامل معه" }, h2: { en: "We build to perform, then we prove it.", ar: "نبني لنؤدّي، ثم نُثبت ذلك." },
      lead: { en: "Performance is a requirement, not a nice-to-have. We check it before launch and report it after.", ar: "الأداء متطلّب، لا شيء لطيف. نتحقق منه قبل الإطلاق ونبلغ عنه بعده." },
      body: { en: "Before any site goes live, we measure it against the Core Web Vitals thresholds that Google uses as ranking signals. We test on mobile, where most of your traffic is. We fix what is slow. After launch, we can hand you a performance report so you can see the numbers yourself. A site that loads quickly is not just better for visitors, it ranks better and converts better, and we treat that as part of the build, not an extra.", ar: "قبل أن ينطلق أي موقع، نقيسه مقابل عتبات مؤشرات الويب الأساسية التي تستخدمها جوجل كإشارات ترتيب. نختبر على الجوال، حيث معظم حركتك. نُصلح ما هو بطيء. بعد الإطلاق، يمكننا تسليمك تقرير أداء لترى الأرقام بنفسك. الموقع الذي يُحمَّل بسرعة ليس فقط أفضل للزوّار، بل يتصدّر أفضل ويتحوّل أفضل، ونحن نعامل ذلك كجزء من البناء، لا إضافة." },
    },
    outcomes: {
      eyebrow: { en: "Why it matters", ar: "لماذا يهمّ" }, h2: { en: "What good development changes", ar: "ما يغيّره التطوير الجيد" },
      lead: { en: "A well-built site is faster, ranks better, and keeps visitors long enough to become enquiries.", ar: "الموقع المبني جيداً أسرع، ويتصدّر أفضل، ويبقي الزوّار طويلاً بما يكفي ليصبحوا استفسارات." },
      items: [
        { label: { en: "Faster pages", ar: "صفحات أسرع" }, body: { en: "Server rendering and lean code load quickly on any phone.", ar: "عرض الخادم وكود رشيق يُحمَّل بسرعة على أي هاتف." } },
        { label: { en: "Better ranking", ar: "ترتيب أفضل" }, body: { en: "Clean code and schema help search engines understand your site.", ar: "الكود النظيف وschema يساعدان محركات البحث على فهم موقعك." } },
        { label: { en: "Owned, not rented", ar: "مملوك، لا مستأجر" }, body: { en: "Custom code you control, free of template lock-in.", ar: "كود مخصّص تتحكم به، خالٍ من أسر القوالب." } },
      ],
    },
    faq: {
      eyebrow: { en: "Common questions", ar: "أسئلة شائعة" }, h2: { en: "Website development questions", ar: "أسئلة تطوير المواقع" },
      items: [
        { q: { en: "Do you use WordPress?", ar: "هل تستخدمون ووردبريس؟" }, a: { en: "No. We build in Next.js and React, which are faster and more secure than WordPress for the kind of marketing sites we make.", ar: "لا. نبني بـNext.js وReact، وهما أسرع وآمنان أكثر من ووردبريس لنوع المواقع التسويقية التي نصنعها." } },
        { q: { en: "Will I own the code?", ar: "هل سأملك الكود؟" }, a: { en: "Yes. The code is yours, hosted on your domain, deployable anywhere. You are not locked into us.", ar: "نعم. الكود ملكك، مستضاف على نطاقك، قابل للنشر في أي مكان. لست مقيداً بنا." } },
        { q: { en: "Can you rebuild my existing site?", ar: "هل يمكنكم إعادة بناء موقعي الحالي؟" }, a: { en: "Yes. We can rebuild an existing site on the modern stack while keeping your content and URLs where possible.", ar: "نعم. يمكننا إعادة بناء موقع حالي على الحزمة الحديثة مع الاحتفاظ بمحتواك وعناوين URL حيثما أمكن." } },
        { q: { en: "Is Arabic included?", ar: "هل العربية مشمولة؟" }, a: { en: "Yes, with proper right-to-left layout. We do not bolt Arabic on as a translation afterthought.", ar: "نعم، بتنسيق صحيح من اليمين إلى اليسار. لا نضيف العربية كترجمة لاحقة." } },
        { q: { en: "Where is the site hosted?", ar: "أين يُستضاف الموقع؟" }, a: { en: "On Vercel, a global platform with edge nodes close to the UAE, on your own domain.", ar: "على Vercel، منصة عالمية بعُقد طرفية قرب الإمارات، على نطاقك الخاص." } },
        { q: { en: "How long does a build take?", ar: "كم يستغرق البناء؟" }, a: { en: "A typical marketing site takes a few weeks after the homepage concept is approved, depending on page count.", ar: "يستغرق موقع تسويقي نموذجي بضعة أسابيع بعد الموافقة على مفهوم الصفحة الرئيسية، حسب عدد الصفحات." } },
      ],
    },
    cta: { heading: { en: "Want a fast, custom site? Start with a free concept.", ar: "تريد موقعاً سريعاً ومخصّصاً؟ ابدأ بمفهوم مجاني." } },
  },
  {
    slug: "seo-copywriting",
    meta: { title: { en: "SEO Copywriting in Dubai | Service Page Architecture | Big Story", ar: "كتابة محتوى السيو في دبي | هيكلة صفحات الخدمات | بيك ستوري" }, description: { en: "SEO copywriting and service page architecture for Dubai businesses. Pages written to rank for the terms your buyers type and to read like a person wrote them.", ar: "كتابة محتوى السيو وهيكلة صفحات الخدمات لشركات دبي. صفحات مكتوبة لتتصدّر للمصطلحات التي يكتبها عملاؤك ولتُقرأ كأن شخصاً كتبها." } },
    breadcrumb: { en: "SEO copywriting", ar: "كتابة محتوى السيو" },
    hero: {
      eyebrow: { en: "SEO copywriting and service page architecture", ar: "كتابة محتوى السيو وهيكلة صفحات الخدمات" },
      h1: { en: "SEO copywriting built for Dubai search and Dubai readers", ar: "كتابة محتوى سيو مبنية لبحث دبي وقرّاء دبي" },
      lead: { en: "We write website copy that ranks for the searches your buyers actually type, and that still reads like a human wrote it. Every service page is structured around a real search intent, answers the questions behind it, and moves the reader toward contacting you. Every page is written for the reader who will actually read it, in a single consistent voice, in English and in proper Arabic. We do not stuff keywords, and we do not bolt a machine translation onto the end.", ar: "نكتب محتوى المواقع الذي يتصدّر للعمليات التي يكتبها عملاؤك فعلاً، والذي يبقى يُقرأ كأن إنساناً كتبه. تُهيكَل كل صفحة خدمة حول نية بحث حقيقية، وتجيب عن الأسئلة وراءها، وتحرّك القارئ نحو التواصل معك. كل صفحة مكتوبة للقارئ الذي سيقرؤها فعلاً، بصوت واحد متّسق، بالإنجليزية والعربية الصحيحة. لا نحشو الكلمات المفتاحية، ولا نُضيف ترجمة آلية في النهاية." },
      promise: { en: "SEO copy that sounds like a robot wrote it repels the reader it attracted. We write for the reader first and the algorithm second, and both win.", ar: "محتوى السيو الذي يبدو كأن روبوتاً كتبه ينفّر القارئ الذي جذبه. نكتب للقارئ أولاً وللخوارزمية ثانياً، وكلاهما يربح." },
    },
    sections: [
    {
      id: "what-seo-copy-is", n: "01",
      eyebrow: { en: "What SEO copy is", ar: "ما هو محتوى السيو" },
      h2: { en: "Copy that earns its place in search by being genuinely useful.", ar: "محتوى يكسب مكانه في البحث بكونه مفيداً فعلاً." },
      lead: { en: "SEO copywriting is not keyword stuffing. It is writing the page that best answers what a Dubai searcher typed into Google, in language they recognise as written for them.", ar: "كتابة محتوى السيو ليست حشواً للكلمات المفتاحية. إنها كتابة الصفحة التي تجيب أفضل عمّا كتبه باحث دبي في جوجل، بلغة يتعرّف عليها كُتبت له." },
      body: { en: "When someone in Dubai searches for a service you offer, Google tries to show the page that answers their need best. Our job is to make your page that page. We research the real questions behind each search, structure the page to answer them in a sensible order, and write copy that a reader trusts because it sounds like it was written by someone who knows the subject. The keywords are there, but they sit inside sentences a human would write, not dropped into a paragraph to trick a crawler.", ar: "عندما يبحث شخص في دبي عن خدمة تقدّمها، تحاول جوجل عرض الصفحة التي تجيب عن حاجته أفضل. مهمتنا أن نجعل صفحتك تلك الصفحة. نبحث الأسئلة الحقيقية وراء كل بحث، ونهيكِل الصفحة لتجيب عنها بترتيب منطقي، ونكتب محتوى يثق به القارئ لأنه يبدو كُتب من شخص يعرف الموضوع. الكلمات المفتاحية موجودة، لكنها تجلس داخل جُمل يكتبها إنسان، لا مُسقَطة في فقرة لخداع زاحف." },
      list: [
        { en: "Pages structured around real search intent", ar: "صفحات مهيكلة حول نية البحث الحقيقية" },
        { en: "Keywords used naturally, never stuffed", ar: "كلمات مفتاحية تُستخدم بشكل طبيعي، لا تُحشى أبداً" },
        { en: "Copy that earns reader trust, not just rankings", ar: "محتوى يكسب ثقة القارئ، لا الترتيب فحسب" },
      ],
    },
    {
      id: "service-page-architecture", n: "02",
      eyebrow: { en: "Service page architecture", ar: "هيكلة صفحات الخدمات" },
      h2: { en: "Every service page follows a structure built to convert, not just to inform.", ar: "كل صفحة خدمة تتبع بنية مبنية للتحويل، لا للإخبار فقط." },
      lead: { en: "A service page is not an article. It has a job: move the reader from question to confidence to contact. We architect each one to do that job.", ar: "صفحة الخدمة ليست مقالاً. لها مهمة: تحريك القارئ من السؤال إلى الثقة إلى التواصل. نهيكِل كل واحدة لتؤدّي تلك المهمة." },
      body: { en: "A strong service page opens with the promise the searcher came for, proves it fast, answers the questions that block a decision, shows what working with you looks like, and ends with a single clear next step. We have refined this structure across many Dubai industries, and it holds whether you are a dental clinic, a real estate advisor, a smart home installer, or a professional services firm. The words change, the architecture stays effective, because it mirrors how people actually decide.", ar: "تفتتح صفحة الخدمة القوية بالوعد الذي جاء من أجله الباحث، وتُثبته بسرعة، وتجيب عن الأسئلة التي تعرقل القرار، وتُظهر كيف يبدو العمل معك، وتنتهي بخطوة تالية واحدة واضحة. صقلنا هذه البنية عبر صناعات دبي كثيرة، وهي تصمد سواء كنت عيادة أسنان أو مستشار عقارات أو مثبّت منزل ذكي أو شركة خدمات مهنية. تتغيّر الكلمات، وتبقى البنية فعّالة، لأنها تعكس كيف يقرر الناس فعلاً." },
      list: [
        { en: "Promise, proof, objection, process, next step", ar: "وعد، دليل، اعتراض، عملية، خطوة تالية" },
        { en: "Tested across dental, real estate, and pro services", ar: "مُختبَر عبر الأسنان والعقارات والخدمات المهنية" },
        { en: "One clear call to action, not five competing ones", ar: "دعوة واحدة واضحة للعمل، لا خمس متزاحمة" },
      ],
    },
    {
      id: "dubai-keywords", n: "03",
      eyebrow: { en: "Dubai keyword targeting", ar: "استهداف كلمات دبي المفتاحية" },
      h2: { en: "We target the terms Dubai buyers type, including the ones your competitors ignore.", ar: "نستهدف المصطلحات التي يكتبها مشتري دبي، بما فيها التي يتجاهلها منافسوك." },
      lead: { en: "Broad keywords are fought over by big budgets. The specific, question-based keywords your local buyers type are often wide open, and they convert better.", ar: "الكلمات المفتاحية العامة يتنازع عليها ميزانيات كبيرة. الكلمات المفتاحية المحدّدة القائمة على الأسئلة التي يكتبها عملاؤك المحليون غالباً مفتوحة على مصراعيها، وتتحوّل أفضل." },
      body: { en: "We map the keyword landscape for your service in Dubai and the wider UAE, then target a mix: the high-intent terms that bring ready buyers, the question terms that bring early-stage researchers, and the local terms that bring people searching near their office or home. We avoid the vanity terms that bring traffic but no enquiries, and we prioritise the terms that bring people ready to act. Keyword research is not about volume, it is about intent, and intent is what fills your contact form.", ar: "نرسم خريطة مشهد الكلمات المفتاحية لخدمتك في دبي وبقية الإمارات، ثم نستهدف مزيجاً: المصطلحات ذات النية العالية التي تجلب مشترين جاهزين، ومصطلحات الأسئلة التي تجلب باحثين في مرحلة مبكرة، والمصطلحات المحلية التي تجلب أشخاصاً يبحثون قرب مكتبهم أو منزلهم. نتجنّب المصطلحات الزائفة التي تجلب حركة دون استفسارات، ونُعطي الأولوية للمصطلحات التي تجلب أشخاصاً جاهزين للتصرف. بحث الكلمات المفتاحية ليس عن الحجم، بل عن النية، والنية هي ما يملأ نموذج التواصل الخاص بك." },
      list: [
        { en: "High-intent commercial keywords prioritised", ar: "كلمات مفتاحية تجارية عالية النية بأولوية" },
        { en: "Question and local keywords captured too", ar: "كلمات الأسئلة والمحلية تُلتقط أيضاً" },
        { en: "Vanity traffic terms deprioritised", ar: "مصطلحات حركة الزينة تُخفَّض أولويتها" },
      ],
    },
    {
      id: "bilingual-copy", n: "04",
      eyebrow: { en: "Bilingual copy", ar: "محتوى ثنائي اللغة" },
      h2: { en: "Arabic copy written for Arabic readers, not translated from English.", ar: "محتوى عربي مكتوب لقرّاء العربية، لا مترجم من الإنجليزية." },
      lead: { en: "A surprising share of Dubai search happens in Arabic. If your Arabic copy is a machine translation of your English, you lose those readers in the first sentence.", ar: "حصة مفاجئة من بحث دبي تجري بالعربية. إن كان محتواك العربي ترجمة آلية لإنجليزيتك، تخسر أولئك القرّاء في الجملة الأولى." },
      body: { en: "We write Arabic copy that reads naturally to an Arabic speaker, with the right register for a business audience in the Gulf. It is not a word-for-word translation of the English, because what persuades in English does not always persuade in Arabic. The meaning is preserved, but the phrasing is rebuilt for the reader who will actually read it. This is the difference between having Arabic on your site and having Arabic that works on your site.", ar: "نكتب محتوى عربياً يُقرأ بشكل طبيعي لناطق بالعربية، بالسجل المناسب لجمهور أعمال في الخليج. إنها ليست ترجمة كلمة بكلمة للإنجليزية، لأن ما يقنع بالإنجليزية لا يقنع دائماً بالعربية. يُحفظ المعنى، لكن الصياغة تُعاد بناؤها للقارئ الذي سيقرؤها فعلاً. هذا الفرق بين وجود العربية على موقعك ووجود عربية تعمل على موقعك." },
      list: [
        { en: "Arabic written for Gulf business readers", ar: "عربية مكتوبة لقرّاء أعمال الخليج" },
        { en: "Meaning preserved, phrasing rebuilt", ar: "المعنى محفوظ، والصياغة معاد بناؤها" },
        { en: "Right-to-left layout and Arabic typography", ar: "تنسيق من اليمين إلى اليسار وطباعة عربية" },
      ],
    },
    {
      id: "how-google-judges", n: "05",
      eyebrow: { en: "How Google judges copy now", ar: "كيف تحكم جوجل على المحتوى الآن" },
      h2: { en: "Google has learned to reward writing that helps a person, not writing that games a system.", ar: "تعلّمت جوجل أن تكافئ الكتابة التي تساعد شخصاً، لا الكتابة التي تستغل نظاماً." },
      lead: { en: "The old tricks, keyword stuffing, hidden text, scraped content, stopped working years ago. What works now is writing that genuinely satisfies the searcher.", ar: "الحيل القديمة، حشو الكلمات، النص المخفي، المحتوى المسروق، توقفت عن العمل منذ سنوات. ما يعمل الآن هو الكتابة التي تُشبع الباحث فعلاً." },
      body: { en: "For a long time, SEO copy was a technical exercise in repeating keywords enough times. That era is over. Google now reads pages the way a person might, judging whether the page actually answers the question, whether it is written by someone who understands the subject, and whether a reader would be satisfied or would need to go back to search and try again. The signals it uses are behavioural: does the reader stay, do they scroll, do they click through to contact, or do they bounce straight back. This means the best SEO strategy is also the most honest one: write the page your reader wishes they had found. We do the research to know what that page is, and then we write it like a person, because a person is who will read it.", ar: "لفترة طويلة، كان محتوى السيو تمريناً تقنياً في تكرار الكلمات المفتاحية مرات كافية. تلك الحقبة انتهت. تقرأ جوجل الآن الصفحات كما قد يفعل شخص، حاكمةً ما إذا كانت الصفحة تجيب عن السؤال فعلاً، وما إذا كانت مكتوبة من شخص يفهم الموضوع، وما إذا كان القارئ سيكون راضياً أم سيحتاج للرجوع إلى البحث والمحاولة مجدداً. الإشارات التي تستخدمها سلوكية: هل يبقى القارئ، هل يمرّر، هل ينقر للتواصل، أم هل يرتد مباشرة. هذا يعني أن أفضل استراتيجية سيو هي أيضاً الأكثر صدقاً: اكتب الصفحة التي يتمنى قارئك لو أنه وجدها. ننجز البحث لنعرف ما تلك الصفحة، ثم نكتبها كشخص، لأن شخصاً هو من سيقرؤها." },
      list: [
        { en: "Old keyword tricks no longer work", ar: "حيل الكلمات القديمة لم تعد تعمل" },
        { en: "Behavioural signals now decide ranking", ar: "الإشارات السلوكية تقرر الترتيب الآن" },
        { en: "The honest page is the ranking page", ar: "الصفحة الصادقة هي الصفحة المتصدّرة" },
      ],
    },
    {
      id: "voice", n: "06",
      eyebrow: { en: "Voice and consistency", ar: "الصوت والاتساق" },
      h2: { en: "A site that sounds like five different writers loses trust by the second page.", ar: "الموقع الذي يبدو كخمسة كتّاب مختلفين يخسر الثقة بحلول الصفحة الثانية." },
      lead: { en: "Consistent voice across every page is what makes a site feel like one competent business wrote it. We hold that line throughout.", ar: "الصوت المتّسق عبر كل صفحة هو ما يجعل الموقع يبدو كأن عملاً كفؤاً واحداً كتبه. نتمسّك بذلك الخط طوال الوقت." },
      body: { en: "A common failure of large sites is that each page sounds like it was written by someone different. The homepage is warm, the about page is stiff, the FAQ is robotic, the service pages are inconsistent with each other. A visitor moving through the site feels the seams, and the seams erode trust. We write every page in a single, consistent voice, chosen to fit your brand and your audience. The voice is decided early, documented, and held to across the whole build, so the finished site reads like one confident business speaking, not a committee. This consistency is invisible when it is done right, which is exactly the point. You only notice voice when it breaks, and we make sure it does not break.", ar: "فشل شائع للمواقع الكبيرة هو أن كل صفحة تبدو كأن شخصاً مختلفاً كتبها. الصفحة الرئيسية دافئة، صفحة من نحن متصلّبة، الأسئلة الشائعة روبوتية، صفحات الخدمات غير متّسقة مع بعضها. الزائر الذي يتنقّل في الموقع يشعر بالدروز، والدروز تأكل الثقة. نكتب كل صفحة بصوت واحد متّسق، مُختار ليناسب علامتك وجمهورك. يُقرَّر الصوت مبكراً، ويُوثَّق، ويُتمسَّك به عبر البناء كله، بحيث يُقرأ الموقع النهائي كعمل واثق واحد يتحدّث، لا لجنة. هذا الاتساق غير مرئي عندما يُنجَز صحيحاً، وهذا بالضبط الغرض. لا تلاحظ الصوت إلا حين ينكسر، ونحن نتأكّد أنه لا ينكسر." },
      list: [
        { en: "One voice across every page", ar: "صوت واحد عبر كل صفحة" },
        { en: "Voice decided early and held throughout", ar: "صوت يُقرَّر مبكراً ويُتمسَّك به طوال الوقت" },
        { en: "Consistency builds trust invisibly", ar: "الاتساق يبني الثقة بشكل غير مرئي" },
      ],
    },
    {
      id: "common-mistakes", n: "07",
      eyebrow: { en: "Common mistakes", ar: "أخطاء شائعة" },
      h2: { en: "The copywriting mistakes that keep good Dubai sites from ranking.", ar: "أخطاء كتابة المحتوى التي تُبقي مواقع دبي الجيدة خارج الترتيب." },
      lead: { en: "Even well-designed sites fail to rank when the copy is built wrong. These are the patterns to avoid.", ar: "حتى المواقع المصمّمة جيداً تفشل في التصدّر حين يُبنى المحتوى بشكل خاطئ. هذه الأنماط لتجنّبها." },
      body: { en: "The first mistake is writing for the business instead of the buyer, filling the page with what the company wants to say rather than what the searcher needs to hear. The second is thin content, pages with so little substance that Google and visitors alike find them useless. The third is duplicate or templated text reused across many sites, which search engines discount heavily. The fourth is keyword stuffing, the outdated practice of repeating a term until the copy reads unnaturally, which now actively harms ranking. The fifth is ignoring Arabic entirely, or adding it as a machine translation, which abandons a large share of Dubai search. We avoid all five by writing original, buyer-focused, substantive, bilingual copy on every page, which is slower and harder and exactly what ranks.", ar: "الخطأ الأول الكتابة للعمل بدلاً من المشتري، ملء الصفحة بما تريد الشركة قوله بدلاً مما يحتاج الباحث سماعه. الثاني المحتوى الرقيق، صفحات بقلة جوهر تجد جوجل والزوّار على حد سواء غير مفيدة. الثالث النص المكرّر أو القالبي المعاد استخدامه عبر مواقع كثيرة، الذي يُخفّض محركات البحث وزنه بكثافة. الرابع حشو الكلمات المفتاحية، الممارسة القديمة بتكرار مصطلح حتى يُقرأ المحتوى بشكل غير طبيعي، التي تؤذي الترتيب بنشاط الآن. الخامس تجاهل العربية كلياً، أو إضافتها كترجمة آلية، ما يتخلّى عن حصة كبيرة من بحث دبي. نتجنّب الخمسة جميعاً بكتابة محتوى أصيل مركّز على المشتري جوهري ثنائي اللغة على كل صفحة، وهو أبطأ وأصعب وبالضبط ما يتصدّر." },
      list: [
        { en: "Writing for the business, not the buyer", ar: "الكتابة للعمل، لا المشتري" },
        { en: "Thin, duplicate, or keyword-stuffed text", ar: "نص رقيق أو مكرّر أو محشو بالكلمات" },
        { en: "Ignoring or machine-translating Arabic", ar: "تجاهل العربية أو ترجمتها آلياً" },
      ],
    },
    ],
    deliverables: {
      eyebrow: { en: "What you get", ar: "ما تحصل عليه" }, h2: { en: "The copywriting deliverables", ar: "مخرجات كتابة المحتوى" },
      items: [
        { en: "SEO-structured service pages built around real intent", ar: "صفحات خدمات مهيكلة للسيو مبنية حول نية حقيقية" },
        { en: "Keyword map for your Dubai and UAE market", ar: "خريطة كلمات مفتاحية لسوقك في دبي والإمارات" },
        { en: "Bilingual English and Arabic copy, human-written", ar: "محتوى ثنائي الإنجليزية والعربية، مكتوب بشرياً" },
        { en: "FAQ sections with FAQPage schema", ar: "أقسام أسئلة شائعة بترميز FAQPage" },
        { en: "Meta titles, descriptions, and heading hierarchy", ar: "عناوين ميتا وأوصاف وتسلسل عناوين" },
      ],
    },
    approach: {
      eyebrow: { en: "How we approach it", ar: "كيف نتعامل معه" }, h2: { en: "We write for the reader first, and the algorithm rewards it.", ar: "نكتب للقارئ أولاً، والخوارزمية تكافئ ذلك." },
      lead: { en: "Google has spent years learning to spot writing that was written for a crawler. The copy that wins now is the copy written for a person.", ar: "أمضت جوجل سنوات في التعلّم how ترصد الكتابة المكتوبة لزاحف. المحتوى الذي يربح الآن هو المحتوى المكتوب لشخص." },
      body: { en: "Every paragraph we write has to pass a simple test: would a real Dubai reader trust this sentence? If the answer is no, we rewrite it. This keeps the copy honest, which keeps it ranking, because the signals Google now weighs most are exactly the ones that come from a satisfied reader: time on page, low bounce, and a click through to contact.", ar: "أمضت جوجل سنوات في التعلّم كيف ترصد الكتابة المكتوبة لزاحف. المحتوى الذي يربح الآن هو المحتوى المكتوب لشخص." },
    },
    outcomes: {
      eyebrow: { en: "Why it matters", ar: "لماذا يهمّ" }, h2: { en: "What good copy changes", ar: "ما يغيّره المحتوى الجيد" },
      lead: { en: "The right words in the right order turn a search visitor into an enquiry, and a browser into a buyer.", ar: "الكلمات الصحيحة بالترتيب الصحيح تحوّل زائر البحث إلى استفسار، والمتصفّح إلى مشترٍ." },
      items: [
        { label: { en: "More enquiries", ar: "استفسارات أكثر" }, body: { en: "Pages answer the questions that lead to contact.", ar: "الصفحات تجيب عن الأسئلة التي تقود إلى التواصل." } },
        { label: { en: "Better rankings", ar: "ترتيب أفضل" }, body: { en: "Useful, structured copy earns its place in search.", ar: "المحتوى المفيد المهيكل يكسب مكانه في البحث." } },
        { label: { en: "Reader trust", ar: "ثقة القارئ" }, body: { en: "Human copy builds credibility that templated text cannot.", ar: "المحتوى البشري يبني مصداقية لا يستطيعها النص القالبي." } },
      ],
    },
    faq: {
      eyebrow: { en: "Common questions", ar: "أسئلة شائعة" }, h2: { en: "SEO copywriting questions", ar: "أسئلة كتابة محتوى السيو" },
      items: [
        { q: { en: "Do you use AI to write the copy?", ar: "هل تستخدمون الذكاء الاصطناعي لكتابة المحتوى؟" }, a: { en: "We use specialist tools to assist research and structure, but the copy is written and edited by a person to read like a person wrote it.", ar: "نستخدم أدوات متخصصة لمساعدة البحث والهيكلة، لكن المحتوى يُكتب ويُحرَّر من شخص ليُقرأ كأن شخصاً كتبه." } },
        { q: { en: "Will the copy rank on Google?", ar: "هل سيتصدّر المحتوى على جوجل؟" }, a: { en: "Copy built on real keyword research ranks far better than generic copy, especially in specific Dubai niches. No honest agency guarantees a position.", ar: "المحتوى المبني على بحث كلمات مفتاحية حقيقي يتصدّر أفضل بكثير من المحتوى العام، خاصة في مجالات دبي المحدّدة. لا تضمن أي وكالة صادقة مركزاً." } },
        { q: { en: "Is Arabic copy included?", ar: "هل المحتوى العربي مشمول؟" }, a: { en: "Yes. We write proper Arabic, not a bolted-on translation, with right-to-left layout.", ar: "نعم. نكتب عربية صحيحة، لا ترجمة مُضافة، بتنسيق من اليمين إلى اليسار." } },
        { q: { en: "How many pages do I need?", ar: "كم صفحة أحتاج؟" }, a: { en: "That depends on your services. We recommend one focused page per service plus supporting location or FAQ pages where they help.", ar: "يعتمد ذلك على خدماتك. نوصي بصفحة مركّزة واحدة لكل خدمة بالإضافة إلى صفحات مواقع أو أسئلة شائعة داعمة حيث تساعد." } },
        { q: { en: "Do you write blogs?", ar: "هل تكتبون المدوّنات؟" }, a: { en: "We can, but for most Dubai service businesses, focused service pages bring better-qualified traffic than generic blog posts.", ar: "يمكننا ذلك، لكن لمعظم شركات الخدمات في دبي، تجلب صفحات الخدمات المركّزة حركة أكثر تأهيلاً من منشورات المدوّنات العامة." } },
        { q: { en: "Who owns the copy?", ar: "من يملك المحتوى؟" }, a: { en: "You do. The copy lives on your site and is yours to keep and reuse.", ar: "أنت. يعيش المحتوى على موقعك وهو ملكك لتبقيه وتعيد استخدامه." } },
      ],
    },
    cta: { heading: { en: "Want copy that ranks and reads well? Start the concept.", ar: "تريد محتوى يتصدّر ويُقرأ جيداً؟ ابدأ المفهوم." } },
  },
  {
    slug: "conversion-optimization",
    meta: { title: { en: "Conversion Optimization and Multi-Step Forms in Dubai | Big Story", ar: "تحسين التحويل والنماذج متعددة الخطوات في دبي | بيك ستوري" }, description: { en: "Conversion optimization for Dubai websites. We reduce friction, add multi-step forms, and turn more of your visitors into enquiries and bookings.", ar: "تحسين التحويل لمواقع دبي. نقلّل الاحتكاك، ونضيف نماذج متعددة الخطوات، ونحوّل المزيد من زوّارك إلى استفسارات وحجوزات." } },
    breadcrumb: { en: "Conversion optimization", ar: "تحسين التحويل" },
    hero: {
      eyebrow: { en: "Conversion optimization and multi-step forms", ar: "تحسين التحويل والنماذج متعددة الخطوات" },
      h1: { en: "Turn more Dubai visitors into enquiries and bookings", ar: "حوّل المزيد من زوّار دبي إلى استفسارات وحجوزات" },
      lead: { en: "Traffic without conversion is wasted spend. We tune your site to reduce the friction between a visitor arriving and a visitor contacting you, with multi-step forms, clearer calls to action, and pages built to move people forward instead of letting them stall. A site can look beautiful and still lose every enquiry, because looks do not fill a contact form. We find the small frictions that quietly cost you visitors, remove them, and let the traffic you already have do more work.", ar: "الحركة دون تحويل إنفاق مُهدر. نضبط موقعك لتقليل الاحتكاك بين وصول الزائر وتواصل الزائر معك، بنماذج متعددة الخطوات، ودعوات أوضح للعمل، وصفحات مبنية لتحريك الناس للأمام بدلاً من تركهم يتوقفون. يمكن لموقع أن يبدو جميلاً ومع ذلك يخسر كل استفسار، لأن المظهر لا يملأ نموذج تواصل. نجد الاحتكاكات الصغيرة التي تكلّفك زوّاراً بهدوء، ونزيلها، ونترك حركتك الحالية تعمل أكثر." },
      promise: { en: "A site can look beautiful and still lose every enquiry. We optimise for the action that pays your bills.", ar: "يمكن لموقع أن يبدو جميلاً ومع ذلك يخسر كل استفسار. نُحسّن من أجل الإجراء الذي يدفع فواتيرك." },
    },
    sections: [
    {
      id: "what-conversion-is", n: "01",
      eyebrow: { en: "What conversion means", ar: "ما يعنيه التحويل" },
      h2: { en: "Conversion is the action you actually want, not the page view you can count.", ar: "التحويل هو الإجراء الذي تريده فعلاً، لا المشاهدة التي تستطيع عدّها." },
      lead: { en: "A page view is easy to measure and easy to celebrate. The enquiry, the booking, the call is what keeps your business running. We optimise for that.", ar: "مشاهدة الصفحة سهلة القياس وسهلة الاحتفال بها. الاستفسار، الحجز، المكالمة هو ما يبقي عملك يجري. نُحسّن من أجل ذلك." },
      body: { en: "For a dental clinic, conversion is a booked appointment. For a real estate advisor, it is a qualified lead. For a smart home installer, it is a consultation request. Every business has one or two actions that actually matter, and the website should be tuned to make those actions easy and obvious. We start every conversion project by agreeing what the real conversion is, because everything else depends on it. A site optimised for the wrong action still fails, even if the numbers look busy.", ar: "بالنسبة لعيادة أسنان، التحويل هو موعد محجوز. بالنسبة لمستشار عقارات، هو عميل محتمل مؤهَّل. بالنسبة لمثبّت منزل ذكي، هو طلب استشارة. لكل عمل إجراء أو إجراءان يهمّان فعلاً، ويجب أن يُضبط الموقع لجعل تلك الإجراءات سهلة وواضحة. نبدأ كل مشروع تحويل بالاتفاق على ما هو التحويل الحقيقي، لأن كل شيء آخر يعتمد عليه. الموقع المُحسَّن للإجراء الخاطئ يفشل مع ذلك، حتى لو بدت الأرقام مشغولة." },
      list: [
        { en: "Agree the real conversion action first", ar: "اتفق على إجراء التحويل الحقيقي أولاً" },
        { en: "Tune every page toward that action", ar: "اضبط كل صفحة نحو ذلك الإجراء" },
        { en: "Measure the action, not vanity metrics", ar: "قِس الإجراء، لا مقاييس الزينة" },
      ],
    },
    {
      id: "friction", n: "02",
      eyebrow: { en: "Removing friction", ar: "إزالة الاحتكاك" },
      h2: { en: "Most visitors are lost to small frictions, not big objections.", ar: "معظم الزوّار يُفقدون بسبب احتكاكات صغيرة، لا اعتراضات كبيرة." },
      lead: { en: "A visitor who wants to contact you can be stopped by a form that asks too much, a button that is hard to find, or a page that never reaches the point. We find and remove those frictions.", ar: "الزائر الذي يريد التواصل معك يمكن أن يوقفه نموذج يطلب كثيراً، أو زر يصعب إيجاده، أو صفحة لا تصل إلى النقطة أبداً. نجد تلك الاحتكاكات ونزيلها." },
      body: { en: "Friction is usually invisible to the business owner, because they know their own process. A first-time visitor does not. We walk the site as a visitor would, at the moments that matter, and we find the places where people give up. It might be a contact form with twelve fields where three would do. It might be a phone number buried in the footer. It might be a service page that never says what to do next. Each friction we remove is a percentage of visitors recovered, and those percentages add up to real enquiries.", ar: "الاحتكاك عادةً غير مرئي لصاحب العمل، لأنه يعرف عمليته الخاصة. الزائر لأول مرة لا يعرف. نمشي في الموقع كما يفعل الزائر، في اللحظات المهمة، ونجد الأماكن التي يستسلم فيها الناس. قد يكون نموذج اتصال باثني عشر حقلاً حيث يكفي ثلاثة. قد يكون رقم هاتف مدفون في التذييل. قد تكون صفحة خدمة لا تقول أبداً ماذا يحدث تالياً. كل احتكاك نزيله هو نسبة مئوية من الزوّار المسترجَعين، وتتجمّع تلك النسب في استفسارات حقيقية." },
      list: [
        { en: "Visitor journey audit at key decision points", ar: "تدقيق رحلة الزائر في نقاط القرار المهمة" },
        { en: "Shorter, smarter forms", ar: "نماذج أقصر وأذكى" },
        { en: "Clear next step on every page", ar: "خطوة تالية واضحة على كل صفحة" },
      ],
    },
    {
      id: "multi-step-forms", n: "03",
      eyebrow: { en: "Multi-step forms", ar: "النماذج متعددة الخطوات" },
      h2: { en: "A multi-step form converts better than one long wall of fields.", ar: "النموذج متعدد الخطوات يتحوّل أفضل من جدار طويل واحد من الحقول." },
      lead: { en: "Asking for everything at once overwhelms people. Breaking the same questions into short steps keeps them moving and filters out the unserious.", ar: "طلب كل شيء دفعة واحدة يطغى على الناس. تقسيم الأسئلة نفسها إلى خطوات قصيرة يبقيهم متحرّكين ويُرشّح غير الجادين." },
      body: { en: "We build multi-step forms that ask one thing at a time, show progress, and adapt to the answer given. A dental booking form might ask what treatment first, then when, then contact details, confirming the next step throughout. A real estate enquiry might ask buy or rent first, then area, then budget, then contact details. Each step is small enough to feel easy, and by the end the visitor has invested enough that they tend to finish. These forms convert meaningfully better than a single long form, and they arrive pre-qualified, which saves your team time.", ar: "نبني نماذج متعددة الخطوات تطلب شيئاً واحداً في كل مرة، وتُظهر التقدّم، وتتكيف مع الإجابة المُعطاة. قد يسأل نموذج حجز أسنان عن العلاج أولاً، ثم متى، ثم تفاصيل التواصل، مؤكّداً الخطوة التالية طوال الوقت. قد يسأل استفسار عقارات عن شراء أو إيجار أولاً، ثم المنطقة، ثم الميزانية، ثم تفاصيل التواصل. كل خطوة صغيرة بما يكفي لتبدو سهلة، وبالنهاية استثمر الزائر ما يكفي بحيث يميل إلى الإنهاء. هذه النماذج تتحوّل أفضل بكثير من نموذج طويل واحد، وتصل مؤهَّلة مسبقاً، ما يوفّر وقت فريقك." },
      list: [
        { en: "One question per step, with progress shown", ar: "سؤال واحد لكل خطوة، مع إظهار التقدّم" },
        { en: "Adaptive logic based on earlier answers", ar: "منطق تكيّفي بناءً على إجابات سابقة" },
        { en: "Pre-qualified enquiries for your team", ar: "استفسارات مؤهَّلة مسبقاً لفريقك" },
      ],
    },
    {
      id: "calls-to-action", n: "04",
      eyebrow: { en: "Calls to action", ar: "دعوات العمل" },
      h2: { en: "One clear next step beats five buttons fighting for a click.", ar: "خطوة تالية واحدة واضحة تتفوّق على خمسة أزرار تتنازع على نقرة." },
      lead: { en: "A page with five calls to action gives the visitor five reasons to hesitate. A page with one gives them one clear thing to do.", ar: "الصفحة بخمس دعوات عمل تمنح الزائر خمسة أسباب للتردّد. الصفحة بواحدة تمنحه شيئاً واحداً واضحاً لفعله." },
      body: { en: "We reduce competing calls to action to a single primary next step on each page, with a clear secondary option for visitors not ready to act yet. The primary action is what most people should do, and it is designed to stand out. The secondary option catches those who want to learn more first. Removing the clutter of competing buttons focuses the visitor and lifts conversion, because decision fatigue is real and a confused visitor clicks nothing.", ar: "نقلّل الدعوات المتنازعة للعمل إلى خطوة تالية أساسية واحدة على كل صفحة، مع خيار ثانوي واضح للزوّار غير الجاهزين للتصرف بعد. الإجراء الأساسي هو ما يجب أن يفعله معظم الناس، وهو مصمّم ليبرز. الخيار الثانوي يلتقط من يريد التعلّم أكثر أولاً. إزالة فوضى الأزرار المتنازعة تركّز الزائر وترفع التحويل، لأن إرهاق القرار حقيقي والزائر المرتبك لا ينقر شيئاً." },
      list: [
        { en: "One primary call to action per page", ar: "دعوة عمل أساسية واحدة لكل صفحة" },
        { en: "Clear secondary option for early-stage visitors", ar: "خيار ثانوي واضح للزوّار في مرحلة مبكرة" },
        { en: "Decision fatigue removed", ar: "إرهاق القرار مُزال" },
      ],
    },
    {
      id: "the-math", n: "05",
      eyebrow: { en: "The maths of small wins", ar: "حساب المكاسب الصغيرة" },
      h2: { en: "A small lift in conversion beats a large increase in traffic, for less money.", ar: "ارتفاع صغير في التحويل يتفوّق على زيادة كبيرة في الحركة، بأموال أقل." },
      lead: { en: "Doubling your traffic is expensive. Lifting your conversion by a fraction is not, and it often pays back more.", ar: "مضاعفة حركتك مكلفة. رفع تحويلك بكسر ليس كذلك، وغالباً يردّ أكثر." },
      body: { en: "Consider two paths. In the first, you spend more on advertising to double your traffic, hoping your conversion rate stays the same, so your enquiries roughly double. In the second, you spend a fraction of that on optimization, lifting your conversion rate by a meaningful margin, so your existing traffic brings more enquiries without any extra ad spend. The second path is almost always cheaper, and it has a second benefit: the improvement is permanent, while ad spend stops the moment you stop paying. Optimization compounds. Every friction removed keeps working for every future visitor, and every tested win raises the floor for the next test. This is why we treat conversion as the lever that matters most, because it turns the traffic you already pay for into more of the enquiries you actually want.", ar: "اعتبر طريقين. في الأول، تنفق أكثر على الإعلان لمضاعفة حركتك، آملاً أن يبقى معدل تحويلك كما هو، فتتضاعف استفساراتك تقريباً. في الثاني، تنفق كسراً من ذلك على التحسين، رافعاً معدل تحويلك بهامش معتبر، فتجلب حركتك الحالية استفسارات أكثر دون أي إنفاق إعلاني إضافي. الطريق الثاني دائماً تقريباً أرخص، وله فائدة ثانية: التحسين دائم، بينما الإنفاق الإعلاني يتوقف لحظة توقّفك عن الدفع. التحسين يتجمّع. كل احتكاك يُزال يستمر بالعمل لكل زائر مستقبلي، وكل ربح مُختبَر يرفع الأرضية للاختبار التالي. لهذا نعامل التحويل كالرافعة المهمة أكثر، لأنه يحوّل الحركة التي تدفع مقابلها بالفعل إلى استفسارات تريدها فعلاً." },
      list: [
        { en: "Optimization is cheaper than more ads", ar: "التحسين أرخص من إعلانات أكثر" },
        { en: "Improvements are permanent, ad spend is not", ar: "التحسينات دائمة، والإنفاق الإعلاني لا" },
        { en: "Small conversion lifts compound", ar: "ارتفاعات التحويل الصغيرة تتجمّع" },
      ],
    },
    {
      id: "trust-signals", n: "06",
      eyebrow: { en: "Trust signals and proof", ar: "إشارات الثقة والدليل" },
      h2: { en: "Visitors convert when they trust you, and trust is built with evidence placed where it's needed.", ar: "يتحوّل الزوّار عندما يثقون بك، والثقة تُبنى بدليل موضوع حيث يُحتاج." },
      lead: { en: "A clear call to action is not enough if the visitor does not yet trust you. We place the right proof at the right moment to close that gap.", ar: "دعوة العمل الواضحة لا تكفي إن لم يثق بك الزائر بعد. نضع الدليل الصحيح في اللحظة الصحيحة لسدّ تلك الفجوة." },
      body: { en: "Every visitor arrives with a question running in the background: can I trust this business? The answer has to be visible before they are asked to commit. We place trust signals where visitors actually look for them: credentials and registrations near the top, clear pricing or pricing approach where cost is a question, real process and timeline information where commitment is a concern, and contact details that are easy to verify. We do not fabricate testimonials or invent clients, because dishonest proof destroys trust the moment it is noticed. Instead we use honest signals: how long you have operated, what your process is, what your real delivery looks like, and where you are based. Honest proof, placed well, converts better than invented proof placed anywhere, because it survives scrutiny.", ar: "يصل كل زائر وسؤال يجري في الخلفية: هل أستطيع الوثوق بهذا العمل؟ يجب أن تكون الإجابة مرئية قبل أن يُطلَب منه الالتزام. نضع إشارات الثقة حيث يبحث الزوّار عنها فعلاً: الاعتمادات والتسجيلات قرب الأعلى، سعر واضح أو نهج تسعير حيث التكلفة سؤال، معلومات عملية وجدول زمني حقيقية حيث الالتزام مصدر قلق، وتفاصيل تواصل سهلة التحقق. لا نختلق الشهادات أو نخترع عملاء، لأن الدليل غير الصادق يدمر الثقة لحظة ملاحظته. بدلاً من ذلك نستخدم إشارات صادقة: كم عملت، ما عمليتك، كيف يبدو تسليمك الحقيقي، وأين مقرّك. الدليل الصادق، الموضوع جيداً، يتحوّل أفضل من الدليل المخترَع الموضوعة في أي مكان، لأنه يصمد أمام التدقيق." },
      list: [
        { en: "Proof placed where visitors look for it", ar: "دليل موضوع حيث يبحث عنه الزوّار" },
        { en: "Honest signals, never fabricated", ar: "إشارات صادقة، никогда مخترَعة" },
        { en: "Real process and location build credibility", ar: "عملية وموقع حقيقيان يبنيان المصداقية" },
      ],
    },
    {
      id: "common-mistakes", n: "07",
      eyebrow: { en: "Common mistakes", ar: "أخطاء شائعة" },
      h2: { en: "The conversion mistakes that leak enquiries every single day.", ar: "أخطاء التحويل التي تتسرّب منها الاستفسارات كل يوم." },
      lead: { en: "Most conversion problems are not mysterious. They are a handful of repeated mistakes. Here they are.", ar: "معظم مشاكل التحويل ليست غامضة. إنها حفنة من الأخطاء المكرّرة. هنا هي." },
      body: { en: "The first leak is the long contact form, asking for information the business does not even need yet, which scares off visitors who would have enquired. The second is the hidden or unclear call to action, where the visitor cannot tell what to do next. The third is competing buttons, offering chat, call, email, form, and social all at once, which freezes the visitor with choice. The fourth is the missing trust signal, where a visitor is interested but cannot find a reason to believe you can deliver. The fifth is the slow page, where the visitor leaves before the form even loads. We close each of these leaks in turn, because conversion is less about clever tactics and more about removing the ordinary obstacles that stand between an interested visitor and a sent enquiry.", ar: "التسريب الأول نموذج التواصل الطويل، الذي يطلب معلومات لا يحتاجها العمل حتى، ما يُخيف زوّاراً كانوا سيتساءلون. الثاني دعوة العمل المخفية أو غير الواضحة، حيث لا يستطيع الزائر معرفة ماذا يحدث تالياً. الثالث الأزرار المتزاحمة، التي تعرض دردشة ومكالمة وبريداً ونموذجاً واجتماعياً دفعة واحدة، ما يُجمّد الزائر بالاختيار. الرابع إشارة الثقة المفقودة، حيث يكون الزائر مهتماً لكنه لا يجد سبباً ليصدّق أنك تستطيع التسليم. الخامس الصفحة البطيئة، حيث يغادر الزائر قبل أن يُحمَّل النموذج. نُغلق كل تسريب من هذه بدوره، لأن التحويل أقل عن التكتيكات الذكية وأكثر عن إزالة العقبات العادية التي تقف بين زائر مهتم واستفسار مُرسَل." },
      list: [
        { en: "Forms that ask for too much", ar: "نماذج تطلب كثيراً" },
        { en: "Hidden calls to action and competing buttons", ar: "دعوات عمل مخفية وأزرار متزاحمة" },
        { en: "Missing trust and slow-loading pages", ar: "ثقة مفقودة وصفحات بطيئة التحميل" },
      ],
    },
    ],
    deliverables: {
      eyebrow: { en: "What you get", ar: "ما تحصل عليه" }, h2: { en: "The optimization deliverables", ar: "مخرجات التحسين" },
      items: [
        { en: "Agreed conversion action and measurement plan", ar: "إجراء تحويل متّفق عليه وخطة قياس" },
        { en: "Friction audit across the visitor journey", ar: "تدقيق الاحتكاك عبر رحلة الزائر" },
        { en: "Multi-step, adaptive forms that convert", ar: "نماذج متعددة الخطوات تكيّفية تتحوّل" },
        { en: "Clear call-to-action hierarchy on every page", ar: "تسلسل دعوة عمل واضح على كل صفحة" },
        { en: "WhatsApp and call integration for mobile", ar: "تكامل واتساب والمكالمة للجوال" },
      ],
    },
    approach: {
      eyebrow: { en: "How we approach it", ar: "كيف نتعامل معه" }, h2: { en: "We optimise for the action that pays, then we measure it.", ar: "نُحسّن للإجراء الذي يدفع، ثم نقيسه." },
      lead: { en: "Optimization without measurement is opinion. We agree the metric, make the change, and read the result.", ar: "التحسين دون قياس رأي. نتفق على المقياس، ونُجري التغيير، ونقرأ النتيجة." },
      body: { en: "Before we change a form or a button, we agree what success looks like in numbers. After launch, we read those numbers. If a multi-step form lifts enquiries, it stays. If a change does not help, it goes. This keeps the site honest and keeps your spend working. Optimization is not a one-time event, it is a habit, and the sites that practise it are the ones that compound their traffic into revenue over time.", ar: "قبل أن نغيّر نموذجاً أو زراً، نتفق على ما يبدو النجاح به بالأرقام. بعد الإطلاق، نقرأ تلك الأرقام. إن رفع نموذج متعدد الخطوات الاستفسارات، يبقى. إن لم يساعد تغيير، يُزال. هذا يُبقي الموقع صادقاً ويُبقي إنفاقك يعمل. التحسين ليس حدثاً لمرة واحدة، إنه عادة، والمواقع التي تمارسه هي التي تجمع حركتها في إيرادات مع الوقت." },
    },
    outcomes: {
      eyebrow: { en: "Why it matters", ar: "لماذا يهمّ" }, h2: { en: "What optimization changes", ar: "ما يغيّره التحسين" },
      lead: { en: "The same traffic, better tuned, brings more enquiries without spending more on ads.", ar: "الحركة نفسها، المضبوطة أفضل، تجلب استفسارات أكثر دون إنفاق أكثر على الإعلانات." },
      items: [
        { label: { en: "More enquiries", ar: "استفسارات أكثر" }, body: { en: "Less friction means more visitors reach out.", ar: "احتكاك أقل يعني وصول زوّار أكثر." } },
        { label: { en: "Better leads", ar: "عملاء أفضل" }, body: { en: "Multi-step forms filter out the unserious.", ar: "النماذج متعددة الخطوات ترشّح غير الجادين." } },
        { label: { en: "Lower cost per lead", ar: "تكلفة أقل للعميل" }, body: { en: "More conversions from the same traffic spend.", ar: "تحويلات أكثر من إنفاق الحركة نفسه." } },
      ],
    },
    faq: {
      eyebrow: { en: "Common questions", ar: "أسئلة شائعة" }, h2: { en: "Conversion optimization questions", ar: "أسئلة تحسين التحويل" },
      items: [
        { q: { en: "How much can conversion improve?", ar: "كم يمكن أن يتحسّن التحويل؟" }, a: { en: "Removing obvious frictions often lifts conversion meaningfully. Exact numbers depend on your starting point and traffic.", ar: "إزالة الاحتكاكات الواضحة غالباً ترفع التحويل بشكل معتبر. تعتمد الأرقام الدقيقة على نقطة بدايتك وحركتك." } },
        { q: { en: "Are multi-step forms always better?", ar: "هل النماذج متعددة الخطوات أفضل دائماً؟" }, a: { en: "For most enquiry and booking flows, yes. For very simple sign-ups, a short single form can still work.", ar: "لمعظم تدفقات الاستفسار والحجز، نعم. للاشتراكات البسيطة جداً، يمكن لنموذج واحد قصير أن يعمل بعد." } },
        { q: { en: "Do you run A/B tests?", ar: "هل تديرون اختبارات A/B؟" }, a: { en: "Once a site has enough traffic, yes. For lower-traffic sites, we apply proven patterns and measure the overall result.", ar: "حين يكون للموقع حركة كافية، نعم. للمواقع ذات الحركة الأقل، نطبّق أنماطاً مثبتة ونقيس النتيجة الإجمالية." } },
        { q: { en: "Can you add WhatsApp booking?", ar: "هل يمكنكم إضافة حجز واتساب؟" }, a: { en: "Yes. WhatsApp is a primary contact channel in Dubai, and we wire it in with pre-filled messages and context.", ar: "نعم. واتساب قناة تواصل أساسية في دبي، ونوصّله برسائل مملوءة مسبقاً وسياق." } },
        { q: { en: "Will optimization change my design?", ar: "هل سيغيّر التحسين تصميمي؟" }, a: { en: "Changes are usually subtle: clearer buttons, shorter forms, better page flow. The look stays, the effectiveness rises.", ar: "التغييرات عادة دقيقة: أزرار أوضح، نماذج أقصر، تدفّق صفحة أفضل. يبقى المظهر، وترتفع الفعالية." } },
        { q: { en: "How do you measure success?", ar: "كيف تقيسون النجاح؟" }, a: { en: "We agree the conversion metric up front, then track it after launch so you can see the difference in real numbers.", ar: "نتفق على مقياس التحويل مقدماً، ثم نتتبّعه بعد الإطلاق لترى الفرق بأرقام حقيقية." } },
      ],
    },
    cta: { heading: { en: "Want more enquiries from your traffic? Start the concept.", ar: "تريد استفسارات أكثر من حركتك؟ ابدأ المفهوم." } },
  },
  {
    slug: "mobile-ux",
    meta: { title: { en: "Mobile UX Optimization in Dubai | Mobile-First Web Design | Big Story", ar: "تحسين تجربة المستخدم على الجوال في دبي | تصميم ويب للجوال أولاً | بيك ستوري" }, description: { en: "Mobile UX optimization for Dubai websites. Most of your visitors arrive on a phone. We design and tune the mobile experience to load fast and convert.", ar: "تحسين تجربة المستخدم على الجوال لمواقع دبي. معظم زوّارك يصلون على هاتف. نصمّم ونضبط تجربة الجوال لتُحمَّل بسرعة وتتحوّل." } },
    breadcrumb: { en: "Mobile UX", ar: "تجربة الجوال" },
    hero: {
      eyebrow: { en: "Mobile UX optimization", ar: "تحسين تجربة الجوال" },
      h1: { en: "Mobile UX optimization for Dubai websites", ar: "تحسين تجربة الجوال لمواقع دبي" },
      lead: { en: "Most of your Dubai visitors will open your site on a phone, often on the move, often with one thumb. If the mobile experience is slow, cramped, or fiddly, they leave before they ever become an enquiry. We design and tune the mobile experience to be the primary one, fast and obvious. We design mobile-first, test on real devices at the sizes that matter, and place every call to action where a thumb can reach it. Fast pages, generous tap targets, and contact in two taps, because in Dubai the phone is where the decision is made.", ar: "معظم زوّار دبي سيفتحون موقعك على هاتف، غالباً أثناء التنقل، وغالباً بإبهام واحد. إن كانت تجربة الجوال بطيئة أو مكتظة أو صعبة، يغادرون قبل أن يصبحوا استفساراً أبداً. نصمّم ونضبط تجربة الجوال لتكون الأساسية، سريعة وواضحة. نصمّم للجوال أولاً، ونختبر على أجهزة حقيقية بالأحجام المهمة، ونضع كل دعوة عمل حيث يصلها إبهام. صفحات سريعة، وأهداف نقر سخيّة، وتواصل بنقرتين، لأن في دبي الهاتف حيث يُتَّخذ القرار." },
      promise: { en: "A desktop-first site adapted to mobile is not a mobile site. We build mobile-first from the first sketch.", ar: "الموقع الذي يبدأ بسطح المكتب ثم يُكيَّف للجوال ليس موقع جوال. نبني للجوال أولاً من أول رسم." },
    },
    sections: [
    {
      id: "mobile-first-dubai", n: "01",
      eyebrow: { en: "Why mobile first in Dubai", ar: "لماذا الجوال أولاً في دبي" },
      h2: { en: "In Dubai, the phone is where the decision starts and often where it finishes.", ar: "في دبي، الهاتف حيث يبدأ القرار وغالباً حيث ينتهي." },
      lead: { en: "Dubai is one of the most mobile-first markets on earth. People search, compare, and book on their phones, often entirely within one device. A site that treats mobile as secondary loses those people.", ar: "دبي أحد أكثر الأسواق تركيزاً على الجوال في العالم. يبحث الناس ويقارنون ويحجزون على هواتفهم، غالباً بالكامل ضمن جهاز واحد. الموقع الذي يعامل الجوال كثانوي يخسر أولئك الناس." },
      body: { en: "We design mobile-first because that is how Dubai actually browses. The small screen is where the typography has to hold, where the tap targets have to be generous, where the form has to fit a thumb, and where the call action has to be reachable without scrolling hunting. When the mobile experience is right, the desktop experience tends to take care of itself. When mobile is an afterthought, the site leaks visitors it worked hard to attract.", ar: "نصمّم للجوال أولاً لأن هذا كيف يتصفّح دبي فعلاً. الشاشة الصغيرة هي حيث يجب أن تتماسك الطباعة، وحيث يجب أن تكون أهداف النقر سخيّة، وحيث يجب أن يناسب النموذج إبهاماً، وحيث يجب أن تكون دعوة الفعل قابلة للوصول دون بحث بالتمرير. عندما تكون تجربة الجوال صحيحة، تميل تجربة سطح المكتب للاهتمام بنفسها. عندما يكون الجوال فكرة لاحقة، يتسرّب الموقع زوّاراً اجتهد في جذبهم." },
      list: [
        { en: "Dubai browsing is overwhelmingly mobile", ar: "تصفّح دبي مرجَّح للجوال بشكل ساحق" },
        { en: "Decisions start and end on the phone", ar: "القرارات تبدأ وتنتهي على الهاتف" },
        { en: "Mobile-first lifts desktop too", ar: "الجوال أولاً يرفع سطح المكتب أيضاً" },
      ],
    },
    {
      id: "thumb-zone", n: "02",
      eyebrow: { en: "Designed for thumbs", ar: "مصمّم للإبهام" },
      h2: { en: "A mobile site is used with one thumb. We design for that reality.", ar: "موقع الجوال يُستخدم بإبهام واحد. نصمّم لتلك الحقيقة." },
      lead: { en: "Most mobile browsing is one-handed. Tap targets, button placement, and navigation all have to work for a thumb reaching across a phone screen.", ar: "معظم تصفّح الجوال بيد واحدة. أهداف النقر ووضع الأزرار والتنقّل كلها يجب أن تعمل لإبهام يمتد عبر شاشة هاتف." },
      body: { en: "We place the important actions in the thumb zone, the comfortable reach area of a one-handed grip. Buttons are large enough to tap without aiming. Forms ask for input that is easy on a phone keyboard, with the right input types so the correct keyboard appears. Navigation is simple and reachable. None of this is glamorous, but it is the difference between a mobile page that feels natural and one that feels like a fight. People do not fight a website for long, they leave.", ar: "نضع الإجراءات المهمة في منطقة الإبهام، منطقة الوصول المريحة لقبضة بيد واحدة. الأزرار كبيرة بما يكفي للنقر دون تصويب. تطلب النماذج إدخالاً سهلاً على لوحة مفاتيح الهاتف، بأنواع الإدخال الصحيحة فتظهر اللوحة الصحيحة. التنقّل بسيط وقابل للوصول. لا شيء من هذا مبهِراً، لكنه الفرق بين صفحة جوال تبدو طبيعية وأخرى تبدو معركة. لا يحارب الناس موقعاً ويب طويلاً، يغادرون." },
      list: [
        { en: "Primary actions placed in the thumb zone", ar: "الإجراءات الأساسية في منطقة الإبهام" },
        { en: "Generous tap targets, no precise aiming", ar: "أهداف نقر سخيّة، لا تصويب دقيق" },
        { en: "Smart input types for the right keyboard", ar: "أنواع إدخال ذكية للوحة المفاتيح الصحيحة" },
      ],
    },
    {
      id: "speed", n: "03",
      eyebrow: { en: "Mobile speed", ar: "سرعة الجوال" },
      h2: { en: "A mobile page has about three seconds before a visitor gives up.", ar: "أمام صفحة الجوال نحو ثلاث ثوانٍ قبل أن يستسلم الزائر." },
      lead: { en: "Mobile connections vary across the UAE. A page tuned to load in three seconds on a good connection still has to be usable on a weaker one.", ar: "اتصالات الجوال تختلف عبر الإمارات. الصفحة المضبوطة لتُحمَّل في ثلاث ثوانٍ على اتصال جيد يجب أن تظل قابلة للاستخدام على اتصال أضعف." },
      body: { en: "We keep mobile pages lean. Images are served at the size the screen needs, in modern formats, and only when they enter view. Fonts and scripts are minimised. The first meaningful paint, the moment the visitor sees something useful, is what we optimise for, because that is the moment the visitor decides whether to wait. A fast mobile page is not just a courtesy, it is the line between a visitor who stays and one who taps back to the search results.", ar: "نُبقي صفحات الجوال رشيقة. تُقدَّم الصور بالحجم الذي تحتاجه الشاشة، بتنسيقات حديثة، وفقط عندما تدخل العرض. تُقلَّل الخطوط والنصوص البرمجية. أول رسم ذو معنى، لحظة رؤية الزائر لشيء مفيد، هو ما نُحسّن من أجله، لأن تلك اللحظة هي حيث يقرر الزائر ما إذا كان سينتظر. صفحة الجوال السريعة ليست مجاملة فحسب، إنها الخط بين زائر يبقى وزائر ينقر رجوع إلى نتائج البحث." },
      list: [
        { en: "Right-sized images in modern formats", ar: "صور بالحجم الصحيح بتنسيقات حديثة" },
        { en: "Minimal fonts and scripts", ar: "خطوط ونصوص برمجية أدنى" },
        { en: "First meaningful paint prioritised", ar: "أول رسم ذو معنى بأولوية" },
      ],
    },
    {
      id: "forms-and-contact", n: "04",
      eyebrow: { en: "Forms and contact", ar: "النماذج والتواصل" },
      h2: { en: "On mobile, contacting you has to take seconds, not a wrestle.", ar: "على الجوال، يجب أن يستغرق التواصل معك ثوانٍ، لا مصارعة." },
      lead: { en: "A contact form that is hard to fill on a phone is a contact form nobody fills. We make mobile contact effortless, with WhatsApp and call options right where thumbs reach.", ar: "نموذج التواصل الصعب ملؤه على هاتف هو نموذج لا يملؤه أحد. نجعل تواصل الجوال بلا جهد، مع خيارات واتساب والمكالمة حيث تصل الإبهام." },
      body: { en: "Dubai visitors love WhatsApp. We place a clear WhatsApp action within thumb reach on every key page, pre-filled with context so the visitor does not have to type. Where a form is right, it is short, single-column, and uses the correct mobile input types so the right keyboard appears. Tap-to-call is available where it helps. The goal is that a visitor who wants to reach you can do it in two taps, because every extra tap is a visitor lost.", ar: "يحبّ زوّار دبي واتساب. نضع إجراء واتساب واضحاً في متناول الإبهام على كل صفحة مهمة، مملوءاً مسبقاً بسياق فلا يحتاج الزائر للكتابة. حيث يكون النموذج مناسباً، يكون قصيراً، بعمود واحد، ويستخدم أنواع إدخال الجوال الصحيحة فتظهر لوحة المفاتيح الصحيحة. النقر للاتصال متاح حيث يساعد. الهدف أن الزائر الذي يريد الوصول إليك يستطيع ذلك بنقرتين، لأن كل نقرة إضافية زائر مفقود." },
      list: [
        { en: "WhatsApp action in thumb reach, pre-filled", ar: "إجراء واتساب في متناول الإبهام، مملوء مسبقاً" },
        { en: "Short single-column forms", ar: "نماذج قصيرة بعمود واحد" },
        { en: "Tap-to-call where it helps", ar: "نقر للاتصال حيث يساعد" },
      ],
    },
    {
      id: "mobile-and-local", n: "05",
      eyebrow: { en: "Mobile and local search", ar: "الجوال والبحث المحلي" },
      h2: { en: "Dubai local search happens on a phone, and your mobile site is where you win or lose it.", ar: "بحث دبي المحلي يجري على هاتف، وموقعك على الجوال حيث تربحه أو تخسره." },
      lead: { en: "When someone searches for a service near them, they are on mobile, they are ready to act, and they decide in seconds. Your mobile site has to close that decision.", ar: "حين يبحث شخص عن خدمة قربه، يكون على الجوال، جاهزاً للتصرف، ويقرر في ثوانٍ. يجب أن يُغلق موقعك على الجوال ذلك القرار." },
      body: { en: "A huge share of Dubai commercial search has local intent. People search for a dentist near their office, a clinic close to home, a photographer in their neighbourhood, a service they need today, not next week. These searches happen on phones, and the searcher is usually close to a decision. They look at the map results, they tap the top two or three sites, and they contact whichever one makes it easiest. If your mobile site is slow, cluttered, or hard to contact, you lose that searcher to a competitor whose site is not. Local mobile UX is where the money is, because these are the visitors with intent, with proximity, and with urgency. Winning them is less about being the biggest brand and more about being the easiest to contact on the device they are already holding.", ar: "حصة ضخمة من بحث دبي التجاري له نية محلية. يبحث الناس عن طبيب أسنان قرب مكتبهم، عيادة قرب المنزل، مصور في حيّهم، خدمة يحتاجونها اليوم، لا الأسبوع المقبل. تجري هذه الأبحاث على هواتف، والباحث عادةً قريب من قرار. ينظرون إلى نتائج الخريطة، ينقرون أعلى موقعين أو ثلاثة، ويتواصلون مع أيهما يجعله أسهل. إن كان موقعك على الجوال بطيئاً أو مكتظاً أو صعب التواصل، تخسر ذلك الباحث لمنافس موقعُه ليس كذلك. تجربة الجوال المحلية حيث المال، لأن هؤلاء الزوّار بنية وقرب وإلحاح. كسبهم أقل بكونك العلامة الأكبر وأكثر بكونك الأسهل تواصلاً على الجهاز الذي يمسكونه بالفعل." },
      list: [
        { en: "Local intent searches convert fastest", ar: "عمليات البحث ذات النية المحلية تتحوّل أسرع" },
        { en: "Searchers decide in seconds on mobile", ar: "الباحثون يقررون في ثوانٍ على الجوال" },
        { en: "Easiest to contact wins, not biggest brand", ar: "الأسهل تواصلاً يربح، لا العلامة الأكبر" },
      ],
    },
    {
      id: "keyboards", n: "06",
      eyebrow: { en: "Keyboards and input", ar: "لوحات المفاتيح والإدخال" },
      h2: { en: "The right keyboard appearing for the right field is a small thing that removes real friction.", ar: "ظهور لوحة المفاتيح الصحيحة للحقل الصحيح شيء صغير يزيل احتكاكاً حقيقياً." },
      lead: { en: "Typing on a phone is slow. We tune every input so the visitor gets the easiest keyboard for the job.", ar: "الكتابة على هاتف بطيئة. نضبط كل إدخال ليحصل الزائر على أسهل لوحة مفاتيح للوظيفة." },
      body: { en: "A mobile form that shows a full alphabetic keyboard for a phone number field is a form that wastes the visitor's time. We set the correct input type on every field, so a phone number brings up the numeric keypad, an email brings up the keyboard with the at symbol easy to reach, and a date brings up a date picker. These are small details, but on mobile they compound. A form that respects the keyboard, keeps each step short, and avoids asking for anything that can be inferred will be finished far more often than one that treats the phone like a desktop. Dubai visitors on the move have no patience for clumsy input, and they should not need any. We remove every typing friction we can find, because the enquiry is the whole point.", ar: "نموذج الجوال الذي يُظهر لوحة مفاتيح أبجدية كاملة لحقل رقم هاتف هو نموذج يضيّع وقت الزائر. نضبط نوع الإدخال الصحيح على كل حقل، بحيث يجلب رقم الهاتف لوحة الأرقام، ويجلب البريد الإلكتروني لوحة برمز at في متناول اليد، ويجلب التاريخ منتقياً. هذه تفاصيل صغيرة، لكنها على الجوال تتجمّع. النموذج الذي يحترم لوحة المفاتيح، ويُبقي كل خطوة قصيرة، ويتجنّب طلب أي شيء يمكن استنتاجه، يُنهى أكثر بكثير من الذي يعامل الهاتف كسطح مكتب. زوّار دبي أثناء التنقل ليس لديهم صبر لإدخال أخرق، ولا ينبغي أن يحتاجوا أي صبر. نزيل كل احتكاك كتابة نستطيع إيجاده، لأن الاستفسار هو الغاية كلها." },
      list: [
        { en: "Correct input type on every field", ar: "نوع إدخال صحيح على كل حقل" },
        { en: "Numeric keypad for numbers, date pickers for dates", ar: "لوحة أرقام للأرقام، منتقي تواريخ للتواريخ" },
        { en: "Short steps beat long forms on mobile", ar: "الخطوات القصيرة تتفوّق على النماذج الطويلة على الجوال" },
      ],
    },
    {
      id: "common-mistakes", n: "07",
      eyebrow: { en: "Common mistakes", ar: "أخطاء شائعة" },
      h2: { en: "The mobile mistakes that quietly cost Dubai businesses their best visitors.", ar: "أخطاء الجوال التي تكلّف شركات دبي أفضل زوّارها بهدوء." },
      lead: { en: "Dubai visitors are mobile and impatient. These are the mistakes that send them to a competitor.", ar: "زوّار دبي على الجوال وغير صبورين. هذه الأخطاء التي ترسلهم لمنافس." },
      body: { en: "The first mistake is treating mobile as a resized desktop, with tiny tap targets, cramped text, and horizontal scrolling. The second is the slow mobile page, often caused by oversized images or heavy scripts, which loses the visitor before the content appears. The third is the intrusive popup, covering the small screen the moment the visitor arrives and demanding an action before they have even read anything. The fourth is the contact flow that requires typing, when a WhatsApp tap would have done. The fifth is hiding essential information like price, location, or hours behind extra taps, when the mobile visitor wanted it immediately. Each of these is common, each is fixable, and fixing them recovers the visitors your marketing already paid to bring to the door.", ar: "الخطأ الأول معاملة الجوال كسطح مكتب مُغيَّر الحجم، بأهداف نقر صغيرة ونص مكتظ وتمرير أفقي. الثاني صفحة الجوال البطيئة، غالباً بسبب صور كبيرة الحجم أو نصوص ثقيلة، التي تخسر الزائر قبل ظهور المحتوى. الثالث النافذة المنبثقة المتطفّلة، التي تغطّي الشاشة الصغيرة لحظة وصول الزائر وتطالب بإجراء قبل أن يقرأ أي شيء. الرابع تدفّق التواصل الذي يتطلب كتابة، حين كان نقر واتساب سيكفي. الخامس إخفاء معلومات أساسية كالسعر أو الموقع أو الساعات خلف نقرات إضافية، حين أراد زائر الجوال إياها فوراً. كل واحد من هذه شائع، وكل قابل للإصلاح، وإصلاحها يسترجع الزوّار الذين دفع تسويقك بالفعل لإحضارهم إلى الباب." },
      list: [
        { en: "Tiny tap targets and cramped text", ar: "أهداف نقر صغيرة ونص مكتظ" },
        { en: "Slow pages and intrusive popups", ar: "صفحات بطيئة ونوافذ منبثقة متطفّلة" },
        { en: "Hiding price and location behind taps", ar: "إخفاء السعر والموقع خلف نقرات" },
      ],
    },
    ],
    deliverables: {
      eyebrow: { en: "What you get", ar: "ما تحصل عليه" }, h2: { en: "The mobile UX deliverables", ar: "مخرجات تجربة الجوال" },
      items: [
        { en: "A mobile-first design tested on real devices", ar: "تصميم للجوال أولاً مُختبَر على أجهزة حقيقية" },
        { en: "Tap targets and actions in the thumb zone", ar: "أهداف نقر وإجراءات في منطقة الإبهام" },
        { en: "Lean, fast-loading mobile pages", ar: "صفحات جوال رشيقة سريعة التحميل" },
        { en: "WhatsApp and tap-to-call wired in", ar: "واتساب ونقر للاتصال موصّلان" },
        { en: "Short, mobile-friendly forms", ar: "نماذج قصيرة صديقة للجوال" },
      ],
    },
    approach: {
      eyebrow: { en: "How we approach it", ar: "كيف نتعامل معه" }, h2: { en: "We design the mobile view first, then expand up.", ar: "نصمّم عرض الجوال أولاً، ثم نتوسّع صعوداً." },
      lead: { en: "Starting from the small screen forces honest decisions about what matters. The desktop view inherits that clarity.", ar: "البدء من الشاشة الصغيرة يفرض قرارات صادقة عمّا يهمّ. عرض سطح المكتب يرث تلك الوضوح." },
      body: { en: "When you design mobile-first, you cannot hide behind whitespace. Every element has to earn its place on a small screen, which means the final site has less clutter and more purpose. We sketch the mobile view before the desktop view, test it on real phones at real sizes, and only then expand the layout for larger screens. The result is a site that works beautifully on the device most of your visitors actually hold.", ar: "عندما تصمّم للجوال أولاً، لا تستطيع الاختباء خلف المساحات البيضاء. كل عنصر يجب أن يكسب مكانه على شاشة صغيرة، ما يعني أن الموقع النهائي يحمل فوضى أقل وهدفاً أكثر. نرسم عرض الجوال قبل عرض سطح المكتب، ونختبره على هواتف حقيقية بأحجام حقيقية، وعندها فقط نوسّع التنسيق للشاشات الأكبر. النتيجة موقع يعمل بجمال على الجهاز الذي يمسكه معظم زوّارك فعلاً." },
    },
    outcomes: {
      eyebrow: { en: "Why it matters", ar: "لماذا يهمّ" }, h2: { en: "What mobile UX changes", ar: "ما تغيّره تجربة الجوال" },
      lead: { en: "A fast, thumb-friendly mobile site keeps the visitors your marketing worked to attract.", ar: "موقع جوال سريع صديق للإبهام يبقي الزوّار الذين اجتهد تسويقك في جذبهم." },
      items: [
        { label: { en: "Lower bounce", ar: "ارتداد أقل" }, body: { en: "Fast, clear mobile pages keep visitors instead of losing them.", ar: "صفحات جوال سريعة وواضحة تُبقي الزوّار بدلاً من خسارتهم." } },
        { label: { en: "More contact", ar: "تواصل أكثر" }, body: { en: "WhatsApp and short forms turn mobile visits into messages.", ar: "واتساب والنماذج القصيرة تحوّل زيارات الجوال إلى رسائل." } },
        { label: { en: "Better ranking", ar: "ترتيب أفضل" }, body: { en: "Google ranks mobile-first, so a strong mobile site ranks better.", ar: "جوجل تتصدّر للجوال أولاً، فموقع الجوال القوي يتصدّر أفضل." } },
      ],
    },
    faq: {
      eyebrow: { en: "Common questions", ar: "أسئلة شائعة" }, h2: { en: "Mobile UX questions", ar: "أسئلة تجربة الجوال" },
      items: [
        { q: { en: "My site is already responsive. Is that not enough?", ar: "موقعي متجاوب بالفعل. أليس هذا كافياً؟" }, a: { en: "Responsive means it fits a phone screen. Mobile-first means it was designed for one. The difference shows in speed, usability, and conversion.", ar: "المتجاوب يعني أنه يناسب شاشة هاتف. للجوال أولاً يعني أنه صُمّم لأجلها. يظهر الفرق في السرعة وقابلية الاستخدام والتحويل." } },
        { q: { en: "Do you test on real devices?", ar: "هل تختبرون على أجهزة حقيقية؟" }, a: { en: "Yes. We test at the small screen sizes that matter, on real phones, not just in a browser resize.", ar: "نعم. نختبر بأحجام الشاشة الصغيرة المهمة، على هواتف حقيقية، لا فقط في تغيير حجم المتصفح." } },
        { q: { en: "Will mobile optimization slow my desktop site?", ar: "هل سيبطّئ تحسين الجوال موقع سطح المكتب؟" }, a: { en: "No. Mobile-first design usually makes the whole site faster and cleaner, desktop included.", ar: "لا. تصميم الجوال أولاً عادة يجعل الموقع كله أسرع وأنظف، بما فيه سطح المكتب." } },
        { q: { en: "Can you add WhatsApp buttons?", ar: "هل يمكنكم إضافة أزرار واتساب؟" }, a: { en: "Yes, with pre-filled messages and context, placed in the thumb zone on key pages.", ar: "نعم، برسائل مملوءة مسبقاً وسياق، في منطقة الإبهام على الصفحات المهمة." } },
        { q: { en: "How fast should a mobile page load?", ar: "كم يجب أن تكون سرعة تحميل صفحة الجوال؟" }, a: { en: "We aim for a first meaningful paint under three seconds on a typical mobile connection.", ar: "نهدف لأول رسم ذو معنى تحت ثلاث ثوانٍ على اتصال جوال نموذجي." } },
        { q: { en: "Does mobile UX affect SEO?", ar: "هل تؤثر تجربة الجوال على السيو؟" }, a: { en: "Yes. Google uses mobile-first indexing, so your mobile experience directly affects rankings.", ar: "نعم. تستخدم جوجل فهرسة الجوال أولاً، فتجربة الجوال تؤثر مباشرة على الترتيب." } },
      ],
    },
    cta: { heading: { en: "Want a mobile site that actually converts? Start the concept.", ar: "تريد موقع جوال يتحوّل فعلاً؟ ابدأ المفهوم." } },
  },
  {
    slug: "performance",
    meta: { title: { en: "Core Web Vitals and Performance Optimization in Dubai | Big Story", ar: "مؤشرات الويب الأساسية وتحسين الأداء في دبي | بيك ستوري" }, description: { en: "Core Web Vitals and website performance optimization for Dubai sites. Fast load times, stable layout, and quick interactivity that rank and convert.", ar: "مؤشرات الويب الأساسية وتحسين أداء المواقع لمواقع دبي. أوقات تحميل سريعة، تنسيق مستقر، وتفاعلية سريعة تتصدّر وتتحوّل." } },
    breadcrumb: { en: "Core Web Vitals and performance", ar: "مؤشرات الويب والأداء" },
    hero: {
      eyebrow: { en: "Core Web Vitals and performance", ar: "مؤشرات الويب الأساسية والأداء" },
      h1: { en: "Core Web Vitals and performance optimization for Dubai websites", ar: "مؤشرات الويب الأساسية وتحسين الأداء لمواقع دبي" },
      lead: { en: "Speed is a ranking signal and a conversion signal. We build and tune your site to pass the Core Web Vitals thresholds Google measures, so it loads fast, stays stable, and responds the moment a visitor interacts with it. Speed is a ranking signal and a trust signal at once. We build with a performance budget from day one, ship lean code and right-sized images, and prove the result in numbers after launch, not with promises before it.", ar: "السرعة إشارة ترتيب وإشارة تحويل. نبني ونضبط موقعك ليجتاز عتبات مؤشرات الويب الأساسية التي تقيسها جوجل، ليُحمَّل بسرعة، ويبقى مستقراً، ويستجيب لحظة تفاعل الزائر معه. السرعة إشارة ترتيب وإشارة ثقة معاً. نبني بميزانية أداء منذ اليوم الأول، ونُسلّم كوداً رشيقاً وصوراً بالحجم الصحيح، ونُثبت النتيجة بأرقام بعد الإطلاق، لا بوعود قبله." },
      promise: { en: "A fast site ranks better and converts better. We treat performance as part of the build, not an afterthought. A fast page ranks better, holds visitors longer, and earns trust in the first second, before a single word is read.", ar: "الموقع السريع يتصدّر أفضل ويتحوّل أفضل. نعامل الأداء كجزء من البناء، لا فكرة لاحقة. الصفحة السريعة تتصدّر أفضل، وتُبقي الزوّار أطول، وتكسب الثقة في الثانية الأولى، قبل قراءة كلمة واحدة." },
    },
    sections: [
    {
      id: "what-core-web-vitals", n: "01",
      eyebrow: { en: "What Core Web Vitals are", ar: "ما هي مؤشرات الويب الأساسية" },
      h2: { en: "Three numbers Google uses to judge how your site actually feels.", ar: "ثلاثة أرقام تستخدمها جوجل للحكم على شعور موقعك فعلاً." },
      lead: { en: "Core Web Vitals are three measurements of real user experience: how fast content appears, how stable the layout is, and how quickly the page responds to input.", ar: "مؤشرات الويب الأساسية ثلاثة قياسات لتجربة المستخدم الحقيقية: كم سرعة ظهور المحتوى، وكم استقرار التنسيق، وكم سرعة استجابة الصفحة للإدخال." },
      body: { en: "The three vitals are Largest Contentful Paint, which measures when the main content visibly loads, Cumulative Layout Shift, which measures how much the page jumps around as it loads, and Interaction to Next Paint, which measures how fast the page responds to a tap or click. Google uses these as ranking signals because they reflect what a visitor actually experiences. A site that scores poorly feels janky and slow, and visitors leave. We build to pass these thresholds on the devices and connections your Dubai visitors actually use.", ar: "المؤشرات الثلاثة هي Largest Contentful Paint، الذي يقيس متى يُحمَّل المحتوى الرئيسي بشكل مرئي، وCumulative Layout Shift، الذي يقيس كم تقفز الصفحة أثناء التحميل، وInteraction to Next Paint، الذي يقيس سرعة استجابة الصفحة لنقر أو نقرة. تستخدم جوجل هذه كإشارات ترتيب لأنها تعكس ما يختبره الزائر فعلاً. الموقع صاحب النتيجة الضعيفة يبدو متقطعاً وبطيئاً، ويغادر الزوّار. نبني لنجتاز هذه العتبات على الأجهزة والاتصالات التي يستخدمها زوّار دبي فعلاً." },
      list: [
        { en: "Largest Contentful Paint, when content loads", ar: "Largest Contentful Paint، متى يُحمَّل المحتوى" },
        { en: "Cumulative Layout Shift, how stable it stays", ar: "Cumulative Layout Shift، كم يبقى مستقراً" },
        { en: "Interaction to Next Paint, how fast it responds", ar: "Interaction to Next Paint، كم يستجيب بسرعة" },
      ],
    },
    {
      id: "why-it-ranks", n: "02",
      eyebrow: { en: "Why speed ranks", ar: "لماذا تتصدّر السرعة" },
      h2: { en: "Google rewards fast sites because visitors reward fast sites.", ar: "جوجل تكافئ المواقع السريعة لأن الزوّار يكافئون المواقع السريعة." },
      lead: { en: "A fast site keeps visitors. A slow one loses them back to the search results. Google has learned to measure this, and it ranks accordingly.", ar: "الموقع السريع يُبقي الزوّار. البطيء يفقدهم إلى نتائج البحث. تعلّمت جوجل قياس ذلك، وتتصدّر وفقاً له." },
      body: { en: "When a visitor clicks your result and the page is slow, they often tap back to Google and click the next result. Google sees this behaviour and treats it as a signal that your page did not satisfy the search. Over time, slow pages drift down the rankings even if their content is good, because the engagement signal is weak. Fast pages hold visitors, which sends a positive signal, which lifts rankings. Performance is not separate from SEO, it is part of how SEO works now.", ar: "عندما ينقر زائر نتيجتك والصفحة بطيئة، غالباً ينقر رجوع إلى جوجل وينقر النتيجة التالية. ترى جوجل هذا السلوك وتعامله كإشارة أن صفحتك لم تُشبع البحث. مع الوقت، تنجرف الصفحات البطيئة لأسفل الترتيب حتى لو كان محتواها جيداً، لأن إشارة التفاعل ضعيفة. الصفحات السريعة تُبقي الزوّار، ما يرسل إشارة إيجابية، ما يرفع الترتيب. الأداء ليس منفصلاً عن السيو، إنه جزء من كيفية عمل السيو الآن." },
      list: [
        { en: "Slow pages lose visitors back to search", ar: "الصفحات البطيئة تخسر زوّار إلى البحث" },
        { en: "Google reads engagement as a quality signal", ar: "جوجل تقرأ التفاعل كإشارة جودة" },
        { en: "Performance is now part of SEO", ar: "الأداء الآن جزء من السيو" },
      ],
    },
    {
      id: "how-we-tune", n: "03",
      eyebrow: { en: "How we tune it", ar: "كيف نضبطه" },
      h2: { en: "We ship less code, smarter images, and a stable layout from the first paint.", ar: "نُسلّم كوداً أقل، وصوراً أذكى، وتنسيقاً مستقراً من أول رسم." },
      lead: { en: "Performance comes from restraint. Less JavaScript, right-sized images, reserved space for content, and a layout that never shifts under the visitor's eye.", ar: "الأداء يأتي من ضبط النفس. JavaScript أقل، صور بالحجم الصحيح، مساحة محجوزة للمحتوى، وتنسيق لا يتحرك أبداً تحت عين الزائر." },
      body: { en: "We ship the minimum JavaScript the page needs, often far less than a template would. We serve images in modern formats at the exact size each screen requires, and we reserve their space so the layout never jumps as they load. We preload the fonts and resources that matter and defer the ones that do not. We avoid the third-party scripts that quietly bloat a page. Every one of these choices is invisible to the visitor, but together they make the site feel instant, and that feeling is what keeps people from leaving.", ar: "نُسلّم أدنى JavaScript تحتاجه الصفحة، غالباً أقل بكثير مما يفعله قالب. نقدّم الصور بتنسيقات حديثة بالحجم الدقيق الذي يتطلبه كل شاشة، ونحجز مساحتها فلا يقفز التنسيق أثناء تحميلها. نُحمّل مسبقاً الخطوط والموارد المهمة ونؤجّل التي لا تهمّ. نتجنّب النصوص البرمجية الخارجية التي تنتفخ الصفحة بهدوء. كل واحد من هذه الخيارات غير مرئي للزائر، لكن معاً تجعل الموقع يبدو لحظياً، وهذا الشعور هو ما يُبقي الناس من المغادرة." },
      list: [
        { en: "Minimal JavaScript, server-rendered pages", ar: "JavaScript أدنى، صفحات معروضة على الخادم" },
        { en: "Modern image formats, right-sized", ar: "تنسيقات صور حديثة، بالحجم الصحيح" },
        { en: "Reserved space so layout never shifts", ar: "مساحة محجوزة فلا يتحرك التنسيق" },
      ],
    },
    {
      id: "measuring", n: "04",
      eyebrow: { en: "Measuring and proving", ar: "القياس والإثبات" },
      h2: { en: "We measure before launch and report the numbers after.", ar: "نقيس قبل الإطلاق ونبلغ بالأرقام بعده." },
      lead: { en: "Performance claims mean nothing without numbers. We measure your site against the real thresholds and hand you the results.", ar: "ادعاءات الأداء لا تعني شيئاً دون أرقام. نقيس موقعك مقابل العتبات الحقيقية ونسلّمك النتائج." },
      body: { en: "Before launch, we run your site through the same field and lab measurements Google uses, on mobile, where most of your traffic is. We fix anything that falls short. After launch, we can hand you a performance report showing the Core Web Vitals scores in plain numbers, so you are not taking our word for it. A site that claims to be fast without measurement is just a site with an opinion. We prefer to show you the proof.", ar: "قبل الإطلاق، نُجري موقعك عبر قياسات الحقل والمختبر نفسها التي تستخدمها جوجل، على الجوال، حيث معظم حركتك. نُصلح أي شيء يقصر. بعد الإطلاق، يمكننا تسليمك تقرير أداء يُظهر نتائج مؤشرات الويب الأساسية بأرقام واضحة، فلا تأخذ كلمتنا وحدها. الموقع الذي يدّعي السرعة دون قياس هو موقع برأي فحسب. نُفضّل أن نريك الدليل." },
      list: [
        { en: "Lab and field measurements before launch", ar: "قياسات المختبر والحقل قبل الإطلاق" },
        { en: "Mobile-first, where your traffic is", ar: "الجوال أولاً، حيث حركتك" },
        { en: "Plain-number report after launch", ar: "تقرير بأرقام واضحة بعد الإطلاق" },
      ],
    },
    {
      id: "performance-and-trust", n: "05",
      eyebrow: { en: "Performance and trust", ar: "الأداء والثقة" },
      h2: { en: "A slow site feels untrustworthy before a visitor reads a single word.", ar: "الموقع البطيء يبدو غير موثوق قبل أن يقرأ الزائر كلمة واحدة." },
      lead: { en: "Speed is not just a technical metric. It is a first impression, and visitors judge trust by it instantly.", ar: "السرعة ليست مقياساً تقنياً فحسب. إنها انطباع أول، والزوّار يحكمون على الثقة به فوراً." },
      body: { en: "Research on web behaviour keeps finding the same thing: visitors associate speed with credibility. A site that loads quickly feels professional and current. A site that stalls feels neglected, outdated, or worse, suspicious. This judgement happens below conscious thought, in the first second, before the visitor has read your headline or seen your offer. You cannot talk a visitor out of that first impression with good copy, because the impression was already formed by the loading bar. This is why performance is not a technical afterthought but a trust decision. A fast site starts every visitor relationship from a position of credibility, and a slow one starts from a hole it has to climb out of. In Dubai, where expectations are high and attention is short, that head start matters more than ever.", ar: "يستمر البحث في سلوك الويب في إيجاد الشيء نفسه: يربط الزوّار السرعة بالمصداقية. الموقع الذي يُحمَّل بسرعة يبدو مهنياً وحالياً. الموقع الذي يتعثّر يبدو مهجوراً أو قديماً أو أسوأ، مريباً. يحدث هذا الحكم تحت الفكر الواعي، في الثانية الأولى، قبل أن يقرأ الزائر عنوانك أو يرى عرضك. لا يمكنك إقناع زائر بالخروج من ذلك الانطباع الأول بنسخة جيدة، لأن الانطباع تشكّل بالفعل من شريط التحميل. لهذا الأداء ليس فكرة تقنية لاحقة بل قرار ثقة. الموقع السريع يبدأ كل علاقة زائر من موضع مصداقية، والبطيء يبدأ من حفرة عليه تسلّقها. في دبي، حيث التوقعات عالية والانتباه قصير، تلك البداية المتقدمة تهمّ أكثر من أي وقت." },
      list: [
        { en: "Speed signals credibility instantly", ar: "السرعة تشير للمصداقية فوراً" },
        { en: "First impressions form before reading", ar: "الانطباعات الأولى تتشكّل قبل القراءة" },
        { en: "Fast sites start from trust", ar: "المواقع السريعة تبدأ من الثقة" },
      ],
    },
    {
      id: "performance-budget", n: "06",
      eyebrow: { en: "The performance budget", ar: "ميزانية الأداء" },
      h2: { en: "A performance budget keeps the site fast even as it grows.", ar: "ميزانية الأداء تُبقي الموقع سريعاً حتى وهو ينمو." },
      lead: { en: "Without a budget, sites slowly bloat as features get added. A budget makes every addition justify its weight.", ar: "دون ميزانية، تنتفخ المواقع ببطء مع إضافة الميزات. الميزانية تجعل كل إضافة تبرّر وزنها." },
      body: { en: "A performance budget is an agreement we hold to: the site will not ship more than a certain amount of JavaScript, more than a certain page weight, or slower than a certain first paint, and every new feature has to fit inside that envelope or replace something else. This sounds rigid, but it is what keeps a site fast over years instead of weeks. Most slow sites were not built slow. They grew slow, one reasonable-looking addition at a time, until the weight added up. A budget stops that drift. When someone wants to add a heavy analytics script, a chat widget, or a third-party animation library, the budget asks whether it is worth the cost, and often the honest answer is no. The result is a site that stays quick as it matures, which is the only kind of site worth maintaining.", ar: "ميزانية الأداء اتفاق نتمسّك به: لن يُسلّم الموقع أكثر من قدر معيّن من JavaScript، أو أكثر من وزن صفحة معيّن، أو أبطأ من رسم أول معيّن، وكل ميزة جديدة يجب أن تناسب ذلك الظرف أو تستبدل شيئاً آخر. يبدو هذا جامداً، لكنه ما يُبقي موقعاً سريعاً لسنوات بدلاً من أسابيع. معظم المواقع البطيئة لم تُبنَ بطيئة. نمت بطيئة، إضافة معقولة المظهر واحدة في كل مرة، حتى تجمّع الوزن. الميزانية توقف ذلك الانجراف. عندما يريد أحدهم إضافة نص برمجي تحليلات ثقيل، أو ودجة دردشة، أو مكتبة حركة خارجية، تسأل الميزانية ما إذا كانت تستحق التكلفة، وغالباً الإجابة الصادقة لا. النتيجة موقع يبقى سريعاً وهو ينضج، وهو النوع الوحيد من المواقع الذي يستحق الصيانة." },
      list: [
        { en: "A cap on JavaScript and page weight", ar: "سقف على JavaScript ووزن الصفحة" },
        { en: "Every addition must justify itself", ar: "كل إضافة يجب أن تبرّر نفسها" },
        { en: "Stops the slow drift of feature creep", ar: "يوقف الانجراف البطيء لزحف الميزات" },
      ],
    },
    {
      id: "common-mistakes", n: "07",
      eyebrow: { en: "Common mistakes", ar: "أخطاء شائعة" },
      h2: { en: "The performance mistakes that drag otherwise good sites down.", ar: "أخطاء الأداء التي تسحب مواقع جيدة وإلا إلى الأسفل." },
      lead: { en: "Speed problems are rarely caused by one big thing. They accumulate from many small choices. These are the common ones.", ar: "مشاكل السرعة نادراً يسببها شيء كبير واحد. تتراكم من اختيارات صغيرة كثيرة. هذه الشائعة." },
      body: { en: "The first drag is unoptimized images, served at desktop resolution to a phone, in heavy formats, multiplying the page weight many times over. The second is excessive JavaScript, where frameworks and libraries are loaded for effects that could be achieved with far less. The third is layout shift, where ads, images, or fonts load late and shove the content around, making the page feel unstable. The fourth is render-blocking resources, where the browser waits on scripts before it can paint anything. The fifth is the pile of third-party trackers, each small alone but together adding seconds to the load. We address each of these systematically, because performance is recovered not by one heroic fix but by removing a dozen small burdens that were never necessary in the first place.", ar: "السحب الأول صور غير مُحسَّنة، تُقدَّم بدقة سطح المكتب إلى هاتف، بتنسيقات ثقيلة، تضاعف وزن الصفحة مرات كثيرة. الثاني JavaScript مفرط، حيث تُحمَّل أطر ومكتبات لتأثيرات يمكن تحقيقها بأقل بكثير. الثالث تحرّك التنسيق، حيث تُحمَّل الإعلانات أو الصور أو الخطوط متأخرة وتدفع المحتوى، ما يجعل الصفحة تبدو غير مستقرة. الرابع موارد تعيق العرض، حيث ينتظر المتصفح النصوص قبل أن يستطيع رسم أي شيء. الخامس كومة المتتبّعات الخارجية، كل واحد صغير وحده لكن معاً تضيف ثوانٍ للتحميل. نعالج كل واحد من هذه بشكل منهجي، لأن الأداء يُسترجَع لا بإصلاح بطولي واحد بل بإزالة دزينة أعباء صغيرة لم تكن ضرورية أصلاً." },
      list: [
        { en: "Unoptimized, oversized images", ar: "صور غير مُحسَّنة كبيرة الحجم" },
        { en: "Excessive JavaScript and render-blocking", ar: "JavaScript مفرط وإعاقة العرض" },
        { en: "Piles of third-party trackers", ar: "كومات من المتتبّعات الخارجية" },
      ],
    },
    ],
    deliverables: {
      eyebrow: { en: "What you get", ar: "ما تحصل عليه" }, h2: { en: "The performance deliverables", ar: "مخرجات الأداء" },
      items: [
        { en: "A site built to pass Core Web Vitals thresholds", ar: "موقع مبني ليجتاز عتبات مؤشرات الويب الأساسية" },
        { en: "Lean, server-rendered pages with minimal JavaScript", ar: "صفحات رشيقة معروضة على الخادم بـJavaScript أدنى" },
        { en: "Modern, right-sized images that never shift layout", ar: "صور حديثة بالحجم الصحيح لا تحرّك التنسيق أبداً" },
        { en: "Mobile-first performance tuned for UAE connections", ar: "أداء للجوال أولاً مضبوط لاتصالات الإمارات" },
        { en: "A plain-number performance report after launch", ar: "تقرير أداء بأرقام واضحة بعد الإطلاق" },
        { en: "A performance budget held to as the site grows", ar: "ميزانية أداء يُتمسَّك بها مع نمو الموقع" },
      ],
    },
    approach: {
      eyebrow: { en: "How we approach it", ar: "كيف نتعامل معه" }, h2: { en: "Restraint is the fastest feature we can ship.", ar: "ضبط النفس أسرع ميزة نستطيع تسليمها." },
      lead: { en: "The fastest line of code is the one we never write. We add only what earns its place.", ar: "أسرع سطر كود هو الذي لا نكتبه أبداً. نضيف فقط ما يكسب مكانه." },
      body: { en: "Performance is mostly about what you leave out. Every script, every font weight, every tracking pixel has a cost, and we weigh each one against the value it brings. A site with everything included is slow. A site with the right things included is fast. We choose the right things, and we prove the result in numbers after launch.", ar: "الأداء في الغالب عمّا تتركه خارجاً. كل نص برمجي، وكل وزن خط، وكل بكسل تتبّع له تكلفة، ونزن كل واحد مقابل القيمة التي يجلبها. الموقع الذي يضم كل شيء بطيء. الموقع الذي يضم الأشياء الصحيحة سريع. نختار الأشياء الصحيحة، ونُثبت النتيجة بالأرقام بعد الإطلاق." },
    },
    outcomes: {
      eyebrow: { en: "Why it matters", ar: "لماذا يهمّ" }, h2: { en: "What performance changes", ar: "ما يغيّره الأداء" },
      lead: { en: "A fast, stable site holds visitors, ranks better, and converts more.", ar: "الموقع السريع المستقر يُبقي الزوّار، ويتصدّر أفضل، ويتحوّل أكثر." },
      items: [
        { label: { en: "Better ranking", ar: "ترتيب أفضل" }, body: { en: "Core Web Vitals are a confirmed Google ranking signal.", ar: "مؤشرات الويب الأساسية إشارة ترتيب مؤكَّدة من جوجل." } },
        { label: { en: "Lower bounce", ar: "ارتداد أقل" }, body: { en: "Fast pages keep visitors instead of losing them.", ar: "الصفحات السريعة تُبقي الزوّار بدلاً من خسارتهم." } },
        { label: { en: "More conversion", ar: "تحويل أكثر" }, body: { en: "Every second saved lifts the chance of an enquiry.", ar: "كل ثانية موفّرة ترفع فرصة استفسار." } },
      ],
    },
    faq: {
      eyebrow: { en: "Common questions", ar: "أسئلة شائعة" }, h2: { en: "Performance questions", ar: "أسئلة الأداء" },
      items: [
        { q: { en: "What scores should my site hit?", ar: "ما النتائج التي يجب أن يحقّقها موقعي؟" }, a: { en: "We aim for green across all three Core Web Vitals, with mobile as the priority view.", ar: "نهدف للأخضر عبر المؤشرات الثلاثة جميعاً، مع الجوال كأولوية." } },
        { q: { en: "Can you speed up my existing site?", ar: "هل يمكنكم تسريع موقعي الحالي؟" }, a: { en: "Often yes, depending on how it was built. A rebuild on a modern stack is sometimes the cleaner path.", ar: "غالباً نعم، حسب كيف بُني. إعادة البناء على حزمة حديثة أحياناً الطريق الأنظف." } },
        { q: { en: "Does performance really affect ranking?", ar: "هل يؤثر الأداء فعلاً على الترتيب؟" }, a: { en: "Yes. Core Web Vitals are a confirmed ranking signal, especially important on mobile.", ar: "نعم. مؤشرات الويب الأساسية إشارة ترتيب مؤكَّدة، مهمة خاصة على الجوال." } },
        { q: { en: "Will making it fast limit my design?", ar: "هل جعله سريعاً سيقيّد تصميمي؟" }, a: { en: "No. Modern performance is about technique, not austerity. Your design stays rich where it matters.", ar: "لا. الأداء الحديث عن التقنية، لا التقشّف. يبقى تصميمك غنياً حيث يهمّ." } },
        { q: { en: "Do you provide a performance report?", ar: "هل تقدّمون تقرير أداء؟" }, a: { en: "Yes. After launch we can hand you a plain-number report on your Core Web Vitals scores.", ar: "نعم. بعد الإطلاق يمكننا تسليمك تقرير بأرقام واضحة عن نتائج مؤشرات الويب الخاصة بك." } },
        { q: { en: "How do you test mobile performance?", ar: "كيف تختبرون أداء الجوال؟" }, a: { en: "We use lab and field measurement tools on real mobile profiles, the way Google does.", ar: "نستخدم أدوات قياس المختبر والحقل على ملفات جوال حقيقية، كما تفعل جوجل." } },
      ],
    },
    cta: { heading: { en: "Want a site that loads fast and ranks well? Start the concept.", ar: "تريد موقعاً يُحمَّل بسرعة ويتصدّر جيداً؟ ابدأ المفهوم." } },
  },
  {
    slug: "ongoing-optimization",
    meta: { title: { en: "Ongoing Website Optimization in Dubai | A/B Testing and Heatmaps | Big Story", ar: "تحسين المواقع المستمر في دبي | اختبارات A/B وخرائط الحرارة | بيك ستوري" }, description: { en: "Ongoing website optimization for Dubai businesses. A/B testing, heatmaps, and analytics that compound your traffic into more enquiries over time.", ar: "تحسين مواقع مستمر لشركات دبي. اختبارات A/B وخرائط حرارة وتحليلات تجمّع حركتك في استفسارات أكثر مع الوقت." } },
    breadcrumb: { en: "Ongoing optimization", ar: "التحسين المستمر" },
    hero: {
      eyebrow: { en: "Ongoing optimization, A/B testing, and heat mapping", ar: "التحسين المستمر، اختبارات A/B، وخرائط الحرارة" },
      h1: { en: "Ongoing optimization that compounds traffic into enquiries", ar: "تحسين مستمر يجمّع الحركة في استفسارات" },
      lead: { en: "A website is not finished the day it launches. The sites that win are the ones that keep learning from real visitor behaviour. We run A/B tests, read heatmaps, and watch the analytics, then make the small changes that compound into more enquiries month after month.", ar: "الموقع لا ينتهي يوم إطلاقه. المواقع التي تربح هي التي تستمر في التعلّم من سلوك الزائر الحقيقي. نُدير اختبارات A/B، ونقرأ خرائط الحرارة، ونراقب التحليلات، ثم نُجري التغييرات الصغيرة التي تتجمّع في استفسارات أكثر شهراً بعد شهر." },
      promise: { en: "Launch is the starting line, not the finish. The real gains come from what you do after.", ar: "الإطلاق خط البداية، لا النهاية. المكاسب الحقيقية تأتي مما تفعله بعده." },
    },
    sections: [
    {
      id: "why-ongoing", n: "01",
      eyebrow: { en: "Why ongoing", ar: "لماذا مستمر" },
      h2: { en: "A live site tells you what works. You have to listen to it.", ar: "الموقع المباشر يخبرك بما يعمل. عليك أن تستمع إليه." },
      lead: { en: "Once your site has real visitors, it generates signals every day about what helps and what hurts. Ongoing optimization is the practice of reading those signals and acting on them.", ar: "حين يكون لموقعك زوّار حقيقيون، يُولّد إشارات كل يوم عمّا يساعد وعمّا يضرّ. التحسين المستمر هو ممارسة قراءة تلك الإشارات والتصرف بناءً عليها." },
      body: { en: "A launch is a hypothesis. The site goes live with our best guess at what will convert, based on research and experience. Then real visitors arrive, and they tell us the truth. Some pages work. Some do not. Some buttons get clicked. Some get ignored. Some forms get abandoned at a certain field. All of this is data, and the sites that use it get better over time while the sites that ignore it stay stuck. Ongoing optimization is how a good site becomes a great one.", ar: "الإطلاق فرضية. ينطلق الموقع بأفضل تخمين لنا عمّا سيتحوّل، بناءً على البحث والخبرة. ثم يصل الزوّار الحقيقيون، ويخبروننا الحقيقة. بعض الصفحات تعمل. بعضها لا. بعض الأزرار يُنقر. بعضها يُتجاهل. بعض النماذج يُهجَر عند حقل معيّن. كل هذا بيانات، والمواقع التي تستخدمها تتحسّن مع الوقت بينما المواقع التي تتجاهلها تبقى عالقة. التحسين المستمر هو كيف يصبح الموقع الجيد عظيماً." },
      list: [
        { en: "Launch is a hypothesis, visitors are the test", ar: "الإطلاق فرضية، والزوّار الاختبار" },
        { en: "Real behaviour beats assumed behaviour", ar: "السلوك الحقيقي يتفوّق على السلوك المُفترَض" },
        { en: "Small changes compound over time", ar: "التغييرات الصغيرة تتجمّع مع الوقت" },
      ],
    },
    {
      id: "ab-testing", n: "02",
      eyebrow: { en: "A/B testing", ar: "اختبارات A/B" },
      h2: { en: "We test two versions and let visitors decide, instead of guessing in a meeting.", ar: "نختبر نسختين ونترك الزوّار يقررون، بدلاً من التخمين في اجتماع." },
      lead: { en: "An A/B test shows two versions of a page to real visitors and measures which one converts better. It removes opinion from the decision.", ar: "اختبار A/B يعرض نسختين من صفحة لزوّار حقيقيين ويقيس أيهما يتحوّل أفضل. يزيل الرأي من القرار." },
      body: { en: "When traffic allows, we run controlled A/B tests on the things that matter: a headline, a call to action, a form layout, a pricing display. Half the visitors see version A, half see version B, and the data tells us which wins. This replaces internal debate with evidence. The team might be certain that a red button works better, but the test might show that the gold one does. We follow the data, not the loudest voice in the room, and over a year of tests the site quietly becomes far more effective than the day it launched.", ar: "حين تسمح الحركة، نُدير اختبارات A/B مضبوطة على الأشياء المهمة: عنوان، دعوة عمل، تنسيق نموذج، عرض سعر. نصف الزوّار يرى النسخة A، ونصف يرى B، وتخبرنا البيانات أيهما يربح. هذا يستبدل النقاش الداخلي بالدليل. قد يكون الفريق متأكداً أن الزر الأحمر يعمل أفضل، لكن قد يُظهر الاختبار أن الذهبي يفعل. نتبع البيانات، لا أعلى صوت في الغرفة، وعبر سنة من الاختبارات يصبح الموقع بهدوء أكثر فعالية بكثير من يوم إطلاقه." },
      list: [
        { en: "Test headlines, calls to action, and forms", ar: "اختبر العناوين ودعوات العمل والنماذج" },
        { en: "Evidence replaces opinion", ar: "الدليل يستبدل الرأي" },
        { en: "Wins compound across a year of tests", ar: "المكاسب تتجمّع عبر سنة من الاختبارات" },
      ],
    },
    {
      id: "heatmaps", n: "03",
      eyebrow: { en: "Heatmaps and recordings", ar: "خرائط الحرارة والتسجيلات" },
      h2: { en: "A heatmap shows where visitors actually look, click, and give up.", ar: "خريطة الحرارة تُظهر أين ينظر الزوّار فعلاً، وينقرون، ويستسلمون." },
      lead: { en: "A heatmap is a picture of real attention. It shows what gets read, what gets ignored, and where visitors stop and leave.", ar: "خريطة الحرارة صورة للاهتمام الحقيقي. تُظهر ما يُقرأ، وما يُتجاهل، وأين يتوقف الزوّار ويغادرون." },
      body: { en: "Heatmaps and session recordings show us the parts of a page that get attention and the parts that get skipped. We might find that visitors never scroll to a section we thought was important, or that they click on something that is not a link, or that they abandon a form at the same field every time. Each of these is a clue, and acting on the clues is how a site improves. We might move a key section higher, make a clickable thing look clickable, or shorten a form. The visitor behaviour tells us what to do, and the next round of data tells us whether it worked.", ar: "تُظهر خرائط الحرارة وتسجيلات الجلسة أجزاء الصفحة التي تحظى بالاهتمام والأجزاء التي تُتخطّى. قد نجد أن الزوّار لا يمرّرون إلى قسم ظننّاه مهماً، أو أنهم ينقرون على شيء ليس رابطاً، أو أنهم يهجرون نموذجاً عند الحقل نفسه كل مرة. كل واحدة من هذه دليل، والتصرف بناءً على الأدلة كيف يتحسّن الموقع. قد نرفع قسماً رئيسياً أعلى، أو نجعل شيئاً قابلاً للنقر يبدو قابلاً للنقر، أو نُقصّر نموذجاً. سلوك الزائر يخبرنا بماذا نفعل، وجولة البيانات التالية تخبرنا إن كان قد عمل." },
      list: [
        { en: "See what gets read and what gets skipped", ar: "انظر ما يُقرأ وما يُتخطّى" },
        { en: "Find where visitors give up", ar: "اعرف أين يستسلم الزوّار" },
        { en: "Clues drive the next change", ar: "الأدلة تقود التغيير التالي" },
      ],
    },
    {
      id: "analytics", n: "04",
      eyebrow: { en: "Analytics and reporting", ar: "التحليلات والتقارير" },
      h2: { en: "We watch the numbers that matter and report them in plain language.", ar: "نراقب الأرقام المهمة ونبلغ عنها بلغة واضحة." },
      lead: { en: "A dashboard full of vanity metrics is noise. We track the few numbers that connect to enquiries and revenue, and report them clearly.", ar: "لوحة معلومات مليئة بمقاييس الزينة ضجيج. نتتبّع الأرقام القليلة المرتبطة بالاستفسارات والإيرادات، ونبلغ عنها بوضوح." },
      body: { en: "We set up clean analytics that track the actions that matter: form submissions, WhatsApp clicks, calls, bookings. We filter out the bot traffic and the vanity metrics that make a report look busy but say nothing useful. On a regular cadence, we report the numbers that connect to your business, in plain language, with the changes we made and the changes we plan to make next. The goal is that you always know whether your site is working harder for you this month than last, and why.", ar: "نُعدّ تحليلات نظيفة تتتبّع الإجراءات المهمة: إرسالات النماذج، نقرات واتساب، المكالمات، الحجوزات. نُرشّح حركة البوت ومقاييس الزينة التي تجعل التقرير يبدو مشغولاً لكنها لا تقول شيئاً مفيداً. بإيقاع منتظم، نبلغ عن الأرقام المرتبطة بعملك، بلغة واضحة، مع التغييرات التي أجريناها والتغييرات التي نخطط لإجرائها تالياً. الهدف أن تعرف دائماً ما إذا كان موقعك يعمل بجدّ أكبر لك هذا الشهر عن الشهر الماضي، ولماذا." },
      list: [
        { en: "Track the actions that matter, not vanity", ar: "تتبّع الإجراءات المهمة، لا الزينة" },
        { en: "Filter bots and noise from the data", ar: "رشّح البوت والضجيج من البيانات" },
        { en: "Plain-language reports on a regular cadence", ar: "تقارير بلغة واضحة بإيقاع منتظم" },
      ],
    },
    {
      id: "launches-overrated", n: "05",
      eyebrow: { en: "Why launches are overrated", ar: "لماذا الإطلاقات مبالغ فيها" },
      h2: { en: "The launch is the easiest day in a website's life. The months after are where it is won.", ar: "الإطلاق أسهل يوم في حياة موقع. الأشهر بعده حيث يُربَح." },
      lead: { en: "A launch gets all the attention and celebration, but it is just the starting line. What you do after is what separates a site that works from one that drifts.", ar: "الإطلاق يحظى بكل الانتباه والاحتفال، لكنه مجرد خط البداية. ما تفعله بعده هو ما يفصل موقعاً يعمل عن واحد ينجرف." },
      body: { en: "There is a natural human tendency to treat a website launch as the finish. The team celebrates, the site goes live, and then attention moves elsewhere. But the launched site is a first draft, a careful hypothesis built before any real visitors arrived. The weeks and months after launch are when the site becomes what it is going to be, shaped by the only feedback that matters: real behaviour. This is why ongoing optimization is not an optional extra for the keen, it is the difference between a site that compounds in value and one that quietly declines. Sites that are launched and then ignored slowly drift out of date, out of tune with what visitors want, and out of sync with how search has moved. Sites that are nurtured after launch keep getting sharper, faster, and more effective, and the gap between the two widens every month. Launch well, by all means. Then keep working, because that is where the real return lives.", ar: "هناك ميل بشري طبيعي لمعاملة إطلاق موقع كالنهاية. يحتفل الفريق، ينطلق الموقع، ثم ينتقل الانتباه إلى مكان آخر. لكن الموقع المنطلق مسودة أولى، فرضية حذرة بُنيت قبل وصول أي زوّار حقيقيين. الأسابيع والأشهر بعد الإطلاق هي عندما يصبح الموقع ما سيكون عليه، مشكّلاً بالتغذية الراجعة الوحيدة المهمة: السلوك الحقيقي. لهذا التحسين المستمر ليس إضافة اختيارية للحماسين، بل الفرق بين موقع يتجمّع في القيمة وواحد يتراجع بهدوء. المواقع التي تُطلَق ثم تُتجاهل تنجرف ببطء خارج التحديث، خارج التناغم مع ما يريده الزوّار، وخارج المزامنة مع كيف تحرّك البحث. المواقع التي تُغذّى بعد الإطلاق تستمر بالتحوّل أحدّ وأسرع وأكثر فعالية، وتتّسع الفجوة بين الاثنين كل شهر. أطلق جيداً، بكل تأكيد. ثم استمر بالعمل، لأن هناك يعود الربح الحقيقي." },
      list: [
        { en: "A launch is a first draft, not a final", ar: "الإطلاق مسودة أولى، لا نهائية" },
        { en: "Real behaviour shapes the months after", ar: "السلوك الحقيقي يشكّل الأشهر بعده" },
        { en: "Nurtured sites compound, ignored ones decline", ar: "المواقع المُغذّاة تتجمّع، والمتجاهلة تتراجع" },
      ],
    },
    {
      id: "what-first", n: "06",
      eyebrow: { en: "What to optimize first", ar: "ماذا نُحسّن أولاً" },
      h2: { en: "We start where the data says the biggest leak is, not where the loudest opinion points.", ar: "نبدأ حيث تقول البيانات إن أكبر تسريب، لا حيث يشير أعلى رأي." },
      lead: { en: "Optimization is about priority. We find the page or step where the most visitors are lost, and fix that first.", ar: "التحسين عن الأولوية. نجد الصفحة أو الخطوة حيث يُفقَد أكثر الزوّار، ونُصلح ذلك أولاً." },
      body: { en: "A site has hundreds of possible improvements and limited time to make them, so order matters. We use the analytics and heatmaps to find the single biggest leak: the page with the highest exit rate, the form field where the most people abandon, the step in the journey where traffic consistently drops. That is where we start, because fixing the biggest leak recovers the most visitors for the least effort. Then we move to the next biggest, and the next. This is unglamorous work, but it is effective, because it follows the evidence instead of chasing whatever caught someone's eye. Over months, the site leaks less and less, and the enquiries that result from the same traffic quietly climb. Optimization done well is boring in the best possible way: steady, evidence-led, and relentlessly focused on the thing that matters most this month.", ar: "للموقع مئات التحسينات الممكنة ووقت محدود لإجرائها، فالترتيب يهمّ. نستخدم التحليلات وخرائط الحرارة لإيجاد أكبر تسريب مفرد: الصفحة بأعلى معدل خروج، حقل النموذج حيث يهجر أكثر الناس، الخطوة في الرحلة حيث تنخفض الحركة باستمرار. هناك نبدأ، لأن إصلاح أكبر تسريب يسترجع أكثر الزوّار بأقل جهد. ثم ننتقل للأكبر التالي، والتالي. هذا عمل غير مبهِر، لكنه فعّال، لأنه يتبع الدليل بدلاً من مطاردة ما لفت عين أحدهم. عبر الأشهر، يتسرّب الموقع أقل فأقل، وتتسلّق الاستفسارات الناتجة من الحركة نفسها بهدوء. التحسين المُنجَز جيداً ممل بأفضل طريقة ممكنة: ثابت، يقوده الدليل، ومركّز بلا هوادة على الشيء المهم أكثر هذا الشهر." },
      list: [
        { en: "Start at the biggest data-confirmed leak", ar: "ابدأ عند أكبر تسريب يؤكّده البيانات" },
        { en: "Fix the highest-impact issue first", ar: "أصلِح مشكلة الأثر الأعلى أولاً" },
        { en: "Evidence-led, not opinion-led", ar: "يقوده الدليل، لا الرأي" },
      ],
    },
    {
      id: "common-mistakes", n: "07",
      eyebrow: { en: "Common mistakes", ar: "أخطاء شائعة" },
      h2: { en: "The optimization mistakes that waste effort and prove nothing.", ar: "أخطاء التحسين التي تُهدر الجهد ولا تُثبت شيئاً." },
      lead: { en: "Optimization done wrong is just expensive tinkering. These are the mistakes that make it so.", ar: "التحسين المنجز بشكل خاطئ مجرد عبث مكلف. هذه الأخطاء التي تجعله كذلك." },
      body: { en: "The first mistake is changing many things at once, so no one knows which change caused the result, positive or negative. The second is optimizing before there is enough traffic to measure, which produces noise dressed up as insight. The third is chasing vanity metrics, like total page views, that look impressive in a report but never connect to enquiries. The fourth is copying a competitor's change without understanding why it worked for them, which often fails because the context is different. The fifth is stopping after launch and assuming the site is done, which is the most common mistake of all. Good optimization is disciplined, patient, measured, and continuous, and it compounds where the undisciplined version just churns. The difference is not effort, it is method.", ar: "الخطأ الأول تغيير أشياء كثيرة دفعة واحدة، فلا أحد يعرف أي تغيير سبب النتيجة، إيجابية أو سلبية. الثاني التحسين قبل وجود حركة كافية للقياس، ما يُنتج ضجيجاً مُتنكِّراً كبصيرة. الثالث مطاردة مقاييس الزينة، كإجمالي المشاهدات، التي تبدو مبهِرة في تقرير لكنها لا تتصل بالاستفسارات أبداً. الرابع نسخ تغيير منافس دون فهم لماذا عمل له، ما يفشل غالباً لأن السياق مختلف. الخامس التوقف بعد الإطلاق وافتراض أن الموقع انتهى، وهو الخطأ الأكثر شيوعاً على الإطلاق. التحسين الجيد منضبط وصبور ومُقاس ومستمر، ويتجمّع حيث تُرج النسخة غير المنضبطة فقط. الفرق ليس الجهد، إنه المنهج." },
      list: [
        { en: "Changing too much at once", ar: "تغيير كثير جداً دفعة واحدة" },
        { en: "Optimizing before traffic allows measurement", ar: "التحسين قبل أن تسمح الحركة بالقياس" },
        { en: "Chasing vanity and copying competitors blindly", ar: "مطاردة الزينة ونسخ المنافسين بشكل أعمى" },
      ],
    },
    ],
    deliverables: {
      eyebrow: { en: "What you get", ar: "ما تحصل عليه" }, h2: { en: "The optimization retainer deliverables", ar: "مخرجات اشتراك التحسين" },
      items: [
        { en: "A/B testing on the elements that affect conversion", ar: "اختبارات A/B على العناصر التي تؤثر على التحويل" },
        { en: "Heatmaps and session recordings reviewed regularly", ar: "خرائط حرارة وتسجيلات جلسات تُراجَع بانتظام" },
        { en: "Clean analytics tracking the actions that matter", ar: "تحليلات نظيفة تتتبّع الإجراءات المهمة" },
        { en: "Plain-language reports on a regular cadence", ar: "تقارير بلغة واضحة بإيقاع منتظم" },
        { en: "A backlog of changes, prioritised by impact", ar: "قائمة تغييرات مرتّبة حسب الأثر" },
      ],
    },
    approach: {
      eyebrow: { en: "How we approach it", ar: "كيف نتعامل معه" }, h2: { en: "We change one thing at a time and let the data judge it.", ar: "نغيّر شيئاً واحداً في كل مرة ونترك البيانات تحكم عليه." },
      lead: { en: "Changing five things at once tells you nothing. We change one, measure, and learn.", ar: "تغيير خمسة أشياء دفعة واحدة لا يخبرك بشيء. نغيّر واحداً، ونقيس، ونتعلّم." },
      body: { en: "Discipline is what makes optimization work. When you change five things at once and conversion goes up, you cannot tell which change helped. So we change one thing at a time, isolate its effect, and keep what works. This is slower than a rushed redesign, but it is honest, and honesty is what compounds. Over a year of disciplined, one-change-at-a-time optimization, a site becomes quietly, measurably better, and the enquiries follow.", ar: "الانضباط هو ما يجعل التحسين يعمل. عندما تغيّر خمسة أشياء دفعة واحدة ويرتفع التحويل، لا تستطيع معرفة أي تغيير ساعد. لذلك نغيّر شيئاً واحداً في كل مرة،نعزل أثره، ونُبقي ما يعمل. هذا أبطأ من إعادة تصميم متسرّعة، لكنه صادق، والصدق هو ما يتجمّع. عبر سنة من التحسين المنضبط، شيءاً واحداً في كل مرة، يصبح الموقع أفضل بشكل هادئ وقابل للقياس، وتتبع الاستفسارات." },
    },
    outcomes: {
      eyebrow: { en: "Why it matters", ar: "لماذا يهمّ" }, h2: { en: "What ongoing optimization changes", ar: "ما يغيّره التحسين المستمر" },
      lead: { en: "The site that keeps learning from its visitors pulls ahead of the sites that do not.", ar: "الموقع الذي يستمر في التعلّم من زوّاره يتقدّم على المواقع التي لا تفعل." },
      items: [
        { label: { en: "Compounding gains", ar: "مكاسب متراكمة" }, body: { en: "Each tested win lifts the baseline for the next.", ar: "كل ربح مُختبَر يرفع خط الأساس للتالي." } },
        { label: { en: "Evidence over opinion", ar: "دليل لا رأي" }, body: { en: "A/B tests and heatmaps replace internal guesswork.", ar: "اختبارات A/B وخرائط الحرارة تستبدل التخمين الداخلي." } },
        { label: { en: "Clear reporting", ar: "تقارير واضحة" }, body: { en: "You always know what changed and whether it worked.", ar: "تعرف دائماً ما تغيّر وما إذا كان قد عمل." } },
      ],
    },
    faq: {
      eyebrow: { en: "Common questions", ar: "أسئلة شائعة" }, h2: { en: "Ongoing optimization questions", ar: "أسئلة التحسين المستمر" },
      items: [
        { q: { en: "Do I need a lot of traffic for A/B testing?", ar: "هل أحتاج حركة كثيرة لاختبارات A/B؟" }, a: { en: "Meaningful tests need a baseline of traffic. For lower-traffic sites, we apply proven patterns and measure the overall result.", ar: "الاختبارات ذات المعنى تحتاج خط أساس من الحركة. للمواقع ذات الحركة الأقل، نطبّق أنماطاً مثبتة ونقيس النتيجة الإجمالية." } },
        { q: { en: "How often do you make changes?", ar: "كم مرة تُجرون التغييرات؟" }, a: { en: "On a regular cadence agreed with you, usually monthly, with one tested change at a time so we can read its effect.", ar: "بإيقاع منتظم متّفق عليه معك، عادة شهرياً، بتغيير مُختبَر واحد في كل مرة لنتمكن من قراءة أثره." } },
        { q: { en: "What tools do you use?", ar: "ما الأدوات التي تستخدمونها؟" }, a: { en: "Industry-standard analytics, A/B testing, and heatmap platforms, configured to track the actions that matter to you.", ar: "منصات تحليلات واختبارات A/B وخرائط حرارة معيارية، مهيّأة لتتبّع الإجراءات المهمة لك." } },
        { q: { en: "Is this a long contract?", ar: "هل هذا عقد طويل؟" }, a: { en: "Retainers run month to month. You stay because the numbers improve, not because you are locked in.", ar: "الاشتراكات تسير شهرياً. تبقى لأن الأرقام تتحسّن، لا لأنك مقفل." } },
        { q: { en: "Can you optimize a site you did not build?", ar: "هل يمكنكم تحسين موقع لم تبنيوه؟" }, a: { en: "Often yes, depending on how it is built and whether we can add the tracking it needs.", ar: "غالباً نعم، حسب كيف بُني وما إذا كان بإمكاننا إضافة التتبّع الذي يحتاجه." } },
        { q: { en: "What will you report to me?", ar: "ماذا ستبلّغونني؟" }, a: { en: "The actions that matter, the changes we made, and whether each one worked, in plain language, on a regular cadence.", ar: "الإجراءات المهمة، والتغييرات التي أجريناها، وما إذا كان كل واحد قد عمل، بلغة واضحة، بإيقاع منتظم." } },
      ],
    },
    cta: { heading: { en: "Want a site that keeps getting better? Start the concept.", ar: "تريد موقعاً يستمر في التحسّن؟ ابدأ المفهوم." } },
  },
];

export const webServiceSlugs = webServices.map((s) => s.slug);

export function getWebService(slug: string): WebService | undefined {
  return webServices.find((s) => s.slug === slug);
}
