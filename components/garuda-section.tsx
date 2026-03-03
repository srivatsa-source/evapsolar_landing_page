"use client";
import {
  ScrollReveal,
} from "@/components/ui/floating-elements";
import { useState, useEffect } from "react";

const translations = {
  en: {
    title: "GARUDA – INDIA'S FIRST GRID-FREE EV NETWORK",
    featuresTitle: "FEATURES",
    roadmapTitle: "ROADMAP",
    galleryTitle: "EFFECTIVENESS",
    gallerySubtitle: "CASE STUDY",
    creativityTitle: "CREATIVITY",
    creativitySubtitle: "CASE STUDY",
    features: [
      "Solar Capacity: 50-70kWp",
      "Battery Storage: 100kWh",
      "Grid-Hybrid",
      "No Grid Connection • No Construction • Deploy in <24 hrs",
      "AI-Optimized Solar Microgrids",
      "Predictive Energy Forecasting",
      "Autonomous Load Balancing",
      "Dynamic Pricing & Demand Management",
      "Predictive Maintenance",
    ],
    roadmap: [
      "Q4 2025 – 20 kWh Hybrid Prototype V1.0",
      "Q1 2026 – 20 kWh Hybrid Pilot V2.0",
      "Q2 2026 – 40 kWh Off-Grid V2.1",
      "Q4 2026 – Off-Grid Modular Fleet V2.2",
    ],
  },
  hi: {
    title: "गरुड़ – भारत का पहला ग्रिड-मुक्त ईवी नेटवर्क",
    featuresTitle: "विशेषताएं",
    roadmapTitle: "रोडमैप",
    galleryTitle: "परಿಣಾಮಕಾರಿತ್ವ",
    gallerySubtitle: "केस स्टಡಿ",
    creativityTitle: "ಸೃಜನಶೀಲತೆ",
    creativitySubtitle: "ಕೇಸ್ ಸ್ಟಡಿ",
    features: [
      "सौर क्षमता: 50-70kWp",
      "बैटरी भंडारण: 100kWh",
      "ग्रिड-हाइब्रिड",
      "कोई ग्रिड कनेक्शन नहीं • कोई निर्माण नहीं • 24 घंटे में तैनाती",
      "एआई-अनुकूलित सौर माइक्रोग्रिड",
      "भविष्यसूचक ऊर्जा पूर्वानुमान",
      "स्वायत्त लोड संतुलन",
      "गतिशील मूल्य निर्धारण और मांग प्रबंधन",
      "भविष्यसूचक रखरखाव",
    ],
    roadmap: [
      "Q4 2025 – 20 kWh हाइब्रिड प्रोटोटाइप V1.0",
      "Q1 2026 – 20 kWh हाइब्रिड पायलट V2.0",
      "Q2 2026 – 40 kWh ऑफ-ग्रिड V2.1",
      "Q4 2026 – ऑफ-ग्रिड मॉड्यूलर फ्लीट V2.2",
    ],
  },
  kn: {
    title: "ಗರುಡ – ಭಾರತದ ಮೊದಲ ಗ್ರಿಡ್-ಮುಕ್ತ ಇವಿ ನೆಟ್‌ವರ್ಕ್",
    featuresTitle: "ವೈಶಿಷ್ಟ್ಯಗಳು",
    roadmapTitle: "ರೋಡ್‌ಮ್ಯಾಪ್",
    galleryTitle: "ಪರಿಣಾಮಕಾರಿತ್ವ",
    gallerySubtitle: "ಕೇಸ್ ಸ್ಟಡಿ",
    creativityTitle: "ಸೃಜನಶೀಲತೆ",
    creativitySubtitle: "ಕೇಸ್ ಸ್ಟಡಿ",
    features: [
      "ಸೌರ ಸಾಮರ್ಥ್ಯ: 50-70kWp",
      "ಬ್ಯಾಟರಿ ಸಂಗ್ರಹ: 100kWh",
      "ಗ್ರಿಡ್-ಹೈಬ್ರಿಡ್",
      "ಗ್ರಿಡ್ ಸಂಪರ್ಕವಿಲ್ಲ • ನಿರ್ಮಾಣವಿಲ್ಲ • 24 ಗಂಟೆಗಳಲ್ಲಿ ನಿಯೋಜನೆ",
      "ಎಐ-ಅನುಕೂಲಿತ ಸೌರ ಮೈಕ್ರೋಗ್ರಿಡ್‌ಗಳು",
      "ಭವಿಷ್ಯಸೂಚಕ ಶಕ್ತಿ ಮುನ್ನೋಟ",
      "ಸ್ವಾಯತ್ತ ಲೋಡ್ ಸಮತೋಲನ",
      "ಡೈನಾಮಿಕ್ ಬೆಲೆ ಮತ್ತು ಬೇಡಿಕೆ ನಿರ್ವಹಣೆ",
      "ಭವಿಷ್ಯಸೂಚಕ ನಿರ್ವಹಣೆ",
    ],
    roadmap: [
      "Q4 2025 – 20 kWh ಹೈಬ್ರಿಡ್ ಪ್ರೋಟೋಟೈಪ್ V1.0",
      "Q1 2026 – 20 kWh ಹೈಬ್ರಿಡ್ ಪೈಲಟ್ V2.0",
      "Q2 2026 – 40 kWh ಆಫ್-ಗ್ರಿಡ್ V2.1",
      "Q4 2026 – ಆಫ್-ಗ್ರಿಡ್ ಮಾಡ್ಯುಲರ್ ಫ್ಲೀಟ್ V2.2",
    ],
  },
};

export function GarudaSection() {
  const [currentLang, setCurrentLang] = useState("en");
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    index: number;
  } | null>(null);

  useEffect(() => {
    const savedLang = localStorage.getItem("language") || "en";
    setCurrentLang(savedLang);

    const handleLanguageChange = (event: CustomEvent) => {
      setCurrentLang(event.detail.language);
    };

    window.addEventListener(
      "languageChange",
      handleLanguageChange as EventListener
    );
    return () =>
      window.removeEventListener(
        "languageChange",
        handleLanguageChange as EventListener
      );
  }, []);

  const currentTranslation =
    translations[currentLang as keyof typeof translations] || translations.en;

  const carouselImages = [
    "/ev-charging-station-with-solar-panels.jpg",
    "/grid-free-ev-charging-network.jpg",
    "/ai-optimized-solar-microgrid.jpg",
    "/autonomous-ev-charging-system.jpg",
  ];

  const caseStudyRoutes = [
    "/case-study/ev-charging-station",
    "/case-study/garuda-charging-station",
    "/case-study/ai-microgrid",
    "/case-study/autonomous-charging",
  ];

  const caseStudyTitles = [
    "EV CHARGING STATION WITH SOLAR PANELS",
    "GRID-FREE EV CHARGING NETWORK",
    "AI-OPTIMIZED SOLAR MICROGRID",
    "AUTONOMOUS EV CHARGING SYSTEM",
  ];

  const handleImageClick = (image: string, index: number) => {
    setSelectedImage({ src: image, index });
  };

  const handlePopupClick = () => {
    if (selectedImage) {
      window.open(caseStudyRoutes[selectedImage.index], "_blank");
      setSelectedImage(null);
    }
  };

  const handleClosePopup = () => {
    setSelectedImage(null);
  };

  return (
    <section
      id="garuda"
      className="py-20 md:py-28 relative bg-background dark:bg-black overflow-hidden"
    >
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/[0.03] via-transparent to-transparent dark:from-blue-500/[0.05]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <ScrollReveal delay={0.2}>
          <div className="text-center mb-16 md:mb-20">
            <span className="inline-block text-[10px] font-mono tracking-[0.3em] text-blue-600 dark:text-blue-400 mb-4 px-3 py-1 border border-blue-500/20 rounded-full">
              FLAGSHIP INITIATIVE
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-foreground dark:text-white tracking-tight leading-tight mb-4">
              {currentTranslation.title}
            </h2>
            <div className="w-12 h-px bg-blue-500/50 mx-auto" />
          </div>
        </ScrollReveal>

        {/* Case Studies — Staggered Cards */}
        <ScrollReveal delay={0.3}>
          <div className="mb-16 md:mb-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-6 h-px bg-foreground/30 dark:bg-white/30" />
              <span className="text-xs font-mono tracking-[0.2em] text-foreground/50 dark:text-white/50 uppercase">
                Case Studies
              </span>
            </div>

            {/* Card Grid — 1 col mobile, 2 col tablet+ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
              {carouselImages.map((image, index) => (
                <div
                  key={index}
                  className={`group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-xl hover:shadow-foreground/5 dark:hover:shadow-white/5 ${
                    index % 2 === 1 ? "sm:translate-y-6" : ""
                  }`}
                  onClick={() => handleImageClick(image, index)}
                >
                  {/* Image */}
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={image || "/placeholder.svg?height=300&width=400"}
                      alt={caseStudyTitles[index]}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                    <div className="flex items-end justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-mono text-xs sm:text-sm font-medium leading-snug line-clamp-2">
                          {caseStudyTitles[index]}
                        </p>
                      </div>
                      <div className="flex-shrink-0 w-8 h-8 rounded-full border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 translate-x-2">
                        <span className="text-white text-xs">→</span>
                      </div>
                    </div>
                  </div>

                  {/* Index badge */}
                  <div className="absolute top-3 left-3 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                    <span className="text-white text-[10px] font-mono font-bold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Popup for case study preview */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={handleClosePopup}>
            <div className="relative bg-background dark:bg-neutral-900 border border-foreground/15 dark:border-white/15 rounded-xl p-0 max-w-md w-full shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={handleClosePopup}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                ×
              </button>

              <img
                src={selectedImage.src || "/placeholder.svg"}
                alt="Case Study Preview"
                className="w-full h-52 object-cover"
              />

              <div className="p-5 text-center">
                <h3 className="text-foreground dark:text-white font-mono text-sm font-medium mb-2">
                  {caseStudyTitles[selectedImage.index]}
                </h3>
                <p className="text-foreground/50 dark:text-white/50 font-mono text-xs mb-5">
                  Advanced solar technology with intelligent energy management
                </p>

                <button
                  onClick={handlePopupClick}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-mono text-xs tracking-wider px-5 py-2.5 rounded-lg transition-all duration-300"
                >
                  VIEW FULL CASE STUDY →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Features — Compact Pills */}
        <ScrollReveal delay={0.5}>
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px bg-foreground/30 dark:bg-white/30" />
              <span className="text-xs font-mono tracking-[0.2em] text-foreground/50 dark:text-white/50 uppercase">
                {currentTranslation.featuresTitle}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 md:gap-3">
              {currentTranslation.features.map((feature, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-mono text-foreground/80 dark:text-white/80 bg-foreground/[0.04] dark:bg-white/[0.04] border border-foreground/10 dark:border-white/10 hover:border-foreground/25 dark:hover:border-white/25 transition-colors"
                >
                  <span className="text-blue-500 text-[10px]">●</span>
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
