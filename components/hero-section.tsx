"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import EvapSolarAnimation from "@/components/evap-solar-animation"
import { ScrollReveal, FloatingElement } from "@/components/ui/floating-elements"

const languages = [
  "EVAP SOLAR",
  "इवैप सोलर",
  "ইভ্যাপ সোলার",
  "ஈவாப் சோலார்",
  "ఈవాప్ సోలార్",
  "ಇವಾಪ್ ಸೋಲಾರ್",
  "ഇവാപ് സോളാർ",
  "इव्हॅप सोलर",
  "ઇવેપ સોલર",
  "ਇਵੈਪ ਸੋਲਰ",
]

const translations = {
  en: {
    tagline: "PIONEERING INDIA'S CLEAN ENERGY FUTURE",
    subtitle: "Grid-independent • Autonomous • Renewable-powered",
    description:
      "India's first modular, off-grid solar EV charging system. We design, build and deploy autonomous clean energy solutions that work where the grid doesn't.",
    cta: "EXPLORE SOLUTIONS",
  },
  hi: {
    tagline: "भारत के स्वच्छ ऊर्जा भविष्य का नेतृत्व",
    subtitle: "ग्रिड-स्वतंत्र • स्वायत्त • नवीकरणीय-संचालित",
    description:
      "भारत की पहली मॉड्यूलर, ऑफ-ग्रिड सोलर ईवी चार्जिंग प्रणाली। हम स्वायत्त स्वच्छ ऊर्जा समाधान डिज़ाइन, निर्माण और तैनात करते हैं।",
    cta: "समाधान देखें",
  },
  kn: {
    tagline: "ಭಾರತದ ಶುದ್ಧ ಶಕ್ತಿ ಭವಿಷ್ಯದ ಮುಂಚೂಣಿ",
    subtitle: "ಗ್ರಿಡ್-ಸ್ವತಂತ್ರ • ಸ್ವಾಯತ್ತ • ನವೀಕರಿಸಬಹುದಾದ-ಶಕ್ತಿ",
    description:
      "ಭಾರತದ ಮೊದಲ ಮಾಡ್ಯುಲರ್, ಆಫ್-ಗ್ರಿಡ್ ಸೋಲಾರ್ ಇವಿ ಚಾರ್ಜಿಂಗ್ ವ್ಯವಸ್ಥೆ. ನಾವು ಸ್ವಾಯತ್ತ ಶುದ್ಧ ಶಕ್ತಿ ಪರಿಹಾರಗಳನ್ನು ವಿನ್ಯಾಸಗೊಳಿಸುತ್ತೇವೆ.",
    cta: "ಪರಿಹಾರಗಳನ್ನು ಅನ್ವೇಷಿಸಿ",
  },
}

export function HeroSection() {
  const [showStartup, setShowStartup] = useState(false)
  const [showSplash, setShowSplash] = useState(false)
  const [currentLangIndex, setCurrentLangIndex] = useState(0)
  const [currentLang, setCurrentLang] = useState("en")

  useEffect(() => {
    const hasShownStartup = sessionStorage.getItem("hasShownStartup")
    if (!hasShownStartup) {
      setShowSplash(true)
    }
  }, [])

  useEffect(() => {
    const savedLang = localStorage.getItem("language") || "en"
    setCurrentLang(savedLang)

    const handleLanguageChange = (event: CustomEvent) => {
      setCurrentLang(event.detail.language)
    }

    window.addEventListener("languageChange", handleLanguageChange as EventListener)
    return () => window.removeEventListener("languageChange", handleLanguageChange as EventListener)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLangIndex((prev) => (prev + 1) % languages.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const handleAnimationComplete = useCallback(() => {
    setShowStartup(false)
    setShowSplash(false)
    sessionStorage.setItem("hasShownStartup", "true")
  }, [])

  const handleSplashClick = useCallback(() => {
    setShowSplash(false)
    setShowStartup(true)
  }, [])

  // Utility function to reset startup animation (for debugging)
  useEffect(() => {
    if (typeof window !== "undefined") {
      ;(window as any).resetStartupAnimation = () => {
        sessionStorage.removeItem("hasShownStartup")
        setShowSplash(true)
        setShowStartup(false)
      }
    }
    return () => {
      if (typeof window !== "undefined") {
        delete (window as any).resetStartupAnimation
      }
    }
  }, [])

  const t = translations[currentLang as keyof typeof translations] || translations.en

  if (showSplash) {
    return (
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
        <motion.button
          onClick={handleSplashClick}
          className="flex flex-col items-center gap-6 cursor-pointer focus:outline-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="text-4xl md:text-6xl font-mono font-bold text-white tracking-wider"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            EVAP SOLAR
          </motion.div>
          <motion.div
            className="text-sm font-mono text-white/50 tracking-widest"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            TAP TO ENTER
          </motion.div>
          <motion.div
            className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-0 h-0 border-l-[8px] border-l-white/60 border-y-[6px] border-y-transparent ml-1" />
          </motion.div>
        </motion.button>
      </section>
    )
  }

  if (showStartup) {
    return (
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
        <EvapSolarAnimation onComplete={handleAnimationComplete} className="fixed inset-0 z-50" playSound={true} />
      </section>
    )
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background dark:bg-black">
      <FloatingElement delay={0} amplitude={8} className="absolute top-20 left-10 opacity-10">
        <div className="w-1 h-1 bg-foreground dark:bg-white rounded-full" />
      </FloatingElement>
      <FloatingElement delay={2} amplitude={6} className="absolute bottom-20 right-20 opacity-10">
        <div className="w-1 h-1 bg-foreground dark:bg-white rounded-full" />
      </FloatingElement>
      <FloatingElement delay={4} amplitude={10} className="absolute top-40 right-1/4 opacity-5">
        <div className="w-2 h-2 bg-foreground dark:bg-white rounded-full" />
      </FloatingElement>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <ScrollReveal delay={0.1}>
          <div className="flex justify-center mb-6">
            <Image
              src="/evap logo.avif"
              alt="EVAP Solar Logo"
              width={100}
              height={100}
              className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500 object-contain"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          {/* Language cycling accent */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentLangIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <span className="text-sm font-mono text-foreground/40 dark:text-white/40 tracking-widest">
                {languages[currentLangIndex]}
              </span>
            </motion.div>
          </AnimatePresence>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-mono text-foreground dark:text-white tracking-tight mb-6 leading-tight">
            {t.tagline}
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.6}>
          {/* Geometric divider */}
          <div className="flex items-center justify-center gap-4 my-8">
            <div className="w-12 h-px bg-foreground/30 dark:bg-white/30" />
            <div className="w-2 h-2 border border-foreground/30 dark:border-white/30 rotate-45" />
            <div className="w-12 h-px bg-foreground/30 dark:bg-white/30" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.8}>
          <p className="text-sm md:text-base font-mono text-foreground/60 dark:text-white/60 tracking-wider mb-6">
            {t.subtitle}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={1.0}>
          <p className="text-sm md:text-base font-mono text-foreground/50 dark:text-white/50 max-w-3xl mx-auto leading-relaxed mb-10">
            {t.description}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={1.2}>
          <button
            onClick={() => {
              const servicesEl = document.getElementById("services")
              if (servicesEl) {
                servicesEl.scrollIntoView({ behavior: "smooth" })
              }
            }}
            className="px-8 py-3 border border-foreground/30 dark:border-white/30 text-foreground dark:text-white font-mono text-sm tracking-wider hover:bg-foreground/5 dark:hover:bg-white/5 transition-all duration-300"
          >
            {t.cta}
          </button>
        </ScrollReveal>
      </div>
    </section>
  )
}
