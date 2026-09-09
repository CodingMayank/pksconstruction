import { Hero } from "@/components/sections/Hero";
import { AboutTrust } from "@/components/sections/AboutTrust";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="flex-grow">
      <Hero />
      <AboutTrust />
      <ProcessTimeline />
      <Services />
      <Portfolio />
      <Testimonials />
      <Contact />
    </main>
  );
}

