import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className="bg-primary text-white pt-16 pb-8 border-t border-primary/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand Col */}
          <div className="flex flex-col">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/image/logo-ON-TOUR-Nuevo.png"
                alt="Ontour"
                width={180}
                height={70}
                style={{ width: 'auto', height: 'auto' }}
                className="object-contain opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.2em] uppercase text-accent/90 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent/80" />
              DMC Colombia
            </span>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t("tagline")}
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a href="https://www.facebook.com/p/Ontour-100071506294624/?locale=es_LA" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/ontouragenciadeviajes/" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Explore Col */}
          <div>
            <h4 className="text-white font-semibold font-heading mb-6 text-lg">{t("explore")}</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li><Link href={"/" as any} className="hover:text-accent transition-colors">{t("home")}</Link></li>
              <li><Link href={"/nosotros" as any} className="hover:text-accent transition-colors">{t("about")}</Link></li>
              <li><Link href={"/pasadias" as any} className="hover:text-accent transition-colors">{t("dayTrips")}</Link></li>
              <li><Link href={"/circuitos" as any} className="hover:text-accent transition-colors">{t("circuits")}</Link></li>
              <li><Link href={"/servicios" as any} className="hover:text-accent transition-colors">{t("services")}</Link></li>
              <li><Link href={"/galeria" as any} className="hover:text-accent transition-colors">{t("gallery")}</Link></li>
            </ul>
          </div>

          {/* Legal Col */}
          <div>
            <h4 className="text-white font-semibold font-heading mb-6 text-lg">{t("legal")}</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li><Link href={"/legal/terminos" as any} className="hover:text-accent transition-colors">{t("terms")}</Link></li>
              <li><Link href={"/legal/privacidad" as any} className="hover:text-accent transition-colors">{t("privacy")}</Link></li>
              <li><Link href={"/legal/registro-turismo" as any} className="hover:text-accent transition-colors">{t("tourism")}</Link></li>
              <li><Link href={"/legal/faq" as any} className="hover:text-accent transition-colors">{t("faq")}</Link></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="text-white font-semibold font-heading mb-6 text-lg">{t("contact")}</h4>
            <ul className="flex flex-col gap-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent shrink-0" />
                <span>Ibagué, Tolima, Colombia</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <a href="tel:+573165386892" className="hover:text-accent transition-colors">+57 316 538 6892</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <span>ontoursas@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-gray-800 text-center flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Ontour DMC. {t("rights")}
          </p>
          <p className="text-xs text-gray-500">{t("designed")}</p>
        </div>
      </div>
    </footer>
  );
}
