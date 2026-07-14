import { Link } from "react-router-dom"
import { Users, DollarSign, BarChart3, Award, ArrowRight, Globe, TrendingUp, Shield, Handshake, Zap, Target } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Partnership() {
  const programs = [
    {
      title: "Introducing Broker (IB)",
      icon: Handshake,
      desc: "Refer clients to Axi and earn competitive commissions on every trade they make. Perfect for educators, signal providers, and community leaders.",
      commission: "Up to $10 per lot",
      features: ["Real-time reporting", "Multi-tier commissions", "Dedicated account manager", "Marketing materials"],
      cta: "Become an IB",
      popular: true,
    },
    {
      title: "Affiliate Program",
      icon: DollarSign,
      desc: "Earn CPA (Cost Per Acquisition) for every qualified trader you refer. Ideal for websites, blogs, and social media influencers.",
      commission: "Up to $600 CPA",
      features: ["High CPA payouts", "Cookie tracking", "Creative banners", "Monthly payments"],
      cta: "Join Affiliate",
      popular: false,
    },
    {
      title: "Hybrid Program",
      icon: Zap,
      desc: "Combine CPA and revenue share for maximum earnings. Get paid upfront and earn ongoing commissions.",
      commission: "CPA + Revenue Share",
      features: ["Best of both worlds", "Flexible structure", "Performance bonuses", "Priority support"],
      cta: "Apply Now",
      popular: true,
      new: true,
    },
    {
      title: "MT4 PAMM Manager",
      icon: BarChart3,
      desc: "Manage multiple client accounts from a single master account. Perfect for professional money managers.",
      commission: "Custom fee structure",
      features: ["Master account trading", "Auto allocation", "Performance fees", "Investor portal"],
      cta: "Learn More",
      popular: false,
    },
    {
      title: "MT4 Multi-Account Manager",
      icon: Users,
      desc: "Trade across multiple sub-accounts simultaneously. Ideal for fund managers and professional traders.",
      commission: "Custom fee structure",
      features: ["Bulk order execution", "Real-time reporting", "Risk management tools", "Custom allocation"],
      cta: "Learn More",
      popular: false,
    },
  ]

  const stats = [
    { icon: Globe, value: "150+", label: "Countries" },
    { icon: Users, value: "5,000+", label: "Partners" },
    { icon: DollarSign, value: "$12M+", label: "Paid in Commissions" },
    { icon: Award, value: "4.9/5", label: "Partner Rating" },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Partnerships</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Partner with Axi and earn competitive commissions. Join thousands of successful Introducing Brokers, Affiliates, and Fund Managers worldwide.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {stats.map((s) => (
          <div key={s.label} className="text-center p-6 bg-card border border-border rounded-lg">
            <s.icon className="w-8 h-8 mx-auto text-red-600 mb-3" />
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((p) => (
          <div key={p.title} className={cn("bg-card border rounded-lg p-6 transition-shadow hover:shadow-md", p.popular ? "border-red-600" : "border-border")}>
            <div className="flex items-start justify-between mb-4">
              <p.icon className="w-10 h-10 text-red-600" />
              <div className="flex gap-1">
                {p.new && <span className="px-2 py-0.5 bg-red-600 text-white text-[10px] rounded-full font-bold">NEW</span>}
                {p.popular && <span className="px-2 py-0.5 bg-green-600 text-white text-[10px] rounded-full font-bold">POPULAR</span>}
              </div>
            </div>
            <h3 className="text-lg font-bold mb-2">{p.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{p.desc}</p>
            <div className="p-3 bg-muted rounded-lg mb-4">
              <div className="text-xs text-muted-foreground">Commission</div>
              <div className="text-lg font-bold text-green-600">{p.commission}</div>
            </div>
            <ul className="space-y-2 mb-6">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground"><Target className="w-3.5 h-3.5 text-green-600" /> {f}</li>
              ))}
            </ul>
            <Link to="/register" className="block text-center py-2.5 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-1">
              {p.cta} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-12 p-8 bg-slate-950 rounded-lg text-white text-center">
        <h2 className="text-2xl font-bold mb-3">Ready to Partner with Axi?</h2>
        <p className="text-slate-400 mb-6 max-w-xl mx-auto">Join our partnership program today and start earning. Our dedicated partnership team is here to help you succeed.</p>
        <div className="flex justify-center gap-3">
          <Link to="/register" className="px-6 py-2.5 bg-red-600 rounded-md font-medium hover:bg-red-700 transition-colors">Apply Now</Link>
          <a href="mailto:partners@axi.com" className="px-6 py-2.5 bg-white/10 rounded-md font-medium hover:bg-white/20 transition-colors">Contact Team</a>
        </div>
      </div>
    </div>
  )
}
