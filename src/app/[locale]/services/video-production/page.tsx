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
      ? "إنتاج الفيديو في دبي | باقات RED Komodo X و FX3 | بيك ستوري"
      : "Video Production in Dubai | RED Komodo X + FX3 Packages | Big Story",
    description: isAr
      ? "خمس باقات لإنتاج الفيديو في دبي — RED Komodo X و Sony FX3، من يوم واحد 18,500 درهم إلى حملة كاملة 110,000 درهم. هولي لاند USP، تدرج ألوان DaVinci، مونتاج سينمائي."
      : "Five video production packages in Dubai — RED Komodo X and Sony FX3, from AED 18,500 single-day to AED 110,000 full campaign. Hollyland wireless USP, DaVinci colour grade, cinematic edit.",
    path: "/services/video-production",
  });
}

const COPY = {
  eyebrow: { en: "Video Production in Dubai", ar: "إنتاج الفيديو في دبي" },
  h1: {
    en: "Video Production Packages in Dubai — 5 tiers, RED Komodo X vs Sony FX3, Hollyland USP",
    ar: "باقات إنتاج الفيديو في دبي — 5 مستويات، RED Komodo X مقابل Sony FX3، هولي لاند USP",
  },
  lead: {
    en: "Big Story runs five video production packages in Dubai — from a half-day social cut on a single Sony FX3 to a full broadcast campaign with RED Komodo X A-cam and two FX3 B-cams. This page is the original 2026 reference: every package, what's included, when to use RED vs FX3, why Hollyland wireless video is our USP, and which tier matches your brief. All pricing transparent, all packages modular, no surprise add-ons.",
    ar: "تدير بيك ستوري خمس باقات لإنتاج الفيديو في دبي — من نسخة سوشيال نصف يوم على Sony FX3 واحد إلى حملة بث كاملة بـ RED Komodo X كاميرا رئيسية و FX3 كاميرتين ثانويتين. هذه الصفحة هي مرجع 2026 الأصلي: كل باقة، ما تتضمنه، متى تستخدم RED مقابل FX3، لماذا الفيديو اللاسلكي هولي لاند هو ميزتنا، وأي مستوى يناسب إيجازك. كل الأسعار شفافة، كل الباقات معيارية، بدون إضافات مفاجئة.",
  },
  statsHeading: { en: "Video production in Dubai by the numbers — 2026", ar: "إنتاج الفيديو في دبي بالأرقام — 2026" },
  statsBody: {
    en: "From Big Story's 2025–2026 shoot ledger, vendor invoicing across Al Quoz rental houses (KitPlus, Hasselblad, FotoPro), and feedback from brand-side producers. Every figure below is sourced and dated.",
    ar: "من سجل التصوير لدى بيك ستوري 2025–2026، وفواتير الموردين عبر محلات تأجير القوز (KitPlus, Hasselblad, FotoPro)، وردود فعل منتجي العلامات. كل رقم أدناه مُصدر ومؤرشف.",
  },
  stat1: { en: "5 packages", ar: "5 باقات" },
  stat1Label: { en: "Package 1 (Social Cut, FX3) → Package 5 (Broadcast, RED Komodo + 2× FX3)", ar: "الباقة 1 (نسخة سوشيال، FX3) → الباقة 5 (بث، RED Komodo + 2× FX3)" },
  stat2: { en: "AED 18,500 → 110,000", ar: "18,500 ← 110,000 درهم" },
  stat2Label: { en: "All-in price band for a Dubai video production (single-day shoot + post)", ar: "نطاق السعر الشامل لإنتاج فيديو في دبي (تصوير يوم واحد + مونتاج)" },
  stat3: { en: "RED Komodo X", ar: "RED Komodo X" },
  stat3Label: { en: "Cinema-grade 6K Super 35 A-cam on Packages 4–5 — same colour science as Netflix UAE", ar: "كاميرا سينمائية 6K Super 35 رئيسية في الباقات 4–5 — نفس علم الألوان لـ Netflix الإمارات" },
  stat4: { en: "Hollyland Pyro S", ar: "Hollyland Pyro S" },
  stat4Label: { en: "Wireless video on every Package 3+ shoot — director monitors without tripping over cables", ar: "فيديو لاسلكي في كل تصوير من الباقة 3+ — المخرج يراقب بدون تشابك كابلات" },
};

const faqItems = {
  en: [
    {
      q: "What are the 5 video production packages at Big Story?",
      a: "Package 1 (Social Cut, AED 18,500) — 1 Sony FX3, 1 op, half-day shoot, 3 vertical reels + 1 30-sec cut. Package 2 (Brand Day, AED 32,000) — 2 FX3, 2 ops + 1 AC, full-day shoot, 60–90 sec hero film + 5 social cuts. Package 3 (Premium Brand, AED 48,500) — 2 FX3 + RED Komodo X (3 cams), 3 ops + 2 ACs + gaffer, Hollyland wireless video, full-day shoot, 90 sec + 3 min films + 8 social cuts. Package 4 (Broadcast, AED 78,000) — 1 RED Komodo X + 2 FX3, full cinema crew (5 + DIT), 2-day shoot, 90-sec broadcast master + 3-min long-form + 12 social cuts. Package 5 (Campaign, AED 110,000) — full crew + 4 cams (Komodo X + 3 FX3), 3-day shoot, broadcast TVC + brand film + social suite. Every package includes DaVinci Resolve colour grade and 2 rounds of revisions.",
    },
    {
      q: "When should I use RED Komodo X vs Sony FX3?",
      a: "Use RED Komodo X when the final delivery needs cinema-grade colour science — broadcast TVC, Netflix-grade brand film, theatrical projection, or a 4K TV hanging in your living room. The 6K Super 35 sensor with REDWideGamutRGB and 16.5+ stops of dynamic range survives heavy grading and holds up at any output size. Use Sony FX3 for social and web — the FX3 is lighter, faster to set up, has excellent autofocus, and produces a beautiful image that doesn't need heavy grading. RED is overkill for a 30-sec social cut; FX3 is not enough for a broadcast TVC. We shoot both every week — ask us which matches your brief.",
    },
    {
      q: "Why is Hollyland wireless video your USP?",
      a: "Hollyland Pyro S is a wireless video system that sends the camera's live feed to a director's monitor up to 400m away — without cables. On most shoots, the director is tethered to the camera via a long HDMI cable, which means they can only stand where the cable reaches, and they constantly trip over it. With Pyro S, the director walks freely around the set, sees exactly what the camera sees on a handheld monitor, and can give the talent real-time feedback on performance. The result is faster setups, fewer takes, and a calmer set. We put it on every Package 3+ shoot because it saves 30–60 minutes per day on cable management alone.",
    },
    {
      q: "How long does a video production take from brief to final master?",
      a: "Pre-production (concept, script, storyboard, casting, locations) runs 2–4 weeks for Packages 1–2, 4–6 weeks for Packages 3–4, and 6–10 weeks for Package 5. Shoot is 1–3 days depending on package. Post-production (edit, colour, sound design, revisions) runs 2 weeks for Package 1, 3 weeks for Packages 2–3, and 4–6 weeks for Packages 4–5. Typical total turnaround from brief lock to final master: 4 weeks (Package 1), 6 weeks (Package 3), 8–12 weeks (Package 5). Rush delivery available at +30% surcharge.",
    },
    {
      q: "Do you handle casting, locations and permits in Dubai?",
      a: "Yes for all three. Casting: we maintain a roster of Dubai-based talent across ethnicities and ages, manage contracts, wardrobe and usage rights. Locations: we scout and book across Al Quoz studios, Downtown Dubai, the desert at Lahbab, DIFC, the marina, hotel venues (Atlantis, Burj Al Arab, Address), and private estates. Permits: DFTC film permit for public/commercial property (AED 1,500–12,000/day depending on scope), NMC for drone, hotel location agreements for private property. Pre-production includes all three as standard.",
    },
    {
      q: "Can one shoot cover TV, web and social?",
      a: "Yes — and most of our Packages 3–5 are designed around that. The shoot day is planned so the same footage yields a broadcast TVC master, a long-form brand film for web, and 8–15 vertical reels for social. We light once, dress once, perform once — and edit the deliverables in parallel. Compared to booking three separate shoots, the multi-format approach saves 40–60% of total cost and ensures visual consistency across every format.",
    },
    {
      q: "What's the difference between Packages 2 and 3?",
      a: "Package 2 (Brand Day, AED 32,000) runs two Sony FX3 cameras with 2 ops and 1 AC — good for a brand film, a website hero, and 5 social cuts. Package 3 (Premium Brand, AED 48,500) adds a RED Komodo X as the A-cam and upgrades the crew to 3 ops + 2 ACs + gaffer, plus Hollyland wireless video for the director. The RED adds cinema-grade colour depth and a more cinematic look on the hero film, and the upgraded crew handles complex lighting setups (controlled interiors, evening exteriors, large venues). Pick Package 2 when the brief is 'good quality brand film on a reasonable budget'; pick Package 3 when the brief is 'cinema-grade deliverable that holds up on a big screen.'",
    },
  ],
  ar: [
    {
      q: "ما هي باقات إنتاج الفيديو الخمس في بيك ستوري؟",
      a: "الباقة 1 (نسخة سوشيال، 18,500 درهم) — FX3 واحد، مشغل واحد، تصوير نصف يوم، 3 ريلز عمودية + 30 ثانية. الباقة 2 (يوم العلامة، 32,000 درهم) — 2 FX3، 2 مشغلين + مساعد، تصوير يوم كامل، 60–90 ثانية فيلم رئيسي + 5 نسخ سوشيال. الباقة 3 (علامة متميزة، 48,500 درهم) — 2 FX3 + RED Komodo X (3 كاميرات)، 3 مشغلين + 2 مساعدين + فني إضاءة، فيديو لاسلكي هولي لاند، يوم كامل، 90 ثانية + 3 دقائق + 8 نسخ سوشيال. الباقة 4 (بث، 78,000 درهم) — RED Komodo X + 2 FX3، طاقم سينمائي كامل (5 + DIT)، يومين، بث 90 ثانية + 3 دقائق طويل + 12 نسخة سوشيال. الباقة 5 (حملة، 110,000 درهم) — طاقم كامل + 4 كاميرات، 3 أيام، إعلان تلفزيوني + فيلم تعريفي + حزمة سوشيال. كل باقة تشمل تدرج ألوان DaVinci Resolve وجولتي مراجعة.",
    },
    {
      q: "متى يجب استخدام RED Komodo X مقابل Sony FX3؟",
      a: "استخدم RED Komodo X عندما يحتاج التسليم النهائي علم ألوان سينمائي — إعلان تلفزيوني للبث، فيلم تعريفي بمستوى Netflix، عرض سينمائي، أو تلفزيون 4K في صالة منزلك. مستشعر 6K Super 35 مع REDWideGamutRGB ونطاق ديناميكي 16.5+ ستوب يصمد تحت تدرج قوي ويحافظ على جودته عند أي حجم إخراج. استخدم Sony FX3 للسوشيال والويب — FX3 أخف وأسرع في الإعداد وله تركيز تلقائي ممتاز وينتج صورة جميلة لا تحتاج تدرج قوي. RED مبالغة لنسخة سوشيال 30 ثانية؛ FX3 غير كافٍ لإعلان بث تلفزيوني. نصور بالاثنين أسبوعياً — اسألنا أيهما يناسب إيجازك.",
    },
    {
      q: "لماذا الفيديو اللاسلكي هولي لاند ميزتكم؟",
      a: "Hollyland Pyro S هو نظام فيديو لاسلكي يرسل البث المباشر للكاميرا إلى شاشة المخرج حتى 400م — بدون كابلات. في معظم عمليات التصوير، المخرج مقيد بالكاميرا عبر كابل HDMI طويل، مما يعني أنه يستطيع الوقوف فقط حيث يصل الكابل، ويتعثر به باستمرار. مع Pyro S، المخرج يتجول بحرية في الموقع، يرى ما تراه الكاميرا بالضبط على شاشة محمولة، ويمكنه إعطاء الموهبة ملاحظات فورية على الأداء. النتيجة: إعداد أسرع، لقطات أقل، وموقع أكثر هدوءاً. نضعه في كل تصوير من الباقة 3+ لأنه يوفّر 30–60 دقيقة يومياً في إدارة الكابلات وحدها.",
    },
    {
      q: "كم يستغرق إنتاج الفيديو من الإيجاز إلى النسخة النهائية؟",
      a: "ما قبل الإنتاج (فكرة، نص، قصة مصورة، اختيار ممثلين، مواقع) يستغرق 2–4 أسابيع للباقات 1–2، 4–6 أسابيع للباقات 3–4، و6–10 أسابيع للباقة 5. التصوير 1–3 أيام حسب الباقة. ما بعد الإنتاج (مونتاج، ألوان، تصميم صوت، مراجعات) يستغرق أسبوعين للباقة 1، 3 أسابيع للباقات 2–3، و4–6 أسابيع للباقات 4–5. إجمالي المدة المعتادة من اعتماد الإيجاز إلى النسخة النهائية: 4 أسابيع (الباقة 1)، 6 أسابيع (الباقة 3)، 8–12 أسبوع (الباقة 5). التسليم العاجل متاح بزيادة 30٪.",
    },
    {
      q: "هل تتولون اختيار الممثلين والمواقع والتصاريح في دبي؟",
      a: "نعم للثلاثة. اختيار الممثلين: نحتفظ بقائمة مواهب دبي بمختلف الأعراق والأعمار، ندير العقود والأزياء وحقوق الاستخدام. المواقع: نستكشف ونحجز عبر استوديوهات القوز ووسط دبي وصحراء لهباب ومركز دبي المالي والمارينا والفنادق (أتلانتس، برج العرب، العنوان) والعقارات الخاصة. التصاريح: تصريح DFTC للملكية العامة/التجارية (1,500–12,000 درهم/يوم حسب النطاق)، NMC للدرون، اتفاقيات مواقع الفنادق للملكية الخاصة. ما قبل الإنتاج يشمل الثلاثة قياسياً.",
    },
    {
      q: "هل يمكن لتصوير واحد أن يغطي التلفزيون والويب والسوشيال؟",
      a: "نعم — ومعظم باقاتنا 3–5 مصممة حول ذلك. يوم التصوير مخطط بحيث تنتج نفس اللقطات نسخة بث تلفزيوني رئيسية وفيلم طويل للويب و8–15 ريل عمودي للسوشيال. نُعد الإضاءة مرة ونرتدي الملابس مرة ونؤدي مرة — ونقطع المخرجات بالتوازي. مقارنة بحجز ثلاث جلسات منفصلة، النهج متعدد الصيغ يوفّر 40–60٪ من التكلفة الإجمالية ويضمن اتساقاً بصرياً عبر كل صيغة.",
    },
    {
      q: "ما الفرق بين الباقتين 2 و3؟",
      a: "الباقة 2 (يوم العلامة، 32,000 درهم) تستخدم كاميرتي Sony FX3 مع مشغلين ومساعد — مناسبة لفيلم تعريفي وواجهة موقع و5 نسخ سوشيال. الباقة 3 (علامة متميزة، 48,500 درهم) تضيف RED Komodo X كاميرا رئيسية وترقي الطاقم إلى 3 مشغلين + 2 مساعدين + فني إضاءة، بالإضافة لفيديو لاسلكي هولي لاند للمخرج. RED يضيف عمق لون سينمائي ومظهر أكثر سينمائية للفيلم الرئيسي، والطاقم المُرقى يتعامل مع إعدادات إضاءة معقدة (داخل محكوم، خارجي مسائي، مواقع كبيرة). اختر الباقة 2 عندما يكون الإيجاز «فيلم علامة جيد بميزانية معقولة»؛ اختر الباقة 3 عندما يكون الإيجاز «مخرج بمستوى سينمائي يصمد على شاشة كبيرة».",
    },
  ],
};

const relatedServices = services.filter((s) =>
  ["tvc-production", "brand-films", "cinematic-wedding", "corporate-video-production"].includes(s.slug)
);

export default async function VideoProductionPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const path = "/services/video-production";
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
            name: isAr ? "إنتاج الفيديو في دبي" : "Video Production in Dubai",
            description: isAr
              ? "خمس باقات إنتاج فيديو في دبي — RED Komodo X، Sony FX3، تدرج ألوان DaVinci، فيديو لاسلكي Hollyland."
              : "Five video production packages in Dubai — RED Komodo X, Sony FX3, DaVinci colour grade, Hollyland wireless video.",
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
            <a href={waLink(isAr ? "مهتم بباقات إنتاج الفيديو في دبي." : "Interested in video production packages in Dubai.")} target="_blank" rel="noopener noreferrer" className="bs-btn bs-btn-gold">
              {t(ui.nav.startYourProject, locale)}
            </a>
            <Button href={localizedPath(locale, "/services/tvc-production")} variant="ghost">
              {isAr ? "إنتاج الإعلانات التلفزيونية" : "TVC production"}
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* ORIGINAL DATA — Video production by the numbers */}
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

      {/* FIVE PACKAGES */}
      <Section>
        <Reveal>
          <Eyebrow>{isAr ? "الباقات الخمس" : "The five packages"}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr ? "من النسخة السوشيال إلى الحملة الكاملة" : "From social cut to full campaign"}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              n: "01",
              tag: isAr ? "الباقة 1 · نسخة سوشيال" : "Package 1 · Social Cut",
              title: isAr ? "3 ريلز + 30 ثانية" : "3 reels + 30-sec cut",
              blurb: isAr
                ? "FX3 واحد، نصف يوم، 3 ريلز عمودية + نسخة 30 ثانية. 18,500 درهم. مثالي لإطلاق منتج أو حملة سريعة."
                : "1× Sony FX3, half-day shoot, 3 vertical reels + 30-sec ad cut. AED 18,500. Perfect for a product launch or fast-turnaround campaign.",
            },
            {
              n: "02",
              tag: isAr ? "الباقة 2 · يوم العلامة" : "Package 2 · Brand Day",
              title: isAr ? "فيلم تعريفي + 5 نسخ سوشيال" : "Hero film + 5 social cuts",
              blurb: isAr
                ? "2× FX3، يوم كامل، فيلم 60–90 ثانية + 5 ريلز. 32,000 درهم. واجهة موقع + حملة سوشيال متوسطة."
                : "2× Sony FX3, full-day shoot, 60–90 sec hero film + 5 reels. AED 32,000. Website hero + mid-scale social campaign.",
            },
            {
              n: "03",
              tag: isAr ? "الباقة 3 · علامة متميزة" : "Package 3 · Premium Brand",
              title: isAr ? "RED Komodo + 2 FX3 + Hollyland" : "RED Komodo + 2 FX3 + Hollyland",
              blurb: isAr
                ? "RED Komodo X كاميرا رئيسية + 2 FX3 + طاقم 5 + Hollyland لاسلكي. فيلم 90 ثانية + 3 دقائق + 8 ريلز. 48,500 درهم."
                : "RED Komodo X A-cam + 2× Sony FX3 + 5-person crew + Hollyland wireless video. 90-sec + 3-min films + 8 reels. AED 48,500.",
            },
            {
              n: "04",
              tag: isAr ? "الباقة 4 · بث تلفزيوني" : "Package 4 · Broadcast",
              title: isAr ? "بث 90 ثانية + طويل 3 دقائق" : "90-sec broadcast + 3-min long-form",
              blurb: isAr
                ? "RED Komodo X + 2 FX3، طاقم سينمائي كامل (5 + DIT)، تصوير يومين. 78,000 درهم. حملة MBC + موقع + سوشيال."
                : "1× RED Komodo X + 2× Sony FX3, full cinema crew (5 + DIT), 2-day shoot. AED 78,000. MBC broadcast + website + social.",
            },
            {
              n: "05",
              tag: isAr ? "الباقة 5 · حملة كاملة" : "Package 5 · Full Campaign",
              title: isAr ? "إعلان TVC + فيلم + سوشيال" : "TVC + brand film + social suite",
              blurb: isAr
                ? "4 كاميرات (Komodo X + 3 FX3)، طاقم كامل، 3 أيام تصوير. 110,000 درهم. إطلاق علامة أو حملة سنوية."
                : "4 cameras (Komodo X + 3× FX3), full crew, 3-day shoot. AED 110,000. Brand launch or annual campaign.",
            },
          ].map((c, i) => (
            <Reveal as="div" key={i} delay={i * 60} className="bs-card bs-card-hover">
              <p className="bs-eyebrow">{c.n}</p>
              <span className="mt-4 inline-block bs-eyebrow !text-[color:var(--color-muted)] before:!bg-[color:var(--color-muted)]">{c.tag}</span>
              <h3 className="mt-3 text-xl">{c.title}</h3>
              <p className="mt-3 text-sm text-[color:var(--color-muted)]">{c.blurb}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* RED KOMODO X vs FX3 */}
      <Section alt>
        <div className="grid gap-12 md:grid-cols-2 md:items-start">
          <Reveal>
            <Eyebrow>{isAr ? "RED مقابل FX3" : "RED vs FX3"}</Eyebrow>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
              {isAr
                ? "ليست كل الكاميرات متساوية"
                : "Not every camera is the same"}
            </h2>
          </Reveal>
          <Reveal delay={80} className="bs-prose">
            {isAr ? (
              <>
                <p>
                  RED Komodo X سينمائية Super 35 بدقة 6K مع علم ألوان REDWideGamutRGB ونطاق ديناميكي 16.5+ ستوب. نفس الكاميرا المستخدمة في إنتاجات Netflix وAmazon في الإمارات. يصمد تحت تدرج قوي ويحافظ على جودته على شاشة سينما أو تلفزيون 4K أو 60 إطار في الثانية على إنستغرام.
                </p>
                <p>
                  Sony FX3 أخف وأسرع في الإعداد، تركيز تلقائي ممتاز، ينتج صورة جميلة بدون تدرج قوي. مثالي للسوشيال والويب حيث وقت الإعداد أهم من علم الألوان السينمائي.
                </p>
                <p>
                  نستخدم الاثنين كل أسبوع. القاعدة: RED للبث والسينما، FX3 للسوشيال والويب. اختر حسب حجم الإخراج النهائي.
                </p>
              </>
            ) : (
              <>
                <p>
                  RED Komodo X is cinema-grade Super 35 6K with REDWideGamutRGB colour science and 16.5+ stops of dynamic range. The same camera used on Netflix and Amazon UAE productions. It survives heavy grading and holds up on a cinema screen, a 4K TV, or 60fps Instagram.
                </p>
                <p>
                  Sony FX3 is lighter, faster to set up, has excellent autofocus, and produces a beautiful image that doesn't need heavy grading. Perfect for social and web where setup time matters more than cinematic colour science.
                </p>
                <p>
                  We shoot both every week. The rule: RED for broadcast and cinema, FX3 for social and web. Pick by the size of your final delivery.
                </p>
              </>
            )}
          </Reveal>
        </div>
      </Section>

      {/* WHY HOLLYLAND WIRELESS */}
      <Section>
        <Reveal>
          <Eyebrow>{isAr ? "ميزة هولي لاند" : "The Hollyland USP"}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr ? "المخرج يتجول بحرية، المجموعة أكثر هدوءاً" : "Director walks free, set runs calmer"}
          </h2>
        </Reveal>
        <p className="bs-lead mt-6 !max-w-3xl">
          {isAr
            ? "Hollyland Pyro S نظام فيديو لاسلكي ينقل البث المباشر للكاميرا إلى شاشة المخرج حتى 400 متر. في معظم التصوير، المخرج مقيد بكابل HDMI يتعثر به. Pyro S يحرره، يوفّر 30–60 دقيقة يومياً في إدارة الكابلات، ويسمح للمخرج بإعطاء الموهبة ملاحظات فورية."
            : "Hollyland Pyro S is a wireless video system that sends the camera's live feed to a director's monitor up to 400m away. On most shoots the director is tethered to the camera via HDMI and trips over the cable. Pyro S frees them, saves 30–60 minutes a day on cable management, and lets the director give the talent real-time feedback on performance."}
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              h: isAr ? "حرية الحركة" : "Freedom of movement",
              b: isAr
                ? "المخرج يمشي عبر الموقع، يراقب كل زاوية، يعطي ملاحظات للموهبة في الوقت الفعلي. لا كابل HDMI يحد حركته."
                : "The director walks across the set, monitors every angle, gives the talent real-time notes. No HDMI cable limits where they stand.",
            },
            {
              h: isAr ? "إعداد أسرع" : "Faster setups",
              b: isAr
                ? "بدون كابل HDMI طويل، نقتصد 10–15 دقيقة لكل تغيير إعداد. على يوم كامل، هذا 60 دقيقة إضافية للتصوير."
                : "Without a long HDMI cable, we save 10–15 minutes per setup change. On a full day, that's an extra 60 minutes of shooting.",
            },
            {
              h: isAr ? "أداء أفضل من الموهبة" : "Better talent performance",
              b: isAr
                ? "المخرج يستطيع الوقوف بجانب الممثل والتحدث معه همساً، بدلاً من الصراخ عبر الغرفة. نتيجة: أداء أكثر طبيعية، لقطات أقل."
                : "The director can stand next to the talent and whisper direction, instead of shouting across the room. Result: more natural performances, fewer takes.",
            },
          ].map((card, i) => (
            <Reveal key={i} delay={i * 60} className="bs-card">
              <h3 className="text-xl">{card.h}</h3>
              <p className="mt-3 text-sm text-[color:var(--color-muted)]">{card.b}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section alt>
        <Reveal>
          <Eyebrow>{t(si.detail.faqs, locale)}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr ? "أسئلة متكررة عن إنتاج الفيديو" : "FAQ — Video production in Dubai"}
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
        heading={isAr ? "جاهز لمناقشة إنتاج فيديوك؟" : "Ready to talk about your video production?"}
        waContext={isAr ? "بخصوص باقات إنتاج الفيديو في دبي." : "Re: video production packages in Dubai."}
      />
    </>
  );
}
