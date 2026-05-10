"use client"

import { motion } from "framer-motion"
import { useCurrency } from "@/components/currency-provider"
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  Newspaper,
  ArrowUp,
  ArrowDown,
  Activity,
} from "lucide-react"

const trendCards = [
  {
    title: "Gold Outlook",
    trend: "bullish",
    description: "Strong buying pressure with global uncertainty supporting prices",
    change: 2.4,
    signal: "BUY",
  },
  {
    title: "Silver Outlook",
    trend: "bearish",
    description: "Industrial demand softening amid manufacturing slowdown",
    change: -1.8,
    signal: "HOLD",
  },
  {
    title: "Crude Oil",
    trend: "bullish",
    description: "OPEC+ production cuts supporting near-term prices",
    change: 3.2,
    signal: "BUY",
  },
  {
    title: "USD/INR",
    trend: "neutral",
    description: "Range-bound movement expected with RBI intervention",
    change: 0.3,
    signal: "NEUTRAL",
  },
]

const dailyStats = [
  { commodity: "Gold 24K", high: 72890, low: 72210, open: 72350, close: 72450 },
  { commodity: "Silver", high: 88100, low: 86800, open: 87500, close: 87200 },
  { commodity: "Petrol", high: 104.50, low: 103.80, open: 104.10, close: 104.21 },
  { commodity: "USD/INR", high: 83.62, low: 83.18, open: 83.30, close: 83.42 },
]

const news = [
  {
    title: "Gold prices surge on global economic concerns",
    time: "2 hours ago",
    source: "Reuters",
  },
  {
    title: "RBI maintains steady forex reserves amid rupee volatility",
    time: "4 hours ago",
    source: "Economic Times",
  },
  {
    title: "Silver demand expected to rise with solar panel production",
    time: "6 hours ago",
    source: "Bloomberg",
  },
]

export function MarketInsights() {
  const { formatPrice } = useCurrency()

  return (
    <div className="space-y-8">
      {/* Trend Cards */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Market Trends
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trendCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-xl p-5 hover-glow"
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-semibold">{card.title}</h4>
                <span
                  className={`px-2 py-0.5 rounded text-xs font-bold ${
                    card.signal === "BUY"
                      ? "bg-emerald/20 text-emerald"
                      : card.signal === "HOLD"
                      ? "bg-rose/20 text-rose"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {card.signal}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-3">
                {card.trend === "bullish" ? (
                  <TrendingUp className="h-5 w-5 text-emerald" />
                ) : card.trend === "bearish" ? (
                  <TrendingDown className="h-5 w-5 text-rose" />
                ) : (
                  <BarChart3 className="h-5 w-5 text-muted-foreground" />
                )}
                <span
                  className={`font-mono font-semibold ${
                    card.change >= 0 ? "text-emerald" : "text-rose"
                  }`}
                >
                  {card.change >= 0 ? "+" : ""}
                  {card.change}%
                </span>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Daily Highs/Lows */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          Daily Price Range
        </h3>
        <div className="glass-card rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50 bg-secondary/30">
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Commodity
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Open
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-emerald">
                    <span className="flex items-center justify-end gap-1">
                      <ArrowUp className="h-3 w-3" /> High
                    </span>
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-rose">
                    <span className="flex items-center justify-end gap-1">
                      <ArrowDown className="h-3 w-3" /> Low
                    </span>
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Close
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Range
                  </th>
                </tr>
              </thead>
              <tbody>
                {dailyStats.map((stat, index) => {
                  const range = stat.high - stat.low
                  const rangePercent = ((stat.close - stat.low) / range) * 100
                  const isSmallValue = stat.high < 1000

                  return (
                    <motion.tr
                      key={stat.commodity}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-border/30 hover:bg-secondary/20"
                    >
                      <td className="px-4 py-4 font-medium">{stat.commodity}</td>
                      <td className="px-4 py-4 text-right font-mono text-muted-foreground">
                        {formatPrice(stat.open, isSmallValue ? 2 : 0)}
                      </td>
                      <td className="px-4 py-4 text-right font-mono text-emerald">
                        {formatPrice(stat.high, isSmallValue ? 2 : 0)}
                      </td>
                      <td className="px-4 py-4 text-right font-mono text-rose">
                        {formatPrice(stat.low, isSmallValue ? 2 : 0)}
                      </td>
                      <td className="px-4 py-4 text-right font-mono">
                        {formatPrice(stat.close, isSmallValue ? 2 : 0)}
                      </td>
                      <td className="px-4 py-4">
                        <div className="w-24 ml-auto">
                          <div className="h-2 rounded-full bg-secondary overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-rose via-primary to-emerald rounded-full"
                              style={{ width: `${rangePercent}%` }}
                            />
                          </div>
                        </div>
                      </td>
                    </motion.tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* News Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Newspaper className="h-5 w-5 text-primary" />
          Market News
        </h3>
        <div className="space-y-3">
          {news.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-xl p-4 hover-glow cursor-pointer group"
            >
              <h4 className="font-medium group-hover:text-primary transition-colors">
                {item.title}
              </h4>
              <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                <span>{item.source}</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                <span>{item.time}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
