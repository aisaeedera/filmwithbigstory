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
      ? "تصوير الزفاف في دبي | بيك ستوري — باقات من 2,500 درهم"
      : "Wedding Photography & Videography in Dubai | Big Story",
    description: isAr
      ? "دليل شامل لتصوير الزفاف في دبي — باقات الصور والفيديو، الأسعار الحقيقية (2,500–35,000 درهم)، تشويق في نفس اليوم، بث مباشر للضيوف في الخارج، وألبوم مطبوع. بيانات 2026."
      : "The complete guide to wedding photography and videography in Dubai — packages, real pricing (AED 2,500–35,000), same-day teaser, live streaming for overseas guests, and printed albums. 2026 data.",
    path: "/services/weddings",
  });
}

const COPY = {
  eyebrow: { en: "Weddings in Dubai", ar: "تصوير الزفاف في دبي" },
  h1: {
    en: "Wedding Photography & Videography in Dubai — packages, prices, and how to book",
    ar: "تصوير الزفاف في دبي — الباقات والأسعار وكيف تحجز",
  },
  lead: {
    en: "Big Story shoots 60+ weddings a year across Dubai and Abu Dhabi — from small engagement ceremonies at the DIFC Gate Village to 400-guest luxury weddings at Atlantis and desert resorts. This page is the original 2026 reference for couples planning a UAE wedding: every price band, every deliverable, the difference between photo-only and full cinematic, what a same-day teaser actually costs, and which sub-page covers the specific service you need.",
    ar: "تصوّر بيك ستوري أكثر من 60 حفل زفاف سنوياً في دبي وأبوظبي — من حفلات خطوبة صغيرة في قرية البوابة بمركز دبي المالي إلى حفلات فخمة لـ 400 ضيف في أتلانتس والمنتجعات الصحراوية. هذه الصفحة هي مرجع 2026 الأصلي للأزواج الذين يخططون لحفل زفاف في الإمارات: كل نطاق سعري، كل مخرج، الفرق بين الصور فقط والسينمائي الكامل، كم يكلّف تشويق نفس اليوم فعلياً، وأي صفحة فرعية تغطي الخدمة التي تحتاجها.",
  },
  statsHeading: { en: "Weddings in Dubai by the numbers — 2026", ar: "حفلات الزفاف في دبي بالأرقام — 2026" },
  statsBody: {
    en: "Original data from Big Story's 2025–2026 wedding bookings, vendor invoicing across Al Quoz photo labs and Cinema Akil, and feedback from luxury wedding planners (Cherniak Events, Eventchic, The Qode). Every figure below is sourced and dated.",
    ar: "بيانات أصلية من حجوزات الزفاف لدى بيك ستوري 2025–2026، وفواتير الموردين عبر مختبرات صور القوز وسينما أكيل، وردود فعل من منظمي الزفاف الراقيين (Cherniak Events, Eventchic, The Qode). كل رقم أدناه مُصدر ومؤرشف.",
  },
  stat1: { en: "AED 2,500 → 35,000", ar: "2,500 ← 35,000 درهم" },
  stat1Label: { en: "Wedding package price range (engagement session to two-day cinematic premium)", ar: "نطاق أسعار باقات الزفاف (جلسة خطوبة إلى سينمائي متميز يومين)" },
  stat2: { en: "60+", ar: "60+" },
  stat2Label: { en: "Weddings shot by Big Story in 2025 (Dubai + Abu Dhabi + Sharjah)", ar: "حفل زفاف صورتها بيك ستوري في 2025 (دبي + أبوظبي + الشارقة)" },
  stat3: { en: "10pm", ar: "10 مساءً" },
  stat3Label: { en: "Same-day teaser delivered on the wedding night (Premium tier add-on)", ar: "تشويق نفس اليوم يُسلّم ليلة الزفاف (إضافة على الباقة المتميزة)" },
  stat4: { en: "4 packages", ar: "4 باقات" },
  stat4Label: { en: "Engagement · Ceremony · Reception · Full day — pick coverage by wedding segment", ar: "خطوبة · حفل · استقبال · يوم كامل — اختر التغطية حسب فقرة الزفاف",
  },
};

const faqItems = {
  en: [
    {
      q: "What does a wedding photography package cost in Dubai in 2026?",
      a: "Big Story's wedding photography starts at AED 2,500 for a half-day engagement session and scales to AED 6,000 for a full-day ceremony + reception shoot with one lead photographer and an assistant. Add a second photographer for AED 2,200 per day, a third for AED 2,500 per day, and drone coverage from AED 1,500. The full cinematic wedding package — RED Komodo X + 2 cinematographers + drone + same-day teaser — is a separate engagement and starts at AED 18,500.",
    },
    {
      q: "What's the difference between a wedding photographer and a wedding videographer?",
      a: "A wedding photographer delivers still images — 400–800 edited photos per day, plus an album if booked. A wedding videographer delivers motion — a 3–8 minute highlight reel, sometimes a same-day teaser and a 20–40 minute ceremony cut. Most couples book both, often from the same crew on the same day, because the crew, the venue and the lighting setup are shared. Big Story's Photo + Video bundle is the most popular booking — see our wedding photo + video page for the combined pricing.",
    },
    {
      q: "How does a same-day teaser work — what do we actually get?",
      a: "A same-day teaser is a 30–90 second edit of the ceremony highlights (vows, first kiss, family reactions, first dance) delivered by 10pm on the wedding night. Two editors work in parallel: one cuts the teaser that evening, one begins the 4-week post on the full 8–12 minute film. The teaser is usually screened at the after-party or shared on WhatsApp with overseas guests. It's an add-on: AED 4,500, available only when the Big Story crew is the wedding's film team.",
    },
    {
      q: "Can we live-stream the wedding for guests who can't travel?",
      a: "Yes. Big Story streams the wedding ceremony live on YouTube (private link) and on Instagram Live as a workaround for regions where YouTube is blocked. The kit is two 5G-bonded Hollyland Pyro S units with backup batteries, a switched multi-cam mix (ceremony angle + audience reaction + close-up), and a dedicated stream operator on site. Pricing is AED 6,000 — covers up to 4 hours of streaming with chat moderation.",
    },
    {
      q: "Do we get a printed album?",
      a: "Yes, as an add-on. Big Story's wedding album is a 40-page lay-flat hard-cover album, 30×30 cm, archival inkjet on Fuji Crystal paper, printed and bound at our Al Quoz partner lab. Lead time is 4 weeks from photo selection. Price: AED 3,500 for 40 pages, AED 4,500 for 60 pages, AED 200 per extra 10 pages. Photo selection is done in our online proofing gallery with two rounds of revision included.",
    },
    {
      q: "How far in advance should we book?",
      a: "Saturday peak-season weddings (October–April) book 6–9 months ahead. Off-peak and Friday weddings are usually available with 2–3 months' notice. Engagement and smaller ceremonies can sometimes be booked with 4–6 weeks' notice. Once you have a confirmed wedding date, send us a WhatsApp with the venue and the headcount — we hold the date for 7 days while we scope the package.",
    },
    {
      q: "What if our wedding planner wants to refer us — how does that work?",
      a: "Most Dubai luxury weddings come in via the wedding planner (Cherniak, Eventchic, The Qode, Eyesome, Jannat, Hafla). We pay the planner a tiered commission on the Big Story portion of the package (12–15% depending on volume). The planner stays in the loop on the shot list, run-of-show and venue logistics, but we own all creative and delivery decisions. See our Partner Program for details.",
    },
  ],
  ar: [
    {
      q: "كم تكلفة باقة تصوير الزفاف في دبي في 2026؟",
      a: "يبدأ تصوير الزفاف لدى بيك ستوري من 2,500 درهم لجلسة خطوبة نصف يوم ويصل إلى 6,000 درهم لتصوير يوم كامل (حفل + استقبال) مع مصور رئيسي ومساعد. أضف مصوراً ثانياً بـ 2,200 درهم/يوم، وثالثاً بـ 2,500 درهم/يوم، وتغطية درون من 1,500 درهم. باقة الزفاف السينمائي الكاملة — RED Komodo X + 2 مصورين + درون + تشويق نفس اليوم — مشاركة منفصلة تبدأ من 18,500 درهم.",
    },
    {
      q: "ما الفرق بين مصور الزفاف ومصور فيديو الزفاف؟",
      a: "مصور الزفاف يسلم صوراً ثابتة — 400–800 صورة معدلة يومياً، بالإضافة للألبوم إذا تم الحجز. مصور فيديو الزفاف يسلم فيديو — ريل ملخص 3–8 دقائق، أحياناً تشويق نفس اليوم وقصة حفل 20–40 دقيقة. معظم الأزواج يحجزون الاثنين، غالباً من نفس الطاقم في اليوم نفسه، لأن الطاقم والموقع والإعداد مشتركان. باقة الصور + الفيديو من بيك ستوري هي الأكثر حجزاً — راجع صفحة زفاف الصور + الفيديو للتسعير المدمج.",
    },
    {
      q: "كيف يعمل تشويق نفس اليوم — ماذا نحصل فعلياً؟",
      a: "تشويق نفس اليوم هو مونتاج 30–90 ثانية لأبرز لحظات الحفل (النذور، القبلة الأولى، ردود فعل العائلة، الرقصة الأولى) يُسلّم قبل 10 مساءً ليلة الزفاف. يعمل محرران بالتوازي: واحد يقص التشويق تلك الأمسية، وواحد يبدأ ما بعد الإنتاج للفيلم الكامل 8–12 دقيقة. يُعرض التشويق عادة في الحفلة اللاحقة أو يُشارك عبر واتساب مع الضيوف في الخارج. هو إضافة: 4,500 درهم، متاح فقط عندما يكون طاقم بيك ستوري فريق التصوير.",
    },
    {
      q: "هل يمكننا بث الزفاف مباشرة للضيوف الذين لا يستطيعون السفر؟",
      a: "نعم. تبث بيك ستوري حفل الزفاف مباشرة على يوتيوب (رابط خاص) وعلى إنستغرام لايف كحل بديل للمناطق المحجوب فيها يوتيوب. العدة وحدتان Hollyland Pyro S مربوطتان بـ 5G مع بطاريات احتياطية، ومزيج كاميرات متعددة (زاوية الحفل + رد فعل الجمهور + لقطة قريبة)، ومشغل بث مخصص في الموقع. السعر 6,000 درهم — يغطي حتى 4 ساعات بث مع إشراف على المحادثة.",
    },
    {
      q: "هل نحصل على ألبوم مطبوع؟",
      a: "نعم، كإضافة. ألبوم زفاف بيك ستوري هو ألبوم 40 صفحة lay-flat بغلاف صلب، 30×30 سم، حبر أرشيفي على ورق Fuji Crystal، يُطبع ويُجلد في مختبر شريكنا في القوز. مدة التسليم 4 أسابيع من اختيار الصور. السعر: 3,500 درهم لـ 40 صفحة، 4,500 درهم لـ 60 صفحة، 200 درهم لكل 10 صفحات إضافية. اختيار الصور يتم في معرضنا الإلكتروني مع جولتي مراجعة مشمولتين.",
    },
    {
      q: "كم مقدماً يجب أن نحجز؟",
      a: "حفلات الزفاف في موسم الذروة (أكتوبر–أبريل) يوم السبت تُحجز قبل 6–9 أشهر. خارج الذروة وحفلات الجمعة تتوفر عادة بإشعار 2–3 أشهر. حفلات الخطوبة والحفلات الأصغر يمكن أحياناً الحجز بإشعار 4–6 أسابيع. بمجرد تأكيد تاريخ الزفاف، أرسل لنا واتساب بالموقع وعدد الضيوف — نحجز التاريخ 7 أيام ريثما نحدد نطاق الباقة.",
    },
    {
      q: "ماذا لو أراد منظم الزفاف إحالتنا — كيف يعمل ذلك؟",
      a: "معظم حفلات الزفاف الراقية في دبي تأتي عبر منظم الزفاف (Cherniak, Eventchic, The Qode, Eyesome, Jannat, Hafla). ندفع للمنظم عمولة متدرجة على حصة بيك ستوري من الباقة (12–15% حسب الحجم). يبقى المنظم على اطلاع بقائمة اللقطات والجدول والخدمات اللوجستية للموقع، لكننا نمتلك جميع قرارات الإبداع والتسليم.",
    },
  ],
};

const relatedServices = services.filter((s) =>
  ["cinematic-wedding", "event-coverage", "brand-films", "tvc-production"].includes(s.slug)
);

export default async function WeddingsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const path = "/services/weddings";
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
            datePublished: "2026-07-15",
            authorName: "Big Story Editorial",
          }),
          serviceSchema({
            locale,
            name: isAr ? "تصوير الزفاف في دبي" : "Wedding Photography & Videography in Dubai",
            description: isAr
              ? "خدمات تصوير الزفاف في دبي — باقات الصور والفيديو، تشويق نفس اليوم، البث المباشر، الألبومات المطبوعة."
              : "Wedding photography and videography in Dubai — photo + video packages, same-day teaser, live streaming, printed albums.",
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
            <a href={waLink(isAr ? "مهتم بتصوير الزفاف في دبي." : "Interested in wedding photography and videography in Dubai.")} target="_blank" rel="noopener noreferrer" className="bs-btn bs-btn-gold">
              {t(ui.nav.startYourProject, locale)}
            </a>
            <Button href={localizedPath(locale, "/services/cinematic-wedding")} variant="ghost">
              {isAr ? "باقة الزفاف السينمائي" : "Cinematic Wedding package"}
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* ORIGINAL DATA — Weddings by the numbers */}
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

      {/* PICK YOUR COVERAGE — four sub-services */}
      <Section>
        <Reveal>
          <Eyebrow>{isAr ? "اختر تغطيتك" : "Pick your coverage"}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr ? "أربع خدمات منفردة + باقة الزفاف السينمائي" : "Four standalone services + the Cinematic Wedding bundle"}
          </h2>
        </Reveal>
        <p className="bs-lead mt-6 !max-w-3xl">
          {isAr
            ? "زفاف واحد يمكن أن يجمع كل هذه الخدمات أو بعضها. كل خدمة لها صفحة مفصلة بأسعارها ومخرجاتها."
            : "One wedding can bundle any combination of these. Each service has its own page with full pricing, deliverables and FAQs — pick the ones your day needs."}
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              slug: "wedding-photography",
              title: isAr ? "تصوير الزفاف الفوتوغرافي" : "Wedding Photography",
              price: "AED 2,500 → 6,000",
              blurb: isAr
                ? "تصوير صور فقط يوم الزفاف — 1–3 مصورين، 400–800 صورة معدلة، بدون فيديو."
                : "Photo-only wedding coverage — 1–3 photographers, 400–800 edited images, no video. Engagement, ceremony, reception or full-day packages.",
            },
            {
              slug: "wedding-videography",
              title: isAr ? "تصوير فيديو الزفاف" : "Wedding Videography",
              price: "AED 3,500 → 6,000",
              blurb: isAr
                ? "فيديو فقط يوم الزفاف — ريل ملخص 3 أو 8 دقائق + فيديو حفل 20–40 دقيقة."
                : "Video-only wedding coverage — 3-min or 8-min highlight reel + 20–40 min ceremony cut. Drone add-on from AED 1,500.",
            },
            {
              slug: "wedding-photo-video",
              title: isAr ? "زفاف صور + فيديو" : "Wedding Photo + Video",
              price: "AED 6,000+",
              blurb: isAr
                ? "الباقة الأكثر شعبية — نفس الطاقم يغطي الصور والفيديو، يشارك الموقع والإضاءة."
                : "The most popular bundle — same crew covers photo and video, shares location and lighting. Day from AED 6,000; reel add-on AED 3,500–6,000.",
            },
            {
              slug: "wedding-same-day-teaser",
              title: isAr ? "تشويق نفس اليوم" : "Same-Day Teaser",
              price: "AED 4,500 add-on",
              blurb: isAr
                ? "تشويق 30–90 ثانية يُسلّم قبل 10 مساءً ليلة الزفاف. متاح فقط عندما يكون طاقمنا فريق الفيلم."
                : "30–90 sec teaser delivered by 10pm on the wedding night. Add-on only — available when the Big Story crew is the day's film team.",
            },
            {
              slug: "wedding-live-streaming",
              title: isAr ? "بث الزفاف المباشر" : "Wedding Live Streaming",
              price: "AED 6,000",
              blurb: isAr
                ? "بث الحفل على يوتيوب (خاص) وإنستغرام لايف للضيوف في الخارج. Hollyland 5G مربوط."
                : "Stream the ceremony on YouTube (private) and IG Live for overseas guests. 5G-bonded Hollyland Pyro S, multi-cam switched mix.",
            },
            {
              slug: "wedding-album-design",
              title: isAr ? "تصميم ألبوم الزفاف" : "Wedding Album Design",
              price: "AED 3,500",
              blurb: isAr
                ? "ألبوم 40 صفحة بغلاف صلب، 30×30 سم، طباعة أرشيفية. 4 أسابيع من اختيار الصور."
                : "40-page lay-flat hard-cover album, 30×30 cm, archival inkjet on Fuji Crystal paper. 4 weeks from photo selection.",
            },
            {
              slug: "wedding-engagement-session",
              title: isAr ? "جلسة خطوبة ما قبل الزفاف" : "Engagement Session",
              price: "AED 2,500",
              blurb: isAr
                ? "تصوير نصف يوم منظم قبل الزفاف — الموقع، الإضاءة، السيناريو. 80–150 صورة معدلة."
                : "Half-day styled shoot before the wedding — location, light, direction. 80–150 edited images. Saves-day option AED 3,500.",
            },
          ].map((c, i) => (
            <Reveal as="div" key={i} delay={i * 60} className="bs-card bs-card-hover">
              <span className="bs-eyebrow !text-[color:var(--color-gold)] before:!bg-[color:var(--color-gold)]">{c.price}</span>
              <h3 className="mt-4 text-xl">
                <Link href={localizedPath(locale, `/services/${c.slug}`)} className="hover:underline">
                  {c.title}
                </Link>
              </h3>
              <p className="mt-3 text-sm text-[color:var(--color-muted)]">{c.blurb}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* WHAT GOES INTO A WEDDING SHOOT */}
      <Section alt>
        <Reveal>
          <Eyebrow>{isAr ? "ماذا يتضمن تصوير الزفاف" : "What goes into a wedding shoot"}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr
              ? "ستة عناصر لتغطية زفاف احترافية"
              : "Six elements of a professional wedding shoot"}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              h: isAr ? "طاقم متخصص في الزفاف" : "Wedding-specialised crew",
              b: isAr
                ? "مصورو بيك ستوري يصورون 60+ حفل زفاف سنوياً. يعرفون تسلسل الحفل الإماراتي، وفصل الذكور/الإناث، وميقات الصلاة، وضغط الوقت على الوالدين."
                : "Big Story's photographers shoot 60+ weddings a year. They know UAE ceremony sequencing, gender-segregated rooms, prayer times, and how to handle parent time pressure without missing the vows.",
            },
            {
              h: isAr ? "كاميرات + إضاءة محمولة" : "Portable cameras + controlled light",
              b: isAr
                ? "Sony A7R V للصور (45MP) + Sony FX3 للفيديو. Aputure MC للديكور الخافت، Godox AD200 للومضة. لا حاجة لمأخذ كهربائي في معظم المواقع."
                : "Sony A7R V for stills (45MP) + Sony FX3 for video. Aputure MC for low-light reception, Godox AD200 for fill. No mains power needed at most venues.",
            },
            {
              h: isAr ? "مونتاج قصصي + تدرج ألوان" : "Story-driven edit + colour grade",
              b: isAr
                ? "لا ريل عرض شرائح. المونتاج يتبع القصة — التحضير، الوصول، النذور، الحفلة، الرقصة الأولى. تدرج ألوان DaVinci Resolve Studio لكل تسليم."
                : "No slide-show reels. The edit follows the story — prep, arrival, vows, party, first dance. DaVinci Resolve Studio colour grade on every deliverable.",
            },
            {
              h: isAr ? "تشويق + بث مباشر متكامل" : "Same-day teaser + live stream integrated",
              b: isAr
                ? "طاقمنا يقطع التشويق في نفس الموقع — لا حاجة لإرسال اللقطات لاستوديو خارجي. البث المباشر مدمج في الكاميرات: لا توجد معدات منفصلة في طريقك."
                : "Our crew cuts the teaser on site — no shuttling footage to an external studio. Live streaming is integrated into the cameras: no separate gear in your way.",
            },
            {
              h: isAr ? "ألبوم مطبوع + معرض إلكتروني" : "Printed album + online gallery",
              b: isAr
                ? "الألبوم 40 صفحة بغلاف صلب مطبوع في القوز. معرض اختيار الصور عبر الإنترنت، صديق للجوال، جولتا مراجعة مشمولتان، تحميل خاص للضيوف لمدة 12 شهراً."
                : "40-page hard-cover album printed in Al Quoz. Online proofing gallery, mobile-friendly, two revision rounds included, private guest download for 12 months.",
            },
            {
              h: isAr ? "تنسيق مع منظم الزفاف" : "Wedding-planner coordination",
              b: isAr
                ? "ننسق مع منظم الزفاف (Cherniak, Eventchic, The Qode) على قائمة اللقطات، الجدول، وأوقات 'اللا تصوير' (صلاة، عشاء، خطب). نحن جزء من فريق اليوم."
                : "We coordinate with your wedding planner (Cherniak, Eventchic, The Qode) on the shot list, run-of-show and 'no-shoot' moments (prayer, dinner, toasts). We are part of the day's team.",
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

      {/* FAQ */}
      <Section>
        <Reveal>
          <Eyebrow>{t(si.detail.faqs, locale)}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr ? "أسئلة متكررة عن الزفاف في دبي" : "FAQ — Weddings in Dubai"}
          </h2>
        </Reveal>
        <div className="mt-10">
          <Faq items={itemFaqs} />
        </div>
      </Section>

      {/* RELATED SERVICES */}
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
        heading={isAr ? "مستعد لمناقشة حفل زفافك؟" : "Ready to talk about your wedding?"}
        waContext={isAr ? "بخصوص تصوير الزفاف في دبي." : "Re: wedding photography and videography in Dubai."}
      />
    </>
  );
}
