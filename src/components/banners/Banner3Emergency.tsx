"use client";

import * as React from "react";
import { useMemo, useState } from "react";
import { X, Phone, CalendarClock, CloudRain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* =============================================================================
 * Types (rich hover docs for VS Code)
 * ============================================================================= */

/**
 * Mode that drives default copy and default CTAs.
 *
 * - `"default"` — Business hours (before cutoff); promotes same-day booking.
 * - `"nextDay"` — After cutoff (or booked); promotes next-day AM priority.
 * - `"afterHours"` — Outside business hours; call-first UX.
 * - `"storm"` — Storm conditions; sump-pump/backup-focused messaging.
 *
 * @example
 * ```tsx
 * <Banner3Emergency phone="+17085551234" mode="afterHours" />
 * ```
 */
export type EmergencyBannerMode = "default" | "nextDay" | "afterHours" | "storm";

/**
 * Small text block used at each responsive breakpoint.
 *
 * @example
 * ```ts
 * const mobileText: BannerText = {
 *   title: "Same-day plumbing",
 *   description: "Tap to book now."
 * };
 * ```
 */
export interface BannerText {
  /**
   * Main heading line.
   * If {@link Banner3EmergencyProps.allowHTML} is `true`, basic HTML is allowed
   * (and sanitized) before rendering.
   *
   * @example "Same-day plumbing"
   */
  title?: string;

  /**
   * Supporting copy beneath the title.
   * Sanitized if `allowHTML` is `true`.
   *
   * @example "Tap to book now."
   */
  description?: string;
}

/**
 * Extra attributes that make shadcn Button links open a **Tally** form.
 *
 * @remarks
 * These map 1:1 to the DOM `data-*` attributes Tally listens to on the anchor.
 *
 * - {@link tallyOpen | `tallyOpen`} → `data-tally-open`
 * - {@link tallyEmojiText | `tallyEmojiText`} → `data-tally-emoji-text`
 * - {@link tallyEmojiAnimation | `tallyEmojiAnimation`} → `data-tally-emoji-animation`
 * - {@link tallyAutoClose | `tallyAutoClose`} → `data-tally-auto-close`
 * - {@link tallyFormEventsForwarding | `tallyFormEventsForwarding`} → `data-tally-form-events-forwarding`
 *
 * @example
 * ```tsx
 * {
 *   tallyOpen: "w4e1PO",
 *   tallyEmojiText: "📅",
 *   tallyEmojiAnimation: "none",
 *   tallyAutoClose: 0,
 *   tallyFormEventsForwarding: 1
 * }
 * ```
 */
export interface BannerTallyAttrs {
  /**
   * Tally form ID to open.
   *
   * @example "w4e1PO"
   */
  tallyOpen?: string;

  /**
   * Emoji to display in Tally’s launcher.
   *
   * @example "📅"
   */
  tallyEmojiText?: string;

  /**
   * Emoji animation type.
   * Use `"none"` to disable, or any Tally-supported string.
   *
   * @example "none"
   */
  tallyEmojiAnimation?: string;

  /**
   * Auto-close delay in seconds (0 disables).
   *
   * @example 0
   */
  tallyAutoClose?: number;

  /**
   * Forward form events to the parent page (0/1).
   *
   * @example 1
   */
  tallyFormEventsForwarding?: 0 | 1;
}

/**
 * CTA definition that plugs directly into your shadcn `Button`.
 *
 * @example (inline in `.astro` using a string icon key)
 * ```astro
 * <Banner3Emergency
 *   client:load
 *   mobileButton={{
 *     text: "Schedule",
 *     href: "#",
 *     variant: "outline",
 *     size: "sm",
 *     leadingIcon: "calendar",
 *     tallyOpen: "w4e1PO",
 *     tallyEmojiText: "📅",
 *     tallyEmojiAnimation: "none",
 *     tallyAutoClose: 0,
 *     tallyFormEventsForwarding: 1
 *   }}
 * />
 * ```
 *
 * @example (frontmatter using React icon components and extra class)
 * ```astro
 * ---
 * import { Phone, CalendarClock } from "lucide-react";
 * const mobileButton = {
 *   text: "Book",
 *   href: "#",
 *   leadingIcon: CalendarClock,
 *   variant: "outline",
 *   size: "sm",
 *   className: "rounded-full",
 *   tallyOpen: "w4e1PO"
 * };
 * const mobileSecondaryButton = {
 *   text: "Call",
 *   href: "tel:+17085551234",
 *   leadingIcon: <Phone className="w-4 h-4" />,
 *   variant: "ghost",
 *   size: "sm"
 * };
 * ---
 * <Banner3Emergency client:load mobileButton={mobileButton} mobileSecondaryButton={mobileSecondaryButton} />
 * ```
 */
export interface BannerButton extends BannerTallyAttrs {
  /** Visible label for the button (e.g., "Book Now"). */
  text: string;

  /** Destination URL (supports `tel:+1…`). */
  href: string;

  /**
   * Optional icon before the text.
   *
   * - String key (Astro-safe): `"phone" | "calendar" | "cloud"`
   * - Component type: `CalendarClock`, `Phone`, …
   * - Ready node: `<Phone className="w-4 h-4" />`
   *
   * @example "calendar"
   */
  leadingIcon?: "phone" | "calendar" | "cloud" | React.ElementType | React.ReactNode;

  /**
   * Visual style from your shadcn `Button`.
   *
   * Options: `"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"`
   *
   * @defaultValue "outline" (primary defaults) / "ghost" (secondary defaults)
   */
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";

  /**
   * Size from your shadcn `Button`.
   *
   * Options: `"sm" | "default" | "lg" | "icon"`
   *
   * @defaultValue "sm"
   */
  size?: "sm" | "default" | "lg" | "icon";

  /** Anchor `target` attribute (e.g., `_blank`). */
  target?: string;

  /** Anchor `rel` attribute (e.g., `noopener`). */
  rel?: string;

  /**
   * Extra classes merged **last** so caller overrides always win.
   *
   * @example "rounded-full"
   */
  className?: string;
}

/**
 * Props for {@link Banner3Emergency}.
 *
 * - Uses **shadcn `Button`**.
 * - Per-breakpoint text/CTAs (mobile / tablet / desktop).
 * - Any missing props fall back to **mode defaults**.
 * - Accessible landmark: `role="region"` + descriptive `aria-label`.
 *
 * @example (minimal)
 * ```astro
 * <Banner3Emergency
 *   client:load
 *   phone="+17085551234"
 *   mobileText={{ title: "Same-day plumbing", description: "Tap to book now." }}
 *   mobileButton={{ text: "Book", href: "/schedule", variant: "outline", size: "sm", leadingIcon: "calendar" }}
 * />
 * ```
 */
export interface Banner3EmergencyProps {
  /** E.164 phone number (e.g., `"+17085551234"`). Used to build `tel:` defaults. */
  phone: string;

  /** Human readable phone label (e.g., `"(708) 555-1234"`). Used in default CTA text. */
  phoneLabel?: string;

  /** Default scheduling URL used by mode defaults. @defaultValue "/schedule" */
  scheduleHref?: string;

  /**
   * Geographic scope shown inline when provided.
   * @example "Mokena & nearby"
   */
  cityScope?: string;

  /**
   * Same-day cutoff hour (local 24h). After this, auto-mode becomes `"nextDay"`
   * unless {@link Banner3EmergencyProps.mode} is set.
   * @defaultValue 15
   */
  cutoffHourLocal?: number;

  /** Manual mode override. */
  mode?: EmergencyBannerMode;

  /** If true (and `mode` not set), auto-selects `"storm"` mode. */
  stormActive?: boolean;

  /** Stick to bottom on mobile (`position: fixed`). @defaultValue true */
  stickyMobile?: boolean;

  /** Show desktop dismiss control. @defaultValue true */
  dismissibleDesktop?: boolean;

  /** Initial visibility (can be dismissed). @defaultValue true */
  defaultVisible?: boolean;

  /** Allow sanitized HTML in text props. @defaultValue false */
  allowHTML?: boolean;

  /* ---------- Text per breakpoint ---------- */
  /** Mobile text (≤ `md`). Falls back to mode defaults if omitted. */
  mobileText?: BannerText;
  /** Tablet text (`md` only). Falls back to mode defaults if omitted. */
  tabletText?: BannerText;
  /** Desktop text (≥ `lg`). Falls back to mode defaults if omitted. */
  desktopText?: BannerText;

  /* ---------- Primary CTA per breakpoint ---------- */
  /** Primary CTA on mobile. Omitted → mode defaults. */
  mobileButton?: BannerButton;
  /** Primary CTA on tablet. Omitted → mode defaults. */
  tabletButton?: BannerButton;
  /** Primary CTA on desktop. Omitted → mode defaults. */
  desktopButton?: BannerButton;

  /* ---------- Secondary CTA per breakpoint ---------- */
  /**
   * Secondary CTA on mobile.
   * In `"afterHours"` mode, it is hidden unless `href` starts with `tel:`.
   */
  mobileSecondaryButton?: BannerButton;
  /** Tablet secondary CTA. */
  tabletSecondaryButton?: BannerButton;
  /** Desktop secondary CTA. */
  desktopSecondaryButton?: BannerButton;

  /**
   * Analytics hook for clicks and dismiss:
   * `"dismiss"`, `"click:primary:base"`, `"click:secondary:md"`, …
   */
  onTrack?: (event: string) => void;

  /** Extra classes for the outer `<section>`. */
  className?: string;

  /** Override the current date/time for SSR/testing. */
  currentDate?: Date | number;
}

/* =============================================================================
 * Helpers
 * ============================================================================= */

function sanitizeHtmlLite(html: string) {
  return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/\son\w+='[^']*'/gi, "")
    .replace(/\shref="javascript:[^"]*"/gi, "")
    .replace(/\shref='javascript:[^']*'/gi, "");
}

const nowLocal = (d?: Date | number) =>
  d instanceof Date || typeof d === "number" ? new Date(d) : new Date();

const isAfterHours = (d: Date, start = 8, end = 18) =>
  d.getHours() < start || d.getHours() >= end;

const telHref = (p: string) => (p.startsWith("tel:") ? p : `tel:${p}`);

function renderIcon(icon: BannerButton["leadingIcon"], className: string) {
  if (!icon) return null;
  if (typeof icon === "string") {
    if (icon === "phone") return <Phone className={className} aria-hidden="true" />;
    if (icon === "calendar") return <CalendarClock className={className} aria-hidden="true" />;
    if (icon === "cloud") return <CloudRain className={className} aria-hidden="true" />;
    return null;
  }
  if (typeof icon === "function") {
    const C = icon as React.ElementType;
    return <C className={className} aria-hidden="true" />;
  }
  if (React.isValidElement(icon)) {
    return React.cloneElement(icon, {
      className: cn((icon.props as any)?.className ?? "", className),
      "aria-hidden": true,
    });
  }
  return null;
}

/** Build a clean `data-*` attribute bag for Tally based on a button config. */
function buildTallyDataAttrs(cfg: BannerTallyAttrs) {
  const attrs: Record<string, string | number | undefined> = {
    "data-tally-open": cfg.tallyOpen,
    "data-tally-emoji-text": cfg.tallyEmojiText,
    "data-tally-emoji-animation": cfg.tallyEmojiAnimation,
    "data-tally-auto-close": cfg.tallyAutoClose,
    "data-tally-form-events-forwarding": cfg.tallyFormEventsForwarding,
  };
  // Strip undefined so we don’t render `data-foo="undefined"`
  Object.keys(attrs).forEach((k) => attrs[k] === undefined && delete attrs[k]);
  return attrs as Record<string, string | number>;
}

/* =============================================================================
 * Component
 * ============================================================================= */

/**
 * Emergency banner for **same-day/next-day/after-hours/storm** messaging.
 *
 * - Uses your **shadcn `Button`** (variants/sizes documented on hover).
 * - Background color depends on `mode`; button color/contrast comes from its `variant`.
 * - Per-breakpoint copy + CTAs with fallbacks.
 * - **Tally integration**: add `tallyOpen`, `tallyEmojiText`, etc. on any button to open forms.
 */
export const Banner3Emergency: React.FC<Banner3EmergencyProps> = ({
  phone,
  phoneLabel,
  scheduleHref = "/schedule",
  cityScope,
  cutoffHourLocal = 15,
  mode,
  stormActive,
  stickyMobile = true,
  dismissibleDesktop = true,
  defaultVisible = true,
  allowHTML = false,

  mobileText,
  tabletText,
  desktopText,

  mobileButton,
  tabletButton,
  desktopButton,

  mobileSecondaryButton,
  tabletSecondaryButton,
  desktopSecondaryButton,

  onTrack,
  className,
  currentDate,
}) => {
  const [visible, setVisible] = useState(defaultVisible);

  const finalMode: EmergencyBannerMode = useMemo(() => {
    if (mode) return mode;
    if (stormActive) return "storm";
    const d = nowLocal(currentDate);
    if (isAfterHours(d)) return "afterHours";
    const cutoff = new Date(d);
    cutoff.setHours(cutoffHourLocal, 0, 0, 0);
    return d.getTime() >= cutoff.getTime() ? "nextDay" : "default";
  }, [mode, stormActive, cutoffHourLocal, currentDate]);

  // Text defaults by mode
  const textDefaults: Record<EmergencyBannerMode, Required<BannerText>> = {
    default: { title: "Same-day plumbing service", description: cityScope ? `Serving ${cityScope}.` : "Book online or call now." },
    nextDay: { title: "Same-day cutoff passed", description: "Get next-day AM priority." },
    afterHours: { title: "Urgent after-hours plumbing help", description: "Technicians on-call. After-hours rates apply." },
    storm: { title: "Storm alert — sump pump & backup service", description: cityScope ? `Flooding risk in ${cityScope}.` : "Prevent backups during the storm." },
  };
  const textBase = mobileText ?? textDefaults[finalMode];
  const textMd = tabletText ?? textDefaults[finalMode];
  const textLg = desktopText ?? textDefaults[finalMode];

  // Primary defaults by mode (using `outline` for contrast on banner)
  const defaultPrimary: Record<EmergencyBannerMode, BannerButton> = {
    default: { text: "Book same-day", href: scheduleHref, variant: "outline", size: "sm", leadingIcon: "calendar" },
    nextDay: { text: "Next-day AM priority", href: scheduleHref, variant: "outline", size: "sm", leadingIcon: "calendar" },
    afterHours: { text: phoneLabel ? `Call ${phoneLabel}` : "Call now", href: telHref(phone), variant: "outline", size: "sm", leadingIcon: "phone" },
    storm: { text: "Book sump pump service", href: scheduleHref, variant: "outline", size: "sm", leadingIcon: "cloud" },
  };

  // Secondary defaults (hide in afterHours unless tel:)
  const defaultSecondary: Record<EmergencyBannerMode, BannerButton | undefined> = {
    default: { text: phoneLabel ?? "Call now", href: telHref(phone), variant: "ghost", size: "sm", leadingIcon: "phone" },
    nextDay: { text: phoneLabel ?? "Call now", href: telHref(phone), variant: "ghost", size: "sm", leadingIcon: "phone" },
    afterHours: undefined,
    storm: { text: phoneLabel ?? "Call now", href: telHref(phone), variant: "ghost", size: "sm", leadingIcon: "phone" },
  };

  // Merge user overrides per breakpoint
  const btnBase = { ...defaultPrimary[finalMode], ...(mobileButton ?? {}) };
  const btnMd = { ...defaultPrimary[finalMode], ...(tabletButton ?? {}) };
  const btnLg = { ...defaultPrimary[finalMode], ...(desktopButton ?? {}) };

  const sBtnBase = mobileSecondaryButton === undefined ? defaultSecondary[finalMode] : mobileSecondaryButton;
  const sBtnMd = tabletSecondaryButton === undefined ? defaultSecondary[finalMode] : tabletSecondaryButton;
  const sBtnLg = desktopSecondaryButton === undefined ? defaultSecondary[finalMode] : desktopSecondaryButton;

  const mobileBtnCount = (btnBase ? 1 : 0) + (sBtnBase ? 1 : 0);

  if (!visible) return null;

  const renderText = (t?: BannerText) => {
    const title = t?.title;
    const desc = t?.description;
    return (
      <>
        {title && (
          allowHTML ? (
            <span className="lg:w-auto">
              <p
                className="text-sm font-semibold text-white lg:px-8"
                dangerouslySetInnerHTML={{ __html: sanitizeHtmlLite(title) }}
              />
            </span>
          ) : (
            <span className="lg:w-auto">
              <p className="text-sm font-semibold text-white lg:px-8">{title}</p>
            </span>
          )
        )}
        {desc && (
          allowHTML ? (
            <span className="lg:w-auto">
              <p
                className="text-sm text-white/90 lg:px-8"
                dangerouslySetInnerHTML={{ __html: sanitizeHtmlLite(desc) }}
              />
            </span>
          ) : (
            <span className="lg:w-auto">
              <p className="text-sm text-white/90 lg:px-8">{desc}</p>
            </span>
          )
        )}
      </>
    );
  };

  /** One link rendered as a shadcn Button with optional Tally data attributes. */
  const ButtonLink = ({ cfg, track }: { cfg: BannerButton; track: string }) => {
    const tallyAttrs = buildTallyDataAttrs(cfg);
    return (
      <Button
        asChild
        variant={(cfg.variant ?? "outline") as any}
        size={(cfg.size ?? "sm") as any}
        className={cn("inline-flex items-center has-[svg]:[&>svg]:mr-2", cfg.className)}
        onClick={() => onTrack?.(track)}
      >
        {/* Spread Tally data attributes on the anchor so Tally can intercept the click */}
        <a href={cfg.href} target={cfg.target} rel={cfg.rel} {...tallyAttrs}>
          {renderIcon(cfg.leadingIcon, "h-4 w-4")}
          {cfg.text}
        </a>
      </Button>
    );
  };

  return (
    <section
      role="region"
      aria-label="Emergency and same-day service announcement"
      className={cn(
        "w-full p-4 pb-[max(1rem,env(safe-area-inset-bottom))]",
        finalMode === "default" && "bg-[var(--chart-5)]",
        finalMode === "nextDay" && "bg-[var(--color-secondary)]",
        finalMode === "afterHours" && "bg-zinc-900",
        finalMode === "storm" && "bg-sky-700",
        stickyMobile && "fixed inset-x-0 bottom-0 z-50 md:relative",
        className
      )}
    >
      <div className="container mx-auto">
        <div className="relative flex flex-col items-center gap-4 text-center md:flex-row md:items-center md:justify-between md:text-left md:gap-6">
          {/* Mobile dismiss */}
          <button
            className="absolute top-0 right-0 grid w-8 h-8 rounded-md place-items-center text-white/90 hover:bg-white/10 md:hidden"
            aria-label="Dismiss announcement"
            onClick={() => {
              setVisible(false);
              onTrack?.("dismiss");
            }}
          >
            <X className="w-4 h-4" />
          </button>

          {/* Copy */}
          <div className="flex flex-col items-center lg:flex-row lg:items-center lg:w-full md:items-start">
            <div className="md:hidden">{renderText(textBase)}</div>
            <div className="hidden md:block lg:hidden">{renderText(textMd)}</div>
            <div className="hidden lg:block lg:w-full lg:flex lg:flex-row">{renderText(textLg)}</div>
            {cityScope && (
              <p className="hidden mt-1 text-sm text-white/80 md:block lg:px-20">
                Serving {cityScope}
              </p>
            )}
          </div>

          {/* CTAs */}
          <div className="w-full md:w-auto">
            {/* Mobile grid: 1 col if one button, 2 cols if two */}
            <div className={cn("grid gap-2 md:hidden w-full", mobileBtnCount > 1 ? "grid-cols-2" : "grid-cols-1")}>
              {btnBase && <ButtonLink cfg={btnBase} track="click:primary:base" />}
              {sBtnBase && (finalMode !== "afterHours" || sBtnBase.href.startsWith("tel:")) && (
                <ButtonLink cfg={sBtnBase} track="click:secondary:base" />
              )}
            </div>

            {/* Tablet */}
            <div className="items-center hidden gap-2 md:flex lg:hidden">
              {btnMd && <ButtonLink cfg={btnMd} track="click:primary:md" />}
              {sBtnMd && (finalMode !== "afterHours" || sBtnMd.href.startsWith("tel:")) && (
                <ButtonLink cfg={sBtnMd} track="click:secondary:md" />
              )}
            </div>

            {/* Desktop */}
            <div className="items-center hidden gap-2 lg:flex">
              {btnLg && <ButtonLink cfg={btnLg} track="click:primary:lg" />}
              {sBtnLg && (finalMode !== "afterHours" || sBtnLg.href.startsWith("tel:")) && (
                <ButtonLink cfg={sBtnLg} track="click:secondary:lg" />
              )}
            </div>
          </div>

          {/* Desktop dismiss */}
          {dismissibleDesktop && (
            <button
              className="grid hidden w-8 h-8 rounded-md place-items-center text-white/90 hover:bg-white/10 md:inline-grid"
              aria-label="Dismiss announcement"
              onClick={() => {
                setVisible(false);
                onTrack?.("dismiss");
              }}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export { Banner3Emergency as Banner3 };
