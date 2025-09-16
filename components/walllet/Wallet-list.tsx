const WalletList = ({ wallets }: { wallets: Wallet[] }) => {
  return (
    <div className="wallet-list">
      <h3>Connect Wallet</h3>
      <div className="wallet-options">
        {wallets.map((wallet) => (
          <WalletOption
            key={wallet.id}
            wallet={wallet}
          />
        ))}
      </div>
    </div>
  )
}
export default WalletList