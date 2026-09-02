import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  outputFileTracingRoot: process.cwd(),
  async rewrites() {
    return {
      beforeFiles: [{ source: "/", destination: "/portfolio.html" }],
      afterFiles: [],
      fallback: [],
    };
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    const securityHeaders = [
      {
        key: "Content-Security-Policy",
        value: [
          "default-src 'self'",
          "base-uri 'self'",
          "object-src 'none'",
          "frame-ancestors 'none'",
          "form-action 'self'",
          "img-src 'self' data: blob:",
          "media-src 'self'",
          "font-src 'self' data:",
          "style-src 'self' 'unsafe-inline'",
          "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
          "connect-src 'self' https://vitals.vercel-insights.com https://*.vercel-insights.com",
        ].join("; "),
      },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
      { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
    ];

    if (process.env.NODE_ENV === "production") {
      securityHeaders.push({ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" });
    }

    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/yash-kant-tiwary-resume.pdf",
        headers: [
          { key: "Content-Disposition", value: 'attachment; filename="Yash-Kant-Tiwary-Resume.pdf"' },
          { key: "Content-Type", value: "application/pdf" },
        ],
      },
    ];
  },
};

export default nextConfig;
