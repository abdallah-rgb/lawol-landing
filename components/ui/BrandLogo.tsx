"use client";

import { cn } from "@/lib/utils";
import { Car } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";

interface BrandLogoProps {
  vehicle: string;
  className?: string;
  variant?: "full" | "icon";
}

export function BrandLogo({ vehicle, className, variant = "full" }: BrandLogoProps) {
  // Normalize vehicle string to identify brand
  const v = vehicle.toLowerCase();
  let brandName = "Constructeur";
  let logoSrc: string | StaticImageData | null = null;
  let logoName = "";
  const bgColor = "bg-zinc-100 dark:bg-zinc-800";
  let textColor = "text-zinc-600 dark:text-zinc-400";

  if (v.includes("audi") || v.includes("rs6") || v.includes("rs7")) {
    brandName = "AUDI";
    logoSrc = "/logos/audi.png";
    logoName = "audi.png";
    textColor = "text-zinc-800 dark:text-white";
  } else if (v.includes("lambo") || v.includes("urus")) {
    brandName = "LAMBORGHINI";
    logoSrc = "/logos/lamborghini.png";
    logoName = "lamborghini.png";
    textColor = "text-yellow-600 dark:text-yellow-500";
  } else if (v.includes("porsche") || v.includes("cayenne")) {
    brandName = "PORSCHE";
    logoSrc = "/logos/porsche.png";
    logoName = "porsche.png";
    textColor = "text-amber-700 dark:text-amber-600";
  }

  const [imgError, setImgError] = useState(false);

  if (variant === "icon") {
    return (
      <div className={cn("relative flex items-center justify-center w-full h-full", className)}>
        {!imgError && logoSrc ? (
          <Image 
            src={logoSrc} 
            alt={`${brandName} Logo`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-contain p-1"
            onError={() => setImgError(true)}
            unoptimized
          />
        ) : (
          <Car className="w-full h-full p-1.5" />
        )}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col items-center justify-center gap-3 w-full h-full p-4", bgColor, className)}>
      <div className={cn("relative w-full flex-1 min-h-0 transition-transform hover:scale-105 duration-300 flex items-center justify-center", textColor)}>
        {!imgError && logoSrc ? (
            <Image 
                src={logoSrc} 
                alt={`${brandName} Logo`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-contain drop-shadow-xl"
                onError={() => setImgError(true)}
                priority
                unoptimized
            />
        ) : (
           <div className="flex flex-col items-center justify-center gap-2 opacity-50">
             <Car className="h-16 w-16" />
             <span className="text-[10px] text-center font-mono">
               {logoName ? `Ajoutez ${logoName}` : "Logo manquant"}
             </span>
           </div>
        )}
      </div>
      <span className={cn("text-lg font-bold tracking-widest uppercase shrink-0", textColor)}>
        {brandName}
      </span>
    </div>
  );
}
