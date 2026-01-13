"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight, Database, FileSpreadsheet, Server, ShieldCheck, TrendingUp, Globe } from "lucide-react";

export default function PartnersPage() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-form');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-background px-4 py-20">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_10%_20%,rgba(196,30,58,0.03),transparent_40%)] dark:bg-[radial-gradient(circle_at_10%_20%,rgba(124,58,237,0.1),transparent_40%)]" />
        
        <div className="container relative z-10 mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <Reveal width="100%" delay={0.1}>
              <div className="mb-6 inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-sm font-medium text-muted-foreground">
                <Database className="mr-2 h-4 w-4" />
                Espace Partenaires & Fournisseurs
              </div>
            </Reveal>

            <Reveal width="100%" delay={0.2}>
              <h1 className="mb-6 text-4xl font-bold leading-[1.1] md:text-6xl lg:text-7xl tracking-tight text-foreground">
                Standardisons <span className="text-primary">l'identification</span> des pièces automobiles.
              </h1>
            </Reveal>

            <Reveal width="100%" delay={0.4}>
              <p className="mx-auto mb-8 text-lg text-muted-foreground font-normal leading-relaxed md:text-xl max-w-2xl">
                Rejoignez lAwôl pour réduire les erreurs de commande, limiter les retours et augmenter vos ventes directes grâce à une identification précise.
              </p>
            </Reveal>

            <Reveal width="100%" delay={0.6}>
              <button
                onClick={scrollToContact}
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-primary border-2 border-primary px-8 py-4 font-bold text-white transition-all duration-300 hover:bg-primary/90 hover:scale-105 hover:shadow-xl cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Devenir Partenaire
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-16 text-center">
            <Reveal width="100%" delay={0.1}>
              <h2 className="text-4xl font-extrabold text-foreground md:text-5xl tracking-tight">
                Pourquoi intégrer lAwôl ?
              </h2>
            </Reveal>
            <Reveal width="100%" delay={0.2}>
              <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
                lAwôl n’est pas un revendeur. Nous sommes un apporteur d'affaires qualifié.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                title: "Réduction des Retours",
                description: "En sécurisant l'identification et la compatibilité avant l'achat, nous éliminons la cause #1 des retours produits.",
              },
              {
                icon: TrendingUp,
                title: "Ventes Qualifiées",
                description: "Recevez du trafic à haute intention d'achat. L'utilisateur sait déjà ce qu'il veut et que c'est compatible.",
              },
              {
                icon: Globe,
                title: "Visibilité Internationale",
                description: "Touchez une clientèle de particuliers et de garages indépendants, notamment sur les marchés émergents.",
              },
            ].map((item, index) => (
              <Reveal key={index} delay={0.2 + index * 0.1} width="100%">
                <div className="h-full rounded-2xl bg-card p-8 transition-all hover:bg-background hover:shadow-xl border border-border">
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Requirements */}
      <section id="contact-form" className="py-24 bg-background">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <Reveal width="100%" delay={0.1}>
                <h2 className="mb-6 text-4xl font-extrabold text-foreground md:text-5xl tracking-tight">
                  Intégration Technique
                </h2>
              </Reveal>
              <Reveal width="100%" delay={0.2}>
                <p className="mb-8 text-lg text-muted-foreground leading-relaxed">
                  Nous recherchons des catalogues techniques exploitables pour enrichir notre base de connaissance IA.
                  Nous ciblons prioritairement les familles : <strong>Filtres, Freinage, Bougies</strong>.
                </p>
              </Reveal>
              
              <div className="space-y-6">
                <Reveal width="100%" delay={0.3}>
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-card shadow-sm text-primary border border-border">
                      <FileSpreadsheet className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">Formats acceptés</h3>
                      <p className="text-muted-foreground">CSV, XML, Excel structuré</p>
                    </div>
                  </div>
                </Reveal>
                
                <Reveal width="100%" delay={0.4}>
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-card shadow-sm text-primary border border-border">
                      <Server className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">Connexions API</h3>
                      <p className="text-muted-foreground">REST, SOAP, ou accès FTP sécurisé</p>
                    </div>
                  </div>
                </Reveal>

                <Reveal width="100%" delay={0.5}>
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-card shadow-sm text-primary border border-border">
                      <Database className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">Données requises</h3>
                      <p className="text-muted-foreground">Références produits, Compatibilités véhicules (K-Type/VIN), Équivalences OEM.</p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>

            <Reveal width="100%" delay={0.3}>
              <div className="relative rounded-3xl bg-card p-8 shadow-2xl border border-border">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
                <h3 className="mb-6 text-2xl font-bold text-foreground">Contactez l'équipe Intégration</h3>
                <form className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">Entreprise</label>
                    <input type="text" className="w-full rounded-lg border border-input bg-background px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground" placeholder="Nom de votre société" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">Email professionnel</label>
                    <input type="email" className="w-full rounded-lg border border-input bg-background px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground" placeholder="contact@entreprise.com" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">Message</label>
                    <textarea className="w-full rounded-lg border border-input bg-background px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground" rows={4} placeholder="Parlez-nous de votre catalogue..." />
                  </div>
                  <button className="w-full rounded-lg bg-primary py-4 font-bold text-white transition-all hover:bg-primary/90">
                    Envoyer la demande
                  </button>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
