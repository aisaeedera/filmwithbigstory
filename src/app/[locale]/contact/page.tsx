import type { Metadata } from "next";
import { type Locale, t } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { contact as c, ui } from "@/data/copy";
import { SITE, waBriefLink } from "@/lib/site";
import { Section, Eyebrow, Button } from "@/components/primitives";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import Breadcrumbs from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbSchema, localBusinessSchema } from "@/components/JsonLd";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta({ locale, title: t(c.meta.title, locale), description: t(c.meta.description, locale), path: "/contact" });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;

  const cards = [
    { tag: t(c.cards.email.tag, locale), value: SITE.email, body: t(c.cards.email.body, locale), href: `mailto:${SITE.email}` },
    { tag: t(c.cards.whatsapp.tag, locale), value: SITE.phone, body: t(c.cards.whatsapp.body, locale), href: `https://wa.me/${SITE.whatsapp}` },
    { tag: t(c.cards.studio.tag, locale), value: t(c.cards.studio.value, locale), body: t(c.cards.studio.body, locale), href: undefined },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(locale, [{ name: t(ui.breadcrumb.home, locale), path: "/" }, { name: t(ui.nav.contact, locale), path: "/contact" }]),
          localBusinessSchema(),
        ]}
      />

      <Section>
        <Breadcrumbs locale={locale} items={[{ name: t(ui.breadcrumb.home, locale), path: "/" }, { name: t(ui.nav.contact, locale) }]} />
        <Reveal>
          <Eyebrow>{t(c.eyebrow, locale)}</Eyebrow>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.5rem,6vw,4.5rem)]">{t(c.h1, locale)}</h1>
          <p className="bs-lead mt-8 !max-w-2xl">{t(c.lead, locale)}</p>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {cards.map((card, i) => {
            const inner = (
              <>
                <span className="bs-eyebrow before:hidden">{card.tag}</span>
                <p className="mt-3 text-xl text-[color:var(--color-ink)]">{card.value}</p>
                <p className="mt-3 text-sm text-[color:var(--color-muted)]">{card.body}</p>
              </>
            );
            return card.href ? (
              <a
                key={i}
                href={card.href}
                {...(card.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="bs-card bs-card-hover block"
              >
                {inner}
              </a>
            ) : (
              <div key={i} className="bs-card">{inner}</div>
            );
          })}
        </div>
      </Section>

      <Section alt>
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <Eyebrow>{t(c.brief.eyebrow, locale)}</Eyebrow>
            <h2 className="mt-5 text-[clamp(1.9rem,4vw,2.75rem)]">{t(c.brief.h2, locale)}</h2>
            <p className="bs-lead mt-6 !max-w-none">{t(c.brief.lead, locale)}</p>
            <div className="mt-8">
              <Button href={waBriefLink} variant="gold" external>{t(ui.ctaWhatsApp, locale)}</Button>
            </div>
            <p className="mt-6 text-sm text-[color:var(--color-muted)]">{t(ui.speedPromise, locale)}</p>
          </Reveal>
          <Reveal delay={100}>
            <ContactForm locale={locale} />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
