import type { Metadata } from "next";
import Link from "next/link";
import { type Locale, localizedPath, t } from "@/lib/i18n";
import { pageMeta } from "@/lib/meta";
import { ui } from "@/data/copy";
import { SITE, waLink } from "@/lib/site";
import { Section, Eyebrow, Button } from "@/components/primitives";
import Reveal from "@/components/Reveal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbSchema, serviceSchema, faqSchema } from "@/components/JsonLd";
import { webServices } from "@/data/web-services";

/* ---- Page copy (English primary, Arabic mirrors) ---- */
const copy = {
  hero: {
    eyebrow: { en: "Web Division", ar: "قسم الويب" },
    h1: { en: "Website Design and Development in Dubai", ar: "تصميم وتطوير المواقع في دبي" },
    lead: {
      en: "We design premium websites for Dubai businesses. Approve a free homepage concept, review the live preview, and buy only if you are happy. No upfront payment.",
      ar: "نصمم مواقع إلكترونية متميزة للشركات في دبي. وافق على مفهوم مجاني للصفحة الرئيسية، وراجع المعاينة المباشرة، واشترِ فقط إذا كنت راضياً. دون دفع مسبق.",
    },
    ctaPrimary: { en: "Approve a homepage concept", ar: "وافق على مفهوم الصفحة الرئيسية" },
    ctaSecondary: { en: "See our work", ar: "شاهد أعمالنا" },
  },
  offer: {
    eyebrow: { en: "How the concept works", ar: "كيف يعمل المفهوم" },
    h2: { en: "You approve. We design. You decide.", ar: "أنت توافق. نحن نصمم. أنت تقرر." },
    cards: [
      {
        n: "01",
        title: { en: "You approve", ar: "أنت توافق" },
        body: {
          en: "Give written permission for Big Story to design a homepage concept. No payment required.",
          ar: "امنح إذناً كتابياً لبيك ستوري لتصميم مفهوم الصفحة الرئيسية. دون أي دفع.",
        },
      },
      {
        n: "02",
        title: { en: "We design", ar: "نحن نصمم" },
        body: {
          en: "We research your business, competitors, and buyers. Then we design the homepage directly in code.",
          ar: "نبحث في عملك ومنافسيك وعملائك. ثم نصمم الصفحة الرئيسية مباشرة في الكود.",
        },
      },
      {
        n: "03",
        title: { en: "You decide", ar: "أنت تقرر" },
        body: {
          en: "Review a live preview. Buy the website only if you are happy. No obligation.",
          ar: "راجع المعاينة المباشرة. اشترِ الموقع فقط إذا كنت راضياً. دون التزام.",
        },
      },
    ],
  },
  how: {
    eyebrow: { en: "Our process", ar: "عمليتنا" },
    h2: { en: "How it works", ar: "كيف يعمل" },
    steps: [
      { en: "You approve a free homepage concept, with no payment.", ar: "توافق على مفهوم مجاني للصفحة الرئيسية، دون أي دفع." },
      { en: "We research your business, your competitors, and your buyers.", ar: "نبحث في عملك ومنافسيك وعملائك." },
      { en: "We design three homepage directions directly in code.", ar: "نصمم ثلاثة اتجاهات للصفحة الرئيسية مباشرة في الكود." },
      { en: "You review the live preview and pick the one you want.", ar: "تراجع المعاينة المباشرة وتختار الاتجاه الذي تريده." },
      { en: "We develop the full site with your feedback.", ar: "نطور الموقع الكامل مع ملاحظاتك." },
      { en: "We run quality checks and launch on your domain.", ar: "نجري فحوصات الجودة ونطلق الموقع على نطاقك." },
    ],
  },
  services: {
    eyebrow: { en: "What we deliver", ar: "ما نقدمه" },
    h2: { en: "Services", ar: "الخدمات" },
    lead: {
      en: "Each service below has its own page, written for Dubai search and Dubai buyers. Explore any of them to see how we approach it, what you get, and the questions buyers ask.",
      ar: "لكل خدمة أدناه صفحتها الخاصة، مكتوبة لبحث دبي ومشتري دبي. استكشف أي منها لترى كيف نتعامل معها، وما تحصل عليه، والأسئلة التي يطرحها المشترون.",
    },
    learnMore: { en: "Learn more", ar: "اعرف المزيد" },
  },
  industries: {
    eyebrow: { en: "Who we build for", ar: "لمن نبني" },
    h2: { en: "Industries we serve", ar: "الصناعات التي نخدمها" },
    items: [
      {
        title: { en: "Dental clinics", ar: "عيادات الأسنان" },
        body: { en: "Websites that turn search visitors into booked appointments.", ar: "مواقع تحول زوار البحث إلى مواعيد محجوزة." },
      },
      {
        title: { en: "Real estate advisors", ar: "مستشارو العقارات" },
        body: { en: "Listings and lead capture built for fast decisions.", ar: "إعلانات والتقاط عملاء محتملين مصممة لقرارات سريعة." },
      },
      {
        title: { en: "Smart home and automation", ar: "المنزل الذكي والأتمتة" },
        body: { en: "Premium product showcases that close high-ticket buyers.", ar: "عرض منتجات متميز يغلق المشترين ذوي التذاكر العالية." },
      },
      {
        title: { en: "UAE SMEs and local services", ar: "الشركات الصغيرة والمتوسطة والخدمات المحلية" },
        body: { en: "Fast, mobile-first sites that win Google Maps and local search.", ar: "مواقع سريعة للجوال أولاً تربح خرائط جوجل والبحث المحلي." },
      },
    ],
  },
  faq: {
    eyebrow: { en: "Common questions", ar: "أسئلة شائعة" },
    h2: { en: "Frequently asked questions", ar: "الأسئلة المتكررة" },
    items: [
      {
        q: { en: "What does approval mean?", ar: "ماذا تعني الموافقة؟" },
        a: { en: "Written permission to create a homepage concept. Not a purchase commitment.", ar: "إذن كتابي لإنشاء مفهوم الصفحة الرئيسية. ليس التزاماً بالشراء." },
      },
      {
        q: { en: "Do I pay anything upfront?", ar: "هل أدفع أي شيء مقدماً؟" },
        a: { en: "No. The homepage concept is free. You buy the completed website only if you are happy with it.", ar: "لا. مفهوم الصفحة الرئيسية مجاني. تشتري الموقع المكتمل فقط إذا كنت راضياً عنه." },
      },
      {
        q: { en: "What if I do not like the concept?", ar: "ماذا لو لم يعجبني المفهوم؟" },
        a: { en: "There is no obligation. You walk away with no cost.", ar: "لا يوجد التزام. تنصرف دون أي تكلفة." },
      },
      {
        q: { en: "Can Big Story show the work in its portfolio?", ar: "هل يمكن لبيك ستوري عرض العمل في معرضه؟" },
        a: { en: "Only with your explicit permission. We ask separately.", ar: "فقط بإذنك الصريح. نسأل بشكل منفصل." },
      },
      {
        q: { en: "What happens after I approve the concept?", ar: "ماذا يحدث بعد أن أوافق على المفهوم؟" },
        a: { en: "We develop the remaining pages, run full QA, and deploy to your domain after agreement.", ar: "نطور الصفحات المتبقية، ونقوم بضمان جودة كامل، وننشر على نطاقك بعد الاتفاق." },
      },
      {
        q: { en: "What technologies do you use?", ar: "ما التقنيات التي تستخدمونها؟" },
        a: { en: "React, Next.js, Tailwind CSS, and Vercel deployment.", ar: "React وNext.js وTailwind CSS ونشر Vercel." },
      },
    ],
  },
  cta: {
    h2: { en: "Ready to see your new homepage?", ar: "هل أنت مستعد لرؤية صفحتك الرئيسية الجديدة؟" },
    lead: {
      en: "Approve a free homepage concept. Review the live preview. Buy only if you are happy.",
      ar: "وافق على مفهوم مجاني للصفحة الرئيسية. راجع المعاينة المباشرة. اشترِ فقط إذا كنت راضياً.",
    },
    btnPrimary: { en: "Start the concept", ar: "ابدأ المفهوم" },
    btnEmail: { en: "Email us", ar: "راسلنا" },
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta({
    locale,
    title: locale === "ar"
      ? "تصميم وتطوير المواقع في دبي | بيك ستوري"
      : "Website Design and Development in Dubai | Big Story",
    description: t(copy.hero.lead, locale),
    path: "/website-services",
  });
}

export default async function WebsiteServicesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const faqItems = copy.faq.items.map((it) => ({ q: t(it.q, locale), a: t(it.a, locale) }));

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(locale, [
          { name: t(ui.breadcrumb.home, locale), path: "/" },
          { name: t(copy.hero.h1, locale), path: "/website-services" },
        ])}
      />
      <JsonLd
        data={serviceSchema({
          locale,
          name: "Website Design and Development",
          description: t(copy.hero.lead, locale),
          path: "/website-services",
          areaServed: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Al Ain"],
        })}
      />
      <JsonLd data={faqSchema(faqItems)} />

      {/* HERO */}
      <Section>
        <Breadcrumbs
          locale={locale}
          items={[
            { name: t(ui.breadcrumb.home, locale), path: "/" },
            { name: t(copy.hero.h1, locale) },
          ]}
        />
        <Reveal>
          <Eyebrow>{t(copy.hero.eyebrow, locale)}</Eyebrow>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.5rem,6vw,4.5rem)]">{t(copy.hero.h1, locale)}</h1>
          <p className="bs-lead mt-8 !max-w-2xl">{t(copy.hero.lead, locale)}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button href={waLink("I would like to approve a free homepage concept for my website")} variant="gold" external>
              {t(copy.hero.ctaPrimary, locale)}
            </Button>
            <Button href={localizedPath(locale, "/work")} variant="ghost">
              {t(copy.hero.ctaSecondary, locale)}
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* OFFER STRIP */}
      <Section alt>
        <Reveal>
          <Eyebrow>{t(copy.offer.eyebrow, locale)}</Eyebrow>
          <h2 className="mt-5 max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)]">{t(copy.offer.h2, locale)}</h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {copy.offer.cards.map((card, i) => (
            <Reveal key={i} delay={i * 80} className="bs-card">
              <span className="bs-num">{card.n}</span>
              <h3 className="mt-5 text-xl">{t(card.title, locale)}</h3>
              <p className="mt-4 text-sm leading-relaxed text-[color:var(--color-ink)]">{t(card.body, locale)}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* HOW IT WORKS */}
      <Section>
        <Reveal>
          <Eyebrow>{t(copy.how.eyebrow, locale)}</Eyebrow>
          <h2 className="mt-5 text-[clamp(2rem,4.5vw,3.25rem)]">{t(copy.how.h2, locale)}</h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {copy.how.steps.map((step, i) => (
            <Reveal key={i} delay={(i % 2) * 60} className="bs-card flex items-start gap-5">
              <span className="bs-num shrink-0">{String(i + 1).padStart(2, "0")}</span>
              <p className="text-sm leading-relaxed text-[color:var(--color-ink)] pt-1">{t(step, locale)}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* SERVICES GRID */}
      <Section alt>
        <Reveal>
          <Eyebrow>{t(copy.services.eyebrow, locale)}</Eyebrow>
          <h2 className="mt-5 text-[clamp(2rem,4.5vw,3.25rem)]">{t(copy.services.h2, locale)}</h2>
          <p className="bs-lead mt-6 !max-w-2xl">{t(copy.services.lead, locale)}</p>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {webServices.map((svc, i) => (
            <Reveal as="div" key={svc.slug} delay={(i % 4) * 50}>
              <Link
                href={localizedPath(locale, `/website-services/${svc.slug}`)}
                className="bs-card bs-card-hover flex h-full flex-col"
              >
                <span className="bs-num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-lg leading-snug">{t(svc.breadcrumb, locale)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-muted)]">
                  {t(svc.meta.description, locale)}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm text-[color:var(--color-gold)]">
                  {t(copy.services.learnMore, locale)}
                  <span aria-hidden="true">→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* INDUSTRIES */}
      <Section>
        <Reveal>
          <Eyebrow>{t(copy.industries.eyebrow, locale)}</Eyebrow>
          <h2 className="mt-5 text-[clamp(2rem,4.5vw,3.25rem)]">{t(copy.industries.h2, locale)}</h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {copy.industries.items.map((item, i) => (
            <Reveal key={i} delay={(i % 2) * 60} className="bs-card">
              <h3 className="text-lg">{t(item.title, locale)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-muted)]">{t(item.body, locale)}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section alt id="faq">
        <Reveal>
          <Eyebrow>{t(copy.faq.eyebrow, locale)}</Eyebrow>
          <h2 className="mt-5 text-[clamp(2rem,4.5vw,3.25rem)]">{t(copy.faq.h2, locale)}</h2>
        </Reveal>
        <div className="mt-10 max-w-3xl space-y-3">
          {copy.faq.items.map((item, i) => (
            <Reveal key={i} delay={i * 40}>
              <details className="bs-card group">
                <summary className="cursor-pointer list-none font-medium text-[color:var(--color-ink)] flex items-center justify-between gap-4">
                  <span>{t(item.q, locale)}</span>
                  <span className="text-[color:var(--color-gold)] transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-[color:var(--color-muted)]">{t(item.a, locale)}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* FINAL CTA */}
      <Section className="text-center">
        <Reveal className="mx-auto max-w-3xl">
          <h2 className="text-[clamp(2.25rem,5vw,3.75rem)]">{t(copy.cta.h2, locale)}</h2>
          <p className="bs-lead mx-auto mt-6">{t(copy.cta.lead, locale)}</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Button href={waLink("I want to start a free homepage concept")} variant="gold" external>
              {t(copy.cta.btnPrimary, locale)}
            </Button>
            <Button href={`mailto:${SITE.email}`} variant="ghost">
              {t(copy.cta.btnEmail, locale)}
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
