import { useEffect, useRef } from "react"
import { useTheme } from "@/lib/ThemeContext"

const symbols = [
  // Forex
  ["OANDA:EURUSD", "EUR/USD"],
  ["OANDA:GBPUSD", "GBP/USD"],
  ["OANDA:USDJPY", "USD/JPY"],
  ["OANDA:AUDUSD", "AUD/USD"],
  ["OANDA:USDCAD", "USD/CAD"],
  ["OANDA:USDCHF", "USD/CHF"],
  ["OANDA:NZDUSD", "NZD/USD"],
  ["OANDA:EURGBP", "EUR/GBP"],
  // Crypto
  ["COINBASE:BTCUSD", "BTC/USD"],
  ["COINBASE:ETHUSD", "ETH/USD"],
  ["COINBASE:XRPUSD", "XRP/USD"],
  ["COINBASE:SOLUSD", "SOL/USD"],
  ["COINBASE:LTCUSD", "LTC/USD"],
  // Commodities
  ["OANDA:XAUUSD", "Gold"],
  ["OANDA:XAGUSD", "Silver"],
  ["OANDA:WTICOUSD", "US Oil"],
  ["OANDA:BCOUSD", "Brent Oil"],
  ["OANDA:NATGASUSD", "Natural Gas"],
  // Indices
  ["FOREXCOM:DJI", "US30"],
  ["FOREXCOM:SPXUSD", "SPX500"],
  ["FOREXCOM:NAS100", "NAS100"],
  ["FOREXCOM:GER40", "GER40"],
  ["FOREXCOM:UK100", "UK100"],
  // Shares
  ["NASDAQ:AAPL", "AAPL"],
  ["NASDAQ:TSLA", "TSLA"],
  ["NASDAQ:MSFT", "MSFT"],
  ["NASDAQ:AMZN", "AMZN"],
  ["NASDAQ:GOOGL", "GOOGL"],
  ["NASDAQ:META", "META"],
  ["NASDAQ:NVDA", "NVDA"],
] as const

export default function LiveMarketTicker() {
  const ref = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (!ref.current) return
    ref.current.innerHTML = ""

    const script = document.createElement("script")
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js"
    script.async = true
    script.innerHTML = JSON.stringify({
      symbols: symbols.map(([proName, title]) => ({ proName, title })),
      showSymbolLogo: true,
      colorTheme: theme === "dark" ? "dark" : "light",
      isTransparent: true,
      displayMode: "adaptive",
      locale: "en",
    })
    ref.current.appendChild(script)
  }, [theme])

  return (
    <div className="overflow-hidden border-y border-border bg-background/90" aria-label="Live market prices">
      <div ref={ref} className="tradingview-widget-container h-[46px]" />
    </div>
  )
}
