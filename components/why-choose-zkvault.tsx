"use client"
import { cn } from "@/lib/utils"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import { Shield, Zap, Lock, BarChart3, Globe, FileText } from "lucide-react"
import { motion } from "motion/react"
import { Meteors } from "@/components/ui/meteors"

export default function WhyChooseAlgorandSBT() {
  return (
    <div className="w-full bg-black py-24 roboto-regular">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl text-white mb-6 tracking-tight"
          >
            Why Choose us?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-slate-300 max-w-3xl mx-auto roboto-light"
          >
            User-owned reputation system built for the multi-chain future
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

// Instant Reputation Minting Animation
const SkeletonOne = () => {
  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-slate-800/50 to-slate-900/30 flex-col space-y-4 relative overflow-hidden p-4 rounded-xl border border-slate-700/50"
    >
      <Meteors number={15} />

      {/* Verification Display */}
      <div className="text-center">
        <div className="text-xs text-cyan-400 mb-1 roboto-medium tracking-wider">VERIFICATION TIME</div>
        <motion.div
          className="text-4xl font-bold text-white roboto-bold"
          animate={{
            scale: [1, 1.05, 1],
            color: ["#ffffff", "#06b6d4", "#ffffff"],
          }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          Seconds
        </motion.div>
        <div className="text-sm text-emerald-400 mt-1 roboto-medium">Wallet activity verified instantly</div>
      </div>

      {/* SBT Minting Animation */}
      <div className="space-y-2">
        <motion.div
          className="h-2 bg-slate-700/50 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
        </motion.div>
        <div className="text-xs text-slate-300 roboto-light">
          Mint Soulbound Token reflecting your on-chain trust score
        </div>
      </div>
    </motion.div>
  )
}

// Cost Comparison Animation
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
      name: "Coursera Plus",
      fee: "$59",
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-500/10 border-amber-500/30",
    },
    {
      name: "Algorand SBT",
      fee: "<$0.01",
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-500/10 border-emerald-500/30",
    },
  ]

  return (
    <motion.div className="flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-slate-800/50 to-slate-900/30 p-4 relative overflow-hidden rounded-xl border border-slate-700/50">
      <Meteors number={10} />
      <div className="w-full space-y-3">
        <div className="text-center text-sm text-cyan-400 mb-4 roboto-medium tracking-wider">COST COMPARISON</div>
        <div className="grid grid-cols-2 gap-2">
          {platforms.map((platform, i) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className={`p-3 rounded-lg ${platform.bgColor} border backdrop-blur-sm`}
            >
              <div className="text-xs text-slate-200 font-medium roboto-medium">{platform.name}</div>
              <div className="text-lg font-bold text-white roboto-bold">{platform.fee}</div>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="text-center text-xs text-emerald-400 mt-2 roboto-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          99% cheaper, powered by Algorand
        </motion.div>
      </div>
    </motion.div>
  )
}

// Privacy vs Traditional Systems
const SkeletonThree = () => {
  return (
    <motion.div className="flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-slate-800/50 to-slate-900/30 p-4 relative overflow-hidden rounded-xl border border-slate-700/50">
      <Meteors number={20} />
      <div className="w-full flex flex-col justify-center space-y-4">
        <div className="text-center">
          <div className="text-sm text-cyan-400 mb-2 roboto-medium tracking-wider">PRIVACY + OWNERSHIP</div>
          <div className="flex justify-between items-center">
            <div className="text-xs text-red-400 roboto-light">Full Data Exposure</div>
            <div className="text-xs text-emerald-400 roboto-light">Wallet-Only</div>
          </div>

          {/* Balance Scale Animation */}
          <div className="relative mt-4">
            <motion.div
              className="w-full h-1 bg-gradient-to-r from-red-400 via-amber-400 to-emerald-400 rounded-full"
              animate={{
                boxShadow: [
                  "0 0 10px rgba(16, 185, 129, 0.5)",
                  "0 0 20px rgba(16, 185, 129, 0.8)",
                  "0 0 10px rgba(16, 185, 129, 0.5)",
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

        <div className="text-xs text-center text-slate-300 roboto-light">
          User-owned identity - your SBT is tied to your wallet
        </div>
      </div>
    </motion.div>
  )
}

// Live Reputation Insights
const SkeletonFour = () => {
  const metrics = [
    { label: "Proofs Minted", value: "1,247", change: "+23%", color: "text-emerald-400" },
    { label: "dApps Integrated", value: "89", change: "+12%", color: "text-cyan-400" },
    { label: "Avg Trust Score", value: "74%", change: "+0.2%", color: "text-violet-400" },
  ]

  return (
    <motion.div className="flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-slate-800/50 to-slate-900/30 relative overflow-hidden p-4 rounded-xl border border-slate-700/50">
      <Meteors number={12} />

      <div className="w-full space-y-4">
        <div className="text-sm text-cyan-400 text-center mb-4 roboto-medium tracking-wider">LIVE REPUTATION INSIGHTS</div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-2">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.3 }}
              className="bg-slate-800/30 rounded-lg p-2 border border-slate-600/30 backdrop-blur-sm"
            >
              <div className="text-xs text-slate-400 roboto-light">{metric.label}</div>
              <motion.div
                className="text-lg font-bold text-white roboto-bold"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.5 }}
              >
                {metric.value}
              </motion.div>
              <div className={`text-xs ${metric.color} roboto-medium`}>{metric.change}</div>
            </motion.div>
          ))}
        </div>

        {/* Animated Chart */}
        <div className="flex items-end justify-between h-16 space-x-1">
          {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
            <motion.div
              key={i}
              className="bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t-sm flex-1"
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
      </div>
    </motion.div>
  )
}

// Multi-Chain Network Animation
const SkeletonFive = () => {
  const chains = [
    { name: "Algorand", x: 50, y: 30, color: "from-cyan-400 to-cyan-600" },
    { name: "Ethereum", x: 20, y: 50, color: "from-purple-400 to-purple-600" },
    { name: "Polygon", x: 80, y: 45, color: "from-violet-400 to-violet-600" },
    { name: "Solana", x: 35, y: 75, color: "from-green-400 to-green-600" },
    { name: "Future", x: 75, y: 70, color: "from-orange-400 to-orange-600" },
  ]

  return (
    <motion.div className="flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-slate-800/50 to-slate-900/30 relative overflow-hidden p-4 rounded-xl border border-slate-700/50">
      <Meteors number={8} />

      <div className="w-full h-full relative">
        <div className="text-xs text-cyan-400 text-center mb-4 roboto-medium tracking-wider">
          MULTI-CHAIN READY
        </div>

        {/* Chain Nodes */}
        {chains.map((chain, i) => (
          <motion.div
            key={chain.name}
            className={`absolute w-8 h-8 bg-gradient-to-r ${chain.color} rounded-full flex items-center justify-center shadow-lg`}
            style={{ left: `${chain.x}%`, top: `${chain.y}%`, transform: "translate(-50%, -50%)" }}
            animate={{
              scale: [1, 1.2, 1],
              boxShadow: [
                "0 0 0 0 rgba(6, 182, 212, 0.4)",
                "0 0 0 8px rgba(6, 182, 212, 0)",
                "0 0 0 0 rgba(6, 182, 212, 0)",
              ],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.4 }}
          >
            <div className="text-xs font-bold text-white roboto-bold">{chain.name === "Future" ? "?" : chain.name.slice(0, 2)}</div>
          </motion.div>
        ))}

        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {chains.map((chain, i) => (
            <motion.line
              key={`line-${i}`}
              x1={`${chain.x}%`}
              y1={`${chain.y}%`}
              x2="50%"
              y2="30%"
              stroke="rgba(6, 182, 212, 0.3)"
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

        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-slate-300 roboto-light text-center">
          Unified identity across ecosystems
        </div>
      </div>
    </motion.div>
  )
}

const items = [
  {
    title: "Instant Reputation Minting",
    description: (
      <span className="text-sm roboto-light">
        Wallet activity verified in seconds. Mint SBT reflecting your on-chain trust score.
      </span>
    ),
    header: <SkeletonOne />,
    className: "md:col-span-1",
    icon: <Zap className="h-4 w-4 text-cyan-400" />,
  },
  {
    title: "Ultra-Low Cost",
    description: (
      <span className="text-sm roboto-light">99% cheaper than traditional verification, powered by Algorand</span>
    ),
    header: <SkeletonTwo />,
    className: "md:col-span-1",
    icon: <Shield className="h-4 w-4 text-emerald-400" />,
  },
  {
    title: "Privacy + Ownership",
    description: (
      <span className="text-sm roboto-light">Prove credibility through wallet history - no personal data needed</span>
    ),
    header: <SkeletonThree />,
    className: "md:col-span-1",
    icon: <Lock className="h-4 w-4 text-violet-400" />,
  },
  {
    title: "Live Reputation Insights",
    description: (
      <span className="text-sm roboto-light">Real-time dashboards showing adoption and reputation metrics</span>
    ),
    header: <SkeletonFour />,
    className: "md:col-span-2",
    icon: <BarChart3 className="h-4 w-4 text-cyan-400" />,
  },
  {
    title: "Multi-Chain Ready",
    description: (
      <span className="text-sm roboto-light">Future-proof reputation extending to Ethereum, Polygon, Solana, and more</span>
    ),
    header: <SkeletonFive />,
    className: "md:col-span-1",
    icon: <Globe className="h-4 w-4 text-orange-400" />,
  },
]