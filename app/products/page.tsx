"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/floating-elements";
import { ArrowLeft, Zap, Sun, Battery, Cpu, MapPin, Building, Car, Home, Factory } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const evChargingFeatures = [
  { icon: Zap, text: "Grid-independent – Works off-grid, anywhere" },
  { icon: Cpu, text: "Autonomous operation – Self-powered, intelligent management" },
  { icon: Sun, text: "Renewable-powered – 100% solar energy" },
  { icon: Battery, text: "Ultra-fast direct-charging – Optimized for automobiles" },
  { icon: Building, text: "Modular design – Scalable from single units to charging hubs" },
];

const evChargingApplications = [
  "Remote locations with limited grid access",
  "Highway corridors",
  "Fleet charging stations",
  "Apartment complexes",
  "Commercial campuses",
];

const solarFeatures = [
  { icon: Sun, text: "Rooftop & ground-mounted systems (1kW to 1MW+)" },
  { icon: Battery, text: "Battery-ready architecture" },
  { icon: Cpu, text: "AI-powered performance monitoring" },
  { icon: Building, text: "Subsidy facilitation & financing support" },
];

const solarApplications = [
  "Residential",
  "Educational Institutions",
  "SMEs",
  "Industrial Parks",
];

export default function ProductsPage() {
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
            Solutions for India&apos;s Energy Future
          </h1>
          <p className="text-lg md:text-xl font-mono text-foreground/60 tracking-wider">
            From grid-independent EV charging to reliable solar-plus-storage
          </p>
        </motion.div>
      </section>

      {/* Product 1: Solar EV Charging */}
      <section id="ev-charging" className="py-20 md:py-28 scroll-mt-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <ScrollReveal delay={0.2}>
            <div className="border border-foreground/20 rounded-lg overflow-hidden">
              {/* Product Image */}
              <div className="w-full h-64 md:h-96 relative bg-foreground/5 border-b border-foreground/10 flex items-center justify-center overflow-hidden">
                <Image
                  src="/ev-charging-stations-garuda.jpg"
                  alt="EVAP Solar EV Charging System"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="p-6 md:p-10">
                {/* Product Header */}
                <div className="mb-8">
                  <span className="text-xs font-mono text-blue-500 dark:text-blue-400 tracking-wider">FLAGSHIP PRODUCT</span>
                  <h2 className="text-2xl md:text-3xl font-mono font-bold text-foreground mt-2 mb-2">
                    EVAP Solar EV Charging System
                  </h2>
                  <p className="text-sm font-mono text-foreground/50 mb-1">
                    India&apos;s First Modular Off-Grid Solution
                  </p>
                  <p className="text-base font-mono text-foreground/70 italic mt-4">
                    &ldquo;Charge anywhere, anytime—independent of the grid&rdquo;
                  </p>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <p className="text-sm md:text-base font-mono text-foreground/60 leading-relaxed">
                    India&apos;s first modular, off-grid solar EV charging system, designed to address India&apos;s challenges in achieving renewable energy goals through clean energy for EV adoption. Fully autonomous and renewable-powered, it delivers ultra-fast direct-charging for automobiles without relying on the grid.
                  </p>
                </div>

                {/* Key Features */}
                <div className="mb-8">
                  <h3 className="text-sm font-mono text-foreground/50 tracking-wider mb-4">KEY FEATURES</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {evChargingFeatures.map((feature) => (
                      <div
                        key={feature.text}
                        className="flex items-start gap-3 p-3 border border-foreground/10 rounded-lg bg-foreground/[0.02]"
                      >
                        <feature.icon className="w-4 h-4 text-foreground/50 mt-0.5 flex-shrink-0" />
                        <span className="text-sm font-mono text-foreground/70">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Applications */}
                <div className="mb-8">
                  <h3 className="text-sm font-mono text-foreground/50 tracking-wider mb-4">APPLICATIONS</h3>
                  <div className="flex flex-wrap gap-2">
                    {evChargingApplications.map((app) => (
                      <span
                        key={app}
                        className="px-3 py-1.5 text-xs font-mono text-foreground/60 border border-foreground/15 rounded-full bg-foreground/[0.02]"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Differentiator */}
                <div className="border-t border-foreground/10 pt-6">
                  <p className="text-sm font-mono text-foreground/50 italic leading-relaxed">
                    Designed for India&apos;s unique energy landscape—where grid reliability cannot be assumed, but clean mobility cannot wait.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Product 2: Solar Installation */}
      <section id="solar-installation" className="py-20 md:py-28 border-t border-foreground/10 scroll-mt-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <ScrollReveal delay={0.2}>
            <div className="border border-foreground/20 rounded-lg overflow-hidden">
              {/* Product Image */}
              <div className="w-full h-64 md:h-96 relative bg-foreground/5 border-b border-foreground/10 flex items-center justify-center overflow-hidden">
                <Image
                  src="/rooftop-solar.jpg"
                  alt="Solar-Plus-Storage Systems"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6 md:p-10">
                {/* Product Header */}
                <div className="mb-8">
                  <span className="text-xs font-mono text-green-500 dark:text-green-400 tracking-wider">SOLAR SOLUTIONS</span>
                  <h2 className="text-2xl md:text-3xl font-mono font-bold text-foreground mt-2 mb-2">
                    Solar-Plus-Storage Systems
                  </h2>
                  <p className="text-base font-mono text-foreground/70 italic mt-4">
                    &ldquo;High-capacity solar solutions for homes, institutions, and industries&rdquo;
                  </p>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <p className="text-sm md:text-base font-mono text-foreground/60 leading-relaxed">
                    We deliver end-to-end solar-plus-storage systems designed for seamless future integration with our proprietary technology. Every installation is optimized for performance, durability, and grid resilience—drawing on founder expertise gained through MNRE-certified training at NISE and hands-on experience at Tata Power Solar.
                  </p>
                </div>

                {/* Key Features */}
                <div className="mb-8">
                  <h3 className="text-sm font-mono text-foreground/50 tracking-wider mb-4">KEY FEATURES</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {solarFeatures.map((feature) => (
                      <div
                        key={feature.text}
                        className="flex items-start gap-3 p-3 border border-foreground/10 rounded-lg bg-foreground/[0.02]"
                      >
                        <feature.icon className="w-4 h-4 text-foreground/50 mt-0.5 flex-shrink-0" />
                        <span className="text-sm font-mono text-foreground/70">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Applications */}
                <div className="mb-8">
                  <h3 className="text-sm font-mono text-foreground/50 tracking-wider mb-4">APPLICATIONS</h3>
                  <div className="flex flex-wrap gap-2">
                    {solarApplications.map((app) => (
                      <span
                        key={app}
                        className="px-3 py-1.5 text-xs font-mono text-foreground/60 border border-foreground/15 rounded-full bg-foreground/[0.02]"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Product Note */}
      <section className="py-16 md:py-20 border-t border-foreground/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <ScrollReveal delay={0.2}>
            <p className="text-sm md:text-base font-mono text-foreground/50 leading-relaxed italic">
              Every EVAP Solar system—whether our flagship EV charging solution or a residential installation—is designed with future integration in mind: ready to incorporate our next-generation solar cells and proprietary zinc-battery technology as they become available.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link
                href="/innovation"
                className="px-5 py-2.5 border border-foreground/30 text-foreground font-mono text-xs tracking-wider hover:bg-foreground/10 transition-all duration-300 rounded-sm"
              >
                View Innovation Pipeline →
              </Link>
              <Link
                href="/#contact"
                className="px-5 py-2.5 border border-foreground/30 text-foreground font-mono text-xs tracking-wider hover:bg-foreground/10 transition-all duration-300 rounded-sm"
              >
                Contact Us
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
