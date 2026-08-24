"use client";

type WavePosition = "top" | "bottom";
type WaveColor = "warm" | "dark" | "white" | "warm-alt" | "transparent";

const waveSVG = (
  <svg
    viewBox="0 0 1440 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
  >
    <path
      d="M0 120 C360 40 720 120 1080 40 C1440 -40 1440 120 1440 120 H0 Z"
      fill="currentColor"
    />
  </svg>
);

interface WaveDividerProps {
  position: WavePosition;
  /** Solid color (semantic or CSS value) */
  color?: WaveColor | string;
  /** Gradient from-color (overrides color) */
  fromColor?: string;
  /** Gradient to-color (used with fromColor) */
  toColor?: string;
  className?: string;
  /** Color override via CSS custom property */
  style?: React.CSSProperties;
}

const colorMap: Record<WaveColor, string> = {
  warm: "var(--color-editorial-warm)",
  dark: "var(--color-editorial-dark)",
  white: "#ffffff",
  "warm-alt": "var(--color-editorial-warm-alt)",
  transparent: "transparent",
};

/**
 * Organic wave divider between sections.
 * Supports solid colors (via `color`) or gradient fill via inline SVG linearGradient.
 * Uses CSS currentColor for theming.
 */
export function WaveDivider({
  position,
  color = "warm",
  fromColor,
  toColor,
  className = "",
  style,
}: WaveDividerProps) {
  const resolvedColor = colorMap[color as WaveColor] ?? color;
  // Stable ID based on colors (no random — avoids SSR mismatch)
  const uniqueId = `wave-grad-${position}-${(fromColor ?? "").replace(/[^a-z0-9]/gi, "")}`;

  // When a gradient is requested, use an inline SVG <linearGradient>
  // (background-clip: text doesn't apply to SVG fill elements)
  if (fromColor && toColor) {
    return (
      <div
        className={`editorial-wave-${position} ${className}`}
        style={style}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full block"
        >
          <defs>
            <linearGradient id={uniqueId} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={fromColor} />
              <stop offset="100%" stopColor={toColor} />
            </linearGradient>
          </defs>
          <path
            d="M0 120 C360 40 720 120 1080 40 C1440 -40 1440 120 1440 120 H0 Z"
            fill={`url(#${uniqueId})`}
          />
        </svg>
      </div>
    );
  }

  return (
    <div
      className={`editorial-wave-${position} ${className}`}
      style={{ color: resolvedColor, ...style }}
      aria-hidden="true"
    >
      {waveSVG}
    </div>
  );
}

/* Convenience: pair of waves for section transitions */
export function WaveTransition({ from = "warm", to = "dark", className = "" }: {
  from?: WaveColor;
  to?: WaveColor;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <WaveDivider position="bottom" color={from} />
      <WaveDivider position="top" color={to} className="mt-[-1px]" />
    </div>
  );
}