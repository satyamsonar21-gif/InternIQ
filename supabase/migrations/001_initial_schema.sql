-- ============================================
-- InternIQ — Phase 1 Database Migration
-- Supabase PostgreSQL Schema
-- ============================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS vector;

-- ============================================
-- ENUM Types
-- ============================================

CREATE TYPE user_role AS ENUM ('student', 'faculty_mentor', 'industry_mentor', 'admin');
CREATE TYPE user_status AS ENUM ('active', 'inactive');
CREATE TYPE internship_status AS ENUM ('active', 'completed', 'at_risk', 'terminated');
CREATE TYPE batch_status AS ENUM ('active', 'archived');
CREATE TYPE company_status AS ENUM ('active', 'inactive');
CREATE TYPE log_type AS ENUM ('daily', 'weekly');
CREATE TYPE log_status AS ENUM ('draft', 'submitted', 'approved', 'revision_requested', 'rejected');
CREATE TYPE task_priority AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE task_status AS ENUM ('not_started', 'in_progress', 'submitted', 'verified');
CREATE TYPE submission_status AS ENUM ('submitted', 'approved', 'revision_required');
CREATE TYPE attendance_status AS ENUM ('present', 'absent', 'half_day');
CREATE TYPE document_category AS ENUM ('offer_letter', 'report', 'certificate', 'work_sample', 'other');
CREATE TYPE verification_status AS ENUM ('pending', 'verified', 'rejected');
CREATE TYPE evaluator_role AS ENUM ('faculty', 'industry');
CREATE TYPE alert_severity AS ENUM ('high_risk', 'moderate', 'low_activity');
CREATE TYPE alert_type AS ENUM ('inactivity', 'missed_deadline', 'low_score');
CREATE TYPE alert_status AS ENUM ('active', 'acknowledged', 'resolved');
CREATE TYPE notification_type AS ENUM ('submission_approval', 'mentor_comment', 'deadline_reminder', 'system_alert');
CREATE TYPE audit_action_type AS ENUM ('submission', 'approval', 'rejection', 'login', 'config_change');

-- ============================================
-- Core Tables — Phase 1
-- ============================================

-- Departments
CREATE TABLE departments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  institution_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Batches
CREATE TABLE batches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status batch_status DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Companies
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  industry_sector TEXT,
  contact_email TEXT,
  website TEXT,
  status company_status DEFAULT 'active',
  invite_code TEXT UNIQUE NOT NULL DEFAULT SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 6),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Profiles (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  role user_role NOT NULL,
  avatar_url TEXT,
  phone TEXT,
  department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
  batch_id UUID REFERENCES batches(id) ON DELETE SET NULL,
  company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
  employee_id TEXT,
  enrollment_number TEXT,
  year_of_study INT,
  designation TEXT,
  institution_name TEXT,
  industry_sector TEXT,
  status user_status DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Internships
CREATE TABLE internships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  faculty_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  industry_mentor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
  batch_id UUID REFERENCES batches(id) ON DELETE SET NULL,
  role_title TEXT NOT NULL,
  company_name TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status internship_status DEFAULT 'active',
  performance_score NUMERIC(5,2) DEFAULT 0,
  placement_readiness_score NUMERIC(5,2) DEFAULT 0,
  attendance_rate NUMERIC(5,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Audit Logs (immutable)
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  actor_role TEXT,
  action_type audit_action_type NOT NULL,
  affected_record TEXT,
  metadata JSONB DEFAULT '{}',
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Phase 2 Tables (Work Logs, Tasks, etc.)
-- ============================================

CREATE TABLE work_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  internship_id UUID NOT NULL REFERENCES internships(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  log_date DATE NOT NULL,
  log_type log_type NOT NULL,
  hours_worked NUMERIC(4,1) DEFAULT 0,
  description TEXT,
  task_tags TEXT[] DEFAULT '{}',
  file_attachments JSONB DEFAULT '[]',
  status log_status DEFAULT 'draft',
  mentor_comment TEXT,
  evaluated_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  evaluated_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE tasks_milestones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  internship_id UUID NOT NULL REFERENCES internships(id) ON DELETE CASCADE,
  assigned_by UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  assigned_role evaluator_role NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  due_date TIMESTAMPTZ NOT NULL,
  priority task_priority DEFAULT 'medium',
  deliverables JSONB DEFAULT '[]',
  skill_tags TEXT[] DEFAULT '{}',
  status task_status DEFAULT 'not_started',
  completion_pct INT DEFAULT 0 CHECK (completion_pct >= 0 AND completion_pct <= 100),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE task_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_id UUID NOT NULL REFERENCES tasks_milestones(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  submission_text TEXT,
  attachments JSONB DEFAULT '[]',
  rating INT CHECK (rating >= 1 AND rating <= 5),
  mentor_feedback TEXT,
  status submission_status DEFAULT 'submitted',
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ
);

CREATE TABLE attendance_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  internship_id UUID NOT NULL REFERENCES internships(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  status attendance_status DEFAULT 'present',
  location_tag TEXT,
  verified_by_faculty BOOLEAN DEFAULT FALSE,
  verified_by_industry BOOLEAN DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(internship_id, date)
);

CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  internship_id UUID NOT NULL REFERENCES internships(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  category document_category NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size BIGINT DEFAULT 0,
  mime_type TEXT NOT NULL,
  verification_status verification_status DEFAULT 'pending',
  verified_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  ocr_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Phase 3 Tables (Evaluations, Alerts, Notifications)
-- ============================================

CREATE TABLE evaluations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  internship_id UUID NOT NULL REFERENCES internships(id) ON DELETE CASCADE,
  evaluator_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  evaluator_role evaluator_role NOT NULL,
  technical_skills INT CHECK (technical_skills >= 1 AND technical_skills <= 5),
  communication INT CHECK (communication >= 1 AND communication <= 5),
  initiative INT CHECK (initiative >= 1 AND initiative <= 5),
  quality_of_work INT CHECK (quality_of_work >= 1 AND quality_of_work <= 5),
  professionalism INT CHECK (professionalism >= 1 AND professionalism <= 5),
  overall_comment TEXT,
  is_final BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  internship_id UUID NOT NULL REFERENCES internships(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  severity alert_severity NOT NULL,
  alert_type alert_type NOT NULL,
  message TEXT NOT NULL,
  status alert_status DEFAULT 'active',
  resolved_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type notification_type NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  link_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Phase 4 Tables (AI Intelligence)
-- ============================================

CREATE TABLE ai_summaries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  internship_id UUID NOT NULL REFERENCES internships(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  summary_type TEXT NOT NULL,
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  generated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE knowledge_embeddings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content TEXT NOT NULL,
  embedding VECTOR(1536),
  source_type TEXT NOT NULL,
  source_id UUID,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Indexes
-- ============================================

CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_department ON profiles(department_id);
CREATE INDEX idx_profiles_company ON profiles(company_id);
CREATE INDEX idx_internships_student ON internships(student_id);
CREATE INDEX idx_internships_faculty ON internships(faculty_id);
CREATE INDEX idx_internships_industry_mentor ON internships(industry_mentor_id);
CREATE INDEX idx_internships_company ON internships(company_id);
CREATE INDEX idx_internships_status ON internships(status);
CREATE INDEX idx_work_logs_internship ON work_logs(internship_id);
CREATE INDEX idx_work_logs_student ON work_logs(student_id);
CREATE INDEX idx_work_logs_status ON work_logs(status);
CREATE INDEX idx_tasks_internship ON tasks_milestones(internship_id);
CREATE INDEX idx_tasks_status ON tasks_milestones(status);
CREATE INDEX idx_task_submissions_task ON task_submissions(task_id);
CREATE INDEX idx_attendance_internship ON attendance_records(internship_id);
CREATE INDEX idx_documents_internship ON documents(internship_id);
CREATE INDEX idx_evaluations_internship ON evaluations(internship_id);
CREATE INDEX idx_alerts_student ON alerts(student_id);
CREATE INDEX idx_alerts_status ON alerts(status);
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(user_id, is_read);
CREATE INDEX idx_audit_logs_actor ON audit_logs(actor_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action_type);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at DESC);

-- ============================================
-- Row Level Security (RLS) Policies
-- ============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE internships ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_summaries ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read their own profile; admins can read/write all
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can update any profile"
  ON profiles FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Departments & Batches: Authenticated read; Admin write
CREATE POLICY "Authenticated users can view departments"
  ON departments FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can manage departments"
  ON departments FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Authenticated users can view batches"
  ON batches FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can manage batches"
  ON batches FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Companies: Authenticated read; Admin and Industry Mentor write
CREATE POLICY "Authenticated users can view companies"
  ON companies FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can manage companies"
  ON companies FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Internships: Student sees own; Faculty sees assigned; Industry Mentor sees company; Admin sees all
CREATE POLICY "Students can view own internships"
  ON internships FOR SELECT
  USING (student_id = auth.uid());

CREATE POLICY "Faculty can view assigned internships"
  ON internships FOR SELECT
  USING (faculty_id = auth.uid());

CREATE POLICY "Industry mentors can view company internships"
  ON internships FOR SELECT
  USING (industry_mentor_id = auth.uid());

CREATE POLICY "Admins can manage all internships"
  ON internships FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Work Logs: Student CRUD own; Mentors read/update assigned
CREATE POLICY "Students can manage own work logs"
  ON work_logs FOR ALL
  USING (student_id = auth.uid());

CREATE POLICY "Faculty can view assigned work logs"
  ON work_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM internships
      WHERE internships.id = work_logs.internship_id
      AND internships.faculty_id = auth.uid()
    )
  );

CREATE POLICY "Faculty can update assigned work logs"
  ON work_logs FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM internships
      WHERE internships.id = work_logs.internship_id
      AND internships.faculty_id = auth.uid()
    )
  );

-- Notifications: Users can only access their own
CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  USING (user_id = auth.uid());

-- Audit Logs: Admin read only
CREATE POLICY "Admins can view audit logs"
  ON audit_logs FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================
-- Triggers
-- ============================================

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, full_name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'New User'),
    NEW.email,
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'student')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Auto-audit log on profile changes
CREATE OR REPLACE FUNCTION log_profile_changes()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO audit_logs (actor_id, actor_role, action_type, affected_record, metadata)
  VALUES (
    NEW.id,
    NEW.role::TEXT,
    'config_change',
    'profiles/' || NEW.id,
    jsonb_build_object('action', TG_OP, 'table', 'profiles')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_profile_change
  AFTER UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION log_profile_changes();
