"use client";
import { ScrollReveal } from "@/components/ui/floating-elements";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const navRoutes = [
  { path: "/", label: { en: "Home", hi: "होम", kn: "ಮನೆ" } },
  { path: "/about", label: { en: "About Us", hi: "हमारे बारे में", kn: "ನಮ್ಮ ಬಗ್ಗೆ" } },
  { path: "/products", label: { en: "Products", hi: "उत्पाद", kn: "ಉತ್ಪನ್ನಗಳು" } },
  { path: "/innovation", label: { en: "Innovation Pipeline", hi: "नवाचार पाइपलाइन", kn: "ನಾವೀನ್ಯತೆ ಪೈಪ್‌ಲೈನ್" } },
  { path: "/#contact", label: { en: "Contact", hi: "संपर्क", kn: "ಸಂಪರ್ಕ" } },
];

const translations = {
  en: {
    socialLinks: ["LinkedIn", "Twitter", "YouTube"],
    copyright: "© 2025 EVAP Solar Pvt. Ltd. All rights reserved.",
    cin: "CIN: U40300KA2023PTC183234",
  },
  hi: {
    socialLinks: ["LinkedIn", "Twitter", "YouTube"],
    copyright: "© 2025 ईवैप सोलर प्रा. लिमिटेड। सभी अधिकार सुरक्षित।",
    cin: "CIN: U40300KA2023PTC183234",
  },
  kn: {
    socialLinks: ["LinkedIn", "Twitter", "YouTube"],
    copyright: "© 2025 ಇವ್ಯಾಪ್ ಸೋಲಾರ್ ಪ್ರೈ. ಲಿ. ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ।",
    cin: "CIN: U40300KA2023PTC183234",
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

  const handleNavClick = (route: typeof navRoutes[0]) => {
    if (route.path.startsWith("/#")) {
      const sectionId = route.path.replace("/#", "");
      if (pathname === "/") {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        router.push(route.path);
      }
    } else {
      router.push(route.path);
    }
  };

  return (
    <footer className="py-12 border-t border-foreground/20 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal delay={0.2}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="flex flex-wrap gap-6">
              {navRoutes.map((route) => (
                <button
                  key={route.path}
                  onClick={() => handleNavClick(route)}
                  className="text-sm font-mono text-foreground/60 hover:text-foreground transition-colors tracking-wider cursor-pointer"
                  suppressHydrationWarning
                >
                  {route.label[currentLang as keyof typeof route.label] || route.label.en}
                </button>
              ))}
            </div>

            <div className="flex space-x-6">
              {currentTranslation.socialLinks.map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-sm font-mono text-foreground/60 hover:text-foreground transition-colors tracking-wider"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="mt-8 pt-8 border-t border-foreground/20 text-center space-y-2">
            <p className="text-sm font-mono text-foreground/60 tracking-wider">
              {currentTranslation.copyright}
            </p>
            <p className="text-xs font-mono text-foreground/40 tracking-wider">
              {currentTranslation.cin}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
