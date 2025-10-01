"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ScrollReveal, FloatingElement } from "@/components/ui/floating-elements"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const translations = {
  en: {
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
}

export default function ZincCellsCaseStudy() {
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
