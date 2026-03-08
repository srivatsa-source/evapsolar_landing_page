import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { InnovationSection } from "@/components/innovation-section"
import { ServicesSection } from "@/components/services-section"
import { GarudaSection } from "@/components/garuda-section"
import { SustainabilitySection } from "@/components/sustainability-section"
import { SavingsCalculatorSection } from "@/components/savings-calculator"
import { WhoWeAreSection } from "@/components/who-we-are-section"
import { FocusAreasSection } from "@/components/focus-areas-section"
import { EvapDifferenceSection } from "@/components/evap-difference-section"
import { ImpactStatsSection } from "@/components/impact-stats-section"
import { DualCtaSection } from "@/components/dual-cta-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { SectionNav } from "@/components/section-nav"

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <Navigation />
      <SectionNav />
      <HeroSection />
      <WhoWeAreSection />
      <ServicesSection />
      <GarudaSection />
      <InnovationSection />
      <SustainabilitySection />
      <FocusAreasSection />
      <EvapDifferenceSection />
      <ImpactStatsSection />
      <DualCtaSection />
      <SavingsCalculatorSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
