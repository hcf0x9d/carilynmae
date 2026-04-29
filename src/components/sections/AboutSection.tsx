import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";
import type { AboutContent } from "@/content/site";

type AboutSectionProps = {
  content: AboutContent;
};

export function AboutSection({ content }: AboutSectionProps) {
  const { eyebrow, heading, paragraphs, image } = content;

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-[var(--section-y)] pt-0"
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <SectionIntro
              eyebrow={eyebrow}
              heading={heading}
              id="about-heading"
            />
            <div className="mt-8 max-w-prose space-y-5 text-body text-foreground-muted">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div
              className="relative aspect-[4/5] overflow-hidden shadow-[var(--shadow-soft)]"
              style={{ borderRadius: "var(--radius-about-image)" }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className="h-full w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
