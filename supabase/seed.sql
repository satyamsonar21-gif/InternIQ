-- InternIQ Database Seed File for Development & Staging

-- 1. Departments & Companies
INSERT INTO departments (id, name, code) VALUES
  ('dept_001', 'Computer Science & Engineering', 'CSE'),
  ('dept_002', 'Information Technology', 'IT')
ON CONFLICT (id) DO NOTHING;

INSERT INTO companies (id, name, industry_sector, invite_code) VALUES
  ('comp_001', 'TechVista Solutions', 'Software Development', 'TV2024')
ON CONFLICT (id) DO NOTHING;

INSERT INTO batches (id, department_id, batch_year, name, start_date, end_date) VALUES
  ('batch_001', 'dept_001', 2024, 'B.Tech CSE 2021-2025', '2021-08-01', '2025-05-30')
ON CONFLICT (id) DO NOTHING;

-- 2. Demo User Profiles
INSERT INTO profiles (id, full_name, email, role, department_id, batch_id, company_id, enrollment_number, institution_name, status) VALUES
  ('usr_student_001', 'Arjun Mehta', 'student@interniq.io', 'student', 'dept_001', 'batch_001', 'comp_001', 'CS2024001', 'National Institute of Technology', 'active'),
  ('usr_faculty_001', 'Dr. Priya Sharma', 'faculty@interniq.io', 'faculty_mentor', 'dept_001', NULL, NULL, NULL, 'National Institute of Technology', 'active'),
  ('usr_industry_001', 'Rahul Kapoor', 'industry@interniq.io', 'industry_mentor', NULL, NULL, 'comp_001', NULL, NULL, 'active'),
  ('usr_admin_001', 'Kavita Desai', 'admin@interniq.io', 'admin', NULL, NULL, NULL, NULL, 'National Institute of Technology', 'active')
ON CONFLICT (id) DO NOTHING;

-- 3. Active Internship
INSERT INTO internships (id, student_id, faculty_id, industry_mentor_id, company_id, title, company_name, start_date, end_date, status, performance_score, placement_readiness_score, attendance_rate) VALUES
  ('intern_001', 'usr_student_001', 'usr_faculty_001', 'usr_industry_001', 'comp_001', 'Frontend Developer Intern', 'TechVista Solutions', '2025-01-15', '2025-05-30', 'active', 85.00, 78.00, 95.50)
ON CONFLICT (id) DO NOTHING;

-- 4. Work Logs & Tasks
INSERT INTO work_logs (id, internship_id, student_id, log_date, log_type, hours_worked, description, task_tags, status) VALUES
  ('log_001', 'intern_001', 'usr_student_001', '2025-02-01', 'daily', 8.0, 'Configured React components and connected Supabase auth hooks.', ARRAY['React', 'Supabase'], 'approved'),
  ('log_002', 'intern_001', 'usr_student_001', '2025-02-08', 'weekly', 40.0, 'Integrated Zod validation schemas and created Vitest unit test suite.', ARRAY['Zod', 'Vitest'], 'submitted')
ON CONFLICT (id) DO NOTHING;

INSERT INTO tasks_milestones (id, internship_id, assigned_by, assigned_role, title, description, due_date, priority, deliverables, skill_tags, status, completion_pct) VALUES
  ('task_001', 'intern_001', 'usr_industry_001', 'industry_mentor', 'Build Authentication & RBAC Layer', 'Implement Supabase auth integration with role checking', '2025-02-28', 'high', '[{"id": "del-1", "text": "Supabase Auth"}, {"id": "del-2", "text": "Zod Schemas"}]'::jsonb, ARRAY['React', 'TypeScript', 'Supabase'], 'in_progress', 60)
ON CONFLICT (id) DO NOTHING;
