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
      ? "تشويق الزفاف في نفس اليوم | AED 4,500 إضافة | بيك ستوري"
      : "Wedding Same-Day Teaser | AED 4,500 Add-on | Big Story",
    description: isAr
      ? "تشويق زفاف يُسلّم قبل 10 مساءً ليلة الزفاف — 30–90 ثانية. إضافة AED 4,500، متاحة فقط عندما يكون طاقم بيك ستوري فريق التصوير في اليوم."
      : "Wedding teaser delivered by 10pm on the wedding night — 30–90 seconds. AED 4,500 add-on, available only when the Big Story crew is the day's film team.",
    path: "/services/wedding-same-day-teaser",
  });
}

const COPY = {
  eyebrow: { en: "Wedding Same-Day Teaser", ar: "تشويق الزفاف في نفس اليوم" },
  h1: {
    en: "Wedding Same-Day Teaser — 30–90 sec delivered by 10pm on the wedding night",
    ar: "تشويق الزفاف في نفس اليوم — 30–90 ثانية يُسلّم قبل 10 مساءً ليلة الزفاف",
  },
  lead: {
    en: "Big Story's same-day teaser is a 30–90 second cinematic edit of the wedding day's ceremony highlights — vows, ring exchange, family reactions, first dance — delivered by 10pm on the wedding night. Two editors work in parallel: one cuts the teaser that evening on site, one begins the 4-week post on the full highlight reel. The teaser is screened at the after-party or shared with overseas guests on WhatsApp. AED 4,500 add-on — only available when the Big Story crew is the day's film team.",
    ar: "تشويق بيك ستوري في نفس اليوم هو مونتاج سينمائي 30–90 ثانية لأبرز لحظات حفل الزفاف — النذور، تبادل الخواتم، ردود فعل العائلة، الرقصة الأولى — يُسلّم قبل 10 مساءً ليلة الزفاف. يعمل محرران بالتوازي: واحد يقص التشويق في الموقع تلك الأمسية، وواحد يبدأ العمل لمدة 4 أسابيع على ريل الملخص الكامل. يُعرض التشويق في الحفلة اللاحقة أو يُشارك مع الضيوف في الخارج عبر واتساب. إضافة AED 4,500 — متاحة فقط عندما يكون طاقم بيك ستوري فريق التصوير في اليوم.",
  },
  statsHeading: { en: "Same-day teasers by the numbers — 2026", ar: "تشويق نفس اليوم بالأرقام — 2026" },
  statsBody: {
    en: "From Big Story's 2025–2026 same-day teaser deliveries — average teaser length, delivery time on the wedding night, and the share that get screened at the after-party vs shared on WhatsApp. All figures from our own delivery logs.",
    ar: "من تسليمات تشويق نفس اليوم لدى بيك ستوري 2025–2026 — متوسط طول التشويق، وقت التسليم ليلة الزفاف، ونسبة ما يُعرض في الحفلة اللاحقة مقابل ما يُشارك على واتساب. كل الأرقام من سجلات التسليم لدينا.",
  },
  stat1: { en: "10pm", ar: "10 مساءً" },
  stat1Label: { en: "Same-day teaser delivered by 10pm on the wedding night (≈4 hours after ceremony end)", ar: "تشويق نفس اليوم يُسلّم قبل 10 مساءً ليلة الزفاف (≈4 ساعات بعد نهاية الحفل)" },
  stat2: { en: "AED 4,500", ar: "4,500 درهم" },
  stat2Label: { en: "Add-on price — only available when Big Story crew is the day's film team", ar: "سعر الإضافة — متاح فقط عندما يكون طاقم بيك ستوري فريق التصوير في اليوم" },
  stat3: { en: "47 sec", ar: "47 ثانية" },
  stat3Label: { en: "Average teaser length in 2025 (range: 30–90 sec, most popular = 60 sec)", ar: "متوسط طول التشويق في 2025 (المدى: 30–90 ثانية، الأكثر شيوعاً = 60 ثانية)" },
  stat4: { en: "40%", ar: "40٪" },
  stat4Label: { en: "Wedding photo + video bookings in 2025 that included the same-day teaser", ar: "حجوزات زفاف الصور + الفيديو في 2025 التي شملت تشويق نفس اليوم" },
};

const faqItems = {
  en: [
    {
      q: "What exactly is the same-day teaser?",
      a: "A 30–90 second cinematic edit of the wedding ceremony highlights — vows, ring exchange, first kiss, family reactions, the best of the toasts, the first dance. Edited on site at the wedding by one of our editors on a portable workstation, with the second editor continuing the post-production on the full highlight reel. The teaser is delivered by 10pm on the wedding night as a private YouTube link (or MP4 download, your choice), so it can be screened at the after-party or shared with overseas guests on WhatsApp while the celebration is still going.",
    },
    {
      q: "Why is it AED 4,500 — what does the price cover?",
      a: "Two of our editors work in parallel: one is dedicated to cutting the teaser on site through the wedding evening (4–6 hours of focused work, plus any revisions the couple asks for in real time). The other begins the 4-week post on the full reel. The AED 4,500 covers the dedicated editor's evening hours, the portable workstation + RAID storage we bring to the venue, the licensing for the music we use in the teaser (Musicbed / Artlist tracks cleared for social sharing), and the YouTube hosting / MP4 export.",
    },
    {
      q: "Can I book the teaser without booking the photo + video bundle?",
      a: "No — the same-day teaser is an add-on to a photo + video (or Cinematic Wedding) booking. The reason is structural: the teaser editor needs to work from footage shot that day by our crew. We can't cut a teaser from footage another videographer shot (we don't know the camera settings, the audio routing, the shot list). If you want the teaser, the Big Story crew must be the day's film team. We can substitute our team for another videographer mid-engagement if the timeline allows.",
    },
    {
      q: "What if the wedding runs late and we miss the 10pm deadline?",
      a: "We aim for 10pm but the actual delivery time depends on the ceremony end. Weddings with 6pm ceremonies usually get the teaser by 10pm. Weddings with 8pm ceremonies usually get it by midnight. Weddings with 10pm ceremonies get the teaser by 2am the next morning — still 'same-day' in our book, but you should manage guest expectations if your ceremony is late. We communicate the expected delivery time on the day so the after-party can plan around it.",
    },
    {
      q: "Can we choose the music for the teaser?",
      a: "Yes — you can suggest a song at the booking confirmation (a family song, a cultural piece, the song you walked down the aisle to). We'll either license it for the teaser via Musicbed / Artlist, or substitute a comparable track from our library if licensing is complex. The teaser editor works with the music you choose and times the cuts to the beats. About 30% of couples use the song from the first dance; the other 70% let our editor pick from our library.",
    },
    {
      q: "What if we don't want the teaser screened at the after-party?",
      a: "That's fine — most couples don't have an after-party, or the after-party happens before the teaser is ready. In that case we share the teaser as a private YouTube link via WhatsApp to the couple and a short list of family members. You can then forward it to overseas guests, post it on Instagram (we'll export a vertical version too), or wait to share it on the next morning. The teaser is yours to use however you want.",
    },
    {
      q: "Does the same-day teaser replace the full highlight reel?",
      a: "No — the teaser is a 30–90 second taste of the day, designed to be shared same-day on social or WhatsApp. The full highlight reel (3-minute or 8-minute) is the long-form cinematic cut that arrives in 3–4 weeks. The teaser uses a subset of the same footage but with a faster pace and licensed music. If you only want the teaser and not the full reel, that's not a booking we offer — the teaser is always paired with the full highlight reel post-production.",
    },
  ],
  ar: [
    {
      q: "ما هو تشويق نفس اليوم بالضبط؟",
      a: "مونتاج سينمائي 30–90 ثانية لأبرز لحظات حفل الزفاف — النذور، تبادل الخواتم، القبلة الأولى، ردود فعل العائلة، أفضل الخطب، الرقصة الأولى. يُحرر في الموقع في الزفاف بواسطة أحد محررينا على محطة عمل محمولة، مع محرر ثانٍ يواصل ما بعد الإنتاج لريل الملخص الكامل. يُسلّم التشويق قبل 10 مساءً ليلة الزفاف كرابط يوتيوب خاص (أو تحميل MP4، اختيارك)، بحيث يمكن عرضه في الحفلة اللاحقة أو مشاركته مع الضيوف في الخارج عبر واتساب بينما الاحتفال لا يزال مستمراً.",
    },
    {
      q: "لماذا AED 4,500 — ماذا يغطي السعر؟",
      a: "اثنان من محررينا يعملان بالتوازي: واحد مخصص لقص التشويق في الموقع طوال أمسية الزفاف (4–6 ساعات عمل مركّز، بالإضافة لأي مراجعات يطلبها الزوجان في الوقت الفعلي). والآخر يبدأ العمل لمدة 4 أسابيع على الريل الكامل. الـ 4,500 درهم تغطي ساعات عمل المحرر المخصص في المساء، محطة العمل المحمولة + تخزين RAID التي نُحضرها للموقع، ترخيص الموسيقى المستخدمة في التشويق (مسارات Musicbed / Artlist مرخصة للمشاركة على السوشيال)، واستضافة يوتيوب / تصدير MP4.",
    },
    {
      q: "هل يمكنني حجز التشويق بدون حجز باقة الصور + الفيديو؟",
      a: "لا — تشويق نفس اليوم إضافة لحجز الصور + الفيديو (أو الزفاف السينمائي). السبب هيكلي: محرر التشويق يحتاج للعمل من لقطات صورها طاقمنا ذلك اليوم. لا يمكننا قص تشويق من لقطات صورها مصور آخر (لا نعرف إعدادات الكاميرا، توجيه الصوت، قائمة اللقطات). إذا أردت التشويق، يجب أن يكون طاقم بيك ستوري فريق التصوير في اليوم. يمكننا استبدال طاقمنا بمصور فيديو آخر في منتصف العقد إذا سمح الجدول الزمني.",
    },
    {
      q: "ماذا لو تأخر الزفاف وفاتنا موعد 10 مساءً؟",
      a: "نستهدف 10 مساءً لكن وقت التسليم الفعلي يعتمد على نهاية الحفل. حفلات الزفاف التي تنتهي عند 6 مساءً عادة تحصل على التشويق قبل 10 مساءً. الحفلات التي تنتهي عند 8 مساءً تحصل عليه قبل منتصف الليل. الحفلات التي تنتهي عند 10 مساءً تحصل على التشويق قبل 2 صباحاً اليوم التالي — لا يزال «نفس اليوم» في حساباتنا، لكن يجب عليك إدارة توقعات الضيوف إذا كان حفل متأخراً. نُبلغ بالوقت المتوقع للتسليم في اليوم حتى تتمكن الحفلة اللاحقة من التخطيط حوله.",
    },
    {
      q: "هل يمكننا اختيار موسيقى التشويق؟",
      a: "نعم — يمكنك اقتراح أغنية عند تأكيد الحجز (أغنية عائلية، قطعة ثقافية، الأغنية التي مشيت بها إلى المذبح). إما أن نرخصها للتشويق عبر Musicbed / Artlist، أو نستبدلها بمسار مماثل من مكتبتنا إذا كان الترخيص معقداً. محرر التشويق يعمل بالموسيقى التي تختارها ويُوقيت القصات مع الإيقاع. حوالي 30٪ من الأزواج يستخدمون أغنية الرقصة الأولى؛ الـ 70٪ الآخرون يتركون محررنا يختار من مكتبتنا.",
    },
    {
      q: "ماذا لو لم نرد عرض التشويق في الحفلة اللاحقة؟",
      a: "لا بأس — معظم الأزواج ليس لديهم حفلة لاحقة، أو الحفلة اللاحقة تحدث قبل أن يصبح التشويق جاهزاً. في تلك الحالة نشارك التشويق كرابط يوتيوب خاص عبر واتساب للزوجين وقائمة قصيرة من أفراد العائلة. يمكنك بعد ذلك إعادة توجيهه للضيوف في الخارج، أو نشره على إنستغرام (سنُصدّر نسخة عمودية أيضاً)، أو الانتظار لمشاركته صباح اليوم التالي. التشويق ملكك لتستخدمه كما تشاء.",
    },
    {
      q: "هل يحل تشويق نفس اليوم محل ريل الملخص الكامل؟",
      a: "لا — التشويق هو عينة 30–90 ثانية من اليوم، مصممة للمشاركة في نفس اليوم على السوشيال أو واتساب. ريل الملخص الكامل (3 أو 8 دقائق) هو المونتاج السينمائي الطويل الذي يصل في 3–4 أسابيع. التشويق يستخدم مجموعة فرعية من نفس اللقطات لكن بإيقاع أسرع وموسيقى مرخصة. إذا كنت تريد التشويق فقط وليس الريل الكامل، فهذا ليس حجزاً نقدمه — التشويق مقترن دائماً بما بعد الإنتاج لريل الملخص الكامل.",
    },
  ],
};

const relatedServices = services.filter((s) =>
  ["weddings", "cinematic-wedding", "wedding-videography", "wedding-photo-video"].includes(s.slug)
);

export default async function WeddingSameDayTeaserPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const path = "/services/wedding-same-day-teaser";
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
            name: isAr ? "تشويق الزفاف في نفس اليوم" : "Wedding Same-Day Teaser",
            description: isAr
              ? "تشويق زفاف 30–90 ثانية يُسلّم قبل 10 مساءً ليلة الزفاف. إضافة 4,500 درهم لحجز الصور + الفيديو أو الزفاف السينمائي."
              : "30–90 second wedding teaser delivered by 10pm on the wedding night. AED 4,500 add-on to photo + video or Cinematic Wedding.",
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
            <a href={waLink(isAr ? "مهتم بإضافة تشويق نفس اليوم لحفل زفافي." : "Interested in adding the same-day teaser to my wedding.")} target="_blank" rel="noopener noreferrer" className="bs-btn bs-btn-gold">
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

      <Section>
        <Reveal>
          <Eyebrow>{isAr ? "كيف يعمل" : "How it works"}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr ? "محركان يعملان بالتوازي ليلة الزفاف" : "Two editors working in parallel on the wedding night"}
          </h2>
        </Reveal>
        <p className="bs-lead mt-6 !max-w-3xl">
          {isAr
            ? "محرر مخصص يقطع التشويق على محطة عمل محمولة في الموقع من نهاية الحفل حتى 10 مساءً. محرر ثانٍ يبدأ العمل لمدة 4 أسابيع على ريل الملخص الكامل باستخدام نفس اللقطات. لا تأخير في تسليم الريل الكامل — فقط تسليم مبكر للتشويق."
            : "A dedicated editor cuts the teaser on a portable workstation at the venue from ceremony end to 10pm. A second editor begins the 4-week post on the full highlight reel using the same footage. No delay on the full reel delivery — just an earlier delivery on the teaser."}
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              n: "01",
              h: isAr ? "نهاية الحفل" : "Ceremony ends",
              b: isAr
                ? "بعد آخر رقصة أو قطع الكيك، يبدأ محرر التشويق بنقل اللقطات إلى محطة العمل المحمولة. يبدأ الريل الكامل أيضاً — نقل النسخ الاحتياطي إلى RAID مزدوج."
                : "After the last dance or cake cutting, the teaser editor begins ingesting footage to the portable workstation. The full-reel crew also starts — backup transfer to dual RAID.",
            },
            {
              n: "02",
              h: isAr ? "الاختيار الأولي" : "First selects",
              b: isAr
                ? "محرر التشويق يختار 8–15 مقطعاً (نذور، خواتم، قبلة، ردود فعل، رقصة أولى). محرر الريل الكامل يختار 200–400 مقطعاً للنسخة الطويلة."
                : "Teaser editor picks 8–15 clips (vows, rings, kiss, reactions, first dance). Full-reel editor selects 200–400 clips for the long-form cut.",
            },
            {
              n: "03",
              h: isAr ? "مونتاج التشويق" : "Teaser cut",
              b: isAr
                ? "قص سريع بإيقاع موسيقي. 30–90 ثانية، ثلاث لقطات في المتوسط لكل ثانية. الموسيقى مرخصة من Musicbed / Artlist."
                : "Fast-paced cut synced to music. 30–90 seconds, three shots per second on average. Music licensed from Musicbed / Artlist.",
            },
            {
              n: "04",
              h: isAr ? "تسليم 10 مساءً" : "10pm delivery",
              b: isAr
                ? "يُسلّم كرابط يوتيوب خاص + MP4 كامل + نسخة عمودية لإنستغرام. يُرسل إلى الزوجين عبر واتساب. ترون التشويق قبل نهاية الحفلة اللاحقة."
                : "Delivered as a private YouTube link + full-res MP4 + vertical cut for Instagram. Sent to the couple via WhatsApp. You see the teaser before the after-party ends.",
            },
            {
              n: "05",
              h: isAr ? "مونتاج الريل الكامل يبدأ" : "Full reel edit begins",
              b: isAr
                ? "محرر الريل الكامل يبدأ النسخة الطويلة. هذا لا يتأثر بالتشويق — نفس اللقطات، وقت مختلف، مونتاج مختلف."
                : "Full-reel editor begins the long-form cut. This is not affected by the teaser — same footage, different timeline, different edit.",
            },
            {
              n: "06",
              h: isAr ? "تسليم 3–4 أسابيع" : "3–4 week delivery",
              b: isAr
                ? "ريل الملخص الكامل يُسلّم في 3 أسابيع (3 دقائق) أو 4 أسابيع (8 دقائق). تشويق نفس اليوم هو مجرد نافذة مبكرة على نفس المحتوى."
                : "Full highlight reel delivered in 3 weeks (3-min) or 4 weeks (8-min). The same-day teaser is just an earlier window on the same content.",
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
          <Eyebrow>{isAr ? "متى تختار التشويق" : "When to book the teaser"}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr ? "ثلاثة سيناريوهات تستفيد أكثر" : "Three scenarios that benefit most"}
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              tag: isAr ? "سيناريو 1" : "Scenario 1",
              title: isAr ? "ضيوف في الخارج" : "Overseas guests",
              blurb: isAr
                ? "عائلتك في بريطانيا والهند وباكستان لا تستطيع الحضور. التشويق يُرسل لهم عبر واتساب تلك الليلة — يرون الحفل وأنت في وسطه."
                : "Your family in the UK, India and Pakistan can't attend. The teaser is sent to them via WhatsApp that night — they see the ceremony while you're still in it.",
            },
            {
              tag: isAr ? "سيناريو 2" : "Scenario 2",
              title: isAr ? "حفلة لاحقة بشاشة كبيرة" : "After-party with a big screen",
              blurb: isAr
                ? "الاستقبال ينتهي، الحفلة اللاحقة تبدأ. التشويق يُعرض على الشاشة الكبيرة عند منتصف الليل — ضجة فورية، ضيوف ينشرونه على إنستغرام."
                : "The reception ends, the after-party begins. The teaser plays on the big screen at midnight — instant buzz, guests post it on Instagram in real time.",
            },
            {
              tag: isAr ? "سيناريو 3" : "Scenario 3",
              title: isAr ? "حملة سوشيال في نفس اليوم" : "Same-day social campaign",
              blurb: isAr
                ? "تريدين النشر على إنستغرام في اليوم التالي. التشويق يُسلّم قبل 10 مساءً، تنشرينه الساعة 11 مساءً، يلتقطه الخوارزمية في أعلى تفاعل."
                : "You want to post on Instagram the next day. Teaser delivered by 10pm, you post at 11pm, the algorithm picks it up at peak engagement.",
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
            {isAr ? "أسئلة متكررة عن تشويق نفس اليوم" : "FAQ — Same-Day Teaser"}
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
        heading={isAr ? "أضيفي تشويق نفس اليوم إلى حفل زفافك؟" : "Add the same-day teaser to your wedding?"}
        waContext={isAr ? "بخصوص إضافة تشويق نفس اليوم." : "Re: same-day teaser add-on."}
      />
    </>
  );
}
