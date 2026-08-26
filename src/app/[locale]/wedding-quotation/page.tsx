import type { Metadata } from "next";
import { type Locale } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { Section, Eyebrow } from "@/components/primitives";
import Breadcrumbs from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbSchema, serviceSchema } from "@/components/JsonLd";
import WeddingQuotationFlow from "@/components/wedding-quotation/WeddingQuotationFlow";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    ...pageMeta({
    locale,
    title: isAr ? "عرض أسعار الزفاف | بيك ستوري" : "Wedding quotation | Big Story",
    description: isAr ? "أنشئ نطاق زفافك للمراجعة لدى بيك ستوري." : "Build your wedding scope for Big Story review.",
    path: "/wedding-quotation",
      noindex: true,
    }),
    robots: { index: false, follow: false },
  };
}

export default async function WeddingQuotationPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const path = "/wedding-quotation";
  return (
    <>
      <JsonLd data={[
        breadcrumbSchema(locale, [
          { name: isAr ? "الرئيسية" : "Home", path: "/" },
          { name: isAr ? "عرض الزفاف" : "Wedding quotation", path },
        ]),
        serviceSchema({
          locale,
          name: isAr ? "عرض أسعار الزفاف" : "Wedding quotation",
          description: isAr ? "نطاق زفاف للمراجعة لدى بيك ستوري." : "A wedding scope for Big Story review.",
          path,
          areaServed: ["United Arab Emirates"],
        }),
      ]} />
      <Section>
        <Breadcrumbs locale={locale} items={[{ name: isAr ? "الرئيسية" : "Home", path: "/" }, { name: isAr ? "عرض الزفاف" : "Wedding quotation" }]} />
        <Eyebrow>{isAr ? "عرض الزفاف" : "Wedding quotation"}</Eyebrow>
        <h1 className="mt-5 max-w-4xl text-[clamp(2.4rem,5.5vw,4rem)] leading-[1.05]">{isAr ? "أنشئ نطاق زفافك للمراجعة" : "Build your wedding scope for review"}</h1>
        <p className="bs-lead mt-6 max-w-3xl">{isAr ? "تجربة داخلية محكومة: نراجع التوفر والطاقم والموقع والسعر قبل أي دفع أو حجز." : "A controlled internal experience: Big Story reviews availability, crew, venue and pricing before any payment or booking."}</p>
        <div className="mt-10">
          <WeddingQuotationFlow locale={locale} />
        </div>
      </Section>
    </>
  );
}
