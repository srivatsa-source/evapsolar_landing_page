"use client";

import { useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

const sections = [
  { name: "Home", id: "home", route: "/" },
  { name: "About Us", id: "about", route: "/about" },
  { name: "Products", id: "products", route: "/products" },
  { name: "Innovation", id: "innovation", route: "/innovation" },
  { name: "Contact", id: "contact", route: "/#contact" },
];

const translations = {
  en: {
    sections: {
      Home: "Home",
      "About Us": "About Us",
      Products: "Products",
      Innovation: "Innovation",
      Contact: "Contact",
    },
    content: {
      menu: "MENU",
      evapSolar: "EVAP SOLAR",
      energy: "ENERGY",
      exploreEV: "Explore EV Charging",
      solarInstall: "Solar Installation",
      innovationPipeline: "Innovation Pipeline",
      rdCollab: "R&D Collaboration",
    },
  },
  hi: {
    sections: {
      Home: "होम",
      "About Us": "हमारे बारे में",
      Products: "उत्पाद",
      Innovation: "नवाचार",
      Contact: "संपर्क",
    },
    content: {
      menu: "मेनू",
      evapSolar: "ईवैप सोलर",
      energy: "ऊर्जा",
      exploreEV: "ईवी चार्जिंग देखें",
      solarInstall: "सोलर इंस्टालेशन",
      innovationPipeline: "नवाचार पाइपलाइन",
      rdCollab: "R&D सहयोग",
    },
  },
  kn: {
    sections: {
      Home: "ಮನೆ",
      "About Us": "ನಮ್ಮ ಬಗ್ಗೆ",
      Products: "ಉತ್ಪನ್ನಗಳು",
      Innovation: "ನಾವೀನ್ಯತೆ",
      Contact: "ಸಂಪರ್ಕ",
    },
    content: {
      menu: "ಮೆನು",
      evapSolar: "ಇವ್ಯಾಪ್ ಸೋಲಾರ್",
      energy: "ಶಕ್ತಿ",
      exploreEV: "ಇವಿ ಚಾರ್ಜಿಂಗ್ ಅನ್ವೇಷಿಸಿ",
      solarInstall: "ಸೋಲಾರ್ ಅಳವಡಿಕೆ",
      innovationPipeline: "ನಾವೀನ್ಯತೆ ಪೈಪ್‌ಲೈನ್",
      rdCollab: "R&D ಸಹಯೋಗ",
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

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
        const scrollPosition = window.scrollY + 200;
        const contactSection = document.getElementById("contact");

        if (contactSection && contactSection.offsetTop <= scrollPosition) {
          setActiveSection("Contact");
        } else {
          setActiveSection("Home");
        }
      } else if (pathname === "/about") {
        setActiveSection("About Us");
      } else if (pathname === "/products") {
        setActiveSection("Products");
      } else if (pathname === "/innovation") {
        setActiveSection("Innovation");
      } else if (pathname.includes("/case-study")) {
        setActiveSection("Products");
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVisible, pathname]);

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

  const navigateTo = (section: (typeof sections)[number]) => {
    setActiveSection(section.name);
    setIsMenuOpen(false);

    if (section.name === "Contact") {
      if (pathname !== "/") {
        window.location.href = "/#contact";
      } else {
        const element = document.getElementById("contact");
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.offsetTop - headerOffset;
          window.scrollTo({ top: elementPosition, behavior: "smooth" });
        }
      }
      return;
    }

    if (section.name === "Home") {
      if (pathname !== "/") {
        router.push("/");
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    router.push(section.route);
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
    } else if (pathname === "/about") {
      return getTranslatedSectionName("About Us").toUpperCase();
    } else if (pathname === "/products") {
      return getTranslatedSectionName("Products").toUpperCase();
    } else if (pathname === "/innovation") {
      return getTranslatedSectionName("Innovation").toUpperCase();
    } else if (pathname.includes("/case-study")) {
      const caseStudyPath = pathname.split("/").pop() || "";
      return caseStudyPath.replace(/-/g, " ").toUpperCase();
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
          <GlassCard
            variant="floating"
            className="px-4 md:px-6 py-2 rounded-full"
            animate={false}
            aria-label="Navigation"
          >
            <div className="flex items-center space-x-6">
              <span className="text-foreground font-mono text-sm tracking-wider">
                {getCurrentPageDisplay()}
              </span>
              <span className="text-foreground/40 select-none">|</span>
              <button
                onClick={() => setIsMenuOpen(true)}
                className="text-foreground font-mono text-sm tracking-wider hover:text-foreground/70 transition-colors"
                suppressHydrationWarning
              >
                {getTranslatedContent("menu")}
              </button>
            </div>
          </GlassCard>

          {/* Theme toggle + Language selector */}
          <div className="absolute top-0 right-4 md:right-6 flex flex-col items-end space-y-1 mt-1">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-foreground/60 hover:text-foreground transition-colors p-1"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
              </button>
            )}
            <button
              onClick={() => switchLanguage("hi")}
              className={`font-mono text-xs tracking-wider transition-colors ${
                currentLang === "hi"
                  ? "text-foreground"
                  : "text-foreground/40 hover:text-foreground/70"
              }`}
            >
              HI
            </button>
            <button
              onClick={() => switchLanguage("kn")}
              className={`font-mono text-xs tracking-wider transition-colors ${
                currentLang === "kn"
                  ? "text-foreground"
                  : "text-foreground/40 hover:text-foreground/70"
              }`}
            >
              KN
            </button>
            <button
              onClick={() => switchLanguage("en")}
              className={`font-mono text-xs tracking-wider transition-colors ${
                currentLang === "en"
                  ? "text-foreground"
                  : "text-foreground/40 hover:text-foreground/70"
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-background/95 backdrop-blur-xl menu-overlay overflow-y-auto"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <div className="h-full flex flex-col md:flex-row">
              <div className="flex-1 flex items-center justify-center md:justify-start px-6 md:pl-16">
                <motion.h1
                  className="leading-none tracking-tighter text-foreground/10 font-bold text-[18vw] md:text-[12vw] lg:text-[9vw] text-center md:text-left"
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
                      onClick={() => navigateTo(section)}
                      className={`text-left group ${
                        activeSection === section.name
                          ? "opacity-100"
                          : "opacity-70 hover:opacity-100"
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <div className="flex items-start space-x-4">
                        <span
                          className={`font-mono text-sm mt-1 ${
                            activeSection === section.name
                              ? "text-foreground"
                              : "text-foreground/50"
                          }`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`text-xl sm:text-2xl font-bold tracking-wide transition-colors ${
                            activeSection === section.name
                              ? "text-foreground"
                              : "text-foreground/70 group-hover:text-foreground"
                          }`}
                        >
                          {getTranslatedSectionName(section.name)}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </motion.div>

                {/* Quick access buttons */}
                <motion.div
                  className="mt-10 grid grid-cols-2 gap-3 w-full max-w-xs sm:max-w-md"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                >
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      router.push("/products#ev-charging");
                    }}
                    className="px-3 py-2 rounded-md border border-foreground/20 text-foreground/80 hover:text-foreground hover:bg-foreground/5 font-mono text-[11px] sm:text-xs tracking-wider transition-colors"
                  >
                    {getTranslatedContent("exploreEV")}
                  </button>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      router.push("/products#solar-installation");
                    }}
                    className="px-3 py-2 rounded-md border border-foreground/20 text-foreground/80 hover:text-foreground hover:bg-foreground/5 font-mono text-[11px] sm:text-xs tracking-wider transition-colors"
                  >
                    {getTranslatedContent("solarInstall")}
                  </button>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      router.push("/innovation");
                    }}
                    className="px-3 py-2 rounded-md border border-foreground/20 text-foreground/80 hover:text-foreground hover:bg-foreground/5 font-mono text-[11px] sm:text-xs tracking-wider transition-colors"
                  >
                    {getTranslatedContent("innovationPipeline")}
                  </button>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      router.push("/innovation#collaboration");
                    }}
                    className="px-3 py-2 rounded-md border border-foreground/20 text-foreground/80 hover:text-foreground hover:bg-foreground/5 font-mono text-[11px] sm:text-xs tracking-wider transition-colors"
                  >
                    {getTranslatedContent("rdCollab")}
                  </button>
                </motion.div>
              </div>
            </div>

            <motion.button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6 text-foreground text-3xl hover:text-foreground/70 transition-colors"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 0.6 }}
            >
              ×
            </motion.button>

            {/* Mobile language + theme in menu */}
            <motion.div
              className="absolute top-6 right-20 flex flex-col items-end space-y-1 md:hidden"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="text-foreground/60 hover:text-foreground transition-colors p-1"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
                </button>
              )}
              <button
                onClick={() => switchLanguage("hi")}
                className={`font-mono text-xs tracking-wider ${
                  currentLang === "hi" ? "text-foreground" : "text-foreground/40"
                }`}
              >
                HI
              </button>
              <button
                onClick={() => switchLanguage("kn")}
                className={`font-mono text-xs tracking-wider ${
                  currentLang === "kn" ? "text-foreground" : "text-foreground/40"
                }`}
              >
                KN
              </button>
              <button
                onClick={() => switchLanguage("en")}
                className={`font-mono text-xs tracking-wider ${
                  currentLang === "en" ? "text-foreground" : "text-foreground/40"
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
              <span className="text-foreground font-mono text-xs tracking-wider hover:text-foreground/70 transition-colors cursor-pointer">
                LINKEDIN
              </span>
              <span className="text-foreground font-mono text-xs tracking-wider hover:text-foreground/70 transition-colors cursor-pointer">
                TWITTER
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom-left branding */}
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
          <span className="text-foreground font-mono text-xs tracking-wider">
            {getTranslatedContent("evapSolar").split(" ")[0]}
          </span>
          <span className="text-foreground font-mono text-xs tracking-wider">
            {getTranslatedContent("evapSolar").split(" ")[1]}
          </span>
          <span className="text-foreground font-mono text-xs tracking-wider">
            {getTranslatedContent("energy")}
          </span>
        </div>
      </motion.div>

      {/* Bottom-right innovation link */}
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
          onClick={() => router.push("/innovation")}
          className="flex items-center space-x-4 group focus:outline-none"
          aria-label="Explore Innovation"
          title="Explore Innovation Pipeline"
        >
          <span className="text-foreground font-mono text-sm tracking-wider group-hover:text-foreground/80 transition-colors">
            INNOVATION
          </span>
          <div
            className="w-12 h-12 rounded-full border border-foreground/30 flex items-center justify-center group-hover:border-foreground/60 transition-colors"
            role="presentation"
          >
            <div className="w-8 h-8 rounded-full border border-foreground/50 flex items-center justify-center group-hover:rotate-90 transition-transform duration-300">
              <div className="w-4 h-4 bg-foreground/20 rounded-full"></div>
            </div>
          </div>
        </button>
      </motion.div>
    </>
  );
}
