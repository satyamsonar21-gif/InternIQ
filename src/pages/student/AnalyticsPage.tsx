import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TrendingUp,
  Sparkles,
  Download,
  Target,
  Brain,
  Check,
} from 'lucide-react'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'

const SKILL_DATA = [
  { subject: 'Technical', A: 85, fullMark: 100 },
  { subject: 'Communication', A: 68, fullMark: 100 },
  { subject: 'Initiative', A: 90, fullMark: 100 },
  { subject: 'Quality', A: 82, fullMark: 100 },
  { subject: 'Documentation', A: 65, fullMark: 100 },
  { subject: 'Problem Solving', A: 88, fullMark: 100 },
]

const WORK_CONSISTENCY_DATA = [
  { week: 'W1', hours: 38 },
  { week: 'W2', hours: 40 },
  { week: 'W3', hours: 35 },
  { week: 'W4', hours: 42 },
  { week: 'W5', hours: 39 },
  { week: 'W6', hours: 44 },
  { week: 'W7', hours: 40 },
]

export default function StudentAnalyticsPage() {
  const [downloading, setDownloading] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const triggerToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 2500)
  }

  const handleExportPDF = () => {
    setDownloading(true)
    setTimeout(() => {
      setDownloading(false)
      triggerToast('Performance Report PDF generated successfully!')
    }, 1500)
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
            className="fixed top-20 right-8 z-50 px-4 py-2 bg-[#F97316] text-white rounded-xl shadow-lg font-semibold text-xs flex items-center gap-2"
          >
            <Check className="w-4 h-4" /> {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#431407]">Performance & Skill Analytics</h1>
          <p className="text-xs text-[#9A3412] font-medium">AI-calculated placement readiness scores, competency radar, and progress trends</p>
        </div>

        <button
          onClick={handleExportPDF}
          disabled={downloading}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-xs font-semibold text-white shadow-md shadow-[#F97316]/20 transition-all self-start sm:self-auto disabled:opacity-60"
        >
          {downloading ? <Sparkles className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
          {downloading ? 'Generating PDF...' : 'Export Performance Report'}
        </button>
      </div>

      {/* Top 4 Key Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-[#FED7AA] rounded-2xl p-5 shadow-xs">
          <p className="text-[10px] uppercase tracking-wider text-[#9A3412] font-bold">Overall Performance</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-bold font-mono text-[#431407]">78</span>
            <span className="text-xs text-[#9A3412]">/ 100</span>
          </div>
          <span className="inline-block mt-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
            Above Average
          </span>
        </div>

        <div className="bg-white border border-[#FED7AA] rounded-2xl p-5 shadow-xs">
          <p className="text-[10px] uppercase tracking-wider text-[#EA580C] font-bold">Placement Readiness</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-bold font-mono text-[#F97316]">72%</span>
          </div>
          <span className="inline-block mt-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F97316]/10 text-[#EA580C]">
            Interview Ready
          </span>
        </div>

        <div className="bg-white border border-[#FED7AA] rounded-2xl p-5 shadow-xs">
          <p className="text-[10px] uppercase tracking-wider text-emerald-700 font-bold">Attendance Rate</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-bold font-mono text-emerald-600">94%</span>
          </div>
          <span className="inline-block mt-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
            Verified
          </span>
        </div>

        <div className="bg-white border border-[#FED7AA] rounded-2xl p-5 shadow-xs">
          <p className="text-[10px] uppercase tracking-wider text-amber-700 font-bold">Tasks Completed</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-bold font-mono text-amber-600">12</span>
            <span className="text-xs text-[#9A3412]">/ 18</span>
          </div>
          <span className="inline-block mt-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
            66.6% Done
          </span>
        </div>
      </div>

      {/* AI Performance Narrative Section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#FFF7ED] border border-[#FED7AA] rounded-2xl p-6 shadow-xs relative overflow-hidden"
      >
        <div className="flex items-center gap-2 text-xs font-bold text-[#EA580C] mb-3">
          <Brain className="w-5 h-5 text-[#F97316]" />
          AI Intelligence Layer — Performance Narrative & Insights
        </div>

        <p className="text-xs text-[#431407] leading-relaxed font-sans font-medium">
          Arjun demonstrates high performance in Technical Implementation (85/100) and Problem Solving (88/100), with robust work log submission consistency averaging 39.7 hours per week. His code deliverables and milestone verifications are consistently rated above peer averages by his Industry Mentor (Rahul Kapoor).
        </p>
        <p className="text-xs text-[#9A3412] leading-relaxed mt-2 font-medium">
          <span className="text-[#EA580C] font-bold">Recommended Improvement Area:</span> Documentation Quality (65/100) and Communication (68/100) are flagged as potential growth areas. Improving technical documentation formatting and adding sprint presentation attachments will raise the placement readiness score from 72% to over 85%.
        </p>
      </motion.div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Skill Radar Chart */}
        <div className="bg-white border border-[#FED7AA] rounded-2xl p-6 shadow-xs">
          <h3 className="text-sm font-bold text-[#431407] mb-4 flex items-center gap-2">
            <Target className="w-4 h-4 text-[#F97316]" />
            Competency Skill Radar
          </h3>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={SKILL_DATA}>
                <PolarGrid stroke="#FED7AA" />
                <PolarAngleAxis dataKey="subject" stroke="#9A3412" tick={{ fill: '#431407', fontSize: 11, fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#FED7AA" />
                <Radar name="Competency Score" dataKey="A" stroke="#F97316" fill="#F97316" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Work Consistency Line Chart */}
        <div className="bg-white border border-[#FED7AA] rounded-2xl p-6 shadow-xs">
          <h3 className="text-sm font-bold text-[#431407] mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#10B981]" />
            Weekly Hours Consistency Trend
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={WORK_CONSISTENCY_DATA}>
                <XAxis dataKey="week" stroke="#9A3412" tick={{ fill: '#431407', fontSize: 11, fontWeight: 600 }} />
                <YAxis stroke="#9A3412" tick={{ fill: '#431407', fontSize: 11, fontWeight: 600 }} domain={[0, 50]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#FFF7ED', borderColor: '#FED7AA', borderRadius: '12px', fontSize: '12px', color: '#431407' }}
                />
                <Line type="monotone" dataKey="hours" stroke="#F97316" strokeWidth={3} dot={{ fill: '#F97316', r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Skill Gap Analysis List */}
      <div className="bg-white border border-[#FED7AA] rounded-2xl p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-[#431407]">Actionable Skill Gap Improvement Recommendations</h3>

        <div className="space-y-3">
          {[
            {
              skill: 'Documentation Quality',
              gap: '65 / 100',
              recommendation: 'Include architectural design diagrams and API endpoints documentation in weekly work logs.',
              priority: 'High Impact',
            },
            {
              skill: 'Technical Communication',
              gap: '68 / 100',
              recommendation: 'Attach sprint demo recordings or slide decks during weekly summary submissions.',
              priority: 'Medium Impact',
            },
          ].map((item, i) => (
            <div key={i} className="p-4 bg-[#FFF7ED] border border-[#FED7AA] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-[#431407]">{item.skill}</h4>
                  <span className="text-[10px] font-mono text-[#EA580C] bg-[#F97316]/10 px-2 py-0.5 rounded-full font-bold">
                    Current: {item.gap}
                  </span>
                </div>
                <p className="text-xs text-[#9A3412] mt-1 font-medium">{item.recommendation}</p>
              </div>

              <button
                onClick={() => triggerToast(`Opened resource guide for ${item.skill}`)}
                className="px-3 py-1.5 bg-[#F97316] text-white text-xs font-bold rounded-lg hover:bg-[#EA580C] transition-all self-start sm:self-auto shadow-xs"
              >
                View Suggested Resource
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
