import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import {
  LayoutDashboard,
  FileText,
  ListChecks,
  FolderOpen,
  BarChart3,
  Bot,
  Bell,
  UserCircle,
  Users,
  ClipboardCheck,
  AlertTriangle,
  FileBarChart,
  Building2,
  UserCog,
  TrendingUp,
  ScrollText,
  Briefcase,
  PlusCircle,
  ChevronLeft,
  ChevronRight,
  LogOut,
  GraduationCap,
} from 'lucide-react'
import type { UserRole } from '@/types'

interface NavItem {
  label: string
  path: string
  icon: React.ElementType
  section?: string
}

const NAV_ITEMS: Record<UserRole, NavItem[]> = {
  student: [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Work Logs', path: '/student/logs', icon: FileText, section: 'My Internship' },
    { label: 'Tasks & Milestones', path: '/student/milestones', icon: ListChecks, section: 'My Internship' },
    { label: 'Documents', path: '/student/documents', icon: FolderOpen, section: 'My Internship' },
    { label: 'Analytics', path: '/student/analytics', icon: BarChart3, section: 'My Progress' },
    { label: 'AI Assistant', path: '/student/ai-assistant', icon: Bot },
    { label: 'Notifications', path: '/notifications', icon: Bell },
    { label: 'Profile & Settings', path: '/profile', icon: UserCircle },
  ],
  faculty_mentor: [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'My Interns', path: '/faculty/interns', icon: Users },
    { label: 'Approvals', path: '/faculty/approvals', icon: ClipboardCheck },
    { label: 'Alerts & Risks', path: '/faculty/alerts', icon: AlertTriangle },
    { label: 'Reports', path: '/faculty/reports', icon: FileBarChart },
    { label: 'Notifications', path: '/notifications', icon: Bell },
    { label: 'Profile & Settings', path: '/profile', icon: UserCircle },
  ],
  industry_mentor: [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'My Interns', path: '/industry/interns', icon: Users },
    { label: 'Assign Task', path: '/industry/tasks/new', icon: PlusCircle },
    { label: 'Notifications', path: '/notifications', icon: Bell },
    { label: 'Profile & Settings', path: '/profile', icon: UserCircle },
  ],
  admin: [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Batch Management', path: '/admin/batches', icon: GraduationCap },
    { label: 'Companies', path: '/admin/companies', icon: Building2 },
    { label: 'User Management', path: '/admin/users', icon: UserCog },
    { label: 'Analytics', path: '/admin/analytics', icon: TrendingUp },
    { label: 'Placement Intelligence', path: '/admin/placement', icon: Briefcase },
    { label: 'Reports', path: '/admin/reports', icon: FileBarChart },
    { label: 'Audit Logs', path: '/admin/audit-logs', icon: ScrollText },
    { label: 'Notifications', path: '/notifications', icon: Bell },
    { label: 'Profile & Settings', path: '/profile', icon: UserCircle },
  ],
}

interface SidebarProps {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  if (!user) return null

  const navItems = NAV_ITEMS[user.role] || []
  let currentSection: string | undefined = undefined

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  // Accent color tokens per role
  const accentColor =
    user.role === 'student'
      ? '#F97316'
      : user.role === 'faculty_mentor'
      ? '#0D9488'
      : user.role === 'industry_mentor'
      ? '#701A75'
      : '#18181B'

  const activeBgClass =
    user.role === 'student'
      ? 'bg-[#F97316]/10 text-[#EA580C] font-semibold'
      : user.role === 'faculty_mentor'
      ? 'bg-[#0D9488]/10 text-[#0F766E] font-semibold'
      : user.role === 'industry_mentor'
      ? 'bg-[#701A75]/10 text-[#581C87] font-semibold'
      : 'bg-[#18181B]/10 text-[#09090B] font-semibold'

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 264 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="fixed left-0 top-0 h-screen bg-white border-r border-slate-200 flex flex-col z-50 shadow-sm"
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-slate-200">
        <Link to="/dashboard" className="flex items-center gap-3 min-w-0">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-bold text-sm shadow-md"
            style={{ backgroundColor: accentColor }}
          >
            <span>IQ</span>
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="font-bold text-lg text-slate-900 whitespace-nowrap overflow-hidden"
              >
                InternIQ
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/')
          const showSection = item.section && item.section !== currentSection
          if (item.section) currentSection = item.section

          return (
            <div key={item.path}>
              {showSection && !collapsed && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[10px] uppercase tracking-[0.15em] text-slate-400 font-bold mt-5 mb-2 px-3"
                >
                  {item.section}
                </motion.p>
              )}
              {showSection && collapsed && <div className="h-4" />}
              <Link
                to={item.path}
                className={`
                  group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200
                  ${isActive ? activeBgClass : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}
                `}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r-full"
                    style={{ backgroundColor: accentColor }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <item.icon className="w-5 h-5 flex-shrink-0" style={{ color: isActive ? accentColor : undefined }} />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="text-sm font-medium whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {/* Tooltip for collapsed */}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 shadow-xl">
                    {item.label}
                  </div>
                )}
              </Link>
            </div>
          )
        })}
      </nav>

      {/* User + Collapse */}
      <div className="border-t border-slate-200 p-3 space-y-1">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-all duration-200"
        >
          <LogOut className="w-5 h-5 flex-shrink-0 text-rose-500" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="text-sm font-medium whitespace-nowrap overflow-hidden"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-full py-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>
    </motion.aside>
  )
}
