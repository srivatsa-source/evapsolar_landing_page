import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { InnovationSection } from "@/components/innovation-section"
import { SustainabilitySection } from "@/components/sustainability-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { DriverTour } from "@/components/ui/driver-tour"
import { ServicesSection } from "@/components/services-section"
import { SavingsCalculatorSection } from "@/components/savings-calculator"

export default function Home() {
  return (
    <main className="bg-black text-white">
      <Navigation />
      <HeroSection />
      {/* TechnologySection removed to hide the perovskite section from the home scroll */}
      <InnovationSection />
      <ServicesSection />
      <SustainabilitySection />
      <SavingsCalculatorSection />
      <ContactSection />
      <Footer />
      <DriverTour />
    </main>
  )
}
