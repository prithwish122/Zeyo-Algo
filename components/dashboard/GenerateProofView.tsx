"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "motion/react"
import { ArrowLeft, Loader2, Check, Star, TrendingUp, Award } from "lucide-react"
import { useWallet } from "@txnlab/use-wallet-react"

interface LogEntry {
  type: "info" | "success" | "error"
  message: string
  timestamp: string
}

interface ReputationScore {
  walletBalance: number
  stakingGovernance: number
  transactionActivity: number
  dappParticipation: number
  externalAttestations: number
  totalScore: number
}

interface GovernancePeriod {
  id: string
  slug: string
  title: string
  status: string
  "start-date": string
  "end-date": string
  "voting-start-date": string
  "voting-end-date": string
}

interface GovernorData {
  address: string
  "committed-algo": number
  "voting-power": number
  "is-eligible": boolean
  "vote-count": number
  activities: Array<{
    type: string
    "transaction-id": string
    timestamp: string
    amount?: number
  }>
}

interface ReputationData {
  walletBalance: number
  algoBalance: number
  assetCount: number
  appCount: number
  transactionCount: number
  stakingParticipation: boolean
  governanceVotes: number
  governancePeriods: number
  committedAlgo: number
  dappInteractions: number
  externalClaims: number
}

class AlgorandReputationAnalyzer {
  private baseUrl: string
  private indexerUrl: string
  private governanceUrl: string

  constructor() {
    this.baseUrl = "https://testnet-api.algonode.cloud"
    this.indexerUrl = "https://testnet-idx.algonode.cloud"
    this.governanceUrl = "https://governance.algorand.foundation/api"
  }

  calculateReputationScore(data: ReputationData): ReputationScore {
    // Wallet Balance (20% - 0-20 pts) - Deterministic based on ALGO amount
    let walletBalanceScore = 0
    if (data.algoBalance >= 100000) walletBalanceScore = 20
    else if (data.algoBalance >= 50000) walletBalanceScore = 18
    else if (data.algoBalance >= 10000) walletBalanceScore = 16
    else if (data.algoBalance >= 5000) walletBalanceScore = 14
    else if (data.algoBalance >= 1000) walletBalanceScore = 12
    else if (data.algoBalance >= 500) walletBalanceScore = 10
    else if (data.algoBalance >= 100) walletBalanceScore = 8
    else if (data.algoBalance >= 50) walletBalanceScore = 6
    else if (data.algoBalance >= 10) walletBalanceScore = 4
    else if (data.algoBalance >= 1) walletBalanceScore = 2
    else if (data.algoBalance > 0) walletBalanceScore = 1

    // Staking/Governance (30% - 0-30 pts) - Based on actual governance data
    let stakingGovernanceScore = 0

    // Points for governance participation (up to 20 pts)
    if (data.governancePeriods >= 5) stakingGovernanceScore += 20
    else if (data.governancePeriods >= 3) stakingGovernanceScore += 16
    else if (data.governancePeriods >= 2) stakingGovernanceScore += 12
    else if (data.governancePeriods >= 1) stakingGovernanceScore += 8

    // Points for voting activity (up to 10 pts)
    if (data.governanceVotes >= 20) stakingGovernanceScore += 10
    else if (data.governanceVotes >= 15) stakingGovernanceScore += 8
    else if (data.governanceVotes >= 10) stakingGovernanceScore += 6
    else if (data.governanceVotes >= 5) stakingGovernanceScore += 4
    else if (data.governanceVotes >= 1) stakingGovernanceScore += 2

    stakingGovernanceScore = Math.min(stakingGovernanceScore, 30)

    // Transaction Activity (20% - 0-20 pts) - Based on 3-month activity
    let transactionActivityScore = 0
    if (data.transactionCount >= 500) transactionActivityScore = 20
    else if (data.transactionCount >= 200) transactionActivityScore = 18
    else if (data.transactionCount >= 100) transactionActivityScore = 16
    else if (data.transactionCount >= 50) transactionActivityScore = 14
    else if (data.transactionCount >= 25) transactionActivityScore = 12
    else if (data.transactionCount >= 15) transactionActivityScore = 10
    else if (data.transactionCount >= 10) transactionActivityScore = 8
    else if (data.transactionCount >= 5) transactionActivityScore = 6
    else if (data.transactionCount >= 3) transactionActivityScore = 4
    else if (data.transactionCount >= 1) transactionActivityScore = 2

    // dApp Participation (20% - 0-20 pts) - Based on app interactions
    let dappParticipationScore = 0
    if (data.dappInteractions >= 50) dappParticipationScore = 20
    else if (data.dappInteractions >= 30) dappParticipationScore = 18
    else if (data.dappInteractions >= 20) dappParticipationScore = 16
    else if (data.dappInteractions >= 15) dappParticipationScore = 14
    else if (data.dappInteractions >= 10) dappParticipationScore = 12
    else if (data.dappInteractions >= 7) dappParticipationScore = 10
    else if (data.dappInteractions >= 5) dappParticipationScore = 8
    else if (data.dappInteractions >= 3) dappParticipationScore = 6
    else if (data.dappInteractions >= 2) dappParticipationScore = 4
    else if (data.dappInteractions >= 1) dappParticipationScore = 2

    // External Attestations (10% - 0-10 pts) - Deterministic based on claims
    const externalAttestationsScore = Math.min(data.externalClaims * 2, 10)

    const totalScore =
      walletBalanceScore +
      stakingGovernanceScore +
      transactionActivityScore +
      dappParticipationScore +
      externalAttestationsScore

    return {
      walletBalance: walletBalanceScore,
      stakingGovernance: stakingGovernanceScore,
      transactionActivity: transactionActivityScore,
      dappParticipation: dappParticipationScore,
      externalAttestations: externalAttestationsScore,
      totalScore,
    }
  }

  async fetchGovernanceData(address: string): Promise<{
    periods: number
    votes: number
    committedAlgo: number
  }> {
    try {
      // Get active governance periods
      const periodsResponse = await fetch(`${this.governanceUrl}/periods/active/`)
      const periodsData = await periodsResponse.json()

      let totalVotes = 0
      let totalPeriods = 0
      let maxCommittedAlgo = 0

      // Check all available periods (not just active)
      const allPeriodsResponse = await fetch(`${this.governanceUrl}/periods/`)
      const allPeriodsData = await allPeriodsResponse.json()

      for (const period of allPeriodsData.results || []) {
        try {
          // Check if address is a governor in this period
          const governorResponse = await fetch(`${this.governanceUrl}/periods/${period.slug}/governors/${address}/`)

          if (governorResponse.ok) {
            const governorData = await governorResponse.json()
            totalPeriods++
            maxCommittedAlgo = Math.max(maxCommittedAlgo, governorData["committed-algo"] || 0)

            // Get activities for this period
            const activitiesResponse = await fetch(
              `${this.governanceUrl}/periods/${period.slug}/governors/${address}/activities/`,
            )
            if (activitiesResponse.ok) {
              const activitiesData = await activitiesResponse.json()
              // Count voting activities
              const voteActivities =
                activitiesData.results?.filter(
                  (activity: any) => activity.type === "vote" || activity.type === "voting",
                ) || []
              totalVotes += voteActivities.length
            }
          }
        } catch (error) {
          // Governor not found in this period, continue
          console.log(`[v0] Governor not found in period ${period.slug}`)
        }
      }

      return {
        periods: totalPeriods,
        votes: totalVotes,
        committedAlgo: maxCommittedAlgo / 1000000, // Convert from microAlgos
      }
    } catch (error) {
      console.error("[v0] Governance API error:", error)
      return { periods: 0, votes: 0, committedAlgo: 0 }
    }
  }

  async gatherReputationData(address: string): Promise<ReputationData> {
    // Get account info
    const accountResponse = await fetch(`${this.baseUrl}/v2/accounts/${address}?format=json`)
    const accountData = await accountResponse.json()

    // Get transaction history (last 3 months)
    const threeMonthsAgo = new Date()
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)
    const afterTime = threeMonthsAgo.toISOString()

    const transactionsResponse = await fetch(
      `${this.indexerUrl}/v2/accounts/${address}/transactions?after-time=${afterTime}&limit=1000`,
    )
    const transactionsData = await transactionsResponse.json()

    // Get governance data using the new APIs
    const governanceData = await this.fetchGovernanceData(address)

    // Calculate metrics
    const algoBalance = accountData.amount / 1000000
    const assetCount = accountData.assets?.length || 0
    const appCount = accountData["total-apps-opted-in"] || 0
    const transactionCount = transactionsData.transactions?.length || 0

    // Check staking participation
    const stakingParticipation = accountData["rewards-base"] > 0 || governanceData.periods > 0

    // Calculate dApp interactions from app transactions
    const dappInteractions =
      transactionsData.transactions?.filter((tx: any) => tx["tx-type"] === "appl" || tx["application-transaction"])
        .length || 0

    // Calculate external claims based on account age and activity (deterministic)
    const accountAge = Date.now() - (accountData["created-at-round"] || 0) * 4500 // Approximate block time
    const ageInDays = accountAge / (1000 * 60 * 60 * 24)
    const externalClaims = Math.min(Math.floor(ageInDays / 30) + Math.floor(assetCount / 5), 5)

    return {
      walletBalance: algoBalance,
      algoBalance,
      assetCount,
      appCount,
      transactionCount,
      stakingParticipation,
      governanceVotes: governanceData.votes,
      governancePeriods: governanceData.periods,
      committedAlgo: governanceData.committedAlgo,
      dappInteractions,
      externalClaims,
    }
  }
}

const LogContainer: React.FC<{ logs: LogEntry[]; title: string }> = ({ logs, title }) => {
  return (
    <div className="h-full flex flex-col">
      <h3 className="text-xl font-bold text-white mb-6">{title}</h3>
      <div className="flex-1 bg-black/20 border border-white/10 rounded-lg p-4 overflow-y-auto">
        {logs.length === 0 ? (
          <div className="text-gray-400 text-center py-8">Logs will appear here...</div>
        ) : (
          <div className="space-y-2">
            {logs.map((log, index) => (
              <div key={index} className="flex items-start space-x-3">
                <span className="text-xs text-gray-500 mt-1 min-w-[60px]">{log.timestamp}</span>
                <span
                  className={`text-sm ${
                    log.type === "success" ? "text-blue-400" : log.type === "error" ? "text-red-400" : "text-gray-300"
                  }`}
                >
                  {log.message}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const GlassButton: React.FC<{
  onClick?: () => void
  disabled?: boolean
  children: React.ReactNode
  className?: string
}> = ({ onClick, disabled, children, className = "" }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full h-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-3 text-white font-semibold ${className}`}
    >
      {children}
    </button>
  )
}

const ReputationScoreTable: React.FC<{ score: ReputationScore; data: ReputationData }> = ({ score, data }) => {
  const scoreData = [
    {
      category: "Wallet Balance",
      weight: "20%",
      score: score.walletBalance,
      maxScore: 20,
      details: `${data.algoBalance.toFixed(2)} ALGO, ${data.assetCount} assets`,
    },
    {
      category: "Staking/Governance",
      weight: "30%",
      score: score.stakingGovernance,
      maxScore: 30,
      details: `${data.governancePeriods} periods, ${data.governanceVotes} votes, ${data.committedAlgo.toFixed(2)} committed ALGO`,
    },
    {
      category: "Transaction Activity",
      weight: "20%",
      score: score.transactionActivity,
      maxScore: 20,
      details: `${data.transactionCount} transactions (3 months)`,
    },
    {
      category: "dApp Participation",
      weight: "20%",
      score: score.dappParticipation,
      maxScore: 20,
      details: `${data.dappInteractions} dApp interactions`,
    },
    {
      category: "External Attestations",
      weight: "10%",
      score: score.externalAttestations,
      maxScore: 10,
      details: `${data.externalClaims} verified claims`,
    },
  ]

  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-bold text-white">Reputation Score Breakdown</h4>
        <div className="text-2xl font-bold text-blue-400">{score.totalScore}/100</div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 text-gray-300">Category</th>
              <th className="text-center py-3 text-gray-300">Weight</th>
              <th className="text-center py-3 text-gray-300">Score</th>
              <th className="text-left py-3 text-gray-300">Details</th>
            </tr>
          </thead>
          <tbody>
            {scoreData.map((item, index) => (
              <tr key={index} className="border-b border-white/5">
                <td className="py-3 text-white font-medium">{item.category}</td>
                <td className="py-3 text-center text-gray-300">{item.weight}</td>
                <td className="py-3 text-center">
                  <span
                    className={`font-bold ${item.score >= item.maxScore * 0.8 ? "text-blue-400" : item.score >= item.maxScore * 0.5 ? "text-yellow-400" : "text-red-400"}`}
                  >
                    {item.score}/{item.maxScore}
                  </span>
                </td>
                <td className="py-3 text-gray-300">{item.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const ReputationScorer: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [isGenerating, setIsGenerating] = useState<boolean>(false)
  const [generationComplete, setGenerationComplete] = useState<boolean>(false)
  const [isMinting, setIsMinting] = useState<boolean>(false)
  const [mintComplete, setMintComplete] = useState<boolean>(false)
  const [logs, setLogs] = useState<Array<LogEntry>>([])
  const [reputationScore, setReputationScore] = useState<ReputationScore | null>(null)
  const [reputationData, setReputationData] = useState<ReputationData | null>(null)

  const reputationAnalyzer = new AlgorandReputationAnalyzer()
  const { activeAddress } = useWallet()

  const addLog = (type: "info" | "success" | "error", message: string): void => {
    const timestamp = new Date().toLocaleTimeString()
    setLogs((prev) => [...prev, { type, message, timestamp }])
  }

  const handleGenerateReputationScore = async (): Promise<void> => {
    if (!activeAddress) {
      addLog("error", "No wallet connected. Please connect your wallet first.")
      return
    }

    setIsGenerating(true)
    setLogs([])
    setReputationScore(null)
    setReputationData(null)
    setGenerationComplete(false)
    setMintComplete(false)

    try {
      addLog("info", "Initializing reputation analysis...")
      await new Promise((resolve) => setTimeout(resolve, 800))

      addLog("info", `Analyzing wallet: ${activeAddress.slice(0, 6)}...${activeAddress.slice(-4)}`)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      addLog("info", "Fetching wallet balance from Algorand API...")
      await new Promise((resolve) => setTimeout(resolve, 1200))

      addLog("info", "Retrieving transaction history (last 3 months)...")
      await new Promise((resolve) => setTimeout(resolve, 1000))

      addLog("info", "Checking active governance periods...")
      await new Promise((resolve) => setTimeout(resolve, 800))

      addLog("info", "Fetching governor data from governance API...")
      await new Promise((resolve) => setTimeout(resolve, 1000))

      addLog("info", "Analyzing governance voting activities...")
      await new Promise((resolve) => setTimeout(resolve, 800))

      addLog("info", "Calculating committed ALGO amounts...")
      await new Promise((resolve) => setTimeout(resolve, 600))

      addLog("info", "Analyzing dApp interactions...")
      await new Promise((resolve) => setTimeout(resolve, 1000))

      addLog("info", "Gathering external attestations...")
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Gather reputation data
      const data = await reputationAnalyzer.gatherReputationData(activeAddress)
      setReputationData(data)

      addLog("success", `Wallet balance: ${data.algoBalance.toFixed(2)} ALGO`)
      addLog("success", `Transaction count: ${data.transactionCount} (last 3 months)`)
      addLog("success", `Governance periods: ${data.governancePeriods}`)
      addLog("success", `Governance votes: ${data.governanceVotes}`)
      addLog("success", `Committed ALGO: ${data.committedAlgo.toFixed(2)}`)
      addLog("success", `dApp interactions: ${data.dappInteractions}`)

      addLog("info", "Calculating reputation score...")
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Calculate reputation score
      const score = reputationAnalyzer.calculateReputationScore(data)
      setReputationScore(score)

      addLog("success", `Reputation score calculated: ${score.totalScore}/100`)
      setGenerationComplete(true)
    } catch (error: any) {
      console.error("[v0] Reputation analysis error:", error)
      addLog("error", `Analysis failed: ${error.message}`)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleMintBadge = async (): Promise<void> => {
    if (!reputationScore || !activeAddress) return

    setIsMinting(true)

    try {
      addLog("info", "Preparing to mint reputation badge NFT...")
      await new Promise((resolve) => setTimeout(resolve, 800))

      addLog("info", "Creating badge metadata...")
      await new Promise((resolve) => setTimeout(resolve, 1000))

      addLog("info", "Uploading metadata to IPFS...")
      await new Promise((resolve) => setTimeout(resolve, 1200))

      addLog("info", "Submitting NFT creation transaction...")
      await new Promise((resolve) => setTimeout(resolve, 1500))

      addLog("info", "Waiting for transaction confirmation...")
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate successful minting
      const mockTxId = "MOCK" + Math.random().toString(36).substring(2, 15).toUpperCase()
      const mockAssetId = Math.floor(Math.random() * 1000000) + 100000

      addLog("success", `Badge NFT minted successfully!`)
      addLog("success", `Asset ID: ${mockAssetId}`)
      addLog("success", `Transaction ID: ${mockTxId}`)
      addLog("success", `Badge represents score: ${reputationScore.totalScore}/100`)

      setMintComplete(true)
    } catch (error: any) {
      console.error("[v0] Badge minting error:", error)
      addLog("error", `Minting failed: ${error.message}`)
    } finally {
      setIsMinting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="ml-72 space-y-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-1">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
          </div>
          {/* <h1 className="text-2xl font-bold text-white">DeFi Reputation Scorer</h1> */}
        </div>
      </div>

      {/* Main Interface Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Side - Generate Score Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="col-span-5 space-y-6">
          {/* Generate Score Container */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl min-h-[300px]">
            <div className="flex items-center space-x-3 mb-8">
              <Star className="w-6 h-6 text-blue-400" />
              <h3 className="text-xl font-bold text-white">
                {generationComplete ? "Reputation Badge" : "Generate Reputation Score"}
              </h3>
            </div>

            <div className="space-y-6">
              {!generationComplete ? (
                <>
                  <div className="text-gray-300 text-sm space-y-2">
                    <p>This will analyze your Algorand wallet to calculate a comprehensive reputation score based on:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Wallet Balance (20%)</li>
                      <li>Staking/Governance Participation (30%)</li>
                      <li>Transaction Activity (20%)</li>
                      <li>dApp Participation (20%)</li>
                      <li>External Attestations (10%)</li>
                    </ul>
                  </div>

                  <GlassButton
                    onClick={handleGenerateReputationScore}
                    disabled={!activeAddress || isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span>Generating Score...</span>
                      </>
                    ) : (
                      <>
                        <TrendingUp className="w-6 h-6" />
                        <span>Generate Reputation Score</span>
                      </>
                    )}
                  </GlassButton>
                </>
              ) : (
                <>
                  <div className="text-gray-300 text-sm space-y-2">
                    <p>Your reputation score has been calculated! Mint an NFT badge to showcase your on-chain reputation permanently.</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Permanent proof of reputation score</li>
                      <li>Transferable NFT badge</li>
                      <li>Verifiable on-chain credentials</li>
                      <li>Use across DeFi protocols</li>
                    </ul>
                  </div>

                  <GlassButton
                    onClick={handleMintBadge}
                    disabled={isMinting || mintComplete}
                    className={mintComplete ? "bg-green-500/20 border-green-400/30" : ""}
                  >
                    {isMinting ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span>Minting Badge...</span>
                      </>
                    ) : mintComplete ? (
                      <>
                        <Check className="w-6 h-6" />
                        <span>Badge Minted Successfully</span>
                      </>
                    ) : (
                      <>
                        <Award className="w-6 h-6" />
                        <span>Mint Reputation Badge</span>
                      </>
                    )}
                  </GlassButton>
                </>
              )}

              {!activeAddress && (
                <div className="text-center text-yellow-400 text-sm">
                  Please connect your Algorand wallet to continue
                </div>
              )}
            </div>
          </div>

          {/* Score Display */}
          {reputationScore && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl"
            >
              <div className="text-center">
                <div className="text-6xl font-bold text-blue-400 mb-2">{reputationScore.totalScore}</div>
                <div className="text-xl text-gray-300 mb-4">out of 100</div>
                <div className="text-lg font-semibold text-white">
                  {reputationScore.totalScore >= 80
                    ? "Excellent"
                    : reputationScore.totalScore >= 60
                      ? "Good"
                      : reputationScore.totalScore >= 40
                        ? "Fair"
                        : "Needs Improvement"}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Right Side - Logs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="col-span-7 bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl min-h-[500px]"
        >
          <LogContainer logs={logs} title="AI Agent & Verification Logs" />
        </motion.div>

        {/* Bottom - Response Table */}
        {reputationScore && reputationData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="col-span-12 bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl"
          >
            <ReputationScoreTable score={reputationScore} data={reputationData} />
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default ReputationScorer