"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

/* ---------------- Types ---------------- */
type ButtonSize = "sm" | "default" | "lg" | "icon";
type ButtonVariant =
  | "default"
  | "outline"
  | "destructive"
  | "secondary"
  | "ghost"
  | "link";

type DataAttrs = { [K in `data-${string}`]?: string | number | boolean };

export interface CTAButton extends DataAttrs {
  enabled?: boolean;
  label: string;
  href: string;
  size?: ButtonSize | null;
  variant?: ButtonVariant | null;
}

export interface CTAMedia {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  loading?: "eager" | "lazy";
  fetchpriority?: "high" | "low" | "auto";
  decoding?: "async" | "sync" | "auto";
  className?: string; // optional override
}

export interface FinalCTAProps {
  padClass?: string; // "pad-sm" | "pad-md" | "pad-lg"
  className?: string;

  heading?: string;
  body?: string;

  media: CTAMedia;

  ctas?: {
    enabled?: boolean; // toggles the button row entirely
    primary?: CTAButton;
    secondary?: CTAButton;
  };
}

/* ---------------- Utils ---------------- */
const pickDataAttrs = (obj: Record<string, unknown> | undefined) =>
  Object.fromEntries(Object.entries(obj ?? {}).filter(([k]) => k.startsWith("data-"))) as DataAttrs;

/* ---------------- Component ---------------- */
export default function FinalCTASection({
  padClass,
  className,
  heading = "Ready to replace your water heater?",
  body = "Book in under a minute. Get a 1-hour arrival window and a text when we’re en route. Upfront, written price before any work begins.",
  media,
  ctas,
}: FinalCTAProps) {
  const showButtons =
    !!ctas?.enabled && (!!ctas?.primary?.enabled || !!ctas?.secondary?.enabled);

  return (
    <section className={`${padClass ?? ""} ${className ?? ""}`}>
      <div className="container">
        <div className="flex w-full flex-col overflow-hidden rounded-lg bg-muted md:rounded-xl lg:flex-row lg:items-stretch">
          {/* Image */}
          <div className="w-full shrink-0 self-stretch lg:w-1/2">
            <img
              src={media.src}
              alt={media.alt}
              width={media.width}
              height={media.height}
              loading={media.loading ?? "lazy"}
              fetchPriority={(media.fetchpriority as any) ?? undefined}
              decoding={media.decoding ?? "async"}
              className={
                media.className ??
                "aspect-3/2 w-full rounded-t-md object-cover md:rounded-t-none md:rounded-l-md"
              }
            />
          </div>

          {/* Copy + CTAs */}
          <div className="w-full shrink-0 px-4 py-6 md:p-8 lg:w-1/2 lg:px-16 lg:py-12 flex items-center">
            <div className="w-full">
              <h3 className="mb-3 text-2xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
                {heading}
              </h3>
              {body && <p className="mb-8 text-muted-foreground lg:text-lg">{body}</p>}

              {showButtons && (
                <div className="flex flex-col gap-3 sm:flex-row">
                  {ctas?.primary?.enabled && ctas.primary.href && ctas.primary.label && (
                    <Button
                      asChild
                      size={ctas.primary.size ?? "lg"}
                      variant={ctas.primary.variant ?? "default"}
                      {...pickDataAttrs(ctas.primary)}
                    >
                      <a href={ctas.primary.href}>{ctas.primary.label}</a>
                    </Button>
                  )}

                  {ctas?.secondary?.enabled && ctas.secondary.href && ctas.secondary.label && (
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
