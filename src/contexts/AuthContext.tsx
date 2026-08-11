import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { UserProfile, UserRole } from '@/types'
import { supabase } from '@/lib/supabase'
import { env } from '@/lib/env'
import { DEMO_USERS } from '@/demo/demoUsers'

interface AuthContextType {
  user: UserProfile | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => Promise<void>
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>
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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchProfile = async (userId: string, email: string): Promise<UserProfile | null> => {
    try {
      const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single()
      if (error || !data) {
        // Construct fallback user profile from auth identity if DB record is pending trigger
        return {
          id: userId,
          full_name: email.split('@')[0] || 'User',
          email,
          role: 'student',
          avatar_url: null,
          phone: null,
          department_id: null,
          batch_id: null,
          company_id: null,
          employee_id: null,
          enrollment_number: null,
          year_of_study: null,
          designation: null,
          institution_name: null,
          industry_sector: null,
          status: 'active',
          created_at: new Date().toISOString(),
        }
      }
      return data as UserProfile
    } catch {
      return null
    }
  }

  useEffect(() => {
    let isMounted = true

    const initAuth = async () => {
      // If placeholder credentials are used, restore local demo session if available
      const isPlaceholder = env.VITE_SUPABASE_URL.includes('placeholder.supabase.co')
      if (isPlaceholder || env.VITE_DEMO_MODE) {
        const storedDemo = localStorage.getItem('interniq_demo_user')
        if (storedDemo && isMounted) {
          try {
            setUser(JSON.parse(storedDemo))
          } catch {
            localStorage.removeItem('interniq_demo_user')
          }
        }
        if (isMounted) setIsLoading(false)
        return
      }

      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session?.user && isMounted) {
        const profile = await fetchProfile(session.user.id, session.user.email || '')
        if (isMounted) setUser(profile)
      }
      if (isMounted) setIsLoading(false)
    }

    initAuth()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!isMounted) return
      if (session?.user) {
        const profile = await fetchProfile(session.user.id, session.user.email || '')
        setUser(profile)
      } else {
        setUser(null)
      }
      setIsLoading(false)
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    const isPlaceholder = env.VITE_SUPABASE_URL.includes('placeholder.supabase.co')

    if (isPlaceholder || env.VITE_DEMO_MODE) {
      // Explicit demo mode login fallback
      await new Promise((r) => setTimeout(r, 600))
      const demoProfile = DEMO_USERS[email.toLowerCase()]
      if (!demoProfile) {
        setIsLoading(false)
        throw new Error('Invalid email or password. Demo accounts: student@interniq.io, faculty@interniq.io, industry@interniq.io, admin@interniq.io')
      }
      setUser(demoProfile)
      localStorage.setItem('interniq_demo_user', JSON.stringify(demoProfile))
      setIsLoading(false)
      return
    }

    // Authentic Supabase Auth Authentication
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error || !data.user) {
      setIsLoading(false)
      throw new Error(error?.message || 'Failed to authenticate with Supabase.')
    }

    const profile = await fetchProfile(data.user.id, data.user.email || email)
    setUser(profile)
    setIsLoading(false)
  }

  const register = async (data: RegisterData) => {
    setIsLoading(true)
    const isPlaceholder = env.VITE_SUPABASE_URL.includes('placeholder.supabase.co')

    if (isPlaceholder || env.VITE_DEMO_MODE) {
      await new Promise((r) => setTimeout(r, 600))
      const demoProfile: UserProfile = {
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
      setUser(demoProfile)
      localStorage.setItem('interniq_demo_user', JSON.stringify(demoProfile))
      setIsLoading(false)
      return
    }

    // Authentic Supabase Registration
    const { data: signUpData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.full_name,
          role: data.role,
        },
      },
    })

    if (error || !signUpData.user) {
      setIsLoading(false)
      throw new Error(error?.message || 'Registration failed.')
    }

    // Upsert User Profile Record
    const newProfile: Partial<UserProfile> = {
      id: signUpData.user.id,
      full_name: data.full_name,
      email: data.email,
      role: data.role,
      institution_name: data.institution_name || null,
      enrollment_number: data.enrollment_number || null,
      employee_id: data.employee_id || null,
      designation: data.designation || null,
      industry_sector: data.industry_sector || null,
      status: 'active',
    }

    await supabase.from('profiles').upsert(newProfile)
    const profile = await fetchProfile(signUpData.user.id, data.email)
    setUser(profile)
    setIsLoading(false)
  }

  const logout = async () => {
    localStorage.removeItem('interniq_demo_user')
    const isPlaceholder = env.VITE_SUPABASE_URL.includes('placeholder.supabase.co')
    if (!isPlaceholder && !env.VITE_DEMO_MODE) {
      await supabase.auth.signOut()
    }
    setUser(null)
  }

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (user) {
      const updated = { ...user, ...updates }
      setUser(updated)

      const isPlaceholder = env.VITE_SUPABASE_URL.includes('placeholder.supabase.co')
      if (isPlaceholder || env.VITE_DEMO_MODE) {
        localStorage.setItem('interniq_demo_user', JSON.stringify(updated))
      } else {
        await supabase.from('profiles').update(updates).eq('id', user.id)
      }
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
