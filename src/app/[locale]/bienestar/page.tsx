import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

import { WellnessHero } from "@/components/wellness/WellnessHero";
import { WellnessCareStandard } from "@/components/wellness/WellnessCareStandard";
import { WellnessTreatmentsGrid } from "@/components/wellness/WellnessTreatmentsGrid";
import { WellnessProcessTimeline } from "@/components/wellness/WellnessProcessTimeline";
import { WellnessTolimaExperience } from "@/components/wellness/WellnessTolimaExperience";
import { WellnessTestimonials } from "@/components/wellness/WellnessTestimonials";
import { WellnessSpecialists } from "@/components/wellness/WellnessSpecialists";
import { WellnessFaqAccordion } from "@/components/wellness/WellnessFaqAccordion";
import { WellnessFinalCTA } from "@/components/wellness/WellnessFinalCTA";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "wellness" });
  return {
    title: t("metaTitle"),
    description: t("metaDesc"),
  };
}

export default async function BienestarPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("wellness");

  // Pre-resolve all strings — t() function cannot cross Server→Client boundary
  const heroStrings = {
    title: t("hero.title"),
    titleHighlight: t("hero.titleHighlight"),
    subtitle: t("hero.subtitle"),
    ctaPrimary: t("hero.ctaPrimary"),
    ctaSecondary: t("hero.ctaSecondary"),
  };

  const careStrings = {
    title: t("care.title"),
    titleHighlight: t("care.titleHighlight"),
    subtitle: t("care.subtitle"),
    requestInfo: t("care.requestInfo"),
    helpTitle: t("care.helpTitle"),
    helpSubtitle: t("care.helpSubtitle"),
    helpButton: t("care.helpButton"),
  };

  const treatmentsStrings = {
    title: t("treatments.title"),
    subtitle: t("treatments.subtitle"),
    learnMore: t("treatments.learnMore"),
    cirugiaPlastica: {
      name: t("treatments.items.cirugiaPlastica.name"),
      desc: t("treatments.items.cirugiaPlastica.desc"),
      procedures: (t.raw("treatments.items.cirugiaPlastica.procedures") || []) as string[],
    },
    chequeosPreventivos: {
      name: t("treatments.items.chequeosPreventivos.name"),
      desc: t("treatments.items.chequeosPreventivos.desc"),
      procedures: (t.raw("treatments.items.chequeosPreventivos.procedures") || []) as string[],
    },
    cardiologia: {
      name: t("treatments.items.cardiologia.name"),
      desc: t("treatments.items.cardiologia.desc"),
      procedures: (t.raw("treatments.items.cardiologia.procedures") || []) as string[],
    },
    urologia: {
      name: t("treatments.items.urologia.name"),
      desc: t("treatments.items.urologia.desc"),
      procedures: (t.raw("treatments.items.urologia.procedures") || []) as string[],
    },
    nutricion: {
      name: t("treatments.items.nutricion.name"),
      desc: t("treatments.items.nutricion.desc"),
      procedures: (t.raw("treatments.items.nutricion.procedures") || []) as string[],
    },
    psicologia: {
      name: t("treatments.items.psicologia.name"),
      desc: t("treatments.items.psicologia.desc"),
      procedures: (t.raw("treatments.items.psicologia.procedures") || []) as string[],
    },
  };

  const processStrings = {
    title: t("process.title"),
    subtitle: t("process.subtitle"),
    s1: { title: t("process.steps.s1.title"), desc: t("process.steps.s1.desc") },
    s2: { title: t("process.steps.s2.title"), desc: t("process.steps.s2.desc") },
    s3: { title: t("process.steps.s3.title"), desc: t("process.steps.s3.desc") },
    s4: { title: t("process.steps.s4.title"), desc: t("process.steps.s4.desc") },
    s5: { title: t("process.steps.s5.title"), desc: t("process.steps.s5.desc") },
  };

  const tolimaStrings = {
    title: t("tolima.title"),
    subtitle: t("tolima.subtitle"),
    cta: t("tolima.cta"),
    imageAlt: t("tolima.imageAlt"),
  };

  const testimonialsStrings = {
    title: t("testimonials.title"),
    subtitle: t("testimonials.subtitle"),
    t1: { name: t("testimonials.items.t1.name"), origin: t("testimonials.items.t1.origin"), treatment: t("testimonials.items.t1.treatment"), quote: t("testimonials.items.t1.quote"), avatarAlt: t("testimonials.items.t1.avatarAlt") },
    t2: { name: t("testimonials.items.t2.name"), origin: t("testimonials.items.t2.origin"), treatment: t("testimonials.items.t2.treatment"), quote: t("testimonials.items.t2.quote"), avatarAlt: t("testimonials.items.t2.avatarAlt") },
    t3: { name: t("testimonials.items.t3.name"), origin: t("testimonials.items.t3.origin"), treatment: t("testimonials.items.t3.treatment"), quote: t("testimonials.items.t3.quote"), avatarAlt: t("testimonials.items.t3.avatarAlt") },
  };

  const specialistsStrings = {
    title: t("specialists.title"),
    subtitle: t("specialists.subtitle"),
    categories: [],
  };

  const faqStrings = {
    title: t("faq.title"),
    q1: { q: t("faq.items.q1.q"), a: t("faq.items.q1.a") },
    q2: { q: t("faq.items.q2.q"), a: t("faq.items.q2.a") },
    q3: { q: t("faq.items.q3.q"), a: t("faq.items.q3.a") },
    q4: { q: t("faq.items.q4.q"), a: t("faq.items.q4.a") },
    q5: { q: t("faq.items.q5.q"), a: t("faq.items.q5.a") },
  };

  const ctaStrings = {
    title: t("cta.title"),
    subtitle: t("cta.subtitle"),
    button: t("cta.button"),
    secondaryButton: t("cta.secondaryButton"),
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-wellness-bg)" }}>
      <WellnessHero strings={heroStrings} />
      <WellnessCareStandard strings={careStrings} locale={locale} />
      <WellnessTreatmentsGrid strings={treatmentsStrings} />
      <WellnessProcessTimeline strings={processStrings} />
      <WellnessTolimaExperience strings={tolimaStrings} />
      {false && <WellnessTestimonials strings={testimonialsStrings} />}
      <WellnessSpecialists strings={specialistsStrings} locale={locale} />
      <WellnessFaqAccordion strings={faqStrings} />
      <WellnessFinalCTA strings={ctaStrings} />
    </div>
  );
}
