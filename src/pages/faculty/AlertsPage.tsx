import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, Activity, CheckCircle, Bell, AlertOctagon, TrendingDown, EyeOff, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function FacultyAlertsPage() {
  const [activeTab, setActiveTab] = useState('All Alerts')
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const tabs = [
    { id: 'All Alerts', count: 4 },
    { id: 'High Risk', count: 1 },
    { id: 'Moderate', count: 2 },
    { id: 'Low Activity', count: 1 },
  ]

  const triggerToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 2500)
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
          <h1 className="text-2xl font-bold text-[#134E4A] tracking-tight flex items-center gap-2">
            <Bell className="text-rose-600" /> Risk & Alert Center
          </h1>
          <p className="text-xs text-[#0F766E] font-medium">Proactively identify and assist students requiring intervention</p>
        </div>
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

      {/* Alert Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: High Risk */}
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="bg-white border border-[#99F6E4] rounded-2xl p-5 relative overflow-hidden shadow-xs group">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-500" />
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-sm font-bold text-[#134E4A]">Priya Sharma</h3>
              <p className="text-xs text-[#0F766E] font-medium">InnovateCorp • CS2024002</p>
            </div>
            <span className="px-2.5 py-0.5 text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300 rounded-full flex items-center gap-1">
              <AlertOctagon size={12} /> High Risk
            </span>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3 bg-rose-50/60 p-3 rounded-xl border border-rose-200">
              <EyeOff className="text-rose-600 mt-0.5 flex-shrink-0" size={16} />
              <div>
                <p className="text-xs font-bold text-rose-900">Severe Inactivity</p>
                <p className="text-[11px] text-rose-800 mt-1 font-medium">Student has not logged any activity or attended sessions for <strong className="text-rose-900">7 days</strong>.</p>
              </div>
            </div>
            <div className="bg-[#F0FDFA] border border-[#99F6E4] p-3 rounded-xl flex items-center gap-2">
              <Activity className="text-[#0D9488]" size={16} />
              <p className="text-xs font-bold text-[#134E4A]">AI Recommendation: Schedule an immediate 1-on-1 intervention meeting.</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-4 border-t border-[#99F6E4] mt-auto">
            <button
              onClick={() => triggerToast('Intervention meeting reminder sent to Priya Sharma')}
              className="flex-1 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-xl transition-colors text-center shadow-xs"
            >
              Send Intervention Reminder
            </button>
            <button onClick={() => triggerToast('Alert marked resolved')} className="px-3 py-2 text-xs font-bold bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-300 rounded-xl transition-colors" title="Mark Resolved">
              <CheckCircle size={16} />
            </button>
          </div>
        </motion.div>

        {/* Card 2: Moderate Risk */}
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="bg-white border border-[#99F6E4] rounded-2xl p-5 relative overflow-hidden shadow-xs group">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500" />
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-sm font-bold text-[#134E4A]">Karan Patel</h3>
              <p className="text-xs text-[#0F766E] font-medium">TechVista Solutions • CS2024005</p>
            </div>
            <span className="px-2.5 py-0.5 text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 rounded-full flex items-center gap-1">
              <AlertTriangle size={12} /> Moderate Risk
            </span>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3 bg-amber-50/60 p-3 rounded-xl border border-amber-200">
              <TrendingDown className="text-amber-600 mt-0.5 flex-shrink-0" size={16} />
              <div>
                <p className="text-xs font-bold text-amber-900">Performance Drop</p>
                <p className="text-[11px] text-amber-800 mt-1 font-medium">Performance score dropped by 12 points. Missed 2 consecutive milestone deadlines.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-4 border-t border-[#99F6E4] mt-auto">
            <button
              onClick={() => triggerToast('Reminder sent to Karan Patel')}
              className="flex-1 py-2 text-xs font-bold bg-[#0D9488] text-white hover:bg-[#0F766E] rounded-xl transition-colors text-center shadow-xs"
            >
              Send Reminder
            </button>
            <button onClick={() => triggerToast('Alert marked resolved')} className="px-3 py-2 text-xs font-bold bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-300 rounded-xl transition-colors" title="Mark Resolved">
              <CheckCircle size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
