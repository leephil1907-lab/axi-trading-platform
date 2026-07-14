import { useState } from "react"
import { Link } from "react-router-dom"
import { TrendingUp, Users, Shield, Star, ArrowRight, Filter, Search, BarChart3, Target, Clock, Award } from "lucide-react"
import { copyTraders } from "@/lib/data"
import { cn, formatNumber } from "@/lib/utils"

export default function CopyTrading() {
  const [sort, setSort] = useState("return30d")
  const [search, setSearch] = useState("")
  const [riskFilter, setRiskFilter] = useState("all")

  const sorted = [...copyTraders].sort((a, b) => (b as any)[sort] - (a as any)[sort]).filter((t) => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase())
    const matchRisk = riskFilter === "all" || (riskFilter === "low" && t.riskScore <= 3.5) || (riskFilter === "medium" && t.riskScore > 3.5 && t.riskScore <= 4.5) || (riskFilter === "high" && t.riskScore > 4.5)
    return matchSearch && matchRisk
  })

  const stats = [
    { icon: Users, value: "60,000+", label: "Active Copiers" },
    { icon: TrendingUp, value: "$2.4M", label: "Monthly Profits" },
    { icon: Shield, value: "100%", label: "Transparent" },
    { icon: Award, value: "4.8/5", label: "User Rating" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-3">Copy Trading</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">Automatically copy the trades of experienced signal providers. Set your risk tolerance and let the experts trade for you. Available on iOS and Android.</p>
        <div className="flex justify-center gap-3 mt-6">
          <Link to="/register" className="px-6 py-2 bg-red-600 text-white rounded-md font-medium hover:bg-red-700">Start Copying</Link>
          <Link to="/register" className="px-6 py-2 border border-border rounded-md font-medium hover:bg-muted">Learn More</Link>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {stats.map((s) => (
          <div key={s.label} className="text-center p-6 bg-card border border-border rounded-lg">
            <s.icon className="w-8 h-8 mx-auto text-red-600 mb-3" />
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-3">
        <h2 className="text-lg font-semibold">Top Traders</h2>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search traders..." className="h-9 pl-8 pr-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <select value={riskFilter} onChange={(e) => setRiskFilter(e.target.value)} className="h-9 px-3 rounded-md border border-input bg-background text-sm">
            <option value="all">All Risk</option>
            <option value="low">Low Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="high">High Risk</option>
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="h-9 px-3 rounded-md border border-input bg-background text-sm">
            <option value="return30d">30D Return</option>
            <option value="returnAll">All Time</option>
            <option value="followers">Followers</option>
            <option value="winRate">Win Rate</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sorted.map((trader) => (
          <div key={trader.id} className="bg-card border border-border rounded-lg p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 font-bold">{trader.avatar}</div>
                <div>
                  <div className="font-semibold">{trader.name}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1"><Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> {trader.riskScore} Risk Score</div>
                </div>
              </div>
              <div className={cn("px-2 py-1 rounded-full text-xs font-bold", trader.return30d > 20 ? "bg-green-100 text-green-700" : trader.return30d > 10 ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700")}>+{trader.return30d}%</div>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center p-2 bg-muted rounded-lg"><div className="text-lg font-bold text-green-600">+{trader.returnAll}%</div><div className="text-[10px] text-muted-foreground">All Time</div></div>
              <div className="text-center p-2 bg-muted rounded-lg"><div className="text-lg font-bold">{trader.followers}</div><div className="text-[10px] text-muted-foreground">Followers</div></div>
              <div className="text-center p-2 bg-muted rounded-lg"><div className="text-lg font-bold">{trader.winRate}%</div><div className="text-[10px] text-muted-foreground">Win Rate</div></div>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
              <span className="flex items-center gap-1"><BarChart3 className="w-3 h-3" /> {trader.trades} trades</span>
              <span className="flex items-center gap-1"><Target className="w-3 h-3" /> {trader.riskScore}/5 risk</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 30D active</span>
            </div>
            <button className="w-full py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-1">
              Copy Trader <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
