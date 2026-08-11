import { motion } from 'framer-motion'
import { Briefcase, Calendar, CheckCircle, Clock, FileText, Target, TrendingUp, Sparkles, AlertCircle } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'

const StudentDashboard = () => {
  const { user } = useAuth()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  return (
    <motion.div
      className="max-w-7xl mx-auto space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#431407]">
            Welcome back, {user?.full_name || 'Student'} 👋
          </h1>
          <p className="text-[#9A3412] mt-1">Here's what's happening with your internship today.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-[#10B981]/10 text-[#047857] rounded-full border border-[#10B981]/30 self-start md:self-auto">
          <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></div>
          <span className="font-semibold text-sm">Active Internship</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Internship Summary */}
        <motion.div variants={itemVariants} className="lg:col-span-2 bg-white border border-[#FED7AA] rounded-2xl p-6 shadow-sm">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-[#431407]">TechVista Solutions</h2>
              <p className="text-[#F97316] font-semibold flex items-center gap-2 mt-1">
                <Briefcase className="w-4 h-4 text-[#F97316]" />
                Frontend Developer Intern
              </p>
            </div>
            <div className="text-right">
              <p className="text-[#9A3412] text-sm flex items-center justify-end gap-1 font-medium">
                <Calendar className="w-4 h-4 text-[#F97316]" /> Aug 1 – Dec 31, 2024
              </p>
              <p className="text-[#431407] font-bold mt-1">
                <span className="font-mono text-[#EA580C]">47</span> Days Remaining
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-[#FFF7ED] p-4 rounded-xl border border-[#FED7AA]">
              <Target className="w-6 h-6 text-[#F97316] mb-2" />
              <p className="text-[#9A3412] text-xs font-semibold uppercase tracking-wider mb-1">Tasks</p>
              <p className="font-mono text-xl font-bold text-[#431407]">12/18</p>
            </div>
            <div className="bg-[#FFF7ED] p-4 rounded-xl border border-[#FED7AA]">
              <CheckCircle className="w-6 h-6 text-[#10B981] mb-2" />
              <p className="text-[#9A3412] text-xs font-semibold uppercase tracking-wider mb-1">Milestones</p>
              <p className="font-mono text-xl font-bold text-[#431407]">3/5</p>
            </div>
            <div className="bg-[#FFF7ED] p-4 rounded-xl border border-[#FED7AA]">
              <Clock className="w-6 h-6 text-[#EA580C] mb-2" />
              <p className="text-[#9A3412] text-xs font-semibold uppercase tracking-wider mb-1">Attendance</p>
              <p className="font-mono text-xl font-bold text-[#431407]">94%</p>
            </div>
            <div className="bg-[#FFF7ED] p-4 rounded-xl border border-[#FED7AA]">
              <TrendingUp className="w-6 h-6 text-[#F59E0B] mb-2" />
              <p className="text-[#9A3412] text-xs font-semibold uppercase tracking-wider mb-1">Performance</p>
              <p className="font-mono text-xl font-bold text-[#431407]">78/100</p>
            </div>
          </div>
        </motion.div>

        {/* Readiness Ring & AI Insight */}
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="bg-white border border-[#FED7AA] rounded-2xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-sm">
            <h3 className="text-[#431407] font-bold mb-4">Placement Readiness</h3>
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#FED7AA" strokeWidth="8" />
                <circle
                  cx="50" cy="50" r="40" fill="transparent"
                  stroke="#F97316" strokeWidth="8"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * 72) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="font-mono text-3xl font-bold text-[#431407]">72%</span>
              </div>
            </div>
            <p className="text-[#9A3412] text-xs font-medium mt-4">Good standing, keep improving your task completion rate.</p>
          </div>

          <div className="bg-[#FFF7ED] border border-[#FED7AA] rounded-2xl p-5 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Sparkles className="w-16 h-16 text-[#F97316]" />
            </div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-[#F97316]" />
              <h3 className="text-[#EA580C] font-bold">AI Insight</h3>
            </div>
            <p className="text-[#431407] text-xs leading-relaxed relative z-10 font-medium">
              Based on your recent work logs, focusing on <strong className="text-[#F97316]">React Performance Optimization</strong> could significantly boost your final evaluation score. Consider completing the optional module on memoization.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Work Logs */}
        <motion.div variants={itemVariants} className="bg-white border border-[#FED7AA] rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-[#431407] flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#F97316]" /> Recent Work Logs
            </h3>
            <Link to="/student/logs" className="text-[#F97316] text-sm font-semibold hover:underline">View All</Link>
          </div>
          <div className="space-y-4">
            {[
              { title: 'Implemented Authentication Flow', date: 'Oct 24, 2024', status: 'Approved', color: 'bg-[#10B981]/10 text-[#047857] border-[#10B981]/30' },
              { title: 'Designed Dashboard Layout', date: 'Oct 25, 2024', status: 'Submitted', color: 'bg-[#F97316]/10 text-[#EA580C] border-[#F97316]/30' },
              { title: 'API Integration for Analytics', date: 'Oct 27, 2024', status: 'Draft', color: 'bg-slate-100 text-slate-700 border-slate-300' },
            ].map((log, i) => (
              <Link key={i} to="/student/logs" className="flex items-center justify-between p-4 bg-[#FFF7ED] rounded-xl border border-[#FED7AA] hover:border-[#F97316] transition-colors block">
                <div>
                  <h4 className="text-[#431407] font-semibold text-sm">{log.title}</h4>
                  <p className="text-[#9A3412] text-xs mt-1 font-medium">{log.date}</p>
                </div>
                <span className={cn('px-3 py-1 rounded-full text-xs font-semibold border', log.color)}>
                  {log.status}
                </span>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Milestones */}
        <motion.div variants={itemVariants} className="bg-white border border-[#FED7AA] rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-[#431407] flex items-center gap-2">
              <Target className="w-5 h-5 text-[#F59E0B]" /> Upcoming Milestones
            </h3>
            <Link to="/student/milestones" className="text-[#F97316] text-sm font-semibold hover:underline">View All</Link>
          </div>
          <div className="space-y-4">
            <Link to="/student/milestones" className="block p-4 bg-[#FFF7ED] rounded-xl border border-[#FED7AA] border-l-4 border-l-[#F59E0B] hover:border-r-[#F97316] transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-[#431407] font-semibold text-sm">Mid-term Evaluation Report</h4>
                  <p className="text-[#9A3412] text-xs mt-1 font-medium">Submit your self-assessment and industry mentor feedback.</p>
                </div>
                <div className="text-right">
                  <p className="text-[#B45309] font-bold text-xs flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> Due: Oct 30
                  </p>
                </div>
              </div>
            </Link>
            <Link to="/student/milestones" className="block p-4 bg-[#FFF7ED] rounded-xl border border-[#FED7AA] border-l-4 border-l-[#EA580C] hover:border-r-[#F97316] transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-[#431407] font-semibold text-sm">Final Project Presentation</h4>
                  <p className="text-[#9A3412] text-xs mt-1 font-medium">Prepare slides covering architecture and learnings.</p>
                </div>
                <div className="text-right">
                  <p className="text-[#9A3412] font-semibold text-xs flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-[#F97316]" /> Due: Dec 15
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default StudentDashboard
