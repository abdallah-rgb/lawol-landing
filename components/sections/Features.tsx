"use client";

import { motion } from "framer-motion";
import { ScanSearch, BrainCircuit, Fingerprint, Scale, GitMerge, Lightbulb } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const features = [
  {
    icon: ScanSearch,
    title: "Identification Multi-entrées",
    description: "Photo, Référence OEM, VIN ou Immatriculation. Lancez la recherche avec ce que vous avez sous la main.",
    delay: 0.4,
  },
  {
    icon: BrainCircuit,
    title: "IA de Précision",
    description: "Analyse visuelle, géométrie et OCR. L'IA réduit l'ambiguïté dès l'entrée pour une identification fiable.",
    delay: 0.45,
  },
  {
    icon: Fingerprint,
    title: "Pièce Canonique (CPN)",
    description: "Un identifiant unique qui regroupe toutes les variantes et révèle les équivalences inter-marques.",
    delay: 0.5,
  },
  {
    icon: Scale,
    title: "Neutralité Totale",
    description: "Nous ne vendons pas de pièces. Nous ne gérons pas de stock. Nous optimisons votre choix en toute indépendance.",
    delay: 0.55,
  },
  {
    icon: GitMerge,
    title: "Compatibilités Élargies",
    description: "Découvrez les véhicules compatibles et les options équivalentes. « Même pièce, autre marque, moins chère ».",
    delay: 0.6,
  },
  {
    icon: Lightbulb,
    title: "Assistance Intelligente",
    description: "Schémas techniques et conseils pour confirmer visuellement la pièce et sécuriser votre décision.",
    delay: 0.65,
  },
];

export function Features() {
  return (
    <section id="features" className="bg-bg-alt py-16 lg:py-0 lg:h-full lg:flex lg:items-center transition-colors duration-300">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-10 lg:mb-12 text-center">
          <Reveal width="100%" delay={0.1}>
            <h2 className="text-3xl font-extrabold text-foreground md:text-5xl tracking-tight">
              Le changement de paradigme
            </h2>
          </Reveal>
          <Reveal width="100%" delay={0.25}>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Ce n’est plus le véhicule qui est au centre, c’est la pièce.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Reveal key={index} delay={feature.delay} width="100%">
              <div className="rounded-xl bg-card p-6 shadow-sm transition-all hover:-translate-y-2 hover:shadow-lg h-full border border-border hover:border-primary/50 group">
                <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
