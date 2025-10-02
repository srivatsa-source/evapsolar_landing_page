"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  ScrollReveal,
  FloatingElement,
} from "@/components/ui/floating-elements";

const translations = {
  en: {
    title: "LET'S CONNECT",
    getInTouch: "GET IN TOUCH",
    email: "Email",
    phone: "Phone",
    address: "Address",
    businessHours: "Business Hours",
    placeholders: {
      fullName: "Full Name",
      company: "Company",
      emailAddress: "Email Address",
      message: "Message",
    },
    sendMessage: "Send Message",
    contactInfo: {
      email: "info@evapsolar.com",
      phone: "+91 7795 101714",
      address:
        "No. 3, 10th Cross, Bhuvaneshwari Nagar, Banashankari 3rd Stage, Bangalore 560-085",
      hours: "Mon - Fri: 9:00 AM - 6:00 PM\nSat - Sun: By Appointment",
    },
  },
  hi: {
    title: "आइए जुड़ें",
    getInTouch: "संपर्क में रहें",
    email: "ईमेल",
    phone: "फोन",
    address: "पता",
    businessHours: "व्यावसायिक घंटे",
    placeholders: {
      fullName: "पूरा नाम",
      company: "कंपनी",
      emailAddress: "ईमेल पता",
      message: "संदेश",
    },
    sendMessage: "संदेश भेजें",
    contactInfo: {
      email: "info@evapsolar.com",
      phone: "+91 7795 101714",
      address:
        "No. 3, 10th Cross, Bhuvaneshwari Nagar, Banashankari 3rd Stage, Bangalore 560-085",
      hours: "सोम - शुक्र: 9:00 AM - 6:00 PM\nशनि - रवि: अपॉइंटमेंट द्वारा",
    },
  },
  kn: {
    title: "ನಾವು ಸಂಪರ್ಕಿಸೋಣ",
    getInTouch: "ಸಂಪರ್ಕದಲ್ಲಿರಿ",
    email: "ಇಮೇಲ್",
    phone: "ಫೋನ್",
    address: "ವಿಳಾಸ",
    businessHours: "ವ್ಯಾಪಾರ ಸಮಯ",
    placeholders: {
      fullName: "ಪೂರ್ಣ ಹೆಸರು",
      company: "ಕಂಪನಿ",
      emailAddress: "ಇಮೇಲ್ ವಿಳಾಸ",
      message: "ಸಂದೇಶ",
    },
    sendMessage: "ಸಂದೇಶ ಕಳುಹಿಸಿ",
    contactInfo: {
      email: "info@evapsolar.com",
      phone: "+91 7795 101714",
      address:
        "No. 3, 10th Cross, Bhuvaneshwari Nagar, Banashankari 3rd Stage, Bangalore 560-085",
      hours: "ಸೋಮ - ಶುಕ್ರ: 9:00 AM - 6:00 PM\nಶನಿ - ಭಾನು: ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಮೂಲಕ",
    },
  },
};

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center py-20 relative bg-black"
    >
      <FloatingElement
        delay={1}
        amplitude={6}
        className="absolute top-20 right-10 opacity-10"
      >
        <div className="w-1 h-1 bg-white rounded-full" />
      </FloatingElement>

      <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
        <ScrollReveal delay={0.2}>
          <h2 className="text-2xl md:text-4xl font-mono text-center mb-20 text-white tracking-wider">
            {currentTranslation.title}
          </h2>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <ScrollReveal delay={0.4}>
            <div className="space-y-8">
              <h3 className="text-xl font-mono mb-8 text-white tracking-wider">
                {currentTranslation.getInTouch}
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm uppercase tracking-wider text-white/40 mb-2 font-mono">
                    {currentTranslation.email}
                  </h4>
                  <p className="text-white font-mono">
                    {currentTranslation.contactInfo.email}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm uppercase tracking-wider text-white/40 mb-2 font-mono">
                    {currentTranslation.phone}
                  </h4>
                  <p className="text-white font-mono">
                    {currentTranslation.contactInfo.phone}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm uppercase tracking-wider text-white/40 mb-2 font-mono">
                    {currentTranslation.address}
                  </h4>
                  <p className="text-white font-mono whitespace-pre-line">
                    {currentTranslation.contactInfo.address}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal delay={0.6}>
            <div className="border border-white/20 rounded-lg p-8 backdrop-blur-sm bg-white/5">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    placeholder={currentTranslation.placeholders.fullName}
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border border-white/30 rounded px-4 py-3 text-white font-mono text-sm focus:border-white/60 focus:outline-none transition-colors"
                  />
                </div>

                <div className="relative">
                  <input
                    type="text"
                    name="company"
                    placeholder={currentTranslation.placeholders.company}
                    value={formData.company}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border border-white/30 rounded px-4 py-3 text-white font-mono text-sm focus:border-white/60 focus:outline-none transition-colors"
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
                    className="w-full bg-transparent border border-white/30 rounded px-4 py-3 text-white font-mono text-sm focus:border-white/60 focus:outline-none transition-colors"
                  />
                </div>

                <div className="relative">
                  <textarea
                    name="message"
                    placeholder={currentTranslation.placeholders.message}
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    required
                    className="w-full bg-transparent border border-white/30 rounded px-4 py-3 text-white font-mono text-sm focus:border-white/60 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="ghost"
                  className="w-full text-white font-mono border border-white/30 hover:border-white/60 hover:bg-white/5 transition-all duration-300 mt-8"
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
