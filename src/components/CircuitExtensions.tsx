"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PlusCircle, ArrowUpRight } from "lucide-react";
import { SectionReveal } from "@/components/editorial/SectionReveal";

export interface ExtensionItem {
  id: string;
  name: string;
  description: string;
  image: string;
  extensionLabel?: string;
  extensionPrice?: number;
  extensionDuration?: string;
}

interface CircuitExtensionsProps {
  extensions: ExtensionItem[];
  circuitName: string;
  whatsappNumber: string;
  t: {
    sectionLabel: string;
    sectionTitle: string;
    addToQuote: string;
    from: string;
    perPerson: string;
    whatsappTemplate: string;
  };
}

export function CircuitExtensions({
  extensions,
  circuitName,
  whatsappNumber,
  t,
}: CircuitExtensionsProps) {
  if (extensions.length === 0) return null;

  function buildWhatsappUrl(extensionName: string) {
    const message = t.whatsappTemplate
      .replace("__CIRCUIT__", circuitName)
      .replace("__EXTENSION__", extensionName);
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  }

  return (
    <SectionReveal>
      <section className="pt-4 mb-16 md:mb-24">
        {/* Section header */}
        <div className="mb-8 pb-4 border-b border-editorial-border">
          <span className="label text-editorial-accent block mb-2">
            {t.sectionLabel}
          </span>
          <h2 className="display-2 text-editorial-dark">{t.sectionTitle}</h2>
        </div>

        {/* Extension cards */}
        <div className="flex flex-col gap-5">
          {extensions.map((ext, i) => (
            <motion.div
              key={ext.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group flex flex-col sm:flex-row gap-0 rounded-2xl border border-editorial-border bg-editorial-warm overflow-hidden hover:shadow-editorial-md transition-shadow duration-300"
            >
              {/* Image */}
              <div className="relative w-full sm:w-52 h-44 sm:h-auto shrink-0 overflow-hidden">
                <Image
                  src={ext.image}
                  alt={ext.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 208px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Plus badge */}
                <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-editorial-accent flex items-center justify-center shadow-editorial-sm">
                  <PlusCircle className="w-4 h-4 text-white" strokeWidth={2.5} />
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-between p-5 sm:p-6 flex-1 gap-4">
                <div>
                  <p className="caption text-editorial-accent mb-1">
                    {ext.extensionDuration && `${ext.extensionDuration} · `}
                    {ext.extensionLabel}
                  </p>
                  <h3 className="heading-1 text-editorial-dark mb-2">
                    + {ext.name}
                  </h3>
                  <p className="body-sm text-editorial-muted line-clamp-2">
                    {ext.description}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  {/* Price */}
                  {ext.extensionPrice != null && (
                    <p className="text-editorial-dark">
                      <span className="caption text-editorial-muted mr-1">
                        {t.from}
                      </span>
                      <span className="text-xl font-bold">
                        ${ext.extensionPrice} USD
                      </span>
                      <span className="caption text-editorial-muted ml-1">
                        {t.perPerson}
                      </span>
                    </p>
                  )}

                  {/* CTA */}
                  <a
                    href={buildWhatsappUrl(ext.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-editorial-accent hover:bg-editorial-accent-hover text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-editorial-sm hover:shadow-editorial-md hover:-translate-y-0.5 whitespace-nowrap"
                  >
                    {t.addToQuote}
                    <ArrowUpRight className="w-4 h-4 shrink-0" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </SectionReveal>
  );
}
