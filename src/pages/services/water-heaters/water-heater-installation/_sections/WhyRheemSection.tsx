"use client";

import * as React from "react";
import {
  ShieldCheck,
  Wrench,
  Truck,
  Flame,
  Gauge,
  Wifi,
  Building2,
  Factory,
  type Icon as LucideIcon,
} from "lucide-react";
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

export interface CTA extends DataAttrs {
  enabled?: boolean;
  label: string;
  href: string;
  size?: ButtonSize | null;
  variant?: ButtonVariant | null;
}

export interface WhyItem {
  id: string;
  title: string;
  description: string;
  icon: IconName;
}

export interface WhyRheemProps {
  padClass?: string; // "pad-sm" | "pad-md" | "pad-lg"
  className?: string;
  heading?: string;
  subheading?: string;
  items: WhyItem[]; // up to 8 (we’ll cap)
  ctas?: {
    enabled?: boolean;
    primary?: CTA;
    secondary?: CTA;
  };
}

/* ---------------- Icons ---------------- */
/* Map EVERY icon you plan to use */
const ICONS = {
  ShieldCheck,
  Wrench,
  Truck,
  Flame,
  Gauge,
  Wifi,
  Building2,
  Factory,
} as const satisfies Record<string, LucideIcon>;

/* Derive union from keys so the type stays in sync with the map */
type IconName = keyof typeof ICONS;

/* ---------------- Layout helper (matches Benefits behavior) ---------------- */
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
        smMd: {
          cols: 2,
          rows: 2,
          areas: [
            "1 / 1 / 2 / 2",
            "1 / 2 / 2 / 3",
            "2 / 1 / 3 / 2",
            "2 / 2 / 3 / 3",
          ],
        },
        lg: {
          cols: 4,
          rows: 1,
          areas: [
            "1 / 1 / 2 / 2",
            "1 / 2 / 2 / 3",
            "1 / 3 / 2 / 4",
            "1 / 4 / 2 / 5",
          ],
        },
      };
    case 5:
      return {
        smMd: {
          cols: 2,
          rows: 3,
          areas: [
            "1 / 1 / 2 / 2",
            "1 / 2 / 2 / 3",
            "2 / 1 / 3 / 2",
            "2 / 2 / 3 / 3",
            "3 / 1 / 4 / 3",
          ],
        },
        lg: {
          cols: 6,
          rows: 2,
          areas: [
            "1 / 1 / 2 / 3",
            "1 / 3 / 2 / 5",
            "1 / 5 / 2 / 7",
            "2 / 1 / 3 / 4",
            "2 / 4 / 3 / 7",
          ],
        },
      };
    case 6:
      return {
        smMd: {
          cols: 2,
          rows: 3,
          areas: [
            "1 / 1 / 2 / 2",
            "1 / 2 / 2 / 3",
            "2 / 1 / 3 / 2",
            "2 / 2 / 3 / 3",
            "3 / 1 / 4 / 2",
            "3 / 2 / 4 / 3",
          ],
        },
        lg: {
          cols: 3,
          rows: 2,
          areas: [
            "1 / 1 / 2 / 2",
            "1 / 2 / 2 / 3",
            "1 / 3 / 2 / 4",
            "2 / 1 / 3 / 2",
            "2 / 2 / 3 / 3",
            "2 / 3 / 3 / 4",
          ],
        },
      };
    case 7:
      return {
        smMd: {
          cols: 2,
          rows: 4,
          areas: [
            "1 / 1 / 2 / 2",
            "1 / 2 / 2 / 3",
            "2 / 1 / 3 / 2",
            "2 / 2 / 3 / 3",
            "3 / 1 / 4 / 2",
            "3 / 2 / 4 / 3",
            "4 / 1 / 5 / 3",
          ],
        },
        lg: {
          cols: 12,
          rows: 2,
          areas: [
            "2 / 1 / 3 / 5",
            "2 / 5 / 3 / 9",
            "2 / 9 / 3 / 13",
            "1 / 1 / 2 / 4",
            "1 / 4 / 2 / 7",
            "1 / 7 / 2 / 10",
            "1 / 10 / 2 / 13",
          ],
        },
      };
    case 8:
      return {
        smMd: {
          cols: 2,
          rows: 4,
          areas: [
            "1 / 1 / 2 / 2",
            "1 / 2 / 2 / 3",
            "2 / 1 / 3 / 2",
            "2 / 2 / 3 / 3",
            "3 / 1 / 4 / 2",
            "3 / 2 / 4 / 3",
            "4 / 1 / 5 / 2",
            "4 / 2 / 5 / 3",
          ],
        },
        lg: {
          cols: 4,
          rows: 2,
          areas: [
            "1 / 1 / 2 / 2",
            "1 / 2 / 2 / 3",
            "1 / 3 / 2 / 4",
            "1 / 4 / 2 / 5",
            "2 / 1 / 3 / 2",
            "2 / 2 / 3 / 3",
            "2 / 3 / 3 / 4",
            "2 / 4 / 3 / 5",
          ],
        },
      };
    default:
      return fallback;
  }
}

const pickDataAttrs = (obj: Record<string, unknown> | undefined) =>
  Object.fromEntries(
    Object.entries(obj ?? {}).filter(([k]) => k.startsWith("data-"))
  ) as DataAttrs;

/* ---------------- Component ---------------- */
export default function WhyRheemSection({
  padClass,
  className,
  heading = "Why Rheem®",
  subheading = "Reliable hot water with nationwide parts support and straightforward warranties. We size, vent, and install to code—then help coordinate warranty documentation so you’re covered.",
  items,
  ctas,
}: WhyRheemProps) {
  const features = React.useMemo(() => items.slice(0, 8), [items]);
  const L = React.useMemo(() => buildLayouts(features.length), [features.length]);

  const showCTAs =
    !!ctas?.enabled &&
    (!!ctas?.primary?.enabled || !!ctas?.secondary?.enabled);

  return (
    <section className={`${padClass ?? ""} ${className ?? ""}`}>
      <div className="container">
        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-semibold md:text-2xl lg:text-4xl">
            {heading}
          </h2>
          {subheading && (
            <p className="mt-4 text-muted-foreground lg:text-lg">{subheading}</p>
          )}
        </div>

        {/* ---- sm & md grid ---- */}
        <div
          className="grid mt-8 md:mt-10 lg:hidden gap-x-6 gap-y-10"
          style={{
            gridTemplateColumns: `repeat(${L.smMd.cols}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${L.smMd.rows}, minmax(0, 1fr))`,
          }}
        >
          {features.map((item, idx) => {
            const Icon = ICONS[item.icon] ?? ShieldCheck; // runtime fallback
            return (
              <div
                key={(item.id ?? `why-${idx}`) + "-sm"}
                style={{ gridArea: L.smMd.areas[idx] ?? "auto" }}
                className="relative px-3 py-8 text-center md:px-4 md:py-10"
              >
                <Icon className="mx-auto size-7 text-secondary" />
                <h3 className="mt-4 mb-2 text-lg font-semibold md:text-base lg:text-lg">
                  {item.title}
                </h3>
                <p className="text-base text-muted-foreground md:text-sm lg:text-base">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* ---- lg+ grid ---- */}
        <div
          className="relative hidden mt-8 lg:grid"
          style={{
            gridTemplateColumns: `repeat(${L.lg.cols}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${L.lg.rows}, minmax(0, 1fr))`,
          }}
        >
          {features.map((item, idx) => {
            const Icon = ICONS[item.icon] ?? ShieldCheck; // runtime fallback
            return (
              <div
                key={(item.id ?? `why-${idx}`) + "-lg"}
                style={{ gridArea: L.lg.areas[idx] ?? "auto" }}
                className="relative px-6 py-10 text-center"
              >
                <Icon className="mx-auto size-7 text-secondary" />
                <h3 className="mt-4 mb-2 text-lg font-semibold md:text-base lg:text-lg">
                  {item.title}
                </h3>
                <p className="text-base text-muted-foreground md:text-sm lg:text-base">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* ---- Optional CTAs ---- */}
        {showCTAs && (
          <div className="flex flex-col justify-center gap-3 mt-10 sm:flex-row">
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
      </div>
    </section>
  );
}
