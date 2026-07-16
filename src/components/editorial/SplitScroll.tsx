"use client";

import { ReactNode } from "react";
import Image from "next/image";

interface SplitScrollProps {
  image: string;
  imageAlt: string;
  children: ReactNode;
}

export function SplitScroll({ image, imageAlt, children }: SplitScrollProps) {
  return (
    <div className="flex flex-col lg:flex-row relative bg-white">
      {/* Mobile Image (stack) */}
      <div className="lg:hidden relative h-[50vh] w-full">
        <Image src={image} alt={imageAlt} fill className="object-cover" />
      </div>
      
      {/* Desktop Sticky Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="sticky top-0 h-screen w-full">
          <Image src={image} alt={imageAlt} fill sizes="50vw" className="object-cover" priority />
        </div>
      </div>
      
      {/* Content */}
      <div className="w-full lg:w-1/2 p-8 md:p-16 lg:p-24 xl:p-32 flex flex-col justify-center min-h-screen">
        <div className="max-w-2xl mx-auto w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
