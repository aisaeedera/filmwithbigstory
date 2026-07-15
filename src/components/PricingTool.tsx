"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { fmt } from "@/lib/util";
import { SITE } from "@/lib/site";
import { pricing, pricingCopy, type PriceUnit, type PricingModule } from "@/data/pricing";

/* ---- price helpers ---- */

const unitSuffix: Record<PriceUnit, { en: string; ar: string }> = {
  from: { en: "", ar: "" },
  each: { en: "", ar: "" },
  day: { en: "/ day", ar: "/ يوم" },
  month: { en: "/ month", ar: "/ شهر" },
  page: { en: "/ page", ar: "/ صفحة" },
  word: { en: "/ word", ar: "/ كلمة" },
  copy: { en: "/ copy", ar: "/ نسخة" },
  test: { en: "/ test", ar: "/ اختبار" },
};

function money(amount: number, locale: Locale): string {
  const n = fmt(amount, locale);
  return locale === "ar" ? `${n} درهم` : `AED ${n}`;
}

/** Full price label with unit, e.g. "from AED 15,000" or "AED 900 / day". */
function priceLabel(m: PricingModule, locale: Locale): string {
  const base = money(m.price, locale);
  if (m.unit === "from") return locale === "ar" ? `من ${base}` : `from ${base}`;
  const suffix = unitSuffix[m.unit][locale];
  return suffix ? `${base} ${suffix}` : base;
}

/* ---- modal ---- */

function Modal({
  module,
  locale,
  onClose,
}: {
  module: PricingModule;
  locale: Locale;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const c = pricingCopy.tool;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    ref.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[80] grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={ref}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={t(module.name, locale)}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-elevated)] p-7 outline-none"
      >
        <div className="flex items-start justify-between gap-6">
          <h3 className="font-[family-name:var(--font-display)] text-2xl text-[color:var(--color-ink)]">
            {t(module.name, locale)}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label={t(c.close, locale)}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[color:var(--color-line)] text-xl text-[color:var(--color-muted)] transition hover:border-[color:var(--color-gold)] hover:text-[color:var(--color-gold)]"
          >
            ×
          </button>
        </div>
        <p className="mt-2 text-lg text-[color:var(--color-gold)]">{priceLabel(module, locale)}</p>
        {module.desc ? (
          <p className="mt-5 text-[color:color-mix(in_srgb,var(--color-ink)_82%,transparent)]">
            {t(module.desc, locale)}
          </p>
        ) : null}
      </div>
    </div>
  );
}

/* ---- main tool ---- */

const allModules: Record<string, PricingModule> = Object.fromEntries(
  pricing.flatMap((cat) => cat.modules.map((m) => [m.id, m]))
);

export default function PricingTool({ locale }: { locale: Locale }) {
  const c = pricingCopy.tool;
  const [qty, setQty] = useState<Record<string, number>>({});
  const [openModal, setOpenModal] = useState<PricingModule | null>(null);
  const [copied, setCopied] = useState(false);

  const selected = useMemo(
    () => Object.entries(qty).filter(([, n]) => n > 0),
    [qty]
  );
  const totalItems = selected.reduce((s, [, n]) => s + n, 0);
  const subtotal = selected.reduce((s, [id, n]) => s + (allModules[id]?.price ?? 0) * n, 0);

  const add = (id: string) => setQty((q) => ({ ...q, [id]: (q[id] ?? 0) + 1 }));
  const sub = (id: string) => setQty((q) => ({ ...q, [id]: Math.max(0, (q[id] ?? 0) - 1) }));
  const clear = () => setQty({});

  /** Plain-text quote summary. */
  const summary = useMemo(() => {
    const lines: string[] = [];
    lines.push(t(c.quoteHeading, locale));
    lines.push("");
    for (const [id, n] of selected) {
      const m = allModules[id];
      if (!m) continue;
      const qtyStr = n > 1 ? ` ×${n}` : "";
      lines.push(`• ${t(m.name, locale)}${qtyStr} — ${priceLabel(m, locale)}`);
    }
    lines.push("");
    lines.push(`${t(c.estSubtotal, locale)}: ${money(subtotal, locale)}`);
    lines.push("");
    lines.push(t(c.indicative, locale));
    lines.push("");
    lines.push(`— ${SITE.domain}/${locale === "ar" ? "ar/" : ""}pricing`);
    return lines.join("\n");
  }, [selected, subtotal, locale, c]);

  const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent(
    t(c.quoteHeading, locale)
  )}&body=${encodeURIComponent(summary)}`;

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — the email button still works */
    }
  };

  return (
    <>
      {/* Category tables */}
      <div className="mt-14 space-y-16 pb-40">
        {pricing.map((cat) => (
          <section key={cat.id} aria-labelledby={`cat-${cat.id}`}>
            <div className="flex flex-wrap items-center gap-3">
              <h2 id={`cat-${cat.id}`} className="text-[clamp(1.6rem,3.5vw,2.5rem)]">
                {t(cat.name, locale)}
              </h2>
              <span
                className={
                  "rounded-full border px-3 py-1 text-xs " +
                  (cat.modular
                    ? "border-[color:color-mix(in_srgb,var(--color-gold)_45%,var(--color-line))] text-[color:var(--color-gold)]"
                    : "border-[color:var(--color-line)] text-[color:var(--color-muted)]")
                }
              >
                {t(cat.modular ? pricingCopy.modularPill : pricingCopy.bundledPill, locale)}
              </span>
            </div>
            <p className="mt-4 max-w-3xl text-[color:var(--color-muted)]">{t(cat.blurb, locale)}</p>

            {cat.notes?.length ? (
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                {cat.notes.map((note, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-[color:var(--color-ink)]">
                    <span aria-hidden="true" className="text-[color:var(--color-gold)]">
                      ●
                    </span>
                    {t(note, locale)}
                  </li>
                ))}
              </ul>
            ) : null}

            {/* table */}
            <div className="mt-6 overflow-hidden rounded-xl border border-[color:var(--color-line)]">
              <table className="w-full border-collapse text-start">
                <thead>
                  <tr className="border-b border-[color:var(--color-line)] bg-[color:var(--color-elevated)] text-xs uppercase tracking-wide text-[color:var(--color-muted)]">
                    <th className="px-4 py-3 text-start font-medium sm:px-5">
                      {locale === "ar" ? "الخدمة" : "Service"}
                    </th>
                    <th className="px-4 py-3 text-start font-medium sm:px-5">
                      {locale === "ar" ? "السعر" : "Price"}
                    </th>
                    <th className="px-4 py-3 text-end font-medium sm:px-5">
                      {t(c.yourQuote, locale)}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cat.modules.map((m) => {
                    const n = qty[m.id] ?? 0;
                    return (
                      <tr
                        key={m.id}
                        className="border-b border-[color:var(--color-line)] last:border-0 transition hover:bg-[color:color-mix(in_srgb,var(--color-gold)_5%,transparent)]"
                      >
                        <td className="px-4 py-4 align-middle sm:px-5">
                          <button
                            type="button"
                            onClick={() => setOpenModal(m)}
                            className="text-start font-medium text-[color:var(--color-ink)] underline decoration-transparent underline-offset-4 transition hover:decoration-[color:var(--color-gold)]"
                            aria-label={`${t(m.name, locale)} — ${t(c.details, locale)}`}
                          >
                            {t(m.name, locale)}
                            <span aria-hidden="true" className="ms-2 text-xs text-[color:var(--color-muted)]">
                              ⓘ
                            </span>
                          </button>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 align-middle text-[color:var(--color-gold)] sm:px-5">
                          {priceLabel(m, locale)}
                        </td>
                        <td className="px-4 py-4 align-middle sm:px-5">
                          <div className="flex items-center justify-end gap-2">
                            {n > 0 ? (
                              <div className="flex items-center gap-1 rounded-full border border-[color:var(--color-line)]">
                                <button
                                  type="button"
                                  onClick={() => sub(m.id)}
                                  aria-label={`${t(c.remove, locale)} — ${t(m.name, locale)}`}
                                  className="grid h-8 w-8 place-items-center rounded-full text-lg text-[color:var(--color-muted)] transition hover:text-[color:var(--color-gold)]"
                                >
                                  −
                                </button>
                                <span
                                  aria-live="polite"
                                  className="min-w-6 text-center text-sm font-semibold text-[color:var(--color-ink)]"
                                >
                                  {fmt(n, locale)}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => add(m.id)}
                                  aria-label={`${t(c.add, locale)} — ${t(m.name, locale)}`}
                                  className="grid h-8 w-8 place-items-center rounded-full text-lg text-[color:var(--color-muted)] transition hover:text-[color:var(--color-gold)]"
                                >
                                  +
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => add(m.id)}
                                className="rounded-full border border-[color:color-mix(in_srgb,var(--color-gold)_45%,var(--color-line))] px-4 py-1.5 text-sm text-[color:var(--color-gold)] transition hover:bg-[color:color-mix(in_srgb,var(--color-gold)_12%,transparent)]"
                              >
                                {t(c.add, locale)}
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>

      {/* Sticky quote bar */}
      <div className="fixed inset-x-0 bottom-0 z-[70] border-t border-[color:var(--color-line)] bg-[color:color-mix(in_srgb,var(--color-bg)_92%,transparent)] backdrop-blur-md">
        <div className="bs-shell flex flex-wrap items-center justify-between gap-4 py-4">
          <div className="min-w-0">
            <p className="text-sm text-[color:var(--color-muted)]">
              {t(c.yourQuote, locale)} ·{" "}
              <span className="text-[color:var(--color-ink)]">
                {fmt(totalItems, locale)} {t(totalItems === 1 ? c.item : c.items, locale)}
              </span>
            </p>
            <p className="font-[family-name:var(--font-display)] text-lg text-[color:var(--color-ink)]">
              {t(c.estSubtotal, locale)}: <span className="text-[color:var(--color-gold)]">{money(subtotal, locale)}</span>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {totalItems > 0 && (
              <button
                type="button"
                onClick={clear}
                className="rounded-full px-4 py-2 text-sm text-[color:var(--color-muted)] transition hover:text-[color:var(--color-ink)]"
              >
                {t(c.clear, locale)}
              </button>
            )}
            <button
              type="button"
              onClick={copySummary}
              disabled={totalItems === 0}
              className="bs-btn bs-btn-ghost !px-5 !py-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-40"
            >
              {copied ? t(c.copied, locale) : t(c.copy, locale)}
            </button>
            <a
              href={totalItems === 0 ? undefined : mailto}
              aria-disabled={totalItems === 0}
              className={
                "bs-btn bs-btn-gold !px-5 !py-2.5 text-sm " +
                (totalItems === 0 ? "pointer-events-none opacity-40" : "")
              }
            >
              {t(c.buildQuote, locale)}
            </a>
          </div>
        </div>
        {totalItems > 0 && (
          <p className="bs-shell pb-3 text-xs text-[color:var(--color-muted)]">{t(c.indicative, locale)}</p>
        )}
      </div>

      {openModal && <Modal module={openModal} locale={locale} onClose={() => setOpenModal(null)} />}
    </>
  );
}
