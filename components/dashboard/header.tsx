"use client"

import { useState, useEffect } from "react"

export function Header() {
  const [currentTime, setCurrentTime] = useState<Date>(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Branding */}
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold/10">
            <svg
              className="h-5 w-5 text-gold"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight">
            <span className="text-gold">Swarna</span>
            <span className="text-foreground">Live</span>
          </span>
        </div>

        {/* Live Market Status */}
        <div className="hidden items-center gap-6 md:flex">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-pulse-live rounded-full bg-emerald opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald"></span>
            </span>
            <span className="text-sm font-medium text-emerald">LIVE MARKET</span>
          </div>

          <div className="h-4 w-px bg-border"></div>

          <div className="text-sm text-muted-foreground">
            <span className="text-foreground/70">Last updated: </span>
            <span className="font-mono text-foreground">
              {formatDate(currentTime)}, {formatTime(currentTime)} IST
            </span>
          </div>
        </div>

        {/* Currency Toggle */}
        <div className="flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1.5">
          <span className="text-base">🇮🇳</span>
          <span className="text-sm font-medium text-foreground">INR (₹)</span>
        </div>
      </div>

      {/* Mobile Live Status */}
      <div className="flex items-center justify-center gap-4 border-t border-border/40 py-2 md:hidden">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-pulse-live rounded-full bg-emerald opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald"></span>
          </span>
          <span className="text-xs font-medium text-emerald">LIVE</span>
        </div>
        <span className="text-xs text-muted-foreground font-mono">
          {formatTime(currentTime)} IST
        </span>
      </div>
    </header>
  )
}
