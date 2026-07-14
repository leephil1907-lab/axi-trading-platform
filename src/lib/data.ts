import { Instrument, Position, CopyTrader, Transaction } from "@/types"

export const instruments: Instrument[] = [
  { symbol: "EURUSD", name: "Euro / US Dollar", category: "forex", bid: 1.0845, ask: 1.0847, change: 0.0012, changePercent: 0.11, spread: 0.2 },
  { symbol: "GBPUSD", name: "British Pound / US Dollar", category: "forex", bid: 1.2734, ask: 1.2736, change: -0.0008, changePercent: -0.06, spread: 0.2 },
  { symbol: "USDJPY", name: "US Dollar / Japanese Yen", category: "forex", bid: 151.42, ask: 151.44, change: 0.35, changePercent: 0.23, spread: 0.2 },
  { symbol: "AUDUSD", name: "Australian Dollar / US Dollar", category: "forex", bid: 0.6543, ask: 0.6545, change: 0.0010, changePercent: 0.15, spread: 0.2 },
  { symbol: "USDCAD", name: "US Dollar / Canadian Dollar", category: "forex", bid: 1.3689, ask: 1.3691, change: -0.0015, changePercent: -0.11, spread: 0.2 },
  { symbol: "USDCHF", name: "US Dollar / Swiss Franc", category: "forex", bid: 0.9056, ask: 0.9058, change: 0.0005, changePercent: 0.06, spread: 0.2 },
  { symbol: "NZDUSD", name: "New Zealand Dollar / US Dollar", category: "forex", bid: 0.5987, ask: 0.5989, change: -0.0003, changePercent: -0.05, spread: 0.2 },
  { symbol: "EURGBP", name: "Euro / British Pound", category: "forex", bid: 0.8521, ask: 0.8523, change: 0.0015, changePercent: 0.18, spread: 0.2 },
  { symbol: "BTCUSD", name: "Bitcoin / US Dollar", category: "crypto", bid: 67543.20, ask: 67589.50, change: 1250.30, changePercent: 1.88, spread: 46.3 },
  { symbol: "ETHUSD", name: "Ethereum / US Dollar", category: "crypto", bid: 3521.45, ask: 3524.80, change: 87.20, changePercent: 2.54, spread: 3.35 },
  { symbol: "XRPUSD", name: "Ripple / US Dollar", category: "crypto", bid: 0.6234, ask: 0.6241, change: 0.0123, changePercent: 2.01, spread: 0.0007 },
  { symbol: "SOLUSD", name: "Solana / US Dollar", category: "crypto", bid: 184.25, ask: 184.55, change: 5.40, changePercent: 3.02, spread: 0.30 },
  { symbol: "LTCUSD", name: "Litecoin / US Dollar", category: "crypto", bid: 89.45, ask: 89.62, change: 2.15, changePercent: 2.46, spread: 0.17 },
  { symbol: "XAUUSD", name: "Gold / US Dollar", category: "commodity", bid: 2345.60, ask: 2346.10, change: 12.40, changePercent: 0.53, spread: 0.50 },
  { symbol: "XAGUSD", name: "Silver / US Dollar", category: "commodity", bid: 28.45, ask: 28.52, change: 0.35, changePercent: 1.25, spread: 0.07 },
  { symbol: "USOIL", name: "US Crude Oil", category: "commodity", bid: 78.45, ask: 78.49, change: -0.85, changePercent: -1.07, spread: 0.04 },
  { symbol: "UKOIL", name: "Brent Crude Oil", category: "commodity", bid: 82.30, ask: 82.34, change: -0.72, changePercent: -0.87, spread: 0.04 },
  { symbol: "NATGAS", name: "Natural Gas", category: "commodity", bid: 2.845, ask: 2.852, change: 0.045, changePercent: 1.61, spread: 0.007 },
  { symbol: "US30", name: "Dow Jones 30", category: "index", bid: 39845.20, ask: 39852.40, change: 125.30, changePercent: 0.32, spread: 7.20 },
  { symbol: "SPX500", name: "S&P 500", category: "index", bid: 5321.45, ask: 5323.80, change: 42.15, changePercent: 0.80, spread: 2.35 },
  { symbol: "NAS100", name: "Nasdaq 100", category: "index", bid: 18745.30, ask: 18752.60, change: 185.40, changePercent: 1.00, spread: 7.30 },
  { symbol: "GER40", name: "DAX 40", category: "index", bid: 18456.80, ask: 18462.30, change: -45.20, changePercent: -0.24, spread: 5.50 },
  { symbol: "UK100", name: "FTSE 100", category: "index", bid: 8432.50, ask: 8436.20, change: 32.15, changePercent: 0.38, spread: 3.70 },
  { symbol: "AAPL", name: "Apple Inc.", category: "stock", bid: 189.45, ask: 189.52, change: 2.30, changePercent: 1.23, spread: 0.07 },
  { symbol: "TSLA", name: "Tesla Inc.", category: "stock", bid: 245.30, ask: 245.45, change: -5.20, changePercent: -2.08, spread: 0.15 },
  { symbol: "MSFT", name: "Microsoft Corp.", category: "stock", bid: 432.15, ask: 432.35, change: 5.40, changePercent: 1.27, spread: 0.20 },
  { symbol: "AMZN", name: "Amazon.com Inc.", category: "stock", bid: 178.45, ask: 178.58, change: 3.20, changePercent: 1.83, spread: 0.13 },
  { symbol: "GOOGL", name: "Alphabet Inc.", category: "stock", bid: 165.30, ask: 165.42, change: 1.85, changePercent: 1.13, spread: 0.12 },
  { symbol: "META", name: "Meta Platforms Inc.", category: "stock", bid: 498.20, ask: 498.45, change: 8.30, changePercent: 1.70, spread: 0.25 },
  { symbol: "NVDA", name: "NVIDIA Corp.", category: "stock", bid: 892.45, ask: 893.20, change: 25.60, changePercent: 2.95, spread: 0.75 },
]

export const mockPositions: Position[] = [
  { id: "pos-1", symbol: "EURUSD", name: "Euro / US Dollar", type: "buy", volume: 1.5, entryPrice: 1.0820, currentPrice: 1.0845, stopLoss: 1.0780, takeProfit: 1.0900, openTime: "2026-07-13T08:30:00Z", pnl: 375.00, pnlPercent: 2.31 },
  { id: "pos-2", symbol: "BTCUSD", name: "Bitcoin / US Dollar", type: "buy", volume: 0.25, entryPrice: 66200.00, currentPrice: 67543.20, stopLoss: 64000.00, takeProfit: 70000.00, openTime: "2026-07-12T14:15:00Z", pnl: 335.80, pnlPercent: 2.03 },
  { id: "pos-3", symbol: "XAUUSD", name: "Gold / US Dollar", type: "sell", volume: 2.0, entryPrice: 2360.00, currentPrice: 2345.60, stopLoss: 2380.00, takeProfit: 2300.00, openTime: "2026-07-13T10:45:00Z", pnl: 2880.00, pnlPercent: 0.61 },
  { id: "pos-4", symbol: "NVDA", name: "NVIDIA Corp.", type: "buy", volume: 10, entryPrice: 875.00, currentPrice: 892.45, stopLoss: 850.00, takeProfit: 920.00, openTime: "2026-07-11T09:00:00Z", pnl: 174.50, pnlPercent: 1.99 },
  { id: "pos-5", symbol: "USOIL", name: "US Crude Oil", type: "sell", volume: 5, entryPrice: 79.50, currentPrice: 78.45, stopLoss: 81.00, takeProfit: 75.00, openTime: "2026-07-13T11:20:00Z", pnl: 525.00, pnlPercent: 1.32 },
]

export const copyTraders: CopyTrader[] = [
  { id: "ct-1", name: "Alexander Pierce", avatar: "AP", return30d: 18.5, returnAll: 245.3, followers: 1245, trades: 342, winRate: 78.5, riskScore: 4.2 },
  { id: "ct-2", name: "Sarah Chen", avatar: "SC", return30d: 24.2, returnAll: 189.7, followers: 892, trades: 278, winRate: 82.1, riskScore: 3.8 },
  { id: "ct-3", name: "Marcus Johnson", avatar: "MJ", return30d: 12.8, returnAll: 312.4, followers: 2103, trades: 567, winRate: 71.3, riskScore: 5.1 },
  { id: "ct-4", name: "Elena Rodriguez", avatar: "ER", return30d: 31.5, returnAll: 156.8, followers: 634, trades: 198, winRate: 85.2, riskScore: 3.2 },
  { id: "ct-5", name: "David Kim", avatar: "DK", return30d: 15.3, returnAll: 198.6, followers: 1567, trades: 423, winRate: 75.8, riskScore: 4.5 },
]

export const mockTransactions: Transaction[] = [
  { id: "txn-1", type: "deposit", amount: 5000, method: "Credit Card", status: "approved", date: "2026-07-10T09:00:00Z", userId: "u-1", userEmail: "trader@example.com" },
  { id: "txn-2", type: "deposit", amount: 10000, method: "Bank Transfer", status: "pending", date: "2026-07-13T14:30:00Z", userId: "u-2", userEmail: "pro@example.com" },
  { id: "txn-3", type: "withdrawal", amount: 2500, method: "Skrill", status: "pending", date: "2026-07-13T16:45:00Z", userId: "u-3", userEmail: "crypto@example.com" },
  { id: "txn-4", type: "deposit", amount: 1500, method: "Crypto", status: "approved", date: "2026-07-12T11:20:00Z", userId: "u-4", userEmail: "new@example.com" },
  { id: "txn-5", type: "withdrawal", amount: 8000, method: "Bank Transfer", status: "pending", date: "2026-07-14T08:00:00Z", userId: "u-5", userEmail: "vip@example.com" },
]

export const navLinks = [
  { label: "Trade With Trust", href: "#", children: [
    { label: "Online Security", href: "/security" },
    { label: "Best Pricing & Execution", href: "/pricing" },
    { label: "Award-Winning Service", href: "/awards" },
  ]},
  { label: "Trading Accounts", href: "#", children: [
    { label: "Axi Select", href: "/axi-select" },
    { label: "AI Analyst", href: "/ai-analyst" },
  ]},
  { label: "Markets", href: "/markets", children: [
    { label: "Forex", href: "/markets?cat=forex" },
    { label: "Shares", href: "/markets?cat=stock" },
    { label: "Indices", href: "/markets?cat=index" },
    { label: "Commodities", href: "/markets?cat=commodity" },
    { label: "Crypto CFDs", href: "/markets?cat=crypto" },
  ]},
  { label: "Trading Platforms", href: "#", children: [
    { label: "Axi Trading Platform", href: "/platforms/axi" },
    { label: "Copy Trading App", href: "/copy-trading" },
    { label: "MT4", href: "/platforms/mt4" },
    { label: "MT5", href: "/platforms/mt5" },
  ]},
  { label: "Learn to Trade", href: "#", children: [
    { label: "Axi Academy", href: "/academy" },
    { label: "Free eBooks", href: "/ebooks" },
    { label: "Trading Glossary", href: "/glossary" },
    { label: "Axi Blog", href: "/blog" },
  ]},
]

export const heroSlides = [
  {
    title: "Trade 650+ markets on one app",
    subtitle: "Forex, crypto, commodities, share CFDs, ETFs and global indices — all in one place.",
    cta: "Open Account",
    cta2: "Try Free Demo",
    bg: "from-slate-900 to-slate-800",
  },
  {
    title: "Axi Select — Get funded up to $1M",
    subtitle: "Prove your trading skills and earn up to 90% profit share with our funded trader program.",
    cta: "Join Axi Select",
    cta2: "Learn More",
    bg: "from-red-900 to-red-800",
  },
  {
    title: "AI Analyst — Trade smarter",
    subtitle: "Real-time market insights powered by artificial intelligence. Available exclusively on Axi.",
    cta: "Try AI Analyst",
    cta2: "See Features",
    bg: "from-indigo-900 to-indigo-800",
  },
]
