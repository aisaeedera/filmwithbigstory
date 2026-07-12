import Link from "next/link";
import { cx } from "@/lib/util";

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cx("bs-eyebrow", className)}>{children}</p>;
}

export function Section({
  children,
  alt,
  className,
  id,
  as = "section",
}: {
  children: React.ReactNode;
  alt?: boolean;
  className?: string;
  id?: string;
  as?: "section" | "div";
}) {
  const Tag = as;
  return (
    <Tag id={id} className={cx("bs-section", alt && "bs-section-alt", className)}>
      <div className="bs-shell">{children}</div>
    </Tag>
  );
}

type BtnProps = {
  href: string;
  children: React.ReactNode;
  variant?: "gold" | "ghost";
  external?: boolean;
  className?: string;
  ariaLabel?: string;
};

export function Button({ href, children, variant = "gold", external, className, ariaLabel }: BtnProps) {
  const cls = cx("bs-btn", variant === "gold" ? "bs-btn-gold" : "bs-btn-ghost", className);
  if (external || href.startsWith("http") || href.startsWith("mailto") || href.startsWith("tel")) {
    return (
      <a
        href={href}
        className={cls}
        aria-label={ariaLabel}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  className,
}: {
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  lead?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("max-w-3xl", className)}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      {title ? (
        <h2 className="mt-5 text-[clamp(2rem,4.5vw,3.25rem)]">{title}</h2>
      ) : null}
      {lead ? <p className="bs-lead mt-6">{lead}</p> : null}
    </div>
  );
}
