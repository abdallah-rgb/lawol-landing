"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Settings, Gauge, Wrench, Disc, CircleDashed, CarFront } from "lucide-react";
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
    // Wait for animation to finish before unlocking
    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background text-foreground overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
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

      <div className="relative z-10 flex flex-col items-center gap-12 w-full max-w-2xl px-4">
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

        {/* Interactive Car Button */}
        <div className="relative w-full h-32 flex items-center justify-center">
          <motion.button
            onClick={handleStart}
            disabled={isStarting}
            initial={{ scale: 0.8, opacity: 0, x: 0 }}
            animate={
              isStarting 
                ? { x: "100vw", opacity: 0, scale: 1.2 } 
                : { scale: 1, opacity: 1, x: 0 }
            }
            transition={
              isStarting
                ? { duration: 1.2, ease: "easeIn" }
                : { delay: 0.5, type: "spring" }
            }
            whileHover={!isStarting ? { scale: 1.1 } : {}}
            whileTap={!isStarting ? { scale: 0.95 } : {}}
            className="group relative flex flex-col items-center justify-center p-4 focus:outline-none"
          >
             {/* Car Icon (Custom styled) */}
             <div className={cn(
               "relative z-10 transition-colors duration-300",
               isStarting ? "text-primary" : "text-foreground group-hover:text-primary"
             )}>
                <CarFront size={80} strokeWidth={1.5} />
                
                {/* Headlights effect when starting */}
                {isStarting && (
                  <>
                    <motion.div 
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 0.8, width: 200 }}
                      className="absolute top-1/2 right-0 h-20 -translate-y-1/2 bg-gradient-to-r from-yellow-200/50 to-transparent blur-xl" 
                    />
                  </>
                )}
             </div>

             {/* Text below car */}
             <span className={cn(
                "mt-4 text-xs font-bold uppercase tracking-widest transition-colors duration-300",
                isStarting ? "opacity-0" : "text-muted-foreground group-hover:text-primary"
             )}>
               Tap to Drive
             </span>

             {/* Exhaust smoke effect */}
             {isStarting && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: [0.8, 0], scale: 2, x: -100 }}
                  transition={{ duration: 1 }}
                  className="absolute bottom-4 left-0 w-10 h-10 bg-gray-400/50 rounded-full blur-xl"
                />
             )}
          </motion.button>
          
          {/* Road line */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-muted-foreground/30 to-transparent w-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          />
        </div>
      </div>
    </motion.div>
  );
}
