import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { type Locale, locales, localizedPath, t } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { caseStudies, getCaseStudy } from "@/data/work";
import { work as w, ui } from "@/data/copy";
import { Section, Eyebrow, Button } from "@/components/primitives";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import Breadcrumbs from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";

export function generateStaticParams() {
  return locales.flatMap((locale) => caseStudies.map((c) => ({ locale, slug: c.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) return {};
  return pageMeta({
    locale,
    title: `${t(c.title, locale)} | Big Story`,
    description: t(c.summary, locale),
    path: `/work/${slug}`,
  });
}

export default async function CaseStudyPage({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) notFound();

  const idx = caseStudies.findIndex((x) => x.slug === slug);
  const next = caseStudies[(idx + 1) % caseStudies.length];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: t(ui.breadcrumb.home, locale), path: "/" },
          { name: t(ui.nav.work, locale), path: "/work" },
          { name: t(c.title, locale), path: `/work/${slug}` },
        ])}
      />

      <Section>
        <Breadcrumbs
          locale={locale}
          items={[
            { name: t(ui.breadcrumb.home, locale), path: "/" },
            { name: t(ui.nav.work, locale), path: "/work" },
            { name: t(c.client, locale) },
          ]}
        />
        <Reveal>
          <span className="bs-eyebrow">{t(c.categoryLabel, locale)}</span>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.4rem,5.5vw,4rem)]">{t(c.title, locale)}</h1>
          <p className="bs-lead mt-8 !max-w-2xl">{t(c.summary, locale)}</p>
        </Reveal>
        {/* TODO(client): hero still / showreel embed — CLIENT_HANDOFF.md */}
        <Reveal delay={80}>
          <div className="mt-10 flex aspect-video w-full items-center justify-center rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-elevated)] text-[color:var(--color-muted)]">
            <span className="text-sm">{t(c.client, locale)}</span>
          </div>
        </Reveal>
      </Section>

      <Section alt>
        <div className="grid gap-12 md:grid-cols-2">
          <Reveal className="bs-prose">
            <h2>{t(w.detail.brief, locale)}</h2>
            <p>{t(c.brief, locale)}</p>
            <h2>{t(w.detail.approach, locale)}</h2>
            <p>{t(c.approach, locale)}</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-[family-name:var(--font-display)] text-2xl">{t(w.detail.deliverables, locale)}</h2>
            <ul className="mt-5 space-y-3">
              {c.deliverables.map((d, i) => (
                <li key={i} className="flex items-center gap-3 border-b border-[color:var(--color-line)] pb-3">
                  <span className="text-[color:var(--color-gold)]" aria-hidden="true">—</span>
                  <span className="text-sm">{t(d, locale)}</span>
                </li>
              ))}
            </ul>
            <h2 className="mt-10 font-[family-name:var(--font-display)] text-2xl">{t(w.detail.results, locale)}</h2>
            <p className="mt-4 text-[color:var(--color-muted)]">{t(c.results, locale)}</p>
          </Reveal>
        </div>
      </Section>

      {/* NEXT */}
      <Section>
        <Reveal>
          <Eyebrow>{t(w.detail.next, locale)}</Eyebrow>
          <Link href={localizedPath(locale, `/work/${next.slug}`)} className="mt-5 block max-w-3xl">
            <h2 className="bs-gold-line inline text-[clamp(1.8rem,4vw,2.75rem)]">{t(next.title, locale)}</h2>
          </Link>
          <div className="mt-8">
            <Button href={localizedPath(locale, "/work")} variant="ghost">{t(ui.nav.work, locale)}</Button>
          </div>
        </Reveal>
      </Section>

      <CtaBand locale={locale} heading={t(w.finalH2, locale)} waContext={locale === "ar" ? "بخصوص دراسة حالة." : "Re: a case study."} alt />
    </>
  );
}
