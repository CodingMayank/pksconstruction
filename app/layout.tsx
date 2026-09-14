import type { Metadata } from "next";
import { Archivo, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://pksconstruction.vercel.app",
  ),
  title: {
    default: "P.K.S. Construction | Residential Builders in Gaur Yamuna City",
    template: "%s | P.K.S. Construction",
  },
  description:
    "P.K.S. Construction is a trusted residential construction company in Gaur Yamuna City, Uttar Pradesh, specializing in house construction, renovation, extension, and interior finishing.",
  keywords: [
    "P.K.S. Construction",
    "P.K.S. Construction Gaur Yamuna City",
    "construction company in Gaur Yamuna City",
    "home construction in Gaur Yamuna City",
    "residential construction Uttar Pradesh",
    "house builder in Gaur Yamuna City",
    "renovation contractor Gaur Yamuna City",
    "interior finishing Gaur Yamuna City",
  ],
  applicationName: "P.K.S. Construction",
  authors: [{ name: "P.K.S. Construction" }],
  creator: "P.K.S. Construction",
  publisher: "P.K.S. Construction",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "P.K.S. Construction",
    title: "P.K.S. Construction | Residential Builders in Gaur Yamuna City",
    description:
      "Trusted residential construction, renovation, and finishing services in Gaur Yamuna City and surrounding Uttar Pradesh.",
    images: [
      {
        url: "/constructions/building.png",
        width: 1200,
        height: 630,
        alt: "P.K.S. Construction residential building project in Gaur Yamuna City",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "P.K.S. Construction | Residential Builders in Gaur Yamuna City",
    description:
      "Trusted residential construction, renovation, and finishing services in Gaur Yamuna City and surrounding Uttar Pradesh.",
    images: ["/constructions/building.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
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
      className={`${archivo.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
