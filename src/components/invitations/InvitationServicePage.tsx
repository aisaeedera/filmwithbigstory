/**
 * InvitationServicePage — the single data-driven renderer for all 15 child
 * service pages in the invitation cluster. Each route folder is a thin wrapper
 * that calls this with a slug; there are no 15 copied page layouts.
 *
 * It structurally guarantees the internal-link matrix (architecture §5) for
 * every page: breadcrumbs → Services + hub, a persistent hub + gallery module,
 * a related-invitation grid, and (for wedding pages) a wedding-coverage card.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { type Locale, localizedPath, t } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { ui } from "@/data/copy";
import { getInvitationPage, invitationUi, HUB_SLUG } from "@/data/invitations";
import { demosForService } from "@/data/invitation-designs";
import { Section, Eyebrow, Button } from "@/components/primitives";
import Reveal from "@/components/Reveal";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import Breadcrumbs from "@/components/Breadcrumbs";
import { waLink } from "@/lib/site";
import { JsonLd, breadcrumbSchema, faqSchema, serviceSchema } from "@/components/JsonLd";
import InvitationCard from "@/components/invitations/InvitationCard";
import {
  InvitationHubLinks,
  RelatedInvitations,
  WeddingCoverageLinks,
} from "@/components/invitations/RelatedInvitations";

const AREA = ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Al Ain"];

export function invitationServiceMetadata(slug: string, locale: Locale): Metadata {
  const page = getInvitationPage(slug);
  if (!page) return {};
  return pageMeta({
    locale,
    title: t(page.meta.title, locale),
    description: t(page.meta.description, locale),
    path: `/services/${slug}`,
  });
}

function Scope({
  locale,
  label,
  scope,
}: {
  locale: Locale;
  label: string;
  scope: NonNullable<ReturnType<typeof getInvitationPage>>["scopes"]["recommended"];
}) {
  return (
    <div className="bs-card h-full">
      <p className="text-xs uppercase tracking-wider text-[color:var(--color-gold)]">{label}</p>
      <h3 className="mt-3 text-2xl">{t(scope.name, locale)}</h3>
      <p className="mt-2 text-sm text-[color:var(--color-muted)]">{t(scope.tagline, locale)}</p>
      <p className="mt-6 text-xs uppercase tracking-wider text-[color:var(--color-muted)]">
        {t(invitationUi.includes, locale)}
      </p>
      <ul className="mt-4 space-y-2.5">
        {scope.includes.map((it, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-[color:var(--color-ink)]">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--color-gold)]" aria-hidden="true" />
            {t(it, locale)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function InvitationServicePage({ slug, locale }: { slug: string; locale: Locale }) {
  const page = getInvitationPage(slug);
  if (!page) notFound();

  const path = `/services/${slug}`;
  const faqItems = page.faqs.map((f) => ({ q: t(f.q, locale), a: t(f.a, locale) }));
  const demos = page.hasDemos ? demosForService(slug) : [];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(locale, [
            { name: t(ui.breadcrumb.home, locale), path: "/" },
            { name: t(ui.nav.services, locale), path: "/services" },
            { name: t(invitationUi.hubAnchor, locale), path: `/services/${HUB_SLUG}` },
            { name: t(page.breadcrumb, locale), path },
          ]),
          serviceSchema({
            locale,
            name: t(page.hero.h1, locale),
            description: t(page.meta.description, locale),
            path,
            areaServed: AREA,
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
            { name: t(ui.nav.services, locale), path: "/services" },
            { name: t(invitationUi.hubAnchor, locale), path: `/services/${HUB_SLUG}` },
            { name: t(page.breadcrumb, locale) },
          ]}
        />
        <Reveal>
          <Eyebrow>{t(page.hero.eyebrow, locale)}</Eyebrow>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.4rem,5.5vw,4rem)]">{t(page.hero.h1, locale)}</h1>
          <p className="bs-lead mt-8 !max-w-2xl">{t(page.hero.lead, locale)}</p>
          <p className="mt-6 !max-w-2xl text-base leading-relaxed text-[color:var(--color-ink)]">
            {t(page.intro, locale)}
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button href={waLink(`Re: ${t(page.breadcrumb, "en")}`)} variant="gold" external>
              {t(invitationUi.startOnWhatsApp, locale)}
            </Button>
            <Button href={localizedPath(locale, `/services/${HUB_SLUG}`)} variant="ghost">
              {t(invitationUi.hubAnchor, locale)}
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* WHAT YOU PROVIDE */}
      <Section alt>
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:items-start">
          <Reveal>
            <Eyebrow>{t(page.provides.title, locale)}</Eyebrow>
            <p className="bs-lead mt-6">
              {locale === "ar"
                ? "نحتاج القليل فقط لنبدأ. كلّما وصلتنا التفاصيل، كان التصميم أدقّ."
                : "We need only a little to begin. The more detail you send, the sharper the design."}
            </p>
          </Reveal>
          <Reveal delay={90}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {page.provides.items.map((it, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-[color:var(--color-line)] p-4 text-sm text-[color:var(--color-ink)]"
                >
                  <span className="mt-1 text-[color:var(--color-gold)]" aria-hidden="true">
                    —
                  </span>
                  {t(it, locale)}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* SCOPES */}
      <Section>
        <Reveal>
          <Eyebrow>{t(invitationUi.recommended, locale)} · {t(invitationUi.enhanced, locale)}</Eyebrow>
          <h2 className="mt-5 max-w-3xl text-[clamp(1.8rem,4vw,2.75rem)]">
            {locale === "ar" ? "نطاقان واضحان — اختر ما يناسب مناسبتك" : "Two clear scopes — pick what fits your event"}
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Reveal>
            <Scope locale={locale} label={t(invitationUi.recommended, locale)} scope={page.scopes.recommended} />
          </Reveal>
          <Reveal delay={90}>
            <Scope locale={locale} label={t(invitationUi.enhanced, locale)} scope={page.scopes.enhanced} />
          </Reveal>
        </div>
        <p className="mt-6 text-sm text-[color:var(--color-muted)]">
          {locale === "ar"
            ? "الأسعار النهائية تُشارَك عبر واتساب بعد تأكيد النطاق — لا أسعار ثابتة على الصفحة."
            : "Final pricing is shared on WhatsApp once the scope is confirmed — no fixed prices are posted here."}
        </p>
      </Section>

      {/* DISTINCT-INTENT SECTIONS */}
      {page.sections.map((s, i) => (
        <Section key={i} alt={i % 2 === 0}>
          <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:items-start">
            <Reveal>
              <h2 className="max-w-xl text-[clamp(1.6rem,3.5vw,2.4rem)]">{t(s.h2, locale)}</h2>
            </Reveal>
            <Reveal delay={90}>
              <p className="text-base leading-relaxed text-[color:var(--color-ink)]">{t(s.body, locale)}</p>
            </Reveal>
          </div>
        </Section>
      ))}

      {/* DEMO SAMPLES (or honest no-demo note) */}
      <Section alt={page.sections.length % 2 === 1}>
        <Reveal>
          <Eyebrow>{t(invitationUi.samples, locale)}</Eyebrow>
          <p className="bs-lead mt-6 !max-w-2xl">{t(invitationUi.samplesNote, locale)}</p>
        </Reveal>
        {page.hasDemos && demos.length > 0 ? (
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {demos.map((demo) => (
              <InvitationCard key={demo.id} demo={demo} locale={locale} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-[color:var(--color-line)] p-8 text-center">
            <p className="mx-auto max-w-xl text-base text-[color:var(--color-ink)]">
              {page.demoNote
                ? t(page.demoNote, locale)
                : locale === "ar"
                  ? "تصفّح معرض النماذج الكامل لرؤية أساليبنا الثمانية، ثم نُخصّصها لمناسبتك."
                  : "Browse the full demo gallery to see our eight styles, then we tailor one to your occasion."}
            </p>
          </div>
        )}
      </Section>

      {/* TURNAROUND & REVISIONS */}
      <Section>
        <Reveal>
          <Eyebrow>{t(invitationUi.turnaround, locale)}</Eyebrow>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Reveal className="bs-card">
            <p className="text-base leading-relaxed text-[color:var(--color-ink)]">{t(page.turnaround.body, locale)}</p>
          </Reveal>
          <Reveal delay={90} className="bs-card">
            <p className="text-base leading-relaxed text-[color:var(--color-ink)]">
              {t(page.turnaround.revisions, locale)}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* FAQ */}
      <Section alt>
        <Reveal>
          <Eyebrow>{t(invitationUi.faqs, locale)}</Eyebrow>
          <h2 className="mt-5 max-w-3xl text-[clamp(1.8rem,4vw,2.75rem)]">{t(page.hero.h1, locale)}</h2>
        </Reveal>
        <div className="mt-10">
          <Faq items={faqItems} />
        </div>
      </Section>

      {/* HUB + GALLERY LINKS (matrix rules 1 & 2) */}
      <Section>
        <Reveal>
          <Eyebrow>{t(invitationUi.clusterLabel, locale)}</Eyebrow>
        </Reveal>
        <div className="mt-8">
          <InvitationHubLinks locale={locale} />
        </div>
      </Section>

      {/* RELATED INVITATION SERVICES (matrix rule 3) */}
      <Section alt>
        <Reveal>
          <Eyebrow>{t(invitationUi.related, locale)}</Eyebrow>
        </Reveal>
        <div className="mt-8">
          <RelatedInvitations locale={locale} slugs={page.related} />
        </div>
        {page.weddingLinks ? (
          <div className="mt-6">
            <WeddingCoverageLinks locale={locale} />
          </div>
        ) : null}
      </Section>

      <CtaBand
        locale={locale}
        heading={t(page.ctaHeading, locale)}
        waContext={`Re: ${t(page.breadcrumb, "en")}.`}
      />
    </>
  );
}
