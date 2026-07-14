import { useState, useMemo } from "react"
import { Search, TrendingUp, TrendingDown, Star } from "lucide-react"
import { usePrices } from "@/hooks/usePrices"
import { cn, formatNumber } from "@/lib/utils"
import type { Instrument } from "@/types"

interface MarketWatchProps {
  onSelect?: (instrument: Instrument) => void
  selectedSymbol?: string
}

export default function MarketWatch({ onSelect, selectedSymbol }: MarketWatchProps) {
  const { prices, flashMap } = usePrices(1500)
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState<string>("all")
  const [watchlist, setWatchlist] = useState<Set<string>>(new Set(["EURUSD", "BTCUSD", "XAUUSD", "US30"]))

  const categories = [
    { key: "all", label: "All" },
    { key: "forex", label: "Forex" },
    { key: "crypto", label: "Crypto" },
    { key: "commodity", label: "Commodities" },
    { key: "index", label: "Indices" },
    { key: "stock", label: "Stocks" },
  ]

  const filtered = useMemo(() => {
    return prices.filter((inst) => {
      const matchSearch = inst.symbol.toLowerCase().includes(search.toLowerCase()) ||
                          inst.name.toLowerCase().includes(search.toLowerCase())
      const matchCat = category === "all" || inst.category === category
      return matchSearch && matchCat
    })
  }, [prices, search, category])

  const toggleWatchlist = (symbol: string) => {
    setWatchlist((prev) => {
      const next = new Set(prev)
      if (next.has(symbol)) next.delete(symbol)
      else next.add(symbol)
      return next
    })
  }

  return (
    <div className="flex flex-col h-full bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-3 border-b border-border">
        <h3 className="text-sm font-semibold mb-2">Market Watch</h3>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search instruments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-2 py-1.5 text-xs bg-muted rounded-md border border-border focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
      </div>

      <div className="flex gap-1 px-3 py-2 border-b border-border overflow-x-auto scrollbar-thin">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setCategory(cat.key)}
            className={cn(
              "px-2 py-0.5 text-[10px] rounded-full whitespace-nowrap transition-colors",
              category === cat.key
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <table className="w-full text-[11px]">
          <thead className="bg-muted/50 sticky top-0">
            <tr>
              <th className="text-left px-3 py-1.5 font-medium text-muted-foreground">Symbol</th>
              <th className="text-right px-2 py-1.5 font-medium text-muted-foreground">Bid</th>
              <th className="text-right px-2 py-1.5 font-medium text-muted-foreground">Ask</th>
              <th className="text-right px-3 py-1.5 font-medium text-muted-foreground">Change</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((inst) => {
              const isUp = inst.change >= 0
              const isSelected = selectedSymbol === inst.symbol
              const flash = flashMap[inst.symbol]
              const isWatched = watchlist.has(inst.symbol)

              return (
                <tr
                  key={inst.symbol}
                  onClick={() => onSelect?.(inst)}
                  className={cn(
                    "cursor-pointer transition-colors",
                    isSelected ? "bg-primary/10" : "hover:bg-muted/50",
                    flash === "up" && "animate-price-up",
                    flash === "down" && "animate-price-down"
                  )}
                >
                  <td className="px-3 py-1.5">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleWatchlist(inst.symbol) }}
                        className={cn("transition-colors", isWatched ? "text-yellow-500" : "text-muted-foreground hover:text-yellow-500")}
                      >
                        <Star className="w-3 h-3" fill={isWatched ? "currentColor" : "none"} />
                      </button>
                      <div>
                        <div className="font-semibold">{inst.symbol}</div>
                        <div className="text-[9px] text-muted-foreground truncate max-w-[80px]">{inst.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className={cn("text-right px-2 py-1.5 font-mono tabular-nums", flash === "up" ? "text-green-600" : flash === "down" ? "text-red-600" : "")}>
                    {formatNumber(inst.bid, inst.category === "crypto" || inst.category === "index" ? 2 : inst.bid < 10 ? 4 : 2)}
                  </td>
                  <td className="text-right px-2 py-1.5 font-mono tabular-nums text-muted-foreground">
                    {formatNumber(inst.ask, inst.category === "crypto" || inst.category === "index" ? 2 : inst.ask < 10 ? 4 : 2)}
                  </td>
                  <td className="px-3 py-1.5">
                    <div className={cn("flex items-center justify-end gap-0.5", isUp ? "text-green-600" : "text-red-600")}>
                      {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      <span className="font-mono">{isUp ? "+" : ""}{inst.changePercent.toFixed(2)}%</span>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
