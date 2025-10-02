"use client";

import type React from "react";
import { useEffect, useMemo, useState, useId } from "react";
import {
  IndianRupee,
  Sun,
  Zap,
  Gauge,
  Leaf,
  PiggyBank,
  TrendingUp,
  Factory,
  Building2,
  ChevronDown,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/floating-elements";

type Profile = "business" | "residential";

const nfInt = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });
const nfOne = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 1 });
const nfTwo = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 });

const translations = {
  en: {
    title: "SAVINGS CALCULATOR",
    profiles: {
      business: "Business",
      residential: "Residential",
    },
    inputs: {
      solarCapacity: "Solar Capacity (kW)",
      sunHours: "Sun Hours per Day",
      electricityTariff: "Electricity Tariff (₹/kWh)",
      performanceRatio: "Performance Ratio",
      dailyLoad: "Daily Load (kWh)",
      capexPerKW: "CAPEX per kW (₹)",
    },
    results: {
      monthlyGeneration: "Monthly Generation",
      monthlySavings: "Monthly Savings",
      totalInvestment: "Total Investment",
      paybackPeriod: "Payback Period",
      simpleROI: "Simple ROI",
      co2Reduction: "CO₂ Reduction per Year",
    },
    units: {
      kWh: "kWh",
      rupees: "₹",
      years: "years",
      percent: "%",
      tonnes: "tonnes",
    },
  },
  hi: {
    title: "बचत कैलकुलेटर",
    profiles: {
      business: "व्यापार",
      residential: "आवासीय",
    },
    inputs: {
      solarCapacity: "सौर क्षमता (kW)",
      sunHours: "दिन में धूप के घंटे",
      electricityTariff: "बिजली टैरिफ (₹/kWh)",
      performanceRatio: "प्रदर्शन अनुपात",
      dailyLoad: "दैनिक लोड (kWh)",
      capexPerKW: "CAPEX प्रति kW (₹)",
    },
    results: {
      monthlyGeneration: "मासिक उत्पादन",
      monthlySavings: "मासिक बचत",
      totalInvestment: "कुल निवेश",
      paybackPeriod: "पेबैक अवधि",
      simpleROI: "सामान्य ROI",
      co2Reduction: "प्रति वर्ष CO₂ कमी",
    },
    units: {
      kWh: "kWh",
      rupees: "₹",
      years: "वर्ष",
      percent: "%",
      tonnes: "टन",
    },
  },
  kn: {
    title: "ಉಳಿತಾಯ ಕ್ಯಾಲ್ಕುಲೇಟರ್",
    profiles: {
      business: "ವ್ಯಾಪಾರ",
      residential: "ವಸತಿ",
    },
    inputs: {
      solarCapacity: "ಸೌರ ಸಾಮರ್ಥ್ಯ (kW)",
      sunHours: "ದಿನಕ್ಕೆ ಸೂರ್ಯನ ಗಂಟೆಗಳು",
      electricityTariff: "ವಿದ್ಯುತ್ ದರ (₹/kWh)",
      performanceRatio: "ಕಾರ್ಯಕ್ಷಮತೆ ಅನುಪಾತ",
      dailyLoad: "ದೈನಂದಿನ ಲೋಡ್ (kWh)",
      capexPerKW: "CAPEX ಪ್ರತಿ kW (₹)",
    },
    results: {
      monthlyGeneration: "ಮಾಸಿಕ ಉತ್ಪಾದನೆ",
      monthlySavings: "ಮಾಸಿಕ ಉಳಿತಾಯ",
      totalInvestment: "ಒಟ್ಟು ಹೂಡಿಕೆ",
      paybackPeriod: "ಪೇಬ್ಯಾಕ್ ಅವಧಿ",
      simpleROI: "ಸರಳ ROI",
      co2Reduction: "ವರ್ಷಕ್ಕೆ CO₂ ಕಡಿಮೆ",
    },
    units: {
      kWh: "kWh",
      rupees: "₹",
      years: "ವರ್ಷಗಳು",
      percent: "%",
      tonnes: "ಟನ್",
    },
  },
};

export function SavingsCalculatorSection() {
  const [profile, setProfile] = useState<Profile>("business");
  const [lang, setLang] = useState("en");
  const detailsId = useId();

  // Inputs
  const [sizeKW, setSizeKW] = useState(25); // kW
  const [sunHours, setSunHours] = useState(5.0); // hours/day
  const [tariff, setTariff] = useState(9); // ₹/kWh
  const [pr, setPr] = useState(0.8); // performance ratio
  const [dailyLoad, setDailyLoad] = useState(120); // kWh/day
  const [capexPerKW, setCapexPerKW] = useState(55000); // ₹/kW

  useEffect(() => {
    const savedLang = localStorage.getItem("language") || "en";
    setLang(savedLang);
    const onLang = (e: CustomEvent) => setLang((e as any).detail.language);
    window.addEventListener("languageChange", onLang as EventListener);
    return () =>
      window.removeEventListener("languageChange", onLang as EventListener);
  }, []);

  // Adjust defaults on profile change
  useEffect(() => {
    if (profile === "business") {
      setTariff(9);
      setDailyLoad(120);
      setCapexPerKW(55000);
    } else {
      setTariff(6.5);
      setDailyLoad(18);
      setCapexPerKW(65000);
    }
  }, [profile]);

  const calc = useMemo(() => {
    const monthlyGenKWh = sizeKW * sunHours * 30 * pr;
    const monthlyLoadKWh = dailyLoad * 30;
    const selfUsedKWh = Math.min(monthlyGenKWh, monthlyLoadKWh);
    const monthlySavings = selfUsedKWh * tariff;
    const totalCapex = sizeKW * capexPerKW;
    const paybackYears =
      monthlySavings > 0
        ? totalCapex / (monthlySavings * 12)
        : Number.POSITIVE_INFINITY;
    const simpleROI = totalCapex > 0 ? (monthlySavings * 12) / totalCapex : 0;
    const co2Factor = 0.82; // kg CO2/kWh typical Indian grid mix
    const co2SavedTonsYr = (monthlyGenKWh * 12 * co2Factor) / 1000;

    return {
      monthlyGenKWh,
      monthlySavings,
      totalCapex,
      paybackYears,
      simpleROI,
      co2SavedTonsYr,
      selfUsedKWh,
      monthlyLoadKWh,
    };
  }, [sizeKW, sunHours, pr, tariff, dailyLoad, capexPerKW]);

  const currentTranslation =
    translations[lang as keyof typeof translations] || translations.en;

  return (
    <section id="calculator" className="relative bg-black py-20">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal delay={0.2}>
          <h2 className="text-2xl md:text-4xl font-mono text-white mb-4 tracking-wider text-center">
            {currentTranslation.title}
          </h2>
          <div className="geometric-line w-32 mb-12 mx-auto" />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Controls */}
          <ScrollReveal delay={0.3}>
            <div className="border border-white/20 rounded-2xl p-6 md:p-8 backdrop-blur-sm bg-white/5 overflow-hidden">
              <div className="grid grid-cols-2 gap-2 mb-6">
                <button
                  type="button"
                  onClick={() => setProfile("business")}
                  className={`w-full justify-center inline-flex items-center gap-2 px-3 py-2 rounded-md border text-xs sm:text-sm font-mono tracking-wide transition truncate
                    ${
                      profile === "business"
                        ? "border-white/40 bg-white/10 text-white"
                        : "border-white/20 text-white/70 hover:text-white"
                    }`}
                  aria-pressed={profile === "business"}
                >
                  <Factory className="h-4 w-4" />
                  <span className="truncate">
                    {currentTranslation.profiles.business}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setProfile("residential")}
                  className={`w-full justify-center inline-flex items-center gap-2 px-3 py-2 rounded-md border text-xs sm:text-sm font-mono tracking-wide transition truncate
                    ${
                      profile === "residential"
                        ? "border-white/40 bg-white/10 text-white"
                        : "border-white/20 text-white/70 hover:text-white"
                    }`}
                  aria-pressed={profile === "residential"}
                >
                  <Building2 className="h-4 w-4" />
                  <span className="truncate">
                    {currentTranslation.profiles.residential}
                  </span>
                </button>
              </div>

              <div className="space-y-6">
                <SliderRow
                  label="System Size"
                  value={`${nfInt.format(sizeKW)} kW`}
                  icon={<Zap className="h-4 w-4" aria-hidden="true" />}
                >
                  <input
                    type="range"
                    min={1}
                    max={500}
                    step={1}
                    value={sizeKW}
                    onChange={(e) => setSizeKW(Number.parseInt(e.target.value))}
                    className="w-full accent-white"
                    aria-label="System size in kilowatts"
                  />
                </SliderRow>

                <SliderRow
                  label="Sun Hours"
                  value={`${nfOne.format(sunHours)} h/day`}
                  icon={<Sun className="h-4 w-4" aria-hidden="true" />}
                >
                  <input
                    type="range"
                    min={3}
                    max={7}
                    step={0.1}
                    value={sunHours}
                    onChange={(e) =>
                      setSunHours(Number.parseFloat(e.target.value))
                    }
                    className="w-full accent-white"
                    aria-label="Average usable sun hours per day"
                  />
                </SliderRow>

                <SliderRow
                  label="Tariff"
                  value={`₹ ${nfTwo.format(tariff)}/kWh`}
                  icon={<IndianRupee className="h-4 w-4" aria-hidden="true" />}
                >
                  <input
                    type="range"
                    min={3}
                    max={18}
                    step={0.1}
                    value={tariff}
                    onChange={(e) =>
                      setTariff(Number.parseFloat(e.target.value))
                    }
                    className="w-full accent-white"
                    aria-label="Grid tariff in rupees per kWh"
                  />
                </SliderRow>

                <DetailsCard title="Advanced Inputs">
                  <div className="space-y-6">
                    <SliderRow
                      label="Performance Ratio"
                      value={`${nfTwo.format(pr)}`}
                      icon={<Gauge className="h-4 w-4" aria-hidden="true" />}
                    >
                      <input
                        type="range"
                        min={0.6}
                        max={0.95}
                        step={0.01}
                        value={pr}
                        onChange={(e) =>
                          setPr(Number.parseFloat(e.target.value))
                        }
                        className="w-full accent-white"
                        aria-label="System performance ratio"
                      />
                    </SliderRow>

                    <SliderRow
                      label="Daily Consumption"
                      value={`${nfInt.format(dailyLoad)} kWh/day`}
                      icon={<Zap className="h-4 w-4" aria-hidden="true" />}
                    >
                      <input
                        type="range"
                        min={5}
                        max={2000}
                        step={5}
                        value={dailyLoad}
                        onChange={(e) =>
                          setDailyLoad(Number.parseInt(e.target.value))
                        }
                        className="w-full accent-white"
                        aria-label="Average daily energy consumption"
                      />
                    </SliderRow>

                    <SliderRow
                      label="Capex per kW"
                      value={`₹ ${nfInt.format(capexPerKW)}`}
                      icon={
                        <PiggyBank className="h-4 w-4" aria-hidden="true" />
                      }
                    >
                      <input
                        type="range"
                        min={30000}
                        max={120000}
                        step={1000}
                        value={capexPerKW}
                        onChange={(e) =>
                          setCapexPerKW(Number.parseInt(e.target.value))
                        }
                        className="w-full accent-white"
                        aria-label="Capital cost per kW"
                      />
                    </SliderRow>
                  </div>
                </DetailsCard>
              </div>

              {/* Assumptions Reveal - visually enhanced */}
              <DetailsCard title="Assumptions & Methodology">
                <ul className="text-sm text-white/80 font-mono grid gap-2">
                  <li>Monthly generation = Size × Sun Hours × 30 × PR</li>
                  <li>Savings = min(Generation, Load) × Tariff</li>
                  <li>Payback = Total Capex / Annual Savings</li>
                  <li>ROI (simple) = Annual Savings / Total Capex</li>
                  <li>CO₂ factor: 0.82 kg CO₂/kWh (IN grid mix)</li>
                </ul>
              </DetailsCard>
            </div>
          </ScrollReveal>

          {/* Results */}
          <ScrollReveal delay={0.4}>
            <div className="border border-white/20 rounded-2xl p-6 md:p-8 backdrop-blur-sm bg-white/5">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                <div className="hidden md:block">
                  <ResultCard
                    label="Monthly Gen"
                    value={`${nfInt.format(calc.monthlyGenKWh)} kWh`}
                    icon={<Sun className="h-5 w-5" aria-hidden="true" />}
                  />
                </div>

                <div className="hidden md:block">
                  <ResultCard
                    label="Self-Used"
                    value={`${nfInt.format(calc.selfUsedKWh)} kWh`}
                    icon={<Zap className="h-5 w-5" aria-hidden="true" />}
                  />
                </div>

                <ResultCard
                  label="Monthly Savings"
                  value={`₹ ${nfInt.format(calc.monthlySavings)}`}
                  icon={<IndianRupee className="h-5 w-5" aria-hidden="true" />}
                />

                <div className="hidden md:block">
                  <ResultCard
                    label="Total Capex"
                    value={`₹ ${nfInt.format(calc.totalCapex)}`}
                    icon={<PiggyBank className="h-5 w-5" aria-hidden="true" />}
                  />
                </div>

                <ResultCard
                  label="Payback"
                  value={`${
                    calc.paybackYears === Number.POSITIVE_INFINITY
                      ? "—"
                      : nfTwo.format(calc.paybackYears)
                  } yrs`}
                  icon={<TrendingUp className="h-5 w-5" aria-hidden="true" />}
                />

                <ResultCard
                  label="CO₂ Saved (yr)"
                  value={`${nfTwo.format(calc.co2SavedTonsYr)} t`}
                  icon={<Leaf className="h-5 w-5" aria-hidden="true" />}
                />
              </div>

              <div className="md:hidden mt-4">
                <DetailsCard title="More metrics">
                  <ul className="text-sm text-white/80 font-mono grid gap-2">
                    <li className="flex items-center gap-2">
                      <Sun className="h-4 w-4" aria-hidden="true" /> Monthly
                      Gen: {nfInt.format(calc.monthlyGenKWh)} kWh
                    </li>
                    <li className="flex items-center gap-2">
                      <Zap className="h-4 w-4" aria-hidden="true" /> Self-Used:{" "}
                      {nfInt.format(calc.selfUsedKWh)} kWh
                    </li>
                    <li className="flex items-center gap-2">
                      <PiggyBank className="h-4 w-4" aria-hidden="true" /> Total
                      Capex: ₹ {nfInt.format(calc.totalCapex)}
                    </li>
                  </ul>
                </DetailsCard>
              </div>

              <div className="mt-6 text-xs text-white/60 font-mono">
                Profile:{" "}
                {profile === "business" ? "Business (C&I)" : "Residential"} •
                Tariff: ₹ {nfTwo.format(tariff)}
                /kWh • PR: {nfTwo.format(pr)}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <style jsx>{`
        .card {
          border: 1px solid rgba(255, 255, 255, 0.15);
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(8px);
          border-radius: 14px;
        }
      `}</style>
    </section>
  );
}

function SliderRow({
  label,
  value,
  icon,
  children,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="card p-4 md:p-5">
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 text-white/90">
          <span className="inline-flex items-center justify-center h-7 w-7 rounded-md bg-white/10 border border-white/15">
            {icon}
          </span>
          <span className="font-mono text-sm tracking-wide">{label}</span>
        </div>
        <span className="font-mono text-sm text-white/70">{value}</span>
      </div>
      {children}
    </div>
  );
}

function ResultCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="card p-4 flex items-center gap-3">
      <div className="h-9 w-9 rounded-md bg-white/10 border border-white/15 flex items-center justify-center">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-xs font-mono text-white/70">{label}</div>
        <div className="text-base md:text-lg font-mono text-white truncate">
          {value}
        </div>
      </div>
    </div>
  );
}

function DetailsCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonId = useId();
  return (
    <div className="mt-8 rounded-xl overflow-hidden border border-white/15 bg-white/[0.05] shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
      <button
        id={buttonId}
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full group flex items-center justify-between gap-4 px-4 py-3 md:px-5 md:py-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 bg-white/5 hover:bg-white/10 transition"
        aria-expanded={open}
        aria-controls={panelId}
      >
        <span className="font-mono text-sm tracking-wide text-white">
          {title}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-white/90 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="px-4 py-4 md:px-5 md:py-5 bg-white/5 border-t border-white/10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
