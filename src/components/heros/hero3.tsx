import { ArrowDownRight, Star } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useId } from "react";

/* ─────────────────────────────── Types ─────────────────────────────── */

/**
 * A single avatar shown in the review cluster.
 *
 * @example
 * ```ts
 * { src: "/avatars/alex.png", alt: "Alex Johnson" }
 * ```
 */
export interface ReviewAvatar {
  /** Image URL for the avatar. */
  src: string;
  /** Short accessible label for the avatar image. */
  alt: string;
}

/**
 * CTA button configuration.
 *
 * @example
 * ```ts
 * { text: "Get Started", url: "/signup" }
 * ```
 */
export interface CTAButton {
  /** Button text label. */
  text: string;
  /**
   * Destination URL.
   *
   * @remarks
   * - Supports absolute or relative URLs.
   * - If you pass a `tel:` URL (e.g. `tel:+18885551212`) and this is used as the
   *   **secondary** button, the component will generate an accessible aria-label like
   *   “Call now: (888) 555-1212”.
   */
  url: string;
}

/**
 * Reviews block (avatars + count + optional rating).
 *
 * @example
 * ```ts
 * {
 *   count: 200,
 *   rating: 4.9,
 *   avatars: [
 *     { src: "/a1.png", alt: "A1" },
 *     { src: "/a2.png", alt: "A2" },
 *   ]
 * }
 * ```
 */
export interface ReviewsBlock {
  /**
   * Number of reviews to display in the copy.
   * @example 200
   */
  count: number;
  /**
   * Optional average rating value (0–5).
   * @defaultValue 5
   * @example 4.8
   */
  rating?: number;
  /**
   * Array of avatar images rendered in the cluster.
   * @remarks purely decorative visually; the accessible rating string is provided separately.
   */
  avatars: ReviewAvatar[];
}

/**
 * Hero image configuration.
 *
 * @example
 * ```ts
 * { src: "/hero.webp", alt: "Dashboard preview" }
 * ```
 */
export interface HeroImage {
  /** Image URL for the hero visual. */
  src: string;
  /** Short alt text describing the image. */
  alt: string;
}

/**
 * Props for the {@link Hero3} component.
 *
 * @remarks
 * - `heading`/`description` are plain text by default. Set `allowHTML` to `true`
 *   to render sanitized HTML (see {@link sanitizeHtmlLite}).
 * - `buttons.secondary` can be a `tel:` URL. If so, an accessible aria-label is auto-generated.
 */
export interface Hero3Props {
  /**
   * Main heading (H1). Rendered as plain text by default.
   * @defaultValue "Blocks built with Shadcn & Tailwind"
   */
  heading?: string;

  /**
   * Supporting paragraph beneath the heading.
   * @defaultValue "Finely crafted components built with React, Tailwind and Shadcn UI..."
   */
  description?: string;

  /**
   * Opt-in for rendering `heading` and `description` as **sanitized HTML**.
   *
   * @defaultValue false
   *
   * @remarks
   * - Uses a minimal sanitizer that strips `<script>`, `<style>`,
   *   inline event handlers, and `javascript:` URLs.
   * - For untrusted content, consider a full DOM sanitizer (e.g., DOMPurify).
   */
  allowHTML?: boolean;

  /**
   * Primary/secondary CTA button configs.
   *
   * @defaultValue
   * ```ts
   * {
   *   primary:  { text: "Sign Up",     url: "https://www.shadcnblocks.com" },
   *   secondary:{ text: "Get Started", url: "https://www.shadcnblocks.com" }
   * }
   * ```
   */
  buttons?: {
    /** Primary CTA button. */
    primary?: CTAButton;
    /**
     * Secondary CTA button.
     * @remarks If `url` starts with `tel:`, an aria-label like “Call now: (xxx) xxx-xxxx” is generated.
     */
    secondary?: CTAButton;
  };

  /**
   * Reviews block showing avatars, rating, and count.
   *
   * @defaultValue
   * ```ts
   * {
   *   count: 200,
   *   rating: 5.0,
   *   avatars: [
   *     { src: ".../avatar-1.webp", alt: "Avatar 1" },
   *     { src: ".../avatar-2.webp", alt: "Avatar 2" },
   *     { src: ".../avatar-3.webp", alt: "Avatar 3" },
   *     { src: ".../avatar-4.webp", alt: "Avatar 4" },
   *     { src: ".../avatar-5.webp", alt: "Avatar 5" }
   *   ]
   * }
   * ```
   */
  reviews?: ReviewsBlock;

  /**
   * Right-column hero image configuration.
   * @defaultValue `{ src: ".../placeholder-1.svg", alt: "placeholder hero" }`
   */
  image?: HeroImage;
}

/* ───────────────────────────── Helpers ───────────────────────────── */

/**
 * Very small, SSR-safe sanitizer for trusted UI snippets.
 *
 * @param html - HTML string to sanitize.
 * @returns Sanitized HTML with risky patterns removed.
 *
 * @remarks
 * - Removes `<script>`/`<style>` blocks
 * - Removes inline event handlers (e.g., `onClick="..."`)
 * - Removes `javascript:` URLs in attributes
 *
 * @example
 * ```ts
 * const safe = sanitizeHtmlLite('<b onclick="evil()">Hi</b>'); // "<b>Hi</b>"
 * ```
 */
export function sanitizeHtmlLite(html: string) {
  return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/\son\w+='[^']*'/gi, "")
    .replace(/\shref="javascript:[^"]*"/gi, "")
    .replace(/\shref='javascript:[^']*'/gi, "");
}

/**
 * Formats a `tel:` URL into a friendly aria-label (US numbers).
 *
 * @param url - A `tel:` URL like `tel:+18885551212`.
 * @param fallbackText - Prefix text when formatting; defaults to `"Call now"`.
 * @returns An aria-label like `"Call now: (888) 555-1212"`, or `fallbackText` if parsing fails.
 *
 * @example
 * ```ts
 * formatTelAriaLabel("tel:+18885551212") // "Call now: (888) 555-1212"
 * ```
 */
export function formatTelAriaLabel(url: string, fallbackText = "Call now") {
  const m = url.match(/^tel:\+?1?(\d{3})(\d{3})(\d{4})$/);
  if (!m) return fallbackText;
  return `${fallbackText}: (${m[1]}) ${m[2]}-${m[3]}`;
}

/* ───────────────────────────── Component ───────────────────────────── */

/**
 * Split-layout hero with heading, description, avatar/rating block, CTAs,
 * and a right-column image. Supports optional sanitized HTML for text fields.
 *
 * @param props - {@link Hero3Props}
 *
 * @remarks
 * - When `allowHTML` is `true`, `heading` and `description` render via
 *   `dangerouslySetInnerHTML` after passing through {@link sanitizeHtmlLite}.
 * - If `buttons.secondary.url` starts with `tel:`, an accessible aria-label is
 *   generated using {@link formatTelAriaLabel}.
 *
 * @example
 * ```tsx
 * <Hero3
 *   heading="Plumbing, done right."
 *   description="Affordable installs & 24/7 emergency service."
 *   buttons={{
 *     primary: { text: "Book Service", url: "/book" },
 *     secondary: { text: "Call Now", url: "tel:+18005550123" }
 *   }}
 *   reviews={{
 *     count: 320,
 *     rating: 4.9,
 *     avatars: [
 *       { src: "/a1.webp", alt: "Sally" },
 *       { src: "/a2.webp", alt: "Jon" },
 *     ],
 *   }}
 *   image={{ src: "/truck.webp", alt: "Our service truck" }}
 * />
 * ```
 */
export const Hero3 = ({
  heading = "Blocks built with Shadcn & Tailwind",
  description =
    "Finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.",
  allowHTML = false,
  buttons = {
    primary: { text: "Sign Up", url: "https://www.shadcnblocks.com" },
    secondary: { text: "Get Started", url: "https://www.shadcnblocks.com" },
  },
  reviews = {
    count: 200,
    rating: 5.0,
    avatars: [
      { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp", alt: "Avatar 1" },
      { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp", alt: "Avatar 2" },
      { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp", alt: "Avatar 3" },
      { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp", alt: "Avatar 4" },
      { src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp", alt: "Avatar 5" },
    ],
  },
  image = {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
    alt: "placeholder hero",
  },
}: Hero3Props) => {
  const headingId = useId();

  // Normalize rating and accessible text
  const ratingValue = typeof reviews.rating === "number" ? reviews.rating : 5.0;
  const ratingText = `${ratingValue.toFixed(1)} out of 5 stars from ${reviews.count}+ reviews`;

  // Secondary button a11y (supports tel:)
  const secondaryIsTel = !!buttons?.secondary?.url?.startsWith("tel:");
  const secondaryAriaLabel = secondaryIsTel
    ? formatTelAriaLabel(buttons!.secondary!.url, buttons!.secondary!.text)
    : buttons?.secondary?.text;

  return (
    <section aria-labelledby={headingId}>
      <div className="container grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        {/* Left Column: Text + CTAs */}
        <div className="flex flex-col items-center mx-auto text-center md:ml-auto lg:max-w-3xl lg:items-start lg:text-left">
          {/* Heading */}
          {allowHTML ? (
            <h1
              id={headingId}
              className="my-6 text-4xl font-bold text-pretty lg:text-6xl xl:text-7xl"
              dangerouslySetInnerHTML={{ __html: sanitizeHtmlLite(heading) }}
            />
          ) : (
            <h1 id={headingId} className="my-6 text-4xl font-bold text-pretty lg:text-6xl xl:text-7xl">
              {heading}
            </h1>
          )}

          {/* Description */}
          {allowHTML ? (
            <p
              className="max-w-xl mb-8 text-muted-foreground lg:text-xl"
              dangerouslySetInnerHTML={{ __html: sanitizeHtmlLite(description) }}
            />
          ) : (
            <p className="max-w-xl mb-8 text-muted-foreground lg:text-xl">{description}</p>
          )}

          {/* Avatars + Rating */}
          <div className="flex flex-col items-center gap-4 mb-12 w-fit sm:flex-row">
            {/* Avatar cluster is decorative */}
            <span className="inline-flex items-center -space-x-4" aria-hidden="true">
              {reviews.avatars.map((avatar, index) => (
                <Avatar key={index} className="border size-12">
                  <AvatarImage src={avatar.src} alt={avatar.alt} />
                </Avatar>
              ))}
            </span>

            {/* Accessible rating */}
            <div>
              <div className="flex items-center gap-1" aria-label={ratingText}>
                {[...Array(5)].map((_, index) => (
                  <Star key={index} className="text-yellow-400 size-5 fill-yellow-400" aria-hidden="true" />
                ))}
                <span className="mr-1 font-semibold" aria-hidden="true">
                  {ratingValue.toFixed(1)}
                </span>
              </div>
              <p className="font-medium text-left text-muted-foreground" aria-hidden="true">
                from {reviews.count}+ reviews
              </p>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col justify-center w-full gap-2 sm:flex-row lg:justify-start">
            {buttons?.primary && (
              <Button asChild className="w-full sm:w-auto">
                <a href={buttons.primary.url} aria-label={buttons.primary.text}>
                  {buttons.primary.text}
                </a>
              </Button>
            )}

            {buttons?.secondary && (
              <Button asChild variant="outline">
                <a href={buttons.secondary.url} aria-label={secondaryAriaLabel}>
                  {buttons.secondary.text}
                  <ArrowDownRight className="size-4" aria-hidden="true" />
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Right Column: Image */}
        <div className="flex">
          <img
            src={image.src}
            alt={image.alt}
            className="w-full max-h-[600px] rounded-md object-cover lg:max-h-[800px]"
          />
        </div>
      </div>
    </section>
  );
};

