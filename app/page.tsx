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
import { Testimonials } from "@/components/sections/Testimonials";
import { Pricing } from "@/components/sections/Pricing";
import { CTA } from "@/components/sections/CTA";
import { Story } from "@/components/sections/Story";
import { StickySection } from "@/components/ui/StickySection";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <main className="min-h-screen relative">
      <AnimatePresence mode="wait">
        {showIntro && <IntroOverlay onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>

      <Navbar />
      
      {/* Sticky Card Sections */}
      <StickySection index={1} className="bg-background">
        <Hero />
      </StickySection>

      <StickySection index={2} className="bg-background">
        <Features />
      </StickySection>

      <StickySection index={3} className="bg-background">
        <Problems />
      </StickySection>

      <StickySection index={4} className="bg-muted/30">
        <HowItWorks />
      </StickySection>

      <StickySection index={5} className="bg-background">
        <Story />
      </StickySection>

      {/* Normal Scroll Sections (z-index higher to cover the last sticky card) */}
      <div className="relative z-50 bg-background shadow-[0_-20px_40px_rgba(0,0,0,0.1)]">
        <Pricing />
        <Testimonials />
        <CTA />
        <Footer />
      </div>
    </main>
  );
}
