import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { type Locale, locales, localizedPath, t } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { ui } from "@/data/copy";
import { webServices, webServiceSlugs, getWebService } from "@/data/web-services";
import { SITE, waLink } from "@/lib/site";
import { Section, Eyebrow, Button } from "@/components/primitives";
import Reveal from "@/components/Reveal";
import Faq from "@/components/Faq";
import Breadcrumbs from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbSchema, faqSchema, serviceSchema } from "@/components/JsonLd";

const PARENT = "/website-services";
const parentLabel = { en: "Website services", ar: "خدمات المواقع" };

export function generateStaticParams() {
  return locales.flatMap((locale) => webServiceSlugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const s = getWebService(slug);
  if (!s) return {};
  return pageMeta({
    locale,
    title: `${t(s.meta.title, locale)} | Big Story`,
    description: t(s.meta.description, locale),
    path: `/website-services/${slug}`,
  });
}

const relatedLabel = { en: "More website services", ar: "المزيد من خدمات المواقع" };
const backToAll = { en: "All website services", ar: "كل خدمات المواقع" };
const deliverablesLead = { en: "Everything included in this service.", ar: "كل ما يشمله هذه الخدمة." };

export default async function WebServiceDetail({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const s = getWebService(slug);
  if (!s) notFound();

  const path = `/website-services/${slug}`;
  const areaServed = ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Al Ain"];
  const faqItems = s.faq.items.map((it) => ({ q: t(it.q, locale), a: t(it.a, locale) }));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(locale, [
            { name: t(ui.breadcrumb.home, locale), path: "/" },
            { name: t(parentLabel, locale), path: PARENT },
            { name: t(s.breadcrumb, locale), path },
          ]),
          serviceSchema({
            locale,
            name: t(s.hero.h1, locale),
            description: t(s.meta.description, locale),
            path,
            areaServed,
          }),
          faqSchema(faqItems),
        ]}
      />

      {/* HERO */}
      <Section>
        <Breadcrumbs
          locale={locale}
          items={[
            { name: t(ui.breadcrumb.home, locale), path: "/" },
            { name: t(parentLabel, locale), path: PARENT },
            { name: t(s.breadcrumb, locale) },
          ]}
        />
        <Reveal>
          <Eyebrow>{t(s.hero.eyebrow, locale)}</Eyebrow>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.4rem,5.5vw,4rem)]">{t(s.hero.h1, locale)}</h1>
          <p className="bs-lead mt-8 !max-w-2xl">{t(s.hero.lead, locale)}</p>
          <p className="mt-6 !max-w-2xl text-base text-[color:var(--color-muted)]">{t(s.hero.promise, locale)}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button href={waLink(`I would like to approve a free homepage concept (${t(s.breadcrumb, locale)})`)} variant="gold" external>
              {t(ui.nav.startYourProject, locale)}
            </Button>
            <Button href={localizedPath(locale, "/work")} variant="ghost">
              {t(ui.nav.seeOurWork, locale)}
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* CONTENT SECTIONS */}
      {s.sections.map((sec, i) => (
        <Section key={sec.id} id={sec.id} alt={i % 2 === 1}>
          <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-start">
            <Reveal>
              <span className="bs-num">{sec.n}</span>
              <Eyebrow className="mt-5">{t(sec.eyebrow, locale)}</Eyebrow>
              <h2 className="mt-4 max-w-xl text-[clamp(1.8rem,4vw,2.75rem)]">{t(sec.h2, locale)}</h2>
              <p className="bs-lead mt-6">{t(sec.lead, locale)}</p>
            </Reveal>
            <Reveal delay={90}>
              <p className="text-base leading-relaxed text-[color:var(--color-ink)]">{t(sec.body, locale)}</p>
              <div className="bs-card mt-8">
                <ul className="space-y-2.5">
                  {sec.list.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-[color:var(--color-ink)]">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--color-gold)]" aria-hidden="true" />
                      {t(item, locale)}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Section>
      ))}

      {/* DELIVERABLES */}
      <Section alt>
        <Reveal>
          <Eyebrow>{t(s.deliverables.eyebrow, locale)}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">{t(s.deliverables.h2, locale)}</h2>
          <p className="bs-lead mt-5 !max-w-2xl">{t(deliverablesLead, locale)}</p>
        </Reveal>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {s.deliverables.items.map((d, i) => (
            <Reveal as="li" key={i} delay={i * 40} className="flex items-center gap-4 border-b border-[color:var(--color-line)] py-4">
              <span className="text-[color:var(--color-gold)]" aria-hidden="true">✓</span>
              <span className="text-sm text-[color:var(--color-ink)]">{t(d, locale)}</span>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* APPROACH */}
      <Section>
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-start">
          <Reveal>
            <Eyebrow>{t(s.approach.eyebrow, locale)}</Eyebrow>
            <h2 className="mt-5 max-w-xl text-[clamp(1.8rem,4vw,2.75rem)]">{t(s.approach.h2, locale)}</h2>
            <p className="bs-lead mt-6">{t(s.approach.lead, locale)}</p>
          </Reveal>
          <Reveal delay={90}>
            <p className="text-base leading-relaxed text-[color:var(--color-ink)]">{t(s.approach.body, locale)}</p>
          </Reveal>
        </div>
      </Section>

      {/* OUTCOMES */}
      <Section alt>
        <Reveal>
          <Eyebrow>{t(s.outcomes.eyebrow, locale)}</Eyebrow>
          <h2 className="mt-5 max-w-3xl text-[clamp(1.8rem,4vw,2.75rem)]">{t(s.outcomes.h2, locale)}</h2>
          <p className="bs-lead mt-6 !max-w-2xl">{t(s.outcomes.lead, locale)}</p>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {s.outcomes.items.map((o, i) => (
            <Reveal key={i} delay={i * 70} className="bs-card">
              <p className="text-xs uppercase tracking-wider text-[color:var(--color-gold)]">{t(o.label, locale)}</p>
              <p className="mt-3 text-base text-[color:var(--color-ink)]">{t(o.body, locale)}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <Reveal>
          <Eyebrow>{t(s.faq.eyebrow, locale)}</Eyebrow>
          <h2 className="mt-5 max-w-3xl text-[clamp(1.8rem,4vw,2.75rem)]">{t(s.faq.h2, locale)}</h2>
        </Reveal>
        <div className="mt-10 max-w-3xl">
          <Faq items={faqItems} />
        </div>
      </Section>

      {/* RELATED SERVICES */}
      <Section alt>
        <Reveal>
          <Eyebrow>{t(relatedLabel, locale)}</Eyebrow>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {webServices
            .filter((rs) => rs.slug !== slug)
            .slice(0, 3)
            .map((rs, i) => (
              <Reveal as="div" key={rs.slug} delay={i * 70}>
                <Link href={localizedPath(locale, `/website-services/${rs.slug}`)} className="bs-card bs-card-hover block h-full">
                  <span className="bs-eyebrow !text-[color:var(--color-muted)] before:!bg-[color:var(--color-muted)]">
                    {t(rs.hero.eyebrow, locale)}
                  </span>
                  <h3 className="mt-4 text-xl">{t(rs.breadcrumb, locale)}</h3>
                  <p className="mt-3 text-sm text-[color:var(--color-muted)]">{t(rs.meta.description, locale)}</p>
                </Link>
              </Reveal>
            ))}
        </div>
        <div className="mt-8">
          <Link href={localizedPath(locale, PARENT)} className="bs-btn bs-btn-ghost">
            {t(backToAll, locale)}
          </Link>
        </div>
      </Section>

      {/* FINAL CTA */}
      <Section className="text-center">
        <Reveal className="mx-auto max-w-3xl">
          <h2 className="text-[clamp(2.25rem,5vw,3.75rem)]">{t(s.cta.heading, locale)}</h2>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Button href={waLink("I want to start a free homepage concept")} variant="gold" external>
              {t(ui.nav.startYourProject, locale)}
            </Button>
            <Button href={`mailto:${SITE.email}`} variant="ghost">
              {t(ui.emailUs, locale)}
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
