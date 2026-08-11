import { motion } from 'framer-motion'
import { BarChart3, Users, BookOpen, GraduationCap, ShieldAlert, FileText, UserPlus, Download, Settings, Bell, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'

const AdminDashboard = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  const kpis = [
    { label: 'Total Students', value: '342', icon: Users, color: 'text-zinc-800' },
    { label: 'Active Interns', value: '287', icon: BookOpen, color: 'text-indigo-600' },
    { label: 'Completion', value: '87%', icon: GraduationCap, color: 'text-[#10B981]' },
    { label: 'Avg Score', value: '72', icon: BarChart3, color: 'text-[#F59E0B]' },
    { label: 'Placement Rate', value: '64%', icon: TrendingUp, color: 'text-[#06B6D4]' },
  ]

  return (
    <motion.div
      className="max-w-7xl mx-auto space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-[#09090B]">Admin Overview</h1>
          <p className="text-[#52525B] mt-1 font-medium">Platform metrics and system health.</p>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div key={i} variants={itemVariants} className="bg-white border border-[#E4E4E7] rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-sm">
            <kpi.icon className={cn('w-6 h-6 mb-2', kpi.color)} />
            <p className="text-[#52525B] text-xs font-semibold uppercase tracking-wider">{kpi.label}</p>
            <p className="font-mono text-2xl font-bold text-[#09090B] mt-1">{kpi.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content - Dept Performance & Batch Table */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div variants={itemVariants} className="bg-white border border-[#E4E4E7] rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-[#09090B] mb-6">Department Performance</h2>
            <div className="space-y-4">
              {[
                { dept: 'Computer Science', val: 92 },
                { dept: 'Information Tech', val: 88 },
                { dept: 'Electronics', val: 76 },
                { dept: 'Mechanical', val: 65 },
                { dept: 'Civil Engineering', val: 58 },
              ].map((d, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-[#09090B]">{d.dept}</span>
                    <span className="font-mono text-[#52525B]">{d.val}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-[#FAFAFA] rounded-full overflow-hidden border border-[#E4E4E7]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${d.val}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="h-full rounded-full bg-[#18181B]"
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white border border-[#E4E4E7] rounded-2xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-[#E4E4E7] flex justify-between items-center">
              <h2 className="text-xl font-bold text-[#09090B]">Batch Progress</h2>
              <Link to="/admin/batches" className="text-xs font-bold text-zinc-900 hover:underline">Manage Batches</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#FAFAFA] text-[#52525B] text-xs uppercase tracking-wider border-b border-[#E4E4E7]">
                    <th className="p-4 font-bold">Batch</th>
                    <th className="p-4 font-bold">Students</th>
                    <th className="p-4 font-bold">Companies</th>
                    <th className="p-4 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="text-[#09090B] text-sm divide-y divide-[#E4E4E7]">
                  {[
                    { batch: 'B.Tech 2025', students: 120, companies: 45, status: 'Active', color: 'bg-emerald-100 text-emerald-800' },
                    { batch: 'MCA 2024', students: 60, companies: 22, status: 'Concluding', color: 'bg-amber-100 text-amber-800' },
                    { batch: 'BCA 2025', students: 85, companies: 30, status: 'Active', color: 'bg-emerald-100 text-emerald-800' },
                    { batch: 'B.Tech 2024', students: 110, companies: 40, status: 'Completed', color: 'bg-indigo-100 text-indigo-800' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-xs">{row.batch}</td>
                      <td className="p-4 font-mono text-xs">{row.students}</td>
                      <td className="p-4 font-mono text-xs">{row.companies}</td>
                      <td className="p-4">
                        <span className={cn('px-2 py-0.5 rounded text-[11px] font-bold', row.color)}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* Sidebar content - Actions, Alerts, Audit */}
        <div className="space-y-6">
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
            <Link to="/admin/batches" className="p-4 bg-white hover:bg-[#FAFAFA] border border-[#E4E4E7] rounded-2xl flex flex-col items-center justify-center gap-2 transition-colors text-[#09090B] shadow-xs">
              <UserPlus className="w-5 h-5 text-indigo-600" />
              <span className="text-xs font-bold">Add Batch</span>
            </Link>
            <Link to="/admin/reports" className="p-4 bg-white hover:bg-[#FAFAFA] border border-[#E4E4E7] rounded-2xl flex flex-col items-center justify-center gap-2 transition-colors text-[#09090B] shadow-xs">
              <Download className="w-5 h-5 text-[#10B981]" />
              <span className="text-xs font-bold">Reports</span>
            </Link>
            <Link to="/admin/users" className="p-4 bg-white hover:bg-[#FAFAFA] border border-[#E4E4E7] rounded-2xl flex flex-col items-center justify-center gap-2 transition-colors text-[#09090B] shadow-xs">
              <Settings className="w-5 h-5 text-[#52525B]" />
              <span className="text-xs font-bold">Users</span>
            </Link>
            <Link to="/admin/audit-logs" className="p-4 bg-white hover:bg-[#FAFAFA] border border-[#E4E4E7] rounded-2xl flex flex-col items-center justify-center gap-2 transition-colors text-[#09090B] shadow-xs">
              <Bell className="w-5 h-5 text-[#F59E0B]" />
              <span className="text-xs font-bold">Audit Logs</span>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white border border-[#E4E4E7] rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#09090B] mb-4 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-600" /> Alert Center
            </h3>
            <div className="space-y-3">
              {[
                { msg: '3 students marked as At Risk', type: 'Warning' },
                { msg: 'System backup completed', type: 'Info' },
                { msg: 'Industry evaluations pending (12)', type: 'Warning' },
              ].map((alert, i) => (
                <div key={i} className="flex gap-3 items-start p-3 bg-[#FAFAFA] rounded-xl border border-[#E4E4E7]">
                  <div className={cn('w-2 h-2 mt-1.5 rounded-full', alert.type === 'Warning' ? 'bg-[#F59E0B]' : 'bg-[#06B6D4]')}></div>
                  <p className="text-[#09090B] text-xs font-medium">{alert.msg}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white border border-[#E4E4E7] rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#09090B] mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#52525B]" /> Recent Audit
            </h3>
            <div className="space-y-4">
              {[
                { action: 'Admin login', time: '10 mins ago', user: 'admin@iq' },
                { action: 'Batch CS2025 created', time: '1 hr ago', user: 'admin@iq' },
                { action: 'Report generated', time: '3 hrs ago', user: 'system' },
                { action: 'Role updated', time: '5 hrs ago', user: 'admin@iq' },
                { action: 'Bulk student import', time: '1 day ago', user: 'admin@iq' },
              ].map((audit, i) => (
                <div key={i} className="flex justify-between items-center text-xs">
                  <div>
                    <p className="text-[#09090B] font-semibold">{audit.action}</p>
                    <p className="text-[#52525B] text-[11px] font-mono">{audit.user}</p>
                  </div>
                  <span className="text-[#52525B] text-[11px] font-medium">{audit.time}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default AdminDashboard
