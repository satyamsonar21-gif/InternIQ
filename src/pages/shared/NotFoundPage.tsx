import { Link } from 'react-router-dom'
import { FileQuestion, ArrowLeft, Home } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-6 shadow-md">
        <FileQuestion className="w-8 h-8" />
      </div>

      <h1 className="text-4xl font-extrabold text-slate-900 mb-2">404</h1>
      <h2 className="text-xl font-bold text-slate-800 mb-3">Page Not Found</h2>
      <p className="text-sm text-slate-600 max-w-md mb-8 leading-relaxed">
        The requested resource or page location could not be found. Please check the URL or return to your dashboard.
      </p>

      <div className="flex items-center gap-3">
        <Link
          to="/dashboard"
          className="px-5 py-2.5 bg-[#18181B] hover:bg-zinc-800 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-sm transition-all"
        >
          <Home className="w-4 h-4" /> Go to Dashboard
        </Link>
        <Link
          to="/"
          className="px-5 py-2.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Home Page
        </Link>
      </div>
    </div>
  )
}
