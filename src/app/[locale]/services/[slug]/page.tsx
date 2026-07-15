import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { type Locale, locales, localizedPath, t } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { SITE } from "@/lib/site";
import { services, getService, guides, getGuide, type Guide } from "@/data/services";
import { caseStudiesForService } from "@/data/work";
import { servicesIndex as si, ui } from "@/data/copy";
import { Section, Eyebrow, Button } from "@/components/primitives";
import Reveal from "@/components/Reveal";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import Breadcrumbs from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbSchema, faqSchema, serviceSchema } from "@/components/JsonLd";

export function generateStaticParams() {
  return locales.flatMap((locale) => [
    ...services.map((s) => ({ locale, slug: s.slug })),
    ...guides.map((g) => ({ locale, slug: g.slug })),
  ]);
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const g = getGuide(slug);
  if (g) {
    return pageMeta({
      locale,
      title: `${t(g.metaTitle, locale)} | Big Story`,
      description: t(g.metaDescription, locale),
      path: `/services/${slug}`,
    });
  }
  const s = getService(slug);
  if (!s) return {};
  return pageMeta({ locale, title: `${t(s.name, locale)} | Big Story`, description: t(s.lead, locale), path: `/services/${slug}` });
}

export default async function ServiceDetail({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params;

  const guide = getGuide(slug);
  if (guide) return <GuideDetail locale={locale} guide={guide} />;

  const s = getService(slug);
  if (!s) notFound();

  const cases = caseStudiesForService();
  const areaServed = ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Al Ain"];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(locale, [
            { name: t(ui.breadcrumb.home, locale), path: "/" },
            { name: t(ui.nav.services, locale), path: "/services" },
            { name: t(s.name, locale), path: `/services/${slug}` },
          ]),
          serviceSchema({ locale, name: t(s.name, locale), description: t(s.lead, locale), path: `/services/${slug}`, areaServed }),
          faqSchema(s.faqs.map((f) => ({ q: t(f.q, locale), a: t(f.a, locale) }))),
        ]}
      />

      <Section>
        <Breadcrumbs
          locale={locale}
          items={[
            { name: t(ui.breadcrumb.home, locale), path: "/" },
            { name: t(ui.nav.services, locale), path: "/services" },
            { name: t(s.name, locale) },
          ]}
        />
        <Reveal>
          <Eyebrow>{t(s.eyebrow, locale)}</Eyebrow>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.4rem,5.5vw,4rem)]">{t(s.name, locale)}</h1>
          <p className="bs-lead mt-8 !max-w-2xl">{t(s.lead, locale)}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button href={localizedPath(locale, "/contact")} variant="gold">{t(ui.nav.startYourProject, locale)}</Button>
            <Button href={localizedPath(locale, "/work")} variant="ghost">{t(ui.nav.seeOurWork, locale)}</Button>
          </div>
        </Reveal>
      </Section>

      {/* PROCESS */}
      <Section alt>
        <Reveal>
          <Eyebrow>{t(si.detail.process, locale)}</Eyebrow>
        </Reveal>
        <div className="mt-10 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
          {s.process.map((p, i) => (
            <Reveal key={i} delay={i * 70}>
              <span className="bs-num">{p.n}</span>
              <h2 className="mt-4 text-xl">{t(p.title, locale)}</h2>
              <p className="mt-3 text-sm text-[color:var(--color-muted)]">{t(p.body, locale)}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* DELIVERABLES */}
      <Section>
        <Reveal>
          <Eyebrow>{t(si.detail.deliverables, locale)}</Eyebrow>
        </Reveal>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {s.deliverables.map((d, i) => (
            <Reveal as="li" key={i} delay={i * 40} className="flex items-center gap-4 border-b border-[color:var(--color-line)] py-4">
              <span className="text-[color:var(--color-gold)]" aria-hidden="true">—</span>
              <span>{t(d, locale)}</span>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* RECENT WORK */}
      <Section alt>
        <Reveal>
          <Eyebrow>{t(si.detail.relatedWork, locale)}</Eyebrow>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {cases.map((cs, i) => (
            <Reveal as="div" key={cs.slug} delay={i * 80}>
              <Link href={localizedPath(locale, `/work/${cs.slug}`)} className="bs-card bs-card-hover block h-full">
                <span className="bs-eyebrow !text-[color:var(--color-muted)] before:!bg-[color:var(--color-muted)]">{t(cs.categoryLabel, locale)}</span>
                <h3 className="mt-4 text-2xl">{t(cs.title, locale)}</h3>
                <p className="mt-4 text-sm text-[color:var(--color-muted)]">{t(cs.summary, locale)}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <Reveal>
          <Eyebrow>{t(si.detail.faqs, locale)}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">{t(s.name, locale)}</h2>
        </Reveal>
        <div className="mt-10">
          <Faq items={s.faqs.map((f) => ({ q: t(f.q, locale), a: t(f.a, locale) }))} />
        </div>
      </Section>

      <CtaBand locale={locale} heading={t(si.finalH2, locale)} waContext={`${locale === "ar" ? "بخصوص" : "Re:"} ${t(s.name, locale)}.`} />
    </>
  );
}

/* ------------------------------------------------------------------ *
 * Educational guide layout — comparison tables, decision trees,      *
 * Article + FAQPage schema. No location links (these are not         *
 * services). Cross-links to relevant real services at the foot.      *
 * ------------------------------------------------------------------ */

const relatedLabel = { en: "Related services", ar: "خدمات ذات صلة" };

function GuideBlockView({ block, locale }: { block: Guide["blocks"][number]; locale: Locale }) {
  switch (block.kind) {
    case "text":
      return (
        <Reveal>
          <h2 className="text-[clamp(1.6rem,3.5vw,2.4rem)]">{t(block.heading, locale)}</h2>
          <p className="bs-lead mt-6 !max-w-3xl">{t(block.body, locale)}</p>
        </Reveal>
      );
    case "bullets":
      return (
        <Reveal>
          <h2 className="text-[clamp(1.6rem,3.5vw,2.4rem)]">{t(block.heading, locale)}</h2>
          {block.body ? <p className="bs-lead mt-6 !max-w-3xl">{t(block.body, locale)}</p> : null}
          <ul className="mt-8 grid gap-3">
            {block.items.map((it, i) => (
              <li key={i} className="flex gap-4 border-b border-[color:var(--color-line)] py-4">
                <span className="text-[color:var(--color-gold)]" aria-hidden="true">—</span>
                <span>{t(it, locale)}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      );
    case "decision":
      return (
        <Reveal>
          <h2 className="text-[clamp(1.6rem,3.5vw,2.4rem)]">{t(block.heading, locale)}</h2>
          {block.intro ? <p className="bs-lead mt-6 !max-w-3xl">{t(block.intro, locale)}</p> : null}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {block.items.map((it, i) => (
              <div key={i} className="bs-card">
                <p className="text-sm text-[color:var(--color-muted)]">{t(it.when, locale)}</p>
                <p className="mt-3 flex gap-3">
                  <span className="text-[color:var(--color-gold)]" aria-hidden="true">→</span>
                  <span>{t(it.then, locale)}</span>
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      );
    case "table":
      return (
        <Reveal>
          <h2 className="text-[clamp(1.6rem,3.5vw,2.4rem)]">{t(block.heading, locale)}</h2>
          {block.intro ? <p className="bs-lead mt-6 !max-w-3xl">{t(block.intro, locale)}</p> : null}
          <div className="mt-8 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              {block.table.caption ? <caption className="sr-only">{t(block.table.caption, locale)}</caption> : null}
              <thead>
                <tr className="border-b border-[color:var(--color-line)]">
                  <th className="p-3 text-start" />
                  {block.table.columns.map((c, i) => (
                    <th key={i} className="p-3 text-start font-[family-name:var(--font-display)] text-[color:var(--color-gold)]">
                      {t(c, locale)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.table.rows.map((row, ri) => (
                  <tr key={ri} className="border-b border-[color:var(--color-line)] align-top">
                    {row.map((cell, ci) =>
                      ci === 0 ? (
                        <th key={ci} scope="row" className="whitespace-nowrap p-3 text-start font-medium text-[color:var(--color-ink)]">
                          {t(cell, locale)}
                        </th>
                      ) : (
                        <td key={ci} className="p-3 text-[color:var(--color-muted)]">{t(cell, locale)}</td>
                      )
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      );
  }
}

function GuideDetail({ locale, guide }: { locale: Locale; guide: Guide }) {
  const path = `/services/${guide.slug}`;
  const url = `${SITE.domain}${localizedPath(locale, path)}`;
  const related = guide.related.map((s) => getService(s)).filter((s): s is NonNullable<typeof s> => Boolean(s));

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t(guide.metaTitle, locale),
    description: t(guide.metaDescription, locale),
    inLanguage: locale === "ar" ? "ar-AE" : "en-AE",
    mainEntityOfPage: url,
    url,
    image: `${SITE.domain}/opengraph-image`,
    author: { "@id": `${SITE.domain}/#organization` },
    publisher: { "@id": `${SITE.domain}/#organization` },
  };

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(locale, [
            { name: t(ui.breadcrumb.home, locale), path: "/" },
            { name: t(ui.nav.services, locale), path: "/services" },
            { name: t(guide.h1, locale), path },
          ]),
          articleSchema,
          faqSchema(guide.faqs.map((f) => ({ q: t(f.q, locale), a: t(f.a, locale) }))),
        ]}
      />

      <Section>
        <Breadcrumbs
          locale={locale}
          items={[
            { name: t(ui.breadcrumb.home, locale), path: "/" },
            { name: t(ui.nav.services, locale), path: "/services" },
            { name: t(guide.h1, locale) },
          ]}
        />
        <Reveal>
          <Eyebrow>{t(guide.eyebrow, locale)}</Eyebrow>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.4rem,5.5vw,4rem)]">{t(guide.h1, locale)}</h1>
          <p className="bs-lead mt-8 !max-w-2xl">{t(guide.lead, locale)}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button href={localizedPath(locale, "/contact")} variant="gold">{t(ui.nav.startYourProject, locale)}</Button>
            <Button href={localizedPath(locale, "/services")} variant="ghost">{t(ui.nav.allServices, locale)}</Button>
          </div>
        </Reveal>
      </Section>

      {guide.blocks.map((block, i) => (
        <Section key={i} alt={i % 2 === 1}>
          <GuideBlockView block={block} locale={locale} />
        </Section>
      ))}

      {/* FAQ */}
      <Section alt={guide.blocks.length % 2 === 1}>
        <Reveal>
          <Eyebrow>{t(si.detail.faqs, locale)}</Eyebrow>
        </Reveal>
        <div className="mt-10">
          <Faq items={guide.faqs.map((f) => ({ q: t(f.q, locale), a: t(f.a, locale) }))} />
        </div>
      </Section>

      {/* RELATED SERVICES */}
      {related.length > 0 ? (
        <Section alt={guide.blocks.length % 2 === 0}>
          <Reveal>
            <Eyebrow>{t(relatedLabel, locale)}</Eyebrow>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.map((rs, i) => (
              <Reveal as="div" key={rs.slug} delay={i * 70}>
                <Link href={localizedPath(locale, `/services/${rs.slug}`)} className="bs-card bs-card-hover block h-full">
                  <span className="bs-eyebrow !text-[color:var(--color-muted)] before:!bg-[color:var(--color-muted)]">{t(rs.eyebrow, locale)}</span>
                  <h3 className="mt-4 text-2xl">{t(rs.name, locale)}</h3>
                  <p className="mt-4 text-sm text-[color:var(--color-muted)]">{t(rs.description, locale)}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>
      ) : null}

      <CtaBand locale={locale} heading={t(guide.ctaHeading, locale)} waContext={`${locale === "ar" ? "بخصوص" : "Re:"} ${t(guide.h1, locale)}.`} />
    </>
  );
}
