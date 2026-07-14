import { Link } from "react-router-dom"
import { Monitor, Smartphone, Copy, BarChart3, ArrowRight, Zap, Globe, Shield, TrendingUp } from "lucide-react"

export default function TradingPlatforms() {
  const platforms = [
    { title: "Axi Trading Platform", desc: "Our proprietary platform with advanced charts, AI Analyst, and fast execution. Available on web and mobile.", icon: BarChart3, href: "/register", new: true, features: ["AI Analyst Beta", "650+ markets", "One-click trading", "Real-time alerts"] },
    { title: "MetaTrader 4", desc: "The world's most popular platform. 30+ indicators, EAs, and one-click trading.", icon: Monitor, href: "/platforms/mt4", features: ["30+ indicators", "Expert Advisors", "One-click trading", "9 timeframes"] },
    { title: "MetaTrader 5", desc: "Next-gen platform with 38 indicators, market depth, and hedging support.", icon: Monitor, href: "/platforms/mt5", new: true, features: ["38 indicators", "Market depth", "Hedging mode", "21 timeframes"] },
    { title: "Copy Trading App", desc: "Automatically copy top traders. Available on iOS and Android with full risk control.", icon: Copy, href: "/copy-trading", features: ["Auto-copy trades", "Risk control", "Performance tracking", "Mobile alerts"] },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Trading Platforms</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Choose the platform that fits your trading style. All platforms offer fast execution, tight spreads, and world-class security.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {platforms.map((p) => (
          <Link key={p.title} to={p.href} className="group bg-card border border-border rounded-lg p-6 hover:border-red-600/50 transition-all">
            <div className="flex items-start justify-between mb-4">
              <p.icon className="w-10 h-10 text-red-600" />
              {p.new && <span className="px-2 py-0.5 bg-red-600 text-white text-xs rounded-full font-bold">NEW</span>}
            </div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-red-600 transition-colors">{p.title}</h3>
            <p className="text-muted-foreground text-sm mb-4">{p.desc}</p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {p.features.map((f) => (
                <div key={f} className="flex items-center gap-1.5 text-xs text-muted-foreground"><Zap className="w-3 h-3 text-green-600" /> {f}</div>
              ))}
            </div>
            <span className="text-red-600 text-sm font-medium flex items-center gap-1">Learn more <ArrowRight className="w-4 h-4" /></span>
          </Link>
        ))}
      </div>

      <div className="mt-12 p-6 bg-slate-950 rounded-lg text-white text-center">
        <h2 className="text-2xl font-bold mb-3">Not sure which platform to choose?</h2>
        <p className="text-slate-400 mb-4">Start with a free demo account and test all platforms risk-free.</p>
        <Link to="/register" className="inline-block px-6 py-2 bg-red-600 rounded-md font-medium hover:bg-red-700 transition-colors">Try Free Demo</Link>
      </div>
    </div>
  )
}
