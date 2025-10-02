"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useState, useEffect, useRef, Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const Perovskite2D = dynamic(() => import("@/components/3d/perovskite-2d"), {
  ssr: false,
  loading: () => <div className="w-full h-72 bg-black/20 rounded-2xl" />,
});

const translations = {
  en: {
    backButton: "Back to Services",
    title: "SOLAR CELLS R&D",
    subtitle: "Next-Generation Photovoltaic Technologies",

    overview: "INNOVATION BEYOND ENERGY STORAGE",
    overviewText:
      "At Evap Solar, our innovation extends beyond energy storage. We are actively engaged in researching and developing the next generation of solar photovoltaic technologies to deliver more efficient, versatile, and cost-effective clean energy solutions.",

    techSpecs: "SOLAR CELL TECHNOLOGIES",

    crystallineSilicon: {
      title: "CRYSTALLINE SILICON (c-Si) SOLAR CELLS",
      subtitle: "The Powerhouse of Modern Solar Industry",
      description:
        "Crystalline silicon is the powerhouse of the modern solar industry, known for its high efficiency, reliability, and long lifespan. This mature technology is the foundation of most solar panels installed worldwide today.",
      keyFeatures:
        "High efficiency, proven long-term performance, and robust durability.",
      bestFor:
        "Residential, commercial, and utility-scale projects where reliability is paramount.",
    },

    thinFilm: {
      title: "THIN-FILM SOLAR CELLS",
      subtitle: "Flexible and Lightweight Alternative",
      description:
        "Thin-film solar cells represent a more flexible and lightweight alternative to traditional silicon panels. By depositing one or more thin layers of photovoltaic material onto a substrate, these cells require significantly less material to produce.",
      keyFeatures:
        "Lightweight, flexible, and better performance in low-light conditions.",
      bestFor:
        "Building-integrated photovoltaics (BIPV), portable power solutions, and large-scale solar farms.",
    },

    tandem: {
      title: "SILICON-PEROVSKITE TANDEM SOLAR CELLS",
      subtitle: "The Most Exciting Frontier in Solar R&D",
      description:
        "This is one of the most exciting frontiers in solar R&D. Silicon-Perovskite tandem cells combine the best of both worlds, allowing the cell to convert a much wider spectrum of sunlight into electricity.",
      keyFeatures:
        "Ultra-high efficiency potential, synergistic use of materials, and groundbreaking performance.",
      bestFor:
        "Future applications where maximizing power output from a limited space is critical, such as in electric vehicles and high-density urban environments.",
    },

    keyFeatures: "KEY FEATURES & BENEFITS",
    features: {
      innovation: {
        title: "INNOVATIVE RESEARCH",
        items: [
          "Advanced material engineering",
          "Next-generation efficiency targets",
          "Breakthrough tandem technologies",
          "Scalable manufacturing processes",
          "Cost-effective production methods",
        ],
      },
      performance: {
        title: "PERFORMANCE EXCELLENCE",
        items: [
          "45%+ theoretical efficiency",
          "Multi-junction architectures",
          "Perovskite integration",
          "Wide spectrum absorption",
          "Enhanced durability testing",
        ],
      },
      applications: {
        title: "FUTURE APPLICATIONS",
        items: [
          "Electric vehicle integration",
          "Building-integrated PV (BIPV)",
          "Flexible solar solutions",
          "Space and aerospace",
          "Wearable electronics",
        ],
      },
    },

    applications: "RESEARCH APPLICATIONS",
    applicationsList: [
      "High-efficiency solar modules",
      "Flexible photovoltaic systems",
      "Tandem cell architectures",
      "Building-integrated solutions",
      "Electric vehicle solar panels",
      "Aerospace and space applications",
    ],

    advantages: "RESEARCH ADVANTAGES",
    advantagesList: [
      "30+ years of R&D experience",
      "State-of-the-art laboratory facilities",
      "International collaboration network",
      "Advanced characterization tools",
      "Rapid prototyping capabilities",
      "Industry-leading efficiency targets",
    ],

    process: "RESEARCH & DEVELOPMENT PROCESS",
    processSteps: [
      {
        step: "1",
        title: "Material Research",
        description:
          "Advanced material synthesis and characterization for next-generation solar cells",
      },
      {
        step: "2",
        title: "Cell Design",
        description:
          "Device architecture optimization for maximum efficiency and stability",
      },
      {
        step: "3",
        title: "Prototype Development",
        description:
          "Fabrication and testing of proof-of-concept solar cell prototypes",
      },
      {
        step: "4",
        title: "Performance Validation",
        description:
          "Comprehensive testing under various conditions to validate performance metrics",
      },
      {
        step: "5",
        title: "Commercialization",
        description:
          "Scaling up production processes and technology transfer to manufacturing",
      },
    ],
  },
};

export default function SolarCellsPage() {
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
          onClick={() => router.back()}
          className="inline-flex items-center justify-center w-12 h-12 bg-black/80 backdrop-blur-sm border border-white/20 rounded-full text-white/70 hover:text-white hover:bg-black/90 transition-all duration-200 cursor-pointer shadow-lg"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>{" "}
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
            src="/solar-cellinside.jpg"
            alt="Solar cell research laboratory background"
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
            <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse"></div>
            <span className="text-xs text-white/70 font-mono">
              Researching the Future of Solar Energy
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

        .delay-300 {
          animation-delay: 0.3s;
        }

        .delay-600 {
          animation-delay: 0.6s;
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
          {/* Overview & Innovation Grid */}
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
                <span className="px-3 py-1 bg-blue-400/20 text-blue-300 text-sm font-mono rounded">
                  R&D Excellence
                </span>
                <span className="px-3 py-1 bg-green-400/20 text-green-300 text-sm font-mono rounded">
                  Next-Gen PV
                </span>
              </div>
              <p className="text-white/80 leading-relaxed text-sm mb-4">
                {currentTranslation.overviewText}
              </p>
              <p className="text-white/80 leading-relaxed text-sm">
                Pioneering breakthrough technologies in photovoltaic systems for
                enhanced efficiency and sustainable energy solutions.
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
                RESEARCH FOCUS AREAS
              </h2>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">
                    Silicon-Perovskite Tandem:
                  </span>
                  <span className="text-white font-medium">
                    45%+ Efficiency
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Thin-Film Technologies:</span>
                  <span className="text-white font-medium">
                    Flexible Solutions
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Material Engineering:</span>
                  <span className="text-white font-medium">
                    Advanced Synthesis
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Crystalline Silicon:</span>
                  <span className="text-white font-medium">
                    Proven Reliability
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Manufacturing Scale:</span>
                  <span className="text-white font-medium">
                    Commercial Ready
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Application Range:</span>
                  <span className="text-white font-medium">
                    EV to Aerospace
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Solar Cell Technologies Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-medium tracking-wider mb-8 text-center">
              {currentTranslation.techSpecs}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div
                ref={(el) => {
                  sectionRefs.current["tech-left"] = el;
                }}
                data-section="tech-left"
                className={`border border-white/20 rounded-lg p-6 transition-all duration-1000 ease-out backdrop-blur-lg bg-black/30 ${
                  visibleSections.includes("tech-left")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-20"
                }`}
              >
                <h3 className="text-lg font-medium text-white mb-4 tracking-wider">
                  CRYSTALLINE SILICON (c-Si)
                </h3>
                <p className="text-sm text-white/80 leading-relaxed mb-4">
                  {currentTranslation.crystallineSilicon.description}
                </p>
                <ul className="space-y-2 text-sm text-white/80">
                  <li>• High efficiency rates (20-26%)</li>
                  <li>• Proven 25+ year lifespan</li>
                  <li>• Robust durability standards</li>
                  <li>• Mature manufacturing process</li>
                </ul>
              </div>

              <div
                ref={(el) => {
                  sectionRefs.current["tech-center"] = el;
                }}
                data-section="tech-center"
                className={`border border-white/20 rounded-lg p-6 transition-all duration-1000 ease-out delay-200 backdrop-blur-lg bg-black/30 ${
                  visibleSections.includes("tech-center")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-20"
                }`}
              >
                <h3 className="text-lg font-medium text-white mb-4 tracking-wider">
                  THIN-FILM SOLAR CELLS
                </h3>
                <p className="text-sm text-white/80 leading-relaxed mb-4">
                  {currentTranslation.thinFilm.description}
                </p>
                <ul className="space-y-2 text-sm text-white/80">
                  <li>• Lightweight & flexible design</li>
                  <li>• Lower material requirements</li>
                  <li>• Better low-light performance</li>
                  <li>• BIPV integration potential</li>
                </ul>
              </div>

              <div
                ref={(el) => {
                  sectionRefs.current["tech-right"] = el;
                }}
                data-section="tech-right"
                className={`border border-white/20 rounded-lg p-6 transition-all duration-1000 ease-out delay-400 backdrop-blur-lg bg-black/30 ${
                  visibleSections.includes("tech-right")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-20"
                }`}
              >
                <h3 className="text-lg font-medium text-white mb-4 tracking-wider">
                  SILICON-PEROVSKITE TANDEM
                </h3>
                <p className="text-sm text-white/80 leading-relaxed mb-4">
                  {currentTranslation.tandem.description}
                </p>
                <ul className="space-y-2 text-sm text-white/80">
                  <li>• 45%+ theoretical efficiency</li>
                  <li>• Wide spectrum absorption</li>
                  <li>• Multi-junction architecture</li>
                  <li>• Revolutionary performance</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Perovskite Structure Section */}
          <div className="mb-12">
            <div className="border border-white/20 rounded-2xl p-8 backdrop-blur-sm bg-white/5 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-12 left-12 w-2 h-2 bg-white/20 rounded-full animate-pulse"></div>
                <div className="absolute top-24 right-24 w-1 h-1 bg-white/15 rounded-full animate-pulse"></div>
                <div className="absolute bottom-24 left-24 w-1.5 h-1.5 bg-white/20 rounded-full animate-pulse"></div>
                <div className="absolute bottom-12 right-12 w-1 h-1 bg-white/15 rounded-full animate-pulse"></div>
              </div>

              <h2 className="text-2xl font-medium tracking-wider mb-6 text-center text-white relative z-10">
                PEROVSKITE CRYSTAL STRUCTURE
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4 relative z-10">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    CH₃NH₃PbI₃ Structure Analysis
                  </h3>
                  <p className="text-white/90 leading-relaxed text-sm mb-4">
                    Visualization of CH₃NH₃PbI₃ crystal structures to study
                    defect tolerance, charge transport, and stability in
                    perovskite solar cell applications.
                  </p>

                  <div className="space-y-3">
                    <div className="p-3 bg-black/30 rounded-lg border border-white/10">
                      <span className="text-sm text-white/90 font-semibold block mb-2">
                        RESEARCH FOCUS
                      </span>
                      <p className="text-sm text-white/80">
                        Crystal defect analysis, charge carrier dynamics, and
                        stability optimization
                      </p>
                    </div>

                    <div className="p-3 bg-black/30 rounded-lg border border-white/10">
                      <span className="text-sm text-white/90 font-semibold block mb-2">
                        APPLICATIONS
                      </span>
                      <p className="text-sm text-white/80">
                        Tandem solar cells, flexible photovoltaics, and
                        next-generation solar modules
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative z-10">
                  <div className="h-72 rounded-xl overflow-hidden border border-white/10 bg-black/20">
                    <Suspense
                      fallback={
                        <div className="w-full h-full bg-black/20 rounded-2xl flex items-center justify-center border border-white/10">
                          <div className="text-white font-mono text-sm tracking-wider">
                            Loading Perovskite Structure...
                          </div>
                        </div>
                      }
                    >
                      <Perovskite2D />
                    </Suspense>
                  </div>
                  <p className="text-xs font-mono text-white/70 mt-3 text-center">
                    Interactive 2D Projection • Hover for Details • Click to
                    Interact
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
                <div className="p-4 bg-black/30 rounded-lg border border-white/10">
                  <h4 className="text-sm font-semibold text-white mb-2">
                    DEFECT TOLERANCE
                  </h4>
                  <p className="text-xs text-white/80">
                    High tolerance to crystal defects enabling efficient charge
                    transport
                  </p>
                </div>

                <div className="p-4 bg-black/30 rounded-lg border border-white/10">
                  <h4 className="text-sm font-semibold text-white mb-2">
                    CHARGE DYNAMICS
                  </h4>
                  <p className="text-xs text-white/80">
                    Optimized electron-hole pair generation and carrier mobility
                  </p>
                </div>

                <div className="p-4 bg-black/30 rounded-lg border border-white/10">
                  <h4 className="text-sm font-semibold text-white mb-2">
                    STABILITY RESEARCH
                  </h4>
                  <p className="text-xs text-white/80">
                    Environmental stability and long-term performance
                    optimization
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-12">
            <h2 className="text-xl font-medium tracking-wider mb-6 text-center">
              {currentTranslation.keyFeatures}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div
                ref={(el) => {
                  sectionRefs.current["feature-innovation"] = el;
                }}
                data-section="feature-innovation"
                className={`border border-white/20 rounded-xl p-6 transition-all duration-1000 ease-out backdrop-blur-lg bg-white/5 hover:bg-white/10 ${
                  visibleSections.includes("feature-innovation")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-white tracking-wider">
                    {currentTranslation.features.innovation.title}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {currentTranslation.features.innovation.items.map(
                    (item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-white/90"
                      >
                        <div className="w-2 h-2 bg-white/40 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm leading-relaxed">{item}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div
                ref={(el) => {
                  sectionRefs.current["feature-performance"] = el;
                }}
                data-section="feature-performance"
                className={`border border-white/20 rounded-xl p-6 transition-all duration-1000 ease-out delay-200 backdrop-blur-lg bg-white/5 hover:bg-white/10 ${
                  visibleSections.includes("feature-performance")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white tracking-wider">
                    {currentTranslation.features.performance.title}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {currentTranslation.features.performance.items.map(
                    (item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-white/90"
                      >
                        <div className="w-2 h-2 bg-white/40 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm leading-relaxed">{item}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div
                ref={(el) => {
                  sectionRefs.current["feature-applications"] = el;
                }}
                data-section="feature-applications"
                className={`border border-white/20 rounded-xl p-6 transition-all duration-1000 ease-out delay-400 backdrop-blur-lg bg-white/5 hover:bg-white/10 ${
                  visibleSections.includes("feature-applications")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-white tracking-wider">
                    {currentTranslation.features.applications.title}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {currentTranslation.features.applications.items.map(
                    (item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-white/90"
                      >
                        <div className="w-2 h-2 bg-white/40 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm leading-relaxed">{item}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Installation Process */}
          <div className="mb-12">
            <h2 className="text-xl font-medium tracking-wider mb-6 text-center">
              {currentTranslation.process}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentTranslation.processSteps.map((step, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    sectionRefs.current[`process-${index}`] = el;
                  }}
                  data-section={`process-${index}`}
                  className={`border border-white/20 rounded-lg p-4 transition-all duration-1000 ease-out backdrop-blur-lg bg-black/30 ${
                    visibleSections.includes(`process-${index}`)
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-20"
                  }`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                      {step.step}
                    </div>
                    <h3 className="text-lg font-medium text-white tracking-wider">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-sm text-white/80 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Applications & Advantages */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div
              ref={(el) => {
                sectionRefs.current["applications"] = el;
              }}
              data-section="applications"
              className={`border border-white/20 rounded-lg p-6 transition-all duration-1000 ease-out backdrop-blur-lg bg-black/30 ${
                visibleSections.includes("applications")
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-20"
              }`}
            >
              <h2 className="text-lg font-medium tracking-wider mb-4 text-white">
                {currentTranslation.applications}
              </h2>
              <ul className="space-y-3 text-sm text-white/80">
                {currentTranslation.applicationsList.map((app, index) => (
                  <li key={index}>• {app}</li>
                ))}
              </ul>
            </div>

            <div
              ref={(el) => {
                sectionRefs.current["advantages"] = el;
              }}
              data-section="advantages"
              className={`border border-white/20 rounded-lg p-6 transition-all duration-1000 ease-out delay-200 backdrop-blur-lg bg-black/30 ${
                visibleSections.includes("advantages")
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-20"
              }`}
            >
              <h2 className="text-lg font-medium tracking-wider mb-4 text-white">
                {currentTranslation.advantages}
              </h2>
              <ul className="space-y-3 text-sm text-white/80">
                {currentTranslation.advantagesList.map((advantage, index) => (
                  <li key={index}>• {advantage}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
