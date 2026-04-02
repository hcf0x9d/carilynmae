/** Join class names, skipping falsy values. */
export function cn(...parts: Array<string | undefined | false>): string {
  return parts.filter(Boolean).join(" ");
}
