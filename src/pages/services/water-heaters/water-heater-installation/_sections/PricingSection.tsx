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
  price?: string;
  subline?: string;
  description?: string;
}

export interface PricingPlan {
  id: string;
  enabled?: boolean;
  name: string;
  highlighted?: boolean;
  features: string[];
  fuelCopy: Partial<Record<Fuel, FuelCopy>>;
  cta?: CTA;
}

export interface PricingProps {
  padClass?: string;
  className?: string;
  heading?: string;
  subheading?: string;
  fuelToggle?: {
    defaultFuel?: Fuel;
    labelGas?: string;
    labelElectric?: string;
  };
  plans: PricingPlan[];
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
    () => plans.filter((p) => p.enabled !== false && p.fuelCopy && !!p.fuelCopy[fuel]),
    [plans, fuel]
  );

  // Dynamically decide grid layout
  const cardCount = visiblePlans.length;
  const gridClass =
    cardCount === 2
      ? // Center 2 cards as a pair with consistent spacing
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-7 justify-center max-w-4xl mx-auto"
      : // Standard 3+ layout
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 justify-center";

  return (
    <section className={`bg-background ${padClass ?? ""} ${className ?? ""}`} id="pricing">
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
            className="p-1 rounded-lg bg-muted"
          >
            <ToggleGroupItem
              value="gas"
              className="h-8 w-32 rounded-md data-[state=on]:bg-background data-[state=on]:text-secondary cursor-pointer "
            >
              {labelGas}
            </ToggleGroupItem>
            <ToggleGroupItem
              value="electric"
              className="h-8 w-32 rounded-md data-[state=on]:bg-background data-[state=on]:text-secondary cursor-pointer "
            >
              {labelElectric}
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Pricing Cards */}
        <div className={gridClass}>
          {visiblePlans.map((plan) => {
            const copy = plan.fuelCopy[fuel];
            const showCTA = !!plan.cta?.enabled && !!plan.cta?.label && !!plan.cta?.href;

            return (
              <Card
                key={plan.id}
                className={`max-w-sm w-full rounded-3xl border ${
                  plan.highlighted ? "border-2 border-primary" : "border-border"
                } shadow-sm`}
              >
                <CardHeader>
                  <CardTitle className="text-lg font-medium text-foreground">
                    {plan.name}
                  </CardTitle>

                  {/* Price & subline */}
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

                <CardContent className="pt-4 px-7 pb-7">
                  {/* Description */}
                  {copy?.description && (
                    <p className="text-sm text-muted-foreground">{copy.description}</p>
                  )}

                  {/* CTA */}
                  {showCTA && (
                    <Button
                      asChild
                      size={plan.cta?.size ?? "lg"}
                      variant={plan.cta?.variant ?? "default"}
                      className="w-full mt-6"
                      {...pickDataAttrs(plan.cta)}
                    >
                      <a href={plan.cta!.href}>{plan.cta!.label}</a>
                    </Button>
                  )}

                  {/* Features */}
                  {plan.features?.length ? (
                    <>
                      <div className="relative flex items-center justify-center mt-10 mb-4 overflow-hidden">
                        <Separator />
                        <span className="px-3 text-xs opacity-50 text-muted-foreground">
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
          <p className="max-w-3xl mx-auto text-sm text-center text-muted-foreground">
            {footnote}
          </p>
        )}
      </div>
    </section>
  );
}
