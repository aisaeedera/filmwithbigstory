import type { Metadata } from "next";
import { type Locale, t } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { clients, clientCategories } from "@/data/clients";
import { ui } from "@/data/copy";
import { Section, Eyebrow } from "@/components/primitives";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBand from "@/components/CtaBand";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta({
    locale,
    title: t(clients.meta.title, locale),
    description: t(clients.meta.description, locale),
    path: "/clients",
  });
}

export default async function ClientsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: t(ui.breadcrumb.home, locale), path: "/" },
          { name: t(clients.eyebrow, locale), path: "/clients" },
        ])}
      />

      <Section>
        <Breadcrumbs
          locale={locale}
          items={[{ name: t(ui.breadcrumb.home, locale), path: "/" }, { name: t(clients.eyebrow, locale) }]}
        />
        <Reveal>
          <Eyebrow>{t(clients.eyebrow, locale)}</Eyebrow>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.5rem,6vw,4.5rem)]">{t(clients.h1, locale)}</h1>
          <p className="bs-lead mt-8 !max-w-2xl">{t(clients.lead, locale)}</p>
        </Reveal>
      </Section>

      <Section alt>
        <Reveal>
          <Eyebrow>{t(clients.outcomesLabel, locale)}</Eyebrow>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {clients.outcomes.map((o, i) => (
              <Reveal key={i} delay={i * 60} className="bs-card">
                <p className="text-base text-[color:var(--color-ink)]">{t(o, locale)}</p>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <Eyebrow>{t(ui.nav.work, locale)}</Eyebrow>
          <h2 className="mt-6 max-w-3xl text-[clamp(1.8rem,4vw,2.75rem)]">{t(clients.eyebrow, locale)}</h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {clientCategories.map((c, i) => (
            <Reveal key={c.slug} delay={i * 70} className="bs-card flex flex-col">
              <p className="text-xs uppercase tracking-wider text-[color:var(--color-muted)]">{t(c.label, locale)}</p>
              <p className="mt-4 text-base text-[color:var(--color-ink)]">{t(c.blurb, locale)}</p>
              <p className="mt-4 text-sm text-[color:var(--color-muted)]">{t(c.typical, locale)}</p>
              <Link
                href={`/${locale}/work`}
                className="bs-gold-line mt-6 inline-flex self-start text-sm"
              >
                {t(ui.nav.work, locale)}
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section alt>
        <Reveal>
          <Eyebrow>{t(clients.processLabel, locale)}</Eyebrow>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {clients.process.map((p, i) => (
              <Reveal key={i} delay={i * 60} className="bs-card">
                <p className="text-xs uppercase tracking-wider text-[color:var(--color-gold)]">{t(p.step, locale)}</p>
                <p className="mt-3 text-base text-[color:var(--color-ink)]">{t(p.body, locale)}</p>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <Eyebrow>{t(clients.closingLabel, locale)}</Eyebrow>
          <p className="bs-lead mt-8 !max-w-3xl">{t(clients.closing, locale)}</p>
        </Reveal>
      </Section>

      <CtaBand
        locale={locale}
        heading={t(clients.h1, locale)}
        waContext="clients"
      />
    </>
  );
}
