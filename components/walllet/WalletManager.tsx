import { 
  WalletManager,
  WalletId,
  NetworkConfigBuilder,
  NetworkId,
  LogLevel
} from '@txnlab/use-wallet'

// Configure networks
const networks = new NetworkConfigBuilder()
  .testnet({
    algod: {
      baseServer: 'https://testnet-api.algonode.cloud',
      port: '443',
      token: ''
    }
  })
  .localnet({
    algod: {
      baseServer: 'http://localhost',
      port: '4001',
      token: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    }
  })
  .build()

// Create manager instance
const manager = new WalletManager({
  // Configure wallets
  wallets: [
    WalletId.DEFLY,
    {
      id: WalletId.PERA,
      options: {
        shouldShowSignTxnToast: false
      }
    }
  ],
  
  // Use custom network configurations
  networks,
  defaultNetwork: NetworkId.TESTNET,
  
  // Set manager options
  options: {
    debug: true,
    logLevel: LogLevel.INFO,
    resetNetwork: false
  }
})