import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  CheckCircle2,
  Sparkles,
  Building2,
  Download,
  Check,
} from 'lucide-react'

interface StudentPlacementRank {
  id: string
  name: string
  enrollment: string
  department: string
  company: string
  score: number
  readiness_pct: number
  top_strength: string
  flagged_gap: string
  has_offer: boolean
}

const MOCK_RANKINGS: StudentPlacementRank[] = [
  {
    id: 'rank-1',
    name: 'Sneha Patel',
    enrollment: 'CS2024042',
    department: 'Computer Science',
    company: 'CyberShield Systems',
    score: 95,
    readiness_pct: 96,
    top_strength: 'Security Architecture',
    flagged_gap: 'None',
    has_offer: true,
  },
  {
    id: 'rank-2',
    name: 'Rohan Sharma',
    enrollment: 'CS2024029',
    department: 'Computer Science',
    company: 'DataPulse Analytics',
    score: 91,
    readiness_pct: 92,
    top_strength: 'Machine Learning Pipelines',
    flagged_gap: 'Documentation',
    has_offer: true,
  },
  {
    id: 'rank-3',
    name: 'Arjun Mehta',
    enrollment: 'CS2024001',
    department: 'Computer Science',
    company: 'TechVista Solutions',
    score: 84,
    readiness_pct: 72,
    top_strength: 'Frontend Implementation',
    flagged_gap: 'Technical Communication',
    has_offer: false,
  },
  {
    id: 'rank-4',
    name: 'Vikram Verma',
    enrollment: 'CS2024058',
    department: 'Mechanical Eng',
    company: 'Apex Innovations',
    score: 79,
    readiness_pct: 68,
    top_strength: 'CAD Design & Prototyping',
    flagged_gap: 'Project Management',
    has_offer: false,
  },
  {
    id: 'rank-5',
    name: 'Ananya Roy',
    enrollment: 'CS2024014',
    department: 'Computer Science',
    company: 'CloudScale Inc',
    score: 58,
    readiness_pct: 54,
    top_strength: 'Backend Node.js',
    flagged_gap: 'Activity Consistency',
    has_offer: false,
  },
]

export default function AdminPlacementPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const triggerToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 2500)
  }

  const filteredRankings = MOCK_RANKINGS.filter(
    (r) =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.enrollment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.company.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Placement Intelligence & Readiness Engine</h1>
          <p className="text-xs text-slate-500 font-medium">Correlate internship performance analytics with job placement conversion outcomes</p>
        </div>

        <button
          onClick={() => triggerToast('Exported Placement Readiness Audit Report PDF!')}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-white shadow-xs transition-all self-start sm:self-auto"
        >
          <Download className="w-4 h-4" /> Export Placement Report
        </button>
      </div>

      {/* Top Placement Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Placement Conversion Rate</p>
          <p className="text-3xl font-bold font-mono text-emerald-600 mt-1">64.2%</p>
          <span className="inline-block mt-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
            +12% vs Last Year
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <p className="text-[10px] uppercase tracking-wider text-slate-700 font-bold">Interview Ready Students</p>
          <p className="text-3xl font-bold font-mono text-slate-900 mt-1">142</p>
          <span className="inline-block mt-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-300">
            Readiness &gt; 70%
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <p className="text-[10px] uppercase tracking-wider text-amber-700 font-bold">Confirmed Job Offers</p>
          <p className="text-3xl font-bold font-mono text-amber-600 mt-1">78</p>
          <span className="inline-block mt-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
            PPO / FTE Offers
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <p className="text-[10px] uppercase tracking-wider text-rose-700 font-bold">Flagged Gap Students</p>
          <p className="text-3xl font-bold font-mono text-rose-600 mt-1">18</p>
          <span className="inline-block mt-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
            Requires Intervention
          </span>
        </div>
      </div>

      {/* Institutional AI Placement Narrative */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900 text-white rounded-2xl p-6 shadow-xs space-y-2"
      >
        <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
          <Sparkles className="w-4 h-4" />
          AI Placement Cell Executive Briefing
        </div>
        <p className="text-xs text-slate-200 leading-relaxed font-medium">
          Institutional analytics show a strong positive correlation (r = 0.84) between student activity consistency in weekly work logs and full-time job offer conversion (PPO). Computer Science leads placement readiness with 92% of students achieving "Interview Ready" badges.
        </p>
      </motion.div>

      {/* Search Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search student or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-9 bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 text-xs text-slate-900 font-medium focus:border-slate-900"
          />
        </div>
      </div>

      {/* Readiness Ranking Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                <th className="py-3.5 px-4">Student</th>
                <th className="py-3.5 px-4">Department & Company</th>
                <th className="py-3.5 px-4">Readiness Score</th>
                <th className="py-3.5 px-4">Top Skill Strength</th>
                <th className="py-3.5 px-4">Flagged Gap</th>
                <th className="py-3.5 px-4">PPO Offer Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredRankings.map((rank) => (
                <tr key={rank.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-900">{rank.name}</p>
                    <p className="text-[10px] text-slate-500 font-mono font-medium">{rank.enrollment}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="text-slate-900 font-bold">{rank.department}</p>
                    <p className="text-[10px] text-slate-500 flex items-center gap-1 font-medium">
                      <Building2 className="w-3 h-3 text-slate-700" /> {rank.company}
                    </p>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900">{rank.readiness_pct}%</span>
                      <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-300">
                        <div
                          className="h-full bg-slate-900 rounded-full"
                          style={{ width: `${rank.readiness_pct}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-lg border border-emerald-300">
                      {rank.top_strength}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    {rank.flagged_gap === 'None' ? (
                      <span className="text-[10px] text-slate-400 font-mono">—</span>
                    ) : (
                      <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-lg border border-amber-300">
                        {rank.flagged_gap}
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    {rank.has_offer ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" /> Offer Confirmed
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-500 font-mono font-medium">In Evaluation</span>
                    )}
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
