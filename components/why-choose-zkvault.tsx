"use client"
import { cn } from "@/lib/utils"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { Shield, Zap, Lock, BarChart3, Globe } from 'lucide-react'
import { motion } from "framer-motion"
import { Meteors } from "@/components/ui/meteors"

export default function WhyChooseZeyo() {
  return (
    <div className="w-full bg-black py-24">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl text-white mb-6 tracking-tight"
          >
            Why Choose Zeyo?
          </motion.h2>
          <motion.p
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, delay: 0.2 }}
className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed"
>
           The privacy-first reputation layer for the Core ecosystem built for stakers, validators, and DeFi pioneers
          
</motion.p>
        </div>
        <BentoGrid className="max-w-6xl mx-auto md:auto-rows-[20rem]">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              className={cn("[&>p:text-lg]", item.className)}
              icon={item.icon}
            />
          ))}
        </BentoGrid>
      </div>
    </div>
  )
}

// Instant Proof Generation Animation
const SkeletonOne = () => {
  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-orange-800/50 to-yellow-900/30 flex-col space-y-4 relative overflow-hidden p-4 rounded-xl border border-orange-700/50"
    >
      <Meteors number={15} />

      {/* Block Time Display */}
      <div className="text-center">
        <div className="text-xs mb-1 font-medium tracking-wider text-orange-400">PROOF GENERATION</div>
        <motion.div
          className="text-4xl font-bold text-white"
          animate={{
            scale: [1, 1.05, 1],
            color: ["#ffffff", "#f97316", "#ffffff"],
          }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          0.3s
        </motion.div>
        <div className="text-sm text-yellow-400 mt-1 font-medium">Your Core credentials, verified instantly</div>
      </div>

      {/* Progress Animation */}
      <div className="space-y-2">
        <motion.div
          className="h-2 bg-orange-700/50 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: `linear-gradient(to right, #f97316, #fbbf24)` }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
        </motion.div>
        <div className="text-xs text-slate-300">
          Zeyo uses zero-knowledge proofs + parallel processing to confirm your staking, validator, or DeFi activity
        </div>
      </div>
    </motion.div>
  )
}

// Fee Comparison Animation
const SkeletonTwo = () => {
  const platforms = [
    {
      name: "Traditional KYC",
      fee: "$25-100",
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-500/10 border-red-500/30",
    },
    {
      name: "LinkedIn Premium",
      fee: "$29.99",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-500/10 border-orange-500/30",
    },
    {
      name: "Blockchain Credentialing",
      fee: "$5-20",
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-500/10 border-amber-500/30",
    },
    {
      name: "Zeyo (Core)",
      fee: "$0.01",
      color: "from-orange-500 to-yellow-500",
      bgColor: "bg-orange-500/10 border-orange-500/30",
    },
  ]

  return (
    <motion.div className="flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-orange-800/50 to-yellow-900/30 p-4 relative overflow-hidden rounded-xl border border-orange-700/50">
      <Meteors number={10} />
      <div className="w-full space-y-3">
        <div className="text-center text-sm mb-4 font-medium tracking-wider text-orange-400">COST COMPARISON</div>
        <div className="grid grid-cols-2 gap-2">
          {platforms.map((platform, i) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className={`p-3 rounded-lg ${platform.bgColor} border backdrop-blur-sm`}
            >
              <div className="text-xs text-slate-200 font-medium">{platform.name}</div>
              <div className="text-lg font-bold text-white">{platform.fee}</div>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="text-center text-xs text-yellow-400 mt-2 font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          99% cheaper - Prove your Core ecosystem achievements without compromising privacy
        </motion.div>
      </div>
    </motion.div>
  )
}

// Privacy vs Transparency Balance
const SkeletonThree = () => {
  return (
    <motion.div className="flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-orange-800/50 to-yellow-900/30 p-4 relative overflow-hidden rounded-xl border border-orange-700/50">
      <Meteors number={20} />
      <div className="w-full flex flex-col justify-center space-y-4">
        <div className="text-center">
          <div className="text-sm mb-2 font-medium tracking-wider text-orange-400">PRIVACY + VERIFIABILITY</div>
          <div className="flex justify-between items-center">
            <div className="text-xs text-red-400">Full Exposure ❌</div>
            <div className="text-xs text-yellow-400">Zero Knowledge ✅</div>
          </div>

          {/* Balance Scale Animation */}
          <div className="relative mt-4">
            <motion.div
              className="w-full h-1 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 rounded-full"
              animate={{
                boxShadow: [
                  "0 0 10px rgba(249, 115, 22, 0.5)",
                  "0 0 20px rgba(249, 115, 22, 0.8)",
                  "0 0 10px rgba(249, 115, 22, 0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
            <motion.div
              className="absolute w-4 h-4 bg-white rounded-full top-1/2 transform -translate-y-1/2 shadow-lg"
              animate={{ left: ["10%", "90%", "90%"] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
          </div>
        </div>

        <div className="text-xs text-center text-slate-300 font-medium">
          <span className="text-yellow-400">Prove Without Doxxing</span> - Show off your Core milestones without revealing wallet addresses, balances, or transaction history
        </div>
      </div>
    </motion.div>
  )
}

// Real-time Analytics Dashboard
const SkeletonFour = () => {
  const metrics = [
    { label: "Core Proofs Generated", value: "1,247", change: "+23%", color: "text-yellow-400" },
    { label: "Core DAOs Integrated", value: "32", change: "+18%", color: "text-orange-400" },
    { label: "Active Validators Verified", value: "214", change: "+12%", color: "text-amber-400" },
    { label: "Privacy Score", value: "99.8%", change: "+0.2%", color: "text-yellow-400" },
  ]

  return (
    <motion.div className="flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-orange-800/50 to-yellow-900/30 relative overflow-hidden p-4 rounded-xl border border-orange-700/50">
      <Meteors number={12} />

      <div className="w-full space-y-4">
        <div className="text-sm text-center mb-4 font-medium tracking-wider text-orange-400">LIVE CORE NETWORK STATS</div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-2">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-orange-800/30 rounded-lg p-2 border border-orange-600/30 backdrop-blur-sm"
            >
              <div className="text-xs text-slate-400">{metric.label}</div>
              <motion.div
                className="text-lg font-bold text-white"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.5 }}
              >
                {metric.value}
              </motion.div>
              <div className={`text-xs ${metric.color} font-medium`}>{metric.change}</div>
            </motion.div>
          ))}
        </div>

        {/* Animated Chart */}
        <div className="flex items-end justify-between h-12 space-x-1">
          {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
            <motion.div
              key={i}
              className="rounded-t-sm flex-1"
              style={{ background: `linear-gradient(to top, #f97316, #fbbf24)` }}
              initial={{ height: "20%" }}
              animate={{ height: `${height}%` }}
              transition={{
                duration: 1,
                delay: i * 0.1,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                repeatDelay: 2,
              }}
            />
          ))}
        </div>

        <div className="text-xs text-center text-slate-300 mt-2">
          <span className="text-yellow-400">Real-Time Zeyo Analytics</span> - See proof generation, DAO adoption, and validator verification across the Core ecosystem
        </div>
      </div>
    </motion.div>
  )
}

// Core Ecosystem Reputation
const SkeletonFive = () => {
  const coreApps = [
    { name: "stCORE", x: 20, y: 30, color: "from-orange-400 to-orange-600", verified: true },
    { name: "Satoshi Plus", x: 80, y: 25, color: "from-yellow-400 to-yellow-600", verified: true },
    { name: "Validators", x: 50, y: 70, color: "from-amber-400 to-amber-600", verified: true },
    { name: "DeFi Apps", x: 25, y: 75, color: "from-orange-400 to-orange-600", verified: true },
    { name: "CoreNFT", x: 75, y: 65, color: "from-yellow-400 to-yellow-600", verified: true },
  ]

  return (
    <motion.div className="flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-orange-800/50 to-yellow-900/30 relative overflow-hidden p-4 rounded-xl border border-orange-700/50">
      <Meteors number={8} />

      <div className="w-full h-full relative">
        <div className="text-xs text-center mb-4 font-medium tracking-wider text-orange-400">CORE ECOSYSTEM REPUTATION</div>

        {/* Core App Nodes */}
        {coreApps.map((app, i) => (
          <motion.div
            key={app.name}
            className={`absolute w-8 h-8 bg-gradient-to-r ${app.color} rounded-full flex items-center justify-center shadow-lg`}
            style={{ left: `${app.x}%`, top: `${app.y}%`, transform: "translate(-50%, -50%)" }}
            animate={{
              scale: [1, 1.2, 1],
              boxShadow: [
                "0 0 0 0 rgba(249, 115, 22, 0.4)",
                "0 0 0 8px rgba(249, 115, 22, 0)",
                "0 0 0 0 rgba(249, 115, 22, 0)",
              ],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.4 }}
          >
            <div className="text-xs font-bold text-white">✅</div>
          </motion.div>
        ))}

        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {coreApps.map((app, i) => (
            <motion.line
              key={`line-${i}`}
              x1={`${app.x}%`}
              y1={`${app.y}%`}
              x2="50%"
              y2="50%"
              stroke="rgba(249, 115, 22, 0.3)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{
                duration: 1.5,
                delay: i * 0.2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                repeatDelay: 1,
              }}
            />
          ))}
        </svg>

        {/* Central Zeyo Hub */}
        <motion.div
          className="absolute w-6 h-6 rounded-full flex items-center justify-center shadow-lg"
          style={{ 
            left: "50%", 
            top: "50%", 
            transform: "translate(-50%, -50%)",
            background: `linear-gradient(to right, #f97316, #fbbf24)`
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <div className="text-xs font-bold text-white">Z</div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 text-xs text-center text-slate-300">
          {/* <span className="text-yellow-400">One ZK Identity</span> - Carry your Core reputation everywhere in the ecosystem */}
        </div>
      </div>
    </motion.div>
  )
}

const items = [
  {
    title: "Instant Proof Generation",
    description: (
      <span className="text-sm">Generate verifiable Core credentials in 0.3 seconds with parallel processing</span>
    ),
    header: <SkeletonOne />,
    className: "md:col-span-1",
    icon: <Zap className="h-4 w-4 text-orange-500" />,
  },
  {
    title: "Ultra-Low Verification Costs",
    description: <span className="text-sm">99% cheaper than traditional KYC and credential verification</span>,
    header: <SkeletonTwo />,
    className: "md:col-span-1",
    icon: <Shield className="h-4 w-4 text-yellow-400" />,
  },
  {
    title: "Privacy-First Verification",
    description: <span className="text-sm">Prove Core achievements without exposing sensitive wallet data</span>,
    header: <SkeletonThree />,
    className: "md:col-span-1",
    icon: <Lock className="h-4 w-4 text-amber-400" />,
  },
  {
    title: "Real-Time Core Analytics",
    description: <span className="text-sm">Live dashboard showing Core proof generation and ecosystem adoption metrics</span>,
    header: <SkeletonFour />,
    className: "md:col-span-2",
    icon: <BarChart3 className="h-4 w-4 text-orange-500" />,
  },
  {
    title: "Core Ecosystem Reputation",
    description: <span className="text-sm">Unified reputation system across stCORE, validators, DeFi apps, and CoreNFT projects</span>,
    header: <SkeletonFive />,
    className: "md:col-span-1",
    icon: <Globe className="h-4 w-4 text-orange-400" />,
  },
]