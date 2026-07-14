import { Link } from "react-router-dom"
import { Monitor, Smartphone, Globe, Check, BarChart3, Zap, Shield, Clock, Layers, MousePointer, TrendingUp, BookOpen } from "lucide-react"

export default function MT5() {
  const features = [
    { icon: BarChart3, title: "38 Built-in Indicators", desc: "More analysis tools than MT4" },
    { icon: Layers, title: "21 Timeframes", desc: "2-minute to 8-hour charts included" },
    { icon: TrendingUp, title: "Market Depth", desc: "View order book depth in real-time" },
    { icon: BookOpen, title: "Economic Calendar", desc: "Built-in news and events calendar" },
    { icon: Zap, title: "Hedging & Netting", desc: "Choose your preferred position mode" },
    { icon: Shield, title: "Advanced Security", desc: "256-bit SSL encryption for all transactions" },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">MetaTrader 5</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">The next-generation platform with advanced tools, wider market coverage, and improved execution.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Download MT5</h2>
          <p className="text-muted-foreground mb-6">Advanced trading on desktop and mobile with enhanced features.</p>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <button className="p-3 bg-muted rounded-lg flex items-center gap-2 hover:bg-muted/80 transition-colors"><Monitor className="w-5 h-5" /> Windows</button>
            <button className="p-3 bg-muted rounded-lg flex items-center gap-2 hover:bg-muted/80 transition-colors"><Monitor className="w-5 h-5" /> Mac</button>
            <button className="p-3 bg-muted rounded-lg flex items-center gap-2 hover:bg-muted/80 transition-colors"><Smartphone className="w-5 h-5" /> iOS</button>
            <button className="p-3 bg-muted rounded-lg flex items-center gap-2 hover:bg-muted/80 transition-colors"><Smartphone className="w-5 h-5" /> Android</button>
          </div>
          <Link to="/register" className="block text-center py-2.5 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition-colors">Open Live Account</Link>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">MT5 WebTrader</h2>
          <p className="text-muted-foreground mb-6">Full MT5 functionality in your browser. No download needed.</p>
          <div className="flex items-center gap-2 mb-4"><Globe className="w-5 h-5 text-red-600" /> <span>Works in all modern browsers</span></div>
          <Link to="/register" className="block text-center py-2.5 border border-border rounded-md font-medium hover:bg-muted transition-colors">Launch WebTrader</Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((f) => (
          <div key={f.title} className="p-5 bg-card border border-border rounded-lg hover:shadow-md transition-shadow">
            <f.icon className="w-8 h-8 text-red-600 mb-3" />
            <h3 className="font-semibold mb-1">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
