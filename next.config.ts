import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  async redirects() {
    return [
      // Legacy Layer B rental commerce → RED subdomain
      { source: "/collections/:path*", destination: "https://red.filmwithbigstory.com/", permanent: true },
      { source: "/products/:path*", destination: "https://red.filmwithbigstory.com/", permanent: true },
      { source: "/bundles/:path*", destination: "https://red.filmwithbigstory.com/", permanent: true },
      { source: "/camera-rental-:path(.*)", destination: "https://red.filmwithbigstory.com/", permanent: true },
      { source: "/search", destination: "/", permanent: true },
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
