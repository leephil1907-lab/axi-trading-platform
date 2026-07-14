import * as React from "react"
import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface Toast {
  id: string
  message: string
  type: "success" | "error" | "info"
}

const ToastContext = React.createContext<{
  toast: (message: string, type?: Toast["type"]) => void
}>({ toast: () => {} })

export function useToast() {
  return React.useContext(ToastContext)
}

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    const handler = (e: any) => {
      const toast = { id: Math.random().toString(36), message: e.detail.message, type: e.detail.type }
      setToasts((prev) => [...prev, toast])
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id))
      }, 4000)
    }
    window.addEventListener("axi-toast", handler)
    return () => window.removeEventListener("axi-toast", handler)
  }, [])

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            "flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-sm font-medium min-w-[280px] animate-in slide-in-from-right",
            t.type === "success" && "bg-green-600 text-white",
            t.type === "error" && "bg-red-600 text-white",
            t.type === "info" && "bg-primary text-primary-foreground"
          )}
        >
          <span className="flex-1">{t.message}</span>
          <button onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}>
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  )
}

export function toast(message: string, type: Toast["type"] = "info") {
  window.dispatchEvent(new CustomEvent("axi-toast", { detail: { message, type } }))
}
