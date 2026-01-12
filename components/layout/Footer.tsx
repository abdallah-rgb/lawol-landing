import Link from "next/link";
import { Twitter, Linkedin, Instagram } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function Footer() {
  return (
    <footer className="bg-secondary py-24 md:py-32 text-white">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <Reveal width="100%">
          <div className="grid gap-12 md:grid-cols-4">
            <div>
              <h4 className="mb-4 text-xl font-bold">lAwôl</h4>
              <p className="text-gray-400">
                La plateforme d'identification et d'achat de pièces auto la plus simple.
              </p>
            </div>

            <div>
              <h4 className="mb-4 text-lg font-bold">Liens rapides</h4>
              <ul className="space-y-2">
                <li><Link href="/#how-it-works" className="text-gray-400 hover:text-white transition-colors">Comment ça marche</Link></li>
                <li><Link href="/#features" className="text-gray-400 hover:text-white transition-colors">Fonctionnalités</Link></li>
                <li><Link href="/#pricing" className="text-gray-400 hover:text-white transition-colors">Tarifs</Link></li>
                <li><Link href="/#contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-lg font-bold">Légal & Partenaires</h4>
              <ul className="space-y-2">
                <li><Link href="/partenaires" className="text-primary hover:text-white transition-colors font-medium">Devenir Partenaire</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Conditions d'utilisation</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Politique de confidentialité</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-lg font-bold">Nous suivre</h4>
              <div className="flex gap-4">
                <Link href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all hover:-translate-y-1 hover:bg-primary">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all hover:-translate-y-1 hover:bg-primary">
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all hover:-translate-y-1 hover:bg-primary">
                  <Instagram className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal width="100%" delay={0.2}>
          <div className="mt-12 border-t border-white/10 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} lAwôl. Tous droits réservés.</p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
