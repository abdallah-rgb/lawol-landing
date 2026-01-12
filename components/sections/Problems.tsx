"use client";

import { Check, X } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function Problems() {
  return (
    <section className="py-32 md:py-40 bg-white">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-16 lg:gap-24 lg:grid-cols-2 items-center">
          <Reveal width="100%" delay={0.2}>
            <div className="relative overflow-hidden rounded-3xl bg-gray-100 p-8 md:p-12">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-red-600 mb-8 md:text-4xl">Le calvaire habituel...</h3>
                <ul className="space-y-4">
                  {[
                    "Des heures perdues à appeler les magasins",
                    "Prix opaques et variables à la tête du client",
                    "Pièces incompatibles ou contrefaites",
                    "Aucune garantie en cas de problème"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-600">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-500">
                        <X className="h-4 w-4" />
                      </div>
                      <span className="text-lg font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal width="100%" delay={0.4}>
            <div className="relative overflow-hidden rounded-3xl bg-primary/5 p-8 md:p-12 border border-primary/10">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-primary mb-8 md:text-4xl">Avec lAwôl, c'est fini !</h3>
                <ul className="space-y-4">
                  {[
                    "Recherche centralisée en quelques clics",
                    "Comparaison des prix transparente",
                    "Fournisseurs certifiés et pièces garanties",
                    "Service client dédié et retours simplifiés"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-800">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                        <Check className="h-4 w-4" />
                      </div>
                      <span className="text-lg font-medium">{item}</span>
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
