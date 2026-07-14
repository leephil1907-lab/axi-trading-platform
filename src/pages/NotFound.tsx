import { Link } from "react-router-dom"
import { Home, AlertTriangle } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center">
      <div className="text-center">
        <AlertTriangle className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <p className="text-muted-foreground mb-6">Page not found</p>
        <Link to="/" className="inline-flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-md font-medium hover:bg-red-700">
          <Home className="w-4 h-4" /> Go Home
        </Link>
      </div>
    </div>
  )
}
