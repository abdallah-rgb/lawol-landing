"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import Image from "next/image";
import { Globe2, HeartHandshake, Lightbulb } from "lucide-react";

export function Story() {
  return (
    <section className="py-16 md:py-20 lg:pb-32 bg-background transition-colors duration-300 relative overflow-hidden lg:h-full lg:flex lg:items-center">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-5">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary blur-3xl" />
        <div className="absolute top-1/2 right-0 w-64 h-64 rounded-full bg-secondary blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <Reveal width="100%">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 mb-2">
                <Globe2 className="w-4 h-4" />
                <span>Notre Histoire</span>
              </div>
            </Reveal>

            <Reveal width="100%" delay={0.2}>
              <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
                Né d&apos;un constat terrain, <br />
                <span className="text-primary">conçu pour le monde.</span>
              </h2>
            </Reveal>

            <Reveal width="100%" delay={0.4}>
              <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  Aujourd&apos;hui, dans de nombreux secteurs du e-commerce, la complexité a été absorbée par la plateforme. Acheter un vêtement en ligne ne nécessite ni expertise ni accompagnement : le système guide le choix et réduit le risque d&apos;erreur.
                </p>
                <p>
                  À l&apos;inverse, l&apos;achat de pièces automobiles repose encore largement sur l&apos;expertise de l&apos;utilisateur. Identifier correctement une pièce nécessite souvent la maîtrise des références, la compréhension des compatibilités et parfois la validation d&apos;un professionnel pour éviter l&apos;erreur.
                </p>
                <p>
                  Cette complexité a un impact direct sur la performance du marché. Elle se traduit par des erreurs de référence, des retours produits coûteux, des litiges évitables et un frein aux commandes internationales, notamment pour les particuliers et les garages indépendants.
                </p>
                <p>
                  <span className="block">👉 Le problème n&apos;est pas l&apos;utilisateur.</span>
                  <span className="block">👉 Le problème est l&apos;absence d&apos;un outil capable d&apos;absorber la complexité de l&apos;identification et de sécuriser la décision avant l&apos;achat.</span>
                </p>
              </div>
            </Reveal>

            <Reveal width="100%" delay={0.6}>
              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div className="flex gap-3 items-start">
                  <div className="bg-primary/10 p-2.5 rounded-lg text-primary">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1 text-base">Expertise Digitale</h4>
                    <p className="text-xs text-muted-foreground">Plus besoin d&apos;être mécanicien pour trouver la bonne pièce.</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="bg-secondary/10 p-2.5 rounded-lg text-secondary">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1 text-base">Confiance Totale</h4>
                    <p className="text-xs text-muted-foreground">Neutralité garantie pour un choix sans biais commercial.</p>
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
                
                <div className="absolute bottom-6 left-6 right-6 text-foreground">
                  <p className="text-xl font-bold mb-1">&quot;L&apos;ambition est globale.&quot;</p>
                  <p className="text-sm text-muted-foreground">Utile pour l&apos;utilisateur, créateur de valeur pour le marché.</p>
                </div>
              </div>
              
              {/* Floating Quote Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-6 -right-6 bg-card p-5 rounded-xl shadow-xl border border-border max-w-xs hidden md:block"
              >
                <p className="text-xs text-muted-foreground italic">
                  &quot;En Afrique, 80% des pièces sont achetées après une inspection physique. lAwôl digitalise cette confiance.&quot;
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <div className="w-6 h-6 rounded-full bg-primary" />
                  <span className="text-xs font-bold text-foreground">Founder</span>
                </div>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
