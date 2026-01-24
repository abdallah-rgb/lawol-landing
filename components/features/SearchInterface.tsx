"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, ScanLine, CheckCircle2, Loader2, Camera, Smartphone, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThreePreview } from "@/components/ui/ThreePreview";

interface SearchInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchInterface({ isOpen, onClose }: SearchInterfaceProps) {
  const [step, setStep] = useState<"upload" | "scanning" | "analyzing" | "complete">("upload");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Reset state when closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep("upload");
        setSelectedImage(null);
        setSelectedVehicle("");
      }, 500);
    }
  }, [isOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      startAnalysisProcess();
    }
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background/95 backdrop-blur-md p-4 touch-none"
          onClick={(e) => {
            // Empêcher la propagation des clics vers l'arrière-plan
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-muted transition-colors"
          >
            <X className="h-6 w-6 text-muted-foreground" />
          </button>

          <div className="w-full max-w-lg relative">
            <AnimatePresence mode="wait">
              {step === "upload" && (
                <motion.div
                  key="upload"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-card border border-border rounded-3xl p-8 shadow-2xl text-center"
                >
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                    <Camera className="h-8 w-8" />
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-3">Identifiez votre pièce</h2>
                  <p className="text-muted-foreground mb-8">
                    Prenez une photo ou importez une image de votre pièce. 
                    Notre IA l'analysera instantanément.
                  </p>

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

                  <div className="mt-6 bg-muted/50 rounded-xl p-4 text-left border border-border/50">
                    <div className="flex items-center gap-2 mb-2 text-foreground font-medium">
                      <Info className="h-4 w-4 text-primary" />
                      <span className="text-sm">Conseils pour un scan optimal</span>
                    </div>
                    <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
                      <li>Nettoyez la pièce si possible</li>
                      <li>Éclairage suffisant recommandé</li>
                      <li>Photographiez l'étiquette ou le code</li>
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
                    "relative bg-black rounded-3xl overflow-hidden shadow-2xl w-full max-w-sm mx-auto border border-white/10 transition-all duration-500",
                    step === "complete" ? "h-[650px]" : "aspect-[4/5]"
                  )}
                >
                  {/* Image Background */}
                  {selectedImage && (
                    <img 
                      src={selectedImage} 
                      alt="Part Preview" 
                      className="absolute inset-0 w-full h-full object-cover opacity-60"
                    />
                  )}
                  
                  {/* Scanning Overlay */}
                  <div className="absolute inset-0 z-10">
                    {step === "scanning" && (
                      <motion.div 
                        initial={{ top: "0%" }}
                        animate={{ top: "100%" }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 right-0 h-1 bg-primary shadow-[0_0_20px_rgba(var(--primary),0.8)]"
                      />
                    )}
                    
                    <div className="absolute inset-0 flex flex-col z-20">
                      {step !== "complete" ? (
                        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                          <div className="mt-auto mb-8 bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 w-full">
                            {step === "scanning" && (
                              <div className="flex flex-col items-center gap-3">
                                <ScanLine className="h-8 w-8 text-primary animate-pulse" />
                                <h3 className="text-white font-bold text-lg">Scan en cours...</h3>
                                <p className="text-white/60 text-sm">Analyse de la géométrie</p>
                              </div>
                            )}
                            
                            {step === "analyzing" && (
                              <div className="flex flex-col items-center gap-3">
                                <Loader2 className="h-8 w-8 text-primary animate-spin" />
                                <h3 className="text-white font-bold text-lg">Identification IA</h3>
                                <p className="text-white/60 text-sm">Recherche dans la base OEM...</p>
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
                          <h3 className="text-foreground font-bold text-xl mb-6">Pièce Identifiée</h3>
                          
                          <div className="flex items-start gap-4 mb-6">
                            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full shrink-0">
                              <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                            </div>
                            <div className="text-left">
                              <p className="text-foreground font-bold text-lg leading-tight">Filtre à Huile (Bosch)</p>
                              <p className="text-muted-foreground text-sm mt-1">Confiance: 95.0%</p>
                            </div>
                          </div>

                          <div className="mb-6 p-4 bg-muted/30 rounded-2xl border border-border/50">
                            <div className="flex items-center justify-between mb-3">
                              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                Véhicule compatible (à sélectionner)
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
                                Choisissez votre véhicule dans la liste pour confirmer la compatibilité.
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
                                router.push(`/resultats?vehicle=${encodeURIComponent(selectedVehicle)}`);
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
