import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft, ArrowRight, Check, Eye, EyeOff, ShieldCheck } from "lucide-react"
import { useAuth } from "@/lib/AuthContext"
import { toast } from "@/components/ui/toaster"

const steps = ["Country", "Your details", "Secure account"]

export default function RegisterWizard() {
  const [step, setStep] = useState(1)
  const [country, setCountry] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [show, setShow] = useState(false)
  const [terms, setTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const next = () => {
    if (step === 1 && !country) return toast("Select your country of residence", "error")
    if (step === 2 && (!name.trim() || !email.includes("@"))) return toast("Enter your name and a valid email", "error")
    setStep((current) => Math.min(3, current + 1))
  }

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (password.length < 8) return toast("Password must contain at least 8 characters", "error")
    if (!terms) return toast("Accept the account terms to continue", "error")
    setLoading(true)
    const ok = await register({ name, email, password })
    setLoading(false)
    if (!ok) return toast("An account with this email already exists", "error")
    toast("Account created", "success")
    navigate("/dashboard")
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-muted/30 px-4 py-10">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
        <div className="grid lg:grid-cols-[.85fr_1.15fr]">
          <div className="hidden bg-slate-950 p-10 text-white lg:block">
            <div className="grid h-10 w-10 place-items-center rounded-md bg-[#d71920] font-black">A</div>
            <h1 className="mt-10 text-3xl font-bold">Create your account.</h1>
            <p className="mt-4 text-sm leading-6 text-slate-400">A guided setup keeps the account opening flow simple and gives you a clear next step at every stage.</p>
            <div className="mt-10 space-y-4">
              {steps.map((label, index) => (
                <div key={label} className="flex items-center gap-3">
                  <span className={`grid h-8 w-8 place-items-center rounded-full border text-xs font-bold ${step > index + 1 ? "border-red-500 bg-red-500 text-white" : step === index + 1 ? "border-red-500 text-red-400" : "border-white/20 text-slate-500"}`}>
                    {step > index + 1 ? <Check className="h-4 w-4" /> : index + 1}
                  </span>
                  <span className={step === index + 1 ? "font-semibold" : "text-slate-500"}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-7 sm:p-10">
            <div className="mb-7 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-red-600">Open an account</p>
                <h2 className="mt-2 text-2xl font-bold">{steps[step - 1]}</h2>
              </div>
              <span className="text-xs text-muted-foreground">Step {step} of 3</span>
            </div>

            <div className="mb-8 h-1.5 overflow-hidden rounded-full bg-muted">
              <div className="h-full bg-[#d71920] transition-all duration-300" style={{ width: `${(step / 3) * 100}%` }} />
            </div>

            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <label className="text-sm font-medium">Country of residence</label>
                  <select value={country} onChange={(event) => setCountry(event.target.value)} className="mt-1.5 h-11 w-full rounded-lg border border-input bg-background px-3 outline-none focus:ring-2 focus:ring-ring">
                    <option value="">Select country</option>
                    <option>Nigeria</option>
                    <option>United Kingdom</option>
                    <option>United States</option>
                    <option>Australia</option>
                    <option>Germany</option>
                    <option>France</option>
                    <option>South Africa</option>
                    <option>Canada</option>
                    <option>United Arab Emirates</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="rounded-xl border border-border bg-muted/40 p-4 text-sm text-muted-foreground">Your country of residence determines the account information and verification steps shown during onboarding.</div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <label className="text-sm font-medium">Full name</label>
                  <input value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" className="mt-1.5 h-11 w-full rounded-lg border border-input bg-background px-3 outline-none focus:ring-2 focus:ring-ring" />
                </div>
                <div>
                  <label className="text-sm font-medium">Email address</label>
                  <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" className="mt-1.5 h-11 w-full rounded-lg border border-input bg-background px-3 outline-none focus:ring-2 focus:ring-ring" />
                </div>
              </div>
            )}

            {step === 3 && (
              <form onSubmit={submit} className="space-y-5">
                <div>
                  <label className="text-sm font-medium">Create password</label>
                  <div className="relative mt-1.5">
                    <input type={show ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="new-password" className="h-11 w-full rounded-lg border border-input bg-background px-3 pr-11 outline-none focus:ring-2 focus:ring-ring" />
                    <button type="button" onClick={() => setShow((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-label={show ? "Hide password" : "Show password"}>
                      {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">Use at least 8 characters.</p>
                </div>
                <label className="flex items-start gap-3 rounded-xl border border-border p-4 text-sm">
                  <input type="checkbox" checked={terms} onChange={(event) => setTerms(event.target.checked)} className="mt-0.5 h-4 w-4 accent-red-600" />
                  <span>I agree to the account terms and acknowledge that additional verification may be required.</span>
                </label>
                <button disabled={loading} className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#d71920] font-semibold text-white hover:bg-[#b9141a] disabled:opacity-60">
                  {loading ? "Creating account…" : "Create account"}<ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}

            {step < 3 && (
              <div className="mt-8 flex justify-end">
                <button onClick={next} className="flex items-center gap-2 rounded-lg bg-[#d71920] px-6 py-3 text-sm font-semibold text-white hover:bg-[#b9141a]">Continue <ArrowRight className="h-4 w-4" /></button>
              </div>
            )}
            {step > 1 && (
              <button onClick={() => setStep((value) => value - 1)} className="mt-4 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Back</button>
            )}

            <div className="mt-7 flex items-center gap-2 border-t border-border pt-6 text-xs text-muted-foreground"><ShieldCheck className="h-4 w-4 text-red-600" /> Account creation uses the authenticated client session.</div>
            <p className="mt-5 text-center text-sm text-muted-foreground">Already have an account? <Link to="/login" className="font-semibold text-red-600 hover:underline">Log in</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}
