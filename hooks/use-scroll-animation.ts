"use client"

import { useEffect, useRef, useState } from "react"

export function useScrollAnimation() {
  const [scrollY, setScrollY] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down")
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight

      // Determine scroll direction
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection("down")
      } else {
        setScrollDirection("up")
      }
      lastScrollY.current = currentScrollY

      setScrollY(currentScrollY)
      setScrollProgress(Math.min(currentScrollY / maxScroll, 1))
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return { scrollY, scrollProgress, scrollDirection }
}

export function useMouseParallax() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height

      // Clamp values between -1 and 1
      setMousePosition({
        x: Math.max(-1, Math.min(1, x * 2)),
        y: Math.max(-1, Math.min(1, y * 2)),
      })
    }

    const handleMouseLeave = () => {
      // Smoothly return to center when mouse leaves
      setMousePosition({ x: 0, y: 0 })
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("mousemove", handleMouseMove)
      container.addEventListener("mouseleave", handleMouseLeave)
      return () => {
        container.removeEventListener("mousemove", handleMouseMove)
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  return { mousePosition, containerRef }
}

// Hook for section-based scroll animations
export function useSectionScroll(sectionId: string) {
  const [isInView, setIsInView] = useState(false)
  const [sectionProgress, setSectionProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById(sectionId)
      if (!element) return

      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Check if section is in view
      const inView = rect.top < windowHeight && rect.bottom > 0
      setIsInView(inView)

      // Calculate progress through section
      if (inView) {
        const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)))
        setSectionProgress(progress)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => window.removeEventListener("scroll", handleScroll)
  }, [sectionId])

  return { isInView, sectionProgress }
}
