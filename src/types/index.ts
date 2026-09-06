export interface Instrument {
  symbol: string
  name: string
  category: "forex" | "crypto" | "commodity" | "index" | "stock"
  bid?: number
  ask?: number
  change?: number
  changePercent?: number
  spread?: number
  icon?: string
}

export interface Position {
  id: string
  symbol: string
  name: string
  type: "buy" | "sell"
  volume: number
  entryPrice: number
  currentPrice: number
  stopLoss?: number
  takeProfit?: number
  openTime: string
  pnl: number
  pnlPercent: number
}

export interface TradeOrder {
  symbol: string
  type: "market" | "limit" | "stop"
  side: "buy" | "sell"
  volume: number
  price?: number
  stopLoss?: number
  takeProfit?: number
}

export interface User {
  id: string
  email: string
  name: string
  balance: number
  equity: number
  margin: number
  freeMargin: number
  marginLevel: number
  openPositions: number
  totalTrades: number
  isAdmin: boolean
}

export interface Transaction {
  id: string
  type: "deposit" | "withdrawal"
  amount: number
  method: string
  status: "pending" | "approved" | "rejected"
  date: string
  userId: string
  userEmail: string
}

export interface CopyTrader {
  id: string
  name: string
  avatar: string
  return30d: number
  returnAll: number
  followers: number
  trades: number
  winRate: number
  riskScore: number
}
