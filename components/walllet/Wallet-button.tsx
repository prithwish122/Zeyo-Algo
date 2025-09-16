"use client"
import { useState } from "react"
import { useWallet } from "@txnlab/use-wallet-react"
import WalletModal from "../walllet/Wallet-modal"

const WalletButton = () => {
  const { activeWallet } = useWallet()
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        {activeWallet
          ? activeWallet.activeAccount
            ? activeWallet.activeAccount.address.slice(0, 6) +
              "..." +
              activeWallet.activeAccount.address.slice(-6)
            : activeWallet.metadata.name
          : "Connect Wallet"}
      </button>

      {/* Modal */}
      {open && <WalletModal onClose={() => setOpen(false)} />}
    </>
  )
}

export default WalletButton
