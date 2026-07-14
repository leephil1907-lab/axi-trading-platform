import { useState } from "react"
import { Bell, Lock, User, Globe, Moon, Sun, Shield, Smartphone, Mail, Key, Eye, EyeOff, Save, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "@/components/ui/toaster"

export default function Settings() {
  const [tab, setTab] = useState("profile")
  const [darkMode, setDarkMode] = useState(false)
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const tabs = [
    { key: "profile", label: "Profile", icon: User },
    { key: "security", label: "Security", icon: Lock },
    { key: "notifications", label: "Notifications", icon: Bell },
    { key: "preferences", label: "Preferences", icon: Globe },
  ]

  const handleSave = () => {
    toast("Settings saved successfully", "success")
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-64 space-y-1 shrink-0">
          {tabs.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)} className={cn("w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors", tab === t.key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted")}>
              <t.icon className="w-4 h-4" /> {t.label}
            </button>
          ))}
        </div>

        <div className="flex-1 bg-card border border-border rounded-lg p-6">
          {tab === "profile" && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold mb-4">Profile Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div><label className="text-sm font-medium">First Name</label><input defaultValue="John" className="w-full mt-1 h-10 px-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring" /></div>
                <div><label className="text-sm font-medium">Last Name</label><input defaultValue="Doe" className="w-full mt-1 h-10 px-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring" /></div>
              </div>
              <div><label className="text-sm font-medium">Email</label><input defaultValue="john@example.com" className="w-full mt-1 h-10 px-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring" /></div>
              <div><label className="text-sm font-medium">Phone</label><input defaultValue="+1 234 567 890" className="w-full mt-1 h-10 px-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring" /></div>
              <div><label className="text-sm font-medium">Address</label><textarea defaultValue="123 Trading Street, New York, NY 10001" rows={3} className="w-full mt-1 px-3 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring text-sm resize-none" /></div>
            </div>
          )}
          {tab === "security" && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold mb-4">Security Settings</h2>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-3 mb-4">
                <Shield className="w-5 h-5 text-green-600" />
                <div><div className="text-sm font-medium text-green-800 dark:text-green-200">Two-Factor Authentication</div><div className="text-xs text-green-600 dark:text-green-300">Your account is protected with 2FA</div></div>
                <button className="ml-auto px-3 py-1 bg-green-600 text-white text-xs rounded-md">Enabled</button>
              </div>
              <div className="space-y-4">
                <div><label className="text-sm font-medium">Current Password</label>
                  <div className="relative mt-1">
                    <input type={showCurrent ? "text" : "password"} className="w-full h-10 px-3 pr-10 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
                    <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">{showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
                  </div>
                </div>
                <div><label className="text-sm font-medium">New Password</label>
                  <div className="relative mt-1">
                    <input type={showNew ? "text" : "password"} className="w-full h-10 px-3 pr-10 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
                    <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">{showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
                  </div>
                </div>
                <div><label className="text-sm font-medium">Confirm New Password</label>
                  <div className="relative mt-1">
                    <input type={showConfirm ? "text" : "password"} className="w-full h-10 px-3 pr-10 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">{showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-muted rounded-lg text-sm">
                <div className="font-medium mb-1">Login History</div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div className="flex justify-between"><span>Chrome on Windows • New York, US</span><span className="text-green-600">Active now</span></div>
                  <div className="flex justify-between"><span>Safari on macOS • London, UK</span><span>Jul 13, 2026</span></div>
                  <div className="flex justify-between"><span>Firefox on Android • Berlin, DE</span><span>Jul 10, 2026</span></div>
                </div>
              </div>
            </div>
          )}
          {tab === "notifications" && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold mb-4">Notification Preferences</h2>
              {[
                { label: "Price alerts", desc: "Get notified when price reaches your target", icon: Bell, checked: true },
                { label: "Trade executions", desc: "Receive confirmation when orders are filled", icon: Key, checked: true },
                { label: "Deposit/Withdrawal updates", desc: "Status updates for your transactions", icon: Mail, checked: true },
                { label: "Marketing emails", desc: "Promotions, offers, and new features", icon: Mail, checked: false },
                { label: "News and analysis", desc: "Daily market updates and trading ideas", icon: Bell, checked: true },
                { label: "Security alerts", desc: "Login notifications and security warnings", icon: AlertTriangle, checked: true },
                { label: "Copy trading updates", desc: "When your copied traders make moves", icon: Bell, checked: true },
                { label: "Mobile push notifications", desc: "Real-time alerts on your phone", icon: Smartphone, checked: true },
              ].map((item) => (
                <div key={item.label} className="flex items-start justify-between py-3 border-b border-border/50 last:border-0">
                  <div className="flex items-start gap-3">
                    <item.icon className="w-4 h-4 mt-0.5 text-muted-foreground" />
                    <div><div className="text-sm font-medium">{item.label}</div><div className="text-xs text-muted-foreground">{item.desc}</div></div>
                  </div>
                  <input type="checkbox" defaultChecked={item.checked} className="w-4 h-4 accent-red-600 mt-1" />
                </div>
              ))}
            </div>
          )}
          {tab === "preferences" && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold mb-4">Preferences</h2>
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                  <div><div className="text-sm font-medium">Dark Mode</div><div className="text-xs text-muted-foreground">Switch between light and dark themes</div></div>
                </div>
                <button onClick={() => setDarkMode(!darkMode)} className={cn("w-11 h-6 rounded-full transition-colors relative", darkMode ? "bg-red-600" : "bg-muted-foreground/20")}>
                  <span className={cn("absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow-sm", darkMode ? "translate-x-5" : "")} />
                </button>
              </div>
              <div><label className="text-sm font-medium">Language</label>
                <select className="w-full mt-1 h-10 px-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring">
                  <option>English</option><option>Deutsch</option><option>Français</option><option>Español</option><option>Italiano</option><option>Português</option><option>Русский</option><option>中文</option><option>日本語</option><option>العربية</option><option>Türkçe</option><option>Polski</option><option>Nederlands</option><option>Svenska</option><option>Norsk</option><option>Dansk</option><option>Suomi</option><option>Čeština</option><option>Magyar</option><option>Română</option><option>Български</option><option>Hrvatski</option><option>Slovenčina</option><option>Slovenščina</option><option>Lietuvių</option><option>Latviešu</option><option>Eesti</option><option>Ελληνικά</option><option>עברית</option><option>Tiếng Việt</option><option>ไทย</option><option>Bahasa Indonesia</option><option>Bahasa Melayu</option><option>हिन्दी</option>
                </select>
              </div>
              <div><label className="text-sm font-medium">Timezone</label>
                <select className="w-full mt-1 h-10 px-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring">
                  <option>UTC (Coordinated Universal Time)</option><option>EST (Eastern Standard Time)</option><option>CST (Central Standard Time)</option><option>MST (Mountain Standard Time)</option><option>PST (Pacific Standard Time)</option><option>GMT (Greenwich Mean Time)</option><option>CET (Central European Time)</option><option>JST (Japan Standard Time)</option><option>AEST (Australian Eastern Standard Time)</option><option>SGT (Singapore Time)</option><option>HKT (Hong Kong Time)</option><option>IST (India Standard Time)</option><option>MSK (Moscow Standard Time)</option><option>AST (Arabia Standard Time)</option><option>BST (Bangladesh Standard Time)</option><option>WAT (West Africa Time)</option><option>EAT (East Africa Time)</option><option>SAST (South Africa Standard Time)</option>
                </select>
              </div>
              <div><label className="text-sm font-medium">Currency Display</label>
                <select className="w-full mt-1 h-10 px-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring">
                  <option>EUR (€)</option><option>USD ($)</option><option>GBP (£)</option><option>AUD (A$)</option><option>CAD (C$)</option><option>CHF (Fr)</option><option>JPY (¥)</option><option>NZD (NZ$)</option><option>SGD (S$)</option><option>HKD (HK$)</option><option>ZAR (R)</option><option>PLN (zł)</option><option>SEK (kr)</option><option>NOK (kr)</option><option>DKK (kr)</option><option>HUF (Ft)</option><option>CZK (Kč)</option><option>RON (lei)</option><option>BGN (лв)</option><option>HRK (kn)</option><option>TRY (₺)</option><option>AED (د.إ)</option><option>SAR (﷼)</option><option>QAR (﷼)</option><option>KWD (د.ك)</option><option>BHD (د.ب)</option><option>OMR (﷼)</option><option>JOD (د.ا)</option><option>LBP (ل.ل)</option><option>EGP (£E)</option><option>NGN (₦)</option><option>KES (KSh)</option><option>GHS (₵)</option><option>INR (₹)</option><option>MYR (RM)</option><option>THB (฿)</option><option>IDR (Rp)</option><option>PHP (₱)</option><option>VND (₫)</option><option>BRL (R$)</option><option>MXN ($)</option><option>ARS ($)</option><option>CLP ($)</option><option>COP ($)</option><option>PEN (S/)</option><option>CNY (¥)</option><option>KRW (₩)</option><option>RUB (₽)</option><option>UAH (₴)</option><option>PKR (₨)</option><option>BDT (৳)</option>
                </select>
              </div>
            </div>
          )}
          <div className="mt-6 pt-4 border-t border-border">
            <button onClick={handleSave} className="px-6 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition-colors flex items-center gap-2">
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
