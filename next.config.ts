import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const isDev = process.env.NODE_ENV !== "production";

const contentSecurityPolicy = [
  "default-src 'self'",
  // Next.js injects inline bootstrap scripts; GTM/GA also require inline.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://formspree.io`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://formspree.io https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://region1.google-analytics.com https://*.google.com",
  "frame-src 'self' https://www.googletagmanager.com https://www.google.com https://maps.google.com https://formspree.io",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://formspree.io",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  experimental: {
    // Branded 404 for URLs that match no route at all. Needed because the root
    // layout lives under the top-level [locale] dynamic segment.
    globalNotFound: true,
  },

  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 80, 90],
    minimumCacheTTL: 2678400, // 31 days
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.transparenttextures.com",
      },
    ],
  },

  async redirects() {
    return [
      {
        source: "/:locale/flights",
        destination: "/:locale/circuitos",
        permanent: true,
      },
      // Legacy Spanish slug inside the English tree.
      {
        source: "/en/circuitos",
        destination: "/en/journeys",
        permanent: true,
      },
      {
        source: "/en/circuitos/:path*",
        destination: "/en/journeys/:path*",
        permanent: true,
      },
      // Old English slug that was briefly published.
      {
        source: "/en/circuits",
        destination: "/en/journeys",
        permanent: true,
      },
      {
        source: "/en/circuits/:path*",
        destination: "/en/journeys/:path*",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
      {
        source: "/((?!.*\\.pdf$).*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
