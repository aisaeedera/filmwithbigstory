import type { L } from "@/lib/i18n";

export type City = {
  slug: string;
  name: L;
  order: number;
  /** unique city-specific "on the ground" base paragraph */
  groundBase: L;
  /** short descriptor used inside intros/cards */
  note: L;
  areas: string[];
};

export const cities: City[] = [
  {
    slug: "dubai",
    name: { en: "Dubai", ar: "دبي" },
    order: 1,
    note: { en: "the region's production capital", ar: "عاصمة الإنتاج في المنطقة" },
    groundBase: {
      en: "Shooting in Dubai means working with the city's permits, locations and pace — a DIFC rooftop, a Downtown set framed by Burj Khalifa, a Marina waterfront, a Palm villa or a controlled Business Bay studio. We know the light, the load-in rules and the DFTC approvals, so your shoot day runs without surprises.",
      ar: "التصوير في دبي يعني العمل مع تصاريح المدينة ومواقعها وإيقاعها — سطح في مركز دبي المالي، موقع في وسط المدينة يؤطره برج خليفة، واجهة بحرية في المارينا، فيلا في النخلة أو استوديو محكوم في الخليج التجاري. نعرف الإضاءة وقواعد الدخول وموافقات لجنة دبي للتصوير، ليمر يوم تصويرك دون مفاجآت.",
    },
    areas: ["DIFC", "Downtown", "Dubai Marina", "Palm Jumeirah", "Business Bay", "JLT", "Dubai Media City"],
  },
  {
    slug: "abu-dhabi",
    name: { en: "Abu Dhabi", ar: "أبوظبي" },
    order: 2,
    note: { en: "the capital's home of government and culture", ar: "موطن الحكومة والثقافة في العاصمة" },
    groundBase: {
      en: "Filming in Abu Dhabi means Yas Island circuits, Saadiyat's cultural district, ADGM boardrooms, the Corniche and Al Reem towers. We work with twofour54 permits and the capital's government-grade approval process, so campaign and public-sector shoots stay compliant and on schedule.",
      ar: "التصوير في أبوظبي يعني حلبات جزيرة ياس، والحي الثقافي في السعديات، وقاعات سوق أبوظبي العالمي، والكورنيش، وأبراج الريم. نعمل مع تصاريح توفور54 وعملية الموافقات الحكومية في العاصمة، لتبقى تصويرات الحملات والقطاع العام متوافقة وضمن الجدول.",
    },
    areas: ["Yas Island", "Saadiyat", "ADGM", "Corniche", "Al Reem Island", "twofour54"],
  },
  {
    slug: "sharjah",
    name: { en: "Sharjah", ar: "الشارقة" },
    order: 3,
    note: { en: "the emirate of heritage and arts", ar: "إمارة التراث والفنون" },
    groundBase: {
      en: "Sharjah brings heritage backdrops and a considered permit process — Al Majaz waterfront, Al Qasba canal, the Heritage Area's old town and the coastline out to Kalba and Khorfakkan. We arrange the emirate's filming approvals and know where the light works across its cultural and industrial districts.",
      ar: "تقدم الشارقة خلفيات تراثية وعملية تصاريح مدروسة — واجهة المجاز البحرية، وقناة القصباء، والمدينة القديمة في المنطقة التراثية، والساحل حتى كلباء وخورفكان. نرتب موافقات التصوير في الإمارة ونعرف أين تعمل الإضاءة عبر أحيائها الثقافية والصناعية.",
    },
    areas: ["Al Majaz", "Al Qasba", "Heritage Area", "Kalba", "Khorfakkan"],
  },
  {
    slug: "ajman",
    name: { en: "Ajman", ar: "عجمان" },
    order: 4,
    note: { en: "the compact coastal emirate", ar: "الإمارة الساحلية المدمجة" },
    groundBase: {
      en: "Ajman is compact and quick to work in — the Corniche beachfront, Al Jurf's developing districts and the Ajman Free Zone. Shorter distances and a straightforward permit process make it a practical base for efficient one-day shoots and SME brand work.",
      ar: "عجمان مدمجة وسريعة العمل — واجهة الكورنيش الشاطئية، وأحياء الجرف المتطورة، والمنطقة الحرة في عجمان. المسافات الأقصر وعملية التصاريح المباشرة تجعلها قاعدة عملية لتصويرات يوم واحد الفعالة وأعمال العلامات الصغيرة والمتوسطة.",
    },
    areas: ["Ajman Corniche", "Al Jurf", "Ajman Free Zone"],
  },
  {
    slug: "ras-al-khaimah",
    name: { en: "Ras Al Khaimah", ar: "رأس الخيمة" },
    order: 5,
    note: { en: "the emirate of mountains and coastline", ar: "إمارة الجبال والساحل" },
    groundBase: {
      en: "Ras Al Khaimah gives you range in one location — Jebel Jais mountain roads, the Al Hamra lagoons and RAK City. The RAK Film Commission offers some of the UAE's most film-friendly permits, which makes it a strong choice for landscape-led brand films and adventure content.",
      ar: "تمنحك رأس الخيمة تنوعاً في موقع واحد — طرق جبل جيس الجبلية، وبحيرات الحمرا، ومدينة رأس الخيمة. تقدم هيئة رأس الخيمة للأفلام بعضاً من أكثر التصاريح ملاءمة للتصوير في الإمارات، ما يجعلها خياراً قوياً للأفلام التعريفية القائمة على المناظر الطبيعية ومحتوى المغامرات.",
    },
    areas: ["RAK City", "Jebel Jais", "Al Hamra"],
  },
  {
    slug: "al-ain",
    name: { en: "Al Ain", ar: "العين" },
    order: 6,
    note: { en: "the garden city and UNESCO heritage site", ar: "المدينة الحديقة وموقع التراث العالمي" },
    groundBase: {
      en: "Al Ain offers a distinct look — the UNESCO oasis, the Jebel Hafeet mountain road and heritage forts against green, quieter surroundings. As a cultural and government hub it suits Arabic-first documentary, heritage and public-sector films that need something other than a city skyline.",
      ar: "تقدم العين مظهراً مميزاً — الواحة المدرجة في اليونسكو، وطريق جبل حفيت الجبلي، والحصون التراثية وسط محيط أخضر وأكثر هدوءاً. كمركز ثقافي وحكومي تناسب الأفلام الوثائقية العربية والتراثية وأفلام القطاع العام التي تحتاج شيئاً غير أفق المدينة.",
    },
    areas: ["Al Ain Oasis", "Jebel Hafeet", "Al Ain heritage forts"],
  },
  {
    slug: "umm-al-quwain",
    name: { en: "Umm Al Quwain", ar: "أم القيوين" },
    order: 7,
    note: { en: "the quiet coastal emirate", ar: "الإمارة الساحلية الهادئة" },
    groundBase: {
      en: "Umm Al Quwain is the UAE's quietest coastal emirate — the UAQ Free Trade Zone, long empty beaches and a relaxed permit process. A practical choice for projects that need water, sand and zero crowds.",
      ar: "أم القيوين أكثر إمارات الساحل هدوءاً — المنطقة الحرة، وشواطئ طويلة شبه خالية، وعملية تصاريح مرنة. خيار عملي للمشاريع التي تحتاج ماءً ورملاً وغياب الزحام.",
    },
    areas: ["UAQ Free Trade Zone", "UAQ coastal areas"],
  },
  {
    slug: "fujairah",
    name: { en: "Fujairah", ar: "الفجيرة" },
    order: 8,
    note: { en: "the east-coast mountain-and-sea emirate", ar: "إمارة الساحل الشرقي بين الجبل والبحر" },
    groundBase: {
      en: "Fujairah mixes Hajar mountain valleys with the Indian Ocean coast — a distinctive east-coast look that breaks up the standard Gulf-city skyline. Suited to adventure, automotive and lifestyle shoots that need terrain and sea in one frame.",
      ar: "تجمع الفجيرة بين وديان جبال حجر وساحل بحر العرب — مظهر مميز للساحل الشرقي يكسر أفق مدن الخليج المعتاد. تناسب تصويرات المغامرات والسيارات وأسلوب الحياة التي تحتاج تضاريس وبحراً في لقطة واحدة.",
    },
    areas: ["Fujairah City coast", "Hajar mountains", "Dibba"],
  },
];

export function getCity(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

export const citySlugs = cities.map((c) => c.slug);
