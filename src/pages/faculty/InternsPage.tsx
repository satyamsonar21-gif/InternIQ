import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Search,
  Filter,
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Download,
  Mail,
  ChevronRight,
  User,
  Check,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const internsData = [
  { id: '1', name: 'Arjun Mehta', enrollment: 'CS2024001', company: 'TechVista Solutions', role: 'Frontend Developer Intern', status: 'On Track', score: 84, attendance: 94, lastActivity: '2 hours ago' },
  { id: '2', name: 'Priya Sharma', enrollment: 'CS2024002', company: 'InnovateCorp', role: 'Data Science Intern', status: 'At Risk', score: 62, attendance: 75, lastActivity: '3 days ago' },
  { id: '3', name: 'Rahul Verma', enrollment: 'CS2024003', company: 'GlobalTech', role: 'Backend Developer Intern', status: 'Completed', score: 92, attendance: 98, lastActivity: '1 week ago' },
  { id: '4', name: 'Sneha Gupta', enrollment: 'CS2024004', company: 'DesignStudio', role: 'UX Research Intern', status: 'On Track', score: 88, attendance: 96, lastActivity: '5 hours ago' },
  { id: '5', name: 'Karan Patel', enrollment: 'CS2024005', company: 'TechVista Solutions', role: 'Mobile App Intern', status: 'On Track', score: 79, attendance: 88, lastActivity: '1 day ago' },
]

export default function FacultyInternsPage() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedInterns, setSelectedInterns] = useState<string[]>([])
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const triggerToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 2500)
  }

  const filteredInterns = internsData.filter((intern) => {
    const matchesSearch =
      intern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      intern.enrollment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      intern.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'All' || intern.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const toggleSelect = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedInterns((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const toggleSelectAll = () => {
    if (selectedInterns.length === filteredInterns.length) {
      setSelectedInterns([])
    } else {
      setSelectedInterns(filteredInterns.map((i) => i.id))
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'On Track':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold'
      case 'At Risk':
        return 'bg-rose-100 text-rose-800 border-rose-300 font-bold'
      case 'Completed':
        return 'bg-teal-100 text-teal-800 border-teal-300 font-bold'
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300 font-bold'
    }
  }

  return (
    <div className="space-y-6 relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed top-20 right-8 z-50 px-4 py-2 bg-[#0D9488] text-white rounded-xl shadow-lg font-bold text-xs flex items-center gap-2"
          >
            <Check className="w-4 h-4" /> {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#134E4A] tracking-tight">My Interns</h1>
          <p className="text-xs text-[#0F766E] font-medium">Monitor assigned student progress, performance scores, and risk flags</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#99F6E4] shadow-xs flex items-center gap-4">
          <div className="p-3 bg-[#F0FDFA] rounded-xl text-[#0D9488] border border-[#99F6E4]"><Users size={22} /></div>
          <div><p className="text-xs text-[#0F766E] font-bold">Assigned Interns</p><p className="text-2xl font-bold text-[#134E4A] font-mono">8</p></div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-[#99F6E4] shadow-xs flex items-center gap-4">
          <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600 border border-emerald-200"><TrendingUp size={22} /></div>
          <div><p className="text-xs text-[#0F766E] font-bold">On Track</p><p className="text-2xl font-bold text-emerald-600 font-mono">6</p></div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-[#99F6E4] shadow-xs flex items-center gap-4">
          <div className="p-3 bg-rose-50 rounded-xl text-rose-600 border border-rose-200"><AlertTriangle size={22} /></div>
          <div><p className="text-xs text-[#0F766E] font-bold">At Risk</p><p className="text-2xl font-bold text-rose-600 font-mono">1</p></div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-[#99F6E4] shadow-xs flex items-center gap-4">
          <div className="p-3 bg-amber-50 rounded-xl text-amber-600 border border-amber-200"><CheckCircle size={22} /></div>
          <div><p className="text-xs text-[#0F766E] font-bold">Approvals Pending</p><p className="text-2xl font-bold text-amber-600 font-mono">3</p></div>
        </div>
      </div>

      {/* Toolbar & Filters */}
      <div className="flex flex-col md:flex-row justify-between gap-4 items-center bg-white p-4 rounded-2xl border border-[#99F6E4] shadow-xs">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0F766E]" size={16} />
          <input
            type="text"
            placeholder="Search by name, enrollment, company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#F0FDFA] border border-[#99F6E4] rounded-xl py-2 pl-9 pr-4 text-xs text-[#134E4A] placeholder:text-[#0F766E]/60 focus:outline-none focus:border-[#0D9488] font-medium"
          />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 bg-[#F0FDFA] border border-[#99F6E4] rounded-xl px-3 py-2 text-xs text-[#134E4A] font-bold">
            <Filter size={15} className="text-[#0F766E]" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent border-none focus:outline-none text-xs font-bold cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="On Track">On Track</option>
              <option value="At Risk">At Risk</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      <AnimatePresence>
        {selectedInterns.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center justify-between bg-[#F0FDFA] border border-[#99F6E4] rounded-2xl p-4 shadow-xs"
          >
            <span className="text-xs font-bold text-[#134E4A]">{selectedInterns.length} interns selected</span>
            <div className="flex gap-2">
              <button onClick={() => triggerToast(`Exported CSV for ${selectedInterns.length} interns`)} className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold bg-white text-[#134E4A] border border-[#99F6E4] rounded-xl shadow-xs">
                <Download size={14} /> Export CSV
              </button>
              <button onClick={() => triggerToast(`Batch reminders sent to ${selectedInterns.length} interns`)} className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold bg-[#0D9488] text-white rounded-xl shadow-xs">
                <Mail size={14} /> Send Batch Reminder
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#99F6E4] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F0FDFA] text-[#134E4A] border-b border-[#99F6E4]">
                <th className="p-4 w-12 text-center">
                  <input
                    type="checkbox"
                    checked={selectedInterns.length === filteredInterns.length && filteredInterns.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-[#99F6E4] text-[#0D9488] focus:ring-[#0D9488]"
                  />
                </th>
                <th className="p-4 font-bold uppercase tracking-wider">Student</th>
                <th className="p-4 font-bold uppercase tracking-wider">Company & Role</th>
                <th className="p-4 font-bold uppercase tracking-wider">Status</th>
                <th className="p-4 font-bold uppercase tracking-wider">Performance</th>
                <th className="p-4 font-bold uppercase tracking-wider">Attendance</th>
                <th className="p-4 font-bold uppercase tracking-wider">Last Activity</th>
                <th className="p-4 font-bold uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#99F6E4]">
              {filteredInterns.map((intern) => (
                <tr
                  key={intern.id}
                  className="hover:bg-[#F0FDFA] transition-colors cursor-pointer group"
                  onClick={() => navigate(`/faculty/interns/${intern.id}`)}
                >
                  <td className="p-4 text-center" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedInterns.includes(intern.id)}
                      onChange={(e) => toggleSelect(intern.id, e as any)}
                      className="rounded border-[#99F6E4] text-[#0D9488] focus:ring-[#0D9488]"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#F0FDFA] flex items-center justify-center text-[#0D9488] border border-[#99F6E4]">
                        <User size={18} />
                      </div>
                      <div>
                        <div className="font-bold text-[#134E4A] group-hover:text-[#0D9488] transition-colors">{intern.name}</div>
                        <div className="text-[10px] text-[#0F766E] font-medium">{intern.enrollment}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-[#134E4A]">{intern.company}</div>
                    <div className="text-[10px] text-[#0F766E] font-medium">{intern.role}</div>
                  </td>
                  <td className="p-4">
                    <span className={cn('px-2.5 py-0.5 text-xs font-bold rounded-full border', getStatusColor(intern.status))}>
                      {intern.status}
                    </span>
                  </td>
                  <td className="p-4 font-mono font-bold text-[#134E4A]">
                    {intern.score}/100
                  </td>
                  <td className="p-4 font-bold text-[#134E4A] font-mono">{intern.attendance}%</td>
                  <td className="p-4 text-[#0F766E] font-medium text-xs">{intern.lastActivity}</td>
                  <td className="p-4 text-right">
                    <ChevronRight size={18} className="text-[#0F766E] inline-block group-hover:text-[#0D9488] transition-colors" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
