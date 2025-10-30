"use client";

import * as React from "react";
import {
  ReceiptText,
  Bolt,
  Clock,
  ShieldCheck,
  Truck,
  BadgeCheck,
  type Icon as LucideIcon,
} from "lucide-react";

/** Map string names -> lucide icons for easy frontmatter control */
const ICONS = {
  ReceiptText,
  Bolt,
  Clock,
  ShieldCheck,
  Truck,
  BadgeCheck,
} satisfies Record<string, LucideIcon>;

type IconName = keyof typeof ICONS;

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  icon: IconName; // e.g. "Bolt"
}

export interface BenefitsProps {
  padClass?: string; // "pad-sm" | "pad-md" | "pad-lg"
  className?: string;
  heading?: string;
  items?: BenefitItem[]; // up to 8
}

/* -------------------------- Layout helper -------------------------- */
function buildLayouts(n: number) {
  const fallback = {
    smMd: {
      cols: 2,
      rows: Math.max(1, Math.ceil(n / 2)),
      areas: Array.from({ length: n }, () => "auto"),
    },
    lg: {
      cols: Math.min(6, Math.max(1, n)),
      rows: n > 6 ? 2 : 1,
      areas: Array.from({ length: n }, () => "auto"),
    },
  };

  switch (n) {
    case 4:
      return {
        smMd: { cols: 2, rows: 2, areas: ["1 / 1 / 2 / 2","1 / 2 / 2 / 3","2 / 1 / 3 / 2","2 / 2 / 3 / 3"] },
        lg:   { cols: 4, rows: 1, areas: ["1 / 1 / 2 / 2","1 / 2 / 2 / 3","1 / 3 / 2 / 4","1 / 4 / 2 / 5"] },
      };
    case 5:
      return {
        smMd: { cols: 2, rows: 3, areas: ["1 / 1 / 2 / 2","1 / 2 / 2 / 3","2 / 1 / 3 / 2","2 / 2 / 3 / 3","3 / 1 / 4 / 3"] },
        lg:   { cols: 6, rows: 2, areas: ["1 / 1 / 2 / 3","1 / 3 / 2 / 5","1 / 5 / 2 / 7","2 / 1 / 3 / 4","2 / 4 / 3 / 7"] },
      };
    case 6:
      return {
        smMd: { cols: 2, rows: 3, areas: ["1 / 1 / 2 / 2","1 / 2 / 2 / 3","2 / 1 / 3 / 2","2 / 2 / 3 / 3","3 / 1 / 4 / 2","3 / 2 / 4 / 3"] },
        lg:   { cols: 3, rows: 2, areas: ["1 / 1 / 2 / 2","1 / 2 / 2 / 3","1 / 3 / 2 / 4","2 / 1 / 3 / 2","2 / 2 / 3 / 3","2 / 3 / 3 / 4"] },
      };
    case 7:
      return {
        smMd: { cols: 2, rows: 4, areas: ["1 / 1 / 2 / 2","1 / 2 / 2 / 3","2 / 1 / 3 / 2","2 / 2 / 3 / 3","3 / 1 / 4 / 2","3 / 2 / 4 / 3","4 / 1 / 5 / 3"] },
        lg:   { cols: 12, rows: 2, areas: ["2 / 1 / 3 / 5","2 / 5 / 3 / 9","2 / 9 / 3 / 13","1 / 1 / 2 / 4","1 / 4 / 2 / 7","1 / 7 / 2 / 10","1 / 10 / 2 / 13"] },
      };
    case 8:
      return {
        smMd: { cols: 2, rows: 4, areas: ["1 / 1 / 2 / 2","1 / 2 / 2 / 3","2 / 1 / 3 / 2","2 / 2 / 3 / 3","3 / 1 / 4 / 2","3 / 2 / 4 / 3","4 / 1 / 5 / 2","4 / 2 / 5 / 3"] },
        lg:   { cols: 4, rows: 2, areas: ["1 / 1 / 2 / 2","1 / 2 / 2 / 3","1 / 3 / 2 / 4","1 / 4 / 2 / 5","2 / 1 / 3 / 2","2 / 2 / 3 / 3","2 / 3 / 3 / 4","2 / 4 / 3 / 5"] },
      };
    default:
      return fallback;
  }
}

/* ---------------------------- Component ---------------------------- */
export default function BenefitsSection({
  padClass,
  className,
  heading = "Why Choose Us",
  items = [],
}: BenefitsProps) {
  const features = React.useMemo(() => items.slice(0, 8), [items]);
  const L = React.useMemo(() => buildLayouts(features.length), [features.length]);

  return (
    <section className={`relative ${padClass ?? ""} ${className ?? ""}`}>
      <div className="container relative z-10 flex flex-col space-y-10 lg:space-y-14">
        <h2 className="px-0 text-3xl font-semibold md:text-2xl lg:text-4xl">
          {heading}
        </h2>

        <div className="relative mt-2 md:mt-4">
          {/* Top border */}
          <div className="bg-border absolute left-0 right-0 top-0 h-px" />

          {/* ---------- SMALL/TABLET GRID ---------- */}
          <div
            className="grid lg:hidden gap-x-6 gap-y-10"
            style={{
              gridTemplateColumns: `repeat(${L.smMd.cols}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${L.smMd.rows}, minmax(0, 1fr))`,
            }}
          >
            {features.map((feature, idx) => {
              const Icon = ICONS[feature.icon];
              return (
                <div
                  key={(feature.id ?? `benefit-${idx}`) + "-sm"}
                  style={{ gridArea: L.smMd.areas[idx] ?? "auto" }}
                  className="relative px-3 py-8 md:px-4 md:py-10"
                >
                  <div className="bg-border absolute left-0 right-0 top-0 h-px md:hidden" />
                  <div className="text-secondary relative -mt-6 mb-6 flex aspect-square w-12 items-center justify-center md:-mt-8 md:mb-8 md:w-16">
                    <Icon className="size-10 md:size-9 lg:size-10" strokeWidth={1.6} />
                  </div>
                  <div>
                    <h3 className="mb-2 max-w-[22rem] text-lg font-semibold md:text-base lg:text-lg">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-base md:text-sm lg:text-base">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ---------- LARGE GRID (with true vertical dividers) ---------- */}
          <div
            className="relative hidden lg:grid"
            style={{
              gridTemplateColumns: `repeat(${L.lg.cols}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${L.lg.rows}, minmax(0, 1fr))`,
            }}
          >
            {/* Vertical dividers */}
            {Array.from({ length: Math.max(0, L.lg.cols - 1) }).map((_, i) => (
              <span
                key={`vline-${i}`}
                className="pointer-events-none absolute top-0 bottom-0 w-px bg-border z-0"
                style={{ left: `calc(${((i + 1) / L.lg.cols) * 100}% - 0.5px)` }}
                aria-hidden="true"
              />
            ))}

            {features.map((feature, idx) => {
              const Icon = ICONS[feature.icon];
              return (
                <div
                  key={(feature.id ?? `benefit-${idx}`) + "-lg"}
                  style={{ gridArea: L.lg.areas[idx] ?? "auto" }}
                  className="relative z-10 px-6 py-10"
                >
                  <div className="text-secondary relative -mt-6 mb-6 flex aspect-square w-12 items-center justify-center md:-mt-8 md:mb-8 md:w-16">
                    <Icon className="size-10 md:size-9 lg:size-10" strokeWidth={1.6} />
                  </div>
                  <div>
                    <h3 className="mb-2 max-w-[26rem] text-lg font-semibold md:text-base lg:text-lg">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-base md:text-sm lg:text-base">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom border */}
          <div className="bg-border absolute bottom-0 left-0 right-0 h-px" />
        </div>
      </div>

      {/* Outer vertical rails (md+) */}
      <div className="container absolute inset-0 hidden h-full md:block">
        <div className="relative h-full">
          <div className="bg-border absolute inset-y-0 left-0 h-full w-px"></div>
          <div className="bg-border absolute inset-y-0 right-0 h-full w-px"></div>
        </div>
      </div>
    </section>
  );
}
