import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Download, Sparkles, Filter, CheckCircle2, TrendingUp, Users, Check } from 'lucide-react'

export default function FacultyReportsPage() {
  const [downloading, setDownloading] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [reportType, setReportType] = useState('Batch Summary')

  const triggerToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 2500)
  }

  const handleExport = (format: string) => {
    setDownloading(true)
    setTimeout(() => {
      setDownloading(false)
      triggerToast(`Exported ${reportType} Report as ${format}!`)
    }, 1500)
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
          <h1 className="text-2xl font-bold text-[#134E4A] tracking-tight">Faculty Evaluation & Performance Reports</h1>
          <p className="text-xs text-[#0F766E] font-medium">Generate cohort analytical summaries and individual student audit reports</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => handleExport('PDF')}
            disabled={downloading}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-bold rounded-xl shadow-xs transition-all disabled:opacity-50"
          >
            {downloading ? <Sparkles className="w-4 h-4 animate-spin" /> : <Download size={16} />}
            Export PDF Report
          </button>
          <button
            onClick={() => handleExport('CSV')}
            disabled={downloading}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#99F6E4] hover:bg-[#F0FDFA] text-[#134E4A] text-xs font-bold rounded-xl shadow-xs transition-all disabled:opacity-50"
          >
            Export CSV Data
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-[#99F6E4] rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-xs">
        <div className="flex items-center gap-3">
          <Filter size={16} className="text-[#0F766E]" />
          <span className="text-xs font-bold text-[#134E4A]">Report Scope:</span>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="bg-[#F0FDFA] border border-[#99F6E4] rounded-xl px-3 py-1.5 text-xs font-bold text-[#134E4A]"
          >
            <option>Batch Summary</option>
            <option>At-Risk Cohort Analysis</option>
            <option>Industry Placement Metrics</option>
            <option>Attendance & Compliance Log</option>
          </select>
        </div>

        <div className="text-xs font-bold text-[#0F766E]">
          Cohort Size: <span className="text-[#134E4A] font-mono">48 Assigned Students</span>
        </div>
      </div>

      {/* Overview Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-[#99F6E4] rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#0F766E]">Average Cohort Score</span>
            <TrendingUp size={18} className="text-[#0D9488]" />
          </div>
          <p className="text-3xl font-mono font-bold text-[#134E4A]">81.4 <span className="text-xs text-[#0F766E]">/ 100</span></p>
        </div>
        <div className="bg-white border border-[#99F6E4] rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#0F766E]">Total Verified Hours</span>
            <Users size={18} className="text-emerald-600" />
          </div>
          <p className="text-3xl font-mono font-bold text-emerald-600">1,420 <span className="text-xs text-[#0F766E]">hrs</span></p>
        </div>
        <div className="bg-white border border-[#99F6E4] rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#0F766E]">On-Time Submission Rate</span>
            <CheckCircle2 size={18} className="text-amber-600" />
          </div>
          <p className="text-3xl font-mono font-bold text-amber-600">92.5%</p>
        </div>
      </div>

      {/* Detailed Report Table */}
      <div className="bg-white border border-[#99F6E4] rounded-2xl p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-[#134E4A] flex items-center gap-2">
          <FileText size={18} className="text-[#0D9488]" /> Detailed Cohort Summary Table
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-[#F0FDFA] border-b border-[#99F6E4] text-[#134E4A]">
              <tr>
                <th className="px-4 py-3 font-bold uppercase">Student Name</th>
                <th className="px-4 py-3 font-bold uppercase">Enrollment</th>
                <th className="px-4 py-3 font-bold uppercase">Company</th>
                <th className="px-4 py-3 font-bold uppercase">Logs Submitted</th>
                <th className="px-4 py-3 font-bold uppercase">Overall Score</th>
                <th className="px-4 py-3 font-bold uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#99F6E4]">
              {[
                { name: 'Arjun Mehta', roll: 'CS2024001', company: 'TechVista Solutions', logs: '4 / 4', score: '84/100', status: 'On Track' },
                { name: 'Priya Sharma', roll: 'CS2024002', company: 'InnovateCorp', logs: '2 / 4', score: '62/100', status: 'At Risk' },
                { name: 'Rahul Verma', roll: 'CS2024003', company: 'GlobalTech', logs: '4 / 4', score: '92/100', status: 'Completed' },
                { name: 'Sneha Gupta', roll: 'CS2024004', company: 'DesignStudio', logs: '4 / 4', score: '88/100', status: 'On Track' },
                { name: 'Karan Patel', roll: 'CS2024005', company: 'TechVista Solutions', logs: '3 / 4', score: '79/100', status: 'On Track' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-[#F0FDFA] transition-colors">
                  <td className="px-4 py-3 font-bold text-[#134E4A]">{row.name}</td>
                  <td className="px-4 py-3 text-[#0F766E] font-mono">{row.roll}</td>
                  <td className="px-4 py-3 text-[#134E4A] font-semibold">{row.company}</td>
                  <td className="px-4 py-3 text-[#0F766E] font-medium">{row.logs}</td>
                  <td className="px-4 py-3 font-mono font-bold text-[#134E4A]">{row.score}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${row.status === 'On Track' ? 'bg-emerald-100 text-emerald-800' : row.status === 'At Risk' ? 'bg-rose-100 text-rose-800' : 'bg-teal-100 text-teal-800'}`}>
                      {row.status}
                    </span>
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
