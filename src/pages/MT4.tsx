import { Link } from "react-router-dom"
import { Monitor, Smartphone, Globe, Check, Download, BarChart3, Zap, Shield, Clock, Layers, MousePointer } from "lucide-react"

export default function MT4() {
  const features = [
    { icon: BarChart3, title: "30+ Technical Indicators", desc: "Moving averages, oscillators, and custom indicators" },
    { icon: Layers, title: "9 Timeframes", desc: "From 1 minute to monthly charts" },
    { icon: Zap, title: "Automated Trading (EAs)", desc: "Build and run expert advisors with MQL4" },
    { icon: MousePointer, title: "One-Click Trading", desc: "Execute orders instantly from the chart" },
    { icon: Shield, title: "Advanced Security", desc: "256-bit SSL encryption for all transactions" },
    { icon: Clock, title: "Real-Time Pricing", desc: "Live quotes with sub-30ms execution" },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">MetaTrader 4</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">The world's most popular trading platform. Simple for beginners, powerful for professionals. Trusted by millions of traders worldwide.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Download MT4</h2>
          <p className="text-muted-foreground mb-6">Available on all major platforms. Start trading in minutes.</p>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <button className="p-3 bg-muted rounded-lg flex items-center gap-2 hover:bg-muted/80 transition-colors"><Monitor className="w-5 h-5" /> Windows</button>
            <button className="p-3 bg-muted rounded-lg flex items-center gap-2 hover:bg-muted/80 transition-colors"><Monitor className="w-5 h-5" /> Mac</button>
            <button className="p-3 bg-muted rounded-lg flex items-center gap-2 hover:bg-muted/80 transition-colors"><Smartphone className="w-5 h-5" /> iOS</button>
            <button className="p-3 bg-muted rounded-lg flex items-center gap-2 hover:bg-muted/80 transition-colors"><Smartphone className="w-5 h-5" /> Android</button>
          </div>
          <Link to="/register" className="block text-center py-2.5 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition-colors">Open Live Account</Link>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">MT4 WebTrader</h2>
          <p className="text-muted-foreground mb-6">Trade directly from your browser with no download required. Full functionality, zero installation.</p>
          <div className="flex items-center gap-2 mb-4"><Globe className="w-5 h-5 text-red-600" /> <span>Works in Chrome, Firefox, Safari, Edge</span></div>
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
