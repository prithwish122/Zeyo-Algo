import type React from "react"
import { cn } from "@/lib/utils"
import { Shield, Zap, Lock, BarChart3 } from "lucide-react"
import { Meteors } from "@/components/ui/meteors"

export default function HowItWorksFeatures() {
  const features = [
    {
      title: "Connect & Deposit Assets",
      description: "Connect your wallet and deposit assets into secure smart contract vaults with complete privacy",
      skeleton: <SkeletonOne />,
      className: "col-span-1 lg:col-span-4 border-b lg:border-r border-blue-500/20",
    },
    {
      title: "Generate zkProofs",
      description: "Create zero-knowledge proofs of your trading performance without revealing sensitive data",
      skeleton: <SkeletonTwo />,
      className: "border-b col-span-1 lg:col-span-2 border-blue-500/20",
    },
    {
      title: "Trade Privately",
      description: "Execute trades and track portfolio performance while maintaining complete privacy and security",
      skeleton: <SkeletonThree />,
      className: "col-span-1 lg:col-span-3 lg:border-r border-blue-500/20",
    },
    {
      title: "Export zkBadges",
      description: "Generate verifiable credentials to prove your trading skills without exposing your actual data",
      skeleton: <SkeletonFour />,
      className: "col-span-1 lg:col-span-3 border-b lg:border-none",
    },
  ]

  return (
    <div className="relative z-20 py-10 lg:py-40 max-w-7xl mx-auto bg-gradient-to-b from-slate-950 via-blue-950/20 to-slate-950">
      <div className="px-8">
        <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-blue-100">
          How Zeyo Works
        </h4>
        <p className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-blue-200/80 text-center font-normal">
          Simple steps to private DeFi trading with zero-knowledge proofs and advanced privacy features
        </p>
      </div>
      <div className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-6 mt-12 xl:border rounded-md border-blue-500/20 bg-gradient-to-br from-blue-950/10 to-transparent backdrop-blur-sm">
          {features.map((feature) => (
            <FeatureCard key={feature.title} className={feature.className}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <div className="h-full w-full">{feature.skeleton}</div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </div>
  )
}

const FeatureCard = ({ children, className }: { children?: React.ReactNode; className?: string }) => {
  return <div className={cn(`p-4 sm:p-8 relative overflow-hidden`, className)}>{children}</div>
}

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className="max-w-5xl mx-auto text-left tracking-tight text-blue-100 text-xl md:text-2xl md:leading-snug">
      {children}
    </p>
  )
}

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p
      className={cn(
        "text-sm md:text-base max-w-4xl text-left mx-auto",
        "text-blue-200/80 text-center font-normal",
        "text-left max-w-sm mx-0 md:text-sm my-2",
      )}
    >
      {children}
    </p>
  )
}

export const SkeletonOne = () => {
  return (
    <div className="relative flex py-8 px-2 gap-10 h-full">
      <div className="w-full p-5 mx-auto bg-gradient-to-br from-blue-950/50 to-slate-950/50 backdrop-blur-sm shadow-2xl group h-full rounded-lg border border-blue-500/20 overflow-hidden">
        <Meteors number={15} />
        <div className="flex flex-1 w-full h-full flex-col space-y-2">
          <div className="h-full w-full bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-sm flex items-center justify-center">
            <Shield className="w-16 h-16 text-blue-400" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 z-40 inset-x-0 h-60 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent w-full pointer-events-none" />
      <div className="absolute top-0 z-40 inset-x-0 h-60 bg-gradient-to-b from-slate-950 via-transparent to-transparent w-full pointer-events-none" />
    </div>
  )
}

export const SkeletonTwo = () => {
  return (
    <div className="relative flex flex-col items-start p-8 gap-10 h-full overflow-hidden">
      <div className="w-full bg-gradient-to-br from-blue-950/50 to-slate-950/50 backdrop-blur-sm rounded-lg border border-blue-500/20 p-6 overflow-hidden">
        <Meteors number={10} />
        <div className="flex items-center justify-center h-full">
          <Zap className="w-12 h-12 text-blue-400" />
        </div>
      </div>
      <div className="absolute left-0 z-[100] inset-y-0 w-20 bg-gradient-to-r from-slate-950 to-transparent h-full pointer-events-none" />
      <div className="absolute right-0 z-[100] inset-y-0 w-20 bg-gradient-to-l from-slate-950 to-transparent h-full pointer-events-none" />
    </div>
  )
}

export const SkeletonThree = () => {
  return (
    <div className="relative flex gap-10 h-full group/image">
      <div className="w-full mx-auto bg-gradient-to-br from-blue-950/50 to-slate-950/50 backdrop-blur-sm group h-full rounded-lg border border-blue-500/20 overflow-hidden">
        <Meteors number={12} />
        <div className="flex flex-1 w-full h-full flex-col space-y-2 relative items-center justify-center">
          <Lock className="h-16 w-16 text-blue-400 z-10" />
        </div>
      </div>
    </div>
  )
}

export const SkeletonFour = () => {
  return (
    <div className="h-60 md:h-60 flex flex-col items-center relative bg-gradient-to-br from-blue-950/20 to-transparent mt-10 rounded-lg border border-blue-500/20 overflow-hidden">
      <Meteors number={20} />
      <div className="flex items-center justify-center h-full">
        <BarChart3 className="w-16 h-16 text-blue-400" />
      </div>
    </div>
  )
}
