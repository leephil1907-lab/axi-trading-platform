import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff, UserPlus, Globe, CreditCard, Check } from "lucide-react"
import { useAuth } from "@/lib/AuthContext"
import { toast } from "@/components/ui/toaster"

const countries = [
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "IT", name: "Italy", flag: "🇮🇹" },
  { code: "ES", name: "Spain", flag: "🇪🇸" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱" },
  { code: "BE", name: "Belgium", flag: "🇧🇪" },
  { code: "AT", name: "Austria", flag: "🇦🇹" },
  { code: "PT", name: "Portugal", flag: "🇵🇹" },
  { code: "IE", name: "Ireland", flag: "🇮🇪" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "NZ", name: "New Zealand", flag: "🇳🇿" },
  { code: "CH", name: "Switzerland", flag: "🇨🇭" },
  { code: "SE", name: "Sweden", flag: "🇸🇪" },
  { code: "NO", name: "Norway", flag: "🇳🇴" },
  { code: "DK", name: "Denmark", flag: "🇩🇰" },
  { code: "FI", name: "Finland", flag: "🇫🇮" },
  { code: "PL", name: "Poland", flag: "🇵🇱" },
  { code: "CZ", name: "Czech Republic", flag: "🇨🇿" },
  { code: "HU", name: "Hungary", flag: "🇭🇺" },
  { code: "RO", name: "Romania", flag: "🇷🇴" },
  { code: "BG", name: "Bulgaria", flag: "🇧🇬" },
  { code: "HR", name: "Croatia", flag: "🇭🇷" },
  { code: "SI", name: "Slovenia", flag: "🇸🇮" },
  { code: "SK", name: "Slovakia", flag: "🇸🇰" },
  { code: "LT", name: "Lithuania", flag: "🇱🇹" },
  { code: "LV", name: "Latvia", flag: "🇱🇻" },
  { code: "EE", name: "Estonia", flag: "🇪🇪" },
  { code: "GR", name: "Greece", flag: "🇬🇷" },
  { code: "CY", name: "Cyprus", flag: "🇨🇾" },
  { code: "MT", name: "Malta", flag: "🇲🇹" },
  { code: "LU", name: "Luxembourg", flag: "🇱🇺" },
  { code: "JP", name: "Japan", flag: "🇯🇵" },
  { code: "SG", name: "Singapore", flag: "🇸🇬" },
  { code: "HK", name: "Hong Kong", flag: "🇭🇰" },
  { code: "AE", name: "UAE", flag: "🇦🇪" },
  { code: "ZA", name: "South Africa", flag: "🇿🇦" },
  { code: "NG", name: "Nigeria", flag: "🇳🇬" },
  { code: "KE", name: "Kenya", flag: "🇰🇪" },
  { code: "GH", name: "Ghana", flag: "🇬🇭" },
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "MY", name: "Malaysia", flag: "🇲🇾" },
  { code: "TH", name: "Thailand", flag: "🇹🇭" },
  { code: "ID", name: "Indonesia", flag: "🇮🇩" },
  { code: "PH", name: "Philippines", flag: "🇵🇭" },
  { code: "VN", name: "Vietnam", flag: "🇻🇳" },
  { code: "BR", name: "Brazil", flag: "🇧🇷" },
  { code: "MX", name: "Mexico", flag: "🇲🇽" },
  { code: "AR", name: "Argentina", flag: "🇦🇷" },
  { code: "CL", name: "Chile", flag: "🇨🇱" },
  { code: "CO", name: "Colombia", flag: "🇨🇴" },
  { code: "PE", name: "Peru", flag: "🇵🇪" },
  { code: "TR", name: "Turkey", flag: "🇹🇷" },
  { code: "IL", name: "Israel", flag: "🇮🇱" },
  { code: "KR", name: "South Korea", flag: "🇰🇷" },
  { code: "CN", name: "China", flag: "🇨🇳" },
  { code: "RU", name: "Russia", flag: "🇷🇺" },
  { code: "UA", name: "Ukraine", flag: "🇺🇦" },
  { code: "PK", name: "Pakistan", flag: "🇵🇰" },
  { code: "BD", name: "Bangladesh", flag: "🇧🇩" },
  { code: "EG", name: "Egypt", flag: "🇪🇬" },
  { code: "SA", name: "Saudi Arabia", flag: "🇸🇦" },
  { code: "QA", name: "Qatar", flag: "🇶🇦" },
  { code: "KW", name: "Kuwait", flag: "🇰🇼" },
  { code: "BH", name: "Bahrain", flag: "🇧🇭" },
  { code: "OM", name: "Oman", flag: "🇴🇲" },
  { code: "JO", name: "Jordan", flag: "🇯🇴" },
  { code: "LB", name: "Lebanon", flag: "🇱🇧" },
]

const currencies = [
  { code: "EUR", name: "Euro (€)", symbol: "€" },
  { code: "USD", name: "US Dollar ($)", symbol: "$" },
  { code: "GBP", name: "British Pound (£)", symbol: "£" },
  { code: "AUD", name: "Australian Dollar (A$)", symbol: "A$" },
  { code: "CHF", name: "Swiss Franc (Fr)", symbol: "Fr" },
  { code: "JPY", name: "Japanese Yen (¥)", symbol: "¥" },
  { code: "CAD", name: "Canadian Dollar (C$)", symbol: "C$" },
  { code: "NZD", name: "New Zealand Dollar (NZ$)", symbol: "NZ$" },
  { code: "SGD", name: "Singapore Dollar (S$)", symbol: "S$" },
  { code: "HKD", name: "Hong Kong Dollar (HK$)", symbol: "HK$" },
  { code: "ZAR", name: "South African Rand (R)", symbol: "R" },
  { code: "PLN", name: "Polish Złoty (zł)", symbol: "zł" },
  { code: "SEK", name: "Swedish Krona (kr)", symbol: "kr" },
  { code: "NOK", name: "Norwegian Krone (kr)", symbol: "kr" },
  { code: "DKK", name: "Danish Krone (kr)", symbol: "kr" },
  { code: "HUF", name: "Hungarian Forint (Ft)", symbol: "Ft" },
  { code: "CZK", name: "Czech Koruna (Kč)", symbol: "Kč" },
  { code: "RON", name: "Romanian Leu (lei)", symbol: "lei" },
  { code: "BGN", name: "Bulgarian Lev (лв)", symbol: "лв" },
  { code: "HRK", name: "Croatian Kuna (kn)", symbol: "kn" },
  { code: "TRY", name: "Turkish Lira (₺)", symbol: "₺" },
  { code: "AED", name: "UAE Dirham (د.إ)", symbol: "د.إ" },
  { code: "SAR", name: "Saudi Riyal (﷼)", symbol: "﷼" },
  { code: "QAR", name: "Qatari Riyal (﷼)", symbol: "﷼" },
  { code: "KWD", name: "Kuwaiti Dinar (د.ك)", symbol: "د.ك" },
  { code: "BHD", name: "Bahraini Dinar (د.ب)", symbol: "د.ب" },
  { code: "OMR", name: "Omani Rial (﷼)", symbol: "﷼" },
  { code: "JOD", name: "Jordanian Dinar (د.ا)", symbol: "د.ا" },
  { code: "LBP", name: "Lebanese Pound (ل.ل)", symbol: "ل.ل" },
  { code: "EGP", name: "Egyptian Pound (£E)", symbol: "£E" },
  { code: "NGN", name: "Nigerian Naira (₦)", symbol: "₦" },
  { code: "KES", name: "Kenyan Shilling (KSh)", symbol: "KSh" },
  { code: "GHS", name: "Ghanaian Cedi (₵)", symbol: "₵" },
  { code: "INR", name: "Indian Rupee (₹)", symbol: "₹" },
  { code: "MYR", name: "Malaysian Ringgit (RM)", symbol: "RM" },
  { code: "THB", name: "Thai Baht (฿)", symbol: "฿" },
  { code: "IDR", name: "Indonesian Rupiah (Rp)", symbol: "Rp" },
  { code: "PHP", name: "Philippine Peso (₱)", symbol: "₱" },
  { code: "VND", name: "Vietnamese Dong (₫)", symbol: "₫" },
  { code: "BRL", name: "Brazilian Real (R$)", symbol: "R$" },
  { code: "MXN", name: "Mexican Peso ($)", symbol: "$" },
  { code: "ARS", name: "Argentine Peso ($)", symbol: "$" },
  { code: "CLP", name: "Chilean Peso ($)", symbol: "$" },
  { code: "COP", name: "Colombian Peso ($)", symbol: "$" },
  { code: "PEN", name: "Peruvian Sol (S/)", symbol: "S/" },
  { code: "CNY", name: "Chinese Yuan (¥)", symbol: "¥" },
  { code: "KRW", name: "South Korean Won (₩)", symbol: "₩" },
  { code: "RUB", name: "Russian Ruble (₽)", symbol: "₽" },
  { code: "UAH", name: "Ukrainian Hryvnia (₴)", symbol: "₴" },
  { code: "PKR", name: "Pakistani Rupee (₨)", symbol: "₨" },
  { code: "BDT", name: "Bangladeshi Taka (৳)", symbol: "৳" },
]

const languages = [
  { code: "en", name: "English" },
  { code: "de", name: "Deutsch" },
  { code: "fr", name: "Français" },
  { code: "es", name: "Español" },
  { code: "it", name: "Italiano" },
  { code: "pt", name: "Português" },
  { code: "nl", name: "Nederlands" },
  { code: "pl", name: "Polski" },
  { code: "ru", name: "Русский" },
  { code: "zh", name: "中文" },
  { code: "ja", name: "日本語" },
  { code: "ko", name: "한국어" },
  { code: "ar", name: "العربية" },
  { code: "tr", name: "Türkçe" },
  { code: "vi", name: "Tiếng Việt" },
  { code: "th", name: "ไทย" },
  { code: "id", name: "Bahasa Indonesia" },
  { code: "ms", name: "Bahasa Melayu" },
  { code: "hi", name: "हिन्दी" },
  { code: "sv", name: "Svenska" },
  { code: "no", name: "Norsk" },
  { code: "da", name: "Dansk" },
  { code: "fi", name: "Suomi" },
  { code: "cs", name: "Čeština" },
  { code: "hu", name: "Magyar" },
  { code: "ro", name: "Română" },
  { code: "bg", name: "Български" },
  { code: "hr", name: "Hrvatski" },
  { code: "sk", name: "Slovenčina" },
  { code: "sl", name: "Slovenščina" },
  { code: "lt", name: "Lietuvių" },
  { code: "lv", name: "Latviešu" },
  { code: "et", name: "Eesti" },
  { code: "el", name: "Ελληνικά" },
  { code: "he", name: "עברית" },
]

export default function Register() {
  const [step, setStep] = useState(1)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [country, setCountry] = useState("DE")
  const [currency, setCurrency] = useState("EUR")
  const [language, setLanguage] = useState("en")
  const [phone, setPhone] = useState("")
  const [agreed, setAgreed] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreed) { toast("Please agree to the terms", "error"); return }
    setLoading(true)
    const ok = await register({ name, email, password })
    setLoading(false)
    if (ok) {
      toast("Account created successfully", "success")
      navigate("/dashboard")
    }
  }

  const selectedCountry = countries.find((c) => c.code === country)
  const selectedCurrency = currencies.find((c) => c.code === currency)

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center bg-muted/30 py-12">
      <div className="w-full max-w-lg p-8 bg-card border border-border rounded-xl shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Create Your Account</h1>
          <p className="text-sm text-muted-foreground">Start trading in minutes</p>
          <div className="flex justify-center gap-2 mt-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className={"h-1.5 rounded-full transition-all " + (step >= s ? "w-8 bg-red-600" : "w-8 bg-muted")} />
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 && (
            <>
              <div>
                <label className="text-sm font-medium">Country of Residence</label>
                <div className="relative mt-1">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <select value={country} onChange={(e) => setCountry(e.target.value)} className="w-full h-10 pl-10 pr-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring appearance-none">
                    {countries.map((c) => (<option key={c.code} value={c.code}>{c.flag} {c.name}</option>))}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Account Currency</label>
                <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full mt-1 h-10 px-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring">
                  {currencies.map((c) => (<option key={c.code} value={c.code}>{c.symbol} {c.name}</option>))}
                </select>
                <p className="text-[10px] text-muted-foreground mt-1">Default currency: Euro (€)</p>
              </div>
              <div>
                <label className="text-sm font-medium">Preferred Language</label>
                <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full mt-1 h-10 px-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring">
                  {languages.map((l) => (<option key={l.code} value={l.code}>{l.name}</option>))}
                </select>
              </div>
              <button type="button" onClick={() => setStep(2)} className="w-full h-10 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition-colors">Continue</button>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label className="text-sm font-medium">Full Name</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full mt-1 h-10 px-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring" placeholder="John Doe" />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mt-1 h-10 px-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring" placeholder="you@example.com" />
              </div>
              <div>
                <label className="text-sm font-medium">Phone Number</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full mt-1 h-10 px-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring" placeholder={"+" + (selectedCountry?.code === "DE" ? "49" : "1") + " 234 567 890"} />
              </div>
              <div>
                <label className="text-sm font-medium">Password</label>
                <div className="relative mt-1">
                  <input type={show ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full h-10 px-3 pr-10 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring" placeholder="••••••••" />
                  <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => setStep(1)} className="flex-1 h-10 border border-border rounded-md font-medium hover:bg-muted">Back</button>
                <button type="button" onClick={() => setStep(3)} className="flex-1 h-10 bg-red-600 text-white rounded-md font-medium hover:bg-red-700">Continue</button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="p-4 bg-muted rounded-lg space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Country</span><span className="font-medium">{selectedCountry?.flag} {selectedCountry?.name}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Currency</span><span className="font-medium">{selectedCurrency?.symbol} {selectedCurrency?.name}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Language</span><span className="font-medium">{languages.find((l) => l.code === language)?.name}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Email</span><span className="font-medium">{email}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Name</span><span className="font-medium">{name}</span></div>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" id="terms" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1 w-4 h-4 accent-red-600" />
                <label htmlFor="terms" className="text-xs text-muted-foreground">I agree to the Privacy Policy and Terms of Service. I consent to receive marketing communications from Axi.</label>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => setStep(2)} className="flex-1 h-10 border border-border rounded-md font-medium hover:bg-muted">Back</button>
                <button type="submit" disabled={loading} className="flex-1 h-10 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                  <UserPlus className="w-4 h-4" /> {loading ? "Creating..." : "Open Account"}
                </button>
              </div>
            </>
          )}
        </form>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account? <Link to="/login" className="text-red-600 font-medium hover:underline">Log In</Link>
        </div>
      </div>
    </div>
  )
}
