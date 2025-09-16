"use client"
import { motion } from "motion/react"
import { LampContainer } from "@/components/ui/lamp"

export default function HeroSection() {
  return (
    <div className="h-screen">
      <LampContainer className="bg-gradient-to-b from-black via-blue-950 to-black h-full">
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-8 bg-gradient-to-br from-blue-200 to-blue-400 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          Private DeFi <br /> Trading with zkProofs
        </motion.h1>
        <motion.p
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-6 text-center text-lg text-blue-200/80 max-w-2xl"
        >
          Deposit assets into smart contract vaults and privately track your portfolio performance using zero-knowledge
          proofs. Trade with confidence while keeping your data secure.
        </motion.p>
        <motion.div
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.7,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-8 flex gap-4"
        >
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-colors shadow-lg shadow-blue-500/25">
            Launch App
          </button>
          <button className="px-8 py-3 border border-blue-500/50 text-blue-200 hover:bg-blue-950/50 rounded-full font-medium transition-colors">
            Learn More
          </button>
        </motion.div>
      </LampContainer>
    </div>
  )
}
