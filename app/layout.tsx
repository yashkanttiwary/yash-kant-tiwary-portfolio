import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const canonicalUrl = siteUrl.endsWith("/") ? siteUrl : `${siteUrl}/`;
const socialImageUrl = `${canonicalUrl}og.png`;

export const metadata: Metadata = {
  metadataBase: new URL(canonicalUrl),
  title: "Yash Kant Tiwary · Creative Producer & Strategist",
  description: "Creative producer and strategist building video-led campaigns, content systems, and AI-assisted production workflows at scale.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title: "Yash Kant Tiwary · Creative Systems That Perform",
    description: "Creative production scale, performance-minded strategy, and AI-assisted workflows.",
    type: "website",
    url: canonicalUrl,
    images: [{ url: socialImageUrl, width: 1792, height: 1024, alt: "Yash Kant Tiwary - Creative Systems That Perform" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yash Kant Tiwary · Creative Systems That Perform",
    description: "Creative production scale, performance-minded strategy, and AI-assisted workflows.",
    images: [socialImageUrl],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}><body>{children}</body></html>;
}
