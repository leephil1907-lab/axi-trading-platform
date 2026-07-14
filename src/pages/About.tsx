import { Award, Globe, Users, Shield, TrendingUp, Heart, Target, Clock } from "lucide-react"

export default function About() {
  const stats = [
    { icon: Globe, value: "150+", label: "Countries Served" },
    { icon: Users, value: "60K+", label: "Active Traders" },
    { icon: Award, value: "15+", label: "Industry Awards" },
    { icon: Shield, value: "2007", label: "Founded" },
  ]

  const values = [
    { icon: Target, title: "Client First", desc: "Everything we do is designed to help our clients succeed." },
    { icon: Shield, title: "Trust & Transparency", desc: "We operate with integrity and full regulatory compliance." },
    { icon: TrendingUp, title: "Innovation", desc: "Constantly improving our technology and trading conditions." },
    { icon: Heart, title: "Community", desc: "Building a global community of successful traders." },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About Axi</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Axi is a global leader in online trading, trusted by traders since 2007. We provide access to 650+ markets with industry-leading conditions and award-winning support.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((s) => (
          <div key={s.label} className="text-center p-6 bg-card border border-border rounded-lg">
            <s.icon className="w-8 h-8 mx-auto text-red-600 mb-3" />
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="text-muted-foreground mb-4">Founded in Sydney in 2007, Axi has grown from a small Australian broker to a global trading leader serving clients in over 150 countries. We are regulated by the FCA, ASIC, FMA, and DFSA.</p>
          <p className="text-muted-foreground">Our mission is to provide traders with the best possible trading environment — tight spreads, fast execution, and world-class support. We believe that when our clients succeed, we succeed.</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Regulation & Licensing</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-center gap-2"><Shield className="w-4 h-4 text-green-600" /> FCA (UK) — Financial Conduct Authority</li>
            <li className="flex items-center gap-2"><Shield className="w-4 h-4 text-green-600" /> ASIC (Australia) — Australian Securities & Investments Commission</li>
            <li className="flex items-center gap-2"><Shield className="w-4 h-4 text-green-600" /> FMA (New Zealand) — Financial Markets Authority</li>
            <li className="flex items-center gap-2"><Shield className="w-4 h-4 text-green-600" /> DFSA (Dubai) — Dubai Financial Services Authority</li>
            <li className="flex items-center gap-2"><Shield className="w-4 h-4 text-green-600" /> SCB (Bahamas) — Securities Commission of The Bahamas</li>
          </ul>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Our Values</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map((v) => (
            <div key={v.title} className="p-5 bg-card border border-border rounded-lg text-center">
              <v.icon className="w-8 h-8 mx-auto text-red-600 mb-3" />
              <h3 className="font-semibold mb-1">{v.title}</h3>
              <p className="text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
