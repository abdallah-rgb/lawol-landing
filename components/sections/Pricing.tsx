"use client";

import { Check } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

export function Pricing() {
  return (
    <section id="pricing" className="py-32 md:py-40 bg-background transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-20 md:mb-32 text-center">
          <Reveal width="100%">
            <h2 className="text-4xl font-extrabold text-foreground md:text-6xl tracking-tight">
              Tarifs simples
            </h2>
          </Reveal>
          <Reveal width="100%" delay={0.2}>
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
              Commencez gratuitement, payez seulement si vous êtes satisfait.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          {/* Free Plan */}
          <Reveal width="100%" delay={0.2}>
            <div className="rounded-3xl border border-border bg-card p-8 transition-all hover:border-primary/50 md:p-12">
              <h3 className="mb-4 text-3xl font-bold text-foreground">Gratuit</h3>
              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-5xl font-extrabold text-foreground">0 FCFA</span>
                <span className="text-xl text-muted-foreground">/ mois</span>
              </div>
              <p className="mb-8 text-lg text-muted-foreground">
                Pour les particuliers qui cherchent une pièce occasionnellement.
              </p>
              <ul className="mb-8 space-y-4">
                {["Recherche illimitée", "Accès aux prix publics", "Support par email"].map(
                  (item, i) => (
                    <li key={i} className="flex items-center gap-3 text-muted-foreground">
                      <Check className="h-5 w-5 text-green-500" />
                      {item}
                    </li>
                  )
                )}
              </ul>
              <Link
                href="#"
                className="block w-full rounded-xl border border-border bg-background py-4 text-center font-semibold text-foreground transition-all hover:bg-muted hover:text-primary"
              >
                Commencer
              </Link>
            </div>
          </Reveal>

          {/* Pro Plan */}
          <Reveal width="100%" delay={0.4}>
            <div className="relative overflow-hidden rounded-3xl border border-primary bg-primary/10 p-8 text-foreground shadow-2xl md:p-12 dark:bg-primary/20">
              <div className="absolute top-0 right-0 rounded-bl-xl bg-primary px-4 py-1 text-sm font-medium text-primary-foreground">
                Populaire
              </div>
              <h3 className="mb-4 text-3xl font-bold">Pro</h3>
              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-5xl font-extrabold">5.000 FCFA</span>
                <span className="text-xl text-muted-foreground">/ mois</span>
              </div>
              <p className="mb-8 text-lg text-muted-foreground">
                Pour les garages et les revendeurs qui veulent aller plus vite.
              </p>
              <ul className="mb-8 space-y-4">
                {[
                  "Recherches prioritaires",
                  "Prix négociés (-15%)",
                  "Support WhatsApp dédié",
                  "Tableau de bord commandes",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground">
                    <Check className="h-5 w-5 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="#"
                className="block w-full rounded-xl bg-primary py-4 text-center font-semibold text-primary-foreground transition-all hover:bg-primary/90"
              >
                S&apos;abonner
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
