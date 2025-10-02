"use client";
import {
  ScrollReveal,
  FloatingElement,
} from "@/components/ui/floating-elements";
import type React from "react";

import { useState, useEffect } from "react";
import {
  Leaf,
  Recycle,
  ShieldCheck,
  Package,
  Truck,
  BadgeCheck,
} from "lucide-react";

const translations = {
  en: {
    title: "SUSTAINABLE ENERGY FUTURE",
    description:
      "We are building a truly circular energy ecosystem. Our zinc-based storage uses highly Sustainable materials, " +
      "reduces CO₂ emissions, and avoids rare earth or TOXIC minerals. End‑of‑life packs are designed for easy recovery " +
      "and processing, ensuring valuable metals re‑enter the supply chain instead of landfills. By prioritizing local " +
      "sourcing and maintaining strict RoHS/REACH compliance, we lower transport emissions, strengthen regional supply " +
      "resilience, and improve traceability. The result is safer storage, longer service life, and a smaller environmental " +
      "footprint—without compromising on performance.",
  },
  hi: {
    title: "टिकाऊ ऊर्जा भविष्य",
    description:
  "हम एक सर्कुलर ऊर्जा इकोसिस्टम का निर्माण कर रहे हैं। हमारी जिंक‑आधारित स्टोरेज प्रणाली पुनर्चक्रण योग्य " +
  "सामग्रियों का उपयोग करती है, जीवनचक्र CO₂ को कम करती है और दुर्लभ/संघर्ष खनिजों से बचाती है। जीवन के अंत में " +
      "बैटरियों को पुनर्प्राप्ति और पुन:प्रक्रिया के लिए डिज़ाइन किया गया है ताकि मूल्यवान धातुएँ लैंडफिल में जाने के " +
      "बजाय आपूर्ति श्रृंखला में वापस लौटें। स्थानीय सोर्सिंग और RoHS/REACH अनुपालन के माध्यम से हम परिवहन उत्सर्जन घटाते, " +
      "आपूर्ति लचीलापन बढ़ाते और ट्रेसबिलिटी सुधारते हैं—उच्च प्रदर्शन के साथ एक छोटा पर्यावरणीय पदचिह्न।",
  },
  kn: {
    title: "ಸಮರ್ಥನೀಯ ಶಕ್ತಿ ಭವಿಷ್ಯ",
    description:
  "ನಾವು ನಿಜವಾದ ವಲಯ ಆಧಾರಿತ ಶಕ್ತಿ ಪರಿಸರ ವ್ಯವಸ್ಥೆಯನ್ನು ನಿರ್ಮಿಸುತ್ತಿದ್ದೇವೆ. ನಮ್ಮ ಜಿಂಕ್ ಆಧಾರಿತ ಸಂಗ್ರಹಣೆ " +
  "ಬಹಳವಾಗಿ ಮರುಬಳಕೆ ಮಾಡಬಹುದಾದ ವಸ್ತುಗಳನ್ನು ಬಳಸುತ್ತದೆ, ಜೀವನಚಕ್ರ CO₂ ಅನ್ನು ಕಡಿಮೆ ಮಾಡುತ್ತದೆ ಮತ್ತು ಅಪರೂಪ/ಸಂಘರ್ಷ ಖನಿಜಗಳಿಂದ ದೂರ ಇರಿಸುತ್ತದೆ. " +
      "ಆಯುಷ್ಯದ ಅಂತ್ಯದಲ್ಲಿ ಬ್ಯಾಟರಿ ಪ್ಯಾಕ್‌ಗಳನ್ನು ಸುಲಭ ಪುನಃಪ್ರಾಪ್ತಿ ಮತ್ತು ಮರುಪ್ರಕ್ರಿಯೆಗಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ, ಅಮೂಲ್ಯ ಲೋಹಗಳು ಭೂಗುಹೆಗೆ ಹೋಗುವುದರ ಬದಲು " +
      "ಪೂರೈಕೆ ಸರಪಳಿಗೆ ಮರುನುಗ್ಗುವಂತೆ. ಸ್ಥಳೀಯ ಸೋರ್ಸಿಂಗ್ ಮತ್ತು RoHS/REACH ಅನುಸರಣೆಯ ಮೂಲಕ ನಾವು ಸಾರಿಗೆ ಹೊರಸೂಸುವಿಕೆಯನ್ನು ಕಡಿಮೆ ಮಾಡುತ್ತೇವೆ, " +
      "ಪ್ರಾದೇಶಿಕ ಲವಚಿಕತೆಯನ್ನು ಬಲಪಡಿಸುತ್ತೇವೆ ಮತ್ತು ಟ್ರೇಸಬಿಲಿಟಿಯನ್ನು ಸುಧಾರಿಸುತ್ತೇವೆ—ಉನ್ನತ ಕಾರ್ಯಕ್ಷಮತೆಯೊಂದಿಗೆ ಚಿಕ್ಕ ಪರಿಸರಪದಚಿಹ್ನೆ.",
  },
};

type Icon = React.ComponentType<{
  className?: string;
  "aria-hidden"?: boolean;
}>;
type Snippet = { icon: Icon; title: string; desc: string };

const snippetData: Record<string, Snippet[]> = {
  en: [
    {
      icon: Recycle,
      title: "Highly recyclable",
      desc: "Zinc-based, easy to recover",
    },
    {
      icon: ShieldCheck,
      title: "No conflict minerals",
      desc: "Avoids rare/critical inputs",
    },
    {
      icon: Leaf,
      title: "Lower lifecycle CO₂",
      desc: "Reduced emissions end-to-end",
    },
    {
      icon: Package,
      title: "Designed for recovery",
      desc: "End-of-life reprocessing",
    },
    {
      icon: Truck,
      title: "Local sourcing",
      desc: "Less transport, stronger supply",
    },
    {
      icon: BadgeCheck,
      title: "RoHS/REACH",
      desc: "Strict compliance, traceable",
    },
  ],
  hi: [
    {
      icon: Recycle,
      title: "उच्च पुनर्चक्रणीय",
      desc: "जिंक‑आधारित, आसानी से रिकवर",
    },
    {
      icon: ShieldCheck,
      title: "संघर्ष खनिज नहीं",
      desc: "दुर्लभ/क्रिटिकल खनिजों से बचाव",
    },
    {
      icon: Leaf,
      title: "कम लाइफ‑साइकल CO₂",
      desc: "पूरे जीवनचक्र में उत्सर्जन कम",
    },
    {
      icon: Package,
      title: "रिकवरी हेतु डिज़ाइन",
      desc: "जीवनांत पुनःप्रक्रिया",
    },
    { icon: Truck, title: "स्थानीय सोर्सिंग", desc: "कम परिवहन, मजबूत सप्लाई" },
    {
      icon: BadgeCheck,
      title: "RoHS/REACH",
      desc: "कठोर अनुपालन, ट्रेसबिलिटी",
    },
  ],
  kn: [
    {
      icon: Recycle,
      title: "ಅತಿ ಮರುಬಳಕೆ ಸಾಧ್ಯ",
      desc: "ಜಿಂಕ್ ಆಧಾರಿತ, ಸುಲಭ ಪುನಃಪ್ರಾಪ್ತಿ",
    },
    {
      icon: ShieldCheck,
      title: "ಸಂಘರ್ಷ ಖನಿಜಗಳಿಲ್ಲ",
      desc: "ಅಪರೂಪ/ಗುರ್ತಿಸಲಾದ ಖನಿಜಗಳಿಗೆ ಬದಲಿ",
    },
    {
      icon: Leaf,
      title: "ಕಡಿಮೆ ಜೀವನಚಕ್ರ CO₂",
      desc: "ಆರಂಭದಿಂದ ಅಂತ್ಯವರೆಗೆ ಕಡಿಮೆ ಹೊರಸೂಸುವಿಕೆ",
    },
    {
      icon: Package,
      title: "ಪುನಃಪ್ರಾಪ್ತಿಗೆ ವಿನ್ಯಾಸ",
      desc: "ಆಯುಷ್ಯಾಂತ್ಯ ಮರುಪ್ರಕ್ರಿಯೆ",
    },
    {
      icon: Truck,
      title: "ಸ್ಥಳೀಯ ಸೋರ್ಸಿಂಗ್",
      desc: "ಕಡಿಮೆ ಸಾರಿಗೆ, ಬಲವಾದ ಸರಬರಾಜು",
    },
    { icon: BadgeCheck, title: "RoHS/REACH", desc: "ಕಠಿಣ ಅನುಸರಣೆ, ಹಾದಿಚಿತ್ರಣ" },
  ],
};

export function SustainabilitySection() {
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
  const currentSnippets = snippetData[currentLang] || snippetData.en;

  return (
    <section
      id="sustainability"
      className="min-h-screen flex items-center py-20 relative bg-black"
    >
      <FloatingElement
        delay={1.5}
        amplitude={12}
        className="absolute top-24 left-16 opacity-10"
      >
        <div className="w-3 h-3 bg-white rounded-full" />
      </FloatingElement>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <ScrollReveal delay={0.2}>
          <h2 className="text-2xl md:text-4xl font-mono text-white mb-4 tracking-wider">
            {currentTranslation.title}
          </h2>
          <div className="geometric-line w-32 mb-16 mx-auto" />
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="md:hidden grid grid-cols-1 gap-3">
            {currentSnippets.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 border border-white/15 rounded-md p-3 bg-white/5"
              >
                <item.icon
                  className="h-5 w-5 text-white/80"
                  aria-hidden={true}
                />
                <div className="flex-1 text-left">
                  <p className="font-mono text-sm text-white">{item.title}</p>
                  <p className="text-xs text-white/70">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden md:block border border-white/20 rounded-lg p-12 backdrop-blur-sm bg-white/5">
            <p className="font-mono text-base md:text-lg text-white/80 leading-relaxed text-pretty">
              {currentTranslation.description}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
