"use client"
import type React from "react"
import { useRef, useEffect, useState } from "react"

export interface BentoCardProps {
  color?: string
  title?: string
  description?: string
  label?: string
  textAutoHide?: boolean
  disableAnimations?: boolean
}

export interface BentoProps {
  textAutoHide?: boolean
  enableStars?: boolean
  enableSpotlight?: boolean
  enableBorderGlow?: boolean
  disableAnimations?: boolean
  spotlightRadius?: number
  particleCount?: number
  enableTilt?: boolean
  glowColor?: string
  clickEffect?: boolean
  enableMagnetism?: boolean
}

const DEFAULT_PARTICLE_COUNT = 12
const DEFAULT_SPOTLIGHT_RADIUS = 300
const DEFAULT_GLOW_COLOR = "132, 0, 255"
const MOBILE_BREAKPOINT = 768

const cardData: BentoCardProps[] = [
  {
    color: "#060010",
    title: "Zero-Knowledge Privacy",
    description: "Trade privately without revealing wallet addresses or balances",
    label: "Privacy",
  },
  {
    color: "#060010",
    title: "zkBadges & Proofs",
    description: "Generate verifiable credentials for your trading performance",
    label: "Credentials",
  },
  {
    color: "#060010",
    title: "Smart Contract Vaults",
    description: "Secure asset storage with automated portfolio tracking",
    label: "Security",
  },
  {
    color: "#060010",
    title: "zkRollup Integration",
    description: "Built on zkSync and Scroll for optimal performance",
    label: "Scalability",
  },
  {
    color: "#060010",
    title: "Portfolio Analytics",
    description: "Track performance metrics without data exposure",
    label: "Analytics",
  },
  {
    color: "#060010",
    title: "Circom/Noir Support",
    description: "Advanced zero-knowledge proof generation",
    label: "Technology",
  },
]

// Include the full MagicBento component here (truncated for brevity)
const MagicBento: React.FC<BentoProps> = ({
  textAutoHide = true,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = false,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
  enableMagnetism = true,
}) => {
  const gridRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const shouldDisableAnimations = disableAnimations || isMobile

  return (
    <div className="w-full bg-black py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl text-white mb-4 tracking-tight">How Zeyo Works ?</h1>
        <p className="text-slate-400 text-lg">Advanced privacy features for the modern DeFi trader</p>
      </div>

      <div className="flex justify-center">
        <div className="grid gap-4 p-4 max-w-6xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="relative aspect-[4/3] min-h-[200px] w-full max-w-full p-6 rounded-[20px] border border-purple-500/20 bg-gradient-to-br from-purple-900/20 to-black hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/20"
            >
              <div className="flex flex-col h-full justify-between">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-purple-400 text-sm font-medium">{card.label}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg mb-2">{card.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MagicBento
