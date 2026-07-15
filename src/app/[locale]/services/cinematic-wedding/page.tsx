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

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return pageMeta({
    locale,
    title: isAr
      ? "زفاف سينمائي في دبي | تصوير سينمائي للزفاف بشركة بيك ستوري"
      : "Cinematic Wedding in Dubai | RED Komodo X Wedding Film | Big Story",
    description: isAr
      ? "باقة الزفاف السينمائي في دبي — RED Komodo X، طاقم سينمائي، تشويق في نفس اليوم، فيلم 8-12 دقيقة بتدرج ألوان احترافي. باقات AED 18,500 و AED 35,000."
      : "The Cinematic Wedding package in Dubai — RED Komodo X cinema camera, dedicated film director, same-day teaser, 8–12 min colour-graded film. Packages from AED 18,500 to AED 35,000.",
    path: "/services/cinematic-wedding",
  });
}

const COPY = {
  eyebrow: { en: "Cinematic Wedding in Dubai", ar: "زفاف سينمائي في دبي" },
  h1: {
    en: "Cinematic Wedding in Dubai — what it costs, what's included, and how to book it",
    ar: "الزفاف السينمائي في دبي — التكاليف، ما يتضمنه، وكيف تحجزه",
  },
  lead: {
    en: "Cinematic Wedding is Big Story's premium wedding package — the same cinema craft we'd bring to a brand film, applied to your wedding day. RED Komodo X as the A-camera, a dedicated film director, 2–3 cinema-grade cinematographers, licensed drone, full sound design and a color-graded 8–12 minute film that holds up on a cinema screen. Two tiers: AED 18,500 (Basic) and AED 35,000 (Premium, two-day, same-day teaser). Built for couples who've already booked a wedding planner and want their film to feel as cinematic as the rest of the day.",
    ar: "الزفاف السينمائي هو باقة الزفاف الراقية من بيك ستوري — نفس حرفة السينما التي نطبقها في الأفلام التعريفية، مطبّقة على يوم زفافك. RED Komodo X كاميرا رئيسية، ومخرج فيلم مخصص، و2–3 مصورين سينمائيين، ودرون مرخص، وتصميم صوت كامل، وفيلم 8–12 دقيقة بتدرج ألوان سينمائي يصمد على شاشة سينما. باقتان: 18,500 درهم (الأساسية) و 35,000 درهم (المتميزة، يومان، تشويق في نفس اليوم). للأزواج الذين حجزوا منظم زفاف ويريدون أن يبدو فيلمهم سينمائياً كاليوم نفسه.",
  },
  statsHeading: { en: "Cinematic Wedding by the numbers — 2026", ar: "الزفاف السينمائي بالأرقام — 2026" },
  statsBody: {
    en: "Data from Big Story's 2025–2026 wedding bookings, RED Komodo X rental ledger, and feedback from luxury wedding planners (Cherniak Events, Eventchic, The Qode). Every figure below is sourced and dated.",
    ar: "بيانات من حجوزات الزفاف لدى بيك ستوري 2025–2026، وسجل تأجير RED Komodo X، وردود فعل من منظمي الزفاف الراقيين (Cherniak Events, Eventchic, The Qode). كل رقم أدناه مُصدر ومؤرشف.",
  },
  stat1: { en: "RED Komodo X", ar: "RED Komodo X" },
  stat1Label: { en: "A-camera on every Cinematic Wedding — cinema-grade 6K Super 35 colour science", ar: "الكاميرا الرئيسية في كل زفاف سينمائي — لون سينمائي Super 35 بدقة 6K" },
  stat2: { en: "AED 18,500 → 35,000", ar: "18,500 ← 35,000 درهم" },
  stat2Label: { en: "Two pricing tiers: Basic (AED 18,500) and Premium (AED 35,000, two-day, same-day teaser)", ar: "باقتان: الأساسية 18,500 درهم والمتميزة 35,000 درهم (يومان، تشويق في نفس اليوم)" },
  stat3: { en: "10pm", ar: "10 مساءً" },
  stat3Label: { en: "Same-day teaser delivered by 10pm on the ceremony night (Premium tier)", ar: "تشويق في نفس اليوم يُسلّم قبل 10 مساءً ليلة الحفل (الباقة المتميزة)" },
  stat4: { en: "8–12 min", ar: "8–12 دقيقة" },
  stat4Label: { en: "Final colour-graded film length, story-driven edit (not a slide-show reel)", ar: "مدة الفيلم النهائي بتدرج الألوان، مونتاج سردي لا عرض شرائح" },
};

const faqItems = {
  en: [
    {
      q: "What is a Cinematic Wedding?",
      a: "Cinematic Wedding is our premium wedding package — the same cinema craft we'd bring to a brand film, applied to your wedding day. The A-camera is a RED Komodo X (cinema-grade 6K Super 35) and the shoot is led by a dedicated film director supported by 2–3 cinema-grade cinematographers. The final deliverable is an 8–12 minute color-graded film in DaVinci Resolve Studio with full sound design and licensed music — built to hold up on a cinema screen, not just a phone.",
    },
    {
      q: "How much does a Cinematic Wedding cost in Dubai?",
      a: "Two tiers: Basic is AED 18,500 and includes RED Komodo X as the A-camera, 2 cinematographers, 2 ACs, 1 licensed drone, 6-hour coverage (ceremony + reception), and an 8–12 minute color-graded final film with a same-day teaser delivered the next morning. Premium is AED 35,000 and includes RED Komodo X + 2× Sony FX3 (3 cameras), 5 ACs, a dedicated film director, 1 licensed drone, two full days of coverage (Henna + Wedding), a same-day teaser delivered by 10pm on the ceremony night, full sound design + custom score, and a 60-sec social cut. Both tiers run a 2-month pre-production planning phase.",
    },
    {
      q: "Why RED Komodo X — why not just any camera?",
      a: "RED Komodo X gives us cinema-grade 6K Super 35 with REDWideGamutRGB colour science and 16.5+ stops of dynamic range. That's the same colour science Netflix, Amazon and most UAE TVCs shoot on. The image holds up on a cinema screen, in a 4K TV hanging in your living room, and at 60fps on Instagram — three different delivery sizes from one master. Lighter mirrorless or FX3 wedding packages can't reproduce that grade.",
    },
    {
      q: "What's the difference between Cinematic Wedding and a regular wedding film?",
      a: "A regular wedding film is captured on lighter cameras (FX3 / mirrorless), led by a lead videographer, and edited as a highlights reel (3–8 min slide-show style). Cinematic Wedding treats the wedding as a short film production: RED Komodo X A-cam, dedicated film director, storyboarded key moments, multi-camera coverage, cinema-grade colour grade, full sound design and licensed music. The deliverable is 8–12 minutes of story-driven edit, not 3 minutes of highlight. Price is 3–5× higher, the result is cinema-grade.",
    },
    {
      q: "When do we get the same-day teaser?",
      a: "On the Premium tier, the same-day teaser is delivered by 10pm on the ceremony night — about 4 hours after the ceremony ends. Two editors work in parallel: one on the teaser cut that gets delivered that night, one on the full 8–12 minute film for the 4-week post-production cycle. On the Basic tier, the teaser is delivered by the next morning. Same-day teaser turn-around is the most popular Premium upgrade — guests see the film that evening on the planner's screens.",
    },
    {
      q: "Do you handle the music licensing?",
      a: "Yes — both tiers include music licensing cleared for streaming and cinema screening. We use Musicbed, Artlist and a Dubai-based composer network for custom score (Premium). You will not get a YouTube copyright strike on your own wedding film. If you have a specific song you want included (a family song, a cultural piece), tell us at the planning phase and we'll clear it or substitute it.",
    },
    {
      q: "How long does the whole Cinematic Wedding process take?",
      a: "Two months of pre-production planning (venue scout, storyboard, music licensing, planner coordination), 1–2 days of shooting (Premium: Henna + Wedding; Basic: Wedding day only), then 4 weeks of post-production (edit, colour, sound design, revisions). Final deliverables drop at week 6 (Premium) or week 5 (Basic). Same-day teaser drops within 4 hours of ceremony end.",
    },
    {
      q: "Can we add drone footage and is a permit needed?",
      a: "Yes — drone is included in both tiers via DJI Inspire 3 with our licensed operator. Outdoor venues are usually fine; some Dubai hotels and DIFC require pre-approved drone permits (we handle the NMC paperwork). Burj Al Arab and Burj Khalifa can be tricky — if your venue is on the no-fly list, we'll either get a permit in advance, substitute a different angle (technocrane), or refund the AED 1,500 drone value.",
    },
    {
      q: "What if our wedding planner wants to refer us — how does that work?",
      a: "Most Dubai luxury weddings come in via the wedding planner (Cherniak, Eventchic, The Qode, Eyesome, Jannat, Hafla). We pay the planner a tiered commission on the Big Story portion of the package (12–15% depending on volume) — see our Partner Program for details. The planner stays in the loop on the shot list, run-of-show and venue logistics, but we own all creative and delivery decisions.",
    },
  ],
  ar: [
    {
      q: "ما هو الزفاف السينمائي؟",
      a: "الزفاف السينمائي هو باقتنا الراقية للزفاف — نفس حرفة السينما التي نطبقها في فيلم تعريفي، مطبّقة على يوم زفافك. الكاميرا الرئيسية RED Komodo X (سينمائية Super 35 بدقة 6K)، ويقود التصوير مخرج فيلم مخصص يدعمه 2–3 مصورين سينمائيين. المخرج النهائي فيلم 8–12 دقيقة بتدرج ألوان في DaVinci Resolve Studio مع تصميم صوت كامل وموسيقى مرخصة — مصمم ليبقى على شاشة سينما لا مجرد هاتف.",
    },
    {
      q: "كم تكلفة الزفاف السينمائي في دبي؟",
      a: "باقتان: الأساسية 18,500 درهم وتتضمن RED Komodo X كاميرا رئيسية، 2 مصورين، 2 مساعدين، درون مرخص، 6 ساعات تغطية (حفل + استقبال)، وفيلم نهائي 8–12 دقيقة بتدرج ألوان مع تشويق يُسلّم صباح اليوم التالي. المتميزة 35,000 درهم وتتضمن RED Komodo X + 2× Sony FX3 (3 كاميرات)، 5 مساعدين، مخرج فيلم مخصص، درون مرخص، يومين كاملين تغطية (حناء + زفاف)، تشويق يُسلّم قبل 10 مساءً ليلة الحفل، تصميم صوت كامل + موسيقى مخصصة، وقص سوشيال 60 ثانية. كلتا الباقتين تتضمنان شهرين تخطيط ما قبل الإنتاج.",
    },
    {
      q: "لماذا RED Komodo X — لماذا لا أي كاميرا؟",
      a: "RED Komodo X تمنحنا سينمائية 6K Super 35 مع علم ألوان REDWideGamutRGB ونطاق ديناميكي 16.5+ ستوب. نفس علم الألوان المستخدم من Netflix وAmazon ومعظم الإعلانات التلفزيونية في الإمارات. الصورة تصمد على شاشة سينما، وعلى تلفزيون 4K في صالة منزلك، و60 إطار في الثانية على إنستغرام — ثلاثة أحجام تسليم مختلفة من نسخة رئيسية واحدة. باقات المرايا الأخف أو FX3 للزفاف لا تستطيع إعادة إنتاج هذا التدرج.",
    },
    {
      q: "ما الفرق بين الزفاف السينمائي وفيلم الزفاف العادي؟",
      a: "فيلم الزفاف العادي يُصوَّر بكاميرات أخف (FX3/مرايا)، يقوده مصور فيديو رئيسي، ويُعد كمونتاج ملخص (3–8 دقائق بأسلوب شرائح). الزفاف السينمائي يعامل الزفاف كإنتاج فيلم قصير: RED Komodo X كاميرا رئيسية، مخرج فيلم مخصص، لحظات رئيسية مخطوطة بقصة، تغطية بكاميرات متعددة، تدرج ألوان سينمائي، تصميم صوت كامل وموسيقى مرخصة. المخرج 8–12 دقيقة مونتاج سردي، لا 3 دقائق ملخص. السعر 3–5 أضعاف، النتيجة بمستوى سينمائي.",
    },
    {
      q: "متى نحصل على تشويق نفس اليوم؟",
      a: "في الباقة المتميزة، يُسلّم تشويق نفس اليوم قبل 10 مساءً ليلة الحفل — حوالي 4 ساعات بعد نهاية الحفل. يعمل محرران بالتوازي: واحد على نسخة التشويق التي تُسلّم تلك الليلة، وواحد على الفيلم الكامل 8–12 دقيقة لدورة ما بعد الإنتاج البالغة 4 أسابيع. في الباقة الأساسية، يُسلّم التشويق صباح اليوم التالي. تسليم تشويق في نفس اليوم هو الترقية الأكثر شيوعاً في الباقة المتميزة — الضيوف يرون الفيلم تلك الأمسية على شاشات منظم الحفل.",
    },
    {
      q: "هل تتولون ترخيص الموسيقى؟",
      a: "نعم — كلتا الباقتين تتضمنان ترخيص موسيقى للبث والعرض السينمائي. نستخدم Musicbed وArtlist وشبكة ملحنين في دبي للموسيقى المخصصة (المتميزة). لن تتلقى إنذار حقوق نشر على YouTube على فيلم زفافك. إذا كانت لديك أغنية محددة تريد إدراجها (أغنية عائلية، قطعة ثقافية)، أخبرنا في مرحلة التخطيط وسنرخصها أو نستبدلها.",
    },
    {
      q: "كم تستغرق عملية الزفاف السينمائي كاملة؟",
      a: "شهران تخطيط ما قبل الإنتاج (استطلاع موقع، سيناريو، ترخيص موسيقى، تنسيق مع المنظم)، 1–2 يوم تصوير (المتميزة: حناء + زفاف؛ الأساسية: يوم الزفاف فقط)، ثم 4 أسابيع ما بعد الإنتاج (مونتاج، ألوان، تصميم صوت، مراجعات). المخرجات النهائية في الأسبوع 6 (المتميزة) أو 5 (الأساسية). تشويق نفس اليوم يُسلّم خلال 4 ساعات من نهاية الحفل.",
    },
    {
      q: "هل يمكن إضافة لقطات درون وهل نحتاج تصريحاً؟",
      a: "نعم — الدرون مشمول في كلتا الباقتين عبر DJI Inspire 3 مع مشغلنا المرخص. المواقع الخارجية عادةً مقبولة؛ بعض فنادق دبي ومركز دبي المالي العالمي تتطلب تصاريح درون معتمدة مسبقاً (نتعامل مع أوراق NMC). برج العرب وبرج خليفة قد يكونان صعبين — إذا كان موقعك في قائمة الحظر، سنحصل على التصريح مسبقاً، أو نستبدل زاوية مختلفة (تكنوكرين)، أو نرد قيمة 1,500 درهم للدرون.",
    },
    {
      q: "ماذا لو أراد منظم الزفاف إحالتنا — كيف يعمل ذلك؟",
      a: "معظم حفلات الزفاف الراقية في دبي تأتي عبر منظم الزفاف (Cherniak, Eventchic, The Qode, Eyesome, Jannat, Hafla). ندفع للمنظم عمولة متدرجة على حصة بيك ستوري من الباقة (12–15% حسب الحجم) — راجع برنامج الشركاء للتفاصيل. يبقى المنظم على اطلاع بقائمة اللقطات والجدول والخدمات اللوجستية للموقع، لكننا نمتلك جميع قرارات الإبداع والتسليم.",
    },
  ],
};

const relatedServices = services.filter((s) =>
  ["tvc-production", "brand-films", "event-coverage", "product-videos"].includes(s.slug)
);

export default async function CinematicWeddingPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const path = "/services/cinematic-wedding";
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
            name: isAr ? "زفاف سينمائي في دبي" : "Cinematic Wedding in Dubai",
            description: isAr
              ? "باقة الزفاف السينمائي من بيك ستوري — RED Komodo X، مخرج فيلم مخصص، تشويق في نفس اليوم، فيلم 8–12 دقيقة بتدرج ألوان سينمائي."
              : "Big Story's Cinematic Wedding package in Dubai — RED Komodo X, dedicated film director, same-day teaser, 8–12 min cinema-grade colour-graded film. AED 18,500–35,000.",
            path,
            areaServed: ["Dubai", "Abu Dhabi", "Sharjah"],
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
            <a href={waLink(isAr ? "مهتم بباقة الزفاف السينمائي في دبي." : "Interested in the Cinematic Wedding package in Dubai.")} target="_blank" rel="noopener noreferrer" className="bs-btn bs-btn-gold">
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

      {/* WHAT IS CINEMATIC WEDDING (vs standard wedding) */}
      <Section>
        <div className="grid gap-12 md:grid-cols-2 md:items-start">
          <Reveal>
            <Eyebrow>{isAr ? "ما هو الزفاف السينمائي" : "What Cinematic Wedding actually means"}</Eyebrow>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
              {isAr
                ? "الزفاف السينمائي مقابل الزفاف العادي"
                : "Cinematic Wedding is not a regular wedding film"}
            </h2>
          </Reveal>
          <Reveal delay={80} className="bs-prose">
            {isAr ? (
              <>
                <p>
                  الزفاف السينمائي هو تطبيق حرفة صناعة السينما على يوم زفافك. الكاميرا الرئيسية RED Komodo X سينمائية 6K Super 35 مع علم ألوان REDWideGamutRGB، ومخرج فيلم مخصص يقود الشكل البصري، وطاقم من المصورين السينمائيين والمساعدين المحترفين، وتصميم صوت كامل وموسيقى مرخصة، وفيلم نهائي 8–12 دقيقة بتدرج ألوان DaVinci Resolve Studio — الفيلم يصمد على شاشة سينما لا مجرد هاتف.
                </p>
                <p>
                  باقة الزفاف العادية تصوّر الحدث بكاميرات أخف (FX3/مرايا) ويقودها مصور فيديو رئيسي. النتائج جيدة لكنها ليست سينمائية. استخدم الزفاف العادي إذا كان الإيجاز «أرنا ما حدث»، والزفاف السينمائي إذا كان الإيجاز «اجعل المشاهد يشعر بشيء — يوم زفافي كفيلم قصير».
                </p>
              </>
            ) : (
              <>
                <p>
                  Cinematic Wedding is the application of feature-film craft to your wedding day. The A-camera is a RED Komodo X (cinema-grade 6K Super 35) with REDWideGamutRGB colour science. A dedicated film director shapes the visual narrative. A crew of cinema-grade cinematographers and ACs runs the cameras. The final deliverable is an 8–12 minute film in DaVinci Resolve Studio with full sound design and licensed music — built to hold up on a cinema screen, not just a phone.
                </p>
                <p>
                  A regular wedding film captures the event on lighter cameras (FX3 / mirrorless) and is led by a lead videographer. The results are good but they are not cinematic. Use a regular wedding film when the brief is "show what happened"; use Cinematic Wedding when the brief is "make the viewer feel something — my wedding day as a short film." The two formats live at different ends of the same speed–quality spectrum, and most luxury weddings end up at the Cinematic end.
                </p>
              </>
            )}
          </Reveal>
        </div>
      </Section>

      {/* WHAT GOES INTO A CINEMATIC WEDDING SHOOT */}
      <Section alt>
        <Reveal>
          <Eyebrow>{isAr ? "ماذا يتضمن الزفاف السينمائي" : "What goes into a Cinematic Wedding"}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr
              ? "ستة عناصر لزفاف سينمائي حقيقي"
              : "Six elements of a true Cinematic Wedding"}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              h: isAr ? "RED Komodo X والمخرج" : "RED Komodo X + Film Director",
              b: isAr
                ? "الكاميرا الرئيسية RED Komodo X سينمائية (6K Super 35، REDWideGamutRGB). يقود التصوير مخرج فيلم مخصص — ليس مصور فيديو عادي — يوجه شكل اللقطة والإيقاع."
                : "The A-camera is a RED Komodo X cinema-grade (6K Super 35, REDWideGamutRGB). A dedicated film director — not just a lead videographer — shapes the look, the pace and the story.",
            },
            {
              h: isAr ? "طاقم سينمائي مخصص" : "Dedicated cinema crew",
              b: isAr
                ? "2–3 مصورين سينمائيين، مساعدون (ACs) لكل كاميرا، مساعد إنتاج. الأساسي: 2 مصورين + 2 ACs. المتميزة: 2 مصورين + مخرج مخصص + 5 ACs + مشغل درون مرخص."
                : "2–3 cinema-grade cinematographers, ACs per camera, plus a drone operator. Basic: 2 cinematographers + 2 ACs. Premium: 2 cinematographers + film director + 5 ACs + licensed drone operator.",
            },
            {
              h: isAr ? "إضاءة محكومة + تصوير سينمائي" : "Controlled lighting + cinema colour",
              b: isAr
                ? "ألواح Aputure 600D + ARRI SkyPanel للإضاءة المحكومة في الاستقبال والفعاليات المسائية. الكاميرا سينمائية = تدرج ألوان غني يحاكي فيلم NETFLIX راقٍ."
                : "Aputure 600D + ARRI SkyPanel controlled lighting for indoor and evening segments. The cinema camera = rich colour grade on par with premium Netflix productions.",
            },
            {
              h: isAr ? "صوت احترافي + ترخيص موسيقى" : "Production sound + licensed score",
              b: isAr
                ? "لافات Sennheiser لاسلكية لالتقاط النذور والكلمات بوضوح. تصميم صوت كامل في استوديو + ترخيص موسيقى Musicbed/Artlist للبث والعرض السينمائي — لا إنذارات حقوق نشر."
                : "Sennheiser wireless lavs capturing vows and speeches clean. Full sound design + Musicbed/Artlist music licensing cleared for streaming and cinema screening — no copyright strikes.",
            },
            {
              h: isAr ? "درون مرخص متكامل" : "Licensed drone integrated",
              b: isAr
                ? "DJI Inspire 3 مع مشغل مرخص، مدمج في قائمة لقطات المخرج. التصاريح (NMC) نتولاها نحن. بورج العرب وبرج خليفة قد يتطلبان ترتيبات مسبقة."
                : "DJI Inspire 3 with our licensed operator, integrated into the director's shot list. NMC permits handled by us. Burj Al Arab and Burj Khalifa may need pre-arrangement.",
            },
            {
              h: isAr ? "تدرج ألوان + مونتاج + تصميم صوت" : "DaVinci Resolve colour + cinema edit",
              b: isAr
                ? "تدرج ألوان في DaVinci Resolve Studio (نفس خط أنابيب التدرج لفلم TVC)، مونتاج سينمائي 8–12 دقيقة، تصميم صوت كامل، وقص سوشيال 60 ثانية (المتميزة)."
                : "Colour grade in DaVinci Resolve Studio (same pipeline as a TVC grade), story-driven 8–12 min edit, full sound design, plus a 60-sec social cut (Premium).",
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

      {/* WHO WE'VE SHOT FOR — Cinematic Wedding case studies */}
      <Section>
        <Reveal>
          <Eyebrow>{isAr ? "أعمال حقيقية" : "Real weddings, real budgets"}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr ? "تطبيقات الزفاف السينمائي في 2025–2026" : "Cinematic Wedding deliveries in 2025–2026"}
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {[
            {
              tag: isAr ? "زفاف فاخر · موقع خاص" : "Luxury Wedding · Private Estate",
              title: isAr ? "زفاف 3 أيام بفيلم 11 دقيقة على RED Komodo" : "3-day wedding, 11-min cinema-grade film on RED Komodo X",
              blurb: isAr
                ? "حفل زفاف فاخر على عقار خاص في Palm Jumeirah. الباقة المتميزة: RED Komodo X + 2× FX3، طاقم 11، ليلة حناء + يوم الزفاف + حفل ما بعد الزفاف. فيلم 11 دقيقة بتدرج ألوان سينمائي. AED 35,000."
                : "A luxury wedding at a private Palm Jumeirah estate. Premium tier: RED Komodo X + 2× FX3, 11-person crew, Henna night + Wedding day + post-wedding brunch. 11-min cinema-grade film. AED 35,000.",
            },
            {
              tag: isAr ? "زفاف متوسط · فندق أتلانتس" : "Mid-Tier Wedding · Atlantis",
              title: isAr ? "تشويق قبل 10 مساءً + فيلم 9 دقائق" : "Same-day teaser by 10pm + 9-min story-driven film",
              blurb: isAr
                ? "زفاف 250 ضيف في فندق أتلانتس The Palm. الباقة المتميزة. تشويق 90 ثانية سُلّم قبل 10 مساءً، فيلم 9 دقائق بعد 4 أسابيع. AED 33,500 (شامل رسوم الفندق للفريق)."
                : "A 250-guest wedding at Atlantis The Palm. Premium tier. 90-sec same-day teaser delivered by 10pm; 9-min final film 4 weeks later. AED 33,500 (incl. hotel crew fees).",
            },
            {
              tag: isAr ? "سهرة حناء عربية" : "Arabic Henna Night",
              title: isAr ? "حفل حناء بسياق ثقافي، فصل ذكور/إناث مغطى" : "Henna night with cultural context — gender-segregated rooms filmed",
              blurb: isAr
                ? "ليلة حناء لـ 400 ضيف في منتجع خارجي. طاقم منفصل للإناث (مصور سينمائي + مساعدة) والذكور. الباقة المتميزة. AED 35,000 مع تكاليف طاقم إضافية."
                : "Henna night for 400 guests at a desert resort. Split crew for women + men (with female cinematographer + AC for women's side). Premium tier. AED 35,000 with extra crew costs.",
            },
            {
              tag: isAr ? "زفاف دولي · مخططة Cherniak" : "International Wedding · Cherniak Planner",
              title: isAr ? "زفاف متعدد الثقافات مع ترجمة ثقافية" : "Multi-cultural wedding with cross-cultural choreography",
              blurb: isAr
                ? "زفاف هندي-أمريكي بتنسيق من Cherniak Events. 350 ضيف، حفلين متتاليين، فريق 9. الباقة الأساسية بسعر مخصص للحجم. AED 22,000."
                : "Indian-American wedding choreographed by Cherniak Events. 350 guests, two back-to-back ceremonies, crew of 9. Custom-priced Basic tier for volume. AED 22,000.",
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
            {isAr ? "أسئلة متكررة عن الزفاف السينمائي في دبي" : "FAQ — Cinematic Wedding in Dubai"}
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

      <CtaBand
        locale={locale}
        heading={isAr ? "مستعد لمناقشة زفافك السينمائي؟" : "Ready to talk about your Cinematic Wedding?"}
        waContext={isAr ? "بخصوص باقة الزفاف السينمائي في دبي." : "Re: Cinematic Wedding package in Dubai."}
      />
    </>
  );
}
