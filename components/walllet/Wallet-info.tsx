import { useWallet } from '@txnlab/use-wallet-react'

export default function WalletInfo() {
  const { 
    wallets,             // List of available wallets
    activeWallet,        // Currently active wallet
    activeAddress,       // Address of active account
    isReady,             // Whether all wallet providers have finished initialization
    signTransactions,    // Function to sign transactions
    transactionSigner,   // Typed signer for ATC and Algokit Utils
    algodClient          // Algod client for active network
  } = useWallet()

  // Checking isReady is important, especially in SSR environments
  // to prevent hydration errors
  if (!isReady) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {activeAddress ? (
        <div>Connected: {activeAddress}</div>
      ) : (
        <div>Not connected</div>
      )}
    </div>
  )
}