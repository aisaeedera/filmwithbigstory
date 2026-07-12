import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { type Locale, locales, localizedPath, t } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { services, getService } from "@/data/services";
import { cities } from "@/data/cities";
import { caseStudiesForService } from "@/data/work";
import { work as workCopy, servicesIndex as si, ui } from "@/data/copy";
import { Section, Eyebrow, Button } from "@/components/primitives";
import Reveal from "@/components/Reveal";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import Breadcrumbs from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbSchema, faqSchema, serviceSchema } from "@/components/JsonLd";

export function generateStaticParams() {
  return locales.flatMap((locale) => services.map((s) => ({ locale, slug: s.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  const title = `${t(s.name, locale)} in Dubai | Big Story`;
  return pageMeta({ locale, title, description: t(s.lead, locale), path: `/services/${slug}` });
}

export default async function ServiceDetail({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const cases = caseStudiesForService();
  const areaServed = cities.map((c) => t(c.name, "en"));

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

      {/* AVAILABLE IN — internal links to location pages */}
      <Section alt>
        <Reveal>
          <Eyebrow>{t(si.detail.availableIn, locale)}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.6rem,3.5vw,2.4rem)]">{t(s.locName, locale)}</h2>
        </Reveal>
        <div className="mt-8 flex flex-wrap gap-3">
          {cities.map((c) => (
            <Link
              key={c.slug}
              href={localizedPath(locale, `/locations/${s.slug}-${c.slug}`)}
              className="rounded-full border border-[color:var(--color-line)] px-5 py-2.5 text-sm transition hover:border-[color:var(--color-gold)] hover:text-[color:var(--color-gold)]"
            >
              {t(c.name, locale)}
            </Link>
          ))}
        </div>
      </Section>

      <CtaBand locale={locale} heading={t(si.finalH2, locale)} waContext={`${locale === "ar" ? "بخصوص" : "Re:"} ${t(s.name, locale)}.`} />
    </>
  );
}
