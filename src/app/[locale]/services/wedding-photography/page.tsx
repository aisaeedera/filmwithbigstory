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
      ? "تصوير الزفاف الفوتوغرافي في دبي | 2,500 → 6,000 درهم | بيك ستوري"
      : "Wedding Photography in Dubai | AED 2,500 → 6,000 | Big Story",
    description: isAr
      ? "تصوير زفاف فوتوغرافي فقط في دبي — خطوبة 2,500 درهم، حفل 3,500، استقبال 4,000، يوم كامل 6,000. مصور رئيسي + مساعد. 400–800 صورة معدلة."
      : "Photo-only wedding coverage in Dubai — engagement AED 2,500, ceremony AED 3,500, reception AED 4,000, full day AED 6,000. Lead photographer + assistant. 400–800 edited images.",
    path: "/services/wedding-photography",
  });
}

const COPY = {
  eyebrow: { en: "Wedding Photography in Dubai", ar: "تصوير الزفاف الفوتوغرافي في دبي" },
  h1: {
    en: "Wedding Photography in Dubai — four packages, lead photographer + assistant, 400–800 images",
    ar: "تصوير الزفاف الفوتوغرافي في دبي — أربع باقات، مصور رئيسي + مساعد، 400–800 صورة",
  },
  lead: {
    en: "Big Story's wedding photography is photo-only coverage of your wedding day — 1 lead photographer + 1 assistant as standard, with optional 2nd and 3rd photographers for larger weddings. Four packages: Engagement (AED 2,500, half day), Ceremony-only (AED 3,500, 4 hours), Reception-only (AED 4,000, 5 hours), and Full Day (AED 6,000, 10 hours). Every package includes 400–800 edited images delivered in an online gallery within 5–7 working days, plus an option to add a printed album (AED 3,500).",
    ar: "تصوير الزفاف الفوتوغرافي لدى بيك ستوري هو تغطية صور فقط ليوم زفافك — مصور رئيسي + مساعد كقياسي، مع خيار إضافة مصورين ثان وثالث لحفلات الزفاف الأكبر. أربع باقات: الخطوبة (2,500 درهم، نصف يوم)، الحفل فقط (3,500 درهم، 4 ساعات)، الاستقبال فقط (4,000 درهم، 5 ساعات)، ويوم كامل (6,000 درهم، 10 ساعات). كل باقة تشمل 400–800 صورة معدلة تُسلّم في معرض إلكتروني خلال 5–7 أيام عمل، مع خيار إضافة ألبوم مطبوع (3,500 درهم).",
  },
  statsHeading: { en: "Wedding photography by the numbers — 2026", ar: "تصوير الزفاف الفوتوغرافي بالأرقام — 2026" },
  statsBody: {
    en: "From Big Story's 2025–2026 wedding photo bookings — average image count per package, second-shooter add-on rate, and turnaround times. All figures from our own delivery logs.",
    ar: "من حجوزات تصوير زفاف بيك ستوري 2025–2026 — متوسط عدد الصور لكل باقة، معدل إضافة مصور ثانٍ، ومدد التسليم. كل الأرقام من سجلات التسليم لدينا.",
  },
  stat1: { en: "AED 2,500 → 6,000", ar: "2,500 ← 6,000 درهم" },
  stat1Label: { en: "Four-package price band (engagement, ceremony, reception, full day)", ar: "نطاق أسعار الباقات الأربع (خطوبة، حفل، استقبال، يوم كامل)" },
  stat2: { en: "400–800", ar: "400–800" },
  stat2Label: { en: "Edited images delivered per booking (varies by package length)", ar: "صورة معدلة تُسلّم لكل حجز (تختلف حسب مدة الباقة)" },
  stat3: { en: "5–7 days", ar: "5–7 أيام" },
  stat3Label: { en: "Standard turnaround for the edited gallery (online proofing + download)", ar: "مدة التسليم القياسية للمعرض المعدل (معرض إلكتروني + تحميل)" },
  stat4: { en: "Sony A7R V", ar: "Sony A7R V" },
  stat4Label: { en: "45MP full-frame cameras used on every Big Story wedding — same sensor as our brand shoots", ar: "كاميرات 45MP فول فريم تُستخدم في كل حفل زفاف لبيك ستوري — نفس المستشعر المستخدم في تصوير العلامات" },
};

const faqItems = {
  en: [
    {
      q: "What's included in the AED 6,000 full-day wedding photography package?",
      a: "10 hours of continuous coverage (typically 11am–9pm), 1 lead photographer (Sony A7R V, 45MP full-frame) + 1 assistant, 400–800 edited images in an online gallery, basic colour grade and crop on every image, and 12-month private guest download link. Extras: 2nd photographer (AED 2,200/day), 3rd photographer (AED 2,500/day), premium retouching (AED 80/image), printed album (AED 3,500 for 40 pages).",
    },
    {
      q: "What's the difference between Ceremony-only and Reception-only?",
      a: "Ceremony-only (AED 3,500) is 4 hours of coverage starting from bridal prep through the end of the ceremony — typically 2pm–6pm for an afternoon wedding. Reception-only (AED 4,000) is 5 hours of coverage starting from the couple's reception entrance through the first dance and cake cutting — typically 6pm–11pm. Most weddings need either Ceremony + Reception (which is what Full Day covers) or one of these if the other segment is being shot by family/friends.",
    },
    {
      q: "How many photos will I get, and when?",
      a: "Engagement (AED 2,500): 80–150 edited images. Ceremony-only (AED 3,500): 200–350 images. Reception-only (AED 4,000): 250–450 images. Full Day (AED 6,000): 400–800 images. Standard turnaround is 5–7 working days for the edited gallery (we send the link by email). Rush delivery (3 working days) is available at +AED 800. Premium retouching on specific images (skin smoothing, object removal) is AED 80 per image after the initial delivery.",
    },
    {
      q: "Do you do an engagement / pre-wedding session?",
      a: "Yes — it's a separate booking at AED 2,500 for a half-day styled session. We pick the location together (desert, DIFC, old Dubai, your venue), plan the styling, and shoot 2–3 hours of editorial portraits. You receive 80–150 edited images and they make excellent save-the-date cards, sign-in boards at the wedding, and framed prints for parents. The Engagement package is also bookable as a 'save the date' shoot 4–6 weeks before the wedding.",
    },
    {
      q: "Can I add a 2nd or 3rd photographer?",
      a: "Yes — AED 2,200 per day for a 2nd photographer, AED 2,500 per day for a 3rd photographer. We recommend a 2nd photographer for weddings with 150+ guests (you can't be in two places at once) or for simultaneous ceremonies (Henna night + Wedding day). A 3rd photographer is reserved for 300+ guest weddings or multi-day events where we need wide, medium and telephoto coverage of the same moment.",
    },
    {
      q: "Do we get a printed album?",
      a: "Yes, as an add-on: 40-page lay-flat hard-cover album at AED 3,500, 60-page at AED 4,500. Printed and bound at our Al Quoz partner lab on Fuji Crystal archival paper, 30×30 cm. Lead time 4 weeks from photo selection. You pick the images in our online gallery and we send a digital proof before binding. Most couples book the album at the same time as the photography package; some book it 6–12 months later as an anniversary gift.",
    },
    {
      q: "What if it rains or the venue changes last-minute?",
      a: "Outdoor weddings in Dubai are weather-sensitive (rare, but possible in December–February). We plan a wet-weather backup with you at the booking confirmation — usually an indoor location at the same venue (lobby, ballroom, indoor pool area). If the wedding is cancelled entirely (venue flood-out, family emergency), we refund 100% of the photography fee minus AED 500 to cover our admin time. Rescheduling to a new date is free if we're available.",
    },
  ],
  ar: [
    {
      q: "ماذا تتضمن باقة تصوير الزفاف ليوم كامل بـ 6,000 درهم؟",
      a: "10 ساعات تغطية متواصلة (عادة 11 صباحاً–9 مساءً)، مصور رئيسي (Sony A7R V، 45MP فول فريم) + مساعد، 400–800 صورة معدلة في معرض إلكتروني، تدرج ألوان أساسي وقص على كل صورة، ورابط تحميل خاص للضيوف لمدة 12 شهراً. الإضافات: مصور ثان (2,200 درهم/يوم)، مصور ثالث (2,500 درهم/يوم)، تنقيح متميز (80 درهم/صورة)، ألبوم مطبوع (3,500 درهم لـ 40 صفحة).",
    },
    {
      q: "ما الفرق بين الحفل فقط والاستقبال فقط؟",
      a: "الحفل فقط (3,500 درهم) 4 ساعات تغطية تبدأ من تجهيز العروس حتى نهاية الحفل — عادة 2–6 مساءً لحفل بعد الظهر. الاستقبال فقط (4,000 درهم) 5 ساعات تغطية تبدأ من دخول العروسين للاستقبال حتى الرقصة الأولى وقطع الكيك — عادة 6–11 مساءً. معظم حفلات الزفاف تحتاج إما حفل + استقبال (وهو ما يغطيه اليوم الكامل) أو أحدهما إذا كان الجزء الآخر يُصور من العائلة/الأصدقاء.",
    },
    {
      q: "كم عدد الصور التي سأحصل عليها، ومتى؟",
      a: "الخطوبة (2,500 درهم): 80–150 صورة معدلة. الحفل فقط (3,500 درهم): 200–350 صورة. الاستقبال فقط (4,000 درهم): 250–450 صورة. يوم كامل (6,000 درهم): 400–800 صورة. مدة التسليم القياسية 5–7 أيام عمل للمعرض المعدل (نرسل الرابط بالبريد). التسليم العاجل (3 أيام عمل) متاح بزيادة 800 درهم. التنقيح المتميز على صور محددة (تنعيم بشرة، إزالة أشياء) 80 درهم للصورة بعد التسليم الأول.",
    },
    {
      q: "هل تقومون بجلسة خطوبة / ما قبل الزفاف؟",
      a: "نعم — حجز منفصل بـ 2,500 درهم لجلسة نصف يوم منظّمة. نختار الموقع معاً (الصحراء، مركز دبي المالي، دبي القديمة، موقعكم)، نخطط للتنسيق، ونصور 2–3 ساعات من البورتريه التحريري. تحصل على 80–150 صورة معدلة وهي ممتازة لبطاقات حفظ التاريخ، ولوحات التسجيل في الزفاف، والإطارات المهداة للوالدين. يمكن أيضاً حجز باقة الخطوبة كتصوير «حفظ التاريخ» قبل 4–6 أسابيع من الزفاف.",
    },
    {
      q: "هل يمكنني إضافة مصور ثانٍ أو ثالث؟",
      a: "نعم — 2,200 درهم/يوم للمصور الثاني، 2,500 درهم/يوم للمصور الثالث. نوصي بمصور ثانٍ لحفلات الزفاف التي تضم 150+ ضيف (لا يمكنك التواجد في مكانين في نفس الوقت) أو للحفلات المتزامنة (ليلة الحناء + يوم الزفاف). المصور الثالث مخصص لحفلات 300+ ضيف أو الفعاليات متعددة الأيام حيث نحتاج تغطية واسعة ومتوسطة وتليفوتو لنفس اللحظة.",
    },
    {
      q: "هل نحصل على ألبوم مطبوع؟",
      a: "نعم، كإضافة: ألبوم 40 صفحة lay-flat بغلاف صلب بـ 3,500 درهم، 60 صفحة بـ 4,500 درهم. يُطبع ويُجلد في مختبر شريكنا في القوز على ورق Fuji Crystal أرشيفي، 30×30 سم. مدة التسليم 4 أسابيع من اختيار الصور. تختار الصور من معرضنا الإلكتروني ونرسل مسودة رقمية قبل التجليد. معظم الأزواج يحجزون الألبوم مع باقة التصوير؛ بعضهم يحجزه بعد 6–12 شهراً كهدية ذكرى زواج.",
    },
    {
      q: "ماذا لو أمطرت أو تغير الموقع في اللحظة الأخيرة؟",
      a: "حفلات الزفاف الخارجية في دبي حساسة للطقس (نادرة، لكن ممكنة في ديسمبر–فبراير). نخطط خطة طقس ممطرة معك عند تأكيد الحجز — عادة موقع داخلي في نفس الفندق (البهو، قاعة الحفلات، منطقة المسبح الداخلية). إذا أُلغي الزفاف بالكامل (فيضان موقع، طارئ عائلي)، نُعيد 100٪ من رسوم التصوير ناقص 500 درهم لتغطية وقت إدارتنا. إعادة الجدولة لتاريخ جديد مجانية إذا كنا متاحين.",
    },
  ],
};

const relatedServices = services.filter((s) =>
  ["weddings", "cinematic-wedding", "wedding-videography", "wedding-album-design"].includes(s.slug)
);

export default async function WeddingPhotographyPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const path = "/services/wedding-photography";
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
            name: isAr ? "تصوير الزفاف الفوتوغرافي في دبي" : "Wedding Photography in Dubai",
            description: isAr
              ? "تصوير زفاف فوتوغرافي فقط في دبي — أربع باقات، 400–800 صورة معدلة، ألبوم مطبوع اختياري."
              : "Photo-only wedding coverage in Dubai — four packages, 400–800 edited images, optional printed album.",
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
            <a href={waLink(isAr ? "مهتم بتصوير الزفاف الفوتوغرافي في دبي." : "Interested in wedding photography in Dubai.")} target="_blank" rel="noopener noreferrer" className="bs-btn bs-btn-gold">
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
          <Eyebrow>{isAr ? "الباقات الأربع" : "The four packages"}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr ? "اختر تغطيتك بناءً على جزء الزفاف" : "Pick your coverage based on wedding segment"}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              tag: isAr ? "باقة 1" : "Package 1",
              title: isAr ? "الخطوبة" : "Engagement",
              price: "AED 2,500",
              hours: isAr ? "نصف يوم (3 ساعات)" : "Half day (3 hours)",
              blurb: isAr
                ? "تصوير جلسة خطوبة منظم قبل الزفاف. موقع، إضاءة، تنسيق. 80–150 صورة معدلة."
                : "Pre-wedding styled shoot. Location, light, styling. 80–150 edited images. Book as a standalone or as save-the-date.",
            },
            {
              tag: isAr ? "باقة 2" : "Package 2",
              title: isAr ? "الحفل فقط" : "Ceremony only",
              price: "AED 3,500",
              hours: isAr ? "4 ساعات" : "4 hours",
              blurb: isAr
                ? "تجهيز العروس + الحفل + صور عائلية بعد الحفل. 200–350 صورة معدلة."
                : "Bridal prep + ceremony + family formals after. 200–350 edited images. No reception coverage.",
            },
            {
              tag: isAr ? "باقة 3" : "Package 3",
              title: isAr ? "الاستقبال فقط" : "Reception only",
              price: "AED 4,000",
              hours: isAr ? "5 ساعات" : "5 hours",
              blurb: isAr
                ? "دخول العروسين، الرقصة الأولى، قطع الكيك، حلبة الرقص. 250–450 صورة معدلة."
                : "Couple's entrance, first dance, cake cutting, dance floor. 250–450 edited images. Ceremony assumed covered elsewhere.",
            },
            {
              tag: isAr ? "باقة 4 · الأكثر شعبية" : "Package 4 · Most popular",
              title: isAr ? "يوم كامل" : "Full day",
              price: "AED 6,000",
              hours: isAr ? "10 ساعات" : "10 hours",
              blurb: isAr
                ? "من تجهيز العروس حتى نهاية الاستقبال. 400–800 صورة معدلة. مصور رئيسي + مساعد."
                : "Bridal prep through end of reception. 400–800 edited images. Lead photographer + assistant. The default booking.",
            },
          ].map((c, i) => (
            <Reveal as="div" key={i} delay={i * 60} className="bs-card bs-card-hover">
              <span className="bs-eyebrow !text-[color:var(--color-gold)] before:!bg-[color:var(--color-gold)]">{c.tag} · {c.price}</span>
              <h3 className="mt-4 text-xl">{c.title}</h3>
              <p className="mt-2 text-xs uppercase tracking-wider text-[color:var(--color-muted)]">{c.hours}</p>
              <p className="mt-3 text-sm text-[color:var(--color-muted)]">{c.blurb}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* WHAT'S INCLUDED */}
      <Section alt>
        <Reveal>
          <Eyebrow>{isAr ? "ماذا تتضمن كل باقة" : "What's in every package"}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr ? "ستة عناصر قياسية في كل حجز" : "Six elements standard in every booking"}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              h: isAr ? "كاميرا Sony A7R V + عدسات" : "Sony A7R V + lenses",
              b: isAr
                ? "كاميرا فول فريم 45MP مع عدسة 24–70mm f/2.8 وعدسة 70–200mm f/2.8. كل صورة بدقة 7000×4667 — قابلة للطباعة حتى 30×40 بوصة."
                : "45MP full-frame camera with 24–70mm f/2.8 and 70–200mm f/2.8 lenses. Every shot at 7000×4667 — print-ready up to 30×40 inches.",
            },
            {
              h: isAr ? "إضاءة محمولة" : "Portable lighting",
              b: isAr
                ? "Godox AD200 ومُعدّل ناعم للومضة في الأماكن المظللة. لا حاجة لمأخذ كهربائي في معظم المواقع."
                : "Godox AD200 and a softbox modifier for fill in shaded spots. No mains power needed at most venues.",
            },
            {
              h: isAr ? "تنقيح قياسي" : "Standard retouching",
              b: isAr
                ? "تعرض، توازن أبيض، اقتصاص، تدرج ألوان أساسي. تنقيح البشرة المتميز (تنعيم، تبييض أسنان، إزالة عيوب) متاح بـ 80 درهم للصورة."
                : "Exposure, white balance, crop, basic colour grade. Premium retouching (skin smoothing, teeth whitening, blemish removal) available at AED 80 per image.",
            },
            {
              h: isAr ? "معرض إلكتروني خاص" : "Private online gallery",
              b: isAr
                ? "رابط تحميل آمن لكل الصور بدقة كاملة. رابط الضيوف لصور منخفضة الدقة مع علامة مائية، صالح 12 شهراً."
                : "Secure download link with full-resolution images. Guest link for watermarked low-res versions, valid 12 months.",
            },
            {
              h: isAr ? "5–7 أيام عمل للتسليم" : "5–7 working day delivery",
              b: isAr
                ? "معرض الصور المعدلة خلال 5–7 أيام عمل من التصوير. تسليم عاجل (3 أيام) متاح بزيادة 800 درهم."
                : "Edited gallery within 5–7 working days of the shoot. Rush delivery (3 days) available for +AED 800.",
            },
            {
              h: isAr ? "تنسيق مع منظم الزفاف" : "Wedding planner coordination",
              b: isAr
                ? "ننسق مع منظم الزفاف على الجدول، أوقات اللا تصوير (صلاة، عشاء، خطب)، وقائمة اللقطات الرئيسية."
                : "We coordinate with your wedding planner on the run-of-show, no-shoot moments (prayer, dinner, toasts), and key shot list.",
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

      <Section>
        <Reveal>
          <Eyebrow>{t(si.detail.faqs, locale)}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr ? "أسئلة متكررة عن تصوير الزفاف" : "FAQ — Wedding photography"}
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
        heading={isAr ? "مستعد لحجز تصوير زفافك؟" : "Ready to book your wedding photography?"}
        waContext={isAr ? "بخصوص تصوير الزفاف الفوتوغرافي في دبي." : "Re: wedding photography in Dubai."}
      />
    </>
  );
}
