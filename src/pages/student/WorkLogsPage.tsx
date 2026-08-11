import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Search,
  Plus,
  CheckCircle,
  AlertCircle,
  Clock,
  Paperclip,
  MessageSquare,
  X,
  FileText,
  ChevronRight,
  Download,
  Eye,
  RefreshCw,
  Check,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const BASE_MOCK_LOGS = [
  {
    id: 'LOG-1023',
    date: '2026-07-26',
    type: 'Daily',
    hours: 8.0,
    tags: ['Frontend', 'UI-Design'],
    status: 'approved',
    description: 'Completed the implementation of the dashboard UI components. Refactored the sidebar to use a unified navigation state. Added framer-motion animations for page transitions.',
    attachments: [{ name: 'dashboard_mockup.png', size: '2.4 MB' }],
    feedback: {
      text: 'Great progress on the dashboard! The animations look smooth. Consider adding error boundaries to the new components next.',
      evaluator: 'Sarah Jenkins',
      timestamp: '2026-07-26T16:30:00Z',
    },
  },
  {
    id: 'LOG-1024',
    date: '2026-07-25',
    type: 'Weekly',
    hours: 40.0,
    tags: ['Frontend', 'API-Integration', 'Database'],
    status: 'submitted',
    description: "Summarized the week's work involving full-stack integration of the reporting module. Encountered some issues with the database indexing which were resolved on Thursday.",
    attachments: [{ name: 'weekly_report_week3.pdf', size: '1.1 MB' }],
    feedback: null,
  },
  {
    id: 'LOG-1025',
    date: '2026-07-24',
    type: 'Daily',
    hours: 7.5,
    tags: ['API-Integration', 'Testing'],
    status: 'revision_requested',
    description: 'Wrote unit tests for the authentication endpoints. Attempted to mock the external OAuth provider but test coverage is currently at 65%.',
    attachments: [],
    feedback: {
      text: 'Please review the mocking strategy for the OAuth provider. We need at least 80% coverage on auth modules before proceeding. See the updated documentation for guidelines.',
      evaluator: 'Michael Chen',
      timestamp: '2026-07-25T09:15:00Z',
    },
  },
  {
    id: 'LOG-1026',
    date: '2026-07-23',
    type: 'Daily',
    hours: 4.0,
    tags: ['Documentation'],
    status: 'draft',
    description: 'Drafting API documentation for the newly created endpoints in swagger format.',
    attachments: [],
    feedback: null,
  },
]

export default function WorkLogsPage() {
  const [logs, setLogs] = useState(BASE_MOCK_LOGS)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')
  const [selectedLog, setSelectedLog] = useState<typeof BASE_MOCK_LOGS[0] | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  useEffect(() => {
    const customLogs = JSON.parse(localStorage.getItem('interniq_custom_work_logs') || '[]')
    if (customLogs.length > 0) {
      setLogs([...customLogs, ...BASE_MOCK_LOGS])
    }
  }, [])

  const triggerToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 2500)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle className="w-3.5 h-3.5 mr-1 text-emerald-600" /> Approved
          </span>
        )
      case 'submitted':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-[#F97316]/10 text-[#EA580C] border border-[#F97316]/30">
            <Clock className="w-3.5 h-3.5 mr-1 text-[#F97316]" /> Submitted
          </span>
        )
      case 'revision_requested':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
            <AlertCircle className="w-3.5 h-3.5 mr-1 text-amber-600" /> Revision Req
          </span>
        )
      case 'draft':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-300">
            <FileText className="w-3.5 h-3.5 mr-1 text-slate-500" /> Draft
          </span>
        )
      default:
        return null
    }
  }

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesStatus =
      statusFilter === 'All' ||
      (statusFilter === 'Approved' && log.status === 'approved') ||
      (statusFilter === 'Submitted' && log.status === 'submitted') ||
      (statusFilter === 'Revision Requested' && log.status === 'revision_requested') ||
      (statusFilter === 'Draft' && log.status === 'draft')
    const matchesType = typeFilter === 'All' || log.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  // Dynamic Stat Calculations
  const totalCount = logs.length
  const approvedCount = logs.filter((l) => l.status === 'approved').length
  const pendingCount = logs.filter((l) => l.status === 'submitted' || l.status === 'revision_requested').length
  const totalHours = logs.reduce((acc, l) => acc + l.hours, 0)

  return (
    <div className="space-y-6 relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed top-20 right-8 z-50 px-4 py-2 bg-[#F97316] text-white rounded-xl shadow-lg font-bold text-xs flex items-center gap-2"
          >
            <Check className="w-4 h-4" /> {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#431407] tracking-tight">Work Log History</h1>
          <p className="text-xs text-[#9A3412] mt-1 font-medium">Track and manage your submitted work logs and summaries.</p>
        </div>
        <Link
          to="/student/logs/new"
          className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold text-white bg-[#F97316] hover:bg-[#EA580C] rounded-xl shadow-md shadow-[#F97316]/20 transition-all w-full md:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          Submit New Log
        </Link>
      </div>

      {/* Dynamic Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-[#FED7AA] rounded-2xl p-5 shadow-xs">
          <p className="text-xs font-bold text-[#9A3412] mb-1">Total Logs</p>
          <p className="text-2xl font-bold tracking-tight text-[#431407] font-mono">{totalCount}</p>
        </div>
        <div className="bg-white border border-[#FED7AA] rounded-2xl p-5 shadow-xs">
          <p className="text-xs font-bold text-[#9A3412] mb-1">Approved</p>
          <p className="text-2xl font-bold tracking-tight text-emerald-600 font-mono">{approvedCount}</p>
        </div>
        <div className="bg-white border border-[#FED7AA] rounded-2xl p-5 shadow-xs">
          <p className="text-xs font-bold text-[#9A3412] mb-1">Pending</p>
          <p className="text-2xl font-bold tracking-tight text-[#F97316] font-mono">{pendingCount}</p>
        </div>
        <div className="bg-white border border-[#FED7AA] rounded-2xl p-5 shadow-xs">
          <p className="text-xs font-bold text-[#9A3412] mb-1">Hours Logged</p>
          <p className="text-2xl font-bold tracking-tight text-[#EA580C] font-mono">{totalHours} hrs</p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white border border-[#FED7AA] rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center shadow-xs">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-[#9A3412] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by description or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#FFF7ED] border border-[#FED7AA] rounded-xl pl-10 pr-4 py-2 text-xs text-[#431407] placeholder:text-[#9A3412]/60 focus:outline-none focus:border-[#F97316] transition-all font-medium"
          />
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="flex-1 md:w-48 bg-[#FFF7ED] border border-[#FED7AA] rounded-xl px-4 py-2 text-xs text-[#431407] font-bold focus:outline-none focus:border-[#F97316]"
          >
            <option>All</option>
            <option>Approved</option>
            <option>Submitted</option>
            <option>Revision Requested</option>
            <option>Draft</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="flex-1 md:w-40 bg-[#FFF7ED] border border-[#FED7AA] rounded-xl px-4 py-2 text-xs text-[#431407] font-bold focus:outline-none focus:border-[#F97316]"
          >
            <option>All</option>
            <option>Daily</option>
            <option>Weekly</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white border border-[#FED7AA] rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-[#FFF7ED] border-b border-[#FED7AA] text-[#431407]">
              <tr>
                <th className="px-6 py-4 font-bold uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider">Hours</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider">Tags</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider">Feedback</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#FED7AA]">
              {filteredLogs.map((log) => (
                <tr
                  key={log.id}
                  onClick={() => setSelectedLog(log)}
                  className="hover:bg-[#FFF7ED] transition-colors cursor-pointer group"
                >
                  <td className="px-6 py-4 font-bold text-[#431407]">{log.date}</td>
                  <td className="px-6 py-4 text-[#9A3412] font-medium">{log.type}</td>
                  <td className="px-6 py-4 text-[#431407] font-mono font-bold">{log.hours}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1.5">
                      {log.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FFF7ED] border border-[#FED7AA] text-[#EA580C]">
                          #{tag}
                        </span>
                      ))}
                      {log.tags.length > 2 && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FFF7ED] border border-[#FED7AA] text-[#9A3412]">
                          +{log.tags.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(log.status)}</td>
                  <td className="px-6 py-4 text-[#9A3412]">
                    {log.feedback ? <MessageSquare className="w-4 h-4 text-[#F97316]" /> : <span className="text-slate-400">-</span>}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <ChevronRight className="w-4 h-4 text-[#9A3412] inline-block group-hover:text-[#F97316] transition-colors" />
                  </td>
                </tr>
              ))}
              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-[#9A3412] font-medium">
                    No logs found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-over Drawer */}
      <AnimatePresence>
        {selectedLog && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLog(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full max-w-md bg-white border-l border-[#FED7AA] shadow-2xl z-50 flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-[#FED7AA] bg-[#FFF7ED]">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-lg font-bold text-[#431407]">{selectedLog.date}</h2>
                    {getStatusBadge(selectedLog.status)}
                  </div>
                  <p className="text-xs text-[#9A3412] font-medium">{selectedLog.type} Log • {selectedLog.hours} hours</p>
                </div>
                <button
                  onClick={() => setSelectedLog(null)}
                  className="p-2 text-[#9A3412] hover:text-[#431407] hover:bg-white rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-xs font-bold text-[#431407] uppercase tracking-wider mb-2">Description</h3>
                  <div className="bg-[#FFF7ED] rounded-xl p-4 border border-[#FED7AA]">
                    <p className="text-xs text-[#431407] leading-relaxed font-medium">{selectedLog.description}</p>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <h3 className="text-xs font-bold text-[#431407] uppercase tracking-wider mb-2">Task Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedLog.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-full text-xs font-bold bg-[#F97316]/10 border border-[#F97316]/30 text-[#EA580C]">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Attachments */}
                {selectedLog.attachments.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold text-[#431407] uppercase tracking-wider mb-2">Attachments</h3>
                    <div className="space-y-2">
                      {selectedLog.attachments.map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-[#FFF7ED] border border-[#FED7AA] rounded-xl p-3">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-white rounded-lg text-[#F97316] shadow-xs">
                              <Paperclip className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-[#431407]">{file.name}</p>
                              <p className="text-[10px] text-[#9A3412]">{file.size}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => triggerToast(`Previewing ${file.name}`)}
                              className="p-1.5 text-[#9A3412] hover:text-[#431407] hover:bg-white rounded-md transition-colors"
                              title="Preview"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => triggerToast(`Downloading ${file.name}`)}
                              className="p-1.5 text-[#9A3412] hover:text-[#F97316] hover:bg-white rounded-md transition-colors"
                              title="Download"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Feedback Section */}
                {selectedLog.feedback && (
                  <div>
                    <h3 className="text-xs font-bold text-[#431407] uppercase tracking-wider mb-2">Mentor Feedback</h3>
                    <div className="rounded-xl p-4 border bg-amber-50 border-amber-200">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold">
                          {selectedLog.feedback.evaluator.charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-amber-900">{selectedLog.feedback.evaluator}</p>
                        </div>
                      </div>
                      <p className="text-xs text-amber-800 leading-relaxed font-medium">"{selectedLog.feedback.text}"</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Footer */}
              <div className="p-6 border-t border-[#FED7AA] bg-[#FFF7ED]">
                {selectedLog.status === 'revision_requested' ? (
                  <button
                    onClick={() => {
                      triggerToast('Revision mode activated')
                      setSelectedLog(null)
                    }}
                    className="w-full flex items-center justify-center px-4 py-2.5 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-md transition-all"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Resubmit Revision
                  </button>
                ) : selectedLog.status === 'draft' ? (
                  <div className="flex gap-3">
                    <Link
                      to="/student/logs/new"
                      className="w-full flex items-center justify-center px-4 py-2.5 text-xs font-bold text-white bg-[#F97316] hover:bg-[#EA580C] rounded-xl shadow-md transition-all text-center"
                    >
                      Continue Editing
                    </Link>
                  </div>
                ) : (
                  <button
                    onClick={() => setSelectedLog(null)}
                    className="w-full px-4 py-2.5 text-xs font-bold text-[#431407] bg-white border border-[#FED7AA] hover:bg-[#FFF7ED] rounded-xl transition-all"
                  >
                    Close Details
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
