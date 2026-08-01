/**
 * Shared server components for the /media-production silo.
 *
 * Art direction: editorial cinema set on paper. Depth comes from the existing
 * background steps and hairline rules only. No gradients, no icon set, no
 * imagery. The two signature components are the ruled index row and the slate
 * block. See MEDIA_PRODUCTION_CONTENT_ARCHITECTURE.md §3.
 *
 * These are all server components: the silo renders and is fully readable with
 * JavaScript disabled.
 */

import Link from "next/link";
import { localizedPath, t, type Locale } from "@/lib/i18n";
import { cx } from "@/lib/util";
import type { L } from "@/lib/i18n";
import {
  mediaRateCard,
  mediaUi,
  rateCardIsPublishable,
  withoutEmDash,
  type MediaStage,
} from "@/data/media-production";

/* ------------------------------------------------------------------ */
/* Index row — the signature component                                 */
/* ------------------------------------------------------------------ */


export function IndexRow({
  locale,
  index,
  title,
  description,
  href,
  cue,
}: {
  locale: Locale;
  index: number;
  title: string;
  description: string;
  /** Clean path without locale prefix. */
  href: string;
  cue?: string;
}) {
  return (
    <li className="bs-mp-row-item">
      <Link href={localizedPath(locale, href)} className="bs-mp-row">
        <span className="bs-mp-row-index" aria-hidden="true">
          {String(index).padStart(2, "0")}
        </span>
        <span className="bs-mp-row-body">
          <span className="bs-mp-row-title">{withoutEmDash(title)}</span>
          <span className="bs-mp-row-desc">{withoutEmDash(description)}</span>
        </span>
        <span className="bs-mp-row-cue">
          {cue ?? t(mediaUi.readMore, locale)}
          <span aria-hidden="true" className="bs-arrow bs-mp-row-arrow">
            →
          </span>
        </span>
      </Link>
    </li>
  );
}

export function IndexList({ children, className }: { children: React.ReactNode; className?: string }) {
  return <ul className={cx("bs-mp-rows", className)}>{children}</ul>;
}

/* ------------------------------------------------------------------ */
/* Slate — a bordered block with a mono label sitting on the border     */
/* ------------------------------------------------------------------ */

export function Slate({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("bs-mp-slate", className)}>
      <span className="bs-mp-slate-label">{label}</span>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Numbered stage list                                                 */
/* ------------------------------------------------------------------ */

export function StageList({ locale, stages }: { locale: Locale; stages: readonly MediaStage[] }) {
  return (
    <ol className="bs-mp-stages">
      {stages.map((s) => (
        <li key={s.n} className="bs-mp-stage">
          <span className="bs-mp-stage-n" aria-hidden="true">
            {s.n}
          </span>
          <div>
            <h3 className="text-xl">{t(s.title, locale)}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-muted)]">{t(s.body, locale)}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------------ */
/* PRICE GATE render surface                                           */
/*                                                                     */
/* This is the ONLY component in the silo allowed to render rate-card  */
/* data, and it renders none while the gate is closed. See             */
/* MEDIA_PRODUCTION_CONTENT_ARCHITECTURE.md §7.                        */
/* ------------------------------------------------------------------ */

export function ScopeGate({ locale, covers }: { locale: Locale; covers: readonly L[] }) {
  const publishable = rateCardIsPublishable();

  return (
    <Slate label={t(mediaUi.slateLabel, locale)} className="mt-10">
      {publishable ? (
        // Unreachable in this build: MEDIA_RATE_CARD_ENABLED is false and
        // mediaRateCard is empty. Kept so verified data can later be added in
        // one place and render consistently across all four routes.
        <ul className="bs-mp-scope-list">
          {mediaRateCard.map((row, i) => (
            <li key={i} className="bs-mp-scope-item">
              <span className="bs-mp-scope-label">{t(row.label, locale)}</span>
              <span className="bs-mp-scope-body">{t(row.scope, locale)}</span>
              {row.figure ? <span className="bs-mp-scope-figure">{t(row.figure, locale)}</span> : null}
            </li>
          ))}
        </ul>
      ) : (
        <>
          <p className="bs-mp-scope-placeholder">{t(mediaUi.scopePlaceholder, locale)}</p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[color:var(--color-muted)]">
            {t(mediaUi.scopePlaceholderBody, locale)}
          </p>
          <p className="bs-eyebrow mt-8">{t(mediaUi.scopeCoversLabel, locale)}</p>
          <ul className="bs-mp-scope-list mt-5">
            {covers.map((c, i) => (
              <li key={i} className="bs-mp-scope-item">
                <span className="bs-mp-scope-tick" aria-hidden="true" />
                <span className="bs-mp-scope-body">{t(c, locale)}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </Slate>
  );
}

/** Marks the end of the hero CTA row. The sticky mobile bar watches this so the
 *  two never read as a duplicated button. Purely a hook, renders nothing. */
export const HERO_CTA_SENTINEL_ID = "hero-cta-end";

export function HeroCtaSentinel() {
  return <span id={HERO_CTA_SENTINEL_ID} aria-hidden="true" className="block h-px w-px" />;
}
