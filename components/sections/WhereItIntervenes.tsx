"use client";

import { Search, ShoppingCart, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function WhereItIntervenes() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-background transition-colors duration-300 relative z-20">
      <div className="container mx-auto px-4 md:px-6 relative z-30">
        <Reveal width="100%" delay={0.1}>
          <div className="rounded-3xl border border-primary/20 bg-primary/5 px-6 py-8 md:px-12 md:py-16 shadow-lg">
            <div className="mb-8 md:mb-12">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">
                Positionnement Stratégique
              </p>
              <h2 className="text-3xl font-extrabold text-foreground md:text-5xl tracking-tight">
                Où intervient lAwôl ?
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3 mb-12">
              {[
                { icon: Search, label: "Avant la recherche produit" },
                { icon: ShoppingCart, label: "Avant la mise au panier" },
                { icon: CheckCircle2, label: "Avant la commande" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-background/80 px-6 py-8 border border-border/60 text-center shadow-sm transition-transform hover:-translate-y-1"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <item.icon className="h-7 w-7" />
                  </div>
                  <p className="text-lg font-bold text-foreground" suppressHydrationWarning>
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid gap-8 lg:grid-cols-2 items-center">
              <div>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
                  lAwôl intervient en amont du parcours d&apos;achat, au moment critique où l&apos;utilisateur tente d&apos;identifier la bonne pièce.
                </p>
                <div className="rounded-2xl bg-card px-6 py-6 border border-primary/15 shadow-sm">
                  <p className="font-semibold text-foreground text-lg">
                    Vous recevez des commandes déjà validées sur le plan technique.
                  </p>
                </div>
              </div>

              <div className="bg-background/50 rounded-2xl p-6 border border-border">
                <p className="font-bold text-foreground text-lg mb-4">Nous sécurisons :</p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>La compréhension de la pièce</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>La compatibilité véhicule</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>Les équivalences possibles</span>
                  </li>
                </ul>
                <p className="mt-6 text-sm text-muted-foreground italic border-t border-border pt-4">
                  ...avant toute redirection vers un distributeur ou une marketplace.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
