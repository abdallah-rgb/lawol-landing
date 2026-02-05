import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

export function Footer() {
  return (
    <footer className="bg-muted py-24 md:py-32 text-foreground transition-colors duration-300">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <Reveal width="100%">
          <div className="grid gap-12 md:grid-cols-3">
            <div>
              <h4 className="mb-4 text-xl font-bold">lAwôl</h4>
              <p className="text-muted-foreground">
                Le hub d&apos;identification de pièces auto : compatibilité, équivalences et choix assisté, sans gérer la vente.
              </p>
            </div>

            <div>
              <h4 className="mb-4 text-lg font-bold">Liens rapides</h4>
              <ul className="space-y-2">
                <li><Link href="/#how-it-works" className="text-muted-foreground hover:text-primary transition-colors">Comment ça marche</Link></li>
                <li><Link href="/#features" className="text-muted-foreground hover:text-primary transition-colors">Fonctionnalités</Link></li>
                <li><Link href="/partenaires" className="text-primary hover:text-primary/80 font-medium transition-colors">Espace Partenaires</Link></li>
                <li><Link href="/#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-lg font-bold">Légal</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Conditions d&apos;utilisation</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Politique de confidentialité</Link></li>
              </ul>
            </div>

          </div>
        </Reveal>

        <Reveal width="100%" delay={0.1}>
          <div className="mt-12 flex flex-col items-center justify-center space-y-4">
            <p className="text-center text-muted-foreground font-medium">
              L&apos;application sera bientôt disponible sur les stores
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {/* App Store Badge */}
              <Link href="#" className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-white transition-transform hover:scale-105 border border-white/10">
                <svg viewBox="0 0 384 512" fill="currentColor" className="h-8 w-8">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                </svg>
                <div className="flex flex-col items-start">
                  <span className="text-[10px] leading-none">Download on the</span>
                  <span className="text-lg font-bold leading-none">App Store</span>
                </div>
              </Link>

              {/* Google Play Badge */}
              <Link href="#" className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-white transition-transform hover:scale-105 border border-white/10">
                <svg viewBox="0 0 87.4 92" className="h-8 w-8">
                  <path fill="#4285F4" d="M5.4 1.9c-2 2.1-3.2 5-3.2 8.5v71.3c0 3.5 1.2 6.4 3.2 8.5l.7.7L48.9 48.2v-1.4L6.1 1.2l-.7.7z"/>
                  <path fill="#EA4335" d="M64.6 64L48.9 48.2 6.1 91c2.6 1.4 5.9 1.4 8.6 0l49.9-27z"/>
                  <path fill="#34A853" d="M64.6 28L14.7 1c-2.7-1.4-6-1.4-8.6 0L48.9 43.8 64.6 28z"/>
                  <path fill="#FBBC05" d="M64.6 64l17.3-9.9c3.5-1.9 3.5-5.1 0-7.1L64.6 28 48.9 43.8v4.4L64.6 64z"/>
                </svg>
                <div className="flex flex-col items-start">
                  <span className="text-[10px] leading-none">GET IT ON</span>
                  <span className="text-lg font-bold leading-none">Google Play</span>
                </div>
              </Link>
            </div>
          </div>
        </Reveal>

        <Reveal width="100%" delay={0.2}>
          <div className="mt-12 border-t border-border pt-8 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} lAwôl. Tous droits réservés.</p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
