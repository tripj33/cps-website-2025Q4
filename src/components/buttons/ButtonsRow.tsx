"use client";

import { Button } from "@/components/ui/button";

export type ButtonSize = "sm" | "default" | "lg" | "icon";
export type ButtonVariant =
  | "default"
  | "outline"
  | "destructive"
  | "secondary"
  | "ghost"
  | "link";

export interface CTA {
  enabled?: boolean;
  label: string;
  href: string;
  size?: ButtonSize | null;
  variant?: ButtonVariant | null;
}

export default function ButtonsRow({
  primary,
  secondary,
}: {
  primary?: CTA;
  secondary?: CTA;
}) {
  const hasPrimary = !!primary?.enabled && !!primary?.label && !!primary?.href;
  const hasSecondary =
    !!secondary?.enabled && !!secondary?.label && !!secondary?.href;

  if (!hasPrimary && !hasSecondary) return null;

  return (
    <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:flex-row lg:justify-start">
      {hasPrimary && (
        <Button
          size={primary!.size ?? "lg"}
          variant={primary!.variant ?? "default"}
          asChild
          className="w-full sm:w-auto"
        >
          <a href={primary!.href}>{primary!.label}</a>
        </Button>
      )}
      {hasSecondary && (
        <Button
          size={secondary!.size ?? "lg"}
          variant={secondary!.variant ?? "outline"}
          asChild
          className="w-full sm:w-auto"
        >
          <a href={secondary!.href}>{secondary!.label}</a>
        </Button>
      )}
    </div>
  );
}
