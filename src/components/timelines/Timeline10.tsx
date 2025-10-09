"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

/* ─────────────────────────────── Types ─────────────────────────────── */

/**
 * A single timeline phase step.
 */
export interface TimelinePhase {
  id: number;
  date: string;
  title: string;
  description: string;
}

/**
 * Props for the {@link Timeline10} component.
 */
export interface Timeline10Props {
  /** Array of phase steps (max 8). */
  phases: TimelinePhase[];
  /** Index of the current active phase (0-based). */
  currentPhase?: number;
  /** Heading text above the timeline. */
  heading?: string;
  /** Extra Tailwind classes on the outer `<section>`. */
  className?: string;
}

/* ─────────────────────────────── Component ─────────────────────────────── */

export const Timeline10: React.FC<Timeline10Props> = ({
  heading = "Timeline",
  phases,
  currentPhase = 0,
  className,
}) => {
  // Cap steps to 8
  const steps = React.useMemo(() => phases.slice(0, 8), [phases]);

  // Progress fraction
  const denom = Math.max(steps.length - 1, 1);
  const fraction = Math.min(Math.max(currentPhase / denom, 0), 1);

  // Mobile track measurement
  const mobileTrackRef = React.useRef<HTMLDivElement | null>(null);
  const [mobileTrackHeight, setMobileTrackHeight] = React.useState(0);

  React.useEffect(() => {
    const el = mobileTrackRef.current;
    if (!el) return;
    const parent = el.parentElement as HTMLElement | null;
    if (!parent) return;

    const ro = new ResizeObserver(() => {
      setMobileTrackHeight(parent.getBoundingClientRect().height);
    });
    ro.observe(parent);

    setMobileTrackHeight(parent.getBoundingClientRect().height);

    return () => ro.disconnect();
  }, [steps.length]);

  const mobileProgressPx = Math.max(0, mobileTrackHeight * fraction);
  const mdCols = Math.min(Math.max(steps.length, 1), 4);

  return (
    <section className={cn("bg-background py-32", className)}>
      <div className="container flex flex-col items-center">
        <h1 className="mb-10 text-3xl font-bold tracking-tighter text-center text-foreground sm:text-6xl">
          {heading}
        </h1>

        <Card className="relative w-full border-none shadow-none md:py-16">
          <CardContent className="p-0">
            <div className="relative flex flex-col items-center md:mt-12">
              {/* Desktop baseline */}
              <Separator className="absolute left-0 right-0 hidden w-full -top-8 md:block" />

              {/* Desktop progress */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${fraction * 100}%` }}
                transition={{ ease: "easeOut", duration: 1, delay: 0.5 }}
                className="absolute -top-[32px] left-0 hidden h-0.5 bg-foreground md:block"
              />

              {/* Steps grid */}
              <div className={cn("grid gap-6", `md:grid-cols-${mdCols}`)}>
                {steps.map((phase, index) => (
                  <div key={phase.id} className="relative space-y-2">
                    {/* Mobile baseline */}
                    <Separator
                      orientation="vertical"
                      className="absolute left-0 block top-6 md:hidden"
                    />

                    {/* Mobile progress */}
                    {index === 0 && (
                      <motion.div
                        ref={mobileTrackRef}
                        initial={{ height: 0 }}
                        animate={{ height: mobileProgressPx }}
                        transition={{ ease: "easeOut", duration: 0.5, delay: 0.5 }}
                        className="absolute left-0 z-10 w-0.5 bg-foreground md:hidden"
                        style={{ top: "1.5rem" }}
                      />
                    )}

                    {/* Step dot */}
                    <div className="absolute top-0 -left-[9px] z-10 mb-5 flex size-5 items-center justify-center rounded-full bg-foreground p-1 md:-top-10 md:left-0">
                      <div className="rounded-full size-full bg-background" />
                    </div>

                    {/* Content */}
                    <div className="pl-7 md:pl-0">
                      <p className="text-sm text-muted-foreground">{phase.date}</p>
                      <h2 className="text-xl font-bold tracking-tighter text-foreground">
                        {phase.title}
                      </h2>
                      <p className="text-sm text-muted-foreground">{phase.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Timeline10;
