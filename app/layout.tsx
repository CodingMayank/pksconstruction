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
    default: "P.K.S. Construction | Home Construction in Gaur Yamuna City",
    template: "%s | P.K.S. Construction",
  },
  description:
    "P.K.S. Construction builds and renovates residential homes in Gaur Yamuna City and across Uttar Pradesh, from foundation to handover.",
  keywords: [
    "home construction in Gaur Yamuna City",
    "residential construction Uttar Pradesh",
    "house construction Gaur Yamuna City",
    "P.K.S. Construction",
  ],
  applicationName: "P.K.S. Construction",
  authors: [{ name: "P.K.S. Construction" }],
  creator: "P.K.S. Construction",
  publisher: "P.K.S. Construction",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "P.K.S. Construction",
    title: "P.K.S. Construction | Home Construction in Gaur Yamuna City",
    description:
      "Residential construction, renovation, and finishing services in Gaur Yamuna City and surrounding Uttar Pradesh.",
    images: [
      {
        url: "/constructions/building.png",
        width: 1200,
        height: 630,
        alt: "Residential construction project by P.K.S. Construction",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "P.K.S. Construction | Home Construction in Gaur Yamuna City",
    description:
      "Residential construction, renovation, and finishing services in Gaur Yamuna City and surrounding Uttar Pradesh.",
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
