// src/components/Feature132.tsx
import { Button } from "@/components/ui/button";

type Item = {
  id: number | string;
  title: string;
  imageSrc: string;
  imageAlt?: string;
  description: string;
  href?: string; // optional: whole card becomes a link
};

interface Feature132Props {
  heading?: string;
  subheading?: string;
  cta?: { text: string; href: string };
  items: Item[]; // we'll render up to 6
}

export function Feature132({
  heading = "Welcome to Our Website",
  subheading = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.",
  cta = { text: "Get Started", href: "#" },
  items,
}: Feature132Props) {
  // show at most 6 (per your spec)
  const shown = (items ?? []).slice(0, 6);
  const count = shown.length;

  // Tailwind can't read dynamic strings, so choose from explicit classes:
  // ≤4 → that many columns; 5/6 → 3 columns
  const lgColsClass =
    count >= 5
      ? "lg:grid-cols-3"
      : count === 4
      ? "lg:grid-cols-4"
      : count === 3
      ? "lg:grid-cols-3"
      : count === 2
      ? "lg:grid-cols-2"
      : "lg:grid-cols-1";

  // For 5 items: top row 3, bottom row 2 centered → make 4th item start at col 2
  const needsFiveFix = count === 5;

  return (
    <section className="">
      <div className="container">
        <h2 className="mb-6 text-5xl font-semibold text-center">{heading}</h2>

        <p className="max-w-3xl m-auto text-xl text-center text-muted-foreground">
          {subheading}
        </p>

        {cta && (
          <a
            className="block px-6 py-4 mx-auto mt-8 text-sm font-semibold transition border-2 rounded-full border-muted bg-background hover:border-ring hover:text-ring w-fit"
            href={cta.href}
          >
            {cta.text}
          </a>
        )}

        {/* GRID: same visual layout, now reliable + centered rows */}
        <div className={`mx-auto mt-16 grid gap-12 grid-cols-2 ${lgColsClass}`}>
          {shown.map((item, idx) => {
            const Wrapper: any = item.href ? "a" : "div";
            // When we have exactly 5 items, center the second row (items 4 & 5)
            // by starting the 4th item (index 3) at column 2 on lg screens.
            const fiveFixClass = needsFiveFix && idx === 3 ? "lg:col-start-2" : "";

            // For mobile: center the last item if we have an odd number of items
            const mobileCenterClass = count % 2 === 1 && idx === count - 1 ? "sm:col-start-2" : "";

            return (
              <Wrapper key={item.id} href={item.href} className={`${fiveFixClass} ${mobileCenterClass}`}>
                <img
                  src={item.imageSrc}
                  alt={item.imageAlt ?? item.title}
                  className="mb-6 w-full rounded-2xl object-cover aspect-[5/6] transition hover:brightness-90 "
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
