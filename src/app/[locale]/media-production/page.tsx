import type { Metadata } from "next";
import Link from "next/link";
import { type Locale, localizedPath, t } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { ui } from "@/data/copy";
import { services } from "@/data/services";
import { SITE, waLink } from "@/lib/site";
import { Section, Eyebrow, Button } from "@/components/primitives";
import Reveal from "@/components/Reveal";
import Faq from "@/components/Faq";
import Breadcrumbs from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbSchema, faqSchema, serviceSchema } from "@/components/JsonLd";
import MediaInquiryForm from "@/components/MediaInquiryForm";
import { HeroCtaSentinel, IndexList, IndexRow, ScopeGate, StageList } from "@/components/MediaProductionUi";
import StickyMobileCta from "@/components/StickyMobileCta";
import { MEDIA_BASE, mediaHub as h, mediaServices, mediaUi } from "@/data/media-production";

const AREA_SERVED = ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Al Ain"];
const PAGE_CONTEXT = "media-production-hub";
const INQUIRY_ANCHOR = "#project-inquiry";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta({
    locale,
    title: t(h.meta.title, locale),
    description: t(h.meta.description, locale),
    path: MEDIA_BASE,
  });
}

export default async function MediaProductionHub({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const faqItems = h.faq.items.map((it) => ({ q: t(it.q, locale), a: t(it.a, locale) }));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(locale, [
            { name: t(ui.breadcrumb.home, locale), path: "/" },
            { name: t(mediaUi.hubLabel, locale), path: MEDIA_BASE },
          ]),
          serviceSchema({
            locale,
            name: t(mediaUi.hubLabel, locale),
            description: t(h.meta.description, locale),
            path: MEDIA_BASE,
            areaServed: AREA_SERVED,
          }),
          // FAQPage is emitted only because the same five questions are
          // rendered below, from these same objects.
          faqSchema(faqItems),
        ]}
      />

      {/* ---------- HERO ---------- */}
      <Section>
        <Breadcrumbs
          locale={locale}
          items={[{ name: t(ui.breadcrumb.home, locale), path: "/" }, { name: t(mediaUi.hubLabel, locale) }]}
        />
        <Reveal>
          <Eyebrow>{t(h.hero.eyebrow, locale)}</Eyebrow>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.5rem,6vw,4.5rem)]">{t(h.hero.h1, locale)}</h1>
          <p className="bs-lead mt-8 !max-w-2xl">{t(h.hero.lead, locale)}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            {/* Primary: commitment action, straight to the inquiry form. */}
            <Button href={INQUIRY_ANCHOR} variant="gold">
              {t(h.hero.ctaPrimary, locale)}
            </Button>
            {/* Secondary: reassurance action for a reader who is not ready. */}
            <Button href={localizedPath(locale, "/how-we-work")} variant="ghost">
              {t(h.hero.ctaSecondary, locale)}
            </Button>
          </div>
          <HeroCtaSentinel />
        </Reveal>
      </Section>

      {/* ---------- SITUATION INDEX ---------- */}
      <Section alt>
        <Reveal>
          <Eyebrow>{t(h.situations.eyebrow, locale)}</Eyebrow>
          <h2 className="mt-5 max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)]">{t(h.situations.h2, locale)}</h2>
          <p className="bs-lead mt-6 !max-w-2xl">{t(h.hero.sub, locale)}</p>
        </Reveal>
        <Reveal delay={80} className="mt-12">
          <IndexList>
            {mediaServices.map((s) => (
              <IndexRow
                key={s.slug}
                locale={locale}
                index={s.order}
                title={t(s.short, locale)}
                description={t(s.meta.description, locale)}
                href={`${MEDIA_BASE}/${s.slug}`}
              />
            ))}
          </IndexList>
        </Reveal>
      </Section>

      {/* ---------- CAPABILITY INDEX ----------
          Carries the internal linking the retired /services hub used to hold,
          so no existing service page is orphaned by the move. */}
      <Section>
        <Reveal>
          <Eyebrow>{t(h.capability.eyebrow, locale)}</Eyebrow>
          <h2 className="mt-5 max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)]">{t(h.capability.h2, locale)}</h2>
          <p className="bs-lead mt-6 !max-w-2xl">{t(h.capability.lead, locale)}</p>
        </Reveal>
        <Reveal delay={80} className="mt-12">
          <IndexList>
            {services.map((s, i) => (
              <IndexRow
                key={s.slug}
                locale={locale}
                index={i + 1}
                title={t(s.short, locale)}
                description={t(s.description, locale)}
                href={`/services/${s.slug}`}
                cue={t(mediaUi.openPage, locale)}
              />
            ))}
          </IndexList>
        </Reveal>
      </Section>

      {/* ---------- PROCESS ---------- */}
      <Section alt>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start">
          <Reveal>
            <Eyebrow>{t(h.process.eyebrow, locale)}</Eyebrow>
            <h2 className="mt-5 text-[clamp(2rem,4.5vw,3.25rem)]">{t(h.process.h2, locale)}</h2>
            <p className="bs-lead mt-6">{t(h.process.lead, locale)}</p>
            <Link href={localizedPath(locale, "/how-we-work")} className="bs-btn bs-btn-ghost mt-8">
              {t(h.process.ctaLabel, locale)}
            </Link>
          </Reveal>
          <Reveal delay={90}>
            <StageList locale={locale} stages={h.process.stages} />
          </Reveal>
        </div>
      </Section>

      {/* ---------- SCOPE (price gate) ---------- */}
      <Section>
        <Reveal>
          <Eyebrow>{t(h.scope.eyebrow, locale)}</Eyebrow>
          <h2 className="mt-5 max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)]">{t(h.scope.h2, locale)}</h2>
          <p className="bs-lead mt-6 !max-w-2xl">{t(h.scope.lead, locale)}</p>
        </Reveal>
        <Reveal delay={80}>
          <ScopeGate locale={locale} covers={h.scope.covers} />
        </Reveal>
      </Section>

      {/* ---------- WHAT YOU CAN CHECK ----------
          Links only to pages that already exist on this site. No testimonial,
          no client name, no statistic: see the content architecture doc §1. */}
      <Section alt>
        <Reveal>
          <Eyebrow>{t(h.verify.eyebrow, locale)}</Eyebrow>
          <h2 className="mt-5 max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)]">{t(h.verify.h2, locale)}</h2>
          <p className="bs-lead mt-6 !max-w-2xl">{t(h.verify.lead, locale)}</p>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {h.verify.links.map((l, i) => (
            <Reveal as="div" key={l.path} delay={(i % 2) * 70}>
              <Link href={localizedPath(locale, l.path)} className="bs-card bs-card-hover block h-full">
                <h3 className="text-xl">{t(l.label, locale)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-muted)]">
                  {t(l.description, locale)}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm text-[color:var(--color-gold)]">
                  {t(mediaUi.openPage, locale)}
                  <span aria-hidden="true" className="bs-arrow">→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------- FAQ ---------- */}
      <Section id="faq">
        <Reveal>
          <Eyebrow>{t(h.faq.eyebrow, locale)}</Eyebrow>
          <h2 className="mt-5 max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)]">{t(h.faq.h2, locale)}</h2>
        </Reveal>
        <Reveal delay={80} className="mt-10 max-w-3xl">
          <Faq items={faqItems} />
        </Reveal>
      </Section>

      {/* ---------- INQUIRY ---------- */}
      <Section alt id="project-inquiry">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <Eyebrow>{t(h.inquiry.eyebrow, locale)}</Eyebrow>
            <h2 className="mt-5 text-[clamp(1.9rem,4vw,2.75rem)]">{t(h.inquiry.h2, locale)}</h2>
            <p className="bs-lead mt-6 !max-w-none">{t(h.inquiry.lead, locale)}</p>
            <noscript>
              <p className="mt-6 text-sm text-[color:var(--color-muted)]">{t(h.cta.lead, locale)}</p>
              <a href={waLink(t(h.waContext, locale))} className="bs-btn bs-btn-gold mt-4">
                {t(h.cta.whatsapp, locale)}
              </a>
            </noscript>
          </Reveal>
          <Reveal delay={100}>
            <MediaInquiryForm locale={locale} pageContext={PAGE_CONTEXT} />
          </Reveal>
        </div>
      </Section>

      {/* ---------- FINAL CTA ----------
          A third, distinct action: neither hero CTA is repeated here. */}
      <Section className="text-center">
        <Reveal className="mx-auto max-w-3xl">
          <h2 className="text-[clamp(2.25rem,5vw,3.75rem)]">{t(h.cta.h2, locale)}</h2>
          <p className="bs-lead mx-auto mt-6">{t(h.cta.lead, locale)}</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Button href={waLink(t(h.waContext, locale))} variant="gold" external>
              {t(h.cta.whatsapp, locale)}
            </Button>
            <Button href={`mailto:${SITE.email}`} variant="ghost">
              {t(h.cta.email, locale)}
            </Button>
          </div>
          <p className="mt-6 text-sm text-[color:var(--color-muted)]">{t(ui.speedPromise, locale)}</p>
        </Reveal>
      </Section>

      <StickyMobileCta label={t(h.stickyCta, locale)} href={INQUIRY_ANCHOR} pageContext={PAGE_CONTEXT} />
    </>
  );
}
