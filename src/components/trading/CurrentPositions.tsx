import { useState } from "react"
import { TrendingUp, TrendingDown, X, AlertTriangle, Target } from "lucide-react"
import { mockPositions } from "@/lib/data"
import { usePrices } from "@/hooks/usePrices"
import { cn, formatCurrency, formatNumber } from "@/lib/utils"
import type { Position } from "@/types"

export default function CurrentPositions() {
  const [positions, setPositions] = useState<Position[]>(mockPositions)
  const { getPrice } = usePrices(2000)

  const updatedPositions = positions.map((pos) => {
    const live = getPrice(pos.symbol)
    if (!live) return pos
    const currentPrice = pos.type === "buy" ? live.bid : live.ask
    const pipValue = pos.symbol.includes("JPY") ? 0.01 : 0.0001
    const pips = pos.type === "buy"
      ? (currentPrice - pos.entryPrice) / pipValue
      : (pos.entryPrice - currentPrice) / pipValue
    const pnl = pips * pos.volume * 10
    const pnlPercent = (pnl / (pos.entryPrice * pos.volume * 100)) * 100
    return { ...pos, currentPrice, pnl, pnlPercent }
  })

  const totalPnL = updatedPositions.reduce((sum, p) => sum + p.pnl, 0)

  const closePosition = (id: string) => {
    setPositions((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-3 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold">Open Positions</h3>
          <p className="text-[10px] text-muted-foreground">{updatedPositions.length} active trades</p>
        </div>
        <div className={cn("text-sm font-bold font-mono", totalPnL >= 0 ? "text-green-600" : "text-red-600")}>
          {totalPnL >= 0 ? "+" : ""}{formatCurrency(totalPnL)}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-[11px]">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-3 py-2 font-medium text-muted-foreground">Symbol</th>
              <th className="text-center px-2 py-2 font-medium text-muted-foreground">Type</th>
              <th className="text-right px-2 py-2 font-medium text-muted-foreground">Volume</th>
              <th className="text-right px-2 py-2 font-medium text-muted-foreground">Entry</th>
              <th className="text-right px-2 py-2 font-medium text-muted-foreground">Current</th>
              <th className="text-right px-2 py-2 font-medium text-muted-foreground">SL / TP</th>
              <th className="text-right px-3 py-2 font-medium text-muted-foreground">PnL</th>
              <th className="px-2 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {updatedPositions.map((pos) => (
              <tr key={pos.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                <td className="px-3 py-2">
                  <div className="font-semibold">{pos.symbol}</div>
                  <div className="text-[9px] text-muted-foreground">{pos.name}</div>
                </td>
                <td className="px-2 py-2 text-center">
                  <span className={cn(
                    "px-1.5 py-0.5 rounded text-[10px] font-medium",
                    pos.type === "buy" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  )}>
                    {pos.type.toUpperCase()}
                  </span>
                </td>
                <td className="text-right px-2 py-2 font-mono">{formatNumber(pos.volume, 2)}</td>
                <td className="text-right px-2 py-2 font-mono">{formatNumber(pos.entryPrice, 5)}</td>
                <td className="text-right px-2 py-2 font-mono">{formatNumber(pos.currentPrice, 5)}</td>
                <td className="px-2 py-2">
                  <div className="flex flex-col items-end gap-0.5">
                    <div className="flex items-center gap-0.5 text-red-500">
                      <AlertTriangle className="w-2.5 h-2.5" />
                      <span className="font-mono">{pos.stopLoss ? formatNumber(pos.stopLoss, 5) : "—"}</span>
                    </div>
                    <div className="flex items-center gap-0.5 text-green-500">
                      <Target className="w-2.5 h-2.5" />
                      <span className="font-mono">{pos.takeProfit ? formatNumber(pos.takeProfit, 5) : "—"}</span>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-2">
                  <div className={cn("flex flex-col items-end", pos.pnl >= 0 ? "text-green-600" : "text-red-600")}>
                    <div className="flex items-center gap-0.5 font-bold font-mono">
                      {pos.pnl >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {pos.pnl >= 0 ? "+" : ""}{formatCurrency(pos.pnl)}
                    </div>
                    <span className="text-[9px]">{pos.pnlPercent >= 0 ? "+" : ""}{pos.pnlPercent.toFixed(2)}%</span>
                  </div>
                </td>
                <td className="px-2 py-2">
                  <button
                    onClick={() => closePosition(pos.id)}
                    className="p-1 hover:bg-destructive/10 rounded text-muted-foreground hover:text-destructive transition-colors"
                    title="Close position"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
