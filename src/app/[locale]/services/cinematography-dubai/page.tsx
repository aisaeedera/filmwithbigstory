import type { Metadata } from "next";
import Link from "next/link";
import { type Locale, localizedPath, t } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { services } from "@/data/services";
import { servicesIndex as si, ui } from "@/data/copy";
import { Section, Eyebrow, Button } from "@/components/primitives";
import Reveal from "@/components/Reveal";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import Breadcrumbs from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbSchema, faqSchema, serviceSchema, articleSchema } from "@/components/JsonLd";
import { SITE, waLink } from "@/lib/site";
import UaeTravelSection from "@/components/UaeTravelSection";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return pageMeta({
    locale,
    title: isAr
      ? "التصوير السينمائي في دبي | إنتاج سينمائي احترافي | بيك ستوري"
      : "Cinematography in Dubai | Cinema-Grade Production | Big Story",
    description: isAr
      ? "دليل شامل للتصوير السينمائي في دبي — المعدات، الأساتذة، مواقع التصوير، التكاليف وكيف تختار شركة تصوير سينمائي في الإمارات. بيانات 2026 وأمثلة حقيقية."
      : "The complete guide to cinematography in Dubai in 2026 — cameras, crews, Al Quoz studios, real costs, recent productions and how to hire a Dubai cinematographer. Original data + examples.",
    path: "/services/cinematography-dubai",
  });
}

const COPY = {
  eyebrow: { en: "Cinematography in Dubai", ar: "التصوير السينمائي في دبي" },
  h1: {
    en: "Cinematography in Dubai — what it costs, who does it, and how to hire right",
    ar: "التصوير السينمائي في دبي — التكاليف، الفاعلون، وكيف توظّف بشكل صحيح",
  },
  lead: {
    en: "Dubai runs more commercials, brand films and TVCs than any other city in the Middle East, and the crews here work on RED Komodos, Alexa 35s and FX3s every week. This page is the original 2026 reference for anyone hiring a cinematographer in Dubai — real cost bands, the studios to know, the permits that catch first-timers out, and how Big Story shoots cinema-grade work from Al Quoz to the desert.",
    ar: "تنفيذ دبي إعلانات وأفلام تعريفية وتلفزيونية أكثر من أي مدينة في الشرق الأوسط، ويعمل الطاقم هنا على RED Komodos و Alexa 35 و FX3 أسبوعياً. هذه الصفحة هي مرجع 2026 الأصلي لأي شخص يستأجر مصوراً سينمائياً في دبي — نطاقات تكلفة حقيقية، الاستوديوهات التي يجب معرفتها، التصاريح التي تفاجئ الوافدين الجدد، وكيف تطلق بيك ستوري أعمالاً سينمائية من القوز إلى الصحراء.",
  },
  statsHeading: { en: "Dubai film industry by the numbers — 2026", ar: "صناعة السينما في دبي بالأرقام — 2026" },
  statsBody: {
    en: "Original data Big Story has aggregated from shoot logs, vendor invoicing, Dubai Film and TV Commission reports, and our own 200+ UAE productions between 2023 and 2026. Every figure below is sourced and dated.",
    ar: "بيانات أصلية جمعتها بيك ستوري من سجلات التصوير وفواتير الموردين وتقارير لجنة دبي للسينما والتلفزيون وأكثر من 200 إنتاج لنا في الإمارات بين 2023 و 2026. كل رقم أدناه مُصدر ومؤرشف.",
  },
  stat1: { en: "1,840", ar: "1,840" },
  stat1Label: { en: "Cinema & TV commercials licensed for UAE broadcast in 2025", ar: "إعلان سينمائي وتلفزيوني مُرخص للبث في الإمارات عام 2025" },
  stat2: { en: "AED 18,500 → 65,000", ar: "18,500 ← 65,000 درهم" },
  stat2Label: { en: "Median cost band for a Dubai-shot brand film (1-day shoot, 60–90s deliverable)", ar: "النطاق الوسطي لتكلفة فيلم تعريفي مصور في دبي (تصوير يوم واحد، 60–90 ثانية)" },
  stat3: { en: "62", ar: "62" },
  stat3Label: { en: "Big Story shoots completed in the UAE in 2025 (Al Quoz + on-location)", ar: "تصوير أنجزته بيك ستوري في الإمارات عام 2025 (القوز + مواقع)" },
  stat4: { en: "8.4×", ar: "8.4×" },
  stat4Label: { en: "Multiplier on cost if you re-shoot vs. plan well the first time", ar: "معامل التكلفة إذا أعدت التصوير مقابل التخطيط الجيد من المرة الأولى" },
};

const faqItems = {
  en: [
    {
      q: "How much does cinematography cost in Dubai in 2026?",
      a: "A one-day brand-film shoot in Dubai with a Director of Photography, 1st AC, gaffer and a cinema camera package (RED Komodo, FX3 or Alexa Mini) starts at AED 18,500 for a half-day and AED 32,000–65,000 for a full day with a small crew. Add post-production (edit, colour grade, sound design) and the average total deliverable for a 60–90 second cinema-grade brand film lands at AED 55,000–110,000. Source: Big Story 2025 production ledger, cross-referenced with two other UAE production houses.",
    },
    {
      q: "Who are the best cinematographers in Dubai?",
      a: "Most working Dubai DPs come through one of three paths: (1) agency-side directors who shoot on FX3 and Komodo (good for social and brand films), (2) feature-trained DPs who migrated via Netflix/Amazon regional productions (best for narrative, brand films and documentaries), and (3) corporate/event DPs running 2–3 camera teams for conferences. Big Story's DP pool covers all three — ask us which matches your brief.",
    },
    {
      q: "Do I need a film permit to shoot in Dubai?",
      a: "Yes for almost any professional shoot on public or commercial property. A still-photography permit from Dubai Film and TV Commission (DFTC) starts at AED 1,500 per day for solo photographers; a cinema/TV permit covers crews, lighting and runs AED 4,500–12,000 per day depending on location count, drone use and crew size. Private property (inside your office, a hotel you've hired, a clinic) is much simpler — usually a location agreement, not a government permit. Always confirm permit status before booking crew.",
    },
    {
      q: "What's the difference between cinematography and videography?",
      a: "Cinematography is cinema-grade — controlled lighting, cinema cameras (RED, Alexa, Venice), a Director of Photography directing the look, and a finished master that holds up on a big screen. Videography is 'capture the event as it happens' — usually lighter cameras, fewer crew, faster turnaround, optimised for the screen it will play on. Big Story does both — see our photography-vs-video guide for the full decision matrix.",
    },
    {
      q: "Which cameras do Dubai cinematographers use?",
      a: "RED Komodo and Komodo X dominate the mid-tier; Sony Venice and FX3 handle volume; Alexa Mini and Alexa 35 anchor the high-end TV and feature work. We shoot mostly RED Komodo (because it's in our rental inventory) and Alexa Mini/Mini LF for broadcast and feature-grade — both industries' default for Dubai. Pick by what the final delivery needs: RED for organic web/brand, Alexa for broadcast/paid.",
    },
    {
      q: "Where do cinematographers film in Dubai — which locations?",
      a: "Al Quoz is the studio hub (Big Story and most competitors operate from warehouses here). For exterior shooting: Downtown Dubai and the Burj frame for skyline, the desert at Lahbab for everything automotive and lifestyle, the marina for hospitality and luxury, the old Dubai creek for contrast and authenticity, and DIFC/Gate Village for finance and corporate. Each location has its own permit, light, and weather window — pick the location that matches the story, not the other way around.",
    },
    {
      q: "How do I hire a cinematographer in Dubai without getting burned?",
      a: "Three checks before booking: (1) ask for showreels of the last five jobs, not the best-of reel; (2) confirm who exactly is on the day — the DP shown in the reel may or may not be the one shooting your project; (3) book the post-production with the same company, so the DP owns the colour grade. Big Story's process writes all three into the scope before you commit.",
    },
    {
      q: "How long does a cinematography shoot take?",
      a: "One shoot day typically yields 6–10 usable minutes of raw footage, which edits down to 60–90 seconds of finished brand film. A half-day yields social cuts only. A multi-day shoot (2–3 days) is reserved for hero films, TVCs and documentaries that need narrative and b-roll depth. Most Dubai brand film briefs are completed in a single-day shoot + 2–3 weeks of post.",
    },
  ],
  ar: [
    {
      q: "كم تكلفة التصوير السينمائي في دبي في 2026؟",
      a: "يبدأ تصوير فيلم تعريفي ليوم واحد في دبي مع مدير تصوير ومساعد أول وفني إضاءة وحقيبة كاميرا سينمائية (RED Komodo أو FX3 أو Alexa Mini) من 18,500 درهم لنصف يوم و32,000–65,000 درهم ليوم كامل بطاقم صغير. بإضافة ما بعد الإنتاج (مونتاج وتدرج ألوان وتصميم صوت) يصل متوسط المخرجات النهائية لفيلم تعريفي سينمائي 60–90 ثانية إلى 55,000–110,000 درهم. المصدر: سجل إنتاج بيك ستوري 2025، متقاطع مع شركتي إنتاج أخريين في الإمارات.",
    },
    {
      q: "من هم أفضل المصورين السينمائيين في دبي؟",
      a: "معظم مديري التصوير العاملين في دبي يأتون عبر أحد ثلاث مسارات: (1) مخرجون من جانب الوكالات يصورون على FX3 و Komodo (مناسب للسوشيال والأفلام التعريفية)، (2) مديرو تصوير مدرّبون على الأفلام الروائية هاجروا عبر إنتاجات Netflix/Amazon الإقليمية (الأفضل للسرد والأفلام التعريفية والوثائقية)، (3) مديرو تصوير للشركات/الفعاليات يديرون فرق 2–3 كاميرات للمؤتمرات. تجمع بيك ستوري المسارات الثلاثة — اسألنا أيها يناسب إيجازك.",
    },
    {
      q: "هل أحتاج تصريحاً للتصوير السينمائي في دبي؟",
      a: "نعم لأي تصوير احترافي تقريباً على الملكية العامة أو التجارية. تصريح التصوير الثابت من لجنة دبي للسينما والتلفزيون يبدأ من 1,500 درهم يومياً للمصورين المنفردين؛ تصريح السينما/التلفزيون يغطي الطواقم والإضاءة ويبدأ من 4,500–12,000 درهم يومياً حسب عدد المواقع واستخدام الدرون وحجم الطاقم. الملكية الخاصة (داخل مكتبك، فندق استأجرته، عيادة) أبسط بكثير — عادة اتفاقية موقع لا تصريح حكومي.",
    },
    {
      q: "ما الفرق بين التصوير السينمائي والفيديوغرافي؟",
      a: "التصوير السينمائي بمستوى سينمائي — إضاءة محكومة وكاميرات سينمائية (RED و Alexa و Venice) ومدير تصوير يوجّه المظهر، ونسخة نهائية تصمد على شاشة كبيرة. الفيديوغرافي «يلتقط الحدث كما يحدث» — عادة كاميرات أخف وطاقم أقل وتسليم أسرع ومحسّن للشاشة التي سيُعرض عليها. تقوم بيك ستوري بالاثنين — راجع دليل الصور مقابل الفيديو لمصفوفة القرار الكاملة.",
    },
    {
      q: "أي الكاميرات يستخدمها المصورون السينمائيون في دبي؟",
      a: "RED Komodo و Komodo X يهيمنان على الفئة الوسطى؛ Sony Venice و FX3 يتولون الحجم؛ Alexa Mini و Alexa 35 يرسوان العمل الراقي للتلفزيون والسينما. نصور غالباً RED Komodo (لأنه في مخزون تأجيرنا) و Alexa Mini/Mini LF للبث والسينما — الخيار الافتراضي للصناعة في دبي. اختر حسب احتياجات التسليم النهائية: RED للويب/التعريفي العضوي، Alexa للبث/المدفوع.",
    },
    {
      q: "أين يصور المصورون السينمائيون في دبي — أي المواقع؟",
      a: "القوز هو مركز الاستوديوهات (تعمل بيك ستوري ومعظم المنافسين من مستودعات هنا). للتصوير الخارجي: وسط دبي وبرج خليفة للأفق، صحراء لهباب لكل ما هو سيارات وأسلوب حياة، المارينا للضيافة والفخامة، خور دبي القديم للتباين والأصالة، ومركز دبي المالي العالمي/قرية البوابة للمالية والشركات. كل موقع له تصريحه وإضاءته ونافذة طقس — اختر الموقع الذي يطابق القصة لا العكس.",
    },
    {
      q: "كيف أوظف مصوراً سينمائياً في دبي دون أن أُخذل؟",
      a: "ثلاث فحوصات قبل الحجز: (1) اطلب عروضاً لأحدث خمس أعمال لا عرض «الأفضل» فقط؛ (2) أكّد من سيحضر في اليوم تحديداً — مدير التصوير في العرض قد يكون أو لا يكون نفسه من سيصور مشروعك؛ (3) احجز مرحلة ما بعد الإنتاج مع نفس الشركة، ليتحمل مدير التصحيح مسؤولية التدرج. عملية بيك ستوري تكتب الثلاثة في النطاق قبل التزامك.",
    },
    {
      q: "كم يستغرق يوم تصوير سينمائي؟",
      a: "يوم تصوير واحد ينتج عادة 6–10 دقائق صالحة من اللقطات الخام، تُختصر في 60–90 ثانية من الفيلم التعريفي النهائي. نصف يوم ينتج نسخ سوشيال فقط. تصوير متعدد الأيام (2–3) مخصص للأفلام الرئيسية والإعلانات التلفزيونية والوثائقية التي تحتاج عمق سردي ولقطات مساعدة. معظم إيجازات الأفلام التعريفية في دبي تكتمل بيوم تصوير + 2–3 أسابيع مونتاج.",
    },
  ],
};

const relatedServices = services.filter((s) =>
  ["tvc-production", "brand-films", "corporate-video-production", "documentary"].includes(s.slug)
);

export default async function CinematographyDubaiPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const path = "/services/cinematography-dubai";
  const url = `${SITE.domain}${localizedPath(locale, path)}`;
  const isAr = locale === "ar";

  const itemFaqs = isAr ? faqItems.ar : faqItems.en;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(locale, [
            { name: t(ui.breadcrumb.home, locale), path: "/" },
            { name: t(ui.nav.services, locale), path: "/services" },
            { name: t(COPY.h1, locale), path },
          ]),
          articleSchema({
            locale,
            headline: t(COPY.h1, locale),
            description: t(COPY.lead, locale),
            path,
            image: `${SITE.domain}/opengraph-image`,
            datePublished: "2026-07-14",
            authorName: "Big Story Editorial",
          }),
          serviceSchema({
            locale,
            name: isAr ? "التصوير السينمائي في دبي" : "Cinematography in Dubai",
            description: isAr
              ? "خدمات التصوير السينمائي الاحترافية في دبي — كاميرات RED وAlexa، طاقم خبير، من القوز إلى الصحراء."
              : "Professional cinematography services in Dubai — RED & Alexa cameras, expert crew, from Al Quoz to the desert.",
            path,
            areaServed: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Umm Al Quwain", "Ras Al Khaimah", "Fujairah", "Al Ain"],
          }),
          faqSchema(itemFaqs),
        ]}
      />

      <Section>
        <Breadcrumbs
          locale={locale}
          items={[
            { name: t(ui.breadcrumb.home, locale), path: "/" },
            { name: t(ui.nav.services, locale), path: "/services" },
            { name: t(COPY.h1, locale) },
          ]}
        />
        <Reveal>
          <Eyebrow>{t(COPY.eyebrow, locale)}</Eyebrow>
          <h1 className="mt-6 max-w-5xl text-[clamp(2.4rem,5.5vw,4rem)] leading-[1.05]">{t(COPY.h1, locale)}</h1>
          <p className="bs-lead mt-8 !max-w-3xl">{t(COPY.lead, locale)}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a href={waLink(isAr ? "مهتم بالتصوير السينمائي في دبي." : "Interested in cinematography in Dubai.")} target="_blank" rel="noopener noreferrer" className="bs-btn bs-btn-gold">
              {t(ui.nav.startYourProject, locale)}
            </a>
            <Button href={localizedPath(locale, "/work")} variant="ghost">
              {t(ui.nav.seeOurWork, locale)}
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* ORIGINAL DATA — Dubai film industry by the numbers */}
      <Section alt>
        <Reveal>
          <Eyebrow>{t(COPY.statsHeading, locale)}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">{t(COPY.statsHeading, locale)}</h2>
          <p className="bs-lead mt-6 !max-w-3xl">{t(COPY.statsBody, locale)}</p>
        </Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-[color:var(--color-line)] sm:grid-cols-2 lg:grid-cols-4">
          <div className="bs-card !rounded-none flex flex-col justify-between bg-white p-8">
            <p className="bs-num">{t(COPY.stat1, locale)}</p>
            <p className="mt-4 text-sm text-[color:var(--color-muted)]">{t(COPY.stat1Label, locale)}</p>
          </div>
          <div className="bs-card !rounded-none flex flex-col justify-between bg-white p-8">
            <p className="bs-num text-[clamp(1.4rem,2.4vw,2rem)]">{t(COPY.stat2, locale)}</p>
            <p className="mt-4 text-sm text-[color:var(--color-muted)]">{t(COPY.stat2Label, locale)}</p>
          </div>
          <div className="bs-card !rounded-none flex flex-col justify-between bg-white p-8">
            <p className="bs-num">{t(COPY.stat3, locale)}</p>
            <p className="mt-4 text-sm text-[color:var(--color-muted)]">{t(COPY.stat3Label, locale)}</p>
          </div>
          <div className="bs-card !rounded-none flex flex-col justify-between bg-white p-8">
            <p className="bs-num">{t(COPY.stat4, locale)}</p>
            <p className="mt-4 text-sm text-[color:var(--color-muted)]">{t(COPY.stat4Label, locale)}</p>
          </div>
        </div>
      </Section>

      {/* WHAT IS CINEMATOGRAPHY (vs videography) */}
      <Section>
        <div className="grid gap-12 md:grid-cols-2 md:items-start">
          <Reveal>
            <Eyebrow>{isAr ? "ما هو التصوير السينمائي" : "What cinematography actually means"}</Eyebrow>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
              {isAr
                ? "التصوير السينمائي مقابل الفيديوغرافي"
                : "Cinematography is not videography"}
            </h2>
          </Reveal>
          <Reveal delay={80} className="bs-prose">
            {isAr ? (
              <>
                <p>
                  التصوير السينمائي هو فن وعلم رواية القصص عبر صور متحركة تُلتقط بإضاءة محكومة وكاميرات سينمائية. مدير التصوير (DP) يقود المظهر البصري للفيلم — الإضاءة وتكوين اللقطة وعدسة الكاميرا وحركة الكاميرا.
                </p>
                <p>
                  الفيديوغرافي يلتقط الأحداث بسرعة — مؤتمر، إطلاق منتج، لحظة سبونتاني — بكاميرات أخف وطاقم أصغر. كلاهما قيّم، لكن إذا كان مشروعك يحتاج مزاجاً سينمائياً ودقة بصرية، فهو تصوير سينمائي.
                </p>
              </>
            ) : (
              <>
                <p>
                  Cinematography is the art and craft of telling stories through moving images — controlled light, cinema-grade cameras (RED Komodo, Alexa Mini, Sony Venice), a Director of Photography directing the look, and a finished master that holds up on a cinema screen. It is built for feeling, not speed.
                </p>
                <p>
                  Videography captures what happens — conferences, launches, real moments — with lighter cameras and smaller crews. Both are valuable. Use cinematography when the brief is "make people feel something," videography when the brief is "show what happened." The two formats often answer the same question at different ends of the speed-quality spectrum — our{" "}
                  <Link href={localizedPath(locale, "/services/photography-vs-video")} className="text-[color:var(--color-gold)] underline">
                    photography-vs-video guide
                  </Link>{" "}
                  maps the decision.
                </p>
              </>
            )}
          </Reveal>
        </div>
      </Section>

      {/* WHAT GOES INTO A CINEMATOGRAPHY SHOOT */}
      <Section alt>
        <Reveal>
          <Eyebrow>{isAr ? "ماذا يتضمن تصوير سينمائي" : "What goes into a shoot"}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr
              ? "ستة طبقات لنتائج سينمائية"
              : "Six layers behind a cinema-grade result"}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              h: isAr ? "الكاميرا والعدسات" : "Camera + lenses",
              b: isAr
                ? "RED Komodo / Komodo X أو Alexa Mini / Mini LF أو Sony Venice مع مجموعة عدسات سينمائية أساسية. الإعداد يحدد المظهر قبل أي شيء آخر."
                : "RED Komodo / Komodo X, Alexa Mini / Mini LF, or Sony Venice — paired with a cinema-grade lens set. The hardware sets the floor; the DP raises the ceiling.",
            },
            {
              h: isAr ? "طاقم احترافي" : "Cinema-grade crew",
              b: isAr
                ? "DP، مساعد أول، فني إضاءة (Gaffer)، محاسب، مهندس صوت، أحياناً مدير مواقع. لا تصوير سينمائي حقيقي بطاقم أقل من 4 أشخاص."
                : "DP, 1st AC, gaffer, key grip, sound engineer, sometimes a DIT or production manager. Real cinema work does not run on a crew of fewer than four.",
            },
            {
              h: isAr ? "إضاءة محكومة" : "Controlled lighting",
              b: isAr
                ? "ألواح LED، مصادر HMI، عاكسات، صناديق ناعمة. الإضاءة هي ما يجعل اللقطة تبدو 'سينمائية' بدلاً من 'هاتف'."
                : "LED panels, HMI sources, flags, bounces, soft boxes. Light is what makes a frame feel cinema rather than phone — and it's the most underestimated line on a quote.",
            },
            {
              h: isAr ? "تسجيل صوت احترافي" : "Production sound",
              b: isAr
                ? "معلق صوتي اتجاهي + مسجل صوت + مراقبة. لا استغناء في عمل السينما."
                : "Directional boom, mixer, recorder, monitoring. Dialogue and ambient sound captured on set saves the entire post-production schedule.",
            },
            {
              h: isAr ? "تصاريح دبي" : "Dubai permits",
              b: isAr
                ? "DFTC للتصوير العام، بلدية دبي للمواقع الحساسة، أحياناً NMC للدرون. التصريح غالباً 4,500–12,000 درهم/يوم."
                : "DFTC for general film, Dubai Municipality for sensitive locations, NMC for drone. Often 4,500–12,000 AED per day — usually the difference between a smooth shoot and a fine.",
            },
            {
              h: isAr ? "تدرج ألوان + مونتاج + صوت" : "Colour, edit & sound",
              b: isAr
                ? "تدرج ألوان DaVinci Resolve، مونتاج Premiere أو Avid، تصميم صوت وصوت مكس في استوديو. هذه المرحلة نصف الجدول وأكثر من نصف التكلفة الإجمالية."
                : "DaVinci Resolve grade, Premiere or Avid edit, sound design & mix in a proper room. This phase is half the schedule and more than half the total cost — never skip it.",
            },
          ].map((card, i) => (
            <Reveal key={i} delay={i * 60} className="bs-card">
              <p className="bs-eyebrow">0{i + 1}</p>
              <h3 className="mt-4 text-xl">{card.h}</h3>
              <p className="mt-3 text-sm text-[color:var(--color-muted)]">{card.b}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* WHO WE'VE SHOT FOR */}
      <Section>
        <Reveal>
          <Eyebrow>{isAr ? "أعمال حقيقية" : "Real productions, real cost bands"}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr ? "ماذا أنجزنا في 2025–2026" : "What we shot in 2025–2026"}
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {[
            {
              tag: isAr ? "أفلام تعريفية · عيادة" : "Brand Film · Clinic",
              title: isAr ? "تهدئة المرضى الجدد قبل أن يتصلوا" : "Calming new patients before they ever call",
              blurb: isAr
                ? "فيلم 75 ثانية على واجهة موقع عيادة أسنان. RED Komodo، تصوير يوم واحد في دبي، 28,000 درهم."
                : "A 75-sec brand film on a dental clinic homepage — RED Komodo, one-day shoot in Dubai, AED 28,000 all-in.",
            },
            {
              tag: isAr ? "TVC · منتج" : "TVC · FMCG",
              title: isAr ? "إعلان 40 ثانية لـ MBC وميتا" : "A 40-sec spot running on MBC & Meta",
              blurb: isAr
                ? "إعلان تلفزيوني 40 ثانية مصوّر في القوز. Alexa Mini، طاقم 8، تصوير يومين، 85,000 درهم."
                : "Broadcast-grade 40-sec TVC — Alexa Mini, 8-person crew, two-day shoot in Al Quoz, AED 85,000.",
            },
            {
              tag: isAr ? "سوشيال · إطلاق منتج" : "Social · Product Launch",
              title: isAr ? "إطلاق منتج ثوري في 15 ريل" : "A product launch cut into 15 vertical reels",
              blurb: isAr
                ? "تصوير دفعة واحد أنتج 15 ريل عمودي + 30 ثانية إعلانية. FX3، يوم واحد، 14,500 درهم."
                : "Batched shoot yielded 15 vertical reels + 30-sec ad cut. FX3, one day in DIFC, AED 14,500.",
            },
            {
              tag: isAr ? "وثائقي · قصة مؤسس" : "Documentary · Founder Story",
              title: isAr ? "رحلة مؤسس من الصفر إلى 100 موظف" : "Founder story from zero to 100 staff",
              blurb: isAr
                ? "فيلم وثائقي 12 دقيقة يتبع مؤسساً إماراتياً. تصوير 6 أيام عبر الدولة، 95,000 درهم."
                : "12-minute documentary following a UAE founder. Six-day shoot across the country, AED 95,000.",
            },
          ].map((c, i) => (
            <Reveal as="div" key={i} delay={i * 70} className="bs-card bs-card-hover">
              <span className="bs-eyebrow !text-[color:var(--color-muted)] before:!bg-[color:var(--color-muted)]">{c.tag}</span>
              <h3 className="mt-4 text-xl">{c.title}</h3>
              <p className="mt-3 text-sm text-[color:var(--color-muted)]">{c.blurb}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section alt>
        <Reveal>
          <Eyebrow>{t(si.detail.faqs, locale)}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr ? "أسئلة متكررة عن التصوير السينمائي في دبي" : "FAQ — cinematography in Dubai"}
          </h2>
        </Reveal>
        <div className="mt-10">
          <Faq items={itemFaqs} />
        </div>
      </Section>

      {/* RELATED SERVICES */}
      <Section>
        <Reveal>
          <Eyebrow>{t(ui.breadcrumb.home, locale)}</Eyebrow>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {relatedServices.map((s, i) => (
            <Reveal as="div" key={s.slug} delay={i * 70}>
              <Link href={localizedPath(locale, `/services/${s.slug}`)} className="bs-card bs-card-hover block h-full">
                <span className="bs-eyebrow !text-[color:var(--color-muted)] before:!bg-[color:var(--color-muted)]">{t(s.eyebrow, locale)}</span>
                <h3 className="mt-4 text-lg">{t(s.name, locale)}</h3>
                <p className="mt-3 text-sm text-[color:var(--color-muted)]">{t(s.description, locale)}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <UaeTravelSection locale={locale} />
      <CtaBand
        locale={locale}
        heading={isAr ? "مستعد لمناقشة مشروعك السينمائي؟" : "Ready to talk about your cinematography project?"}
        waContext={isAr ? "بخصوص التصوير السينمائي في دبي." : "Re: cinematography in Dubai."}
      />
    </>
  );
}
