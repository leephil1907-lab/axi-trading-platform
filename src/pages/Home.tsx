import { Link } from "react-router-dom"
import { TrendingUp, Shield, Zap, Globe, Award, Smartphone, ChevronRight, BarChart3, Copy, Wallet } from "lucide-react"
import HeroSlider from "@/components/HeroSlider"
import { instruments } from "@/lib/data"
import { cn, formatNumber } from "@/lib/utils"

export default function Home() {
  const features = [
    { icon: Shield, title: "Regulated & Trusted", desc: "FCA, ASIC & FMA regulated since 2007." },
    { icon: Zap, title: "Ultra-Fast Execution", desc: "Average execution speed under 30ms." },
    { icon: TrendingUp, title: "Raw Spreads from 0.0", desc: "Deep liquidity from 20+ tier-1 providers." },
    { icon: Globe, title: "650+ Markets", desc: "Forex, crypto, commodities, indices & shares." },
    { icon: Award, title: "Award-Winning", desc: "Best MT4 Provider & Most Innovative Broker." },
    { icon: Smartphone, title: "Trade Anywhere", desc: "MT4, MT5, WebTrader & Axi App." },
  ]

  const topMarkets = instruments.slice(0, 6)

  return (
    <div>
      <HeroSlider />

      <div className="bg-slate-950 border-b border-border overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap py-3">
          {[...topMarkets, ...topMarkets].map((inst, i) => (
            <div key={i} className="inline-flex items-center gap-2 px-6 text-sm">
              <span className="font-semibold text-white">{inst.symbol}</span>
              <span className={cn("font-mono", inst.change >= 0 ? "text-green-400" : "text-red-400")}>
                {inst.change >= 0 ? "+" : ""}{inst.changePercent.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Trade with Axi?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Join over 60,000 traders who choose Axi for tight spreads, fast execution, and award-winning platforms.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow">
                <f.icon className="w-10 h-10 text-red-600 mb-4" />
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Popular Markets</h2>
            <Link to="/markets" className="text-red-600 font-medium flex items-center gap-1 hover:underline">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topMarkets.map((inst) => (
              <Link key={inst.symbol} to="/trading" className="p-4 rounded-lg border border-border bg-card hover:border-red-600/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{inst.symbol}</span>
                  <span className={cn("text-xs font-mono px-2 py-0.5 rounded", inst.change >= 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700")}>
                    {inst.change >= 0 ? "+" : ""}{inst.changePercent.toFixed(2)}%
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mb-2">{inst.name}</div>
                <div className="flex justify-between text-sm font-mono">
                  <span>Bid: {formatNumber(inst.bid, 5)}</span>
                  <span>Ask: {formatNumber(inst.ask, 5)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-950 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Trading in Minutes</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">Open your account today and access 650+ markets with tight spreads and lightning-fast execution.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register" className="px-8 py-3 bg-red-600 rounded-lg font-semibold hover:bg-red-700 transition-colors">Open Account</Link>
            <Link to="/register" className="px-8 py-3 bg-white/10 rounded-lg font-semibold hover:bg-white/20 transition-colors">Free Demo</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
