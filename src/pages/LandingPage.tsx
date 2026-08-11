import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BarChart3,
  BookOpen,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  FileText,
  GraduationCap,
  Layers,
  MessageSquare,
  PieChart,
  ShieldCheck,
  Sparkles,
  Check,
} from 'lucide-react'

export default function LandingPage() {
  const [demoToast, setDemoToast] = useState(false)

  const handleDemoRequest = () => {
    setDemoToast(true)
    setTimeout(() => setDemoToast(false), 3000)
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#09090B] font-sans selection:bg-slate-900 selection:text-white overflow-x-hidden">
      {/* Demo Toast */}
      <AnimatePresence>
        {demoToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-slate-900 text-white rounded-full text-xs font-bold flex items-center gap-2 shadow-2xl"
          >
            <Check className="w-4 h-4 text-emerald-400" /> Demo requested! Our team will contact your institution shortly.
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Top Nav Bar */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center font-bold text-white shadow-md">
                IQ
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">InternIQ</span>
            </div>
            <div className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600">
              <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
              <a href="#about" className="hover:text-slate-900 transition-colors">About</a>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-slate-700 hover:text-slate-900 font-bold text-sm">
                Login
              </Link>
              <Link to="/register" className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl font-bold text-sm transition-colors shadow-md">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 mb-8 shadow-xs"
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Next-Generation Enterprise Platform</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 max-w-4xl leading-tight"
        >
          The Intelligent Internship Platform for <span className="text-slate-900 underline decoration-slate-400">Modern Institutions</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-slate-600 mb-10 max-w-3xl font-medium"
        >
          AI-powered lifecycle management that connects students, faculty, and industry partners in one seamless ecosystem.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Link to="/register" className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-bold text-base transition-all shadow-lg flex items-center justify-center gap-2">
            Get Started <ChevronRight className="w-5 h-5" />
          </Link>
          <button
            onClick={handleDemoRequest}
            className="px-8 py-4 rounded-xl font-bold text-base transition-all border border-slate-300 bg-white hover:bg-slate-100 text-slate-900 flex items-center justify-center gap-2 shadow-xs"
          >
            Request a Demo
          </button>
        </motion.div>
      </section>

      {/* 3. Metrics Strip */}
      <section className="border-y border-slate-200 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Institutions', value: '50+' },
              { label: 'Interns Tracked', value: '10,000+' },
              { label: 'Reports Generated', value: '25,000+' },
              { label: 'Satisfaction', value: '98%' },
            ].map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col gap-1"
              >
                <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">{metric.value}</span>
                <span className="text-slate-500 font-semibold text-xs uppercase tracking-wider">{metric.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Role Feature Cards */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Empowering Every Stakeholder</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-base font-medium">Tailored experiences designed specifically for the unique needs of students, faculty, and industry partners.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              role: 'Students',
              icon: GraduationCap,
              color: 'bg-orange-500',
              description: 'Navigate your internship journey with intelligent guidance and real-time support.',
              features: ['AI Placement Score', 'Automated Daily Logs', 'Smart Task Tracking', 'Direct AI Chat Assistant'],
            },
            {
              role: 'Faculty Mentors',
              icon: BookOpen,
              color: 'bg-teal-600',
              description: 'Monitor student progress and evaluate performance with comprehensive analytics.',
              features: ['Cohort Dashboards', 'Approval Queues', 'Risk & Inactivity Alerts', 'Batch Summary Reports'],
            },
            {
              role: 'Industry Partners',
              icon: Briefcase,
              color: 'bg-purple-700',
              description: 'Manage interns efficiently with streamlined tools and seamless feedback loops.',
              features: ['Task Assignments', 'Submission Reviews', 'Digital Sign-Off', '5-Dimension Rating Evaluation'],
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="bg-white border border-slate-200 rounded-2xl p-8 flex flex-col h-full hover:shadow-xl transition-all group relative overflow-hidden"
            >
              <div className={`w-14 h-14 rounded-xl ${card.color} flex items-center justify-center mb-6 text-white shadow-md relative z-10`}>
                <card.icon className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 relative z-10">{card.role}</h3>
              <p className="text-slate-600 text-sm mb-8 flex-grow relative z-10 font-medium">{card.description}</p>
              <ul className="space-y-3 relative z-10">
                {card.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3 text-slate-800 text-xs font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. Core Features Grid */}
      <section id="features" className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Core Platform Features</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-base font-medium">Everything you need to manage, track, and evaluate internships at scale.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Smart Analytics', icon: BarChart3, desc: 'Real-time insights into student performance and program health across all departments.' },
              { title: 'AI Feedback', icon: MessageSquare, desc: 'Automated, constructive feedback on student reports and daily log submissions.' },
              { title: 'Real-Time Tracking', icon: Layers, desc: 'Live monitoring of attendance, hours worked, and overall task completion.' },
              { title: 'Document Management', icon: FileText, desc: 'Secure storage and automated routing for all internship-related paperwork.' },
              { title: 'Placement Intelligence', icon: PieChart, desc: 'Intelligently match students with optimal opportunities based on skills.' },
              { title: 'Role-Based Access', icon: ShieldCheck, desc: 'Granular permissions ensuring data privacy and security for all stakeholders.' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-[#FAFAFA] border border-slate-200 rounded-2xl p-6 hover:bg-white hover:shadow-md transition-all cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center mb-4 text-white shadow-sm">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-xs font-medium leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. AI Spotlight */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 border border-slate-300 text-xs font-bold text-slate-800 mb-6">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>InternIQ Assistant</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">Your Always-On AI Co-Pilot</h2>
              <p className="text-base text-slate-600 mb-8 leading-relaxed font-medium">
                Reduce administrative overhead by up to 80%. Our specialized AI assists students with their logs, helps faculty grade reports, and simplifies mentor evaluations.
              </p>
              <ul className="space-y-4 mb-8">
                {['Drafts weekly progress summaries', 'Identifies learning gaps automatically', 'Suggests relevant learning resources'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 flex-shrink-0 font-bold text-xs">
                      ✓
                    </div>
                    <span className="text-slate-900 text-sm font-semibold">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/register" className="inline-flex items-center gap-2 text-slate-900 font-bold hover:underline transition-all">
                Explore AI Features <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
          <div className="lg:w-1/2 w-full relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl relative z-10"
            >
              <div className="bg-slate-900 px-4 py-3 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <div className="text-xs font-bold text-white mx-auto flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> InternIQ AI
                </div>
              </div>
              <div className="p-6 space-y-4 bg-slate-50">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex-shrink-0 flex items-center justify-center text-xs font-bold shadow-xs">
                    AI
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-4 text-xs text-slate-800 leading-relaxed font-medium shadow-xs">
                    Hello! I noticed you've completed 4 weeks of your React internship. Would you like me to draft your monthly progress report based on your daily logs?
                  </div>
                </div>
                <div className="flex gap-3 flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex-shrink-0 flex items-center justify-center text-xs font-bold">
                    Me
                  </div>
                  <div className="bg-slate-900 rounded-2xl rounded-tr-none p-4 text-xs text-white leading-relaxed font-medium shadow-xs">
                    Yes please. Highlight my work on the new dashboard components.
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 sm:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center font-bold text-white text-sm shadow-sm">
                  IQ
                </div>
                <span className="text-xl font-bold text-slate-900">InternIQ</span>
              </div>
              <p className="text-slate-600 max-w-sm mb-6 text-xs font-medium leading-relaxed">
                Revolutionizing internship management with AI-driven insights, streamlined workflows, and seamless collaboration.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-slate-900 text-xs uppercase tracking-wider">Platform</h4>
              <ul className="space-y-3 text-xs font-semibold text-slate-600">
                <li><a href="#features" className="hover:text-slate-900 transition-colors">Features</a></li>
                <li><Link to="/login" className="hover:text-slate-900 transition-colors">Login</Link></li>
                <li><Link to="/register" className="hover:text-slate-900 transition-colors">Register</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-slate-900 text-xs uppercase tracking-wider">Company</h4>
              <ul className="space-y-3 text-xs font-semibold text-slate-600">
                <li><a href="#about" className="hover:text-slate-900 transition-colors">About Us</a></li>
                <li><button onClick={handleDemoRequest} className="hover:text-slate-900 transition-colors">Request Demo</button></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-200 text-center md:text-left text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium">
            <p>© {new Date().getFullYear()} InternIQ. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
