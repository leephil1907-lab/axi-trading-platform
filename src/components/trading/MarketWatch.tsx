import { useMemo, useState } from "react"
import { Search, Star } from "lucide-react"
import { instruments } from "@/lib/data"
import { cn } from "@/lib/utils"
import type { Instrument } from "@/types"

export default function MarketWatch({ onSelect, selectedSymbol }: { onSelect?: (instrument: Instrument) => void; selectedSymbol?: string }) {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [watchlist, setWatchlist] = useState<Set<string>>(new Set())
  const categories = [{ key: "all", label: "All" }, { key: "forex", label: "Forex" }, { key: "crypto", label: "Crypto" }, { key: "commodity", label: "Commodities" }, { key: "index", label: "Indices" }, { key: "stock", label: "Stocks" }]
  const filtered = useMemo(() => instruments.filter((item) => (item.symbol.toLowerCase().includes(search.toLowerCase()) || item.name.toLowerCase().includes(search.toLowerCase())) && (category === "all" || item.category === category)), [search, category])

  const toggleWatchlist = (symbol: string) => setWatchlist((current) => { const next = new Set(current); next.has(symbol) ? next.delete(symbol) : next.add(symbol); return next })

  return <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card"><div className="border-b border-border p-3"><h3 className="mb-2 text-sm font-semibold">Market Watch</h3><div className="relative"><Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search instruments…" className="h-9 w-full rounded-md border border-input bg-muted pl-8 pr-2 text-xs outline-none focus:ring-1 focus:ring-ring" /></div></div><div className="flex gap-1 overflow-x-auto border-b border-border px-3 py-2 scrollbar-thin">{categories.map((item) => <button key={item.key} onClick={() => setCategory(item.key)} className={cn("rounded-full px-2.5 py-1 text-[10px] whitespace-nowrap", category === item.key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>{item.label}</button>)}</div><div className="flex-1 overflow-y-auto scrollbar-thin"><div className="divide-y divide-border">{filtered.map((item) => <button key={item.symbol} onClick={() => onSelect?.(item)} className={cn("flex w-full items-center gap-2 px-3 py-3 text-left hover:bg-muted/60", selectedSymbol === item.symbol && "bg-red-50 dark:bg-red-950/20")}><span onClick={(event) => { event.stopPropagation(); toggleWatchlist(item.symbol) }} className={cn("shrink-0", watchlist.has(item.symbol) ? "text-yellow-500" : "text-muted-foreground")}><Star className="h-3.5 w-3.5" fill={watchlist.has(item.symbol) ? "currentColor" : "none"} /></span><span className="min-w-0 flex-1"><span className="block text-xs font-semibold">{item.symbol}</span><span className="block truncate text-[10px] text-muted-foreground">{item.name}</span></span><span className="rounded-full bg-muted px-2 py-1 text-[9px] font-medium capitalize text-muted-foreground">{item.category}</span></button>)}</div></div></div>
}
