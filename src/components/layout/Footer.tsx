import { Container } from "@/components/layout/Container";
import type { FooterContent } from "@/content/site";

type FooterProps = {
  content: FooterContent;
};

function isPlaceholderSocialHref(href: string) {
  return href === "" || href.startsWith("TODO_");
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="m4 7 8 5 8-5M4 7v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7M4 7 20 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function Footer({ content: footer }: FooterProps) {
  return (
    <footer className="border-t border-border bg-surface py-14">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="font-sans text-h4 text-foreground">{footer.brand}</p>
            <p className="mt-3 max-w-md text-body text-foreground-muted">
              {footer.tagline}
            </p>
          </div>
          <div>
            <h2 className="font-sans text-h4 text-foreground">
              {footer.contactHeading}
            </h2>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`mailto:${footer.contact.email}`}
                  className="inline-flex items-center gap-2 text-small font-medium text-footer-link transition-colors hover:text-footer-link-hover"
                >
                  <MailIcon className="h-4 w-4 shrink-0" />
                  {footer.contact.email}
                </a>
              </li>
              {footer.socialLinks.map((link) => (
                <li key={link.label}>
                  {isPlaceholderSocialHref(link.href) ? (
                    <span className="inline-flex items-center gap-2 text-small text-foreground-muted">
                      <LinkedInIcon className="h-4 w-4 shrink-0" />
                      {link.label}{" "}
                      <span className="font-normal">(link coming soon)</span>
                    </span>
                  ) : (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-small font-medium text-footer-link transition-colors hover:text-footer-link-hover"
                    >
                      <LinkedInIcon className="h-4 w-4 shrink-0" />
                      {link.label}
                      <span className="sr-only"> (opens in new tab)</span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-14 border-t border-border/80 pt-8 text-center text-small text-foreground-muted">
          {footer.copyright}
        </p>
      </Container>
    </footer>
  );
}
