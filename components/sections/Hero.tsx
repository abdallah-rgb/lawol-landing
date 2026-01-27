"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Star, Rocket, ShieldCheck, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SearchInterface } from "@/components/features/SearchInterface";

export function Hero() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacityBackground = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[95vh] lg:min-h-0 lg:h-full items-center overflow-hidden bg-background px-4 pt-32 pb-20 lg:py-0"
    >
      {/* Background Parallax Element */}
      <motion.div
        style={{ y: yBackground, opacity: opacityBackground }}
        className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_10%_20%,rgba(0,127,128,0.05),transparent_40%)] dark:bg-[radial-gradient(circle_at_10%_20%,rgba(45,212,191,0.08),transparent_40%)]"
      />

      <div className="container relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left Column: Content */}
          <div className="text-center lg:text-left space-y-8">
            <Reveal width="100%" delay={0.1}>
              <motion.div 
                className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary border border-primary/20 shadow-sm hover:shadow-md transition-shadow"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Rocket className="mr-2 h-4 w-4" />
                Hub d’identification de pièces automobiles
              </motion.div>
            </Reveal>

            <Reveal width="100%" delay={0.2} duration={1.0}>
              <h1 className="text-4xl font-extrabold leading-snug text-foreground md:text-6xl tracking-tight">
                Identifiez. Comprenez.{" "}
                <span className="relative inline-block text-primary">
                  <motion.span
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                    className="absolute bottom-2 left-0 -z-10 h-3 w-full bg-primary/20 md:bottom-3 md:h-5 rounded-sm"
                  />
                  Choisissez.
                </span>
              </h1>
            </Reveal>

            <Reveal width="100%" delay={0.4} duration={1.0}>
              <div className="space-y-6">
                <p className="text-base text-muted-foreground md:text-lg lg:text-xl font-light max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  lAwôl est un hub d’identification : photo, référence OEM ou VIN. Vous donnez ce que vous avez, nous sécurisons la compatibilité.
                </p>
                <p className="text-sm text-muted-foreground/80 md:text-base font-light max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Nous ne vendons pas de pièces. Nous révélons les équivalences, le potentiel d’économie et redirigeons vers nos partenaires.
                </p>
              </div>
            </Reveal>

            <Reveal width="100%" delay={0.6}>
              <div className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start justify-center pt-2">
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="group relative overflow-hidden rounded-full bg-primary border-2 border-primary px-8 py-4 text-base font-bold text-primary-foreground transition-all duration-300 hover:bg-background hover:text-primary hover:scale-105 hover:shadow-xl hover:shadow-primary/20 cursor-pointer"
                >
                  <span className="relative z-10">Trouver ma pièce</span>
                </button>
                <Link
                  href="#how-it-works"
                  className="group relative overflow-hidden rounded-full bg-background border-2 border-secondary dark:border-white px-8 py-4 text-base font-bold text-foreground transition-all duration-300 hover:bg-secondary hover:text-foreground hover:scale-105 hover:shadow-xl"
                >
                  Comment ça marche
                </Link>
              </div>
            </Reveal>

            <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs md:text-sm font-medium text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i, index) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.5, ease: "easeOut" }}
                      className="h-10 w-10 rounded-full border-2 border-background bg-muted shadow-sm"
                      style={{
                        backgroundImage: `url(https://i.pravatar.cc/100?img=${i + 10})`,
                        backgroundSize: "cover",
                      }}
                    />
                  ))}
                </div>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.2 + i * 0.1, type: "spring", stiffness: 200 }}
                    >
                      <Star className="h-4 w-4 fill-current" />
                    </motion.div>
                  ))}
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.7, duration: 0.5 }}
              >
                <span className="font-bold text-foreground">500+</span> automobilistes satisfaits
              </motion.div>
            </div>
          </div>

          {/* Right Column: Visuals */}
          <div className="relative hidden lg:flex items-center justify-center">
            <Reveal width="100%" delay={0.4} className="w-full">
              <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-border bg-card">
                <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent z-10 pointer-events-none" />
                
                {/* 
                  Vidéo locale
                */}
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover scale-105"
                >
                  <source src="/hero-parts.mp4" type="video/mp4" />
                </video>
                
                {/* Floating Card */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    delay: 1.2,
                    duration: 0.8,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  className="absolute bottom-6 left-6 right-6 rounded-xl bg-card/90 p-4 backdrop-blur-md border border-border shadow-lg z-20 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-foreground font-bold text-sm">Pièces Certifiées</p>
                      <p className="text-muted-foreground text-xs">Qualité garantie à 100%</p>
                    </div>
                  </div>
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                </motion.div>
              </div>
            </Reveal>
            
            {/* Decorative Elements - Glow behind video */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[120%] w-[120%] rounded-full bg-gradient-to-tr from-primary/10 via-accent/5 to-transparent blur-3xl" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden lg:block">
        <div className="rounded-full bg-muted/50 p-2 backdrop-blur-sm border border-border/50">
          <ChevronDown className="h-6 w-6 text-muted-foreground" />
        </div>
      </div>
      
      <SearchInterface isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </section>
  );
}
