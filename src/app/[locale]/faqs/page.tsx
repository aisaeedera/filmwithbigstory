import type { Metadata } from "next";
import { type Locale, t } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { faqs as f, ui } from "@/data/copy";
import { Section, Eyebrow } from "@/components/primitives";
import Reveal from "@/components/Reveal";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import Breadcrumbs from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/components/JsonLd";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta({ locale, title: t(f.meta.title, locale), description: t(f.meta.description, locale), path: "/faqs" });
}

export default async function FaqsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const items = f.items.map((it) => ({ q: t(it.q, locale), a: t(it.a, locale) }));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(locale, [{ name: t(ui.breadcrumb.home, locale), path: "/" }, { name: t(ui.nav.faqs, locale), path: "/faqs" }]),
          faqSchema(items),
        ]}
      />

      <Section>
        <Breadcrumbs locale={locale} items={[{ name: t(ui.breadcrumb.home, locale), path: "/" }, { name: t(ui.nav.faqs, locale) }]} />
        <Reveal>
          <Eyebrow>{t(f.eyebrow, locale)}</Eyebrow>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.5rem,6vw,4.5rem)]">{t(f.h1, locale)}</h1>
          <p className="bs-lead mt-8 !max-w-2xl">{t(f.lead, locale)}</p>
        </Reveal>
        <div className="mt-12">
          <Faq items={items} />
        </div>
      </Section>

      <CtaBand locale={locale} heading={t(f.finalH2, locale)} waContext={locale === "ar" ? "لدي سؤال." : "I have a question."} alt />
    </>
  );
}
