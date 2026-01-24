"use client";

import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowUpRight, ShieldCheck, BadgePercent, Shuffle, Car, GitMerge, Check } from "lucide-react";
import { ThreePreview } from "@/components/ui/ThreePreview";
import { cn } from "@/lib/utils";

const compatibleVehicles = [
  {
    make: "Audi",
    model: "RS6 Avant",
    year: "2020–2024",
    engine: "4.0 TFSI V8",
  },
  {
    make: "Audi",
    model: "RS7 Sportback",
    year: "2020–2024",
    engine: "4.0 TFSI V8",
  },
  {
    make: "Lamborghini",
    model: "Urus",
    year: "2019–2024",
    engine: "4.0 V8 Bi-Turbo",
  },
  {
    make: "Porsche",
    model: "Cayenne Turbo GT",
    year: "2021–2024",
    engine: "4.0 V8 Bi-Turbo",
  },
];

const vehicleOffers: Record<string, any[]> = {
  "RS6 Avant": [
    {
      partner: "Oscaro",
      country: "France",
      affiliateType: "Distributeur",
      mpn: "F 026 407 116",
      brand: "BOSCH",
      interchangeType: "Pièce identifiée",
      confidenceScore: 0.99,
      priceLabel: "Prix constaté",
      estimatedPrice: "14,90 €",
      url: "#",
      highlight: "Choix recommandé",
    },
    {
      partner: "Autodoc",
      country: "Allemagne",
      affiliateType: "Distributeur",
      mpn: "HU 7049 z",
      brand: "MANN-FILTER",
      interchangeType: "Équivalent validé",
      confidenceScore: 0.98,
      priceLabel: "Prix indicatif",
      estimatedPrice: "18,50 €",
      url: "#",
      highlight: "Qualité monte d'origine",
    },
    {
      partner: "Rose Passion",
      country: "France",
      affiliateType: "Spécialiste",
      mpn: "06M 198 405 F",
      brand: "VAG OEM",
      interchangeType: "Origine",
      confidenceScore: 1.0,
      priceLabel: "Prix catalogue",
      estimatedPrice: "34,00 €",
      url: "#",
      highlight: "Pièce Constructeur",
    },
  ],
  "RS7 Sportback": [
    {
      partner: "Oscaro",
      country: "France",
      affiliateType: "Distributeur",
      mpn: "F 026 407 116",
      brand: "BOSCH",
      interchangeType: "Pièce identifiée",
      confidenceScore: 0.99,
      priceLabel: "Prix constaté",
      estimatedPrice: "14,90 €",
      url: "#",
      highlight: "Meilleur prix",
    },
    {
      partner: "Mister Auto",
      country: "France",
      affiliateType: "Distributeur",
      mpn: "HU 7049 z",
      brand: "MANN-FILTER",
      interchangeType: "Équivalent validé",
      confidenceScore: 0.98,
      priceLabel: "Prix indicatif",
      estimatedPrice: "19,20 €",
      url: "#",
      highlight: "Disponibilité immédiate",
    },
    {
      partner: "Audi DB",
      country: "Allemagne",
      affiliateType: "Concessionnaire",
      mpn: "06M 198 405 F",
      brand: "VAG OEM",
      interchangeType: "Origine",
      confidenceScore: 1.0,
      priceLabel: "Prix catalogue",
      estimatedPrice: "36,00 €",
      url: "#",
      highlight: "Réseau officiel",
    },
  ],
  "Urus": [
    {
      partner: "Oscaro",
      country: "France",
      affiliateType: "Distributeur",
      mpn: "F 026 407 116",
      brand: "BOSCH",
      interchangeType: "Même pièce (Cross-ref)",
      confidenceScore: 0.99,
      priceLabel: "Prix malin",
      estimatedPrice: "14,90 €",
      url: "#",
      highlight: "Économie massive",
    },
    {
      partner: "Autodoc",
      country: "Allemagne",
      affiliateType: "Distributeur",
      mpn: "HU 7049 z",
      brand: "MANN-FILTER",
      interchangeType: "Équivalent validé",
      confidenceScore: 0.98,
      priceLabel: "Prix indicatif",
      estimatedPrice: "22,00 €",
      url: "#",
      highlight: "Alternative Premium",
    },
    {
      partner: "Scuderia Car Parts",
      country: "UK/Intl",
      affiliateType: "Spécialiste Luxe",
      mpn: "06M 198 405 F",
      brand: "Lamborghini OEM",
      interchangeType: "Origine",
      confidenceScore: 1.0,
      priceLabel: "Prix catalogue",
      estimatedPrice: "58,00 €",
      url: "#",
      highlight: "Boîte Constructeur",
    },
  ],
  "Cayenne Turbo GT": [
    {
      partner: "Oscaro",
      country: "France",
      affiliateType: "Distributeur",
      mpn: "F 026 407 116",
      brand: "BOSCH",
      interchangeType: "Même pièce",
      confidenceScore: 0.99,
      priceLabel: "Prix constaté",
      estimatedPrice: "14,90 €",
      url: "#",
      highlight: "Choix rationnel",
    },
    {
      partner: "Rose Passion",
      country: "France",
      affiliateType: "Spécialiste",
      mpn: "OX 1234 D",
      brand: "MAHLE",
      interchangeType: "Monte d'origine",
      confidenceScore: 0.99,
      priceLabel: "Prix spécialiste",
      estimatedPrice: "24,00 €",
      url: "#",
      highlight: "Fournisseur OEM",
    },
    {
      partner: "Porsche Center",
      country: "Allemagne",
      affiliateType: "Réseau",
      mpn: "9A7 198 405",
      brand: "Porsche OEM",
      interchangeType: "Origine",
      confidenceScore: 1.0,
      priceLabel: "Prix catalogue",
      estimatedPrice: "45,00 €",
      url: "#",
      highlight: "Garantie constructeur",
    },
  ],
};

export default function ResultsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultsContent />
    </Suspense>
  );
}

function ResultsContent() {
  const searchParams = useSearchParams();
  const initialVehicle = searchParams.get("vehicle") || "RS6 Avant";

  const [showStep1, setShowStep1] = useState(false);
  const [showStep2, setShowStep2] = useState(true);
  const [showStep3, setShowStep3] = useState(true);
  const [vehicleModelUrl, setVehicleModelUrl] = useState("/models/vehicles/2020_audi_rs6_avant.glb");
  const [partModelUrl, setPartModelUrl] = useState("/models/parts/oil_filter_bosch_-_low_poly.glb");
  const [selectedVehicle, setSelectedVehicle] = useState(initialVehicle);

  useEffect(() => {
    const vehicle = searchParams.get("vehicle");
    if (vehicle) {
      setSelectedVehicle(vehicle);
    }
  }, [searchParams]);
  
  const currentOffers = vehicleOffers[selectedVehicle] || vehicleOffers["RS6 Avant"];

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
      <div className="w-full bg-primary/10 text-primary text-[10px] md:text-xs font-bold text-center py-2 uppercase tracking-widest border-b border-primary/10">
        Démonstration — comment lAwôl sécurise l’identification avant l’achat
      </div>
      <Navbar />

      <section className="border-b border-border bg-background/80 backdrop-blur">
        <div className="container mx-auto max-w-7xl px-4 py-10 md:py-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Reveal width="100%" delay={0.1}>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground/80">
                Exemple de résultats
              </p>
              <h1 className="mt-3 text-2xl md:text-3xl font-extrabold tracking-tight">
                Résultats pour une Plaquette de frein Bosch
              </h1>
              <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-xl">
                  L’utilisateur arrive chez le distributeur avec une pièce déjà validée sur le plan technique.
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
                    defaultValue="/models/vehicles/2020_audi_rs6_avant.glb"
                    onChange={(event) => setVehicleModelUrl(event.target.value)}
                    className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  >
                    <option value="/models/vehicles/2020_audi_rs6_avant.glb">
                      Audi RS6 Avant • 2020 • V8 Biturbo
                    </option>
                    <option value="/models/vehicles/placeholder.glb" disabled>
                      Lamborghini Urus, RS7...
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
                    <option value="oil_filter">Filtre à Huile (Bosch)</option>
                    <option value="pads" disabled>Plaquettes Avant</option>
                    <option value="placeholder" disabled>
                      Bougies, capteurs...
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
                          Simulation : Définissez le contexte véhicule/pièce. En conditions réelles, l'IA lAwôl détecte ces infos instantanément.
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
                <div className="mt-2 h-48 md:h-56 w-full rounded-3xl border border-border/50 bg-neutral-100 shadow-sm overflow-hidden md:col-start-1 md:row-start-2 self-start">
                  <ThreePreview modelUrl={vehicleModelUrl} autoRotateSpeed={0.5} className="h-full w-full mix-blend-multiply" />
                </div>
                <div className="mt-2 h-48 md:h-56 w-full rounded-3xl border border-border/50 bg-neutral-100 shadow-sm overflow-hidden md:col-start-2 md:row-start-2 self-start">
                   <ThreePreview modelUrl={partModelUrl} autoRotateSpeed={0.5} className="h-full w-full mix-blend-multiply" />
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
                  1. Identification univoque (CPN) et validation technique.
                </motion.span>
                <motion.span
                  className="inline-flex items-center rounded-full bg-muted px-3 py-1"
                  initial={{ opacity: 0, scale: 0.9, y: 6 }}
                  animate={{ opacity: 1, scale: [1, 1.06, 1], y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  2. Révélation de la standardisation industrielle.
                </motion.span>
                <motion.span
                  className="inline-flex items-center rounded-full bg-muted px-3 py-1"
                  initial={{ opacity: 0, scale: 0.9, y: 6 }}
                  animate={{ opacity: 1, scale: [1, 1.06, 1], y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                  3. Accès aux offres contextualisées par véhicule.
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
                      Filtre à Huile (Bosch)
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Canonical Part Number (CPN) : <span className="font-mono">CPN-VAG-OIL-FILT-01</span>
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
                  {/* Vehicle Card */}
                  <div className="flex flex-col justify-between rounded-3xl bg-background/50 border border-border/60 p-5 md:p-6 transition-colors hover:bg-background/80">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/70">
                        Véhicule
                      </p>
                      <p className="mt-3 text-lg font-bold text-foreground">Audi RS6 Avant</p>
                      <div className="mt-1 flex flex-wrap gap-1.5">
                        <span className="inline-flex items-center rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">2020</span>
                        <span className="inline-flex items-center rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">V8 Biturbo</span>
                        <span className="inline-flex items-center rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">VIN partiel</span>
                      </div>
                    </div>
                  </div>

                  {/* OEM References Card */}
                  <div className="flex flex-col justify-between rounded-3xl bg-background/50 border border-border/60 p-5 md:p-6 transition-colors hover:bg-background/80">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/70">
                        Même pièce — références équivalentes
                      </p>
                      <div className="mt-3 flex flex-col gap-1">
                        <p className="font-mono text-sm font-semibold text-foreground tracking-tight">
                          F 026 407 116 (Bosch)
                        </p>
                        <p className="font-mono text-sm font-semibold text-foreground/80 tracking-tight">
                          06M 198 405 F (VAG OEM)
                        </p>
                        <p className="font-mono text-sm font-semibold text-foreground/80 tracking-tight">
                          HU 7049 z (Mann-Filter)
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-[10px] leading-relaxed text-muted-foreground">
                      <span className="font-medium text-foreground/80">Interchange type :</span> Équivalences validées techniquement.
                    </p>
                  </div>

                  {/* Confidence Score Card */}
                  <div className="relative overflow-hidden rounded-3xl bg-background/50 border border-border/60 p-5 md:p-6 transition-colors hover:bg-background/80">
                    <div className="relative z-10 flex h-full flex-col justify-between">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/70">
                          Niveau de confiance
                        </p>
                        <div className="mt-2 flex items-baseline gap-1">
                          <span className="text-3xl font-extrabold text-foreground tracking-tighter">4.95</span>
                          <span className="text-xs font-medium text-muted-foreground">/ 5.00</span>
                        </div>
                      </div>
                      <p className="mt-3 max-w-[60%] text-[10px] leading-relaxed text-muted-foreground">
                        Combinaison de fitment, données catalogue et historique.
                      </p>
                    </div>
                    
                    {/* 3D Preview positioned absolute right */}
                    <div className="absolute -right-6 bottom-0 top-0 w-32 md:w-40 opacity-100">
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
                        Identification Certifiée : lAwôl valide la pièce techniquement (CPN) et confirme sa compatibilité avant même de parler prix.
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

            <Reveal width="100%" delay={0.2}>
              <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold tracking-tight flex items-center gap-2">
                      <GitMerge className="h-5 w-5 text-primary" />
                      Compatibilité Multi-Véhicules
                    </h3>
                    <p className="mt-1 text-sm font-medium text-foreground">
                      Une même pièce peut équiper plusieurs marques, modèles et années.
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground">
                      <Check className="h-3.5 w-3.5 text-green-500" />
                      Compatible avec 4 véhicules
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                      Même pièce. Plusieurs véhicules.
                    </span>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {compatibleVehicles.map((vehicle) => {
                    const isActive = selectedVehicle === vehicle.model;
                    return (
                      <div
                        key={vehicle.model}
                        onClick={() => setSelectedVehicle(vehicle.model)}
                        className={cn(
                          "group relative flex items-center justify-between rounded-2xl border px-4 py-3 transition-all duration-200 cursor-pointer",
                          isActive
                            ? "border-primary bg-primary/5 shadow-sm"
                            : "border-border bg-background hover:border-primary/50 hover:bg-muted/50"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
                            isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:bg-muted/80"
                          )}>
                            <Car className="h-4 w-4" />
                          </div>
                          <div>
                            <p className={cn("text-sm font-bold", isActive ? "text-primary" : "text-foreground")}>
                              {vehicle.make} {vehicle.model}
                            </p>
                            <p className="text-[11px] text-muted-foreground">
                              {vehicle.year} • {vehicle.engine}
                            </p>
                          </div>
                        </div>
                        {isActive && (
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-primary animate-pulse" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>

            <Reveal width="100%" delay={0.25}>
              <div className="relative flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg md:text-xl font-semibold tracking-tight">
                    Offres disponibles pour {selectedVehicle}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    Offres pour ce véhicule avec une pièce déjà validée techniquement.
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
                        Intelligence Industrielle : Cliquez sur les autres véhicules compatibles. Constatez que pour une même pièce, le marché change.
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
              {currentOffers.map((offer, index) => (
                <Reveal key={`${selectedVehicle}-${offer.mpn}-${index}`} width="100%" delay={0.1 + index * 0.05}>
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
