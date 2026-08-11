import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Plus,
  UserCheck,
  MoreVertical,
  X,
  Check,
} from 'lucide-react'
import type { UserRole } from '@/types'

interface ManagedUser {
  id: string
  name: string
  email: string
  role: UserRole
  departmentOrCompany: string
  status: 'active' | 'inactive'
  lastLogin: string
}

const MOCK_USERS: ManagedUser[] = [
  {
    id: 'u-1',
    name: 'Arjun Mehta',
    email: 'student@interniq.io',
    role: 'student',
    departmentOrCompany: 'Computer Science',
    status: 'active',
    lastLogin: '10 mins ago',
  },
  {
    id: 'u-2',
    name: 'Dr. Priya Sharma',
    email: 'faculty@interniq.io',
    role: 'faculty_mentor',
    departmentOrCompany: 'Computer Science',
    status: 'active',
    lastLogin: '2 hours ago',
  },
  {
    id: 'u-3',
    name: 'Rahul Kapoor',
    email: 'industry@interniq.io',
    role: 'industry_mentor',
    departmentOrCompany: 'TechVista Solutions',
    status: 'active',
    lastLogin: '1 hour ago',
  },
  {
    id: 'u-4',
    name: 'Kavita Desai',
    email: 'admin@interniq.io',
    role: 'admin',
    departmentOrCompany: 'Placement Cell',
    status: 'active',
    lastLogin: 'Just now',
  },
  {
    id: 'u-5',
    name: 'Ananya Roy',
    email: 'ananya@student.edu',
    role: 'student',
    departmentOrCompany: 'Computer Science',
    status: 'active',
    lastLogin: 'Yesterday',
  },
]

export default function AdminUsersPage() {
  const [roleFilter, setRoleFilter] = useState<'all' | UserRole>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [users, setUsers] = useState(MOCK_USERS)
  const [showAddModal, setShowAddModal] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const [newName, setNewName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newRole, setNewRole] = useState<UserRole>('student')
  const [newDept, setNewDept] = useState('Computer Science')

  const triggerToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 2500)
  }

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newName.trim() || !newEmail.trim()) return

    const newUser: ManagedUser = {
      id: `u-${Date.now()}`,
      name: newName,
      email: newEmail,
      role: newRole,
      departmentOrCompany: newDept,
      status: 'active',
      lastLogin: 'Just now',
    }

    setUsers([newUser, ...users])
    setShowAddModal(false)
    setNewName('')
    setNewEmail('')
    triggerToast(`Created user account for ${newName}!`)
  }

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === 'all' || u.role === roleFilter
    return matchesSearch && matchesRole
  })

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'student':
        return <span className="text-[10px] uppercase font-mono font-bold text-orange-800 bg-orange-100 px-2 py-0.5 rounded-full border border-orange-300">Student</span>
      case 'faculty_mentor':
        return <span className="text-[10px] uppercase font-mono font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded-full border border-teal-300">Faculty Mentor</span>
      case 'industry_mentor':
        return <span className="text-[10px] uppercase font-mono font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded-full border border-purple-300">Industry Mentor</span>
      case 'admin':
        return <span className="text-[10px] uppercase font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-300">Admin</span>
    }
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
            className="fixed top-20 right-8 z-50 px-4 py-2 bg-slate-900 text-white rounded-xl shadow-lg font-bold text-xs flex items-center gap-2"
          >
            <Check className="w-4 h-4 text-emerald-400" /> {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Platform User Management</h1>
          <p className="text-xs text-slate-500 font-medium">Create, assign role privileges, and manage accounts across all 4 platform roles</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-white shadow-xs transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add User Account
        </button>
      </div>

      {/* Role Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
        <button
          onClick={() => setRoleFilter('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            roleFilter === 'all' ? 'bg-slate-900 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-white hover:text-slate-900 border border-slate-200'
          }`}
        >
          All Users ({users.length})
        </button>
        <button
          onClick={() => setRoleFilter('student')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            roleFilter === 'student' ? 'bg-slate-900 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-white hover:text-slate-900 border border-slate-200'
          }`}
        >
          Students ({users.filter((u) => u.role === 'student').length})
        </button>
        <button
          onClick={() => setRoleFilter('faculty_mentor')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            roleFilter === 'faculty_mentor' ? 'bg-slate-900 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-white hover:text-slate-900 border border-slate-200'
          }`}
        >
          Faculty ({users.filter((u) => u.role === 'faculty_mentor').length})
        </button>
        <button
          onClick={() => setRoleFilter('industry_mentor')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            roleFilter === 'industry_mentor' ? 'bg-slate-900 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-white hover:text-slate-900 border border-slate-200'
          }`}
        >
          Industry ({users.filter((u) => u.role === 'industry_mentor').length})
        </button>
        <button
          onClick={() => setRoleFilter('admin')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            roleFilter === 'admin' ? 'bg-slate-900 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-white hover:text-slate-900 border border-slate-200'
          }`}
        >
          Admins ({users.filter((u) => u.role === 'admin').length})
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search name or email address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-9 bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 text-xs text-slate-900 font-medium placeholder:text-slate-400 focus:border-slate-900"
          />
        </div>
      </div>

      {/* User Data Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                <th className="py-3.5 px-4">User</th>
                <th className="py-3.5 px-4">Role</th>
                <th className="py-3.5 px-4">Department / Company</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Last Active</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50 cursor-pointer transition-colors group">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center font-bold text-white text-xs">
                        {u.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 group-hover:underline">{u.name}</p>
                        <p className="text-[10px] text-slate-500 font-mono font-medium">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">{getRoleBadge(u.role)}</td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium">{u.departmentOrCompany}</td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      <UserCheck className="w-3 h-3" /> Active
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-500 font-medium">{u.lastLogin}</td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="p-1 text-slate-400 hover:text-slate-900">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={() => setShowAddModal(false)} />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative bg-white border border-slate-200 rounded-2xl p-6 shadow-xl w-full max-w-md z-10 space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                <h3 className="text-sm font-bold text-slate-900">Add Platform User Account</h3>
                <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-900"><X size={18} /></button>
              </div>

              <form onSubmit={handleAddUser} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">Full Name</label>
                  <input type="text" required placeholder="e.g. Rahul Sharma" value={newName} onChange={(e) => setNewName(e.target.value)} className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-900" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">Email Address</label>
                  <input type="email" required placeholder="rahul@example.com" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-900" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">Assign Platform Role</label>
                  <select value={newRole} onChange={(e) => setNewRole(e.target.value as UserRole)} className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900">
                    <option value="student">Student</option>
                    <option value="faculty_mentor">Faculty Mentor</option>
                    <option value="industry_mentor">Industry Mentor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-1">Department / Organization</label>
                  <input type="text" value={newDept} onChange={(e) => setNewDept(e.target.value)} className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-900" />
                </div>
                <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                  <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-300 text-slate-700">Cancel</button>
                  <button type="submit" className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800">Create Account</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
