import type { Metadata } from "next";
import { type Locale, localizedPath, t } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { work as w, ui } from "@/data/copy";
import { caseStudies } from "@/data/work";
import { Section, Eyebrow } from "@/components/primitives";
import Reveal from "@/components/Reveal";
import WorkGrid from "@/components/WorkGrid";
import CtaBand from "@/components/CtaBand";
import Breadcrumbs from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta({ locale, title: t(w.meta.title, locale), description: t(w.meta.description, locale), path: "/work" });
}

export default async function WorkPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;

  const items = caseStudies.map((cs) => ({
    slug: cs.slug,
    href: localizedPath(locale, `/work/${cs.slug}`),
    category: t(cs.category, locale),
    categoryLabel: t(cs.categoryLabel, locale),
    title: t(cs.title, locale),
    summary: t(cs.summary, locale),
  }));

  const filters = (["brand-film", "corporate", "social", "event", "documentary", "product"] as const).map((k) => ({
    key: k,
    label: t(w.filters[k], locale),
  }));

  return (
    <>
      <JsonLd data={breadcrumbSchema(locale, [{ name: t(ui.breadcrumb.home, locale), path: "/" }, { name: t(ui.nav.work, locale), path: "/work" }])} />

      <Section>
        <Breadcrumbs locale={locale} items={[{ name: t(ui.breadcrumb.home, locale), path: "/" }, { name: t(ui.nav.work, locale) }]} />
        <Reveal>
          <Eyebrow>{t(w.eyebrow, locale)}</Eyebrow>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.5rem,6vw,4.5rem)]">{t(w.h1, locale)}</h1>
          <p className="bs-lead mt-8 !max-w-2xl">{t(w.lead, locale)}</p>
        </Reveal>
        <div className="mt-14">
          <WorkGrid items={items} filters={filters} allLabel={t(w.filters.all, locale)} />
        </div>
      </Section>

      <CtaBand locale={locale} heading={t(w.finalH2, locale)} waContext={locale === "ar" ? "زرت صفحة الأعمال." : "Saw your work page."} alt />
    </>
  );
}
