"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useState, useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const translations = {
  en: {
    backButton: "Back to Services",
    title: "GROUND MOUNTED SOLAR SYSTEMS",
    subtitle:
      "Utility-Scale and Campus Solar Deployments with Optimized Performance",

    overview: "OVERVIEW",
    overviewText:
      "Our ground mounted solar systems are designed for utility-scale and large commercial installations. Featuring optimized tilt angles, strategic row spacing, and efficient cable management for maximum power generation and cost-effectiveness.",

    techSpecs: "TECHNICAL SPECIFICATIONS",
    techSpecsData: [
      { label: "Panel Efficiency:", value: "21-23%" },
      { label: "System Size Range:", value: "100 kW - 50 MW" },
      { label: "Installation Time:", value: "2-8 weeks" },
      { label: "Ground Coverage Ratio:", value: "35-45%" },
      { label: "Tilt Angle Range:", value: "15° - 45°" },
      { label: "Tracking Options:", value: "Fixed / Single-axis / Dual-axis" },
    ],

    keyFeatures: "KEY FEATURES & BENEFITS",
    features: {
      optimization: {
        title: "PERFORMANCE OPTIMIZATION",
        items: [
          "Optimal tilt angle configuration",
          "Minimized inter-row shading",
          "Advanced tracking systems",
          "Weather monitoring integration",
          "Maximum energy yield design",
        ],
      },
      scalability: {
        title: "SCALABLE ARCHITECTURE",
        items: [
          "Modular system design",
          "Flexible capacity expansion",
          "Standardized components",
          "Future-proof infrastructure",
          "Grid integration ready",
        ],
      },
      maintenance: {
        title: "LOW MAINTENANCE",
        items: [
          "Easy access for cleaning",
          "Remote monitoring systems",
          "Predictive maintenance alerts",
          "Automated fault detection",
          "Minimal operational costs",
        ],
      },
    },

    applications: "APPLICATIONS",
    applicationsList: [
      "Utility-scale power plants",
      "Industrial campus installations",
      "Solar farms and energy parks",
      "Municipal and government facilities",
      "Agricultural solar projects",
      "Mining and remote operations",
    ],

    advantages: "COMPETITIVE ADVANTAGES",
    advantagesList: [
      "Higher energy density per acre",
      "Flexible orientation and tracking",
      "Easier maintenance access",
      "No structural load limitations",
      "Optimal cooling and ventilation",
      "Cost-effective large-scale deployment",
    ],

    process: "INSTALLATION PROCESS",
    processSteps: [
      {
        step: "1",
        title: "Land Assessment",
        description:
          "Comprehensive site survey including soil analysis, topography, and environmental impact studies",
      },
      {
        step: "2",
        title: "System Engineering",
        description:
          "Detailed engineering design with optimal layout, electrical configuration, and grid connection planning",
      },
      {
        step: "3",
        title: "Environmental Clearance",
        description:
          "Regulatory approvals, environmental clearances, and utility interconnection agreements",
      },
      {
        step: "4",
        title: "Site Preparation",
        description:
          "Land clearing, grading, foundation work, and electrical infrastructure installation",
      },
      {
        step: "5",
        title: "System Installation",
        description:
          "Panel mounting, electrical connections, inverter installation, and grid synchronization",
      },
      {
        step: "6",
        title: "Testing & Commissioning",
        description:
          "Comprehensive system testing, performance verification, and handover to operations team",
      },
    ],

    technology: "TECHNOLOGY HIGHLIGHTS",
    techHighlights: [
      {
        title: "Advanced Tracking Systems",
        description:
          "Single and dual-axis tracking systems that follow the sun's path for maximum energy capture throughout the day.",
      },
      {
        title: "Smart Inverter Technology",
        description:
          "Grid-interactive inverters with reactive power support, voltage regulation, and anti-islanding protection.",
      },
      {
        title: "Monitoring & Analytics",
        description:
          "Real-time performance monitoring with AI-powered analytics for predictive maintenance and optimization.",
      },
      {
        title: "Weather Station Integration",
        description:
          "On-site weather monitoring for irradiance measurement, temperature tracking, and wind speed analysis.",
      },
    ],
  },
};

export default function GroundMountedSolarCaseStudy() {
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
            console.log("Back button clicked");
            window.location.href = "/";
          }}
          className="inline-flex items-center justify-center w-12 h-12 bg-black/80 backdrop-blur-sm border border-white/20 rounded-full text-white/70 hover:text-white hover:bg-black/90 transition-all duration-200 cursor-pointer shadow-lg"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>{" "}
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full animate-image-fade-in">
          <img
            src="/ground-mountedinside.jpg"
            alt="Ground mounted solar installation with engineers background"
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
        </div>
      </section>
      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes imageFadeIn {
          from {
            opacity: 0;
            transform: scale(1.1);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes imageZoom {
          from {
            transform: scale(1.05);
          }
          to {
            transform: scale(1);
          }
        }

        @keyframes overlayFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
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

        .animate-fade-in-up {
          animation: fadeInUp 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          opacity: 0;
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

        /* Smooth transitions for all interactive elements */
        * {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
            opacity 0.3s ease;
        }
      `}</style>
      {/* Content Sections */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Overview & Technical Specs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <div
              ref={(el) => {
                sectionRefs.current["overview"] = el;
              }}
              data-section="overview"
              className={`border border-white/20 rounded-lg p-8 transition-all duration-1000 ease-out backdrop-blur-lg bg-black/30 ${
                visibleSections.includes("overview")
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-20"
              }`}
            >
              <h2 className="text-xl font-medium tracking-wider mb-6">
                {currentTranslation.overview}
              </h2>
              <p className="text-white/80 leading-relaxed text-sm">
                {currentTranslation.overviewText}
              </p>
            </div>

            <div
              ref={(el) => {
                sectionRefs.current["techspecs"] = el;
              }}
              data-section="techspecs"
              className={`border border-white/20 rounded-lg p-8 transition-all duration-1000 ease-out delay-200 backdrop-blur-lg bg-black/30 ${
                visibleSections.includes("techspecs")
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-20"
              }`}
            >
              <h2 className="text-xl font-medium tracking-wider mb-6">
                {currentTranslation.techSpecs}
              </h2>
              <div className="space-y-4 text-sm">
                {currentTranslation.techSpecsData.map((spec, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span className="text-white/70">{spec.label}</span>
                    <span className="text-white font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-16">
            <h2 className="text-2xl font-medium tracking-wider mb-8 text-center">
              {currentTranslation.keyFeatures}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div
                ref={(el) => {
                  sectionRefs.current["feature-optimization"] = el;
                }}
                data-section="feature-optimization"
                className={`border border-white/20 rounded-lg p-6 transition-all duration-1000 ease-out backdrop-blur-lg bg-black/30 ${
                  visibleSections.includes("feature-optimization")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-20"
                }`}
              >
                <h3 className="text-lg font-medium text-blue-300 mb-4 tracking-wider">
                  {currentTranslation.features.optimization.title}
                </h3>
                <ul className="space-y-2 text-sm text-white/80">
                  {currentTranslation.features.optimization.items.map(
                    (item, index) => (
                      <li key={index}>• {item}</li>
                    )
                  )}
                </ul>
              </div>

              <div
                ref={(el) => {
                  sectionRefs.current["feature-scalability"] = el;
                }}
                data-section="feature-scalability"
                className={`border border-white/20 rounded-lg p-6 transition-all duration-1000 ease-out delay-200 backdrop-blur-lg bg-black/30 ${
                  visibleSections.includes("feature-scalability")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-20"
                }`}
              >
                <h3 className="text-lg font-medium text-green-300 mb-4 tracking-wider">
                  {currentTranslation.features.scalability.title}
                </h3>
                <ul className="space-y-2 text-sm text-white/80">
                  {currentTranslation.features.scalability.items.map(
                    (item, index) => (
                      <li key={index}>• {item}</li>
                    )
                  )}
                </ul>
              </div>

              <div
                ref={(el) => {
                  sectionRefs.current["feature-maintenance"] = el;
                }}
                data-section="feature-maintenance"
                className={`border border-white/20 rounded-lg p-6 transition-all duration-1000 ease-out delay-400 backdrop-blur-lg bg-black/30 ${
                  visibleSections.includes("feature-maintenance")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-20"
                }`}
              >
                <h3 className="text-lg font-medium text-purple-300 mb-4 tracking-wider">
                  {currentTranslation.features.maintenance.title}
                </h3>
                <ul className="space-y-2 text-sm text-white/80">
                  {currentTranslation.features.maintenance.items.map(
                    (item, index) => (
                      <li key={index}>• {item}</li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Technology Highlights */}
          <div className="mb-16">
            <h2 className="text-2xl font-medium tracking-wider mb-8 text-center">
              {currentTranslation.technology}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {currentTranslation.techHighlights.map((tech, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    sectionRefs.current[`tech-${index}`] = el;
                  }}
                  data-section={`tech-${index}`}
                  className={`border border-white/20 rounded-lg p-6 transition-all duration-1000 ease-out backdrop-blur-lg bg-black/30 ${
                    visibleSections.includes(`tech-${index}`)
                      ? "opacity-100 translate-x-0"
                      : index % 2 === 0
                      ? "opacity-0 -translate-x-20"
                      : "opacity-0 translate-x-20"
                  }`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <h3 className="text-lg font-medium text-cyan-300 mb-3 tracking-wider">
                    {tech.title}
                  </h3>
                  <p className="text-sm text-white/80 leading-relaxed">
                    {tech.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Installation Process */}
          <div className="mb-16">
            <h2 className="text-2xl font-medium tracking-wider mb-8 text-center">
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
                  className={`border border-white/20 rounded-lg p-6 transition-all duration-1000 ease-out backdrop-blur-lg bg-black/30 ${
                    visibleSections.includes(`process-${index}`)
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-20"
                  }`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold mr-3">
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
              className={`border border-white/20 rounded-lg p-8 transition-all duration-1000 ease-out backdrop-blur-lg bg-black/30 ${
                visibleSections.includes("applications")
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-20"
              }`}
            >
              <h2 className="text-xl font-medium tracking-wider mb-6 text-orange-300">
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
              className={`border border-white/20 rounded-lg p-8 transition-all duration-1000 ease-out delay-200 backdrop-blur-lg bg-black/30 ${
                visibleSections.includes("advantages")
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-20"
              }`}
            >
              <h2 className="text-xl font-medium tracking-wider mb-6 text-cyan-300">
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
