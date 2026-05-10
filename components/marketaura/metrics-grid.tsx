"use client"

import { motion } from "framer-motion"
import { MetricCard } from "./metric-card"
import { Coins, CircleDollarSign, Fuel, Scale } from "lucide-react"

const metrics = [
  {
    title: "Gold 24K",
    value: 72450,
    change: 0.85,
    unit: "per 10g",
    icon: Coins,
    accentColor: "gold" as const,
  },
  {
    title: "Gold 22K",
    value: 66412,
    change: 0.72,
    unit: "per 10g",
    icon: Coins,
    accentColor: "gold" as const,
  },
  {
    title: "Silver",
    value: 87200,
    change: -0.42,
    unit: "per 1kg",
    icon: CircleDollarSign,
    accentColor: "silver" as const,
  },
  {
    title: "Silver 10g",
    value: 872,
    change: -0.38,
    unit: "per 10g",
    icon: CircleDollarSign,
    accentColor: "silver" as const,
  },
  {
    title: "Petrol",
    value: 104.21,
    change: 0.15,
    unit: "per litre",
    icon: Fuel,
    accentColor: "emerald" as const,
  },
  {
    title: "Diesel",
    value: 90.76,
    change: -0.08,
    unit: "per litre",
    icon: Fuel,
    accentColor: "electric" as const,
  },
  {
    title: "USD/INR",
    value: 83.42,
    change: 0.12,
    unit: "exchange rate",
    icon: CircleDollarSign,
    accentColor: "electric" as const,
  },
  {
    title: "Gold-Silver Ratio",
    value: 83.08,
    change: 1.28,
    unit: "ratio",
    icon: Scale,
    accentColor: "gold" as const,
    isRatio: true,
  },
]

export function MetricsGrid() {
  return (
    <section className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h2 className="text-2xl font-bold tracking-tight">Live Market Dashboard</h2>
        <p className="text-muted-foreground mt-1">Real-time commodity and currency rates</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard
            key={metric.title}
            {...metric}
            delay={index}
          />
        ))}
      </div>
    </section>
  )
}
