"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { useCurrency } from "@/components/currency-provider"
import { TrendingUp, TrendingDown, type LucideIcon } from "lucide-react"

interface MetricCardProps {
  title: string
  value: number
  change: number
  unit?: string
  icon: LucideIcon
  accentColor: "gold" | "silver" | "emerald" | "rose" | "electric"
  delay?: number
  isRatio?: boolean
}

const colorClasses = {
  gold: "text-gold bg-gold/10 border-gold/30",
  silver: "text-silver bg-silver/10 border-silver/30",
  emerald: "text-emerald bg-emerald/10 border-emerald/30",
  rose: "text-rose bg-rose/10 border-rose/30",
  electric: "text-electric bg-electric/10 border-electric/30",
}

const iconBgClasses = {
  gold: "bg-gold/20",
  silver: "bg-silver/20",
  emerald: "bg-emerald/20",
  rose: "bg-rose/20",
  electric: "bg-electric/20",
}

export function MetricCard({
  title,
  value,
  change,
  unit,
  icon: Icon,
  accentColor,
  delay = 0,
  isRatio = false,
}: MetricCardProps) {
  const { formatPrice } = useCurrency()
  const [displayValue, setDisplayValue] = useState(0)
  const isPositive = change >= 0
  const sparklineSeed = useMemo(
    () =>
      title.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0) +
      Math.round(value) +
      Math.round(change * 100),
    [title, value, change],
  )

  useEffect(() => {
    const duration = 1500
    const steps = 60
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        setDisplayValue(current)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value])

  const pathD = useMemo(() => {
    // Keep sparkline deterministic across server/client renders to avoid hydration mismatches.
    const points = Array.from({ length: 24 }, (_, i) => {
      const baseValue = 50 + (isPositive ? i * 0.5 : -i * 0.3)
      const seededNoise = ((Math.sin((i + 1) * (sparklineSeed + 17)) + 1) / 2) * 5
      return baseValue + Math.sin(i * 0.5) * 10 + seededNoise
    })

    const minY = Math.min(...points)
    const maxY = Math.max(...points)
    const range = maxY - minY || 1

    return points
      .map((p, i) => {
        const x = (i / (points.length - 1)) * 100
        const y = 100 - ((p - minY) / range) * 100
        return `${i === 0 ? "M" : "L"} ${x} ${y}`
      })
      .join(" ")
  }, [isPositive, sparklineSeed])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: delay * 0.1, ease: "easeOut" }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="relative group"
    >
      <div className="glass-card rounded-xl p-5 hover-glow gradient-border overflow-hidden">
        {/* Ambient glow */}
        <div
          className={`absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-3xl ${
            iconBgClasses[accentColor]
          }`}
        />

        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-lg ${iconBgClasses[accentColor]}`}>
              <Icon className={`h-5 w-5 ${colorClasses[accentColor].split(" ")[0]}`} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
              {unit && <span className="text-xs text-muted-foreground/70">{unit}</span>}
            </div>
          </div>

          {/* Change badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: delay * 0.1 + 0.3, type: "spring" }}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
              isPositive
                ? "bg-emerald/15 text-emerald border border-emerald/30"
                : "bg-rose/15 text-rose border border-rose/30"
            }`}
          >
            {isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {isPositive ? "+" : ""}
            {change.toFixed(2)}%
          </motion.div>
        </div>

        {/* Value */}
        <div className="mb-4">
          <motion.span
            className="text-3xl font-bold tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay * 0.1 + 0.2 }}
          >
            {isRatio
              ? displayValue.toFixed(2)
              : formatPrice(displayValue, title.includes("Petrol") || title.includes("Diesel") ? 2 : 0)}
          </motion.span>
        </div>

        {/* Mini sparkline */}
        <div className="h-12 w-full overflow-hidden">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id={`gradient-${title.replace(/\s/g, "")}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop
                  offset="0%"
                  stopColor={isPositive ? "oklch(0.68 0.20 155)" : "oklch(0.60 0.24 20)"}
                  stopOpacity="0.3"
                />
                <stop
                  offset="100%"
                  stopColor={isPositive ? "oklch(0.68 0.20 155)" : "oklch(0.60 0.24 20)"}
                  stopOpacity="0"
                />
              </linearGradient>
            </defs>
            <motion.path
              d={`${pathD} L 100 100 L 0 100 Z`}
              fill={`url(#gradient-${title.replace(/\s/g, "")})`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay * 0.1 + 0.4 }}
            />
            <motion.path
              d={pathD}
              fill="none"
              stroke={isPositive ? "oklch(0.68 0.20 155)" : "oklch(0.60 0.24 20)"}
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: delay * 0.1 + 0.2, ease: "easeOut" }}
            />
          </svg>
        </div>
      </div>
    </motion.div>
  )
}
