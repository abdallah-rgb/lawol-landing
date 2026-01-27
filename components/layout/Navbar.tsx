"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const navLinks = [
  { name: "Comment ça marche", href: "/#how-it-works" },
  { name: "Fonctionnalités", href: "/#features" },
  { name: "Espace Partenaires", href: "/partenaires" },
  { name: "Contact", href: "/#contact" },
];

export function Navbar({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={cn("sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60", className)}>
      <div className="container mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="text-2xl font-bold text-primary">
          lAwôl
        </Link>

        <div className="flex items-center gap-4">
          {/* Desktop Nav */}
          <div className="hidden md:flex md:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  link.name === "Espace Partenaires"
                    ? "text-primary font-semibold"
                    : "text-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            className="flex items-center justify-center rounded-md p-2 text-foreground hover:bg-muted md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-b border-border bg-background md:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-4 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    link.name === "Espace Partenaires"
                      ? "text-primary font-semibold"
                      : "text-foreground"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
