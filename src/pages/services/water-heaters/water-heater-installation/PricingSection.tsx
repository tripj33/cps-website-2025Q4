"use client";

import * as React from "react";
import { BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

/* ---------------- Types ---------------- */

type Fuel = "gas" | "electric";
type ButtonSize = "sm" | "default" | "lg" | "icon";
type ButtonVariant =
  | "default"
  | "outline"
  | "destructive"
  | "secondary"
  | "ghost"
  | "link";

/** Allow passing any data-* attributes (Tally, analytics, etc.) */
type DataAttrs = { [K in `data-${string}`]?: string | number | boolean };

export interface CTA extends DataAttrs {
  enabled?: boolean;
  label: string;
  href: string;
  size?: ButtonSize | null;
  variant?: ButtonVariant | null;
}

export interface FuelCopy {
  /** Price text like "$1,299" or "Starting at $1,299"—you control exact phrasing */
  price?: string;
  /** Small line under price, e.g., "for standard 40-gal replacement" */
  subline?: string;
  /** Short description for this fuel selection */
  description?: string;
}

export interface PricingPlan {
  id: string;
  enabled?: boolean;      // ← toggle the card on/off
  name: string;           // e.g., "40-Gallon", "50-Gallon", "75-Gallon"
  highlighted?: boolean;  // accent border
  features: string[];     // checklist
  /** Per-fuel copy. If a fuel key is missing, the card simply shows nothing for that field. */
  fuelCopy: Partial<Record<Fuel, FuelCopy>>;
  /** Per-card CTA control (optional). If omitted, no button appears. */
  cta?: CTA;
}

export interface PricingProps {
  padClass?: string;      // "pad-sm" | "pad-md" | "pad-lg"
  className?: string;
  heading?: string;
  subheading?: string;
  /** Gas/Electric toggle labels & default fuel */
  fuelToggle?: {
    defaultFuel?: Fuel;             // default: "gas"
    labelGas?: string;              // default: "Gas"
    labelElectric?: string;         // default: "Electric"
  };
  /** Plans (we render only those with enabled !== false) */
  plans: PricingPlan[];
  /** Optional legal/notes under the cards */
  footnote?: string;
}

/* ---------------- Utils ---------------- */

const pickDataAttrs = (obj: Record<string, unknown> | undefined) =>
  Object.fromEntries(Object.entries(obj ?? {}).filter(([k]) => k.startsWith("data-"))) as DataAttrs;

/* ---------------- Component ---------------- */

export default function PricingSection({
  padClass,
  className,
  heading = "Transparent Pricing",
  subheading = "No surprises—written price before we start. Final price confirmed on-site after venting, fuel, and code review.",
  fuelToggle,
  plans,
  footnote,
}: PricingProps) {
  const initialFuel: Fuel = fuelToggle?.defaultFuel ?? "gas";
  const [fuel, setFuel] = React.useState<Fuel>(initialFuel);

  const labelGas = fuelToggle?.labelGas ?? "Gas";
  const labelElectric = fuelToggle?.labelElectric ?? "Electric";

  const visiblePlans = React.useMemo(
    () => plans.filter((p) => p.enabled !== false),
    [plans]
  );

  return (
    <section className={`bg-background ${padClass ?? ""} ${className ?? ""}`}>
      <div className="container flex flex-col gap-10 lg:gap-12">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-semibold md:text-2xl lg:text-4xl">
            {heading}
          </h2>
          {subheading && (
            <p className="mt-4 text-muted-foreground lg:text-lg">{subheading}</p>
          )}
        </div>

        {/* Fuel toggle */}
        <div className="flex justify-center">
          <ToggleGroup
            type="single"
            value={fuel}
            onValueChange={(value) => {
              if (value === "gas" || value === "electric") setFuel(value);
            }}
            className="rounded-lg bg-muted p-1"
          >
            <ToggleGroupItem
              value="gas"
              className="h-8 w-32 rounded-md data-[state=on]:bg-background data-[state=on]:text-secondary"
            >
              {labelGas}
            </ToggleGroupItem>
            <ToggleGroupItem
              value="electric"
              className="h-8 w-32 rounded-md data-[state=on]:bg-background data-[state=on]:text-secondary"
            >
              {labelElectric}
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Pricing Cards */}
        <div className="flex flex-wrap justify-center gap-7">
          {visiblePlans.map((plan) => {
            const copy = plan.fuelCopy[fuel];
            const showCTA = !!plan.cta?.enabled && !!plan.cta?.label && !!plan.cta?.href;

            return (
              <Card
                key={plan.id}
                className={`max-w-sm rounded-3xl border ${
                  plan.highlighted ? "border-2 border-primary" : "border-border"
                } shadow-sm`}
              >
                <CardHeader>
                  <CardTitle className="text-lg font-medium text-foreground">
                    {plan.name}
                  </CardTitle>

                  {/* Price & subline (fuel-specific) */}
                  <div className="mt-4">
                    {copy?.price && (
                      <div className="text-4xl font-semibold tracking-tight text-foreground">
                        {copy.price}
                      </div>
                    )}
                    {copy?.subline && (
                      <div className="text-xs text-muted-foreground">
                        {copy.subline}
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="px-7 pt-4 pb-7">
                  {/* Description (fuel-specific) */}
                  {copy?.description && (
                    <p className="text-sm text-muted-foreground">{copy.description}</p>
                  )}

                  {/* CTA (optional, fully controlled) */}
                  {showCTA && (
                    <Button
                      asChild
                      size={plan.cta?.size ?? "lg"}
                      variant={plan.cta?.variant ?? "default"}
                      className="mt-6 w-full"
                      {...pickDataAttrs(plan.cta)}
                    >
                      <a href={plan.cta!.href}>{plan.cta!.label}</a>
                    </Button>
                  )}

                  {/* Features */}
                  {plan.features?.length ? (
                    <>
                      <div className="relative mt-10 mb-4 flex items-center justify-center overflow-hidden">
                        <Separator />
                        <span className="px-3 text-xs text-muted-foreground opacity-50">
                          WHAT’S INCLUDED
                        </span>
                        <Separator />
                      </div>

                      <ul className="mt-6 space-y-4">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center">
                            <BadgeCheck className="size-5 text-muted-foreground" />
                            <span className="ml-3 text-sm text-muted-foreground">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : null}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Footnote */}
        {footnote && (
          <p className="mx-auto max-w-3xl text-center text-sm text-muted-foreground">
            {footnote}
          </p>
        )}
      </div>
    </section>
  );
}
