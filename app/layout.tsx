import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { FloatingIcons } from "@/components/ui/FloatingIcons";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "lAwôl - Trouvez vos pièces auto en 30 secondes",
  description: "Identification rapide de pièces auto, comparaison de prix et suivi de livraison. Pour particuliers et garages.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SmoothScroll>
          <FloatingIcons />
          {children}
          <ScrollToTop />
        </SmoothScroll>
      </body>
    </html>
  );
}
