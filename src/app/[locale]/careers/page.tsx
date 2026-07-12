import type { Metadata } from "next";
import { type Locale, t } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { careers as ca, ui } from "@/data/copy";
import { SITE } from "@/lib/site";
import { Section, Eyebrow } from "@/components/primitives";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta({ locale, title: t(ca.meta.title, locale), description: t(ca.meta.description, locale), path: "/careers" });
}

export default async function CareersPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;

  return (
    <>
      <JsonLd data={breadcrumbSchema(locale, [{ name: t(ui.breadcrumb.home, locale), path: "/" }, { name: t(ui.nav.careers, locale), path: "/careers" }])} />

      <Section>
        <Breadcrumbs locale={locale} items={[{ name: t(ui.breadcrumb.home, locale), path: "/" }, { name: t(ui.nav.careers, locale) }]} />
        <Reveal>
          <Eyebrow>{t(ca.eyebrow, locale)}</Eyebrow>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.5rem,6vw,4.5rem)]">{t(ca.h1, locale)}</h1>
          <p className="bs-lead mt-8 !max-w-3xl">{t(ca.lead, locale)}</p>
        </Reveal>
      </Section>

      <Section alt className="text-center">
        <Reveal className="mx-auto max-w-2xl">
          <h2 className="text-[clamp(2rem,4.5vw,3.25rem)]">{t(ca.finalH2, locale)}</h2>
          <div className="mt-8">
            <a href={SITE.careersForm} target="_blank" rel="noopener noreferrer" className="bs-btn bs-btn-gold">
              {t(ca.applyNow, locale)}
            </a>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
