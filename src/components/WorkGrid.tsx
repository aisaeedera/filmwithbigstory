"use client";

import { useState } from "react";
import Link from "next/link";
import { cx } from "@/lib/util";

export type WorkItem = {
  slug: string;
  href: string;
  category: string;
  categoryLabel: string;
  title: string;
  summary: string;
};

export default function WorkGrid({
  items,
  filters,
  allLabel,
}: {
  items: WorkItem[];
  filters: { key: string; label: string }[];
  allLabel: string;
}) {
  const [active, setActive] = useState<string>("all");
  const shown = active === "all" ? items : items.filter((i) => i.category === active);
  const available = new Set(items.map((i) => i.category));
  const tabs = [{ key: "all", label: allLabel }, ...filters.filter((f) => available.has(f.key))];

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter work">
        {tabs.map((f) => (
          <button
            key={f.key}
            role="tab"
            aria-selected={active === f.key}
            onClick={() => setActive(f.key)}
            className={cx(
              "rounded-full border px-4 py-2 text-sm transition",
              active === f.key
                ? "border-[color:var(--color-gold)] bg-[color:var(--color-gold)] text-[#08080a]"
                : "border-[color:var(--color-line)] text-[color:var(--color-muted)] hover:text-[color:var(--color-ink)]"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {shown.map((cs) => (
          <Link key={cs.slug} href={cs.href} className="bs-card bs-card-hover block h-full">
            <span className="bs-eyebrow !text-[color:var(--color-muted)] before:!bg-[color:var(--color-muted)]">
              {cs.categoryLabel}
            </span>
            <h3 className="mt-4 text-2xl">{cs.title}</h3>
            <p className="mt-4 text-sm text-[color:var(--color-muted)]">{cs.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
