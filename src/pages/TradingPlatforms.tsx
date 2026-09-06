import { Link } from "react-router-dom"
import { BarChart3, Monitor, Smartphone, ArrowRight } from "lucide-react"

export default function TradingPlatforms() {
  const platforms = [
    { title: "Axi Trading Workspace", desc: "Browser-based workspace with market watch, TradingView charts and account tools.", icon: BarChart3, href: "/trading", features: ["TradingView charts", "Market catalogue", "Account workspace", "Responsive UI"] },
    { title: "MetaTrader 4", desc: "Access the MT4 platform area from the client workspace.", icon: Monitor, href: "/platforms/mt4", features: ["MT4 account access", "Platform information", "Client navigation", "Responsive layout"] },
    { title: "MetaTrader 5", desc: "Access the MT5 platform area from the client workspace.", icon: Smartphone, href: "/platforms/mt5", features: ["MT5 account access", "Platform information", "Client navigation", "Responsive layout"] },
  ]
  return <div className="container mx-auto px-4 py-12"><div className="mx-auto max-w-2xl text-center"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">Platforms</p><h1 className="mt-2 text-3xl font-bold">Choose your trading workspace</h1><p className="mt-3 text-muted-foreground">No sample accounts or simulated trading balances are included.</p></div><div className="mt-10 grid gap-5 lg:grid-cols-3">{platforms.map((platform) => <div key={platform.title} className="rounded-2xl border border-border bg-card p-6"><platform.icon className="h-8 w-8 text-red-600" /><h2 className="mt-5 text-xl font-semibold">{platform.title}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{platform.desc}</p><ul className="mt-5 space-y-2">{platform.features.map((feature) => <li key={feature} className="text-sm text-muted-foreground">• {feature}</li>)}</ul><Link to={platform.href} className="mt-6 flex items-center gap-2 text-sm font-semibold text-red-600">Open platform <ArrowRight className="h-4 w-4" /></Link></div>)}</div></div>
}
