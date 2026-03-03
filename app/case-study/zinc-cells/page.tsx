"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useState, useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const translations = {
  en: {
    backButton: "Back to Services",
    title: "ZINC-POWERED CELLS",
    subtitle: "REVOLUTIONARY ENERGY STORAGE TECHNOLOGY",
    overview: "OVERVIEW",
    overviewText:
      "Our zinc-ion battery technology represents a breakthrough in sustainable energy storage, offering superior safety, longevity, and environmental benefits compared to traditional lithium-ion solutions.",
    keyFeatures: "KEY FEATURES",
    features: [
      "Non-toxic and environmentally safe",
      "Superior thermal stability",
      "Extended cycle life (5000+ cycles)",
      "Cost-effective manufacturing",
      "Recyclable materials",
      "High energy density",
    ],
    specifications: "TECHNICAL SPECIFICATIONS",
    specs: {
      "Energy Density": "150 Wh/kg",
      "Cycle Life": "5000+ cycles",
      "Operating Temperature": "-20°C to +60°C",
      Efficiency: "95%",
      "Self-discharge": "<3% per month",
      "Safety Rating": "UL 9540A certified",
    },
    applications: "APPLICATIONS",
    applicationsList: [
      "Grid-scale energy storage",
      "Electric vehicle charging stations",
      "Residential solar systems",
      "Industrial backup power",
      "Renewable energy integration",
    ],
  },
  hi: {
    backButton: "सेवाओं पर वापस जाएं",
    title: "जिंक-संचालित कोशिकाएं",
    subtitle: "क्रांतिकारी ऊर्जा भंडारण तकनीक",
    overview: "अवलोकन",
    overviewText:
      "हमारी जिंक-आयन बैटरी तकनीक टिकाऊ ऊर्जा भंडारण में एक सफलता का प्रतिनिधित्व करती है, जो पारंपरिक लिथियम-आयन समाधानों की तुलना में बेहतर सुरक्षा, दीर्घायु और पर्यावरणीय लाभ प्रदान करती है।",
    keyFeatures: "मुख्य विशेषताएं",
    features: [
      "गैर-विषाक्त और पर्यावरण के लिए सुरक्षित",
      "बेहतर थर्मल स्थिरता",
      "विस्तारित चक्र जीवन (5000+ चक्र)",
      "लागत-प्रभावी निर्माण",
      "पुनर्चक्रण योग्य सामग्री",
      "उच्च ऊर्जा घनत्व",
    ],
    specifications: "तकनीकी विनिर्देश",
    specs: {
      "ऊर्जा घनत्व": "150 Wh/kg",
      "चक्र जीवन": "5000+ चक्र",
      "ऑपरेटिंग तापमान": "-20°C से +60°C",
      दक्षता: "95%",
      "स्व-निर्वहन": "<3% प्रति माह",
      "सुरक्षा रेटिंग": "UL 9540A प्रमाणित",
    },
    applications: "अनुप्रयोग",
    applicationsList: [
      "ग्रिड-स्केल ऊर्जा भंडारण",
      "इलेक्ट्रिक वाहन चार्जिंग स्टेशन",
      "आवासीय सौर प्रणाली",
      "औद्योगिक बैकअप पावर",
      "नवीकरणीय ऊर्जा एकीकरण",
    ],
  },
  kn: {
    backButton: "ಸೇವೆಗಳಿಗೆ ಹಿಂತಿರುಗಿ",
    title: "ಜಿಂಕ್-ಚಾಲಿತ ಕೋಶಗಳು",
    subtitle: "ಕ್ರಾಂತಿಕಾರಿ ಶಕ್ತಿ ಸಂಗ್ರಹ ತಂತ್ರಜ್ಞಾನ",
    overview: "ಅವಲೋಕನ",
    overviewText:
      "ನಮ್ಮ ಜಿಂಕ್-ಅಯಾನ್ ಬ್ಯಾಟರಿ ತಂತ್ರಜ್ಞಾನವು ಸುಸ್ಥಿರ ಶಕ್ತಿ ಸಂಗ್ರಹಣೆಯಲ್ಲಿ ಒಂದು ಪ್ರಗತಿಯನ್ನು ಪ್ರತಿನಿಧಿಸುತ್ತದೆ, ಸಾಂಪ್ರದಾಯಿಕ ಲಿಥಿಯಂ-ಅಯಾನ್ ಪರಿಹಾರಗಳಿಗೆ ಹೋಲಿಸಿದರೆ ಉತ್ತಮ ಸುರಕ್ಷತೆ, ದೀರ್ಘಾಯುಷ್ಯ ಮತ್ತು ಪರಿಸರ ಪ್ರಯೋಜನಗಳನ್ನು ನೀಡುತ್ತದೆ।",
    keyFeatures: "ಮುಖ್ಯ ವೈಶಿಷ್ಟ್ಯಗಳು",
    features: [
      "ವಿಷಕಾರಿಯಲ್ಲದ ಮತ್ತು ಪರಿಸರಕ್ಕೆ ಸುರಕ್ಷಿತ",
      "ಉತ್ತಮ ಉಷ್ಣ ಸ್ಥಿರತೆ",
      "ವಿಸ್ತೃತ ಚಕ್ರ ಜೀವನ (5000+ ಚಕ್ರಗಳು)",
      "ವೆಚ್ಚ-ಪರಿಣಾಮಕಾರಿ ಉತ್ಪಾದನೆ",
      "ಮರುಬಳಕೆ ಮಾಡಬಹುದಾದ ವಸ್ತುಗಳು",
      "ಹೆಚ್ಚಿನ ಶಕ್ತಿ ಸಾಂದ್ರತೆ",
    ],
    specifications: "ತಾಂತ್ರಿಕ ವಿಶೇಷಣಗಳು",
    specs: {
      "ಶಕ್ತಿ ಸಾಂದ್ರತೆ": "150 Wh/kg",
      "ಚಕ್ರ ಜೀವನ": "5000+ ಚಕ್ರಗಳು",
      "ಕಾರ್ಯಾಚರಣೆ ತಾಪಮಾನ": "-20°C ರಿಂದ +60°C",
      ದಕ್ಷತೆ: "95%",
      "ಸ್ವಯಂ-ವಿಸರ್ಜನೆ": "<3% ತಿಂಗಳಿಗೆ",
      "ಸುರಕ್ಷತೆ ರೇಟಿಂಗ್": "UL 9540A ಪ್ರಮಾಣೀಕೃತ",
    },
    applications: "ಅನ್ವಯಗಳು",
    applicationsList: [
      "ಗ್ರಿಡ್-ಸ್ಕೇಲ್ ಶಕ್ತಿ ಸಂಗ್ರಹಣೆ",
      "ಎಲೆಕ್ಟ್ರಿಕ್ ವಾಹನ ಚಾರ್ಜಿಂಗ್ ಸ್ಟೇಷನ್‌ಗಳು",
      "ವಸತಿ ಸೌರ ವ್ಯವಸ್ಥೆಗಳು",
      "ಕೈಗಾರಿಕಾ ಬ್ಯಾಕಪ್ ಪವರ್",
      "ನವೀಕರಿಸಬಹುದಾದ ಶಕ್ತಿ ಏಕೀಕರಣ",
    ],
  },
};

export default function ZincCellsCaseStudy() {
  const router = useRouter();
  const [currentLang, setCurrentLang] = useState("en");
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const savedLang = localStorage.getItem("language") || "en";
    setCurrentLang(savedLang);

    const handleLanguageChange = (event: CustomEvent) => {
      setCurrentLang(event.detail.language);
    };

    // Scroll animation observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.getAttribute("data-section");
          if (entry.isIntersecting && sectionId) {
            setVisibleSections((prev) => [...prev, sectionId]);
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    window.addEventListener(
      "languageChange",
      handleLanguageChange as EventListener
    );

    return () => {
      window.removeEventListener(
        "languageChange",
        handleLanguageChange as EventListener
      );
      Object.values(sectionRefs.current).forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const currentTranslation =
    translations[currentLang as keyof typeof translations] || translations.en;

  return (
    <main className="bg-black text-white min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

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
        </div>

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

        h1:hover {
          animation: none;
          transform: scale(1.02);
          transition: transform 0.3s ease;
        }
      `}</style>

      {/* Content Sections */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Overview & Key Features Grid */}
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
              <p className="text-white/80 leading-relaxed text-sm">
                {currentTranslation.overviewText}
              </p>
            </div>

            <div
              ref={(el) => {
                sectionRefs.current["features-right"] = el;
              }}
              data-section="features-right"
              className={`border border-white/20 rounded-lg p-8 transition-all duration-1000 ease-out delay-200 backdrop-blur-lg bg-black/30 ${
                visibleSections.includes("features-right")
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-20"
              }`}
            >
              <h2 className="text-xl font-medium tracking-wider mb-6">
                {currentTranslation.keyFeatures}
              </h2>
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
          </div>

          {/* Specifications & Applications */}
          <div className="mb-16">
            <h2 className="text-2xl font-medium tracking-wider mb-8 text-center">
              TECHNICAL SPECIFICATIONS & APPLICATIONS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                  {currentTranslation.specifications}
                </h3>
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
