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
      en: "Full wedding production in Dubai and the UAE: groom celebrations, bride celebrations, Katb Kitab ceremonies, and wedding invitations. Film, photography, LED walls, livestream and social cuts.",
      ar: "إنتاج أفراح متكامل في دبي والإمارات: احتفالات العريس واحتفالات العروس وحفلات عقد القران ودعوات الأفراح. فيلم وتصوير فوتوغرافي وجدران LED وبث مباشر ومقاطع سوشيال.",
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
      en: "Full groom celebration coverage: film, photography, LED walls, livestream, crane, and social cuts. 4 packages from Basic to Platinum, starting at AED 16,000.",
      ar: "تغطية شاملة لاحتفالات العريس: فيلم وتصوير فوتوغرافي وجدران LED وبث مباشر ورافعة ومقاطع سوشيال. 4 باقات من الأساسية إلى البلاتينية، تبدأ من 16,000 درهم.",
    },
    cta: { en: "See groom packages", ar: "شاهد باقات العريس" },
    href: "/services/groom-wedding-services",
  },
  bride: {
    title: { en: "Bride Weddings", ar: "أفراح العروس" },
    description: {
      en: "Dedicated bride celebration coverage in a female-only setting. Film, photography, LED walls, and social cuts, all crewed by women when required.",
      ar: "تغطية مخصصة لاحتفالات العروس في بيئة نسائية فقط. فيلم وتصوير فوتوغرافي وجدران LED ومقاطع سوشيال، بطاقم نسائي عند الطلب.",
    },
    cta: { en: "See bride packages", ar: "شاهد باقات العروس" },
    href: "/services/groom-wedding-services",
  },
  katb: {
    title: { en: "Katb Kitab", ar: "عقد القران" },
    description: {
      en: "The Islamic marriage contract ceremony, filmed and photographed with care. Shorter coverage for a formal, intimate event. Digital invitations included.",
      ar: "حفل عقد القران، يُصوَّر ويُ photograph بعناية. تغطية أقصر لحدث رسمي وحميم. دعوات رقمية مشمولة.",
    },
    cta: { en: "See Katb Kitab services", ar: "شاهد خدمات عقد القران" },
    href: "/services/katb-kitab-invitations",
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
