import type { Instrument } from "@/types"

// Instrument catalogue only. Quotes are intentionally not embedded here; the trading screen
// uses TradingView for market data instead of simulated or pre-seeded prices.
export const instruments: Instrument[] = [
  { symbol: "EURUSD", name: "Euro / US Dollar", category: "forex" },
  { symbol: "GBPUSD", name: "British Pound / US Dollar", category: "forex" },
  { symbol: "USDJPY", name: "US Dollar / Japanese Yen", category: "forex" },
  { symbol: "AUDUSD", name: "Australian Dollar / US Dollar", category: "forex" },
  { symbol: "USDCAD", name: "US Dollar / Canadian Dollar", category: "forex" },
  { symbol: "USDCHF", name: "US Dollar / Swiss Franc", category: "forex" },
  { symbol: "NZDUSD", name: "New Zealand Dollar / US Dollar", category: "forex" },
  { symbol: "EURGBP", name: "Euro / British Pound", category: "forex" },
  { symbol: "BTCUSD", name: "Bitcoin / US Dollar", category: "crypto" },
  { symbol: "ETHUSD", name: "Ethereum / US Dollar", category: "crypto" },
  { symbol: "XRPUSD", name: "XRP / US Dollar", category: "crypto" },
  { symbol: "SOLUSD", name: "Solana / US Dollar", category: "crypto" },
  { symbol: "LTCUSD", name: "Litecoin / US Dollar", category: "crypto" },
  { symbol: "XAUUSD", name: "Gold / US Dollar", category: "commodity" },
  { symbol: "XAGUSD", name: "Silver / US Dollar", category: "commodity" },
  { symbol: "USOIL", name: "US Crude Oil", category: "commodity" },
  { symbol: "UKOIL", name: "Brent Crude Oil", category: "commodity" },
  { symbol: "NATGAS", name: "Natural Gas", category: "commodity" },
  { symbol: "US30", name: "Dow Jones 30", category: "index" },
  { symbol: "SPX500", name: "S&P 500", category: "index" },
  { symbol: "NAS100", name: "Nasdaq 100", category: "index" },
  { symbol: "GER40", name: "DAX 40", category: "index" },
  { symbol: "UK100", name: "FTSE 100", category: "index" },
  { symbol: "AAPL", name: "Apple Inc.", category: "stock" },
  { symbol: "TSLA", name: "Tesla Inc.", category: "stock" },
  { symbol: "MSFT", name: "Microsoft Corp.", category: "stock" },
  { symbol: "AMZN", name: "Amazon.com Inc.", category: "stock" },
  { symbol: "GOOGL", name: "Alphabet Inc.", category: "stock" },
  { symbol: "META", name: "Meta Platforms Inc.", category: "stock" },
  { symbol: "NVDA", name: "NVIDIA Corp.", category: "stock" },
]

export const navLinks = [
  { label: "Trade With Trust", href: "#", children: [
    { label: "Online Security", href: "/security" },
    { label: "Pricing & Execution", href: "/pricing" },
    { label: "Service", href: "/awards" },
  ]},
  { label: "Trading Accounts", href: "#", children: [
    { label: "Account Types", href: "/platforms" },
    { label: "Trading Tools", href: "/platforms" },
  ]},
  { label: "Markets", href: "/markets", children: [
    { label: "Forex", href: "/markets?cat=forex" },
    { label: "Shares", href: "/markets?cat=stock" },
    { label: "Indices", href: "/markets?cat=index" },
    { label: "Commodities", href: "/markets?cat=commodity" },
    { label: "Crypto", href: "/markets?cat=crypto" },
  ]},
  { label: "Trading Platforms", href: "#", children: [
    { label: "Trading Platform", href: "/trading" },
    { label: "MT4", href: "/platforms/mt4" },
    { label: "MT5", href: "/platforms/mt5" },
  ]},
  { label: "Learn to Trade", href: "/help-center", children: [
    { label: "Help Centre", href: "/help-center" },
    { label: "Trading Glossary", href: "/help-center" },
  ]},
]

export const heroSlides = [
  { title: "Trade markets from one platform", subtitle: "Explore forex, crypto, commodities, indices and shares with a focused trading workspace.", cta: "Open Account", cta2: "Explore Markets", bg: "from-slate-950 to-slate-800" },
  { title: "A cleaner way to manage your trading", subtitle: "Move from account management to charts and funding without leaving the platform.", cta: "Open Account", cta2: "View Platform", bg: "from-red-950 to-slate-900" },
  { title: "Professional charts. Focused execution.", subtitle: "Use TradingView market charts and keep your account, funding and settings in one place.", cta: "Start Trading", cta2: "Learn More", bg: "from-slate-900 to-zinc-800" },
]
