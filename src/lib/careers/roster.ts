import { CAREER_POSITIONS, type CareerPosition } from "./positions.ts";

// The roster grid, driven by CAREER_POSITIONS (the source of truth synced with the
// live Google Form). Every one of the 26 roles appears here exactly once, grouped
// into categories with a one-line EN + AR summary. Arabic titles carry the UAE tone.
export type RosterRole = {
  title: CareerPosition;
  ar: string;
  summary: string;
  summaryAr: string;
};

export type RosterCategory = {
  title: string;
  titleAr: string;
  roles: RosterRole[];
};

export const ROSTER: RosterCategory[] = [
  {
    title: "On-screen & voice",
    titleAr: "أمام الكاميرا والصوت",
    roles: [
      {
        title: "Actor / On-screen Talent",
        ar: "ممثل / موهبة أمام الكاميرا",
        summary: "On-camera talent for commercials, brand films and Emirati events across the UAE.",
        summaryAr: "مواهب أمام الكاميرا للإعلانات والأفلام التجارية والمناسبات الإماراتية عبر الإمارات.",
      },
      {
        title: "Voice-over Artist",
        ar: "فنان تعليق صوتي",
        summary: "Arabic and English voices for ads, corporate films and government-grade work.",
        summaryAr: "أصوات عربية وإنجليزية للإعلانات وأفلام الشركات والأعمال الحكومية.",
      },
    ],
  },
  {
    title: "Direction & production",
    titleAr: "الإخراج والإنتاج",
    roles: [
      {
        title: "Director",
        ar: "مخرج",
        summary: "Directors who shape story, performance and look on set.",
        summaryAr: "مخرجون يصوغون القصة والأداء والمظهر في موقع التصوير.",
      },
      {
        title: "Assistant Director (1st/2nd AD)",
        ar: "مساعد مخرج (مساعد أول/ثاني)",
        summary: "ADs who run the floor and keep a shoot day on schedule.",
        summaryAr: "مساعدو مخرج يديرون الموقع ويحافظون على جدول يوم التصوير.",
      },
      {
        title: "Producer",
        ar: "منتج",
        summary: "Producers who plan budgets, crew and logistics end to end.",
        summaryAr: "منتجون يخططون الميزانيات والطاقم واللوجستيات من البداية للنهاية.",
      },
      {
        title: "Production Manager",
        ar: "مدير إنتاج",
        summary: "Managers who handle scheduling, permits and paperwork across the UAE.",
        summaryAr: "مديرون يتولون الجدولة والتصاريح والأوراق عبر الإمارات.",
      },
      {
        title: "Production Assistant / Runner",
        ar: "مساعد إنتاج / عدّاء",
        summary: "Organised set support for call sheets, gear moves and client care.",
        summaryAr: "دعم منظم للموقع لجداول العمل ونقل المعدات وخدمة العميل.",
      },
      {
        title: "Location Manager / Scout",
        ar: "مدير مواقع / كشاف مواقع",
        summary: "Scouts who find and secure locations from Dubai to the Northern Emirates.",
        summaryAr: "كشافون يجدون المواقع ويؤمنونها من دبي إلى الإمارات الشمالية.",
      },
      {
        title: "Casting Director",
        ar: "مدير تجارب الأداء",
        summary: "Casting for on-screen talent that fits the brief and the region.",
        summaryAr: "اختيار مواهب أمام الكاميرا تناسب الإيجاز والمنطقة.",
      },
    ],
  },
  {
    title: "Camera & lighting",
    titleAr: "الكاميرا والإضاءة",
    roles: [
      {
        title: "DP / Cinematographer",
        ar: "مدير تصوير / سينماتوغرافر",
        summary: "Camera-led storytellers for commercials, brand films and premium productions.",
        summaryAr: "صنّاع صورة للإعلانات والأفلام التجارية والإنتاجات المميزة.",
      },
      {
        title: "Camera Operator",
        ar: "مشغل كاميرا",
        summary: "Operators steady on gimbal, tripod and handheld for any set.",
        summaryAr: "مشغلون بثبات على الجيمبال والحامل واليد لأي موقع.",
      },
      {
        title: "1st / 2nd AC (Focus Puller / Camera Assistant)",
        ar: "مساعد كاميرا أول/ثاني (ساحب فوكس)",
        summary: "Focus pullers and camera assistants for RED and Sony cinema packages.",
        summaryAr: "ساحبو فوكس ومساعدو كاميرا لكاميرات RED وSony السينمائية.",
      },
      {
        title: "Gaffer / Lighting Technician",
        ar: "كهربائي إنارة / فني إضاءة",
        summary: "Gaffers who light interiors, events and studio sets cleanly.",
        summaryAr: "فنيو إضاءة يضيئون الداخليات والمناسبات وأستوديوهات التصوير بإتقان.",
      },
      {
        title: "Grip",
        ar: "فني شِكلة / قبضة",
        summary: "Grips for rigging, dollies and safe camera support.",
        summaryAr: "فنيو قبضة للتركيب والدوللي ودعم الكاميرا الآمن.",
      },
      {
        title: "Drone Operator",
        ar: "مشغل درون مرخص",
        summary: "Licensed UAE operators for safe aerial coverage on approved productions.",
        summaryAr: "مشغلو درون مرخصون في الإمارات للتصوير الجوي الآمن في المشاريع المعتمدة.",
      },
      {
        title: "Photographer",
        ar: "مصور",
        summary: "Stills photographers for weddings, brands and editorial across the UAE.",
        summaryAr: "مصورون فوتوغرافيون للأعراس والعلامات والمحتوى التحريري عبر الإمارات.",
      },
    ],
  },
  {
    title: "Sound",
    titleAr: "الصوت",
    roles: [
      {
        title: "Sound Recordist",
        ar: "مسجل صوت",
        summary: "Location sound mixers for interviews, films and live events.",
        summaryAr: "مسجلو صوت الموقع للمقابلات والأفلام والمناسبات المباشرة.",
      },
      {
        title: "Boom Operator",
        ar: "مشغل البوم الصوتي",
        summary: "Boom operators who keep dialogue clean on set.",
        summaryAr: "مشغلو بوم يحافظون على نقاء الحوار في الموقع.",
      },
    ],
  },
  {
    title: "Art, styling & looks",
    titleAr: "الفن والتنسيق والمظهر",
    roles: [
      {
        title: "Art Department / Production Designer",
        ar: "قسم الفن / مصمم إنتاج",
        summary: "Designers who build the world a scene lives in.",
        summaryAr: "مصممون يبنون العالم الذي تعيش فيه المشاهد.",
      },
      {
        title: "Set Dresser / Props",
        ar: "منسق ديكور / إكسسوارات",
        summary: "Set dressers and props hands for detailed, believable sets.",
        summaryAr: "منسقو ديكور وإكسسوارات لمواقع مفصّلة ومقنعة.",
      },
      {
        title: "Stylist / Wardrobe",
        ar: "مصمم أزياء / خزانة ملابس",
        summary: "Stylists for wardrobe that suits talent, brand and culture.",
        summaryAr: "مصممو أزياء لخزانة ملابس تناسب الموهبة والعلامة والثقافة.",
      },
      {
        title: "Hair & Makeup (HMUA)",
        ar: "صانعة شعر ومكياج",
        summary: "Hair and makeup artists, including women-only Emirati weddings.",
        summaryAr: "فنانو شعر ومكياج، بما في ذلك الأعراس الإماراتية النسائية.",
      },
    ],
  },
  {
    title: "Post-production",
    titleAr: "ما بعد الإنتاج",
    roles: [
      {
        title: "Video Editor",
        ar: "مونتير فيديو",
        summary: "Story editors for cinematic, social and same-day delivery.",
        summaryAr: "مونتيرون للأفلام السينمائية والمحتوى الاجتماعي والتسليم في نفس اليوم.",
      },
      {
        title: "Colorist",
        ar: "مصحح ألوان",
        summary: "Colourists who grade for mood, skin tone and brand consistency.",
        summaryAr: "مصححو ألوان يعالجون المزاج ودرجات البشرة واتساق العلامة.",
      },
      {
        title: "Motion Graphics / VFX Artist",
        ar: "فنان موشن جرافيك / مؤثرات بصرية",
        summary: "Motion and VFX artists for titles, graphics and compositing.",
        summaryAr: "فنانو موشن ومؤثرات للعناوين والرسوم والتركيب البصري.",
      },
    ],
  },
  {
    title: "Also welcome",
    titleAr: "مرحّب بكم أيضاً",
    roles: [
      {
        title: "Other media-production role (specify in notes)",
        ar: "دور إنتاج إعلامي آخر (حدد في الملاحظات)",
        summary: "Another craft on a media set? Tell us where you fit in the form.",
        summaryAr: "حرفة أخرى في مواقع الإنتاج الإعلامي؟ أخبرنا أين تناسب في النموذج.",
      },
    ],
  },
];

// Flattened view of every roster role, in category order.
export const ROSTER_ROLES: RosterRole[] = ROSTER.flatMap((category) => category.roles);

// Sanity guard used by the roster-coverage test: every CAREER_POSITIONS role must
// appear in the roster exactly once, and the roster must add no extra roles.
export const ROSTER_ROLE_TITLES: CareerPosition[] = ROSTER_ROLES.map((role) => role.title);
