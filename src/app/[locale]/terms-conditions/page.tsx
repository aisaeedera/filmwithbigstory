import type { Metadata } from "next";
import { type Locale, t } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { legal, ui } from "@/data/copy";
import { SITE } from "@/lib/site";
import { Section, Eyebrow } from "@/components/primitives";
import Breadcrumbs from "@/components/Breadcrumbs";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta({ locale, title: t(legal.terms.meta.title, locale), description: t(legal.terms.meta.description, locale), path: "/terms-conditions" });
}

const sections = [
  {
    h: { en: "About these terms", ar: "حول هذه الشروط" },
    p: {
      en: "These terms govern your use of the Big Story website and any enquiry you make through it. By using this site you accept these terms. Production services are governed by a separate written agreement issued per project.",
      ar: "تحكم هذه الشروط استخدامك لموقع بيك ستوري وأي استفسار تقدمه من خلاله. باستخدامك هذا الموقع فإنك تقبل هذه الشروط. تخضع خدمات الإنتاج لاتفاقية مكتوبة منفصلة تصدر لكل مشروع.",
    },
  },
  {
    h: { en: "Quotes & engagement", ar: "العروض والتعاقد" },
    p: {
      en: "Any figures we discuss before a signed proposal are estimates. Work begins once a written proposal or purchase order is agreed. Scope, deliverables, timelines and fees are defined in that project agreement.",
      ar: "أي أرقام نناقشها قبل عرض موقّع هي تقديرات. يبدأ العمل بمجرد الاتفاق على عرض مكتوب أو أمر شراء. يُحدَّد النطاق والمخرجات والجداول والرسوم في اتفاقية المشروع تلك.",
    },
  },
  {
    h: { en: "Intellectual property", ar: "الملكية الفكرية" },
    p: {
      en: "Ownership and usage rights of final deliverables transfer as set out in the project agreement, typically on final payment. Big Story retains the right to display completed work in its portfolio unless a confidentiality agreement states otherwise.",
      ar: "تنتقل ملكية المخرجات النهائية وحقوق استخدامها كما هو محدد في اتفاقية المشروع، عادة عند الدفع النهائي. تحتفظ بيك ستوري بحق عرض الأعمال المكتملة في معرض أعمالها ما لم تنص اتفاقية سرية على خلاف ذلك.",
    },
  },
  {
    h: { en: "Website content", ar: "محتوى الموقع" },
    p: {
      en: "The text, design and marks on this site belong to Big Story and may not be copied without permission. Links to other sites, including red.filmwithbigstory.com and partner sites, are provided for convenience; we are not responsible for their content.",
      ar: "النصوص والتصميم والعلامات على هذا الموقع ملك لبيك ستوري ولا يجوز نسخها دون إذن. الروابط إلى مواقع أخرى، بما في ذلك red.filmwithbigstory.com ومواقع الشركاء، مقدمة للتسهيل؛ ولسنا مسؤولين عن محتواها.",
    },
  },
  {
    h: { en: "Governing law", ar: "القانون الحاكم" },
    p: {
      en: `These terms are governed by the laws of the United Arab Emirates and the Emirate of Dubai. Questions? Email ${SITE.email}.`,
      ar: `تخضع هذه الشروط لقوانين الإمارات العربية المتحدة وإمارة دبي. أسئلة؟ راسلنا على ${SITE.email}.`,
    },
  },
];

export default async function TermsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return (
    <Section>
      <Breadcrumbs locale={locale} items={[{ name: t(ui.breadcrumb.home, locale), path: "/" }, { name: t(legal.terms.h1, locale) }]} />
      <Eyebrow>{t(legal.updated, locale)}</Eyebrow>
      <h1 className="mt-6 text-[clamp(2.2rem,5vw,3.5rem)]">{t(legal.terms.h1, locale)}</h1>
      <div className="bs-prose mt-10 max-w-3xl">
        {sections.map((s, i) => (
          <div key={i}>
            <h2>{t(s.h, locale)}</h2>
            <p>{t(s.p, locale)}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
