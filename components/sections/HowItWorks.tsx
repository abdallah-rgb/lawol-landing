"use client";

import { ScanLine, Layers, MousePointerClick } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  {
    icon: ScanLine,
    title: "Analysez",
    description: "Envoyez une photo, une référence ou un VIN. Notre IA analyse la pièce et réduit l'ambiguïté.",
  },
  {
    icon: Layers,
    title: "Comprenez",
    description: "Accédez aux schémas techniques, vérifiez la compatibilité et découvrez les équivalences inter-marques.",
  },
  {
    icon: MousePointerClick,
    title: "Choisissez",
    description: "Comparez les offres objectives et sélectionnez la meilleure option, au meilleur prix.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 md:py-24 lg:py-32 bg-background transition-colors duration-300 relative z-20">
      <div className="container mx-auto px-4 md:px-6 relative z-30">
        <Reveal width="100%" delay={0.1}>
          <div className="mb-12 md:mb-16 rounded-3xl bg-card border border-border p-8 md:p-10 text-center shadow-sm">
            <h2 className="text-3xl font-extrabold text-foreground md:text-5xl tracking-tight mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Identification multi-entrées. Compréhension assistée. Écran Résultats unique, quel que soit le point de départ.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3 relative z-10">
          {steps.map((step, index) => (
            <Reveal key={index} delay={0.4 + index * 0.2} width="100%">
              <div className="group relative rounded-2xl bg-card p-8 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-border hover:border-primary/50 h-full">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-3xl font-bold text-primary shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                  <step.icon className="h-8 w-8" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="leading-relaxed text-muted-foreground text-base">
                  {step.description}
                </p>
                
                {/* Connector Line (visible on desktop) */}
                {index !== steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border -z-10 translate-x-1/2" />
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
