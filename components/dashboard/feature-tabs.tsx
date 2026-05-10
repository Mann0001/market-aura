"use client"

import { MapPin, Calculator, Bell } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CityRates } from "./city-rates"
import { GoldCalculator } from "./gold-calculator"
import { PriceAlerts } from "./price-alerts"

export function FeatureTabs() {
  return (
    <section className="w-full py-6">
      <div className="container mx-auto px-4 md:px-6">
        <Tabs defaultValue="city-rates" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-secondary/50 p-1 h-auto">
            <TabsTrigger
              value="city-rates"
              className="flex items-center gap-2 py-3 data-[state=active]:bg-card data-[state=active]:text-gold"
            >
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">City-Wise Rates</span>
              <span className="sm:hidden">Cities</span>
            </TabsTrigger>
            <TabsTrigger
              value="calculator"
              className="flex items-center gap-2 py-3 data-[state=active]:bg-card data-[state=active]:text-gold"
            >
              <Calculator className="h-4 w-4" />
              <span className="hidden sm:inline">Live Gold Calculator</span>
              <span className="sm:hidden">Calculator</span>
            </TabsTrigger>
            <TabsTrigger
              value="alerts"
              className="flex items-center gap-2 py-3 data-[state=active]:bg-card data-[state=active]:text-gold"
            >
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Price Alerts</span>
              <span className="sm:hidden">Alerts</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="city-rates" className="mt-6">
            <CityRates />
          </TabsContent>

          <TabsContent value="calculator" className="mt-6">
            <GoldCalculator />
          </TabsContent>

          <TabsContent value="alerts" className="mt-6">
            <PriceAlerts />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
