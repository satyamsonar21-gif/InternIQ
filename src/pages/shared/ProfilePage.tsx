import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Phone, Lock, Save, Check, Building, BookOpen } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { cn } from '@/lib/utils'

export default function ProfilePage() {
  const { user } = useAuth()
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const [formData, setFormData] = useState({
    name: user?.full_name || 'Arjun Mehta',
    email: user?.email || 'student@interniq.io',
    phone: '+1 234 567 8900',
    currentPassword: '',
    newPassword: '',
    emailNotifs: true,
    pushNotifs: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      setIsSaved(true)
      setTimeout(() => setIsSaved(false), 2500)
    }, 1000)
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase()
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center text-2xl font-bold text-white shadow-md">
            {getInitials(formData.name)}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Profile Settings</h1>
            <p className="text-xs text-slate-500 font-medium capitalize">{user?.role || 'Student'} Account</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-xs">
            <h2 className="text-base font-bold text-slate-900">Personal Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-2">
                  <User className="w-4 h-4 text-slate-500" /> Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-medium focus:border-slate-900"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-500" /> Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled
                  className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-500 cursor-not-allowed font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-500" /> Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-medium focus:border-slate-900"
                />
              </div>

              {user?.role === 'student' && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-slate-500" /> Enrollment / Roll No.
                  </label>
                  <input
                    type="text"
                    value="CS2024001"
                    disabled
                    className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-500 font-mono cursor-not-allowed"
                  />
                </div>
              )}

              {user?.role === 'industry_mentor' && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-2">
                    <Building className="w-4 h-4 text-slate-500" /> Partner Company
                  </label>
                  <input
                    type="text"
                    value="TechVista Solutions"
                    disabled
                    className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-500 font-medium cursor-not-allowed"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-xs">
            <h2 className="text-base font-bold text-slate-900">Security & Credentials</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-slate-500" /> Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:border-slate-900"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-slate-500" /> New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Leave blank to keep current"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:border-slate-900"
                />
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
            <h2 className="text-base font-bold text-slate-900">Notification Preferences</h2>

            <div className="space-y-3">
              <label className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Email Alerts</h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Receive daily log summaries and verification alerts.</p>
                </div>
                <input type="checkbox" name="emailNotifs" checked={formData.emailNotifs} onChange={handleChange} className="w-4 h-4 accent-slate-900" />
              </label>

              <label className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Browser Push Notifications</h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Get instant notifications for mentor feedback and sign-offs.</p>
                </div>
                <input type="checkbox" name="pushNotifs" checked={formData.pushNotifs} onChange={handleChange} className="w-4 h-4 accent-slate-900" />
              </label>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className={cn(
                'flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs transition-all shadow-xs text-white',
                isSaved ? 'bg-emerald-600' : 'bg-slate-900 hover:bg-slate-800',
                isSaving && 'opacity-70 cursor-not-allowed'
              )}
            >
              {isSaving ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : isSaved ? (
                <Check className="w-4 h-4" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {isSaving ? 'Saving...' : isSaved ? 'Saved Successfully' : 'Save Changes'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
