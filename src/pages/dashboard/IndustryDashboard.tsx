import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Users, ClipboardCheck, TrendingUp, Search } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { Link } from 'react-router-dom'

const IndustryDashboard = () => {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  const interns = [
    { name: 'Alex Johnson', role: 'Frontend Intern', progress: 85, tasks: '12/14' },
    { name: 'Sarah Smith', role: 'Data Science Intern', progress: 62, tasks: '8/15' },
    { name: 'David Chen', role: 'Backend Intern', progress: 90, tasks: '18/20' },
  ]

  const filteredInterns = interns.filter(
    (i) =>
      i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <motion.div
      className="max-w-7xl mx-auto space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#3B0764]">TechVista Solutions</h1>
          <p className="text-[#6B21A8] mt-1 font-medium">Hello, {user?.full_name || 'Mentor'} 👋 Manage your interns here.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-[#701A75]/10 text-[#701A75] rounded-full border border-[#701A75]/30 font-semibold text-sm">
            <Users className="w-4 h-4 text-[#701A75]" />
            <span>4 Active Interns</span>
          </div>
          <Link
            to="/industry/tasks/new"
            className="flex items-center gap-2 px-4 py-2 bg-[#701A75] hover:bg-[#581C87] text-white rounded-xl font-semibold transition-colors shadow-md shadow-[#701A75]/20 text-sm"
          >
            <Plus className="w-4 h-4" /> Assign Task
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Intern Progress */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold text-[#3B0764]">Intern Progress</h2>
            <div className="relative">
              <Search className="w-4 h-4 text-[#6B21A8] absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search interns..."
                className="pl-9 pr-4 py-2 bg-white border border-[#F5D0FE] rounded-xl text-xs text-[#3B0764] placeholder:text-[#6B21A8]/60 focus:outline-none focus:border-[#701A75]"
              />
            </div>
          </div>

          {filteredInterns.map((intern, i) => (
            <Link
              key={i}
              to="/industry/interns"
              className="block bg-white border border-[#F5D0FE] rounded-2xl p-6 hover:border-[#701A75] hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#FDF4FF] border border-[#F5D0FE] flex items-center justify-center text-[#701A75] font-bold text-lg">
                    {intern.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-[#3B0764] font-bold text-base">{intern.name}</h3>
                    <p className="text-[#701A75] text-xs font-medium">{intern.role}</p>
                  </div>
                </div>
                <div className="w-full sm:w-1/2">
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-[#6B21A8]">Overall Progress</span>
                    <span className="font-mono text-[#3B0764]">{intern.progress}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-[#FDF4FF] rounded-full overflow-hidden border border-[#F5D0FE]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${intern.progress}%` }}
                      transition={{ duration: 1 }}
                      className="h-full rounded-full bg-[#701A75]"
                    ></motion.div>
                  </div>
                  <p className="text-[#6B21A8] text-xs mt-2 text-right font-medium">
                    Tasks completed: <span className="font-mono font-bold text-[#3B0764]">{intern.tasks}</span>
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>

        <div className="space-y-6">
          {/* Completion Widget */}
          <motion.div variants={itemVariants} className="bg-white border border-[#F5D0FE] rounded-2xl p-6 flex flex-col items-center shadow-sm">
            <h3 className="text-[#3B0764] font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#10B981]" /> Program Completion
            </h3>
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#FDF4FF" strokeWidth="12" />
                <circle
                  cx="50" cy="50" r="40" fill="transparent"
                  stroke="#10B981" strokeWidth="12"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * 75) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="font-mono text-4xl font-bold text-[#3B0764]">75%</span>
                <span className="text-[#6B21A8] text-xs font-semibold mt-1">Average</span>
              </div>
            </div>
          </motion.div>

          {/* Pending Reviews */}
          <motion.div variants={itemVariants} className="bg-white border border-[#F5D0FE] rounded-2xl p-6 shadow-sm">
            <h3 className="text-xl font-bold text-[#3B0764] mb-4 flex items-center gap-2">
              <ClipboardCheck className="w-5 h-5 text-[#F59E0B]" /> Pending Reviews
            </h3>
            <div className="space-y-3">
              {[
                { task: 'Implement Login UI', by: 'Alex Johnson', days: '2 days ago' },
                { task: 'Database Schema Draft', by: 'David Chen', days: 'Yesterday' },
              ].map((review, i) => (
                <Link key={i} to="/industry/interns" className="block p-3 bg-[#FDF4FF] rounded-xl border border-[#F5D0FE] hover:border-[#701A75] transition-colors cursor-pointer">
                  <h4 className="text-[#3B0764] font-bold text-xs">{review.task}</h4>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-[#6B21A8] text-[11px] font-medium">By {review.by}</span>
                    <span className="text-[#B45309] font-bold text-[11px]">{review.days}</span>
                  </div>
                </Link>
              ))}
              <Link to="/industry/interns" className="block w-full text-center py-2 text-[#701A75] font-semibold text-xs hover:underline mt-2">
                View all pending reviews
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default IndustryDashboard
