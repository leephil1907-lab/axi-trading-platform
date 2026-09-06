import { useEffect, useMemo, useState } from "react"
import { Loader2 } from "lucide-react"
import type { Instrument } from "@/types"

const tradingViewSymbols: Record<string, string> = {
  EURUSD: "OANDA:EURUSD",
  GBPUSD: "OANDA:GBPUSD",
  USDJPY: "OANDA:USDJPY",
  AUDUSD: "OANDA:AUDUSD",
  USDCAD: "OANDA:USDCAD",
  USDCHF: "OANDA:USDCHF",
  NZDUSD: "OANDA:NZDUSD",
  EURGBP: "OANDA:EURGBP",
  BTCUSD: "COINBASE:BTCUSD",
  ETHUSD: "COINBASE:ETHUSD",
  XRPUSD: "CRYPTO:XRPUSD",
  SOLUSD: "COINBASE:SOLUSD",
  LTCUSD: "COINBASE:LTCUSD",
  XAUUSD: "OANDA:XAUUSD",
  XAGUSD: "OANDA:XAGUSD",
  US30: "FOREXCOM:DJI",
  SPX500: "FOREXCOM:SPXUSD",
  NAS100: "FOREXCOM:NAS100",
  AAPL: "NASDAQ:AAPL",
  TSLA: "NASDAQ:TSLA",
  MSFT: "NASDAQ:MSFT",
  AMZN: "NASDAQ:AMZN",
  GOOGL: "NASDAQ:GOOGL",
  META: "NASDAQ:META",
  NVDA: "NASDAQ:NVDA",
}

export default function TradingViewChart({ instrument }: { instrument?: Instrument }) {
  const [loaded, setLoaded] = useState(false)
  const symbol = useMemo(() => tradingViewSymbols[instrument?.symbol || "EURUSD"] || `OANDA:${instrument?.symbol || "EURUSD"}`, [instrument?.symbol])
  const src = useMemo(() => {
    const params = new URLSearchParams({
      symbol,
      interval: "60",
      theme: document.documentElement.classList.contains("dark") ? "dark" : "light",
      style: "1",
      locale: "en",
      toolbar_bg: "transparent",
      enable_publishing: "0",
      hide_top_toolbar: "0",
      hide_legend: "0",
      save_image: "0",
      hideideas: "1",
      studies: "[]",
    })
    return `https://www.tradingview.com/widgetembed/?${params.toString()}`
  }, [symbol])

  useEffect(() => setLoaded(false), [src])

  return (
    <div className="relative h-full min-h-[360px] overflow-hidden rounded-xl border border-border bg-card">
      {!loaded && <div className="absolute inset-0 z-10 grid place-items-center bg-card"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>}
      <iframe
        key={src}
        title={`TradingView ${instrument?.symbol || "market"} chart`}
        src={src}
        className="h-full min-h-[360px] w-full border-0"
        allow="fullscreen"
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}
