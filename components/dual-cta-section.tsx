"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/ui/floating-elements";

export function DualCtaSection() {
  return (
    <section id="dual-cta" className="py-20 md:py-28 relative bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* For Customers */}
          <ScrollReveal delay={0.2}>
            <div className="border border-foreground/20 rounded-lg p-8 backdrop-blur-sm bg-foreground/5 text-center">
              <h3 className="text-lg font-mono font-bold text-foreground mb-2 tracking-wider">
                FOR CUSTOMERS
              </h3>
              <p className="text-sm font-mono text-foreground/50 mb-6">
                Explore our energy solutions
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/products#ev-charging"
                  className="px-5 py-2.5 border border-foreground/30 text-foreground font-mono text-xs tracking-wider hover:bg-foreground/10 transition-all duration-300 rounded-sm"
                >
                  Explore EV Charging
                </Link>
                <Link
                  href="/products#solar-installation"
                  className="px-5 py-2.5 border border-foreground/30 text-foreground font-mono text-xs tracking-wider hover:bg-foreground/10 transition-all duration-300 rounded-sm"
                >
                  Solar Installation
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* For Investors */}
          <ScrollReveal delay={0.4}>
            <div className="border border-foreground/20 rounded-lg p-8 backdrop-blur-sm bg-foreground/5 text-center">
              <h3 className="text-lg font-mono font-bold text-foreground mb-2 tracking-wider">
                FOR INVESTORS / PARTNERS
              </h3>
              <p className="text-sm font-mono text-foreground/50 mb-6">
                Join our innovation journey
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/innovation"
                  className="px-5 py-2.5 border border-foreground/30 text-foreground font-mono text-xs tracking-wider hover:bg-foreground/10 transition-all duration-300 rounded-sm"
                >
                  Innovation Pipeline
                </Link>
                <Link
                  href="/innovation#collaboration"
                  className="px-5 py-2.5 border border-foreground/30 text-foreground font-mono text-xs tracking-wider hover:bg-foreground/10 transition-all duration-300 rounded-sm"
                >
                  R&D Collaboration
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
