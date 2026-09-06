import { useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Check, Clipboard, Download, Loader2, Upload, WalletCards } from "lucide-react"
import { configuredCryptoNetworks } from "@/lib/crypto"
import { toast } from "@/components/ui/toaster"
import { cn } from "@/lib/utils"

type Mode = "deposit" | "withdraw"

export default function Funding({ initialMode = "deposit" }: { initialMode?: Mode }) {
  const [params] = useSearchParams()
  const [mode, setMode] = useState<Mode>(params.get("mode") === "withdraw" ? "withdraw" : initialMode)
  const [asset, setAsset] = useState("")
  const [amount, setAmount] = useState("")
  const [txHash, setTxHash] = useState("")
  const [destination, setDestination] = useState("")
  const [loading, setLoading] = useState(false)
  const wallets = configuredCryptoNetworks()
  const selected = useMemo(() => wallets.find((wallet) => `${wallet.asset}-${wallet.network}` === asset) || wallets[0], [wallets, asset])

  const copyAddress = async () => { if (!selected?.address) return; await navigator.clipboard.writeText(selected.address); toast("Wallet address copied", "success") }
  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!selected) return toast("No crypto wallet is configured yet", "error")
    if (!amount || Number(amount) <= 0) return toast("Enter a valid amount", "error")
    if (mode === "deposit" && !txHash.trim()) return toast("Enter the transaction hash after sending the crypto", "error")
    if (mode === "withdraw" && !destination.trim()) return toast("Enter your destination wallet address", "error")
    const endpoint = String(import.meta.env.VITE_FUNDING_API_URL || "").trim()
    if (!endpoint) return toast("Funding API is not configured yet", "error")
    setLoading(true)
    try {
      const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ mode, asset: selected.asset, network: selected.network, amount, transactionHash: txHash || undefined, destinationAddress: destination || undefined }) })
      if (!response.ok) throw new Error("Funding request failed")
      toast(`${mode === "deposit" ? "Deposit" : "Withdrawal"} request submitted`, "success")
      setAmount(""); setTxHash(""); setDestination("")
    } catch { toast("Funding request could not be submitted", "error") } finally { setLoading(false) }
  }

  return <div className="container mx-auto max-w-4xl px-4 py-10"><div className="mb-8"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">Funding</p><h1 className="mt-2 text-3xl font-bold">Deposit & withdraw crypto</h1><p className="mt-2 text-sm text-muted-foreground">Only configured cryptocurrency networks are shown. No fiat payment methods or placeholder wallet addresses are included.</p></div><div className="mb-6 grid grid-cols-2 rounded-xl border border-border bg-muted p-1"><button onClick={() => setMode("deposit")} className={cn("rounded-lg py-2.5 text-sm font-semibold", mode === "deposit" ? "bg-card shadow-sm" : "text-muted-foreground")}>Deposit</button><button onClick={() => setMode("withdraw")} className={cn("rounded-lg py-2.5 text-sm font-semibold", mode === "withdraw" ? "bg-card shadow-sm" : "text-muted-foreground")}>Withdraw</button></div>
    {!wallets.length ? <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center"><WalletCards className="mx-auto h-8 w-8 text-muted-foreground" /><h2 className="mt-4 font-semibold">Crypto wallets are not configured</h2><p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">Add the supplied production wallet addresses through the environment configuration before users can fund accounts.</p></div> : <div className="grid gap-6 lg:grid-cols-[1fr_.9fr]"><div className="rounded-2xl border border-border bg-card p-6"><form onSubmit={submit} className="space-y-5"><div><label className="text-sm font-medium">Asset & network</label><select value={asset || `${wallets[0].asset}-${wallets[0].network}`} onChange={(e) => setAsset(e.target.value)} className="mt-1.5 h-11 w-full rounded-lg border border-input bg-background px-3 outline-none focus:ring-2 focus:ring-ring">{wallets.map((wallet) => <option key={`${wallet.asset}-${wallet.network}`} value={`${wallet.asset}-${wallet.network}`}>{wallet.asset} · {wallet.network}</option>)}</select></div><div><label className="text-sm font-medium">Amount</label><input type="number" min="0" step="any" value={amount} onChange={(e) => setAmount(e.target.value)} className="mt-1.5 h-11 w-full rounded-lg border border-input bg-background px-3 outline-none focus:ring-2 focus:ring-ring" placeholder="0.00" /></div>{mode === "deposit" ? <div><label className="text-sm font-medium">Transaction hash</label><input value={txHash} onChange={(e) => setTxHash(e.target.value)} className="mt-1.5 h-11 w-full rounded-lg border border-input bg-background px-3 font-mono text-xs outline-none focus:ring-2 focus:ring-ring" placeholder="Paste the blockchain transaction hash" /></div> : <div><label className="text-sm font-medium">Destination wallet</label><input value={destination} onChange={(e) => setDestination(e.target.value)} className="mt-1.5 h-11 w-full rounded-lg border border-input bg-background px-3 font-mono text-xs outline-none focus:ring-2 focus:ring-ring" placeholder="Enter your receiving address" /></div>}<button disabled={loading} className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#d71920] font-semibold text-white hover:bg-[#b9141a] disabled:opacity-60">{loading ? <Loader2 className="h-4 w-4 animate-spin" /> : mode === "deposit" ? <Upload className="h-4 w-4" /> : <Download className="h-4 w-4" />}{loading ? "Submitting…" : `Request ${mode}`}</button></form></div><div className="rounded-2xl border border-border bg-card p-6"><p className="text-sm font-semibold">{mode === "deposit" ? "Send crypto to" : "Selected network"}</p>{mode === "deposit" && <><div className="mt-4 rounded-xl bg-muted p-4"><p className="text-xs text-muted-foreground">{selected?.asset} · {selected?.network}</p><p className="mt-2 break-all font-mono text-sm">{selected?.address}</p></div><button onClick={copyAddress} className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-border py-2.5 text-sm font-semibold hover:bg-muted"><Clipboard className="h-4 w-4" /> Copy address</button></>}<div className="mt-5 space-y-3 text-sm text-muted-foreground"><p className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" /> Verify the network before sending.</p><p className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" /> Only send the selected asset on its displayed network.</p><p className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" /> Requests are submitted to the configured production funding API.</p></div></div></div>}
  </div>
}
