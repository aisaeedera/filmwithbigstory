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
 * Katb Kitab / Aqd Al Qiran production service page.
 * Canonical SEO page for the Islamic marriage contract ceremony.
 * Tailored planning — no instant pricing or booking.
 * Privacy and crew gates apply for women-side continuity.
 */

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return pageMeta({
    locale,
    title: isAr
      ? "تصوير كتب الكتاب وعقد القران في دبي | بيك ستوري"
      : "Katb Kitab / Aqd Al Qiran Coverage Dubai & UAE | Big Story",
    description: isAr
      ? "تصوير حفلات كتب الكتاب وعقد القران في دبي والإمارات. تغطية مخصصة بطاقم متخصص، مع بروتوكولات خصوصية معتمدة للجانب النسائي."
      : "Katb Kitab and Aqd Al Qiran ceremony coverage in Dubai and the UAE. Tailored coverage by a specialist crew, with approved privacy protocols for women-side continuity.",
    path: "/services/katb-kitab-aqd-al-qiran",
  });
}

const COPY = {
  eyebrow: { en: "Katb Kitab / Aqd Al Qiran Coverage", ar: "تصوير كتب الكتاب وعقد القران" },
  h1: {
    en: "Katb Kitab / Aqd Al Qiran coverage in Dubai and the UAE, specialist crew for the marriage contract ceremony",
    ar: "تصوير كتب الكتاب وعقد القران في دبي والإمارات، طاقم متخصص لحفل عقد القران",
  },
  lead: {
    en: "Big Story covers the Islamic marriage contract ceremony — Katb Kitab and Aqd Al Qiran — across Dubai, Abu Dhabi and the UAE. This service is available for male-section, female-section, and both-section coverage. For women-side continuity, named crew assignments and privacy approval must exist before availability is confirmed.",
    ar: "تغطي بيك ستوري حفل عقد القران — كتب الكتاب وعقد القران — عبر دبي وأبوظبي والإمارات. هذه الخدمة متاحة لتغطية قسم الرجال وقسم النساء وكلاهما. للاستمرار في الجانب النسائي، يجب أن تكون تعيينات الطاقم المعينة وموافقة الخصوصية موجودة قبل تأكيد التوفر.",
  },
  status: {
    en: "Tailored planning — Request specialist crew availability",
    ar: "تخطيط مخصص — اطلب التحقق من توفر الطاقم المتخصص",
  },
  packages: {
    eyebrow: { en: "Katb Kitab packages", ar: "باقات كتب الكتاب" },
    h2: { en: "Three packages for the marriage contract ceremony", ar: "ثلاث باقات لحفل عقد القران" },
    lead: {
      en: "Every package includes an Arabic-proficient crew, dedicated sound recording (4+ microphones with boom backup), and full ceremony coverage. Starting prices shown below; final pricing is confirmed after we scope your event.",
      ar: "كل باقة تشمل طاقماً ناطقاً بالعربية، تسجيل صوت مخصص (٤+ ميكروفونات مع نسخة احتياطية)، وتغطية كاملة للحفل. الأسعار البداية أدناه؛ يُؤكد التسعير النهائي بعد دراسة فعاليتكم.",
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
  en: {
    title: "Women-side continuity requirements",
    intro: "For women-side coverage, availability is confirmed only after named assignments and privacy approval exist for:",
    gates: [
      "Female videographer assigned by name",
      "Female photographer assigned by name",
      "Arabic-proficient female sound recordist assigned by name",
      "Approved private/public-safe review boundary",
      "Approved media custody and post-production access",
    ],
  },
  ar: {
    title: "متطلبات الاستمرارية في الجانب النسائي",
    intro: "لتغطية الجانب النسائي، يُؤكد التوفر فقط بعد وجود تعيينات الطاقم المعينة وموافقة الخصوصية لـ:",
    gates: [
      "مصور فيديو أنثى معين بالاسم",
      "مصور فوتوغرافي أنثى معين بالاسم",
      "مسجل صوت أنثى ناطق بالعربية معين بالاسم",
      "حد مراجعة خاص/عام آمن معتمد",
      "حيازة إعلامية ووصول إنتاج لاحق معتمد",
    ],
  },
};

const coverage = {
  en: [
    {
      n: "01",
      title: "The Contract Ceremony",
      body: "The Katb Kitab or Aqd Al Qiran ceremony itself. The signing of the marriage contract, the recitation, the witnesses, the family gathered. Filmed with discretion and respect for the formality of the occasion, capturing the key moments without intruding on the intimacy of the event.",
      tags: ["contract signing", "recitation", "witnesses", "family", "formal", "discreet"],
    },
    {
      n: "02",
      title: "Male, Female, or Both Sections",
      body: "Coverage can include the male section, the female section, or both. For male-section coverage, a male crew is assigned. For female-section coverage, a vetted female crew is assigned by name. For both sections, separate crews work to an agreed camera plan with clear boundaries.",
      tags: ["male section", "female section", "both sections", "separate crews", "camera plan"],
    },
    {
      n: "03",
      title: "The Film You Take Home",
      body: "One highlight film and social cuts, with colour, sound and revision rounds included. Delivery is private, for the family, and any public use is a separate written choice. All footage is subject to the approved privacy and media-custody controls.",
      tags: ["highlight film", "social cuts", "private delivery", "privacy controls"],
    },
  ],
  ar: [
    {
      n: "01",
      title: "حفل عقد القران",
      body: "حفل كتب الكتاب أو عقد القران نفسه. توقيع عقد الزفاف، التلاوة، الشهود، العائلة مجتمعة. يُصوَّر بتحفظ واحترام لرسمية المناسبة، مع التقاط اللحظات الرئيسية دون التعحم على خصوصية الحدث.",
      tags: ["توقيع العقد", "التلاوة", "الشهود", "العائلة", "رسمي", "متحفظ"],
    },
    {
      n: "02",
      title: "قسم الرجال أو النساء أو كلاهما",
      body: "يمكن أن تشمل التغطية قسم الرجال أو قسم النساء أو كلاهما. لتغطية قسم الرجال يُعيَّن طاقم رجالي. لتغطية قسم النساء يُعيَّن طاقم نسائي موثق بالاسم. لكلا القسمين يعمل طاقمان منفصلان وفق خطة كاميرات متفق عليها بحدود واضحة.",
      tags: ["قسم الرجال", "قسم النساء", "كلا القسمين", "طاقمان منفصلان", "خطة كاميرات"],
    },
    {
      n: "03",
      title: "الفيلم الذي تستلمه",
      body: "فيلم مختارات ومقاطع سوشيال، مع تدريج الألوان والصوت وجولات التعديل مشمولة. التسليم خاص للعائلة، وأي استخدام عام خيار كتابي منفصل. جميع اللقطات تخضع لبروتوكولات الخصوصية وحيازة الإعلام المعتمدة.",
      tags: ["فيلم مختارات", "مقاطع سوشيال", "تسليم خاص", "بروتوكولات الخصوصية"],
    },
  ],
};

const variants = {
  en: {
    title: "Search terms and variants",
    intro: "This page covers all of the following. No duplicate pages are created for spelling variants.",
    terms: [
      "Katb Kitab", "Katb Al Kitab", "Katb el Kitab",
      "Aqd Al Qiran", "Aqd Al-Qiran", "Aqd Qiran",
      "Nikah", "Aqd Nikah", "Aqd Zawaj",
      "Marriage contract ceremony",
      "كتب الكتاب", "عقد القران",
    ],
  },
  ar: {
    title: "مصطلحات البحث والبدائل",
    intro: "تغطي هذه الصفحة جميع المصطلحات التالية. لا تُنشأ صفحات مكررة لبدائل الإملاء.",
    terms: [
      "كتب الكتاب", "كتاب الكتاب", "كتاب الكتب",
      "عقد القران", "عقد القران", "عقد قران",
      "نكاح", "عقد نكاح", "عقد زواج",
      "حفل عقد القران",
      "Katb Kitab", "Aqd Al Qiran",
    ],
  },
};

const faqItems = {
  en: [
    {
      q: "What is Katb Kitab / Aqd Al Qiran?",
      a: "Katb Kitab and Aqd Al Qiran refer to the Islamic marriage contract ceremony. It is a formal event where the marriage contract is signed, typically with witnesses and family present. It can be a standalone ceremony or part of a larger wedding celebration.",
    },
    {
      q: "Do you cover both male and female sections?",
      a: "Yes. Coverage can include the male section, the female section, or both. For male-section coverage, a male crew is assigned. For female-section coverage, a vetted female crew is assigned by name. For both sections, separate crews work to an agreed camera plan with clear boundaries.",
    },
    {
      q: "What privacy controls are in place for women-side coverage?",
      a: "For women-side continuity, named crew assignments and privacy approval must exist before availability is confirmed: a female videographer, a female photographer, an Arabic-proficient female sound recordist, an approved private/public-safe review boundary, and approved media custody and post-production access.",
    },
    {
      q: "How is availability confirmed?",
      a: "Availability is confirmed only after all privacy and crew gates are met. For male-section coverage, this includes crew assignment and production sign-off. For female-section coverage, this includes named female crew assignments and privacy approval. We do not promise availability before these are in place.",
    },
    {
      q: "What do we receive?",
      a: "One highlight film and social cuts, with colour, sound and revision rounds included. Delivery is private, for the family; any public use is a separate written choice. All footage is subject to the approved privacy and media-custody controls.",
    },
    {
      q: "How do we start?",
      a: "Send a WhatsApp message with the date, venue and which sections you need covered. We will confirm the crew and privacy requirements for your event, scope the day with you, and quote in writing. No commitment is made until the written scope and quote are accepted.",
    },
  ],
  ar: [
    {
      q: "ما هو كتب الكتاب / عقد القران؟",
      a: "كتب الكتاب وعقد القران يشيران إلى حفل عقد الزفاف الإسلامي. هو حدث رسمي يتم فيه توقيع عقد الزفاف، عادة بحضور الشهود والعائلة. يمكن أن يكون حفلاً مستقلاً أو جزءاً من احتفال زفاف أكبر.",
    },
    {
      q: "هل تغطون كلاً من قسم الرجال وقسم النساء؟",
      a: "نعم. يمكن أن تشمل التغطية قسم الرجال أو قسم النساء أو كلاهما. لتغطية قسم الرجال يُعيَّن طاقم رجالي. لتغطية قسم النساء يُعيَّن طاقم نسائي موثق بالاسم. لكلا القسمين يعمل طاقمان منفصلان وفق خطة كاميرات متفق عليها بحدود واضحة.",
    },
    {
      q: "ما هي ضوابط الخصوصية لتغطية الجانب النسائي؟",
      a: "للاستمرار في الجانب النسائي، يجب أن تكون تعيينات الطاقم المعينة وموافقة الخصوصية موجودة قبل تأكيد التوفر: مصور فيديو أنثى، ومصور فوتوغرافي أنثى، ومسجل صوت أنثى ناطق بالعربية، وحد مراجعة خاص/عام آمن معتمد، وحيازة إعلامية ووصول إنتاج لاحق معتمد.",
    },
    {
      q: "كيف يُؤكد التوفر؟",
      a: "يُؤكد التوفر فقط بعد استيفاء جميع شروط الخصوصية والطاقم. لتغطية قسم الرجال يشمل ذلك تعيين الطاقم واعتماد الإنتاج. لتغطية قسم النساء يشمل ذلك تعيينات طاقم نسائي معين بالاسم وموافقة الخصوصية. لا نعد بالتوفر قبل استيفاء هذه الشروط.",
    },
    {
      q: "ماذا نستلم؟",
      a: "فيلم مختارات ومقاطع سوشيال، مع تدريج الألوان والصوت وجولات التعديل مشمولة. التسليم خاص للعائلة؛ وأي استخدام عام خيار كتابي منفصل. جميع اللقطات تخضع لبروتوكولات الخصوصية وحيازة الإعلام المعتمدة.",
    },
    {
      q: "كيف نبدأ؟",
      a: "أرسلوا رسالة واتساب بالماريخ والموقع والأقسام التي تريدون تغطيتها. نؤكد متطلبات الطاقم والخصوصية لفعاليتكم، ونحدد نطاق اليوم معكم، ونقدّم عرضاً كتابياً. لا يُثبَّت أي شيء قبل قبول النطاق والعرض الكتابيين.",
    },
  ],
};

const relatedServices = services.filter((s) =>
  ["groom-wedding-services", "female-wedding", "wedding-photography", "wedding-videography"].includes(s.slug)
);

export default async function KatbKitabAqdAlQiranPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const path = "/services/katb-kitab-aqd-al-qiran";
  const url = `${SITE.domain}${localizedPath(locale, path)}`;
  const isAr = locale === "ar";

  const itemFaqs = isAr ? faqItems.ar : faqItems.en;
  const coverageList = isAr ? coverage.ar : coverage.en;
  const gates = isAr ? privacyGates.ar : privacyGates.en;
  const variantData = isAr ? variants.ar : variants.en;

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
            name: isAr ? "تصوير كتب الكتاب وعقد القران في دبي" : "Katb Kitab / Aqd Al Qiran Coverage in Dubai",
            description: isAr
              ? "تصوير حفلات كتب الكتاب وعقد القران في دبي والإمارات. تغطية مخصصة بطاقم متخصص، مع بروتوكولات خصوصية معتمدة للجانب النسائي."
              : "Katb Kitab and Aqd Al Qiran ceremony coverage in Dubai and the UAE. Tailored coverage by a specialist crew, with approved privacy protocols for women-side continuity.",
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
            <a href={waLink(isAr ? "مهتم بتصوير كتب الكتاب وعقد القران." : "Interested in Katb Kitab / Aqd Al Qiran coverage.")} target="_blank" rel="noopener noreferrer" className="bs-btn bs-btn-gold">
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
            {gates.title}
          </h2>
          <p className="bs-lead mt-6 !max-w-3xl">{gates.intro}</p>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {gates.gates.map((gate, i) => (
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
            {isAr ? "ما نغطيه، من حفل العقد إلى التسليم" : "What we cover, from the contract ceremony to delivery"}
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
                  <a href={waLink(isAr ? "مهتم بباقة كتب الكتاب." : "Interested in a Katb Kitab package.")} target="_blank" rel="noopener noreferrer" className={`bs-btn ${pkg.highlight ? "bs-btn-gold" : "bs-btn-ghost"}`}>
                    {t(COPY.packages.cta, locale)}
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* SEARCH TERM VARIANTS */}
      <Section alt>
        <Reveal>
          <Eyebrow>{variantData.title}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr ? "جميع المصطلحات في صفحة واحدة" : "All terms in one page"}
          </h2>
          <p className="bs-lead mt-6 !max-w-3xl">{variantData.intro}</p>
        </Reveal>
        <div className="mt-8 flex flex-wrap gap-2">
          {variantData.terms.map((term, i) => (
            <span key={i} className="inline-block rounded-full bg-[color:var(--color-bg-alt)] px-3 py-1 text-sm text-[color:var(--color-muted)]">
              {term}
            </span>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <Reveal>
          <Eyebrow>{t(si.detail.faqs, locale)}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {isAr ? "أسئلة متكررة، تصوير كتب الكتاب وعقد القران" : "FAQ, Katb Kitab / Aqd Al Qiran coverage"}
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
        heading={isAr ? "مستعد لتصوير عقد قرانك؟" : "Ready to cover your Katb Kitab?"}
        waContext={isAr ? "بخصوص تصوير كتب الكتاب وعقد القران." : "Re: Katb Kitab / Aqd Al Qiran coverage."}
      />
    </>
  );
}
