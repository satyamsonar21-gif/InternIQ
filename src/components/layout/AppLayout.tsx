import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import { useAuth } from '@/contexts/AuthContext'

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const { user } = useAuth()

  const roleThemeClass =
    user?.role === 'student'
      ? 'theme-student'
      : user?.role === 'faculty_mentor'
      ? 'theme-faculty'
      : user?.role === 'industry_mentor'
      ? 'theme-industry'
      : 'theme-admin'

  return (
    <div className={`min-h-screen ${roleThemeClass} transition-colors duration-300`}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className={`transition-all duration-300 ${collapsed ? 'ml-[72px]' : 'ml-[264px]'}`}>
        <TopBar />
        <main className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  )
}
