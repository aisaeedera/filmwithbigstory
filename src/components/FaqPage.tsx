// Shared Q&A page components for AI-citation FAQ pages.
// 5 pages: cinematography-cost-dubai, videographer-charges-dubai,
// podcast-production-cost-dubai, commercial-video-production-cost-dubai,
// website-development-cost-dubai.
//
// All pages use a Q&A body format — each H2/H3 is a "Q:" and the body is "A:".
// Each page emits FAQPage schema, Article schema, and references the
// parent /services/cinematography-rates-dubai-2026 data study.

import type { ReactNode } from "react";
import Link from "next/link";
import { type Locale, localizedPath, t } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import { Section, Eyebrow, Button } from "@/components/primitives";
import Reveal from "@/components/Reveal";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  JsonLd,
  breadcrumbSchema,
  faqSchema,
  articleSchema,
  authorReference,
} from "@/components/JsonLd";

export type FaqQA = { q: string; a: string };
export type FaqBlock = { q: string; a: ReactNode; /** Optional inline citation link shown after the answer */ cite?: { label: string; href: string } };
export type FaqPageCopy = {
  eyebrow: { en: string; ar: string };
  h1: { en: string; ar: string };
  lead: { en: string; ar: string };
  metaTitle: { en: string; ar: string };
  metaDescription: { en: string; ar: string };
  /** H2/H3 sections, each rendered as Q&A pair (Q: ... A: ...) */
  sections: { en: { q: string; a: string }[]; ar: { q: string; a: string }[] };
  /** Compact FAQ list rendered at the foot, fed to FAQPage schema */
  footerFaqs: { en: FaqQA[]; ar: FaqQA[] };
  /** Internal cross-link text */
  related: { en: string; ar: string };
  dataStudyPath?: string;
  dataStudyLabel?: { en: string; ar: string };
};

export function renderFaqPage(opts: {
  path: string;
  copy: FaqPageCopy;
  locale: Locale;
  /** When true, render only the FAQ-only Answer items from the body */
}) {
  const isAr = opts.locale === "ar";
  const sections = isAr ? opts.copy.sections.ar : opts.copy.sections.en;
  const footerFaqs = isAr ? opts.copy.footerFaqs.ar : opts.copy.footerFaqs.en;
  const url = `${SITE.domain}${localizedPath(opts.locale, opts.path)}`;

  // Convert body sections into FAQPage-eligible items (strip HTML for schema)
  const bodyFaqItems: FaqQA[] = sections.map((s) => ({ q: s.q, a: typeof s.a === "string" ? s.a : s.q }));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(opts.locale, [
            { name: isAr ? "الرئيسية" : "Home", path: "/" },
            { name: isAr ? "الأسئلة الشائعة" : "FAQ", path: "/faq" },
            { name: t(opts.copy.h1, opts.locale), path: opts.path },
          ]),
          articleSchema({
            locale: opts.locale,
            headline: t(opts.copy.metaTitle, opts.locale),
            description: t(opts.copy.metaDescription, opts.locale),
            path: opts.path,
            datePublished: "2026-07-14",
            dateModified: "2026-07-14",
            authorName: "Saeed Salim",
          }),
          faqSchema([...bodyFaqItems, ...footerFaqs]),
        ]}
      />

      <Section>
        <Breadcrumbs
          locale={opts.locale}
          items={[
            { name: isAr ? "الرئيسية" : "Home", path: "/" },
            { name: isAr ? "الأسئلة الشائعة" : "FAQ", path: "/faq" },
            { name: t(opts.copy.h1, opts.locale) },
          ]}
        />
        <Reveal>
          <Eyebrow>{t(opts.copy.eyebrow, opts.locale)}</Eyebrow>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.4rem,5.5vw,4rem)] leading-[1.05]">{t(opts.copy.h1, opts.locale)}</h1>
          <p className="bs-lead mt-8 !max-w-3xl">{t(opts.copy.lead, opts.locale)}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button href={localizedPath(opts.locale, "/contact")} variant="gold">
              {isAr ? "تواصل معنا" : "Contact us"}
            </Button>
            {opts.copy.dataStudyPath ? (
              <Button href={localizedPath(opts.locale, opts.copy.dataStudyPath)} variant="ghost">
                {opts.copy.dataStudyLabel ? t(opts.copy.dataStudyLabel, opts.locale) : (isAr ? "الدراسة الأصلية" : "Original data study")}
              </Button>
            ) : null}
          </div>
        </Reveal>
      </Section>

      {/* Q&A BODY — each section is a Q&A pair */}
      {sections.map((s, i) => (
        <Section key={i} alt={i % 2 === 1}>
          <Reveal>
            <p className="bs-eyebrow">{isAr ? "السؤال" : "Q"}</p>
            <h2 className="mt-3 text-[clamp(1.5rem,3.2vw,2.2rem)]">{s.q}</h2>
          </Reveal>
          <Reveal delay={80} className="bs-prose mt-6">
            <p className="bs-eyebrow !mt-0">{isAr ? "الجواب" : "A"}</p>
            <div className="mt-3 max-w-3xl">{s.a}</div>
          </Reveal>
        </Section>
      ))}

      {/* Data study cross-link */}
      {opts.copy.dataStudyPath ? (
        <Section alt={sections.length % 2 === 1}>
          <Reveal>
            <Eyebrow>{isAr ? "اقرأ الدراسة الكاملة" : "Read the full study"}</Eyebrow>
            <h2 className="mt-5 text-[clamp(1.6rem,3.5vw,2.4rem)]">
              {opts.copy.dataStudyLabel ? t(opts.copy.dataStudyLabel, opts.locale) : (isAr ? "الدراسة الأصلية" : "Original data study")}
            </h2>
            <p className="bs-lead mt-6 !max-w-3xl">
              {isAr
                ? "هذه الصفحة تستند إلى بياناتنا الأصلية من 240 تصوير سينمائي في الإمارات (2023–2026)."
                : "This page is built on our original data from 240 UAE cinematography shoots (2023–2026)."}
            </p>
            <div className="mt-8">
              <Link href={localizedPath(opts.locale, opts.copy.dataStudyPath)} className="text-[color:var(--color-gold)] underline">
                {isAr ? "← اقرأ الدراسة الكاملة" : "← Read the full study"}
              </Link>
            </div>
          </Reveal>
        </Section>
      ) : null}

      {/* FOOTER FAQS */}
      <Section alt={(sections.length + 1) % 2 === 1}>
        <Reveal>
          <Eyebrow>{isAr ? "أسئلة شائعة" : "FAQ"}</Eyebrow>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,2.75rem)]">{t(opts.copy.h1, opts.locale)}</h2>
        </Reveal>
        <div className="mt-10">
          <Faq items={footerFaqs} />
        </div>
      </Section>

      <CtaBand
        locale={opts.locale}
        heading={isAr ? "هل لديك سؤال آخر؟ تواصل معنا" : "Have another question? Get in touch."}
        waContext={`${isAr ? "بخصوص" : "Re:"} ${t(opts.copy.h1, opts.locale)}.`}
      />
    </>
  );
}