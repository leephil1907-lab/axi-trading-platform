import { useMemo, useState } from "react"
import { Search, BookOpen, Wallet, BarChart3, ShieldCheck } from "lucide-react"

const articles = [
  { title: "Creating your account", text: "Follow the guided account-opening flow and complete each step before entering the client area." },
  { title: "Using the trading workspace", text: "Choose an instrument from Market Watch to open its TradingView chart." },
  { title: "Crypto deposits", text: "Select a configured asset and network, copy the displayed address, send the asset, then submit the transaction hash." },
  { title: "Crypto withdrawals", text: "Select the configured network and provide the destination wallet address for the production funding service." },
  { title: "Theme settings", text: "Switch between the dark and white themes from the header or Settings → Preferences." },
  { title: "Account security", text: "Keep credentials private and use the security settings area to manage account preferences." },
]

export default function HelpCenter() {
  const [search, setSearch] = useState("")
  const filtered = useMemo(() => articles.filter((article) => `${article.title} ${article.text}`.toLowerCase().includes(search.toLowerCase())), [search])
  return <div className="container mx-auto max-w-5xl px-4 py-12"><div className="mx-auto max-w-2xl text-center"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">Help Centre</p><h1 className="mt-2 text-3xl font-bold">How can we help?</h1><p className="mt-3 text-muted-foreground">Guides for the account, trading, funding and settings areas.</p></div><div className="relative mx-auto mt-8 max-w-xl"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search help articles…" className="h-12 w-full rounded-xl border border-input bg-background pl-10 pr-4 outline-none focus:ring-2 focus:ring-ring" /></div><div className="mt-10 grid gap-4 md:grid-cols-2">{filtered.map((article, index) => { const Icon = [BookOpen, BarChart3, Wallet, Wallet, ShieldCheck, ShieldCheck][index] || BookOpen; return <article key={article.title} className="rounded-2xl border border-border bg-card p-6"><Icon className="h-5 w-5 text-red-600" /><h2 className="mt-4 font-semibold">{article.title}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{article.text}</p></article> })}</div></div>
}
