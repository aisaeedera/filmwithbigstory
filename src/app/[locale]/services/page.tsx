import type { Metadata } from "next";
import Link from "next/link";
import { type Locale, localizedPath, t } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { servicesIndex as si, ui } from "@/data/copy";
import { services } from "@/data/services";
import { Section, Eyebrow } from "@/components/primitives";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import Breadcrumbs from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta({ locale, title: t(si.meta.title, locale), description: t(si.meta.description, locale), path: "/services" });
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;

  return (
    <>
      <JsonLd data={breadcrumbSchema(locale, [{ name: t(ui.breadcrumb.home, locale), path: "/" }, { name: t(ui.nav.services, locale), path: "/services" }])} />

      <Section>
        <Breadcrumbs locale={locale} items={[{ name: t(ui.breadcrumb.home, locale), path: "/" }, { name: t(ui.nav.services, locale) }]} />
        <Reveal>
          <Eyebrow>{t(si.eyebrow, locale)}</Eyebrow>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.5rem,6vw,4.5rem)]">{t(si.h1, locale)}</h1>
          <p className="bs-lead mt-8 !max-w-2xl">{t(si.lead, locale)}</p>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {si.stages.map((s, i) => (
            <Reveal key={i} delay={i * 80} className="bs-card">
              <span className="bs-num">{s.n}</span>
              <h2 className="mt-4 text-2xl">{t(s.title, locale)}</h2>
              <p className="mt-4 text-[color:var(--color-muted)]">{t(s.body, locale)}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* WHY IT PAYS */}
      <Section alt>
        <Reveal>
          <Eyebrow>{t(si.whyItPays.eyebrow, locale)}</Eyebrow>
          <h2 className="mt-5 text-[clamp(2rem,4.5vw,3.25rem)]">{t(si.whyItPays.h2, locale)}</h2>
          <p className="bs-lead mt-6">{t(si.whyItPays.lead, locale)}</p>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {si.whyItPays.cards.map((c, i) => (
            <Reveal key={i} delay={i * 70} className="bs-card">
              <h3 className="text-xl">{t(c.title, locale)}</h3>
              <p className="mt-4 text-sm text-[color:var(--color-muted)]">{t(c.body, locale)}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* WHAT WE PRODUCE — 7 services + 2 vertical framings */}
      <Section>
        <Reveal>
          <Eyebrow>{t(si.produce.eyebrow, locale)}</Eyebrow>
          <h2 className="mt-5 text-[clamp(2rem,4.5vw,3.25rem)]">{t(si.produce.h2, locale)}</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal as="div" key={s.slug} delay={(i % 3) * 70}>
              <Link href={localizedPath(locale, `/services/${s.slug}`)} className="bs-card bs-card-hover flex h-full flex-col">
                <h3 className="text-xl">{t(s.short, locale)}</h3>
                <p className="mt-3 text-sm text-[color:var(--color-muted)]">{t(s.description, locale)}</p>
                <span className="mt-5 text-sm text-[color:var(--color-gold)]">{t(ui.nav.startYourProject, locale)} →</span>
              </Link>
            </Reveal>
          ))}
          {si.produce.extra.map((c, i) => (
            <Reveal key={`x-${i}`} delay={0} className="bs-card">
              <h3 className="text-xl">{t(c.title, locale)}</h3>
              <p className="mt-3 text-sm text-[color:var(--color-muted)]">{t(c.body, locale)}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* DELIVERABLES */}
      <Section alt>
        <Reveal>
          <Eyebrow>{t(si.deliverables.eyebrow, locale)}</Eyebrow>
          <h2 className="mt-5 text-[clamp(2rem,4.5vw,3.25rem)]">{t(si.deliverables.h2, locale)}</h2>
        </Reveal>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {si.deliverables.items.map((it, i) => (
            <Reveal as="li" key={i} delay={i * 40} className="flex items-center gap-4 border-b border-[color:var(--color-line)] py-4">
              <span className="text-[color:var(--color-gold)]" aria-hidden="true">—</span>
              <span>{t(it, locale)}</span>
            </Reveal>
          ))}
        </ul>
      </Section>

      <CtaBand locale={locale} heading={t(si.finalH2, locale)} waContext={locale === "ar" ? "زرت صفحة الخدمات." : "Saw your services page."} />
    </>
  );
}
