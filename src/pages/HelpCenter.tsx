import { useState } from "react"
import { Link } from "react-router-dom"
import { Search, BookOpen, MessageCircle, Phone, Mail, Clock, CreditCard, Wallet, BarChart3, Shield, User, Globe, ChevronRight, FileText, Video, HelpCircle, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

export default function HelpCenter() {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState("getting-started")

  const categories = [
    { key: "getting-started", label: "Getting Started", icon: BookOpen },
    { key: "accounts", label: "Trading Accounts", icon: User },
    { key: "deposits", label: "Deposits & Withdrawals", icon: Wallet },
    { key: "platforms", label: "Trading Platforms", icon: BarChart3 },
    { key: "markets", label: "Markets & Instruments", icon: Globe },
    { key: "security", label: "Security & Verification", icon: Shield },
    { key: "partnerships", label: "Partnerships", icon: MessageCircle },
  ]

  const faqs: Record<string, { q: string; a: string }[]> = {
    "getting-started": [
      { q: "How do I open an Axi trading account?", a: "Click 'Open Account' on our homepage, fill in your personal details, verify your identity, and fund your account. The process takes less than 5 minutes." },
      { q: "What documents do I need for verification?", a: "You will need a valid government-issued ID (passport, driver's license, or national ID) and a recent utility bill or bank statement (within 3 months) as proof of address." },
      { q: "Can I open a demo account?", a: "Yes! We offer free demo accounts with $50,000 in virtual funds. Demo accounts are perfect for practicing strategies without risking real money." },
      { q: "What is the minimum deposit?", a: "The minimum deposit is $0 for Standard accounts, $500 for Pro accounts, and $25,000 for Elite accounts." },
      { q: "How long does verification take?", a: "Most verifications are completed within 24 hours. In some cases, it may take up to 48 hours depending on document quality." },
    ],
    "accounts": [
      { q: "What account types does Axi offer?", a: "We offer Standard, Pro, and Elite accounts. Standard has no minimum deposit, Pro offers lower spreads with a $500 minimum, and Elite provides institutional-grade conditions with $25,000 minimum." },
      { q: "Can I have multiple trading accounts?", a: "Yes, you can open multiple accounts under the same profile. Each account can have different base currencies and account types." },
      { q: "What is Axi Select?", a: "Axi Select is our funded trader program. Prove your trading skills and earn up to $1M in funding with up to 90% profit share." },
      { q: "How do I change my account currency?", a: "Account currency is set at registration and cannot be changed. You can open a new account with a different base currency." },
      { q: "What is the AI Analyst?", a: "AI Analyst is our proprietary AI-powered market analysis tool that provides real-time insights, trade ideas, and risk assessments." },
    ],
    "deposits": [
      { q: "What payment methods are available?", a: "We accept Visa/Mastercard, bank wire transfers, SEPA, Skrill, Neteller, cryptocurrency (BTC, ETH, USDT, USDC), Apple Pay, Google Pay, PayPal, Trustly, iDEAL, Sofort, Giropay, Bancontact, EPS, Multibanco, Przelewy24, BLIK, and PayU." },
      { q: "Are there any deposit fees?", a: "No, Axi does not charge any deposit fees. However, your bank or payment provider may charge their own fees." },
      { q: "How long do withdrawals take?", a: "Withdrawal processing times vary by method: E-wallets (instant), Crypto (up to 15 min), Bank transfers (1-3 business days), SEPA (same day)." },
      { q: "Why is my withdrawal pending?", a: "All withdrawals require admin approval for security reasons. This typically takes 1-24 hours. Ensure your account is fully verified." },
      { q: "Can I withdraw to a different method?", a: "For security, withdrawals must go to the same method used for deposit. If you deposited via card, you must withdraw to the same card first." },
    ],
    "platforms": [
      { q: "Which platforms does Axi support?", a: "We support MetaTrader 4, MetaTrader 5, our proprietary Axi Trading Platform, and the Copy Trading App. All platforms are available on web, desktop, iOS, and Android." },
      { q: "How do I download MT4/MT5?", a: "Visit our Platforms page and select your operating system. You can also use WebTrader directly in your browser without downloading." },
      { q: "Can I use Expert Advisors (EAs)?", a: "Yes, EAs are fully supported on MT4 and MT5. You can run automated strategies 24/7 on our VPS hosting." },
      { q: "What is the difference between MT4 and MT5?", a: "MT5 offers more timeframes (21 vs 9), more indicators (38 vs 30), market depth, economic calendar, and supports both hedging and netting modes." },
      { q: "Is the Axi Trading Platform free?", a: "Yes, our proprietary platform is completely free for all Axi clients. It includes AI Analyst, advanced charting, and one-click trading." },
    ],
    "markets": [
      { q: "What markets can I trade?", a: "Axi offers 650+ instruments including Forex, Crypto CFDs, Commodities, Indices, Share CFDs, and ETFs." },
      { q: "What are the trading hours?", a: "Forex: 24/5 (Sun 22:00 GMT - Fri 22:00 GMT). Crypto: 24/7. Indices and commodities vary by instrument. Check our trading hours page for details." },
      { q: "What is the minimum trade size?", a: "The minimum lot size is 0.01 (micro lot) for most instruments. This allows you to trade with smaller position sizes." },
      { q: "Do you offer Islamic accounts?", a: "Yes, we offer swap-free Islamic accounts compliant with Shariah law. Contact our support team to convert your account." },
      { q: "What leverage is available?", a: "Leverage varies by instrument and regulatory jurisdiction. Forex up to 1:500, Indices up to 1:200, Commodities up to 1:100, Crypto up to 1:20." },
    ],
    "security": [
      { q: "Is my money safe with Axi?", a: "Yes, client funds are held in segregated accounts with tier-1 banks. We are regulated by FCA, ASIC, FMA, DFSA, and SCB." },
      { q: "What is two-factor authentication (2FA)?", a: "2FA adds an extra layer of security by requiring a code from your phone in addition to your password. We strongly recommend enabling it." },
      { q: "How do I reset my password?", a: "Click 'Forgot Password' on the login page, enter your email, and follow the instructions. You will receive a reset link within minutes." },
      { q: "What should I do if I suspect unauthorized access?", a: "Immediately change your password, enable 2FA if not already active, and contact our support team at support@axi.com or via live chat." },
      { q: "How is my personal data protected?", a: "We use 256-bit SSL encryption, comply with GDPR, and never share your data with third parties without consent." },
    ],
    "partnerships": [
      { q: "How do I become an Introducing Broker?", a: "Apply through our Partnerships page. Once approved, you will receive a unique referral link and access to our partner portal." },
      { q: "What commission rates are available?", a: "IBs earn up to $10 per lot. Affiliates earn up to $600 CPA. Hybrid partners receive both CPA and ongoing revenue share." },
      { q: "When are partner commissions paid?", a: "Commissions are calculated daily and paid monthly by the 15th of each month. Minimum payout is $100." },
      { q: "Do you provide marketing materials?", a: "Yes, all partners receive access to banners, landing pages, email templates, and tracking links through our partner portal." },
      { q: "Can I be both an IB and Affiliate?", a: "Yes, our Hybrid Program combines both models for maximum earnings. Contact our partnership team for details." },
    ],
  }

  const contactMethods = [
    { icon: MessageCircle, title: "Live Chat", desc: "Available 24/5", action: "Start Chat" },
    { icon: Mail, title: "Email Support", desc: "support@axi.com", action: "Send Email" },
    { icon: Phone, title: "Phone Support", desc: "+44 20 3880 7793", action: "Call Now" },
  ]

  const filteredFaqs = faqs[activeCategory]?.filter((f) => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase())) || []

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Help Centre</h1>
        <p className="text-muted-foreground">Find answers to your questions or contact our support team</p>
      </div>

      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search for answers..." className="w-full h-12 pl-12 pr-4 rounded-lg border border-input bg-background text-lg focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6 mb-8">
        <div className="lg:col-span-1 space-y-1">
          {categories.map((c) => (
            <button key={c.key} onClick={() => setActiveCategory(c.key)} className={cn("w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left", activeCategory === c.key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted")}>
              <c.icon className="w-4 h-4" /> {c.label}
            </button>
          ))}
        </div>

        <div className="lg:col-span-3">
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">{categories.find((c) => c.key === activeCategory)?.label}</h2>
            <div className="space-y-4">
              {filteredFaqs.map((faq, i) => (
                <details key={i} className="group border border-border rounded-lg overflow-hidden">
                  <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors list-none">
                    <span className="font-medium text-sm">{faq.q}</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground transition-transform group-open:rotate-90" />
                  </summary>
                  <div className="px-4 pb-4 text-sm text-muted-foreground">{faq.a}</div>
                </details>
              ))}
              {filteredFaqs.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <HelpCircle className="w-8 h-8 mx-auto mb-2" />
                  <p>No results found. Try a different search term.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {contactMethods.map((c) => (
          <div key={c.title} className="bg-card border border-border rounded-lg p-5 text-center hover:border-red-600/50 transition-colors">
            <c.icon className="w-8 h-8 mx-auto text-red-600 mb-3" />
            <h3 className="font-semibold mb-1">{c.title}</h3>
            <p className="text-sm text-muted-foreground mb-3">{c.desc}</p>
            <button className="text-sm text-red-600 font-medium hover:underline">{c.action}</button>
          </div>
        ))}
      </div>

      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 shrink-0" />
        <div className="text-sm text-yellow-800 dark:text-yellow-200">
          <p className="font-medium">Risk Warning</p>
          <p>CFDs are complex instruments and come with a high risk of losing money rapidly due to leverage. 72.5% of retail investor accounts lose money when trading CFDs with this provider. You should consider whether you understand how CFDs work and whether you can afford to take the high risk of losing your money.</p>
        </div>
      </div>
    </div>
  )
}
