"use client";

import {
  ScrollReveal,
  FloatingElement,
} from "@/components/ui/floating-elements";
import { Zap, Sun, FlaskConical, Battery } from "lucide-react";

const customerItems = [
  {
    icon: Zap,
    title: "Grid-Independent EV Charging",
    description:
      "India's first modular, off-grid solar EV charging system – autonomous, ultra-fast, and renewable-powered",
  },
  {
    icon: Sun,
    title: "Solar-Plus-Storage Installation",
    description:
      "High-capacity systems for homes, institutions, and industries, engineered for performance and future integration",
  },
];

const investorItems = [
  {
    icon: FlaskConical,
    title: "Perovskite Technology Accelerator",
    description:
      "Proprietary process optimization slashing R&D timelines from months to weeks",
  },
  {
    icon: Battery,
    title: "Zinc-Ion BESS Technology",
    description:
      "Safe, sustainable, scalable stationary storage beyond lithium-ion",
  },
];

export function FocusAreasSection() {
  return (
    <section id="focus-areas" className="py-20 md:py-28 relative bg-background">
      <FloatingElement
        delay={2}
        amplitude={5}
        className="absolute bottom-20 right-10 opacity-10"
      >
        <div className="w-1 h-1 bg-foreground rounded-full" />
      </FloatingElement>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <ScrollReveal delay={0.2}>
          <h2 className="text-2xl md:text-4xl font-mono font-bold text-foreground text-center mb-4 tracking-wider">
            OUR FOCUS AREAS
          </h2>
          <p className="text-sm font-mono text-foreground/50 text-center mb-12 tracking-wider">
            DUAL-PATHWAY APPROACH
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* For Customers */}
          <ScrollReveal delay={0.3}>
            <div>
              <h3 className="text-lg font-mono font-bold text-foreground mb-6 tracking-wider border-b border-foreground/20 pb-3">
                FOR CUSTOMERS
              </h3>
              <div className="space-y-6">
                {customerItems.map((item) => (
                  <div
                    key={item.title}
                    className="border border-foreground/15 rounded-lg p-6 backdrop-blur-sm bg-foreground/5 hover:bg-foreground/10 transition-colors group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2 border border-foreground/20 rounded-lg group-hover:border-foreground/40 transition-colors">
                        <item.icon className="w-5 h-5 text-foreground/70" />
                      </div>
                      <div>
                        <h4 className="text-base font-mono font-bold text-foreground mb-2">
                          {item.title}
                        </h4>
                        <p className="text-sm font-mono text-foreground/60 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* For Investors */}
          <ScrollReveal delay={0.5}>
            <div>
              <h3 className="text-lg font-mono font-bold text-foreground mb-6 tracking-wider border-b border-foreground/20 pb-3">
                FOR INVESTORS
              </h3>
              <div className="space-y-6">
                {investorItems.map((item) => (
                  <div
                    key={item.title}
                    className="border border-foreground/15 rounded-lg p-6 backdrop-blur-sm bg-foreground/5 hover:bg-foreground/10 transition-colors group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2 border border-foreground/20 rounded-lg group-hover:border-foreground/40 transition-colors">
                        <item.icon className="w-5 h-5 text-foreground/70" />
                      </div>
                      <div>
                        <h4 className="text-base font-mono font-bold text-foreground mb-2">
                          {item.title}
                        </h4>
                        <p className="text-sm font-mono text-foreground/60 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
