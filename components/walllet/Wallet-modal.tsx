"use client"
import { useWallet, type Wallet } from "@txnlab/use-wallet-react"
import { useState } from "react"
import WalletList from "./Wallet-list"
import WalletMenu from "./wallet"

const WalletModal = ({ onClose }: { onClose: () => void }) => {
  const { wallets, activeWallet } = useWallet()

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <button className="mb-4 text-gray-600" onClick={onClose}>
          ✕ Close
        </button>

        {activeWallet ? (
          <WalletMenu />
        ) : (
          <WalletList wallets={wallets} />
        )}
      </div>
    </div>
  )
}

export default WalletModal

// Keep your WalletList, WalletOption, ConnectedWallet components as they are
