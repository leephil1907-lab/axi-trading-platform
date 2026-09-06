import { Link } from "react-router-dom"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Handshake, HelpCircle } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4"><div className="w-8 h-8 bg-red-600 rounded-md flex items-center justify-center"><span className="text-white font-bold text-sm">A</span></div><span className="font-bold text-lg text-white tracking-tight">axi</span></div>
            <p className="text-sm text-slate-400 mb-4">Trade with confidence. Axi is a global leader in online trading, trusted by traders since 2007.</p>
            <div className="flex gap-3">{[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, i) => <a key={i} href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-red-600 transition-colors"><Icon className="w-4 h-4" /></a>)}</div>
          </div>
          <div><h4 className="font-semibold text-white mb-4 text-sm">Markets</h4><ul className="space-y-2 text-sm">{["Forex", "Crypto CFDs", "Commodities", "Indices", "Share CFDs", "ETFs"].map((item) => <li key={item}><Link to="/markets" className="hover:text-white transition-colors">{item}</Link></li>)}</ul></div>
          <div><h4 className="font-semibold text-white mb-4 text-sm">Platforms</h4><ul className="space-y-2 text-sm">{["Axi Trading Platform", "MT4", "MT5", "Copy Trading", "MT4 WebTrader", "MT5 WebTrader"].map((item) => <li key={item}><Link to="/platforms" className="hover:text-white transition-colors">{item}</Link></li>)}</ul></div>
          <div><h4 className="font-semibold text-white mb-4 text-sm">Company</h4><ul className="space-y-2 text-sm">{["About Axi", "Our Team", "Careers", "Sponsorship", "Investor Relations", "Company News"].map((item) => <li key={item}><Link to="/about" className="hover:text-white transition-colors">{item}</Link></li>)}</ul></div>
          <div><h4 className="font-semibold text-white mb-4 text-sm">Support</h4><ul className="space-y-2 text-sm"><li><Link to="/help-center" className="hover:text-white transition-colors flex items-center gap-1"><HelpCircle className="w-3 h-3" /> Help Centre</Link></li><li><Link to="/partnership" className="hover:text-white transition-colors flex items-center gap-1"><Handshake className="w-3 h-3" /> Partnership</Link></li><li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li><li><a href="#" className="hover:text-white transition-colors">Live Chat</a></li><li><a href="#" className="hover:text-white transition-colors">Payment Methods</a></li><li><a href="#" className="hover:text-white transition-colors">Legal Documents</a></li></ul></div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-800 text-xs text-slate-500 space-y-4"><p>Risk Warning: CFDs are complex instruments and come with a high risk of losing money rapidly due to leverage. 72.5% of retail investor accounts lose money when trading CFDs with this provider. You should consider whether you understand how CFDs work and whether you can afford to take the high risk of losing your money.</p><div className="flex flex-col md:flex-row justify-between items-center gap-4"><p>© 2026 Axi. All rights reserved. Axi is a trading name of AxiCorp Financial Services Pty Ltd.</p><div className="flex gap-4"><a href="#" className="hover:text-white">Privacy Policy</a><a href="#" className="hover:text-white">Terms of Service</a><a href="#" className="hover:text-white">Cookie Policy</a></div></div></div>
      </div>
    </footer>
  )
}
