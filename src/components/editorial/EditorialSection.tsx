import { type CSSProperties, type ReactNode } from "react";
import { type DestinationTheme } from "@/lib/design-config";
import { resolveDestinationTheme } from "@/lib/hooks/useDestinationTheme";
import { SectionReveal } from "./SectionReveal";

type BleedEdge = "top" | "bottom";

export interface EditorialSectionProps {
  children: ReactNode;
  /** Background: editorial token or any CSS color */
  bg?: "warm" | "white" | "dark" | (string & {});
  /** Vertical padding preset */
  padding?: "none" | "md" | "lg";
  /** Gradient bleed edge — softens transition toward the adjacent section */
  bleed?: BleedEdge;
  /** Color the bleed fades from (top: previous section bg) / to (bottom: next section bg) */
  bleedColor?: string;
  /** Scroll-reveal mode for children */
  reveal?: "none" | "fade" | "stagger";
  /** Wrap children in .container (default true) */
  container?: boolean;
  /** Destination theme — applies --theme-accent CSS vars to the whole section */
  theme?: DestinationTheme;
  /** Extra classes for the <section> */
  className?: string;
  /** Extra classes for the inner container */
  containerClassName?: string;
}

const PADDING: Record<NonNullable<EditorialSectionProps["padding"]>, string> = {
  none: "",
  md: "py-16 md:py-24",
  lg: "py-20 md:py-28",
};

/**
 * Standard editorial section — encodes the repeated pattern of
 * padded full-width band + centered container + scroll reveal,
 * with optional destination theming and section-edge gradient bleeds.
 * Server-safe (no hooks of its own).
 */
export function EditorialSection({
  children,
  bg = "warm",
  padding = "md",
  bleed,
  bleedColor,
  reveal = "fade",
  container = true,
  theme,
  className = "",
  containerClassName = "",
}: EditorialSectionProps) {
  const themeStyle = theme ? resolveDestinationTheme(theme).style : undefined;

  const style: CSSProperties = {
    ...(themeStyle ?? {}),
    ...(bleedColor ? { "--bleed-color": bleedColor } : {}),
    ...(bg && !["warm", "white", "dark"].includes(bg) ? { backgroundColor: bg } : {}),
  } as CSSProperties;

  const bgClass =
    bg === "warm" ? "bg-editorial-warm" : bg === "white" ? "bg-white" : bg === "dark" ? "bg-editorial-dark" : "";

  return (
    <section
      className={`relative ${PADDING[padding]} ${bgClass} ${
        bleed === "top" && bleedColor ? "editorial-gradient-bleed" : ""
      } ${className}`}
      style={style}
    >
      {container ? (
        <div className={`container mx-auto px-4 md:px-6 relative z-10 ${containerClassName}`}>
         {renderChildren(children, reveal)}
        </div>
      ) : (
        renderChildren(children, reveal)
      )}

      {bleed === "bottom" && bleedColor && (
        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-20 z-10 pointer-events-none"
          style={{ background: `linear-gradient(to bottom, transparent, ${bleedColor})` }}
        />
      )}
    </section>
  );
}

function renderChildren(children: ReactNode, reveal: EditorialSectionProps["reveal"]) {
  if (reveal === "none") return children;
  if (reveal === "stagger")
    return <SectionReveal className="editorial-stagger-variance">{children}</SectionReveal>;
  return <SectionReveal>{children}</SectionReveal>;
}
