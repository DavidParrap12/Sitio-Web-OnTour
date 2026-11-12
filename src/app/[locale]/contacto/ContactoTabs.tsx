"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  Check,
  Clock,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

// Load the agency form separately from the page shell.
const TradeForm = dynamic(() =>
  import("@/components/TradeForm").then((m) => ({ default: m.TradeForm }))
);

const PHONES = ["+57 314 341 5177", "+57 316 538 6892"];
const EMAIL = "gerencia@agenciaontour.com";
const ADDRESS = "Ibagué, Tolima, Colombia";


export interface ContactPanelCopy {
  title: string;
  subtitle: string;
  points: string[];
}

interface ContactoTabsProps {
  schedule: string;
  support: string;
  mainOffice: string;
  agencyPanel: ContactPanelCopy & { badge: string };
}

function InfoRow({
  icon: Icon,
  children,
}: {
  icon: typeof Phone;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-xl bg-editorial-accent/15 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-muted-gold" aria-hidden="true" />
      </div>
      <div>{children}</div>
    </div>
  );
}

export function ContactoTabs({
  schedule,
  support,
  mainOffice,
  agencyPanel,
}: ContactoTabsProps) {
  const panel = agencyPanel;

  return (
    <section
      id="agencias"
      className="py-16 md:py-24 bg-editorial-warm editorial-section--bleed editorial-gradient-bleed relative scroll-mt-24"
      style={{ "--bleed-color": "#0a1628" } as React.CSSProperties}
    >
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Info panel — content follows the selected audience */}
          <aside className="order-2 lg:order-1 lg:col-span-2 bg-editorial-dark text-white p-8 sm:p-10 md:p-14 rounded-3xl flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col justify-between h-full"
            >
              <div>
                <h2 className="heading-1 text-white mb-4">{panel.title}</h2>
                <p className="body text-white/60 mb-8">{panel.subtitle}</p>

                <ul className="space-y-3 mb-10">
                  {panel.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-sm text-white/80"
                    >
                      <Check
                        className="w-4 h-4 mt-0.5 text-muted-gold flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-6">
                  <InfoRow icon={Phone}>
                    {PHONES.map((phone) => (
                      <a
                        key={phone}
                        href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                        className="block text-white font-semibold hover:text-muted-gold transition-colors"
                      >
                        {phone}
                      </a>
                    ))}
                  </InfoRow>

                  <InfoRow icon={Mail}>
                    <a
                      href={`mailto:${EMAIL}`}
                      className="text-sm sm:text-base text-white font-semibold break-all hover:text-muted-gold transition-colors"
                    >
                      {EMAIL}
                    </a>
                    <p className="caption text-white/40 mt-1">{support}</p>
                  </InfoRow>

                  <InfoRow icon={MapPin}>
                    <p className="text-white font-semibold">{ADDRESS}</p>
                    <p className="caption text-white/40 mt-1">{mainOffice}</p>
                  </InfoRow>

                  <InfoRow icon={Clock}>
                    <p className="text-white font-semibold">{schedule}</p>
                  </InfoRow>
                </div>
              </div>

              {(
                <p className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white/70">
                  {agencyPanel.badge}
                </p>
              )}
            </motion.div>
          </aside>

          {/* Form panel */}
          <div className="order-1 lg:order-2 lg:col-span-3 bg-white p-6 sm:p-10 md:p-14 rounded-3xl border border-editorial-border">
            <div
              id="contact-panel"
              role="region"
              aria-label={agencyPanel.title}
            >
              <TradeForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
