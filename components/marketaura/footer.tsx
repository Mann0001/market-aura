"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Gem, Mail, Twitter, Linkedin, Github, Send, Check, Database, Shield } from "lucide-react"

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" },
]

const dataSources = [
  { name: "MCX India", description: "Multi Commodity Exchange" },
  { name: "IBJA", description: "India Bullion & Jewellers Association" },
  { name: "IOCL", description: "Indian Oil Corporation Ltd" },
]

export function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setTimeout(() => {
        setSubscribed(false)
        setEmail("")
      }, 3000)
    }
  }

  return (
    <footer className="relative mt-16 border-t border-border/50">
      {/* Gradient divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <motion.div
              className="flex items-center gap-3 mb-4"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gold/30 blur-xl rounded-full" />
                <Gem className="relative h-8 w-8 text-gold" />
              </div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-gold via-accent to-gold bg-clip-text text-transparent">
                MarketAura
              </span>
            </motion.div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Premium real-time commodity tracking platform with Bloomberg-quality insights and Apple-level polish.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg bg-secondary/50 hover:bg-primary/20 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Data Sources */}
          <div>
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Database className="h-4 w-4 text-primary" />
              Data Sources
            </h4>
            <ul className="space-y-3">
              {dataSources.map((source) => (
                <li key={source.name} className="text-sm">
                  <span className="font-medium">{source.name}</span>
                  <span className="text-muted-foreground ml-2">- {source.description}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              Disclaimer
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Market data is provided for informational purposes only and should not be considered as financial advice. Prices are indicative and may vary. Always consult with a qualified financial advisor before making investment decisions.
            </p>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              Stay Updated
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              Get daily market insights delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-secondary/50 border-border/50 flex-1"
              />
              <Button type="submit" size="icon" disabled={subscribed}>
                {subscribed ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </form>
            {subscribed && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-emerald mt-2"
              >
                Successfully subscribed!
              </motion.p>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/30">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>2024 MarketAura. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
