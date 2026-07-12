import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  return {
    metadataBase: new URL(origin),
    title: "Yash Kant Tiwary · Creative Producer & Strategist",
    description: "Creative producer and strategist building video-led campaigns, content systems, and AI-assisted production workflows at scale.",
    openGraph: {
      title: "Yash Kant Tiwary · Creative Systems That Perform",
      description: "Creative production scale, performance-minded strategy, and AI-assisted workflows.",
      type: "website",
      url: origin,
      images: [{ url: `${origin}/og.png`, width: 1792, height: 1024, alt: "Yash Kant Tiwary - Creative Systems That Perform" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Yash Kant Tiwary · Creative Systems That Perform",
      description: "Creative production scale, performance-minded strategy, and AI-assisted workflows.",
      images: [`${origin}/og.png`],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body></html>;
}
