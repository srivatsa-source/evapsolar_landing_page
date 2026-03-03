"use client";

import {
  ScrollReveal,
  FloatingElement,
} from "@/components/ui/floating-elements";
import { Check } from "lucide-react";

const differentiators = [
  "Grid-independent by design",
  "Renewable-powered at their core",
  "Scalable for India's diverse needs",
  "Built to last with rigorous science",
];

export function EvapDifferenceSection() {
  return (
    <section id="evap-difference" className="py-20 md:py-28 relative bg-background">
      <FloatingElement
        delay={1}
        amplitude={6}
        className="absolute top-32 right-20 opacity-10"
      >
        <div className="w-1 h-1 bg-foreground rounded-full" />
      </FloatingElement>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <ScrollReveal delay={0.2}>
          <h2 className="text-2xl md:text-4xl font-mono font-bold text-foreground text-center mb-4 tracking-wider">
            THE EVAP DIFFERENCE
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <p className="text-xl md:text-2xl font-mono text-foreground/80 text-center mb-6 italic">
            We don&apos;t just build solar systems. We build energy independence.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.5}>
          <div className="max-w-3xl mx-auto">
            <p className="text-sm md:text-base font-mono text-foreground/60 leading-relaxed mb-6">
              Our flagship innovation—India&apos;s first modular, off-grid solar EV charging system—is designed to work anywhere, independent of the grid. Autonomous. Renewable-powered. Ultra-fast direct-charging for automobiles. It is our answer to India&apos;s twin challenges: accelerating EV adoption while meeting renewable energy goals.
            </p>
            <p className="text-sm md:text-base font-mono text-foreground/60 leading-relaxed mb-8">
              This same philosophy of integration and independence runs through everything we do. Whether installing solar-plus-storage for a home or developing next-generation zinc batteries, we engineer systems that are:
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.6}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {differentiators.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 border border-foreground/15 rounded-lg bg-foreground/5"
              >
                <Check className="w-5 h-5 text-green-500 dark:text-green-400 flex-shrink-0" />
                <span className="text-sm font-mono text-foreground/80">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
