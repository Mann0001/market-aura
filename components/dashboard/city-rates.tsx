"use client"

import { useState, useMemo } from "react"
import { Search, TrendingUp, TrendingDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface CityRate {
  city: string
  gold24k: number
  gold24kChange: number
  gold22k: number
  gold22kChange: number
  silver: number
  silverChange: number
}

const cityRatesData: CityRate[] = [
  {
    city: "Mumbai",
    gold24k: 72450,
    gold24kChange: 520,
    gold22k: 66410,
    gold22kChange: 480,
    silver: 84200,
    silverChange: -150,
  },
  {
    city: "Delhi",
    gold24k: 72500,
    gold24kChange: 530,
    gold22k: 66460,
    gold22kChange: 490,
    silver: 84250,
    silverChange: -140,
  },
  {
    city: "Chennai",
    gold24k: 72550,
    gold24kChange: 510,
    gold22k: 66510,
    gold22kChange: 470,
    silver: 84300,
    silverChange: -160,
  },
  {
    city: "Kolkata",
    gold24k: 72480,
    gold24kChange: 540,
    gold22k: 66440,
    gold22kChange: 500,
    silver: 84220,
    silverChange: -145,
  },
  {
    city: "Bangalore",
    gold24k: 72520,
    gold24kChange: 515,
    gold22k: 66480,
    gold22kChange: 475,
    silver: 84280,
    silverChange: -155,
  },
  {
    city: "Hyderabad",
    gold24k: 72490,
    gold24kChange: 525,
    gold22k: 66450,
    gold22kChange: 485,
    silver: 84240,
    silverChange: -148,
  },
  {
    city: "Ahmedabad",
    gold24k: 72470,
    gold24kChange: 518,
    gold22k: 66430,
    gold22kChange: 478,
    silver: 84210,
    silverChange: -152,
  },
  {
    city: "Pune",
    gold24k: 72460,
    gold24kChange: 522,
    gold22k: 66420,
    gold22kChange: 482,
    silver: 84190,
    silverChange: -147,
  },
  {
    city: "Jaipur",
    gold24k: 72510,
    gold24kChange: 528,
    gold22k: 66470,
    gold22kChange: 488,
    silver: 84260,
    silverChange: -143,
  },
  {
    city: "Lucknow",
    gold24k: 72495,
    gold24kChange: 516,
    gold22k: 66455,
    gold22kChange: 476,
    silver: 84230,
    silverChange: -151,
  },
]

function PriceCell({
  price,
  change,
}: {
  price: number
  change: number
}) {
  const isPositive = change >= 0

  return (
    <div className="flex flex-col gap-1">
      <span className="font-semibold text-foreground">
        ₹{price.toLocaleString("en-IN")}
      </span>
      <Badge
        variant="secondary"
        className={`w-fit text-xs ${
          isPositive
            ? "bg-emerald/10 text-emerald"
            : "bg-rose/10 text-rose"
        }`}
      >
        {isPositive ? (
          <TrendingUp className="mr-1 h-3 w-3" />
        ) : (
          <TrendingDown className="mr-1 h-3 w-3" />
        )}
        {isPositive ? "+" : ""}₹{Math.abs(change)}
      </Badge>
    </div>
  )
}

export function CityRates() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCities = useMemo(() => {
    if (!searchQuery.trim()) return cityRatesData
    return cityRatesData.filter((city) =>
      city.city.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            City-Wise Gold & Silver Rates
          </h3>
          <p className="text-sm text-muted-foreground">
            Prices vary slightly across major Indian cities
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-secondary/50 border-border/50 focus:border-gold/50"
          />
        </div>
      </div>

      <div className="rounded-lg border border-border/50 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/30 hover:bg-secondary/30">
              <TableHead className="font-semibold text-foreground">City</TableHead>
              <TableHead className="font-semibold text-gold">Gold 24K</TableHead>
              <TableHead className="font-semibold text-gold-muted">Gold 22K</TableHead>
              <TableHead className="font-semibold text-silver">Silver (1KG)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCities.map((city) => (
              <TableRow
                key={city.city}
                className="border-border/30 transition-colors hover:bg-secondary/20"
              >
                <TableCell className="font-medium text-foreground">
                  {city.city}
                </TableCell>
                <TableCell>
                  <PriceCell price={city.gold24k} change={city.gold24kChange} />
                </TableCell>
                <TableCell>
                  <PriceCell price={city.gold22k} change={city.gold22kChange} />
                </TableCell>
                <TableCell>
                  <PriceCell price={city.silver} change={city.silverChange} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredCities.length === 0 && (
        <div className="py-8 text-center text-muted-foreground">
          No cities found matching &quot;{searchQuery}&quot;
        </div>
      )}
    </div>
  )
}
