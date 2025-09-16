# Zeyo a Privacy-Preserving Reputation Layer for Core Blockchain

> **Reclaim Privacy. Prove Your Core Power.**
> Showcase your Core Blockchain achievements with **zero-knowledge badges**  no KYC, no wallet doxxing, no surveillance.

---

[![Live App](https://img.shields.io/badge/🚀_Live_App-Visit-brightgreen?style=for-the-badge)](https://zeyo-core.vercel.app/)
[![Core Scan](https://img.shields.io/badge/🔍_Check_in_Block_Explorer-Open-blue?style=for-the-badge)](https://scan.test2.btcs.network/address/0xF08d516Ca23fe9549E4f3213E186Ea885c87e6E1)

---

## 🔹 Overview

**Zeyo** is a privacy-preserving on-chain credentialing system for the **Core Blockchain** that issues **Soulbound Tokens (SBTs)** as verifiable badges for validated staking, delegation, and DeFi activities.  
Built with **Zero-Knowledge Proofs** and the **ERC-1155 standard**, Zeyo enables users to prove their Core ecosystem participation — **without compromising privacy** — and store their achievements on-chain.

---

## 🚀 Live Demo

- **Live App:** [https://zeyo-core.vercel.app/](https://zeyo-core.vercel.app/)  
- **Smart Contract (Core Testnet):** `0xF08d516Ca23fe9549E4f3213E186Ea885c87e6E1`  
- **Block Explorer:** [View on Core Scan](https://scan.test2.btcs.network/address/0xF08d516Ca23fe9549E4f3213E186Ea885c87e6E1)

---

## 🔧 Tech Stack

| Layer | Technology |
|-------|------------|
| **Smart Contract** | Solidity (ERC-1155 SBT) |
| **Blockchain** | Core Blockchain (EVM-compatible) |
| **Frontend** | Next.js + TypeScript |
| **Wallet Connection** | Reown + MetaMask |
| **ZK Proofs** | Circom / SnarkJS (or custom circuits) |
| **Identity Layer** | COREDAO |
| **API Integration** | CORE API |

---

## 🧠 How It Works

1. **Connect Wallet**  
   Users connect their Core wallet via Reown or MetaMask.

2. **Enter Activity**     
      User enter their onchain activity

4. **Activity Verification**  
   AI Agent calls Core API and validates staking, delegation, or Core DeFi participation.

5. **ZK Proof Generation**  
   If valid, Zeyo generates a zero-knowledge proof verifying activity without revealing wallet data.

6. **Mint SBT Badge**  
   An ERC-1155 Soulbound Token is minted to the user's address.

7. **On-Chain Identity**  
   Badges appear in the wallet and Zeyo dashboard, verifiable across the Core ecosystem.

---

## 💡 Why Zeyo?

- ✅ **Privacy-First** — Prove without exposing your wallet.
- ✅ **True Ownership** — Badges minted to your address.
- ✅ **Ecosystem Native** — For Core stakers, validators, and DeFi pioneers.
- ✅ **Hackathon-Ready** — Fully aligned with Core’s growth & decentralization goals.

---

## 🌍 Why Zeyo Fits Core Hackathon Goals

- 🟢 **Boosts Staking & Delegation** — Incentivizes participation via verifiable badges.  
- 🛑 **Preserves Privacy** — ZK proofs validate without revealing identities.  
- 💠 **Decentralizes Trust** — No central verification bottlenecks.  
- 🔗 **Enhances Composability** — Achievements usable across DeFi, DAOs, and NFT projects.  

---

## 📄 Contract Details

- **Standard:** ERC-1155 (Soulbound)  
- **Deployed On:** Core Blockchain Testnet  
- **Address:** `0xF08d516Ca23fe9549E4f3213E186Ea885c87e6E1`  
- **Block Explorer:** [Check on Core Scan](https://scan.test2.btcs.network/address/0xF08d516Ca23fe9549E4f3213E186Ea885c87e6E1)

---

## 🛠 Local Development Setup

```bash
# Clone repo
git clone https://github.com/prithwish122/Zeyo-core.git
cd zeyo

# Install dependencies
npm install

# Run dev server
npm run dev
