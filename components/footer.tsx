"use client";
import { ScrollReveal } from "@/components/ui/floating-elements";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const translations = {
  en: {
    links: ["Home", "Technology", "Garuda", "Contact", "Privacy Policy"],
    socialLinks: ["LinkedIn", "Twitter", "YouTube"],
    copyright: "© 2025 Evap Solar. All rights reserved.",
  },
  hi: {
    links: ["होम", "तकनीक", "गरुड़", "संपर्क", "गोपनीयता नीति"],
    socialLinks: ["LinkedIn", "Twitter", "YouTube"],
    copyright: "© 2025 ईवैप सोलर। सभी अधिकार सुरक्षित।",
  },
  kn: {
    links: ["ಮನೆ", "ತಂತ್ರಜ್ಞಾನ", "ಗರುಡ", "ಸಂಪರ್ಕ", "ಗೌಪ್ಯತೆ ನೀತಿ"],
    socialLinks: ["LinkedIn", "Twitter", "YouTube"],
    copyright: "© 2025 ಇವ್ಯಾಪ್ ಸೋಲಾರ್। ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ।",
  },
};

export function Footer() {
  const router = useRouter();
  const pathname = usePathname();
  const [currentLang, setCurrentLang] = useState("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("language") || "en";
    setCurrentLang(savedLang);

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

  const currentTranslation =
    translations[currentLang as keyof typeof translations] || translations.en;

  const handleNavigation = (link: string, index: number) => {
    const routes = [
      "",
      "case-study/zinc-cells",
      "case-study/garuda-charging-station",
      "contact",
      "privacy-policy",
    ];
    const route = routes[index];

    if (route === "") {
      // Navigate to home page
      router.push("/");
    } else if (route.startsWith("case-study/")) {
      // Navigate to case study
      router.push(`/${route}`);
    } else {
      // Navigate to section on home page
      if (pathname !== "/") {
        router.push(`/#${route}`);
      } else {
        const element = document.getElementById(route);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <footer className="py-12 border-t border-white/20 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal delay={0.2}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="flex flex-wrap gap-6">
              {currentTranslation.links.map((link, index) => (
                <button
                  key={link}
                  onClick={() => handleNavigation(link, index)}
                  className="text-sm font-mono text-white/60 hover:text-white transition-colors tracking-wider cursor-pointer"
                >
                  {link}
                </button>
              ))}
            </div>

            <div className="flex space-x-6">
              {currentTranslation.socialLinks.map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-sm font-mono text-white/60 hover:text-white transition-colors tracking-wider"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="mt-8 pt-8 border-t border-white/20 text-center">
            <p className="text-sm font-mono text-white/60 tracking-wider">
              {currentTranslation.copyright}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
