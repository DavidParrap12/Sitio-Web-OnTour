"use client";

import { type ReactNode } from "react";
import { type DestinationTheme, DESTINATION_THEMES } from "@/lib/design-config";

type Level = "h1" | "h2" | "h3" | "h4";

export interface DisplayHeadingProps {
  /** Semantic HTML level (defaults to h2) */
  as?: Level;
  /** Typography class: display-1, display-2, heading-1, heading-2 */
  variant?: "display-1" | "display-2" | "heading-1" | "heading-2";
  /** Optional color theme accent */
  theme?: DestinationTheme;
  /** Additional CSS classes */
  className?: string;
  children: ReactNode;
}

const defaultVariant: Record<Level, DisplayHeadingProps["variant"]> = {
  h1: "display-1",
  h2: "display-2",
  h3: "heading-1",
  h4: "heading-2",
};

/**
 * Editorial heading with fluid typography and optional theme accent.
 * Uses Sora display font via the typography system.
 */
export function DisplayHeading({
  as: Tag = "h2",
  variant,
  theme,
  className = "",
  children,
}: DisplayHeadingProps) {
  const resolvedVariant = variant ?? defaultVariant[Tag] ?? "display-2";

  const themeStyle = theme
    ? { color: DESTINATION_THEMES[theme].color }
    : undefined;

  return (
    <Tag
      className={`${resolvedVariant} ${className}`}
      style={themeStyle}
    >
      {children}
    </Tag>
  );
}
