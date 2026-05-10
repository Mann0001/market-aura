"use client"

import { TrendingUp, TrendingDown } from "lucide-react"

interface TickerItem {
  name: string
  change: number
  changePercent: number
}

const tickerData: TickerItem[] = [
  { name: "MCX Gold Futures", change: 450, changePercent: 0.65 },
  { name: "MCX Silver Futures", change: -280, changePercent: -0.32 },
  { name: "Gold 24K", change: 520, changePercent: 0.72 },
  { name: "Gold 22K", change: 480, changePercent: 0.71 },
  { name: "Silver 1KG", change: -150, changePercent: -0.18 },
  { name: "MCX Gold Futures", change: 450, changePercent: 0.65 },
  { name: "MCX Silver Futures", change: -280, changePercent: -0.32 },
  { name: "Gold 24K", change: 520, changePercent: 0.72 },
  { name: "Gold 22K", change: 480, changePercent: 0.71 },
  { name: "Silver 1KG", change: -150, changePercent: -0.18 },
]

function TickerItemComponent({ item }: { item: TickerItem }) {
  const isPositive = item.change >= 0

  return (
    <div className="flex items-center gap-3 px-6">
      <span className="text-sm font-medium text-foreground/80 whitespace-nowrap">
        {item.name}
      </span>
      <div
        className={`flex items-center gap-1 ${
          isPositive ? "text-emerald" : "text-rose"
        }`}
      >
        {isPositive ? (
          <TrendingUp className="h-3.5 w-3.5" />
        ) : (
          <TrendingDown className="h-3.5 w-3.5" />
        )}
        <span className="text-sm font-semibold whitespace-nowrap">
          {isPositive ? "+" : ""}₹{Math.abs(item.change).toLocaleString("en-IN")} (
          {isPositive ? "+" : ""}
          {item.changePercent.toFixed(2)}%)
        </span>
      </div>
    </div>
  )
}

export function TickerRibbon() {
  return (
    <div className="relative w-full overflow-hidden border-b border-border/40 bg-secondary/30 py-2.5">
      <div className="flex animate-marquee">
        {tickerData.map((item, index) => (
          <TickerItemComponent key={index} item={item} />
        ))}
        {tickerData.map((item, index) => (
          <TickerItemComponent key={`duplicate-${index}`} item={item} />
        ))}
      </div>
    </div>
  )
}
