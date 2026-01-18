"use client";

import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  fullHeight?: boolean;
}

export function Reveal({
  children,
  width = "fit-content",
  className,
  delay = 0.25,
  duration = 0.8,
  yOffset = 30,
  fullHeight = false,
}: RevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    } else {
      mainControls.start("hidden");
    }
  }, [isInView, mainControls]);

  return (
    <div ref={ref} style={{ position: "relative", width }} className={className}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: yOffset },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{
          duration: duration,
          delay: delay,
          ease: [0.22, 1, 0.36, 1], // Custom "Premium" ease-out
        }}
        className={fullHeight ? "h-full" : undefined}
      >
        {children}
      </motion.div>
    </div>
  );
}
