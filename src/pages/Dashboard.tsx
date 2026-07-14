import { useState } from "react"
import { Link } from "react-router-dom"
import { Wallet, TrendingUp, BarChart3, ArrowUpRight, ArrowDownRight, Copy, Settings, Clock, Target, Shield, Bell, CreditCard, Banknote, Bitcoin, Globe, Users, Award } from "lucide-react"
import { useAuth } from "@/lib/AuthContext"
import { mockPositions, copyTraders } from "@/lib/data"
import { usePrices } from "@/hooks/usePrices"
import { cn, formatCurrency, formatNumber } from "@/lib/utils"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

function generateEquityData() {
  const data = []
  let equity = 12000
  for (let i = 30; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    equity += (Math.random() - 0.4) * 500
    data.push({ date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }), equity: Math.round(equity * 100) / 100 })
  }
  return data
}

export default function Dashboard() {
  const { user } = useAuth()
  const { getPrice } = usePrices(2000)
  const [timeRange, setTimeRange] = useState("1M")
  const equityData = generateEquityData()

  const balance = 12543.80
  const equity = 12890.50
  const margin = 2500.00
  const freeMargin = 10390.50
  const marginLevel = 515.6

  const livePositions = mockPositions.map((pos) => {
    const live = getPrice(pos.symbol)
    if (!live) return pos
    const currentPrice = pos.type === "buy" ? live.bid : live.ask
    const pipValue = pos.symbol.includes("JPY") ? 0.01 : 0.0001
    const pips = pos.type === "buy" ? (currentPrice - pos.entryPrice) / pipValue : (pos.entryPrice - currentPrice) / pipValue
    const pnl = pips * pos.volume * 10
    return { ...pos, currentPrice, pnl }
  })

  const totalPnL = livePositions.reduce((s, p) => s + p.pnl, 0)
  const winCount = livePositions.filter((p) => p.pnl > 0).length
  const winRate = livePositions.length > 0 ? Math.round((winCount / livePositions.length) * 100) : 0

  const stats = [
    { label: "Balance", value: formatCurrency(balance), icon: Wallet, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
    { label: "Equity", value: formatCurrency(equity), icon: BarChart3, color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-900/20" },
    { label: "Free Margin", value: formatCurrency(freeMargin), icon: ArrowUpRight, color: "text-green-600", bg: "bg-green-50 dark:bg-green-900/20" },
    { label: "Margin Level", value: marginLevel.toFixed(1) + "%", icon: Shield, color: "text-orange-600", bg: "bg-orange-50 dark:bg-orange-900/20" },
  ]

  const quickActions = [
    { icon: CreditCard, label: "Deposit", href: "/deposit", color: "text-green-600", bg: "bg-green-50 dark:bg-green-900/20" },
    { icon: Banknote, label: "Withdraw", href: "/withdraw", color: "text-red-600", bg: "bg-red-50 dark:bg-red-900/20" },
    { icon: TrendingUp, label: "Trade", href: "/trading", color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
    { icon: Copy, label: "Copy", href: "/copy-trading", color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-900/20" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {user?.name || "Trader"}</h1>
          <p className="text-sm text-muted-foreground">Here's your trading overview</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg border border-border hover:bg-muted transition-colors"><Bell className="w-4 h-4" /></button>
          <Link to="/settings" className="p-2 rounded-lg border border-border hover:bg-muted transition-colors"><Settings className="w-4 h-4" /></Link>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (
          <div key={s.label} className={cn("p-4 rounded-lg border border-border", s.bg)}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">{s.label}</span>
              <s.icon className={cn("w-4 h-4", s.color)} />
            </div>
            <div className="text-xl font-bold font-mono">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Equity Curve</h2>
            <div className="flex gap-1">
              {["1W", "1M", "3M", "1Y", "All"].map((r) => (
                <button key={r} onClick={() => setTimeRange(r)} className={cn("px-2 py-0.5 text-[10px] rounded-full", timeRange === r ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>{r}</button>
              ))}
            </div>
          </div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={equityData}>
                <defs><linearGradient id="equityGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/><stop offset="95%" stopColor="#22c55e" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" width={60} domain={["auto", "auto"]} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 6, fontSize: 11 }} />
                <Area type="monotone" dataKey="equity" stroke="#22c55e" fill="url(#equityGrad)" strokeWidth={1.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((a) => (
                <Link key={a.label} to={a.href} className={cn("flex flex-col items-center gap-1 p-3 rounded-lg transition-colors", a.bg, "hover:opacity-80")}>
                  <a.icon className={cn("w-5 h-5", a.color)} />
                  <span className="text-xs font-medium">{a.label}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Performance</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-2 bg-muted rounded-lg">
                <div className={cn("text-lg font-bold", totalPnL >= 0 ? "text-green-600" : "text-red-600")}>{totalPnL >= 0 ? "+" : ""}{formatCurrency(totalPnL)}</div>
                <div className="text-[10px] text-muted-foreground">Unrealized P&L</div>
              </div>
              <div className="text-center p-2 bg-muted rounded-lg">
                <div className="text-lg font-bold text-blue-600">{winRate}%</div>
                <div className="text-[10px] text-muted-foreground">Win Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Open Positions</h2>
            <span className="text-xs text-muted-foreground">{livePositions.length} active</span>
          </div>
          <div className="space-y-2">
            {livePositions.map((pos) => (
              <div key={pos.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                <div className="flex items-center gap-3">
                  <div className={cn("w-2 h-8 rounded-full", pos.type === "buy" ? "bg-green-500" : "bg-red-500")} />
                  <div>
                    <div className="font-semibold text-sm">{pos.symbol}</div>
                    <div className="text-[10px] text-muted-foreground">{pos.volume} lots @ {pos.entryPrice}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={cn("font-bold font-mono text-sm", pos.pnl >= 0 ? "text-green-600" : "text-red-600")}>
                    {pos.pnl >= 0 ? "+" : ""}{formatCurrency(pos.pnl)}
                  </div>
                  <div className="text-[10px] text-muted-foreground font-mono">{pos.currentPrice.toFixed(5)}</div>
                </div>
              </div>
            ))}
          </div>
          <Link to="/trading" className="mt-3 block text-center py-2 text-sm text-red-600 font-medium hover:underline">View All Positions</Link>
        </div>

        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold mb-3">Top Copy Traders</h3>
            <div className="space-y-3">
              {copyTraders.slice(0, 3).map((trader) => (
                <div key={trader.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 font-bold text-xs">{trader.avatar}</div>
                    <div>
                      <div className="text-sm font-medium">{trader.name}</div>
                      <div className="text-[10px] text-muted-foreground">{trader.followers} followers</div>
                    </div>
                  </div>
                  <div className="text-green-600 font-bold text-sm">+{trader.return30d}%</div>
                </div>
              ))}
            </div>
            <Link to="/copy-trading" className="mt-3 block text-center py-2 text-sm text-red-600 font-medium hover:underline">Explore Copy Trading</Link>
          </div>

          <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-lg p-4 text-white">
            <h3 className="font-semibold mb-1">Axi Select</h3>
            <p className="text-xs text-white/80 mb-3">Get funded up to $1M. Prove your skills and earn up to 90% profit share.</p>
            <Link to="/register" className="inline-block px-4 py-1.5 bg-white text-red-600 rounded-md text-xs font-bold hover:bg-white/90">Join Now</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
