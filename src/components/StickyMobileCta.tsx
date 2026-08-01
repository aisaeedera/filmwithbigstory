"use client";

/**
 * Sticky mobile CTA for the /media-production silo.
 *
 * One action only, below the `md` breakpoint only. It carries the same action
 * as the hero's primary CTA, so it stays out of the way while that button is
 * still on screen and slides in once the reader has scrolled past it. The two
 * therefore never sit stacked on top of each other reading as duplicate
 * buttons, and the reader still keeps one persistent way to convert.
 *
 * Degradation, following the same contract as `Reveal`:
 *  - Server render / no JavaScript: the bar renders visible. Nothing is lost.
 *  - With JavaScript, an IntersectionObserver on the hero sentinel hides it
 *    while the hero CTA is in view. The initial state is computed synchronously
 *    from a bounding rect on mount, so there is no lingering flash.
 *  - `prefers-reduced-motion` already zeroes the transition site-wide.
 */

import { useEffect, useState } from "react";
import { cx } from "@/lib/util";
import { trackEvent } from "@/lib/analytics";
import { HERO_CTA_SENTINEL_ID } from "@/components/MediaProductionUi";

export default function StickyMobileCta({
  label,
  href,
  pageContext,
}: {
  label: string;
  href: string;
  pageContext: string;
}) {
  // Default `true`: matches the server render, so hydration is stable and a
  // no-JS reader still gets the bar.
  const [shown, setShown] = useState(true);

  useEffect(() => {
    const sentinel = document.getElementById(HERO_CTA_SENTINEL_ID);
    if (!sentinel) return;

    // Synchronous first pass so the bar is already correct on the first frame
    // after mount rather than flashing in and out.
    setShown(sentinel.getBoundingClientRect().bottom <= 0);

    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setShown(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 }
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  return (
    <div className={cx("bs-mp-sticky", !shown && "is-away")} data-shown={shown}>
      <a
        href={href}
        className="bs-btn bs-btn-gold bs-mp-sticky-btn"
        data-cta="sticky"
        onClick={() => trackEvent("media_cta_click", { cta_id: "sticky", page_context: pageContext })}
      >
        {label}
      </a>
    </div>
  );
}
