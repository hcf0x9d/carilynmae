import { cn } from "@/lib/cn";

export type ButtonAppearance = "solid" | "outline";
export type ButtonTone = "light" | "dark";

type CommonProps = {
  children: React.ReactNode;
  className?: string;
  /** Filled vs border-only. */
  appearance?: ButtonAppearance;
  /**
   * **dark** — for use on light surfaces (coral fill or dark border/text).
   * **light** — for use on dark surfaces (light fill or white outline/text).
   */
  tone?: ButtonTone;
};

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className"> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const base =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] px-6 py-3 text-small font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

function appearanceToneClasses(
  appearance: ButtonAppearance,
  tone: ButtonTone,
): string {
  if (appearance === "solid" && tone === "dark") {
    return "bg-accent text-white shadow-sm hover:bg-accent-hover";
  }
  if (appearance === "solid" && tone === "light") {
    return "bg-[var(--hero-cta-fill)] text-[var(--hero-cta-text)] shadow-sm hover:bg-white";
  }
  if (appearance === "outline" && tone === "dark") {
    return "border border-border bg-background-elevated text-foreground hover:border-accent-border hover:bg-accent-soft";
  }
  return "border-2 border-white bg-transparent text-white hover:bg-white/10";
}

export function Button(props: ButtonProps) {
  if ("href" in props && props.href) {
    const {
      href,
      children,
      className,
      appearance = "solid",
      tone = "dark",
      ...rest
    } = props;
    const styles = appearanceToneClasses(appearance, tone);
    return (
      <a href={href} className={cn(base, styles, className)} {...rest}>
        {children}
      </a>
    );
  }

  const {
    children,
    className,
    appearance = "solid",
    tone = "dark",
    type = "button",
    ...rest
  } = props as ButtonAsButton;
  const styles = appearanceToneClasses(appearance, tone);
  return (
    <button type={type} className={cn(base, styles, className)} {...rest}>
      {children}
    </button>
  );
}
