import { Link } from "react-router-dom"
import { Copy, ShieldCheck } from "lucide-react"

export default function CopyTrading() {
  return <div className="container mx-auto px-4 py-16"><div className="mx-auto max-w-2xl text-center"><div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-red-50 text-red-600 dark:bg-red-950/30"><Copy className="h-7 w-7" /></div><h1 className="mt-6 text-3xl font-bold">Copy Trading</h1><p className="mt-4 leading-7 text-muted-foreground">The client does not ship with invented traders, returns, followers or performance statistics. Connect the production copy-trading service to populate this area with verified provider data.</p><div className="mt-7 flex justify-center gap-3"><Link to="/register" className="rounded-lg bg-[#d71920] px-6 py-3 text-sm font-semibold text-white hover:bg-[#b9141a]">Open Account</Link><Link to="/help-center" className="rounded-lg border border-border px-6 py-3 text-sm font-semibold hover:bg-muted">Learn More</Link></div><div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground"><ShieldCheck className="h-4 w-4 text-red-600" /> No fabricated performance data</div></div></div>
}
