import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Menu, X, ChevronDown, User, LogOut, Shield, Settings, Wallet, BarChart3, Copy, LayoutDashboard, HelpCircle, Handshake } from "lucide-react"
import { navLinks } from "@/lib/data"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const isLoggedIn = localStorage.getItem("axi_user") !== null

  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(href + "/")

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-600 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <span className="font-bold text-lg tracking-tight">axi</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => link.children && setOpenDropdown(link.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                to={link.href}
                className={cn(
                  "flex items-center gap-1 text-sm font-medium transition-colors hover:text-foreground",
                  isActive(link.href) ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {link.label}
                {link.children && <ChevronDown className="w-3 h-3" />}
              </Link>
              {link.children && openDropdown === link.label && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-popover border border-border rounded-lg shadow-lg p-1.5 space-y-0.5">
                  {link.children.map((child) => (
                    <Link
                      key={child.label}
                      to={child.href}
                      className="block px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link to="/partnership" className={cn("text-sm font-medium transition-colors hover:text-foreground", isActive("/partnership") ? "text-foreground" : "text-muted-foreground")}>Partnership</Link>
          <Link to="/help-center" className={cn("text-sm font-medium transition-colors hover:text-foreground", isActive("/help-center") ? "text-foreground" : "text-muted-foreground")}>Help</Link>
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <button onClick={() => navigate("/dashboard")} className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </button>
              <button onClick={() => { localStorage.removeItem("axi_user"); navigate("/"); window.location.reload() }} className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Log in</Link>
              <Link to="/register" className="text-sm font-medium bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors">Open Account</Link>
            </>
          )}
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2">
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <div key={link.label}>
                <Link to={link.href} onClick={() => setMobileOpen(false)} className="block text-sm font-medium py-1">{link.label}</Link>
                {link.children && (
                  <div className="pl-4 mt-1 space-y-1">
                    {link.children.map((child) => (
                      <Link key={child.label} to={child.href} onClick={() => setMobileOpen(false)} className="block text-sm text-muted-foreground py-1">{child.label}</Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link to="/partnership" onClick={() => setMobileOpen(false)} className="block text-sm font-medium py-1">Partnership</Link>
            <Link to="/help-center" onClick={() => setMobileOpen(false)} className="block text-sm font-medium py-1">Help Centre</Link>
            <div className="pt-4 border-t border-border flex flex-col gap-2">
              {isLoggedIn ? (
                <>
                  <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-sm py-2"><LayoutDashboard className="w-4 h-4" /> Dashboard</Link>
                  <Link to="/trading" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-sm py-2"><BarChart3 className="w-4 h-4" /> Trading</Link>
                  <Link to="/deposit" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-sm py-2"><Wallet className="w-4 h-4" /> Deposit</Link>
                  <Link to="/settings" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-sm py-2"><Settings className="w-4 h-4" /> Settings</Link>
                  <Link to="/help-center" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-sm py-2"><HelpCircle className="w-4 h-4" /> Help Centre</Link>
                  <button onClick={() => { localStorage.removeItem("axi_user"); navigate("/"); window.location.reload() }} className="flex items-center gap-2 text-sm py-2 text-red-600"><LogOut className="w-4 h-4" /> Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="text-sm font-medium py-2">Log in</Link>
                  <Link to="/register" onClick={() => setMobileOpen(false)} className="text-sm font-medium bg-red-600 text-white px-4 py-2 rounded-md text-center">Open Account</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
