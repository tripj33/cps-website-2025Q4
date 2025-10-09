"use client";

import * as React from "react";
import AutoScroll from "embla-carousel-auto-scroll";
import { ChevronRight, Star, Zap } from "lucide-react";
import { useMemo } from "react";
// NOTE: Astro project — do not import Next.js Link.

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

/* ---------------------------------- Types --------------------------------- */

/**
 * Represents a single testimonial entry displayed in the carousel.
 *
 * ## Fields
 * - `name` — type: `string`
 * - `role` — type: `string`
 * - `avatar` — type: `string` (URL to image)
 * - `content` — type: `string` (quoted body text)
 */
export type Testimonial = {
  /** Name of the person giving the testimonial */
  name: string;
  /** Their professional role or title */
  role: string;
  /** URL to the avatar image */
  avatar: string;
  /** The testimonial content text */
  content: string;
};

/**
 * CTA configuration for {@link Testimonial19}.
 *
 * @remarks
 * The CTA is rendered using **shadcn/ui** {@link Button}. When `href` is provided,
 * the `Button` will be rendered with `asChild` and wrap a Next.js {@link Link}.
 *
 * ## Structure
 * - `text` — type: `string` — Visible label of the CTA.
 * - `href` — type: `string | undefined` — Destination URL. If omitted, the CTA renders as a non-link button.
 * - `target` — type: `"_self" | "_blank" | "_parent" | "_top" | string | undefined` — Target browsing context (only when `href` is set).
 * - `rel` — type: `string | undefined` — Relationship hints for the link (e.g., `"noopener noreferrer"`).
 */
export type TestimonialCTA = {
  text: string;
  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
};

/**
 * Extra options for the Embla AutoScroll plugin.
 *
 * - `startDelay` — type: `number` (ms), default: `500` — Delay before auto-scrolling begins.
 * - `speed` — type: `number`, default: `0.7` — Auto-scroll speed multiplier.
 */
export type AutoScrollOptions = { startDelay?: number; speed?: number };

/**
 * Props for the {@link Testimonial19} component.
 *
 * ## Badge Props
 * - `badgeField` — type: `boolean`, default: `true`  
 *   Toggle display of the badge (icon + text).
 * - `badgeIcon` — type: `React.ElementType`, default: `Zap`  
 *   React component used as the badge icon (ignored if `badgeField=false`).
 * - `badgeText` — type: `string`, default: `"Rated 5 stars by 1000+ clients"`  
 *   Text label inside the badge (ignored if `badgeField=false`).
 *
 * ## Content Props
 * - `heading` — type: `string`, default: `"Meet our happy clients"`  
 * - `subheading` — type: `string`, default: `"Join a global network of thought leaders, product developers,"`  
 * - `cta` — type: {@link TestimonialCTA} | `null`, default: `{ text: "View all testimonials", href: "#" }`  
 *   Call-to-action configuration or `null` to hide the CTA entirely.
 *
 * ## Carousel Props
 * - `testimonials` — type: {@link Testimonial}[], default: `DEFAULT_TESTIMONIALS`  
 * - `autoScroll` — type: {@link AutoScrollOptions}, default: `{ startDelay: 500, speed: 0.7 }`  
 *   - `startDelay` — type: `number` (ms)  
 *   - `speed` — type: `number` (scroll speed multiplier)  
 *
 * ## Styling
 * - `className` — type: `string`, default: `""`  
 *   Extra Tailwind classes applied to the outer `<section>`.
 *
 * ## Button Integration (shadcn/ui)
 * - `ctaButtonProps` — type: `React.ComponentProps<typeof Button>`  
 *   **Pass-through of all shadcn/ui `Button` props to the CTA button**. This enables
 *   IntelliSense for every `Button` prop directly on this component via the nested
 *   `ctaButtonProps` object. Common props include:  
 *   - `variant`: `"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"`  
 *   - `size`: `"default" | "sm" | "lg" | "icon"`  
 *   - `disabled`: `boolean`  
 *   - `type`: `"button" | "submit" | "reset"` (effective only when CTA renders as `<button>`)  
 *   - `className`: `string` (styles **the Button**, not the `<section>`)  
 *   - `onClick`: `(ev: React.MouseEvent<HTMLButtonElement>) => void` (when no `href`)  
 *   - `asChild`: `boolean` (handled automatically when `href` is present; overriding is rarely needed)  
 *
 * ### Important
 * - When `cta.href` is defined, the Button renders as a link using `asChild` and wraps a Next.js `Link`.
 * - When `cta.href` is omitted, the Button renders as a native `<button>` and respects `type`, `onClick`, and `disabled`.
 * - To style the CTA button, provide `ctaButtonProps.className`. Use the top-level `className` to style the outer section.
 *
 * @example
 * // Internal navigation (link):
 * <Testimonial19
 *   heading="What our users say"
 *   subheading="Trusted by teams worldwide"
 *   cta={{ text: "Read more", href: "/testimonials" }}
 *   ctaButtonProps={{ variant: "secondary", size: "lg" }}
 * />
 *
 * @example
 * // No link (action button):
 * <Testimonial19
 *   cta={{ text: "Invite" }}
 *   ctaButtonProps={{ onClick: () => console.log("invited"), variant: "default" }}
 * />
 */
export type Testimonial19Props = {
  /** Whether to display the badge (icon + text). Defaults to `true`. */
  badgeField?: boolean;
  /** Icon displayed next to the badge text (ignored if `badgeField=false`). Defaults to `Zap`. */
  badgeIcon?: React.ElementType;
  /** Text displayed inside the badge (ignored if `badgeField=false`). Defaults to `"Rated 5 stars by 1000+ clients"`. */
  badgeText?: string;
  /** Main heading text. Defaults to `"Meet our happy clients"`. */
  heading?: string;
  /** Subheading text below the heading. Defaults to `"Join a global network of thought leaders, product developers,"`. */
  subheading?: string;
  /** Optional call-to-action configuration (omit with `null`). Defaults to `{ text: "View all testimonials", href: "#" }`. */
  cta?: TestimonialCTA | null;
  /** Array of testimonials to render. Defaults to `DEFAULT_TESTIMONIALS`. */
  testimonials?: Testimonial[];
  /** Auto-scroll options. Defaults to `{ startDelay: 500, speed: 0.7 }`. */
  autoScroll?: AutoScrollOptions;
  /** Extra Tailwind classes applied to the outer `<section>`. */
  className?: string;
  /**
   * All props for the shadcn/ui {@link Button} that renders the CTA.
   *
   * @remarks
   * This accepts **every** prop supported by `Button` (e.g., `variant`, `size`, `disabled`, `type`, `onClick`, `className`).
   * When `cta.href` exists, `Button` is rendered with `asChild` and wraps a `Link`.
   *
   * @type {React.ComponentProps<typeof Button>}
   * @default {}
   */
  ctaButtonProps?: React.ComponentProps<typeof Button>;
};

/* ----------------------------- Demo testimonials --------------------------- */

/** Example testimonial data used as fallback if no `testimonials` prop is provided. */
const DEFAULT_TESTIMONIALS: Testimonial[] = [
  // ... your demo items ...
];

/* -------------------------------- Component -------------------------------- */

/**
 * `Testimonial19` renders a responsive testimonial carousel with optional
 * badge, heading, subheading, **CTA rendered with shadcn/ui Button**, and auto-scrolling support.
 *
 * @remarks
 * Uses **Embla Carousel** with the `AutoScroll` plugin, styled via Tailwind CSS.
 *
 * ## Badge Props
 * - `badgeField` — type: `boolean`, default: `true` — Toggle display of the badge (icon + text).  
 * - `badgeIcon` — type: `React.ElementType`, default: `Zap` — Component used as the badge icon.  
 * - `badgeText` — type: `string`, default: `"Rated 5 stars by 1000+ clients"` — Badge label text.  
 *
 * ## Content Props
 * - `heading` — type: `string`, default: `"Meet our happy clients"`  
 * - `subheading` — type: `string`, default: `"Join a global network of thought leaders, product developers,"`  
 * - `cta` — type: {@link TestimonialCTA} | `null`, default: `{ text: "View all testimonials", href: "#" }`  
 *
 * ## Carousel Props
 * - `testimonials` — type: {@link Testimonial}[], default: `DEFAULT_TESTIMONIALS`  
 * - `autoScroll` — type: {@link AutoScrollOptions}, default: `{ startDelay: 500, speed: 0.7 }`  
 *   - `startDelay` — type: `number` (ms)  
 *   - `speed` — type: `number` (multiplier)  
 *
 * ## Styling
 * - `className` — type: `string`, default: `""`  
 *   Applied to the outer `<section>`. To style the CTA `Button`, use `ctaButtonProps.className`.
 */
const Testimonial19: React.FC<Testimonial19Props> = ({
  badgeField = true,
  badgeIcon: BadgeIcon = Zap,
  badgeText = "Rated 5 stars by 1000+ clients",
  heading = "Meet our happy clients",
  subheading = "Join a global network of thought leaders, product developers,",
  cta = { text: "View all testimonials", href: "#" },
  testimonials = DEFAULT_TESTIMONIALS,
  autoScroll = { startDelay: 500, speed: 0.7 },
  className = "",
  ctaButtonProps = {},
}) => {
  // Build the plugin instance once (or when options change)
  const autoScrollPlugin = useMemo(
    () =>
      AutoScroll({
        startDelay: autoScroll.startDelay ?? 500,
        speed: autoScroll.speed ?? 0.7,
        playOnInit: true,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    [autoScroll.startDelay, autoScroll.speed]
  );

  return (
    <section className={["py-32", className].filter(Boolean).join(" ")}>
      <div className="container flex flex-col items-center gap-4">
        {badgeField && (
          <div className="flex items-center gap-1 text-sm font-semibold">
            <BadgeIcon className="w-auto h-6 fill-primary" />
            {badgeText}
          </div>
        )}

        <h2 className="text-3xl font-semibold text-center lg:text-4xl">{heading}</h2>

        <p className="text-center text-muted-foreground lg:text-lg">{subheading}</p>

        {cta && (
          // --- CTA rendered with shadcn/ui Button ---
          cta.href ? (
            <Button asChild {...ctaButtonProps}>
              <a href={cta.href} target={cta.target} rel={cta.rel} className="inline-flex items-center gap-1 font-semibold">
                $1
              </a>
            </Button>
          ) : (
            <Button {...ctaButtonProps}>
              <span className="inline-flex items-center gap-1 font-semibold">
                {cta.text}
                <ChevronRight className="mt-0.5 h-4 w-auto" />
              </span>
            </Button>
          )
        )}
      </div>

      <div className="lg:container">
        <div className="mt-16 space-y-4">
          <Carousel
            opts={{ loop: true, dragFree: true }}
            plugins={[autoScrollPlugin]}
            setApi={(api) => {
              if (!api) return;
              requestAnimationFrame(() => {
                api.reInit();
                (autoScrollPlugin as any).play?.();
              });
            }}
            onMouseEnter={() => (autoScrollPlugin as any).stop?.()}
            onMouseLeave={() => (autoScrollPlugin as any).play?.()}
            className="relative before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-10 before:w-36 before:bg-linear-to-r before:from-background before:to-transparent after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:z-10 after:w-36 after:bg-linear-to-l after:from-background after:to-transparent"
          >
            <CarouselContent>
              {testimonials.map((t, i) => (
                <CarouselItem key={i} className="basis-[22rem] md:basis-[24rem] lg:basis-[26rem]">
                  <Card className="p-6 select-none max-w-96">
                    <div className="flex justify-between">
                      <div className="flex gap-4 mb-4">
                        <Avatar className="rounded-full size-14 ring-1 ring-input">
                          <AvatarImage src={t.avatar} alt={t.name} />
                        </Avatar>
                        <div>
                          <p className="font-medium">{t.name}</p>
                          <p className="text-sm text-muted-foreground">{t.role}</p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Star className="size-5 fill-amber-500 text-amber-500" />
                        <Star className="size-5 fill-amber-500 text-amber-500" />
                        <Star className="size-5 fill-amber-500 text-amber-500" />
                        <Star className="size-5 fill-amber-500 text-amber-500" />
                        <Star className="size-5 fill-amber-500 text-amber-500" />
                      </div>
                    </div>
                    <q className="leading-7 text-muted-foreground">{t.content}</q>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export { Testimonial19 };
