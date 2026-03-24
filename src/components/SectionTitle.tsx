"use client";

import { motion } from "framer-motion";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  alignment?: "left" | "center" | "right";
}

export function SectionTitle({ title, subtitle, alignment = "center" }: SectionTitleProps) {
  return (
    <div className={`mb-12 flex flex-col ${alignment === "center" ? "items-center text-center" : alignment === "right" ? "items-end text-right" : "items-start text-left"}`}>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-5xl font-heading font-bold text-foreground"
      >
        {title}
        <div className={`h-1.5 w-16 bg-accent mt-4 rounded-full ${alignment === "center" ? "mx-auto" : alignment === "right" ? "ml-auto" : ""}`} />
      </motion.h2>
      
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6 text-foreground/70 text-lg md:text-xl max-w-2xl"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
