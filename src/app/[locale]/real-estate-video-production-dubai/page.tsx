import type { Metadata } from "next";
import Link from "next/link";
import { type Locale, localizedPath, t } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { realEstateFilms as re } from "@/data/real-estate-films";
import { ui } from "@/data/copy";
import { Section, Eyebrow } from "@/components/primitives";
import Reveal from "@/components/Reveal";
import Faq from "@/components/Faq";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBand from "@/components/CtaBand";
import { JsonLd, breadcrumbSchema, faqSchema, serviceSchema } from "@/components/JsonLd";

const PATH = "/real-estate-video-production-dubai";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta({
    locale,
    title: t(re.meta.title, locale),
    description: t(re.meta.description, locale),
    path: PATH,
  });
}

export default async function RealEstateFilmsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;

  const faqItems = re.faq.items.map((it) => ({ q: t(it.q, locale), a: t(it.a, locale) }));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(locale, [
            { name: t(ui.breadcrumb.home, locale), path: "/" },
            { name: t(re.breadcrumb, locale), path: PATH },
          ]),
          serviceSchema({
            locale,
            name: t(re.hero.h1, locale),
            description: t(re.meta.description, locale),
            path: PATH,
            areaServed: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Al Ain"],
          }),
          faqSchema(faqItems),
        ]}
      />

      {/* HERO */}
      <Section>
        <Breadcrumbs
          locale={locale}
          items={[{ name: t(ui.breadcrumb.home, locale), path: "/" }, { name: t(re.breadcrumb, locale) }]}
        />
        <Reveal>
          <Eyebrow>{t(re.hero.eyebrow, locale)}</Eyebrow>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.5rem,6vw,4.5rem)]">{t(re.hero.h1, locale)}</h1>
          <p className="bs-lead mt-8 !max-w-2xl">{t(re.hero.lead, locale)}</p>
          <p className="mt-6 !max-w-2xl text-base text-[color:var(--color-muted)]">{t(re.hero.promise, locale)}</p>
        </Reveal>
      </Section>

      {/* CONTENT SECTIONS 01–03 */}
      {re.sections.map((s, i) => (
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
                  {t(re.labels.covers, locale)}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {s.list.map((a, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-[color:var(--color-ink)]">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--color-gold)]" aria-hidden="true" />
                      {t(a, locale)}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Section>
      ))}

      {/* MARKET DATA */}
      <Section>
        <Reveal>
          <Eyebrow>{t(re.marketData.eyebrow, locale)}</Eyebrow>
          <h2 className="mt-5 max-w-3xl text-[clamp(1.8rem,4vw,2.75rem)]">{t(re.marketData.h2, locale)}</h2>
          <p className="bs-lead mt-6 !max-w-2xl">{t(re.marketData.lead, locale)}</p>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {re.marketData.stats.map((st, i) => (
            <Reveal key={i} delay={i * 70} className="bs-card">
              <p className="bs-num text-[clamp(1.6rem,3vw,2.4rem)]">{t(st.value, locale)}</p>
              <p className="mt-4 text-sm text-[color:var(--color-ink)]">{t(st.label, locale)}</p>
              <p className="mt-4 text-xs uppercase tracking-wider text-[color:var(--color-muted)]">
                {t(st.source, locale)}
              </p>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-sm text-[color:var(--color-muted)]">{t(re.marketData.note, locale)}</p>
      </Section>

      {/* DRONE */}
      <Section alt>
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-start">
          <Reveal>
            <Eyebrow>{t(re.drone.eyebrow, locale)}</Eyebrow>
            <h2 className="mt-5 max-w-xl text-[clamp(1.8rem,4vw,2.75rem)]">{t(re.drone.h2, locale)}</h2>
            <p className="bs-lead mt-6">{t(re.drone.lead, locale)}</p>
            <p className="mt-6 text-base leading-relaxed text-[color:var(--color-ink)]">{t(re.drone.body, locale)}</p>
          </Reveal>
          <div className="grid gap-6">
            {re.drone.points.map((p, i) => (
              <Reveal key={i} delay={i * 70} className="bs-card">
                <p className="text-xs uppercase tracking-wider text-[color:var(--color-gold)]">{t(p.label, locale)}</p>
                <p className="mt-3 text-base text-[color:var(--color-ink)]">{t(p.body, locale)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* COMPLIANCE */}
      <Section>
        <Reveal>
          <Eyebrow>{t(re.compliance.eyebrow, locale)}</Eyebrow>
          <h2 className="mt-5 max-w-3xl text-[clamp(1.8rem,4vw,2.75rem)]">{t(re.compliance.h2, locale)}</h2>
          <p className="bs-lead mt-6 !max-w-2xl">{t(re.compliance.lead, locale)}</p>
          <p className="mt-6 !max-w-2xl text-base leading-relaxed text-[color:var(--color-ink)]">
            {t(re.compliance.body, locale)}
          </p>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {re.compliance.points.map((p, i) => (
            <Reveal key={i} delay={i * 60} className="bs-card">
              <p className="text-xs uppercase tracking-wider text-[color:var(--color-gold)]">{t(p.label, locale)}</p>
              <p className="mt-3 text-base text-[color:var(--color-ink)]">{t(p.body, locale)}</p>
            </Reveal>
          ))}
        </div>
        <div className="bs-card mt-6 border-s-2 border-[color:var(--color-gold)]">
          <p className="text-base text-[color:var(--color-ink)]">{t(re.compliance.ownership, locale)}</p>
        </div>
      </Section>

      {/* TIMELINE */}
      <Section alt>
        <Reveal>
          <Eyebrow>{t(re.timeline.eyebrow, locale)}</Eyebrow>
          <h2 className="mt-5 max-w-3xl text-[clamp(1.8rem,4vw,2.75rem)]">{t(re.timeline.h2, locale)}</h2>
          <p className="bs-lead mt-6 !max-w-2xl">{t(re.timeline.lead, locale)}</p>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {re.timeline.items.map((it, i) => (
            <Reveal key={i} delay={i * 70} className="bs-card">
              <p className="text-xs uppercase tracking-wider text-[color:var(--color-gold)]">{t(it.label, locale)}</p>
              <p className="mt-3 text-base text-[color:var(--color-ink)]">{t(it.body, locale)}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* PRICING APPROACH */}
      <Section>
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-start">
          <Reveal>
            <Eyebrow>{t(re.pricingApproach.eyebrow, locale)}</Eyebrow>
            <h2 className="mt-5 max-w-xl text-[clamp(1.8rem,4vw,2.75rem)]">{t(re.pricingApproach.h2, locale)}</h2>
          </Reveal>
          <Reveal delay={90}>
            <p className="bs-lead">{t(re.pricingApproach.lead, locale)}</p>
            <p className="mt-6 text-base leading-relaxed text-[color:var(--color-ink)]">
              {t(re.pricingApproach.body, locale)}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* NO-ASSET / HONEST STANCE */}
      <Section alt>
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-start">
          <Reveal>
            <Eyebrow>{t(re.noAsset.eyebrow, locale)}</Eyebrow>
            <h2 className="mt-5 max-w-xl text-[clamp(1.8rem,4vw,2.75rem)]">{t(re.noAsset.h2, locale)}</h2>
            <p className="bs-lead mt-6">{t(re.noAsset.lead, locale)}</p>
            <p className="mt-6 text-base leading-relaxed text-[color:var(--color-ink)]">{t(re.noAsset.offer, locale)}</p>
          </Reveal>
          <Reveal delay={90}>
            <div className="grid aspect-video place-items-center rounded-2xl border border-dashed border-[color:var(--color-line)] bg-[color:color-mix(in_srgb,var(--color-ink)_3%,transparent)] p-8 text-center">
              <div>
                <p className="font-[family-name:var(--font-display)] text-2xl text-[color:var(--color-ink)]">
                  {t(re.noAsset.placeholder.title, locale)}
                </p>
                <p className="mx-auto mt-4 max-w-sm text-sm text-[color:var(--color-muted)]">
                  {t(re.noAsset.placeholder.note, locale)}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <Reveal>
          <Eyebrow>{t(re.faq.eyebrow, locale)}</Eyebrow>
          <h2 className="mt-5 max-w-3xl text-[clamp(1.8rem,4vw,2.75rem)]">{t(re.faq.h2, locale)}</h2>
        </Reveal>
        <div className="mt-10">
          <Faq items={faqItems} />
        </div>
      </Section>

      {/* INTERNAL LINK TO HOW WE WORK */}
      <Section alt>
        <Reveal className="bs-card flex flex-col items-start justify-between gap-6 p-10 md:flex-row md:items-center">
          <div>
            <Eyebrow>{t(re.internalLink.label, locale)}</Eyebrow>
            <p className="mt-4 max-w-2xl text-base text-[color:var(--color-ink)]">{t(re.internalLink.body, locale)}</p>
          </div>
          <Link href={localizedPath(locale, "/how-we-work")} className="bs-btn bs-btn-ghost shrink-0">
            {t(re.internalLink.cta, locale)}
          </Link>
        </Reveal>
      </Section>

      <CtaBand locale={locale} heading={t(re.cta.heading, locale)} waContext="real-estate-films" />
    </>
  );
}
