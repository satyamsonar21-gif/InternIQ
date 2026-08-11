export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string
          email: string
          role: 'student' | 'faculty_mentor' | 'industry_mentor' | 'admin'
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
          status: 'active' | 'inactive' | 'suspended'
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at'> & { created_at?: string }
        Update: Partial<Database['public']['Tables']['profiles']['Row']>
      }
      internships: {
        Row: {
          id: string
          student_id: string
          faculty_id: string
          industry_mentor_id: string
          company_id: string
          title: string
          company_name: string
          start_date: string
          end_date: string
          status: 'pending_approval' | 'active' | 'completed' | 'terminated' | 'on_hold'
          performance_score: number
          placement_readiness_score: number
          attendance_rate: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['internships']['Row'], 'id' | 'created_at'> & { id?: string; created_at?: string }
        Update: Partial<Database['public']['Tables']['internships']['Row']>
      }
      work_logs: {
        Row: {
          id: string
          internship_id: string
          student_id: string
          log_date: string
          log_type: 'daily' | 'weekly' | 'sprint_summary'
          hours_worked: number
          description: string | null
          task_tags: string[]
          file_attachments: Json
          status: 'draft' | 'submitted' | 'approved' | 'rejected' | 'needs_revision'
          mentor_comment: string | null
          evaluated_by: string | null
          evaluated_at: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['work_logs']['Row'], 'id' | 'created_at'> & { id?: string; created_at?: string }
        Update: Partial<Database['public']['Tables']['work_logs']['Row']>
      }
      tasks_milestones: {
        Row: {
          id: string
          internship_id: string
          assigned_by: string
          assigned_role: 'faculty_mentor' | 'industry_mentor'
          title: string
          description: string | null
          due_date: string
          priority: 'low' | 'medium' | 'high' | 'urgent'
          deliverables: Json
          skill_tags: string[]
          status: 'not_started' | 'in_progress' | 'submitted' | 'approved' | 'overdue'
          completion_pct: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['tasks_milestones']['Row'], 'id' | 'created_at'> & { id?: string; created_at?: string }
        Update: Partial<Database['public']['Tables']['tasks_milestones']['Row']>
      }
      evaluations: {
        Row: {
          id: string
          internship_id: string
          evaluator_id: string
          evaluator_role: 'faculty_mentor' | 'industry_mentor'
          technical_skills: number | null
          communication: number | null
          initiative: number | null
          quality_of_work: number | null
          professionalism: number | null
          overall_comment: string | null
          is_final: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['evaluations']['Row'], 'id' | 'created_at'> & { id?: string; created_at?: string }
        Update: Partial<Database['public']['Tables']['evaluations']['Row']>
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string
          type: 'alert' | 'approval' | 'system' | 'ai_insight'
          is_read: boolean
          link_url: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['notifications']['Row'], 'id' | 'created_at'> & { id?: string; created_at?: string }
        Update: Partial<Database['public']['Tables']['notifications']['Row']>
      }
    }
  }
}
