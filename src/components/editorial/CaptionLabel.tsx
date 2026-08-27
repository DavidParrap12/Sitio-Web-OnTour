import { type ReactNode } from "react";
import { MapPin, Clock, DollarSign, Users } from "lucide-react";

type CaptionIcon = "location" | "duration" | "price" | "group";

const iconMap: Record<CaptionIcon, typeof MapPin> = {
  location: MapPin,
  duration: Clock,
  price: DollarSign,
  group: Users,
};

export interface CaptionLabelProps {
  /** Text content */
  children: ReactNode;
  /** Icon to show before text */
  icon?: CaptionIcon;
  /** Style variant */
  variant?: "caption" | "label";
  /** Additional CSS classes */
  className?: string;
}

/**
 * Metadata text element — location, price, duration, group size.
 * Uses caption/label typography and optional Lucide icon prefix.
 */
export function CaptionLabel({
  children,
  icon,
  variant = "caption",
  className = "",
}: CaptionLabelProps) {
  const Icon = icon ? iconMap[icon] : null;

  return (
    <span className={`${variant} inline-flex items-center gap-1.5 ${className}`}>
      {Icon && <Icon className="w-3.5 h-3.5 flex-shrink-0" />}
      {children}
    </span>
  );
}
