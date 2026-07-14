import { useState } from "react"
import { TrendingUp, TrendingDown, Clock, DollarSign, Percent } from "lucide-react"
import { mockPositions } from "@/lib/data"
import { usePrices } from "@/hooks/usePrices"
import { cn, formatCurrency, formatNumber } from "@/lib/utils"

export default function PositionTracker() {
  const [positions] = useState(mockPositions)
  const { getPrice } = usePrices(2000)

  const updated = positions.map((pos) => {
    const live = getPrice(pos.symbol)
    if (!live) return pos
    const currentPrice = pos.type === "buy" ? live.bid : live.ask
    const pipValue = pos.symbol.includes("JPY") ? 0.01 : 0.0001
    const pips = pos.type === "buy" ? (currentPrice - pos.entryPrice) / pipValue : (pos.entryPrice - currentPrice) / pipValue
    const pnl = pips * pos.volume * 10
    return { ...pos, currentPrice, pnl }
  })

  const totalPnL = updated.reduce((s, p) => s + p.pnl, 0)
  const totalVolume = updated.reduce((s, p) => s + p.volume, 0)

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-muted-foreground" />
          Position Tracker
        </h3>
        <span className="text-[10px] text-muted-foreground">{updated.length} open</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="text-[10px] text-muted-foreground mb-1 flex items-center gap-1">
            <DollarSign className="w-3 h-3" /> Total P&L
          </div>
          <div className={cn("text-lg font-bold font-mono", totalPnL >= 0 ? "text-green-600" : "text-red-600")}>
            {totalPnL >= 0 ? "+" : ""}{formatCurrency(totalPnL)}
          </div>
        </div>
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="text-[10px] text-muted-foreground mb-1 flex items-center gap-1">
            <Percent className="w-3 h-3" /> Win Rate
          </div>
          <div className="text-lg font-bold font-mono text-foreground">
            {updated.length > 0 ? Math.round((updated.filter((p) => p.pnl > 0).length / updated.length) * 100) : 0}%
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {updated.slice(0, 3).map((pos) => (
          <div key={pos.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
            <div className="flex items-center gap-2">
              <div className={cn("w-1 h-8 rounded-full", pos.type === "buy" ? "bg-green-500" : "bg-red-500")} />
              <div>
                <div className="text-xs font-semibold">{pos.symbol}</div>
                <div className="text-[10px] text-muted-foreground">{pos.volume.toFixed(2)} lots</div>
              </div>
            </div>
            <div className={cn("text-right", pos.pnl >= 0 ? "text-green-600" : "text-red-600")}>
              <div className="text-xs font-bold font-mono">{pos.pnl >= 0 ? "+" : ""}{formatCurrency(pos.pnl)}</div>
              <div className="text-[9px]">{formatNumber(pos.currentPrice, 5)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
