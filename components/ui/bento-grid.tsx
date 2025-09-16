import type React from "react"
import { cn } from "@/lib/utils"

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) => {
  return (
    <div className={cn("mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3", className)}>
      {children}
    </div>
  )
}

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string
  title?: string | React.ReactNode
  description?: string | React.ReactNode
  header?: React.ReactNode
  icon?: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        /* <CHANGE> Changed all blue colors to #f96e34 variations */
        "group/bento shadow-input row-span-1 flex flex-col justify-between space-y-4 rounded-xl border bg-gradient-to-br from-slate-950 to-slate-950 p-4 transition duration-200 hover:shadow-xl",
        className,
      )}
      style={{
        borderColor: 'rgba(249, 110, 52, 0.2)',
        boxShadow: '0 0 0 1px rgba(249, 110, 52, 0.1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(249, 110, 52, 0.4)';
        e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(249, 110, 52, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(249, 110, 52, 0.2)';
        e.currentTarget.style.boxShadow = '0 0 0 1px rgba(249, 110, 52, 0.1)';
      }}
    >
      {header}
      <div className="transition duration-200 group-hover/bento:translate-x-2">
        {icon}
        {/* <CHANGE> Changed text-blue-100 to custom orange tinted white */}
        <div className="mt-2 mb-2 font-sans font-bold" style={{ color: '#fef7f0' }}>{title}</div>
        {/* <CHANGE> Changed text-blue-200/80 to custom orange tinted gray */}
        <div className="font-sans text-xs font-normal" style={{ color: 'rgba(254, 247, 240, 0.8)' }}>{description}</div>
      </div>
    </div>
  )
}
