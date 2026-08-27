import type { Metadata } from "next";
import Link from "next/link";
import { type Locale, localizedPath, t } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { ui } from "@/data/copy";
import { Section, Eyebrow, Button } from "@/components/primitives";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbSchema, serviceSchema } from "@/components/JsonLd";
import { SITE, waLink } from "@/lib/site";

const PAGE_PATH = "/weddings";

const COPY = {
  meta: {
    title: {
      en: "Weddings in Dubai | Big Story",
      ar: "الأفراح في دبي | بيك ستوري",
    },
    description: {
      en: "Wedding production in Dubai and the UAE: distinct groom, bride, Katb Kitab, and invitation services with service-specific crew and privacy planning.",
      ar: "إنتاج أفراح في دبي والإمارات: خدمات منفصلة للعريس والعروس وكتب الكتاب والدعوات، مع تخطيط خاص للطاقم والخصوصية.",
    },
  },
  hero: {
    eyebrow: { en: "Weddings · Dubai", ar: "الأفراح · دبي" },
    h1: { en: "Weddings", ar: "الأفراح" },
    lead: {
      en: "One team for every part of the wedding. Groom celebrations, bride celebrations, Katb Kitab ceremonies, and wedding invitations, all produced by Big Story in Dubai and across the UAE.",
      ar: "فريق واحد لكل جزء من حفل الزفاف. احتفالات العريس واحتفالات العروس وحفلات عقد القران ودعوات الأفراح، جميعها من إنتاج بيك ستوري في دبي وعبر الإمارات.",
    },
    ctaPrimary: { en: "Get a quotation", ar: "احصل على عرض سعر" },
    ctaSecondary: { en: "WhatsApp us", ar: "راسلنا على واتساب" },
  },
  categories: {
    eyebrow: { en: "What we cover", ar: "ما نغطيه" },
    h2: { en: "Every part of the wedding, one production team.", ar: "كل جزء من حفل الزفاف، فريق إنتاج واحد." },
  },
  groom: {
    title: { en: "Groom Weddings", ar: "أفراح العريس" },
    description: {
      en: "Groom preparation and male-hall coverage. Silver, Gold, and Platinum include crane/jib coverage, a YouTube workflow, and QR discovery under the approved production plan.",
      ar: "تحضير العريس وتغطية قاعة الرجال. تشمل الفضية والذهبية والبلاتينية الرافعة/الجيب وسير عمل يوتيوب واكتشاف QR ضمن خطة الإنتاج المعتمدة.",
    },
    cta: { en: "See groom coverage", ar: "شاهد تغطية العريس" },
    href: "/services/groom-wedding-services",
  },
  bride: {
    title: { en: "Bride Weddings", ar: "أفراح العروس" },
    description: {
      en: "Private bride celebration coverage with a female-only crew and private family delivery. Availability and reviewed starting-point pricing are confirmed after privacy and crew gates are met.",
      ar: "تغطية خاصة لاحتفالات العروس بطاقم نسائي فقط وتسليم عائلي خاص. يؤكد التوفر ونقطة السعر الخاضعة للمراجعة بعد استيفاء شروط الخصوصية والطاقم.",
    },
    cta: { en: "See bride services", ar: "شاهد خدمات العروس" },
    href: "/services/female-wedding",
  },
  katb: {
    title: { en: "Katb Kitab / Aqd Al Qiran", ar: "كتب الكتاب / عقد القران" },
    description: {
      en: "The Islamic marriage contract ceremony, filmed and photographed with care. Male, female, or both-section coverage. Tailored planning with specialist crew availability confirmed per project.",
      ar: "حفل عقد القران، يُصوَّر ويُ photograph بعناية. تغطية قسم الرجال أو النساء أو كلاهما. تخطيط مخصص مع تأكيد توفر الطاقم المتخصص لكل مشروع.",
    },
    cta: { en: "See Katb Kitab services", ar: "شاهد خدمات كتب الكتاب" },
    href: "/services/katb-kitab-aqd-al-qiran",
  },
  invitations: {
    title: { en: "Wedding Invitations", ar: "دعوات الأفراح" },
    description: {
      en: "Digital wedding invitations with RSVP, animated video invites, WhatsApp-ready designs, and location maps. Bilingual Arabic and English.",
      ar: "دعوات زفاف رقمية مع تأكيد الحضور، ودعوات فيديو متحركة، وتصاميم جاهزة لواتساب، وخرائط المواقع. ثنائية اللغة العربية والإنجليزية.",
    },
    cta: { en: "See invitation designs", ar: "شاهد تصاميم الدعوات" },
    href: "/invitation-designs",
  },
  packages: {
    eyebrow: { en: "Wedding packages", ar: "باقات الزفاف" },
    h2: { en: "Three packages, one production team", ar: "ثلاث باقات، فريق إنتاج واحد" },
    lead: {
      en: "Every package includes groom preparation, bride coverage options, and full wedding-day production. Starting prices shown below; final pricing is confirmed after we scope your day.",
      ar: "كل باقة تشمل تحضير العريس، خيارات تغطية العروس، وإنتاج يوم الزفاف الكامل. الأسعار البداية أدناه؛ يُؤكد التسعير النهائي بعد دراسة يومكم.",
    },
    silver: {
      name: { en: "Silver", ar: "فضية" },
      tagline: { en: "Essential record", ar: "توثيق أساسي" },
      price: { en: "Starting from AED 26,500", ar: "يبدأ من 26,500 درهم" },
      deliverables: {
        en: [
          "8 hours · 1 videographer (Sony FX3) · 1 photographer",
          "Crane/jib coverage included",
          "50 edited photos + all RAW photos and originals",
          "3–5 min highlight film + ceremony edit",
          "21-day delivery · 1 revision round",
        ],
        ar: [
          "٨ ساعات · مصور فيديو واحد (Sony FX3) · مصور فوتوغرافي واحد",
          "تغطية رافعة/جيب مشمولة",
          "٥٠ صورة معدلة + جميع صور RAW والأصول",
          "فيلم مختارات ٣–٥ دقائق + مونتاج الحفل",
          "تسليم خلال ٢١ يوم · جولة تعديل واحدة",
        ],
      },
    },
    gold: {
      name: { en: "Gold", ar: "ذهبية" },
      tagline: { en: "Cinematic Wedding Story", ar: "قصة زفاف سينمائية" },
      price: { en: "Starting from AED 31,500", ar: "يبدأ من 31,500 درهم" },
      deliverables: {
        en: [
          "8 hours · 2 videographers (Sony FX3 + Sony FX6 crane cam) · 1 photographer",
          "Crane/jib coverage included",
          "100 edited photos + all RAW photos and originals",
          "5–8 min highlight + 15–20 min key-event film + 1 social cut",
          "14-day delivery · 2 revision rounds",
        ],
        ar: [
          "٨ ساعات · مصورا فيديو (Sony FX3 + Sony FX6 كاميرا الرافعة) · مصور فوتوغرافي واحد",
          "تغطية رافعة/جيب مشمولة",
          "١٠٠ صورة معدلة + جميع صور RAW والأصول",
          "فيلم مختارات ٥–٨ دقائق + فيلم فعاليات رئيسية ١٥–٢٠ دقيقة + مقطع اجتماعي واحد",
          "تسليم خلال ١٤ يوم · جولتا تعديل",
        ],
      },
    },
    platinum: {
      name: { en: "Platinum", ar: "بلاتينية" },
      tagline: { en: "Expanded coverage", ar: "تغطية موسعة" },
      price: { en: "Starting from AED 36,500", ar: "يبدأ من 36,500 درهم" },
      deliverables: {
        en: [
          "8 hours · 2 videographers (Sony FX3 + Sony FX6 crane cam) · 2 photographers",
          "Crane/jib coverage included",
          "150 edited photos + all RAW photos and originals",
          "Highlight + extended film + 3 social cuts",
          "7-day delivery · 3 revision rounds",
        ],
        ar: [
          "٨ ساعات · مصورا فيديو (Sony FX3 + Sony FX6 كاميرا الرافعة) · مصورا فوتوغرافيا",
          "تغطية رافعة/جيب مشمولة",
          "١٥٠ صورة معدلة + جميع صور RAW والأصول",
          "فيلم مختارات + فيلم موسع + ٣ مقاطع اجتماعية",
          "تسليم خلال ٧ أيام · ٣ جولات تعديل",
        ],
      },
    },
    cta: { en: "Get a quotation", ar: "احصل على عرض سعر" },
  },
  cta: {
    h2: { en: "Planning a wedding?", ar: "خطط لحفل زفاف؟" },
    lead: {
      en: "Tell us the date, the venue and what you need covered. We will put the scope and the cost in writing before anything is booked.",
      ar: "أخبرنا بالتاريخ والموقع وما تريد تغطيته. سنضع النطاق والتكلفة كتابياً قبل حجز أي شيء.",
    },
    whatsapp: { en: "Talk to us on WhatsApp", ar: "تحدث معنا على واتساب" },
    email: { en: "Email us", ar: "راسلنا" },
  },
  waContext: {
    en: "I am planning a wedding in the UAE and want to discuss coverage.",
    ar: "أخطط لحفل زفاف في الإمارات وأريد مناقشة التغطية.",
  },
};

const categories = [
  { key: "groom" as const, color: "gold" },
  { key: "bride" as const, color: "gold" },
  { key: "katb" as const, color: "gold" },
  { key: "invitations" as const, color: "gold" },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta({
    locale,
    title: t(COPY.meta.title, locale),
    description: t(COPY.meta.description, locale),
    path: PAGE_PATH,
  });
}

export default async function WeddingsDirectory({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(locale, [
            { name: t(ui.breadcrumb.home, locale), path: "/" },
            { name: t(COPY.hero.h1, locale), path: PAGE_PATH },
          ]),
          serviceSchema({
            locale,
            name: t(COPY.hero.h1, locale),
            description: t(COPY.meta.description, locale),
            path: PAGE_PATH,
            areaServed: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Al Ain"],
          }),
        ]}
      />

      {/* ---------- HERO ---------- */}
      <Section>
        <Breadcrumbs
          locale={locale}
          items={[
            { name: t(ui.breadcrumb.home, locale), path: "/" },
            { name: t(COPY.hero.h1, locale) },
          ]}
        />
        <Reveal>
          <Eyebrow>{t(COPY.hero.eyebrow, locale)}</Eyebrow>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.5rem,6vw,4.5rem)]">{t(COPY.hero.h1, locale)}</h1>
          <p className="bs-lead mt-8 !max-w-2xl">{t(COPY.hero.lead, locale)}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button href={localizedPath(locale, "/wedding-quotation")} variant="gold">
              {t(COPY.hero.ctaPrimary, locale)}
            </Button>
            <Button href={waLink(t(COPY.waContext, locale))} variant="ghost" external>
              {t(COPY.hero.ctaSecondary, locale)}
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* ---------- CATEGORIES ---------- */}
      <Section alt>
        <Reveal>
          <Eyebrow>{t(COPY.categories.eyebrow, locale)}</Eyebrow>
          <h2 className="mt-5 max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)]">{t(COPY.categories.h2, locale)}</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {categories.map((cat, i) => {
            const data = COPY[cat.key];
            return (
              <Reveal as="div" key={cat.key} delay={i * 70}>
                <Link
                  href={localizedPath(locale, data.href)}
                  className="bs-card bs-card-hover block h-full"
                >
                  <h3 className="text-xl">{t(data.title, locale)}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-muted)]">
                    {t(data.description, locale)}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm text-[color:var(--color-gold)]">
                    {t(data.cta, locale)}
                    <span aria-hidden="true" className="bs-arrow">→</span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* ---------- PACKAGES ---------- */}
      <Section>
        <Reveal>
          <Eyebrow>{t(COPY.packages.eyebrow, locale)}</Eyebrow>
          <h2 className="mt-5 max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)]">{t(COPY.packages.h2, locale)}</h2>
          <p className="bs-lead mt-6 !max-w-3xl">{t(COPY.packages.lead, locale)}</p>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {[
            { key: "silver" as const, highlight: false },
            { key: "gold" as const, highlight: true },
            { key: "platinum" as const, highlight: false },
          ].map((pkg, i) => {
            const data = COPY.packages[pkg.key];
            const deliverables = isAr ? data.deliverables.ar : data.deliverables.en;
            return (
              <Reveal key={pkg.key} delay={i * 70} className={`bs-card flex flex-col ${pkg.highlight ? "ring-2 ring-[color:var(--color-gold)]" : ""}`}>
                <p className="bs-eyebrow">{t(data.name, locale)}</p>
                <h3 className="mt-3 text-xl">{t(data.tagline, locale)}</h3>
                <p className="mt-4 text-lg font-semibold text-[color:var(--color-gold)]">{t(data.price, locale)}</p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {deliverables.map((item: string, di: number) => (
                    <li key={di} className="flex gap-2.5 text-sm text-[color:var(--color-muted)]">
                      <span aria-hidden className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--color-gold)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Button href={localizedPath(locale, "/wedding-quotation")} variant={pkg.highlight ? "gold" : "ghost"}>
                    {t(COPY.packages.cta, locale)}
                  </Button>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* ---------- LED WALL OPTIONS ---------- */}
      <Section alt>
        <Reveal>
          <Eyebrow>{isAr ? "جدران LED" : "LED walls"}</Eyebrow>
          <h2 className="mt-5 max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)]">
            {isAr ? "عزّزوا احتفالكم بجدار LED" : "Enhance your celebration with an LED wall"}
          </h2>
          <p className="bs-lead mt-6 !max-w-3xl">
            {isAr
              ? "جدار LED يحوّل قاعة احتفالكم إلى تجربة بصرية مذهلة. الضيوف يرون كل لحظة بوضوح، ويُضفي أجواءً سينمائية، ويخلق خلفيات مذهلة للتصوير والفيديو."
              : "An LED wall transforms your celebration hall into a visual experience. Guests see every moment clearly, it adds cinematic atmosphere, and creates stunning backdrops for photography and video."}
          </p>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {/* Standard LED Wall */}
          <Reveal className="bs-card">
            <p className="bs-eyebrow">{isAr ? "الأفضل قيمة" : "Best value"}</p>
            <h3 className="mt-3 text-xl">{isAr ? "جدار LED قياسي (3×3.5م)" : "Standard LED Wall (3×3.5m)"}</h3>
            <p className="mt-3 text-sm text-[color:var(--color-muted)]">
              {isAr
                ? "مثالي لمعظم حفلات الزفاف. يشمل الرافعة والمعالج والكابلات والفني والتركيب والفك."
                : "Ideal for most weddings. Includes riser, processor, cables, technician, installation and dismantling."}
            </p>
            <p className="mt-4 text-lg font-semibold text-[color:var(--color-gold)]">{isAr ? "6,125 درهم/يوم" : "AED 6,125/day"}</p>
          </Reveal>

          {/* Large LED Wall */}
          <Reveal className="bs-card ring-2 ring-[color:var(--color-gold)]" delay={70}>
            <p className="bs-eyebrow">{isAr ? "مميز" : "Premium"}</p>
            <h3 className="mt-3 text-xl">{isAr ? "جدار LED كبير (4×7م)" : "Large LED Wall (4×7m)"}</h3>
            <p className="mt-3 text-sm text-[color:var(--color-muted)]">
              {isAr
                ? "للمواقع الكبيرة. يشمل الطاقم الفني والتركيب والتشغيل."
                : "For larger venues. Includes technical crew, installation and operation."}
            </p>
            <p className="mt-4 text-lg font-semibold text-[color:var(--color-gold)]">{isAr ? "14,350 درهم/يوم" : "AED 14,350/day"}</p>
          </Reveal>

          {/* Custom LED Wall */}
          <Reveal className="bs-card" delay={140}>
            <p className="bs-eyebrow">{isAr ? "مخصص" : "Custom"}</p>
            <h3 className="mt-3 text-xl">{isAr ? "جدار LED مخصص" : "Custom LED Wall"}</h3>
            <p className="mt-3 text-sm text-[color:var(--color-muted)]">
              {isAr
                ? "لمتطلبات محددة. أحجام مخصصة متاحة. نقدم عرض سعر لكل مشروع."
                : "For specific requirements. Custom sizes available. We quote per project."}
            </p>
            <p className="mt-4 text-lg font-semibold text-[color:var(--color-gold)]">{isAr ? "تواصل معنا للسعر" : "Contact for pricing"}</p>
            <div className="mt-4">
              <a href={waLink(isAr ? "مهتم بجدار LED لحفل زفاف." : "Interested in an LED wall for a wedding.")} target="_blank" rel="noopener noreferrer" className="bs-btn bs-btn-ghost">
                {isAr ? "تواصل معنا" : "Contact us"}
              </a>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ---------- CTA ---------- */}
      <Section className="text-center">
        <Reveal className="mx-auto max-w-3xl">
          <h2 className="text-[clamp(2.25rem,5vw,3.75rem)]">{t(COPY.cta.h2, locale)}</h2>
          <p className="bs-lead mx-auto mt-6">{t(COPY.cta.lead, locale)}</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Button href={waLink(t(COPY.waContext, locale))} variant="gold" external>
              {t(COPY.cta.whatsapp, locale)}
            </Button>
            <Button href={`mailto:${SITE.email}`} variant="ghost">
              {t(COPY.cta.email, locale)}
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
