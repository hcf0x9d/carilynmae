import type { ServiceIconId, ServiceItem } from "@/content/site";
import { cn } from "@/lib/cn";

type ServiceCardProps = {
  item: ServiceItem;
  className?: string;
};

const iconClass = "h-7 w-7 text-accent";

function ServiceIcon({ id }: { id: ServiceIconId }) {
  switch (id) {
    case "book":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 7h8M8 11h6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "camera":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      );
    case "mic":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19 11a7 7 0 0 1-14 0M12 18v3M8 22h8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return null;
  }
}

export function ServiceCard({ item, className }: ServiceCardProps) {
  return (
    <article
      className={cn(
        "flex flex-col rounded-[var(--radius-card)] border border-border/80 p-6",
        className,
      )}
      data-service-id={item.id}
      data-service-href={item.href}
    >
      <div
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft"
        aria-hidden
      >
        <ServiceIcon id={item.icon} />
      </div>
      <h3 className="font-display text-h3 text-foreground">{item.title}</h3>
      <p className="mt-2 flex-1 text-body text-foreground-muted">
        {item.description}
      </p>
    </article>
  );
}
