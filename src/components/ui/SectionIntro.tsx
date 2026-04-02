import { cn } from "@/lib/cn";

type SectionIntroProps = {
  eyebrow?: string;
  heading: string;
  id?: string;
  className?: string;
  align?: "left" | "center";
};

export function SectionIntro({
  eyebrow,
  heading,
  id,
  className,
  align = "left",
}: SectionIntroProps) {
  return (
    <div
      className={cn(
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-small font-medium uppercase tracking-[0.16em] text-foreground-muted">
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className={cn(
          "font-display text-h2 text-foreground",
          eyebrow && "mt-3",
        )}
      >
        {heading}
      </h2>
    </div>
  );
}
