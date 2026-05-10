"use client"

import { useState, useMemo } from "react"
import { Calculator, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"

const purityRates: Record<string, number> = {
  "24K": 72450,
  "22K": 66410,
  "18K": 54337,
}

const GST_RATE = 0.03 // 3%

export function GoldCalculator() {
  const [weight, setWeight] = useState<string>("10")
  const [purity, setPurity] = useState<string>("24K")
  const [makingCharges, setMakingCharges] = useState<number[]>([8])

  const calculations = useMemo(() => {
    const weightNum = parseFloat(weight) || 0
    const ratePerGram = purityRates[purity] / 10 // Rate is per 10 grams
    
    const metalValue = weightNum * ratePerGram
    const gstAmount = metalValue * GST_RATE
    const makingChargeAmount = metalValue * (makingCharges[0] / 100)
    const makingChargeGst = makingChargeAmount * GST_RATE
    const totalAmount = metalValue + gstAmount + makingChargeAmount + makingChargeGst

    return {
      metalValue,
      gstAmount,
      makingChargeAmount,
      makingChargeGst,
      totalAmount,
    }
  }, [weight, purity, makingCharges])

  const formatPrice = (price: number) => {
    return price.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    })
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Input Card */}
      <Card className="border-border/50 bg-card/80">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Calculator className="h-5 w-5 text-gold" />
            Gold Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Weight Input */}
          <div className="space-y-2">
            <Label htmlFor="weight" className="text-foreground">
              Weight (in grams)
            </Label>
            <Input
              id="weight"
              type="number"
              min="0"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter weight"
              className="bg-secondary/50 border-border/50 focus:border-gold/50"
            />
          </div>

          {/* Purity Select */}
          <div className="space-y-2">
            <Label className="text-foreground">Purity</Label>
            <Select value={purity} onValueChange={setPurity}>
              <SelectTrigger className="bg-secondary/50 border-border/50 focus:border-gold/50">
                <SelectValue placeholder="Select purity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24K">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-gold"></span>
                    24K (99.9% Pure)
                  </span>
                </SelectItem>
                <SelectItem value="22K">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-gold-muted"></span>
                    22K (91.6% Pure)
                  </span>
                </SelectItem>
                <SelectItem value="18K">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-gold-muted/70"></span>
                    18K (75% Pure)
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Making Charges Slider */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-foreground">Making Charges</Label>
              <span className="text-sm font-semibold text-gold">
                {makingCharges[0]}%
              </span>
            </div>
            <Slider
              value={makingCharges}
              onValueChange={setMakingCharges}
              min={0}
              max={25}
              step={0.5}
              className="[&_[role=slider]]:bg-gold [&_[role=slider]]:border-gold [&_.bg-primary]:bg-gold"
            />
            <p className="text-xs text-muted-foreground">
              Typical range: 5% - 15% depending on design complexity
            </p>
          </div>

          {/* Current Rate Info */}
          <div className="flex items-start gap-2 rounded-lg bg-secondary/30 p-3">
            <Info className="mt-0.5 h-4 w-4 text-muted-foreground" />
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{purity} Rate:</span>{" "}
              ₹{purityRates[purity].toLocaleString("en-IN")} per 10 grams
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Result Card */}
      <Card className="border-gold/20 bg-card/80">
        <CardHeader>
          <CardTitle className="text-foreground">Estimated Final Bill</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Breakdown */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Metal Value</span>
              <span className="font-medium text-foreground">
                ₹{formatPrice(calculations.metalValue)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">GST (3%)</span>
              <span className="font-medium text-foreground">
                ₹{formatPrice(calculations.gstAmount)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Making Charges ({makingCharges[0]}%)
              </span>
              <span className="font-medium text-foreground">
                ₹{formatPrice(calculations.makingChargeAmount)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">GST on Making</span>
              <span className="font-medium text-foreground">
                ₹{formatPrice(calculations.makingChargeGst)}
              </span>
            </div>
          </div>

          <Separator className="bg-border/50" />

          {/* Total */}
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-foreground">
              Total Amount
            </span>
            <span className="text-2xl font-bold text-gold">
              ₹{formatPrice(calculations.totalAmount)}
            </span>
          </div>

          {/* Summary Box */}
          <div className="mt-4 rounded-lg bg-gold/5 border border-gold/20 p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                For{" "}
                <span className="font-semibold text-foreground">
                  {weight || 0}g
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gold">{purity} Gold</span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Including 3% GST and {makingCharges[0]}% making charges
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
