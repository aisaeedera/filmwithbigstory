import type { Metadata } from "next";
import Link from "next/link";
import { type Locale, localizedPath, t } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { serviceAreas as sa, ui } from "@/data/copy";
import { cities } from "@/data/cities";
import { services } from "@/data/services";
import { Section, Eyebrow } from "@/components/primitives";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import Breadcrumbs from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta({ locale, title: t(sa.meta.title, locale), description: t(sa.meta.description, locale), path: "/service-areas" });
}

export default async function ServiceAreasPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;

  return (
    <>
      <JsonLd data={breadcrumbSchema(locale, [{ name: t(ui.breadcrumb.home, locale), path: "/" }, { name: t(ui.nav.serviceAreas, locale), path: "/service-areas" }])} />

      <Section>
        <Breadcrumbs locale={locale} items={[{ name: t(ui.breadcrumb.home, locale), path: "/" }, { name: t(ui.nav.serviceAreas, locale) }]} />
        <Reveal>
          <Eyebrow>{t(sa.eyebrow, locale)}</Eyebrow>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.4rem,5.5vw,4rem)]">{t(sa.h1, locale)}</h1>
          <p className="bs-lead mt-8 !max-w-2xl">{t(sa.lead, locale)}</p>
        </Reveal>
      </Section>

      <Section alt>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cities.map((city, i) => (
            <Reveal key={city.slug} delay={(i % 3) * 70} className="bs-card">
              <h2 className="text-2xl">{t(city.name, locale)}</h2>
              <p className="mt-2 text-sm text-[color:var(--color-muted)]">{t(city.note, locale)}</p>
              <ul className="mt-5 space-y-2">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={localizedPath(locale, `/locations/${s.slug}-${city.slug}`)} className="bs-gold-line text-sm text-[color:color-mix(in_srgb,var(--color-ink)_85%,transparent)]">
                      {t(s.locName, locale)}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand locale={locale} heading={t(sa.finalH2, locale)} lead={t(sa.finalLead, locale)} waContext={locale === "ar" ? "بخصوص التصوير في الإمارات." : "Filming in the UAE."} />
    </>
  );
}
