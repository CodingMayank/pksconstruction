import { Hero } from "@/components/sections/Hero";
import { AboutTrust } from "@/components/sections/AboutTrust";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { VideoShowcase } from "@/components/sections/VideoShowcase";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "P.K.S. Construction | Residential Builders in Gaur Yamuna City",
  description:
    "P.K.S. Construction is a leading residential construction company in Gaur Yamuna City, Uttar Pradesh, offering new home construction, renovations, extensions, and interior finishing.",
  alternates: {
    canonical: "/",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "P.K.S. Construction",
  description:
    "P.K.S. Construction is a trusted residential construction company in Gaur Yamuna City, Uttar Pradesh, offering home construction, renovation, extension, and interior finishing services.",
  url: "https://pksconstruction.vercel.app",
  telephone: "+91 98714 17306",
  email: "pkmayank2002@gmail.com",
  image: "https://pksconstruction.vercel.app/constructions/building.png",
  logo: "https://pksconstruction.vercel.app/logo.png",
  areaServed: ["Gaur Yamuna City", "Uttar Pradesh"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "57, 6th Park View, Gaur Yamuna City",
    addressRegion: "Uttar Pradesh",
    addressCountry: "IN",
  },
  sameAs: ["https://wa.me/919871417306"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Residential construction services",
    itemListElement: [
      "New Construction",
      "Renovation & Extension",
      "Interior Finishing",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name,
      },
    })),
  },
};

export default function Home() {
  return (
    <main className="flex-grow">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Hero />
      <AboutTrust />
      <ProcessTimeline />
      <Services />
      <Portfolio />
      <VideoShowcase />
      <Testimonials />
      <Contact />
    </main>
  );
}

