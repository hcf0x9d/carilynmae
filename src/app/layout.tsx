import type { Metadata } from "next";
import { Inter, Meow_Script, Playfair_Display } from "next/font/google";
import { siteMeta } from "@/content/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: "500",
});

const meowScript = Meow_Script({
  weight: "400",
  variable: "--font-logo-script",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  manifest: "/site.webmanifest",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  title: {
    default: siteMeta.defaultSeo.title,
    template: `%s · ${siteMeta.name}`,
  },
  description: siteMeta.defaultSeo.description,
  metadataBase: new URL(siteMeta.url),
  openGraph: {
    title: siteMeta.defaultSeo.title,
    description: siteMeta.defaultSeo.description,
    url: siteMeta.url,
    siteName: siteMeta.name,
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${meowScript.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
