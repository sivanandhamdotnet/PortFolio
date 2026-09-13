import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0B1512",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Sivanandham S — Backend Software Development Engineer",
  description:
    "Backend Software Development Engineer specializing in Python, Django, REST APIs, databases, integrations and AI-powered backend systems.",
  keywords: [
    "Sivanandham S",
    "Backend Software Development Engineer",
    "Python",
    "Django",
    "Django REST Framework",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "Celery",
    "Scalable Backend Systems",
    "Travel Booking Platform",
    "AI Document Processing",
    "Dynamic Pricing",
    "API Optimization",
  ],
  authors: [{ name: "Sivanandham S" }],
  creator: "Sivanandham S",
  publisher: "Sivanandham S",
  metadataBase: new URL("https://sivanandham.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sivanandham S — Backend Software Development Engineer",
    description:
      "Backend Software Development Engineer specializing in Python, Django, REST APIs, databases, integrations and AI-powered backend systems.",
    url: "https://sivanandham.dev",
    siteName: "Sivanandham S Portfolio",
    images: [
      {
        url: "/portrait.png",
        width: 682,
        height: 1024,
        alt: "Sivanandham S — Backend Software Development Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sivanandham S — Backend Software Development Engineer",
    description:
      "Backend Software Development Engineer specializing in Python, Django, REST APIs, databases, integrations and AI-powered backend systems.",
    images: ["/portrait.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-bone-100 text-forest-900 font-sans antialiased selection:bg-clay-500 selection:text-bone-50">
        {children}
      </body>
    </html>
  );
}
