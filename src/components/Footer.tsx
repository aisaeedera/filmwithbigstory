import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { localizedPath, t } from "@/lib/i18n";
import { ui } from "@/data/copy";
import { SITE } from "@/lib/site";

const footerSections = [
  {
    heading: { en: "Services", ar: "الخدمات" },
    links: [
      { key: "mediaProduction", path: "/media-production" },
      { key: "websiteServices", path: "/website-services" },
      { key: "weddings", path: "/weddings" },
      { key: "pricing", path: "/pricing" },
    ],
  },
  {
    heading: { en: "Company", ar: "الشركة" },
    links: [
      { key: "about", path: "/about" },
      { key: "howWeWork", path: "/how-we-work" },
      { key: "clients", path: "/clients" },
      { key: "careers", path: "/careers" },
    ],
  },
  {
    heading: { en: "Resources", ar: "الموارد" },
    links: [
      { key: "work", path: "/work" },
      { key: "faqs", path: "/faqs" },
      { key: "contact", path: "/contact" },
    ],
  },
] as const;

export default function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="border-t border-[color:var(--color-line)] bg-[color:var(--color-bg-alt)]">
      <div className="bs-shell grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link href={localizedPath(locale, "/")} className="inline-flex items-center gap-2">
            <span className="font-[family-name:var(--font-display)] text-2xl font-semibold">
              BIG<span className="text-[color:var(--color-gold)]">·</span>STORY
            </span>
            <span className="font-[family-name:var(--font-arabic-display)] text-lg text-[color:var(--color-muted)]">
              بيك ستوري
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-[color:var(--color-muted)]">
            {t(ui.brandTagline, locale)}
          </p>
        </div>

        {footerSections.map((section) => (
          <div key={t(section.heading, locale)}>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
              {t(section.heading, locale)}
            </h2>
            <ul className="space-y-2.5 text-sm">
              {section.links.map((l) => (
                <li key={l.key}>
                  <Link href={localizedPath(locale, l.path)} className="bs-gold-line">
                    {t(ui.nav[l.key], locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-[color:var(--color-line)]">
        <div className="bs-shell flex flex-col gap-3 py-6 text-xs text-[color:var(--color-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>{t(ui.footer.rights, locale)}</p>
          <div className="flex flex-wrap gap-5">
            <Link href={localizedPath(locale, "/privacy-policy")} className="bs-gold-line">{t(ui.footer.privacy, locale)}</Link>
            <Link href={localizedPath(locale, "/terms-conditions")} className="bs-gold-line">{t(ui.footer.terms, locale)}</Link>
            <span>{t(ui.footer.tag, locale)}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
