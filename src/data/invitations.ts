/**
 * Arabic-first digital-invitation cluster — service-page content.
 *
 * Sources of truth:
 *  - Master brief: WEDDING_DIGITAL_INVITATIONS_MASTER_BRIEF_2026-07-27.md
 *  - Architecture / SEO control: WEDDING_DIGITAL_INVITATION_SITE_ARCHITECTURE_2026-07-27.md
 *  - Keyword & intent map: DELEGATED_INVITATION_SEO_MAP_2026-07-27.md
 *
 * 16 purposeful pages (one hub + 15 children), each with a single primary
 * intent, canonical URL and distinct H1/title/FAQ set. Titles, H1s, FAQs and
 * cannibalization boundaries follow the approved SEO map; all body copy is
 * original.
 *
 * Hard rules baked in here:
 *  - No hardcoded prices. The pricing workbook is not yet client-approved, so
 *    scopes describe deliverables, not amounts (architecture §9). The two scopes
 *    mirror the working model: Recommended = Static Social Suite,
 *    Enhanced = Motion + RSVP Suite.
 *  - No feature claims the product cannot honestly deliver: RSVP is a
 *    link/form, QR is an image on the card, maps are Google Maps / Waze link
 *    buttons. No claims of automated WhatsApp broadcast systems, real-time
 *    dashboards, gate-scanning hardware or per-guest automation.
 *  - Every wedding-ceremony page keeps دعوة / بطاقة beside عقد قران to avoid
 *    legal-contract query pollution, and never targets photography/videography
 *    head terms owned by the existing wedding cluster.
 *  - Baby shower ships with honest capability copy and NO relabelled seed demos.
 */

import type { L } from "@/lib/i18n";
import type { CategorySlug } from "@/data/invitation-designs";

export type InvitationScope = { name: L; tagline: L; includes: L[] };
export type InvitationSection = { h2: L; body: L };
export type InvitationFaq = { q: L; a: L };

export type InvitationPage = {
  slug: string;
  /** Seed category that owns this page's demos, if any. */
  categorySlug?: CategorySlug;
  /** Show the "wedding coverage" cross-link card (architecture §5 rule 4). */
  weddingLinks: boolean;
  /** Whether this page renders the demo gallery. Baby shower = false. */
  hasDemos: boolean;
  breadcrumb: L;
  meta: { title: L; description: L };
  hero: { eyebrow: L; h1: L; lead: L };
  intro: L;
  provides: { title: L; items: L[] };
  scopes: { recommended: InvitationScope; enhanced: InvitationScope };
  turnaround: { body: L; revisions: L };
  sections: InvitationSection[];
  faqs: InvitationFaq[];
  /** Related invitation page slugs (architecture §5 related-page map). */
  related: string[];
  /** Honest note shown where a page has no demo gallery. */
  demoNote?: L;
  ctaHeading: L;
};

export const HUB_SLUG = "digital-invitations";
export const GALLERY_PATH = "/invitation-designs";

/* Shared, honest UI strings for the renderer. */
export const invitationUi = {
  clusterLabel: { en: "Digital invitations", ar: "دعوات إلكترونية" },
  hubAnchor: { en: "Digital invitations hub", ar: "مركز الدعوات الإلكترونية" },
  hubCta: {
    en: "Every occasion, language and feature in one place.",
    ar: "كل مناسبة ولغة وميزة في مكان واحد.",
  },
  galleryAnchor: { en: "Browse the demo gallery", ar: "تصفّح معرض النماذج" },
  galleryCta: {
    en: "64 original demo samples across 8 styles — filter by occasion and format.",
    ar: "64 نموذجاً تجريبياً أصلياً بثمانية أساليب — رتّبها حسب المناسبة والصيغة.",
  },
  provides: { en: "What you provide", ar: "ما تزوّدنا به" },
  recommended: { en: "Recommended scope", ar: "النطاق الموصى به" },
  enhanced: { en: "Enhanced scope", ar: "النطاق المطوّر" },
  includes: { en: "Includes", ar: "يشمل" },
  turnaround: { en: "Turnaround & revisions", ar: "مدة التنفيذ والتعديلات" },
  faqs: { en: "Frequently asked questions", ar: "الأسئلة الشائعة" },
  related: { en: "Related invitation services", ar: "خدمات دعوات ذات صلة" },
  samples: { en: "Original demo samples", ar: "نماذج تجريبية أصلية" },
  samplesNote: {
    en: "Every design below is an original Big Story demo, clearly labelled نموذج. We swap in your names, date, venue, wording, language, colours and motion for your order.",
    ar: "كل تصميم بالأسفل نموذج أصلي من بيك ستوري، موسوم بوضوح بكلمة نموذج. نستبدل الأسماء والتاريخ والمكان والعبارة واللغة والألوان والحركة عند الطلب.",
  },
  weddingCoverage: { en: "Planning the whole wedding?", ar: "تخطّط لكامل الزفاف؟" },
  weddingCoverageBody: {
    en: "Invitations are the first touch. For the day itself, Big Story also covers photography and film.",
    ar: "الدعوة هي اللمسة الأولى. أما اليوم نفسه، فتغطّيه بيك ستوري تصويراً فوتوغرافياً وفيلماً.",
  },
  weddingPage: { en: "Wedding coverage & packages", ar: "تغطية الزفاف والباقات" },
  weddingPhoto: { en: "Wedding photography", ar: "تصوير الزفاف" },
  weddingVideo: { en: "Wedding videography", ar: "فيديو الزفاف" },
  viewService: { en: "View service", ar: "عرض الخدمة" },
  startOnWhatsApp: { en: "Start on WhatsApp", ar: "ابدأ عبر واتساب" },
} as const;

/* ------------------------------------------------------------------ *
 * Two shared productized scopes (working pricing model, no amounts).  *
 * ------------------------------------------------------------------ */

const SCOPE_STATIC: InvitationScope = {
  name: { en: "Static Social Suite", ar: "باقة السوشيال الثابتة" },
  tagline: {
    en: "The design in the sizes you actually send.",
    ar: "التصميم بالمقاسات التي ترسلها فعلاً.",
  },
  includes: [
    { en: "One original design personalised with your names, date, time and venue", ar: "تصميم أصلي واحد مخصّص بأسمائكم والتاريخ والوقت والمكان" },
    { en: "Portrait card, square post and Story sizes", ar: "مقاس عمودي، ومربّع للمنشور، ومقاس ستوري" },
    { en: "Arabic layout, English layout, or both on one card", ar: "تنسيق عربي، أو إنجليزي، أو الاثنان على بطاقة واحدة" },
    { en: "High-resolution PNG/JPG ready to send on WhatsApp", ar: "ملف PNG/JPG عالي الدقة جاهز للإرسال عبر واتساب" },
    { en: "Two revision rounds on text and colours", ar: "جولتا تعديل على النص والألوان" },
  ],
};

const SCOPE_MOTION: InvitationScope = {
  name: { en: "Motion + RSVP Suite", ar: "باقة الحركة وتأكيد الحضور" },
  tagline: {
    en: "An animated invite plus a way for guests to reply.",
    ar: "دعوة متحركة مع طريقة يردّ بها الضيوف.",
  },
  includes: [
    { en: "Everything in the Static Social Suite", ar: "كل ما في باقة السوشيال الثابتة" },
    { en: "A short animated MP4 with music and animated Arabic typography", ar: "فيديو MP4 قصير متحرك مع موسيقى وخط عربي متحرك" },
    { en: "An RSVP button linking to a response form you can track", ar: "زر تأكيد حضور يربط بنموذج ردود يمكنكم متابعته" },
    { en: "Optional QR image and a Google Maps / Waze location button", ar: "صورة QR اختيارية وزر موقع Google Maps / Waze" },
    { en: "Vertical WhatsApp and Story exports of the video", ar: "نسخ عمودية للفيديو للواتساب والستوري" },
  ],
};

const DEFAULT_TURNAROUND: InvitationPage["turnaround"] = {
  body: {
    en: "Once we have your names, date, venue and preferred wording, a static design is typically ready to review within 2–3 working days; an animated invitation within 4–6 working days. Rush timing is possible depending on the week — ask before you book a send date.",
    ar: "بعد استلام الأسماء والتاريخ والمكان والعبارة المفضّلة، يكون التصميم الثابت جاهزاً للمراجعة عادةً خلال 2–3 أيام عمل، والدعوة المتحركة خلال 4–6 أيام عمل. التنفيذ السريع ممكن حسب ضغط الأسبوع — اسأل قبل تحديد موعد الإرسال.",
  },
  revisions: {
    en: "The Static Social Suite includes two revision rounds; the Motion + RSVP Suite includes three. Further changes are quoted per round so the scope stays clear.",
    ar: "تشمل الباقة الثابتة جولتَي تعديل، وتشمل باقة الحركة ثلاث جولات. أي تعديلات إضافية تُسعَّر لكل جولة حفاظاً على وضوح النطاق.",
  },
};

/* ------------------------------------------------------------------ *
 * The 15 child pages (the hub renders separately).                    *
 * ------------------------------------------------------------------ */

export const invitationPages: InvitationPage[] = [
  /* ---------- Language & audience ---------- */
  {
    slug: "bilingual-arabic-english-invitations",
    weddingLinks: false,
    hasDemos: false,
    breadcrumb: { en: "Bilingual invitations", ar: "دعوات ثنائية اللغة" },
    meta: {
      title: {
        en: "Bilingual Arabic English Invitations UAE | Big Story",
        ar: "دعوات إلكترونية بالعربي والإنجليزي | الإمارات والخليج",
      },
      description: {
        en: "Digital invitations designed in true right-to-left Arabic and clean English on one card — for UAE and GCC families with guests in two languages.",
        ar: "دعوات إلكترونية بتنسيق عربي صحيح من اليمين إلى اليسار وإنجليزي أنيق على بطاقة واحدة — لعائلات الإمارات والخليج بضيوف من لغتين.",
      },
    },
    hero: {
      eyebrow: { en: "Language & audience", ar: "اللغة والجمهور" },
      h1: {
        en: "Bilingual Arabic and English digital invitations with native RTL design",
        ar: "دعوات إلكترونية ثنائية اللغة بالعربي والإنجليزي بتصميم RTL صحيح",
      },
      lead: {
        en: "When half your guests read Arabic and half read English, the invitation has to work in both — without one language looking like an afterthought. We set Arabic right-to-left the way it should be read, and pair it with English that keeps the same dates, names and venue.",
        ar: "حين يقرأ نصف الضيوف العربية والنصف الآخر الإنجليزية، يجب أن تعمل الدعوة باللغتين — دون أن تبدو إحداهما إضافةً متأخرة. نضبط العربية من اليمين إلى اليسار كما يجب أن تُقرأ، ونقرنها بإنجليزية تحافظ على التواريخ والأسماء والمكان نفسها.",
      },
    },
    intro: {
      en: "Big Story builds دعوات إلكترونية بالعربي والإنجليزي as a single, coordinated design rather than two disconnected cards. Arabic typography is treated as the primary script — correct shaping, correct alignment — and English sits with it as a true equal.",
      ar: "تصمّم بيك ستوري دعوات إلكترونية بالعربي والإنجليزي كتصميم واحد منسّق لا كبطاقتين منفصلتين. تُعامَل الطباعة العربية كخط أساسي — تشكيل صحيح ومحاذاة صحيحة — وتقف الإنجليزية معها ندّاً حقيقياً.",
    },
    provides: {
      title: invitationUi.provides,
      items: [
        { en: "Names as you want them spelled in Arabic and in English", ar: "الأسماء كما تريدون كتابتها بالعربية وبالإنجليزية" },
        { en: "Event date, time and venue", ar: "تاريخ المناسبة ووقتها ومكانها" },
        { en: "Which language leads on each size, if you have a preference", ar: "أي لغة تتصدّر كل مقاس، إن كان لديكم تفضيل" },
        { en: "Any wording or verse you want included", ar: "أي عبارة أو آية تودّون إدراجها" },
      ],
    },
    scopes: { recommended: SCOPE_STATIC, enhanced: SCOPE_MOTION },
    turnaround: DEFAULT_TURNAROUND,
    sections: [
      {
        h2: { en: "Two languages, one set of facts", ar: "لغتان، مجموعة معلومات واحدة" },
        body: {
          en: "The most common bilingual mistake is a date or venue that differs between the Arabic and English versions. We proofread both against a single brief so the day, time and place always match.",
          ar: "أكثر أخطاء ثنائية اللغة شيوعاً هو اختلاف التاريخ أو المكان بين النسختين العربية والإنجليزية. نُدقّق النسختين مقابل موجز واحد كي يتطابق اليوم والوقت والمكان دائماً.",
        },
      },
      {
        h2: { en: "Right-to-left, done properly", ar: "من اليمين إلى اليسار، بشكل صحيح" },
        body: {
          en: "Arabic is not English typed backwards. Letters connect, numerals and punctuation sit correctly, and the eye moves from the right. Our layouts are built RTL-first so the Arabic never looks stretched or broken.",
          ar: "العربية ليست إنجليزية مكتوبة بالمقلوب. الحروف تتّصل، والأرقام وعلامات الترقيم في مواضعها، والعين تتحرّك من اليمين. تُبنى تصاميمنا بأولوية RTL كي لا تبدو العربية ممطوطة أو مكسورة.",
        },
      },
    ],
    faqs: [
      { q: { en: "Do Arabic invitations use a true right-to-left layout?", ar: "هل تظهر العربية من اليمين إلى اليسار بشكل صحيح؟" }, a: { en: "Yes. Every Arabic layout is built right-to-left with correct letter shaping and alignment, not an English template with Arabic dropped in.", ar: "نعم. يُبنى كل تنسيق عربي من اليمين إلى اليسار بتشكيل حروف ومحاذاة صحيحين، لا قالباً إنجليزياً أُقحِمت فيه العربية." } },
      { q: { en: "Can guests switch between Arabic and English?", ar: "هل يمكن للضيف التبديل بين العربية والإنجليزية؟" }, a: { en: "We deliver both language versions as separate files, and can also place both languages on one card. Which approach fits depends on your guest list.", ar: "نسلّم نسختي اللغتين كملفّين منفصلين، ويمكننا أيضاً وضع اللغتين على بطاقة واحدة. الأنسب يعتمد على قائمة ضيوفكم." } },
      { q: { en: "Will dates, names and venue details match in both languages?", ar: "هل تكون بيانات الموعد والموقع متطابقة في النسختين؟" }, a: { en: "Always. We proofread both versions against one brief so nothing drifts between languages.", ar: "دائماً. نُدقّق النسختين مقابل موجز واحد كي لا يختلف شيء بين اللغتين." } },
    ],
    related: ["digital-wedding-invitations", "katb-kitab-invitations", "animated-video-invitations"],
    ctaHeading: { en: "Send us both spellings — we'll set the rest", ar: "أرسلوا لنا الكتابتين — ونتكفّل بالباقي" },
  },

  /* ---------- WhatsApp delivery ---------- */
  {
    slug: "whatsapp-invitations",
    weddingLinks: false,
    hasDemos: false,
    breadcrumb: { en: "WhatsApp invitations", ar: "دعوات الواتساب" },
    meta: {
      title: { en: "WhatsApp Digital Invitations UAE | Arabic and English", ar: "دعوات إلكترونية للواتساب | تصميم وإرسال للمناسبات" },
      description: {
        en: "Digital invitations built for WhatsApp — the right image and video sizes, a tappable link, and a design that opens instantly with no app for your guests.",
        ar: "دعوات إلكترونية مصمّمة للواتساب — مقاسات الصور والفيديو الصحيحة، ورابط قابل للنقر، وتصميم يفتح فوراً دون تطبيق للضيف.",
      },
    },
    hero: {
      eyebrow: { en: "Delivery channel", ar: "قناة الإرسال" },
      h1: { en: "Arabic and English digital invitations made for WhatsApp", ar: "دعوات إلكترونية جاهزة للإرسال عبر واتساب" },
      lead: {
        en: "In the UAE the invitation goes out on WhatsApp. We design for that reality first: the crop that survives WhatsApp's compression, a video length that plays before anyone loses interest, and an optional link that opens instantly on any phone.",
        ar: "في الإمارات تُرسَل الدعوة عبر واتساب. نصمّم لهذا الواقع أولاً: القصّ الذي يصمد أمام ضغط واتساب، وطول فيديو يُعرَض قبل أن يفقد أحدٌ اهتمامه، ورابط اختياري يفتح فوراً على أي هاتف.",
      },
    },
    intro: {
      en: "This page owns the delivery workflow. We prepare دعوات إلكترونية للواتساب in the exact formats that send cleanly — a still card, a short video, or a link — so nothing arrives blurry or cropped. For a specific occasion, follow the links to the wedding, engagement, graduation or birthday page.",
      ar: "تختصّ هذه الصفحة بمسار الإرسال. نجهّز دعوات إلكترونية للواتساب بالصيغ التي تُرسَل بنقاء — بطاقة ثابتة، أو فيديو قصير، أو رابط — كي لا يصل شيء ضبابياً أو مقصوصاً. لمناسبة محدّدة، اتبعوا الروابط إلى صفحة الزفاف أو الخطوبة أو التخرج أو عيد الميلاد.",
    },
    provides: {
      title: invitationUi.provides,
      items: [
        { en: "The occasion and event details", ar: "المناسبة وتفاصيل الحدث" },
        { en: "Whether you'll send an image, a video, or both", ar: "هل ستُرسلون صورة أم فيديو أم الاثنين" },
        { en: "Any RSVP, map or QR you want on the card", ar: "أي تأكيد حضور أو خريطة أو QR تريدونه على البطاقة" },
      ],
    },
    scopes: { recommended: SCOPE_STATIC, enhanced: SCOPE_MOTION },
    turnaround: DEFAULT_TURNAROUND,
    sections: [
      {
        h2: { en: "Sized to survive WhatsApp", ar: "مقاسات تصمد أمام واتساب" },
        body: {
          en: "WhatsApp compresses images and re-encodes video. We export at the resolution and aspect that hold up after that processing, so your guests see a sharp card, not a soft one.", ar: "يضغط واتساب الصور ويعيد ترميز الفيديو. نُصدِّر بالدقة والنسبة اللتين تصمدان بعد هذه المعالجة، كي يرى ضيوفكم بطاقة حادّة لا باهتة.",
        },
      },
      {
        h2: { en: "No app for your guests", ar: "لا تطبيق على الضيف" },
        body: {
          en: "A guest should open the invitation in one tap. Static and video invitations play inside the chat; a link version opens in the browser. Nothing asks the guest to install anything.", ar: "يجب أن يفتح الضيف الدعوة بنقرة واحدة. تُعرَض الدعوات الثابتة والفيديو داخل المحادثة؛ وتفتح نسخة الرابط في المتصفّح. لا شيء يطلب من الضيف تثبيت أي تطبيق.",
        },
      },
    ],
    faqs: [
      { q: { en: "Is the WhatsApp invitation sent as an image, video, or link?", ar: "هل ترسل الدعوة كصورة أم فيديو أم رابط؟" }, a: { en: "Any of the three. Most families send a still card or a short video; a link is useful when you want RSVP or a map button attached.", ar: "أيٌّ من الثلاثة. معظم العائلات ترسل بطاقة ثابتة أو فيديو قصير؛ والرابط مفيد حين تريدون إرفاق تأكيد حضور أو زر خريطة." } },
      { q: { en: "Does the guest need to install an app?", ar: "هل يحتاج الضيف إلى تحميل تطبيق؟" }, a: { en: "No. Images and videos open in WhatsApp itself, and a link opens in the phone's browser.", ar: "لا. تُفتح الصور والفيديوهات داخل واتساب نفسه، ويفتح الرابط في متصفّح الهاتف." } },
      { q: { en: "Can each invitation be personalized with the guest name?", ar: "هل يمكن تخصيص الدعوة باسم كل ضيف؟" }, a: { en: "We can prepare named versions for a defined guest list as a design task. We do not run an automated bulk-sending service — you send from your own WhatsApp.", ar: "يمكننا تجهيز نسخ باسم كل ضيف لقائمة محدّدة كمهمّة تصميم. لا نُشغّل خدمة إرسال جماعي آلية — ترسلون من واتسابكم الخاص." } },
    ],
    related: ["digital-invitations-rsvp", "digital-invitations-qr-code", "invitations-location-map", "digital-wedding-invitations"],
    ctaHeading: { en: "Get an invitation that sends clean", ar: "احصلوا على دعوة تُرسَل بنقاء" },
  },

  /* ---------- RSVP ---------- */
  {
    slug: "digital-invitations-rsvp",
    weddingLinks: false,
    hasDemos: false,
    breadcrumb: { en: "RSVP invitations", ar: "دعوات مع تأكيد الحضور" },
    meta: {
      title: { en: "Digital Invitations with RSVP UAE | Guest Tracking", ar: "دعوات إلكترونية مع تأكيد الحضور RSVP | الإمارات" },
      description: {
        en: "Digital invitations with an RSVP button so guests accept or decline and you can see who's coming — for weddings and every UAE occasion.",
        ar: "دعوات إلكترونية بزر تأكيد الحضور ليقبل الضيوف أو يعتذروا وترَوا من سيحضر — للأعراس وكل مناسبات الإمارات.",
      },
    },
    hero: {
      eyebrow: { en: "Guest management", ar: "إدارة الضيوف" },
      h1: { en: "Digital invitations with RSVP and clear guest responses", ar: "دعوات إلكترونية مع قبول واعتذار وتتبع الحضور" },
      lead: {
        en: "Counting heads by scrolling a family chat does not work at 200 guests. We attach an RSVP button to your invitation so people accept or apologise in a tap, and you collect the responses in one place instead of a hundred messages.",
        ar: "عدّ الحضور بتصفّح محادثة العائلة لا ينجح مع 200 ضيف. نُرفِق بدعوتكم زرّ تأكيد حضور ليقبل الناس أو يعتذروا بنقرة، وتجمعون الردود في مكان واحد بدل مئة رسالة.",
      },
    },
    intro: {
      en: "This page owns RSVP and تأكيد الحضور. The invitation carries a button that opens a short response form; you decide what it asks — attending or not, number of guests, and any note. It solves a different job from a QR entry code or a venue map, which live on their own pages.",
      ar: "تختصّ هذه الصفحة بتأكيد الحضور RSVP. تحمل الدعوة زرّاً يفتح نموذج ردٍّ قصير؛ تقرّرون ما يسأل عنه — الحضور من عدمه، وعدد المرافقين، وأي ملاحظة. تحلّ هذه مهمّة مختلفة عن باركود الدخول أو خريطة الموقع، ولكلٍّ صفحته.",
    },
    provides: {
      title: invitationUi.provides,
      items: [
        { en: "What the RSVP should ask (attendance, plus-ones, notes)", ar: "ما يسأل عنه التأكيد (الحضور، المرافقون، الملاحظات)" },
        { en: "A deadline for responses, if any", ar: "موعد نهائي للردود، إن وُجد" },
        { en: "Your event details for the card itself", ar: "تفاصيل مناسبتكم للبطاقة نفسها" },
      ],
    },
    scopes: {
      recommended: SCOPE_MOTION,
      enhanced: {
        name: { en: "RSVP + Reminders Suite", ar: "باقة التأكيد والتذكيرات" },
        tagline: { en: "Responses plus a nudge for the guests who go quiet.", ar: "ردود مع تذكير للضيوف الذين لم يردّوا." },
        includes: [
          { en: "Everything in the Motion + RSVP Suite", ar: "كل ما في باقة الحركة وتأكيد الحضور" },
          { en: "A response form tailored to your questions", ar: "نموذج ردٍّ مُفصّل حسب أسئلتكم" },
          { en: "A simple summary of who has replied", ar: "ملخّص بسيط لمن ردّ" },
          { en: "A follow-up card to re-send to guests who haven't answered", ar: "بطاقة متابعة لإعادة إرسالها لمن لم يجب" },
        ],
      },
    },
    turnaround: DEFAULT_TURNAROUND,
    sections: [
      {
        h2: { en: "Accept, apologise, done", ar: "قبول، اعتذار، انتهى" },
        body: {
          en: "The form is deliberately short — a guest answers in seconds. You choose whether to also collect the number of people attending and any dietary or seating note.", ar: "النموذج قصير عمداً — يجيب الضيف في ثوانٍ. تختارون هل تجمعون أيضاً عدد الحاضرين وأي ملاحظة عن الطعام أو الجلوس.",
        },
      },
      {
        h2: { en: "RSVP is not check-in", ar: "تأكيد الحضور ليس تسجيل الدخول" },
        body: {
          en: "RSVP tells you who plans to come. A QR code checks guests in at the door. If you need both, we link the two so the design stays clean and each does its own job.", ar: "يخبركم تأكيد الحضور بمن ينوي الحضور. أمّا الباركود فيُسجّل دخول الضيوف عند الباب. إن احتجتم الاثنين، نربطهما كي يبقى التصميم نظيفاً ويؤدّي كلٌّ مهمّته.",
        },
      },
    ],
    faqs: [
      { q: { en: "How do guests accept or decline the invitation?", ar: "كيف يؤكد الضيف الحضور أو الاعتذار؟" }, a: { en: "They tap the RSVP button on the invitation, which opens a short form to accept or apologise. No app needed.", ar: "ينقر الضيف زرّ التأكيد على الدعوة، فيفتح نموذجاً قصيراً للقبول أو الاعتذار. دون حاجة لتطبيق." } },
      { q: { en: "Can RSVP collect plus-ones and meal preferences?", ar: "هل يمكن جمع عدد المرافقين وتفضيلات الطعام؟" }, a: { en: "Yes — you decide which questions the form includes, including number of guests and any notes.", ar: "نعم — تقرّرون أي أسئلة يتضمّنها النموذج، بما في ذلك عدد المرافقين وأي ملاحظات." } },
      { q: { en: "Can I remind guests who have not responded?", ar: "هل يمكن إرسال تذكير لمن لم يرد؟" }, a: { en: "The Enhanced scope includes a follow-up card you can re-send to guests who haven't replied yet. You send it from your own WhatsApp.", ar: "يشمل النطاق المطوّر بطاقة متابعة تعيدون إرسالها لمن لم يردّ بعد. ترسلونها من واتسابكم." } },
    ],
    related: ["whatsapp-invitations", "digital-invitations-qr-code", "invitations-location-map", "digital-wedding-invitations"],
    ctaHeading: { en: "Know your headcount before the day", ar: "اعرفوا عدد الحضور قبل اليوم" },
  },

  /* ---------- QR ---------- */
  {
    slug: "digital-invitations-qr-code",
    weddingLinks: false,
    hasDemos: false,
    breadcrumb: { en: "QR code invitations", ar: "دعوات مع باركود QR" },
    meta: {
      title: { en: "Digital Invitations with QR Code Check-In UAE", ar: "دعوات إلكترونية مع باركود QR للدخول | الإمارات" },
      description: {
        en: "Digital invitations with a QR code for guest entry and check-in. Arabic families often say باركود — we design both the card and the code.",
        ar: "دعوات إلكترونية بباركود QR لدخول الضيوف وتسجيلهم. كثيرون يقولون باركود — نصمّم البطاقة والكود معاً.",
      },
    },
    hero: {
      eyebrow: { en: "Access & entry", ar: "الدخول والوصول" },
      h1: { en: "Digital invitations with a QR code for each guest", ar: "دعوات إلكترونية بباركود QR مخصّص لكل ضيف" },
      lead: {
        en: "For a controlled entrance, a QR code on the invitation lets your door team check guests in quickly. Arabic guests often call it باركود even when it's a QR — we include both words so no one is confused, and design the code into the card, not stuck on as an afterthought.",
        ar: "لدخول منضبط، يتيح باركود QR على الدعوة لفريق الباب تسجيل الضيوف بسرعة. كثيراً ما يسمّيه الضيوف العرب باركود وإن كان QR — ندرج الكلمتين كي لا يلتبس الأمر، ونصمّم الكود داخل البطاقة لا مُلصَقاً عليها.",
      },
    },
    intro: {
      en: "This page owns unique-code entry intent. A QR check-in code answers 'who is at the door', which is a different job from RSVP ('who is coming') and a map link ('how do I get there'). Each has its own page so search and guests can tell them apart.",
      ar: "تختصّ هذه الصفحة بالدخول عبر كود مخصّص. يجيب باركود الدخول عن 'من عند الباب'، وهي مهمّة مختلفة عن تأكيد الحضور ('من سيأتي') ورابط الموقع ('كيف أصل'). لكلٍّ صفحته كي يميّزها البحث والضيوف.",
    },
    provides: {
      title: invitationUi.provides,
      items: [
        { en: "Whether the code is for RSVP, entry, or both", ar: "هل الكود لتأكيد الحضور أم للدخول أم للاثنين" },
        { en: "Your guest list, if you want per-guest codes", ar: "قائمة الضيوف، إن أردتم كوداً لكل ضيف" },
        { en: "Event details for the card", ar: "تفاصيل المناسبة للبطاقة" },
      ],
    },
    scopes: { recommended: SCOPE_MOTION, enhanced: SCOPE_MOTION },
    turnaround: DEFAULT_TURNAROUND,
    sections: [
      {
        h2: { en: "One code, or one per guest", ar: "كودٌ واحد، أو واحد لكل ضيف" },
        body: {
          en: "A single QR suits a family gathering; per-guest codes suit a controlled event where each person scans in once. We design the code so it stays scannable at the size WhatsApp delivers.", ar: "يناسب باركود واحد لمّة عائلية؛ وتناسب أكوادٌ لكل ضيف مناسبةً منضبطة يمسح فيها كلٌّ كودَه مرة. نصمّم الكود كي يبقى قابلاً للمسح بالمقاس الذي يسلّمه واتساب.",
        },
      },
      {
        h2: { en: "What your door team needs", ar: "ما يحتاجه فريق الباب" },
        body: {
          en: "A QR can be read with an ordinary phone camera, so a small entrance doesn't need special hardware. For large events with dedicated gate staff, tell us and we'll design the codes to match how they'll scan.", ar: "يمكن قراءة QR بكاميرا هاتف عادية، فالمدخل الصغير لا يحتاج أجهزة خاصة. للمناسبات الكبيرة بفريق باب مخصّص، أخبرونا لنصمّم الأكواد بما يناسب طريقة مسحهم.",
        },
      },
    ],
    faqs: [
      { q: { en: "Does each guest receive a unique QR code?", ar: "هل يحصل كل ضيف على باركود مختلف؟" }, a: { en: "That's optional. We can design one shared code or a unique code per guest from your list, depending on how tightly you want to manage entry.", ar: "هذا اختياري. يمكننا تصميم كود مشترك واحد أو كود مخصّص لكل ضيف من قائمتكم، حسب مدى انضباط الدخول الذي تريدونه." } },
      { q: { en: "Is the QR code for RSVP, venue check-in, or both?", ar: "هل يستخدم الباركود لتأكيد الحضور أم للدخول؟" }, a: { en: "Either. Tell us the job and we design accordingly — an RSVP code, an entry code, or one linked to both.", ar: "أيّهما. أخبرونا بالمهمّة ونصمّم بناءً عليها — كود تأكيد حضور، أو كود دخول، أو كودٌ يربط الاثنين." } },
      { q: { en: "Does the door team need special scanning hardware?", ar: "هل يحتاج مسؤول الباب إلى جهاز خاص للمسح؟" }, a: { en: "For most events an ordinary phone camera reads the code. Larger gated events may use dedicated scanners — tell us and we'll match the design to them.", ar: "لمعظم المناسبات تقرأ كاميرا هاتف عادية الكود. قد تستخدم المناسبات الكبيرة ماسحات مخصّصة — أخبرونا لنطابق التصميم معها." } },
    ],
    related: ["digital-invitations-rsvp", "whatsapp-invitations", "invitations-location-map", "katb-kitab-invitations"],
    ctaHeading: { en: "Add a clean entry code to your invitation", ar: "أضيفوا كود دخول أنيقاً لدعوتكم" },
  },

  /* ---------- Location map ---------- */
  {
    slug: "invitations-location-map",
    weddingLinks: false,
    hasDemos: false,
    breadcrumb: { en: "Invitations with venue map", ar: "دعوات مع رابط الموقع" },
    meta: {
      title: { en: "Digital Invitations with Location Map | UAE Venues", ar: "دعوة إلكترونية مع رابط الموقع والخريطة | Google Maps" },
      description: {
        en: "Digital invitations with a one-tap venue map — Google Maps and Waze links, parking and entrance notes, so guests arrive without calling for directions.",
        ar: "دعوات إلكترونية بخريطة موقع بنقرة واحدة — روابط Google Maps وWaze وملاحظات المواقف والمدخل، ليصل الضيوف دون الاتصال للسؤال عن الطريق.",
      },
    },
    hero: {
      eyebrow: { en: "Venue navigation", ar: "الوصول للمكان" },
      h1: { en: "Digital invitations with one-tap venue maps and directions", ar: "دعوات إلكترونية مع لوكيشن القاعة ورابط الخريطة" },
      lead: {
        en: "UAE venues can be hard to find — the right tower, the right entrance, the right parking. We put a map button on the invitation that opens Google Maps or Waze straight to the door, so your guests spend the evening with you, not circling the block.",
        ar: "قد يصعب إيجاد قاعات الإمارات — البرج الصحيح، والمدخل الصحيح، والموقف الصحيح. نضع زرّ خريطة على الدعوة يفتح Google Maps أو Waze مباشرةً إلى الباب، كي يقضي ضيوفكم المساء معكم لا يدورون حول المبنى.",
      },
    },
    intro: {
      en: "This page owns location, map, directions and لوكيشن intent. A map link is not the same as an entry QR: one gets guests to the venue, the other gets them through the door. We keep the two distinct and explain the difference on the card when both are used.",
      ar: "تختصّ هذه الصفحة بالموقع والخريطة والاتجاهات ولوكيشن القاعة. رابط الخريطة ليس كباركود الدخول: أحدهما يوصل الضيف إلى المكان، والآخر يُدخِله من الباب. نُبقي الاثنين متمايزين ونوضّح الفرق على البطاقة عند استخدامهما معاً.",
    },
    provides: {
      title: invitationUi.provides,
      items: [
        { en: "The venue's exact location or map pin", ar: "الموقع الدقيق للقاعة أو دبّوس الخريطة" },
        { en: "Parking and entrance notes, if any", ar: "ملاحظات المواقف والمدخل، إن وُجدت" },
        { en: "Event details for the card", ar: "تفاصيل المناسبة للبطاقة" },
      ],
    },
    scopes: { recommended: SCOPE_STATIC, enhanced: SCOPE_MOTION },
    turnaround: DEFAULT_TURNAROUND,
    sections: [
      {
        h2: { en: "Google Maps and Waze", ar: "Google Maps وWaze" },
        body: {
          en: "We add whichever map links your guests actually use in the UAE. The button drops them at the pin you give us — not a vague area — with parking and entrance notes written on the card.", ar: "نضيف روابط الخرائط التي يستخدمها ضيوفكم فعلاً في الإمارات. يُنزِلهم الزر عند الدبّوس الذي تعطونه — لا منطقة غامضة — مع ملاحظات المواقف والمدخل مكتوبة على البطاقة.",
        },
      },
      {
        h2: { en: "Map QR vs entry QR", ar: "باركود الموقع مقابل باركود الدخول" },
        body: {
          en: "Some couples want the map itself behind a QR. That's fine — but it's a different code from a check-in QR. We label each clearly so guests scan the right one.", ar: "يريد بعض الأزواج الخريطة نفسها خلف باركود. لا مانع — لكنه كود مختلف عن باركود تسجيل الدخول. نوسم كلّاً بوضوح كي يمسح الضيوف الصحيح.",
        },
      },
    ],
    faqs: [
      { q: { en: "Can the invitation include Google Maps and Waze links?", ar: "هل يمكن إضافة رابط Google Maps وWaze؟" }, a: { en: "Yes. We add a map button that opens Google Maps, Waze, or both, straight to the pin you provide.", ar: "نعم. نضيف زرّ خريطة يفتح Google Maps أو Waze أو الاثنين، مباشرةً إلى الدبّوس الذي تزوّدوننا به." } },
      { q: { en: "Can you add parking and entrance instructions?", ar: "هل يمكن إضافة مواقف السيارات ومدخل القاعة؟" }, a: { en: "Yes — short parking and entrance notes fit neatly on the card alongside the map button.", ar: "نعم — تتّسع ملاحظات المواقف والمدخل القصيرة بأناقة على البطاقة بجوار زر الخريطة." } },
      { q: { en: "What is the difference between an entry QR and a map QR?", ar: "ما الفرق بين باركود الدخول وباركود الموقع؟" }, a: { en: "An entry QR checks a guest in at the door. A map QR opens directions to the venue. We label each so no one scans the wrong one.", ar: "باركود الدخول يُسجّل الضيف عند الباب. وباركود الموقع يفتح الاتجاهات إلى القاعة. نوسم كلّاً كي لا يمسح أحدٌ الخطأ." } },
    ],
    related: ["digital-invitations-rsvp", "digital-invitations-qr-code", "digital-wedding-invitations", "katb-kitab-invitations"],
    ctaHeading: { en: "Get every guest to the right door", ar: "أوصِلوا كل ضيف إلى الباب الصحيح" },
  },

  /* ---------- Digital wedding invitations ---------- */
  {
    slug: "digital-wedding-invitations",
    categorySlug: "wedding-invitation",
    weddingLinks: true,
    hasDemos: true,
    breadcrumb: { en: "Digital wedding invitations", ar: "دعوات زفاف إلكترونية" },
    meta: {
      title: { en: "Digital Wedding Invitations UAE | WhatsApp and RSVP", ar: "دعوات زفاف إلكترونية فخمة في الإمارات | واتساب وRSVP" },
      description: {
        en: "Arabic and English digital wedding invitations for the UAE — static cards, animated video invites, WhatsApp-ready, with optional RSVP, QR and venue map.",
        ar: "دعوات زفاف إلكترونية بالعربي والإنجليزي للإمارات — بطاقات ثابتة، ودعوات فيديو متحركة، جاهزة للواتساب، مع تأكيد حضور وQR وخريطة موقع اختيارية.",
      },
    },
    hero: {
      eyebrow: { en: "Weddings", ar: "الأعراس" },
      h1: { en: "Arabic and English digital wedding invitations made for WhatsApp", ar: "دعوات زفاف إلكترونية عربية وإنجليزية جاهزة للواتساب" },
      lead: {
        en: "Your wedding invitation is the first thing guests see of the day. We design دعوات زفاف إلكترونية that feel like the wedding you're planning — elegant Arabic typography, an optional animated version, and everything sized to send on WhatsApp — with RSVP, a map or a QR added only if you want them.",
        ar: "دعوة زفافكم أول ما يراه الضيوف من اليوم. نصمّم دعوات زفاف إلكترونية تشبه العرس الذي تخطّطون له — طباعة عربية أنيقة، ونسخة متحركة اختيارية، وكل شيء بمقاس الإرسال عبر واتساب — مع تأكيد حضور أو خريطة أو باركود يُضاف فقط إن أردتموه.",
      },
    },
    intro: {
      en: "This page is about the invitation design and how it's delivered — not the wedding coverage itself. For photography and film on the day, Big Story's wedding pages cover that; this service owns the دعوة زفاف إلكترونية that goes out before it.",
      ar: "هذه الصفحة عن تصميم الدعوة وطريقة تسليمها — لا عن تغطية الزفاف نفسه. أمّا التصوير والفيلم يوم الحدث فتغطّيهما صفحات الزفاف لدى بيك ستوري؛ وتختصّ هذه الخدمة بـ دعوة زفاف إلكترونية التي تُرسَل قبله.",
    },
    provides: {
      title: invitationUi.provides,
      items: [
        { en: "Both names as you want them spelled", ar: "الاسمان كما تريدون كتابتهما" },
        { en: "Wedding date, time and venue", ar: "تاريخ الزفاف ووقته ومكانه" },
        { en: "Language: Arabic, English or both", ar: "اللغة: عربي أو إنجليزي أو الاثنان" },
        { en: "A preferred phrase or verse, if any", ar: "عبارة أو آية مفضّلة، إن وُجدت" },
        { en: "Whether you want RSVP, a map or a QR", ar: "هل تريدون تأكيد حضور أو خريطة أو باركود" },
      ],
    },
    scopes: { recommended: SCOPE_STATIC, enhanced: SCOPE_MOTION },
    turnaround: DEFAULT_TURNAROUND,
    sections: [
      {
        h2: { en: "Static card or animated video", ar: "بطاقة ثابتة أم فيديو متحرك" },
        body: {
          en: "A still card is fast, timeless and easy to resend. An animated video adds music and movement for a bigger first impression. Many couples send the video to the main invite list and the still card for quick reminders. You can order either or both.", ar: "البطاقة الثابتة سريعة وخالدة وسهلة إعادة الإرسال. والفيديو المتحرك يضيف موسيقى وحركة لانطباع أول أقوى. يرسل كثير من الأزواج الفيديو للقائمة الرئيسية والبطاقة الثابتة للتذكير السريع. يمكنكم طلب أيّهما أو كليهما.",
        },
      },
      {
        h2: { en: "Add RSVP, map or QR — only if useful", ar: "أضيفوا تأكيد حضور أو خريطة أو باركود — عند الحاجة فقط" },
        body: {
          en: "We don't bolt on features you don't need. Want to track replies? Add RSVP. Hard-to-find venue? Add a map button. Controlled entrance? Add a QR. Each links from here to its own service so the invitation stays uncluttered.", ar: "لا نُضيف ميزات لا تحتاجونها. تريدون متابعة الردود؟ أضيفوا تأكيد الحضور. القاعة صعبة الإيجاد؟ أضيفوا زر خريطة. مدخل منضبط؟ أضيفوا باركود. تُربَط كلٌّ من هنا بخدمتها كي تبقى الدعوة مرتّبة.",
        },
      },
    ],
    faqs: [
      { q: { en: "What is the difference between a digital wedding invitation and a video invite?", ar: "ما الفرق بين دعوة الزفاف الإلكترونية ودعوة الفيديو؟" }, a: { en: "A digital invitation is usually a still card you send as an image. A video invite is a short animated MP4 with music and motion. Both are covered here; you can order either or both.", ar: "الدعوة الإلكترونية عادةً بطاقة ثابتة تُرسَل كصورة. ودعوة الفيديو مقطع MP4 قصير متحرك بموسيقى وحركة. الاثنان مشمولان هنا؛ ويمكنكم طلب أيّهما أو كليهما." } },
      { q: { en: "Can you add RSVP and a venue map link?", ar: "هل يمكن إضافة تأكيد الحضور ورابط القاعة؟" }, a: { en: "Yes — RSVP and a Google Maps / Waze button are optional additions. See our RSVP and venue-map services for the detail.", ar: "نعم — تأكيد الحضور وزر Google Maps / Waze إضافتان اختياريتان. راجعوا خدمتَي تأكيد الحضور وخريطة الموقع للتفاصيل." } },
      { q: { en: "Can one wedding invitation include Arabic and English?", ar: "هل تصممون نسخة عربية ونسخة إنجليزية من الدعوة نفسها؟" }, a: { en: "Yes. We can place both languages on one card or deliver separate Arabic and English versions with matching details.", ar: "نعم. يمكننا وضع اللغتين على بطاقة واحدة أو تسليم نسختين عربية وإنجليزية بتفاصيل متطابقة." } },
    ],
    related: ["katb-kitab-invitations", "wedding-save-the-date", "animated-video-invitations", "digital-invitations-rsvp"],
    ctaHeading: { en: "Design your wedding invitation", ar: "صمّموا دعوة زفافكم" },
  },

  /* ---------- Katb Kitab / Aqd Qiran ---------- */
  {
    slug: "katb-kitab-invitations",
    categorySlug: "katb-kitab",
    weddingLinks: true,
    hasDemos: true,
    breadcrumb: { en: "Katb Kitab invitations", ar: "دعوات عقد قران" },
    meta: {
      title: { en: "Aqd Qiran and Nikah Digital Invitations UAE | Big Story", ar: "دعوة عقد قران إلكترونية | تصميم عربي للواتساب" },
      description: {
        en: "Elegant digital دعوة عقد قران — Katb Kitab, Aqd Qiran and Nikah invitations in Arabic for UAE families, WhatsApp-ready with optional RSVP and venue map.",
        ar: "دعوة عقد قران إلكترونية أنيقة — بطاقات عقد قران ونكاح بالعربية لعائلات الإمارات، جاهزة للواتساب مع تأكيد حضور وخريطة اختياريين.",
      },
    },
    hero: {
      eyebrow: { en: "Ceremony", ar: "المناسبة" },
      h1: { en: "Elegant Aqd Qiran and Nikah digital invitations for UAE families", ar: "دعوات عقد قران إلكترونية عربية تليق بالمناسبة" },
      lead: {
        en: "The عقد قران deserves an invitation with the right restraint and warmth. We design دعوة عقد قران — Katb Kitab and Nikah — in Arabic first, with wording that suits the occasion and a layout that feels considered, not generic.",
        ar: "يستحقّ عقد القران دعوةً بالوقار والدفء المناسبين. نصمّم دعوة عقد قران — كتب الكتاب والنكاح — بالعربية أولاً، بعبارات تليق بالمناسبة وتنسيق مدروس لا نمطيّ.",
      },
    },
    intro: {
      en: "This page is about the invitation card for the ceremony. We always keep دعوة or بطاقة beside عقد قران — this is an invitation design service, not a legal marriage-contract or government service. For the wider celebration, it links to the wedding and Malka invitation pages.",
      ar: "هذه الصفحة عن بطاقة الدعوة للمناسبة. نُبقي دائماً كلمة دعوة أو بطاقة بجوار عقد قران — فهذه خدمة تصميم دعوات، لا خدمة عقد زواج قانوني أو حكومية. وللاحتفال الأوسع، تُربَط بصفحتَي دعوات الزفاف والملكة.",
    },
    provides: {
      title: invitationUi.provides,
      items: [
        { en: "Both family names as you want them shown", ar: "اسما العائلتين كما تريدون إظهارهما" },
        { en: "Ceremony date, time and place", ar: "تاريخ المناسبة ووقتها ومكانها" },
        { en: "Preferred wording or verse", ar: "العبارة أو الآية المفضّلة" },
        { en: "Whether you want a map or RSVP", ar: "هل تريدون خريطة أو تأكيد حضور" },
      ],
    },
    scopes: { recommended: SCOPE_STATIC, enhanced: SCOPE_MOTION },
    turnaround: DEFAULT_TURNAROUND,
    sections: [
      {
        h2: { en: "Wording that fits the occasion", ar: "عبارات تليق بالمناسبة" },
        body: {
          en: "The عقد قران invitation reads differently from a big reception card — quieter, more formal. We help you choose wording that suits close family and the tone of the day, in Arabic that is set correctly.", ar: "تُقرأ دعوة عقد القران بشكل مختلف عن بطاقة حفل كبير — أهدأ وأكثر رسميّة. نساعدكم على اختيار عبارات تناسب الأهل المقرّبين ونبرة اليوم، بعربية مضبوطة.",
        },
      },
      {
        h2: { en: "Aqd Qiran, Katb Kitab or Nikah", ar: "عقد قران، كتب كتاب، أو نكاح" },
        body: {
          en: "Families use different words for the same ceremony. We design for all of them and place the phrase you use most, so the invitation speaks the way your family does.", ar: "تستخدم العائلات كلمات مختلفة للمناسبة نفسها. نصمّم لها جميعاً ونضع العبارة التي تستخدمونها أكثر، كي تتحدّث الدعوة بلسان عائلتكم.",
        },
      },
    ],
    faqs: [
      { q: { en: "Is an Aqd Qiran invitation the same as a Malka invitation?", ar: "هل دعوة عقد القران هي نفسها دعوة الملكة؟" }, a: { en: "They can overlap in Gulf usage, but many families hold them separately. We design each with its own wording — see our Malka and engagement page for that occasion.", ar: "قد تتداخلان في الاستخدام الخليجي، لكن كثيراً من العائلات تقيمهما منفصلتين. نصمّم كلّاً بعباراتها — راجعوا صفحة الملكة والخطوبة لتلك المناسبة." } },
      { q: { en: "What details should a Nikah invitation include?", ar: "ما البيانات التي يجب أن تتضمّنها دعوة عقد القران؟" }, a: { en: "Usually the two family names, the date, time and place, and a short preferred phrase. You can add a map or RSVP if guests need them.", ar: "عادةً اسما العائلتين، والتاريخ والوقت والمكان، وعبارة قصيرة مفضّلة. يمكنكم إضافة خريطة أو تأكيد حضور إن احتاجهما الضيوف." } },
      { q: { en: "Can you add a map link and RSVP?", ar: "هل يمكن إضافة رابط الموقع وتأكيد الحضور؟" }, a: { en: "Yes, both are optional additions. We keep the card restrained so the extras don't crowd the design.", ar: "نعم، كلاهما إضافة اختيارية. نُبقي البطاقة موقّرة كي لا تزدحم الإضافات بالتصميم." } },
    ],
    related: ["digital-wedding-invitations", "malka-engagement-invitations", "wedding-announcements", "animated-video-invitations"],
    ctaHeading: { en: "Design your Aqd Qiran invitation", ar: "صمّموا دعوة عقد قرانكم" },
  },

  /* ---------- Malka & engagement ---------- */
  {
    slug: "malka-engagement-invitations",
    categorySlug: "engagement-milka",
    weddingLinks: true,
    hasDemos: true,
    breadcrumb: { en: "Malka & engagement", ar: "دعوات ملكة وخطوبة" },
    meta: {
      title: { en: "Malka and Engagement Digital Invitations UAE | Big Story", ar: "دعوات ملكة وخطوبة إلكترونية | واتساب والإمارات والخليج" },
      description: {
        en: "Digital Malka and engagement invitations in Arabic for the UAE and GCC — static cards and animated video invites, WhatsApp-ready, with clear sections for each event.",
        ar: "دعوات ملكة وخطوبة إلكترونية بالعربية للإمارات والخليج — بطاقات ثابتة ودعوات فيديو متحركة، جاهزة للواتساب، بأقسام واضحة لكل مناسبة.",
      },
    },
    hero: {
      eyebrow: { en: "Engagement & Malka", ar: "الخطوبة والملكة" },
      h1: { en: "Arabic Malka and engagement invitations for WhatsApp", ar: "دعوات ملكة وخطوبة إلكترونية عربية للواتساب" },
      lead: {
        en: "The ملكة and the خطوبة each have their own feeling — one intimate and ceremonial, the other celebratory. We design دعوات ملكة وخطوبة that fit whichever you're holding, in Arabic first and ready to send on WhatsApp.",
        ar: "للملكة وللخطوبة كلٌّ إحساسها — واحدة حميمة ومراسمية، والأخرى احتفالية. نصمّم دعوات ملكة وخطوبة تناسب ما تقيمونه، بالعربية أولاً وجاهزة للإرسال عبر واتساب.",
      },
    },
    intro: {
      en: "Malka and engagement can be one event or two. This page handles both with clearly labelled designs, so a Malka card reads as a Malka and an engagement card as an engagement. It links to the Aqd Qiran and wedding pages for the rest of the journey.",
      ar: "قد تكون الملكة والخطوبة مناسبةً واحدة أو مناسبتين. تتناول هذه الصفحة الاثنتين بتصاميم موسومة بوضوح، كي تُقرأ بطاقة الملكة ملكةً وبطاقة الخطوبة خطوبةً. وتُربَط بصفحتَي عقد القران والزفاف لبقيّة الرحلة.",
    },
    provides: {
      title: invitationUi.provides,
      items: [
        { en: "Whether it's a Malka, an engagement, or both", ar: "هل هي ملكة أم خطوبة أم الاثنتان" },
        { en: "Names and event details", ar: "الأسماء وتفاصيل المناسبة" },
        { en: "Whose side is hosting, if relevant", ar: "أي جهة تستضيف، إن كان ذا صلة" },
        { en: "Language and any preferred wording", ar: "اللغة وأي عبارة مفضّلة" },
      ],
    },
    scopes: { recommended: SCOPE_STATIC, enhanced: SCOPE_MOTION },
    turnaround: DEFAULT_TURNAROUND,
    sections: [
      {
        h2: { en: "Malka and engagement, clearly separated", ar: "ملكة وخطوبة، منفصلتان بوضوح" },
        body: {
          en: "We don't send a guest a Malka card that says engagement. Each design names its own occasion, so there's no confusion about which event they're invited to.", ar: "لا نرسل للضيف بطاقة ملكة مكتوباً عليها خطوبة. يسمّي كل تصميم مناسبته، فلا التباس حول أي مناسبة هو مدعوٌّ إليها.",
        },
      },
      {
        h2: { en: "For the bride's side or the groom's", ar: "لجهة العروس أو العريس" },
        body: {
          en: "Gulf families often host separate gatherings. We can design matching cards for each side that share a look while carrying the right details for each event.", ar: "كثيراً ما تستضيف العائلات الخليجية لمّات منفصلة. يمكننا تصميم بطاقات متناسقة لكل جهة تتشارك المظهر وتحمل التفاصيل الصحيحة لكل مناسبة.",
        },
      },
    ],
    faqs: [
      { q: { en: "What is the difference between a Malka and an engagement invitation?", ar: "ما الفرق بين دعوة الملكة ودعوة الخطوبة؟" }, a: { en: "An engagement marks the agreement to marry; a Malka is a more formal, often ceremonial gathering. We design each with wording that fits, and can do both if you're holding two events.", ar: "الخطوبة تُعلن الاتفاق على الزواج؛ والملكة لمّة أكثر رسميّة وغالباً مراسمية. نصمّم كلّاً بعبارات تناسبها، ويمكننا تصميم الاثنتين إن كنتم تقيمون مناسبتين." } },
      { q: { en: "Can you create Malka invitations for the bride or groom side?", ar: "هل يمكن تصميم دعوة ملكة للعروس أو للعريس؟" }, a: { en: "Yes. We can design coordinated cards for each side that share a style but carry the right details.", ar: "نعم. يمكننا تصميم بطاقات منسّقة لكل جهة تتشارك الأسلوب وتحمل التفاصيل الصحيحة." } },
      { q: { en: "Can I receive both a static card and an animated video?", ar: "هل تتوفر الدعوة كصورة وفيديو؟" }, a: { en: "Yes — the Motion + RSVP Suite includes an animated MP4 alongside the static sizes.", ar: "نعم — تشمل باقة الحركة وتأكيد الحضور فيديو MP4 متحركاً إلى جانب المقاسات الثابتة." } },
    ],
    related: ["katb-kitab-invitations", "wedding-save-the-date", "digital-wedding-invitations"],
    ctaHeading: { en: "Design your Malka or engagement invitation", ar: "صمّموا دعوة ملكتكم أو خطوبتكم" },
  },

  /* ---------- Save the Date ---------- */
  {
    slug: "wedding-save-the-date",
    categorySlug: "save-the-date",
    weddingLinks: true,
    hasDemos: true,
    breadcrumb: { en: "Save the Date", ar: "احفظوا التاريخ" },
    meta: {
      title: { en: "Wedding Save the Date UAE | Arabic and English Digital Design", ar: "تصميم Save the Date للزفاف | احفظوا التاريخ" },
      description: {
        en: "Arabic and English wedding Save the Date cards for UAE guests — an early, elegant heads-up before the formal invitation, ready to share on WhatsApp.",
        ar: "بطاقات احفظوا التاريخ للزفاف بالعربي والإنجليزي لضيوف الإمارات — تنبيه مبكّر أنيق قبل الدعوة الرسمية، جاهز للمشاركة عبر واتساب.",
      },
    },
    hero: {
      eyebrow: { en: "Early notice", ar: "تنبيه مبكّر" },
      h1: { en: "Arabic and English wedding Save the Date cards for UAE guests", ar: "بطاقات احفظوا التاريخ للزفاف بالعربي والإنجليزي" },
      lead: {
        en: "A Save the Date goes out weeks or months early so the people who matter block the date before travel and calendars fill up. We design احفظوا التاريخ cards that set the tone — without giving away all the details that belong on the formal invitation.",
        ar: "تُرسَل بطاقة احفظوا التاريخ قبل أسابيع أو أشهر كي يحجز المهمّون التاريخ قبل امتلاء السفر والتقاويم. نصمّم بطاقات احفظوا التاريخ التي تُهيّئ الأجواء — دون كشف كل التفاصيل التي مكانها الدعوة الرسمية.",
      },
    },
    intro: {
      en: "This is the early heads-up, not the full invitation. We keep it deliberately light — names, a date, a feeling — and use احفظوا التاريخ, احتفظوا بالتاريخ or ثبتوا الموعد as you prefer. When the details are set, the formal wedding invitation follows.",
      ar: "هذا تنبيه مبكّر لا الدعوة الكاملة. نُبقيه خفيفاً عمداً — أسماء، وتاريخ، وإحساس — ونستخدم احفظوا التاريخ أو احتفظوا بالتاريخ أو ثبتوا الموعد كما تفضّلون. وحين تكتمل التفاصيل، تتبعها الدعوة الرسمية.",
    },
    provides: {
      title: invitationUi.provides,
      items: [
        { en: "Names and the wedding date", ar: "الأسماء وتاريخ الزفاف" },
        { en: "City or country, if guests travel", ar: "المدينة أو الدولة، إن كان الضيوف يسافرون" },
        { en: "Preferred Arabic wording for 'Save the Date'", ar: "الصيغة العربية المفضّلة لـ احفظوا التاريخ" },
      ],
    },
    scopes: { recommended: SCOPE_STATIC, enhanced: SCOPE_MOTION },
    turnaround: DEFAULT_TURNAROUND,
    sections: [
      {
        h2: { en: "Just enough, not everything", ar: "ما يكفي، لا كل شيء" },
        body: {
          en: "A Save the Date should make guests hold the date, not plan their outfit. We keep venue, timing and RSVP off it deliberately — those belong on the invitation that follows.", ar: "يجب أن تدفع بطاقة احفظوا التاريخ الضيوف لحجز التاريخ، لا لتخطيط ملابسهم. نُبقي المكان والتوقيت وتأكيد الحضور خارجها عمداً — فمكانها الدعوة التالية.",
        },
      },
      {
        h2: { en: "Add-to-calendar and WhatsApp", ar: "إضافة للتقويم وواتساب" },
        body: {
          en: "We can include an add-to-calendar link so the date lands straight in a guest's phone, and size everything to share cleanly on WhatsApp.", ar: "يمكننا إضافة رابط 'أضف إلى التقويم' كي يستقرّ التاريخ مباشرةً في هاتف الضيف، ونضبط كل شيء للمشاركة بنقاء عبر واتساب.",
        },
      },
    ],
    faqs: [
      { q: { en: "What is the best Arabic wording for Save the Date?", ar: "ما الترجمة الأنسب لعبارة Save the Date بالعربية؟" }, a: { en: "The common options are احفظوا التاريخ, احتفظوا بالتاريخ and ثبتوا الموعد. We use whichever your family prefers.", ar: "الخيارات الشائعة هي احفظوا التاريخ واحتفظوا بالتاريخ وثبتوا الموعد. نستخدم ما تفضّله عائلتكم." } },
      { q: { en: "How is a Save the Date different from the formal invitation?", ar: "ما الفرق بين Save the Date والدعوة الرسمية؟" }, a: { en: "A Save the Date is an early reminder with just names and a date. The formal invitation, sent later, carries venue, timing and any RSVP.", ar: "بطاقة احفظوا التاريخ تذكير مبكّر بالأسماء والتاريخ فقط. أمّا الدعوة الرسمية، وتُرسَل لاحقاً، فتحمل المكان والتوقيت وأي تأكيد حضور." } },
      { q: { en: "Can it include WhatsApp sharing and an add-to-calendar link?", ar: "هل يمكن إرسال البطاقة عبر واتساب مع رابط التقويم؟" }, a: { en: "Yes — we size it for WhatsApp and can add an add-to-calendar link so guests save the date in one tap.", ar: "نعم — نضبطها للواتساب ويمكننا إضافة رابط للتقويم كي يحفظ الضيوف التاريخ بنقرة." } },
    ],
    related: ["digital-wedding-invitations", "malka-engagement-invitations", "animated-video-invitations"],
    ctaHeading: { en: "Send an early Save the Date", ar: "أرسلوا احفظوا التاريخ مبكراً" },
  },

  /* ---------- Wedding announcements ---------- */
  {
    slug: "wedding-announcements",
    categorySlug: "wedding-announcement",
    weddingLinks: true,
    hasDemos: true,
    breadcrumb: { en: "Wedding announcements", ar: "إعلان زواج" },
    meta: {
      title: { en: "Digital Wedding Announcement UAE | Arabic and English", ar: "تصميم إعلان زواج إلكتروني | عربي وإنجليزي" },
      description: {
        en: "Digital wedding announcements to share the news in Arabic and English — a card or animated post for family and friends, without the private event details.",
        ar: "إعلانات زواج إلكترونية لمشاركة الخبر بالعربي والإنجليزي — بطاقة أو منشور متحرك للعائلة والأصدقاء، دون تفاصيل المناسبة الخاصة.",
      },
    },
    hero: {
      eyebrow: { en: "Sharing the news", ar: "مشاركة الخبر" },
      h1: { en: "Digital wedding announcements for sharing the news in Arabic and English", ar: "إعلانات زواج إلكترونية لمشاركة الخبر مع العائلة والأصدقاء" },
      lead: {
        en: "An announcement shares the good news; it doesn't ask anyone to attend. We design إعلان زواج cards and posts for family and friends — warm, shareable, and free of the private venue and timing that only invited guests need.",
        ar: "الإعلان يشارك الخبر السعيد؛ لا يطلب من أحدٍ الحضور. نصمّم بطاقات ومنشورات إعلان زواج للعائلة والأصدقاء — دافئة، قابلة للمشاركة، وخاليةً من المكان والتوقيت الخاصّين اللذين لا يحتاجهما إلا المدعوّون.",
      },
    },
    intro: {
      en: "This page owns announcement and بشارة intent — sharing that a marriage has happened or is happening — not attendance. It deliberately leaves out RSVP, guest lists and venue detail, which belong to the wedding invitation page. It's ideal for a wider circle or a public post.",
      ar: "تختصّ هذه الصفحة بالإعلان والبشارة — مشاركة أن زواجاً قد تمّ أو سيتمّ — لا الحضور. وتترك عمداً تأكيد الحضور وقوائم الضيوف وتفاصيل المكان، فمكانها صفحة دعوة الزفاف. وهي مثالية لدائرة أوسع أو منشور عام.",
    },
    provides: {
      title: invitationUi.provides,
      items: [
        { en: "Names and the wording you want", ar: "الأسماء والعبارة التي تريدونها" },
        { en: "Whether to include a date or keep it general", ar: "هل تُدرجون تاريخاً أم تُبقونه عاماً" },
        { en: "Where you'll post it (WhatsApp, Instagram)", ar: "أين ستنشرونه (واتساب، إنستغرام)" },
      ],
    },
    scopes: { recommended: SCOPE_STATIC, enhanced: SCOPE_MOTION },
    turnaround: DEFAULT_TURNAROUND,
    sections: [
      {
        h2: { en: "News, not an invitation", ar: "خبر، لا دعوة" },
        body: {
          en: "Because an announcement can go to a wide circle, we keep private details off it. It can share the news with or without a date, and never exposes venue or timing meant for guests only.", ar: "لأنّ الإعلان قد يصل لدائرة واسعة، نُبقي التفاصيل الخاصة خارجه. يمكنه مشاركة الخبر بتاريخ أو دونه، ولا يكشف أبداً مكاناً أو توقيتاً مخصّصاً للمدعوّين فقط.",
        },
      },
      {
        h2: { en: "WhatsApp and Instagram sizes", ar: "مقاسات واتساب وإنستغرام" },
        body: {
          en: "Announcements are made to be shared, so we deliver the sizes people actually post — a WhatsApp-ready card and a vertical Story crop, with an animated version if you want movement.", ar: "الإعلانات مصنوعة للمشاركة، فنسلّم المقاسات التي ينشرها الناس فعلاً — بطاقة جاهزة للواتساب وقصّة عمودية للستوري، مع نسخة متحركة إن أردتم حركة.",
        },
      },
    ],
    faqs: [
      { q: { en: "What is the difference between a wedding announcement and an invitation?", ar: "ما الفرق بين إعلان الزواج ودعوة الزفاف؟" }, a: { en: "An announcement shares the news; an invitation asks someone to attend. Announcements skip the venue, timing and RSVP that invitations carry.", ar: "الإعلان يشارك الخبر؛ والدعوة تطلب الحضور. تتخطّى الإعلانات المكان والتوقيت وتأكيد الحضور التي تحملها الدعوات." } },
      { q: { en: "Can the announcement omit private event details?", ar: "هل يمكن تصميم إعلان زواج بدون تفاصيل الحفل؟" }, a: { en: "Yes — that's exactly what it's for. It shares the news without exposing venue or timing meant for invited guests.", ar: "نعم — هذا غرضه تماماً. يشارك الخبر دون كشف مكان أو توقيت مخصّص للمدعوّين." } },
      { q: { en: "Can I receive WhatsApp and Instagram Story formats?", ar: "هل يتوفر مقاس واتساب وستوري إنستغرام؟" }, a: { en: "Yes — a WhatsApp-ready card and a vertical Story size come as standard, with an animated version available.", ar: "نعم — بطاقة جاهزة للواتساب ومقاس ستوري عمودي قياسيان، مع نسخة متحركة متاحة." } },
    ],
    related: ["katb-kitab-invitations", "digital-wedding-invitations", "animated-video-invitations"],
    ctaHeading: { en: "Share your wedding news beautifully", ar: "شاركوا خبر زواجكم بأناقة" },
  },

  /* ---------- Animated video invitations ---------- */
  {
    slug: "animated-video-invitations",
    weddingLinks: false,
    hasDemos: false,
    breadcrumb: { en: "Animated video invitations", ar: "دعوات فيديو متحركة" },
    meta: {
      title: { en: "Animated Video Invitations UAE | WhatsApp Ready", ar: "تصميم دعوة فيديو متحركة للواتساب | كل المناسبات" },
      description: {
        en: "Animated Arabic and English video invitations for weddings, birthdays, graduations and more — short MP4s with music and motion, sized for WhatsApp and Stories.",
        ar: "دعوات فيديو متحركة بالعربي والإنجليزي للأعراس وأعياد الميلاد والتخرج وغيرها — مقاطع MP4 قصيرة بموسيقى وحركة، بمقاسات الواتساب والستوري.",
      },
    },
    hero: {
      eyebrow: { en: "Format & motion", ar: "الصيغة والحركة" },
      h1: { en: "Animated Arabic and English video invitations for every occasion", ar: "دعوات فيديو متحركة بالعربي والإنجليزي للمناسبات" },
      lead: {
        en: "Motion gets attention in a busy chat. A short animated invitation — music, moving Arabic typography, a reveal of the names and date — lands harder than a still card. We design دعوة فيديو متحركة for any occasion, sized to play well on WhatsApp and Stories.",
        ar: "تلفت الحركة الانتباه في محادثة مزدحمة. الدعوة المتحركة القصيرة — موسيقى، وخط عربي متحرك، وكشف للأسماء والتاريخ — تصل أقوى من بطاقة ثابتة. نصمّم دعوة فيديو متحركة لأي مناسبة، بمقاس يُعرَض جيداً على واتساب والستوري.",
      },
    },
    intro: {
      en: "This page owns the motion format across occasions. Whatever the event — wedding, Katb Kitab, newborn, graduation, birthday — we can make the animated version here and link you to the occasion page for the wording and details specific to it.",
      ar: "تختصّ هذه الصفحة بصيغة الحركة عبر المناسبات. أياً كان الحدث — زفاف، عقد قران، مولود، تخرج، عيد ميلاد — يمكننا صنع النسخة المتحركة هنا وربطكم بصفحة المناسبة للعبارات والتفاصيل الخاصة بها.",
    },
    provides: {
      title: invitationUi.provides,
      items: [
        { en: "The occasion and event details", ar: "المناسبة وتفاصيل الحدث" },
        { en: "A preferred style or reference feeling", ar: "أسلوب مفضّل أو إحساس مرجعي" },
        { en: "Whether you need vertical Story and WhatsApp cuts", ar: "هل تحتاجون نسخاً عمودية للستوري والواتساب" },
      ],
    },
    scopes: {
      recommended: SCOPE_MOTION,
      enhanced: {
        name: { en: "Signature Motion Suite", ar: "باقة الحركة المميّزة" },
        tagline: { en: "A longer, more crafted animation with extra cuts.", ar: "حركة أطول وأكثر إتقاناً مع نسخ إضافية." },
        includes: [
          { en: "Everything in the Motion + RSVP Suite", ar: "كل ما في باقة الحركة وتأكيد الحضور" },
          { en: "A longer animation with a more detailed sequence", ar: "حركة أطول بتسلسل أكثر تفصيلاً" },
          { en: "Horizontal, square and vertical exports", ar: "نسخ أفقية ومربّعة وعمودية" },
          { en: "A matching still cover for previews", ar: "غلاف ثابت متطابق للمعاينات" },
        ],
      },
    },
    turnaround: DEFAULT_TURNAROUND,
    sections: [
      {
        h2: { en: "The right length for WhatsApp", ar: "الطول المناسب للواتساب" },
        body: {
          en: "A video invitation should say what it needs and stop. We keep it short enough that guests watch to the date and venue, and export it so it autoplays cleanly in a chat.", ar: "يجب أن يقول فيديو الدعوة ما يلزم ويتوقّف. نُبقيه قصيراً بما يكفي ليشاهد الضيوف حتى التاريخ والمكان، ونُصدّره كي يُعرَض تلقائياً بنقاء في المحادثة.",
        },
      },
      {
        h2: { en: "Music and moving Arabic type", ar: "موسيقى وخط عربي متحرك" },
        body: {
          en: "Animated Arabic type is its own craft — letters that connect and move without breaking. We pair it with music that suits the occasion and deliver vertical and WhatsApp versions.", ar: "الخط العربي المتحرك حرفة قائمة بذاتها — حروف تتّصل وتتحرّك دون أن تنكسر. نقرنه بموسيقى تناسب المناسبة ونسلّم نسخاً عمودية وللواتساب.",
        },
      },
    ],
    faqs: [
      { q: { en: "What video length works best for WhatsApp invitations?", ar: "ما مدة فيديو الدعوة المناسبة للواتساب؟" }, a: { en: "Short — long enough to reveal the names, date and venue and no longer. We tune the length to the occasion so guests watch to the end.", ar: "قصيرة — بما يكفي لكشف الأسماء والتاريخ والمكان لا أكثر. نضبط المدة حسب المناسبة كي يشاهد الضيوف حتى النهاية." } },
      { q: { en: "Can the invitation include music and animated typography?", ar: "هل يشمل الفيديو موسيقى ونصوصاً متحركة؟" }, a: { en: "Yes — music plus animated Arabic and English typography are the core of the format.", ar: "نعم — الموسيقى مع الخط العربي والإنجليزي المتحرك هما جوهر هذه الصيغة." } },
      { q: { en: "Can I receive vertical Story and WhatsApp-ready versions?", ar: "هل أحصل على مقاس عمودي للستوري ومقاس للواتساب؟" }, a: { en: "Yes — vertical Story and WhatsApp cuts are included, with horizontal and square available in the Signature scope.", ar: "نعم — النسخ العمودية للستوري والواتساب مشمولة، مع الأفقية والمربّعة في النطاق المميّز." } },
    ],
    related: ["digital-wedding-invitations", "katb-kitab-invitations", "newborn-invitations-announcements", "graduation-invitations", "digital-invitations-rsvp"],
    ctaHeading: { en: "Make your invitation move", ar: "اجعلوا دعوتكم تتحرّك" },
  },

  /* ---------- Newborn ---------- */
  {
    slug: "newborn-invitations-announcements",
    categorySlug: "newborn-announcement",
    weddingLinks: false,
    hasDemos: true,
    breadcrumb: { en: "Newborn announcements", ar: "بشارات مولود" },
    meta: {
      title: { en: "Newborn Announcements and Invitations UAE | Big Story", ar: "بشارة مولود ودعوة استقبال مولود إلكترونية | الإمارات" },
      description: {
        en: "Arabic newborn announcements and welcome invitations for WhatsApp — a بشارة مولود to share the news, or an invitation to a reception or Aqiqah, with a privacy-first option.",
        ar: "بشارات مولود ودعوات استقبال مولود عربية للواتساب — بشارة مولود لمشاركة الخبر، أو دعوة استقبال أو عقيقة، مع خيار يحفظ الخصوصية.",
      },
    },
    hero: {
      eyebrow: { en: "Newborn", ar: "المولود" },
      h1: { en: "Arabic newborn announcements and welcome invitations for WhatsApp", ar: "بشارات مولود ودعوات استقبال مولود عربية للواتساب" },
      lead: {
        en: "A new baby brings two different cards: the بشارة to announce the arrival, and the invitation to a reception or عقيقة. We design both in Arabic first, with a privacy-first option for families who'd rather not share a photo.",
        ar: "يجلب المولود بطاقتين مختلفتين: البشارة لإعلان القدوم، ودعوة الاستقبال أو العقيقة. نصمّم الاثنتين بالعربية أولاً، مع خيار يحفظ الخصوصية للعائلات التي تفضّل عدم مشاركة صورة.",
      },
    },
    intro: {
      en: "This page keeps the two jobs separate: the بشارة مولود announces the birth, and the newborn welcome invitation asks guests to a reception or Aqiqah. Baby shower — a pre-birth event — has its own page and is not covered here.",
      ar: "تُبقي هذه الصفحة المهمّتين منفصلتين: البشارة تعلن الولادة، ودعوة استقبال المولود تدعو الضيوف لاستقبال أو عقيقة. أمّا البيبي شاور — وهي مناسبة قبل الولادة — فلها صفحتها ولا تُغطّى هنا.",
    },
    provides: {
      title: invitationUi.provides,
      items: [
        { en: "Baby's name and birth details, if sharing", ar: "اسم المولود وتفاصيل الميلاد، إن رغبتم بمشاركتها" },
        { en: "Whether it's an announcement or a reception invitation", ar: "هل هي بشارة أم دعوة استقبال" },
        { en: "A photo, or a privacy-first no-photo design", ar: "صورة، أو تصميم بلا صورة يحفظ الخصوصية" },
      ],
    },
    scopes: { recommended: SCOPE_STATIC, enhanced: SCOPE_MOTION },
    turnaround: DEFAULT_TURNAROUND,
    sections: [
      {
        h2: { en: "Announcement or reception invitation", ar: "بشارة أم دعوة استقبال" },
        body: {
          en: "A بشارة simply shares the news; a reception or Aqiqah invitation asks people to come. We label each clearly so relatives know whether to reply or just celebrate.", ar: "البشارة تشارك الخبر فحسب؛ ودعوة الاستقبال أو العقيقة تطلب الحضور. نوسم كلّاً بوضوح كي يعرف الأقارب هل يردّون أم يحتفلون فقط.",
        },
      },
      {
        h2: { en: "A privacy-first option", ar: "خيار يحفظ الخصوصية" },
        body: {
          en: "Not every family wants the baby's photo circulating on WhatsApp. We offer designs built around the name and details, with no photo, that still feel personal and warm.", ar: "ليست كل عائلة تريد صورة مولودها تنتشر على واتساب. نقدّم تصاميم مبنية حول الاسم والتفاصيل، بلا صورة، تبقى شخصية ودافئة.",
        },
      },
    ],
    faqs: [
      { q: { en: "What is the difference between a birth announcement and a newborn welcome invitation?", ar: "ما الفرق بين بشارة المولود ودعوة استقبال المولود؟" }, a: { en: "A بشارة shares the news of the birth. A welcome invitation asks guests to a reception or Aqiqah. We design both.", ar: "البشارة تشارك خبر الولادة. ودعوة الاستقبال تدعو الضيوف لاستقبال أو عقيقة. نصمّم الاثنتين." } },
      { q: { en: "Can you add the baby photo, name and birth details?", ar: "هل يمكن إضافة صورة المولود والاسم وتاريخ الميلاد؟" }, a: { en: "Yes — you choose what to include: name only, or name with photo and birth details.", ar: "نعم — تختارون ما تُدرجونه: الاسم فقط، أو الاسم مع الصورة وتفاصيل الميلاد." } },
      { q: { en: "Can you create a privacy-first version without a baby photo?", ar: "هل تتوفر نسخة بدون صورة للمحافظة على الخصوصية؟" }, a: { en: "Yes. We have designs built around the name and details with no photo at all.", ar: "نعم. لدينا تصاميم مبنية حول الاسم والتفاصيل بلا أي صورة." } },
    ],
    related: ["animated-video-invitations", "baby-shower-invitations", "birthday-invitations"],
    ctaHeading: { en: "Announce your newest arrival", ar: "أعلنوا قدوم مولودكم" },
  },

  /* ---------- Baby shower (NO seed demos — honest capability copy) ---------- */
  {
    slug: "baby-shower-invitations",
    weddingLinks: false,
    hasDemos: false,
    breadcrumb: { en: "Baby shower invitations", ar: "دعوات بيبي شاور" },
    meta: {
      title: { en: "Digital Baby Shower Invitations UAE | Arabic and English", ar: "دعوة بيبي شاور واستقبال مولود إلكترونية | الإمارات" },
      description: {
        en: "Arabic and English digital baby shower invitations — a pre-birth celebration card, with gender-neutral designs and optional gift-registry or map links.",
        ar: "دعوات بيبي شاور إلكترونية بالعربي والإنجليزي — بطاقة احتفال قبل الولادة، بتصاميم محايدة وروابط قائمة هدايا أو خريطة اختيارية.",
      },
    },
    hero: {
      eyebrow: { en: "Pre-birth celebration", ar: "احتفال قبل الولادة" },
      h1: { en: "Arabic and English digital baby shower invitations", ar: "دعوات بيبي شاور إلكترونية بالعربي والإنجليزي" },
      lead: {
        en: "A baby shower is a pre-birth celebration — different from welcoming a baby who has already arrived. We design دعوة بيبي شاور in Arabic and English, including gender-neutral options, ready to share on WhatsApp.",
        ar: "البيبي شاور احتفال قبل الولادة — يختلف عن استقبال مولودٍ قد وصل. نصمّم دعوة بيبي شاور بالعربي والإنجليزي، بخيارات محايدة، جاهزة للمشاركة عبر واتساب.",
      },
    },
    intro: {
      en: "Baby shower marks the celebration before the birth, while استقبال مولود after the birth is a reception. We keep the two distinct so the invitation reads correctly. This service is offered as a genuine capability; the demo gallery below is not yet populated with finished baby-shower samples, and we will never relabel a newborn-announcement design as one.",
      ar: "يشير البيبي شاور إلى الاحتفال قبل الولادة، بينما استقبال المولود بعدها هو حفل استقبال. نُبقي الاثنين متمايزين كي تُقرأ الدعوة بشكل صحيح. تُقدَّم هذه الخدمة كقدرة حقيقية؛ ومعرض النماذج بالأسفل لم يُعبّأ بعد بنماذج بيبي شاور مكتملة، ولن نُعيد وسم تصميم بشارة مولود على أنه كذلك.",
    },
    provides: {
      title: invitationUi.provides,
      items: [
        { en: "Event date, time and place", ar: "تاريخ المناسبة ووقتها ومكانها" },
        { en: "A theme or colour direction, if any", ar: "ثيم أو اتجاه لوني، إن وُجد" },
        { en: "Whether you want a gift-registry or map link", ar: "هل تريدون رابط قائمة هدايا أو خريطة" },
      ],
    },
    scopes: { recommended: SCOPE_STATIC, enhanced: SCOPE_MOTION },
    turnaround: DEFAULT_TURNAROUND,
    demoNote: {
      en: "We're building original baby-shower demos now. Until finished samples are ready, we won't show relabelled newborn-announcement designs here — ask on WhatsApp and we'll walk you through the direction we'd take for your event.",
      ar: "نُعدّ حالياً نماذج بيبي شاور أصلية. وإلى أن تجهز نماذج مكتملة، لن نعرض هنا تصاميم بشارة مولود مُعاد وسمها — راسلونا على واتساب لنشرح الاتجاه الذي سنتّبعه لمناسبتكم.",
    },
    sections: [
      {
        h2: { en: "Before the birth, not after", ar: "قبل الولادة، لا بعدها" },
        body: {
          en: "استقبال مولود can mean a post-birth reception, so we're careful with wording. A baby shower invitation reads as a pre-birth celebration; for after the birth, see our newborn page.", ar: "قد يعني استقبال مولود حفلاً بعد الولادة، لذا نتحرّى الدقة في الصياغة. تُقرأ دعوة البيبي شاور احتفالاً قبل الولادة؛ ولِما بعد الولادة، راجعوا صفحة المولود.",
        },
      },
      {
        h2: { en: "Gender-neutral by default if you like", ar: "محايدة افتراضياً إن رغبتم" },
        body: {
          en: "Many families prefer not to reveal or centre the baby's gender. We offer gender-neutral palettes and motifs so the card celebrates the occasion, not an assumption.", ar: "تفضّل عائلات كثيرة عدم كشف جنس المولود أو إبرازه. نقدّم لوحات ألوان ورموزاً محايدة كي تحتفي البطاقة بالمناسبة لا بافتراض.",
        },
      },
    ],
    faqs: [
      { q: { en: "Is a baby shower invitation sent before the birth?", ar: "هل دعوة البيبي شاور تسبق الولادة؟" }, a: { en: "Yes — a baby shower is a pre-birth celebration. For welcoming a baby who has arrived, see our newborn announcements page.", ar: "نعم — البيبي شاور احتفال قبل الولادة. ولاستقبال مولودٍ قد وصل، راجعوا صفحة بشارات المولود." } },
      { q: { en: "Can it include a gift registry and venue map?", ar: "هل يمكن إضافة قائمة هدايا أو رابط موقع؟" }, a: { en: "Yes — a gift-registry link and a Google Maps / Waze button are optional additions.", ar: "نعم — رابط قائمة الهدايا وزر Google Maps / Waze إضافتان اختياريتان." } },
      { q: { en: "Do you offer gender-neutral baby shower designs?", ar: "هل تتوفر تصاميم محايدة بدون تحديد جنس المولود؟" }, a: { en: "Yes. We offer gender-neutral palettes and motifs by default when you prefer.", ar: "نعم. نقدّم لوحات ورموزاً محايدة افتراضياً حين تفضّلون ذلك." } },
    ],
    related: ["newborn-invitations-announcements", "animated-video-invitations"],
    ctaHeading: { en: "Plan your baby shower invitation", ar: "خطّطوا دعوة بيبي شاور" },
  },

  /* ---------- Graduation ---------- */
  {
    slug: "graduation-invitations",
    categorySlug: "graduation-invitation",
    weddingLinks: false,
    hasDemos: true,
    breadcrumb: { en: "Graduation invitations", ar: "دعوات تخرج" },
    meta: {
      title: { en: "Digital Graduation Invitations UAE | WhatsApp Ready", ar: "دعوة تخرج إلكترونية للواتساب | تصميم عربي وإنجليزي" },
      description: {
        en: "Digital graduation invitations for UAE school and university celebrations — Arabic and English, WhatsApp-ready, with the graduate's photo, logo and ceremony details.",
        ar: "دعوات تخرج إلكترونية لحفلات الجامعة والمدرسة في الإمارات — عربي وإنجليزي، جاهزة للواتساب، مع صورة الخريج والشعار وتفاصيل الحفل.",
      },
    },
    hero: {
      eyebrow: { en: "Graduation", ar: "التخرج" },
      h1: { en: "Digital graduation invitations for UAE school and university celebrations", ar: "دعوات تخرج إلكترونية للجامعة والمدرسة جاهزة للواتساب" },
      lead: {
        en: "A graduation is worth a proper invitation, not a group text. We design دعوة تخرج for school and university celebrations — with the graduate's photo, the institution details and the ceremony logistics — ready to send on WhatsApp in Arabic and English.",
        ar: "يستحقّ التخرج دعوةً لائقة لا رسالة جماعية. نصمّم دعوة تخرج لحفلات المدرسة والجامعة — بصورة الخريج وتفاصيل الجهة ولوجستيات الحفل — جاهزة للإرسال عبر واتساب بالعربي والإنجليزي.",
      },
    },
    intro: {
      en: "This page owns graduation invitation intent for both school and university. We include announcement-style wording as a section rather than a separate page, and use institution names only where a real, permitted case exists — no university-by-university doorway pages.",
      ar: "تختصّ هذه الصفحة بدعوات التخرج للمدرسة والجامعة. ندرج صيغة الإعلان كقسم لا كصفحة منفصلة، ونستخدم أسماء الجهات فقط حيث توجد حالة حقيقية ومصرّح بها — دون صفحات منفصلة لكل جامعة.",
    },
    provides: {
      title: invitationUi.provides,
      items: [
        { en: "The graduate's name and, if wanted, photo", ar: "اسم الخريج، وصورته إن رغبتم" },
        { en: "School or university and the degree", ar: "المدرسة أو الجامعة والدرجة العلمية" },
        { en: "Ceremony date, time and place", ar: "تاريخ الحفل ووقته ومكانه" },
      ],
    },
    scopes: { recommended: SCOPE_STATIC, enhanced: SCOPE_MOTION },
    turnaround: DEFAULT_TURNAROUND,
    sections: [
      {
        h2: { en: "School or university", ar: "مدرسة أو جامعة" },
        body: {
          en: "A kindergarten graduation and a university convocation need different tones. We design for both — playful for the little ones, more formal for the degree — with the graduate's photo and logo where you want them.", ar: "يحتاج تخرّج الروضة وحفل الجامعة نبرتين مختلفتين. نصمّم للاثنين — مرحاً للصغار، وأرسم للدرجة — بصورة الخريج والشعار حيث تريدون.",
        },
      },
      {
        h2: { en: "Invitation or announcement", ar: "دعوة أو إعلان" },
        body: {
          en: "Some families invite guests to a ceremony; others just share the achievement. We can design either from this page — an invitation with logistics, or a proud announcement without them.", ar: "بعض العائلات تدعو الضيوف لحفل؛ وأخرى تشارك الإنجاز فقط. يمكننا تصميم أيّهما من هذه الصفحة — دعوة بلوجستيات، أو إعلان فخور بدونها.",
        },
      },
    ],
    faqs: [
      { q: { en: "Do you create school and university graduation invitations?", ar: "هل تصممون دعوة تخرج للجامعة والمدرسة؟" }, a: { en: "Yes — both, with a tone that suits the level, from kindergarten to university convocation.", ar: "نعم — الاثنين، بنبرة تناسب المستوى، من الروضة إلى حفل الجامعة." } },
      { q: { en: "Can you add the graduate photo, logo and ceremony details?", ar: "هل يمكن إضافة صورة الخريج والشعار وبيانات الحفل؟" }, a: { en: "Yes — the graduate's photo, the institution logo and the full ceremony logistics can all go on the card.", ar: "نعم — صورة الخريج وشعار الجهة وكامل لوجستيات الحفل يمكن أن تُوضَع على البطاقة." } },
      { q: { en: "Can the invitation include a map and RSVP?", ar: "هل تشمل الدعوة رابط الموقع وتأكيد الحضور؟" }, a: { en: "Yes — a venue map button and RSVP are optional additions. See our map and RSVP services for detail.", ar: "نعم — زر خريطة الموقع وتأكيد الحضور إضافتان اختياريتان. راجعوا خدمتَي الخريطة وتأكيد الحضور للتفاصيل." } },
    ],
    related: ["animated-video-invitations", "whatsapp-invitations", "birthday-invitations"],
    ctaHeading: { en: "Celebrate the graduate", ar: "احتفوا بالخريج" },
  },

  /* ---------- Birthday ---------- */
  {
    slug: "birthday-invitations",
    categorySlug: "birthday-invitation",
    weddingLinks: false,
    hasDemos: true,
    breadcrumb: { en: "Birthday invitations", ar: "دعوات عيد ميلاد" },
    meta: {
      title: { en: "Digital Birthday Invitations UAE | Kids and Adults", ar: "دعوة عيد ميلاد إلكترونية للواتساب | أطفال وكبار" },
      description: {
        en: "WhatsApp-ready digital birthday invitations for kids and adults in the UAE — Arabic and English, with the age, theme, venue map and RSVP as options.",
        ar: "دعوات عيد ميلاد إلكترونية جاهزة للواتساب للأطفال والكبار في الإمارات — عربي وإنجليزي، مع العمر والثيم وخريطة الموقع وتأكيد الحضور كخيارات.",
      },
    },
    hero: {
      eyebrow: { en: "Birthday", ar: "عيد الميلاد" },
      h1: { en: "WhatsApp-ready digital birthday invitations for kids and adults", ar: "دعوات عيد ميلاد إلكترونية للأطفال والكبار جاهزة للواتساب" },
      lead: {
        en: "From a first birthday to a milestone one, a digital invitation sets the mood before anyone arrives. We design دعوة عيد ميلاد for kids and adults — the age, the theme, the details — in Arabic and English, ready to send on WhatsApp.",
        ar: "من أول عيد ميلاد إلى عيدٍ مميّز، تُهيّئ الدعوة الإلكترونية الأجواء قبل وصول أحد. نصمّم دعوة عيد ميلاد للأطفال والكبار — العمر والثيم والتفاصيل — بالعربي والإنجليزي، جاهزة للإرسال عبر واتساب.",
      },
    },
    intro: {
      en: "This page owns birthday occasion intent. Kids, adults, first birthdays and milestone birthdays live here as sections rather than separate thin pages. For an animated version, it links to the video invitation service.",
      ar: "تختصّ هذه الصفحة بمناسبة عيد الميلاد. الأطفال والكبار وأول عيد ميلاد والأعياد المميّزة كلّها هنا كأقسام لا كصفحات منفصلة رقيقة. وللنسخة المتحركة، تُربَط بخدمة دعوة الفيديو.",
    },
    provides: {
      title: invitationUi.provides,
      items: [
        { en: "Whose birthday and which age, if shown", ar: "صاحب العيد وأي عمر، إن ذُكر" },
        { en: "A theme or colour direction", ar: "ثيم أو اتجاه لوني" },
        { en: "Party date, time and place", ar: "تاريخ الحفلة ووقتها ومكانها" },
      ],
    },
    scopes: { recommended: SCOPE_STATIC, enhanced: SCOPE_MOTION },
    turnaround: DEFAULT_TURNAROUND,
    sections: [
      {
        h2: { en: "Kids and adults", ar: "أطفال وكبار" },
        body: {
          en: "A children's party and an adult's milestone want very different designs. We match the mood — playful themes and characters for kids, something more refined for grown-ups.", ar: "تريد حفلة الأطفال وعيد الكبار المميّز تصميمين مختلفين تماماً. نطابق المزاج — ثيمات وشخصيات مرحة للصغار، وشيء أرقى للكبار.",
        },
      },
      {
        h2: { en: "Theme, age and details", ar: "الثيم والعمر والتفاصيل" },
        body: {
          en: "We can feature the age, a party theme and a venue map, and add RSVP so you know how many are coming. Or keep it simple — your call.", ar: "يمكننا إبراز العمر وثيم الحفلة وخريطة المكان، وإضافة تأكيد حضور لتعرفوا العدد. أو إبقاؤها بسيطة — القرار لكم.",
        },
      },
    ],
    faqs: [
      { q: { en: "Do you make birthday invitations for children and adults?", ar: "هل تتوفر دعوات عيد ميلاد للأطفال والكبار؟" }, a: { en: "Yes — playful designs for kids and more refined ones for adults, including first birthdays and milestone birthdays.", ar: "نعم — تصاميم مرحة للأطفال وأخرى أرقى للكبار، بما فيها أول عيد ميلاد والأعياد المميّزة." } },
      { q: { en: "Can you add the age, theme and location link?", ar: "هل يمكن إضافة العمر والثيم ورابط الموقع؟" }, a: { en: "Yes — the age, a party theme and a map button all fit on the card.", ar: "نعم — العمر وثيم الحفلة وزر الخريطة كلّها تتّسع على البطاقة." } },
      { q: { en: "Can guests RSVP from the invitation?", ar: "هل يستطيع الضيوف تأكيد الحضور من الدعوة؟" }, a: { en: "Yes — add an RSVP button so guests reply in a tap. See our RSVP service for detail.", ar: "نعم — أضيفوا زر تأكيد حضور ليردّ الضيوف بنقرة. راجعوا خدمة تأكيد الحضور للتفاصيل." } },
    ],
    related: ["animated-video-invitations", "newborn-invitations-announcements", "graduation-invitations"],
    ctaHeading: { en: "Design a birthday invitation", ar: "صمّموا دعوة عيد ميلاد" },
  },
];

/* ------------------------------------------------------------------ *
 * Lookups + the full slug list (hub + children).                      *
 * ------------------------------------------------------------------ */

const pageBySlug = new Map(invitationPages.map((p) => [p.slug, p]));

export function getInvitationPage(slug: string): InvitationPage | undefined {
  return pageBySlug.get(slug);
}

export const invitationChildSlugs = invitationPages.map((p) => p.slug);

/** All invitation service slugs (hub first) — used by sitemap + tests. */
export const invitationServiceSlugs = [HUB_SLUG, ...invitationChildSlugs];

/* ------------------------------------------------------------------ *
 * Redirect aliases from the early internal draft (architecture §3).   *
 * Old draft route (clean path) → canonical clean path.                *
 * ------------------------------------------------------------------ */

export const invitationRedirects: { from: string; to: string }[] = [
  { from: "/services/digital-wedding-invitations-dubai", to: "/services/digital-wedding-invitations" },
  { from: "/services/engagement-milka-invitations", to: "/services/malka-engagement-invitations" },
  { from: "/services/save-the-date-design", to: "/services/wedding-save-the-date" },
  { from: "/services/wedding-announcement-design", to: "/services/wedding-announcements" },
  { from: "/services/animated-invitation-video", to: "/services/animated-video-invitations" },
  { from: "/services/rsvp-qr-invitations", to: "/services/digital-invitations-rsvp" },
  { from: "/services/newborn-announcement-design", to: "/services/newborn-invitations-announcements" },
  { from: "/services/katb-kitab-invitations-aqd-qiran", to: "/services/katb-kitab-invitations" },
];
