"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

/** Merge Tailwind classes with conditional logic. */
const cn = (...inputs: Array<string | false | null | undefined>) =>
  twMerge(clsx(inputs));

/* =============================================================================
 * Variants
 * =============================================================================
 */

const headerVariants = cva(
  // subtle dot pattern; remove if you prefer a flat tone
  "bg-[url('https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/dot-pattern-2.svg')] bg-[length:3.125rem_3.125rem] bg-repeat",
  {
    variants: {
      /** Background + foreground (uses design tokens). */
      tone: {
        default: "bg-muted",
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        accent: "bg-accent text-accent-foreground",
        /** No preset — bring your own via `headerClassName`. */
        custom: "",
      },
      /** Vertical rhythm. */
      size: {
        sm: "py-10",
        md: "py-20",
        lg: "py-32",
      },
    },
    defaultVariants: {
      tone: "default",
      size: "md",
    },
  }
);

const chapterLinkVariants = cva(
  "block text-sm font-medium leading-normal transition duration-300",
  {
    variants: {
      active: {
        true: "lg:bg-muted lg:!text-primary lg:rounded-md lg:p-2 lg:font-bold",
        false: "text-muted-foreground",
      },
    },
    defaultVariants: { active: false },
  }
);

/* =============================================================================
 * Types
 * =============================================================================
 */

/**
 * A single entry for the “Chapters / On this page” sidebar.
 */
export interface ChapterConfig {
  /** Heading id that exists in your article markup (e.g. `<h2 id="intro">`). */
  id: string;
  /** Label shown in the sidebar. */
  label: string;
  /**
   * Optional custom href; defaults to `#${id}`.
   * Useful if the chapter should jump to a different target.
   */
  href?: string;
}

/**
 * Optional featured image displayed under the title within the header.
 */
export interface ImageConfig {
  /** Source URL (relative or absolute). */
  src: string;
  /** Alt text for accessibility and SEO. */
  alt: string;
  /** Classes applied to the image wrapper. */
  className?: string;
  /** Classes applied to the `<img>` element. */
  imgClassName?: string;
}

/**
 * Props for {@link Blogpost6} — a minimal, content-first blog layout
 * with a themed header, optional featured image, and a sticky “Chapters”
 * sidebar that highlights the current section as you scroll.
 *
 * @remarks
 * Things that were intentionally **removed** for clarity/scope:
 * - Breadcrumbs
 * - Published date and reading-time
 * - Share/social actions
 * - Author + avatar and the “About the author” footer
 * - Conclusion box
 *
 * This keeps the layout lean for content-heavy pages (docs, policies, long-form).
 *
 * @example
 * ```tsx
 * <Blogpost6
 *   title="Advanced Drain Cleaning Guide"
 *   subtitle="Best practices from the field"
 *   headerTone="primary"
 *   headerSize="lg"
 *   image={{ src: "/images/featured.jpg", alt: "Hydro jetting" }}
 *   chapters={[
 *     { id: "overview", label: "Overview" },
 *     { id: "equipment", label: "Equipment" },
 *     { id: "safety", label: "Safety" },
 *   ]}
 * >
 *   <div className="prose dark:prose-invert">
 *     <h2 id="overview" className="scroll-mt-28">Overview</h2>
 *     <p>…</p>
 *     <h2 id="equipment" className="scroll-mt-28">Equipment</h2>
 *     <p>…</p>
 *     <h2 id="safety" className="scroll-mt-28">Safety</h2>
 *     <p>…</p>
 *   </div>
 * </Blogpost6>
 * ```
 */
export interface Blogpost6Props {
  /* ============================== Content ============================== */

  /** Main title in the header. Ignored when `headerContent` is provided. */
  title?: string;

  /** Optional subtitle/deck under the title. Ignored with `headerContent`. */
  subtitle?: string;

  /**
   * Fully custom header contents. When set, the built-in header (title, subtitle,
   * image) is skipped, and you can render anything you want.
   */
  headerContent?: React.ReactNode;

  /**
   * Primary article content. Typically a `<div className="prose dark:prose-invert">…</div>`.
   */
  children?: React.ReactNode;

  /** Optional featured image displayed below the title in the header. */
  image?: ImageConfig;

  /* ============================== Chapters ============================= */

  /**
   * Chapters shown in a sticky sidebar on desktop (inline on mobile).
   * Each `id` must exist on a heading in your content.
   */
  chapters?: ChapterConfig[];

  /** Heading text for the chapters sidebar. */
  chaptersLabel?: string;

  /**
   * Custom renderer for each chapter link. Return your own React node.
   * Params: `(chapter, isActive)`.
   */
  renderChapter?: (chapter: ChapterConfig, isActive: boolean) => React.ReactNode;

  /**
   * Disable automatic active-chapter tracking (IntersectionObserver).
   * Useful if you implement your own highlighting.
   */
  disableChapterTracking?: boolean;

  /* ============================== Theming ============================== */

  /** Header tone variant (design tokens). */
  headerTone?: VariantProps<typeof headerVariants>["tone"];

  /** Header vertical padding scale. */
  headerSize?: VariantProps<typeof headerVariants>["size"];

  /* =========================== Class overrides ========================== */

  /** Classes for the root `<section>`. */
  className?: string;
  /** Classes merged into the header surface (with variant classes). */
  headerClassName?: string;
  /** Classes applied to the centered header content wrapper. */
  headerContentClassName?: string;
  /** Classes for the main container that holds sidebar + article. */
  contentClassName?: string;
  /** Classes for the sidebar wrapper. */
  chaptersClassName?: string;
  /** Classes for the article column wrapper. */
  articleClassName?: string;
}

/* =============================================================================
 * Component
 * =============================================================================
 */

/**
 * Minimal blog layout with a themed header and auto-highlighted “Chapters”.
 *
 * @see {@link Blogpost6Props} for detailed prop docs and examples.
 */
export const Blogpost6: React.FC<Blogpost6Props> = ({
  // content
  title,
  subtitle,
  headerContent,
  children,
  image,

  // chapters
  chapters = [],
  chaptersLabel = "Chapters",
  renderChapter,
  disableChapterTracking = false,

  // theming
  headerTone,
  headerSize,

  // classes
  className,
  headerClassName,
  headerContentClassName,
  contentClassName,
  chaptersClassName,
  articleClassName,
}) => {
  const [activeChapterId, setActiveChapterId] = React.useState<string | null>(
    null
  );

  // Observe headings and update the active chapter id
  React.useEffect(() => {
    if (disableChapterTracking || chapters.length === 0) return;
    if (typeof window === "undefined" || !("IntersectionObserver" in window))
      return;

    const ids = chapters.map((c) => c.id);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        // pick the first visible section
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveChapterId(visible.target.id);
      },
      { rootMargin: "0px 0px -30% 0px", threshold: 0.1 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [chapters, disableChapterTracking]);

  return (
    <section className={cn("pb-32", className)}>
      {/* Header */}
      <div
        className={cn(
          headerVariants({ tone: headerTone, size: headerSize }),
          headerClassName
        )}
      >
        <div className="container flex flex-col items-start justify-start gap-16 py-16 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col items-center justify-center w-full gap-10">
            <div
              className={cn(
                "flex w-full max-w-[36rem] flex-col items-center justify-center gap-8",
                headerContentClassName
              )}
            >
              {headerContent ? (
                headerContent
              ) : (
                <>
                  {title && (
                    <h1 className="text-center text-[2.5rem] font-semibold leading-[1.2] md:text-5xl lg:text-6xl">
                      {title}
                    </h1>
                  )}
                  {subtitle && (
                    <p className="text-foreground text-center text-xl font-semibold leading-[1.4]">
                      {subtitle}
                    </p>
                  )}
                  {image && (
                    <div
                      className={cn(
                        "w-full max-w-[40rem] overflow-hidden rounded-lg",
                        image?.className
                      )}
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        className={cn(
                          "size-full object-cover object-center",
                          image?.imgClassName
                        )}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className={cn("container pt-16", contentClassName)}>
        <div className="relative flex flex-col w-full max-w-5xl mx-auto gap-14 lg:flex-row lg:items-start lg:justify-between lg:gap-20">
          {/* Chapters (sticky on lg+) */}
          {chapters.length > 0 && (
            <aside
              className={cn(
                "bg-background lg:sticky lg:top-20 lg:max-w-[16rem] lg:self-start",
                chaptersClassName
              )}
            >
              <div className="text-xl font-medium leading-snug">
                {chaptersLabel}
              </div>
              <nav className="pl-2 mt-2">
                <ul className="flex flex-col gap-2">
                  {chapters.map((chapter) => {
                    const isActive = activeChapterId === chapter.id;
                    const href = chapter.href ?? `#${chapter.id}`;

                    return (
                      <li key={chapter.id}>
                        {renderChapter ? (
                          renderChapter(chapter, isActive)
                        ) : (
                          <a
                            href={href}
                            className={cn(
                              chapterLinkVariants({ active: isActive })
                            )}
                          >
                            {chapter.label}
                          </a>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </aside>
          )}

          {/* Article */}
          <article
            className={cn(
              "w-full max-w-[40rem] grow",
              // maintain comfortable rhythm for long-form content
              "prose:my-0 prose:mx-0",
              articleClassName
            )}
          >
            {children}
          </article>
        </div>
      </div>
    </section>
  );
};
