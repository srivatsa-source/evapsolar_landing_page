"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ScrollReveal, FloatingElement } from "@/components/ui/floating-elements"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

const translations = {
  en: {
    backButton: "Back to Services",
    title: "EV CHARGING STATION",
    subtitle: "SOLAR-POWERED CHARGING INFRASTRUCTURE",
    overview: "OVERVIEW",
    overviewText:
      "Our solar-powered EV charging stations represent the future of sustainable transportation infrastructure, combining advanced photovoltaic technology with intelligent energy management systems to provide clean, reliable charging solutions.",
    keyFeatures: "KEY FEATURES",
    features: [
      "100% solar-powered operation",
      "Grid-independent functionality",
      "Smart energy storage integration",
      "Weather-adaptive charging algorithms",
      "Real-time performance monitoring",
      "Modular scalable design",
    ],
    specifications: "TECHNICAL SPECIFICATIONS",
    specs: {
      "Solar Capacity": "50 kW peak",
      "Charging Power": "22 kW DC fast charging",
      "Battery Storage": "100 kWh integrated",
      Efficiency: "92% system efficiency",
      Uptime: "99.5% availability",
      Installation: "Plug-and-play deployment",
    },
    applications: "APPLICATIONS",
    applicationsList: [
      "Highway rest stops",
      "Urban parking facilities",
      "Remote locations",
      "Commercial complexes",
      "Residential communities",
    ],
  },
  hi: {
    backButton: "सेवाओं पर वापस जाएं",
    title: "ईवी चार्जिंग स्टेशन",
    subtitle: "सौर-संचालित चार्जिंग अवसंरचना",
    overview: "अवलोकन",
    overviewText:
      "हमारे सौर-संचालित ईवी चार्जिंग स्टेशन टिकाऊ परिवहन अवसंरचना के भविष्य का प्रतिनिधित्व करते हैं, जो स्वच्छ, विश्वसनीय चार्जिंग समाधान प्रदान करने के लिए उन्नत फोटोवोल्टिक तकनीक को बुद्धिमान ऊर्जा प्रबंधन प्रणालियों के साथ जोड़ते हैं।",
    keyFeatures: "मुख्य विशेषताएं",
    features: [
      "100% सौर-संचालित संचालन",
      "ग्रिड-स्वतंत्र कार्यक्षमता",
      "स्मार्ट ऊर्जा भंडारण एकीकरण",
      "मौसम-अनुकूली चार्जिंग एल्गोरिदम",
      "रीयल-टाइम प्रदर्शन निगरानी",
      "मॉड्यूलर स्केलेबल डिज़ाइन",
    ],
    specifications: "तकनीकी विनिर्देश",
    specs: {
      "सौर क्षमता": "50 kW पीक",
      "चार्जिंग पावर": "22 kW DC फास्ट चार्जिंग",
      "बैटरी भंडारण": "100 kWh एकीकृत",
      दक्षता: "92% सिस्टम दक्षता",
      अपटाइम: "99.5% उपलब्धता",
      स्थापना: "प्लग-एंड-प्ले तैनाती",
    },
    applications: "अनुप्रयोग",
    applicationsList: ["हाईवे रेस्ट स्टॉप", "शहरी पार्किंग सुविधाएं", "दूरदराज के स्थान", "वाणिज्यिक परिसर", "आवासीय समुदाय"],
  },
  kn: {
    backButton: "ಸೇವೆಗಳಿಗೆ ಹಿಂತಿರುಗಿ",
    title: "ಇವಿ ಚಾರ್ಜಿಂಗ್ ಸ್ಟೇಷನ್",
    subtitle: "ಸೌರ-ಚಾಲಿತ ಚಾರ್ಜಿಂಗ್ ಮೂಲಸೌಕರ್ಯ",
    overview: "ಅವಲೋಕನ",
    overviewText:
      "ನಮ್ಮ ಸೌರ-ಚಾಲಿತ ಇವಿ ಚಾರ್ಜಿಂಗ್ ಸ್ಟೇಷನ್‌ಗಳು ಸುಸ್ಥಿರ ಸಾರಿಗೆ ಮೂಲಸೌಕರ್ಯದ ಭವಿಷ್ಯವನ್ನು ಪ್ರತಿನಿಧಿಸುತ್ತವೆ, ಸ್ವಚ್ಛ, ವಿಶ್ವಾಸಾರ್ಹ ಚಾರ್ಜಿಂಗ್ ಪರಿಹಾರಗಳನ್ನು ಒದಗಿಸಲು ಸುಧಾರಿತ ಫೋಟೋವೋಲ್ಟಾಯಿಕ್ ತಂತ್ರಜ್ಞಾನವನ್ನು ಬುದ್ಧಿವಂತ ಶಕ್ತಿ ನಿರ್ವಹಣಾ ವ್ಯವಸ್ಥೆಗಳೊಂದಿಗೆ ಸಂಯೋಜಿಸುತ್ತವೆ।",
    keyFeatures: "ಮುಖ್ಯ ವೈಶಿಷ್ಟ್ಯಗಳು",
    features: [
      "100% ಸೌರ-ಚಾಲಿತ ಕಾರ್ಯಾಚರಣೆ",
      "ಗ್ರಿಡ್-ಸ್ವತಂತ್ರ ಕಾರ್ಯಚಟುವಟಿಕೆ",
      "ಸ್ಮಾರ್ಟ್ ಶಕ್ತಿ ಸಂಗ್ರಹಣೆ ಏಕೀಕರಣ",
      "ಹವಾಮಾನ-ಅನುಕೂಲ ಚಾರ್ಜಿಂಗ್ ಅಲ್ಗೋರಿದಮ್‌ಗಳು",
      "ನೈಜ-ಸಮಯ ಕಾರ್ಯಕ್ಷಮತೆ ಮೇಲ್ವಿಚಾರಣೆ",
      "ಮಾಡ್ಯುಲರ್ ಸ್ಕೇಲೆಬಲ್ ವಿನ್ಯಾಸ",
    ],
    specifications: "ತಾಂತ್ರಿಕ ವಿಶೇಷಣಗಳು",
    specs: {
      "ಸೌರ ಸಾಮರ್ಥ್ಯ": "50 kW ಪೀಕ್",
      "ಚಾರ್ಜಿಂಗ್ ಪವರ್": "22 kW DC ಫಾಸ್ಟ್ ಚಾರ್ಜಿಂಗ್",
      "ಬ್ಯಾಟರಿ ಸಂಗ್ರಹಣೆ": "100 kWh ಏಕೀಕೃತ",
      ದಕ್ಷತೆ: "92% ಸಿಸ್ಟಂ ದಕ್ಷತೆ",
      ಅಪ್‌ಟೈಮ್: "99.5% ಲಭ್ಯತೆ",
      ಸ್ಥಾಪನೆ: "ಪ್ಲಗ್-ಅಂಡ್-ಪ್ಲೇ ನಿಯೋಜನೆ",
    },
    applications: "ಅನ್ವಯಗಳು",
    applicationsList: ["ಹೈವೇ ರೆಸ್ಟ್ ಸ್ಟಾಪ್‌ಗಳು", "ನಗರ ಪಾರ್ಕಿಂಗ್ ಸೌಲಭ್ಯಗಳು", "ದೂರದ ಸ್ಥಳಗಳು", "ವಾಣಿಜ್ಯ ಸಂಕೀರ್ಣಗಳು", "ವಸತಿ ಸಮುದಾಯಗಳು"],
  },
}

export default function EVChargingStationPage() {
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

  const currentTranslation = translations[currentLang as keyof typeof translations] || translations.en

  return (
    <main className="bg-black text-white min-h-screen">
      <Navigation />

      {/* Fixed Back to Home Button */}
      <div className="fixed top-20 left-4 z-50">
        <button
          onClick={() => {
            console.log('Back button clicked');
            window.location.href = '/';
          }}
          className="inline-flex items-center justify-center w-12 h-12 bg-black/80 backdrop-blur-sm border border-white/20 rounded-full text-white/70 hover:text-white hover:bg-black/90 transition-all duration-200 cursor-pointer shadow-lg"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
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

        h1:hover {
          animation: none;
          transform: scale(1.02);
          transition: transform 0.3s ease;
        }
      `}</style>

      {/* Content Sections */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Overview & Specifications Grid */}
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
                  Solar-Powered
                </span>
                <span className="px-3 py-1 bg-blue-400/20 text-blue-300 text-sm font-mono rounded">
                  Grid-Free
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
                {Object.entries(currentTranslation.specs).map(([key, value], index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-white/70">{key}:</span>
                    <span className="text-white font-medium">{value}</span>
                  </div>
                ))}
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
  )
}
