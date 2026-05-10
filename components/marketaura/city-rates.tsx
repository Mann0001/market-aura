"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { useCurrency } from "@/components/currency-provider"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ArrowUpDown, MapPin } from "lucide-react"

const cityData = [
  { city: "Mumbai", gold24k: 72450, gold22k: 66412, silver: 87200, petrol: 104.21, diesel: 90.76 },
  { city: "Delhi", gold24k: 72580, gold22k: 66530, silver: 87350, petrol: 96.72, diesel: 89.62 },
  { city: "Chennai", gold24k: 72320, gold22k: 66293, silver: 87100, petrol: 102.63, diesel: 94.24 },
  { city: "Kolkata", gold24k: 72490, gold22k: 66449, silver: 87250, petrol: 104.95, diesel: 91.76 },
  { city: "Bangalore", gold24k: 72380, gold22k: 66348, silver: 87150, petrol: 101.94, diesel: 87.89 },
  { city: "Hyderabad", gold24k: 72420, gold22k: 66385, silver: 87180, petrol: 109.66, diesel: 97.82 },
  { city: "Lucknow", gold24k: 72540, gold22k: 66495, silver: 87300, petrol: 96.57, diesel: 89.76 },
]

type SortKey = "city" | "gold24k" | "gold22k" | "silver" | "petrol" | "diesel"
type SortDirection = "asc" | "desc"

export function CityRates() {
  const { formatPrice } = useCurrency()
  const [search, setSearch] = useState("")
  const [sortKey, setSortKey] = useState<SortKey>("city")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")

  const filteredAndSortedData = useMemo(() => {
    return cityData
      .filter((row) => row.city.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        const aValue = a[sortKey]
        const bValue = b[sortKey]
        const direction = sortDirection === "asc" ? 1 : -1

        if (typeof aValue === "string" && typeof bValue === "string") {
          return aValue.localeCompare(bValue) * direction
        }
        return ((aValue as number) - (bValue as number)) * direction
      })
  }, [search, sortKey, sortDirection])

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortKey(key)
      setSortDirection("asc")
    }
  }

  const columns: { key: SortKey; label: string }[] = [
    { key: "city", label: "City" },
    { key: "gold24k", label: "Gold 24K" },
    { key: "gold22k", label: "Gold 22K" },
    { key: "silver", label: "Silver/kg" },
    { key: "petrol", label: "Petrol/L" },
    { key: "diesel", label: "Diesel/L" },
  ]

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search cities..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 bg-secondary/50 border-border/50"
        />
      </div>

      {/* Table */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                {columns.map((column) => (
                  <th key={column.key} className="sticky top-0 bg-secondary/80 backdrop-blur-sm">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort(column.key)}
                      className="w-full justify-start gap-2 font-semibold text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground px-4 py-3"
                    >
                      {column.key === "city" && <MapPin className="h-3.5 w-3.5" />}
                      {column.label}
                      {sortKey === column.key && (
                        <ArrowUpDown className="h-3 w-3 text-primary" />
                      )}
                    </Button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedData.map((row, index) => (
                <motion.tr
                  key={row.city}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-border/30 hover:bg-secondary/30 transition-colors group"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="font-medium">{row.city}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 font-mono text-gold">
                    {formatPrice(row.gold24k, 0)}
                  </td>
                  <td className="px-4 py-4 font-mono text-gold-muted">
                    {formatPrice(row.gold22k, 0)}
                  </td>
                  <td className="px-4 py-4 font-mono text-silver">
                    {formatPrice(row.silver, 0)}
                  </td>
                  <td className="px-4 py-4 font-mono text-emerald">
                    {formatPrice(row.petrol, 2)}
                  </td>
                  <td className="px-4 py-4 font-mono text-electric">
                    {formatPrice(row.diesel, 2)}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
