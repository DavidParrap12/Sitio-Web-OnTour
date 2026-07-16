import { type ReactNode } from "react";

interface EditorialBodyProps {
  /** Typography class: body-lg or body (default) */
  variant?: "body-lg" | "body";
  /** Whether to center the text block */
  centered?: boolean;
  /** Additional CSS classes */
  className?: string;
  children: ReactNode;
}

/**
 * Editorial body text with optimal line-height and max-width for readability.
 * Renders as a <div> to allow rich children (paragraphs, lists, etc.).
 */
export function EditorialBody({
  variant = "body",
  centered = false,
  className = "",
  children,
}: EditorialBodyProps) {
  return (
    <div
      className={`${variant} ${centered ? "mx-auto text-center" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
