"use client";

/**
 * InvitationGallery — the filterable demo wall. Client-only so occasion/format
 * filters work without a round-trip; the underlying data is static so the first
 * paint already shows every card. One renderer over all 64 records.
 */

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { cx } from "@/lib/util";
import {
  invitationDemos,
  invitationCategories,
  formatLabels,
  type CategorySlug,
  type DemoFormat,
} from "@/data/invitation-designs";
import InvitationCard from "@/components/invitations/InvitationCard";

type OccasionFilter = "all" | CategorySlug;
type FormatFilter = "all" | DemoFormat;

const L = {
  occasions: { en: "Occasion", ar: "المناسبة" },
  formats: { en: "Format", ar: "الصيغة" },
  all: { en: "All", ar: "الكل" },
  showing: { en: "Showing", ar: "عرض" },
  of: { en: "of", ar: "من" },
  samples: { en: "demo samples", ar: "نموذج تجريبي" },
  empty: {
    en: "No demo samples match this filter yet.",
    ar: "لا توجد نماذج مطابقة لهذا الفلتر بعد.",
  },
} as const;

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cx(
        "rounded-full border px-4 py-2 text-sm transition-colors",
        active
          ? "border-[color:var(--color-gold)] bg-[color:var(--color-gold)] text-black"
          : "border-[color:var(--color-line)] text-[color:var(--color-ink)] hover:border-[color:var(--color-gold)]",
      )}
    >
      {children}
    </button>
  );
}

export default function InvitationGallery({
  locale,
  initialOccasion = "all",
}: {
  locale: Locale;
  initialOccasion?: OccasionFilter;
}) {
  const [occasion, setOccasion] = useState<OccasionFilter>(initialOccasion);
  const [format, setFormat] = useState<FormatFilter>("all");

  const filtered = useMemo(
    () =>
      invitationDemos.filter(
        (d) =>
          (occasion === "all" || d.categorySlug === occasion) &&
          (format === "all" || d.format === format),
      ),
    [occasion, format],
  );

  const formats: DemoFormat[] = ["static", "carousel", "animated"];

  return (
    <div>
      {/* Occasion filter */}
      <div className="flex flex-col gap-3">
        <span className="text-xs uppercase tracking-wider text-[color:var(--color-muted)]">
          {t(L.occasions, locale)}
        </span>
        <div className="flex flex-wrap gap-2">
          <Chip active={occasion === "all"} onClick={() => setOccasion("all")}>
            {t(L.all, locale)}
          </Chip>
          {invitationCategories.map((c) => (
            <Chip key={c.slug} active={occasion === c.slug} onClick={() => setOccasion(c.slug)}>
              {locale === "ar" ? c.nameAr : c.nameEn}
            </Chip>
          ))}
        </div>
      </div>

      {/* Format filter */}
      <div className="mt-6 flex flex-col gap-3">
        <span className="text-xs uppercase tracking-wider text-[color:var(--color-muted)]">
          {t(L.formats, locale)}
        </span>
        <div className="flex flex-wrap gap-2">
          <Chip active={format === "all"} onClick={() => setFormat("all")}>
            {t(L.all, locale)}
          </Chip>
          {formats.map((f) => (
            <Chip key={f} active={format === f} onClick={() => setFormat(f)}>
              {t(formatLabels[f], locale)}
            </Chip>
          ))}
        </div>
      </div>

      <p className="mt-8 text-sm text-[color:var(--color-muted)]">
        {t(L.showing, locale)} {filtered.length} {t(L.of, locale)} {invitationDemos.length}{" "}
        {t(L.samples, locale)}
      </p>

      {filtered.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-dashed border-[color:var(--color-line)] p-10 text-center text-[color:var(--color-muted)]">
          {t(L.empty, locale)}
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((demo) => (
            <InvitationCard key={demo.id} demo={demo} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}
