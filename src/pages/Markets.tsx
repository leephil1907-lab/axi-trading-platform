import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, Search, Star, Clock3, BarChart3 } from "lucide-react"
import { instruments } from "@/lib/data"
import { cn } from "@/lib/utils"
import TradingViewChart from "@/components/trading/TradingViewChart"

const sessions: Record<string, string> = {
  forex: "24 hours, Monday–Friday",
  crypto: "24/7",
  commodity: "Varies by instrument",
  index: "Exchange hours",
  stock: "Exchange hours",
}

export default function Markets() {
  const [search, setSearch] = useState("")
  const [cat, setCat] = useState("all")
  const [selected, setSelected] = useState(instruments[0])
  const [watchlist, setWatchlist] = useState<Set<string>>(new Set())
  const cats = [
    { key: "all", label: "All" },
    { key: "forex", label: "Forex" },
    { key: "crypto", label: "Crypto" },
    { key: "commodity", label: "Commodities" },
    { key: "index", label: "Indices" },
    { key: "stock", label: "Shares" },
  ]
  const filtered = useMemo(
    () => instruments.filter((item) =>
      (item.symbol.toLowerCase().includes(search.toLowerCase()) || item.name.toLowerCase().includes(search.toLowerCase())) &&
      (cat === "all" || item.category === cat)
    ),
    [search, cat],
  )

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-7">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">Markets</p>
          <h1 className="mt-2 text-3xl font-bold">Explore global markets</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Browse the available asset universe, inspect live TradingView prices and open an instrument directly in the trading workspace.</p>
        </div>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search markets…" className="h-11 w-full rounded-lg border border-input bg-background pl-10 pr-4 outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {cats.map((item) => <button key={item.key} onClick={() => setCat(item.key)} className={cn("rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap", cat === item.key ? "bg-[#d71920] text-white" : "bg-muted text-muted-foreground hover:bg-muted/80")}>{item.label}</button>)}
          </div>
        </div>
        <div className="grid gap-5 lg:grid-cols-[1fr_420px]">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((item) => (
              <button key={item.symbol} onClick={() => setSelected(item)} className={cn("group rounded-2xl border bg-card p-5 text-left transition hover:-translate-y-0.5 hover:border-red-600/50 hover:shadow-md", selected.symbol === item.symbol ? "border-red-600/60 ring-1 ring-red-600/20" : "border-border")}>
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-muted text-xs font-black">{item.symbol.slice(0, 2)}</div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold">{item.symbol}</span>
                      <span onClick={(e) => { e.stopPropagation(); setWatchlist((s) => { const n = new Set(s); n.has(item.symbol) ? n.delete(item.symbol) : n.add(item.symbol); return n }) }} className={watchlist.has(item.symbol) ? "text-yellow-500" : "text-muted-foreground"}>
                        <Star className="h-4 w-4" fill={watchlist.has(item.symbol) ? "currentColor" : "none"} />
                      </span>
                    </div>
                    <p className="mt-1 truncate text-xs text-muted-foreground">{item.name}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs">
                  <span className="capitalize text-muted-foreground">{item.category}</span>
                  <span className="inline-flex items-center gap-1 text-muted-foreground"><Clock3 className="h-3.5 w-3.5" /> {sessions[item.category]}</span>
                </div>
              </button>
            ))}
          </div>
          <aside className="rounded-2xl border border-border bg-card p-4">
            <div className="mb-4 flex items-center justify-between">
              <div><p className="text-xs uppercase tracking-wider text-red-600">Selected market</p><h2 className="mt-1 text-xl font-bold">{selected.symbol}</h2><p className="text-xs text-muted-foreground">{selected.name}</p></div>
              <BarChart3 className="h-5 w-5 text-red-600" />
            </div>
            <div className="h-[380px]"><TradingViewChart instrument={selected} /></div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-muted p-3"><p className="text-xs text-muted-foreground">Asset class</p><p className="mt-1 text-sm font-semibold capitalize">{selected.category}</p></div>
              <div className="rounded-xl bg-muted p-3"><p className="text-xs text-muted-foreground">Session</p><p className="mt-1 text-sm font-semibold">{sessions[selected.category]}</p></div>
            </div>
            <Link to={`/trading?symbol=${selected.symbol}`} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#d71920] py-3 text-sm font-semibold text-white">Trade {selected.symbol} <ArrowRight className="h-4 w-4" /></Link>
          </aside>
        </div>
      </div>
    </div>
  )
}
