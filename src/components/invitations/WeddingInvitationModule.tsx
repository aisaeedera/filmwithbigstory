/**
 * Cross-link module placed on the existing wedding cluster (weddings,
 * wedding-photography, wedding-videography). Architecture §5: weddings gets the
 * full module (digital wedding, Katb Kitab, Save the Date + gallery); photo/video
 * get a compact "Before the day" card linking to digital wedding invitations and
 * the hub. Uses the safe cross-link direction from the SEO map — coverage page →
 * invitation service, never the reverse anchor.
 */

import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { localizedPath, t } from "@/lib/i18n";
import { Section, Eyebrow } from "@/components/primitives";
import Reveal from "@/components/Reveal";
import { HUB_SLUG, GALLERY_PATH } from "@/data/invitations";

const COPY = {
  eyebrow: { en: "Before the day", ar: "قبل اليوم" },
  h2: {
    en: "Need a bilingual digital wedding invitation?",
    ar: "تحتاجون دعوة زفاف إلكترونية ثنائية اللغة؟",
  },
  lead: {
    en: "The invitation is the first thing your guests see. Big Story also designs Arabic-first digital wedding invitations — static cards and animated videos, WhatsApp-ready.",
    ar: "الدعوة أول ما يراه ضيوفكم. تصمّم بيك ستوري أيضاً دعوات زفاف إلكترونية عربية أولاً — بطاقات ثابتة وفيديوهات متحركة، جاهزة للواتساب.",
  },
  compactCta: { en: "View invitation design service", ar: "عرض خدمة تصميم الدعوات" },
  hub: { en: "Digital invitations hub", ar: "مركز الدعوات الإلكترونية" },
  links: {
    wedding: { en: "Digital wedding invitations", ar: "دعوات زفاف إلكترونية" },
    katb: { en: "Katb Kitab / Aqd Qiran invitations", ar: "دعوات عقد قران" },
    save: { en: "Save the Date cards", ar: "بطاقات احفظوا التاريخ" },
    gallery: { en: "Browse the demo gallery", ar: "تصفّح معرض النماذج" },
  },
} as const;

const FULL_LINKS = [
  { path: "/services/digital-wedding-invitations", label: COPY.links.wedding },
  { path: "/services/katb-kitab-invitations", label: COPY.links.katb },
  { path: "/services/wedding-save-the-date", label: COPY.links.save },
  { path: GALLERY_PATH, label: COPY.links.gallery },
] as const;

export default function WeddingInvitationModule({
  locale,
  variant = "compact",
  alt = false,
}: {
  locale: Locale;
  variant?: "full" | "compact";
  alt?: boolean;
}) {
  if (variant === "compact") {
    return (
      <Section alt={alt}>
        <Reveal className="bs-card flex flex-col items-start justify-between gap-6 p-8 md:flex-row md:items-center">
          <div>
            <Eyebrow>{t(COPY.eyebrow, locale)}</Eyebrow>
            <p className="mt-4 max-w-2xl text-base text-[color:var(--color-ink)]">{t(COPY.lead, locale)}</p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link
              href={localizedPath(locale, "/services/digital-wedding-invitations")}
              className="bs-btn bs-btn-gold"
            >
              {t(COPY.compactCta, locale)}
            </Link>
            <Link href={localizedPath(locale, `/services/${HUB_SLUG}`)} className="bs-btn bs-btn-ghost">
              {t(COPY.hub, locale)}
            </Link>
          </div>
        </Reveal>
      </Section>
    );
  }

  return (
    <Section alt={alt}>
      <Reveal>
        <Eyebrow>{t(COPY.eyebrow, locale)}</Eyebrow>
        <h2 className="mt-5 max-w-3xl text-[clamp(1.8rem,4vw,2.75rem)]">{t(COPY.h2, locale)}</h2>
        <p className="bs-lead mt-6 !max-w-2xl">{t(COPY.lead, locale)}</p>
      </Reveal>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FULL_LINKS.map((l) => (
          <Link
            key={l.path}
            href={localizedPath(locale, l.path)}
            className="bs-card bs-card-hover flex h-full items-center justify-between gap-3"
          >
            <span className="text-base text-[color:var(--color-ink)]">{t(l.label, locale)}</span>
            <span className="text-[color:var(--color-gold)]" aria-hidden="true">→</span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
