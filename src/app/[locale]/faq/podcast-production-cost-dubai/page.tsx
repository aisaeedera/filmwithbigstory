import type { Metadata } from "next";
import { type Locale, t } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { renderFaqPage, type FaqPageCopy } from "@/components/FaqPage";

const COPY: FaqPageCopy = {
  eyebrow: { en: "Podcast production pricing FAQ", ar: "أسئلة حول تسعير إنتاج البودكاست" },
  h1: {
    en: "How much does podcast production cost in Dubai?",
    ar: "كم تكلفة إنتاج البودكاست في دبي؟",
  },
  lead: {
    en: "Direct pricing for podcast episodes, seasons and signature shows in Dubai — sourced from Big Story's pricing, Poddster, Gulf Podcast Studios and the Dubai market average.",
    ar: "تسعير مباشر لحلقات ومواسم وعروض البودكاست في دبي — مصدره تسعير بيك ستوري وبودستر وغلف بودكاست ستوديوز ومتوسط سوق دبي.",
  },
  metaTitle: {
    en: "How much does podcast production cost in Dubai in 2026?",
    ar: "كم تكلفة إنتاج البودكاست في دبي في 2026؟",
  },
  metaDescription: {
    en: "Audio-only and video podcast pricing in Dubai — per episode, season bundle and signature package. Studio rental, editing, show notes and clips all priced.",
    ar: "تسعير البودكاست الصوتي والمرئي في دبي — لكل حلقة وباقة موسم وباقة مميزة. إيجار الاستوديو والمونتاج وملاحظات الحلقة والمقاطع جميعها مسعّرة.",
  },
  sections: {
    en: [
      {
        q: "How much does a single podcast episode cost in Dubai?",
        a: "A finished audio-only podcast episode in Dubai runs AED 1,200–2,800 at the median. Video podcast episodes run AED 2,200–5,500. Big Story's launch episode is AED 1,200 all-in (1hr recording, full edit, 3 social clips, 1-page analytics, EN show notes) and video is AED 2,200 with multi-cam edit and 3 video clips + 3 audiograms. Source: Big Story pricing + Poddster + Gulf Podcast Studios.",
      },
      {
        q: "How much is podcast studio rental per hour in Dubai?",
        a: "Dubai podcast studio rental runs AED 250/hour for a self-service studio (Shure SM7dB mics, Rodecaster interface, treated room). With an engineer and editing, AED 450–900/hour. Big Story bundles studio time separately so clients can see the breakdown.",
      },
      {
        q: "How much does an 8-episode podcast season cost in Dubai?",
        a: "An 8-episode season in Dubai runs AED 8,000 for audio-only (AED 1,000/episode bundled) or AED 15,000 for video (AED 1,875/episode bundled). Both include recording, edit, masters, show notes and 3 clips per episode. Season pricing locks in your production schedule and saves ~17% vs. episode-by-episode booking.",
      },
      {
        q: "How much does a 12-episode signature podcast cost in Dubai?",
        a: "A 12-episode signature podcast in Dubai runs AED 13,500 at Big Story — AED 1,125/episode. Includes everything in the season bundle plus a B-roll shoot day, EN + AR show notes, and a quarterly review. Designed for B2B thought-leadership shows with branded motion graphics.",
      },
      {
        q: "What is the average podcast cost per episode in Dubai?",
        a: "Average podcast cost per episode in Dubai: AED 1,200–2,800 for audio-only finished episodes, AED 2,200–5,500 for video. Studio rental adds AED 250–450/hour separately. B2B agencies globally charge USD 1,500–5,000 per episode or USD 3,000–25,000 per month for managed podcast retainers.",
      },
      {
        q: "Is podcast production cheaper in Dubai than globally?",
        a: "Yes, meaningfully. Dubai podcast rates run AED 1,200–2,800 per finished audio episode vs. USD 1,500–5,000 (AED 5,500–18,500) for comparable B2B agency work in the US/EU. The savings come from studio density in Business Bay and Al Quoz, plus a deep pool of trained Arabic and English-speaking producers.",
      },
      {
        q: "How many podcast episodes should I commit to before judging the show?",
        a: "At least 8–12. Most podcasts that fail quit in months three to six — right before an audience compounds. If you can't commit to a season, the money is better spent elsewhere. This is why Big Story's Season and Signature packages lock in 8 and 12 episodes respectively.",
      },
      {
        q: "Does podcast production include marketing and promotion?",
        a: "Big Story's packages include 3 vertical clips per episode (audio or video) and 1-page analytics. They do not include paid ads, guest booking, or YouTube channel management — those are scoped separately as add-ons. If you need a full-service B2B podcast, expect USD 3,000–25,000/month globally.",
      },
    ],
    ar: [
      {
        q: "كم تكلفة حلقة بودكاست واحدة في دبي؟",
        a: "تبلغ الحلقة الصوتية النهائية في دبي 1,200–2,800 درهم في المتوسط. حلقات الفيديو 2,200–5,500 درهم. حلقة الإطلاق من بيك ستوري بـ 1,200 درهم شاملة (ساعة تسجيل، مونتاج كامل، 3 مقاطع سوشيال، تقرير صفحة واحدة، ملاحظات EN)، والفيديو 2,200 درهم مع مونتاج كاميرات متعددة و3 مقاطع فيديو + 3 audiograms. المصدر: تسعير بيك ستوري + بودستر + غلف بودكاست ستوديوز.",
      },
      {
        q: "كم إيجار استوديو البودكاست بالساعة في دبي؟",
        a: "يبلغ إيجار استوديو البودكاست في دبي 250 درهم/ساعة لاستوديو خدمة ذاتية (ميكروفونات Shure SM7dB، واجهة Rodecaster، غرفة معالجة). مع مهندس ومونتاج، 450–900 درهم/ساعة. تدمج بيك ستوري وقت الاستوديو منفصلاً ليرى العملاء التفصيل.",
      },
      {
        q: "كم تكلفة موسم بودكاست من 8 حلقات في دبي؟",
        a: "يبلغ موسم من 8 حلقات في دبي 8,000 درهم للصوت فقط (1,000 درهم/حلقة في الباقة) أو 15,000 درهم للفيديو (1,875 درهم/حلقة في الباقة). كلاهما يشمل التسجيل والمونتاج والماستر وملاحظات الحلقة و3 مقاطع لكل حلقة. تسعير الموسم يضمن جدول الإنتاج ويوفر ~17٪ مقابل الحجز حلقة بحلقة.",
      },
      {
        q: "كم تكلفة بودكاست مميز من 12 حلقة في دبي؟",
        a: "يبلغ البودكاست المميز من 12 حلقة في دبي 13,500 درهم في بيك ستوري — 1,125 درهم/حلقة. يشمل كل ما في باقة الموسم إضافة إلى يوم تصوير لقطات مساعدة، ملاحظات EN + AR، ومراجعة ربع سنوية. مصمم لبرامج ريادة الفكر B2B مع رسومات متحركة بعلامة.",
      },
      {
        q: "ما متوسط تكلفة حلقة البودكاست في دبي؟",
        a: "متوسط تكلفة حلقة البودكاست في دبي: 1,200–2,800 درهم للحلقات الصوتية النهائية، 2,200–5,500 درهم للفيديو. إيجار الاستوديو يضيف 250–450 درهم/ساعة منفصلاً. وكالات B2B عالمياً تتقاضى 1,500–5,000 دولار/حلقة أو 3,000–25,000 دولار/شهر لباقات البودكاست المُدارة.",
      },
      {
        q: "هل إنتاج البودكاست أرخص في دبي منه عالمياً؟",
        a: "نعم، بشكل ملموس. أسعار البودكاست في دبي 1,200–2,800 درهم للحلقة الصوتية النهائية مقابل 1,500–5,000 دولار (5,500–18,500 درهم) لأعمال وكالات B2B المماثلة في أمريكا/الاتحاد الأوروبي. الوفورات تأتي من كثافة الاستوديوهات في الخليج التجاري والقوز، إضافة إلى تجمع منتجين متمرسين بالعربية والإنجليزية.",
      },
      {
        q: "كم حلقة بودكاست يجب أن ألتزم بها قبل الحكم على البرنامج؟",
        a: "على الأقل 8–12. معظم البودكاستات التي تفشل تتوقف في الشهر الثالث إلى السادس — قبل أن يتراكم الجمهور. إن لم تستطع الالتزام بموسم، فالمال يُنفق في مكان أفضل. لهذا تلتزم باقتا الموسم والمميّزة من بيك ستوري بـ 8 و12 حلقة على التوالي.",
      },
      {
        q: "هل يشمل إنتاج البودكاست التسويق والترويج؟",
        a: "تشمل باقات بيك ستوري 3 مقاطع عمودية لكل حلقة (صوت أو فيديو) وصفحة تحليلات. لا تشمل الإعلانات المدفوعة أو حجز الضيوف أو إدارة قناة يوتيوب — تلك تُسعّر منفصلة كإضافات. إن كنت تحتاج بودكاست B2B متكامل الخدمات، توقع 3,000–25,000 دولار/شهر عالمياً.",
      },
    ],
  },
  footerFaqs: {
    en: [
      { q: "Do I need to be in Dubai to record a podcast with Big Story?", a: "No — we work remote-first. We can direct remote recordings over Riverside or SquadCast for guests, and we ship a portable podcast kit (Rode Wireless GO II + Shure MV7) anywhere in the UAE for in-person recordings." },
      { q: "Can you publish my podcast on Spotify and Apple Podcasts?", a: "Yes — distribution to all major platforms (Spotify, Apple Podcasts, Google Podcasts, Anghami, Amazon Music) is included in our season packages, with RSS feed setup and chapter markers." },
      { q: "Do you do Arabic-only podcasts?", a: "Yes — we produce Arabic-first podcasts with native Arabic producers, sound engineering, and show notes. Bilingual shows (EN + AR) are standard in our Signature package." },
    ],
    ar: [
      { q: "هل أحتاج أن أكون في دبي لتسجيل بودكاست مع بيك ستوري؟", a: "لا — نعمل عن بُعد أولاً. يمكننا توجيه تسجيلات الضيوف عن بعد عبر Riverside أو SquadCast، ونشحن طقم بودكاست محمول (Rode Wireless GO II + Shure MV7) في أي مكان في الإمارات للتسجيلات الشخصية." },
      { q: "هل تنشرون البودكاست على Spotify وApple Podcasts؟", a: "نعم — التوزيع على جميع المنصات الرئيسية (Spotify، Apple Podcasts، Google Podcasts، أنغامي، Amazon Music) مشمول في باقات الموسم، مع إعداد RSS وعلامات الفصول." },
      { q: "هل تصنعون بودكاست بالعربية فقط؟", a: "نعم — ننتج بودكاست بالعربية أولاً مع منتجين أصليين بالعربية وهندسة صوتية وملاحظات حلقة. البرامج ثنائية اللغة (EN + AR) قياسية في باقتنا المميزة." },
    ],
  },
  related: { en: "Related guides", ar: "أدلة ذات صلة" },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta({
    locale,
    title: t(COPY.metaTitle, locale),
    description: t(COPY.metaDescription, locale),
    path: "/faq/podcast-production-cost-dubai",
  });
}

export default async function PodcastCostFaq({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return renderFaqPage({ path: "/faq/podcast-production-cost-dubai", copy: COPY, locale });
}