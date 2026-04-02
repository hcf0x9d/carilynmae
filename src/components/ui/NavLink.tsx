import { cn } from "@/lib/cn";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  active?: boolean;
  variant?: "default" | "header";
  onClick?: () => void;
};

export function NavLink({
  href,
  children,
  className,
  active,
  variant = "default",
  onClick,
}: NavLinkProps) {
  const isHeader = variant === "header";

  const headerClasses = cn(
    "rounded-sm px-1 py-0.5 font-medium outline-none",
    !active && "text-[var(--nav-text)]",
    !active &&
      "hover:text-[var(--nav-text-hover)] hover:underline hover:decoration-[var(--nav-decoration-hover)] hover:underline-offset-[6px]",
    active &&
      "font-semibold text-[var(--nav-text-active)] underline decoration-2 decoration-[var(--nav-decoration-active)] underline-offset-[6px]",
  );

  return (
    <a
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "transition-colors duration-150 focus-visible:rounded-sm",
        isHeader && headerClasses,
        !isHeader && "text-small text-foreground hover:opacity-80",
        !isHeader && !active && "font-medium",
        !isHeader && active && "font-semibold",
        className,
      )}
    >
      {children}
    </a>
  );
}
