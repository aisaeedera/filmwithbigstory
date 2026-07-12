import type { Metadata } from "next";
import { type Locale, t } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { legal, ui } from "@/data/copy";
import { SITE } from "@/lib/site";
import { Section, Eyebrow } from "@/components/primitives";
import Breadcrumbs from "@/components/Breadcrumbs";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta({ locale, title: t(legal.privacy.meta.title, locale), description: t(legal.privacy.meta.description, locale), path: "/privacy-policy" });
}

const sections = [
  {
    h: { en: "Who we are", ar: "من نحن" },
    p: {
      en: `Big Story is a film and video production studio based in Dubai, United Arab Emirates. You can reach us at ${SITE.email} or ${SITE.phone}. This policy explains how we handle personal data in line with UAE Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data (PDPL).`,
      ar: `بيك ستوري استوديو إنتاج أفلام وفيديو مقره دبي، الإمارات العربية المتحدة. يمكنك التواصل معنا عبر ${SITE.email} أو ${SITE.phone}. توضح هذه السياسة كيفية تعاملنا مع البيانات الشخصية بما يتوافق مع المرسوم بقانون اتحادي رقم 45 لسنة 2021 بشأن حماية البيانات الشخصية.`,
    },
  },
  {
    h: { en: "What we collect", ar: "ما نجمعه" },
    p: {
      en: "When you contact us — by form, WhatsApp, email or phone — we collect the details you provide: your name, contact information, company, and the project details you share. Our website uses privacy-friendly analytics that do not build advertising profiles or use third-party tracking cookies.",
      ar: "عند التواصل معنا — عبر النموذج أو واتساب أو البريد أو الهاتف — نجمع التفاصيل التي تقدمها: اسمك ومعلومات التواصل والشركة وتفاصيل المشروع التي تشاركها. يستخدم موقعنا تحليلات صديقة للخصوصية لا تبني ملفات إعلانية ولا تستخدم ملفات تتبع من أطراف ثالثة.",
    },
  },
  {
    h: { en: "How we use it", ar: "كيف نستخدمها" },
    p: {
      en: "We use your information only to respond to your enquiry, prepare a quote, deliver a project you have commissioned, and keep records required for accounting and legal compliance. We do not sell your data, and we do not share it except with trusted suppliers who help us deliver your project, under confidentiality.",
      ar: "نستخدم معلوماتك فقط للرد على استفسارك وإعداد عرض السعر وتنفيذ مشروع كلّفتنا به والاحتفاظ بالسجلات المطلوبة للمحاسبة والامتثال القانوني. لا نبيع بياناتك ولا نشاركها إلا مع موردين موثوقين يساعدوننا في تنفيذ مشروعك، بموجب السرية.",
    },
  },
  {
    h: { en: "Confidentiality & footage", ar: "السرية واللقطات" },
    p: {
      en: "We treat every brief, script and piece of footage as confidential and will sign your NDA on request. Footage and deliverables are used publicly only with your permission.",
      ar: "نتعامل مع كل ملخص ونص ولقطة كمعلومات سرية وسنوقّع اتفاقية عدم الإفصاح عند الطلب. تُستخدم اللقطات والمخرجات علنياً فقط بإذنك.",
    },
  },
  {
    h: { en: "Your rights", ar: "حقوقك" },
    p: {
      en: `Under the PDPL you may request access to, correction of, or deletion of your personal data, and you may object to certain processing. To exercise any right, email ${SITE.email}.`,
      ar: `بموجب قانون حماية البيانات الشخصية يمكنك طلب الوصول إلى بياناتك الشخصية أو تصحيحها أو حذفها، ويمكنك الاعتراض على بعض المعالجة. لممارسة أي حق، راسلنا على ${SITE.email}.`,
    },
  },
];

export default async function PrivacyPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return (
    <Section>
      <Breadcrumbs locale={locale} items={[{ name: t(ui.breadcrumb.home, locale), path: "/" }, { name: t(legal.privacy.h1, locale) }]} />
      <Eyebrow>{t(legal.updated, locale)}</Eyebrow>
      <h1 className="mt-6 text-[clamp(2.2rem,5vw,3.5rem)]">{t(legal.privacy.h1, locale)}</h1>
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
