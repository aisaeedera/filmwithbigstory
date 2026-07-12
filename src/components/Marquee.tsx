import { Fragment } from "react";

export default function Marquee({ items }: { items: string[] }) {
  const track = (
    <div className="bs-marquee__track" aria-hidden={false}>
      {items.map((item, i) => (
        <Fragment key={i}>
          <span className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3.5vw,2.5rem)] text-[color:var(--color-muted)]">
            {item}
          </span>
          <span className="text-[color:var(--color-gold)]" aria-hidden="true">
            ·
          </span>
        </Fragment>
      ))}
    </div>
  );
  return (
    <div className="bs-marquee border-y border-[color:var(--color-line)] py-7" role="marquee">
      {track}
      <div className="bs-marquee__track" aria-hidden="true">
        {items.map((item, i) => (
          <Fragment key={i}>
            <span className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3.5vw,2.5rem)] text-[color:var(--color-muted)]">
              {item}
            </span>
            <span className="text-[color:var(--color-gold)]">·</span>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
