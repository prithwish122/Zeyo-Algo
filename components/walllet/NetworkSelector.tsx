import { useNetwork } from '@txnlab/use-wallet-react'

function NetworkSelector() {
  const {
    // Active network management
    activeNetwork,         // Currently active network
    setActiveNetwork,      // Function to change networks
    
    // Runtime node configuration
    networkConfig,         // Complete configuration for all networks
    activeNetworkConfig,   // Configuration for active network only
    updateAlgodConfig,     // Update a network's Algod configuration
    resetNetworkConfig     // Reset network config to initial values
  } = useNetwork()

  return (
    <div>
      {/* Example: Network selector dropdown */}
      <select
        value={activeNetwork}
        onChange={(e) => setActiveNetwork(e.target.value)}
      >
        {Object.keys(networkConfig).map((networkId) => (
          <option key={networkId} value={networkId}>
            {networkId}
          </option>
        ))}
      </select>
    </div>
  )
}   