"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, ScanLine, CheckCircle2, Loader2, Camera, Smartphone, Info, FileText, Search, ChevronDown, ArrowLeft, ShoppingBag, Tag } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { VehicleScanningLoader } from "@/components/ui/VehicleScanningLoader";
import { Part3DViewer } from "@/components/ui/Part3DViewer";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { useSmoothScroll } from "@/components/ui/SmoothScroll";

// Mock Data for Categories and Parts
const PART_FAMILIES = [
  { id: "entretien", name: "Entretien courant", icon: "🔧" },
  { id: "freinage", name: "Freinage", icon: "🛑" },
  { id: "bougies", name: "Bougies", icon: "⚡" },
  { id: "capteurs", name: "Capteurs", icon: "📡" },
];

const MOCK_PARTS: Record<string, Array<{
  id: string;
  name: string;
  brand: string;
  priceRange: string;
  compatibleWith: string[];
  modelPath?: string;
}>> = {
  entretien: [
    {
      id: "oil-filter-bosch",
      name: "Filtre à huile",
      brand: "Bosch",
      priceRange: "18€ – 32€",
      compatibleWith: ["Audi RS6", "Audi RS7", "Lamborghini Urus"],
      modelPath: "/models/parts/oil_filter_bosch_-_low_poly.glb",
    },
    {
      id: "air-filter-mann",
      name: "Filtre à air",
      brand: "MANN-FILTER",
      priceRange: "25€ – 45€",
      compatibleWith: ["Audi RS6", "Audi RS7"],
      modelPath: "/models/parts/air_filter.glb",
    },
  ],
  freinage: [
     {
      id: "brake-pad-brembo",
      name: "Plaquettes de frein avant",
      brand: "Brembo",
      priceRange: "120€ – 180€",
      compatibleWith: ["Audi RS6", "Lamborghini Urus"],
      modelPath: "/models/parts/brembo_brake.glb",
    },
  ],
  bougies: [
    {
      id: "spark-plug-ngk",
      name: "Bougies d'allumage Iridium",
      brand: "NGK",
      priceRange: "15€ – 28€",
      compatibleWith: ["Audi RS6", "Porsche Cayenne Turbo GT"],
      modelPath: "/models/parts/spark_plug_lowploy_game_ready.glb",
    },
  ],
  capteurs: [
    {
      id: "sensor-bosch",
      name: "Capteur de pression d'huile",
      brand: "Bosch",
      priceRange: "~20 – 45 €",
      compatibleWith: ["Audi RS6", "Audi RS7", "Lamborghini Urus", "Porsche Cayenne"],
    },
  ],
};

interface SearchInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 
  | "upload" 
  | "scanning" 
  | "analyzing" 
  | "complete" 
  | "categories" 
  | "parts" 
  | "identify" 
  | "identify_manual" 
  | "identify_scan" 
  | "identify_result" 
  | "vin_selection";

// --- NAVIGATION CONFIGURATION ---
// Defines the logical order of screens for the VIN Photo Search flow.
// Modification here impacts the sequential navigation.
const PHOTO_SEARCH_SEQUENCE: Record<string, string> = {
  "identify": "identify_scan",       // Choice -> Photo Capture
  "identify_scan": "scanning",       // Photo Capture -> Scanning
  "scanning": "analyzing",           // Scanning -> Analyzing (Automatic)
  "analyzing": "identify_result",    // Analyzing -> Result (Automatic)
  "identify_result": "redirect"      // Result -> Final Page
};

export function SearchInterface({ isOpen, onClose }: SearchInterfaceProps) {
  const [step, setStep] = useState<Step>("upload");
  const [searchMode, setSearchMode] = useState<"image" | "vin">("image");
  const [vinInput, setVinInput] = useState("");
  const [vinError, setVinError] = useState("");
  // const [fileError, setFileError] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<string>("");
  const [selectedPart, setSelectedPart] = useState<string>("Filtre à Huile (Bosch)");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  // const [vinAction, setVinAction] = useState<"identify" | "explore" | null>(null);
  const [specificQuery, setSpecificQuery] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const lenis = useSmoothScroll();
  const [mounted, setMounted] = useState(false);
  const [isCompatibleListOpen, setIsCompatibleListOpen] = useState(false);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  // Validation rules for each step
  const validateStep = useCallback((currentStep: string): boolean => {
    switch (currentStep) {
      case "identify_scan":
        return !!selectedImage; // Must have an image to proceed to scanning
      case "identify_result":
        return !!selectedVehicle; // Must have a vehicle to proceed to results
      default:
        return true;
    }
  }, [selectedImage, selectedVehicle]);

  // Sequential Navigation Handler
  const navigateToNext = useCallback((currentStep: string) => {
    if (!validateStep(currentStep)) {
      console.warn(`Validation failed for step: ${currentStep}`);
      return;
    }

    const nextStep = PHOTO_SEARCH_SEQUENCE[currentStep];
    if (nextStep) {
      if (nextStep === "redirect") {
        const params = new URLSearchParams();
        params.set("q", selectedPart);
        params.set("vehicle", selectedVehicle);
        params.set("source", "vin_photo");
        router.push(`/resultats?${params.toString()}`);
      } else {
        setStep(nextStep as Step);
      }
    }
  }, [selectedPart, selectedVehicle, router, validateStep]); // Added dependencies


  useEffect(() => {
    setTimeout(() => {
        setMounted(true);
    }, 0);
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, []);

  // Reset state when closed
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (!isOpen) {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
      
      timeoutId = setTimeout(() => {
        setStep("upload");
        setSearchMode("image");
        setVinInput("WVWZZZ3CZKA123456");
        setVinError("");
        // setFileError("");
        setSelectedImage(null);
        setSelectedVehicle("");
        setSelectedPart("Filtre à Huile (Bosch)");
        setIsCompatibleListOpen(false);
        setSelectedCategory(null);
        // setVinAction(null);
        setSpecificQuery("");
      }, 500);
    }
    return () => clearTimeout(timeoutId);
  }, [isOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      lenis?.stop();
      // Only apply overflow hidden on desktop or ensure it doesn't break mobile scroll
      // On mobile, we rely on the modal's fixed positioning and z-index
      if (window.innerWidth >= 768) {
         document.body.style.overflow = "hidden";
         document.documentElement.style.overflow = "hidden";
      } else {
        // On mobile, sometimes body overflow hidden causes issues with address bar
        // We'll try to lock it but be careful
        document.body.style.overflow = "hidden";
      }
      document.body.style.overscrollBehavior = "none";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.overscrollBehavior = "";
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.overscrollBehavior = "";
    };
  }, [isOpen, lenis]);

  useEffect(() => {
    // Auto-redirect for VIN photo identification (Sequential Navigation)
    if (step === "identify_result" && searchMode === "vin" && selectedImage && selectedVehicle) {
      const timer = setTimeout(() => {
        navigateToNext("identify_result");
      }, 3000); // Wait 3 seconds to let user see the result
      return () => clearTimeout(timer);
    }
  }, [step, searchMode, selectedImage, selectedVehicle, selectedPart, router, navigateToNext]); // navigateToNext uses these dependencies implicitly

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      startAnalysisProcess(imageUrl);
    }
  };

  const handleVinSubmit = () => {
    const cleanVin = vinInput.trim().toUpperCase();
    const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/;
    
    if (!cleanVin) {
      setVinError("Veuillez saisir un numéro VIN");
      return;
    }
    
    if (cleanVin.length !== 17) {
      setVinError(`Le VIN doit contenir 17 caractères (actuellement : ${cleanVin.length})`);
      return;
    }
    
    if (!vinRegex.test(cleanVin)) {
      setVinError("Format VIN invalide (caractères non autorisés: I, O, Q)");
      return;
    }

    setVinError("");
    setSelectedVehicle("audi_rs6"); // Pre-select vehicle for VIN flow
    startAnalysisProcess();
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem("lawol_vin_action");
      if (saved === "identify" || saved === "explore") {
        setTimeout(() => {
          // setVinAction(saved as "identify" | "explore");
        }, 0);
      }
    } catch {}
  }, []);

  const chooseVinAction = (action: "identify" | "explore") => {
    // setVinAction(action);
    try {
      localStorage.setItem("lawol_vin_action", action);
    } catch {}
    if (action === "identify") {
      setStep("identify");
    } else {
      setStep("categories");
    }
  };

  const startAnalysisProcess = (overrideImage?: string) => {
    setStep("scanning");
    
    // Clear any existing timeouts
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    
    // Simulate scanning phase (2 seconds for user perception)
    const t1 = setTimeout(() => {
      navigateToNext("scanning");
    }, 2000);

    // Simulate analysis completion (2 seconds for analyzing phase)
    const t2 = setTimeout(() => {
      // Use overrideImage if provided (for immediate calls after state set), otherwise use state
      const hasImage = overrideImage || selectedImage;
      
      if (searchMode === "vin" && !hasImage) {
        setStep("vin_selection");
      } else if (searchMode === "vin") {
        navigateToNext("analyzing");
      } else {
        setStep("complete");
      }
    }, 4000);

    timeoutsRef.current.push(t1, t2);
  };

  const content = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] overflow-y-auto bg-background/95 backdrop-blur-md"
          onClick={(e) => {
            // Empêcher la propagation des clics vers l'arrière-plan
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <div className="flex min-h-[100dvh] items-center justify-center p-4 py-8 md:py-12">
            {/* Back Button for VIN Mode */}
            {searchMode === "vin" && step !== "upload" && (
              <button 
                onClick={() => {
                  setSearchMode("image");
                  setStep("upload");
                }}
                className="fixed top-6 left-6 p-2 rounded-full hover:bg-muted transition-colors z-[10000] bg-background/50 backdrop-blur-sm border border-border/50"
                aria-label="Retour au mode Image"
              >
                <ArrowLeft className="h-6 w-6 text-muted-foreground" />
              </button>
            )}

            <button 
              onClick={onClose}
              className="fixed top-6 right-6 p-2 rounded-full hover:bg-muted transition-colors z-[10000] bg-background/50 backdrop-blur-sm border border-border/50"
            >
              <X className="h-6 w-6 text-muted-foreground" />
            </button>

            <div 
              className="w-full max-w-lg relative my-auto"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
            >
              <AnimatePresence mode="wait">
              {step === "upload" && (
                <motion.div
                  key="upload"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-card border border-border rounded-3xl p-8 shadow-2xl text-center"
                >
                  {/* Tabs */}
                  <div className="flex p-1 bg-muted rounded-xl mb-8 relative">
                    <motion.div
                      className="absolute top-1 bottom-1 bg-background rounded-lg shadow-sm"
                      initial={false}
                      animate={{ 
                        left: searchMode === "image" ? "4px" : "50%", 
                        width: "calc(50% - 4px)" 
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                    <button
                      onClick={() => setSearchMode("image")}
                      className={cn(
                        "flex-1 relative z-10 flex items-center justify-center gap-2 py-2 text-sm font-medium transition-colors",
                        searchMode === "image" ? "text-foreground" : "text-muted-foreground hover:text-foreground/80"
                      )}
                    >
                      <Camera className="h-4 w-4" />
                      Par Image
                    </button>
                    <button
                      onClick={() => setSearchMode("vin")}
                      className={cn(
                        "flex-1 relative z-10 flex items-center justify-center gap-2 py-2 text-sm font-medium transition-colors",
                        searchMode === "vin" ? "text-foreground" : "text-muted-foreground hover:text-foreground/80"
                      )}
                    >
                      <FileText className="h-4 w-4" />
                      Par VIN
                    </button>
                  </div>

                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                    {searchMode === "image" ? <Camera className="h-8 w-8" /> : <Search className="h-8 w-8" />}
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-3">
                    {searchMode === "image" ? "Identifiez votre pièce" : "Recherche par VIN"}
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    {searchMode === "image" 
                      ? "Prenez une photo ou importez une image de votre pièce. Notre IA l'analysera instantanément."
                      : "Saisissez le numéro VIN (17 caractères) pour trouver les pièces compatibles."}
                  </p>

                  {searchMode === "image" ? (
                    <>
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 hover:bg-primary/5 rounded-2xl p-10 cursor-pointer transition-all group"
                      >
                        <div className="flex flex-col items-center gap-4">
                          <div className="p-4 bg-muted rounded-full group-hover:scale-110 transition-transform">
                            <Upload className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                          <div className="space-y-1">
                            <p className="font-medium text-foreground">Cliquez pour importer</p>
                            <p className="text-xs text-muted-foreground">JPG, PNG jusqu&apos;à 10MB</p>
                          </div>
                        </div>
                      </div>
                      
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileSelect} 
                        className="hidden" 
                        accept="image/*"
                      />
                    </>
                  ) : (
                    <div className="w-full max-w-sm mx-auto">
                      <div className="relative">
                        <input
                          type="text"
                          inputMode="text"
                          autoCapitalize="characters"
                          autoCorrect="off"
                          autoComplete="off"
                          value={vinInput}
                          onChange={(e) => {
                            const val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 17);
                            setVinInput(val);
                            if (vinError) setVinError("");
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && vinInput.length > 0) {
                              handleVinSubmit();
                            }
                          }}
                          placeholder="Ex: WVWZZZ3CZ..."
                          className={cn(
                            "w-full bg-muted/50 border rounded-xl px-4 py-3 text-center text-lg font-mono tracking-widest focus:ring-2 focus:ring-primary/20 outline-none transition-all",
                            vinError ? "border-red-500 focus:border-red-500" : "border-border focus:border-primary"
                          )}
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-mono">
                          {vinInput.length}/17
                        </div>
                      </div>
                      
                      {vinError && (
                        <motion.p 
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-xs mt-2 font-medium"
                        >
                          {vinError}
                        </motion.p>
                      )}

                      <button
                        onClick={handleVinSubmit}
                        disabled={vinInput.length === 0}
                        className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Rechercher
                      </button>
                    </div>
                  )}

                  <div className="mt-6 bg-muted/50 dark:bg-white/5 rounded-xl p-4 text-left border border-border/50">
                    <div className="flex items-center gap-2 mb-2 text-foreground font-medium">
                      <Info className="h-4 w-4 text-primary" />
                      <span className="text-sm">
                        {searchMode === "image" ? "Conseils pour un scan optimal" : "Où trouver votre VIN ?"}
                      </span>
                    </div>
                    <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
                      {searchMode === "image" ? (
                        <>
                          <li>Nettoyez la pièce si possible</li>
                          <li>Éclairage suffisant recommandé</li>
                          <li>Photographiez l&apos;étiquette ou le code</li>
                        </>
                      ) : (
                        <>
                          <li>Carte grise (rubrique E)</li>
                          <li>Bas du pare-brise côté conducteur</li>
                          <li>Montant de la portière conducteur</li>
                        </>
                      )}
                    </ul>
                  </div>
                  
                  <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <Smartphone className="h-4 w-4" />
                    <span>Optimisé pour mobile</span>
                  </div>
                </motion.div>
              )}

              {(step === "scanning" || step === "analyzing" || step === "complete" || step === "categories" || step === "parts" || step === "vin_selection" || step === "identify" || step === "identify_manual" || step === "identify_scan" || step === "identify_result") && (
                <motion.div
                  layout
                  key="processing"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className={cn(
                    "relative rounded-3xl overflow-hidden shadow-2xl w-full max-w-sm mx-auto border border-border/50 transition-all duration-500",
                    (step === "complete" || step === "categories" || step === "parts" || step === "vin_selection" || step === "identify" || step === "identify_manual" || step === "identify_scan" || step === "identify_result") ? "md:h-[650px] h-[80dvh]" : "aspect-[4/5]",
                    searchMode === "vin" || step !== "complete" ? "bg-zinc-100 dark:bg-gradient-to-br dark:from-gray-900 dark:to-black" : "bg-card"
                  )}
                >
                  {/* 3D Scanning Animation Background - Only for VIN or when scanning */}
                  {searchMode === "vin" && (step === "scanning" || step === "analyzing") && (
                     <div className="absolute inset-0 z-0">
                        <VehicleScanningLoader step={step} />
                     </div>
                  )}

                  {/* Image Background (for Image mode or VIN Photo mode) */}
                  {selectedImage && (
                    <Image 
                      src={selectedImage} 
                      alt="Part Preview"
                      fill
                      className="object-cover opacity-60"
                      sizes="100vw"
                    />
                  )}
                  
                  {/* Scanning Overlay */}
                  <div className="absolute inset-0 z-10 pointer-events-none">
                    {step === "scanning" && (searchMode === "image" || selectedImage) && (
                      <motion.div 
                        initial={{ top: "0%" }}
                        animate={{ top: "100%" }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 right-0 h-1 bg-primary shadow-[0_0_20px_rgba(var(--primary),0.8)]"
                      />
                    )}
                    
                    <div className="absolute inset-0 flex flex-col z-20">
                      {(step === "scanning" || step === "analyzing") ? (
                        <div className="flex-1 flex flex-col items-center justify-end p-6 pb-12 text-center">
                          {/* Floating Status Card */}
                          <div className="bg-white/80 dark:bg-black/40 backdrop-blur-xl border border-border/50 dark:border-white/10 rounded-2xl p-6 w-full shadow-2xl">
                            {step === "scanning" && (
                              <div className="flex flex-col items-center gap-3">
                                <ScanLine className="h-8 w-8 text-primary animate-pulse" />
                                <h3 className="text-foreground dark:text-white font-bold text-lg">
                                  {(searchMode === "image" || selectedImage) ? "Scan en cours..." : "Vérification VIN..."}
                                </h3>
                                <p className="text-muted-foreground text-sm">
                                  {(searchMode === "image" || selectedImage) ? "Analyse de la géométrie" : "Décodage du constructeur"}
                                </p>
                              </div>
                            )}
                            
                            {step === "analyzing" && (
                              <div className="flex flex-col items-center gap-3">
                                <Loader2 className="h-8 w-8 text-primary animate-spin" />
                                <h3 className="text-foreground dark:text-white font-bold text-lg">
                                  {(searchMode === "image" || selectedImage) ? "Identification IA" : "Identification Véhicule"}
                                </h3>
                                <p className="text-muted-foreground text-sm">
                                  {(searchMode === "image" || selectedImage) ? "Recherche dans la base OEM..." : "Recherche options et finitions..."}
                                </p>
                                <div className="w-full bg-muted dark:bg-white/10 h-1 mt-2 rounded-full overflow-hidden">
                                  <motion.div 
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 2.5 }}
                                    className="h-full bg-primary"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <motion.div 
                          initial={{ y: "100%" }}
                          animate={{ y: 0 }}
                          className={cn(
                            "h-full flex flex-col rounded-3xl overflow-hidden shadow-2xl text-left pointer-events-auto",
                            searchMode === "vin" ? "bg-card dark:bg-black/40 backdrop-blur-md" : "bg-card"
                          )}
                        >
                          {step === "vin_selection" && (
                            // --- RESULTAT VIN (NOUVEAU - DARK MODE) ---
                            <>
                              <div className="p-6 pb-10 overflow-y-auto custom-scrollbar flex-1 overscroll-contain">
                                <div className="flex items-center gap-3 mb-6">
                                  <div className="bg-green-500/20 p-2.5 rounded-full shrink-0">
                                    <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                                  </div>
                                  <div>
                                    <h3 className="font-bold text-lg text-foreground dark:text-white leading-tight">Véhicule identifié</h3>
                                    <p className="text-xs text-muted-foreground">Identification VIN confirmée</p>
                                  </div>
                                </div>

                                {/* Vehicle Details Card */}
                                <div className="bg-muted/50 dark:bg-white/5 border border-border dark:border-white/10 rounded-2xl p-5 mb-6">
                                  <div className="flex justify-between items-start mb-4">
                                    <div>
                                      <h4 className="font-bold text-2xl text-foreground dark:text-white mb-1">Audi RS6 Avant</h4>
                                      <p className="text-sm text-muted-foreground font-mono">2020 — 4.0 TFSI V8</p>
                                    </div>
                                    <div className="h-10 w-10 bg-muted dark:bg-white/10 rounded-full flex items-center justify-center border border-border dark:border-white/10 shadow-sm">
                                        <ScanLine className="h-5 w-5 text-primary" />
                                    </div>
                                  </div>
                                  
                                  {/* Brand Logo */}
                                  <div className="relative w-full h-48 bg-zinc-100 dark:bg-zinc-900 rounded-xl overflow-hidden mb-2 border border-border/50 dark:border-white/5">
                                      <BrandLogo vehicle="Audi RS6 Avant" className="w-full h-full" />
                                  </div>
                                </div>

                                {/* Shared Parts Info */}
                                <div className="bg-blue-50/50 dark:bg-blue-900/20 border border-blue-200/50 dark:border-blue-500/30 rounded-xl p-4 flex gap-3 mb-6">
                                  <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                                  <div>
                                    <p className="text-sm text-blue-800 dark:text-blue-200 font-medium leading-tight">
                                      Ce véhicule partage des pièces avec d&apos;autres modèles.
                                    </p>
                                    <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">
                                      Vérifiez la compatibilité croisée ci-dessous.
                                    </p>
                                  </div>
                                </div>

                                {/* Compatible Vehicles Accordion */}
                                <div className="border-t border-border dark:border-white/10 pt-4">
                                  <button 
                                    onClick={() => setIsCompatibleListOpen(!isCompatibleListOpen)}
                                    className="w-full flex items-center justify-between py-2 group"
                                  >
                                    <span className="text-xs font-bold tracking-wider text-muted-foreground group-hover:text-foreground dark:group-hover:text-white transition-colors uppercase">
                                      Véhicules Compatibles
                                    </span>
                                    <ChevronDown className={cn(
                                      "h-4 w-4 text-muted-foreground transition-transform duration-300",
                                      isCompatibleListOpen ? "rotate-180" : ""
                                    )} />
                                  </button>
                                  
                                  <AnimatePresence>
                                    {isCompatibleListOpen && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                      >
                                        <div className="pt-3 space-y-2 pb-2">
                                          {[
                                            { model: "Audi RS7 Sportback", year: "2020-2024" },
                                            { model: "Lamborghini Urus", year: "2019-2024" },
                                            { model: "Porsche Cayenne Turbo GT", year: "2021-2024" }
                                          ].map((car, i) => (
                                            <div key={i} className="flex justify-between items-center text-sm p-2 rounded-lg hover:bg-muted/50 dark:hover:bg-white/5 transition-colors">
                                              <span className="font-medium text-foreground dark:text-white">{car.model}</span>
                                              <span className="text-muted-foreground text-xs font-mono">{car.year}</span>
                                            </div>
                                          ))}
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>

                                {/* ÉCRAN CLÉ – Choix de l'action */}
                                <div className="mt-6 rounded-2xl border border-border dark:border-white/10 bg-card dark:bg-black/40 p-5">
                                  <h4 className="text-lg font-bold text-foreground dark:text-white mb-4">
                                    Que souhaitez-vous faire ?
                                  </h4>
                                  <div className="grid gap-3 sm:grid-cols-2">
                                    <motion.button
                                      onClick={() => chooseVinAction("identify")}
                                      aria-label="Identifier une pièce précise"
                                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-border dark:border-white/10 bg-background hover:bg-muted dark:hover:bg-white/10 px-4 py-3 text-sm font-bold transition-colors"
                                      animate={{ 
                                        y: [0, -3, 0],
                                        boxShadow: ["0px 0px 0px rgba(0,0,0,0)", "0px 4px 12px rgba(0,0,0,0.1)", "0px 0px 0px rgba(0,0,0,0)"]
                                      }}
                                      transition={{ 
                                        duration: 3, 
                                        repeat: Infinity, 
                                        ease: "easeInOut",
                                        repeatType: "reverse"
                                      }}
                                      whileHover={{ 
                                        scale: 1.05,
                                        y: -2,
                                        boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
                                        transition: { duration: 0.3, ease: "easeOut" }
                                      }}
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      <motion.span 
                                        className="text-xl"
                                        animate={{ rotate: [0, -10, 10, 0] }}
                                        transition={{ 
                                          duration: 2, 
                                          repeat: Infinity, 
                                          ease: "easeInOut", 
                                          delay: 0.5,
                                          repeatDelay: 3
                                        }}
                                      >
                                        🔍
                                      </motion.span>
                                      Identifier une pièce précise
                                    </motion.button>
                                    <motion.button
                                      onClick={() => chooseVinAction("explore")}
                                      aria-label="Explorer les pièces compatibles"
                                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-3 text-sm font-bold transition-colors"
                                      animate={{ 
                                        y: [0, -3, 0],
                                        boxShadow: ["0px 0px 0px rgba(var(--primary),0)", "0px 4px 12px rgba(var(--primary),0.3)", "0px 0px 0px rgba(var(--primary),0)"]
                                      }}
                                      transition={{ 
                                        duration: 3, 
                                        repeat: Infinity, 
                                        ease: "easeInOut",
                                        repeatType: "reverse",
                                        delay: 1.5 // Staggered animation
                                      }}
                                      whileHover={{ 
                                        scale: 1.05,
                                        y: -2,
                                        boxShadow: "0px 10px 25px rgba(var(--primary),0.4)",
                                        transition: { duration: 0.3, ease: "easeOut" }
                                      }}
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      <motion.span 
                                        className="text-xl"
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ 
                                          duration: 2, 
                                          repeat: Infinity, 
                                          ease: "easeInOut", 
                                          delay: 2,
                                          repeatDelay: 3
                                        }}
                                      >
                                        📂
                                      </motion.span>
                                      Explorer les pièces compatibles
                                    </motion.button>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                          
                          {step === "complete" && (searchMode === "image" || (searchMode === "vin" && selectedImage)) && (
                            // --- RESULTAT IMAGE (RESTAURÉ - LIGHT MODE) ---
                            <div className="p-6 md:p-8 flex flex-col h-full text-left bg-card text-card-foreground">
                              <h3 className="text-3xl font-bold mb-6 text-foreground">Pièce Identifiée</h3>

                              <div className="flex items-start gap-4 mb-8">
                                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full shrink-0">
                                  <CheckCircle2 className="h-7 w-7 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                  <h4 className="text-xl font-bold text-foreground">Filtre à Huile (Bosch)</h4>
                                  <p className="text-muted-foreground text-base">Confiance: 95.0%</p>
                                </div>
                              </div>

                              <div className="bg-gray-50/50 dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800 rounded-2xl p-6 mb-4 shadow-sm">
                                <div className="flex justify-between items-center mb-5">
                                  <h5 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                                    VÉHICULE SUGGÉRÉ
                                  </h5>
                                  {selectedVehicle && (
                                    <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-green-200 dark:border-green-900/50">
                                      <CheckCircle2 className="h-3.5 w-3.5" />
                                      Compatibilité confirmée
                                    </div>
                                  )}
                                </div>
                                
                                <div className="relative mb-3">
                                  <select 
                                    className="w-full p-4 pr-10 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white text-base font-bold focus:ring-2 focus:ring-primary/10 outline-none appearance-none cursor-pointer shadow-sm transition-shadow hover:shadow-md"
                                    value={selectedVehicle}
                                    onChange={(e) => setSelectedVehicle(e.target.value)}
                                  >
                                    <option value="" disabled className="text-gray-500 dark:text-gray-400">Choisissez votre véhicule...</option>
                                    <option value="audi_rs6">Audi RS6 Avant (2020–2024)</option>
                                    <option value="audi_rs7">Audi RS7 Sportback (2020–2024)</option>
                                    <option value="lambo_urus">Lamborghini Urus (2019–2024)</option>
                                    <option value="porsche_cayenne">Porsche Cayenne Turbo GT (2021–2024)</option>
                                  </select>
                                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                                </div>

                                <p className="text-sm text-muted-foreground mt-3 leading-relaxed mb-4">
                                  Choisissez votre véhicule dans la liste pour confirmer la compatibilité.
                                </p>

                                {selectedVehicle && (
                                  <div className="w-full aspect-[16/9] bg-white dark:bg-zinc-900 rounded-xl flex items-center justify-center overflow-hidden border border-gray-100 dark:border-zinc-800 shadow-inner p-2">
                                      <div className="w-full h-full relative">
                                          <BrandLogo vehicle={selectedVehicle} className="w-full h-full" />
                                      </div>
                                  </div>
                                )}
                              </div>

                              <button 
                                onClick={() => {
                                    if (!selectedVehicle) return;
                                    const params = new URLSearchParams();
                                    params.set("q", selectedPart);
                                    params.set("vehicle", selectedVehicle);
                                    params.set("source", "image");
                                    router.push(`/resultats?${params.toString()}`);
                                }}
                                disabled={!selectedVehicle}
                                className={cn(
                                  "w-full mt-auto font-bold py-4 rounded-xl transition-all",
                                  selectedVehicle 
                                    ? "bg-[#00796B] hover:bg-[#00695C] text-white shadow-lg shadow-[#00796B]/20" 
                                    : "bg-gray-100 dark:bg-zinc-800 text-gray-400 dark:text-zinc-500 cursor-not-allowed"
                                )}
                              >
                                Rechercher cette pièce
                              </button>
                            </div>
                          )}

                          {step === "categories" && (
                            <div className="flex flex-col h-full bg-card dark:bg-black/40 backdrop-blur-md">
                                <div className="p-6 border-b border-border dark:border-white/10 flex items-center gap-3">
                                     <button onClick={() => setStep(searchMode === "vin" ? "vin_selection" : "complete")} className="p-2 hover:bg-muted dark:hover:bg-white/10 rounded-full transition-colors">
                                        <ArrowLeft className="h-5 w-5 text-foreground dark:text-white" />
                                     </button>
                                     <h3 className="text-xl font-bold text-foreground dark:text-white">Familles de pièces</h3>
                                </div>
                                <div className="p-6 overflow-y-auto custom-scrollbar flex-1 overscroll-contain">
                                     <p className="text-muted-foreground mb-6 text-sm">
                                        Sélectionnez une catégorie pour voir les pièces compatibles avec votre véhicule.
                                     </p>
                                     <div className="grid grid-cols-2 gap-4">
                                        {PART_FAMILIES.map((family) => (
                                            <button
                                                key={family.id}
                                                onClick={() => {
                                                    setSelectedCategory(family.id);
                                                    setStep("parts");
                                                }}
                                                className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-muted/50 dark:bg-white/5 border border-border dark:border-white/10 hover:border-primary/50 hover:bg-primary/5 dark:hover:bg-primary/20 transition-all group"
                                            >
                                                <span className="text-3xl filter grayscale group-hover:grayscale-0 transition-all">{family.icon}</span>
                                                <span className="font-medium text-foreground dark:text-white text-sm text-center">{family.name}</span>
                                            </button>
                                        ))}
                                     </div>
                                </div>
                            </div>
                          )}

                          {step === "identify" && (
                            <div className="flex flex-col h-full bg-card dark:bg-black/40 backdrop-blur-md">
                              <div className="p-6 border-b border-border dark:border-white/10 flex items-center gap-3">
                                <button onClick={() => setStep("vin_selection")} className="p-2 hover:bg-muted dark:hover:bg-white/10 rounded-full transition-colors" aria-label="Retour">
                                  <ArrowLeft className="h-5 w-5 text-foreground dark:text-white" />
                                </button>
                              </div>
                              <div className="p-6 flex flex-col justify-center flex-1">
                                <h2 className="text-2xl font-bold text-center text-foreground dark:text-white mb-8">
                                  Comment souhaitez-vous identifier la pièce ?
                                </h2>
                                <div className="grid gap-4">
                                  <motion.button
                                    onClick={() => {
                                      navigateToNext("identify");
                                    }}
                                    className="flex flex-col items-center justify-center gap-4 p-8 rounded-2xl border border-border dark:border-white/10 bg-background hover:bg-muted dark:hover:bg-white/5 transition-all group"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <div className="p-4 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                      <Camera className="h-8 w-8" />
                                    </div>
                                    <span className="font-bold text-lg">Prendre une photo de la pièce</span>
                                  </motion.button>

                                  <motion.button
                                    onClick={() => setStep("identify_manual")}
                                    className="flex flex-col items-center justify-center gap-4 p-8 rounded-2xl border border-border dark:border-white/10 bg-background hover:bg-muted dark:hover:bg-white/5 transition-all group"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <div className="p-4 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                      {/* Using Hash icon as generic numeric/reference icon */}
                                      <span className="font-mono text-2xl font-bold">#</span>
                                    </div>
                                    <span className="font-bold text-lg">Entrer une référence OEM ou MPN</span>
                                  </motion.button>
                                </div>
                              </div>
                            </div>
                          )}

                          {step === "identify_scan" && (
                            <div className="flex flex-col h-full bg-card dark:bg-black/40 backdrop-blur-md">
                              <div className="p-6 border-b border-border dark:border-white/10 flex items-center gap-3">
                                <button onClick={() => setStep("identify")} className="p-2 hover:bg-muted dark:hover:bg-white/10 rounded-full transition-colors" aria-label="Retour">
                                  <ArrowLeft className="h-5 w-5 text-foreground dark:text-white" />
                                </button>
                                <h3 className="text-xl font-bold text-foreground dark:text-white">Prendre une photo</h3>
                              </div>
                              <div className="p-6 flex flex-col justify-center flex-1 items-center gap-8">
                                <div className="text-center space-y-2">
                                  <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                                    <Camera className="h-10 w-10" />
                                  </div>
                                  <h3 className="text-xl font-bold text-foreground dark:text-white">Photo de la pièce</h3>
                                  <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                                    Prenez une photo claire ou importez une image depuis votre galerie pour une identification automatique.
                                  </p>
                                </div>

                                <div 
                                  onClick={() => fileInputRef.current?.click()}
                                  className="w-full max-w-xs border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 hover:bg-primary/5 rounded-3xl p-8 cursor-pointer transition-all group flex flex-col items-center gap-4"
                                >
                                  <div className="p-4 bg-muted rounded-full group-hover:scale-110 transition-transform">
                                    <Upload className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                                  </div>
                                  <span className="font-bold text-foreground dark:text-white">Ajouter une photo</span>
                                </div>
                                
                                <input 
                                  type="file" 
                                  ref={fileInputRef} 
                                  onChange={handleFileSelect} 
                                  className="hidden" 
                                  accept="image/*"
                                />
                              </div>
                            </div>
                          )}

                          {step === "identify_manual" && (
                            <div className="flex flex-col h-full bg-card dark:bg-black/40 backdrop-blur-md">
                              <div className="p-6 border-b border-border dark:border-white/10 flex items-center gap-3">
                                <button onClick={() => setStep("identify")} className="p-2 hover:bg-muted dark:hover:bg-white/10 rounded-full transition-colors" aria-label="Retour">
                                  <ArrowLeft className="h-5 w-5 text-foreground dark:text-white" />
                                </button>
                                <h3 className="text-xl font-bold text-foreground dark:text-white">Saisie manuelle</h3>
                              </div>
                              <div className="p-6 space-y-4 overflow-y-auto custom-scrollbar flex-1">
                                <p className="text-sm text-muted-foreground">Saisissez le nom ou la référence de la pièce.</p>
                                <div className="relative">
                                  <input
                                    value={specificQuery}
                                    onChange={(e) => setSpecificQuery(e.target.value)}
                                    placeholder="Ex: Filtre à huile, alternateur..."
                                    className="w-full bg-muted/50 border rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-primary/20 outline-none transition-all border-border focus:border-primary"
                                    aria-label="Saisie de pièce"
                                  />
                                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                                    {specificQuery.length} caractères
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                  {Object.values(MOCK_PARTS)
                                    .flat()
                                    .slice(0, 4)
                                    .map((p) => (
                                      <button
                                        key={p.id}
                                        onClick={() => setSpecificQuery(p.name)}
                                        className="rounded-xl border border-border dark:border-white/10 bg-background hover:bg-muted dark:hover:bg-white/10 px-3 py-2 text-sm text-foreground dark:text-white text-left"
                                        aria-label={p.name}
                                      >
                                        {p.name}
                                      </button>
                                    ))}
                                </div>
                              </div>
                              <div className="p-6 pt-0">
                                <button
                                  disabled={!specificQuery.trim()}
                                  onClick={() => {
                                    if (!specificQuery.trim()) return;
                                    const params = new URLSearchParams();
                                    params.set("q", specificQuery.trim());
                                    params.set("vehicle", selectedVehicle || "RS6 Avant");
                                    params.set("source", "vin");
                                    router.push(`/resultats?${params.toString()}`);
                                  }}
                                  className={cn(
                                    "w-full font-bold py-4 rounded-xl transition-all",
                                    specificQuery.trim()
                                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                      : "bg-muted text-muted-foreground cursor-not-allowed"
                                  )}
                                  aria-label="Valider la recherche"
                                >
                                  Valider
                                </button>
                              </div>
                            </div>
                          )}

                          {step === "identify_result" && (
                            <div className="flex flex-col h-full bg-card dark:bg-black/40 backdrop-blur-md">
                               <div className="p-6 border-b border-border dark:border-white/10 flex items-center gap-3">
                                  <button onClick={() => setStep("identify_scan")} className="p-2 hover:bg-muted dark:hover:bg-white/10 rounded-full transition-colors">
                                     <ArrowLeft className="h-5 w-5 text-foreground dark:text-white" />
                                  </button>
                                  <h3 className="text-xl font-bold text-foreground dark:text-white">Résultat</h3>
                               </div>

                               <div className="p-8 flex flex-col h-full text-left overflow-y-auto custom-scrollbar">
                                  <h3 className="text-3xl font-bold mb-6 text-foreground dark:text-white">Pièce Identifiée</h3>

                                  <div className="flex items-start gap-4 mb-8">
                                    <div className="h-20 w-20 rounded-xl overflow-hidden shrink-0 border border-border/50 relative bg-muted">
                                      {selectedImage ? (
                                        <Image 
                                          src={selectedImage} 
                                          alt="Part" 
                                          fill
                                          className="object-cover" 
                                          sizes="80px"
                                        />
                                      ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-green-100 dark:bg-green-900/30">
                                          <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                                        </div>
                                      )}
                                    </div>
                                    <div>
                                      <h4 className="text-xl font-bold text-foreground dark:text-white">{selectedPart}</h4>
                                      <p className="text-muted-foreground text-base">Confiance: 95.0%</p>
                                      <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold">
                                        <CheckCircle2 className="h-3.5 w-3.5" />
                                        Identifié par IA
                                      </div>
                                    </div>
                                  </div>

                                  <div className="bg-gray-50/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-6 mb-4 shadow-sm">
                                    <div className="flex justify-between items-center mb-5">
                                      <h5 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                                        VÉHICULE SUGGÉRÉ
                                      </h5>
                                      {selectedVehicle && (
                                        <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-green-200 dark:border-green-900/50">
                                          <CheckCircle2 className="h-3.5 w-3.5" />
                                          Compatibilité confirmée
                                        </div>
                                      )}
                                    </div>
                                    
                                    <div className="relative mb-3">
                                      <select 
                                        className="w-full p-4 pr-10 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-black/50 text-gray-900 dark:text-white text-base font-bold focus:ring-2 focus:ring-primary/10 outline-none appearance-none cursor-pointer shadow-sm transition-shadow hover:shadow-md"
                                        value={selectedVehicle}
                                        onChange={(e) => setSelectedVehicle(e.target.value)}
                                      >
                                        <option value="" disabled className="text-gray-500 dark:text-gray-400">Choisissez votre véhicule...</option>
                                        <option value="audi_rs6">Audi RS6 Avant (2020–2024)</option>
                                        <option value="audi_rs7">Audi RS7 Sportback (2020–2024)</option>
                                        <option value="lambo_urus">Lamborghini Urus (2019–2024)</option>
                                        <option value="porsche_cayenne">Porsche Cayenne Turbo GT (2021–2024)</option>
                                      </select>
                                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                                    </div>

                                    {selectedVehicle && (
                                      <div className="w-full aspect-[16/9] bg-white dark:bg-black/50 rounded-xl flex items-center justify-center overflow-hidden border border-gray-100 dark:border-white/10 shadow-inner p-2 mt-4">
                                          <div className="w-full h-full relative">
                                              <BrandLogo vehicle={selectedVehicle} className="w-full h-full" />
                                          </div>
                                      </div>
                                    )}
                                  </div>

                                  <button 
                                    onClick={() => navigateToNext("identify_result")}
                                    disabled={!selectedVehicle}
                                    className={cn(
                                      "w-full mt-auto font-bold py-4 rounded-xl transition-all",
                                      selectedVehicle 
                                        ? "bg-[#00796B] hover:bg-[#00695C] text-white shadow-lg shadow-[#00796B]/20" 
                                        : "bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                                    )}
                                  >
                                    Rechercher cette pièce
                                  </button>
                               </div>
                            </div>
                          )}

                          {step === "parts" && selectedCategory && (
                            <div className="flex flex-col h-full bg-card dark:bg-black/40 backdrop-blur-md">
                                <div className="p-6 border-b border-border dark:border-white/10 flex items-center gap-3">
                                     <button onClick={() => setStep("categories")} className="p-2 hover:bg-muted dark:hover:bg-white/10 rounded-full transition-colors">
                                        <ArrowLeft className="h-5 w-5 text-foreground dark:text-white" />
                                     </button>
                                     <div>
                                        <h3 className="text-lg font-bold text-foreground dark:text-white leading-tight">
                                            {PART_FAMILIES.find(f => f.id === selectedCategory)?.name}
                                        </h3>
                                        <p className="text-xs text-muted-foreground">
                                            {MOCK_PARTS[selectedCategory]?.length || 0} pièces compatibles
                                        </p>
                                     </div>
                                </div>
                                <div className="p-4 overflow-y-auto custom-scrollbar flex-1 space-y-4">
                                     {MOCK_PARTS[selectedCategory] ? (
                                         MOCK_PARTS[selectedCategory].map((part) => (
                                             <div key={part.id} className="bg-white dark:bg-zinc-900 border border-border dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                                {part.modelPath && (
                                                    <div className="w-full h-48 bg-zinc-100 dark:bg-zinc-800 relative group cursor-grab active:cursor-grabbing">
                                                        <Part3DViewer modelPath={part.modelPath} />
                                                        <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-md px-2 py-1 rounded-md text-[10px] text-white font-medium flex items-center gap-1 pointer-events-none">
                                                            <ScanLine className="h-3 w-3" />
                                                            3D
                                                        </div>
                                                        <div className="absolute bottom-2 left-0 right-0 text-center text-[10px] text-muted-foreground pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                                                            Tournez pour explorer
                                                        </div>
                                                    </div>
                                                )}
                                                <div className="p-4">
                                                     <div className="flex justify-between items-start mb-2">
                                                         <div>
                                                             <span className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1 block">{part.brand}</span>
                                                             <h4 className="font-bold text-foreground dark:text-white text-lg leading-tight">{part.name}</h4>
                                                         </div>
                                                         <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                                                             <CheckCircle2 className="h-3 w-3" />
                                                             Compatible
                                                         </div>
                                                     </div>
                                                     
                                                     <div className="flex items-center gap-2 mb-4">
                                                        <div className="text-xs text-muted-foreground bg-muted dark:bg-white/5 px-2 py-1 rounded-md flex items-center gap-1.5">
                                                            <Tag className="h-3 w-3" />
                                                            Compatible: {part.compatibleWith.slice(0, 2).join(", ")} {part.compatibleWith.length > 2 && `+${part.compatibleWith.length - 2}`}
                                                        </div>
                                                     </div>

                                                     <div className="flex items-center justify-between mt-4 pt-4 border-t border-border dark:border-zinc-800">
                                                         <div className="flex flex-col">
                                                             <span className="text-xs text-muted-foreground">Prix estimé</span>
                                                             <span className="font-bold text-lg text-foreground dark:text-white">{part.priceRange}</span>
                                                         </div>
                                                         <button className="bg-foreground dark:bg-white text-background dark:text-black hover:opacity-90 font-bold py-2 px-4 rounded-lg text-sm flex items-center gap-2 transition-opacity">
                                                             <ShoppingBag className="h-4 w-4" />
                                                             Acheter
                                                         </button>
                                                     </div>
                                                     <p className="text-[10px] text-muted-foreground mt-3 text-center leading-tight">
                                                        Les prix varient selon fabricant, vendeur et disponibilité. Fourchette indicative.
                                                     </p>
                                                 </div>
                                             </div>
                                         ))
                                     ) : (
                                         <div className="text-center py-10 text-muted-foreground">
                                             Aucune pièce trouvée pour cette catégorie.
                                         </div>
                                     )}
                                </div>
                            </div>
                          )}
                        </motion.div>
                      )}

                    </div>

                    {/* Tech Overlays */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
                      <rect x="20" y="20" width="40" height="40" fill="none" stroke="white" strokeWidth="1" />
                      <rect x="20" y="20" width="10" height="10" fill="white" />
                      <path d="M 20,60 L 20,100 L 60,100" fill="none" stroke="white" strokeWidth="1" />
                      
                      <rect x="80%" y="20" width="40" height="40" fill="none" stroke="white" strokeWidth="1" />
                      <path d="M 100%,60 L 100%,20 L 80%,20" fill="none" stroke="white" strokeWidth="1" />
                      
                      <rect x="20" y="80%" width="40" height="40" fill="none" stroke="white" strokeWidth="1" />
                      
                      <circle cx="50%" cy="50%" r="100" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="4 4" />
                    </svg>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (!mounted) return null;

  return createPortal(content, document.body);
}
