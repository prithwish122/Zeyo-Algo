"use client"
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards"

export default function Testimonials() {
  return (
    <div className="h-[40rem] rounded-md flex flex-col antialiased bg-black items-center justify-center relative overflow-hidden">
      <div className="text-center mb-12">
        <h2 className="text-5xl  text-white mb-6 font-sans tracking-tight">
          What people <span className="italic text-orange-300">say</span> about us.
        </h2>
        <p className="text-xl text-orange-200/80 font-sans">Real feedback from privacy-conscious DeFi traders.</p>
      </div>
      <InfiniteMovingCards items={testimonials} direction="right" speed="slow" />
    </div>
  )
}

const testimonials = [
  {
    quote:
      "Zeyo has revolutionized how we track DeFi performance while maintaining complete privacy. The zkProof system is incredibly powerful.",
    name: "Alex Chen",
    title: "DeFi Trader",
  },
  {
    quote:
      "Finally, a way to prove my trading success without exposing my wallet. The zkBadge system is genius for building reputation.",
    name: "Sarah Johnson",
    title: "Crypto Analyst",
  },
  {
    quote:
      "The privacy-first approach combined with advanced analytics makes Zeyo essential for serious traders who value discretion.",
    name: "Michael Rodriguez",
    title: "Fund Manager",
  },
  {
    quote:
      "Smart contract vaults with zero-knowledge proofs - this is the future of private DeFi trading. Absolutely game-changing.",
    name: "Emma Thompson",
    title: "Blockchain Developer",
  },
  {
    quote:
      "Zeyo's multi-chain support and privacy features have made it our go-to platform for institutional DeFi operations.",
    name: "David Kim",
    title: "Investment Director",
  },
]
