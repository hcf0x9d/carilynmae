import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import type { ContactCtaContent } from "@/content/site";

type ContactCtaSectionProps = {
  content: ContactCtaContent;
};

export function ContactCtaSection({ content }: ContactCtaSectionProps) {
  const { eyebrow, heading, description, button } = content;

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-accent-teal-dark py-[var(--section-y)]"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-small font-medium uppercase tracking-[0.16em] text-background">
            {eyebrow}
          </p>
          <h2
            id="contact-heading"
            className="mt-3 font-display text-h2 text-accent"
          >
            {heading}
          </h2>
          <p className="mt-5 text-body text-background">{description}</p>
          <div className="mt-8 flex justify-center">
            <Button href={button.href} className="px-8 py-3.5">
              {button.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
