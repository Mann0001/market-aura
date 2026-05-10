"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { CurrencyProvider } from "@/components/currency-provider"
import { BackgroundEffects } from "@/components/marketaura/background-effects"
import { Header } from "@/components/marketaura/header"
import { TickerRibbon } from "@/components/marketaura/ticker-ribbon"
import { MetricsGrid } from "@/components/marketaura/metrics-grid"
import { FeatureTabs } from "@/components/marketaura/feature-tabs"
import { Footer } from "@/components/marketaura/footer"

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <CurrencyProvider defaultCurrency="INR">
        <div className="relative min-h-screen">
          <BackgroundEffects />
          
          <div className="relative z-10">
            <Header />
            <TickerRibbon />
            
            <main className="container mx-auto px-4">
              <MetricsGrid />
              <FeatureTabs />
            </main>
            
            <Footer />
          </div>
        </div>
      </CurrencyProvider>
    </ThemeProvider>
  )
}
