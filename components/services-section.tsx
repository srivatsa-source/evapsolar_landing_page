"use client";

import { useEffect, useState, useCallback } from "react";
import {
  ScrollReveal,
  FloatingElement,
} from "@/components/ui/floating-elements";
import { useRouter } from "next/navigation";

export function ServicesSection() {
  const router = useRouter();
  const [currentLang, setCurrentLang] = useState("en");
  const [activePanel, setActivePanel] = useState<
    "EPC" | "OEM" | "R & D" | null
  >(null);
  const [clickedIdx, setClickedIdx] = useState<number | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [activatedPanel, setActivatedPanel] = useState<string | null>(null);
  const [visitedPages, setVisitedPages] = useState<Set<string>>(new Set());

  // Utility function to clear visited pages (for debugging)
  const clearVisitedPages = useCallback(() => {
    setVisitedPages(new Set());
    sessionStorage.removeItem("visitedPages");
  }, []);

  useEffect(() => {
    const savedLang = localStorage.getItem("language") || "en";
    setCurrentLang(savedLang);

    // Load visited pages from sessionStorage (resets when tab/browser closes)
    const savedVisitedPages = sessionStorage.getItem("visitedPages");
    if (savedVisitedPages) {
      try {
        setVisitedPages(new Set(JSON.parse(savedVisitedPages)));
      } catch (error) {
        console.error("Error parsing visited pages:", error);
        setVisitedPages(new Set());
      }
    }

    // Restore active panel state when returning to home page to maintain sub-options
    const savedActivePanel = sessionStorage.getItem("activePanel");
    if (
      savedActivePanel &&
      (savedActivePanel === "EPC" ||
        savedActivePanel === "OEM" ||
        savedActivePanel === "R & D")
    ) {
      try {
        setActivePanel(savedActivePanel as "EPC" | "OEM" | "R & D");
      } catch (error) {
        console.error("Error restoring active panel:", error);
        sessionStorage.removeItem("activePanel");
      }
    }

    // Restore scroll position when returning to home page
    const restoreScrollPosition = () => {
      const savedScrollPosition = sessionStorage.getItem("homeScrollPosition");
      if (savedScrollPosition) {
        const scrollY = parseInt(savedScrollPosition, 10);
        // Small delay to ensure page is fully loaded
        setTimeout(() => {
          window.scrollTo({ top: scrollY, behavior: "smooth" });
        }, 100);
      }
    };

    // Check if we're returning from a navigation (detect back button or direct return)
    const hasNavigationHistory = sessionStorage.getItem("homeScrollPosition");
    if (hasNavigationHistory && window.history.length > 1) {
      restoreScrollPosition();
    }

    const handleLanguageChange = (event: CustomEvent) => {
      setCurrentLang((event as any).detail.language);
    };
    window.addEventListener(
      "languageChange",
      handleLanguageChange as EventListener
    );

    const handleOpenPanel = (e: Event) => {
      const detail = (e as CustomEvent).detail as {
        panel?: "EPC" | "OEM" | "R & D";
      };
      if (detail?.panel) {
        setActivePanel(detail.panel);
        // Save active panel state in sessionStorage to maintain sub-options
        sessionStorage.setItem("activePanel", detail.panel);
        // bring services into view first
        const servicesEl = document.getElementById("services");
        if (servicesEl)
          servicesEl.scrollIntoView({ behavior: "smooth", block: "start" });
        // then focus the panel a bit later
        setTimeout(() => {
          const id =
            detail.panel === "R & D"
              ? "panel-r&d"
              : detail.panel === "OEM"
              ? "panel-oem"
              : "panel-epc";
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 300);
      }
    };
    window.addEventListener(
      "openServicePanel",
      handleOpenPanel as EventListener
    );

    // Handle page visibility to clear scroll position when user leaves entirely
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        // Only clear if we're not navigating within the same app
        const isInternalNavigation =
          sessionStorage.getItem("internalNavigation");
        if (!isInternalNavigation) {
          sessionStorage.removeItem("homeScrollPosition");
          sessionStorage.removeItem("activePanel");
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener(
        "languageChange",
        handleLanguageChange as EventListener
      );
      window.removeEventListener(
        "openServicePanel",
        handleOpenPanel as EventListener
      );
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Separate useEffect for global function assignment
  useEffect(() => {
    // Make clearVisitedPages available globally for debugging
    if (typeof window !== "undefined") {
      (window as any).clearVisitedPages = clearVisitedPages;
    }

    return () => {
      // Clean up global function
      if (typeof window !== "undefined") {
        delete (window as any).clearVisitedPages;
      }
    };
  }, [clearVisitedPages]);

  const epcTranslations = {
    en: {
      title: "EPC",
      featuresTitle: "FEATURES",
      features: [
        "No Grid Connection • No Construction • Deploy in <24 hrs",
        "AI-Optimized Solar Microgrids",
        "Predictive Energy Forecasting",
        "Autonomous Load Balancing",
        "Dynamic Pricing & Demand Management",
        "Predictive Maintenance",
      ],
      applicationsTitle: "ENERGY STORAGE APPLICATIONS",
      applications: [
        {
          title: "Utility & Grid Support",
          description:
            "Balance supply and demand while integrating renewables.",
        },
        {
          title: "Residential Energy",
          description: "Reliable backup and smart home energy management.",
        },
        {
          title: "Business & Industry",
          description:
            "Reduce downtime, cut costs, and meet sustainability goals.",
        },
        {
          title: "Critical Infrastructure",
          description:
            "Non-flammable chemistry for hospitals, telecom, and emergency services.",
        },
      ],
      garudaSubtitle: "GARUDA – INDIA'S FIRST GRID-FREE EV NETWORK",
    },
    hi: {
      title: "EPC",
      featuresTitle: "विशेषताएं",
      features: [
        "कोई ग्रिड कनेक्शन नहीं • कोई निर्माण नहीं • 24 घंटे में तैनाती",
        "एआई-अनुकूलित सौर माइक्रोग्रिड",
        "भविष्यसूचक ऊर्जा पूर्वानुमान",
        "स्वायत्त लोड संतुलन",
        "गतिशील मूल्य निर्धारण और मांग प्रबंधन",
        "भविष्यसूचक रखरखाव",
      ],
      applicationsTitle: "ऊर्जा भंडारण अनुप्रयोग",
      applications: [
        {
          title: "उपयोगिता और ग्रिड समर्थन",
          description:
            "नवीकरणीय ऊर्जा को एकीकृत करते हुए आपूर्ति और मांग को संतुलित करें।",
        },
        {
          title: "आवासीय ऊर्जा",
          description: "विश्वसनीय बैकअप और स्मार्ट होम ऊर्जा प्रबंधन।",
        },
        {
          title: "व्यवसाय और उद्योग",
          description:
            "डाउनटाइम कम करें, लागत घटाएं, और स्थिरता लक्ष्यों को पूरा करें।",
        },
        {
          title: "महत्वपूर्ण अवसंरचना",
          description:
            "अस्पतालों, दूरसंचार और आपातकालीन सेवाओं के लिए गैर-ज्वलनशील रसायन।",
        },
      ],
      garudaSubtitle: "गरुड़ – भारत का पहला ग्रिड-मुक्त ईवी नेटवर्क",
    },
    kn: {
      title: "EPC",
      featuresTitle: "ವೈಶಿಷ್ಟ್ಯಗಳು",
      features: [
        "ಗ್ರಿಡ್ ಸಂಪರ್ಕವಿಲ್ಲ • ನಿರ್ಮಾಣವಿಲ್ಲ • 24 ಗಂಟೆಗಳಲ್ಲಿ ನಿಯೋಜನೆ",
        "ಎಐ-ಅನುಕೂಲಿತ ಸೌರ ಮೈಕ್ರೋಗ್ರಿಡ್‌ಗಳು",
        "ಭವಿಷ್ಯಸೂಚಕ ಶಕ್ತಿ ಮುನ್ನೋಟ",
        "ಸ್ವಾಯತ್ತ ಲೋಡ್ ಸಮತೋಲನ",
        "ಡೈನಾಮಿಕ್ ಬೆಲೆ ಮತ್ತು ಬೇಡಿಕೆ ನಿರ್ವಹಣೆ",
        "ಭವಿಷ್ಯಸೂಚಕ ನಿರ್ವಹಣೆ",
      ],
      applicationsTitle: "ಶಕ್ತಿ ಸಂಗ್ರಹ ಅಪ್ಲಿಕೇಶನ್‌ಗಳು",
      applications: [
        {
          title: "ಉಪಯುಕ್ತತೆ ಮತ್ತು ಗ್ರಿಡ್ ಬೆಂಬಲ",
          description:
            "ನವೀಕರಿಸಬಹುದಾದ ಶಕ್ತಿಯನ್ನು ಸಂಯೋಜಿಸುವಾಗ ಪೂರೈಕೆ ಮತ್ತು ಬೇಡಿಕೆಯನ್ನು ಸಮತೋಲನಗೊಳಿಸಿ。",
        },
        {
          title: "ವಸತಿ ಶಕ್ತಿ",
          description:
            "ವಿಶ್ವಾಸಾರ್ಹ ಬ್ಯಾಕಪ್ ಮತ್ತು ಸ್ಮಾರ್ಟ್ ಹೋಮ್ ಶಕ್ತಿ ನಿರ್ವಹಣೆ。",
        },
        {
          title: "ವ್ಯಾಪಾರ ಮತ್ತು ಉದ್ಯಮ",
          description:
            "ಡೌನ್‌ಟೈಮ್ ಕಡಿಮೆ ಮಾಡಿ, ವೆಚ್ಚಗಳನ್ನು ಕಡಿತಗೊಳಿಸಿ ಮತ್ತು ಸಮರ್ಥನೀಯತೆ ಗುರಿಗಳನ್ನು ಪೂರೈಸಿ。",
        },
        {
          title: "ನಿರ್ಣಾಯಕ ಮೂಲಸೌಕರ್ಯ",
          description:
            "ಆಸ್ಪತ್ರೆಗಳು, ದೂರಸಂಪರ್ಕ ಮತ್ತು ತುರ್ತು ಸೇವೆಗಳಿಗೆ ದಹಿಸದ ರಸಾಯನಶಾಸ್ತ್ರ。",
        },
      ],
      garudaSubtitle: "ಗರುಡ – ಭಾರತದ ಮೊದಲ ಗ್ರಿಡ್-ಮುಕ್ತ ಇವಿ ನೆಟ್‌ವರ್ಕ್",
    },
  } as const;

  const rndTranslations = {
    en: {
      title: "R & D — PEROVSKITE TECHNOLOGY",
      description:
        "Our advanced perovskite solar cells utilize CH₃NH₃PbI₃ crystal structures for superior light absorption and energy conversion efficiency.",
      specs: {
        "Nominal Voltage": "24 VDC",
        Capacity: "6.35 Ah",
        Efficiency: "90%",
        "Operating Temp": "+10 °C to +30 °C",
        "Energy Density": "100 Wh/L",
      },
    },
    hi: {
      title: "आर & डी — पेरोवस्काइट तकनीक",
      description:
        "हमारी उन्नत पेरोवस्काइट सौर कोशिकाएं बेहतर प्रकाश अवशोषण और ऊर्जा रूपांतरण दक्षता के लिए CH₃NH₃PbI₃ क्रिस्टल संरचनाओं का उपयोग करती हैं।",
      specs: {
        "नाममात्र वोल्टेज": "24 VDC",
        क्षमता: "6.35 Ah",
        दक्षता: "90%",
        "ऑपरेटिंग तापमान": "+10 °C से +30 °C",
        "ऊर्जा घनत्व": "100 Wh/L",
      },
    },
    kn: {
      title: "ಆರ್ & ಡಿ — ಪೆರೋವ್‌ಸ್ಕೈಟ್ ತಂತ್ರಜ್ಞಾನ",
      description:
        "ನಮ್ಮ ಸುಧಾರಿತ ಪೆರೋವ್‌ಸ್ಕೈಟ್ ಸೌರ ಕೋಶಗಳು ಉತ್ತಮ ಬೆಳಕಿನ ಹೀರಿಕೊಳ್ಳುವಿಕೆ ಮತ್ತು ಶಕ್ತಿ ಪರಿವರ್ತನೆ ದಕ್ಷತೆಗಾಗಿ CH₃NH₃PbI₃ ಸ್ಫಟಿಕ ರಚನೆಗಳನ್ನು ಬಳಸುತ್ತವೆ。",
      specs: {
        "ನಾಮಮಾತ್ರ ವೋಲ್ಟೇಜ್": "24 VDC",
        ಸಾಮರ್ಥ್ಯ: "6.35 Ah",
        ದಕ್ಷತೆ: "90%",
        "ಕಾರ್ಯಾಚರಣೆ ತಾಪಮಾನ": "+10 °C ರಿಂದ +30 °C",
        "ಶಕ್ತಿ ಸಾಂದ್ರತೆ": "100 Wh/L",
      },
    },
  } as const;

  const epcCopy =
    epcTranslations[currentLang as keyof typeof epcTranslations] ||
    epcTranslations.en;
  const rndCopy =
    rndTranslations[currentLang as keyof typeof rndTranslations] ||
    rndTranslations.en;

  const cards = [
    {
      title: "EPC",
      subtitle: "Engineering • Procurement • Construction",
      image: "/rooftop-solar.jpg",
    },
    {
      title: "OEM",
      subtitle: "Original Equipment Manufacturing",
      image: "/solar-module-manufacturing.jpg",
    },
    {
      title: "R & D",
      subtitle: "Research and Development",
      image: "/tandem-solar-cells-lab-scale.jpg",
    },
  ];

  const togglePanel = (panel: "EPC" | "OEM" | "R & D", idx?: number) => {
    if (typeof idx === "number") {
      setClickedIdx(idx);
      setTimeout(() => setClickedIdx(null), 260);
    }

    const isOpening = activePanel !== panel;

    if (isOpening) {
      // Add activation animation for the card
      setActivatedPanel(panel);
      setTimeout(() => setActivatedPanel(null), 400);
    }

    const newActivePanel = activePanel === panel ? null : panel;
    setActivePanel(newActivePanel);

    // Save or clear active panel state in sessionStorage to maintain sub-options
    if (newActivePanel) {
      sessionStorage.setItem("activePanel", newActivePanel);
    } else {
      sessionStorage.removeItem("activePanel");
    }

    if (isOpening) {
      setTimeout(() => {
        const el = document.getElementById(
          `panel-${panel.replace(/\s+/g, "").toLowerCase()}`
        );
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 30);
    }
  };

  const handleNavigation = (path: string) => {
    // Save current scroll position before navigating
    const currentScrollY = window.scrollY;
    sessionStorage.setItem("homeScrollPosition", currentScrollY.toString());

    // Save active panel state before navigating to preserve sub-options
    if (activePanel) {
      sessionStorage.setItem("activePanel", activePanel);
    }

    // Check if page has been visited before
    const hasVisited = visitedPages.has(path);

    if (!hasVisited) {
      // Mark page as visited immediately
      const updatedVisited = new Set(visitedPages);
      updatedVisited.add(path);
      setVisitedPages(updatedVisited);
      sessionStorage.setItem(
        "visitedPages",
        JSON.stringify(Array.from(updatedVisited))
      );

      // Show brief loading animation only for first visit
      setIsNavigating(true);

      // Reset loading state quickly
      setTimeout(() => {
        setIsNavigating(false);
      }, 200);
    }

    // Mark as internal navigation to preserve scroll position
    sessionStorage.setItem("internalNavigation", "true");

    // Navigate to the page immediately for better perceived performance
    router.push(path);

    // Clear the flag after navigation
    setTimeout(() => {
      sessionStorage.removeItem("internalNavigation");
    }, 1000);
  };

  const handleSolarTypeClick = (type: "rooftop" | "ground" | "tinshed") => {
    const routeMap = {
      rooftop: "/case-study/rooftop-solar",
      ground: "/case-study/ground-mounted-solar",
      tinshed: "/case-study/tin-shed-solar",
    };

    handleNavigation(routeMap[type]);
  };

  const handleOEMProductClick = (
    product: "modules" | "chargers" | "batteries"
  ) => {
    const productMap = {
      modules: "/case-study/ai-microgrid",
      chargers: "/case-study/ev-charging-station",
      batteries: "/case-study/zinc-cells",
    };

    handleNavigation(productMap[product]);
  };

  const handleRnDClick = (section: "solar-cells" | "zinc-batteries") => {
    if (section === "solar-cells") {
      // Navigate to solar cells research page
      handleNavigation("/case-study/solar-cells");
    } else if (section === "zinc-batteries") {
      // Navigate to zinc-ion batteries research page
      handleNavigation("/case-study/zinc-batteries");
    }
  };

  return (
    <section
      id="services"
      className="min-h-screen flex items-center py-24 md:py-32 relative bg-black overflow-hidden"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-transparent to-green-900/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-blue-500/2 to-transparent" />

      {/* Enhanced Floating Elements */}
      <FloatingElement
        delay={0.6}
        amplitude={12}
        className="absolute top-24 right-10 opacity-10"
      >
        <div className="w-1 h-1 bg-white rounded-full" />
      </FloatingElement>
      <FloatingElement
        delay={1.2}
        amplitude={8}
        className="absolute top-1/3 left-8 opacity-5"
      >
        <div className="w-2 h-2 bg-blue-400 rounded-full" />
      </FloatingElement>
      <FloatingElement
        delay={0.8}
        amplitude={15}
        className="absolute bottom-1/4 right-1/4 opacity-5"
      >
        <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
      </FloatingElement>

      {/* Subtle Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <ScrollReveal delay={0.2}>
          <h2 className="text-3xl md:text-5xl font-mono text-white mb-6 tracking-wider text-center">
            SERVICES
          </h2>
          <div className="geometric-line w-24 md:w-32 mb-12 md:mb-16 lg:mb-20 mx-auto" />
        </ScrollReveal>

        <ScrollReveal delay={0.35}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 mb-12 md:mb-16 lg:mb-20">
            {cards.map((c, idx) => (
              <button
                key={idx}
                id={`service-card-${c.title.replace(/\s+/g, "").toLowerCase()}`}
                type="button"
                onClick={() =>
                  togglePanel(c.title as "EPC" | "OEM" | "R & D", idx)
                }
                aria-expanded={activePanel === c.title}
                aria-controls={`panel-${c.title
                  .replace(/\s+/g, "")
                  .toLowerCase()}`}
                aria-label={`Open details for ${c.title}`}
                className={`relative w-full min-w-0 rounded-2xl md:rounded-3xl overflow-hidden border border-white/20 shadow-xl transition-all duration-500 group text-left hover:-translate-y-1 focus-visible:-translate-y-1 focus:outline-none
                  aspect-[4/3] sm:aspect-[4/3] md:aspect-[4/3] min-h-[18rem] sm:min-h-[20rem] lg:min-h-[28rem]
                  ${clickedIdx === idx ? "card-pop" : ""}
                  ${
                    activatedPanel === c.title ? "card-activate pulse-ring" : ""
                  }
                  ${
                    activePanel === c.title
                      ? "ring-2 ring-white/40 active-panel"
                      : "ring-0"
                  }`}
              >
                <img
                  src={c.image || "/placeholder.jpg"}
                  alt={`${c.title} service`}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                  width={1200}
                  height={800}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  onError={(e: any) => {
                    const t = e.currentTarget as HTMLImageElement;
                    if (!t.src.includes("/placeholder.jpg"))
                      t.src = "/placeholder.jpg";
                  }}
                />

                {/* Enhanced Overlay Effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Animated Border Effect */}
                <div
                  className="absolute inset-0 rounded-2xl md:rounded-3xl border-2 border-transparent bg-gradient-to-r from-blue-400/20 via-white/10 to-green-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(255, 255, 255, 0.1), rgba(34, 197, 94, 0.2))",
                    padding: "2px",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "exclude",
                  }}
                />

                {/* Tap/click helper text - visible on mobile, appears on hover for md+ */}
                <div className="pointer-events-none absolute inset-0 flex items-start justify-center pt-3">
                  <span className="inline-flex items-center rounded-full bg-black/60 text-white/90 border border-white/25 px-2 py-1 font-mono text-[10px] md:text-xs tracking-wide md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                    Tap image for details
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-black/60 backdrop-blur-sm border border-white/20 rounded-lg p-6">
                    <p className="text-white font-mono text-2xl md:text-3xl lg:text-4xl font-light tracking-wide mb-2">
                      {c.title}
                    </p>
                    <p className="text-white/80 font-mono text-sm md:text-base tracking-wide leading-relaxed">
                      {c.subtitle}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.45}>
          {activePanel === "EPC" && (
            <div
              id="panel-epc"
              className="epc-panel-drag-expand border border-white/20 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 backdrop-blur-sm bg-white/5 mb-8 md:mb-10 lg:mb-12 shadow-2xl relative overflow-hidden"
              style={{
                transformOrigin: "center top",
                animationDelay: "0.1s",
              }}
            >
              {/* Enhanced animated background particles */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="particle-drift absolute top-16 right-16 w-1 h-1 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50"></div>
                <div className="particle-drift absolute bottom-16 left-16 w-1.5 h-1.5 bg-red-400 rounded-full shadow-lg shadow-red-400/50"></div>
                <div className="particle-drift absolute bottom-8 right-8 w-1 h-1 bg-amber-400 rounded-full shadow-lg shadow-amber-400/50"></div>
                <div className="particle-drift absolute top-1/2 left-1/4 w-1 h-1 bg-white/15 rounded-full animate-pulse"></div>
              </div>

              {/* Connection line showing drag effect */}
              <div className="epc-connection-line absolute -top-8 left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-white/30 to-transparent rounded-full"></div>

              <h3
                className="content-cascade text-lg md:text-xl font-mono text-white tracking-wider mb-4 md:mb-6 relative z-10"
                style={{ animationDelay: "0.1s" }}
              >
                EPC
              </h3>

              <div className="mb-6 md:mb-8 lg:mb-10">
                <h4
                  className="content-cascade text-base md:text-lg font-mono text-white tracking-wider mb-3 md:mb-4 relative z-10"
                  style={{ animationDelay: "0.15s" }}
                >
                  Solar Types
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  <div
                    className="epc-card-emerge epc-card-hover epc-card border border-white/15 rounded-lg overflow-hidden cursor-pointer hover:border-white/30 hover:shadow-lg transition-all duration-500 group transform hover:-translate-y-2 hover:scale-105"
                    style={{ animationDelay: "0.3s" }}
                    onClick={() => handleSolarTypeClick("rooftop")}
                    onMouseEnter={() =>
                      router.prefetch("/case-study/rooftop-solar")
                    }
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleSolarTypeClick("rooftop");
                      }
                    }}
                    aria-label="Learn more about rooftop solar installations"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src="/rooftop-solar.jpg"
                        alt="Rooftop solar installation"
                        className="w-full h-40 object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700 group-hover:brightness-110"
                        loading="lazy"
                        decoding="async"
                        width={640}
                        height={160}
                        onError={(e) => {
                          const t = e.currentTarget as HTMLImageElement;
                          t.src = "/placeholder.jpg";
                        }}
                      />
                      {/* Animated Energy Lines */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute top-4 left-4 w-8 h-0.5 bg-gradient-to-r from-blue-400 to-transparent animate-pulse"></div>
                        <div className="absolute top-8 left-4 w-6 h-0.5 bg-gradient-to-r from-green-400 to-transparent animate-pulse delay-300"></div>
                        <div className="absolute bottom-4 right-4 w-8 h-0.5 bg-gradient-to-l from-blue-400 to-transparent animate-pulse delay-700"></div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h5 className="text-sm font-mono text-white mb-2 group-hover:text-blue-300 transition-colors">
                        Rooftop
                      </h5>
                      <p className="text-xs font-mono text-white/70 leading-relaxed">
                        High-efficiency rooftop PV systems optimized for limited
                        area, lightweight mounting, and minimal roof
                        penetration.
                      </p>
                      <p className="text-xs font-mono text-blue-400/80 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        Click for more details →
                      </p>
                    </div>
                  </div>

                  <div
                    className="epc-card-emerge epc-card-hover epc-card border border-white/15 rounded-lg overflow-hidden cursor-pointer hover:border-white/30 hover:shadow-lg transition-all duration-500 group transform hover:-translate-y-2 hover:scale-105"
                    style={{ animationDelay: "0.5s" }}
                    onClick={() => handleSolarTypeClick("ground")}
                    onMouseEnter={() =>
                      router.prefetch("/case-study/ground-mounted-solar")
                    }
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleSolarTypeClick("ground");
                      }
                    }}
                    aria-label="Learn more about ground mounted solar installations"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src="/ground-mounted-solar.jpg"
                        alt="Ground mounted solar"
                        className="w-full h-40 object-cover group-hover:scale-110 group-hover:-rotate-1 transition-all duration-700 group-hover:brightness-110"
                        loading="lazy"
                        decoding="async"
                        width={640}
                        height={160}
                        onError={(e) => {
                          const t = e.currentTarget as HTMLImageElement;
                          t.src = "/placeholder.jpg";
                        }}
                      />
                      {/* Animated Energy Lines */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute top-4 right-4 w-10 h-0.5 bg-gradient-to-l from-yellow-400 to-transparent animate-pulse"></div>
                        <div className="absolute top-8 right-4 w-7 h-0.5 bg-gradient-to-l from-orange-400 to-transparent animate-pulse delay-200"></div>
                        <div className="absolute bottom-4 left-4 w-9 h-0.5 bg-gradient-to-r from-green-400 to-transparent animate-pulse delay-500"></div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h5 className="text-sm font-mono text-white mb-2 group-hover:text-blue-300 transition-colors">
                        Ground Mounted
                      </h5>
                      <p className="text-xs font-mono text-white/70 leading-relaxed">
                        Utility-scale or campus deployments with optimized tilt,
                        row spacing, and cable runs for cost-effective power.
                      </p>
                      <p className="text-xs font-mono text-blue-400/80 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        Click for more details →
                      </p>
                    </div>
                  </div>

                  <div
                    className="epc-card-emerge epc-card-hover epc-card border border-white/15 rounded-lg overflow-hidden cursor-pointer hover:border-white/30 hover:shadow-lg transition-all duration-500 group transform hover:-translate-y-2 hover:scale-105"
                    style={{ animationDelay: "0.7s" }}
                    onClick={() => handleSolarTypeClick("tinshed")}
                    onMouseEnter={() =>
                      router.prefetch("/case-study/tin-shed-solar")
                    }
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleSolarTypeClick("tinshed");
                      }
                    }}
                    aria-label="Learn more about tin shed solar installations"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src="/tin-shed-solar.jpg"
                        alt="Tin shed solar installation"
                        className="w-full h-40 object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700 group-hover:brightness-110"
                        loading="lazy"
                        decoding="async"
                        width={640}
                        height={160}
                        onError={(e) => {
                          const t = e.currentTarget as HTMLImageElement;
                          t.src = "/placeholder.jpg";
                        }}
                      />
                      {/* Animated Energy Lines */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute top-4 left-4 w-7 h-0.5 bg-gradient-to-r from-purple-400 to-transparent animate-pulse"></div>
                        <div className="absolute bottom-8 right-4 w-8 h-0.5 bg-gradient-to-l from-cyan-400 to-transparent animate-pulse delay-400"></div>
                        <div className="absolute bottom-4 left-8 w-6 h-0.5 bg-gradient-to-r from-pink-400 to-transparent animate-pulse delay-600"></div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h5 className="text-sm font-mono text-white mb-2 group-hover:text-blue-300 transition-colors">
                        Tin Shed
                      </h5>
                      <p className="text-xs font-mono text-white/70 leading-relaxed">
                        Customized structures for industrial tin sheds ensuring
                        wind-load safety, drainage, and long-term performance.
                      </p>
                      <p className="text-xs font-mono text-blue-400/80 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        Click for more details →
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-mono text-white tracking-wider mb-4 flex items-center gap-3">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse hidden"></span>
                  GARUDA CHARGING HUB
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-1000 hidden"></span>
                </h4>
                <div
                  className={`epc-card-emerge epc-card-hover border-2 border-white/15 rounded-xl overflow-hidden cursor-pointer transition-all duration-500 group relative transform hover:-translate-y-2 hover:scale-105 ${
                    isNavigating ? "opacity-50 pointer-events-none" : ""
                  }`}
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(0,0,0,0.8), rgba(0,0,0,0.9))",
                    backdropFilter: "blur(10px)",
                    animationDelay: "0.9s",
                  }}
                  onClick={() =>
                    handleNavigation("/case-study/garuda-charging-station")
                  }
                  onMouseEnter={() =>
                    router.prefetch("/case-study/garuda-charging-station")
                  }
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleNavigation("/case-study/garuda-charging-station");
                    }
                  }}
                  aria-label="View Garuda EV charging network details"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src="/ev-charging-stations-garuda.jpg"
                      alt=" GARUDA Charging Hub - Grid-free Autonomous Renewable energy-powered Ultra-fast Direct-charging"
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                      decoding="async"
                      width={1200}
                      height={256}
                      onError={(e) => {
                        const t = e.currentTarget as HTMLImageElement;
                        if (!t.src.includes("/placeholder.jpg"))
                          t.src = "/placeholder.jpg";
                      }}
                    />

                    {/* Enhanced Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                    {/* Animated Energy Lines */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-4 left-4 w-12 h-0.5 bg-gradient-to-r from-blue-400 to-transparent animate-pulse"></div>
                      <div className="absolute top-8 left-4 w-8 h-0.5 bg-gradient-to-r from-green-400 to-transparent animate-pulse delay-300"></div>
                      <div className="absolute bottom-4 right-4 w-12 h-0.5 bg-gradient-to-l from-blue-400 to-transparent animate-pulse delay-700"></div>
                    </div>
                  </div>

                  {/* Click indicator */}
                  <div className="pointer-events-none absolute top-4 right-4">
                    {isNavigating ? (
                      <span className="inline-flex items-center rounded-full bg-blue-600/80 text-white border border-blue-400/50 px-3 py-1 font-mono text-xs tracking-wide">
                        Loading...
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-black/60 text-white/90 border border-white/25 px-3 py-1 font-mono text-xs tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Click for more details →
                      </span>
                    )}
                  </div>

                  <div className="p-6">
                    {/* Brief Description - Always Visible */}
                    <div className="mb-4">
                      <h5 className="text-lg font-mono text-white mb-2">
                        GARUDA
                      </h5>
                      <p className="text-sm font-mono text-blue-300 mb-3 tracking-wider">
                        Grid-free Autonomous Renewable energy-powered Ultra-fast
                        Direct-charging for Automobiles
                      </p>
                      <p className="text-sm font-mono text-white/80 leading-relaxed mb-2">
                        India's first sovereign EV charging network — a
                        plug-and-play, subscription-based charging hub powered
                        by the sun, optimized by AI, and deployable in under 24
                        hours.
                      </p>
                      <p className="text-sm font-mono text-white/80 leading-relaxed">
                        Revolutionary autonomous charging solution with zero
                        grid dependency, featuring proprietary Garuda AI for
                        self-healing infrastructure and franchisee-driven growth
                        model.
                      </p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/10">
                      <p className="text-xs font-mono text-white/60 italic text-center">
                        Click to explore comprehensive specifications, business
                        model, competitive analysis, and implementation roadmap
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </ScrollReveal>

        <ScrollReveal delay={0.5}>
          {activePanel === "OEM" && (
            <div
              id="panel-oem"
              className="oem-panel-drag-expand border border-white/20 rounded-2xl p-8 backdrop-blur-sm bg-white/5 mb-12 shadow-2xl relative overflow-hidden"
              style={{
                transformOrigin: "center top",
                animationDelay: "0.1s",
              }}
            >
              {/* Enhanced animated background particles */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="particle-drift absolute top-10 left-10 w-2 h-2 bg-white/20 rounded-full animate-pulse"></div>
                <div className="particle-drift absolute top-20 right-20 w-1 h-1 bg-white/15 rounded-full animate-pulse"></div>
                <div className="particle-drift absolute bottom-20 left-20 w-1.5 h-1.5 bg-white/20 rounded-full animate-pulse"></div>
                <div className="particle-drift absolute bottom-10 right-10 w-1 h-1 bg-white/15 rounded-full animate-pulse"></div>
                <div className="particle-drift absolute top-1/2 left-1/4 w-1 h-1 bg-white/15 rounded-full animate-pulse"></div>
                <div className="particle-drift absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-white/10 rounded-full animate-pulse"></div>
              </div>

              {/* Connection line showing drag effect */}
              <div className="oem-connection-line absolute -top-8 left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-white/30 to-transparent rounded-full"></div>

              <h3
                className="content-cascade text-xl font-mono text-white tracking-wider mb-6 relative z-10"
                style={{ animationDelay: "0.1s" }}
              >
                OEM
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div
                  id="oem-modules-card"
                  className={`oem-card-emerge oem-card-hover oem-card border border-white/15 rounded-lg overflow-hidden cursor-pointer hover:border-white/30 hover:shadow-lg transition-all duration-500 group transform hover:-translate-y-2 hover:scale-105 ${
                    isNavigating ? "opacity-50 pointer-events-none" : ""
                  }`}
                  style={{ animationDelay: "0.3s" }}
                  onClick={() => handleOEMProductClick("modules")}
                  onMouseEnter={() =>
                    router.prefetch("/case-study/ai-microgrid")
                  }
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleOEMProductClick("modules");
                    }
                  }}
                  aria-label="View solar module manufacturing case study"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src="/solar-module-manufacturing.jpg"
                      alt="Solar Module Manufacturing"
                      className="w-full h-40 object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700 group-hover:brightness-110"
                      loading="lazy"
                      decoding="async"
                      width={640}
                      height={160}
                      onError={(e) => {
                        const t = e.currentTarget as HTMLImageElement;
                        t.src = "/placeholder.jpg";
                      }}
                    />
                    {/* Animated Energy Lines */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-4 left-4 w-10 h-0.5 bg-gradient-to-r from-indigo-400 to-transparent animate-pulse"></div>
                      <div className="absolute top-8 left-4 w-7 h-0.5 bg-gradient-to-r from-blue-400 to-transparent animate-pulse delay-200"></div>
                      <div className="absolute bottom-4 right-4 w-9 h-0.5 bg-gradient-to-l from-teal-400 to-transparent animate-pulse delay-500"></div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h5 className="text-sm font-mono text-white mb-2 group-hover:text-blue-300 transition-colors">
                      Solar Module Manufacturing
                    </h5>
                    <p className="text-xs font-mono text-white/70 leading-relaxed">
                      High-throughput lines with robust QA, cell sorting, and
                      advanced lamination for durable, high-yield modules.
                    </p>
                    <p className="text-xs font-mono text-blue-400/80 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      View case study →
                    </p>
                  </div>
                </div>

                <div
                  id="oem-chargers-card"
                  className={`oem-card-emerge oem-card-hover oem-card border border-white/15 rounded-lg overflow-hidden cursor-pointer hover:border-white/30 hover:shadow-lg transition-all duration-500 group transform hover:-translate-y-2 hover:scale-105 ${
                    isNavigating ? "opacity-50 pointer-events-none" : ""
                  }`}
                  style={{ animationDelay: "0.5s" }}
                  onClick={() => handleOEMProductClick("chargers")}
                  onMouseEnter={() =>
                    router.prefetch("/case-study/ev-charging-station")
                  }
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleOEMProductClick("chargers");
                    }
                  }}
                  aria-label="View EV charging stations case study"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src="/ev-charging-stations-garuda.jpg"
                      alt="Garuda EV Charging Stations"
                      className="w-full h-40 object-cover group-hover:scale-110 group-hover:-rotate-1 transition-all duration-700 group-hover:brightness-110"
                      loading="lazy"
                      decoding="async"
                      width={640}
                      height={160}
                      onError={(e) => {
                        const t = e.currentTarget as HTMLImageElement;
                        t.src = "/placeholder.jpg";
                      }}
                    />
                    {/* Animated Energy Lines */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-4 right-4 w-8 h-0.5 bg-gradient-to-l from-green-400 to-transparent animate-pulse"></div>
                      <div className="absolute top-8 right-4 w-6 h-0.5 bg-gradient-to-l from-blue-400 to-transparent animate-pulse delay-300"></div>
                      <div className="absolute bottom-4 left-4 w-10 h-0.5 bg-gradient-to-r from-yellow-400 to-transparent animate-pulse delay-600"></div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h5 className="text-sm font-mono text-white mb-2 group-hover:text-blue-300 transition-colors">
                      EV Charging Stations
                    </h5>
                    <p className="text-xs font-mono text-white/70 leading-relaxed">
                      Modular DC/AC chargers with smart telemetry, predictive
                      maintenance, and seamless payments integration.
                    </p>
                    <p className="text-xs font-mono text-blue-400/80 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      View case study →
                    </p>
                  </div>
                </div>

                <div
                  id="oem-batteries-card"
                  className={`oem-card-emerge oem-card-hover oem-card border border-white/15 rounded-lg overflow-hidden cursor-pointer hover:border-white/30 hover:shadow-lg transition-all duration-500 group transform hover:-translate-y-2 hover:scale-105 ${
                    isNavigating ? "opacity-50 pointer-events-none" : ""
                  }`}
                  style={{ animationDelay: "0.7s" }}
                  onClick={() => handleOEMProductClick("batteries")}
                  onMouseEnter={() => router.prefetch("/case-study/zinc-cells")}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleOEMProductClick("batteries");
                    }
                  }}
                  aria-label="View battery technologies case study"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src="/solid-state-battery.png"
                      alt="Advanced Battery Technologies"
                      className="w-full h-40 object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700 group-hover:brightness-110"
                      loading="lazy"
                      decoding="async"
                      width={640}
                      height={160}
                      onError={(e) => {
                        const t = e.currentTarget as HTMLImageElement;
                        t.src = "/placeholder.jpg";
                      }}
                    />
                    {/* Animated Energy Lines */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-4 left-4 w-9 h-0.5 bg-gradient-to-r from-purple-400 to-transparent animate-pulse"></div>
                      <div className="absolute bottom-8 right-4 w-7 h-0.5 bg-gradient-to-l from-red-400 to-transparent animate-pulse delay-400"></div>
                      <div className="absolute bottom-4 left-8 w-8 h-0.5 bg-gradient-to-r from-orange-400 to-transparent animate-pulse delay-700"></div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h5 className="text-sm font-mono text-white mb-2 group-hover:text-blue-300 transition-colors">
                      Advanced Battery Technologies
                    </h5>
                    <p className="text-xs font-mono text-white/70 leading-relaxed">
                      Solid-state and next-generation battery chemistries for
                      enhanced performance and sustainability.
                    </p>
                    <p className="text-xs font-mono text-blue-400/80 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      View case study →
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </ScrollReveal>

        <ScrollReveal delay={0.55}>
          {activePanel === "R & D" && (
            <div
              id="panel-r&d"
              className="rnd-panel-drag-expand border border-white/20 rounded-2xl p-8 backdrop-blur-sm bg-white/5 shadow-2xl relative overflow-hidden"
              style={{
                transformOrigin: "center top",
                animationDelay: "0.1s",
              }}
            >
              {/* Enhanced animated background particles */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="particle-drift absolute top-12 left-12 w-2 h-2 bg-violet-400 rounded-full shadow-lg shadow-violet-400/50"></div>
                <div className="particle-drift absolute top-24 right-24 w-1 h-1 bg-indigo-400 rounded-full shadow-lg shadow-indigo-400/50"></div>
                <div className="particle-drift absolute bottom-24 left-24 w-1.5 h-1.5 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50"></div>
                <div className="particle-drift absolute bottom-12 right-12 w-1 h-1 bg-fuchsia-400 rounded-full shadow-lg shadow-fuchsia-400/50"></div>
                <div className="particle-drift absolute top-1/2 left-1/4 w-1 h-1 bg-pink-400 rounded-full shadow-lg shadow-pink-400/50"></div>
                <div className="particle-drift absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-violet-300 rounded-full shadow-lg shadow-violet-300/50"></div>
              </div>

              {/* Connection line showing drag effect */}
              <div className="rnd-connection-line absolute -top-8 left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-white/30 to-transparent rounded-full"></div>

              <h3
                className="content-cascade text-xl font-mono text-white tracking-wider mb-6 relative z-10"
                style={{ animationDelay: "0.1s" }}
              >
                R & D
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                  className={`rnd-card-emerge rnd-card-hover rnd-card border border-white/15 rounded-lg overflow-hidden cursor-pointer hover:border-white/30 hover:shadow-lg transition-all duration-500 group transform hover:-translate-y-2 hover:scale-105 ${
                    isNavigating ? "opacity-50 pointer-events-none" : ""
                  }`}
                  style={{ animationDelay: "0.5s" }}
                  onClick={() => handleRnDClick("solar-cells")}
                  onMouseEnter={() =>
                    router.prefetch("/case-study/solar-cells")
                  }
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleRnDClick("solar-cells");
                    }
                  }}
                  aria-label="Learn more about advanced solar cell technologies"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src="/solar-cells.jpg"
                      alt="Advanced Solar Cell Technologies"
                      className="w-full h-40 object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700 group-hover:brightness-110"
                      loading="lazy"
                      decoding="async"
                      width={640}
                      height={160}
                      onError={(e) => {
                        const t = e.currentTarget as HTMLImageElement;
                        t.src = "/placeholder.jpg";
                      }}
                    />
                    {/* Animated Energy Lines */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-4 left-4 w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent animate-pulse"></div>
                      <div className="absolute top-8 left-4 w-6 h-0.5 bg-gradient-to-r from-blue-400 to-transparent animate-pulse delay-300"></div>
                      <div className="absolute bottom-4 right-4 w-9 h-0.5 bg-gradient-to-l from-teal-400 to-transparent animate-pulse delay-600"></div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h5 className="text-sm font-mono text-white mb-2 group-hover:text-blue-300 transition-colors">
                      Solar Cells
                    </h5>
                    <p className="text-xs font-mono text-white/70 leading-relaxed mb-4">
                      Advanced photovoltaic technologies including thin film, Si
                      + Perovskite tandem, and c-Si solar cell research.
                    </p>
                    <p className="text-xs font-mono text-blue-400/80 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      View research details →
                    </p>
                  </div>
                </div>

                <div
                  className={`rnd-card-emerge rnd-card-hover rnd-card border border-white/15 rounded-lg overflow-hidden cursor-pointer hover:border-white/30 hover:shadow-lg transition-all duration-500 group transform hover:-translate-y-2 hover:scale-105 ${
                    isNavigating ? "opacity-50 pointer-events-none" : ""
                  }`}
                  style={{ animationDelay: "0.7s" }}
                  onClick={() => handleRnDClick("zinc-batteries")}
                  onMouseEnter={() =>
                    router.prefetch("/case-study/zinc-batteries")
                  }
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleRnDClick("zinc-batteries");
                    }
                  }}
                  aria-label="View zinc-ion battery technology research"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src="/zinc-batteryinside.webp"
                      alt="Beyond Lithium Batteries - Zinc-Ion Technology Laboratory"
                      className="w-full h-40 object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700 group-hover:brightness-110"
                      loading="lazy"
                      decoding="async"
                      width={640}
                      height={160}
                      onError={(e) => {
                        const t = e.currentTarget as HTMLImageElement;
                        t.src = "/placeholder.jpg";
                      }}
                    />
                    {/* Animated Energy Lines */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-4 right-4 w-7 h-0.5 bg-gradient-to-l from-emerald-400 to-transparent animate-pulse"></div>
                      <div className="absolute top-8 right-4 w-5 h-0.5 bg-gradient-to-l from-green-400 to-transparent animate-pulse delay-200"></div>
                      <div className="absolute bottom-4 left-4 w-8 h-0.5 bg-gradient-to-r from-lime-400 to-transparent animate-pulse delay-500"></div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h5 className="text-sm font-mono text-white mb-2 group-hover:text-blue-300 transition-colors">
                      Beyond Lithium Batteries
                    </h5>
                    <p className="text-xs font-mono text-white/70 leading-relaxed mb-4">
                      Advanced zinc-ion battery technology offering safer, more
                      sustainable, and cost-effective energy storage solutions.
                    </p>
                    <p className="text-xs font-mono text-blue-400/80 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      View research details →
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </ScrollReveal>
      </div>

      <style jsx>{`
        .panel-in {
          opacity: 0;
          transform: translateY(-6px) scale(0.98);
          animation: panelIn 380ms ease-out forwards;
        }
        @keyframes panelIn {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .card-pop {
          will-change: transform;
          animation: cardPop 240ms ease-out;
        }
        @keyframes cardPop {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(0.985);
          }
          100% {
            transform: scale(1);
          }
        }
        .active-panel {
          animation: subtle-pulse 2s ease-in-out infinite;
        }
        @keyframes subtle-pulse {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.1);
          }
          50% {
            box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.05);
          }
        }
        .geometric-line {
          background: linear-gradient(
            90deg,
            transparent,
            #3b82f6,
            #10b981,
            transparent
          );
          height: 2px;
          position: relative;
          overflow: hidden;
        }
        .geometric-line::after {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.8),
            transparent
          );
          animation: shimmer 3s infinite;
        }
        @keyframes shimmer {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }
        .content-cascade {
          opacity: 0;
          transform: translateY(20px);
          animation: contentCascade 0.6s ease-out forwards;
        }
        @keyframes contentCascade {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .particle-drift {
          animation: particleDrift 8s ease-in-out infinite;
        }
        @keyframes particleDrift {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-10px) translateX(5px);
          }
          50% {
            transform: translateY(0) translateX(10px);
          }
          75% {
            transform: translateY(10px) translateX(5px);
          }
        }
        .panel-slide-in {
          opacity: 0;
          transform: translateY(-10px) scale(0.98);
          animation: panelSlideIn 450ms ease-out forwards;
        }
        @keyframes panelSlideIn {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .oem-panel-drag-expand {
          opacity: 0;
          transform: translateY(-100px) scaleY(0.05) scaleX(0.8);
          animation: oemPanelDragExpand 600ms
            cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        @keyframes oemPanelDragExpand {
          0% {
            opacity: 0;
            transform: translateY(-100px) scaleY(0.05) scaleX(0.8);
            background: rgba(255, 255, 255, 0.02);
          }
          25% {
            opacity: 0.3;
            transform: translateY(-60px) scaleY(0.2) scaleX(0.85);
            background: rgba(255, 255, 255, 0.03);
          }
          50% {
            opacity: 0.6;
            transform: translateY(-30px) scaleY(0.6) scaleX(0.92);
            background: rgba(255, 255, 255, 0.04);
          }
          75% {
            opacity: 0.85;
            transform: translateY(-10px) scaleY(0.95) scaleX(0.98);
            background: rgba(255, 255, 255, 0.045);
          }
          90% {
            opacity: 0.95;
            transform: translateY(-3px) scaleY(1.02) scaleX(1.01);
            background: rgba(255, 255, 255, 0.05);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scaleY(1) scaleX(1);
            background: rgba(255, 255, 255, 0.05);
          }
        }
        .oem-card-emerge {
          opacity: 0;
          transform: translateY(40px) scale(0.7) rotateY(-10deg);
          animation: oemCardDragEmerge 450ms cubic-bezier(0.34, 1.56, 0.64, 1)
            forwards;
        }
        @keyframes oemCardDragEmerge {
          0% {
            opacity: 0;
            transform: translateY(40px) scale(0.7) rotateY(-10deg)
              rotateX(20deg);
          }
          30% {
            opacity: 0.4;
            transform: translateY(25px) scale(0.85) rotateY(-5deg)
              rotateX(10deg);
          }
          60% {
            opacity: 0.8;
            transform: translateY(8px) scale(0.98) rotateY(-2deg) rotateX(2deg);
          }
          85% {
            opacity: 0.95;
            transform: translateY(-2px) scale(1.02) rotateY(1deg) rotateX(-1deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotateY(0deg) rotateX(0deg);
          }
        }
        .oem-connection-line {
          height: 0;
          animation: oemConnectionGrow 400ms ease-out 200ms forwards;
        }
        @keyframes oemConnectionGrow {
          0% {
            height: 0;
            opacity: 0;
          }
          50% {
            height: 32px;
            opacity: 0.8;
          }
          100% {
            height: 32px;
            opacity: 0.4;
          }
        }
        .epc-panel-drag-expand {
          opacity: 0;
          transform: translateY(-100px) scaleY(0.05) scaleX(0.8);
          animation: epcPanelDragExpand 600ms
            cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        @keyframes epcPanelDragExpand {
          0% {
            opacity: 0;
            transform: translateY(-100px) scaleY(0.05) scaleX(0.8);
            background: rgba(255, 255, 255, 0.02);
          }
          25% {
            opacity: 0.3;
            transform: translateY(-60px) scaleY(0.2) scaleX(0.85);
            background: rgba(255, 255, 255, 0.03);
          }
          50% {
            opacity: 0.6;
            transform: translateY(-30px) scaleY(0.6) scaleX(0.92);
            background: rgba(255, 255, 255, 0.04);
          }
          75% {
            opacity: 0.85;
            transform: translateY(-10px) scaleY(0.95) scaleX(0.98);
            background: rgba(255, 255, 255, 0.045);
          }
          90% {
            opacity: 0.95;
            transform: translateY(-3px) scaleY(1.02) scaleX(1.01);
            background: rgba(255, 255, 255, 0.05);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scaleY(1) scaleX(1);
            background: rgba(255, 255, 255, 0.05);
          }
        }
        .epc-card-emerge {
          opacity: 0;
          transform: translateY(40px) scale(0.7) rotateY(-10deg);
          animation: epcCardDragEmerge 450ms cubic-bezier(0.34, 1.56, 0.64, 1)
            forwards;
        }
        @keyframes epcCardDragEmerge {
          0% {
            opacity: 0;
            transform: translateY(40px) scale(0.7) rotateY(-10deg)
              rotateX(20deg);
          }
          30% {
            opacity: 0.4;
            transform: translateY(25px) scale(0.85) rotateY(-5deg)
              rotateX(10deg);
          }
          60% {
            opacity: 0.8;
            transform: translateY(8px) scale(0.98) rotateY(-2deg) rotateX(2deg);
          }
          85% {
            opacity: 0.95;
            transform: translateY(-2px) scale(1.02) rotateY(1deg) rotateX(-1deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotateY(0deg) rotateX(0deg);
          }
        }
        .epc-connection-line {
          height: 0;
          animation: epcConnectionGrow 400ms ease-out 200ms forwards;
        }
        @keyframes epcConnectionGrow {
          0% {
            height: 0;
            opacity: 0;
          }
          50% {
            height: 32px;
            opacity: 0.8;
          }
          100% {
            height: 32px;
            opacity: 0.4;
          }
        }
        .rnd-panel-drag-expand {
          opacity: 0;
          transform: translateY(-100px) scaleY(0.05) scaleX(0.8);
          animation: rndPanelDragExpand 600ms
            cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        @keyframes rndPanelDragExpand {
          0% {
            opacity: 0;
            transform: translateY(-100px) scaleY(0.05) scaleX(0.8);
            background: rgba(255, 255, 255, 0.02);
          }
          25% {
            opacity: 0.3;
            transform: translateY(-60px) scaleY(0.2) scaleX(0.85);
            background: rgba(255, 255, 255, 0.03);
          }
          50% {
            opacity: 0.6;
            transform: translateY(-30px) scaleY(0.6) scaleX(0.92);
            background: rgba(255, 255, 255, 0.04);
          }
          75% {
            opacity: 0.85;
            transform: translateY(-10px) scaleY(0.95) scaleX(0.98);
            background: rgba(255, 255, 255, 0.045);
          }
          90% {
            opacity: 0.95;
            transform: translateY(-3px) scaleY(1.02) scaleX(1.01);
            background: rgba(255, 255, 255, 0.05);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scaleY(1) scaleX(1);
            background: rgba(255, 255, 255, 0.05);
          }
        }
        .rnd-card-emerge {
          opacity: 0;
          transform: translateY(40px) scale(0.7) rotateY(-10deg);
          animation: rndCardDragEmerge 450ms cubic-bezier(0.34, 1.56, 0.64, 1)
            forwards;
        }
        @keyframes rndCardDragEmerge {
          0% {
            opacity: 0;
            transform: translateY(40px) scale(0.7) rotateY(-10deg)
              rotateX(20deg);
          }
          30% {
            opacity: 0.4;
            transform: translateY(25px) scale(0.85) rotateY(-5deg)
              rotateX(10deg);
          }
          60% {
            opacity: 0.8;
            transform: translateY(8px) scale(0.98) rotateY(-2deg) rotateX(2deg);
          }
          85% {
            opacity: 0.95;
            transform: translateY(-2px) scale(1.02) rotateY(1deg) rotateX(-1deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotateY(0deg) rotateX(0deg);
          }
        }
        .rnd-connection-line {
          height: 0;
          animation: rndConnectionGrow 400ms ease-out 200ms forwards;
        }
        @keyframes rndConnectionGrow {
          0% {
            height: 0;
            opacity: 0;
          }
          50% {
            height: 32px;
            opacity: 0.8;
          }
          100% {
            height: 32px;
            opacity: 0.4;
          }
        }
        @media (max-width: 640px) {
          #services .panel-in {
            padding: 1rem;
            margin-bottom: 1.5rem;
          }
          #services .grid {
            gap: 1rem;
          }
        }
        @media (max-width: 480px) {
          #services h2 {
            font-size: 1.5rem;
          }
          #services .geometric-line {
            width: 5rem;
            margin-bottom: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
