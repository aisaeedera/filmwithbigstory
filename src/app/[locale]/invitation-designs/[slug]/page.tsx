import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { type Locale, locales, localizedPath, t } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { ui } from "@/data/copy";
import {
  getDemo,
  getDemoById,
  invitationDemoSlugs,
  getCategory,
  formatLabels,
  deliverableLabels,
} from "@/data/invitation-designs";
import { invitationUi, getInvitationPage, HUB_SLUG, GALLERY_PATH } from "@/data/invitations";
import { Section, Eyebrow, Button } from "@/components/primitives";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBand from "@/components/CtaBand";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";
import InvitationPoster from "@/components/invitations/InvitationPoster";
import InvitationCard from "@/components/invitations/InvitationCard";

export function generateStaticParams() {
  return locales.flatMap((locale) => invitationDemoSlugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const demo = getDemo(slug);
  if (!demo) return {};
  const title =
    locale === "ar"
      ? `${demo.demoLabelAr} | نموذج بيك ستوري`
      : `${demo.demoLabelEn} | Big Story demo`;
  return pageMeta({
    locale,
    title,
    description: locale === "ar" ? demo.altAr : demo.altEn,
    path: `/invitation-designs/${slug}`,
    // Preview/share route: noindex,follow at launch (architecture §3).
    noindex: !demo.indexable,
  });
}

export default async function InvitationDemoPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const demo = getDemo(slug);
  if (!demo) notFound();

  const category = getCategory(demo.categorySlug);
  const servicePage = category ? getInvitationPage(category.serviceSlug) : undefined;
  const related = demo.relatedDemoIds
    .map((id) => getDemoById(id))
    .filter((d): d is NonNullable<typeof d> => Boolean(d));

  const spec: { label: { en: string; ar: string }; value: string }[] = [
    { label: { en: "Occasion", ar: "المناسبة" }, value: locale === "ar" ? demo.categoryNameAr : demo.categoryNameEn },
    { label: { en: "Style", ar: "الأسلوب" }, value: locale === "ar" ? demo.styleAr : demo.styleEn },
    { label: { en: "Palette", ar: "لوحة الألوان" }, value: demo.paletteAr },
    { label: { en: "Format", ar: "الصيغة" }, value: t(formatLabels[demo.format], locale) },
    { label: { en: "Deliverable", ar: "المخرجات" }, value: t(deliverableLabels[demo.format], locale) },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: t(ui.breadcrumb.home, locale), path: "/" },
          { name: t(invitationUi.hubAnchor, locale), path: `/services/${HUB_SLUG}` },
          { name: t({ en: "Demo gallery", ar: "معرض النماذج" }, locale), path: GALLERY_PATH },
          { name: demo.demoNameAr, path: `/invitation-designs/${slug}` },
        ])}
      />

      <Section>
        <Breadcrumbs
          locale={locale}
          items={[
            { name: t(ui.breadcrumb.home, locale), path: "/" },
            { name: t(invitationUi.hubAnchor, locale), path: `/services/${HUB_SLUG}` },
            { name: t({ en: "Demo gallery", ar: "معرض النماذج" }, locale), path: GALLERY_PATH },
            { name: demo.demoNameAr },
          ]}
        />

        <div className="mt-6 grid gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-start">
          {/* Poster */}
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl border border-[color:var(--color-line)]">
              <InvitationPoster demo={demo} locale={locale} />
              <span
                className="absolute start-4 top-4 rounded-full bg-black/70 px-3 py-1 text-sm font-medium text-white backdrop-blur"
                style={{ fontFamily: "var(--font-arabic)" }}
              >
                نموذج
              </span>
            </div>
          </Reveal>

          {/* Detail */}
          <Reveal delay={90}>
            <Eyebrow>{locale === "ar" ? demo.categoryNameAr : demo.categoryNameEn}</Eyebrow>
            <h1 className="mt-4 text-[clamp(2rem,4.5vw,3.25rem)]" style={{ fontFamily: "var(--font-arabic-display)" }}>
              {demo.demoNameAr}
            </h1>
            <p className="mt-3 text-sm text-[color:var(--color-muted)]">
              {locale === "ar" ? demo.demoLabelAr : demo.demoLabelEn}
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4">
              {spec.map((s, i) => (
                <div key={i}>
                  <dt className="text-xs uppercase tracking-wider text-[color:var(--color-muted)]">
                    {t(s.label, locale)}
                  </dt>
                  <dd className="mt-1 text-base text-[color:var(--color-ink)]">{s.value}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-8 text-base leading-relaxed text-[color:var(--color-ink)]">
              {locale === "ar" ? demo.uniqueDesignNotesAr : demo.uniqueDesignNotesEn}
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              {servicePage ? (
                <Button href={localizedPath(locale, demo.servicePath)} variant="gold">
                  {t(invitationUi.viewService, locale)} — {t(servicePage.breadcrumb, locale)}
                </Button>
              ) : null}
              <Button href={localizedPath(locale, GALLERY_PATH)} variant="ghost">
                {t(invitationUi.galleryAnchor, locale)}
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* RELATED DEMOS (same style family) */}
      {related.length > 0 ? (
        <Section alt>
          <Reveal>
            <Eyebrow>{locale === "ar" ? "بنفس الأسلوب" : "Same style family"}</Eyebrow>
          </Reveal>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
            {related.map((d) => (
              <InvitationCard key={d.id} demo={d} locale={locale} />
            ))}
          </div>
        </Section>
      ) : null}

      <CtaBand
        locale={locale}
        heading={locale === "ar" ? "أعجبكم هذا الأسلوب؟" : "Like this style?"}
        waContext={`Re: demo ${demo.slug}`}
      />
    </>
  );
}
