"use client"

import * as React from "react"

export type Currency = "INR" | "USD" | "EUR" | "GBP" | "AED" | "JPY"

export const currencyConfig: Record<Currency, { symbol: string; flag: string; rate: number }> = {
  INR: { symbol: "₹", flag: "🇮🇳", rate: 1 },
  USD: { symbol: "$", flag: "🇺🇸", rate: 0.012 },
  EUR: { symbol: "€", flag: "🇪🇺", rate: 0.011 },
  GBP: { symbol: "£", flag: "🇬🇧", rate: 0.0095 },
  AED: { symbol: "د.إ", flag: "🇦🇪", rate: 0.044 },
  JPY: { symbol: "¥", flag: "🇯🇵", rate: 1.82 },
}

type CurrencyProviderProps = {
  children: React.ReactNode
  defaultCurrency?: Currency
}

type CurrencyProviderState = {
  currency: Currency
  setCurrency: (currency: Currency) => void
  convertPrice: (priceInINR: number) => number
  formatPrice: (priceInINR: number, decimals?: number) => string
  currencySymbol: string
}

const CurrencyProviderContext = React.createContext<CurrencyProviderState | undefined>(undefined)

export function CurrencyProvider({
  children,
  defaultCurrency = "INR",
}: CurrencyProviderProps) {
  const [currency, setCurrency] = React.useState<Currency>(defaultCurrency)

  const convertPrice = React.useCallback((priceInINR: number) => {
    return priceInINR * currencyConfig[currency].rate
  }, [currency])

  const formatPrice = React.useCallback((priceInINR: number, decimals = 2) => {
    const converted = convertPrice(priceInINR)
    const symbol = currencyConfig[currency].symbol
    
    if (currency === "JPY") {
      return `${symbol}${Math.round(converted).toLocaleString()}`
    }
    
    return `${symbol}${converted.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}`
  }, [currency, convertPrice])

  const value = {
    currency,
    setCurrency,
    convertPrice,
    formatPrice,
    currencySymbol: currencyConfig[currency].symbol,
  }

  return (
    <CurrencyProviderContext.Provider value={value}>
      {children}
    </CurrencyProviderContext.Provider>
  )
}

export const useCurrency = () => {
  const context = React.useContext(CurrencyProviderContext)

  if (context === undefined)
    throw new Error("useCurrency must be used within a CurrencyProvider")

  return context
}
