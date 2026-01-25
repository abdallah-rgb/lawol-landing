"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Settings, Wrench, Disc, CircleDashed, Hammer, Gauge } from "lucide-react";

const icons = [
  Settings,
  Wrench,
  Disc,
  CircleDashed,
  Hammer,
  Gauge,
];

interface FloatingIconsProps {
  className?: string;
}

export function FloatingIcons({ className }: FloatingIconsProps) {
  // Config state for floating icons
  const [configs, setConfigs] = useState<any[]>([]);

  useEffect(() => {
    const newConfigs = Array.from({ length: 25 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 40 + Math.random() * 60,
      duration: 20 + Math.random() * 20,
      delay: Math.random() * 5,
    }));
    setConfigs(newConfigs);
  }, []);

  if (configs.length === 0) return null;

  return (
    <div className={`fixed inset-0 overflow-hidden pointer-events-none z-0 ${className}`}>
      {configs.map((config, i) => {
        const Icon = icons[i % icons.length];
        const colorClass = i % 2 === 0 ? "text-primary/10" : "text-primary/5";

        return (
          <motion.div
            key={i}
            className={`absolute ${colorClass}`}
            initial={{
              x: `${config.x}%`,
              y: `${config.y}%`,
              opacity: 0,
              scale: 0.5,
              rotate: 0,
            }}
            animate={{
              y: [
                `${config.y}%`,
                `${(config.y + 30) % 100}%`,
                `${config.y}%`,
              ],
              x: [
                `${config.x}%`,
                `${(config.x + 10) % 100}%`,
                `${config.x}%`,
              ],
              rotate: [0, 180, 360],
              opacity: [0.2, 0.4, 0.2],
              scale: [0.8, 1.1, 0.8],
            }}
            transition={{
              duration: config.duration,
              repeat: Infinity,
              ease: "linear",
              delay: config.delay,
            }}
            style={{
              left: 0,
              top: 0,
            }}
          >
            <Icon size={config.size} />
          </motion.div>
        );
      })}
    </div>
  );
}
