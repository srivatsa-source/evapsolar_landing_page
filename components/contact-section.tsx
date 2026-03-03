"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  ScrollReveal,
  FloatingElement,
} from "@/components/ui/floating-elements";

const interestOptions = [
  "Solar EV Charging",
  "Solar Installation",
  "R&D Collaboration",
  "Investment",
  "Other",
];

const translations = {
  en: {
    title: "LET'S CONNECT",
    getInTouch: "GET IN TOUCH",
    email: "Email",
    phone: "Phone",
    address: "Address",
    cin: "CIN",
    businessHours: "Business Hours",
    placeholders: {
      fullName: "Full Name",
      phone: "Phone Number",
      emailAddress: "Email Address",
      interest: "Select Interest Area",
      message: "Message",
    },
    sendMessage: "Send Message",
    contactInfo: {
      email: "office@evapsolar.com",
      phone: "+91 94830 61661",
      address: "Banashankari 3rd Stage, Bangalore – 560082",
      cin: "U40300KA2023PTC183234",
      hours: "Mon - Fri: 9:00 AM - 6:00 PM\nSat - Sun: By Appointment",
    },
  },
  hi: {
    title: "आइए जुड़ें",
    getInTouch: "संपर्क में रहें",
    email: "ईमेल",
    phone: "फोन",
    address: "पता",
    cin: "सीआईएन",
    businessHours: "व्यावसायिक घंटे",
    placeholders: {
      fullName: "पूरा नाम",
      phone: "फोन नंबर",
      emailAddress: "ईमेल पता",
      interest: "रुचि क्षेत्र चुनें",
      message: "संदेश",
    },
    sendMessage: "संदेश भेजें",
    contactInfo: {
      email: "office@evapsolar.com",
      phone: "+91 94830 61661",
      address: "Banashankari 3rd Stage, Bangalore – 560082",
      cin: "U40300KA2023PTC183234",
      hours: "सोम - शुक्र: 9:00 AM - 6:00 PM\nशनि - रवि: अपॉइंटमेंट द्वारा",
    },
  },
  kn: {
    title: "ನಾವು ಸಂಪರ್ಕಿಸೋಣ",
    getInTouch: "ಸಂಪರ್ಕದಲ್ಲಿರಿ",
    email: "ಇಮೇಲ್",
    phone: "ಫೋನ್",
    address: "ವಿಳಾಸ",
    cin: "ಸಿಐಎನ್",
    businessHours: "ವ್ಯಾಪಾರ ಸಮಯ",
    placeholders: {
      fullName: "ಪೂರ್ಣ ಹೆಸರು",
      phone: "ಫೋನ್ ಸಂಖ್ಯೆ",
      emailAddress: "ಇಮೇಲ್ ವಿಳಾಸ",
      interest: "ಆಸಕ್ತಿ ಕ್ಷೇತ್ರ ಆಯ್ಕೆಮಾಡಿ",
      message: "ಸಂದೇಶ",
    },
    sendMessage: "ಸಂದೇಶ ಕಳುಹಿಸಿ",
    contactInfo: {
      email: "office@evapsolar.com",
      phone: "+91 94830 61661",
      address: "Banashankari 3rd Stage, Bangalore – 560082",
      cin: "U40300KA2023PTC183234",
      hours: "ಸೋಮ - ಶುಕ್ರ: 9:00 AM - 6:00 PM\nಶನಿ - ಭಾನು: ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಮೂಲಕ",
    },
  },
};

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    interest: "",
    message: "",
  });
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center py-20 relative bg-background"
    >
      <FloatingElement
        delay={1}
        amplitude={6}
        className="absolute top-20 right-10 opacity-10"
      >
        <div className="w-1 h-1 bg-foreground rounded-full" />
      </FloatingElement>

      <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
        <ScrollReveal delay={0.2}>
          <h2 className="text-2xl md:text-4xl font-mono text-center mb-20 text-foreground tracking-wider">
            {currentTranslation.title}
          </h2>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <ScrollReveal delay={0.4}>
            <div className="space-y-8">
              <h3 className="text-xl font-mono mb-8 text-foreground tracking-wider">
                {currentTranslation.getInTouch}
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm uppercase tracking-wider text-foreground/40 mb-2 font-mono">
                    {currentTranslation.email}
                  </h4>
                  <a
                    href={`mailto:${currentTranslation.contactInfo.email}`}
                    className="text-foreground font-mono hover:text-foreground/80 transition-colors"
                  >
                    {currentTranslation.contactInfo.email}
                  </a>
                </div>
                <div>
                  <h4 className="text-sm uppercase tracking-wider text-foreground/40 mb-2 font-mono">
                    {currentTranslation.phone}
                  </h4>
                  <a
                    href={`tel:${currentTranslation.contactInfo.phone}`}
                    className="text-foreground font-mono hover:text-foreground/80 transition-colors"
                  >
                    {currentTranslation.contactInfo.phone}
                  </a>
                </div>
                <div>
                  <h4 className="text-sm uppercase tracking-wider text-foreground/40 mb-2 font-mono">
                    {currentTranslation.address}
                  </h4>
                  <p className="text-foreground font-mono whitespace-pre-line">
                    {currentTranslation.contactInfo.address}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm uppercase tracking-wider text-foreground/40 mb-2 font-mono">
                    {currentTranslation.cin}
                  </h4>
                  <p className="text-foreground font-mono text-sm">
                    {currentTranslation.contactInfo.cin}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal delay={0.6}>
            <div className="border border-foreground/20 rounded-lg p-8 backdrop-blur-sm bg-foreground/5">
              <form onSubmit={handleSubmit} className="space-y-6" suppressHydrationWarning>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    placeholder={currentTranslation.placeholders.fullName}
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border border-foreground/30 rounded px-4 py-3 text-foreground font-mono text-sm focus:border-foreground/60 focus:outline-none transition-colors placeholder:text-foreground/30"
                  />
                </div>

                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    placeholder={currentTranslation.placeholders.phone}
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-foreground/30 rounded px-4 py-3 text-foreground font-mono text-sm focus:border-foreground/60 focus:outline-none transition-colors placeholder:text-foreground/30"
                  />
                </div>

                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder={currentTranslation.placeholders.emailAddress}
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border border-foreground/30 rounded px-4 py-3 text-foreground font-mono text-sm focus:border-foreground/60 focus:outline-none transition-colors placeholder:text-foreground/30"
                  />
                </div>

                <div className="relative">
                  <select
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border border-foreground/30 rounded px-4 py-3 text-foreground font-mono text-sm focus:border-foreground/60 focus:outline-none transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="bg-background text-foreground/50">
                      {currentTranslation.placeholders.interest}
                    </option>
                    {interestOptions.map((option) => (
                      <option key={option} value={option} className="bg-background text-foreground">
                        {option}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-foreground/40">
                      <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

                <div className="relative">
                  <textarea
                    name="message"
                    placeholder={currentTranslation.placeholders.message}
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    required
                    className="w-full bg-transparent border border-foreground/30 rounded px-4 py-3 text-foreground font-mono text-sm focus:border-foreground/60 focus:outline-none transition-colors resize-none placeholder:text-foreground/30"
                  />
                </div>

                <Button
                  type="submit"
                  variant="ghost"
                  className="w-full text-foreground font-mono border border-foreground/30 hover:border-foreground/60 hover:bg-foreground/5 transition-all duration-300 mt-8"
                >
                  {currentTranslation.sendMessage}
                </Button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
