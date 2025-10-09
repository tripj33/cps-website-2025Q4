import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import * as React from "react";

type Person = {
  name: string;
  role: string;
  avatarSrc: string;
};

type Stat = {
  value: string;
  label: string;
};

export type Feature120Props = {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  people?: Person[];
  heroImageSrc?: string;
  stats?: Stat[];
  className?: string;
};

export function Feature120({
  title = "Empower your business with the best tools",
  subtitle = "Explore our cutting-edge tools that help streamline processes and maximize efficiency.",
  ctaText = "Start your free trial",
  ctaHref = "#",
  people = [
    {
      name: "Emily Watson",
      role: "CEO, Visionary Tech",
      avatarSrc:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
    },
    {
      name: "Michael Lee",
      role: "CTO, Visionary Tech",
      avatarSrc:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
    },
  ],
  heroImageSrc = "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
  stats = [
    { value: "20+", label: "Years of delivering excellence" },
    { value: "100+", label: "Countries where our services are available" },
    { value: "25", label: "Prestigious awards for innovation" },
    { value: ">30k", label: "Thriving businesses using our platform" },
  ],
  className = "",
}: Feature120Props) {
  return (
    <section className={`${className}`}>
      <div className="container">
        <div className="grid items-center gap-10 md:gap-20 lg:grid-cols-2">
          <div className="flex flex-col gap-2.5 py-8">
            <h1 className="text-4xl font-bold lg:text-5xl">{title}</h1>
            <p className="text-muted-foreground">{subtitle}</p>

            <div className="flex flex-col gap-6 py-10 sm:flex-row sm:gap-16">
              {people.slice(0, 2).map((p, i) => (
                <div className="flex gap-4 leading-5" key={`${p.name}-${i}`}>
                  <Avatar className="rounded-full size-9 ring-1 ring-input">
                    <AvatarImage src={p.avatarSrc} alt={p.name} />
                  </Avatar>
                  <div className="text-sm">
                    <p className="font-medium">{p.name}</p>
                    <p className="text-muted-foreground">{p.role}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button asChild className="w-fit">
              <a href={ctaHref}>{ctaText}</a>
            </Button>
          </div>

          <img
            src={heroImageSrc}
            alt="feature hero"
            className="h-full max-h-[420px] w-full rounded-xl object-cover"
          />
        </div>

        <Separator className="my-12" />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div key={`${s.label}-${i}`}>
              <h2 className="mb-2 text-4xl font-semibold md:text-6xl">
                {s.value}
              </h2>
              <p className="text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
