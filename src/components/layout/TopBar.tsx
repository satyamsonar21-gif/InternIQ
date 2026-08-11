import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { Bell, Search, ChevronDown, User, Settings, LogOut, X, Check } from 'lucide-react'

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/student/logs': 'Work Logs',
  '/student/logs/new': 'Submit Work Log',
  '/student/milestones': 'Tasks & Milestones',
  '/student/documents': 'Documents',
  '/student/analytics': 'Performance Analytics',
  '/student/ai-assistant': 'AI Assistant',
  '/faculty/interns': 'My Interns',
  '/faculty/approvals': 'Approval Queue',
  '/faculty/alerts': 'Risk & Alerts',
  '/faculty/reports': 'Reports',
  '/industry/interns': 'My Interns',
  '/industry/tasks/new': 'Assign Task',
  '/admin/dashboard': 'Admin Dashboard',
  '/admin/batches': 'Batch Management',
  '/admin/companies': 'Company Registry',
  '/admin/users': 'User Management',
  '/admin/analytics': 'Institution Analytics',
  '/admin/placement': 'Placement Intelligence',
  '/admin/reports': 'Report Center',
  '/admin/audit-logs': 'Audit Logs',
  '/notifications': 'Notifications',
  '/profile': 'Profile & Settings',
}

export default function TopBar() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchToast, setSearchToast] = useState(false)

  const pageTitle = PAGE_TITLES[location.pathname] || 'InternIQ'

  if (!user) return null

  const initials = user.full_name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const accentColor =
    user.role === 'student'
      ? '#F97316'
      : user.role === 'faculty_mentor'
      ? '#0D9488'
      : user.role === 'industry_mentor'
      ? '#701A75'
      : '#18181B'

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setSearchToast(true)
      setTimeout(() => setSearchToast(false), 2500)
    }
  }

  return (
    <header className="h-16 bg-white/80 backdrop-blur-xl border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-40 shadow-xs">
      {/* Page Title */}
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-bold text-slate-900">{pageTitle}</h1>
      </div>

      {/* Search Toast Feedback */}
      <AnimatePresence>
        {searchToast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute left-1/2 -translate-x-1/2 px-4 py-1.5 bg-slate-900 text-white rounded-full text-xs font-medium flex items-center gap-2 shadow-lg"
          >
            <Check className="w-3.5 h-3.5 text-emerald-400" /> Filtered view for "{searchQuery}"
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right Controls */}
      <div className="flex items-center gap-2">
        {/* Search Input */}
        <AnimatePresence>
          {showSearch && (
            <motion.form
              onSubmit={handleSearchSubmit}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 280, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative overflow-hidden"
            >
              <input
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search students, tasks, docs..."
                className="w-full h-9 bg-slate-100 border border-slate-300 rounded-lg pl-3 pr-9 text-xs text-slate-900 placeholder:text-slate-500 focus:border-slate-500 focus:bg-white transition-colors"
              />
              <button
                type="button"
                onClick={() => {
                  setShowSearch(false)
                  setSearchQuery('')
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.form>
          )}
        </AnimatePresence>
        <button
          onClick={() => setShowSearch(!showSearch)}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Notifications */}
        <Link
          to="/notifications"
          className="relative w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
        </Link>

        {/* User Avatar Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 h-9 pl-1 pr-2 rounded-lg hover:bg-slate-100 transition-all"
          >
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-xs"
              style={{ backgroundColor: accentColor }}
            >
              <span>{initials}</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
          </button>

          <AnimatePresence>
            {showUserMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                <motion.div
                  initial={{ opacity: 0, y: -4, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50"
                >
                  <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
                    <p className="text-sm font-bold text-slate-900">{user.full_name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{user.email}</p>
                    <span
                      className="inline-block mt-1.5 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold"
                      style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
                    >
                      {user.role.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="py-1">
                    <Link
                      to="/profile"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                    >
                      <User className="w-4 h-4 text-slate-500" />
                      View Profile
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                    >
                      <Settings className="w-4 h-4 text-slate-500" />
                      Account Settings
                    </Link>
                    <button
                      onClick={() => {
                        logout()
                        setShowUserMenu(false)
                      }}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition-colors w-full"
                    >
                      <LogOut className="w-4 h-4 text-rose-500" />
                      Logout
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}
