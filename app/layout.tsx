import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "Yash Kant Tiwary — Creative producer",
  description: "Video, campaigns and content systems. Bangalore.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Yash Kant Tiwary — Creative producer",
    description: "Video, campaigns and content systems. Bangalore.",
    type: "website",
    url: "/",
    siteName: "Yash Kant Tiwary",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Yash Kant Tiwary — Creative producer. Bangalore." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yash Kant Tiwary — Creative producer",
    description: "Video, campaigns and content systems. Bangalore.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
