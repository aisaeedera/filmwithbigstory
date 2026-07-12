import { NextRequest, NextResponse } from "next/server";

// English is served at the root ("/about"); Arabic under "/ar/about".
// Internally every page lives at /[locale]/*, so we rewrite root paths to /en/*
// and redirect any explicit /en/* back to the clean root path.
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Arabic: already maps to [locale]=ar, serve as-is.
  if (pathname === "/ar" || pathname.startsWith("/ar/")) {
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
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, API, and any file with an extension (assets, sitemap, robots, etc.)
  matcher: ["/((?!_next/|api/|.*\\..*).*)"],
};
