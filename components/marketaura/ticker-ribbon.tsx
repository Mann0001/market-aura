"use client"

import { motion } from "framer-motion"
import { useCurrency } from "@/components/currency-provider"
import { TrendingUp, TrendingDown, Fuel, DollarSign, Coins } from "lucide-react"

const tickerData = [
  { name: "MCX Gold", price: 72450, change: 0.85, icon: Coins },
  { name: "MCX Silver", price: 87200, change: -0.42, icon: Coins },
  { name: "Brent Crude", price: 6890, change: 1.23, icon: Fuel },
  { name: "Petrol India", price: 104.21, change: 0.15, icon: Fuel },
  { name: "Diesel India", price: 90.76, change: -0.08, icon: Fuel },
  { name: "USD/INR", price: 83.42, change: 0.12, icon: DollarSign },
]

export function TickerRibbon() {
  const { formatPrice } = useCurrency()

  const items = [...tickerData, ...tickerData]

  return (
    <div className="relative overflow-hidden bg-secondary/50 border-y border-border/50">
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10" />
      
      <div className="flex animate-marquee py-3">
        {items.map((item, index) => (
          <motion.div
            key={`${item.name}-${index}`}
            className="flex items-center gap-4 px-8 border-r border-border/30 shrink-0"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-2">
              <item.icon className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium text-sm whitespace-nowrap">{item.name}</span>
            </div>
            
            <span className="font-mono font-semibold text-sm">
              {item.name === "USD/INR" ? `₹${item.price.toFixed(2)}` : formatPrice(item.price, 2)}
            </span>
            
            <div className={`flex items-center gap-1 text-sm font-medium ${
              item.change >= 0 ? "text-emerald" : "text-rose"
            }`}>
              {item.change >= 0 ? (
                <TrendingUp className="h-3.5 w-3.5" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5" />
              )}
              <span>{item.change >= 0 ? "+" : ""}{item.change.toFixed(2)}%</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
