import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileBarChart,
  Download,
  Sparkles,
  Printer,
  Check,
} from 'lucide-react'

const REPORT_TYPES = [
  { id: 'student_perf', title: 'Student Performance Report', desc: 'Individual or batch progress with mentor evaluation metrics' },
  { id: 'batch_sum', title: 'Batch Summary Report', desc: 'Cohort-wide completion rates and attendance analytics' },
  { id: 'skill_gap', title: 'Skill Gap & Competency Analysis', desc: 'Departmental competency strengths and weak area breakdown' },
  { id: 'placement_ready', title: 'Placement Readiness Report', desc: 'Institution placement score rankings for accreditation' },
  { id: 'audit_full', title: 'Full Compliance Audit Report', desc: 'Timestamped records of all student and mentor verification events' },
]

export default function AdminReportsPage() {
  const [selectedReport, setSelectedReport] = useState('student_perf')
  const [isGenerating, setIsGenerating] = useState(false)
  const [reportReady, setReportReady] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const triggerToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 2500)
  }

  const handleGenerate = () => {
    setIsGenerating(true)
    setReportReady(false)
    setTimeout(() => {
      setIsGenerating(false)
      setReportReady(true)
    }, 1200)
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
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Report Generation Center</h1>
          <p className="text-xs text-slate-500 font-medium">Generate audit-ready PDF and CSV reports for institutional accreditation and leadership presentations</p>
        </div>
      </div>

      {/* Report Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {REPORT_TYPES.map((type) => {
          const isSelected = selectedReport === type.id
          return (
            <div
              key={type.id}
              onClick={() => setSelectedReport(type.id)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                isSelected
                  ? 'bg-[#FAFAFA] border-slate-900 text-slate-900 shadow-md'
                  : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <FileBarChart className={`w-5 h-5 ${isSelected ? 'text-slate-900' : 'text-slate-400'}`} />
                <input type="radio" checked={isSelected} onChange={() => {}} className="text-slate-900" />
              </div>
              <h3 className="text-xs font-bold text-slate-900">{type.title}</h3>
              <p className="text-[11px] leading-relaxed text-slate-500 font-medium">{type.desc}</p>
            </div>
          )
        })}
      </div>

      {/* Report Configuration & Preview Pane */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Configure Report Filters</h3>
            <p className="text-xs text-slate-500 font-medium">Filter scope for generated PDF/CSV output</p>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-xs font-bold text-white rounded-xl shadow-xs flex items-center gap-2 transition-all disabled:opacity-60"
          >
            {isGenerating ? <Sparkles className="w-4 h-4 animate-spin" /> : <Printer className="w-4 h-4" />}
            {isGenerating ? 'Rendering Report...' : 'Preview Report'}
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-900 uppercase mb-1">Academic Department</label>
            <select className="w-full h-10 bg-slate-50 border border-slate-300 rounded-xl px-3 text-xs font-bold text-slate-900">
              <option value="all">All Departments</option>
              <option value="cs">Computer Science & Engineering</option>
              <option value="ee">Electrical Engineering</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-900 uppercase mb-1">Internship Batch</label>
            <select className="w-full h-10 bg-slate-50 border border-slate-300 rounded-xl px-3 text-xs font-bold text-slate-900">
              <option value="2024">2024 Internship Cohort</option>
              <option value="2023">2023 Internship Cohort</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-900 uppercase mb-1">Export Format</label>
            <select className="w-full h-10 bg-slate-50 border border-slate-300 rounded-xl px-3 text-xs font-bold text-slate-900">
              <option value="pdf">PDF Report (Branded & Formatted)</option>
              <option value="csv">CSV Raw Data Export</option>
            </select>
          </div>
        </div>

        {/* Live Preview Container */}
        {reportReady && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-slate-50 border border-slate-300 rounded-2xl space-y-4 font-sans text-xs text-slate-900"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center font-bold text-white text-xs">
                  IQ
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">InternIQ Executive Report Preview</h4>
                  <p className="text-[10px] text-slate-500 font-mono font-medium">Generated: {new Date().toLocaleString()} • Institution: NIT</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => triggerToast('Downloaded Executive Report PDF!')}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs"
                >
                  <Download className="w-4 h-4" /> Download PDF
                </button>
              </div>
            </div>

            <div className="space-y-2 text-xs font-medium">
              <p><span className="text-slate-500 font-bold">Target Cohort:</span> 2024 Computer Science Internship Cohort</p>
              <p><span className="text-slate-500 font-bold">Total Students Evaluated:</span> 120</p>
              <p><span className="text-slate-500 font-bold">Average Performance Score:</span> 81.4 / 100</p>
              <p><span className="text-slate-500 font-bold">Placement Conversion Rate:</span> 64.2%</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
