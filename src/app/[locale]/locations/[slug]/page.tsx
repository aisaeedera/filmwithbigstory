import type { Metadata } from "next";
import Link from "next/link";
import { type Locale, locales, localizedPath, t } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { servicesIndex as si, ui } from "@/data/copy";
import { Section, Eyebrow } from "@/components/primitives";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import Breadcrumbs from "@/components/Breadcrumbs";

/* ------------------------------------------------------------------ *
 * /locations/{slug} is RETIRED.
 *
 * The 48 generated geo-combination pages (8 services × 6 cities) were
 * duplicate content (the same service rendered for each city with only
 * city-specific filler swapped in). They created a duplicate-content
 * footprint and confused customers.
 *
 * Big Story travels across the UAE — production services are not city-
 * specific. We collapsed them into a single /services listing.
 *
 * This route is kept as a noindex stub so:
 *   - inbound links 200 instead of 404
 *   - users land on a helpful "go to /services" prompt
 *   - search engines get a strong noindex signal to drop the URL
 * ------------------------------------------------------------------ */

export function generateStaticParams() {
  // Pre-render a single canonical placeholder per locale. We use
  // `dynamicParams = false` below so EVERY /locations/* request 404s
  // instead of triggering a server render — that's the cleanest
  // retirement signal to Google.
  return locales.map((locale) => ({ locale, slug: "_" }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  // noindex every URL hit on this route — Google should drop the whole
  // /locations/* tree from its index.
  void slug;
  return pageMeta({
    locale,
    title: locale === "ar" ? "خدمات الإنتاج في الإمارات | بيك ستوري" : "Production services across the UAE | Big Story",
    description:
      locale === "ar"
        ? "خدمات الإنتاج لم تعد مقسمة حسب المدينة. اعرض كل الخدمات في صفحة واحدة."
        : "Our production services are no longer split by city. See every service on a single page.",
    path: "/services",
    noindex: true,
  });
}

export default async function LocationPage({ params: _params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  // Resolve locale so we can localize the prompt.
  const { locale } = await _params;

  return (
    <>
      <Section>
        <Breadcrumbs
          locale={locale}
          items={[
            { name: t(ui.breadcrumb.home, locale), path: "/" },
            { name: t(ui.nav.services, locale), path: "/services" },
            { name: locale === "ar" ? "صفحة منتهية" : "Retired page" },
          ]}
        />
        <Reveal>
          <Eyebrow>{locale === "ar" ? "صفحة منتهية" : "Page retired"}</Eyebrow>
          <h1 className="mt-6 max-w-3xl text-[clamp(2.2rem,5vw,3.5rem)]">
            {locale === "ar"
              ? "خدماتنا لم تعد مقسمة حسب المدينة"
              : "Our services are no longer split by city"}
          </h1>
          <p className="bs-lead mt-8 !max-w-2xl">
            {locale === "ar"
              ? "ننتقل في مواقع التصوير عبر الإمارات، لذا فإن تقسيم خدماتنا حسب المدينة كان يخلق محتوى مكرراً ويشتت العملاء. كل خدمات الإنتاج لدينا أصبحت في صفحة واحدة."
              : "We travel on location across the UAE, so splitting our services by city was creating duplicate content and confusing customers. Every production service now lives on a single page."}
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href={localizedPath(locale, "/services")} className="bs-btn bs-btn-gold">
              {t(ui.nav.allServices, locale)}
            </Link>
            <Link href={localizedPath(locale, "/contact")} className="bs-btn bs-btn-ghost">
              {t(ui.nav.startYourProject, locale)}
            </Link>
          </div>
        </Reveal>
      </Section>

      <CtaBand
        locale={locale}
        heading={t(si.finalH2, locale)}
        waContext={locale === "ar" ? "زرت رابط موقع قديم." : "Hit a retired location URL."}
      />
    </>
  );
}