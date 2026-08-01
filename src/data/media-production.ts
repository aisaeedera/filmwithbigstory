/**
 * MEDIA PRODUCTION SILO — single content source.
 *
 * Routes fed by this file:
 *   /media-production                              (hub, H1 exactly "Media Production")
 *   /media-production/company-media-revamp
 *   /media-production/new-product-launch
 *   /media-production/new-company-launch
 *
 * HARD CONTENT RULES (enforced by tests/media-production.test.ts):
 *  1. No prices. No currency symbol, no "AED", no VAT statement, no price
 *     comparison, anywhere in this file. See the price gate below.
 *  2. No invented client names, logos, testimonials, awards, credits,
 *     headcounts, project counts or performance statistics. `src/data/clients.ts`
 *     documents the standing no-logo / no-testimonial policy and
 *     `src/data/work.ts` states its own entries are concept frameworks, so
 *     nothing here may be presented as a shipped result.
 *  3. Outcomes are stated as intent ("built to", "the point of this is"),
 *     never as a guarantee ("will increase", "proven to").
 *  4. Timelines are conditional and scope-dependent, matching the existing rule
 *     in `src/data/how-we-work.ts`.
 *  5. No em-dash character in any visitor-facing string.
 *
 * See MEDIA_PRODUCTION_RESEARCH.md and MEDIA_PRODUCTION_CONTENT_ARCHITECTURE.md.
 */

import type { L } from "@/lib/i18n";

/* ================================================================== *
 * PRICE GATE                                                          *
 * ================================================================== */

/**
 * MASTER PRICE GATE.
 *
 * Proposed price figures are NOT publishable. This flag must stay `false`
 * until a rate card has been verified and approved for publication in writing.
 * While it is false, every scope block on every page in this silo renders the
 * non-price placeholder instead of any figures.
 *
 * Flipping this to `true` on its own changes nothing: `mediaRateCard` must also
 * be populated with approved rows. Both changes belong in their own reviewable
 * commit.
 */
export const MEDIA_RATE_CARD_ENABLED = false;

/** One approved row of a published rate card. */
export type MediaRateCardRow = {
  /** Package or tier label. */
  label: L;
  /** What the tier covers, in plain language. */
  scope: L;
  /**
   * Verified, approved, publishable figure as a display string.
   * Leave undefined unless the figure has been approved for publication.
   */
  figure?: L;
};

/**
 * Verified, approved rate-card rows.
 *
 * INTENTIONALLY EMPTY. Do not populate without written approval. The rendering
 * path for populated rows exists so that verified data can later be added
 * consistently across all four routes from this one place.
 */
export const mediaRateCard: MediaRateCardRow[] = [];

/** True only when a verified rate card is both enabled and actually present. */
export function rateCardIsPublishable(): boolean {
  return MEDIA_RATE_CARD_ENABLED && mediaRateCard.length > 0;
}

/* ================================================================== *
 * COPY NORMALISATION                                                  *
 * ================================================================== */

/**
 * Strip the em-dash from a visitor-facing string.
 *
 * The hub's capability index re-uses the legacy service blurbs in
 * `src/data/services.ts`, several of which were authored with em-dashes
 * ("...for TV, YouTube and social — concept to broadcast master."). Rule 5
 * above forbids that character in visitor-facing text, so it is normalised at
 * the render boundary rather than by rewriting the shared service data, which
 * the pre-existing /services/* pages still render verbatim.
 *
 * A colon preserves the meaning: in every current case the clause after the
 * dash elaborates the clause before it.
 */
export function withoutEmDash(value: string): string {
  return value.replace(/\s*—\s*/g, ": ");
}

/* ================================================================== *
 * SHARED TYPES                                                        *
 * ================================================================== */

export type MediaFaq = { q: L; a: L };
export type MediaStage = { n: string; title: L; body: L };

/** A cross-link out to a page that already exists in this repository. */
export type MediaLink = { label: L; description: L; path: string };

export type MediaService = {
  slug: string;
  order: number;
  /** Short label used in index rows and related-service links. */
  short: L;
  /** Breadcrumb label. */
  breadcrumb: L;
  meta: { title: L; description: L };
  hero: {
    eyebrow: L;
    /** Rendered as the page's single <h1>. */
    h1: L;
    lead: L;
    /** Primary CTA label. Anchors to the on-page inquiry form. */
    ctaPrimary: L;
    /** Secondary CTA label. Goes up to the hub. */
    ctaSecondary: L;
  };
  problem: { eyebrow: L; h2: L; lead: L; body: L; signals: L[] };
  outcome: { eyebrow: L; h2: L; lead: L; items: { label: L; body: L }[] };
  process: { eyebrow: L; h2: L; lead: L; stages: MediaStage[] };
  /** Non-price scope block. Renders the placeholder while the gate is closed. */
  scope: { eyebrow: L; h2: L; lead: L; covers: L[] };
  faq: { eyebrow: L; h2: L; items: MediaFaq[] };
  /** Existing `/services/*` pages relevant to this engagement. */
  related: MediaLink[];
  cta: { h2: L; lead: L; primary: L; whatsapp: L };
  /** WhatsApp context string, distinct per page. */
  waContext: L;
};

/* ================================================================== *
 * SHARED STRINGS                                                      *
 * ================================================================== */

export const mediaUi = {
  hubLabel: { en: "Media Production", ar: "الإنتاج الإعلامي" },
  backToHub: { en: "All media production", ar: "كل خدمات الإنتاج الإعلامي" },
  relatedHeading: { en: "Related services", ar: "خدمات ذات صلة" },
  otherEngagements: { en: "Other engagements", ar: "خدمات أخرى" },
  readMore: { en: "Read more", ar: "اقرأ المزيد" },
  openPage: { en: "Open page", ar: "افتح الصفحة" },
  /** The approved non-price placeholder. Do not replace with a figure. */
  scopePlaceholder: {
    en: "Package details are confirmed during planning.",
    ar: "تُحدَّد تفاصيل الباقة أثناء التخطيط.",
  },
  scopePlaceholderBody: {
    en: "We do not publish a fixed package list, because the crew shape, the number of shoot days and the delivery formats change with the brief. We agree all of it in writing before anything is booked.",
    ar: "لا ننشر قائمة باقات ثابتة، لأن تشكيل الطاقم وعدد أيام التصوير وصيغ التسليم تتغير حسب الإيجاز. نتفق على كل ذلك كتابياً قبل حجز أي شيء.",
  },
  scopeCoversLabel: { en: "What the scope conversation covers", ar: "ما تغطيه محادثة النطاق" },
  slateLabel: { en: "Scope", ar: "النطاق" },
} as const;

/* ================================================================== *
 * INQUIRY FORM COPY                                                   *
 * Deliberately contains no budget question. See the price gate above. *
 * ================================================================== */

export const mediaForm = {
  progressLabel: { en: "Inquiry progress", ar: "تقدّم الاستفسار" },
  stepLabel: { en: "Step {n} of {total}", ar: "الخطوة {n} من {total}" },
  q1: { en: "What are you working on?", ar: "على ماذا تعمل؟" },
  q1Legend: { en: "Project type", ar: "نوع المشروع" },
  q1Stage: { en: "Where are you in the process?", ar: "أين أنت في العملية؟" },
  q1StageHint: {
    en: "Optional. It helps us pitch the reply at the right level.",
    ar: "اختياري. يساعدنا على ضبط مستوى الرد.",
  },
  q2: { en: "When does this need to be ready?", ar: "متى يجب أن يكون هذا جاهزاً؟" },
  q2Legend: { en: "Timeline", ar: "الجدول الزمني" },
  q2Note: {
    en: "We do not ask about budget here. Scope comes first, and we put both in writing before anything is booked.",
    ar: "لا نسأل عن الميزانية هنا. النطاق أولاً، ونضع الاثنين كتابياً قبل حجز أي شيء.",
  },
  q3: { en: "Where do we send the reply?", ar: "إلى أين نرسل الرد؟" },
  name: { en: "Name", ar: "الاسم" },
  phone: { en: "Phone", ar: "رقم الهاتف" },
  email: { en: "Email", ar: "البريد الإلكتروني" },
  message: { en: "Anything else we should know", ar: "أي شيء آخر يجب أن نعرفه" },
  messageHint: {
    en: "The product, the launch date, what you already have. Whatever is useful.",
    ar: "المنتج، موعد الإطلاق، ما لديك بالفعل. أي شيء مفيد.",
  },
  company: { en: "Company", ar: "اسم الشركة" },
  addDetails: { en: "Add company name (optional)", ar: "أضف اسم الشركة (اختياري)" },
  optional: { en: "optional", ar: "اختياري" },
  next: { en: "Next", ar: "التالي" },
  back: { en: "Back", ar: "رجوع" },
  send: { en: "Send my inquiry", ar: "أرسل استفساري" },
  sending: { en: "Sending", ar: "جارٍ الإرسال" },
  successHead: { en: "Inquiry received", ar: "تم استلام استفسارك" },
  successBody: {
    en: "We reply within one business day. For a faster answer, message us on WhatsApp.",
    ar: "نرد خلال يوم عمل واحد. لإجابة أسرع، راسلنا على واتساب.",
  },
  successWhatsApp: { en: "Message us on WhatsApp", ar: "راسلنا على واتساب" },
  sendAnother: { en: "Send another inquiry", ar: "أرسل استفساراً آخر" },
  privacy: {
    en: "We use your details to reply to this inquiry only. See our {privacyPolicy}.",
    ar: "نستخدم تفاصيلك للرد على هذا الاستفسار فقط. اطّلع على {privacyPolicy}.",
  },
  privacyPolicy: { en: "Privacy Policy", ar: "سياسة الخصوصية" },
  noJs: {
    en: "This form needs JavaScript. If it is switched off, WhatsApp us or email us using the links above and we will pick it up the same way.",
    ar: "يحتاج هذا النموذج إلى جافاسكريبت. إذا كان معطلاً، راسلنا على واتساب أو بالبريد عبر الروابط أعلاه وسنتابع بالطريقة نفسها.",
  },
} as const;

/* ================================================================== *
 * HUB — /media-production                                             *
 * ================================================================== */

export const mediaHub = {
  meta: {
    title: {
      en: "Media Production in Dubai | Big Story",
      ar: "الإنتاج الإعلامي في دبي | بيك ستوري",
    },
    description: {
      en: "Big Story is a Dubai media production team. Strategy, script, shoot and post for company media revamps, product launches and new company launches.",
      ar: "بيك ستوري فريق إنتاج إعلامي في دبي. استراتيجية ونص وتصوير وما بعد الإنتاج لتجديد محتوى الشركات وإطلاق المنتجات وإطلاق الشركات الجديدة.",
    },
  },
  hero: {
    eyebrow: { en: "Media Production · Dubai", ar: "الإنتاج الإعلامي · دبي" },
    /** EXACT H1. Do not change without re-reading the build card. */
    h1: { en: "Media Production", ar: "الإنتاج الإعلامي" },
    lead: {
      en: "One team for the whole job. We plan, shoot and finish film, photography and social assets for companies across Dubai and the wider UAE, in English and Arabic.",
      ar: "فريق واحد للعمل كله. نخطط ونصوّر وننهي الأفلام والتصوير الفوتوغرافي ومحتوى السوشيال للشركات في دبي والإمارات، بالإنجليزية والعربية.",
    },
    sub: {
      en: "Most people arrive here in one of three situations. Start with the one that sounds like yours.",
      ar: "يصل معظم الناس إلى هنا في واحدة من ثلاث حالات. ابدأ بالحالة التي تشبه حالتك.",
    },
    ctaPrimary: { en: "Start a project brief", ar: "ابدأ ملخص مشروع" },
    ctaSecondary: { en: "See how we work", ar: "اطّلع على كيفية عملنا" },
  },
  situations: {
    eyebrow: { en: "Where to start", ar: "من أين تبدأ" },
    h2: { en: "Three ways this usually begins.", ar: "ثلاث طرق يبدأ بها هذا عادة." },
  },
  capability: {
    eyebrow: { en: "Production capability", ar: "قدرات الإنتاج" },
    h2: { en: "What we produce.", ar: "ما ننتجه." },
    lead: {
      en: "Every engagement above is assembled from these. Each has its own page with process, deliverables and the questions buyers actually ask.",
      ar: "كل خدمة أعلاه تُبنى من هذه العناصر. لكل منها صفحتها الخاصة مع العملية والمخرجات والأسئلة التي يطرحها المشترون فعلاً.",
    },
  },
  process: {
    eyebrow: { en: "Our process", ar: "عمليتنا" },
    h2: { en: "The film is made before the camera turns on.", ar: "الفيلم يُصنع قبل أن تدور الكاميرا." },
    lead: {
      en: "Most of the work happens on paper. By shoot day the decisions are already made and written down, which is what keeps a production calm.",
      ar: "معظم العمل يحدث على الورق. بحلول يوم التصوير تكون القرارات قد اتُّخذت وكُتبت، وهذا ما يبقي الإنتاج هادئاً.",
    },
    ctaLabel: { en: "Read the full process", ar: "اقرأ العملية كاملة" },
    stages: [
      {
        n: "01",
        title: { en: "Discovery", ar: "الاكتشاف" },
        body: {
          en: "We work out what the media is actually for, who has to watch it, and what has to be true by the end of it.",
          ar: "نحدد الغرض الحقيقي من المحتوى، ومن يجب أن يشاهده، وما الذي يجب أن يتحقق في نهايته.",
        },
      },
      {
        n: "02",
        title: { en: "Written treatment", ar: "معالجة مكتوبة" },
        body: {
          en: "You get the idea in writing before anyone spends money: tone, structure, what appears on screen.",
          ar: "تحصل على الفكرة مكتوبة قبل أن ينفق أحد أي مبلغ: النبرة والبنية وما يظهر على الشاشة.",
        },
      },
      {
        n: "03",
        title: { en: "Locked script", ar: "نص نهائي" },
        body: {
          en: "Wording, order and length are agreed and signed off. Changes after this point are deliberate, not accidental.",
          ar: "تُعتمد الصياغة والترتيب والمدة وتُوقَّع. التغييرات بعد هذه المرحلة تكون مقصودة لا عرضية.",
        },
      },
      {
        n: "04",
        title: { en: "Storyboard and call sheet", ar: "قصة مصورة وورقة نداء" },
        body: {
          en: "Every shot is drawn or described, then turned into a schedule with crew, locations, kit and timings.",
          ar: "تُرسم كل لقطة أو تُوصف، ثم تتحول إلى جدول يضم الطاقم والمواقع والمعدات والتوقيتات.",
        },
      },
      {
        n: "05",
        title: { en: "Shoot", ar: "التصوير" },
        body: {
          en: "Cinema cameras, controlled lighting, direction and sound, run against the plan rather than improvised on the day.",
          ar: "كاميرات سينمائية وإضاءة محكومة وإخراج وصوت، وفق الخطة لا بالارتجال في اليوم نفسه.",
        },
      },
      {
        n: "06",
        title: { en: "Post and delivery", ar: "ما بعد الإنتاج والتسليم" },
        body: {
          en: "Edit, colour, sound and captions, then every format you agreed, exported and handed over in one organised set.",
          ar: "مونتاج وتصحيح ألوان وصوت وترجمات، ثم كل صيغة اتفقتم عليها، مُصدَّرة ومُسلَّمة في مجموعة منظمة واحدة.",
        },
      },
    ] as MediaStage[],
  },
  scope: {
    eyebrow: { en: "Scope and packages", ar: "النطاق والباقات" },
    h2: { en: "How scope is agreed.", ar: "كيف يُتفق على النطاق." },
    lead: {
      en: "Before anything is booked we put the shape of the job in writing, so there is nothing to argue about later.",
      ar: "قبل حجز أي شيء نكتب شكل العمل، حتى لا يكون هناك ما يُختلف عليه لاحقاً.",
    },
    covers: [
      { en: "What the media has to achieve, written in one sentence you agree with", ar: "ما يجب أن يحققه المحتوى، مكتوباً في جملة واحدة توافق عليها" },
      { en: "Crew shape: who is on set and what each person is there to do", ar: "تشكيل الطاقم: من في موقع التصوير وما دور كل شخص" },
      { en: "Number of shoot days and where each one happens", ar: "عدد أيام التصوير ومكان كل يوم" },
      { en: "Every deliverable format and aspect ratio, listed before we shoot", ar: "كل صيغة تسليم ونسبة عرض، مذكورة قبل التصوير" },
      { en: "Language versions, captions and who supplies the translation", ar: "نسخ اللغات والترجمات ومن يوفر الترجمة" },
      { en: "Review rounds, delivery dates and who signs off each stage", ar: "جولات المراجعة ومواعيد التسليم ومن يعتمد كل مرحلة" },
    ] as L[],
  },
  verify: {
    eyebrow: { en: "Before you decide", ar: "قبل أن تقرر" },
    h2: { en: "What you can check.", ar: "ما يمكنك التحقق منه." },
    lead: {
      en: "We do not publish client logos or testimonials. Instead, here is what is already on this site that you can read and judge for yourself.",
      ar: "لا ننشر شعارات العملاء أو الشهادات. بدلاً من ذلك، إليك ما هو موجود على هذا الموقع لتقرأه وتحكم بنفسك.",
    },
    links: [
      {
        label: { en: "How we work", ar: "كيف نعمل" },
        description: {
          en: "The full pre-production process, written out stage by stage.",
          ar: "عملية ما قبل الإنتاج كاملة، مكتوبة مرحلة بمرحلة.",
        },
        path: "/how-we-work",
      },
      {
        label: { en: "Our work", ar: "أعمالنا" },
        description: {
          en: "How we approach a brief, shown through worked examples of our thinking.",
          ar: "كيف نتعامل مع الإيجاز، معروضاً عبر أمثلة عملية لطريقة تفكيرنا.",
        },
        path: "/work",
      },
      {
        label: { en: "Who we produce for", ar: "لمن ننتج" },
        description: {
          en: "The industries we work in and what we typically deliver in each.",
          ar: "القطاعات التي نعمل فيها وما نسلّمه عادة في كل منها.",
        },
        path: "/clients",
      },
      {
        label: { en: "Where we film", ar: "أين نصوّر" },
        description: {
          en: "The emirates we work across and what production looks like in each.",
          ar: "الإمارات التي نعمل فيها وكيف يبدو الإنتاج في كل منها.",
        },
        path: "/service-areas",
      },
    ] as MediaLink[],
  },
  faq: {
    eyebrow: { en: "Common questions", ar: "أسئلة شائعة" },
    h2: { en: "Questions we get asked first.", ar: "أسئلة تُطرح علينا أولاً." },
    items: [
      {
        q: { en: "What does media production include?", ar: "ماذا يشمل الإنتاج الإعلامي؟" },
        a: {
          en: "For us it covers the whole job: working out what the media is for, writing it, planning the shoot, filming it, and finishing every format you need. Film, photography and social cuts are planned together rather than bought separately.",
          ar: "بالنسبة لنا يغطي العمل كله: تحديد الغرض من المحتوى، وكتابته، والتخطيط للتصوير، والتصوير، وإنهاء كل صيغة تحتاجها. يُخطط للفيلم والتصوير الفوتوغرافي ومقاطع السوشيال معاً بدل شرائها منفصلة.",
        },
      },
      {
        q: { en: "Do you work outside Dubai?", ar: "هل تعملون خارج دبي؟" },
        a: {
          en: "Yes. We are based in Dubai and produce across the UAE, including Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah and Al Ain. Location permits and approvals are arranged as part of pre-production.",
          ar: "نعم. مقرنا دبي وننتج عبر الإمارات، بما في ذلك أبوظبي والشارقة وعجمان ورأس الخيمة والعين. تُرتَّب تصاريح المواقع والموافقات ضمن مرحلة ما قبل الإنتاج.",
        },
      },
      {
        q: { en: "How long does a production take?", ar: "كم يستغرق الإنتاج؟" },
        a: {
          en: "It depends on scope, and we will not pretend otherwise. Four to eight weeks from locked concept to final delivery is common. A shorter path is sometimes possible, but only after we have reviewed the scope with you.",
          ar: "يعتمد على النطاق، ولن ندّعي غير ذلك. من أربعة إلى ثمانية أسابيع من اعتماد الفكرة حتى التسليم النهائي أمر شائع. المسار الأقصر ممكن أحياناً، لكن فقط بعد مراجعة النطاق معك.",
        },
      },
      {
        q: { en: "Can one production cover film, photo and social?", ar: "هل يغطي إنتاج واحد الفيلم والصور والسوشيال؟" },
        a: {
          en: "Usually yes, if we know before the shoot. Vertical framing, stills coverage and cut-down lengths all change how a day is scheduled, so they are planned into the call sheet rather than added afterwards.",
          ar: "عادة نعم، إذا عرفنا ذلك قبل التصوير. التأطير العمودي وتغطية الصور الثابتة ومدد المقاطع القصيرة كلها تغيّر جدولة اليوم، لذا تُدرج في ورقة النداء بدل إضافتها لاحقاً.",
        },
      },
      {
        q: { en: "How do I get a price?", ar: "كيف أحصل على سعر؟" },
        a: {
          en: "Tell us the situation and we will scope it with you, then put the scope and the cost in writing before anything is booked. We do not publish a fixed package list, because the crew, the shoot days and the delivery formats change with the brief.",
          ar: "أخبرنا بالوضع وسنحدد النطاق معك، ثم نضع النطاق والتكلفة كتابياً قبل حجز أي شيء. لا ننشر قائمة باقات ثابتة، لأن الطاقم وأيام التصوير وصيغ التسليم تتغير حسب الإيجاز.",
        },
      },
    ] as MediaFaq[],
  },
  inquiry: {
    eyebrow: { en: "Start here", ar: "ابدأ من هنا" },
    h2: { en: "Tell us the situation.", ar: "أخبرنا بالوضع." },
    lead: {
      en: "Three short steps. No budget question, no sales call booking. We read it and reply within one business day.",
      ar: "ثلاث خطوات قصيرة. دون سؤال عن الميزانية ودون حجز مكالمة مبيعات. نقرأه ونرد خلال يوم عمل واحد.",
    },
  },
  cta: {
    h2: { en: "Not sure which one you need?", ar: "لست متأكداً أي خدمة تحتاج؟" },
    lead: {
      en: "That is a normal place to start. Tell us what is happening in the business and we will tell you what the media job actually is.",
      ar: "هذه نقطة بداية طبيعية. أخبرنا بما يحدث في العمل وسنخبرك بما هي مهمة المحتوى فعلاً.",
    },
    whatsapp: { en: "Talk it through on WhatsApp", ar: "تحدّث معنا على واتساب" },
    email: { en: "Email us", ar: "راسلنا" },
  },
  waContext: {
    en: "I read your media production page and want to talk through a project.",
    ar: "قرأت صفحة الإنتاج الإعلامي وأريد مناقشة مشروع.",
  },
  stickyCta: { en: "Start a project brief", ar: "ابدأ ملخص مشروع" },
} as const;

/* ================================================================== *
 * SERVICES                                                            *
 * ================================================================== */

export const mediaServices: MediaService[] = [
  /* ---------------------------------------------------------------- *
   * 01 — Company media revamp                                         *
   * ---------------------------------------------------------------- */
  {
    slug: "company-media-revamp",
    order: 1,
    short: { en: "Company media revamp", ar: "تجديد محتوى الشركة" },
    breadcrumb: { en: "Company media revamp", ar: "تجديد محتوى الشركة" },
    meta: {
      title: {
        en: "Company Media Revamp in Dubai | Big Story",
        ar: "تجديد محتوى الشركة في دبي | بيك ستوري",
      },
      description: {
        en: "Bring outdated company video and photography back into one consistent look. Dubai and UAE production, from asset audit to final delivery.",
        ar: "أعد فيديو وصور شركتك القديمة إلى مظهر واحد متسق. إنتاج في دبي والإمارات، من مراجعة الأصول حتى التسليم النهائي.",
      },
    },
    hero: {
      eyebrow: { en: "Media Production · Revamp", ar: "الإنتاج الإعلامي · التجديد" },
      h1: { en: "Company Media Revamp", ar: "تجديد محتوى الشركة" },
      lead: {
        en: "Your company has media. It just does not look like it came from the same company. We audit what exists, decide what is worth keeping, and reshoot the rest to one standard.",
        ar: "شركتك لديها محتوى. لكنه لا يبدو صادراً عن الشركة نفسها. نراجع الموجود، ونقرر ما يستحق الإبقاء عليه، ونعيد تصوير الباقي وفق معيار واحد.",
      },
      ctaPrimary: { en: "Start a revamp brief", ar: "ابدأ ملخص تجديد" },
      ctaSecondary: { en: "All media production", ar: "كل خدمات الإنتاج الإعلامي" },
    },
    problem: {
      eyebrow: { en: "The situation", ar: "الوضع" },
      h2: { en: "Media that aged at different speeds.", ar: "محتوى تقادم بسرعات مختلفة." },
      lead: {
        en: "Almost no company plans to end up here. It happens one urgent request at a time, over a few years, across several suppliers.",
        ar: "لا تخطط أي شركة تقريباً للوصول إلى هنا. يحدث ذلك طلباً عاجلاً تلو الآخر، على مدى سنوات، عبر موردين متعددين.",
      },
      body: {
        en: "The result is a library that fights itself. The website film has one grade, the LinkedIn clips have another, the team photos were taken in three different offices, and half of it shows people who left. None of it is bad enough to throw away on its own, which is exactly why nobody ever fixes it.",
        ar: "النتيجة مكتبة تتصارع مع نفسها. فيلم الموقع بتدرج لوني، ومقاطع لينكدإن بآخر، وصور الفريق التُقطت في ثلاثة مكاتب مختلفة، ونصفها يُظهر أشخاصاً غادروا. لا شيء منها سيئ بما يكفي ليُستبعد وحده، ولهذا بالضبط لا يصلحه أحد أبداً.",
      },
      signals: [
        { en: "The showreel still opens with a logo you no longer use", ar: "الفيديو التعريفي ما زال يبدأ بشعار لم تعد تستخدمه" },
        { en: "Photography looks like it came from four suppliers, because it did", ar: "الصور تبدو صادرة عن أربعة موردين، لأنها كذلك" },
        { en: "Sales sends a different deck video to every prospect", ar: "المبيعات ترسل فيديو عرض مختلفاً لكل عميل محتمل" },
        { en: "Nothing is framed vertically, so social gets a cropped afterthought", ar: "لا شيء مصوَّر عمودياً، فتحصل السوشيال على قصاصة مقتطعة" },
        { en: "You cannot find the master files, only the compressed exports", ar: "لا تجد الملفات الأصلية، بل النسخ المضغوطة فقط" },
      ],
    },
    outcome: {
      eyebrow: { en: "What this is for", ar: "الغرض من هذا" },
      h2: { en: "One library, one standard.", ar: "مكتبة واحدة، معيار واحد." },
      lead: {
        en: "The point of a revamp is not more media. It is media that agrees with itself, so anyone in your team can grab an asset without checking whether it is still allowed.",
        ar: "الغرض من التجديد ليس المزيد من المحتوى. بل محتوى متسق مع نفسه، حتى يستطيع أي شخص في فريقك أخذ أصل دون التحقق مما إذا كان ما زال مسموحاً به.",
      },
      items: [
        {
          label: { en: "Consistency", ar: "الاتساق" },
          body: {
            en: "One grade, one type treatment, one way the company is framed and lit, applied to everything that survives the audit and everything we shoot.",
            ar: "تدرج لوني واحد ومعالجة خطية واحدة وطريقة واحدة لتأطير الشركة وإضاءتها، تُطبق على كل ما يبقى بعد المراجعة وكل ما نصوره.",
          },
        },
        {
          label: { en: "Coverage", ar: "التغطية" },
          body: {
            en: "The formats you actually use, produced deliberately: horizontal for the site, vertical for social, stills for decks and press, captioned versions for silent playback.",
            ar: "الصيغ التي تستخدمها فعلاً، مُنتَجة عن قصد: أفقية للموقع، وعمودية للسوشيال، وصور ثابتة للعروض والصحافة، ونسخ مترجمة للتشغيل الصامت.",
          },
        },
        {
          label: { en: "Control", ar: "التحكم" },
          body: {
            en: "Organised masters handed over with a plain naming structure, so the next person to need an asset can find it without asking you.",
            ar: "ملفات أصلية منظمة تُسلَّم ببنية تسمية واضحة، حتى يجد الشخص التالي الأصل الذي يحتاجه دون سؤالك.",
          },
        },
      ],
    },
    process: {
      eyebrow: { en: "How it runs", ar: "كيف تسير" },
      h2: { en: "Audit first, shoot second.", ar: "المراجعة أولاً، التصوير ثانياً." },
      lead: {
        en: "A revamp is cheaper and faster than a rebuild, but only if we know what is already usable before we plan a single shoot day.",
        ar: "التجديد أرخص وأسرع من إعادة البناء، لكن فقط إذا عرفنا ما هو قابل للاستخدام قبل التخطيط ليوم تصوير واحد.",
      },
      stages: [
        {
          n: "01",
          title: { en: "Asset audit", ar: "مراجعة الأصول" },
          body: {
            en: "We go through what you already have and sort it into three piles: keep as is, keep and regrade, and replace.",
            ar: "نراجع ما لديك ونصنفه إلى ثلاث فئات: يبقى كما هو، ويبقى مع إعادة تدرج لوني، ويُستبدل.",
          },
        },
        {
          n: "02",
          title: { en: "Set the standard", ar: "وضع المعيار" },
          body: {
            en: "We agree the look in writing: how the company is lit, framed, graded and captioned. This becomes the reference for everything after it.",
            ar: "نتفق على المظهر كتابياً: كيف تُضاء الشركة وتُؤطَّر ويُصحَّح لونها وتُترجَم. يصبح هذا مرجعاً لكل ما يليه.",
          },
        },
        {
          n: "03",
          title: { en: "Fill the gaps", ar: "سد الفجوات" },
          body: {
            en: "We plan the shortest shoot that covers what has to be replaced, rather than reshooting the whole library out of habit.",
            ar: "نخطط لأقصر تصوير يغطي ما يجب استبداله، بدل إعادة تصوير المكتبة كاملة بحكم العادة.",
          },
        },
        {
          n: "04",
          title: { en: "Unify in post", ar: "التوحيد في المونتاج" },
          body: {
            en: "Old survivors and new footage are graded and finished to the same standard, so the join is invisible.",
            ar: "تُصحَّح المواد القديمة الباقية واللقطات الجديدة وتُنهى وفق المعيار نفسه، حتى يصبح الفارق غير مرئي.",
          },
        },
        {
          n: "05",
          title: { en: "Hand over", ar: "التسليم" },
          body: {
            en: "You receive one organised set: masters, every format, captions, and a short note on what to use where.",
            ar: "تستلم مجموعة منظمة واحدة: الملفات الأصلية وكل الصيغ والترجمات وملاحظة قصيرة عما يُستخدم أين.",
          },
        },
      ],
    },
    scope: {
      eyebrow: { en: "Scope and deliverables", ar: "النطاق والمخرجات" },
      h2: { en: "What we agree before booking.", ar: "ما نتفق عليه قبل الحجز." },
      lead: {
        en: "A revamp scope depends entirely on what the audit finds, so it is written after the audit and before any booking.",
        ar: "نطاق التجديد يعتمد كلياً على ما تكشفه المراجعة، لذا يُكتب بعد المراجعة وقبل أي حجز.",
      },
      covers: [
        { en: "Which existing assets are kept, regraded or replaced", ar: "أي الأصول الحالية تبقى أو يُعاد تدرجها أو تُستبدل" },
        { en: "The written look standard everything is finished to", ar: "معيار المظهر المكتوب الذي تُنهى عليه كل المواد" },
        { en: "Number of replacement shoot days and where they happen", ar: "عدد أيام التصوير البديلة وأماكنها" },
        { en: "Every output format, aspect ratio and caption language", ar: "كل صيغة إخراج ونسبة عرض ولغة ترجمة" },
        { en: "How masters are named, organised and handed over", ar: "كيف تُسمى الملفات الأصلية وتُنظم وتُسلَّم" },
      ],
    },
    faq: {
      eyebrow: { en: "Common questions", ar: "أسئلة شائعة" },
      h2: { en: "Revamp questions.", ar: "أسئلة التجديد." },
      items: [
        {
          q: { en: "What is a company media revamp?", ar: "ما هو تجديد محتوى الشركة؟" },
          a: {
            en: "It is an audit of the video and photography you already own, followed by a targeted production that replaces only what needs replacing and brings everything that survives up to one standard.",
            ar: "هي مراجعة للفيديو والصور التي تملكها بالفعل، يتبعها إنتاج موجه يستبدل ما يجب استبداله فقط ويرفع كل ما يبقى إلى معيار واحد.",
          },
        },
        {
          q: { en: "Do you have to reshoot everything?", ar: "هل يجب إعادة تصوير كل شيء؟" },
          a: {
            en: "No, and we would rather not. Plenty of existing footage survives a regrade and a recut. The audit exists to find that footage before anyone books a crew.",
            ar: "لا، ونفضل ألا نفعل. كثير من اللقطات الحالية تصمد أمام إعادة التدرج اللوني وإعادة المونتاج. المراجعة موجودة للعثور على تلك اللقطات قبل أن يحجز أحد طاقماً.",
          },
        },
        {
          q: { en: "How long does a revamp take?", ar: "كم يستغرق التجديد؟" },
          a: {
            en: "It depends on how much survives the audit and how many shoot days the gaps need. We give you a date range in writing once the audit is done, not before.",
            ar: "يعتمد على ما يبقى بعد المراجعة وعدد أيام التصوير التي تحتاجها الفجوات. نعطيك نطاقاً زمنياً كتابياً بعد انتهاء المراجعة، لا قبلها.",
          },
        },
        {
          q: { en: "What do we get at the end?", ar: "ماذا نحصل عليه في النهاية؟" },
          a: {
            en: "One organised delivery containing the finished masters, every format and ratio you agreed, caption files, and a short written note on the look standard so future suppliers can match it.",
            ar: "تسليم منظم واحد يضم الملفات الأصلية النهائية وكل صيغة ونسبة اتفقتم عليها وملفات الترجمة وملاحظة مكتوبة قصيرة عن معيار المظهر ليتمكن الموردون المستقبليون من مطابقته.",
          },
        },
      ],
    },
    related: [
      {
        label: { en: "Corporate video production", ar: "إنتاج فيديو الشركات" },
        description: {
          en: "Company profiles, explainers and executive interviews across the UAE.",
          ar: "أفلام تعريفية للشركات وشروحات ومقابلات تنفيذية عبر الإمارات.",
        },
        path: "/services/corporate-video-production-uae",
      },
      {
        label: { en: "Photography revamp", ar: "تجديد التصوير الفوتوغرافي" },
        description: {
          en: "The stills side of the same problem, handled the same way.",
          ar: "الجانب الفوتوغرافي من المشكلة نفسها، يُعالج بالطريقة نفسها.",
        },
        path: "/services/photography-revamp",
      },
    ],
    cta: {
      h2: { en: "Send us what you already have.", ar: "أرسل لنا ما لديك بالفعل." },
      lead: {
        en: "The fastest way to start a revamp is to show us the current library. We will tell you what is worth keeping before we talk about shooting anything.",
        ar: "أسرع طريقة لبدء التجديد هي أن ترينا المكتبة الحالية. سنخبرك بما يستحق الإبقاء عليه قبل أن نتحدث عن تصوير أي شيء.",
      },
      primary: { en: "Start a revamp brief", ar: "ابدأ ملخص تجديد" },
      whatsapp: { en: "Send us a link on WhatsApp", ar: "أرسل لنا رابطاً على واتساب" },
    },
    waContext: {
      en: "I want a company media revamp. Here is what we currently have:",
      ar: "أريد تجديد محتوى شركتي. هذا ما لدينا حالياً:",
    },
  },

  /* ---------------------------------------------------------------- *
   * 02 — New product launch                                           *
   * ---------------------------------------------------------------- */
  {
    slug: "new-product-launch",
    order: 2,
    short: { en: "New product launch", ar: "إطلاق منتج جديد" },
    breadcrumb: { en: "New product launch", ar: "إطلاق منتج جديد" },
    meta: {
      title: {
        en: "Product Launch Video Production Dubai | Big Story",
        ar: "إنتاج فيديو إطلاق المنتجات في دبي | بيك ستوري",
      },
      description: {
        en: "Film, photo and social assets for a UAE product launch, planned as one campaign and produced from one shoot. Dubai based, concept to delivery.",
        ar: "أفلام وصور ومحتوى سوشيال لإطلاق منتج في الإمارات، مخطط كحملة واحدة ومُنتَج من تصوير واحد. مقرنا دبي، من الفكرة إلى التسليم.",
      },
    },
    hero: {
      eyebrow: { en: "Media Production · Launch", ar: "الإنتاج الإعلامي · الإطلاق" },
      h1: { en: "New Product Launch Media Production", ar: "إنتاج إعلامي لإطلاق منتج جديد" },
      lead: {
        en: "A launch has a date, and the date does not move. We plan the film, the stills and the social cuts as one campaign, then produce them from one shoot so everything lands together.",
        ar: "الإطلاق له موعد، والموعد لا يتغير. نخطط للفيلم والصور ومقاطع السوشيال كحملة واحدة، ثم ننتجها من تصوير واحد ليصل كل شيء معاً.",
      },
      ctaPrimary: { en: "Start a launch brief", ar: "ابدأ ملخص إطلاق" },
      ctaSecondary: { en: "All media production", ar: "كل خدمات الإنتاج الإعلامي" },
    },
    problem: {
      eyebrow: { en: "The situation", ar: "الوضع" },
      h2: { en: "The date is fixed. The assets are not.", ar: "الموعد ثابت. الأصول ليست كذلك." },
      lead: {
        en: "Product launches go wrong in a predictable way, and it is almost never the film that fails. It is everything that was not planned alongside it.",
        ar: "تفشل إطلاقات المنتجات بطريقة متوقعة، ونادراً ما يكون الفيلم هو الفاشل. بل كل ما لم يُخطط له بجانبه.",
      },
      body: {
        en: "A hero film gets commissioned. Then, a week before launch, someone asks for the vertical version, the fifteen second paid cut, the product stills for the marketplace listing, the founder soundbite for press, and the silent captioned version for the feed. All of that is a second production if it was not on the call sheet, and there is no time left for a second production.",
        ar: "يُطلب فيلم رئيسي. ثم قبل أسبوع من الإطلاق يطلب أحدهم النسخة العمودية والمقطع المدفوع بخمس عشرة ثانية وصور المنتج لقائمة المتجر ومقطع المؤسس للصحافة والنسخة الصامتة المترجمة للخلاصة. كل ذلك إنتاج ثانٍ إن لم يكن في ورقة النداء، ولا وقت متبقياً لإنتاج ثانٍ.",
      },
      signals: [
        { en: "The launch date is already committed to retail or press", ar: "موعد الإطلاق مُلتزَم به بالفعل أمام التجزئة أو الصحافة" },
        { en: "Paid media needs several cut lengths, not one film", ar: "الإعلانات المدفوعة تحتاج عدة مدد، لا فيلماً واحداً" },
        { en: "The marketplace listing needs stills on a specific background", ar: "قائمة المتجر تحتاج صوراً ثابتة بخلفية محددة" },
        { en: "Regional channels need Arabic and English versions on the same day", ar: "القنوات الإقليمية تحتاج نسخاً عربية وإنجليزية في اليوم نفسه" },
        { en: "The product itself only exists as a handful of prototypes", ar: "المنتج نفسه لا يوجد إلا كعدد قليل من النماذج الأولية" },
      ],
    },
    outcome: {
      eyebrow: { en: "What this is for", ar: "الغرض من هذا" },
      h2: { en: "Everything ready on the same day.", ar: "كل شيء جاهز في اليوم نفسه." },
      lead: {
        en: "The point of planning a launch as one campaign is that nothing has to be requested late, because it was already on the shot list.",
        ar: "الغرض من التخطيط للإطلاق كحملة واحدة هو ألا يُطلب شيء متأخراً، لأنه كان بالفعل في قائمة اللقطات.",
      },
      items: [
        {
          label: { en: "One shoot", ar: "تصوير واحد" },
          body: {
            en: "Horizontal, vertical and stills coverage are scheduled into the same day rather than treated as separate jobs, which is what makes the wider asset set possible at all.",
            ar: "تُجدول التغطية الأفقية والعمودية والصور الثابتة في اليوم نفسه بدل معاملتها كأعمال منفصلة، وهذا ما يجعل مجموعة الأصول الأوسع ممكنة أصلاً.",
          },
        },
        {
          label: { en: "One deadline", ar: "موعد نهائي واحد" },
          body: {
            en: "We work backwards from your launch date to fix the shoot day, the review rounds and the delivery date, and we tell you early if the date is not achievable.",
            ar: "نعمل بشكل عكسي من موعد إطلاقك لتحديد يوم التصوير وجولات المراجعة وموعد التسليم، ونخبرك مبكراً إذا كان الموعد غير قابل للتحقيق.",
          },
        },
        {
          label: { en: "One look", ar: "مظهر واحد" },
          body: {
            en: "The press shot, the paid ad and the marketplace still all come from the same lighting and the same grade, so the product reads as one product everywhere.",
            ar: "صورة الصحافة والإعلان المدفوع وصورة المتجر تأتي كلها من الإضاءة نفسها والتدرج اللوني نفسه، فيبدو المنتج منتجاً واحداً في كل مكان.",
          },
        },
      ],
    },
    process: {
      eyebrow: { en: "How it runs", ar: "كيف تسير" },
      h2: { en: "Planned backwards from launch day.", ar: "مخطط بشكل عكسي من يوم الإطلاق." },
      lead: {
        en: "Every date in the plan is derived from the one date you cannot move, which is the only sane way to schedule a launch.",
        ar: "كل موعد في الخطة مشتق من الموعد الوحيد الذي لا يمكنك تغييره، وهي الطريقة العاقلة الوحيدة لجدولة إطلاق.",
      },
      stages: [
        {
          n: "01",
          title: { en: "Asset list", ar: "قائمة الأصول" },
          body: {
            en: "Before anything creative, we list every asset the launch needs and which channel it is for. This is the document the whole plan hangs from.",
            ar: "قبل أي عمل إبداعي، نضع قائمة بكل أصل يحتاجه الإطلاق ولأي قناة. هذه الوثيقة تُبنى عليها الخطة كلها.",
          },
        },
        {
          n: "02",
          title: { en: "Reverse schedule", ar: "جدول عكسي" },
          body: {
            en: "Working back from launch day we fix the delivery date, the review rounds, the edit window and the shoot day.",
            ar: "بالعمل عكسياً من يوم الإطلاق نحدد موعد التسليم وجولات المراجعة ونافذة المونتاج ويوم التصوير.",
          },
        },
        {
          n: "03",
          title: { en: "Concept and script", ar: "الفكرة والنص" },
          body: {
            en: "We write the hero film and, at the same time, the shorter cuts, so the short versions are written rather than trimmed.",
            ar: "نكتب الفيلم الرئيسي، وفي الوقت نفسه المقاطع الأقصر، لتكون النسخ القصيرة مكتوبة لا مقتطعة.",
          },
        },
        {
          n: "04",
          title: { en: "Multi-format shoot", ar: "تصوير متعدد الصيغ" },
          body: {
            en: "One production day covers the film, the vertical framing and the product stills, because all three are on the shot list from the start.",
            ar: "يوم إنتاج واحد يغطي الفيلم والتأطير العمودي وصور المنتج، لأن الثلاثة في قائمة اللقطات من البداية.",
          },
        },
        {
          n: "05",
          title: { en: "Staged delivery", ar: "تسليم على مراحل" },
          body: {
            en: "Press stills and the teaser can land before the hero film if your rollout needs them earlier. We agree that order in the schedule.",
            ar: "يمكن أن تصل صور الصحافة والمقطع التشويقي قبل الفيلم الرئيسي إذا كان إطلاقك يحتاجها مبكراً. نتفق على هذا الترتيب في الجدول.",
          },
        },
      ],
    },
    scope: {
      eyebrow: { en: "Scope and deliverables", ar: "النطاق والمخرجات" },
      h2: { en: "The asset list is the scope.", ar: "قائمة الأصول هي النطاق." },
      lead: {
        en: "For a launch, scope is simply the agreed asset list plus the dates each item is due. Both are written down before anything is booked.",
        ar: "بالنسبة للإطلاق، النطاق هو ببساطة قائمة الأصول المتفق عليها مع مواعيد استحقاق كل عنصر. يُكتب كلاهما قبل حجز أي شيء.",
      },
      covers: [
        { en: "Every asset the launch needs, and the channel it is for", ar: "كل أصل يحتاجه الإطلاق، والقناة المخصص لها" },
        { en: "Cut lengths and aspect ratios, decided before the shoot", ar: "مدد المقاطع ونسب العرض، تُحدد قبل التصوير" },
        { en: "Whether stills coverage runs on the same day as the film", ar: "ما إذا كانت تغطية الصور الثابتة في يوم الفيلم نفسه" },
        { en: "Arabic and English versions, captions and who supplies copy", ar: "النسخ العربية والإنجليزية والترجمات ومن يوفر النصوص" },
        { en: "The delivery date for each item, working back from launch day", ar: "موعد تسليم كل عنصر، بالعمل عكسياً من يوم الإطلاق" },
      ],
    },
    faq: {
      eyebrow: { en: "Common questions", ar: "أسئلة شائعة" },
      h2: { en: "Launch questions.", ar: "أسئلة الإطلاق." },
      items: [
        {
          q: { en: "Can one shoot cover the film, the photos and the social cuts?", ar: "هل يغطي تصوير واحد الفيلم والصور ومقاطع السوشيال؟" },
          a: {
            en: "Usually yes, provided it is on the shot list before the day. Vertical framing and stills coverage change how the day is blocked and lit, so they are planned in rather than squeezed in.",
            ar: "عادة نعم، شرط أن يكون في قائمة اللقطات قبل اليوم. التأطير العمودي وتغطية الصور الثابتة يغيران طريقة تقسيم اليوم وإضاءته، لذا يُخطط لهما بدل حشرهما.",
          },
        },
        {
          q: { en: "How far ahead of launch day should we start?", ar: "قبل كم من يوم الإطلاق يجب أن نبدأ؟" },
          a: {
            en: "Earlier than most people expect, because the schedule is built backwards. Tell us the launch date first and we will tell you honestly whether the remaining time is enough for the asset list you want.",
            ar: "أبكر مما يتوقع معظم الناس، لأن الجدول يُبنى عكسياً. أخبرنا بموعد الإطلاق أولاً وسنخبرك بصدق ما إذا كان الوقت المتبقي يكفي لقائمة الأصول التي تريدها.",
          },
        },
        {
          q: { en: "Can you work to a fixed launch date?", ar: "هل يمكنكم العمل وفق موعد إطلاق ثابت؟" },
          a: {
            en: "That is how we plan every launch. What we will not do is accept a date we do not believe is achievable and tell you later. If the timeline is too tight for the full list, we say so at the scoping stage and propose what can be delivered instead.",
            ar: "هكذا نخطط لكل إطلاق. ما لن نفعله هو قبول موعد لا نعتقد أنه قابل للتحقيق ثم إخبارك لاحقاً. إذا كان الجدول ضيقاً على القائمة الكاملة، نقول ذلك في مرحلة تحديد النطاق ونقترح ما يمكن تسليمه بدلاً منه.",
          },
        },
        {
          q: { en: "Do you produce the vertical and paid-ad versions too?", ar: "هل تنتجون النسخ العمودية ونسخ الإعلانات المدفوعة أيضاً؟" },
          a: {
            en: "Yes, and we write them rather than crop them. A fifteen second paid cut that was scripted as a fifteen second cut holds attention very differently from a hero film trimmed down at the end.",
            ar: "نعم، ونكتبها بدل اقتطاعها. المقطع المدفوع بخمس عشرة ثانية المكتوب أصلاً بهذه المدة يحافظ على الانتباه بشكل مختلف تماماً عن فيلم رئيسي مقتطع في النهاية.",
          },
        },
      ],
    },
    related: [
      {
        label: { en: "TVC production in Dubai", ar: "إنتاج الإعلانات التلفزيونية في دبي" },
        description: {
          en: "Campaign spots for broadcast, YouTube and paid social.",
          ar: "إعلانات الحملات للبث ويوتيوب والسوشيال المدفوع.",
        },
        path: "/services/tvc-production-dubai",
      },
      {
        label: { en: "Video production", ar: "إنتاج الفيديو" },
        description: {
          en: "The full production offering, from concept through to final master.",
          ar: "عرض الإنتاج الكامل، من الفكرة حتى النسخة النهائية.",
        },
        path: "/services/video-production",
      },
    ],
    cta: {
      h2: { en: "Tell us the launch date first.", ar: "أخبرنا بموعد الإطلاق أولاً." },
      lead: {
        en: "Everything else in a launch plan is derived from it. Give us the date and the asset list, and we will tell you straight away whether it is achievable.",
        ar: "كل شيء آخر في خطة الإطلاق مشتق منه. أعطنا الموعد وقائمة الأصول، وسنخبرك فوراً ما إذا كان قابلاً للتحقيق.",
      },
      primary: { en: "Start a launch brief", ar: "ابدأ ملخص إطلاق" },
      whatsapp: { en: "Check a launch date on WhatsApp", ar: "تحقق من موعد إطلاق على واتساب" },
    },
    waContext: {
      en: "We have a product launch coming up. The launch date is:",
      ar: "لدينا إطلاق منتج قريب. موعد الإطلاق هو:",
    },
  },

  /* ---------------------------------------------------------------- *
   * 03 — New company launch                                           *
   * ---------------------------------------------------------------- */
  {
    slug: "new-company-launch",
    order: 3,
    short: { en: "New company launch", ar: "إطلاق شركة جديدة" },
    breadcrumb: { en: "New company launch", ar: "إطلاق شركة جديدة" },
    meta: {
      title: {
        en: "New Company Launch Media in Dubai | Big Story",
        ar: "محتوى إطلاق الشركات الجديدة في دبي | بيك ستوري",
      },
      description: {
        en: "Launch a new UAE company with one consistent media set: brand film, founder story, service and social assets, planned and produced together.",
        ar: "أطلق شركة إماراتية جديدة بمجموعة محتوى متسقة: فيلم تعريفي وقصة المؤسس وأصول الخدمات والسوشيال، مخططة ومُنتَجة معاً.",
      },
    },
    hero: {
      eyebrow: { en: "Media Production · New company", ar: "الإنتاج الإعلامي · شركة جديدة" },
      h1: { en: "New Company Launch Media Production", ar: "إنتاج إعلامي لإطلاق شركة جديدة" },
      lead: {
        en: "A new company goes live everywhere at once: the site, the pitch deck, the social accounts, the first meetings. We produce the whole media set in one planned run so every channel opens looking like the same business.",
        ar: "الشركة الجديدة تنطلق في كل مكان دفعة واحدة: الموقع وعرض التقديم وحسابات السوشيال والاجتماعات الأولى. ننتج مجموعة المحتوى كاملة في جولة مخططة واحدة لتفتح كل قناة بمظهر العمل نفسه.",
      },
      ctaPrimary: { en: "Start a launch brief", ar: "ابدأ ملخص إطلاق" },
      ctaSecondary: { en: "All media production", ar: "كل خدمات الإنتاج الإعلامي" },
    },
    problem: {
      eyebrow: { en: "The situation", ar: "الوضع" },
      h2: { en: "Nothing exists yet, and everything is needed at once.", ar: "لا شيء موجود بعد، وكل شيء مطلوب دفعة واحدة." },
      lead: {
        en: "This is the widest brief of the three, and the one most often solved badly, by hiring a different freelancer for each asset.",
        ar: "هذا أوسع إيجاز بين الثلاثة، والأكثر حلاً بشكل سيئ، عبر توظيف مستقل مختلف لكل أصل.",
      },
      body: {
        en: "Each freelancer does a reasonable job in isolation. The founder video is shot in a co-working space, the service explainer is shot against a white wall, the social clips are shot on a phone, and the stills come from a fourth person entirely. Individually all of it is fine. Together it makes a new company look like it has been outsourced, which is the exact impression a new company cannot afford.",
        ar: "كل مستقل يؤدي عملاً معقولاً بمفرده. يُصوَّر فيديو المؤسس في مساحة عمل مشتركة، ويُصوَّر شرح الخدمة أمام جدار أبيض، وتُصوَّر مقاطع السوشيال بهاتف، وتأتي الصور من شخص رابع تماماً. كل ذلك جيد على حدة. لكنه معاً يجعل الشركة الجديدة تبدو مستعان بها من الخارج، وهو الانطباع الذي لا تستطيع شركة جديدة تحمله.",
      },
      signals: [
        { en: "There is no existing footage or photography to build from", ar: "لا توجد لقطات أو صور حالية للبناء عليها" },
        { en: "The website, the deck and the social accounts all go live together", ar: "الموقع وعرض التقديم وحسابات السوشيال تنطلق معاً" },
        { en: "The founder is the brand, at least for the first year", ar: "المؤسس هو العلامة، على الأقل في السنة الأولى" },
        { en: "You need Arabic and English from day one, not later", ar: "تحتاج العربية والإنجليزية من اليوم الأول، لا لاحقاً" },
        { en: "The team is small, so nobody has time to manage four suppliers", ar: "الفريق صغير، فلا وقت لدى أحد لإدارة أربعة موردين" },
      ],
    },
    outcome: {
      eyebrow: { en: "What this is for", ar: "الغرض من هذا" },
      h2: { en: "A launch set that looks intentional.", ar: "مجموعة إطلاق تبدو مقصودة." },
      lead: {
        en: "The point is not to have a film. It is to open every channel on the same day with media that clearly came from one decision.",
        ar: "الغرض ليس امتلاك فيلم. بل فتح كل قناة في اليوم نفسه بمحتوى واضح أنه صادر عن قرار واحد.",
      },
      items: [
        {
          label: { en: "A full set", ar: "مجموعة كاملة" },
          body: {
            en: "Brand film, founder story, a service or product explainer, social cuts and stills, produced together rather than commissioned one at a time.",
            ar: "فيلم تعريفي وقصة المؤسس وشرح خدمة أو منتج ومقاطع سوشيال وصور، مُنتَجة معاً بدل طلبها واحداً تلو الآخر.",
          },
        },
        {
          label: { en: "One visual identity on screen", ar: "هوية بصرية واحدة على الشاشة" },
          body: {
            en: "The same lighting, framing, type and grade across every asset, so the first impression is consistent no matter which channel someone finds you on.",
            ar: "الإضاءة والتأطير والخطوط والتدرج اللوني نفسها عبر كل أصل، ليكون الانطباع الأول متسقاً بغض النظر عن القناة التي يجدك فيها أحدهم.",
          },
        },
        {
          label: { en: "Room to grow", ar: "مساحة للنمو" },
          body: {
            en: "We hand over the written look standard alongside the files, so whatever you produce next, with us or without us, can match what you launched with.",
            ar: "نسلّم معيار المظهر المكتوب مع الملفات، حتى يمكن لما تنتجه لاحقاً، معنا أو بدوننا، أن يطابق ما أطلقت به.",
          },
        },
      ],
    },
    process: {
      eyebrow: { en: "How it runs", ar: "كيف تسير" },
      h2: { en: "Decide the story, then shoot it once.", ar: "حدد القصة، ثم صوّرها مرة واحدة." },
      lead: {
        en: "With nothing to build from, the first job is not filming. It is agreeing what the company says about itself, in words, before a camera is booked.",
        ar: "مع عدم وجود ما يُبنى عليه، المهمة الأولى ليست التصوير. بل الاتفاق على ما تقوله الشركة عن نفسها، بالكلمات، قبل حجز كاميرا.",
      },
      stages: [
        {
          n: "01",
          title: { en: "Positioning session", ar: "جلسة تحديد الموقع" },
          body: {
            en: "We work out what the company does, who it is for and why it exists, in plain language you would actually say out loud.",
            ar: "نحدد ما تفعله الشركة ولمن ولماذا توجد، بلغة واضحة تقولها فعلاً بصوت عالٍ.",
          },
        },
        {
          n: "02",
          title: { en: "Launch asset list", ar: "قائمة أصول الإطلاق" },
          body: {
            en: "We agree exactly which pieces the launch needs and where each one is going to live, before writing a single script.",
            ar: "نتفق بالضبط على القطع التي يحتاجها الإطلاق وأين ستوضع كل واحدة، قبل كتابة أي نص.",
          },
        },
        {
          n: "03",
          title: { en: "Scripts and look", ar: "النصوص والمظهر" },
          body: {
            en: "Every piece is scripted, and the visual standard is written down once so all of them are made to it.",
            ar: "تُكتب كل قطعة، ويُدوَّن المعيار البصري مرة واحدة لتُصنع جميعها وفقه.",
          },
        },
        {
          n: "04",
          title: { en: "Consolidated shoot", ar: "تصوير موحد" },
          body: {
            en: "The founder, the team, the space and the product are covered in as few days as the asset list allows, all lit and framed to the same standard.",
            ar: "يُغطى المؤسس والفريق والمكان والمنتج في أقل عدد ممكن من الأيام تسمح به قائمة الأصول، بإضاءة وتأطير وفق المعيار نفسه.",
          },
        },
        {
          n: "05",
          title: { en: "Launch delivery", ar: "تسليم الإطلاق" },
          body: {
            en: "Every asset is delivered in the formats each channel needs, in one organised handover, with the look standard included.",
            ar: "يُسلَّم كل أصل بالصيغ التي تحتاجها كل قناة، في تسليم منظم واحد، مع معيار المظهر.",
          },
        },
      ],
    },
    scope: {
      eyebrow: { en: "Scope and deliverables", ar: "النطاق والمخرجات" },
      h2: { en: "What a launch set contains.", ar: "ما تحتويه مجموعة الإطلاق." },
      lead: {
        en: "A launch set is sized to the channels you are actually opening, so the list is agreed with you before anything is booked.",
        ar: "يُحدد حجم مجموعة الإطلاق حسب القنوات التي تفتحها فعلاً، لذا تُتفق القائمة معك قبل حجز أي شيء.",
      },
      covers: [
        { en: "Which channels open on launch day and what each one needs", ar: "أي القنوات تفتح يوم الإطلاق وما تحتاجه كل واحدة" },
        { en: "Whether the founder appears on camera, and in which languages", ar: "ما إذا كان المؤسس سيظهر أمام الكاميرا، وبأي لغات" },
        { en: "How many shoot days the full asset list needs", ar: "كم يوم تصوير تحتاجه قائمة الأصول الكاملة" },
        { en: "Locations, and whether a space is available before launch", ar: "المواقع، وما إذا كان المكان متاحاً قبل الإطلاق" },
        { en: "The written look standard handed over with the files", ar: "معيار المظهر المكتوب المُسلَّم مع الملفات" },
      ],
    },
    faq: {
      eyebrow: { en: "Common questions", ar: "أسئلة شائعة" },
      h2: { en: "New company questions.", ar: "أسئلة الشركات الجديدة." },
      items: [
        {
          q: { en: "We are pre-launch and have no brand assets. Where do we start?", ar: "نحن قبل الإطلاق ولا نملك أي أصول للعلامة. من أين نبدأ؟" },
          a: {
            en: "With words, not cameras. The first session works out what the company does and who it is for, in plain language. Everything after that is easier and cheaper because the decisions are already made.",
            ar: "بالكلمات لا بالكاميرات. الجلسة الأولى تحدد ما تفعله الشركة ولمن، بلغة واضحة. كل ما بعد ذلك أسهل وأقل كلفة لأن القرارات اتُّخذت بالفعل.",
          },
        },
        {
          q: { en: "What is usually in a launch media set?", ar: "ماذا يوجد عادة في مجموعة محتوى الإطلاق؟" },
          a: {
            en: "It varies with the channels you are opening, which is why we agree the list first. Commonly it includes a short brand film, a founder piece, an explainer for the main service or product, vertical social cuts and a set of stills.",
            ar: "يختلف حسب القنوات التي تفتحها، ولهذا نتفق على القائمة أولاً. عادة تشمل فيلماً تعريفياً قصيراً وقطعة عن المؤسس وشرحاً للخدمة أو المنتج الرئيسي ومقاطع سوشيال عمودية ومجموعة صور.",
          },
        },
        {
          q: { en: "Can you produce in Arabic and English?", ar: "هل يمكنكم الإنتاج بالعربية والإنجليزية؟" },
          a: {
            en: "Yes. We produce bilingually, and it is much simpler when it is decided before the shoot, because it affects scripting, on-camera delivery and how captions are laid out.",
            ar: "نعم. ننتج بلغتين، والأمر أبسط بكثير عندما يُقرر قبل التصوير، لأنه يؤثر على كتابة النصوص والأداء أمام الكاميرا وطريقة عرض الترجمات.",
          },
        },
        {
          q: { en: "How soon before launch should we book?", ar: "قبل كم من الإطلاق يجب أن نحجز؟" },
          a: {
            en: "As soon as the launch date exists, because a launch set needs a positioning session and a scripting round before any filming. Tell us the date and we will tell you honestly what fits in the time remaining.",
            ar: "بمجرد وجود موعد الإطلاق، لأن مجموعة الإطلاق تحتاج جلسة تحديد موقع وجولة كتابة قبل أي تصوير. أخبرنا بالموعد وسنخبرك بصدق بما يناسب الوقت المتبقي.",
          },
        },
      ],
    },
    related: [
      {
        label: { en: "Brand films", ar: "الأفلام التعريفية للعلامات" },
        description: {
          en: "The centrepiece film most launch sets are built around.",
          ar: "الفيلم المحوري الذي تُبنى حوله معظم مجموعات الإطلاق.",
        },
        path: "/services/brand-films",
      },
      {
        label: { en: "Website design and development", ar: "تصميم وتطوير المواقع" },
        description: {
          en: "The channel a launch set usually lands on first.",
          ar: "القناة التي تصل إليها مجموعة الإطلاق أولاً عادة.",
        },
        path: "/website-services",
      },
    ],
    cta: {
      h2: { en: "Launching something new?", ar: "هل تطلق شيئاً جديداً؟" },
      lead: {
        en: "Start with a conversation about what the company actually is. The media plan follows from that, and it is a much shorter conversation than most founders expect.",
        ar: "ابدأ بمحادثة عما هي الشركة فعلاً. تتبع خطة المحتوى من ذلك، وهي محادثة أقصر بكثير مما يتوقع معظم المؤسسين.",
      },
      primary: { en: "Start a launch brief", ar: "ابدأ ملخص إطلاق" },
      whatsapp: { en: "Talk to a producer on WhatsApp", ar: "تحدث مع منتج على واتساب" },
    },
    waContext: {
      en: "We are launching a new company and need a full media set. Here is what we do:",
      ar: "نطلق شركة جديدة ونحتاج مجموعة محتوى كاملة. هذا ما نقوم به:",
    },
  },
];

export const mediaServiceSlugs = mediaServices.map((s) => s.slug);

export function getMediaService(slug: string): MediaService | undefined {
  return mediaServices.find((s) => s.slug === slug);
}

/** Canonical base path for the silo. */
export const MEDIA_BASE = "/media-production";
