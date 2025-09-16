"use client"
import { useEffect, useRef } from "react"
import type React from "react"

interface VortexProps {
  children?: React.ReactNode
  className?: string
  backgroundColor?: string
  containerClassName?: string
  particleCount?: number
  rangeY?: number
  baseHue?: number
  baseSpeed?: number
  rangeSpeed?: number
  baseRadius?: number
  rangeRadius?: number
}

export const Vortex = ({
  children,
  className,
  backgroundColor = "black",
  containerClassName,
  particleCount = 700,
  rangeY = 800,
  baseHue = 220,
  baseSpeed = 0.0,
  rangeSpeed = 1.5,
  baseRadius = 1,
  rangeRadius = 2,
}: VortexProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }

    const particles: Array<{
      x: number
      y: number
      radius: number
      speed: number
      hue: number
      opacity: number
    }> = []

    const createParticles = () => {
      particles.length = 0
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * rangeY,
          radius: baseRadius + Math.random() * rangeRadius,
          speed: baseSpeed + Math.random() * rangeSpeed,
          hue: baseHue + Math.random() * 60,
          opacity: Math.random() * 0.5 + 0.2,
        })
      }
    }

    const animate = () => {
      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.y += particle.speed
        if (particle.y > canvas.height + particle.radius) {
          particle.y = -particle.radius
          particle.x = Math.random() * canvas.width
        }

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${particle.hue}, 100%, 50%, ${particle.opacity})`
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }

    resizeCanvas()
    createParticles()
    animate()

    window.addEventListener("resize", () => {
      resizeCanvas()
      createParticles()
    })

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [particleCount, rangeY, baseHue, baseSpeed, rangeSpeed, baseRadius, rangeRadius, backgroundColor])

  return (
    <div className={`relative ${containerClassName}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{
          background: backgroundColor,
        }}
      />
      <div className={`relative z-10 ${className}`}>{children}</div>
    </div>
  )
}
