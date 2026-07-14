import { useState } from "react"
import { CreditCard, Banknote, Bitcoin, Wallet, Smartphone, Building2, Landmark, QrCode, Shield, Check, Clock, AlertCircle } from "lucide-react"
import { toast } from "@/components/ui/toaster"
import { cn, formatCurrency } from "@/lib/utils"

interface PaymentMethod {
  key: string
  label: string
  icon: React.ElementType
  desc: string
  time: string
  fee: string
  min: string
  max: string
  currencies: string[]
  popular?: boolean
}

const methods: PaymentMethod[] = [
  { key: "visa", label: "Visa / Mastercard", icon: CreditCard, desc: "Credit & Debit cards", time: "Instant", fee: "0%", min: "$0", max: "$50,000", currencies: ["EUR", "USD", "GBP", "AUD", "CAD"], popular: true },
  { key: "bank", label: "Bank Wire Transfer", icon: Building2, desc: "SWIFT / SEPA / Local", time: "1-3 days", fee: "0%", min: "$100", max: "Unlimited", currencies: ["EUR", "USD", "GBP", "AUD", "CHF", "JPY", "CAD", "NZD", "SGD", "HKD"] },
  { key: "sepa", label: "SEPA Transfer", icon: Landmark, desc: "Euro zone bank transfer", time: "Same day", fee: "0%", min: "$0", max: "$100,000", currencies: ["EUR"], popular: true },
  { key: "skrill", label: "Skrill", icon: Wallet, desc: "E-wallet payment", time: "Instant", fee: "0%", min: "$0", max: "$25,000", currencies: ["EUR", "USD", "GBP", "AUD", "CAD", "CHF", "JPY", "PLN", "HUF", "CZK", "RON", "BGN", "HRK", "TRY", "AED", "SAR", "QAR", "KWD", "BHD", "OMR", "JOD", "LBP", "EGP", "NGN", "KES", "GHS", "INR", "MYR", "THB", "IDR", "PHP", "VND", "BRL", "MXN", "ARS", "CLP", "COP", "PEN", "CNY", "KRW", "RUB", "UAH", "PKR", "BDT"] },
  { key: "neteller", label: "Neteller", icon: Wallet, desc: "E-wallet payment", time: "Instant", fee: "0%", min: "$0", max: "$25,000", currencies: ["EUR", "USD", "GBP", "AUD", "CAD", "CHF", "JPY", "PLN", "HUF", "CZK", "RON", "BGN", "HRK", "TRY", "AED", "SAR", "QAR", "KWD", "BHD", "OMR", "JOD", "LBP", "EGP", "NGN", "KES", "GHS", "INR", "MYR", "THB", "IDR", "PHP", "VND", "BRL", "MXN", "ARS", "CLP", "COP", "PEN", "CNY", "KRW", "RUB", "UAH", "PKR", "BDT"] },
  { key: "crypto", label: "Cryptocurrency", icon: Bitcoin, desc: "BTC, ETH, USDT, USDC", time: "Up to 15 min", fee: "0%", min: "$50", max: "$100,000", currencies: ["BTC", "ETH", "USDT", "USDC"] },
  { key: "applepay", label: "Apple Pay", icon: Smartphone, desc: "Apple device payment", time: "Instant", fee: "0%", min: "$0", max: "$10,000", currencies: ["EUR", "USD", "GBP", "AUD", "CAD", "CHF", "JPY", "NZD", "SGD", "HKD"] },
  { key: "googlepay", label: "Google Pay", icon: Smartphone, desc: "Google device payment", time: "Instant", fee: "0%", min: "$0", max: "$10,000", currencies: ["EUR", "USD", "GBP", "AUD", "CAD", "CHF", "JPY", "NZD", "SGD", "HKD"] },
  { key: "paypal", label: "PayPal", icon: Wallet, desc: "PayPal wallet", time: "Instant", fee: "0%", min: "$0", max: "$15,000", currencies: ["EUR", "USD", "GBP", "AUD", "CAD", "CHF", "JPY", "NZD", "SGD", "HKD"] },
  { key: "trustly", label: "Trustly", icon: QrCode, desc: "Online banking", time: "Instant", fee: "0%", min: "$0", max: "$50,000", currencies: ["EUR", "GBP", "SEK", "NOK", "DKK", "PLN", "CZK", "HUF", "RON", "BGN", "HRK"] },
  { key: "ideal", label: "iDEAL", icon: QrCode, desc: "Netherlands banking", time: "Instant", fee: "0%", min: "$0", max: "$15,000", currencies: ["EUR"] },
  { key: "sofort", label: "Sofort / Klarna", icon: QrCode, desc: "German & EU banking", time: "Instant", fee: "0%", min: "$0", max: "$20,000", currencies: ["EUR", "CHF", "GBP"] },
  { key: "giropay", label: "Giropay", icon: QrCode, desc: "German banking", time: "Instant", fee: "0%", min: "$0", max: "$15,000", currencies: ["EUR"] },
  { key: "bancontact", label: "Bancontact", icon: QrCode, desc: "Belgian banking", time: "Instant", fee: "0%", min: "$0", max: "$10,000", currencies: ["EUR"] },
  { key: "eps", label: "EPS", icon: QrCode, desc: "Austrian banking", time: "Instant", fee: "0%", min: "$0", max: "$10,000", currencies: ["EUR"] },
  { key: "multibanco", label: "Multibanco", icon: QrCode, desc: "Portuguese banking", time: "Instant", fee: "0%", min: "$0", max: "$10,000", currencies: ["EUR"] },
  { key: "p24", label: "Przelewy24", icon: QrCode, desc: "Polish banking", time: "Instant", fee: "0%", min: "$0", max: "$10,000", currencies: ["EUR", "PLN"] },
  { key: "blik", label: "BLIK", icon: Smartphone, desc: "Polish mobile payment", time: "Instant", fee: "0%", min: "$0", max: "$5,000", currencies: ["PLN"] },
  { key: "payu", label: "PayU", icon: Wallet, desc: "Global payment gateway", time: "Instant", fee: "0%", min: "$0", max: "$25,000", currencies: ["EUR", "USD", "GBP", "AUD", "CAD", "CHF", "JPY", "PLN", "HUF", "CZK", "RON", "BGN", "HRK", "TRY", "AED", "SAR", "QAR", "KWD", "BHD", "OMR", "JOD", "LBP", "EGP", "NGN", "KES", "GHS", "INR", "MYR", "THB", "IDR", "PHP", "VND", "BRL", "MXN", "ARS", "CLP", "COP", "PEN", "CNY", "KRW", "RUB", "UAH", "PKR", "BDT"] },
]

export default function Deposit() {
  const [amount, setAmount] = useState("")
  const [method, setMethod] = useState("visa")
  const [loading, setLoading] = useState(false)
  const [currency, setCurrency] = useState("EUR")
  const [showAll, setShowAll] = useState(false)

  const selectedMethod = methods.find((m) => m.key === method)
  const displayMethods = showAll ? methods : methods.slice(0, 8)

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    setLoading(false)
    toast(`Deposit request of ${currency} ${amount} via ${selectedMethod?.label} submitted for admin approval`, "success")
    setAmount("")
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-2xl font-bold mb-2">Deposit Funds</h1>
      <p className="text-muted-foreground mb-6">Add funds to your trading account. All deposits are processed after admin approval.</p>

      <div className="bg-card border border-border rounded-lg p-6">
        <div className="mb-6">
          <label className="text-sm font-medium mb-2 block">Select Payment Method</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
            {displayMethods.map((m) => (
              <button key={m.key} onClick={() => setMethod(m.key)} className={cn("relative p-3 rounded-lg border text-left transition-all", method === m.key ? "border-red-600 bg-red-50 dark:bg-red-900/10" : "border-border hover:bg-muted")}>
                {m.popular && <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-red-600 text-white text-[8px] rounded-full font-bold">POPULAR</span>}
                <m.icon className={cn("w-5 h-5 mb-1.5", method === m.key ? "text-red-600" : "text-muted-foreground")} />
                <div className="font-semibold text-xs">{m.label}</div>
                <div className="text-[9px] text-muted-foreground">{m.desc}</div>
              </button>
            ))}
          </div>
          {!showAll && (
            <button onClick={() => setShowAll(true)} className="text-xs text-red-600 font-medium hover:underline">Show all {methods.length} methods</button>
          )}
        </div>

        <form onSubmit={handleDeposit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Amount</label>
              <div className="flex mt-1">
                <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="h-10 px-2 rounded-l-md border border-r-0 border-input bg-muted text-sm font-medium">
                  <option value="EUR">€</option>
                  <option value="USD">$</option>
                  <option value="GBP">£</option>
                  <option value="AUD">A$</option>
                  <option value="CAD">C$</option>
                  <option value="CHF">Fr</option>
                  <option value="JPY">¥</option>
                  <option value="NZD">NZ$</option>
                  <option value="SGD">S$</option>
                  <option value="HKD">HK$</option>
                  <option value="ZAR">R</option>
                  <option value="PLN">zł</option>
                  <option value="SEK">kr</option>
                  <option value="NOK">kr</option>
                  <option value="DKK">kr</option>
                  <option value="HUF">Ft</option>
                  <option value="CZK">Kč</option>
                  <option value="RON">lei</option>
                  <option value="BGN">лв</option>
                  <option value="HRK">kn</option>
                  <option value="TRY">₺</option>
                  <option value="AED">د.إ</option>
                  <option value="SAR">﷼</option>
                  <option value="QAR">﷼</option>
                  <option value="KWD">د.ك</option>
                  <option value="BHD">د.ب</option>
                  <option value="OMR">﷼</option>
                  <option value="JOD">د.ا</option>
                  <option value="LBP">ل.ل</option>
                  <option value="EGP">£E</option>
                  <option value="NGN">₦</option>
                  <option value="KES">KSh</option>
                  <option value="GHS">₵</option>
                  <option value="INR">₹</option>
                  <option value="MYR">RM</option>
                  <option value="THB">฿</option>
                  <option value="IDR">Rp</option>
                  <option value="PHP">₱</option>
                  <option value="VND">₫</option>
                  <option value="BRL">R$</option>
                  <option value="MXN">$</option>
                  <option value="ARS">$</option>
                  <option value="CLP">$</option>
                  <option value="COP">$</option>
                  <option value="PEN">S/</option>
                  <option value="CNY">¥</option>
                  <option value="KRW">₩</option>
                  <option value="RUB">₽</option>
                  <option value="UAH">₴</option>
                  <option value="PKR">₨</option>
                  <option value="BDT">৳</option>
                </select>
                <input type="number" min="1" required value={amount} onChange={(e) => setAmount(e.target.value)} className="flex-1 h-10 px-3 rounded-r-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring" placeholder="0.00" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Account Type</label>
              <select className="w-full mt-1 h-10 px-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring">
                <option>Standard Account</option>
                <option>Pro Account</option>
                <option>Elite Account</option>
              </select>
            </div>
          </div>

          {selectedMethod && (
            <div className="p-3 bg-muted rounded-lg text-sm space-y-1">
              <div className="flex items-center gap-1 text-muted-foreground"><Clock className="w-3.5 h-3.5" /> Processing time: <span className="font-medium text-foreground">{selectedMethod.time}</span></div>
              <div className="flex items-center gap-1 text-muted-foreground"><Shield className="w-3.5 h-3.5" /> Fee: <span className="font-medium text-foreground">{selectedMethod.fee}</span></div>
              <div className="flex items-center gap-1 text-muted-foreground"><Banknote className="w-3.5 h-3.5" /> Min: <span className="font-medium text-foreground">{selectedMethod.min}</span> | Max: <span className="font-medium text-foreground">{selectedMethod.max}</span></div>
            </div>
          )}

          <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg text-sm flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 shrink-0" />
            <div className="text-yellow-800 dark:text-yellow-200">
              <p className="font-medium">Admin Approval Required</p>
              <p className="text-xs">All deposits are subject to admin approval. You will receive an email confirmation once processed.</p>
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full h-10 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
            <Check className="w-4 h-4" /> {loading ? "Processing..." : "Submit Deposit Request"}
          </button>
        </form>
      </div>
    </div>
  )
}
