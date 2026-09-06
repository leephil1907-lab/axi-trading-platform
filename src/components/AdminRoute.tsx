import type { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "@/lib/AuthContext"
import LoadingSkeleton from "@/components/LoadingSkeleton"

export default function AdminRoute({ children }: { children: ReactNode }) {
  const { isLoading, isAdmin } = useAuth()
  if (isLoading) return <LoadingSkeleton label="Checking secure access…" />
  return isAdmin ? <>{children}</> : <Navigate to="/dashboard" replace />
}
