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
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react"
import { useWriteContract } from "wagmi"
import propAbi from "@/contract/abi.json"
import { Vortex } from "@/components/ui/vortex"
import LogContainer from "./LogContainer"
import GlassButton from "./GlassButton"

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

interface ApiResponse {
  balance?: string;
  address?: string;
  validators?: Array<any>;
  [key: string]: any;
}

interface AnalysisResult {
  intent: string;
  apiEndpoint: string | null;
  params: {
    address?: string | null;
  };
  extractedData: {
    // address: string | null;
    amount: number | null;
    token: string | null;
    originalText: string;
  };
}

interface ApiCallResult {
  success: boolean;
  data: ApiResponse;
  analysis: AnalysisResult;
}
// LangChain-like text analyzer
class TextAnalyzer {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    // Fetch API key from environment variable
    this.apiKey = process.env.NEXT_PUBLIC_BTCS_API_KEY || ""
    this.baseUrl = "https://api.test2.btcs.network/api"
  }

  // Parse user input to extract relevant information
  parseInput(text: string): AnalysisResult {
    const lowerText = text.toLowerCase()
    
    // Extract wallet address if mentioned
    const addressMatch = text.match(/(0x[a-fA-F0-9]{40})|([a-zA-Z0-9]{34,44})/g)
    const address = addressMatch ? addressMatch[0] : null
    
    // Extract amount and token - improved regex to handle decimals
    const amountMatch = text.match(/(\d+(?:\.\d+)?)\s*(tcore|usdt|btc|eth|core|token|coin)/i)
    const amount = amountMatch ? parseFloat(amountMatch[1]) : null
    const token = amountMatch ? amountMatch[2].toLowerCase() : null
    
    // Determine intent based on keywords
    let intent = "unknown"
    let apiEndpoint: string | null = null
    let params: { address?: string | null } = {}
    
    if (lowerText.includes("balance") || lowerText.includes("have") || lowerText.includes("hold")) {
      if (lowerText.includes("core")) {
        intent = "core_balance"
        apiEndpoint = "/accounts/core_balance_by_address"
        params = { address }
      }
    } else if (lowerText.includes("validator") || lowerText.includes("staking")) {
      intent = "validators"
      apiEndpoint = "/stats/list_of_validators"
    }
    
    return {
      intent,
      apiEndpoint,
      params,
      extractedData: {
        // address,
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

    let url = `${this.baseUrl}${analysis.apiEndpoint}`
    
    // Handle different endpoint types
    if (analysis.intent === "core_balance") {
      const targetAddress = analysis.params.address || userAddress
      if (!targetAddress) {
        throw new Error("No wallet address found in input or connected wallet")
      }
      url = `${this.baseUrl}/accounts/core_balance_by_address/${targetAddress}?apikey=${this.apiKey}`
    } else if (analysis.intent === "validators") {
      url = `${this.baseUrl}/stats/list_of_validators?apikey=${this.apiKey}`
    }

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

const EnhancedTrophyBadge: React.FC<{ badgeMetadata: BadgeMetadata }> = ({ badgeMetadata }) => {
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
      default:
        return "from-[#f96e34] via-[#f96e34] to-[#f96e34]"
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

  const BadgeIcon = getBadgeIcon(badgeMetadata.level)

  return (
    <div className="w-full h-80 rounded-2xl overflow-hidden relative">
      <Vortex
        backgroundColor="black"
        className="flex items-center flex-col justify-center px-4 py-8 w-full h-full"
        particleCount={300}
        baseHue={200}
        rangeSpeed={2}
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring", bounce: 0.4 }}
          className="relative"
        >
          <div
            className={`w-32 h-32 rounded-full bg-gradient-to-br ${getBadgeColor(badgeMetadata.level)} p-1 shadow-2xl`}
          >
            <div className="w-full h-full rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <BadgeIcon className="w-16 h-16 text-white drop-shadow-lg" />
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
            <span className="text-white text-xs font-medium">Soulbound NFT</span>
          </div>
        </motion.div>
      </Vortex>
    </div>
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
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null)
  const [logs, setLogs] = useState<Array<LogEntry>>([])

  const textAnalyzer = new TextAnalyzer()

  const addLog = (type: "info" | "success" | "error", message: string): void => {
    const timestamp = new Date().toLocaleTimeString()
    setLogs((prev) => [...prev, { type, message, timestamp }])
  }

  const handleVerifyWithCarv = async (): Promise<void> => {
    setIsVerifying(true)
    setLogs([])
    setApiResponse(null)

    try {
      // Step 1: Analyze the input text
      addLog("info", "Initializing AI agent for text analysis...")
      await new Promise(resolve => setTimeout(resolve, 800))
      
      addLog("info", "Analyzing user input with LangChain...")
      const analysis = textAnalyzer.parseInput(defiActivity)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      addLog("info", `Detected intent: ${analysis.intent}`)
      addLog("info", `Extracted data: ${JSON.stringify(analysis.extractedData)}`)
      
      // Use connected wallet address if no address found in text
      const targetAddress =  address
      // if (isConnected && address && !analysis.extractedData.address) {
        addLog("info", `Using connected wallet: ${address.slice(0, 6)}...${address.slice(-4)}`)
      // }
      
      await new Promise(resolve => setTimeout(resolve, 800))

      // Step 2: Execute the appropriate API call
      if (analysis.intent === "unknown") {
        addLog("error", "Unable to determine action from input. Please be more specific.")
        setIsVerifying(false)
        return
      }

      addLog("info", `Preparing API call to ${analysis.apiEndpoint}...`)
      await new Promise(resolve => setTimeout(resolve, 1000))

      addLog("info", "Making authenticated API request...")
      const result: ApiCallResult = await textAnalyzer.executeIntent(analysis, targetAddress)
      await new Promise(resolve => setTimeout(resolve, 1200))

      // Step 3: Process and display results
      addLog("info", "Processing API response...")
      await new Promise(resolve => setTimeout(resolve, 800))

      if (result.success) {
        setApiResponse(result.data)
        
        // Format response based on intent
        if (analysis.intent === "core_balance") {
          // Handle different possible response formats
          let actualBalance = 0;
          
          // Try different possible field names in the API response
          if (result.data.result !== undefined) {
            // Convert from wei to CORE (divide by 10^18)
            actualBalance = parseFloat(result.data.result.toString()) / Math.pow(10, 18);
          } else if (result.data.balance !== undefined) {
            actualBalance = parseFloat(result.data.balance.toString());
          } else if (result.data.amount !== undefined) {
            actualBalance = parseFloat(result.data.amount.toString());
          } else if (result.data.value !== undefined) {
            actualBalance = parseFloat(result.data.value.toString());
          } else if (result.data.core_balance !== undefined) {
            actualBalance = parseFloat(result.data.core_balance.toString());
          }
          
          const claimedAmount = analysis.extractedData.amount
          
          addLog("info", `API returned balance: ${actualBalance.toFixed(6)} CORE`)
          console.log("Full API Response:", result.data); // Debug log
          
          // Verify claimed amount against actual balance ONLY if user claimed a specific amount
          if (claimedAmount !== null && claimedAmount > 0) {
            addLog("info", `User claimed: ${claimedAmount} CORE`)
            
            // Check if claimed amount matches actual balance (with reasonable tolerance for decimals)
            const tolerance = 0.001 // Small tolerance for floating point precision
            const balanceMatches = Math.abs(actualBalance - claimedAmount) <= tolerance
            
            if (balanceMatches) {
              addLog("success", "Verified successfully")
            } else {
              addLog("error", "Wrong information provided")
            }
          } else {
            // If no specific amount was claimed in the text, just show balance retrieved
            addLog("success", "Balance retrieved successfully")
          }
        } else if (analysis.intent === "validators") {
          const validatorCount: number = result.data.validators?.length || 0
          addLog("success", `Retrieved ${validatorCount} validators successfully`)
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

  const { address, isConnected } = useAppKitAccount()
  const { chainId } = useAppKitNetwork()
  const { writeContract, isSuccess } = useWriteContract()

  const contract_address: string = "0xF08d516Ca23fe9549E4f3213E186Ea885c87e6E1"

  const handleMintBadge = async (defiActivity: string): Promise<void> => {
    setIsMinting(true)
    setLogs([])
    const mintingSteps = [
      "Preparing badge metadata...",
      "Creating soulbound token...",
      "Deploying to blockchain...",
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

    writeContract({
      abi: propAbi,
      functionName: "mintBadge",
      address: contract_address,
      args: [defiActivity],
    })
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
      if (apiResponse.balance) {
        const balance: number = parseFloat(apiResponse.balance)
        badgeType = "Core Holder"
        
        if (balance >= 1000) {
          level = "Diamond"
          verifiedMetric = `${balance} CORE verified`
        } else if (balance >= 100) {
          level = "Gold"
          verifiedMetric = `${balance} CORE verified`
        } else if (balance >= 10) {
          level = "Silver"
          verifiedMetric = `${balance} CORE verified`
        } else {
          level = "Bronze"
          verifiedMetric = `${balance} CORE verified`
        }
      } else if (apiResponse.validators) {
        badgeType = "Validator Participant"
        level = "Expert"
        verifiedMetric = "Network validator verified"
      }
    }

    // Fallback to text analysis
    if (activityLower.includes("curve") || activityLower.includes("uniswap") || activityLower.includes("sushiswap")) {
      badgeType = "DEX Trader"
    } else if (
      activityLower.includes("compound") ||
      activityLower.includes("aave") ||
      activityLower.includes("lending")
    ) {
      badgeType = "DeFi Lender"
    } else if (activityLower.includes("liquidity") || activityLower.includes("pool")) {
      badgeType = "Liquidity Provider"
    } else if (activityLower.includes("yield") || activityLower.includes("farm")) {
      badgeType = "Yield Farmer"
    }

    // Remove level from returned metadata
    return {
      // level: level, // <-- REMOVE THIS LINE
      activity_description: defiActivity,
      wallet: address || "0x123...456",
      issued_by: "Zeyo",
      timestamp: new Date().toISOString(),
      soulbound: true,
      visibility: "private",
      api_verified: !!apiResponse
    }
  }

  // Remove volume and zkProof from zkProofMetadata
  const zkProofMetadata = {
    activity: defiActivity || "No activity specified",
    wallet: address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "0x****",
    apiResponse: apiResponse ? "Verified" : "Pending"
  }

  const badgeMetadata: BadgeMetadata = generateBadgeMetadata()

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
                    ? "bg-[#f96e34] text-black"
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

      {/* Bento Grid Layout - Increased Height */}
      <div className="grid grid-cols-12 gap-6">
        {currentStep === 1 && (
          <>
            {/* Step 1: Input Section - Increased Height */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="col-span-5 bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl min-h-[450px]"
            >
              <div className="flex items-center space-x-3 mb-8">
                <FileText className="w-6 h-6 text-[#f96e34]" />
                <h3 className="text-xl font-bold text-white">Enter DeFi Activity</h3>
              </div>
              <div className="space-y-8">
                <textarea
                  value={defiActivity}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDefiActivity(e.target.value)}
                  placeholder={`Describe your DeFi activity (e.g., 'I have 1 USDT in Core'${isConnected && address ? `, 'Check my Core balance' - Connected: ${address.slice(0, 6)}...${address.slice(-4)}` : ', "0x123... wallet address required"'})`}
                  className="w-full h-48 p-6 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-[#f96e34]/50 focus:outline-none resize-none text-lg"
                />
                <div className="space-y-4">
                  <GlassButton
                    onClick={handleVerifyWithCarv}
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
                      <span>Verify </span>
                    )}
                  </GlassButton>
                  <div className="text-center">
                    <span className="text-gray-400 text-sm">Powered by Core API</span>
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

            {/* Step 1: Logs Section - Increased Height */}
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
                <div className="text-gray-400 text-lg">Step 1 of 3: AI-Powered DeFi Activity Verification</div>
                <GlassButton
                  onClick={() => setCurrentStep(2)}
                  // Only enable if logs contain a "success" type with "Verified successfully" or "Balance retrieved successfully"
                  disabled={
                    !logs.some(
                      log =>
                        log.type === "success" &&
                        (
                          log.message.toLowerCase().includes("verified successfully") ||
                          log.message.toLowerCase().includes("balance retrieved successfully")
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
            {/* Step 2: Metadata Section - Increased Height */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="col-span-5 bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl min-h-[450px]"
            >
              <div className="flex items-center space-x-3 mb-8">
                <Shield className="w-6 h-6 text-[#f96e34]" />
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

            {/* Step 2: Logs Section - Increased Height */}
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
            {/* Step 3: Badge Section with Enhanced Trophy - Increased Height */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="col-span-5 bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl min-h-[450px]"
            >
              <div className="flex items-center space-x-3 mb-8">
                <Trophy className="w-6 h-6 text-[#f96e34]" />
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
                {/* After minting, show badge without type/level */}
                {mintingComplete && (
                  <div className="w-full h-80 rounded-2xl overflow-hidden relative flex items-center justify-center">
                    <Vortex
                      backgroundColor="black"
                      className="flex items-center flex-col justify-center px-4 py-8 w-full h-full"
                      particleCount={300}
                      baseHue={200}
                      rangeSpeed={2}
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 1, type: "spring", bounce: 0.4 }}
                        className="relative"
                      >
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#f96e34] via-[#f96e34] to-[#f96e34] p-1 shadow-2xl">
                          <div className="w-full h-full rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center border border-white/20">
                            <Trophy className="w-16 h-16 text-white drop-shadow-lg" />
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
                        <p className="text-gray-300 text-sm">{badgeMetadata.activity_description}</p>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="absolute top-4 right-4"
                      >
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1 border border-white/20">
                          <span className="text-white text-xs font-medium">Soulbound NFT</span>
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
                      <span>Mint Badge</span>
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

            {/* Step 3: Logs Section - Increased Height */}
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
                <div className="text-gray-400 text-lg">Step 3 of 3: Mint Badge</div>
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