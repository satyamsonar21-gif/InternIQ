import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus,
  Search,
  CheckCircle2,
  X,
  ChevronRight,
  Archive,
  Check,
} from 'lucide-react'

interface BatchItem {
  id: string
  name: string
  department: string
  start_date: string
  end_date: string
  student_count: number
  completion_rate: number
  status: 'active' | 'archived'
}

const MOCK_BATCHES: BatchItem[] = [
  {
    id: 'batch-2024-cs',
    name: '2024 Computer Science Internship Cohort',
    department: 'Computer Science & Engineering',
    start_date: '2024-08-01',
    end_date: '2024-12-31',
    student_count: 120,
    completion_rate: 88,
    status: 'active',
  },
  {
    id: 'batch-2024-ee',
    name: '2024 Electrical Engineering Cohort',
    department: 'Electrical & Electronics',
    start_date: '2024-08-01',
    end_date: '2024-12-31',
    student_count: 85,
    completion_rate: 74,
    status: 'active',
  },
  {
    id: 'batch-2024-me',
    name: '2024 Mechanical Engineering Cohort',
    department: 'Mechanical Engineering',
    start_date: '2024-08-01',
    end_date: '2024-12-31',
    student_count: 95,
    completion_rate: 81,
    status: 'active',
  },
  {
    id: 'batch-2023-cs',
    name: '2023 Computer Science Cohort',
    department: 'Computer Science & Engineering',
    start_date: '2023-08-01',
    end_date: '2023-12-31',
    student_count: 110,
    completion_rate: 100,
    status: 'archived',
  },
]

export default function AdminBatchesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [batches, setBatches] = useState(MOCK_BATCHES)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const [batchName, setBatchName] = useState('')
  const [department, setDepartment] = useState('Computer Science & Engineering')
  const [startDate, setStartDate] = useState('2025-01-15')
  const [endDate, setEndDate] = useState('2025-05-30')

  const triggerToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 2500)
  }

  const handleCreateBatch = () => {
    if (!batchName.trim()) return
    const newBatch: BatchItem = {
      id: `batch-${Date.now()}`,
      name: batchName,
      department,
      start_date: startDate,
      end_date: endDate,
      student_count: 0,
      completion_rate: 0,
      status: 'active',
    }
    setBatches([newBatch, ...batches])
    setShowCreateModal(false)
    setBatchName('')
    triggerToast(`Created new cohort: ${batchName}`)
  }

  const filteredBatches = batches.filter(
    (b) =>
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.department.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Batch & Cohort Management</h1>
          <p className="text-xs text-slate-500 font-medium">Organize student internship cohorts by academic department and term</p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-white shadow-xs transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Create New Batch
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Total Cohorts</p>
          <p className="text-2xl font-bold font-mono text-slate-900 mt-1">{batches.length}</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <p className="text-[10px] uppercase tracking-wider text-emerald-700 font-bold">Active Batches</p>
          <p className="text-2xl font-bold font-mono text-emerald-600 mt-1">{batches.filter((b) => b.status === 'active').length}</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <p className="text-[10px] uppercase tracking-wider text-slate-700 font-bold">Total Enrolled Students</p>
          <p className="text-2xl font-bold font-mono text-slate-900 mt-1">410</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <p className="text-[10px] uppercase tracking-wider text-amber-700 font-bold">Avg Completion Rate</p>
          <p className="text-2xl font-bold font-mono text-amber-600 mt-1">85.7%</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search batch name or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-9 bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-slate-900"
          />
        </div>
      </div>

      {/* Batches Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                <th className="py-3.5 px-4">Batch Name</th>
                <th className="py-3.5 px-4">Department</th>
                <th className="py-3.5 px-4">Duration</th>
                <th className="py-3.5 px-4">Students</th>
                <th className="py-3.5 px-4">Completion %</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredBatches.map((batch) => (
                <tr key={batch.id} className="hover:bg-slate-50 cursor-pointer transition-colors group">
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-900 group-hover:text-slate-700 transition-colors">{batch.name}</p>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium">{batch.department}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-600 font-medium">
                    {batch.start_date} to {batch.end_date}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{batch.student_count}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-900 font-bold">{batch.completion_rate}%</td>
                  <td className="py-3.5 px-4">
                    {batch.status === 'active' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        <CheckCircle2 className="w-3 h-3" /> Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-300">
                        <Archive className="w-3 h-3" /> Archived
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 transition-all inline-block" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Batch Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowCreateModal(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl p-6 shadow-xl z-10 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <h3 className="text-sm font-bold text-slate-900">Create New Internship Batch</h3>
                <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-900"><X className="w-5 h-5" /></button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-900 uppercase mb-1">Batch / Cohort Name</label>
                  <input type="text" placeholder="e.g. 2025 Computer Science Spring Cohort" value={batchName} onChange={(e) => setBatchName(e.target.value)} className="w-full h-10 bg-slate-50 border border-slate-300 rounded-xl px-3 text-xs text-slate-900 font-medium focus:border-slate-900" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-900 uppercase mb-1">Department</label>
                  <select value={department} onChange={(e) => setDepartment(e.target.value)} className="w-full h-10 bg-slate-50 border border-slate-300 rounded-xl px-3 text-xs font-bold text-slate-900">
                    <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                    <option value="Electrical & Electronics">Electrical & Electronics</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-3 border-t border-slate-200">
                <button onClick={() => setShowCreateModal(false)} className="flex-1 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700">Cancel</button>
                <button onClick={handleCreateBatch} className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-white shadow-xs flex items-center justify-center gap-1.5"><Plus className="w-4 h-4" /> Create Cohort</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
