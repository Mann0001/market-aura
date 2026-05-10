"use client"

import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CityRates } from "./city-rates"
import { GoldCalculator } from "./gold-calculator"
import { PriceAlerts } from "./price-alerts"
import { MarketInsights } from "./market-insights"
import { MapPin, Calculator, Bell, TrendingUp } from "lucide-react"

const tabs = [
  { id: "city-rates", label: "City Rates", icon: MapPin },
  { id: "calculator", label: "Calculator", icon: Calculator },
  { id: "alerts", label: "Price Alerts", icon: Bell },
  { id: "insights", label: "Market Insights", icon: TrendingUp },
]

export function FeatureTabs() {
  return (
    <section className="py-8">
      <Tabs defaultValue="city-rates" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="glass-card p-1.5 h-auto flex-wrap justify-center gap-1">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="gap-2 px-4 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300"
              >
                <tab.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <TabsContent value="city-rates" className="mt-0">
            <CityRates />
          </TabsContent>
          <TabsContent value="calculator" className="mt-0">
            <GoldCalculator />
          </TabsContent>
          <TabsContent value="alerts" className="mt-0">
            <PriceAlerts />
          </TabsContent>
          <TabsContent value="insights" className="mt-0">
            <MarketInsights />
          </TabsContent>
        </motion.div>
      </Tabs>
    </section>
  )
}
