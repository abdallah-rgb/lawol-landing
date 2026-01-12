"use client";

import { motion } from "framer-motion";
import { Settings, Wrench, Disc, CircleDashed, Hammer, Gauge } from "lucide-react";
import { useEffect, useState } from "react";

const icons = [
  Settings,     // Gear
  Wrench,       // Tool
  Disc,         // Brake Disc
  CircleDashed, // Tire/Wheel
  Hammer,       // Repair
  Gauge,        // Speedometer/Pressure
];

interface FloatingIconsProps {
  className?: string;
}

export function FloatingIcons({ className }: FloatingIconsProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={`fixed inset-0 overflow-hidden pointer-events-none z-0 ${className}`}>
      {/* Generate multiple floating icons */}
      {[...Array(25)].map((_, i) => {
        const Icon = icons[i % icons.length];
        const randomX = Math.random() * 100; // 0-100%
        const randomY = Math.random() * 100; // 0-100%
        const randomSize = 40 + Math.random() * 60; // 40-100px (Larger)
        const randomDuration = 20 + Math.random() * 20; // 20-40s
        const randomDelay = Math.random() * 5;
        
        // Alterner entre couleur primaire et variantes pour plus de profondeur
        const colorClass = i % 2 === 0 ? "text-primary/10" : "text-primary/5";

        return (
          <motion.div
            key={i}
            className={`absolute ${colorClass}`}
            initial={{ 
              x: `${randomX}%`, 
              y: `${randomY}%`,
              opacity: 0,
              scale: 0.5,
              rotate: 0 
            }}
            animate={{ 
              y: [
                `${randomY}%`, 
                `${(randomY + 30) % 100}%`, // Move down/up
                `${randomY}%`
              ],
              x: [
                `${randomX}%`,
                `${(randomX + 10) % 100}%`,
                `${randomX}%`
              ],
              rotate: [0, 180, 360],
              opacity: [0.2, 0.4, 0.2], // Increased opacity
              scale: [0.8, 1.1, 0.8]
            }}
            transition={{
              duration: randomDuration,
              repeat: Infinity,
              ease: "linear",
              delay: randomDelay,
            }}
            style={{
              left: 0,
              top: 0,
            }}
          >
            <Icon size={randomSize} />
          </motion.div>
        );
      })}
    </div>
  );
}
