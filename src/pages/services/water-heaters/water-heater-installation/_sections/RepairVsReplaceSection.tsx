"use client";

import * as React from "react";
import { CheckCircle2, CircleMinus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
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

export interface Column {
  enabled?: boolean;
  label: string;           // e.g., "Replace" or "Repair"
  tagline?: string;        // short supporting line under the label
  points: string[];        // bullet items
  mutedPoints?: string[];  // optional “not recommended” or “exceptions”
  cta?: CTA;               // optional button per column
}

export interface RepairVsReplaceProps {
  padClass?: string;       // "pad-sm" | "pad-md" | "pad-lg"
  className?: string;
  heading?: string;
  subheading?: string;
  replace: Column;         // left
  repair: Column;          // right
  footnote?: string;       // small text under grid
}

/* ---------------- Utils ---------------- */
const pickDataAttrs = (obj: Record<string, unknown> | undefined) =>
  Object.fromEntries(Object.entries(obj ?? {}).filter(([k]) => k.startsWith("data-"))) as DataAttrs;

/* ---------------- Component ---------------- */
export default function RepairVsReplaceSection({
  padClass,
  className,
  heading = "Repair vs. Replace — What’s right for your water heater?",
  subheading = "Use this quick guide to decide when a fast repair makes sense and when a full replacement protects your home and budget.",
  replace,
  repair,
  footnote,
}: RepairVsReplaceProps) {
  const showReplace = replace?.enabled !== false;
  const showRepair = repair?.enabled !== false;

  return (
    <section className={`bg-muted/50 ${padClass ?? ""} ${className ?? ""}`}>
      <div className="container">
        {/* Intro */}
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-semibold md:text-2xl lg:text-4xl">
            {heading}
          </h2>
          {subheading && (
            <p className="mx-auto max-w-4xl text-muted-foreground lg:text-lg">
              {subheading}
            </p>
          )}
        </div>

        {/* Grid */}
        <div className="mt-12 md:mt-16">
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
            {/* Replace */}
            {showReplace && (
              <div className="rounded-xl border bg-background p-6 shadow-sm">
                <div className="text-center font-medium">
                  <span className="inline-flex items-center justify-center gap-2">
                    {/* you can swap this for a brand lockup if desired */}
                    <span className="text-foreground">{replace.label}</span>
                  </span>
                  {replace.tagline && (
                    <p className="mt-1 text-sm text-muted-foreground">{replace.tagline}</p>
                  )}
                </div>

                <Separator className="my-6" />

                {/* Strong reasons TO replace */}
                <ul className="space-y-2">
                  {replace.points?.map((item, idx) => (
                    <li key={`rep-${idx}`} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Optional muted/exceptions */}
                {replace.mutedPoints?.length ? (
                  <ul className="mt-4 space-y-2">
                    {replace.mutedPoints.map((item, idx) => (
                      <li
                        key={`rep-muted-${idx}`}
                        className="flex items-start gap-2 text-muted-foreground line-through"
                      >
                        <CircleMinus className="h-5 w-5 shrink-0 opacity-60" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {/* CTA */}
                {replace.cta?.enabled && replace.cta.href && replace.cta.label && (
                  <Button
                    asChild
                    size={replace.cta.size ?? "lg"}
                    variant={replace.cta.variant ?? "default"}
                    className="mt-6 w-full"
                    {...pickDataAttrs(replace.cta)}
                  >
                    <a href={replace.cta.href}>{replace.cta.label}</a>
                  </Button>
                )}
              </div>
            )}

            {/* Repair */}
            {showRepair && (
              <div className="rounded-xl bg-border/40 p-6">
                <div className="text-center font-medium">
                  <span className="inline-flex items-center justify-center gap-2">
                    <span className="text-foreground">{repair.label}</span>
                  </span>
                  {repair.tagline && (
                    <p className="mt-1 text-sm text-muted-foreground">{repair.tagline}</p>
                  )}
                </div>

                <Separator className="my-6" />

                {/* Reasons a REPAIR may make sense */}
                <ul className="space-y-2">
                  {repair.points?.map((item, idx) => (
                    <li key={`fix-${idx}`} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Optional exclusions/notes */}
                {repair.mutedPoints?.length ? (
                  <ul className="mt-4 space-y-2">
                    {repair.mutedPoints.map((item, idx) => (
                      <li
                        key={`fix-muted-${idx}`}
                        className="flex items-start gap-2 text-muted-foreground line-through"
                      >
                        <CircleMinus className="h-5 w-5 shrink-0 opacity-60" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {/* CTA */}
                {repair.cta?.enabled && repair.cta.href && repair.cta.label && (
                  <Button
                    asChild
                    size={repair.cta.size ?? "lg"}
                    variant={repair.cta.variant ?? "outline"}
                    className="mt-6 w-full"
                    {...pickDataAttrs(repair.cta)}
                  >
                    <a href={repair.cta.href}>{repair.cta.label}</a>
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footnote */}
        {footnote && (
          <p className="mx-auto mt-10 max-w-4xl text-center text-sm text-muted-foreground">
            {footnote}
          </p>
        )}
      </div>
    </section>
  );
}
