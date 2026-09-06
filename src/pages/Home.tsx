import { Link } from "react-router-dom"
import { ArrowRight, BarChart3, Globe2, ShieldCheck, Smartphone, Wallet, Zap } from "lucide-react"
import HeroSlider from "@/components/HeroSlider"
import { instruments } from "@/lib/data"

export default function Home() {
  const features = [
    { icon: ShieldCheck, title: "Secure account area", desc: "Keep account, funding and preferences behind an authenticated workspace." },
    { icon: Zap, title: "Fast workflow", desc: "Move between markets, charts and account tools with smooth transitions." },
    { icon: BarChart3, title: "Professional charts", desc: "Open market charts directly in the trading workspace with TradingView." },
    { icon: Globe2, title: "Multiple markets", desc: "Browse forex, crypto, commodities, indices and shares." },
    { icon: Wallet, title: "Crypto funding", desc: "Deposit and withdraw using configured cryptocurrency addresses only." },
    { icon: Smartphone, title: "Responsive workspace", desc: "A focused experience across desktop, tablet and mobile." },
  ]

  const topMarkets = instruments.slice(0, 8)

  return <div>
    <HeroSlider />
    <div className="overflow-hidden border-b border-border bg-slate-950">
      <div className="flex w-max animate-marquee py-3">
        {[...topMarkets, ...topMarkets].map((inst, index) => <Link key={`${inst.symbol}-${index}`} to={`/trading?symbol=${inst.symbol}`} className="px-6 text-sm font-semibold text-white hover:text-red-400">{inst.symbol}</Link>)}
      </div>
    </div>

    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center"><p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-red-600">A focused trading workspace</p><h2 className="text-3xl font-bold tracking-tight md:text-4xl">Everything important, without the clutter</h2><p className="mt-4 text-muted-foreground">A clean broker-style interface for account management, markets, charting and crypto funding.</p></div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{features.map((feature) => <div key={feature.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:-translate-y-0.5 hover:shadow-md"><feature.icon className="mb-5 h-9 w-9 text-red-600" /><h3 className="mb-2 text-lg font-semibold">{feature.title}</h3><p className="text-sm leading-6 text-muted-foreground">{feature.desc}</p></div>)}</div>
      </div>
    </section>

    <section className="bg-muted/30 py-20"><div className="container mx-auto px-4"><div className="mb-8 flex items-end justify-between gap-4"><div><p className="text-sm font-semibold text-red-600">Markets</p><h2 className="mt-1 text-3xl font-bold">Explore instruments</h2></div><Link to="/markets" className="flex items-center gap-1 text-sm font-semibold text-red-600">View all <ArrowRight className="h-4 w-4" /></Link></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{topMarkets.map((inst) => <Link key={inst.symbol} to={`/trading?symbol=${inst.symbol}`} className="rounded-xl border border-border bg-card p-5 hover:border-red-600/50"><div className="font-semibold">{inst.symbol}</div><div className="mt-1 text-xs text-muted-foreground">{inst.name}</div><div className="mt-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">{inst.category}</div></Link>)}</div></div></section>

    <section className="bg-slate-950 py-20 text-white"><div className="container mx-auto px-4 text-center"><p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-red-400">Ready when you are</p><h2 className="text-3xl font-bold md:text-4xl">Open your account</h2><p className="mx-auto mt-4 max-w-xl text-slate-400">Create an account and access the platform workspace. No pre-seeded balances or simulated trades are shown.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><Link to="/register" className="rounded-lg bg-[#d71920] px-7 py-3 font-semibold hover:bg-[#b9141a]">Open Account</Link><Link to="/login" className="rounded-lg border border-white/20 px-7 py-3 font-semibold hover:bg-white/10">Log in</Link></div></div></section>
  </div>
}
