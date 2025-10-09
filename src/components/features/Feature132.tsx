// src/components/Feature132.tsx

import * as React from "react";

type Item = {
  id: number | string;
  title: string;
  imageSrc: string;
  imageAlt?: string;
  description: string;
  href?: string; // optional: whole card becomes a link
};

export interface Feature132Props {
  heading?: string;
  subheading?: string;
  cta?: { text: string; href: string };
  items: Item[]; // we render up to 8
}

/* ------------------------- */
/* Container grid templates  */
/* ------------------------- */

// Mobile containers
const MOBILE_CONTAINER: Record<number, string> = {
  1: "grid-cols-1 grid-rows-1",
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
  1: "md:grid-cols-1 md:grid-rows-1",
  2: "md:grid-cols-2 md:grid-rows-1",
  3: "md:grid-cols-3 md:grid-rows-1",
  4: "md:grid-cols-4 md:grid-rows-1",
  5: "md:grid-cols-6 md:grid-rows-2",
  6: "md:grid-cols-3 md:grid-rows-2",
  7: "md:grid-cols-8 md:grid-rows-2",
  8: "md:grid-cols-4 md:grid-rows-2",
};

/* ------------------------- */
/* Item placements           */
/* ------------------------- */

// Mobile placements (per index)
const MOBILE_POS: Record<number, string[]> = {
  1: ["col-start-1"],
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

// Desktop placements (per index)
const DESKTOP_POS: Record<number, string[]> = {
  1: ["md:col-span-1 md:col-start-1 md:row-start-1"],
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
    // (items 4 & 5)
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

function containerClasses(count: number): string {
  const base = "grid gap-6 w-full";
  const mobile = MOBILE_CONTAINER[count] ?? "grid-cols-2 grid-rows-1";
  const desktop = DESKTOP_CONTAINER[count] ?? "md:auto-rows-auto";
  return `${base} ${mobile} ${desktop}`;
}

/* ------------------------- */
/* Component                 */
/* ------------------------- */

export function Feature132({
  heading = "Welcome to Our Website",
  subheading = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.",
  cta = { text: "Get Started", href: "#" },
  items,
}: Feature132Props) {
  // Render at most 8 items to match the specified patterns
  const shown = (items ?? []).slice(0, 8);
  const count = shown.length;
  const mobilePos = MOBILE_POS[count] ?? [];
  const desktopPos = DESKTOP_POS[count] ?? [];

  return (
    <section className="py-32">
      <div className="container">
        <h2 className="mb-6 text-5xl font-semibold text-center">{heading}</h2>

        <p className="max-w-3xl m-auto text-xl text-center text-muted-foreground">
          {subheading}
        </p>

        {cta && (
          <a
            className="block px-6 py-4 mx-auto mt-8 text-sm font-semibold transition border-2 rounded-full w-fit border-muted bg-background hover:border-ring hover:text-ring"
            href={cta.href}
          >
            {cta.text}
          </a>
        )}

        <div className={`mx-auto mt-16 ${containerClasses(count)}`}>
          {shown.map((item, i) => {
            const Wrapper: any = item.href ? "a" : "div";
            const m = mobilePos[i] ?? "";
            const d = desktopPos[i] ?? "";
            return (
              <Wrapper key={item.id} href={item.href} className={[m, d].join(" ")}>
                <img
                  src={item.imageSrc}
                  alt={item.imageAlt ?? item.title}
                  className="mb-6 aspect-[5/6] w-full rounded-2xl object-cover transition hover:brightness-90"
                />
                <h6 className="mb-3 text-lg font-semibold">{item.title}</h6>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
