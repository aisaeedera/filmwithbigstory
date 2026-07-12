import { cx } from "@/lib/util";

export default function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-[color:var(--color-line)] border-y border-[color:var(--color-line)]">
      {items.map((it, i) => (
        <details key={i} className="group py-5" name="faq">
          <summary
            className={cx(
              "flex cursor-pointer list-none items-center justify-between gap-6",
              "text-lg font-medium text-[color:var(--color-ink)] [&::-webkit-details-marker]:hidden"
            )}
          >
            <span className="font-[family-name:var(--font-display)]">{it.q}</span>
            <span
              aria-hidden="true"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[color:var(--color-line)] text-xl text-[color:var(--color-gold)] transition-transform duration-300 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-4 max-w-3xl pe-14 text-[color:color-mix(in_srgb,var(--color-ink)_82%,transparent)]">
            {it.a}
          </p>
        </details>
      ))}
    </div>
  );
}
