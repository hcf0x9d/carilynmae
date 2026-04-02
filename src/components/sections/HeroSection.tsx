import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import type { HeroContent } from "@/content/site";

type HeroSectionProps = {
  content: HeroContent;
};

export function HeroSection({ content }: HeroSectionProps) {
  const { heading, subheading, primaryCta, secondaryCta, image } = content;

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate w-full overflow-hidden"
    >
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        className="absolute inset-0 h-full w-full object-cover object-[-130px] md:object-center"        priority
        sizes="100vw"
      />
      {/* Mobile-only scrim so hero text reads clearly over busy imagery. */}
      <div
        className="absolute inset-0 bg-black/45 md:hidden"
        aria-hidden
      />
      <Container className="relative z-10 flex min-h-[min(70vh,52rem)] items-center py-16 sm:py-20">
        <div className="ml-auto w-full max-w-xl text-white">
          <h1 id="hero-heading" className="font-display text-h1 text-white">
            {heading}
          </h1>
          <p className="mt-6 text-body text-white/90">{subheading}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Button href={primaryCta.href} appearance="solid" tone="light">
              {primaryCta.label}
            </Button>
            <Button href={secondaryCta.href} appearance="outline" tone="light">
              {secondaryCta.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
