"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Inicio", href: "/" },
  { name: "Nosotros", href: "/nosotros" },
  { name: "Pasadías", href: "/pasadias" },
  { name: "Circuitos", href: "/circuitos" },
  { name: "Contacto", href: "/contacto" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";
  const navClass = scrolled
    ? "bg-white/95 backdrop-blur-md shadow-sm py-4 text-foreground"
    : `py-6 ${isHome ? "bg-transparent text-white" : "bg-white text-foreground"}`;

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${navClass}`}>
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">

          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Image
              src="/image/logo-ON-TOUR.png"
              alt="Ontour Logo"
              width={140}
              height={48}
              className={`h-12 w-auto object-contain transition-all duration-300 ${
                scrolled || !isHome ? "brightness-100" : "brightness-0 invert"
              }`}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-medium text-sm lg:text-base relative transition-colors ${isActive
                      ? (scrolled || !isHome ? "text-primary" : "text-white")
                      : (scrolled || !isHome ? "text-foreground/70 hover:text-primary" : "text-white/80 hover:text-white")
                    }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className={`absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full ${scrolled || !isHome ? "bg-primary" : "bg-white"}`}
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}

            <Link
              href="/contacto"
              className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all shadow-sm ${scrolled || !isHome
                  ? "bg-accent text-white hover:brightness-90 hover:shadow-md hover:-translate-y-0.5"
                  : "bg-white text-primary hover:bg-gray-50 border border-transparent"
                }`}
            >
              Cotizar viaje
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 -mr-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-white lg:hidden overflow-hidden flex flex-col pt-24 px-6"
          >
            <div className="flex flex-col gap-6 text-center">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-2xl font-bold font-heading ${isActive ? "text-primary" : "text-foreground/80"
                      }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col gap-4">
                <Link
                  href="/contacto"
                  className="bg-accent text-white px-6 py-4 rounded-full font-bold text-lg w-full"
                >
                  Contactar Asesor
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
