// src/components/FeatureServicesRow.tsx
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

type ServiceItem = {
  title: string;
  description: string;
  href: string;
  icon?: ReactNode;               // e.g., <Wrench className="h-6 w-6" />
  image?: { src: string; alt: string }; // optional image instead of icon
};

interface FeatureServicesRowProps {
  heading?: string;
  subheading?: string;
  cta?: { text: string; href: string };
  services: ServiceItem[]; // aim for 4 here; supports 2–6
}

export function FeatureServicesRow({
  heading = "Plumbing Services We Offer",
  subheading = "Fast, transparent, and done right the first time.",
  cta = { text: "See All Services", href: "/services" },
  services,
}: FeatureServicesRowProps) {
  return (
    <section className="py-20">
      <div className="container">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-y-4 md:flex-row">
            <div>
              <h2 className="text-center text-2xl font-bold md:text-left md:text-4xl">
                {heading}
              </h2>
              {subheading && (
                <p className="text-muted-foreground mt-2 text-center md:text-left">
                  {subheading}
                </p>
              )}
            </div>

            {cta && (
              <Button asChild variant="outline" size="lg">
                <a href={cta.href}>{cta.text}</a>
              </Button>
            )}
          </div>

          <div className="mt-12 grid gap-6 md:mt-16 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <a
                key={s.title}
                href={s.href}
                className="rounded-xl border bg-card p-6 shadow-sm transition hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="mb-4 flex items-center gap-4">
                  {s.image ? (
                    <img
                      src={s.image.src}
                      alt={s.image.alt}
                      className="h-10 w-10 rounded object-cover"
                    />
                  ) : (
                    <div className="rounded-lg border p-2">
                      {s.icon}
                    </div>
                  )}
                  <h3 className="text-xl font-semibold md:text-2xl">
                    {s.title}
                  </h3>
                </div>

                <p className="text-muted-foreground text-base">
                  {s.description}
                </p>
              </a>
            ))}
          </div>

          {/* Global CTA below grid (for users who scan the cards then decide) */}
          <div className="mt-10 flex justify-center">
            <Button asChild>
              <a href="/schedule">Schedule Service</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
