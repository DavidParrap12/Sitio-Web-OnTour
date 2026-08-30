"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Link } from "@/i18n/navigation";

const LOCALES = [
  { code: "es", flag: "🇨🇴", label: "Español" },
  { code: "en", flag: "🇺🇸", label: "English" },
  { code: "de", flag: "🇩🇪", label: "Deutsch" },
  { code: "fr", flag: "🇫🇷", label: "Français" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
  exit: { opacity: 0, y: 10, transition: { duration: 0.15 } },
};

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: t("home"), href: "/" as const },
    { name: t("about"), href: "/nosotros" as const },
    { name: t("circuits"), href: "/circuitos" as const },
    { name: t("gallery"), href: "/galeria" as const },
    { name: t("wellness"), href: "/bienestar" as const },
    { name: t("services"), href: "/servicios" as const },
    { name: t("contact"), href: "/contacto" as const },
  ];


  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setLangOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close language picker on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navClass = scrolled
    ? "bg-white/95 backdrop-blur-md shadow-sm py-4 text-foreground"
    : "bg-white py-6 text-foreground";

  const currentLocale = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  function switchLocale(newLocale: string) {
    router.replace(
      // @ts-expect-error – dynamic params typed loosely
      { pathname: pathname as any, params },
      { locale: newLocale as any }
    );
    setLangOpen(false);
    setIsOpen(false);
  }

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${navClass}`}>
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">

          {/* Logo */}
          <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2.5 group">
            <Image
              src="/image/logo-ON-TOUR-Nuevo2.png"
              alt="Ontour Logo"
              width={160}
              height={50}
              className="h-10 sm:h-11 object-contain transition-all duration-300"
              style={{ width: 'auto' }}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            {navLinks.map((link) => {
              const isActive =
                !("external" in link) &&
                (pathname === link.href ||
                  (link.href !== "/" && pathname?.startsWith(link.href)));

              const linkClass = `font-medium text-[13px] xl:text-sm relative transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-foreground/70 hover:text-primary"
              }`;

              if ("external" in link) {
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
                  href={link.href as any}
                  className={linkClass}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full bg-primary"
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
                className="flex items-center gap-1.5 font-medium text-sm transition-colors text-foreground/70 hover:text-primary"
              >
                <Globe className="w-4 h-4" />
                <span>{currentLocale.flag}</span>
                <span className="uppercase text-xs">{locale}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-[150px] z-50"
                  >
                    {LOCALES.map((loc) => (
                      <button
                        key={loc.code}
                        onClick={() => switchLocale(loc.code)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${locale === loc.code
                            ? "text-primary font-medium bg-primary/5"
                            : "text-foreground/70 hover:bg-gray-50 hover:text-primary"
                          }`}
                      >
                        <span className="text-lg">{loc.flag}</span>
                        <span>{loc.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/contacto"
              className="px-5 py-2.5 rounded-full font-medium text-sm transition-all shadow-sm bg-accent text-white hover:brightness-90 hover:shadow-md hover:-translate-y-0.5"
            >
              {t("quote")}
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2.5 -mr-2 rounded-xl text-foreground/80 hover:text-foreground hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isOpen}
          >
            <motion.div
              initial={false}
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.div>
          </button>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-white/98 backdrop-blur-xl lg:hidden flex flex-col pt-24 pb-8 px-6 overflow-y-auto"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col flex-1 justify-between max-w-md mx-auto w-full"
            >
              {/* Links list */}
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const isActive =
                    !("external" in link) &&
                    (pathname === link.href ||
                      (link.href !== "/" && pathname?.startsWith(link.href)));

                  if ("external" in link) {
                    return (
                      <motion.div key={link.href} variants={itemVariants}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setIsOpen(false)}
                          className="flex items-center justify-between px-4 py-3.5 rounded-2xl text-xl font-bold font-heading text-foreground/80 hover:text-primary hover:bg-gray-50 active:scale-[0.98] transition-all"
                        >
                          <span>{link.name}</span>
                          <span className="text-xs text-muted-foreground bg-gray-100 px-2 py-1 rounded-md">↗</span>
                        </a>
                      </motion.div>
                    );
                  }

                  return (
                    <motion.div key={link.href} variants={itemVariants}>
                      <Link
                        href={link.href as any}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center justify-between px-4 py-3.5 rounded-2xl text-xl font-bold font-heading transition-all active:scale-[0.98] ${
                          isActive
                            ? "text-primary bg-primary/10 font-black shadow-sm"
                            : "text-foreground/80 hover:text-primary hover:bg-gray-50"
                        }`}
                      >
                        <span>{link.name}</span>
                        {isActive && (
                          <span className="w-2 h-2 rounded-full bg-primary" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom Actions */}
              <motion.div variants={itemVariants} className="mt-8 pt-6 border-t border-gray-100 flex flex-col gap-5">
                {/* Mobile Language Switcher */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-1">
                    {t("language") || "Idioma"}
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    {LOCALES.map((loc) => (
                      <button
                        key={loc.code}
                        onClick={() => switchLocale(loc.code)}
                        className={`flex flex-col items-center justify-center gap-1 py-2.5 px-2 rounded-xl text-xs font-medium transition-all active:scale-95 ${
                          locale === loc.code
                            ? "bg-primary text-white shadow-sm font-semibold"
                            : "bg-gray-50 text-foreground/70 hover:bg-gray-100"
                        }`}
                      >
                        <span className="text-lg leading-none">{loc.flag}</span>
                        <span>{loc.code.toUpperCase()}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact CTA */}
                <Link
                  href="/contacto"
                  onClick={() => setIsOpen(false)}
                  className="bg-accent hover:brightness-95 text-white px-6 py-4 rounded-2xl font-bold text-center text-lg shadow-md shadow-accent/20 active:scale-[0.98] transition-all"
                >
                  {t("contactAdvisor")}
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
