"use client";
import {
  ScrollReveal,
  FloatingElement,
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
  const [currentSlide, setCurrentSlide] = useState(0);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

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
      className="min-h-screen flex items-center py-20 relative bg-black"
    >
      <FloatingElement
        delay={0.5}
        amplitude={15}
        className="absolute top-20 left-10 opacity-10"
      >
        <div className="w-1 h-1 bg-white rounded-full" />
      </FloatingElement>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <ScrollReveal delay={0.2}>
          <h2 className="text-2xl md:text-4xl font-mono text-white mb-4 tracking-wider text-center">
            {currentTranslation.title}
          </h2>
          <div className="geometric-line w-32 mb-16 mx-auto" />
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Left Side - Effectiveness */}
            <div className="relative">
              <div className="mb-6">
                <h3 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight mb-3">
                  {currentTranslation.galleryTitle}
                </h3>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-px bg-white"></div>
                  <span className="text-white/60 text-sm tracking-wider font-mono whitespace-nowrap">
                    {currentTranslation.gallerySubtitle}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side - Creativity */}
            <div className="relative">
              <div className="mb-6">
                <h3 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight mb-3">
                  {currentTranslation.creativityTitle}
                </h3>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-px bg-white"></div>
                  <span className="text-white/60 text-sm tracking-wider font-mono whitespace-nowrap">
                    {currentTranslation.creativitySubtitle}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {carouselImages.map((image, index) => (
              <div
                key={index}
                className={`relative aspect-square rounded-lg overflow-hidden border border-white/20 transition-all duration-500 cursor-pointer group ${
                  currentSlide === index ? "ring-2 ring-white/50 scale-105" : ""
                }`}
                onClick={() => handleImageClick(image, index)}
              >
                <img
                  src={
                    image ||
                    "/placeholder.svg?height=300&width=300&query=zinc powered solar cell technology"
                  }
                  alt={`Garuda EV Network ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-white text-center">
                    <p className="text-xs font-mono mb-1">CLICK TO VIEW</p>
                    <p className="text-xs font-mono opacity-60">CASE STUDY</p>
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 text-white text-xs font-mono">
                  {String(index + 1).padStart(2, "0")}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {selectedImage && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="relative bg-black/90 border border-white/30 rounded-lg p-6 max-w-md w-full max-h-[70vh] shadow-2xl">
              <button
                onClick={handleClosePopup}
                className="absolute top-4 right-4 text-white hover:text-white/70 text-xl font-mono"
              >
                ×
              </button>

              <div className="mb-4">
                <img
                  src={
                    selectedImage.src ||
                    "/placeholder.svg?height=300&width=400&query=zinc powered solar cell technology preview" ||
                    "/placeholder.svg" ||
                    "/placeholder.svg" ||
                    "/placeholder.svg"
                  }
                  alt="Case Study Preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>

              <div className="text-center mb-4">
                <h3 className="text-white font-mono text-sm mb-2">
                  {caseStudyTitles[selectedImage.index]}
                </h3>
                <p className="text-white/60 font-mono text-xs mb-4">
                  Advanced solar technology with intelligent energy management
                </p>

                <button
                  onClick={handlePopupClick}
                  className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-mono text-xs px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
                >
                  VIEW FULL CASE STUDY →
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-12">
          <ScrollReveal delay={0.5}>
            <div className="border border-white/20 rounded-lg p-8 backdrop-blur-sm bg-white/5">
              <h3 className="text-lg font-mono mb-6 text-white tracking-wider">
                {currentTranslation.featuresTitle}
              </h3>
              <div className="space-y-4">
                {currentTranslation.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <span className="text-white mt-1 text-xs">▸</span>
                    <span className="font-mono text-sm text-white/70 leading-relaxed">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Roadmap intentionally removed per requirements */}
        </div>
      </div>
    </section>
  );
}
