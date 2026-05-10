"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useCurrency } from "@/components/currency-provider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calculator, Sparkles, Percent, Receipt } from "lucide-react"

const purityOptions = [
  { value: "24k", label: "24K (99.9%)", factor: 1 },
  { value: "22k", label: "22K (91.6%)", factor: 0.916 },
  { value: "18k", label: "18K (75%)", factor: 0.75 },
  { value: "14k", label: "14K (58.3%)", factor: 0.583 },
]

const baseGoldPrice = 7245 // per gram for 24K

export function GoldCalculator() {
  const { formatPrice, currency } = useCurrency()
  const [weight, setWeight] = useState<string>("10")
  const [purity, setPurity] = useState("24k")
  const [makingCharges, setMakingCharges] = useState([12])
  const [includeGST, setIncludeGST] = useState(true)

  const calculations = useMemo(() => {
    const weightNum = parseFloat(weight) || 0
    const purityFactor = purityOptions.find((p) => p.value === purity)?.factor || 1

    const baseValue = weightNum * baseGoldPrice * purityFactor
    const makingChargeAmount = (baseValue * makingCharges[0]) / 100
    const subtotal = baseValue + makingChargeAmount
    const gstAmount = includeGST ? subtotal * 0.03 : 0
    const total = subtotal + gstAmount

    return {
      baseValue,
      makingChargeAmount,
      gstAmount,
      total,
    }
  }, [weight, purity, makingCharges, includeGST])

  const ResultRow = ({
    label,
    value,
    icon: Icon,
    highlight = false,
  }: {
    label: string
    value: number
    icon: React.ElementType
    highlight?: boolean
  }) => (
    <motion.div
      layout
      className={`flex items-center justify-between p-4 rounded-lg ${
        highlight
          ? "bg-gradient-to-r from-gold/20 to-gold/10 border border-gold/30"
          : "bg-secondary/30"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${highlight ? "bg-gold/20" : "bg-secondary"}`}>
          <Icon className={`h-4 w-4 ${highlight ? "text-gold" : "text-muted-foreground"}`} />
        </div>
        <span className={`text-sm ${highlight ? "font-semibold" : "text-muted-foreground"}`}>
          {label}
        </span>
      </div>
      <AnimatePresence mode="wait">
        <motion.span
          key={value}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className={`font-mono font-semibold ${highlight ? "text-lg text-gold" : ""}`}
        >
          {formatPrice(value, 2)}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  )

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Inputs */}
      <div className="space-y-6">
        <div className="glass-card rounded-xl p-6 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-gold/20">
              <Calculator className="h-5 w-5 text-gold" />
            </div>
            <h3 className="text-lg font-semibold">Calculator Inputs</h3>
          </div>

          {/* Weight */}
          <div className="space-y-2">
            <Label htmlFor="weight" className="text-sm font-medium">
              Weight (grams)
            </Label>
            <Input
              id="weight"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter weight in grams"
              className="bg-secondary/50 border-border/50 text-lg font-mono"
              min="0"
              step="0.01"
            />
          </div>

          {/* Purity */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Purity</Label>
            <Select value={purity} onValueChange={setPurity}>
              <SelectTrigger className="bg-secondary/50 border-border/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass-card">
                {purityOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Making Charges */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Making Charges</Label>
              <span className="text-sm font-mono text-primary">{makingCharges[0]}%</span>
            </div>
            <Slider
              value={makingCharges}
              onValueChange={setMakingCharges}
              min={0}
              max={25}
              step={0.5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span>25%</span>
            </div>
          </div>

          {/* GST Toggle */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
            <div className="flex items-center gap-3">
              <Percent className="h-4 w-4 text-muted-foreground" />
              <div>
                <Label htmlFor="gst" className="text-sm font-medium cursor-pointer">
                  Include GST (3%)
                </Label>
                <p className="text-xs text-muted-foreground">
                  Goods and Services Tax
                </p>
              </div>
            </div>
            <Switch
              id="gst"
              checked={includeGST}
              onCheckedChange={setIncludeGST}
            />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-emerald/20">
              <Receipt className="h-5 w-5 text-emerald" />
            </div>
            <h3 className="text-lg font-semibold">Estimated Bill</h3>
          </div>

          <div className="space-y-3">
            <ResultRow
              label="Base Metal Value"
              value={calculations.baseValue}
              icon={Sparkles}
            />
            <ResultRow
              label={`Making Charges (${makingCharges[0]}%)`}
              value={calculations.makingChargeAmount}
              icon={Calculator}
            />
            {includeGST && (
              <ResultRow
                label="GST (3%)"
                value={calculations.gstAmount}
                icon={Percent}
              />
            )}
            <div className="border-t border-border/50 pt-3 mt-4">
              <ResultRow
                label="Total Estimated Bill"
                value={calculations.total}
                icon={Receipt}
                highlight
              />
            </div>
          </div>
        </div>

        {/* Info card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-4 rounded-lg bg-electric/10 border border-electric/30"
        >
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-electric">Note:</span> This is an estimated calculation
            based on current market rates. Actual prices may vary based on jeweler, location, and
            market conditions.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
