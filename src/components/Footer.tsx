import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-white pt-16 pb-8 border-t border-primary/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Col */}
          <div className="flex flex-col">
            <Link href="/" className="inline-block mb-6">
              <Image 
                src="/image/logo-ON-TOUR.png" 
                alt="Ontour" 
                width={180} 
                height={70} 
                className="object-contain brightness-[10] grayscale contrast-100 opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mt-2">
              Creamos experiencias inolvidables.
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

          {/* Links Col 1 */}
          <div>
            <h4 className="text-white font-semibold font-heading mb-6 text-lg">Explorar</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li><Link href="/" className="hover:text-accent transition-colors">Inicio</Link></li>
              <li><Link href="/nosotros" className="hover:text-accent transition-colors">Quiénes Somos</Link></li>
              <li><Link href="/pasadias" className="hover:text-accent transition-colors">Pasadías</Link></li>
              <li><Link href="/circuitos" className="hover:text-accent transition-colors">Circuitos</Link></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h4 className="text-white font-semibold font-heading mb-6 text-lg">Legal</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li><Link href="/contacto" className="hover:text-accent transition-colors">Términos y Condiciones</Link></li>
              <li><Link href="/contacto" className="hover:text-accent transition-colors">Política de Privacidad</Link></li>
              <li><Link href="/contacto" className="hover:text-accent transition-colors">Registro Nacional de Turismo</Link></li>
              <li><Link href="/contacto" className="hover:text-accent transition-colors">Preguntas Frecuentes</Link></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="text-white font-semibold font-heading mb-6 text-lg">Contáctanos</h4>
            <ul className="flex flex-col gap-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent shrink-0" />
                <span>Ibagué, Tolima, Colombia</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <span>+57 3165386892</span>
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
            © {new Date().getFullYear()} Ontour DMC. Todos los derechos reservados.
          </p>
          <p className="text-xs text-gray-500">
            Diseñado para inspirar viajeros.
          </p>
        </div>
      </div>
    </footer>
  );
}
