import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, AlertTriangle, CheckSquare, Activity, ChevronRight, Check, X } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'

const FacultyDashboard = () => {
  const { user } = useAuth()
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [approvals, setApprovals] = useState([
    { id: 1, intern: 'David Chen', type: 'Weekly Log', date: 'Week 12', company: 'GlobalTech' },
    { id: 2, intern: 'Lisa Wong', type: 'Mid-term Report', date: 'Submission', company: 'InnovateInc' },
    { id: 3, intern: 'James Wilson', type: 'Leave Request', date: 'Nov 2-4', company: 'TechVista' },
  ])

  const triggerToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 2500)
  }

  const handleApprove = (id: number, name: string) => {
    setApprovals((prev) => prev.filter((item) => item.id !== id))
    triggerToast(`Approved request for ${name}`)
  }

  const handleReject = (id: number, name: string) => {
    setApprovals((prev) => prev.filter((item) => item.id !== id))
    triggerToast(`Rejected request for ${name}`)
  }

  const handleSendReminder = (name: string) => {
    triggerToast(`Reminder sent to ${name}`)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  const interns = [
    { name: 'Alex Johnson', company: 'TechVista', status: 'On Track', score: 85, color: 'text-[#0D9488]' },
    { name: 'Sarah Smith', company: 'DataCorp', status: 'Needs Review', score: 62, color: 'text-[#F59E0B]' },
    { name: 'Michael Lee', company: 'CloudSys', status: 'Excellent', score: 94, color: 'text-[#0F766E]' },
    { name: 'Emma Davis', company: 'WebSolutions', status: 'At Risk', score: 45, color: 'text-[#EF4444]' },
  ]

  return (
    <motion.div
      className="max-w-7xl mx-auto space-y-6 relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Toast Feedback */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed top-20 right-8 z-50 px-4 py-2 bg-[#0D9488] text-white rounded-xl shadow-lg font-semibold text-xs flex items-center gap-2"
          >
            <Check className="w-4 h-4" /> {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#042F2E]">
            Welcome, Prof. {user?.full_name?.split(' ')[1] || 'Faculty'}
          </h1>
          <p className="text-[#115E59] mt-1 font-medium">You are mentoring 8 students this semester.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-[#0D9488]/10 text-[#0D9488] rounded-full border border-[#0D9488]/30 self-start md:self-auto font-semibold text-sm">
          <Users className="w-4 h-4 text-[#0D9488]" />
          <span>8 Assigned Interns</span>
        </div>
      </div>

      {/* Intern Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {interns.map((intern, i) => (
          <motion.div key={i} variants={itemVariants}>
            <Link
              to="/faculty/interns"
              className="block bg-white border border-[#CCFBF1] rounded-2xl p-5 hover:border-[#0D9488] hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-[#042F2E] font-bold">{intern.name}</h3>
                <span className="font-mono text-lg font-bold text-[#0D9488]">{intern.score}</span>
              </div>
              <p className="text-[#115E59] text-xs font-medium mb-4">{intern.company}</p>
              <div className="flex justify-between items-center">
                <span className={cn('text-xs font-bold px-2 py-1 rounded-md bg-opacity-10 bg-current', intern.color)}>
                  {intern.status}
                </span>
                <ChevronRight className="w-4 h-4 text-[#115E59]" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Approvals */}
        <motion.div variants={itemVariants} className="lg:col-span-2 bg-white border border-[#CCFBF1] rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-[#042F2E] flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-[#0D9488]" /> Pending Approvals
            </h3>
            <Link to="/faculty/approvals" className="text-[#0D9488] text-sm font-semibold hover:underline">View All Queue</Link>
          </div>
          <div className="space-y-4">
            {approvals.length === 0 ? (
              <p className="text-center py-6 text-xs text-[#115E59] font-medium">All pending approvals have been processed!</p>
            ) : (
              approvals.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#F0FDFA] rounded-xl border border-[#CCFBF1] gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#0D9488]/20 flex items-center justify-center text-[#0D9488] font-bold text-sm">
                      {item.intern.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-[#042F2E] font-bold text-sm">
                        {item.intern} <span className="text-[#115E59] font-normal text-xs ml-2">({item.company})</span>
                      </h4>
                      <p className="text-[#115E59] text-xs mt-1 font-medium">{item.type} • {item.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(item.id, item.intern)}
                      className="px-4 py-2 bg-[#0D9488] text-white hover:bg-[#0F766E] rounded-lg text-xs font-semibold shadow-sm transition-colors flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" /> Approve
                    </button>
                    <button
                      onClick={() => handleReject(item.id, item.intern)}
                      className="px-4 py-2 bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
                    >
                      <X className="w-3.5 h-3.5" /> Reject
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>

        {/* Risk Alerts */}
        <motion.div variants={itemVariants} className="bg-white border border-[#CCFBF1] rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-[#042F2E] flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#EF4444]" /> Risk Alerts
            </h3>
            <Link to="/faculty/alerts" className="text-[#0D9488] text-sm font-semibold hover:underline">Alert Center</Link>
          </div>
          <div className="space-y-4">
            {[
              { intern: 'Emma Davis', reason: 'Missed 2 weekly logs', severity: 'High' },
              { intern: 'Sarah Smith', reason: 'Low industry mentor rating', severity: 'Medium' },
            ].map((alert, i) => (
              <div key={i} className="p-4 bg-[#F0FDFA] rounded-xl border border-[#CCFBF1]">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-[#042F2E] font-bold text-sm">{alert.intern}</h4>
                  <span className={cn('text-xs font-bold px-2 py-0.5 rounded', alert.severity === 'High' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-800')}>
                    {alert.severity} Risk
                  </span>
                </div>
                <p className="text-[#115E59] text-xs mb-3 font-medium">{alert.reason}</p>
                <button
                  onClick={() => handleSendReminder(alert.intern)}
                  className="w-full py-2 bg-[#0D9488] hover:bg-[#0F766E] text-white font-semibold rounded-lg text-xs transition-colors shadow-xs"
                >
                  Send Reminder
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Comparison */}
        <motion.div variants={itemVariants} className="bg-white border border-[#CCFBF1] rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-[#042F2E] mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#0D9488]" /> Performance Overview
          </h3>
          <div className="space-y-5">
            {[
              { metric: 'Task Completion', val: 82, color: 'bg-[#0D9488]' },
              { metric: 'Attendance', val: 95, color: 'bg-[#10B981]' },
              { metric: 'Mentor Evaluation', val: 76, color: 'bg-[#F59E0B]' },
              { metric: 'Report Quality', val: 88, color: 'bg-[#0F766E]' },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-[#042F2E]">{item.metric}</span>
                  <span className="font-mono text-[#115E59]">{item.val}% avg</span>
                </div>
                <div className="h-2.5 w-full bg-[#CCFBF1]/50 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.val}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className={cn('h-full rounded-full', item.color)}
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Activity Feed */}
        <motion.div variants={itemVariants} className="bg-white border border-[#CCFBF1] rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-[#042F2E] mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#115E59]" /> Recent Activity
          </h3>
          <div className="space-y-4">
            {[
              { text: 'Michael Lee submitted week 12 log', time: '2 hours ago' },
              { text: 'Industry Mentor left feedback for Alex Johnson', time: '5 hours ago' },
              { text: 'Emma Davis updated profile information', time: '1 day ago' },
              { text: 'Approved leave request for James Wilson', time: '1 day ago' },
              { text: 'System generated monthly progress report', time: '2 days ago' },
            ].map((act, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-[#0D9488]"></div>
                <div>
                  <p className="text-[#042F2E] text-xs font-semibold">{act.text}</p>
                  <p className="text-[#115E59] text-[11px] mt-0.5 font-medium">{act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default FacultyDashboard
