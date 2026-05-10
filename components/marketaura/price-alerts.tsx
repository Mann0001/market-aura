"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useCurrency } from "@/components/currency-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Bell, Mail, Smartphone, Trash2, Plus, Check, Coins, Fuel, DollarSign } from "lucide-react"

interface Alert {
  id: string
  commodity: string
  targetPrice: number
  email: string
  phone: string
  emailNotify: boolean
  smsNotify: boolean
}

const commodities = [
  { value: "gold24k", label: "Gold 24K", icon: Coins, currentPrice: 72450 },
  { value: "gold22k", label: "Gold 22K", icon: Coins, currentPrice: 66412 },
  { value: "silver", label: "Silver", icon: Coins, currentPrice: 87200 },
  { value: "petrol", label: "Petrol", icon: Fuel, currentPrice: 104.21 },
  { value: "diesel", label: "Diesel", icon: Fuel, currentPrice: 90.76 },
  { value: "usdinr", label: "USD/INR", icon: DollarSign, currentPrice: 83.42 },
]

export function PriceAlerts() {
  const { formatPrice } = useCurrency()
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [commodity, setCommodity] = useState("")
  const [targetPrice, setTargetPrice] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [emailNotify, setEmailNotify] = useState(true)
  const [smsNotify, setSmsNotify] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!commodity || !targetPrice) return

    const newAlert: Alert = {
      id: Date.now().toString(),
      commodity,
      targetPrice: parseFloat(targetPrice),
      email,
      phone,
      emailNotify,
      smsNotify,
    }

    setAlerts([...alerts, newAlert])
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)

    // Reset form
    setCommodity("")
    setTargetPrice("")
    setEmail("")
    setPhone("")
  }

  const deleteAlert = (id: string) => {
    setAlerts(alerts.filter((a) => a.id !== id))
  }

  const selectedCommodity = commodities.find((c) => c.value === commodity)

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Form */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/20">
            <Bell className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Create Price Alert</h3>
            <p className="text-sm text-muted-foreground">Get notified when prices hit your target</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Commodity */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Commodity</Label>
            <Select value={commodity} onValueChange={setCommodity}>
              <SelectTrigger className="bg-secondary/50 border-border/50">
                <SelectValue placeholder="Select commodity" />
              </SelectTrigger>
              <SelectContent className="glass-card">
                {commodities.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    <div className="flex items-center gap-2">
                      <item.icon className="h-4 w-4 text-muted-foreground" />
                      <span>{item.label}</span>
                      <span className="text-xs text-muted-foreground ml-auto">
                        {formatPrice(item.currentPrice, item.currentPrice < 1000 ? 2 : 0)}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Target Price */}
          <div className="space-y-2">
            <Label htmlFor="targetPrice" className="text-sm font-medium">
              Target Price
            </Label>
            <div className="relative">
              <Input
                id="targetPrice"
                type="number"
                value={targetPrice}
                onChange={(e) => setTargetPrice(e.target.value)}
                placeholder={selectedCommodity ? `Current: ${formatPrice(selectedCommodity.currentPrice, 0)}` : "Enter target price"}
                className="bg-secondary/50 border-border/50 font-mono"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                <Mail className="h-3.5 w-3.5" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="bg-secondary/50 border-border/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
                <Smartphone className="h-3.5 w-3.5" />
                Phone
              </Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 XXXXX XXXXX"
                className="bg-secondary/50 border-border/50"
              />
            </div>
          </div>

          {/* Notification Toggles */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 flex-1 min-w-[150px]">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="emailNotify" className="text-sm flex-1 cursor-pointer">
                Email Alerts
              </Label>
              <Switch id="emailNotify" checked={emailNotify} onCheckedChange={setEmailNotify} />
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 flex-1 min-w-[150px]">
              <Smartphone className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="smsNotify" className="text-sm flex-1 cursor-pointer">
                SMS Alerts
              </Label>
              <Switch id="smsNotify" checked={smsNotify} onCheckedChange={setSmsNotify} />
            </div>
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full gap-2" disabled={!commodity || !targetPrice}>
            <Plus className="h-4 w-4" />
            Create Alert
          </Button>
        </form>

        {/* Success Message */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 p-3 rounded-lg bg-emerald/15 border border-emerald/30 flex items-center gap-2"
            >
              <Check className="h-4 w-4 text-emerald" />
              <span className="text-sm text-emerald">Alert created successfully!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Active Alerts */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Active Alerts</h3>
          <span className="text-sm text-muted-foreground">{alerts.length} alerts</span>
        </div>

        {alerts.length === 0 ? (
          <div className="glass-card rounded-xl p-8 text-center">
            <Bell className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">No active alerts</p>
            <p className="text-sm text-muted-foreground/70 mt-1">
              Create your first price alert to get started
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {alerts.map((alert) => {
                const commodityInfo = commodities.find((c) => c.value === alert.commodity)
                return (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="glass-card rounded-xl p-4 flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-primary/15">
                        {commodityInfo && <commodityInfo.icon className="h-5 w-5 text-primary" />}
                      </div>
                      <div>
                        <p className="font-medium">{commodityInfo?.label}</p>
                        <p className="text-sm text-muted-foreground">
                          Target: <span className="font-mono text-primary">{formatPrice(alert.targetPrice, 0)}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5">
                        {alert.emailNotify && (
                          <div className="p-1.5 rounded bg-secondary">
                            <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                          </div>
                        )}
                        {alert.smsNotify && (
                          <div className="p-1.5 rounded bg-secondary">
                            <Smartphone className="h-3.5 w-3.5 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteAlert(alert.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-rose hover:text-rose hover:bg-rose/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  )
}
