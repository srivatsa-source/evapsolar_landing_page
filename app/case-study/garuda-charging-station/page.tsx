"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useState, useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const translations = {
  en: {
    backButton: "Back to Services",
    title: "GARUDA CHARGING HUB",
    subtitle:
      "Grid-free Autonomous Renewable energy-powered Ultra-fast Direct-charging for Automobiles",

    overview: "OVERVIEW",
    overviewText:
      "EVAP Solar introduces GARUDA, India's first sovereign EV charging network — a plug-and-play, subscription-based charging hub powered by the sun, optimized by AI, and deployable in under 24 hours.",

    noGridDependence: "NO GRID DEPENDENCE",
    noGridFeatures: [
      "No grid connection required",
      "No construction or permits needed",
      "No utility bills",
      "Savings from day one",
      "Functions without utility hookup",
    ],

    portability: "PORTABILITY & PLACEMENT",
    portabilityFeatures: [
      "Can be placed anywhere",
      "Installed within an hour",
      "Relocatable as needed",
      "Park-and-charge solution",
      "Requires no extra space",
    ],

    reliability: "RELIABILITY",
    reliabilityFeatures: [
      "All-weather operation",
      "Power outage ready",
      "Disaster management capable",
      "Self-healing system",
      "Ruggedized for Indian conditions",
    ],

    techSpecs: "TECHNICAL SPECIFICATIONS",
    techSpecsData: [
      { label: "Charging Power:", value: "50-150 kW" },
      { label: "Solar Capacity:", value: "100-300 kWp" },
      { label: "Battery Storage:", value: "200-500 kWh" },
      { label: "Deployment Time:", value: "<24 hours" },
      { label: "Operating Temperature:", value: "-20°C to +60°C" },
      { label: "Grid Independence:", value: "100%" },
    ],

    applications: "APPLICATIONS",
    applicationsList: [
      "Rural and remote area charging",
      "Highway rest stops and toll plazas",
      "Construction sites and temporary locations",
      "Emergency and disaster response",
      "Fleet charging for logistics companies",
      "Events and festivals",
    ],
  },
};

export default function GarudaChargingHubCaseStudy() {
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
      <section
        className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden"
        style={{
          backgroundImage: "url(/garudastation.png)",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Background overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

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

        @keyframes glow {
          from {
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
          }
          to {
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
          }
        }

        /* Responsive background adjustments */
        @media (max-width: 768px) {
          section[style*="garudastation.png"] {
            background-attachment: scroll !important;
            background-position: center center !important;
          }
        }

        @media (max-width: 480px) {
          section[style*="garudastation.png"] {
            background-size: cover !important;
            background-position: center top !important;
          }
        }

        /* Enhanced background overlay animation */
        section[style*="garudastation.png"] .absolute.inset-0 {
          animation: overlayFade 2s ease-in-out;
        }

        @keyframes overlayFade {
          0% {
            background-color: rgba(0, 0, 0, 0.9);
          }
          100% {
            background-color: rgba(0, 0, 0, 0.6);
          }
        }
      `}</style>
      {/* Content Sections */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Overview & Status */}
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
              {/* Overview Image */}
              <div className="mb-6 rounded-lg overflow-hidden">
                <img
                  src="/ev-charging-stations-garuda.jpg"
                  alt="GARUDA Charging Station Overview"
                  className="w-full h-32 object-cover rounded-lg opacity-80 hover:opacity-100 transition-opacity duration-300"
                  loading="lazy"
                />
              </div>
              <h2 className="text-xl font-medium tracking-wider mb-6">
                {currentTranslation.overview}
              </h2>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-green-400/20 text-green-300 text-sm font-mono rounded">
                  TRL 4
                </span>
                <span className="px-3 py-1 bg-blue-400/20 text-blue-300 text-sm font-mono rounded">
                  MVA Development
                </span>
              </div>
              <p className="text-white/80 leading-relaxed text-sm mb-4">
                {currentTranslation.overviewText}
              </p>
              <p className="text-white/80 leading-relaxed text-sm">
                Revolutionary autonomous charging solution with zero grid
                dependency, featuring proprietary GARUDA AI for self-healing
                infrastructure and franchisee-driven growth model.
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
              {/* Technical Specifications Image */}
              <div className="mb-6 rounded-lg overflow-hidden">
                <img
                  src="/solar-module-manufacturing.jpg"
                  alt="Solar Technology Specifications"
                  className="w-full h-32 object-cover rounded-lg opacity-80 hover:opacity-100 transition-opacity duration-300"
                  loading="lazy"
                />
              </div>
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

          {/* Key Features Grid */}
          <div className="mb-16">
            <h2 className="text-2xl font-medium tracking-wider mb-8 text-center">
              KEY FEATURES & BENEFITS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div
                ref={(el) => {
                  sectionRefs.current["features-left"] = el;
                }}
                data-section="features-left"
                className={`border border-white/20 rounded-lg p-6 transition-all duration-1000 ease-out backdrop-blur-lg bg-black/30 ${
                  visibleSections.includes("features-left")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-20"
                }`}
              >
                {/* No Grid Dependence Image */}
                <div className="mb-4 rounded-lg overflow-hidden">
                  <img
                    src="/off-grid-ev-charging.jpg"
                    alt="Off-grid EV Charging"
                    className="w-full h-24 object-cover rounded-lg opacity-80 hover:opacity-100 transition-opacity duration-300"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-lg font-medium text-red-300 mb-4 tracking-wider">
                  NO GRID DEPENDENCE
                </h3>
                <ul className="space-y-2 text-sm text-white/80">
                  <li>• No grid connection required</li>
                  <li>• No construction or permits needed</li>
                  <li>• Zero utility bills</li>
                  <li>• Savings from day one</li>
                  <li>• Functions without utility hookup</li>
                </ul>
              </div>
              <div
                ref={(el) => {
                  sectionRefs.current["features-center"] = el;
                }}
                data-section="features-center"
                className={`border border-white/20 rounded-lg p-6 transition-all duration-1000 ease-out delay-200 backdrop-blur-lg bg-black/30 ${
                  visibleSections.includes("features-center")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-20"
                }`}
              >
                {/* Portability Image */}
                <div className="mb-4 rounded-lg overflow-hidden">
                  <img
                    src="/garudastation.png"
                    alt="Portable Garuda Station"
                    className="w-full h-24 object-cover rounded-lg opacity-80 hover:opacity-100 transition-opacity duration-300"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-lg font-medium text-yellow-300 mb-4 tracking-wider">
                  PORTABILITY & PLACEMENT
                </h3>
                <ul className="space-y-2 text-sm text-white/80">
                  <li>• Can be placed anywhere</li>
                  <li>• Installed within an hour</li>
                  <li>• Relocatable as needed</li>
                  <li>• Park-and-charge solution</li>
                  <li>• Requires no extra space</li>
                </ul>
              </div>
              <div
                ref={(el) => {
                  sectionRefs.current["features-right"] = el;
                }}
                data-section="features-right"
                className={`border border-white/20 rounded-lg p-6 transition-all duration-1000 ease-out delay-400 backdrop-blur-lg bg-black/30 ${
                  visibleSections.includes("features-right")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-20"
                }`}
              >
                {/* Reliability Image */}
                <div className="mb-4 rounded-lg overflow-hidden">
                  <img
                    src="/on-grid-ev-charging.jpg"
                    alt="Reliable EV Charging Infrastructure"
                    className="w-full h-24 object-cover rounded-lg opacity-80 hover:opacity-100 transition-opacity duration-300"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-lg font-medium text-green-300 mb-4 tracking-wider">
                  RELIABILITY
                </h3>
                <ul className="space-y-2 text-sm text-white/80">
                  <li>• All-weather operation</li>
                  <li>• Power outage ready</li>
                  <li>• Disaster management capable</li>
                  <li>• Self-healing system</li>
                  <li>• Ruggedized for Indian conditions</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Innovation & Technology */}
          <div className="mb-16">
            <h2 className="text-2xl font-medium tracking-wider mb-8 text-center">
              INNOVATION & TECHNOLOGY
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div
                ref={(el) => {
                  sectionRefs.current["innovation-left"] = el;
                }}
                data-section="innovation-left"
                className={`border border-white/20 rounded-lg p-8 transition-all duration-1000 ease-out backdrop-blur-lg bg-black/30 ${
                  visibleSections.includes("innovation-left")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-20"
                }`}
              >
                {/* Technological Innovation Image */}
                <div className="mb-6 rounded-lg overflow-hidden">
                  <img
                    src="/tandem-solar-cells-lab-scale.jpg"
                    alt="Solar Technology Innovation"
                    className="w-full h-32 object-cover rounded-lg opacity-80 hover:opacity-100 transition-opacity duration-300"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-lg font-medium text-blue-300 mb-6 tracking-wider">
                  TECHNOLOGICAL INNOVATION
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-white mb-2">
                      Integrated Design:
                    </h4>
                    <p className="text-sm text-white/80 leading-relaxed">
                      Combines pre-certified components like Waaree Solar and
                      LiFePO4 Batteries into a unique, ruggedized, and portable
                      form factor optimized for Indian conditions.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white mb-2">
                      Intelligent Software:
                    </h4>
                    <p className="text-sm text-white/80 leading-relaxed">
                      Proprietary AI algorithm optimizes energy use between
                      solar, battery, and future grid connection to ensure
                      lowest cost per charge.
                    </p>
                  </div>
                </div>
              </div>

              <div
                ref={(el) => {
                  sectionRefs.current["innovation-right"] = el;
                }}
                data-section="innovation-right"
                className={`border border-white/20 rounded-lg p-8 transition-all duration-1000 ease-out delay-200 backdrop-blur-lg bg-black/30 ${
                  visibleSections.includes("innovation-right")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-20"
                }`}
              >
                {/* AI Capabilities Image */}
                <div className="mb-6 rounded-lg overflow-hidden">
                  <img
                    src="/solid-state-battery.png"
                    alt="Advanced Battery Technology"
                    className="w-full h-32 object-cover rounded-lg opacity-80 hover:opacity-100 transition-opacity duration-300"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-lg font-medium text-purple-300 mb-6 tracking-wider">
                  GARUDA AI CAPABILITIES
                </h3>
                <p className="text-sm text-white/80 mb-4">
                  The "GARUDA" AI transforms the charger into a self-healing and
                  self-optimizing asset that maximizes uptime and revenue while
                  minimizing costs:
                </p>
                <ul className="space-y-2 text-sm text-white/80">
                  <li>• Predictive Energy Forecasting & Maintenance</li>
                  <li>• Autonomous Load Balancing</li>
                  <li>• Dynamic Pricing & Demand Management</li>
                  <li>• Self-healing and self-optimizing capabilities</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Business Model Innovation */}
          <div className="mb-16">
            <h2 className="text-2xl font-medium tracking-wider mb-8 text-center">
              BUSINESS MODEL INNOVATION (1ST IN INDIA)
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div
                ref={(el) => {
                  sectionRefs.current["business-left"] = el;
                }}
                data-section="business-left"
                className={`border border-white/20 rounded-lg p-8 transition-all duration-1000 ease-out backdrop-blur-lg bg-black/30 ${
                  visibleSections.includes("business-left")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-20"
                }`}
              >
                {/* Energy-as-a-Service Image */}
                <div className="mb-6 rounded-lg overflow-hidden">
                  <img
                    src="/rooftop-solar.jpg"
                    alt="Energy-as-a-Service Model"
                    className="w-full h-32 object-cover rounded-lg opacity-80 hover:opacity-100 transition-opacity duration-300"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-lg font-medium text-orange-300 mb-6 tracking-wider">
                  ENERGY-AS-A-SERVICE (EaaS)
                </h3>
                <ul className="space-y-3 text-sm text-white/80">
                  <li>• EVAP Solar owns and maintains assets</li>
                  <li>• Monthly subscription model available</li>
                  <li>• Per-use fee options</li>
                  <li>• No upfront investment for customers</li>
                </ul>
              </div>
              <div
                ref={(el) => {
                  sectionRefs.current["business-right"] = el;
                }}
                data-section="business-right"
                className={`border border-white/20 rounded-lg p-8 transition-all duration-1000 ease-out delay-200 backdrop-blur-lg bg-black/30 ${
                  visibleSections.includes("business-right")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-20"
                }`}
              >
                {/* Franchisee Growth Image */}
                <div className="mb-6 rounded-lg overflow-hidden">
                  <img
                    src="/ground-mounted-solar.jpg"
                    alt="Franchisee Network Growth"
                    className="w-full h-32 object-cover rounded-lg opacity-80 hover:opacity-100 transition-opacity duration-300"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-lg font-medium text-cyan-300 mb-6 tracking-wider">
                  FRANCHISEE-DRIVEN GROWTH
                </h3>
                <ul className="space-y-3 text-sm text-white/80">
                  <li>
                    • Local entrepreneurs can own and operate GARUDA units
                  </li>
                  <li>• Distributed network model</li>
                  <li>• Scalable business framework</li>
                  <li>• Creates employment opportunities</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Competitive Advantage */}
          <div className="mb-16">
            <h2 className="text-2xl font-medium tracking-wider mb-8 text-center">
              COMPETITIVE ADVANTAGE
            </h2>
            <div
              ref={(el) => {
                sectionRefs.current["competitive-table"] = el;
              }}
              data-section="competitive-table"
              className={`border border-white/20 rounded-lg p-8 overflow-x-auto transition-all duration-1000 ease-out backdrop-blur-lg bg-black/30 ${
                visibleSections.includes("competitive-table")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-20"
              }`}
            >
              <table className="w-full text-sm font-mono">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left text-white/60 py-3 px-4 border-r border-white/20">
                      Feature
                    </th>
                    <th className="text-left text-green-300 py-3 px-4 font-semibold border-r border-white/20">
                      Our Solution (GARUDA)
                    </th>
                    <th className="text-left text-white/60 py-3 px-4 border-r border-white/20">
                      Grid-Tied Chargers (Tata Power, Zoomcar etc.)
                    </th>
                    <th className="text-left text-white/60 py-3 px-4">
                      Diesel Generators
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="py-3 px-4 text-white/70 border-r border-white/20">
                      Energy Source Cost/kWh
                    </td>
                    <td className="py-3 px-4 text-green-300 border-r border-white/20">
                      100% solar + storage, ₹6-10
                    </td>
                    <td className="py-3 px-4 text-white/60 border-r border-white/20">
                      30-50% solar (rest from grid), ₹12-15 (grid + solar)
                    </td>
                    <td className="py-3 px-4 text-white/60">
                      100% diesel, ₹18-22
                    </td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3 px-4 text-white/70 border-r border-white/20">
                      Portability
                    </td>
                    <td className="py-3 px-4 text-green-300 border-r border-white/20">
                      Skid-mounted; can be relocated in &lt;4 hours
                    </td>
                    <td className="py-3 px-4 text-white/60 border-r border-white/20">
                      Fixed infrastructure
                    </td>
                    <td className="py-3 px-4 text-white/60">
                      Mobile but noisy/polluting
                    </td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-3 px-4 text-white/70 border-r border-white/20">
                      Smart Features
                    </td>
                    <td className="py-3 px-4 text-green-300 border-r border-white/20">
                      AI + IoT + V2G-ready
                    </td>
                    <td className="py-3 px-4 text-white/60 border-r border-white/20">
                      Basic timer scheduling
                    </td>
                    <td className="py-3 px-4 text-white/60">None</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-white/70 border-r border-white/20">
                      User Base
                    </td>
                    <td className="py-3 px-4 text-green-300 border-r border-white/20">
                      Rural/urban, fleets, businesses, disaster management,
                      emergencies
                    </td>
                    <td className="py-3 px-4 text-white/60 border-r border-white/20">
                      Urban EV owners
                    </td>
                    <td className="py-3 px-4 text-white/60">
                      Rural & Urban EV owners
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Applications */}
          <div>
            <h2 className="text-2xl font-medium tracking-wider mb-8 text-center">
              {currentTranslation.applications}
            </h2>
            <div className="border border-white/20 rounded-lg p-8 backdrop-blur-lg bg-black/30">
              {/* Applications Header Image */}
              <div className="mb-8 rounded-lg overflow-hidden">
                <img
                  src="/tin-shed-solar.jpg"
                  alt="GARUDA Applications in Various Settings"
                  className="w-full h-40 object-cover rounded-lg opacity-80 hover:opacity-100 transition-opacity duration-300"
                  loading="lazy"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentTranslation.applicationsList.map(
                  (application, index) => (
                    <div
                      key={index}
                      className="flex items-start p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300"
                    >
                      <span className="text-green-400 mr-3 font-bold">•</span>
                      <span className="text-white/80 text-sm">
                        {application}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
