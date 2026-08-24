"use client";

import { useEffect, useRef } from "react";

/**
 * Focus trap hook for modals, dropdowns, lightboxes.
 * Traps focus within the container when active.
 */
export function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    function handleTab(e: KeyboardEvent) {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        // Let parent handle close via onClose prop
        const event = new CustomEvent("focusTrapEscape");
        container.dispatchEvent(event);
      }
    }

    container.addEventListener("keydown", handleTab);
    container.addEventListener("keydown", handleKeyDown);

    // Focus first element on mount
    firstElement?.focus();

    return () => {
      container.removeEventListener("keydown", handleTab);
      container.removeEventListener("keydown", handleKeyDown);
    };
  }, [isActive]);

  return containerRef;
}