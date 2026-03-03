"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/floating-elements";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const teamMembers = [
  {
    name: "Dr. Altaf P",
    title: "Founder & CEO",
    image: "/team/altaf.png",
    grayscale: false,
    bio: "Dr. Altaf P is a physicist and solar energy specialist with a deep commitment to bridging laboratory innovation and on-ground implementation. Trained and certified by the National Institute of Solar Energy (NISE) under MNRE in solar cell and module manufacturing, he gained hands-on industry experience at Tata Power Solar, one of India's leading solar manufacturers. His doctoral research focused on next-generation photovoltaics, including halide perovskites and CIGS thin-film solar cells, with international fellowships at KIT (Germany) and Rice University (USA) as a Fulbright Scholar. At EVAP Solar, he leads the development of India's first modular, off-grid solar EV charging system, alongside solar-plus-storage solutions and the perovskite technology accelerator.",
  },
  {
    name: "Dr. T. Prahlada",
    title: "Head of Technology (Energy Storage)",
    image: "/team/prahlad.png",
    grayscale: false,
    bio: "Dr. Prahlada is a chemist specializing in electrochemical energy storage, with a PhD in zinc-ion and zinc-sulfur battery systems. His research prioritizes safety, sustainability, and scalability for stationary grid applications—deliberately moving beyond lithium-ion's high-density but resource-constrained paradigm. He leads EVAP Solar's proprietary BESS development.",
  },
  {
    name: "Prof. R. Geetha Balakrishna",
    title: "Scientific Advisor",
    image: "/team/geetha.jpg",
    grayscale: false,
    bio: "Prof. Balakrishna is a distinguished leader in renewable energy materials and Director of the Centre for Nano and Material Sciences at JAIN University. With over two decades of research, 220+ publications, and multiple patents in photovoltaics, quantum dots, and energy storage, she provides strategic scientific guidance to EVAP Solar.",
  },
  {
    name: "Dr. Manikanta P.",
    title: "Lead of Electrochemical R&D",
    image: "/team/manikanta.jpeg",
    grayscale: true,
    bio: "Dr. Manikanta P. is an Assistant Professor and materials electrochemist specializing in nanostructured materials for energy and sensing applications. With international research experience at the Polytechnic University of Turin, Italy, he guides EVAP Solar's R&D in electrochemical analysis.",
  },
];

const partners = [
  {
    name: "National Institute of Solar Energy (NISE)",
    role: "Incubator, Manufacturing Certification, R&D Collaboration",
  },
  {
    name: "Tata Power Solar",
    role: "Industry Training Partner",
  },
  {
    name: "Centre for Nano and Material Sciences (CNMS), JAIN University",
    role: "Academic Research Collaboration",
  },
];

export default function AboutPage() {
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
      <section className="min-h-[60vh] flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/5 to-transparent" />
        <motion.div
          className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-mono font-bold text-foreground tracking-tight mb-6">
            Engineering India&apos;s Clean Energy Future
          </h1>
          <p className="text-lg md:text-xl font-mono text-foreground/60 tracking-wider">
            Material scientists. Systems engineers. Innovators.
          </p>
        </motion.div>
      </section>

      {/* Our Story */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <ScrollReveal delay={0.2}>
            <h2 className="text-2xl md:text-3xl font-mono font-bold text-foreground mb-8 tracking-wider">
              OUR STORY
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="space-y-6 text-sm md:text-base font-mono text-foreground/70 leading-relaxed">
              <p>
                EVAP Solar was founded to address a fundamental challenge in India&apos;s clean energy transition: true energy independence requires systems that work beyond the grid.
              </p>
              <p>
                While abundant sunlight provides the foundation, its full potential remains locked without intelligent integration—seamlessly uniting advanced solar generation, purpose-built storage, and smart management into autonomous, reliable systems.
              </p>
              <p>
                Our journey began with Dr. Altaf P, a physicist whose career spans advanced research at global institutions and hands-on manufacturing training at Tata Power Solar through NISE, MNRE. This dual perspective—laboratory innovation and ground-level implementation—shaped a clear conviction: India needs both breakthrough science and deployable, manufacturable solutions designed for its unique energy landscape.
              </p>
              <p>
                This conviction found its first expression in our flagship innovation: India&apos;s first modular, off-grid solar EV charging system. Autonomous. Renewable-powered. Ultra-fast direct-charging for automobiles. Built to work anywhere, independent of the grid—addressing India&apos;s twin challenges of accelerating EV adoption while meeting renewable energy goals.
              </p>
              <p>
                To engineer the complete energy system, we integrated the groundbreaking battery research of Dr. T. Prahlada. His expertise in zinc-ion and zinc-sulfur chemistries forms the scientific core of our stationary storage solutions, designed for safety, sustainability, and scalability—deliberately prioritizing these essentials over the high-density but resource-constrained lithium-ion alternatives.
              </p>
              <p>
                Completing our technical core is Dr. Manikanta P., our Scientific Advisor for electrochemistry and materials synthesis. His expertise in advanced material design bridges our storage and solar R&D, ensuring innovations translate from novel materials into scalable hardware.
              </p>
              <p>
                As an incubated startup at the National Institute of Solar Energy (NISE), we benefit from world-class testing facilities, manufacturing expertise, and policy guidance—accelerating our journey from lab to market.
              </p>
              <p>
                Together, we are building an integrated energy technology company—material scientists and systems engineers creating synergistic solutions: from grid-independent EV charging stations to certified perovskite precursors, from zinc-based BESS to fully integrated solar-plus-storage systems.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Founder's Message */}
      <section className="py-20 md:py-28 border-y border-foreground/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <ScrollReveal delay={0.2}>
            <h2 className="text-2xl md:text-3xl font-mono font-bold text-foreground mb-2 tracking-wider">
              FOUNDER&apos;S MESSAGE
            </h2>
            <p className="text-sm font-mono text-foreground/50 mb-8">
              Why EVAP Solar
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="border-l-2 border-foreground/20 pl-6 md:pl-8">
              <p className="text-sm font-mono text-foreground/40 italic mb-6">
                From the desk of Dr. Altaf P, Founder & CEO
              </p>
              <div className="space-y-5 text-sm md:text-base font-mono text-foreground/70 leading-relaxed italic">
                <p>
                  I have spent over a decade studying solar energy—first as a physics student, then as a researcher at world-class institutions, and finally on the manufacturing floor at Tata Power Solar, trained under NISE, MNRE. Along this journey, one truth became unmistakably clear:
                </p>
                <p className="text-foreground font-bold not-italic text-base md:text-lg">
                  India&apos;s energy transition cannot wait for the grid to catch up.
                </p>
                <p>
                  We have brilliant science in our laboratories and ambitious targets in our policy documents. But between them lies a gap—a valley of death where promising technologies stall, where imported solutions misalign with local conditions, and where ground-level implementation struggles to keep pace.
                </p>
                <p>
                  I founded EVAP Solar to build across this gap.
                </p>
                <p>
                  Our flagship innovation—India&apos;s first modular, off-grid solar EV charging system—is born from this vision. It is designed to work anywhere, independent of the grid. Autonomous. Renewable-powered. Ultra-fast direct-charging for automobiles. It is my answer to the question that has driven me since my days at the lab bench and on the manufacturing line:
                </p>
                <p className="text-foreground not-italic">
                  How do we deliver clean energy where it is needed most, even when the grid cannot?
                </p>
                <p>
                  But this is just the beginning. The same philosophy drives everything we do:
                </p>
                <ul className="space-y-2 not-italic text-foreground/60">
                  <li>• Solar-plus-storage systems for homes and industries, built for performance and future integration</li>
                  <li>• Perovskite technology acceleration to help the entire industry move faster</li>
                  <li>• Zinc-ion BESS for safe, scalable stationary storage</li>
                </ul>
                <p>
                  EVAP Solar is my answer to India&apos;s energy challenges. Not just a company. A bridge between what is possible and what is needed.
                </p>
                <p className="text-foreground not-italic font-bold">Join us.</p>
              </div>
              <p className="mt-8 text-sm font-mono text-foreground/50">
                — Dr. Altaf P<br />
                Founder & CEO, EVAP Solar
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Three-Phase Roadmap */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <ScrollReveal delay={0.2}>
            <h2 className="text-2xl md:text-3xl font-mono font-bold text-foreground text-center mb-4 tracking-wider">
              OUR THREE-PHASE ROADMAP
            </h2>
            <p className="text-sm font-mono text-foreground/50 text-center mb-12">
              From System Integration to Next-Gen Manufacturing
            </p>
          </ScrollReveal>

          <div className="space-y-6">
            <ScrollReveal delay={0.3}>
              <div className="border border-foreground/20 rounded-lg p-6 md:p-8 bg-foreground/5">
                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                  <div className="flex-shrink-0">
                    <span className="text-xs font-mono text-blue-500 dark:text-blue-400 tracking-wider">PHASE 1</span>
                    <div className="text-lg font-mono font-bold text-foreground">System Integration</div>
                    <span className="text-xs font-mono text-foreground/40">NOW</span>
                  </div>
                  <p className="text-sm font-mono text-foreground/60 leading-relaxed">
                    Launching India&apos;s first modular, off-grid solar EV charging system alongside solar-plus-storage installations for residential, commercial, and industrial clients. Validating technology and building market presence.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="border border-foreground/20 rounded-lg p-6 md:p-8 bg-foreground/5">
                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                  <div className="flex-shrink-0">
                    <span className="text-xs font-mono text-green-500 dark:text-green-400 tracking-wider">PHASE 2</span>
                    <div className="text-lg font-mono font-bold text-foreground">Vertical Manufacturing</div>
                    <span className="text-xs font-mono text-foreground/40">2026+</span>
                  </div>
                  <p className="text-sm font-mono text-foreground/60 leading-relaxed">
                    Beginning production of proprietary zinc-based battery packs for BESS applications. Establishing solar panel assembly to create fully integrated &quot;EVAP Energy Systems.&quot;
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
              <div className="border border-foreground/20 rounded-lg p-6 md:p-8 bg-foreground/5">
                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                  <div className="flex-shrink-0">
                    <span className="text-xs font-mono text-purple-500 dark:text-purple-400 tracking-wider">PHASE 3</span>
                    <div className="text-lg font-mono font-bold text-foreground">Product & Grid Solutions</div>
                    <span className="text-xs font-mono text-foreground/40">2028+</span>
                  </div>
                  <p className="text-sm font-mono text-foreground/60 leading-relaxed">
                    Deploying next-generation solar cells from our R&D pipeline. Offering grid-balancing services using our BESS technology. Scaling our impact across India&apos;s energy landscape.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.6}>
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <Link
                href="/innovation"
                className="px-5 py-2.5 border border-foreground/30 text-foreground font-mono text-xs tracking-wider hover:bg-foreground/10 transition-all duration-300 rounded-sm"
              >
                Explore Innovation Pipeline →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 md:py-28 border-y border-foreground/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <ScrollReveal delay={0.2}>
            <h2 className="text-2xl md:text-3xl font-mono font-bold text-foreground text-center mb-12 tracking-wider">
              MISSION & VISION
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollReveal delay={0.3}>
              <div className="border border-foreground/20 rounded-lg p-6 md:p-8 bg-foreground/5">
                <h3 className="text-sm font-mono text-foreground/50 tracking-wider mb-4">VISION</h3>
                <p className="text-base md:text-lg font-mono text-foreground/80 leading-relaxed">
                  To architect India&apos;s transition to energy independence through intelligent, grid-ready, and off-grid renewable systems.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="border border-foreground/20 rounded-lg p-6 md:p-8 bg-foreground/5">
                <h3 className="text-sm font-mono text-foreground/50 tracking-wider mb-4">MISSION</h3>
                <p className="text-base md:text-lg font-mono text-foreground/80 leading-relaxed">
                  We accelerate energy innovation—from materials discovery to manufacturable systems—delivering safe, scalable, and sustainable solutions that work with or without the grid.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ScrollReveal delay={0.2}>
            <h2 className="text-2xl md:text-3xl font-mono font-bold text-foreground text-center mb-12 tracking-wider">
              OUR TEAM
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <ScrollReveal key={member.name} delay={0.2 + index * 0.15}>
                <div className="border border-foreground/20 rounded-lg p-6 md:p-8 bg-foreground/5">
                  {/* Team Photo */}
                  <div className="flex justify-center mb-6">
                    <div className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-foreground/20 bg-foreground/5">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={176}
                        height={176}
                        className={`w-full h-full object-cover object-top ${member.grayscale ? "grayscale" : ""}`}
                      />
                    </div>
                  </div>

                  <h3 className="text-lg font-mono font-bold text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-xs font-mono text-foreground/50 tracking-wider mb-4">
                    {member.title}
                  </p>
                  <p className="text-sm font-mono text-foreground/60 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Partners & Incubators */}
      <section className="py-20 md:py-28 border-t border-foreground/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <ScrollReveal delay={0.2}>
            <h2 className="text-2xl md:text-3xl font-mono font-bold text-foreground text-center mb-12 tracking-wider">
              OUR PARTNERS & INCUBATORS
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {partners.map((partner, index) => (
              <ScrollReveal key={partner.name} delay={0.2 + index * 0.15}>
                <div className="border border-foreground/20 rounded-lg p-6 bg-foreground/5 text-center h-full flex flex-col justify-between">
                  {/* Logo Placeholder */}
                  <div className="w-20 h-20 rounded-lg border-2 border-dashed border-foreground/20 bg-foreground/5 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-xs font-mono text-foreground/30">LOGO</span>
                  </div>
                  <h3 className="text-sm font-mono font-bold text-foreground mb-2">
                    {partner.name}
                  </h3>
                  <p className="text-xs font-mono text-foreground/50">
                    {partner.role}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="py-16 md:py-20 border-t border-foreground/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <ScrollReveal delay={0.2}>
            <p className="text-base md:text-lg font-mono text-foreground/60 leading-relaxed italic">
              EVAP Solar is engineering smarter, safer, and more sustainable energy systems—where advanced solar harvesting and purpose-built storage unite to power a resilient future.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
