import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Star, FileText, Clock, MessageSquare, ShieldCheck, X, Plus, Calendar, Check } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { cn } from '@/lib/utils'

export default function IndustryInternDetailPage() {
  const navigate = useNavigate()
  const { studentId } = useParams()
  const [activeTab, setActiveTab] = useState<'tasks' | 'submissions' | 'progress' | 'ratings'>('tasks')
  const [showSignOffModal, setShowSignOffModal] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [mentorComment, setMentorComment] = useState('')
  const [summaryComment, setSummaryComment] = useState('')

  const triggerToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 2500)
  }

  const intern = {
    id: studentId,
    name: 'Arjun Mehta',
    institution: 'National Institute of Technology',
    role: 'Frontend Developer Intern',
    rating: 4.5,
  }

  const tasks = [
    { id: 1, title: 'Build Authentication Flow', due: '2026-08-20', priority: 'High', status: 'In Progress' },
    { id: 2, title: 'Design System Implementation', due: '2026-08-15', priority: 'Medium', status: 'Completed' },
  ]

  const handleReviewAction = (action: string) => {
    triggerToast(`Submission ${action}! Feedback recorded for ${intern.name}.`)
    setMentorComment('')
  }

  const handleConfirmSignOff = () => {
    setShowSignOffModal(false)
    triggerToast(`Digital Sign-Off confirmed! Internship completion verified for ${intern.name}.`)
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
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/industry/interns')}
          className="p-2 hover:bg-white rounded-full transition-colors text-[#86198F] hover:text-[#4C0519]"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#FDF4FF] border border-[#F5D0FE] flex items-center justify-center text-[#701A75] text-xl font-bold">
              {intern.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#4C0519] tracking-tight">{intern.name}</h1>
              <div className="flex items-center gap-2 text-xs text-[#86198F] font-medium mt-1">
                <span>{intern.institution}</span>
                <span>•</span>
                <span className="text-[#701A75] font-bold">{intern.role}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-5 h-5 fill-current" />
              <span className="text-xl font-mono text-[#4C0519]">{intern.rating}</span>
              <span className="text-xs text-[#86198F]">/ 5</span>
            </div>
            <span className="text-[10px] text-[#86198F] font-bold uppercase tracking-wider">Performance Rating</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-2 border-b border-[#F5D0FE]">
        {[
          { id: 'tasks', label: 'Tasks Assigned', icon: FileText },
          { id: 'submissions', label: 'Submissions', icon: MessageSquare },
          { id: 'progress', label: 'Progress', icon: Clock },
          { id: 'ratings', label: 'Ratings & Final Evaluation', icon: Star },
        ].map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs transition-all border',
                activeTab === tab.id
                  ? 'text-white bg-[#701A75] border-[#701A75] shadow-xs'
                  : 'text-[#86198F] border-[#F5D0FE] bg-white hover:bg-[#FDF4FF]'
              )}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      <div className="bg-white border border-[#F5D0FE] rounded-2xl p-6 shadow-xs min-h-[350px]">
        {/* Tasks Tab */}
        {activeTab === 'tasks' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-[#4C0519]">Tasks Assigned</h3>
              <button
                onClick={() => navigate('/industry/tasks/new')}
                className="flex items-center gap-2 bg-[#701A75] hover:bg-[#86198F] text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors shadow-xs"
              >
                <Plus className="w-4 h-4" /> Assign Task
              </button>
            </div>
            <div className="space-y-3">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 bg-[#FDF4FF] rounded-xl border border-[#F5D0FE]">
                  <div>
                    <h4 className="font-bold text-xs text-[#4C0519]">{task.title}</h4>
                    <div className="flex items-center gap-3 text-[11px] text-[#86198F] font-medium mt-1">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-[#701A75]" /> Due {task.due}</span>
                      <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold">{task.priority}</span>
                    </div>
                  </div>
                  <span className={cn('text-xs font-bold px-2.5 py-1 rounded-full border', task.status === 'Completed' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-teal-100 text-teal-800 border-teal-300')}>
                    {task.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submissions Tab */}
        {activeTab === 'submissions' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#4C0519]">Review Queue</h3>
            <div className="bg-[#FDF4FF] border border-[#F5D0FE] rounded-2xl p-5 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-xs text-[#4C0519]">API Integration Module</h4>
                  <p className="text-[10px] text-[#86198F] font-medium mt-0.5">Submitted 2 hours ago</p>
                </div>
                <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-amber-300">Pending Review</span>
              </div>

              <div className="p-4 bg-white rounded-xl border border-[#F5D0FE] text-xs text-[#4C0519] font-medium leading-relaxed">
                <p>"I have completed the user authentication endpoints as requested. I used JWT for stateless sessions. Please review the attached Postman collection."</p>
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="text-xs font-bold text-[#4C0519] mb-1 block">Mentor Comment</label>
                  <textarea
                    rows={2}
                    value={mentorComment}
                    onChange={(e) => setMentorComment(e.target.value)}
                    className="w-full bg-white border border-[#F5D0FE] rounded-xl p-3 text-xs text-[#4C0519] focus:outline-none focus:border-[#701A75]"
                    placeholder="Leave feedback for the intern..."
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => handleReviewAction('Approved')} className="flex-1 bg-[#701A75] hover:bg-[#86198F] text-white py-2 rounded-xl text-xs font-bold transition-colors shadow-xs">Approve</button>
                  <button onClick={() => handleReviewAction('Revision Requested')} className="flex-1 bg-white border border-[#F5D0FE] text-[#86198F] hover:bg-[#FDF4FF] py-2 rounded-xl text-xs font-bold transition-colors">Request Revision</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Ratings Tab */}
        {activeTab === 'ratings' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-[#4C0519]">Final Evaluation & Sign-Off</h3>
              <p className="text-xs text-[#86198F] font-medium mt-1">Rate the intern across key dimensions to generate their official completion certificate.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Technical Skills', 'Communication', 'Initiative & Proactivity', 'Quality of Work', 'Professionalism'].map((dim) => (
                <div key={dim} className="bg-[#FDF4FF] p-3 rounded-xl border border-[#F5D0FE] space-y-1">
                  <div className="flex justify-between text-xs font-bold text-[#4C0519]">
                    <span>{dim}</span>
                    <span className="text-[#701A75] font-mono">4.5 / 5.0</span>
                  </div>
                  <input type="range" min="1" max="5" step="0.5" defaultValue="4.5" className="w-full accent-[#701A75] h-1.5 bg-white rounded-lg cursor-pointer" />
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[#4C0519]">Overall Summary & Final Comments</label>
              <textarea
                rows={3}
                value={summaryComment}
                onChange={(e) => setSummaryComment(e.target.value)}
                className="w-full bg-[#FDF4FF] border border-[#F5D0FE] rounded-xl p-3 text-xs text-[#4C0519] focus:outline-none focus:border-[#701A75]"
                placeholder="Summarize the intern's overall performance and growth..."
              />
            </div>

            <div className="flex gap-4 pt-4 border-t border-[#F5D0FE]">
              <button onClick={() => triggerToast('Draft evaluation saved successfully')} className="bg-white border border-[#F5D0FE] text-[#86198F] px-5 py-2.5 rounded-xl text-xs font-bold">Save Draft</button>
              <button
                onClick={() => setShowSignOffModal(true)}
                className="bg-[#701A75] hover:bg-[#86198F] text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" /> Approve Completion
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Digital Sign-Off Modal */}
      <AnimatePresence>
        {showSignOffModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={() => setShowSignOffModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-white border border-[#F5D0FE] rounded-2xl w-full max-w-md p-6 shadow-xl z-10 space-y-4">
              <div className="flex justify-between items-start pb-3 border-b border-[#F5D0FE]">
                <div className="flex items-center gap-2 text-[#701A75]">
                  <ShieldCheck className="w-5 h-5" />
                  <h3 className="text-base font-bold text-[#4C0519]">Digital Sign-Off Confirmation</h3>
                </div>
                <button onClick={() => setShowSignOffModal(false)} className="text-[#86198F] hover:text-[#4C0519]"><X size={18} /></button>
              </div>

              <p className="text-xs text-[#4C0519] font-medium leading-relaxed">
                By confirming sign-off, you officially verify that <strong className="text-[#701A75]">{intern.name}</strong> has successfully completed all assigned industry tasks and meets performance standards.
              </p>

              <div className="flex gap-3 pt-4 border-t border-[#F5D0FE]">
                <button onClick={() => setShowSignOffModal(false)} className="flex-1 bg-white border border-[#F5D0FE] text-[#86198F] py-2 rounded-xl text-xs font-bold">Cancel</button>
                <button onClick={handleConfirmSignOff} className="flex-1 bg-[#701A75] text-white hover:bg-[#86198F] py-2 rounded-xl text-xs font-bold shadow-xs">Confirm Sign-Off</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
