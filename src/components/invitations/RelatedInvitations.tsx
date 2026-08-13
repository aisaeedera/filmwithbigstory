/**
 * Shared invitation cross-link modules. These enforce the internal-link matrix
 * (architecture §5): every service page renders a persistent hub link, a gallery
 * link, and a related-services grid — in visible body content, not just schema.
 */

import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { localizedPath, t } from "@/lib/i18n";
import {
  getInvitationPage,
  invitationUi,
  HUB_SLUG,
  GALLERY_PATH,
} from "@/data/invitations";

/** Persistent hub + gallery links — matrix rules 1 & 2. */
export function InvitationHubLinks({ locale }: { locale: Locale }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Link
        href={localizedPath(locale, `/services/${HUB_SLUG}`)}
        className="bs-card bs-card-hover block h-full"
      >
        <p className="text-xs uppercase tracking-wider text-[color:var(--color-gold)]">
          {t(invitationUi.hubAnchor, locale)}
        </p>
        <p className="mt-3 text-base text-[color:var(--color-ink)]">{t(invitationUi.hubCta, locale)}</p>
      </Link>
      <Link href={localizedPath(locale, GALLERY_PATH)} className="bs-card bs-card-hover block h-full">
        <p className="text-xs uppercase tracking-wider text-[color:var(--color-gold)]">
          {t(invitationUi.galleryAnchor, locale)}
        </p>
        <p className="mt-3 text-base text-[color:var(--color-ink)]">{t(invitationUi.galleryCta, locale)}</p>
      </Link>
    </div>
  );
}

/** Related invitation service pages — matrix rule 3. */
export function RelatedInvitations({ locale, slugs }: { locale: Locale; slugs: string[] }) {
  const pages = slugs.map((s) => getInvitationPage(s)).filter((p): p is NonNullable<typeof p> => Boolean(p));
  if (pages.length === 0) return null;
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {pages.map((p) => (
        <Link
          key={p.slug}
          href={localizedPath(locale, `/services/${p.slug}`)}
          className="bs-card bs-card-hover flex h-full flex-col"
        >
          <h3 className="text-xl">{t(p.breadcrumb, locale)}</h3>
          <p className="mt-3 text-sm text-[color:var(--color-muted)]">{t(p.meta.description, locale)}</p>
          <span className="mt-5 text-sm text-[color:var(--color-gold)]">{t(invitationUi.viewService, locale)} →</span>
        </Link>
      ))}
    </div>
  );
}

/** Wedding coverage cross-links — matrix rule 4 (wedding-related pages only). */
export function WeddingCoverageLinks({ locale }: { locale: Locale }) {
  const items = [
    { path: "/services/weddings", label: invitationUi.weddingPage },
    { path: "/services/wedding-photography", label: invitationUi.weddingPhoto },
    { path: "/services/wedding-videography", label: invitationUi.weddingVideo },
  ];
  return (
    <div className="bs-card">
      <p className="text-xs uppercase tracking-wider text-[color:var(--color-gold)]">
        {t(invitationUi.weddingCoverage, locale)}
      </p>
      <p className="mt-3 text-base text-[color:var(--color-ink)]">{t(invitationUi.weddingCoverageBody, locale)}</p>
      <div className="mt-5 flex flex-wrap gap-3">
        {items.map((it) => (
          <Link
            key={it.path}
            href={localizedPath(locale, it.path)}
            className="bs-btn bs-btn-ghost !px-4 !py-2 text-sm"
          >
            {t(it.label, locale)}
          </Link>
        ))}
      </div>
    </div>
  );
}
