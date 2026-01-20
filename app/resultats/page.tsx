"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowUpRight, ShieldCheck, BadgePercent, Shuffle } from "lucide-react";
import { ThreePreview } from "@/components/ui/ThreePreview";

const offers = [
  {
    partner: "Partenaire OEM",
    country: "France",
    affiliateType: "Constructeur",
    mpn: "OEM-123456",
    brand: "Constructeur officiel",
    interchangeType: "Origine constructeur",
    confidenceScore: 0.98,
    priceLabel: "Prix catalogue",
    estimatedPrice: "245 €",
    url: "#",
    highlight: "Référence d'origine",
  },
  {
    partner: "Grossiste A",
    country: "Côte d'Ivoire",
    affiliateType: "Distributeur",
    mpn: "AF-789012",
    brand: "Aftermarket Premium",
    interchangeType: "Équivalent premium",
    confidenceScore: 0.95,
    priceLabel: "Prix public indicatif",
    estimatedPrice: "185 €",
    url: "#",
    highlight: "Économie potentielle",
  },
  {
    partner: "Marketplace B",
    country: "Europe",
    affiliateType: "Marketplace",
    mpn: "EQ-456789",
    brand: "Équipementier",
    interchangeType: "Équivalent validé",
    confidenceScore: 0.91,
    priceLabel: "Fourchette constatée",
    estimatedPrice: "160–190 €",
    url: "#",
    highlight: "Plusieurs vendeurs",
  },
];

export default function ResultsPage() {
  const [showStep1, setShowStep1] = useState(true);
  const [showStep2, setShowStep2] = useState(true);
  const [showStep3, setShowStep3] = useState(true);
  const [vehicleModelUrl, setVehicleModelUrl] = useState("/models/vehicles/corolla.glb");
  const [partModelUrl] = useState("/models/parts/oil_filter.glb");

  const allHelpClosed = !showStep1 && !showStep2 && !showStep3;

  useEffect(() => {
    // Only access window/localStorage on client side
    if (typeof window === "undefined") return;
    
    // Wrap in a try-catch to be safe
    try {
      const step1Seen = window.localStorage.getItem("lawol_results_tour_step1");
      const step2Seen = window.localStorage.getItem("lawol_results_tour_step2");
      const step3Seen = window.localStorage.getItem("lawol_results_tour_step3");

      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (step1Seen === "1") setShowStep1(false);
      if (step2Seen === "1") setShowStep2(false);
      if (step3Seen === "1") setShowStep3(false);
    } catch (e) {
      console.warn("Failed to access localStorage:", e);
    }
  }, []);

  const dismissStep1 = () => {
    setShowStep1(false);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("lawol_results_tour_step1", "1");
    }
  };

  const dismissStep2 = () => {
    setShowStep2(false);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("lawol_results_tour_step2", "1");
    }
  };

  const dismissStep3 = () => {
    setShowStep3(false);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("lawol_results_tour_step3", "1");
    }
  };

  const resetHelps = () => {
    setShowStep1(true);
    setShowStep2(true);
    setShowStep3(true);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("lawol_results_tour_step1");
      window.localStorage.removeItem("lawol_results_tour_step2");
      window.localStorage.removeItem("lawol_results_tour_step3");
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground transition-colors duration-300">
      <Navbar />

      <section className="border-b border-border bg-background/80 backdrop-blur">
        <div className="container mx-auto max-w-7xl px-4 py-10 md:py-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Reveal width="100%" delay={0.1}>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground/80">
                Exemple de résultats
              </p>
              <h1 className="mt-3 text-2xl md:text-3xl font-extrabold tracking-tight">
                Résultats pour un filtre à huile
              </h1>
              <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-xl">
                lAwôl identifie la bonne pièce, agrège les équivalences et vous
                montre où l&apos;acheter chez nos partenaires.
              </p>
            </div>
          </Reveal>
          <Reveal width="100%" delay={0.2}>
            <div className="mt-3 md:mt-0 flex items-center gap-3 text-xs md:text-sm text-muted-foreground">
              <div className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 border border-border">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span>lAwôl ne vend pas de pièces</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-border/60 bg-background">
        <div className="container mx-auto max-w-7xl px-4 py-6 md:py-8">
          <Reveal width="100%" delay={0.15}>
            <div className="relative">
              <form
                action="#results"
                className="grid gap-4 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1.1fr)_minmax(0,0.8fr)] items-end"
              >
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground/80">
                    Véhicule
                  </label>
                  <select
                    defaultValue="/models/vehicles/corolla.glb"
                    onChange={(event) => setVehicleModelUrl(event.target.value)}
                    className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  >
                    <option value="/models/vehicles/corolla.glb">
                      Toyota Corolla 1.8 • 2016–2019 • Essence
                    </option>
                    <option value="/models/vehicles/placeholder.glb" disabled>
                      Autres modèles à venir
                    </option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground/80">
                    Type de pièce
                  </label>
                  <select
                    defaultValue="oil_filter"
                    className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  >
                    <option value="oil_filter">Filtre à huile moteur</option>
                    <option value="placeholder" disabled>
                      Freinage, filtres, bougies...
                    </option>
                  </select>
                </div>

                <div className="relative">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md hover:bg-primary/90 hover:shadow-lg transition-colors"
                  >
                    Afficher cet exemple
                  </button>
                  {showStep1 && (
                    <motion.div
                      className="absolute bottom-full mb-4 right-0 z-50 w-64 rounded-2xl border border-primary/50 bg-primary px-4 py-3 text-xs text-primary-foreground shadow-xl"
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="mb-1 inline-flex items-center rounded-full bg-primary-foreground/20 px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
                        Étape 1
                      </div>
                      <div className="flex items-start gap-2">
                        <p className="flex-1">
                          Sélectionnez le véhicule et le type de pièce. Cet exemple est pré-rempli.
                        </p>
                        <button
                          type="button"
                          onClick={dismissStep1}
                          className="ml-1 text-[10px] font-semibold text-primary-foreground/80 hover:text-primary-foreground"
                        >
                          OK
                        </button>
                      </div>
                      {/* Arrow */}
                      <div className="absolute -bottom-1.5 right-8 h-3 w-3 rotate-45 border-b border-r border-primary/50 bg-primary" />
                    </motion.div>
                  )}
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="results" className="py-10 md:py-16">
        <div className="container mx-auto max-w-7xl px-4 md:px-6 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.95fr)] items-start">
          <div className="space-y-8">
            <Reveal width="100%" delay={0.15}>
              <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-muted-foreground">
                <motion.span
                  className="inline-flex items-center rounded-full bg-muted px-3 py-1"
                  initial={{ opacity: 0, scale: 0.9, y: 6 }}
                  animate={{ opacity: 1, scale: [1, 1.06, 1], y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  1. Vérifier que la description de la pièce correspond à votre besoin.
                </motion.span>
                <motion.span
                  className="inline-flex items-center rounded-full bg-muted px-3 py-1"
                  initial={{ opacity: 0, scale: 0.9, y: 6 }}
                  animate={{ opacity: 1, scale: [1, 1.06, 1], y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  2. Comparer les options chez les partenaires.
                </motion.span>
                <motion.span
                  className="inline-flex items-center rounded-full bg-muted px-3 py-1"
                  initial={{ opacity: 0, scale: 0.9, y: 6 }}
                  animate={{ opacity: 1, scale: [1, 1.06, 1], y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                  3. Cliquer pour finaliser sur le site choisi.
                </motion.span>
              </div>
            </Reveal>

            <Reveal width="100%" delay={0.15}>
              <div className="relative rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground/80">
                      Pièce identifiée
                    </p>
                    <h2 className="mt-2 text-xl md:text-2xl font-bold tracking-tight">
                      Filtre à huile moteur
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Canonical Part Number (CPN) : <span className="font-mono">CPN-OF-00123</span>
                    </p>
                  </div>
                  <div className="rounded-2xl bg-primary/10 px-4 py-3 text-xs md:text-sm text-primary border border-primary/30">
                    <p className="font-semibold">Compatibilité confirmée</p>
                    <p className="text-[11px] md:text-xs text-primary/80">
                      Sur la base du VIN, des équivalences OEM et de la base fitment.
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3 text-sm">
                  <div className="rounded-2xl bg-background/60 border border-border/60 p-4 grid gap-4 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-center">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground/80">
                        Véhicule
                      </p>
                      <p className="mt-2 font-semibold">Toyota Corolla 1.8</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        2016–2019 • Essence • VIN partiel
                      </p>
                    </div>
                    <div className="h-32 md:h-40">
                      <ThreePreview modelUrl={vehicleModelUrl} autoRotateSpeed={0.7} className="h-full w-full" />
                    </div>
                  </div>
                  <div className="rounded-2xl bg-background/60 border border-border/60 p-4 grid gap-4 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-center">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground/80">
                      Références OEM
                    </p>
                    <p className="mt-2 font-mono text-xs">
                      90915-10004 • 90915-YZZE1
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Interchange type : OEM et équivalents validés.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-background/60 border border-border/60 p-4 grid gap-4 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-center">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground/80">
                      Niveau de confiance
                    </p>
                    <p className="mt-2 font-semibold">Score 0,96 / 1,00</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Combinaison de fitment, données catalogue et historique de clics.
                    </p>
                    <div className="h-32 md:h-40">
                      <ThreePreview modelUrl={partModelUrl} autoRotateSpeed={0.5} className="h-full w-full" />
                    </div>
                  </div>
                
                {showStep2 && (
                  <motion.div
                    className="absolute top-4 right-4 z-50 max-w-xs w-64 rounded-2xl border border-primary/50 bg-primary px-4 py-3 text-xs text-primary-foreground shadow-xl"
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="mb-1 inline-flex items-center rounded-full bg-primary-foreground/20 px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
                      Étape 2
                    </div>
                    <div className="flex items-start gap-2">
                      <p className="flex-1">
                        Ici, vérifiez que la description, le véhicule, les références OEM et le score de confiance correspondent à votre besoin.
                      </p>
                      <button
                        type="button"
                        onClick={dismissStep2}
                        className="ml-1 text-[10px] font-semibold text-primary-foreground/80 hover:text-primary-foreground"
                      >
                        OK
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
              </div>
            </Reveal>

            <Reveal width="100%" delay={0.25}>
              <div className="relative flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg md:text-xl font-semibold tracking-tight">
                    Offres partenaires pour cette pièce
                  </h2>
                  <p className="mt-1 text-xs md:text-sm text-muted-foreground">
                    Les prix et disponibilités sont indicatifs. Le détail final se fait directement sur le site du partenaire.
                  </p>
                </div>
                <div className="hidden md:flex items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-xs text-muted-foreground border border-border/60">
                  <Shuffle className="h-3.5 w-3.5" />
                  <span>Tri basé sur la pertinence, pas sur la commission.</span>
                </div>

                {showStep3 && (
                  <motion.div
                    className="absolute bottom-full mb-2 right-0 z-50 max-w-xs w-64 rounded-2xl border border-primary/50 bg-primary px-4 py-3 text-xs text-primary-foreground shadow-xl"
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="mb-1 inline-flex items-center rounded-full bg-primary-foreground/20 px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
                      Étape 3
                    </div>
                    <div className="flex items-start gap-2">
                      <p className="flex-1">
                        Comparez les partenaires, les types d’offres, les prix et les scores. Le clic vous envoie directement sur le site choisi.
                      </p>
                      <button
                        type="button"
                        onClick={dismissStep3}
                        className="ml-1 text-[10px] font-semibold text-primary-foreground/80 hover:text-primary-foreground"
                      >
                        OK
                      </button>
                    </div>
                    {/* Arrow */}
                    <div className="absolute -bottom-1.5 right-6 h-3 w-3 rotate-45 border-b border-r border-primary/50 bg-primary" />
                  </motion.div>
                )}
              </div>
            </Reveal>

            <div className="space-y-4">
              {offers.map((offer, index) => (
                <Reveal key={offer.mpn} width="100%" delay={0.3 + index * 0.08}>
                  <div className="rounded-2xl border border-border bg-card/90 px-4 py-4 md:px-6 md:py-5 shadow-sm hover:shadow-lg transition-shadow duration-200">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-semibold text-foreground">
                            {offer.partner}
                          </span>
                          <span className="inline-flex items-center rounded-full border border-border/70 bg-background px-2.5 py-1 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                            {offer.affiliateType}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {offer.country} • MPN : <span className="font-mono">{offer.mpn}</span> • Marque : {offer.brand}
                        </p>
                        <p className="text-xs text-muted-foreground/90">
                          {offer.interchangeType} • Score de confiance {Math.round(offer.confidenceScore * 100)}%
                        </p>
                      </div>

                      <div className="flex flex-col items-start md:items-end gap-2">
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground/80">
                              {offer.priceLabel}
                            </p>
                            <p className="text-lg md:text-xl font-bold tracking-tight">
                              {offer.estimatedPrice}
                            </p>
                          </div>
                          <BadgePercent className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                          <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-primary">
                            {offer.highlight}
                          </span>
                          <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-1">
                            Clics agrégés lAwôl, pas de panier interne.
                          </span>
                        </div>
                        <Link
                          href={offer.url}
                          className="mt-2 inline-flex items-center justify-center gap-1 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
                        >
                          Voir sur le site du partenaire
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <Reveal width="100%" delay={0.2}>
              <div className="rounded-3xl border border-border bg-muted/40 p-6 md:p-7 text-sm">
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground/80">
                  Comment lire cet écran ?
                </p>
                <h2 className="mt-3 text-base md:text-lg font-semibold">
                  lAwôl est une couche d&apos;intelligence, pas une boutique.
                </h2>
                <ul className="mt-3 space-y-2 text-xs md:text-sm text-muted-foreground">
                  <li>• Nous unifions les données pièces (CPN, OEM, équivalents).</li>
                  <li>• Nous validons la compatibilité véhicule via le fitment.</li>
                  <li>• Nous affichons les options chez plusieurs partenaires.</li>
                  <li>• Le clic sortant ouvre directement la page du partenaire.</li>
                </ul>
              </div>
            </Reveal>

            <Reveal width="100%" delay={0.3}>
              <div className="rounded-3xl border border-dashed border-border/70 bg-background/60 p-6 md:p-7 text-sm">
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground/80">
                  Données exploitées côté MVP
                </p>
                <div className="mt-3 grid gap-3 text-xs md:text-sm text-muted-foreground">
                  <div>
                    <p className="font-semibold text-foreground">parts_canonical</p>
                    <p>Pièce pivot qui relie OEM, aftermarket et fitment.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">parts_variant & interchange</p>
                    <p>MPN, équivalences, statut d&apos;interchange et score de confiance.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">fitment</p>
                    <p>Association pièce / véhicule (année, motorisation, niveau de confiance).</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">partners & partner_products</p>
                    <p>Qui vend quoi, où, et via quel type de partenariat.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">affiliate_clicks</p>
                    <p>Suivi des clics sortants pour optimiser l&apos;algorithme, jamais de panier interne.</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />

      {allHelpClosed && (
        <button
          type="button"
          onClick={resetHelps}
          className="fixed bottom-4 right-4 z-40 inline-flex items-center rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-lg hover:bg-primary/90"
        >
          Afficher l&apos;aide
        </button>
      )}
    </main>
  );
}
