"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/floating-elements";

const stats = [
  { value: "India's First", label: "Modular Off-Grid Solar EV Charging System" },
  { value: "200MW+", label: "Planned Annual Manufacturing Capacity" },
  { value: "6Mo → 6Wk", label: "Perovskite Process Optimization" },
  { value: "NISE-Incubated", label: "National Institute of Solar Energy" },
];

export function ImpactStatsSection() {
  return (
    <section id="impact-stats" className="py-16 md:py-20 relative bg-background border-y border-foreground/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <ScrollReveal delay={0.2}>
          <h2 className="text-xl md:text-2xl font-mono font-bold text-foreground text-center mb-12 tracking-wider">
            OUR IMPACT
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
            >
              <div className="text-xl md:text-2xl font-mono font-bold text-foreground mb-2 tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm font-mono text-foreground/50 tracking-wider leading-relaxed">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
