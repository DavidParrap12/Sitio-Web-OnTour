"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

export interface TimelineItemProps {
  day: number | string;
  title: string;
  location?: string;
  children?: ReactNode;
}

interface CircuitTimelineProps {
  items: TimelineItemProps[];
}

export function CircuitTimeline({ items }: CircuitTimelineProps) {
  return (
    <div className="relative border-l border-editorial-border ml-4 md:ml-6 space-y-12 pb-8">
      {items.map((item, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: i * 0.05 }}
          className="relative pl-8 md:pl-12"
        >
          {/* Node */}
          <div className="absolute -left-3 top-1 w-6 h-6 rounded-full bg-white border-4 border-editorial-accent shadow-sm" />
          
          <div className="mb-3">
            <span className="label text-editorial-accent mb-1 block">Día {item.day}</span>
            <h3 className="heading-2">{item.title}</h3>
            {item.location && <span className="caption text-editorial-muted">{item.location}</span>}
          </div>
          
          {item.children && (
            <div className="body text-editorial-muted-light mt-3">
              {item.children}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
