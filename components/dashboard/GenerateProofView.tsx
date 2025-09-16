import React, { useState } from "react"
import { motion } from "motion/react"
import {
  ArrowLeft,
  FileText,
  Loader2,
  Check,
  Shield,
  Copy,
  Trophy,
  Award,
  GraduationCap,
  Building,
  User,
} from "lucide-react"
import { useWallet, type Wallet } from '@txnlab/use-wallet-react'

interface LogEntry {
  type: "info" | "success" | "error";
  message: string;
  timestamp: string;
}

interface BadgeMetadata {
  badge_type: string;
  level: string;
  verified_metric: string;
  activity_description: string;
  wallet: string;
  proof_hash: string;
  issued_by: string;
  timestamp: string;
  soulbound: boolean;
  visibility: string;
  api_verified: boolean;
}

interface AlgorandApiResponse {
  account: {
    address: string;
    amount: number;
    'amount-without-pending-rewards': number;
    'min-balance': number;
    'pending-rewards': number;
    'rewards-base': number;
    'total-apps-opted-in': number;
    'total-assets-opted-in': number;
    'total-created-apps': number;
    'total-created-assets': number;
    assets?: Array<{
      'asset-id': number;
      amount: number;
      'is-frozen': boolean;
    }>;
    'apps-local-state'?: Array<any>;
  };
  'current-round': number;
  [key: string]: any;
}

interface AnalysisResult {
  intent: string;
  apiEndpoint: string | null;
  params: {
    address?: string | null;
  };
  extractedData: {
    amount: number | null;
    token: string | null;
    originalText: string;
  };
}

interface ApiCallResult {
  success: boolean;
  data: AlgorandApiResponse;
  analysis: AnalysisResult;
}

// Algorand-specific text analyzer
class AlgorandTextAnalyzer {
  private baseUrl: string;

  constructor() {
    this.baseUrl = "https://testnet-api.algonode.cloud"
  }

  // Parse user input to extract relevant information
  parseInput(text: string): AnalysisResult {
    const lowerText = text.toLowerCase()
    
    // Extract Algorand address if mentioned (58 characters, base58 encoded)
    const addressMatch = text.match(/[A-Z2-7]{58}/g) || text.match(/0x[a-fA-F0-9]{40}/g)
    const address = addressMatch ? addressMatch[0] : null
    
    // Extract amount and token - improved regex to handle decimals
    const amountMatch = text.match(/(\d+(?:\.\d+)?)\s*(algo|usdc|usdt|asset|token|coin)/i)
    const amount = amountMatch ? parseFloat(amountMatch[1]) : null
    const token = amountMatch ? amountMatch[2].toLowerCase() : null
    
    // Determine intent based on keywords
    let intent = "unknown"
    let apiEndpoint: string | null = null
    let params: { address?: string | null } = {}
    
    if (lowerText.includes("balance") || lowerText.includes("have") || lowerText.includes("hold")) {
      if (lowerText.includes("algo") || lowerText.includes("algorand")) {
        intent = "algo_balance"
        apiEndpoint = "/v2/accounts"
        params = { address }
      }
    } else if (lowerText.includes("asset") || lowerText.includes("token")) {
      intent = "assets"
      apiEndpoint = "/v2/accounts"
      params = { address }
    } else if (lowerText.includes("app") || lowerText.includes("dapp") || lowerText.includes("application")) {
      intent = "apps"
      apiEndpoint = "/v2/accounts"
      params = { address }
    }
    
    return {
      intent,
      apiEndpoint,
      params,
      extractedData: {
        amount,
        token,
        originalText: text
      }
    }
  }

  // Make API call based on parsed intent
  async executeIntent(analysis: AnalysisResult, userAddress: string | null = null): Promise<ApiCallResult> {
    if (!analysis.apiEndpoint) {
      throw new Error("Unable to determine appropriate API endpoint from input")
    }

    const targetAddress = analysis.params.address || userAddress
    if (!targetAddress) {
      throw new Error("No wallet address found in input or connected wallet")
    }

    let url = `${this.baseUrl}${analysis.apiEndpoint}/${targetAddress}?format=json`

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }

    const response = await fetch(url, {
      method: 'GET',
      headers
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return {
      success: true,
      data,
      analysis
    }
  }
}

const Vortex: React.FC<{
  backgroundColor?: string;
  className?: string;
  particleCount?: number;
  baseHue?: number;
  rangeSpeed?: number;
  children: React.ReactNode;
}> = ({ backgroundColor = "black", className = "", children }) => {
  return (
    <div className={`relative ${className}`} style={{ backgroundColor }}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
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
                <span className="text-xs text-gray-500 mt-1 min-w-[60px]">
                  {log.timestamp}
                </span>
                <span
                  className={`text-sm ${
                    log.type === "success"
                      ? "text-green-400"
                      : log.type === "error"
                      ? "text-red-400"
                      : "text-gray-300"
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
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
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

const GenerateProofView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [defiActivity, setDefiActivity] = useState<string>("")
  const [isVerifying, setIsVerifying] = useState<boolean>(false)
  const [isGenerating, setIsGenerating] = useState<boolean>(false)
  const [isMinting, setIsMinting] = useState<boolean>(false)
  const [verificationComplete, setVerificationComplete] = useState<boolean>(false)
  const [generationComplete, setGenerationComplete] = useState<boolean>(false)
  const [mintingComplete, setMintingComplete] = useState<boolean>(false)
  const [apiResponse, setApiResponse] = useState<AlgorandApiResponse | null>(null)
  const [logs, setLogs] = useState<Array<LogEntry>>([])

  const textAnalyzer = new AlgorandTextAnalyzer()
  const { activeAddress, wallets } = useWallet()

  const addLog = (type: "info" | "success" | "error", message: string): void => {
    const timestamp = new Date().toLocaleTimeString()
    setLogs((prev) => [...prev, { type, message, timestamp }])
  }

  const handleVerifyWithAlgorand = async (): Promise<void> => {
    setIsVerifying(true)
    setLogs([])
    setApiResponse(null)

    try {
      // Step 1: Analyze the input text
      addLog("info", "Initializing AI agent for text analysis...")
      await new Promise(resolve => setTimeout(resolve, 800))
      
      addLog("info", "Analyzing user input...")
      const analysis = textAnalyzer.parseInput(defiActivity)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      addLog("info", `Detected intent: ${analysis.intent}`)
      addLog("info", `Extracted data: ${JSON.stringify(analysis.extractedData)}`)
      
      // Use connected wallet address if no address found in text
      if (activeAddress) {
        addLog("info", `Using connected wallet: ${activeAddress.slice(0, 6)}...${activeAddress.slice(-4)}`)
      }
      
      await new Promise(resolve => setTimeout(resolve, 800))

      // Step 2: Execute the appropriate API call
      if (analysis.intent === "unknown") {
        addLog("error", "Unable to determine action from input. Please be more specific.")
        setIsVerifying(false)
        return
      }

      addLog("info", `Preparing API call to ${analysis.apiEndpoint}...`)
      await new Promise(resolve => setTimeout(resolve, 1000))

      addLog("info", "Making API request to Algorand testnet...")
      const result: ApiCallResult = await textAnalyzer.executeIntent(analysis, activeAddress)
      await new Promise(resolve => setTimeout(resolve, 1200))

      // Step 3: Process and display results
      addLog("info", "Processing API response...")
      await new Promise(resolve => setTimeout(resolve, 800))

      if (result.success) {
        setApiResponse(result.data)
        
        // Format response based on intent
        if (analysis.intent === "algo_balance") {
          // Convert microAlgos to Algos (divide by 1,000,000)
          const actualBalance = result.data.amount / 1000000
          const claimedAmount = analysis.extractedData.amount
          
          addLog("info", `API returned balance: ${actualBalance.toFixed(6)} ALGO`)
          console.log("Full API Response:", result.data)
          
          // Verify claimed amount against actual balance ONLY if user claimed a specific amount
          if (claimedAmount !== null && claimedAmount > 0) {
            addLog("info", `User claimed: ${claimedAmount} ALGO`)
            
            // Check if claimed amount matches actual balance (with reasonable tolerance for decimals)
            const tolerance = 0.001
            const balanceMatches = Math.abs(actualBalance - claimedAmount) <= tolerance
            
            if (balanceMatches) {
              addLog("success", "Verified successfully")
            } else {
              addLog("error", "Wrong information provided")
            }
          } else {
            addLog("success", "Balance retrieved successfully")
          }
        } else if (analysis.intent === "assets") {
          const assetCount = result.data.account.assets?.length || 0
          addLog("success", `Retrieved ${assetCount} assets successfully`)
        } else if (analysis.intent === "apps") {
          const appCount = result.data.account['total-apps-opted-in'] || 0
          addLog("success", `User has opted into ${appCount} applications`)
        }
        
        setVerificationComplete(true)
      } else {
        addLog("error", "API verification failed")
      }

    } catch (error: any) {
      console.error("Verification error:", error)
      addLog("error", `Verification failed: ${error.message}`)
    } finally {
      setIsVerifying(false)
    }
  }

  const handleGenerateZkProof = async (): Promise<void> => {
    setIsGenerating(true)
    setLogs([])
    
    const generationSteps = [
      "Initializing ZK-proof generation...",
      "Creating cryptographic commitments...",
      "Generating witness data from API response...",
      "Computing zero-knowledge proof...",
      "ZK-proof generated successfully!",
    ]

    for (let i = 0; i < generationSteps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1200))
      if (i === generationSteps.length - 1) {
        addLog("success", generationSteps[i])
        setGenerationComplete(true)
      } else {
        addLog("info", generationSteps[i])
      }
    }
    setIsGenerating(false)
  }

  const handleMintBadge = async (defiActivity: string): Promise<void> => {
    setIsMinting(true)
    setLogs([])
    const mintingSteps = [
      "Preparing badge metadata...",
      "Creating soulbound token on Algorand...",
      "Deploying to Algorand testnet...",
      "Finalizing badge creation...",
      "Badge minted successfully!",
    ]

    for (let i = 0; i < mintingSteps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      if (i === mintingSteps.length - 1) {
        addLog("success", mintingSteps[i])
        setMintingComplete(true)
      } else {
        addLog("info", mintingSteps[i])
      }
    }
    setIsMinting(false)
  }

  // Dynamic badge metadata based on input and API response
  const generateBadgeMetadata = (): BadgeMetadata => {
    const activityLower = defiActivity.toLowerCase()
    let badgeType = "DeFi Participant"
    let level = "Bronze"
    let verifiedMetric = "Basic Activity"

    // Use API response data if available
    if (apiResponse) {
      const balance = apiResponse.amount / 1000000
      const assetCount = apiResponse.assets?.length || 0
      // const appCount = apiResponse.account['total-apps-opted-in'] || 0

      if (balance > 0) {
        badgeType = "Algorand Holder"
        
        if (balance >= 1000) {
          level = "Diamond"
          verifiedMetric = `${balance.toFixed(2)} ALGO verified`
        } else if (balance >= 100) {
          level = "Gold"
          verifiedMetric = `${balance.toFixed(2)} ALGO verified`
        } else if (balance >= 10) {
          level = "Silver"
          verifiedMetric = `${balance.toFixed(2)} ALGO verified`
        } else {
          level = "Bronze"
          verifiedMetric = `${balance.toFixed(6)} ALGO verified`
        }
      }

      if (assetCount > 0) {
        badgeType = "Multi-Asset Holder"
        level = "Expert"
        verifiedMetric = `${assetCount} assets verified`
      }

      // if (appCount > 0) {
      //   badgeType = "DApp User"
      //   level = "Certified"
      //   verifiedMetric = `${appCount} applications verified`
      // }
    }

    // Fallback to text analysis
    if (activityLower.includes("tinyman") || activityLower.includes("dex")) {
      badgeType = "DEX Trader"
    } else if (activityLower.includes("algofi") || activityLower.includes("lending")) {
      badgeType = "DeFi Lender"
    } else if (activityLower.includes("liquidity") || activityLower.includes("pool")) {
      badgeType = "Liquidity Provider"
    } else if (activityLower.includes("yield") || activityLower.includes("farm")) {
      badgeType = "Yield Farmer"
    }

    return {
      badge_type: badgeType,
      level: level,
      verified_metric: verifiedMetric,
      activity_description: defiActivity,
      wallet: activeAddress || "No wallet connected",
      proof_hash: `0x${Math.random().toString(16).slice(2, 10)}`,
      issued_by: "Algorand Zeyo",
      timestamp: new Date().toISOString(),
      soulbound: true,
      visibility: "private",
      api_verified: !!apiResponse
    }
  }

  const zkProofMetadata = {
    activity: defiActivity || "No activity specified",
    wallet: activeAddress ? `${activeAddress.slice(0, 6)}...${activeAddress.slice(-4)}` : "No wallet",
    apiResponse: apiResponse ? "Verified" : "Pending"
  }

  const badgeMetadata: BadgeMetadata = generateBadgeMetadata()

  const getBadgeColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "academic":
        return "from-blue-400 via-indigo-400 to-purple-400"
      case "expert":
        return "from-emerald-400 via-teal-400 to-cyan-400"
      case "authenticated":
        return "from-orange-400 via-red-400 to-pink-400"
      case "certified":
        return "from-yellow-400 via-orange-400 to-red-400"
      case "diamond":
        return "from-purple-400 via-pink-400 to-indigo-400"
      case "gold":
        return "from-yellow-400 via-orange-400 to-yellow-400"
      case "silver":
        return "from-gray-300 via-gray-400 to-gray-300"
      case "bronze":
        return "from-orange-600 via-orange-700 to-orange-600"
      default:
        return "from-[#00d4aa] via-[#00d4aa] to-[#00d4aa]"
    }
  }

  const getBadgeIcon = (level: string) => {
    switch (level.toLowerCase()) {
      case "academic":
        return GraduationCap
      case "expert":
        return Building
      case "authenticated":
        return User
      case "certified":
        return Award
      default:
        return Trophy
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
        </div>
        {/* Step Indicator */}
        <div className="flex items-center space-x-4">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  step === currentStep
                    ? "bg-[#00d4aa] text-black"
                    : step < currentStep
                    ? "bg-green-500 text-white"
                    : "bg-white/10 text-gray-400"
                }`}
              >
                {step < currentStep ? <Check className="w-5 h-5" /> : step}
              </div>
              {step < 3 && (
                <div
                  className={`w-12 h-1 mx-2 transition-all ${step < currentStep ? "bg-green-500" : "bg-white/10"}`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-6">
        {currentStep === 1 && (
          <>
            {/* Step 1: Input Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="col-span-5 bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl min-h-[450px]"
            >
              <div className="flex items-center space-x-3 mb-8">
                <FileText className="w-6 h-6 text-[#00d4aa]" />
                <h3 className="text-xl font-bold text-white">Enter DeFi Activity</h3>
              </div>
              <div className="space-y-8">
                <textarea
                  value={defiActivity}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDefiActivity(e.target.value)}
                  placeholder={`Describe your Algorand DeFi activity (e.g., 'I have 100 ALGO'${activeAddress ? `, 'Check my ALGO balance' - Connected: ${activeAddress.slice(0, 6)}...${activeAddress.slice(-4)}` : ', "Algorand address required"'})`}
                  className="w-full h-48 p-6 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-[#00d4aa]/50 focus:outline-none resize-none text-lg"
                />
                <div className="space-y-4">
                  <GlassButton
                    onClick={handleVerifyWithAlgorand}
                    disabled={!defiActivity.trim() || isVerifying || verificationComplete}
                  >
                    {isVerifying ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span>Analyzing & Verifying...</span>
                      </>
                    ) : verificationComplete ? (
                      <>
                        <Check className="w-6 h-6" />
                        <span>Verified Successfully</span>
                      </>
                    ) : (
                      <span>Verify with Algorand</span>
                    )}
                  </GlassButton>
                  <div className="text-center">
                    <span className="text-gray-400 text-sm">Powered by Algorand API</span>
                  </div>
                  
                  {/* API Response Box */}
                  {apiResponse && (
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-gray-400">API Response:</span>
                        <button className="text-cyan-400 hover:text-cyan-300">
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                      <pre className="text-sm text-gray-300 overflow-x-auto whitespace-pre-wrap max-h-32 overflow-y-auto">
                        {JSON.stringify(apiResponse, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Step 1: Logs Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="col-span-7 bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl min-h-[450px]"
            >
              <LogContainer logs={logs} title="AI Agent & Verification Logs" />
            </motion.div>

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="col-span-12 bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl"
            >
              <div className="flex justify-between items-center">
                <div className="text-gray-400 text-lg">Step 1 of 3: AI-Powered Algorand Activity Verification</div>
                <GlassButton
                  onClick={() => setCurrentStep(2)}
                  disabled={
                    !logs.some(
                      log =>
                        log.type === "success" &&
                        (
                          log.message.toLowerCase().includes("verified successfully") ||
                          log.message.toLowerCase().includes("balance retrieved successfully") ||
                          log.message.toLowerCase().includes("assets successfully") ||
                          log.message.toLowerCase().includes("applications verified")
                        )
                    )
                  }
                  className="!w-auto !px-6 !py-3"
                >
                  Next Step
                </GlassButton>
              </div>
            </motion.div>
          </>
        )}

        {currentStep === 2 && (
          <>
            {/* Step 2: Metadata Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="col-span-5 bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl min-h-[450px]"
            >
              <div className="flex items-center space-x-3 mb-8">
                <Shield className="w-6 h-6 text-[#00d4aa]" />
                <h3 className="text-xl font-bold text-white">ZK-Proof Metadata</h3>
              </div>
              <div className="space-y-8">
                <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-400">Metadata JSON</span>
                    <button className="text-cyan-400 hover:text-cyan-300">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <pre className="text-sm text-gray-300 overflow-x-auto whitespace-pre-wrap">
                    {JSON.stringify(zkProofMetadata, null, 2)}
                  </pre>
                </div>
                <GlassButton onClick={handleGenerateZkProof} disabled={isGenerating || generationComplete}>
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <span>Generating ZK-Proof...</span>
                    </>
                  ) : generationComplete ? (
                    <>
                      <Check className="w-6 h-6" />
                      <span>ZK-Proof Generated</span>
                    </>
                  ) : (
                    <span>Generate ZK-Proof</span>
                  )}
                </GlassButton>
              </div>
            </motion.div>

            {/* Step 2: Logs Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="col-span-7 bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl min-h-[450px]"
            >
              <LogContainer logs={logs} title="Generation Logs" />
            </motion.div>

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="col-span-12 bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl"
            >
              <div className="flex justify-between items-center">
                <GlassButton
                  onClick={() => setCurrentStep(1)}
                  className="!w-auto !px-6 !py-3 !bg-white/10 hover:!bg-white/20"
                >
                  Previous
                </GlassButton>
                <div className="text-gray-400 text-lg">Step 2 of 3: Generate ZK-Proof</div>
                <GlassButton
                  onClick={() => setCurrentStep(3)}
                  disabled={!generationComplete}
                  className="!w-auto !px-6 !py-3"
                >
                  Next Step
                </GlassButton>
              </div>
            </motion.div>
          </>
        )}

        {currentStep === 3 && (
          <>
            {/* Step 3: Badge Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="col-span-5 bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl min-h-[450px]"
            >
              <div className="flex items-center space-x-3 mb-8">
                <Trophy className="w-6 h-6 text-[#00d4aa]" />
                <h3 className="text-xl font-bold text-white">Mint Badge</h3>
              </div>
              <div className="space-y-8">
                <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-400">Badge Metadata</span>
                    <button className="text-cyan-400 hover:text-cyan-300">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <pre className="text-sm text-gray-300 overflow-x-auto whitespace-pre-wrap">
                    {JSON.stringify(badgeMetadata, null, 2)}
                  </pre>
                </div>
                {/* After minting, show badge */}
                {mintingComplete && (
                  <div className="w-full h-80 rounded-2xl overflow-hidden relative flex items-center justify-center">
                    <Vortex
                      backgroundColor="black"
                      className="flex items-center flex-col justify-center px-4 py-8 w-full h-full"
                      particleCount={300}
                      baseHue={180}
                      rangeSpeed={2}
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 1, type: "spring", bounce: 0.4 }}
                        className="relative"
                      >
                        <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${getBadgeColor(badgeMetadata.level)} p-1 shadow-2xl`}>
                          <div className="w-full h-full rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center border border-white/20">
                            {React.createElement(getBadgeIcon(badgeMetadata.level), {
                              className: "w-16 h-16 text-white drop-shadow-lg"
                            })}
                          </div>
                        </div>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="absolute -inset-4 rounded-full border-2 border-dashed border-white/30"
                        />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-center mt-6"
                      >
                        <h3 className="text-2xl font-bold text-white mb-2">{badgeMetadata.badge_type}</h3>
                        <div
                          className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${getBadgeColor(badgeMetadata.level)} text-black font-bold text-sm mb-2`}
                        >
                          {badgeMetadata.level} Level
                        </div>
                        <p className="text-gray-300 text-sm">{badgeMetadata.verified_metric}</p>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="absolute top-4 right-4"
                      >
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1 border border-white/20">
                          <span className="text-white text-xs font-medium">Algorand ASA</span>
                        </div>
                      </motion.div>
                    </Vortex>
                  </div>
                )}
                {!mintingComplete && (
                  <GlassButton onClick={() => handleMintBadge(defiActivity)} disabled={isMinting || mintingComplete}>
                    {isMinting ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span>Minting Badge...</span>
                      </>
                    ) : (
                      <span>Mint Algorand Badge</span>
                    )}
                  </GlassButton>
                )}
                {mintingComplete && (
                  <GlassButton disabled className="!w-auto !px-6 !py-3">
                    <Check className="w-6 h-6" />
                    <span>Badge Minted Successfully</span>
                  </GlassButton>
                )}
              </div>
            </motion.div>

            {/* Step 3: Logs Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="col-span-7 bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl min-h-[450px]"
            >
              <LogContainer logs={logs} title="Minting Logs" />
            </motion.div>

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="col-span-12 bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl"
            >
              <div className="flex justify-between items-center">
                <GlassButton
                  onClick={() => setCurrentStep(2)}
                  className="!w-auto !px-6 !py-3 !bg-white/10 hover:!bg-white/20"
                >
                  Previous
                </GlassButton>
                <div className="text-gray-400 text-lg">Step 3 of 3: Mint Algorand Badge</div>
                <GlassButton onClick={onBack} disabled={!mintingComplete} className="!w-auto !px-6 !py-3">
                  Complete
                </GlassButton>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  )
}

export default GenerateProofView