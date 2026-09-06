import { Activity } from "lucide-react"

export default function PositionTracker() {
  return <div className="rounded-xl border border-border bg-card p-4"><div className="flex items-center gap-2"><Activity className="h-4 w-4 text-muted-foreground" /><span className="text-sm font-semibold">Account activity</span></div><p className="mt-2 text-xs leading-5 text-muted-foreground">Live account activity will populate after the trading account service is connected.</p></div>
}
