import { Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import StudentDashboard from './StudentDashboard'
import FacultyDashboard from './FacultyDashboard'
import IndustryDashboard from './IndustryDashboard'

export default function DashboardRouter() {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  switch (user.role) {
    case 'student':
      return <StudentDashboard />
    case 'faculty_mentor':
      return <FacultyDashboard />
    case 'industry_mentor':
      return <IndustryDashboard />
    case 'admin':
      return <Navigate to="/admin/dashboard" replace />
    default:
      return <StudentDashboard />
  }
}
