import { Routes, Route, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { AuthProvider } from "@/lib/AuthContext"
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Home from "@/pages/Home"
import TradingDashboard from "@/pages/TradingDashboard"
import Markets from "@/pages/Markets"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import Dashboard from "@/pages/Dashboard"
import Deposit from "@/pages/Deposit"
import Withdraw from "@/pages/Withdraw"
import Admin from "@/pages/Admin"
import CopyTrading from "@/pages/CopyTrading"
import Settings from "@/pages/Settings"
import MT4 from "@/pages/MT4"
import MT5 from "@/pages/MT5"
import TradingPlatforms from "@/pages/TradingPlatforms"
import About from "@/pages/About"
import Partnership from "@/pages/Partnership"
import HelpCenter from "@/pages/HelpCenter"
import NotFound from "@/pages/NotFound"

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/trading" element={<TradingDashboard />} />
            <Route path="/markets" element={<Markets />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/withdraw" element={<Withdraw />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/copy-trading" element={<CopyTrading />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/platforms/mt4" element={<MT4 />} />
            <Route path="/platforms/mt5" element={<MT5 />} />
            <Route path="/platforms" element={<TradingPlatforms />} />
            <Route path="/about" element={<About />} />
            <Route path="/partnership" element={<Partnership />} />
            <Route path="/help-center" element={<HelpCenter />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </AuthProvider>
  )
}

export default App
