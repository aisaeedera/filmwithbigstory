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
      ? "جلسة خطوبة قبل الزفاف | AED 2,500 | نصف يوم منظم | بيك ستوري"
      : "Pre-Wedding Engagement Session | AED 2,500 | Half-Day Styled | Big Story",
    description: isAr
      ? "جلسة تصوير خطوبة منظّمة قبل الزفاف — نصف يوم (3 ساعات)، 80–150 صورة معدلة. AED 2,500. الصحراء، وسط دبي، خور دبي، أو موقع الزفاف نفسه."
      : "Pre-wedding engagement photo session — half day (3 hours), 80–150 edited images. AED 2,500. Desert, Downtown Dubai, Old Dubai Creek, or your wedding venue itself.",
    path: "/services/wedding-engagement-session",
  });
}

const COPY = {
  eyebrow: { en: "Pre-Wedding Engagement Session", ar: "جلسة خطوبة قبل الزفاف" },
  h1: {
    en: "Pre-Wedding Engagement Session in Dubai — half day, styled, AED 2,500",
    ar: "جلسة خطوبة قبل الزفاف في دبي — نصف يوم، منظّمة، 2,500 درهم",
  },
  lead: {
    en: "Big Story's engagement session is a half-day styled photoshoot for couples before their wedding — 3 hours of shooting, 80–150 edited images, AED 2,500. Common locations: the desert at Lahbab (golden hour, dunes), Old Dubai Creek (heritage architecture), Downtown Dubai (Burj frame, modern skyline), DIFC Gate Village (urban), the wedding venue itself (so the venue-walks double as engagement shots). The images are perfect for save-the-date cards, sign-in boards at the wedding, framed prints for parents, and Instagram.",
    ar: "جلسة الخطوبة لدى بيك ستوري هي تصوير منظم نصف يوم للأزواج قبل زفافهم — 3 ساعات تصوير، 80–150 صورة معدلة، 2,500 درهم. المواقع الشائعة: صحراء لهباب (الساعة الذهبية، الكثبان)، خور دبي القديم (العمارة التراثية)، وسط دبي (إطار برج خليفة، الأفق الحديث)، قرية البوابة بمركز دبي المالي (حضري)، موقع الزفاف نفسه (بحيث تكون استطلاعات الموقع مزدوجة كصور خطوبة). الصور مثالية لبطاقات حفظ التاريخ، لوحات التسجيل في الزفاف، إطارات للوالدين، وإنستغرام.",
  },
  statsHeading: { en: "Engagement sessions by the numbers — 2026", ar: "جلسات الخطوبة بالأرقام — 2026" },
  statsBody: {
    en: "From Big Story's 2025–2026 engagement-session bookings — most popular locations, average delivery time, and how many couples turn the session into their save-the-date cards. All figures from our own delivery logs.",
    ar: "من حجوزات جلسات الخطوبة لدى بيك ستوري 2025–2026 — المواقع الأكثر شعبية، متوسط مدة التسليم، وعدد الأزواج الذين يحولون الجلسة إلى بطاقات حفظ التاريخ. كل الأرقام من سجلات التسليم لدينا.",
  },
  stat1: { en: "AED 2,500", ar: "2,500 درهم" },
  stat1Label: { en: "Half-day engagement session: 3 hours of shooting, 80–150 edited images", ar: "جلسة خطوبة نصف يوم: 3 ساعات تصوير، 80–150 صورة معدلة" },
  stat2: { en: "5–7 days", ar: "5–7 أيام" },
  stat3: { en: "Desert · 47%", ar: "الصحراء · 47٪" },
  stat3Label: { en: "Most popular engagement location in 2025 (Lahbab dunes, golden hour)", ar: "موقع الخطوبة الأكثر شعبية في 2025 (كثبان لهباب، الساعة الذهبية)" },
  stat4: { en: "62%", ar: "62٪" },
  stat4Label: { en: "Engagement bookings in 2025 that used the images as save-the-date cards", ar: "حجوزات الخطوبة في 2025 التي استخدمت الصور كبطاقات حفظ التاريخ" },
};

const faqItems = {
  en: [
    {
      q: "What does the engagement session include?",
      a: "Half-day (3 hours) styled photoshoot with one lead photographer + one assistant. We meet at the agreed location 30 minutes before sunset (the 'golden hour' gives the best light). You receive 80–150 edited images in an online gallery within 5–7 working days, with full print and social-share rights. The session is styled — we'll help you pick outfits, suggest poses, and direct the shoot — but it's relaxed, not stiff. Most couples say it feels like a date with a photographer friend.",
    },
    {
      q: "Where should we do the engagement session?",
      a: "Popular locations: (1) Desert at Lahbab — golden hour on the dunes, 40 minutes from Downtown, AED 200 desert access fee paid directly to the gate. (2) Old Dubai Creek — heritage architecture, abra boats, textile souks, best early morning. (3) Downtown Dubai — Burj Khalifa frame, modern skyline, evening light. (4) DIFC Gate Village — urban, cafes, art galleries. (5) Your wedding venue itself — doubles as a venue walkthrough. We can also shoot at your home, hotel, or a private garden if you have access.",
    },
    {
      q: "When should we book the engagement session?",
      a: "Best timing is 4–8 weeks before the wedding — close enough that you're in 'wedding mindset' (the photos feel current), far enough that you have time to use the images for save-the-date cards and wedding signage. Same-day or week-before bookings are tight but possible. After-the-wedding sessions are also an option (for couples who want updated portraits) — those work well as anniversary gifts.",
    },
    {
      q: "What should we wear?",
      a: "We send a styling guide at booking confirmation. General rules: (1) coordinate, don't match — pick complementary colours (cream + sage, navy + blush, terracotta + cream). (2) Avoid logos and busy patterns. (3) Bring two outfits if you want variety — one dressy, one casual. (4) Wear shoes you can walk in (the desert has soft sand, the Creek has cobblestones). We bring a steamer and a portable changing tent if needed.",
    },
    {
      q: "Can we use the images for save-the-date cards?",
      a: "Yes — that's what most couples do. The 80–150 edited images include 5–10 hero shots suitable for save-the-date cards, framed prints, and Instagram announcements. About 62% of our engagement-session bookings use the images this way. If you want to use them commercially (e.g. a wedding fair booth), let us know at booking — commercial usage rights are an extra AED 800.",
    },
    {
      q: "Is hair and makeup included?",
      a: "Not in the base AED 2,500 package. We partner with a Dubai bridal HMU studio for the engagement session — half-day HMU (1 look for her, light grooming for him) is AED 1,200. Add it at booking and the HMU artist meets you at your home or hotel before the session. Many couples skip HMU for the engagement session and save the professional styling for the wedding day itself.",
    },
    {
      q: "What's the difference between the engagement session and the wedding photography?",
      a: "The engagement session is a 3-hour styled shoot at any location — meant for portraits, save-the-date cards, and relaxed couple photography. The wedding photography is 10 hours of documentary-style coverage of the actual wedding day — meant to capture the ceremony, family, guests, reception, first dance, etc. They're complementary, not substitutes: most couples book both. The engagement session images are usually more posed and editorial; the wedding photography is more candid and journalistic.",
    },
  ],
  ar: [
    {
      q: "ماذا تتضمن جلسة الخطوبة؟",
      a: "تصوير منظم نصف يوم (3 ساعات) مع مصور رئيسي + مساعد. نلتقي في الموقع المتفق عليه قبل 30 دقيقة من غروب الشمس (الساعة الذهبية تعطي أفضل إضاءة). تحصل على 80–150 صورة معدلة في معرض إلكتروني خلال 5–7 أيام عمل، مع حقوق طباعة ومشاركة سوشيال كاملة. الجلسة منظمة — نساعدك في اختيار الملابس، نقترح الوضعيات، ونوجه التصوير — لكنها مريحة، ليست متكلّفة. معظم الأزواج يقولون إنها تشعر مثل موعد مع صديق مصور.",
    },
    {
      q: "أين يجب أن نقوم بجلسة الخطوبة؟",
      a: "المواقع الشائعة: (1) صحراء لهباب — الساعة الذهبية على الكثبان، 40 دقيقة من وسط دبي، رسوم دخول الصحراء 200 درهم تُدفع مباشرة للبوابة. (2) خور دبي القديم — العمارة التراثية، قوارب العبرة، أسواق المنسوجات، الأفضل في الصباح الباكر. (3) وسط دبي — إطار برج خليفة، الأفق الحديث، إضاءة المساء. (4) قرية البوابة بمركز دبي المالي — حضري، مقاهي، صالات عرض فنية. (5) موقع زفافكم نفسه — مزدوج كاستطلاع للموقع. يمكننا أيضاً التصوير في منزلكم أو فندقكم أو حديقة خاصة إذا كان لديكم وصول.",
    },
    {
      q: "متى يجب أن نحجز جلسة الخطوبة؟",
      a: "أفضل توقيت هو 4–8 أسابيع قبل الزفاف — قريب بما يكفي لتكونوا في «عقلية الزفاف» (الصور تبدو حالية)، بعيد بما يكفي ليكون لديكم وقت لاستخدام الصور لبطاقات حفظ التاريخ ولافتات الزفاف. الحجوزات في نفس اليوم أو الأسبوع السابق ضيقة لكن ممكنة. جلسات ما بعد الزفاف أيضاً خيار (للأزواج الذين يريدون بورتريهات محدثة) — تعمل جيداً كهدايا ذكرى زواج.",
    },
    {
      q: "ماذا يجب أن نرتدي؟",
      a: "نرسل دليل التنسيق عند تأكيد الحجز. القواعد العامة: (1) نسّقوا، لا تتطابقوا — اختاروا ألواناً متكاملة (كريمي + سيج، كحلي + وردي، تيراكوتا + كريمي). (2) تجنبوا الشعارات والأنماط المزدحمة. (3) أحضروا ملابسين إذا أردتم تنوعاً — واحد رسمي، واحد كاجوال. (4) ارتدوا أحذية تستطيعون المشي بها (الصحراء رمل ناعم، الخور حجر). نُحضر مكواة بخار وخيمة تغيير محمولة إذا لزم.",
    },
    {
      q: "هل يمكننا استخدام الصور لبطاقات حفظ التاريخ؟",
      a: "نعم — هذا ما يفعله معظم الأزواج. الصور الـ 80–150 المعدلة تتضمن 5–10 لقطات رئيسية مناسبة لبطاقات حفظ التاريخ، والإطارات، وإعلانات إنستغرام. حوالي 62٪ من حجوزات جلسات الخطوبة لدينا تستخدم الصور بهذه الطريقة. إذا أردتم استخدامها تجارياً (مثلاً كشك في معرض زفاف)، أخبرونا عند الحجز — حقوق الاستخدام التجاري إضافة 800 درهم.",
    },
    {
      q: "هل الشعر والمكياج مشمولان؟",
      a: "ليس في باقة 2,500 درهم الأساسية. نتشارك مع استوديو زفافي في دبي للشعر والمكياج للجلسة — نصف يوم HMU (لوك واحد لها، عناية خفيفة له) بـ 1,200 درهم. أضيفوها عند الحجز وفنانة HMU تلتقيكما في منزلكما أو الفندق قبل الجلسة. كثير من الأزواج يتخطون HMU لجلسة الخطوبة ويوفّرون التنسيق المهني ليوم الزفاف نفسه.",
    },
    {
      q: "ما الفرق بين جلسة الخطوبة وتصوير الزفاف؟",
      a: "جلسة الخطوبة تصوير منظم 3 ساعات في أي موقع — مخصص للبورتريهات وبطاقات حفظ التاريخ وتصوير الأزواج المريح. تصوير الزفاف 10 ساعات تغطية بأسلوب وثائقي ليوم الزفاف الفعلي — مخصص لالتقاط الحفل والعائلة والضيوف والاستقبال والرقصة الأولى، إلخ. هما متكاملان، لا بدائل: معظم الأزواج يحجزون الاثنين. صور جلسة الخطوبة عادة أكثر تنظيماً وتحريرية؛ تصوير الزفاف أكثر تلقائية وصحفية.",
    },
  ],
};

const relatedServices = services.filter((s) =>
  ["weddings", "cinematic-wedding", "wedding-photography", "wedding-album-design"].includes(s.slug)
);

export default async function WeddingEngagementSessionPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const path = "/services/wedding-engagement-session";
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
            name: isAr ? "جلسة خطوبة قبل الزفاف" : "Pre-Wedding Engagement Session",
            description: isAr
              ? "جلسة تصوير خطوبة منظّمة نصف يوم في دبي — 3 ساعات، 80–150 صورة معدلة، مثالية لبطاقات حفظ التاريخ."
              : "Pre-wedding styled engagement session in Dubai — 3 hours, 80–150 edited images, perfect for save-the-date cards.",
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
            <a href={waLink(isAr ? "مهتم بحجز جلسة خطوبة قبل الزفاف." : "Interested in booking a pre-wedding engagement session.")} target="_blank" rel="noopener noreferrer" className="bs-btn bs-btn-gold">
              {t(ui.nav.startYourProject, locale)}
            </a>
            <Button href={localizedPath(locale, "/services/wedding-photography")} variant="ghost">
              {isAr ? "باقة تصوير الزفاف الكاملة" : "Full wedding photography package"}
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
            <p className="mt-4 text-sm text-[color:var(--color-muted)]">{t(COPY.stat3, locale)}</p>
          </div>
          <div className="bs-card !rounded-none flex flex-col justify-between bg-white p-8">
            <p className="bs-num">{t(COPY.stat3, locale)}</p>
            <p className="mt-4 text-sm text-[color:var(--color-muted)]">{t(COPY.stat4, locale)}</p>
          </div>
          <div className="bs-card !rounded-none flex flex-col justify-between bg-white p-8">
            <p className="bs-num">{t(COPY.stat4, locale)}</p>
            <p className="mt-4 text-sm text-[color:var(--color-muted)]">{t(COPY.stat4, locale)}</p>
          </div>
        </div>
      </Section>

      <Section>
        <Reveal>
          <Eyebrow>{isAr ? "المواقع الشائعة" : "Popular locations"}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr ? "خمسة مواقع لاختياركم" : "Five locations to choose from"}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              n: "01",
              h: isAr ? "صحراء لهباب" : "Desert at Lahbab",
              b: isAr
                ? "الكثبان الذهبية، 40 دقيقة من وسط دبي. الأفضل عند الساعة الذهبية قبل غروب الشمس بـ 30 دقيقة. رسوم دخول الصحراء 200 درهم تُدفع للبوابة. الخيار الأكثر شعبية — 47٪ من جلساتنا."
                : "Golden dunes, 40 minutes from Downtown. Best at golden hour — 30 minutes before sunset. AED 200 desert access fee paid at the gate. Most popular choice — 47% of our sessions.",
            },
            {
              n: "02",
              h: isAr ? "خور دبي القديم" : "Old Dubai Creek",
              b: isAr
                ? "العمارة التراثية، قوارب العبرة، أسواق المنسوجات والتوابل. الأفضل في الصباح الباكر قبل الحرارة. إضاءة ناعمة، خلفية ثقافية، متعة استكشاف المدينة القديمة معاً."
                : "Heritage architecture, abra boats, textile and spice souks. Best in the early morning before the heat. Soft light, cultural backdrop, fun exploring the old city together.",
            },
            {
              n: "03",
              h: isAr ? "وسط دبي وبرج خليفة" : "Downtown Dubai & Burj Khalifa",
              b: isAr
                ? "الإطار الحديث، الأيقونات المعمارية، بحيرة البرج. الأفضل في المساء بعد غروب الشمس بـ 30 دقيقة. يتطلب تصريح تصوير DFTC (1,500 درهم) — نتولاه نحن."
                : "Modern framing, architectural icons, Burj Lake. Best in the evening 30 minutes after sunset. Requires a DFTC film permit (AED 1,500) — we handle it.",
            },
            {
              n: "04",
              h: isAr ? "قرية البوابة بمركز دبي المالي" : "DIFC Gate Village",
              b: isAr
                ? "حضري، مقاهي، صالات عرض فنية، واجهات زجاجية عصرية. الأفضل في وقت متأخر من بعد الظهر. مثالي للأزواج الذين يحبون المظهر الحضري المعاصر."
                : "Urban, cafes, art galleries, modern glass facades. Best in late afternoon. Perfect for couples who love a contemporary city look.",
            },
            {
              n: "05",
              h: isAr ? "موقع الزفاف نفسه" : "Your wedding venue itself",
              b: isAr
                ? "تصوير الخطوبة في موقع الزفاف يخدم غرضين: تحصل على صور خطوبة جميلة + تجري استطلاع الموقع. يفيد بشكل خاص للمواقع الخارجية الكبيرة حيث يستحق الأمر استكشاف زوايا الإضاءة."
                : "Shooting the engagement at the wedding venue doubles up: you get engagement photos + a venue walkthrough. Especially useful for large outdoor venues where it's worth exploring lighting angles.",
            },
          ].map((card, i) => (
            <Reveal key={i} delay={i * 60} className="bs-card">
              <p className="bs-eyebrow">{card.n}</p>
              <h3 className="mt-4 text-xl">{card.h}</h3>
              <p className="mt-3 text-sm text-[color:var(--color-muted)]">{card.b}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section alt>
        <Reveal>
          <Eyebrow>{isAr ? "ما تحصلون عليه" : "What you get"}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr ? "ستة عناصر مشمولة في كل جلسة" : "Six elements in every session"}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              h: isAr ? "مصور رئيسي + مساعد" : "Lead photographer + assistant",
              b: isAr
                ? "مصور خبير في تصوير الأزواج + مساعد يحمل الإضاءة والمعدات ويعكسها. الإعداد خفيف، طبيعي، بدون معدات ثقيلة تشتت."
                : "Expert couple-photography lead + assistant carrying lighting and reflectors. The setup is light, natural, and doesn't feel like a heavy production.",
            },
            {
              h: isAr ? "تنسيق + توجيه" : "Styling + direction",
              b: isAr
                ? "نرسل دليل تنسيق قبل الجلسة. في الموقع، نوجه الوضعيات والتعبيرات حتى لا تكون الصور متكلّفة. معظم الأزواج يقولون إنها تشعر مثل موعد مع صديق."
                : "We send a styling guide before the session. On location, we direct the poses and expressions so the photos don't feel stiff. Most couples say it feels like a date with a friend.",
            },
            {
              h: isAr ? "80–150 صورة معدلة" : "80–150 edited images",
              b: isAr
                ? "تعرض، توازن أبيض، اقتصاص، تدرج ألوان أساسي. 5–10 لقطات رئيسية للبطاقات والإطارات، الباقي للذاكرة وإنستغرام."
                : "Exposure, white balance, crop, basic colour grade. 5–10 hero shots for cards and frames, the rest for memory and Instagram.",
            },
            {
              h: isAr ? "معرض إلكتروني + رابط ضيف" : "Online gallery + guest link",
              b: isAr
                ? "معرض آمن بكل الصور بدقة كاملة. رابط تحميل ضيف للضيوف لمدة 12 شهراً (لمشاركة save-the-date على واتساب)."
                : "Secure gallery with full-resolution images. Guest download link for 12 months (for sharing save-the-date on WhatsApp).",
            },
            {
              h: isAr ? "تسليم 5–7 أيام" : "5–7 day delivery",
              b: isAr
                ? "المعرض جاهز خلال 5–7 أيام عمل من الجلسة. تسليم عاجل (3 أيام) متاح بزيادة 500 درهم إذا كانت الجلسة قبل بطاقة حفظ التاريخ مباشرة."
                : "Gallery ready within 5–7 working days of the session. Rush delivery (3 days) available for +AED 500 if the session is right before the save-the-date.",
            },
            {
              h: isAr ? "حقوق طباعة + سوشيال" : "Print + social rights",
              b: isAr
                ? "حقوق كاملة لكل صورة — طباعة، إنستغرام، واتساب، بطاقة حفظ التاريخ. حقوق الاستخدام التجاري (معرض زفاف، علامة) إضافة 800 درهم."
                : "Full rights to every image — print, Instagram, WhatsApp, save-the-date cards. Commercial usage rights (wedding fair, brand) are +AED 800.",
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
            {isAr ? "أسئلة متكررة عن جلسة الخطوبة" : "FAQ — Engagement session"}
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

      <CtaBand
        locale={locale}
        heading={isAr ? "جاهز لحجز جلسة الخطوبة؟" : "Ready to book your engagement session?"}
        waContext={isAr ? "بخصوص جلسة تصوير الخطوبة قبل الزفاف." : "Re: pre-wedding engagement photo session."}
      />
    </>
  );
}
