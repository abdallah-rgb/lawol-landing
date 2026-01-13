"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import Image from "next/image";
import { Globe2, HeartHandshake, Lightbulb } from "lucide-react";

export function Story() {
  return (
    <section className="py-24 bg-background transition-colors duration-300 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-5">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary blur-3xl" />
        <div className="absolute top-1/2 right-0 w-64 h-64 rounded-full bg-secondary blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <Reveal width="100%">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 mb-4">
                <Globe2 className="w-4 h-4" />
                <span>Notre Histoire</span>
              </div>
            </Reveal>

            <Reveal width="100%" delay={0.2}>
              <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
                Né d'un constat terrain, <br />
                <span className="text-primary">conçu pour le monde.</span>
              </h2>
            </Reveal>

            <Reveal width="100%" delay={0.4}>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Aujourd’hui, acheter un vêtement en ligne est simple. La plateforme absorbe la complexité. 
                  En revanche, <strong className="text-foreground">acheter une pièce automobile reste un défi technique</strong>.
                </p>
                <p>
                  lAwôl est né d'une expérience terrain en <strong>Afrique</strong>, où une simple erreur d’identification pouvait immobiliser un véhicule pendant des semaines. Nous avons vite compris que ce problème était universel.
                </p>
                <p>
                  Le problème n’est pas l’utilisateur, c'est l'absence d'outil.
                  <br />
                  <span className="italic text-primary/80">"Nous ne vendons pas de pièces. Nous sommes la couche d'intelligence qui aide à choisir."</span>
                </p>
              </div>
            </Reveal>

            <Reveal width="100%" delay={0.6}>
              <div className="grid sm:grid-cols-2 gap-6 pt-4">
                <div className="flex gap-4 items-start">
                  <div className="bg-primary/10 p-3 rounded-lg text-primary">
                    <Lightbulb className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Expertise Digitale</h4>
                    <p className="text-sm text-muted-foreground">Plus besoin d'être mécanicien pour trouver la bonne pièce.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-secondary/10 p-3 rounded-lg text-secondary">
                    <HeartHandshake className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Confiance Totale</h4>
                    <p className="text-sm text-muted-foreground">Neutralité garantie pour un choix sans biais commercial.</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Visual Content */}
          <Reveal width="100%" delay={0.4}>
            <div className="relative">
              <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-border">
                <Image
                  src="https://images.unsplash.com/photo-1486006920555-c77dcf18193c?q=80&w=2000&auto=format&fit=crop"
                  alt="Mécanique automobile en Afrique"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                
                <div className="absolute bottom-8 left-8 right-8 text-foreground">
                  <p className="text-2xl font-bold mb-2">"L'ambition est globale."</p>
                  <p className="text-muted-foreground">Utile pour l'utilisateur, créateur de valeur pour le marché.</p>
                </div>
              </div>
              
              {/* Floating Quote Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-8 -right-8 bg-card p-6 rounded-xl shadow-xl border border-border max-w-xs hidden md:block"
              >
                <p className="text-sm font-medium italic text-muted-foreground">
                  "lAwôl permet d’acheter une pièce auto comme on achète un vêtement : sans être expert."
                </p>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
