"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";

const LOCALES = [
  { code: "es", flag: "🇨🇴", label: "Español" },
  { code: "en", flag: "🇺🇸", label: "English" },
  { code: "de", flag: "🇩🇪", label: "Deutsch" },
  { code: "fr", flag: "🇫🇷", label: "Français" },
];

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: t("home"), href: "/" },
    { name: t("about"), href: "/nosotros" },
    { name: t("dayTrips"), href: "/pasadias" },
    { name: t("circuits"), href: "/circuitos" },
    { name: t("tickets"), href: "https://www.aviatur.com/vuelos", external: true },
    { name: t("contact"), href: "/contacto" },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close lang dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isHome = pathname === "/";
  const navClass = scrolled
    ? "bg-white/95 backdrop-blur-md shadow-sm py-4 text-foreground"
    : `py-6 ${isHome ? "bg-transparent text-white" : "bg-white text-foreground"}`;

  const currentLocale = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  function switchLocale(newLocale: string) {
    router.replace(pathname, { locale: newLocale });
    setLangOpen(false);
  }

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${navClass}`}>
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image
              src="/image/logo-ON-TOUR-Nuevo.png"
              alt="Ontour Logo"
              width={140}
              height={48}
              className="h-12 object-contain transition-all duration-300"
              style={{ width: 'auto', height: 'auto' }}
              priority
            />
            <span className={`hidden sm:inline-flex flex-col text-[10px] font-bold tracking-widest uppercase leading-tight transition-colors ${
              scrolled || !isHome ? "text-primary" : "text-white"
            }`}>
              <span>DMC</span>
              <span className="text-[9px] font-medium tracking-wider opacity-70">Colombia</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive =
                !link.external &&
                (pathname === link.href ||
                (link.href !== "/" && pathname?.startsWith(link.href)));

              const linkClass = `font-medium text-sm lg:text-base relative transition-colors ${
                isActive
                  ? scrolled || !isHome
                    ? "text-primary"
                    : "text-white"
                  : scrolled || !isHome
                  ? "text-foreground/70 hover:text-primary"
                  : "text-white/80 hover:text-white"
              }`;

              if (link.external) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    {link.name}
                  </a>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={linkClass}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className={`absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full ${
                        scrolled || !isHome ? "bg-primary" : "bg-white"
                      }`}
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}

            {/* Language Selector */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className={`flex items-center gap-1.5 font-medium text-sm transition-colors ${
                  scrolled || !isHome
                    ? "text-foreground/70 hover:text-primary"
                    : "text-white/80 hover:text-white"
                }`}
                aria-label="Select language"
              >
                <Globe className="w-4 h-4" />
                <span>{currentLocale.flag}</span>
                <span className="hidden xl:inline">{currentLocale.code.toUpperCase()}</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden min-w-[160px] z-60"
                  >
                    {LOCALES.map((loc) => (
                      <button
                        key={loc.code}
                        onClick={() => switchLocale(loc.code)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-gray-50 ${
                          locale === loc.code
                            ? "text-primary font-semibold bg-primary/5"
                            : "text-foreground/80"
                        }`}
                      >
                        <span className="text-base">{loc.flag}</span>
                        <span>{loc.label}</span>
                        {locale === loc.code && (
                          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/contacto"
              className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all shadow-sm ${
                scrolled || !isHome
                  ? "bg-accent text-white hover:brightness-90 hover:shadow-md hover:-translate-y-0.5"
                  : "bg-white text-primary hover:bg-gray-50 border border-transparent"
              }`}
            >
              {t("quote")}
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
                const isActive = !link.external && pathname === link.href;

                if (link.external) {
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-2xl font-bold font-heading text-foreground/80"
                    >
                      {link.name}
                    </a>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-2xl font-bold font-heading ${
                      isActive ? "text-primary" : "text-foreground/80"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              {/* Mobile Language Switcher */}
              <div className="flex items-center justify-center gap-3 mt-4">
                {LOCALES.map((loc) => (
                  <button
                    key={loc.code}
                    onClick={() => switchLocale(loc.code)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition-all ${
                      locale === loc.code
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-foreground/70 hover:bg-gray-200"
                    }`}
                  >
                    <span>{loc.flag}</span>
                    <span>{loc.code.toUpperCase()}</span>
                  </button>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col gap-4">
                <Link
                  href="/contacto"
                  className="bg-accent text-white px-6 py-4 rounded-full font-bold text-lg w-full"
                >
                  {t("contactAdvisor")}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
