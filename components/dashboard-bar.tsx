"use client"
import { Button } from "@/components/ui/moving-border"
import { Shield, BarChart3, FileText, Zap, Wallet } from "lucide-react"
import ConnectButton from "./Connectbutton"
import Link from "next/link"
import WalletButton from "./walllet/wallet"

export default function DashNavbar() {
  const navItems = [
    // {
    //   name: "Logo",
    //   link: "/",
    //   icon: ,
    // },
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
        {/* Logo */}
        {/* <div className="flex items-center space-x-2 bg-black/80 backdrop-blur-md border border-blue-500/20 rounded-full px-6 py-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-lg font-sans">Zeyo</span>
          </div>
        </div> */}

        {/* Navigation */}
        <div className="flex items-center space-x-8 bg-black/80 backdrop-blur-md border border-blue-500/20 rounded-full px-8 py-3">
        <Link href="/">
        <img src="/Logo.png" alt="Logo" className="h-8 w-8 rounded-full" />
        </Link>
          {/* Navigation Items */}
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              className="text-blue-200 hover:text-blue-100 transition-colors text-sm font-medium font-sans"
            >
              
              {item.name}
            </a>
          ))}
        </div>

        {/* Launch App Button */}
      {/* <Link href="/dashboard"> */}
        {/* <Button
          borderRadius="1.75rem"
          className="bg-blue-950/80 backdrop-blur-md text-blue-100 border-blue-500/30 hover:border-blue-400/50 transition-all font-sans"         > */}
          {/* <appkit-button network="false" /> */}
          <WalletButton/>
          {/* Try demo */}
        {/* </Button> */}
      {/* </Link> */}

        {/* Connect Button */}
      </div>
    </div>
  )
}
