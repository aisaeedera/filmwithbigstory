import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { type Locale, locales, localizedPath, t } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { locationPages, getLocation } from "@/data/locations";
import { services } from "@/data/services";
import { location as loc, ui } from "@/data/copy";
import { fill } from "@/lib/util";
import { Section, Eyebrow } from "@/components/primitives";
import Reveal from "@/components/Reveal";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import Breadcrumbs from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbSchema, faqSchema, serviceSchema } from "@/components/JsonLd";
import { waLink } from "@/lib/site";

export function generateStaticParams() {
  return locales.flatMap((locale) => locationPages.map((l) => ({ locale, slug: l.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = getLocation(slug);
  if (!page) return {};
  const { service, city } = page;
  const cityName = t(city.name, locale);
  const svcName = t(service.locName, locale);
  const title = `${svcName} in ${cityName} | Big Story`;
  const description = fill(t(service.locIntro, locale), { city: cityName }).slice(0, 300);
  return pageMeta({ locale, title, description, path: `/locations/${slug}` });
}

export default async function LocationPage({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params;
  const page = getLocation(slug);
  if (!page) notFound();
  const { service, city } = page;
  const cityName = t(city.name, locale);
  const svcName = t(service.locName, locale);
  const vars = { city: cityName };

  const faqItems = service.locFaqs.map((f) => ({ q: fill(t(f.q, locale), vars), a: fill(t(f.a, locale), vars) }));
  const otherServices = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(locale, [
            { name: t(ui.breadcrumb.home, locale), path: "/" },
            { name: t(ui.breadcrumb.serviceAreas, locale), path: "/service-areas" },
            { name: `${svcName} · ${cityName}`, path: `/locations/${slug}` },
          ]),
          serviceSchema({
            locale,
            name: `${svcName} in ${cityName}`,
            description: fill(t(service.locIntro, locale), vars),
            path: `/locations/${slug}`,
            areaServed: [t(city.name, "en")],
          }),
          faqSchema(faqItems),
        ]}
      />

      <Section>
        <Breadcrumbs
          locale={locale}
          items={[
            { name: t(ui.breadcrumb.home, locale), path: "/" },
            { name: t(ui.breadcrumb.serviceAreas, locale), path: "/service-areas" },
            { name: `${svcName} · ${cityName}` },
          ]}
        />
        <Reveal>
          <span className="bs-eyebrow">{svcName}</span>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.3rem,5.5vw,4rem)]">
            {svcName} in {cityName}
          </h1>
          <p className="bs-lead mt-8 !max-w-3xl">{fill(t(service.locIntro, locale), vars)}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a href={waLink(`${svcName} — ${cityName}.`)} target="_blank" rel="noopener noreferrer" className="bs-btn bs-btn-gold">
              {t(ui.nav.startYourProject, locale)}
            </a>
            <Link href={localizedPath(locale, `/services/${service.slug}`)} className="bs-btn bs-btn-ghost">
              {t(service.short, locale)}
            </Link>
          </div>
        </Reveal>
      </Section>

      {/* ON THE GROUND — unique local content */}
      <Section alt>
        <div className="grid gap-8 md:grid-cols-[0.7fr_1.3fr] md:items-start">
          <Reveal>
            <Eyebrow>{t(loc.onGround, locale)}</Eyebrow>
          </Reveal>
          <Reveal delay={80} className="bs-prose">
            <p>{fill(t(city.groundBase, locale), vars)}</p>
            <p>{fill(t(service.groundAngle, locale), vars)}</p>
            <p className="text-sm text-[color:var(--color-muted)]">
              {city.areas.join(" · ")}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* WHAT WE CAN PRODUCE HERE */}
      <Section>
        <Reveal>
          <Eyebrow>{t(loc.produceHere, locale)}</Eyebrow>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {loc.produceCards.map((card, i) => (
            <Reveal key={i} delay={i * 70} className="bs-card">
              <h2 className="text-xl">{t(card.title, locale)}</h2>
              <p className="mt-4 text-sm text-[color:var(--color-muted)]">{t(card.body, locale)}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section alt>
        <Reveal>
          <Eyebrow>{t(loc.frequentlyAsked, locale)}</Eyebrow>
        </Reveal>
        <div className="mt-8">
          <Faq items={faqItems} />
        </div>
      </Section>

      {/* RELATED */}
      <Section>
        <Reveal>
          <Eyebrow>{t(loc.related, locale)}</Eyebrow>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {loc.relatedCards.map((card, i) => (
            <Reveal as="div" key={i} delay={i * 70}>
              <Link href={localizedPath(locale, card.href)} className="bs-card bs-card-hover block h-full">
                <h2 className="text-xl">{t(card.title, locale)}</h2>
                <p className="mt-3 text-sm text-[color:var(--color-muted)]">{t(card.body, locale)}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* OTHER SERVICES IN THIS CITY — internal linking */}
      <Section alt>
        <Reveal>
          <Eyebrow>{t(loc.otherServicesHere, locale)} {cityName}</Eyebrow>
        </Reveal>
        <div className="mt-8 flex flex-wrap gap-3">
          {otherServices.map((s) => (
            <Link
              key={s.slug}
              href={localizedPath(locale, `/locations/${s.slug}-${city.slug}`)}
              className="rounded-full border border-[color:var(--color-line)] px-5 py-2.5 text-sm transition hover:border-[color:var(--color-gold)] hover:text-[color:var(--color-gold)]"
            >
              {t(s.locName, locale)}
            </Link>
          ))}
        </div>
      </Section>

      <CtaBand locale={locale} heading={t(loc.finalH2, locale)} waContext={`${svcName} — ${cityName}.`} />
    </>
  );
}
