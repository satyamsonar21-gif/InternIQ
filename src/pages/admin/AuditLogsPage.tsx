import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Download,
  Check,
} from 'lucide-react'

interface AuditLogEntry {
  id: string
  timestamp: string
  actor: string
  role: string
  action_type: 'submission' | 'approval' | 'rejection' | 'login' | 'config_change'
  affected_record: string
  ip_address: string
}

const MOCK_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'aud-001',
    timestamp: '2026-08-11 16:30:15',
    actor: 'Arjun Mehta',
    role: 'student',
    action_type: 'submission',
    affected_record: 'work_logs/log-001',
    ip_address: '192.168.1.45',
  },
  {
    id: 'aud-002',
    timestamp: '2026-08-11 18:30:42',
    actor: 'Dr. Priya Sharma',
    role: 'faculty_mentor',
    action_type: 'approval',
    affected_record: 'work_logs/log-001',
    ip_address: '192.168.1.102',
  },
  {
    id: 'aud-003',
    timestamp: '2026-08-10 19:15:08',
    actor: 'Rahul Kapoor',
    role: 'industry_mentor',
    action_type: 'approval',
    affected_record: 'work_logs/log-002',
    ip_address: '10.0.4.12',
  },
  {
    id: 'aud-004',
    timestamp: '2026-08-09 14:10:00',
    actor: 'Kavita Desai',
    role: 'admin',
    action_type: 'config_change',
    affected_record: 'batches/batch-2024-cs',
    ip_address: '192.168.1.1',
  },
  {
    id: 'aud-005',
    timestamp: '2026-08-08 10:00:22',
    actor: 'Dr. Priya Sharma',
    role: 'faculty_mentor',
    action_type: 'rejection',
    affected_record: 'work_logs/log-004',
    ip_address: '192.168.1.102',
  },
]

export default function AdminAuditLogsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [actionFilter, setActionFilter] = useState('all')
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const triggerToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 2500)
  }

  const filteredLogs = MOCK_AUDIT_LOGS.filter((log) => {
    const matchesSearch =
      log.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.affected_record.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesAction = actionFilter === 'all' || log.action_type === actionFilter
    return matchesSearch && matchesAction
  })

  const getActionBadge = (action: AuditLogEntry['action_type']) => {
    switch (action) {
      case 'approval':
        return <span className="text-[10px] uppercase font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">Approval</span>
      case 'submission':
        return <span className="text-[10px] uppercase font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-300">Submission</span>
      case 'rejection':
        return <span className="text-[10px] uppercase font-mono font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded-full border border-rose-300">Rejection</span>
      case 'config_change':
        return <span className="text-[10px] uppercase font-mono font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">Config Change</span>
      case 'login':
        return <span className="text-[10px] uppercase font-mono font-bold text-cyan-800 bg-cyan-100 px-2 py-0.5 rounded-full border border-cyan-300">Login</span>
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
            className="fixed top-20 right-8 z-50 px-4 py-2 bg-slate-900 text-white rounded-xl shadow-lg font-bold text-xs flex items-center gap-2"
          >
            <Check className="w-4 h-4 text-emerald-400" /> {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">System Audit Trail Viewer</h1>
          <p className="text-xs text-slate-500 font-medium">Immutable timestamped log of all platform submission, verification, and administrative actions</p>
        </div>

        <button
          onClick={() => triggerToast('Exported Audit Log CSV!')}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-white shadow-xs transition-all self-start sm:self-auto"
        >
          <Download className="w-4 h-4" /> Export Audit Log (CSV)
        </button>
      </div>

      {/* Search & Filter */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search actor or record ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-9 bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-slate-900 font-medium"
          />
        </div>

        <select
          value={actionFilter}
          onChange={(e) => setActionFilter(e.target.value)}
          className="h-9 bg-slate-50 border border-slate-300 rounded-xl px-3 text-xs font-bold text-slate-900 focus:border-slate-900"
        >
          <option value="all">All Action Types</option>
          <option value="submission">Submission</option>
          <option value="approval">Approval</option>
          <option value="rejection">Rejection</option>
          <option value="config_change">Config Change</option>
        </select>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                <th className="py-3.5 px-4">Timestamp</th>
                <th className="py-3.5 px-4">Actor</th>
                <th className="py-3.5 px-4">Action Type</th>
                <th className="py-3.5 px-4">Affected Record</th>
                <th className="py-3.5 px-4">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-mono text-slate-900 font-bold">{log.timestamp}</td>
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-900">{log.actor}</p>
                    <p className="text-[10px] text-slate-500 capitalize font-medium">{log.role.replace('_', ' ')}</p>
                  </td>
                  <td className="py-3.5 px-4">{getActionBadge(log.action_type)}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-600 font-medium">{log.affected_record}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-600 font-medium">{log.ip_address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
