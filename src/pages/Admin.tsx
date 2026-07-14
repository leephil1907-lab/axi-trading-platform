import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Check, X, Shield, Users, DollarSign, TrendingUp, Clock, AlertCircle, Search, Filter, Download } from "lucide-react"
import { useAuth } from "@/lib/AuthContext"
import { mockTransactions } from "@/lib/data"
import { toast } from "@/components/ui/toaster"
import { cn, formatCurrency } from "@/lib/utils"

export default function Admin() {
  const { user, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [transactions, setTransactions] = useState(mockTransactions)
  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")

  if (!isAdmin) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <Shield className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold mb-2">Admin Access Required</h1>
        <p className="text-muted-foreground mb-6">You do not have permission to view this page. Admin email: Kaspertrading9@gmail.com</p>
        <button onClick={() => navigate("/")} className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Go Home</button>
      </div>
    )
  }

  const filtered = transactions.filter((t) => {
    const matchStatus = filter === "all" || t.status === filter
    const matchType = typeFilter === "all" || t.type === typeFilter
    const matchSearch = t.userEmail.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase()) || t.method.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchType && matchSearch
  })

  const pendingCount = transactions.filter((t) => t.status === "pending").length
  const approvedCount = transactions.filter((t) => t.status === "approved").length
  const totalApproved = transactions.filter((t) => t.status === "approved").reduce((s, t) => s + t.amount, 0)
  const totalPending = transactions.filter((t) => t.status === "pending").reduce((s, t) => s + t.amount, 0)

  const updateStatus = (id: string, status: "approved" | "rejected") => {
    setTransactions((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)))
    toast(`Transaction ${status}`, "success")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2"><Shield className="w-6 h-6" /> Admin Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-card border border-border rounded-lg p-4"><div className="text-sm text-muted-foreground mb-1 flex items-center gap-1"><Users className="w-4 h-4" /> Total Users</div><div className="text-2xl font-bold">1,245</div></div>
        <div className="bg-card border border-border rounded-lg p-4"><div className="text-sm text-muted-foreground mb-1 flex items-center gap-1"><DollarSign className="w-4 h-4" /> Approved Volume</div><div className="text-2xl font-bold font-mono">{formatCurrency(totalApproved)}</div></div>
        <div className="bg-card border border-border rounded-lg p-4"><div className="text-sm text-muted-foreground mb-1 flex items-center gap-1"><Clock className="w-4 h-4" /> Pending</div><div className="text-2xl font-bold text-orange-600">{pendingCount}</div></div>
        <div className="bg-card border border-border rounded-lg p-4"><div className="text-sm text-muted-foreground mb-1 flex items-center gap-1"><TrendingUp className="w-4 h-4" /> Pending Value</div><div className="text-2xl font-bold font-mono text-orange-600">{formatCurrency(totalPending)}</div></div>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-3 justify-between">
          <div className="flex items-center gap-2 flex-1">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by email, ID, or method..." className="flex-1 h-9 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div className="flex gap-2">
            <select value={filter} onChange={(e) => setFilter(e.target.value)} className="h-9 px-3 rounded-md border border-input bg-background text-sm">
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="h-9 px-3 rounded-md border border-input bg-background text-sm">
              <option value="all">All Types</option>
              <option value="deposit">Deposit</option>
              <option value="withdrawal">Withdrawal</option>
            </select>
            <button className="h-9 px-3 rounded-md border border-input bg-muted hover:bg-muted/80 flex items-center gap-1 text-sm"><Download className="w-4 h-4" /> Export</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50"><tr><th className="text-left px-4 py-3 font-medium">ID</th><th className="text-left px-4 py-3 font-medium">Type</th><th className="text-right px-4 py-3 font-medium">Amount</th><th className="text-left px-4 py-3 font-medium">Method</th><th className="text-left px-4 py-3 font-medium">User</th><th className="text-left px-4 py-3 font-medium">Date</th><th className="text-left px-4 py-3 font-medium">Status</th><th className="px-4 py-3"></th></tr></thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs">{t.id}</td>
                  <td className="px-4 py-3 capitalize"><span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", t.type === "deposit" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700")}>{t.type}</span></td>
                  <td className="px-4 py-3 text-right font-mono">{formatCurrency(t.amount)}</td>
                  <td className="px-4 py-3">{t.method}</td>
                  <td className="px-4 py-3 text-xs">{t.userEmail}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{new Date(t.date).toLocaleDateString()}</td>
                  <td className="px-4 py-3"><span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", t.status === "approved" ? "bg-green-100 text-green-700" : t.status === "rejected" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700")}>{t.status}</span></td>
                  <td className="px-4 py-3">
                    {t.status === "pending" && (
                      <div className="flex gap-1">
                        <button onClick={() => updateStatus(t.id, "approved")} className="p-1.5 text-green-600 hover:bg-green-100 rounded-md" title="Approve"><Check className="w-4 h-4" /></button>
                        <button onClick={() => updateStatus(t.id, "rejected")} className="p-1.5 text-red-600 hover:bg-red-100 rounded-md" title="Reject"><X className="w-4 h-4" /></button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
