import type { SampleItem } from "@/content/site";
import { AudioPlayer } from "@/components/ui/AudioPlayer";
import { cn } from "@/lib/cn";

type SampleCardProps = {
  item: SampleItem;
  className?: string;
};

export function SampleCard({ item, className }: SampleCardProps) {
  if (item.audioSrc) {
    return (
      <AudioPlayer
        title={item.title}
        audioSrc={item.audioSrc}
        className={className}
      />
    );
  }

  return (
    <article
      className={cn(
        "flex items-center gap-4 rounded-[var(--radius-card)] border border-border/60 bg-background-section px-4 py-3 sm:gap-5 sm:px-5 sm:py-4",
        className,
      )}
    >
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-white shadow-sm"
        aria-hidden
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
          <path d="M8 5v14l11-7L8 5Z" fill="currentColor" />
        </svg>
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-sans text-h4 text-foreground">{item.title}</p>
        {item.progressLabel ? (
          <p className="mt-0.5 text-small text-foreground-muted">
            {item.progressLabel}
          </p>
        ) : null}
      </div>
    </article>
  );
}
