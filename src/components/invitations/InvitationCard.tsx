/**
 * InvitationCard — one demo tile. Renders the original vector poster, an
 * always-visible نموذج badge (never let a sample read as finished client work),
 * the format/deliverable chip, and links to the preview/share route.
 */

import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { localizedPath, t } from "@/lib/i18n";
import { cx } from "@/lib/util";
import {
  formatLabels,
  styleFamilies,
  type InvitationDemo,
} from "@/data/invitation-designs";
import InvitationPoster from "@/components/invitations/InvitationPoster";

export default function InvitationCard({
  demo,
  locale,
}: {
  demo: InvitationDemo;
  locale: Locale;
}) {
  const family = styleFamilies[demo.styleKey];
  const category = locale === "ar" ? demo.categoryNameAr : demo.categoryNameEn;
  const style = locale === "ar" ? demo.styleAr : demo.styleEn;

  return (
    <Link
      href={localizedPath(locale, `/invitation-designs/${demo.slug}`)}
      className="group block overflow-hidden rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-elevated)] transition-colors hover:border-[color:var(--color-gold)]"
    >
      <div className="relative">
        <InvitationPoster
          demo={demo}
          locale={locale}
          className={cx(
            "aspect-[320/420] transition-transform duration-500 group-hover:scale-[1.02]",
            demo.format === "animated" && "bs-inv-shimmer",
          )}
        />
        {/* Always-visible sample label */}
        <span
          className="absolute start-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white backdrop-blur"
          style={{ fontFamily: "var(--font-arabic)" }}
        >
          نموذج
        </span>
        {/* Format chip */}
        <span
          className={cx(
            "absolute end-3 top-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs backdrop-blur",
            family.light ? "bg-black/60 text-white" : "bg-white/85 text-black",
          )}
        >
          {demo.format === "animated" && <span aria-hidden="true">▶</span>}
          {t(formatLabels[demo.format], locale)}
        </span>
      </div>
      <div className="p-4">
        <p className="text-xs uppercase tracking-wider text-[color:var(--color-gold)]">{category}</p>
        <p className="mt-1.5 text-lg text-[color:var(--color-ink)]" style={{ fontFamily: "var(--font-arabic-display)" }}>
          {demo.demoNameAr}
        </p>
        <p className="mt-1 text-sm text-[color:var(--color-muted)]">
          {style} · {demo.paletteAr}
        </p>
      </div>
    </Link>
  );
}
