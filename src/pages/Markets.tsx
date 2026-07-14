import { useState } from "react"
import { Link } from "react-router-dom"
import { Search, TrendingUp, TrendingDown } from "lucide-react"
import { instruments } from "@/lib/data"
import { cn, formatNumber } from "@/lib/utils"

export default function Markets() {
  const [search, setSearch] = useState("")
  const [cat, setCat] = useState("all")

  const cats = [
    { key: "all", label: "All" },
    { key: "forex", label: "Forex" },
    { key: "crypto", label: "Crypto" },
    { key: "commodity", label: "Commodities" },
    { key: "index", label: "Indices" },
    { key: "stock", label: "Stocks" },
  ]

  const filtered = instruments.filter((i) => {
    const match = i.symbol.toLowerCase().includes(search.toLowerCase()) || i.name.toLowerCase().includes(search.toLowerCase())
    return match && (cat === "all" || i.category === cat)
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Markets</h1>
      <p className="text-muted-foreground mb-6">Trade 650+ instruments across forex, crypto, commodities, indices and shares.</p>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search markets..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {cats.map((c) => (
            <button key={c.key} onClick={() => setCat(c.key)} className={cn("px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap", cat === c.key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((inst) => (
          <Link key={inst.symbol} to="/trading" className="p-4 rounded-lg border border-border bg-card hover:border-red-600/50 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="font-semibold">{inst.symbol}</div>
                <div className="text-xs text-muted-foreground">{inst.name}</div>
              </div>
              <div className={cn("flex items-center gap-1 text-sm font-mono", inst.change >= 0 ? "text-green-600" : "text-red-600")}>
                {inst.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {inst.change >= 0 ? "+" : ""}{inst.changePercent.toFixed(2)}%
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm font-mono">
              <div className="bg-muted rounded p-2"><span className="text-muted-foreground text-xs">Bid</span><br/>{formatNumber(inst.bid, 5)}</div>
              <div className="bg-muted rounded p-2"><span className="text-muted-foreground text-xs">Ask</span><br/>{formatNumber(inst.ask, 5)}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
