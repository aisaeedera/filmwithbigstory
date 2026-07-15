import type { Metadata } from "next";
import { type Locale, t } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { ui } from "@/data/copy";
import { pricing, pricingCopy as pc } from "@/data/pricing";
import { Section, Eyebrow } from "@/components/primitives";
import Reveal from "@/components/Reveal";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import Breadcrumbs from "@/components/Breadcrumbs";
import PricingTool from "@/components/PricingTool";
import { JsonLd, breadcrumbSchema, faqSchema, offerCatalogSchema } from "@/components/JsonLd";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta({ locale, title: t(pc.meta.title, locale), description: t(pc.meta.description, locale), path: "/pricing" });
}

export default async function PricingPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const label = { en: "Pricing", ar: "الأسعار" };

  const faqItems = pc.faq.items.map((it) => ({ q: t(it.q, locale), a: t(it.a, locale) }));

  const catalog = offerCatalogSchema({
    locale,
    name: t(pc.meta.title, locale),
    path: "/pricing",
    categories: pricing.map((cat) => ({
      name: t(cat.name, locale),
      offers: cat.modules.map((m) => ({ name: t(m.name, locale), price: m.price, from: m.unit === "from" })),
    })),
  });

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(locale, [
            { name: t(ui.breadcrumb.home, locale), path: "/" },
            { name: t(label, locale), path: "/pricing" },
          ]),
          catalog,
          faqSchema(faqItems),
        ]}
      />

      <Section>
        <Breadcrumbs locale={locale} items={[{ name: t(ui.breadcrumb.home, locale), path: "/" }, { name: t(label, locale) }]} />
        <Reveal>
          <Eyebrow>{t(pc.eyebrow, locale)}</Eyebrow>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.5rem,6vw,4.5rem)]">{t(pc.h1, locale)}</h1>
          <p className="bs-lead mt-8 !max-w-2xl">{t(pc.lead, locale)}</p>
          <p className="mt-6 max-w-2xl text-sm text-[color:var(--color-muted)]">{t(pc.currencyNote, locale)}</p>
        </Reveal>

        <PricingTool locale={locale} />
      </Section>

      <Section alt>
        <Reveal>
          <Eyebrow>{t(pc.faq.eyebrow, locale)}</Eyebrow>
          <h2 className="mt-5 text-[clamp(2rem,4.5vw,3.25rem)]">{t(pc.faq.h2, locale)}</h2>
        </Reveal>
        <div className="mt-12">
          <Faq items={faqItems} />
        </div>
      </Section>

      <CtaBand
        locale={locale}
        heading={t(pc.finalH2, locale)}
        waContext={locale === "ar" ? "شاهدت صفحة الأسعار." : "Saw your pricing page."}
      />
    </>
  );
}
