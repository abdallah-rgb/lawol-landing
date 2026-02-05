"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { IntroOverlay } from "@/components/layout/IntroOverlay";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Problems } from "@/components/sections/Problems";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhereItIntervenes } from "@/components/sections/WhereItIntervenes";
import { Features } from "@/components/sections/Features";
import { Story } from "@/components/sections/Story";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <main className="relative bg-background text-foreground transition-colors duration-300">
      <AnimatePresence mode="wait">
        {showIntro && <IntroOverlay onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>

      <Navbar />
      
      <div className="flex flex-col w-full">
        <Hero />
        <Features />
        <Problems />
        <HowItWorks />
        <WhereItIntervenes />
        <Story />
      </div>

      <Footer />
    </main>
  );
}
