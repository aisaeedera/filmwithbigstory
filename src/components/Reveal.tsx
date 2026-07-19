"use client";

import { useEffect, useRef, useState } from "react";
import { cx } from "@/lib/util";

type Props = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "li" | "header";
  delay?: number;
};

export default function Reveal({ children, className, as = "div", delay = 0 }: Props) {
  const ref = useRef<HTMLElement>(null);
  // Armed = JS has loaded and we should hide until the element scrolls in.
  // Shown = the IntersectionObserver has fired or fallback was triggered.
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If the element is already fully in the viewport on mount, skip the
    // animation entirely (no flash of hidden content).
    const rect = el.getBoundingClientRect();
    const viewportH = typeof window !== "undefined" ? window.innerHeight : 0;
    if (rect.top < viewportH && rect.bottom > 0) {
      setShown(true);
      return;
    }

    setArmed(true);

    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as as React.ElementType;
  return (
    <Tag
      ref={ref}
      className={cx("bs-reveal", armed && "bs-reveal-armed", shown && "is-in", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
