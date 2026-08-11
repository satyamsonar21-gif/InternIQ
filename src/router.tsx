import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'
import ProtectedRoute from '@/components/ProtectedRoute'

// Loading fallback
const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#06B6D4] flex items-center justify-center animate-pulse">
        <span className="text-white font-bold text-sm">IQ</span>
      </div>
      <div className="flex gap-1">
        <div className="w-2 h-2 rounded-full bg-[#4F46E5] animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 rounded-full bg-[#4F46E5] animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 rounded-full bg-[#4F46E5] animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  </div>
)

// Lazy-loaded pages
const LandingPage = lazy(() => import('@/pages/LandingPage'))
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'))
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'))
const ForgotPasswordPage = lazy(() => import('@/pages/auth/ForgotPasswordPage'))
const VerifyEmailPage = lazy(() => import('@/pages/auth/VerifyEmailPage'))
const OnboardingPage = lazy(() => import('@/pages/auth/OnboardingPage'))

const DashboardRouter = lazy(() => import('@/pages/dashboard/DashboardRouter'))
const AdminDashboard = lazy(() => import('@/pages/dashboard/AdminDashboard'))
const ProfilePage = lazy(() => import('@/pages/shared/ProfilePage'))
const NotificationsPage = lazy(() => import('@/pages/shared/NotificationsPage'))
const NotFoundPage = lazy(() => import('@/pages/shared/NotFoundPage'))
const UnauthorizedPage = lazy(() => import('@/pages/shared/UnauthorizedPage'))

// Student pages (Phase 2 — placeholder for now)
const StudentWorkLogNew = lazy(() => import('@/pages/student/WorkLogNewPage'))
const StudentWorkLogs = lazy(() => import('@/pages/student/WorkLogsPage'))
const StudentMilestones = lazy(() => import('@/pages/student/MilestonesPage'))
const StudentDocuments = lazy(() => import('@/pages/student/DocumentsPage'))
const StudentAnalytics = lazy(() => import('@/pages/student/AnalyticsPage'))
const StudentAIAssistant = lazy(() => import('@/pages/student/AIAssistantPage'))

// Faculty pages (Phase 3)
const FacultyInterns = lazy(() => import('@/pages/faculty/InternsPage'))
const FacultyInternDetail = lazy(() => import('@/pages/faculty/InternDetailPage'))
const FacultyApprovals = lazy(() => import('@/pages/faculty/ApprovalsPage'))
const FacultyAlerts = lazy(() => import('@/pages/faculty/AlertsPage'))
const FacultyReports = lazy(() => import('@/pages/faculty/ReportsPage'))

// Industry pages (Phase 3)
const IndustryInterns = lazy(() => import('@/pages/industry/InternsPage'))
const IndustryInternDetail = lazy(() => import('@/pages/industry/InternDetailPage'))
const IndustryTaskNew = lazy(() => import('@/pages/industry/TaskNewPage'))

// Admin pages (Phase 5)
const AdminBatches = lazy(() => import('@/pages/admin/BatchesPage'))
const AdminCompanies = lazy(() => import('@/pages/admin/CompaniesPage'))
const AdminUsers = lazy(() => import('@/pages/admin/UsersPage'))
const AdminAnalytics = lazy(() => import('@/pages/admin/AnalyticsPage'))
const AdminPlacement = lazy(() => import('@/pages/admin/PlacementPage'))
const AdminReports = lazy(() => import('@/pages/admin/ReportsPage'))
const AdminAuditLogs = lazy(() => import('@/pages/admin/AuditLogsPage'))

function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>
}

export const router = createBrowserRouter([
  // Public routes
  {
    path: '/',
    element: <SuspenseWrapper><LandingPage /></SuspenseWrapper>,
  },
  {
    path: '/login',
    element: <SuspenseWrapper><LoginPage /></SuspenseWrapper>,
  },
  {
    path: '/register',
    element: <SuspenseWrapper><RegisterPage /></SuspenseWrapper>,
  },
  {
    path: '/forgot-password',
    element: <SuspenseWrapper><ForgotPasswordPage /></SuspenseWrapper>,
  },
  {
    path: '/verify-email',
    element: <SuspenseWrapper><VerifyEmailPage /></SuspenseWrapper>,
  },
  {
    path: '/onboarding',
    element: <SuspenseWrapper><OnboardingPage /></SuspenseWrapper>,
  },

  // Authenticated routes (all roles)
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/dashboard',
        element: <SuspenseWrapper><DashboardRouter /></SuspenseWrapper>,
      },
      {
        path: '/profile',
        element: <SuspenseWrapper><ProfilePage /></SuspenseWrapper>,
      },
      {
        path: '/notifications',
        element: <SuspenseWrapper><NotificationsPage /></SuspenseWrapper>,
      },

      // Student routes
      {
        path: '/student/logs',
        element: <ProtectedRoute allowedRoles={['student']}><SuspenseWrapper><StudentWorkLogs /></SuspenseWrapper></ProtectedRoute>,
      },
      {
        path: '/student/logs/new',
        element: <ProtectedRoute allowedRoles={['student']}><SuspenseWrapper><StudentWorkLogNew /></SuspenseWrapper></ProtectedRoute>,
      },
      {
        path: '/student/milestones',
        element: <ProtectedRoute allowedRoles={['student']}><SuspenseWrapper><StudentMilestones /></SuspenseWrapper></ProtectedRoute>,
      },
      {
        path: '/student/documents',
        element: <ProtectedRoute allowedRoles={['student']}><SuspenseWrapper><StudentDocuments /></SuspenseWrapper></ProtectedRoute>,
      },
      {
        path: '/student/analytics',
        element: <ProtectedRoute allowedRoles={['student']}><SuspenseWrapper><StudentAnalytics /></SuspenseWrapper></ProtectedRoute>,
      },
      {
        path: '/student/ai-assistant',
        element: <ProtectedRoute allowedRoles={['student']}><SuspenseWrapper><StudentAIAssistant /></SuspenseWrapper></ProtectedRoute>,
      },

      // Faculty routes
      {
        path: '/faculty/interns',
        element: <ProtectedRoute allowedRoles={['faculty_mentor']}><SuspenseWrapper><FacultyInterns /></SuspenseWrapper></ProtectedRoute>,
      },
      {
        path: '/faculty/interns/:studentId',
        element: <ProtectedRoute allowedRoles={['faculty_mentor']}><SuspenseWrapper><FacultyInternDetail /></SuspenseWrapper></ProtectedRoute>,
      },
      {
        path: '/faculty/approvals',
        element: <ProtectedRoute allowedRoles={['faculty_mentor']}><SuspenseWrapper><FacultyApprovals /></SuspenseWrapper></ProtectedRoute>,
      },
      {
        path: '/faculty/alerts',
        element: <ProtectedRoute allowedRoles={['faculty_mentor']}><SuspenseWrapper><FacultyAlerts /></SuspenseWrapper></ProtectedRoute>,
      },
      {
        path: '/faculty/reports',
        element: <ProtectedRoute allowedRoles={['faculty_mentor']}><SuspenseWrapper><FacultyReports /></SuspenseWrapper></ProtectedRoute>,
      },

      // Industry routes
      {
        path: '/industry/interns',
        element: <ProtectedRoute allowedRoles={['industry_mentor']}><SuspenseWrapper><IndustryInterns /></SuspenseWrapper></ProtectedRoute>,
      },
      {
        path: '/industry/interns/:studentId',
        element: <ProtectedRoute allowedRoles={['industry_mentor']}><SuspenseWrapper><IndustryInternDetail /></SuspenseWrapper></ProtectedRoute>,
      },
      {
        path: '/industry/tasks/new',
        element: <ProtectedRoute allowedRoles={['industry_mentor']}><SuspenseWrapper><IndustryTaskNew /></SuspenseWrapper></ProtectedRoute>,
      },

      // Admin routes
      {
        path: '/admin/dashboard',
        element: <ProtectedRoute allowedRoles={['admin']}><SuspenseWrapper><AdminDashboard /></SuspenseWrapper></ProtectedRoute>,
      },
      {
        path: '/admin/batches',
        element: <ProtectedRoute allowedRoles={['admin']}><SuspenseWrapper><AdminBatches /></SuspenseWrapper></ProtectedRoute>,
      },
      {
        path: '/admin/companies',
        element: <ProtectedRoute allowedRoles={['admin']}><SuspenseWrapper><AdminCompanies /></SuspenseWrapper></ProtectedRoute>,
      },
      {
        path: '/admin/users',
        element: <ProtectedRoute allowedRoles={['admin']}><SuspenseWrapper><AdminUsers /></SuspenseWrapper></ProtectedRoute>,
      },
      {
        path: '/admin/analytics',
        element: <ProtectedRoute allowedRoles={['admin']}><SuspenseWrapper><AdminAnalytics /></SuspenseWrapper></ProtectedRoute>,
      },
      {
        path: '/admin/placement',
        element: <ProtectedRoute allowedRoles={['admin']}><SuspenseWrapper><AdminPlacement /></SuspenseWrapper></ProtectedRoute>,
      },
      {
        path: '/admin/reports',
        element: <ProtectedRoute allowedRoles={['admin']}><SuspenseWrapper><AdminReports /></SuspenseWrapper></ProtectedRoute>,
      },
      {
        path: '/admin/audit-logs',
        element: <ProtectedRoute allowedRoles={['admin']}><SuspenseWrapper><AdminAuditLogs /></SuspenseWrapper></ProtectedRoute>,
      },
    ],
  },

  // Error & Authorization status pages
  {
    path: '/unauthorized',
    element: <SuspenseWrapper><UnauthorizedPage /></SuspenseWrapper>,
  },
  {
    path: '/404',
    element: <SuspenseWrapper><NotFoundPage /></SuspenseWrapper>,
  },
  // Catch-all 404 route
  {
    path: '*',
    element: <SuspenseWrapper><NotFoundPage /></SuspenseWrapper>,
  },
])
