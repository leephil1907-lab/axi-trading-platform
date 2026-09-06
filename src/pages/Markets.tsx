import { useState } from "react"
import { Link } from "react-router-dom"
import { Search, ArrowRight } from "lucide-react"
import { instruments } from "@/lib/data"
import { cn } from "@/lib/utils"

export default function Markets() {
  const [search, setSearch] = useState("")
  const [cat, setCat] = useState("all")
  const cats = [{ key: "all", label: "All" }, { key: "forex", label: "Forex" }, { key: "crypto", label: "Crypto" }, { key: "commodity", label: "Commodities" }, { key: "index", label: "Indices" }, { key: "stock", label: "Stocks" }]
  const filtered = instruments.filter((item) => (item.symbol.toLowerCase().includes(search.toLowerCase()) || item.name.toLowerCase().includes(search.toLowerCase())) && (cat === "all" || item.category === cat))

  return <div className="container mx-auto px-4 py-10"><div className="mb-8"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">Markets</p><h1 className="mt-2 text-3xl font-bold">Explore instruments</h1><p className="mt-2 text-muted-foreground">Select an instrument to open its TradingView chart. Quotes are not seeded into the application.</p></div>
    <div className="mb-7 flex flex-col gap-3 sm:flex-row"><div className="relative flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search markets…" className="h-11 w-full rounded-lg border border-input bg-background pl-10 pr-4 outline-none focus:ring-2 focus:ring-ring" /></div><div className="flex gap-2 overflow-x-auto">{cats.map((item) => <button key={item.key} onClick={() => setCat(item.key)} className={cn("rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap", cat === item.key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80")}>{item.label}</button>)}</div></div>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{filtered.map((item) => <Link key={item.symbol} to={`/trading?symbol=${item.symbol}`} className="group rounded-2xl border border-border bg-card p-5 hover:border-red-600/50 hover:shadow-md"><div className="flex items-start justify-between gap-4"><div><div className="text-lg font-bold">{item.symbol}</div><div className="mt-1 text-sm text-muted-foreground">{item.name}</div></div><ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-red-600" /></div><div className="mt-5 inline-flex rounded-full bg-muted px-3 py-1 text-xs font-semibold capitalize text-muted-foreground">{item.category}</div></Link>)}</div>
  </div>
}
