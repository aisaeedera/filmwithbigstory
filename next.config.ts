import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  async redirects() {
    // Invitation-cluster draft aliases → canonical owner (site architecture §3).
    // Mirrored for the Arabic (/ar) locale prefix.
    const invitationAliases: { from: string; to: string }[] = [
      { from: "/services/digital-wedding-invitations-dubai", to: "/services/digital-wedding-invitations" },
      { from: "/services/engagement-milka-invitations", to: "/services/malka-engagement-invitations" },
      { from: "/services/save-the-date-design", to: "/services/wedding-save-the-date" },
      { from: "/services/wedding-announcement-design", to: "/services/wedding-announcements" },
      { from: "/services/animated-invitation-video", to: "/services/animated-video-invitations" },
      { from: "/services/rsvp-qr-invitations", to: "/services/digital-invitations-rsvp" },
      { from: "/services/newborn-announcement-design", to: "/services/newborn-invitations-announcements" },
      { from: "/services/aqd-qiran-invitations", to: "/services/katb-kitab-invitations" },
    ];
    const invitationRedirects = invitationAliases.flatMap((r) => [
      { source: r.from, destination: r.to, permanent: true },
      { source: `/ar${r.from}`, destination: `/ar${r.to}`, permanent: true },
    ]);

    return [
      // Legacy Layer B rental commerce → RED subdomain
      { source: "/collections/:path*", destination: "https://red.filmwithbigstory.com/", permanent: true },
      { source: "/products/:path*", destination: "https://red.filmwithbigstory.com/", permanent: true },
      { source: "/bundles/:path*", destination: "https://red.filmwithbigstory.com/", permanent: true },
      { source: "/camera-rental-:path(.*)", destination: "https://red.filmwithbigstory.com/", permanent: true },
      { source: "/search", destination: "/", permanent: true },
      ...invitationRedirects,
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
