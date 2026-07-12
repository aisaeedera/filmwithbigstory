import type { Metadata } from "next";
import { type Locale, t } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { about, ui } from "@/data/copy";
import { Section, Eyebrow } from "@/components/primitives";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import Breadcrumbs from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta({ locale, title: t(about.meta.title, locale), description: t(about.meta.description, locale), path: "/about" });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;

  return (
    <>
      <JsonLd data={breadcrumbSchema(locale, [{ name: t(ui.breadcrumb.home, locale), path: "/" }, { name: t(ui.nav.about, locale), path: "/about" }])} />

      <Section>
        <Breadcrumbs locale={locale} items={[{ name: t(ui.breadcrumb.home, locale), path: "/" }, { name: t(ui.nav.about, locale) }]} />
        <Reveal>
          <Eyebrow>{t(about.eyebrow, locale)}</Eyebrow>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.5rem,6vw,4.5rem)]">{t(about.h1, locale)}</h1>
          <p className="bs-lead mt-8 !max-w-2xl">{t(about.lead, locale)}</p>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {about.cards.map((c, i) => (
            <Reveal key={i} delay={i * 80} className="bs-card">
              <h2 className="text-2xl">{t(c.title, locale)}</h2>
              <p className="mt-4 text-[color:var(--color-muted)]">{t(c.body, locale)}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={100}>
          <p className="bs-lead mt-12 !max-w-3xl">{t(about.para, locale)}</p>
          <p className="mt-6 max-w-3xl text-[color:var(--color-muted)]">{t(about.nda, locale)}</p>
        </Reveal>
      </Section>

      <Section alt>
        <div className="grid gap-8 md:grid-cols-[1fr_1.3fr] md:items-start">
          <Reveal>
            <Eyebrow>{t(about.craft.eyebrow, locale)}</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="text-[clamp(1.8rem,4vw,2.75rem)]">{t(about.craft.h2, locale)}</h2>
            <p className="bs-lead mt-6 !max-w-none">{t(about.craft.lead, locale)}</p>
          </Reveal>
        </div>
      </Section>

      {/* TEAM — critical trust signal, Phase 2 photos */}
      <Section>
        <Reveal>
          <Eyebrow>{t(about.team.eyebrow, locale)}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">{t(about.team.h2, locale)}</h2>
        </Reveal>
        {/* TODO(client): replace with real founder/crew headshots + names — CLIENT_HANDOFF.md */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <Reveal key={i} delay={i * 70} className="bs-card">
              <div className="aspect-square w-full rounded-lg border border-[color:var(--color-line)] bg-[color:var(--color-bg)]" aria-hidden="true" />
              <p className="mt-4 text-sm text-[color:var(--color-muted)]">
                {i === 0 ? t(about.team.note, locale) : " "}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand locale={locale} heading={t(about.finalH2, locale)} waContext={locale === "ar" ? "قرأت صفحة من نحن." : "Read your about page."} alt />
    </>
  );
}
