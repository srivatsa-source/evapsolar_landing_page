"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  Zap,
  Shield,
  Recycle,
  DollarSign,
  Battery,
  Factory,
  Home,
  Building2,
  Hospital,
} from "lucide-react";
import { useRouter } from "next/navigation";

const translations = {
  en: {
    backButton: "Back to Services",
    title: "ZINC-ION BATTERIES",
    subtitle: "Beyond Lithium - The Future of Safe Energy Storage",

    overview: "REVOLUTIONARY ENERGY STORAGE TECHNOLOGY",
    overviewText:
      "Zinc-ion batteries represent a groundbreaking advancement in energy storage technology, offering a safer, more sustainable, and cost-effective alternative to traditional lithium-ion systems.",

    coreTitle: "CORE CONCEPT & COMPONENTS",

    comparison: "COMPARISON WITH LITHIUM-ION",

    specifications: "TECHNICAL SPECIFICATIONS",

    performance: "PERFORMANCE METRICS",

    applications: "APPLICATIONS & USE CASES",

    advantages: "KEY ADVANTAGES",

    // Component details
    components: {
      anode: {
        title: "ZINC ANODE",
        description:
          "Stores and provides zinc ions during battery operation using zinc carbon material for optimal performance.",
      },
      cathode: {
        title: "CATHODE SYSTEM",
        description:
          "Accepts zinc ions during discharge and releases them during charging using manganese oxide carbon.",
      },
      electrolyte: {
        title: "AQUEOUS ELECTROLYTE",
        description:
          "Safe aqueous solution medium that enables zinc ion transport between anode and cathode.",
      },
    },

    // Advantages
    advantagesList: {
      safety: {
        title: "ENHANCED SAFETY",
        description:
          "Non-flammable and less prone to overheating compared to lithium-ion technology.",
      },
      sustainability: {
        title: "ENVIRONMENTAL SUSTAINABILITY",
        description:
          "Uses abundant zinc with lower environmental impact and recyclable materials.",
      },
      cost: {
        title: "COST EFFICIENCY",
        description:
          "More affordable due to zinc abundance and reduced vulnerability to resource constraints.",
      },
    },

    // Specifications
    specs: {
      voltage: "24 VDC",
      capacity: "6.35 Ah",
      efficiency: "90%",
      power: "145 W",
      socWindow: "0–100%",
      temperature: "+10°C to +30°C",
      energyDensity: "100 Wh/L",
      specificEnergy: "90 Wh/kg",
    },

    // Applications
    applicationsList: {
      utility: {
        title: "Utility & Grid Support",
        description:
          "Balance supply and demand while integrating renewable energy sources into the grid.",
      },
      residential: {
        title: "Residential Energy",
        description:
          "Dependable backup power and intelligent energy management for homes.",
      },
      commercial: {
        title: "Business & Industry",
        description:
          "Reduce operational downtime and cut energy costs for commercial and industrial facilities.",
      },
      critical: {
        title: "Critical Infrastructure",
        description:
          "Uninterrupted power supply for hospitals, telecom networks, and emergency services.",
      },
    },
  },
};

export default function ZincBatteriesPage() {
  const router = useRouter();
  const [currentLang, setCurrentLang] = useState("en");
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const savedLang = localStorage.getItem("language") || "en";
    setCurrentLang(savedLang);
  }, []);

  // Scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute("data-section");
            if (sectionId && !visibleSections.includes(sectionId)) {
              setVisibleSections((prev) => [...prev, sectionId]);
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [visibleSections]);

  const currentTranslation =
    translations[currentLang as keyof typeof translations] || translations.en;

  return (
    <main className="bg-black text-white min-h-screen font-mono">
      <Navigation />

      {/* Fixed Back to Home Button */}
      <div className="fixed top-20 left-4 z-50">
        <button
          onClick={() => {
            window.location.href = "/";
          }}
          className="inline-flex items-center justify-center w-12 h-12 bg-black/80 backdrop-blur-sm border border-white/20 rounded-full text-white/70 hover:text-white hover:bg-black/90 transition-all duration-200 cursor-pointer shadow-lg"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-20 w-1 h-1 bg-white/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-40 w-1 h-1 bg-white/10 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-40 w-1 h-1 bg-white/15 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-20 w-1 h-1 bg-white/10 rounded-full animate-pulse delay-3000"></div>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full animate-image-fade-in">
          <img
            src="/zinc-battery.jpg"
            alt="Zinc-ion battery technology laboratory background"
            className="absolute inset-0 w-full h-full object-cover animate-image-zoom transition-transform duration-700 ease-out hover:scale-105"
            loading="lazy"
            decoding="async"
            width={1920}
            height={1080}
            onError={(e) => {
              const t = e.currentTarget as HTMLImageElement;
              if (!t.src.includes("/placeholder.jpg"))
                t.src = "/placeholder.jpg";
            }}
          />
          {/* Background overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] animate-overlay-fade-in"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wider mb-8 animate-fade-in-up text-white drop-shadow-2xl">
            {currentTranslation.title}
          </h1>
          <div className="w-24 h-px bg-white mx-auto mb-8 animate-fade-in-up animation-delay-300"></div>
          <p className="text-lg md:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed animate-fade-in-up animation-delay-600 drop-shadow-lg">
            {currentTranslation.subtitle}
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 mt-8 animate-fade-in-up animation-delay-900">
            <Battery className="w-4 h-4 text-white/40" />
            <span className="text-xs text-white/70 font-mono">
              Safer • Sustainable • Cost-Effective
            </span>
          </div>
        </div>
      </section>

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes typeWriter {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        @keyframes blink {
          0%,
          50% {
            border-color: transparent;
          }
          51%,
          100% {
            border-color: white;
          }
        }

        @keyframes glow {
          from {
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
          }
          to {
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
          }
        }

        @keyframes overlayFade {
          0% {
            background-color: rgba(0, 0, 0, 0.9);
          }
          100% {
            background-color: rgba(0, 0, 0, 0.6);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
          opacity: 0;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
        }

        .animation-delay-900 {
          animation-delay: 0.9s;
        }

        .animate-typewriter {
          overflow: hidden;
          border-right: 2px solid white;
          white-space: nowrap;
          animation: typeWriter 3s steps(40, end), blink 0.75s step-end infinite;
        }

        /* Hover effects for interactive elements */
        h1:hover {
          animation: none;
          transform: scale(1.02);
          transition: transform 0.3s ease;
        }

        /* Subtle glow effect on load */
        .animate-fade-in-up:nth-child(1) {
          animation: fadeInUp 1s ease-out forwards,
            glow 2s ease-in-out infinite alternate;
        }

        @keyframes imageFadeIn {
          0% {
            opacity: 0;
            transform: scale(1.1);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes imageZoom {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.05);
          }
        }

        @keyframes overlayFadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .animate-image-fade-in {
          animation: imageFadeIn 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          opacity: 0;
        }

        .animate-image-zoom {
          animation: imageZoom 2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .animate-overlay-fade-in {
          animation: overlayFadeIn 2s cubic-bezier(0.4, 0, 0.2, 1) 0.5s forwards;
          opacity: 0;
        }

        @keyframes smoothSlideIn {
          from {
            opacity: 0;
            transform: translateY(50px) translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0) translateX(0);
          }
        }

        .animate-smooth-slide-in {
          animation: smoothSlideIn 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          opacity: 0;
        }

        .animation-delay-300 {
          animation-delay: 0.4s;
        }

        .animation-delay-600 {
          animation-delay: 0.8s;
        }

        .animation-delay-900 {
          animation-delay: 1.2s;
        }
      `}</style>

      {/* Content Sections */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Overview & Technology Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <div
              ref={(el) => {
                sectionRefs.current["overview-left"] = el;
              }}
              data-section="overview-left"
              className={`border border-white/20 rounded-lg p-8 transition-all duration-1000 ease-out backdrop-blur-lg bg-black/30 ${
                visibleSections.includes("overview-left")
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-20"
              }`}
            >
              <h2 className="text-xl font-medium tracking-wider mb-6">
                {currentTranslation.overview}
              </h2>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-green-400/20 text-green-300 text-sm font-mono rounded">
                  TRL 6
                </span>
                <span className="px-3 py-1 bg-blue-400/20 text-blue-300 text-sm font-mono rounded">
                  Commercial Development
                </span>
              </div>
              <p className="text-white/80 leading-relaxed text-sm mb-4">
                {currentTranslation.overviewText}
              </p>
              <p className="text-white/80 leading-relaxed text-sm">
                Revolutionary zinc-ion battery technology that combines safety,
                sustainability, and cost-effectiveness for next-generation
                energy storage solutions.
              </p>
            </div>

            <div
              ref={(el) => {
                sectionRefs.current["overview-right"] = el;
              }}
              data-section="overview-right"
              className={`border border-white/20 rounded-lg p-8 transition-all duration-1000 ease-out delay-200 backdrop-blur-lg bg-black/30 ${
                visibleSections.includes("overview-right")
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-20"
              }`}
            >
              <h2 className="text-xl font-medium tracking-wider mb-6">
                TECHNICAL SPECIFICATIONS
              </h2>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Energy Density:</span>
                  <span className="text-white font-medium">100-200 Wh/kg</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Cycle Life:</span>
                  <span className="text-white font-medium">
                    3000-5000 cycles
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Operating Temp:</span>
                  <span className="text-white font-medium">-20°C to +60°C</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Safety Rating:</span>
                  <span className="text-white font-medium">Non-flammable</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Cost Advantage:</span>
                  <span className="text-white font-medium">30-50% lower</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Self-discharge:</span>
                  <span className="text-white font-medium">
                    &lt; 5% per month
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Core Components & Technology */}
          <div className="mb-16">
            <h2 className="text-2xl font-medium tracking-wider mb-8 text-center">
              {currentTranslation.coreTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div
                ref={(el) => {
                  sectionRefs.current["components-left"] = el;
                }}
                data-section="components-left"
                className={`border border-white/20 rounded-lg p-6 transition-all duration-1000 ease-out backdrop-blur-lg bg-black/30 ${
                  visibleSections.includes("components-left")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-20"
                }`}
              >
                <h3 className="text-lg font-medium text-white mb-4 tracking-wider">
                  {currentTranslation.components.anode.title}
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  {currentTranslation.components.anode.description}
                </p>
              </div>

              <div
                ref={(el) => {
                  sectionRefs.current["components-center"] = el;
                }}
                data-section="components-center"
                className={`border border-white/20 rounded-lg p-6 transition-all duration-1000 ease-out delay-200 backdrop-blur-lg bg-black/30 ${
                  visibleSections.includes("components-center")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-20"
                }`}
              >
                <h3 className="text-lg font-medium text-white mb-4 tracking-wider">
                  {currentTranslation.components.cathode.title}
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  {currentTranslation.components.cathode.description}
                </p>
              </div>

              <div
                ref={(el) => {
                  sectionRefs.current["components-right"] = el;
                }}
                data-section="components-right"
                className={`border border-white/20 rounded-lg p-6 transition-all duration-1000 ease-out delay-400 backdrop-blur-lg bg-black/30 ${
                  visibleSections.includes("components-right")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-20"
                }`}
              >
                <h3 className="text-lg font-medium text-white mb-4 tracking-wider">
                  {currentTranslation.components.electrolyte.title}
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  {currentTranslation.components.electrolyte.description}
                </p>
              </div>
            </div>
          </div>

          {/* Key Advantages & Benefits */}
          <div className="mb-16">
            <h2 className="text-2xl font-medium tracking-wider mb-8 text-center">
              KEY ADVANTAGES & BENEFITS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div
                ref={(el) => {
                  sectionRefs.current["advantages-left"] = el;
                }}
                data-section="advantages-left"
                className={`border border-white/20 rounded-lg p-6 transition-all duration-1000 ease-out backdrop-blur-lg bg-black/30 ${
                  visibleSections.includes("advantages-left")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-20"
                }`}
              >
                <h3 className="text-lg font-medium text-white mb-4 tracking-wider">
                  {currentTranslation.advantagesList.safety.title}
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  {currentTranslation.advantagesList.safety.description}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-white/80">
                  <li>• Non-flammable electrolyte</li>
                  <li>• No thermal runaway risk</li>
                  <li>• Operates at room temperature</li>
                  <li>• Inherently safe chemistry</li>
                </ul>
              </div>

              <div
                ref={(el) => {
                  sectionRefs.current["advantages-center"] = el;
                }}
                data-section="advantages-center"
                className={`border border-white/20 rounded-lg p-6 transition-all duration-1000 ease-out delay-200 backdrop-blur-lg bg-black/30 ${
                  visibleSections.includes("advantages-center")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-20"
                }`}
              >
                <h3 className="text-lg font-medium text-white mb-4 tracking-wider">
                  {currentTranslation.advantagesList.sustainability.title}
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  {currentTranslation.advantagesList.sustainability.description}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-white/80">
                  <li>• 100% recyclable materials</li>
                  <li>• Abundant zinc resources</li>
                  <li>• Water-based electrolyte</li>
                  <li>• Low environmental impact</li>
                </ul>
              </div>

              <div
                ref={(el) => {
                  sectionRefs.current["advantages-right"] = el;
                }}
                data-section="advantages-right"
                className={`border border-white/20 rounded-lg p-6 transition-all duration-1000 ease-out delay-400 backdrop-blur-lg bg-black/30 ${
                  visibleSections.includes("advantages-right")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-20"
                }`}
              >
                <h3 className="text-lg font-medium text-white mb-4 tracking-wider">
                  {currentTranslation.advantagesList.cost.title}
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  {currentTranslation.advantagesList.cost.description}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-white/80">
                  <li>• 30-50% lower material costs</li>
                  <li>• Simple manufacturing process</li>
                  <li>• No rare earth elements</li>
                  <li>• Long operational lifespan</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Technical Innovation & Performance */}
          <div className="mb-16">
            <h2 className="text-2xl font-medium tracking-wider mb-8 text-center">
              TECHNICAL INNOVATION & PERFORMANCE
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div
                ref={(el) => {
                  sectionRefs.current["specs-left"] = el;
                }}
                data-section="specs-left"
                className={`border border-white/20 rounded-lg p-8 transition-all duration-1000 ease-out backdrop-blur-lg bg-black/30 ${
                  visibleSections.includes("specs-left")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-20"
                }`}
              >
                <h3 className="text-lg font-medium text-white mb-6 tracking-wider">
                  CELL SPECIFICATIONS (EVAP SOLAR)
                </h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Nominal Voltage:</span>
                    <span className="text-white font-medium">
                      {currentTranslation.specs.voltage}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Nominal Capacity:</span>
                    <span className="text-white font-medium">
                      {currentTranslation.specs.capacity}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Efficiency:</span>
                    <span className="text-white font-medium">
                      {currentTranslation.specs.efficiency}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Max Charge/Discharge:</span>
                    <span className="text-white font-medium">
                      {currentTranslation.specs.power}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">SoC Window:</span>
                    <span className="text-white font-medium">
                      {currentTranslation.specs.socWindow}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">
                      Operating Temperature:
                    </span>
                    <span className="text-white font-medium">
                      {currentTranslation.specs.temperature}
                    </span>
                  </div>
                </div>
              </div>

              <div
                ref={(el) => {
                  sectionRefs.current["specs-right"] = el;
                }}
                data-section="specs-right"
                className={`border border-white/20 rounded-lg p-8 transition-all duration-1000 ease-out delay-200 backdrop-blur-lg bg-black/30 ${
                  visibleSections.includes("specs-right")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-20"
                }`}
              >
                <h3 className="text-lg font-medium text-white mb-6 tracking-wider">
                  {currentTranslation.performance}
                </h3>
                <div className="space-y-6">
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Energy Density:</span>
                      <span className="text-white font-medium">
                        {currentTranslation.specs.energyDensity}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">
                        Weight-Specific Energy:
                      </span>
                      <span className="text-white font-medium">
                        {currentTranslation.specs.specificEnergy}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-white mb-3">
                      Key Performance Benefits:
                    </h4>
                    <ul className="space-y-2 text-sm text-white/80">
                      <li>• Short to medium-duration energy storage</li>
                      <li>• Adaptable for various energy needs</li>
                      <li>• Non-flammable chemistry for safety</li>
                      <li>• Recyclable materials design</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Applications & Market Sectors */}
          <div>
            <h2 className="text-2xl font-medium tracking-wider mb-8 text-center">
              {currentTranslation.applications}
            </h2>

            <div className="border border-white/20 rounded-lg p-8 backdrop-blur-lg bg-black/30">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300">
                  <Factory className="w-5 h-5 text-white mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-medium text-sm mb-1">
                      {currentTranslation.applicationsList.utility.title}
                    </h4>
                    <p className="text-white/80 text-xs">
                      {currentTranslation.applicationsList.utility.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300">
                  <Home className="w-5 h-5 text-white mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-medium text-sm mb-1">
                      {currentTranslation.applicationsList.residential.title}
                    </h4>
                    <p className="text-white/80 text-xs">
                      {
                        currentTranslation.applicationsList.residential
                          .description
                      }
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300">
                  <Building2 className="w-5 h-5 text-white mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-medium text-sm mb-1">
                      {currentTranslation.applicationsList.commercial.title}
                    </h4>
                    <p className="text-white/80 text-xs">
                      {
                        currentTranslation.applicationsList.commercial
                          .description
                      }
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300">
                  <Hospital className="w-5 h-5 text-white mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-medium text-sm mb-1">
                      {currentTranslation.applicationsList.critical.title}
                    </h4>
                    <p className="text-white/80 text-xs">
                      {currentTranslation.applicationsList.critical.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
          opacity: 0;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
        }

        .animation-delay-900 {
          animation-delay: 0.9s;
        }

        .animation-delay-1200 {
          animation-delay: 1.2s;
        }
      `}</style>
    </main>
  );
}
