"use client"

import { TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface RateCardProps {
  title: string
  subtitle: string
  price: number
  change: number
  changePercent: number
  type: "gold" | "silver"
}

export function RateCard({
  title,
  subtitle,
  price,
  change,
  changePercent,
  type,
}: RateCardProps) {
  const isPositive = change >= 0
  const accentColor = type === "gold" ? "gold" : "silver"

  return (
    <Card className="relative overflow-hidden border-border/50 bg-card/80 backdrop-blur transition-all duration-300 hover:border-border hover:bg-card">
      {/* Subtle accent gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br opacity-5 ${
          type === "gold"
            ? "from-gold via-transparent to-transparent"
            : "from-silver via-transparent to-transparent"
        }`}
      />

      <CardHeader className="relative pb-2">
        <div className="flex items-start justify-between">
          <div>
            <h3
              className={`text-lg font-semibold ${
                type === "gold" ? "text-gold" : "text-silver"
              }`}
            >
              {title}
            </h3>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full ${
              type === "gold" ? "bg-gold/10" : "bg-silver/10"
            }`}
          >
            {type === "gold" ? (
              <svg
                className={`h-5 w-5 ${
                  type === "gold" ? "text-gold" : "text-silver"
                }`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" />
              </svg>
            ) : (
              <svg
                className="h-5 w-5 text-silver"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <rect x="4" y="4" width="16" height="16" rx="2" />
              </svg>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative space-y-4">
        {/* Price */}
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            ₹{price.toLocaleString("en-IN")}
          </span>
        </div>

        {/* Change Badge */}
        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className={`flex items-center gap-1 px-2 py-1 ${
              isPositive
                ? "bg-emerald/10 text-emerald hover:bg-emerald/20"
                : "bg-rose/10 text-rose hover:bg-rose/20"
            }`}
          >
            {isPositive ? (
              <TrendingUp className="h-3.5 w-3.5" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5" />
            )}
            <span className="font-semibold">
              {isPositive ? "+" : ""}₹{Math.abs(change).toLocaleString("en-IN")} (
              {isPositive ? "+" : ""}
              {changePercent.toFixed(2)}%)
            </span>
          </Badge>
        </div>

        {/* Mini Sparkline Placeholder */}
        <div className="relative h-12 w-full overflow-hidden rounded-md bg-secondary/50">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="h-full w-full"
              viewBox="0 0 200 48"
              preserveAspectRatio="none"
            >
              <path
                d={
                  isPositive
                    ? "M0,40 L20,35 L40,38 L60,30 L80,32 L100,25 L120,28 L140,20 L160,22 L180,15 L200,10"
                    : "M0,10 L20,15 L40,12 L60,20 L80,18 L100,25 L120,22 L140,30 L160,28 L180,35 L200,40"
                }
                fill="none"
                stroke={isPositive ? "oklch(0.65 0.18 155)" : "oklch(0.55 0.22 20)"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d={
                  isPositive
                    ? "M0,40 L20,35 L40,38 L60,30 L80,32 L100,25 L120,28 L140,20 L160,22 L180,15 L200,10 L200,48 L0,48 Z"
                    : "M0,10 L20,15 L40,12 L60,20 L80,18 L100,25 L120,22 L140,30 L160,28 L180,35 L200,40 L200,48 L0,48 Z"
                }
                fill={
                  isPositive
                    ? "url(#emerald-gradient)"
                    : "url(#rose-gradient)"
                }
              />
              <defs>
                <linearGradient
                  id="emerald-gradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="oklch(0.65 0.18 155)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="oklch(0.65 0.18 155)" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="rose-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.55 0.22 20)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="oklch(0.55 0.22 20)" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="absolute bottom-1 right-2 text-xs text-muted-foreground">
            24h
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
