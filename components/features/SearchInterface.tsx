"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, ScanLine, CheckCircle2, Loader2, Camera, Smartphone, Info, FileText, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThreePreview } from "@/components/ui/ThreePreview";
import { VehicleScanningLoader } from "@/components/ui/VehicleScanningLoader";
import { useSmoothScroll } from "@/components/ui/SmoothScroll";

interface SearchInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchInterface({ isOpen, onClose }: SearchInterfaceProps) {
  const [step, setStep] = useState<"upload" | "scanning" | "analyzing" | "complete">("upload");
  const [searchMode, setSearchMode] = useState<"image" | "vin">("image");
  const [vinInput, setVinInput] = useState("");
  const [vinError, setVinError] = useState("");
  const [fileError, setFileError] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<string>("");
  const [selectedPart, setSelectedPart] = useState<string>("Filtre à Huile (Bosch)");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const lenis = useSmoothScroll();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset state when closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep("upload");
        setSearchMode("image");
        setVinInput("");
        setVinError("");
        setSelectedImage(null);
        setSelectedVehicle("");
      }, 500);
    }
  }, [isOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      startAnalysisProcess();
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
    startAnalysisProcess();
  };

  const startAnalysisProcess = () => {
    setStep("scanning");
    
    // Simulate scanning phase
    setTimeout(() => {
      setStep("analyzing");
    }, 2500);

    // Simulate analysis completion (removed auto-redirect)
    setTimeout(() => {
      setStep("complete");
    }, 5500);
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
          <div className="flex min-h-full items-center justify-center p-4 py-12">
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
                            <p className="text-xs text-muted-foreground">JPG, PNG jusqu'à 10MB</p>
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
                          <li>Photographiez l'étiquette ou le code</li>
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

              {(step === "scanning" || step === "analyzing" || step === "complete") && (
                <motion.div
                  layout
                  key="processing"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className={cn(
                    "relative rounded-3xl overflow-hidden shadow-2xl w-full max-w-sm mx-auto border border-border/50 transition-all duration-500",
                    step === "complete" ? "h-[650px] bg-card" : "aspect-[4/5] bg-gradient-to-br from-gray-900 to-black"
                  )}
                >
                  {/* 3D Scanning Animation Background - Only for VIN or when scanning */}
                  {searchMode === "vin" && step !== "complete" && (
                     <div className="absolute inset-0 z-0">
                        <VehicleScanningLoader step={step} />
                     </div>
                  )}

                  {/* Image Background (for Image mode) */}
                  {searchMode === "image" && selectedImage && (
                    <img 
                      src={selectedImage} 
                      alt="Part Preview" 
                      className="absolute inset-0 w-full h-full object-cover opacity-60"
                    />
                  )}
                  
                  {/* Scanning Overlay */}
                  <div className="absolute inset-0 z-10 pointer-events-none">
                    {step === "scanning" && searchMode === "image" && (
                      <motion.div 
                        initial={{ top: "0%" }}
                        animate={{ top: "100%" }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 right-0 h-1 bg-primary shadow-[0_0_20px_rgba(var(--primary),0.8)]"
                      />
                    )}
                    
                    <div className="absolute inset-0 flex flex-col z-20">
                      {step !== "complete" ? (
                        <div className="flex-1 flex flex-col items-center justify-end p-6 pb-12 text-center">
                          {/* Floating Status Card */}
                          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 w-full shadow-2xl">
                            {step === "scanning" && (
                              <div className="flex flex-col items-center gap-3">
                                <ScanLine className="h-8 w-8 text-primary animate-pulse" />
                                <h3 className="text-white font-bold text-lg">
                                  {searchMode === "image" ? "Scan en cours..." : "Vérification VIN..."}
                                </h3>
                                <p className="text-white/60 text-sm">
                                  {searchMode === "image" ? "Analyse de la géométrie" : "Décodage du constructeur"}
                                </p>
                              </div>
                            )}
                            
                            {step === "analyzing" && (
                              <div className="flex flex-col items-center gap-3">
                                <Loader2 className="h-8 w-8 text-primary animate-spin" />
                                <h3 className="text-white font-bold text-lg">
                                  {searchMode === "image" ? "Identification IA" : "Identification Véhicule"}
                                </h3>
                                <p className="text-white/60 text-sm">
                                  {searchMode === "image" ? "Recherche dans la base OEM..." : "Recherche options et finitions..."}
                                </p>
                                <div className="w-full bg-white/10 h-1 mt-2 rounded-full overflow-hidden">
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
                          className="mt-auto bg-card rounded-t-3xl p-6 pb-10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] text-left"
                        >
                          <h3 className="text-foreground font-bold text-xl mb-6">
                            Pièce Identifiée
                          </h3>
                          
                          <div className="flex items-start gap-4 mb-6">
                            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full shrink-0">
                              <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                            </div>
                            <div className="text-left">
                              <p className="text-foreground font-bold text-lg leading-tight">
                                Filtre à Huile (Bosch)
                              </p>
                              <p className="text-muted-foreground text-sm mt-1">
                                {searchMode === "image" ? "Confiance: 95.0%" : `Compatibilité VIN vérifiée`}
                              </p>
                            </div>
                          </div>

                          <div className="mb-6 p-4 bg-muted/30 rounded-2xl border border-border/50">
                            <div className="flex items-center justify-between mb-3">
                              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                Véhicules compatibles avec cette pièce
                              </label>
                              {selectedVehicle && (
                                <span className="flex items-center gap-1 text-[10px] font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
                                  <CheckCircle2 className="h-3 w-3" />
                                  Compatibilité confirmée
                                </span>
                              )}
                            </div>
                            
                            <div className="space-y-3">
                              <div className="relative">
                                <select 
                                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm font-semibold text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer appearance-none"
                                  value={selectedVehicle}
                                  onChange={(e) => setSelectedVehicle(e.target.value)}
                                >
                                  <option value="" disabled>Choisissez votre véhicule...</option>
                                  <option value="RS6 Avant">Audi RS6 Avant (2020–2024)</option>
                                  <option value="RS7 Sportback">Audi RS7 Sportback (2020–2024)</option>
                                  <option value="Urus">Lamborghini Urus (2019–2024)</option>
                                  <option value="Cayenne Turbo GT">Porsche Cayenne Turbo GT (2021–2024)</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </div>
                              </div>
                              
                              <p className="text-xs text-muted-foreground px-1">
                                {searchMode === "image" 
                                  ? "Choisissez votre véhicule dans la liste pour confirmer la compatibilité."
                                  : "Voici les véhicules partageant cette pièce (compatible avec votre VIN)."}
                              </p>

                              {selectedVehicle === "RS6 Avant" && (
                                <div className="h-24 w-full rounded-xl bg-neutral-100 border border-border/50 overflow-hidden relative mt-2">
                                  <ThreePreview 
                                    modelUrl="/models/vehicles/2020_audi_rs6_avant.glb"
                                    autoRotateSpeed={0.8} 
                                    className="h-full w-full mix-blend-multiply" 
                                  />
                                </div>
                              )}
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              if (selectedVehicle) {
                                router.push(`/resultats?vehicle=${encodeURIComponent(selectedVehicle)}${searchMode === "vin" ? `&vin=${vinInput}&source=vin` : ""}`);
                              }
                            }}
                            disabled={!selectedVehicle}
                            className={cn(
                              "w-full font-bold py-4 rounded-xl transition-all text-lg shadow-lg",
                              selectedVehicle
                                ? "bg-primary hover:bg-primary/90 active:scale-[0.98] text-primary-foreground shadow-primary/20" 
                                : "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                            )}
                          >
                            Rechercher cette pièce
                          </button>
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
