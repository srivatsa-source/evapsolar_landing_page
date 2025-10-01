import type React from "react"
import type { Metadata } from "next"
import { Share_Tech_Mono, IBM_Plex_Mono, Orbitron, Exo_2 } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const shareTechMono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-share-tech-mono",
})

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
})

const orbitron = Orbitron({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-orbitron",
})

const exo2 = Exo_2({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-exo-2",
})

export const metadata: Metadata = {
  title: "Evap Solar - Energizing the Future with Zinc-Ion Innovation",
  description: "Next-Gen Solar • Zinc-Ion Storage • AI-Optimized EV Charging",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-mono ${orbitron.variable} ${exo2.variable}`}>
        <Suspense fallback={null}>
          {children}
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
