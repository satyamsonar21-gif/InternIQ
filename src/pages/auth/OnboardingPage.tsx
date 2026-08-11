import { useState, useRef } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import {
  Upload,
  Building2,
  Calendar,
  Briefcase,
  Key,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Check,
} from 'lucide-react'

export default function OnboardingPage() {
  const { user, updateProfile } = useAuth()
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    companyName: '',
    roleTitle: '',
    startDate: '',
    endDate: '',
    mentorCode: '',
  })
  const [photoFileName, setPhotoFileName] = useState<string | null>(null)
  const [isCompleting, setIsCompleting] = useState(false)

  if (!user) {
    return <Navigate to="/login" replace />
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoFileName(e.target.files[0].name)
    }
  }

  const handleComplete = async () => {
    setIsCompleting(true)
    try {
      updateProfile({
        ...user,
        department_id: formData.companyName || user.department_id,
      })
    } catch (e) {
      console.warn('Profile update issue during onboarding:', e)
    }
    await new Promise((r) => setTimeout(r, 800))
    navigate('/dashboard')
  }

  const handleSkip = () => {
    navigate('/dashboard')
  }

  const isStudent = user.role === 'student'

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-slate-200/40 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg relative z-10"
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white font-bold">
            IQ
          </div>
          <span className="text-xl font-bold text-slate-900">InternIQ</span>
        </div>

        {/* Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xl">
          {/* Welcome */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto mb-4"
            >
              <Sparkles className="w-8 h-8 text-slate-800" />
            </motion.div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Welcome, {user.full_name}! 🎉
            </h1>
            <p className="text-slate-500 text-xs font-medium">
              {isStudent
                ? "Let's set up your internship details to get started."
                : 'Your account is ready. You can head to your dashboard or complete your profile.'}
            </p>
          </div>

          {/* Profile Summary */}
          <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                <span>
                  {user.full_name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-slate-900">{user.full_name}</p>
                <p className="text-xs text-slate-500">{user.email}</p>
                <span className="inline-block mt-1 text-[10px] uppercase tracking-wider bg-slate-200 text-slate-800 px-2 py-0.5 rounded-full font-bold">
                  {user.role.replace('_', ' ')}
                </span>
              </div>
            </div>
          </div>

          {/* Student Internship Form */}
          {isStudent && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-4 mb-6"
            >
              <h2 className="text-xs font-bold text-slate-800 mb-3 uppercase tracking-wider">
                Internship Details
              </h2>

              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Company Name"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full h-11 bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-slate-900 transition-colors"
                />
              </div>

              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Internship Role / Title"
                  value={formData.roleTitle}
                  onChange={(e) => setFormData({ ...formData, roleTitle: e.target.value })}
                  className="w-full h-11 bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-slate-900 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="date"
                    placeholder="Start Date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full h-11 bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 text-xs text-slate-900 focus:bg-white focus:border-slate-900 transition-colors"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="date"
                    placeholder="End Date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full h-11 bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 text-xs text-slate-900 focus:bg-white focus:border-slate-900 transition-colors"
                  />
                </div>
              </div>

              <div className="relative">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Industry Mentor Code (optional)"
                  value={formData.mentorCode}
                  onChange={(e) => setFormData({ ...formData, mentorCode: e.target.value })}
                  className="w-full h-11 bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-slate-900 transition-colors"
                />
              </div>

              {/* Photo Upload */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-3 p-3 bg-slate-50 border border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-slate-900 hover:bg-slate-100 transition-colors"
              >
                {photoFileName ? (
                  <Check className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Upload className="w-5 h-5 text-slate-400" />
                )}
                <div>
                  <p className="text-xs font-bold text-slate-900">
                    {photoFileName ? `Selected: ${photoFileName}` : 'Upload Profile Photo'}
                  </p>
                  <p className="text-[10px] text-slate-500 font-medium">Optional • JPG, PNG up to 2MB</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            {!isStudent && (
              <button
                onClick={handleSkip}
                className="flex-1 h-11 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-all"
              >
                Skip for Now
              </button>
            )}
            <button
              onClick={handleComplete}
              disabled={isCompleting}
              className="flex-1 h-11 bg-slate-900 hover:bg-slate-800 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2 transition-all disabled:opacity-60 shadow-md"
            >
              {isCompleting ? (
                <>
                  <CheckCircle2 className="w-4 h-4 animate-spin text-white" />
                  Setting up...
                </>
              ) : (
                <>
                  Complete Setup
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
