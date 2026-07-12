import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { localizedPath } from "@/lib/i18n";

export default function Breadcrumbs({
  locale,
  items,
}: {
  locale: Locale;
  items: { name: string; path?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-[color:var(--color-muted)]">
        {items.map((it, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-2">
              {it.path && !last ? (
                <Link href={localizedPath(locale, it.path)} className="bs-gold-line hover:text-[color:var(--color-ink)]">
                  {it.name}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className={last ? "text-[color:var(--color-ink)]" : ""}>
                  {it.name}
                </span>
              )}
              {!last && <span className="text-[color:var(--color-gold)]">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
