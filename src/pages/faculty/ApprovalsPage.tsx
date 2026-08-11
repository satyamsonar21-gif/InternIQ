import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Clock, CheckCircle, Paperclip } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function FacultyApprovalsPage() {
  const [activeTab, setActiveTab] = useState('Work Logs Pending')
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [feedbackTexts, setFeedbackTexts] = useState<Record<string, string>>({})

  const tabs = [
    { id: 'Work Logs Pending', count: 3 },
    { id: 'Milestones Pending', count: 2 },
    { id: 'Documents Pending', count: 2 },
  ]

  const triggerToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 2500)
  }

  const handleAction = (item: string, status: string) => {
    triggerToast(`${status} submission for ${item}`)
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
          <h1 className="text-2xl font-bold text-[#134E4A] tracking-tight">Faculty Approval Queue</h1>
          <p className="text-xs text-[#0F766E] font-medium">Review and approve intern submissions, logs, and documents</p>
        </div>
        <button
          onClick={() => triggerToast('Bulk approved all 3 pending work log submissions!')}
          className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold bg-[#0D9488] hover:bg-[#0F766E] text-white rounded-xl shadow-xs transition-colors"
        >
          <CheckCircle size={16} /> Bulk Approve Selected
        </button>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto border-b border-[#99F6E4] bg-white p-1 rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'px-4 py-2 text-xs font-bold whitespace-nowrap rounded-lg transition-colors flex items-center gap-2',
              activeTab === tab.id ? 'bg-[#0D9488] text-white shadow-xs' : 'text-[#0F766E] hover:text-[#134E4A]'
            )}
          >
            {tab.id}
            <span className={cn('px-2 py-0.5 rounded-full text-[10px]', activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-[#F0FDFA] text-[#0D9488] border border-[#99F6E4]')}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Queue Content */}
      <div className="space-y-4">
        {/* Mock Item 1 */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-[#99F6E4] rounded-2xl p-5 shadow-xs">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex gap-4 lg:w-1/4">
              <input type="checkbox" className="mt-1 rounded border-[#99F6E4] text-[#0D9488] focus:ring-[#0D9488]" />
              <div>
                <h4 className="text-[#134E4A] font-bold text-sm">Arjun Mehta</h4>
                <p className="text-[11px] text-[#0F766E] font-medium mb-2">CS2024001 • TechVista</p>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F0FDFA] border border-[#99F6E4] text-[10px] font-bold text-[#0D9488]">
                  <Clock size={12} /> Submitted 2h ago
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 space-y-2">
              <h5 className="text-xs font-bold text-[#134E4A]">Week 4 Activity Log</h5>
              <p className="text-xs text-[#0F766E] font-medium leading-relaxed">
                Completed the UI implementation for the main dashboard. Integrated the real-time analytics API and resolved 3 major bugs in sidebar navigation.
              </p>
              <div className="flex gap-2">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#0D9488] bg-[#F0FDFA] px-2 py-1 rounded-lg border border-[#99F6E4] hover:bg-white cursor-pointer transition-colors">
                  <Paperclip size={12} /> dashboard_screenshot.png
                </span>
              </div>
            </div>

            <div className="lg:w-1/4 flex flex-col gap-2 justify-end border-t lg:border-t-0 lg:border-l border-[#99F6E4] pt-4 lg:pt-0 lg:pl-6">
              <textarea
                placeholder="Add feedback before action..."
                value={feedbackTexts['1'] || ''}
                onChange={(e) => setFeedbackTexts({ ...feedbackTexts, '1': e.target.value })}
                className="w-full bg-[#F0FDFA] border border-[#99F6E4] rounded-xl p-2 text-xs text-[#134E4A] focus:outline-none focus:border-[#0D9488] resize-none"
                rows={2}
              ></textarea>
              <div className="flex gap-2 justify-end w-full">
                <button onClick={() => handleAction('Arjun Mehta', 'Rejected')} className="flex-1 py-1.5 text-xs font-bold bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors text-center">
                  Reject
                </button>
                <button onClick={() => handleAction('Arjun Mehta', 'Revision Requested')} className="flex-1 py-1.5 text-xs font-bold bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 rounded-xl transition-colors text-center">
                  Revise
                </button>
                <button onClick={() => handleAction('Arjun Mehta', 'Approved')} className="flex-1 py-1.5 text-xs font-bold bg-[#0D9488] text-white hover:bg-[#0F766E] rounded-xl transition-colors text-center flex items-center justify-center gap-1">
                  <Check size={14} /> Approve
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mock Item 2 */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white border border-[#99F6E4] rounded-2xl p-5 shadow-xs">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex gap-4 lg:w-1/4">
              <input type="checkbox" className="mt-1 rounded border-[#99F6E4] text-[#0D9488] focus:ring-[#0D9488]" />
              <div>
                <h4 className="text-[#134E4A] font-bold text-sm">Priya Sharma</h4>
                <p className="text-[11px] text-[#0F766E] font-medium mb-2">CS2024002 • InnovateCorp</p>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F0FDFA] border border-[#99F6E4] text-[10px] font-bold text-[#0D9488]">
                  <Clock size={12} /> Submitted 1d ago
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 space-y-2">
              <h5 className="text-xs font-bold text-[#134E4A]">Week 3 Activity Log</h5>
              <p className="text-xs text-[#0F766E] font-medium leading-relaxed">
                Began exploratory data analysis on customer dataset. Cleaned missing values and prepared preliminary visualization scripts in Python.
              </p>
            </div>

            <div className="lg:w-1/4 flex flex-col gap-2 justify-end border-t lg:border-t-0 lg:border-l border-[#99F6E4] pt-4 lg:pt-0 lg:pl-6">
              <textarea
                placeholder="Add feedback before action..."
                value={feedbackTexts['2'] || ''}
                onChange={(e) => setFeedbackTexts({ ...feedbackTexts, '2': e.target.value })}
                className="w-full bg-[#F0FDFA] border border-[#99F6E4] rounded-xl p-2 text-xs text-[#134E4A] focus:outline-none focus:border-[#0D9488] resize-none"
                rows={2}
              ></textarea>
              <div className="flex gap-2 justify-end w-full">
                <button onClick={() => handleAction('Priya Sharma', 'Rejected')} className="flex-1 py-1.5 text-xs font-bold bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors text-center">
                  Reject
                </button>
                <button onClick={() => handleAction('Priya Sharma', 'Revision Requested')} className="flex-1 py-1.5 text-xs font-bold bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 rounded-xl transition-colors text-center">
                  Revise
                </button>
                <button onClick={() => handleAction('Priya Sharma', 'Approved')} className="flex-1 py-1.5 text-xs font-bold bg-[#0D9488] text-white hover:bg-[#0F766E] rounded-xl transition-colors text-center flex items-center justify-center gap-1">
                  <Check size={14} /> Approve
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
