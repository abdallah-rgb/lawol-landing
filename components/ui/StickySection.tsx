"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface StickySectionProps {
  children: React.ReactNode;
  className?: string;
  index?: number;
}

export function StickySection({ children, className = "", index = 0 }: StickySectionProps) {
  const ref = useRef(null);
  
  // Optional: Add a subtle scale effect when the section goes out of view
  // We need to track the scroll progress of THIS section relative to the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Scale down slightly and fade as it gets covered
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 1]); // Keep opacity at 1 to prevent transparency

  return (
    <div 
      className={`relative lg:sticky lg:top-0 lg:h-screen w-full flex flex-col justify-center ${className}`}
      style={{ zIndex: index * 10 }}
    >
      <motion.div 
        ref={ref}
        style={{ scale, opacity }}
        className={`relative w-full h-full flex flex-col justify-center ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
}
