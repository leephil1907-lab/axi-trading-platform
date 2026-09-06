import React, { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

interface AuthUser { id: string; email: string; name: string; isAdmin: boolean }
interface StoredAccount { id: string; email: string; name: string; passwordHash: string }
interface AuthContextType {
  user: AuthUser | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (data: { name: string; email: string; password: string }) => Promise<boolean>
  logout: () => void
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType>({ user: null, isLoading: true, login: async () => false, register: async () => false, logout: () => {}, isAdmin: false })
const ACCOUNTS_KEY = "axi_accounts"
const SESSION_KEY = "axi_user"
const adminEmails = String(import.meta.env.VITE_ADMIN_EMAILS || "").split(",").map((email) => email.trim().toLowerCase()).filter(Boolean)

async function hashPassword(value: string) {
  const bytes = new TextEncoder().encode(value)
  const digest = await crypto.subtle.digest("SHA-256", bytes)
  return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("")
}

function readAccounts(): StoredAccount[] {
  try { return JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || "[]") } catch { return [] }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    try { const stored = localStorage.getItem(SESSION_KEY); if (stored) setUser(JSON.parse(stored)) } catch {}
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const normalized = email.trim().toLowerCase()
    const account = readAccounts().find((item) => item.email === normalized)
    if (!account || account.passwordHash !== await hashPassword(password)) return false
    const userData: AuthUser = { id: account.id, email: account.email, name: account.name, isAdmin: adminEmails.includes(account.email) }
    setUser(userData)
    localStorage.setItem(SESSION_KEY, JSON.stringify(userData))
    return true
  }

  const register = async (data: { name: string; email: string; password: string }) => {
    const normalized = data.email.trim().toLowerCase()
    if (!data.name.trim() || data.password.length < 8 || !normalized.includes("@")) return false
    const accounts = readAccounts()
    if (accounts.some((item) => item.email === normalized)) return false
    const account: StoredAccount = { id: crypto.randomUUID(), email: normalized, name: data.name.trim(), passwordHash: await hashPassword(data.password) }
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify([...accounts, account]))
    const userData: AuthUser = { id: account.id, email: account.email, name: account.name, isAdmin: adminEmails.includes(account.email) }
    setUser(userData)
    localStorage.setItem(SESSION_KEY, JSON.stringify(userData))
    return true
  }

  const logout = () => { setUser(null); localStorage.removeItem(SESSION_KEY); navigate("/") }

  return <AuthContext.Provider value={{ user, isLoading, login, register, logout, isAdmin: Boolean(user && user.isAdmin) }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
