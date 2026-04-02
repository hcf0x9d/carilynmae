import { Container } from "@/components/layout/Container";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { SectionIntro } from "@/components/ui/SectionIntro";
import type { ServicesContent } from "@/content/site";

type ServicesSectionProps = {
  content: ServicesContent;
};

export function ServicesSection({ content }: ServicesSectionProps) {
  const { eyebrow, heading, items } = content;

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-background-elevated py-[var(--section-y)]"
    >
      <Container>
        <SectionIntro
          eyebrow={eyebrow}
          heading={heading}
          id="services-heading"
          align="center"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {items.map((item) => (
            <ServiceCard key={item.id} item={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}
