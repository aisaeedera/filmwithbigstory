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

/*
 * Female wedding production service page.
 * Tailored planning — no instant pricing or booking.
 * Privacy and crew gates apply before availability is confirmed.
 */

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return pageMeta({
    locale,
    title: isAr
      ? "خدمات تصوير الأفراح النسائية في دبي | طاقم نسائي | بيك ستوري"
      : "Female Wedding Services Dubai & UAE | Women-Only Crew | Big Story",
    description: isAr
      ? "تصوير الأفراح النسائية في دبي والإمارات. تغطية مخصصة لاحتفالات العروس في بيئة نسائية فقط بطاقم نسائي، مع بروتوكولات خصوصية معتمدة."
      : "Female wedding coverage in Dubai and the UAE. Tailored bride celebration coverage in women-only settings by a female crew, with approved privacy protocols.",
    path: "/services/female-wedding",
  });
}

const COPY = {
  eyebrow: { en: "Female & Bride Wedding Coverage", ar: "تصوير الأفراح النسائية" },
  h1: {
    en: "Female wedding services in Dubai and the UAE, a women-only crew for private celebrations",
    ar: "خدمات تصوير الأفراح النسائية في دبي والإمارات، طاقم نسائي للاحتفالات الخاصة",
  },
  lead: {
    en: "Big Story covers bride preparation and wedding-day female hall coverage across Dubai, Abu Dhabi and the UAE. This service requires a vetted female-only crew for private and women-only areas, with approved privacy, media-custody and post-production controls. Availability is confirmed per project after all gates are met.",
    ar: "تغطي بيك ستوري تحضير العروس وتغطية قاعة النساء في يوم الزفاف عبر دبي وأبوظبي والإمارات. تتطلب هذه الخدمة طاقماً نسائياً موثقاً للمناطق الخاصة والنسائية، مع بروتوكولات خصوصية وحيازة إعلامية وإنتاج لاحق معتمدة. يُؤكد التوفر لكل مشروع بعد استيفاء جميع الشروط.",
  },
  status: {
    en: "Tailored planning — Request specialist crew availability",
    ar: "تخطيط مخصص — اطلب التحقق من توفر الطاقم المتخصص",
  },
  packages: {
    eyebrow: { en: "Wedding packages", ar: "باقات الزفاف" },
    h2: { en: "Three packages, tailored for bride celebrations", ar: "ثلاث باقات، مخصصة لاحتفالات العروس" },
    lead: {
      en: "Every package includes a female-only crew, privacy protocols, and full bride celebration coverage. Starting prices shown below; final pricing is confirmed after we scope your day.",
      ar: "كل باقة تشمل طاقماً نسائياً فقط، بروتوكولات خصوصية، وتغطية كاملة لاحتفالات العروس. الأسعار البداية أدناه؛ يُؤكد التسعير النهائي بعد دراسة يومكم.",
    },
    silver: {
      name: { en: "Silver", ar: "فضية" },
      tagline: { en: "Essential record", ar: "توثيق أساسي" },
      price: { en: "Starting from AED 26,500", ar: "يبدأ من 26,500 درهم" },
    },
    gold: {
      name: { en: "Gold", ar: "ذهبية" },
      tagline: { en: "Cinematic Wedding Story", ar: "قصة زفاف سينمائية" },
      price: { en: "Starting from AED 31,500", ar: "يبدأ من 31,500 درهم" },
    },
    platinum: {
      name: { en: "Platinum", ar: "بلاتينية" },
      tagline: { en: "Expanded coverage", ar: "تغطية موسعة" },
      price: { en: "Starting from AED 36,500", ar: "يبدأ من 36,500 درهم" },
    },
    cta: { en: "Get a quotation", ar: "احصل على عرض سعر" },
  },
};

const privacyGates = {
  en: [
    "Vetted female-only crew for all private and women-only areas",
    "Approved privacy protocol for the specific venue and event",
    "Approved media-custody and private-transfer controls",
    "Approved post-production controls, including who may access footage",
    "Production sign-off before crew assignment",
    "Producer approval for the specific event",
  ],
  ar: [
    "طاقم نسائي موثق لجميع المناطق الخاصة والنسائية",
    "بروتوكول خصوصية معتمد للموقع والفعالية المحددة",
    ".controls حيازة إعلامية ونقل خاص معتمدة",
    ".controls إنتاج لاحق معتمدة، بما في ذلك من يمكنه الوصول إلى اللقطات",
    "اعتماد الإنتاج قبل تعيين الطاقم",
    "اعتماد المنتج للفعالية المحددة",
  ],
};

const coverage = {
  en: [
    {
      n: "01",
      title: "Bride Preparation",
      body: "The hours before the bride walks in. Dress fitting, makeup, hair, the mother and sisters helping with the final touches. Filmed close and cinematic in the bridal suite or hotel room, working with natural light and controlled fill so the fabric, the jewellery and the flowers are framed with care. This is the calm before the celebration, and it is where the bride's film begins.",
      tags: ["dress", "makeup", "hair", "bridal suite", "jewellery", "flowers"],
    },
    {
      n: "02",
      title: "Wedding-Day Female Hall Coverage",
      body: "Full coverage of the female hall on the wedding day. The entrance, the receiving line, the seating, the food service, the performances, the celebration. Filmed with a multi-camera crew working to a camera plan agreed in advance, with filming that stays discreet and respectful around guests. This is the backbone of a female wedding film.",
      tags: ["entrance", "female hall", "multi-camera", "discreet", "celebration"],
    },
    {
      n: "03",
      title: "The Film You Take Home",
      body: "One highlight film, one key-event film where your programme supports it, and social cuts. Colour, sound and revision rounds are included. Delivery is private, for the family, and any public use is a separate written choice you make. All footage is subject to the approved privacy and media-custody controls.",
      tags: ["highlight film", "key-event film", "social cuts", "private delivery", "privacy controls"],
    },
  ],
  ar: [
    {
      n: "01",
      title: "تحضير العروس",
      body: "الساعات التي تسبق دخول العروس. قياس الفستان، المكياج، الشعر، مساعدة الأم والأخوات في اللمسات الأخيرة. تصوير قريب وسينمائي في جناح العروس أو غرفة الفندق، بالإضاءة الطبيعية وملء محكوم، بحيث تُؤطَّر القماشة والحلي والزهور بعناية. هذه هي الهدوء الذي يسبق الاحتفال، ومن هنا يبدأ فيلم العروس.",
      tags: ["فستان", "مكياج", "شعر", "جناح العروس", "حلي", "زهور"],
    },
    {
      n: "02",
      title: "تغطية قاعة النساء يوم الزفاف",
      body: "تغطية كاملة لقاعة النساء في يوم الزفاف. الدخول، صف الاستقبال، الجلوس، تقديم الطعام، العروض، الاحتفال. تُصوَّر بطاقم متعدد الكاميرات يعمل وفق خطة كاميرات متفق عليها مسبقاً، بتصوير متحفظ ومحترم حول الضيوف. هذا هو العمود الفقري لفيلم زفاف نسائي.",
      tags: ["الدخول", "قاعة النساء", "عدة كاميرات", "متحفظ", "احتفال"],
    },
    {
      n: "03",
      title: "الفيلم الذي تستلمه",
      body: "فيلم مختارات، وفيلم فعاليات رئيسية إذا كان برنامجكم يدعم ذلك، ومقاطع سوشيال. تدريج الألوان والصوت وجولات التعديل مشمولة. التسليم خاص للعائلة، وأي استخدام عام خيار كتابي منفصل. جميع اللقطات تخضع لبروتوكولات الخصوصية وحيازة الإعلام المعتمدة.",
      tags: ["فيلم مختارات", "فيلم فعاليات", "مقاطع سوشيال", "تسليم خاص", "بروتوكولات الخصوصية"],
    },
  ],
};

const faqItems = {
  en: [
    {
      q: "Why does this service require a female-only crew?",
      a: "Many UAE celebrations are gender-segregated, with a female hall or women-only areas where the filming team must be women. Female wedding coverage at Big Story is built around that requirement. The crew plan for this service is female, from the director of photography to sound.",
    },
    {
      q: "What privacy controls are in place?",
      a: "Every female wedding project requires an approved privacy protocol, media-custody controls, and post-production access controls before crew assignment. This includes approved private-transfer controls and a clear list of who may access the footage. These gates are non-negotiable and are confirmed in writing before the event.",
    },
    {
      q: "How is availability confirmed?",
      a: "Availability is confirmed only after all privacy and crew gates are met: a vetted female-only crew for the required areas, an approved privacy protocol, approved media-custody and post-production controls, production sign-off, and producer approval for the specific event. We do not promise availability before these are in place.",
    },
    {
      q: "What do we receive?",
      a: "One highlight film, one key-event film where your programme supports it, and social cuts, with colour, sound and revision rounds included. Delivery is private, for the family; any public use is a separate written choice. All footage is subject to the approved privacy and media-custody controls.",
    },
    {
      q: "How do we start?",
      a: "Send a WhatsApp message with the date, venue and what you need covered. We will confirm the privacy and crew requirements for your event, scope the day with you, and quote in writing. No commitment is made, and no crew or equipment is reserved, until the written scope and quote are accepted and all privacy gates are confirmed.",
    },
  ],
  ar: [
    {
      q: "لماذا تتطلب هذه الخدمة طاقماً نسائياً فقط؟",
      a: "كثير من احتفالات الإمارات منفصلة بين الجنسين، بقاعة نسائية أو مناطق نسائية يجب أن يكون فريق التصوير فيها من النساء. تغطية الأفراح النسائية لدى بيك ستوري مبنية حول هذا الشرط. خطة الطاقم لهذه الخدمة نسائية، من مدير التصوير إلى الصوت.",
    },
    {
      q: "ما هي ضوابط الخصوصية المعمول بها؟",
      a: "كل مشروع زفاف نسائي يتطلب بروتوكول خصوصية معتمد، وضوابط حيازة إعلامية، وضوابط وصول الإنتاج لاحق قبل تعيين الطاقم. يشمل ذلك ضوابط نقل خاص معتمدة وقائمة واضحة بمن يمكنهم الوصول إلى اللقطات. هذه الشروط غير قابلة للتفاوض وتُؤكد كتابياً قبل الفعالية.",
    },
    {
      q: "كيف يُؤكد التوفر؟",
      a: "يُؤكد التوفر فقط بعد استيفاء جميع شروط الخصوصية والطاقم: طاقم نسائي موثق للمناطق المطلوبة، وبروتوكول خصوصية معتمد، وضوابط حيازة إعلامية وإنتاج لاحق معتمدة، واعتماد الإنتاج، واعتماد المنتج للفعالية المحددة. لا نعد بالتوفر قبل استيفاء هذه الشروط.",
    },
    {
      q: "ماذا نستلم؟",
      a: "فيلم مختارات، وفيلم فعاليات رئيسية إذا كان برنامجكم يدعم ذلك، ومقاطع سوشيال، مع تدريج الألوان والصوت وجولات التعديل مشمولة. التسليم خاص للعائلة؛ وأي استخدام عام خيار كتابي منفصل. جميع اللقطات تخضع لبروتوكولات الخصوصية وحيازة الإعلام المعتمدة.",
    },
    {
      q: "كيف نبدأ؟",
      a: "أرسلوا رسالة واتساب بالماريخ والموقع وما تريدون تغطيته. نؤكد متطلبات الخصوصية والطاقم لفعاليتكم، ونحدد نطاق اليوم معكم، ونقدّم عرضاً كتابياً. لا يُثبَّت أي شيء، ولا يُلتزم بأي طاقم أو معدات، قبل قبول النطاق والعرض الكتابيين وتأكيد جميع شروط الخصوصية.",
    },
  ],
};

const relatedServices = services.filter((s) =>
  ["groom-wedding-services", "cinematic-wedding", "wedding-photography", "wedding-videography"].includes(s.slug)
);

export default async function FemaleWeddingPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const path = "/services/female-wedding";
  const url = `${SITE.domain}${localizedPath(locale, path)}`;
  const isAr = locale === "ar";

  const itemFaqs = isAr ? faqItems.ar : faqItems.en;
  const coverageList = isAr ? coverage.ar : coverage.en;
  const gates = isAr ? privacyGates.ar : privacyGates.en;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(locale, [
            { name: t(ui.breadcrumb.home, locale), path: "/" },
            { name: t(ui.nav.weddings, locale), path: "/weddings" },
            { name: t(COPY.h1, locale), path },
          ]),
          articleSchema({
            locale,
            headline: t(COPY.h1, locale),
            description: t(COPY.lead, locale),
            path,
            image: `${SITE.domain}/opengraph-image`,
            datePublished: "2026-08-26",
            authorName: "Big Story Editorial",
          }),
          serviceSchema({
            locale,
            name: isAr ? "خدمات تصوير الأفراح النسائية في دبي" : "Female Wedding Photography & Videography in Dubai",
            description: isAr
              ? "تصوير الأفراح النسائية في دبي والإمارات. تغطية مخصصة لاحتفالات العروس في بيئة نسائية فقط بطاقم نسائي، مع بروتوكولات خصوصية معتمدة."
              : "Female wedding coverage in Dubai and the UAE. Tailored bride celebration coverage in women-only settings by a female crew, with approved privacy protocols.",
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
            { name: t(ui.nav.weddings, locale), path: "/weddings" },
            { name: t(COPY.h1, locale) },
          ]}
        />
        <Reveal>
          <Eyebrow>{t(COPY.eyebrow, locale)}</Eyebrow>
          <h1 className="mt-6 max-w-5xl text-[clamp(2.4rem,5.5vw,4rem)] leading-[1.05]">{t(COPY.h1, locale)}</h1>
          <p className="mt-4 inline-block rounded-full bg-[color:var(--color-accent)]/10 px-3 py-1 text-sm text-[color:var(--color-accent)]">
            {t(COPY.status, locale)}
          </p>
          <p className="bs-lead mt-6 !max-w-3xl">{t(COPY.lead, locale)}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a href={waLink(isAr ? "مهتم بتغطية الأفراح النسائية." : "Interested in female wedding services.")} target="_blank" rel="noopener noreferrer" className="bs-btn bs-btn-gold">
              {isAr ? "خطط ليومك" : "Plan your day"}
            </a>
            <Button href={localizedPath(locale, "/services/weddings")} variant="ghost">
              {isAr ? "صفحة الزفاف الرئيسية" : "Main weddings page"}
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* PRIVACY & CREW GATES */}
      <Section alt>
        <Reveal>
          <Eyebrow>{isAr ? "شروط الخصوصية والطاقم" : "Privacy & crew gates"}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr ? "التوفر يُؤكد بعد استيفاء جميع الشروط" : "Availability confirmed only after all gates are met"}
          </h2>
          <p className="bs-lead mt-6 !max-w-3xl">
            {isAr
              ? "لا نعد بالتوفر قبل استيفاء جميع شروط الخصوصية والطاقم. هذه الشروط غير قابلة للتفاوض وتُؤكد كتابياً قبل الفعالية."
              : "We do not promise availability before all privacy and crew gates are met. These gates are non-negotiable and confirmed in writing before the event."}
          </p>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {gates.map((gate, i) => (
            <Reveal key={i} delay={i * 60} className="bs-card">
              <div className="flex gap-3">
                <span aria-hidden className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--color-accent)]" />
                <p className="text-sm text-[color:var(--color-muted)]">{gate}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* WHAT THE COVERAGE INCLUDES */}
      <Section>
        <Reveal>
          <Eyebrow>{isAr ? "ما تتضمنه التغطية" : "What the coverage includes"}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr ? "ما نغطيه، من تحضير العروس إلى قاعة النساء" : "What we cover, from bride prep to the female hall"}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {coverageList.map((m, i) => (
            <Reveal key={i} delay={i * 60} className="bs-card">
              <p className="bs-eyebrow">{m.n}</p>
              <h3 className="mt-4 text-xl">{m.title}</h3>
              <p className="mt-3 text-sm text-[color:var(--color-muted)]">{m.body}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {m.tags.map((tag, ti) => (
                  <span key={ti} className="inline-block rounded-full bg-[color:var(--color-bg-alt)] px-3 py-1 text-[11px] uppercase tracking-wide text-[color:var(--color-muted)]">
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* PACKAGES */}
      <Section>
        <Reveal>
          <Eyebrow>{t(COPY.packages.eyebrow, locale)}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">{t(COPY.packages.h2, locale)}</h2>
          <p className="bs-lead mt-6 !max-w-3xl">{t(COPY.packages.lead, locale)}</p>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {[
            { key: "silver" as const, highlight: false },
            { key: "gold" as const, highlight: true },
            { key: "platinum" as const, highlight: false },
          ].map((pkg, i) => {
            const data = COPY.packages[pkg.key];
            return (
              <Reveal key={pkg.key} delay={i * 70} className={`bs-card flex flex-col ${pkg.highlight ? "ring-2 ring-[color:var(--color-gold)]" : ""}`}>
                <p className="bs-eyebrow">{t(data.name, locale)}</p>
                <h3 className="mt-3 text-xl">{t(data.tagline, locale)}</h3>
                <p className="mt-4 text-lg font-semibold text-[color:var(--color-gold)]">{t(data.price, locale)}</p>
                <div className="mt-6">
                  <a href={waLink(isAr ? "مهتم بباقة زفاف العروس." : "Interested in a bride wedding package.")} target="_blank" rel="noopener noreferrer" className={`bs-btn ${pkg.highlight ? "bs-btn-gold" : "bs-btn-ghost"}`}>
                    {t(COPY.packages.cta, locale)}
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* FAQ */}
      <Section alt>
        <Reveal>
          <Eyebrow>{t(si.detail.faqs, locale)}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr ? "أسئلة متكررة، تصوير الأفراح النسائية" : "FAQ, female wedding coverage"}
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
        heading={isAr ? "مستعدة لتغطية زفافك؟" : "Ready to cover your wedding?"}
        waContext={isAr ? "بخصوص تصوير الأفراح النسائية." : "Re: female wedding services."}
      />
    </>
  );
}
