import { useState, useMemo } from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { CandlestickChart, BarChart3, LineChart, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Instrument } from "@/types"

interface ChartPanelProps {
  instrument?: Instrument
}

function generateChartData(basePrice: number, points = 100) {
  const data = []
  let price = basePrice
  const now = new Date()
  for (let i = points; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60000)
    const change = (Math.random() - 0.48) * basePrice * 0.002
    price += change
    data.push({
      time: time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      fullTime: time,
      open: price - Math.random() * basePrice * 0.001,
      high: price + Math.random() * basePrice * 0.001,
      low: price - Math.random() * basePrice * 0.001,
      close: price,
      volume: Math.floor(Math.random() * 1000) + 100,
    })
  }
  return data
}

export default function ChartPanel({ instrument }: ChartPanelProps) {
  const [chartType, setChartType] = useState<"area" | "candle" | "bar">("area")
  const [timeframe, setTimeframe] = useState("1H")

  const data = useMemo(() => {
    return generateChartData(instrument?.bid || 1.0845)
  }, [instrument?.symbol])

  const isUp = data.length > 1 && data[data.length - 1].close >= data[0].close
  const color = isUp ? "#22c55e" : "#ef4444"
  const colorLight = isUp ? "#dcfce7" : "#fee2e2"

  if (!instrument) {
    return (
      <div className="bg-card border border-border rounded-lg h-full flex items-center justify-center text-muted-foreground text-sm">
        Select an instrument to view chart
      </div>
    )
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden h-full flex flex-col">
      <div className="p-3 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold">{instrument.symbol}</h3>
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
            <span>{instrument.name}</span>
            <span className={cn("px-1 rounded", isUp ? "bg-green-100 text-green-700 dark:bg-green-900/30" : "bg-red-100 text-red-700 dark:bg-red-900/30")}>
              {isUp ? "+" : ""}{((data[data.length - 1].close - data[0].close) / data[0].close * 100).toFixed(2)}%
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {(["1M", "5M", "15M", "1H", "4H", "1D", "1W"] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={cn(
                "px-1.5 py-0.5 text-[10px] rounded transition-colors",
                timeframe === tf ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
              )}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      <div className="px-3 py-1 border-b border-border flex items-center gap-1">
        <button onClick={() => setChartType("area")} className={cn("p-1 rounded", chartType === "area" ? "bg-muted" : "hover:bg-muted/50")}>
          <LineChart className="w-3.5 h-3.5" />
        </button>
        <button onClick={() => setChartType("candle")} className={cn("p-1 rounded", chartType === "candle" ? "bg-muted" : "hover:bg-muted/50")}>
          <CandlestickChart className="w-3.5 h-3.5" />
        </button>
        <button onClick={() => setChartType("bar")} className={cn("p-1 rounded", chartType === "bar" ? "bg-muted" : "hover:bg-muted/50")}>
          <BarChart3 className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex-1 min-h-0 p-2">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "bar" ? (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis domain={["auto", "auto"]} tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" width={50} />
              <Tooltip
                contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 6, fontSize: 11 }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Bar dataKey="volume" fill={color} opacity={0.6} />
            </BarChart>
          ) : (
            <AreaChart data={data}>
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis domain={["auto", "auto"]} tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" width={50} />
              <Tooltip
                contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 6, fontSize: 11 }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
                formatter={(value: number) => [value.toFixed(5), "Price"]}
              />
              <Area type="monotone" dataKey="close" stroke={color} fill="url(#chartGradient)" strokeWidth={1.5} />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  )
}
