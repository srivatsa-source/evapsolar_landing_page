"use client";

import { useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

const sections = [
  { name: "Home", id: "home" },
  { name: "Services", id: "services" },
  { name: "Sustainability", id: "sustainability" },
  { name: "Contact", id: "contact" },
];

const translations = {
  en: {
    sections: {
      Home: "Home",
      Services: "Services",
      Sustainability: "Sustainability",
      Contact: "Contact",
      CaseStudy: "Case Study",
    },
    content: {
      menu: "MENU",
      allYouNeed: "ALL YOU NEED IS /",
      loading: "Loading...",
      evapSolar: "EVAP SOLAR",
      technology: "TECHNOLOGY",
      energy: "ENERGY",
    },
    caseStudies: {
      "rooftop-solar": "ROOFTOP SOLAR",
      "ground-mounted-solar": "GROUND MOUNTED",
      "tin-shed-solar": "TIN SHED SOLAR",
      "garuda-charging-station": "GARUDA CHARGING",
      "ev-charging-station": "EV CHARGING",
      "ai-microgrid": "AI MICROGRID",
      "zinc-cells": "ZINC CELLS",
      "zinc-batteries": "ZINC BATTERIES",
      "solar-cells": "SOLAR CELLS R&D",
      "autonomous-charging": "AUTONOMOUS CHARGING",
    },
  },
  hi: {
    sections: {
      Home: "होम",
      Services: "Services",
      Sustainability: "स्थिरता",
      Contact: "संपर्क",
      CaseStudy: "केस स्टडी",
    },
    content: {
      menu: "मेनू",
      allYouNeed: "आपको बस चाहिए /",
      loading: "लोड हो रहा है...",
      evapSolar: "ईवैप सोलर",
      technology: "तकनीक",
      energy: "ऊर्जा",
    },
    caseStudies: {
      "rooftop-solar": "छत पर सोलर",
      "ground-mounted-solar": "भूमि आधारित",
      "tin-shed-solar": "टिन शेड सोलर",
      "garuda-charging-station": "गरुड़ चार्जिंग",
      "ev-charging-station": "ईवी चार्जिंग",
      "ai-microgrid": "एआई माइक्रोग्रिड",
      "zinc-cells": "जिंक सेल",
      "zinc-batteries": "जिंक बैटरी",
      "solar-cells": "सोलर सेल R&D",
      "autonomous-charging": "स्वचालित चार्जिंग",
    },
  },
  kn: {
    sections: {
      Home: "ಮನೆ",
      Services: "Services",
      Sustainability: "ಸಮರ್ಥನೀಯತೆ",
      Contact: "ಸಂಪರ್ಕ",
      CaseStudy: "ಕೇಸ್ ಸ್ಟೇಡಿ",
    },
    content: {
      menu: "ಮೆನು",
      allYouNeed: "ನಿಮಗೆ ಬೇಕಾಗಿರುವುದು /",
      loading: "ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
      evapSolar: "ಇವ್ಯಾಪ್ ಸೋಲಾರ್",
      technology: "ತಂತ್ರಜ್ಞಾನ",
      energy: "ಶಕ್ತಿ",
    },
    caseStudies: {
      "rooftop-solar": "ಮೇಲ್ಮಾಳಿಗೆ ಸೌರ",
      "ground-mounted-solar": "ನೆಲ ಆಧಾರಿತ",
      "tin-shed-solar": "ಟಿನ್ ಶೆಡ್ ಸೌರ",
      "garuda-charging-station": "ಗರುಡ ಚಾರ್ಜಿಂಗ್",
      "ev-charging-station": "ಇವಿ ಚಾರ್ಜಿಂಗ್",
      "ai-microgrid": "ಎಐ ಮೈಕ್ರೋಗ್ರಿಡ್",
      "zinc-cells": "ಸತು ಕೋಶಗಳು",
      "zinc-batteries": "ಸತು ಬ್ಯಾಟರಿಗಳು",
      "solar-cells": "ಸೌರ ಕೋಶ R&D",
      "autonomous-charging": "ಸ್ವಯಂ ಚಾರ್ಜಿಂಗ್",
    },
  },
};

const switchLanguage = (lang: string) => {
  localStorage.setItem("language", lang);
  window.dispatchEvent(
    new CustomEvent("languageChange", { detail: { language: lang } })
  );
};

export function Navigation() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const savedLang = localStorage.getItem("language") || "en";
    setCurrentLang(savedLang);
    document.documentElement.lang = savedLang;

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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100 && !isVisible) {
        setIsVisible(true);
      }

      if (pathname === "/") {
        const sectionElements = sections
          .map((section) => document.getElementById(section.id))
          .filter(Boolean);

        let currentSectionName = "Home";
        const scrollPosition = window.scrollY + 200;

        for (let i = sectionElements.length - 1; i >= 0; i--) {
          const element = sectionElements[i];
          if (element && element.offsetTop <= scrollPosition) {
            currentSectionName =
              sections.find((s) => s.id === element.id)?.name || "Home";
            break;
          }
        }

        setActiveSection(currentSectionName);
        const sectionIndex = sections.findIndex(
          (s) => s.name === currentSectionName
        );
        setCurrentPage(sectionIndex + 1);
      } else if (pathname.includes("/case-study")) {
        setActiveSection("Case Study");
        setCurrentPage(0);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVisible, pathname, currentLang]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const scrollToSection = (sectionId: string, sectionName: string) => {
    setActiveSection(sectionName);
    setIsMenuOpen(false);

    if (pathname !== "/") {
      window.location.href = `/#${sectionId}`;
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.offsetTop - headerOffset;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  const openServicePanel = (panel: "EPC" | "OEM" | "R & D") => {
    scrollToSection("services", "Services");
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("openServicePanel", { detail: { panel } })
      );
    }, 250);
  };

  const getTranslatedSectionName = (sectionName: string) => {
    return (
      translations[currentLang as keyof typeof translations]?.sections[
        sectionName as keyof typeof translations.en.sections
      ] || sectionName
    );
  };

  const getTranslatedContent = (key: string) => {
    return (
      translations[currentLang as keyof typeof translations]?.content[
        key as keyof typeof translations.en.content
      ] || key
    );
  };

  const getCurrentPageDisplay = () => {
    if (pathname === "/") {
      return getTranslatedSectionName(activeSection).toUpperCase();
    } else if (pathname.includes("/case-study")) {
      const caseStudyPath = pathname.split("/").pop() || "";

      // Get translated case study title
      const translatedTitle =
        translations[currentLang as keyof typeof translations]?.caseStudies[
          caseStudyPath as keyof typeof translations.en.caseStudies
        ];

      return translatedTitle || caseStudyPath.replace(/-/g, " ").toUpperCase();
    }
    return "PAGE";
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4 md:py-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : -20,
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-center w-full max-w-7xl mx-auto">
          {/* Center-aligned navigation with contact and menu */}
          <GlassCard
            variant="floating"
            className="px-4 md:px-6 py-2 rounded-full"
            animate={false}
            aria-label="Navigation"
          >
            <div className="flex items-center space-x-6">
              <span className="text-white font-mono text-sm tracking-wider">
                {getCurrentPageDisplay()}
              </span>
              <span className="text-white/40 select-none">|</span>
              <button
                onClick={() => setIsMenuOpen(true)}
                className="text-white font-mono text-sm tracking-wider hover:text-white/70 transition-colors"
                data-driver="menu-button"
              >
                {getTranslatedContent("menu")}
              </button>
            </div>
          </GlassCard>

          {/* Language selector positioned absolute to top right */}
          <div className="absolute top-0 right-4 md:right-6 flex flex-col items-end space-y-1 mt-1">
            <button
              onClick={() => switchLanguage("hi")}
              className={`language-switch font-mono text-xs tracking-wider ${
                currentLang === "hi" ? "active" : ""
              }`}
              data-driver="language-hindi"
            >
              HI
            </button>
            <button
              onClick={() => switchLanguage("kn")}
              className={`language-switch font-mono text-xs tracking-wider ${
                currentLang === "kn" ? "active" : ""
              }`}
              data-driver="language-kannada"
            >
              KN
            </button>
            <button
              onClick={() => switchLanguage("en")}
              className={`language-switch font-mono text-xs tracking-wider ${
                currentLang === "en" ? "active" : ""
              }`}
              data-driver="language-english"
            >
              EN
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-xl menu-overlay overflow-y-auto"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <div className="h-full flex flex-col md:flex-row">
              <div className="flex-1 flex items-center justify-center md:justify-start px-6 md:pl-16">
                <motion.h1
                  className="leading-none tracking-tighter text-white/10 font-bold text-[18vw] md:text-[12vw] lg:text-[9vw] text-center md:text-left"
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  {getTranslatedContent("menu")}
                </motion.h1>
              </div>

              <div className="flex-1 flex flex-col justify-center items-center md:items-start px-6 md:pr-16">
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-sm sm:max-w-md md:max-w-lg"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  {sections.map((section, index) => (
                    <motion.button
                      key={section.id + section.name}
                      onClick={() => scrollToSection(section.id, section.name)}
                      className={`text-left group menu-grid-item ${
                        activeSection === section.name
                          ? "opacity-100"
                          : "opacity-70 hover:opacity-100"
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      data-driver={`menu-${section.id}`}
                    >
                      <div className="flex items-start space-x-4">
                        <span
                          className={`font-mono text-sm mt-1 ${
                            activeSection === section.name
                              ? "text-white"
                              : "text-white/50"
                          }`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`text-xl sm:text-2xl font-bold tracking-wide transition-colors ${
                            activeSection === section.name
                              ? "text-white"
                              : "text-white/70 group-hover:text-white"
                          }`}
                        >
                          {getTranslatedSectionName(section.name)}
                        </span>
                      </div>
                    </motion.button>
                  ))}

                  {/* Additional quick access buttons */}
                  <motion.div
                    className="col-span-full mt-4 pt-4 border-t border-white/10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <button
                      onClick={() => scrollToSection("contact", "Contact")}
                      className="text-left group opacity-70 hover:opacity-100 transition-opacity"
                    >
                      <div className="flex items-start space-x-4">
                        <span className="font-mono text-sm mt-1 text-white/50">
                          →
                        </span>
                        <span className="text-lg font-bold tracking-wide text-white/70 group-hover:text-white transition-colors">
                          {getTranslatedSectionName("Contact")}
                        </span>
                      </div>
                    </button>
                  </motion.div>
                </motion.div>

                <motion.div
                  className="mt-10 grid grid-cols-3 gap-3 w-full max-w-xs sm:max-w-md"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                >
                  {["EPC", "OEM", "R & D"].map((name) => (
                    <button
                      key={name}
                      onClick={() =>
                        openServicePanel(name as "EPC" | "OEM" | "R & D")
                      }
                      className="px-3 py-2 rounded-md border border-white/20 text-white/80 hover:text-white hover:bg-white/5 font-mono text-[11px] sm:text-xs tracking-wider transition-colors"
                    >
                      {name}
                    </button>
                  ))}
                </motion.div>
              </div>
            </div>

            <motion.button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6 text-white text-3xl hover:text-white/70 transition-colors"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 0.6 }}
            >
              ×
            </motion.button>

            <motion.div
              className="absolute top-6 right-20 flex flex-col items-end space-y-1 md:hidden"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <button
                onClick={() => switchLanguage("hi")}
                className={`language-switch font-mono text-xs tracking-wider ${
                  currentLang === "hi" ? "active" : ""
                }`}
              >
                HI
              </button>
              <button
                onClick={() => switchLanguage("kn")}
                className={`language-switch font-mono text-xs tracking-wider ${
                  currentLang === "kn" ? "active" : ""
                }`}
              >
                KN
              </button>
              <button
                onClick={() => switchLanguage("en")}
                className={`language-switch font-mono text-xs tracking-wider ${
                  currentLang === "en" ? "active" : ""
                }`}
              >
                EN
              </button>
            </motion.div>

            <motion.div
              className="absolute bottom-6 right-6 flex space-x-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <span className="text-white font-mono text-xs tracking-wider hover:text-white/70 transition-colors cursor-pointer">
                LINKEDIN
              </span>
              <span className="text-white font-mono text-xs tracking-wider hover:text-white/70 transition-colors cursor-pointer">
                TWITTER
              </span>
            </motion.div>

            <motion.div
              className="absolute bottom-6 right-32 w-16 h-16 rounded-full border border-white/30 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, type: "spring" }}
            >
              <div className="w-12 h-12 rounded-full border border-white/50 flex items-center justify-center">
                <div className="w-8 h-8 bg-white/20 rounded-full"></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="hidden md:block fixed bottom-6 left-6 z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : 20,
        }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex flex-col space-y-2">
          <span className="text-white font-mono text-xs tracking-wider">
            {getTranslatedContent("evapSolar").split(" ")[0]}
          </span>
          <span className="text-white font-mono text-xs tracking-wider">
            {getTranslatedContent("evapSolar").split(" ")[1]}
          </span>
          <span className="text-white font-mono text-xs tracking-wider">
            {getTranslatedContent("energy")}
          </span>
        </div>
      </motion.div>

      <motion.div
        className="hidden md:block fixed bottom-6 right-6 z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : 20,
        }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <button
          type="button"
          onClick={() => router.push("/case-study/zinc-cells")}
          className="flex items-center space-x-4 group focus:outline-none"
          aria-label="Explore Technology"
          title="Explore Technology"
        >
          <span className="text-white font-mono text-sm tracking-wider group-hover:text-white/80 transition-colors">
            {getTranslatedContent("technology")}
          </span>
          <div
            className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:border-white/60 transition-colors"
            role="presentation"
          >
            <div className="w-8 h-8 rounded-full border border-white/50 flex items-center justify-center group-hover:rotate-90 transition-transform duration-300">
              <div className="w-4 h-4 bg-white/20 rounded-full"></div>
            </div>
          </div>
        </button>
      </motion.div>
    </>
  );
}
