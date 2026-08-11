// InternIQ — Core Type Definitions

export type UserRole = 'student' | 'faculty_mentor' | 'industry_mentor' | 'admin'

export interface UserProfile {
  id: string
  full_name: string
  email: string
  role: UserRole
  avatar_url: string | null
  phone: string | null
  department_id: string | null
  batch_id: string | null
  company_id: string | null
  employee_id: string | null
  enrollment_number: string | null
  year_of_study: number | null
  designation: string | null
  institution_name: string | null
  industry_sector: string | null
  status: 'active' | 'inactive'
  created_at: string
}

export interface Internship {
  id: string
  student_id: string
  faculty_id: string | null
  industry_mentor_id: string | null
  company_id: string | null
  batch_id: string | null
  role_title: string
  company_name: string
  start_date: string
  end_date: string
  status: 'active' | 'completed' | 'at_risk' | 'terminated'
  performance_score: number
  placement_readiness_score: number
  attendance_rate: number
  created_at: string
}

export interface WorkLog {
  id: string
  internship_id: string
  student_id: string
  log_date: string
  log_type: 'daily' | 'weekly'
  hours_worked: number
  description: string
  task_tags: string[]
  file_attachments: FileAttachment[]
  status: 'draft' | 'submitted' | 'approved' | 'revision_requested' | 'rejected'
  mentor_comment: string | null
  evaluated_by: string | null
  evaluated_at: string | null
  created_at: string
}

export interface TaskMilestone {
  id: string
  internship_id: string
  assigned_by: string
  assigned_role: 'faculty' | 'industry'
  title: string
  description: string
  due_date: string
  priority: 'low' | 'medium' | 'high' | 'critical'
  deliverables: Deliverable[]
  skill_tags: string[]
  status: 'not_started' | 'in_progress' | 'submitted' | 'verified'
  completion_pct: number
  created_at: string
}

export interface TaskSubmission {
  id: string
  task_id: string
  student_id: string
  submission_text: string
  attachments: FileAttachment[]
  rating: number | null
  mentor_feedback: string | null
  status: 'submitted' | 'approved' | 'revision_required'
  submitted_at: string
  reviewed_at: string | null
}

export interface AttendanceRecord {
  id: string
  internship_id: string
  student_id: string
  date: string
  status: 'present' | 'absent' | 'half_day'
  location_tag: string | null
  verified_by_faculty: boolean
  verified_by_industry: boolean
  notes: string | null
  created_at: string
}

export interface Document {
  id: string
  internship_id: string
  student_id: string
  category: 'offer_letter' | 'report' | 'certificate' | 'work_sample' | 'other'
  file_name: string
  file_path: string
  file_size: number
  mime_type: string
  verification_status: 'pending' | 'verified' | 'rejected'
  verified_by: string | null
  ocr_text: string | null
  created_at: string
}

export interface Evaluation {
  id: string
  internship_id: string
  evaluator_id: string
  evaluator_role: 'faculty' | 'industry'
  technical_skills: number
  communication: number
  initiative: number
  quality_of_work: number
  professionalism: number
  overall_comment: string
  is_final: boolean
  created_at: string
}

export interface Alert {
  id: string
  internship_id: string
  student_id: string
  severity: 'high_risk' | 'moderate' | 'low_activity'
  alert_type: 'inactivity' | 'missed_deadline' | 'low_score'
  message: string
  status: 'active' | 'acknowledged' | 'resolved'
  resolved_by: string | null
  created_at: string
}

export interface Notification {
  id: string
  user_id: string
  title: string
  message: string
  type: 'submission_approval' | 'mentor_comment' | 'deadline_reminder' | 'system_alert'
  is_read: boolean
  link_url: string | null
  created_at: string
}

export interface AuditLog {
  id: string
  actor_id: string
  actor_role: string
  action_type: 'submission' | 'approval' | 'rejection' | 'login' | 'config_change'
  affected_record: string
  metadata: Record<string, unknown>
  ip_address: string
  created_at: string
}

export interface FileAttachment {
  name: string
  url: string
  size: number
  type: string
}

export interface Deliverable {
  title: string
  completed: boolean
}

export interface Department {
  id: string
  name: string
  code: string
  institution_name: string
  created_at: string
}

export interface Batch {
  id: string
  name: string
  department_id: string
  start_date: string
  end_date: string
  status: 'active' | 'archived'
  created_at: string
}

export interface Company {
  id: string
  name: string
  industry_sector: string
  contact_email: string
  website: string | null
  status: 'active' | 'inactive'
  invite_code: string
  created_at: string
}
