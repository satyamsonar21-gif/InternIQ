import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, Plus, CheckCircle2, Clock, Eye, Check, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const MOCK_INTERNS = [
  {
    id: 'int-1',
    name: 'Arjun Mehta',
    institution: 'National Institute of Technology',
    role: 'Frontend Developer Intern',
    progress: 75,
    status: 'In Progress',
    taskCount: 3,
  },
  {
    id: 'int-2',
    name: 'Ananya Roy',
    institution: 'IIT Bombay',
    role: 'UI/UX Design Intern',
    progress: 40,
    status: 'Needs Review',
    taskCount: 1,
  },
  {
    id: 'int-3',
    name: 'Rohan Sharma',
    institution: 'Delhi Technological University',
    role: 'Backend Developer Intern',
    progress: 90,
    status: 'On Track',
    taskCount: 5,
  },
]

export default function IndustryInternsPage() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newInternName, setNewInternName] = useState('')
  const [newInternRole, setNewInternRole] = useState('Software Engineering Intern')

  const triggerToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 2500)
  }

  const filteredInterns = MOCK_INTERNS.filter((intern) => {
    const matchesSearch =
      intern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      intern.institution.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'All' || intern.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleAddIntern = (e: React.FormEvent) => {
    e.preventDefault()
    setShowAddModal(false)
    triggerToast(`Added ${newInternName || 'New Intern'} to your active industry roster!`)
    setNewInternName('')
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
            className="fixed top-20 right-8 z-50 px-4 py-2 bg-[#701A75] text-white rounded-xl shadow-lg font-bold text-xs flex items-center gap-2"
          >
            <Check className="w-4 h-4" /> {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#4C0519] tracking-tight">Industry Intern Roster</h1>
          <p className="text-xs text-[#86198F] font-medium">Manage and track your assigned interns</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-[#701A75] hover:bg-[#86198F] text-white px-5 py-2.5 rounded-xl font-bold text-xs transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          Add Intern
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-2xl border border-[#F5D0FE] shadow-xs">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#86198F]" />
          <input
            type="text"
            placeholder="Search interns by name or institution..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#FDF4FF] border border-[#F5D0FE] rounded-xl py-2 pl-9 pr-4 text-xs text-[#4C0519] placeholder:text-[#86198F]/60 focus:outline-none focus:border-[#701A75] font-medium"
          />
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#86198F]" />
            <select
              className="bg-[#FDF4FF] border border-[#F5D0FE] rounded-xl py-2 pl-9 pr-8 text-xs font-bold text-[#4C0519] focus:outline-none focus:border-[#701A75] appearance-none cursor-pointer"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="In Progress">In Progress</option>
              <option value="Needs Review">Needs Review</option>
              <option value="On Track">On Track</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInterns.map((intern, i) => (
          <motion.div
            key={intern.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => navigate(`/industry/interns/${intern.id}`)}
            className="bg-white border border-[#F5D0FE] rounded-2xl p-6 hover:border-[#701A75] cursor-pointer transition-all shadow-xs group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#FDF4FF] border border-[#F5D0FE] flex items-center justify-center text-[#701A75] text-lg font-bold">
                  {intern.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#4C0519] group-hover:text-[#701A75] transition-colors">{intern.name}</h3>
                  <p className="text-xs text-[#86198F] font-medium truncate w-48">{intern.institution}</p>
                  <span className="text-[10px] font-bold text-[#701A75] bg-[#FDF4FF] border border-[#F5D0FE] inline-block px-2 py-0.5 rounded-full mt-1">
                    {intern.role}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-bold text-[#4C0519] mb-1">
                    <span>Milestone Progress</span>
                    <span className="font-mono">{intern.progress}%</span>
                  </div>
                  <div className="w-full bg-[#FDF4FF] rounded-full h-2 border border-[#F5D0FE]">
                    <div className="bg-[#701A75] h-2 rounded-full" style={{ width: `${intern.progress}%` }} />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold">
                  {intern.status === 'Needs Review' ? (
                    <Clock className="w-4 h-4 text-amber-600" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  )}
                  <span className={intern.status === 'Needs Review' ? 'text-amber-800' : 'text-emerald-800'}>{intern.status}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#F5D0FE] flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  navigate(`/industry/interns/${intern.id}`)
                }}
                className="flex-1 bg-[#FDF4FF] hover:bg-white text-[#701A75] border border-[#F5D0FE] py-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <Eye className="w-4 h-4" /> View Details
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  navigate('/industry/tasks/new')
                }}
                className="flex-1 bg-[#701A75] hover:bg-[#86198F] text-white py-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Plus className="w-4 h-4" /> Assign Task
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Intern Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={() => setShowAddModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-white border border-[#F5D0FE] rounded-2xl shadow-xl w-full max-w-md p-6 z-10 space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-[#F5D0FE]">
                <h3 className="text-sm font-bold text-[#4C0519]">Add Intern to Industry Roster</h3>
                <button onClick={() => setShowAddModal(false)} className="text-[#86198F] hover:text-[#4C0519]"><X size={18} /></button>
              </div>

              <form onSubmit={handleAddIntern} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#4C0519] mb-1">Student Name</label>
                  <input type="text" required placeholder="e.g. Vikramaditya Singh" value={newInternName} onChange={(e) => setNewInternName(e.target.value)} className="w-full bg-[#FDF4FF] border border-[#F5D0FE] rounded-xl px-3 py-2 text-xs font-medium text-[#4C0519]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#4C0519] mb-1">Role Title</label>
                  <input type="text" value={newInternRole} onChange={(e) => setNewInternRole(e.target.value)} className="w-full bg-[#FDF4FF] border border-[#F5D0FE] rounded-xl px-3 py-2 text-xs font-medium text-[#4C0519]" />
                </div>
                <div className="flex justify-end gap-2 pt-2 border-t border-[#F5D0FE]">
                  <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded-xl text-xs font-bold border border-[#F5D0FE] text-[#86198F]">Cancel</button>
                  <button type="submit" className="px-4 py-2 rounded-xl text-xs font-bold bg-[#701A75] text-white hover:bg-[#86198F]">Add Intern</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
