import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, Plus, Search, Key, CheckCircle2, X, ChevronRight, Check } from 'lucide-react'

interface CompanyItem {
  id: string
  name: string
  industry_sector: string
  contact_email: string
  active_interns: number
  industry_mentors: number
  invite_code: string
  status: 'active' | 'inactive'
}

const MOCK_COMPANIES: CompanyItem[] = [
  {
    id: 'comp-001',
    name: 'TechVista Solutions',
    industry_sector: 'Software & Cloud Technology',
    contact_email: 'partnerships@techvista.com',
    active_interns: 14,
    industry_mentors: 3,
    invite_code: 'TV8X4A',
    status: 'active',
  },
  {
    id: 'comp-002',
    name: 'CloudScale Inc',
    industry_sector: 'Cloud Infrastructure',
    contact_email: 'hr@cloudscale.io',
    active_interns: 8,
    industry_mentors: 2,
    invite_code: 'CS9Y2B',
    status: 'active',
  },
  {
    id: 'comp-003',
    name: 'DataPulse Analytics',
    industry_sector: 'AI & Data Science',
    contact_email: 'mentors@datapulse.ai',
    active_interns: 12,
    industry_mentors: 4,
    invite_code: 'DP3M7K',
    status: 'active',
  },
  {
    id: 'comp-004',
    name: 'CyberShield Systems',
    industry_sector: 'Cybersecurity',
    contact_email: 'interns@cybershield.sec',
    active_interns: 6,
    industry_mentors: 2,
    invite_code: 'CS4W9Z',
    status: 'active',
  },
]

export default function AdminCompaniesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [companies, setCompanies] = useState(MOCK_COMPANIES)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const [companyName, setCompanyName] = useState('')
  const [industrySector, setIndustrySector] = useState('Software & Technology')
  const [contactEmail, setContactEmail] = useState('')

  const triggerToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 2500)
  }

  const handleRegisterCompany = () => {
    if (!companyName.trim() || !contactEmail.trim()) return
    const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase()
    const newCompany: CompanyItem = {
      id: `comp-${Date.now()}`,
      name: companyName,
      industry_sector: industrySector,
      contact_email: contactEmail,
      active_interns: 0,
      industry_mentors: 0,
      invite_code: randomCode,
      status: 'active',
    }
    setCompanies([newCompany, ...companies])
    setShowRegisterModal(false)
    setCompanyName('')
    setContactEmail('')
    triggerToast(`Registered ${companyName}! Invite code: ${randomCode}`)
  }

  const filteredCompanies = companies.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.industry_sector.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6 relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed top-20 right-8 z-50 px-4 py-2 bg-slate-900 text-white rounded-xl shadow-lg font-bold text-xs flex items-center gap-2"
          >
            <Check className="w-4 h-4 text-emerald-400" /> {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Company Partnership Registry</h1>
          <p className="text-xs text-slate-500 font-medium">Manage industry partner organizations, active intern slots, and mentor invite codes</p>
        </div>

        <button
          onClick={() => setShowRegisterModal(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-white shadow-xs transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Register New Company
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Partner Companies</p>
          <p className="text-2xl font-bold font-mono text-slate-900 mt-1">{companies.length}</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <p className="text-[10px] uppercase tracking-wider text-emerald-700 font-bold">Active Interns Hosted</p>
          <p className="text-2xl font-bold font-mono text-emerald-600 mt-1">40</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <p className="text-[10px] uppercase tracking-wider text-slate-700 font-bold">Industry Mentors</p>
          <p className="text-2xl font-bold font-mono text-slate-900 mt-1">11</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <p className="text-[10px] uppercase tracking-wider text-amber-700 font-bold">Placement Offers</p>
          <p className="text-2xl font-bold font-mono text-amber-600 mt-1">28</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search company or industry sector..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-9 bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-slate-900 font-medium"
          />
        </div>
      </div>

      {/* Companies Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                <th className="py-3.5 px-4">Company Name</th>
                <th className="py-3.5 px-4">Industry Sector</th>
                <th className="py-3.5 px-4">Active Interns</th>
                <th className="py-3.5 px-4">Mentors</th>
                <th className="py-3.5 px-4">Invite Code</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredCompanies.map((comp) => (
                <tr key={comp.id} className="hover:bg-slate-50 cursor-pointer transition-colors group">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-slate-700" />
                      <span className="group-hover:underline">{comp.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium">{comp.industry_sector}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{comp.active_interns}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{comp.industry_mentors}</td>
                  <td className="py-3.5 px-4">
                    <span className="font-mono text-xs font-bold text-amber-800 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-lg flex items-center gap-1 w-fit">
                      <Key className="w-3 h-3" /> {comp.invite_code}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      <CheckCircle2 className="w-3 h-3" /> Active
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 transition-all inline-block" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Register Company Modal */}
      <AnimatePresence>
        {showRegisterModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowRegisterModal(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl p-6 shadow-xl z-10 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <h3 className="text-sm font-bold text-slate-900">Register New Partner Company</h3>
                <button onClick={() => setShowRegisterModal(false)} className="text-slate-400 hover:text-slate-900"><X className="w-5 h-5" /></button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-900 uppercase mb-1">Company Name</label>
                  <input type="text" placeholder="e.g. Apex Innovations Labs" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="w-full h-10 bg-slate-50 border border-slate-300 rounded-xl px-3 text-xs text-slate-900 font-medium focus:border-slate-900" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-900 uppercase mb-1">Industry Sector</label>
                  <input type="text" placeholder="e.g. Software & Cloud Technology" value={industrySector} onChange={(e) => setIndustrySector(e.target.value)} className="w-full h-10 bg-slate-50 border border-slate-300 rounded-xl px-3 text-xs text-slate-900 font-medium focus:border-slate-900" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-900 uppercase mb-1">Contact Email</label>
                  <input type="email" placeholder="partnerships@company.com" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} className="w-full h-10 bg-slate-50 border border-slate-300 rounded-xl px-3 text-xs text-slate-900 font-medium focus:border-slate-900" />
                </div>
              </div>

              <div className="flex gap-3 pt-3 border-t border-slate-200">
                <button onClick={() => setShowRegisterModal(false)} className="flex-1 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700">Cancel</button>
                <button onClick={handleRegisterCompany} className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-white shadow-xs flex items-center justify-center gap-1.5"><Plus className="w-4 h-4" /> Register & Generate Code</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
