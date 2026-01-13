"use client";

import { User, Briefcase } from "lucide-react";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

export function Personas() {
  return (
    <section className="py-32 md:py-40 bg-muted transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-20 md:mb-32 text-center">
          <Reveal width="100%">
            <h2 className="text-4xl font-extrabold text-foreground md:text-6xl tracking-tight">
              Une solution pour tous
            </h2>
          </Reveal>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
          {/* Particulier */}
          <Reveal width="100%" delay={0.2}>
            <div className="group relative h-full overflow-hidden rounded-3xl bg-card transition-all hover:shadow-xl border border-border hover:border-primary/50">
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=800&auto=format&fit=crop"
                  alt="Conducteur heureux"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md">
                    <User className="h-5 w-5" />
                  </div>
                  <h3 className="text-3xl font-bold">Particuliers</h3>
                </div>
              </div>
              
              <div className="p-8">
                <p className="mb-6 text-muted-foreground text-lg md:text-xl leading-relaxed">
                  Vous cherchez une pièce pour votre véhicule personnel ? Évitez les arnaques et trouvez le bon prix immédiatement.
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    Recherche simplifiée par modèle
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    Paiement sécurisé
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    Livraison à domicile
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>

          {/* Professionnel */}
          <Reveal width="100%" delay={0.5}>
            <div className="group relative h-full overflow-hidden rounded-3xl bg-card text-foreground transition-all hover:shadow-xl border border-border hover:border-primary/50">
               <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?q=80&w=800&auto=format&fit=crop"
                  alt="Mécanicien professionnel"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary backdrop-blur-md text-primary-foreground">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <h3 className="text-3xl font-bold">Professionnels</h3>
                </div>
              </div>

              <div className="relative z-10 p-8">
                <div className="absolute top-0 right-0 -mt-20 -mr-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
                
                <p className="mb-6 text-muted-foreground text-lg md:text-xl relative z-10 leading-relaxed">
                  Garagistes, gestionnaires de flotte ? Utilisez l'IA pour sécuriser vos commandes et réduire les immobilisations.
                </p>
                <ul className="space-y-3 text-muted-foreground relative z-10">
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    Équivalences inter-marques
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    Réduction des erreurs d'identification
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    Optimisation des coûts d'achat
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
