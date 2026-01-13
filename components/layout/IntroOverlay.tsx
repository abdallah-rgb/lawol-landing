"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Power, Settings, Gauge, Wrench, Disc, CircleDashed } from "lucide-react";
import { cn } from "@/lib/utils";

interface IntroOverlayProps {
  onComplete: () => void;
}

const icons = [Settings, Gauge, Wrench, Disc, CircleDashed];

export function IntroOverlay({ onComplete }: IntroOverlayProps) {
  const [isStarting, setIsStarting] = useState(false);

  // Lock scroll when intro is visible
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleStart = () => {
    setIsStarting(true);
    // Simulate engine start delay
    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background text-foreground"
      initial={{ opacity: 1 }}
      exit={{ y: "-100%", transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      {/* Background Animated Parts (Subtle) */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        {[...Array(15)].map((_, i) => {
          const Icon = icons[i % icons.length];
          return (
            <motion.div
              key={i}
              className="absolute text-primary"
              initial={{
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                scale: 0.5,
                opacity: 0,
              }}
              animate={{
                y: [null, Math.random() * -100],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Icon size={30 + Math.random() * 50} />
            </motion.div>
          );
        })}
      </div>

      <div className="relative z-10 flex flex-col items-center gap-12">
        {/* Logo Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4">
            lAwôl
          </h1>
          <p className="text-xl text-muted-foreground tracking-widest uppercase">
            Start Your Engine
          </p>
        </motion.div>

        {/* Start Button */}
        <motion.button
          onClick={handleStart}
          disabled={isStarting}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "relative group flex items-center justify-center w-32 h-32 md:w-40 md:h-40 rounded-full border-4 transition-all duration-500",
            isStarting 
              ? "bg-primary border-primary shadow-[0_0_50px_rgba(124,58,237,0.6)] scale-110" 
              : "bg-transparent border-muted-foreground hover:border-primary hover:shadow-[0_0_30px_rgba(124,58,237,0.3)]"
          )}
        >
          {/* Pulse Effect */}
          {!isStarting && (
            <span className="absolute inset-0 rounded-full border-4 border-primary opacity-0 group-hover:animate-ping" />
          )}

          <div className="flex flex-col items-center gap-2">
            <Power className={cn(
              "w-12 h-12 transition-colors duration-300",
              isStarting ? "text-white animate-pulse" : "text-foreground group-hover:text-primary"
            )} />
            <span className={cn(
              "text-xs font-bold uppercase tracking-widest transition-colors duration-300",
              isStarting ? "text-white" : "text-muted-foreground group-hover:text-primary"
            )} >
              Start
            </span>
          </div>

          {/* Rotating Ring when starting */}
          {isStarting && (
            <motion.div
              className="absolute inset-[-8px] rounded-full border-t-4 border-primary"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          )}
        </motion.button>
      </div>

      {/* Speed Lines Effect on Start */}
      {isStarting && (
        <motion.div
          className="absolute inset-0 z-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute w-full h-2 bg-primary/20 blur-xl animate-pulse top-1/2" />
          <div className="absolute w-[200%] h-1 bg-primary/50 top-1/2 rotate-45" />
          <div className="absolute w-[200%] h-1 bg-primary/50 top-1/2 -rotate-45" />
        </motion.div>
      )}
    </motion.div>
  );
}
