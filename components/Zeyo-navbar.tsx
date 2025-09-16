"use client"
import { Button } from "@/components/ui/moving-border"
import { Shield, BarChart3, FileText } from "lucide-react"
import Link from "next/link"
import WalletInfo from "./walllet/Wallet-info"
import WalletMenu from "./walllet/wallet"
// import WalletList from "./walllet/wallet"
import ConnectButton from "./Connectbutton"
import WalletButton from "./walllet/wallet"

export default function ZeyoNavbar() {
  const navItems = [
    {
      name: "Home",
      link: "#home",
      icon: <Shield className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Features",
      link: "#features",
      icon: <Shield className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "How It Works",
      link: "#how-it-works",
      icon: <BarChart3 className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Contact",
      link: "#contact",
      icon: <FileText className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
  ]

  return (
    <div className="relative w-full">
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[5001] flex items-center gap-8">
        {/* Navigation */}
        <div className="flex items-center space-x-8 bg-black/80 backdrop-blur-md border border-orange-500/20 rounded-full px-8 py-3">
          <Link href="/">
            <img src="/Logo.png" alt="Logo" className="h-8 w-8 rounded-full" />
          </Link>
          {/* Navigation Items */}
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              className="text-orange-200 hover:text-orange-100 transition-colors text-sm font-medium font-sans"
            >
              {item.name}
            </a>
          ))}
        </div>
        {/* Launch App Button */}
        <Link href="/dashboard">
          <Button
            borderRadius="1.75rem"
            className="bg-orange-950/80 backdrop-blur-md text-orange-100 border-orange-500/30 hover:border-orange-400/50 transition-all font-sans"
          >
            Try demo
          </Button>
          {/* <WalletInfo /> */}
          {/* <Button>  */}
            {/* <WalletMenu/> */}
          {/* </Button> */}
        </Link>
        {/* <WalletMenu/> */}
        {/* <WalletButton /> */}
      </div>
    </div>
  )
}
