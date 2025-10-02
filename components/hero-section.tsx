"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import EvapSolarAnimation from "@/components/evap-solar-animation";
import Image from "next/image";

const languages = [
  "EVAP SOLAR", // English
  "इवैप सोलर", // Hindi
  "इভ্যাপ সোলার", // Bengali
  "ஈவாப் சோலார்", // Tamil
  "ఈవాప్ సోలార్", // Telugu
  "ಇವಾಪ್ ಸೋಲಾರ್", // Kannada
  "ഇവാപ് സോളാർ", // Malayalam
  "इव्हॅप सोलर", // Marathi
  "ઇવેપ સોલર", // Gujarati
  "ਇਵੈਪ ਸੋਲਰ", // Punjabi
];

const translations = {
  en: {
    tagline: "WE POWER THE WORLD WITHOUT BURNING IT",
    heroTitle1: "EVAPSOLAR",
    subtitle: "WE POWER THE WORLD WITHOUT BURNING IT",
    logoAlt: "EVAP Solar Logo - Sustainable Energy Solutions",
    backgroundVideoAlt: "Clean energy infrastructure background video",
  },
  hi: {
    tagline: "हम दुनिया को जलाए बिना शक्ति देते हैं",
    heroTitle1: "EVAPSOLAR",
    subtitle: "हम दुनिया को जलाए बिना शक्ति देते हैं",
    logoAlt: "EVAP सोलर लोगो - स्थायी ऊर्जा समाधान",
    backgroundVideoAlt: "स्वच्छ ऊर्जा अवसंरचना पृष्ठभूमि वीडियो",
  },
  kn: {
    tagline: "ನಾವು ಜಗತ್ತನ್ನು ಸುಡದೆ ಶಕ್ತಿ ನೀಡುತ್ತೇವೆ",
    heroTitle1: "EVAPSOLAR",
    subtitle: "ನಾವು ಜಗತ್ತನ್ನು ಸುಡದೆ ಶಕ್ತಿ ನೀಡುತ್ತೇವೆ",
    logoAlt: "EVAP ಸೋಲಾರ್ ಲೋಗೋ - ಸಮರ್ಥನೀಯ ಶಕ್ತಿ ಪರಿಹಾರಗಳು",
    backgroundVideoAlt: "ಶುದ್ಧ ಶಕ್ತಿ ಮೂಲಸೌಕರ್ಯ ಹಿನ್ನೆಲೆ ವೀಡಿಯೋ",
  },
};

export function HeroSection() {
  const [showStartup, setShowStartup] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("language") || "en";
    setCurrentLang(savedLang);

    // Check if startup animation has been shown in this session
    const hasShownStartup = sessionStorage.getItem("hasShownStartup");
    if (!hasShownStartup) {
      setShowStartup(true);
    }

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

  const handleAnimationComplete = () => {
    setShowStartup(false);
    // Mark startup animation as shown for this session
    sessionStorage.setItem("hasShownStartup", "true");
  };

  // Utility function to reset startup animation (for debugging)
  const resetStartupAnimation = () => {
    sessionStorage.removeItem("hasShownStartup");
    setShowStartup(true);
  };

  // Make resetStartupAnimation available globally for debugging
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).resetStartupAnimation = resetStartupAnimation;
    }

    return () => {
      if (typeof window !== "undefined") {
        delete (window as any).resetStartupAnimation;
      }
    };
  }, []);

  const currentTranslation =
    translations[currentLang as keyof typeof translations] || translations.en;

  if (showStartup) {
    return (
      <section
        id="home"
        className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black"
      >
        <EvapSolarAnimation
          onComplete={handleAnimationComplete}
          className="fixed inset-0 z-50"
          playSound={true}
        />
      </section>
    );
  }

  return (
    <section id="home" className="relative overflow-hidden bg-black">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        >
          <source src="/background-video.mp4" type="video/mp4" />
        </video>
        {/* Video overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <motion.div
        className="relative z-10 mx-auto px-4 sm:px-6 max-w-6xl min-h-[100svh] md:min-h-[calc(100vh-0px)] flex flex-col items-center justify-center gap-8 md:gap-12 pt-20 md:pt-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="text-center">
          <motion.div
            className="mb-6 md:mb-8 flex justify-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <Image
              src="/evap logo.png"
              alt={currentTranslation.logoAlt}
              width={800}
              height={400}
              className="w-auto h-20 sm:h-24 md:h-32 lg:h-40 antialiased"
              style={{
                imageRendering: "crisp-edges",
              }}
              quality={100}
              priority
            />
          </motion.div>

          <motion.div
            className="mx-auto border-t border-white/30 pt-4 mb-6 md:mb-8"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "300px" }}
            transition={{ duration: 1, delay: 1.5 }}
          />

          <motion.p
            className="text-lg sm:text-xl md:text-2xl font-mono text-white/80 tracking-wider cursor-default max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.7 }}
          >
            {currentTranslation.subtitle}
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
