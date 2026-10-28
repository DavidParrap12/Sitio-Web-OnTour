import type { ComponentProps } from "react";
import type { Link } from "@/i18n/navigation";

/**
 * Union of every pathname accepted by the localized `<Link>` component.
 * Useful when a route is stored as a plain string in data files.
 */
export type AppHref = ComponentProps<typeof Link>["href"];
