"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";

interface PreviewItem {
  id: string;
  image: string;
  name: string;
  days: number;
  nights: number;
}

interface HeroCircuitPreviewProps {
  items: PreviewItem[];
}

/**
 * Horizontal scroll-preview of circuits for the listing hero.
 * Timeline metaphor: image nodes connected by a line, each linking
 * to its detail page. Native + drag-assisted horizontal scroll on overflow.
 */
export function HeroCircuitPreview({ items }: HeroCircuitPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [draggedDistance, setDraggedDistance] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
    setDraggedDistance(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    containerRef.current.scrollLeft = scrollLeft - walk;
    setDraggedDistance(Math.abs(walk));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative select-none">
      {/* Connecting line */}
      <div
        aria-hidden
        className="absolute top-9 left-0 right-0 h-px bg-white/25 pointer-events-none"
      />
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`flex gap-8 md:gap-10 overflow-x-auto pb-4 pt-2 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden touch-pan-x overscroll-x-contain ${
          isDragging ? "cursor-grabbing select-none" : "cursor-grab"
        }`}
      >
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="shrink-0"
          >
            <Link
              href={`/circuitos/${item.id}` as any}
              onClickCapture={(e) => {
                if (draggedDistance > 5) {
                  e.preventDefault();
                }
              }}
              className="group flex flex-col items-center gap-3 w-24 md:w-28"
            >
              <span className="relative block w-[72px] h-[72px] md:w-[80px] md:h-[80px] rounded-full overflow-hidden ring-2 ring-white/40 group-hover:ring-editorial-accent-light transition-all duration-300 shadow-lg group-hover:scale-105 pointer-events-none">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="80px"
                  draggable={false}
                  className="object-cover pointer-events-none"
                />
              </span>
              <span className="text-center pointer-events-none">
                <span className="block text-xs font-semibold text-white leading-tight line-clamp-2 group-hover:text-editorial-accent-light transition-colors">
                  {item.name}
                </span>
                <span className="block text-[10px] text-white/60 mt-0.5 tracking-wide">
                  {item.days}D / {item.nights}N
                </span>
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
