"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

export function CTA() {
  return (
    <section className="py-32 md:py-48">
      <div className="container mx-auto px-4 md:px-6">
        <Reveal width="100%" delay={0.1}>
          <div className="relative overflow-hidden rounded-3xl bg-secondary px-6 py-24 text-center shadow-2xl md:px-12 md:py-40">
            {/* Background Image */}
            <div className="absolute inset-0 opacity-20">
              <Image
                src="https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=2000&auto=format&fit=crop"
                alt="Background Car"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80 mix-blend-multiply" />

            <div className="relative z-10 mx-auto max-w-4xl">
              <Reveal width="100%" delay={0.2}>
                <h2 className="mb-8 text-5xl font-extrabold text-white md:text-7xl tracking-tight leading-none">
                  Prêt à transformer votre expérience ?
                </h2>
              </Reveal>
              <Reveal width="100%" delay={0.4}>
                <p className="mb-12 text-2xl text-white/90 font-light leading-relaxed">
                  Ce n’est pas un site de vente de pièces. C’est la couche d’intelligence qui manquait au marché.
                </p>
              </Reveal>
              
              <Reveal width="100%" delay={0.6}>
                <form className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
                  <input
                    type="email"
                    placeholder="Votre adresse email"
                    className="flex-grow rounded-full border-2 border-transparent bg-white/10 px-6 py-4 text-white placeholder-white/60 backdrop-blur-sm transition-all focus:border-white focus:bg-white/20 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-8 py-4 font-bold text-primary transition-all duration-300 hover:scale-105 hover:shadow-xl hover:text-secondary"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      S'inscrire
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </span>
                    <div className="absolute inset-0 -z-0 h-full w-full translate-y-full bg-gray-100 transition-transform duration-300 group-hover:translate-y-0" />
                  </button>
                </form>
                <p className="mt-4 text-sm text-white/60">
                  Pas de spam, désabonnement à tout moment.
                </p>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
