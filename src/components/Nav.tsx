"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { localizedPath, t } from "@/lib/i18n";
import { ui } from "@/data/copy";
import { cx } from "@/lib/util";

const links = [
  { key: "work", path: "/work" },
  { key: "services", path: "/services" },
  { key: "pricing", path: "/pricing" },
  { key: "about", path: "/about" },
  { key: "howWeWork", path: "/how-we-work" },
  { key: "clients", path: "/clients" },
  { key: "contact", path: "/contact" },
] as const;

function Wordmark() {
  return (
    <span className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight">
      BIG<span className="text-[color:var(--color-gold)]">·</span>STORY
    </span>
  );
}

export default function Nav({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Build the alternate-locale URL for the current path
  const other: Locale = locale === "ar" ? "en" : "ar";
  const stripped = pathname.replace(/^\/ar(?=\/|$)/, "") || "/";
  const switchHref = localizedPath(other, stripped);

  const isActive = (path: string) => {
    const full = localizedPath(locale, path);
    return pathname === full || pathname.startsWith(full + "/");
  };

  return (
    <header
      className={cx(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled
          ? "border-[color:var(--color-line)] bg-[color:color-mix(in_srgb,var(--color-bg)_82%,transparent)] backdrop-blur-md"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="bs-shell flex h-[68px] items-center justify-between">
        <Link href={localizedPath(locale, "/")} aria-label="Big Story home" className="flex items-center gap-2">
          <Wordmark />
          <span className="font-[family-name:var(--font-arabic-display)] text-base text-[color:var(--color-muted)]">
            بيك ستوري
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {links.map((l) => (
            <Link
              key={l.key}
              href={localizedPath(locale, l.path)}
              className={cx(
                "bs-gold-line text-sm",
                isActive(l.path) ? "text-[color:var(--color-gold)]" : "text-[color:var(--color-ink)]"
              )}
            >
              {t(ui.nav[l.key], locale)}
            </Link>
          ))}
          <Link href={switchHref} className="text-sm text-[color:var(--color-muted)] hover:text-[color:var(--color-ink)]" hrefLang={other}>
            {t(ui.nav.langSwitch, locale)}
          </Link>
          <Link href={localizedPath(locale, "/contact")} className="bs-btn bs-btn-ghost !px-5 !py-2.5 text-sm">
            {t(ui.nav.startProject, locale)}
          </Link>
        </nav>

        <button
          type="button"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--color-line)]"
          aria-expanded={open}
          aria-label={t(open ? ui.nav.close : ui.nav.menu, locale)}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3 w-5">
            <span className={cx("absolute left-0 h-px w-5 bg-current transition", open ? "top-1.5 rotate-45" : "top-0")} />
            <span className={cx("absolute left-0 top-1.5 h-px w-5 bg-current transition", open && "opacity-0")} />
            <span className={cx("absolute left-0 h-px w-5 bg-current transition", open ? "top-1.5 -rotate-45" : "top-3")} />
          </span>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[color:var(--color-line)] bg-[color:var(--color-bg)]">
          <nav className="bs-shell flex flex-col gap-1 py-6" aria-label="Mobile">
            {links.map((l) => (
              <Link
                key={l.key}
                href={localizedPath(locale, l.path)}
                className="py-3 text-lg font-[family-name:var(--font-display)] border-b border-[color:var(--color-line)]"
              >
                {t(ui.nav[l.key], locale)}
              </Link>
            ))}
            <Link href={switchHref} className="py-3 text-[color:var(--color-muted)]" hrefLang={other}>
              {t(ui.nav.langSwitch, locale)}
            </Link>
            <Link href={localizedPath(locale, "/contact")} className="bs-btn bs-btn-gold mt-4">
              {t(ui.nav.startProject, locale)}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
