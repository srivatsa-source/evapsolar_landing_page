"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Section {
  id: string
  label: string
}

const sections: Section[] = [
  { id: "home", label: "Home" },
  { id: "who-we-are", label: "Who We Are" },
  { id: "services", label: "Services" },
  { id: "garuda", label: "Garuda" },
  { id: "sustainability", label: "Sustainability" },
  { id: "focus-areas", label: "Focus Areas" },
  { id: "evap-difference", label: "EVAP Difference" },
  { id: "impact-stats", label: "Impact" },
  { id: "dual-cta", label: "Get Started" },
  { id: "calculator", label: "Calculator" },
  { id: "contact", label: "Contact" },
]

export function SectionNav() {
  const [activeSection, setActiveSection] = useState("home")
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  const updateActiveSection = useCallback(() => {
    const scrollY = window.scrollY
    const windowHeight = window.innerHeight

    // Show nav after scrolling past hero
    setIsVisible(scrollY > windowHeight * 0.3)

    // Find which section is currently in view
    let current = "home"
    for (const section of sections) {
      const element = document.getElementById(section.id)
      if (element) {
        const rect = element.getBoundingClientRect()
        // Section is "active" when its top is within the upper 60% of viewport
        if (rect.top <= windowHeight * 0.4 && rect.bottom > windowHeight * 0.2) {
          current = section.id
        }
      }
    }
    setActiveSection(current)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", updateActiveSection, { passive: true })
    updateActiveSection()
    return () => window.removeEventListener("scroll", updateActiveSection)
  }, [updateActiveSection])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed right-4 sm:right-5 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-end gap-3"
          aria-label="Section navigation"
        >
          {sections.map((section) => {
            const isActive = activeSection === section.id
            const isHovered = hoveredSection === section.id

            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                onMouseEnter={() => setHoveredSection(section.id)}
                onMouseLeave={() => setHoveredSection(null)}
                className="flex items-center gap-3 group relative"
                aria-label={`Scroll to ${section.label}`}
                aria-current={isActive ? "true" : undefined}
              >
                {/* Label tooltip */}
                <AnimatePresence>
                  {(isHovered || isActive) && (
                    <motion.span
                      initial={{ opacity: 0, x: 8, scale: 0.9 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 8, scale: 0.9 }}
                      transition={{ duration: 0.15 }}
                      className={`text-[11px] font-mono font-medium tracking-wider whitespace-nowrap px-3 py-1 rounded-md border shadow-sm backdrop-blur-md ${
                        isActive
                          ? "text-white bg-blue-600 border-blue-500 shadow-blue-500/20"
                          : "text-foreground bg-background/90 border-foreground/20 dark:text-white dark:bg-black/80 dark:border-white/20"
                      }`}
                    >
                      {section.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Dot indicator */}
                <motion.div
                  className={`rounded-full transition-colors duration-200 ${
                    isActive
                      ? "bg-blue-500 shadow-[0_0_6px_rgba(59,130,246,0.5)]"
                      : "bg-foreground/25 dark:bg-white/25 group-hover:bg-foreground/60 dark:group-hover:bg-white/60"
                  }`}
                  animate={{
                    width: isActive ? 12 : 7,
                    height: isActive ? 12 : 7,
                  }}
                  transition={{ duration: 0.2 }}
                />

                {/* Active glow ring */}
                {isActive && (
                  <motion.div
                    layoutId="activeRing"
                    className="absolute right-[-4px] w-5 h-5 rounded-full border-2 border-blue-500/40"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
              </button>
            )
          })}

          {/* Progress line */}
          <div className="absolute right-[5px] top-0 bottom-0 w-[1px] bg-foreground/10 dark:bg-white/10 -z-10" />
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
