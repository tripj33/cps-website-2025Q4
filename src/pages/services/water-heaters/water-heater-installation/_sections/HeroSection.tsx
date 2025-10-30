"use client";

import { Star } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

/* -------------------------------------------------------
   Types
------------------------------------------------------- */

type ButtonSize = "sm" | "default" | "lg" | "icon";
type ButtonVariant =
  | "default"
  | "outline"
  | "destructive"
  | "secondary"
  | "ghost"
  | "link";

/** Allow passing ANY data-* attrs (Tally, analytics, etc.) */
type DataAttrs = { [K in `data-${string}`]?: string | number | boolean };

export interface CTA extends DataAttrs {
  enabled?: boolean;
  label: string;
  href: string;
  size?: ButtonSize | null;
  variant?: ButtonVariant | null;
}

export interface ImageMeta {
  src: string;
  alt: string;
  width: number;
  height: number;
  loading?: "lazy" | "eager";
  fetchpriority?: "high" | "low" | "auto"; // accepted in your front matter
}

export interface HeroProps {
  /** Section-level spacing utility, e.g. "pad-sm | pad-md | pad-lg" */
  padClass?: string;
  className?: string;

  /** Small uppercase line above the title */
  kicker?: string;

  /** Optional text that appears before the main heading (e.g., "Water Heater Installation") */
  titlePrefix?: string;

  /** The main heading text (e.g., "Fast, Local, Upfront") */
  heading: string;

  /** Muted line under the heading (e.g., your company or service area) */
  brandLine?: string;

  /** Lead paragraph under the title */
  subheading?: string;

  price?: {
    enabled?: boolean;
    label?: string;     // default: "Starting at"
    value?: string;     // e.g. "$1,299"
    note?: string;      // e.g. "for standard 40-gal replacement"
  };

  ctas?: {
    primary?: CTA;
    secondary?: CTA;
  };

  avatars?: { src: string; alt: string }[];

  media: {
    main: ImageMeta;
    secondary?: ImageMeta & { desktopOnly?: boolean };
  };

  trust?: { rating?: number; reviews?: number; badge?: string };
}

/* -------------------------------------------------------
   Utils
------------------------------------------------------- */

const pickDataAttrs = (obj: Record<string, unknown> | undefined) =>
  Object.fromEntries(Object.entries(obj ?? {}).filter(([k]) => k.startsWith("data-"))) as DataAttrs;

/* -------------------------------------------------------
   Component
------------------------------------------------------- */

export default function HeroSection({
  padClass,
  className,
  kicker,
  titlePrefix,
  heading,
  brandLine,
  subheading,
  price,
  ctas,
  avatars = [],
  media,
  trust = { rating: 5, reviews: 0, badge: "" },
}: HeroProps) {
  const hasButtons = !!ctas?.primary?.enabled || !!ctas?.secondary?.enabled;

  // React expects `fetchPriority` (camelCase) on <img>. Accept `fetchpriority` from front matter.
  const mainFetchPriority = (media.main.fetchpriority ?? "high") as
    | "high"
    | "low"
    | "auto";
  const secondaryFetchPriority = (media.secondary?.fetchpriority ??
    "auto") as "high" | "low" | "auto";

  return (
    <section className={`relative overflow-hidden ${padClass ?? ""} ${className ?? ""}`}>
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-x-0 -top-20 -bottom-20 bg-[radial-gradient(ellipse_35%_15%_at_40%_55%,hsl(var(--accent))_0%,transparent_100%)] lg:bg-[radial-gradient(ellipse_12%_20%_at_60%_45%,hsl(var(--accent))_0%,transparent_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 -top-20 -bottom-20 bg-[radial-gradient(ellipse_35%_20%_at_70%_75%,hsl(var(--accent))_0%,transparent_80%)] lg:bg-[radial-gradient(ellipse_15%_30%_at_70%_65%,hsl(var(--accent))_0%,transparent_80%)]" />
      {/* Background pattern */}
      <div className="pointer-events-none absolute inset-x-0 -top-20 -bottom-20 bg-[radial-gradient(hsl(var(--accent-foreground)/0.1)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_60%_at_65%_50%,#000_0%,transparent_80%)] [background-size:8px_8px]" />

      <div className="relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Left Column */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {kicker && (
              <p className="my-4 text-xs font-bold tracking-[0.30em] text-muted-foreground uppercase">
                {kicker}
              </p>
            )}

            <h1 className="text-4xl font-semibold sm:text-5xl">
              {/* fully front-matter driven */}
              {titlePrefix ? <>{titlePrefix} — </> : null}
              {heading}
              {brandLine ? (
                <>
                  <br />
                  <span className="text-muted-foreground">{brandLine}</span>
                </>
              ) : null}
            </h1>

            {subheading && (
              <p className="mt-6 max-w-xl text-muted-foreground lg:text-lg">{subheading}</p>
            )}

            {price?.enabled && price.value && (
              <p className="mt-4 text-base font-medium">
                <span className="opacity-80">{price.label ?? "Starting at"}</span>{" "}
                {price.value}
                {price.note ? <span className="text-muted-foreground"> {price.note}</span> : null}
              </p>
            )}

            {hasButtons && (
              <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                {ctas?.primary?.enabled && (
                  <Button
                    asChild
                    size={ctas.primary.size ?? "lg"}
                    variant={ctas.primary.variant ?? "default"}
                    {...pickDataAttrs(ctas.primary)}
                  >
                    <a href={ctas.primary.href}>{ctas.primary.label}</a>
                  </Button>
                )}
                {ctas?.secondary?.enabled && (
                  <Button
                    asChild
                    size={ctas.secondary.size ?? "lg"}
                    variant={ctas.secondary.variant ?? "outline"}
                    {...pickDataAttrs(ctas.secondary)}
                  >
                    <a href={ctas.secondary.href}>{ctas.secondary.label}</a>
                  </Button>
                )}
              </div>
            )}

            {(avatars.length > 0 || trust.reviews) && (
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:items-center">
                {/* Avatars */}
                {avatars.length > 0 && (
                  <div className="flex -space-x-4">
                    {avatars.map((a, i) => (
                      <Avatar
                        key={`${a.src}-${i}`}
                        className="size-14 border-2 border-background shadow-sm ring-1 ring-border"
                      >
                        <AvatarImage src={a.src} alt={a.alt} />
                      </Avatar>
                    ))}
                  </div>
                )}

                {/* Stars + Rating */}
                <div className="flex flex-col items-center sm:items-start">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-5 fill-primary" />
                    ))}
                    {typeof trust.rating === "number" && (
                      <span className="font-semibold">{trust.rating.toFixed(1)}</span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {trust.reviews ? `${trust.reviews}+ reviews` : ""}
                    {trust.badge ? ` · ${trust.badge}` : ""}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Images */}
          <div className="relative grid gap-4 lg:grid-cols-2">
            {/* Main */}
            <div className="relative aspect-3/4 w-full overflow-hidden rounded-lg bg-muted">
              <img
                src={media.main.src}
                alt={media.main.alt}
                width={media.main.width}
                height={media.main.height}
                loading={media.main.loading ?? "eager"}
                decoding="async"
                fetchPriority={mainFetchPriority}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Secondary (desktop only if configured) */}
            <div
              className={`relative aspect-3/4 w-full overflow-hidden rounded-lg bg-muted lg:mt-8 ${
                media.secondary?.desktopOnly ? "hidden lg:block" : ""
              }`}
            >
              {media.secondary && (
                <img
                  src={media.secondary.src}
                  alt={media.secondary.alt}
                  width={media.secondary.width}
                  height={media.secondary.height}
                  loading={media.secondary.loading ?? "lazy"}
                  decoding="async"
                  fetchPriority={secondaryFetchPriority}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
