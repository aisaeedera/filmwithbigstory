import type { Metadata } from "next";
import { type Locale, t } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { howWeWork } from "@/data/how-we-work";
import { ui } from "@/data/copy";
import { Section, Eyebrow } from "@/components/primitives";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBand from "@/components/CtaBand";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta({
    locale,
    title: t(howWeWork.meta.title, locale),
    description: t(howWeWork.meta.description, locale),
    path: "/how-we-work",
  });
}

export default async function HowWeWorkPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: t(ui.breadcrumb.home, locale), path: "/" },
          { name: t(howWeWork.breadcrumb, locale), path: "/how-we-work" },
        ])}
      />

      {/* HERO */}
      <Section>
        <Breadcrumbs
          locale={locale}
          items={[{ name: t(ui.breadcrumb.home, locale), path: "/" }, { name: t(howWeWork.breadcrumb, locale) }]}
        />
        <Reveal>
          <Eyebrow>{t(howWeWork.hero.eyebrow, locale)}</Eyebrow>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.5rem,6vw,4.5rem)]">{t(howWeWork.hero.h1, locale)}</h1>
          <p className="bs-lead mt-8 !max-w-2xl">{t(howWeWork.hero.lead, locale)}</p>
          <p className="mt-6 !max-w-2xl text-base text-[color:var(--color-muted)]">{t(howWeWork.hero.promise, locale)}</p>
        </Reveal>
      </Section>

      {/* PROCESS STAGES 01–06 */}
      {howWeWork.sections.map((s, i) => (
        <Section key={s.id} id={s.id} alt={i % 2 === 0}>
          <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-start">
            <Reveal>
              <span className="bs-num">{s.n}</span>
              <Eyebrow className="mt-5">{t(s.eyebrow, locale)}</Eyebrow>
              <h2 className="mt-4 max-w-xl text-[clamp(1.8rem,4vw,2.75rem)]">{t(s.h2, locale)}</h2>
              <p className="bs-lead mt-6">{t(s.lead, locale)}</p>
            </Reveal>
            <Reveal delay={90}>
              <p className="text-base leading-relaxed text-[color:var(--color-ink)]">{t(s.body, locale)}</p>
              <div className="bs-card mt-8">
                <p className="text-xs uppercase tracking-wider text-[color:var(--color-muted)]">
                  {t(howWeWork.labels.artifacts, locale)}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {s.artifacts.map((a, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-[color:var(--color-ink)]">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--color-gold)]" aria-hidden="true" />
                      {t(a, locale)}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 border-t border-[color:var(--color-line)] pt-5">
                  <p className="text-xs uppercase tracking-wider text-[color:var(--color-gold)]">
                    {t(howWeWork.labels.output, locale)}
                  </p>
                  <p className="mt-2 text-sm text-[color:var(--color-ink)]">{t(s.output, locale)}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </Section>
      ))}

      {/* TIMELINE */}
      <Section alt>
        <Reveal>
          <Eyebrow>{t(howWeWork.timeline.eyebrow, locale)}</Eyebrow>
          <h2 className="mt-5 max-w-3xl text-[clamp(1.8rem,4vw,2.75rem)]">{t(howWeWork.timeline.h2, locale)}</h2>
          <p className="bs-lead mt-6 !max-w-2xl">{t(howWeWork.timeline.lead, locale)}</p>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {howWeWork.timeline.items.map((it, i) => (
            <Reveal key={i} delay={i * 70} className="bs-card">
              <p className="text-xs uppercase tracking-wider text-[color:var(--color-gold)]">{t(it.label, locale)}</p>
              <p className="mt-3 text-base text-[color:var(--color-ink)]">{t(it.body, locale)}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* COMPLEXITY */}
      <Section>
        <Reveal>
          <Eyebrow>{t(howWeWork.complexity.eyebrow, locale)}</Eyebrow>
          <h2 className="mt-5 max-w-3xl text-[clamp(1.8rem,4vw,2.75rem)]">{t(howWeWork.complexity.h2, locale)}</h2>
          <p className="bs-lead mt-6 !max-w-2xl">{t(howWeWork.complexity.lead, locale)}</p>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {howWeWork.complexity.points.map((p, i) => (
            <Reveal key={i} delay={i * 60} className="bs-card">
              <p className="text-base text-[color:var(--color-ink)]">{t(p, locale)}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand locale={locale} heading={t(howWeWork.cta.heading, locale)} waContext="how-we-work" />
    </>
  );
}
