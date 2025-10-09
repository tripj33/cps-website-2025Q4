import * as React from "react";

/**
 * Describes a single statistic rendered by {@link Stats1}.
 *
 * The object is deliberately minimal so you control formatting in `renderItem`
 * when needed. The default rendering assumes a large numeric **value** and a
 * smaller descriptive **label** beneath it.
 */
export type Stat = {
  /**
   * Primary stat content shown prominently.
   *
   * @example "120k"
   * @example "99.95%"
   * @example "$1.2M"
   *
   * @remarks
   * - Provide the final, already-formatted string (e.g., include units/suffixes).
   * - Keep it concise (ideally ≤ 8–10 characters) to avoid wrapping at small sizes.
   */
  value: string;

  /**
   * Short, human-readable description for the stat.
   *
   * @example "Active Users"
   * @example "Uptime"
   * @example "ARR"
   *
   * @remarks
   * - Aim for ≤ 3 words for balance in tight layouts.
   * - Acts as the accessible label for the value in the default renderer.
   */
  label: string;
};

/**
 * Props for the {@link Stats1} component.
 */
export type Stats1Props = {
  /**
   * Array of statistics to display.
   *
   * @example
   * ```ts
   * [
   *   { value: "120k", label: "Active Users" },
   *   { value: "99.9%", label: "Uptime" },
   *   { value: "24/7", label: "Support" },
   * ]
   * ```
   *
   * @remarks
   * - The layout maps provide deterministic placement for counts **2–8**.
   * - For counts outside that range, a simple 2-column mobile grid is used
   *   with auto rows on desktop.
   */
  stats: Stat[];

  /**
   * Additional Tailwind classes appended to the root grid container.
   *
   * @defaultValue `""`
   *
   * @example "mt-12"
   * @example "max-w-5xl mx-auto"
   */
  className?: string;

  /**
   * Optional custom item renderer. When provided, it replaces the default
   * value/label block for each statistic.
   *
   * @param stat - The `Stat` object for this cell.
   * @param index - Zero-based index of the stat in the `stats` array.
   * @returns A React node rendered inside the positioned grid cell.
   *
   * @example
   * ```tsx
   * <Stats1
   *   stats={[{ value: "4.9/5", label: "App Store" }]}
   *   renderItem={(stat) => (
   *     <figure className="text-center">
   *       <figcaption className="text-sm text-muted-foreground">{stat.label}</figcaption>
   *       <div className="mt-1 text-5xl font-semibold">{stat.value}</div>
   *     </figure>
   *   )}
   * />
   * ```
   *
   * @remarks
   * - You’re responsible for headings/semantics in the custom renderer.
   * - The parent cell already centers content with `flex justify-center`.
   */
  renderItem?: (stat: Stat, index: number) => React.ReactNode;
};

/* ──────────────── Container templates (mobile/desktop by count) ─────────────── */

const MOBILE_CONTAINER: Record<number, string> = {
  2: "grid-cols-2 grid-rows-1",
  3: "grid-cols-4 grid-rows-2",
  4: "grid-cols-4 grid-rows-2",
  5: "grid-cols-4 grid-rows-3",
  6: "grid-cols-4 grid-rows-3",
  7: "grid-cols-4 grid-rows-4",
  8: "grid-cols-4 grid-rows-4",
};

const DESKTOP_CONTAINER: Record<number, string> = {
  2: "md:grid-cols-2 md:grid-rows-1",
  3: "md:grid-cols-3 md:grid-rows-1",
  4: "md:grid-cols-4 md:grid-rows-1",
  5: "md:grid-cols-6 md:grid-rows-2",
  6: "md:grid-cols-3 md:grid-rows-2",
  7: "md:grid-cols-8 md:grid-rows-2",
  8: "md:grid-cols-4 md:grid-rows-2",
};

/* ──────────────── Per-item placement maps (index → class list) ─────────────── */

const MOBILE_POS: Record<number, string[]> = {
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

const DESKTOP_POS: Record<number, string[]> = {
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

/**
 * Build the responsive grid container class string for a given item count.
 *
 * @param count - Number of stats to display.
 * @returns Tailwind classes combining base, mobile, and desktop rules.
 *
 * @example
 * ```ts
 * containerClasses(5)
 * // -> "grid gap-6 w-full grid-cols-4 grid-rows-3 md:grid-cols-6 md:grid-rows-2"
 * ```
 */
function containerClasses(count: number): string {
  const base = "grid gap-6 w-full";
  const mobile = MOBILE_CONTAINER[count] ?? "grid-cols-2 grid-rows-1";
  const desktop = DESKTOP_CONTAINER[count] ?? "md:auto-rows-auto";
  return `${base} ${mobile} ${desktop}`;
}

/**
 * Responsive, deterministic stats grid that mirrors a design-spec layout
 * using per-count container templates and per-index placement rules.
 *
 * @param props - {@link Stats1Props}
 *
 * @remarks
 * - Counts **2–8** receive curated placements on both mobile and desktop.
 * - Outside that range, a minimal responsive fallback is used.
 * - Provide a `renderItem` to fully control markup/a11y per cell.
 *
 * @example
 * ```tsx
 * <Stats1
 *   stats={[
 *     { value: "120k", label: "Active Users" },
 *     { value: "99.9%", label: "Uptime" },
 *     { value: "24/7", label: "Support" },
 *   ]}
 * />
 * ```
 */
export function Stats1({ stats, className = "", renderItem }: Stats1Props) {
  const count = stats.length;
  const mobilePos = MOBILE_POS[count] ?? [];
  const desktopPos = DESKTOP_POS[count] ?? [];

  return (
    <div className={[containerClasses(count), className].filter(Boolean).join(" ")}>
      {stats.map((stat, i) => {
        const m = mobilePos[i] ?? "";
        const d = desktopPos[i] ?? "";
        return (
          <div key={`${stat.label}-${i}`} className={["flex justify-center", m, d].join(" ")}>
            {renderItem ? (
              renderItem(stat, i)
            ) : (
              <div className="text-center">
                <h2 className="mb-2 text-4xl font-semibold md:text-6xl">{stat.value}</h2>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
