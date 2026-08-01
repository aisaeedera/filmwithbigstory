import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { type Locale, locales, localizedPath, t } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { ui } from "@/data/copy";
import { SITE, waLink } from "@/lib/site";
import { Section, Eyebrow, Button } from "@/components/primitives";
import Reveal from "@/components/Reveal";
import Faq from "@/components/Faq";
import Breadcrumbs from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbSchema, faqSchema, serviceSchema } from "@/components/JsonLd";
import MediaInquiryForm from "@/components/MediaInquiryForm";
import { HeroCtaSentinel, IndexList, IndexRow, ScopeGate, StageList } from "@/components/MediaProductionUi";
import StickyMobileCta from "@/components/StickyMobileCta";
import {
  MEDIA_BASE,
  getMediaService,
  mediaHub,
  mediaServiceSlugs,
  mediaServices,
  mediaUi,
} from "@/data/media-production";
import { MEDIA_PROJECT_TYPES } from "@/lib/contact";

const AREA_SERVED = ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Al Ain"];
const INQUIRY_ANCHOR = "#project-inquiry";

/** Pre-select the inquiry form's project type from the page the reader is on. */
const SLUG_TO_PROJECT_TYPE: Record<string, { en: string; ar: string }> = {
  "company-media-revamp": { en: MEDIA_PROJECT_TYPES.en[0], ar: MEDIA_PROJECT_TYPES.ar[0] },
  "new-product-launch": { en: MEDIA_PROJECT_TYPES.en[1], ar: MEDIA_PROJECT_TYPES.ar[1] },
  "new-company-launch": { en: MEDIA_PROJECT_TYPES.en[2], ar: MEDIA_PROJECT_TYPES.ar[2] },
};

export function generateStaticParams() {
  return locales.flatMap((locale) => mediaServiceSlugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const s = getMediaService(slug);
  if (!s) return {};
  return pageMeta({
    locale,
    title: t(s.meta.title, locale),
    description: t(s.meta.description, locale),
    path: `${MEDIA_BASE}/${slug}`,
  });
}

export default async function MediaServicePage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const s = getMediaService(slug);
  if (!s) notFound();

  const path = `${MEDIA_BASE}/${slug}`;
  const faqItems = s.faq.items.map((it) => ({ q: t(it.q, locale), a: t(it.a, locale) }));
  const siblings = mediaServices.filter((other) => other.slug !== slug);
  const defaultProjectType = SLUG_TO_PROJECT_TYPE[slug]?.[locale];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(locale, [
            { name: t(ui.breadcrumb.home, locale), path: "/" },
            { name: t(mediaUi.hubLabel, locale), path: MEDIA_BASE },
            { name: t(s.breadcrumb, locale), path },
          ]),
          serviceSchema({
            locale,
            name: t(s.hero.h1, locale),
            description: t(s.meta.description, locale),
            path,
            areaServed: AREA_SERVED,
          }),
          // FAQPage only because the same four questions render below.
          faqSchema(faqItems),
        ]}
      />

      {/* ---------- HERO ---------- */}
      <Section>
        <Breadcrumbs
          locale={locale}
          items={[
            { name: t(ui.breadcrumb.home, locale), path: "/" },
            { name: t(mediaUi.hubLabel, locale), path: MEDIA_BASE },
            { name: t(s.breadcrumb, locale) },
          ]}
        />
        <Reveal>
          <Eyebrow>{t(s.hero.eyebrow, locale)}</Eyebrow>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.3rem,5.5vw,4rem)]">{t(s.hero.h1, locale)}</h1>
          <p className="bs-lead mt-8 !max-w-2xl">{t(s.hero.lead, locale)}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button href={INQUIRY_ANCHOR} variant="gold">
              {t(s.hero.ctaPrimary, locale)}
            </Button>
            <Button href={localizedPath(locale, MEDIA_BASE)} variant="ghost">
              {t(s.hero.ctaSecondary, locale)}
            </Button>
          </div>
          <HeroCtaSentinel />
        </Reveal>
      </Section>

      {/* ---------- THE PROBLEM ---------- */}
      <Section alt>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
          <Reveal>
            <Eyebrow>{t(s.problem.eyebrow, locale)}</Eyebrow>
            <h2 className="mt-5 max-w-xl text-[clamp(1.9rem,4vw,2.9rem)]">{t(s.problem.h2, locale)}</h2>
            <p className="bs-lead mt-6">{t(s.problem.lead, locale)}</p>
          </Reveal>
          <Reveal delay={90}>
            <p className="text-base leading-relaxed text-[color:color-mix(in_srgb,var(--color-ink)_86%,transparent)]">
              {t(s.problem.body, locale)}
            </p>
            <ul className="bs-mp-signals mt-8">
              {s.problem.signals.map((sig, i) => (
                <li key={i}>{t(sig, locale)}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* ---------- INTENDED OUTCOME ----------
          Stated as intent, never as a guarantee. No metric, no promise. */}
      <Section>
        <Reveal>
          <Eyebrow>{t(s.outcome.eyebrow, locale)}</Eyebrow>
          <h2 className="mt-5 max-w-3xl text-[clamp(1.9rem,4vw,2.9rem)]">{t(s.outcome.h2, locale)}</h2>
          <p className="bs-lead mt-6 !max-w-2xl">{t(s.outcome.lead, locale)}</p>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {s.outcome.items.map((o, i) => (
            <Reveal key={i} delay={i * 70} className="bs-card">
              <p className="bs-eyebrow">{t(o.label, locale)}</p>
              <p className="mt-5 text-sm leading-relaxed text-[color:color-mix(in_srgb,var(--color-ink)_86%,transparent)]">
                {t(o.body, locale)}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------- PROCESS ---------- */}
      <Section alt>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start">
          <Reveal>
            <Eyebrow>{t(s.process.eyebrow, locale)}</Eyebrow>
            <h2 className="mt-5 text-[clamp(1.9rem,4vw,2.9rem)]">{t(s.process.h2, locale)}</h2>
            <p className="bs-lead mt-6">{t(s.process.lead, locale)}</p>
            <Link href={localizedPath(locale, "/how-we-work")} className="bs-btn bs-btn-ghost mt-8">
              {t(mediaHub.process.ctaLabel, locale)}
            </Link>
          </Reveal>
          <Reveal delay={90}>
            <StageList locale={locale} stages={s.process.stages} />
          </Reveal>
        </div>
      </Section>

      {/* ---------- SCOPE AND DELIVERABLES (price gate) ---------- */}
      <Section>
        <Reveal>
          <Eyebrow>{t(s.scope.eyebrow, locale)}</Eyebrow>
          <h2 className="mt-5 max-w-3xl text-[clamp(1.9rem,4vw,2.9rem)]">{t(s.scope.h2, locale)}</h2>
          <p className="bs-lead mt-6 !max-w-2xl">{t(s.scope.lead, locale)}</p>
        </Reveal>
        <Reveal delay={80}>
          <ScopeGate locale={locale} covers={s.scope.covers} />
        </Reveal>
      </Section>

      {/* ---------- FAQ ---------- */}
      <Section alt id="faq">
        <Reveal>
          <Eyebrow>{t(s.faq.eyebrow, locale)}</Eyebrow>
          <h2 className="mt-5 max-w-3xl text-[clamp(1.9rem,4vw,2.9rem)]">{t(s.faq.h2, locale)}</h2>
        </Reveal>
        <Reveal delay={80} className="mt-10 max-w-3xl">
          <Faq items={faqItems} />
        </Reveal>
      </Section>

      {/* ---------- RELATED ---------- */}
      <Section>
        <Reveal>
          <Eyebrow>{t(mediaUi.otherEngagements, locale)}</Eyebrow>
        </Reveal>
        <Reveal delay={70} className="mt-8">
          <IndexList>
            {siblings.map((other) => (
              <IndexRow
                key={other.slug}
                locale={locale}
                index={other.order}
                title={t(other.short, locale)}
                description={t(other.meta.description, locale)}
                href={`${MEDIA_BASE}/${other.slug}`}
              />
            ))}
          </IndexList>
        </Reveal>

        <Reveal delay={100} className="mt-14">
          <Eyebrow>{t(mediaUi.relatedHeading, locale)}</Eyebrow>
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {s.related.map((r, i) => (
            <Reveal as="div" key={r.path} delay={(i % 2) * 70}>
              <Link href={localizedPath(locale, r.path)} className="bs-card bs-card-hover block h-full">
                <h3 className="text-xl">{t(r.label, locale)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-muted)]">
                  {t(r.description, locale)}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm text-[color:var(--color-gold)]">
                  {t(mediaUi.openPage, locale)}
                  <span aria-hidden="true" className="bs-arrow">→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-10">
          <Link href={localizedPath(locale, MEDIA_BASE)} className="bs-btn bs-btn-ghost">
            {t(mediaUi.backToHub, locale)}
          </Link>
        </div>
      </Section>

      {/* ---------- INQUIRY ---------- */}
      <Section alt id="project-inquiry">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <Eyebrow>{t(mediaHub.inquiry.eyebrow, locale)}</Eyebrow>
            <h2 className="mt-5 text-[clamp(1.9rem,4vw,2.75rem)]">{t(mediaHub.inquiry.h2, locale)}</h2>
            <p className="bs-lead mt-6 !max-w-none">{t(s.cta.lead, locale)}</p>
            <noscript>
              <a href={waLink(t(s.waContext, locale))} className="bs-btn bs-btn-gold mt-8">
                {t(s.cta.whatsapp, locale)}
              </a>
            </noscript>
          </Reveal>
          <Reveal delay={100}>
            <MediaInquiryForm
              locale={locale}
              pageContext={`media-production/${slug}`}
              defaultProjectType={defaultProjectType}
            />
          </Reveal>
        </div>
      </Section>

      {/* ---------- DISTINCTIVE CLOSING CTA ----------
          Each page closes with its own heading and its own WhatsApp context,
          so the three service pages do not end identically. */}
      <Section className="text-center">
        <Reveal className="mx-auto max-w-3xl">
          <h2 className="text-[clamp(2.1rem,5vw,3.5rem)]">{t(s.cta.h2, locale)}</h2>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Button href={waLink(t(s.waContext, locale))} variant="gold" external>
              {t(s.cta.whatsapp, locale)}
            </Button>
            <Button href={`mailto:${SITE.email}`} variant="ghost">
              {t(ui.emailUs, locale)}
            </Button>
          </div>
          <p className="mt-6 text-sm text-[color:var(--color-muted)]">{t(ui.speedPromise, locale)}</p>
        </Reveal>
      </Section>

      <StickyMobileCta label={t(s.hero.ctaPrimary, locale)} href={INQUIRY_ANCHOR} pageContext={`media-production/${slug}`} />
    </>
  );
}
