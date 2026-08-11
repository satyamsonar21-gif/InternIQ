import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { UserProfile, UserRole } from '@/types'

interface AuthContextType {
  user: UserProfile | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
  updateProfile: (updates: Partial<UserProfile>) => void
}

export interface RegisterData {
  email: string
  password: string
  full_name: string
  role: UserRole
  institution_name?: string
  department?: string
  year_of_study?: number
  enrollment_number?: string
  employee_id?: string
  company_name?: string
  designation?: string
  industry_sector?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Demo users for frontend demonstration
const DEMO_USERS: Record<string, UserProfile> = {
  'student@interniq.io': {
    id: 'usr_student_001',
    full_name: 'Arjun Mehta',
    email: 'student@interniq.io',
    role: 'student',
    avatar_url: null,
    phone: '+91 98765 43210',
    department_id: 'dept_001',
    batch_id: 'batch_001',
    company_id: 'comp_001',
    employee_id: null,
    enrollment_number: 'CS2024001',
    year_of_study: 3,
    designation: null,
    institution_name: 'National Institute of Technology',
    industry_sector: null,
    status: 'active',
    created_at: '2024-08-01T00:00:00Z',
  },
  'faculty@interniq.io': {
    id: 'usr_faculty_001',
    full_name: 'Dr. Priya Sharma',
    email: 'faculty@interniq.io',
    role: 'faculty_mentor',
    avatar_url: null,
    phone: '+91 98765 11111',
    department_id: 'dept_001',
    batch_id: null,
    company_id: null,
    employee_id: 'FAC2024001',
    enrollment_number: null,
    year_of_study: null,
    designation: 'Associate Professor',
    institution_name: 'National Institute of Technology',
    industry_sector: null,
    status: 'active',
    created_at: '2024-01-15T00:00:00Z',
  },
  'industry@interniq.io': {
    id: 'usr_industry_001',
    full_name: 'Rahul Kapoor',
    email: 'industry@interniq.io',
    role: 'industry_mentor',
    avatar_url: null,
    phone: '+91 98765 22222',
    department_id: null,
    batch_id: null,
    company_id: 'comp_001',
    employee_id: null,
    enrollment_number: null,
    year_of_study: null,
    designation: 'Engineering Manager',
    institution_name: null,
    industry_sector: 'Technology',
    status: 'active',
    created_at: '2024-02-10T00:00:00Z',
  },
  'admin@interniq.io': {
    id: 'usr_admin_001',
    full_name: 'Kavita Desai',
    email: 'admin@interniq.io',
    role: 'admin',
    avatar_url: null,
    phone: '+91 98765 33333',
    department_id: null,
    batch_id: null,
    company_id: null,
    employee_id: 'ADM001',
    enrollment_number: null,
    year_of_study: null,
    designation: 'Placement Officer',
    institution_name: 'National Institute of Technology',
    industry_sector: null,
    status: 'active',
    created_at: '2023-06-01T00:00:00Z',
  },
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored session
    const stored = localStorage.getItem('interniq_user')
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch {
        localStorage.removeItem('interniq_user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, _password: string) => {
    setIsLoading(true)
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 800))
    const profile = DEMO_USERS[email.toLowerCase()]
    if (!profile) {
      setIsLoading(false)
      throw new Error('Invalid email or password. Try: student@interniq.io, faculty@interniq.io, industry@interniq.io, or admin@interniq.io')
    }
    setUser(profile)
    localStorage.setItem('interniq_user', JSON.stringify(profile))
    setIsLoading(false)
  }

  const register = async (data: RegisterData) => {
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    const profile: UserProfile = {
      id: `usr_${Date.now()}`,
      full_name: data.full_name,
      email: data.email,
      role: data.role,
      avatar_url: null,
      phone: null,
      department_id: null,
      batch_id: null,
      company_id: null,
      employee_id: data.employee_id || null,
      enrollment_number: data.enrollment_number || null,
      year_of_study: data.year_of_study || null,
      designation: data.designation || null,
      institution_name: data.institution_name || null,
      industry_sector: data.industry_sector || null,
      status: 'active',
      created_at: new Date().toISOString(),
    }
    setUser(profile)
    localStorage.setItem('interniq_user', JSON.stringify(profile))
    setIsLoading(false)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('interniq_user')
  }

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (user) {
      const updated = { ...user, ...updates }
      setUser(updated)
      localStorage.setItem('interniq_user', JSON.stringify(updated))
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
