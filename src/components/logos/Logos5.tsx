import * as React from "react";
import { cn } from "@/lib/utils";

/** A single logo item */
export type Logo = {
  src: string;
  alt: string;
  href?: string;
  width?: number;
  height?: number;
};

export type Logos5Props = {
  /** Main heading (first line). Use `subheading` for the second line. */
  heading?: string;
  /** Optional second line under heading. */
  subheading?: string;
  /** Flat array of logos (will be auto-placed like Stats1). */
  logos?: Logo[];
  /** Optional wrapper class */
  className?: string;
  /** Optional custom logo renderer */
  renderItem?: (logo: Logo, index: number) => React.ReactNode;
};

/* -------- Container templates (same as your Stats1) -------- */

// Mobile containers
const MOBILE_CONTAINER: Record<number, string> = {
  2: "grid-cols-2 grid-rows-1",
  3: "grid-cols-4 grid-rows-2",
  4: "grid-cols-4 grid-rows-2",
  5: "grid-cols-4 grid-rows-3",
  6: "grid-cols-4 grid-rows-3",
  7: "grid-cols-4 grid-rows-4",
  8: "grid-cols-4 grid-rows-4",
};

// Desktop containers
const DESKTOP_CONTAINER: Record<number, string> = {
  2: "md:grid-cols-2 md:grid-rows-1",
  3: "md:grid-cols-3 md:grid-rows-1",
  4: "md:grid-cols-4 md:grid-rows-1",
  5: "md:grid-cols-6 md:grid-rows-2",
  6: "md:grid-cols-3 md:grid-rows-2",
  7: "md:grid-cols-8 md:grid-rows-2",
  8: "md:grid-cols-4 md:grid-rows-2",
};

// Mobile placements
const MOBILE_POS: Record<number, string[]> = {
  2: ["col-start-1", "col-start-2"],
  3: [
    "col-span-2 col-start-1",
    "col-span-2 col-start-3",
    "col-span-2 col-start-2 row-start-2",
  ],
  4: [
    "col-span-2 col-start-1",
    "col-span-2 col-start-3",
    "col-span-2 col-start-1 row-start-2",
    "col-span-2 col-start-3 row-start-2",
  ],
  5: [
    "col-span-2 col-start-1",
    "col-span-2 col-start-3",
    "col-span-2 col-start-1 row-start-2",
    "col-span-2 col-start-3 row-start-2",
    "col-span-2 col-start-2 row-start-3",
  ],
  6: [
    "col-span-2 col-start-1",
    "col-span-2 col-start-3",
    "col-span-2 col-start-1 row-start-2",
    "col-span-2 col-start-3 row-start-2",
    "col-span-2 col-start-1 row-start-3",
    "col-span-2 col-start-3 row-start-3",
  ],
  7: [
    "col-span-2 col-start-1",
    "col-span-2 col-start-3",
    "col-span-2 col-start-1 row-start-2",
    "col-span-2 col-start-3 row-start-2",
    "col-span-2 col-start-1 row-start-3",
    "col-span-2 col-start-3 row-start-3",
    "col-span-2 col-start-2 row-start-4",
  ],
  8: [
    "col-span-2 col-start-1",
    "col-span-2 col-start-3",
    "col-span-2 col-start-1 row-start-2",
    "col-span-2 col-start-3 row-start-2",
    "col-span-2 col-start-1 row-start-3",
    "col-span-2 col-start-3 row-start-3",
    "col-span-2 col-start-1 row-start-4",
    "col-span-2 col-start-3 row-start-4",
  ],
};

// Desktop placements
const DESKTOP_POS: Record<number, string[]> = {
  2: [
    "md:col-span-1 md:col-start-1 md:row-start-1",
    "md:col-span-1 md:col-start-2 md:row-start-1",
  ],
  3: [
    "md:col-span-1 md:col-start-1 md:row-start-1",
    "md:col-span-1 md:col-start-2 md:row-start-1",
    "md:col-span-1 md:col-start-3 md:row-start-1",
  ],
  4: [
    "md:col-span-1 md:col-start-1 md:row-start-1",
    "md:col-span-1 md:col-start-2 md:row-start-1",
    "md:col-span-1 md:col-start-3 md:row-start-1",
    "md:col-span-1 md:col-start-4 md:row-start-1",
  ],
  5: [
    "md:col-span-2 md:col-start-1 md:row-start-1",
    "md:col-span-2 md:col-start-3 md:row-start-1",
    "md:col-span-2 md:col-start-5 md:row-start-1",
    "md:col-span-2 md:col-start-2 md:row-start-2",
    "md:col-span-2 md:col-start-4 md:row-start-2",
  ],
  6: [
    "md:col-span-1 md:col-start-1 md:row-start-1",
    "md:col-span-1 md:col-start-2 md:row-start-1",
    "md:col-span-1 md:col-start-3 md:row-start-1",
    "md:col-span-1 md:col-start-1 md:row-start-2",
    "md:col-span-1 md:col-start-2 md:row-start-2",
    "md:col-span-1 md:col-start-3 md:row-start-2",
  ],
  7: [
    "md:col-span-2 md:col-start-1 md:row-start-1",
    "md:col-span-2 md:col-start-3 md:row-start-1",
    "md:col-span-2 md:col-start-5 md:row-start-1",
    "md:col-span-2 md:col-start-7 md:row-start-1",
    "md:col-span-2 md:col-start-2 md:row-start-2",
    "md:col-span-2 md:col-start-4 md:row-start-2",
    "md:col-span-2 md:col-start-6 md:row-start-2",
  ],
  8: [
    "md:col-span-1 md:col-start-1 md:row-start-1",
    "md:col-span-1 md:col-start-2 md:row-start-1",
    "md:col-span-1 md:col-start-3 md:row-start-1",
    "md:col-span-1 md:col-start-4 md:row-start-1",
    "md:col-span-1 md:col-start-1 md:row-start-2",
    "md:col-span-1 md:col-start-2 md:row-start-2",
    "md:col-span-1 md:col-start-3 md:row-start-2",
    "md:col-span-1 md:col-start-4 md:row-start-2",
  ],
};

/* -------- Helpers -------- */

function containerClasses(count: number): string {
  const base = "grid w-full gap-6";
  const mobile = MOBILE_CONTAINER[count] ?? "grid-cols-2";
  const desktop = DESKTOP_CONTAINER[count] ?? "";
  return cn(base, mobile, desktop);
}
function itemPos(count: number, index: number): string {
  const m = (MOBILE_POS[count] ?? [])[index] ?? "";
  const d = (DESKTOP_POS[count] ?? [])[index] ?? "";
  return cn("flex justify-center", m, d);
}

/**
 * Auto-placed logos grid (Astro-friendly).
 *
 * @remarks
 * - Accepts `heading` + optional `subheading`; each is forced onto different lines.
 * - `logos` defaults to [] for SSR safety.
 * - Uses Stats1 placement templates for deterministic layout.
 */
export function Logos5({
  heading = "Powering the world's best product teams.",
  subheading = "From next-gen startups to established enterprises.",
  logos = [],
  className,
  renderItem,
}: Logos5Props) {
  const count = Array.isArray(logos) ? logos.length : 0;

  return (
    <section className={cn("py-32", className)}>
      <div className="container space-y-10 lg:space-y-16">
        <div className="text-center">
          <h2 className="text-xl font-bold text-balance md:text-2xl lg:text-3xl">
            <span className="block">{heading}</span>
            {subheading ? (
              <span className="block mt-2 text-base font-normal text-muted-foreground md:text-lg">
                {subheading}
              </span>
            ) : null}
          </h2>
        </div>

        <div className="flex flex-col items-center w-full gap-8">
          {count > 0 && (
            <div className={containerClasses(count)}>
              {logos.map((logo, i) => {
                const node = renderItem ? (
                  renderItem(logo, i)
                ) : (
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width ?? 120}
                    height={logo.height ?? 40}
                    loading="lazy"
                    className="object-contain"
                  />
                );
                return (
                  <div key={`${logo.alt}-${i}`} className={itemPos(count, i)}>
                    {logo.href ? (
                      <a
                        href={logo.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="transition-opacity hover:opacity-70"
                        aria-label={logo.alt}
                      >
                        {node}
                      </a>
                    ) : (
                      node
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export { Logos5 as default };
