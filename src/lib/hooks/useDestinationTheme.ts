import { DESTINATION_THEMES, type DestinationTheme } from "@/lib/design-config";

export interface DestinationThemeResult {
  themeKey: DestinationTheme;
  color: string;
  colorLight: string;
  label: string;
  gradeClass: string;
  /** Border color derived from theme */
  borderColor: string;
  /** Ready-made style for theme badges (bg pill with alpha) */
  badgeStyle: React.CSSProperties;
  /** CTA emphasis for this theme: solid themes get outline CTA, muted get solid */
  ctaVariant: "solid" | "outline";
  style: React.CSSProperties;
}

/**
 * Pure resolver for destination theme tokens.
 * Safe to call anywhere (including inside .map() callbacks).
 * Falls back to 'naturaleza' if not specified or invalid.
 */
export function resolveDestinationTheme(
  theme?: DestinationTheme | string
): DestinationThemeResult {
  const validKey: DestinationTheme = (theme && theme in DESTINATION_THEMES)
    ? (theme as DestinationTheme)
    : "naturaleza";

  const config = DESTINATION_THEMES[validKey];

  return {
    themeKey: validKey,
    color: config.color,
    colorLight: config.colorLight,
    label: config.label,
    gradeClass: config.grade,
    borderColor: `${config.color}55`,
    badgeStyle: {
      backgroundColor: `${config.color}dd`,
      color: "#ffffff",
    },
    // Vivid themes read better as outline CTAs; muted ones as solid
    ctaVariant: validKey === "urbano" || validKey === "cultura" ? "solid" : "outline",
    style: {
      "--theme-accent": config.color,
      "--theme-accent-light": config.colorLight,
      "--theme-border": `${config.color}55`,
    } as React.CSSProperties,
  };
}

/**
 * Hook wrapper for resolveDestinationTheme.
 * Prefer resolveDestinationTheme in non-component or callback contexts.
 */
export function useDestinationTheme(theme?: DestinationTheme | string): DestinationThemeResult {
  return resolveDestinationTheme(theme);
}
