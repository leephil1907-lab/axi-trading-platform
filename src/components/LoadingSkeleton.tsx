export default function LoadingSkeleton({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background px-4 py-8">
      <div className="mx-auto max-w-6xl animate-pulse space-y-5">
        <div className="h-8 w-52 rounded-md bg-muted" />
        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => <div key={index} className="h-28 rounded-xl border border-border bg-card" />)}
        </div>
        <div className="h-72 rounded-xl border border-border bg-card" />
        <p className="text-center text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  )
}
