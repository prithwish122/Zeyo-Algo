"use client"
import { motion } from "motion/react"

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Connect & Deposit",
      description: "Connect your wallet and deposit assets into secure smart contract vaults",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      number: "02",
      title: "Generate zkProofs",
      description: "Create zero-knowledge proofs of your trading performance without revealing sensitive data",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      number: "03",
      title: "Trade Privately",
      description: "Execute trades and track portfolio performance while maintaining complete privacy",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      number: "04",
      title: "Share zkBadges",
      description: "Export verifiable credentials to prove your trading skills without exposing your data",
      image: "/placeholder.svg?height=300&width=300",
    },
  ]

  return (
    <div className="w-full bg-black py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">How Zeyo Works</h2>
          <p className="text-slate-400 text-lg">Simple steps to private DeFi trading</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="relative mb-6 mx-auto w-64 h-64 rounded-2xl bg-gradient-to-br from-purple-900/20 to-black border border-purple-500/20 overflow-hidden group hover:border-purple-500/40 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex items-center justify-center h-full">
                  <img
                    src={step.image || "/placeholder.svg"}
                    alt={step.title}
                    className="w-32 h-32 object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                <div className="absolute top-4 left-4 text-purple-400 text-sm font-mono">{step.number}</div>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-slate-400 text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
