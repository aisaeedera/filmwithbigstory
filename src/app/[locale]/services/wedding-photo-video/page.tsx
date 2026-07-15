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
      ? "زفاف صور + فيديو | باقة AED 6,000+ | بيك ستوري"
      : "Wedding Photo + Video | AED 6,000+ Bundle | Big Story",
    description: isAr
      ? "باقة زفاف صور + فيديو في دبي — يوم كامل AED 6,000 (صور) + ريل 3–8 دقائق AED 3,500–6,000 (فيديو). طاقم واحد، موقع واحد، إضاءة واحدة."
      : "Wedding photo + video bundle in Dubai — full-day photography AED 6,000 + 3–8 min highlight reel AED 3,500–6,000. One crew, one venue, one setup.",
    path: "/services/wedding-photo-video",
  });
}

const COPY = {
  eyebrow: { en: "Wedding Photo + Video", ar: "زفاف صور + فيديو" },
  h1: {
    en: "Wedding Photo + Video Bundle in Dubai — the most popular wedding booking",
    ar: "باقة زفاف صور + فيديو في دبي — الحجز الأكثر شعبية",
  },
  lead: {
    en: "Big Story's most-booked wedding package combines full-day photography (AED 6,000) with a 3-minute or 8-minute highlight reel (AED 3,500–6,000) — same crew on site, same venue, same lighting setup, one consolidated invoice. The photographer and the videographer work in parallel: the photographer shoots stills on a Sony A7R V, the videographer shoots motion on a Sony FX3, both with the same shot list and run-of-show. Total bundle from AED 9,500 (full day photo + 3-min reel) to AED 12,000 (full day photo + 8-min reel).",
    ar: "الباقة الأكثر حجزاً في بيك ستوري تجمع تصوير يوم كامل (6,000 درهم) مع ريل ملخص 3 أو 8 دقائق (3,500–6,000 درهم) — نفس الطاقم في الموقع، نفس الموقع، نفس إعداد الإضاءة، فاتورة موحدة. المصور الفوتوغرافي ومصور الفيديو يعملان بالتوازي: المصور يصور صوراً ثابتة على Sony A7R V، ومصور الفيديو يصور حركة على Sony FX3، كلاهما بنفس قائمة اللقطات والجدول. إجمالي الباقة من 9,500 درهم (صور يوم كامل + ريل 3 دقائق) إلى 12,000 درهم (صور يوم كامل + ريل 8 دقائق).",
  },
  statsHeading: { en: "Photo + video weddings by the numbers — 2026", ar: "زفاف الصور + الفيديو بالأرقام — 2026" },
  statsBody: {
    en: "From Big Story's 2025–2026 wedding booking data — what percentage of couples book the bundle, the average add-on value, and the most common upgrades. All figures from our own wedding CRM.",
    ar: "من بيانات حجز زفاف بيك ستوري 2025–2026 — نسبة الأزواج الذين يحجزون الباقة، متوسط قيمة الإضافات، والترقيات الأكثر شيوعاً. كل الأرقام من CRM الزفاف لدينا.",
  },
  stat1: { en: "AED 9,500+", ar: "9,500+ درهم" },
  stat1Label: { en: "Bundle price starting point (full-day photo AED 6,000 + 3-min reel AED 3,500)", ar: "نقطة بداية سعر الباقة (صور يوم كامل 6,000 + ريل 3 دقائق 3,500)" },
  stat2: { en: "74%", ar: "74٪" },
  stat2Label: { en: "Wedding bookings in 2025 that bundled photo + video (vs 51% in 2023)", ar: "حجوزات الزفاف في 2025 التي جمعت الصور + الفيديو (مقابل 51٪ في 2023)" },
  stat3: { en: "AED 1,950", ar: "1,950 درهم" },
  stat3Label: { en: "Average add-on value per photo + video booking (drone, album, 2nd shooter, retouching)", ar: "متوسط قيمة الإضافات لكل حجز صور + فيديو (درون، ألبوم، مصور ثانٍ، تنقيح)" },
  stat4: { en: "1 crew", ar: "طاقم واحد" },
  stat4Label: { en: "One photographer + one videographer + one assistant = one crew, one site fee, one venue walkthrough", ar: "مصوّر + مصور فيديو + مساعد = طاقم واحد، رسوم موقع واحدة، استطلاع موقع واحد" },
};

const faqItems = {
  en: [
    {
      q: "What's the cost of the photo + video wedding bundle?",
      a: "The bundle starts at AED 9,500 for full-day photography (AED 6,000) + 3-minute highlight reel (AED 3,500). The most common booking is AED 12,000: full-day photo (AED 6,000) + 8-minute reel (AED 6,000). Add-ons: drone (AED 1,500), same-day teaser (AED 4,500), 2nd photographer (AED 2,200/day), 2nd videographer (AED 2,500/day), printed album (AED 3,500 for 40 pages), premium retouching (AED 80/image).",
    },
    {
      q: "Why is the bundle cheaper than booking photo and video separately?",
      a: "When you book photo and video separately, each crew does its own venue walkthrough, has its own site fee (if charged by the venue), brings its own lighting kit, and runs its own setup time. The bundle shares all of that — one walkthrough, one site fee (the venue charges us once), one lighting kit, one setup. We pass the saving to you: typically 15–25% off the equivalent standalone bookings. We also save the venue time, which means the wedding planner is happier.",
    },
    {
      q: "Do the photographer and videographer get in each other's way?",
      a: "No — that's the whole point of the bundle. Before the wedding day we share the run-of-show and the shot list with both. On the day, the photographer positions for the still (slightly off-axis from the action), the videographer positions for the motion (closer to the action or on a slider). They are different disciplines with different framing instincts. The 60+ photo + video weddings we shoot every year run smoothly because the two lead creatives have worked together many times and know each other's blocking.",
    },
    {
      q: "What if I want photo only at the ceremony and video only at the reception?",
      a: "Common split — about 20% of photo + video bookings ask for this. The photographer covers the ceremony + family formals (4 hours), the videographer covers the reception (5 hours), both meet for the first dance. We scope this as a 'hybrid' booking and the price is the same as the equivalent bundle (AED 9,500–12,000). The split is fine because there's no overlap and no double coverage at any moment — every minute of the day is covered by exactly one camera.",
    },
    {
      q: "Can I add a same-day teaser to the bundle?",
      a: "Yes — AED 4,500 for the same-day teaser add-on. The teaser is a 30–90 second edit of the ceremony highlights delivered by 10pm on the wedding night. Two of our editors work in parallel: one on the teaser that evening, one on the full highlight reel for the 3–4 week post-production cycle. Same-day teaser is the most popular upgrade on photo + video bundles — about 40% of our Premium photo + video bookings include it.",
    },
    {
      q: "Do you deliver photo and video at the same time?",
      a: "Different turnaround times. Photos are delivered within 5–7 working days (the edited gallery). Videos are delivered within 3–4 weeks (3-min reel: 3 weeks; 8-min reel: 4 weeks). The reason: photo editing is faster because we're picking and colour-grading existing stills; video editing takes longer because we assemble, colour-grade, sound-design and license music for a 3–8 minute film. We send both deliveries to the same email and same online gallery so you don't have to track them separately.",
    },
    {
      q: "What if our venue only allows one outside crew?",
      a: "Common restriction at some Dubai hotels (Atlantis, Burj Al Arab, One&Only Royal Mirage). Our photo + video bundle counts as one crew because the photographer and videographer are both Big Story staff on the same contract — they arrive together, set up together, and leave together. The venue sees one company, one insurance certificate, one contact number. This is much easier than trying to bring two separate companies, which some venues won't allow.",
    },
  ],
  ar: [
    {
      q: "كم تكلفة باقة الصور + الفيديو للزفاف؟",
      a: "تبدأ الباقة من 9,500 درهم لتصوير يوم كامل (6,000 درهم) + ريل ملخص 3 دقائق (3,500 درهم). الحجز الأكثر شيوعاً 12,000 درهم: صور يوم كامل (6,000 درهم) + ريل 8 دقائق (6,000 درهم). الإضافات: درون (1,500 درهم)، تشويق نفس اليوم (4,500 درهم)، مصور ثانٍ (2,200 درهم/يوم)، مصور فيديو ثانٍ (2,500 درهم/يوم)، ألبوم مطبوع (3,500 درهم لـ 40 صفحة)، تنقيح متميز (80 درهم/صورة).",
    },
    {
      q: "لماذا الباقة أرخص من حجز الصور والفيديو منفصلين؟",
      a: "عندما تحجز الصور والفيديو منفصلين، كل طاقم يقوم باستطلاع موقعه الخاص، ويدفع رسوم موقع خاصة به (إذا طلبها الفندق)، ويُحضر عدة إضاءة خاصة به، ووقت إعداد خاص به. الباقة تشارك كل ذلك — استطلاع واحد، رسوم موقع واحدة (الفندق يتقاضانا مرة واحدة)، عدة إضاءة واحدة، إعداد واحد. نمرر التوفير لك: عادة 15–25٪ أقل من الحجوزات المستقلة المعادلة. نوفر وقت الفندق أيضاً، مما يعني منظم الزفاف أكثر سعادة.",
    },
    {
      q: "هل يتعارض المصور الفوتوغرافي ومصور الفيديو مع بعضهما البعض؟",
      a: "لا — هذه هي نقطة الباقة كاملة. قبل يوم الزفاف نشارك الجدول وقائمة اللقطات مع الاثنين. في اليوم، المصور يتموضع للقطات الثابتة (قليلاً خارج محور الفعل)، ومصور الفيديو يتموضع للحركة (أقرب إلى الفعل أو على slider). إنهما تخصصان مختلفان بغريزة تأطير مختلفة. حفلات الزفاف الـ 60+ صور + فيديو نصورها سنوياً تسير بسلاسة لأن المبدعين الرئيسيين عملا معاً عدة مرات ويعرفان حجب بعضهما البعض.",
    },
    {
      q: "ماذا لو أردت صور فقط في الحفل وفيديو فقط في الاستقبال؟",
      a: "تقسيم شائع — حوالي 20٪ من حجوزات الصور + الفيديو تطلب هذا. المصور يغطي الحفل + صور عائلية (4 ساعات)، مصور الفيديو يغطي الاستقبال (5 ساعات)، يلتقيان للرقصة الأولى. نحدد هذا كحجز «هجين» والسعر هو نفسه المكافئ للباقة (9,500–12,000 درهم). التقسيم جيد لأنه لا يوجد تداخل ولا تغطية مزدوجة في أي لحظة — كل دقيقة من اليوم مغطاة بكاميرا واحدة بالضبط.",
    },
    {
      q: "هل يمكنني إضافة تشويق نفس اليوم إلى الباقة؟",
      a: "نعم — 4,500 درهم لإضافة تشويق نفس اليوم. التشويق هو مونتاج 30–90 ثانية لأبرز لحظات الحفل يُسلّم قبل 10 مساءً ليلة الزفاف. اثنان من محررينا يعملان بالتوازي: واحد على التشويق تلك الأمسية، وواحد على ريل الملخص الكامل لدورة ما بعد الإنتاج البالغة 3–4 أسابيع. تشويق نفس اليوم هو الترقية الأكثر شيوعاً على باقات الصور + الفيديو — حوالي 40٪ من حجوزات الصور + الفيديو المتميزة لدينا تشمله.",
    },
    {
      q: "هل تسلّمون الصور والفيديو في نفس الوقت؟",
      a: "مدد تسليم مختلفة. الصور تُسلّم خلال 5–7 أيام عمل (المعرض المعدل). الفيديو يُسلّم خلال 3–4 أسابيع (ريل 3 دقائق: 3 أسابيع؛ ريل 8 دقائق: 4 أسابيع). السبب: مونتاج الصور أسرع لأننا نختار ونُدرج ألوان صور ثابتة موجودة؛ مونتاج الفيديو يستغرق وقتاً أطول لأننا نجمع ونُدرج ألوان ونصمم صوت ونرخص موسيقى لفيلم 3–8 دقائق. نرسل كلا التسليمين إلى نفس البريد ونفس المعرض الإلكتروني حتى لا تضطر لتتبعهما منفصلين.",
    },
    {
      q: "ماذا لو كان موقعنا يسمح بطاقم خارجي واحد فقط؟",
      a: "قيد شائع في بعض فنادق دبي (أتلانتس، برج العرب، ون آند أونلي رويال ميراج). باقة الصور + الفيديو لدينا تُحسب كطاقم واحد لأن المصور الفوتوغرافي ومصور الفيديو كلاهما موظفان في بيك ستوري على نفس العقد — يصلا معاً، ويُعدان معاً، ويغادران معاً. الموقع يرى شركة واحدة، شهادة تأمين واحدة، رقم اتصال واحد. هذا أسهل بكثير من محاولة إحضار شركتين منفصلتين، وهو ما لا تسمح به بعض المواقع.",
    },
  ],
};

const relatedServices = services.filter((s) =>
  ["weddings", "cinematic-wedding", "wedding-photography", "wedding-videography"].includes(s.slug)
);

export default async function WeddingPhotoVideoPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const path = "/services/wedding-photo-video";
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
            datePublished: "2026-07-15",
            authorName: "Big Story Editorial",
          }),
          serviceSchema({
            locale,
            name: isAr ? "زفاف صور + فيديو" : "Wedding Photo + Video",
            description: isAr
              ? "باقة زفاف صور + فيديو في دبي — طاقم واحد، موقع واحد، فاتورة موحدة."
              : "Wedding photo + video bundle in Dubai — one crew, one venue, one consolidated invoice.",
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
            <a href={waLink(isAr ? "مهتم بباقة زفاف صور + فيديو في دبي." : "Interested in the wedding photo + video bundle in Dubai.")} target="_blank" rel="noopener noreferrer" className="bs-btn bs-btn-gold">
              {t(ui.nav.startYourProject, locale)}
            </a>
            <Button href={localizedPath(locale, "/services/weddings")} variant="ghost">
              {isAr ? "صفحة الزفاف الرئيسية" : "Main Weddings page"}
            </Button>
          </div>
        </Reveal>
      </Section>

      <Section alt>
        <Reveal>
          <Eyebrow>{t(COPY.statsHeading, locale)}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">{t(COPY.statsHeading, locale)}</h2>
          <p className="bs-lead mt-6 !max-w-3xl">{t(COPY.statsBody, locale)}</p>
        </Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-[color:var(--color-line)] sm:grid-cols-2 lg:grid-cols-4">
          <div className="bs-card !rounded-none flex flex-col justify-between bg-white p-8">
            <p className="bs-num text-[clamp(1.4rem,2.4vw,2rem)]">{t(COPY.stat1, locale)}</p>
            <p className="mt-4 text-sm text-[color:var(--color-muted)]">{t(COPY.stat1Label, locale)}</p>
          </div>
          <div className="bs-card !rounded-none flex flex-col justify-between bg-white p-8">
            <p className="bs-num">{t(COPY.stat2, locale)}</p>
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

      <Section>
        <Reveal>
          <Eyebrow>{isAr ? "مكونات الباقة" : "What's in the bundle"}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr ? "صور + فيديو من طاقم واحد في يوم واحد" : "Photo + video from one crew on one day"}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              tag: isAr ? "صور" : "Photo",
              h: isAr ? "يوم كامل من التصوير" : "Full-day photo coverage",
              b: isAr
                ? "مصور فوتوغرافي رئيسي + مساعد، 10 ساعات، 400–800 صورة معدلة، Sony A7R V 45MP، معرض إلكتروني خلال 5–7 أيام."
                : "Lead photographer + assistant, 10 hours, 400–800 edited images, Sony A7R V 45MP, online gallery within 5–7 days.",
            },
            {
              tag: isAr ? "فيديو" : "Video",
              h: isAr ? "ريل ملخص 3 أو 8 دقائق" : "3-min or 8-min highlight reel",
              b: isAr
                ? "مصور فيديو رئيسي + مساعد، Sony FX3 4K، ريل 3 دقائق (3,500 درهم) أو 8 دقائق (6,000 درهم)، قصة حفل 20–40 دقيقة."
                : "Lead videographer + assistant, Sony FX3 4K, 3-min reel (AED 3,500) or 8-min reel (AED 6,000), 20–40 min ceremony cut included.",
            },
            {
              tag: isAr ? "الطاقم" : "Crew",
              h: isAr ? "طاقم واحد، فاتورة واحدة" : "One crew, one invoice",
              b: isAr
                ? "مصوّر + مصور فيديو + مساعد = طاقم واحد من بيك ستوري. استطلاع موقع واحد، رسوم موقع واحدة، عدة إضاءة واحدة، تسليم واحد."
                : "Photographer + videographer + assistant = one Big Story crew. One venue walkthrough, one site fee, one lighting kit, one delivery.",
            },
            {
              tag: isAr ? "الإضافات" : "Add-ons",
              h: isAr ? "الدرون، الألبوم، تشويق نفس اليوم" : "Drone, album, same-day teaser",
              b: isAr
                ? "DJI Inspire 3 مع مشغل مرخص (AED 1,500)، ألبوم 40 صفحة بغلاف صلب (AED 3,500)، تشويق 30–90 ثانية يُسلّم قبل 10 مساءً (AED 4,500)."
                : "DJI Inspire 3 with licensed operator (AED 1,500), 40-page hard-cover album (AED 3,500), 30–90 sec teaser delivered by 10pm (AED 4,500).",
            },
            {
              tag: isAr ? "التسليم" : "Delivery",
              h: isAr ? "صور 5–7 أيام، فيديو 3–4 أسابيع" : "Photos 5–7 days, video 3–4 weeks",
              b: isAr
                ? "صور تُسلّم في معرض إلكتروني خلال 5–7 أيام عمل. فيديو يُسلّم خلال 3–4 أسابيع. كلاهما يُرسل إلى نفس البريد ونفس المعرض."
                : "Photos delivered to online gallery within 5–7 working days. Video delivered within 3–4 weeks. Both sent to the same email and gallery.",
            },
            {
              tag: isAr ? "القيود" : "Restrictions",
              h: isAr ? "طاقم واحد مسموح في معظم الفنادق" : "One crew allowed at most hotels",
              b: isAr
                ? "معظم فنادق دبي تسمح بطاقم خارجي واحد فقط. الباقة تُحسب كطاقم واحد من بيك ستوري — أسهل في الموافقة من شركتين منفصلتين."
                : "Most Dubai hotels allow only one outside crew. The bundle counts as one Big Story crew — easier to approve than two separate companies.",
            },
          ].map((card, i) => (
            <Reveal key={i} delay={i * 60} className="bs-card">
              <p className="bs-eyebrow">{card.tag}</p>
              <h3 className="mt-4 text-xl">{card.h}</h3>
              <p className="mt-3 text-sm text-[color:var(--color-muted)]">{card.b}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section alt>
        <Reveal>
          <Eyebrow>{isAr ? "سيناريوهات الحجز" : "Booking scenarios"}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr ? "ثلاث طرق لحجز الباقة" : "Three ways to book the bundle"}
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              tag: isAr ? "سيناريو 1 · الأكثر شعبية" : "Scenario 1 · Most popular",
              title: isAr ? "صور يوم كامل + ريل 8 دقائق" : "Full-day photo + 8-min reel",
              blurb: isAr
                ? "AED 12,000 (6,000 + 6,000). يشمل: 400–800 صورة + ريل 8 دقائق + قصة حفل + طاقم واحد. أضف التشويق (AED 4,500) والدرون (AED 1,500) للإجمالي AED 18,000."
                : "AED 12,000 (6,000 + 6,000). Includes 400–800 photos + 8-min reel + ceremony cut + one crew. Add teaser (AED 4,500) + drone (AED 1,500) for AED 18,000 total.",
            },
            {
              tag: isAr ? "سيناريو 2 · قيمة عالية" : "Scenario 2 · High value",
              title: isAr ? "صور يوم كامل + ريل 3 دقائق" : "Full-day photo + 3-min reel",
              blurb: isAr
                ? "AED 9,500 (6,000 + 3,500). يشمل: 400–800 صورة + ريل 3 دقائق + قصة حفل + طاقم واحد. خيار ممتاز لمن يريد الفيديو للسوشيال والذاكرة."
                : "AED 9,500 (6,000 + 3,500). Includes 400–800 photos + 3-min reel + ceremony cut + one crew. Excellent option for social + memory-only film.",
            },
            {
              tag: isAr ? "سيناريو 3 · هجين" : "Scenario 3 · Hybrid",
              title: isAr ? "صور الحفل + فيديو الاستقبال" : "Photo at ceremony + video at reception",
              blurb: isAr
                ? "AED 9,500–12,000. المصور يغطي الحفل (4 ساعات)، مصور الفيديو يغطي الاستقبال (5 ساعات)، يلتقيان للرقصة الأولى. لا تكرار، تغطية كاملة."
                : "AED 9,500–12,000. Photographer covers ceremony (4 hours), videographer covers reception (5 hours), they meet for first dance. No double coverage, full coverage.",
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

      <Section>
        <Reveal>
          <Eyebrow>{t(si.detail.faqs, locale)}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr ? "أسئلة متكررة عن باقة الصور + الفيديو" : "FAQ — Wedding photo + video bundle"}
          </h2>
        </Reveal>
        <div className="mt-10">
          <Faq items={itemFaqs} />
        </div>
      </Section>

      <Section alt>
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
        heading={isAr ? "جاهز لحجز باقة الصور + الفيديو؟" : "Ready to book the photo + video bundle?"}
        waContext={isAr ? "بخصوص باقة زفاف صور + فيديو في دبي." : "Re: wedding photo + video bundle in Dubai."}
      />
    </>
  );
}
