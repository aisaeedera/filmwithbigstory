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
      ? "تصوير فيديو الزفاف في دبي | ريل 3 دقائق AED 3,500 | بيك ستوري"
      : "Wedding Videography in Dubai | 3-min Reel AED 3,500 | Big Story",
    description: isAr
      ? "تصوير فيديو زفاف فقط في دبي — ريل 3 دقائق AED 3,500، ريل 8 دقائق AED 6,000، درون AED 1,500 إضافة. Sony FX3 + DaVinci تدرج ألوان."
      : "Video-only wedding coverage in Dubai — 3-min reel AED 3,500, 8-min reel AED 6,000, drone AED 1,500 add-on. Sony FX3 + DaVinci colour grade.",
    path: "/services/wedding-videography",
  });
}

const COPY = {
  eyebrow: { en: "Wedding Videography in Dubai", ar: "تصوير فيديو الزفاف في دبي" },
  h1: {
    en: "Wedding Videography in Dubai — 3-min or 8-min highlight reel + ceremony cut, drone add-on",
    ar: "تصوير فيديو الزفاف في دبي — ريل 3 أو 8 دقائق + قصة حفل، درون اختياري",
  },
  lead: {
    en: "Big Story's wedding videography is video-only coverage — Sony FX3 cinema-grade camera, 1 lead videographer + 1 assistant, plus a separate editor for the final cut. Two highlight reel lengths: 3-minute (AED 3,500) or 8-minute (AED 6,000). Both include a 20–40 minute ceremony cut. Drone add-on from AED 1,500. Same-day teaser add-on AED 4,500. Final delivery in 3–4 weeks.",
    ar: "تصوير فيديو الزفاف لدى بيك ستوري هو تغطية فيديو فقط — كاميرا سينمائية Sony FX3، مصور فيديو رئيسي + مساعد، بالإضافة لمحرر منفصل للنسخة النهائية. طولان لريل الملخص: 3 دقائق (3,500 درهم) أو 8 دقائق (6,000 درهم). كلاهما يشمل قصة حفل 20–40 دقيقة. إضافة الدرون من 1,500 درهم. تشويق نفس اليوم كإضافة 4,500 درهم. التسليم النهائي في 3–4 أسابيع.",
  },
  statsHeading: { en: "Wedding videography by the numbers — 2026", ar: "تصوير فيديو الزفاف بالأرقام — 2026" },
  statsBody: {
    en: "From Big Story's 2025–2026 wedding video delivery logs — average film length, drone add-on rate, and same-day teaser bookings. All figures from our own post-production ledger.",
    ar: "من سجلات تسليم فيديو الزفاف لدى بيك ستوري 2025–2026 — متوسط طول الفيلم، معدل إضافة الدرون، وحجوزات تشويق نفس اليوم. كل الأرقام من سجل ما بعد الإنتاج لدينا.",
  },
  stat1: { en: "AED 3,500 → 6,000", ar: "3,500 ← 6,000 درهم" },
  stat1Label: { en: "Two highlight-reel tiers: 3-min story-driven cut (AED 3,500) or 8-min cinematic cut (AED 6,000)", ar: "باقتا ريل ملخص: 3 دقائق سردي (3,500 درهم) أو 8 دقائق سينمائي (6,000 درهم)" },
  stat2: { en: "20–40 min", ar: "20–40 دقيقة" },
  stat2Label: { en: "Ceremony cut included with every wedding videography booking (full vows + speeches)", ar: "قصة حفل مشمولة مع كل حجز فيديو زفاف (نذور + خطب كاملة)" },
  stat3: { en: "3–4 weeks", ar: "3–4 أسابيع" },
  stat3Label: { en: "Standard post-production turnaround for the final highlight reel", ar: "مدة التسليم القياسية لما بعد الإنتاج لريل الملخص النهائي" },
  stat4: { en: "62%", ar: "62٪" },
  stat4Label: { en: "Wedding videography bookings in 2025 that added the licensed drone (DJI Inspire 3)", ar: "حجوزات فيديو الزفاف في 2025 التي أضافت الدرون المرخص (DJI Inspire 3)" },
};

const faqItems = {
  en: [
    {
      q: "What's the difference between the AED 3,500 and AED 6,000 wedding video packages?",
      a: "The AED 3,500 package is a 3-minute story-driven highlight reel — coverage of the key moments edited together with music, no dialogue or full vows. The AED 6,000 package is an 8-minute cinematic cut with longer scenes, more b-roll, the full first dance, more of the toasts, and a slower-paced edit. Both packages include a 20–40 minute ceremony cut with the full vows and speeches (delivered as a separate video file). Pick AED 3,500 when the brief is 'show us the day'; pick AED 6,000 when the brief is 'make us feel something'.",
    },
    {
      q: "What cameras do you use for wedding videography?",
      a: "Sony FX3 as the primary cinema camera — 4K Super 35, 10-bit 4:2:2, dual base ISO for low-light reception work. Sony A7S III as the B-cam (if booked). We bring Aputure 300D LED panels for the reception dance floor and Godox AD200 for fill. The kit is portable and runs on battery — no mains power needed at most venues. Drone coverage (optional) uses DJI Inspire 3 with our licensed operator.",
    },
    {
      q: "Can we add drone footage?",
      a: "Yes — AED 1,500 for the drone add-on, which covers up to 30 minutes of flight time, the licensed operator, and the NMC permit. Drone is integrated into the highlight reel (1–3 aerial shots) and the ceremony cut if requested. Most Dubai wedding venues permit drone flights, but some — particularly hotels near airports (Burj Al Arab, Burj Khalifa area) — require advance permit applications we handle as part of the booking.",
    },
    {
      q: "Do you record the vows and speeches in full?",
      a: "Yes — every booking includes a 20–40 minute 'ceremony cut' that captures the full vows, ring exchange, and 2–3 speeches in unedited sequence. We use wireless lavalier mics (Sennheiser G4) on the groom, bride and officiant so the audio is clean. The ceremony cut is delivered as a separate video file alongside the highlight reel — you can watch the highlights for Instagram and the ceremony cut for the family archive.",
    },
    {
      q: "How long is the final video, and when do we get it?",
      a: "The 3-minute reel is exactly 3:00–3:30. The 8-minute reel is exactly 8:00–8:30. Both delivered as a single MP4 master file (4K H.264, 1080p social cut included). The 20–40 minute ceremony cut is a separate MP4 file. Standard turnaround: 3–4 weeks from the wedding date (4 weeks for the 8-min package, 3 weeks for the 3-min package). Rush delivery (2 weeks) is available at +AED 1,200. Two rounds of revisions are included — list-based, similar to the photography revision policy.",
    },
    {
      q: "Can we add a same-day teaser?",
      a: "Yes — AED 4,500 for the same-day teaser add-on. A 30–90 second edit of the ceremony highlights delivered by 10pm on the wedding night. Two editors work in parallel: one cuts the teaser that evening, one begins the 4-week post on the full reel. The teaser is screened at the after-party or shared with overseas guests on WhatsApp. Available only when the Big Story crew is the day's film team (we can't cut a teaser from footage another videographer shot).",
    },
    {
      q: "What's the difference between Wedding Videography and Cinematic Wedding?",
      a: "Wedding Videography is video-only coverage with a single Sony FX3 lead videographer — good for the highlight reel and ceremony cut. Cinematic Wedding is Big Story's premium package: RED Komodo X A-cam + 2 FX3 B-cams + dedicated film director + 5 ACs + drone + 8–12 minute cinema-grade film + same-day teaser + DaVinci Resolve colour grade. Cinematic Wedding starts at AED 18,500 (Basic) or AED 35,000 (Premium, two-day, same-day teaser). Pick Wedding Videography when the brief is a highlight reel; pick Cinematic Wedding when the brief is a film that holds up on a cinema screen.",
    },
  ],
  ar: [
    {
      q: "ما الفرق بين باقتي فيديو الزفاف بـ 3,500 و 6,000 درهم؟",
      a: "الباقة 3,500 درهم هي ريل ملخص سردي 3 دقائق — تغطية للحظات الرئيسية مُحرّرة معاً بموسيقى، بدون حوار أو نذور كاملة. الباقة 6,000 درهم هي نسخة سينمائية 8 دقائق بمشاهد أطول، لقطات مساعدة أكثر، الرقصة الأولى كاملة، خطب أكثر، ومونتاج بإيقاع أبطأ. كلتا الباقتين تشتملان قصة حفل 20–40 دقيقة بالنذور والخطب الكاملة (تُسلّم كملف فيديو منفصل). اختر 3,500 درهم عندما يكون الإيجاز «أرنا اليوم»؛ اختر 6,000 درهم عندما يكون الإيجاز «اجعلنا نشعر بشيء».",
    },
    {
      q: "أي الكاميرات تستخدمون لتصوير فيديو الزفاف؟",
      a: "Sony FX3 كاميرا سينمائية رئيسية — 4K Super 35، 10-bit 4:2:2، ISO أساسي مزدوج لتصوير الاستقبال في الإضاءة المنخفضة. Sony A7S III كاميرا ثانوية (إذا تم الحجز). نُحضر ألواح Aputure 300D LED لحلبة الرقص و Godox AD200 للومضة. العدة محمولة وتعمل على البطارية — لا حاجة لمأخذ كهربائي في معظم المواقع. الدرون (اختياري) DJI Inspire 3 مع مشغل مرخص.",
    },
    {
      q: "هل يمكننا إضافة لقطات درون؟",
      a: "نعم — 1,500 درهم لإضافة الدرون، تغطي حتى 30 دقيقة طيران، المشغل المرخص، وتصريح NMC. يُدمج الدرون في ريل الملخص (1–3 لقطات جوية) وقصة الحفل إذا طُلب. معظم مواقع الزفاف في دبي تسمح بطيران الدرون، لكن بعضها — خاصة الفنادق القريبة من المطارات (منطقة برج العرب، برج خليفة) — تتطلب تصاريح مسبقة نتولاها كجزء من الحجز.",
    },
    {
      q: "هل تسجلون النذور والخطب كاملة؟",
      a: "نعم — كل حجز يشمل «قصة حفل» 20–40 دقيقة تلتقط النذور الكاملة وتبادل الخواتم و2–3 خطب بتسلسل غير مُحرر. نستخدم ميكروفونات لاسلكية (Sennheiser G4) على العريس والعروس والولي لالتقاط صوت نظيف. تُسلّم قصة الحفل كملف فيديو منفصل بجانب ريل الملخص — يمكنكم مشاهدة الملخص للإنستغرام وقصة الحفل لأرشيف العائلة.",
    },
    {
      q: "كم مدة الفيديو النهائي، ومتى نحصل عليه؟",
      a: "ريل الـ 3 دقائق 3:00–3:30 بالضبط. ريل الـ 8 دقائق 8:00–8:30 بالضبط. كلاهما يُسلّم كملف MP4 رئيسي واحد (4K H.264، نسخة 1080p سوشيال مشمولة). قصة الحفل 20–40 دقيقة ملف MP4 منفصل. مدة التسليم القياسية: 3–4 أسابيع من تاريخ الزفاف (4 أسابيع لباقة الـ 8 دقائق، 3 أسابيع لباقة الـ 3 دقائق). التسليم العاجل (أسبوعين) متاح بزيادة 1,200 درهم. جولتا مراجعة مشمولتان — قائمة على الاختيار، مشابهة لسياسة مراجعة التصوير الفوتوغرافي.",
    },
    {
      q: "هل يمكننا إضافة تشويق نفس اليوم؟",
      a: "نعم — 4,500 درهم لإضافة تشويق نفس اليوم. مونتاج 30–90 ثانية لأبرز لحظات الحفل يُسلّم قبل 10 مساءً ليلة الزفاف. يعمل محرران بالتوازي: واحد يقص التشويق تلك الأمسية، وواحد يبدأ العمل لمدة 4 أسابيع على الريل الكامل. يُعرض التشويق في الحفلة اللاحقة أو يُشارك مع الضيوف في الخارج عبر واتساب. متاح فقط عندما يكون طاقم بيك ستوري فريق التصوير في اليوم (لا يمكننا قص تشويق من لقطات مصورها آخر).",
    },
    {
      q: "ما الفرق بين فيديو الزفاف والزفاف السينمائي؟",
      a: "فيديو الزفاف تغطية فيديو فقط مع مصور Sony FX3 رئيسي واحد — مناسب لريل الملخص وقصة الحفل. الزفاف السينمائي باقة بيك ستوري المتميزة: RED Komodo X كاميرا رئيسية + 2 FX3 ثانوية + مخرج فيلم مخصص + 5 مساعدين + درون + فيلم سينمائي 8–12 دقيقة + تشويق نفس اليوم + تدرج ألوان DaVinci Resolve. الزفاف السينمائي يبدأ من 18,500 درهم (الأساسية) أو 35,000 درهم (المتميزة، يومين، تشويق نفس اليوم). اختر فيديو الزفاف عندما يكون الإيجاز ريل ملخص؛ اختر الزفاف السينمائي عندما يكون الإيجاز فيلماً يصمد على شاشة سينما.",
    },
  ],
};

const relatedServices = services.filter((s) =>
  ["weddings", "cinematic-wedding", "wedding-photography", "wedding-photo-video"].includes(s.slug)
);

export default async function WeddingVideographyPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const path = "/services/wedding-videography";
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
            name: isAr ? "تصوير فيديو الزفاف في دبي" : "Wedding Videography in Dubai",
            description: isAr
              ? "تصوير فيديو زفاف فقط في دبي — ريل 3 أو 8 دقائق + قصة حفل، درون اختياري، تشويق نفس اليوم."
              : "Video-only wedding coverage in Dubai — 3 or 8 min highlight reel + ceremony cut, drone add-on, same-day teaser.",
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
            <a href={waLink(isAr ? "مهتم بتصوير فيديو الزفاف في دبي." : "Interested in wedding videography in Dubai.")} target="_blank" rel="noopener noreferrer" className="bs-btn bs-btn-gold">
              {t(ui.nav.startYourProject, locale)}
            </a>
            <Button href={localizedPath(locale, "/services/cinematic-wedding")} variant="ghost">
              {isAr ? "باقة الزفاف السينمائي" : "Cinematic Wedding package"}
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
          <Eyebrow>{isAr ? "الباقتان" : "The two tiers"}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr ? "3 دقائق سردية أو 8 دقائق سينمائية" : "3-minute story-driven or 8-minute cinematic"}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {[
            {
              tag: isAr ? "باقة 1 · 3 دقائق" : "Package 1 · 3 minutes",
              title: isAr ? "ريل سردي 3 دقائق + قصة حفل" : "3-min story-driven reel + ceremony cut",
              blurb: isAr
                ? "AED 3,500. Sony FX3 + مصور رئيسي + مساعد. ريل 3 دقائق + قصة حفل 20–40 دقيقة. 3–4 أسابيع."
                : "AED 3,500. Sony FX3 + lead videographer + assistant. 3-min highlight reel + 20–40 min ceremony cut. 3-week post-production turnaround.",
            },
            {
              tag: isAr ? "باقة 2 · 8 دقائق" : "Package 2 · 8 minutes",
              title: isAr ? "ريل سينمائي 8 دقائق + قصة حفل" : "8-min cinematic reel + ceremony cut",
              blurb: isAr
                ? "AED 6,000. Sony FX3 + 2 كاميرات + طاقم أكبر + مونتاج أبطأ. ريل 8 دقائق + قصة حفل. 4 أسابيع."
                : "AED 6,000. Sony FX3 + 2 cameras + larger crew + slower-paced edit. 8-min highlight reel + ceremony cut. 4-week post-production turnaround.",
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

      <Section alt>
        <Reveal>
          <Eyebrow>{isAr ? "الإضافات المتاحة" : "Add-ons available"}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr ? "وسّع الباقة حسب يومك" : "Expand the package to fit your day"}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            { h: isAr ? "الدرون · AED 1,500" : "Drone · AED 1,500", b: isAr ? "DJI Inspire 3 + مشغل مرخص + تصريح NMC. 1–3 لقطات جوية في الريل." : "DJI Inspire 3 + licensed operator + NMC permit. 1–3 aerial shots in the reel." },
            { h: isAr ? "تشويق نفس اليوم · AED 4,500" : "Same-day teaser · AED 4,500", b: isAr ? "تشويق 30–90 ثانية يُسلّم قبل 10 مساءً ليلة الزفاف." : "30–90 sec teaser delivered by 10pm on the wedding night." },
            { h: isAr ? "كاميرا ثانية · AED 1,800" : "2nd camera · AED 1,800", b: isAr ? "Sony A7S III ثانية لمصادر بديلة وزوايا رد فعل الجمهور." : "Sony A7S III for cutaways and audience reaction angles." },
            { h: isAr ? "تسليم عاجل · + AED 1,200" : "Rush delivery · +AED 1,200", b: isAr ? "تخفيض مدة ما بعد الإنتاج من 4 إلى 2 أسابيع." : "Reduce post-production turnaround from 4 to 2 weeks." },
            { h: isAr ? "نسخ عمودية للسوشيال · AED 600" : "Vertical social cuts · AED 600", b: isAr ? "ريل عمودي 60 ثانية و 90 ثانية من الريل الرئيسي." : "60-sec and 90-sec vertical reels cut from the main film." },
            { h: isAr ? "تدرج ألوان ممتد · AED 800" : "Extended colour grade · AED 800", b: isAr ? "تدرج ألوان سينمائي أعمق في DaVinci Resolve Studio مع تصحيح ثانوي." : "Deeper cinematic colour grade in DaVinci Resolve Studio with secondary corrections." },
          ].map((card, i) => (
            <Reveal key={i} delay={i * 60} className="bs-card">
              <h3 className="text-xl">{card.h}</h3>
              <p className="mt-3 text-sm text-[color:var(--color-muted)]">{card.b}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <Eyebrow>{t(si.detail.faqs, locale)}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr ? "أسئلة متكررة عن فيديو الزفاف" : "FAQ — Wedding videography"}
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
        heading={isAr ? "مستعد لتصوير فيديو زفافك؟" : "Ready to book your wedding videography?"}
        waContext={isAr ? "بخصوص تصوير فيديو الزفاف في دبي." : "Re: wedding videography in Dubai."}
      />
    </>
  );
}
