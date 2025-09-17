import { useWallet, type Wallet } from '@txnlab/use-wallet-react'
import { useState, useRef, useEffect } from 'react'

const WalletButton = () => {
  const { wallets, activeWallet } = useWallet()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative">
      {/* Main Button */}
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className={`
          flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
          ${activeWallet 
            ? 'bg-green-100 text-green-800 hover:bg-green-200 border border-green-300' 
            : 'bg-green-600 text-white hover:bg-green-700 border border-green-600'
          }
        `}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        {activeWallet ? (
          <>
            <img
              src={activeWallet.metadata.icon}
              alt=""
              className="w-5 h-5"
            />
            <span className="hidden sm:inline">
              {activeWallet.activeAccount?.name || 'Connected'}
            </span>
            <span className="sm:hidden text-xs">Connected</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span className="hidden sm:inline">Connect Wallet</span>
            <span className="sm:hidden">Connect</span>
          </>
        )}
        
        {/* Dropdown Arrow */}
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          ref={dropdownRef}
          role="dialog"
          aria-labelledby="wallet-menu-title"
          className="absolute right-0 top-full mt-2 w-80 bg-black/90 backdrop-blur-xl rounded-lg shadow-xl border border-white/20 z-50"
        >
          <div className="p-4">
            <h2 id="wallet-menu-title" className="text-lg font-semibold mb-4 text-white">
              {activeWallet ? 'Connected Wallet' : 'Connect Wallet'}
            </h2>
            
            {activeWallet ? (
              <ConnectedWallet 
                wallet={activeWallet} 
                onClose={() => setIsOpen(false)} 
              />
            ) : (
              <WalletList 
                wallets={wallets} 
                onConnect={() => setIsOpen(false)} 
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

const WalletList = ({ 
  wallets, 
  onConnect 
}: { 
  wallets: Wallet[]
  onConnect: () => void 
}) => {
  return (
    <div className="space-y-2">
      {wallets.map((wallet) => (
        <WalletOption
          key={wallet.id}
          wallet={wallet}
          onConnect={onConnect}
        />
      ))}
    </div>
  )
}

const WalletOption = ({ 
  wallet, 
  onConnect 
}: { 
  wallet: Wallet
  onConnect: () => void 
}) => {
  const [connecting, setConnecting] = useState(false)
  
  const handleConnect = async () => {
    setConnecting(true)
    try {
      await wallet.connect()
      onConnect() // Close dropdown on successful connection
    } catch (error) {
      console.error('Failed to connect:', error)
    } finally {
      setConnecting(false)
    }
  }
  
  return (
    <button
      onClick={handleConnect}
      disabled={connecting}
      className="w-full flex items-center space-x-3 p-3 rounded-lg border border-white/20 hover:border-green-400/50 hover:bg-green-500/10 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <img
        src={wallet.metadata.icon}
        alt=""
        className="w-8 h-8"
      />
      <span className="font-medium text-white">
        {wallet.metadata.name}
      </span>
      {connecting && (
        <div className="ml-auto">
          <div className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </button>
  )
}

const ConnectedWallet = ({ 
  wallet, 
  onClose 
}: { 
  wallet: Wallet
  onClose: () => void 
}) => {
  const handleDisconnect = () => {
    wallet.disconnect()
    onClose()
  }

  return (
    <div className="space-y-4">
      {/* Wallet header */}
      <div className="flex items-center space-x-3 p-3 bg-green-500/20 backdrop-blur-sm rounded-lg border border-green-400/30">
        <img
          src={wallet.metadata.icon}
          alt=""
          className="w-8 h-8"
        />
        <span className="font-medium text-green-200">{wallet.metadata.name}</span>
        <div className="ml-auto">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
        </div>
      </div>
      
      {/* Account selector */}
      {wallet.accounts.length > 1 && (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Select Account
          </label>
          <select
            value={wallet.activeAccount?.address || ''}
            onChange={(e) => wallet.setActiveAccount(e.target.value)}
            className="w-full p-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-white backdrop-blur-sm"
          >
            {wallet.accounts.map((account) => (
              <option key={account.address} value={account.address} className="bg-gray-800 text-white">
                {account.name}
              </option>
            ))}
          </select>
        </div>
      )}
      
      {/* Account details */}
      {wallet.activeAccount && (
        <div className="space-y-2 p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
          <div>
            <span className="text-sm text-gray-400">Account Name:</span>
            <p className="font-medium text-white">{wallet.activeAccount.name}</p>
          </div>
          <div>
            <span className="text-sm text-gray-400">Address:</span>
            <p className="font-mono text-sm text-gray-200 break-all">
              {wallet.activeAccount.address}
            </p>
          </div>
        </div>
      )}
      
      {/* Disconnect button */}
      <button 
        onClick={handleDisconnect}
        className="w-full py-2 px-4 bg-red-600/80 backdrop-blur-sm text-white rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium border border-red-500/30"
      >
        Disconnect Wallet
      </button>
    </div>
  )
}

export default WalletButton