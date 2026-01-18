import Link from "next/link";
import { Twitter, Linkedin, Instagram } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function Footer() {
  return (
    <footer className="bg-muted py-24 md:py-32 text-foreground transition-colors duration-300">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <Reveal width="100%">
          <div className="grid gap-12 md:grid-cols-4">
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

            <div>
              <h4 className="mb-4 text-lg font-bold">Nous suivre</h4>
              <div className="flex gap-4">
                <Link href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-background transition-all hover:-translate-y-1 hover:bg-primary hover:text-primary-foreground">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-background transition-all hover:-translate-y-1 hover:bg-primary hover:text-primary-foreground">
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-background transition-all hover:-translate-y-1 hover:bg-primary hover:text-primary-foreground">
                  <Instagram className="h-5 w-5" />
                </Link>
              </div>
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
