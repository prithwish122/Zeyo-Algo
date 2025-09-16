import { useState } from "react"
import { motion } from "motion/react"
import { ArrowLeft, Search, Loader2, Check } from "lucide-react"
import { useReadContract } from "wagmi"
import propAbi from "@/contract/abi.json"
import GlassButton from "./GlassButton"
import LogContainer from "./LogContainer"

const VerifyCredentialsView = ({ onBack }: { onBack: () => void }) => {
  const [credentials, setCredentials] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationComplete, setVerificationComplete] = useState(false)
  const [logs, setLogs] = useState<Array<{ type: "info" | "success" | "error"; message: string; timestamp: string }>>(
    [],
  )

  const contract_address = "0xF08d516Ca23fe9549E4f3213E186Ea885c87e6E1"

  const readContract = useReadContract({
    address: contract_address,
    abi: propAbi,
    functionName: "getBadgeName",
    args: [credentials],
    query: {
      enabled: true,
    },
  })

  const handleVerifyCredentials = async (credentials: string) => {
    setIsVerifying(true)
    const { data } = await readContract.refetch()
    setLogs((prevLogs) => [
      ...prevLogs,
      {
        type: 'info',
        message: `Fetched Badge Name: ${data}`,
        timestamp: new Date().toISOString(),
      }
    ])
    setIsVerifying(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="ml-72 space-y-8"
    >
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
      <div className="grid grid-cols-12 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-5 bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl min-h-[500px]"
        >
          <div className="flex items-center space-x-3 mb-8">
            <Search className="w-6 h-6 text-[#f96e34]" />
            <h3 className="text-xl font-bold text-white">Enter Credentials</h3>
          </div>
          <div className="space-y-6">
            <textarea
              value={credentials}
              onChange={(e) => setCredentials(e.target.value)}
              placeholder="Enter your credential details here (e.g., 'Verified DeFi activity on Curve Finance, Uniswap, etc.')"
              className="w-full h-64 p-6 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-[#f96e34]/50 focus:outline-none resize-none text-lg"
            />
            <GlassButton onClick={() => handleVerifyCredentials(credentials)} disabled={!credentials.trim() || isVerifying}>
              {isVerifying ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin text-[#f96e34]" />
                  <span>Verifying Credentials...</span>
                </>
              ) : verificationComplete ? (
                <>
                  <Check className="w-6 h-6 text-[#f96e34]" />
                  <span>Verification Complete</span>
                </>
              ) : (
                <span>Verify Credentials</span>
              )}
            </GlassButton>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="col-span-7 bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl min-h-[500px]"
        >
          <LogContainer logs={logs} title="Verification Logs" />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default VerifyCredentialsView
