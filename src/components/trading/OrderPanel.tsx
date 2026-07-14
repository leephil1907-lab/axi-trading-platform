import { useState } from "react"
import { ArrowUp, ArrowDown, Settings } from "lucide-react"
import { cn, formatNumber } from "@/lib/utils"
import type { Instrument } from "@/types"

interface OrderPanelProps {
  instrument?: Instrument
}

export default function OrderPanel({ instrument }: OrderPanelProps) {
  const [side, setSide] = useState<"buy" | "sell">("buy")
  const [volume, setVolume] = useState(1.0)
  const [stopLoss, setStopLoss] = useState("")
  const [takeProfit, setTakeProfit] = useState("")
  const [orderType, setOrderType] = useState<"market" | "limit" | "stop">("market")

  if (!instrument) {
    return (
      <div className="bg-card border border-border rounded-lg p-4 h-full flex items-center justify-center text-muted-foreground text-sm">
        Select an instrument to trade
      </div>
    )
  }

  const price = side === "buy" ? instrument.ask : instrument.bid
  const marginRequired = price * volume * 1000 * 0.01

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden h-full flex flex-col">
      <div className="p-3 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold">{instrument.symbol}</h3>
            <p className="text-[10px] text-muted-foreground">{instrument.name}</p>
          </div>
          <div className={cn("text-xs font-mono px-2 py-1 rounded", instrument.change >= 0 ? "text-green-600 bg-green-100 dark:bg-green-900/20" : "text-red-600 bg-red-100 dark:bg-red-900/20")}>
            {instrument.change >= 0 ? "+" : ""}{instrument.changePercent.toFixed(2)}%
          </div>
        </div>
      </div>

      <div className="p-3 space-y-3 flex-1 overflow-y-auto">
        <div className="flex gap-1">
          {(["market", "limit", "stop"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setOrderType(t)}
              className={cn(
                "flex-1 py-1 text-[10px] font-medium rounded capitalize transition-colors",
                orderType === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setSide("buy")}
            className={cn(
              "flex-1 py-2 rounded-lg flex items-center justify-center gap-1 text-sm font-bold transition-all",
              side === "buy" ? "bg-green-600 text-white shadow-lg shadow-green-600/20" : "bg-muted text-muted-foreground"
            )}
          >
            <ArrowUp className="w-4 h-4" /> BUY
          </button>
          <button
            onClick={() => setSide("sell")}
            className={cn(
              "flex-1 py-2 rounded-lg flex items-center justify-center gap-1 text-sm font-bold transition-all",
              side === "sell" ? "bg-red-600 text-white shadow-lg shadow-red-600/20" : "bg-muted text-muted-foreground"
            )}
          >
            <ArrowDown className="w-4 h-4" /> SELL
          </button>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-medium text-muted-foreground">Volume (lots)</label>
          <div className="flex items-center gap-2">
            <button onClick={() => setVolume(Math.max(0.01, volume - 0.01))} className="w-8 h-8 rounded bg-muted flex items-center justify-center text-lg font-bold hover:bg-muted/80">−</button>
            <input
              type="number"
              step="0.01"
              min="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value) || 0)}
              className="flex-1 h-8 px-2 text-center text-sm font-mono bg-muted rounded border border-border focus:outline-none focus:ring-1 focus:ring-ring"
            />
            <button onClick={() => setVolume(volume + 0.01)} className="w-8 h-8 rounded bg-muted flex items-center justify-center text-lg font-bold hover:bg-muted/80">+</button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-muted-foreground">Stop Loss</label>
            <input
              type="number"
              step="0.0001"
              value={stopLoss}
              onChange={(e) => setStopLoss(e.target.value)}
              placeholder="0.0000"
              className="w-full h-8 px-2 text-xs font-mono bg-muted rounded border border-border focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-medium text-muted-foreground">Take Profit</label>
            <input
              type="number"
              step="0.0001"
              value={takeProfit}
              onChange={(e) => setTakeProfit(e.target.value)}
              placeholder="0.0000"
              className="w-full h-8 px-2 text-xs font-mono bg-muted rounded border border-border focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
        </div>

        <div className="pt-2 border-t border-border space-y-1.5">
          <div className="flex justify-between text-[10px]">
            <span className="text-muted-foreground">Price</span>
            <span className="font-mono">{formatNumber(price, 5)}</span>
          </div>
          <div className="flex justify-between text-[10px]">
            <span className="text-muted-foreground">Spread</span>
            <span className="font-mono">{instrument.spread}</span>
          </div>
          <div className="flex justify-between text-[10px]">
            <span className="text-muted-foreground">Margin Required</span>
            <span className="font-mono">${formatNumber(marginRequired, 2)}</span>
          </div>
        </div>
      </div>

      <div className="p-3 border-t border-border">
        <button
          className={cn(
            "w-full py-2.5 rounded-lg text-sm font-bold text-white transition-all active:scale-[0.98]",
            side === "buy" ? "bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/20" : "bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/20"
          )}
        >
          {side === "buy" ? "Place Buy Order" : "Place Sell Order"}
        </button>
      </div>
    </div>
  )
}
