import { Footer } from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactCtaSection } from "@/components/sections/ContactCtaSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { SamplesSection } from "@/components/sections/SamplesSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import {
  about,
  contactCta,
  footer,
  hero,
  navigation,
  samples,
  services,
  siteMeta,
} from "@/content/site";

export default function HomePage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-background-elevated focus:px-4 focus:py-2 focus:text-small focus:shadow-lg"
      >
        Skip to main content
      </a>
      <div id="top" aria-hidden="true" className="h-0 w-full overflow-hidden" />
      <SiteHeader brandName={siteMeta.name} navigation={navigation} />
      <main id="main">
        <HeroSection content={hero} />
        <ServicesSection content={services} />
        <SamplesSection content={samples} />
        <AboutSection content={about} />
        <ContactCtaSection content={contactCta} />
      </main>
      <Footer content={footer} />
    </>
  );
}
