"use client"

import { RateCard } from "./rate-card"

const ratesData = [
  {
    title: "Gold 24K",
    subtitle: "Per 10 Grams",
    price: 72450,
    change: 520,
    changePercent: 0.72,
    type: "gold" as const,
  },
  {
    title: "Gold 22K",
    subtitle: "Per 10 Grams",
    price: 66410,
    change: 480,
    changePercent: 0.73,
    type: "gold" as const,
  },
  {
    title: "Silver",
    subtitle: "Per 1 Kilogram",
    price: 84200,
    change: -150,
    changePercent: -0.18,
    type: "silver" as const,
  },
  {
    title: "Silver",
    subtitle: "Per 10 Grams",
    price: 842,
    change: -2,
    changePercent: -0.24,
    type: "silver" as const,
  },
]

export function RateGrid() {
  return (
    <section className="w-full py-6">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground">Live Rates</h2>
          <p className="text-sm text-muted-foreground">
            Real-time precious metal prices updated every second
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ratesData.map((rate, index) => (
            <RateCard key={index} {...rate} />
          ))}
        </div>
      </div>
    </section>
  )
}
