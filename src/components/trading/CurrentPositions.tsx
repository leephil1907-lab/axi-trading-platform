import { LockKeyhole } from "lucide-react"

export default function CurrentPositions() {
  return <div className="flex h-full items-center justify-center rounded-xl border border-border bg-card p-5"><div className="text-center"><LockKeyhole className="mx-auto h-5 w-5 text-muted-foreground" /><h3 className="mt-2 text-sm font-semibold">Open positions</h3><p className="mt-1 max-w-sm text-xs leading-5 text-muted-foreground">No positions are seeded into the client. Live positions will appear here when the production trading account API is connected.</p></div></div>
}
