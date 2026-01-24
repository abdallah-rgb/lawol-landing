"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight, Database, CheckCircle2, ShieldCheck, TrendingUp, Globe } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PartenairesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-4 py-20 md:py-32">
        <div className="container mx-auto max-w-5xl text-center">
          <Reveal width="100%">
             <div className="mb-8 inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary border border-primary/20 backdrop-blur">
                <Database className="mr-2 h-4 w-4" />
                Espace Partenaires & Fournisseurs
             </div>
          </Reveal>

          <Reveal width="100%" delay={0.1}>
            <h1 className="mb-8 text-4xl font-extrabold tracking-tight text-foreground md:text-6xl lg:text-7xl">
              Standardisons <span className="text-primary">l&apos;identification</span> des pièces automobiles.
            </h1>
          </Reveal>

          <Reveal width="100%" delay={0.2}>
            <p className="mx-auto mb-10 max-w-3xl text-lg text-muted-foreground md:text-xl">
              lAwôl construit une couche d’intelligence universelle dédiée à l’identification des pièces automobiles.
            </p>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto mb-10 max-w-3xl rounded-3xl bg-card/50 p-8 text-left border border-border backdrop-blur-md shadow-xl overflow-hidden relative"
            >
              {/* Decorative gradient blob */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
              
              <p className="mb-6 font-semibold text-foreground text-xl border-b border-border pb-4 relative z-10">
                Collaborer avec lAwôl, c’est :
              </p>
              
              <ul className="grid gap-4 sm:grid-cols-2 relative z-10">
                {[
                  "réduire les erreurs structurelles",
                  "sécuriser les volumes",
                  "améliorer l’expérience client finale",
                  "sans modifier votre modèle existant"
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + (i * 0.1) }}
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(var(--primary), 0.05)" }}
                    className="flex items-center gap-3 text-foreground/80 p-3 rounded-xl transition-colors cursor-default hover:bg-muted/50"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/20">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <span className="font-medium text-base">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </Reveal>

          <Reveal width="100%" delay={0.3}>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/#contact"
                className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-8 text-lg font-semibold text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Entrer en contact
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why Section */}
      <section className="bg-muted/30 py-20 md:py-32 transition-colors duration-300">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-16 text-center">
            <Reveal width="100%">
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                Pourquoi intégrer lAwôl ?
              </h2>
            </Reveal>
            <Reveal width="100%" delay={0.1}>
              <p className="mt-4 text-lg text-muted-foreground">
                lAwôl n&apos;est pas un revendeur. Nous sommes un apporteur d&apos;affaires qualifié.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Reveal width="100%" delay={0.2}>
              <div className="h-full rounded-3xl bg-card p-8 border border-border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="mb-4 text-xl font-bold text-foreground">Réduction des Retours</h3>
                <p className="text-muted-foreground">
                  En sécurisant l&apos;identification et la compatibilité avant l&apos;achat, nous éliminons la cause #1 des retours produits.
                </p>
              </div>
            </Reveal>

            <Reveal width="100%" delay={0.3}>
              <div className="h-full rounded-3xl bg-card p-8 border border-border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h3 className="mb-4 text-xl font-bold text-foreground">Ventes Qualifiées</h3>
                <p className="text-muted-foreground">
                  Recevez du trafic à haute intention d&apos;achat. L&apos;utilisateur sait déjà ce qu&apos;il veut et que c&apos;est compatible.
                </p>
              </div>
            </Reveal>

            <Reveal width="100%" delay={0.4}>
              <div className="h-full rounded-3xl bg-card p-8 border border-border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="mb-4 text-xl font-bold text-foreground">Visibilité Internationale</h3>
                <p className="text-muted-foreground">
                  Touchez une clientèle de particuliers et de garages indépendants, notamment sur les marchés émergents.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
