"use client";
import {
  ScrollReveal,
  FloatingElement,
} from "@/components/ui/floating-elements";
import { Suspense, useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Perovskite2D = dynamic(() => import("@/components/3d/perovskite-2d"), {
  ssr: false,
  loading: () => <div className="w-full h-96 bg-black/20 rounded-2xl" />,
});

export function TechnologySection() {
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

  const translations = {
    en: {
      title: "PEROVSKITE TECHNOLOGY",
      description:
        "Our advanced perovskite solar cells utilize CH₃NH₃PbI₃ crystal structures for superior light absorption and energy conversion efficiency.",
      specs: {
        "Nominal Voltage": "24 VDC",
        Capacity: "6.35 Ah",
        Efficiency: "90%",
        "Operating Temp": "+10 °C to +30 °C",
        "Energy Density": "100 Wh/L",
      },
    },
    hi: {
      title: "पेरोवस्काइट तकनीक",
      description:
        "हमारी उन्नत पेरोवस्काइट सौर कोशिकाएं बेहतर प्रकाश अवशोषण और ऊर्जा रूपांतरण दक्षता के लिए CH₃NH₃PbI₃ क्रिस्टल संरचनाओं का उपयोग करती हैं।",
      specs: {
        "नाममात्र वोल्टेज": "24 VDC",
        क्षमता: "6.35 Ah",
        दक्षता: "90%",
        "ऑपरेटिंग तापमान": "+10 °C से +30 °C",
        "ऊर्जा घनत्व": "100 Wh/L",
      },
    },
    kn: {
      title: "ಪೆರೋವ್‌ಸ್ಕೈಟ್ ತಂತ್ರಜ್ಞಾನ",
      description:
        "ನಮ್ಮ ಸುಧಾರಿತ ಪೆರೋವ್‌ಸ್ಕೈಟ್ ಸೌರ ಕೋಶಗಳು ಉತ್ತಮ ಬೆಳಕಿನ ಹೀರಿಕೊಳ್ಳುವಿಕೆ ಮತ್ತು ಶಕ್ತಿ ಪರಿವರ್ತನೆ ದಕ್ಷತೆಗಾಗಿ CH₃NH₃PbI₃ ಸ್ಫಟಿಕ ರಚನೆಗಳನ್ನು ಬಳಸುತ್ತವೆ।",
      specs: {
        "ನಾಮಮಾತ್ರ ವೋಲ್ಟೇಜ್": "24 VDC",
        ಸಾಮರ್ಥ್ಯ: "6.35 Ah",
        ದಕ್ಷತೆ: "90%",
        "ಕಾರ್ಯಾಚರಣೆ ತಾಪಮಾನ": "+10 °C ರಿಂದ +30 °C",
        "ಶಕ್ತಿ ಸಾಂದ್ರತೆ": "100 Wh/L",
      },
    },
  };

  const currentTranslation =
    translations[currentLang as keyof typeof translations] || translations.en;

  return (
    <section id="technology" className="min-h-screen relative bg-black">
      <div className="relative z-10 min-h-screen flex items-center py-20">
        <FloatingElement
          delay={1}
          amplitude={8}
          className="absolute top-32 right-20 opacity-10"
        >
          <div className="w-3 h-3 bg-white rounded-full" />
        </FloatingElement>
        <FloatingElement
          delay={3}
          amplitude={12}
          className="absolute bottom-32 left-20 opacity-10"
        >
          <div className="w-2 h-2 bg-white rounded-full" />
        </FloatingElement>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Details Card - Left Side */}
            <ScrollReveal delay={0.2}>
              <div
                className="backdrop-blur-md bg-black/40 border border-white/20 rounded-2xl p-8"
                data-driver="technology-details"
              >
                <h2 className="text-2xl md:text-4xl font-mono text-white mb-4 tracking-wider">
                  {currentTranslation.title}
                </h2>
                <div className="geometric-line w-32 mb-8" />

                <p className="text-white/80 font-mono text-sm tracking-wide mb-8 leading-relaxed">
                  {currentTranslation.description}
                </p>

                <div className="space-y-6">
                  {Object.entries(currentTranslation.specs).map(
                    ([label, value], index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-3 border-b border-white/10 last:border-b-0"
                      >
                        <span className="font-mono text-white/60 text-sm tracking-wider">
                          {label}:
                        </span>
                        <span className="font-mono text-white text-sm tracking-wider">
                          {value}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </ScrollReveal>

            {/* 3D Structure - Right Side */}
            <ScrollReveal delay={0.4}>
              <div
                className="h-96 lg:h-[500px] relative"
                data-driver="perovskite-structure"
              >
                <Suspense
                  fallback={
                    <div className="w-full h-full bg-black/20 rounded-2xl flex items-center justify-center border border-white/10">
                      <div className="text-white font-mono text-sm tracking-wider">
                        {currentLang === "hi"
                          ? "लोड हो रहा है..."
                          : currentLang === "kn"
                          ? "ಲೋಡ್ ಆಗುತ್ತಿದೆ..."
                          : "Loading Perovskite Structure..."}
                      </div>
                    </div>
                  }
                >
                  <div className="w-full h-full rounded-2xl overflow-hidden border border-white/10">
                    <Perovskite2D />
                  </div>
                </Suspense>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
