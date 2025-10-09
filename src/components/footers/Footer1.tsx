import * as React from "react";
import {
  FaApple,
  FaDiscord,
  FaRedditAlien,
  FaTelegramPlane,
  FaTwitter,
} from "react-icons/fa";
import { Separator } from "@/components/ui/separator";

/* ─────────────────────────────── Types ─────────────────────────────── */

/**
 * A single text link rendered under a section.
 *
 * @example
 * ```ts
 * { name: "Pricing", href: "/pricing" }
 * ```
 */
export interface FooterLink {
  /** Visible link label. */
  name: string;
  /** Destination URL (absolute or relative). */
  href: string;
}

/**
 * A column within the footer containing a title and a list of links.
 *
 * @example
 * ```ts
 * {
 *   title: "Product",
 *   links: [
 *     { name: "Overview", href: "/#overview" },
 *     { name: "Pricing", href: "/pricing" }
 *   ]
 * }
 * ```
 */
export interface FooterSection {
  /** Section heading (e.g., "Product", "Company"). */
  title: string;
  /** Links rendered under the section. */
  links: FooterLink[];
}

/**
 * Logo configuration for the header row.
 *
 * @example
 * ```ts
 * {
 *   url: "https://acme.dev",
 *   src: "/logo.svg",
 *   alt: "Acme",
 *   title: "Acme Inc."
 * }
 * ```
 */
export interface FooterLogo {
  /** Link target for the logo (usually the homepage). */
  url: string;
  /** Logo image source (SVG/PNG/etc). */
  src: string;
  /** Short alt text for the logo image. */
  alt: string;
  /** Text shown to the right of the logo mark. */
  title: string;
}

/**
 * Optional social link (icon + url).
 *
 * @remarks
 * You can pass any React node as `icon` (e.g., from `react-icons`).
 *
 * @example
 * ```ts
 * { icon: <FaTwitter />, href: "https://twitter.com/acme" }
 * ```
 */
export interface FooterSocialLink {
  /** Icon element (e.g., `<FaTwitter className="size-6" />`). */
  icon: React.ReactNode;
  /** Destination URL. */
  href: string;
}

/**
 * Store badge configuration (e.g., App Store / Google Play).
 *
 * @example
 * ```ts
 * {
 *   appStore: { href: "https://apple.com/app", icon: <FaApple /> },
 *   playStore: { href: "https://play.google.com/app", imgSrc: "/google-play.svg", imgAlt: "Google Play" }
 * }
 * ```
 */
export interface FooterStoreBadges {
  /** Apple App Store badge (icon only). */
  appStore?: { href: string; icon?: React.ReactNode };
  /** Google Play badge (as an image). */
  playStore?: { href: string; imgSrc: string; imgAlt: string };
}

/**
 * Props for the {@link Footer} component.
 *
 * @remarks
 * - All visual content is supplied via props so this component can be reused across sites/brands.
 * - If you pass `fromYear`, the copyright shows a range like `"2019–2025"`.
 *   Otherwise it shows the current year only (e.g., `"© 2025"`).
 */
export interface FooterProps {
  /**
   * Site/company logo configuration.
   * @defaultValue
   * ```ts
   * {
   *   url: "https://www.shadcnblocks.com",
   *   src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
   *   alt: "logo",
   *   title: "Shadcnblocks.com"
   * }
   * ```
   */
  logo?: FooterLogo;

  /**
   * Company or site name used in the copyright line.
   * @defaultValue `"Shadcnblocks.com"`
   */
  companyName?: string;

  /**
   * Sections rendered as columns (title + links).
   * @defaultValue
   * ```ts
   * [
   *   {
   *     title: "Product",
   *     links: [
   *       { name: "Overview", href: "#" },
   *       { name: "Pricing", href: "#" },
   *       { name: "Marketplace", href: "#" },
   *       { name: "Features", href: "#" },
   *       { name: "Integrations", href: "#" },
   *     ],
   *   },
   *   {
   *     title: "Company",
   *     links: [
   *       { name: "About", href: "#" },
   *       { name: "Team", href: "#" },
   *       { name: "Blog", href: "#" },
   *       { name: "Careers", href: "#" },
   *       { name: "Contact", href: "#" },
   *       { name: "Privacy", href: "#" },
   *     ],
   *   },
   *   {
   *     title: "Resources",
   *     links: [
   *       { name: "Help", href: "#" },
   *       { name: "Sales", href: "#" },
   *       { name: "Advertise", href: "#" },
   *     ],
   *   },
   * ]
   * ```
   */
  sections?: FooterSection[];

  /**
   * Optional “Legal” links column. If omitted, the column still renders with
   * a minimal default (“Terms of Service”, “Privacy Policy”).
   * @defaultValue
   * ```ts
   * [
   *   { name: "Term of Services", href: "#" },
   *   { name: "Privacy Policy", href: "#" }
   * ]
   * ```
   */
  legalLinks?: FooterLink[];

  /**
   * Optional social links list (icons).
   * @defaultValue
   * Icons: Discord, Reddit, Twitter, Telegram — all with `href: "#"`
   */
  socialLinks?: FooterSocialLink[];

  /**
   * Optional store badges (App Store / Google Play).
   * @defaultValue
   * App Store: Apple icon; Google Play: official badge image
   */
  storeBadges?: FooterStoreBadges;

  /**
   * If set, the copyright year becomes a range: `fromYear–currentYear`.
   * Use this for long-running businesses.
   * @example 2017
   */
  fromYear?: number;

  /** Additional classes for outer `<section>`. */
  className?: string;
}

/* ─────────────────────────────── Defaults ─────────────────────────────── */

const DEFAULT_SECTIONS: FooterSection[] = [
  {
    title: "Product",
    links: [
      { name: "Overview", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "Marketplace", href: "#" },
      { name: "Features", href: "#" },
      { name: "Integrations", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "#" },
      { name: "Team", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "#" },
      { name: "Privacy", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Help", href: "#" },
      { name: "Sales", href: "#" },
      { name: "Advertise", href: "#" },
    ],
  },
];

const DEFAULT_LEGAL: FooterLink[] = [
  { name: "Term of Services", href: "#" },
  { name: "Privacy Policy", href: "#" },
];

const DEFAULT_LOGO: FooterLogo = {
  url: "https://www.shadcnblocks.com",
  src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
  alt: "logo",
  title: "Shadcnblocks.com",
};

const DEFAULT_SOCIAL: FooterSocialLink[] = [
  { icon: <FaDiscord className="size-6" />, href: "#" },
  { icon: <FaRedditAlien className="size-6" />, href: "#" },
  { icon: <FaTwitter className="size-6" />, href: "#" },
  { icon: <FaTelegramPlane className="size-6" />, href: "#" },
];

const DEFAULT_STORE_BADGES: FooterStoreBadges = {
  appStore: { href: "#", icon: <FaApple className="text-background size-6" /> },
  playStore: {
    href: "#",
    imgSrc:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/google-play-icon.svg",
    imgAlt: "Google Play",
  },
};

/* ─────────────────────────────── Component ─────────────────────────────── */

/**
 * Reusable, brandable footer with logo, sections, legal, social links,
 * store badges, and a dynamic copyright year.
 *
 * @param props - {@link FooterProps}
 *
 * @example
 * ```tsx
 * <Footer
 *   companyName="Acme Inc."
 *   fromYear={2019}
 *   logo={{ url: "/", src: "/logo.svg", alt: "Acme", title: "Acme" }}
 *   sections={[
 *     { title: "Product", links: [{ name: "Pricing", href: "/pricing" }] },
 *     { title: "Company", links: [{ name: "About", href: "/about" }] },
 *   ]}
 *   legalLinks={[
 *     { name: "Terms", href: "/terms" },
 *     { name: "Privacy", href: "/privacy" },
 *   ]}
 *   socialLinks={[
 *     { icon: <FaTwitter className="size-6" />, href: "https://x.com/acme" },
 *   ]}
 *   storeBadges={{
 *     appStore: { href: "https://apple.com/app" },
 *     playStore: { href: "https://play.google.com/app", imgSrc: "/gp.svg", imgAlt: "Google Play" }
 *   }}
 * />
 * ```
 */
export const Footer: React.FC<FooterProps> = ({
  logo = DEFAULT_LOGO,
  companyName = "Shadcnblocks.com",
  sections = DEFAULT_SECTIONS,
  legalLinks = DEFAULT_LEGAL,
  socialLinks = DEFAULT_SOCIAL,
  storeBadges = DEFAULT_STORE_BADGES,
  fromYear,
  className,
}) => {
  const currentYear = new Date().getFullYear();
  const copyrightYear =
    typeof fromYear === "number" && fromYear < currentYear
      ? `${fromYear}–${currentYear}`
      : `${currentYear}`;

  return (
    <section className={["py-32", className].filter(Boolean).join(" ")}>
      <div className="container">
       

          <Separator className="my-14" />

          {/* Middle: sections + legal + social */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="space-y-4 text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx} className="font-medium hover:text-primary">
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h3 className="mb-4 font-bold">Legal</h3>
              <ul className="space-y-4 text-muted-foreground">
                {legalLinks.map((l, i) => (
                  <li key={i} className="font-medium hover:text-primary">
                    <a href={l.href}>{l.name}</a>
                  </li>
                ))}
              </ul>

              {socialLinks?.length ? (
                <>
                  <h3 className="mt-8 mb-4 font-bold">Social</h3>
                  <ul className="flex items-center space-x-6 text-muted-foreground">
                    {socialLinks.map((s, i) => (
                      <li key={i} className="font-medium hover:text-primary">
                        <a href={s.href} aria-label="social link">
                          {s.icon}
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>
          </div>

          <Separator className="my-14" />

          {/* Bottom: copyright */}
          <p className="text-sm text-muted-foreground">
            © {copyrightYear} {companyName}. All rights reserved.
          </p>
      </div>
    </section>
  );
};

export { Footer as Footer1 };
