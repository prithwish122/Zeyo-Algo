import { motion } from "motion/react"
import {
  TrendingUp, Activity, PieChart, Shield, Trophy, Zap, Target, Globe, Users, FileText, Search
} from "lucide-react"
import { useState } from "react"

const ZeyoMainContent = ({ themeColor = "#f96e34" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="ml-72 space-y-8 pt-20"
    >
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-8">
          <ReputationTimelineCard themeColor={themeColor} />
        </div>
        <div className="col-span-4">
          <ProofTypeDistributionCard themeColor={themeColor} />
        </div>
        <div className="col-span-6">
          <RecentActivityCard themeColor={themeColor} />
        </div>
        <div className="col-span-6">
          <MultiChainReputationCard themeColor={themeColor} />
        </div>
      </div>
    </motion.div>
  )
}

const ReputationTimelineCard = ({ themeColor = "#f96e34" }) => {
  const [selectedFilter, setSelectedFilter] = useState("all")
  const filters = [
    { id: "all", label: "All Activity" },
    { id: "dao", label: "DAO" },
    { id: "trading", label: "Trading" },
    { id: "nft", label: "NFT" },
  ]

  const timelineData = Array.from({ length: 30 }, (_, i) => ({
    day: i,
    score: 70 + Math.sin(i * 0.2) * 15 + Math.random() * 10,
    activity: ["dao", "trading", "nft"][Math.floor(Math.random() * 3)],
  }))

  const filteredData =
    selectedFilter === "all" ? timelineData : timelineData.filter((item) => item.activity === selectedFilter)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 h-full relative overflow-hidden border border-white/10 shadow-2xl"
    >
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <TrendingUp className={`w-6 h-6`} style={{ color: themeColor }} />
            <h3 className="text-2xl font-bold text-white">REPUTATION TIMELINE</h3>
          </div>
          <div className="flex space-x-2">
            {filters.map((filter) => (
              <div key={filter.id} className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-1">
                <button
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    selectedFilter === filter.id
                      ? `bg-[${themeColor}]/20 text-[${themeColor}] border border-[${themeColor}]/30`
                      : "bg-transparent text-gray-400 hover:text-white"
                  }`}
                  style={selectedFilter === filter.id ? { color: themeColor, borderColor: themeColor, backgroundColor: "#f96e3420" } : {}}
                >
                  {filter.label}
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 flex items-end justify-between space-x-1 mb-6">
          {filteredData.slice(-25).map((item, i) => (
            <motion.div
              key={i}
              className="rounded-t-sm flex-1 min-w-0 shadow-sm"
              style={{
                background: `linear-gradient(to top, ${themeColor}99 60%, ${themeColor})`
              }}
              initial={{ height: "0%" }}
              animate={{ height: `${(item.score / 100) * 100}%` }}
              transition={{
                duration: 0.8,
                delay: i * 0.02,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">30 days ago</span>
          <div className="text-center">
            <div className="text-3xl font-bold" style={{ color: themeColor }}>
              {Math.round(timelineData[timelineData.length - 1]?.score || 85)}
            </div>
            <div className="text-gray-400 text-sm">Current Score</div>
          </div>
          <span className="text-gray-400 text-sm">Today</span>
        </div>
      </div>
    </motion.div>
  )
}

const ProofTypeDistributionCard = ({ themeColor = "#f96e34" }) => {
  const proofTypes = [
    {
      title: "Identity Verification",
      value: 2847,
      color: themeColor,
      icon: Shield,
    },
    {
      title: "Credential Proofs",
      value: 1923,
      color: themeColor,
      icon: Trophy,
    },
    {
      title: "Transaction Proofs",
      value: 1456,
      color: themeColor,
      icon: Zap,
    },
    {
      title: "Reputation Proofs",
      value: 892,
      color: themeColor,
      icon: Target,
    },
  ]

  const total = proofTypes.reduce((sum, item) => sum + item.value, 0)
  const proofTypesWithPercentages = proofTypes.map((proof) => ({
    ...proof,
    percentage: Math.round((proof.value / total) * 100),
  }))

  let cumulativeAngle = 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 h-full relative overflow-hidden border border-white/10 shadow-2xl"
    >
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex items-center space-x-3 mb-6">
          <PieChart className="w-6 h-6" style={{ color: themeColor }} />
          <h3 className="text-xl font-bold text-white">PROOF TYPE DISTRIBUTION</h3>
        </div>
        <div className="flex-1 flex items-center justify-center mb-6">
          <div className="relative w-48 h-48">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
              {proofTypesWithPercentages.map((proof, i) => {
                const angle = (proof.value / total) * 360
                const radius = 80
                const circumference = 2 * Math.PI * radius
                const strokeDasharray = circumference
                const strokeDashoffset = circumference - (circumference * proof.value) / total
                const result = (
                  <motion.circle
                    key={proof.title}
                    cx="100"
                    cy="100"
                    r={radius}
                    fill="transparent"
                    stroke={themeColor}
                    strokeWidth="16"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    className="drop-shadow-lg"
                    style={{
                      transformOrigin: "100px 100px",
                      transform: `rotate(${cumulativeAngle}deg)`,
                      filter: `drop-shadow(0 0 8px ${themeColor}40)`,
                    }}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1.5, delay: i * 0.2 + 0.3, ease: "easeInOut" }}
                  />
                )
                cumulativeAngle += angle
                return result
              })}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{total.toLocaleString()}</div>
                <div className="text-xs text-gray-400">Total Proofs</div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          {proofTypesWithPercentages.map((proof, i) => (
            <motion.div
              key={proof.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 + 0.5 }}
              className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: themeColor }} />
                <div>
                  <div className="text-white font-medium text-sm">{proof.title}</div>
                  <div className="text-gray-400 text-xs">{proof.value.toLocaleString()} proofs</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white font-bold text-sm">{proof.percentage}%</div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-4 p-3 rounded-lg border" style={{ backgroundColor: `${themeColor}1A`, borderColor: `${themeColor}33` }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4" style={{ color: themeColor }} />
              <span className="text-white font-medium text-sm">Network Efficiency</span>
            </div>
            <div className="font-bold text-lg" style={{ color: themeColor }}>99.7%</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const RecentActivityCard = ({ themeColor = "#f96e34" }) => {
  const activities = [
    {
      type: "proof",
      title: "ZK Proof Generated",
      description: "DeFi trading credentials verified",
      amount: "-0.01 CORE",
      time: "2m ago",
      status: "Completed",
      icon: FileText,
    },
    {
      type: "verification",
      title: "Credential Verified",
      description: "LinkedIn professional badge",
      amount: "-0.01 CORE",
      time: "5m ago",
      status: "Success",
      icon: Search,
    },
    {
      type: "mint",
      title: "Achievement Badge",
      description: "Trading volume milestone",
      amount: "+1 Badge",
      time: "8m ago",
      status: "Minted",
      icon: Trophy,
    },
    {
      type: "dao",
      title: "DAO Participation",
      description: "Governance vote submitted",
      amount: "+0.5 CORE",
      time: "12m ago",
      status: "Rewarded",
      icon: Users,
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 h-full relative overflow-hidden border border-white/10 shadow-2xl"
    >
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex items-center space-x-3 mb-8">
          <Activity className="w-6 h-6" style={{ color: themeColor }} />
          <h3 className="text-2xl font-bold text-white">Recent Activity</h3>
        </div>
        <div className="space-y-4 flex-1 overflow-y-auto">
          {activities.map((activity, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 + 0.4 }}
              className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-[#f96e34]/30 transition-all duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12" style={{ backgroundColor: "#f96e341A", borderColor: "#f96e3433" }} className="rounded-xl flex items-center justify-center border">
                  <activity.icon className="w-5 h-5" style={{ color: themeColor }} />
                </div>
                <div>
                  <div className="text-white font-medium text-sm">{activity.title}</div>
                  <div className="text-gray-400 text-xs">{activity.description}</div>
                  <div className="text-gray-500 text-xs mt-1">{activity.time}</div>
                </div>
              </div>
              <div className="text-right">
                <div
                  className={`text-sm font-medium ${
                    activity.amount.startsWith("+") ? "" : "text-gray-300"
                  }`}
                  style={activity.amount.startsWith("+") ? { color: themeColor } : {}}
                >
                  {activity.amount}
                </div>
                <div className="text-[#f96e34] text-xs">{activity.status}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

const MultiChainReputationCard = ({ themeColor = "#f96e34" }) => {
  const chains = [
    { name: "zk", color: themeColor, position: { x: 20, y: 30 } },
    { name: "Sc", color: themeColor, position: { x: 70, y: 20 } },
    { name: "S", color: themeColor, position: { x: 50, y: 60 } },
    { name: "Ar", color: themeColor, position: { x: 15, y: 70 } },
    { name: "Po", color: themeColor, position: { x: 80, y: 65 } },
    { name: "Op", color: themeColor, position: { x: 60, y: 25 } },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 h-full relative overflow-hidden border border-white/10 shadow-2xl"
    >
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex items-center space-x-3 mb-8">
          <Globe className="w-6 h-6" style={{ color: themeColor }} />
          <h3 className="text-2xl font-bold text-white">MULTI-CHAIN REPUTATION</h3>
        </div>
        <div className="flex-1 flex items-center justify-between">
          <div className="relative w-80 h-60">
            {chains.map((chain, i) => (
              <motion.div
                key={chain.name}
                className="absolute w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg backdrop-blur-sm border border-white/20"
                style={{
                  backgroundColor: `${chain.color}80`,
                  left: `${chain.position.x}%`,
                  top: `${chain.position.y}%`,
                  boxShadow: `0 0 20px ${chain.color}40`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.1 + 0.5, type: "spring" }}
                whileHover={{ scale: 1.1 }}
              >
                {chain.name}
              </motion.div>
            ))}
            <svg className="absolute inset-0 w-full h-full">
              {chains.flatMap((chain, i) =>
                chains
                  .slice(i + 1)
                  .map((otherChain, j) => (
                    <motion.line
                      key={`${i}-${j}`}
                      x1={`${chain.position.x + 3}%`}
                      y1={`${chain.position.y + 3}%`}
                      x2={`${otherChain.position.x + 3}%`}
                      y2={`${otherChain.position.y + 3}%`}
                      stroke="rgba(249, 110, 52, 0.2)"
                      strokeWidth="1"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: (i + j) * 0.1 + 0.8, duration: 0.5 }}
                    />
                  )),
              )}
            </svg>
          </div>
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">6</div>
              <div className="text-gray-400 text-sm">Chains Connected</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2" style={{ color: themeColor }}>99.8%</div>
              <div className="text-gray-400 text-sm">Reputation Score</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-white">Cross-Chain Reputation</div>
              <div className="text-gray-400 text-sm mt-2">Unified identity across multiple blockchain networks</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ZeyoMainContent
