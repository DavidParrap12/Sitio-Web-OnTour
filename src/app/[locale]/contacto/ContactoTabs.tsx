"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  Briefcase,
  Check,
  Clock,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import { trackContactTab } from "@/lib/analytics";

// Below-the-fold: code-split. The agency form only mounts when that tab opens,
// so travellers never download its code.
const ContactForm = dynamic(() =>
  import("@/components/ContactForm").then((m) => ({ default: m.ContactForm }))
);
const TradeForm = dynamic(() =>
  import("@/components/TradeForm").then((m) => ({ default: m.TradeForm }))
);

const PHONES = ["+57 314 341 5177", "+57 316 538 6892"];
const EMAIL = "gerencia@agenciaontour.com";
const ADDRESS = "Ibagué, Tolima, Colombia";

type Audience = "travellers" | "agencies";

export interface ContactPanelCopy {
  title: string;
  subtitle: string;
  points: string[];
}

interface ContactoTabsProps {
  schedule: string;
  support: string;
  mainOffice: string;
  tabs: { travellers: string; agencies: string };
  travellerPanel: ContactPanelCopy;
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
  tabs,
  travellerPanel,
  agencyPanel,
}: ContactoTabsProps) {
  const [audience, setAudience] = useState<Audience>("travellers");
  const tabRefs = useRef<Record<Audience, HTMLButtonElement | null>>({
    travellers: null,
    agencies: null,
  });

  // Deep links: /contacto#agencias (used by the navbar B2B entry) opens the
  // agency tab directly. The hash is only read, never rewritten on tab clicks:
  // GA4's enhanced measurement turns every history.replaceState call into an
  // extra page_view, which would inflate reports for a mere tab switch.
  useEffect(() => {
    const applyHash = () => {
      if (window.location.hash === "#agencias") setAudience("agencies");
      else if (window.location.hash === "#viajeros") setAudience("travellers");
    };

    applyHash();
    window.addEventListener("hashchange", applyHash);

    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  function selectAudience(next: Audience, focus = false) {
    if (next !== audience) {
      setAudience(next);
      trackContactTab(next);
    }

    if (focus) tabRefs.current[next]?.focus();
  }

  function handleTabKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;

    event.preventDefault();
    selectAudience(
      audience === "travellers" ? "agencies" : "travellers",
      true
    );
  }

  const isAgency = audience === "agencies";
  const panel = isAgency ? agencyPanel : travellerPanel;

  return (
    <section
      id="agencias"
      className="py-16 md:py-24 bg-editorial-warm editorial-section--bleed editorial-gradient-bleed relative scroll-mt-24"
      style={{ "--bleed-color": "#0a1628" } as React.CSSProperties}
    >
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Audience switch */}
        <div className="flex justify-center mb-10">
          <div
            role="tablist"
            aria-label={`${tabs.travellers} / ${tabs.agencies}`}
            onKeyDown={handleTabKeyDown}
            className="inline-flex items-center gap-1 rounded-full border border-editorial-border bg-white p-1.5 shadow-sm"
          >
            <button
              ref={(node) => {
                tabRefs.current.travellers = node;
              }}
              id="tab-travellers"
              role="tab"
              type="button"
              aria-selected={!isAgency}
              aria-controls="contact-panel"
              tabIndex={isAgency ? -1 : 0}
              onClick={() => selectAudience("travellers")}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                isAgency
                  ? "text-editorial-muted hover:text-editorial-dark"
                  : "bg-editorial-accent text-white shadow-sm"
              }`}
            >
              <User className="w-4 h-4" aria-hidden="true" />
              {tabs.travellers}
            </button>

            <button
              ref={(node) => {
                tabRefs.current.agencies = node;
              }}
              id="tab-agencies"
              role="tab"
              type="button"
              aria-selected={isAgency}
              aria-controls="contact-panel"
              tabIndex={isAgency ? 0 : -1}
              onClick={() => selectAudience("agencies")}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                isAgency
                  ? "bg-editorial-accent text-white shadow-sm"
                  : "text-editorial-muted hover:text-editorial-dark"
              }`}
            >
              <Briefcase className="w-4 h-4" aria-hidden="true" />
              {tabs.agencies}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Info panel — content follows the selected audience */}
          <aside className="order-2 lg:order-1 lg:col-span-2 bg-editorial-dark text-white p-8 sm:p-10 md:p-14 rounded-3xl flex flex-col">
            <motion.div
              key={audience}
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

              {isAgency && (
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
              role="tabpanel"
              aria-labelledby={`tab-${audience}`}
            >
              {isAgency ? <TradeForm /> : <ContactForm />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
