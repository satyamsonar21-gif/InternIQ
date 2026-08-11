import { useState } from 'react'
import {
  TrendingUp,
  BarChart3,
  Download,
  Check,
} from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts'
import { motion, AnimatePresence } from 'framer-motion'

const DEPT_COMPLETION_DATA = [
  { dept: 'Computer Science', rate: 92 },
  { dept: 'Electrical Eng', rate: 84 },
  { dept: 'Mechanical Eng', rate: 78 },
  { dept: 'Civil Eng', rate: 71 },
  { dept: 'Biotech', rate: 88 },
]

const MONTHLY_PROGRESS_DATA = [
  { month: 'Aug', completion: 25, avgScore: 68 },
  { month: 'Sep', completion: 45, avgScore: 72 },
  { month: 'Oct', completion: 68, avgScore: 76 },
  { month: 'Nov', completion: 87, avgScore: 81 },
  { month: 'Dec', completion: 94, avgScore: 85 },
]

export default function AdminAnalyticsPage() {
  const [departmentFilter, setDepartmentFilter] = useState('all')
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const triggerToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 2500)
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
            className="fixed top-20 right-8 z-50 px-4 py-2 bg-slate-900 text-white rounded-xl shadow-lg font-bold text-xs flex items-center gap-2"
          >
            <Check className="w-4 h-4 text-emerald-400" /> {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Institution-Wide Performance Analytics</h1>
          <p className="text-xs text-slate-500 font-medium">Comprehensive dashboard for internship completion trends, department benchmarking, and skill gaps</p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="h-10 bg-white border border-slate-300 rounded-xl px-3 text-xs font-bold text-slate-900 focus:border-slate-900"
          >
            <option value="all">All Departments</option>
            <option value="cs">Computer Science</option>
            <option value="ee">Electrical Engineering</option>
            <option value="me">Mechanical Engineering</option>
          </select>
          <button
            onClick={() => triggerToast('Exported Institution-Wide Analytics PDF!')}
            className="h-10 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5"
          >
            <Download size={14} /> Export Report
          </button>
        </div>
      </div>

      {/* KPI Top Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Total Active Internships</p>
          <p className="text-3xl font-bold font-mono text-slate-900 mt-1">287</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <p className="text-[10px] uppercase tracking-wider text-emerald-700 font-bold">Avg Completion Rate</p>
          <p className="text-3xl font-bold font-mono text-emerald-600 mt-1">87.2%</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <p className="text-[10px] uppercase tracking-wider text-slate-700 font-bold">Avg Performance Score</p>
          <p className="text-3xl font-bold font-mono text-slate-900 mt-1">81.4 / 100</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <p className="text-[10px] uppercase tracking-wider text-amber-700 font-bold">Placement Offers</p>
          <p className="text-3xl font-bold font-mono text-amber-600 mt-1">184</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Department Completion Rate Comparison */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-slate-900" />
            Department Completion Rate Benchmarking (%)
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DEPT_COMPLETION_DATA} layout="vertical">
                <XAxis type="number" domain={[0, 100]} stroke="#64748B" tick={{ fill: '#09090B', fontSize: 11, fontWeight: 600 }} />
                <YAxis dataKey="dept" type="category" stroke="#64748B" tick={{ fill: '#09090B', fontSize: 11, fontWeight: 600 }} width={120} />
                <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderRadius: '12px', color: '#09090B' }} />
                <Bar dataKey="rate" fill="#18181B" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Trend Progress */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            Monthly Cohort Progress & Average Score Trend
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MONTHLY_PROGRESS_DATA}>
                <XAxis dataKey="month" stroke="#64748B" tick={{ fill: '#09090B', fontSize: 11, fontWeight: 600 }} />
                <YAxis stroke="#64748B" tick={{ fill: '#09090B', fontSize: 11, fontWeight: 600 }} domain={[0, 100]} />
                <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderRadius: '12px', color: '#09090B' }} />
                <Line type="monotone" dataKey="completion" stroke="#18181B" strokeWidth={3} name="Completion %" />
                <Line type="monotone" dataKey="avgScore" stroke="#10B981" strokeWidth={3} name="Avg Score" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
