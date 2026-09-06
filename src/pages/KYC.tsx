import { useState } from "react"
import { CheckCircle2, Clock3, ShieldCheck, Upload } from "lucide-react"
import { useAuth } from "@/lib/AuthContext"
import { toast } from "@/components/ui/toaster"

const KYC_KEY = "axi_kyc_status"
export default function KYC() {
  const { user } = useAuth()
  const [status, setStatus] = useState(() => localStorage.getItem(KYC_KEY) || "not_started")
  const [country, setCountry] = useState("")
  const [document, setDocument] = useState("")
  const submit = () => {
    if (!country || !document) return toast("Select your country and document type", "error")
    localStorage.setItem(KYC_KEY, "pending")
    setStatus("pending")
    toast("KYC application submitted for review", "success")
  }
  return <div className="container mx-auto max-w-3xl px-4 py-10"><div className="mb-8"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">Account verification</p><h1 className="mt-2 text-3xl font-bold">Identity verification</h1><p className="mt-2 text-sm text-muted-foreground">Complete verification before regulated account features are enabled.</p></div><div className="rounded-2xl border border-border bg-card p-6"><div className="flex items-center gap-3 border-b border-border pb-5"><ShieldCheck className="h-7 w-7 text-red-600" /><div><p className="font-semibold">{user?.email}</p><p className="text-sm text-muted-foreground">Verification status</p></div><span className="ml-auto rounded-full bg-muted px-3 py-1 text-xs font-semibold capitalize">{status.replace("_", " ")}</span></div>{status === "approved" ? <div className="py-12 text-center"><CheckCircle2 className="mx-auto h-12 w-12 text-green-600" /><h2 className="mt-4 text-xl font-bold">Verification complete</h2><p className="mt-2 text-sm text-muted-foreground">Your identity verification has been approved.</p></div> : <div className="space-y-5 pt-6"><div><label className="text-sm font-medium">Country of residence</label><select value={country} onChange={(e) => setCountry(e.target.value)} className="mt-1.5 h-11 w-full rounded-lg border border-input bg-background px-3"><option value="">Select country</option><option>Nigeria</option><option>United Kingdom</option><option>United States</option><option>Other</option></select></div><div><label className="text-sm font-medium">Identity document</label><select value={document} onChange={(e) => setDocument(e.target.value)} className="mt-1.5 h-11 w-full rounded-lg border border-input bg-background px-3"><option value="">Select document</option><option>Passport</option><option>National ID</option><option>Driving licence</option></select></div><div className="rounded-xl border border-dashed border-border bg-muted/30 p-5"><div className="flex items-center gap-3"><Upload className="h-5 w-5 text-muted-foreground" /><div><p className="text-sm font-semibold">Document upload</p><p className="text-xs text-muted-foreground">The production KYC provider should receive the actual document securely. This frontend does not upload identity documents to local storage.</p></div></div></div><button disabled={status === "pending"} onClick={submit} className="w-full rounded-lg bg-[#d71920] py-3 text-sm font-semibold text-white disabled:opacity-50">{status === "pending" ? "Under review" : "Submit verification"}</button>{status === "pending" && <div className="flex items-center gap-2 text-sm text-muted-foreground"><Clock3 className="h-4 w-4" /> Awaiting compliance review.</div>}</div>}</div></div>
}
