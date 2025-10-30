"use client";

import * as React from "react";
import {
  CalendarClock,
  Smartphone,
  Wrench,
  ShieldCheck,
  Handshake,
  Smile,
  type Icon as LucideIcon,
} from "lucide-react";

/* ---------------- Icon map for frontmatter control ---------------- */
const ICONS = {
  CalendarClock,
  Smartphone,
  Wrench,
  ShieldCheck,
  Handshake,
  Smile,
} satisfies Record<string, LucideIcon>;
type IconName = keyof typeof ICONS;

/* ---------------- Types ---------------- */
export interface Step {
  id: string;
  icon: IconName;
  title: string;
  description: string;
}
export interface SchedulingProps {
  padClass?: string;
  className?: string;
  heading?: string;
  subheading?: string;
  steps?: Step[]; // optional for safety

  animation?: {
    enabled?: boolean;   // default true
    once?: boolean;      // default true
    rootMargin?: string; // default "0px 0px -10% 0px"
    staggerMs?: number;  // default 90
  };
}

/* ---------------- IntersectionObserver reveal hook ---------------- */
function useReveal(
  enabled: boolean,
  {
    once = true,
    rootMargin = "0px 0px -10% 0px",
  }: { once?: boolean; rootMargin?: string } = {}
) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (!enabled) return;
    if (typeof window === "undefined") return;

    // Respect reduced motion
    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) obs.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        }
      },
      { root: null, rootMargin, threshold: 0.12 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [enabled, once, rootMargin]);

  return { ref, visible };
}

/* ---------------- Animated item wrapper ---------------- */
function AnimatedStep({
  children,
  delayMs = 0,
  active,
}: {
  children: React.ReactNode;
  delayMs?: number;
  active: boolean;
}) {
  const base =
    "transition-all duration-500 ease-out will-change-transform will-change-opacity";
  const hidden = "opacity-0 translate-y-4";
  const shown = "opacity-100 translate-y-0";
  return (
    <div style={{ transitionDelay: `${delayMs}ms` }} className={`${base} ${active ? shown : hidden}`}>
      {children}
    </div>
  );
}

/* ---------------- Component ---------------- */
export default function SchedulingSection({
  padClass,
  className,
  heading = "How Scheduling Works",
  subheading = "Fast, simple, and transparent from your first click to final cleanup.",
  steps = [], // safe default
  animation,
}: SchedulingProps) {
  const items: Step[] = Array.isArray(steps) ? steps.filter(Boolean) : [];

  const animEnabled = animation?.enabled ?? true;
  const stagger = animation?.staggerMs ?? 90;

  // Reveal observer driving the animations
  const { ref, visible } = useReveal(animEnabled, {
    once: animation?.once ?? true,
    rootMargin: animation?.rootMargin ?? "0px 0px -10% 0px",
  });

  // Dev hint if steps is wrong
  if (!Array.isArray(steps) && typeof window !== "undefined" && import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.warn("[SchedulingSection] `steps` prop is not an array. Got:", steps);
  }

  return (
    <section className={`relative ${padClass ?? ""} ${className ?? ""}`}>
      <div className="container grid gap-10 md:grid-cols-2 md:gap-16">
        {/* LEFT: Heading */}
        <div className="sticky top-24 self-start">
          <AnimatedStep active={visible} delayMs={0}>
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
              {heading}
            </h2>
            {subheading && (
              <p className="mt-4 max-w-md text-muted-foreground lg:text-lg">
                {subheading}
              </p>
            )}
          </AnimatedStep>
        </div>

        {/* RIGHT: Timeline */}
        <div ref={ref} className="-mt-8 sm:-mt-10">
          {items.length === 0 ? (
            <div className="h-4 md:h-6" /> // keeps layout from collapsing if empty
          ) : (
            items.map((step, i) => {
              const Icon = ICONS[step.icon];
              return (
                <AnimatedStep key={step.id ?? `step-${i}`} active={visible} delayMs={i * stagger}>
                  <div className="relative flex flex-col justify-center border-b border-border py-8 last:border-b-0 sm:py-10">
                    <div className="flex gap-5 sm:gap-6">
                      <div className="shrink-0 text-secondary">
                        <Icon className="size-10 sm:size-12" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h4 className="mb-2 text-2xl font-semibold text-foreground sm:text-3xl">
                          {step.title}
                        </h4>
                        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </AnimatedStep>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
