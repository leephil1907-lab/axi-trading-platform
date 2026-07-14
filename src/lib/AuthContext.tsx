import React, { createContext, useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

interface AuthUser {
  id: string
  email: string
  name: string
  isAdmin: boolean
}

interface AuthContextType {
  user: AuthUser | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (data: { name: string; email: string; password: string }) => Promise<boolean>
  logout: () => void
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  isAdmin: false,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const stored = localStorage.getItem("axi_user")
    if (stored) {
      try { setUser(JSON.parse(stored)) } catch {}
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 800))
    const isAdmin = email.toLowerCase() === "kaspertrading9@gmail.com"
    const userData: AuthUser = {
      id: "u-" + Math.random().toString(36).slice(2),
      email,
      name: email.split("@")[0],
      isAdmin,
    }
    setUser(userData)
    localStorage.setItem("axi_user", JSON.stringify(userData))
    return true
  }

  const register = async (data: { name: string; email: string; password: string }) => {
    await new Promise((r) => setTimeout(r, 1000))
    const userData: AuthUser = {
      id: "u-" + Math.random().toString(36).slice(2),
      email: data.email,
      name: data.name,
      isAdmin: false,
    }
    setUser(userData)
    localStorage.setItem("axi_user", JSON.stringify(userData))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("axi_user")
    navigate("/")
    window.location.reload()
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, isAdmin: user?.isAdmin || false }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
