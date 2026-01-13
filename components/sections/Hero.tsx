"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Star, Rocket, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { Reveal } from "@/components/ui/Reveal";

export function Hero() {
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
      className="relative flex min-h-[95vh] lg:min-h-0 lg:h-full items-center overflow-hidden bg-background px-4 py-16 lg:py-0"
    >
      {/* Background Parallax Element */}
      <motion.div
        style={{ y: yBackground, opacity: opacityBackground }}
        className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_10%_20%,rgba(196,30,58,0.03),transparent_40%)] dark:bg-[radial-gradient(circle_at_10%_20%,rgba(124,58,237,0.1),transparent_40%)]"
      />

      <div className="container relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* Left Column: Content */}
          <div className="text-center lg:text-left">
            <Reveal width="100%" delay={0.1}>
              <div className="mb-4 lg:mb-6 inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary border border-primary/20">
                <Rocket className="mr-2 h-4 w-4" />
                Lancement de la phase Bêta
              </div>
            </Reveal>

            <Reveal width="100%" delay={0.2} duration={1.0}>
              <h1 className="mb-4 lg:mb-6 text-4xl font-extrabold leading-tight text-foreground md:text-6xl tracking-tight">
                Identifiez. Comprenez.{" "}
                <span className="relative inline-block text-primary">
                  <motion.span
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                    className="absolute bottom-1 left-0 -z-10 h-2 w-full bg-primary/20 md:bottom-2 md:h-4"
                  />
                  Choisissez.
                </span>
              </h1>
            </Reveal>

            <Reveal width="100%" delay={0.4} duration={1.0}>
              <p className="mb-6 text-base text-muted-foreground md:text-lg lg:text-xl font-light max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                lAwôl transforme l’identification en compréhension, la compatibilité en choix éclairé et la recherche en décision assistée.
              </p>
              <p className="mb-6 text-sm text-muted-foreground/80 md:text-base font-light max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                L'intelligence artificielle pour choisir la meilleure pièce, au meilleur prix.
              </p>
            </Reveal>

            <Reveal width="100%" delay={0.6}>
              <div className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start justify-center">
                <Link
                  href="#search"
                  className="group relative overflow-hidden rounded-full bg-primary border-2 border-primary px-6 py-3.5 text-base font-bold text-primary-foreground transition-all duration-300 hover:bg-background hover:text-primary hover:scale-105 hover:shadow-xl hover:shadow-primary/20"
                >
                  <span className="relative z-10">Trouver ma pièce</span>
                </Link>
                <Link
                  href="#how-it-works"
                  className="group relative overflow-hidden rounded-full bg-background border-2 border-secondary px-6 py-3.5 text-base font-bold text-secondary transition-all duration-300 hover:bg-secondary hover:text-secondary-foreground hover:scale-105 hover:shadow-xl"
                >
                  <span className="relative z-10">Comment ça marche</span>
                </Link>
              </div>
            </Reveal>

            <Reveal width="100%" delay={0.8} yOffset={30}>
              <div className="mt-8 lg:mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs md:text-sm font-medium text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-8 w-8 rounded-full border-2 border-background bg-muted"
                        style={{
                          backgroundImage: `url(https://i.pravatar.cc/100?img=${i + 10})`,
                          backgroundSize: "cover",
                        }}
                      />
                    ))}
                  </div>
                  <div className="flex text-yellow-400">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                </div>
                <div>
                  <span className="font-bold text-secondary">500+</span> automobilistes satisfaits
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Visuals */}
          <div className="relative hidden lg:flex items-center justify-center">
            <Reveal width="100%" delay={0.4} className="w-full">
              <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-border bg-card">
                <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent z-10 pointer-events-none" />
                
                {/* 
                  Vidéo locale : hero-parts.mp4.mp4
                */}
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover scale-105"
                >
                  <source src="/hero-parts.mp4.mp4" type="video/mp4" />
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
    </section>
  );
}
