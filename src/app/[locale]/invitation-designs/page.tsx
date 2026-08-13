import type { Metadata } from "next";
import { type Locale, localizedPath, t } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { SITE } from "@/lib/site";
import { ui } from "@/data/copy";
import { invitationDemos } from "@/data/invitation-designs";
import { invitationUi, HUB_SLUG } from "@/data/invitations";
import { Section, Eyebrow, Button } from "@/components/primitives";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBand from "@/components/CtaBand";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";
import InvitationGallery from "@/components/invitations/InvitationGallery";

const PATH = "/invitation-designs";

const COPY = {
  meta: {
    title: {
      en: "Invitation Design Gallery | Arabic Digital Invitation Demos | Big Story",
      ar: "معرض تصاميم الدعوات | نماذج دعوات إلكترونية عربية | بيك ستوري",
    },
    description: {
      en: "Browse 64 original Big Story digital-invitation demo samples across 8 styles and 8 occasions. Every design is a labelled نموذج — filter by occasion and format.",
      ar: "تصفّح 64 نموذجاً تجريبياً أصلياً لدعوات إلكترونية من بيك ستوري بثمانية أساليب وثماني مناسبات. كل تصميم موسوم بكلمة نموذج — رتّب حسب المناسبة والصيغة.",
    },
  },
  eyebrow: { en: "Demo gallery", ar: "معرض النماذج" },
  h1: { en: "Invitation design gallery", ar: "معرض تصاميم الدعوات" },
  lead: {
    en: "Every card here is an original Big Story demo, clearly labelled نموذج. They show our eight style families across every occasion. Nothing here is a finished client project — when you order, we swap in your names, date, venue, wording, language, colours and motion.",
    ar: "كل بطاقة هنا نموذج أصلي من بيك ستوري، موسوم بوضوح بكلمة نموذج. تعرض أساليبنا الثمانية عبر كل مناسبة. لا شيء هنا مشروع عميل مكتمل — وعند الطلب نستبدل الأسماء والتاريخ والمكان والعبارة واللغة والألوان والحركة.",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta({ locale, title: t(COPY.meta.title, locale), description: t(COPY.meta.description, locale), path: PATH });
}

export default async function InvitationGalleryPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t(COPY.h1, locale),
    description: t(COPY.meta.description, locale),
    url: `${SITE.domain}${localizedPath(locale, PATH)}`,
    inLanguage: locale === "ar" ? "ar-AE" : "en-AE",
    isPartOf: { "@id": `${SITE.domain}/#website` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: invitationDemos.length,
      itemListElement: invitationDemos.map((d, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: locale === "ar" ? d.demoLabelAr : d.demoLabelEn,
        url: `${SITE.domain}${localizedPath(locale, `/invitation-designs/${d.slug}`)}`,
      })),
    },
  };

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(locale, [
            { name: t(ui.breadcrumb.home, locale), path: "/" },
            { name: t(invitationUi.hubAnchor, locale), path: `/services/${HUB_SLUG}` },
            { name: t(COPY.eyebrow, locale), path: PATH },
          ]),
          collectionSchema,
        ]}
      />

      <Section>
        <Breadcrumbs
          locale={locale}
          items={[
            { name: t(ui.breadcrumb.home, locale), path: "/" },
            { name: t(invitationUi.hubAnchor, locale), path: `/services/${HUB_SLUG}` },
            { name: t(COPY.eyebrow, locale) },
          ]}
        />
        <Reveal>
          <Eyebrow>{t(COPY.eyebrow, locale)}</Eyebrow>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.5rem,6vw,4.5rem)]">{t(COPY.h1, locale)}</h1>
          <p className="bs-lead mt-8 !max-w-2xl">{t(COPY.lead, locale)}</p>
          <div className="mt-9">
            <Button href={localizedPath(locale, `/services/${HUB_SLUG}`)} variant="ghost">
              {t(invitationUi.hubAnchor, locale)} →
            </Button>
          </div>
        </Reveal>
      </Section>

      <Section alt>
        <InvitationGallery locale={locale} />
      </Section>

      <CtaBand
        locale={locale}
        heading={locale === "ar" ? "وجدتم أسلوباً يعجبكم؟" : "Found a style you like?"}
        waContext="Re: Invitation design gallery"
      />
    </>
  );
}
