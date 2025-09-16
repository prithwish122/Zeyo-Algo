/** @type {import('next').NextConfig} */
import { webpackFallback } from '@txnlab/use-wallet-react'

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        ...webpackFallback,
      }
    }
    return config
  },
}

export default nextConfig
