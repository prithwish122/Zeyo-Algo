"use client"

import { motion } from "framer-motion"
import { Wallet, BarChart3, Award, ArrowRight } from "lucide-react"

export default function HowZeyoWorks() {
  const phases = [
    {
      id: "01",
      title: "Setup & Connection",
      subtitle: "Wallet Linking",
      description:
        "Connect your Algorand wallet securely. The system checks your on-chain activity without asking for personal data.",
      details: [
        "Private and secure wallet connection",
        "No personal info required",
        "On-chain data fetching only",
      ],
      icon: Wallet,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "02",
      title: "Reputation Scoring",
      subtitle: "On-Chain Activity Analysis",
      description:
        "Your wallet activity is analyzed across balance, staking, governance, transactions, and dApp participation to generate a reputation score.",
      details: [
        "Wallet balance, staking, and governance signals",
        "Transaction activity from the last 3 months",
        "dApp participation and external attestations",
      ],
      icon: BarChart3,
      color: "from-emerald-500 to-teal-500",
    },
    {
      id: "03",
      title: "Credential Minting",
      subtitle: "Soulbound Reputation Token",
      description:
        "Mint a non-transferable Soulbound Token (SBT) that represents your reputation score and achievements directly on Algorand.",
      details: [
        "Unique, wallet-bound token",
        "Verifiable reputation credential",
        "Cannot be transferred or sold",
      ],
      icon: Award,
      color: "from-purple-500 to-pink-500",
    },
  ]

  return (
    <div className="w-full min-h-screen bg-black py-16 px-4 flex items-center justify-center">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl text-white mb-4 tracking-tight">
            How Zeyo Works ?
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            A simple and transparent way to build reputation on Algorand using Soulbound Tokens
          </p>
        </motion.div>

        {/* Process Flow */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 z-0">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 0.8 }}
              className="h-full bg-gradient-to-r from-transparent via-gray-600 to-transparent origin-center"
            />
          </div>

          {phases.map((phase, index) => (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative z-10"
            >
              {/* Glass Container */}
              <div className="relative h-[36rem] rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${phase.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}
                />

                {/* Content */}
                <div className="relative z-10 p-10 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-gray-500 text-sm font-mono tracking-wider">
                      PHASE {phase.id}
                    </span>
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${phase.color} p-0.5`}
                    >
                      <div className="w-full h-full rounded-xl bg-black/80 flex items-center justify-center">
                        <phase.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-gray-100 transition-colors duration-300">
                    {phase.title}
                  </h3>

                  <p
                    className={`text-base font-medium text-transparent bg-gradient-to-r ${phase.color} bg-clip-text mb-6`}
                  >
                    {phase.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-gray-400 text-base leading-relaxed mb-8 group-hover:text-gray-300 transition-colors duration-300">
                    {phase.description}
                  </p>

                  {/* Details List */}
                  <div className="flex-1">
                    <ul className="space-y-3">
                      {phase.details.map((detail, detailIndex) => (
                        <motion.li
                          key={detailIndex}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: index * 0.2 + detailIndex * 0.1 + 0.8,
                          }}
                          className="flex items-start gap-3 text-sm text-gray-500"
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${phase.color} mt-2 flex-shrink-0`}
                          />
                          <span className="leading-relaxed">{detail}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Subtle Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Flow Arrow */}
              {index < phases.length - 1 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-20">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 + 1.5 }}
                  >
                    <ArrowRight className="w-5 h-5 text-gray-600" />
                  </motion.div>
                </div>
              )}

              {/* Mobile Flow Indicator */}
              {index < phases.length - 1 && (
                <div className="lg:hidden flex justify-center my-6">
                  <motion.div
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    transition={{ delay: index * 0.2 + 1 }}
                    className="w-px h-8 bg-gradient-to-b from-gray-600 to-gray-800"
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-full font-medium text-sm transition-all duration-300 hover:bg-white/15 hover:border-white/30"
          >
            Mint Your Reputation
          </motion.button>
          <p className="text-gray-500 text-xs mt-3">
            Start building your on-chain reputation today
          </p>
        </motion.div>
      </div>
    </div>
  )
}
