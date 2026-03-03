"use client"
import { ScrollReveal, FloatingElement } from "@/components/ui/floating-elements"
import { useState, useEffect } from "react"

const translations = {
  en: {
    title: "ENERGY STORAGE APPLICATIONS",
    useCases: [
      {
        title: "Utility & Grid Support",
        description: "Balance supply and demand while integrating renewables.",
      },
      {
        title: "Residential Energy",
        description: "Reliable backup and smart home energy management.",
      },
      {
        title: "Business & Industry",
        description: "Reduce downtime, cut costs, and meet sustainability goals.",
      },
      {
        title: "Critical Infrastructure",
        description: "Non-flammable chemistry for hospitals, telecom, and emergency services.",
      },
    ],
  },
  hi: {
    title: "ऊर्जा भंडारण अनुप्रयोग",
    useCases: [
      {
        title: "उपयोगिता और ग्रिड समर्थन",
        description: "नवीकरणीय ऊर्जा को एकीकृत करते हुए आपूर्ति और मांग को संतुलित करें।",
      },
      {
        title: "आवासीय ऊर्जा",
        description: "विश्वसनीय बैकअप और स्मार्ट होम ऊर्जा प्रबंधन।",
      },
      {
        title: "व्यवसाय और उद्योग",
        description: "डाउनटाइम कम करें, लागत घटाएं, और स्थिरता लक्ष्यों को पूरा करें।",
      },
      {
        title: "महत्वपूर्ण अवसंरचना",
        description: "अस्पतालों, दूरसंचार और आपातकालीन सेवाओं के लिए गैर-ज्वलनशील रसायन।",
      },
    ],
  },
  kn: {
    title: "ಶಕ್ತಿ ಸಂಗ್ರಹ ಅಪ್ಲಿಕೇಶನ್‌ಗಳು",
    useCases: [
      {
        title: "ಉಪಯುಕ್ತತೆ ಮತ್ತು ಗ್ರಿಡ್ ಬೆಂಬಲ",
        description: "ನವೀಕರಿಸಬಹುದಾದ ಶಕ್ತಿಯನ್ನು ಸಂಯೋಜಿಸುವಾಗ ಪೂರೈಕೆ ಮತ್ತು ಬೇಡಿಕೆಯನ್ನು ಸಮತೋಲನಗೊಳಿಸಿ।",
      },
      {
        title: "ವಸತಿ ಶಕ್ತಿ",
        description: "ವಿಶ್ವಾಸಾರ್ಹ ಬ್ಯಾಕಪ್ ಮತ್ತು ಸ್ಮಾರ್ಟ್ ಹೋಮ್ ಶಕ್ತಿ ನಿರ್ವಹಣೆ।",
      },
      {
        title: "ವ್ಯಾಪಾರ ಮತ್ತು ಉದ್ಯಮ",
        description: "ಡೌನ್‌ಟೈಮ್ ಕಡಿಮೆ ಮಾಡಿ, ವೆಚ್ಚಗಳನ್ನು ಕಡಿತಗೊಳಿಸಿ ಮತ್ತು ಸಮರ್ಥನೀಯತೆ ಗುರಿಗಳನ್ನು ಪೂರೈಸಿ।",
      },
      {
        title: "ನಿರ್ಣಾಯಕ ಮೂಲಸೌಕರ್ಯ",
        description: "ಆಸ್ಪತ್ರೆಗಳು, ದೂರಸಂಪರ್ಕ ಮತ್ತು ತುರ್ತು ಸೇವೆಗಳಿಗೆ ದಹಿಸದ ರಸಾಯನಶಾಸ್ತ್ರ।",
      },
    ],
  },
}

export function ApplicationsSection() {
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
    <section id="applications" className="min-h-screen flex items-center py-20 relative bg-black">
      <FloatingElement delay={2} amplitude={10} className="absolute top-40 right-16 opacity-10">
        <div className="w-2 h-2 bg-white rounded-full" />
      </FloatingElement>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <ScrollReveal delay={0.2}>
          <h2 className="text-2xl md:text-4xl font-mono text-white mb-4 tracking-wider text-center">
            {currentTranslation.title}
          </h2>
          <div className="geometric-line w-32 mb-16 mx-auto" />
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8">
          {currentTranslation.useCases.map((useCase, index) => (
            <ScrollReveal key={index} delay={0.4 + index * 0.1}>
              <div className="border border-white/20 rounded-lg p-8 backdrop-blur-sm bg-white/5 group">
                <div className="text-4xl font-mono text-white/20 mb-4 group-hover:text-white/40 transition-colors duration-300">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="text-lg font-mono mb-4 text-white tracking-wider">{useCase.title}</h3>
                <p className="text-white/60 font-mono leading-relaxed text-sm tracking-wide">{useCase.description}</p>

                <div className="w-0 h-px bg-white mt-6 group-hover:w-full transition-all duration-500" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
