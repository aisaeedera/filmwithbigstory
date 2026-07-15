import type { L } from "@/lib/i18n";

/*
  Public pricing catalogue for /pricing.
  Source of truth: /website/data/PRICING.json (v7, 2026-07-14 — Claude audit).

  NOTE: internal negotiation figures from the source JSON — pricing floors,
  walk-away numbers, cost breakdowns, margins, and the _flexibility_rules
  block — are deliberately NOT surfaced here. Only client-facing rates,
  scopes and deliverables belong on the page.

  v7 changes (Saeed feedback 2026-07-14):
  - Brand-system packages reduced (12K/30K/65K -> 7.5K/18K/42K) to match UAE market
  - Photographer and videographer rates clarified as freelancer pass-through
  - GMB monthly, SEO monthly, and CRO retainer scope now explicit
  - Photography pricing exposes props + additional equipment + actors as line items
  - Podcast "episode (audio only)" clarified as audio-only finished episode
  - SEO monthly retainer clarified as AI-led, not a human specialist retainered
  - Demo video "cheap using existing footage" placeholder removed (was a placeholder in
    BRAND_SYSTEM_DETAILED_PLAN_v1.md and could mislead clients — replaced with honest
    edit-only AED 2,500 line item)
*/

export type PriceUnit =
  | "from" // "from AED 15,000" — starting price
  | "day" // "AED 900 / day"
  | "month" // "AED 500 / month"
  | "page" // "AED 350 / page"
  | "word" // "AED 0.3 / word"
  | "copy" // "AED 3 / copy"
  | "test" // "AED 1,000 / test"
  | "each"; // flat one-off — no suffix

export type PricingModule = {
  id: string;
  name: L;
  price: number; // AED
  unit: PriceUnit;
  /** Full description shown in the module modal. */
  desc?: L;
};

export type PricingCategory = {
  id: string;
  name: L;
  blurb: L;
  /** true = mix-and-match individual modules; false = fixed bundled tiers. */
  modular: boolean;
  /** Category-level highlights (e.g. multi-day discounts). */
  notes?: L[];
  modules: PricingModule[];
};

export const pricing: PricingCategory[] = [
  {
    id: "red_komodo_x",
    name: { en: "RED KOMODO-X Camera Rental", ar: "تأجير كاميرا RED KOMODO-X" },
    blurb: {
      en: "6K cinema camera packages rented by the day, with our own crew available. Rates drop for multi-day and long-term bookings.",
      ar: "باقات كاميرا سينمائية بدقة 6K للإيجار اليومي، مع طاقمنا الخاص عند الطلب. تنخفض الأسعار للحجوزات متعددة الأيام وطويلة الأمد.",
    },
    modular: true,
    notes: [
      { en: "3+ consecutive days — 12% off the day rate.", ar: "3 أيام متتالية فأكثر — خصم 12٪ على السعر اليومي." },
      { en: "10+ day / long-term bookings — 20% off the day rate.", ar: "حجوزات 10 أيام فأكثر / طويلة الأمد — خصم 20٪ على السعر اليومي." },
    ],
    modules: [
      {
        id: "komodo_brain",
        name: { en: "KOMODO-X body (brain only)", ar: "جسم KOMODO-X (البودي فقط)" },
        price: 900,
        unit: "day",
        desc: {
          en: "The RED KOMODO-X camera body on its own — for productions that already have their own lenses, media and support gear.",
          ar: "جسم كاميرا RED KOMODO-X وحده — للإنتاجات التي تمتلك عدساتها ووسائط التخزين ومعدات الدعم الخاصة بها.",
        },
      },
      {
        id: "komodo_cinema_kit",
        name: { en: "Cinema kit", ar: "طقم السينما" },
        price: 1400,
        unit: "day",
        desc: {
          en: "Camera body plus a working cinema set-up — lens, monitor, media and essential support so you can shoot straight out of the case.",
          ar: "جسم الكاميرا مع إعداد سينمائي جاهز — عدسة وشاشة ووسائط ودعم أساسي لتبدأ التصوير مباشرة.",
        },
      },
      {
        id: "komodo_full_bundle",
        name: { en: "Full bundle", ar: "الحزمة الكاملة" },
        price: 1800,
        unit: "day",
        desc: {
          en: "Our complete KOMODO-X package — body, lenses, monitoring, media, power and support rig ready for a full production day.",
          ar: "حزمة KOMODO-X الكاملة — جسم وعدسات ومراقبة ووسائط وطاقة وحامل دعم جاهزة ليوم إنتاج كامل.",
        },
      },
      {
        id: "komodo_first_ac",
        name: { en: "1st AC / camera assistant", ar: "مساعد كاميرا أول" },
        price: 900,
        unit: "day",
        desc: {
          en: "An experienced first assistant camera to pull focus, manage media and run the camera department on set.",
          ar: "مساعد كاميرا أول متمرّس لضبط التركيز وإدارة الوسائط وتشغيل قسم الكاميرا على الموقع.",
        },
      },
    ],
  },
  {
    id: "big_story_services",
    name: { en: "Film & Video Production", ar: "إنتاج الأفلام والفيديو" },
    blurb: {
      en: "Full-service production from concept to final cut. Photographers and videographers are freelancers — their day rate is included in our quote. Starting rates below — the final quote is scoped to your script, cast, locations and delivery.",
      ar: "إنتاج متكامل من الفكرة إلى النسخة النهائية. المصورون والمصورون الفيديويون مستقلون — يُدرج سعرهم اليومي ضمن عرضنا. الأسعار أدناه أسعار بداية — يُحدَّد السعر النهائي حسب النص والممثلين والمواقع والتسليم.",
    },
    modular: true,
    modules: [
      {
        id: "tvc_production",
        name: { en: "TVC & commercial", ar: "إعلان تلفزيوني وتجاري" },
        price: 15000,
        unit: "from",
        desc: {
          en: "A broadcast- and social-ready commercial — concept, script, cast, cinematic shoot and full post-production.",
          ar: "إعلان جاهز للبث والسوشيال — فكرة ونص وممثلون وتصوير سينمائي ومونتاج كامل.",
        },
      },
      {
        id: "brand_film",
        name: { en: "Brand film", ar: "فيلم تعريفي للعلامة" },
        price: 12000,
        unit: "from",
        desc: {
          en: "A story-driven film that captures who your brand is and why it matters — built to be watched to the end.",
          ar: "فيلم قائم على القصة يجسّد هوية علامتك وسبب أهميتها — مصمم ليُشاهَد حتى النهاية.",
        },
      },
      {
        id: "corporate_video",
        name: { en: "Corporate video", ar: "فيديو الشركات" },
        price: 8000,
        unit: "from",
        desc: {
          en: "Company profiles, explainers and internal films that communicate clearly and look the part.",
          ar: "أفلام تعريفية للشركات وفيديوهات توضيحية وأفلام داخلية تتواصل بوضوح وبمظهر لائق.",
        },
      },
      {
        id: "product_video",
        name: { en: "Product video", ar: "فيديو المنتج" },
        price: 6000,
        unit: "from",
        desc: {
          en: "Product-focused films and launch clips that show the detail and sell the benefit.",
          ar: "أفلام تركّز على المنتج ومقاطع إطلاق تُبرز التفاصيل وتبيع الفائدة.",
        },
      },
      {
        id: "social_content_day",
        name: { en: "Social content shoot", ar: "تصوير محتوى السوشيال" },
        price: 3500,
        unit: "day",
        desc: {
          en: "A full shoot day producing short-form content batched for the feed — reels, verticals and cut-downs.",
          ar: "يوم تصوير كامل ينتج محتوى قصيراً مُجمَّعاً للخلاصة — ريلز وفيديوهات عمودية ونسخ مختصرة.",
        },
      },
      {
        id: "event_coverage_day",
        name: { en: "Event coverage", ar: "تغطية الفعاليات" },
        price: 5000,
        unit: "day",
        desc: {
          en: "On-the-day coverage of launches, conferences and activations — highlight film plus social cut-downs.",
          ar: "تغطية يوم الفعالية للإطلاقات والمؤتمرات والتفعيلات — فيلم أبرز اللحظات مع نسخ للسوشيال.",
        },
      },
      {
        id: "documentary",
        name: { en: "Documentary", ar: "فيلم وثائقي" },
        price: 25000,
        unit: "from",
        desc: {
          en: "Long-form, research-led storytelling — interviews, verité shooting and layered post for a documentary piece.",
          ar: "سرد طويل قائم على البحث — مقابلات وتصوير واقعي ومونتاج متعدد الطبقات لعمل وثائقي.",
        },
      },
      {
        id: "edit_only",
        name: { en: "Edit-only (your footage)", ar: "مونتاج فقط (لقطاتك)" },
        price: 2500,
        unit: "each",
        desc: {
          en: "If you already have footage and need a professional edit. Up to 60s final cut + 1 revision round. Useful for repackaging existing shoots into new edits.",
          ar: "إذا كانت لديك لقطات بالفعل وتحتاج مونتاجاً احترافياً. حتى 60 ثانية + جولة مراجعة واحدة. مفيد لإعادة صياغة تصوير موجود في مونتاج جديد.",
        },
      },
      {
        id: "brochure_design_tri_fold",
        name: { en: "Tri-fold brochure design", ar: "تصميم بروشور ثلاثي الطي" },
        price: 1200,
        unit: "each",
        desc: {
          en: "Print-ready three-panel brochure design, laid out for a standard tri-fold format.",
          ar: "تصميم بروشور من ثلاث لوحات جاهز للطباعة بتنسيق ثلاثي الطي القياسي.",
        },
      },
      {
        id: "brochure_design_bi_fold",
        name: { en: "Bi-fold brochure design", ar: "تصميم بروشور ثنائي الطي" },
        price: 1500,
        unit: "each",
        desc: {
          en: "Print-ready two-panel brochure design with more room for imagery and copy.",
          ar: "تصميم بروشور من لوحتين جاهز للطباعة مع مساحة أكبر للصور والنصوص.",
        },
      },
      {
        id: "brochure_design_digital",
        name: { en: "Digital brochure design", ar: "تصميم بروشور رقمي" },
        price: 800,
        unit: "each",
        desc: {
          en: "A screen-first, shareable PDF brochure optimised for email and web.",
          ar: "بروشور PDF قابل للمشاركة مصمم للشاشة ومهيأ للبريد والويب.",
        },
      },
      {
        id: "brochure_design_pitch_deck",
        name: { en: "Pitch deck design", ar: "تصميم عرض تقديمي" },
        price: 2500,
        unit: "each",
        desc: {
          en: "An investor- or client-ready pitch deck — designed slides that carry a clear narrative.",
          ar: "عرض تقديمي جاهز للمستثمرين أو العملاء — شرائح مصممة تحمل سرداً واضحاً.",
        },
      },
      {
        id: "print_short_run",
        name: { en: "Print (short run)", ar: "طباعة (كمية صغيرة)" },
        price: 3,
        unit: "copy",
        desc: {
          en: "Short-run physical printing, priced per copy. Final price depends on stock, finish and quantity.",
          ar: "طباعة ورقية بكميات صغيرة، بسعر للنسخة. يعتمد السعر النهائي على نوع الورق والتشطيب والكمية.",
        },
      },
      {
        id: "brochure_print_pkg",
        name: { en: "Brochure package — print", ar: "باقة البروشور — طباعة" },
        price: 1000,
        unit: "each",
        desc: {
          en: "Design-plus-print bundle for a printed brochure run.",
          ar: "باقة تصميم مع طباعة لدفعة بروشور مطبوعة.",
        },
      },
      {
        id: "brochure_digital_pkg",
        name: { en: "Brochure package — digital", ar: "باقة البروشور — رقمية" },
        price: 500,
        unit: "each",
        desc: {
          en: "Design bundle for a digital-only brochure.",
          ar: "باقة تصميم لبروشور رقمي فقط.",
        },
      },
      {
        id: "brochure_combined_pkg",
        name: { en: "Brochure package — print + digital", ar: "باقة البروشور — طباعة + رقمية" },
        price: 1500,
        unit: "each",
        desc: {
          en: "Combined package covering both a printed and a digital version of your brochure.",
          ar: "باقة مجمّعة تشمل نسخة مطبوعة وأخرى رقمية من البروشور.",
        },
      },
    ],
  },
  {
    id: "photography",
    name: { en: "Photography", ar: "التصوير الفوتوغرافي" },
    blurb: {
      en: "Photographers on shoots are freelancers — the rates below include their day rate plus our production management. Add props, additional equipment and talent as separate line items.",
      ar: "المصورون المستقلون — الأسعار أدناه تشمل سعرهم اليومي بالإضافة إلى إدارة الإنتاج لدينا. أضِف الدعائم والمعدات الإضافية والمواهب كبنود مستقلة.",
    },
    modular: true,
    modules: [
      {
        id: "photographer_half_day",
        name: { en: "Photographer — half day (4h)", ar: "مصور — نصف يوم (4 ساعات)" },
        price: 1500,
        unit: "each",
        desc: {
          en: "Half-day shoot (4 hours) with one photographer (freelancer). Up to 30 km travel within Dubai included. Travel beyond Dubai quoted separately.",
          ar: "تصوير نصف يوم (4 ساعات) مع مصور واحد (مستقل). حتى 30 كم سفر داخل دبي مشمول. السفر خارج Dubai يُسعَّر منفصلاً.",
        },
      },
      {
        id: "photographer_full_day",
        name: { en: "Photographer — full day (8h)", ar: "مصور — يوم كامل (8 ساعات)" },
        price: 2700,
        unit: "each",
        desc: {
          en: "Full-day shoot (8 hours) with one photographer (freelancer). Standard output: 60-120 final retouched images.",
          ar: "تصوير يوم كامل (8 ساعات) مع مصور واحد (مستقل). الناتج القياسي: 60-120 صورة نهائية مع تنميق.",
        },
      },
      {
        id: "second_photographer_half",
        name: { en: "Second photographer — half day", ar: "مصور ثاني — نصف يوم" },
        price: 1100,
        unit: "each",
        desc: {
          en: "Second shooter for multi-angle coverage. Useful for events, weddings and large-scale launches.",
          ar: "مصور ثانٍ لتغطية متعددة الزوايا. مفيد للفعاليات وحفلات الزفاف والإطلاقات الكبيرة.",
        },
      },
      {
        id: "second_photographer_full",
        name: { en: "Second photographer — full day", ar: "مصور ثانٍ — يوم كامل" },
        price: 2000,
        unit: "each",
        desc: {
          en: "Second shooter for full-day multi-angle coverage.",
          ar: "مصور ثانٍ ليوم كامل بتغطية متعددة الزوايا.",
        },
      },
      {
        id: "props_basic",
        name: { en: "Props & styling — basic", ar: "دعائم وتنسيق — أساسي" },
        price: 400,
        unit: "each",
        desc: {
          en: "Light prop sourcing for a single shoot — food, product styling, simple backgrounds. Quoted per shoot.",
          ar: "توفير دعائم خفيفة لتصوير واحد — طعام، تنسيق منتج، خلفيات بسيطة. يُسعَّر لكل تصوير.",
        },
      },
      {
        id: "props_extended",
        name: { en: "Props & styling — extended", ar: "دعائم وتنسيق — موسّع" },
        price: 1200,
        unit: "each",
        desc: {
          en: "Full prop and styling for a multi-day shoot — location dressing, set build, wardrobe sourcing.",
          ar: "دعائم وتنسيق كاملين لتصوير متعدد الأيام — تجهيز الموقع، بناء المجموعة، توفير الملابس.",
        },
      },
      {
        id: "equipment_drone",
        name: { en: "Drone (half day)", ar: "درون (نصف يوم)" },
        price: 1200,
        unit: "each",
        desc: {
          en: "Licensed drone operator + drone. Useful for real estate, events, location shoots. 4K footage delivered.",
          ar: "مشغل درون مرخص + درون. مفيد للعقارات والفعاليات وتصوير المواقع. لقطات 4K مُسلَّمة.",
        },
      },
      {
        id: "actor_half_day",
        name: { en: "Actor / talent — half day", ar: "ممثل / موهبة — نصف يوم" },
        price: 900,
        unit: "each",
        desc: {
          en: "Supporting talent via our casting partner. Principal/lead talent AED 1,500-3,000 extra. AED 200 admin fee applies.",
          ar: "موهبة داعمة عبر شريك الكاستنج لدينا. الموهبة الرئيسية AED 1,500-3,000 إضافية. تُطبق رسوم إدارية AED 200.",
        },
      },
      {
        id: "makeup_half_day",
        name: { en: "Makeup artist — half day", ar: "خبير مكياج — نصف يوم" },
        price: 800,
        unit: "each",
        desc: {
          en: "On-set hair and makeup for one or two talent. Full day AED 1,500.",
          ar: "شعر ومكياج في الموقع لموهبة أو اثنتين. يوم كامل AED 1,500.",
        },
      },
    ],
  },
  {
    id: "videography",
    name: { en: "Videography & Crew", ar: "تصوير الفيديو والطاقم" },
    blurb: {
      en: "DOPs, camera operators and directors are freelancers — the rates below include their day rate. Add gear, talent and post-production as separate line items.",
      ar: "المخرجون والمصورون مستقلون — الأسعار أدناه تشمل سعرهم اليومي. أضِف المعدات والمواهب والمونتاج كبنود مستقلة.",
    },
    modular: true,
    modules: [
      {
        id: "videographer_half_day",
        name: { en: "Videographer — half day (4h)", ar: "مصور فيديو — نصف يوم (4 ساعات)" },
        price: 1500,
        unit: "each",
        desc: {
          en: "Half-day shoot with one freelance videographer + camera kit. Up to 30 km travel within Dubai included.",
          ar: "تصوير نصف يوم مع مصور فيديو مستقل + طقم كاميرا. حتى 30 كم سفر داخل دبي مشمول.",
        },
      },
      {
        id: "videographer_full_day",
        name: { en: "Videographer — full day (8h)", ar: "مصور فيديو — يوم كامل (8 ساعات)" },
        price: 2700,
        unit: "each",
        desc: {
          en: "Full-day shoot with one freelance videographer + camera kit. 4K capable.",
          ar: "تصوير يوم كامل مع مصور فيديو مستقل + طقم كاميرا. بدقة 4K.",
        },
      },
      {
        id: "director_day",
        name: { en: "Director — full day", ar: "مخرج — يوم كامل" },
        price: 1500,
        unit: "each",
        desc: {
          en: "On-set creative direction for projects under AED 50K. Above AED 50K the director day rate is AED 3,500.",
          ar: "إخراج إبداعي على الموقع لمشاريع أقل من AED 50K. فوق AED 50K يكون سعر المخرج اليومي AED 3,500.",
        },
      },
      {
        id: "sound_op_day",
        name: { en: "Sound operator — full day", ar: "مشغل صوت — يوم كامل" },
        price: 1500,
        unit: "each",
        desc: {
          en: "On-set location sound recording — boom + wireless lavs + mixer + audio recordist.",
          ar: "تسجيل صوت موقع — بوم + لاف لاسلكية + ميكسر + فني صوت.",
        },
      },
      {
        id: "editing_short",
        name: { en: "Editing — short (60s social)", ar: "مونتاج — قصير (60 ثانية)" },
        price: 1800,
        unit: "each",
        desc: {
          en: "Edit of one short-form video up to 60 seconds. Includes 1 revision round.",
          ar: "مونتاج فيديو قصير حتى 60 ثانية. يشمل جولة مراجعة واحدة.",
        },
      },
      {
        id: "editing_longform",
        name: { en: "Editing — long-form (5 min)", ar: "مونتاج — طويل (5 دقائق)" },
        price: 5500,
        unit: "each",
        desc: {
          en: "Edit of a long-form video up to 5 minutes. Includes 1 revision round.",
          ar: "مونتاج فيديو طويل حتى 5 دقائق. يشمل جولة مراجعة واحدة.",
        },
      },
      {
        id: "color_grade_short",
        name: { en: "Color grading — short film", ar: "تصحيح ألوان — فيلم قصير" },
        price: 4500,
        unit: "each",
        desc: {
          en: "Cinematic color grading for a short film or campaign. Per-minute rate available for longer projects.",
          ar: "تصحيح ألوان سينمائي لفيلم قصير أو حملة. سعر الدقيقة متاح للمشاريع الأطول.",
        },
      },
      {
        id: "subtitles_ar",
        name: { en: "Arabic subtitles (per min)", ar: "ترجمة عربية (للدقيقة)" },
        price: 60,
        unit: "each",
        desc: {
          en: "Arabic subtitle creation per finished minute. English subtitles AED 40/minute.",
          ar: "إنشاء ترجمة عربية للدقيقة النهائية. ترجمة إنجليزية AED 40/دقيقة.",
        },
      },
    ],
  },
  {
    id: "podcast",
    name: { en: "Podcast Production", ar: "إنتاج البودكاست" },
    blurb: {
      en: "Audio-only = a finished episode with audio masters only (no video). Video = audio + 1-2 camera edit for YouTube. Studio rental added as a separate line item. We handle recording, editing, masters, show notes and 3 clips per episode.",
      ar: "صوت فقط = حلقة نهائية بماستر صوتي فقط (بدون فيديو). فيديو = صوت + مونتاج 1-2 كاميرا لليوتيوب. إيجار الاستوديو بند منفصل. نتولى التسجيل والمونتاج والماستر والملاحظات و3 مقاطع لكل حلقة.",
    },
    modular: true,
    modules: [
      {
        id: "podcast_episode_audio",
        name: { en: "Episode — audio only (per ep)", ar: "حلقة — صوت فقط (لكل حلقة)" },
        price: 1200,
        unit: "each",
        desc: {
          en: "Finished audio-only episode (MP3 + WAV masters, EN show notes, chapter markers, 3 vertical audio clips, 1-page analytics report within 7 days). 60-min episode. Studio rental extra.",
          ar: "حلقة نهائية صوتية فقط (ماستر MP3 + WAV، ملاحظات إنجليزية، فصول، 3 مقاطع صوتية عمودية، تقرير تحليلات صفحة واحدة خلال 7 أيام). حلقة 60 دقيقة. إيجار الاستوديو إضافي.",
        },
      },
      {
        id: "podcast_episode_video",
        name: { en: "Episode — video podcast (per ep)", ar: "حلقة — بودكاست فيديو (لكل حلقة)" },
        price: 2200,
        unit: "each",
        desc: {
          en: "Finished episode with audio + 1-2 camera video edit (1080p, MP4). Includes 3 vertical video clips + 3 audiograms.",
          ar: "حلقة نهائية مع مونتاج صوت + فيديو 1-2 كاميرا (1080p، MP4). يشمل 3 مقاطع فيديو عمودية + 3 audiograms.",
        },
      },
      {
        id: "podcast_season_audio",
        name: { en: "Season — 8 episodes, audio", ar: "موسم — 8 حلقات، صوت" },
        price: 8000,
        unit: "each",
        desc: {
          en: "Eight audio-only episodes bundled. AED 1,000/episode — locks in your season production schedule.",
          ar: "ثماني حلقات صوتية في باقة. AED 1,000/حلقة — يضمن جدول إنتاج الموسم.",
        },
      },
      {
        id: "podcast_season_video",
        name: { en: "Season — 8 episodes, video", ar: "موسم — 8 حلقات، فيديو" },
        price: 15000,
        unit: "each",
        desc: {
          en: "Eight video-podcast episodes bundled. AED 1,875/episode.",
          ar: "ثماني حلقات بودكاست فيديو في باقة. AED 1,875/حلقة.",
        },
      },
      {
        id: "podcast_studio_hour",
        name: { en: "Studio rental (per hour)", ar: "إيجار استوديو (للساعة)" },
        price: 250,
        unit: "each",
        desc: {
          en: "Hourly podcast studio — Shure SM7dB mics, Rodecaster interface, acoustically treated room, in Business Bay.",
          ar: "استوديو بودكاست بالساعة — ميكروفونات Shure SM7dB، واجهة Rodecaster، غرفة معالجة صوتياً، في Business Bay.",
        },
      },
    ],
  },
  {
    id: "brand_system_packages",
    name: { en: "Brand System Packages", ar: "باقات نظام العلامة" },
    blurb: {
      en: "Fixed, all-in tiers that bundle website, content and production into one partnership. Pick a tier — everything inside is included. Prices match UAE market medians for comparable bundles.",
      ar: "باقات ثابتة وشاملة تجمع الموقع والمحتوى والإنتاج في شراكة واحدة. اختر باقة — كل ما بداخلها مشمول. الأسعار مطابقة لمعدلات السوق الإماراتي للحزم المماثلة.",
    },
    modular: false,
    notes: [
      {
        en: "Addons like extra shoot days, extra videos, extra website pages and brochure packages are priced separately in the Solution Packages section.",
        ar: "الإضافات مثل أيام التصوير الإضافية والفيديوهات الإضافية وصفحات الموقع الإضافية وباقات البروشور تُسعَّر منفصلة في قسم باقات الحلول.",
      },
    ],
    modules: [
      {
        id: "pkg_starter",
        name: { en: "Starter — 5-page bilingual site", ar: "الأساسية — موقع من 5 صفحات ثنائي اللغة" },
        price: 7500,
        unit: "each",
        desc: {
          en: "A 5-page bilingual (EN+AR) website on a clean framework, responsive, basic on-page SEO, CMS handoff and contact form. 3-week turnaround. Templates-based, not custom-built.",
          ar: "موقع من 5 صفحات ثنائي اللغة (EN+AR) على إطار عمل نظيف، متجاوب، تحسين سيو أساسي، تسليم CMS ونموذج اتصال. 3 أسابيع للتسليم. قائم على القوالب، غير مبني مخصصاً.",
        },
      },
      {
        id: "pkg_growth",
        name: { en: "Growth — website + photoshoot + brand video + GMB", ar: "النمو — موقع + تصوير + فيديو العلامة + الملف التجاري" },
        price: 18000,
        unit: "each",
        desc: {
          en: "Up to 10-page custom bilingual website + 1-day on-site photoshoot (50-80 final images) + 1× brand video (60s) + Google Business Profile setup + on-page SEO. 5-week turnaround.",
          ar: "موقع مخصص حتى 10 صفحات ثنائي اللغة + تصوير ليوم واحد في الموقع (50-80 صورة نهائية) + فيديو علامة واحد (60 ثانية) + إعداد الملف التجاري على جوجل + تحسين السيو. 5 أسابيع للتسليم.",
        },
      },
      {
        id: "pkg_premium",
        name: { en: "Premium — full brand + website + shoots + GMB + SEO + content", ar: "المتميزة — علامة كاملة + موقع + تصوير + ملف تجاري + سيو + محتوى" },
        price: 42000,
        unit: "each",
        desc: {
          en: "Full brand identity + custom 10-15 page bilingual website + 2-day photoshoot (200+ images) + 3 brand videos (60s + 30s + 15s) + GMB + SEO + 30-day content calendar. 8-week turnaround.",
          ar: "هوية علامة كاملة + موقع مخصص 10-15 صفحة ثنائي اللغة + تصوير ليومين (200+ صورة) + 3 فيديوهات علامة (60 + 30 + 15 ثانية) + ملف تجاري + سيو + تقويم محتوى 30 يوماً. 8 أسابيع للتسليم.",
        },
      },
      {
        id: "pkg_enterprise",
        name: { en: "Enterprise — annual content partnership", ar: "المؤسسات — شراكة محتوى سنوية" },
        price: 180000,
        unit: "each",
        desc: {
          en: "An ongoing annual content partnership — quarterly content strategy + 1 dedicated shoot day per month + ongoing social/GMB + monthly analytics + dedicated producer. Scoped per client.",
          ar: "شراكة محتوى سنوية مستمرة — استراتيجية محتوى ربع سنوية + يوم تصوير مخصص شهرياً + إدارة مستمرة للسوشيال/الملف التجاري + تحليلات شهرية + منتج مخصص. يُحدَّد النطاق لكل عميل.",
        },
      },
    ],
  },
  {
    id: "content_creation",
    name: { en: "Content Creation", ar: "صناعة المحتوى" },
    blurb: {
      en: "Social-first video, photo and UGC produced individually or in packs. Mix items to build the monthly feed you need. Photographer/videographer cost included in these rates.",
      ar: "محتوى مرئي للسوشيال — فيديو وصور ومحتوى مستخدم — يُنتج فردياً أو على دفعات. امزج العناصر لبناء الخلاصة الشهرية التي تحتاجها. تكلفة المصور/مصور الفيديو مشمولة في هذه الأسعار.",
    },
    modular: true,
    modules: [
      {
        id: "ugc_short_form_video",
        name: { en: "UGC short-form video (30–60s)", ar: "فيديو UGC قصير (30–60 ثانية)" },
        price: 1800,
        unit: "each",
        desc: {
          en: "One 30–60 second vertical video (9:16) shot in a 2-hour session — edited with one caption — ideal for Reels, TikTok, Shorts and organic social posts. Delivered in 3–5 business days. For multiple videos, see the packs below.",
          ar: "فيديو عمودي واحد (9:16) مدته 30–60 ثانية يُصوَّر في جلسة مدتها ساعتان — مع مونتاج ونص واحد — مثالي للريلز وتيك توك والشورتس ومنشورات السوشيال. يُسلَّم خلال 3–5 أيام عمل. لمزيد من الفيديوهات، انظر الباقات أدناه.",
        },
      },
      {
        id: "ugc_short_form_video_3_pack",
        name: { en: "UGC video pack — 3 videos", ar: "باقة فيديو UGC — 3 فيديوهات" },
        price: 4500,
        unit: "each",
        desc: {
          en: "Three 30–60 second vertical videos in one batch — same session, consistent look, faster turnaround.",
          ar: "ثلاثة فيديوهات عمودية مدتها 30–60 ثانية في دفعة واحدة — نفس الجلسة، مظهر متسق، تسليم أسرع.",
        },
      },
      {
        id: "ugc_short_form_video_5_pack",
        name: { en: "UGC video pack — 5 videos", ar: "باقة فيديو UGC — 5 فيديوهات" },
        price: 7000,
        unit: "each",
        desc: {
          en: "Five 30–60 second vertical videos in one batch — the cost-effective way to fill a week of social.",
          ar: "خمسة فيديوهات عمودية مدتها 30–60 ثانية في دفعة واحدة — الطريقة الاقتصادية لملء أسبوع من السوشيال.",
        },
      },
      {
        id: "ugc_short_form_video_10_pack",
        name: { en: "UGC video pack — 10 videos", ar: "باقة فيديو UGC — 10 فيديوهات" },
        price: 12000,
        unit: "each",
        desc: {
          en: "Ten 30–60 second vertical videos in one batch — a month of social content at one efficient shoot.",
          ar: "عشرة فيديوهات عمودية مدتها 30–60 ثانية في دفعة واحدة — شهر من محتوى السوشيال في تصوير واحد فعّال.",
        },
      },
      {
        id: "real_style_lifestyle_video",
        name: { en: "Real-style lifestyle video", ar: "فيديو لايف ستايل بأسلوب حقيقي" },
        price: 2500,
        unit: "each",
        desc: {
          en: "A higher-end lifestyle-style video with cinema-grade framing, sound and edit — for the brand track of your feed.",
          ar: "فيديو بأسلوب حياة راقٍ بتأطير سينمائي وصوت ومونتاج عالي الجودة — لمسار العلامة في خلاصتك.",
        },
      },
      {
        id: "real_style_lifestyle_video_3_pack",
        name: { en: "Real-style lifestyle video — 3 pack", ar: "باقة فيديو لايف ستايل — 3 فيديوهات" },
        price: 6500,
        unit: "each",
        desc: {
          en: "Three real-style lifestyle videos in one batch — premium content at a lower per-video cost.",
          ar: "ثلاثة فيديوهات لايف ستايل في دفعة واحدة — محتوى متميز بتكلفة أقل للفيديو.",
        },
      },
      {
        id: "social_photo_carousel_5",
        name: { en: "Social photo carousel — 5 images", ar: "كاروسيل صور سوشيال — 5 صور" },
        price: 1200,
        unit: "each",
        desc: {
          en: "A designed 5-image carousel built to stop the scroll and carry a message — sized for Instagram and LinkedIn.",
          ar: "كاروسيل من 5 صور مصمم لإيقاف التمرير وحمل رسالة — بمقاسات إنستغرام ولينكدإن.",
        },
      },
      {
        id: "social_photo_carousel_10",
        name: { en: "Social photo carousel — 10 images", ar: "كاروسيل صور سوشيال — 10 صور" },
        price: 2000,
        unit: "each",
        desc: {
          en: "A designed 10-image carousel — for longer narratives, launches or product walk-throughs.",
          ar: "كاروسيل من 10 صور — لسرد أطول أو إطلاق أو عرض منتج.",
        },
      },
      {
        id: "behind_the_scenes_session",
        name: { en: "Behind-the-scenes session", ar: "جلسة خلف الكواليس" },
        price: 1500,
        unit: "each",
        desc: {
          en: "A BTS session captured alongside your main shoot — authentic supporting content for the feed.",
          ar: "جلسة خلف الكواليس تُلتقط بجانب تصويرك الرئيسي — محتوى داعم أصيل للخلاصة.",
        },
      },
      {
        id: "interview_talking_head",
        name: { en: "Interview / talking-head clip", ar: "مقطع مقابلة / talking head" },
        price: 800,
        unit: "each",
        desc: {
          en: "A single interview or talking-head clip, edited and captioned — for thought-leadership and founder stories.",
          ar: "مقطع مقابلة أو talking head واحد، مع مونتاج ونص — للقيادة الفكرية وقصص المؤسسين.",
        },
      },
      {
        id: "monthly_content_bundle_15",
        name: { en: "Monthly content bundle — 15 assets", ar: "باقة محتوى شهرية — 15 أصل" },
        price: 6500,
        unit: "month",
        desc: {
          en: "A bundled month of content — fifteen mixed assets (videos + carousels + photos + captions) produced in one efficient shoot cycle.",
          ar: "شهر كامل من المحتوى — خمسة عشر أصلاً متنوعاً (فيديو + كاروسيل + صور + نصوص) في دورة تصوير واحدة فعّالة.",
        },
      },
    ],
  },
  {
    id: "analytics_cro",
    name: { en: "Analytics & CRO", ar: "التحليلات وتحسين التحويل" },
    blurb: {
      en: "Measure what your site and content actually do, then improve it. Set-ups are one-off; retainers and heatmaps are monthly. CRO analyst + AI tooling delivers the work — no human 'SEO specialist' or 'CRO specialist' is retained.",
      ar: "قِس ما يفعله موقعك ومحتواك فعلاً، ثم حسّنه. الإعدادات لمرة واحدة؛ الاشتراكات وخرائط الحرارة شهرية. محلل CRO + أدوات ذكاء اصطناعي تنفذ العمل — لا نُحتفظ بأخصائي سيو أو CRO بشري.",
    },
    modular: true,
    modules: [
      {
        id: "hotjar_clarity_setup",
        name: { en: "Hotjar / Clarity set-up", ar: "إعداد Hotjar / Clarity" },
        price: 800,
        unit: "each",
        desc: {
          en: "Installation and configuration of Hotjar or Microsoft Clarity for session recording and behaviour insight.",
          ar: "تركيب وتهيئة Hotjar أو Microsoft Clarity لتسجيل الجلسات وفهم سلوك المستخدم.",
        },
      },
      {
        id: "heatmap_monthly",
        name: { en: "Heatmaps — monthly", ar: "خرائط الحرارة — شهري" },
        price: 500,
        unit: "month",
        desc: {
          en: "Hotjar/Clarity subscription + 4h analyst review/month: scroll-depth, click maps, friction-point write-up (1-page PDF), suggestions email. AI-assisted analysis.",
          ar: "اشتراك Hotjar/Clarity + 4 ساعات مراجعة من المحلل/شهرياً: خرائط التمرير والنقر، وثيقة نقاط الاحتكاك (PDF صفحة واحدة)، بريد اقتراحات. تحليل بمساعدة الذكاء الاصطناعي.",
        },
      },
      {
        id: "ab_test",
        name: { en: "A/B test", ar: "اختبار A/B" },
        price: 1000,
        unit: "test",
        desc: {
          en: "Design, build and analysis of a single A/B test to prove which version converts better.",
          ar: "تصميم وبناء وتحليل اختبار A/B واحد لإثبات النسخة الأفضل في التحويل.",
        },
      },
      {
        id: "conversion_tracking_setup",
        name: { en: "Conversion tracking set-up", ar: "إعداد تتبع التحويلات" },
        price: 800,
        unit: "each",
        desc: {
          en: "Set-up of goal and conversion tracking so every enquiry, call and sale is measured.",
          ar: "إعداد تتبع الأهداف والتحويلات ليُقاس كل استفسار ومكالمة وعملية بيع.",
        },
      },
      {
        id: "form_analytics_setup",
        name: { en: "Form analytics set-up", ar: "إعداد تحليلات النماذج" },
        price: 700,
        unit: "each",
        desc: {
          en: "Field-level form analytics to find where users abandon your forms — and fix it.",
          ar: "تحليلات نماذج على مستوى الحقول لمعرفة أين يتخلى المستخدمون عن النماذج — وإصلاحها.",
        },
      },
      {
        id: "cro_audit",
        name: { en: "CRO audit (full site)", ar: "تدقيق تحسين التحويل (الموقع كامل)" },
        price: 2500,
        unit: "each",
        desc: {
          en: "A full-site conversion audit with a prioritised list of changes to lift enquiries and sales.",
          ar: "تدقيق تحويل لكامل الموقع مع قائمة تغييرات مرتبة حسب الأولوية لزيادة الاستفسارات والمبيعات.",
        },
      },
      {
        id: "cro_retainer",
        name: { en: "CRO monthly retainer", ar: "اشتراك تحسين التحويل الشهري" },
        price: 2000,
        unit: "month",
        desc: {
          en: "16h analyst review per month: 1 A/B test, conversion review across key pages, monthly experiment report, suggestions email. AI tooling + analyst.",
          ar: "16 ساعة مراجعة من المحلّل شهرياً: اختبار A/B واحد، مراجعة تحويل للصفحات الرئيسية، تقرير تجارب شهري، بريد اقتراحات. أدوات ذكاء اصطناعي + محلّل.",
        },
      },
    ],
  },
  {
    id: "copywriter",
    name: { en: "Copywriting & Content", ar: "كتابة المحتوى" },
    blurb: {
      en: "Words that sell — in English and Arabic. AI-assisted drafting, human-reviewed. Pages, blog posts and captions priced individually so you only pay for what you need.",
      ar: "كلمات تبيع — بالإنجليزية والعربية. صياغة بمساعدة الذكاء الاصطناعي، مراجعة بشرية. صفحات ومقالات ونصوص بسعر فردي لتدفع فقط مقابل ما تحتاجه.",
    },
    modular: true,
    modules: [
      {
        id: "copy_en_page",
        name: { en: "English copywriting", ar: "كتابة إنجليزية" },
        price: 350,
        unit: "page",
        desc: {
          en: "Professional English web or marketing copy, priced per page.",
          ar: "كتابة إنجليزية احترافية للويب أو التسويق، بسعر للصفحة.",
        },
      },
      {
        id: "copy_ar_page",
        name: { en: "Arabic copywriting", ar: "كتابة عربية" },
        price: 450,
        unit: "page",
        desc: {
          en: "Native Arabic web or marketing copy — written, not translated — priced per page.",
          ar: "كتابة عربية أصلية للويب أو التسويق — مكتوبة لا مترجمة — بسعر للصفحة.",
        },
      },
      {
        id: "bilingual_web_5",
        name: { en: "Bilingual website — 5 pages", ar: "موقع ثنائي اللغة — 5 صفحات" },
        price: 2500,
        unit: "each",
        desc: {
          en: "Copy for a 5-page website in both English and Arabic.",
          ar: "محتوى موقع من 5 صفحات بالإنجليزية والعربية.",
        },
      },
      {
        id: "bilingual_web_10",
        name: { en: "Bilingual website — 10 pages", ar: "موقع ثنائي اللغة — 10 صفحات" },
        price: 4500,
        unit: "each",
        desc: {
          en: "Copy for a 10-page website in both English and Arabic.",
          ar: "محتوى موقع من 10 صفحات بالإنجليزية والعربية.",
        },
      },
      {
        id: "blog_en",
        name: { en: "Blog post — English", ar: "مقال مدونة — إنجليزي" },
        price: 350,
        unit: "each",
        desc: {
          en: "An AI-assisted, SEO-aware English blog article — fast turnaround at a lower cost. ~800-1,200 words.",
          ar: "مقال مدونة إنجليزي بمساعدة الذكاء الاصطناعي ومهيأ لمحركات البحث — تسليم سريع بتكلفة أقل. 800-1,200 كلمة.",
        },
      },
      {
        id: "blog_ar",
        name: { en: "Blog post — Arabic", ar: "مقال مدونة — عربي" },
        price: 500,
        unit: "each",
        desc: {
          en: "An AI-assisted, SEO-aware native Arabic blog article — fast turnaround at a lower cost.",
          ar: "مقال مدونة عربي أصلي بمساعدة الذكاء الاصطناعي ومهيأ لمحركات البحث — تسليم سريع بتكلفة أقل.",
        },
      },
      {
        id: "blog_en_4_pack_monthly",
        name: { en: "Blog 4-pack — English (monthly)", ar: "باقة 4 مقالات — إنجليزي (شهرياً)" },
        price: 1200,
        unit: "month",
        desc: {
          en: "Four AI-assisted English blog posts a month — steady content for SEO at one efficient rate.",
          ar: "أربعة مقالات مدونة إنجليزية بمساعدة الذكاء الاصطناعي شهرياً — محتوى متواصل لتحسين محركات البحث بسعر واحد فعّال.",
        },
      },
      {
        id: "blog_ar_4_pack_monthly",
        name: { en: "Blog 4-pack — Arabic (monthly)", ar: "باقة 4 مقالات — عربي (شهرياً)" },
        price: 1700,
        unit: "month",
        desc: {
          en: "Four AI-assisted native Arabic blog posts a month — steady Arabic content for SEO at one efficient rate.",
          ar: "أربعة مقالات مدونة عربية أصلية بمساعدة الذكاء الاصطناعي شهرياً — محتوى عربي متواصل لتحسين محركات البحث بسعر واحد فعّال.",
        },
      },
      {
        id: "caption_en",
        name: { en: "Social caption — English", ar: "نص سوشيال — إنجليزي" },
        price: 100,
        unit: "each",
        desc: {
          en: "A single on-brand English social caption.",
          ar: "نص سوشيال إنجليزي واحد متوافق مع العلامة.",
        },
      },
      {
        id: "caption_ar",
        name: { en: "Social caption — Arabic", ar: "نص سوشيال — عربي" },
        price: 150,
        unit: "each",
        desc: {
          en: "A single on-brand Arabic social caption.",
          ar: "نص سوشيال عربي واحد متوافق مع العلامة.",
        },
      },
      {
        id: "caption_pack_30",
        name: { en: "Caption pack — 30", ar: "باقة نصوص — 30 نص" },
        price: 1500,
        unit: "each",
        desc: {
          en: "A bundle of 30 social captions (EN + AR mix) — a month of ready-to-schedule copy.",
          ar: "باقة من 30 نص سوشيال (خليط إنجليزي وعربي) — شهر من النصوص الجاهزة للجدولة.",
        },
      },
      {
        id: "translation_en_ar",
        name: { en: "Translation — EN to AR (per word)", ar: "ترجمة — من إنجليزي لعربي (لكل كلمة)" },
        price: 0.3,
        unit: "word",
        desc: {
          en: "English-to-Arabic translation, AED 0.30/word. Certified translation AED 150/page.",
          ar: "ترجمة من الإنجليزية للعربية، AED 0.30/للكلمة. الترجمة المعتمدة AED 150/للصفحة.",
        },
      },
      {
        id: "case_study_writeup",
        name: { en: "Case study write-up", ar: "كتابة دراسة حالة" },
        price: 2000,
        unit: "each",
        desc: {
          en: "A full case-study write-up — challenge, approach and results — for your website or sales deck.",
          ar: "كتابة دراسة حالة كاملة — التحدي والنهج والنتائج — لموقعك أو عرض مبيعاتك.",
        },
      },
    ],
  },
  {
    id: "google_tools_setup",
    name: { en: "Google Tools Set-up", ar: "إعداد أدوات جوجل" },
    blurb: {
      en: "Get your measurement, search and ads foundations set up properly. One-off set-ups, with optional monthly reporting. Tool subscriptions like GA4 and Search Console are free; we bill for setup and report hours only.",
      ar: "أسّس أدوات القياس والبحث والإعلانات بشكل صحيح. إعدادات لمرة واحدة، مع تقارير شهرية اختيارية. اشتراكات الأدوات مثل GA4 وSearch Console مجانية؛ نفوتر فقط إعداد وساعات التقرير.",
    },
    modular: true,
    modules: [
      {
        id: "ga4_setup",
        name: { en: "Google Analytics 4 set-up", ar: "إعداد Google Analytics 4" },
        price: 500,
        unit: "each",
        desc: {
          en: "Full GA4 property set-up with events and conversions configured for your site.",
          ar: "إعداد كامل لخاصية GA4 مع تهيئة الأحداث والتحويلات لموقعك.",
        },
      },
      {
        id: "gsc_setup",
        name: { en: "Search Console set-up", ar: "إعداد Search Console" },
        price: 300,
        unit: "each",
        desc: {
          en: "Google Search Console verification, sitemap submission and initial configuration.",
          ar: "توثيق Google Search Console وإرسال خريطة الموقع والتهيئة الأولية.",
        },
      },
      {
        id: "gbp_setup",
        name: { en: "Business Profile set-up", ar: "إعداد الملف التجاري" },
        price: 600,
        unit: "each",
        desc: {
          en: "Google Business Profile creation and optimisation for local search and Maps.",
          ar: "إنشاء وتحسين الملف التجاري على جوجل للبحث المحلي والخرائط.",
        },
      },
      {
        id: "gtm_setup",
        name: { en: "Tag Manager set-up", ar: "إعداد Tag Manager" },
        price: 800,
        unit: "each",
        desc: {
          en: "Google Tag Manager container set-up with your core tags and triggers.",
          ar: "إعداد حاوية Google Tag Manager مع الوسوم والمشغّلات الأساسية.",
        },
      },
      {
        id: "gads_setup",
        name: { en: "Google Ads account set-up", ar: "إعداد حساب Google Ads" },
        price: 1200,
        unit: "each",
        desc: {
          en: "Google Ads account structure, conversion tracking and a first campaign scaffold.",
          ar: "هيكلة حساب Google Ads وتتبع التحويلات وهيكل حملة أولى.",
        },
      },
      {
        id: "ga4_report_monthly",
        name: { en: "Analytics monthly report", ar: "تقرير التحليلات الشهري" },
        price: 800,
        unit: "month",
        desc: {
          en: "A monthly analytics report with plain-language insight and recommendations.",
          ar: "تقرير تحليلات شهري برؤى بلغة واضحة وتوصيات.",
        },
      },
      {
        id: "gsc_report_monthly",
        name: { en: "Search Console monthly report", ar: "تقرير Search Console الشهري" },
        price: 500,
        unit: "month",
        desc: {
          en: "A monthly search-performance report — rankings, clicks and opportunities.",
          ar: "تقرير أداء بحث شهري — التصنيفات والنقرات والفرص.",
        },
      },
    ],
  },
  {
    id: "gmb_solutions",
    name: { en: "Google Business Profile Solutions", ar: "باقات ملف جوجل التجاري" },
    blurb: {
      en: "Done-for-you Google Business Profile setup, photography, videos and posting — in three tiers so you can pick the depth of help you need. Add the monthly retainer to keep posting, photos and reviews current after setup.",
      ar: "حلول جاهزة للملف التجاري على جوجل — إعداد وتصوير وفيديو ومنشورات — في ثلاث باقات تختار حسب عمق المساعدة التي تحتاجها. أضف الاشتراك الشهري للحفاظ على المنشورات والصور والمراجعات محدّثة بعد الإعداد.",
    },
    modular: false,
    notes: [
      {
        en: "GMB works best when paired with website photography. We shoot on-site at your location (Dubai / Abu Dhabi). Setup in 5–10 business days, ongoing monthly support afterwards. The monthly retainer delivers: 8 posts/month, monthly photo refresh, review response within 24h, weekly Q&A seeding, monthly analytics report.",
        ar: "يعمل الملف التجاري بأفضل شكل عند إقرانه بتصوير احترافي للموقع. نُصوّر في موقعك (دبي / أبوظبي). الإعداد خلال 5–10 أيام عمل، مع دعم شهري مستمر. الاشتراك الشهري يقدّم: 8 منشورات/شهرياً، تحديث صور شهري، رد على المراجعات خلال 24 ساعة، زرع أسئلة وأجوبة أسبوعياً، تقرير تحليلات شهري.",
      },
    ],
    modules: [
      {
        id: "gmb_starter",
        name: { en: "Starter — GMB setup + photos", ar: "الأساسية — إعداد الملف + الصور" },
        price: 3500,
        unit: "each",
        desc: {
          en: "Profile setup and verification, profile + cover photo shoot, logo + branding alignment, 15 photos of your interior / exterior, categories + services + attributes, Q&A seeded with 5 common questions, and your first 5 posts with captions.",
          ar: "إعداد وتوثيق الملف، تصوير صورة الملف وصورة الغلاف، محاذاة الشعار والهوية، 15 صورة للموقع الداخلي/الخارجي، فئات وخدمات وخصائص، أسئلة وأجوبة مزروعة بـ5 أسئلة شائعة، وأول 5 منشورات مع نصوص.",
        },
      },
      {
        id: "gmb_growth",
        name: { en: "Growth — Starter + video + virtual tour", ar: "النمو — الأساسية + فيديو + جولة افتراضية" },
        price: 8500,
        unit: "each",
        desc: {
          en: "Everything in Starter, plus 30 photos, 2 short videos (30–60s) for GMB posts, a 10–15 photo virtual tour, 15 posts over 60 days, review response strategy + templates, a 4-hour on-site photo shoot and a 2-hour on-site video shoot.",
          ar: "كل ما في الأساسية، إضافة إلى 30 صورة، وفيديوهان قصيران (30–60 ثانية) لمنشورات الملف، وجولة افتراضية من 10–15 صورة، و15 منشوراً على مدى 60 يوماً، واستراتيجية ونماذج للرد على المراجعات، وتصوير في موقعك لمدة 4 ساعات وفيديو لمدة ساعتين.",
        },
      },
      {
        id: "gmb_premium",
        name: { en: "Premium — Growth + TVC hero + monthly content", ar: "المتميزة — النمو + فيديو إعلاني + محتوى شهري" },
        price: 18000,
        unit: "each",
        desc: {
          en: "Everything in Growth, plus a 15-second TVC-grade hero video for paid promotion, 8 monthly UGC/social posts, 6 monthly videos (mix of talking-head + lifestyle), a monthly analytics report, ongoing review management, a full-day on-site photo + video shoot, and a quarterly content strategy call.",
          ar: "كل ما في النمو، إضافة إلى فيديو إعلاني 15 ثانية بجودة تلفزيونية للمدفوع، و8 منشورات UGC/سوشيال شهرياً، و6 فيديوهات شهرياً (مزيج talking head + لايف ستايل)، وتقرير تحليلات شهري، وإدارة مستمرة للمراجعات، ويوم تصوير كامل في موقعك، ومكالمة استراتيجية محتوى ربع سنوية.",
        },
      },
      {
        id: "gmb_monthly_retainer",
        name: { en: "GMB monthly retainer (post-setup)", ar: "اشتراك الملف التجاري الشهري (بعد الإعداد)" },
        price: 1500,
        unit: "month",
        desc: {
          en: "8 GMB posts/month with captions, monthly photo refresh, review response within 24h, weekly Q&A seeding, monthly analytics report. AI-assisted drafting + human review.",
          ar: "8 منشورات/شهرياً مع نصوص، تحديث صور شهري، رد على المراجعات خلال 24 ساعة، زرع أسئلة وأجوبة أسبوعياً، تقرير تحليلات شهري. صياغة بمساعدة الذكاء الاصطناعي + مراجعة بشرية.",
        },
      },
    ],
  },
  {
    id: "social_media_management",
    name: { en: "Social Media Management", ar: "إدارة وسائل التواصل" },
    blurb: {
      en: "Monthly social media management — scheduling, community engagement, monthly analytics. Content creation (videos, photos, graphics) is billed separately as the content creation packages. AI-assisted drafting, human-approved.",
      ar: "إدارة وسائل تواصل اجتماعي شهرية — جدولة، تفاعل مجتمعي، تحليلات شهرية. إنشاء المحتوى (فيديوهات، صور، تصاميم) يُفوتر منفصلاً كجزء من باقات صناعة المحتوى. صياغة بمساعدة الذكاء الاصطناعي، موافقة بشرية.",
    },
    modular: true,
    modules: [
      {
        id: "social_starter",
        name: { en: "Management starter — 12 posts/mo", ar: "إدارة أساسية — 12 منشور شهرياً" },
        price: 2500,
        unit: "month",
        desc: {
          en: "12 posts/month across 3 platforms, captions, hashtag research, monthly analytics report. Content creation billed separately.",
          ar: "12 منشور شهرياً عبر 3 منصات، نصوص، بحث عن الهاشتاج، تقرير تحليلات شهري. إنشاء المحتوى يُفوتر منفصلاً.",
        },
      },
      {
        id: "social_growth",
        name: { en: "Management growth — 20 posts/mo", ar: "إدارة نمو — 20 منشور شهرياً" },
        price: 4500,
        unit: "month",
        desc: {
          en: "20 posts/month across 4 platforms, 4 short videos, community management (comments within 24h), competitor tracking, bi-weekly analytics.",
          ar: "20 منشور شهرياً عبر 4 منصات، 4 فيديوهات قصيرة، إدارة مجتمعية (تعليقات خلال 24 ساعة)، تتبع المنافسين، تحليلات نصف شهرية.",
        },
      },
      {
        id: "social_premium",
        name: { en: "Management premium — 30 posts/mo", ar: "إدارة متميزة — 30 منشور شهرياً" },
        price: 8000,
        unit: "month",
        desc: {
          en: "30 posts/month across 5 platforms, 10 short videos, community management, influencer outreach coordination, weekly analytics, monthly strategy call.",
          ar: "30 منشور شهرياً عبر 5 منصات، 10 فيديوهات قصيرة، إدارة مجتمعية، تنسيق مع المؤثرين، تحليلات أسبوعية، مكالمة استراتيجية شهرية.",
        },
      },
    ],
  },
  {
    id: "seo_retainer",
    name: { en: "SEO Monthly Retainer (AI-led)", ar: "اشتراك SEO شهري (بقيادة الذكاء الاصطناعي)" },
    blurb: {
      en: "AI-led SEO — we use AI tooling + 4-12 hours/month of analyst review to drive rankings. We do NOT retain a human 'SEO specialist' as a pass-through. Content production is billed separately as blog posts. Pricing reflects this AI advantage.",
      ar: "سيو بقيادة الذكاء الاصطناعي — نستخدم أدوات الذكاء الاصطناعي + 4-12 ساعة/شهرياً من مراجعة المحلّل لتحسين التصنيفات. لا نُحتفظ بأخصائي سيو بشري كطرف ثالث. إنتاج المحتوى يُفوتر منفصلاً كمقالات مدونة. الأسعار تعكس هذه الميزة للذكاء الاصطناعي.",
    },
    modular: true,
    modules: [
      {
        id: "ai_seo_starter",
        name: { en: "AI SEO starter", ar: "سيو AI الأساسي" },
        price: 500,
        unit: "month",
        desc: {
          en: "AI SEO tool subscriptions + 4h analyst review/month: ranking report (top 10 keywords), 1-page opportunity doc, search-console insights, 30-min review call. Content production not included.",
          ar: "اشتراكات أدوات سيو AI + 4 ساعات مراجعة محلّل/شهرياً: تقرير التصنيفات (أعلى 10 كلمات)، وثيقة فرص صفحة واحدة، رؤى Search Console، مكالمة مراجعة 30 دقيقة. إنتاج المحتوى غير مشمول.",
        },
      },
      {
        id: "ai_seo_growth",
        name: { en: "AI SEO growth", ar: "سيو AI نمو" },
        price: 1000,
        unit: "month",
        desc: {
          en: "AI SEO tool subscriptions + 8h analyst review/month: ranking report, competitor gap analysis, on-page audit (5 pages/month), 2-page opportunity doc, monthly strategy call.",
          ar: "اشتراكات أدوات سيو AI + 8 ساعات مراجعة محلّل/شهرياً: تقرير التصنيفات، تحليل فجوات المنافسين، تدقيق على الصفحة (5 صفحات/شهر)، وثيقة فرص صفحتين، مكالمة استراتيجية شهرية.",
        },
      },
      {
        id: "ai_seo_premium",
        name: { en: "AI SEO premium (with 4 blog posts)", ar: "سيو AI متميز (مع 4 مقالات)" },
        price: 1500,
        unit: "month",
        desc: {
          en: "AI SEO tooling + 12h analyst review + 4 AI-assisted blog posts/month: ranking report, on-page audit (10 pages/month), 3-page priority doc, schema/technical fixes, bi-weekly calls.",
          ar: "أدوات سيو AI + 12 ساعة مراجعة محلّل + 4 مقالات بمساعدة AI/شهرياً: تقرير التصنيفات، تدقيق 10 صفحات/شهر، وثيقة أولويات 3 صفحات، إصلاحات schema/تقنية، مكالمات نصف شهرية.",
        },
      },
    ],
  },
  {
    id: "solution_packages",
    name: { en: "Solution Packages", ar: "باقات الحلول" },
    blurb: {
      en: "Three fixed-scope solutions for the most common moments — refreshing an established brand, launching a new product, or starting a brand from scratch. Each is a starting price; we scope to your brief.",
      ar: "ثلاث باقات بنطاق ثابت لأهم اللحظات — تجديد علامة قائمة، إطلاق منتج جديد، أو بناء علامة من الصفر. كل باقة سعر بداية؛ نُحدّد النطاق حسب موجزك.",
    },
    modular: false,
    modules: [
      {
        id: "pkg_company_revamp",
        name: { en: "Company Media Revamp", ar: "تجديد الصورة الإعلامية للشركة" },
        price: 18000,
        unit: "from",
        desc: {
          en: "For established companies (3+ years) whose existing website, photos and videos no longer reflect the brand. 4 weeks from kickoff. Includes brand audit + competitive review, new visual identity direction, full photoshoot (1–2 days, 100–150 final images), 1 hero brand film (60–90s), 5 short social videos, website refresh (5–7 key pages), updated GMB profile (photos + posts) and a brand guidelines document (lite). Add-ons: extra shoot day AED 3,500 · extra video AED 3,000 · brochure combined AED 1,500 · extra website page AED 500. Example: real estate companies upgrading listings; medical practices refreshing patient-facing brand.",
          ar: "للشركات القائمة (+3 سنوات) التي لم يعد موقعها وصورها وفيديوهاتها يعكس علامتها. 4 أسابيع من الانطلاق. يشمل تدقيق العلامة ومراجعة المنافسين، واتجاه هوية بصرية جديد، وتصوير كامل (1–2 يوم، 100–150 صورة نهائية)، وفيلم علامة رئيسي واحد (60–90 ثانية)، و5 فيديوهات سوشيال قصيرة، وتجديد الموقع (5–7 صفحات رئيسية)، وتحديث الملف التجاري (صور + منشورات)، ووثيقة إرشادات العلامة (مبسطة). الإضافات: يوم تصوير إضافي 3,500 درهم · فيديو إضافي 3,000 درهم · بروشور طباعة+رقمي 1,500 درهم · صفحة موقع إضافية 500 درهم. أمثلة: شركات عقارية تحدّث قوائمها؛ عيادات طبية تجدد علامتها أمام المرضى.",
        },
      },
      {
        id: "pkg_product_launch",
        name: { en: "New Product Launch", ar: "إطلاق منتج جديد" },
        price: 12000,
        unit: "from",
        desc: {
          en: "For companies launching a specific new product or service that needs its own dedicated campaign. 3 weeks from kickoff. Includes product photoshoot (40–80 final images, hero + lifestyle), 1 TVC-grade hero video (30–60s), 3 social cut variations (15–30s each), a landing or product page on your website, 5 social posts with EN + AR captions, an email announcement template and 3 paid-ad creative variations. Add-ons: extra SKU AED 2,500 · Arabic voiceover AED 1,500 · influencer UGC coordination AED 3,500. Example: F&B menu item launch; SaaS feature announcement; automotive new model; real estate new development.",
          ar: "للشركات التي تُطلق منتجاً أو خدمة محددة تحتاج حملتها الخاصة. 3 أسابيع من الانطلاق. يشمل تصوير المنتج (40–80 صورة نهائية، رئيسية ولايف ستايل)، وفيديو إعلاني رئيسي واحد (30–60 ثانية)، و3 نسخ سوشيال (15–30 ثانية لكل منها)، وصفحة هبوط أو منتج على موقعك، و5 منشورات سوشيال بنصوص EN + AR، وقالب إعلان بريدي، و3 نسخ إبداعية للمدفوع. الإضافات: SKU إضافي 2,500 درهم · تعليق عربي 1,500 درهم · تنسيق UGC مع مؤثرين 3,500 درهم. أمثلة: إطلاق عنصر قائمة في مطعم؛ إعلان ميزة في SaaS؛ طراز سيارات جديد؛ تطوير عقاري جديد.",
        },
      },
      {
        id: "pkg_new_company",
        name: { en: "New Company Launch", ar: "إطلاق شركة جديدة" },
        price: 22000,
        unit: "from",
        desc: {
          en: "For new companies (0–12 months old) that need everything from scratch. 6 weeks from kickoff. Includes brand foundation (logo + identity + guidelines), a 5-page bilingual website (EN/AR), GMB profile setup with 50 photos and 2 videos, 2 brand videos (60s + 30s), 100+ product/service photos, 1 hero photo session for the website, brochure (digital), a 30-day launch content calendar and social profile setup with first 10 posts. Add-ons: extra brand videos AED 4,000 · podcast launch (3 episodes) AED 4,500 · first month content management AED 3,500. Example: restaurant grand opening; new consultancy launch; new retail brand launch; new service business launch.",
          ar: "للشركات الجديدة (0–12 شهراً) التي تحتاج كل شيء من الصفر. 6 أسابيع من الانطلاق. يشمل أساس العلامة (شعار + هوية + إرشادات)، وموقع ثنائي اللغة من 5 صفحات (EN/AR)، وإعداد الملف التجاري مع 50 صورة وفيديوهان، وفيديوهان تعريفيان (60 ثانية + 30 ثانية)، و+100 صورة منتج/خدمة، وجلسة تصوير رئيسية واحدة للموقع، وبروشور (رقمي)، و30 يوماً من تقويم محتوى الإطلاق، وإعداد حسابات السوشيال مع أول 10 منشورات. الإضافات: فيديوهات علامة إضافية 4,000 درهم · إطلاق بودكاست (3 حلقات) 4,500 درهم · إدارة محتوى الشهر الأول 3,500 درهم. أمثلة: افتتاح مطعم؛ إطلاق شركة استشارية جديدة؛ إطلاق علامة تجزئة جديدة؛ إطلاق شركة خدمات جديدة.",
        },
      },
    ],
  },
];

/* ---- Page copy ---- */
export const pricingCopy = {
  meta: {
    title: {
      en: "Pricing & Rate Card | Big Story Dubai",
      ar: "الأسعار وقائمة الأجور | بيك ستوري دبي",
    },
    description: {
      en: "Transparent AED pricing for film & video production, RED camera rental, content, copywriting, Google Business Profile solutions, analytics and Google set-up. Browse every service and build your own quote.",
      ar: "أسعار شفافة بالدرهم لإنتاج الأفلام والفيديو وتأجير كاميرات RED والمحتوى وكتابة المحتوى وحلول ملف جوجل التجاري والتحليلات وإعداد أدوات جوجل. تصفّح كل الخدمات وابنِ عرض سعرك.",
    },
  },
  eyebrow: { en: "Pricing", ar: "الأسعار" },
  h1: { en: "Pricing, in the open.", ar: "الأسعار، بشفافية." },
  lead: {
    en: "Real starting rates for everything we do — in AED. Most services are modular: pick only what you need, add items to your quote, and send it to us in one click. Photographers and videographers are freelancers — their day rate is included in your quote.",
    ar: "أسعار بداية حقيقية لكل ما نقدمه — بالدرهم. معظم الخدمات معيارية: اختر ما تحتاجه فقط، أضِف العناصر إلى عرضك، وأرسله إلينا بنقرة واحدة. المصورون والمصورون الفيديويون مستقلون — سعرهم اليومي مشمول في عرضك.",
  },
  modularPill: { en: "Modular — mix & match", ar: "معياري — اختر وامزج" },
  bundledPill: { en: "Bundled tiers", ar: "باقات ثابتة" },
  currencyNote: {
    en: "All prices in AED and exclude 5% VAT. Starting (“from”) rates are scoped to your brief; the final quote is confirmed by us.",
    ar: "جميع الأسعار بالدرهم ولا تشمل ضريبة القيمة المضافة 5٪. أسعار البداية (“من”) تُحدَّد حسب موجزك؛ ويُؤكَّد السعر النهائي من قبلنا.",
  },
  tool: {
    add: { en: "Add", ar: "أضف" },
    added: { en: "Added", ar: "أُضيف" },
    remove: { en: "Remove", ar: "إزالة" },
    details: { en: "Details", ar: "التفاصيل" },
    close: { en: "Close", ar: "إغلاق" },
    yourQuote: { en: "Your quote", ar: "عرضك" },
    items: { en: "items", ar: "عنصر" },
    item: { en: "item", ar: "عنصر" },
    empty: {
      en: "No items yet. Add services to build a quote.",
      ar: "لا عناصر بعد. أضِف خدمات لبناء عرض.",
    },
    estSubtotal: { en: "Estimated subtotal", ar: "الإجمالي التقديري" },
    buildQuote: { en: "Build my quote", ar: "ابنِ عرضي" },
    copy: { en: "Copy summary", ar: "انسخ الملخص" },
    copied: { en: "Copied!", ar: "تم النسخ!" },
    emailQuote: { en: "Email this quote", ar: "أرسل هذا العرض" },
    clear: { en: "Clear", ar: "مسح" },
    qty: { en: "Qty", ar: "الكمية" },
    indicative: {
      en: "Indicative only — day rates, per-page and “from” items vary by scope. We confirm the real quote within one business day.",
      ar: "تقديري فقط — تختلف الأسعار اليومية وأسعار الصفحة وعناصر “من” حسب النطاق. نؤكد السعر الحقيقي خلال يوم عمل واحد.",
    },
    quoteHeading: { en: "Quote request — Big Story", ar: "طلب عرض سعر — بيك ستوري" },
    open: { en: "View quote", ar: "عرض العرض" },
  },
  freelancerNote: {
    en: "**Photographers and videographers are freelancers.** Their day rate is included in the rates shown on photography and videography modules. Props, additional equipment and actors are quoted as separate line items so you only pay for what you need.",
    ar: "**المصورون والمصورون الفيديويون مستقلون.** سعرهم اليومي مشمول في الأسعار المعروضة على وحدات التصوير الفوتوغرافي والفيديو. تُسعَّر الدعائم والمعدات الإضافية والممثلون كبنود مستقلة لتدفع فقط مقابل ما تحتاجه.",
  },
  aiSeoNote: {
    en: "**SEO is AI-led.** We use AI tooling + 4–12 hours per month of analyst review. We do **not** retain a human 'SEO specialist' as a pass-through — this is how our AED 500–1,500 monthly pricing is structured.",
    ar: "**السيو بقيادة الذكاء الاصطناعي.** نستخدم أدوات الذكاء الاصطناعي + 4–12 ساعة/شهرياً من مراجعة المحلّل. **لا** نُحتفظ بأخصائي سيو بشري كطرف ثالث — هذا هو هيكل تسعيرنا الشهري AED 500–1,500.",
  },
  faq: {
    eyebrow: { en: "Pricing questions", ar: "أسئلة عن الأسعار" },
    h2: { en: "Common pricing questions.", ar: "أسئلة شائعة عن الأسعار." },
    items: [
      {
        q: { en: "Are these prices fixed?", ar: "هل هذه الأسعار ثابتة؟" },
        a: {
          en: "The individual modules are our real rates. Items marked “from” are starting points — the final figure depends on script, cast, locations, shoot days and delivery. We confirm a firm quote once we understand your brief.",
          ar: "العناصر الفردية هي أسعارنا الحقيقية. العناصر المعلَّمة بـ“من” نقاط بداية — يعتمد الرقم النهائي على النص والممثلين والمواقع وأيام التصوير والتسليم. نؤكد عرضاً نهائياً بمجرد فهم موجزك.",
        },
      },
      {
        q: { en: "Is VAT included?", ar: "هل تشمل الأسعار ضريبة القيمة المضافة؟" },
        a: {
          en: "No. All prices are shown in AED and exclude the UAE's 5% VAT, which is added to the final invoice.",
          ar: "لا. تُعرض جميع الأسعار بالدرهم ولا تشمل ضريبة القيمة المضافة الإماراتية 5٪، التي تُضاف إلى الفاتورة النهائية.",
        },
      },
      {
        q: { en: "Do I have to buy a package?", ar: "هل يجب أن أشتري باقة؟" },
        a: {
          en: "No. Most of what we do is modular — you pick individual services and combine them freely. The Brand System Packages, Google Business Profile Solutions and Solution Packages are fixed bundled tiers — they exist because bundling website, content, profile setup and production together is better value.",
          ar: "لا. معظم ما نقدمه معياري — تختار خدمات فردية وتجمعها بحرية. باقات نظام العلامة، وحلول ملف جوجل التجاري، وباقات الحلول هي باقات ثابتة — وهي موجودة لأن جمع الموقع والمحتوى وإعداد الملف والإنتاج معاً يوفّر قيمة أفضل.",
        },
      },
      {
        q: { en: "Are photographers and videographers freelancers?", ar: "هل المصورون والمصورون الفيديويون مستقلون؟" },
        a: {
          en: "Yes. The rates in our photography and videography modules include the freelancer's day rate plus our production management. We don't bill one Big Story 'employee' — we coordinate the right specialist for your shoot.",
          ar: "نعم. الأسعار في وحدات التصوير الفوتوغرافي والفيديو تشمل السعر اليومي للمستقل بالإضافة إلى إدارة الإنتاج لدينا. لا نفوتر 'موظف بيك ستوري' واحد — ننسق المتخصص المناسب لتصويرك.",
        },
      },
      {
        q: { en: "What does 'SEO monthly retainer' actually include?", ar: "ماذا يشمل 'اشتراك السيو الشهري' فعلياً؟" },
        a: {
          en: "Our SEO retainers are AI-led. You get AI SEO tool subscriptions + 4, 8 or 12 hours of analyst review per month (depending on tier), plus ranking reports, search-console insights and on-page audits. Content production (blog posts) is billed separately. We do NOT retain a human 'SEO specialist' as a pass-through — that's why our pricing starts at AED 500/month rather than AED 8,000-15,000.",
          ar: "اشتراكات السيو لدينا بقيادة الذكاء الاصطناعي. تحصل على اشتراكات أدوات سيو AI + 4 أو 8 أو 12 ساعة مراجعة محلّل شهرياً (حسب الباقة)، بالإضافة إلى تقارير التصنيفات، رؤى Search Console، وتدقيق على الصفحة. إنتاج المحتوى (مقالات المدونة) يُفوتر منفصلاً. لا نُحتفظ بأخصائي سيو بشري كطرف ثالث — لهذا يبدأ تسعيرنا من AED 500/شهر بدلاً من AED 8,000-15,000.",
        },
      },
      {
        q: { en: "What's included in the GMB monthly retainer?", ar: "ماذا يشمل الاشتراك الشهري للملف التجاري؟" },
        a: {
          en: "8 GMB posts/month with captions, monthly photo refresh, review response within 24 hours, weekly Q&A seeding, monthly analytics report. AI-assisted drafting, human-reviewed. Suitable for businesses that already have the profile set up and want ongoing visibility.",
          ar: "8 منشورات للملف شهرياً مع نصوص، تحديث صور شهري، رد على المراجعات خلال 24 ساعة، زرع أسئلة وأجوبة أسبوعياً، تقرير تحليلات شهري. صياغة بمساعدة الذكاء الاصطناعي مع مراجعة بشرية. مناسب للشركات التي لديها ملف جاهز وتريد حضوراً مستمراً.",
        },
      },
      {
        q: { en: "How does the camera rental discount work?", ar: "كيف يعمل خصم تأجير الكاميرا؟" },
        a: {
          en: "RED KOMODO-X day rates drop 12% for 3 or more consecutive days, and 20% for long-term bookings of 10 days or more. Our own crew, including a 1st AC, can be added by the day.",
          ar: "تنخفض أسعار RED KOMODO-X اليومية بنسبة 12٪ لثلاثة أيام متتالية فأكثر، و20٪ للحجوزات طويلة الأمد من 10 أيام فأكثر. يمكن إضافة طاقمنا الخاص، بما في ذلك مساعد كاميرا أول، باليوم.",
        },
      },
      {
        q: { en: "How do I get a real quote?", ar: "كيف أحصل على عرض سعر حقيقي؟" },
        a: {
          en: "Use the tool on this page: add the services you're interested in, hit \"Build my quote\", and email us the summary — or message us on WhatsApp. We reply within one business day.",
          ar: "استخدم الأداة في هذه الصفحة: أضِف الخدمات التي تهمك، اضغط \"ابنِ عرضي\"، وأرسل لنا الملخص بالبريد — أو راسلنا على واتساب. نرد خلال يوم عمل واحد.",
        },
      },
      {
        q: { en: "Can prices flex to my budget?", ar: "هل يمكن أن تتكيف الأسعار مع ميزانيتي؟" },
        a: {
          en: "Often, yes. We'd rather find a way to work together than lose the project over budget, so tell us what you're working with and we'll shape the scope to fit.",
          ar: "غالباً نعم. نفضّل إيجاد طريقة للعمل معاً على خسارة المشروع بسبب الميزانية، لذا أخبِرنا بما لديك وسنشكّل النطاق ليناسبك.",
        },
      },
    ],
  },
  finalH2: { en: "Ready to price your project?", ar: "جاهز لتسعير مشروعك؟" },
};
