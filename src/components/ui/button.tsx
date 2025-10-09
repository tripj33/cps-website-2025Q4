import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/* =============================================================================
 * Button Variants (cva)
 * =============================================================================
 * Variant classes are mapped to design tokens (bg/text/hover/focus).
 * Keep these aligned with your theme and Tailwind config.
 */
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      /**
       * Visual style of the button.
       *
       * - `default` — primary call-to-action
       * - `destructive` — destructive/danger actions
       * - `outline` — bordered, blends with surface
       * - `secondary` — secondary emphasis
       * - `ghost` — minimal/inline actions
       * - `link` — link-like text action
       */
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      /**
       * Size of the button.
       *
       * - `default` — standard
       * - `sm` — compact
       * - `lg` — marketing/large
       * - `icon` — square icon-only
       */
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/* =============================================================================
 * Types
 * =============================================================================
 */

/**
 * Props for the {@link Button} component.
 *
 * @remarks
 * - **Polymorphic rendering**: set `asChild` to render as the element of its child
 *   (Radix `Slot` pattern). Commonly used to style an anchor:  
 *   `<Button asChild><a href="/x">Go</a></Button>`.
 * - **Variants & sizes**: driven by `class-variance-authority` via {@link buttonVariants}.
 * - **Icon support**: pass either a component type (e.g., `Phone` from `lucide-react`)
 *   or a React element (`<Phone />`). Control placement via `iconPosition`.
 * - **IntelliSense for Tally**: the most common Tally `data-*` attributes are explicitly
 *   typed so they appear in auto-complete/hover documentation.
 * - **Accessibility**: focus-visible styles and aria-invalid ring are included.
 *
 * @example
 * ```tsx
 * import { Button } from "@/components/ui/button"
 * import { Calendar, Phone, ShoppingCart } from "lucide-react"
 *
 * // 1) Native button with icon before text
 * <Button variant="secondary" size="lg" icon={ShoppingCart}>
 *   Buy Now
 * </Button>
 *
 * // 2) Polymorphic link with icon after text (Radix Slot)
 * <Button asChild variant="outline" icon={Phone} iconPosition="end">
 *   <a href="tel:+17085551234">Call Now</a>
 * </Button>
 *
 * // 3) Tally embed attributes with custom icon element
 * <Button
 *   variant="ghost"
 *   size="lg"
 *   icon={<Calendar />}
 *   iconClassName="h-5 w-5"
 *   data-tally-open="w4e1PO"
 *   data-tally-emoji-text="📅"
 *   data-tally-emoji-animation="none"
 *   data-tally-auto-close="0"
 *   data-tally-form-events-forwarding="1"
 * >
 *   Book a Call
 * </Button>
 * ```
 */
export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  /**
   * Render polymorphically via Radix `Slot`. When `true`,
   * the Button adopts the semantics of its single element child (e.g., `<a>`).
   *
   * @default false
   * @remarks
   * - You **must** provide exactly one React **element** as `children`.  
   * - The component safely injects icons into that element to avoid
   *   `React.Children.only` errors.
   */
  asChild?: boolean

  /**
   * Optional icon rendered alongside the button content.
   * Accepts either a **component type** (e.g., `Phone`) or a **React element** (`<Phone />`).
   */
  icon?: React.ElementType | React.ReactNode

  /**
   * Where the icon appears relative to the content.
   * - `"start"` — before the text
   * - `"end"` — after the text
   *
   * @default "start"
   */
  iconPosition?: "start" | "end"

  /**
   * Tailwind classes applied to the icon element. Base gap is provided by the root.
   * Use to control sizing (`h-4 w-4`) and spacing (`mr-2`/`ml-2`) if desired.
   *
   * @default "h-4 w-4"
   */
  iconClassName?: string

  /**
   * Extra SVG props forwarded **when `icon` is a component type**.
   * Ignored if `icon` is already a React element.
   */
  iconProps?: React.SVGProps<SVGSVGElement>

  /**
   * Visual style variant. See {@link buttonVariants}.
   *
   * @default "default"
   * @remarks Allowed: `"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"`.
   */
  variant?: VariantProps<typeof buttonVariants>["variant"]

  /**
   * Size variant. See {@link buttonVariants}.
   *
   * @default "default"
   * @remarks Allowed: `"default" | "sm" | "lg" | "icon"`.
   */
  size?: VariantProps<typeof buttonVariants>["size"]

  /* -------------------------------------------------------------------------
   * Tally Embed Attributes (explicit for IntelliSense)
   * ---------------------------------------------------------------------- */

  /**
   * Tally form ID to open when this element is clicked.
   *
   * @example "w4e1PO"
   * @see https://help.tally.so/article/k0q9xamwfs-open-a-form-with-a-link-button-or-automatically
   */
  "data-tally-open"?: string

  /**
   * Emoji displayed inside Tally’s floating button.
   *
   * @example "📅"
   */
  "data-tally-emoji-text"?: string

  /**
   * Animation applied to the emoji inside the Tally button.
   * Common values include `"none" | "shake" | "wave" | "tada"`.
   *
   * @example "none"
   */
  "data-tally-emoji-animation"?: string

  /**
   * Auto-close behavior (seconds) after submission. String or number.
   *
   * @example "0" // do not auto-close
   */
  "data-tally-auto-close"?: string | number

  /**
   * Forward form events to the parent window. String or number flag.
   *
   * @example "1"
   */
  "data-tally-form-events-forwarding"?: string | number
}

/* =============================================================================
 * Implementation
 * =============================================================================
 */

/**
 * A polymorphic, variant-driven button with optional icon support and
 * documented Tally `data-*` attributes. Unknown `data-*` props are forwarded.
 */
export function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  icon,
  iconPosition = "start",
  iconClassName = "h-4 w-4",
  iconProps,
  children,
  ...props
}: ButtonProps) {
  // Build a proper icon node from an element or component type
  const iconNode = React.useMemo(() => {
    if (!icon) return null

    // If already a React element: clone so we can merge className safely
    if (React.isValidElement(icon)) {
      const existing = (icon.props as any)?.className as string | undefined
      return React.cloneElement(icon, { className: cn(existing, iconClassName) })
    }

    // If a component type: instantiate with className + extra props
    const IconComp = icon as React.ElementType
    return <IconComp className={cn(iconClassName)} {...iconProps} />
  }, [icon, iconClassName, iconProps])

  const before = iconPosition === "start" ? iconNode : null
  const after = iconPosition === "end" ? iconNode : null

  // Polymorphic <Slot> path (asChild)
  if (asChild) {
    // Slot expects exactly one element child; enforce and inject icon(s) inside it
    if (!React.isValidElement(children)) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(
          "[Button] `asChild` expects a single React element as its child. " +
            "Wrap text in an element, e.g. <a>Text</a>."
        )
      }
      // Fallback: render a plain <button> to avoid throwing
      return (
        <button className={cn(buttonVariants({ variant, size, className }))} {...props}>
          {before}
          {children}
          {after}
        </button>
      )
    }

    // Clone provided child to compose our icons with its existing children
    const child = children as React.ReactElement
    const mergedChild = React.cloneElement(child, {
      className: cn(child.props.className),
      children: (
        <>
          {before}
          {child.props.children}
          {after}
        </>
      ),
    })

    return (
      <Slot className={cn(buttonVariants({ variant, size, className }))} {...props}>
        {mergedChild}
      </Slot>
    )
  }

  // Standard <button> path
  return (
    <button className={cn(buttonVariants({ variant, size, className }))} {...props}>
      {before}
      {children}
      {after}
    </button>
  )
}

export type { VariantProps }
