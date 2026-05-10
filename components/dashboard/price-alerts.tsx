"use client"

import { useState } from "react"
import { Bell, Mail, Phone, Plus, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface Alert {
  id: string
  metal: string
  condition: string
  price: string
  contact: string
}

export function PriceAlerts() {
  const [metal, setMetal] = useState<string>("gold24k")
  const [condition, setCondition] = useState<string>("below")
  const [targetPrice, setTargetPrice] = useState<string>("")
  const [contactMethod, setContactMethod] = useState<string>("email")
  const [contactValue, setContactValue] = useState<string>("")
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      metal: "Gold 24K",
      condition: "Below",
      price: "₹70,000",
      contact: "user@example.com",
    },
    {
      id: "2",
      metal: "Silver 1KG",
      condition: "Above",
      price: "₹90,000",
      contact: "+91 98xxx xxxxx",
    },
  ])

  const handleAddAlert = () => {
    if (!targetPrice || !contactValue) return

    const metalNames: Record<string, string> = {
      gold24k: "Gold 24K",
      gold22k: "Gold 22K",
      silver1kg: "Silver 1KG",
      silver10g: "Silver 10G",
    }

    const newAlert: Alert = {
      id: Date.now().toString(),
      metal: metalNames[metal],
      condition: condition === "below" ? "Below" : "Above",
      price: `₹${parseInt(targetPrice).toLocaleString("en-IN")}`,
      contact: contactValue,
    }

    setAlerts([...alerts, newAlert])
    setTargetPrice("")
    setContactValue("")
  }

  const handleDeleteAlert = (id: string) => {
    setAlerts(alerts.filter((alert) => alert.id !== id))
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Create Alert Card */}
      <Card className="border-border/50 bg-card/80">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Bell className="h-5 w-5 text-gold" />
            Create Price Alert
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Metal Selection */}
          <div className="space-y-2">
            <Label className="text-foreground">Metal Type</Label>
            <Select value={metal} onValueChange={setMetal}>
              <SelectTrigger className="bg-secondary/50 border-border/50 focus:border-gold/50">
                <SelectValue placeholder="Select metal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gold24k">Gold 24K (Per 10g)</SelectItem>
                <SelectItem value="gold22k">Gold 22K (Per 10g)</SelectItem>
                <SelectItem value="silver1kg">Silver (Per 1KG)</SelectItem>
                <SelectItem value="silver10g">Silver (Per 10g)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Condition */}
          <div className="space-y-2">
            <Label className="text-foreground">Alert When Price Goes</Label>
            <Select value={condition} onValueChange={setCondition}>
              <SelectTrigger className="bg-secondary/50 border-border/50 focus:border-gold/50">
                <SelectValue placeholder="Select condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="below">Below Target</SelectItem>
                <SelectItem value="above">Above Target</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Target Price */}
          <div className="space-y-2">
            <Label className="text-foreground">Target Price (₹)</Label>
            <Input
              type="number"
              value={targetPrice}
              onChange={(e) => setTargetPrice(e.target.value)}
              placeholder="e.g., 70000"
              className="bg-secondary/50 border-border/50 focus:border-gold/50"
            />
          </div>

          {/* Contact Method */}
          <div className="space-y-2">
            <Label className="text-foreground">Notify Via</Label>
            <Select value={contactMethod} onValueChange={setContactMethod}>
              <SelectTrigger className="bg-secondary/50 border-border/50 focus:border-gold/50">
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">
                  <span className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </span>
                </SelectItem>
                <SelectItem value="phone">
                  <span className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    SMS
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Contact Value */}
          <div className="space-y-2">
            <Label className="text-foreground">
              {contactMethod === "email" ? "Email Address" : "Phone Number"}
            </Label>
            <Input
              type={contactMethod === "email" ? "email" : "tel"}
              value={contactValue}
              onChange={(e) => setContactValue(e.target.value)}
              placeholder={
                contactMethod === "email"
                  ? "your@email.com"
                  : "+91 98xxx xxxxx"
              }
              className="bg-secondary/50 border-border/50 focus:border-gold/50"
            />
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleAddAlert}
            className="w-full bg-gold text-primary-foreground hover:bg-gold/90"
            disabled={!targetPrice || !contactValue}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Alert
          </Button>
        </CardContent>
      </Card>

      {/* Active Alerts Card */}
      <Card className="border-border/50 bg-card/80">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-foreground">
            <span>Your Active Alerts</span>
            <Badge variant="secondary" className="bg-gold/10 text-gold">
              {alerts.length} Active
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {alerts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Bell className="mb-3 h-12 w-12 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">
                No active alerts yet
              </p>
              <p className="text-xs text-muted-foreground">
                Create your first price alert to get started
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-center justify-between rounded-lg border border-border/30 bg-secondary/20 p-4 transition-colors hover:bg-secondary/30"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">
                        {alert.metal}
                      </span>
                      <Badge
                        variant="secondary"
                        className={`text-xs ${
                          alert.condition === "Below"
                            ? "bg-rose/10 text-rose"
                            : "bg-emerald/10 text-emerald"
                        }`}
                      >
                        {alert.condition} {alert.price}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {alert.contact}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteAlert(alert.id)}
                    className="h-8 w-8 text-muted-foreground hover:text-rose hover:bg-rose/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
