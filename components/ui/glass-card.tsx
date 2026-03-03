"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface GlassCardProps {
  children: ReactNode
  className?: string
  variant?: "default" | "subtle" | "strong" | "floating"
  hover?: boolean
  animate?: boolean
}

export function GlassCard({ children, className, variant = "default", hover = true, animate = true }: GlassCardProps) {
  const baseClasses = "relative overflow-hidden rounded-lg"

  const variantClasses = {
    default: "glassmorphic",
    subtle: "glass-subtle",
    strong: "glass-strong",
    floating: "glass-floating",
  }

  const hoverClasses = hover
    ? "hover:bg-black/40 hover:border-white/25 hover:shadow-2xl transition-all duration-500"
    : ""

  const CardComponent = animate ? motion.div : "div"

  const animationProps = animate
    ? {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
        viewport: { once: true, margin: "-50px" },
      }
    : {}

  return (
    <CardComponent className={cn(baseClasses, variantClasses[variant], hoverClasses, className)} {...animationProps}>
      {/* Enhanced shimmer effect */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </CardComponent>
  )
}

export function GlassButton({
  children,
  className,
  variant = "default",
  ...props
}: {
  children: ReactNode
  className?: string
  variant?: "default" | "primary" | "ghost"
  [key: string]: any
}) {
  const variantClasses = {
    default: "bg-white/10 hover:bg-white/20 border-white/20 hover:border-white/40",
    primary: "bg-blue-500/20 hover:bg-blue-500/30 border-blue-400/30 hover:border-blue-400/50 text-blue-100",
    ghost: "bg-transparent hover:bg-white/10 border-white/10 hover:border-white/20",
  }

  return (
    <motion.button
      className={cn(
        "px-6 py-3 rounded-lg backdrop-blur-md border transition-all duration-300 relative overflow-hidden",
        "text-white font-mono text-sm tracking-wide",
        "hover:shadow-lg hover:shadow-white/10",
        variantClasses[variant],
        className,
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
    </motion.button>
  )
}
