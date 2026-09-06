import { useState } from "react"
import { ArrowDown, ArrowLeftRight, ArrowUp, Send, LockKeyhole } from "lucide-react"
import { toast } from "@/components/ui/toaster"
import { useAuth } from "@/lib/AuthContext"
import type { Instrument } from "@/types"

type Action = "trade" | "swap" | "send"
export default function OrderPanel({ instrument }: { instrument?: Instrument }) {
  const { user } = useAuth()
  const [action, setAction] = useState<Action>("trade")
  const [side, setSide] = useState<"buy" | "sell">("buy")
  const [volume, setVolume] = useState("0.01")
  const [busy, setBusy] = useState(false)
  if (!instrument) return <div className="grid h-full place-items-center rounded-xl border border-border bg-card text-sm text-muted-foreground">Select an instrument</div>
  const submit = async () => {
    if (!user) return toast("Sign in before using account actions", "error")
    if (!volume || Number(volume) <= 0) return toast("Enter a valid amount", "error")
    setBusy(true)
    try {
      const base = import.meta.env.VITE_TRADING_API_URL
      if (!base) return toast("Trading service is not configured yet", "error")
      const response = await fetch(`${base}/${action}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId: user.id, symbol: instrument.symbol, side, amount: Number(volume) }) })
      if (!response.ok) throw new Error("Request failed")
      toast(`${action === "trade" ? side === "buy" ? "Buy" : "Sell" : action} request submitted`, "success")
    } catch { toast("The production trading service did not accept the request", "error") } finally { setBusy(false) }
  }
  return <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card"><div className="border-b border-border p-4"><p className="text-xs font-medium text-muted-foreground">Trading ticket</p><h2 className="mt-1 text-lg font-bold">{instrument.symbol}</h2><p className="text-xs text-muted-foreground">{instrument.name}</p></div><div className="flex gap-1 border-b border-border p-2">{([['trade','Trade'],['swap','Swap'],['send','Send']] as const).map(([key,label]) => <button key={key} onClick={() => setAction(key)} className={`flex flex-1 items-center justify-center gap-1 rounded-lg py-2 text-xs font-semibold ${action === key ? "bg-[#d71920] text-white" : "text-muted-foreground hover:bg-muted"}`}>{key === 'trade' ? <ArrowUp className="h-3.5 w-3.5" /> : key === 'swap' ? <ArrowLeftRight className="h-3.5 w-3.5" /> : <Send className="h-3.5 w-3.5" />}{label}</button>)}</div><div className="flex-1 space-y-5 p-4">{action === "trade" && <div className="grid grid-cols-2 gap-2"><button onClick={() => setSide("buy")} className={`flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-bold ${side === "buy" ? "bg-green-600 text-white" : "bg-muted text-muted-foreground"}`}><ArrowUp className="h-4 w-4" /> Buy</button><button onClick={() => setSide("sell")} className={`flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-bold ${side === "sell" ? "bg-red-600 text-white" : "bg-muted text-muted-foreground"}`}><ArrowDown className="h-4 w-4" /> Sell</button></div>}<div><label className="text-xs font-medium text-muted-foreground">{action === "trade" ? "Volume" : "Amount"}</label><input value={volume} onChange={(e) => setVolume(e.target.value)} inputMode="decimal" className="mt-1 h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring" /></div>{action === "send" && <div><label className="text-xs font-medium text-muted-foreground">Destination address</label><input placeholder="Enter destination address" className="mt-1 h-11 w-full rounded-lg border border-input bg-background px-3 text-sm" /></div>}<div className="rounded-xl bg-muted/60 p-4 text-xs leading-5 text-muted-foreground">{action === "trade" ? "Orders are sent only to the configured production execution API. No simulated fills or fabricated balances are created." : action === "swap" ? "Swap requests require a connected production liquidity/execution service." : "Send requests require a connected production wallet service."}</div></div><div className="border-t border-border p-4"><button disabled={busy} onClick={submit} className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#d71920] py-3 text-sm font-semibold text-white disabled:opacity-50">{busy ? "Submitting…" : action === "trade" ? `${side === "buy" ? "Buy" : "Sell"} ${instrument.symbol}` : action === "swap" ? "Swap" : "Send"}</button><div className="mt-3 flex items-center gap-2 text-[11px] text-muted-foreground"><LockKeyhole className="h-3.5 w-3.5" /> Production execution only; no demo fills.</div></div></div>
}
