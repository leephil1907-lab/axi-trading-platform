import { useEffect, useRef } from "react"

const symbols = [
  "OANDA:EURUSD", "OANDA:GBPUSD", "OANDA:USDJPY", "OANDA:XAUUSD", "OANDA:USOIL",
  "FOREXCOM:SPXUSD", "FOREXCOM:NAS100", "FOREXCOM:DJI", "COINBASE:BTCUSD", "COINBASE:ETHUSD",
  "NASDAQ:AAPL", "NASDAQ:NVDA", "NASDAQ:TSLA", "NASDAQ:MSFT", "NASDAQ:AMZN",
]

export default function LiveMarketTicker() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!ref.current) return
    ref.current.innerHTML = ""
    const script = document.createElement("script")
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js"
    script.async = true
    script.innerHTML = JSON.stringify({ symbols: symbols.map((symbol) => ({ proName: symbol, title: symbol.split(":")[1] })), showSymbolLogo: true, colorTheme: document.documentElement.classList.contains("dark") ? "dark" : "light", isTransparent: true, displayMode: "adaptive", locale: "en" })
    ref.current.appendChild(script)
  }, [])
  return <div className="overflow-hidden border-y border-border bg-background/90" aria-label="Live market prices"><div ref={ref} className="tradingview-widget-container h-[46px]" /></div>
}
