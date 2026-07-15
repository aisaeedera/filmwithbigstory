import type { Metadata } from "next";
import { type Locale, t } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { renderFaqPage, type FaqPageCopy } from "@/components/FaqPage";

const COPY: FaqPageCopy = {
  eyebrow: { en: "Videographer pricing FAQ", ar: "أسئلة حول تسعير مصور الفيديو" },
  h1: {
    en: "How much do videographers charge in Dubai?",
    ar: "كم يتقاضى مصورو الفيديو في دبي؟",
  },
  lead: {
    en: "Direct day-rate bands for videographers, cinematographers, DPs and directors in Dubai. Built on Big Story's 2026 rate card + a market survey of 50+ UAE freelancer profiles.",
    ar: "نطاقات الأسعار اليومية المباشرة لمصوري الفيديو والمصورين السينمائيين ومديري التصوير والمخرجين في دبي. مبنية على بطاقة أسعار بيك ستوري 2026 + مسح سوق لأكثر من 50 ملف مستقل في الإمارات.",
  },
  metaTitle: {
    en: "How much do videographers charge in Dubai in 2026? (day rates)",
    ar: "كم يتقاضى مصورو الفيديو في دبي في 2026؟ (أسعار يومية)",
  },
  metaDescription: {
    en: "2026 videographer and DP day rates in Dubai — solo, agency-trained, feature-trained. Half-day, full-day, hourly. Sourced and dated from Big Story's rate card v7.",
    ar: "الأسعار اليومية لمصوري الفيديو ومديري التصوير في دبي 2026 — منفرد، مدرّب في وكالة، مدرّب على أفلام روائية. نصف يوم، يوم كامل، بالساعة. مصدّرة ومؤرخة من بطاقة أسعار بيك ستوري v7.",
  },
  dataStudyPath: "/services/cinematography-rates-dubai-2026",
  dataStudyLabel: {
    en: "Cinematography rates 2026 — original data study",
    ar: "أسعار التصوير السينمائي 2026 — دراسة بيانات أصلية",
  },
  sections: {
    en: [
      {
        q: "What does a videographer charge per day in Dubai?",
        a: "Freelance videographers in Dubai charge AED 1,500–2,000 per day for solo FX3-class work, AED 2,000–2,500 for agency-trained DPs, and AED 3,000–4,500 for feature-trained cinema DPs. Half-day rates run AED 1,100–1,500. Big Story's internal rate card matches the agency-trained band at AED 2,000/day. Source: Big Story rate card v7 + Dubai market survey.",
      },
      {
        q: "How much does a Director of Photography (DP) cost per day in Dubai?",
        a: "Cinema-grade DPs in Dubai charge AED 2,000–2,500/day for mid-tier (RED Komodo, FX3 work) and AED 3,500–4,500/day for feature-trained (Netflix/Amazon regional productions). Big Story's DP day rate is AED 2,200, sitting at the mid-tier. Add AED 900/day for a 1st AC and AED 1,200–1,500/day for a gaffer.",
      },
      {
        q: "How much does a director cost per day in Dubai?",
        a: "Director day rates in Dubai are tiered: AED 1,500/day for projects under AED 50K total budget, AED 3,500/day for projects AED 50K and above. The split is industry-standard and reflects the higher creative ownership expected on larger productions. Source: Big Story internal rate card v7.",
      },
      {
        q: "What is the difference between a videographer and a cinematographer in Dubai?",
        a: "A videographer captures what happens — conferences, launches, real moments — with lighter cameras (FX3) and smaller crews (1–2 people). A cinematographer directs the visual look with cinema cameras (RED Komodo, Alexa Mini), controlled lighting, and a crew of 4+ people (DP, 1st AC, gaffer, sound). Videographer day rate AED 1,500–2,000; cinematographer AED 2,200–4,500.",
      },
      {
        q: "How much does a videographer cost per hour in Dubai?",
        a: "Hourly videographer rates in Dubai run AED 150–400/hour depending on experience. Big Story's internal rate card shows AED 300/hour for a freelance photographer or videographer (which equals AED 2,000 / ~7 billable hours). For event coverage and quick-turnaround work, hourly billing is standard. For brand films and TVCs, day rates are the norm.",
      },
      {
        q: "Are videographers in Dubai freelancers or staff?",
        a: "Almost all videographers in Dubai are freelancers — even those working on agency shoots. Big Story's policy is to treat them as independent contractors: their day rate goes through our quote as a pass-through with a small ops uplift (typically 10–20%) for project management, gear, edit suite and revisions.",
      },
      {
        q: "How much is a half-day videographer in Dubai?",
        a: "Half-day videographer rates in Dubai run AED 1,100–1,500 for solo FX3 work, AED 1,500–1,800 for agency-trained. A half-day typically covers 4 hours of shoot time. Big Story bills half-days at AED 1,100 (photographer and videographer same rate). Above 4 hours, we bill full-day.",
      },
      {
        q: "Do I need a videographer or a full crew in Dubai?",
        a: "For social cuts and event coverage, a solo videographer is enough. For brand films, TVCs and corporate videos, you need a full crew: DP + 1st AC + gaffer + sound + sometimes a director. Big Story's full-day brand film crew (5–7 people) costs AED 8,500–12,000 in crew alone before camera rental and post.",
      },
    ],
    ar: [
      {
        q: "كم يتقاضى مصور الفيديو يومياً في دبي؟",
        a: "يتقاضى مصورو الفيديو المستقلون في دبي 1,500–2,000 درهم يومياً للعمل المنفرد بفئة FX3، و2,000–2,500 درهم لمديري التصوير المدرّبين في الوكالات، و3,000–4,500 درهم لمديري التصوير السينمائيين المدرّبين على الأفلام الروائية. أسعار نصف اليوم 1,100–1,500 درهم. بطاقة أسعار بيك ستوري الداخلية تطابق فئة الوكالة بـ 2,000 درهم/يوم. المصدر: بطاقة أسعار بيك ستوري v7 + مسح سوق دبي.",
      },
      {
        q: "كم تكلفة مدير التصوير يومياً في دبي؟",
        a: "يتقاضى مديرو التصوير السينمائيون في دبي 2,000–2,500 درهم/يوم للفئة الوسطى (RED Komodo، FX3) و3,500–4,500 درهم/يوم للمدرّبين على الأفلام الروائية (إنتاجات Netflix/Amazon الإقليمية). سعر بيك ستوري اليومي لمدير التصوير 2,200 درهم، في الفئة الوسطى. أضف 900 درهم/يوم للمساعد الأول و1,200–1,500 درهم/يوم لفني الإضاءة.",
      },
      {
        q: "كم تكلفة المخرج يومياً في دبي؟",
        a: "الأسعار اليومية للمخرجين في دبي متدرجة: 1,500 درهم/يوم للمشاريع بميزانية إجمالية أقل من 50 ألف درهم، و3,500 درهم/يوم للمشاريع 50 ألف درهم فأكثر. التقسيم هو معيار الصناعة ويعكس الملكية الإبداعية الأعلى المتوقعة في الإنتاجات الأكبر. المصدر: بطاقة أسعار بيك ستوري الداخلية v7.",
      },
      {
        q: "ما الفرق بين مصور الفيديو والمصور السينمائي في دبي؟",
        a: "مصور الفيديو يلتقط ما يحدث — المؤتمرات والإطلاقات واللحظات الحقيقية — بكاميرات أخف (FX3) وطاقم أصغر (1–2 شخص). المصور السينمائي يوجّه المظهر البصري بكاميرات سينمائية (RED Komodo، Alexa Mini) وإضاءة محكومة وطاقم 4+ أشخاص (مدير تصوير، مساعد أول، فني إضاءة، صوت). سعر مصور الفيديو اليومي 1,500–2,000 درهم؛ المصور السينمائي 2,200–4,500 درهم.",
      },
      {
        q: "كم تكلفة مصور الفيديو بالساعة في دبي؟",
        a: "تتراوح أسعار مصوري الفيديو بالساعة في دبي بين 150–400 درهم/ساعة حسب الخبرة. تظهر بطاقة أسعار بيك ستوري الداخلية 300 درهم/ساعة لمصور فوتوغرافي أو مصور فيديو مستقل (أي ما يعادل 2,000 درهم / ~7 ساعات قابلة للفوترة). لتغطية الفعاليات وأعمال التسليم السريع، الفوترة بالساعة هي المعيار. للأفلام التعريفية والإعلانات التلفزيونية، الأسعار اليومية هي القاعدة.",
      },
      {
        q: "هل مصورو الفيديو في دبي مستقلون أم موظفون؟",
        a: "كل مصوري الفيديو تقريباً في دبي مستقلون — حتى العاملون في تصويرات الوكالات. سياسة بيك ستوري هي التعامل معهم كمقاولين مستقلين: سعرهم اليومي يمر عبر عرضنا كعبور مباشر مع هامش عمليات صغير (عادة 10–20٪) لإدارة المشروع والمعدات واستوديو المونتاج والمراجعات.",
      },
      {
        q: "كم سعر مصور فيديو نصف يوم في دبي؟",
        a: "تتراوح أسعار مصور الفيديو نصف يوم في دبي بين 1,100–1,500 درهم للعمل المنفرد بفئة FX3، و1,500–1,800 درهم للمدرّب في وكالة. يغطي نصف اليوم عادة 4 ساعات تصوير. تفوتر بيك ستوري أنصاف الأيام بـ 1,100 درهم (المصور الفوتوغرافي والفيديو نفس السعر). فوق 4 ساعات، نفوتر اليوم الكامل.",
      },
      {
        q: "هل أحتاج مصور فيديو أم طاقم كامل في دبي؟",
        a: "لنسخ السوشيال وتغطية الفعاليات، مصور فيديو منفرد يكفي. للأفلام التعريفية والإعلانات التلفزيونية وفيديوهات الشركات، تحتاج طاقماً كاملاً: مدير تصوير + مساعد أول + فني إضاءة + صوت + أحياناً مخرج. طاقم بيك ستوري الكامل ليوم واحد لفيلم تعريفي (5–7 أشخاص) يكلف 8,500–12,000 درهم في الطاقم فقط قبل تأجير الكاميرا والمونتاج.",
      },
    ],
  },
  footerFaqs: {
    en: [
      { q: "What's the cheapest videographer rate in Dubai?", a: "The cheapest legit videographer rate in Dubai is AED 1,100–1,500 for a half-day solo shoot or AED 150/hour for hourly event work. Below this, you're likely working with an amateur without insurance or backup gear." },
      { q: "Do videographers include equipment in their day rate?", a: "Sometimes. Some videographers quote 'rate + gear', others quote 'rate with FX3 + kit'. Always confirm in writing whether the camera body, lenses, audio gear and storage are included. Big Story quotes kit and crew as separate line items so you can see the breakdown." },
      { q: "Should I book a videographer for a wedding?", a: "Weddings use different pricing — typically AED 4,000–12,000 for a full-day wedding videographer with cinematic edit and highlight reel. Big Story focuses on commercial and brand work; we can recommend wedding videographers on request." },
    ],
    ar: [
      { q: "ما أرخص سعر لمصور فيديو في دبي؟", a: "أرخص سعر شرعي لمصور فيديو في دبي هو 1,100–1,500 درهم لتصوير نصف يوم منفرد أو 150 درهم/ساعة للعمل بالفعاليات بالساعة. تحت هذا، من المرجح أنك تعمل مع هاوٍ بدون تأمين أو معدات احتياطية." },
      { q: "هل يشمل السعر اليومي لمصوري الفيديو المعدات؟", a: "أحياناً. بعض المصورين يعرضون «السعر + المعدات»، وآخرون يعرضون «السعر شامل FX3 + طقم». أكّد دائماً كتابةً ما إذا كان جسم الكاميرا والعدسات ومعدات الصوت والتخزين مشمولة. تعرض بيك ستوري الطقم والطاقم كبنود منفصلة لتتمكن من رؤية التفصيل." },
      { q: "هل يجب أن أحجز مصور فيديو لحفل زفاف؟", a: "الأعراس لها تسعير مختلف — عادة 4,000–12,000 درهم لمصور فيديو زفاف ليوم كامل مع مونتاج سينمائي وفيلم ملخص. تركز بيك ستوري على الأعمال التجارية والعلامات؛ يمكننا التوصية بمصوري فيديو للأعراس عند الطلب." },
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
    path: "/faq/videographer-charges-dubai",
  });
}

export default async function VideographerChargesFaq({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return renderFaqPage({ path: "/faq/videographer-charges-dubai", copy: COPY, locale });
}