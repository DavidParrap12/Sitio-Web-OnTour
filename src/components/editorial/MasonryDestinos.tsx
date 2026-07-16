"use client";

import { ReactNode, Children, isValidElement } from "react";
import { motion } from "framer-motion";

interface MasonryDestinosProps {
  children: ReactNode;
  className?: string;
}

export function MasonryDestinos({ children, className = "" }: MasonryDestinosProps) {
  const items = Children.toArray(children).filter(isValidElement);
  
  return (
    <div className={`grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-[350px] ${className}`}>
      {items.map((child, i) => {
        // Pattern: 1st item large (span 8), 2nd item small (span 4), 3rd small (span 4), 4th large (span 8), etc.
        const isLarge = i % 4 === 0 || i % 4 === 3;
        const colSpan = isLarge ? "md:col-span-8" : "md:col-span-4";
        
        return (
          <motion.div 
            key={i} 
            className={`${colSpan} relative rounded-2xl overflow-hidden h-full editorial-reveal`}
            style={{ animationDelay: `${(i % 4) * 150}ms` }}
          >
            {child}
          </motion.div>
        );
      })}
    </div>
  );
}
