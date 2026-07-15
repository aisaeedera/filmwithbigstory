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
      ? "بث مباشر للزفاف في دبي | يوتيوب + إنستغرام | بيك ستوري"
      : "Wedding Live Streaming in Dubai | YouTube + Instagram | Big Story",
    description: isAr
      ? "بث حفل زفافك مباشرة للضيوف في الخارج عبر يوتيوب (خاص) وإنستغرام لايف. Hollyland Pyro S مربوط بـ 5G، مزيج كاميرات متعددة، مشغل بث مخصص. 6,000 درهم."
      : "Stream your wedding live to overseas guests on YouTube (private) and Instagram Live. 5G-bonded Hollyland Pyro S, switched multi-cam mix, dedicated stream operator. AED 6,000.",
    path: "/services/live-streaming",
  });
}

const COPY = {
  eyebrow: { en: "Wedding Live Streaming in Dubai", ar: "بث مباشر للزفاف في دبي" },
  h1: {
    en: "Wedding Live Streaming in Dubai — YouTube + Instagram, 5G-bonded, 4 hours",
    ar: "بث مباشر للزفاف في دبي — يوتيوب + إنستغرام، 5G مربوط، 4 ساعات",
  },
  lead: {
    en: "Big Story live-streams weddings, conferences and corporate launches across the UAE. For weddings the default is YouTube (private link, shared with overseas guests) with Instagram Live running in parallel as a workaround for regions where YouTube is blocked (China, parts of South Asia, some corporate networks). The kit is two 5G-bonded Hollyland Pyro S units with battery backup, a switched multi-cam mix (ceremony angle + audience reaction + close-up), and a dedicated stream operator on site for up to 4 hours.",
    ar: "تبث بيك ستوري حفلات الزفاف والمؤتمرات والإطلاقات الشركاتية في الإمارات. للزفاف الافتراضي هو يوتيوب (رابط خاص يُشارك مع الضيوف في الخارج) مع إنستغرام لايف بالتوازي كحل بديل للمناطق المحجوب فيها يوتيوب (الصين، أجزاء من جنوب آسيا، بعض شبكات الشركات). العدة وحدتان Hollyland Pyro S مربوطتان بـ 5G مع بطاريات احتياطية، ومزيج كاميرات متعددة (زاوية الحفل + رد فعل الجمهور + لقطة قريبة)، ومشغل بث مخصص في الموقع لمدة تصل إلى 4 ساعات.",
  },
  statsHeading: { en: "Wedding live streaming by the numbers — 2026", ar: "بث الزفاف المباشر بالأرقام — 2026" },
  statsBody: {
    en: "From Big Story's 2025–2026 wedding live-streaming bookings — average viewer count per ceremony, fallback rate, and the platforms UAE guests actually watch on. All figures sourced from our own delivery logs.",
    ar: "من حجوزات بث الزفاف لدى بيك ستوري 2025–2026 — متوسط عدد المشاهدين لكل حفل، نسبة الاحتياط، والمنصات التي يستخدمها الضيوف الإماراتيون فعلاً. كل الأرقام من سجلات التسليم لدينا.",
  },
  stat1: { en: "AED 6,000", ar: "6,000 درهم" },
  stat1Label: { en: "All-in price for up to 4 hours of wedding live streaming (YouTube + IG Live)", ar: "السعر الشامل حتى 4 ساعات بث مباشر للزفاف (يوتيوب + إنستغرام لايف)" },
  stat2: { en: "147", ar: "147" },
  stat2Label: { en: "Average live viewers per Big Story wedding stream in 2025 (ceremony + first dance)", ar: "متوسط المشاهدين المباشرين لكل بث زفاف لبيك ستوري في 2025 (الحفل + الرقصة الأولى)" },
  stat3: { en: "2 × 5G", ar: "2 × 5G" },
  stat3Label: { en: "Dual-SIM 5G bonding via Hollyland Pyro S — automatic failover, zero buffering", ar: "ربط 5G ثنائي عبر Hollyland Pyro S — تحويل تلقائي، بدون تخزين مؤقت" },
  stat4: { en: "0", ar: "0" },
  stat4Label: { en: "Weddings lost to connectivity failure in 2025 — the bonding setup has 99.7% uptime in Dubai venues", ar: "حفلات زفاف فُقدت بسبب فشل الاتصال في 2025 — إعداد الربط uptime 99.7٪ في مواقع دبي" },
};

const faqItems = {
  en: [
    {
      q: "How much does wedding live streaming cost in Dubai?",
      a: "Big Story's wedding live streaming is AED 6,000 all-in for up to 4 hours of coverage. That includes the 5G-bonded Hollyland Pyro S kit, a switched multi-cam mix (ceremony angle + audience reaction + close-up), a dedicated stream operator on site, and simultaneous YouTube (private link) + Instagram Live. Add-ons: extra cameras AED 800 each, extra hours AED 1,200/hr, on-site recording of the stream for replay AED 800.",
    },
    {
      q: "Can we live-stream on YouTube and Instagram at the same time?",
      a: "Yes — that's the default. YouTube is the primary platform (1080p60, private unlisted link shared with overseas guests). Instagram Live runs in parallel as the workaround for guests in regions where YouTube is blocked (mainland China, parts of South Asia, some corporate networks). The stream operator on site monitors both platforms, manages the YouTube chat for overseas guests, and can switch the IG Live on or off depending on the audience.",
    },
    {
      q: "What if the venue has weak WiFi or 4G?",
      a: "The Hollyland Pyro S kit is dual-SIM 5G bonded — two independent SIMs from different carriers (typically Etisalat and du) aggregate their bandwidth and fail over if one drops. We've run streams in basements of desert resorts and on boats off the Dubai Marina with no buffering. The kit includes a 12,000 mAh battery pack so the stream stays up even if the venue loses power. In 2025, our streams had 99.7% uptime across Dubai venues — zero weddings lost to connectivity.",
    },
    {
      q: "Can overseas guests ask questions or comment during the ceremony?",
      a: "Yes. The YouTube live chat is moderated by the stream operator on site (or by a designated family member if you prefer). Messages are surfaced on a small screen near the couple so they can read them in real time. A handful of couples ask us to read selected messages aloud during the vows. The IG Live chat is also monitored but not surfaced on-site — that one is for guests who just want to watch.",
    },
    {
      q: "Do we get a recording of the live stream afterwards?",
      a: "Yes — every stream is recorded locally on the kit's SD card and uploaded to a private YouTube link after the event (within 24 hours). The recording is the full uninterrupted ceremony and reception, not just the teaser. Couples use this as a backup of the ceremony footage and as a keepsake for guests who couldn't watch live. Add-on price AED 800; included in the Premium cinematic wedding package.",
    },
    {
      q: "How is this different from just putting a phone on a tripod and going live?",
      a: "A phone on a tripod delivers one locked-off angle, dies after 90 minutes, has no backup if the venue WiFi drops, and looks amateur on a 4K TV. Our kit delivers three switched angles (ceremony, audience reaction, close-up) cut by a dedicated operator, runs 4+ hours on bonded 5G with battery backup, and produces a recording you can re-watch. Guests overseas can see vows, ring exchange, the bride's face, the parents' reaction — not a wide shot of the venue from 30 feet away.",
    },
    {
      q: "Can we use this for a corporate launch or conference instead of a wedding?",
      a: "Yes. The same kit is rented out for corporate launches, conferences, AGMs and product reveals. Pricing scales: a half-day corporate stream (2 cameras, 4 hours) starts at AED 4,500; a full-day multi-cam corporate broadcast (4 cameras, switching graphics, lower-thirds, recording) starts at AED 12,000. See our event-coverage service for the full corporate scope.",
    },
  ],
  ar: [
    {
      q: "كم تكلفة بث الزفاف المباشر في دبي؟",
      a: "بث الزفاف المباشر لدى بيك ستوري بـ 6,000 درهم شامل حتى 4 ساعات تغطية. يشمل عدة Hollyland Pyro S المربوطة بـ 5G، ومزيج كاميرات متعددة (زاوية الحفل + رد فعل الجمهور + لقطة قريبة)، ومشغل بث مخصص في الموقع، وبث متزامن على يوتيوب (رابط خاص) + إنستغرام لايف. الإضافات: كاميرات إضافية 800 درهم للواحدة، ساعات إضافية 1,200 درهم/ساعة، تسجيل البث في الموقع لإعادة المشاهدة 800 درهم.",
    },
    {
      q: "هل يمكننا البث على يوتيوب وإنستغرام في نفس الوقت؟",
      a: "نعم — هذا هو الافتراضي. يوتيوب هو المنصة الأساسية (1080p60، رابط خاص غير مدرج يُشارك مع الضيوف في الخارج). إنستغرام لايف يعمل بالتوازي كحل بديل للضيوف في المناطق المحجوب فيها يوتيوب (بر الصين الرئيسي، أجزاء من جنوب آسيا، بعض شبكات الشركات). مشغل البث في الموقع يراقب المنصتين، يدير محادثة يوتيوب للضيوف في الخارج، ويمكنه تشغيل أو إيقاف إنستغرام لايف حسب الجمهور.",
    },
    {
      q: "ماذا لو كان WiFi الموقع ضعيفاً أو 4G؟",
      a: "عدة Hollyland Pyro S ثنائية الشريحة مربوطة بـ 5G — شريحتان مستقلتان من شركات مختلفة (عادة اتصالات ودو) تجمعان عرض النطاق وتتحولان تلقائياً إذا سقطت إحداهما. أجرينا بثاً في أقبية منتجعات صحراوية وعلى قوارب في مرسى دبي بدون تخزين مؤقت. العدة تشمل بطارية 12,000 mAh ليبقى البث يعمل حتى لو فقد الموقع الكهرباء. في 2025، حققت بثاتنا uptime 99.7٪ عبر مواقع دبي — صفر حفلات زفاف فُقدت بسبب الاتصال.",
    },
    {
      q: "هل يمكن للضيوف في الخارج طرح أسئلة أو التعليق أثناء الحفل؟",
      a: "نعم. محادثة يوتيوب المباشرة يشرف عليها مشغل البث في الموقع (أو أحد أفراد العائلة المعين إذا فضلتم ذلك). تُعرض الرسائل على شاشة صغيرة بجانب العروسين ليقرأوها في الوقت الفعلي. يطلب بعض الأزواج منا قراءة رسائل مختارة بصوت عالٍ أثناء النذور. محادثة إنستغرام لايف تُراقب أيضاً لكن لا تُعرض في الموقع — تلك للضيوف الذين يريدون فقط المشاهدة.",
    },
    {
      q: "هل نحصل على تسجيل للبث المباشر بعد ذلك؟",
      a: "نعم — يُسجل كل بث محلياً على بطاقة SD العدة ويُرفع على رابط يوتيوب خاص بعد الفعالية (خلال 24 ساعة). التسجيل هو الحفل والاستقبال الكامل المتواصل، ليس التشويق فقط. يستخدمه الأزواج كنسخة احتياطية من لقطات الحفل وتذكار للضيوف الذين لم يستطيعوا المشاهدة مباشرة. سعر الإضافة 800 درهم؛ مشمول في باقة الزفاف السينمائي المتميزة.",
    },
    {
      q: "كيف يختلف هذا عن مجرد وضع هاتف على حامل ثلاثي والبث المباشر؟",
      a: "الهاتف على حامل ثلاثي يسلم زاوية واحدة ثابتة، يموت بعد 90 دقيقة، لا يوجد نسخة احتياطية إذا سقط WiFi الموقع، ويبدو هاوياً على تلفزيون 4K. عدتنا تسلم ثلاث زوايا مبدلة (الحفل، رد فعل الجمهور، لقطة قريبة) مقطوعة بواسطة مشغل مخصص، تعمل 4+ ساعات على 5G مربوط مع بطارية احتياطية، وتنتج تسجيلاً يمكنك إعادة مشاهدته. الضيوف في الخارج يمكنهم رؤية النذور وتبادل الخواتم ووجه العروس ورد فعل الوالدين — وليس لقطة عريضة للموقع من 30 قدماً.",
    },
    {
      q: "هل يمكننا استخدام هذا لإطلاق شركة أو مؤتمر بدلاً من الزفاف؟",
      a: "نعم. نفس العدة تُؤجر للإطلاقات الشركاتية والمؤتمرات والجمعيات العمومية وكشف المنتجات. التسعير متدرج: بث شركاتي نصف يوم (2 كاميرا، 4 ساعات) يبدأ من 4,500 درهم؛ بث شركاتي كامل اليوم متعدد الكاميرات (4 كاميرات، رسومات تبديل، نصوص سفلية، تسجيل) يبدأ من 12,000 درهم.",
    },
  ],
};

const relatedServices = services.filter((s) =>
  ["cinematic-wedding", "weddings", "event-coverage", "tvc-production"].includes(s.slug)
);

export default async function LiveStreamingPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const path = "/services/live-streaming";
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
            name: isAr ? "بث الزفاف المباشر في دبي" : "Wedding Live Streaming in Dubai",
            description: isAr
              ? "بث الزفاف المباشر في دبي عبر يوتيوب وإنستغرام لايف للضيوف في الخارج. Hollyland 5G مربوط، مشغل بث مخصص."
              : "Wedding live streaming in Dubai on YouTube and Instagram Live for overseas guests. Hollyland 5G-bonded kit, dedicated stream operator.",
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
            <a href={waLink(isAr ? "مهتم ببث الزفاف المباشر في دبي." : "Interested in wedding live streaming in Dubai.")} target="_blank" rel="noopener noreferrer" className="bs-btn bs-btn-gold">
              {t(ui.nav.startYourProject, locale)}
            </a>
            <Button href={localizedPath(locale, "/services/weddings")} variant="ghost">
              {isAr ? "صفحة الزفاف الرئيسية" : "Main Weddings page"}
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* ORIGINAL DATA — Live streaming by the numbers */}
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

      {/* WHY 5G BONDING MATTERS */}
      <Section>
        <div className="grid gap-12 md:grid-cols-2 md:items-start">
          <Reveal>
            <Eyebrow>{isAr ? "لماذا 5G المربوط" : "Why 5G bonding matters"}</Eyebrow>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
              {isAr
                ? "البث يفشل عندما لا تتوقع ذلك"
                : "Streams fail when you don't expect it"}
            </h2>
          </Reveal>
          <Reveal delay={80} className="bs-prose">
            {isAr ? (
              <>
                <p>
                  معظم فشل البث المباشر للزفاف يأتي من شبكة واحدة. الموقع يوفر WiFi، لكن 200 ضيف متصلون جميعاً في وقت واحد، أو الفندق يفرض شبكة ضعيفة، أو شبكة 4G مزدحمة في وسط مدينة دبي ليلة السبت. النتيجة: تخزين مؤقت، قطع، أو بث ينطفئ تماماً قبل نذور العروس.
                </p>
                <p>
                  حلنا: Hollyland Pyro S مع شريحتي 5G مستقلتين من اتصالات ودو. الجهاز يجمع عرض النطاق من الشريحتين في الوقت الفعلي ويتحول تلقائياً إذا سقطت إحداهما. نضيف بطارية 12,000 mAh في حالة فقدان الموقع للكهرباء. النتيجة: uptime 99.7٪ في 2025، صفر حفلات زفاف فُقدت بسبب الاتصال.
                </p>
              </>
            ) : (
              <>
                <p>
                  Most wedding live-stream failures come from a single network. The venue provides WiFi, but 200 guests are all connected at once, or the hotel throttles guest WiFi, or the 4G cell is congested in Downtown Dubai on a Saturday night. The result: buffering, dropout, or the stream dying entirely before the bride's vows.
                </p>
                <p>
                  Our fix: Hollyland Pyro S with two independent 5G SIMs from Etisalat and du. The device aggregates bandwidth from both SIMs in real time and fails over automatically if one drops. We add a 12,000 mAh battery pack in case the venue loses power. The result: 99.7% uptime in 2025, zero weddings lost to connectivity.
                </p>
              </>
            )}
          </Reveal>
        </div>
      </Section>

      {/* WHAT GOES INTO A LIVE STREAM */}
      <Section alt>
        <Reveal>
          <Eyebrow>{isAr ? "ماذا يتضمن البث" : "What goes into a live stream"}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr
              ? "ستة عناصر لبث زفاف احترافي"
              : "Six elements of a professional wedding stream"}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              h: isAr ? "Hollyland Pyro S × 2 (5G مربوط)" : "Hollyland Pyro S × 2 (5G bonded)",
              b: isAr
                ? "وحدتان Hollyland Pyro S بشريحتي 5G مستقلتين من اتصالات ودو. يجمعان عرض النطاق ويتحولان تلقائياً. بطارية 12,000 mAh مدمجة."
                : "Two Hollyland Pyro S units with two independent 5G SIMs from Etisalat and du. They aggregate bandwidth and fail over automatically. 12,000 mAh battery built in.",
            },
            {
              h: isAr ? "مزيج 3 كاميرات + تبديل" : "3-camera switched mix",
              b: isAr
                ? "زاوية الحفل (Sony FX3 واسعة)، رد فعل الجمهور (FX3 ثانية)، لقطة قريبة (FX3 ثالثة). مشغل تبديل يقطع بينها في الوقت الفعلي — ليس لقطة واحدة ثابتة."
                : "Ceremony angle (Sony FX3 wide), audience reaction (second FX3), close-up (third FX3). A switching operator cuts between them in real time — not a single locked-off shot.",
            },
            {
              h: isAr ? "يوتيوب + إنستغرام لايف معاً" : "YouTube + Instagram Live in parallel",
              b: isAr
                ? "يوتيوب 1080p60 كرابط خاص غير مدرج للضيوف في الغرب. إنستغرام لايف كنسخة احتياطية للضيوف في الصين وجنوب آسيا والشبكات الشركاتية المحجوبة."
                : "YouTube 1080p60 as a private unlisted link for guests in the West. Instagram Live as the workaround for guests in China, South Asia and corporate networks that block YouTube.",
            },
            {
              h: isAr ? "مشغل بث مخصص في الموقع" : "Dedicated stream operator on site",
              b: isAr
                ? "مشغل بث واحد مخصص طوال الحفل — يدير الإعدادات، يراقب الجودة، يشرف على محادثة يوتيوب، يُظهر الرسائل للعروسين على شاشة محلية. ليس طاقم الزفاف يقوم بالبث."
                : "One dedicated stream operator on site throughout — manages the rig, monitors quality, moderates the YouTube chat, surfaces messages to the couple on a local screen. Not the wedding crew doubling as streamers.",
            },
            {
              h: isAr ? "بطارية احتياطية + شاشة مراقبة" : "Battery backup + monitoring screen",
              b: isAr
                ? "بطارية 12,000 mAh تبقي البث يعمل 4+ ساعات بدون كهرباء الموقع. شاشة مراقبة صغيرة في الموقع تعرض ما يراه الضيوف في الخارج في الوقت الفعلي."
                : "12,000 mAh battery keeps the stream up 4+ hours without venue power. A small on-site monitoring screen shows the crew what overseas guests are seeing in real time.",
            },
            {
              h: isAr ? "تسجيل محلي + رابط يوتيوب خاص" : "Local recording + private YouTube replay",
              b: isAr
                ? "كل بث يُسجل محلياً على بطاقة SD. يُرفع كرابط يوتيوب خاص خلال 24 ساعة — نسخة احتياطية من الحفل للضيوف الذين فاتتهم البث المباشر."
                : "Every stream is recorded locally to SD card. Uploaded as a private YouTube replay link within 24 hours — a backup of the ceremony for guests who missed the live.",
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

      {/* PRICING COMPARISON — Stream-only vs Stream + Cinematic */}
      <Section>
        <Reveal>
          <Eyebrow>{isAr ? "الأسعار والجمع" : "Pricing & bundling"}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr ? "البث وحده أو مع الزفاف السينمائي" : "Stream-only or with Cinematic Wedding"}
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {[
            {
              tag: isAr ? "باقة 1 · بث فقط" : "Package 1 · Stream only",
              title: isAr ? "بث الزفاف المباشر المستقل" : "Standalone wedding live stream",
              blurb: isAr
                ? "AED 6,000 لبث 4 ساعات عبر يوتيوب + إنستغرام. طاقم تصوير آخر يصور الحفل، عدتنا تبث فقط. لا تسجيل سينمائي."
                : "AED 6,000 for 4 hours of streaming on YouTube + IG Live. Another crew films the wedding, our kit streams it. No cinematic recording.",
            },
            {
              tag: isAr ? "باقة 2 · سينمائي + بث" : "Package 2 · Cinematic + Stream",
              title: isAr ? "الزفاف السينمائي المتميزة مع البث" : "Premium Cinematic Wedding with stream",
              blurb: isAr
                ? "AED 35,000 للباقة المتميزة (RED Komodo X + طاقم + تشويق نفس اليوم) + AED 6,000 للبث = AED 41,000. تسجيل سينمائي كامل + بث مباشر."
                : "AED 35,000 for the Premium Cinematic Wedding (RED Komodo X + crew + same-day teaser) + AED 6,000 for the stream = AED 41,000. Full cinematic record + live broadcast.",
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
            {isAr ? "أسئلة متكررة عن البث المباشر للزفاف" : "FAQ — Wedding Live Streaming"}
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
        heading={isAr ? "مستعد لبث حفل زفافك؟" : "Ready to stream your wedding?"}
        waContext={isAr ? "بخصوص بث الزفاف المباشر في دبي." : "Re: wedding live streaming in Dubai."}
      />
    </>
  );
}
