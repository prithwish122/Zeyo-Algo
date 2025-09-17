"use client"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([0])

  const faqs = [
    {
      question: "Is Zeyo available for all blockchains?",
      answer:
        "Zeyo currently supports the Algorand blockchain, with plans to expand to more privacy-focused chains. You can generate zero-knowledge proofs of your activity across all supported networks.",
    },
    {
      question: "How does zero-knowledge proof work?",
      answer:
        "Zero-knowledge proofs let you prove an on-chain fact without revealing your wallet address, balances, or transaction history. In Zeyo, you can prove staking, holding, or activity while staying fully private.",
    },
    {
      question: "Can I try Zeyo without connecting my real wallet?",
      answer:
        "Yes! You can use demo mode to explore the interface and simulate activity proofs without using your real wallet. This is a safe way to understand how proofs are generated.",
    },
    {
      question: "What kind of activities can I prove?",
      answer:
        "You can prove staking in Algorand, validator participation, token holdings, NFT ownership, and DeFi interactions — all without exposing your actual wallet or balances.",
    },
    {
      question: "Is customer support available?",
      answer:
        "We provide help through our documentation, community channels, and support desk. Whether you’re a staker, delegator, or developer, we’re here to help.",
    },
  ]

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  return (
    <div className="w-full bg-black py-24">
      <div className="max-w-4xl mx-auto px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl tracking-tight text-white mb-6 font-sans"
          >
            Everything you <span className="italic text-orange-300">need</span> to know.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-orange-200/80 font-sans"
          >
            Got questions? We've got answers. Here’s what you need to know to start proving your Algorand activity privately.
          </motion.p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="border border-orange-500/20 rounded-2xl overflow-hidden bg-gradient-to-r from-orange-950/20 to-black/20 hover:from-orange-950/30 hover:to-black/30 transition-all duration-300"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-orange-800/10 transition-colors duration-200"
              >
                <span className="text-white font-medium text-lg pr-4 font-sans">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openItems.includes(index) ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-orange-400" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openItems.includes(index) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-8 pb-6 text-orange-200/90 leading-relaxed font-sans">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
