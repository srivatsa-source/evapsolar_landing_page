"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ScrollReveal, FloatingElement } from "@/components/ui/floating-elements"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const translations = {
  en: {
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

export default function EVChargingStationCaseStudy() {
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
