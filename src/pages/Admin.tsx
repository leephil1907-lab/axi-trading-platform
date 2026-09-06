import { useMemo, useState, type ReactNode } from "react"
import { Link } from "react-router-dom"
import { Activity, ArrowLeft, BarChart3, Building2, CheckCircle2, ChevronRight, CircleDollarSign, CreditCard, ExternalLink, FileCheck2, LayoutDashboard, LogOut, Menu, MessageCircle, PanelTop, ShieldCheck, SlidersHorizontal, Users, WalletCards, X } from "lucide-react"
import { configuredCryptoNetworks } from "@/lib/crypto"
import { useAuth } from "@/lib/AuthContext"

const tabs = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "users", label: "Users", icon: Users },
  { id: "kyc", label: "KYC Review", icon: FileCheck2 },
  { id: "funding", label: "Funding Queue", icon: CreditCard },
  { id: "payments", label: "Payment Methods", icon: WalletCards },
  { id: "wallets", label: "Wallet & Config", icon: Building2 },
  { id: "pnl", label: "P&L Control", icon: BarChart3 },
  { id: "editor", label: "Live Site Editor", icon: PanelTop },
  { id: "integration", label: "System Integration", icon: SlidersHorizontal },
  { id: "activity", label: "Activity Log", icon: Activity },
] as const

type TabId = (typeof tabs)[number]["id"]

function getLocalAccountCount() {
  try {
    const raw = localStorage.getItem("axi_accounts")
    const accounts = raw ? JSON.parse(raw) : []
    return Array.isArray(accounts) ? accounts.length : 0
  } catch {
    return 0
  }
}

export default function Admin() {
  const { user, logout } = useAuth()
  const wallets = configuredCryptoNetworks()
  const [activeTab, setActiveTab] = useState<TabId>("overview")
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [accountCount] = useState(getLocalAccountCount)
  const active = useMemo(() => tabs.find((tab) => tab.id === activeTab) ?? tabs[0], [activeTab])

  const selectTab = (id: TabId) => {
    setActiveTab(id)
    setMobileNavOpen(false)
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#f4f5f7] text-[#171717] dark:bg-[#0b0d10] dark:text-white">
      <header className="border-b border-[#dedede] bg-white dark:border-white/10 dark:bg-[#111419]">
        <div className="mx-auto flex min-h-[74px] max-w-[1320px] items-center justify-between gap-4 px-5 lg:px-8">
          <div className="flex min-w-0 items-center gap-3 sm:gap-5">
            <Link to="/trading" className="inline-flex items-center gap-2 text-sm font-semibold text-[#343434] hover:text-[#c8102e] dark:text-white/80 dark:hover:text-white"><ArrowLeft className="h-4 w-4" /><span className="hidden sm:inline">Trading</span></Link>
            <span className="h-6 w-px bg-[#d9d9d9] dark:bg-white/10" />
            <div className="flex min-w-0 items-center gap-2.5"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 border-[#c8102e] text-[#c8102e]"><ShieldCheck className="h-4 w-4" /></span><span className="truncate text-base font-extrabold tracking-[-0.02em] sm:text-lg">Admin Dashboard</span></div>
            <span className="hidden items-center gap-1.5 rounded-full bg-[#e8f7ed] px-3 py-1.5 text-xs font-bold text-[#18743c] sm:inline-flex dark:bg-emerald-500/10 dark:text-emerald-300"><span className="h-2 w-2 rounded-full bg-[#1c9a50]" />System Online</span>
          </div>
          <div className="flex items-center gap-2"><button onClick={logout} className="hidden items-center gap-2 rounded-lg border border-[#d9d9d9] bg-white px-4 py-2.5 text-sm font-bold hover:bg-[#f7f7f7] sm:inline-flex dark:border-white/15 dark:bg-[#15191f] dark:hover:bg-white/5"><LogOut className="h-4 w-4" />Sign out</button><button onClick={() => setMobileNavOpen((open) => !open)} aria-label="Toggle admin navigation" className="inline-flex rounded-lg border border-[#ddd] p-2 sm:hidden dark:border-white/15">{mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button></div>
        </div>
      </header>

      <main className="mx-auto max-w-[1320px] px-5 py-7 lg:px-8 lg:py-8">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard icon={<Users className="h-5 w-5" />} iconClass="bg-[#2864dc]" badge={accountCount ? `${accountCount} account${accountCount === 1 ? "" : "s"}` : "No accounts"} value={accountCount.toString()} label="Total Users" />
          <MetricCard icon={<BarChart3 className="h-5 w-5" />} iconClass="bg-[#009a72]" badge="Configured" value="—" label="Trading Accounts" />
          <MetricCard icon={<BarChart3 className="h-5 w-5" />} iconClass="bg-[#df2027]" badge="Live data required" value="—" label="Open Positions" />
          <MetricCard icon={<CircleDollarSign className="h-5 w-5" />} iconClass="bg-[#7834db]" badge="Live ledger required" value="$—" label="Net P&L" />
        </div>

        {mobileNavOpen && <div className="mt-4 rounded-2xl border border-[#ddd] bg-white p-3 shadow-sm dark:border-white/10 dark:bg-[#111419] sm:hidden"><AdminTabList activeTab={activeTab} selectTab={selectTab} /><button onClick={logout} className="mt-2 flex w-full items-center gap-2 rounded-xl px-3 py-3 text-left text-sm font-bold text-[#c8102e] hover:bg-red-50 dark:hover:bg-red-500/10"><LogOut className="h-4 w-4" />Sign out</button></div>}
        <div className="mt-7 hidden border-b border-[#d8d8d8] md:block dark:border-white/10"><AdminTabList activeTab={activeTab} selectTab={selectTab} horizontal /></div>

        <section className="mt-6 overflow-hidden rounded-2xl border border-[#dfdfdf] bg-white shadow-[0_1px_3px_rgba(0,0,0,.03)] dark:border-white/10 dark:bg-[#111419]">
          <div className="border-b border-[#e6e6e6] px-6 py-5 dark:border-white/10 sm:px-7"><div className="flex items-start justify-between gap-4"><div><div className="flex items-center gap-2 text-[#c8102e]"><Activity className="h-5 w-5" /><span className="text-base font-extrabold">{active.id === "overview" ? "Operations overview" : active.label}</span></div><p className="mt-1.5 max-w-3xl text-sm leading-6 text-[#777] dark:text-white/55">{descriptionFor(activeTab)}</p></div><span className="hidden rounded-full bg-[#f1f7f3] px-3 py-1 text-xs font-bold text-[#197541] sm:inline-flex dark:bg-emerald-500/10 dark:text-emerald-300">Production controls</span></div></div>
          {activeTab === "overview" ? <OverviewContent wallets={wallets} onSelect={selectTab} /> : <ManagementPanel tab={activeTab} wallets={wallets} accountCount={accountCount} />}
        </section>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-[#888] dark:text-white/45"><span>Authenticated operator: <strong className="text-[#555] dark:text-white/70">{user?.email || "—"}</strong></span><Link to="/trading" className="inline-flex items-center gap-1 font-bold text-[#c8102e] hover:underline">Open client trading area <ExternalLink className="h-3.5 w-3.5" /></Link></div>
      </main>

      <button type="button" aria-label="Live support" className="fixed bottom-5 right-5 z-30 inline-flex items-center gap-2 rounded-full border-2 border-[#c8102e] bg-[#101216] px-4 py-3 text-left text-white shadow-[0_8px_28px_rgba(0,0,0,.2)] hover:-translate-y-0.5 hover:bg-[#17191e]"><span className="grid h-8 w-8 place-items-center rounded-full bg-[#c8102e]"><MessageCircle className="h-4 w-4" /></span><span className="hidden sm:block"><span className="block text-xs font-extrabold">Live Support</span><span className="block text-[10px] text-white/70">24/7 assistance</span></span></button>
    </div>
  )
}

function MetricCard({ icon, iconClass, badge, value, label }: { icon: ReactNode; iconClass: string; badge: string; value: string; label: string }) {
  return <div className="min-h-[162px] rounded-2xl border border-[#dfdfdf] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,.025)] dark:border-white/10 dark:bg-[#111419]"><div className="flex items-start justify-between gap-3"><span className={`grid h-12 w-12 place-items-center rounded-xl text-white ${iconClass}`}>{icon}</span><span className="rounded-full bg-[#edf8f1] px-2.5 py-1 text-[11px] font-bold text-[#247043] dark:bg-emerald-500/10 dark:text-emerald-300">{badge}</span></div><div className="mt-4 text-3xl font-black tracking-tight">{value}</div><div className="mt-1 text-sm font-semibold text-[#777] dark:text-white/55">{label}</div></div>
}

function AdminTabList({ activeTab, selectTab, horizontal = false }: { activeTab: TabId; selectTab: (id: TabId) => void; horizontal?: boolean }) {
  return <nav className={horizontal ? "flex flex-wrap items-center gap-x-1 gap-y-0" : "space-y-1"} aria-label="Admin sections">{tabs.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => selectTab(id)} className={horizontal ? `relative inline-flex items-center gap-2 px-4 py-3 text-sm font-bold ${activeTab === id ? "text-[#202020] after:absolute after:bottom-[-1px] after:left-2 after:right-2 after:h-[3px] after:bg-[#202020] dark:text-white dark:after:bg-white" : "text-[#999] hover:text-[#333] dark:text-white/45 dark:hover:text-white/80"}` : `flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-bold ${activeTab === id ? "bg-[#f7f7f7] text-[#c8102e] dark:bg-white/5" : "text-[#777] hover:bg-[#f7f7f7] dark:text-white/55 dark:hover:bg-white/5"}`}><Icon className="h-4 w-4 shrink-0" />{label}</button>)}</nav>
}

function OverviewContent({ wallets, onSelect }: { wallets: ReturnType<typeof configuredCryptoNetworks>; onSelect: (id: TabId) => void }) {
  return <div className="p-6 sm:p-7"><div className="grid gap-3 lg:grid-cols-3"><QuickAction icon={<CreditCard className="h-5 w-5" />} title="Review funding" description="Open the persisted funding queue" onClick={() => onSelect("funding")} /><QuickAction icon={<Users className="h-5 w-5" />} title="Manage users" description="Accounts, balances and controls" onClick={() => onSelect("users")} /><QuickAction icon={<CheckCircle2 className="h-5 w-5" />} title="Review KYC" description="Open verification management" onClick={() => onSelect("kyc")} /></div><div className="mt-7"><div className="mb-3 flex items-center justify-between"><h3 className="text-base font-extrabold">Recent activity</h3><button onClick={() => onSelect("activity")} className="text-sm font-extrabold text-[#c8102e] hover:underline">View all</button></div><div className="overflow-x-auto rounded-xl border border-[#e5e5e5] dark:border-white/10"><div className="grid min-w-[720px] grid-cols-[1.1fr_1.3fr_1.5fr_1fr] bg-[#f8f7f2] px-4 py-3 text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#858585] dark:bg-white/5"><span>Actor</span><span>Action</span><span>Target</span><span>When</span></div><div className="flex min-h-[108px] items-center justify-center px-5 text-center text-sm text-[#8a8a8a] dark:text-white/45">No persisted admin activity is available yet. Actions will appear here when connected to the production audit log.</div></div></div><div className="mt-7 rounded-xl border border-dashed border-[#d6d6d6] p-5 dark:border-white/10"><div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-extrabold">Wallet configuration</p><p className="mt-1 text-sm text-[#777] dark:text-white/50">{wallets.length ? `${wallets.length} configured crypto network${wallets.length === 1 ? "" : "s"}.` : "No deposit addresses are configured yet."}</p></div><button onClick={() => onSelect("wallets")} className="inline-flex items-center gap-2 text-sm font-extrabold text-[#c8102e]">Manage wallets <ChevronRight className="h-4 w-4" /></button></div></div></div>
}

function QuickAction({ icon, title, description, onClick }: { icon: ReactNode; title: string; description: string; onClick: () => void }) {
  return <button onClick={onClick} className="group rounded-xl border border-[#e2e2e2] bg-white p-5 text-left hover:-translate-y-0.5 hover:shadow-sm dark:border-white/10 dark:bg-[#15191f]"><span className="text-[#c8102e]">{icon}</span><div className="mt-3 font-extrabold">{title}</div><div className="mt-1 text-sm text-[#818181] dark:text-white/45">{description}</div><span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#c8102e] opacity-0 transition group-hover:opacity-100">Open <ChevronRight className="h-3.5 w-3.5" /></span></button>
}

function ManagementPanel({ tab, wallets, accountCount }: { tab: Exclude<TabId, "overview">; wallets: ReturnType<typeof configuredCryptoNetworks>; accountCount: number }) {
  if (tab === "wallets") return <div className="space-y-3 p-6 sm:p-7">{wallets.length ? wallets.map((wallet) => <div key={`${wallet.asset}-${wallet.network}`} className="flex flex-col gap-2 rounded-xl border border-[#e3e3e3] p-4 sm:flex-row sm:items-center sm:justify-between dark:border-white/10"><div><p className="font-extrabold">{wallet.asset} · {wallet.network}</p><p className="mt-1 text-xs text-[#777] dark:text-white/45">Production deposit address</p></div><span className="break-all rounded-lg bg-[#f7f7f7] px-3 py-2 font-mono text-xs dark:bg-white/5">{wallet.address}</span></div>) : <EmptyState title="No wallet addresses configured" text="Add production wallet addresses through the deployment environment before enabling deposits." />}</div>
  if (tab === "users") return <div className="p-6 sm:p-7"><div className="rounded-xl border border-[#e3e3e3] p-5 dark:border-white/10"><p className="text-3xl font-black">{accountCount}</p><p className="mt-1 text-sm text-[#777] dark:text-white/50">Locally registered accounts currently visible to this client.</p><p className="mt-4 text-xs text-[#999]">For multi-user production management, connect this view to the server-side user ledger.</p></div></div>
  if (tab === "kyc") return <div className="p-6 sm:p-7"><EmptyState title="KYC review queue" text="The verification workflow is available to users. Connect a production KYC provider and review API to populate this queue." action="Open client KYC" onClick={() => window.location.assign("/kyc")} /></div>
  if (tab === "funding") return <div className="p-6 sm:p-7"><EmptyState title="Funding queue" text="No persisted funding records are exposed to this frontend yet. Connect the production funding API to enable review and approval controls." /></div>
  if (tab === "payments") return <div className="p-6 sm:p-7"><EmptyState title="Payment methods" text="Configure the production payment-method service to manage multiple crypto and instant-transfer methods here." /></div>
  if (tab === "pnl") return <div className="p-6 sm:p-7"><EmptyState title="P&L control" text="No fabricated P&L controls are shown. Connect the live trading and accounting ledger before exposing balance or profit adjustments." /></div>
  if (tab === "editor") return <div className="p-6 sm:p-7"><EmptyState title="Live site editor" text="The editor shell is reserved for production content controls so changes can be persisted safely." action="Open client site" onClick={() => window.location.assign("/")} /></div>
  if (tab === "integration") return <div className="p-6 sm:p-7"><EmptyState title="System integration" text="Trading, funding, KYC and ledger services must be configured through production API environment variables before they are marked live." /></div>
  return <div className="p-6 sm:p-7"><EmptyState title="Activity log" text="No persisted audit records are available in the frontend yet. This panel is ready for the production audit-log endpoint." /></div>
}

function EmptyState({ title, text, action, onClick }: { title: string; text: string; action?: string; onClick?: () => void }) {
  return <div className="rounded-xl border border-dashed border-[#d4d4d4] px-6 py-12 text-center dark:border-white/10"><div className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-[#f4f4f4] text-[#777] dark:bg-white/5 dark:text-white/45"><ShieldCheck className="h-5 w-5" /></div><h3 className="mt-4 font-extrabold">{title}</h3><p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-[#777] dark:text-white/50">{text}</p>{action && <button onClick={onClick} className="mt-5 rounded-lg bg-[#c8102e] px-4 py-2.5 text-sm font-extrabold text-white hover:bg-[#a80d26]">{action}</button>}</div>
}

function descriptionFor(tab: TabId) {
  const descriptions: Record<TabId, string> = {
    overview: "Use the dedicated queues for persisted production records. Payment credits should only be applied after external payment verification.",
    users: "Review registered users and connect this area to the production user ledger for account-level management.",
    kyc: "Review identity verification status without storing sensitive identity documents in browser storage.",
    funding: "Review deposits and withdrawals only after the production funding service has persisted and verified the request.",
    payments: "Manage the payment methods displayed to clients, including multiple configured methods per supported asset or channel.",
    wallets: "Manage production wallet and network configuration. Never display or accept fabricated deposit addresses.",
    pnl: "Expose P&L controls only when backed by the live trading and accounting ledger.",
    editor: "Manage publishable site content from a controlled production editor.",
    integration: "Monitor the configuration required for trading, funding, KYC and other production services.",
    activity: "Review the immutable audit trail of administrative actions once the production audit-log service is connected.",
  }
  return descriptions[tab]
}
