"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { useCurrency, Currency, currencyConfig } from "@/components/currency-provider"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Gem, Sun, Moon, ChevronDown, Menu, TrendingUp } from "lucide-react"

export function Header() {
  const [mounted, setMounted] = useState(false)
  const [currentTime, setCurrentTime] = useState("")
  const { theme, setTheme } = useTheme()
  const { currency, setCurrency } = useCurrency()

  useEffect(() => {
    setMounted(true)
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      )
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  const currencies: Currency[] = ["INR", "USD", "EUR", "GBP", "AED", "JPY"]

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 glass border-b border-border/50"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gold/30 blur-xl rounded-full" />
              <Gem className="relative h-8 w-8 text-gold" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-gold via-accent to-gold bg-clip-text text-transparent">
              MarketAura
            </span>
          </motion.div>

          {/* Center - Live indicator & timestamp */}
          <div className="hidden md:flex items-center gap-6">
            <motion.div 
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald/10 border border-emerald/30"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald" />
              </span>
              <span className="text-sm font-medium text-emerald">LIVE MARKET</span>
            </motion.div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              <span className="font-mono">{currentTime}</span>
            </div>
          </div>

          {/* Right - Controls */}
          <div className="flex items-center gap-2">
            {/* Currency Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 hover-glow">
                  <span className="text-lg">{currencyConfig[currency].flag}</span>
                  <span className="font-medium">{currency}</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="glass-card">
                {currencies.map((curr) => (
                  <DropdownMenuItem
                    key={curr}
                    onClick={() => setCurrency(curr)}
                    className={`gap-3 cursor-pointer ${currency === curr ? "bg-primary/10 text-primary" : ""}`}
                  >
                    <span className="text-lg">{currencyConfig[curr].flag}</span>
                    <span className="font-medium">{curr}</span>
                    <span className="text-muted-foreground ml-auto">{currencyConfig[curr].symbol}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="hover-glow"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={theme}
                    initial={{ y: -20, opacity: 0, rotate: -90 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: 20, opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === "dark" ? (
                      <Sun className="h-5 w-5 text-gold" />
                    ) : (
                      <Moon className="h-5 w-5 text-electric" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </Button>
            </motion.div>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="glass-card">
                <div className="flex flex-col gap-6 mt-8">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald/10 border border-emerald/30">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald" />
                    </span>
                    <span className="text-sm font-medium text-emerald">LIVE MARKET</span>
                  </div>
                  <div className="text-sm text-muted-foreground font-mono">
                    {currentTime}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
