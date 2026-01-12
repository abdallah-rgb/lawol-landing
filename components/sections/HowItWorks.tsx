"use client";

import { ScanLine, Layers, MousePointerClick } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  {
    icon: ScanLine,
    title: "Analysez",
    description: "Envoyez une photo, une référence ou un VIN. Notre IA analyse la pièce et réduit l'ambiguïté.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Layers,
    title: "Comprenez",
    description: "Accédez aux schémas techniques, vérifiez la compatibilité et découvrez les équivalences inter-marques.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: MousePointerClick,
    title: "Choisissez",
    description: "Comparez les offres objectives et sélectionnez la meilleure option, au meilleur prix.",
    color: "bg-green-100 text-green-600",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 md:py-40 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-20 md:mb-32 text-center">
          <Reveal width="100%" delay={0.1}>
            <h2 className="text-4xl font-extrabold text-secondary md:text-6xl tracking-tight">
              Comment ça marche ?
            </h2>
          </Reveal>
          <Reveal width="100%" delay={0.25}>
            <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
              Identification. Compréhension. Décision.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-8 md:grid-cols-3 relative z-10">
          {steps.map((step, index) => (
            <Reveal key={index} delay={0.4 + index * 0.2} width="100%">
              <div className="group relative rounded-2xl bg-white p-10 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-gray-100 hover:border-primary/50 h-full">
                <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-4xl font-bold text-primary shadow-inner transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                  <step.icon className="h-10 w-10" />
                </div>
                <h3 className="mb-6 text-3xl font-bold text-secondary">
                  {step.title}
                </h3>
                <p className="leading-relaxed text-gray-600 text-lg">
                  {step.description}
                </p>
                
                {/* Connector Line (visible on desktop) */}
                {index !== steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gray-200 -z-10 translate-x-1/2" />
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
