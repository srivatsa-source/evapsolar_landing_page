"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/floating-elements";
import { ArrowLeft, FlaskConical, Atom, Battery, Handshake, GraduationCap, Beaker } from "lucide-react";
import Link from "next/link";

const perovskiteHighlights = [
  "Higher theoretical efficiency than conventional silicon cells",
  "Lighter, thinner, and adaptable to flexible surfaces",
  "Ideal for building-integrated photovoltaics (BIPV) and portable applications",
  "Joint development with NISE-affiliated labs",
];

const zincBatteryHighlights = [
  "Safer than lithium-ion — non-flammable, non-toxic",
  "Uses abundantly available zinc — lower material cost",
  "Environmentally sustainable across the lifecycle",
  "Suitable for long-duration, stationary storage",
];

const collaborationPartners = [
  {
    icon: GraduationCap,
    title: "Academic Institutions",
    description: "Joint research on advanced materials and cell architectures",
  },
  {
    icon: FlaskConical,
    title: "Government Labs",
    description: "Collaborative testing and validation through NISE and affiliated centers",
  },
  {
    icon: Handshake,
    title: "Industry Partners",
    description: "Co-development of commercially viable next-generation energy products",
  },
];

export default function InnovationPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <Navigation />

      {/* Back button */}
      <Link
        href="/"
        className="fixed top-6 left-6 z-50 p-2 border border-foreground/20 rounded-full bg-background/80 backdrop-blur-sm hover:bg-foreground/10 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 text-foreground" />
      </Link>

      {/* Hero Header */}
      <section className="min-h-[50vh] flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/5 to-transparent" />
        <motion.div
          className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-mono font-bold text-foreground tracking-tight mb-6">
            Innovation Pipeline
          </h1>
          <p className="text-lg md:text-xl font-mono text-foreground/60 tracking-wider">
            Building Tomorrow&apos;s Energy Technologies
          </p>
          <p className="text-sm md:text-base font-mono text-foreground/40 mt-4 max-w-2xl mx-auto leading-relaxed">
            Beyond our commercial products, EVAP Solar is invested in the next generation of clean energy materials and storage systems.
          </p>
        </motion.div>
      </section>

      {/* Pipeline 1: Perovskite Solar Accelerator */}
      <section id="perovskite" className="py-20 md:py-28 scroll-mt-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <ScrollReveal delay={0.2}>
            <div className="border border-foreground/20 rounded-lg overflow-hidden">
              {/* Visual Placeholder */}
              <div className="w-full h-48 md:h-64 bg-foreground/5 border-b border-foreground/10 flex items-center justify-center">
                <div className="text-center">
                  <Atom className="w-16 h-16 text-foreground/20 mx-auto mb-4" />
                  <span className="text-sm font-mono text-foreground/30 tracking-wider">
                    R&D VISUAL PLACEHOLDER
                  </span>
                </div>
              </div>

              <div className="p-6 md:p-10">
                {/* Header */}
                <div className="mb-8">
                  <span className="text-xs font-mono text-purple-500 dark:text-purple-400 tracking-wider">PIPELINE 01</span>
                  <h2 className="text-2xl md:text-3xl font-mono font-bold text-foreground mt-2 mb-2">
                    Perovskite Solar Accelerator
                  </h2>
                  <p className="text-base font-mono text-foreground/70 italic mt-4">
                    &ldquo;Next-generation solar cells — lighter, cheaper, and more efficient&rdquo;
                  </p>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <p className="text-sm md:text-base font-mono text-foreground/60 leading-relaxed mb-4">
                    EVAP Solar is developing perovskite-based solar cells aimed at surpassing traditional silicon technology in efficiency, cost, and versatility. In partnership with national research labs and institutions, we are working on:
                  </p>
                  <ul className="space-y-3">
                    {perovskiteHighlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm font-mono text-foreground/60"
                      >
                        <span className="text-foreground/30 mt-0.5">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Status */}
                <div className="border-t border-foreground/10 pt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                    <span className="text-xs font-mono text-foreground/50 tracking-wider">STATUS: ACTIVE R&D</span>
                  </div>
                  <p className="text-sm font-mono text-foreground/40">
                    Lab-stage development with NISE-affiliated research partners. Target: Demonstrable prototype cells by 2026.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Pipeline 2: Zinc-Based BESS */}
      <section id="zinc-battery" className="py-20 md:py-28 border-t border-foreground/10 scroll-mt-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <ScrollReveal delay={0.2}>
            <div className="border border-foreground/20 rounded-lg overflow-hidden">
              {/* Visual Placeholder */}
              <div className="w-full h-48 md:h-64 bg-foreground/5 border-b border-foreground/10 flex items-center justify-center">
                <div className="text-center">
                  <Battery className="w-16 h-16 text-foreground/20 mx-auto mb-4" />
                  <span className="text-sm font-mono text-foreground/30 tracking-wider">
                    R&D VISUAL PLACEHOLDER
                  </span>
                </div>
              </div>

              <div className="p-6 md:p-10">
                {/* Header */}
                <div className="mb-8">
                  <span className="text-xs font-mono text-cyan-500 dark:text-cyan-400 tracking-wider">PIPELINE 02</span>
                  <h2 className="text-2xl md:text-3xl font-mono font-bold text-foreground mt-2 mb-2">
                    Zinc-Based Battery Energy Storage System (BESS)
                  </h2>
                  <p className="text-base font-mono text-foreground/70 italic mt-4">
                    &ldquo;Safe, sustainable, and affordable energy storage&rdquo;
                  </p>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <p className="text-sm md:text-base font-mono text-foreground/60 leading-relaxed mb-4">
                    To complement our solar generation capabilities, EVAP Solar is developing a proprietary zinc-based energy storage system as a safer, greener alternative to lithium-ion batteries.
                  </p>
                  <ul className="space-y-3">
                    {zincBatteryHighlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm font-mono text-foreground/60"
                      >
                        <span className="text-foreground/30 mt-0.5">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Status */}
                <div className="border-t border-foreground/10 pt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                    <span className="text-xs font-mono text-foreground/50 tracking-wider">STATUS: EARLY DEVELOPMENT</span>
                  </div>
                  <p className="text-sm font-mono text-foreground/40">
                    Formulation and early prototype stage. Target: Functional prototype integrated with solar EV charger by 2028.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* R&D Collaboration */}
      <section id="collaboration" className="py-20 md:py-28 border-t border-foreground/10 scroll-mt-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <ScrollReveal delay={0.2}>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-mono font-bold text-foreground mb-4">
                R&D Collaboration
              </h2>
              <p className="text-sm md:text-base font-mono text-foreground/60 max-w-2xl mx-auto leading-relaxed">
                EVAP Solar actively collaborates with academic institutions, government labs, and industry partners to accelerate clean energy innovation. We welcome researchers, engineers, and organizations interested in co-creating the future of energy.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {collaborationPartners.map((partner, i) => (
              <ScrollReveal key={partner.title} delay={0.2 + i * 0.15}>
                <div className="border border-foreground/15 rounded-lg p-6 bg-foreground/[0.02] text-center h-full">
                  <partner.icon className="w-8 h-8 text-foreground/40 mx-auto mb-4" />
                  <h3 className="text-sm font-mono font-semibold text-foreground mb-2 tracking-wider">
                    {partner.title}
                  </h3>
                  <p className="text-xs font-mono text-foreground/50 leading-relaxed">
                    {partner.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* CTA */}
          <ScrollReveal delay={0.6}>
            <div className="text-center mt-12">
              <p className="text-sm font-mono text-foreground/50 mb-6">
                Interested in partnering with us on next-generation energy research?
              </p>
              <Link
                href="/#contact"
                className="inline-block px-6 py-3 border border-foreground/30 text-foreground font-mono text-xs tracking-wider hover:bg-foreground/10 transition-all duration-300 rounded-sm"
              >
                Get in Touch →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Explore Case Studies */}
      <section className="py-16 md:py-20 border-t border-foreground/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <ScrollReveal delay={0.2}>
            <p className="text-sm font-mono text-foreground/40 mb-6">
              Want to see our technology in action?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/products"
                className="px-5 py-2.5 border border-foreground/30 text-foreground font-mono text-xs tracking-wider hover:bg-foreground/10 transition-all duration-300 rounded-sm"
              >
                View Products
              </Link>
              <Link
                href="/about"
                className="px-5 py-2.5 border border-foreground/30 text-foreground font-mono text-xs tracking-wider hover:bg-foreground/10 transition-all duration-300 rounded-sm"
              >
                About EVAP Solar
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
