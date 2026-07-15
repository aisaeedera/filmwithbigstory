import type { Metadata } from "next";
import Link from "next/link";
import { type Locale, localizedPath, t } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { waLink } from "@/lib/site";
import { home, ui } from "@/data/copy";
import { services } from "@/data/services";
import { caseStudies } from "@/data/work";
import { Section, Eyebrow, Button } from "@/components/primitives";
import Reveal from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import CtaBand from "@/components/CtaBand";
import { JsonLd, localBusinessSchema } from "@/components/JsonLd";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta({
    locale,
    title: t(home.meta.title, locale),
    description: t(home.meta.description, locale),
    path: "/",
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;

  return (
    <>
      <JsonLd data={[localBusinessSchema()]} />

      {/* HERO — H1 at the bottom, editorial */}
      <section className="relative overflow-hidden border-b border-[color:var(--color-line)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, rgba(201,162,39,0.10), transparent 70%), radial-gradient(50% 40% at 85% 90%, rgba(201,162,39,0.05), transparent 70%)",
          }}
        />
        <div className="bs-shell relative flex min-h-[86vh] flex-col justify-center py-24">
          <Reveal>
            <Eyebrow>{t(home.hero.eyebrow, locale)}</Eyebrow>
            <p className="bs-artag mt-8">{home.hero.artag}</p>
            <p className="bs-lead mt-8 text-[color:color-mix(in_srgb,var(--color-ink)_90%,transparent)]">
              {t(home.hero.lead, locale)}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button href={localizedPath(locale, "/contact")} variant="gold">
                {t(ui.nav.startYourProject, locale)}
              </Button>
              <Button href={localizedPath(locale, "/work")} variant="ghost">
                {t(ui.nav.seeOurWork, locale)}
              </Button>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-20 max-w-5xl text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.98]">
              {t(home.hero.h1, locale)}
            </h1>
          </Reveal>
        </div>
      </section>

      {/* OUR WORK — static 3-card editorial image placeholder grid (implied gallery).
          No video embeds or badges; cards are pure visual placeholders. */}
      <Section>
        <Reveal>
          <Eyebrow>{t(home.showreel.eyebrow, locale)}</Eyebrow>
          <h2 className="mt-5 text-[clamp(2rem,4.5vw,3.25rem)]">{t(home.showreel.title, locale)}</h2>
          <p className="bs-lead mt-6 max-w-3xl text-[color:var(--color-muted)]">{t(home.showreel.lead, locale)}</p>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {home.showreel.cards.map((c, i) => (
            <Reveal as="div" key={i} delay={i * 80}>
              {/* Static image placeholder — 16:9 gold-gradient editorial card, no video/badges. */}
              <figure className="group overflow-hidden rounded-2xl border border-[color:var(--color-line)]">
                <div
                  className="relative aspect-video w-full"
                  style={{
                    background:
                      "radial-gradient(120% 100% at 50% 0%, rgba(201,162,39,0.14), transparent 60%), var(--color-elevated)",
                  }}
                >
                  {/* Title + tagline overlay */}
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[color:var(--color-bg)] to-transparent p-5 pt-16">
                    <h3 className="text-xl">{t(c.title, locale)}</h3>
                    <p className="mt-1 text-sm text-[color:var(--color-muted)]">{t(c.tagline, locale)}</p>
                  </figcaption>
                </div>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* WHAT WE DO */}
      <Section alt>
        <Reveal>
          <Eyebrow>{t(home.whatWeDo.eyebrow, locale)}</Eyebrow>
          <h2 className="mt-5 text-[clamp(2rem,4.5vw,3.25rem)]">{t(home.whatWeDo.h2, locale)}</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {home.whatWeDo.cards.map((c, i) => (
            <Reveal as="div" key={i} delay={i * 80} className="bs-card bs-card-hover">
              <h3 className="text-2xl">{t(c.title, locale)}</h3>
              <p className="mt-4 text-[color:var(--color-muted)]">{t(c.body, locale)}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-10">
          <Button href={localizedPath(locale, "/services")} variant="ghost">
            {t(ui.nav.allServices, locale)}
          </Button>
        </div>
      </Section>

      {/* WHERE WE WORK */}
      <Section>
        <div className="grid gap-10 md:grid-cols-[1fr_1fr] md:items-center">
          <Reveal>
            <Eyebrow>{t(home.whereWeWork.eyebrow, locale)}</Eyebrow>
            <h2 className="mt-5 text-[clamp(2rem,4.5vw,3.25rem)]">{t(home.whereWeWork.h2, locale)}</h2>
            <p className="bs-lead mt-6">{t(home.whereWeWork.lead, locale)}</p>
            <div className="mt-8">
              <Button href={localizedPath(locale, "/services")} variant="ghost">
                {t(ui.nav.allServices, locale)}
              </Button>
            </div>
          </Reveal>
          <Reveal delay={100} className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Al Ain"].map((c) => (
              <span
                key={c}
                className="rounded-lg border border-[color:var(--color-line)] bg-[color:var(--color-elevated)] px-4 py-3 text-center text-sm text-[color:var(--color-muted)]"
              >
                {c}
              </span>
            ))}
          </Reveal>
        </div>
      </Section>

      {/* MARQUEE */}
      <Marquee items={locale === "ar" ? [...home.marquee.ar] : [...home.marquee.en]} />

      {/* HOW WE WORK */}
      <Section alt>
        <Reveal>
          <Eyebrow>{t(home.howWeWork.eyebrow, locale)}</Eyebrow>
          <h2 className="mt-5 text-[clamp(2rem,4.5vw,3.25rem)]">{t(home.howWeWork.h2, locale)}</h2>
        </Reveal>
        <div className="mt-12 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
          {home.howWeWork.steps.map((s, i) => (
            <Reveal key={i} delay={i * 70}>
              <span className="bs-num">{s.n}</span>
              <h3 className="mt-4 text-xl">{t(s.title, locale)}</h3>
              <p className="mt-3 text-sm text-[color:var(--color-muted)]">{t(s.body, locale)}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* WHY US */}
      <Section>
        <Reveal>
          <Eyebrow>{t(home.whyUs.eyebrow, locale)}</Eyebrow>
          <h2 className="mt-5 text-[clamp(2rem,4.5vw,3.25rem)]">{t(home.whyUs.h2, locale)}</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {home.whyUs.cards.map((c, i) => (
            <Reveal key={i} delay={i * 70} className="bs-card">
              <h3 className="text-xl">{t(c.title, locale)}</h3>
              <p className="mt-4 text-sm text-[color:var(--color-muted)]">{t(c.body, locale)}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* INDUSTRIES */}
      <Section alt>
        <Reveal>
          <Eyebrow>{t(home.industries.eyebrow, locale)}</Eyebrow>
          <h2 className="mt-5 text-[clamp(2rem,4.5vw,3.25rem)]">{t(home.industries.h2, locale)}</h2>
        </Reveal>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {home.industries.items.map((it, i) => (
            <Reveal as="li" key={i} delay={i * 40} className="flex items-center gap-4 border-b border-[color:var(--color-line)] py-4">
              <span className="text-[color:var(--color-gold)]" aria-hidden="true">—</span>
              <span className="text-lg">{t(it, locale)}</span>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* SELECTED WORK */}
      <Section>
        <Reveal>
          <Eyebrow>{t(home.selectedWork.eyebrow, locale)}</Eyebrow>
          <h2 className="mt-5 text-[clamp(2rem,4.5vw,3.25rem)]">{t(home.selectedWork.h2, locale)}</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {caseStudies.map((cs, i) => (
            <Reveal as="div" key={cs.slug} delay={i * 80}>
              <Link href={localizedPath(locale, `/work/${cs.slug}`)} className="bs-card bs-card-hover block h-full">
                <span className="bs-eyebrow !text-[color:var(--color-muted)] before:!bg-[color:var(--color-muted)]">
                  {t(cs.categoryLabel, locale)}
                </span>
                <h3 className="mt-4 text-2xl">{t(cs.title, locale)}</h3>
                <p className="mt-4 text-sm text-[color:var(--color-muted)]">{t(cs.summary, locale)}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CLIENT / TRUST strip */}
      <Section alt>
        <Reveal className="text-center">
          <Eyebrow className="justify-center before:hidden">{t(home.clients.eyebrow, locale)}</Eyebrow>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {services.map((s) => (
              <div
                key={s.slug}
                className="flex h-16 items-center justify-center rounded-lg border border-[color:var(--color-line)] text-xs uppercase tracking-widest text-[color:var(--color-muted)]"
              >
                {t(s.short, locale)}
              </div>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-xl text-sm text-[color:var(--color-muted)]">{t(home.clients.note, locale)}</p>
        </Reveal>
      </Section>

      {/* FINAL CTA */}
      <CtaBand
        locale={locale}
        heading={t(home.finalCta.h2, locale)}
        waContext={locale === "ar" ? "زرت الصفحة الرئيسية." : "Saw your homepage."}
      />
    </>
  );
}
