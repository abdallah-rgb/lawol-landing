"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const testimonials = [
  {
    name: "Moussa Diop",
    role: "Chauffeur Taxi",
    content:
      "Avec lAwôl, j&apos;ai comparé plusieurs alternateurs pour ma Toyota en quelques secondes et choisi l&apos;offre la plus intéressante.",
    image: "https://i.pravatar.cc/100?img=11",
  },
  {
    name: "Aminata Sow",
    role: "Particulier",
    content:
      "Je vois enfin clair entre les références. Le comparateur m&apos;a aidée à choisir la bonne pièce sans passer des heures au téléphone.",
    image: "https://i.pravatar.cc/100?img=5",
  },
  {
    name: "Garage Moderne",
    role: "Partenaire Pro",
    content:
      "lAwôl aligne les offres de nos fournisseurs sur un seul écran. On garde la relation client, eux comparent les prix en toute transparence.",
    image: "https://i.pravatar.cc/100?img=3",
  },
];

export function Testimonials() {
  return (
    <section className="py-32 md:py-40 bg-muted dark:bg-black transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-20 md:mb-32 text-center">
          <Reveal width="100%" delay={0.1}>
            <h2 className="text-4xl font-extrabold text-foreground md:text-6xl tracking-tight">
              Ils nous font confiance
            </h2>
          </Reveal>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={index} delay={0.4 + index * 0.2} className="h-full">
              <div className="flex h-full flex-col rounded-2xl bg-card p-8 shadow-sm transition-shadow hover:shadow-md border border-border">
                <div className="mb-6 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="mb-6 flex-grow text-lg italic text-muted-foreground">
                  &quot;{testimonial.content}&quot;
                </p>
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden bg-muted">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
