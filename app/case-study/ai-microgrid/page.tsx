"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ScrollReveal, FloatingElement } from "@/components/ui/floating-elements"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const translations = {
  en: {
    title: "AI-OPTIMIZED MICROGRID",
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
    title: "एआई-अनुकूलित माइक्रोग्रिड",
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
    applicationsList: ["स्मार्ट सिटी अवसंरचना", "औद्योगिक परिसर", "विश्वविद्यालय परिसर", "अस्पताल प्रणाली", "डेटा सेंटर संचालन"],
  },
  kn: {
    title: "AI-ಅನುಕೂಲಿತ ಮೈಕ್ರೋಗ್ರಿಡ್",
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
}

export default function AIMicrogridCaseStudy() {
  const [currentLang, setCurrentLang] = useState("en")

  useEffect(() => {
    const savedLang = localStorage.getItem("language") || "en"
    setCurrentLang(savedLang)

    const handleLanguageChange = (event: CustomEvent) => {
      setCurrentLang(event.detail.language)
    }

    window.addEventListener("languageChange", handleLanguageChange as EventListener)
    return () => window.removeEventListener("languageChange", handleLanguageChange as EventListener)
  }, [])

  const currentTranslation = translations[currentLang as keyof typeof translations] || translations.en

  return (
    <main className="bg-black text-white min-h-screen">
      <Navigation />

      <section className="min-h-screen flex items-center py-20 relative bg-black">
        <FloatingElement delay={0.5} amplitude={15} className="absolute top-20 left-10 opacity-10">
          <div className="w-2 h-2 bg-white rounded-full" />
        </FloatingElement>
        <FloatingElement delay={1.2} amplitude={12} className="absolute bottom-32 right-20 opacity-10">
          <div className="w-1 h-1 bg-white rounded-full" />
        </FloatingElement>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <ScrollReveal delay={0.2}>
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-8xl font-mono text-white mb-4 tracking-wider">
                {currentTranslation.title}
              </h1>
              <div className="geometric-line w-32 mb-8 mx-auto" />
              <p className="text-lg md:text-xl font-mono text-white/80 tracking-wider">{currentTranslation.subtitle}</p>
            </motion.div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <ScrollReveal delay={0.4}>
              <div className="backdrop-blur-md bg-black/40 border border-white/20 rounded-2xl p-8">
                <h2 className="text-2xl font-mono text-white mb-6 tracking-wider">{currentTranslation.overview}</h2>
                <p className="text-white/80 font-mono text-sm leading-relaxed">{currentTranslation.overviewText}</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.6}>
              <div className="backdrop-blur-md bg-black/40 border border-white/20 rounded-2xl p-8">
                <h2 className="text-2xl font-mono text-white mb-6 tracking-wider">{currentTranslation.keyFeatures}</h2>
                <div className="space-y-3">
                  {currentTranslation.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <span className="text-white mt-1 text-xs">▸</span>
                      <span className="font-mono text-sm text-white/70 leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <ScrollReveal delay={0.8}>
              <div className="backdrop-blur-md bg-black/40 border border-white/20 rounded-2xl p-8">
                <h2 className="text-2xl font-mono text-white mb-6 tracking-wider">
                  {currentTranslation.specifications}
                </h2>
                <div className="space-y-4">
                  {Object.entries(currentTranslation.specs).map(([label, value], index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-3 border-b border-white/10 last:border-b-0"
                    >
                      <span className="font-mono text-white/60 text-sm tracking-wider">{label}:</span>
                      <span className="font-mono text-white text-sm tracking-wider">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={1.0}>
              <div className="backdrop-blur-md bg-black/40 border border-white/20 rounded-2xl p-8">
                <h2 className="text-2xl font-mono text-white mb-6 tracking-wider">{currentTranslation.applications}</h2>
                <div className="space-y-3">
                  {currentTranslation.applicationsList.map((application, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <span className="text-white mt-1 text-xs">▸</span>
                      <span className="font-mono text-sm text-white/70 leading-relaxed">{application}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
