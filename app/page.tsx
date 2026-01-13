"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { IntroOverlay } from "@/components/layout/IntroOverlay";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Problems } from "@/components/sections/Problems";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Features } from "@/components/sections/Features";
import { Personas } from "@/components/sections/Personas";
import { Testimonials } from "@/components/sections/Testimonials";
import { Pricing } from "@/components/sections/Pricing";
import { CTA } from "@/components/sections/CTA";
import { StickySection } from "@/components/ui/StickySection";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <main className="min-h-screen relative">
      <AnimatePresence mode="wait">
        {showIntro && <IntroOverlay onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>

      <Navbar />
      
      <StickySection index={1} className="bg-background">
        <Hero />
      </StickySection>
      
      <StickySection index={2} className="bg-background">
        <Problems />
      </StickySection>
      
      <StickySection index={3} className="bg-muted/50">
        <HowItWorks />
      </StickySection>
      
      <StickySection index={4} className="bg-muted">
        <Features />
      </StickySection>

      <div className="relative z-50">
        <Personas />
        <Testimonials />
        <Pricing />
        <CTA />
        <Footer />
      </div>
    </main>
  );
}
