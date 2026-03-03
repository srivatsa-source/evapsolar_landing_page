"use client";

import { motion } from "framer-motion";
import {
  ScrollReveal,
  FloatingElement,
} from "@/components/ui/floating-elements";

export function WhoWeAreSection() {
  return (
    <section id="who-we-are" className="py-20 md:py-28 relative bg-background">
      <FloatingElement
        delay={0}
        amplitude={8}
        className="absolute top-20 left-10 opacity-10"
      >
        <div className="w-1 h-1 bg-foreground rounded-full" />
      </FloatingElement>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <ScrollReveal delay={0.2}>
          <h2 className="text-2xl md:text-4xl font-mono font-bold text-foreground text-center mb-8 tracking-wider">
            WHO WE ARE
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <p className="text-base md:text-lg font-mono text-foreground/70 leading-relaxed text-center max-w-4xl mx-auto">
            EVAP Solar is an integrated clean energy technology company building India&apos;s first modular, off-grid solar EV charging system—designed to address India&apos;s challenges in achieving renewable energy goals through clean energy for EV adoption.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.6}>
          <p className="text-base md:text-lg font-mono text-foreground/60 leading-relaxed text-center max-w-4xl mx-auto mt-6">
            Alongside this flagship innovation, we deliver reliable solar-plus-storage systems for residential, commercial, and industrial clients, bridging the gap between today&apos;s energy needs and tomorrow&apos;s breakthroughs.
          </p>
        </ScrollReveal>

        {/* Decorative line */}
        <motion.div
          className="mx-auto mt-12 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent"
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          style={{ maxWidth: "400px" }}
        />
      </div>
    </section>
  );
}
