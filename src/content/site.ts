/**
 * Site copy and configuration — prefer editing here over components.
 */

export type SEO = {
  title: string;
  description: string;
  canonicalPath?: string;
  ogImage?: string;
};

export type SiteMeta = {
  name: string;
  siteName: string;
  url: string;
  defaultSeo: SEO;
};

export type NavItem = {
  label: string;
  /** In-page hash today; can become a pathname when routes exist. */
  href: string;
};

export type Cta = {
  label: string;
  href: string;
};

export type HeroContent = {
  heading: string;
  subheading: string;
  primaryCta: Cta;
  secondaryCta: Cta;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

export type ServiceIconId = "book" | "camera" | "mic";

export type ServiceItem = {
  /** Stable key for React lists and analytics (e.g. `audiobook`). */
  id: string;
  title: string;
  description: string;
  icon: ServiceIconId;
  /** Future route segment / URL path (wire up when pages exist). */
  href: string;
  /** Legacy path slug; keep aligned with `href` basename where possible. */
  slug: string;
  seoTitle?: string;
  seoDescription?: string;
};

export type ServicesContent = {
  eyebrow: string;
  heading: string;
  items: ServiceItem[];
};

export type SampleCategory =
  | "audiobook"
  | "elearning"
  | "commercial"
  | "character"
  | "other";

export type SampleItem = {
  id: string;
  title: string;
  /** When set, the samples section renders a real audio player. */
  audioSrc?: string;
  /** Shown on the placeholder row when `audioSrc` is omitted. */
  progressLabel?: string;
  description?: string;
  category?: SampleCategory;
};

export type SamplesContent = {
  eyebrow?: string;
  heading: string;
  items: SampleItem[];
};

export type AboutContent = {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

export type ContactCtaContent = {
  eyebrow: string;
  heading: string;
  description: string;
  button: Cta;
};

export type SocialLink = {
  label: string;
  /** Replace TODO placeholders before launch. */
  href: string;
};

export type FooterContent = {
  brand: string;
  tagline: string;
  contactHeading: string;
  contact: {
    email: string;
    phone?: string;
    location?: string;
  };
  socialLinks: SocialLink[];
  copyright: string;
};

export type PersonSchemaContent = {
  name: string;
  jobTitle: string;
  email?: string;
  url: string;
  image?: string;
  sameAs?: string[];
};

export type StructuredDataContent = {
  person: PersonSchemaContent;
};

export const siteMeta: SiteMeta = {
  name: "Cari Fukura",
  siteName: "Cari Fukura",
  url: "https://carifukura.com",
  defaultSeo: {
    title: "Cari Fukura | Warm, Professional Voice Over for Audiobooks and E-Learning",
    description:
      "Warm, thoughtful voice over for audiobooks, e-learning, training content, and custom storytelling projects.",
    canonicalPath: "/",
    ogImage: "/images/cari-voice-over-hero.webp",
  },
};

export const navigation: NavItem[] = [
  { label: "Home", href: "#top" },
  { label: "Voice work", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const hero: HeroContent = {
  heading: "Where your story finds its voice.",
  subheading:
    "Warm, thoughtful voice over for audiobooks, e-learning, training content, and custom storytelling projects.",
  primaryCta: { label: "Listen to samples", href: "#samples" },
  secondaryCta: { label: "Get in touch", href: "mailto:hello@carifukura.com" },

  image: {
    src: "/images/cari-hero.webp",
    alt: "Cari Fukura outdoors in warm golden-hour light, welcoming and approachable",
    width: 1920,
    height: 1080,
  },
};

export const services: ServicesContent = {
  eyebrow: "Voice work",
  heading: "Voice over services for audiobooks, training, and custom storytelling projects",
  items: [
    {
      id: "audiobook",
      title: "Audiobook Narration",
      description:
        "Fiction and non-fiction audiobook narration with warmth, clarity, and emotional depth that brings stories to life.",
      icon: "book",
      href: "/audiobook-narration",
      slug: "audiobook-narration",
      seoTitle: "Audiobook Narrator",
      seoDescription:
        "Warm, thoughtful audiobook narration for fiction and non-fiction titles.",
    },
    {
      id: "elearning",
      title: "Training & Education",
      description:
        "Clear, engaging voice over for corporate training, online courses, and educational content that keeps learners focused.",
      icon: "camera",
      href: "/e-learning",
      slug: "e-learning",
      seoTitle: "E-Learning and Training Voice Over",
      seoDescription:
        "Clear, engaging voice over for online courses, corporate training, and educational content.",
    },
    {
      id: "custom",
      title: "Custom Voice Projects",
      description:
        "Voice over for commercials, promotional content, podcast narration, and character-driven creative projects.",
      icon: "mic",
      href: "/custom-projects",
      slug: "custom-projects",
      seoTitle: "Custom Voice Over Projects",
      seoDescription:
        "Warm, versatile voice over for commercials, podcasts, promotional work, and creative projects.",
    },
  ],
};

export const samples: SamplesContent = {
  heading: "Recent samples",
  items: [
    {
      id: "fiction-dialog",
      title: "Fiction Dialog Sample",
      audioSrc: "/audio/fiction-dialog.mp3",
      description: "A sample male and female interaction in a fiction setting.",
      category: "audiobook",
    },
    {
      id: "historical-fiction-dialog",
      title: "Historical Fiction Dialog Sample",
      audioSrc: "/audio/historicalfiction-dialogue.mp3",
      description: "A sample male and female interaction with mid-western accent in a historical fiction setting.",
      category: "audiobook",
    },
    {
      id: "christian-devotional",
      title: "Christian Devotional Sample",
      audioSrc: "/audio/christian-devotional-reflection.mp3",
      description: "From a memoire.",
      category: "audiobook",
    },
    {
      id: "nonfiction-informative",
      title: "Travel Guide Sample",
      audioSrc: "/audio/nonfiction-informative.mp3",
      description: "A sample of clear, engaging voice over for a travel guide.",
      category: "audiobook",
    },
  ],
};

export const about: AboutContent = {
  eyebrow: "About",
  heading: "A professional voice artist with a passion for storytelling",
  paragraphs: [
    "I'm a professional voice artist with formal vocal training and a deep love for bringing written words to life. Whether it's a novel, training content, or a commercial, I approach every project with care and authenticity.",
    "My goal is simple: to honor your story and connect with your audience in a way that feels genuine, warm, and human."
  ],
  image: {
    src: "/images/cari-headshot.webp",
    alt: "Cari Fukura portrait with soft natural light",
    width: 800,
    height: 900,
  },
};

export const contactCta: ContactCtaContent = {
  eyebrow: "Contact",
  heading: "Have a project in mind?",
  description:
    "I’d love to hear about your project and explore how my voice over services can help bring your story to life.",
  button: { label: "Get in Touch", href: "mailto:hello@carifukura.com" },
};

export const structuredData: StructuredDataContent = {
  person: {
    name: "Cari Fukura",
    jobTitle: "Voice Over Artist",
    email: "hello@carifukura.com",
    url: "https://carifukura.com",
    image: "/images/cari-voice-artist-headshot.webp",
    sameAs: ["https://www.linkedin.com/in/cari-fukura"],
  },
};

export const footer: FooterContent = {
  brand: "Cari Fukura",
  tagline:
    "Warm, professional voice over for audiobooks, e-learning, training, and custom storytelling projects.",
  contactHeading: "Get in touch",
  contact: {
    email: "hello@carifukura.com",
  },
  socialLinks: [
    {
      label: "/in/cari-fukura",
      href: "https://www.linkedin.com/in/cari-fukura",
    },
  ],
  copyright: "© 2026 Cari Fukura. All rights reserved.",
};
