import * as React from "react";
import { Button } from "@/components/ui/button";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

/** Utility: merge Tailwind classes with conditional logic. */
const cn = (...inputs: Array<string | undefined | false | null>) =>
  twMerge(clsx(inputs));

/**
 * Visual style variants for the CTA panel.
 */
const panelVariants = cva("rounded-lg p-8 md:rounded-xl lg:p-12", {
  variants: {
    tone: {
      accent: "bg-accent",
      primary: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground",
      muted: "bg-muted",
      card: "bg-card text-card-foreground",
      transparent: "",
      custom: "",
    },
    textVariant: {
      auto: "",
      foreground: "text-foreground",
      muted: "text-muted-foreground",
      inherit: "",
    },
  },
  defaultVariants: {
    tone: "accent",
    textVariant: "auto",
  },
});

/**
 * Button configuration for {@link Cta12}.
 *
 * @property text                Visible label.
 * @property url                 When provided, Button renders as `<a>` via `asChild`.
 * @property icon                React component type for an icon (e.g., `Phone` from `lucide-react`).
 * @property iconClassName       Tailwind classes applied to the icon (size/spacing).
 * @property iconProps           Extra props forwarded to the icon component (e.g., `strokeWidth`).
 * @property buttonProps         Pass-through of any shadcn {@link Button} props.
 */
type ButtonConfig = {
  text: string;
  url?: string;
  icon?: React.ElementType; // <— pass the component type (e.g., Phone), not <Phone />
  iconClassName?: string;
  iconProps?: React.SVGProps<SVGSVGElement>;
  buttonProps?: React.ComponentProps<typeof Button>;
};

/**
 * Props for {@link Cta12}.
 *
 * @property heading
 * @property description
 * @property buttons.primary / buttons.secondary
 * @property tone
 * @property textVariant
 * @property className
 * @property sectionClassName
 */
export interface Cta12Props {
  heading?: string;
  description?: string;
  buttons?: {
    primary?: ButtonConfig;
    secondary?: ButtonConfig;
  };
  tone?: VariantProps<typeof panelVariants>["tone"];
  textVariant?: VariantProps<typeof panelVariants>["textVariant"];
  className?: string;
  sectionClassName?: string;
}

/**
 * Render label content. If `buttonProps.children` is provided, that wins.
 * Otherwise render optional Icon + text.
 */
const renderLabel = (cfg: ButtonConfig | undefined) => {
  if (!cfg) return null;
  const { text, icon: Icon, iconClassName, iconProps, buttonProps } = cfg;
  if (buttonProps?.children != null) return buttonProps.children;
  return (
    <span className="inline-flex items-center">
      {Icon ? <Icon className={cn("mr-2 h-4 w-4", iconClassName)} {...iconProps} /> : null}
      {text}
    </span>
  );
};

/**
 * Auto-styled CTA block (Astro-friendly) using shadcn/ui Button.
 *
 * @remarks
 * • Pass any shadcn Button props via `buttons.*.buttonProps` (variant, size, disabled, onClick, etc.).  
 * • To add an icon, pass `icon={Phone}` and optionally `iconClassName="h-4 w-4"` and/or `iconProps={{ strokeWidth: 1.5 }}`.  
 * • If you provide `buttonProps.children`, it overrides the default (icon + text) rendering.  
 * • When `url` is provided, the Button renders as an `<a>` via `asChild`; otherwise it is a native `<button>`.  
 */
const Cta12: React.FC<Cta12Props> = ({
  heading = "Call to Action",
  description =
    "Build faster with our collection of pre-built blocks. Speed up your development and ship features in record time.",
  buttons = {
    primary: {
      text: "Buy Now",
      url: "https://www.shadcnblocks.com",
      buttonProps: { size: "lg" },
    },
    secondary: {
      text: "Contact Us",
      url: "https://www.shadcnblocks.com",
      buttonProps: { variant: "outline", size: "lg" },
    },
  },
  tone = "accent",
  textVariant = "auto",
  className = "",
  sectionClassName = "",
}) => {
  const Primary = buttons?.primary;
  const Secondary = buttons?.secondary;

  return (
    <section className={cn("py-32", sectionClassName)}>
      <div className="container">
        <div className={cn(panelVariants({ tone }), className)}>
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="mb-4 text-3xl font-semibold md:text-5xl lg:mb-6 lg:text-6xl">
              {heading}
            </h3>

            <p
              className={cn(
                "mb-8 text-lg font-medium lg:text-xl",
                textVariant === "auto"
                  ? tone === "primary" || tone === "secondary" || tone === "card"
                    ? ""
                    : "text-muted-foreground"
                  : textVariant === "foreground"
                  ? "text-foreground"
                  : textVariant === "muted"
                  ? "text-muted-foreground"
                  : ""
              )}
            >
              {description}
            </p>

            <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
              {Primary &&
                (Primary.url ? (
                  <Button asChild className="w-full sm:w-auto" {...Primary.buttonProps}>
                    <a href={Primary.url}>{renderLabel(Primary)}</a>
                  </Button>
                ) : (
                  <Button className="w-full sm:w-auto" {...Primary.buttonProps}>
                    {renderLabel(Primary)}
                  </Button>
                ))}

              {Secondary &&
                (Secondary.url ? (
                  <Button asChild className="w-full sm:w-auto" {...Secondary.buttonProps}>
                    <a href={Secondary.url}>{renderLabel(Secondary)}</a>
                  </Button>
                ) : (
                  <Button className="w-full sm:w-auto" {...Secondary.buttonProps}>
                    {renderLabel(Secondary)}
                  </Button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Cta12 };
