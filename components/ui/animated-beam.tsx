"use client"

import type React from "react"

import { forwardRef, useEffect, useId, useRef } from "react"
import { cn } from "@/lib/utils"

export interface AnimatedBeamProps {
  className?: string
  containerRef: React.RefObject<HTMLElement>
  fromRef: React.RefObject<HTMLElement>
  toRef: React.RefObject<HTMLElement>
  curvature?: number
  reverse?: boolean
  pathColor?: string
  pathWidth?: number
  pathOpacity?: number
  gradientStartColor?: string
  gradientStopColor?: string
  delay?: number
  duration?: number
  startXOffset?: number
  startYOffset?: number
  endXOffset?: number
  endYOffset?: number
}

export const AnimatedBeam = forwardRef<SVGSVGElement, AnimatedBeamProps>(
  (
    {
      className,
      containerRef,
      fromRef,
      toRef,
      curvature = 0,
      reverse = false,
      duration = Math.random() * 3 + 4,
      delay = 0,
      pathColor = "gray",
      pathWidth = 2,
      pathOpacity = 0.2,
      gradientStartColor = "#ffaa40",
      gradientStopColor = "#9c40ff",
      startXOffset = 0,
      startYOffset = 0,
      endXOffset = 0,
      endYOffset = 0,
    },
    ref,
  ) => {
    const id = useId()
    const svgRef = useRef<SVGSVGElement>(null)
    const pathRef = useRef<SVGPathElement>(null)

    useEffect(() => {
      if (containerRef.current && fromRef.current && toRef.current) {
        const updatePath = () => {
          if (containerRef.current && fromRef.current && toRef.current) {
            const containerRect = containerRef.current.getBoundingClientRect()
            const rectA = fromRef.current.getBoundingClientRect()
            const rectB = toRef.current.getBoundingClientRect()

            const svgWidth = containerRect.width
            const svgHeight = containerRect.height
            const svgX = containerRect.left
            const svgY = containerRect.top

            const startX = rectA.left - svgX + rectA.width / 2 + startXOffset
            const startY = rectA.top - svgY + rectA.height / 2 + startYOffset
            const endX = rectB.left - svgX + rectB.width / 2 + endXOffset
            const endY = rectB.top - svgY + rectB.height / 2 + endYOffset

            const controlY = startY - curvature
            const d = `M ${startX},${startY} Q ${(startX + endX) / 2},${controlY} ${endX},${endY}`

            if (pathRef.current) {
              pathRef.current.setAttribute("d", d)
            }
          }
        }

        updatePath()
        window.addEventListener("resize", updatePath)

        return () => {
          window.removeEventListener("resize", updatePath)
        }
      }
    }, [containerRef, fromRef, toRef, curvature, startXOffset, startYOffset, endXOffset, endYOffset])

    return (
      <svg
        ref={ref || svgRef}
        className={cn("pointer-events-none absolute left-0 top-0 transform-gpu stroke-2", className)}
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        style={{
          transform: "translateZ(0)",
        }}
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          d="M 0,0 Q 0,0 0,0"
          stroke={pathColor}
          strokeWidth={pathWidth}
          strokeOpacity={pathOpacity}
          fill="none"
        />
        <path
          d="M 0,0 Q 0,0 0,0"
          stroke={`url(#${id})`}
          strokeWidth={pathWidth}
          strokeOpacity="1"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="5 5"
          style={{
            strokeDashoffset: reverse ? -10 : 10,
            animation: `${reverse ? "beam-reverse" : "beam"} ${duration}s ease-in-out ${delay}s infinite`,
          }}
        />
        <defs>
          <linearGradient
            className={cn("transform-gpu")}
            id={id}
            gradientUnits="userSpaceOnUse"
            gradientTransform={`rotate(${reverse ? "180" : "0"}, 50, 50)`}
          >
            <stop stopColor={gradientStartColor} stopOpacity="0" />
            <stop stopColor={gradientStartColor} />
            <stop offset="32.5%" stopColor={gradientStopColor} />
            <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
)

AnimatedBeam.displayName = "AnimatedBeam"
