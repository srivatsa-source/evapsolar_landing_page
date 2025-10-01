"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface TourStep {
  element: string
  title: string
  description: string
  position: "top" | "bottom" | "left" | "right"
}

const tourSteps: TourStep[] = [
  {
    element: '[data-driver="language-english"]',
    title: "Language Selection",
    description: "Click on EN, HI, or KN to translate the entire website to English, Hindi, or Kannada respectively.",
    position: "bottom",
  },
  {
    element: '[data-driver="menu-button"]',
    title: "Navigation Menu",
    description: "Click here to open the full-screen navigation menu with all page sections.",
    position: "bottom",
  },
  {
    element: '[data-driver="contact-button"]',
    title: "Contact Shortcut",
    description: "Jump directly to the contact section to reach out to our team.",
    position: "left",
  },
  {
    element: "#services",
    title: "Services",
    description: "Explore EPC, OEM, and R & D offerings. Click a card to expand details.",
    position: "top",
  },
]

export function DriverTour() {
  const [isActive, setIsActive] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const hasSeenTour = localStorage.getItem("evap-solar-tour-seen")
    if (!hasSeenTour) {
      setTimeout(() => {
        startTour()
        localStorage.setItem("evap-solar-tour-seen", "true")
      }, 2000)
    }

    // @ts-ignore
    window.startEvapSolarTour = startTour

    return () => {
      // @ts-ignore
      delete window.startEvapSolarTour
    }
    // We intentionally omit startTour from deps to avoid re-running on every render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!isActive) return

    const step = tourSteps[currentStep]
    if (!step) return

    const element = document.querySelector(step.element) as HTMLElement | null

    if (!element) {
      // If a target doesn't exist (e.g., removed section), skip to the next step after a short delay
      const skipTimer = setTimeout(() => {
        if (currentStep < tourSteps.length - 1) {
          setCurrentStep((s) => s + 1)
        } else {
          closeTour()
        }
      }, 700)
      return () => clearTimeout(skipTimer)
    }

    setTargetElement(element)
    element.scrollIntoView({ behavior: "smooth", block: "center" })
  }, [isActive, currentStep])

  useEffect(() => {
    if (isActive && tourSteps[currentStep]) {
      const element = document.querySelector(tourSteps[currentStep].element) as HTMLElement
      setTargetElement(element)

      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }
  }, [isActive, currentStep])

  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      closeTour()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const closeTour = () => {
    setIsActive(false)
    setCurrentStep(0)
    setTargetElement(null)
  }

  const startTour = () => {
    setIsActive(true)
    setCurrentStep(0)
  }

  if (!isActive || !targetElement) return null

  const step = tourSteps[currentStep]
  const rect = targetElement.getBoundingClientRect()

  // Calculate popover position
  let popoverStyle: React.CSSProperties = {}
  const offset = 20

  switch (step.position) {
    case "bottom":
      popoverStyle = {
        top: rect.bottom + offset,
        left: rect.left + rect.width / 2,
        transform: "translateX(-50%)",
      }
      break
    case "top":
      popoverStyle = {
        top: rect.top - offset,
        left: rect.left + rect.width / 2,
        transform: "translate(-50%, -100%)",
      }
      break
    case "right":
      popoverStyle = {
        top: rect.top + rect.height / 2,
        left: rect.right + offset,
        transform: "translateY(-50%)",
      }
      break
    case "left":
      popoverStyle = {
        top: rect.top + rect.height / 2,
        left: rect.left - offset,
        transform: "translate(-100%, -50%)",
      }
      break
  }

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-[9998]" />

      {/* Highlight */}
      <div
        className="fixed border-2 border-blue-400 rounded-lg z-[9999] pointer-events-none"
        style={{
          top: rect.top - 4,
          left: rect.left - 4,
          width: rect.width + 8,
          height: rect.height + 8,
          boxShadow: "0 0 0 4px rgba(59, 130, 246, 0.3)",
        }}
      />

      {/* Popover */}
      <div className="fixed z-[10000] bg-white rounded-lg shadow-xl p-6 max-w-sm" style={popoverStyle}>
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
          <button onClick={closeTour} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        <p className="text-gray-600 mb-6">{step.description}</p>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {currentStep + 1} of {tourSteps.length}
          </div>

          <div className="flex gap-2">
            {currentStep > 0 && (
              <button
                onClick={prevStep}
                className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ChevronLeft size={16} />
                Previous
              </button>
            )}

            <button
              onClick={nextStep}
              className="flex items-center gap-1 px-4 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
            >
              {currentStep === tourSteps.length - 1 ? "Finish" : "Next"}
              {currentStep < tourSteps.length - 1 && <ChevronRight size={16} />}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
