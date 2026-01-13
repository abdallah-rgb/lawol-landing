"use client";

import { Star } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const testimonials = [
  {
    name: "Moussa Diop",
    role: "Chauffeur Taxi",
    content: "J'ai trouvé un alternateur pour ma Toyota en 2 minutes. Le prix était 30% moins cher que chez mon vendeur habituel.",
    image: "https://i.pravatar.cc/100?img=11",
  },
  {
    name: "Aminata Sow",
    role: "Particulier",
    content: "Service impeccable. La pièce a été livrée directement chez mon mécanicien. Je recommande vivement !",
    image: "https://i.pravatar.cc/100?img=5",
  },
  {
    name: "Garage Moderne",
    role: "Partenaire Pro",
    content: "lAwôl nous fait gagner un temps précieux. Plus besoin d'appeler 10 fournisseurs pour trouver une pièce rare.",
    image: "https://i.pravatar.cc/100?img=3",
  },
];

export function Testimonials() {
  return (
    <section className="py-32 md:py-40 bg-muted transition-colors duration-300">
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
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <div
                    className="h-12 w-12 rounded-full bg-muted"
                    style={{
                      backgroundImage: `url(${testimonial.image})`,
                      backgroundSize: "cover",
                    }}
                  />
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
