"use client"
import './globals.css'
// import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ZeyoNavbar from '@/components/Zeyo-navbar'

import {
  WalletProvider,
  WalletManager,
  NetworkId,
  WalletId,
} from '@txnlab/use-wallet-react'

// Load Inter font
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700'],
})

// export const metadata: Metadata = {
//   title: 'Zeyo',
//   description: 'Reclaim your DeFi Privacy with Zeyo',
//   generator: 'Next.js',
// }

// Create wallet manager instance
const manager = new WalletManager({
  wallets: [
    WalletId.DEFLY,
    {
      id: WalletId.PERA,
      options: {
        shouldShowSignTxnToast: false
      }
    }
  ],
  
  networks: {
    [NetworkId.TESTNET]: {
      algod: {
        token: '',
        baseServer: 'https://testnet-api.algonode.cloud',
        port: '',
      },
      indexer: {
        token: '',
        baseServer: 'https://testnet-idx.algonode.cloud',
        port: '',
      },
    },
  },
  defaultNetwork: NetworkId.TESTNET,
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletProvider manager={manager}>
          {/* Add navbar here if you want it globally */}
          {/* <ZeyoNavbar /> */}
          {children}
        </WalletProvider>
      </body>
    </html>
  )
}
