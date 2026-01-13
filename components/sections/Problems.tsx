"use client";

import { Check, X, AlertCircle } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function Problems() {
  return (
    <section className="py-32 md:py-40 lg:py-0 lg:h-full lg:flex lg:items-center bg-background transition-colors duration-300">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center mb-16">
          <Reveal width="100%">
            <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-6">Le Problème Structurel</h2>
          </Reveal>
          <Reveal width="100%" delay={0.2}>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Les sites actuels utilisent l’identification comme <span className="text-red-500 font-bold">outil de vente</span>, pas comme outil de décision.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-16 lg:gap-24 lg:grid-cols-2 items-stretch">
          <Reveal width="100%" delay={0.2}>
            <div className="relative overflow-hidden rounded-3xl bg-muted/50 p-8 md:p-12 h-full border border-red-500/10 hover:border-red-500/30 transition-colors">
              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-red-500/10 rounded-xl text-red-500">
                    <X className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Modèle Actuel</h3>
                </div>
                
                <ul className="space-y-6">
                  {[
                    { text: "Entrée unique par plaque/VIN", sub: "Bloquant si l'info est manquante" },
                    { text: "L'utilisateur ne comprend pas", sub: "Achat à l'aveugle sans expertise" },
                    { text: "Équivalences invisibles", sub: "Impossible d'optimiser le prix" },
                    { text: "Risque d'erreur élevé", sub: "Si le contexte initial est faux, tout est faux" }
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-muted-foreground">
                      <AlertCircle className="h-6 w-6 shrink-0 text-red-500 mt-0.5" />
                      <div>
                        <span className="text-lg font-medium text-foreground block">{item.text}</span>
                        <span className="text-sm opacity-80">{item.sub}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal width="100%" delay={0.4}>
            <div className="relative overflow-hidden rounded-3xl bg-primary/5 p-8 md:p-12 h-full border border-primary/20 hover:border-primary/50 transition-colors">
              <div className="space-y-6">
                 <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Approche lAwôl</h3>
                </div>

                <ul className="space-y-6">
                  {[
                    { text: "Identification Multi-entrées", sub: "Photo, OEM, VIN : vous avez le choix" },
                    { text: "Compréhension visuelle", sub: "L'IA et les schémas valident la pièce" },
                    { text: "Transparence totale", sub: "Comparaison objective des options" },
                    { text: "Décision assistée", sub: "Choisissez la meilleure pièce, au meilleur prix" }
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-foreground">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground mt-0.5">
                        <Check className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="text-lg font-bold block">{item.text}</span>
                        <span className="text-sm text-muted-foreground">{item.sub}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
