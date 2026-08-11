import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  GraduationCap,
  BookOpen,
  Building2,
  ArrowRight,
  ArrowLeft,
  User,
  Mail,
  Lock,
  Building,
  Briefcase,
  Hash,
  BookMarked,
  AlertCircle,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { cn } from '@/lib/utils'

type Role = 'student' | 'faculty_mentor' | 'industry_mentor' | null

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [role, setRole] = useState<Role>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const { register } = useAuth()
  const navigate = useNavigate()

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    institution: '',
    department: '',
    year: '',
    enrollmentNumber: '',
    employeeId: '',
    company: '',
    designation: '',
    industrySector: '',
  })

  const updateForm = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrorMsg(null)
  }

  const handleNext = () => {
    setErrorMsg(null)
    if (step === 1 && !role) {
      setErrorMsg('Please select a role to continue.')
      return
    }
    if (step === 2) {
      if (!formData.fullName.trim() || !formData.email.trim() || !formData.password || !formData.confirmPassword) {
        setErrorMsg('Please fill in all required fields.')
        return
      }
      if (formData.password !== formData.confirmPassword) {
        setErrorMsg('Passwords do not match. Please verify your password.')
        return
      }
      if (formData.password.length < 6) {
        setErrorMsg('Password must be at least 6 characters long.')
        return
      }
    }
    setStep((prev) => Math.min(prev + 1, 3))
  }

  const handleBack = () => {
    setErrorMsg(null)
    setStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      handleNext()
      return
    }

    setIsLoading(true)
    setErrorMsg(null)
    try {
      await register({
        ...formData,
        full_name: formData.fullName || 'New User',
        role: role || 'student',
      })
      navigate('/verify-email')
    } catch (error: any) {
      console.error('Registration failed:', error)
      setErrorMsg(error?.message || 'Registration failed. Please check your inputs.')
    } finally {
      setIsLoading(false)
    }
  }

  const roles = [
    { id: 'student' as const, title: 'Student', icon: GraduationCap, desc: 'Find internships & track progress' },
    { id: 'faculty_mentor' as const, title: 'Faculty Mentor', icon: BookOpen, desc: 'Guide students & monitor activity' },
    { id: 'industry_mentor' as const, title: 'Industry Mentor', icon: Building2, desc: 'Provide tasks & evaluate interns' },
  ]

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col justify-center items-center p-4 relative overflow-hidden py-12">
      {/* Background decoration */}
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-slate-200/50 blur-[120px] pointer-events-none" />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-8 z-10"
      >
        <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center shadow-lg text-white font-bold text-xl">
          IQ
        </div>
        <span className="text-2xl font-bold text-slate-900 tracking-tight">InternIQ</span>
      </motion.div>

      {/* Registration Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-xl z-10 overflow-hidden flex flex-col"
      >
        {/* Progress Bar */}
        <div className="h-1.5 w-full bg-slate-100">
          <motion.div
            className="h-full bg-slate-900"
            initial={{ width: '33%' }}
            animate={{ width: `${(step / 3) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="p-8">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-1">Create an Account</h1>
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Step {step} of 3</p>
          </div>

          {/* Error Alert Banner */}
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {/* STEP 1: Role Selection */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h3 className="text-sm font-bold text-slate-900 mb-4">Select your role</h3>
                  <div className="grid gap-4">
                    {roles.map((r) => {
                      const Icon = r.icon
                      const isSelected = role === r.id
                      return (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => {
                            setRole(r.id)
                            setErrorMsg(null)
                          }}
                          className={cn(
                            'w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 text-left',
                            isSelected
                              ? 'bg-slate-900 border-slate-900 text-white shadow-md'
                              : 'bg-white border-slate-200 hover:border-slate-400 text-slate-900'
                          )}
                        >
                          <div
                            className={cn(
                              'p-3 rounded-lg flex-shrink-0',
                              isSelected ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-600'
                            )}
                          >
                            <Icon className="w-6 h-6" />
                          </div>
                          <div>
                            <div className={cn('font-bold text-base', isSelected ? 'text-white' : 'text-slate-900')}>
                              {r.title}
                            </div>
                            <div className={cn('text-xs', isSelected ? 'text-slate-300' : 'text-slate-500')}>
                              {r.desc}
                            </div>
                          </div>
                          {isSelected && (
                            <div className="ml-auto w-6 h-6 rounded-full bg-white text-slate-900 flex items-center justify-center font-bold text-xs">
                              ✓
                            </div>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Basic Info */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => updateForm('fullName', e.target.value)}
                        className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm placeholder-slate-400 focus:bg-white focus:border-slate-900 transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => updateForm('email', e.target.value)}
                        className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm placeholder-slate-400 focus:bg-white focus:border-slate-900 transition-all"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Password</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                          type="password"
                          required
                          value={formData.password}
                          onChange={(e) => updateForm('password', e.target.value)}
                          className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm placeholder-slate-400 focus:bg-white focus:border-slate-900 transition-all"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Confirm Password</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                          type="password"
                          required
                          value={formData.confirmPassword}
                          onChange={(e) => updateForm('confirmPassword', e.target.value)}
                          className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm placeholder-slate-400 focus:bg-white focus:border-slate-900 transition-all"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Role Specific Info */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  {role === 'student' && (
                    <>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Institution</label>
                        <div className="relative">
                          <Building className="absolute inset-y-0 left-0 pl-3 h-full w-8 text-slate-400 pointer-events-none" />
                          <input
                            type="text"
                            required
                            value={formData.institution}
                            onChange={(e) => updateForm('institution', e.target.value)}
                            className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:bg-white focus:border-slate-900"
                            placeholder="University Name"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">Department</label>
                          <div className="relative">
                            <BookMarked className="absolute inset-y-0 left-0 pl-3 h-full w-8 text-slate-400 pointer-events-none" />
                            <input
                              type="text"
                              required
                              value={formData.department}
                              onChange={(e) => updateForm('department', e.target.value)}
                              className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:bg-white focus:border-slate-900"
                              placeholder="e.g. CS"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">Year of Study</label>
                          <select
                            value={formData.year}
                            onChange={(e) => updateForm('year', e.target.value)}
                            className="block w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:bg-white focus:border-slate-900"
                          >
                            <option value="">Select Year</option>
                            <option value="1">1st Year</option>
                            <option value="2">2nd Year</option>
                            <option value="3">3rd Year</option>
                            <option value="4">4th Year</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Enrollment Number</label>
                        <div className="relative">
                          <Hash className="absolute inset-y-0 left-0 pl-3 h-full w-8 text-slate-400 pointer-events-none" />
                          <input
                            type="text"
                            required
                            value={formData.enrollmentNumber}
                            onChange={(e) => updateForm('enrollmentNumber', e.target.value)}
                            className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:bg-white focus:border-slate-900"
                            placeholder="e.g. 12345678"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {role === 'faculty_mentor' && (
                    <>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Institution</label>
                        <div className="relative">
                          <Building className="absolute inset-y-0 left-0 pl-3 h-full w-8 text-slate-400 pointer-events-none" />
                          <input
                            type="text"
                            required
                            value={formData.institution}
                            onChange={(e) => updateForm('institution', e.target.value)}
                            className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:bg-white focus:border-slate-900"
                            placeholder="University Name"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Department</label>
                        <div className="relative">
                          <BookMarked className="absolute inset-y-0 left-0 pl-3 h-full w-8 text-slate-400 pointer-events-none" />
                          <input
                            type="text"
                            required
                            value={formData.department}
                            onChange={(e) => updateForm('department', e.target.value)}
                            className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:bg-white focus:border-slate-900"
                            placeholder="e.g. Computer Science"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Employee ID</label>
                        <div className="relative">
                          <Hash className="absolute inset-y-0 left-0 pl-3 h-full w-8 text-slate-400 pointer-events-none" />
                          <input
                            type="text"
                            required
                            value={formData.employeeId}
                            onChange={(e) => updateForm('employeeId', e.target.value)}
                            className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:bg-white focus:border-slate-900"
                            placeholder="e.g. FAC-1234"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {role === 'industry_mentor' && (
                    <>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Company Name</label>
                        <div className="relative">
                          <Building2 className="absolute inset-y-0 left-0 pl-3 h-full w-8 text-slate-400 pointer-events-none" />
                          <input
                            type="text"
                            required
                            value={formData.company}
                            onChange={(e) => updateForm('company', e.target.value)}
                            className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:bg-white focus:border-slate-900"
                            placeholder="e.g. Tech Corp"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Designation</label>
                        <div className="relative">
                          <Briefcase className="absolute inset-y-0 left-0 pl-3 h-full w-8 text-slate-400 pointer-events-none" />
                          <input
                            type="text"
                            required
                            value={formData.designation}
                            onChange={(e) => updateForm('designation', e.target.value)}
                            className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:bg-white focus:border-slate-900"
                            placeholder="e.g. Senior Software Engineer"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Industry Sector</label>
                        <select
                          required
                          value={formData.industrySector}
                          onChange={(e) => updateForm('industrySector', e.target.value)}
                          className="block w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:bg-white focus:border-slate-900"
                        >
                          <option value="">Select Sector</option>
                          <option value="it">Information Technology</option>
                          <option value="finance">Finance</option>
                          <option value="healthcare">Healthcare</option>
                          <option value="manufacturing">Manufacturing</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex items-center text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors py-2 px-4 rounded-lg hover:bg-slate-100"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </button>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors py-2 px-4 rounded-lg hover:bg-slate-100"
                >
                  Sign In instead
                </Link>
              )}

              <button
                type="submit"
                disabled={step === 1 && !role}
                className="flex items-center py-2.5 px-6 rounded-xl shadow-sm text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all ml-auto"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-2" />
                ) : (
                  <>
                    {step === 3 ? 'Complete Registration' : 'Continue'}
                    {step < 3 && <ArrowRight className="ml-2 w-4 h-4" />}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
