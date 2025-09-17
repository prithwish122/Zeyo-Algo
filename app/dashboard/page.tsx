"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  Wallet,
  X,
} from "lucide-react"
import ConnectButton from "@/components/Connectbutton"
import DashNavbar from "@/components/dashboard-bar"
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react"
import { useReadContract, useWriteContract } from "wagmi"
import propAbi from "@/contract/abi.json"

import ZeyoSidebar from "@/components/dashboard/ZeyoSidebar"
import VerifyCredentialsView from "@/components/dashboard/VerifyCredentialsView"
import GenerateProofView from "@/components/dashboard/GenerateProofView"
import ZeyoMainContent from "@/components/dashboard/ZeyoMainContent"
import WalletButton from "@/components/walllet/wallet"

export default function ZeyoDashboard() {
  const [currentView, setCurrentView] = useState<"dashboard" | "generate-proof" | "verify-credentials">("dashboard")
  const [showWalletModal, setShowWalletModal] = useState(true)
  const [isConnecting, setIsConnecting] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)
  const { address, isConnected } = useAppKitAccount()
  const { chainId } = useAppKitNetwork()
  // const { writeContract, isSuccess } = useWriteContract()

  const handleConnectWallet = async () => {
    setIsConnecting(true)
    // Simulate wallet connection
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setWalletConnected(true)
    setIsConnecting(false)
    setShowWalletModal(false)
  }

  const handleCloseModal = () => {
    setShowWalletModal(false)
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Wallet Connection Modal */}
      <AnimatePresence>
        {showWalletModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-md" />
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative z-10 bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl max-w-md w-full mx-4"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
              {/* Content */}
              <div className="text-center space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Connect your Wallet</h2>
                </div>
                <div className="flex items-center justify-center space-x-4">
                  {/* <ConnectButton /> */}
                  <WalletButton />
                </div>
                <p className="text-gray-400 text-xs">
                  By connecting, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex relative z-10">
        {/* Sidebar */}
        <ZeyoSidebar
          onGenerateProof={() => setCurrentView("generate-proof")}
          onVerifyCredentials={() => setCurrentView("verify-credentials")}
          onDashboard={() => setCurrentView("dashboard")}
          currentView={currentView}
        />

        {/* Main Content */}
        <div className="flex-1 p-8">
          <DashNavbar />
          <AnimatePresence mode="wait">
            {currentView === "dashboard" ? (
              <ZeyoMainContent key="dashboard" themeColor="#22c55e" />
            ) : currentView === "generate-proof" ? (
              <GenerateProofView key="generate-proof" onBack={() => setCurrentView("dashboard")} />
            ) : (
              <VerifyCredentialsView key="verify-credentials" onBack={() => setCurrentView("dashboard")} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}