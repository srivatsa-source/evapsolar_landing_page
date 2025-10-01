"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ScrollReveal, FloatingElement } from "@/components/ui/floating-elements"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const translations = {
  en: {
    title: "AUTONOMOUS CHARGING SYSTEM",
    subtitle: "SELF-MANAGING EV INFRASTRUCTURE",
    overview: "OVERVIEW",
    overviewText:
      "Our autonomous charging system revolutionizes EV infrastructure through fully automated, self-managing charging stations that operate without human intervention, utilizing advanced robotics, AI, and IoT technologies for seamless vehicle-to-infrastructure communication.",
    keyFeatures: "KEY FEATURES",
    features: [
      "Fully automated operation",
      "Robotic charging connectors",
      "Vehicle identification and authentication",
      "Self-diagnostic and repair capabilities",
      "Dynamic scheduling optimization",
      "Contactless payment integration",
    ],
    specifications: "TECHNICAL SPECIFICATIONS",
    specs: {
      "Automation Level": "Level 5 (Full autonomy)",
      "Charging Speed": "350 kW ultra-fast",
      "Connection Time": "<30 seconds automated",
      Uptime: "99.8% autonomous operation",
      "Vehicle Compatibility": "Universal connector system",
      Maintenance: "Predictive self-service",
    },
    applications: "APPLICATIONS",
    applicationsList: [
      "Autonomous vehicle fleets",
      "Smart parking garages",
      "Highway service centers",
      "Corporate campuses",
      "Residential complexes",
    ],
  },
  hi: {
    title: "स्वायत्त चार्जिंग सिस्टम",
    subtitle: "स्व-प्रबंधित ईवी अवसंरचना",
    overview: "अवलोकन",
    overviewText:
      "हमारा स्वायत्त चार्जिंग सिस्टम पूरी तरह से स्वचालित, स्व-प्रबंधित चार्जिंग स्टेशनों के माध्यम से ईवी अवसंरचना में क्रांति लाता है जो मानवीय हस्तक्षेप के बिना संचालित होते हैं, निर्बाध वाहन-से-अवसंरचना संचार के लिए उन्नत रोबोटिक्स, एआई और आईओटी तकनीकों का उपयोग करते हैं।",
    keyFeatures: "मुख्य विशेषताएं",
    features: [
      "पूर्णतः स्वचालित संचालन",
      "रोबोटिक चार्जिंग कनेक्टर",
      "वाहन पहचान और प्रमाणीकरण",
      "स्व-निदान और मरम्मत क्षमताएं",
      "गतिशील शेड्यूलिंग अनुकूलन",
      "संपर्क रहित भुगतान एकीकरण",
    ],
    specifications: "तकनीकी विनिर्देश",
    specs: {
      "स्वचालन स्तर": "स्तर 5 (पूर्ण स्वायत्तता)",
      "चार्जिंग गति": "350 kW अल्ट्रा-फास्ट",
      "कनेक्शन समय": "<30 सेकंड स्वचालित",
      अपटाइम: "99.8% स्वायत्त संचालन",
      "वाहन संगतता": "सार्वभौमिक कनेक्टर सिस्टम",
      रखरखाव: "भविष्यसूचक स्व-सेवा",
    },
    applications: "अनुप्रयोग",
    applicationsList: ["स्वायत्त वाहन बेड़े", "स्मार्ट पार्किंग गैरेज", "हाईवे सेवा केंद्र", "कॉर्पोरेट परिसर", "आवासीय परिसर"],
  },
  kn: {
    title: "ಸ್ವಾಯತ್ತ ಚಾರ್ಜಿಂಗ್ ಸಿಸ್ಟಂ",
    subtitle: "ಸ್ವಯಂ-ನಿರ್ವಹಣೆ ಇವಿ ಮೂಲಸೌಕರ್ಯ",
    overview: "ಅವಲೋಕನ",
    overviewText:
      "ನಮ್ಮ ಸ್ವಾಯತ್ತ ಚಾರ್ಜಿಂಗ್ ಸಿಸ್ಟಂ ಸಂಪೂರ್ಣವಾಗಿ ಸ್ವಯಂಚಾಲಿತ, ಸ್ವಯಂ-ನಿರ್ವಹಣೆ ಚಾರ್ಜಿಂಗ್ ಸ್ಟೇಷನ್‌ಗಳ ಮೂಲಕ ಇವಿ ಮೂಲಸೌಕರ್ಯದಲ್ಲಿ ಕ್ರಾಂತಿ ಮಾಡುತ್ತದೆ, ಇದು ಮಾನವ ಹಸ್ತಕ್ಷೇಪವಿಲ್ಲದೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ, ನಿರ್ಬಾಧ ವಾಹನ-ಮೂಲಸೌಕರ್ಯ ಸಂವಹನಕ್ಕಾಗಿ ಸುಧಾರಿತ ರೊಬೊಟಿಕ್ಸ್, AI ಮತ್ತು IoT ತಂತ್ರಜ್ಞಾನಗಳನ್ನು ಬಳಸುತ್ತದೆ।",
    keyFeatures: "ಮುಖ್ಯ ವೈಶಿಷ್ಟ್ಯಗಳು",
    features: [
      "ಸಂಪೂರ್ಣ ಸ್ವಯಂಚಾಲಿತ ಕಾರ್ಯಾಚರಣೆ",
      "ರೊಬೊಟಿಕ್ ಚಾರ್ಜಿಂಗ್ ಕನೆಕ್ಟರ್‌ಗಳು",
      "ವಾಹನ ಗುರುತಿಸುವಿಕೆ ಮತ್ತು ದೃಢೀಕರಣ",
      "ಸ್ವಯಂ-ರೋಗನಿರ್ಣಯ ಮತ್ತು ದುರಸ್ತಿ ಸಾಮರ್ಥ್ಯಗಳು",
      "ಡೈನಾಮಿಕ್ ಶೆಡ್ಯೂಲಿಂಗ್ ಅನುಕೂಲನ",
      "ಸಂಪರ್ಕರಹಿತ ಪಾವತಿ ಏಕೀಕರಣ",
    ],
    specifications: "ತಾಂತ್ರಿಕ ವಿಶೇಷಣಗಳು",
    specs: {
      "ಸ್ವಯಂಚಾಲನ ಮಟ್ಟ": "ಮಟ್ಟ 5 (ಸಂಪೂರ್ಣ ಸ್ವಾಯತ್ತತೆ)",
      "ಚಾರ್ಜಿಂಗ್ ವೇಗ": "350 kW ಅಲ್ಟ್ರಾ-ಫಾಸ್ಟ್",
      "ಸಂಪರ್ಕ ಸಮಯ": "<30 ಸೆಕೆಂಡುಗಳು ಸ್ವಯಂಚಾಲಿತ",
      ಅಪ್‌ಟೈಮ್: "99.8% ಸ್ವಾಯತ್ತ ಕಾರ್ಯಾಚರಣೆ",
      "ವಾಹನ ಹೊಂದಾಣಿಕೆ": "ಸಾರ್ವತ್ರಿಕ ಕನೆಕ್ಟರ್ ಸಿಸ್ಟಂ",
      ನಿರ್ವಹಣೆ: "ಭವಿಷ್ಯಸೂಚಕ ಸ್ವಯಂ-ಸೇವೆ",
    },
    applications: "ಅನ್ವಯಗಳು",
    applicationsList: [
      "ಸ್ವಾಯತ್ತ ವಾಹನ ಫ್ಲೀಟ್‌ಗಳು",
      "ಸ್ಮಾರ್ಟ್ ಪಾರ್ಕಿಂಗ್ ಗ್ಯಾರೇಜ್‌ಗಳು",
      "ಹೈವೇ ಸೇವಾ ಕೇಂದ್ರಗಳು",
      "ಕಾರ್ಪೊರೇಟ್ ಕ್ಯಾಂಪಸ್‌ಗಳು",
      "ವಸತಿ ಸಂಕೀರ್ಣಗಳು",
    ],
  },
}

export default function AutonomousChargingCaseStudy() {
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
