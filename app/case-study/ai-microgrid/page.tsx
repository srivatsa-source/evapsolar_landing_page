"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useState, useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const translations = {
  en: {
    backButton: "Back to Services",
    title: "AI MICROGRID SYSTEMS",
    subtitle: "INTELLIGENT ENERGY MANAGEMENT SYSTEM",
    overview: "OVERVIEW",
    overviewText:
      "Our AI-optimized microgrid technology represents the pinnacle of intelligent energy management, utilizing machine learning algorithms and predictive analytics to optimize energy distribution, storage, and consumption in real-time.",
    keyFeatures: "KEY FEATURES",
    features: [
      "Machine learning optimization",
      "Real-time demand prediction",
      "Autonomous grid balancing",
      "Weather-adaptive algorithms",
      "Fault detection and isolation",
      "Dynamic pricing optimization",
    ],
    specifications: "TECHNICAL SPECIFICATIONS",
    specs: {
      "Processing Power": "1000 TOPS AI compute",
      "Response Time": "<10ms optimization",
      "Prediction Accuracy": "98.5% demand forecast",
      "Efficiency Gain": "35% over traditional grids",
      "Data Processing": "1TB/day analytics",
      "Learning Rate": "Continuous adaptation",
    },
    applications: "APPLICATIONS",
    applicationsList: [
      "Smart city infrastructure",
      "Industrial complexes",
      "University campuses",
      "Hospital systems",
      "Data center operations",
    ],
  },
  hi: {
    backButton: "सेवाओं पर वापस जाएं",
    title: "एआई माइक्रोग्रिड सिस्टम",
    subtitle: "बुद्धिमान ऊर्जा प्रबंधन प्रणाली",
    overview: "अवलोकन",
    overviewText:
      "हमारी एआई-अनुकूलित माइक्रोग्रिड तकनीक बुद्धिमान ऊर्जा प्रबंधन की शिखर का प्रतिनिधित्व करती है, जो रीयल-टाइम में ऊर्जा वितरण, भंडारण और खपत को अनुकूलित करने के लिए मशीन लर्निंग एल्गोरिदम और भविष्यसूचक विश्लेषण का उपयोग करती है।",
    keyFeatures: "मुख्य विशेषताएं",
    features: [
      "मशीन लर्निंग अनुकूलन",
      "रीयल-टाइम मांग भविष्यवाणी",
      "स्वायत्त ग्रिड संतुलन",
      "मौसम-अनुकूली एल्गोरिदम",
      "दोष का पता लगाना और अलगाव",
      "गतिशील मूल्य निर्धारण अनुकूलन",
    ],
    specifications: "तकनीकी विनिर्देश",
    specs: {
      "प्रसंस्करण शक्ति": "1000 TOPS AI कंप्यूट",
      "प्रतिक्रिया समय": "<10ms अनुकूलन",
      "भविष्यवाणी सटीकता": "98.5% मांग पूर्वानुमान",
      "दक्षता लाभ": "पारंपरिक ग्रिड से 35% अधिक",
      "डेटा प्रसंस्करण": "1TB/दिन विश्लेषण",
      "सीखने की दर": "निरंतर अनुकूलन",
    },
    applications: "अनुप्रयोग",
    applicationsList: [
      "स्मार्ट सिटी अवसंरचना",
      "औद्योगिक परिसर",
      "विश्वविद्यालय परिसर",
      "अस्पताल प्रणाली",
      "डेटा सेंटर संचालन",
    ],
  },
  kn: {
    backButton: "ಸೇವೆಗಳಿಗೆ ಹಿಂತಿರುಗಿ",
    title: "ಎಐ ಮೈಕ್ರೋಗ್ರಿಡ್ ವ್ಯವಸ್ಥೆಗಳು",
    subtitle: "ಬುದ್ಧಿವಂತ ಶಕ್ತಿ ನಿರ್ವಹಣಾ ವ್ಯವಸ್ಥೆ",
    overview: "ಅವಲೋಕನ",
    overviewText:
      "ನಮ್ಮ AI-ಅನುಕೂಲಿತ ಮೈಕ್ರೋಗ್ರಿಡ್ ತಂತ್ರಜ್ಞಾನವು ಬುದ್ಧಿವಂತ ಶಕ್ತಿ ನಿರ್ವಹಣೆಯ ಶಿಖರವನ್ನು ಪ್ರತಿನಿಧಿಸುತ್ತದೆ, ನೈಜ-ಸಮಯದಲ್ಲಿ ಶಕ್ತಿ ವಿತರಣೆ, ಸಂಗ್ರಹಣೆ ಮತ್ತು ಬಳಕೆಯನ್ನು ಅನುಕೂಲಿಸಲು ಯಂತ್ರ ಕಲಿಕೆ ಅಲ್ಗೋರಿದಮ್‌ಗಳು ಮತ್ತು ಭವಿಷ್ಯಸೂಚಕ ವಿಶ್ಲೇಷಣೆಯನ್ನು ಬಳಸುತ್ತದೆ।",
    keyFeatures: "ಮುಖ್ಯ ವೈಶಿಷ್ಟ್ಯಗಳು",
    features: [
      "ಯಂತ್ರ ಕಲಿಕೆ ಅನುಕೂಲನ",
      "ನೈಜ-ಸಮಯ ಬೇಡಿಕೆ ಭವಿಷ್ಯವಾಣಿ",
      "ಸ್ವಾಯತ್ತ ಗ್ರಿಡ್ ಸಮತೋಲನ",
      "ಹವಾಮಾನ-ಅನುಕೂಲ ಅಲ್ಗೋರಿದಮ್‌ಗಳು",
      "ದೋಷ ಪತ್ತೆ ಮತ್ತು ಪ್ರತ್ಯೇಕತೆ",
      "ಡೈನಾಮಿಕ್ ಬೆಲೆ ಅನುಕೂಲನ",
    ],
    specifications: "ತಾಂತ್ರಿಕ ವಿಶೇಷಣಗಳು",
    specs: {
      "ಪ್ರಕ್ರಿಯೆ ಶಕ್ತಿ": "1000 TOPS AI ಕಂಪ್ಯೂಟ್",
      "ಪ್ರತಿಕ್ರಿಯೆ ಸಮಯ": "<10ms ಅನುಕೂಲನ",
      "ಭವಿಷ್ಯವಾಣಿ ನಿಖರತೆ": "98.5% ಬೇಡಿಕೆ ಮುನ್ನೋಟ",
      "ದಕ್ಷತೆ ಲಾಭ": "ಸಾಂಪ್ರದಾಯಿಕ ಗ್ರಿಡ್‌ಗಳಿಗಿಂತ 35%",
      "ಡೇಟಾ ಪ್ರಕ್ರಿಯೆ": "1TB/ದಿನ ವಿಶ್ಲೇಷಣೆ",
      "ಕಲಿಕೆ ದರ": "ನಿರಂತರ ಅನುಕೂಲನ",
    },
    applications: "ಅನ್ವಯಗಳು",
    applicationsList: [
      "ಸ್ಮಾರ್ಟ್ ಸಿಟಿ ಮೂಲಸೌಕರ್ಯ",
      "ಕೈಗಾರಿಕಾ ಸಂಕೀರ್ಣಗಳು",
      "ವಿಶ್ವವಿದ್ಯಾಲಯ ಕ್ಯಾಂಪಸ್‌ಗಳು",
      "ಆಸ್ಪತ್ರೆ ವ್ಯವಸ್ಥೆಗಳು",
      "ಡೇಟಾ ಸೆಂಟರ್ ಕಾರ್ಯಾಚರಣೆಗಳು",
    ],
  },
};

export default function AIMicrogridPage() {
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
    <main className="bg-black text-white min-h-screen">
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
        {/* Background overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wider mb-8 animate-fade-in-up animation-delay-200 text-white drop-shadow-2xl">
            {currentTranslation.title}
          </h1>
          <div className="w-24 h-px bg-white mx-auto mb-8 animate-fade-in-up animation-delay-500"></div>
          <p className="text-lg md:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed animate-fade-in-up animation-delay-800 drop-shadow-lg">
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

        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
          opacity: 0;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }

        .animation-delay-500 {
          animation-delay: 0.5s;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
        }

        .animation-delay-800 {
          animation-delay: 0.8s;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
        }

        /* Hover effects for interactive elements */
        h1:hover {
          animation: none;
          transform: scale(1.02);
          transition: transform 0.3s ease;
        }
      `}</style>
      {/* Content Sections */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Overview & Features Grid */}
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
                  AI-Optimized
                </span>
                <span className="px-3 py-1 bg-green-400/20 text-green-300 text-sm font-mono rounded">
                  Smart Grid
                </span>
              </div>
              <p className="text-white/80 leading-relaxed text-sm mb-4">
                {currentTranslation.overviewText}
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
                {currentTranslation.specifications}
              </h2>
              <div className="space-y-4 text-sm">
                {Object.entries(currentTranslation.specs).map(
                  ([key, value], index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="text-white/70">{key}:</span>
                      <span className="text-white font-medium">{value}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Key Features & Applications */}
          <div className="mb-16">
            <h2 className="text-2xl font-medium tracking-wider mb-8 text-center">
              KEY FEATURES & APPLICATIONS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div
                ref={(el) => {
                  sectionRefs.current["features-left"] = el;
                }}
                data-section="features-left"
                className={`border border-white/20 rounded-lg p-8 transition-all duration-1000 ease-out backdrop-blur-lg bg-black/30 ${
                  visibleSections.includes("features-left")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-20"
                }`}
              >
                <h3 className="text-lg font-medium text-white mb-6 tracking-wider">
                  {currentTranslation.keyFeatures}
                </h3>
                <div className="space-y-3">
                  {currentTranslation.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-white/60 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-sm text-white/80 leading-relaxed">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div
                ref={(el) => {
                  sectionRefs.current["applications-right"] = el;
                }}
                data-section="applications-right"
                className={`border border-white/20 rounded-lg p-8 transition-all duration-1000 ease-out delay-200 backdrop-blur-lg bg-black/30 ${
                  visibleSections.includes("applications-right")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-20"
                }`}
              >
                <h3 className="text-lg font-medium text-white mb-6 tracking-wider">
                  {currentTranslation.applications}
                </h3>
                <div className="space-y-3">
                  {currentTranslation.applicationsList.map((app, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-white/60 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-sm text-white/80 leading-relaxed">
                        {app}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
