import { NextRequest, NextResponse } from "next/server";

const INTERNAL_LOCALE_REWRITE_HEADER = "x-internal-locale-rewrite";

// English is served at the root ("/about"); Arabic under "/ar/about".
// Internally every page lives at /[locale]/*, so we rewrite root paths to /en/*
// and redirect any explicit /en/* back to the clean root path.
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Arabic: already maps to [locale]=ar, serve as-is.
  if (pathname === "/ar" || pathname.startsWith("/ar/")) {
    return NextResponse.next();
  }

  // A root-path rewrite re-enters the proxy at its internal /en target.
  // Let that internal pass reach the route instead of canonicalising it back.
  if (req.headers.get(INTERNAL_LOCALE_REWRITE_HEADER) === "1") {
    return NextResponse.next();
  }

  // Canonicalise explicit /en → strip the prefix.
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.replace(/^\/en/, "") || "/";
    return NextResponse.redirect(url, 308);
  }

  // Everything else is English → rewrite to /en/* under the hood.
  const url = req.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set(INTERNAL_LOCALE_REWRITE_HEADER, "1");
  return NextResponse.rewrite(url, { request: { headers: requestHeaders } });
}

export const config = {
  // Skip Next internals, API, and any file with an extension (assets, sitemap, robots, etc.)
  matcher: ["/((?!_next/|api/|.*\\..*).*)"],
};
