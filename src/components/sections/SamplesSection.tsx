import { Container } from "@/components/layout/Container";
import { SampleCard } from "@/components/cards/SampleCard";
import { SectionIntro } from "@/components/ui/SectionIntro";
import type { SamplesContent } from "@/content/site";

type SamplesSectionProps = {
  content: SamplesContent;
};

export function SamplesSection({ content }: SamplesSectionProps) {
  const { eyebrow, heading, items } = content;

  return (
    <section
      id="samples"
      aria-labelledby="samples-heading"
      className="pb-[var(--section-y)]"
    >
      <Container>
        <SectionIntro
          eyebrow={eyebrow}
          heading={heading}
          id="samples-heading"
          align="center"
        />
        <div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-2 md:gap-6">
          {items.map((item) => (
            <SampleCard key={item.id} item={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}
