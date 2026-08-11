import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import {
  User,
  Building,
  Briefcase,
  FileText,
  Activity,
  Brain,
  Check,
  X,
  Plus,
  ArrowLeft,
  Download,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function InternDetailPage() {
  const { studentId: _studentId } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Overview')
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [commentText, setCommentText] = useState('')

  const tabs = ['Overview', 'Work Logs', 'Milestones', 'Documents', 'Attendance', 'AI Analysis']

  const triggerToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 2500)
  }

  const handleAction = (action: string) => {
    triggerToast(`Work Log ${action}! Feedback recorded.`)
    setCommentText('')
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

      {/* Back & Header actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/faculty/interns')}
          className="flex items-center gap-2 text-xs font-bold text-[#0F766E] hover:text-[#134E4A] transition-colors"
        >
          <ArrowLeft size={16} /> Back to Interns
        </button>
        <div className="flex gap-3">
          <button
            onClick={() => setIsFeedbackModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold bg-[#0D9488] hover:bg-[#0F766E] text-white rounded-xl transition-colors shadow-xs"
          >
            <Plus size={16} /> Add Feedback
          </button>
          <button
            onClick={() => triggerToast('Generated comprehensive student evaluation report PDF!')}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold bg-white hover:bg-[#F0FDFA] border border-[#99F6E4] text-[#134E4A] rounded-xl transition-colors shadow-xs"
          >
            <Download size={16} /> Generate Report
          </button>
        </div>
      </div>

      {/* Student Profile Header */}
      <div className="bg-white border border-[#99F6E4] p-6 rounded-2xl flex flex-col md:flex-row gap-6 items-start md:items-center relative overflow-hidden shadow-xs">
        <div className="w-16 h-16 bg-[#F0FDFA] rounded-full flex flex-shrink-0 items-center justify-center border-2 border-[#99F6E4] text-[#0D9488]">
          <User size={32} />
        </div>

        <div className="flex-1 space-y-2 relative z-10">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold text-[#134E4A]">Arjun Mehta</h1>
            <span className="px-2.5 py-0.5 text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-full">
              On Track
            </span>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-[#0F766E]">
            <div className="flex items-center gap-2"><FileText size={14} className="text-[#0D9488]" /> CS2024001</div>
            <div className="flex items-center gap-2"><Building size={14} className="text-[#0D9488]" /> TechVista Solutions</div>
            <div className="flex items-center gap-2"><Briefcase size={14} className="text-[#0D9488]" /> Frontend Developer Intern</div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-[#99F6E4] shadow-xs text-center">
          <p className="text-[#0F766E] text-xs font-bold mb-1">Overall Performance</p>
          <p className="text-3xl font-mono font-bold text-emerald-600">78<span className="text-xs text-[#0F766E]">/100</span></p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#99F6E4] shadow-xs text-center">
          <p className="text-[#0F766E] text-xs font-bold mb-1">Attendance</p>
          <p className="text-3xl font-mono font-bold text-[#0D9488]">94<span className="text-xs text-[#0F766E]">%</span></p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#99F6E4] shadow-xs text-center">
          <p className="text-[#0F766E] text-xs font-bold mb-1">Placement Readiness</p>
          <p className="text-3xl font-mono font-bold text-amber-600">72<span className="text-xs text-[#0F766E]">%</span></p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#99F6E4] shadow-xs text-center">
          <p className="text-[#0F766E] text-xs font-bold mb-1">Tasks Verified</p>
          <p className="text-3xl font-mono font-bold text-[#134E4A]">12<span className="text-xs text-[#0F766E]">/18</span></p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto border-b border-[#99F6E4] bg-white p-1 rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'px-4 py-2 text-xs font-bold whitespace-nowrap rounded-lg transition-all',
              activeTab === tab ? 'bg-[#0D9488] text-white shadow-xs' : 'text-[#0F766E] hover:text-[#134E4A]'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content Area */}
      <div className="bg-white border border-[#99F6E4] rounded-2xl p-6 min-h-[350px] shadow-xs">
        {activeTab === 'Overview' && (
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-[#134E4A] flex items-center gap-2"><Activity size={18} className="text-[#0D9488]" /> Activity Timeline & Overview</h3>
            <div className="relative border-l-2 border-[#99F6E4] ml-3 space-y-6 pb-4">
              <div className="relative pl-6">
                <div className="absolute w-3 h-3 bg-[#0D9488] rounded-full -left-[7px] top-1"></div>
                <p className="text-xs text-[#0F766E] font-medium mb-1">2 hours ago</p>
                <div className="bg-[#F0FDFA] border border-[#99F6E4] p-4 rounded-xl">
                  <p className="text-[#134E4A] text-xs font-bold">Submitted Weekly Work Log for Week 4.</p>
                </div>
              </div>
              <div className="relative pl-6">
                <div className="absolute w-3 h-3 bg-emerald-500 rounded-full -left-[7px] top-1"></div>
                <p className="text-xs text-[#0F766E] font-medium mb-1">1 day ago</p>
                <div className="bg-[#F0FDFA] border border-[#99F6E4] p-4 rounded-xl">
                  <p className="text-[#134E4A] text-xs font-bold">Achieved Milestone: UI Prototypes Completion.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Work Logs' && (
          <div className="space-y-4">
            <div className="bg-[#F0FDFA] border border-[#99F6E4] p-5 rounded-2xl space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-xs text-[#134E4A]">Week 4 Log: Frontend Components</h4>
                  <p className="text-[10px] text-[#0F766E] font-medium mt-0.5">Submitted 2 days ago</p>
                </div>
                <span className="px-2.5 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300 rounded-full">Pending Review</span>
              </div>
              <p className="text-xs text-[#134E4A] leading-relaxed font-medium">Developed the main dashboard components using React and Tailwind CSS. Integrated analytics API endpoints and ensured cross-device responsiveness.</p>

              <div className="pt-4 border-t border-[#99F6E4] flex flex-col gap-3">
                <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Add mentor feedback before taking action..." className="w-full bg-white border border-[#99F6E4] rounded-xl p-3 text-xs text-[#134E4A] focus:outline-none focus:border-[#0D9488]" rows={2}></textarea>
                <div className="flex gap-2 justify-end">
                  <button onClick={() => handleAction('Rejected')} className="px-3 py-1.5 text-xs font-bold bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors">Reject</button>
                  <button onClick={() => handleAction('Revision Requested')} className="px-3 py-1.5 text-xs font-bold bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 rounded-xl transition-colors">Request Revision</button>
                  <button onClick={() => handleAction('Approved')} className="px-3 py-1.5 text-xs font-bold bg-[#0D9488] text-white hover:bg-[#0F766E] rounded-xl transition-colors flex items-center gap-1"><Check size={14} /> Approve</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'AI Analysis' && (
          <div className="space-y-6">
            <div className="bg-[#F0FDFA] border border-[#99F6E4] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <Brain className="text-[#0D9488]" size={22} />
                <h3 className="text-sm font-bold text-[#134E4A]">AI Performance Intelligence Summary</h3>
              </div>
              <p className="text-xs text-[#134E4A] leading-relaxed font-medium">
                Arjun Mehta has consistently met deadlines and demonstrated strong technical proficiency in Frontend Development. Work log sentiment analysis is positive, indicating high engagement. Recommended action: Encourage additional focus on documentation formatting to boost placement readiness score from 72% to 85%+.
              </p>
            </div>
          </div>
        )}

        {['Milestones', 'Documents', 'Attendance'].includes(activeTab) && (
          <div className="flex flex-col items-center justify-center h-48 text-[#0F766E]">
            <FileText size={40} className="mb-3 opacity-40" />
            <p className="text-xs font-bold">Content for {activeTab} is loaded dynamically.</p>
          </div>
        )}
      </div>

      {/* Feedback Modal */}
      <AnimatePresence>
        {isFeedbackModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={() => setIsFeedbackModalOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-white border border-[#99F6E4] rounded-2xl w-full max-w-lg overflow-hidden shadow-xl z-10">
              <div className="flex justify-between items-center p-5 border-b border-[#99F6E4] bg-[#F0FDFA]">
                <h3 className="text-sm font-bold text-[#134E4A]">Add Faculty Performance Evaluation</h3>
                <button onClick={() => setIsFeedbackModalOpen(false)} className="text-[#0F766E] hover:text-[#134E4A]"><X size={18} /></button>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#134E4A] mb-1.5">Technical Competency Score (1-5)</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button key={n} type="button" className="w-10 h-10 rounded-xl bg-[#F0FDFA] hover:bg-[#0D9488] hover:text-white font-bold text-xs text-[#134E4A] border border-[#99F6E4] transition-colors">{n}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#134E4A] mb-1.5">Evaluation Feedback & Advice</label>
                  <textarea className="w-full bg-[#F0FDFA] border border-[#99F6E4] rounded-xl p-3 text-xs text-[#134E4A] focus:outline-none focus:border-[#0D9488]" rows={3} placeholder="Enter detailed comments..."></textarea>
                </div>
              </div>
              <div className="flex justify-end gap-3 p-5 border-t border-[#99F6E4] bg-[#F0FDFA]">
                <button onClick={() => setIsFeedbackModalOpen(false)} className="px-4 py-2 text-xs font-bold text-[#0F766E]">Cancel</button>
                <button onClick={() => { setIsFeedbackModalOpen(false); triggerToast('Faculty evaluation submitted successfully!') }} className="px-4 py-2 text-xs font-bold bg-[#0D9488] hover:bg-[#0F766E] text-white rounded-xl shadow-xs">Submit Evaluation</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
