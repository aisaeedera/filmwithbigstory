import type { Metadata } from "next";
import { type Locale, localizedPath, t } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { cities } from "@/data/cities";
import { Section, Eyebrow } from "@/components/primitives";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import Breadcrumbs from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";

/* ------------------------------------------------------------------ *
 * /service-areas — informational travel-coverage page (NO service
 * listings, NO city×service cross-links).
 *
 * The previous version of this page cross-linked every city to every
 * service via /locations/{service}-{city}, producing 48 near-duplicate
 * pages. Those /locations/* pages are now retired. This page stays as a
 * plain noindex page that describes where we work, without becoming a
 * service listing. Users looking for services go to /services.
 * ------------------------------------------------------------------ */

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta({
    locale,
    title:
      locale === "ar"
        ? "أين نعمل | بيك ستوري"
        : "Where we film | Big Story",
    description:
      locale === "ar"
        ? "نصوّر عبر الإمارات — دبي وأبوظبي والشارقة وعجمان ورأس الخيمة والعين."
        : "We film on location across the UAE — Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah and Al Ain.",
    path: "/service-areas",
    noindex: true,
  });
}

export default async function ServiceAreasPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: t({ en: "Home", ar: "الرئيسية" }, locale), path: "/" },
          { name: t({ en: "Where we film", ar: "أين نعمل" }, locale), path: "/service-areas" },
        ])}
      />

      <Section>
        <Breadcrumbs
          locale={locale}
          items={[
            { name: t({ en: "Home", ar: "الرئيسية" }, locale), path: "/" },
            { name: t({ en: "Where we film", ar: "أين نعمل" }, locale) },
          ]}
        />
        <Reveal>
          <Eyebrow>{t({ en: "Where we film", ar: "أين نعمل" }, locale)}</Eyebrow>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.4rem,5.5vw,4rem)]">
            {locale === "ar"
              ? "نصوّر عبر الإمارات"
              : "We film across the UAE"}
          </h1>
          <p className="bs-lead mt-8 !max-w-2xl">
            {locale === "ar"
              ? "بيك ستوري فريق متنقل. ننقل الطاقم والمعدات إلى أي موقع في الإمارات — من استوديوهات دبي وقاعات أبوظبي إلى جبال رأس الخيمة واحة العين."
              : "Big Story is a travel-ready crew. We bring the team and kit to any location across the UAE — from Dubai studios and Abu Dhabi boardrooms to Ras Al Khaimah mountains and the Al Ain oasis."}
          </p>
          <p className="bs-lead mt-4 !max-w-2xl">
            {locale === "ar"
              ? "خدمات الإنتاج الكاملة تجدها في صفحة الخدمات."
              : "See the full list of production services on the services page."}
          </p>
        </Reveal>
      </Section>

      <Section alt>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cities.map((city, i) => (
            <Reveal key={city.slug} delay={(i % 3) * 70} className="bs-card">
              <h2 className="text-2xl">{t(city.name, locale)}</h2>
              <p className="mt-2 text-sm text-[color:var(--color-muted)]">
                {t(city.note, locale)}
              </p>
              <p className="mt-5 text-sm">{t(city.groundBase, locale)}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.12em] text-[color:var(--color-muted)]">
                {city.areas.join(" · ")}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal>
          <Eyebrow>{locale === "ar" ? "خدماتنا" : "Our services"}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">
            {locale === "ar"
              ? "تصفح كل خدمات الإنتاج في صفحة واحدة"
              : "Browse every production service on a single page"}
          </h2>
          <div className="mt-8">
            <a
              href={localizedPath(locale, "/services")}
              className="bs-btn bs-btn-gold"
            >
              {t({ en: "See all services", ar: "كل الخدمات" }, locale)}
            </a>
          </div>
        </Reveal>
      </Section>

      <CtaBand
        locale={locale}
        heading={t({ en: "Tell us where you're filming.", ar: "أخبرنا أين تصوّر." }, locale)}
        waContext={locale === "ar" ? "بخصوص التصوير في الإمارات." : "Filming in the UAE."}
      />
    </>
  );
}