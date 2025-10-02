"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useState, useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const translations = {
  en: {
    backButton: "Back to Services",
    title: "TIN SHED SOLAR SOLUTIONS",
    subtitle:
      "Industrial and Agricultural Solar Systems with Enhanced Structural Safety",

    overview: "OVERVIEW",
    overviewText:
      "Our tin shed solar solutions are specifically engineered for industrial and agricultural buildings with metal roofing. Featuring customized mounting systems that ensure wind-load safety, proper drainage, and long-term structural integrity for challenging environments.",

    techSpecs: "TECHNICAL SPECIFICATIONS",
    techSpecsData: [
      { label: "Panel Efficiency:", value: "20-22%" },
      { label: "System Size Range:", value: "10-500 kW" },
      { label: "Installation Time:", value: "3-7 days" },
      { label: "Wind Load Resistance:", value: "Up to 250 km/h" },
      { label: "Roof Pitch Compatibility:", value: "5° - 30°" },
      { label: "Snow Load Capacity:", value: "Up to 2.5 kN/m²" },
    ],

    keyFeatures: "KEY FEATURES & BENEFITS",
    features: {
      structural: {
        title: "STRUCTURAL SAFETY",
        items: [
          "Engineered for metal roof compatibility",
          "Wind load certified mounting",
          "Seismic resistance design",
          "Corrosion-resistant materials",
          "Professional load calculations",
        ],
      },
      drainage: {
        title: "WATER MANAGEMENT",
        items: [
          "Integrated drainage channels",
          "Leak-proof penetration seals",
          "Thermal expansion joints",
          "Weather barrier systems",
          "Gutter protection design",
        ],
      },
      durability: {
        title: "INDUSTRIAL DURABILITY",
        items: [
          "Heavy-duty mounting rails",
          "Anti-corrosion coating",
          "UV-resistant components",
          "Extreme weather rated",
          "25+ year service life",
        ],
      },
    },

    applications: "APPLICATIONS",
    applicationsList: [
      "Industrial manufacturing facilities",
      "Agricultural storage buildings",
      "Warehouse and distribution centers",
      "Livestock and dairy operations",
      "Food processing facilities",
      "Mining and extraction operations",
    ],

    advantages: "COMPETITIVE ADVANTAGES",
    advantagesList: [
      "No roof structural modifications needed",
      "Maintains building warranty",
      "Enhanced wind and weather resistance",
      "Industrial-grade component quality",
      "Specialized agricultural applications",
      "Cost-effective large roof coverage",
    ],

    process: "INSTALLATION PROCESS",
    processSteps: [
      {
        step: "1",
        title: "Structural Assessment",
        description:
          "Comprehensive roof structure analysis including wind load calculations and material compatibility evaluation",
      },
      {
        step: "2",
        title: "Custom Design",
        description:
          "Tailored mounting system design considering roof profile, drainage requirements, and environmental factors",
      },
      {
        step: "3",
        title: "Engineering Approval",
        description:
          "Structural engineer certification and building code compliance verification for industrial applications",
      },
      {
        step: "4",
        title: "Pre-fabrication",
        description:
          "Custom mounting components fabricated off-site for precise fit and minimal installation time",
      },
      {
        step: "5",
        title: "Installation & Sealing",
        description:
          "Professional installation with weatherproofing, drainage integration, and system commissioning",
      },
    ],

    challenges: "INDUSTRIAL CHALLENGES SOLVED",
    challengesList: [
      {
        title: "Wind Load Management",
        description:
          "Advanced mounting systems designed to handle extreme wind loads typical in industrial environments while maintaining structural integrity.",
      },
      {
        title: "Thermal Expansion",
        description:
          "Specialized joints and mounting techniques accommodate thermal expansion of large metal roof structures without compromising seals.",
      },
      {
        title: "Corrosive Environments",
        description:
          "Marine-grade materials and protective coatings ensure long-term performance in chemically aggressive industrial atmospheres.",
      },
      {
        title: "Maintenance Access",
        description:
          "Strategic panel placement and walkway design maintain safe access for both solar and building maintenance operations.",
      },
    ],

    sustainability: "SUSTAINABILITY IMPACT",
    sustainabilityFeatures: [
      "Reduces industrial carbon footprint",
      "Enables energy independence for manufacturing",
      "Supports agricultural sustainability goals",
      "Provides hedge against energy cost volatility",
      "Qualifies for green building certifications",
      "Contributes to corporate ESG objectives",
    ],
  },
};

export default function TinShedSolarCaseStudy() {
  const [currentLang, setCurrentLang] = useState("en");
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const router = useRouter();

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

      {/* Back Button */}
      <div className="fixed top-20 left-6 z-50">
        <button
          onClick={() => router.back()}
          aria-label={currentTranslation.backButton}
          className="inline-flex items-center justify-center w-12 h-12 bg-black/80 backdrop-blur-sm border border-white/20 rounded-full text-white/70 hover:text-white hover:bg-black/90 transition-all duration-200 cursor-pointer shadow-lg"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full animate-image-fade-in">
          <img
            src="/tin-shedinside.jpg"
            alt="Tin shed solar installation with engineers background"
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
                  sectionRefs.current["feature-structural"] = el;
                }}
                data-section="feature-structural"
                className={`border border-white/20 rounded-lg p-6 transition-all duration-1000 ease-out backdrop-blur-lg bg-black/30 ${
                  visibleSections.includes("feature-structural")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-20"
                }`}
              >
                <h3 className="text-lg font-medium text-red-300 mb-4 tracking-wider">
                  {currentTranslation.features.structural.title}
                </h3>
                <ul className="space-y-2 text-sm text-white/80">
                  {currentTranslation.features.structural.items.map(
                    (item, index) => (
                      <li key={index}>• {item}</li>
                    )
                  )}
                </ul>
              </div>

              <div
                ref={(el) => {
                  sectionRefs.current["feature-drainage"] = el;
                }}
                data-section="feature-drainage"
                className={`border border-white/20 rounded-lg p-6 transition-all duration-1000 ease-out delay-200 backdrop-blur-lg bg-black/30 ${
                  visibleSections.includes("feature-drainage")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-20"
                }`}
              >
                <h3 className="text-lg font-medium text-blue-300 mb-4 tracking-wider">
                  {currentTranslation.features.drainage.title}
                </h3>
                <ul className="space-y-2 text-sm text-white/80">
                  {currentTranslation.features.drainage.items.map(
                    (item, index) => (
                      <li key={index}>• {item}</li>
                    )
                  )}
                </ul>
              </div>

              <div
                ref={(el) => {
                  sectionRefs.current["feature-durability"] = el;
                }}
                data-section="feature-durability"
                className={`border border-white/20 rounded-lg p-6 transition-all duration-1000 ease-out delay-400 backdrop-blur-lg bg-black/30 ${
                  visibleSections.includes("feature-durability")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-20"
                }`}
              >
                <h3 className="text-lg font-medium text-green-300 mb-4 tracking-wider">
                  {currentTranslation.features.durability.title}
                </h3>
                <ul className="space-y-2 text-sm text-white/80">
                  {currentTranslation.features.durability.items.map(
                    (item, index) => (
                      <li key={index}>• {item}</li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Industrial Challenges */}
          <div className="mb-16">
            <h2 className="text-2xl font-medium tracking-wider mb-8 text-center">
              {currentTranslation.challenges}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {currentTranslation.challengesList.map((challenge, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    sectionRefs.current[`challenge-${index}`] = el;
                  }}
                  data-section={`challenge-${index}`}
                  className={`border border-white/20 rounded-lg p-6 transition-all duration-1000 ease-out backdrop-blur-lg bg-black/30 ${
                    visibleSections.includes(`challenge-${index}`)
                      ? "opacity-100 translate-x-0"
                      : index % 2 === 0
                      ? "opacity-0 -translate-x-20"
                      : "opacity-0 translate-x-20"
                  }`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <h3 className="text-lg font-medium text-yellow-300 mb-3 tracking-wider">
                    {challenge.title}
                  </h3>
                  <p className="text-sm text-white/80 leading-relaxed">
                    {challenge.description}
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
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-sm font-bold mr-3">
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

          {/* Applications, Advantages & Sustainability */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-20"
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

            <div
              ref={(el) => {
                sectionRefs.current["sustainability"] = el;
              }}
              data-section="sustainability"
              className={`border border-white/20 rounded-lg p-8 transition-all duration-1000 ease-out delay-400 backdrop-blur-lg bg-black/30 ${
                visibleSections.includes("sustainability")
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-20"
              }`}
            >
              <h2 className="text-xl font-medium tracking-wider mb-6 text-green-300">
                {currentTranslation.sustainability}
              </h2>
              <ul className="space-y-3 text-sm text-white/80">
                {currentTranslation.sustainabilityFeatures.map(
                  (feature, index) => (
                    <li key={index}>• {feature}</li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
